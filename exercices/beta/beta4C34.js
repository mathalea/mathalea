import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,enleve_element,choice,range1,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif,mise_en_evidence,liste_des_diviseurs} from "/modules/outils.js"
/**
 * Plusieurs type de calcul avec priorités opératoires/ relatifs/ puissances
 *
 * Sans parenthèses :
 * * a²+b*c
 * * a+b²*c
 * * a²*b+c
 * * a*b²+c
 * * a²+b+c
 * * a+b²+c
 * * a+b+c²
 * * a²+b+c*d
 * * a+b²+c*d
 * * a+b+c²*d
 * * a+b+c*d²
 * * a²*b+c*d
 * * a*b+c*d²
 *
 * Avec parenthèses :
 * * a²*(b+c)
 * * a*(b²+c)
 * * a*(b+c²)
 * * (a²+b)*c
 * * (a+b²)*c
 * * (a+b)*c²
 * * a²*(b+c)*d
 * * a*(b²+c)*d
 * * a*(b+c²)*d
 * * a*(b+c)*d²
 * * a²*b*(c+d)
 * * a*b²*(c+d)
 * * a*b*(c²+d)
 * * a*b*(c+d²)
 * * a²*(b+c*d)
 * * a*(b²+c*d)
 * * a*(b+c²*d)
 * * a*(b+c*d²)
 * * a²+(b+c)
 * * a+(b²+c)
 * * a+(b+c²)
 * * (a²+b+c)*d
 * * (a+b²+c)*d
 * * (a+b+c²)*d
 * * (a+b+c)*d²
 * @Auteur Mireille Gain, 23 janvier 2021
 * 4C34
 */
export default function Priorites_et_relatifs_et_puissances() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Calculs utilisant les priorités opératoires et les puissances";
  this.consigne = "Calculer";
  this.nb_questions = 5;
  this.nb_cols = 2;
  this.nb_cols_corr = 1;
  this.sup = 1;  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_questions_disponibles
    if (this.sup == 1) {
      liste_questions_disponibles = 1;
    } else {
      liste_questions_disponibles = range1(38);
    }
    let liste_type_de_questions = combinaison_listes(
      liste_questions_disponibles,
      this.nb_questions
    );
    for (
      let i = 0, texte, texte_corr, a, b, c, d, cpt = 0;
      i < this.nb_questions && cpt < 50;)      a = randint(1, 7) * choice([-1, 1]);
      b = randint(1, 7) * choice([-1, 1]);
      c = randint(1, 7) * choice([-1, 1]);
      d = randint(1, 7) * choice([-1, 1]);    {
      switch (liste_type_de_questions[i]) {
        case 1: //a²+b*c
          texte = `$(${ecriture_si_parenthese_si_negatif(a)}^2${ecriture_parenthese_si_negatif(b)}\\times${ecriture_parenthese_si_negatif(c)}$}$`;
          texte_corr = `$${a*a}${ecriture_parenthese_si_negatif(b) + "\\times" + ecriture_parenthese_si_negatif(c)}=${a*a}${ecriture_algebrique(b*c)}
          =${a*a + b * c}$`;
          break;
      }      if (this.liste_questions.indexOf(texte) == -1) {
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
    "Type de calculs",
    3,
    "1 : Sans opérations entre parenthèses\n2: Avec ou sans opérations entre parenthèses",
  ];
}
// python list-to-js.py pour faire apparaitre l'exercice dans le menu