import Operation from '../../modules/operations'
import Exercice from '../ClasseExercice.js'
import {listeQuestionsToContenu,randint,combinaisonListesSansChangerOrdre,texNombre,calcul} from '../../modules/outils.js'

export const amcReady = true
export const amcType = 4 // type de question AMC

export const titre = 'Additions, soustractions et multiplications posées de nombres entiers'

/**
 * Additions, soustractions et multiplications posées de nombres entiers
 *
 * * abcd +efg
 * * abc0-efg
 * * 1abc-def
 * * abc*d0e tables de 2 à 5
 * * abc*de tables de 5 à 9
 * @Auteur Rémi Angot
 * Support des opérations posées en html par Jean-Claude Lhote.
 * Référence 6C10
 */
export default function Additions_soustractions_multiplications_posees() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Poser et effectuer les calculs suivants.";
  this.spacing = 2;
  sortieHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1); //Important sinon les opérations posées ne sont pas jolies
  this.nbQuestions = 5;
  // this.pas_de_version_HMTL=true;
  this.listePackages = "xlop";
  this.tailleDiaporama = 100;


  this.nouvelleVersion = function () {
        /*********************************************************/
// On ajoute cette ligne pour AMC
this.qcm=['6C10',[],'Additions et soustractions de nombres entier',4,{}]
 			/********************************************************************/
      /** Type 4 : questionmultx avec AMCnumericChoices */
			// Dans ce cas, le tableau des booléens comprend les renseignements nécessaires pour paramétrer \AMCnumericCoices
			// {int digits,int decimals,bool signe,int exposant_nb_chiffres,bool exposant_signe,int approx}
			// La correction est dans tabQCM[1][0] et la réponse numlérique est dans tabQCM[1][1]
			/********************************************************************/

    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions,reponse
    let type_de_questions_disponibles = [1, 2, 3, 4, 5];
    let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(
      type_de_questions_disponibles,
      this.nbQuestions
    );
    if (this.nbQuestions == 3) {
      listeTypeDeQuestions = [1, 2, 5];
    }
    if (this.nbQuestions == 4) {
      listeTypeDeQuestions = [1, 2, 4, 5];
    }

    for (let i = 0, texte, texteCorr, cpt = 0, a, b, c, d, e, f, g, x, y; i < this.nbQuestions && cpt < 50;) {
      type_de_questions = listeTypeDeQuestions[i];
      switch (type_de_questions) {
        case 1: // abcd +efg
          a =
            randint(1, 9) * 10000 +
            randint(5, 9) * 1000 +
            randint(5, 9) * 100 +
            randint(7, 9) * 10 +
            randint(1, 9);
          b = randint(5, 9) * 100 + randint(7, 9) * 10 + randint(1, 9);
          texte = `$${texNombre(a)}+${b}$`;
          reponse=calcul(a+b)
          texteCorr = Operation({operande1:a,operande2:b,type:'addition'})
          break;
        case 2: // abc0-efg
          a = randint(1, 9);
          b = randint(1, 9);
          c = randint(1, 9);
          e = randint(b, 9);
          f = randint(c, 9);
          g = randint(2, 9);
          x = a * 1000 + b * 100 + c * 10;
          y = e * 100 + f * 10 + g;
          texte = `$${texNombre(x)}-${y}$`;
          reponse=calcul(x-y)
          texteCorr = Operation({operande1:x,operande2:y,type:'soustraction'})
          break;
        case 3: // 1abc-def
          a = randint(1, 9);
          b = randint(1, 9);
          c = randint(1, 9);
          d = randint(a, 9);
          e = randint(1, 9);
          f = randint(c, 9);
          x = 1000 + a * 100 + b * 10 + c;
          y = d * 100 + e * 10 + f;
          texte = `$${texNombre(x)}-${y}$`;
          reponse=calcul(x-y)

          texteCorr = Operation({operande1:x,operande2:y,type:'soustraction'})
          break;
        case 4: // abc*d0e tables de 2 à 5
          a = randint(2, 5);
          b = randint(2, 5);
          c = randint(2, 5);
          d = randint(2, 5);
          e = randint(2, 5);
          x = 100 * a + 10 * b + c;
          y = d * 100 + e;
          texte = `$${texNombre(x)}\\times${y}$`;
          reponse=calcul(x*y)

          texteCorr = Operation({operande1:x,operande2:y,type:'multiplication'})
          break;
        case 5: // abc*de tables de 5 à 9
          a = randint(5, 9);
          b = randint(5, 9);
          c = randint(5, 9);
          d = randint(5, 9);
          e = randint(5, 9);
          x = 100 * a + 10 * b + c;
          y = 10 * d + e;
          texte = `$${x}\\times${y}$`;
          reponse=calcul(x*y)
          texteCorr = Operation({operande1:x,operande2:y,type:'multiplication'})
          break;
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        if (!sortieHtml && i == 0) {
          texteCorr = `\\setlength\\itemsep{2em}` + texteCorr;
        } // espacement entre les questions
        this.listeCorrections.push(texteCorr);
            /********************* AMCnumericChoices ********************************/
    this.qcm[1].push([texte, [texteCorr,reponse], {digits:0,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}])
    // [question,[réponse,réponse numérique],{paramètres réponse numérique}] (voir doc AMC \AMCnumericChoices)
    /****************************************************/

        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
}
