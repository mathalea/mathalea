import Lecture_expression_fonctions_affines from './3F21-1.js'
/**
 * Trace 5 droites et demande l'expression de la fonction affine ou linéaire correspondante
 * @Auteur Jean-Claude Lhote
 * Référence : 3F21-1
 */
export default function Lecture_expression_fonctions_lineaires() {
  Lecture_expression_fonctions_affines.call(this);
  this.titre = "Déterminer une fonction linéaire";
  this.lineaire = true;
}
