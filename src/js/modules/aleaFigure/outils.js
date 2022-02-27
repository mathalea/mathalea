import { Point, Polygon } from './elements';
export function circularPermutation(arg, n = Math.random() * arg.length) {
    if (typeof arg === 'string') {
        arg = arg.split('');
    }
    n = parseInt((n % arg.length).toString());
    return arg.concat(arg).splice(n, arg.length);
}
export function getDimensions(...figures) {
    const listePoints = [];
    const listeXPoints = [];
    const listeYPoints = [];
    for (const fig of figures) {
        if (fig instanceof Point) {
            listePoints.push(fig);
            listeXPoints.push(fig.x);
            listeYPoints.push(fig.y);
        }
        else if (fig instanceof Polygon) {
            listePoints.push(...fig.vertices);
            listeXPoints.push(fig.getDimensions()[0], fig.getDimensions()[2]);
            listeYPoints.push(fig.getDimensions()[1], fig.getDimensions()[3]);
        }
    }
    const xmin = Math.min(...listeXPoints);
    const xmax = Math.max(...listeXPoints);
    const ymin = Math.min(...listeYPoints);
    const ymax = Math.max(...listeYPoints);
    return [xmin, ymin, xmax, ymax];
}
