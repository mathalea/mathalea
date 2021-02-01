import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif,katex_Popup2} from "/modules/outils.js"


/**
 * 2N12
 * @Auteur Stéphane Guyon
 */
export default function Double_distributivité_avec_racine_carree() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Appliquer la double distributivité avec les racines carrées";
    this.consigne = " Effectuer les calculs suivants :";
    this.nb_questions = 5;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2],type_de_questions
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:
                    let a1 = randint(2, 9) * choice([-1, 1]);
                    let a = randint(2, 11, [4, 8, 9]);
                    let b1 = randint(2, 9) * choice([-1, 1]);
                    let a2 = randint(2, 9);
                    let b2 = randint(2, 9) * choice([-1, 1]);
                    let aa1 = a1 * a2 * a;
                    let bb = b1 * b2;
                    let aa2 = a1 * b2 + b1 * a2;
                    let aaa = aa1 + bb;
                    if (aa2 == 0) {
                        b2 = -1 * b2;
                        aa2 = a1 * b2 + b1 * a2;
                    }
                    texte = `$\\left(${a1}\\sqrt{${a}}${ecriture_algebrique(b1)}\\right)\\left(${a2}\\sqrt{${a}}${ecriture_algebrique(b2)}\\right)$`;
                    texte_corr = `$\\left(${a1}\\sqrt{${a}}${ecriture_algebrique(b1)}\\right)\\left(${a2}\\sqrt{${a}}${ecriture_algebrique(b2)}\\right)$<br>
                    
                    $=${a1}\\sqrt{${a}}\\times ${a2}\\sqrt{${a}}${ecriture_algebrique(a1)}\\sqrt{${a}} \\times ${ecriture_parenthese_si_negatif(b2)}
                    ${ecriture_algebrique(b1)} \\times ${a2}\\sqrt{${a}}${ecriture_algebrique(b1)} \\times ${ecriture_parenthese_si_negatif(b2)}$<br>
                    $=${a1}\\times ${a}\\times ${a2}+ \\left( ${a1} \\times ${ecriture_parenthese_si_negatif(b2)} 
                    ${ecriture_algebrique(b1)} \\times ${a2}\\right)\\sqrt{${a}} ${ecriture_algebrique(bb)}$<br>
                    $= ${aa1}${ecriture_algebrique(aa2)} \\sqrt{${a}}${ecriture_algebrique(bb)}$<br>
                    $=${aa2} \\sqrt{${a}}${ecriture_algebrique(aaa)}$`;


                    break;
                case 2:
                    let c1 = randint(2, 9) * choice([-1, 1]);
                    let c = randint(2, 11, [4, 8, 9]);
                    let d1 = randint(2, 9) * choice([-1, 1]);
                    let d2 = randint(2, 9);
                    let c2 = randint(2, 9);
                    let cc1 = c1 * d2;
                    let cc2 = c1 * c2;
                    let dd = d1 * d2;
                    let dd1 = d1 * c2;
                    let dd2 = dd - cc2 * c;
                    let dd3 = cc1 - dd1;
                    texte = `$\\left(${c1}\\sqrt{${c}}${ecriture_algebrique(d1)}\\right)\\left(${d2} ${ecriture_algebrique(c2)}\\sqrt{${c}}\\right)$`;
                    texte_corr = `$\\left(${c1}\\sqrt{${c}}${ecriture_algebrique(d1)}\\right)\\left(${d2}${ecriture_algebrique(c2)}\\sqrt{${c}}\\right)$<br>
                    $=${c1}\\sqrt{${c}}\\times ${d2}${ecriture_algebrique(c1)}\\sqrt{${c}} \\times ${ecriture_parenthese_si_negatif(c2)}\\sqrt{${c}}${ecriture_algebrique(d1)} \\times ${d2}  ${ecriture_algebrique(d1)}  \\times ${c2}\\sqrt{${c}}$<br>
                    $= ${cc1}\\sqrt{${c}} ${ecriture_algebrique(cc2)}\\times ${c} ${ecriture_algebrique(dd)} ${ecriture_algebrique(dd1)} \\sqrt{${c}}   $<br>
                    $=${dd3}\\sqrt{${c}}${ecriture_algebrique(dd2)}$`;
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
