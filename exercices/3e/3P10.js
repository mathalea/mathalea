import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,abs,calcul,tex_nombrec,tex_nombre,string_nombre,tex_prix} from "/modules/outils.js"
/**
* Problèmes de variations en pourcentage
*
* * Situations variées : prix soldé ou augmenté, effectif d'un collège ou lycée, facture, population d'une ville
*
* * Calculer le résultat d'une évolution
* * Exprimer l'évolution en pourcentage
* * Retrouver la situation initiale
* * Mélange des 3 types de problèmes
* @Auteur Rémi Angot
* 3P10
*/
export default function Evolutions_en_pourcentage() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Variations en pourcentage";
	this.consigne = "";
	this.nb_questions = 4;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 4; // type de questions

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles = [];
		if (this.sup == 1) {
			type_de_questions_disponibles = ['finale'];
		}
		if (this.sup == 2) {
			type_de_questions_disponibles = ['evolution'];
		}
		if (this.sup == 3) {
			type_de_questions_disponibles = ['initiale'];
		}
		if (this.sup == 4) {
			type_de_questions_disponibles = ['finale', 'evolution', 'initiale'];
		}
		let type_de_situations_disponibles = ['prix', 'etablissement', 'facture', 'population'];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let liste_type_de_situations = combinaison_listes(type_de_situations_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, depart, arrive, taux, coeff, cpt = 0; i < this.nb_questions && cpt < 50;) {

			switch (liste_type_de_situations[i]) {
				case 'prix':
					depart = choice([calcul(randint(11, 99) / 10), randint(11, 99), randint(11, 99) * 10]);
					taux = choice([10, 20, 30, 40, 60]);
					taux *= choice([-1, 1]);
					coeff = tex_nombrec(1 + taux / 100);
					arrive = calcul(depart * (1 + taux / 100));
					switch (liste_type_de_questions[i]) {
						case 'finale':
							if (taux > 0) {
								texte = `Un article coûtait $${tex_prix(depart)}$ € et son prix a augmenté de $${taux}~\\%$. Calculer son nouveau prix.`;
								texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`;
								texte_corr += `<br>$${tex_prix(depart)}\\times ${coeff} = ${tex_prix(arrive)}$`;
								texte_corr += `<br>Le nouveau prix de cet article est ${tex_prix(arrive)} €.`;
							} else {
								texte = `Un article coûtait $${tex_prix(depart)}$ € et son prix est soldé à $${taux}~\\%$. Calculer son nouveau prix.`;
								texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`;
								texte_corr += `<br>$${tex_prix(depart)}\\times ${coeff} = ${tex_prix(arrive)}$`;
								texte_corr += `<br>Le nouveau prix de cet article est ${tex_prix(arrive)} €.`;
							}
							break;
						case 'initiale':
							if (taux > 0) {
								texte = `Après une augmentation de $${taux}~\\%$ un article coûte maintenant $${tex_prix(arrive)}$ €. Calculer son prix avant l'augmentation.`;
								texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\%=${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par ${coeff}.`;
								texte_corr += `<br>$${tex_prix(arrive)}\\div ${coeff} = ${tex_prix(depart)}$`;
								texte_corr += `<br>Avant l'augmentation cet article coûtait ${tex_prix(depart)} €.`;
							} else {
								texte = `Soldé à $${taux}~\\%$ un article coûte maintenant $${tex_prix(arrive)}$ €. Calculer son prix avant les soldes.`;
								texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par ${coeff}.`;
								texte_corr += `<br>$${tex_prix(arrive)}\\div ${coeff} = ${tex_prix(depart)}$`;
								texte_corr += `<br>Avant les soldes cet article coûtait ${tex_prix(depart)} €.`;
							}
							break;
						case 'evolution':
							if (taux > 0) {
								texte = `Un article qui coûtait $${tex_prix(depart)}$ € coûte maintenant $${tex_prix(arrive)}$ €. Exprimer l'augmentation du prix en pourcentage.`;
								texte_corr = `$${tex_prix(arrive)}\\div ${tex_prix(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%+${taux}~\\%$`;
								texte_corr += `<br>Le prix a été multiplié par ${coeff}, il a donc augmenté de $${taux}~\\%$.`;
							} else {
								texte = `Un article qui coûtait $${tex_prix(depart)}$ € coûte maintenant $${tex_prix(arrive)}$ €. Exprimer la réduction du prix en pourcentage.`;
								texte_corr = `$${tex_prix(arrive)}\\div ${tex_prix(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%${taux}~\\%$`;
								texte_corr += `<br>Le prix a été multiplié par ${coeff}, il a donc diminué de $${abs(taux)}~\\%$.`;
							}
							break;
					}
					break;
				case 'etablissement':
					//Le nombre d'élève doit être entier
					//Multiple de 50 et multiple de 2%
					//Multiple de 20 et multiple de 5%
					//Multiple de 100 et n%
					switch (randint(1, 3)) {
						case 1:
							depart = 50 * randint(7, 24);
							taux = 2 * randint(1, 5);
							break;
						case 2:
							depart = 20 * randint(17, 60);
							taux = 5 * randint(1, 3);
							break;
						case 3:
							depart = 100 * randint(4, 12);
							taux = randint(1, 11);
							break;
					}
					arrive = calcul(depart * (1 + taux / 100));
					coeff = tex_nombrec(1 + taux / 100);
					let date = new Date();
					let cetteAnnee = date.getFullYear();
					let anneeDerniere = cetteAnnee - 1;
					let etablissement = choice(['collège', 'lycée']);
					switch (liste_type_de_questions[i]) {
						case 'finale':
							if (taux > 0) {
								texte = `Un ${etablissement} avait $${tex_nombre(depart)}$ élèves en ${anneeDerniere}. Depuis, le nombre d'élèves a augmenté de $${taux}~\\%$. Calculer le nombre d'élèves dans ce ${etablissement} cette année.`;
								texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`;
								texte_corr += `<br>$${tex_nombre(depart)}\\times ${coeff} = ${tex_nombre(arrive)}$`;
								texte_corr += `<br>Il y a maintenant ${string_nombre(arrive)} élèves dans ce ${etablissement}.`;
							} else {
								texte = `Un ${etablissement} avait $${tex_nombre(depart)}$ élèves en ${anneeDerniere}. Depuis, le nombre d'élèves a diminué de $${abs(taux)}~\\%$. Calculer le nombre d'élèves dans ce ${etablissement} cette année.`;
								texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`;
								texte_corr += `<br>$${tex_nombre(depart)}\\times ${coeff} = ${tex_nombre(arrive)}$`;
								texte_corr += `<br>Il y a maintenant ${string_nombre(arrive)} élèves dans ce ${etablissement}.`;
							}
							break;
						case 'initiale':
							if (taux > 0) {
								texte = `Depuis ${anneeDerniere} le nombre d'élèves d'un ${etablissement} a augmenté de $${taux}~\\%$. Il y a maintenant $${tex_nombre(arrive)}$ élèves. Calculer le nombre d'élèves en ${anneeDerniere} dans cet établissement.`;
								texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le nombre initial d'élèves, on va donc diviser le nombre actuel d'élèves par ${coeff}.`;
								texte_corr += `<br>$${tex_nombre(arrive)}\\div ${coeff} = ${tex_nombre(depart)}$`;
								texte_corr += `<br>En ${anneeDerniere}, il y avait ${string_nombre(depart)} élèves dans ce ${etablissement}.`;
							} else {
								texte = `Depuis ${anneeDerniere} le nombre d'élèves d'un ${etablissement} a diminué de $${taux}~\\%$. Il y a maintenant $${tex_nombre(arrive)}$ élèves. Calculer le nombre d'élèves en ${anneeDerniere} dans cet établissement.`;
								texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le nombre initial d'élèves, on va donc diviser le nombre actuel d'élèves par ${coeff}.`;
								texte_corr += `<br>$${tex_nombre(arrive)}\\div ${coeff} = ${tex_nombre(depart)}$`;
								texte_corr += `<br>En ${anneeDerniere}, il y avait ${string_nombre(depart)} élèves dans ce ${etablissement}.`;
							}
							break;
						case 'evolution':
							texte = `En ${anneeDerniere}, il y avait $${tex_nombre(depart)}$ élèves dans un ${etablissement}. En ${cetteAnnee}, ils sont $${tex_nombre(arrive)}$. Exprimer la variation du nombre d'élèves de cet établissement en pourcentage.`;
							if (taux > 0) {
								texte_corr = `$${tex_nombre(arrive)}\\div ${tex_nombre(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%+${taux}~\\%$`;
								texte_corr += `<br>Le nombre d'élèves a été multiplié par ${coeff}, il a donc augmenté de $${taux}~\\%$.`;
							} else {
								texte = `Un article qui coûtait $${tex_nombre(depart)}$ € coûte maintenant $${tex_nombre(arrive)}$ €. Exprimer la réduction du prix en pourcentage.`;
								texte_corr = `$${tex_nombre(arrive)}\\div ${tex_prix(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%${taux}~\\%$`;
								texte_corr += `<br>Le nombre d'élèves a été multiplié par ${coeff}, il a donc diminué de $${abs(taux)}~\\%$.`;
							}
							break;
					}
					break;
				case 'facture':
					depart = randint(700, 1400);
					taux = randint(1, 12);
					taux *= choice([-1, 1]);
					coeff = tex_nombrec(1 + taux / 100);
					arrive = calcul(depart * (1 + taux / 100));
					let facture = choice(["ma facture annuelle d'électricité", "ma facture annuelle de gaz", "ma taxe d'habitation", "mon ordinateur", "mon vélo électrique"]);
					switch (liste_type_de_questions[i]) {
						case 'finale':
							if (taux > 0) {
								texte = `Le prix de ${facture} était de $${tex_prix(depart)}$ € l'année dernière et il a augmenté de $${taux}~\\%$. Calculer son nouveau prix.`;
								texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`;
								texte_corr += `<br>$${tex_prix(depart)}\\times ${coeff} = ${tex_prix(arrive)}$`;
								texte_corr += `<br>Le prix de ${facture} est maintenant de ${tex_prix(arrive)} €.`;
							} else {
								texte = `Le prix de ${facture} était de $${tex_prix(depart)}$ € l'année dernière et il a diminué de $${abs(taux)}~\\%$. Calculer son nouveau prix.`;
								texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`;
								texte_corr += `<br>$${tex_prix(depart)}\\times ${coeff} = ${tex_prix(arrive)}$`;
								texte_corr += `<br>Le prix de ${facture} est maintenant de ${tex_prix(arrive)} €.`;
							}
							break;
						case 'initiale':
							if (taux > 0) {
								texte = `Après une augmentation de $${taux}~\\%$ le prix de ${facture} est maintenant $${tex_prix(arrive)}$ €. Calculer son prix avant l'augmentation.`;
								texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\%=${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par ${coeff}.`;
								texte_corr += `<br>$${tex_prix(arrive)}\\div ${coeff} = ${tex_prix(depart)}$`;
								texte_corr += `<br>Avant l'augmentation le prix de ${facture} était de ${tex_prix(depart)} €.`;
							} else {
								texte = `Après une diminution de $${abs(taux)}~\\%$ ${facture} coûte maintenant $${tex_prix(arrive)}$ €. Calculer son prix avant les soldes.`;
								texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver le prix initial, on va donc diviser le prix final par ${coeff}.`;
								texte_corr += `<br>$${tex_prix(arrive)}\\div ${coeff} = ${tex_prix(depart)}$`;
								texte_corr += `<br>Avant la diminution le prix de ${facture} était de ${tex_prix(depart)} €.`;
							}
							break;
						case 'evolution':
							if (taux > 0) {
								texte = `Le prix de ${facture} est passé de $${tex_prix(depart)}$ € à $${tex_prix(arrive)}$ €. Exprimer cette augmentation en pourcentage.`;
								texte_corr = `$${tex_prix(arrive)}\\div ${tex_prix(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%+${taux}~\\%$`;
								texte_corr += `<br>Le prix a été multiplié par ${coeff}, il a donc augmenté de $${taux}~\\%$.`;
							} else {
								texte = `Le prix de ${facture} est passé de $${tex_prix(depart)}$ € à $${tex_prix(arrive)}$ €. Exprimer cette diminution en pourcentage.`;
								texte_corr = `$${tex_prix(arrive)}\\div ${tex_prix(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%${taux}~\\%$`;
								texte_corr += `<br>Le prix a été multiplié par ${coeff}, il a donc diminué de $${abs(taux)}~\\%$.`;
							}
							break;
					}
					break;
				case 'population':
					depart = choice([randint(11, 99) * 1000, randint(11, 99) * 10000]);
					taux = randint(5, 35);
					taux *= choice([-1, 1]);
					coeff = tex_nombrec(1 + taux / 100);
					arrive = calcul(depart * (1 + taux / 100));
					let nb = randint(5, 15);
					switch (liste_type_de_questions[i]) {
						case 'finale':
							if (taux > 0) {
								texte = `Il y a ${nb} ans, la population d'une ville était de $${tex_nombre(depart)}$ habitants. Depuis, elle a augmenté de $${taux}~\\%$. Calculer le nombre d'habitants actuel de cette ville.`;
								texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`;
								texte_corr += `<br>$${tex_nombre(depart)}\\times ${coeff} = ${tex_nombre(arrive)}$`;
								texte_corr += `<br>La population de cette ville est maintenant de $${tex_nombre(arrive)}$ habitants.`;
							} else {
								texte = `Il y a ${nb} ans, la population d'une ville était de $${tex_nombre(depart)}$ habitants. Depuis, elle a diminué de $${abs(taux)}~\\%$. Calculer le nombre d'habitants actuel de cette ville.`;
								texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.`;
								texte_corr += `<br>$${tex_nombre(depart)}\\times ${coeff} = ${tex_nombre(arrive)}$`;
								texte_corr += `<br>La population de cette ville est maintenant de $${tex_nombre(arrive)}$ habitants.`;
							}
							break;
						case 'initiale':
							if (taux > 0) {
								texte = `En ${nb} ans, la population d'une ville a augmenté de $${taux}~\\%$ et est maintenant $${tex_nombre(arrive)}$ habitants. Calculer sa population d'il y a ${nb} ans.`;
								texte_corr = `Une augmentation de $${taux}~\\%$ revient à multiplier par $100~\\% + ${taux}~\\%=${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver la population initiale, on va donc diviser le nombre d'habitants actuel par ${coeff}.`;
								texte_corr += `<br>$${tex_nombre(arrive)}\\div ${coeff} = ${tex_nombre(depart)}$`;
								texte_corr += `<br>Il y a ${nb} ans cette ville comptait $${tex_nombre(depart)}$ habitants.`;
							} else {
								texte = `En ${nb} ans, la population d'une ville a diminué de $${abs(taux)}~\\%$ et est maintenant $${tex_nombre(arrive)}$ habitants. Calculer sa population d'il y a ${nb} ans.`;
								texte_corr = `Une diminution de $${abs(taux)}~\\%$ revient à multiplier par $100~\\% ${taux}~\\% = ${100 + taux}~\\% = ${coeff}$.<br>Pour retrouver la population initiale, on va donc diviser le nombre d'habitants actuel par ${coeff}.`;
								texte_corr += `<br>$${tex_nombre(arrive)}\\div ${coeff} = ${tex_nombre(depart)}$`;
								texte_corr += `<br>Il y a ${nb} ans cette ville comptait $${tex_nombre(depart)}$ habitants.`;
							}
							break;
						case 'evolution':
							if (taux > 0) {
								texte = `En ${nb} ans, la population d'une ville est passé de $${tex_nombre(depart)}$ habitants à $${tex_nombre(arrive)}$. Exprimer cette augmentation en pourcentage.`;
								texte_corr = `$${tex_nombre(arrive)}\\div ${tex_nombre(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%+${taux}~\\%$`;
								texte_corr += `<br>La population a été multipliée par ${coeff} elle a donc augmenté de $${abs(taux)}~\\%$.`;
							} else {
								texte = `En ${nb} ans, la population d'une ville est passé de $${tex_nombre(depart)}$ habitants à $${tex_nombre(arrive)}$. Exprimer cette diminution en pourcentage.`;
								texte_corr = `$${tex_nombre(arrive)}\\div ${tex_nombre(depart)} = ${coeff} =  ${100 + taux}~\\% = 100~\\%${taux}~\\%$`;
								texte_corr += `<br>La population a été multipliée par ${coeff} elle a donc diminué de $${abs(taux)}~\\%$.`;
							}
							break;
					}
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
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 : Déterminer le résultat après une variation en pourcentage\n2 : Exprimer une variation en pourcentage\n3 : Calculer la valeur initiale en connaissant la variation et la situation finale\n4 : Mélange des 3 types de problèmes'];
}
