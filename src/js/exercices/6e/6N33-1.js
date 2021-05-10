import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,calcul,texNombrec,texNombre,texFraction} from '../../modules/outils.js'
const Algebrite = require('algebrite')

export const amcReady = true
export const amcType = 4 // type de question AMC

export const titre = 'Calculer le pourcentage d’un nombre de tête'

/**
 * Calculer 10, 20, 30, 40 ou 50% d'un nombre
 * @Auteur Rémi Angot + Jean-claude Lhote
 * 6N33-1
 * Ajout niveau 2 + 1 correction différente cgrolleau 03/2021
 */
export default function Pourcentage_d_un_nombre() {

  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.nbQuestions = 5;
  this.consigne = "Calculer";
  this.spacing = 2;
  this.spacingCorr = 3.5;
  this.nbCols = 2;
  this.nbColsCorr = 1;
  this.sup = 1;
  this.nouvelleVersion = function () {
	this.qcm=['6N33-1',[],"Calculer le pourcentage d'un nombre de tête",4,{}]
let reponse;
    var liste_pourcentages = [];
	this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    for (
      let i = 0, p, n, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;
    ) {
		switch (parseInt(this.sup)) { //niveu de difficulté.
			case 1: 
				liste_pourcentages = [10, 20, 30, 40, 50];
				n = choice([randint(2, 9), randint(2, 9) * 10, randint(1, 9) * 10 + randint(1, 2)]);
				break;
			case 2: //niveau 2 : ajout de 25%, 60% et 90% + possibilité d'avoir n'importe quel multiple de 4 entre 4 et 200
				liste_pourcentages = [10, 20, 25, 30, 40, 50, 60, 90];
				n = choice([randint(2, 9), randint(2, 9) * 10, randint(1, 9) * 10 + randint(1, 2), randint(1, 50)*4 ]); 
				break;
		}
		p = choice(liste_pourcentages);
		texte = `$${p}~\\%~\\text{de }${n}$`;
		switch (p) {
			case 50 :
				texteCorr = `$${p}~\\%~\\text{de }${n}=${n}\\div${2} = 
					${texNombre(Algebrite.eval(n / 2))}$`; // calcul de n/2 si p = 50%
			break;
			case 25 :
				texteCorr = `$${p}~\\%~\\text{de }${n}=${n}\\div${4} = 
					${texNombre(Algebrite.eval(n / 4))}$`; // calcul de n/4 si p = 25%
			break;
			default :
				texteCorr = `$${p}~\\%~\\text{de }${n}=${texFraction(
					p,
					100
					)}\\times${n}=(${p}\\times${n})\\div100=${texNombre(
					p * n
				)}\\div100=${texNombre(Algebrite.eval((p * n) / 100))}$`;
				if (this.sup2) {
					texteCorr += `<br>$${p}~\\%~\\text{de }${n}=${texFraction(
					p,
					100
					)}\\times${n}=(${n}\\div100)\\times${p}=${texNombrec(
					calcul(n / 100)
					)}\\times${p}=${texNombre(Algebrite.eval((p * n) / 100))}$`;
					texteCorr += `<br>$${p}~\\%~\\text{de }${n}=${texFraction(
						p,
						100
						)}\\times${n}=${texNombrec(calcul(p / 100))}\\times${n}=${texNombre(
						Algebrite.eval((p * n) / 100)
						)}$`;
					if (p === 60) {
						texteCorr += `<br>$${p}~\\%~\\text{de }${n}$ c'est $50~\\%~\\text{de }${n}$
						plus $10 ~\\%~\\text{de }${n} $ soit la moitié de $ ${n} \\text{ plus } 10 ~\\%~\\text{de }${n} $ :
						$${p}~\\%~\\text{de }${n}=${n}\\div${2} + ${n}\\div${10} =  ${texNombre(calcul(n * 0.6))}$`;
					} else if (p === 90) {
						texteCorr += `<br>$${p}~\\%~\\text{de }${n}$ c'est $${n}$
						moins $10 ~\\%~\\text{de }${n} $ :
						$${p}~\\%~\\text{de }${n}=${n} - ${n}\\div${10} =  ${texNombre(calcul(n * 0.9))}$`;
					} else if (p > 10) {
						texteCorr += `<br>$${p}~\\%~\\text{de }${n}$ c'est $ ${calcul(p/10)} $ fois $ 10 ~\\%~\\text{de }${n} $ :
						$${p}~\\%~\\text{de }${n}= ${calcul(p/10)} \\times ${n}\\div${10} =  ${texNombre(calcul((p * n) / 100))}$`;
					}
				}
      }
	  let reponse=calcul(n*p/100)
      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
		this.qcm[1].push([texte, [texteCorr,reponse], {digits:3,decimals:1,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}])
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = [
    "Niveau de difficulté",
    2,
    "1 : pourcentages 10, 20, 30, 40, 50 \n 2: pourcentages 10, 20, 25, 30, 40, 50, 60, 90",
  ];
  this.besoinFormulaire2CaseACocher = ["Plusieurs méthodes"];
}
