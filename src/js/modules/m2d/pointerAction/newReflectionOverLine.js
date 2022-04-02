import { Circle } from '../elements/lines/Circle';
import { Line } from '../elements/lines/Line';
import { Polygon } from '../elements/lines/Polygon';
import { Point } from '../elements/points/Point';
import { PointByReflectionOverLine } from '../elements/points/PointByReflectionOverLine';
export function newReflectionOverLine(clickedElements) {
    const figure = clickedElements.figure;
    for (const e of clickedElements.all) {
        if (figure.selectedElements.length === 0 && e instanceof Line) {
            e.select();
            figure.displayMessage('Cliquer sur l\'objet à transformer');
            break;
        }
        else if (figure.selectedElements.length === 1) {
            const L = figure.selectedElements[0];
            let B = null;
            if (e instanceof Line || e instanceof Circle || e instanceof Polygon) {
                B = e.reflectionOverLine(L);
                if (B && figure.pointerSetOptions.color)
                    B.color = figure.pointerSetOptions.color;
                if (B && figure.pointerSetOptions.thickness)
                    B.thickness = figure.pointerSetOptions.thickness;
                if (B && figure.pointerSetOptions.dashed !== undefined)
                    B.dashed = figure.pointerSetOptions.dashed;
            }
            else if (e instanceof Point) {
                B = new PointByReflectionOverLine(e, L);
            }
            figure.clearSelectedElements();
            L.select();
            return B;
        }
    }
}
export function actionNewReflectionOverLineMessage(figure) {
    figure.displayMessage('Cliquer sur l\'axe de symétrie');
}
//# sourceMappingURL=newReflectionOverLine.js.map