import { AngleBisector } from '../elements/lines/AngleBisector';
import { Point } from '../elements/points/Point';
export function newAngleBissector(figure, pointerX, pointerY) {
    for (const e of figure.set) {
        if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
            if (figure.selectedElements.length === 0) {
                e.select();
                figure.displayMessage('Cliquer sur le sommet de l\'angle');
            }
            else if (figure.selectedElements.length === 1) {
                e.select();
                figure.displayMessage('Cliquer sur un point du 2e côté');
            }
            else {
                const A = figure.selectedElements[0];
                const O = figure.selectedElements[1];
                const B = e;
                const angleBissector = new AngleBisector(A, O, B, figure.pointerSetOptions);
                figure.clearSelectedElements();
                actionNewAngleBissectorMessage(figure);
                return angleBissector;
            }
        }
    }
}
export function actionNewAngleBissectorMessage(figure) {
    if ([...figure.set].filter(element => element instanceof Point).length < 3) {
        figure.displayMessage('Il faut au moins trois points pour tracer une bissectrice');
    }
    else
        figure.displayMessage('Cliquer sur un point du 1er côté');
}
//# sourceMappingURL=newAngleBissector.js.map