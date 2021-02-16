import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,ecriture_parenthese_si_negatif,prenom,liste_de_notes,jours_par_mois,un_mois_de_temperature,nom_du_mois,tex_nombre} from "/modules/outils.js"


/**
 * Calculer des étendues de séries statistiques
* @auteur Jean-Claude Lhote
* Référence 3S15
*/
export default function Calculer_des_etendues() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des étendues";
	this.consigne = "";
	this.nb_questions = 1;
	this.spacing = 1;
	this.spacing_corr = 1;
	this.nb_cols_corr = 1;
	this.nb_cols = 1;
	this.sup = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, nombre_notes, notes, min, max, temperatures, nombre_temperatures, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			if (this.sup == 1) { // ici on trie des notes
				nombre_notes = randint(8, 12);
				notes = liste_de_notes(nombre_notes, randint(0, 7), randint(13, 20)); // on récupère une série de notes (série brute)
				min = 20, max = 0;
				for (let  j = 0; j < nombre_notes; j++) { // On cherche la note minimum et la note maximum
					min = Math.min(notes[j], min);
					max = Math.max(notes[j], max);
				}
				texte = `${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`;
				texte += `$${notes[0]}$`;
				for (let j = 1; j < nombre_notes - 1; j++)
					texte += `; $${notes[j]}$ `; // On liste les notes
				texte += `et $${notes[nombre_notes - 1]}$.<br>`;
				texte += `Calculer l\'étendue de cette série de notes.`;
				texte_corr = `La note la plus basse est : $${min}$.<br>La note la plus haute est $${max}$<br>`;
				texte_corr += 'Donc l\'étendue de cette série est : ' + `$${tex_nombre(max)}-${tex_nombre(min)}=${tex_nombre(max - min)}$`;
			}
			else { // ici on relève des températures
				let mois = randint(1, 12);
				let annee = randint(1980, 2019);
				let temperatures_de_base = [3, 5, 9, 13, 19, 24, 26, 25, 23, 18, 10, 5];
				nombre_temperatures = jours_par_mois(mois);
				temperatures = un_mois_de_temperature(temperatures_de_base[mois - 1], mois, annee); // série brute de un mois de température
				max = 0;
				min = 20;
				texte = `En ${nom_du_mois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, on a relevé les températures suivantes<br>`;

				texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // tableau des températures 1/2
				texte += '|c';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '|c';
				texte += '}\\hline  \\text{Jour}';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '&' + tex_nombre(j + 1);
				texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++) { // on cherche le minimum et le maximum
					texte += '&' + temperatures[j];
					min = Math.min(temperatures[j], min);
					max = Math.max(temperatures[j], max);
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
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { // on cherche le minimum et le maximum
					texte += '&' + temperatures[j];
					min = Math.min(temperatures[j], min);
					max = Math.max(temperatures[j], max);
				}
				texte += '\\\\\\hline\\end{array}$<br><br>';

				texte += 'Calculer l\'amplitude thermique de ce mois (l\'étendue de la série).';
				texte_corr = `En ${nom_du_mois(mois)} ${annee}, la température minimale est ` + `$${min}^\\circ\\text{C}$.<br>La température maximale est $${max}^\\circ\\text{C}$.<br> L\'amplitude thermique est :<br>`;
				texte_corr += `$${tex_nombre(max)}-${ecriture_parenthese_si_negatif(min)}$`;
				if (min < 0)
					texte_corr += `$\\thickspace~=${tex_nombre(max)}+${tex_nombre(-min)}$`;
				texte_corr += `$\\thickspace=${tex_nombre(max - min)}^\\circ\\text{C}$`;

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
