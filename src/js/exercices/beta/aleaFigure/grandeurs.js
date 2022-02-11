import { texNombre2 } from '../../../modules/outils.js'

export class Grandeur {
  constructor (name, value, precision = 1, unit = '') {
    this.name = name
    this.value = value
    this.precision = precision
    this.unit = unit
    this.toFixed = parseFloat(this.value.toFixed(this.precision))
    this.toTex = `$ {${this.name}=${texNombre2(this.toFixed).replace(',', '{,}')}\\text{ ${this.unit}}}$`
  }

  set name (name) {
    this._name = name
    this.toTex = `$ {${this.name}=${texNombre2(this.toFixed).replace(',', '{,}')}\\text{ ${this.unit}}}$`
  }

  get name () { return this._name }

  set toTex (toTex) { this._toTex = `$ {${this.name}=${texNombre2(this.toFixed).replace(',', '{,}')}\\text{ ${this.unit}}}$` }
  get toTex () { return this._toTex }

  multiply (a) {
    return new Grandeur(a.name + this.name, a.toFixed * this.toFixed, a.precision + this.precision, a.unit + this.unit)
  }
}
