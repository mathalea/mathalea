import Lecture_expression_fonctions_affines from './3F21-1.js'
export const titre = 'Déterminer une fonction linéaire'

/**
 * Trace 5 droites et demande l'expression de la fonction affine ou linéaire correspondante
 * @Auteur Jean-Claude Lhote
 * Référence : 3F21-1
 */
export default function LectureExpressionFonctionsLineaires () {
  Lecture_expression_fonctions_affines.call(this)
  this.titre = titre
  this.lineaire = true
}
