import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,calcul,tex_nombre} from "/modules/outils.js"
/**
 * Encadrer par des puissances de 10
 * 4C30-1
 * @author Sébastien Lozano
 */
export default function Puissances_encadrement() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 4;
  this.nb_questions = 6;
  this.titre = `Encadrer avec des puissances de 10`;

  this.consigne = `Encadrer les nombres suivants par deux puissances de 10 d'exposants consécutifs.`;

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;

  let type_de_questions_disponibles;

  this.nouvelle_version = function () {
    this.sup = Number(this.sup); // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !

    switch (this.sup) {
      case 1: // nombre enier positif
        type_de_questions_disponibles = [1, 2, 3, 4, 5, 6];
        //this.nb_questions = type_de_questions_disponibles.length;
        //this.nb_questions = 3;
        break;
      case 2: // nombre décimal positif
        type_de_questions_disponibles = [7, 8, 9, 10];
        //this.nb_questions = type_de_questions_disponibles.length;
        //this.nb_questions = 3;
        break;
      case 3: // nombre décimal positif inférieur à 1
        type_de_questions_disponibles = [11, 12, 13, 14];
        //this.nb_questions = type_de_questions_disponibles.length;
        //this.nb_questions = 3;
        break;
      case 4: // Mélange
        type_de_questions_disponibles = [
          choice([1, 2, 3]),
          choice([4, 5, 6]),
          choice([7, 8]),
          choice([9, 10]),
          choice([11, 12]),
          choice([13, 14]),
        ];
        //this.nb_questions = type_de_questions_disponibles.length;
        break;
    }

    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    // let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      // nombre entier positif, entre 1 et 10, puis 10 et 100 puis ....100 000 et 1 000 000
      let ent_pos = [];
      for (let i = 0; i < 6; i++) {
        ent_pos.push({
          val: `$${tex_nombre(calcul(randint(10 ** i + 1, 10 ** (i + 1))))}$`,
          puissance_inf: `$10^{${i}}$`,
          puissance_sup: `$10^{${i + 1}}$`,
          puissance_inf_num: `$${tex_nombre(calcul(10 ** i))}$`,
          puissance_sup_num: `$${tex_nombre(calcul(10 ** (i + 1)))}$`,
        });
      }

      // nombre décimal positif 1 et 10 000 avec 1,2,3 puis 4 décimales
      let dec_pos = [];
      for (let i = 0; i < 4; i++) {
        dec_pos.push({
          val: `$${tex_nombre(calcul(randint(10000, 100000) / 10 ** (4 - i)))}$`,
          puissance_inf: `$10^{${i}}$`,
          puissance_sup: `$10^{${i + 1}}$`,
          puissance_inf_num: `$${tex_nombre(calcul(10 ** i))}$`,
          puissance_sup_num: `$${tex_nombre(calcul(10 ** (i + 1)))}$`,
        });
      }
      // nombre décimal positif inférieur à 1, entre 0,1 et 1 puis entre 0,01 et 0,1 puis 0,001 et 0,0001
      let dec_pos_inf_un = [];
      for (let i = 0; i < 4; i++) {
        dec_pos_inf_un.push({
          val: `$${tex_nombre(calcul(randint(10 ** (4 - i - 1) + 1, 10 ** (4 - i)) / 10000))}$`,
          puissance_inf: `$10^{${-(i + 1)}}$`,
          puissance_sup: `$10^{${-i}}$`,
          puissance_inf_num: `$${tex_nombre(calcul(10 ** -(i + 1)))}$`,
          puissance_sup_num: `$${tex_nombre(calcul(10 ** -i))}$`,
        });
      }

      switch (liste_type_de_questions[i]) {
        case 1: // nombre enier positif
          texte = `${ent_pos[0].val}`;
          texte_corr = `${ent_pos[0].puissance_inf} $\\leqslant$ ${ent_pos[0].val} $\\leqslant$ ${ent_pos[0].puissance_sup}`;
          texte_corr += ` car ${ent_pos[0].puissance_inf} = ${ent_pos[0].puissance_inf_num} et ${ent_pos[0].puissance_sup} = ${ent_pos[0].puissance_sup_num}`;
          break;
        case 2: // nombre enier positif
          texte = `${ent_pos[1].val}`;
          texte_corr = `${ent_pos[1].puissance_inf} $\\leqslant$ ${ent_pos[1].val} $\\leqslant$ ${ent_pos[1].puissance_sup}`;
          texte_corr += ` car ${ent_pos[1].puissance_inf} = ${ent_pos[1].puissance_inf_num} et ${ent_pos[1].puissance_sup} = ${ent_pos[1].puissance_sup_num}`;
          break;
        case 3: // nombre enier positif
          texte = `${ent_pos[2].val}`;
          texte_corr = `${ent_pos[2].puissance_inf} $\\leqslant$ ${ent_pos[2].val} $\\leqslant$ ${ent_pos[2].puissance_sup}`;
          texte_corr += ` car ${ent_pos[2].puissance_inf} = ${ent_pos[2].puissance_inf_num} et ${ent_pos[2].puissance_sup} = ${ent_pos[2].puissance_sup_num}`;
          break;
        case 4: // nombre enier positif
          texte = `${ent_pos[3].val}`;
          texte_corr = `${ent_pos[3].puissance_inf} $\\leqslant$ ${ent_pos[3].val} $\\leqslant$ ${ent_pos[3].puissance_sup}`;
          texte_corr += ` car ${ent_pos[3].puissance_inf} = ${ent_pos[3].puissance_inf_num} et ${ent_pos[3].puissance_sup} = ${ent_pos[3].puissance_sup_num}`;
          break;
        case 5: // nombre enier positif
          texte = `${ent_pos[4].val}`;
          texte_corr = `${ent_pos[4].puissance_inf} $\\leqslant$ ${ent_pos[4].val} $\\leqslant$ ${ent_pos[4].puissance_sup}`;
          texte_corr += ` car ${ent_pos[4].puissance_inf} = ${ent_pos[4].puissance_inf_num} et ${ent_pos[4].puissance_sup} = ${ent_pos[4].puissance_sup_num}`;
          break;
        case 6: // nombre enier positif
          texte = `${ent_pos[5].val}`;
          texte_corr = `${ent_pos[5].puissance_inf} $\\leqslant$ ${ent_pos[5].val} $\\leqslant$ ${ent_pos[5].puissance_sup}`;
          texte_corr += ` car ${ent_pos[5].puissance_inf} = ${ent_pos[5].puissance_inf_num} et ${ent_pos[5].puissance_sup} = ${ent_pos[5].puissance_sup_num}`;
          break;
        case 7: // nombre décimal positif
          texte = `${dec_pos[0].val}`;
          texte_corr = `${dec_pos[0].puissance_inf} $\\leqslant$ ${dec_pos[0].val} $\\leqslant$ ${dec_pos[0].puissance_sup}`;
          texte_corr += ` car ${dec_pos[0].puissance_inf} = ${dec_pos[0].puissance_inf_num} et ${dec_pos[0].puissance_sup} = ${dec_pos[0].puissance_sup_num}`;
          break;
        case 8: // nombre décimal positif
          texte = `${dec_pos[1].val}`;
          texte_corr = `${dec_pos[1].puissance_inf} $\\leqslant$ ${dec_pos[1].val} $\\leqslant$ ${dec_pos[1].puissance_sup}`;
          texte_corr += ` car ${dec_pos[1].puissance_inf} = ${dec_pos[1].puissance_inf_num} et ${dec_pos[1].puissance_sup} = ${dec_pos[1].puissance_sup_num}`;
          break;
        case 9: // nombre décimal positif
          texte = `${dec_pos[2].val}`;
          texte_corr = `${dec_pos[2].puissance_inf} $\\leqslant$ ${dec_pos[2].val} $\\leqslant$ ${dec_pos[2].puissance_sup}`;
          texte_corr += ` car ${dec_pos[2].puissance_inf} = ${dec_pos[2].puissance_inf_num} et ${dec_pos[2].puissance_sup} = ${dec_pos[2].puissance_sup_num}`;
          break;
        case 10: // nombre décimal positif
          texte = `${dec_pos[3].val}`;
          texte_corr = `${dec_pos[3].puissance_inf} $\\leqslant$ ${dec_pos[3].val} $\\leqslant$ ${dec_pos[3].puissance_sup}`;
          texte_corr += ` car ${dec_pos[3].puissance_inf} = ${dec_pos[3].puissance_inf_num} et ${dec_pos[3].puissance_sup} = ${dec_pos[3].puissance_sup_num}`;
          break;
        case 11: // nombre décimal positif inferieur à 1
          texte = `${dec_pos_inf_un[0].val}`;
          texte_corr = `${dec_pos_inf_un[0].puissance_inf} $\\leqslant$ ${dec_pos_inf_un[0].val} $\\leqslant$ ${dec_pos_inf_un[0].puissance_sup}`;
          texte_corr += ` car ${dec_pos_inf_un[0].puissance_inf} = ${dec_pos_inf_un[0].puissance_inf_num} et ${dec_pos_inf_un[0].puissance_sup} = ${dec_pos_inf_un[0].puissance_sup_num}`;
          break;
        case 12: // nombre décimal positif inferieur à 1
          texte = `${dec_pos_inf_un[1].val}`;
          texte_corr = `${dec_pos_inf_un[1].puissance_inf} $\\leqslant$ ${dec_pos_inf_un[1].val} $\\leqslant$ ${dec_pos_inf_un[1].puissance_sup}`;
          texte_corr += ` car ${dec_pos_inf_un[1].puissance_inf} = ${dec_pos_inf_un[1].puissance_inf_num} et ${dec_pos_inf_un[1].puissance_sup} = ${dec_pos_inf_un[1].puissance_sup_num}`;
          break;
        case 13: // nombre décimal positif inferieur à 1
          texte = `${dec_pos_inf_un[2].val}`;
          texte_corr = `${dec_pos_inf_un[2].puissance_inf} $\\leqslant$ ${dec_pos_inf_un[2].val} $\\leqslant$ ${dec_pos_inf_un[2].puissance_sup}`;
          texte_corr += ` car ${dec_pos_inf_un[2].puissance_inf} = ${dec_pos_inf_un[2].puissance_inf_num} et ${dec_pos_inf_un[2].puissance_sup} = ${dec_pos_inf_un[2].puissance_sup_num}`;
          break;
        case 14: // nombre décimal positif inferieur à 1
          texte = `${dec_pos_inf_un[3].val}`;
          texte_corr = `${dec_pos_inf_un[3].puissance_inf} $\\leqslant$ ${dec_pos_inf_un[3].val} $\\leqslant$ ${dec_pos_inf_un[3].puissance_sup}`;
          texte_corr += ` car ${dec_pos_inf_un[3].puissance_inf} = ${dec_pos_inf_un[3].puissance_inf_num} et ${dec_pos_inf_un[3].puissance_sup} = ${dec_pos_inf_un[3].puissance_sup_num}`;
          break;
      }
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    4,
    "1 : nombre entier positif\n2 : nombre décimal positif\n3 : nombre entier positif inférieur à un\n4 : Mélange",
  ];
}

