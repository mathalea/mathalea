import Decimal from 'decimal.js/decimal.mjs'
import { round } from 'mathjs'
import { ecritureParentheseSiNegatif } from './ecritures'

/**
 * Fonction pour simplifier l'ecriture lorsque l'exposant vaut 0 ou 1
 * retourne 1, la base ou rien
 * @param b base
 * @param e exposant
 * @author Sébastien Lozano
 */
export function simpExp (b, e) {
  switch (e) {
    case 1:
      return ` ${b}`
    case 0:
      return ' 1'
    default:
      return ' '
  }
}

/**
   * Fonction pour écrire des notations scientifique de la forme a * b ^ n
   * @param a {number} mantisse
   * @param b {number} base
   * @param n {number} exposant
   * @author Erwan Duplessy
   */
export function puissance (b, n) {
  switch (b) {
    case 0:
      return '0'
    case 1:
      return '1'
    case -1:
      if (b % 2 === 0) {
        return '1'
      } else {
        return '-1'
      }
    default:
      if (b < 0) {
        return `(${b})^{${n}}`
      } else {
        return `${b}^{${n}}`
      }
  }
}

export function ecriturePuissance (a, b, n) {
  switch (a) {
    case 0:
      return '$0$'
    case 1:
      return `$${puissance(b, n)}$`
    default:
      return `$${String(round(a, 3)).replace('.', '{,}')} \\times ${puissance(b, n)}$`.replace('.', '{,}')
  }
}

/**
   * Fonction pour simplifier les notations puissance dans certains cas
   * si la base vaut 1 ou -1 quelque soit l'exposant, retourne 1 ou -1,
   * si la base est négative on teste la parité de l'exposant pour alléger la notation sans le signe
   * si l'exposant vaut 0 ou 1 retourne 1, la base ou rien
   * @param b base
   * @param e exposant
   * @author Sébastien Lozano
   */
export function simpNotPuissance (b, e) {
  // on switch sur la base
  switch (b) {
    case -1: // si la base vaut -1 on teste la parité de l'exposant
      if (e % 2 === 0) {
        return ' 1'
        // break;
      } else {
        return ' -1'
        // break;
      }
    case 1: // si la base vaut 1 on renvoit toujours 1
      return ' 1'
    default: // sinon on switch sur l'exposant
      switch (e) {
        case 0: // si l'exposant vaut 0 on ranvoit toujours 1
          return '1'
        case 1: // si l'exposant vaut 1 on renvoit toujours la base
          return ` ${b}`
        default: // sinon on teste le signe de la base et la parité de l'exposant
          if (b < 0 && e % 2 === 0) { // si la base est négative et que l'exposant est pair, le signe est inutile
            return ` ${b * -1}^{${e}}`
            // break;
          } else {
            return ` ${b}^{${e}}`
            // return ` `;
            // break;
          }
      }
  }
}

/**
   * Fonction pour écrire en couleur la forme éclatée d'une puissance
   * @param b base
   * @param e exposant
   * @param couleur
   * @author Sébastien Lozano
   */
export function eclatePuissance (b, e, couleur) {
  let str
  switch (e) {
    case 0:
      return `\\mathbf{\\color{${couleur}}{1}}`
    case 1:
      return `\\mathbf{\\color{${couleur}}{${b}}}`
    default:
      str = `\\mathbf{\\color{${couleur}}{${b}}} `
      for (let i = 1; i < e; i++) {
        str = str + `\\times \\mathbf{\\color{${couleur}}{${b}}}`
      }
      return str
  }
}

/**
   * Fonction pour écrire la forme éclatée d'une puissance
   * @param b {number} base
   * @param e {integer} exposant
   * @author Rémi Angot
   * @return string
   */
export function puissanceEnProduit (b, e) {
  let str
  if (e === 0) {
    return '1'
  } else if (e === 1) {
    return `${b}`
  } else if (e > 1) {
    str = `${ecritureParentheseSiNegatif(b)}`
    for (let i = 1; i < e; i++) {
      str = str + `\\times ${ecritureParentheseSiNegatif(b)}`
    }
    return str
  } else if (e < 0) {
    return `\\dfrac{1}{${puissanceEnProduit(b, -e)}}`
  }
}

/**
   * Fonction qui renvoie un tableau contenant la mantisse et l'exposant de l'écriture scientique d'un nombre donné en paramètres sous sa forme décimale.
   * @param nbDecimal
   *
   * @example
   * // Renvoie [4.1276,1]
   * range(decimalToScientifique,[41.276])
   * // Renvoie [3.48,-2]
   * range(decimalToScientifique,[0.0348])
   * // Renvoie [-2.315,3]
   * range(decimalToScientifique,[-2315])
   *
   * @author Eric Elter
   */
export function decimalToScientifique (nbDecimal) {
  let exposant = 0
  let mantisseNb = new Decimal(nbDecimal)
  if (mantisseNb.abs().gte(10)) {
    while (exposant < 50 && mantisseNb.abs().gt(10)) {
      mantisseNb = mantisseNb.div(10)
      exposant++
    }
    return [mantisseNb.toNumber(), exposant]
  } else if (mantisseNb.abs().lt(1)) {
    while (exposant < 50 && mantisseNb.abs().lt(1)) {
      mantisseNb = mantisseNb.mul(10)
      exposant++
    }
    return [mantisseNb.toNumber(), -1 * exposant]
  } else return [nbDecimal, 0]
}

/**
   * Fonction pour écrire avec deux couleurs la forme éclatée d'un produit de puissances de même exposant
   * @param b1 base1
   * @param b2 base2
   * @param e exposant
   * @param couleur1
   * @param couleur2
   * @author Sébastien Lozano
   */
export function reorganiseProduitPuissance (b1, b2, e, couleur1, couleur2) {
  let str
  switch (e) {
    case 0:
      return '1'
    case 1:
      return `\\mathbf{\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}}`
    default:
      str = `\\mathbf{(\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}}) `
      for (let i = 1; i < e; i++) {
        str = str + `\\times (\\mathbf{\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}})`
      }
      return str
  }
}
/**
 *
 * x le nombre dont on cherche l'ordre de grandeur
 * type = 0 pour la puissance de 10 inférieure, 1 pour la puissance de 10 supérieur et 2 pour la plus proche
 */
export function ordreDeGrandeur (x, type) {
  let signe
  if (x < 0) signe = -1
  else signe = 1
  x = Math.abs(x)
  const P = 10 ** Math.floor(Math.log10(x))
  if (type === 0) return P * signe
  else if (type === 1) return P * 10 * signe
  else if (x - P < 10 * P - x) return P * signe
  else return P * 10 * signe
}
