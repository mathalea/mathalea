import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListesSansChangerOrdre,calcul,texNombrec,texNombre,miseEnEvidence,tex_prix,tableauColonneLigne} from '../../modules/outils.js'


/**
 * * Tableaux et pourcentages
 * * 5N11-pere de 5N11-1 et 5N11-2
 * * publication initiale le 08/2020
 * * modification le 25/11/2020 pour ajouter des paramétrages
 * * modification le 27/11/2020 ajout de la modulation de la demande
 * @author Sébastien Lozano
 */
export default function Tableaux_et_pourcentages() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.debug = false;
	this.sup = 1; // nature du coefficient entre les pourcentages, entier/decimal
	this.sup2 = 1; //nombre de colonnes
	if (this.debug) {
		this.nbQuestions = 1;
	} else {
		this.nbQuestions = 1;
	};
	if (this.exo == '5N11-1') { // prix constant
		this.titre = "Tableaux et pourcentages - prix constant";
		this.consigne = `Compléter le tableau suivant. Le prix est fixe.`;
	} else if (this.exo == '5N11-2') { // pourcentage constant
		this.titre = "Tableaux et pourcentages - pourcentage constant";
		this.consigne = `Compléter le tableau suivant. Le pourcentage est fixe.`;
	} else {
		this.titre = "Tableaux et pourcentages";
		this.consigne = `Compléter le tableau suivant.`;
	};

	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.nbQuestionsModifiable = false;
	// sortieHtml? this.spacing = 3 : this.spacing = 2; 
	// sortieHtml? this.spacingCorr = 2.5 : this.spacingCorr = 1.5;
	this.correctionDetailleeDisponible = true;

	let type_de_questions_disponibles;

	this.nouvelleVersion = function () {
		if (this.debug) {
			if (this.sup2 == 1) {
				type_de_questions_disponibles = [0];
			};
			if (this.sup2 == 2) {
				type_de_questions_disponibles = [1];
			};
			if (this.sup2 == 3) {
				type_de_questions_disponibles = [2];
			};
			if (this.sup2 == 4) {
				type_de_questions_disponibles = [3];
			};
			if (this.sup3) {
				type_de_questions_disponibles = [4];
			};
		} else {
			if (this.sup2 == 1) {
				type_de_questions_disponibles = [0];
			};
			if (this.sup2 == 2) {
				type_de_questions_disponibles = [1];
			};
			if (this.sup2 == 3) {
				type_de_questions_disponibles = [2];
			};
			if (this.sup2 == 4) {
				type_de_questions_disponibles = [3];
			};
			if (this.sup3) {
				type_de_questions_disponibles = [4];
			};
		};

		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées		

		let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées --> à remettre comme ci dessus		

		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			// une fonction pour les textes de correction
			/**
			 * @param {string} type // ce qui est donné, remise en pourcentage; Montant de la remise ou Nouveau prix
			 * @param {object} remise_init //remise initiale deux propriétés nb sous forme numerique et str sous forme de chaine
			 * @param {object} remise //remise effective deux propriétés nb sous forme numerique et str sous forme de codageHauteurTriangle
			 * @param {number} prix
			 */
			function justifCorrType(type, remise_init, remise, prix) {
				let sortie = ``;
				switch (type) {
					case 'pourcentage':
						sortie = `-- L'énoncé indique le montant pour une remise de $${remise_init.str}$ du prix initial or $${texNombre(remise.nb / remise_init.nb)} \\times ${remise_init.str} = ${remise.str}$.<br>
						Donc pour une remise de $${remise.str}$ du prix initial, le montant de la remise sera $${texNombre(remise.nb / remise_init.nb)}$ fois celui de la remise de $${remise_init.str}$ du prix initial,<br>
						d'où le calul pour le montant de la remise : $${miseEnEvidence(`${tex_prix(prix * remise_init.nb / 100)} \\times ${texNombre(remise.nb / remise_init.nb)} = ${tex_prix(prix * remise.nb / 100)}`)}$.<br>
						Et celui pour le nouveau prix : $${miseEnEvidence(`${tex_prix(prix)}-${tex_prix(prix * remise.nb / 100)} = ${tex_prix(prix - prix * remise.nb / 100)}`)}$.<br><br>
						Mais on peut aussi calculer directement le prix réduit en faisant :<br>
						$${miseEnEvidence(`${tex_prix(prix)} \\times (100\\% - ${remise.str}) = ${tex_prix(prix)} \\times ${100 - remise.nb}\\% = ${tex_prix(prix)} \\times ${texNombre(calcul(1 - remise.nb / 100))} = ${tex_prix(prix * calcul(1 - remise.nb / 100))}`)}$
						`;
						break;
					case 'remise':
						sortie = `-- L'énoncé indique $${tex_prix(prix * remise.nb / 100)}$ € de remise pour un montant de $${tex_prix(prix)}$ €<br>
						d'où le calcul pour le pourcentage de remise : $${miseEnEvidence(`${tex_prix(prix * remise.nb / 100)} \\div ${tex_prix(prix)} = ${texNombrec(remise.nb / 100)} = ${remise.str}`)}$.<br>
						Et celui pour le nouveau prix : $${miseEnEvidence(`${tex_prix(prix)}-${tex_prix(prix * remise.nb / 100)} = ${tex_prix(prix - prix * remise.nb / 100)}`)}$.`;

						break;
					case 'nouveau_prix':
						sortie = `-- L'énoncé indique un nouveau prix de $${tex_prix(prix - prix * remise.nb / 100)}$ € pour un montant de $${tex_prix(prix)}$ €<br>
						d'où le calcul pour le nouveau prix : $${miseEnEvidence(`${tex_prix(prix)} - ${tex_prix(prix - prix * remise.nb / 100)} = ${tex_prix(prix * remise.nb / 100)}`)}$.<br>
						Et celui pour le pourcentage de remise : $${miseEnEvidence(`${tex_prix(prix * remise.nb / 100)} \\div ${tex_prix(prix)} = ${texNombrec(remise.nb / 100)} = ${remise.str}`)}$.`;
						break;
					case 'pourcentage_constant':
						sortie = `-- L'énoncé indique un prix de $${tex_prix(prix)}$ € et une remise de $${remise.str}$ du prix initial<br>
						d'où le calul pour le montant de la remise : $${miseEnEvidence(`${tex_prix(prix)} \\times ${remise.str} = ${tex_prix(prix)} \\times ${texNombre(remise.nb / 100)} = ${tex_prix(prix * remise.nb / 100)}`)}$.<br>
						Et celui pour le nouveau prix : $${miseEnEvidence(`${tex_prix(prix)}-${tex_prix(prix * remise.nb / 100)} = ${tex_prix(prix - prix * remise.nb / 100)}`)}$.<br><br>
						Mais on peut aussi calculer directement le prix réduit en faisant :<br>
						$${miseEnEvidence(`${tex_prix(prix)} \\times (100\\% - ${remise.str}) = ${tex_prix(prix)} \\times ${100 - remise.nb}\\% = ${tex_prix(prix)} \\times ${texNombre(calcul(1 - remise.nb / 100))} = ${tex_prix(prix * calcul(1 - remise.nb / 100))}`)}$
						`;
						break;
				};
				return sortie;
			};

			let choix_prix, prix1, prix2, prix3, prix4, prix5, prix, remises;
			do {
				choix_prix = randint(150, 300);
			} while (choix_prix % 5 != 0);

			if (this.exo == '5N11-1') { // prix constant
				prix = [choix_prix, choix_prix, choix_prix, choix_prix, choix_prix];
			} else if (this.exo = '5N11-2') {
				prix1 = randint(150, 300);
				prix2 = randint(150, 300, [prix1]);
				prix3 = randint(150, 300, [prix1, prix2]);
				prix4 = randint(150, 300, [prix1, prix2, prix3]);
				prix5 = randint(150, 300, [prix1, prix2, prix3, prix4]);
				prix = [prix1, prix2, prix3, prix4, prix5];
			}

			if (this.sup == 1) { //coeff entier
				if (this.exo == '5N11-1') { // prix constant
					remises = choice([
						[{ str: '5\\%', nb: 5 }, { str: '10\\%', nb: 10 }, { str: '15\\%', nb: 15 }, { str: '20\\%', nb: 20 }, { str: '25\\%', nb: 25 }, { str: '30\\%', nb: 30 }],
						[{ str: '5\\%', nb: 5 }, { str: '35\\%', nb: 35 }, { str: '45\\%', nb: 45 }, { str: '55\\%', nb: 55 }, { str: '65\\%', nb: 65 }, { str: '75\\%', nb: 75 }],
						[{ str: '5\\%', nb: 5 }, { str: '15\\%', nb: 15 }, { str: '25\\%', nb: 25 }, { str: '35\\%', nb: 35 }, { str: '45\\%', nb: 45 }, { str: '55\\%', nb: 55 }],
						[{ str: '5\\%', nb: 5 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '50\\%', nb: 50 }, { str: '60\\%', nb: 60 }, { str: '70\\%', nb: 70 }],
						[{ str: '5\\%', nb: 5 }, { str: '25\\%', nb: 25 }, { str: '40\\%', nb: 40 }, { str: '45\\%', nb: 45 }, { str: '50\\%', nb: 50 }, { str: '55\\%', nb: 55 }],
						[{ str: '5\\%', nb: 5 }, { str: '45\\%', nb: 45 }, { str: '50\\%', nb: 50 }, { str: '55\\%', nb: 55 }, { str: '60\\%', nb: 60 }, { str: '65\\%', nb: 65 }],
						[{ str: '5\\%', nb: 5 }, { str: '50\\%', nb: 50 }, { str: '55\\%', nb: 55 }, { str: '60\\%', nb: 60 }, { str: '65\\%', nb: 65 }, { str: '70\\%', nb: 70 }],
						[{ str: '10\\%', nb: 10 }, { str: '20\\%', nb: 20 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '50\\%', nb: 50 }, { str: '60\\%', nb: 60 }],
						[{ str: '10\\%', nb: 10 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '50\\%', nb: 50 }, { str: '60\\%', nb: 60 }, { str: '70\\%', nb: 70 }],
						[{ str: '10\\%', nb: 10 }, { str: '40\\%', nb: 40 }, { str: '50\\%', nb: 50 }, { str: '60\\%', nb: 60 }, { str: '70\\%', nb: 70 }, { str: '80\\%', nb: 80 }]
					]);
				} else if (this.exo == '5N11-2') { // pourcentage constant
					remises = choice([
						[{ str: '5\\%', nb: 5 }, { str: '5\\%', nb: 5 }, { str: '5\\%', nb: 5 }, { str: '5\\%', nb: 5 }, { str: '5\\%', nb: 5 }, { str: '5\\%', nb: 5 }],
						[{ str: '10\\%', nb: 10 }, { str: '10\\%', nb: 10 }, { str: '10\\%', nb: 10 }, { str: '10\\%', nb: 10 }, { str: '10\\%', nb: 10 }, { str: '10\\%', nb: 10 }],
						[{ str: '15\\%', nb: 15 }, { str: '15\\%', nb: 15 }, { str: '15\\%', nb: 15 }, { str: '15\\%', nb: 15 }, { str: '15\\%', nb: 15 }, { str: '15\\%', nb: 15 }],
						[{ str: '20\\%', nb: 20 }, { str: '20\\%', nb: 20 }, { str: '20\\%', nb: 20 }, { str: '20\\%', nb: 20 }, { str: '20\\%', nb: 20 }, { str: '20\\%', nb: 20 }],
						[{ str: '25\\%', nb: 25 }, { str: '25\\%', nb: 25 }, { str: '25\\%', nb: 25 }, { str: '25\\%', nb: 25 }, { str: '25\\%', nb: 25 }, { str: '25\\%', nb: 25 }],
						[{ str: '30\\%', nb: 30 }, { str: '30\\%', nb: 30 }, { str: '30\\%', nb: 30 }, { str: '30\\%', nb: 30 }, { str: '30\\%', nb: 30 }, { str: '30\\%', nb: 30 }],
						[{ str: '35\\%', nb: 35 }, { str: '35\\%', nb: 35 }, { str: '35\\%', nb: 35 }, { str: '35\\%', nb: 35 }, { str: '35\\%', nb: 35 }, { str: '35\\%', nb: 35 }],
						[{ str: '40\\%', nb: 40 }, { str: '40\\%', nb: 40 }, { str: '40\\%', nb: 40 }, { str: '40\\%', nb: 40 }, { str: '40\\%', nb: 40 }, { str: '40\\%', nb: 40 }],
						[{ str: '45\\%', nb: 45 }, { str: '45\\%', nb: 45 }, { str: '45\\%', nb: 45 }, { str: '45\\%', nb: 45 }, { str: '45\\%', nb: 45 }, { str: '45\\%', nb: 45 }],
						[{ str: '50\\%', nb: 50 }, { str: '50\\%', nb: 50 }, { str: '50\\%', nb: 50 }, { str: '50\\%', nb: 50 }, { str: '50\\%', nb: 50 }, { str: '50\\%', nb: 50 }],
						[{ str: '55\\%', nb: 55 }, { str: '55\\%', nb: 55 }, { str: '55\\%', nb: 55 }, { str: '55\\%', nb: 55 }, { str: '55\\%', nb: 55 }, { str: '55\\%', nb: 55 }],
						[{ str: '60\\%', nb: 60 }, { str: '60\\%', nb: 60 }, { str: '60\\%', nb: 60 }, { str: '60\\%', nb: 60 }, { str: '60\\%', nb: 60 }, { str: '60\\%', nb: 60 }],
						[{ str: '65\\%', nb: 65 }, { str: '65\\%', nb: 65 }, { str: '65\\%', nb: 65 }, { str: '65\\%', nb: 65 }, { str: '65\\%', nb: 65 }, { str: '65\\%', nb: 65 }],
						[{ str: '70\\%', nb: 70 }, { str: '70\\%', nb: 70 }, { str: '70\\%', nb: 70 }, { str: '70\\%', nb: 70 }, { str: '70\\%', nb: 70 }, { str: '70\\%', nb: 70 }],
						[{ str: '75\\%', nb: 75 }, { str: '75\\%', nb: 75 }, { str: '75\\%', nb: 75 }, { str: '75\\%', nb: 75 }, { str: '75\\%', nb: 75 }, { str: '75\\%', nb: 75 }],
						[{ str: '80\\%', nb: 80 }, { str: '80\\%', nb: 80 }, { str: '80\\%', nb: 80 }, { str: '80\\%', nb: 80 }, { str: '80\\%', nb: 80 }, { str: '80\\%', nb: 80 }]
					]);
				};
			};
			if (this.sup == 2) { //coeff décimal
				if (this.exo == '5N11-1') { // prix constant
					remises = choice([
						[{ str: '10\\%', nb: 10 }, { str: '5\\%', nb: 5 }, { str: '15\\%', nb: 15 }, { str: '25\\%', nb: 25 }, { str: '35\\%', nb: 35 }, { str: '45\\%', nb: 45 }],
						[{ str: '50\\%', nb: 50 }, { str: '30\\%', nb: 30 }, { str: '10\\%', nb: 10 }, { str: '20\\%', nb: 20 }, { str: '40\\%', nb: 40 }, { str: '60\\%', nb: 60 }],
						[{ str: '20\\%', nb: 20 }, { str: '10\\%', nb: 10 }, { str: '50\\%', nb: 50 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '60\\%', nb: 60 }],
						[{ str: '40\\%', nb: 40 }, { str: '10\\%', nb: 10 }, { str: '5\\%', nb: 5 }, { str: '20\\%', nb: 20 }, { str: '50\\%', nb: 50 }, { str: '30\\%', nb: 30 }],
						[{ str: '80\\%', nb: 80 }, { str: '10\\%', nb: 10 }, { str: '50\\%', nb: 50 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '20\\%', nb: 20 }],
						[{ str: '10\\%', nb: 10 }, { str: '15\\%', nb: 15 }, { str: '25\\%', nb: 25 }, { str: '35\\%', nb: 35 }, { str: '45\\%', nb: 45 }, { str: '55\\%', nb: 55 }],
						[{ str: '50\\%', nb: 50 }, { str: '35\\%', nb: 35 }, { str: '10\\%', nb: 10 }, { str: '25\\%', nb: 25 }, { str: '40\\%', nb: 40 }, { str: '65\\%', nb: 65 }],
						[{ str: '20\\%', nb: 20 }, { str: '5\\%', nb: 5 }, { str: '50\\%', nb: 50 }, { str: '35\\%', nb: 35 }, { str: '40\\%', nb: 40 }, { str: '55\\%', nb: 55 }],
						[{ str: '40\\%', nb: 40 }, { str: '15\\%', nb: 15 }, { str: '5\\%', nb: 5 }, { str: '20\\%', nb: 20 }, { str: '30\\%', nb: 30 }, { str: '25\\%', nb: 25 }],
						[{ str: '80\\%', nb: 80 }, { str: '20\\%', nb: 20 }, { str: '55\\%', nb: 55 }, { str: '30\\%', nb: 30 }, { str: '40\\%', nb: 40 }, { str: '20\\%', nb: 20 }],
					]);
				} else if (this.exo == '5N11-2') { // pourcentage constant
					// remises = choice([
					// 	[{str:'10\\%',nb:10},{str:'5\\%',nb:5},{str:'15\\%',nb:15},{str:'25\\%',nb:25},{str:'35\\%',nb:35},{str:'45\\%',nb:45}],
					// 	[{str:'50\\%',nb:50},{str:'30\\%',nb:30},{str:'10\\%',nb:10},{str:'20\\%',nb:20},{str:'40\\%',nb:40},{str:'60\\%',nb:60}],
					// 	[{str:'20\\%',nb:20},{str:'10\\%',nb:10},{str:'50\\%',nb:50},{str:'30\\%',nb:30},{str:'40\\%',nb:40},{str:'60\\%',nb:60}],
					// 	[{str:'40\\%',nb:40},{str:'10\\%',nb:10},{str:'5\\%',nb:5},{str:'20\\%',nb:20},{str:'50\\%',nb:50},{str:'30\\%',nb:30}],
					// 	[{str:'80\\%',nb:80},{str:'10\\%',nb:10},{str:'50\\%',nb:50},{str:'30\\%',nb:30},{str:'40\\%',nb:40},{str:'20\\%',nb:20}],
					// 	[{str:'10\\%',nb:10},{str:'15\\%',nb:15},{str:'25\\%',nb:25},{str:'35\\%',nb:35},{str:'45\\%',nb:45},{str:'55\\%',nb:55}],
					// 	[{str:'50\\%',nb:50},{str:'35\\%',nb:35},{str:'10\\%',nb:10},{str:'25\\%',nb:25},{str:'40\\%',nb:40},{str:'65\\%',nb:65}],
					// 	[{str:'20\\%',nb:20},{str:'5\\%',nb:5},{str:'50\\%',nb:50},{str:'35\\%',nb:35},{str:'40\\%',nb:40},{str:'55\\%',nb:55}],
					// 	[{str:'40\\%',nb:40},{str:'15\\%',nb:15},{str:'5\\%',nb:5},{str:'20\\%',nb:20},{str:'30\\%',nb:30},{str:'25\\%',nb:25}],
					// 	[{str:'80\\%',nb:80},{str:'20\\%',nb:20},{str:'55\\%',nb:55},{str:'30\\%',nb:30},{str:'40\\%',nb:40},{str:'20\\%',nb:20}],		
					// ]);		
				};
			};

			// pour les situations, autant de situations que de cas dans le switch !
			let situations = [
				{
					tableau: tableauColonneLigne([`\\text{Prix en €}`, tex_prix(prix[0]), tex_prix(prix[1])], [`\\text{Remise en pourcentage}`, `\\text{Montant de la remise en €}`, `\\text{Nouveau prix en €}`], [
						remises[0].str, remises[1].str,
						tex_prix(prix[0] * remises[0].nb / 100), '',
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), '',
					]),
					tableau_corr: tableauColonneLigne([`\\text{Prix en €}`, tex_prix(prix[0]), tex_prix(prix[1])], [`\\text{Remise en pourcentage}`, `\\text{Montant de la remise en €}`, `\\text{Nouveau prix en €}`], [
						remises[0].str, remises[1].str,
						tex_prix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[1] * remises[1].nb / 100)}`),
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[1] - prix[1] * remises[1].nb / 100)}`),
					]),
				},
				{
					tableau: tableauColonneLigne([`\\text{Prix en €}`, tex_prix(prix[0]), tex_prix(prix[1]), tex_prix(prix[2])], [`\\text{Remise en pourcentage}`, `\\text{Montant de la remise en €}`, `\\text{Nouveau prix en €}`], [
						remises[0].str, remises[1].str, remises[2].str,
						tex_prix(prix[0] * remises[0].nb / 100), '', '',
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), '', '',
					]),
					tableau_corr: tableauColonneLigne([`\\text{Prix en €}`, tex_prix(prix[0]), tex_prix(prix[1]), tex_prix(prix[2])], [`\\text{Remise en pourcentage}`, `\\text{Montant de la remise en €}`, `\\text{Nouveau prix en €}`], [
						remises[0].str, remises[1].str, remises[2].str,
						tex_prix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[2] * remises[2].nb / 100)}`),
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[1] - prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[2] - prix[2] * remises[2].nb / 100)}`),
					]),
				},
				{
					tableau: tableauColonneLigne([`\\text{Prix en €}`, tex_prix(prix[0]), tex_prix(prix[1]), tex_prix(prix[2]), tex_prix(prix[3])], [`\\text{Remise en pourcentage}`, `\\text{Montant de la remise en €}`, `\\text{Nouveau prix en €}`], [
						remises[0].str, remises[1].str, remises[2].str, remises[3].str,
						tex_prix(prix[0] * remises[0].nb / 100), '', '', '',
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), '', '', '',
					]),
					tableau_corr: tableauColonneLigne([`\\text{Prix en €}`, tex_prix(prix[0]), tex_prix(prix[1]), tex_prix(prix[2]), tex_prix(prix[3])], [`\\text{Remise en pourcentage}`, `\\text{Montant de la remise en €}`, `\\text{Nouveau prix en €}`], [
						remises[0].str, remises[1].str, remises[2].str, remises[3].str,
						tex_prix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[2] * remises[2].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[3] * remises[3].nb / 100)}`),
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[1] - prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[2] - prix[2] * remises[2].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[3] - prix[3] * remises[3].nb / 100)}`),
					]),
				},
				{
					tableau: tableauColonneLigne([`\\text{Prix en €}`, tex_prix(prix[0]), tex_prix(prix[1]), tex_prix(prix[2]), tex_prix(prix[3]), tex_prix(prix[4])], [`\\text{Remise en pourcentage}`, `\\text{Montant de la remise en €}`, `\\text{Nouveau prix en €}`], [
						remises[0].str, remises[1].str, remises[2].str, remises[3].str, remises[4].str,
						tex_prix(prix[0] * remises[0].nb / 100), '', '', '', '',
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), '', '', '', '',
					]),
					tableau_corr: tableauColonneLigne([`\\text{Prix en €}`, tex_prix(prix[0]), tex_prix(prix[1]), tex_prix(prix[2]), tex_prix(prix[3]), tex_prix(prix[4])], [`\\text{Remise en pourcentage}`, `\\text{Montant de la remise en €}`, `\\text{Nouveau prix en €}`], [
						remises[0].str, remises[1].str, remises[2].str, remises[3].str, remises[4].str,
						tex_prix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[2] * remises[2].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[3] * remises[3].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[4] * remises[4].nb / 100)}`),
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[1] - prix[1] * remises[1].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[2] - prix[2] * remises[2].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[3] - prix[3] * remises[3].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[4] - prix[4] * remises[4].nb / 100)}`),
					]),
				},
				{
					tableau: [],
					tableau_corr: [],
				},
			];

			let corrections;
			if (this.sup3) {
				let interieur_tableau_tableau_corr = choice([
					{
						tableau_case_4: [remises[0].str, remises[1].str, '', '',
						tex_prix(prix[0] * remises[0].nb / 100), '', `${tex_prix(prix[0] * remises[2].nb / 100)}`, '',
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), '', '', `${tex_prix(prix[0] - prix[0] * remises[3].nb / 100)}`],
						tableau_case_4_corr: [remises[0].str, remises[1].str, miseEnEvidence(remises[2].str), miseEnEvidence(remises[3].str),
						tex_prix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[0] * remises[1].nb / 100)}`), `${tex_prix(prix[0] * remises[2].nb / 100)}`, miseEnEvidence(`${tex_prix(prix[0] * remises[3].nb / 100)}`),
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[1].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[2].nb / 100)}`), `${tex_prix(prix[0] - prix[0] * remises[3].nb / 100)}`],
						corrections: `${justifCorrType('pourcentage', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('remise', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('nouveau_prix', remises[0], remises[3], prix[0])}`
					},
					{
						tableau_case_4: [remises[0].str, remises[1].str, '', '',
						tex_prix(prix[0] * remises[0].nb / 100), '', '', `${tex_prix(prix[0] * remises[3].nb / 100)}`,
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), '', `${tex_prix(prix[0] - prix[0] * remises[2].nb / 100)}`, ''],
						tableau_case_4_corr: [remises[0].str, remises[1].str, miseEnEvidence(remises[2].str), miseEnEvidence(remises[3].str),
						tex_prix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[0] * remises[1].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[0] * remises[2].nb / 100)}`), `${tex_prix(prix[0] * remises[3].nb / 100)}`,
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[1].nb / 100)}`), `${tex_prix(prix[0] - prix[0] * remises[2].nb / 100)}`, miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[3].nb / 100)}`)],
						corrections: `${justifCorrType('pourcentage', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('nouveau_prix', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('remise', remises[0], remises[3], prix[0])}`
					},
					{
						tableau_case_4: [remises[0].str, '', remises[2].str, '',
						tex_prix(prix[0] * remises[0].nb / 100), `${tex_prix(prix[0] * remises[1].nb / 100)}`, '', '',
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), '', '', `${tex_prix(prix[0] - prix[0] * remises[3].nb / 100)}`],
						tableau_case_4_corr: [remises[0].str, miseEnEvidence(remises[1].str), remises[2].str, miseEnEvidence(remises[3].str),
						tex_prix(prix[0] * remises[0].nb / 100), `${tex_prix(prix[0] * remises[1].nb / 100)}`, miseEnEvidence(`${tex_prix(prix[0] * remises[2].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[0] * remises[3].nb / 100)}`),
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[1].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[2].nb / 100)}`), `${tex_prix(prix[0] - prix[0] * remises[3].nb / 100)}`],
						corrections: `${justifCorrType('remise', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('pourcentage', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('nouveau_prix', remises[0], remises[3], prix[0])}`
					},
					{
						tableau_case_4: [remises[0].str, '', '', remises[3].str,
						tex_prix(prix[0] * remises[0].nb / 100), `${tex_prix(prix[0] * remises[1].nb / 100)}`, '', '',
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), '', `${tex_prix(prix[0] - prix[0] * remises[2].nb / 100)}`, ''],
						tableau_case_4_corr: [remises[0].str, miseEnEvidence(remises[1].str), miseEnEvidence(remises[2].str), remises[3].str,
						tex_prix(prix[0] * remises[0].nb / 100), `${tex_prix(prix[0] * remises[1].nb / 100)}`, miseEnEvidence(`${tex_prix(prix[0] * remises[2].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[0] * remises[3].nb / 100)}`),
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[1].nb / 100)}`), `${tex_prix(prix[0] - prix[0] * remises[2].nb / 100)}`, miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[3].nb / 100)}`)],
						corrections: `${justifCorrType('remise', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('nouveau_prix', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('pourcentage', remises[0], remises[3], prix[0])}`
					},
					{
						tableau_case_4: [remises[0].str, '', remises[2].str, '',
						tex_prix(prix[0] * remises[0].nb / 100), '', '', `${tex_prix(prix[0] * remises[3].nb / 100)}`,
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), `${tex_prix(prix[0] - prix[0] * remises[1].nb / 100)}`, '', ''],
						tableau_case_4_corr: [remises[0].str, miseEnEvidence(remises[1].str), remises[2].str, miseEnEvidence(remises[3].str),
						tex_prix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[0] * remises[1].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[0] * remises[2].nb / 100)}`), `${tex_prix(prix[0] * remises[3].nb / 100)}`,
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), `${tex_prix(prix[0] - prix[0] * remises[1].nb / 100)}`, miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[2].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[3].nb / 100)}`)],
						corrections: `${justifCorrType('nouveau_prix', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('pourcentage', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('remise', remises[0], remises[3], prix[0])}`
					},
					{
						tableau_case_4: [remises[0].str, '', '', remises[3].str,
						tex_prix(prix[0] * remises[0].nb / 100), '', `${tex_prix(prix[0] * remises[2].nb / 100)}`, '',
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), `${tex_prix(prix[0] - prix[0] * remises[1].nb / 100)}`, '', ''],
						tableau_case_4_corr: [remises[0].str, miseEnEvidence(remises[1].str), miseEnEvidence(remises[2].str), remises[3].str,
						tex_prix(prix[0] * remises[0].nb / 100), miseEnEvidence(`${tex_prix(prix[0] * remises[1].nb / 100)}`), `${tex_prix(prix[0] * remises[2].nb / 100)}`, miseEnEvidence(`${tex_prix(prix[0] * remises[3].nb / 100)}`),
						tex_prix(prix[0] - prix[0] * remises[0].nb / 100), `${tex_prix(prix[0] - prix[0] * remises[1].nb / 100)}`, miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[2].nb / 100)}`), miseEnEvidence(`${tex_prix(prix[0] - prix[0] * remises[3].nb / 100)}`)],
						corrections: `${justifCorrType('nouveau_prix', remises[0], remises[1], prix[0])}<br><br>${justifCorrType('remise', remises[0], remises[2], prix[0])}<br><br>${justifCorrType('pourcentage', remises[0], remises[3], prix[0])}`
					}
				]);

				let tableau_case_4 = tableauColonneLigne([`\\text{Prix en €}`, tex_prix(prix[0]), tex_prix(prix[0]), tex_prix(prix[0]), tex_prix(prix[0])], [`\\text{Remise en pourcentage}`, `\\text{Montant de la remise en €}`, `\\text{Nouveau prix en €}`],
					interieur_tableau_tableau_corr.tableau_case_4
				);
				let tableau_case_4_corr = tableauColonneLigne([`\\text{Prix en €}`, tex_prix(prix[0]), tex_prix(prix[0]), tex_prix(prix[0]), tex_prix(prix[0])], [`\\text{Remise en pourcentage}`, `\\text{Montant de la remise en €}`, `\\text{Nouveau prix en €}`],
					interieur_tableau_tableau_corr.tableau_case_4_corr
				);
				if (this.correctionDetaillee) {
					corrections = interieur_tableau_tableau_corr.corrections;
					corrections += `<br><br>D'où le tableau complété :<br><br>`;
				} else {
					corrections = ``;
				};
				situations[4].tableau = tableau_case_4;
				situations[4].tableau_corr = tableau_case_4_corr;
			} else {
				let type_corr;
				if (this.exo == '5N11-1') {
					type_corr = 'pourcentage';
				};
				if (this.exo == '5N11-2') {
					type_corr = 'pourcentage_constant';
				};
				if (this.sup2 == 1 && this.correctionDetaillee) {
					corrections = `${justifCorrType(type_corr, remises[0], remises[1], prix[1])}`;
					corrections += `<br><br>D'où le tableau complété :<br><br>`;
				} else if (this.sup2 == 2 && this.correctionDetaillee) {
					corrections = `${justifCorrType(type_corr, remises[0], remises[1], prix[1])}<br><br>${justifCorrType(type_corr, remises[0], remises[2], prix[2])}`;
					corrections += `<br><br>D'où le tableau complété :<br><br>`;
				} else if (this.sup2 == 3 && this.correctionDetaillee) {
					corrections = `${justifCorrType(type_corr, remises[0], remises[1], prix[1])}<br><br>${justifCorrType(type_corr, remises[0], remises[2], prix[2])}<br><br>${justifCorrType(type_corr, remises[0], remises[3], prix[3])}`;
					corrections += `<br><br>D'où le tableau complété :<br><br>`;
				} else if (this.sup2 == 4 && this.correctionDetaillee) {
					corrections = `${justifCorrType(type_corr, remises[0], remises[1], prix[1])}<br><br>${justifCorrType(type_corr, remises[0], remises[2], prix[2])}<br><br>${justifCorrType(type_corr, remises[0], remises[3], prix[3])}<br><br>${justifCorrType(type_corr, remises[0], remises[4], prix[4])}`;
					corrections += `<br><br>D'où le tableau complété :<br><br>`;
				} else {
					corrections = ``;
				};
			};

			let enonces = [];
			for (let k = 0; k < situations.length; k++) {
				enonces.push({
					enonce: `					
					${situations[k].tableau}	
					`,
					question: ``,
					correction: `
					${corrections}
					${situations[k].tableau_corr}
					`
				});
			};

			// autant de case que d'elements dans le tableau des situations
			switch (listeTypeDeQuestions[i]) {
				case 0:
					texte = `${enonces[0].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
						texte += `             `;
						texteCorr = ``;
					} else {
						texteCorr = `${enonces[0].correction}`;
					};
					break;
				case 1:
					texte = `${enonces[1].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
						texte += `             `;
						texteCorr = ``;
					} else {
						texteCorr = `${enonces[1].correction}`;
					};
					break;
				case 2:
					texte = `${enonces[2].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`;
						texte += `             `;
						texteCorr = ``;
					} else {
						texteCorr = `${enonces[2].correction}`;
					};
					break;
				case 3:
					texte = `${enonces[3].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`;
						texte += `             `;
						texteCorr = ``;
					} else {
						texteCorr = `${enonces[3].correction}`;
					};
					break;
				case 4:
					texte = `${enonces[4].enonce}`;
					if (this.debug) {
						texte += `<br>`;
						texte += `<br> =====CORRECTION======<br>${enonces[4].correction}`;
						texte += `             `;
						texteCorr = ``;
					} else {
						texteCorr = `${enonces[4].correction}`;
					};
					break;
			};

			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);

	};
	if (this.exo == '5N11-1') { // prix constant
		this.besoinFormulaireNumerique = ['Le coefficient entre les pourcentages', 2, "1 : est entier\n2 : est décimal"];
		this.besoinFormulaire3CaseACocher = ["Modulation de ce qui est demandé"];
		this.besoinFormulaire2Numerique = ['Nombre de colonnes à remplir (fixé à 3 lorsque la case ci-dessous est cochée)', 4, "1 : une colonne\n2 : deux colonnes\n3 : trois colonnes\n4 : quatre colonnes"];
	};
	if (this.exo == '5N11-2') { // pourcentage
		this.besoinFormulaire2Numerique = ['Nombre de colonnes à remplir', 4, "1 : une colonne\n2 : deux colonnes\n3 : trois colonnes\n4 : quatre colonnes"];
	};



}
;
