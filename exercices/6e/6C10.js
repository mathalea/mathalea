import Operation from '/modules/operations.js';
import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes_sans_changer_ordre,tex_nombre} from "/modules/outils.js"

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
  this.titre = "Additions, soustractions et multiplications posées de nombres entiers";
  this.consigne = "Poser et effectuer les calculs suivants.";
  this.spacing = 2;
  sortie_html ? (this.spacing_corr = 2) : (this.spacing_corr = 1); //Important sinon les opérations posées ne sont pas jolies
  this.nb_questions = 5;
  // this.pas_de_version_HMTL=true;
  this.liste_packages = "xlop";
  this.tailleDiaporama = 100;


  this.nouvelle_version = function () {
        /*********************************************************/
// On ajoute cette ligne pour AMC
this.QCM=['6C10',[],'Additions et soustractions de nombres entier',4]
 			/********************************************************************/
      /** Type 4 : questionmultx avec AMCnumericChoices */
			// Dans ce cas, le tableau des booléens comprend les renseignements nécessaires pour paramétrer \AMCnumericCoices
			// {int digits,int decimals,bool signe,int exposant_nb_chiffres,bool exposant_signe,int approx}
			// La correction est dans tabQCM[1][0] et la réponse numlérique est dans tabQCM[1][1]
			/********************************************************************/

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions,reponse
    let type_de_questions_disponibles = [1, 2, 3, 4, 5];
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(
      type_de_questions_disponibles,
      this.nb_questions
    ); 
    if (this.nb_questions == 3) {
      liste_type_de_questions = [1, 2, 5];
    }
    if (this.nb_questions == 4) {
      liste_type_de_questions = [1, 2, 4, 5];
    }

    for (let i = 0, texte, texte_corr, cpt = 0, a, b, c, d, e, f, g, x, y; i < this.nb_questions && cpt < 50;) {
      type_de_questions = liste_type_de_questions[i];
      switch (type_de_questions) {
        case 1: // abcd +efg
          a =
            randint(1, 9) * 10000 +
            randint(5, 9) * 1000 +
            randint(5, 9) * 100 +
            randint(7, 9) * 10 +
            randint(1, 9);
          b = randint(5, 9) * 100 + randint(7, 9) * 10 + randint(1, 9);
          texte = `$${tex_nombre(a)}+${b}$`;
          reponse=a+b
          texte_corr = Operation({operande1:a,operande2:b,type:'addition'})
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
          texte = `$${tex_nombre(x)}-${y}$`;
          reponse=x-y
          texte_corr = Operation({operande1:x,operande2:y,type:'soustraction'})
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
          texte = `$${tex_nombre(x)}-${y}$`;
          reponse=x-y

          texte_corr = Operation({operande1:x,operande2:y,type:'soustraction'})
          break;
        case 4: // abc*d0e tables de 2 à 5
          a = randint(2, 5);
          b = randint(2, 5);
          c = randint(2, 5);
          d = randint(2, 5);
          e = randint(2, 5);
          x = 100 * a + 10 * b + c;
          y = d * 100 + e;
          texte = `$${tex_nombre(x)}\\times${y}$`;
          reponse=x*y

          texte_corr = Operation({operande1:x,operande2:y,type:'multiplication'})
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
          reponse=x*y
          texte_corr = Operation({operande1:x,operande2:y,type:'multiplication'})
          break;
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        if (!sortie_html && i == 0) {
          texte_corr = `\\setlength\\itemsep{2em}` + texte_corr;
        } // espacement entre les questions
        this.liste_corrections.push(texte_corr);
            /*****************************************************/
    // Pour AMC
    this.QCM[1].push([texte, [texte_corr,reponse], {digits:0,decimals:0,signe:false,exposant_nb_chiffres:0,exposant_signe:false,approx:0}])
    /****************************************************/

        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
}
