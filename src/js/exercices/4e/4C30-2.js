import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,texNombre,texNombre2,puissanceEnProduit} from '../../modules/outils.js'
export const titre = 'Écriture décimale d’une puissance de 10'

/**
 * Donner l'écriture décimale d'une puissance de 10
 * @Auteur Rémi Angot
* Référence 4C30-2
 */
export default function EcritureDecimalePuissanceDe10() {
  Exercice.call(this);
  this.titre = titre;
  this.consigne = "Donner l'écriture décimale";
  this.nbQuestions = 8;
  this.nbCols = 1;
  this.nbColsCorr = 1;
  this.sup = 3; // exposants positifs et négatifs par défaut

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let liste_type_de_questions
    if (this.sup == 1) {
      liste_type_de_questions = combinaisonListes(['+'], this.nbQuestions);
    }
    if (this.sup == 2) {
      liste_type_de_questions = combinaisonListes(['-'], this.nbQuestions);
    }
    if (this.sup == 3) {
      liste_type_de_questions = combinaisonListes(['+', '-'], this.nbQuestions);
    }
    for (let i = 0, texte, texteCorr, n, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (liste_type_de_questions[i]) {
        case '+':
          n = randint(0, 10)
          texte = `$10^{${n}}$`;
          if (n < 2) {
            texteCorr = `$10^${n}=${10 ** n}$`
          } else {
            if (sortieHtml){
              texteCorr = `$10^{${n}}=${puissanceEnProduit(10, n)}=${texNombre(10 ** n)}$`;
            } else {
              texteCorr = `$10^{${n}}=${texNombre(10 ** n)}$`;
            }
          }
          break;
        case '-':
          n = randint(1, 10)
          texte = `$10^{${-n}}$`;
          if (sortieHtml){
            texteCorr = `$10^{${-n}}=\\dfrac{1}{10^{${n}}}=\\dfrac{1}{${puissanceEnProduit(10, n)}}=\\dfrac{1}{${texNombre(10 ** n)}}=${texNombre2(1 / 10 ** n)}$`;
          } else {
            texteCorr = `$10^{${-n}}=\\dfrac{1}{10^{${n}}}=\\dfrac{1}{${texNombre(10 ** n)}}=${texNombre2(1 / 10 ** n)}$`;
          }
          break;

      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Exposants positifs\n2 : Exposants négatifs\n3 : Exposants relatifs'];
}


