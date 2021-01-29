import { fraction_simplifiee } from "/modules/outils.js";
import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, randint, ecriture_algebrique } from "/modules/outils.js"
import { repere2, courbe2, mathalea2d } from "/modules/2d.js"

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


    for (
      let i = 0, texte, texte_corr, a, b, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      a = randint(1, 5)
      b = randint(1, 5)
      if (a == 0 && b == 0) {
        a == 1
      }
      let r = repere2()
      let f = x => a * x + b
      let c = courbe2(f, { repere: r })
      texte = `Déterminer graphiquement l'expression algébrique de la fonction $f$ représentée ci-dessous :<br>`;
      texte += mathalea2d({
        xmin: -8,
        ymin: -8,
        xmax: 8,
        ymax: 8
    }, r,f,c);
    texte_corr = `On observe que l'ordonnée à l'origine est : $${b}$. <br>`
    texte_corr += `et que le coefficient directeur de la droite est : $${a}$.<br>`
    texte_corr +=` On peut en déduire que l'expression de la fonction $f$ est`
   
    texte_corr +=`$f(x)=${a}x+${ecriture_algebrique(b)}$`
    if (a!=1&&a!=-1) {
      texte_corr +=`$f(x)=${a}x${ecriture_algebrique(b)}$`
    }
    else {        
      if (a==1) {texte_corr +=`$f(x)=x${ecriture_algebrique(b)}$`};
      if (a==-1) {texte_corr +=`$f(x)=-x${ecriture_algebrique(b)}$`};
}
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

}
