import { choice, combinaison_listes, liste_de_question_to_contenu, randint, tex_nombre } from "/modules/outils.js";
import Exercice from '../ClasseExercice.js';


/**
 * Conversions de durées.
 * * 1 : H vers min ou H ou min ou Hmin vers s
 * * 2 : h vers j-h
 * * 3 : s vers HMS
 * * 4 : h vers semaines j h
 * * 5 : toutes les conversions
 * @Auteur Rémi Angot
 * Référence 6D10
 */
export default function Conversions_de_durees() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.sup = 5;
    this.titre = "Convertir des durées";
    this.consigne = "Compléter les égalités suivantes";
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing = 2;
    this.nb_questions = 5;
  
    this.nouvelle_version = function (numero_de_l_exercice) {
      this.liste_questions = []; // Liste de questions
      this.liste_corrections = []; // Liste de questions corrigées
  
      let liste_sous_type_de_questionv1 = combinaison_listes (
        [1, 2, 3, 4],
        this.nb_questions
      );
      let liste_sous_type_de_questionv2 = combinaison_listes(
        [0, 1, 2],
        this.nb_questions
      );
      let type_de_questions = [];
      if (this.sup < 5) {
        type_de_questions = combinaison_listes([this.sup], this.nb_questions);
      }
      if (this.sup == 5) {
        type_de_questions = combinaison_listes([1, 2, 3, 4], this.nb_questions);
      }
  
      for (
        let i = 0, h, m, s, j, texte, texte_corr, cpt = 0;
        i < this.nb_questions && cpt < 50;
  
      ) {
        if (type_de_questions[i] == 1) {
          let sous_type_de_question = liste_sous_type_de_questionv1[i];
          if (sous_type_de_question == 1) {
            h = randint(2, 11);
            texte = `$${h}~\\text{h en minute}$`;
            texte_corr = `$${h}~\\text{h} = ${h}\\times60~~\\text{min} = ${tex_nombre(
              h * 60
            )}~\\text{min}$`;
          }
          if (sous_type_de_question == 2) {
            h = choice([1, 2, 10, 20]);
            texte = `$${h}~\\text{h en secondes}$`;
            texte_corr = `$${h}~\\text{h} = ${h}\\times3~600~\\text{s} = ${tex_nombre(
              h * 3600
            )}~\\text{s}$`;
          }
          if (sous_type_de_question == 3) {
            m = randint(2, 59);
            texte = `$${m}~\\text{min en secondes}$`;
            texte_corr = `$${m}~\\text{min} = ${m}\\times60~\\text{s} = ${tex_nombre(
              m * 60
            )}~\\text{s}$`;
          }
          if (sous_type_de_question == 4) {
            h = randint(1, 2);
            m = randint(2, 59);
            texte = `$${h}~\\text{h}~${m}~\\text{min en secondes}$`;
            texte_corr = `$${h}~\\text{h}~${m}~\\text{min} = ${h}\\times3~600~\\text{s} + ${m}\\times60~\\text{s} = ${tex_nombre(
              h * 3600
            )}+${tex_nombre(m * 60)}~\\text{s} = ${tex_nombre(
              h * 3600 + m * 60
            )}~\\text{s}$`;
          }
        }
        if (type_de_questions[i] == 2) {
          j = randint(1, 6);
          h = randint(1, 23);
          texte = `$${tex_nombre(h + 24 * j)}~\\text{h en jours et heures}$`;
          texte_corr = `$${tex_nombre(
            h + 24 * j
          )}~\\text{h} = ${j}\\times24~\\text{h} + ${h}~\\text{h} = ${j}~\\text{j}~${h}~\\text{h}$`;
        }
  
        if (type_de_questions[i] == 3) {
          h = liste_sous_type_de_questionv2[i];
          m = randint(1, 59);
          s = randint(1, 59);
          if (h > 0) {
            texte = `$${tex_nombre(
              h * 3600 + m * 60 + s
            )}~\\text{s au format HMS}$`;
            texte_corr = `$${tex_nombre(
              h * 3600 + m * 60 + s
            )}~\\text{s} = ${tex_nombre(h * 3600)}~\\text{s}+${
              m * 60 + s
            }~\\text{s} =${h}~\\text{h}+${m}\\times60~\\text{s}+${s}~\\text{s}=${h}~\\text{h}~${m}~\\text{min}~${s}~\\text{s}$`;
          } else {
            texte = `$${tex_nombre(m * 60 + s)}~\\text{s au format HMS}$`;
            texte_corr = `$${tex_nombre(
              m * 60 + s
            )}~\\text{s} = ${m}\\times60~\\text{s}+${s}~\\text{s}=${m}~\\text{min}~${s}~\\text{s}$`;
          }
        }
        if (type_de_questions[i] == 4) {
          s = randint(1, 9); // nombre de semaines
          j = randint(1, 6);
          h = randint(1, 23);
          texte = `$${tex_nombre(
            h + 24 * j + 24 * 7 * s
          )}~\\text{h en semaines jours et heures}$`;
          if (s > 1) {
            // pour la gestion du pluriel de semaines
            texte_corr = `$${tex_nombre(h + 24 * j + 24 * 7 * s)}~\\text{h} = ${
              j + 7 * s
            }\\times24~\\text{h} + ${h}~\\text{h} = ${
              j + 7 * s
            }~\\text{j}~${h}~\\text{h} = ${s}\\times7~\\text{j} + ${j}~\\text{j}~${h}~\\text{h} = ${s}~\\text{semaines}~${j}~\\text{j}~${h}~\\text{h}$`;
          } else {
            texte_corr = `$${tex_nombre(h + 24 * j + 24 * 7 * s)}~\\text{h} = ${
              j + 7 * s
            }\\times24~\\text{h} + ${h}~\\text{h} = ${
              j + 7 * s
            }~\\text{j}~${h}~\\text{h} = ${s}\\times7~\\text{j} + ${j}~\\text{j}~${h}~\\text{h} = ${s}~\\text{semaine}~${j}~\\text{j}~${h}~\\text{h}$`;
          }
        }
        if (this.liste_questions.indexOf(texte) == -1) {
          // Si la question n'a jamais été posée, on en crée une autre
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
      5,
      "1 : Conversions en s ou min\n2 : Conversions en jours-heures \n3 : Conversions en HMS\n4 : Conversions en semaines-jours-heures \n5 : Tous types de conversions",
    ];
  }