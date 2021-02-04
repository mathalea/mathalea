import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, randint, choice, reduire_ax_plus_b, quotientier, combinaison_listes, ecriture_parenthese_si_negatif, tex_fraction_reduite } from "/modules/outils.js"
import { repere2, courbe2, mathalea2d, point, tracePoint, labelPoint } from "/modules/2d.js"
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
    this.sup = 1;
    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [];
        if (this.sup == 1) {
            type_de_questions_disponibles = [1]; // on donne f(a)=b et f(c)=d
        }
        if (this.sup == 2) {
            type_de_questions_disponibles = [2]; // On donne 2 points A(a;b) et B(c;d) avec le graphique
        }
        if (this.sup == 3) {
            type_de_questions_disponibles = [3]; // On donne 2 points A(a;b) et B(c;d) sans le graphique
        }
        if (this.sup == 4) {
            type_de_questions_disponibles = [1, 2, 3]; //méli-mélo
            }


        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0, A, courbe, B, r, f, c, t, l, xA, xB, yA, yB, a, b, d, e, k, type_de_questions; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            k = choice([-1, 1]);
            a = randint(1, 5);
            a = a * k;
            b = randint(1, 5);
            k = choice([-1, 1]);
            b = b * k;
            c = randint(1, 5, [a]);
            k = choice([-1, 1]);
            c = c * k;


            d = randint(1, 5);
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
                case 2:

                    r = repere2()


                    xA = randint(0, 3) * choice([-1, 1])// Abscisse de A
                    yA = a * xA + b// Ordonnée de A
                    xB = randint(0, 3, [xA]) * choice([-1, 1]) // Abscisse de B, différente de celle de A
                    if (a * xB + b > 9) // On évite de trop grandes valeurs pour yA
                    {
                        xB = quotientier(xB, 2)
                    }
                    if (a * xB + b < -9) {
                        xB = quotientier(xB, 2)
                    }
                    if (xB == xA) {
                        xA == xA + 1
                        xB = xB - 1
                    }
                    yB = a * xB + b// Ordonnée de B
                    A = point(xA, yA, 'A', 'left')
                    B = point(xB, yB, 'B', 'left')
                    if (yA == 0) { A = point(xA, yA, 'A', 'above') }// éviter A sur l'axe des abscisses
                    if (xB == 0) { B = point(xB, yB, 'B', 'right') }// éviter A sur l'axe des abscisses
                    if (xA == 0) { A = point(xA, yA, 'A', 'right') }// éviter A sur l'axe des abscisses
                    if (yB == 0) { B = point(xB, yB, 'B', 'above') }// éviter A sur l'axe des abscisses

                    t = tracePoint(A, B, 'red') // Variable qui trace les points avec une croix
                    l = labelPoint(A, B)// Variable qui trace les nom s A et B
                    l.color = 'red'
                    texte = `Déterminer, en détaillant les calculs, l'expression algébrique de la fonction affine $f$ dont la représentation<br>`;
                    texte += `graphique passe par les points $A(${xA};${yA})$ et $B(${xB};${yB})$ représentés ci-dessous :<br>`
                    texte += mathalea2d({
                        xmin: -6,
                        ymin: -10,
                        xmax: 6,
                        ymax: 10
                    }, r, t, l);
                    a = xA;
                    b = yA;
                    c = xB;
                    d = yB;
                    texte_corr = `Les points $A(${xA};${yA})$ et $B(${xB};${yB})$ appartiennent à la courbe représentative de $f$<br>`

                    texte_corr += `Comme $A(${xA};${yA})\\in \\mathcal{C_f}$, on a  $f(${a})=${b}$  et comme $B(${xB};${yB})\\in \\mathcal{C_f}$, on a $f(${c})=${d}$ <br>`;
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
                case 3:

                  


                    xA = randint(0, 3) * choice([-1, 1])// Abscisse de A
                    yA = a * xA + b// Ordonnée de A
                    xB = randint(0, 3, [xA]) * choice([-1, 1]) // Abscisse de B, différente de celle de A
                    if (a * xB + b > 9) // On évite de trop grandes valeurs pour yA
                    {
                        xB = quotientier(xB, 2)
                    }
                    if (a * xB + b < -9) {
                        xB = quotientier(xB, 2)
                    }
                    if (xB == xA) {
                        xA == xA + 1
                        xB = xB - 1
                    }
                    yB = a * xB + b// Ordonnée de B
                    A = point(xA, yA, 'A', 'left')
                    B = point(xB, yB, 'B', 'left')
                    if (yA == 0) { A = point(xA, yA, 'A', 'above') }// éviter A sur l'axe des abscisses
                    if (xB == 0) { B = point(xB, yB, 'B', 'right') }// éviter A sur l'axe des abscisses
                    if (xA == 0) { A = point(xA, yA, 'A', 'right') }// éviter A sur l'axe des abscisses
                    if (yB == 0) { B = point(xB, yB, 'B', 'above') }// éviter A sur l'axe des abscisses

                  
                 
                    texte = `Déterminer, en détaillant les calculs, l'expression algébrique de la fonction affine $f$ dont la représentation<br>`;
                    texte += `graphique passe par les points $A(${xA};${yA})$ et $B(${xB};${yB})$.<br>`
                    
                    texte_corr = `Les points $A(${xA};${yA})$ et $B(${xB};${yB})$ appartiennent à la courbe représentative de $f$<br>`

                    texte_corr += `Comme $A(${xA};${yA})\\in \\mathcal{C_f}$, on a  $f(${a})=${b}$  et comme $B(${xB};${yB})\\in \\mathcal{C_f}$, on a $f(${c})=${d}$ <br>`;
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
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 :Avec deux images\n 2 : Avec deux points et un repère\n 3 : 2 : Avec deux points sans repère\n 4 : méli-mélo'];
}
