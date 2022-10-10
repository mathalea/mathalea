import Exercice from '../../Exercice.js'
import { randint, calcul } from '../../../modules/outils.js'
export const titre = 'Trouver le nombre de nombres entiers entre deux valeurs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Créé pendant l'été 2021
 * Référence can4C06
 * Date de publication
*/
export const uuid = '11f3c'
export const ref = 'can4C06'
export default function NombreDeNombresEntiersEntreDeuxValeurs () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const a = randint(1, 15)
    const b = randint(18, 35)
    this.question = `Donner le nombre d'entiers strictement compris entre $${a}$ et $${b}$.`
    this.correction = `Il y en a $(${b}-${a})-1$ soit $${b - a - 1}$ entiers strictement compris entre $${a}$ et $${b}$ `
    this.reponse = calcul(b - a - 1)
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
