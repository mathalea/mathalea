import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,calcul,tex_nombrec,tex_nombre} from "/modules/outils.js"
import Operation  from '/modules/operations.js'
/**
 * Multiplication de deux nombres décimaux
 *
 * * xxx * xx,x chiffres inférieurs à 5
 * * xx,x * x,x
 * * x,xx * x0x
 * * 0,xx * x,x
 * @Auteur Rémi Angot
 * Référence 6C30
 */
export default function Multiplier_decimaux() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Multiplications posées de nombres décimaux";
  this.consigne = "Poser et effectuer les calculs suivants.";
  this.spacing = 2;
  this.spacing_corr = 1; //Important sinon le calcul posé ne fonctionne pas avec opmul et spacing
  this.nb_questions = 4;
  this.liste_packages = "xlop";

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = [1, 2, 3, 4];
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
let type_de_questions
    for (
      let i = 0, texte, texte_corr, cpt = 0, a, b;
      i < this.nb_questions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      switch (type_de_questions) {
        case 1: // xxx * xx,x chiffres inférieurs à 5
          a = randint(2, 5) * 100 + randint(2, 5) * 10 + randint(2, 5);
          b = calcul(randint(2, 5) * 10 + randint(2, 5) + randint(2, 5) / 10);
          break;
        case 2: // xx,x * x,x
          a = calcul(randint(2, 9) * 10 + randint(2, 9) + randint(2, 9) / 10);
          b = calcul(randint(6, 9) + randint(6, 9) / 10);
          break;
        case 3: // x,xx * x0x
          a = calcul(randint(2, 9) + randint(2, 9) / 10 + randint(2, 9) / 100);
          b = calcul(randint(2, 9) * 100 + randint(2, 9));
          break;
        case 4: // 0,xx * x,x
          a = calcul(randint(2, 9) / 10 + randint(2, 9) / 100);
          b = calcul(randint(2, 9) + randint(2, 9) / 10);
          break;
      }

      texte = `$${tex_nombre(a)}\\times${tex_nombre(b)}$`;
      texte_corr = Operation({operande1:a,operande2:b,type:'multiplication'})

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
}

