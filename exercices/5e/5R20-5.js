import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,ecriture_algebrique} from "/modules/outils.js"
/**
* Effectuer des additions de relatifs dans un tableau à double entrée
*
* @Auteur Rémi Angot
* 5R20-5
*/
export default function Exercice_tableau_additions_relatifs() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = false;
	this.titre = "Additions de deux entiers relatifs dans un tableau à double entrée";
	this.consigne = 'Calculer'
	this.spacing = 1;
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_signes1 = combinaison_listes([-1, 1], 4);
		let a1 = randint(2, 9);
		let a2 = randint(2, 9, a1);
		let a3 = randint(2, 9, [a1, a2]);
		let a4 = randint(2, 9, [a1, a2, a3]);
		let b1 = randint(2, 9);
		let b2 = randint(2, 9, b1);
		let b3 = randint(2, 9, [b1, b2]);
		let b4 = randint(2, 9, [b1, b2, b3]);
		a1 *= liste_signes1[0]
		a2 *= liste_signes1[1]
		a3 *= liste_signes1[2]
		a4 *= liste_signes1[3]
		b1 *= liste_signes1[0]
		b2 *= liste_signes1[1]
		b3 *= liste_signes1[2]
		b4 *= liste_signes1[3]

		let texte = `$\\def\\arraystretch{1.5}\\begin{array}{|c|c|c|c|c|}
    \\hline
    + & ${ecriture_algebrique(a1)} & ${ecriture_algebrique(a2)} & ${ecriture_algebrique(a3)} & ${ecriture_algebrique(a4)} \\\\
    \\hline
    ${ecriture_algebrique(b1)} &  &  & &  \\\\
    \\hline
    ${ecriture_algebrique(b2)} & & & & \\\\
    \\hline
    ${ecriture_algebrique(b3)} & & & & \\\\
    \\hline
    ${ecriture_algebrique(b4)} & & & & \\\\
    \\hline
    \\end{array}$`

		let texte_corr = `$\\def\\arraystretch{1.5}\\begin{array}{|c|c|c|c|c|}
    \\hline
    + & ${ecriture_algebrique(a1)} & ${ecriture_algebrique(a2)} & ${ecriture_algebrique(a3)} & ${ecriture_algebrique(a4)} \\\\
    \\hline
    ${ecriture_algebrique(b1)} & ${ecriture_algebrique(a1 + b1)} & ${ecriture_algebrique(a2 + b1)} & ${ecriture_algebrique(a3 + b1)} & ${ecriture_algebrique(a4 + b1)} \\\\
    \\hline
    ${ecriture_algebrique(b2)} & ${ecriture_algebrique(a1 + b2)} & ${ecriture_algebrique(a2 + b2)} & ${ecriture_algebrique(a3 + b2)} & ${ecriture_algebrique(a4 + b2)} \\\\
    \\hline
    ${ecriture_algebrique(b3)} & ${ecriture_algebrique(a1 + b3)} & ${ecriture_algebrique(a2 + b3)} & ${ecriture_algebrique(a3 + b3)} & ${ecriture_algebrique(a4 + b3)} \\\\
    \\hline
    ${ecriture_algebrique(b4)} & ${ecriture_algebrique(a1 + b4)} & ${ecriture_algebrique(a2 + b4)} & ${ecriture_algebrique(a3 + b4)} & ${ecriture_algebrique(a4 + b4)} \\\\
    \\hline
	\\end{array}$`
		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu(this);
	}
}
