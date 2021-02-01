import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,reduire_ax_plus_b,tex_fraction_reduite,texte_en_couleur, tex_fraction_signe} from "/modules/outils.js"

/**
 * Résoudre des équations x²=a
* @auteur Stéphane Guyon
* 2L11-2
*/
export default function Factoriser_Identites_remarquables2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Résoudre les équations produit-nul";
    this.consigne = "Résoudre dans $\\mathbb R$ les équations suivantes :";
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
            type_de_questions_disponibles = [1]; //(ax +b)(cx+d)=0
        }
     
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, k, type_de_questions; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            k = choice([-1, 1]); 
			a = randint(1, 9);
            a = a * k;
            b = randint(1, 9);
            k = choice([-1, 1]); 
            b = b * k;
            c = randint(1, 9);
            k = choice([-1, 1]); 
            c=c*k;
            d = randint(1, 9);
            k = choice([-1, 1]); 
            d = d * k;
           
            
                 
            switch (type_de_questions) {
                case 1:
                    texte = `$(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)})=0$`; 
                    texte_corr = `On reconnaît une équation produit-nul, donc on applique la propriété :<br>
                    ${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>
                    $(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)})=0$<br>
                    $\\iff ${reduire_ax_plus_b(a,b)}=0$ ou $${reduire_ax_plus_b(c,d)}=0$<br>
                    $\\iff x=${tex_fraction_signe(-b,a)}$ ou $ x=${tex_fraction_signe(-d,c)}$<br>
                     On en déduit :  `
                    if (-b/a>-d/c) {
                        texte_corr += `$S=\\left\\{${tex_fraction_reduite(-d,c)};${tex_fraction_reduite(-b,a)}\\right\\}$`
                    }
                    else {
                        texte_corr += `$S=\\left\\{${tex_fraction_reduite(-b,a)};${tex_fraction_reduite(-d,c)}\\right\\}$`
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
   
}
