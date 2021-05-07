import { ecritureParentheseSiNegatif } from '../../modules/outils.js';
import Exercice from '../ClasseExercice.js';
import {shuffle2tableaux,listeQuestionsToContenu,randint,combinaisonListes,itemize} from '../../modules/outils.js'

export const amcReady = true

export const titre = 'Traduire un programme de calcul par une expression littérale'

/**
* Traduire un programme de calcul par une expression littérale de la forme ax+b après simplification
* @Auteur Rémi Angot
* 5L10-2
*/
export default function Traduire_un_programme_de_calcul() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "";
	this.nbQuestions = 2;
	this.nbCols = 2;
	this.nbColsCorr = 1;
	this.spacingCorr = 1;
	this.spacing = 1;
	this.qcmDisponible=true
	this.modeQcm=false

	this.nouvelleVersion = function () {
		this.qcm=['5L10-2',[],"Traduire un programme de calcul par une expression littérale",1,{ordered:false,lastChoices:0}];
		let espace =``;
		if (sortieHtml) {
		  espace = `&emsp;`;
		} else {
		  espace = `\\qquad`;
		}
		let tabrep,tabicone
		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1, 2, 3, 4, 5, 6];
		let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			let a = randint(4, 11);
			let b = randint(2, 11);
			let c = randint(2, 11);
			let d = randint(2, 5);
			switch (listeTypeDeQuestions[i]) {
				case 1: // (x+a)*b+c
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Ajoute ${a}`, `Multiplie par ${b}`, `Ajoute ${c}`]);
					texte += `Si on note $x$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texteCorr = `$x\\xrightarrow{+${a}} x+${a}\\xrightarrow{\\times  ${b}}(x+${a})\\times  ${b}=${b}x+${a * b}\\xrightarrow{+${c}}${b}x+${a * b + c}$`;
					texteCorr += '<br>';
					texteCorr += `Le résultat du programme est donc $${b}x+${a * b + c}$.`;
					tabrep=[`$${b}x+${a * b + c}$`,`$${b}x+${a + c}$`,`$${b}x+${a*c}$`,`$${b*a}x+${c}$`]
					tabicone=[1,0,0,0]
					break;
				case 2: // (ax+b)*c
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Multiplie par ${c}`]);
					texte += `Si on note $y$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texteCorr = `$y\\xrightarrow{\\times  ${a}} ${a}y\\xrightarrow{+${b}}${a}y+${b} \\xrightarrow{\\times  ${c}}(${a}y+${b})\\times ${c}=${a * c}y+${b * c}$`;
					texteCorr += '<br>';
					texteCorr += `Le résultat du programme est donc $${a * c}y+${b * c}$.`;
					tabrep=[`$${a * c}y+${b * c}$`,`$${a}y+${b * c}$`,`$${b*a}y+${c}$`,`$${b}y+${a*c}$`]
					tabicone=[1,0,0,0]
					break;
				case 3: // ax+b-2x
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Enlève le double du nombre de départ`]);
					texte += `Si on note $a$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texteCorr = `$a\\xrightarrow{\\times  ${a}} ${a}a\\xrightarrow{+${b}}${a}a+${b} \\xrightarrow{-2a}${a}a+${b}-2a=${a - 2}a+${b}$`;
					texteCorr += '<br>';
					texteCorr += `Le résultat du programme est donc $${a - 2}a+${b}$.`;
					tabrep=[`$${a - 2}a+${b}$`,`$${a+b-2}a$`,`$${a}a+${b-2}$`,`$${a+b}-2a$`]
					tabicone=[1,0,0,0]
					break;
				case 4: // ax+b+3x
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Ajoute le triple du nombre de départ`]);
					texte += `Si on note $t$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texteCorr = `$t\\xrightarrow{\\times  ${a}} ${a}t\\xrightarrow{+${b}}${a}t+${b} \\xrightarrow{+3t}${a}t+${b}+3t=${a + 3}t+${b}$`;
					texteCorr += '<br>';
					texteCorr += `Le résultat du programme est donc $${a + 3}t+${b}$.`;
					tabrep=[`$${a + 3}t+${b}$`,`$${a+b+3}t$`,`$${a+b}t+3t$`,`$${a+b}t-3t$`]
					tabicone=[1,0,0,0]

					break;
				case 5: // (ax+b)*c-d
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Multiplie par ${c}`, `Enlève ${d}`]);
					texte += `Si on note $x$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texteCorr = `$x\\xrightarrow{\\times  ${a}} ${a}x\\xrightarrow{+${b}}${a}x+${b} \\xrightarrow{\\times  ${c}}(${a}x+${b})\\times  ${c}=${a * c}x+${b * c}\\xrightarrow{-${d}}${a * c}x+${b * c - d}$`;
					texteCorr += '<br>';
					texteCorr += `Le résultat du programme est donc $${a * c}x+${b * c - d}$.`;
					tabrep=[`$${a * c}x+${b * c - d}$`,`$${a}x+${ecritureParentheseSiNegatif(b * c - d)}$`,`$${a+b}x+${ecritureParentheseSiNegatif(c - d)}$`,`$${a+b*c}x-${d}$`]
					tabicone=[1,0,0,0]

					break;
				case 6: // (ax+b)*c+x
					texte = `Voici un programme de calcul : \n`;
					texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Multiplie par ${c}`, `Ajoute le nombre de départ`]);
					texte += `Si on note $y$ le nombre de départ, quel est le résultat du programme de calcul ?`;
					texteCorr = `$y\\xrightarrow{\\times  ${a}} ${a}y\\xrightarrow{+${b}}${a}y+${b} \\xrightarrow{\\times  ${c}}(${a}y+${b})\\times  ${c}=${a * c}y+${b * c}\\rightarrow ${a * c}y+${b * c}+y=${a * c + 1}y+${b * c}$`;
					texteCorr += '<br>';
					texteCorr += `Le résultat du programme est donc $${a * c + 1}y+${b * c}$.`;
					tabrep=[`$${a * c + 1}y+${b * c}$`,`$${a+1}y+${b * c}$`,`$${a}y+${c}$`,`$${a+b+c+1}y$`]
					tabicone=[1,0,0,0]
					break;
			}
			if (this.modeQcm&&!mathalea.sortieAMC) {
				texteCorr=''
				texte+=`<br>  Réponses possibles : ${espace}  `
				shuffle2tableaux(tabrep, tabicone);
				for (let i=0; i<tabrep.length; i++) {
				  texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
				 if (tabicone[i]==1) {
				   texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
				 } else {
				   texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
				 }
			   }
			  }

			if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
				if (est_diaporama) {
					texte = texte.replace(', quel est le résultat du programme de calcul ?', ',<br> quel est le résultat de ce programme ?');
				}
				if (!sortieHtml && i == 0) { texte = `\\setlength\\itemsep{1em}` + texte; }; // espacement entre les questions
				this.listeQuestions.push(texte);
				this.listeCorrections.push(texteCorr);
				this.qcm[1].push([`${texte}\n`,
				tabrep,
				tabicone])
				i++;
			}
			cpt++;
		}
		listeQuestionsToContenu(this);
	};
	//this.besoinFormulaireCaseACocher = true;
}
