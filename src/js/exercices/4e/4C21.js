import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,ecritureNombreRelatif,ecritureParentheseSiNegatif,pgcd,simplification_de_fraction_avec_etapes,calcul,miseEnEvidence,tex_fraction,ppcm} from '../../modules/outils.js'
import {fractionSimplifiee,texFractionReduite} from '../../modules/outils.js'


export const amcReady = true

export const titre = 'Additionner ou soustraire deux fractions'

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
	this.titre = titre;
	this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée.";
	this.spacing = 2;
	this.spacingCorr = 2;
	this.nbQuestions = 5;
	this.nbColsCorr = 1;

	this.nouvelleVersion = function () {
		this.qcm=['4C21',[],'Additionner ou soustraire deux fractions',6,{}]
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles;
		if (this.sup == 1) {
			type_de_questions_disponibles = ['b_multiple_de_d', 'd_multiple_de_b', 'b_multiple_de_d', 'd_multiple_de_b', 'entier'];
		}
		if (this.sup == 2) {
			type_de_questions_disponibles = ['ppcm', 'ppcm', 'premiers_entre_eux', choice(['b_multiple_de_d', 'd_multiple_de_b']), 'entier'];
		}
		let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_de_plus_ou_moins = combinaisonListes(['-', '-', '+', '+'], this.nbQuestions);
		for (let i = 0, a, b, c, d, k, k1, k2, num, den, texte, texteCorr, type_de_questions; i < this.nbQuestions; i++) {
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
			texteCorr = `$${tex_fraction(a, b)}${plus_ou_moins}${tex_fraction(c, d)}`;

			// a/b(+ou-)c/d = num/den (résultat non simplifié)
			if (type_de_questions == 'ppcm' || type_de_questions == 'premiers_entre_eux') {
				texteCorr += `=${tex_fraction(a + miseEnEvidence('\\times ' + k1), b + miseEnEvidence('\\times ' + k1))}${plus_ou_moins}${tex_fraction(c + miseEnEvidence('\\times ' + k2), d + miseEnEvidence('\\times ' + k2))}`;
				num = calcul(a * k1 + plus_ou_moins + ecritureNombreRelatif(c * k2));
				den = b * k1;
				texteCorr += `=${tex_fraction(a * k1 + plus_ou_moins + ecritureParentheseSiNegatif(c * k2), den)}`;

			}

			if (type_de_questions == 'd_multiple_de_b') {
				texteCorr += `=${tex_fraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}${plus_ou_moins}${tex_fraction(c, d)}`;
				num = calcul(a * k + plus_ou_moins + ecritureNombreRelatif(c));
				den = b * k;
				texteCorr += `=${tex_fraction(a * k + plus_ou_moins + ecritureParentheseSiNegatif(c), den)}`;
			}

			if (type_de_questions == 'b_multiple_de_d') {
				texteCorr += `=${tex_fraction(a, b)}${plus_ou_moins}${tex_fraction(c + miseEnEvidence('\\times ' + k), d + miseEnEvidence('\\times ' + k))}`;
				num = calcul(a + plus_ou_moins + ecritureNombreRelatif(c * k));
				den = b;
				texteCorr += `=${tex_fraction(a + plus_ou_moins + ecritureParentheseSiNegatif(c * k), den)}`;
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
					texteCorr = texte;
					texteCorr += `$${tex_fraction(n + miseEnEvidence('\\times ' + b), miseEnEvidence(b))}${plus_ou_moins}${tex_fraction(a, b)}`;
					texteCorr += `=${tex_fraction(n * b + plus_ou_moins + ecritureParentheseSiNegatif(a), b)}`;
				} else {
					// a/b +-n
					if (!this.sup2 && plus_ou_moins == "-" && n > a / b) {
						n = randint(1, 4); // 
						a = n * b + randint(1, 9); //(n*b+?)/b-n>0
					}
					texte = `$${tex_fraction(a, b)}${plus_ou_moins}${ecritureParentheseSiNegatif(n)}=$`;
					texteCorr = texte;
					texteCorr += `$${tex_fraction(a, b)}${plus_ou_moins}${tex_fraction(n + miseEnEvidence('\\times ' + b), miseEnEvidence(b))}`;
					texteCorr += `=${tex_fraction(a + '+' + ecritureParentheseSiNegatif(n * b), b)}`;
				}
				num = calcul(n * b + plus_ou_moins + ecritureParentheseSiNegatif(a));
				den = b;
			}
			texteCorr += `=${tex_fraction(num, den)}`;
			texteCorr += simplification_de_fraction_avec_etapes(num, den) + '$';			
			// Pour l'instant pour tester je mets num et den dans reponse
			let reponse = {num:fractionSimplifiee(num,den)[0],den:fractionSimplifiee(num,den)[1]};
			this.listeQuestions.push(texte);
			this.listeCorrections.push(texteCorr);
			this.qcm[1].push([
				`Calculer $${texte.substring(1, texte.length - 2)}$ et donner le résultat sous forme irreductible`,
				[[texteCorr,reponse.num,3],[texteCorr,reponse.den,3]],
				[{texte:'numérateur',digits:reponse.num.toString().length,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0},{texte:'dénominateur',digits:reponse.den.toString().length,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}]				
			]);			
		}
		listeQuestionsToContenu(this); //Espacement de 2 em entre chaque questions.
	};
	this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, "1 : Un dénominateur multiple de l'autre\n\
2 : Cas général"];
	this.besoin_formulaire2_case_a_cocher = ['Avec des nombres relatifs'];

}
