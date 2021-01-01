import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,tex_nombrec,tex_nombre,katex_Popup2} from "/modules/outils.js"


/**
 * 2N20
 * @Auteur Stéphane Guyon
 */
export default function ensemble_de_nombres() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer le plus petit ensemble de nombres dans lequel le nombre proposé appartient";
    this.consigne = "Déterminer le plus petit ensemble de nombres dans lequel le nombre proposé appartient. :";
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; // 

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9],type_de_questions
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, a, b, c, d, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:

                    a = randint(0, 150);


                    texte = `$${a} \\in \\dots$`;
                    texte_corr = `$${a}$ est un entier naturel, on a donc $${a}\\in \\mathbb{N}$
                    `;



                    break;
                case 2:

                    a = randint(0, 150) * (-1);


                    texte = `$${a} \\in \\dots$`;
                    texte_corr = `$${a}$ est un entier relatif, on a donc $${a}\\in \\mathbb{Z}$
                    `;



                    break;
                case 3:

                    d = randint(0, 9);
                    b = randint(0, 9) * choice([-1, 1]);
                    c = randint(0, 9);
                    a = b + c / 10 + d / 100;
                    a = a * choice([-1, 1]);

                    texte = `$${tex_nombrec(b + c / 10 + d / 100)}\\in \\dots$`;
                    texte_corr = `$${tex_nombrec(b + c / 10 + d / 100)}$ est un nombre décimal, on a donc $${tex_nombrec(b + c / 10 + d / 100)}\\in \\mathbb{D}$
                    `;



                    break;
                case 4:

                    a = randint(2, 16);
                    b = randint(0, 9);
                    c = randint(0, 9);


                    texte = `$\\sqrt{${tex_nombrec(a * a)}}\\in \\dots$`;
                    texte_corr = `$\\sqrt{${a * a}}=${a}$  est un entier naturel, on a donc $\\sqrt{${tex_nombrec(a * a)}}\\in \\mathbb{N}$
                    `;



                    break;
                case 5:

                    a = randint(2, 16);
                    b = randint(2, 6);
                    c = randint(0, 9);


                    texte = `$\\dfrac{${tex_nombrec(b * a)}}{${a}}\\in \\dots$`;
                    texte_corr = `$\\dfrac{${tex_nombrec(b * a)}}{${a}}=\\dfrac{${b}\\times ${a}}{${a}}=${b}$  est un entier naturel, on a donc $\\dfrac{${tex_nombrec(b * a)}}{${a}}\\in \\mathbb{N}$
                    `;



                    break;
                case 6:

                    a = choice([3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 39, 41, 43, 47, 53, 57, 61, 67, 71, 73, 79, 83, 87, 89]);
                    b = choice([3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 39, 41, 43, 47, 53, 57, 61, 67, 71, 73, 79, 83, 87, 89], [a]);



                    texte = `$\\dfrac{${a}}{${b}}\\in \\dots$`;
                    texte_corr = `$\\dfrac{${a}}{${b}}$ n'est pas un nombre décimal. On a donc $\\dfrac{${a}}{${b}}\\in \\mathbb{Q}$
                    `;



                    break;
                case 7:


                    b = choice([4, 5, 8, 10]);
                    a = randint(4, 100);
                    while (a % b == 0) { a = randint(4, 100); }




                    texte = `$\\dfrac{${a}}{${b}}\\in \\dots$`;
                    texte_corr = `$\\dfrac{${a}}{${b}}=${tex_nombre(a / b)}$  est un nombre décimal. On a donc $\\dfrac{${a}}{${b}}\\in \\mathbb{D}$
                    `;



                    break;
                case 8:


                    a = randint(2, 100, [4, 9, 16, 25, 36, 49, 64, 81]);
                    texte = `$\\sqrt{${a}} \\in \\dots$`;
                    texte_corr = `$\\sqrt{${a}}$  est un nombre irrationnel. On a donc $\\sqrt{${a}}\\in \\mathbb{R}$
                    `;



                    break;
                case 9:
                    a = randint(2, 9);
                    texte = `$${a}\\pi \\in \\dots$`;
                    texte_corr = `$${a}\\pi$   est un nombre irrationnel. On a donc $${a}\\pi \\in \\mathbb{R}$
                    `;



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
