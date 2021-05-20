import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {listeQuestionsToContenu,randint,choice,arrondi,arrondiVirgule,calcul,prenom,tirerLesDes,listeDeNotes,joursParMois,unMoisDeTemperature,nomDuMois,texNombre,texFraction} from '../../modules/outils.js'


export const titre = 'Calculer des fréquences'

/**
 * Calculs de fréquences dans des séries statistiques
* @author Jean-Claude Lhote
* Référence 5S13
*/
export default function Calculer_des_frequences() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "";
	this.nbQuestions = 1;
	this.spacing = 1;
	this.spacingCorr = 1.5;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.sup = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées

		for (let i = 0, temperatures, nombre_temperatures, nombreNotes, notes, nombreDes, nombreFaces, nombreTirages, index_valeur, frequence, tirages, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			if (this.sup == 1) { // ici on lance des dés
				nombreDes = randint(1, 2);
				nombreFaces = choice([4, 6, 8, 10]);
				nombreTirages = choice([50, 100, 200, 500, 1000]);
				tirages = tirerLesDes(nombreTirages, nombreFaces, nombreDes); // on récupère une série rangée dans l'ordre croissant avec les effectifs correspondants
				do
					index_valeur = randint(0, tirages.length - 1);
				while (tirages[index_valeur][1] == 0); // on choisi au hasard l'index d'une valeur dont l'effectif est différent de 0.
				if (nombreDes > 1) {
					texte = `On a réalisé $${nombreTirages}$ lancers de $${nombreDes}$ dés à $${nombreFaces}$ faces.<br>`;
				}
				else {
					texte = `On a réalisé $${nombreTirages}$ lancers d'un dé à $${nombreFaces}$ faces.<br>`;
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

				texte += '<br><br> Calculer la fréquence de la valeur ' + `$${calcul(nombreDes + index_valeur)}$.`;
				texteCorr = 'La valeur ' + `$${calcul(nombreDes + index_valeur)}$ apparaît ` + `$${tirages[index_valeur][1]}$ fois.<br>Le nombre total de lancers est $${texNombre(nombreTirages)}$.<br>`;
				texteCorr += 'La fréquence de la valeur ' + `$${calcul(nombreDes + index_valeur)}$` + ' est ' + `$${texFraction(tirages[index_valeur][1], texNombre(nombreTirages))}=${texNombre(calcul(tirages[index_valeur][1] / nombreTirages))}$<br>`;
				texteCorr += 'Soit ' + `$${texNombre(calcul(tirages[index_valeur][1] * 100 / nombreTirages))}\\thickspace\\%$.`;
			}
			else if (this.sup == 2) { // ici on trie des notes
				nombreNotes = choice([8, 10, 12]);
				notes = listeDeNotes(nombreNotes, randint(0, 7), randint(13, 20)); // on récupère une liste de notes (série brute)
				index_valeur = randint(0, notes.length - 1); // on choisi une des notes au hasard
				frequence = 0;
				for (let j = 0; j < notes.length; j++) { // frequence va contenir l'effectif de la note choisie
					if (notes[j] == notes[index_valeur])
						frequence++;
				}
				texte = `${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`;
				texte += `$${notes[0]}$`;
				for (let j = 1; j < nombreNotes - 1; j++)
					texte += `; $${notes[j]}$ `; // On liste les notes (série brute)
				texte += `et $${notes[nombreNotes - 1]}$.`;

				texte += `<br><br>Calculer la fréquence de la note $${notes[index_valeur]}$.`;
				texteCorr = `La note $${notes[index_valeur]}$ a été obtenue $${frequence}$ fois.<br> Il y a $${nombreNotes}$ notes<br>`;
				texteCorr += `Donc la fréquence de la note $${notes[index_valeur]}$ est : ` + `$${texFraction(texNombre(frequence), texNombre(nombreNotes))}$`;
				if (arrondi(frequence / nombreNotes, 3) == frequence / nombreNotes) { // valeurs exactes
					texteCorr += `$=${arrondiVirgule(frequence / nombreNotes, 3)}$<br>`; // fréquence à 3 chiffres significatifs
					texteCorr += 'Soit ' + `$${texNombre(calcul(frequence * 100 / nombreNotes))}\\thickspace\\%$.`; // fréquence en pourcentage avec 1 décimale
				}
				else {
					texteCorr += `$\\approx${arrondiVirgule(frequence / nombreNotes, 3)}$`; // valeurs arrondies
					texteCorr += 'Soit environ ' + `$${arrondiVirgule(calcul(frequence * 100 / nombreNotes), 1)}\\thickspace\\%$.`;
				}

			}
			else { // ici on relève des températures
				let mois = randint(1, 12);
				let annee = randint(1980, 2019);
				let temperatures_de_base = [3, 5, 9, 13, 19, 24, 26, 25, 23, 18, 10, 5];
				nombre_temperatures = joursParMois(mois);
				temperatures = unMoisDeTemperature(temperatures_de_base[mois - 1], mois, annee); // on récupère une série de température correspondant à 1 mois d'une année (série brute)
				index_valeur = randint(0, temperatures.length - 1); // on choisi l'index d'une valeur au hasard
				frequence = 0;
				for (let j = 0; j < temperatures.length; j++) {
					if (temperatures[j] == temperatures[index_valeur])
						frequence++; // frequence contient l'effectif de cette valeur
				}
				texte = `En ${nomDuMois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, on a relevé les températures suivantes<br>`;

				texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // On construit le tableau des températures
				texte += '|c';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '|c';
				texte += '}\\hline  \\text{Jour}';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '&' + texNombre(j + 1);
				texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '&' + temperatures[j];
				texte += '\\\\\\hline\\end{array}$<br><br>';
				texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // On construit le tableau des températures
				texte += '|c';
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++)
					texte += '|c';
				texte += '}\\hline  \\text{Jour}';
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++)
					texte += '&' + texNombre(j + 1);
				texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}';
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++)
					texte += '&' + temperatures[j];
				texte += '\\\\\\hline\\end{array}$';


				texte += '<br><br>Calculer la fréquence de la température ' + `$${temperatures[index_valeur]}^\\circ\\text{C}$.`;
				texteCorr = `En ${nomDuMois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, la température $${temperatures[index_valeur]}^\\circ\\text{C}$ a été relevée $${frequence}$ fois.<br>`;
				texteCorr += `Il y a $${joursParMois(mois)}$ jours ce mois-ci.<br> La fréquence de la température $${temperatures[index_valeur]}^\\circ\\text{C}$ est :<br>`;
				texteCorr += `$${texFraction(texNombre(frequence), texNombre(joursParMois(mois)))}$`;
				if (arrondi(frequence / nombre_temperatures, 3) == frequence / nombre_temperatures) { // valeurs exactes
					texteCorr += `$=${arrondiVirgule(frequence / nombre_temperatures, 3)}$<br>`;
					texteCorr += 'Soit ' + `$${texNombre(calcul(frequence * 100 / nombre_temperatures))}\\thickspace\\%$.`;

				}
				else {
					texteCorr += `$\\approx${arrondiVirgule(frequence / nombre_temperatures, 3)}$<br>`; // valeurs arrondies
					texteCorr += 'Soit environ ' + `$${arrondiVirgule(calcul(frequence * 100 / nombre_temperatures), 1)}\\thickspace\\%$.`;
				}
			}
			if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);
	};
	this.besoinFormulaireNumerique = ['Type de séries', 3, "1 : Lancers de dés \n 2 : Liste de notes\n 3 : Un mois de températures"];
}
