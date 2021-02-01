import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,enleve_element,choice,tex_fraction} from "/modules/outils.js"
/**
 * Simplifier une fraction, le facteur commun est inférieur à une valeur donnée en paramètre qui est 11 par défaut
 * @Auteur Rémi Angot
 *  5N13
 */
export default function Exercice_fractions_simplifier(max = 11) {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max; // Correspond au facteur commun
	this.titre = "Simplification de fractions";
	this.consigne = "Simplifier les fractions suivantes.";
	this.spacing = 2;
	this.spacing_corr = 2;
  
	this.nouvelle_version = function () {
	  this.liste_questions = []; // Liste de questions
	  this.liste_corrections = []; // Liste de questions corrigées
	  let liste_fractions = [
		[1, 2],
		[1, 3],
		[2, 3],
		[1, 4],
		[3, 4],
		[1, 5],
		[2, 5],
		[3, 5],
		[4, 5],
		[1, 6],
		[5, 6],
		[1, 7],
		[2, 7],
		[3, 7],
		[4, 7],
		[5, 7],
		[6, 7],
		[1, 8],
		[3, 8],
		[5, 8],
		[7, 8],
		[1, 9],
		[2, 9],
		[4, 9],
		[5, 9],
		[7, 9],
		[8, 9],
		[1, 10],
		[3, 10],
		[7, 10],
		[9, 10],
	  ]; // Couples de nombres premiers entre eux
	  for (
		let i = 0, fraction, a, k,b, texte, texte_corr;
		i < this.nb_questions;
		i++
	  ) {
		fraction = choice(liste_fractions); //
		a = fraction[0];
		b = fraction[1];
		k = randint(2, this.sup);
		enleve_element(liste_fractions, fraction); // Il n'y aura pas 2 fois la même réponse
		texte =
		  "$ " +
		  tex_fraction(k * a, k * b) +
		  " = " +
		  tex_fraction("\\phantom{00000000000000}", "") +
		  " = " +
		  tex_fraction("\\phantom{0000}", "") +
		  " $";
		texte_corr =
		  "$ " +
		  tex_fraction(k * a, k * b) +
		  " = " +
		  tex_fraction(k + " \\times " + a, k + " \\times " + b) +
		  " = " +
		  tex_fraction(a, b) +
		  " $";
		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);
	  }
	  liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	};
	this.besoin_formulaire_numerique = [
	  "Valeur maximale du facteur commun",
	  99999,
	];
  }



