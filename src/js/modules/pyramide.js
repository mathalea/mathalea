import { fraction } from './fractions.js'
import { randint, stringNombre, choice } from './outils.js'
import { boite } from './2d.js'

export default class Pyramide {
  /**
 *
 * @param {object} param0
 * @param {string} param0.operation
 * @param {number} param0.nombreEtages
 * @param {number[]|number[][]} param0.rangeData
 * @param {number[]}  param0.exclusions
 * @param {boolean} param0.fractionOn
 */
  constructor ({ operation = '+', nombreEtages = 3, rangeData = [1, 10], exclusions = [], fractionOn = false } = {}) {
    this.operation = operation
    this.nombreEtages = nombreEtages
    this.rangeData = rangeData
    this.valeurs = []
    this.isVisible = []
    this.fractionOn = fractionOn
    for (let y = nombreEtages - 1; y >= 0; y--) {
      this.valeurs[y] = []
      this.isVisible[y] = []
      for (let x = 0, num, den; x <= y; x++) {
        if (y === nombreEtages - 1) {
          if (this.fractionOn) {
            den = choice(rangeData[1])
            num = randint(rangeData[0][0], rangeData[0][1], exclusions.concat([den]))
            this.valeurs[y][x] = fraction(num, den).simplifie()
          } else {
            this.valeurs[y][x] = randint(rangeData[0], rangeData[1], exclusions)
          }
        } else {
          switch (operation) {
            case '+':
              if (this.fractionOn) {
                this.valeurs[y][x] = this.valeurs[y + 1][x].sommeFraction(this.valeurs[y + 1][x + 1]).simplifie()
              } else {
                this.valeurs[y][x] = this.valeurs[y + 1][x] + this.valeurs[y + 1][x + 1]
              }
              break
            case '*':
              if (this.fractionOn) {
                this.valeurs[y][x] = this.valeurs[y + 1][x].produitFraction(this.valeurs[y + 1][x + 1]).simplifie()
              } else {
                this.valeurs[y][x] = this.valeurs[y + 1][x] * this.valeurs[y + 1][x + 1]
              }

              break
          }
        }
        this.isVisible[y][x] = false
      }
    }
  }

  visible = (x, y) => { return this.isVisible[y][x] }
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

  aleatoirise = function () {
    let solvable = false
    do {
      const [x, y] = this.choisisUneCaseNonVisible()
      this.isVisible[y][x] = true
      solvable = this.estSolvable(0, 0)
    } while (!solvable)
  }

  representeMoi = function (xO = 0, yO = 0) {
    const objets = []
    const hCase = this.fractionOn ? 2 : 1
    for (let y = this.nombreEtages; y > 0; y--) {
      for (let x = 0; x < y; x++) {
        if (this.isVisible[y - 1][x]) {
          objets.push(boite({
            Xmin: xO + x * 4 + (this.nombreEtages - y) * 2,
            Ymin: yO + (this.nombreEtages - y) * hCase,
            Xmax: xO + x * 4 + 4 + (this.nombreEtages - y) * 2,
            Ymax: yO + (1 + this.nombreEtages - y) * hCase,
            texteIn: this.fractionOn ? `$${this.valeurs[y - 1][x].texFractionSimplifiee}$` : stringNombre(this.valeurs[y - 1][x], 0),
            texteOpacite: 1
          }))
        } else {
          objets.push(boite({
            Xmin: xO + x * 4 + (this.nombreEtages - y) * 2,
            Ymin: yO + (this.nombreEtages - y) * hCase,
            Xmax: xO + x * 4 + 4 + (this.nombreEtages - y) * 2,
            Ymax: yO + (1 + this.nombreEtages - y) * hCase,
            texteIn: '',
            texteOpacite: 1
          }))
        }
      }
    }
    return objets
  }
}
