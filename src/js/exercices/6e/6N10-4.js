import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, texNombre } from '../../modules/outils.js'
export const titre = 'Écrire correctement les grands nombres entiers'

/**
 * Supprimer les zéros inutiles, séparer les classes d'un nombre entier.
 * @author Jean-Claude Lhote
 * 6N10-4
 * Relecture : Novembre 2021 par EE
 */
export default function EcrireNombresEntiersFormates () {
  Exercice.call(this)
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.consigne = 'Écrire les nombres en chiffres en supprimant les zéros inutiles et en séparant les classes.'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    function zeroSuperflus (n) {
      const nzero = randint(0, 2); let nombrestring = n.toString()
      for (let k = 0; k < nzero; k++) nombrestring = '0' + nombrestring
      return nombrestring
    }
    for (
      let i = 0, texte, texteCorr, a, b, c, nombre, tranche, nombrestring, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      nombre = 0
      tranche = []
      while (nombre === 0) {
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
        if (tranche[2] === 0) nombre = 0
      }
      nombrestring = zeroSuperflus(nombre)
      if (context.vue !== 'diap') texte = `$${nombrestring}$ : \\dotfill`
      else texte = `$${nombrestring}$`
      if (context.vue !== 'diap') texteCorr = `$${nombrestring}=${texNombre(nombre)}$`
      else texteCorr = `${texNombre(nombre)}`
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
