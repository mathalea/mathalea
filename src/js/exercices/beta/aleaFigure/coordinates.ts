
/**
 * @class for coordinates
 */
export class Coordinates {
  r: number
  x: number
  y: number
  theta: number
  getCartesianCoordinates () {
    if (this instanceof Cartesian) {
      return this
    }
    if (this instanceof Polar) {
      return new Cartesian(
        this.r * Math.cos(this.theta),
        this.r * Math.sin(this.theta)
      )
    }
    return undefined
  }

  getPolarCoordinates () {
    if (this instanceof Cartesian) {
      return new Polar(
        Math.sqrt(this.x ** 2 + this.y ** 2),
        Math.atan(this.y / this.x))
    }
    if (this instanceof Polar) {
      return this
    }
    return undefined
  }
}

/**
     * @class for cartesian coordinates
     */
export class Cartesian extends Coordinates {
  constructor (x: number, y: number) {
    super()
    this.x = x
    this.y = y
  }
}

/**
     * @class for polar coordinates
     */
export class Polar extends Coordinates {
  constructor (r: number, theta: number) {
    super()
    this.r = r
    this.theta = theta
  }
}
