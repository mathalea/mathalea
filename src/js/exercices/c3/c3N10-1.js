import { randint, texNombre, combinaisonListes, contraindreValeur, listeQuestionsToContenu } from '../../modules/outils.js'
import Exercice from '../Exercice.js'

import Decimal from 'decimal.js/decimal.mjs'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
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
    const listeTypeDeQuestionsDisponibles = this.sup3 ? [4, 5, 6] : [1, 2, 3]
    const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)

    const nombreDeChiffresMin = contraindreValeur(3, 6, this.sup, 5)
    const nombreDeChiffresMax = contraindreValeur(nombreDeChiffresMin, 7, this.sup2, 6)
    const nombreDeChamps = []
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
            for (let k = 0; k < nbChiffres; k++) {
              if (this.interactif) {
                texte += `${10 ** (nbChiffres - k)}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })} $+`
              } else {
                texte += `${10 ** (nbChiffres - k)}\\times \\ldots + `
              }
              indexChamp++
            }
            if (this.interactif) {
              texte += `$${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}`
            } else {
              texte += '\\ldots$'
            }
            nombreDeChamps[i] = nbChiffres
          } else {
            texte += '\\ldots\\ldots\\ldots$'
          }
          break
        case 2:
          texte += 'Compléter les vides avec les bonnes valeurs pour que l\'égalité soit juste.<br>'
          texte += `$${texNombre(nombre)}=`
          for (let k = 0; k < nbChiffres; k++) {
            if (this.interactif) {
              texte += `${10 ** (nbChiffres - k)}\\times $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })} $+`
            } else {
              texte += `${10 ** (nbChiffres - k)}\\times \\ldots + `
            }
            indexChamp++
          }
          if (this.interactif) {
            texte += ` $${ajouteChampTexteMathLive(this, indexChamp, 'inline', { tailleExtensible: true })}`
          } else {
            texte += '\\ldots$'
          }
          nombreDeChamps[i] = nbChiffres
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
}
