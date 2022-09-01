import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'
export { interactifReady, interactifType, amcType, amcReady } from './_Ecrire_une_expression_numerique.js'
export const titre = 'Traduire une phrase par une expression et la calculer'

/**
 * @author Jean-Claude Lhote
 * Référence 5C12-1
 */
export const uuid = 'cd0d8'
export const ref = '5C12-1'
export default function TraduireUnePhraseParUneExpressionEtCalculer () {
  EcrireUneExpressionNumerique.call(this)
  this.version = 3
  this.titre = titre
  this.sup4 = false
  this.besoinFormulaireTexte = ['Choix des expressions', 'Nombres séparés par des tirets\n2 : Expressions à 2 opérations\n3 : Expressions à 3 opérations\n4 : Expressions à 4 opérations\n5 : Expressions complexes'] // Texte, tooltip - il faut au moins deux opérations
  this.besoinFormulaire2CaseACocher = ['Utilisation de décimaux (pas de calcul mental)', false]
  this.besoinFormulaire4CaseACocher = ['Présentation des corrections en colonnes', false]
}
