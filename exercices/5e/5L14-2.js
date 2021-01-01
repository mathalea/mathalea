
import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,enleve_element,choice,range,combinaison_listes,ecriture_parenthese_si_negatif,lettre_depuis_chiffre} from "/modules/outils.js"

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
	this.titre = "Substitution";
	this.consigne = 'Calculer';
	this.spacing = 1;
	this.consigne_modifiable = false;


	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
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
		enleve_element(valeurs_possibles, x);
		let y = choice(valeurs_possibles);
		enleve_element(valeurs_possibles, y);
		let z = choice(valeurs_possibles);
		// x, y et z sont différents
		if (sortie_html){
			this.consigne = `Calculer pour $\\boldsymbol{x=${x}}$, $\\boldsymbol{y=${y}}$ et $\\boldsymbol{z=${z}}$.`;
		} else {
			this.consigne = `Calculer pour $x=${x}$, $y=${y}$ et $z=${z}$.`;
		}
		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			switch (liste_type_de_questions[i]) {
				case 1:
					texte = `$${lettre_depuis_chiffre(i + 1)}=${k}x$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${k}x=${k}\\times  ${x}=${k * x}$`;
					break;
				case 2:
					texte = `$${lettre_depuis_chiffre(i + 1)}=${k}x-y$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${k}x-y=${k}\\times  ${x}-${y}=${k * x - y}$`;
					break;
				case 3:
					texte = `$${lettre_depuis_chiffre(i + 1)}=xy$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=xy=${x}\\times  ${y}=${x * y}$`;
					break;
				case 4:
					texte = `$${lettre_depuis_chiffre(i + 1)}=x+y$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=x+y=${x}+${y}=${x + y}$`;
					break;
				case 5:
					texte = `$${lettre_depuis_chiffre(i + 1)}=xy+z$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=xy+z=${x}\\times  ${y}+${z}=${x * y + z}$`;
					break;
				case 6:
					texte = `$${lettre_depuis_chiffre(i + 1)}=x(y+z)$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=x(y+z)=${x}\\times (${y}+${z})=${x * (y + z)}$`;
					break;
				case 7:
					texte = `$${lettre_depuis_chiffre(i + 1)}=x^2+${ecriture_parenthese_si_negatif(k)}y$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=x^2+${ecriture_parenthese_si_negatif(k)}y=${x}^2+${ecriture_parenthese_si_negatif(k)}\\times  ${y}=${x * x}+${ecriture_parenthese_si_negatif(k)}\\times  ${y}=${x * x + k * y}$`;
					break;
				case 8:
					texte = `$${lettre_depuis_chiffre(i + 1)}=x^2+y^2$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=x^2+y^2=${x}^2+${y}^2=${x * x}+${y * y}=${x * x + y * y}$`;
					break;
				case 9:
					texte = `$${lettre_depuis_chiffre(i + 1)}=${k}x^2+y^2$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${k}x^2+y^2=${k}\\times  ${x}^2+${y}^2=${k}\\times  ${x * x}+${y * y}=${k * x * x + y * y}$`;
					break;
				case 10:
					texte = `$${lettre_depuis_chiffre(i + 1)}=${k}x^2+${ecriture_parenthese_si_negatif(k2)}x+${ecriture_parenthese_si_negatif(k3)}$`;
					texte_corr = `$${lettre_depuis_chiffre(i + 1)}=${k}x^2+${ecriture_parenthese_si_negatif(k2)}x+${ecriture_parenthese_si_negatif(k3)}=${k}\\times  ${x}^2+${ecriture_parenthese_si_negatif(k2)}\\times  ${ecriture_parenthese_si_negatif(x)}+${ecriture_parenthese_si_negatif(k3)}=${k}\\times  ${x * x}+${ecriture_parenthese_si_negatif(k2)}\\times  ${x}+${ecriture_parenthese_si_negatif(k3)}=${k * x * x + k2 * x + k3}$`;
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
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, '1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif'];
}
