import { texNombre2 } from '../../../modules/outils.js';
import { simplify, parse, unit } from 'mathjs';
import { aleaName } from '../../../modules/outilsMathjs.js';
import { GraphicObject } from './elements.js';
/**
 * Grandeur, methods for operations
 *
 */
export class Grandeur {
    constructor(name, value, precision = 1, unit = '') {
        this.value = value;
        this.precision = precision;
        this.unit = unit;
        this.toFixed = parseFloat(this.value.toFixed(this.precision));
        this.name = name;
        this.calcul = name;
    }
    set name(newname) {
        this._name = newname;
        this.nameAndValue = `$ {${this.name}=${texNombre2(this.toFixed).replace(',', '{,}')}~${this.unit}}$`;
    }
    get name() { return this._name; }
    aleaName(...name) {
        this.name = aleaName(name.map(x => {
            if (x instanceof GraphicObject) {
                return x.name;
            }
            else {
                return x;
            }
        }), name.length).join('');
    }
    multiply(a) {
        const expression = simplify([this.name, a.name].filter(x => x !== '').join('*')).toString();
        const calcul = parse(unit(this.toFixed + this.unit).multiply(unit(a.toFixed + a.unit)).toString());
        return new Grandeur(expression, parseFloat(calcul.args[0].toString()), this.precision + a.precision, calcul.args[1].toString());
    }
    divide(a) {
        const expression = simplify([this.name, a.name].filter(x => x !== '').join('/')).toString();
        const calcul = parse(unit(this.toFixed + this.unit).divide(unit(a.toFixed + a.unit)).toString());
        return new Grandeur(expression, parseFloat(calcul.args[0].toString()), this.precision - a.precision, calcul.args[1].toString());
    }
    add(a) {
        const calcul = simplify([this.name, a.name].filter(x => x !== '').join('+')).toString();
        // Si les deux grandeurs ne sont pas de même unité c'est celle de this qui est conservée
        return new Grandeur(calcul, this.toFixed + a.toFixed, Math.max(a.precision, this.precision), this.unit);
    }
    subtract(a) {
        const calcul = simplify([this.name, a.name].filter(x => x !== '').join('-')).toString();
        // Si les deux grandeurs ne sont pas de même unité c'est celle de this qui est conservée
        return new Grandeur(calcul, this.toFixed - a.toFixed, Math.max(a.precision, this.precision), this.unit);
    }
}
