import { texNombre2 } from '../outils.js'
import { simplify, parse, unit, max, add, subtract, abs, log10, random, min } from 'mathjs'
import { aleaName } from '../outilsMathjs.js'
import { GraphicObject } from './elements.js'

/**
 * Grandeur, methods for operations
 * 
 */
export class Grandeur {
  value: number
  precision: number
  unit: string
  toFixed: number
  nameAndValue: string
  private _name: string
  calcul: string
  constructor (name: string, value: number, precision:number = 1, unit: string = '') {
    this.value = parseFloat(value.toFixed(precision))
    this.precision = precision
    this.unit = unit
    this.toFixed = parseFloat(this.value.toFixed(this.precision))
    this.name = name
    this.calcul = name
  }

  set name (newname) {
    this._name = newname
    this.nameAndValue = `$ {${this.name}=${texNombre2(this.toFixed).replace(',', '{,}')}~${this.unit.replace('deg','\\degree')}}$`.replace('~\\degree','\\degree')
  }

  get name () { return this._name }

  format() { 
    return `{${texNombre2(this.toFixed).replace(',', '{,}')}~${this.unit.replace('deg','\\degree')}}`.replace('~\\degree','\\degree')
  }
  /**
   * 
   * @param nmin 
   * @param nmax 
   * @param digit 
   * @returns 
   */

  aleaName (...name: (string | GraphicObject)[]) {
    this.name = aleaName(name.map(x => {
      if (x instanceof GraphicObject) {
        return x.name
      } else {
        return x
      }
    }), name.length).join('')
}

  multiply (a: Grandeur) {
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('*').replaceAll('{','(').replaceAll('}',')')).toString()
    const calcul = parse(unit(this.toFixed+this.unit).multiply(unit(a.toFixed+a.unit)).toString())
    return new Grandeur(
      expression,
      parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
      this.precision + a.precision,
      calcul.isConstantNode ? '' : calcul.args[1].toString()
      )
  }
  
  divide (a: Grandeur) {
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('/').replaceAll('{','(').replaceAll('}',')')).toString()
    const calcul = parse(unit(this.toFixed+this.unit).divide(unit(a.toFixed+a.unit)).toString())
    return new Grandeur(
      expression,
      parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
      this.precision - a.precision,
      calcul.isConstantNode ? '' : calcul.args[1].toString()
      )
  }

  add (a: Grandeur) {
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('+').replaceAll('{','(').replaceAll('}',')')).toString()
    const calcul = parse(add(unit(this.toFixed+this.unit),unit(a.toFixed+a.unit)).toString())
    return new Grandeur(
      expression,
      parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
      max(this.precision,a.precision),
      calcul.isConstantNode ? '' : calcul.args[1].toString()
      )
  }

  subtract (a: Grandeur) {
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('-').replaceAll('{','(').replaceAll('}',')')).toString()
    const calcul = parse(subtract(unit(this.toFixed+this.unit),unit(a.toFixed+a.unit)).toString())
    return new Grandeur(
      expression,
      parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
      max(this.precision,a.precision),
      calcul.isConstantNode ? '' : calcul.args[1].toString()
      )
  }

  hypotenuse (a: Grandeur) {
    return a.pow(2).add(this.pow(2)).sqrt()
  }

  /**
   * this^n
   * @param n // Integer
   * @returns 
   */
  pow (n: number) {
    return new Grandeur(this.name+'^{'+n+'}',Math.pow(this.toFixed,n),n*this.precision,this.unit+'^'+n)
  }

  /**
   * this^n
   * @param n // Integer
   * @returns 
   */
   sqrt () {
    return new Grandeur('\\sqrt{'+this.name+'}',Math.pow(this.toFixed,0.5),Math.floor(0.5*this.precision),'cm')
  }

  abs (): Grandeur {
    return new Grandeur(
      this.name,
      abs(this.value),
      this.precision,
      this.unit
      )
  }

  neg (): Grandeur {
    return new Grandeur(
      '-' + this.name,
      -this.value,
      this.precision,
      this.unit
      )
  }

  to (newUnit: string): Grandeur {
    const thenumber = abs(unit(this.value,this.unit))
    const conversion = abs(thenumber.to(newUnit))
    const precision = Math.max(0,this.precision - log10(parse(conversion.toString()).args[0].value/parse(thenumber.toString()).args[0].value))
    return new Grandeur(
      this.name,
      parse(conversion.toString()).args[0].value,
      precision,
      newUnit
    )
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
export function qrandom (nmin: number = 0, nmax: number = 1, digit: number = max(0,-log10(abs(nmax-nmin))), name: string = '', unit: string = ''): Grandeur {
  return new Grandeur(
    name,
    parseFloat(random(nmin, nmax).toFixed(max(digit,0))),
    digit,
    unit
  )
}