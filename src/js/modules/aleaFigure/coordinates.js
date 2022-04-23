import { texNombre2 } from '../../modules/outils.js'
import { round } from 'mathjs'
export class GVCoordinates {
  constructor () {
    this.r = 0
    this.x = 0
    this.y = 0
    this.theta = 0
  }

  getCartesianCoordinates () {
    if (this instanceof GVPolar) {
      return new GVCartesian(this.r * Math.cos(this.theta), this.r * Math.sin(this.theta))
    } else {
      return this
    }
  }

  getPolarCoordinates () {
    if (this instanceof GVCartesian) {
      return new GVPolar(Math.sqrt(this.x ** 2 + this.y ** 2), Math.atan(this.y / this.x))
    } else {
      return this
    }
  }

  format () {
    return `(${texNombre2(round(this.x, 3))}{;}${texNombre2(round(this.y, 3))})`.replaceAll(',', '{,}').replaceAll('{{,}}', '{,}')
  }
}
export class GVCartesian extends GVCoordinates {
  constructor (x, y) {
    super()
    this.x = x
    this.y = y
  }

  format () {
    return `(${texNombre2(round(this.x, 3))}{;}${texNombre2(round(this.y, 3))})`.replaceAll(',', '{,}').replaceAll('{{,}}', '{,}')
  }
}
export class GVPolar extends GVCoordinates {
  constructor (r, theta) {
    super()
    this.r = r
    this.theta = theta
  }

  format () {
    return `(${texNombre2(round(this.r, 3))}{;}${texNombre2(round(this.theta, 3))})`.replaceAll(',', '{,}').replaceAll('{{,}}', '{,}')
  }
}
