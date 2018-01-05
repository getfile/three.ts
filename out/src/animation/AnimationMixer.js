define(["require", "exports", "./AnimationAction", "../core/EventDispatcher", "../math/interpolants/LinearInterpolant", "./PropertyBinding", "./PropertyMixer", "./AnimationClip"], function (require, exports, AnimationAction_1, EventDispatcher_1, LinearInterpolant_1, PropertyBinding_1, PropertyMixer_1, AnimationClip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AnimationMixer extends EventDispatcher_1.EventDispatcher {
        constructor(root) {
            super();
            this._controlInterpolantsResultBuffer = new Float32Array(1);
            this._root = root;
            this._initMemoryManager();
            this._accuIndex = 0;
            this.time = 0;
            this.timeScale = 1.0;
        }
        _bindAction(action, prototypeAction) {
            var root = action._localRoot || this._root, tracks = action._clip.tracks, nTracks = tracks.length, bindings = action._propertyBindings, interpolants = action._interpolants, rootUuid = root.uuid, bindingsByRoot = this._bindingsByRootAndName, bindingsByName = bindingsByRoot[rootUuid];
            if (bindingsByName === undefined) {
                bindingsByName = {};
                bindingsByRoot[rootUuid] = bindingsByName;
            }
            for (var i = 0; i !== nTracks; ++i) {
                var track = tracks[i], trackName = track.name, binding = bindingsByName[trackName];
                if (binding !== undefined) {
                    bindings[i] = binding;
                }
                else {
                    binding = bindings[i];
                    if (binding !== undefined) {
                        if (binding._cacheIndex === null) {
                            ++binding.referenceCount;
                            this._addInactiveBinding(binding, rootUuid, trackName);
                        }
                        continue;
                    }
                    var path = prototypeAction && prototypeAction.
                        _propertyBindings[i].binding.parsedPath;
                    binding = new PropertyMixer_1.PropertyMixer(PropertyBinding_1.PropertyBinding.create(root, trackName, path), track.ValueTypeName, track.getValueSize());
                    ++binding.referenceCount;
                    this._addInactiveBinding(binding, rootUuid, trackName);
                    bindings[i] = binding;
                }
                interpolants[i].resultBuffer = binding.buffer;
            }
        }
        _activateAction(action) {
            if (!this._isActiveAction(action)) {
                if (action._cacheIndex === null) {
                    var rootUuid = (action._localRoot || this._root).uuid, clipUuid = action._clip.uuid, actionsForClip = this._actionsByClip[clipUuid];
                    this._bindAction(action, actionsForClip && actionsForClip.knownActions[0]);
                    this._addInactiveAction(action, clipUuid, rootUuid);
                }
                var bindings = action._propertyBindings;
                for (var i = 0, n = bindings.length; i !== n; ++i) {
                    var binding = bindings[i];
                    if (binding.useCount++ === 0) {
                        this._lendBinding(binding);
                        binding.saveOriginalState();
                    }
                }
                this._lendAction(action);
            }
        }
        _deactivateAction(action) {
            if (this._isActiveAction(action)) {
                var bindings = action._propertyBindings;
                for (var i = 0, n = bindings.length; i !== n; ++i) {
                    var binding = bindings[i];
                    if (--binding.useCount === 0) {
                        binding.restoreOriginalState();
                        this._takeBackBinding(binding);
                    }
                }
                this._takeBackAction(action);
            }
        }
        _initMemoryManager() {
            this._actions = [];
            this._nActiveActions = 0;
            this._actionsByClip = {};
            this._bindings = [];
            this._nActiveBindings = 0;
            this._bindingsByRootAndName = {};
            this._controlInterpolants = [];
            this._nActiveControlInterpolants = 0;
            var scope = this;
            this.stats = {
                actions: {
                    get total() {
                        return scope._actions.length;
                    },
                    get inUse() {
                        return scope._nActiveActions;
                    }
                },
                bindings: {
                    get total() {
                        return scope._bindings.length;
                    },
                    get inUse() {
                        return scope._nActiveBindings;
                    }
                },
                controlInterpolants: {
                    get total() {
                        return scope._controlInterpolants.length;
                    },
                    get inUse() {
                        return scope._nActiveControlInterpolants;
                    }
                }
            };
        }
        _isActiveAction(action) {
            var index = action._cacheIndex;
            return index !== null && index < this._nActiveActions;
        }
        _addInactiveAction(action, clipUuid, rootUuid) {
            var actions = this._actions, actionsByClip = this._actionsByClip, actionsForClip = actionsByClip[clipUuid];
            if (actionsForClip === undefined) {
                actionsForClip = {
                    knownActions: [action],
                    actionByRoot: {}
                };
                action._byClipCacheIndex = 0;
                actionsByClip[clipUuid] = actionsForClip;
            }
            else {
                var knownActions = actionsForClip.knownActions;
                action._byClipCacheIndex = knownActions.length;
                knownActions.push(action);
            }
            action._cacheIndex = actions.length;
            actions.push(action);
            actionsForClip.actionByRoot[rootUuid] = action;
        }
        _removeInactiveAction(action) {
            var actions = this._actions, lastInactiveAction = actions[actions.length - 1], cacheIndex = action._cacheIndex;
            lastInactiveAction._cacheIndex = cacheIndex;
            actions[cacheIndex] = lastInactiveAction;
            actions.pop();
            action._cacheIndex = null;
            var clipUuid = action._clip.uuid, actionsByClip = this._actionsByClip, actionsForClip = actionsByClip[clipUuid], knownActionsForClip = actionsForClip.knownActions, lastKnownAction = knownActionsForClip[knownActionsForClip.length - 1], byClipCacheIndex = action._byClipCacheIndex;
            lastKnownAction._byClipCacheIndex = byClipCacheIndex;
            knownActionsForClip[byClipCacheIndex] = lastKnownAction;
            knownActionsForClip.pop();
            action._byClipCacheIndex = null;
            var actionByRoot = actionsForClip.actionByRoot, rootUuid = (action._localRoot || this._root).uuid;
            delete actionByRoot[rootUuid];
            if (knownActionsForClip.length === 0) {
                delete actionsByClip[clipUuid];
            }
            this._removeInactiveBindingsForAction(action);
        }
        _removeInactiveBindingsForAction(action) {
            var bindings = action._propertyBindings;
            for (var i = 0, n = bindings.length; i !== n; ++i) {
                var binding = bindings[i];
                if (--binding.referenceCount === 0) {
                    this._removeInactiveBinding(binding);
                }
            }
        }
        _lendAction(action) {
            var actions = this._actions, prevIndex = action._cacheIndex, lastActiveIndex = this._nActiveActions++, firstInactiveAction = actions[lastActiveIndex];
            action._cacheIndex = lastActiveIndex;
            actions[lastActiveIndex] = action;
            firstInactiveAction._cacheIndex = prevIndex;
            actions[prevIndex] = firstInactiveAction;
        }
        _takeBackAction(action) {
            var actions = this._actions, prevIndex = action._cacheIndex, firstInactiveIndex = --this._nActiveActions, lastActiveAction = actions[firstInactiveIndex];
            action._cacheIndex = firstInactiveIndex;
            actions[firstInactiveIndex] = action;
            lastActiveAction._cacheIndex = prevIndex;
            actions[prevIndex] = lastActiveAction;
        }
        _addInactiveBinding(binding, rootUuid, trackName) {
            var bindingsByRoot = this._bindingsByRootAndName, bindingByName = bindingsByRoot[rootUuid], bindings = this._bindings;
            if (bindingByName === undefined) {
                bindingByName = {};
                bindingsByRoot[rootUuid] = bindingByName;
            }
            bindingByName[trackName] = binding;
            binding._cacheIndex = bindings.length;
            bindings.push(binding);
        }
        _removeInactiveBinding(binding) {
            var bindings = this._bindings, propBinding = binding.binding, rootUuid = propBinding.rootNode.uuid, trackName = propBinding.path, bindingsByRoot = this._bindingsByRootAndName, bindingByName = bindingsByRoot[rootUuid], lastInactiveBinding = bindings[bindings.length - 1], cacheIndex = binding._cacheIndex;
            lastInactiveBinding._cacheIndex = cacheIndex;
            bindings[cacheIndex] = lastInactiveBinding;
            bindings.pop();
            delete bindingByName[trackName];
            remove_empty_map: {
                for (var _ in bindingByName)
                    break remove_empty_map;
                delete bindingsByRoot[rootUuid];
            }
        }
        _lendBinding(binding) {
            var bindings = this._bindings, prevIndex = binding._cacheIndex, lastActiveIndex = this._nActiveBindings++, firstInactiveBinding = bindings[lastActiveIndex];
            binding._cacheIndex = lastActiveIndex;
            bindings[lastActiveIndex] = binding;
            firstInactiveBinding._cacheIndex = prevIndex;
            bindings[prevIndex] = firstInactiveBinding;
        }
        _takeBackBinding(binding) {
            var bindings = this._bindings, prevIndex = binding._cacheIndex, firstInactiveIndex = --this._nActiveBindings, lastActiveBinding = bindings[firstInactiveIndex];
            binding._cacheIndex = firstInactiveIndex;
            bindings[firstInactiveIndex] = binding;
            lastActiveBinding._cacheIndex = prevIndex;
            bindings[prevIndex] = lastActiveBinding;
        }
        _lendControlInterpolant() {
            var interpolants = this._controlInterpolants, lastActiveIndex = this._nActiveControlInterpolants++, interpolant = interpolants[lastActiveIndex];
            if (interpolant === undefined) {
                interpolant = new LinearInterpolant_1.LinearInterpolant(new Float32Array(2), new Float32Array(2), 1, this._controlInterpolantsResultBuffer);
                interpolant.__cacheIndex = lastActiveIndex;
                interpolants[lastActiveIndex] = interpolant;
            }
            return interpolant;
        }
        _takeBackControlInterpolant(interpolant) {
            var interpolants = this._controlInterpolants, prevIndex = interpolant.__cacheIndex, firstInactiveIndex = --this._nActiveControlInterpolants, lastActiveInterpolant = interpolants[firstInactiveIndex];
            interpolant.__cacheIndex = firstInactiveIndex;
            interpolants[firstInactiveIndex] = interpolant;
            lastActiveInterpolant.__cacheIndex = prevIndex;
            interpolants[prevIndex] = lastActiveInterpolant;
        }
        clipAction(clip, optionalRoot) {
            var root = optionalRoot || this._root, rootUuid = root.uuid, clipObject = typeof clip === 'string' ?
                AnimationClip_1.AnimationClip.findByName(root, clip) : clip, clipUuid = clipObject !== null ? clipObject.uuid : clip, actionsForClip = this._actionsByClip[clipUuid], prototypeAction = null;
            if (actionsForClip !== undefined) {
                var existingAction = actionsForClip.actionByRoot[rootUuid];
                if (existingAction !== undefined) {
                    return existingAction;
                }
                prototypeAction = actionsForClip.knownActions[0];
                if (clipObject === null)
                    clipObject = prototypeAction._clip;
            }
            if (clipObject === null)
                return null;
            var newAction = new AnimationAction_1.AnimationAction(this, clipObject, optionalRoot);
            this._bindAction(newAction, prototypeAction);
            this._addInactiveAction(newAction, clipUuid, rootUuid);
            return newAction;
        }
        existingAction(clip, optionalRoot) {
            var root = optionalRoot || this._root, rootUuid = root.uuid, clipObject = typeof clip === 'string' ?
                AnimationClip_1.AnimationClip.findByName(root, clip) : clip, clipUuid = clipObject ? clipObject.uuid : clip, actionsForClip = this._actionsByClip[clipUuid];
            if (actionsForClip !== undefined)
                return actionsForClip.actionByRoot[rootUuid] || null;
            return null;
        }
        stopAllAction() {
            var actions = this._actions, nActions = this._nActiveActions, bindings = this._bindings, nBindings = this._nActiveBindings;
            this._nActiveActions = 0;
            this._nActiveBindings = 0;
            for (var i = 0; i !== nActions; ++i)
                actions[i].reset();
            for (var i = 0; i !== nBindings; ++i)
                bindings[i].useCount = 0;
            return this;
        }
        update(deltaTime) {
            deltaTime *= this.timeScale;
            var actions = this._actions, nActions = this._nActiveActions, time = this.time += deltaTime, timeDirection = Math.sign(deltaTime), accuIndex = this._accuIndex ^= 1;
            for (var i = 0; i !== nActions; ++i) {
                var action = actions[i];
                action._update(time, deltaTime, timeDirection, accuIndex);
            }
            var bindings = this._bindings, nBindings = this._nActiveBindings;
            for (var i = 0; i !== nBindings; ++i)
                bindings[i].apply(accuIndex);
            return this;
        }
        getRoot() {
            return this._root;
        }
        uncacheClip(clip) {
            var actions = this._actions, clipUuid = clip.uuid, actionsByClip = this._actionsByClip, actionsForClip = actionsByClip[clipUuid];
            if (actionsForClip !== undefined) {
                var actionsToRemove = actionsForClip.knownActions;
                for (var i = 0, n = actionsToRemove.length; i !== n; ++i) {
                    var action = actionsToRemove[i];
                    this._deactivateAction(action);
                    var cacheIndex = action._cacheIndex, lastInactiveAction = actions[actions.length - 1];
                    action._cacheIndex = null;
                    action._byClipCacheIndex = null;
                    lastInactiveAction._cacheIndex = cacheIndex;
                    actions[cacheIndex] = lastInactiveAction;
                    actions.pop();
                    this._removeInactiveBindingsForAction(action);
                }
                delete actionsByClip[clipUuid];
            }
        }
        uncacheRoot(root) {
            var rootUuid = root.uuid, actionsByClip = this._actionsByClip;
            for (var clipUuid in actionsByClip) {
                var actionByRoot = actionsByClip[clipUuid].actionByRoot, action = actionByRoot[rootUuid];
                if (action !== undefined) {
                    this._deactivateAction(action);
                    this._removeInactiveAction(action);
                }
            }
            var bindingsByRoot = this._bindingsByRootAndName, bindingByName = bindingsByRoot[rootUuid];
            if (bindingByName !== undefined) {
                for (var trackName in bindingByName) {
                    var binding = bindingByName[trackName];
                    binding.restoreOriginalState();
                    this._removeInactiveBinding(binding);
                }
            }
        }
        uncacheAction(clip, optionalRoot) {
            var action = this.existingAction(clip, optionalRoot);
            if (action !== null) {
                this._deactivateAction(action);
                this._removeInactiveAction(action);
            }
        }
    }
    exports.AnimationMixer = AnimationMixer;
});
//# sourceMappingURL=AnimationMixer.js.map