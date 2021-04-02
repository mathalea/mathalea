import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,tex_nombre} from "/modules/outils.js"
import Operation from '/modules/operations.js';
/**
 * Poser et effectuer les divisions euclidiennes suivantes puis donner l'égalité fondamentale correspondante.
 *
 * Niveau de difficulté 1 :
 * * division par 2, 3 , 4 ou 5
 * * division par 6 à 9
 * * un 0 dans le quotient
 *
 * Niveau de difficulté 2 :
 * * division par 11, 12, 15, 25
 * * division par 13,14,21,22,23 ou 24 et un 0 dans le quotient
 * * division par un multiple de 10 et un 0 dans le quotient
 * @Auteur Rémi Angot
 * Référence 6C11
 */
export default function Divisions_euclidiennes() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Divisions euclidiennes";
  this.consigne =
    "Poser et effectuer les divisions euclidiennes suivantes puis donner l'égalité fondamentale correspondante.";
  this.spacing = 2;
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1); //Important sinon opidiv n'est pas joli
  this.nb_questions = 4;
  this.sup = 1;
  this.liste_packages = "xlop";

  this.nouvelle_version = function () {
   if (this.sup<2) {
     this.QCM=['6C11',[],'division euclidienne',3,{}]
   }
   else {
      this.QCM=['6C21',[],'division euclidienne niveau 2',3,{}]
   }
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles,type_de_questions
    if (this.sup == 0) type_de_questions_disponibles = [1, 1, 1, 1]
    else if (this.sup == 1) type_de_questions_disponibles = [1, 2, 2, 3]
    else if (this.sup == 2) type_de_questions_disponibles = [4, 4, 5, 6];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (
      let i = 0, texte, texte_corr, cpt = 0, a, b, q, r;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      switch (type_de_questions) {
        case 1: // division par 2, 3 , 4 ou 5
          q = randint(2, 5) * 100 + randint(2, 5) * 10 + randint(2, 5);
          b = randint(2, 5);
          break;
        case 2: // division par 6 à 9
          q = randint(5, 9) * 100 + randint(2, 5) * 10 + randint(5, 9);
          b = randint(6, 9);
          break;
        case 3: // un 0 dans le quotient
          if (randint(1, 2) == 1) {
            q = randint(2, 9) * 1000 + randint(2, 9) * 100 + randint(2, 9);
          } else {
            q = randint(2, 9) * 1000 + randint(2, 9) * 10 + randint(2, 9);
          }
          b = randint(7, 9);
          break;
        case 4: // division par 11, 12, 15, 25
          q = randint(1, 5) * 100 + randint(1, 5) * 10 + randint(1, 5);
          b = choice([11, 12, 15, 25]);
          break;
        case 5: // division par 13,14,21,22,23 ou 24 et un 0 dans le quotient
          q = randint(1, 5) * 1000 + randint(6, 9) * 100 + randint(1, 5);
          b = choice([11, 12, 13, 14, 21, 22, 23, 24]);
          break;
        case 6: // division par un multiple de 10 et un 0 dans le quotient
          q = randint(6, 9) * 1000 + randint(6, 9) * 10 + randint(1, 5);
          b = randint(2, 9) * 10;
          break;
      }
      r = randint(0, b - 1); //reste inférieur au diviseur
      a = b * q + r;
      texte = `$${tex_nombre(a)}\\div${b}$`;
      if (r == 0) {
        texte_corr = `${Operation({operande1:a,operande2:b,type:'divisionE'})}$${tex_nombre(a)}\\div${b}=${q}$`;
      } else {
        texte_corr = `${Operation({operande1:a,operande2:b,type:'divisionE'})}$${tex_nombre(a)}=${b}\\times${q}+${r}$`;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        /***************** AMC Open ************************/
        this.QCM[1].push([texte,[texte_corr],[4]])    // [question,[reponse],[nb_lignes_cadre]]
        /*********************************************/
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = [
    "Niveau de difficulté",
    2,
    "1 : Diviseur inférieur à 10\n2: Diviseur à 2 chiffres",
  ];
}

