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
export default function Operations_posees() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Opérations posées";
  this.consigne ="";
  this.spacing = 2;
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1); //Important sinon opidiv n'est pas joli
  this.nb_questions = 1;
  this.nb_questions_modifiable=false
  this.sup = 1;
  this.sup2 = "1234,5-789,2"
  this.sup3 = 0;
  this.liste_packages = "xlop";
  this.tailleDiaporama = 100;


  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
      let a=1
      switch (parseInt(this.sup)) {
        case 1: // addition
          q = randint(2, 5) * 100 + randint(2, 5) * 10 + randint(2, 5);
          b = randint(2, 5);
          break;
        case 2: // soustraction
          q = randint(5, 9) * 100 + randint(2, 5) * 10 + randint(5, 9);
          b = randint(6, 9);
          break;
        case 3: // multiplication
          if (randint(1, 2) == 1) {
            q = randint(2, 9) * 1000 + randint(2, 9) * 100 + randint(2, 9);
          } else {
            q = randint(2, 9) * 1000 + randint(2, 9) * 10 + randint(2, 9);
          }
          b = randint(7, 9);
          break;
        case 4: // division
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
        texte_corr = `${Operation({operande1:a,operande2:b,type:'division'})}$${tex_nombre(a)}\\div${b}=${q}$`;
      } else {
        texte_corr = `${Operation({operande1:a,operande2:b,type:'division'})}$${tex_nombre(a)}=${b}\\times${q}+${r}$`;
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
  this.besoin_formulaire_numerique = ["Opération",4,"1 : Addition\n2 : Soustraction\n3 : Multiplication\n4 : Division"];
  this.besoin_formulaire2_texte =["Deux nombres séparés par un tiret(séparateur décimal = virgule"]
  this.besoin_formulaire3_numerique=["Nombre de chiffres après la virgule pour le quotient"] 
}

