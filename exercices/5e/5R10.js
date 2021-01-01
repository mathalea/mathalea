import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,ecriture_parenthese_si_moins,tex_nombrec,tex_nombre,arrondi} from "/modules/outils.js"

/**
 * Additions à trou dans les relatifs
 *
 *  @Auteur Jean-Claude Lhote à partir de CM000 de Rémi Angot
 * Référence 5R10
 */
export default function Terme_inconnu_de_somme() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 1;
  this.sup2 = 20; // additions|additions à trous|soustractions|soustractions à trous|mélange sans trou|mélange avec trou
  this.titre = "Trouver le terme manquant d'une somme de nombres relatifs";
  this.consigne = "Calcule le terme manquant";
  this.spacing = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let decimal;
    if (this.sup==1) {
        decimal=1
    }
    else {
        decimal=10
    }
    for (let i = 0, a, b, texte, texte_corr; i < this.nb_questions; i++) {
      a = arrondi(randint(4*decimal, this.sup2*decimal)/decimal,1);
      b = arrondi(randint(2*decimal, this.sup2*decimal)/decimal,1);
      texte = `$${tex_nombre(a)} + \\ldots\\ldots = ${tex_nombre(b)}$`;
      texte_corr = `$${tex_nombre(a)} + ${ecriture_parenthese_si_moins(tex_nombrec( b-a))} = ${tex_nombre(b)}$`;
      texte_corr +=`. En effet : $${tex_nombre(b)}-${tex_nombre(a)}=${tex_nombrec( b-a)}$`
      if (est_diaporama) {
        texte = texte.replace("= \\dotfill", "");
      }
      this.liste_questions.push(texte);
      this.liste_corrections.push(texte_corr);
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Niveau de difficulté",2,"1 : Nombres entiers\n2 : Nombres décimaux"]; 
  this.besoin_formulaire2_numerique = ["Valeur maximale", 9999]
}