import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,ecriture_parenthese_si_moins,tex_nombrec,tex_nombre,arrondi,choice,combinaison_listes} from "/modules/outils.js"

/**
 * Additions à trou dans les relatifs
 *
 *  @Auteur Jean-Claude Lhote à partir de CM000 de Rémi Angot
 * Référence 5R10
 */
export default function Terme_inconnu_de_somme() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.nb_questions=5;
  this.sup = 1;
  this.sup3 = 1;
  this.sup2 = 20; // additions|additions à trous|soustractions|soustractions à trous|mélange sans trou|mélange avec trou
  this.titre = "Trouver le terme manquant d'une somme de nombres relatifs";
  this.consigne = "Calcule le terme manquant";
  this.spacing = 2;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles=[1,2,3,4]
    let liste_type_de_questions=combinaison_listes(type_de_questions_disponibles,this.nb_questions)
    let decimal;
    let inconnue;
    if (this.sup==1) {
        decimal=1
    }
    else {
        decimal=10
    }
    for (let i = 0, a, b, texte, texte_corr,cpt=0; i < this.nb_questions;) {
      a = arrondi(randint(4*decimal, this.sup2*decimal)/decimal,1);
      b = arrondi(randint(2*decimal, this.sup2*decimal)/decimal,1);
      if (this.sup3==1) {
        inconnue=` \\ldots\\ldots `
      }
      else {
        inconnue=` ${choice(['x','y','z','a','t','n'])} `
      }
      switch (liste_type_de_questions[i]) {
        case 1:
          texte = `$${tex_nombre(a)} + ${inconnue} = ${tex_nombre(b)}$`;
          texte_corr = `$${tex_nombre(a)} + ${ecriture_parenthese_si_moins(tex_nombrec( b-a))} = ${tex_nombre(b)}$`;
          texte_corr +=`. En effet : $${tex_nombre(b)}-${tex_nombre(a)}=${tex_nombrec( b-a)}$`
        break

        case 2:
          texte = `$${inconnue} + ${tex_nombre(a)}  = ${tex_nombre(b)}$`;
          texte_corr = `$${ecriture_parenthese_si_moins(tex_nombrec( b-a))} + ${tex_nombre(a)} = ${tex_nombre(b)}$`;
          texte_corr +=`. En effet : $${tex_nombre(b)}-${tex_nombre(a)}=${tex_nombrec( b-a)}$`
        break

        case 3:
          texte = `$${tex_nombre(b)} = ${inconnue} + ${tex_nombre(a)} $`;
          texte_corr = `$${tex_nombre(b)}=${ecriture_parenthese_si_moins(tex_nombrec( b-a))} + ${tex_nombre(a)}$`;
          texte_corr +=`. En effet : $${tex_nombre(b)}-${tex_nombre(a)}=${tex_nombrec( b-a)}$`
        break

        case 4: 
        texte = `$${tex_nombre(b)} = ${tex_nombre(a)} + ${inconnue}$`;
        texte_corr = `$${tex_nombre(b)}=${tex_nombre(a)} + ${ecriture_parenthese_si_moins(tex_nombrec( b-a))}$`;
        texte_corr +=`. En effet : $${tex_nombre(b)}-${tex_nombre(a)}=${tex_nombrec( b-a)}$`
        break

      }

      if (est_diaporama) {
        texte = texte.replace("= \\dotfill", "");
      }
			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Niveau de difficulté",2,"1 : Nombres entiers\n2 : Nombres décimaux"]; 
  this.besoin_formulaire2_numerique = ["Valeur maximale", 9999]
  this.besoin_formulaire3_numerique = ["Type d'égalité",2,"1 : Égalité à trou\n2 : Équation"]; 
}