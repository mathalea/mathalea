import { fraction_simplifiee } from "/modules/outils.js";
import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,reduire_ax_plus_b,texte_en_couleur, tex_fraction_signe,tex_fraction_reduite, ecriture_algebrique,ecriture_algebrique_sauf1} from "/modules/outils.js"

/**
 * Déterminer une fonction affine à partir de deux images
* @auteur Stéphane Guyon
* 2F20
*/
export default function Factoriser_Identites_remarquables2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Représentations graphiques des fonctions affines";
    this.video = "";
    this.consigne = "";
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.nb_questions = 3;
    this.sup = 1;
    this.spacing_corr = 3

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
             let type_de_questions_disponibles = [];
    if (this.sup == 1) {
        type_de_questions_disponibles = [1]; 
            }  
        
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, e, f,  k, fraction = [], ns, ds, type_de_questions; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            k = choice([-1, 1]); 
			a = randint(1, 9);
            a = a * k;
            b = randint(1, 9);
            k = choice([-1, 1]); 
            b = b * k;
            c = randint(1, 9,[a]);
            k = choice([-1, 1]); 
            c = c * k;
            c = randint(1, 9,[a]);
            
            d =randint(1, 9);
            k = choice([-1, 1]); 
            d = d * k;
            e=a*b-a*d;
            f=a-c;
           
            
            
           
                      switch (type_de_questions) {
                case 1:
                        texte = ` Déterminer l'expression algébrique de la fonction affine représentée ci-dessous :$.`; 
                        mathalea.fenetreMathalea2d = [-9,-14,21,6]
                        mathalea.pixelsParCm = 30
                        let f = x => -3*x+4 // Définit la fonction f tel que f(x)=-3x+4 (n'oubliez pas les multiplications implicites)
                        repere() // Trace le repère par défaut 
                        courbe(f) 
                        texte_corr = `On sait que $f$ est une fonction affine qui vérifie 
                        $f(${a})=${b}$ et $f(${c})=${d}$. <br>`;
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
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 1, ''];
}
