import { VectorByPoints } from '../elements/others/VectorByPoints';
import { Point } from '../elements/points/Point';
export function newVector(figure, pointerX, pointerY) {
    for (const e of figure.set) {
        if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
            if (figure.selectedElements.length === 1) {
                const A = figure.selectedElements[0];
                const s = new VectorByPoints(A, e, figure.pointerSetOptions);
                figure.selectedElements = [];
                actionNewVectorMessage(figure);
                return s;
            }
            else {
                figure.selectedElements.push(e);
                figure.displayMessage('Cliquer sur l\'extrémité du vecteur');
            }
        }
    }
}
export function actionNewVectorMessage(figure) {
    if ([...figure.set].filter(element => element instanceof Point).length < 2) {
        figure.displayMessage('Il faut au moins deux points pour tracer un vecteur');
    }
    else
        figure.displayMessage('Cliquer sur l\'origine du vecteur');
}
//# sourceMappingURL=newVector.js.map