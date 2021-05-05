import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,ecritureParentheseSiNegatif} from '../../modules/outils.js'
import { repere2, courbe2, mathalea2d, point, tracePoint, labelPoint } from '../../modules/2d.js'

export const titre = 'Déterminer les coordonnées d’un vecteur.'

/**
 * @Auteur Stéphane Guyon
 */
export default function calculer_coordonnees_vecteurs() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = titre;

    this.nbQuestions = 2;
    this.nbCols = 2;
    this.nbColsCorr = 2;
    this.sup = 1; // 
    this.nouvelleVersion = function () {
        this.listeQuestions = []; // Liste de questions
        this.listeCorrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1];
        let type_de_questions

        let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions);
        for (let i = 0, ux, uy, xA, yA, xB, yB, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:


                    xA = randint(0, 5) * choice([-1, 1]);
                    yA = randint(0, 5) * choice([-1, 1]);
                    ux = randint(1, 5) * choice([-1, 1]);
                    uy = randint(1, 5) * choice([-1, 1]);
                    xB = xA + ux;

                    yB = yA + uy;


                    texte = `Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne les points suivants :`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`;
                    texte += `<br>Déterminer les coordonnées du vecteur $\\overrightarrow{AB}$ `;
                    r = repere2()//On définit le repère  
                    A = point(xA, yA)
                    B = point(xB, yB)                     
                    t = tracePoint(A, B,'red') // Variable qui trace les points avec une croix
                    l = labelPoint(A,B)// Variable qui trace les nom s A et B
                    l.color='red'                    
                    texte += mathalea2d({
                      xmin: -6,
                      ymin: -6,
                      xmax: 6,
                      ymax: 6
                    }, r, t,l);// On trace le graphique



                    texteCorr = `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère,`;
                    texteCorr += ` <br>alors on a : $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>`;
                    texteCorr += ` <br>On applique ici aux données de l'énoncé :`;
                    texteCorr += ` $\\overrightarrow{AB}\\begin{pmatrix}${xB}-${ecritureParentheseSiNegatif(xA)}  \\\\${yB}-${ecritureParentheseSiNegatif(yA)}\\end{pmatrix}$<br>`;
                    texteCorr += `Ce qui donne au final : $\\overrightarrow{AB}\\begin{pmatrix}${xB - xA}  \\\\${yB - yA}\\end{pmatrix}$<br>`;

                    break;
                case 2:



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
