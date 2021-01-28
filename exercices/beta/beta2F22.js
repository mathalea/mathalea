import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,modal_texte_court,choice, ecriture_algebrique} from "/modules/outils.js"
import {point,tracePoint,labelPoint,segment,axes,grille,mathalea2d,courbe2,repere2} from "/modules/2d.js"

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @Auteur Rémi Angot
 * Référence CM005
*/
export default function Ajouter9() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Représentation graphique d'une fonction affine";
  this.consigne = "";
  this.nb_questions = 10;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.tailleDiaporama = 100;

  this.nouvelle_version = function (numero_de_l_exercice) {
   
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
 
    
    for (
      let i = 0, texte, texte_corr, a,b,cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) { a=randint(1,5)
        b=randint(1,5)
        if (a==0&&b==0){
         a==1}
        let r=repere2()
        let f = x => a*x+b
        let c=courbe2(f,{repere:r})
      texte = `Déterminer graphiquement l'expression algébrique de la fonction $f$ représentée ci-dessous :<br>`; 
      texte +=mathalea2d({
        xmin: -8,
        ymin: -8,
        xmax: 8,
        ymax: 8
    }, r,f,c);
      texte_corr = `On observe que l'ordonnée à l'origine est : $${b}$. <br>`
      texte_corr += `et que le coefficient directeur de la droite est : $${a}$.<br>`
      texte_corr +=` On peut en déduire que l'expression de la fonction $f$ est`
      if (a!=1&&a!=-1) {
        texte_corr +=`$f(x)=${a}x${ecriture_algebrique(b)}$`
      }
      else {        
              if (a==1) {texte_corr +=`$f(x)=x${ecriture_algebrique(b)}$`};
              if (a==-1) {texte_corr +=`$f(x)=-x${ecriture_algebrique(b)}$`};
      }
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

