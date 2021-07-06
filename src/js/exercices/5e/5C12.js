import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'

export const titre = 'Calculer une expression numérique en détaillant les calculs'

/**
 * @author Jean-Claude Lhote
 * Référence 5C12
 */
export default function CalculerUneExpressionNumerique () {
  EcrireUneExpressionNumerique.call(this)
  this.version = 4
  this.titre = titre
  this.besoinFormulaireTexte = ['Choix des expressions', 'Nombres séparés par des tirets\n2 : Expressions à deux opérations\n3 : Expressions à 3 opérations\n4 : Expressions à 4 opérations\n5 : Expressions complexes'] // Texte, tooltip - il faut au moins deux opérations
}
