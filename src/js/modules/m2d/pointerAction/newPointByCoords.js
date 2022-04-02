import { Point } from '../elements/points/Point';
export function newPointByCoords(figure) {
    const event = new Event('waitForCoords');
    window.dispatchEvent(event);
    window.addEventListener('coordsAreSet', (event) => {
        const detail = event.detail;
        const x = detail.x;
        const y = detail.y;
        if (x !== undefined && y !== undefined) {
            const A = new Point(figure, x, y);
            return A;
        }
    }, { once: true });
}
//# sourceMappingURL=newPointByCoords.js.map