/* eslint-disable camelcase */
import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, randint, texNombre } from '../../modules/outils.js'
export const titre = 'Addition de deux entiers'

/**
 * Additionner deux entiers
 * @Auteur Rémi Angot
 * Référence 6C10-4
 */
export default function Exercice_tables_d_additions (max = 20) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calculer'
  this.sup = max // Le paramètre accessible à l'utilisateur sera la valeur maximale
  this.spacing = 2
  this.tailleDiaporama = 100

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    for (
      let i = 0, a, b, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(2, this.sup)
      b = randint(2, this.sup)
      texte = '$ ' + texNombre(a) + ' + ' + texNombre(b) + ' = \\dotfill $'
      texteCorr =
        '$ ' +
        texNombre(a) +
        ' + ' +
        texNombre(b) +
        ' = ' +
        texNombre(a + b) +
        ' $'
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Valeur maximale', 99999]
}
