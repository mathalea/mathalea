import { Circle } from '../elements/lines/Circle';
import { Line } from '../elements/lines/Line';
import { Polygon } from '../elements/lines/Polygon';
import { Point } from '../elements/points/Point';
import { PointByRotation } from '../elements/points/PointByRotation';
export function newReflectAboutPoint(clickedElements) {
    const figure = clickedElements.figure;
    for (const e of clickedElements.all) {
        if (figure.selectedElements.length === 1) {
            const A = figure.selectedElements[0];
            let B = null;
            if (e instanceof Line || e instanceof Circle || e instanceof Polygon) {
                B = e.rotation(A, 180);
                if (B && figure.pointerSetOptions.color)
                    B.color = figure.pointerSetOptions.color;
                if (B && figure.pointerSetOptions.thickness)
                    B.thickness = figure.pointerSetOptions.thickness;
                if (B && figure.pointerSetOptions.dashed !== undefined)
                    B.dashed = figure.pointerSetOptions.dashed;
            }
            else if (e instanceof Point) {
                B = new PointByRotation(e, A, 180);
            }
            figure.clearSelectedElements();
            A.select();
            return B;
        }
        else if (e instanceof Point) {
            e.select();
            figure.displayMessage('Cliquer sur l\'objet à transformer');
        }
    }
}
export function actionNewReflectAboutPointMessage(figure) {
    figure.displayMessage('Cliquer sur le centre de la symétrie centrale');
}
//# sourceMappingURL=newReflectAboutPoint.js.map