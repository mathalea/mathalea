import { isPrime } from 'mathjs'
import { egal } from './comparateurs'
import { obtenirListeFacteursPremiers } from './factorisation'

/**
* Retourne la liste des nombres premiers inférieurs à 300
* @author Rémi Angot
*/
export function obtenirListeNombresPremiers (n = 300) {
  const prems = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293]
  for (let i = 307; i <= n; i++) {
    if (isPrime(i)) prems.push(i)
  }
  return prems
}

/**
  * Retourne le code LaTeX de la décomposition en produit de facteurs premiers d'un nombre
  * @author Rémi Angot
  */
export function decompositionFacteursPremiers (n) {
  let decomposition = ''
  const liste = obtenirListeFacteursPremiers(n)
  for (const i in liste) {
    decomposition += liste[i] + '\\times'
  }
  decomposition = decomposition.substr(0, decomposition.length - 6)
  return decomposition
}

/**
   * Renvoie la décomposition en produit de facteurs premiers d'un nombre avec les facteursABarrer barrés
   * @author Guillaume Valmont
   * @param {number} nombre
   * @param {number[]} facteursABarrer
   * @returns texte en LateX
   */
export function decompositionFacteursPremiersBarres (nombreADecomposer, facteursABarrer) {
  const decomposition = decompositionFacteursPremiersArray(nombreADecomposer)
  const facteursBarres = []
  let str = ''
  for (const nombre of decomposition) {
    let unNombreAEteBarre = false
    for (let i = 0; i < facteursABarrer.length; i++) {
      const facteurABarrer = facteursABarrer[i]
      if (nombre === facteurABarrer && !facteursBarres.includes(i) && !unNombreAEteBarre) {
        str += ` \\cancel{${facteurABarrer}} \\times `
        facteursBarres.push(i)
        unNombreAEteBarre = true
      }
    }
    if (!unNombreAEteBarre) {
      str += nombre + ' \\times '
    }
  }
  return str.slice(0, -8)
}

/**
  * Retourne la liste des diviseurs d'un entier
  * @author Rémi Angot
  */
export function listeDesDiviseurs (n) {
  let k = 2
  const liste = [1]
  while (k <= n) {
    if (n % k === 0) {
      liste.push(k)
    }
    k++
  }

  return liste
}
/**
* Retourne la liste des nombres premiers inférieurs à N N<300 N exclu
* @param {integer} k On cherchera un multiple de k
* @param {integer} n Ce multiple sera supérieur ou égal à n
* @author Rémi Angot
*/
export function premierMultipleSuperieur (k, n) {
  let result = n
  let reste
  if (Number.isInteger(k) && Number.isInteger(n)) {
    while (result % k !== 0) {
      result += 1
    }
    return result
  } else {
    if (egal(Math.floor((n / k), n / k))) return n
    else {
      reste = n / k - Math.floor(n / k)
      return n - reste * k + k
    }
  }
}
export function premierMultipleInferieur (k, n) {
  const result = premierMultipleSuperieur(k, n)
  if (result !== n) return result - k
  else return n
}

/**
  * Retourne la liste des nombres premiers inférieurs à N N<300 N exclu
  * @param {number} borneSup
  * @author Sébastien Lozano
  */
export function listeNombresPremiersStrictJusqua (borneSup) {
  'use strict'
  // tableau contenant les 300 premiers nombres premiers
  const liste300 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293]
  const liste = []
  let i = 0
  while (liste300[i] < borneSup) {
    liste.push(liste300[i])
    i++
  }
  return liste
}

/**
   * Liste les nombres premiers jusque n avec la méthode du crible d'Eratosthene optimisée
   * @param {number} n
   * @author Sébastien Lozano
   */
export function cribleEratostheneN (n) {
  'use strict'
  const tabEntiers = [] // pour tous les entiers de 2 à n
  const testMax = Math.sqrt(n + 1) // inutile de tester au dela de racine de n
  const liste = [] // tableau de la liste des premiers jusqu'à n

  // On rempli un tableau avec des booléeens de 2 à n
  for (let i = 0; i < n + 1; i++) {
    tabEntiers.push(true)
  }

  // On supprime les multiples des nombres premiers à partir de 2, 3, 5,...
  for (let i = 2; i <= testMax; i++) {
    if (tabEntiers[i]) {
      for (let j = i * i; j < n + 1; j += i) {
        tabEntiers[j] = false
      }
    }
  }

  // On récupère tous les indices du tableau des entiers dont le booléen est à true qui sont donc premiers
  for (let i = 2; i < n + 1; i++) {
    if (tabEntiers[i]) {
      liste.push(i)
    }
  }

  return liste
}

/**
   * Liste les premiers compris entre min et max au sens large,
   * min est inclu
   * max est inclu.
   * @param {number} min
   * @param {number} max
   * @author Sébastien Lozano
   */

export function premiersEntreBornes (min, max) {
  'use strict'
  // on crée les premiers jusque min
  const premiersASupprimer = cribleEratostheneN(min - 1)
  // on crée les premiers jusque max
  const premiersJusqueMax = cribleEratostheneN(max)
  // on supprime le début de la liste jusque min
  premiersJusqueMax.splice(0, premiersASupprimer.length)
  // on renvoie le tableau restant
  return premiersJusqueMax
}
/**
 * renvoie un tableau avec la decomposition en facteurs premiers sous forme développée
 * @param {number} n
 * @author Sébastien Lozano
 */
export function decompositionFacteursPremiersArray (n) {
  const decomposition = []
  const liste = obtenirListeFacteursPremiers(n)
  for (const i in liste) {
    decomposition.push(liste[i])
  }
  return decomposition
}
