import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,arrondi,arrondi_virgule,calcul,prenom,tirer_les_des,liste_de_notes,jours_par_mois,un_mois_de_temperature,nom_du_mois,tex_nombre,tex_fraction} from "/modules/outils.js"


/**
 * Calculs de fréquences dans des séries statistiques
* @auteur Jean-Claude Lhote
* Référence 5S13
*/
export default function Calculer_des_frequences() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des fréquences";
	this.consigne = "";
	this.nb_questions = 1;
	this.spacing = 1;
	this.spacing_corr = 1.5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, nombre_des, nombre_faces, nombre_tirages, index_valeur, frequence, tirages, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			if (this.sup == 1) { // ici on lance des dés
				nombre_des = randint(1, 2);
				nombre_faces = choice([4, 6, 8, 10]);
				nombre_tirages = choice([50, 100, 200, 500, 1000]);
				tirages = tirer_les_des(nombre_tirages, nombre_faces, nombre_des); // on récupère une série rangée dans l'ordre croissant avec les effectifs correspondants
				do
					index_valeur = randint(0, tirages.length - 1);
				while (tirages[index_valeur][1] == 0); // on choisi au hasard l'index d'une valeur dont l'effectif est différent de 0.
				if (nombre_des > 1) {
					texte = `On a réalisé $${nombre_tirages}$ lancers de $${nombre_des}$ dés à $${nombre_faces}$ faces.<br>`;
				}
				else {
					texte = `On a réalisé $${nombre_tirages}$ lancers d'un dé à $${nombre_faces}$ faces.<br>`;
				}
				texte += 'Les résultats sont inscrits dans le tableau ci-dessous :<br><br>';
				if (tirages.length > 12) {
					texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // construction du tableau des effectifs 1/2
					for (let j = 0; j <= Math.round(tirages.length / 2); j++)
						texte += '|c';
					texte += '}\\hline  \\text{Scores}';
					for (let j = 0; j < Math.round(tirages.length / 2); j++)
						texte += '&' + tirages[j][0];
					texte += '\\\\\\hline \\text{Nombre d\'apparitions}';
					for (let j = 0; j < Math.round(tirages.length / 2); j++)
						texte += '&' + tirages[j][1];
					texte += '\\\\\\hline\\end{array}$<br><br>';

					texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // construction du tableau des effectifs 2/2
					for (let j = Math.round(tirages.length / 2); j <= tirages.length; j++)
						texte += '|c';
					texte += '}\\hline  \\text{Scores}';
					for (let j = Math.round(tirages.length / 2); j < tirages.length; j++)
						texte += '&' + tirages[j][0];
					texte += '\\\\\\hline \\text{Nombre d\'apparitions}';
					for (let j = Math.round(tirages.length / 2); j < tirages.length; j++)
						texte += '&' + tirages[j][1];
					texte += '\\\\\\hline\\end{array}$';
				}
				else {
					texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // construction du tableau des effectifs en un seul morceau
					for (let j = 0; j <= tirages.length; j++)
						texte += '|c';
					texte += '}\\hline  \\text{Scores}';
					for (let j = 0; j < tirages.length; j++)
						texte += '&' + tirages[j][0];
					texte += '\\\\\\hline \\text{Nombre d\'apparitions}';
					for (let j = 0; j < tirages.length; j++)
						texte += '&' + tirages[j][1];
					texte += '\\\\\\hline\\end{array}$';
				}

				texte += '<br><br> Calculer la fréquence de la valeur ' + `$${calcul(nombre_des + index_valeur)}$.`;
				texte_corr = 'La valeur ' + `$${calcul(nombre_des + index_valeur)}$ apparaît ` + `$${tirages[index_valeur][1]}$ fois.<br>Le nombre total de lancers est $${tex_nombre(nombre_tirages)}$.<br>`;
				texte_corr += 'La fréquence de la valeur ' + `$${calcul(nombre_des + index_valeur)}$` + ' est ' + `$${tex_fraction(tirages[index_valeur][1], tex_nombre(nombre_tirages))}=${tex_nombre(calcul(tirages[index_valeur][1] / nombre_tirages))}$<br>`;
				texte_corr += 'Soit ' + `$${tex_nombre(calcul(tirages[index_valeur][1] * 100 / nombre_tirages))}\\thickspace\\%$.`;
			}
			else if (this.sup == 2) { // ici on trie des notes
				nombre_notes = choice([8, 10, 12]);
				notes = liste_de_notes(nombre_notes, randint(0, 7), randint(13, 20)); // on récupère une liste de notes (série brute)
				index_valeur = randint(0, notes.length - 1); // on choisi une des notes au hasard
				frequence = 0;
				for (j = 0; j < notes.length; j++) { // frequence va contenir l'effectif de la note choisie
					if (notes[j] == notes[index_valeur])
						frequence++;
				}
				texte = `${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`;
				texte += `$${notes[0]}$`;
				for (let j = 1; j < nombre_notes - 1; j++)
					texte += `; $${notes[j]}$ `; // On liste les notes (série brute)
				texte += `et $${notes[nombre_notes - 1]}$.`;

				texte += `<br><br>Calculer la fréquence de la note $${notes[index_valeur]}$.`;
				texte_corr = `La note $${notes[index_valeur]}$ a été obtenue $${frequence}$ fois.<br> Il y a $${nombre_notes}$ notes<br>`;
				texte_corr += `Donc la fréquence de la note $${notes[index_valeur]}$ est : ` + `$${tex_fraction(tex_nombre(frequence), tex_nombre(nombre_notes))}$`;
				if (arrondi(frequence / nombre_notes, 3) == frequence / nombre_notes) { // valeurs exactes
					texte_corr += `$=${arrondi_virgule(frequence / nombre_notes, 3)}$<br>`; // fréquence à 3 chiffres significatifs
					texte_corr += 'Soit ' + `$${tex_nombre(calcul(frequence * 100 / nombre_notes))}\\thickspace\\%$.`; // fréquence en pourcentage avec 1 décimale
				}
				else {
					texte_corr += `$\\approx${arrondi_virgule(frequence / nombre_notes, 3)}$`; // valeurs arrondies
					texte_corr += 'Soit environ ' + `$${arrondi_virgule(calcul(frequence * 100 / nombre_notes), 1)}\\thickspace\\%$.`;
				}

			}
			else { // ici on relève des températures
				let mois = randint(1, 12);
				let annee = randint(1980, 2019);
				let temperatures_de_base = [3, 5, 9, 13, 19, 24, 26, 25, 23, 18, 10, 5];
				nombre_temperatures = jours_par_mois(mois);
				temperatures = un_mois_de_temperature(temperatures_de_base[mois - 1], mois, annee); // on récupère une série de température correspondant à 1 mois d'une année (série brute)
				index_valeur = randint(0, temperatures.length - 1); // on choisi l'index d'une valeur au hasard
				frequence = 0;
				for (j = 0; j < temperatures.length; j++) {
					if (temperatures[j] == temperatures[index_valeur])
						frequence++; // frequence contient l'effectif de cette valeur
				}
				texte = `En ${nom_du_mois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, on a relevé les températures suivantes<br>`;

				texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // On construit le tableau des températures
				texte += '|c';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '|c';
				texte += '}\\hline  \\text{Jour}';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '&' + tex_nombre(j + 1);
				texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}';
				for (j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '&' + temperatures[j];
				texte += '\\\\\\hline\\end{array}$<br><br>';
				texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // On construit le tableau des températures
				texte += '|c';
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++)
					texte += '|c';
				texte += '}\\hline  \\text{Jour}';
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++)
					texte += '&' + tex_nombre(j + 1);
				texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}';
				for (j = Math.round(temperatures.length / 2); j < temperatures.length; j++)
					texte += '&' + temperatures[j];
				texte += '\\\\\\hline\\end{array}$';


				texte += '<br><br>Calculer la fréquence de la température ' + `$${temperatures[index_valeur]}^\\circ\\text{C}$.`;
				texte_corr = `En ${nom_du_mois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, la température $${temperatures[index_valeur]}^\\circ\\text{C}$ a été relevée $${frequence}$ fois.<br>`;
				texte_corr += `Il y a $${jours_par_mois(mois)}$ jours ce mois-ci.<br> La fréquence de la température $${temperatures[index_valeur]}^\\circ\\text{C}$ est :<br>`;
				texte_corr += `$${tex_fraction(tex_nombre(frequence), tex_nombre(jours_par_mois(mois)))}$`;
				if (arrondi(frequence / nombre_temperatures, 3) == frequence / nombre_temperatures) { // valeurs exactes
					texte_corr += `$=${arrondi_virgule(frequence / nombre_temperatures, 3)}$<br>`;
					texte_corr += 'Soit ' + `$${tex_nombre(calcul(frequence * 100 / nombre_temperatures))}\\thickspace\\%$.`;

				}
				else {
					texte_corr += `$\\approx${arrondi_virgule(frequence / nombre_temperatures, 3)}$<br>`; // valeurs arrondies
					texte_corr += 'Soit environ ' + `$${arrondi_virgule(calcul(frequence * 100 / nombre_temperatures), 1)}\\thickspace\\%$.`;
				}
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
	this.besoin_formulaire_numerique = ['Type de séries', 3, "1 : Lancers de dés \n 2 : Liste de notes\n 3 : Un mois de températures"];
}
