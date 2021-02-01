import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, randint, choice, combinaison_listes, ecriture_parenthese_si_negatif, tex_fraction_reduite } from "/modules/outils.js"
/**
 * Déterminer une fonction affine à partir de deux images
* @auteur Stéphane Guyon
* 2F20
*/
export default function Factoriser_Identites_remarquables2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer une fonction affine à partir de deux images.";
    this.consigne = "Déterminer,en expliquant, l'expression de la fonctions affine $f$ vérifiant les conditions de l'énoncé :";
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.nb_questions = 3;

    this.spacing_corr = 3

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [];

        type_de_questions_disponibles = [1];


        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, e, f, k, type_de_questions; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            k = choice([-1, 1]);
            a = randint(1, 9);
            a = a * k;
            b = randint(1, 9);
            k = choice([-1, 1]);
            b = b * k;
            c = randint(1, 9, [a]);
            k = choice([-1, 1]);
            c = c * k;
            c = randint(1, 9, [a]);

            d = randint(1, 9);
            k = choice([-1, 1]);
            d = d * k;
            e = a * b - a * d;
            f = a - c;




            switch (type_de_questions) {
                case 1:
                    texte = ` Déterminer l'expression algébrique de la fonction affine $f$ définie sur $\\mathbb R$, sachant que
                        $f(${a})=${b}$ et que $f(${c})=${d}$.`;
                    texte_corr = `On sait que $f$ est une fonction affine qui vérifie 
                        $f(${a})=${b}$ et $f(${c})=${d}$. <br>`;
                    texte_corr += `Comme $f$ est une fonction affine, on sait d'après le cours qu'elle va s'écrire sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>`
                    texte_corr += `L'objectif est donc de déterminer $a$ et $b$.<br>`
                    texte_corr += `Or, on sait d'après le cours, que dans ces conditions, avec $u\\neq v$, on a :`
                    texte_corr += `$a=\\dfrac{f(u)-f(v)}{u-v}.$<br>`
                    texte_corr += `On applique cette relation avec les données de l'énoncé : $u=${a}$ et  $v=${c}$ ,<br>`
                    texte_corr += `ce qui donne :`
                    texte_corr += `$a=\\dfrac{f(${a})-f(${c})}{${a}-${ecriture_parenthese_si_negatif(c)}}=\\dfrac{${b}-${ecriture_parenthese_si_negatif(d)}}{${a}-${ecriture_parenthese_si_negatif(c)}}=\\dfrac{${b - d}}{${a - c}}$<br>`
                    texte_corr += `d'où : $a=${tex_fraction_reduite(b - d, a - c)}.$<br>`
                    if (b == d) {
                        texte_corr += `$f$ est une fonction constante, cas particulier des fonctions affines.<br>`
                        texte_corr += `On a donc : $f(x)=${b}$`
                    }
                    else {
                        texte_corr += `On peut donc déjà déduire que la fonction $f$ s'écrit sous la forme : `
                        if ((b - d) / (a - c) == 1) {
                            texte_corr += `$f(x)= x +b.$<br>`
                        }
                        if ((b - d) / (a - c) == -1) {
                            texte_corr += `$f(x)= -x +b.$<br>`
                        }
                        if (b - d != a - c && b - d != -a + c)// cas général
                        {
                            texte_corr += `   $f(x)=${tex_fraction_reduite(b - d, a - c)} x +b.$<br>`
                        }
                        texte_corr += `On cherche $b$ et pour cela on peut utiliser au choix une des deux données de l'énoncé :<br>`
                        texte_corr += `On prend par exemple : $f(${a})=${b}$  <br>`
                        texte_corr += `Comme`
                        if ((b - d) / (a - c) == 1) {
                            texte_corr += `$f(x)= x +b.$<br>`
                        }
                        if ((b - d) / (a - c) == -1) {
                            texte_corr += `$f(x)= -x +b.$<br>`
                        }
                        if (b - d != a - c && b - d != -a + c)// cas général
                        {
                            texte_corr += `   $f(x)=${tex_fraction_reduite(b - d, a - c)} x +b.$<br>`
                        }
                        texte_corr += `On en déduit que :$f(${a})=${tex_fraction_reduite(b - d, a - c)} \\times ${a} +b=${b}$<br>`
                        texte_corr += `$\\phantom{On en deduit que :}\\iff b=${b}-${tex_fraction_reduite(e, f)}$<br>`
                        texte_corr += `$\\phantom{On en deduit que :}\\iff b=${tex_fraction_reduite(b * a - b * c - a * b + a * d, a - c)}$<br> `
                        texte_corr += `On peut conclure que `
                        if (b - d == a - c) // cas où a=1
                        {
                            if ((b * a - b * c - a * b + a * d) * (a - c) > 0) {
                                texte_corr += `$f(x)= x +${tex_fraction_reduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
                            }
                            else {
                                if (b * a - b * c == a * b + a * d)//cas où b=0
                                {
                                    texte_corr += `$f(x)= x.$<br>`

                                }
                                texte_corr += `$f(x)= x ${tex_fraction_reduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
                            }
                        }
                        if (b - d == -a + c)// cas où a=-1
                        {
                            if ((b * a - b * c - a * b + a * d) * (a - c) > 0)// b>0
                            {
                                texte_corr += `$f(x)= -x +${tex_fraction_reduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
                            }
                            else {
                                if (a * d - b * c == 0)//cas où b=0
                                {
                                    texte_corr += `$f(x)= -x.$<br>`

                                }
                                else texte_corr += `$f(x)= -x ${tex_fraction_reduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
                            }
                        }
                        if (b - d != a - c && b - d != -a + c)// cas général
                        {
                            if ((b * a - b * c - a * b + a * d) * (a - c) > 0)// cas où b>0
                            {
                                texte_corr += `$f(x)=${tex_fraction_reduite(b - d, a - c)}x+  ${tex_fraction_reduite(b * a - b * c - a * b + a * d, a - c)}$`
                            }
                            else// cas où b<0
                            {
                                texte_corr += `$f(x)=${tex_fraction_reduite(b - d, a - c)}x  ${tex_fraction_reduite(b * a - b * c - a * b + a * d, a - c)}$`
                            }

                        }
                    }


                    break;

            }
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

}
