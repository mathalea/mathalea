import { Circle } from '../elements/lines/Circle';
import { Line } from '../elements/lines/Line';
import { Polygon } from '../elements/lines/Polygon';
import { VectorByPoints } from '../elements/others/VectorByPoints';
import { Point } from '../elements/points/Point';
import { PointByTranslationVector } from '../elements/points/PointByTranslationVector';
export function newTranslationBy2Points(clickedElements) {
    const figure = clickedElements.figure;
    let A = null;
    let B = null;
    let M = null;
    for (const e of clickedElements.all) {
        if (figure.selectedElements.length === 0 && e instanceof Point) {
            e.select();
            figure.displayMessage('Cliquer sur le deuxième point qui définit la translation');
            break;
        }
        else if (figure.selectedElements.length === 1 && e instanceof Point) {
            e.select();
            figure.displayMessage('Cliquer sur l\'objet à transformer');
            break;
        }
        else if (figure.selectedElements.length === 2) {
            A = figure.selectedElements[0];
            B = figure.selectedElements[1];
            const v = new VectorByPoints(A, B);
            if (e instanceof Circle || e instanceof Line || e instanceof Polygon) {
                M = e.translationVector(v);
                if (M && figure.pointerSetOptions.color)
                    M.color = figure.pointerSetOptions.color;
                if (M && figure.pointerSetOptions.thickness)
                    M.thickness = figure.pointerSetOptions.thickness;
                if (M && figure.pointerSetOptions.dashed !== undefined)
                    M.dashed = figure.pointerSetOptions.dashed;
            }
            else if (e instanceof Point) {
                M = new PointByTranslationVector(e, v);
            }
            figure.clearSelectedElements();
            A.select();
            B.select();
            return M;
        }
    }
}
export function actionNewTranslationBy2PointseMessage(figure) {
    figure.displayMessage('Cliquer sur le premier point qui définit la translation');
}
//# sourceMappingURL=newTranslationBy2Points.js.map