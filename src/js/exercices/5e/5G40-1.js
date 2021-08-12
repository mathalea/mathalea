import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, texteEnCouleurEtGras, shuffle2tableaux } from '../../modules/outils.js'
export const titre = 'Citer les propriétés des parallélogrammes'

/**
 * On doit compléter des propriétés des parallélogrammes
 * @author Rémi Angot
 * Référence 5G40-1
 * Publié le 5/4/2021
*/
export default function ProprietesDesParallelogrammes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Compléter les phrases suivantes à l'aide de la définition ou des propriétés des parallélogrammes."
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.introduction = 'Dans cet exercice, on supposera que tous les quadrilatères sont non croisés.'

    const question1 = 'Si un quadrilatère est un parallélogramme alors ses côtés…'
    const correction1 = `Si un quadrilatère est un parallélogramme alors ses côtés ${texteEnCouleurEtGras('opposés sont parallèles et de même longueur')}.`

    const question2 = 'Si un quadrilatère est un parallélogramme alors ses diagonales…'
    const correction2 = `Si un quadrilatère est un parallélogramme alors ses diagonales ${texteEnCouleurEtGras('se coupent en leur milieu')}.`

    const question3 = 'Si un quadrilatère est un parallélogramme alors ses angles…'
    const correction3 = `Si un quadrilatère est un parallélogramme alors ses angles ${texteEnCouleurEtGras('opposés sont égaux et la somme de deux angles consécutifs est égale à 180°')}.`

    const question4 = 'Si un quadrilatère est un parallélogramme alors … symétrie …'
    const correction4 = `Si un quadrilatère est un parallélogramme alors ${"il a un centre de symétrie qui est le point d'intersection de ses diagonales"}.`

    const question5 = "Si un quadrilatère a ses diagonales … alors c'est un parallélogramme."
    const correction5 = `Si un quadrilatère a ses diagonales ${texteEnCouleurEtGras('qui se coupent en leur milieu')} alors c'est un parallélogramme`

    const question6 = "Si un quadrilatère a … parallèles alors c'est un parallélogramme."
    const correction6 = `Si un quadrilatère a ${texteEnCouleurEtGras('ses côtés opposés')} parallèles alors c'est un parallélogramme`

    const question7 = "Si un quadrilatère a … longueur alors c'est un parallélogramme."
    const correction7 = `Si un quadrilatère a ${texteEnCouleurEtGras('ses côtés opposés de même')} longueur alors c'est un parallélogramme`

    const question8 = "Si un quadrilatère a deux côtés … alors c'est un parallélogramme."
    const correction8 = `Si un quadrilatère a deux côtés ${texteEnCouleurEtGras('opposés parallèles et de même longueur')} alors c'est un parallélogramme`

    const question9 = "Si un quadrilatère a … angles … alors c'est un parallélogramme."
    const correction9 = `Si un quadrilatère a ${texteEnCouleurEtGras('ses angles opposés égaux')} alors c'est un parallélogramme`

    if (parseInt(this.sup) === 1) {
      this.listeQuestions = [question1, question2, question3, question4]
      this.listeCorrections = [correction1, correction2, correction3, correction4]
    } else if (parseInt(this.sup) === 2) {
      this.listeQuestions = [question5, question6, question7, question8, question9]
      this.listeCorrections = [correction5, correction6, correction7, correction8, correction9]
    } else {
      this.listeQuestions = [question1, question2, question3, question4, question5, question6, question7, question8, question9]
      this.listeCorrections = [correction1, correction2, correction3, correction4, correction5, correction6, correction7, correction8, correction9]
    }
    shuffle2tableaux(this.listeQuestions, this.listeCorrections)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, "1 : Propriétés du parallélogramme\n2 : Propriétés pour montrer qu'un quadrilatère est un parallélogramme\n3 : Toutes les propriétés"]
}
