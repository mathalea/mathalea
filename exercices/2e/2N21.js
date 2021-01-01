import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,tex_nombre,katex_Popup2} from "/modules/outils.js"


/**
 * 2N21
 * @Auteur Stéphane Guyon
 */
export default function parite() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer la parité d'une expression";
    this.consigne = "Soit $n$ un entier naturel.";
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3],type_de_questions
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, a, b, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:

                    a = randint(2, 6);
                    b = randint(2, 11, [4, 8, 9]);

                    texte = `Que peut-on dire de la parité de ${a}$n$ ?`;
                    if (a % 2 == 0 && a != 2) {
                        texte_corr = `${a}$n=2\\times ${tex_nombre(a / 2)}n$<br>
                        Comme $${tex_nombre(a / 2)}n$ est un entier naturel, ${a}$n$ s'écrit comme le double d'un entier naturel, il est donc pair`;
                    }
                    if (a == 2) {
                        texte_corr = `${a}$n=2\\times n$<br>
                        Comme $n$ est un entier naturel, ${a}$n$ s'écrit comme le double d'un entier naturel, il est donc pair`;
                    }

                    if (a == 3) {
                        texte_corr = `${a}$n=2n+n$<br>
                            Comme $n$ est un entier naturel, $2 n$ est un nombre pair.<br>
                            Si $n$ est pair, $2n+n$ est la somme de deux nombres pairs, il sera donc pair. <br>
                            Si $n$ est impair, $2n+n$ est la somme d'un nombre pair et d'un impair, il sera donc impair. <br>
                            Au final, ${a}$n$ a donc la même parité que $n$.`;
                    }
                    if (a % 2 != 0 && a != 3) {
                        texte_corr = `${a}$n=2\\times ${tex_nombre((a - 1) / 2)}n+n$<br>
                            Comme $${tex_nombre((a - 1) / 2)}n$ est un entier naturel, $2\\times ${tex_nombre((a - 1) / 2)}n$ est un nombre pair.<br>
                            Si $n$ est pair, $2\\times${tex_nombre((a - 1) / 2)}n+n$ est la somme de deux nombres pairs, il sera donc pair. <br>
                            Si $n$ est impair, $2\\times${tex_nombre((a - 1) / 2)}n+n$ est la somme d'un nombre pair et d'un impair, il sera donc impair. <br>
                            Au final, ${a}$n$ a donc la même parité que $n$.`;
                    }


                    break;
                case 2:
                    a = randint(2, 6);
                    b = randint(2, 11);

                    texte = `Que peut-on dire de la parité de $${a}n+${b}$ ?`;

                    if (a % 2 == 0 && b % 2 == 0 && a != 2) {
                        texte_corr = `$${a}n+${b}=2\\times ${tex_nombre(a / 2)}n+${b}$<br>
                        Comme $${tex_nombre(a / 2)}n$ est un entier naturel, $2\\times ${tex_nombre(a / 2)}n$ est donc un nombre pair<br>
                        ${b} est aussi un nombre pair.
                        $${a}n+${b}$ est donc la somme de deux nombres pairs, il est donc pair`;
                    }
                    if (a % 2 == 0 && b % 2 != 0 && a != 2) {
                        texte_corr = `$${a}n+${b}=2\\times ${tex_nombre(a / 2)}n+${b}$<br>
                        Comme $${tex_nombre(a / 2)}n$ est un entier naturel, $2\\times ${tex_nombre(a / 2)}n$ est donc un nombre pair<br>
                        ${b} est un nombre impair.
                        $${a}n+${b}$ est donc la somme d'un nombre pair et d'un nombre impair. Il est donc impair`;
                    }


                    if (a == 2 && b % 2 == 0) {
                        texte_corr = `Comme $n$ est un entier naturel, $2n$ est un nombre pair<br>
                        ${b} est aussi un nombre pair.
                        $${a}n+${b}$ est donc la somme de deux nombres pairs, il est donc pair`;
                    }

                    if (a == 2 && b % 2 != 0) {
                        texte_corr = `
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair<br>
                        ${b} est un nombre impair.<br>
                        $2n+${b}$ est donc la somme d'un nombre pair et d'un nombre impair. Il est donc impair`;
                    }
                    if (a == 3 && b % 2 == 0) {
                        texte_corr = `$${a}n+${b}=2n+n+${b}$<br>
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair.<br>
                        ${b} est un nombre pair. <br>
                        $2n + ${b}$ est donc un nombre pair. <br>
                        $${a}n+${b}=2n+${b}+n$ est donc la somme d'un nombre pair et de $n$, il a donc la même parité que $n$.`;
                    }
                    if (a == 3 && b % 2 != 0) {
                        texte_corr = `$${a}n+${b}=2n+n+${b}$<br>
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair.<br>
                        ${b} est un nombre impair. <br>
                        $2n + ${b}$ est donc un nombre impair. <br>
                        $${a}n+${b}=2n+${b}+n$ est donc la somme d'un nombre impair et de $n$, il a donc la parité contraire de $n$.`;
                    }
                    if (a % 2 != 0 && b % 2 == 0 && a != 3) {
                        texte_corr = `${a}$n=2\\times ${tex_nombre((a - 1) / 2)}n+n+${b}$<br>
                        Comme $${tex_nombre((a - 1) / 2)}n$ est un entier naturel, $2 ${tex_nombre((a - 1) / 2)}n$ est donc un nombre pair<br>
                        ${b} est aussi un nombre pair.<br>
                        $${tex_nombre((a - 1) / 2)}n +${b}$ est donc un nombre pair.<br>
                        $${a}n+${b}=2\\times${tex_nombre((a - 1) / 2)}n+${b}+n$ est donc la somme d'un nombre pair et de $n$, il a donc la même parité que $n$.`;
                    }
                    if (a % 2 != 0 && b % 2 != 0 && a != 3) {
                        texte_corr = `$${a}n+${b}=2\\times ${tex_nombre((a - 1) / 2)}n+n+${b}$<br>
                        Comme $${tex_nombre((a - 1) / 2)}n$ est un entier naturel, $2 \\times ${tex_nombre((a - 1) / 2)}n$ est donc un nombre pair<br>
                        ${b} est un nombre impair.<br>
                        $2\\times${tex_nombre((a - 1) / 2)}n +${b}$ est une somme d'un nombre pair et d'un nombre impair, c'est donc un nombre impair.<br>
                        $${a}n+${b}=2\\times${tex_nombre((a - 1) / 2)}n+${b}+n$ est donc la somme d'un nombre impair et de $n$,  il a donc la parité contraire de $n$.`;
                    }

                    break;

                case 3:
                    a = randint(2, 6);
                    b = randint(2, 11);

                    texte = `Que peut-on dire de la parité de $${a}n^{2}$ ?`;


                    if (a == 2) {
                        texte_corr = `
                        Comme $n^{2}$ est un entier naturel, $2n^{2}$ est un nombre pair<br>
                        `;
                    }

                    if (a % 2 == 0 && a != 2) {
                        texte_corr = `$${a}n^{2}=2\\times ${tex_nombre(a / 2)}n^{2}$<br>
                        Comme $${tex_nombre(a / 2)}n^{2}$ est un entier naturel, $2\\times ${tex_nombre(a / 2)}n^{2}$ est donc un nombre pair<br>
                        `;
                    }
                    if (a % 2 == 2) {
                        texte_corr = `Comme $n^{2}$ est un entier naturel, $2n^{2}$ est un nombre pair<br>
                        `;
                    }
                    if (a % 2 != 0 && a != 3) {
                        texte_corr = `$${a}n^{2}=2\\times ${tex_nombre((a - 1) / 2)}n^{2}+n^{2}$<br>
                        Comme $${tex_nombre((a - 1) / 2)}n^{2}$ est un entier naturel, $2\\times ${tex_nombre((a - 1) / 2)}n^{2}$ est donc un nombre pair<br>
                        $${a}n^{2}$ est donc la somme d'un nombre pair et de $n^{2}$. Il a donc la même parité que $n^{2}$<br>
                        Or, on sait d'après le cours (démonstration fondamentale) que $n^{2}$ et $n$ ont la même parité.<br>
                        Donc $${a}n^{2}$ a la même parité que $n$`;
                    }
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
