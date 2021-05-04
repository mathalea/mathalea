import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,shuffle,combinaisonListesSansChangerOrdre,calcul,texNombre,miseEnEvidence} from '../../modules/outils.js'

export const titre = 'Encadrer un décimal par deux entiers consécutifs'

/**
 * * Encadrer_un_decimal_par_deux_entiers_consecutifs
 * * 6N31-1
 * @author Sébastien Lozano
 */
export default function Encadrer_un_decimal_par_deux_entiers_consecutifs() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.beta = false;
  this.sup = 1;
  if (this.beta) {
    this.nbQuestions = 3;
  } else {
    this.nbQuestions = 3;
  };

  this.titre = titre;
  this.consigne = `Encadrer chaque nombre proposé par deux nombres entiers consécutifs.`;

  this.nbCols = 1;
  this.nbColsCorr = 1;
  //this.nbQuestionsModifiable = false;
  sortieHtml ? this.spacing = 3 : this.spacing = 2;
  sortieHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5;

  let type_de_questions_disponibles;

  this.nouvelleVersion = function () {
    if (this.beta) {
      type_de_questions_disponibles = [0, 1, 2];
    } else {
      //type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      type_de_questions_disponibles = shuffle([0, 1, 2]);

    };

    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées


    //let liste_type_de_questions  = combinaisonListes(type_de_questions_disponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let m = randint(1, 9),
        c = randint(1, 9),
        d = randint(1, 9),
        u = randint(1, 9),
        di = randint(1, 9),
        ci = randint(1, 9),
        mi = randint(1, 9);

      // pour les situations, autant de situations que de cas dans le switch !

      let enonces = [];
      //for (let k=0;k<3;k++) {
      enonces.push({
        enonce: `
          $\\ldots < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))} < \\ldots$          
					`,
        question: ``,
        correction: `
					$${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1))} < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))} < ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + 1))}$					`
      });
      enonces.push({
        enonce: `
          $\\ldots < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01))} < \\ldots$          
					`,
        question: ``,
        correction: `
					$${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1))} < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01))} < ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + 1))}$					`
      });
      enonces.push({
        enonce: `
          $\\ldots < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1))} < \\ldots$          
					`,
        question: ``,
        correction: `
					$${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1))} < ${texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1))} < ${miseEnEvidence(texNombre(m * 1000 + c * 100 + d * 10 + u * 1 + 1))}$					`
      });

      //};
      // autant de case que d'elements dans le tableau des situations
      switch (liste_type_de_questions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte += `             `;
            texteCorr = ``;
          } else {
            texteCorr = `${enonces[0].correction}`;
          };
          break;
        case 1:
          texte = `${enonces[1].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${enonces[1].correction}`;
          };
          break;
        case 2:
          texte = `${enonces[2].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`;
            texteCorr = ``;
          } else {
            texteCorr = `${enonces[2].correction}`;
          };
          break;
      };
      if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
}
