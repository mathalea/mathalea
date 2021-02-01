import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,range1,combinaison_listes,rien_si_1,calcul,tex_nombrec,lettre_depuis_chiffre,tex_nombre} from "/modules/outils.js"

/**
* Réduire une expression
*
* * ax+bx+c
* * ax+b+x+c
* * ax^2+bx+c+dx^2+x
* * a+x+b+c+dx
* * ax+y+bx+c+dy
* * ax+b-cx
* @Auteur Rémi Angot
* 5L12
*/
export default function Reduire_une_expression_litterale() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Réduire une expression littérale";
	this.consigne = "Réduire les expressions suivantes";
	this.nb_questions = 5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 9; // valeur maximale des coefficients
	this.sup2 = false; // avec des nombres décimaux

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(7);
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			let a, b, c, d;
			if (this.sup2) {
				a = calcul(randint(2, this.sup) + randint(1, 9) / 10);
				b = choice([calcul(randint(2, 9) + randint(1, 9) / 10), calcul(randint(2, 9) + randint(1, 9) / 10 + randint(1, 9) / 100)]);
				c = calcul(randint(2, this.sup) + randint(1, 9) / 10);
				d = choice([calcul(randint(2, 9) + randint(1, 9) / 10), calcul(randint(2, 9) + randint(1, 9) / 10 + randint(1, 9) / 100)]);
			} else {
				a = randint(2, this.sup);
				b = randint(2, this.sup);
				c = randint(2, this.sup);
				d = randint(2, this.sup);
			}
			switch (liste_type_de_questions[i]) {
				case 1: // ax+bx+c	
					texte = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x+${tex_nombre(b)}x+${tex_nombre(c)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x+${tex_nombre(b)}x+${tex_nombre(c)}=${tex_nombre(calcul(a + b))}x+${tex_nombre(c)}$`;
					break;
				case 2: // ax+b+x+c
					texte = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x+${tex_nombre(b)}+x+${tex_nombre(c)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x+${tex_nombre(b)}+x+${tex_nombre(c)}=${tex_nombre(calcul(a + 1))}x+${tex_nombre(calcul(b + c))}$`;
					break;
				case 3: // ax^2+bx+c+dx^2+x
					texte = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x^2+${tex_nombre(b)}x+${tex_nombre(c)}+${tex_nombre(d)}x^2+x$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x^2+${tex_nombre(b)}x+${tex_nombre(c)}+${tex_nombre(d)}x^2+x=${tex_nombre(calcul(a + d))}x^2+${tex_nombre(calcul(b + 1))}x+${tex_nombre(c)}$`;
					break;
				case 4: // a+x+b+c+dx
					texte = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}+x+${tex_nombre(b)}+${tex_nombre(c)}+${tex_nombre(d)}x$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}+x+${tex_nombre(b)}+${tex_nombre(c)}+${tex_nombre(d)}x=${tex_nombrec(1 + d)}x+${tex_nombrec(a + b + c)}$`;
					break;
				case 5: // ax+y+bx+c+dy
					texte = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x+y+${tex_nombre(b)}x+${tex_nombre(c)}+${tex_nombre(d)}y$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x+y+${tex_nombre(b)}x+${tex_nombre(c)}+${tex_nombre(d)}y=${tex_nombrec(a + b)}x+${tex_nombrec(1 + d)}y+${tex_nombre(c)}$`;
					break;
				case 6: // ax+b-cx
					if (c > a) {
						[a, c] = [c, a]; //pour s'assurer que a-c est positif
					}
					if (c == a) {
						a++;
					}
					texte = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x+${tex_nombre(b)}-${tex_nombre(c)}x$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x+${tex_nombre(b)}-${tex_nombre(c)}x=${tex_nombrec(a - c)}x+${tex_nombre(b)}$`;
					break;
				case 7: // ax-cx
					if (c > a) {
						[a, c] = [c, a]; //pour s'assurer que a-c est positif
					}
					if (c == a) {
						a++;
					}
					texte = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x-${tex_nombre(c)}x$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${tex_nombre(a)}x-${tex_nombre(c)}x=${rien_si_1(tex_nombrec(a - c))}x$`;
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
	this.besoin_formulaire_numerique = ['Valeur maximale des coefficients', 999];
	this.besoin_formulaire2_case_a_cocher = ['Avec des nombres décimaux'];
}
