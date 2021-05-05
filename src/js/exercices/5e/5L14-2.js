
import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,enleveElement,choice,range,combinaisonListes,ecritureParentheseSiNegatif,lettreDepuisChiffre} from '../../modules/outils.js'

export const amcReady = true

export const titre = 'Substitution'

/**
* x, y, z étant 3 entiers compris entre 2 et 9, calculer :
* * kx
* * kx-y
* * xy
* * x+y
* * x+y+z
* * x(y+z)
* * x^2
* * x^2+ky
* * x^2+y^2
* * ax^2+y^2
* * ax^2+bx+c
* @Auteur Rémi Angot
* 5L14-2
*/
export default function Exercice_substituer(difficulte = 1) {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = difficulte;
	this.titre = titre;
	this.consigne = 'Calculer';
	this.spacing = 1;
	this.consigneModifiable = false;


	this.nouvelleVersion = function () {
		this.qcm=['5L14-2',[],'Substitution',4,{}]

		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées
let reponse
		let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let k = randint(2, 9);
		let k2 = randint(2, 9);
		let k3 = randint(2, 9);
		if (this.sup > 1) { // si difficulté 2, k, k2 et k3 peuvent être négatifs !!! La correction est à faire. Exercice non fini
			k = k * choice([-1, 1]);
			k2 = k2 * choice([-1, 1]);
			k3 = k3 * choice([-1, 1]);
		}
		let valeurs_possibles = range(9, [0, 1]); // Toutes les valeurs de 2 à 9
		let x = choice(valeurs_possibles);
		enleveElement(valeurs_possibles, x);
		let y = choice(valeurs_possibles);
		enleveElement(valeurs_possibles, y);
		let z = choice(valeurs_possibles);
		// x, y et z sont différents
		if (sortieHtml){
			this.consigne = `Calculer pour $\\boldsymbol{x=${x}}$, $\\boldsymbol{y=${y}}$ et $\\boldsymbol{z=${z}}$.`;
		} else {
			this.consigne = `Calculer pour $x=${x}$, $y=${y}$ et $z=${z}$.`;
		}
		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			switch (liste_type_de_questions[i]) {
				case 1:
					texte = `$${lettreDepuisChiffre(i + 1)}=${k}x$`;
					texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}x=${k}\\times  ${x}=${k * x}$`;
					reponse=k*x
					break;
				case 2:
					texte = `$${lettreDepuisChiffre(i + 1)}=${k}x-y$`;
					texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}x-y=${k}\\times  ${x}-${y}=${k * x - y}$`;
					reponse=k*x-y
					break;
				case 3:
					texte = `$${lettreDepuisChiffre(i + 1)}=xy$`;
					texteCorr = `$${lettreDepuisChiffre(i + 1)}=xy=${x}\\times  ${y}=${x * y}$`;
					reponse=x*y
					break;
				case 4:
					texte = `$${lettreDepuisChiffre(i + 1)}=x+y$`;
					texteCorr = `$${lettreDepuisChiffre(i + 1)}=x+y=${x}+${y}=${x + y}$`;
					reponse=x+y
					break;
				case 5:
					texte = `$${lettreDepuisChiffre(i + 1)}=xy+z$`;
					texteCorr = `$${lettreDepuisChiffre(i + 1)}=xy+z=${x}\\times  ${y}+${z}=${x * y + z}$`;
					reponse=x*y+z
					break;
				case 6:
					texte = `$${lettreDepuisChiffre(i + 1)}=x(y+z)$`;
					texteCorr = `$${lettreDepuisChiffre(i + 1)}=x(y+z)=${x}\\times (${y}+${z})=${x * (y + z)}$`;
					reponse=x*(y+z)
					break;
				case 7:
					texte = `$${lettreDepuisChiffre(i + 1)}=x^2+${ecritureParentheseSiNegatif(k)}y$`;
					texteCorr = `$${lettreDepuisChiffre(i + 1)}=x^2+${ecritureParentheseSiNegatif(k)}y=${x}^2+${ecritureParentheseSiNegatif(k)}\\times  ${y}=${x * x}+${ecritureParentheseSiNegatif(k)}\\times  ${y}=${x * x + k * y}$`;
					reponse =x*x+y
					break;
				case 8:
					texte = `$${lettreDepuisChiffre(i + 1)}=x^2+y^2$`;
					texteCorr = `$${lettreDepuisChiffre(i + 1)}=x^2+y^2=${x}^2+${y}^2=${x * x}+${y * y}=${x * x + y * y}$`;
					reponse=x*x+y*y
					break;
				case 9:
					texte = `$${lettreDepuisChiffre(i + 1)}=${k}x^2+y^2$`;
					texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}x^2+y^2=${k}\\times  ${x}^2+${y}^2=${k}\\times  ${x * x}+${y * y}=${k * x * x + y * y}$`;
					reponse=k*x*x+y*y
					break;
				case 10:
					texte = `$${lettreDepuisChiffre(i + 1)}=${k}x^2+${ecritureParentheseSiNegatif(k2)}x+${ecritureParentheseSiNegatif(k3)}$`;
					texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}x^2+${ecritureParentheseSiNegatif(k2)}x+${ecritureParentheseSiNegatif(k3)}=${k}\\times  ${x}^2+${ecritureParentheseSiNegatif(k2)}\\times  ${ecritureParentheseSiNegatif(x)}+${ecritureParentheseSiNegatif(k3)}=${k}\\times  ${x * x}+${ecritureParentheseSiNegatif(k2)}\\times  ${x}+${ecritureParentheseSiNegatif(k3)}=${k * x * x + k2 * x + k3}$`;
					reponse=k*x*x+k2*x+k3
					break;

			}

			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				this.qcm[1].push([texte+'\\\\'+this.consigne, [texteCorr,reponse], {digits:3,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}])
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);
	};
	this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif'];
}
