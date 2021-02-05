import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,choisit_lettres_differentes} from "/modules/outils.js"
/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function demonstrations_parallelogrammes() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Nature de parallélogrammes";
  this.consigne = "";
  this.nb_questions = 7;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 50; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['type1','type2','type3','type4','type5','type6','type7']; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr,noms,nom,prop1,type,def,centre, cpt = 0; i < this.nb_questions && cpt < 50;) {
      noms=choisit_lettres_differentes(5,'Q')
      nom=`$${noms[0]+noms[1]+noms[2]+noms[3]}$`
      centre=`$${noms[4]}$`
        // Boucle principale où i+1 correspond au numéro de la question
      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1': // rectangle 1
          def=`ses diagonales $[${noms[0]+noms[2]}]$ et $[${noms[1]+noms[3]}]$ ont la même longueur`
          prop1=`a des diagonales de même longueur`
          type=`rectangle`
          break;
        case 'type2': // losange 1
        def=`ses diagonales $[${noms[0]+noms[2]}]$ et $[${noms[1]+noms[3]}]$ sont perpendiculaires`
        prop1=`a des diagonales perpendiculaires`
        type=`losange`
          break;
        case 'type3': // carré 1
        def=`ses diagonales $[${noms[0]+noms[2]}]$ et $[${noms[1]+noms[3]}]$ ont la même longueur et sont perpendiculaires`
        prop1=`a des diagonales perpendiculaires et de même longueur`
        type=`carré`
          break;
          case 'type4': //losange 2
          def=`ses côtés $[${noms[0]+noms[1]}]$ et $[${noms[1]+noms[2]}]$ ont la même longueur`
          prop1=`a deux côtés consécutifs de même longueur`
          type=`losange`
            break;
          case 'type5': // rectangle 2
          def=`ses côtés $[${noms[0]+noms[1]}]$ et $[${noms[1]+noms[2]}]$ sont perpendiculaires`
          prop1=`a deux côtés consécutifs perpendiculaires`
          type=`rectangle`
            break;
            case 'type6': // carré 2
          def=`ses côtés $[${noms[0]+noms[1]}]$ et $[${noms[1]+noms[2]}]$ sont perpendiculaires et de même longueur`
          prop1=`a deux côtés consécutifs perpendiculaires et de même longueur`
          type=`carré`
            break;
            case 'type7': // carré 3
          def=`ses côtés $[${noms[0]+noms[1]}]$ et $[${noms[1]+noms[2]}]$ sont perpendiculaires et ses diagonales $[${noms[0]+noms[2]}]$ et $[${noms[1]+noms[3]}]$ aussi`
          prop1=`a deux côtés consécutifs perpendiculaires et des diagonales perpendiculaires`
          type=`carré`
            break;

      }
      texte = `${nom} est un parallélogramme tel que ${def}.<br>`;
      texte+=`Déterminer la nature de ${nom} en justifiant la réponse.`
      texte_corr=`${nom} est un parallélgoramme qui ${prop1}.<br>`
      texte_corr += `Si un parralélogramme ${prop1}, c'est un ${type}.<br>`;
      texte_corr +=`${nom} est donc un ${type}.`

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

