import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,nombre_avec_espace} from "/modules/outils.js"
import {pavage,texteParPosition,mathalea2d,} from "/modules/2d.js"


/**
 * Outil de création de pavages pour le prof
 * @Auteur Jean-Claude Lhote
 * Publié le 12/12/2020
 * Ref : P007
 */
export default function Pavages_mathalea2d() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Fabriquer des pavages pour travailler les transformations";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 4;
  this.sup2 = "1-1";
  this.sup3 = true;
  this.correction_detaillee = false;
  this.correction_detaillee_disponible = true;
  sortie_html ? (this.spacing_corr = 2.5) : (this.spacing_corr = 1.5);
  this.nouvelle_version = function () {
    let objets = [];
    let Nx, Ny; // nombres de dalles en x et en y
    if (!this.sup2) { // On fixe le nombre de dalles en x et en y
      // Si aucune grandeur n'est saisie
      [Nx, Ny] = [1, 1];
    } else {
      if (typeof this.sup2 === "number") { // Si on ne met qu'un nombre alors on prend Nx=Ny
        [Nx, Ny] = [this.sup2, this.sup2];
        this.nb_questions = 1;
      } else { // On fixe Nx et Ny avec les valeurs saisies.
        [Nx, Ny] = this.sup2.split("-"); // Sinon on créé un tableau à partir des valeurs séparées par des -
      }
    }
    this.liste_corrections = [];
    this.liste_questions = [];
    let texte = "", texte_corr = "";
    let type_de_pavage;

    let monpavage = pavage(); // On crée l'objet Pavage qui va s'appeler monpavage
    type_de_pavage = parseInt(this.sup);
    monpavage.construit(type_de_pavage, Nx, Ny, 3); // On initialise toutes les propriétés de l'objet.
    if (this.sup3) { // Doit-on afficher les Numéros ?
      for (let i = 0; i < monpavage.nb_polygones; i++) {
        objets.push(texteParPosition(nombre_avec_espace(i + 1), monpavage.barycentres[i].x + 0.5, monpavage.barycentres[i].y, 'milieu', 'black', 0.04 * monpavage.echelle, 0, true));
      }
    }
    if (this.correction_detaillee) { // Doit-on montrer les centres des figures ?
      for (let i = 0; i < monpavage.nb_polygones; i++) {
        objets.push(monpavage.tracesCentres[i]);
      }
    }
    for (let i = 0; i < monpavage.nb_polygones; i++) { // il faut afficher tous les polygones du pavage
      objets.push(monpavage.polygones[i]);
    }
    texte = mathalea2d(monpavage.fenetre, objets); // monpavage.fenetre est calibrée pour faire entrer le pavage dans une feuille A4

    texte_corr = "Le premier paramètre permet de choisir le pavage.<br>";
    texte_corr += "Le deuxième permet de choisir le nombre de répétitions en x et y. Exemple : 3-2<br>";
    texte_corr += "Le troisième permet d'afficher un Numéro distinct sur chaque figure.<br>";
    texte_corr += "En activant la correction détaillée, on affiche les barycentres de celles-ci.";

    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ["Type de pavage", 7, '1 : Triangles équilatéraux\n2 : Carrés\n3 : Hexagones\n4 : Pavage 3².4.3.4\n5 : Pavage 8².4\n6 : Pavage hexagonal d\'écolier\n7 : Pavage 6.3.6.3'];
  this.besoin_formulaire2_texte = ["Nombre de répétitions du motif (2 entiers séparés par un tiret)"];
  this.besoin_formulaire3_case_a_cocher = ["Présence de numéros"];
} // Fin de l'exercice.

