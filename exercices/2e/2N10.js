import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes} from "/modules/outils.js"


/**
 * 2N10
 * @Auteur Stéphane Guyon
 */
export default function Existence_d_une_racine_carree() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Existence d'une racine carrée";
    this.consigne = " Dire si le nombre proposé existe ou non, en justifiant.";
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; // 

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8],type_de_questions
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:
                    let a = randint(2, 9);
                    texte = `$\\sqrt{\\sqrt{${a}}}$`;
                    texte_corr = `$\\sqrt{${a}}$ existe car ${a} est un nombre positif.<br>
                    $\\sqrt{${a}}$ est un réel positif donc $\\sqrt{\\sqrt{${a}}}$ existe bien.`;
                    break;
                case 2:
                    let b = randint(2, 9) * (-1);
                    texte = `$\\sqrt{${b}}$`;
                    texte_corr = `$\\sqrt{${b}}$ n'existe pas car $${b}$ est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. `;
                    break;
                case 3:
                    let c = randint(2, 9) * (-1);
                    let d = c * c;
                    texte = `$\\sqrt{\\left(${c}\\right)^{2}}$`;
                    texte_corr = `$\\sqrt{\\left(${c}\\right)^{2}}$ existe pas car $\\left(${c}\\right)^{2}=${d}$ est un nombre positif.`;
                    break;
                case 4:
                    let e = randint(2, 9);
                    texte = `$-\\sqrt{${e}}$`;
                    texte_corr = `$-\\sqrt{${e}}$ existe car ${e} est un nombre positif. Le signe - est placé devant le symbole radical, le nombre $-\\sqrt{${e}}$ est donc négatif. `;
                    break;
                case 5:
                    let f = randint(2, 9) * (-1);
                    let g = f * f;
                    texte = `$\\sqrt{-\\left(${f}\\right)^{2}}$`;
                    texte_corr = `$\\sqrt{-\\left(${f}\\right)^{2}}$ n'existe pas car $-\\left(${f}\\right)^{2}=-${g}$  est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. . `;
                    break;
                case 6:
                    let h = randint(2, 3);
                    texte = `$\\sqrt{${h}-\\pi}$`;
                    texte_corr = `$\\sqrt{${h}-\\pi}$ n'existe pas car $\\pi>3$ donc $${h}-\\pi$  est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. . `;
                    break;
                case 7:
                    let i = randint(4, 5);
                    texte = `$\\sqrt{${i}-\\pi}$`;
                    texte_corr = `$\\sqrt{${i}-\\pi}$ existe car $\\pi\\approx 3,14$ donc $${i}-\\pi$  est un nombre positif.`;
                    break;
                case 8:
                    let j = randint(2, 12);
                    texte = `$\\sqrt{-${j}^{2}}$`;
                    texte_corr = `$-${j}^{2}=-${j * j}$ est un réel négatif donc sa racine carrée n'est pas définie.`;
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
