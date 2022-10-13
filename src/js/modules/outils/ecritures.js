/** @module écritures algébriques */

import Decimal from 'decimal.js/decimal.mjs'
import { equal, Fraction } from 'mathjs'
import { context } from '../context'
import FractionX from '../FractionEtendue'
import { fraction } from '../fractions'
import { miseEnEvidence } from './contextSensitif'
import { lettreDepuisChiffre } from './lettres'
import { stringNombre } from './stringNombre'
import { texNombre, texNombrec } from './texNombres'

/**
* N'écrit pas un nombre s'il est égal à 1
* @Example
* //rienSi1(1)+'x' -> x
* //rienSi1(-1)+'x' -> -x
* @author Rémi Angot et Jean-Claude Lhote pour le support des fractions
*/
export function rienSi1 (a) {
  if (equal(a, 1)) return ''
  if (equal(a, -1)) return '-'
  if (a instanceof Fraction || a instanceof FractionX) return a.toLatex()
  if (Number(a)) return texNombre(a)
  window.notify('rienSi1 : type de valeur non prise en compte')
}

/**
  * Gère l'écriture de l'exposant en mode text (ne doit pas s'utiliser entre $ $)
  * Pour le mode maths (entre $ $) on utilisera tout simplement ^3 pour mettre au cube ou ^{42} pour la puissance 42.
  * @Example
  * // 'dm'+texteExposant(3)
  * @author Rémi Angot
  */
export function texteExposant (texte) {
  if (context.isHtml) {
    return `<sup>${texte}</sup>`
  } else {
    return `\\up{${texte}}`
  }
}

/**
  * Gère l'écriture de l'indice en mode text (ne doit pas s'utiliser entre $ $)
  * Pour le mode maths (entre $ $) on utilisera tout _3 pour mettre un indice 3 ou _{42} pour l'indice 42.
  * @param {string} texte
  * @Example
  * // `(d${texteIndice(3)})`
  * @author Jean-Claude Lhote
  */
export function texteIndice (texte) {
  if (context.isHtml) {
    return `<sub>${texte}</sub>`
  } else {
    return `\\textsubscript{${texte}}`
  }
}

/**
  * Ajoute les parenthèses et le signe
  * @Example
  * //(+3) ou (-3)
  * @author Rémi Angot
  */
export function ecritureNombreRelatif (a) {
  let result = ''
  if (a > 0) {
    result = '(+' + a + ')'
  } else if (a < 0) {
    result = '(' + a + ')'
  } else { // ne pas mettre de parenthèses pour 0
    result = '0'
  }
  return result
}
/**
   * Idem ecritureNombreRelatif avec le code couleur : vert si positif, rouge si négatif, noir si nul
   * @param {number} a
   */
export function ecritureNombreRelatifc (a) {
  let result = ''
  if (a > 0) {
    result = miseEnEvidence('(+' + texNombrec(a) + ')', 'blue')
  } else if (a < 0) {
    result = miseEnEvidence('(' + texNombrec(a) + ')')
  } else { // ne pas mettre de parenthèses pour 0
    result = miseEnEvidence('0', 'black')
  }
  return result
}

/**
  * Ajoute le + devant les nombres positifs
  * @Example
  * //+3 ou -3
  * @author Rémi Angot et Jean-claude Lhote pour le support des fractions
  */
export function ecritureAlgebrique (a) {
  if (a instanceof Fraction || a instanceof FractionX) return fraction(a).ecritureAlgebrique
  else if (typeof a === 'number') {
    if (a >= 0) {
      return '+' + stringNombre(a)
    } else {
      return stringNombre(a)
    }
  } else if (a instanceof Decimal) {
    if (a.isPos()) {
      return '+' + stringNombre(a)
    } else {
      return stringNombre(a)
    }
  } else window.notify('rienSi1 : type de valeur non prise en compte')
}

/**
  * Ajoute le + devant les nombres positifs, n'écrit rien si 1
  * @Example
  * //+3 ou -3
  * @author Rémi Angot et Jean-Claude Lhote pour le support des fractions
  */
export function ecritureAlgebriqueSauf1 (a) {
  if (equal(a, 1)) return '+'
  else if (equal(a, -1)) return '-'
  else if (a instanceof Fraction || a instanceof FractionX) return fraction(a).ecritureAlgebrique
  else if (typeof a === 'number') return ecritureAlgebrique(a)
  else window.notify('rienSi1 : type de valeur non prise en compte')
}

/**
   * Idem ecritureAlgebrique mais retourne le nombre en couleur (vert si positif, rouge si négatif et noir si nul)
   * @param {number} a
   */
export function ecritureAlgebriquec (a) {
  let result = ''
  if (a > 0) {
    result = miseEnEvidence('+' + texNombrec(a), 'blue')
  } else if (a < 0) {
    result = miseEnEvidence(texNombrec(a))
  } else result = miseEnEvidence(texNombrec(a), 'black')
  return result
}

/**
   * @param {number} r Un nombre relatif
   * @param {number} precision nombre de chiffres maximum après la virgule pour texNombre.
   * @returns {string} met en évidence le signe - si r < 0
   */

export function signeMoinsEnEvidence (r, precision = 0) {
  if (r < 0) return miseEnEvidence('-') + texNombre(Math.abs(r), precision)
  else return texNombre(Math.abs(r), precision)
}

/**
  * Ajoute des parenthèses aux nombres négatifs
  * @Example
  * // 3 ou (-3)
  * @author Rémi Angot
  */
export function ecritureParentheseSiNegatif (a) {
  let result = ''
  if (a instanceof Decimal) {
    if (a.gte(0)) return texNombre(a, 8) // On met 8 décimales, mais cette fonctions s'utilise presque exclusivement avec des entiers donc ça ne sert à rien
    else return `(${texNombre(a, 8)})`
  } else {
    if (a >= 0) {
      result = texNombre(a, 8) // j'ai passé a dans texNombre, car la fonction ne prenait pas en compte l'écriture décimale !
    } else {
      result = `(${texNombre(a, 8)})`
    }
    return result
  }
}

/**
  * Ajoute des parenthèses si une expression commence par un moins
  * @Example
  * // (-3x)
  * @author Rémi Angot
  */
export function ecritureParentheseSiMoins (expr) {
  if (expr[0] === '-') return `(${expr})`
  else return expr
}
/**
 *
 * @author Jean-claude Lhote
 * @param {numero} 1=A, 2=B ..
 * @param {etapes} tableau de chaines comportant les expressions à afficher dans le membre de droite.
 */

export function calculAligne (numero, etapes) {
  let script = `$\\begin{aligned}${miseEnEvidence(lettreDepuisChiffre(numero))}&=${etapes[0]}`
  for (let i = 1; i < etapes.length - 1; i++) {
    script += `\\\\&=${etapes[i]}`
  }
  script += `\\\\${miseEnEvidence(lettreDepuisChiffre(numero) + '&=' + etapes[etapes.length - 1])}$`
  return script
}
