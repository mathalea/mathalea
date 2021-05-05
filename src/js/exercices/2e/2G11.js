import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,ecritureParentheseSiNegatif,fractionSimplifiee,texNombre} from '../../modules/outils.js'
import {point,tracePoint,labelPoint,segment,axes,grille,mathalea2d,} from '../../modules/2d.js'

export const titre = 'Déterminer les coordonnées milieu d’un segment dans un repère'

/**
 * 2G11
 * @Auteur Stéphane Guyon
 */
export default function Milieu() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = titre;

    this.nbQuestions = 2;
    this.nbCols = 2;
    this.nbColsCorr = 2;
    this.sup = 1; // 

    this.nouvelleVersion = function () {
        this.listeQuestions = []; // Liste de questions
        this.listeCorrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3, 4],type_de_questions
        if (this.sup == 1) {
            type_de_questions_disponibles = [1];
        }
        if (this.sup == 2) {
            type_de_questions_disponibles = [2];
        }
        if (this.sup == 3) {
            type_de_questions_disponibles = [3, 4];
        }
        let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions);
        for (let i = 0, a, ux, uy, g,s, xA, yA, xB, yB, xC, yC, xD, yD, XAB, YAB, xI0, xI1, yI0, yI1, xJ0, xJ1, yJ0, yJ1, A, B, T, L, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:

                    xA = randint(0, 9) * choice([-1, 1]);
                    yA = randint(0, 5) * choice([-1, 1]);
                    xB = randint(0, 5) * choice([-1, 1]);
                    yB = randint(0, 5) * choice([-1, 1]);
                    if (xB == xA && yA == yB) { xB = xB + randint(1, 5) * choice([-1, 1]); }

                    XAB = (xB - xA) * (xB - xA);
                    YAB = (yB - yA) * (yB - yA);
                    xI0 = fractionSimplifiee(xA + xB, 2)[0];
                    xI1 = fractionSimplifiee(xA + xB, 2)[1];
                    yI0 = fractionSimplifiee(yA + yB, 2)[0];
                    yI1 = fractionSimplifiee(yA + yB, 2)[1];

                    g = grille(-9, -9, 9, 9);
                    A = point(xA, yA, 'A');
                    B = point(xB, yB, 'B');
                    a = axes(-9, -9, 9, 9);
                    s = segment(A, B, 'blue');
                    T = tracePoint(A, B); // Repère les points avec une croix
                    L = labelPoint(A, B);
                    texte = `Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`;
                    texte += `<br>Déterminer les coordonnées du point $I$ milieu du segment $[AB]$ `;

                    texteCorr = mathalea2d({
                        xmin: -9,
                        ymin: -9,
                        xmax: 9,
                        ymax: 9
                    }, a, g, T, s, L);


                    texteCorr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`;
                    texteCorr += `<br> alors les coordonnées du point $I$ milieu de $[AB]$ sont `;
                    texteCorr += `$I\\left(\\dfrac{x_A+x_B}{2};\\dfrac{y_A+y_B}{2}\\right)$ <br>`;
                    texteCorr += `On applique la relation à l'énoncé : `;
                    texteCorr += `$\\begin{cases}x_I=\\dfrac{${xA}+${ecritureParentheseSiNegatif(xB)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecritureParentheseSiNegatif(yB)}}{2}\\end{cases}$`;
                    texteCorr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${texNombre(xA + xB)}}{2}\\\\y_I=\\dfrac{${texNombre(yA + yB)}}{2}\\end{cases}$`;
                    if (xI1 != 1 && yI1 != 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$`; }
                    if (xI1 == 1 && yI1 != 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$`; }
                    if (xI1 != 1 && yI1 == 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$`; }
                    if (xI1 == 1 && yI1 == 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$`; }


                    ;
                    break;
                case 2:


                    xA = randint(0, 9) * choice([-1, 1]);
                    yA = randint(0, 5) * choice([-1, 1]);
                    xI = randint(0, 5) * choice([-1, 1]);
                    yI = randint(0, 5) * choice([-1, 1]);
                    if (xI == xA && yI == yA) { xI = xI + randint(1, 5) * choice([-1, 1]); }

                    XAB = (xB - xA) * (xB - xA);
                    YAB = (yB - yA) * (yB - yA);
                    xI0 = fractionSimplifiee(xA + xB, 2)[0];
                    xI1 = fractionSimplifiee(xA + xB, 2)[1];
                    yI0 = fractionSimplifiee(yA + yB, 2)[0];
                    yI1 = fractionSimplifiee(yA + yB, 2)[1];
                    g = grille(-9, -9, 9, 9);
                    A = point(xA, yA, 'A', 'red');
                    B = point(xB, yB, 'B', 'red');
                    a = axes(-9, -9, 9, 9);
                    s = segment(A, B, 'blue');
                    T = tracePoint(A, B); // Repère les points avec une croix
                    L = labelPoint(A, B);
                    texte = `Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ et $I\\left(${xI};${yI}\\right)$`;
                    texte += `<br>Déterminer les coordonnées du point $B$ tel que I soit le milieu du segment $[AB]$ `;


                    texteCorr = mathalea2d({
                        xmin: -9,
                        ymin: -9,
                        xmax: 9,
                        ymax: 9
                    }, T, L, g, a, s);


                    texteCorr += `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère orthonormé,`;
                    texteCorr += ` <br>alors les coordonnées du point $I$ milieu de $[AB]$ sont `;
                    texteCorr += `$I\\left(\\dfrac{x_A+x_B}{2};\\dfrac{y_A+y_B}{2}\\right)$ <br>`;
                    texteCorr += `On applique la relation à l'énoncé : `;
                    texteCorr += `$\\begin{cases}${xI}=\\dfrac{${xA}+x_B}{2} \\\\ ${yI}=\\dfrac{${yA}+y_B}{2}\\end{cases}$`;
                    texteCorr += `$\\iff \\begin{cases}x_B=2\\times ${xI} -${ecritureParentheseSiNegatif(xA)} \\\\ y_B=2\\times ${yI}-${ecritureParentheseSiNegatif(yA)}\\end{cases}$`;
                    texteCorr += `<br>On en déduit :  $\\begin{cases}x_B={${texNombre(2 * xI - xA)}}\\\\y_B=${texNombre(2 * yI - yA)}\\end{cases}$`;
                    texteCorr += `<br>Au final : $B\\left( ${texNombre(2 * xI - xA)};${texNombre(2 * yI - yA)}\\right)$`;
                    break;
                case 3:

                    xA = randint(0, 9) * choice([-1, 1]);
                    yA = randint(0, 9) * choice([-1, 1]);
                    ux = randint(1, 9) * choice([-1, 1]);
                    uy = randint(1, 9) * choice([-1, 1]);
                    xB = xA + ux;
                    yB = yA + uy;
                    xC = randint(0, 5) * choice([-1, 1]);
                    yC = randint(0, 9) * choice([-1, 1]);
                    if (xC == xA && yA == yC) { xC = xC + randint(1, 5) * choice([-1, 1]); }
                    xD = xC + ux;
                    yD = yC + uy;
                    xI0 = fractionSimplifiee(xA + xD, 2)[0];
                    xI1 = fractionSimplifiee(xA + xD, 2)[1];
                    yI0 = fractionSimplifiee(yA + yD, 2)[0];
                    yI1 = fractionSimplifiee(yA + yD, 2)[1];
                    xJ0 = fractionSimplifiee(xB + xC, 2)[0];
                    xJ1 = fractionSimplifiee(xB + xC, 2)[1];
                    yJ0 = fractionSimplifiee(yB + yC, 2)[0];
                    yJ1 = fractionSimplifiee(yB + yC, 2)[1];
                    g = grille(-9, -9, 9, 9);
                    A = point(xA, yA, 'A', 'red');
                    B = point(xB, yB, 'B', 'red');
                    a = axes(xmin = -9, ymin = -9, xmax = 9, ymax = 9, thick = .2, step = 1);
                    s = segment(A, B, 'blue');
                    T = tracePoint(A, B); // Repère les points avec une croix
                    L = labelPoint(A, B);


                    texte = `Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`;
                    texte += ` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`;
                    texte += `<br>Déterminer si le quadrilatère $ABDC$ est un parallélogramme.`;

                    texteCorr = mathalea2d({
                        xmin: -9,
                        ymin: -9,
                        xmax: 9,
                        ymax: 9
                    }, T, L, g, a, s);


                    texteCorr += `<br>On sait que ABDC est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.$`;
                    texteCorr += `<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère :`;
                    texteCorr += `On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère ,`;
                    texteCorr += `<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont `;
                    texteCorr += `$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>`;
                    texteCorr += `On applique la relation à l'énoncé : `;
                    texteCorr += `$\\begin{cases}x_I=\\dfrac{${xA}+${ecritureParentheseSiNegatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecritureParentheseSiNegatif(yD)}}{2}\\end{cases}$`;
                    texteCorr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${texNombre(xA + xD)}}{2}\\\\y_I=\\dfrac{${texNombre(yA + yD)}}{2}\\end{cases}$`;
                    if (xI1 != 1 && yI1 != 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$`; }
                    if (xI1 == 1 && yI1 != 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$`; }
                    if (xI1 != 1 && yI1 == 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$`; }
                    if (xI1 == 1 && yI1 == 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$`; }
                    texteCorr += `<br> Les coordonnées du point $J$ milieu de $[BC]$ sont `;
                    texteCorr += `$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>`;
                    texteCorr += `On applique la relation à l'énoncé : `;
                    texteCorr += `$\\begin{cases}x_J=\\dfrac{${xB}+${ecritureParentheseSiNegatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecritureParentheseSiNegatif(yC)}}{2}\\end{cases}$`;
                    texteCorr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${texNombre(xB + xC)}}{2}\\\\y_J=\\dfrac{${texNombre(yB + yC)}}{2}\\end{cases}$`;
                    if (xJ1 != 1 && yJ1 != 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$`; }
                    if (xJ1 == 1 && yJ1 != 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$`; }
                    if (xJ1 != 1 && yJ1 == 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$`; }
                    if (xJ1 == 1 && yJ1 == 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$`; }
                    texteCorr += `<br>On observe que $I$ et $J$ ont les mêmes coordonnées, donc les deux diagonales du quadrilatère se coupent en leur milieu.`;
                    texteCorr += `<br>$ABDC$ est donc un parallélogramme.`;
                    break;
                case 4:



                    xA = randint(0, 9) * choice([-1, 1]);
                    yA = randint(0, 9) * choice([-1, 1]);
                    ux = randint(1, 9) * choice([-1, 1]);
                    uy = randint(1, 9) * choice([-1, 1]);
                    xB = xA + ux;
                    yB = yA + uy;
                    xC = randint(0, 5) * choice([-1, 1]);
                    yC = randint(0, 9) * choice([-1, 1]);
                    if (xC == xA && yA == yC) { xC = xC + randint(1, 5) * choice([-1, 1]); }
                    xD = xC + ux + randint(1, 2) * choice([-1, 1]);
                    yD = yC + uy + randint(0, 1) * choice([-1, 1]);
                    xI0 = fractionSimplifiee(xA + xD, 2)[0];
                    xI1 = fractionSimplifiee(xA + xD, 2)[1];
                    yI0 = fractionSimplifiee(yA + yD, 2)[0];
                    yI1 = fractionSimplifiee(yA + yD, 2)[1];
                    xJ0 = fractionSimplifiee(xB + xC, 2)[0];
                    xJ1 = fractionSimplifiee(xB + xC, 2)[1];
                    yJ0 = fractionSimplifiee(yB + yC, 2)[0];
                    yJ1 = fractionSimplifiee(yB + yC, 2)[1];
                    g = grille(-9, -9, 9, 9);
                    A = point(xA, yA, 'A', 'red');
                    B = point(xB, yB, 'B', 'red');
                    a = axes(-9, -9, 9, 9);
                    s = segment(A, B, 'blue');
                    T = tracePoint(A, B); // Repère les points avec une croix
                    L = labelPoint(A, B);

                    texte = `Dans un repère orthonormé (O,I,J), on donne les 4 points suivants :<br>`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`;
                    texte += ` $C\\left(${xC};${yC}\\right)$ ; $D\\left(${xD};${yD}\\right).$`;
                    texte += `<br>Déterminer si le quadrilatère $ABDC$ est un parallélogramme.`;

                    texteCorr = mathalea2d({
                        xmin: -9,
                        ymin: -9,
                        xmax: 9,
                        ymax: 9
                    }, T, L, g, a, s);


                    texteCorr += `<br>On sait que ABDC est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.$`;
                    texteCorr += `<br>On cherche donc les coordonnées du milieu de chacune des deux diagonales du quadrilatère :`;
                    texteCorr += `On sait d'après le cours, que si $A(x_A;y_A)$ et $D(x_D;y_D)$ sont deux points d'un repère ,`;
                    texteCorr += `<br> alors les coordonnées du point $I$ milieu de $[AD]$ sont `;
                    texteCorr += `$I\\left(\\dfrac{x_A+x_D}{2};\\dfrac{y_A+y_D}{2}\\right)$ <br>`;
                    texteCorr += `On applique la relation à l'énoncé : `;
                    texteCorr += `$\\begin{cases}x_I=\\dfrac{${xA}+${ecritureParentheseSiNegatif(xD)}}{2} \\\\ y_I=\\dfrac{${yA}+${ecritureParentheseSiNegatif(yD)}}{2}\\end{cases}$`;
                    texteCorr += `<br>On en déduit :  $\\begin{cases}x_I=\\dfrac{${texNombre(xA + xD)}}{2}\\\\y_I=\\dfrac{${texNombre(yA + yD)}}{2}\\end{cases}$`;
                    if (xI1 != 1 && yI1 != 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};\\dfrac{${yI0}}{${yI1}};\\right)$`; }
                    if (xI1 == 1 && yI1 != 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};\\dfrac{${yI0}}{${yI1}}\\right)$`; }
                    if (xI1 != 1 && yI1 == 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(\\dfrac{${xI0}}{${xI1}};${yI0}\\right)$`; }
                    if (xI1 == 1 && yI1 == 1) { texteCorr += `  <br>Ce qui donne au final : $ I\\left(${xI0};${yI0}\\right)$`; }
                    texteCorr += `<br> Les coordonnées du point $J$ milieu de $[BC]$ sont `;
                    texteCorr += `$J\\left(\\dfrac{x_B+x_C}{2};\\dfrac{y_B+y_C}{2}\\right)$ <br>`;
                    texteCorr += `On applique la relation à l'énoncé : `;
                    texteCorr += `$\\begin{cases}x_J=\\dfrac{${xB}+${ecritureParentheseSiNegatif(xC)}}{2} \\\\ y_J=\\dfrac{${yB}+${ecritureParentheseSiNegatif(yC)}}{2}\\end{cases}$`;
                    texteCorr += `<br>On en déduit :  $\\begin{cases}x_J=\\dfrac{${texNombre(xB + xC)}}{2}\\\\y_J=\\dfrac{${texNombre(yB + yC)}}{2}\\end{cases}$`;
                    if (xJ1 != 1 && yJ1 != 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};\\dfrac{${yJ0}}{${yJ1}};\\right)$`; }
                    if (xJ1 == 1 && yJ1 != 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};\\dfrac{${yJ0}}{${yJ1}}\\right)$`; }
                    if (xJ1 != 1 && yJ1 == 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(\\dfrac{${xJ0}}{${xJ1}};${yJ0}\\right)$`; }
                    if (xJ1 == 1 && yJ1 == 1) { texteCorr += `  <br>Ce qui donne au final : $ J\\left(${xJ0};${yJ0}\\right)$`; }
                    texteCorr += `<br>On observe que $I$ et $J$ n'ont pas les mêmes coordonnées, donc les deux diagonales du quadrilatère ne se coupent pas en leur milieu.`;
                    texteCorr += `<br>$ABDC$ n'est donc pas un parallélogramme.`;
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
    this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Application directe de la formule 2 : Application indirecte de la formule 3: Caractériser un parallélogramme.'];
}
