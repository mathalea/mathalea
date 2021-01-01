import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,ecriture_algebrique} from "/modules/outils.js"


/**
 * 2N11-1
 * @Auteur Stéphane Guyon
 */
export default function Simplifier_une_somme_de_racines_carrees() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Simplifier une somme de racines carrées";
    this.consigne = " Simplifier une somme de racines carrées";
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; //
    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées

        for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

            let e1 = randint(2, 8) * choice([-1, 1]);
            let e2 = randint(2, 8) * choice([-1, 1]);
            let e3 = randint(2, 8) * choice([-1, 1]);
            let a1 = randint(2, 11);
            let a2 = randint(2, 11, [a1]);
            let a3 = randint(2, 11, [a1, a2]);
            let b1 = a1 * a1;
            let b2 = a2 * a2;
            let b3 = a3 * a3;
            let c = randint(2, 11, [4, 8, 9]);
            let d1 = c * b1;
            let d2 = c * b2;
            let d3 = c * b3;
            let f1 = e1 * a1;
            let f2 = e2 * a2;
            let f3 = e3 * a3;
            let f = f1 + f2 + f3;

            texte = `Écrire $A=${e1}\\sqrt{${d1}} ${ecriture_algebrique(e2)}\\sqrt{${d2}} ${ecriture_algebrique(e3)}\\sqrt{${d3}}$ sous la forme $a\\sqrt{${c}}$ où $a$ est un entier:`;
            texte_corr = `On cherche le plus grand carré parfait diviseur de ${d1}, ${d2} et ${d3}. <br>
                On trouve $${d1}=${b1} \\times ${c}~~$, $~~${d2}=${b2} \\times ${c}~~$	et $${d3}=${b3} \\times ${c}$<br>
                On a donc  : $\\sqrt{${d1}}=\\sqrt{${a1}^{2} \\times ${c} }=${a1}\\times \\sqrt{${c}}$,
                $~~\\sqrt{${d2}}=\\sqrt{${a2}^{2} \\times ${c} }=${a2}\\times \\sqrt{${c}}~$ et
                $~\\sqrt{${d3}}=\\sqrt{${a3}^{2} \\times ${c} }=${a3}\\times \\sqrt{${c}}$<br>
                On en déduit que : $A=${e1}\\times${a1}\\times \\sqrt{${c}} ${ecriture_algebrique(e2)}\\times ${a2}\\times \\sqrt{${c}}${ecriture_algebrique(e3)}\\times ${a3}\\times \\sqrt{${c}}$<br>
                $A=${f1}\\times \\sqrt{${c}} ${ecriture_algebrique(f2)}\\times \\sqrt{${c}}${ecriture_algebrique(f3)}\\times \\sqrt{${c}}$		<br>
                $A=	(${f1}${ecriture_algebrique(f2)}${ecriture_algebrique(f3)})\\times \\sqrt{${c}} = ${f}\\sqrt{${c}}$`;

            if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    };
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : En donnat la racine carrée unité\n2 : Sans indication"];
}
