import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texNombre, nombreEnLettres } from '../../modules/outils.js'

import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Écrire un nombre en chiffres ou en lettres'

export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Lire un nombre / écrire un nombre : passer d'une écriture à une autre et inversement
 * On peut fixer la classe maximale : unités, miliers, millions, milliards
 * @author Jean-Claude Lhote
 * Référence 6N10-0 (anciennement 6N10)
 */

export default function EcrireNombresEntiers () {
  Exercice.call(this)
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = 3
  this.nouvelleVersion = function () {
    let typeDeConsigne = []
    if (parseInt(this.sup) === 1) {
      this.consigne = 'Écrire le nombre en lettres.'
      typeDeConsigne = combinaisonListes([1], this.nbQuestions)
    }
    if (parseInt(this.sup) === 2) {
      this.consigne = 'Écrire le nombre en chiffres.'
      typeDeConsigne = combinaisonListes([2], this.nbQuestions)
    }
    if (parseInt(this.sup) === 3) {
      this.consigne = 'Passer de l\'écriture en chiffres à celle en lettres et inversement.'
      typeDeConsigne = combinaisonListes([1, 2], this.nbQuestions)
    }
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestionsDisponibles
    if (parseInt(this.sup2) === 1) typesDeQuestionsDisponibles = [1, 1, 1, 2, 2]
    else if (parseInt(this.sup2) === 2) typesDeQuestionsDisponibles = [1, 2, 2, 2, 3]
    else if (parseInt(this.sup2) === 3) typesDeQuestionsDisponibles = [2, 2, 3, 3, 4]
    else typesDeQuestionsDisponibles = [2, 3, 3, 4, 4]

    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, b, c, nombre, tranche, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      nombre = 0
      tranche = []
      while (nombre === 0) {
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
        if (tranche[listeTypeDeQuestions[i] - 1] === 0) nombre = 0
      }
      if (typeDeConsigne[i] === 1) {
        setReponse(this, i, nombreEnLettres(nombre))
        if (context.vue !== 'diap') texte = `$${texNombre(nombre)} ${!this.interactif ? ' :  $' : '$ <br>' + ajouteChampTexteMathLive(this, i)}`
        else texte = `$${texNombre(nombre)}$`
        if (context.vue !== 'diap') texteCorr = `$${texNombre(nombre)}$ : ${nombreEnLettres(nombre)}`
        else texteCorr = `${nombreEnLettres(nombre)}`
      } else {
        setReponse(this, i, nombre)
        if (context.vue !== 'diap') texte = `${nombreEnLettres(nombre)} ${!this.interactif ? ' :  $' : '<br>' + ajouteChampTexteMathLive(this, i)}`
        else texte = `${nombreEnLettres(nombre)}`
        if (context.vue !== 'diap') texteCorr = `${nombreEnLettres(nombre)} : $${texNombre(nombre)}$`
        else texteCorr = `$${texNombre(nombre)}$`
      }
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
  this.besoinFormulaireNumerique = ['Type d\'exercices', 3, '1 : Écrire en lettres un nombre donné en chiffres\n2 : Écrire en chiffres un nombre donné en lettres\n3 : Passer d\'une écriture à l\'autre']
  this.besoinFormulaire2Numerique = ['Niveau', 4, '1 : Élémentaire (jusqu\'à la classe des milliers) \n2 : Facile (jusqu\'à la classe des millions)\n3 : Moyen (jusqu\'à la classe des milliards)\n4 : Difficile']
}
