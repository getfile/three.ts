import { Box3 } from './Box3';
import { Vector3 } from '../math/Vector3';
import { Plane } from './Plane';
import { Matrix4 } from '../math/Matrix4';

/**
 * @author bhouston / http://clara.io
 * @author mrdoob / http://mrdoob.com/
 */

class Sphere
{
    center: Vector3;
    radius: number;

    constructor(center?: Vector3, radius: number = 0)
    {
        this.center = (center !== undefined) ? center : new Vector3();
        this.radius = radius;
    }

    set(center: Vector3, radius: number): Sphere
    {
        this.center.copy(center);
        this.radius = radius;
        return this;
    }

    setFromPoints(points: Vector3[], optionalCenter?: Vector3): Sphere
    {
        var box = new Box3();
        var center: Vector3 = this.center;

        if (optionalCenter !== undefined)
            center.copy(optionalCenter);
        else
            box.setFromPoints(points).getCenter(center);

        var maxRadiusSq = 0;
        for (var i = 0, il = points.length; i < il; i++)
            maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));

        this.radius = Math.sqrt(maxRadiusSq);
        return this;
    }

    clone(): Sphere
    {
        return new Sphere().copy(this);
    }

    copy(sphere: Sphere): Sphere
    {
        this.center.copy(sphere.center);
        this.radius = sphere.radius;
        return this;
    }

    empty(): boolean
    {
        return (this.radius <= 0);
    }

    containsPoint(point): boolean
    {
        return (point.distanceToSquared(this.center) <= (this.radius * this.radius));
    }

    distanceToPoint(point: Vector3): number
    {
        return (point.distanceTo(this.center) - this.radius);
    }

    intersectsSphere(sphere: Sphere): boolean
    {
        var radiusSum = this.radius + sphere.radius;
        return sphere.center.distanceToSquared(this.center) <= (radiusSum * radiusSum);
    }

    intersectsBox(box: Box3): boolean
    {
        return box.intersectsSphere(this);
    }

    intersectsPlane(plane: Plane): boolean
    {
        return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
    }

    clampPoint(point: Vector3, optionalTarget?: Vector3): Vector3
    {
        var deltaLengthSq = this.center.distanceToSquared(point);
        var result = optionalTarget || new Vector3();
        result.copy(point);

        if (deltaLengthSq > (this.radius * this.radius))
        {
            result.sub(this.center).normalize();
            result.multiplyScalar(this.radius).add(this.center);
        }

        return result;
    }

    getBoundingBox(optionalTarget?: Box3): Box3
    {
        var box: Box3 = optionalTarget || new Box3();
        box.set(this.center, this.center);
        box.expandByScalar(this.radius);
        return box;
    }

    applyMatrix4(matrix: Matrix4): Sphere
    {
        this.center.applyMatrix4(matrix);
        this.radius = this.radius * matrix.getMaxScaleOnAxis();
        return this;
    }

    translate(offset: Vector3): Sphere
    {
        this.center.add(offset);
        return this;
    }

    equals(sphere: Sphere): boolean
    {
        return sphere.center.equals(this.center) && (sphere.radius === this.radius);
    }

}


export { Sphere };
