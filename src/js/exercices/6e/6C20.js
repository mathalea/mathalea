import Operation from '../../modules/operations.js';
import Exercice from '../ClasseExercice.js';
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombrec, texNombre,export_QCM_AMC } from '../../modules/outils.js'
export const amcReady = true

export const titre = 'Additions et soustractions de nombres décimaux'

/**
 * Additions et soustractions de nombres décimaux
 * * xxx-xx,x
 * * xxx-xx,xx
 * * xxx,x-xxx
 * * x0x-xx9,x
 * * xxx+xx,x
 * * xxx+xx,xx
 * * xxx,x+xxx
 * * x0x+xx9,x
 * @Auteur Rémi Angot
 * Référence 6C20
 */
export default function Additionner_soustraires_decimaux() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Poser et effectuer les calculs suivants.";
  this.spacing = 2;
  sortieHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1); //Important sinon les opérations posées ne sont pas jolies
  this.nbQuestions = 4;
  this.sup = 3;
  this.tailleDiaporama = 100;
  this.qcm = ['6C20', [], 'Poser et effectuer les calculs suivants',4]
 			/********************************************************************/
      /** Type 4 : questionmultx avec AMCnumericChoices */
			// Dans ce cas, le tableau des booléens comprend les renseignements nécessaires pour paramétrer \AMCnumericCoices
			// {int digits,int decimals,bool signe,int exposant_nb_chiffres,bool exposant_signe,int approx}
			// La correction est dans tabQCM[1][0] et la réponse numlérique est dans tabQCM[1][1]
			/********************************************************************/
  this.nouvelleVersion = function () {
    this.qcm[1]=[]
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions,reponse
    let liste_de_type_d_additions = combinaisonListes(
      [5, 6, 7, 8],
      this.nbQuestions
    );
    let liste_de_type_de_soustractions = combinaisonListes(
      [1, 2, 3, 4],
      this.nbQuestions
    );
    let listeTypeDeQuestions = [];
    if (this.sup == 1) {
      listeTypeDeQuestions = combinaisonListes([5, 6, 7, 8], this.nbQuestions)
    } else if (this.sup == 2) {
      listeTypeDeQuestions = combinaisonListes([1, 2, 3, 4], this.nbQuestions)
    } else {
      for (let i = 0; i < this.nbQuestions; i++) {
        if (i + 1 <= this.nbQuestions / 2) {
          // première moitié sont des additions mais si c'est impair on prendra plus de soustractions
          listeTypeDeQuestions.push(liste_de_type_d_additions[i]);
        } else {
          listeTypeDeQuestions.push(liste_de_type_de_soustractions[i]);
        }
      }
    }

    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b;
      i < this.nbQuestions && cpt < 50;

    ) {
      type_de_questions = listeTypeDeQuestions[i];
      switch (type_de_questions) {
        case 1: // xxx-xx,x
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9);
          b = calcul(randint(5, 9) * 10 + randint(6, 9) + randint(1, 9) / 10);
          texte = `$${texNombre(a)}-${texNombre(b)}$`;
          reponse=calcul(a-b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break;
        case 2: // xxx-xx,xx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9);
          b = calcul(
            randint(5, 9) * 10 +
            randint(6, 9) +
            randint(1, 9) / 10 +
            randint(1, 9) / 100
          );
          texte = `$${texNombre(a)}-${texNombre(b)}$`;
          reponse=calcul(a-b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break;
        case 3: // xxx,x-xxx
          a = calcul(
            randint(5, 9) * 100 +
            randint(2, 5) * 10 +
            randint(1, 9) +
            randint(1, 9) / 10
          );
          b = randint(1, 4) * 100 + randint(6, 9) * 10 + randint(1, 9);
          texte = `$${texNombre(a)}-${texNombre(b)}$`;
          reponse=calcul(a-b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break;
        case 4: // x0x-xx9,x
          a = calcul(randint(5, 9) * 100 + randint(1, 5));
          b = calcul(
            randint(1, 4) * 100 + randint(1, 9) * 10 + 9 + randint(1, 9) / 10
          );
          texte = `$${texNombre(a)}-${texNombre(b)}$`;
          reponse=calcul(a-b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'soustraction' })
          break;
        case 5: // xxx+xx,x
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9);
          b = calcul(randint(5, 9) * 10 + randint(6, 9) + randint(1, 9) / 10);
          texte = `$${texNombre(a)}+${texNombre(b)}$`;
          reponse=calcul(a+b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break;
        case 6: // xxx+xx,xx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9);
          b = calcul(
            randint(5, 9) * 10 +
            randint(6, 9) +
            randint(1, 9) / 10 +
            randint(1, 9) / 100
          );
          texte = `$${texNombre(a)}+${texNombre(b)}$`;
          reponse=calcul(a+b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break;
        case 7: // xxx,x+xxx
          a = calcul(
            randint(5, 9) * 100 +
            randint(2, 5) * 10 +
            randint(1, 9) +
            randint(1, 9) / 10
          );
          b = randint(1, 4) * 100 + randint(6, 9) * 10 + randint(1, 9);
          texte = `$${texNombre(a)}+${texNombre(b)}$`;
          reponse=calcul(a+b)

          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break;
        case 8: // x0x+xx9,x
          a = calcul(randint(5, 9) * 100 + randint(1, 5));
          b = calcul(
            randint(1, 4) * 100 + randint(1, 9) * 10 + 9 + randint(1, 9) / 10
          );
          texte = `$${texNombre(a)}+${texNombre(b)}$`;
          reponse=calcul(a+b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break;
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        this.qcm[1].push([texte, [texteCorr,reponse], {digits:0,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}])
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = ["Niveau de difficulté", 3, "1 : Additions de décimaux\n2: Soustraction de décimaux\n3 : Additions et soustraction de décimaux"];
}

