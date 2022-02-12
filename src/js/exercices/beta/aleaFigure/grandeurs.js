import { texNombre2 } from '../../../modules/outils.js'
import { simplify } from 'mathjs'
// import { toTex } from '../../../modules/outilsMathjs'

export class Grandeur {
  constructor (name, value, precision = 1, unit = '') {
    this.name = name
    this.value = value
    this.precision = precision
    this.unit = unit
    this.toFixed = parseFloat(this.value.toFixed(this.precision))
    this.nameAndValue = undefined
  }

  set name (name) {
    this._name = name
    this._nameAndValue = `$ {${this.name}=${texNombre2(this.toFixed).replace(',', '{,}')}\\text{ }${this.unit}}$`
  }

  get name () { return this._name }

  set nameAndValue (nameAndValue) { this._nameAndValue = `$ {${this.name}=${texNombre2(this.toFixed).replace(',', '{,}')}\\text{ }${this.unit}}$` }
  get nameAndValue () { return this._nameAndValue }

  multiply (a) {
    return new Grandeur(simplify([this.name, a.name].filter(x => x !== '').join('*')).toString(), this.toFixed * a.toFixed, a.precision + this.precision, simplify([this.unit, a.unit].filter(x => x !== '').join('*')).toString())
  }

  divide (a) {
    return new Grandeur(simplify([this.name, a.name].filter(x => x !== '').join('/')).toString(), this.toFixed / a.toFixed, a.precision + this.precision, simplify([this.unit, a.unit].filter(x => x !== '').join('/')).toString())
  }
}
