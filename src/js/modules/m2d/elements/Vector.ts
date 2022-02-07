export class Vector {
  x: number
  y: number

  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  get norme () {
    return Math.sqrt(this.x ** 2 + this.y ** 2).toFixed(6)
  }
}
