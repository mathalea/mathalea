import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint} from "/modules/outils.js"
/**
 * Déterminer la racine carrée d'un carré parfait compris entre 4 et 256
 * @auteur Stéphane Guyon
 * 4G20-2
 */
export default function Racine_caree_de_carres_parfaits() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Racine carré d'un carré parfait (calcul mental)";
  this.consigne = "Calculer de tête les racines suivantes.";
  this.nb_questions = 4;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    
    for (
      let i = 0, texte, texte_corr,a,c, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      a = randint(2, 16);
      c = a * a;
      texte = `$\\sqrt{${c}}=$`;
      texte_corr = `$\\sqrt{${c}}=${a}$`;

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
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

