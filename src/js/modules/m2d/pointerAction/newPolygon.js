import { Polygon } from '../elements/lines/Polygon';
import { Point } from '../elements/points/Point';
export function newPolygon(points) {
    const figure = points[0].parentFigure;
    for (const e of points) {
        if (figure.selectedElements[0] === e) {
            const points = figure.selectedElements;
            const p = new Polygon(...points);
            if (figure.pointerSetOptions.color)
                p.color = figure.pointerSetOptions.color;
            if (figure.pointerSetOptions.thickness)
                p.thickness = figure.pointerSetOptions.thickness;
            if (figure.pointerSetOptions.dashed !== undefined)
                p.dashed = figure.pointerSetOptions.dashed;
            figure.selectedElements = [];
            figure.displayMessage('');
            return p;
        }
        else {
            e.select();
            figure.displayMessage('Cliquer sur autre point ou sur le premier sommet pour terminer');
        }
    }
}
export function actionNewPolygonMessage(figure) {
    if ([...figure.set].filter(element => element instanceof Point).length < 2) {
        figure.displayMessage('Il faut au moins trois points pour tracer un polygone');
    }
    else
        figure.displayMessage('Cliquer sur le premier sommet du polygone');
}
//# sourceMappingURL=newPolygon.js.map