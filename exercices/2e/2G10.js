import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_parenthese_si_negatif,extraire_racine_carree,tex_racine_carree,tex_nombre} from "/modules/outils.js"

/**
 * 2G10
 * @Auteur Stéphane Guyon
 */
export default function Distance() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Utiliser la distance entre deux points dans un repère orthonormé";

    this.nb_questions = 2;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; // 

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3],type_de_questions
        if (this.sup == 1) {
            type_de_questions_disponibles = [1];
        }
        if (this.sup == 2) {
            type_de_questions_disponibles = [2, 3];
        }
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, ux, uy, xA, yA, xB, yB, xC, yC, AB, XAB, YAB, XAC, YAC, AC, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:

                    xA = randint(0, 5) * choice([-1, 1]);
                    yA = randint(0, 5) * choice([-1, 1]);
                    xB = randint(0, 5) * choice([-1, 1]);
                    yB = randint(0, 5) * choice([-1, 1]);
                    if (xB == xA && yA == yB) { xB = xB + randint(1, 5) * choice([-1, 1]); }
                    XAB = (xB - xA) * (xB - xA);
                    YAB = (yB - yA) * (yB - yA);
                    AB = XAB + YAB;

                    texte = `Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`;
                    texte += `<br>Calculer la distance $AB$ en justifiant le calcul.`;


                    texte_corr = `On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`;
                    texte_corr += ` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>`;
                    texte_corr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`;
                    texte_corr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`;
                    texte_corr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${tex_nombre(XAB + YAB)}}$<br>`;
                    if (extraire_racine_carree(AB)[0] != 1)
                        texte_corr += `$\\phantom{on applique la relation a l'enonce :   } AB=${tex_racine_carree(AB)}$<br>`;
                    break;
                case 2:


                    xA = randint(0, 5) * choice([-1, 1]);
                    yA = randint(0, 9) * choice([-1, 1]);
                    ux = randint(0, 9) * choice([-1, 1]);
                    uy = randint(0, 9) * choice([-1, 1]);
                    xB = xA + ux;
                    yB = yA + uy;
                    xC = xA + uy * choice([-1, 1]);
                    yC = yA + ux * choice([-1, 1]);

                    XAB = (xB - xA) * (xB - xA);
                    YAB = (yB - yA) * (yB - yA);
                    AB = XAB + YAB;
                    XAC = (xC - xA) * (xC - xA);
                    YAC = (yC - yA) * (yC - yA);
                    AC = XAC + YAC;

                    texte = `Dans un repère orthonormé (O,I,J), on donne les points suivants :`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right)$`;
                    texte += `<br>Le point $C\\left(${xC};${yC}\\right)$ appartient-il au cercle de centre $A$ passant par $B$ ?`;

                    texte_corr = `Le point $C$ appartient au cercle de centre $A$ passant par $B$ si et seulement si $CA=CB.$`;
                    texte_corr += `<br>On calcule séparément donc ces deux distances :`;
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`;
                    texte_corr += ` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}$<br>`;
                    texte_corr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`;
                    texte_corr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`;
                    texte_corr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${tex_nombre(XAB + YAB)}}$<br>`;
                    texte_corr += `$\\phantom{on applique la relation a l'enonce :   } AB=${tex_racine_carree(AB)}$<br>`;
                    texte_corr += `De même : $AC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`;
                    texte_corr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`;
                    texte_corr += `$\\phantom{De même :       } AC=\\sqrt{${tex_nombre(XAC + YAC)}}$<br>`;
                    if (extraire_racine_carree(AC)[0] != 1)
                        texte_corr += `$\\phantom{on applique la relation a l'enonce :   } AC=${tex_racine_carree(AC)}$<br>`;
                    texte_corr += `On observe que $AC=AB$ donc le point $A$ est équidistant de $B$ et $C$.`;
                    texte_corr += `<br>Le point $C$ appartient bien au cercle de centre $A$ et passant par $B$.`;
                    break;
                case 3:


                    xA = randint(0, 5) * choice([-1, 1]);
                    yA = randint(0, 9) * choice([-1, 1]);
                    ux = randint(0, 9) * choice([-1, 1]);
                    uy = randint(0, 9) * choice([-1, 1]);
                    xB = xA + ux;
                    yB = yA + uy;
                    xC = xA + uy * choice([-1, 1]) + randint(1, 3);
                    yC = yA + ux * choice([-1, 1]);

                    XAB = (xB - xA) * (xB - xA);
                    YAB = (yB - yA) * (yB - yA);
                    AB = XAB + YAB;
                    XAC = (xC - xA) * (xC - xA);
                    YAC = (yC - yA) * (yC - yA);
                    AC = XAC + YAC;

                    texte = `Dans un repère orthonormé (O,I,J), on donne les points suivants :`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`;
                    texte += `<br>Le point $C\\left(${xC};${yC}\\right)$ appartient-il au cercle de centre $A$ passant par $B$ ?`;

                    texte_corr = `Le point $C$ appartient au cercle de centre $A$ passant par $B$ si et seulement si $CA=CB.$`;
                    texte_corr += `<br>On calcule séparément donc ces deux distances :`;
                    texte_corr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`;
                    texte_corr += ` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>`;
                    texte_corr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yB}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`;
                    texte_corr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`;
                    texte_corr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${tex_nombre(XAB + YAB)}}$<br>`;
                    if (extraire_racine_carree(AB)[0] != 1)
                        texte_corr += `$\\phantom{on applique la relation a l'enonce :   } AB=${tex_racine_carree(AB)}$<br>`;
                    texte_corr += `De même : $AC=\\sqrt{\\left(${xC}-${ecriture_parenthese_si_negatif(xA)}\\right)^{2}+\\left(${yC}-${ecriture_parenthese_si_negatif(yA)}\\right)^{2}}$<br>`;
                    texte_corr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`;
                    texte_corr += `$\\phantom{De même :       } AC=\\sqrt{${tex_nombre(XAC + YAC)}}$<br>`;
                    if (extraire_racine_carree(AC)[0] != 1)
                        texte_corr += `$\\phantom{on applique la relation a l'enonce :   } AC=${tex_racine_carree(AC)}$<br>`;
                    texte_corr += `On observe que $AC\\neq AB$ donc le point $C$ n'appartient pas au cercle de centre $A$ et passant par $B$`;
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
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, '1 : Application directe de la formule 2 : Application en situation'];
}
