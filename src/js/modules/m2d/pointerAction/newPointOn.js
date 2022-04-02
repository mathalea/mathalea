import { Circle } from '../elements/lines/Circle';
import { Line } from '../elements/lines/Line';
import { Segment } from '../elements/lines/Segment';
import { Angle } from '../elements/measures/Angle';
import { Coords } from '../elements/others/Coords';
import { PointOnCircle } from '../elements/points/PointOnCircle';
import { PointOnLine } from '../elements/points/PointOnLine';
import { PointOnSegment } from '../elements/points/PointOnSegment';
export function newPointOn(figure, pointerX, pointerY) {
    for (const e of figure.set) {
        if (e instanceof Segment && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
            let d = e.A.distancePointer(pointerX, pointerY);
            if ((pointerX < e.A.x && e.A.x < e.B.x) || (pointerX > e.A.x && e.A.x > e.B.x))
                d *= -1;
            else if ((pointerY < e.A.y && e.A.y < e.B.y) || (pointerY > e.A.y && e.A.y > e.B.y))
                d *= -1;
            const A = new PointOnSegment(e, { length: d });
            return A;
        }
        else if (e instanceof Line && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
            let d = e.A.distancePointer(pointerX, pointerY);
            if ((pointerX < e.A.x && e.A.x < e.B.x) || (pointerX > e.A.x && e.A.x > e.B.x))
                d *= -1;
            else if ((pointerY < e.A.y && e.A.y < e.B.y) || (pointerY > e.A.y && e.A.y > e.B.y))
                d *= -1;
            const A = new PointOnLine(e, { length: d });
            return A;
        }
        else if (e instanceof Circle && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
            const M = new Coords(pointerX, pointerY);
            const angle = e.pointOnCircle ? Angle.angleOriented(e.pointOnCircle, e.center, M) : Angle.angleOriented(e.M, e.center, M);
            const A = new PointOnCircle(e, { angle });
            return A;
        }
    }
}
export function actionNewPointOnMessage(figure) {
    if ([...figure.set].filter(element => element instanceof Line || element instanceof Circle).length < 1) {
        figure.displayMessage('Il faut au moins une droite ou un cercle');
    }
    else
        figure.displayMessage('Cliquer sur l\'objet où placer le point');
}
//# sourceMappingURL=newPointOn.js.map