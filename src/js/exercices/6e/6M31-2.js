import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,calcul,texNombrec,texNombre} from '../../modules/outils.js'
export const titre = 'Conversions avec des unités de volumes ou de capacités'

/**
 * Conversions d'unités de volumes vers les unités de capacité ou inversement.
 *
 * Dans la correction, on passe systématiquement par l'équivalence dm3 = L
 *
 * * 1 : De dam3, m3, dm3, cm3 ou mm3 vers L ou inversement
 * * 2 :
 * * 3 :
 * * 4 :
 * * 5 :
 * * 6 : Un mélange de toutes les conversions
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @Auteur Rémi Angot
 * Référence 6M31-2
 */
export default function Unites_de_volumes_et_de_capacite(niveau = 1) {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = niveau; // Niveau de difficulté de l'exercice
  this.sup2 = false; // Avec des nombres décimaux ou pas
  this.titre = titre;
  this.consigne = "Compléter";
  this.spacing = 2;
  this.nbQuestions = 8;
  this.nbColsCorr = 1;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let listeTypeDeQuestions
    if (this.sup == 1) {
      listeTypeDeQuestions = combinaisonListes(
        ["dam3toL", "m3toL", "dm3toL", "cm3toL"],
        this.nbQuestions
      );
    }
    if (this.sup == 2) {
      listeTypeDeQuestions = combinaisonListes(
        ["Ltodm3", "Ltocm3", "Ltom3"],
        this.nbQuestions
      );
    }
    if (this.sup == 3) {
      listeTypeDeQuestions = combinaisonListes(
        [
          "dam3toL",
          "m3toL",
          "dm3toL",
          "cm3toL",
          "mm3toL",
          "Ltodm3",
          "Ltocm3",
          "Ltom3",
        ],
        this.nbQuestions
      );
    }
    let liste_de_n = [];
    if (this.sup2) {
      liste_de_n = combinaisonListes([1, 2, 3, 4], this.nbQuestions);
    } else {
      liste_de_n = combinaisonListes([1, 2, 3, 4, 5, 6], this.nbQuestions);
    }
    for (
      let i = 0, n, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (this.sup2) {
        switch (liste_de_n[i]) {
          case 1:
            n = calcul(randint(2, 9) / 10);
            break;
          case 2:
            n = calcul(randint(11, 99) / 100);
            break;
          case 3:
            n = calcul(randint(1, 9) * 10 + randint(1, 9) / 10);
            break;
          case 4:
            n = calcul(
              randint(11, 99, [10, 20, 30, 40, 50, 60, 70, 80, 90]) / 100
            );
            break;
        }
      } else {
        switch (liste_de_n[i]) {
          case 1:
            n = randint(2, 9);
            break;
          case 2:
            n = randint(11, 99);
            break;
          case 3:
            n = randint(1, 9) * 10;
            break;
          case 4:
            n = randint(1, 9) * 100;
            break;
          case 5:
            n = randint(11, 99) * 100;
            break;
          case 6:
            n = randint(1, 9) * 1000;
            break;
        }
      }
      switch (listeTypeDeQuestions[i]) {
        case "dam3toL":
          texte = `$${texNombre(n)}~\\text{dam}^3=\\dotfill~\\text{L}$`;
          texteCorr = `$${texNombre(n)}~\\text{dam}^3=${texNombre(
            n
          )}\\times1~000\\times1~000~\\text{dm}^3=${texNombrec(
            n * 1000000
          )}~\\text{L}$`;
          break;
        case "m3toL":
          texte = `$${texNombre(n)}~\\text{m}^3=\\dotfill~\\text{L}$`;
          texteCorr = `$${texNombre(n)}~\\text{m}^3=${texNombre(
            n
          )}\\times1~000~\\text{dm}^3=${texNombrec(n * 1000)}~\\text{L}$`;
          break;
        case "dm3toL":
          texte = `$${texNombre(n)}~\\text{dm}^3=\\dotfill~\\text{L}$`;
          texteCorr = `$${texNombre(n)}~\\text{dm}^3=${texNombre(
            n
          )}~\\text{L}$`;
          break;
        case "cm3toL":
          texte = `$${texNombre(n)}~\\text{cm}^3=\\dotfill~\\text{L}$`;
          texteCorr = `$${texNombre(n)}~\\text{cm}^3=${texNombre(
            n
          )}\\div 1~000~\\text{dm}^3=${texNombrec(n / 1000)}~\\text{L}$`;
          break;
        case "mm3toL":
          texte = `$${texNombre(n)}~\\text{mm}^3=\\dotfill~\\text{L}$`;
          texteCorr = `$${texNombre(n)}~\\text{mm}^3=${texNombre(
            n
          )}\\div1~000\\div 1~000~\\text{dm}^3=${texNombrec(
            n / 1000000
          )}~\\text{L}$`;
          break;
        case "Ltodm3":
          texte = `$${texNombre(n)}~\\text{L}=\\dotfill~\\text{dm}^3$`;
          texteCorr = `$${texNombre(n)}~\\text{L}=${texNombre(
            n
          )}~\\text{dm}^3$`;
          break;
        case "Ltocm3":
          texte = `$${texNombre(n)}~\\text{L}=\\dotfill~\\text{cm}^3$`;
          texteCorr = `$${texNombre(n)}~\\text{L}=${texNombre(
            n
          )}~\\text{dm}^3=${texNombre(
            n
          )}\\times1~000~\\text{cm}^3=${texNombrec(n * 1000)}~\\text{cm}^3$`;
          break;
        case "Ltom3":
          texte = `$${texNombre(n)}~\\text{L}=\\dotfill~\\text{m}^3$`;
          texteCorr = `$${texNombre(n)}~\\text{L}=${texNombre(
            n
          )}~\\text{dm}^3=${texNombre(n)}\\div1~000~\\text{m}^3=${texNombrec(
            n / 1000
          )}~\\text{m}^3$`;
          break;
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = [
    "Niveau de difficulté",
    3,
    "1 : Unités de volume vers litre\n2 : Litre vers unités de volume\n3 : Unités de volumes vers litre ou inversement ",
  ];
  this.besoinFormulaire2CaseACocher = ["Avec des nombres décimaux"];
}

