import EcrireUneExpressionNumerique from './_Ecrire_une_expression_numerique.js'

export const titre = 'Traduire une phrase par une expression et la calculer'

/**
 * @author Jean-Claude Lhote
 * Référence 5L14-3
 */
export const uuid = '2c600'
export const ref = '5L14-3'
export default function TraduireUnePhraseParUneExpressionLitteraleEtCalculer () {
  EcrireUneExpressionNumerique.call(this)
  this.version = 3
  this.titre = titre
  this.litteral = true
  this.sup = NaN
  this.sup4 = 1
  this.besoinFormulaire4Numerique = ['Niveau de difficulté', 4, '1 : de 1 à 3 opérations\n2 : de 2 à 3 opérations\n3 : jusqu\'à 4 opérations\n4 : opérations plus complexes']
}
