import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,arrondi,arrondiVirgule,prenom,liste_de_notes,jours_par_mois,un_mois_de_temperature,nom_du_mois,texNombre,texFraction,personne} from '../../modules/outils.js'

export const titre = 'Calculer des moyennes'

/**
 * Calcul de moyennes de série statistiques
* @auteur Jean-Claude Lhote
* Référence 5S14
*/
export default function Calculer_des_moyennes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.spacing = 1
  this.spacingCorr = 1.5
  this.nbColsCorr = 1
  this.nbCols = 1
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

		for (let i = 0, nombre_notes,eleve, notes, somme, nombre_temperatures, temperatures, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			if (this.sup == 1) { // ici on trie des notes
				nombre_notes = choice([8, 10, 12]);
				notes = liste_de_notes(nombre_notes, randint(0, 7), randint(13, 20)); // on récupère une série de notes (série brute)
				somme = 0;
				eleve = personne()
				for (let j = 0; j < nombre_notes; j++)
					somme += notes[j];

				texte = `${eleve.prenom} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`;
				texte += `$${notes[0]}$`;
				for (let j = 1; j < nombre_notes - 1; j++)
					texte += `; $${notes[j]}$ `; // On liste les notes
				texte += `et $${notes[nombre_notes - 1]}$.<br>`;
				texteCorr = `La somme des notes est : $${somme}$.<br> Il y a $${nombre_notes}$ notes<br>`;
			
				if (eleve.genre==='masculin') {
					texte += `Calculer la moyenne de cet élève en mathématiques.`;
					texteCorr += 'Donc la moyenne de cet élève est : ' + `$${texFraction(texNombre(somme), texNombre(nombre_notes))}$`;
				}
				else {
					texte += `Calculer la moyenne de cette élève en mathématiques.`;
					texteCorr += 'Donc la moyenne de cette élève est : ' + `$${texFraction(texNombre(somme), texNombre(nombre_notes))}$`;
				}

				if (arrondi(somme / nombre_notes, 2) == somme / nombre_notes)
					texteCorr += `$=${arrondiVirgule(somme / nombre_notes, 2)}$<br>`; // moyenne exacte
				else
					texteCorr += `$\\approx${arrondiVirgule(somme / nombre_notes, 2)}$`; // moyenne arrondie
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
					texte += '&' + texNombre(j + 1);
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
					texte += '&' + texNombre(j + 1);
				texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}';
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) {
					texte += '&' + temperatures[j];
					somme += temperatures[j];
				}
				texte += '\\\\\\hline\\end{array}$<br><br>';

        texte += 'Calculer la température moyenne de ce mois.'
        texteCorr = `En ${nom_du_mois(mois)} ${annee}, la somme des températures est ` + `$${somme}^\\circ\\text{C}$.<br> Il y a $${temperatures.length}$ jours ce mois-ci.<br> La température moyenne est :<br>`
        texteCorr += `$${texFraction(texNombre(somme) + '^\\circ\\text{C}', texNombre(nombre_temperatures))}$`

        if (arrondi(somme / nombre_temperatures, 2) === somme / nombre_temperatures) {
          texteCorr += `$=${arrondiVirgule(somme / nombre_temperatures, 2)}^\\circ\\text{C}$` // moyenne exacte
        } else { texteCorr += `$\\approx${arrondiVirgule(somme / nombre_temperatures, 2)}^\\circ\\text{C}$` } // moyenne arrondie
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de séries', 2, '1 : Série de notes\n 2 : Série de températures']
}
