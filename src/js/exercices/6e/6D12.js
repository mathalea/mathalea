import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,combinaisonListes,minToHoraire,minToHour,prenomF,prenom} from '../../modules/outils.js'


export const titre = 'Calculer des durées ou déterminer un horaire'

/**
 * Problèmes où il faut calculer la durée d'un évèbement ou un horaire.
 * Paramétrage possible :
 * * 1 : calculs de durées
 * * 2 : calculer l'heure de début
 * * 3 : calculer l'heure de fin
 * * 4 : mélange des 3 types précédents
 * @Auteur Rémi Angot
 * Référence 6D12
 */
export default function Calculs_de_durees_ou_d_horaires() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "";
  this.sup = 4;
  this.spacing = 2;
  this.nbQuestions = 3;
  this.nbCols = 1;
  this.nbColsCorr = 1;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    const type_de_contexte = combinaisonListes(
      [1, 2, 3, 4, 5],
      this.nbQuestions
    );
    let type_de_questions; // 1 : calcul de durées // 2 : calcul de l'horaire de début // 3 : calcul de l'horaire de fin // 4 : mélange

    if (this.sup < 4) {
      // que des questions de niveau 1 ou que des questions de niveau 2
      type_de_questions = combinaisonListes([this.sup], this.nbQuestions);
    } else {
      // un mélange équilibré de questions
      type_de_questions = combinaisonListes([1, 2, 3], this.nbQuestions);
    }

    for (let i = 0, d1, h1, m1, d2, h2, m2, d, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      //d1 : heure de début (h1 heures m1 min)
      //d2 : heure de fin (h2 heures m2 min)
      //d : durée
      if (type_de_contexte[i] == 1) {
        h1 = randint(20, 22);
        m1 = randint(35, 58);
        d1 = h1 * 60 + m1;
        h2 = h1 + 2;
        m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2;
        d = d2 - d1;
        d1 = minToHoraire(d1);
        d2 = minToHoraire(d2);
        d = minToHour(d);

        if (type_de_questions[i] == 1) {
          texte = `La diffusion d'un film commence à ${d1} et se termine à ${d2}. Combien de temps a duré ce film ?`;
          texteCorr = `${d2} - ${d1} = ${d}`;
          texteCorr += "<br>";
          texteCorr += `Le film dure ${d}.`;
        }
        if (type_de_questions[i] == 2) {
          texte = `Un film dure ${d} et commence à ${d1}. À quelle heure se terminera-t-il ?`;
          texteCorr = `${d1} + ${d} = ${d2}`;
          texteCorr += "<br>";
          texteCorr += `Le film terminera à ${d2}.`;
        }
        if (type_de_questions[i] == 3) {
          texte = `Un film de ${d} termine à ${d2}. À quelle heure a-t-il commencé ?`;
          texteCorr = `${d2} - ${d} = ${d1}`;
          texteCorr += "<br>";
          texteCorr += `Le film a commencé à ${d1}.`;
        }
      }

      if (type_de_contexte[i] == 2) {
        h1 = randint(20, 23);
        m1 = randint(35, 58);
        d1 = h1 * 60 + m1;
        h2 = h1 + 1;
        m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2;
        d = d2 - d1;
        while (d < 27 || d > 75 || d == 60) {
          h1 = randint(20, 23);
          m1 = randint(35, 58);
          d1 = h1 * 60 + m1;
          h2 = h1 + 2;
          m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2;
          d = d2 - d1;
        }
        d1 = minToHoraire(d1);
        d2 = minToHoraire(d2);
        d = minToHour(d);

        if (type_de_questions[i] == 1) {
          texte = `Sur son service de streaming favori, ${prenom()} commence à regarder une série à ${d1} et celle-ci se termine à ${d2}. Combien de temps a duré l'épisode ?`;
          texteCorr = `${d2} - ${d1} = ${d}`;
          texteCorr += "<br>";
          texteCorr += `La série a duré ${d}.`;
        }
        if (type_de_questions[i] == 2) {
          texte = `${prenom()} allume son ordinateur à ${d1} pour regarder une série de ${d}. À quelle heure la série s'achèvera-t-elle ?`;
          texteCorr = `${d1} + ${d} = ${d2}`;
          texteCorr += "<br>";
          texteCorr += `La série s'achèvera à ${d2}.`;
        }
        if (type_de_questions[i] == 3) {
          texte = `${prenom()} termine de regarder une série de ${d} à ${d2}. À quelle heure la série a-t-elle commencé ?`;
          texteCorr = `${d2} - ${d} = ${d1}`;
          texteCorr += "<br>";
          texteCorr += `Elle a commencé à ${d1}.`;
        }
      }

      if (type_de_contexte[i] == 3) {
        h1 = randint(8, 21);
        m1 = randint(1, 58);
        d1 = h1 * 60 + m1;
        h2 = h1 + randint(1, 2);
        m2 = randint(1, 59); // pas forcément de retenue dans d2-d1
        d2 = h2 * 60 + m2;
        d = d2 - d1;
        d1 = minToHoraire(d1);
        d2 = minToHoraire(d2);
        d = minToHour(d);

        if (type_de_questions[i] == 1) {
          texte = `Une émission télévisée est diffusée de ${d1} à ${d2}. Combien de temps dure-t-elle ?`;
          texteCorr = `${d2} - ${d1} = ${d}`;
          texteCorr += "<br>";
          texteCorr += `L'émission dure ${d}.`;
        }
        if (type_de_questions[i] == 2) {
          texte = `Une émission télévisée de ${d} commence à ${d1}. À quelle heure s'achèvera-t-elle ?`;
          texteCorr = `${d1} + ${d} = ${d2}`;
          texteCorr += "<br>";
          texteCorr += `L'émission s'achèvera à ${d2}.`;
        }
        if (type_de_questions[i] == 3) {
          texte = `À ${d2}, ${prenom()} termine de regarder une émission de ${d}. À quelle heure l'émission a-t-elle commencé ?`;
          texteCorr = `${d2} - ${d} = ${d1}`;
          texteCorr += "<br>";
          texteCorr += `L'émission a commencé à ${d1}.`;
        }
      }

      if (type_de_contexte[i] == 4) {
        h1 = randint(13, 16);
        m1 = randint(1, 58);
        d1 = h1 * 60 + m1;
        h2 = h1 + randint(1, 2);
        m2 = randint(1, 58); // pas forcément de retenue dans d2-d1
        d2 = h2 * 60 + m2;
        d = d2 - d1;
        while (d < 27 || d > 75 || d == 60) {
          h1 = randint(13, 16);
          m1 = randint(35, 58);
          d1 = h1 * 60 + m1;
          h2 = h1 + randint(1, 2);
          m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2;
          d = d2 - d1;
        }
        d1 = minToHoraire(d1);
        d2 = minToHoraire(d2);
        d = minToHour(d);

        if (type_de_questions[i] == 1) {
          texte = `Un papa regarde la compétition de gymnastique de sa fille  de ${d1} à ${d2}. Calculer la durée de cette compétition.`;
          texteCorr = `${d2} - ${d1} = ${d}`;
          texteCorr += "<br>";
          texteCorr += `La compétition dure ${d}.`;
        }
        if (type_de_questions[i] == 2) {
          texte = `Une compétition de gymnastique commence à ${d1} et dure ${d}. À quelle heure sera-t-elle terminée ?`;
          texteCorr = `${d1} + ${d} = ${d2}`;
          texteCorr += "<br>";
          texteCorr += `La compétition terminera à ${d2}.`;
        }
        if (type_de_questions[i] == 3) {
          texte = `Une compétition de gymnastique qui se termine à ${d2} a duré ${d}. À quelle heure a-t-elle commencé.`;
          texteCorr = `${d2} - ${d} = ${d1}`;
          texteCorr += "<br>";
          texteCorr += `La compétition a commencé à ${d1}.`;
        }
      }

      if (type_de_contexte[i] == 5) {
        h1 = randint(8, 15);
        m1 = randint(25, 58);
        d1 = h1 * 60 + m1;
        h2 = h1 + randint(2, 5);
        m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2;
        d = d2 - d1;
        while (d < 27 || d > 75 || d == 60) {
          h1 = randint(20, 23);
          m1 = randint(35, 58);
          d1 = h1 * 60 + m1;
          h2 = h1 + 2;
          m2 = randint(1, m1); // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2;
          d = d2 - d1;
        }
        d1 = minToHoraire(d1);
        d2 = minToHoraire(d2);
        d = minToHour(d);

        if (type_de_questions[i] == 1) {
          texte = `Un train part à ${d1} et arrive à destination à ${d2}. Calculer la durée du trajet.`;
          texteCorr = `${d2} - ${d1} = ${d}`;
          texteCorr += "<br>";
          texteCorr += `Le trajet dure ${d}.`;
        }
        if (type_de_questions[i] == 2) {
          texte = `${prenomF()} monte dans le train à ${d1} pour un trajet qui doit durer ${d}. À quelle heure arrivera-t-elle ?`;
          texteCorr = `${d1} + ${d} = ${d2}`;
          texteCorr += "<br>";
          texteCorr += `Elle arrivera à ${d2}.`;
        }
        if (type_de_questions[i] == 3) {
          texte = `Un train arrive en gare à ${d2} après un trajet de ${d}. À quelle heure le voyage a-t-il commencé ?`;
          texteCorr = `${d2} - ${d} = ${d1}`;
          texteCorr += "<br>";
          texteCorr += `Le voyage a commencé à ${d1}.`;
        }
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
    4,
    "1 : Calcul de durée\n2 : Calcul de l'horaire de fin\n3 : Calcul de l'horaire de début\n4 : 3 types de questions",
  ];
}
