import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, tirerLesDes, listeDeNotes, unMoisDeTemperature, combinaisonListes, calcul } from '../../modules/outils.js'
import { OutilsStats } from '../../modules/outilsStat.js'

import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Déterminer des médianes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true // pour définir que l'exercice est exportable à AMC
export const amcType = 'AMCNum'

export const dateDeModifImportante = '28/10/2021'

/**
 * Calculs de médianes dans des séries statistiques
* @author Sébastien Lozano forked de Jean-Claude Lhote
* Référence 4S11
* Date initiale 2021-01-12
* Ajout de l'alternance entre effectif total pair et impair le 18/08/2021 : Guilllaume Valmont
*/
export const uuid = '7c068'
export const ref = '4S11'
export default function DeterminerDesMedianes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.spacing = 1
  this.spacingCorr = 1.5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.listePackages = 'bclogo'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    this.sup = parseInt(this.sup)

    const listePairOuImpair = combinaisonListes(['pair', 'impair'], this.nbQuestions)

    for (let i = 0, temperatures, nombreNotes, notes, nombreDes, nombreFaces, nombreTirages, tirages, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let repInteractive
      if (this.sup === 1) { // ici on lance des dés
        nombreDes = randint(1, 2)
        nombreFaces = choice([4, 6, 8, 10])
        if (listePairOuImpair[i] === 'pair') {
          nombreTirages = choice([50, 100, 200, 500, 1000, 2000])
        } else {
          nombreTirages = choice([49, 99, 199, 299, 999, 1999])
        }
        tirages = tirerLesDes(nombreTirages, nombreFaces, nombreDes) // on récupère une série rangée dans l'ordre croissant avec les effectifs correspondants
        texte = OutilsStats.texteTirages2D(nombreDes, nombreTirages, nombreFaces, tirages)
        const [, medianeCorr] = OutilsStats.computeMedianeTirages2D(nombreTirages, tirages)
        texteCorr = OutilsStats.texteCorrMedianeTirages2D(nombreTirages, medianeCorr, tirages)
        repInteractive = medianeCorr
      } else if (this.sup === 2) { // ici on trie des notes
        if (listePairOuImpair[i] === 'pair') {
          nombreNotes = choice([8, 10, 12])
        } else {
          nombreNotes = choice([7, 9, 11])
        }
        notes = listeDeNotes(nombreNotes, randint(0, 7), randint(13, 20)) // on récupère une liste de notes (série brute)
        texte = OutilsStats.texteNotes(nombreNotes, notes)
        const [mediane, medianeCorr] = OutilsStats.computeMediane(notes)
        texteCorr = OutilsStats.texteCorrNotes(nombreNotes, notes, medianeCorr)
        repInteractive = mediane
      } else { // ici on relève des températures
        const annee = randint(1980, 2019)
        let listeMois
        if (listePairOuImpair[i] === 'pair') {
          listeMois = [4, 6, 9, 11]
        } else {
          listeMois = [1, 3, 5, 7, 8, 10, 12]
        }
        if ((((annee % 4 === 0) && (annee % 100 !== 0)) || (annee % 400 === 0)) && (listePairOuImpair[i] === 'impair')) { // Si l'année est bissextile et qu'on veut une liste impair
          listeMois.push(2)
        } else if (!(((annee % 4 === 0) && (annee % 100 !== 0)) || (annee % 400 === 0)) && (listePairOuImpair[i] === 'pair')) { // Si l'année n'est pas bissextile et qu'on veut une liste paire
          listeMois.push(2)
        }
        const mois = listeMois[randint(0, listeMois.length - 1)]
        const temperaturesDeBase = [3, 5, 9, 13, 19, 24, 26, 25, 23, 18, 10, 5]
        temperatures = unMoisDeTemperature(temperaturesDeBase[mois - 1], mois, annee) // on récupère une série de température correspondant à 1 mois d'une année (série brute)
        texte = OutilsStats.texteTemperatures(annee, mois, temperatures)
        const [mediane, medianeCorr] = OutilsStats.computeMediane(temperatures)
        texteCorr = OutilsStats.texteCorrMedianeTemperature(temperatures, medianeCorr)
        repInteractive = mediane
      }

      // On factorise la question
      (this.interactif && !context.isAmc) ? texte += '<br><br>Déterminer une médiane de cette série : ' : texte += '<br>Déterminer une médiane de cette série.'

      if (Array.isArray(repInteractive)) {
        setReponse(this, i, repInteractive, { decimals: 1, milieuIntervalle: calcul((repInteractive[0] + repInteractive[1]) / 2), approx: 'intervalleStrict', formatInteractif: 'intervalleStrict' })
      } else {
        setReponse(this, i, repInteractive)
      }
      if (this.interactif && !context.isAmc) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur20 inline')
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de séries', 3, ' 1 : Lancers de dés \n 2 : Liste de notes\n 3 : Un mois de températures']
}
