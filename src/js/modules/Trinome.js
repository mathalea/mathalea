import FractionX from './FractionEtendue.js'

/**
 * Gère les polynômes du second degré
 *  - Définition depuis la forme développée, canonique ou factorisée
 *  - Calcul du discriminant, des racines, des coordonnées du sommet
 *  - Compatible avec la classe FractionX pour la gestion du calcul exact avec les rationnels
 * @author Rémi Angot
 */
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

  /**
   * Nombre de chiffres après la virgule pour les valeurs approchées
   * @type {number}
   */
  precision = 3

  /**
   * Chaine de caractères de la forme développée ax^2+bx+c
   * @type {string}
   */
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

  /**
   * Discriminant du trinome
   * @type {FractionX}
   */
  get discriminant () {
    const b2 = this.b.produitFraction(this.b)
    let ac = this.a.produitFraction(this.c)
    ac = ac.multiplieEntier(-4)
    return b2.sommeFraction(ac)
  }

  /**
   * Renvoie l'image de x par la fonction définie par le trinome
   * @param {number | FractionX} x
   * @returns {FractionX}
   */
  image (x) {
    if (x instanceof FractionX === false) x = new FractionX(x)
    return this.a.produitFraction(x).produitFraction(x).sommeFraction(this.b.produitFraction(x)).sommeFraction(this.c)
  }

  /**
   * Calcul détaillé de l'image d'un nombre
   * @param {number | FractionX} x
   * @returns {string}
   */
  texCalculImage (x) {
    if (x instanceof FractionX === false) x = new FractionX(x)
    let result = ''
    if (this.a.valeurDecimale === -1) result = '-'
    else if (this.a.valeurDecimale !== 1) result = `${this.a.texFSD} \\times `

    if (x.s === -1 || !x.estEntiere) {
      result += `\\left(${x.texFSD} \\right)^2 `
    } else {
      result += `${x.texFSD}^2 `
    }

    if (this.b.valeurDecimale !== 0) {
      if (this.b.valeurDecimale === 1) result += `${x.simplifie().texFractionSignee} `
      else if (this.b.valeurDecimale === -1) result += `- ${x.texFSP} `
      else result += `${this.b.simplifie().texFractionSignee} \\times ${x.texFSP} `
    }

    if (this.c.valeurDecimale !== 0) result += `${this.c.texFractionSignee}`

    result += ` = ${this.image(x).simplifie().texFractionSimplifiee}`
    return result
  }

  /**
   * @type {string}
   */
  get texCalculDiscriminant () {
    if (this.b.valeurDecimale === 0) return `-4\\times${this.a.texFSP}\\times${this.c.texFSP} = ${this.discriminant.texFractionSimplifiee}`
    else if (this.b.estEntiere && this.b.s === 1) return `${this.b.texFSD}^2-4\\times${this.a.texFSP}\\times${this.c.texFSP} = ${this.discriminant.texFractionSimplifiee}`
    return `\\left(${this.b.texFSD}\\right)^2-4\\times${this.a.texFSP}\\times${this.c.texFSP} = ${this.discriminant.texFractionSimplifiee}`
  }

  /**
   * @type {string}
   */
  get texCalculDiscriminantSansResultat () {
    if (this.b.valeurDecimale === 0) return `-4\\times${this.a.texFSP}\\times${this.c.texFSP}`
    else if (this.b.estEntiere && this.b.s === 1) return `${this.b.texFSD}^2-4\\times${this.a.texFSP}\\times${this.c.texFSP}`
    return `\\left(${this.b.texFSD}\\right)^2-4\\times${this.a.texFSP}\\times${this.c.texFSP}`
  }

  /**
   * @type {string}
   */
  get texCalculRacine1 () {
    if (this.discriminant.s === -1) return ''
    let result = 'x_1 = '
    if (this.b.valeurDecimale === 0) result += `\\dfrac{-b-\\sqrt{\\Delta}}{2a}=\\dfrac{-\\sqrt{${this.discriminant.texFractionSimplifiee}}}{2\\times${this.a.s === -1 ? this.a.texFSP : this.a.texFractionSimplifiee}}`
    else result += `\\dfrac{-b-\\sqrt{\\Delta}}{2a}=\\dfrac{${this.b.oppose().texFractionSimplifiee}-\\sqrt{${this.discriminant.texFractionSimplifiee}}}{2\\times${this.a.s === -1 ? this.a.texFSP : this.a.texFractionSimplifiee}}`
    if (this.x1 instanceof FractionX) result += `=${this.x1.texFractionSimplifiee}`
    else result += `\\approx${this.x1.toString().replace('.', ',')}`
    return result
  }

  /**
   * @type {string}
   */
  get texCalculRacine2 () {
    if (this.discriminant.s === -1) return ''
    let result = 'x_2 = '
    if (this.b.valeurDecimale === 0) result += `\\dfrac{-b+\\sqrt{\\Delta}}{2a}=\\dfrac{\\sqrt{${this.discriminant.texFractionSimplifiee}}}{2\\times${this.a.s === -1 ? this.a.texFSP : this.a.texFractionSimplifiee}}`
    else result += `\\dfrac{-b+\\sqrt{\\Delta}}{2a}=\\dfrac{${this.b.oppose().texFractionSimplifiee}+\\sqrt{${this.discriminant.texFractionSimplifiee}}}{2\\times${this.a.s === -1 ? this.a.texFSP : this.a.texFractionSimplifiee}}`
    if (this.x2 instanceof FractionX) result += `=${this.x2.texFractionSimplifiee}`
    else result += `\\approx${this.x2.toString().replace('.', ',')}`
    return result
  }

  /**
   * Tableau avec 2 étapes pour le développement puis le résultat
   */
  get arrayTexDevelopperFormeCanonique () {
    const alpha = this.alpha
    const beta = this.beta
    let result1 = ''
    if (this.a.valeurDecimale === -1) result1 += '-'
    else if (this.a.valeurDecimale !== 1) result1 += this.a.simplifie().texFSD
    result1 += `\\left(x^2 ${alpha.multiplieEntier(-2).simplifie().texFractionSignee} x ${alpha.produitFraction(alpha).simplifie().texFractionSignee} \\right) ${beta.simplifie().texFractionSignee}`
    let result2 = ''
    if (this.a.valeurDecimale === -1) result2 += '-x^2'
    else if (this.a.valeurDecimale !== 1) result2 += `${this.a.simplifie().texFSD} x^2`
    if (this.b.valeurDecimale === -1) result2 += '-x'
    else if (this.b.valeurDecimale === 1) result2 += 'x'
    else result2 += `${this.b.simplifie().texFractionSignee}x ${this.a.produitFraction(alpha).produitFraction(alpha).simplifie().texFractionSignee} ${beta.simplifie().texFractionSignee}`

    return [result1, result2, this.tex]
  }

  /**
   * Tableau avec 2 étapes pour le développement puis le résultat
   *
   * On considère que a est différent de 1, x1 et x2 sont non nuls
   */
  get arrayTexDevelopperFormeFactorisee () {
    const [a, x1, x2] = [this.a, this.x1, this.x2]
    const result1 = `${a.simplifie().texFractionSaufUn}\\left(x^2 ${x2.oppose().simplifie().texFractionSaufUnSignee}x ${x1.oppose().simplifie().texFractionSaufUnSignee}x ${x1.produitFraction(x2).simplifie().texFractionSignee} \\right)`
    const result2 = `${a.simplifie().texFractionSaufUn}x^2 ${a.produitFraction(x2).oppose().simplifie().texFractionSaufUnSignee}x ${a.produitFraction(x1).oppose().simplifie().texFractionSaufUnSignee}x ${a.produitFraction(x1).produitFraction(x2).simplifie().texFractionSignee}`
    return [result1, result2, this.tex]
  }

  /**
   * Première racine du trinome
   * @type {FractionX | number}
   */
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
      return Math.round((-this.b.valeurDecimale - Math.sqrt(this.discriminant.valeurDecimale)) / (2 * this.a.valeurDecimale) * (10 ** this.precision)) / (10 ** this.precision)
    }
  }

  /**
   * Écriture LaTeX de la valeur exacte première racine
   * @type {string}
   */
  get texX1 () {
    if (this.x1 instanceof FractionX) return this.x1.texFraction
    else {
      const num = this.b.oppose().texFraction + `- \\sqrt{${this.discriminant.texFraction}}`
      const den = 2 * this.a
      return `\\dfrac{${num}}{${den}}`
    }
  }

  /**
   * Écriture LaTeX de la valeur exacte première racine
   * @type {string}
   */
  get texX2 () {
    if (this.x2 instanceof FractionX) return this.x2.texFraction
    else {
      const num = this.b.oppose().texFraction + `+ \\sqrt{${this.discriminant.texFraction}}`
      const den = 2 * this.a
      return `\\dfrac{${num}}{${den}}`
    }
  }

  /**
   * Deuxième racine du trinome
   * @type {FractionX | number}
   */
  get x2 () {
    if (this.x1 instanceof FractionX) {
      return this.b.oppose().produitFraction(this.a.inverse()).sommeFraction(this.x1.oppose())
    } else {
      return Math.round((-this.b.valeurDecimale / (2 * this.a.valeurDecimale) - this.x1) * (10 ** this.precision)) / (10 ** this.precision)
    }
  }

  /**
   * a(x-x1)(x-x2)
   * @type {string}
   */
  get texFormeFactorisee () {
    if (this.x1 instanceof FractionX) {
      if (this.x1.valeurDecimale === 0) {
        if (this.a.valeurDecimale === 1) return `x(x${this.x2.oppose().simplifie().texFractionSignee})`
        else if (this.a.valeurDecimale === -1) return `-x(x${this.x2.oppose().simplifie().texFractionSignee})`
        else return `${this.a.texFractionSimplifiee}x(x${this.x2.oppose().simplifie().texFractionSignee})`
      } else if (this.x2.valeurDecimale === 0) {
        if (this.a.valeurDecimale === 1) return `x(x${this.x1.oppose().simplifie().texFractionSignee})`
        else if (this.a.valeurDecimale === -1) return `-x(x${this.x1.oppose().simplifie().texFractionSignee})`
        else return `${this.a.texFractionSimplifiee}x(x${this.x1.oppose().simplifie().texFractionSignee})`
      }
      if (this.a.valeurDecimale === 1) return `(x${this.x1.oppose().simplifie().texFractionSignee})(x${this.x2.oppose().simplifie().texFractionSignee})`
      else if (this.a.valeurDecimale === -1) return `-(x${this.x1.oppose().simplifie().texFractionSignee})(x${this.x2.oppose().simplifie().texFractionSignee})`
      else return `${this.a.texFractionSimplifiee}(x${this.x1.oppose().simplifie().texFractionSignee})(x${this.x2.oppose().simplifie().texFractionSignee})`
    } else {
      if (this.a.valeurDecimale === 1) return '(x-x_1)(x-x_2)'
      else if (this.a.valeurDecimale === -1) return '-(x-x_1)(x-x_2)'
      else return `${this.a}(x-x_1)(x-x_2)`
    }
  }

  get alpha () {
    return this.b.diviseFraction(this.a.multiplieEntier(2)).oppose()
  }

  get beta () {
    return this.image(this.alpha)
  }

  get texFormeCanonique () {
    let result = ''
    if (this.a.valeurDecimale === -1) result = '-'
    else if (this.a.valeurDecimale !== 1) result = this.a.texFractionSimplifiee
    if (this.alpha.valeurDecimale === 0) result += 'x^2'
    else result += `\\left(x ${this.alpha.oppose().simplifie().texFractionSignee}\\right)^2`
    result += ` ${this.beta.simplifie().texFractionSignee}`
    return result
  }

  /**
   * Modifie le polynome pour qu'il soit égal à a(x-x1)(x-x2)
   * @param {number | FractionX} a
   * @param {number | FractionX} x1
   * @param {number | FractionX} x2
   */
  defFormeFactorisee (a, x1, x2) {
    if (a instanceof FractionX === false) a = new FractionX(a)
    if (x1 instanceof FractionX === false) x1 = new FractionX(x1)
    if (x2 instanceof FractionX === false) x2 = new FractionX(x2)
    this.a = a
    this.b = x1.oppose().sommeFraction(x2.oppose()).produitFraction(a)
    this.c = x1.produitFraction(x2).produitFraction(a)
  }

  /**
   * Modifie le polynome pour qu'il soit égal à k(ax+b)(cx+d)
   * @param {number | FractionX} k
   * @param {number | FractionX} a
   * @param {number | FractionX} b
   * @param {number | FractionX} c
   * @param {number | FractionX} d
   */
  defFormeFactorisee2 (k, a, b, c, d) {
    if (k instanceof FractionX === false) k = new FractionX(k)
    if (a instanceof FractionX === false) a = new FractionX(a)
    if (b instanceof FractionX === false) b = new FractionX(b)
    if (c instanceof FractionX === false) c = new FractionX(c)
    if (d instanceof FractionX === false) d = new FractionX(d)
    this.a = k.produitFraction(a).produitFraction(c)
    this.b = k.produitFraction(a).produitFraction(d).sommeFraction(k.produitFraction(b).produitFraction(c))
    this.c = k.produitFraction(b).produitFraction(d)
  }

  /**
   * Modifie le polynome pour q'il soit égal à a(x - alpha)^2 + beta
   * @param {number | FractionX} a
   * @param {number | FractionX} alpha
   * @param {number | FractionX} beta
   */
  defFormeCanonique (a, alpha, beta) {
    if (a instanceof FractionX === false) a = new FractionX(a)
    if (alpha instanceof FractionX === false) alpha = new FractionX(alpha)
    if (beta instanceof FractionX === false) beta = new FractionX(beta)
    this.a = a
    this.b = a.produitFraction(alpha.oppose()).multiplieEntier(-2)
    this.c = a.produitFraction(alpha).produitFraction(alpha).sommeFraction(beta)
  }
}
