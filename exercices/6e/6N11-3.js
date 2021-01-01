import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,shuffle,combinaison_listes_sans_changer_ordre,tex_nombre,mise_en_evidence} from "/modules/outils.js"
/** 
* * Encadrer un nombre entier par deux entier consécutifs
* * 6N11-3
* @author Sébastien Lozano
*/

export default function Encadrer_un_entier_par_deux_entiers_consecutifs() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.beta = false;
  this.sup = 1;
  if (this.beta) {
    this.nb_questions = 6;
  } else {
    this.nb_questions = 3;
  };

  this.titre = "Encadrer un entier entre deux entiers consécutifs";
  this.consigne = ``;

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  sortie_html ? this.spacing = 2.5 : this.spacing = 1.5;
  sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;

  let type_de_questions_disponibles;

  this.nouvelle_version = function () {
    if (this.beta) {
      type_de_questions_disponibles = [0, 1, 2, 3, 4, 5];
    } else {
      type_de_questions_disponibles = shuffle([choice([0, 1]), choice([2, 3]), choice([4, 5])]);
    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    //let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      //pour la précision d'encadrement
      let precision;

      //selon la precision on veut certains chiffres plus souvant que d'autres ...
      function myNombres(nb_chiffres) {
        let sortie = '';
        // on fabrique le nombre à partir de ses chiffres et on veut des cas limites
        let u, d, c, mu, md, mc, mmu, mmd, mmc;
        let N = choice([[randint(0, 9, [0]), 0, 0, 0, 0, 0, 0, 0, 0], [randint(0, 9, [0]), 9, 9, 9, 9, 9, 9, 9, 9], [randint(0, 9, [0]), randint(0, 9), randint(0, 9), randint(0, 9), randint(0, 9), randint(0, 9), randint(0, 9), randint(0, 9), randint(0, 9)]]);
        mmc = N[0];
        mmd = N[1];
        mmu = N[2];
        mc = N[3];
        md = N[4];
        mu = N[5];
        c = N[6];
        d = N[7];
        u = N[8];
        switch (nb_chiffres) {
          case 4:
            mu = randint(0, 9, [0]);
            sortie = mu.toString() + c.toString() + d.toString() + u.toString();
            break;
          case 5:
            md = randint(0, 9, [0]);
            sortie = md.toString() + mu.toString() + c.toString() + d.toString() + u.toString();
            break;
          case 6:
            mc = randint(0, 9, [0]);
            sortie = mc.toString() + md.toString() + mu.toString() + c.toString() + d.toString() + u.toString();
            break;
          case 7:
            mmu = randint(0, 9, [0]);
            sortie = mmu.toString() + mc.toString() + md.toString() + mu.toString() + c.toString() + d.toString() + u.toString();
            break;
          case 8:
            mmd = randint(0, 9, [0]);
            sortie = mmd.toString() + mmu.toString() + mc.toString() + md.toString() + mu.toString() + c.toString() + d.toString() + u.toString();
            break;
          case 9:
            mmc = randint(0, 9, [0]);
            sortie = mmc.toString() + mmd.toString() + mmu.toString() + mc.toString() + md.toString() + mu.toString() + c.toString() + d.toString() + u.toString();
            break;

        };
        return sortie;
      };

      this.sup = Number(this.sup); // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !
      switch (this.sup) {
        case 1:
          this.consigne = `Compléter avec le nombre entier qui précède et le nombre entier qui suit.`;
          precision = 1;
          break;
        case 2:
          this.consigne = `Compléter avec le multiple de 10 qui précède et le multiple de 10 qui suit.`;
          precision = 10;
          break;
        case 3:
          this.consigne = `Compléter avec le multiple de 100 qui précède et le multiple de 100 qui suit.`;
          precision = 100;
          break;
      };

      // pour les situations, autant de situations que de cas dans le switch !
      let situations = [
        {//case 0 -->
          nombre: Number(myNombres(4)),
        },
        {//case 1 -->
          nombre: Number(myNombres(5)),
        },
        {//case 2 -->
          nombre: Number(myNombres(6)),
        },
        {//case 3 -->
          nombre: Number(myNombres(7)),
        },
        {//case 4 -->
          nombre: Number(myNombres(8)),
        },
        {//case 5 -->
          nombre: Number(myNombres(9)),
        },
      ];

      // une fonction pour les correction à la precision près
      function encadrement_corr(nb, precision) {
        if (precision == 1) {
          return `$${mise_en_evidence(tex_nombre(Math.trunc(nb / precision) * precision - precision))} < ${tex_nombre(nb)} < ${mise_en_evidence(tex_nombre(Math.trunc(nb / precision) * precision + precision))}$`;
        } else if (precision == 10 || precision == 100) {
          if (nb % precision == 0) {
            return `$${mise_en_evidence(tex_nombre(Math.trunc(nb / precision) * precision - precision))} < ${tex_nombre(nb)} < ${mise_en_evidence(tex_nombre(Math.trunc(nb / precision) * precision + precision))}$`;
          } else {
            return `$${mise_en_evidence(tex_nombre(Math.trunc(nb / precision) * precision))} < ${tex_nombre(nb)} < ${mise_en_evidence(tex_nombre(Math.trunc(nb / precision) * precision + precision))}$`;
          };
        };
      };

      let enonces = [];
      for (let k = 0; k < situations.length; k++) {
        enonces.push({
          enonce: `
          $\\ldots < ${tex_nombre(situations[k].nombre)} < \\ldots$		
          `,
          question: ``,
          correction: `
          ${encadrement_corr(situations[k].nombre, precision)}
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
        case 3:
          texte = `${enonces[3].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`;
            texte += `             `
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[3].correction}`;
          };
          break;
        case 4:
          texte = `${enonces[4].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[4].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[4].correction}`;
          };
          break;
        case 5:
          texte = `${enonces[5].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[5].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[5].correction}`;
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
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, "1 : Encadrer entre deux entiers consécutifs\n2 : Encadrer entre deux multiples consécutifs de dix\n3 : Encadrer entre deux multiples consécutifs de cent"];
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	

};

