import { Line } from '../elements/lines/Line';
import { Point } from '../elements/points/Point';
import { PointByRotation } from '../elements/points/PointByRotation';
import { Circle } from '../elements/lines/Circle';
import { Polygon } from '../elements/lines/Polygon';
export function newRotation(clickedElements) {
    const figure = clickedElements.figure;
    for (const e of clickedElements.all) {
        if (figure.selectedElements.length === 0 && e instanceof Point) {
            e.select();
            const event = new Event('waitForAngle');
            window.dispatchEvent(event);
            window.addEventListener('angleIsSet', (event) => {
                const detail = event.detail;
                figure.pointerSetOptions.angle = detail;
                figure.displayMessage('Cliquer sur l\'objet à transformer');
            }, { once: true });
            break;
        }
        else if (figure.selectedElements.length === 1) {
            const A = figure.selectedElements[0];
            let B = null;
            const r = figure.pointerSetOptions.angle;
            if (r) {
                if (e instanceof Line || e instanceof Circle || e instanceof Polygon) {
                    B = e.rotation(A, r);
                    if (B && figure.pointerSetOptions.color)
                        B.color = figure.pointerSetOptions.color;
                    if (B && figure.pointerSetOptions.thickness)
                        B.thickness = figure.pointerSetOptions.thickness;
                    if (B && figure.pointerSetOptions.dashed !== undefined)
                        B.dashed = figure.pointerSetOptions.dashed;
                }
                else if (e instanceof Point) {
                    B = new PointByRotation(e, A, r);
                }
                figure.clearSelectedElements();
                A.select();
                return B;
            }
            break;
        }
    }
}
export function actionNewRotationMessage(figure) {
    figure.displayMessage('Cliquer sur le centre de la rotation');
}
//# sourceMappingURL=newRotation.js.map