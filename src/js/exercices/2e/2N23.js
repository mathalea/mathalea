import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,ecritureAlgebrique,ecritureParentheseSiNegatif} from '../../modules/outils.js'
import {point,labelPoint,segment,segmentAvecExtremites,texteParPosition,mathalea2d,} from '../../modules/2d.js'

/* auteur Stéphane Guyon*/
export const titre = 'Résoudre une équation avec des valeurs absolues'

/**
 * 2N23
 * @Auteur Stéphane Guyon
 */
export default function valeur_absolue_et_equation() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = titre;
    this.consigne = "Résoudre dans $\\mathbb{R}$ les équations suivantes  :";
    this.nbQuestions = 4;
    this.nbCols = 2;
    this.nbColsCorr = 2;
    this.sup = 1; // 
    this.correction_detaille_disponible = true;
    sortieHtml ? this.correctionDetaillee = true : this.correctionDetaillee = false;

    this.nouvelleVersion = function () {
        this.listeQuestions = []; // Liste de questions
        this.listeCorrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 2, 2, 2, 2],type_de_questions
        let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions);
        for (let i = 0, a, b, c, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
            type_de_questions = listeTypeDeQuestions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:

                    a = randint(1, 15) * choice([-1, 1]);
                    b = randint(1, 15) * (-1);

                    texte = `$\\vert x ${ecritureAlgebrique(a)}\\vert =${b}$`;
                    { texteCorr = ` ${b} étant négatif, il n'existe pas de solution à cette équation. $S=\\emptyset$`; }



                    break;
                case 2:

                    a = randint(1, 15) * choice([-1, 1]);
                    b = randint(1, 15);
                    c = -a;
                    texte = `$\\vert x ${ecritureAlgebrique(a)}\\vert =${b}$`;

                    texteCorr = `Résoudre cette équation est équivalent à résoudre ces deux équations :<br>
                    $x ${ecritureAlgebrique(a)} =${b}$ et    $x ${ecritureAlgebrique(a)} =${-b}$<br>
                    Il existe donc deux solutions à cette équation :<br>
                    $x_1=${c} ${ecritureAlgebrique(b)}$ et $x_2=${c} -${ecritureParentheseSiNegatif(b)}$<br>
                    $S=\\{${c - b};${c + b}\\}$`;
                    if (this.correctionDetaillee) {
                        let s = segment(point(0, 0), point(12, 0));
                        s.styleExtremites = '->';
                        let x0 = point(3, 0);
                        x0.nom = c - b;
                        x0.positionLabel = 'below';
                        let A = point(6, 0, c);
                        A.nom = c;
                        A.positionLabel = 'below';
                        let x1 = point(9, 0, c + b, 'below');
                        x1.nom = c + b;
                        x1.positionLabel = 'below';
                        let s1 = segmentAvecExtremites(x0, x1);
                        s1.color = 'blue';
                        s1.epaisseur = 2;
                        let s2 = segmentAvecExtremites(x0, A);
                        let l = labelPoint(A, x0, x1);
                        let cote = segment(point(3, 1), point(5.95, 1));
                        cote.styleExtremites = '<->';
                        let texteCote = texteParPosition(b, 4.5, 1.6);
                        let cote2 = segment(point(6.05, 1), point(9, 1));
                        cote2.styleExtremites = '<->';
                        let texteCote2 = texteParPosition(b, 7.5, 1.6);
                        texteCorr += mathalea2d({ xmin: -1, xmax: 13, ymin: -2, ymax: 2.5 },
                            s, s1, s2, l, cote, texteCote, cote2, texteCote2);
                    }
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
