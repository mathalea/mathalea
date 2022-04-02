import { Circle } from '../elements/lines/Circle';
import { Point } from '../elements/points/Point';
export function newCircleRadius(figure, pointerX, pointerY) {
    let C;
    for (const e of figure.set) {
        if (e instanceof Point && e.distancePointer(pointerX, pointerY) * figure.pixelsPerUnit < 15) {
            e.select();
            const O = e;
            const event = new Event('waitForRadius');
            window.dispatchEvent(event);
            window.addEventListener('radiusIsSet', (event) => {
                const detail = event.detail;
                const r = detail || 0;
                if (r > 0) {
                    C = new Circle(O, r, figure.pointerSetOptions);
                }
                figure.clearSelectedElements();
                figure.displayMessage('Cliquer sur le centre du cercle');
                return C;
            }, { once: true });
        }
    }
}
export function actionNewCircleRadiusMessage(figure) {
    if ([...figure.set].filter(element => element instanceof Point).length < 1) {
        figure.displayMessage('Il faut au moins un point pour tracer un cercle');
    }
    else
        figure.displayMessage('Cliquer sur le centre du cercle');
}
//# sourceMappingURL=newCircleRadius.js.map