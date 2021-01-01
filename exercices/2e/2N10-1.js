import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif} from "/modules/outils.js"


/**
 * 2N10-1
 * @Auteur Stéphane Guyon
 */
export default function proprietes_racine_carree() {

    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Connaître les propriétés calculatoires des racines carrées";
    this.consigne = "Effectuer, si possible, les calculs suivants :";
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; //
    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7],type_de_questions
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, a, b, c, d, e, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:

                    a = randint(2, 9) * choice([-1, 1]);
                    b = randint(2, 11, [4, 8, 9]);
                    c = a * a * b;
                    d = a * a;
                    texte = `$\\left(${a} \\sqrt{${b}}\\right)^{2}$`;
                    texte_corr = `$\\left(${a} \\sqrt{${b}}\\right)^{2}=${a}^{2}\\times \\left(\\sqrt{${b}}\\right)^{2}$
                        $\\phantom{\\left(${a} \\sqrt{${b}}\\right)^{2}}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}}\\right)^{2}}=${d}\\times ${b}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}}\\right)^{2}}=${c}$`;

                    break;
                case 2:

                    a = randint(2, 9) * choice([-1, 1]);
                    c = randint(2, 9) * choice([-1, 1]);
                    d = randint(2, 9) * choice([-1, 1]);
                    b = randint(2, 11, [4, 8, 9]);
                    e = c * d;


                    texte = `$ ${c} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(d)} \\sqrt{${b}}$`;
                    texte_corr = `$ ${c} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(d)} \\sqrt{${b}}=${c}\\times ${ecriture_parenthese_si_negatif(d)} \\sqrt{${b}} \\times \\sqrt{${b}}$<br>
                        $\\phantom{${c} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(d)} \\sqrt{${b}}}=${e}\\times ${b}$<br>
                        $\\phantom{${c} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(d)} \\sqrt{${b}}}=${e * b}$`;

                    break;
                case 3:

                    a = randint(2, 9) * choice([-1, 1]);
                    c = randint(2, 9) * choice([-1, 1]);
                    d = randint(2, 9) * choice([-1, 1]);
                    b = randint(2, 11, [4, 8, 9]);
                    e = c * d;


                    texte = `$ ${a} \\sqrt{${b}}\\left( ${c}  ${ecriture_algebrique(d)}\\sqrt{${b}}\\right)$`;
                    texte_corr = `$${a} \\sqrt{${b}}\\left( ${c}  ${ecriture_algebrique(d)}\\sqrt{${b}}\\right)=
                        ${a} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(c)}${ecriture_algebrique(a)} \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(d)}\\sqrt{${b}}$<br>
                        $\\phantom{${a} \\sqrt{${b}}\\left( ${c}  ${ecriture_algebrique(d)}\\sqrt{${b}}\\right)}=${a * c}\\sqrt{${b}}${ecriture_algebrique(a)}\\times ${ecriture_parenthese_si_negatif(d)}*${b}$<br>
                        $\\phantom{${a} \\sqrt{${b}}\\left( ${c}  ${ecriture_algebrique(d)}\\sqrt{${b}}\\right)}=${a * c}\\sqrt{${b}}${ecriture_algebrique(a * d * b)}$`;

                    break;
                case 4:

                    a = randint(2, 9);

                    d = randint(2, 9);
                    b = randint(2, 11, [4, 8, 9]);
                    c = randint(2, 19, [4, 8, 9, 12, 16, 18, b]);
                    e = c * d;


                    texte = `$  \\sqrt{${b}}+\\sqrt{${c}}$`;
                    texte_corr = `$  \\sqrt{${b}}+\\sqrt{${c}}$ n'est pas simplifiable`;

                    break;
                case 5:


                    b = randint(2, 11);
                    c = randint(2, 11, [b]);
                    e = c * d;


                    texte = `$  \\sqrt{${b * b}}+\\sqrt{${c * c}}$`;
                    texte_corr = `$  \\sqrt{${b * b}}+\\sqrt{${c * c}}=${b}+${c}=${b + c}$ `;

                    break;
                case 6:


                    b = randint(2, 11);
                    c = randint(2, 7, [b]);
                    d = b * b * c;


                    texte = `$ \\sqrt{\\dfrac{${d}}{${c}}}$`;
                    texte_corr = `$ \\sqrt{\\dfrac{${d}}{${c}}}= \\sqrt{\\dfrac{${b}^{2}\\times${c}}{${c}}}$<br>
                        $\\phantom{\\sqrt{\\dfrac{${d}}{${c}}}}=\\sqrt{${b}^{2}}$<br>
                        $\\phantom{\\sqrt{\\dfrac{${d}}{${c}}}}=${b}$ `;

                    break;
                case 7:


                    b = randint(2, 11, [4, 9]);
                    c = randint(2, 7, [b]);
                    d = b * c;


                    texte = `$ \\sqrt{${d}}\\times \\sqrt{${c}}$`;
                    texte_corr = `$ \\sqrt{${d}}\\times \\sqrt{${c}}=\\sqrt{${d}\\times${c}}$<br>
                        $\\phantom{\\sqrt{${d}}\\times \\sqrt{${c}}}=\\sqrt{${b}\\times${c}\\times${c}}$<br>
                        $\\phantom{\\sqrt{${d}}\\times \\sqrt{${c}}}=${c}\\sqrt{${b}}$ `;

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
