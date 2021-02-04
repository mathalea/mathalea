import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,reduire_ax_plus_b,texte_en_couleur, tex_fraction_signe,tex_fraction_reduite, ecriture_algebrique,ecriture_algebrique_sauf1} from "/modules/outils.js"

/**
 * Reconnaître une fonction affine
* @auteur Stéphane Guyon
* 2F20
*/
export default function Factoriser_Identites_remarquables2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Reconnaître une fonction affine.";
    this.video = "";
    this.consigne = "Déterminer,en expliquant, si les fonctions suivantes sont, ou non, des fonctions affines. :";
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.nb_questions = 5;
    this.spacing_corr = 3

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [];
       
        type_de_questions_disponibles = [1,2,3,4,5,6,7,8]; 
        
        
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, e, f,  k, fraction = [], ns, ds, type_de_questions; i < this.nb_questions && cpt < 50;) 
        {
            type_de_questions = liste_type_de_questions[i];
            k = choice([-1, 1]); 
			a = randint(2, 9);
            a = a * k;
            b = randint(1, 9);
            c = choice([2,3,5,7,10,11,13,15,17]); 
            b = b * k;
            d = choice([2,3,5,7,10,11,13,15,17]); 
            e = randint(2, 9);
           
            
            
           
                      switch (type_de_questions) {
                case 1:
                        texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${reduire_ax_plus_b(a,b)}$`; //f(x)=ax + b
                        texte_corr = ` $f(x)=${reduire_ax_plus_b(a,b)}$<br>`
                        texte_corr += `On observe que la fonction $f$ s'écrit bien sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>`
                        texte_corr +=`Ici, on a : $a=${a}$ et $b=${b}$<br>`
                        texte_corr +=`$f$ est donc bien une fonction affine.<br>`                                 
                 break;
                 case 2:
                        if (a=1) {
                            texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${b}+x$<br>`; //f(x)=b+x
                            texte_corr = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${b}+x$<br>`; 
                            texte_corr += ` On peut écrire $f$ sous cette forme : $f(x)=x ${ecriture_algebrique(b)}$<br>`;} 
                        if (a=-1) {
                            texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${b}-x$<br>`; //f(x)=b-x}
                            texte_corr = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${b}-x$<br>`; 
                            texte_corr += ` On peut écrire $f$ sous cette forme : $f(x)=-x ${ecriture_algebrique(b)}$<br>`;} 
                        else{
                            texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${ecriture_algebrique(b)} ${ecriture_algebrique(a)}  x$<br>`; //f(x)=b-x}
                            texte_corr = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${ecriture_algebrique(b)} ${ecriture_algebrique(a)}  x$<br>`; //f(x)=b-x}
                            texte_corr += ` On peut écrire $f$ sous cette forme : $f(x)=-x ${reduire_ax_plus_b(a,b)}$<br>`;} 
                        texte_corr += `On observe que la fonction $f$ s'écrit bien sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>`
                        texte_corr +=`Ici, on a : $a=${a}$ et $b=${b}$<br>`
                        texte_corr +=`$f$ est donc bien une fonction affine.`                                 
                 break;    
                 case 3:
                        texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${a}x^{2}${ecriture_algebrique(b)} x${ecriture_algebrique(c)} $`; //f(x)=ax²+bx+c
                        texte_corr = ` $f(x)=${a}x^{2}${ecriture_algebrique_sauf1(b)} x${ecriture_algebrique(c)} $<br>`
                        texte_corr += `On observe que la fonction $f$ est du second degré, puisqu'il y a un terme en $x^{2}$<br>`
                        texte_corr += `Elle s'écrit sous la forme $f(x)= a x^{2}+ bx+c$ et non pas sous la forme $ax+b$.<br>`
                        texte_corr +=`$f$ n'est donc pas une fonction affine.<br>`                                 
                 break;
                 case 4:
                        texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=\\sqrt{${c}}x + \\sqrt{${d}}$`; //f(x)=\sqrt a x + \sqrt b
                        texte_corr = ` $f(x)=\\sqrt{${c}}x + \\sqrt{${d}}$<br>`
                        texte_corr += `On observe que la fonction $f$ s'écrit bien sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>`
                        texte_corr +=`Ici, on a : $a=\\sqrt{${c}}$ et $b=\\sqrt{${d}}$<br>`
                        texte_corr +=`$f$ est donc bien une fonction affine.<br>`                                 
                 break;    
                 case 5:
                        texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${a}x^{2}${ecriture_algebrique(c)} $`; //f(x)=ax²+c
                        texte_corr = ` $f(x)=${a}x^{2}${ecriture_algebrique(c)} $<br>`
                        texte_corr += `On observe que la fonction $f$ est du second degré, puisqu'il y a un terme en $x^{2}$<br>`
                        texte_corr += `Elle s'écrit sous la forme $f(x)= a x^{2}+b$ avec $a$ et $b$ des nombres réels, et non pas sous la forme $ax+b$.<br>`
                        texte_corr +=`$f$ n'est donc pas une fonction affine.<br>`  
                break;   
                case 6:
                        texte = `Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=\\dfrac{1}{${a}x${ecriture_algebrique(b)} }$`; //f(x)=1/(ax+b)
                        texte_corr = ` $f(x)=\\dfrac{1}{${a}x${ecriture_algebrique(b)} }$<br>`
                        texte_corr += `On observe que la fonction $f$ est une fonction rationnelle, puisqu'il y une fraction avec des termes en $x$ au dénominateur.<br>`
                        texte_corr += `Elle ne s'écrit  pas sous la forme $ax+b$.<br>`
                        texte_corr +=`$f$ n'est donc pas une fonction affine.<br>`      
                break;    
                case 7:
                        texte = `Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${tex_fraction_signe(1,a)}x+${tex_fraction_signe(1,e)} $`; //f(x)=1/ax+1/b
                        texte_corr = `$f(x)=${tex_fraction_signe(1,a)}x+${tex_fraction_signe(1,e)}$<br>`
                        texte_corr += `On observe que la fonction $f$ s'écrit bien sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>`
                        texte_corr +=`Ici, on a : $a=\\dfrac{1}{${a}}$ et $b=\\dfrac{1}{${e}}$<br>`
                        texte_corr +=`$f$ est donc bien une fonction affine.<br>` 
                break;
                case 8:
                        texte = `Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${c}\\times (${reduire_ax_plus_b(a,b)}) $`; //f(x)=k(ax+b)
                        texte_corr = `$f(x)=${c}\\times (${reduire_ax_plus_b(a,b)}) $<br>`
                        texte_corr += `On peut développer l'expression de $f$ et on obtient alors :<br>`
                        texte_corr += `$f(x)=${reduire_ax_plus_b(a*c,b*c)} $<br>`
                        texte_corr += `On observe que la fonction $f$ s'écrit bien sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>`
                        texte_corr +=`Ici, on a : $a=${ecriture_algebrique(a*c)}$ et $b=${ecriture_algebrique(b*c)}$<br>`
                        texte_corr +=`$f$ est donc bien une fonction affine.<br>` 
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
