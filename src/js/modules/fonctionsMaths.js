import { calcul, arrondi, ecritureAlgebrique } from './outils.js'
/**
* Convertit un angle de radian vers degrés et fonction inverse
* @Example
* // PI->180
* @author Jean-Claude Lhote
*/
export function degres (radians) {
  return radians * 180 / Math.PI
}
export function radians (degres) {
  return degres * Math.PI / 180
}

/**
   * @param {number} a angle en degrés
   * @returns flottant : le cosinus de l'angle
   * @author Jean-Claude Lhote
   */
export function cos (a) {
  return calcul(Math.cos(radians(a)))
}
/**
   * @param {number} a angle en degrés
   * @returns flottant : le sinus de l'angle
   * @author Jean-Claude Lhote
   */
export function sin (a) {
  return calcul(Math.sin(radians(a)))
}
/**
   * @param {number} a angle en degrés
   * @returns flottant : la tangente de l'angle
   * @author Jean-Claude Lhote
   */
export function tan (a) {
  return calcul(Math.tan(radians(a)))
}
/**
   * @param {number} un nombre qui correspond au cosinus de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function acos (x) {
  return arrondi(degres(Math.acos(x)), 1)
}
/**
   * @param {number} un nombre qui correspond au sinus de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function asin (x) {
  return arrondi(degres(Math.asin(x)), 1)
}
/**
   * @param {number} un nombre qui correspond à la tangente de l'angle
   * @returns flottant : la mesure de l'angle en degrés
   * @author Jean-Claude Lhote
   */
export function atan (x) {
  return arrondi(degres(Math.atan(x)), 1)
}
/**
 * retourne un décimal sans décimales bizarres
 * @author Jean-Claude Lhote
 */
export function calcule (a, arrondir = false) {
  if (!arrondir) {
    if (typeof a === 'string') {
      return parseFloat(Number(a).toFixed(6))
    } else {
      return parseFloat(a.toFixed(6))
    }
  } else {
    if (typeof a === 'string') {
      return parseFloat(Number(a).toFixed(arrondir))
    } else {
      return parseFloat(a.toFixed(arrondir))
    }
  }
}

/**
 * retourne une chaine contenant le résultat du calcul avec la virgule comme séparateur et pas de décimales bizarres
 * @author Jean-Claude Lhote
 */
export function calculeS (a, arrondir = false) {
  let result
  if (!arrondir) {
    if (typeof a === 'string') {
      result = Number(a).toFixed(6).split('.')
    } else {
      result = a.toFixed(6).split('.')
    }
  } else {
    if (typeof a === 'string') {
      result = Number(a).toFixed(arrondir).split('.')
    } else {
      result = a.toFixed(arrondir).split('.')
    }
  }
  result[1] = result[1].replace(/[0]*$/, '')
  if (result[1].length !== 0) { return result[0] + ',' + result[1] } else return result[0]
}

export function expTrinome (a, b, c) {
  let expr = ''
  if (typeof a === 'number') {
    switch (a) {
      case 0:
        break
      case -1:
        expr += '-x^2'
        break
      case 1:
        expr += 'x^2'
        break
      default:
        expr += `${a}x^2`
        break
    }
  } else {
    expr += `${a}x^2`
  }
  if (typeof b === 'number') {
    switch (b) {
      case 0:
        break
      case -1:
        expr += '-x'
        break
      case 1:
        expr += '+x'
        break
      default:
        if (a === 0) {
          expr += `${b}`
        } else expr += `${ecritureAlgebrique(b)}x`
        break
    }
  } else {
    if (a === 0) {
      expr += `${b}x`
    } else {
      expr += `+${b}x`
    }
  }
  if (typeof c === 'number') {
    if (a === 0 && b === 0) {
      expr += `${c}`
    } else {
      if (c !== 0) {
        expr += `${ecritureAlgebrique(c)}`
      }
    }
  } else {
    expr += `+${c}`
  }
  return expr
}
