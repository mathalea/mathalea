import { choisitNombresEntreMetN, quotientier } from './entiers'

/**
 * retourne une liste de lettres majuscules (ou minuscule si majuscule=false)
 * il y aura nombre lettres dans un ordre aléatoire
 * les lettres à éviter sont données dans une chaine par exemple : 'QXY'
 * @author Jean-Claude Lhote
 */
export function choisitLettresDifferentes (nombre, lettresAeviter = '', majuscule = true) {
  const listeAEviter = []; const lettres = []
  for (const l of lettresAeviter) {
    listeAEviter.push(l.charCodeAt(0) - 64)
  }
  const index = choisitNombresEntreMetN(1, 26, nombre, listeAEviter)
  for (const n of index) {
    if (majuscule) lettres.push(lettreDepuisChiffre(n))
    else lettres.push(lettreMinusculeDepuisChiffre(n))
  }
  return lettres
}
export function cesar (word, decal) {
  let mot = ''; let code = 65
  for (let x = 0; x < word.length; x++) {
    code = word.charCodeAt(x) % 65
    code = (code + decal) % 26 + 65
    mot += String.fromCharCode(code)
  }
  return mot
}

export function codeCesar (mots, decal) {
  const motsCodes = []
  for (let x = 0; x < mots.length; x++) {
    motsCodes.push(cesar(mots[x], decal))
  }
  return motsCodes
}

/**
  * Renvoie une lettre majuscule depuis un nombre compris entre 1 et 702
  * Le 2e paramètre est un booléen qui permet d'éviter la lettre D (et donc décale tout d'une lettre après le C) en vue du bug de MathLive
  * @author Rémi Angot
  *@Example
  * // 0 -> @ 1->A ; 2->B...
  * // 27->AA ; 28 ->AB ...
  */
export function lettreDepuisChiffre (i, saufD = false) {
  let result = ''
  if (i <= 26) {
    result = String.fromCharCode(64 + i)
    if (saufD && i >= 4) result = String.fromCharCode(64 + i + 1)
  } else {
    if (i % 26 === 0) {
      result = String.fromCharCode(64 + Math.floor(i / 26) - 1)
      result += String.fromCharCode(64 + 26)
    } else {
      result = String.fromCharCode(64 + Math.floor(i / 26))
      result += String.fromCharCode(64 + i % 26)
    }
  }
  return result
}

/**
  * Renvoie une lettre minuscule depuis un nombre compris entre 1 et 702
  * @author Rémi Angot
  *@Example
  * // 0 -> @ 1->a ; 2->b...
  * // 27->aa ; 28 ->ab ...
  */
export function lettreMinusculeDepuisChiffre (i) {
  return lettreDepuisChiffre(i).toLowerCase()
}

/**
  * Renvoie une lettre majuscule (éventuellement indicée) depuis un nombre compris entre 1 et... sans limite.
  * @author Eric Elter
  *@Example
  * // 0 -> @ 1->A ; 2->B...
  * // 27->A_1 ; 28 ->A_2 ...
  */
export function lettreIndiceeDepuisChiffre (i) {
  const indiceLettre = quotientier(i - 1, 26) === 0 ? '' : quotientier(i - 1, 26)
  return String.fromCharCode(64 + (i - 1) % 26 + 1) + (i > 26 ? `_{${indiceLettre}}` : '')
}

/**
  * Renvoie une lettre minuscule (éventuellement indicée) depuis un nombre compris entre 1 et... sans limite.
  * @author EricElter
  *@Example
  * // 0 -> @ 1->a ; 2->b...
  * // 27->a_1 ; 28 ->a_2 ...
  */
export function lettreIndiceeMinusculeDepuisChiffre (i) {
  return lettreIndiceeDepuisChiffre(i).toLowerCase()
}
/**
* Convertit en majuscule la première lettre
* @author Rémi Angot
*/
export function premiereLettreEnMajuscule (text) { return (text + '').charAt(0).toUpperCase() + text.substr(1) }
