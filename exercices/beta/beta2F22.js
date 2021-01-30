import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu,combinaison_listes, randint, ecriture_algebrique } from "/modules/outils.js"
import { repere2, courbe2, mathalea2d } from "/modules/2d.js"


/**

*/
export default function representer_fonction_affine() {
  Exercice.call(this); 
  this.titre = "Représentation graphique d'une fonction affine";
  this.consigne = "";
  this.nb_questions = 3;//On complète le nb de questions
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.tailleDiaporama = 100;
  this.video = "";
  this.spacing = 1;
  this.spacing_corr = 1;
  this.spacing_corr = 3


  this.nouvelle_version = function () {
    this.liste_questions = []; 
    this.liste_corrections = []; 
    let type_de_questions_disponibles = [];
    type_de_questions_disponibles = [1, 2];// On complète selon le nb de cas dans l'exo (switch)

    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);

    for (let i = 0, texte, texte_corr, cpt = 0, type_de_questions;
      i < this.nb_questions && cpt < 50;) // on rajoute les variables dont on a besoin
      {
      type_de_questions = liste_type_de_questions[i];


      switch (type_de_questions) {
        case 1:
          a = randint(0, 10)
          a = a - 5;
          b = randint(0, 10);
          b = b - 5
          if (a == 0 && b == 0) {
            a == 1
          }
          let r = repere2()
          let f = x => a * x + b
          let c = courbe2(f, { repere: r })
          texte = `Déterminer graphiquement l'expression algébrique de la fonction $f$ représentée ci-dessous :<br>`;
          texte += mathalea2d({
            xmin: -6,
            ymin: -6,
            xmax: 6,
            ymax: 6
          }, r, f, c);
          texte_corr = `On observe que l'ordonnée à l'origine est : $${b}$. <br>`
          texte_corr += `et que le coefficient directeur de la droite est : $${a}$.<br>`
          texte_corr += ` On peut en déduire que l'expression de la fonction $f$ est`

          texte_corr += `$f(x)=${a}x${ecriture_algebrique(b)}$`
          if (a != 1 && a != -1) {
            texte_corr += `$f(x)=${a}x${ecriture_algebrique(b)}$`
          }
          else {
            if (a == 1) { texte_corr += `$f(x)=x${ecriture_algebrique(b)}$` };
            if (a == -1) { texte_corr += `$f(x)=-x${ecriture_algebrique(b)}$` };

          }
          if (this.liste_questions.indexOf(texte) == -1) {
            // Si la question n'a jamais été posée, on en crée une autre
            this.liste_questions.push(texte);
            this.liste_corrections.push(texte_corr);
            i++;
          }
          break;
        case 2:
          a = randint(0, 10)
          a = a - 5;
          b = randint(0, 10);
          b = b - 5
          if (a == 0 && b == 0) {
            a == 1
          }
          let r = repere2()
          let f = x => a * x + b
          let c = courbe2(f, { repere: r })
          texte = `Déterminer graphiquement l'expression algébrique de la fonction $f$ représentée ci-dessous :<br>`;
          texte += mathalea2d({
            xmin: -6,
            ymin: -6,
            xmax: 6,
            ymax: 6
          }, r, f, c);
          texte_corr = `On observe que l'ordonnée à l'origine est : $${b}$. <br>`
          texte_corr += `et que le coefficient directeur de la droite est : $${a}$.<br>`
          texte_corr += ` On peut en déduire que l'expression de la fonction $f$ est`

          texte_corr += `$f(x)=${a}x${ecriture_algebrique(b)}$`
          if (a != 1 && a != -1) {
            texte_corr += `$f(x)=${a}x${ecriture_algebrique(b)}$`
          }
          else {
            if (a == 1) { texte_corr += `$f(x)=x${ecriture_algebrique(b)}$` };
            if (a == -1) { texte_corr += `$f(x)=-x${ecriture_algebrique(b)}$` };

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
