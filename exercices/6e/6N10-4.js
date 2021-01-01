import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,tex_nombre} from "/modules/outils.js"
/**
 * 6N10-4
 * Supprimer les zéros inutiles, séparer les classes d'un nombre entier.
 * @Auteur Jean-Claude Lhote
 */
export default function Ecrire_nombres_entiers_formates() {
  "use strict"
  Exercice.call(this)
  this.titre = "Écrire correctement les grands nombres entiers.";
  this.nb_questions = 5;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function () {
    this.consigne = `Écrire les nombres en chiffres en supprimant les zéros inutiles et en séparant les classes.`
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées 
    function zeroSuperflus(n) {
      let nzero = randint(0, 2), nombrestring = n.toString()
      for (let k = 0; k < nzero; k++) nombrestring = `0` + nombrestring
      return nombrestring
    }
    for (
      let i = 0, texte, texte_corr, a, b, c, nombre, tranche, nombrestring, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {

      nombre = 0
      tranche = []
      while (nombre == 0) {
        tranche.splice(0)
        for (let j = 0; j < 3; j++) {
          a = randint(1, 9)
          b = randint(1, 9)
          c = randint(1, 9)
          tranche.push(choice([0, 100, 20, 80, a, a * 100, a * 100 + b * 10 + c, a * 100 + 80 + b, a * 10, a * 100 + b * 10 + 1]))
        }
        for (let j = 0; j < 3; j++) {
          nombre += tranche[j] * 10 ** (j * 3)
        }
        if (tranche[2] == 0) nombre = 0
      }
      nombrestring = zeroSuperflus(nombre)
      if (!est_diaporama) texte = `$${nombrestring}$ : \\dotfill`
      else texte = `$${nombrestring}$`
      if (!est_diaporama) texte_corr = `$${nombrestring}=${tex_nombre(nombre)}$.`
      else texte_corr = `${tex_nombre(nombre)}.`
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
  //this.besoin_formulaire_numerique = ['Type d\'exercice', 2, '1 : Écrire en lettres un nombre donné en chiffres\n2 : Écrire en chiffres un nombre donné en lettres'];
  //this.besoin_formulaire2_numerique = ['Niveau', 3, '1 : Facile\n2 : Moyen\n3 : Difficile']
}
