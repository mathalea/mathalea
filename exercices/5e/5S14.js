import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,arrondi,arrondi_virgule,prenom,liste_de_notes,jours_par_mois,un_mois_de_temperature,nom_du_mois,tex_nombre,tex_fraction} from "/modules/outils.js"


/**
 * Calcul de moyennes de série statistiques
* @auteur Jean-Claude Lhote
* Référence 5S14
*/
export default function Calculer_des_moyennes() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des moyennes";
	this.consigne = "";
	this.nb_questions = 1;
	this.spacing = 1;
	this.spacing_corr = 1.5;
	this.nb_cols_corr = 1;
	this.nb_cols = 1;
	this.sup = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, nombre_notes, notes, somme, nombre_temperatures, temperatures, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			if (this.sup == 1) { // ici on trie des notes
				nombre_notes = choice([8, 10, 12]);
				notes = liste_de_notes(nombre_notes, randint(0, 7), randint(13, 20)); // on récupère une série de notes (série brute)
				somme = 0;
				for (let j = 0; j < nombre_notes; j++)
					somme += notes[j];

				texte = `${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`;
				texte += `$${notes[0]}$`;
				for (let j = 1; j < nombre_notes - 1; j++)
					texte += `; $${notes[j]}$ `; // On liste les notes
				texte += `et $${notes[nombre_notes - 1]}$.<br>`;
				texte += `Calculer la moyenne de cet élève en mathématiques.`;
				texte_corr = `La somme des notes est : $${somme}$.<br> Il y a $${nombre_notes}$ notes<br>`;
				texte_corr += 'Donc la moyenne de cet élève est : ' + `$${tex_fraction(tex_nombre(somme), tex_nombre(nombre_notes))}$`;
				if (arrondi(somme / nombre_notes, 2) == somme / nombre_notes)
					texte_corr += `$=${arrondi_virgule(somme / nombre_notes, 2)}$<br>`; // moyenne exacte
				else
					texte_corr += `$\\approx${arrondi_virgule(somme / nombre_notes, 2)}$`; // moyenne arrondie
			}
			else { // ici on relève des températures
				let mois = randint(1, 12);
				let annee = randint(1980, 2019);
				let temperatures_de_base = [3, 5, 9, 13, 19, 24, 26, 25, 23, 18, 10, 5];
				nombre_temperatures = jours_par_mois(mois);
				temperatures = un_mois_de_temperature(temperatures_de_base[mois - 1], mois, annee); // série brute de un mois de température
				somme = 0;
				texte = `En ${nom_du_mois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, on a relevé les températures suivantes<br>`;
				texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // tableau des températures 1/2
				texte += '|c';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '|c';
				texte += '}\\hline  \\text{Jour}';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '&' + tex_nombre(j + 1);
				texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++) {
					texte += '&' + temperatures[j];
					somme += temperatures[j];
				}
				texte += '\\\\\\hline\\end{array}$<br><br>';
				texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // tableau des températures 2/2
				texte += '|c';
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++)
					texte += '|c';
				texte += '}\\hline  \\text{Jour}';
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++)
					texte += '&' + tex_nombre(j + 1);
				texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}';
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) {
					texte += '&' + temperatures[j];
					somme += temperatures[j];
				}
				texte += '\\\\\\hline\\end{array}$<br><br>';


				texte += 'Calculer la température moyenne de ce mois.';
				texte_corr = `En ${nom_du_mois(mois)} ${annee}, la somme des températures est ` + `$${somme}^\\circ\\text{C}$.<br> Il y a $${temperatures.length}$ jours ce mois-ci.<br> La température moyenne est :<br>`;
				texte_corr += `$${tex_fraction(tex_nombre(somme) + `^\\circ\\text{C}`, tex_nombre(nombre_temperatures))}$`;

				if (arrondi(somme / nombre_temperatures, 2) == somme / nombre_temperatures)
					texte_corr += `$=${arrondi_virgule(somme / nombre_temperatures, 2)}^\\circ\\text{C}$`; // moyenne exacte
				else
					texte_corr += `$\\approx${arrondi_virgule(somme / nombre_temperatures, 2)}^\\circ\\text{C}$`; // moyenne arrondie
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
	this.besoin_formulaire_numerique = ['Type de séries', 2, "1 : Série de notes\n 2 : Série de températures"];
}
