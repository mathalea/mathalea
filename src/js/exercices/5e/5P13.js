import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, choice, prenomM, prenomF, rangeMinMax, compteOccurences, contraindreValeur, combinaisonListes, sp, quotientier, texNombre, texFraction, miseEnEvidence, arrondi, texteEnCouleurEtGras, stringNombre } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import FractionX from '../../modules/FractionEtendue.js'
import { min } from 'mathjs'
import Grandeur from '../../modules/Grandeur.js'
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Utiliser ou trouver des échelles d\'un plan'

// Gestion de la date de publication initiale
export const dateDePublication = '10/08/2022'

/**
 * Utiliser ou trouver des échelles dans diverses situations
 * @author Eric Elter
* Référence 5P13
 */
export const uuid = 'edb61'
export const ref = '5P13'
export default function EchellesProblemes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 4
  this.titre = titre
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 3

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    // Ebauche de la consigne en fonction des possibilités
    const chaqueCe = ['chaque', 'ce']
    this.consigne = 'Résouds '
    this.consigne += this.nbQuestions === 1 ? chaqueCe[1] : chaqueCe[0]
    this.consigne += ' problème, lié à une échelle sur un plan.'
    // Fin de l'ébauche de la consigne en fonction des possibilités

    let listeDesProblemes = []
    if (!this.sup) { // Si aucune liste n'est saisie
      listeDesProblemes = rangeMinMax(1, 4)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        listeDesProblemes[0] = contraindreValeur(1, 4, this.sup, 4)
      } else {
        listeDesProblemes = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeDesProblemes.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          listeDesProblemes[i] = contraindreValeur(1, 4, parseInt(listeDesProblemes[i]), 4) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(listeDesProblemes, 4) > 0) listeDesProblemes = rangeMinMax(1, 3) // Teste si l'utilisateur a choisi tout
    listeDesProblemes = combinaisonListes(listeDesProblemes, this.nbQuestions)
    const FamilleH = ['père', 'frère', 'cousin', 'grand-père', 'voisin']
    const FamilleF = ['mère', 'sœur', 'cousine', 'grand-mère', 'tante', 'voisine']
    const Famille = []
    for (let ee = 0; ee < FamilleH.length; ee++) {
      Famille.push([FamilleH[ee], 'son', 'du'])
    }
    for (let ee = FamilleH.length; ee < FamilleH.length + FamilleF.length; ee++) {
      Famille.push([FamilleF[[ee - FamilleH.length]], 'sa', 'de la'])
    }
    const Echelle = [[100], [200], [250], [1000], [1500], [5000], [100000], [200000], [250000], [2000000], [2500000], [5000000]]
    const Lieux = ['de la maison', 'du quartier', 'de la ville', 'du pays']
    for (let ee = 0; ee < Echelle.length; ee++) {
      Echelle[ee].push(Lieux[quotientier(ee, 3)])
    }
    const tableauUnites = ['mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km']
    for (
      let i = 0, unite1, unite2, echelleQ, echelleQUnite2, nb1, nb1Unite1, nb2, nb2Unite2, nb2Unite1, quidam, quidam2, texte, texteCorr, reponse;
      i < this.nbQuestions;
      i++
    ) {
      texte = ''
      texteCorr = ''
      switch (listeDesProblemes[i]) {
        case 1 :
          quidam = choice(Famille)
          quidam2 = choice([prenomF(), prenomM()])
          nb1 = choice(rangeMinMax(3, 17, [10])) // nb1 est le nombre de mm
          unite1 = tableauUnites[Math.floor(Math.log10(nb1))] // unite1 est l'unité d'usage de nb1 (mm ou cm)
          nb1Unite1 = nb1 / Math.pow(10, min(Math.floor(Math.log10(nb1)))) // nb1Unite1 vaut nb1 dans l'unite1
          echelleQ = choice(Echelle) // echelle choisie pour cette question
          nb2 = nb1 * echelleQ[0] // nb2 est la distance réelle en mm
          unite2 = tableauUnites[Math.floor(min(Math.log10(nb2), 6))] // unite2 est l'unité d'usage de nb2 (m, dam, hm ou km)
          nb2Unite1 = arrondi(nb2 / Math.pow(10, min(Math.floor(Math.log10(nb1)), 6)), 3) // nb2Unite1 vaut nb2 dans l'unite1
          nb2Unite2 = arrondi(nb2 / Math.pow(10, min(Math.floor(Math.log10(echelleQ[0])), 6)), 3) // nb2Unite2 vaut nb2 dans l'unite2
          reponse = new FractionX(nb1, nb2)
          texte += `Sur le plan ${echelleQ[1]} de  ${quidam[1]} ${quidam[0]}, ${quidam2} constate que $${texNombre(nb1Unite1)}$ ${unite1} sur le plan correspond à $${texNombre(nb2Unite2)}$ ${unite2} dans la réalité.`
          texte += ' Quelle est l\'échelle du plan ? '
          texteCorr += `$${texNombre(nb1Unite1, 2)}$ ${unite1} sur le plan représente $${texNombre(nb2Unite2, 2)}$ ${unite2} dans la réalité. `
          texteCorr += `Pour trouver l'échelle, il faut, d'abord, mettre ces deux distances dans la même unité.<br>Choisissons la plus petite des deux, soit le ${unite1}, et ainsi $${texNombre(nb2Unite2, 2)}$ ${unite2} = $${texNombre(nb2Unite1)}$ ${unite1}.<br>`
          texteCorr += `$${texNombre(nb1Unite1, 2)}$ ${unite1} sur le plan représente alors $${texNombre(nb2Unite1, 2)}$ ${unite1} dans la réalité et l'échelle du plan est donc de $${texFraction(nb1Unite1, nb2Unite1)}.$<br>`
          texteCorr += 'Cette réponse est acceptée mais on a l\'habitude de trouver une fraction avec numérateur et dénominateur entiers et si possible, dont l\'un des deux est égal à 1.<br>'
          texteCorr += `Or, $${texFraction(nb1Unite1, nb2Unite1)}=${texFraction(texNombre(nb1Unite1) + sp(2) + miseEnEvidence('\\div ' + sp(2) + texNombre(nb1Unite1), 'blue'), texNombre(nb2Unite1, 2) + sp(2) + miseEnEvidence('\\div ' + sp(2) + texNombre(nb1Unite1, 2), 'blue'))}=${reponse.simplifie().texFraction}$. `
          texteCorr += `Donc l'échelle du plan ${echelleQ[1]}  ${quidam[2]} ${quidam[0]} de ${quidam2} est de : $${texFraction(miseEnEvidence(1), miseEnEvidence(texNombre(reponse.simplifie().den)))}$.<br>`
          texteCorr += `Remarque : cela signifie que, sur le plan ${echelleQ[1]}  ${quidam[2]} ${quidam[0]} de ${quidam2}, $1$ ${unite1} représente $${texNombre(reponse.simplifie().den)}$ ${unite1} en réalité, et donc $1$ ${unite1} représente $${texNombre(reponse.simplifie().den / Math.pow(10, min(Math.floor(Math.log10(reponse.simplifie().den)), 6)), 2)}$ ${unite2} en réalité.`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true })
            setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          }
          break
        case 2:
          quidam = choice(Famille)
          quidam2 = choice([prenomF(), prenomM()])
          nb1 = choice(rangeMinMax(3, 47, [10, 20, 30, 40]))
          nb1Unite1 = nb1 / Math.pow(10, min(Math.floor(Math.log10(nb1))))
          echelleQ = choice(Echelle)
          echelleQUnite2 = echelleQ[0] / Math.pow(10, min(Math.floor(Math.log10(echelleQ[0])), 6) - Math.floor(Math.log10(nb1)))
          unite1 = tableauUnites[Math.floor(Math.log10(nb1))]
          nb2 = nb1 * echelleQ[0]
          unite2 = tableauUnites[Math.floor(min(Math.log10(nb2), 6))]
          nb2Unite2 = arrondi(nb2 / Math.pow(10, min(Math.floor(Math.log10(echelleQ[0])), 6)), 3)
          reponse = nb2Unite2
          texte += `Le plan ${echelleQ[1]} ${quidam[2]} ${quidam[0]} de ${quidam2} a une échelle de $${texFraction(1, echelleQ[0])}$. ${quidam2} mesure, sur ce plan, un segment de $${texNombre(nb1Unite1, 2)}$ ${unite1}. 
            À quelle distance réelle, ce segment correspond-il ?`
          texteCorr += `Une échelle de $${texFraction(1, echelleQ[0])}$ signifie que $1$ ${unite1} sur le plan représente $${texNombre(echelleQ[0])}$ ${unite1} en réalité, soit $${texNombre(echelleQUnite2, 2)}$ ${unite2}.<br>`
          texteCorr += `$${texNombre(nb1Unite1)}$ ${unite1} étant $${texNombre(nb1Unite1)}$ fois plus grand que $1$ ${unite1}, alors la distance réelle est $${texNombre(nb1Unite1)}$ fois plus grande que $${texNombre(echelleQUnite2, 2)}$ ${unite2}. ${sp(10)} `
          texteCorr += `$${texNombre(nb1Unite1)}\\times${texNombre(echelleQUnite2, 2)}$ ${unite2} $= ${texNombre(reponse, 2)}$ ${unite2}.<br>`
          texteCorr += `Le segment de $${texNombre(nb1Unite1)}$ ${unite1} mesuré par ${quidam2} sur le plan ${echelleQ[1]} de ${quidam[1]} ${quidam[0]} correspond donc à une distance réelle de ${texteEnCouleurEtGras(stringNombre(reponse))} ${texteEnCouleurEtGras(unite2)}.`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')
            setReponse(this, i, new Grandeur(reponse, unite2), { formatInteractif: 'unites' })
          }
          break
        case 3:
          quidam = choice(Famille)
          quidam2 = choice([prenomF(), prenomM()])
          nb1 = choice(rangeMinMax(11, 47, [10, 20, 30, 40]))
          nb1Unite1 = nb1 / Math.pow(10, min(Math.floor(Math.log10(nb1))))
          echelleQ = choice(Echelle)
          unite1 = tableauUnites[Math.floor(Math.log10(nb1))]
          nb2 = nb1 * echelleQ[0]
          unite2 = tableauUnites[Math.floor(min(Math.log10(nb2), 6))]
          echelleQUnite2 = echelleQ[0] / Math.pow(10, min(Math.floor(Math.log10(echelleQ[0])), 6) - Math.floor(Math.log10(nb1)))
          nb2Unite2 = arrondi(nb2 / Math.pow(10, min(Math.floor(Math.log10(echelleQ[0])), 6)), 3)
          nb2Unite1 = arrondi(nb2 / Math.pow(10, min(Math.floor(Math.log10(nb1)), 6)), 3)
          reponse = nb1Unite1
          texte += `Le plan ${echelleQ[1]} ${quidam[2]} ${quidam[0]} de ${quidam2} a une échelle de $${texFraction(1, echelleQ[0])}$. ${quidam2} trace, sur ce plan, un segment qui représente $${texNombre(nb2Unite2)}$ ${unite2} dans la réalité. 
              Quelle est la longueur du segment tracé sur le plan par ${quidam2} ?`
          texteCorr += `Une échelle de $${texFraction(1, echelleQ[0])}$ signifie que $1$ ${unite1} sur le plan représente $${texNombre(echelleQ[0])}$ ${unite1} en réalité, soit $${texNombre(echelleQUnite2, 2)}$ ${unite2}.<br>`
          texteCorr += `Cherchons par combien multiplier $${texNombre(echelleQUnite2, 2)}$ ${unite2} pour obtenir $${texNombre(nb2Unite2, 3)}$ ${unite2}. $${sp(10)} ${texNombre(nb2Unite2, 2)}\\div${texNombre(echelleQUnite2, 2)}=${texNombre(nb1Unite1)}$<br>`
          texteCorr += `$${texFraction(1, echelleQ[0])}=${texFraction(1 + miseEnEvidence('\\times' + texNombre(nb1Unite1), 'blue'), texNombre(echelleQ[0]) + miseEnEvidence('\\times' + texNombre(nb1Unite1), 'blue'))}=${texFraction(nb1Unite1, nb2Unite1)}$ et donc une distance de $${texNombre(nb2Unite1)}$ ${unite1} ($${texNombre(nb2Unite2)}$ ${unite2}) est représentée par un segment de $${texNombre(nb1Unite1)}$ ${unite1}.<br>`
          texteCorr += `Le segment représentant $${texNombre(nb2Unite2)}$ ${unite2} dans la réalité, tracé par ${quidam2}, sur le plan ${echelleQ[1]} de ${quidam[1]} ${quidam[0]}, mesure ${texteEnCouleurEtGras(stringNombre(reponse))} ${texteEnCouleurEtGras(unite1)}.`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')
            setReponse(this, i, new Grandeur(reponse, unite1), { formatInteractif: 'unites' })
          }
          break
      }

      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Choix des problèmes', 'Nombres séparés par des tirets\n1 : Trouver une échelle\n2 : Trouver une distance réelle\n3 : Trouver une longueur sur le plan\n4 : Mélange']
}
