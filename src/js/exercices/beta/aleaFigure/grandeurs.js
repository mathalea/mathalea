import { texNombre2 } from '../../../modules/outils.js';
import { simplify, parse, unit, max, add, subtract } from 'mathjs';
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
        const expression = simplify([this.name, a.name].filter(x => x !== '').join('+')).toString();
        const calcul = parse(add(unit(this.toFixed + this.unit), unit(a.toFixed + a.unit)).toString());
        return new Grandeur(expression, parseFloat(calcul.args[0].toString()), max(this.precision, a.precision), calcul.args[1].toString());
    }
    subtract(a) {
        const expression = simplify([this.name, a.name].filter(x => x !== '').join('-')).toString();
        const calcul = parse(subtract(unit(this.toFixed + this.unit), unit(a.toFixed + a.unit)).toString());
        return new Grandeur(expression, parseFloat(calcul.args[0].toString()), max(this.precision, a.precision), calcul.args[1].toString());
    }
}
