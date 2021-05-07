import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,shuffle,combinaisonListesSansChangerOrdre,calcul,texNombrec,texNombre} from '../../modules/outils.js'
export const amcReady = true

export const titre = 'Calculer le produit de deux décimaux connaissant le produit de deux entiers'

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
    this.nbQuestions = 3;
  } else {
    this.nbQuestions = 3;
  };

  this.titre = titre;
  this.consigne = ``;

  this.nbCols = 1;
  this.nbColsCorr = 1;
  //this.nbQuestionsModifiable = false;
  sortieHtml ? this.spacing = 3 : this.spacing = 2;
  sortieHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5;

  let type_de_questions_disponibles;

  this.nouvelleVersion = function () {
    this.qcm=['6C30-2',[],'Calculer le produit de deux décimaux connaissant le produit de deux entiers',4]
    if (this.beta) {
      type_de_questions_disponibles = [0, 1, 2];
    } else {
      //type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      type_de_questions_disponibles = shuffle([0, 1, 2]);

    };

    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
let reponse
    //let listeTypeDeQuestions  = combinaisonListes(type_de_questions_disponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {

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
            Sachant que $${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)} = ${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}$,
            calculer $${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (10 ** situations[0].p1)))}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)}$.
					`,
        question: ``,
        correction: `
					$${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (10 ** situations[0].p1)))}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)} = ${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${texNombrec(10 ** situations[0].p1)} \\times ${calcul(situations[0].d2 * 10 + situations[0].u2)} = ${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)}\\times ${texNombrec(10 ** situations[0].p1)} =  ${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}\\times ${texNombrec(10 ** situations[0].p1)} = ${texNombrec(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)) * calcul(10 ** situations[0].p1))}$
					`,
          reponse:calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2) * 10 ** situations[0].p1)
      });
      enonces.push({
        enonce: `
            Sachant que $${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)} = ${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}$,
            calculer $${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1)))}\\times ${texNombre(calcul((situations[0].d2 * 10 + situations[0].u2) * (10 ** situations[0].p2)))}$.
					`,
        question: ``,
        correction: `
					$${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1)))}\\times ${texNombre(calcul((situations[0].d2 * 10 + situations[0].u2) * (10 ** situations[0].p2)))} = ${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)}\\times ${texNombrec(10 ** situations[0].p2)} = ${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}\\times ${texNombrec(10 ** situations[0].p2)} = ${texNombrec(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)) * calcul(10 ** situations[0].p2))}$
					`
          ,reponse:calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2) * 10 ** situations[0].p2)
      });
      enonces.push({
        enonce: `
            Sachant que $${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)} = ${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}$,
            calculer $${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (10 ** situations[0].p1)))}\\times ${texNombre(calcul((situations[0].d2 * 10 + situations[0].u2) * (10 ** situations[0].p2)))}$.
					`,
        question: ``,
        correction: `
					$${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (10 ** situations[0].p1)))}\\times ${texNombre(calcul((situations[0].d2 * 10 + situations[0].u2) * (10 ** situations[0].p2)))} = ${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${texNombrec(10 ** situations[0].p1)} \\times ${calcul(situations[0].d2 * 10 + situations[0].u2)}\\times ${texNombrec(10 ** situations[0].p2)} = ${calcul(situations[0].d1 * 10 + situations[0].u1)}\\times ${calcul(situations[0].d2 * 10 + situations[0].u2)}\\times ${texNombrec(10 ** situations[0].p1)}\\times ${texNombrec(10 ** situations[0].p2)} = ${texNombre(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)))}\\times ${texNombrec(10 ** situations[0].p1)}\\times ${texNombrec(10 ** situations[0].p2)} = ${texNombrec(calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2)) * calcul(10 ** situations[0].p1) * calcul(10 ** situations[0].p2))}$
					`,
          reponse:calcul((situations[0].d1 * 10 + situations[0].u1) * (situations[0].d2 * 10 + situations[0].u2) * 10 ** situations[0].p1 * 10 ** situations[0].p2)
      });

      //};

      // autant de case que d'elements dans le tableau des situations
      switch (listeTypeDeQuestions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte += `             `
            texteCorr = ``;
          } else {
            texteCorr = `${enonces[0].correction}`;
          };
          reponse=enonces[0].reponse
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
          reponse=enonces[1].reponse
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
          reponse=enonces[2].reponse
          break;
      };
      if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
        this.qcm[1].push([texte, [texteCorr,reponse], {digits:0,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}])
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  }
};


