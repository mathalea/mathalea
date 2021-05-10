import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenuSansNumero,randint,choice,ecritureNombreRelatif,ecritureNombreRelatifc,ecritureAlgebrique,ecritureAlgebriquec,signe,sommeDesTermesParSigne,triePositifsNegatifs,lettreDepuisChiffre} from '../../modules/outils.js'


export const titre = 'Additions de 5 nombres relatifs'

/**
* Effectuer la somme de 5 nombres relatifs.
*
* Pour la correction, on commence par effectuer la somme des termes de même signe
*
* * On peut paramétrer les distances à zéro qui sont par défaut inférieures à 20
* * On peut utiliser des écritures simplifiées (ce qui n'est pas le cas par défaut)
* @Auteur Rémi Angot
* 5R20-3
*/
export default function Exercice_additions_de_5_relatifs(max = 20) {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = max;
	this.sup2 = false; // écriture simplifiée
	this.titre = titre;
	this.consigne = 'Calculer';
	this.spacing = 2;
	this.nbCols = 1;
	this.nbColsCorr = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
		for (let i = 0, a, b, c, d, e, s1, s2, s3, s4, relatifs, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(1, this.sup) * choice([-1, 1]);
			b = randint(1, this.sup) * choice([-1, 1]);
			if (a == 1 & b == 1) { // On s'assure que les 3 premières termes n'ont pas le même signe
				c = -1;
			} else if (a == -1 & b == -1) {
				c = 1;
			}
			else {
				c = randint(1, this.sup) * choice([-1, 1]);
			}
			d = randint(1, this.sup) * choice([-1, 1]);
			e = randint(1, this.sup) * choice([-1, 1]);
			s1 = 1; // Que des additions
			s2 = 1;
			s3 = 1;
			s4 = 1;
			if (this.sup2) {
				texte = `$ ${lettreDepuisChiffre(i + 1)} = ${a}${ecritureAlgebrique(b)}${ecritureAlgebrique(c)}${ecritureAlgebrique(d)}${ecritureAlgebrique(e)} = \\dotfill $`;
				if (!sortieHtml) {
					texte += `<br>$ ${lettreDepuisChiffre(i + 1)} = \\dotfill $`;
				}
				texteCorr = `$ ${lettreDepuisChiffre(i + 1)} =  ${a}${ecritureAlgebrique(b)}${ecritureAlgebrique(c)}${ecritureAlgebrique(d)}${ecritureAlgebrique(e)} = ${sommeDesTermesParSigne([a, b, c, d, e])[0]}${ecritureAlgebrique(sommeDesTermesParSigne([a, b, c, d, e])[1])} = ${a + b + c + d + e} $`;
			} else {
				texte = `$ ${lettreDepuisChiffre(i + 1)} =  ${ecritureNombreRelatif(a)}${signe(s1)}${ecritureNombreRelatif(b)}${signe(s2)}${ecritureNombreRelatif(c)}${signe(s3)}${ecritureNombreRelatif(d)}${signe(s4)}${ecritureNombreRelatif(e)} = \\dotfill $`;
				if (!sortieHtml) {
					texte += `<br>$ ${lettreDepuisChiffre(i + 1)} = \\dotfill $`;
				}
				texteCorr = `$ ${lettreDepuisChiffre(i + 1)} =  ${ecritureNombreRelatif(a)}${signe(s1)}${ecritureNombreRelatif(b)}${signe(s2)}${ecritureNombreRelatif(c)}${signe(s3)}${ecritureNombreRelatif(d)}${signe(s4)}${ecritureNombreRelatif(e)} $`;
				relatifs = triePositifsNegatifs([a, s1 * b, s2 * c, s3 * d, s4 * e]);

				if (relatifs[0] > 0 & relatifs[4] < 0) {
					texteCorr += `<br>$ \\phantom{A}= ${ecritureNombreRelatifc(relatifs[0])}+${ecritureNombreRelatifc(relatifs[1])}+${ecritureNombreRelatifc(relatifs[2])}+${ecritureNombreRelatifc(relatifs[3])}+${ecritureNombreRelatifc(relatifs[4])} $`;
				}
				let sommesSignees = sommeDesTermesParSigne([relatifs[0], relatifs[1], relatifs[2], relatifs[3], relatifs[4]]);
				if (sommesSignees[0] != 0 && sommesSignees[1] != 0) {
					texteCorr += `<br>$ \\phantom{A}= ${ecritureNombreRelatifc(sommesSignees[0])}+${ecritureNombreRelatifc(sommesSignees[1])} $`;
					texteCorr += `<br>$ \\phantom{A}= ${ecritureAlgebriquec(a + s1 * b + s2 * c + s3 * d + s4 * e)}$<br>`;
				}

				else if (sommesSignees[0] != 0)
					texteCorr += `<br>$ \\phantom{A}=${ecritureAlgebriquec(sommesSignees[0])}$`;
				else
					texteCorr += `<br>$ \\phantom{A}=${ecritureAlgebriquec(sommesSignees[1])}$<br>`;
			}
			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenuSansNumero(this);
	};
	this.besoinFormulaireNumerique = ['Valeur maximale', 99999];
	this.besoinFormulaire2CaseACocher = ['Avec des écritures simplifiées'];
}
