import Exercice from '../Exercice.js'
import { OutilsStats } from '../../modules/outilsStat.js'
import { listeQuestionsToContenu, randint, choice, listeDeNotes, joursParMois, unMoisDeTemperature } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import FractionX from '../../modules/FractionEtendue.js'
import { context } from '../../modules/context.js'

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const titre = 'Calculer des moyennes'

export const dateDeModifImportante = '28/02/2022'

/**
* Calcul de moyennes de série statistiques
* @author Jean-Claude Lhote et Guillaume Valmont (Interactif et AMC par EE)
* 12/01/2023 : Mickael Guironnet Refactoring
* Référence 5S14
*/
export const uuid = 'ab91d'
export const ref = '5S14'
export default function CalculerDesMoyennes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.spacing = 1
  this.spacingCorr = 2.5
  this.nbColsCorr = 1
  this.nbCols = 1
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, reponse, nombreTemperatures, temperatures, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (this.sup === 1) { // ici on trie des notes
        const nombreNotes = choice([8, 10, 12])
        const notes = listeDeNotes(nombreNotes, randint(0, 7), randint(13, 20)) // on récupère une liste de notes (série brute)
        texte = OutilsStats.texteNotes(notes)
        texte += '<br>Calculer la moyenne des notes.'
        const [, somme] = OutilsStats.computeMoyenne(notes)
        texteCorr = OutilsStats.texteCorrMoyenneNotes(notes, somme, nombreNotes)
        reponse = new FractionX(somme, nombreNotes)
      } else if (this.sup === 2) { // ici on relève des températures
        const mois = randint(1, 12)
        const annee = randint(1980, 2019)
        const temperaturesDeBase = [3, 5, 9, 13, 19, 24, 26, 25, 23, 18, 10, 5]
        nombreTemperatures = joursParMois(mois, annee)
        temperatures = unMoisDeTemperature(temperaturesDeBase[mois - 1], mois, annee) // série brute de un mois de température
        texte = OutilsStats.texteTemperatures(annee, mois, temperatures)
        texte += '<br>Calculer la moyenne des températures.'
        const [, somme] = OutilsStats.computeMoyenne(temperatures)
        texteCorr = '<br>' + OutilsStats.texteCorrMoyenneNotes(temperatures, somme, temperatures.length, 'températures')
        reponse = new FractionX(somme, nombreTemperatures)
      } else { // pointures des membres du club de foot (moyenne pondérée)
        const nombreNotes = 5 // 5 colonnes
        const min = randint(33, 35)
        const max = randint(min + nombreNotes, min + nombreNotes + 3)
        const notes = listeDeNotes(nombreNotes, min, max, true).sort() // on récupère une série de notes (pointures) distinctes et ordonnées
        const effectifs = listeDeNotes(nombreNotes, randint(2, 4), randint(8, 12)) // on récupère une liste d'effectifs
        const pointures = Array.from(notes, (x, i) => [x, effectifs[i]])
        const effectifTotal = pointures.reduce((accumulator, currentValue, currentIndex) => { return accumulator + currentValue[1] }, 0)
        texte = OutilsStats.texteSalaires(pointures, [], 'pointures')
        texte += '<br>Calculer la pointure moyenne des membres de ce club.'
        const [, somme, effectif] = OutilsStats.computeMoyenneTirages2D(pointures)
        texteCorr = '<br>' + OutilsStats.texteCorrMoyenneNotes(pointures, somme, effectif, 'pointures')
        reponse = new FractionX(somme, effectifTotal)
      }
      if (this.interactif) {
        texte += ' (On donnera la valeur exacte en écriture décimale ou fractionnaire)<br>'
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
        setReponse(this, i, reponse, { formatInteractif: 'fractionEgale', digits: 5, digitsNum: 3, digitsDen: 2, signe: true })
      }
      if (context.isAmc) {
        reponse = reponse.simplifie()
        this.autoCorrection[i] = {
          enonce: texte,
          options: { multicols: true, barreseparation: true }, // facultatif. Par défaut, multicols est à false. Ce paramètre provoque un multicolonnage (sur 2 colonnes par défaut) : pratique quand on met plusieurs AMCNum. !!! Attention, cela ne fonctionne pas, nativement, pour AMCOpen. !!!
          propositions: [
            {
              type: 'AMCOpen',
              propositions: [{
                texte: texteCorr,
                statut: 3
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'Résultat sous forme d\'une fraction irréductible',
                  valeur: [reponse],
                  param: {
                    signe: false,
                    approx: 0
                  }
                }
              }]
            }
          ]
        }
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
  this.besoinFormulaireNumerique = ['Type de séries', 3, '1 : Série de notes\n2 : Série de températures\n3 : Série de pointures (moyenne pondérée)']
}
