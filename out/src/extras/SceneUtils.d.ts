import { Group } from '../objects/Group';
declare class SceneUtils {
    static createMultiMaterialObject(geometry: any, materials: any): Group;
    static detach(child: any, parent: any, scene: any): void;
    static attach(child: any, scene: any, parent: any): void;
}
export { SceneUtils };
