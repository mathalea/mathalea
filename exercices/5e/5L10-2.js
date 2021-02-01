import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,itemize} from "/modules/outils.js"


/**
* Traduire un programme de calcul par une expression littérale de la forme ax+b après simplification
* @Auteur Rémi Angot
* 5L10-2
*/
export default function Traduire_un_programme_de_calcul() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Traduire un programme de calcul par une expression littérale";
	this.consigne = "";
	this.nb_questions = 2;
	this.nb_cols = 2;
	this.nb_cols_corr = 1;
	this.spacing_corr = 1;
	this.spacing = 1;

	this.nouvelle_version = function () {
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6];
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
			let a = randint(4, 11);
			let b = randint(2, 11);
			let c = randint(2, 11);
			let d = randint(2, 5);
			switch (liste_type_de_questions[i]) {
				case 1: // (x+a)*b+c
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Ajoute ${a}`, `Multiplie par ${b}`, `Ajoute ${c}`]);
					texte += `Si on note $x$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texte_corr = `$x\\xrightarrow{+${a}} x+${a}\\xrightarrow{\\times  ${b}}(x+${a})\\times  ${b}=${b}x+${a * b}\\xrightarrow{+${c}}${b}x+${a * b + c}$`;
					texte_corr += '<br>';
					texte_corr += `Le résultat du programme est donc $${b}x+${a * b + c}$.`;
					break;
				case 2: // (ax+b)*c
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Multiplie par ${c}`]);
					texte += `Si on note $y$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texte_corr = `$y\\xrightarrow{\\times  ${a}} ${a}y\\xrightarrow{+${b}}${a}y+${b} \\xrightarrow{\\times  ${c}}(${a}y+${b})\\times ${c}=${a * c}y+${b * c}$`;
					texte_corr += '<br>';
					texte_corr += `Le résultat du programme est donc $${a * c}y+${b * c}$.`;
					break;
				case 3: // ax+b-2x
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Enlève le double du nombre de départ`]);
					texte += `Si on note $a$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texte_corr = `$a\\xrightarrow{\\times  ${a}} ${a}a\\xrightarrow{+${b}}${a}a+${b} \\xrightarrow{-2a}${a}a+${b}-2a=${a - 2}a+${b}$`;
					texte_corr += '<br>';
					texte_corr += `Le résultat du programme est donc $${a - 2}a+${b}$.`;
					break;
				case 4: // ax+b+3x
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Ajoute le triple du nombre de départ`]);
					texte += `Si on note $t$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texte_corr = `$t\\xrightarrow{\\times  ${a}} ${a}t\\xrightarrow{+${b}}${a}t+${b} \\xrightarrow{+3t}${a}t+${b}+3t=${a + 3}t+${b}$`;
					texte_corr += '<br>';
					texte_corr += `Le résultat du programme est donc $${a + 3}t+${b}$.`;
					break;
				case 5: // (ax+b)*c-d
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Multiplie par ${c}`, `Enlève ${d}`]);
					texte += `Si on note $x$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texte_corr = `$x\\xrightarrow{\\times  ${a}} ${a}x\\xrightarrow{+${b}}${a}x+${b} \\xrightarrow{\\times  ${c}}(${a}x+${b})\\times  ${c}=${a * c}x+${b * c}\\xrightarrow{-${d}}${a * c}x+${b * c - d}$`;
					texte_corr += '<br>';
					texte_corr += `Le résultat du programme est donc $${a * c}x+${b * c - d}$.`;
					break;
				case 6: // (ax+b)*c+x
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Multiplie par ${c}`, `Ajoute le nombre de départ`]);
					texte += `Si on note $y$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texte_corr = `$y\\xrightarrow{\\times  ${a}} ${a}y\\xrightarrow{+${b}}${a}y+${b} \\xrightarrow{\\times  ${c}}(${a}y+${b})\\times  ${c}=${a * c}y+${b * c}\\rightarrow ${a * c}y+${b * c}+y=${a * c + 1}y+${b * c}$`;
					texte_corr += '<br>';
					texte_corr += `Le résultat du programme est donc $${a * c + 1}y+${b * c}$.`;
					break;
			}


			if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				if (est_diaporama) {
					texte = texte.replace(', quel est le résultat du programme de calcul ?', ',<br> quel est le résultat de ce programme ?');
				}
				if (!sortie_html && i == 0) { texte = `\\setlength\\itemsep{1em}` + texte; }; // espacement entre les questions
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	};
	//this.besoin_formulaire_case_a_cocher = true;
}
