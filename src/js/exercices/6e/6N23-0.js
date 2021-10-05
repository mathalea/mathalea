import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombre, nombreEnLettres } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif'
export const titre = 'Écrire un nombre décimal en chiffres ou en lettres'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Lire un nombre / écrire un nombre : passer d'une écriture à une autre et inversement
 * On peut fixer la classe maximale : unités, miliers, millions, milliards
 * @author Jean-Claude Lhote
 * 6N23-0
 */

export default function EcrireNombresDecimal () {
  Exercice.call(this)
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = 1
  this.sup3 = 3
  this.nouvelleVersion = function () {
    if (context.isAmc) {
      this.sup = 2
      this.sup2 = 1
    }
    if (parseInt(this.sup) === 2) { this.consigne = 'Écrire le nombre en chiffres.' } else { this.consigne = 'Écrire le nombre en lettres.' }

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDemandees = parseInt(this.sup2) + 1 // <1 000, <1 000 000)
    let typesDeQuestionsDisponibles
    if (this.sup3 === 1) {
      typesDeQuestionsDisponibles = [2]
    } else if (this.sup3 === 2) {
      typesDeQuestionsDisponibles = [1]
    } else {
      typesDeQuestionsDisponibles = [1, 2]
    }
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (
      let i = 0, texte, texteCorr, a, b, c, type, nombre, tranche, partEnt, partDec, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      type = listeTypeDeQuestions[i]
      nombre = 0
      tranche = []
      while (nombre === 0) {
        tranche.splice(0)
        partEnt = 0
        partDec = 0
        for (let j = 0; j < typesDeQuestionsDemandees; j++) {
          a = randint(1, 9)
          b = randint(1, 9)
          c = randint(1, 9)
          tranche.push(choice([0, 100, 20, 80, a, a * 100, a * 100 + b * 10 + c, a * 100 + 80 + b, a * 10, a * 100 + b * 10 + 1]))
        }
        for (let j = 1; j < typesDeQuestionsDemandees; j++) {
          partEnt += tranche[j] * 10 ** ((j - 1) * 3)
          // nombre += tranche[j] * 10 ** ((j-1)*3)
        }
        partDec = tranche[0]
        nombre = calcul(partEnt + partDec / 1000)
        // if (tranche[listeTypeDeQuestions[i]-1]==0) nombre=0
        if (tranche[1] < 2) nombre = 0
        if (tranche[0] === 0) nombre = 0
      }
      if (parseInt(this.sup) === 1) {
        if (!context.isDiaporama) texte = `$${texNombre(nombre)}$ : \\dotfill`
        else texte = `$${texNombre(nombre)}$`
        if (!context.isDiaporama) texteCorr = `$${texNombre(nombre)}$ : ${nombreEnLettres(nombre, type)}.`
        else texteCorr = `${nombreEnLettres(nombre, type)}.`
      } else {
        if (!context.isDiaporama) texte = ` ${nombreEnLettres(nombre, type)} : \\dotfill`
        else texte = ` ${nombreEnLettres(nombre, type)}`
        if (!context.isDiaporama) texteCorr = ` ${nombreEnLettres(nombre, type)} : $${texNombre(nombre)}$.`
        else texteCorr = `$${texNombre(nombre)}$.`
      }
      texte = texte.replace('et-un unités', 'et-une unités')
      texteCorr = texteCorr.replace('et-un unités', 'et-une unités')
      setReponse(this, i, nombre)
      this.autoCorrection[i].reponse.param.digits = 6
      this.autoCorrection[i].reponse.param.decimals = 3
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
  this.besoinFormulaireNumerique = ['Type d\'exercices', 2, '1 : Écrire en lettres un nombre donné en chiffres\n2 : Écrire en chiffres un nombre donné en lettres']
  this.besoinFormulaire2Numerique = ['Classe maximum', 2, '1 : Unités\n2 : Milliers']
  this.besoinFormulaire3Numerique = ['Type d\'écriture', 3, '1 : Écriture avec le mot virgule\n2 : Ériture sans le mot virgule\n3 : Mélange']
}
