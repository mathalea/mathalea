import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,shuffle,combinaison_listes_sans_changer_ordre,calcul,tex_nombre,mise_en_evidence} from "/modules/outils.js"

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
    this.nb_questions = 3;
  } else {
    this.nb_questions = 3;
  };

  this.titre = "Encadrer un décimal par deux entiers consécutifs";
  this.consigne = `Encadrer chaque nombre proposé par deux nombres entiers consécutifs.`;

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  sortie_html ? this.spacing = 3 : this.spacing = 2;
  sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;

  let type_de_questions_disponibles;

  this.nouvelle_version = function () {
    if (this.beta) {
      type_de_questions_disponibles = [0, 1, 2];
    } else {
      //type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      type_de_questions_disponibles = shuffle([0, 1, 2]);

    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées


    //let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
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
          $\\ldots < ${tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))} < \\ldots$          
					`,
        question: ``,
        correction: `
					$${mise_en_evidence(tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1))} < ${tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01 + mi * 0.001))} < ${mise_en_evidence(tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1 + 1))}$					`
      });
      enonces.push({
        enonce: `
          $\\ldots < ${tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01))} < \\ldots$          
					`,
        question: ``,
        correction: `
					$${mise_en_evidence(tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1))} < ${tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1 + ci * 0.01))} < ${mise_en_evidence(tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1 + 1))}$					`
      });
      enonces.push({
        enonce: `
          $\\ldots < ${tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1))} < \\ldots$          
					`,
        question: ``,
        correction: `
					$${mise_en_evidence(tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1))} < ${tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1 + calcul(di * 0.1))} < ${mise_en_evidence(tex_nombre(m * 1000 + c * 100 + d * 10 + u * 1 + 1))}$					`
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
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[0].correction}`;
          };
          break;
        case 1:
          texte = `${enonces[1].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[1].correction}`;
          };
          break;
        case 2:
          texte = `${enonces[2].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[2].correction}`;
          };
          break;
      };
      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
}
