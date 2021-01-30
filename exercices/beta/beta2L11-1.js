import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,reduire_ax_plus_b,ecriture_algebrique} from "/modules/outils.js"

/**
 * Factoriser avec a²-b² avec a ou b expression algébrique 1er degré
* @auteur Stéphane Guyon
* 2L11-1
*/
export default function Factoriser_Identites_remarquables2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Factoriser avec les identités remarquables (niveau II)";
    this.consigne = "Factoriser les expressions suivantes.";
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.nb_questions = 3;
    this.sup = 1;

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
             let type_de_questions_disponibles = [];
        if (this.sup == 1) {
            type_de_questions_disponibles = [1]; // (ax+b)²-c²
        }
        if (this.sup == 2) {
            type_de_questions_disponibles = [2]; // c²-(ax+b)²
        }
        if (this.sup ==3) {
            type_de_questions_disponibles = [3]; // (ax+b)²-(cx+d)²
        }
        if (this.sup ==4) {
            type_de_questions_disponibles = [1,2,3]; //méli-mélo
        }
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, k, fraction = [], ns, ds, type_de_questions; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            k = choice([-1, 1]); 
			a = randint(2, 9);
            a = a * k;
            b = randint(1, 9);
            k = choice([-1, 1]); 
            b = b * k;
            c = randint(1, 9);
            d = randint(1, 9);
            k = choice([-1, 1]); 
            d = d * k;
            if (a==c&&b==d)     {
                a==a+1;
                b==b-2;
            }
            switch (type_de_questions) {
                case 1:
                    texte = `$(${a}x${ecriture_algebrique(b)})^2-${c*c}$`; // (ax+b)²-c²
                    texte_corr = `$(${a}x${ecriture_algebrique(b)})^2-${c*c}=(${a}x${ecriture_algebrique(b)})^2-${c}^2$<br>
                    On reconnaît l'identité remarquable $a^2-b^2=(\\color{red}a\\color{black}-\\color{blue}b)(\\color{red}a\\color{black}+\\color{blue}b)$, avec $a=\\color{red}${a}x${ecriture_algebrique(b)}$ et $b=\\color{blue}${c}$<br>
                    $(${a}x${ecriture_algebrique(b)})^2-${c*c}=\\left(\\color{red} (${a}x${ecriture_algebrique(b)})\\color{black}-\\color{blue} ${c}\\right) \\left(\\color{red}(${a}x${ecriture_algebrique(b)})\\color{black}+\\color{blue}${c}\\right)$<br>
                    d'où, après réduction : $(${a}x${ecriture_algebrique(b)})^2-${c*c}=(${reduire_ax_plus_b(a,b-c)}) (${reduire_ax_plus_b(a,b+c)})$`;
                   
                    break;
                case 2:
                    texte = `$${c*c}-(${a}x${ecriture_algebrique(b)})^2$`; // c²-(ax+b)²
                    texte_corr = `$${c*c}-(${a}x${ecriture_algebrique(b)})^2=${c}^2-(${a}x${ecriture_algebrique(b)})^2$<br>
                    On reconnaît l'identité remarquable $a^2-b^2=(\\color{red}a\\color{black}-\\color{blue}b)(\\color{red}a\\color{black}+\\color{blue}b)$, avec $a=\\color{blue}${c}$ et $b=\\color{red}${a}x${ecriture_algebrique(b)}$. <br>
                    $${c*c}-(${a}x${ecriture_algebrique(b)})^2=\\left(\\color{blue}${c}\\color{black}-(\\color{red}${a}x${ecriture_algebrique(b)}\\color{black})\\right) \\left(\\color{blue}${c}\\color{black}+(\\color{red}${a}x${ecriture_algebrique(b)}\\color{black})\\right)$<br>
                    $\\phantom{${c*c}-(${a}x${ecriture_algebrique(b)})^2}=(${c}${ecriture_algebrique(-a)}x${ecriture_algebrique(-b)}) (${c}${ecriture_algebrique(a)}x${ecriture_algebrique(b)})$<br>
                    d'où, après réduction : $${c*c}-(${a}x${ecriture_algebrique(b)})^2=(${reduire_ax_plus_b(-a,c-b)}) (${reduire_ax_plus_b(a,b+c)})$`;
                    break;
                case 3:
                    texte = `$(${a}x${ecriture_algebrique(b)})^2-(${c}x${ecriture_algebrique(d)})^2$`; // (ax+b)²-(cx+d)²
                    texte_corr = `On reconnaît l'identité remarquable $a^2-b^2$ :<br>
                    $(${a}x${ecriture_algebrique(b)})^2-(${c}x${ecriture_algebrique(d)})^2=a^2-b^2$<br> 
                    avec $a=\\color{red}${a}x${ecriture_algebrique(b)}$ et $b=\\color{blue}${c}x${ecriture_algebrique(d)}$ . <br>
                    On applique $a^2-b^2=(\\color{red}a\\color{black}-\\color{blue}b\\color{black})(\\color{red}a\\color{black}+\\color{blue}b\\color{black})$, <br>
                    $(${a}x${ecriture_algebrique(b)})^2-(${c}x${ecriture_algebrique(d)})^2=
                    (\\color{red}${a}x${ecriture_algebrique(b)}\\color{black})-
                    (\\color{blue}${c}x${ecriture_algebrique(d)}\\color{black})
                    (\\color{red}${a}x${ecriture_algebrique(b)}\\color{black})+
                    (\\color{blue}${c}x${ecriture_algebrique(d)}\\color{black})$<br>
                    $\\phantom{(${a}x${ecriture_algebrique(b)})^2-(${c}x${ecriture_algebrique(d)})^2}=
                    (${a}x${ecriture_algebrique(b)}${ecriture_algebrique(-c)}x${ecriture_algebrique(-d)})
                    (${a}x${ecriture_algebrique(b)}${ecriture_algebrique(c)}x${ecriture_algebrique(d)})$<br>`
                    if (a!= c && b!= d&&a!=-c&&b!=-d) {
                        texte_corr +=`$\\phantom{(${a}x${ecriture_algebrique(b)})^2-(${c}x${ecriture_algebrique(d)})^2}=
                        (${reduire_ax_plus_b(a-c,b-d)})(${reduire_ax_plus_b(a+c,b+d)})$  `}
                        else {
                            if (a!= c &&  a!= -c && b== d&& a!=c+1) {
                                texte_corr +=`$\\phantom{(${a}x${ecriture_algebrique(b)})^2-(${c}x${ecriture_algebrique(d)})^2}=
                                ${a-c}x(${reduire_ax_plus_b(a+c,b+d)})$    ` }   
                            if (a!= c &&  a!= -c && b== d&& a==c+1) {
                                texte_corr +=`$\\phantom{(${a}x${ecriture_algebrique(b)})^2-(${c}x${ecriture_algebrique(d)})^2}=
                                x(${reduire_ax_plus_b(a+c,b+d)})$    ` }      
                            if (a!= c &&  a!= -c && b== -d) {
                                    texte_corr +=`$\\phantom{(${a}x${ecriture_algebrique(b)})^2-(${c}x${ecriture_algebrique(d)})^2}=
                                    ${a+c}x(${reduire_ax_plus_b(a-c,b-d)})$  `   }  
                            if (a== c  && b!= d &&b!=-d) {
                                    texte_corr +=`$\\phantom{(${a}x${ecriture_algebrique(b)})^2-(${c}x${ecriture_algebrique(d)})^2}=
                                    ${b-d}(${reduire_ax_plus_b(a+c,b+d)})$  `   }    
                            if (a== -c  && b!= d && b!=-d) {
                                    texte_corr +=`$\\phantom{(${a}x${ecriture_algebrique(b)})^2-(${c}x${ecriture_algebrique(d)})^2}=
                                    ${b+d}(${reduire_ax_plus_b(a-c,b-d)})$  `   }                   
                           }   ;
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
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 :forme (ax+b)²-c²\n 2 : forme c²-(ax+b)²\n 3 : (ax+b)²-(cx+d)²\n 4 : méli-mélo'];
}
