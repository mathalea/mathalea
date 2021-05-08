import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,choice,combinaisonListes,texNombre,nombreEnLettres} from '../../modules/outils.js'
export const titre = 'Écrire un nombre en chiffres ou en lettres'

/**
 * Lire un nombre / écrire un nombre : passer d'une écriture à une autre et inversement
 * On peut fixer la classe maximale : unités, miliers, millions, milliards
 * @Auteur Jean-Claude Lhote
 * Référence 6N10
 */

export default function Ecrire_nombres_entiers() {
  "use strict"
  Exercice.call(this)
  this.titre = titre;
  this.nbQuestions = 5;
  this.nbCols = 1;
  this.nbColsCorr = 1;
  this.sup = 1
  this.sup2 = 3
  this.nouvelleVersion = function () {
    if (this.sup == 2)
      this.consigne = "Écrire le nombre en chiffres"
    else
      this.consigne = "Écrire le nombre en lettres"
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées 
    let type_de_questions_disponibles;
    if (this.sup2 == 1) type_de_questions_disponibles = [1, 1, 1, 2, 2]
    else if (this.sup2 == 2) type_de_questions_disponibles = [1, 2, 2, 2, 3]
    else if (this.sup2 == 3) type_de_questions_disponibles = [2, 2, 3, 3, 4]
    else type_de_questions_disponibles = [2, 3, 3, 4, 4]

    let listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ); // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, b, c, nombre, tranche, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {

      nombre = 0
      tranche = []
      while (nombre == 0) {
        tranche.splice(0)
        for (let j = 0; j < listeTypeDeQuestions[i]; j++) {
          a = randint(1, 9)
          b = randint(1, 9)
          c = randint(1, 9)
          tranche.push(choice([0, 100, 20, 80, a, a * 100, a * 100 + b * 10 + c, a * 100 + 80 + b, a * 10, a * 100 + b * 10 + 1]))
        }
        for (let j = 0; j < listeTypeDeQuestions[i]; j++) {
          nombre += tranche[j] * 10 ** (j * 3)
        }
        if (tranche[listeTypeDeQuestions[i] - 1] == 0) nombre = 0
      }
      if (this.sup == 1) {
        if (!est_diaporama) texte = `$${texNombre(nombre)}$ : \\dotfill`
        else texte = `$${texNombre(nombre)}$`
        if (!est_diaporama) texteCorr = `$${texNombre(nombre)}$ : ${nombreEnLettres(nombre)}.`
        else texteCorr = `${nombreEnLettres(nombre)}.`
      }
      else {
        if (!est_diaporama) texte = `${nombreEnLettres(nombre)} : \\dotfill`
        else texte = `${nombreEnLettres(nombre)}`
        if (!est_diaporama) texteCorr = `${nombreEnLettres(nombre)} : $${texNombre(nombre)}$.`
        else texteCorr = `$${texNombre(nombre)}$.`
      }
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
  this.besoinFormulaire2Numerique = ['Niveau', 4, '1 : Élémentaire\n2 : Facile\n3 : Moyen\n4 : Difficile']
}

