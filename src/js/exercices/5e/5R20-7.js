import { ExoRose } from '../6e/_Roses.js'
export const titre = 'Rose additive relatifs'
export { interactifReady, interactifType } from '../6e/_Roses.js'
export const dateDePublication = '12/08/2022'

/**
 * Travailler les tables de multiplication autrement
 * @author Jean-Claude Lhote
 * Référence 6C10-6
 */

export default function RoseAdditive5R () { // c'est l'ExoRose zéro contenu dans _Roses.js
  ExoRose.call(this) // Héritage de la classe Exercice()
  this.operation = 'addition'
  this.typeDonnees = 'entiers relatifs'
  this.besoinFormulaireNumerique = ['Valeur maximale (entre 10 et 30) des termes', 30]
  this.besoinFormulaire2Numerique = ['Nombre de termes entre 3 et 9 (limité à 5 pour les valeurs fractionnaires ou littérales)']
  this.besoinFormulaire3Numerique = ['Type de question', 4, '1 : Calculer les sommes\n2 : Calculer les termes manquants\n3 : Course aux nombres 1\n4 : Course aux nombres 2']
}
