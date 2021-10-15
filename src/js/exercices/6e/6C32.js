import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, calcul, choice, arrondiVirgule, texNombre, texPrix, arrondi } from '../../modules/outils.js'
import { setReponse, ajouteChampTexteMathLive } from '../../modules/gestionInteractif.js'

export const titre = 'Problème - Les courses'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * On achète 2 aliments dont on connait la masse (un en grammes et l'autre en kilogrammes) et le prix au kilogramme. Il faut calculer le prix total.
 * @author Rémi Angot
 * Référence 6C32
 */
export default function ProblemeCourse () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = false

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const prenom = choice([
      'Benjamin',
      'Léa',
      'Aude',
      'Julie',
      'Corinne',
      'Mehdi',
      'Joaquim'
    ])
    let masseEnKgDeAliment1
    if (this.sup) {
      masseEnKgDeAliment1 = randint(2, 5)
    } else {
      masseEnKgDeAliment1 = calcul(
        randint(2, 5) + randint(1, 9) / 10
      )
    }
    const prixAliment1 = calcul(randint(2, 4) + randint(1, 9) / 10)
    const aliment1 = choice(['courgettes', 'carottes', 'pommes'])
    let masseEnGdeAliment2

    let prixAliment2
    if (this.sup) {
      prixAliment2 = randint(15, 25)
      masseEnGdeAliment2 = randint(2, 7) * 500
    } else {
      prixAliment2 = calcul(randint(12, 23) + randint(1, 9) / 10)
      masseEnGdeAliment2 = randint(21, 97) * 10
    }
    const aliment2 = choice(['boeuf', 'veau', 'poulet'])

    let texte = `${prenom} achète ${texNombre(
      masseEnKgDeAliment1
    )} kg de ${aliment1} à ${texPrix(prixAliment1)} €/kg `
    texte += `et ${masseEnGdeAliment2} g de ${aliment2} à ${texPrix(
      prixAliment2
    )} €/kg. Quel est le prix total à payer ?`
    let texteCorr =
      `Prix des ${aliment1} : ${texNombre(
        masseEnKgDeAliment1
      )} kg × ${texPrix(prixAliment1)} €/kg = ${texPrix(
        calcul(masseEnKgDeAliment1 * prixAliment1)
      )} €` + '<br>'
    texteCorr +=
      `Prix du ${aliment2} : ${texNombre(calcul(masseEnGdeAliment2 / 1000))} kg × ${texPrix(prixAliment2)} €/kg = ${texNombre(calcul((masseEnGdeAliment2 * prixAliment2) / 1000))} € ` + '<br>'
    texteCorr += `Prix total à payer : ${texNombre(calcul(masseEnKgDeAliment1 * prixAliment1))} € + ${texNombre(calcul(masseEnGdeAliment2 * prixAliment2 / 1000))} €`
    if (Number.isInteger(calcul((masseEnKgDeAliment1 * prixAliment1 + (masseEnGdeAliment2 * prixAliment2) / 1000)) * 100)) {
      texteCorr += ' = '
    } else {
      texteCorr += ' ≈ '
    }
    texteCorr += `${arrondiVirgule(calcul(masseEnKgDeAliment1 * prixAliment1 + (masseEnGdeAliment2 * prixAliment2) / 1000))} €<br>`
    texteCorr += `<br><i>Le prix total aurait aussi pu être trouvé en un seul calcul</i> : ${texNombre(masseEnKgDeAliment1)} kg × ${texPrix(prixAliment1)} €/kg + ${texNombre(calcul(masseEnGdeAliment2 / 1000))} kg × ${texPrix(prixAliment2)} €/kg `
    if (Number.isInteger(calcul((masseEnKgDeAliment1 * prixAliment1 + (masseEnGdeAliment2 * prixAliment2) / 1000)) * 100)) {
      texteCorr += ' = '
    } else {
      texteCorr += ' ≈ '
    }
    texteCorr += `${arrondiVirgule(calcul(
        masseEnKgDeAliment1 * prixAliment1 +
        (masseEnGdeAliment2 * prixAliment2) / 1000
      )
    )} €<br>`

    if (!context.isHtml) {
      texteCorr =
        `Prix des ${aliment1} : $${texNombre(
          masseEnKgDeAliment1
        )}~\\text{kg}\\times${texPrix(
          prixAliment1
        )}~\\text{\\euro{}/kg} = ${texPrix(
          calcul(masseEnKgDeAliment1 * prixAliment1)
        )}~\\text{\\euro}$` + '<br>'
      texteCorr +=
        `Prix du ${aliment2} : $${texNombre(
          calcul(masseEnGdeAliment2 / 1000)
        )}~\\text{kg}\\times${texPrix(
          prixAliment2
        )}~\\text{\\euro{}/kg} = ${texNombre(
          calcul((masseEnGdeAliment2 * prixAliment2) / 1000)
        )}~\\text{\\euro}$` + '<br>'
      texteCorr += `Prix total à payer : $${texNombre(
        calcul(masseEnKgDeAliment1 * prixAliment1)
      )}~\\text{\\euro} + ${texNombre(
        calcul((masseEnGdeAliment2 * prixAliment2) / 1000)
      )}~\\text{\\euro}`
      if (Number.isInteger(calcul((masseEnKgDeAliment1 * prixAliment1 + (masseEnGdeAliment2 * prixAliment2) / 1000)) * 100)) {
        texteCorr += '='
      } else {
        texteCorr += '\\approx'
      }
      texteCorr += ` ${arrondiVirgule(
        calcul(
          masseEnKgDeAliment1 * prixAliment1 +
          (masseEnGdeAliment2 * prixAliment2) / 1000
        )
      )}~\\text{\\euro}$<br>`
    }

    // Pour tolérer l'écriture d'un somme avec des centimes, par exemple 54,1 € ou 54,10 €
    const reponse = arrondiVirgule(calcul(
      masseEnKgDeAliment1 * prixAliment1 +
      (masseEnGdeAliment2 * prixAliment2) / 1000
    ))
    const reponses = [reponse, `${reponse}0`]

    setReponse(this, 0, reponses)
    if (context.isAmc) {
      this.autoCorrection[0].reponse.valeur[0] = arrondi(masseEnKgDeAliment1 * prixAliment1 + (masseEnGdeAliment2 * prixAliment2) / 1000, 2)
      this.autoCorrection[0].reponse.param.digits = 5
      this.autoCorrection[0].reponse.param.decimals = 2
    }
    if (this.interactif) {
      texte += `<br> ${ajouteChampTexteMathLive(this, 0, 'largeur20 inline', { texteApres: ' €', texte: 'Le prix total à payer sera de ' })}`
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)

    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireCaseACocher = ['Calculs faciles']
}
