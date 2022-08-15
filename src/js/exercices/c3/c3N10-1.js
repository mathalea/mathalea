import { randint, texNombre, combinaisonListes, contraindreValeur, listeQuestionsToContenu } from '../../modules/outils.js'
import Exercice from '../Exercice.js'

import Decimal from 'decimal.js/decimal.mjs'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Recomposer un entier'
export const interactifReady = true
export const interactifType = 'custom'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '14/08/2022'

/*!
 * @author Jean-Claude Lhote
 * Référence c3N10-1
 */
export default function RecomposerEntierC3 () {
  Exercice.call(this)
  this.nbQuestions = 10
  this.sup = 5 // nombre de chiffres minimum du nombre à décomposer
  this.sup2 = 7 // nombre de chiffres maximum du nombre à décomposer
  this.sup3 = false // Décomposer (false) ou recomposer (true)
  this.sup4 = false // Difficulté : non mélangé (false) mélangé (true)
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    const listeTypeDeQuestionsDisponibles = this.sup3 ? [4, 5, 6] : [1, 2, 3]
    const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)

    const nombreDeChiffresMin = contraindreValeur(3, 6, this.sup, 5)
    const nombreDeChiffresMax = contraindreValeur(nombreDeChiffresMin, 7, this.sup2, 6)
    this.nombreDeChamps = []
    this.premierChamp = []
    for (let i = 0, cpt = 0, texte, texteCorr, indexChamp = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      const nombre = new Decimal(randint(10 ** nombreDeChiffresMin - 1, 10), randint(10 ** nombreDeChiffresMax - 1))
      const nombreStr = nombre.toString()
      const nbChiffres = nombreStr.length
      switch (listeTypeDeQuestions[i]) {
        case 1: // décomposition chiffre par chiffre
          texte += `Décomposer le nombre $${texNombre(nombre)}$ comme dans cet exemple : $203=100\\times 2+10\\times 0+3$.<br>`
          texte += `$${texNombre(nombre)}=`
          if (this.interactif) {
            this.premierChamp[i] = indexChamp
            for (let k = 0; k < nbChiffres - 1; k++) {
              texte += `${10 ** (nbChiffres - 1 - k)}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })} $+`
              setReponse(this, indexChamp, nombreStr[k])
              indexChamp++
            }
            texte += `$${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}`
            setReponse(this, indexChamp, nombreStr[nbChiffres - 1])
            indexChamp++
            this.nombreDeChamps[i] = nbChiffres
          } else {
            texte += '\\ldots\\ldots\\ldots$'
          }
          break
        case 2:
          texte += 'Compléter les vides avec les bonnes valeurs pour que l\'égalité soit juste.<br>'
          texte += `$${texNombre(nombre)}=`
          if (this.interactif) {
            this.premierChamp[i] = indexChamp
          }
          for (let k = 0; k < nbChiffres - 1; k++) {
            if (this.interactif) {
              texte += `${10 ** (nbChiffres - 1 - k)}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })} $+`
              setReponse(this, indexChamp, nombreStr[k])
              indexChamp++
            } else {
              texte += `${10 ** (nbChiffres - 1 - k)}\\times \\ldots + `
            }
          }
          if (this.interactif) {
            texte += ` $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}`
            setReponse(this, indexChamp, nombreStr[nbChiffres - 1])
            indexChamp++
            this.nombreDeChamps[i] = nbChiffres
          } else {
            texte += '\\ldots$'
          }
          break
        case 3:
          texte += 'Compléter les vides avec les bonnes expressions pour que l\'égalité soit juste.<br>'
          texte += `$${texNombre(nombre)}= ...$`
          break
        case 4:
          texte += 'Donne le nombre correspondant au premier membre de l\'égalité.<br>'
          break
        case 5:
          texte += 'Donne le nombre correspondant au premier membre de l\'égalité.<br>'
          break
        case 6:
          texte += 'Donne le nombre correspondant à la description qui en est faite.<br>'
          break
      }
      if (this.questionJamaisPosee(i, nombre)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Nombre de chiffres minimum des nombres à décomposer']
  this.besoinFormulaire2Numerique = ['Nombre de chiffres maximum des nombres à décomposer']

  this.correctionInteractive = (i) => {
    const champsTexte = []
    const saisies = []
    if (this.premierChamp[i] === undefined) return 'OK'
    const divFeedback = document.querySelector(`#resultatCheckEx${this.numeroExercice}Q${this.premierChamp[i] + this.nombreDeChamps[i] - 1}`)
    let resultatOK = true
    for (let k = 0; k < this.nombreDeChamps[i]; k++) {
      champsTexte[k] = document.getElementById(`champTexteEx${this.numeroExercice}Q${k + this.premierChamp[i]}`)
      saisies[k] = champsTexte[k].value.replace(',', '.').replace(/\((\+?-?\d+)\)/, '$1')
      resultatOK = resultatOK && saisies[k] === this.autoCorrection[this.premierChamp[i] + k].reponse.valeur[0]
    }
    if (resultatOK) {
      divFeedback.innerHTML = '😎'
      return 'OK'
    } else {
      divFeedback.innerHTML = '☹️'
      return 'KO'
    }
  }
}
