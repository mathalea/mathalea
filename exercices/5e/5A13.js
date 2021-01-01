import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,compare_nombres,tex_nombre} from "/modules/outils.js"


/**
* Décomposer en produit de facteurs premiers un nombre (la décomposition aura 3, 4 ou 5 facteurs premiers)
* @Auteur Rémi Angot
5A13
*/
export default function Exercice_decomposer_en_facteurs_premiers() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = '';
	this.sup2 = '';
	this.titre = "Décomposition en facteurs premiers";
	this.consigne = "Écrire les nombres suivants sous la forme d'un produit de facteurs premiers.";
	this.spacing = 2;
	this.nb_questions = 6;


	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, n, facteurs = [], nb_facteurs, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			facteurs = [];
			nb_facteurs = randint(3, 5);
			for (var k = 0; k < nb_facteurs; k++) {
				if (k < nb_facteurs - 1) {
					if (nb_facteurs > 3 && k == 0) { facteurs.push(2); }
					else if (nb_facteurs > 4 && k == 1) { facteurs.push(2); }
					else {
						facteurs.push(choice([2, 3, 5]));
					}

				}
				else { facteurs.push(choice([2, 5, 7, 11])); }
			}

			if (randint(1, 4) == 1) { //Une fois sur 4 on multilie le nombre par 100
				facteurs.push(2, 2, 5, 5);
			}
			n = 1;
			for (var k = 0; k < facteurs.length; k++) {
				facteurs[k];
				n = n * facteurs[k];
			}
			texte = '$ ' + tex_nombre(n) + ' = \\dotfill $';
			texte_corr = '$ ' + tex_nombre(n) + ' = ';
			facteurs.sort(compare_nombres); //classe les facteurs dans l'ordre croissant
			for (var k = 0; k < facteurs.length - 1; k++) {
				facteurs[k];
				texte_corr += facteurs[k] + ' \\times  ';
			}
			texte_corr += facteurs[facteurs.length - 1] + ' $';


			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;

		}
		liste_de_question_to_contenu(this);
	};

}
