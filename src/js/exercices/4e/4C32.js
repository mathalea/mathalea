import { machine_maths_video } from '../../modules/outils.js';
import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,calcul,texNombrec,texNombre} from '../../modules/outils.js'

export const titre = 'Notation scientifique'

/**
 * Ecrire un nombre décimal en notation scientifique et inversement
 * @Auteur Jean-Claude Lhote
 * 4C32
 */

export default function Notation_scientifique() {
  Exercice.call(this)
  this.sup = 1;
  this.sup2 = 1;
  this.titre = titre
  this.nbCols = 1;
  this.nbColsCorr = 1;
  this.nbQuestions = 5
  this.qcm = ['4C32', [], 'Notation scientifique',4]

 			/********************************************************************/
      /** Type 4 : questionmultx avec AMCnumericChoices */
			// Dans ce cas, le tableau des booléens comprend les renseignements nécessaires pour paramétrer \AMCnumericCoices
			// {int digits,int decimals,bool signe,int exposant_nb_chiffres,bool exposant_signe,int approx}
			// La correction est dans tabQCM[1][0] et la réponse numlérique est dans tabQCM[1][1]
			/********************************************************************/

  this.nouvelleVersion = function () {
    this.qcm[1]=[]
    let reponse
    if (this.sup == 1) this.consigne = `Donner l\'écriture scientifique des nombres suivants.`;
    else this.consigne = `Donner l\'écriture décimale des nombres suivants.`;
    let type_de_questions_disponibles;
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    if (this.sup2 == 1) type_de_questions_disponibles = [0, 0, 0, 1, 1];
    else if (this.sup2 == 2) type_de_questions_disponibles = [0, 1, 1, 2, 2];
    else type_de_questions_disponibles = [2, 2, 3, 3, 3];

    let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions);
    for (let i = 0, texte, texteCorr, mantisse, exp, decimalstring, scientifiquestring, cpt = 0;
      i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 0:
          mantisse = randint(1, 9)
          exp = randint(1, 5)
          break
        case 1:
          mantisse = calcul(randint(11, 99) / 10)
          exp = randint(1, 5)
          break;
        case 2:
          if (randint(0, 1) == 1) mantisse = calcul(randint(111, 999) / 100)
          else mantisse = calcul((randint(1, 9) * 100 + randint(1, 9)) / 100)
          exp = randint(1, 7) * choice([-1, 1])
          break;
        case 3:
          if (randint(0, 1) == 1) mantisse = calcul((randint(1, 9) * 1000 + randint(1, 19) * 5) / 1000)
          else mantisse = calcul(randint(1111, 9999) / 1000)
          exp = randint(3, 7) * choice([-1, 1])
          break;
      }
      reponse=calcul(mantisse * 10 ** exp)
      decimalstring = texNombrec(mantisse * 10 ** exp)
      scientifiquestring = `${texNombre(mantisse)}\\times 10^{${exp}}`
      if (this.sup == 1) {
        texte = `$${decimalstring}$`
        texteCorr = `$${decimalstring} = ${scientifiquestring}$`
      }
      else {
        texteCorr = `$${scientifiquestring} = ${decimalstring}$`
        texte = `$${scientifiquestring}$`

      }
      if (this.listeQuestions.indexOf(texte) == -1) {
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        if (this.sup==1) {
          this.qcm[1].push([`Donner l\'écriture scientifique de ${texte}`, [texteCorr,reponse], {strict:true,vertical:false,digits:listeTypeDeQuestions[i]+3,decimals:listeTypeDeQuestions[i]+1,signe:false,exposant_nb_chiffres:1,exposant_signe:true,approx:0}])
        }
        else {
          this.qcm[1].push([`Donner l\'écriture décimale de ${texte}`, [texteCorr,reponse], {strict:false,vertical:false,digits:2*Math.abs(exp)+2,decimals:Math.abs(exp)+1,signe:false,exposant_nb_chiffres:0,exposant_signe:true,approx:0}])
        }
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = ["Type d\'exercices", 2, "1 : Traduire en notation scientifique\n2 : Traduire en notation décimale"];
  this.besoin_formulaire2_numerique = ["Niveaux de difficulté", 3, "1 : Facile\n2 : Moyen\n3 : Difficile"];
}
