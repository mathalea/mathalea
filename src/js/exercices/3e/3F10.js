import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,shuffle2tableaux} from '../../modules/outils.js'
export const titre = 'Lectures d’images et d’antécédents depuis un tableau de valeurs'

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @Auteur Rémi Angot
 * Référence 3F10
*/
export default function Image_antecedent_depuis_tableau_ou_fleche() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "";
	this.nbQuestionsModifiable = false;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.nbQuestions = 4;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
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
		let texteCorr = `L'image de $${a}$ par la fonction $f$ est $${b}$, on note $f(${a})=${b}$.`;
		this.listeQuestions.push(texte);
		this.listeCorrections.push(texteCorr);

		texte = `Quelle est l'image de $${c}$ par la fonction $f$ ?`;
		texteCorr = `L'image de $${c}$ par la fonction $f$ est $${d}$, on note $f(${c})=${d}$.`;
		this.listeQuestions.push(texte);
		this.listeCorrections.push(texteCorr);

		let texte3 = `Déterminer le(s) antécédent(s) de $${a}$ par la fonction $f$.`;
		let texteCorr3 = `$${a}$ a un seul antécédent par la fonction $f$ qui est $${d}$, on note $f(${d})=${a}$.`;

		let texte4 = `Déterminer le(s) antécédent(s) de $${d}$ par la fonction $f$.`;
		let texteCorr4 = `$${d}$ a deux antécédents par la fonction $f$ qui sont $${c}$ et $${e}$, on note $f(${c})=f(${e})=${d}$.`;

		if (choice([true, false])) { // Une fois sur 2 on inverse les questions 3 et 4
			this.listeQuestions.push(texte3);
			this.listeCorrections.push(texteCorr3);
			this.listeQuestions.push(texte4);
			this.listeCorrections.push(texteCorr4);
		} else {
			this.listeQuestions.push(texte4);
			this.listeCorrections.push(texteCorr4);
			this.listeQuestions.push(texte3);
			this.listeCorrections.push(texteCorr3);
		}

		texte = `Recopier et compléter : $f(${c})=\\ldots$`;
		texteCorr = `$f(${c})=${d}$`;
		this.listeQuestions.push(texte);
		this.listeCorrections.push(texteCorr);

		texte = `Recopier et compléter : $f(\\ldots)=${c}$`;
		texteCorr = `$f(${f})=${c}$`;
		this.listeQuestions.push(texte);
		this.listeCorrections.push(texteCorr);

		listeQuestionsToContenu(this);
	};
	//this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
