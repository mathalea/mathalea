import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,rien_si_1,ecriture_algebrique,ecriture_parenthese_si_negatif,signe,abs,pgcd,tex_fraction_reduite,mise_en_evidence,tex_fraction} from "/modules/outils.js"
/**
* Équation du premier degré
* * Type 1 : ax+b=cx+d
* * Type 2 : k(ax+b)=cx+d
* * Type 3 : k-(ax+b)=cx+d
* * Tous les types
* @Auteur Rémi Angot
* 3L13-1
*/
export default function Exercice_equation1_2() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Équation du premier degré (utilisant la distributivité)";
	this.consigne = 'Résoudre les équations suivantes';
	this.spacing = 2;
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 2;
	this.correction_detaillee_disponible = true;
	if (!sortie_html) {
		this.correction_detaillee = false;
	}
	this.nb_questions = 3;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_type_de_questions = ['ax+b=cx+d', 'k(ax+b)=cx+d', 'k-(ax+b)=cx+d'];
		liste_type_de_questions = combinaison_listes(liste_type_de_questions, this.nb_questions);
		for (let i = 0, a, b, c, d, k,texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(-9, 9, 0);
			b = randint(-9, 9, 0);
			c = randint(-9, 9, 0);
			d = randint(-9, 9, 0);
			k = randint(2, 9);
			if (liste_type_de_questions[i] == 'ax+b=cx+d') {
				if (c == a) { c = randint(1, 9, [a]); } // sinon on arrive à une division par 0
				if (!this.sup && a < c) {
					c = randint(1, 9);
					a = randint(c + 1, 15); // a sera plus grand que c pour que a-c>0
				}
				texte = `$${rien_si_1(a)}x${ecriture_algebrique(b)}=${rien_si_1(c)}x${ecriture_algebrique(d)}$`;
				texte_corr = texte + '<br>';
				if (this.correction_detaillee) {
					if (c > 0) {
						texte_corr += `On soustrait $${rien_si_1(c)}x$ aux deux membres.<br>`;
					} else {
						texte_corr += `On ajoute $${rien_si_1(-1 * c)}x$ aux deux membres.<br>`;
					}
				}
				texte_corr += `$${rien_si_1(a)}x${ecriture_algebrique(b)}${mise_en_evidence(signe(-1 * c) + rien_si_1(abs(c)) + 'x')}=${c}x+${d}${mise_en_evidence(signe(-1 * c) + rien_si_1(abs(c)) + 'x')}$<br>`;
				texte_corr += `$${rien_si_1(a - c)}x${ecriture_algebrique(b)}=${d}$<br>`;
				if (this.correction_detaillee) {
					if (b > 0) {
						texte_corr += `On soustrait $${b}$ aux deux membres.<br>`;
					} else {
						texte_corr += `On ajoute $${-1 * b}$ aux deux membres.<br>`;
					}
				}
				texte_corr += `$${rien_si_1(a - c)}x${ecriture_algebrique(b)}${mise_en_evidence(ecriture_algebrique(-1 * b))}=${d}${mise_en_evidence(ecriture_algebrique(-1 * b))}$<br>`;
				texte_corr += `$${rien_si_1(a - c)}x=${d - b}$<br>`;

				if (this.correction_detaillee) { texte_corr += `On divise les deux membres par $${a - c}$.<br>`; }
				texte_corr += `$${rien_si_1(a - c)}x${mise_en_evidence('\\div' + ecriture_parenthese_si_negatif(a - c))}=${d - b + mise_en_evidence('\\div' + ecriture_parenthese_si_negatif(a - c))}$<br>`;
				texte_corr += `$x=${tex_fraction(d - b, a - c)}$`;
				if (pgcd(abs(d - b), abs(a - c)) > 1 || (a - c) < 0) {
					texte_corr += `<br>$x=${tex_fraction_reduite(d - b, a - c)}$`;
				}
				texte_corr += `<br> La solution est $${tex_fraction_reduite(d - b, a - c)}$.`;
			}

			if (liste_type_de_questions[i] == 'k(ax+b)=cx+d') {
				if (c == k * a) { c = randint(1, 9, [a]); } // sinon on arrive à une division par 0
				texte = `$${k}(${rien_si_1(a)}x${ecriture_algebrique(b)})=${rien_si_1(c)}x${ecriture_algebrique(d)}$`;
				texte_corr = texte + '<br>';
				if (this.correction_detaillee) {
					texte_corr += 'On développe le membre de gauche.<br>';
				}
				texte_corr += `$${k * a}x${ecriture_algebrique(k * b)}=${rien_si_1(c)}x${ecriture_algebrique(d)}$<br>`;
				if (this.correction_detaillee) {
					if (c > 0) {
						texte_corr += `On soustrait $${rien_si_1(c)}x$ aux deux membres.<br>`;
					} else {
						texte_corr += `On ajoute $${rien_si_1(-1 * c)}x$ aux deux membres.<br>`;
					}
				}
				texte_corr += `$${k * a}x${ecriture_algebrique(k * b)}${mise_en_evidence(signe(-1 * c) + rien_si_1(abs(c)) + 'x')}=${c}x${ecriture_algebrique(d)}${mise_en_evidence(signe(-1 * c) + rien_si_1(abs(c)) + 'x')}$<br>`;
				texte_corr += `$${rien_si_1(k * a - c)}x${ecriture_algebrique(k * b)}=${d}$<br>`;
				if (this.correction_detaillee) {
					if (k * b > 0) {
						texte_corr += `On soustrait $${k * b}$ aux deux membres.<br>`;
					} else {
						texte_corr += `On ajoute $${-k * b}$ aux deux membres.<br>`;
					}
				}
				texte_corr += `$${rien_si_1(k * a - c)}x${ecriture_algebrique(k * b)}${mise_en_evidence(ecriture_algebrique(-k * b))}=${d}${mise_en_evidence(ecriture_algebrique(-k * b))}$<br>`;
				texte_corr += `$${rien_si_1(k * a - c)}x=${d - k * b}$<br>`;

				if (this.correction_detaillee) { texte_corr += `On divise les deux membres par $${k * a - c}$.<br>`; }
				texte_corr += `$${rien_si_1(k * a - c)}x${mise_en_evidence('\\div' + ecriture_parenthese_si_negatif(k * a - c))}=${d - k * b + mise_en_evidence('\\div' + ecriture_parenthese_si_negatif(k * a - c))}$<br>`;
				texte_corr += `$x=${tex_fraction(d - k * b, k * a - c)}$`;
				if (pgcd(abs(d - k * b), abs(k * a - c)) > 1 || (k * a - c) < 0) {
					texte_corr += `<br>$x=${tex_fraction_reduite(d - k * b, k * a - c)}$`;
				}
				texte_corr += `<br> La solution est $${tex_fraction_reduite(d - k * b, k * a - c)}$.`;
			}

			if (liste_type_de_questions[i] == 'k-(ax+b)=cx+d') {
				if (c == -a) { c = randint(-9, 9, [0, a]); } // sinon on arrive à une division par 0
				texte = `$${k}-(${rien_si_1(a)}x${ecriture_algebrique(b)})=${rien_si_1(c)}x${ecriture_algebrique(d)}$`;
				texte_corr = texte + '<br>';
				if (this.correction_detaillee) {
					texte_corr += 'On développe le membre de gauche.<br>';
				}
				texte_corr += `$${k}${ecriture_algebrique(-a)}x${ecriture_algebrique(-b)}=${rien_si_1(c)}x${ecriture_algebrique(d)}$<br>`;
				texte_corr += `$${rien_si_1(-a)}x${ecriture_algebrique(k - b)}=${rien_si_1(c)}x${ecriture_algebrique(d)}$<br>`;

				//On reprend le cas ax+b=cx+d en changeant les valeurs de a et b
				a = -a;
				b = k - b;

				if (this.correction_detaillee) {
					if (c > 0) {
						texte_corr += `On soustrait $${rien_si_1(c)}x$ aux deux membres.<br>`;
					} else {
						texte_corr += `On ajoute $${rien_si_1(-1 * c)}x$ aux deux membres.<br>`;
					}
				}
				texte_corr += `$${rien_si_1(a)}x${ecriture_algebrique(b)}${mise_en_evidence(signe(-1 * c) + rien_si_1(abs(c)) + 'x')}=${c}x+${d}${mise_en_evidence(signe(-1 * c) + rien_si_1(abs(c)) + 'x')}$<br>`;
				texte_corr += `$${rien_si_1(a - c)}x${ecriture_algebrique(b)}=${d}$<br>`;
				if (this.correction_detaillee) {
					if (b > 0) {
						texte_corr += `On soustrait $${b}$ aux deux membres.<br>`;
					} else {
						texte_corr += `On ajoute $${-1 * b}$ aux deux membres.<br>`;
					}
				}
				texte_corr += `$${rien_si_1(a - c)}x${ecriture_algebrique(b)}${mise_en_evidence(ecriture_algebrique(-1 * b))}=${d}${mise_en_evidence(ecriture_algebrique(-1 * b))}$<br>`;
				texte_corr += `$${rien_si_1(a - c)}x=${d - b}$<br>`;

				if (this.correction_detaillee) { texte_corr += `On divise les deux membres par $${a - c}$.<br>`; }
				texte_corr += `$${rien_si_1(a - c)}x${mise_en_evidence('\\div' + ecriture_parenthese_si_negatif(a - c))}=${d - b + mise_en_evidence('\\div' + ecriture_parenthese_si_negatif(a - c))}$<br>`;
				texte_corr += `$x=${tex_fraction(d - b, a - c)}$`;
				if (pgcd(abs(d - b), abs(a - c)) > 1 || (a - c) < 0) {
					texte_corr += `<br>$x=${tex_fraction_reduite(d - b, a - c)}$`;
				}
				texte_corr += `<br> La solution est $${tex_fraction_reduite(d - b, a - c)}$.`;
			}

			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte); //replace(/1x/g,'x')); //remplace 1x par x
				this.liste_corrections.push(texte_corr); //.replace(/1x/g,'x')); //remplace 1x par x
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	};
}
