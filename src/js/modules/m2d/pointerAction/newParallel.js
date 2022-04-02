import { Line } from '../elements/lines/Line';
import { LineParallelByPoint } from '../elements/lines/LineParallelByPoint';
import { Segment } from '../elements/lines/Segment';
import { SegmentParallelByPoint } from '../elements/lines/SegmentParallelByPoint';
import { Point } from '../elements/points/Point';
export function newParallel(figure, pointerX, pointerY) {
    for (const e of figure.set) {
        if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15 && figure.selectedElements.filter(element => element instanceof Point).length === 0) {
            e.select();
            figure.displayMessage('Cliquer sur une droite');
            break;
        }
        if (e instanceof Line && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15 && figure.selectedElements.filter(element => element instanceof Line).length === 0) {
            e.select();
            figure.displayMessage('Cliquer sur un point');
            break;
        }
    }
    if (figure.selectedElements.length === 2) {
        figure.displayMessage('Cliquer sur une droite et sur un point');
        const A = figure.selectedElements.filter(element => element instanceof Point)[0];
        const L = figure.selectedElements.filter(element => element instanceof Line)[0];
        let d;
        if (L instanceof Segment) {
            d = new SegmentParallelByPoint(L, A, figure.pointerSetOptions);
        }
        else
            d = new LineParallelByPoint(L, A, figure.pointerSetOptions);
        figure.clearSelectedElements();
        return d;
    }
}
export function actionNewParallelMessage(figure) {
    if ([...figure.set].filter(element => element instanceof Line).length < 1) {
        figure.displayMessage('Il faut au moins une droite et un point pour tracer une droite parallèle');
    }
    else
        figure.displayMessage('Cliquer sur une droite et sur un point');
}
//# sourceMappingURL=newParallel.js.map