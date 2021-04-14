import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes} from "/modules/outils.js"
import {mathalea2d} from "/modules/2d.js"

export default function Calculer_valeur_manquante_visuel_pythagore() {
    "use strict"
    Exercice.call(this)
    this.titre = "Calculer une valeur manquante avec l'égalité de Pythagore";
    this.consigne = "Dans chaque cas, calculer la valeur manquante indiquée par un point d'interrogation.";
    this.nb_questions = 4; // Ici le nombre de questions
    this.nb_questions_modifiable=true // Active le formulaire nombre de questions
    this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
  
  
    this.nouvelle_version = function () {
    this.liste_questions = []; // tableau contenant la liste des questions 
    this.liste_corrections = [];
    let type_de_questions_disponibles=[1,2,3,4]; // tableau à compléter par valeurs possibles des types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
  
    let objets_enonce,objets_enonceml,objets_correction,params_enonce,params_correction
      mathalea.fenetreMathalea2d = [-11.7,-6.4,18.3,13.6]
let A=point(4,0,'A')
let B=point(0,3,'B')
let C=point(0,0,'C')
let p1=polygone(A,B,C)
p1.isVisible=false
let p2=rotation(p1,C,randint(0,359))
let a=p2.listePoints[0]
let b=p2.listePoints[1]
let c=p2.listePoints[2]
let codage=codageAngleDroit(a,c,b)
let car1=carre(b,a)
car1.couleurDeRemplissage='red'
let bar1=barycentre(car1)
bar1.positionLabel='center'
let car2=carre(c,b)
car2.couleurDeRemplissage='blue'
let bar2=barycentre(car2)
bar2.positionLabel='center'
let car3=carre(a,c)
car3.couleurDeRemplissage='green'
let bar3=barycentre(car3)
bar3.positionLabel='center'
let q1=latexParPoint('? \\text{ cm}^2',bar1)
let l1=afficheLongueurSegment(b,c)
let l2=afficheLongueurSegment(c,a)
let q2=latexParPoint('9 \\text{ cm}^2',bar2)
let q3=latexParPoint('16 \\text{ cm}^2',bar3)
  
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
        objets_enonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
        objets_enonceml = [] // Idem pour l'enoncé à main levée si besoin
        objets_correction = [] // Idem pour la correction
  
        texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte_corr = `` // Idem pour le texte de la correction.

        switch (liste_type_de_questions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
          case 1:
               
            //ici sont créés les texte, tex_corr, objets mathalea2d divers entrant dans le contenu de l'exercice
          break;
  
          case 2:
            // Idem Cas1 mais avec d'autres texte, texte_corr...
          break
  
          case 3:
            
          break
            
          case 4:
          
          break  
            
        }
  //  objets_enonce.push () // On rempli les tableaux d'objets Mathalea2d
  //  objets_enonceml.push()
  //  objets_correction.push()
  
  //paramètres de la fenêtre Mathalea2d pour l'énoncé main levée
    //    params_enonceml = { xmin: Math.min(objets_enonceml.x), ymin: Math.min(objets_enonceml.y), xmax: Math.max(objets_enonceml.x), ymax: Math.max(objets_enonceml.y), pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 1 }
  //paramètres de la fenêtre Mathalea2d pour l'énoncé normal
        params_enonce = { xmin:-10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: false}
  //paramètres de la fenêtre Mathalea2d pour la correction
        params_correction = { xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1 }
  // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
        texte += mathalea2d(params_enonce, objets_enonce)
  // On ajoute au texte de la correction, la figure de la correction
        texte_corr += mathalea2d(params_correction, objets_correction)
        if (this.liste_questions.indexOf(texte) == -1) {
          // Si la question n'a jamais été posée, on la stocke dans la liste des questions
          this.liste_questions.push(texte);
          this.liste_corrections.push(texte_corr);
          i++;
        }
        cpt++;
      }
      liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.
  
  //	this.besoin_formulaire_numerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]
  
  } // Fin de l'exercice.
  





