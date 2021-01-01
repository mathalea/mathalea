import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes} from "/modules/outils.js"
import {point,segment,crochetD,crochetG,intervalle,mathalea2d,} from "/modules/2d.js"

/**
 * 2N25
 * @Auteur Stéphane Guyon
 */
export default function union_et_intersection_intervalles_de_R() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Utiliser et comprendre les symboles $\\cup $ et $\\cap $ avec les intervalles de $\\mathbb{R}$";
    this.consigne = "Répondre aux questions suivantes: :";
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],type_de_questions
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        let X1 = point(0, 0);
        let X2 = point(12, 0);
        for (let i = 0, a, b, c, d, s, e, f,A,B,C,D, c1, c2, c3, c4, int, int1, int2, texte="", texte_corr="", cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:
                    a = randint(1, 15);
                    e = a + 1;
                    b = randint(e, 25);
                    e = b + 1;
                    c = randint(e, 35);
                    e = c + 1;
                    d = randint(e, 45);
                    s = segment(0, 0, 10, 0);
                    s.styleExtremites = '->';

                    A = point(2, 0,a);
                    B = point(5, 0,b);
                    C = point(6, 0,c);
                    D = point(9, 0,d);
                    c1 = crochetD(A, 'red');
                    c2 = crochetG(B, 'red');
                    c3 = crochetD(C, 'blue');
                    c4 = crochetG(D, 'blue');
                    int = intervalle(X1, X2, 'black', 0);
                    int1 = intervalle(A, B, 'red', 0);
                    int2 = intervalle(C, D, 'blue', 0);


                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cap [${c};${d}].$`;

                    texte_corr += `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}]$.`;
                    texte_corr += `<br>On regarde la partie de l'intervalle qui est coloriée à la fois en bleu et en rouge :<br>`;
                    texte_corr += `<br>Les deux ensembles sont disjoints, ils n'ont aucun élément en commun.<br>
                    $I=\\emptyset$`;
                    break;
                case 2:
                    a = randint(1, 15);
                    e = a + 1;
                    b = randint(e, 25);
                    e = b + 1;
                    c = randint(e, 35);
                    e = c + 1;
                    d = randint(e, 45);
                    s = segment(0, 0, 10, 0);
                    s.styleExtremites = '->';

                    A = point(2, 0,a);
                    B = point(5, 0,b);
                    C = point(6, 0,c);
                    D = point(9, 0,d);
                    c1 = crochetD(A, 'red');
                    c2 = crochetG(B, 'red');
                    c3 = crochetD(C, 'blue');
                    c4 = crochetG(D, 'blue');
                    int = intervalle(X1, X2, 'black', 0);
                    int1 = intervalle(A, B, 'red', 0);
                    int2 = intervalle(C, D, 'blue', 0);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cup [${c};${d}].$`;
                    texte_corr += `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$, ou bien dans $[${c};${d}]$.`;
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>`;
                    texte_corr += `<br>Les deux ensembles sont disjoints, ils n'ont aucun élément en commun.<br>
                    On ne peut pas simplifier l'écriture de $I$ qui s'écrit donc $I=[${a};${b}] \\cup [${c};${d}].$`;
                    break;
                case 3:
                    a = randint(1, 15);
                    e = a + 4;
                    b = randint(29, 45);
                    e = b - 1;
                    c = randint(16, e);
                    e = b + 1;
                    d = randint(e, 65);
                    s = segment(0, 0, 10, 0);
                    s.styleExtremites = '->';

                    A = point(2, 0,a )
                    B = point(6, 0,b);
                    C = point(5, 0,c);
                    D = point(9, 0,d);
                    c1 = crochetD(A, 'red');
                    c2 = crochetG(B, 'red');
                    c3 = crochetD(C, 'blue');
                    c4 = crochetG(D, 'blue');
                    int = intervalle(X1, X2, 'black', 0);
                    int1 = intervalle(A, B, 'red', -0.1);
                    int2 = intervalle(C, D, 'blue', 0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cap [${c};${d}].$`;

                    texte_corr += `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}]$.`;
                    texte_corr += `<br>On regarde la partie de l'intervalle qui est coloriée à la fois en bleu et en rouge :<br>`;
                    texte_corr += `$I=[${c};${b}]$`;
                    break;
                case 4:
                    a = randint(1, 15);
                    e = a + 4;
                    b = randint(29, 45);
                    e = b - 1;
                    c = randint(16, e);
                    e = b + 1;
                    d = randint(e, 65);
                    s = segment(0, 0, 10, 0);
                    s.styleExtremites = '->';

                    A = point(2, 0,a)
                    B = point(6, 0,b);
                    C = point(5, 0,c);
                    D = point(9, 0,d);
                    c1 = crochetD(A, 'red');
                    c2 = crochetG(B, 'red');
                    c3 = crochetD(C, 'blue');
                    c4 = crochetG(D, 'blue');
                    int = intervalle(X1, X2, 'black', 0);
                    int1 = intervalle(A, B, 'red', -0.1);
                    int2 = intervalle(C, D, 'blue', 0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cup [${c};${d}].$`;
                    texte_corr += `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$, ou bien dans $[${c};${d}]$.`;
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>`;
                    texte_corr += `$I=[${a};${d}]$`;
                    break;
                case 5:
                    a = randint(1, 15);
                    e = a + 15;
                    b = randint(e, 35);
                    e = a + 1;
                    f = b - 10;
                    c = randint(e, f);
                    e = c + 1;
                    d = randint(e, f);
                    s = segment(0, 0, 10, 0);
                    s.styleExtremites = '->';

                    A = point(2, 0,a )
                    B = point(9, 0,b);
                    C = point(5, 0,c);
                    D = point(7, 0,d);
                    c1 = crochetD(A, 'red');
                    c2 = crochetG(B, 'red');
                    c3 = crochetD(C, 'blue');
                    c4 = crochetG(D, 'blue');
                    int = intervalle(X1, X2, 'black', 0);
                    int1 = intervalle(A, B, 'red', -0.1);
                    int2 = intervalle(C, D, 'blue', 0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cap [${c};${d}].$`;
                    texte_corr += `<br>On cherche les réels qui sont à la fois dans $[${a};${b}]$ et dans $[${c};${d}]$.`;
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée en bleu et rouge :<br>`;
                    texte_corr += `On observe que $[${c};${d}]\\subset [${a};${b}]$ donc $I=[${c};${d}].$`;
                    break;
                case 6:
                    a = randint(1, 15);
                    e = a + 15;
                    b = randint(e, 35);
                    e = a + 1;
                    f = b - 10;
                    c = randint(e, f);
                    e = c + 1;
                    d = randint(e, f);
                    s = segment(0, 0, 10, 0);
                    s.styleExtremites = '->';

                    A = point(2, 0,a )
                    B = point(9, 0,b);
                    C = point(5, 0,c);
                    D = point(7, 0,d);
                    c1 = crochetD(A, 'red');
                    c2 = crochetG(B, 'red');
                    c3 = crochetD(C, 'blue');
                    c4 = crochetG(D, 'blue');
                    int = intervalle(X1, X2, 'black', 0);
                    int1 = intervalle(A, B, 'red', -0.1);
                    int2 = intervalle(C, D, 'blue', 0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cup [${c};${d}].$`;
                    texte_corr += `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$, ou bien dans $[${c};${d}]$.`;
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée soit en bleu, soit en rouge, soit en bleu et rouge :<br>`;
                    texte_corr += `On $[${c};${d}]\\subset [${a};${b}]$ donc $I=[${a};${b}].$`;
                    break;
                case 7:
                    a = randint(1, 15);
                    e = a + 1;
                    b = randint(e, 25);
                    e = b + 1;
                    c = randint(e, 35);
                    e = c + 1;
                    d = randint(e, 45);
                    s = segment(0, 0, 10, 0);
                    s.styleExtremites = '->';

                    A = point(2, 0,a);
                    B = point(5, 0,b);
                    C = point(6, 0,c);
                    D = point(9, 0,d);
                    c1 = crochetG(A, 'red');
                    c2 = crochetG(B, 'red');
                    c3 = crochetD(C, 'blue');
                    c4 = crochetG(D, 'blue');
                    int = intervalle(X1, X2, 'black', 0);
                    int1 = intervalle(A, B, 'red', 0);
                    int2 = intervalle(C, D, 'blue', 0);


                    texte = `Donner si possible, une écriture simplifiée de $I=]${a};${b}] \\cap [${c};${d}].$`;

                    texte_corr += `<br>On cherche les réels qui sont à la fois dans $]${a};${b}]$ et dans $[${c};${d}]$.`;
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée en bleu et rouge :<br>`;
                    texte_corr += `<br>Aucun réel n'appartient aux deux ensembles.<br>
                    $I=\\emptyset$`;
                    break;
                case 8:
                    a = randint(1, 15);
                    e = a + 1;
                    b = randint(e, 25);
                    e = b + 1;
                    c = randint(e, 35);
                    e = c + 1;
                    d = randint(e, 45);
                    s = segment(0, 0, 10, 0);
                    s.styleExtremites = '->';

                    A = point(2, 0,a);
                    B = point(5, 0,b);
                    C = point(6, 0,c);
                    D = point(9, 0,d);
                    c1 = crochetD(A, 'red');
                    c2 = crochetG(B, 'red');
                    c3 = crochetD(C, 'blue');
                    c4 = crochetD(D, 'blue');
                    int = intervalle(X1, X2, 'black', 0);
                    int1 = intervalle(A, B, 'red', 0);
                    int2 = intervalle(C, D, 'blue', 0);
                    texte = `Donner si possible, une écriture simplifiée de $I=[${a};${b}] \\cup [${c};${d}[.$`;
                    texte_corr += `<br>On cherche les réels qui sont ou bien dans $[${a};${b}]$, ou bien dans $[${c};${d}[$.`;
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée soit en bleu, soit en rouge, soit en bleu et rouge :`;
                    texte_corr += `<br>Les deux ensembles sont disjoints, ils n'ont aucun élément en commun.<br>
                    On ne peut pas simplifier l'écriture de $I$ qui s'écrit donc $I=[${a};${b}] \\cup [${c};${d}[.$`;
                    break;
                case 9:
                    a = randint(1, 15);
                    e = a + 4;
                    b = randint(29, 45);
                    e = b - 1;
                    c = randint(16, e);
                    e = b + 1;
                    d = randint(e, 65);
                    s = segment(0, 0, 10, 0);
                    s.styleExtremites = '->';

                    A = point(2, 0,a);
                    B = point(6, 0,b);
                    C = point(5, 0,c);
                    D = point(9, 0,d);
                    c1 = crochetG(A, 'red');
                    c2 = crochetD(B, 'red');
                    c3 = crochetD(C, 'blue');
                    c4 = crochetG(D, 'blue');
                    int = intervalle(X1, X2, 'black', 0);
                    int1 = intervalle(A, B, 'red', -0.1);
                    int2 = intervalle(C, D, 'blue', 0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=]${a};${b}[ \\cap [${c};${d}].$`;

                    texte_corr += `<br>On cherche les réels qui sont à la fois dans $]${a};${b}[$ et dans $[${c};${d}]$.`;
                    texte_corr += `<br>On regarde la partie de l'intervalle qui est coloriée à la fois en bleu et en rouge :<br>`;
                    texte_corr += `$I=[${c};${b}[$`;
                    break;
                case 10:
                    a = randint(1, 15);
                    e = a + 4;
                    b = randint(29, 45);
                    e = b - 1;
                    c = randint(16, e);
                    e = b + 1;
                    d = randint(e, 65);
                    s = segment(0, 0, 10, 0);
                    s.styleExtremites = '->';

                    A = point(2, 0,a);
                    B = point(6, 0,b);
                    C = point(5, 0,c);
                    D = point(9, 0,d);
                    c1 = crochetG(A, 'red');
                    c2 = crochetD(B, 'red');
                    c3 = crochetG(C, 'blue');
                    c4 = crochetD(D, 'blue');
                    int = intervalle(X1, X2, 'black', 0);
                    int1 = intervalle(A, B, 'red', -0.1);
                    int2 = intervalle(C, D, 'blue', 0.1);
                    texte = `Donner si possible, une écriture simplifiée de $I=]${a};${b}[ \\cup ]${c};${d}[.$`;

                    texte_corr += `<br>On cherche les réels qui sont ou bien dans $]${a};${b}[$, ou bien dans $]${c};${d}[$.`;
                    texte_corr += `<br>On donc regarde la partie de l'intervalle qui est coloriée, soit en bleu, soit en rouge, soit en bleu et rouge :<br>`;
                    texte_corr += `$I=]${a};${d}[$`;
                    break;
            }
            texte_corr = mathalea2d({
                xmin: -2,
                ymin: -2,
                xmax: 15,
                ymax: 2
            }, int, int1, int2, c1, c2, c3, c4);
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
