import { ExoRose } from './_Roses.js'
export const titre = 'Résoudre une Rose additive'
export { interactifReady, interactifType } from './_Roses.js'
export const dateDePublication = '12/08/2022'
/**
 * Travailler les tables de multiplication autrement
 * @author Jean-Claude Lhote
 * Référence 6C10-6
 */

export const uuid = '322a0'
export const ref = '6C10-0'
export default function RoseMultiplicative () { // c'est l'ExoRose zéro contenu dans _Roses.js
  ExoRose.call(this) // Héritage de la classe Exercice()
  this.operation = 'addition'
  this.besoinFormulaireNumerique = ['Valeur maximale (entre 10 et 30) des termes', 30]
  this.besoinFormulaire2Numerique = ['Nombre de termes entre 3 et 9', 9]
  this.besoinFormulaire3Numerique = ['Type de question', 4, '1 : Calculer les sommes\n2 : Calculer les termes manquants\n3 : Course aux nombres 1\n4 : Course aux nombres 2']
}
