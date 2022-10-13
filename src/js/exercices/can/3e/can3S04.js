import { sp } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { prenom } from '../../../modules/outils/objetsPersonnes.js'
import { listeDeNotes } from '../../../modules/outils/statistiques.js'
import { texNombre } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une étendue'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export const uuid = 'f0983'
export const ref = 'can3S04'
export default function Etendue () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let min, max
    const nombreNotes = randint(4, 7)
    const notes = listeDeNotes(nombreNotes, randint(0, 7), randint(13, 20)) // on récupère une série de notes (série brute)
    min = 20
    max = 0
    for (let j = 0; j < nombreNotes; j++) { // On cherche la note minimum et la note maximum
      min = Math.min(notes[j], min)
      max = Math.max(notes[j], max)
    }
    this.question = `${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`
    this.question += `$${notes[0]}$`
    for (let j = 1; j < nombreNotes - 1; j++) { this.question += `${sp(2)} ; ${sp(2)} $${notes[j]}$ ` } // On liste les notes
    this.question += `${sp(2)} et ${sp(2)} $${notes[nombreNotes - 1]}$.<br>`
    this.question += 'Calculer l\'étendue de cette série de notes.'
    this.correction = `La note la plus basse est : $${min}$.<br>La note la plus haute est : $${max}$<br>`
    this.correction += 'Donc l\'étendue de cette série est : ' + `$${texNombre(max)}-${texNombre(min)}=${texNombre(max - min)}$`
    this.reponse = max - min
  }
}
