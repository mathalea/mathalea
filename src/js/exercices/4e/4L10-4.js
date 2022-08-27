import { ExoRose } from '../6e/_Roses.js'
export const titre = 'Rose additive littéraux'
export { interactifReady, interactifType } from '../6e/_Roses.js'
export const dateDePublication = '12/08/2022'

/**
 * Travailler les réductions d'expressions littérales
 * @author Jean-Claude Lhote
 * Référence 4L10-4
 */

export default function RoseAdditive4L () { // c'est l'ExoRose zéro contenu dans _Roses.js
  ExoRose.call(this) // Héritage de la classe Exercice()
  this.operation = 'addition'
  this.typeDonnees = 'littéraux'
  this.besoinFormulaireNumerique = ['Valeur maximale (entre 10 et 30) des termes', 30]
  this.besoinFormulaire2Numerique = ['Nombre de termes entre 3 et 5', 5]
  this.besoinFormulaire3Numerique = ['Type de question', 4, '1 : Calculer les sommes\n2 : Calculer les termes manquants\n3 : Course aux nombres 1\n4 : Course aux nombres 2']
}
