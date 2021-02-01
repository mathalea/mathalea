import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes} from "/modules/outils.js"
/**
 * Citer des formules de périmètre, des formules d'aire ou la définition de π
 * @Auteur Rémi Angot
 * Référence 6M25
 */
export default function Connaitre_formules_de_perimetre_et_aires() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Connaitre le cours sur le périmètre et l'aire";
  this.consigne = "Calculer";
  this.nb_questions = 4;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_type_de_questions = combinaison_listes(
      [
        "pi",
        "prectangle",
        "pcarre",
        "acarre",
        "arectangle",
        "pcercle",
        "acercle",
        "atrianglerectangle",
        "atriangle",
      ],
      this.nb_questions
    );
    for (
      let i = 0, texte, texte_corr, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case "pi":
          texte = "Rappeler la définition du nombre $\\pi$.";
          texte_corr = "$\\pi$ est la longueur d'un cercle de diamètre 1.";
          break;
        case "prectangle":
          texte = "Donner une formule du périmètre du rectangle.";
          texte_corr =
            "$\\mathcal{P}_{\\text{rectangle}}=(L+l)\\times2=L\\times2+l\\times2=L+l+L=l$<br><br>";
          texte_corr += "Avec $L$ la longueur et $l$ la largeur du rectangle.";
          break;
        case "pcarre":
          texte = "Donner une formule du périmètre du carré.";
          texte_corr =
            "$\\mathcal{P}_{\\text{carré}}=c\\times4=c+c+c+c$<br><br>";
          texte_corr += "Avec $c$ la longueur du côté du carré.";
          break;
        case "arectangle":
          texte = "Donner une formule de l'aire du rectangle.";
          texte_corr = "$\\mathcal{A}_{\\text{rectangle}}=L\\times l$<br><br>";
          texte_corr += "Avec $L$ la longueur et $l$ la largeur du rectangle.";
          break;
        case "acarre":
          texte = "Donner une formule de l'aire du carré.";
          texte_corr = "$\\mathcal{A}_{\\text{carré}}=c\\times c=c^2$<br><br>";
          texte_corr += "Avec $c$ la longueur du côté du carré.";
          break;
        case "atrianglerectangle":
          texte = "Donner une formule de l'aire du triangle rectangle.";
          texte_corr =
            "$\\mathcal{A}_{\\text{triangle rectangle}}=a\\times b \\div2=\\dfrac{a\\times b}{2}$<br><br>";
          texte_corr +=
            "Avec $a$ et $b$ les longueurs des côtés de l'angle droit.";
          break;
        case "atriangle":
          texte = "Donner une formule de l'aire d'un triangle quelconque.";
          texte_corr =
            "$\\mathcal{A}_{\\text{triangle rectangle}}=b\\times h \\div2=\\dfrac{b\\times h}{2}$<br><br>";
          texte_corr +=
            "Avec $b$ la longueur d'un côté et $h$ la longueur de la hauteur relative à ce côté.";
          break;
        case "pcercle":
          texte =
            "Donner une formule de la longueur d'un cercle (aussi appelée circonférence).";
          texte_corr =
            "$\\mathcal{P}_{\\text{cercle}}=D\\times \\pi = 2\\times R \\times \\pi = 2\\pi{}R$<br><br>";
          texte_corr += "Avec $D$ le diamètre et $R$ le rayon de ce cercle.";
          break;
        case "acercle":
          texte = "Donner une formule de l'aire d'un disque.";
          texte_corr =
            "$\\mathcal{A}_{\\text{disque}}=R\\times R\\times\\pi=\\pi R^2$<br><br>";
          texte_corr += "Avec $R$ le rayon de ce disque.";
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
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

