import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, ecritureParentheseSiNegatif, prenom, listeDeNotes, unMoisDeTemperature, nomDuMois, texNombre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Calculer des étendues'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Calculer des étendues de séries statistiques
* @author Jean-Claude Lhote
* Référence 3S15
*/
export default function CalculerEtendues () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestions = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.nbColsCorr = 1
  this.nbCols = 1
  this.sup = 1

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, nombreNotes, notes, min, max, temperatures, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (this.sup === 1) { // ici on trie des notes
        nombreNotes = randint(8, 12)
        notes = listeDeNotes(nombreNotes, randint(0, 7), randint(13, 20)) // on récupère une série de notes (série brute)
        min = 20
        max = 0
        for (let j = 0; j < nombreNotes; j++) { // On cherche la note minimum et la note maximum
          min = Math.min(notes[j], min)
          max = Math.max(notes[j], max)
        }
        texte = `${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`
        texte += `$${notes[0]}$`
        for (let j = 1; j < nombreNotes - 1; j++) { texte += `; $${notes[j]}$ ` } // On liste les notes
        texte += `et $${notes[nombreNotes - 1]}$.<br>`
        texte += 'Calculer l\'étendue de cette série de notes.'
        texteCorr = `La note la plus basse est : $${min}$.<br>La note la plus haute est $${max}$<br>`
        texteCorr += 'Donc l\'étendue de cette série est : ' + `$${texNombre(max)}-${texNombre(min)}=${texNombre(max - min)}$`
      } else { // ici on relève des températures
        const mois = randint(1, 12)
        const annee = randint(1980, 2019)
        const temperaturesDeBase = [3, 5, 9, 13, 19, 24, 26, 25, 23, 18, 10, 5]
        temperatures = unMoisDeTemperature(temperaturesDeBase[mois - 1], mois, annee) // série brute de un mois de température
        max = 0
        min = 20
        texte = `En ${nomDuMois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, on a relevé les températures suivantes<br>`

        texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // tableau des températures 1/2
        texte += '|c'
        for (let j = 0; j < Math.round(temperatures.length / 2); j++) { texte += '|c' }
        texte += '}\\hline  \\text{Jour}'
        for (let j = 0; j < Math.round(temperatures.length / 2); j++) { texte += '&' + texNombre(j + 1) }
        texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}'
        for (let j = 0; j < Math.round(temperatures.length / 2); j++) { // on cherche le minimum et le maximum
          texte += '&' + temperatures[j]
          min = Math.min(temperatures[j], min)
          max = Math.max(temperatures[j], max)
        }
        texte += '\\\\\\hline\\end{array}$<br><br>'

        texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // tableau des températures 2/2
        texte += '|c'
        for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { texte += '|c' }
        texte += '}\\hline  \\text{Jour}'
        for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { texte += '&' + texNombre(j + 1) }
        texte += '\\\\\\hline \\text{Température\\thickspace en} \\thickspace ^\\circ\\text{C}'
        for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { // on cherche le minimum et le maximum
          texte += '&' + temperatures[j]
          min = Math.min(temperatures[j], min)
          max = Math.max(temperatures[j], max)
        }
        texte += '\\\\\\hline\\end{array}$<br><br>'

        texte += 'Calculer l\'amplitude thermique de ce mois (l\'étendue de la série).'
        texteCorr = `En ${nomDuMois(mois)} ${annee}, la température minimale est ` + `$${min}^\\circ\\text{C}$.<br>La température maximale est $${max}^\\circ\\text{C}$.<br> L'amplitude thermique est :<br>`
        texteCorr += `$${texNombre(max)}-${ecritureParentheseSiNegatif(min)}$`
        if (min < 0) { texteCorr += `$\\thickspace~=${texNombre(max)}+${texNombre(-min)}$` }
        texteCorr += `$\\thickspace=${texNombre(max - min)}^\\circ\\text{C}$`
      }
      setReponse(this, i, max - min)
      texte += ajouteChampTexteMathLive(this, i)
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de séries', 2, ' 1 : Série de notes\n 2 : Série de températures']
}
