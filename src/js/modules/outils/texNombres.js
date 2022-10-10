import Decimal from 'decimal.js/decimal.mjs'
import { evaluate, format } from 'mathjs'
import { texFraction } from './anciennesfractions'
import { egal } from './comparateurs'
import { arrondi } from './nombres'
import Algebrite from 'algebrite'
import { miseEnEvidence, sp } from './contextsensitif'
import { afficherNombre, stringNombre } from './stringnombre'
const math = { format: format, evaluate: evaluate }
/**
* Utilise un arrondi au millionième pour éviter les flottants à rallonge (erreurs d'arrondis des flottants)
* Le 2e argument facultatif permet de préciser l'arrondi souhaité : c'est le nombre max de chiffres après la virgule souhaités
* @author Rémi Angot modifié par Jean-Claude Lhote
*/
export function calcul (x, arrondir = 6) {
  const sansPrecision = (arrondir === undefined)
  // if (sansPrecision) arrondir = 6
  if (typeof x === 'string') {
    window.notify('Calcul : Reçoit une chaine de caractère et pas un nombre', { x })
    x = parseFloat(evaluate(x))
  }
  if (sansPrecision && !egal(x, arrondi(x, arrondir), 10 ** (-arrondir - 1))) window.notify('calcul : arrondir semble avoir tronqué des décimales sans avoir eu de paramètre de précision', { x, arrondir })
  return parseFloat(x.toFixed(arrondir))
}

/**
  * Utilise Algebrite pour s'assurer qu'il n'y a pas d'erreur dans les calculs avec des décimaux
  * Le 2e argument facultatif permet de préciser l'arrondi souhaité
  * @author Rémi Angot
  */
export function nombreDecimal (expression, arrondir = false) {
  if (!arrondir) {
    return stringNombre(new Decimal(expression), 15)
  } else {
    return stringNombre(new Decimal(expression), arrondir)
  }
}

/**
  * Utilise Algebrite pour s'assurer qu'il n'y a pas d'erreur dans les calculs avec des décimaux et retourne un string avec la virgule comme séparateur décimal
  * @author Rémi Angot
  * texNombrec n'apportant rien, je la shinte.
  */

export function texNombrec (expression, precision) {
  // return texNombre(parseFloat(Algebrite.eval(expression)))
  return texNombre(expression, precision)
}

/**
  * Formattage pour une sortie LaTeX entre $$
  * formatFraction = false : si l'expression est un objet fraction du module mathjs alors elle peut donner l'écriture fractionnaire
  * Pour une fraction négative la sortie est -\dfrac{6}{7} au lieu de \dfrac{-6}{7}
  * @author Frédéric PIOU
  */

export function texNum (expression, formatFraction = false) {
  if (typeof expression === 'object') {
    const signe = expression.s === 1 ? '' : '-'
    if (formatFraction === true) {
      expression = expression.d !== 1 ? signe + texFraction(expression.n, expression.d) : signe + expression.n
    } else {
      expression = texNombre(evaluate(format(expression)))
    }
    expression = expression.replace(',', '{,}').replace('{{,}}', '{,}')
  } else {
    expression = texNombre(parseFloat(Algebrite.eval(expression)))
  }
  return expression
}

/**
   * renvoie le résultat de l'expression en couleur (vert=positif, rouge=négatif, noir=nul)
   * @param {string} expression l'expression à calculer
   */
export function texNombreCoul (nombre) {
  if (nombre > 0) return miseEnEvidence(texNombrec(nombre), 'green')
  else if (nombre < 0) return miseEnEvidence(texNombrec(nombre), 'red')
  else return miseEnEvidence(texNombrec(0), 'black')
}
/**
 * @author Frédéric Piou
 * @param {number} nb
 * @returns retourne un nombre au format français sans espace après la virgule
 */
export function num (nb) {
  return Intl.NumberFormat('fr-FR', { maximumFractionDigits: 20 }).format(nb).toString().replace(/\s+/g, '\\thickspace ').replace(',', '{,}')
}
/**
   * @author Frédéric Piou
   * @param {number} nb
   * @returns retourne un nombre au format français
   */
export function numberFormat (nb) {
  return Intl.NumberFormat('fr-FR', { maximumFractionDigits: 20 }).format(nb).toString().replace(/\s+/g, '\\thickspace ')
}

/**
   * La chaîne de caractères en sortie doit être interprétée par KateX et doit donc être placée entre des $ $
   * Renvoie "Trop de chiffres" s'il y a plus de 15 chiffres significatifs (et donc un risque d'erreur d'approximation)
   * S'utilise indifféremment avec des nombres (nb) au format natif (entier, flottant) ou au format Decimal (nécessite la librairie decimal.js)
   * Avec comme avantage immédiat pour le format Decimal : precision est illimité.
   * Sinon, renvoie un nombre dans le format français (avec une virgule et des espaces pour séparer les classes dans la partie entière et la partie décimale)
   * @author Guillaume Valmont
   * @param {number} nb nombre à afficher
   * @param {number} precision nombre de décimales demandé
   * @param {boolean} force true pour forcer à precision chiffres (ajout de zéros éventuels). false par défaut pour supprimer les zéros non significatifs.
   * @returns string avec le nombre dans le format français à mettre entre des $ $
   */
