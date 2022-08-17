import { randint, texNombre, combinaisonListes, contraindreValeur, listeQuestionsToContenu, shuffle2tableaux } from '../../modules/outils.js'
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
    this.morceaux = []
    this.exposantMorceaux = []
    for (let i = 0, cpt = 0, texte, texteCorr, indexChamp = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      const nbChiffres = randint(nombreDeChiffresMin, nombreDeChiffresMax)
      let nombreStr = ''
      for (let k = 0; k < nbChiffres; k++) {
        if (k === 0) nombreStr = randint(1, 9).toString()
        else nombreStr += randint(0, 9, nombreStr.toString())
      }
      const nombre = new Decimal(nombreStr)
      this.morceaux[i] = []
      this.exposantMorceaux[i] = []
      switch (listeTypeDeQuestions[i]) {
        case 1: // décomposition chiffre par chiffre avec désordre
          if (this.interactif) {
            texte += `Décomposer le nombre $${texNombre(nombre)}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
          } else {
            texte += `Décomposer le nombre $${texNombre(nombre)}$.<br>`
          }
          texte += `$${texNombre(nombre)}=`
          texteCorr += `$${texNombre(nombre)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) {
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `${10 ** this.exposantMorceaux[i][k]}\\times ${this.morceaux[i][k]}+`
            }
          }
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$' // ici on a la correction ordonnée pour l'exo non interactif
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          if (this.interactif) {
            texteCorr = `$${texNombre(nombre)}=` // On modifie la correction en interactif
            for (let k = 0; k < nbChiffres; k++) {
              if (this.morceaux[i][k] !== '0') {
                texte += `${10 ** this.exposantMorceaux[i][k]}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })} $+`
                texteCorr += `${10 ** this.exposantMorceaux[i][k]}\\times ${this.morceaux[i][k]}+`
                setReponse(this, indexChamp, this.morceaux[i][k])
                indexChamp++
              }
            }
            texte = texte.substring(0, texte.length - 2)
            texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          } else {
            texte += '\\ldots\\ldots\\ldots$'
          }
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

          break
        case 2: // décomposer en complétant les puissances de 10

          texte += `Décomposer le nombre $${texNombre(nombre)}$ en complétant avec les puissances de dix qui conviennent.<br>`
          texte += `$${texNombre(nombre)}=`
          texteCorr = `$${texNombre(nombre)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
            if (this.morceaux[i][k] !== '0') {
              if (!this.interactif) {
                texteCorr += `${10 ** this.exposantMorceaux[i][k]}\\times ${this.morceaux[i][k]}+`
              }
            }
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < nbChiffres; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `$${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$\\times ${this.morceaux[i][k]}+`
                texteCorr += `${10 ** this.exposantMorceaux[i][k]}\\times ${this.morceaux[i][k]}+`
                setReponse(this, indexChamp, 10 ** this.exposantMorceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `\\ldots \\times ${this.morceaux[i][k]}+`
              }
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 3:
          this.premierChamp[i] = indexChamp
          texte += `Décomposer le nombre $${texNombre(nombre)}$ en complétant avec les puissances de dix qui conviennent.<br>`
          texte += `$${texNombre(nombre)}=`
          for (let k = 0, j, index = 0; index < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            j = randint(1, 3)
            this.morceaux[i][k] = nombreStr.substring(index, Math.min(index + j, nbChiffres))
            this.exposantMorceaux[i][k] = nbChiffres - Math.min(index + j, nbChiffres)
            if (this.morceaux[i][k] !== '0') {
              if (!this.interactif) {
                texteCorr += `${10 ** this.exposantMorceaux[i][k]}\\times ${this.morceaux[i][k].replace(/^0+/g, '')}+`
              }
            }
            index += j
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `$${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$\\times ${this.morceaux[i][k].replace(/^0+/g, '')}+`
                texteCorr += `${10 ** this.exposantMorceaux[i][k]}\\times ${this.morceaux[i][k].replace(/^0+/g, '')}+`
                setReponse(this, indexChamp, 10 ** this.exposantMorceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `\\ldots \\times ${this.morceaux[i][k]}+`
              }
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

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
      resultatOK = resultatOK && parseInt(saisies[k]) === parseInt(this.autoCorrection[this.premierChamp[i] + k].reponse.valeur[0])
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
