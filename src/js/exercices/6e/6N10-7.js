import { randint, texNombre, contraindreValeur, listeQuestionsToContenu, shuffle2tableaux, compteOccurences, rangeMinMax, combinaisonListes, combinaisonListesSansChangerOrdre, sp } from '../../modules/outils.js'
import Exercice from '../Exercice.js'

import Decimal from 'decimal.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { context } from '../../modules/context.js'
export const titre = 'Recomposer un décimal ou un entier'
export const interactifReady = true
export const interactifType = 'custom'
export const amcReady = true
export const amcType = 'AMCOpen'
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
export const uuid = 'f899b'
export const ref = '6N10-7'
export default function RecomposerEntierC3 () {
  Exercice.call(this)
  this.nbQuestions = 4
  this.sup = 5 // nombre de chiffres minimum du nombre à décomposer
  this.sup2 = 7 // nombre de chiffres maximum du nombre à décomposer
  this.sup3 = 5
  this.sup4 = 4

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let listeTypeDeQuestionsDemandees = this.sup3.toString().split('-')
    for (let k = 0; k < listeTypeDeQuestionsDemandees.length; k++) {
      listeTypeDeQuestionsDemandees[k] = contraindreValeur(1, 15, listeTypeDeQuestionsDemandees[k], 1)
    }
    if (compteOccurences(listeTypeDeQuestionsDemandees, 15) > 0) listeTypeDeQuestionsDemandees = rangeMinMax(1, 14)
    // const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDemandees, this.nbQuestions)
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(listeTypeDeQuestionsDemandees, this.nbQuestions)
    let listeNombresDemandes = this.sup4.toString().split('-')
    listeNombresDemandes[0] = contraindreValeur(0, 4, listeNombresDemandes[0], 4)
    if (listeNombresDemandes[0] === 4) listeNombresDemandes = rangeMinMax(0, 3)
    const nombreDeChiffresDec = combinaisonListes(listeNombresDemandes, this.nbQuestions)
    this.nombreDeChamps = []

    this.premierChamp = []
    this.morceaux = []
    this.exposantMorceaux = []
    const glossaire = [['millième', 'millièmes'], ['centième', 'centièmes'], ['dixième', 'dixièmes'], ['unité', 'unités'], ['dizaine', 'dizaines'], ['centaine', 'centaines'], ['mille', 'mille'], ['dizaine de mille', 'dizaines de mille'], ['centaine de mille', 'centaines de mille'], ['million', 'millions'], ['dizaine de millions', 'dizaines de millions']]
    for (let i = 0, cpt = 0, ee, nbChiffres, nombreDeChiffresMin, nombreDeChiffresMax, texte, texteCorr, indexChamp = 0, place; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      let nombreStr = ''
      let nombre

      this.morceaux[i] = []
      this.exposantMorceaux[i] = []
      nombreDeChiffresMin = contraindreValeur(nombreDeChiffresDec[i] + 3, 6, this.sup, 5)
      nombreDeChiffresMax = contraindreValeur(nombreDeChiffresMin, 7, this.sup2, nombreDeChiffresMin + 1)
      nbChiffres = randint(nombreDeChiffresMin, nombreDeChiffresMax)

      switch (listeTypeDeQuestions[i]) {
        case 1: // décomposition chiffre par chiffre dans l'ordre sans zéro
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
          texte += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          texteCorr += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) {
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k - nombreDeChiffresDec[i]
          }
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.morceaux[i][k] !== '0') {
              if (this.interactif) {
                texte += `($${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$\\times${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
                texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
                setReponse(this, indexChamp, this.morceaux[i][k])
                indexChamp++
              } else {
                texte += `(\\ldots \\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
                texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
              }
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

          break
        case 2: // décomposition chiffre par chiffre avec désordre sans zéros
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
          texte += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          texteCorr += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) {
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k - nombreDeChiffresDec[i]
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.morceaux[i][k] !== '0') {
              if (this.interactif) {
                texte += `($${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$\\times${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
                texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
                setReponse(this, indexChamp, this.morceaux[i][k])
                indexChamp++
              } else {
                texte += `(\\ldots \\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
                texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
              }
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

          break
        case 3: // décomposer en complétant les puissances de 10 sans désordre et sans zéros
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9, nombreStr).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$ en complétant avec les valeurs qui conviennent ($1, 10, 100` + (listeNombresDemandes === 0 ? `,${texNombre('1000')},...$).<br>``,${texNombre('1000')},...$).<br>` : `,... $ ou bien $${texNombre('0.1')}, ${texNombre('0.01')},...$).<br>`)
          texte += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          texteCorr = `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k - nombreDeChiffresDec[i]
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
                texte += `(${this.morceaux[i][k]}\\times \\ldots\\ldots\\ldots\\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 4: // décomposer en complétant les puissances de 10 avec désordre et sans zéros
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9, nombreStr).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$ en complétant avec les valeurs qui conviennent ($1, 10, 100` + (listeNombresDemandes === 0 ? `,${texNombre('1000')},...$).<br>``,${texNombre('1000')},...$).<br>` : `,... $ ou bien $${texNombre('0.1')}, ${texNombre('0.01')},...$).<br>`)
          texte += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          texteCorr = `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k - nombreDeChiffresDec[i]
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
                texte += `(${this.morceaux[i][k]}\\times \\ldots\\ldots\\ldots\\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 5: // décomposition chiffre par chiffre en ordre avec zéros possibles
          for (let k = 0; k < nbChiffres; k++) {
            if (k === 0) nombreStr = randint(1, 9).toString()
            else nombreStr += randint(0, 9).toString()
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
          texte += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          texteCorr += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) {
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k - nombreDeChiffresDec[i]
          }
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.morceaux[i][k] !== '0') {
              if (this.interactif) {
                texte += `($${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$\\times${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
                setReponse(this, indexChamp, this.morceaux[i][k])
                indexChamp++
              } else {
                texte += `(\\ldots \\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

          break
        case 6: // décomposition chiffre par chiffre avec désordre avec zéros possibles
          for (let k = 0; k < nbChiffres; k++) {
            if (k === 0) nombreStr = randint(1, 9).toString()
            else nombreStr += randint(0, 9).toString()
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
          texte += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          texteCorr += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) {
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k - nombreDeChiffresDec[i]
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length; k++) {
            if (this.morceaux[i][k] !== '0') {
              if (this.interactif) {
                texte += `($${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}$\\times${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
                setReponse(this, indexChamp, this.morceaux[i][k])
                indexChamp++
              } else {
                texte += `(\\ldots \\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

          break
        case 7: // décomposer en complétant les puissances de 10 sans désordre et avec zéros possibles
          for (let k = 0; k < nbChiffres; k++) {
            if (k === 0) nombreStr = randint(1, 9).toString()
            else nombreStr += randint(0, 9, nombreStr).toString()
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$ en complétant avec les valeurs qui conviennent ($1, 10, 100` + (listeNombresDemandes === 0 ? `,${texNombre('1000')},...$).<br>``,${texNombre('1000')},...$).<br>` : `,... $ ou bien $${texNombre('0.1')}, ${texNombre('0.01')},...$).<br>`)
          texte += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          texteCorr = `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k - nombreDeChiffresDec[i]
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
                texte += `(${this.morceaux[i][k]}\\times \\ldots\\ldots\\ldots\\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])}\\times ${this.morceaux[i][k]})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 8: // décomposer en complétant les puissances de 10 avec désordre et avec zéros possibles
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9, nombreStr).toString()
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$ en complétant avec les valeurs qui conviennent ($1, 10, 100` + (listeNombresDemandes === 0 ? `,${texNombre('1000')},...$).<br>``,${texNombre('1000')},...$).<br>` : `,... $ ou bien $${texNombre('0.1')}, ${texNombre('0.01')},...$).<br>`)
          texte += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          texteCorr = `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k - nombreDeChiffresDec[i]
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
                texte += `(${this.morceaux[i][k]}\\times \\ldots\\ldots\\ldots\\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break

        case 9: // trouver le nombre sans groupement  en ordre sans zéros
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += 'Donner le nombre correspondant à <br>$'
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) {
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k - nombreDeChiffresDec[i]
          }
          texteCorr = '$'
          for (let k = 0; k < this.morceaux[i].length - 1; k++) {
            if (this.morceaux[i][k] !== '0') {
              texte += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k] + 3][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$${sp(2)}+${sp(2)}`
              texteCorr += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k] + 3][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$${sp(2)}+${sp(2)}`
            }
          }
          ee = this.morceaux[i].length - 1
          texte += `${this.morceaux[i][ee]}$ ${glossaire[this.exposantMorceaux[i][ee] + 3][Number(this.morceaux[i][ee]) > 1 ? 1 : 0]}${sp(2)}`
          texteCorr += `${this.morceaux[i][ee]}$ ${glossaire[this.exposantMorceaux[i][ee] + 3][Number(this.morceaux[i][ee]) > 1 ? 1 : 0]}${sp(2)}`
          texteCorr += `$=${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$`
          if (!this.interactif) {
            texte += ' : $\\ldots\\ldots\\ldots$'
          } else {
            setReponse(this, indexChamp, nombre.div(10 ** nombreDeChiffresDec[i]))
            texte += ' :' + ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })
            indexChamp++
          }
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]

          break
        case 10: // trouver le nombre avec groupement en ordre sans zéros
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9).toString()
          }
          nombre = new Decimal(nombreStr)
          texte += 'Donner le nombre correspondant à <br>$'
          texteCorr = '$'
          this.premierChamp[i] = indexChamp
          for (let k = 0, j, index = 0; index < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            let testeur = 0
            do {
              j = randint(1, 3)
              testeur++
              this.morceaux[i][k] = nombreStr.substring(index, Math.min(index + j, nbChiffres)).replace(/^0+/g, '')
              this.exposantMorceaux[i][k] = nbChiffres - Math.min(index + j, nbChiffres) - nombreDeChiffresDec[i]
            } while (this.morceaux[i][k] === '' && testeur < 100)
            if (testeur === 100) {
              window.notify('boucle sans fin detectée case 10 6N10-7', { nombreStr })
            }
            index += j
          }
          for (let k = 0; k < this.morceaux[i].length - 1; k++) {
            if (this.morceaux[i][k] !== '0') {
              texte += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k] + 3][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$${sp(2)}+${sp(2)}`
              texteCorr += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k] + 3][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$${sp(2)}+${sp(2)}`
            }
          }
          ee = this.morceaux[i].length - 1
          texte += `${this.morceaux[i][ee]}$ ${glossaire[this.exposantMorceaux[i][ee] + 3][Number(this.morceaux[i][ee]) > 1 ? 1 : 0]}${sp(2)}`
          texteCorr += `${this.morceaux[i][ee]}$ ${glossaire[this.exposantMorceaux[i][ee] + 3][Number(this.morceaux[i][ee]) > 1 ? 1 : 0]}${sp(2)}`
          if (!this.interactif) {
            texte += ': $ \\ldots\\ldots\\ldots$'
          } else {
            setReponse(this, indexChamp, nombre.div(10 ** nombreDeChiffresDec[i]))
            texte += ':' + ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })
            indexChamp++
          }
          texteCorr += `$=${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$`
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 11: // trouver le nombre avec groupement en ordre avec zéros
          for (let k = 0, nombreDeZero = 0; k < nbChiffres; k++) {
            if (k === 0) nombreStr = randint(1, 9).toString()
            else nombreStr += randint(nombreDeZero > 1 || k === nbChiffres - 1 ? 1 : 0, 9).toString()
            if (nombreStr[nombreStr.length - 1] === '0') nombreDeZero++
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += 'Donner le nombre correspondant à <br>$'
          texteCorr = '$'
          this.premierChamp[i] = indexChamp
          for (let k = 0, j, index = 0; index < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            let testeur = 0
            do {
              j = randint(1, 3)
              testeur++
              this.morceaux[i][k] = nombreStr.substring(index, Math.min(index + j, nbChiffres)).replace(/^0+/g, '')
              this.exposantMorceaux[i][k] = nbChiffres - Math.min(index + j, nbChiffres) - nombreDeChiffresDec[i]
            } while (this.morceaux[i][k] === '' && testeur < 100)
            if (testeur === 100) {
              window.notify('boucle sans fin detectée case 11 6N10-7', { nombreStr })
            }
            index += j
          }
          for (let k = 0; k < this.morceaux[i].length - 1; k++) {
            if (this.morceaux[i][k] !== '0') {
              texte += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k] + 3][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$${sp(2)}+${sp(2)}`
              texteCorr += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k] + 3][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$${sp(2)}+${sp(2)}`
            }
          }
          ee = this.morceaux[i].length - 1
          texte += `${this.morceaux[i][ee]}$ ${glossaire[this.exposantMorceaux[i][ee] + 3][Number(this.morceaux[i][ee]) > 1 ? 1 : 0]}${sp(2)}`
          texteCorr += `${this.morceaux[i][ee]}$ ${glossaire[this.exposantMorceaux[i][ee] + 3][Number(this.morceaux[i][ee]) > 1 ? 1 : 0]}${sp(2)}`
          if (!this.interactif) {
            texte += ': $ \\ldots\\ldots\\ldots$'
          } else {
            setReponse(this, indexChamp, nombre.div(10 ** nombreDeChiffresDec[i]))
            texte += ' : ' + ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })
            indexChamp++
          }
          texteCorr += `$=${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$`
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break

        case 12: // Trouver le nombre sans groupement avec désordre avec zéros
          for (let k = 0; k < nbChiffres; k++) {
            if (k === 0) nombreStr = randint(1, 9).toString()
            else nombreStr += randint(0, 9).toString()
          }
          if (nombreStr.indexOf('0') === -1) {
            nombreStr = remplaceParZero(nombreStr, randint(1, nombreStr.length - 1))
          }
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$ en complétant avec les nombres (à un seul chiffre) qui conviennent.<br>`
          texte += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          texteCorr = `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k - nombreDeChiffresDec[i]
          }
          shuffle2tableaux(this.morceaux[i], this.exposantMorceaux[i])
          for (let k = 0; k < this.morceaux[i].length - 1; k++) {
            if (this.interactif) {
              if (this.morceaux[i][k] !== '0') {
                texte += `$${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })} ${glossaire[this.exposantMorceaux[i][k] + 3][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$${sp(2)}+${sp(2)}`
                setReponse(this, indexChamp, this.morceaux[i][k])
                indexChamp++
              }
            } else {
              if (this.morceaux[i][k] !== '0') {
                texte += `\\ldots $ ${glossaire[this.exposantMorceaux[i][k] + 3][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$${sp(2)}+${sp(2)}`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `${this.morceaux[i][k]}$ ${glossaire[this.exposantMorceaux[i][k] + 3][Number(this.morceaux[i][k]) > 1 ? 1 : 0]}$${sp(2)}+${sp(2)}`
            }
          }
          ee = this.morceaux[i].length - 1
          if (this.interactif) {
            if (this.morceaux[i][ee] !== '0') {
              texte += `$${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })} ${glossaire[this.exposantMorceaux[i][ee] + 3][Number(this.morceaux[i][ee]) > 1 ? 1 : 0]}${sp(2)}`
              setReponse(this, indexChamp, this.morceaux[i][ee])
              indexChamp++
            }
          } else {
            if (this.morceaux[i][ee] !== '0') {
              texte += `\\ldots $ ${glossaire[this.exposantMorceaux[i][ee] + 3][Number(this.morceaux[i][ee]) > 1 ? 1 : 0]}${sp(2)}`
            }
          }
          if (this.morceaux[i][ee] !== '0') {
            texteCorr += `${this.morceaux[i][ee]}$ ${glossaire[this.exposantMorceaux[i][ee] + 3][Number(this.morceaux[i][ee]) > 1 ? 1 : 0]}${sp(2)}`
          }
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 13: // décomposer avec les puissances de 10 en désordre présence de deux zéros consécutifs
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9, nombreStr).toString()
          }
          place = randint(2, nbChiffres - 1)
          nombreStr = remplaceParZero(nombreStr, place)
          nombreStr = remplaceParZero(nombreStr, place + 1)
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$ en complétant avec les valeurs qui conviennent ($1, 10, 100` + (listeNombresDemandes === 0 ? `,${texNombre('1000')},...$).<br>``,${texNombre('1000')},...$).<br>` : `,... $ ou bien $${texNombre('0.1')}, ${texNombre('0.01')},...$).<br>`)
          texte += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          texteCorr = `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0; k < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            this.morceaux[i][k] = nombreStr[k]
            this.exposantMorceaux[i][k] = nbChiffres - 1 - k - nombreDeChiffresDec[i]
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
                texte += `(${this.morceaux[i][k]}\\times \\ldots\\ldots\\ldots\\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
        case 14: // décomposer avec les puissances de 10 avec groupement et désordre et présence de deux zéros consécutifs
          for (let k = 0; k < nbChiffres; k++) {
            nombreStr += randint(1, 9, nombreStr).toString()
          }
          place = randint(2, nbChiffres - 2)
          nombreStr = remplaceParZero(nombreStr, place)
          nombreStr = remplaceParZero(nombreStr, place + 1)
          nombre = new Decimal(nombreStr)
          texte += `Décomposer le nombre $${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}$ en complétant avec les valeurs qui conviennent ($1, 10, 100` + (listeNombresDemandes === 0 ? `,${texNombre('1000')},...$).<br>``,${texNombre('1000')},...$).<br>` : `,... $ ou bien $${texNombre('0.1')}, ${texNombre('0.01')},...$).<br>`)
          texte += `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          texteCorr = `$${texNombre(nombre.div(10 ** nombreDeChiffresDec[i]), nombreDeChiffresDec[i])}=`
          this.premierChamp[i] = indexChamp
          for (let k = 0, j, index = 0; index < nbChiffres; k++) { // on prépare la correction pour l'exo non interactif
            let testeur = 0
            do {
              testeur++
              j = randint(1, 3)
              this.morceaux[i][k] = nombreStr.substring(index, Math.min(index + j, nbChiffres)).replace(/^0+/g, '')
            } while (this.morceaux[i][k] === '' && testeur < 100)
            if (testeur === 100) {
              window.notify('boucle sans fin detectée case 14 6N10-7', { nombreStr })
            }
            this.exposantMorceaux[i][k] = nbChiffres - Math.min(index + j, nbChiffres) - nombreDeChiffresDec[i]
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
                texte += `(${this.morceaux[i][k]}\\times \\ldots\\ldots\\ldots\\ldots)+`
              }
            }
            if (this.morceaux[i][k] !== '0') {
              texteCorr += `(${this.morceaux[i][k]}\\times ${texNombre(10 ** this.exposantMorceaux[i][k], nombreDeChiffresDec[i])})+`
            }
          }
          texte = texte.substring(0, texte.length - 1) + '$'
          texteCorr = texteCorr.substring(0, texteCorr.length - 1) + '$'
          this.nombreDeChamps[i] = indexChamp - this.premierChamp[i]
          break
      }

      if (context.isAmc) {
        this.autoCorrection[i] =
        {
          enonce: texte + '<br>',
          propositions: [
            {
              texte: texteCorr,
              statut: 1, // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
              sanscadre: true
            }
          ]
        }
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
  this.besoinFormulaire3Texte = ['Types de question séparés par des tirets', '1 : Chiffrée en ordre sans zéro\n2 : Chiffrée en désordre sans zéro\n3 : Puissances de dix en ordre sans zéro\n4 : Puissances de dix en désordre sans zéro\n5 : Chiffrée en ordre avec zéros possibles\n6 : Chiffrée en désordre avec zéros possibles\n7 : Puissances de dix en ordre avec zéros possibles\n8 : Puissances de dix en désordre avec zéros possibles\n9 : Trouver le nombre en ordre sans zéro\n11 : Trouver le nombre en désordre sans zéro avec groupement\n12 : Trouver le nombre en ordre avec zéros possibles avec groupement\n13 : Trouver le nombre en désordre avec zéros possibles\n14 : Puissances de dix en désordre deux zéros consécutifs sans groupement\n15 : Mélange']
  this.besoinFormulaire4Texte = ['Nombre de chiffres de la partie décimale', '0 : Aucun chiffre dans la partie décimale\n1 : Un seul chiffre dans la partie décimale\n2 : Que deux chiffres dans la partie décimale\n3 : Que trois chiffres dans la partie décimale\n4 : Mélange']
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
