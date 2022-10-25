import FractionX from './FractionEtendue.js'

export default class Trinome {
  /**
     *
     * @param {number | FractionX} a
     * @param {number | FractionX} b
     * @param {number | FractionX} c
     */
  constructor (a, b, c) {
    if (typeof a === 'number') this.a = new FractionX(a)
    else this.a = a
    if (typeof b === 'number') this.b = new FractionX(b)
    else this.b = b
    if (typeof c === 'number') this.c = new FractionX(c)
    else this.c = c
  }

  get tex () {
    let result = ''
    if (Math.abs(this.a.valeurDecimale) === 1) {
      if (this.a.s === -1) result += '-'
      result += 'x^2'
    } else if (this.a.valeurDecimale === 0) {
      result += ''
    } else {
      result += `${this.a.texFSD}x^2`
    }

    if (Math.abs(this.b.valeurDecimale) === 1) {
      result += `${this.b.signeString}x`
    } else if (this.b.valeurDecimale === 0) {
      result += ''
    } else {
      if (result && this.b.s === 1) result += '+'
      result += `${this.b.texFSD}x`
    }

    if (this.c.valeurDecimale === 0) {
      result += ''
    } else {
      if (result && this.c.s === 1) result += '+'
      result += `${this.c.texFSD}`
    }
    return result
  }

  get discriminant () {
    const b2 = this.b.produitFraction(this.b)
    let ac = this.a.produitFraction(this.c)
    ac = ac.multiplieEntier(-4)
    return b2.sommeFraction(ac)
  }

  get texCalculDiscriminant () {
    if (this.b.estEntiere && this.b.s === 1) return `\\Delta = ${this.b.texFSD}^2-4\\times${this.a.texFSP}\\times${this.c.texFSP} = ${this.discriminant.texFractionSimplifiee}`
    return `\\Delta = \\left(${this.b.texFSD}\\right)^2-4\\times${this.a.texFSP}\\times${this.c.texFSP} = ${this.discriminant.texFractionSimplifiee}`
  }

  get texCalculRacine1 () {
    if (this.discriminant.s === -1) return ''
    let result = 'x1 = '
    result += `\\dfrac{-b-\\sqrt{\\Delta}}{2a}=\\dfrac{${this.b.oppose().texFractionSimplifiee}-\\sqrt{${this.discriminant.texFractionSimplifiee}}}{2\\times${this.a.texFractionSimplifiee}}`
    if (this.x1 instanceof FractionX) result += `=${this.x1.texFractionSimplifiee}`
    else result += `\\approx${this.x1.toString().replace('.', ',')}`
    return result
  }

  get texCalculRacine2 () {
    if (this.discriminant.s === -1) return ''
    let result = 'x2 = '
    result += `\\dfrac{-b+\\sqrt{\\Delta}}{2a}=\\dfrac{${this.b.oppose().texFractionSimplifiee}+\\sqrt{${this.discriminant.texFractionSimplifiee}}}{2\\times${this.a.texFractionSimplifiee}}`
    if (this.x2 instanceof FractionX) result += `=${this.x2.texFractionSimplifiee}`
    else result += `\\approx${this.x2.toString().replace('.', ',')}`
    return result
  }

  get x1 () {
    if (this.discriminant.s === -1) return false
    const deltaNum = this.discriminant.num
    const deltaDen = this.discriminant.den
    let racineDeDelta = new FractionX()
    if (Math.abs((Math.sqrt(deltaNum) - Math.round(Math.sqrt(deltaNum)))) < 0.000001 &&
     Math.abs(Math.sqrt(deltaDen) - Math.round(Math.sqrt(deltaDen))) < 0.000001) {
      racineDeDelta = new FractionX(Math.sqrt(deltaNum), Math.sqrt(deltaDen))
      const unSurDeuxA = this.a.multiplieEntier(2).inverse()
      return this.b.oppose().sommeFraction(racineDeDelta.oppose()).produitFraction(unSurDeuxA)
    } else {
      return Math.round((-this.b.valeurDecimale - Math.sqrt(this.discriminant.valeurDecimale)) / (2 * this.a.valeurDecimale) * 100) / 100
    }
  }

  get x2 () {
    if (this.x1 instanceof FractionX) {
      return this.b.oppose().produitFraction(this.a.inverse()).sommeFraction(this.x1.oppose())
    } else {
      return Math.round((-this.b.valeurDecimale / (2 * this.a.valeurDecimale) - this.x1) * 100) / 100
    }
  }

  get texFormeFactorisee () {
    if (this.x1 instanceof FractionX) {
      if (this.x1.valeurDecimale === 0) {
        return `${this.a.valeurDecimale === 1 ? '' : this.a.texFractionSimplifiee}x(x${this.x2.oppose().simplifie().ecritureAlgebrique})`
      } else if (this.x2.valeurDecimale === 0) {
        return `${this.a.valeurDecimale === 1 ? '' : this.a.texFractionSimplifiee}x(x${this.x1.oppose().simplifie().ecritureAlgebrique})`
      }
      return `${this.a.texFractionSimplifiee}(x${this.x1.oppose().simplifie().ecritureAlgebrique})(x${this.x2.oppose().simplifie().ecritureAlgebrique})`
    } else return ''
  }
}
