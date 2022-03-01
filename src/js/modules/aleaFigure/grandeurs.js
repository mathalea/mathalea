import { texNombre2 } from '../outils.js'
import { simplify, parse, unit, max, add, subtract, abs, log10, random } from 'mathjs'
import { aleaName } from '../outilsMathjs.js'
import { GraphicObject } from './elements.js'
/**
 * Grandeur, methods for operations
 *
 */
export class Grandeur {
  constructor (name, value, precision = 1, unit = '') {
    this.value = parseFloat(value.toFixed(precision))
    this.precision = precision
    this.unit = unit
    this.toFixed = parseFloat(this.value.toFixed(this.precision))
    this.name = name
  }

  set name (newname) {
    if (typeof newname === 'string') {
      this._name = newname
    } else {
      this._name = (aleaName(newname).map(x => x.name)).join('')
    }
    this.nameAndValue = `$ {${this.name}=${texNombre2(this.toFixed).replace(',', '{,}')}~${this.unit.replace('deg', '\\degree')}}$`.replace('~\\degree', '\\degree')
  }

  get name () { return this._name }
  format () {
    return `{${texNombre2(this.toFixed).replace(',', '{,}')}~${this.unit.replace('deg', '\\degree')}}`.replace('~\\degree', '\\degree')
  }

  /**
     *
     * @param nmin
     * @param nmax
     * @param digit
     * @returns
     */
  aleaName (...name) {
    this.name = aleaName(name.map(x => {
      if (x instanceof GraphicObject) {
        return x.name
      } else {
        return x
      }
    }), name.length).join('')
  }

  multiply (a) {
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('*').replaceAll('{', '(').replaceAll('}', ')')).toString()
    const calcul = parse(unit(this.toFixed + this.unit).multiply(unit(a.toFixed + a.unit)).toString())
    return new Grandeur(expression, parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()), this.precision + a.precision, calcul.isConstantNode ? '' : calcul.args[1].toString())
  }

  divide (a) {
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('/').replaceAll('{', '(').replaceAll('}', ')')).toString()
    const calcul = parse(unit(this.toFixed + this.unit).divide(unit(a.toFixed + a.unit)).toString())
    return new Grandeur(expression, parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()), this.precision - a.precision, calcul.isConstantNode ? '' : calcul.args[1].toString())
  }

  add (a) {
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('+').replaceAll('{', '(').replaceAll('}', ')')).toString()
    const calcul = parse(add(unit(this.toFixed + this.unit), unit(a.toFixed + a.unit)).toString())
    return new Grandeur(expression, parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()), max(this.precision, a.precision), calcul.isConstantNode ? '' : calcul.args[1].toString())
  }

  subtract (a) {
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('-').replaceAll('{', '(').replaceAll('}', ')')).toString()
    const calcul = parse(subtract(unit(this.toFixed + this.unit), unit(a.toFixed + a.unit)).toString())
    return new Grandeur(expression, parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()), max(this.precision, a.precision), calcul.isConstantNode ? '' : calcul.args[1].toString())
  }

  hypotenuse (a) {
    return a.pow(2).add(this.pow(2)).sqrt()
  }

  /**
     * this^n
     * @param n // Integer
     * @returns
     */
  pow (n) {
    return new Grandeur(this.name + '^{' + n + '}', Math.pow(this.toFixed, n), n * this.precision, this.unit + '^' + n)
  }

  /**
     * this^n
     * @param n // Integer
     * @returns
     */
  sqrt () {
    return new Grandeur('\\sqrt{' + this.name + '}', Math.pow(this.toFixed, 0.5), Math.floor(0.5 * this.precision), 'cm')
  }

  abs () {
    return new Grandeur(this._name, abs(this.value), this.precision, this.unit)
  }

  neg () {
    return new Grandeur('-' + this.name, -this.value, this.precision, this.unit)
  }

  to (newUnit) {
    const thenumber = abs(unit(this.value, this.unit))
    const conversion = abs(thenumber.to(newUnit))
    const precision = Math.max(0, this.precision - log10(parse(conversion.toString()).args[0].value / parse(thenumber.toString()).args[0].value))
    return new Grandeur(this.name, parse(conversion.toString()).args[0].value, precision, newUnit)
  }
}
/**
 * Quantity random
 * @param nmin
 * @param nmax
 * @param digit
 * @param name
 * @param unit
 * @returns
 */
export function qrandom (nmin = 0, nmax = 1, digit = max(0, -log10(abs(nmax - nmin))), name = '', unit = '') {
  return new Grandeur(name, parseFloat(random(nmin, nmax).toFixed(max(digit, 0))), digit, unit)
}
