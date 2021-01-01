import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,abs,pgcd,mise_en_evidence,tex_fraction} from "/modules/outils.js"


/**
* Effectuer l'addition ou la soustraction de deux fractions dont un dénominateur est un multiple de l'autre.
*
* Le résultat de la soustraction sera toujours positif.
*
* Le coefficient est paramétrable, par défaut il est inférieur à 11.
*
* On peut paramétrer de n'avoir que des soustractions.
* @Auteur Rémi Angot
* 5N20
*/
export default function Exercice_additionner_ou_soustraire_des_fractions_5e(max = 11) {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max; // Correspond au facteur commun
	this.sup2 = false; // Si true alors il n'y aura que des soustractions
	this.titre = "Additionner ou soustraire deux fractions (dénominateurs multiples)";
	this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée";
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;
	this.sup2 = 3;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_type_de_questions;
		if (this.sup2 == 1) {
			liste_type_de_questions = combinaison_listes(['+'], this.nb_questions);
		}
		if (this.sup2 == 2) {
			liste_type_de_questions = combinaison_listes(['-'], this.nb_questions);
		}
		if (this.sup2 == 3) {
			liste_type_de_questions = combinaison_listes(['+', '-'], this.nb_questions);
		}
		for (let i = 0, a, b, c, d, k, texte, texte_corr; i < this.nb_questions; i++) {
			// les numérateurs
			a = randint(1, 9);
			// les dénominateurs
			b = randint(2, 9, a);
			while (b == a) {
				b = randint(2, 9); // pas de fraction avec numérateur et dénominateur égaux
			}
			k = randint(2, this.sup);
			d = b * k;
			if (liste_type_de_questions[i] == '-') {
				c = choice([randint(1, b * k), randint(b * k, 9 * k)]);
			} else {
				c = randint(1, 19, d);
			}
			if (liste_type_de_questions[i] == '+') { //une addition
				let ordre_des_fractions = randint(1, 2);
				if (ordre_des_fractions == 1) {
					texte = `$${tex_fraction(a, b)}+${tex_fraction(c, d)}=$`;
				} else {
					texte = `$${tex_fraction(c, d)}+${tex_fraction(a, b)}=$`;
				}
				if (ordre_des_fractions == 1) {
					texte_corr = `$${tex_fraction(a, b)}+${tex_fraction(c, d)}=${tex_fraction(a + mise_en_evidence('\\times ' + k), b + mise_en_evidence('\\times ' + k))}+${tex_fraction(c, d)}`;
					texte_corr += `=${tex_fraction(a * k, b * k)}+${tex_fraction(c, d)}=${tex_fraction(a * k + `+` + c, d)}=${tex_fraction(a * k + c, d)}$`;
				} else {
					texte_corr = `$${tex_fraction(c, d)}+${tex_fraction(a, b)}=${tex_fraction(c, d)}+${tex_fraction(a + mise_en_evidence('\\times ' + k), b + mise_en_evidence('\\times ' + k))}`;
					texte_corr += `=${tex_fraction(c, d)}+${tex_fraction(a * k, b * k)}=${tex_fraction(c + '+' + a * k, d)}=${tex_fraction(a * k + c, d)}$`;
				}
				// Est-ce que le résultat est simplifiable ?
				let s = pgcd(a * k + c, d);
				if (s != 1) {
					texte_corr += `$=${tex_fraction(Algebrite.eval((a * k + c) / s) + mise_en_evidence('\\times ' + s), Algebrite.eval(d / s) + mise_en_evidence('\\times ' + s))}=${tex_fraction(Algebrite.eval((a * k + c) / s), Algebrite.eval(d / s))}$`;
				}
			} else { //une soustraction
				if ((a / b) > (c / d)) {
					texte = `$${tex_fraction(a, b)}-${tex_fraction(c, d)}=$`;
				} else {
					texte = texte = `$${tex_fraction(c, d)}-${tex_fraction(a, b)}=$`;
				}
				if ((a / b) > (c / d)) {
					texte_corr = `$${tex_fraction(a, b)}-${tex_fraction(c, d)}=${tex_fraction(a + mise_en_evidence('\\times ' + k), b + mise_en_evidence('\\times ' + k))}-${tex_fraction(c, d)}`;
					texte_corr += `=${tex_fraction(a * k, b * k)}-${tex_fraction(c, d)}=${tex_fraction(a * k + `-` + c, d)}=${tex_fraction(a * k - c, d)}$`;
				} else {
					texte_corr = `$${tex_fraction(c, d)}-${tex_fraction(a, b)}=${tex_fraction(c, d)}-${tex_fraction(a + mise_en_evidence('\\times ' + k), b + mise_en_evidence('\\times ' + k))}`;
					texte_corr += `=${tex_fraction(c, d)}-${tex_fraction(a * k, b * k)}=${tex_fraction(c + '-' + a * k, d)}=${tex_fraction(c - a * k, d)}$`;
				}
				// Est-ce que le résultat est simplifiable ?
				let s = pgcd(a * k - c, d);
				if (abs(a * k - c) % d == 0) { //si la fraction peut-être un nombre entier
					texte_corr += `$=${Algebrite.eval((abs(a * k - c)) / d)}$`;
				} else if (s != 1) {
					texte_corr += `$=${tex_fraction(Algebrite.eval((abs(a * k - c)) / s) + mise_en_evidence('\\times ' + s), Algebrite.eval(d / s) + mise_en_evidence('\\times ' + s))}=${tex_fraction(Algebrite.eval((abs(a * k - c)) / s), Algebrite.eval(d / s))}$`;
				}
			}

			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	};
	this.besoin_formulaire_numerique = ['Valeur maximale du coefficient multiplicateur', 99999];
	this.besoin_formulaire2_numerique = ['Types de calculs ', 3, '1 : Additions\n2 : Soustractions\n3 : Additions et soustractions'];
}
