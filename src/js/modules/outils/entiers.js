import { estentier } from './comparateurs'
import Algebrite from 'algebrite'
import { gcd } from 'mathjs'
import { shuffle, rangeMinMax } from './arrays'

/**
 * Retourne le quotient entier (donc sans le reste) de a/b si a & b sont entiers, false sinon
 * @param {number} a
 * @param {number} b
 * @return {boolean|number}
 */
export function quotientier (a, b) {
  if (estentier(a) && estentier(b)) return Math.floor(a / b)
  return false
}

/**
  * Renvoie le PPCM de deux nombres
  * @author Rémi Angot
  */
export const ppcm = (a, b) => {
  return parseInt(Algebrite.run(`lcm(${a},${b})`))
}
/**
* Renvoie le PGCD de deux nombres
* @author Rémi Angot
*/
export function pgcd (...args) {
  return gcd(...args)
}

/**
   * Retourne true si x est un carré parfait (à epsilon près)
   * @param {number} x
   * @return {boolean}
   */
export function carreParfait (x) {
  if (estentier(Math.sqrt(x))) return true
  else return false
}
/**
* Choisit un nombre au hasard entre min et max sans appartenir à liste\_a\_eviter.
* @param {int} min
* @param {int} max
* @param {liste} liste - Tous les éléments que l'on souhaite supprimer
*
* @example
* // Renvoie 1, 2 ou 3
* randint (1,3)
* @example
* // Renvoie -1 ou 1
* randint(-1,1,[0])
* @example
* Renvoie 0 ou 1 ou 4 ou 6 ou 8 ou 9
* randint(0,9, '2357') // même résultat avec randint(0,9, ['2','3','5','7']) ou randint(0,9, [2,3,5,7])
* @author Rémi Angot
* @Source https://gist.github.com/pc035860/6546661
*/
export function randint (min, max, listeAEviter = []) {
  // Source : https://gist.github.com/pc035860/6546661
  const range = max - min
  let rand = Math.floor(Math.random() * (range + 1))
  if (typeof listeAEviter === 'string') {
    listeAEviter = listeAEviter.split('')
  }
  if (Number.isInteger(listeAEviter)) {
    listeAEviter = [listeAEviter]
  }
  listeAEviter = listeAEviter.map(Number)
  if (listeAEviter.length > 0) {
    while (listeAEviter.indexOf(min + rand) !== -1) {
      rand = Math.floor(Math.random() * (range + 1))
    }
  }
  return min + rand
}
/**
 * retourne une liste de combien de nombres compris entre m et n (inclus) en évitant les valeurs de listeAEviter
 * toutes la liste des nombres est retournée si combien est supérieur à l'effectif disponible
 * les valeurs sont dans un ordre aléatoire.
 * @author Jean-Claude Lhote
 *
 */
export function choisitNombresEntreMetN (m, n, combien, listeAEviter = []) {
  let t
  if (m > n) {
    t = m
    m = n
    n = t
  } else if (m === n) { return [n] }
  if (combien > n - m) combien = n - m
  let index = rangeMinMax(m, n, listeAEviter)
  index = shuffle(index)
  index = index.slice(0, combien)
  return index
}
/**
 * Renvoie un tableau contenant les diviseurs d'un nombre entier, rangés dans l'ordre croissant
 * @param {integer} n
 * @author Sébastien Lozano
 */
export function listeDiviseurs (n) {
  'use strict'
  let i = 2
  const diviseurs = [1]
  while (i <= n) {
    if (n % i === 0) {
      diviseurs.push(i)
    }
    i++
  }
  return diviseurs
}
