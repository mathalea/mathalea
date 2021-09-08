import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'
export { interactifReady, interactifType, amcType, amcReady } from './_Ecrire_une_expression_numerique.js'
export const titre = 'Calculer une expression numérique en détaillant les calculs'

/**
 * @author Jean-Claude Lhote
 * Référence 5C12
 */
export default function CalculerUneExpressionNumerique () {
  if (this.sup2) {
    EcrireUneExpressionNumerique.call(this, false)
  } else {
    EcrireUneExpressionNumerique.call(this, true)
  }
  this.version = 4
  this.titre = titre
  this.besoinFormulaireTexte = ['Choix des expressions', 'Nombres séparés par des tirets\n2 : Expressions à deux opérations\n3 : Expressions à 3 opérations\n4 : Expressions à 4 opérations\n5 : Expressions complexes'] // Texte, tooltip - il faut au moins deux opérations
  this.besoinFormulaire2CaseACocher = ['Utilisation de décimaux (pas de calcul mental)', false]
  this.besoinFormulaire3CaseACocher = ['Avec le signe × devant les parenthèses', true]
}
