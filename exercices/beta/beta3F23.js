import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes, randint,ecriture_algebrique, tex_fraction_reduite,tex_fraction,pgcd} from "/modules/outils.js"

/**
 * Reconnaître une fonction affine
* @auteur Erwan Duplessy
* 3F23
* date : 2021/02/21
* référentiel 3F23 - Déterminer de manière algébrique l’antécédent par une fonction, dans des cas se ramenant à la résolution d’une équation du premier degré.
* plusieurs cas : 
* f(x) = ax + b avec a et b petits relatifs
* f(x) = ax + b avec a et b grands relatifs
* f(x) = a(x + b) + c avec a, b, c petits relatifs
* f(x) = a(bx + c) + dx + e  avec a, b, c, d petits relatifs
*/

export default function antecedent_par_calcul() {
    "use strict"
    Exercice.call(this)
    this.titre = "Déterminer un antécédent";
    this.consigne = "Répondre aux questions suivantes avec une valeur exacte simplifiée. ";
    this.nb_questions = 4; // Ici le nombre de questions
    this.nb_questions_modifiable=true // Active le formulaire nombre de questions
    this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pas_de_version_LaTeX=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
    this.spacing_corr = sortie_html ? 3 : 1
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  
  //  this.sup = 1; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelle_version = function () {
 
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let type_de_questions_disponibles=[1,2,3,4] // tableau à compléter par valeurs possibles des types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
  
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

        texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte_corr = `` // Idem pour le texte de la correction.
        let a=0, b=0, c=0, d=0, e=0, m=0;
        let expr = ``;

        switch (liste_type_de_questions[i]) { // Chaque question peut être d'un type différent
          case 1:
            // f(x) = ax + b avec a et b petits relatifs
            a = randint(-20,20, [-1,0,1]);
            b = randint(-20,20);
            m = randint(-20,20);
            expr =`$f(x)=${a}x ${ecriture_algebrique(b)}$`;
            texte += `Déterminer l'antécédent de $${m}$ par la fonction $f$ définie par ${expr}. `;
            texte_corr += `On cherche un nombre $x$ tel que $f(x) = ${m}$. `
            texte_corr += `On résout donc l'équation : $f(x) = ${m}$. <br>`;  
            texte_corr += `$\\begin{aligned} `;
            texte_corr += `${a}x ${ecriture_algebrique(b)} &= ${m} \\\\ `;
            texte_corr += `${a}x &= ${m} ${ecriture_algebrique(-b)} \\\\ `;
            if (pgcd(m-b,a)==1 && m-b>0 && a>0) { // teste si la fraction est simplifiable
              texte_corr += `x &= ${tex_fraction(m-b, a)} \\\\`;
            } else {
              texte_corr += `x &= ${tex_fraction(m-b, a)} = ${tex_fraction_reduite(m-b, a)}\\\\ `;
            }
            texte_corr += `\\end{aligned}$`;
          break;
  
          case 2:
            // f(x) = ax + b avec a et b grands relatifs
            a = randint(-999,999, [-1,0,1]);
            b = randint(-999,999, [0]);
            m = randint(-999,999, [0]);
            expr =`$f(x)=${a}x ${ecriture_algebrique(b)}$`;
            texte += `Déterminer l'antécédent de $${m}$ par la fonction $f$ définie par ${expr}. `;
            texte_corr += `On cherche un nombre $x$ tel que $f(x) = ${m}$. `
            texte_corr += `On résout donc l'équation : $f(x) = ${m}$. <br>`;  
            texte_corr += `$\\begin{aligned} `;
            texte_corr += ` ${a}x ${ecriture_algebrique(b)}&= ${m} \\\\ `;
            texte_corr += ` ${a}x &= ${m} ${ecriture_algebrique(-b)}\\\\ `;
            if (pgcd(m-b,a)==1 && m-b>0 && a>0) {// teste si la fraction est simplifiable
              texte_corr += `x &= ${tex_fraction(m-b, a)}\\\\`;
            } else {
              texte_corr += `x &= ${tex_fraction(m-b, a)} = ${tex_fraction_reduite(m-b, a)}\\\\`;
            }
            texte_corr += `\\end{aligned}$`;
          break
  
          case 3:
            // f(x) = a(x + b) + c avec a, b, c petits relatifs
            a = randint(-20,20, [-1,0,1]);
            b = randint(-20,20, [0]);
            c = randint(-20,20, [0]);
            m = randint(-20,20);
            expr =`$f(x)=${a}(x ${ecriture_algebrique(b)})${ecriture_algebrique(c)}$`;
            texte += `Déterminer l'antécédent de $${m}$ par la fonction $f$ définie par ${expr}. `;
            texte_corr += `On cherche un nombre $x$ tel que $f(x) = ${m}$. `
            texte_corr += `On résout donc l'équation : $f(x) = ${m}$. <br>`;  

            texte_corr += `$\\begin{aligned} `;
            texte_corr += `${a}(x ${ecriture_algebrique(b)})${ecriture_algebrique(c)} &= ${m}\\\\`;
            texte_corr += `${a}x ${ecriture_algebrique(a*b)}${ecriture_algebrique(c)} &= ${m}\\\\`;
            texte_corr += `${a}x ${ecriture_algebrique(a*b+c)} &= ${m}\\\\`;
            texte_corr += `${a}x &= ${m} ${ecriture_algebrique(-a*b-c)}\\\\`;
            if (pgcd(m-a*b-c,a)==1 && m-a*b-c>0 && a>0) {// teste si la fraction est simplifiable
              texte_corr += `x &= ${tex_fraction(m-a*b-c, a)}\\\\`;
            } else {
              texte_corr += `x &= ${tex_fraction(m-a*b-c, a)} = ${tex_fraction_reduite(m-a*b-c, a)}\\\\`;
            }
            texte_corr += `\\end{aligned}$`;
          break
            
          case 4:
            // f(x) = a(bx + c) + dx + e  avec a, b, c, d petits relatifs
            a = randint(-20,20, [-1,0,1]);
            b = randint(-20,20, [-1,0,1]);
            c = randint(-20,20, [0]);
            d = randint(-20,20, [-1,0,1,-a*b]); // d différent de -ab pour assurer une solution
            e = randint(-20,20, [0]);
            m = randint(-20,20);
            expr =`$f(x)=${a}(${b}x ${ecriture_algebrique(c)})${ecriture_algebrique(d)}x${ecriture_algebrique(e)}$`;
            texte += `Déterminer l'antécédent de $${m}$ par la fonction $f$ définie par ${expr}. `
            texte_corr += `On cherche un nombre $x$ tel que $f(x) = ${m}$. `
            texte_corr += `On résout donc l'équation : $f(x) = ${m}$. <br>`;  

            texte_corr += `$\\begin{aligned} `;
            texte_corr += `${a}(${b}x ${ecriture_algebrique(c)})${ecriture_algebrique(d)}x${ecriture_algebrique(e)} &= ${m}\\\\`;
            texte_corr += `${a*b}x ${ecriture_algebrique(a*c)}${ecriture_algebrique(d)}x${ecriture_algebrique(e)} &= ${m}\\\\`;
            texte_corr += `${a*b+d}x ${ecriture_algebrique(a*c+e)} &= ${m}\\\\`;
            texte_corr += `${a*b+d}x  &= ${m}${ecriture_algebrique(-a*c-e)}\\\\`;
            texte_corr += `${a*b+d}x &= ${m-a*c-e}\\\\`;
            if (pgcd(m-a*c-e,a*b+d)==1 && m-a*c-e>0 && a*b+d>0) {// teste si la fraction est simplifiable
              texte_corr += `x &= ${tex_fraction(m-a*c-e, a*b+d)}\\\\`;
            } else {
              texte_corr += `x &= ${tex_fraction(m-a*c-e, a*b+d)} = ${tex_fraction_reduite(m-a*c-e, a*b+d)}\\\\`;
            }
            texte_corr += `\\end{aligned}$`;

          break            
        }

        if (this.liste_questions.indexOf(texte) == -1) {
          // Si la question n'a jamais été posée, on la stocke dans la liste des questions
          this.liste_questions.push(texte);
          this.liste_corrections.push(texte_corr);
          i++;
        }
        cpt++;
      }
      liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.
  
  //	this.besoin_formulaire_numerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
  
  } // Fin de l'exercice.
  