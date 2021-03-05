import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,creer_couples,choice,tex_nombre,tex_nombre2,calcul,shuffle2tableaux} from "/modules/outils.js"
/**
 * Multiplier deux nombres décimaux
 * @Auteur Rémi Angot
 * Référence 6C10-3
 */
export default function Exercice_tables_de_multiplications_et_decimaux(
  tables_par_defaut = "2-3-4-5-6-7-8-9"
) {
  //Multiplier deux nombres
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = tables_par_defaut;
  this.titre = "Tables de multiplications et nombres décimaux";
  this.consigne = "Calculer";
  this.spacing = 2;
  this.tailleDiaporama = 100;
  this.QCM_disponible=true
  this.ModeQCM=false

  this.nouvelle_version = function () {
    this.QCM=['6C10-3',[],"tables de multiplications et nombres décimaux"]
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let espace =``;
    if (sortie_html) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }
    if (!this.sup) {
      // Si aucune table n'est saisie
      this.sup = "2-3-4-5-6-7-8-9";
    }
    let tables = [],tabrep,tabicone
    if (typeof this.sup == "number") {
      // Si c'est un nombre c'est qu'il y a qu'une seule table
      tables[0] = this.sup;
    } else {
      tables = this.sup.split("-"); // Sinon on crée un tableau à partir des valeurs séparées par des ;
    }
    let couples = creer_couples(
      tables,
      [2, 3, 4, 5, 6, 7, 8, 9, 10],
      this.nb_questions
    ); //Liste tous les couples possibles (2,3)≠(3,2)
    for (
      let i = 0, a, b, k1, k2, couple, texte, texte_corr;
      i < this.nb_questions;
      i++
    ) {
      a = couples[i][0];
      b = couples[i][1];
      couple = choice([
        [1, 10],
        [1, 100],
        [1, 1000],
        [10, 100],
        [10, 1000],
        [100, 100],
        [100, 1000],
      ]);
      k1 = couple[0];
      k2 = couple[1];
      a = Algebrite.eval(a / k1);
      b = Algebrite.eval(b / k2);
      if (a == 1) {
        a = 0.01;
      }
      if (b == 1) {
        b = 0.1;
      }
      texte =
        "$ " + tex_nombre(a) + " \\times " + tex_nombre(b) + " = \\dotfill $";
      texte_corr =
        "$ " +
        tex_nombre(a) +
        " \\times " +
        tex_nombre(b) +
        " = " +
        tex_nombre(Algebrite.eval(a * b)) +
        " $";
        /**********************************/
        // QCM
        /**********************************/
        tabrep=[`$${tex_nombre2(a*b)}$`,`$${tex_nombre2(calcul(a*b/10))}$`,`$${tex_nombre2(calcul(a*b*10))}$`,`$${tex_nombre2(calcul(a*b/100))}$`,`$${tex_nombre2(calcul(a*b*100))}$`]
        tabicone=[1,0,0,0,0]
                this.QCM[1].push([`${texte}\n`,
        tabrep,
        tabicone]) 

        if (this.ModeQCM) {
          texte_corr=''
          texte+=`<br>  Réponses possibles : ${espace}  `
          shuffle2tableaux(tabrep, tabicone);
          for (let i=0; i<tabrep.length; i++) {
            texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
           if (tabicone[i]==1) {
             texte_corr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
           } else {
             texte_corr += `$\\square\\;$ ${tabrep[i]}` + espace ;
           }
         }
        }

      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_texte = [
    "Choix des tables",
    "Nombres séparés par des tirets",
  ]; // Texte, tooltip
}

