import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,shuffle,combinaison_listes_sans_changer_ordre,tex_nombre,mise_en_evidence,texte_en_couleur_et_gras} from "/modules/outils.js"
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
    this.nb_questions = 2;
  } else {
    this.nb_questions = 2;
  };

  this.titre = "Ranger une liste de nombres entiers dans l'ordre croissant ou décroissant";
  //this.consigne = `Classer les nombres suivants dans l'ordre indiqué.`;	

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  sortie_html ? this.spacing = 2.5 : this.spacing = 1.5;
  sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;

  let type_de_questions_disponibles;

  this.nouvelle_version = function () {
    if (this.beta) {
      type_de_questions_disponibles = [0, 1];
    } else {
      //type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);      			
      type_de_questions_disponibles = [0, 1];
    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    //let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
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
          symbole: `$${mise_en_evidence('<')}$`,
          n1: Number(c1.toString() + c2.toString() + c3.toString() + c4.toString() + c5.toString()),
          n2: Number(c1.toString() + c3.toString() + c2.toString() + c4.toString() + c5.toString()),
          n3: Number(c1.toString() + c2.toString() + c5.toString() + c4.toString() + c3.toString()),
          n4: Number(c1.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
          n5: Number('1'.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
          n6: Number(c1.toString() + c2.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
        },
        {//case 1 -->
          ordre: 'décroissant',
          symbole: `$${mise_en_evidence('>')}$`,
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
        $${tex_nombre(nombres[0])}$   ;   $${tex_nombre(nombres[1])}$   ;   $${tex_nombre(nombres[2])}$   ;   $${tex_nombre(nombres[3])}$   ;   $${tex_nombre(nombres[4])}$   ;   $${tex_nombre(nombres[5])}$          
        `,
          question: ``,
          correction: `Les nombres rangés dans l'ordre ${texte_en_couleur_et_gras(situations[k].ordre)} :<br>
        $${tex_nombre(nombres_ranges[0])}$   ${situations[k].symbole}   $${tex_nombre(nombres_ranges[1])}$   ${situations[k].symbole}   $${tex_nombre(nombres_ranges[2])}$   ${situations[k].symbole}   $${tex_nombre(nombres_ranges[3])}$   ${situations[k].symbole}   $${tex_nombre(nombres_ranges[4])}$   ${situations[k].symbole}   $${tex_nombre(nombres_ranges[5])}$
        `
        });
      };

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
      };

      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  }
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
};


