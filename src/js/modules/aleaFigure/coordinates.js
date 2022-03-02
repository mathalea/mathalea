/**
 * @class for coordinates
 */
export class Coordinates {
<<<<<<< HEAD
    constructor() {
        this.r = 0;
        this.x = 0;
        this.y = 0;
        this.theta = 0;
    }
    getCartesianCoordinates() {
        if (this instanceof Polar) {
            return new Cartesian(this.r * Math.cos(this.theta), this.r * Math.sin(this.theta));
        }
        else {
            return this;
        }
    }
    getPolarCoordinates() {
        if (this instanceof Cartesian) {
            return new Polar(Math.sqrt(this.x ** 2 + this.y ** 2), Math.atan(this.y / this.x));
        }
        else {
            return this;
        }
    }
=======
  constructor () {
    this.r = 0
    this.x = 0
    this.y = 0
    this.theta = 0
  }

  getCartesianCoordinates () {
    if (this instanceof Polar) {
      return new Cartesian(this.r * Math.cos(this.theta), this.r * Math.sin(this.theta))
    } else {
      return this
    }
  }

  getPolarCoordinates () {
    if (this instanceof Cartesian) {
      return new Polar(Math.sqrt(this.x ** 2 + this.y ** 2), Math.atan(this.y / this.x))
    } else {
      return this
    }
  }
>>>>>>> fpiou-3L13-4
}
/**
     * @class for cartesian coordinates
     */
export class Cartesian extends Coordinates {
<<<<<<< HEAD
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
=======
  constructor (x, y) {
    super()
    this.x = x
    this.y = y
  }
>>>>>>> fpiou-3L13-4
}
/**
     * @class for polar coordinates
     */
export class Polar extends Coordinates {
<<<<<<< HEAD
    constructor(r, theta) {
        super();
        this.r = r;
        this.theta = theta;
    }
=======
  constructor (r, theta) {
    super()
    this.r = r
    this.theta = theta
  }
>>>>>>> fpiou-3L13-4
}
