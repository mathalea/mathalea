import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes} from '../../modules/outils.js'
import {point,segment,crochetD,crochetG,intervalle,mathalea2d,} from '../../modules/2d.js'

export const titre = 'Associer un intervalle de  $\\mathbb{R}$ à une inéquation et son schéma sur une droite graduée'

/**
 * 2N24
 * @Stéphane Guyon
 */
export default function intervalles_de_R() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = titre;
    this.consigne = "Répondre aux questions suivantes: :";
    this.nbQuestions = 4;
    this.nbCols = 2;
    this.nbColsCorr = 2;

    this.nouvelleVersion = function () {
        this.listeQuestions = []; // Liste de questions
        this.listeCorrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],type_de_questions
        let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions);
        for (let i = 0, a, b, c, s, X1, X2, A, B, c1, c2, int, int1, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
            type_de_questions = listeTypeDeQuestions[i];


            s = segment(0, 0, 12, 0);
            s.styleExtremites = '->';
            X1 = point(0, 0);
            X2 = point(12, 0);


            int = intervalle(X1, X2, 'black', 0);

            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:
                    a = randint(1, 15);
                    b = randint(a, 25);
                    A = point(2, 0, a);
                    B = point(6, 0, b);
                    c1 = crochetG(A, 'red');
                    int1 = intervalle(A, X2, 'red', -0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x>${a}$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1, c1);
                    texteCorr += `$I=]${a};+\\infty[$`;
                    break;

                case 2:
                    a = randint(1, 15);
                    b = randint(a, 25);
                    A = point(2, 0, a);
                    B = point(6, 0, b);
                    X2 = point(12, 0);
                    c1 = crochetD(A, 'red');
                    int1 = intervalle(A, X2, 'red', -0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x\\geqslant ${a}$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1, c1);
                    texteCorr += `$I=[${a};+\\infty[$`;
                    break;

                case 3:
                    a = randint(1, 15);
                    b = randint(a, 25);
                    A = point(2, 0, a);
                    B = point(6, 0, b);
                    c1 = crochetD(A, 'red');
                    int1 = intervalle(X1, A, 'red', -0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x<${a}$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d(-2, -2, 15, 2, s, int, int1, c1);
                    texteCorr += `$I=]-\\infty;${a}[$`;
                    break;

                case 4:
                    a = randint(1, 15);
                    b = randint(a, 25);
                    A = point(2, 0, a);
                    B = point(6, 0, b);
                    c1 = crochetG(A, 'red');
                    int1 = intervalle(X1, A, 'red', -0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x\\leqslant ${a}$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1, c1);
                    texteCorr += `$I=]-\\infty;${a}]$`;
                    break;

                case 5:
                    a = randint(1, 15);
                    c = a + 1;
                    b = randint(c, 25);
                    A = point(2, 0, a);
                    B = point(6, 0, b);
                    c1 = crochetG(A, 'red');
                    c2 = crochetD(B, 'red');
                    int1 = intervalle(A, B, 'red', -0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a} < x < ${b}$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1, c1, c2);
                    texteCorr += `$I=]${a};${b}[$`;
                    break;

                case 6:
                    a = randint(1, 15);
                    c = a + 1;
                    b = randint(c, 25);
                    A = point(2, 0, a);
                    B = point(6, 0, b);
                    c1 = crochetD(A, 'red');
                    c2 = crochetD(B, 'red');
                    int1 = intervalle(A, B, 'red', -0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a}\\leqslant x<${b}$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1, c1, c2);
                    texteCorr += `$I=[${a};${b}[$`;
                    break;

                case 7:
                    a = randint(1, 15);
                    c = a + 1;
                    b = randint(c, 25);
                    A = point(2, 0, a);
                    B = point(6, 0, b);
                    c1 = crochetD(A, 'red');
                    c2 = crochetG(B, 'red');
                    int1 = intervalle(A, B, 'red', -0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a}\\leqslant x\\leqslant ${b}$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1, c1, c2);
                    texteCorr += `$I=[${a};${b}]$`;
                    break;

                case 8:
                    a = randint(1, 15);
                    c = a + 1;
                    b = randint(c, 25);
                    A = point(2, 0, a);
                    B = point(6, 0, b);
                    c1 = crochetG(A, 'red');
                    c2 = crochetG(B, 'red');
                    int1 = intervalle(A, B, 'red', -0.1);
                    texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a}< x\\leqslant ${b}$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1, c1, c2);
                    texteCorr += `$I=]${a};${b}]$`;
                    break;

                case 9:
                    a = randint(1, 15);
                    c = a + 1;
                    b = randint(c, 25);
                    A = point(2, 0, a);
                    B = point(6, 0, b);
                    c1 = crochetG(A, 'red');
                    c2 = crochetG(B, 'red');
                    int1 = intervalle(A, B, 'red', -0.1);
                    texte = `Déterminer l'inéquation correspondant à $x \\in ]${a};${b}]$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1,  c1, c2);
                    texteCorr += `$${a}< x\\leqslant ${b}$`;
                    break;
                case 10:
                    a = randint(1, 15);
                    c = a + 1;
                    b = randint(c, 25);
                    A = point(2, 0, a);
                    B = point(6, 0, b);
                    c1 = crochetD(A, 'red');
                    c2 = crochetG(B, 'red');
                    int1 = intervalle(A, B, 'red', -0.1);
                    texte = `Déterminer l'inéquation correspondant à $x \\in [${a};${b}]$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1,  c1, c2);
                    texteCorr += `$${a}\\leqslant x\\leqslant ${b}$`;
                    break;
                case 11:
                    a = randint(1, 15);
                    c = a + 1;
                    b = randint(c, 25);
                    A = point(2, 0, a);
                    B = point(6, 0, b);
                    c1 = crochetD(A, 'red');
                    c2 = crochetD(B, 'red');
                    int1 = intervalle(A, B, 'red', -0.1);
                    texte = `Déterminer l'inéquation correspondant à $x \\in [${a};${b}[$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1, c1, c2);
                    texteCorr += `$${a}\\leqslant x< ${b}$`;
                    break;
                case 12:
                    a = randint(1, 15);
                    c = a + 1;
                    b = randint(c, 25);
                    A = point(2, 0, a);
                    B = point(12, 0, b);
                    c1 = crochetG(A, 'red');

                    int1 = intervalle(A, B, 'red', -0.1); texte = `Déterminer l'inéquation correspondant à $x \\in ]${a};+\\infty[ et représenter l'intervalle sur une droite graduée.$`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1, c1);
                    texteCorr += `$x > ${a}$`;
                    break;
                case 13:
                    a = randint(1, 15);
                    c = a + 1;
                    b = randint(c, 25);
                    A = point(7, 0, a);
                    B = point(12, 0, b);
                    c1 = crochetD(A, 'red');

                    int1 = intervalle(X1, A, 'red', -0.1);
                    texte = `Déterminer l'inéquation correspondant à $x \\in ]-\\infty;${a}[$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1, c1);
                    texteCorr += `$x < ${a}$`;
                    break;
                case 14:
                    a = randint(1, 15);
                    c = a + 1;
                    b = randint(c, 25);
                    A = point(7, 0, a);
                    B = point(12, 0, b);
                    c1 = crochetG(A, 'red');

                    int1 = intervalle(X1, A, 'red', -0.1);
                    texte = `Déterminer l'inéquation correspondant à $x \\in ]-\\infty;${a}]$ et représenter l'intervalle sur une droite graduée.`;
                    texteCorr = mathalea2d({
                        xmin: -2,
                        ymin: -2,
                        xmax: 15,
                        ymax: 2
                    }, s, int, int1, c1);
                    texteCorr += `$x \\leqslant ${a}$`;
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

}
