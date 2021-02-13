import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes} from "/modules/outils.js"
import { tableau_de_variation,mathalea2d } from '/modules/2d.js';
/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function Essai_tableaux_de_variation() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Test de tableaux de variation";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_cols = 1; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 1; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.liste_packages='tkz-tab'

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['type1']; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1': 
        let t=tableau_de_variation({escpl:4,tabInit:[[['$x$',1,10] ,["$f(x)=ax+b$",1,200],["$f '(x)=a$",1,200],["$a<0$",2,30],['$a>0$',2,30]],['$-\\infty$',30,'$-\\dfrac{b}{a}$',40,'$+\\infty$',30]],tabLines:[['Line',200,'',0,'$\\text{signe de } -a$',220,'z',10,'$\\text{signe de } a$',200,'',0],['Line',160,'',0,'',0,'$\\text{signe de } a$',200,'',0,'',0],['Var',30,'-/ $-\\infty$',30,'R/',0,'+/ $+\\infty$',30],['Ima',30,'1',10,'3',10,'2',10,'O',10],['Var',30,'+/ $+\\infty$',30,'R/ ',0,'-/ $-\\infty$',30],['Ima',30,'1',10,'3',10,'2',10,'O',10]]})
        console.log(t)
        texte = mathalea2d({xmin:0,ymin:-15,xmax:18,ymax:1,pixelsParCm:30},t);
          texte_corr = ``;
          break;
        case 'type2': 
            texte = `Question ${i+1} de type 2`;
            texte_corr = `Correction ${i+1} de type 2`;
          break;
        case 'type3': // Table de 200
            texte = `Question ${i+1} de type 2`;
            texte_corr = `Correction ${i+1} de type 2`;
          break;
        
      }

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

