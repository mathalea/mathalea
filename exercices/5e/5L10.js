import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,enleve_element,choice,range1,combinaison_listes,tex_fraction} from "/modules/outils.js"

/**
* Écrire une expression littérale à partir d'une phrase :
* * Double, triple, moitié, tiers, quart
* * Successeur, prédécesseur
* * Carré, cube, opposé, inverse
* * Somme, produit, quotient
* * Nombre pair, nombre impair, multiple d'un nombre donné
* @Auteur Rémi Angot
* 5L10
*/
export default function Ecrire_une_expression_litterale() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Écrire une expression littérale";
	this.consigne = "";
	this.nb_questions = 4;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(17);
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			let lettres_disponibles = ['x', 'y', 'z', 't', 'a', 'b', 'c', 'n', 'm'];
			let x = choice(lettres_disponibles);
			enleve_element(lettres_disponibles, x);
			let y = choice(lettres_disponibles);
			let k = randint(2, 10);
			switch (liste_type_de_questions[i]) {
				case 1: // 2x
					texte = `Exprimer le double de $${x}$ en fonction de $${x}$.`;
					texte_corr = `Le double de $${x}$ se note : $2${x}$.`;
					break;
				case 2: // 3x
					texte = `Exprimer le triple de $${x}$  en fonction de $${x}$.`;
					texte_corr = `Le triple de $${x}$  se note : $3${x}$.`;
					break;
				case 3: // x/2
					texte = `Exprimer la moitié de $${x}$ en fonction de $${x}$.`;
					texte_corr = `La moitié de $${x}$  se note :  $${tex_fraction(x, 2)}=${x}\\div 2=0,5${x}$.`;
					break;
				case 4: // x/4
					texte = `Exprimer le quart de $${x}$  en fonction de $${x}$.`;
					texte_corr = `Le quart de $${x}$  se note :  $${tex_fraction(x, 4)}=${x}\\div 4=0,25${x}$.`;
					break;
				case 5: // x+1
					texte = `$${x}$ étant un nombre entier, exprimer l'entier suivant en fonction de $${x}$.`;
					texte_corr = `Le successeur de $${x}$ se note :  $${x}+1$.`;
					break;
				case 6: // x-1
					texte = `$${x}$ étant un nombre entier, exprimer l'entier précédent en fonction de $${x}$.`;
					texte_corr = `Le prédecesseur de $${x}$  se note :  $${x}-1$.`;
					break;
				case 6: // x^2
					texte = `Exprimer le carré de $${x}$  en fonction de $${x}$.`;
					texte_corr = `Le carré de $${x}$  se note : $${x}^2$.`;
					break;
				case 7: // x^3
					texte = `Exprimer le cube de $${x}$  en fonction de $${x}$.`;
					texte_corr = `Le cube de $${x}$  se note : $${x}^3$.`;
					break;
				case 8: // -x
					texte = `Exprimer l'opposé de $${x}$  en fonction de $${x}$.`;
					texte_corr = `L'opposé de $${x}$  se note : $-${x}$.`;
					break;
				case 9: // 1/x
					texte = `Exprimer l'inverse de $${x}$  en fonction de $${x}$.`;
					texte_corr = `L'inverse de $${x}$ se note : $${tex_fraction(1, x)}$.`;
					break;
				case 10: // x+k
					texte = `Exprimer la somme de $${x}$ et ${k} en fonction de $${x}$.`;
					texte_corr = `La somme de $${x}$ et ${k} se note : $${x}+${k}$.`;
					break;
				case 11: // kx
					texte = `Exprimer le produit de $${x}$  par ${k} en fonction de $${x}$.`;
					texte_corr = `Le produit de $${x}$ par ${k} se note : $${k}${x}$.`;
					break;
				case 12: // x/k
					texte = `Exprimer le quotient de $${x}$ par ${k} en fonction de $${x}$.`;
					texte_corr = `Le quotient de $${x}$ par ${k} se note : $${tex_fraction(x, k)}$.`;
					break;
				case 13: // k/x
					texte = `Exprimer le quotient de ${k} par $${x}$ en fonction de $${x}$.`;
					texte_corr = `Le quotient de ${k} par $${x}$ se note : $${tex_fraction(k, x)}$.`;
					break;
				case 14: //xy
					texte = `Comment se note le produit de $${x}$ par $${y}$ ?`;
					texte_corr = `Le produit de $${x}$ par $${y}$ se note $${x}${y}$.`;
					break;
				case 15: //pair
					texte = `Écrire une expression littérale qui permet de représenter un nombre pair.`;
					texte_corr = `Un nombre pair peut s'écrire sous la forme $2n$ avec $n$ un entier naturel.`;
					break;
				case 16: //impair
					texte = `Écrire une expression littérale qui permet de représenter un nombre impair.`;
					texte_corr = `Un nombre impair peut s'écrire sous la forme $2n+1$ avec $n$ un entier naturel.`;
					break;
				case 17: //multiple de k
					texte = `Écrire une expression littérale qui permet de représenter un multiple de ${k}.`;
					texte_corr = `Un multiple de ${k} peut s'écrire sous la forme $${k}n$ avec $n$ un entier naturel.`;
					break;

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
	//this.besoin_formulaire_case_a_cocher = ["Uniquement la lettre $n$."]
}
