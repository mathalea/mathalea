import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,texNombre} from '../../modules/outils.js'
import Operation from '../../modules/operations.js';
export const amcReady = true

export const titre = 'Divisions euclidiennes'

/**
 * Poser et effectuer les divisions euclidiennes suivantes puis donner l'égalité fondamentale correspondante.
 *
 * Niveau de difficulté 1 :
 * * division par 2, 3 , 4 ou 5
 * * division par 6 à 9
 * * un 0 dans le quotient
 *
 * Niveau de difficulté 2 :
 * * division par 11, 12, 15, 25
 * * division par 13,14,21,22,23 ou 24 et un 0 dans le quotient
 * * division par un multiple de 10 et un 0 dans le quotient
 * @Auteur Rémi Angot
 * Référence 6C11
 */
export default function Divisions_euclidiennes() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne =
    "Poser et effectuer les divisions euclidiennes suivantes puis donner l'égalité fondamentale correspondante.";
  this.spacing = 2;
  sortieHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1); //Important sinon opidiv n'est pas joli
  this.nbQuestions = 4;
  this.sup = 1;
  this.listePackages = "xlop";

  this.nouvelleVersion = function () {
   if (this.sup<2) {
     this.qcm=['6C11',[],'division euclidienne',3,{}]
   }
   else {
      this.qcm=['6C21',[],'division euclidienne niveau 2',3,{}]
   }
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles,type_de_questions
    if (this.sup == 0) type_de_questions_disponibles = [1, 1, 1, 1]
    else if (this.sup == 1) type_de_questions_disponibles = [1, 2, 2, 3]
    else if (this.sup == 2) type_de_questions_disponibles = [4, 4, 5, 6];
    let liste_type_de_questions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, q, r;
      i < this.nbQuestions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i];
      switch (type_de_questions) {
        case 1: // division par 2, 3 , 4 ou 5
          q = randint(2, 5) * 100 + randint(2, 5) * 10 + randint(2, 5);
          b = randint(2, 5);
          break;
        case 2: // division par 6 à 9
          q = randint(5, 9) * 100 + randint(2, 5) * 10 + randint(5, 9);
          b = randint(6, 9);
          break;
        case 3: // un 0 dans le quotient
          if (randint(1, 2) == 1) {
            q = randint(2, 9) * 1000 + randint(2, 9) * 100 + randint(2, 9);
          } else {
            q = randint(2, 9) * 1000 + randint(2, 9) * 10 + randint(2, 9);
          }
          b = randint(7, 9);
          break;
        case 4: // division par 11, 12, 15, 25
          q = randint(1, 5) * 100 + randint(1, 5) * 10 + randint(1, 5);
          b = choice([11, 12, 15, 25]);
          break;
        case 5: // division par 13,14,21,22,23 ou 24 et un 0 dans le quotient
          q = randint(1, 5) * 1000 + randint(6, 9) * 100 + randint(1, 5);
          b = choice([11, 12, 13, 14, 21, 22, 23, 24]);
          break;
        case 6: // division par un multiple de 10 et un 0 dans le quotient
          q = randint(6, 9) * 1000 + randint(6, 9) * 10 + randint(1, 5);
          b = randint(2, 9) * 10;
          break;
      }
      r = randint(0, b - 1); //reste inférieur au diviseur
      a = b * q + r;
      texte = `$${texNombre(a)}\\div${b}$`;
      if (r == 0) {
        texteCorr = `${Operation({operande1:a,operande2:b,type:'divisionE'})}$${texNombre(a)}\\div${b}=${q}$`;
      } else {
        texteCorr = `${Operation({operande1:a,operande2:b,type:'divisionE'})}$${texNombre(a)}=${b}\\times${q}+${r}$`;
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        /***************** AMC Open ************************/
        this.qcm[1].push([texte,[texteCorr],[4]])    // [question,[reponse],[nb_lignes_cadre]]
        /*********************************************/
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = [
    "Niveau de difficulté",
    2,
    "1 : Diviseur inférieur à 10\n2: Diviseur à 2 chiffres",
  ];
}

