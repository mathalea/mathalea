import { Line } from '../elements/lines/Line';
import { Point } from '../elements/points/Point';
import { Circle } from '../elements/lines/Circle';
import { Polygon } from '../elements/lines/Polygon';
import { PointByHomothetie } from '../elements/points/PointByHomothetie';
export function newHomothetie(clickedElements) {
    const figure = clickedElements.figure;
    for (const e of clickedElements.all) {
        if (figure.selectedElements.length === 0 && e instanceof Point) {
            e.select();
            const event = new Event('waitForRapport');
            window.dispatchEvent(event);
            window.addEventListener('rapportIsSet', (event) => {
                const detail = event.detail;
                figure.pointerSetOptions.rapport = detail;
                figure.displayMessage('Cliquer sur l\'objet à transformer');
            }, { once: true });
            break;
        }
        else if (figure.selectedElements.length === 1) {
            const A = figure.selectedElements[0];
            let B = null;
            const k = figure.pointerSetOptions.rapport;
            if (k) {
                if (e instanceof Line || e instanceof Circle || e instanceof Polygon) {
                    B = e.homothetie(A, k);
                    if (B && figure.pointerSetOptions.color)
                        B.color = figure.pointerSetOptions.color;
                    if (B && figure.pointerSetOptions.thickness)
                        B.thickness = figure.pointerSetOptions.thickness;
                    if (B && figure.pointerSetOptions.dashed !== undefined)
                        B.dashed = figure.pointerSetOptions.dashed;
                }
                else if (e instanceof Point) {
                    B = new PointByHomothetie(e, A, k);
                }
                figure.clearSelectedElements();
                A.select();
                return B;
            }
            break;
        }
    }
}
export function actionNewHomothetieMessage(figure) {
    figure.displayMessage('Cliquer sur le centre de l\'homothétie');
}
//# sourceMappingURL=newHomothetie.js.map