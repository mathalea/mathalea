import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'
export { interactifReady, interactifType, amcType, amcReady } from './_Ecrire_une_expression_numerique.js'
export const titre = 'Traduire une phrase par une expression et la calculer'

/**
 * @author Jean-Claude Lhote
 * Référence 5C12-1
 */
export default function TraduireUnePhraseParUneExpressionEtCalculer () {
  EcrireUneExpressionNumerique.call(this)
  this.version = 3
  this.titre = titre
  this.besoinFormulaireTexte = ['Choix des expressions', 'Nombres séparés par des tirets\n2 : Expressions à deux opérations\n3 : Expressions à 3 opérations\n4 : Expressions à 4 opérations\n5 : Expressions complexes'] // Texte, tooltip - il faut au moins deux opérations
}
