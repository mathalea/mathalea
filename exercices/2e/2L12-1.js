import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,reduire_ax_plus_b,tex_fraction,texte_en_couleur, ecriture_algebrique,tex_fraction_signe} from "/modules/outils.js"

/**
 * Résoudre des équations produit-nul
* @auteur Stéphane Guyon
* 2L11-1
*/
export default function Factoriser_Identites_remarquables2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Résoudre des équations carrées.";
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
            type_de_questions_disponibles = [1]; //x²-a²=0
        }
        if (this.sup == 2) {
            type_de_questions_disponibles = [2]; //x²-b=0
        }
        if (this.sup == 3) {
            type_de_questions_disponibles = [3,4,5,6,7]; //x²-b=0
        }
        if (this.sup == 4) {
            type_de_questions_disponibles = [1,2,3,4,5,6,7]; //x²-b=0
        }
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, k, fraction = [], ns, ds, type_de_questions; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            a = randint(1, 9);
            b = randint(2, 19, [4, 8, 9, 12, 16]);               
            switch (type_de_questions) {
                case 1:
                        texte = `$x^{2}-${a*a}=0$`; // x²-a²=0
                        texte_corr = `$x^{2}-${a*a}=0$<br>`; 
                        texte_corr += `On reconnaît l'identité remarquable $a^2-b^2$ :<br>
                        avec  $\\quad a=x \\quad$ et $\\quad b=${a}$<br>`
                        texte_corr += `On obtient alors :<br>`
                        texte_corr += `$\\phantom{\\iff}x^{2}-${a*a}=0$<br>`; 
                        texte_corr += `$\\phantom{\\iff}x^{2}-${a}^{2}=0$`; 
                        texte_corr += `$\\iff (x-${a})(x+${a})=0$<br>`
                        texte_corr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`                 
                        texte_corr += `$\\iff x-${a}=0\\quad$ ou bien $\\quad x+${a}=0$<br>`
                        texte_corr += `$\\iff x=${a}\\quad$ ou bien $\\quad x=-${a}$<br>`
                        texte_corr += `$\\iff S=\\{-${a};${a})$<br>`
                    break;
                case 2:

                        texte = `$x^{2}-${b}=0$`; // x²-b=0
                        texte_corr = `$x^{2}-${b}=0$<br>`; 
                        texte_corr += `On reconnaît l'identité remarquable $a^2-b^2$ :<br>
                        avec  $\\quad a=x \\quad$ et $\\quad b=\\sqrt{${b}}$<br>`
                        texte_corr += `On obtient alors :<br>`
                        texte_corr += `$\\phantom{\\iff}x^{2}-${b}=0$<br>`; 
                        texte_corr += `$\\phantom{\\iff}x^{2}-(\\sqrt{${b}})^{2}=0$<br>`; 
                        texte_corr += `$\\iff (x-\\sqrt{${b}})(x+\\sqrt{${b}})=0$<br>`
                        texte_corr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`                 
                        texte_corr += `$\\iff x-\\sqrt{${b}}=0\\quad$ ou bien $\\quad x+\\sqrt{${b}}=0$<br>`
                        texte_corr += `$\\iff x=\\sqrt{${b}}\\quad$ ou bien $\\quad x=-\\sqrt{${b}}$<br>`
                        texte_corr += `$\\iff S=\\{-\\sqrt{${b}}\\quad ;\\sqrt{${b}})$<br>`
                        break;
                case 3:
                        texte = `$x^{2}+${a*a}=0$`; // x²+a²=0
                        texte_corr = `$x^{2}+${a*a}=0$<br>`; 
                        texte_corr += `On ne reconnaît pas d'identité remarquable. <br>
                        $a^2+b^2$ ne peut pas se factoriser.<br>
                        $x^{2}$ étant un nombre positif, il est impossible en lui ajoutant ${a*a}
                        d'obtenir 0.<br>`
                        texte_corr += `$ S=\\emptyset$<br>`
                        break;
                case 4:
                        texte = `$x^{2}+${a*a}=0$`; // x²+a²=0
                        texte_corr = `$x^{2}+${a*a}=0$<br>`; 
                        texte_corr += `On ne reconnaît pas d'identité remarquable. <br>
                        $a^2+b^2$ ne peut pas se factoriser.<br>
                        $x^{2}$ étant un nombre positif, il est impossible en lui ajoutant ${a*a}
                        d'obtenir 0.<br>`
                        texte_corr += `$ S=\\emptyset$<br>`
                        break;
                case 5:
                        texte = `$x^{2}=${a*a}$`; // x²+a²
                        texte_corr = `$x^{2}=${a*a}$<br>`; 
                        texte_corr +=`Pour résoudre ce genre d'équations, il faut essayer de se ramener à une équation produit-nul, <br>
                        donc déjà obtenir une équation nulle. <br>`
                        texte_corr += `$\\phantom{\\iff}x^{2}=${a*a}$<br>`; 
                        texte_corr += `$\\iff x^{2}-${a*a}=0$<br>`; 
                        texte_corr += `On reconnaît l'identité remarquable $a^2-b^2$ :<br>
                        avec  $\\quad a=x \\quad$ et $\\quad b=${a}$<br>`
                        texte_corr += `On obtient alors :<br>`
                        texte_corr += `$\\iff x^{2}-${a*a}=0$<br>`; 
                        texte_corr += `$\\iff x^{2}-${a}^{2}=0$<br>`; 
                        texte_corr += `$\\iff (x-${a})(x+${a})=0$<br>`
                        texte_corr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`                 
                        texte_corr += `$\\iff x-${a}=0\\quad$ ou bien $\\quad x+${a}=0$<br>`
                        texte_corr += `$\\iff x=${a}\\quad$ ou bien $\\quad x=-${a}$<br>`
                        texte_corr += `$\\iff S=\\{-${a};${a})$<br>`
                        break;  
                case 6:
                        texte = `$x^{2}=-${a*a}$`; // x²=-a²
                        texte_corr = `$x^{2}=-${a*a}$<br>`; 
                        texte_corr +=`Pour résoudre ce genre d'équations, il faut essayer de se ramener à une équation produit-nul, <br>
                        donc déjà obtenir une équation nulle. <br>`
                        texte_corr += `$x^{2}+${a*a}=0$<br>`; 
                        texte_corr += `On ne reconnaît pas d'identité remarquable. <br>
                        $a^2+b^2$ ne peut pas se factoriser.<br>
                        $x^{2}$ étant un nombre positif, il est impossible en lui ajoutant ${a*a}
                        d'obtenir 0.<br>`
                        texte_corr += `$ S=\\emptyset$<br>`
                        break;  
                case 7:

                        texte = `$x^{2}=${b}$`; // x²=b
                        texte_corr = `$\\phantom{iff} x^{2}=${b}$<br>`; 
                        texte_corr +=`Pour résoudre ce genre d'équations, il faut essayer de se ramener à une équation produit-nul, <br>
                        donc déjà obtenir une équation nulle. <br>` 
                        texte_corr += `$\\phantom{iff} x^{2}=${b}$<br>`; 
                        texte_corr += `$\\iff x^{2}-${b}=0$<br>`;
                        texte_corr += `On reconnaît l'identité remarquable $a^2-b^2$ :<br>
                        avec  $\\quad a=x \\quad$ et $\\quad b=\\sqrt{${b}}$<br>`
                        texte_corr += `On obtient alors :<br>`
                        texte_corr += `$\\phantom{\\iff}x^{2}-${b}=0$<br>`; 
                        texte_corr += `$\\phantom{\\iff}x^{2}-(\\sqrt{${b}})^{2}=0$<br>`; 
                        texte_corr += `$\\iff (x-\\sqrt{${b}})(x+\\sqrt{${b}})=0$<br>`
                        texte_corr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`                 
                        texte_corr += `$\\iff x-\\sqrt{${b}}=0\\quad$ ou bien $\\quad x+\\sqrt{${b}}=0$<br>`
                        texte_corr += `$\\iff x=\\sqrt{${b}}\\quad$ ou bien $\\quad x=-\\sqrt{${b}}$<br>`
                        texte_corr += `$\\iff S=\\{-\\sqrt{${b}}\\quad ;\\sqrt{${b}})$<br>`
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
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 :équations x²-a²=0\n 2 : équations x²-b=0\n 3 :équations x²+a²=0;x²=+/-a²\n 4 : méli-mélo'];
}
