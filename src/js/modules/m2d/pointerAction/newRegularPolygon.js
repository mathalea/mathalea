import { RegularPolygon } from '../elements/lines/RegularPolygon';
import { Point } from '../elements/points/Point';
export function newRegularPolygon(points) {
    const figure = points[0].parentFigure;
    for (const e of points) {
        if (figure.selectedElements.length === 0) {
            e.select();
            figure.displayMessage('Cliquer sur le 2e sommet');
        }
        else {
            e.select();
            const A = figure.selectedElements[0];
            const B = figure.selectedElements[1];
            const event = new Event('waitForNumberOfSides');
            window.dispatchEvent(event);
            window.addEventListener('numberOfSidesIsSet', (event) => {
                const detail = event.detail;
                const n = detail || 2;
                const P = new RegularPolygon(A, B, n, figure.pointerSetOptions);
                figure.clearSelectedElements();
                figure.displayMessage('Cliquer sur le 1er sommet pour créer un autre polygone régulier');
                return P;
            }, { once: true });
        }
    }
}
export function actionNewRegularPolygonMessage(figure) {
    if ([...figure.set].filter(element => element instanceof Point).length < 1) {
        figure.displayMessage('Il faut au moins deux point pour définir le 1er côté d\'un polygone régulier');
    }
    else
        figure.displayMessage('Cliquer sur le 1er sommet');
}
//# sourceMappingURL=newRegularPolygon.js.map