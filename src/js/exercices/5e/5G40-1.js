import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, texteEnCouleurEtGras, combinaisonListes } from '../../modules/outils.js'
export const titre = 'Citer les propriétés des parallélogrammes'

export const dateDeModifImportante = '08/05/2022'

/**
 * On doit compléter des propriétés des parallélogrammes
 * @author Rémi Angot
 * Référence 5G40-1
 * Ajout de la possibilité de choisir le nombre de questions par Guillaume Valmont le 08/05/2022
 * Publié le 5/4/2021
*/
export const uuid = 'af2c2'
export const ref = '5G40-1'
export default function ProprietesDesParallelogrammes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Compléter les phrases suivantes à l'aide de la définition ou des propriétés des parallélogrammes."
  this.nbQuestions = 9
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    if (this.nbQuestions === 1) this.consigne = "Compléter la phrases suivante à l'aide de la définition ou d'une propriété des parallélogrammes."
    let typeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    if (parseInt(this.sup) === 1) {
      typeQuestionsDisponibles = [1, 2, 3, 4]
    } else if (parseInt(this.sup) === 2) {
      typeQuestionsDisponibles = [5, 6, 7, 8, 9]
    }

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.introduction = 'Dans cet exercice, on supposera que tous les quadrilatères sont non croisés.'

      switch (listeTypeQuestions[i]) {
        case 1:
          texte = 'Si un quadrilatère est un parallélogramme alors ses côtés…'
          texteCorr = `Si un quadrilatère est un parallélogramme alors ses côtés ${texteEnCouleurEtGras('opposés sont parallèles et de même longueur')}.`
          break
        case 2:
          texte = 'Si un quadrilatère est un parallélogramme alors ses diagonales…'
          texteCorr = `Si un quadrilatère est un parallélogramme alors ses diagonales ${texteEnCouleurEtGras('se coupent en leur milieu')}.`
          break
        case 3:
          texte = 'Si un quadrilatère est un parallélogramme alors ses angles…'
          texteCorr = `Si un quadrilatère est un parallélogramme alors ses angles ${texteEnCouleurEtGras('opposés sont égaux et la somme de deux angles consécutifs est égale à 180°')}.`
          break
        case 4:
          texte = 'Si un quadrilatère est un parallélogramme alors … symétrie …'
          texteCorr = `Si un quadrilatère est un parallélogramme alors ${"il a un centre de symétrie qui est le point d'intersection de ses diagonales"}.`
          break
        case 5:
          texte = "Si un quadrilatère a ses diagonales … alors c'est un parallélogramme."
          texteCorr = `Si un quadrilatère a ses diagonales ${texteEnCouleurEtGras('qui se coupent en leur milieu')} alors c'est un parallélogramme`
          break
        case 6:
          texte = "Si un quadrilatère a … parallèles alors c'est un parallélogramme."
          texteCorr = `Si un quadrilatère a ${texteEnCouleurEtGras('ses côtés opposés')} parallèles alors c'est un parallélogramme`
          break
        case 7:
          texte = "Si un quadrilatère a … longueur alors c'est un parallélogramme."
          texteCorr = `Si un quadrilatère a ${texteEnCouleurEtGras('ses côtés opposés de même')} longueur alors c'est un parallélogramme`
          break
        case 8:
          texte = "Si un quadrilatère a deux côtés … alors c'est un parallélogramme."
          texteCorr = `Si un quadrilatère a deux côtés ${texteEnCouleurEtGras('opposés parallèles et de même longueur')} alors c'est un parallélogramme`
          break
        case 9:
          texte = "Si un quadrilatère a … angles … alors c'est un parallélogramme."
          texteCorr = `Si un quadrilatère a ${texteEnCouleurEtGras('ses angles opposés égaux')} alors c'est un parallélogramme`
          break
      }
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, "1 : Propriétés du parallélogramme (max. 4 questions)\n2 : Propriétés pour montrer qu'un quadrilatère est un parallélogramme (max. 5 questions)\n3 : Mélange (max. 9 questions)"]
}
