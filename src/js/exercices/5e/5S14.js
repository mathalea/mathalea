import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, arrondi, arrondiVirgule, listeDeNotes, joursParMois, unMoisDeTemperature, nomDuMois, texNombre, texFraction, personne, prenomF } from '../../modules/outils.js'
import { getVueFromUrl } from '../../modules/gestionUrl.js'
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
* Référence 5S14
* Modifié le 23/07/2021
*/
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

    for (let i = 0, nombreNotes, eleve, notes, effectifs, somme, reponse, effectifTotal, nombreTemperatures, temperatures, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (this.sup === 1) { // ici on trie des notes
        nombreNotes = choice([8, 10, 12])
        notes = listeDeNotes(nombreNotes, randint(0, 7), randint(13, 20)) // on récupère une série de notes (série brute)
        somme = 0
        eleve = personne()
        for (let j = 0; j < nombreNotes; j++) { somme += notes[j] }

        texte = `${eleve.prenom} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`
        texte += `$${notes[0]}$`
        for (let j = 1; j < nombreNotes - 1; j++) { texte += `; $${notes[j]}$ ` } // On liste les notes
        texte += `et $${notes[nombreNotes - 1]}$.<br>`
        texteCorr = `La somme des notes est : $${somme}$.<br> Il y a $${nombreNotes}$ notes.<br>`

        if (eleve.genre === 'masculin') {
          texte += 'Calculer la moyenne de cet élève en mathématiques.'
          texteCorr += 'Donc la moyenne de cet élève est : ' + `$${texFraction(texNombre(somme), texNombre(nombreNotes))}$`
        } else {
          texte += 'Calculer la moyenne de cette élève en mathématiques.'
          texteCorr += 'Donc la moyenne de cette élève est : ' + `$${texFraction(texNombre(somme), texNombre(nombreNotes))}$`
        }
        reponse = new FractionX(somme, nombreNotes)
        if (arrondi(somme / nombreNotes, 2) === somme / nombreNotes) { // moyenne exacte
          texteCorr += `$=${arrondiVirgule(somme / nombreNotes, 2)}$<br>`
        } else { // moyenne arrondie
          texteCorr += ` $\\approx${arrondiVirgule(somme / nombreNotes, 2)}$`
        }
      } else if (this.sup === 2) { // ici on relève des températures
        const mois = randint(1, 12)
        const annee = randint(1980, 2019)
        const temperaturesDeBase = [3, 5, 9, 13, 19, 24, 26, 25, 23, 18, 10, 5]
        nombreTemperatures = joursParMois(mois)
        temperatures = unMoisDeTemperature(temperaturesDeBase[mois - 1], mois, annee) // série brute de un mois de température
        somme = 0
        texte = `En ${nomDuMois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, on a relevé les températures suivantes.<br>`
        texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // tableau des températures 1/2
        texte += '|c'
        for (let j = 0; j < Math.round(temperatures.length / 2); j++) { texte += '|c' }
        texte += '}\\hline  \\text{Jour}'
        for (let j = 0; j < Math.round(temperatures.length / 2); j++) { texte += '&' + texNombre(j + 1) }
        texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}'
        for (let j = 0; j < Math.round(temperatures.length / 2); j++) {
          texte += '&' + temperatures[j]
          somme += temperatures[j]
        }
        texte += '\\\\\\hline\\end{array}$<br><br>'
        texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // tableau des températures 2/2
        texte += '|c'
        for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { texte += '|c' }
        texte += '}\\hline  \\text{Jour}'
        for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { texte += '&' + texNombre(j + 1) }
        texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}'
        for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) {
          texte += '&' + temperatures[j]
          somme += temperatures[j]
        }
        texte += '\\\\\\hline\\end{array}$<br><br>'

        texte += 'Calculer la température moyenne de ce mois.'
        texteCorr = `En ${nomDuMois(mois)} ${annee}, la somme des températures est ` + `$${somme}^\\circ\\text{C}$.<br> Il y a $${temperatures.length}$ jours ce mois-ci.<br> La température moyenne est :<br>`
        texteCorr += `$${texFraction(texNombre(somme) + '^\\circ\\text{C}', texNombre(nombreTemperatures))}$`
        reponse = new FractionX(somme, nombreTemperatures)

        if (arrondi(somme / nombreTemperatures, 2) === somme / nombreTemperatures) {
          texteCorr += `$=${arrondiVirgule(somme / nombreTemperatures, 2)}^\\circ\\text{C}$` // moyenne exacte
        } else { texteCorr += `$\\approx${arrondiVirgule(somme / nombreTemperatures, 2)}^\\circ\\text{C}$` } // moyenne arrondie
      } else { // pointures des membres du club de foot (moyenne pondérée)
        nombreNotes = 5 // 5 colonnes
        notes = listeDeNotes(nombreNotes, randint(33, 35), randint(39, 42), true).sort() // on récupère une série de notes (pointures) distinctes et ordonnées
        effectifs = listeDeNotes(nombreNotes, randint(2, 4), randint(8, 12)) // on récupère une liste d'effectifs
        somme = 0
        effectifTotal = 0
        eleve = prenomF()
        for (let j = 0; j < nombreNotes; j++) { // Calcul de la somme des valeurs et de l'effectif total
          somme += notes[j] * effectifs[j]
          effectifTotal += effectifs[j]
        }
        texte = `Pour passer une commande de chaussures de foot,${getVueFromUrl() === 'multi' ? '<br>' : ' '}${eleve} a noté les pointures des membres de son club${getVueFromUrl() === 'multi' ? '<br>' : ' '}et les a regroupées dans un tableau :<br><br>`
        texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c|c|c|c|c|c|} \\hline '
        texte += `\\text{Pointure} & ${notes[0]} & ${notes[1]} & ${notes[2]} & ${notes[3]} & ${notes[4]} \\\\ \\hline `
        texte += `\\text{Effectif} & ${effectifs[0]} & ${effectifs[1]} & ${effectifs[2]} & ${effectifs[3]} & ${effectifs[4]} \\\\\\hline \\end{array}$<br><br>`
        texte += 'Calculer la pointure moyenne des membres de ce club.'
        texteCorr = '$\\text{Moyenne} = \\dfrac{\\text{Somme des valeurs}}{\\text{Effectif total}} ='
        texteCorr += `\\dfrac{${notes[0]} \\times ${effectifs[0]}`
        for (let j = 1; j < nombreNotes; j++) {
          texteCorr += `+ ${notes[j]} \\times ${effectifs[j]}`
        }
        texteCorr += `}{${effectifs[0]}`
        for (let j = 1; j < nombreNotes; j++) {
          texteCorr += `+ ${effectifs[j]}`
        }
        texteCorr += `} = \\dfrac{${somme}}{${effectifTotal}} `
        reponse = new FractionX(somme, effectifTotal)

        if (arrondi(somme / effectifTotal, 2) === somme / effectifTotal) { // moyenne exacte
          texteCorr += `=${arrondiVirgule(somme / effectifTotal, 2)}$<br>`
        } else { // moyenne arrondie
          texteCorr += `\\approx${arrondiVirgule(somme / effectifTotal, 2)}$<br>`
        }
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
