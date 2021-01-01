import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,tex_nombre,nombreEnLettres} from "/modules/outils.js"
/**
 * Lire un nombre / écrire un nombre : passer d'une écriture à une autre et inversement
 * On peut fixer la classe maximale : unités, miliers, millions, milliards
 * @Auteur Jean-Claude Lhote
 * Référence 6N10
 */

export default function Ecrire_nombres_entiers() {
  "use strict"
  Exercice.call(this)
  this.titre = "Écrire un nombre en chiffres ou en lettres";
  this.nb_questions = 5;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1
  this.sup2 = 3
  this.nouvelle_version = function () {
    if (this.sup == 2)
      this.consigne = "Écrire le nombre en chiffres"
    else
      this.consigne = "Écrire le nombre en lettres"
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées 
    let type_de_questions_disponibles;
    if (this.sup2 == 1) type_de_questions_disponibles = [1, 1, 1, 2, 2]
    else if (this.sup2 == 2) type_de_questions_disponibles = [1, 2, 2, 2, 3]
    else if (this.sup2 == 3) type_de_questions_disponibles = [2, 2, 3, 3, 4]
    else type_de_questions_disponibles = [2, 3, 3, 4, 4]

    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, b, c, nombre, tranche, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {

      nombre = 0
      tranche = []
      while (nombre == 0) {
        tranche.splice(0)
        for (let j = 0; j < liste_type_de_questions[i]; j++) {
          a = randint(1, 9)
          b = randint(1, 9)
          c = randint(1, 9)
          tranche.push(choice([0, 100, 20, 80, a, a * 100, a * 100 + b * 10 + c, a * 100 + 80 + b, a * 10, a * 100 + b * 10 + 1]))
        }
        for (let j = 0; j < liste_type_de_questions[i]; j++) {
          nombre += tranche[j] * 10 ** (j * 3)
        }
        if (tranche[liste_type_de_questions[i] - 1] == 0) nombre = 0
      }
      if (this.sup == 1) {
        if (!est_diaporama) texte = `$${tex_nombre(nombre)}$ : \\dotfill`
        else texte = `$${tex_nombre(nombre)}$`
        if (!est_diaporama) texte_corr = `$${tex_nombre(nombre)}$ : ${nombreEnLettres(nombre)}.`
        else texte_corr = `${nombreEnLettres(nombre)}.`
      }
      else {
        if (!est_diaporama) texte = `${nombreEnLettres(nombre)} : \\dotfill`
        else texte = `${nombreEnLettres(nombre)}`
        if (!est_diaporama) texte_corr = `${nombreEnLettres(nombre)} : $${tex_nombre(nombre)}$.`
        else texte_corr = `$${tex_nombre(nombre)}$.`
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
  this.besoin_formulaire_numerique = ['Type d\'exercice', 2, '1 : Écrire en lettres un nombre donné en chiffres\n2 : Écrire en chiffres un nombre donné en lettres'];
  this.besoin_formulaire2_numerique = ['Niveau', 4, '1 : Élémentaire\n2 : Facile\n3 : Moyen\n4 : Difficile']
}

