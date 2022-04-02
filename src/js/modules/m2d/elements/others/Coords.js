import { Point } from '../points/Point';
export class Coords {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static intersectionCCCoord(C1, C2, n = 1) {
        try {
            const O1 = C1.center;
            const O2 = C2.center;
            const r0 = C1.radius;
            const r1 = C2.radius;
            const x0 = O1.x;
            const x1 = O2.x;
            const y0 = O1.y;
            const y1 = O2.y;
            const dx = x1 - x0;
            const dy = y1 - y0;
            const d = Math.sqrt(dy * dy + dx * dx);
            if (d > r0 + r1) {
                return { x: NaN, y: NaN };
            }
            if (d < Math.abs(r0 - r1)) {
                return { x: NaN, y: NaN };
            }
            const a = (r0 * r0 - r1 * r1 + d * d) / (2.0 * d);
            const x2 = x0 + (dx * a) / d;
            const y2 = y0 + (dy * a) / d;
            const h = Math.sqrt(r0 * r0 - a * a);
            const rx = -dy * (h / d);
            const ry = dx * (h / d);
            const xi = x2 + rx;
            const xiPrime = x2 - rx;
            const yi = y2 + ry;
            const yiPrime = y2 - ry;
            if (n === 1) {
                if (yiPrime > yi) {
                    return new Coords(xiPrime, yiPrime);
                }
                else {
                    return new Coords(xi, yi);
                }
            }
            else {
                if (yiPrime > yi) {
                    return new Coords(xi, yi);
                }
                else {
                    return new Coords(xiPrime, yiPrime);
                }
            }
        }
        catch (error) {
            return new Coords(NaN, NaN);
        }
    }
    static intersectionLLCoord(L1, L2) {
        try {
            const [da, db, dc] = L1.equation;
            const [fa, fb, fc] = L2.equation;
            let x, y;
            if (fa * db - fb * da === 0) {
                return new Coords(NaN, NaN);
            }
            else {
                y = (fc * da - dc * fa) / (fa * db - fb * da);
            }
            if (da === 0) {
                x = (-fc - fb * y) / fa;
            }
            else {
                x = (-dc - db * y) / da;
            }
            return new Coords(x, y);
        }
        catch (error) {
            return new Coords(NaN, NaN);
        }
    }
    static intersectionSCCoord(L, C) {
        try {
            const { x } = Coords.intersectionLCCoord(L, C, 1);
            const [A, B] = [L.A, L.B];
            if (x !== undefined && Point.distance(A, B) > C.radius) {
                if (x < Math.max(A.x, B.x) && x > Math.min(A.x, B.x)) {
                    return Coords.intersectionLCCoord(L, C, 1);
                }
                else {
                    return Coords.intersectionLCCoord(L, C, 2);
                }
            }
            else
                return new Coords(NaN, NaN);
        }
        catch (error) {
            return new Coords(NaN, NaN);
        }
    }
    static intersectionLCCoord(D, C, n = 1) {
        try {
            const O = C.center;
            const r = C.radius;
            const [a, b, c] = D.equation;
            const xO = O.x;
            const yO = O.y;
            let Delta, delta, xi, yi, xiPrime, yiPrime;
            if (b === 0) {
                xi = -c / a;
                xiPrime = xi;
                Delta = 4 * (-xO * xO - (c * c) / (a * a) - (2 * xO * c) / a + r * r);
                if (Delta < 0)
                    return new Coords(NaN, NaN);
                else if (Math.abs(Delta) < 10 ** (-6)) {
                    yi = yO + Math.sqrt(Delta) / 2;
                    yiPrime = yi;
                }
                else {
                    yi = yO - Math.sqrt(Delta) / 2;
                    yiPrime = yO + Math.sqrt(Delta) / 2;
                }
            }
            else if (a === 0) {
                yi = -c / b;
                yiPrime = yi;
                Delta = 4 * (-yO * yO - (c * c) / (b * b) - (2 * yO * c) / b + r * r);
                if (Delta < 0)
                    return new Coords(NaN, NaN);
                else if (Math.abs(Delta) < 10 ** (-6)) {
                    xi = xO + Math.sqrt(Delta) / 2;
                    xiPrime = xi;
                }
                else {
                    xi = xO - Math.sqrt(Delta) / 2;
                    xiPrime = xO + Math.sqrt(Delta) / 2;
                }
            }
            else {
                Delta = (2 * ((a * c) / (b * b) + (yO * a) / b - xO)) ** 2 -
                    4 *
                        (1 + (a / b) ** 2) *
                        (xO * xO + yO * yO + (c / b) ** 2 + (2 * yO * c) / b - r * r);
                if (Delta < 0)
                    return new Coords(NaN, NaN);
                else if (Math.abs(Delta) < 10 ** (-6)) {
                    delta = Math.sqrt(Delta);
                    xi = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) /
                        (2 * (1 + (a / b) ** 2));
                    xiPrime = xi;
                    yi = (-a * xi - c) / b;
                    yiPrime = yi;
                }
                else {
                    delta = Math.sqrt(Delta);
                    xi = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) /
                        (2 * (1 + (a / b) ** 2));
                    xiPrime = (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) + delta) /
                        (2 * (1 + (a / b) ** 2));
                    yi = (-a * xi - c) / b;
                    yiPrime = (-a * xiPrime - c) / b;
                }
            }
            if (n === 1) {
                if (yiPrime > yi) {
                    return new Coords(xiPrime, yiPrime);
                }
                else {
                    return new Coords(xi, yi);
                }
            }
            else {
                if (yiPrime > yi) {
                    return new Coords(xi, yi);
                }
                else {
                    return new Coords(xiPrime, yiPrime);
                }
            }
        }
        catch (error) {
            return new Coords(NaN, NaN);
        }
    }
    static orthogonalProjectionCoord(M, d) {
        try {
            const [a, b, c] = d.equation;
            const k = 1 / (a * a + b * b);
            let x, y;
            if (a === 0) {
                x = M.x;
                y = -c / b;
            }
            else if (b === 0) {
                y = M.y;
                x = -c / a;
            }
            else {
                x = k * (b * b * M.x - a * b * M.y - a * c);
                y = k * (-a * b * M.x + a * a * M.y + (a * a * c) / b) - c / b;
            }
            return new Coords(x, y);
        }
        catch (error) {
            return new Coords(NaN, NaN);
        }
    }
    static rotationCoord(A, O, angle) {
        try {
            const x = (O.x + (A.x - O.x) * Math.cos((angle * Math.PI) / 180) - (A.y - O.y) * Math.sin((angle * Math.PI) / 180));
            const y = (O.y + (A.x - O.x) * Math.sin((angle * Math.PI) / 180) + (A.y - O.y) * Math.cos((angle * Math.PI) / 180));
            return new Coords(x, y);
        }
        catch (error) {
            return new Coords(NaN, NaN);
        }
    }
    static homothetieCoord(A, O, k) {
        try {
            const x = (O.x + k * (A.x - O.x));
            const y = (O.y + k * (A.y - O.y));
            return new Coords(x, y);
        }
        catch {
            return new Coords(NaN, NaN);
        }
    }
    static similitudeCoord(A, O, k, angle) {
        try {
            const angleRadian = angle * Math.PI / 180;
            const x = (O.x + k * (Math.cos(angleRadian) * (A.x - O.x) - Math.sin(angleRadian) * (A.y - O.y)));
            const y = (O.y + k * (Math.cos(angleRadian) * (A.y - O.y) + Math.sin(angleRadian) * (A.x - O.x)));
            return new Coords(x, y);
        }
        catch (error) {
            return new Coords(NaN, NaN);
        }
    }
}
//# sourceMappingURL=Coords.js.map