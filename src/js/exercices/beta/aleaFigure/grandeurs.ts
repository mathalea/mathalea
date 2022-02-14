import { texNombre2 } from '../../../modules/outils.js'
import { simplify, parse, unit, max, add, subtract, abs } from 'mathjs'
import { aleaName } from '../../../modules/outilsMathjs.js'
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
    this.value = value
    this.precision = precision
    this.unit = unit
    this.toFixed = parseFloat(this.value.toFixed(this.precision))
    this.name = name
    this.calcul = name
  }

  set name (newname) {
    this._name = newname
    this.nameAndValue = `$ {${this.name}=${texNombre2(this.toFixed).replace(',', '{,}')}~${this.unit}}$`
  }

  get name () { return this._name }

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
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('*')).toString()
    const calcul = parse(unit(this.toFixed+this.unit).multiply(unit(a.toFixed+a.unit)).toString())
    return new Grandeur(
      expression,
      parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
      this.precision + a.precision,
      calcul.isConstantNode ? '' : calcul.args[1].toString()
      )
  }
  
  divide (a: Grandeur) {
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('/')).toString()
    const calcul = parse(unit(this.toFixed+this.unit).divide(unit(a.toFixed+a.unit)).toString())
    return new Grandeur(
      expression,
      parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
      this.precision - a.precision,
      calcul.isConstantNode ? '' : calcul.args[1].toString()
      )
  }

  add (a: Grandeur) {
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('+')).toString()
    const calcul = parse(add(unit(this.toFixed+this.unit),unit(a.toFixed+a.unit)).toString())
    return new Grandeur(
      expression,
      parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
      max(this.precision,a.precision),
      calcul.isConstantNode ? '' : calcul.args[1].toString()
      )
  }

  subtract (a: Grandeur) {
    const expression = simplify([this.name, a.name].filter(x => x !== '').join('-')).toString()
    const calcul = parse(subtract(unit(this.toFixed+this.unit),unit(a.toFixed+a.unit)).toString())
    return new Grandeur(
      expression,
      parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
      max(this.precision,a.precision),
      calcul.isConstantNode ? '' : calcul.args[1].toString()
      )
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
}

const a = new Grandeur('a',1,15,'cm')
const b = new Grandeur('a',3,15,'cm')
const c = a.divide(b)
