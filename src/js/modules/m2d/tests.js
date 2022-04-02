import { Segment } from './elements/lines/Segment';
import { Figure } from './Figure';
import { Point } from './elements/points/Point';
import { Cursor } from './elements/measures/Cursor';
import { randint } from './calculus/random';
import { Circle } from './elements/lines/Circle';
const figure = new Figure();
export function testAll() {
    let result = true;
    try {
        if (testPoint())
            console.log('testPoint OK');
    }
    catch (error) {
        console.log('erreur dans testPoint');
        console.log(error);
        result = false;
    }
    try {
        if (testSegment())
            console.log('testSegment Ok');
    }
    catch (error) {
        console.log('erreur dans testSegment');
        console.log(error);
        result = false;
    }
    try {
        if (testCursor())
            console.log('testCursor Ok');
    }
    catch (error) {
        console.log('erreur dans testCursor');
        console.log(error);
        result = false;
    }
    return result;
}
function testPoint() {
    let result = true;
    try {
        for (let x = -10; x < 10; x += 2) {
            for (let y = -10; y < 10; y += 2) {
                const M = new Point(figure, x, y);
            }
        }
    }
    catch (error) {
        result = false;
        console.log(error);
    }
    return result;
}
function testSegment() {
    let result = true;
    try {
        const M = new Point(figure, 5, 5, { temp: true, style: '' });
        const N = new Point(figure, 5, 5, { temp: true, style: '' });
        for (let x = -10; x < 0; x++) {
            for (let y = 0; y < 10; y++) {
                M.moveTo(x, y);
                N.moveTo(y, x);
                const s = new Segment(M, N);
                M.removeChild(s);
                N.removeChild(s);
            }
        }
    }
    catch (error) {
        result = false;
        console.log(error);
    }
    return result;
}
function testCursor() {
    let result = true;
    try {
        const c = new Cursor(figure, 0, 0, { min: randint(-5, 0), max: randint(5, 10), length: 5, step: 0.1 });
        for (let i = 0; i < 100; i++) {
            c.value = randint(c.min, c.max);
            c.update();
        }
    }
    catch (error) {
        result = false;
        console.log(error);
    }
    return result;
}
function testCircle() {
    let result = true;
    try {
        const A = new Point(figure, 0, 0);
        const c = new Circle(A, 5);
    }
    catch (error) {
        result = false;
        console.log(error);
    }
    return result;
}
//# sourceMappingURL=tests.js.map