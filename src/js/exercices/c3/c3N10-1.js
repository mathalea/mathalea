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
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    const listeTypeDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6]
    const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)

    const nombreDeChiffresMin = contraindreValeur(3, 6, this.sup, 5)
    const nombreDeChiffresMax = contraindreValeur(nombreDeChiffresMin, 7, this.sup2, 6)
    this.nombreDeChamps = []
    this.premierChamp = []
    this.morceaux = []
    this.exposantMorceaux = []
    const glossaire = [['unité', 'unités'], ['dizaine', 'dizaines'], ['centaine', 'centaines'], ['mille', 'mille'], ['dizaine de mille', 'dizaines de mille'], ['centaine de mille', 'centaines de mille'], ['million', 'millions'], ['dizaine de millions', 'dizaines de millions']]
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
          texte += `(1)Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr += `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) {
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.morceaux[i][k] !== '0') {
              if (this.interactif) {
                texte += `($${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$\\times${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
                texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
                setReponse(this, indexChamp, this.morceaux[i][k])
                indexChamp++
              } else {
                texte += `(\\ldots \\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
                texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
              }
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

          break
        case 2: // décomposer en complétant les puissances de 10

          texte += `(2)Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les valeurs qui conviennent ($1, 10, 100,${texNombre('1000')},...$).<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr = `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
            if (this.morceaux[i][k] !== '0') {
              if (!this.interactif) {
                texteCorr += `(${texNombre(10 ** this.exposantMorceaux[i][k], 0)}\\times ${this.morceaux[i][k]})+`
              }
            }
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$)+`
                texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
                setReponse(this, indexChamp, 10 ** this.exposantMorceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times \\ldots)+`
              }
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 3:
          this.premierChamp[i] = indexChamp
          texte += `(3)Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les valeurs qui conviennent ($1, 10, 100,${texNombre('1000')},...$).<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr += `$${texNombre(nombre, 0)}=`
          for (let k = 0, j, index = 0; index < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            j = randint(1, 3)
            this.morceaux[i][k] = nombreStr.substring(index, Math.min(index + j, nbChiffres))
            this.exposantMorceaux[i][k] = nbChiffres - Math.min(index + j, nbChiffres)
            if (this.morceaux[i][k] !== '0') {
              if (!this.interactif) {
                texteCorr += `(${this.morceaux[i][k].replace(/^0+/g, '')}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
              }
            }
            index += j
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k].replace(/^0+/g, '')}\\times$${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$)+`
                texteCorr += `(${this.morceaux[i][k].replace(/^0+/g, '')}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
                setReponse(this, indexChamp, 10 ** this.exposantMorceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k].replace(/^0+/g, '')}\\times \\ldots)+`
              }
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

          break
        case 4:
          texte += '(4)Donner le nombre correspondant au premier membre de l\'égalité.<br>$'
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) {
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
          }
          texteCorr = '$'
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.morceaux[i][k] !== '0') {
              texte += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$+`
              texteCorr += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$+`
            }
          }
          texte = texte.substring(0, texte.length - 2)
          texteCorr = texteCorr.substring(0, texteCorr.length - 2)
          texteCorr += `$=${texNombre(nombre, 0)}$`
          if (!this.interactif) {
            texte += '$= \\ldots\\ldots\\ldots$'
          } else {
            setReponse(this, indexChamp, nombre)
            texte += '$=$' + ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })
            indexChamp++
          }
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

          break
        case 5:
          texte += '(5)Donner le nombre correspondant au premier membre de l\'égalité.<br>$'
          texteCorr = '$'

          this.premierChamp[i] = indexChamp
          for (let k = 0, j, index = 0; index < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            j = randint(1, 3)
            this.morceaux[i][k] = nombreStr.substring(index, Math.min(index + j, nbChiffres))
            this.exposantMorceaux[i][k] = nbChiffres - Math.min(index + j, nbChiffres)
            index += j
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.morceaux[i][k] !== '0') {
              texte += `${this.morceaux[i][k].replace(/^0+/g, '')}$ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$+`
              texteCorr += `${this.morceaux[i][k].replace(/^0+/g, '')}$ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$+`
            }
          }
          texte = texte.substring(0, texte.length - 2)
          texteCorr = texteCorr.substring(0, texteCorr.length - 2)
          if (!this.interactif) {
            texte += '$ = \\ldots\\ldots\\ldots$'
          } else {
            setReponse(this, indexChamp, nombre)
            texte += '$=$' + ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })
            indexChamp++
          }
          texteCorr += `$=${texNombre(nombre, 0)}$`
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 6:
          texte += `(6)Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr = `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
            if (this.morceaux[i][k] !== '0') {
              if (!this.interactif) {
                texteCorr += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]} $+`
              }
            }
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `$${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })} ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]} $+`
                texteCorr += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]} $+`
                setReponse(this, indexChamp, this.morceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `\\ldots $ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]} $+`
              }
            }
          }
          texte = texte.substring(0, texte.length - 2)
          texteCorr = texteCorr.substring(0, texteCorr.length - 2)
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
      }
      texte += `<div id=divDuSmiley${this.numeroExercice}Q${i} style= "display: inline-block"></div>`
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
    const divFeedback = document.querySelector(`#divDuSmiley${this.numeroExercice}Q${i}`)
    let resultatOK = true
    for (let k = 0; k < this.nombreDeChamps[i]; k++) {
      champsTexte[k] = document.getElementById(`champTexteEx${this.numeroExercice}Q${k + this.premierChamp[i]}`)
      saisies[k] = champsTexte[k].value.replace(',', '.').replace(/\((\+?-?\d+)\)/, '$1')
      resultatOK = resultatOK && parseInt(saisies[k]) === parseInt(this.autoCorrection[this.premierChamp[i] + k].reponse.valeur[0])
    }
    if (resultatOK) {
      divFeedback.innerHTML += '😎'
      return 'OK'
    } else {
      divFeedback.innerHTML += '☹️'
      return 'KO'
    }
  }
}
