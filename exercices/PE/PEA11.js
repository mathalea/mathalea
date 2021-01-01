import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,tex_nombre,mise_en_evidence} from "/modules/outils.js"
/**
* Passer d'une écriture en base 10 à l'écriture dans une autre base ou inversement
* référence PEA11
* * Convertir en base 10
* * Convertir vers une base entre 2 et 7
* * Trouver le plus grand nombre à 3 ou 4 chiffres d'une base ainsi que son successeur et le convertir en base 10 ou le plus petit et son prédecesseur
*
* @Auteur Rémi Angot
*/
export default function Passer_d_une_base_a_l_autre() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Passer de la base 10 à une autre base et inversement";
	this.consigne = "";
	this.nb_questions = 3;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = ['vers_base_10', choice(['vers_base_n_3_chiffres', 'vers_base_n_4_chiffres']), choice(['plus_grand_4_chiffres', 'plus_grand_3_chiffres', 'plus_petit_4_chiffres', 'plus_petit_3_chiffres'])];
		if (this.nb_questions > 3) {
			type_de_questions_disponibles = ['vers_base_10', 'vers_base_n_3_chiffres', 'vers_base_n_4_chiffres', 'plus_grand_4_chiffres', 'plus_grand_3_chiffres', 'plus_petit_4_chiffres', 'plus_petit_3_chiffres'];
		}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, b, n, m, chiffre1, chiffre2, chiffre3, chiffre4, cpt = 0; i < this.nb_questions && cpt < 50;) {
			b = randint(2, 7);
			switch (liste_type_de_questions[i]) {
				case 'vers_base_10':
					n = randint(1, b - 1) * 10 + randint(0, b - 1);
					m = randint(1, b - 1) * 1000 + randint(0, b - 1) * 100 + randint(0, b - 1) * 10 + randint(0, b - 1);
					texte = `Les nombre $(${n})_${b}$ et $(${m})_${b}$ sont écrits en base ${b}. Donner leur écriture en base 10.`;
					texte_corr = `$(${n})_${b}=${n.toString()[0]}\\times${b}+${n.toString()[1]}=${parseInt(n, b)}$`;
					texte_corr += `<br>$(${m})_${b}=${m.toString()[0]}\\times${b}^3+${m.toString()[1]}\\times${b}^2+${m.toString()[2]}\\times${b}+${m.toString()[3]}=${parseInt(m, b)}$`;
					break;
				case 'vers_base_n_3_chiffres':
					chiffre1 = randint(1, b - 1);
					chiffre2 = randint(0, b - 1);
					chiffre3 = randint(0, b - 1);
					n = chiffre1 * b ** 2 + chiffre2 * b + chiffre3;
					texte = `Écrire en base ${b} le nombre ${n}.`;
					texte_corr = `$${n}=${b}\\times${Math.floor(n / b)}+${mise_en_evidence(n % b)}$`;
					texte_corr += `<br>$${Math.floor(n / b)}=${b}\\times${mise_en_evidence(chiffre1)}+${mise_en_evidence(chiffre2)}$`;
					texte_corr += `<br> Finalement $${n}=(${chiffre1}${chiffre2}${chiffre3})_${b}$`;
					break;
				case 'vers_base_n_4_chiffres':
					chiffre1 = randint(1, b - 1);
					chiffre2 = randint(0, b - 1);
					chiffre3 = randint(0, b - 1);
					chiffre4 = randint(0, b - 1);
					n = chiffre1 * b ** 3 + chiffre2 * b ** 2 + chiffre3 * b + chiffre4;
					texte = `Écrire en base ${b} le nombre ${n}.`;
					texte_corr = `$${n}=${b}\\times${Math.floor(n / b)}+${mise_en_evidence(n % b)}$`;
					texte_corr += `<br>$${Math.floor(n / b)}=${b}\\times${Math.floor(Math.floor(n / b) / b)}+${mise_en_evidence(Math.floor(n / b) % b)}$`;
					texte_corr += `<br>$${Math.floor(Math.floor(n / b) / b)}=${b}\\times${mise_en_evidence(chiffre1)}+${mise_en_evidence(chiffre2)}$`;
					texte_corr += `<br> Finalement $${n}=(${chiffre1}${chiffre2}${chiffre3}${chiffre4})_${b}$`;
					break;
				case 'plus_grand_4_chiffres':
					texte = `Quel est le plus grand nombre à 4 chiffres que l'on peut écrire en base ${b}.`;
					texte += `<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					texte_corr = `En base ${b} les chiffres sont 0`;
					for (let i = 1; i < b; i++) {
						texte_corr += `, ${i}`;
					}
					texte_corr += ` donc le plus grand nombre à 4 chiffres est $(${b - 1}${b - 1}${b - 1}${b - 1})_${b}$ et son successeur immédiat est $(10000)_${b}$.`;
					texte_corr += `<br> $(10000)_${b}=1\\times${b}^4=${tex_nombre(b ** 4)}$ donc $(${b - 1}${b - 1}${b - 1}${b - 1})_${b}=${b ** 4}-1=${tex_nombre(b ** 4 - 1)}$.`;
					break;
				case 'plus_grand_3_chiffres':
					texte = `Quel est le plus grand nombre à 3 chiffres que l'on peut écrire en base ${b}.`;
					texte += `<br>Comment s'écrit son successeur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					texte_corr = `En base ${b} les chiffres sont 0`;
					for (let i = 1; i < b; i++) {
						texte_corr += `, ${i}`;
					}
					texte_corr += ` donc le plus grand nombre à 3 chiffres est $(${b - 1}${b - 1}${b - 1})_${b}$ et son successeur immédiat est $(1000)_${b}$.`;
					texte_corr += `<br> $(1000)_${b}=1\\times${b}^3=${tex_nombre(b ** 3)}$ donc $(${b - 1}${b - 1}${b - 1})_${b}=${b ** 3}-1=${tex_nombre(b ** 3 - 1)}$.`;
					break;
				case 'plus_petit_4_chiffres':
					texte = `Quel est le plus petit nombre à 4 chiffres que l'on peut écrire en base ${b}.`;
					texte += `<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					texte_corr = `En base ${b} les chiffres sont 0`;
					for (let i = 1; i < b; i++) {
						texte_corr += `, ${i}`;
					}
					texte_corr += ` donc le plus petit nombre à 4 chiffres est $(1000)_${b}$ et son prédécesseur immédiat est $(${b - 1}${b - 1}${b - 1})_${b}$.`;
					texte_corr += `<br> $(1000)_${b}=1\\times${b}^3=${tex_nombre(b ** 3)}$ donc $(${b - 1}${b - 1}${b - 1})_${b}=${b ** 3}-1=${tex_nombre(b ** 3 - 1)}$.`;
					break;
				case 'plus_petit_3_chiffres':
					texte = `Quel est le plus petit nombre à 3 chiffres que l'on peut écrire en base ${b}.`;
					texte += `<br>Comment s'écrit son prédécesseur immédiat en base ${b} ? En déduire l'écriture en base 10 de ces 2 nombres.`;
					texte_corr = `En base ${b} les chiffres sont 0`;
					for (let i = 1; i < b; i++) {
						texte_corr += `, ${i}`;
					}
					texte_corr += ` donc le plus petit nombre à 3 chiffres est $(100)_${b}$ et son prédécesseur immédiat est $(${b - 1}${b - 1})_${b}$.`;
					texte_corr += `<br> $(100)_${b}=1\\times${b}^2=${tex_nombre(b ** 2)}$ donc $(${b - 1}${b - 1})_${b}=${b ** 2}-1=${tex_nombre(b ** 2 - 1)}$.`;
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
