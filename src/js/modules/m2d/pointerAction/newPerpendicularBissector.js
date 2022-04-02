import { PerpendicularBisector } from '../elements/lines/PerpendicularBisector';
import { Segment } from '../elements/lines/Segment';
import { Point } from '../elements/points/Point';
export function newPerpendicularBissector(figure, pointerX, pointerY) {
    for (const e of figure.set) {
        if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
            if (figure.selectedElements.length === 1) {
                const A = figure.selectedElements[0];
                const s = new Segment(A, e, { temp: true });
                const perpendicularBissector = new PerpendicularBisector(s, figure.pointerSetOptions);
                figure.clearSelectedElements();
                actionNewPerpendicularBissectorMessage(figure);
                return perpendicularBissector;
            }
            else {
                e.select();
                figure.displayMessage('Cliquer sur l\'autre extrémité');
            }
        }
    }
}
export function actionNewPerpendicularBissectorMessage(figure) {
    if ([...figure.set].filter(element => element instanceof Point).length < 2) {
        figure.displayMessage('Il faut au moins deux points pour tracer une médiatrice');
    }
    else
        figure.displayMessage('Cliquer sur les deux extrémités du segment');
}
//# sourceMappingURL=newPerpendicularBissector.js.map