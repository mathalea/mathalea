import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,range1,combinaisonListesSansChangerOrdre,texNombrec,texFraction} from '../../modules/outils.js'
export const titre = 'Donner l’écriture décimale d’un nombre à partir de différents textes'

/**
 * Écriture décimale à partir de différentes manière de l'énoncer
 *
 * * 3 unités, 5 dixièmes et 8 centièmes
 * * 3 unités et 5 centièmes
 * * 5 dixièmes
 * * 128/10
 * * 8+5/100+7/100
 * @Auteur Rémi Angot
 * Référence 6N23-4
 */
export default function Nombre_decimal_oralise_de_differentes_manieres() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Donner l'écriture décimale de chaque nombre.";
  this.nbQuestions = 5;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = range1(5);
    let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions);
    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, c, choix; i < this.nbQuestions && cpt < 50;) {
      a = randint(2, 9);
      b = randint(2, 9, a)
      c = randint(2, 9, [a, b])
      switch (listeTypeDeQuestions[i]) {
        case 1: //3 unités, 5 dixièmes et 8 centièmes   
          texte = `${a} unités, ${b} dixièmes et ${c} centièmes`;
          texteCorr = `$${a}+${texFraction(b, 10)}+${texFraction(c, 100)}=${texNombrec(a + b / 10 + c / 100)}$`
          break;
        case 2: //3 unités et 5 centièmes   
          texte = `${a} unités et ${c} centièmes`;
          texteCorr = `$${a}+${texFraction(c, 100)}=${texNombrec(a + c / 100)}$`
          break;
        case 3: //5 dixièmes / centièmes ou millièmes
          choix = randint(1, 3)
          if (choix == 1) {
            texte = `${a} dixièmes`;
            texteCorr = `$${texFraction(a, 10)}=${texNombrec(a / 10)}$`
          }
          if (choix == 2) {
            texte = `${a} centièmes`;
            texteCorr = `$${texFraction(a, 100)}=${texNombrec(a / 100)}$`
          }
          if (choix == 3) {
            texte = `${a} millièmes`;
            texteCorr = `$${texFraction(a, 1000)}=${texNombrec(a / 1000)}$`
          }
          break;
        case 4: //128/10
          let n = a * 100 + b * 10 + c
          choix = randint(1, 3)
          if (choix == 1) {
            texte = `$${texFraction(n, 10)}$`;
            texteCorr = `$${texFraction(n, 10)}=${texNombrec(n / 10)}$`
          }
          if (choix == 2) {
            texte = `$${texFraction(n, 100)}$`;
            texteCorr = `$${texFraction(n, 100)}=${texNombrec(n / 100)}$`
          }
          if (choix == 1) {
            texte = `$${texFraction(n, 1000)}$`;
            texteCorr = `$${texFraction(n, 1000)}=${texNombrec(n / 1000)}$`
          }
          break;
        case 5: //8+5/100+7/100  
          choix = randint(1, 2)
          if (choix == 1) {
            texte = `$${a}+${texFraction(b, 100)}+${texFraction(c, 100)}$`;
            texteCorr = `$${a}+${texFraction(b, 100)}+${texFraction(c, 100)}=${a}+${texFraction(b + c, 100)}=${texNombrec(a + (b + c) / 100)}$`
          }
          if (choix == 2) {
            texte = `$${a}+${texFraction(b, 10)}+${texFraction(c, 10)}$`;
            texteCorr = `$${a}+${texFraction(b, 10)}+${texFraction(c, 10)}=${a}+${texFraction(b + c, 10)}=${a}+${texNombrec((b + c) / 10)}=${texNombrec(a + (b + c) / 10)}$`
          }
          break;

      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        if (!sortieHtml && i == 0) {
          texteCorr = `\\setlength\\itemsep{2em}` + texteCorr;
        } // espacement entre les questions
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
}









