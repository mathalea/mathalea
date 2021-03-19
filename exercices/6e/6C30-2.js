import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,shuffle,combinaison_listes_sans_changer_ordre,calcul,tex_nombrec,tex_nombre} from "/modules/outils.js"
/** 
 * * Calculer le produit de deux décimaux à partir d'un produit de deux entiers
 * * 6C30-2
 * @author Sébastien Lozano
 */

export default function Produit_de_decimaux_a_partir_d_un_produit_connu() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.beta = false;
  this.sup = 1;
  if (this.beta) {
    this.nb_questions = 3;
  } else {
    this.nb_questions = 3;
  };

  this.titre = "Calculer le produit de deux décimaux connaissant le produit de deux entiers";
  this.consigne = ``;

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  sortie_html ? this.spacing = 2.5 : this.spacing = 1.5;
  sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;

  let type_de_questions_disponibles;

  this.nouvelle_version = function () {
    this.QCM=['6C30-2',[],'Calculer le produit de deux décimaux connaissant le produit de deux entiers',4]
    if (this.beta) {
      type_de_questions_disponibles = [0, 1, 2];
    } else {
      //type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      type_de_questions_disponibles = shuffle([0, 1, 2]);

    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
let reponse
    //let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

      // pour les situations, autant de situations que de cas dans le switch !
      let situations = [
        {//case 0 --> (d1u1xp1)xd2u2
          d1: randint(1, 9),
          u1: randint(1, 9),
          d2: randint(1, 9),
          u2: randint(1, 9),
          p1: randint(-3, 3, [0]),
          p2: randint(-3, 3, [0]),
        },
      ];
      let enonces = [];
      //for (let k=0;k<3;k++) {
      enonces.push({
        enonce: `
            Sachant que $${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)} = ${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}$,
            calculer $${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (10 ** situations[0].p1)))}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)}$.
					`,
        question: ``,
        correction: `
					$${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (10 ** situations[0].p1)))}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)} = ${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${tex_nombrec(10 ** situations[0].p1)} \\times ${calcul(situations[0].d2 * 10 + situations[0].u2)} = ${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)}\\times ${tex_nombrec(10 ** situations[0].p1)} =  ${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}\\times ${tex_nombrec(10 ** situations[0].p1)} = ${tex_nombrec(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)) * calcul(10 ** situations[0].p1))}$
					`,
          reponse:calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2) * 10 ** situations[0].p1)
      });
      enonces.push({
        enonce: `
            Sachant que $${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)} = ${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}$,
            calculer $${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1)))}\\times ${tex_nombre(calcul((situations[0].d2 * 10 + situations[0].u2) * (10 ** situations[0].p2)))}$.
					`,
        question: ``,
        correction: `
					$${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1)))}\\times ${tex_nombre(calcul((situations[0].d2 * 10 + situations[0].u2) * (10 ** situations[0].p2)))} = ${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)}\\times ${tex_nombrec(10 ** situations[0].p2)} = ${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}\\times ${tex_nombrec(10 ** situations[0].p2)} = ${tex_nombrec(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)) * calcul(10 ** situations[0].p2))}$
					`
          ,reponse:calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2) * 10 ** situations[0].p2)
      });
      enonces.push({
        enonce: `
            Sachant que $${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)} = ${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}$,
            calculer $${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (10 ** situations[0].p1)))}\\times ${tex_nombre(calcul((situations[0].d2 * 10 + situations[0].u2) * (10 ** situations[0].p2)))}$.
					`,
        question: ``,
        correction: `
					$${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (10 ** situations[0].p1)))}\\times ${tex_nombre(calcul((situations[0].d2 * 10 + situations[0].u2) * (10 ** situations[0].p2)))} = ${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${tex_nombrec(10 ** situations[0].p1)} \\times ${calcul(situations[0].d2 * 10 + situations[0].u2)}\\times ${tex_nombrec(10 ** situations[0].p2)} = ${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)}\\times ${tex_nombrec(10 ** situations[0].p1)}\\times ${tex_nombrec(10 ** situations[0].p2)} = ${tex_nombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}\\times ${tex_nombrec(10 ** situations[0].p1)}\\times ${tex_nombrec(10 ** situations[0].p2)} = ${tex_nombrec(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)) * calcul(10 ** situations[0].p1) * calcul(10 ** situations[0].p2))}$
					`,
          reponse:calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2) * 10 ** situations[0].p1 * 10 ** situations[0].p2)
      });

      //};

      // autant de case que d'elements dans le tableau des situations
      switch (liste_type_de_questions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte += `             `
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[0].correction}`;
          };
          reponse=enonces[0].reponse
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
          reponse=enonces[1].reponse
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
          reponse=enonces[2].reponse
          break;
      };
      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
        this.QCM[1].push([texte, [texte_corr,reponse], {digits:0,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}])
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  }
};


