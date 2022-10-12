import { egal } from './comparateurs'

/**
* Créé tous les couples possibles avec un élément de E1 et un élément de E2.
* L'ordre est pris en compte, donc on pourra avoir (3,4) et (4,3).
* Si le nombre de couples possibles est inférieur à nombreDeCouplesMin alors
* on concatène 2 fois la même liste mais avec des ordres différents.
* @param {string[]} E1 - Liste
* @param {string[]} E2 - Liste
* @param {int} nombreDeCouplesMin=10 - Nombre de couples souhaités
* @author Rémi Angot
*/
export function creerCouples (E1, E2, nombreDeCouplesMin = 10) {
  let result = []; let temp = []
  for (const i in E1) {
    for (const j in E2) {
      result.push([E1[i], E2[j]])
    }
  }

  temp = shuffle(result).slice(0) // créer un clone du tableau result mélangé
  result = temp.slice(0)
  while (result.length < nombreDeCouplesMin) {
    result = result.concat(shuffle(temp))
  }
  return result
}
/**
* Enlève toutes les occurences d'un élément d'un tableau donné
* @param liste
* @param element
*
* @author Rémi Angot
*/
export function enleveElement (array, item) {
  //
  for (let i = array.length - 1; i >= 0; i--) {
    if (typeof item === 'number') {
      if (egal(array[i], item)) {
        array.splice(i, 1)
      }
    } else {
      if (array[i] === item) {
        array.splice(i, 1)
      }
    }
  }
}

/**
   *
   * Compte les occurences d'un item dans un tableau
   * @param {array} array
   * @param item
   * @Author Rémi Angot
   */
export function compteOccurences (array, value) {
  let cpt = 0
  array.forEach((v) => (v === value && cpt++))
  return cpt
}

/**
   * Enlève toutes les occurences d'un élément d'un tableau donné mais sans modifier le tableau en paramètre et renvoie le tableau modifié
   * @author Rémi Angot & Jean-Claude Lhote
   */

export function enleveElementBis (array, item = undefined) {
  const tableaucopie = []
  for (let i = 0; i < array.length; i++) {
    tableaucopie.push(array[i])
  }
  for (let i = tableaucopie.length - 1; i >= 0; i--) {
    if (tableaucopie[i] === item) {
      tableaucopie.splice(i, 1)
    }
  }
  return tableaucopie
}

/**
   * Enlève l'élément index d'un tableau
   * @author Jean-Claude Lhote
   */
export function enleveElementNo (array, index) {
  array.splice(index, 1)
}
/**
   * Enlève l'élément index d'un tableau sans modifier le tableau et retourne le résultat
   * @author Jean-Claude Lhote
   */
export function enleveElementNoBis (array, index) {
  const tableaucopie = []
  for (let i = 0; i < array.length; i++) {
    tableaucopie.push(array[i])
  }
  tableaucopie.splice(index, 1)
  return tableaucopie
}

/**
  * Retourne un élément au hasard de la liste sans appartenir à une liste donnée
  * @param {liste}
  * @param {listeAEviter}
  *
  * @example
  * // Renvoie 1, 2 ou 3
  * choice([1,2,3])
  * @example
  * // Renvoie Rémi ou Léa
  * choice(['Rémi','Léa'])
  *
  * @author Rémi Angot
  */
export function choice (liste, listeAEviter = []) {
  // copie la liste pour ne pas y toucher (ce n'est pas le but de choice)
  if (!Array.isArray(listeAEviter)) {
    listeAEviter = [listeAEviter]
  }
  const listebis = liste.slice()
  // Supprime les éléments de liste à éviter
  for (let i = 0; i < listeAEviter.length; i++) {
    enleveElement(listebis, listeAEviter[i])
  }
  const index = Math.floor(Math.random() * listebis.length)
  return listebis[index]
}

/**
  * Retourne une liste des entiers de 0 à max sans appartenir à une liste donnée
  * @param {max}
  * @param {listeAEviter}
  *
  * @example
  * // Renvoie [0,1,4,5,6,7,8,9,10]
  * range(10,[2,3])
  *
  * @author Rémi Angot
  */
