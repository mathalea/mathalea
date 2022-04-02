import { Point } from './Point';
export class Barycenter extends Point {
    constructor(points, { label, style = 'x', size = 0.15, thickness = 3, color = 'black', draggable = false, temp = false } = {}) {
        let Cx;
        let Cy;
        super(points[0].parentFigure, 0, 0, { style, size, thickness, color, draggable, temp });
        this.points = points;
        Cx = 0;
        Cy = 0;
        for (const point of points) {
            point.addChild(this);
            Cx += point.x;
            Cy += point.y;
        }
        Cx /= points.length;
        Cy /= points.length;
        this.x = Cx;
        this.y = Cy;
        this.update();
    }
    update() {
        try {
            let Cx;
            let Cy;
            Cx = 0;
            Cy = 0;
            for (const point of this.points) {
                Cx += point.x;
                Cy += point.y;
            }
            Cx /= this.points.length;
            Cy /= this.points.length;
            this.x = Cx;
            this.y = Cy;
            super.moveTo(Cx, Cy);
        }
        catch (error) {
            console.log('Erreur dans Barycenter.update()', error);
            this.exist = false;
        }
    }
}
//# sourceMappingURL=Barycenter.js.map