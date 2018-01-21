import { EventDispatcher } from '../core/EventDispatcher';
declare class Material extends EventDispatcher {
    fog: any;
    lights: any;
    blending: any;
    side: any;
    flatShading: any;
    vertexColors: any;
    opacity: any;
    transparent: any;
    blendSrc: any;
    blendDst: any;
    blendEquation: any;
    blendSrcAlpha: any;
    blendDstAlpha: any;
    blendEquationAlpha: any;
    depthFunc: any;
    depthTest: any;
    depthWrite: any;
    clippingPlanes: any;
    clipIntersection: any;
    clipShadows: any;
    colorWrite: any;
    precision: any;
    polygonOffset: any;
    polygonOffsetFactor: any;
    polygonOffsetUnits: any;
    dithering: any;
    alphaTest: any;
    premultipliedAlpha: any;
    overdraw: any;
    visible: any;
    userData: any;
    needsUpdate: any;
    reflectivity: any;
    color: any;
    roughness: any;
    metalness: any;
    emissive: any;
    emissiveIntensity: any;
    specular: any;
    shininess: any;
    clearCoat: any;
    clearCoatRoughness: any;
    map: any;
    alphaMap: any;
    lightMap: any;
    bumpMap: any;
    bumpScale: any;
    normalMap: any;
    normalScale: any;
    displacementMap: any;
    displacementScale: any;
    displacementBias: any;
    roughnessMap: any;
    metalnessMap: any;
    emissiveMap: any;
    specularMap: any;
    envMap: any;
    gradientMap: any;
    size: any;
    sizeAttenuation: any;
    rotation: any;
    linewidth: any;
    dashSize: any;
    gapSize: any;
    scale: any;
    wireframe: any;
    wireframeLinewidth: any;
    wireframeLinecap: any;
    wireframeLinejoin: any;
    morphTargets: any;
    skinning: any;
    constructor();
    onBeforeCompile(): void;
    setValues(values: any): void;
    toJSON(meta: any): any;
    clone(): Material;
    copy(source: any): this;
    dispose(): void;
}
export { Material };
