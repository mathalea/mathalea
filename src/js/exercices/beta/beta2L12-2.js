import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,reduireAxPlusB,texte_en_couleur, texFractionSigne,texFractionReduite, ecritureAlgebrique} from '../../modules/outils.js'
import { fraction } from '../../modules/Fractions.js'
export const titre = 'Résoudre des équations se ramenant au produit-nul.'

/**
 * Résoudre des équations se ramenant au produit-nul
* @auteur Stéphane Guyon
* 2L12-2
*/
export default function Equations_presque_produit_null2() {
    'use strict';
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = titre;
    this.video = "";
    this.consigne = "Résoudre dans $\\mathbb R$ les équations suivantes :";
    this.nbCols = 1;
    this.nbColsCorr = 1;
    this.spacing = 1;
    this.spacingCorr = 1;
    this.nbQuestions = 3;
    this.spacingCorr = 3
    this.nbQuestions=5
    this.correctionDetailleeDisponible=true
    this.correctionDetaillee=true

    this.nouvelleVersion = function () {
        this.listeQuestions = []; // Liste de questions
        this.listeCorrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1,2,3,4,5];
        
        
        let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions);
        for (let i = 0, texte, texteCorr, cpt = 0, a, b, c, d, e, f,  k, f1,f2,type_de_questions; i < this.nbQuestions && cpt < 50;) {
            type_de_questions = listeTypeDeQuestions[i];
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
                        texte = ` ($${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c,d)})+(${reduireAxPlusB(a,b)})(${reduireAxPlusB(e,f)})=0$`;
                        texteCorr = ` $(${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c,d)})+(${reduireAxPlusB(a,b)})(${reduireAxPlusB(e,f)})=0$<br>`;
                        if (this.correctionDetaillee) {
                        texteCorr += ` On observe que $(${reduireAxPlusB(a,b)})$ est un facteur commun dans les deux termes :<br>`;  
                        texteCorr += ` $\\phantom{\\iff} (\\underline{${reduireAxPlusB(a,b)}})( ${reduireAxPlusB(c,d)})+(\\underline{${reduireAxPlusB(a,b)})}( ${reduireAxPlusB(e,f)})=0$<br>`;
                        texteCorr += ` $\\iff (\\underline{${reduireAxPlusB(a,b)}})\\Big(( ${reduireAxPlusB(c,d)})+(${reduireAxPlusB(e,f)})\\Big)=0$<br>`;  
                        }
                       texteCorr += ` $\\iff (${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c+e,d+f)})=0$<br>`; 
                       if (c+e==0){ 
                        texteCorr +=`$\\iff ${reduireAxPlusB(a,b)}=0$<br>`
                        texteCorr +=`$x=${texFractionSigne(-b,a)}$<br>`
                        texteCorr +=`L'équation admet une unique solution : $S=\\left\\{${texFractionReduite(-b,a)}\\right\\}$.`
                       }
                       else {
                       texteCorr += `On reconnaît une équation produit-nul, donc on applique la propriété :<br>`;
                       texteCorr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
                       texteCorr += ` $\\iff ${reduireAxPlusB(a,b)}=0\\quad$ ou bien $\\quad${reduireAxPlusB(c+e,d+f)}=0$<br>`; 
                       texteCorr += `$\\iff x=${texFractionSigne(-b,a)}\\quad$ ou $\\quad x=${texFractionSigne(-d-f,c+e)}$<br>
                       On en déduit :  `
                        if ((-d-f)/(c+e) < -b/a)    {
                        texteCorr += `$S=\\left\\{${texFractionReduite(-d-f,c+e)};${texFractionReduite(-b,a)}\\right\\}$`
                        }
                        else {
                            texteCorr += `$S=\\left\\{${texFractionReduite(-b,a)};${texFractionReduite(-d-f,c+e)}\\right\\}$`
                        }
                    }
            
                      
                     
                 break;
                 case 2: //(ax+b)(cx+d)+(ax+b)(ex+f)=0
                    texte = ` ($${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c,d)})-
                    ( ${reduireAxPlusB(a,b)})( ${reduireAxPlusB(e,f)})=0$`; 
                    texteCorr = ` $(${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c,d)})-
                    ( ${reduireAxPlusB(a,b)})( ${reduireAxPlusB(e,f)})=0$<br>`;
                    if (this.correctionDetaillee) {
                        texteCorr += ` On observe que $(${reduireAxPlusB(a,b)})$ est un facteur commun dans les deux termes :<br>`;  
                        texteCorr += ` $\\phantom{\\iff} (\\underline{${reduireAxPlusB(a,b)}})( ${reduireAxPlusB(c,d)})- (\\underline{${reduireAxPlusB(a,b)})}( ${reduireAxPlusB(e,f)})=0$<br>`;
                    texteCorr += ` $\\iff (\\underline{${reduireAxPlusB(a,b)}})\\Big(( ${reduireAxPlusB(c,d)})-( ${reduireAxPlusB(e,f)})\\Big)=0$<br>`;  
                    }
                    if (e>0) texteCorr += ` $\\iff (${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c,d)}${reduireAxPlusB(-e,-f)})=0$<br>`;
                    else texteCorr += ` $\\iff (${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c,d)}+${reduireAxPlusB(-e,-f)})=0$<br>`;
                    texteCorr += ` $\\iff (${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c-e,d-f)})=0$<br>`; 
                    if (c-e==0){ 
                    texteCorr +=`$\\iff ${reduireAxPlusB(a,b)}=0$<br>`
                    texteCorr +=`$x=${texFractionSigne(-b,a)}$<br>`
                    texteCorr +=`L'équation admet une unique solution : $S=\\left\\{${texFractionReduite(-b,a)}\\right\\}$.`
                   }
                   else {
                       texteCorr += `On reconnaît une équation produit-nul, donc on applique la propriété :<br>`;
                   texteCorr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
                   texteCorr += ` $\\iff ${reduireAxPlusB(a,b)}=0\\quad$ ou bien $\\quad${reduireAxPlusB(c-e,d-f)}=0$<br>`; 
                   texteCorr += `$\\iff x=${texFractionSigne(-b,a)}\\quad$ ou $\\quad x=${texFractionSigne(-d+f,c-e)}$<br>
                   On en déduit :  `
                    if ((-d+f)/(c-e) < -b/a)    {
                    texteCorr += `$S=\\left\\{${texFractionReduite(-d+f,c-e)};${texFractionReduite(-b,a)}\\right\\}$`
                    }
                    else {
                        texteCorr += `$S=\\left\\{${texFractionReduite(-b,a)};${texFractionReduite(-d+f,c-e)}\\right\\}$`
                    }
                    }
                  
                 
             break;  
                case 3: //(ax+b)²+(ax+b)(ex+f)=0
                texte = ` ($${reduireAxPlusB(a,b)})^{2}+(${reduireAxPlusB(a,b)})(${reduireAxPlusB(e,f)})=0$`; 
                texteCorr = ` $(${reduireAxPlusB(a,b)})^{2}+(${reduireAxPlusB(a,b)})(${reduireAxPlusB(e,f)})=0$<br>`;
                texteCorr += ` $(${reduireAxPlusB(a,b)})(${reduireAxPlusB(a,b)})+(${reduireAxPlusB(a,b)})(${reduireAxPlusB(e,f)})=0$<br>`;
                    if (this.correctionDetaillee){
                texteCorr += ` On observe que $(${reduireAxPlusB(a,b)})$ est un facteur commun dans les deux termes :<br>`;  
                texteCorr += ` $\\phantom{\\iff} (\\underline{${reduireAxPlusB(a,b)}})(${reduireAxPlusB(a,b)})+(\\underline{${reduireAxPlusB(a,b)})}( ${reduireAxPlusB(e,f)})=0$<br>`;
                texteCorr += ` $\\iff (\\underline{${reduireAxPlusB(a,b)}})\\Big((${reduireAxPlusB(a,b)})+(${reduireAxPlusB(e,f)})\\Big)=0$<br>`;  
            }
                if (e<0) texteCorr += ` $\\iff (${reduireAxPlusB(a,b)})( ${reduireAxPlusB(a,b)})${reduireAxPlusB(e,f)})=0$<br>`; 
                else  texteCorr += ` $\\iff (${reduireAxPlusB(a,b)})( ${reduireAxPlusB(a,b)})+${reduireAxPlusB(e,f)})=0$<br>`; 
                texteCorr += ` $\\iff (${reduireAxPlusB(a,b)})( ${reduireAxPlusB(a+e,b+f)})=0$<br>`; 
               if (a+e==0){ 
                texteCorr +=`$\\iff ${reduireAxPlusB(a,b)}=0$<br>`
                texteCorr +=`$x=${texFractionSigne(-b,a)}$<br>`
                texteCorr +=`L'équation admet une unique solution : $S=\\left\\{${texFractionReduite(-b,a)}\\right\\}$.`
               }
               else {
               texteCorr += `On reconnaît une équation produit-nul, donc on applique la propriété :<br>`;
               texteCorr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
               texteCorr += ` $\\iff ${reduireAxPlusB(a,b)}=0\\quad$ ou bien $\\quad${reduireAxPlusB(a+e,b+f)}=0$<br>`; 
               texteCorr += `$\\iff x=${texFractionSigne(-b,a)}\\quad$ ou $\\quad x=${texFractionSigne(-b-f,a+e)}$<br>
               On en déduit :  `
                if ((-b-f)/(a+e) < -b/a)    {
                texteCorr += `$S=\\left\\{${texFractionReduite(-b-f,a+e)};${texFractionReduite(-b,a)}\\right\\}$`
                }
                else {
                    texteCorr += `$S=\\left\\{${texFractionReduite(-b,a)};${texFractionReduite(-b-f,a+e)}\\right\\}$`
                }
            }
    
              
             
         break;  
        case 4: //(ax+b)(cx+d)-(ax+b)²=0
            texte = ` ($${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c,d)})-(${reduireAxPlusB(a,b)})^{2}=0$`; 
            texteCorr = ` ($${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c,d)})-(${reduireAxPlusB(a,b)})^{2}=0$<br>`;
            texteCorr += ` ($${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c,d)})-(${reduireAxPlusB(a,b)})( ${reduireAxPlusB(a,b)})=0$<br>`;
            if (this.correctionDetaillee){
            texteCorr += ` On observe que $(${reduireAxPlusB(a,b)})$ est un facteur commun dans les deux termes :<br>`;  
            texteCorr += ` $\\phantom{\\iff} (\\underline{${reduireAxPlusB(a,b)}})( ${reduireAxPlusB(c,d)})-(\\underline{${reduireAxPlusB(a,b)})}( ${reduireAxPlusB(a,b)})=0$<br>`;
            texteCorr += ` $\\iff (\\underline{${reduireAxPlusB(a,b)}})\\Big(( ${reduireAxPlusB(c,d)})-( ${reduireAxPlusB(a,b)})\\Big)=0$<br>`;  
            }
            if (a>0) texteCorr += ` $\\iff (${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c,d)}${reduireAxPlusB(-a,-b)}))=0$<br>`;   
            else texteCorr += ` $\\iff (${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c,d)}+${reduireAxPlusB(-a,-b)}))=0$<br>`;   
            texteCorr += ` $\\iff (${reduireAxPlusB(a,b)})( ${reduireAxPlusB(c-a,d-b)})=0$<br>`; 
            if (c-a==0){ 
            texteCorr +=`$\\iff ${reduireAxPlusB(a,b)}=0$<br>`
            texteCorr +=`$x=${texFractionSigne(-b,a)}$<br>`
            texteCorr +=`L'équation admet une unique solution : $S=\\left\\{${texFractionReduite(-b,a)}\\right\\}$.`
           }
           else {
               texteCorr += `On reconnaît une équation produit-nul, donc on applique la propriété :<br>`;
           texteCorr += `${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
           texteCorr += ` $\\iff ${reduireAxPlusB(a,b)}=0\\quad$ ou bien $\\quad${reduireAxPlusB(c-a,d-b)}=0$<br>`; 
           texteCorr += `$\\iff x=${texFractionSigne(-b,a)}\\quad$ ou $\\quad x=${texFractionSigne(-d+b,c-a)}$<br>
           On en déduit :  `
            if ((-d+b)/(c-b) < -b/a)    {
            texteCorr += `$S=\\left\\{${texFractionReduite(-d+b,c-a)};${texFractionReduite(-b,a)}\\right\\}$`
            }
            else {
                texteCorr += `$S=\\left\\{${texFractionReduite(-b,a)};${texFractionReduite(-d+b,c-a)}\\right\\}$`
            }
            }
          
         
     break;        
     
     case 5: // (ax+b)(cx+d)=(ax+b)(ex+f)
        texte = `$(${reduireAxPlusB(a,b)})(${reduireAxPlusB(c,d)})=(${reduireAxPlusB(a,b)})(${reduireAxPlusB(e,f)})$`; 
        texteCorr=`Deux nombres sont égaux si et seulement si leur différence est nulle.<br>`
        texteCorr+=`$\\phantom{\\iff}(${reduireAxPlusB(a,b)})(${reduireAxPlusB(c,d)})=(${reduireAxPlusB(a,b)})(${reduireAxPlusB(e,f)})$<br>`; 
        texteCorr+=`$\\iff (${reduireAxPlusB(a,b)})(${reduireAxPlusB(c,d)})-(${reduireAxPlusB(a,b)})(${reduireAxPlusB(e,f)})=0$<br>`
        if (this.correctionDetaillee){
        texteCorr += ` On observe que $(${reduireAxPlusB(a,b)})$ est un facteur commun dans les deux termes :<br>`;  
        texteCorr+= `$\\phantom{\\iff}(\\underline{${reduireAxPlusB(a,b)}})(${reduireAxPlusB(c,d)})-(\\underline{${reduireAxPlusB(a,b)}})(${reduireAxPlusB(e,f)})=0$<br>`
        texteCorr += `$\\iff (\\underline{${reduireAxPlusB(a,b)}})\\Big((${reduireAxPlusB(c,d)})-(${reduireAxPlusB(e,f)})\\Big)=0$<br>`
        }
        if (e<0){
            texteCorr += `$\\iff (${reduireAxPlusB(a,b)})(${reduireAxPlusB(c,d)}+${reduireAxPlusB(-e,-f)})=0$<br>`
        }
       else {
                texteCorr += `$\\iff (${reduireAxPlusB(a,b)})(${reduireAxPlusB(c,d)}${reduireAxPlusB(-e,-f)})=0$<br>`
            }
        texteCorr += `$\\iff (${reduireAxPlusB(a,b)})(${reduireAxPlusB(c-e,d-f)})=0$<br>`
        texteCorr += `On reconnaît une équation produit-nul, donc on applique la propriété :<br>
        ${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
        texteCorr +=`$(${reduireAxPlusB(a,b)})(${reduireAxPlusB(c-e,d-f)})=0$<br>`
        texteCorr+=`$\\iff ${reduireAxPlusB(a,b)}=0$ ou $${reduireAxPlusB(c-e,d-f)}=0$<br>`
        if (this.correctionDetaillee) { //on ajoute les étapes de résolution si la correction détaillée est cochée.
            texteCorr+=`$\\iff ${reduireAxPlusB(a,0)}=${-b}$ ou $ ${reduireAxPlusB(c-e,0)}=${-d+f}$<br>`
        }
        f1=fraction(-b,a)
        f2=fraction(-d+f,c-e)
        texteCorr+=`$\\iff x=${f1.texFraction}$ ou $ x=${f2.texFraction}$<br>On en déduit :  `
        if (-b/a>(-d+f)/(c-e)) {
            texteCorr += `$S=\\left\\{${f2.simplifie().texFraction};${f1.simplifie().texFraction}\\right\\}$`
        }
        else if (-b/a<(-d+f)/(c-e)){
            texteCorr += `$S=\\left\\{${f1.simplifie().texFraction};${f2.simplifie().texFraction}\\right\\}$`
        }
        else texteCorr += `$S=\\left\\{${f1.simplifie().texFraction}\\right\\}$`
        break
     
            }
            if (this.listeQuestions.indexOf(texte) == -1) {
                // Si la question n'a jamais été posée, on en créé une autre
                this.listeQuestions.push(texte);
                this.listeCorrections.push(texteCorr);
                i++;
            }
            cpt++;
        }
        listeQuestionsToContenu(this);
    };
   
}
