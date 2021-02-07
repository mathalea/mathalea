import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,reduire_ax_plus_b,texte_en_couleur, tex_fraction_signe,tex_fraction_reduite, ecriture_algebrique} from "/modules/outils.js"
import { fraction } from "/modules/Fractions.js"
/**
 * Résoudre des équations se ramenant au produit-nul
* @auteur Stéphane Guyon
* 2L12-2
*/
export default function Equations_presque_produit_null2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Résoudre des équations se ramenant au produit-nul.";
    this.video = "";
    this.consigne = "Résoudre dans $\\mathbb R$ les équations suivantes :";
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.nb_questions = 3;
    this.spacing_corr = 3
    this.nb_questions=5
    this.correction_detaillee_disponible=true
    this.correction_detaillee=true

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1,2,3,4,5];
        
        
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, e, f,  k, f1,f2,type_de_questions; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            k = choice([-1, 1]); 
			a = randint(2, 9);
            a = a * k;
            b = randint(1, 9);
            k = choice([-1, 1]); 
            b = b * k;
            c = randint(1, 9);
            k= choice([-1, 1]); 
            c = c * k;
            d = randint(1, 9);
            k = choice([-1, 1]); 
            d = d * k;
            e = randint(1, 9);
            k = choice([-1, 1]); 
            e = e * k;
            f = randint(1, 9);
            k = choice([-1, 1]); 
            f = f * k;
           
            if (d-f==0&&c-e==0){
                d=d+1;
            };
            if (d+f==0&&c+e==0){
                d=d+1;
            };
               
            switch (type_de_questions) {
                case 1: // (ax+b)(cx+d)+(ax+b)(ex+f)=0
                        texte = ` ($${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c,d)})+(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(e,f)})=0$`;
                        texte_corr = ` $(${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c,d)})+(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(e,f)})=0$<br>`;
                        if (this.correction_detaillee) {
                        texte_corr += ` On observe que $(${reduire_ax_plus_b(a,b)})$ est un facteur commun dans les deux termes :<br>`;  
                        texte_corr += ` $\\phantom{\\iff} (\\underline{${reduire_ax_plus_b(a,b)}})( ${reduire_ax_plus_b(c,d)})+(\\underline{${reduire_ax_plus_b(a,b)})}( ${reduire_ax_plus_b(e,f)})=0$<br>`;
                        texte_corr += ` $\\iff (\\underline{${reduire_ax_plus_b(a,b)}})\\Big(( ${reduire_ax_plus_b(c,d)})+(${reduire_ax_plus_b(e,f)})\\Big)=0$<br>`;  
                        }
                       texte_corr += ` $\\iff (${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c+e,d+f)})=0$<br>`; 
                       if (c+e==0){ 
                        texte_corr +=`$\\iff ${reduire_ax_plus_b(a,b)}=0$<br>`
                        texte_corr +=`$x=${tex_fraction_signe(-b,a)}$<br>`
                        texte_corr +=`L'équation admet une unique solution : $S=\\left\\{${tex_fraction_reduite(-b,a)}\\right\\}$.`
                       }
                       else {
                       texte_corr += `On reconnaît une équation produit-nul, donc on applique la propriété :<br>`;
                       texte_corr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
                       texte_corr += ` $\\iff ${reduire_ax_plus_b(a,b)}=0\\quad$ ou bien $\\quad${reduire_ax_plus_b(c+e,d+f)}=0$<br>`; 
                       texte_corr += `$\\iff x=${tex_fraction_signe(-b,a)}\\quad$ ou $\\quad x=${tex_fraction_signe(-d-f,c+e)}$<br>
                       On en déduit :  `
                        if ((-d-f)/(c+e) < -b/a)    {
                        texte_corr += `$S=\\left\\{${tex_fraction_reduite(-d-f,c+e)};${tex_fraction_reduite(-b,a)}\\right\\}$`
                        }
                        else {
                            texte_corr += `$S=\\left\\{${tex_fraction_reduite(-b,a)};${tex_fraction_reduite(-d-f,c+e)}\\right\\}$`
                        }
                    }
            
                      
                     
                 break;
                 case 2: //(ax+b)(cx+d)+(ax+b)(ex+f)=0
                    texte = ` ($${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c,d)})-
                    ( ${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(e,f)})=0$`; 
                    texte_corr = ` $(${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c,d)})-
                    ( ${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(e,f)})=0$<br>`;
                    if (this.correction_detaillee) {
                        texte_corr += ` On observe que $(${reduire_ax_plus_b(a,b)})$ est un facteur commun dans les deux termes :<br>`;  
                        texte_corr += ` $\\phantom{\\iff} (\\underline{${reduire_ax_plus_b(a,b)}})( ${reduire_ax_plus_b(c,d)})- (\\underline{${reduire_ax_plus_b(a,b)})}( ${reduire_ax_plus_b(e,f)})=0$<br>`;
                    texte_corr += ` $\\iff (\\underline{${reduire_ax_plus_b(a,b)}})\\Big(( ${reduire_ax_plus_b(c,d)})-( ${reduire_ax_plus_b(e,f)})\\Big)=0$<br>`;  
                    }
                    if (e>0) texte_corr += ` $\\iff (${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c,d)}${reduire_ax_plus_b(-e,-f)})=0$<br>`;
                    else texte_corr += ` $\\iff (${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c,d)}+${reduire_ax_plus_b(-e,-f)})=0$<br>`;
                    texte_corr += ` $\\iff (${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c-e,d-f)})=0$<br>`; 
                    if (c-e==0){ 
                    texte_corr +=`$\\iff ${reduire_ax_plus_b(a,b)}=0$<br>`
                    texte_corr +=`$x=${tex_fraction_signe(-b,a)}$<br>`
                    texte_corr +=`L'équation admet une unique solution : $S=\\left\\{${tex_fraction_reduite(-b,a)}\\right\\}$.`
                   }
                   else {
                       texte_corr += `On reconnaît une équation produit-nul, donc on applique la propriété :<br>`;
                   texte_corr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
                   texte_corr += ` $\\iff ${reduire_ax_plus_b(a,b)}=0\\quad$ ou bien $\\quad${reduire_ax_plus_b(c-e,d-f)}=0$<br>`; 
                   texte_corr += `$\\iff x=${tex_fraction_signe(-b,a)}\\quad$ ou $\\quad x=${tex_fraction_signe(-d+f,c-e)}$<br>
                   On en déduit :  `
                    if ((-d+f)/(c-e) < -b/a)    {
                    texte_corr += `$S=\\left\\{${tex_fraction_reduite(-d+f,c-e)};${tex_fraction_reduite(-b,a)}\\right\\}$`
                    }
                    else {
                        texte_corr += `$S=\\left\\{${tex_fraction_reduite(-b,a)};${tex_fraction_reduite(-d+f,c-e)}\\right\\}$`
                    }
                    }
                  
                 
             break;  
                case 3: //(ax+b)²+(ax+b)(ex+f)=0
                texte = ` ($${reduire_ax_plus_b(a,b)})^{2}+(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(e,f)})=0$`; 
                texte_corr = ` $(${reduire_ax_plus_b(a,b)})^{2}+(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(e,f)})=0$<br>`;
                texte_corr += ` $(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(a,b)})+(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(e,f)})=0$<br>`;
                    if (this.correction_detaillee){
                texte_corr += ` On observe que $(${reduire_ax_plus_b(a,b)})$ est un facteur commun dans les deux termes :<br>`;  
                texte_corr += ` $\\phantom{\\iff} (\\underline{${reduire_ax_plus_b(a,b)}})(${reduire_ax_plus_b(a,b)})+(\\underline{${reduire_ax_plus_b(a,b)})}( ${reduire_ax_plus_b(e,f)})=0$<br>`;
                texte_corr += ` $\\iff (\\underline{${reduire_ax_plus_b(a,b)}})\\Big((${reduire_ax_plus_b(a,b)})+(${reduire_ax_plus_b(e,f)})\\Big)=0$<br>`;  
            }
                if (e<0) texte_corr += ` $\\iff (${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(a,b)})${reduire_ax_plus_b(e,f)})=0$<br>`; 
                else  texte_corr += ` $\\iff (${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(a,b)})+${reduire_ax_plus_b(e,f)})=0$<br>`; 
                texte_corr += ` $\\iff (${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(a+e,b+f)})=0$<br>`; 
               if (a+e==0){ 
                texte_corr +=`$\\iff ${reduire_ax_plus_b(a,b)}=0$<br>`
                texte_corr +=`$x=${tex_fraction_signe(-b,a)}$<br>`
                texte_corr +=`L'équation admet une unique solution : $S=\\left\\{${tex_fraction_reduite(-b,a)}\\right\\}$.`
               }
               else {
               texte_corr += `On reconnaît une équation produit-nul, donc on applique la propriété :<br>`;
               texte_corr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
               texte_corr += ` $\\iff ${reduire_ax_plus_b(a,b)}=0\\quad$ ou bien $\\quad${reduire_ax_plus_b(a+e,b+f)}=0$<br>`; 
               texte_corr += `$\\iff x=${tex_fraction_signe(-b,a)}\\quad$ ou $\\quad x=${tex_fraction_signe(-b-f,a+e)}$<br>
               On en déduit :  `
                if ((-b-f)/(a+e) < -b/a)    {
                texte_corr += `$S=\\left\\{${tex_fraction_reduite(-b-f,a+e)};${tex_fraction_reduite(-b,a)}\\right\\}$`
                }
                else {
                    texte_corr += `$S=\\left\\{${tex_fraction_reduite(-b,a)};${tex_fraction_reduite(-b-f,a+e)}\\right\\}$`
                }
            }
    
              
             
         break;  
        case 4: //(ax+b)(cx+d)-(ax+b)²=0
            texte = ` ($${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c,d)})-(${reduire_ax_plus_b(a,b)})^{2}=0$`; 
            texte_corr = ` ($${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c,d)})-(${reduire_ax_plus_b(a,b)})^{2}=0$<br>`;
            texte_corr += ` ($${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c,d)})-(${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(a,b)})=0$<br>`;
            if (this.correction_detaillee){
            texte_corr += ` On observe que $(${reduire_ax_plus_b(a,b)})$ est un facteur commun dans les deux termes :<br>`;  
            texte_corr += ` $\\phantom{\\iff} (\\underline{${reduire_ax_plus_b(a,b)}})( ${reduire_ax_plus_b(c,d)})-(\\underline{${reduire_ax_plus_b(a,b)})}( ${reduire_ax_plus_b(a,b)})=0$<br>`;
            texte_corr += ` $\\iff (\\underline{${reduire_ax_plus_b(a,b)}})\\Big(( ${reduire_ax_plus_b(c,d)})-( ${reduire_ax_plus_b(a,b)})\\Big)=0$<br>`;  
            }
            if (a>0) texte_corr += ` $\\iff (${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c,d)}${reduire_ax_plus_b(-a,-b)}))=0$<br>`;   
            else texte_corr += ` $\\iff (${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c,d)}+${reduire_ax_plus_b(-a,-b)}))=0$<br>`;   
            texte_corr += ` $\\iff (${reduire_ax_plus_b(a,b)})( ${reduire_ax_plus_b(c-a,d-b)})=0$<br>`; 
            if (c-a==0){ 
            texte_corr +=`$\\iff ${reduire_ax_plus_b(a,b)}=0$<br>`
            texte_corr +=`$x=${tex_fraction_signe(-b,a)}$<br>`
            texte_corr +=`L'équation admet une unique solution : $S=\\left\\{${tex_fraction_reduite(-b,a)}\\right\\}$.`
           }
           else {
               texte_corr += `On reconnaît une équation produit-nul, donc on applique la propriété :<br>`;
           texte_corr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
           texte_corr += ` $\\iff ${reduire_ax_plus_b(a,b)}=0\\quad$ ou bien $\\quad${reduire_ax_plus_b(c-a,d-b)}=0$<br>`; 
           texte_corr += `$\\iff x=${tex_fraction_signe(-b,a)}\\quad$ ou $\\quad x=${tex_fraction_signe(-d+b,c-a)}$<br>
           On en déduit :  `
            if ((-d+b)/(c-b) < -b/a)    {
            texte_corr += `$S=\\left\\{${tex_fraction_reduite(-d+b,c-a)};${tex_fraction_reduite(-b,a)}\\right\\}$`
            }
            else {
                texte_corr += `$S=\\left\\{${tex_fraction_reduite(-b,a)};${tex_fraction_reduite(-d+b,c-a)}\\right\\}$`
            }
            }
          
         
     break;        
     
     case 5: // (ax+b)(cx+d)=(ax+b)(ex+f)
        texte = `$(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)})=(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(e,f)})$`; 
        texte_corr=`Deux nombres sont égaux si et seulement si leur différence est nulle.<br>`
        texte_corr+=`$\\phantom{\\iff}(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)})=(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(e,f)})$<br>`; 
        texte_corr+=`$\\iff (${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)})-(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(e,f)})=0$<br>`
        if (this.correction_detaillee){
        texte_corr += ` On observe que $(${reduire_ax_plus_b(a,b)})$ est un facteur commun dans les deux termes :<br>`;  
        texte_corr+= `$\\phantom{\\iff}(\\underline{${reduire_ax_plus_b(a,b)}})(${reduire_ax_plus_b(c,d)})-(\\underline{${reduire_ax_plus_b(a,b)}})(${reduire_ax_plus_b(e,f)})=0$<br>`
        texte_corr += `$\\iff (\\underline{${reduire_ax_plus_b(a,b)}})\\Big((${reduire_ax_plus_b(c,d)})-(${reduire_ax_plus_b(e,f)})\\Big)=0$<br>`
        }
        if (e<0){
            texte_corr += `$\\iff (${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)}+${reduire_ax_plus_b(-e,-f)})=0$<br>`
        }
       else {
                texte_corr += `$\\iff (${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)}${reduire_ax_plus_b(-e,-f)})=0$<br>`
            }
        texte_corr += `$\\iff (${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c-e,d-f)})=0$<br>`
        texte_corr += `On reconnaît une équation produit-nul, donc on applique la propriété :<br>
        ${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
        texte_corr +=`$(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c-e,d-f)})=0$<br>`
        texte_corr+=`$\\iff ${reduire_ax_plus_b(a,b)}=0$ ou $${reduire_ax_plus_b(c-e,d-f)}=0$<br>`
        if (this.correction_detaillee) { //on ajoute les étapes de résolution si la correction détaillée est cochée.
            texte_corr+=`$\\iff ${reduire_ax_plus_b(a,0)}=${-b}$ ou $ ${reduire_ax_plus_b(c-e,0)}=${-d+f}$<br>`
        }
        f1=fraction(-b,a)
        f2=fraction(-d+f,c-e)
        texte_corr+=`$\\iff x=${f1.texFraction}$ ou $ x=${f2.texFraction}$<br>On en déduit :  `
        if (-b/a>(-d+f)/(c-e)) {
            texte_corr += `$S=\\left\\{${f2.simplifie().texFraction};${f1.simplifie().texFraction}\\right\\}$`
        }
        else if (-b/a<(-d+f)/(c-e)){
            texte_corr += `$S=\\left\\{${f1.simplifie().texFraction};${f2.simplifie().texFraction}\\right\\}$`
        }
        else texte_corr += `$S=\\left\\{${f1.simplifie().texFraction}\\right\\}$`
        break
     
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
