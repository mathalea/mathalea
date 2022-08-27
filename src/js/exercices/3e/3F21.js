import LectureExpressionFonctionsAffines from './3F21-1.js'
export const titre = 'Déterminer une fonction linéaire'

/**
 * Trace 5 droites et demande l'expression de la fonction affine ou linéaire correspondante
 * @author Jean-Claude Lhote
 * Référence : 3F21-1
 */
export const uuid = 'b4c0d'
export const ref = '3F21'
export default function LectureExpressionFonctionsLineaires () {
  LectureExpressionFonctionsAffines.call(this)
  this.titre = titre
  this.lineaire = true
}
