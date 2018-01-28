/**
 * @author mrdoob / http://mrdoob.com/
 */

import { Vector2 } from '../math/Vector2';
import { Geometry } from "./Geometry";
import { Box3 } from '../geom/Box3';
import { Sphere } from '../geom/Sphere';
import { Vector3 } from '../math/Vector3';
import { Color } from '../math/Color';
import { Vector4 } from '../math/Vector4';
import { GroupInfo } from './BufferGeometry';
import { Face3 } from './Face3';

class DirectGeometry
{
    indices: number[];
    vertices: Vector3[];
    normals: Vector3[];
    colors: Color[];
    uvs: Vector2[];
    uvs2: Vector2[];
    skinWeights: Vector4[];
    skinIndices: Vector4[];
    morphTargets: { position: Vector3[][], normal: Vector3[][] };
    groups;

    boundingBox: Box3;
    boundingSphere: Sphere;

    verticesNeedUpdate: boolean;
    normalsNeedUpdate: boolean;
    colorsNeedUpdate: boolean;
    uvsNeedUpdate: boolean;
    groupsNeedUpdate: boolean;

    constructor()
    {
        this.indices = [];
        this.vertices = [];
        this.normals = [];
        this.colors = [];
        this.uvs = [];
        this.uvs2 = [];

        this.groups = [];

        this.morphTargets = { position: null, normal: null };

        this.skinWeights = [];
        this.skinIndices = [];

        // this.lineDistances = [];

        this.boundingBox = null;
        this.boundingSphere = null;

        // update flags
        this.verticesNeedUpdate = false;
        this.normalsNeedUpdate = false;
        this.colorsNeedUpdate = false;
        this.uvsNeedUpdate = false;
        this.groupsNeedUpdate = false;
    }

    computeGroups( geometry: Geometry )
    {
        let group: GroupInfo;
        let groups: GroupInfo[] = [];
        let materialIndex = undefined;

        let faces = geometry.faces;
        let i = 0;
        for ( ; i < faces.length; i++ )
        {
            let face: Face3 = faces[i];

            // materials
            if ( face.materialIndex !== materialIndex )
            {
                materialIndex = face.materialIndex;
                if ( group !== undefined )
                {
                    group.count = ( i * 3 ) - group.start;
                    groups.push( group );
                }

                group = {
                    start: i * 3,
                    materialIndex: materialIndex
                };
            }
        }

        if ( group !== undefined )
        {
            group.count = ( i * 3 ) - group.start;
            groups.push( group );
        }

        this.groups = groups;
    }

    fromGeometry( geometry: Geometry )
    {
        let faces = geometry.faces;
        let vertices = geometry.vertices;
        let faceVertexUvs = geometry.faceVertexUvs;

        let hasFaceVertexUv = faceVertexUvs[0] && faceVertexUvs[0].length > 0;
        let hasFaceVertexUv2 = faceVertexUvs[1] && faceVertexUvs[1].length > 0;

        // morphs
        let morphTargets = geometry.morphTargets;
        let morphTargetsLength = morphTargets.length;

        let morphTargetsPosition: Vector3[][];
        if ( morphTargetsLength > 0 )
        {
            morphTargetsPosition = [];
            for ( let i = 0; i < morphTargetsLength; i++ )
                morphTargetsPosition[i] = [];

            this.morphTargets.position = morphTargetsPosition;
        }

        let morphNormals = geometry.morphNormals;
        let morphNormalsLength = morphNormals.length;
        let morphTargetsNormal;

        if ( morphNormalsLength > 0 )
        {
            morphTargetsNormal = [];
            for ( let i = 0; i < morphNormalsLength; i++ )
                morphTargetsNormal[i] = [];

            this.morphTargets.normal = morphTargetsNormal;
        }

        // skins
        let skinIndices = geometry.skinIndices;
        let skinWeights = geometry.skinWeights;
        let hasSkinIndices = skinIndices.length === vertices.length;
        let hasSkinWeights = skinWeights.length === vertices.length;

        //
        for ( let i = 0; i < faces.length; i++ )
        {
            let face = faces[i];
            this.vertices.push( vertices[face.a], vertices[face.b], vertices[face.c] );
            let vertexNormals = face.vertexNormals;
            if ( vertexNormals.length === 3 )
                this.normals.push( vertexNormals[0], vertexNormals[1], vertexNormals[2] );
            else
            {
                let normal = face.normal;
                this.normals.push( normal, normal, normal );
            }

            let vertexColors = face.vertexColors;
            if ( vertexColors.length === 3 )
                this.colors.push( vertexColors[0], vertexColors[1], vertexColors[2] );
            else
            {
                let color = face.color;
                this.colors.push( color, color, color );
            }

            if ( hasFaceVertexUv === true )
            {
                let vertexUvs: Vector2[] = faceVertexUvs[0][i];
                if ( vertexUvs !== undefined )
                    this.uvs.push( vertexUvs[0], vertexUvs[1], vertexUvs[2] );
                else
                {
                    console.warn( 'THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ', i );
                    this.uvs.push( new Vector2(), new Vector2(), new Vector2() );
                }
            }

            if ( hasFaceVertexUv2 === true )
            {
                let vertexUvs: Vector2[] = faceVertexUvs[1][i];
                if ( vertexUvs !== undefined )
                    this.uvs2.push( vertexUvs[0], vertexUvs[1], vertexUvs[2] );
                else
                {
                    console.warn( 'THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ', i );
                    this.uvs2.push( new Vector2(), new Vector2(), new Vector2() );
                }
            }

            // morphs
            for ( let j = 0; j < morphTargetsLength; j++ )
            {
                let morphTarget = morphTargets[j].vertices;
                morphTargetsPosition[j].push( morphTarget[face.a], morphTarget[face.b], morphTarget[face.c] );
            }

            for ( let j = 0; j < morphNormalsLength; j++ )
            {
                let morphNormal = morphNormals[j].vertexNormals[i];
                morphTargetsNormal[j].push( morphNormal.a, morphNormal.b, morphNormal.c );
            }

            // skins
            if ( hasSkinIndices )
                this.skinIndices.push( skinIndices[face.a], skinIndices[face.b], skinIndices[face.c] );
            if ( hasSkinWeights )
                this.skinWeights.push( skinWeights[face.a], skinWeights[face.b], skinWeights[face.c] );
        }

        this.computeGroups( geometry );
        this.verticesNeedUpdate = geometry.verticesNeedUpdate;
        this.normalsNeedUpdate = geometry.normalsNeedUpdate;
        this.colorsNeedUpdate = geometry.colorsNeedUpdate;
        this.uvsNeedUpdate = geometry.uvsNeedUpdate;
        this.groupsNeedUpdate = geometry.groupsNeedUpdate;

        return this;
    }

}

export { DirectGeometry };
