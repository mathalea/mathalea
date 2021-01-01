import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,valeur_base,tex_nombre,nombre_avec_espace,mise_en_evidence} from "/modules/outils.js"
/**
* Passer d'une écriture en base 10 à l'écriture dans une autre base ou inversement
* référence PEA11-1
* * Convertir en base 10
* * Convertir vers une base entre 2 et 7
* * Trouver le plus grand nombre à 3 ou 4 chiffres d'une base ainsi que son successeur et le convertir en base 10 ou le plus petit et son prédecesseur
*
* @Auteur Rémi Angot
*/
export default function Passer_de_la_base_12_ou_16_a_la_10() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Passer de la base 12 ou 16 à la base 10 et inversement";
	this.consigne = "";
	this.nb_questions = 3;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['vers_base_10', 'vers_base_n_3_chiffres'];
		if (this.nb_questions == 3) {
			type_de_questions_disponibles.push(choice(['vers_base_n_4_chiffres', 'plus_grand_4_chiffres', 'plus_petit_4_chiffres', 'plus_petit_3_chiffres']));
		}


		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		let b = choice([12, 16]);
		if (b == 12) {
			this.introduction = 'Les symboles que l’on utilise en base 12 sont les dix chiffres habituels, la lettre A pour désigner 10 unités et la lettre B pour désigner 11 unités.';
		} else {
			this.introduction = 'Les symboles que l’on utilise en base 16 sont les dix chiffres habituels, la lettre A pour désigner 10 unités, B pour 11 unités, C pour 12 unités, D pour 13 unités, ';
			this.introduction += 'E pour 14 unités et F pour 15 unités.';
		}
		for (let i = 0, texte, texte_corr, n, m, chiffre1, chiffre2, chiffre3, chiffre4, cpt = 0; i < this.nb_questions && cpt < 50;) {
			switch (liste_type_de_questions[i]) {
				case 'vers_base_10':
					if (b == 12) {
						n = choice([choice(['A', 'B']) + randint(0, 9), randint(1, 9) + choice(['A', 'B']), choice(['A', 'B']) + choice(['A', 'B'])]);
						m = choice(['A', 'B', randint(1, 9)]) + choice(['A', 'B', randint(0, 9)]) + choice(['A', 'B', randint(0, 9)]) + choice(['A', 'B', randint(0, 9)]);
					}
					if (b == 16) {
						n = choice(['A', 'B', 'C', 'D', 'E', 'F', randint(1, 9).toString()]) + choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
						m = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) + choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) + choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
					}
					texte = `Les nombre $(${n})_{${b}}$ et $(${m})_{${b}}$ sont écrits en base ${b}. Donner leur écriture en base 10.`;
					texte_corr = `$(${n})_{${b}}=${valeur_base(n.toString()[0])}\\times${b}+${valeur_base(n.toString()[1])}=${tex_nombre(parseInt(n, b))}$`;
					if (b == 12) { //m est un nombre à 4 chiffres
						texte_corr += `<br>$(${m})_{${b}}=${valeur_base(m.toString()[0])}\\times${b}^3+${valeur_base(m.toString()[1])}\\times${b}^2+${valeur_base(m.toString()[2])}\\times${b}+${valeur_base(m.toString()[3])}=${tex_nombre(parseInt(m, b))}$`;
					} else { //m est un nombre à 3 chiffres
						texte_corr += `<br>$(${m})_{${b}}=${valeur_base(m.toString()[0])}\\times${b}^2+${valeur_base(m.toString()[1])}\\times${b}+${valeur_base(m.toString()[2])}=${tex_nombre(parseInt(m, b))}$`;
					}
					break;
				case 'vers_base_n_3_chiffres':
					if (b == 12) {
						chiffre1 = choice(['A', 'B', randint(1, 9).toString()]);
						chiffre2 = choice(['A', 'B', randint(0, 9).toString()]);
						chiffre3 = choice(['A', 'B', randint(1, 9).toString()]);
					} else {
						chiffre1 = choice(['A', 'B', 'C', 'D', 'E', 'F', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
						chiffre2 = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
						chiffre3 = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
					}
					n = valeur_base(chiffre1) * b ** 2 + valeur_base(chiffre2) * b + valeur_base(chiffre3);
					texte = `Écrire en base ${b} le nombre ${nombre_avec_espace(n)}.`;
					texte_corr = `$${tex_nombre(n)}=${b}\\times${Math.floor(n / b)}+${mise_en_evidence(n % b)}$`;
					texte_corr += `<br>$${Math.floor(n / b)}=${b}\\times${mise_en_evidence(valeur_base(chiffre1))}+${mise_en_evidence(valeur_base(chiffre2))}$`;
					texte_corr += `<br> Finalement $${tex_nombre(n)}=(${chiffre1}${chiffre2}${chiffre3})_{${b}}$`;
					break;
				case 'vers_base_n_4_chiffres':
					if (b == 12) {
						chiffre1 = choice(['A', 'B', randint(1, 9).toString()]);
						chiffre2 = choice(['A', 'B', randint(0, 9).toString()]);
						chiffre3 = choice(['A', 'B', randint(1, 9).toString()]);
						chiffre4 = choice(['A', 'B', randint(1, 9).toString()]);
					} else {
						chiffre1 = choice(['A', 'B', 'C', 'D', 'E', 'F', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
						chiffre2 = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
						chiffre3 = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
						chiffre4 = choice(['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
					}
					n = valeur_base(chiffre1) * b ** 3 + valeur_base(chiffre2) * b ** 2 + valeur_base(chiffre3) * b + valeur_base(chiffre4);
					texte = `Écrire en base ${b} le nombre ${nombre_avec_espace(n)}.`;
					texte_corr = `$${tex_nombre(n)}=${b}\\times${Math.floor(n / b)}+${mise_en_evidence(n % b)}$`;
					texte_corr += `<br>$${tex_nombre(Math.floor(n / b))}=${b}\\times${Math.floor(Math.floor(n / b) / b)}+${mise_en_evidence(Math.floor(n / b) % b)}$`;
					texte_corr += `<br>$${tex_nombre(Math.floor(Math.floor(n / b) / b))}=${b}\\times${mise_en_evidence(valeur_base(chiffre1))}+${mise_en_evidence(valeur_base(chiffre2))}$`;
					texte_corr += `<br> Finalement $${tex_nombre(n)}=(${chiffre1}${chiffre2}${chiffre3}${chiffre4})_{${b}}$`;
					break;
				case 'plus_grand_4_chiffres':
					texte = `Quel est le plus grand nombre à 4 chiffres que l'on peut écrire en base ${b}.`;
					texte += `<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					if (b == 12) {
						texte_corr = `En base ${b} le plus grand chiffre est $B$`;
						texte_corr += ` donc le plus grand nombre à 4 chiffres est $(BBBB)_{${b}}$ et son successeur immédiat est $(10000)_{${b}}$.`;
						texte_corr += `<br> $(10000)_{${b}}=1\\times${b}^4=${tex_nombre(b ** 4)}$ donc $(BBBB)_{${b}}=${b ** 4}-1=${tex_nombre(b ** 4 - 1)}$.`;
					} else {
						texte_corr = `En base ${b} le plus grand chiffre est $F$`;
						texte_corr += ` donc le plus grand nombre à 4 chiffres est $(FFFF)_{${b}}$ et son successeur immédiat est $(10000)_{${b}}$.`;
						texte_corr += `<br> $(10000)_{${b}}=1\\times${b}^4=${tex_nombre(b ** 4)}$ donc $(FFFF)_{${b}}=${b ** 4}-1=${tex_nombre(b ** 4 - 1)}$.`;
					}
					break;
				case 'plus_grand_3_chiffres':
					texte = `Quel est le plus grand nombre à 3 chiffres que l'on peut écrire en base ${b}.`;
					texte += `<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					if (b == 12) {
						texte_corr = `En base ${b} le plus grand chiffre est $B$`;
						texte_corr += ` donc le plus grand nombre à 3 chiffres est $(BBB)_{${b}}$ et son successeur immédiat est $(1000)_{${b}}$.`;
						texte_corr += `<br> $(1000)_{${b}}=1\\times${b}^3=${tex_nombre(b ** 3)}$ donc $(BBB)_{${b}}=${b ** 3}-1=${tex_nombre(b ** 3 - 1)}$.`;
					} else {
						texte_corr = `En base ${b} le plus grand chiffre est $F$`;
						texte_corr += ` donc le plus grand nombre à 3 chiffres est $(FFF)_{${b}}$ et son successeur immédiat est $(1000)_{${b}}$.`;
						texte_corr += `<br> $(1000)_{${b}}=1\\times${b}^3=${tex_nombre(b ** 3)}$ donc $(FFF)_{${b}}=${b ** 3}-1=${tex_nombre(b ** 3 - 1)}$.`;
					}
					break;
				case 'plus_petit_4_chiffres':
					texte = `Quel est le plus petit nombre à 4 chiffres que l'on peut écrire en base ${b}.`;
					texte += `<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					if (b == 12) {
						texte_corr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $B$`;
						texte_corr += ` donc le plus petit nombre à 4 chiffres est $(1000)_{${b}}$ et son prédécesseur immédiat est $(BBB)_{${b}}$.`;
						texte_corr += `<br> $(1000)_{${b}}=1\\times${b}^3=${tex_nombre(b ** 3)}$ donc $(BBB)_{${b}}=${b ** 3}-1=${tex_nombre(b ** 3 - 1)}$.`;
					} else {
						texte_corr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $F$`;
						texte_corr += ` donc le plus petit nombre à 4 chiffres est $(1000)_{${b}}$ et son prédécesseur immédiat est $(FFF)_{${b}}$.`;
						texte_corr += `<br> $(1000)_{${b}}=1\\times${b}^3=${tex_nombre(b ** 3)}$ donc $(FFF)_{${b}}=${b ** 3}-1=${tex_nombre(b ** 3 - 1)}$.`;
					}
					break;
				case 'plus_petit_3_chiffres':
					texte = `Quel est le plus petit nombre à 3 chiffres que l'on peut écrire en base ${b}.`;
					texte += `<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					if (b == 12) {
						texte_corr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $B$`;
						texte_corr += ` donc le plus petit nombre à 3 chiffres est $(100)_{${b}}$ et son prédécesseur immédiat est $(BB)_{${b}}$.`;
						texte_corr += `<br> $(100)_{${b}}=1\\times${b}^2=${tex_nombre(b ** 2)}$ donc $(BB)_{${b}}=${b ** 2}-1=${tex_nombre(b ** 2 - 1)}$.`;
					} else {
						texte_corr = `En base ${b} le plus petit chiffre est $0$ et le plus grand chiffre est $F$`;
						texte_corr += ` donc le plus petit nombre à 3 chiffres est $(100)_{${b}}$ et son prédécesseur immédiat est $(FF)_{${b}}$.`;
						texte_corr += `<br> $(100)_{${b}}=1\\times${b}^2=${tex_nombre(b ** 2)}$ donc $(FF)_{${b}}=${b ** 2}-1=${tex_nombre(b ** 2 - 1)}$.`;
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
}
