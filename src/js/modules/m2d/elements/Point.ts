type Binome = {x:number, y:number}

export class Point {
    x: number
    y: number
    // On définit un point avec ses deux coordonnées
    constructor (x: number, y: number) {
      this.x = x
      this.y = y
    }

    // Translation définie par ses coordonnées
    translation (arg1: number | Binome, arg2?: number) {
      let abs : number
      let ord : number
      if (typeof arg1 === 'number') {
        abs = arg1
        ord = arg2 || 0
      } else {
        abs = arg1.x
        ord = arg1.y
      }
      this.x += abs
      this.y += ord
      return this
    }
}
