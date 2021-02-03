import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice, combinaison_listes,ecriture_parenthese_si_negatif} from "/modules/outils.js"
/**
 * @Auteur Stéphane Guyon
 */
export default function calculer_coordonnees_vecteurs() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer les coordonnées d'un vecteur.";

    this.nb_questions = 2;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; // 
    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1];
        let type_de_questions

        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, ux, uy, xA, yA, xB, yB, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:


                 
                    break;
                case 2:



                    break;


            }
            if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    };
}
