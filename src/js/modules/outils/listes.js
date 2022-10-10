import { choice, shuffle } from './arrays'

/**
* Concatène liste à elle-même en changeant l'ordre à chaque cycle
*
*
* @Example
* combinaisonListes([A,B,C],7)
* // [B,C,A,C,B,A,A,B,C]
*
* @author Rémi Angot
*/
export function combinaisonListes (liste, tailleMinimale) {
  if (liste.length === 0) return []
  let l = shuffle(liste)
  while (l.length < tailleMinimale) {
    l = l.concat(shuffle(liste))
  }
  return l
}

/**
  * Concatène liste à elle-même en imposant à la nouvelle liste de contenir au moins tous les élements
  * de la liste initiale mais sans gestion de nombre de doublons au final.
  * @Example
  * combinaisonListes2([A,B,C],7)
  * // [B,C,B,B,C,A,B]
  * combinaisonListes2([A,B,C,D],6)
  * // [B,C,D,B,C,A,B]
  * @author Eric Elter
  */
export function combinaisonListes2 (liste, tailleMinimale) {
  if (liste.length === 0) return []
  let l = liste
  while (l.length < tailleMinimale) {
    l = l.concat(choice(liste))
  }
  return shuffle(l)
}

export function combinaisonListesSansChangerOrdre (liste, tailleMinimale) {
  // Concatène liste à elle même en changeant
  while (liste.length < tailleMinimale) {
    liste = liste.concat(liste)
  }
  return liste
}
/** Renvoie une liste exhaustive de tableaux contenant les mêmes élèments que tab mais jamais dans le même ordre
  * Fonction fort utile quand reponse est une suite de nombres par exemple. Voir ligne 111 Exercice 3A10-6.
  * Gros défaut :  Si tab contient plus de 6 éléments, cette fonction est chronophage. A ne pas utiliser
  * @example reponse = diversesReponsesPossibles([3,4,5]) renvoie [[3,4,5],[3,5,4],[4,3,5],[4,5,3],[5,3,4],[5,4,3]]
  * et ensuite pour les tous les i : reponse[i]=reponse[i].join(';') et reponse contient alors toutes les réponses possibles
  * @author Eric Elter
  * Septembre 2022
  */
export function diversesReponsesPossibles (tab) {
  let tab2, tab3
  const rep = []
  if (tab.length === 1) return (tab)
  for (let ee = 0; ee < tab.length; ee++) {
    tab2 = tab.slice()
    tab2.splice(ee, 1)
    tab3 = diversesReponsesPossibles(tab2)
    for (let k = 0; k < tab3.length; k++) {
      rep.push([tab[ee]].concat(tab3[k]))
    }
  }
  return rep
}
