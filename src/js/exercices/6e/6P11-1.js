import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, prenom, texPrix, numAlpha, nombreDeChiffresDe, nombreDeChiffresDansLaPartieDecimale, arrondi, checkSum, shuffle, choice, texteEnCouleurEtGras, miseEnEvidence, combinaisonListes, rangeMinMax, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export let titre = 'Résoudre un problème relevant de la proportionnalité avec les propriétés de linéarité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeModifImportante = '23/02/2022'

/**
 * Résoudre un problème relevant de la proportionnalité avec les propriétés de linéarité
 * * 6P11-1
 * @author Sébastien Lozano (et Eric Elter pour divers enrichissements)
 */

export default function ProportionnaliteParLineariteBis () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.beta = false
  if (this.beta) {
    this.nbQuestions = 3
  } else {
    this.nbQuestions = 1
  };

  this.consigne = ''
  context.isHtml ? this.spacing = 2 : this.spacing = 1

  this.nbCols = 1
  this.nbColsCorr = 1
  if (context.isAmc) {
    titre = 'Résoudre un problème relevant de la proportionnalité'
  }

  this.nouvelleVersion = function () {
    const tabHash = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const sousChoix = combinaisonListes(rangeMinMax(0, 4), this.nbQuestions)
    const prenomliste = prenom(6)
    const situations = [
      { lieu: 'À la boulangerie', achat_sing: 'pain au chocolat', achat_plur: 'pains au chocolat', pu: choice([0.7, 0.75, 0.8, 0.85]) },
      { lieu: 'À la boulangerie', achat_sing: 'croissant', achat_plur: 'croissants', pu: choice([1.05, 1.15, 0.95, 1.25]) },
      { lieu: 'À la boulangerie', achat_sing: 'baguette', achat_plur: 'baguettes', pu: choice([0.9, 1.3, 1.1, 1.2]) },
      { lieu: 'Au supermarché', achat_sing: 'bouteille de jus de fruits', achat_plur: 'bouteilles de jus de fruits', pu: choice([1.8, 1.9, 2.1, 2.3]) },
      { lieu: 'À la charcuterie', achat_sing: 'tranche de jambon', achat_plur: 'tranches de jambon', pu: choice([1.6, 1.7, 2.2, 2.4]) }
    ]

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // une fonction pour gérer le pluriel
      function pluriel (n, obj) {
        if (n > 1) {
          return obj.achat_plur
        } else {
          return obj.achat_sing
        };
      };

      // un compteur pour les sous-questions
      let k = 0
      let kCorr = 0
      // on crée un tableau d'objets pour les situations possibles
      let n1, n2, n3, n4, n5, nMax, choixN, choixMult
      do {
        n2 = randint(2, 8)
        n1 = randint(n2 + 1, 9, [n2, 2 * n2, 3 * n2, 4 * n2]) // n1 est plus grand que n2 et non mulitple de n2
        n3 = n1 + n2
        n4 = n1 - n2
        do {
          choixN = choice([n1, n2])
          choixMult = randint(2, 5)
          n5 = choixMult * choixN // n5 est un multiple de n1 ou n2, différent de n3 et n4.
        } while (n5 === n4 || n5 === n3)
        nMax = randint(10, 19, [n3, n5])
      } while (n4 === 1)
      const situation = situations[sousChoix[i]]
      const consigneQuestions = shuffle([n3, n4, n5])
      const enonceInit = `${situation.lieu}, ${prenomliste[0]} achète $${n1}$ ${pluriel(n1, situation)} et paie $${texPrix(n1 * situation.pu)}$${sp()}€.
      <br>${prenomliste[1]} achète $${n2}$ ${pluriel(n2, situation)} et paie $${texPrix(n2 * situation.pu)}$${sp()}€.`
      let enonceAMC = `${numAlpha(k++)} Combien paiera ${prenomliste[2]} pour $${consigneQuestions[k - 1]}$ ${pluriel(consigneQuestions[k - 1], situation)} ? ${ajouteChampTexteMathLive(this, 4 * i, 'largeur25 inline')}`
      texte = enonceInit + '<br>' + enonceAMC
      const propositionsAMC = [
        {
          type: 'AMCNum',
          propositions: [{
            texte: texteCorr,
            statut: '',
            reponse: {
              texte: enonceAMC,
              valeur: arrondi(consigneQuestions[0] * situation.pu, 2),
              param: {
                digits: nombreDeChiffresDe(arrondi(consigneQuestions[0] * situation.pu, 2)),
                decimals: nombreDeChiffresDansLaPartieDecimale(arrondi(consigneQuestions[0] * situation.pu, 2)),
                signe: false,
                approx: 0
              }
            }
          }]
        }
      ]
      enonceAMC = `${numAlpha(k++)} Combien paiera ${prenomliste[3]} pour $${consigneQuestions[k - 1]}$ ${pluriel(consigneQuestions[k - 1], situation)} ? ${ajouteChampTexteMathLive(this, 4 * i + 1, 'largeur25 inline')}`
      texte += '<br>' + enonceAMC
      propositionsAMC.push(
        {
          type: 'AMCNum',
          propositions: [{
            texte: '',
            statut: '',
            reponse: {
              texte: enonceAMC,
              valeur: arrondi(consigneQuestions[1] * situation.pu, 2),
              param: {
                digits: nombreDeChiffresDe(arrondi(consigneQuestions[1] * situation.pu, 2)),
                decimals: nombreDeChiffresDansLaPartieDecimale(arrondi(consigneQuestions[1] * situation.pu, 2)),
                signe: false,
                approx: 0
              }
            }
          }]
        }
      )
      enonceAMC = `${numAlpha(k++)} Combien paiera ${prenomliste[4]} pour $${consigneQuestions[k - 1]}$ ${pluriel(consigneQuestions[k - 1], situation)} ? ${ajouteChampTexteMathLive(this, 4 * i + 2, 'largeur25 inline')}`
      texte += '<br>' + enonceAMC
      propositionsAMC.push(
        {
          type: 'AMCNum',
          propositions: [{
            texte: '',
            statut: '',
            reponse: {
              texte: enonceAMC,
              valeur: arrondi(consigneQuestions[2] * situation.pu, 2),
              param: {
                digits: nombreDeChiffresDe(arrondi(consigneQuestions[2] * situation.pu, 2)),
                decimals: nombreDeChiffresDansLaPartieDecimale(arrondi(consigneQuestions[2] * situation.pu, 2)),
                signe: false,
                approx: 0
              }
            }
          }]
        }
      )
      enonceAMC = `${numAlpha(k++)} Quel est le nombre maximum de ${situation.achat_plur} que ${prenomliste[5]} peut acheter avec $${texPrix(nMax * situation.pu)}$ € ? ${ajouteChampTexteMathLive(this, 4 * i + 3, 'largeur25 inline')}`
      texte += '<br>' + enonceAMC
      propositionsAMC.push(
        {
          type: 'AMCNum',
          propositions: [{
            texte: '',
            statut: '',
            reponse: {
              texte: enonceAMC,
              valeur: nMax,
              param: {
                digits: 2,
                decimals: 0,
                signe: false,
                approx: 0
              }
            }
          }]
        }
      )
      texteCorr = `
        C'est une situation de proportionnalité. Nous pouvons donc utiliser les propriétés de linéarité de la proportionnalité.
        <br>C'est ce que nous allons faire pour les trois premières questions.
        <br>`
      const texteCorrInit = `
        Pour $${n1}$ ${pluriel(n1, situation)}, on paie $${texPrix(n1 * situation.pu)}$ €.
        <br> Pour $${n2}$ ${pluriel(n2, situation)}, on paie $${texPrix(n2 * situation.pu)}$ €.`
      const texteCorrn3 = `
        <br> Donc pour $${n1}+${n2}$ ${pluriel(n3, situation)}, on paie $${texPrix(n1 * situation.pu)}$ € + $${texPrix(n2 * situation.pu)}$ €.
        <br> ${texteEnCouleurEtGras(`${prenomliste[2]} paiera donc $${miseEnEvidence(texPrix(n3 * situation.pu))}$ € pour $${miseEnEvidence(n3)}$ ${pluriel(n3, situation)}.`)}
        <br>`
      const texteCorrn4 = `
        <br> Donc pour $${n1}-${n2}$ ${pluriel(n4, situation)}, on paie $${texPrix(n1 * situation.pu)}$ € - $${texPrix(n2 * situation.pu)}$ €.
        <br> ${texteEnCouleurEtGras(`${prenomliste[3]} paiera donc $${miseEnEvidence(texPrix(n4 * situation.pu))}$ € pour $${miseEnEvidence(n4)}$ ${pluriel(n4, situation)}.`)}
        <br>`
      const texteCorrn5 = `
        <br> Donc pour $${choixMult}\\times${choixN}$ ${pluriel(n5, situation)}, on paie $${choixMult}\\times${texPrix(choixN * situation.pu)}$ €.
        <br> ${texteEnCouleurEtGras(`${prenomliste[4]} paiera donc $${miseEnEvidence(texPrix(n5 * situation.pu))}$ € pour $${miseEnEvidence(n5)}$ ${pluriel(n5, situation)}.`)}
        <br>`
      for (let kk = 0; kk < 3; kk++) {
        texteCorr += `<br>${numAlpha(kCorr++)} ` + texteCorrInit
        switch (consigneQuestions[kk]) {
          case n3 :
            texteCorr += texteCorrn3
            break
          case n4 :
            texteCorr += texteCorrn4
            break
          case n5 :
            texteCorr += texteCorrn5
            break
        }
      }
      texteCorr += `
        ${numAlpha(kCorr++)} On peut utiliser l'une ou l'autre des informations de l'énoncé pour répondre en revenant à l'unité.
        <br> Par exemple, pour $${n1}$ ${pluriel(n1, situation)}, on paie $${texPrix(n1 * situation.pu)}$ €.
        <br> Donc $1$ ${situation.achat_sing} coûte $${texPrix(n1 * situation.pu)}$ € $\\div ${n1} = ${texPrix(situation.pu)}$ €.
        <br> Pour $${texPrix(nMax * situation.pu)}$ €, nous aurons donc $${texPrix(nMax * situation.pu)}$  € $\\div ${texPrix(situation.pu)}$ € $= ${nMax}$.
        <br> ${texteEnCouleurEtGras(`Avec $${miseEnEvidence(texPrix(nMax * situation.pu))}$ €, ${prenomliste[5]} peut donc acheter $${miseEnEvidence(nMax)}$ ${pluriel(nMax, situation)}.`)}
        `

      if (tabHash.indexOf(checkSum(prenomliste[3], n3, n2, nMax)) === -1) { // Si la question n'a jamais été posée, on en crée une autre
        tabHash.push(checkSum(prenomliste[3], n3, n2, nMax))
        if (!context.isAmc) {
          setReponse(this, 4 * i, arrondi(consigneQuestions[0] * situation.pu, 2))
          setReponse(this, 4 * i + 1, arrondi(consigneQuestions[1] * situation.pu, 2))
          setReponse(this, 4 * i + 2, arrondi(consigneQuestions[2] * situation.pu, 2))
          setReponse(this, 4 * i + 3, nMax)
        } else {
          this.autoCorrection[i] = {
            enonce: '\\rule{1\\linewidth}{1pt}<br>' + enonceInit,
            options: { multicols: true, barreseparation: true }, // facultatif. Par défaut, multicols est à false. Ce paramètre provoque un multicolonnage (sur 2 colonnes par défaut) : pratique quand on met plusieurs AMCNum. !!! Attention, cela ne fonctionne pas, nativement, pour AMCOpen. !!!
            propositions: propositionsAMC
          }
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
