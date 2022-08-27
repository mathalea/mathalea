import { randint, texNombre, contraindreValeur, listeQuestionsToContenu, shuffle2tableaux, combinaisonListesSansChangerOrdre } from '../../modules/outils.js'
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

function remplaceParZero (chaine, place) {
  try {
    const debut = chaine.substring(0, place - 1)
    const fin = chaine.substring(place)
    return debut + '0' + fin
  } catch (error) {
    console.log(`Problème dans remplaceParZero avec le nombre : ${chaine} et la position : ${place})`)
  }
}
/*!
 * @author Jean-Claude Lhote
 * Référence c3N10-1
 */
export const uuid = 'c96de'
export const ref = 'c3N10-1'
export default function RecomposerEntierC3 () {
  Exercice.call(this)
  this.nbQuestions = 4
  this.sup = 5 // nombre de chiffres minimum du nombre à décomposer
  this.sup2 = 7 // nombre de chiffres maximum du nombre à décomposer
  this.sup3 = '0-1-2-3-4-5-6-7-8-9-10-11-12-13'
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    const listeTypeDeQuestionsDemandees = this.sup3.toString().split('-')
    for (let k = 0; k < listeTypeDeQuestionsDemandees.length; k++) {
      listeTypeDeQuestionsDemandees[k] = contraindreValeur(0, 13, listeTypeDeQuestionsDemandees[k], 0)
    }
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(listeTypeDeQuestionsDemandees, this.nbQuestions)
    const nombreDeChiffresMin = contraindreValeur(3, 6, this.sup, 5)
    const nombreDeChiffresMax = contraindreValeur(nombreDeChiffresMin, 7, this.sup2, 6)
    this.nombreDeChamps = []
    this.premierChamp = []
    this.morceaux = []
    this.exposantMorceaux = []
    const glossaire = [['unité', 'unités'], ['dizaine', 'dizaines'], ['centaine', 'centaines'], ['mille', 'mille'], ['dizaine de mille', 'dizaines de mille'], ['centaine de mille', 'centaines de mille'], ['million', 'millions'], ['dizaine de millions', 'dizaines de millions']]
    for (let i = 0, cpt = 0, texte, texteCorr, indexChamp = 0, place; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      const nbChiffres = randint(nombreDeChiffresMin, nombreDeChiffresMax)
      let nombreStr = ''
      let nombre

      this.morceaux[i] = []
      this.exposantMorceaux[i] = []
      switch (listeTypeDeQuestions[i]) {
        case 0: // décomposition chiffre par chiffre dans l'ordre sans zéro
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr += `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) {
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
          }
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
        case 1: // décomposition chiffre par chiffre avec désordre sans zéros
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
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
        case 2: // décomposer en complétant les puissances de 10 sans désordre et sans zéros
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9, nombreStr).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les valeurs qui conviennent ($1, 10, 100,${texNombre('1000')},...$).<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr = `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
          }
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$)+`

                setReponse(this, indexChamp, 10 ** this.exposantMorceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times \\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 3: // décomposer en complétant les puissances de 10 avec désordre et sans zéros
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9, nombreStr).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les valeurs qui conviennent ($1, 10, 100,${texNombre('1000')},...$).<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr = `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$)+`
                setReponse(this, indexChamp, 10 ** this.exposantMorceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times \\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 4: // décomposition chiffre par chiffre en ordre avec zéros possibles
          for (let k = 0; k < nbChiffres; k++) {
            if (k === 0) nombreStr = randint(1, 9).toString()
            else nombreStr += randint(0, 9).toString()
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr += `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) {
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
          }
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.morceaux[i][k] !== '0') {
              if (this.interactif) {
                texte += `($${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$\\times${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
                setReponse(this, indexChamp, this.morceaux[i][k])
                indexChamp++
              } else {
                texte += `(\\ldots \\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

          break
        case 5: // décomposition chiffre par chiffre avec désordre avec zéros possibles
          for (let k = 0; k < nbChiffres; k++) {
            if (k === 0) nombreStr = randint(1, 9).toString()
            else nombreStr += randint(0, 9).toString()
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
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
                setReponse(this, indexChamp, this.morceaux[i][k])
                indexChamp++
              } else {
                texte += `(\\ldots \\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

          break
        case 6: // décomposer en complétant les puissances de 10 sans désordre et avec zéros possibles
          for (let k = 0; k < nbChiffres; k++) {
            if (k === 0) nombreStr = randint(1, 9).toString()
            else nombreStr += randint(0, 9, nombreStr).toString()
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les valeurs qui conviennent ($1, 10, 100,${texNombre('1000')},...$).<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr = `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
          }
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$)+`
                setReponse(this, indexChamp, 10 ** this.exposantMorceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times \\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${texNombre(10 ** this.exposantMorceaux[i][k], 0)}\\times ${this.morceaux[i][k]})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 7: // décomposer en complétant les puissances de 10 avec désordre et avec zéros possibles
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9, nombreStr).toString()
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les valeurs qui conviennent ($1, 10, 100,${texNombre('1000')},...$).<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr = `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$)+`
                setReponse(this, indexChamp, 10 ** this.exposantMorceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times \\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break

        case 8: // trouver le nombre sans groupement  en ordre sans zéros
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += 'Donner le nombre correspondant au premier membre de l\'égalité.<br>$'
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) {
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
          }
          texteCorr = '$'
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
        case 9: // trouver le nombre avec groupement en ordre sans zéros
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += 'Donner le nombre correspondant au premier membre de l\'égalité.<br>$'
          texteCorr = '$'
          this.premierChamp[i] = indexChamp
          for (let k = 0, j, index = 0; index < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            let testeur = 0
            do {
              testeur++
              j = randint(1, 3)
              this.morceaux[i][k] = nombreStr.substring(index, Math.min(index + j, nbChiffres)).replace(/^0+/g, '')
              this.exposantMorceaux[i][k] = nbChiffres - Math.min(index + j, nbChiffres)
            } while (this.morceaux[i][k] === '' && testeur < 100)
            if (testeur === 100) {
              window.notify('boucle sans fin detectée case 9 c3N10-1', { nombreStr })
            }
            index += j
          }
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.morceaux[i][k] !== '0') {
              texte += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$+`
              texteCorr += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$+`
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
        case 10: // trouver le nombre avec groupement en ordre avec zéros
          for (let k = 0, nombreDeZero = 0; k < nbChiffres; k++) {
            if (k === 0) nombreStr = randint(1, 9).toString()
            else nombreStr += randint(nombreDeZero > 1 || k === nbChiffres - 1 ? 1 : 0, 9).toString()
            if (nombreStr[nombreStr.length - 1] === '0') nombreDeZero++
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += 'Donner le nombre correspondant au premier membre de l\'égalité.<br>$'
          texteCorr = '$'
          this.premierChamp[i] = indexChamp
          for (let k = 0, j, index = 0; index < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            let testeur = 0
            do {
              j = randint(1, 3)
              testeur++
              this.morceaux[i][k] = nombreStr.substring(index, Math.min(index + j, nbChiffres)).replace(/^0+/g, '')
              this.exposantMorceaux[i][k] = nbChiffres - Math.min(index + j, nbChiffres)
            } while (this.morceaux[i][k] === '' && testeur < 100)
            if (testeur === 100) {
              window.notify('boucle sans fin detectée case 10 c3N10-1', { nombreStr })
            }
            index += j
          }
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.morceaux[i][k] !== '0') {
              texte += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$+`
              texteCorr += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$+`
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

        case 11: // Trouver le nombre sans groupement avec désordre avec zéros
          for (let k = 0; k < nbChiffres; k++) {
            if (k === 0) nombreStr = randint(1, 9).toString()
            else nombreStr += randint(0, 9).toString()
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr = `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `$${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })} ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]} $+`
                setReponse(this, indexChamp, this.morceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `\\ldots $ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]} $+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k]][Number(this.morceaux[i][k]) > 1 ? 1 : 0]} $+`
            }
          }
          texte = texte.substring(0, texte.length - 2)
          texteCorr = texteCorr.substring(0, texteCorr.length - 2)
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 12: // décomposer avec les puissances de 10 en désordre présence de deux zéros consécutifs
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9, nombreStr).toString()
          }
          place = randint(2, nbChiffres - 1)
          nombreStr = remplaceParZero(nombreStr, place)
          nombreStr = remplaceParZero(nombreStr, place + 1)
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les valeurs qui conviennent ($1, 10, 100,${texNombre('1000')},...$).<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr = `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$)+`
                setReponse(this, indexChamp, 10 ** this.exposantMorceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times \\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 13: // décomposer avec les puissances de 10 avec groupement et désordre et présence de deux zéros consécutifs
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9, nombreStr).toString()
          }
          place = randint(2, nbChiffres - 2)
          nombreStr = remplaceParZero(nombreStr, place)
          nombreStr = remplaceParZero(nombreStr, place + 1)
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre, 0)}$ en complétant avec les valeurs qui conviennent ($1, 10, 100,${texNombre('1000')},...$).<br>`
          texte += `$${texNombre(nombre, 0)}=`
          texteCorr = `$${texNombre(nombre, 0)}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0, j, index = 0; index < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            let testeur = 0
            do {
              testeur++
              j = randint(1, 3)
              this.morceaux[i][k] = nombreStr.substring(index, Math.min(index + j, nbChiffres)).replace(/^0+/g, '')
            } while (this.morceaux[i][k] === '' && testeur < 100)
            if (testeur === 100) {
              window.notify('boucle sans fin detectée case 13 c3N10-1', { nombreStr })
            }
            this.exposantMorceaux[i][k] = nbChiffres - Math.min(index + j, nbChiffres)
            index += j
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$)+`
                setReponse(this, indexChamp, 10 ** this.exposantMorceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `(${this.morceaux[i][k]}\\times \\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], 0)})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
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
  this.besoinFormulaire3Texte = ['Types de question séparés par des tirets', '0 : Chiffrée en ordre sans zéro\n1 : Chiffrée en désordre sans zéro\n2 : Puissances de dix en ordre sans zéro\n3 : Puissances de dix en désordre sans zéro\n4 : Chiffrée en ordre avec zéros possibles\n5 : Chiffrée en désordre avec zéros possibles\n6 : Puissances de dix en ordre avec zéros possibles\n7 : Puissances de dix en désordre avec zéros possibles\n8 : Trouver le nombre en ordre sans zéro\n9 : Trouver le nombre en désordre sans zéro avec groupement\n10 : Trouver le nombre en ordre avec zéros possibles avec groupement\n11 : Trouver le nombre en désordre avec zéros possibles\n12 : Puissances de dix en désordre deux zéros consécutifs sans groupement\n13 : Puissances de dix en désordre deux zéros consécutifs avec groupement']
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
