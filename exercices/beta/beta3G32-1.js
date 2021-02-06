import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,randint,arrondi,calcul,tex_nombre} from "/modules/outils.js"
/**
 * Description didactique de l'exercice
 * @Auteur 
 * Référence 
*/
export default function Calculs_trigonometriques() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Problèmes utilisant la trigonométrie";
  this.consigne = "";
  this.nb_questions = 10;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
this.nb_questions=1

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let objet=[['arbre','un',''],['immeuble','un',''],['éolienne','une','te'],['montagne','une','te']]
    let distance,hauteur,beta,alpha,teta,taille,index
    let type_de_questions_disponibles = ['type1']; // On créé 3 types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
        
      switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1': 
        distance=randint(5,300)
        hauteur=calcul(randint(150,190)/100)
        beta=Math.atan(hauteur/distance)
        alpha=randint(10,50)
        teta=alpha*Math.PI/180-beta
        taille=arrondi(hauteur+distance*Math.tan(teta),1)
        if (taille<20) index=0
        else if (taille<50) index=1
        else if (taille<100) index=2
        else index=3

          texte = `On observateur regarde ${objet[index][1]} ${objet[index][0]} sous un angle de $${alpha}\\degree$.<br>`;
          texte+=`Cet${objet[index][2]} ${objet[index][0]} est situé à une distance de $${tex_nombre(distance)}$ m de l'observateur.<br>`
          texte+=`l'oeil de l'observateur est situé à $${tex_nombre(hauteur)}$ m du sol.<br>`
          texte+=`Calculer la hauteur de cet${objet[index][2]} ${objet[index][0]} arrondie au mètre près`
          texte_corr = `Cet${objet[index][2]} ${objet[index][0]} mesure $${tex_nombre(Math.round(taille))}$ m de hauteur.`;
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

