import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,reduire_ax_plus_b,texte_en_couleur,choice, ecriture_algebrique,ecriture_nombre_relatif} from "/modules/outils.js"
import {fraction,obtenir_liste_Fractions_irreductibles_faciles} from "/modules/Fractions.js"
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
    this.nb_questions = 2
    this.correction_detaillee_disponible=true
    this.correction_detaillee=true

    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
             let type_de_questions_disponibles = [];
        if (this.sup <5) {
            type_de_questions_disponibles = [parseInt(this.sup)];
      }
      else {
        type_de_questions_disponibles = [1,2,3,4];
      }
     
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, e,f, fractions,index,f1,f2,f3,f4,type_de_questions; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
			a = randint(-9, 9,0);
            b = randint(-9, 9,0);
            c = randint(-9, 9,[0,a]);
            d = randint(1, 9,[0,b]);
            e = randint(-9, 9,[0,a,c]);
            f = randint(1, 9,[0,b,d]);
            
                 
            switch (type_de_questions) {
                case 1:
                    texte = `$(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)})=0$`; 
                    texte_corr = `On reconnaît une équation produit-nul, donc on applique la propriété :<br>
                    ${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
                    texte_corr +=texte+'<br>' //optimisation du code
                    texte_corr+=`$\\iff ${reduire_ax_plus_b(a,b)}=0$ ou $${reduire_ax_plus_b(c,d)}=0$<br>`
                    if (this.correction_detaillee) { //on ajoute les étapes de résolution si la correction détaillée est cochée.
                        texte_corr+=`$\\iff ${a}x=${-b}$ ou $ ${c}x=${-d}$<br>`
                    }
                    f1=fraction(-b,a)
                    f2=fraction(-d,c)
                    texte_corr+=`$\\iff x=${f1.texFraction}$ ou $ x=${f2.texFraction}$<br>On en déduit :  `
                    if (-b/a>-d/c) {
                        texte_corr += `$S=\\left\\{${f2.simplifie().texFraction};${f1.simplifie().texFraction}\\right\\}$`
                    }
                    else if (-b/a<-d/c){
                        texte_corr += `$S=\\left\\{${f1.simplifie().texFraction};${f2.simplifie().texFraction}\\right\\}$`
                    }
                    else texte_corr += `$S=\\left\\{${f1.simplifie().texFraction}\\right\\}$`
                   
                    break;
                case 2:
                    fractions=obtenir_liste_Fractions_irreductibles_faciles()
                    index =randint(0,fractions.length-1)
                    f1=fractions[index]
                    index=randint(0,fractions.length-1,index)
                    f2=fractions[index]
                    f3=f1.inverse().multiplieEntier(-b)
                    f4=f2.inverse().multiplieEntier(-d)
                    texte =`$(${f1.texFraction}x${ecriture_algebrique(b)})(${f2.texFraction}x${ecriture_algebrique(d)})=0$`
                    texte_corr = `On reconnaît une équation produit-nul, donc on applique la propriété :<br>
                    ${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>
                    $(${f1.texFraction}x${ecriture_algebrique(b)})(${f2.texFraction}x${ecriture_algebrique(d)})=0$<br>`
                    texte_corr+=`$\\iff ${f1.texFraction}x${ecriture_algebrique(b)}=0$ ou $${f2.texFraction}x${ecriture_algebrique(d)}=0$<br>`
                    if (this.correction_detaillee){
                        texte_corr+=`$\\iff ${f1.texFraction}x=${-b}$ ou $${f2.texFraction}x=${-d}$<br>`
                        texte_corr+=`$\\iff x=${-b}\\div ${f1.texFraction}$ ou $x=${-d}\\div ${f2.texFraction}$<br>`
                        texte_corr+=`$\\iff x=${-b}\\times ${f1.inverse().texFraction}$ ou $x=${-d}\\times ${f2.inverse().texFraction}$<br>`
                    }
                    texte_corr+=`$\\iff x=${f3.texFractionSimplifiee}$ ou $ x=${f4.texFractionSimplifiee}$<br>
                     On en déduit :  `
                     if (f3.differenceFraction(f4).signe>0) {
                        texte_corr += `$S=\\left\\{${f4.texFractionSimplifiee};${f3.texFractionSimplifiee}\\right\\}$`
                    }
                    else  if (f3.differenceFraction(f4).signe<0) {
                        texte_corr += `$S=\\left\\{${f3.texFractionSimplifiee};${f4.texFractionSimplifiee}\\right\\}$`
                    }
                    else  texte_corr += `$S=\\left\\{${f3.texFractionSimplifiee}\\right\\}$`
                    break

                case 3:
                    texte = `$(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)})=(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(e,f)})$`; 
                    texte_corr= texte+`<br>$\\iff (${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)})-(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(e,f)})=0$<br>`
                    texte_corr += `$\\iff (${reduire_ax_plus_b(a,b)})((${reduire_ax_plus_b(c,d)})-(${reduire_ax_plus_b(e,f)}))=0$<br>`
                    if (this.correction_detaillee) {
                        if (e<0){
                        texte_corr += `$\\iff (${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)}+${reduire_ax_plus_b(-e,-f)})=0$<br>`
                        }
                        else {
                            texte_corr += `$\\iff (${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c,d)}${reduire_ax_plus_b(-e,-f)})=0$<br>`
                        }
                    }
                    texte_corr += `$\\iff (${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c-e,d-f)})=0$<br>`
                    texte_corr += `On reconnaît une équation produit-nul, donc on applique la propriété :<br>
                    ${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>`
                    texte_corr +=`$(${reduire_ax_plus_b(a,b)})(${reduire_ax_plus_b(c-e,d-f)})=0$<br>`
                    texte_corr+=`$\\iff ${reduire_ax_plus_b(a,b)}=0$ ou $${reduire_ax_plus_b(c-e,d-f)}=0$<br>`
                    if (this.correction_detaillee) { //on ajoute les étapes de résolution si la correction détaillée est cochée.
                        texte_corr+=`$\\iff ${a}x=${-b}$ ou $ ${c-e}x=${-d+f}$<br>`
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
                case 4: // (ax+f1)(bx+f2)=0
                        fractions=obtenir_liste_Fractions_irreductibles_faciles()
                        index =randint(0,fractions.length-1)
                        f1=fractions[index].multiplieEntier(choice([-1,1]))
                        index=randint(0,fractions.length-1,index)
                        f2=fractions[index].multiplieEntier(choice([-1,1]))
                        f3=f1.entierDivise(-a)
                        f4=f2.entierDivise(-b)
                        texte =`$(${a}x${f1.texFractionSignee})(${b}x${f2.texFractionSignee})=0$`
                        texte_corr = `On reconnaît une équation produit-nul, donc on applique la propriété :<br>
                        ${texte_en_couleur(`Un produit est nul si et seulement si au moins un de ses facteurs est nul.`)}<br>
                        $(${a}x${f1.texFractionSignee})(${b}x${f2.texFractionSignee})=0$<br>`
                        texte_corr+=`$\\iff ${a}x${f1.texFractionSignee}=0$ ou $${b}x${f2.texFractionSignee}=0$<br>`
                        if (this.correction_detaillee){
                            texte_corr+=`$\\iff ${a}x=${f1.multiplieEntier(-1).texFraction}$ ou $${b}x=${f2.multiplieEntier(-1).texFraction}$<br>`
                            texte_corr+=`$\\iff x=${f1.multiplieEntier(-1).texFraction}\\div ${ecriture_nombre_relatif(a)}$ ou $x=${f2.multiplieEntier(-1).texFraction}\\div ${ecriture_nombre_relatif(b)}$<br>`
                            texte_corr+=`$\\iff x=${f1.multiplieEntier(-1).texFraction}\\times ${fraction(1,a).texFractionSigneeParentheses}$ ou $x=${f2.multiplieEntier(-1).texFraction}\\times ${fraction(1,b).texFractionSigneeParentheses}$<br>`
                        }
                        texte_corr+=`$\\iff x=${f3.texFractionSimplifiee}$ ou $ x=${f4.texFractionSimplifiee}$<br>
                         On en déduit :  `
                         if (f3.differenceFraction(f4).signe>0) {
                            texte_corr += `$S=\\left\\{${f4.texFractionSimplifiee};${f3.texFractionSimplifiee}\\right\\}$`
                        }
                        else  if (f3.differenceFraction(f4).signe<0) {
                            texte_corr += `$S=\\left\\{${f3.texFractionSimplifiee};${f4.texFractionSimplifiee}\\right\\}$`
                        }
                        else  texte_corr += `$S=\\left\\{${f3.texFractionSimplifiee}\\right\\}$`
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
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 5, '1 : (ax+b)(cx+d)=0 a,b,c et d entiers\n 2 : (ax+b)(cx+d)=0 a et c rationnels\n 3 : (ax+b)(cx+d)=(ax+b)(ex+f)\n 4 : (ax+b/c)(dx+e/f)=0\n 5 : Méli-mélo'];
}
