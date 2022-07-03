import { randint, stringNombre } from './outils.js'
import { boite } from './2d.js'
export class Pyramide {
    operation: string
    nombreEtages: number
    rangeData: number[]
    exclusions: number[]
    valeurs: number[][]
    isVisible: boolean[][]

    constructor ({ operation = '+', nombreEtages = 3, rangeData = [1, 10], exclusions = [] } = {}) {
      this.operation = operation
      this.nombreEtages = nombreEtages
      this.rangeData = rangeData
      this.valeurs = []
      this.isVisible = []
      for (let y = nombreEtages - 1; y >= 0; y--) {
        this.valeurs[y] = []
        this.isVisible[y] = []
        for (let x = 0; x <= y; x++) {
          if (y === nombreEtages - 1) this.valeurs[y][x] = randint(rangeData[0], rangeData[1], exclusions)
          else {
            switch (operation) {
              case '+':
                this.valeurs[y][x] = this.valeurs[y + 1][x] + this.valeurs[y + 1][x + 1]
                break
              case '*':
                this.valeurs[y][x] = this.valeurs[y + 1][x] * this.valeurs[y + 1][x + 1]
                break
            }
          }
          this.isVisible[y][x] = false
        }
      }
    }

    visible = function (x, y) { return this.isVisible[y][x] }
    estSolvable = function (x, y) {
      if (this.visible(x, y)) return true
      else if (y === this.nombreEtages - 1) return false
      else return this.estSolvable(x, y + 1) && this.estSolvable(x + 1, y + 1)
    }

    choisisUneCaseNonVisible = function () {
      let x, y
      let trouve = false
      let cpt = 0
      do {
        cpt++
        y = randint(1, this.nombreEtages - 1)
        x = randint(0, y)
        let seul = true
        for (let i = 0; i < y; i++) {
          if (i !== x && !this.visible(i, y)) seul = false
        }
        if (seul && cpt < 20) trouve = false
        else trouve = !this.visible(x, y)
      } while (!trouve)
      return [x, y]
    }

    aleatoirise = function () : void {
      let solvable = false
      do {
        const [x, y] = this.choisisUneCaseNonVisible()
        this.isVisible[y][x] = true
        solvable = this.estSolvable(0, 0)
      } while (!solvable)
    }

    representeMoi = function (xO: number, yO: number): object[] {
      const objets = []
      for (let y = this.nombreEtages; y > 0; y--) {
        for (let x = 0; x < y; x++) {
          if (this.isVisible[y - 1][x]) {
            objets.push(boite({
              Xmin: xO + x * 4 + (this.nombreEtages - y) * 2,
              Ymin: yO + this.nombreEtages - y,
              Xmax: xO + x * 4 + 4 + (this.nombreEtages - y) * 2,
              Ymax: yO + 1 + this.nombreEtages - y,
              texteIn: stringNombre(this.valeurs[y - 1][x], 0),
              texteOpacite: 1
            }))
          } else {
            objets.push(boite({
              Xmin: xO + x * 4 + (this.nombreEtages - y) * 2,
              Ymin: yO + this.nombreEtages - y,
              Xmax: xO + x * 4 + 4 + (this.nombreEtages - y) * 2,
              Ymax: yO + 1 + this.nombreEtages - y,
              texteIn: '',
              texteOpacite: 1
            }))
          }
        }
      }
      return objets
    }
}
