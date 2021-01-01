import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_nombre_relatif,ecriture_parenthese_si_negatif,pgcd,simplification_de_fraction_avec_etapes,calcul,mise_en_evidence,tex_fraction,ppcm} from "/modules/outils.js"


/**
* Effectuer la somme ou la différence de deux fractions
*
* * Niveau 1 : 4 fois sur 5 un dénominateur est un multiple de l'autre et une fois sur 5 il faut additionner une fraction et un entier
* * Niveau 2 : 2 fois sur 5, il faut trouver le ppcm, 1 fois sur 5 le ppcm correspond à leur produit, 1 fois sur 5 un dénominateur est multiple de l'autre, 1 fois sur 5 il faut additionner une fraction et un entier
* * Paramètre supplémentaire : utiliser des nommbres relatifs (par défaut tous les nombres sont positifs)
* * 2 fois sur 4 il faut faire une soustraction
* @Auteur Rémi Angot
* 4C21
*/
export default function Exercice_additionner_ou_soustraire_des_fractions() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 2; // Niveau de difficulté
	this.sup2 = false; // Avec ou sans relatifs
	this.titre = "Additionner ou soustraire deux fractions";
	this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée.";
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles;
		if (this.sup == 1) {
			type_de_questions_disponibles = ['b_multiple_de_d', 'd_multiple_de_b', 'b_multiple_de_d', 'd_multiple_de_b', 'entier'];
		}
		if (this.sup == 2) {
			type_de_questions_disponibles = ['ppcm', 'ppcm', 'premiers_entre_eux', choice(['b_multiple_de_d', 'd_multiple_de_b']), 'entier'];
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_de_plus_ou_moins = combinaison_listes(['-', '-', '+', '+'], this.nb_questions);
		for (let i = 0, a, b, c, d, k, k1, k2, num, den, texte, texte_corr, type_de_questions; i < this.nb_questions; i++) {
			let plus_ou_moins = liste_de_plus_ou_moins[i];
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions) {
				case 'ppcm':
					let liste_couples_de_denominateurs = [[6, 9], [4, 6], [8, 12], [9, 12], [10, 15], [10, 25], [6, 21], [12, 30], [6, 8], [50, 75],];
					let couples_de_denominateurs = choice(liste_couples_de_denominateurs);
					if (choice([true, false])) {
						b = couples_de_denominateurs[0];
						d = couples_de_denominateurs[1];
					} else {
						b = couples_de_denominateurs[1];
						d = couples_de_denominateurs[0];
					}
					k1 = ppcm(b, d) / b;
					k2 = ppcm(b, d) / d;
					break;

				case 'premiers_entre_eux':
					b = randint(2, 9);
					d = randint(2, 9);
					while (pgcd(b, d) != 1) {
						b = randint(2, 9);
						d = randint(2, 9);
					}
					k1 = ppcm(b, d) / b;
					k2 = ppcm(b, d) / d;
					break;

				case 'd_multiple_de_b':
					b = randint(2, 9);
					k = randint(2, 11);
					d = b * k;
					break;

				case 'b_multiple_de_d':
					d = randint(2, 9);
					k = randint(2, 11);
					b = d * k;
					break;
			}

			a = randint(1, 9, [b]);
			c = randint(1, 9, [d]);
			if (this.sup2) { //si les numérateurs sont relatifs
				a = a * choice([-1, 1]);
				c = c * choice([-1, 1]);

			}
			if (!this.sup2 && plus_ou_moins == '-' && a / b < c / d) { //s'il n'y a pas de relatifs, il faut s'assurer que la soustraction soit positive
				[a, b, c, d] = [c, d, a, b]; // on échange les 2 fractions
				k1 = ppcm(b, d) / b;
				k2 = ppcm(b, d) / d;
				if (type_de_questions == 'd_multiple_de_b') {
					type_de_questions = 'b_multiple_de_d'; //comme on a échangé les 2 fractions, le type de la question change
					k = b / d;
				} else if (type_de_questions == 'b_multiple_de_d') {
					type_de_questions = 'd_multiple_de_b'; //comme on a échangé les 2 fractions, le type de la question change
					k = d / b;
				}
				let echange = true;
			}
			texte = `$${tex_fraction(a, b)}${plus_ou_moins}${tex_fraction(c, d)}=$`;
			texte_corr = `$${tex_fraction(a, b)}${plus_ou_moins}${tex_fraction(c, d)}`;

			// a/b(+ou-)c/d = num/den (résultat non simplifié)
			if (type_de_questions == 'ppcm' || type_de_questions == 'premiers_entre_eux') {
				texte_corr += `=${tex_fraction(a + mise_en_evidence('\\times ' + k1), b + mise_en_evidence('\\times ' + k1))}${plus_ou_moins}${tex_fraction(c + mise_en_evidence('\\times ' + k2), d + mise_en_evidence('\\times ' + k2))}`;
				num = calcul(a * k1 + plus_ou_moins + ecriture_nombre_relatif(c * k2));
				den = b * k1;
				texte_corr += `=${tex_fraction(a * k1 + plus_ou_moins + ecriture_parenthese_si_negatif(c * k2), den)}`;

			}

			if (type_de_questions == 'd_multiple_de_b') {
				texte_corr += `=${tex_fraction(a + mise_en_evidence('\\times ' + k), b + mise_en_evidence('\\times ' + k))}${plus_ou_moins}${tex_fraction(c, d)}`;
				num = calcul(a * k + plus_ou_moins + ecriture_nombre_relatif(c));
				den = b * k;
				texte_corr += `=${tex_fraction(a * k + plus_ou_moins + ecriture_parenthese_si_negatif(c), den)}`;
			}

			if (type_de_questions == 'b_multiple_de_d') {
				texte_corr += `=${tex_fraction(a, b)}${plus_ou_moins}${tex_fraction(c + mise_en_evidence('\\times ' + k), d + mise_en_evidence('\\times ' + k))}`;
				num = calcul(a + plus_ou_moins + ecriture_nombre_relatif(c * k));
				den = b;
				texte_corr += `=${tex_fraction(a + plus_ou_moins + ecriture_parenthese_si_negatif(c * k), den)}`;
			}

			if (type_de_questions == "entier") {
				a = randint(1, 9);
				b = randint(2, 9, [a]);
				let n = randint(1, 9);
				if (this.sup2) {
					a = a * choice([-1, 1]);
					n = n * choice([-1, 1]);
				}
				if (choice([true, false])) {
					// n+-a/b
					if (!this.sup2 && plus_ou_moins == "-" && n < a / b) {
						n = randint(5, 9); // max(a/b)=9/2
					}
					texte = `$${n}${plus_ou_moins}${tex_fraction(a, b)}=$`;
					texte_corr = texte;
					texte_corr += `$${tex_fraction(n + mise_en_evidence('\\times ' + b), mise_en_evidence(b))}${plus_ou_moins}${tex_fraction(a, b)}`;
					texte_corr += `=${tex_fraction(n * b + plus_ou_moins + ecriture_parenthese_si_negatif(a), b)}`;
				} else {
					// a/b +-n
					if (!this.sup2 && plus_ou_moins == "-" && n > a / b) {
						n = randint(1, 4); // 
						a = n * b + randint(1, 9); //(n*b+?)/b-n>0
					}
					texte = `$${tex_fraction(a, b)}${plus_ou_moins}${ecriture_parenthese_si_negatif(n)}=$`;
					texte_corr = texte;
					texte_corr += `$${tex_fraction(a, b)}${plus_ou_moins}${tex_fraction(n + mise_en_evidence('\\times ' + b), mise_en_evidence(b))}`;
					texte_corr += `=${tex_fraction(a + '+' + ecriture_parenthese_si_negatif(n * b), b)}`;
				}
				num = calcul(n * b + plus_ou_moins + ecriture_parenthese_si_negatif(a));
				den = b;
			}
			texte_corr += `=${tex_fraction(num, den)}`;
			texte_corr += simplification_de_fraction_avec_etapes(num, den) + '$';
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	};
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, "1 : Un dénominateur multiple de l'autre\n\
2 : Cas général"];
	this.besoin_formulaire2_case_a_cocher = ['Avec des nombres relatifs'];

}
