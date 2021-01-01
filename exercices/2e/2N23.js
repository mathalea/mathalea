import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_algebrique,ecriture_parenthese_si_negatif} from "/modules/outils.js"
import {point,labelPoint,segment,segmentAvecExtremites,texteParPosition,mathalea2d,} from "/modules/2d.js"

/* auteur Stéphane Guyon*/
/**
 * 2N23
 * @Auteur Stéphane Guyon
 */
export default function valeur_absolue_et_equation() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Résoudre une équation avec des valeurs absolues";
    this.consigne = "Résoudre dans $\\mathbb{R}$ les équations suivantes  :";
    this.nb_questions = 4;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; // 
    this.correction_detaille_disponible = true;
    sortie_html ? this.correction_detaillee = true : this.correction_detaillee = false;

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1, 2, 2, 2, 2, 2],type_de_questions
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, a, b, c, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:

                    a = randint(1, 15) * choice([-1, 1]);
                    b = randint(1, 15) * (-1);

                    texte = `$\\vert x ${ecriture_algebrique(a)}\\vert =${b}$`;
                    { texte_corr = ` ${b} étant négatif, il n'existe pas de solution à cette équation. $S=\\emptyset$`; }



                    break;
                case 2:

                    a = randint(1, 15) * choice([-1, 1]);
                    b = randint(1, 15);
                    c = -a;
                    texte = `$\\vert x ${ecriture_algebrique(a)}\\vert =${b}$`;

                    texte_corr = `Résoudre cette équation est équivalent à résoudre ces deux équations :<br>
                    $x ${ecriture_algebrique(a)} =${b}$ et    $x ${ecriture_algebrique(a)} =${-b}$<br>
                    Il existe donc deux solutions à cette équation :<br>
                    $x_1=${c} ${ecriture_algebrique(b)}$ et $x_2=${c} -${ecriture_parenthese_si_negatif(b)}$<br>
                    $S=\\{${c - b};${c + b}\\}$`;
                    if (this.correction_detaillee) {
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
                        texte_corr += mathalea2d({ xmin: -1, xmax: 13, ymin: -2, ymax: 2.5 },
                            s, s1, s2, l, cote, texteCote, cote2, texteCote2);
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
