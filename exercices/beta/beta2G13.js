import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_parenthese_si_negatif} from "/modules/outils.js"
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


                    xA = randint(0, 5) * choice([-1, 1]);
                    yA = randint(0, 5) * choice([-1, 1]);
                    ux = randint(1, 5) * choice([-1, 1]);
                    uy = randint(1, 5) * choice([-1, 1]);
                    xB = xA + ux;

                    yB = yA + uy;


                    texte = `Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne les points suivants :`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`;
                    texte += `<br>Déterminer les coordonnées du vecteur $\\overrightarrow{AB}$ `;



                    texte_corr = `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère,`;
                    texte_corr += ` <br>alors on a : $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>`;
                    texte_corr += ` <br>On applique ici aux données de l'énoncé :`;
                    texte_corr += ` $\\overrightarrow{AB}\\begin{pmatrix}${xB}-${ecriture_parenthese_si_negatif(xA)}  \\\\${yB}-${ecriture_parenthese_si_negatif(yA)}\\end{pmatrix}$<br>`;
                    texte_corr += `Ce qui donne au final : $\\overrightarrow{AB}\\begin{pmatrix}${xB - xA}  \\\\${yB - yA}\\end{pmatrix}$<br>`;
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
