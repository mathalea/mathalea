import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,calcul,texNombre,nombreEnLettres} from '../../modules/outils.js'
export const titre = 'Écrire un nombre décimal en chiffres ou en lettres'

/**
 * Lire un nombre / écrire un nombre : passer d'une écriture à une autre et inversement
 * On peut fixer la classe maximale : unités, miliers, millions, milliards
 * @Auteur Jean-Claude Lhote
 * 6N23-0
 */

export default function Ecrire_nombres_decimal() {
  "use strict"
  Exercice.call(this)
  this.titre = titre;
  this.nbQuestions = 5;
  this.nbCols = 1;
  this.nbColsCorr = 1;
  this.sup = 1
  this.sup2 = 1
  this.nouvelleVersion = function () {
    if (this.sup == 2)
      this.consigne = "Écrire le nombre en chiffres"
    else
      this.consigne = "Écrire le nombre en lettres"
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées 
    let type_de_questions_disponibles = [parseInt(this.sup2) + 1]; // <1 000, <1 000 000) 
    let liste_type_de_questions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, b, c, nombre, tranche, part_ent, part_dec, nb_dec, cpt = 0;
      i < this.nbQuestions && cpt < 50;

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
        if (!est_diaporama) texte = `$${texNombre(nombre)}$ : \\dotfill`
        else texte = `$${texNombre(nombre)}$`
        if (!est_diaporama) texteCorr = `$${texNombre(nombre)}$ : ${nombreEnLettres(nombre)}.`
        else texteCorr = `${nombreEnLettres(part_ent)} unités et ${nombreEnLettres(part_dec)}.`
      }
      else {
        if (!est_diaporama) texte = `${nombreEnLettres(part_ent)} unités et ${nombreEnLettres(part_dec)} : \\dotfill`
        else texte = `${nombreEnLettres(part_ent)} unités et ${nombreEnLettres(part_dec)}`
        if (!est_diaporama) texteCorr = `${nombreEnLettres(part_ent)} unités et ${nombreEnLettres(part_dec)} : $${texNombre(nombre)}$.`
        else texteCorr = `$${texNombre(nombre)}$.`
      }
      texte = texte.replace('et-un unités', 'et-une unités')
      texteCorr = texteCorr.replace('et-un unités', 'et-une unités')
      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = ['Type d\'exercice', 2, '1 : Écrire en lettres un nombre donné en chiffres\n2 : Écrire en chiffres un nombre donné en lettres'];
  this.besoin_formulaire2_numerique = ['Classe maximum', 2, '1 : Unités\n2 : Milliers']
}

