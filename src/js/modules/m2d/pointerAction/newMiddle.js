import { Segment } from '../elements/lines/Segment';
import { Middle } from '../elements/points/Middle';
import { Point } from '../elements/points/Point';
export function newMiddle(figure, pointerX, pointerY) {
    for (const e of figure.set) {
        if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
            if (figure.selectedElements.length === 1) {
                const A = figure.selectedElements[0];
                if (A === e)
                    break;
                const s = new Segment(A, e, { temp: true });
                const M = new Middle(s);
                figure.clearSelectedElements();
                actionNewMiddleMessage(figure);
                return M;
            }
            else {
                e.select();
                figure.displayMessage('Cliquer sur l\'autre extrémité');
            }
        }
    }
}
export function actionNewMiddleMessage(figure) {
    if ([...figure.set].filter(element => element instanceof Point).length < 2) {
        figure.displayMessage('Il faut au moins deux points pour définir un milieu');
    }
    else
        figure.displayMessage('Cliquer sur les deux extrémités du segment');
}
//# sourceMappingURL=newMiddle.js.map