export function range (max, listeAEviter = []) {
  // Créer un tableau avec toutes les valeurs de 0 à max sauf celle de la liste à éviter
  const nbMax = parseInt(max, 10)
  const liste = [...Array(nbMax + 1).keys()]
  for (let i = 0; i < listeAEviter.length; i++) {
    enleveElement(liste, listeAEviter[i])
  }
  return liste
}

/**
  * Retourne une liste entre 2 bornes sans appartenir à une liste donnée (par défaut des entiers mais on peut changer le pas)
  * @param {min}
  * @param {max}
  * @param {listeAEviter}
  *
  * @example
  * // Renvoie [6,7,10]
  * range(6,10,[8,9])
  *
  * @author Rémi Angot
  */
export function rangeMinMax (min, max, listeAEviter = [], step = 1) {
  // Créer un tableau avec toutes les valeurs de 0 à max sauf celle de la liste à éviter
  const liste = []
  for (let i = min; i <= max; i = i + step) {
    liste.push(i)
  }
  for (let i = 0; i < listeAEviter.length; i++) {
    enleveElement(liste, listeAEviter[i])
  }
  return liste
}

/**
  * Créé un tableau avec toutes les valeurs de 1 à max sauf celle de la liste à éviter
  *
  *
  * @param {int} max
  * @param {liste} liste valeurs à éviter
  * @author Rémi Angot
  */
export function range1 (max, listeAEviter = []) {
  const nbMax = parseInt(max, 10)
  const liste = []
  for (let i = 1; i <= nbMax; i++) {
    liste.push(i)
  }
  for (let i = 0; i < listeAEviter.length; i++) {
    enleveElement(liste, listeAEviter[i])
  }
  return liste
}
/**
* Mélange les items d'un tableau, sans modifier le tableau passé en argument
*
* @Example
* tableau_melange = shuffle (tableau_origine)
* @Source https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
export function shuffle (array) {
  let currentIndex = array.length; let temporaryValue; let randomIndex

  // While there remain elements to shuffle...
  const arrayBis = array.slice()
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = arrayBis[currentIndex]
    arrayBis[currentIndex] = arrayBis[randomIndex]
    arrayBis[randomIndex] = temporaryValue
  }

  return arrayBis
}

export function shuffleJusqua (array, indice) {
  if (indice > array.length || indice < 0 || indice === undefined) {
    return shuffle(array)
  } else {
    const tableau1 = array.slice(0, indice)
    const tableau2 = array.slice(indice)
    return [...shuffle(tableau1), ...tableau2]
  }
}
/**
* Mélange les items de deux tableaux de la même manière
*
*
* @Source https://stackoverflow.com/questions/18194745/shuffle-multiple-javascript-arrays-in-the-same-way
*/
export function shuffle2tableaux (obj1, obj2) {
  let index = obj1.length
  let rnd, tmp1, tmp2

  while (index) {
    rnd = Math.floor(Math.random() * index)
    index -= 1
    tmp1 = obj1[index]
    tmp2 = obj2[index]
    obj1[index] = obj1[rnd]
    obj2[index] = obj2[rnd]
    obj1[rnd] = tmp1
    obj2[rnd] = tmp2
  }
}

/**
 *
 * Copié sur https://delicious-insights.com/fr/articles/le-piege-de-array-sort/
 */
export function numTrie (arr) {
  return arr.sort((a, b) => a - b)
}
/**
 * retourne un tableau dans lequel les doublons ont été supprimés s'il y en a MAIS SANS TRI
 * @param {array} arr Tableau duquel ont veut supprimer les doublons numériques
 * @param {number} tolerance La différence minimale entre deux valeurs pour les considérer comme égales
 * @author Jean-Claude Lhote
 **/
export function enleveDoublonNum (arr, tolerance = 0) {
  let k = 0
  while (k < arr.length - 1) {
    let kk = k + 1
    while (kk < arr.length - 1) {
      if (egal(arr[k], arr[kk], tolerance)) {
        arr[k] = (arr[k] + arr[kk]) / 2 // On remplace la valeur dont on a trouvé un double par la moyenne des deux valeurs
        arr.splice(kk, 1) // on supprime le doublon.
      }
      kk++
    }
    k++
  }
  return arr
}
