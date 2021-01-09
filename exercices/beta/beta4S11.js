import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,arrondi,arrondi_virgule,calcul,prenom,tirer_les_des,liste_de_notes,jours_par_mois,un_mois_de_temperature,nom_du_mois,tex_nombre,tex_fraction} from "/modules/outils.js";
import {texte_gras,lampe_message} from "/modules/outils.js";




/**
 * Calculs de médianes dans des séries statistiques
* @auteur Sébastien Lozano forked de Jean-Claude Lhote
* Référence 4S11
*/
export default function Calculer_des_frequences() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Calculer des médianes";
	this.consigne = "";
	this.nb_questions = 1;
	this.spacing = 1;
	this.spacing_corr = 1.5;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.liste_packages = `bclogo`;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		for (let i = 0, temperatures, nombre_temperatures, nombre_notes, notes, nombre_des, nombre_faces, nombre_tirages, index_valeur, frequence, tirages, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {			
			var underbrace_mediane = (nb_val) => {
				let sortie;
				if (nb_val%2 == 0) {// nb pair de valeurs
					sortie = `$\\underbrace{1^e\\hspace{0.25cm}2^e ... ${nb_val/2-1}^e}_{${nb_val/2-1}\\; valeurs} \\hspace{0.25cm} ${nb_val/2}^e \\hspace{0.25cm} ${nb_val/2+1}^e \\hspace{0.25cm} \\underbrace{${nb_val/2+2}^e ... ${nb_val}^e}_{${nb_val/2-1}\\; valeurs}$`;
				} else {// nb impair de valeurs
					sortie = `$\\underbrace{1^e\\hspace{0.25cm}2^e ... ${(nb_val-1)/2}^e}_{${(nb_val-1)/2}\\; valeurs} \\hspace{0.25cm} ${(nb_val-1)/2+1}^e \\hspace{0.25cm} \\underbrace{${(nb_val-1)/2+2}^e ... ${nb_val}^e}_{${(nb_val-1)/2}\\; valeurs}$`;
				}
				return sortie
			};
			var des_tab_eff_cumul = (tirages,effCumulBool) => {
				let sortie;				
				if (!effCumulBool) {
					sortie = ``;				
					if (tirages.length > 12) {
						sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // construction du tableau des effectifs 1/2
						for (let j = 0; j <= Math.round(tirages.length / 2); j++)
							sortie += '|c';
						sortie += '}\\hline  \\text{Scores}';
						for (let j = 0; j < Math.round(tirages.length / 2); j++)
							sortie += '&' + tirages[j][0];
						sortie += '\\\\\\hline \\text{Nombre d\'apparitions}';
						for (let j = 0; j < Math.round(tirages.length / 2); j++)
							sortie += '&' + tirages[j][1];
						sortie += '\\\\\\hline\\end{array}$<br><br>';
	
						sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // construction du tableau des effectifs 2/2
						for (let j = Math.round(tirages.length / 2); j <= tirages.length; j++)
							sortie += '|c';
						sortie += '}\\hline  \\text{Scores}';
						for (let j = Math.round(tirages.length / 2); j < tirages.length; j++)
							sortie += '&' + tirages[j][0];
						sortie += '\\\\\\hline \\text{Nombre d\'apparitions}';
						for (let j = Math.round(tirages.length / 2); j < tirages.length; j++)
							sortie += '&' + tirages[j][1];
						sortie += '\\\\\\hline\\end{array}$';
					} else {
						sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // construction du tableau des effectifs en un seul morceau
						for (let j = 0; j <= tirages.length; j++)
							sortie += '|c';
						sortie += '}\\hline  \\text{Scores}';
						for (let j = 0; j < tirages.length; j++)
							sortie += '&' + tirages[j][0];
						sortie += '\\\\\\hline \\text{Nombre d\'apparitions}';
						for (let j = 0; j < tirages.length; j++)
							sortie += '&' + tirages[j][1];			
						sortie += '\\\\\\hline\\end{array}$';
					};	
				} else {
					sortie = ``;				
					if (tirages.length > 12) {
						sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // construction du tableau des effectifs 1/2
						for (let j = 0; j <= Math.round(tirages.length / 2); j++)
							sortie += '|c';
						sortie += '}\\hline  \\text{Scores}';
						for (let j = 0; j < Math.round(tirages.length / 2); j++)
							sortie += '&' + tirages[j][0];
						sortie += '\\\\\\hline \\text{Nombre d\'apparitions}';
						for (let j = 0; j < Math.round(tirages.length / 2); j++)
							sortie += '&' + tirages[j][1];
						sortie += '\\\\\\hline \\text{Nombre d\'apparitions cumulées}';						
						for (let j = 0; j < Math.round(tirages.length / 2); j++) {
							let cumul = 0 ;
							for (let k = 0; k<=j ; k++) {
								cumul += tirages[k][1];
							}
							sortie += '&' + cumul;//tirages[j][1];
						}
						sortie += '\\\\\\hline\\end{array}$<br><br>';
	
						sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // construction du tableau des effectifs 2/2
						for (let j = Math.round(tirages.length / 2); j <= tirages.length; j++)
							sortie += '|c';
						sortie += '}\\hline  \\text{Scores}';
						for (let j = Math.round(tirages.length / 2); j < tirages.length; j++)
							sortie += '&' + tirages[j][0];
						sortie += '\\\\\\hline \\text{Nombre d\'apparitions}';
						for (let j = Math.round(tirages.length / 2); j < tirages.length; j++)
							sortie += '&' + tirages[j][1];
						sortie += '\\\\\\hline \\text{Nombre d\'apparitions cumulées}';						
						for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) {
							let cumul = 0 ;
							for (let k = 0; k<=j ; k++) {
								cumul += tirages[k][1];
							}
							sortie += '&' + cumul;//tirages[j][1];
						}
						sortie += '\\\\\\hline\\end{array}$';
					} else {
						sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c'; // construction du tableau des effectifs en un seul morceau
						for (let j = 0; j <= tirages.length; j++)
							sortie += '|c';
						sortie += '}\\hline  \\text{Scores}';
						for (let j = 0; j < tirages.length; j++)
							sortie += '&' + tirages[j][0];
						sortie += '\\\\\\hline \\text{Nombre d\'apparitions}';
						for (let j = 0; j < tirages.length; j++)
							sortie += '&' + tirages[j][1];
						sortie += '\\\\\\hline \\text{Nombre d\'apparitions cumulées}';						
						for (let j = 0; j < tirages.length; j++) {
							let cumul = 0 ;
							for (let k = 0; k<=j ; k++) {
								cumul += tirages[k][1];
							}
							sortie += '&' + cumul;//tirages[j][1];
						}
						sortie += '\\\\\\hline\\end{array}$';
					};
				};
				return sortie;
			};
			if (this.sup == 1) { // ici on lance des dés
				var solid_name = (nb_cot) => {
					switch (nb_cot) {
						case 4:
							return `tétraèdre`;							
							break;
						case 6:
							return `hexaèdre`;							
							break;
						case 8:
							return `octaèdre`;							
							break;
						case 10:
							return `decaèdre`;							
							break;											
						default:
							return `cas non prévu`
							break;
					};
				};				
				nombre_des = randint(1, 2);
				nombre_faces = choice([4, 6, 8, 10]);
				nombre_tirages = choice([50, 99, 100, 199, 200, 299, 500, 999, 1000, 1999, 2000]);
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
				texte += lampe_message({
					titre : `Vocabulaire`,
					texte :  `Le solide qui correspond à ce type de dé s'appelle ${texte_gras(solid_name(nombre_faces))}.`,
					couleur : `nombres`
				})+'<br>';
				texte += 'Les résultats sont inscrits dans le tableau ci-dessous :<br><br>';
				texte += des_tab_eff_cumul(tirages,false)+ '<br>';				
				texte += `<br><br> Calculer une médiane de cette série.`;
				texte_corr = `On a réalisé $${nombre_tirages}$ lancers en tout.<br>`;				
				if (nombre_tirages%2 == 0) {
					texte_corr += `Le nombre de lancers est pair, les scores sont rangés dans l'ordre croissant.<br>
					Les deux valeurs centrales sont la $${nombre_tirages/2}^{e}$ et la $${nombre_tirages/2+1}^{e}$ valeur.<br>
					En effet, ${underbrace_mediane(nombre_tirages)} <br>
					Une médiane est donc un score compris entre le $${nombre_tirages/2}^{e}$ et le $${nombre_tirages/2+1}^{e}$ score.<br>
					On peut ajouter une ligne avec les effectifs cumulés pour trouver ces deux valeurs.<br><br>
					${des_tab_eff_cumul(tirages,true)}<br><br>
					`;
					// on récupère le score des deux lancers médians
					let scoresMedians = []
					// compteur
					let cpt = 0;
					// Pour cumuler les effectifs, tirages est un tableau 2D qui contient les couples [score,effectif]
					let effCumulCroiss = tirages[0][1];
					// On récupère le premier score médian
					while (effCumulCroiss <= nombre_tirages/2) {
						cpt+=1;
						effCumulCroiss += tirages[cpt][1];						
					};
					scoresMedians.push(tirages[cpt][0]);
					
					// On récupère le second score médian
					cpt = 0;
					effCumulCroiss = tirages[0][1];
					while (effCumulCroiss <= nombre_tirages/2+1) {
						cpt+=1;
						effCumulCroiss += tirages[cpt][1];						
					};
					scoresMedians.push(tirages[cpt][0]);
					texte_corr += `D'où ${texte_gras(`le score médian : ${tex_nombre((scoresMedians[0]+scoresMedians[1])/2)}`)}<br>`;					
					texte_corr += lampe_message({
						titre: `Interprétation`,
						texte: `Ìl y a bien $${(nombre_tirages)/2}$ lancers dont le score est inférieur ou égal à  $${tex_nombre(scoresMedians[0])}$ et $${(nombre_tirages)/2}$ lancers dont le score est supérieur ou égal à  $${tex_nombre(scoresMedians[0])}$.`,
						couleur: `nombres`,
					  });									
				} else { // Le nombre de lancers est impair ici
					texte_corr += `Le nombre de lancers est impair, les scores sont rangés dans l'odre croissant.<br>
					La valeur centrale est la $${(nombre_tirages-1)/2+1}^{e}$ valeur.<br>
					En effet, ${underbrace_mediane(nombre_tirages)} <br>
					Une médiane est donc le $${(nombre_tirages-1)/2+1}^{e}$ score.<br>
					On peut ajouter une ligne avec les effectifs cumulés pour trouver cette valeur.<br><br>
					${des_tab_eff_cumul(tirages,true)}<br><br>`;
					// on récupère le score des deux lancers médians
					let scoresMedians = []
					// compteur
					let cpt = 0;
					// Pour cumuler les effectifs, tirages est un tableau 2D qui contient les couples [score,effectif]
					let effCumulCroiss = tirages[0][1];
					// On récupère le premier score médian
					while (effCumulCroiss <= nombre_tirages/2) {
						cpt+=1;
						effCumulCroiss += tirages[cpt][1];						
					};
					scoresMedians.push(tirages[cpt][0]);
					texte_corr += `D'où ${texte_gras(`le score médian : ${tex_nombre(scoresMedians[0])}`)}<br>`;
					texte_corr += lampe_message({
						titre: `Interprétation`,
						texte: `Ìl y a bien $${(nombre_tirages-1)/2}$ lancers dont le score est inférieur ou égal à  $${tex_nombre(scoresMedians[0])}$ et $${(nombre_tirages-1)/2}$ lancers dont le score est supérieur ou égal à  $${tex_nombre(scoresMedians[0])}$.`,
						couleur: `nombres`,
					  });									
				}
			}
			else if (this.sup == 2) { // ici on trie des notes
				nombre_notes = choice([7, 8, 9, 10, 11, 12]);
				notes = liste_de_notes(nombre_notes, randint(0, 7), randint(13, 20)); // on récupère une liste de notes (série brute)
				index_valeur = randint(0, notes.length - 1); // on choisi une des notes au hasard
				frequence = 0;
				for (let j = 0; j < notes.length; j++) { // frequence va contenir l'effectif de la note choisie
					if (notes[j] == notes[index_valeur])
						frequence++;
				}
				texte = `${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`;
				texte += `$${notes[0]}$`;
				for (let j = 1; j < nombre_notes - 1; j++)
					texte += `; $${notes[j]}$ `; // On liste les notes (série brute)
				texte += `et $${notes[nombre_notes - 1]}$.`;

				texte += `<br><br>Calculer une médiane de cette série.`;
				let notes_rangees = notes.sort((a, b) => a - b);
				let mediane;
				if (notes.length%2==0) {// attention les indices commencent à 0 !
					mediane = (notes_rangees[notes.length/2-1]+notes_rangees[notes.length/2])/2;
					//console.log('parité');
				} else {
					mediane = notes_rangees[(notes.length-1)/2];
					//console.log('imparité');
				}
				
				texte_corr = `Il y a $${notes.length}$ notes en tout. `;				
				if (notes.length%2==0) {
					texte_corr += `Le nombre de notes est pair.<br>`;					
				} else {
					texte_corr += `Le nombre de notes est impair.<br>`;					
				};
				texte_corr += `Il faut par exemple ranger les notes dans l'ordre croissant : <br> $${notes[0]}$`;
				for (let j = 1; j < nombre_notes - 1; j++)
					texte_corr += `; $${notes[j]}$ `; // On liste les notes (série brute)
				texte_corr += `et $${notes[nombre_notes - 1]}$.<br>`;

				if (notes.length%2==0) {
					texte_corr += `Les notes centrales sont la $${notes.length/2}^{e}$ et la $${notes.length/2+1}^{e}$.<br>
					En effet, ${underbrace_mediane(notes.length)}<br>
					Une médiane est donc une note comprise entre la $${notes.length/2}^{e}$ et la $${notes.length/2+1}^{e}$ note, lorsque ces notes sont rangées.<br>`;
				} else {
					texte_corr += `La note centrale est donc la $${(notes.length+1)/2}^{e}$.<br>
					En effet, ${underbrace_mediane(notes.length)}<br>					
					Une médiane est donc la $${(notes.length+1)/2}^{e}$ note, lorsque ces notes sont rangées.<br>`;			
				};
				texte_corr += `D'où ${texte_gras(`la note médiane : ${tex_nombre(mediane)}`)}<br>`;
				if (notes.length%2==0) {
					texte_corr += lampe_message({
						titre: `Interprétation`,
						texte: `Ìl y a bien $${notes.length/2}$ notes inférieures ou égales à  $${tex_nombre(mediane)}$ et $${notes.length/2}$ notes supérieures ou égales à  $${tex_nombre(mediane)}$.`,
						couleur: `nombres`,
					  });									
				} else {
					texte_corr += lampe_message({
						titre: `Interprétation`,
						texte: `Ìl y a bien $${(notes.length-1)/2}$ notes inférieures ou égales à  $${tex_nombre(mediane)}$ et $${(notes.length-1)/2}$ notes supérieures ou égales à  $${tex_nombre(mediane)}$.`,
						couleur: `nombres`,
					  });									
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
				for (let j = 0; j < temperatures.length; j++) {
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
				for (let j = 0; j < Math.round(temperatures.length / 2); j++)
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
				for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++)
					texte += '&' + temperatures[j];
				texte += '\\\\\\hline\\end{array}$';


				texte += `<br><br>Calculer une médiane de cette série.`;
				//texte += temperatures;
				//texte += temperatures.length;
				texte_corr = `Correction.<br>`;
				let temperatures_rangees = temperatures.sort((a, b) => a - b);
				let mediane;
				if (temperatures.length%2==0) {// attention les indices commencent à 0 !
					mediane = (temperatures_rangees[temperatures.length/2-1]+temperatures_rangees[temperatures.length/2])/2;
					//console.log('parité');
				} else {
					mediane = temperatures_rangees[(temperatures.length-1)/2];
					//console.log('imparité');
				};
				texte_corr = `Il y a $${temperatures.length}$ températures relevées en tout. `;				
				if (temperatures.length%2==0) {
					texte_corr += `Le nombre de temperatures est pair.<br>`;					
				} else {
					texte_corr += `Le nombre de temperatures est impair.<br>`;					
				};
				texte_corr += `Il faut par exemple ranger les temperatures dans l'ordre croissant : <br> $${temperatures[0]}$`;
				for (let j = 1; j < nombre_temperatures - 1; j++)
					texte_corr += `; $${temperatures[j]}$ `; // On liste les temperatures (série brute)
				texte_corr += `et $${temperatures[nombre_temperatures - 1]}$.<br>`;

				if (temperatures.length%2==0) {
					texte_corr += `Les temperatures centrales sont la $${temperatures.length/2}^{e}$ et la $${temperatures.length/2+1}^{e}$.<br>
					En effet, ${underbrace_mediane(temperatures.length)}<br>
					Une médiane est donc une temperature comprise entre la $${temperatures.length/2}^{e}$ et la $${temperatures.length/2+1}^{e}$ temperature, lorsque ces temperatures sont rangées.<br>`;
				} else {
					texte_corr += `La temperature centrale est donc la $${(temperatures.length+1)/2}^{e}$.<br>
					En effet, ${underbrace_mediane(temperatures.length)}<br>					
					Une médiane est donc la $${(temperatures.length+1)/2}^{e}$ temperature, lorsque ces temperatures sont rangées.<br>`;			
				};
				texte_corr += `D'où ${texte_gras(`la temperature médiane : ${tex_nombre(mediane)}`)}<br>`;
				if (temperatures.length%2==0) {
					texte_corr += lampe_message({
						titre: `Interprétation`,
						texte: `Ìl y a bien $${temperatures.length/2}$ temperatures inférieures ou égales à  $${tex_nombre(mediane)}$ et $${temperatures.length/2}$ temperatures supérieures ou égales à  $${tex_nombre(mediane)}$.`,
						couleur: `nombres`,
					  });									
				} else {
					texte_corr += lampe_message({
						titre: `Interprétation`,
						texte: `Ìl y a bien $${(temperatures.length-1)/2}$ temperatures inférieures ou égales à  $${tex_nombre(mediane)}$ et $${(temperatures.length-1)/2}$ temperatures supérieures ou égales à  $${tex_nombre(mediane)}$.`,
						couleur: `nombres`,
					  });									
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