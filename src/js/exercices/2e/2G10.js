import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,ecritureParentheseSiNegatif,extraire_racine_carree,tex_racine_carree,texNombre} from '../../modules/outils.js'

export const titre = 'Utiliser la distance entre deux points dans un repère orthonormé'

/**
 * 2G10
 * @Auteur Stéphane Guyon
 */
export default function Distance() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = titre;

    this.nbQuestions = 2;
    this.nbCols = 2;
    this.nbColsCorr = 2;
    this.sup = 1; // 

    this.nouvelleVersion = function () {
        this.listeQuestions = []; // Liste de questions
        this.listeCorrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3],type_de_questions
        if (this.sup == 1) {
            type_de_questions_disponibles = [1];
        }
        if (this.sup == 2) {
            type_de_questions_disponibles = [2, 3];
        }
        let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions);
        for (let i = 0, ux, uy, xA, yA, xB, yB, xC, yC, AB, XAB, YAB, XAC, YAC, AC, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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


                    texteCorr = `On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`;
                    texteCorr += ` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>`;
                    texteCorr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yB}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`;
                    texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`;
                    texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${texNombre(XAB + YAB)}}$<br>`;
                    if (extraire_racine_carree(AB)[0] != 1)
                        texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AB=${tex_racine_carree(AB)}$<br>`;
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

                    texteCorr = `Le point $C$ appartient au cercle de centre $A$ passant par $B$ si et seulement si $CA=CB.$`;
                    texteCorr += `<br>On calcule séparément donc ces deux distances :`;
                    texteCorr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`;
                    texteCorr += ` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}$<br>`;
                    texteCorr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yB}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`;
                    texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`;
                    texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${texNombre(XAB + YAB)}}$<br>`;
                    texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AB=${tex_racine_carree(AB)}$<br>`;
                    texteCorr += `De même : $AC=\\sqrt{\\left(${xC}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`;
                    texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`;
                    texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${texNombre(XAC + YAC)}}$<br>`;
                    if (extraire_racine_carree(AC)[0] != 1)
                        texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AC=${tex_racine_carree(AC)}$<br>`;
                    texteCorr += `On observe que $AC=AB$ donc le point $A$ est équidistant de $B$ et $C$.`;
                    texteCorr += `<br>Le point $C$ appartient bien au cercle de centre $A$ et passant par $B$.`;
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

                    texteCorr = `Le point $C$ appartient au cercle de centre $A$ passant par $B$ si et seulement si $CA=CB.$`;
                    texteCorr += `<br>On calcule séparément donc ces deux distances :`;
                    texteCorr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`;
                    texteCorr += ` alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>`;
                    texteCorr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yB}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`;
                    texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`;
                    texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${texNombre(XAB + YAB)}}$<br>`;
                    if (extraire_racine_carree(AB)[0] != 1)
                        texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AB=${tex_racine_carree(AB)}$<br>`;
                    texteCorr += `De même : $AC=\\sqrt{\\left(${xC}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`;
                    texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`;
                    texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${texNombre(XAC + YAC)}}$<br>`;
                    if (extraire_racine_carree(AC)[0] != 1)
                        texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AC=${tex_racine_carree(AC)}$<br>`;
                    texteCorr += `On observe que $AC\\neq AB$ donc le point $C$ n'appartient pas au cercle de centre $A$ et passant par $B$`;
                    break;
            }
            if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.listeQuestions.push(texte);
                this.listeCorrections.push(texteCorr);
                i++;
            }
            cpt++;
        }
        listeQuestionsToContenu(this);
    };
    this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Application directe de la formule 2 : Application en situation'];
}
