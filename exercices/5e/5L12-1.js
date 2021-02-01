import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes_sans_changer_ordre,texte_en_couleur} from "/modules/outils.js"
/**
 * 5L12-1
 * Distinction entre la réduction d'un produit et la réduction d'une somme, on garde les même coeffs
 * @author Sébastien Lozano 
 */
export default function Reduire_dinstinction_somme_produit() {
	'use strict'
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;
	if (this.debug) {
		this.nb_questions = 4;
	} else {
		this.nb_questions = 2;
	};
	this.consigne = "";
	//this.nb_questions = 4;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	//this.sup2=false; // si false alors utilisation de nombres entiers, si true alors utilisation de nombres à un chiffre après la virgule.
	this.titre = "Réduire un produit et une somme à partir des mêmes éléments algébriques pour distinguer la différence";
	let type_de_questions_disponibles
	this.nouvelle_version = function () {
		//let type_de_questions_disponibles
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		if (this.debug) {
			type_de_questions_disponibles = [0, 1, 2, 3];
		} else {
			type_de_questions_disponibles = [choice([0, 2]), choice([1, 3])];
		}

		//let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) 
		let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions)

		//if (this.sup2) decimal=10;
		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			// deux fonctions pour gérer la chaine de sortie et supprimer le coeff 1 !
			function isUn(n) {
				if (n == 1) {
					return true;
				} else {
					return false;
				};
			};
			function sliceUn(n) {
				if (n == 1) {
					return ``;
				} else {
					return `${n}`;
				};
			};
			let variables = ['x', 'y', 'z', 't'];
			let enonces = [];
			let n = randint(1, 6);
			let p = randint(1, 6);
			let inc = variables[randint(0, variables.length - 1)];
			//===== 0 le produit puis la somme
			enonces.push({
				enonce: `Simplifier le plus possible le produit puis la somme de $${sliceUn(n)}${inc}$ et de $${sliceUn(p)}${inc}$`,
				questtion: ``,
				correction_produit: `Le produit de $${sliceUn(n)}${inc}$ et de $${sliceUn(p)}${inc}$ vaut : $${sliceUn(n)}${inc}\\times ${sliceUn(p)}${inc} = ${n}\\times ${inc}\\times ${p}\\times ${inc} = ${n}\\times ${p}\\times ${inc}\\times ${inc}=$ `,
				correction_somme: `La somme de $${sliceUn(n)}${inc}$ et de $${sliceUn(p)}${inc}$ vaut : $${sliceUn(n)}${inc}+${sliceUn(p)}${inc} = ${n}\\times ${inc}+${p}\\times ${inc} = (${n}+${p})\\times ${inc}=$ `
			});
			if (isUn(n * p)) {
				enonces[0].correction_produit += `${texte_en_couleur(`$${n * p}${inc}^2=${inc}^2$`)}`;
			} else {
				enonces[0].correction_produit += `${texte_en_couleur(` $${n * p}${inc}^2$`)}`;
			};
			if (isUn(n * p)) {
				enonces[0].correction_somme += `${texte_en_couleur(` $${n + p}${inc}=${inc}$`)}`;
			} else {
				enonces[0].correction_somme += `${texte_en_couleur(` $${n + p}${inc}$`)}`;
			};
			if (isUn(n) && isUn(p)) {
				enonces[0].correction_produit = `$${inc}\\times ${inc} =$ ${texte_en_couleur(` $${inc}^2$`)} `;
			}
			//===== 1 le produit puis la somme
			enonces.push({
				enonce: `Simplifier le plus possible l'expression $${sliceUn(n)}${inc}\\times ${sliceUn(p)}${inc}$ puis l'expression $${sliceUn(n)}${inc}+${sliceUn(p)}${inc}$`,
				questtion: ``,
				correction_produit: `$${sliceUn(n)}${inc}\\times ${sliceUn(p)}${inc} = ${n}\\times ${inc}\\times ${p}\\times ${inc} = ${n}\\times ${p}\\times ${inc}\\times ${inc}=$ `,
				correction_somme: `$${sliceUn(n)}${inc}+${sliceUn(p)}${inc} = ${n}\\times ${inc}+${p}\\times ${inc} = (${n}+${p})\\times ${inc}=$ `
			});

			if (isUn(n * p)) {
				enonces[1].correction_produit += `${texte_en_couleur(`$${n * p}${inc}^2=${inc}^2$`)}`;
			} else {
				enonces[1].correction_produit += `${texte_en_couleur(` $${n * p}${inc}^2$`)}`;
			};
			if (isUn(n * p)) {
				enonces[1].correction_somme += `${texte_en_couleur(` $${n + p}${inc}=${inc}$`)}`;
			} else {
				enonces[1].correction_somme += `${texte_en_couleur(` $${n + p}${inc}$`)}`;
			};
			if (isUn(n) && isUn(p)) {
				enonces[1].correction_produit = `$${inc}\\times ${inc} =$ ${texte_en_couleur(` $${inc}^2$`)} `;
			}
			//===== 2 la somme puis le produit 
			enonces.push({
				enonce: `Simplifier le plus possible la somme puis le produit de $${sliceUn(n)}${inc}$ et de $${sliceUn(p)}${inc}$`,
				questtion: ``,
				correction_produit: `Le produit de $${sliceUn(n)}${inc}$ et de $${sliceUn(p)}${inc}$ vaut : $${sliceUn(n)}${inc}\\times ${sliceUn(p)}${inc} = ${n}\\times ${inc}\\times ${p}\\times ${inc} = ${n}\\times ${p}\\times ${inc}\\times ${inc}=$ `,
				correction_somme: `La somme de $${sliceUn(n)}${inc}$ et de $${sliceUn(p)}${inc}$ vaut : $${sliceUn(n)}${inc}+${sliceUn(p)}${inc} = ${n}\\times ${inc}+${p}\\times ${inc} = (${n}+${p})\\times ${inc}=$ `
			});
			if (isUn(n * p)) {
				enonces[2].correction_produit += `${texte_en_couleur(`$${n * p}${inc}^2=${inc}^2$`)}`;
			} else {
				enonces[2].correction_produit += `${texte_en_couleur(` $${n * p}${inc}^2$`)}`;
			};
			if (isUn(n * p)) {
				enonces[2].correction_somme += `${texte_en_couleur(` $${inc}$`)}`;
			} else {
				enonces[2].correction_somme += `${texte_en_couleur(` $${n + p}${inc}$`)}`;
			};
			if (isUn(n) && isUn(p)) {
				enonces[2].correction_produit = `$${inc}\\times ${inc} =$ ${texte_en_couleur(` $${inc}^2$`)} `;
			}
			//===== 3 la somme puis le produit 
			enonces.push({
				enonce: `Simplifier le plus possible l'expression $${sliceUn(n)}${inc}+${sliceUn(p)}${inc}$ puis l'expression $${sliceUn(n)}${inc}\\times ${sliceUn(p)}${inc}$`,
				questtion: ``,
				correction_produit: `$${sliceUn(n)}${inc}\\times ${sliceUn(p)}${inc} = ${n}\\times ${inc}\\times ${p}\\times ${inc} = ${n}\\times ${p}\\times ${inc}\\times ${inc}=$ `,
				correction_somme: `$${sliceUn(n)}${inc}+${sliceUn(p)}${inc} = ${n}\\times ${inc}+${p}\\times ${inc} = (${n}+${p})\\times ${inc}=$ `
			});
			if (isUn(n * p)) {
				enonces[3].correction_produit += `${texte_en_couleur(`$${inc}^2$`)}`;
			} else {
				enonces[3].correction_produit += `${texte_en_couleur(` $${n * p}${inc}^2$`)}`;
			};
			if (isUn(n * p)) {
				enonces[3].correction_somme += `${texte_en_couleur(` $${inc}$`)}`;
			} else {
				enonces[3].correction_somme += `${texte_en_couleur(` $${n + p}${inc}$`)}`;
			};
			if (isUn(n) && isUn(p)) {
				enonces[3].correction_produit = `$${inc}\\times ${inc} =$ ${texte_en_couleur(` $${inc}^2$`)} `;
			};

			switch (liste_type_de_questions[i]) {
				case 0:	// produit puis somme 				
					texte = `${enonces[0].enonce}.`;
					if (this.debug) {
						texte += `<br><br>=====CORRECTION======<br>`;
						texte += enonces[0].correction_produit;
						texte += `<br>`;
						texte += enonces[0].correction_somme;
						texte_corr = ``;
					} else {
						texte_corr = enonces[0].correction_produit;
						texte_corr += `<br>`;
						texte_corr += enonces[0].correction_somme;
					};
					break;
				case 1:	// x puis +				
					texte = `${enonces[1].enonce}.`;
					if (this.debug) {
						texte += `<br><br>=====CORRECTION======<br>`;
						texte += enonces[1].correction_produit;
						texte += `<br>`;
						texte += enonces[1].correction_somme;
						texte_corr = ``;
					} else {
						texte_corr = enonces[1].correction_produit;
						texte_corr += `<br>`;
						texte_corr += enonces[1].correction_somme;
					};
					break;
				case 2:	// somme puis produit				
					texte = `${enonces[2].enonce}.`;
					if (this.debug) {
						texte += `<br><br>=====CORRECTION======<br>`;
						texte += enonces[2].correction_somme;
						texte += `<br>`;
						texte += enonces[2].correction_produit;
						texte_corr = ``;
					} else {
						texte_corr = enonces[2].correction_somme;
						texte_corr += `<br>`;
						texte_corr += enonces[2].correction_produit;
					};
					break;
				case 3:	// + puis x				
					texte = `${enonces[3].enonce}.`;
					if (this.debug) {
						texte += `<br><br>=====CORRECTION======<br>`;
						texte += enonces[3].correction_somme;
						texte += `<br>`;
						texte += enonces[3].correction_produit;
						texte_corr = ``;
					} else {
						texte_corr = enonces[3].correction_somme;
						texte_corr += `<br>`;
						texte_corr += enonces[3].correction_produit;
					};
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
	}
	//this.besoin_formulaire2_case_a_cocher = ["Avec décimaux.",false]

}


