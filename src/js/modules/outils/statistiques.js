/** @module statistiques */

import { choice } from './arrays'
import { randint } from './entiers'

/**
* Renvoie un tableau avec les résultats des tirages successifs
* @param nombreTirages Combien de tirages ?
* @param nombreFaces Pour spécifier le type de dés
* @param nombreDes Combien de dés à chaque tirage ?
* @author Jean-Claude Lhote
*/
export function tirerLesDes (nombreTirages, nombreFaces, nombreDes) {
  const tirages = []
  for (let i = 0; i <= (nombreFaces - 1) * nombreDes; i++) tirages.push([i + nombreDes, 0])
  for (let i = 0, resultat; i < nombreTirages; i++) {
    resultat = 0
    for (let j = 0; j < nombreDes; j++) resultat += randint(1, nombreFaces)
    tirages[resultat - nombreDes][1]++
  }
  return tirages
}
/**
  * Renvoie un tableau de nombres
  * @param nombreNotes
  * @param noteMin
  * @param noteMax
  * @param distincts Si distincts === true, les notes de la liste seront toutes distinctes
  * @author Jean-Claude Lhote et Guillaume Valmont
  */
export function listeDeNotes (nombreNotes, noteMin = 0, noteMax = 20, distincts = false) {
  const notes = []
  let candidat, present, limite // nombre candidat, est-ce qu'il est déjà présent, une limite d'itérations pour éviter les boucles infinies
  limite = 0
  for (let i = 0; i < nombreNotes;) {
    limite += 1
    if (distincts && limite < 100) { // Si les nombres doivent être tous distincts et que la limite d'itérations n'est pas encore atteinte,
      candidat = randint(noteMin, noteMax) // on tire au sort un nombre candidat,
      present = false
      for (let j = 0; j < notes.length; j++) { // on vérifie s'il est présent,
        if (candidat === notes[j]) {
          present = true
          break
        }
      }
      if (!present) { // s'il n'est pas présent, on le push.
        notes.push(candidat)
        i++
      }
    } else { // Si les nombres n'ont pas tous à être distincts, on push directement.
      notes.push(randint(noteMin, noteMax))
      i++
    }
  }
  return notes
}

/**
  * Renvoie le nombre de jour d'un mois donné
  * @param n quantième du mois (janvier=1...)
  * @author Jean-Claude Lhote
  */
export function joursParMois (n, annee = 2022) {
  const joursMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (n === 2) {
    if (((annee % 4 === 0) && (annee % 100 !== 0)) || (annee % 400 === 0)) return 29 // années bissextiles.
    else return 28
  } else return joursMois[n - 1]
}
/**
  * Renvoie un tableau de températures
  * @param base température médiane
  * @mois quantième du mois (janvier=1...)
  * @annee pour déterminer si elle est bissextile ou non
  * @author Jean-Claude Lhote
  */
export function unMoisDeTemperature (base, mois, annee) {
  const temperatures = []
  let nombreJours = joursParMois(mois)
  if (mois === 2) {
    if (((annee % 4 === 0) && (annee % 100 !== 0)) || (annee % 400 === 0)) nombreJours = 29 // années bissextiles.
    else nombreJours = 28
  }
  temperatures.push(randint(-3, 3) + base)
  for (let i = 1; i < nombreJours; i++) temperatures.push(temperatures[i - 1] + randint(-2, 2))
  return temperatures
}

/**
  * Renvoie le nom du mois
  * @param n quantième du mois
  * @author Jean-Claude Lhote
  */
export function nomDuMois (n) {
  const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  return mois[n - 1]
}

/**
  * Renvoie le nom du jour
  * @param n quantième du jour
  * @author Mireille Gain
  */
export function nomDuJour (n) {
  const jour = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
  return jour[n - 1]
}

/**
  * Renvoie le nom d'un jour au hasard
  * @param n quantième du jour
  * @author Mireille Gain
  */
export function jour () {
  return choice(['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'])
}
