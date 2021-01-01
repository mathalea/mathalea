import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,calcul,tex_nombre,nombreEnLettres} from "/modules/outils.js"
/**
 * Lire un nombre / écrire un nombre : passer d'une écriture à une autre et inversement
 * On peut fixer la classe maximale : unités, miliers, millions, milliards
 * @Auteur Jean-Claude Lhote
 * 6N23-0
 */

export default function Ecrire_nombres_decimal() {
  "use strict"
  Exercice.call(this)
  this.titre = "Écrire un nombre décimal en chiffres ou en lettres";
  this.nb_questions = 5;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1
  this.sup2 = 1
  this.nouvelle_version = function () {
    if (this.sup == 2)
      this.consigne = "Écrire le nombre en chiffres"
    else
      this.consigne = "Écrire le nombre en lettres"
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées 
    let type_de_questions_disponibles = [parseInt(this.sup2) + 1]; // <1 000, <1 000 000) 
    let liste_type_de_questions = combinaison_listes(
      type_de_questions_disponibles,
      this.nb_questions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texte_corr, a, b, c, nombre, tranche, part_ent, part_dec, nb_dec, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {

      nombre = 0
      tranche = []
      while (nombre == 0) {
        tranche.splice(0)
        part_ent = 0
        part_dec = 0
        for (let j = 0; j < liste_type_de_questions[i]; j++) {
          a = randint(1, 9)
          b = randint(1, 9)
          c = randint(1, 9)
          tranche.push(choice([0, 100, 20, 80, a, a * 100, a * 100 + b * 10 + c, a * 100 + 80 + b, a * 10, a * 100 + b * 10 + 1]))
        }
        for (let j = 1; j < liste_type_de_questions[i]; j++) {
          part_ent += tranche[j] * 10 ** ((j - 1) * 3)
          // nombre += tranche[j] * 10 ** ((j-1)*3)
        }
        part_dec = tranche[0]
        nombre = calcul(part_ent + part_dec / 1000)
        // if (tranche[liste_type_de_questions[i]-1]==0) nombre=0
        if (tranche[1] < 2) nombre = 0
        if (tranche[0] == 0) nombre = 0

      }
      if (part_dec % 10 != 0) nb_dec = 3
      else if (part_dec % 100 != 0) nb_dec = 2
      if (this.sup == 1) {
        if (!est_diaporama) texte = `$${tex_nombre(nombre)}$ : \\dotfill`
        else texte = `$${tex_nombre(nombre)}$`
        if (!est_diaporama) texte_corr = `$${tex_nombre(nombre)}$ : ${nombreEnLettres(nombre)}.`
        else texte_corr = `${nombreEnLettres(part_ent)} unités et ${nombreEnLettres(part_dec)}.`
      }
      else {
        if (!est_diaporama) texte = `${nombreEnLettres(part_ent)} unités et ${nombreEnLettres(part_dec)} : \\dotfill`
        else texte = `${nombreEnLettres(part_ent)} unités et ${nombreEnLettres(part_dec)}`
        if (!est_diaporama) texte_corr = `${nombreEnLettres(part_ent)} unités et ${nombreEnLettres(part_dec)} : $${tex_nombre(nombre)}$.`
        else texte_corr = `$${tex_nombre(nombre)}$.`
      }
      texte = texte.replace('et-un unités', 'et-une unités')
      texte_corr = texte_corr.replace('et-un unités', 'et-une unités')
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
  this.besoin_formulaire2_numerique = ['Classe maximum', 2, '1 : Unités\n2 : Milliers']
}

