import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,shuffle,combinaisonListesSansChangerOrdre,texNombre,miseEnEvidence,texte_en_couleur_et_gras} from '../../modules/outils.js'
export const titre = 'Ranger une liste de nombres entiers dans l’ordre croissant ou décroissant'

/** 
* * Ranger une liste de nombres dans l'odre croissant ou décroissant
* * 6N11-4
* @author Sébastien Lozano
*/

export default function Ranger_ordre_croissant_decroissant() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.beta = false;
  this.sup = 1;
  if (this.beta) {
    this.nbQuestions = 2;
  } else {
    this.nbQuestions = 2;
  };

  this.titre = titre;
  //this.consigne = `Classer les nombres suivants dans l'ordre indiqué.`;	

  this.nbCols = 1;
  this.nbColsCorr = 1;
  //this.nbQuestionsModifiable = false;
  sortieHtml ? this.spacing = 3 : this.spacing = 2;
  sortieHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5;

  let type_de_questions_disponibles;

  this.nouvelleVersion = function () {
    if (this.beta) {
      type_de_questions_disponibles = [0, 1];
    } else {
      //type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);      			
      type_de_questions_disponibles = [0, 1];
    };

    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    //let listeTypeDeQuestions  = combinaisonListes(type_de_questions_disponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // les chiffres
      let c1 = randint(1, 9);
      let c2 = randint(1, 9, [c1]);
      let c3 = randint(1, 9, [c1, c2]);
      let c4 = randint(1, 9, [c1, c2, c3]);
      let c5 = randint(1, 9, [c1, c2, c3, c4]);

      // pour les situations, autant de situations que de cas dans le switch !
      let situations = [
        {//case 0 -->
          ordre: 'croissant',
          symbole: `$${miseEnEvidence('<')}$`,
          n1: Number(c1.toString() + c2.toString() + c3.toString() + c4.toString() + c5.toString()),
          n2: Number(c1.toString() + c3.toString() + c2.toString() + c4.toString() + c5.toString()),
          n3: Number(c1.toString() + c2.toString() + c5.toString() + c4.toString() + c3.toString()),
          n4: Number(c1.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
          n5: Number('1'.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
          n6: Number(c1.toString() + c2.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
        },
        {//case 1 -->
          ordre: 'décroissant',
          symbole: `$${miseEnEvidence('>')}$`,
          n1: Number(c1.toString() + c2.toString() + c3.toString() + c4.toString() + c5.toString()),
          n2: Number(c1.toString() + c3.toString() + c2.toString() + c4.toString() + c5.toString()),
          n3: Number(c1.toString() + c2.toString() + c5.toString() + c4.toString() + c3.toString()),
          n4: Number(c1.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
          n5: Number('1'.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
          n6: Number(c1.toString() + c2.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
        },
      ];

      // une fonction pour gérer l'ordre
      function myOrdre(ordre, tab) {
        tab.sort((a, b) => a - b);
        switch (ordre) {
          case 'croissant':
            return tab;
          case 'décroissant':
            return tab.reverse();
        };
      };

      let enonces = [];
      let nombres = [];
      let nombres_ranges = [];
      for (let k = 0; k < situations.length; k++) {
        nombres = shuffle([situations[k].n1, situations[k].n2, situations[k].n3, situations[k].n4, situations[k].n5, situations[k].n6]);
        nombres_ranges = [];
        nombres.forEach(element => {
          nombres_ranges.push(element);
        });
        myOrdre(situations[k].ordre, nombres_ranges);
        enonces.push({
          enonce: `Classer les nombres suivants dans l'ordre ${situations[k].ordre} :<br>
        $${texNombre(nombres[0])}$   ;   $${texNombre(nombres[1])}$   ;   $${texNombre(nombres[2])}$   ;   $${texNombre(nombres[3])}$   ;   $${texNombre(nombres[4])}$   ;   $${texNombre(nombres[5])}$          
        `,
          question: ``,
          correction: `Les nombres rangés dans l'ordre ${texte_en_couleur_et_gras(situations[k].ordre)} :<br>
        $${texNombre(nombres_ranges[0])}$   ${situations[k].symbole}   $${texNombre(nombres_ranges[1])}$   ${situations[k].symbole}   $${texNombre(nombres_ranges[2])}$   ${situations[k].symbole}   $${texNombre(nombres_ranges[3])}$   ${situations[k].symbole}   $${texNombre(nombres_ranges[4])}$   ${situations[k].symbole}   $${texNombre(nombres_ranges[5])}$
        `
        });
      };

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
      };

      if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  }
  //this.besoinFormulaireNumerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  //this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];	
};


