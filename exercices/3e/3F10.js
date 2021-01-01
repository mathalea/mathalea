import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,shuffle2tableaux} from "/modules/outils.js"
/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @Auteur Rémi Angot
 * Référence 3F10
*/
export default function Image_antecedent_depuis_tableau_ou_fleche() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Lectures d'images et d'antécédents depuis un tableau de valeurs";
	this.consigne = "";
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.nb_questions = 4;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let a = randint(-20, 20);
		let b = randint(-20, 20, [a]);
		let c = randint(-20, 20, [a, b]);
		let d = randint(-20, 20, [a, b, c]);
		let e = randint(-20, 20, [a, b, c, d]);
		let f = randint(-20, 20, [a, b, c, d, e]);
		// a->b ; c->d ; e->d ; d->a ; f->c
		let ligneX = [a, c, e, d, f];
		let ligneY = [b, d, d, a, c];
		shuffle2tableaux(ligneX, ligneY); // mélange les 2 lignes de la même manière
		this.introduction = "Voici un tableau de valeurs d'une fonction $f$ : ";
		this.introduction += '<br><br>';
		this.introduction += `$\\def\\arraystretch{1.5}\\begin{array}{|l|c|c|c|c|c|}
	\\hline
	x & ${ligneX[0]} & ${ligneX[1]} & ${ligneX[2]} & ${ligneX[3]} & ${ligneX[4]} \\\\
	\\hline
	f(x) & ${ligneY[0]} & ${ligneY[1]} & ${ligneY[2]} & ${ligneY[3]} & ${ligneY[4]} \\\\
	\\hline
	\\end{array}
	$
	`;
		let texte = `Quelle est l'image de $${a}$ par la fonction $f$ ?`;
		let texte_corr = `L'image de $${a}$ par la fonction $f$ est $${b}$, on note $f(${a})=${b}$.`;
		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);

		texte = `Quelle est l'image de $${c}$ par la fonction $f$ ?`;
		texte_corr = `L'image de $${c}$ par la fonction $f$ est $${d}$, on note $f(${c})=${d}$.`;
		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);

		let texte3 = `Déterminer le(s) antécédent(s) de $${a}$ par la fonction $f$.`;
		let texte_corr3 = `$${a}$ a un seul antécédent par la fonction $f$ qui est $${d}$, on note $f(${d})=${a}$.`;

		let texte4 = `Déterminer le(s) antécédent(s) de $${d}$ par la fonction $f$.`;
		let texte_corr4 = `$${d}$ a deux antécédents par la fonction $f$ qui sont $${c}$ et $${e}$, on note $f(${c})=f(${e})=${d}$.`;

		if (choice([true, false])) { // Une fois sur 2 on inverse les questions 3 et 4
			this.liste_questions.push(texte3);
			this.liste_corrections.push(texte_corr3);
			this.liste_questions.push(texte4);
			this.liste_corrections.push(texte_corr4);
		} else {
			this.liste_questions.push(texte4);
			this.liste_corrections.push(texte_corr4);
			this.liste_questions.push(texte3);
			this.liste_corrections.push(texte_corr3);
		}

		texte = `Recopier et compléter : $f(${c})=\\ldots$`;
		texte_corr = `$f(${c})=${d}$`;
		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);

		texte = `Recopier et compléter : $f(\\ldots)=${c}$`;
		texte_corr = `$f(${f})=${c}$`;
		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);

		liste_de_question_to_contenu(this);
	};
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}
