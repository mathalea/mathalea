import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,ecritureParentheseSiNegatif,prenom,liste_de_notes,jours_par_mois,unMoisDeTemperature,nom_du_mois,texNombre} from '../../modules/outils.js'


export const titre = 'Calculer des étendues'

/**
 * Calculer des étendues de séries statistiques
* @auteur Jean-Claude Lhote
* Référence 3S15
*/
export default function Calculer_des_etendues() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "";
	this.nbQuestions = 1;
	this.spacing = 1;
	this.spacingCorr = 1;
	this.nbColsCorr = 1;
	this.nbCols = 1;
	this.sup = 1;

	this.nouvelleVersion = function () {
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées

		for (let i = 0, nombre_notes, notes, min, max, temperatures, nombre_temperatures, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
				texteCorr = `La note la plus basse est : $${min}$.<br>La note la plus haute est $${max}$<br>`;
				texteCorr += 'Donc l\'étendue de cette série est : ' + `$${texNombre(max)}-${texNombre(min)}=${texNombre(max - min)}$`;
			}
			else { // ici on relève des températures
				let mois = randint(1, 12);
				let annee = randint(1980, 2019);
				let temperatures_de_base = [3, 5, 9, 13, 19, 24, 26, 25, 23, 18, 10, 5];
				nombre_temperatures = jours_par_mois(mois);
				temperatures = unMoisDeTemperature(temperatures_de_base[mois - 1], mois, annee); // série brute de un mois de température
				max = 0;
				min = 20;
				texte = `En ${nom_du_mois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, on a relevé les températures suivantes<br>`;

				texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // tableau des températures 1/2
				texte += '|c';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '|c';
				texte += '}\\hline  \\text{Jour}';
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
					texte += '&' + texNombre(j + 1);
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
					texte += '&' + texNombre(j + 1);
				texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}';
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { // on cherche le minimum et le maximum
					texte += '&' + temperatures[j];
					min = Math.min(temperatures[j], min);
					max = Math.max(temperatures[j], max);
				}
				texte += '\\\\\\hline\\end{array}$<br><br>';

				texte += 'Calculer l\'amplitude thermique de ce mois (l\'étendue de la série).';
				texteCorr = `En ${nom_du_mois(mois)} ${annee}, la température minimale est ` + `$${min}^\\circ\\text{C}$.<br>La température maximale est $${max}^\\circ\\text{C}$.<br> L\'amplitude thermique est :<br>`;
				texteCorr += `$${texNombre(max)}-${ecritureParentheseSiNegatif(min)}$`;
				if (min < 0)
					texteCorr += `$\\thickspace~=${texNombre(max)}+${texNombre(-min)}$`;
				texteCorr += `$\\thickspace=${texNombre(max - min)}^\\circ\\text{C}$`;

			}

			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);
	};
	this.besoinFormulaireNumerique = ['Type de séries', 2, "1 : Série de notes\n 2 : Série de températures"];
}
