import { Circle } from '../elements/lines/Circle';
import { Line } from '../elements/lines/Line';
import { Polygon } from '../elements/lines/Polygon';
import { Point } from '../elements/points/Point';
export function setOptions(figure, pointerX, pointerY, options) {
    for (const e of figure.set) {
        if ((e instanceof Point || e instanceof Line || e instanceof Circle || e instanceof Polygon) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
            if (options.color)
                e.color = options.color;
            if (options.thickness)
                e.thickness = options.thickness;
            if (options.dashed !== undefined)
                e.dashed = options.dashed;
            break;
        }
    }
}
//# sourceMappingURL=setOptions.js.map