import Exercice from '../ClasseExercice.js';
import {randint, liste_de_question_to_contenu,combinaison_listes, nombreDecimal,exposant, calcul,texte_gras} from "/modules/outils.js"

/**
* Trouver le dernier chiffre d'un calcul (somme, produit, différence)
* @auteur Erwan DUPLESSY
* 3G42
* date : 2021/02/09
*/

export default function Exercice_zero_mathalea2d3d() {
    "use strict"
    Exercice.call(this)
    this.titre = `Volume d'une boule`;
    this.consigne = `On arrondira les résultats à ` + nombreDecimal(0.1) + ` cm` + exposant(3) + `. <br>`;
    this.video = "https://youtu.be/YQF7CBY-uEk";
    this.nb_questions = 4; // Ici le nombre de questions
    this.nb_questions_modifiable=true; // Active le formulaire nombre de questions
    this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pas_de_version_LaTeX=false; // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false; // mettre à true si on ne veut pas de l'exercice en ligne
    this.sup=1;
  
    // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
  
    this.liste_questions = []; // tableau contenant la liste des questions 
    this.liste_corrections = [];
    let type_de_questions_disponibles = []; // tableau à compléter par valeurs possibles des types de questions
    type_de_questions_disponibles = [1,2,3,4];
    let liste_type_de_questions = [];
    type_de_questions_disponibles.splice(this.sup, 4-parseInt(this.sup));
    liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
 
      // boucle pour fabriquer les nb_questions questions en s'assurant que si il n'y a pas nb_questions différentes
      // La boucle s'arrête après 50 tentatives.  
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        texte = ``; // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte_corr = ``; // Idem pour le texte de la correction.
        let type_de_questions = [];
        type_de_questions = liste_type_de_questions[i];

        switch (type_de_questions) {
          case 1:
            let r = randint(2,30);  
            texte += `Calculer le volume d'une boule de rayon ${r} cm. `;
            texte_corr += `Le volume d'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>`;
            texte_corr += `On a donc : $V = \\dfrac{4}{3} \\times \\pi \\times (${r} \\text{ cm})^3$. <br>`;
            texte_corr += texte_gras(`Le volume de la boule est donc environ : ` + nombreDecimal(4/3*Math.PI*r*r*r, 4) + ` cm` + exposant(3) + `. <br>`);
          break;
  
          case 2:
            let d = randint(2,30);
            texte += `Calculer le volume d'une boule de diamètre ${2*d} cm. `;
            texte_corr += `Le volume d'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>`;
            texte_corr += `Le rayon de la boule est la moitié de son diamètre soit : ${d} cm. <br>`;
            texte_corr += `On a donc : $V = \\dfrac{4}{3} \\times \\pi \\times (${d} \\text{ cm})^3$. <br>`;
            texte_corr += texte_gras(`Le volume de la boule est donc environ : ` + nombreDecimal(4/3*Math.PI*d*d*d, 4) + ` cm` + exposant(3) + `. <br>`);
          break
  
          case 3:
            let A = randint(2,30);
            texte += `Calculer le volume d'une boule d'aire ${A} cm². `;
            texte_corr += `Le volume d'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>`;
            texte_corr += `Il faut donc trouver le rayon de la boule. <br>`;
            texte_corr += `L'aire d'une boule est donnée par la formule : $A = 4\\pi r^2$. <br>`;
            texte_corr += `On a donc l'égalité : $${A} = 4\\pi r^2$. `;
            texte_corr += `On en déduit : $r^2 = \\dfrac{${A}}{4\\pi}$. <br>`;
            texte_corr += `Et, comme $r$ est positif : $r=\\sqrt{\\dfrac{${A}}{4\\pi}}$. <br>`
            let rayon = calcul(Math.sqrt(A/(4*Math.PI)));
            texte_corr += `On obtient donc une valeur approchée de $r$ : $r \\approx ${rayon}$. <br>`;
            texte_corr += `On a donc : $V = \\dfrac{4}{3} \\times \\pi \\times (${rayon} \\text{ cm})^3$. <br>`;
            texte_corr += texte_gras(`Le volume de la boule est donc environ : ` + nombreDecimal(4/3*Math.PI*rayon*rayon*rayon, 4) + ` cm` + exposant(3) + `. <br>`);
          break
            
          case 4:
            let diam = randint(2,30); 
            texte += `Un boîte cylindrique de ${2*diam} cm de diamètre et de ${2*diam} cm de hauteur contient une boule de diamètre ${2*diam} cm. <br>`;
            texte += `Calculer le volume dans la boîte laissée libre par la boule. `;
            texte_corr += `Méthode : on calcule le volume du cylindre auquel on va retrancher le volume de la boule. <br>`;
            texte_corr += `Le volume du cylindre est : $V_c = \\pi r^2 h$ ; et celui de la boule est : $V_b = \\dfrac{4}{3}\\pi r^3$. <br>`;
            texte_corr += `Le rayon du cylindre est la moitié de son diamètre, soit ${diam} cm, et sa hauteur est ${2*diam} cm. <br>`;
            texte_corr += `Le rayon de la boule est la moitié de son diamètre soit : ${diam} cm. <br>`;
            texte_corr += `Ici, le volume du cylindre est donc : $V_c = \\pi \\times (${diam} \\text{ cm})^2 \\times (${2*diam}\\text{ cm})$. <br>`;
            texte_corr += `Le volume de la boule est : $V_b = \\dfrac{4}{3} \\times \\pi \\times (${diam} \\text{ cm})^3$. <br>`;
            texte_corr += `Le volume cherché est donc donné par : $\\pi \\times (${diam} \\text{ cm})^2 \\times (${2*diam}\\text{ cm}) - \\dfrac{4}{3} \\times \\pi \\times (${diam} \\text{ cm})^3$. <br>`;
            texte_corr += texte_gras(`Le volume cherché est environ : ` + nombreDecimal(Math.PI*diam*diam*2*diam-4/3*Math.PI*diam*diam*diam)+ ` cm` + exposant(3) + `. <br>`);
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
this.besoin_formulaire_numerique = ['Type de questions', 4, `1 : avec le rayon\n 2 : avec le diamètre\n 3 : avec l'aire\n 4 : petit problème`]
} // Fin de l'exercice.
  