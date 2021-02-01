import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,calcul} from "/modules/outils.js"
/**
* Effectuer une division entre 2 nombres relatifs écrite sous la forme d'une fraction.
*
* * On peut choisir de n'avoir que des tables de multiplications, par défaut il y a aussi des divisions simples par 2, 3 ou 4
* @Auteur Rémi Angot
* 4C10-4
*/
export default function Exercice_quotients_relatifs() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = false;
  this.titre = "Quotient de deux entiers relatifs";
  this.consigne = 'Calculer'
  this.spacing = 2;
  this.nb_questions = 6;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions = combinaison_listes(['-+', '+-', '--', '++'], this.nb_questions);
    let liste_type_de_nombres = combinaison_listes(['tables', 'horstables'], this.nb_questions);
    if (this.sup) {
      liste_type_de_nombres = combinaison_listes(['tables'], this.nb_questions);
    }
    for (let i = 0, a, b, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      if (liste_type_de_nombres[i] == 'tables') {
        b = randint(2, 9);
        a = b * randint(2, 9);
      } else {
        b = choice([11, 12, 13, 14, 15, 16, 20, 60, 80]);
        a = b * randint(2, 4)
      }
      switch (liste_type_de_questions[i]) {
        case '-+':
          a *= -1;
          break;
        case '+-':
          b *= -1;
          break;
        case '--':
          a *= -1;
          b *= -1;
        default:
          break;
      }
      texte = `$\\dfrac{${a}}{${b}}$`
      texte_corr = `$\\dfrac{${a}}{${b}}=${calcul(a / b)}$`

      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  }
  this.besoin_formulaire_case_a_cocher = ['Utiliser seulement les tables de multiplications de 2 à 9'];
}

