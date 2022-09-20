import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, shuffle } from '../../modules/outils.js'
import { choixDeroulant } from '../../modules/interactif/questionListeDeroulante.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Connaître les préfixes utilisés dans les unités'
export const interactifReady = true
export const interactifType = 'listeDeroulante'

export const dateDePublication = '17/09/2022'

/**
 * Associer les préfixes à leur opération correspondante
 * @author Rémi Angot
 * Référence 6N13-0
 */
export const uuid = '5d1e2'
export const ref = '6N13-0'
export default class sensDesPrefixes extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 4
    this.nbCols = 1
    this.nbColsCorr = 1
    this.sup = 1
    this.sup2 = 1
    this.besoinFormulaireNumerique = ['Type de questions', 3, '1 : Donner la signification du préfixe\n2 : Donner le préfixe correspondant\n3 : Mélange']
    this.besoinFormulaire2Numerique = ['Choix des préfixes', 2, '1 : De milli à kilo\n2 : De nano à téra']
  }

  nouvelleVersion (numeroExercice) {
    this.consigne = 'Compléter '
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    if (this.sup === 1) this.consigne += 'avec le calcul correspondant.'
    if (this.sup === 2) this.consigne += 'avec le préfixe correspondant.'
    if (this.sup === 3) this.consigne += 'avec le calcul ou le préfixe correspondant.'
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let typeQuestionsDisponibles
    if (this.sup === 1) {
      typeQuestionsDisponibles = ['OnPartDuPrefixe']
    } else if (this.sup === 2) {
      typeQuestionsDisponibles = ['OnPartDuCalcul']
    } else {
      typeQuestionsDisponibles = ['OnPartDuPrefixe', 'OnPartDuCalcul']
    }

    let listeDePrefixesDisponibles = [
      ['milli', '\\div 1~000', '\\times 10^{-3}'],
      ['centi', '\\div 100', '\\times 10^{-2}'],
      ['déci', '\\div 10', '\\times 10^{-1}'],
      ['déca', '\\times 10', '\\times 10'],
      ['hecto', '\\times 100', '\\times 10^{2}'],
      ['kilo', '\\times 1~000', '\\times 10^{3}']
    ]
    if (this.sup2 === 2) {
      listeDePrefixesDisponibles = [
        ['nano', '\\div 1~000~000~000', '\\times 10^{-9}'],
        ['micro', '\\div 1~000~000', '\\times 10^{-6}'],
        ...listeDePrefixesDisponibles,
        ['Méga', '\\times 1~000~000', '\\times 10^{6}'],
        ['Giga', '\\times 1~000~000~000', '\\times 10^{9}'],
        ['Téra', '\\times 1~000~000~000~000', '\\times 10^{12}']
      ]
    }
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    const listePrefixes = combinaisonListes(listeDePrefixesDisponibles, this.nbQuestions)
    const choixDeroulantprefixes = listeDePrefixesDisponibles.map(p => p[0])
    const choixDeroulantCalculs = listeDePrefixesDisponibles.map(p => p[1].replace('\\div', '÷').replace('\\times', '✕').replaceAll('~', ' '))

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const prefixe = listePrefixes[i][0]
      const calcul = listePrefixes[i][1]
      switch (listeTypeQuestions[i]) {
        case 'OnPartDuPrefixe':
          texte = `${prefixe} : $\\dotfill$`
          texteCorr = `${prefixe} : $${calcul}$`
          if (this.interactif) texte += choixDeroulant(this, i, 0, choixDeroulantCalculs, false)
          setReponse(this, i, calcul.replace('\\div', '÷').replace('\\times', '✕').replaceAll('~', ' '))
          break
        case 'OnPartDuCalcul':
          texte = `$${calcul}$ : $\\dotfill$`
          texteCorr = `$${calcul}$ : ${prefixe}`
          if (this.interactif) texte += choixDeroulant(this, i, 0, shuffle(choixDeroulantprefixes), false)
          setReponse(this, i, prefixe)
          break
      }
      if (this.questionJamaisPosee(i, prefixe)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
