import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif} from "/modules/outils.js"

/**
 * 2N12-1
 * @Auteur Stéphane Guyon
 */
export default function identites_remarquables_et_racine_carree() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Développer les identités remarquables avec des racines carrées";
    this.consigne = "Effectuer les calculs suivants :";
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; // 

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3, 4, 5],type_de_questions
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, a, b, c, d, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:

                    a = randint(2, 6) * choice([-1, 1]);
                    b = randint(2, 11, [4, 8, 9]);
                    c = randint(2, 6);

                    texte = `$\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}$`;
                    texte_corr = `$\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}=
                    \\left(${a} \\sqrt{${b}} \\right)^{2}+2\\times ${ecriture_parenthese_si_negatif(a)}\\sqrt{${b}}\\times ${c}+${c}^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${ecriture_parenthese_si_negatif(a)}^{2}\\times ${b} ${ecriture_algebrique(2 * a * c)}\\sqrt{${b}}+ ${c * c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a * a * b}${ecriture_algebrique(2 * a * c)}\\sqrt{${b}}+${c * c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a * a * b + c * c}${ecriture_algebrique(2 * a * c)}\\sqrt{${b}}$
                    `;



                    break;



                case 2:


                    a = randint(2, 6) * choice([-1, 1]);
                    b = randint(2, 11, [4, 8, 9]);
                    c = randint(2, 6);

                    texte = `$\\left(${a} \\sqrt{${b}} -${c}\\right)^{2}$`;
                    texte_corr = `$\\left(${a} \\sqrt{${b}} -${c}\\right)^{2}=\\left(${a} \\sqrt{${b}} \\right)^{2}-2\\times ${ecriture_parenthese_si_negatif(a)}\\sqrt{${b}}\\times ${c}+${c}^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${ecriture_parenthese_si_negatif(a)}^{2}\\times ${b} ${ecriture_algebrique(-2 * a * c)}\\sqrt{${b}}+ ${c * c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a * a * b}${ecriture_algebrique(-2 * a * c)}\\sqrt{${b}}+${c * c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a * a * b + c * c}${ecriture_algebrique(-2 * a * c)}\\sqrt{${b}}$

                    `;
                    break;
                case 3:
                    a = randint(2, 6) * choice([-1, 1]);
                    b = randint(2, 11, [4, 8, 9]);
                    c = randint(2, 6);

                    texte = `$\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)$`;
                    texte_corr = `$\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)=\\left(${a} \\sqrt{${b}} \\right)^{2}-${c}^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)}=${ecriture_parenthese_si_negatif(a)}^{2}\\times ${b}-${c * c}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)}=${a * a * b}-${c * c}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)}=${a * a * b - c * c}$
                    `;



                    break;
                case 4:

                    a = randint(2, 5) * choice([-1, 1]);
                    b = randint(3, 11, [4, 8, 9]);
                    c = randint(2, 5);
                    d = randint(3, 11, [4, 8, 9, b, b * 2, b * 3, b * 5]);

                    texte = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}$`;
                    texte_corr = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}=
                    \\left(${a} \\sqrt{${b}} \\right)^{2}+2\\times ${ecriture_parenthese_si_negatif(a)}\\sqrt{${b}}\\times ${c}\\sqrt{${d}}+\\left(${c}\\sqrt{${d}}\\right)^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}}=${ecriture_parenthese_si_negatif(a)}^{2}\\times ${b} +2\\times ${ecriture_parenthese_si_negatif(a)}
                    \\times \\sqrt{${b}}\\times ${ecriture_parenthese_si_negatif(c)}    \\times\\sqrt{${d}}+ ${c * c}\\times ${d}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}}=${a * a * b} ${ecriture_algebrique(2 * a * c)}\\sqrt{${b}\\times${d}} ${ecriture_algebrique(c * c * d)}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}}=${a * a * b + c * c * d}${ecriture_algebrique(2 * a * c)}\\sqrt{${b * d}}

                    $`;


                    break;
                case 5:
                    a = randint(2, 6) * choice([-1, 1]);
                    b = randint(2, 11, [4, 8, 9]);
                    c = randint(2, 6);
                    d = randint(2, 11, [4, 8, 9]);
                    texte = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)$`;
                    texte_corr = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)=
                    \\left(${a} \\sqrt{${b}} \\right)^{2}-\\left(${c}\\sqrt{${d}}\\right)^{2}$<br>
                $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)}
                    =${ecriture_parenthese_si_negatif(a)}^{2}\\times ${b}-${c}^{2}\\times ${ecriture_parenthese_si_negatif(d)}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)}
                    =${a * a * b}-${c * c * d}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)}
                    =${a * a * b - c * c * d}$
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
