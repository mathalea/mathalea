import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,randint,choice,rangeMinMax,ecriturePuissance,num_alpha,texte_en_couleur_et_gras,tex_nombre} from "/modules/outils.js"

/**
 * * Comparer des puissances de 10.
 *
 * Paramétrages possibles :
 * 1 : Puissances de 10 seules
 * 2 : mantisses différentes et même exposant
 * 3 : mêmes mantisses et exposants différents
 * 4 : mantisses et exposants différents
 * 5 : mantisses (négatives) et exposants différents
 * 6 : Tous types
 * Programmes : p130 : "Comparer, ranger, encadrer des nombres rationnels en écriture décimale, fractionnaire ou scientifique
 * @auteur Erwan Duplessy
 * date : 15/11/2020
 * 4C30-4
 */
export default function Comparer_puissance10() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Puissances de 10";
  this.consigne = "Dans chaque cas, comparer les deux nombres. Les deux nombres sont écrits en écriture scientifique.";
  this.nb_questions = 5; // Ici le nombre de questions
  this.nb_questions_modifiable=true // Active le formulaire nombre de questions
  this.correction_detaillee_disponible = true;
  sortie_html ? this.correction_detaillee = true : this.correction_detaillee = false;
  this.spacing = 2;
  this.spacing_corr = 2;
  this.nb_questions = 5;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.sup = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [];       
    type_de_questions_disponibles = [1,2,3,4,5]; 

    for (let i = 0, texte=``, texte_corr=``, cpt = 0; i < this.nb_questions && cpt < 50;) {
      let a1 = 0; // mantisse 1
      let a2 = 0; // mantisse 2
      let n1 = 0; // puissance 1
      let n2 = 0; // puissance 2
      let nbA1 = 0; // valeur numérique du nombre 1
      let nbA2 = 0; // valeur numérique du nombre 2
      this.liste_questions = [] // tableau contenant la liste des questions 
      this.liste_corrections = []
      let type_de_questions_disponibles=[1,2,3,4,5] // tableau à compléter par valeurs possibles des types de questions
      let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
      switch (liste_type_de_questions[i]) {
        case 1:
          a1 = 1;
          n1 = randint(-9, 9);
          a2 = 1;
          n2 = choice(rangeMinMax(-9, 9), [n1]);
          nbA1 = a1 * 10 ** n1;
          nbA2 = a2 * 10 ** n2;
          break;
        case 2:
          a1 = randint(1, 9) + 0.1 * randint(1, 9) * randint(0, 1);
          n1 = randint(-9, 9);
          a2 = choice([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [a1]) + 0.1 * randint(1, 9) * randint(0, 1);
          n2 = n1;
          nbA1 = a1 * 10 ** n1;
          nbA2 = a2 * 10 ** n2;
          break;
        case 3:
          a1 = randint(1, 9) + 0.1 * randint(0, 9) + 0.01 * randint(0, 9);
          n1 = randint(-9, 9);
          a2 = a1;
          n2 = randint(-9, 9);
          break;
        case 4:
          a1 = randint(1, 9) + 0.1 * randint(0, 9);
          n1 = randint(-9, 9);
          a2 = choice(rangeMinMax(1, 99)) / 10;
          n2 = randint(-9, 9);
          break;
        case 5:
          a1 = choice(rangeMinMax(-99, 99, [0])) / 10;
          n1 = randint(-9, 9);
          a2 = choice(rangeMinMax(-99, 99, [0])) / 10;
          n2 = randint(-9, 9);
          break;
        }
      nbA1 = a1 * 10 ** n1;
      nbA2 = a2 * 10 ** n2;
      texte += num_alpha(i) + ` ` + ecriturePuissance(a1, 10, n1) + " et " + ecriturePuissance(a2, 10, n2) + "<br>";
      // début correction détaillée
      texte_corr += num_alpha(i) + ` `;
      if (this.correction_detaillee) {
        if (nbA1==nbA2) {
          texte_corr += `Les deux nombres ont la même écriture, ils sont donc égaux. <br>`;
        } else {
          if (a1*a2==0){
            texte_corr += `L'un des deux nombres est nul. Il suffit de regarder le signe de l'autre. <br>`;
          }
          else {
            if (a1*a2<0) { // a1 et a2 de signes opposés
              texte_corr += `Les deux nombres sont de signes opposés. Le plus petit nombre est donc le nombre négatif. <br>`;
            } else {
              if (a1>0 && a2>0) { // a1 et a2 strictement positifs
                texte_corr += `Les deux nombres sont positifs. On compare les exposants de l'écriture scientifique : `;
                if (n1>n2) {
                  texte_corr += `$${n1} > ${n2}$. <br>`;
                }
                if (n1==n2) {
                  texte_corr += `Les exposants sont égaux. On compare ${tex_nombre(a1)} et ${tex_nombre(a2)} : `;
                  if (a1<a2) {
                    texte_corr += `$${tex_nombre(a1)} < ${tex_nombre(a2)}$. <br>`;
                  } else {
                    texte_corr += `$${tex_nombre(a1)} > ${tex_nombre(a2)}$. <br>`;
                  }
                }
                if (n1<n2) {
                  texte_corr += `$${n1} < ${n2}$.<br>`;
                }  
              }
              if (a1<0 && a2<0) { // a1 et a2 strictement négatifs
                texte_corr += `Les deux nombres sont négatifs. Ils sont rangés dans l'ordre contraire de leur opposé : ${ecriturePuissance(-a1, 10, n1)} et ${ecriturePuissance(-a2, 10, n2)}. <br>`;
                texte_corr += `On compare les exposants de l'écriture scientifique : `; 
                if (n1>n2) {
                  texte_corr += `$${n1} > ${n2}$. Donc ${ecriturePuissance(-a1, 10, n1)} $>$ ${ecriturePuissance(-a2, 10, n2)}. <br>`;
                }
                if (n1==n2) {
                  texte_corr += `les exposants sont égaux. On compare ${tex_nombre(a1)} et ${tex_nombre(a2)} : `;
                  if (a1<a2) {
                    texte_corr += `$${tex_nombre(a1)} < ${tex_nombre(a2)}$. Donc ${ecriturePuissance(-a1, 10, n1)} $<$ ${ecriturePuissance(-a2, 10, n2)}. <br><br>`;
                  } else {
                    texte_corr += `$${tex_nombre(a1)} > ${tex_nombre(a2)}$. Donc ${ecriturePuissance(-a1, 10, n1)} $>$ ${ecriturePuissance(-a2, 10, n2)}. <br><br>`;
                  }
                }
                if (n1<n2) {
                  texte_corr += `$${n1} < ${n2}$. Donc ${ecriturePuissance(-a1, 10, n1)} $<$ ${ecriturePuissance(-a2, 10, n2)}. <br>`;
                }             
              }  
            }
          }

        }
      texte_corr += texte_en_couleur_et_gras(`Conclusion : `);
      } // fin de la correction détaillée
      // correction courte :
      if (nbA1 > nbA2) {
        texte_corr += texte_en_couleur_et_gras(` ${ecriturePuissance(a1, 10, n1)} $>$ ${ecriturePuissance(a2, 10, n2)} <br>`);
       } else {
         if (nbA1 == nbA2) {
          texte_corr += texte_en_couleur_et_gras(` ${ecriturePuissance(a1, 10, n1)} $=$ ${ecriturePuissance(a2, 10, n2)} <br>`);
           } else {
           texte_corr += texte_en_couleur_et_gras(` ${ecriturePuissance(a1, 10, n1)} $<$ ${ecriturePuissance(a2, 10, n2)} <br>`);
         }
     }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
      i++;
    }
    cpt++
  }
  liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
  };
}
