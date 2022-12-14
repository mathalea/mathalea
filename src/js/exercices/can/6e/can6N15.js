import { choice, randint } from '../../../modules/outils.js'
import ÉcrirePetitsNombresEntiers from '../../6e/6N10.js'
export const titre = 'Lire et écrire des nombres'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '14/08/2022'
/**
 * Écrire en chiffres un nombre donné en lettres
 * variante Can de 6N10
 * Par Jean-Claude Lhote
 */

export const uuid = '41030'
export const ref = 'can6N15'
export default function ÉcrirePetitsNombresEntiersCan () {
  ÉcrirePetitsNombresEntiers.call(this)
  this.tailleDiaporama = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1 // on en fait un exo qui n'aura qu'une question
  this.nbQuestionsModifiable = false // on fait disparaitre le paramètre nombre de questions
  this.sup = choice(['4', '5', '6']) // on calibre l'exo comme on veut.
  this.sup3 = 2
  this.sup2 = randint(0, 3)
  this.besoinFormulaireTexte = false // pour ne pas qu'il y ait de paramètrage possible.
  this.besoinFormulaire2Texte = false // afin de conserver les paramètres fixés ci-dessus et choisis par le programmeur
  this.besoinFormulaire3Numerique = false
}
