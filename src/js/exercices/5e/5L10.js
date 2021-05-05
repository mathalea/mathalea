import Exercice from '../ClasseExercice.js';
import {shuffle2tableaux,listeQuestionsToContenu,randint,enleveElement,choice,range1,combinaisonListes,tex_fraction} from '../../modules/outils.js'

export const amcReady = true

export const titre = 'Écrire une expression littérale'

/**
* Écrire une expression littérale à partir d'une phrase :
* * Double, triple, moitié, tiers, quart
* * Successeur, prédécesseur
* * Carré, cube, opposé, inverse
* * Somme, produit, quotient
* * Nombre pair, nombre impair, multiple d'un nombre donné
* @Auteur Rémi Angot
* 5L10
*/
export default function Ecrire_une_expression_litterale() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "";
	this.nbQuestions = 4;
	this.nbCols = 1;
	this.nbColsCorr = 1;
	this.qcmDisponible=true
	this.modeQcm=false

	this.nouvelleVersion = function () {
		this.qcm=['5L10',[],"Écrire une expression littérale",2,{ordered:false,lastChoices:0}]
		let espace =``;
		if (sortieHtml) {
		  espace = `&emsp;`;
		} else {
		  espace = `\\qquad`;
		}
		let tabrep,tabicone

		this.listeQuestions = []; // Liste de questions
		this.listeCorrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = range1(17);
		let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

		for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
			let lettres_disponibles = ['x', 'y', 'z', 't', 'a', 'b', 'c', 'n', 'm'];
			let x = choice(lettres_disponibles);
			enleveElement(lettres_disponibles, x);
			let y = choice(lettres_disponibles);
			let k = randint(2, 10);
			switch (listeTypeDeQuestions[i]) {
				case 1: // 2x
					texte = `Exprimer le double de $${x}$ en fonction de $${x}$.`;
					texteCorr = `Le double de $${x}$ se note : $2${x}$.`;
					tabrep=[`$2\\times ${x}$`,`$2${x}$`,`$${x}+${x}$`,`$2+${x}$`,`$${x}^2$`,`$${x}3$`]
					tabicone=[1,1,1,0,0,0]
					break;
				case 2: // 3x
					texte = `Exprimer le triple de $${x}$  en fonction de $${x}$.`;
					texteCorr = `Le triple de $${x}$  se note : $3${x}$.`;
					tabrep=[`$3\\times ${x}$`,`$3${x}$`,`$${x}+2${x}$`,`$3+${x}$`,`$${x}^3$`,`$${x}3$`]
					tabicone=[1,1,1,0,0,0]
					break;
				case 3: // x/2
					texte = `Exprimer la moitié de $${x}$ en fonction de $${x}$.`;
					texteCorr = `La moitié de $${x}$  se note :  $${tex_fraction(x, 2)}=${x}\\div 2=0,5${x}$.`;
					tabrep=[`$${x}\\div 2$`,`$\\dfrac{${x}}{2}$`,`$0,5${x}$`,`$${x}-2$`,`$\\dfrac{1}{2}+${x}$`,`$${x}\\div 0,5$`]
					tabicone=[1,1,1,0,0,0]
					break;
				case 4: // x/4
					texte = `Exprimer le quart de $${x}$  en fonction de $${x}$.`;
					texteCorr = `Le quart de $${x}$  se note :  $${tex_fraction(x, 4)}=${x}\\div 4=0,25${x}$.`;
					tabrep=[`$${x}\\div 4$`,`$\\dfrac{${x}}{4}$`,`$0,25${x}$`,`$${x}-\\dfrac{1}{4}$`,`$\\dfrac{1}{4}+${x}$`,`$${x}\\div 0,25$`]
					tabicone=[1,1,1,0,0,0]
					break;
				case 5: // x+1
					texte = `$${x}$ étant un nombre entier, exprimer l'entier suivant en fonction de $${x}$.`;
					texteCorr = `Le successeur de $${x}$ se note :  $${x}+1$.`;
					tabrep=[`$1+${x}$`,`$${x}+1$`,`$${x}+${x}$`,`$2${x}$`,`$${x}-1$`,`$${x}2$`]
					tabicone=[1,1,0,0,0,0]
					break;
				case 6: // x-1
					texte = `$${x}$ étant un nombre entier, exprimer l'entier précédent en fonction de $${x}$.`;
					texteCorr = `Le prédecesseur de $${x}$  se note :  $${x}-1$.`;
					tabrep=[`$${x}-1$`,`$1-${x}$`,`$${x}-${x}$`,`$-1${x}$`,`$${x}+(-1)$`,`$${x}+1$`]
					tabicone=[1,0,0,0,1,0]
					break;
				case 6: // x^2
					texte = `Exprimer le carré de $${x}$  en fonction de $${x}$.`;
					texteCorr = `Le carré de $${x}$  se note : $${x}^2$.`;
					tabrep=[`$${x}${x}$`,`$${x}\\times ${x}$`,`$${x}^2$`,`$${x}2$`,`$2${x}$`,`$${x}+2$`]
					tabicone=[1,1,1,0,0,0]					
					break;
				case 7: // x^3
					texte = `Exprimer le cube de $${x}$  en fonction de $${x}$.`;
					texteCorr = `Le cube de $${x}$  se note : $${x}^3$.`;
					tabrep=[`$${x}${x}${x}$`,`$${x}\\times ${x}\\times ${x}$`,`$${x}^3$`,`$${x}3$`,`$3${x}$`,`$${x}+3$`]
					tabicone=[1,1,1,0,0,0]					
					break;
				case 8: // -x
					texte = `Exprimer l'opposé de $${x}$  en fonction de $${x}$.`;
					texteCorr = `L'opposé de $${x}$  se note : $-${x}$.`;
					tabrep=[`$-${x}$`,`$-1\\times ${x}$`,`$${x}-1$`,`$\\dfrac{1}{${x}}$`,`$${x}$`,`$1-${x}$`]
					tabicone=[1,1,0,0,0,0]					
					break;
				case 9: // 1/x
					texte = `Exprimer l'inverse de $${x}$  en fonction de $${x}$.`;
					texteCorr = `L'inverse de $${x}$ se note : $${tex_fraction(1, x)}$.`;
					tabrep=[`$-${x}$`,`$-1\\times ${x}$`,`$${x}-1$`,`$\\dfrac{1}{${x}}$`,`$${x}$`,`$1-${x}$`]
					tabicone=[0,0,0,1,0,0]					
					break;
				case 10: // x+k
					texte = `Exprimer la somme de $${x}$ et ${k} en fonction de $${x}$.`;
					texteCorr = `La somme de $${x}$ et ${k} se note : $${x}+${k}$.`;
					tabrep=[`$${k}+${x}$`,`$${x}+${k}$`,`$${k}${x}$`,`$${x}${k}$`,`$${x}-${k}$`,`$${k}\\times ${x}$`]
					tabicone=[1,1,0,0,0,0]	
					break;
				case 11: // kx
					texte = `Exprimer le produit de $${x}$  par ${k} en fonction de $${x}$.`;
					texteCorr = `Le produit de $${x}$ par ${k} se note : $${k}${x}$.`;
					tabrep=[`$${k}+${x}$`,`$${x}+${k}$`,`$${k}${x}$`,`$${x}${k}$`,`$${x}-${k}$`,`$${k}\\times ${x}$`]
					tabicone=[0,0,1,0,0,1]	
					break;
				case 12: // x/k
					texte = `Exprimer le quotient de $${x}$ par ${k} en fonction de $${x}$.`;
					texteCorr = `Le quotient de $${x}$ par ${k} se note : $${tex_fraction(x, k)}$.`;
					tabrep=[`$${k}\\div ${x}$`,`$${x}\\div ${k}$`,`$\\dfrac{${x}}{${k}}$`,`$${x}\\times ${k}$`,`$${x}-${k}$`,`$${k}\\times ${x}$`]
					tabicone=[0,1,1,0,0,0]
					break;
				case 13: // k/x
					texte = `Exprimer le quotient de ${k} par $${x}$ en fonction de $${x}$.`;
					texteCorr = `Le quotient de ${k} par $${x}$ se note : $${tex_fraction(k, x)}$.`;
					tabrep=[`$${x}\\div ${k}$`,`$${k}\\div ${x}$`,`$\\dfrac{${k}}{${x}}$`,`$${k}\\times ${x}$`,`$${k}-${x}$`,`$${x}\\times ${k}$`]
					tabicone=[0,1,1,0,0,0]
					break;
				case 14: //xy
					texte = `Comment se note le produit de $${x}$ par $${y}$ ?`;
					texteCorr = `Le produit de $${x}$ par $${y}$ se note $${x}${y}$.`;
					tabrep=[`$${y}+${x}$`,`$${x}+${y}$`,`$${y}${x}$`,`$${x}${y}$`,`$${x}-${y}$`,`$${y}\\times ${x}$`]
					tabicone=[0,0,1,1,0,1]	
					break;
				case 15: //pair
					texte = `Écrire une expression littérale qui permet de représenter un nombre pair.`;
					texteCorr = `Un nombre pair peut s'écrire sous la forme $2n$ avec $n$ un entier naturel.`;
					tabrep=[`$2n$`,`$2(n+1)$`,`$n+2$`,`$n-2$`,`$n\\div 2$`,`$n^2$`]
					tabicone=[1,1,0,0,0,0]	
					break;
				case 16: //impair
					texte = `Écrire une expression littérale qui permet de représenter un nombre impair.`;
					texteCorr = `Un nombre impair peut s'écrire sous la forme $2n+1$ avec $n$ un entier naturel.`;
					tabrep=[`$2n+1$`,`$n+1$`,`$n+3$`,`$3n$`,`$n-1$`,`$n+7$`]
					tabicone=[1,0,0,0,0,0]
					break;
				case 17: //multiple de k
					texte = `Écrire une expression littérale qui permet de représenter un multiple de ${k}.`;
					texteCorr = `Un multiple de ${k} peut s'écrire sous la forme $${k}n$ avec $n$ un entier naturel.`;
					tabrep=[`$${k}n$`,`$${k}\\times n$`,`$${k}+n$`,`$${k}-n$`,`$\\dfrac{${k}}{n}$`,`$${x}-${y}$`]
					tabicone=[1,1,0,0,0,0]	
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
	//this.besoinFormulaireCaseACocher = ["Uniquement la lettre $n$."]
}
