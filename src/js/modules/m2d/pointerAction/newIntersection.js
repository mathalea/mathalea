import { Circle } from '../elements/lines/Circle';
import { Line } from '../elements/lines/Line';
import { Point } from '../elements/points/Point';
import { PointIntersectionCC } from '../elements/points/PointIntersectionCC';
import { PointIntersectionLC } from '../elements/points/PointIntersectionLC';
import { PointIntersectionLL } from '../elements/points/PointIntersectionLL';
export function newIntersection(figure, pointerX, pointerY) {
    for (const e of figure.set) {
        let p = null;
        let p2 = null;
        if ((e instanceof Line || e instanceof Circle) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
            if (figure.selectedElements.length === 1) {
                if (figure.selectedElements[0] instanceof Line && e instanceof Line) {
                    const L = figure.selectedElements[0];
                    p = new PointIntersectionLL(L, e);
                }
                else if (figure.selectedElements[0] instanceof Line && e instanceof Circle) {
                    const L = figure.selectedElements[0];
                    p = new PointIntersectionLC(L, e);
                    p2 = new PointIntersectionLC(L, e, 2);
                }
                else if (figure.selectedElements[0] instanceof Circle && e instanceof Line) {
                    const C = figure.selectedElements[0];
                    p = new PointIntersectionLC(e, C);
                    p2 = new PointIntersectionLC(e, C, 2);
                }
                else if (figure.selectedElements[0] instanceof Circle && e instanceof Circle) {
                    const C = figure.selectedElements[0];
                    p = new PointIntersectionCC(e, C);
                    p2 = new PointIntersectionCC(e, C, 2);
                }
                figure.clearSelectedElements();
                figure.displayMessage('Cliquer sur le premier objet pour créer un autre point d\'intersection');
                return [p, p2];
            }
            else {
                e.select();
                figure.displayMessage('Cliquer sur le deuxième objet');
            }
        }
    }
}
export function actionNewIntersection(figure) {
    if ([...figure.set].filter(element => !(element instanceof Point)).length < 2) {
        figure.displayMessage('Il n\'y a pas assez d\'objets pour définir un point d\'intersection');
    }
    else
        figure.displayMessage('Cliquer sur le premier objet');
}
//# sourceMappingURL=newIntersection.js.map