export function texNombre (nb, precision = 8, force = false) {
  const result = afficherNombre(nb, precision, 'texNombre', force)
  return result.replace(',', '{,}').replace(/\s+/g, '\\,')
}

/**
   * Renvoie un nombre dans le format français (séparateur de classes) pour la partie entière comme pour la partie décimale
   * @author Rémi Angot
   */
export function texNombre2 (nb) {
  let nombre = math.format(nb, { notation: 'auto', lowerExp: -12, upperExp: 12, precision: 12 }).replace('.', ',')
  const rangVirgule = nombre.indexOf(',')
  let partieEntiere = ''
  if (rangVirgule !== -1) {
    partieEntiere = nombre.substring(0, rangVirgule)
  } else {
    partieEntiere = nombre
  }
  let partieDecimale = ''
  if (rangVirgule !== -1) {
    partieDecimale = nombre.substring(rangVirgule + 1)
  }

  for (let i = partieEntiere.length - 3; i > 0; i -= 3) {
    partieEntiere = partieEntiere.substring(0, i) + '\\,' + partieEntiere.substring(i)
  }
  for (let i = 3; i < partieDecimale.length; i += 5) {
    partieDecimale = partieDecimale.substring(0, i) + '\\,' + partieDecimale.substring(i)
    i += 12
  }
  if (partieDecimale === '') {
    nombre = partieEntiere
  } else {
    nombre = partieEntiere + '{,}' + partieDecimale
  }
  return nombre
}

export function texNombrec2 (expr, precision = 12) {
  return texNombre(expr, precision)
}

export function nombrec2 (nb) {
  return math.evaluate(nb)
}

/**
  * Renvoie un nombre dans le format français (séparateur de classes) pour la partie entière comme pour la partie décimale
  * Avec espace géré par nbsp en HTML pour pouvoir l'inclure dans une phrase formatée en français et pas seulement un calcul.
  * Modif EE pour la gestion de l'espace dans un texte non mathématique
  * @author Eric Elter d'après la fonction de Rémi Angot
  * Rajout Octobre 2021 pour 6C14
  */
export function texNombre3 (nb) {
  let nombre = math.format(nb, { notation: 'auto', lowerExp: -12, upperExp: 12, precision: 12 }).replace('.', ',')
  const rangVirgule = nombre.indexOf(',')
  let partieEntiere = ''
  if (rangVirgule !== -1) {
    partieEntiere = nombre.substring(0, rangVirgule)
  } else {
    partieEntiere = nombre
  }
  let partieDecimale = ''
  if (rangVirgule !== -1) {
    partieDecimale = nombre.substring(rangVirgule + 1)
  }

  for (let i = partieEntiere.length - 3; i > 0; i -= 3) {
    partieEntiere = partieEntiere.substring(0, i) + sp() + partieEntiere.substring(i)
  }
  for (let i = 3; i <= partieDecimale.length; i += 3) {
    partieDecimale = partieDecimale.substring(0, i) + sp() + partieDecimale.substring(i)
    i += 12
  }
  if (partieDecimale === '') {
    nombre = partieEntiere
  } else {
    nombre = partieEntiere + ',' + partieDecimale
  }
  return nombre
}
export const scientifiqueToDecimal = (mantisse, exp) => {
  if (exp < -6) Decimal.toExpNeg = exp - 1
  else if (exp > 20) Decimal.toExpPos = exp + 1
  return texNombre(new Decimal(mantisse).mul(Decimal.pow(10, exp)), 10)
}
/**
* Pour bien afficher les centimes avec 2 chiffres après la virgule
* @author Rémi Angot
*/
export function texPrix (nb) {
  // Remplace le . par la ,
  if (nb instanceof Decimal) {
    if (nb.isInteger()) return texNombre(nb, 0)
    else return texNombre(nb, 2, true)
  }
  const nombre = Number(nb)
  let result
  if (nombre.toString() === nombre.toFixed(0)) {
    result = nombre
  } else {
    result = nombre.toFixed(2).toString().replace('.', '{,}') // Ne gère pas l'espace des milliers
  }
  return result
}

/**
  * Pour afficher les masses avec 3 chiffres après la virgule
  * @author Mireille Gain
  */
export function texMasse (nb) {
  // Remplace le . par la ,
  const nombre = Number(nb)
  let result
  if (nombre.toString() === nombre.toFixed(0)) {
    result = nombre
  } else {
    result = nombre.toFixed(3).toString().replace('.', ',') // Ne gère pas l'espace des milliers
  }
  return result
}
