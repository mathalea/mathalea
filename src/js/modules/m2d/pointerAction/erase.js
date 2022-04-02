import { Element2D } from '../elements/Element2D';
import { Circle } from '../elements/lines/Circle';
import { Line } from '../elements/lines/Line';
import { Point } from '../elements/points/Point';
export function erase(figure, pointerX, pointerY) {
    for (const e of figure.set) {
        if ((e instanceof Point || e instanceof Line || e instanceof Circle) && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
            figure.set.delete(e);
            e.g.remove();
            for (const child of e.childs) {
                if (child instanceof Element2D) {
                    figure.set.delete(child);
                    child.g.remove();
                }
            }
        }
    }
}
export function actionErasetMessage(figure) {
    figure.displayMessage('Cliquer sur l\'objet à supprimer');
}
//# sourceMappingURL=erase.js.map