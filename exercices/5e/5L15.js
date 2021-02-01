import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,ecriture_parenthese_si_negatif} from "/modules/outils.js"


/**
* Tester une égalité pour 2 valeurs données (une vraie et une fausse)
*
* * 3x-a=2x+b
* * 3x+a=5x-b
* * ax+b=(a+1)x-c
* * a-2x=b+2x
* @Auteur Rémi Angot
* 5L15
*/
export default function Tester_une_egalite() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Tester une égalité";
	this.consigne = "";
	this.nb_questions = 3;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.sup2 = false;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles; // = range1(5)

		//	let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		if (this.sup2 == false)
			type_de_questions_disponibles = [1, 2, 3, 4, 5];
		else
			type_de_questions_disponibles = [6, 7, 3];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			let a, b, c, d, x1, x2, x3;
			switch (liste_type_de_questions[i]) {
				case 1: // 3x-a=2x+b   x=a+b  
					if (this.sup == 1) {
						a = randint(1, 6);
						b = randint(1, 6, [a]);
						x2 = a + b;
						x1 = randint(2, 10, [x2]);

					}
					else {
						a = randint(-6, 6, [0]);
						b = randint(-6, 6, [a, 0]);
						x2 = a + b;
						x1 = randint(-10, 10, [0, x2]);

					}

					texte = `Tester l'égalité $3x-${ecriture_parenthese_si_negatif(a)}=2x+${ecriture_parenthese_si_negatif(b)}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`;
					texte_corr = `Pour $x=${x1}$ : <br>`;
					texte_corr += `$3x-${ecriture_parenthese_si_negatif(a)}=3\\times ${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(a)}=${3 * x1 - a}$ <br> $2x+${ecriture_parenthese_si_negatif(b)}=2\\times ${ecriture_parenthese_si_negatif(x1)}+${ecriture_parenthese_si_negatif(b)}=${2 * x1 + b}$<br>`;
					texte_corr += `$${3 * x1 - a}\\not=${2 * x1 + b}$ donc l'égalité n'est pas vraie.<br><br>`;
					texte_corr += `Pour $x=${ecriture_parenthese_si_negatif(x2)}$ : <br>`;
					texte_corr += `$3x-${ecriture_parenthese_si_negatif(a)}=3\\times ${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(a)}=${3 * x2 - a}$ <br> $2x+${ecriture_parenthese_si_negatif(b)}=2\\times ${ecriture_parenthese_si_negatif(x2)}+${ecriture_parenthese_si_negatif(b)}=${2 * x2 + b}$<br>`;
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.`;
					break;
				case 2: // 3x+a=5x-b   x=(a+b)/2 donc a et b impairs pour une solution entière  
					if (this.sup == 1) {
						a = randint(1, 9);
						b = randint(0, 4) * 2 + a % 2;
						x1 = parseInt(Algebrite.eval((a + b) / 2));
						x2 = randint(1, 9, x1);
					}
					else {
						a = randint(-9, 9, [0]);
						b = randint(-4, 4, [a, 0]) * 2 + a % 2;
						x1 = parseInt(Algebrite.eval((a + b) / 2));
						x2 = randint(-9, 9, [0, x1]);
					}

					texte = `Tester l'égalité $3x+${ecriture_parenthese_si_negatif(a)}=5x-${ecriture_parenthese_si_negatif(b)}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`;
					texte_corr = `Pour $x=${x1}$ : <br>`;
					texte_corr += `$3x+${ecriture_parenthese_si_negatif(a)}=3\\times ${ecriture_parenthese_si_negatif(x1)}+${ecriture_parenthese_si_negatif(a)}=${3 * x1 + a}$ <br> $5x-${ecriture_parenthese_si_negatif(b)}=5\\times ${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(b)}=${5 * x1 - b}$<br>`;
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`;
					texte_corr += `Pour $x=${x2}$ : <br>`;
					texte_corr += `$3x+${ecriture_parenthese_si_negatif(a)}=3\\times ${ecriture_parenthese_si_negatif(x2)}+${ecriture_parenthese_si_negatif(a)}=${3 * x2 + a}$ <br> $5x-${ecriture_parenthese_si_negatif(b)}=5\\times ${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(b)}=${5 * x2 - b}$<br>`;
					texte_corr += `$${3 * x2 + a}\\not=${5 * x2 - b}$ donc l'égalité n'est pas vraie.`;
					break;
				case 3: // 10(x-a)=4(2x+b) x=(10a+4b)/2
					if (this.sup == 1) {
						a = randint(1, 3);
						b = randint(1, 3);
						x2 = parseInt(Algebrite.eval((10 * a + 4 * b) / 2));
						x1 = randint(1, 9, x2);
					}
					else {
						a = randint(-3, 3, [0]);
						b = randint(-3, 3, [0]);
						x2 = parseInt(Algebrite.eval((10 * a + 4 * b) / 2));
						x1 = randint(-9, 9, [0, x2]);
					}

					texte = `Tester l'égalité $10(x-${ecriture_parenthese_si_negatif(a)})=4(2x+${ecriture_parenthese_si_negatif(b)})~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`;
					texte_corr = `Pour $x=${x1}$ : <br>`;
					texte_corr += `$10(x-${ecriture_parenthese_si_negatif(a)})=10\\times (${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(a)})=10\\times ${x1 - a}=${10 * (x1 - a)}$ <br> $4(2x+${ecriture_parenthese_si_negatif(b)})=4\\times (2\\times ${ecriture_parenthese_si_negatif(x1)}+${ecriture_parenthese_si_negatif(b)})=4\\times ${2 * x1 + b}=${4 * (2 * x1 + b)}$<br>`;
					texte_corr += `$${10 * (x1 - a)}\\not=${4 * (2 * x1 + b)}$ donc l'égalité n'est pas vraie.<br><br>`;
					texte_corr += `Pour $x=${x2}$ : <br>`;
					texte_corr += `$10(x-${ecriture_parenthese_si_negatif(a)})=10\\times (${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(a)})=10\\times ${x2 - a}=${10 * (x2 - a)}$ <br> $4(2x+${ecriture_parenthese_si_negatif(b)})=4\\times (2\\times ${ecriture_parenthese_si_negatif(x2)}+${ecriture_parenthese_si_negatif(b)})=4\\times ${2 * x2 + b}=${4 * (2 * x2 + b)}$<br>`;
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.`;
					break;
				case 4: // ax+b=(a+1)x-c x=b+c
					if (this.sup == 1) {
						a = randint(2, 9);
						b = randint(2, 9);
						c = randint(1, 3);
						x1 = b + c;
						x2 = randint(2, 10, x1);
					}
					else {
						a = randint(2, 9);
						b = randint(2, 9) * randint(-1, 1, 0);
						c = randint(1, 3) * randint(-1, 1, 0);
						x1 = b + c;
						x2 = randint(2, 10, x1) * randint(-1, 1, 0);
					}

					texte = `Tester l'égalité $${ecriture_parenthese_si_negatif(a)}x+${ecriture_parenthese_si_negatif(b)}=${a + 1}x-${ecriture_parenthese_si_negatif(c)}~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`;
					texte_corr = `Pour $x=${x1}$ : <br>`;
					texte_corr += `$${a}x+${ecriture_parenthese_si_negatif(b)}=${ecriture_parenthese_si_negatif(a)}\\times ${ecriture_parenthese_si_negatif(x1)}+${ecriture_parenthese_si_negatif(b)}=${a * x1 + b}$ <br> $${a + 1}x-${ecriture_parenthese_si_negatif(c)}=${a + 1}\\times ${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(c)}=${(a + 1) * x1 - c}$<br>`;
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`;
					texte_corr += `Pour $x=${x2}$ : <br>`;
					texte_corr += `$${a}x+${ecriture_parenthese_si_negatif(b)}=${ecriture_parenthese_si_negatif(a)}\\times ${ecriture_parenthese_si_negatif(x2)}+${ecriture_parenthese_si_negatif(b)}=${a * x2 + b}$ <br> $${a + 1}x-${ecriture_parenthese_si_negatif(c)}=${a + 1}\\times ${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(c)}=${(a + 1) * x2 - c}$<br>`;
					texte_corr += `$${a * x2 + b}\\not=${(a + 1) * x2 - c}$ donc l'égalité n'est pas vraie.`;
					break;
				case 5: // a-2x=b+2x x=(a-b)/4
					if (this.sup == 1) {
						x1 = randint(1, 9);
						b = randint(1, 9);
						a = b + 4 * x1;
						x2 = randint(1, 11, x1);
					}
					else {
						x1 = randint(-9, 9);
						b = randint(-9, 9, 0);
						a = b + 4 * x1;
						x2 = randint(1, 11, x1);
					}

					texte = `Tester l'égalité $${a}-2x=${b}+2x~$ pour $~x=${x1}~$ puis pour $~x=${x2}$`;
					texte_corr = `Pour $x=${x1}$ : <br>`;
					texte_corr += `$${a}-2x=${a}-2\\times ${ecriture_parenthese_si_negatif(x1)}=${a - 2 * x1}$ <br> $${b}+2x=${b}+2\\times ${ecriture_parenthese_si_negatif(x1)}=${b + 2 * x1}$<br>`;
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`;
					texte_corr += `Pour $x=${x2}$ : <br>`;
					texte_corr += `$${a}-2x=${a}-2\\times ${ecriture_parenthese_si_negatif(x2)}=${a - 2 * x2}$ <br> $${b}+2x=${b}+2\\times ${ecriture_parenthese_si_negatif(x2)}=${b + 2 * x2}$<br>`;
					texte_corr += `$${a - 2 * x2}\\not=${b + 2 * x2}$ donc l'égalité n'est pas vraie.`;
					break;
				case 6: // ax-ab=x²-bx (a-x)(x-b)=0 solutions a et b.
					if (this.sup == 1) {
						b = randint(2, 9);
						a = randint(2, 9);
						x3 = b;
						x1 = a;
						x2 = randint(1, 9, [x1, x3]);
					}
					else {
						a = randint(-9, 9, [0, 1]);
						b = randint(-9, 9, [0, a]);
						x1 = a;
						x3 = b;
						x2 = randint(-9, 9, [x1, x3]);
					}
					texte = `Tester l'égalité $${a}x-${ecriture_parenthese_si_negatif(a * b)}=x^2-${ecriture_parenthese_si_negatif(b)}x~$ pour $~x=${x1}~$ , pour $~x=${x2}~$ puis pour $~x=${x3}$`;
					texte_corr = `Pour $x=${x1}$ : <br>`;
					texte_corr += `$${a}x-${ecriture_parenthese_si_negatif(a * b)}=${a}\\times ${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(a * b)}=${a * x1 - a * b}$ <br> $x^2-${b}\\times  x=${ecriture_parenthese_si_negatif(x1)}^2-${ecriture_parenthese_si_negatif(b)}\\times ${ecriture_parenthese_si_negatif(x1)}=${x1 * x1}-${ecriture_parenthese_si_negatif(b * x1)}=${x1 * x1 - b * x1}$<br>`;
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`;
					texte_corr += `Pour $x=${x2}$ : <br>`;
					texte_corr += `$${a}x-${ecriture_parenthese_si_negatif(a * b)}=${a}\\times ${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(a * b)}=${a * x2 - a * b}$ <br> $x^2-${b}\\times  x=${ecriture_parenthese_si_negatif(x2)}^2-${ecriture_parenthese_si_negatif(b)}\\times ${ecriture_parenthese_si_negatif(x2)}=${x2 * x2}-${ecriture_parenthese_si_negatif(b * x2)}=${x2 * x2 - b * x2}$<br>`;
					texte_corr += `$${a * x2 - a * b}\\not=${x2 * x2 - b * x2}$ donc l'égalité n'est pas vraie.<br><br>`;
					texte_corr += `Pour $x=${x3}$ : <br>`;
					texte_corr += `$${a}x-${ecriture_parenthese_si_negatif(a * b)}=${a}\\times ${ecriture_parenthese_si_negatif(x3)}-${ecriture_parenthese_si_negatif(a * b)}=${a * x3 - a * b}$ <br> $x^2-${b}\\times  x=${ecriture_parenthese_si_negatif(x3)}^2-${ecriture_parenthese_si_negatif(b)}\\times ${ecriture_parenthese_si_negatif(x3)}=${x3 * x3}-${ecriture_parenthese_si_negatif(b * x3)}=${x3 * x3 - b * x3}$<br>`;
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`;
					break;
				case 7: // adx-bd=acx²-bcx  --- (ax-b)(d-cx)=0 solutions b/a et d/c.
					if (this.sup == 1) {
						c = randint(2, 5);
						a = randint(2, 5);
						x2 = randint(2, 6);
						x3 = randint(2, 6, x2);
						x1 = randint(1, 7, [x2, x3]);
						b = a * x2;
						d = c * x3;
					}
					else {
						c = randint(2, 5) * randint(-1, 1, 0);
						a = randint(2, 5) * randint(-1, 1, 0);
						x2 = randint(1, 6) * randint(-1, 1, 0);
						x3 = randint(1, 6, x2) * randint(-1, 1, 0);
						x1 = randint(1, 7, [x2, x3]) * randint(-1, 1, 0);
						b = a * x2;
						d = c * x3;
					}
					texte = `Tester l'égalité $${a * d}x-${ecriture_parenthese_si_negatif(b * d)}=${a * c}x^2-${ecriture_parenthese_si_negatif(b * c)}x~$ pour $~x=${x1}~$, pour $~x=${x2}~$ puis pour $~x=${x3}$`;
					texte_corr = `Pour $x=${x1}$ : <br>`;
					texte_corr += `$${a * d}x-${ecriture_parenthese_si_negatif(b * d)}=${a * d}\\times ${ecriture_parenthese_si_negatif(x1)}-${ecriture_parenthese_si_negatif(b * d)}=${a * d * x1 - d * b}$ <br> $${a * c}x^2-${ecriture_parenthese_si_negatif(b * c)}x=${a * c}\\times ${ecriture_parenthese_si_negatif(x1)}^2-${ecriture_parenthese_si_negatif(b * c)}\\times ${ecriture_parenthese_si_negatif(x1)}=${a * c * x1 * x1}-${ecriture_parenthese_si_negatif(b * c * x1)}=${a * c * x1 * x1 - b * c * x1}$<br>`;
					texte_corr += `$${a * d * x1 - d * b}\\not=${a * c * x1 * x1 - b * c * x1}$ donc l'égalité n'est pas vraie.<br><br>`;
					texte_corr += `Pour $x=${x2}$ : <br>`;
					texte_corr += `$${a * d}x-${ecriture_parenthese_si_negatif(b * d)}=${a * d}\\times ${ecriture_parenthese_si_negatif(x2)}-${ecriture_parenthese_si_negatif(b * d)}=${a * d * x2 - d * b}$ <br> $${a * c}x^2-${ecriture_parenthese_si_negatif(b * c)}x=${a * c}\\times ${ecriture_parenthese_si_negatif(x2)}^2-${ecriture_parenthese_si_negatif(b * c)}\\times ${ecriture_parenthese_si_negatif(x2)}=${a * c * x2 * x2}-${ecriture_parenthese_si_negatif(b * c * x2)}=${a * c * x2 * x2 - b * c * x2}$<br>`;
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`;
					texte_corr += `Pour $x=${x3}$ : <br>`;
					texte_corr += `$${a * d}x-${ecriture_parenthese_si_negatif(b * d)}=${a * d}\\times ${ecriture_parenthese_si_negatif(x3)}-${ecriture_parenthese_si_negatif(b * d)}=${a * d * x3 - d * b}$ <br> $${a * c}x^2-${ecriture_parenthese_si_negatif(b * c)}x=${a * c}\\times ${ecriture_parenthese_si_negatif(x3)}^2-${ecriture_parenthese_si_negatif(b * c)}\\times ${ecriture_parenthese_si_negatif(x3)}=${a * c * x3 * x3}-${ecriture_parenthese_si_negatif(b * c * x3)}=${a * c * x3 * x3 - b * c * x3}$<br>`;
					texte_corr += `On trouve le même résultat pour le membre de gauche et pour le membre de droite donc l'égalité est vraie.<br><br>`;
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
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : Entiers naturels\n2 : Entiers relatifs"];
	this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];
}
