import Exercice from '../Exercice.js'
import { OutilsStats } from '../../modules/outilsStat.js'
import { listeQuestionsToContenu, randint, rangeMinMax, choice, listeDeNotes, numAlpha, tirerLesDes, unMoisDeTemperature, combinaisonListesSansChangerOrdre, combinaisonListes } from '../../modules/outils.js'
export const titre = 'Calculer des caractéristiques d\'une série'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Calculer des caractéristiques d'une série (moyenne, médiane ou étendue)
 *
 * @author Mickael Guironnet
*/

export const uuid = 'b8afd'
export const ref = '3S14'
export default function CalculerCaracteristiques () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestions = 4
  this.spacing = 1
  this.spacingCorr = 1
  this.nbColsCorr = 1
  this.nbCols = 1
  this.sup = '4'
  this.sup2 = '4'
  this.listePackages = 'bclogo'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let questionsDisponibles = []
    if (!this.sup) { // Si aucune liste n'est saisie
      questionsDisponibles = rangeMinMax(1, 4)
      questionsDisponibles = combinaisonListes(questionsDisponibles, this.nbQuestions)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        if (this.sup >= 1 && this.sup <= 4) { questionsDisponibles = [this.sup] } else { questionsDisponibles = rangeMinMax(1, 4) }
        questionsDisponibles = combinaisonListes(questionsDisponibles, this.nbQuestions)
      } else {
        const questions = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < questions.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          questions[i] = parseInt(questions[i])
          if (questions[i] >= 1 && questions[i] <= 4) { questionsDisponibles.push(questions[i]) } else { questionsDisponibles.push(...rangeMinMax(1, 4)) }
        }
        questionsDisponibles = combinaisonListesSansChangerOrdre(questionsDisponibles, this.nbQuestions)
      }
    }

    let typeQuestions = []
    if (!this.sup2) { // Si aucune liste n'est saisie
      typeQuestions = rangeMinMax(1, 3)
    } else {
      if (typeof (this.sup2) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        if (this.sup2 >= 1 && this.sup2 <= 3) { typeQuestions = [this.sup2] } else { typeQuestions = rangeMinMax(1, 3) }
      } else {
        const typesQ = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesQ.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typesQ[i] = parseInt(typesQ[i])
          if (typesQ[i] >= 1 && typesQ[i] <= 3) { typeQuestions.push(typesQ[i]) } else { typeQuestions.push(...rangeMinMax(1, 3)) }
        }
      }
    }
    const listePairOuImpair = combinaisonListes(['pair', 'impair'], this.nbQuestions)

    for (let i = 0, cpt = 0, texte, texteCorr; i < this.nbQuestions && cpt < 50; cpt++) {
      texte = ''
      texteCorr = ''
      switch (questionsDisponibles[i]) {
        case 1: {
          // un dé ou des dés
          // on alterne 1 dé puis 2 dés
          const nombreDes = questionsDisponibles.reduce((accumulator, currentValue, currentIndex) => { if (currentValue === 1 && currentIndex <= i) { return accumulator + 1 } else { return accumulator } }, 0) % 2 === 1 ? 1 : 2
          // const nombreDes = randint(1, 2)
          const nombreFaces = choice([4, 6, 8, 10])
          let nombreTirages
          if (listePairOuImpair[i] === 'pair') {
            nombreTirages = choice([50, 100, 200, 500, 1000, 2000])
          } else {
            nombreTirages = choice([49, 99, 199, 299, 999, 1999])
          }
          const tirages = tirerLesDes(nombreTirages, nombreFaces, nombreDes) // on récupère une série rangée dans l'ordre croissant avec les effectifs correspondants
          texte += OutilsStats.texteTirages2D(nombreDes, nombreTirages, nombreFaces, tirages) + '<br>' // on récupère une série rangée dans l'ordre croissant avec les effectifs correspondants
          let questind = 0
          for (let k = 0; k < typeQuestions.length; k++) {
            if (typeQuestions[k] === 1) {
              // moyenne
              texte += '<br>' + numAlpha(questind) + 'Calculer la moyenne des lancers.'
              const [, somme] = OutilsStats.computeMoyenneTirages2D(tirages)
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrMoyenneNotes(somme, nombreTirages, 'lancers')
            } else if (typeQuestions[k] === 2) {
              // médiane
              texte += '<br>' + numAlpha(questind) + 'Calculer la médiane des lancers.'
              const [, medianeCorr] = OutilsStats.computeMedianeTirages2D(nombreTirages, tirages)
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrMedianeTirages2D(nombreTirages, medianeCorr, tirages)
            } else {
              // étendue
              texte += '<br>' + numAlpha(questind) + 'Calculer l\'étendue de ces lancers.'
              const [min, max] = [tirages[0][0], tirages[tirages.length - 1][0]]
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrEtendueNotes(min, max, 'lancer')
            }
          }
          break
        }
        case 2: {
          // des notes
          let nombreNotes
          if (listePairOuImpair[i] === 'pair') {
            nombreNotes = choice([8, 10, 12])
          } else {
            nombreNotes = choice([7, 9, 11])
          }
          const notes = listeDeNotes(nombreNotes, randint(0, 7), randint(13, 20)) // on récupère une liste de notes (série brute)
          texte = OutilsStats.texteNotes(notes) + '<br>'
          let questind = 0
          for (let k = 0; k < typeQuestions.length; k++) {
            if (typeQuestions[k] === 1) {
              // moyenne
              texte += '<br>' + numAlpha(questind) + 'Calculer la moyenne de ces notes.'
              const [, somme] = OutilsStats.computeMoyenne(notes)
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrMoyenneNotes(somme, nombreNotes)
            } else if (typeQuestions[k] === 2) {
              // médiane
              texte += '<br>' + numAlpha(questind) + 'Calculer la médiane de ces notes.'
              const [, medianeCorr] = OutilsStats.computeMediane(notes)
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrMedianeNotes(notes, medianeCorr)
            } else {
              // étendue
              texte += '<br>' + numAlpha(questind) + 'Calculer l\'étendue de ces notes.'
              const [min, max] = OutilsStats.computeEtendue(notes)
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrEtendueNotes(min, max)
            }
          }
          break
        }
        case 3: {
          // des températures
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
          const temperatures = unMoisDeTemperature(temperaturesDeBase[mois - 1], mois, annee) // on récupère une série de température correspondant à 1 mois d'une année (série brute)
          texte += OutilsStats.texteTemperatures(annee, mois, temperatures)
          let questind = 0
          for (let k = 0; k < typeQuestions.length; k++) {
            if (typeQuestions[k] === 1) {
              // moyenne
              texte += '<br>' + numAlpha(questind) + 'Calculer la moyenne des températures.'
              const [, somme] = OutilsStats.computeMoyenne(temperatures)
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrMoyenneNotes(somme, temperatures.length, 'températures')
            } else if (typeQuestions[k] === 2) {
              // médiane
              texte += '<br>' + numAlpha(questind) + 'Calculer la médiane de ces temperatures.'
              const [, medianeCorr] = OutilsStats.computeMediane(temperatures)
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrMedianeTemperature(temperatures, medianeCorr)
            } else {
              // étendue
              texte += '<br>' + numAlpha(questind) + 'Calculer l\'étendue de ces températures.'
              const [min, max] = OutilsStats.computeEtendue(temperatures)
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrEtendueNotes(min, max, 'température')
            }
          }
          break
        }
        case 4 : {
          // ses salaires
          const salaires = [
            [1250 + randint(2, 8) * 10, randint(30, 50)], // 'Ouvrier'
            [1450 + randint(2, 8) * 10, randint(21, 29)], // 'Ouvrier qualifié'
            [1700 + randint(2, 8) * 10, randint(15, 20)], // 'Cadre'
            [3500 + randint(2, 8) * 10, randint(5, 10)], // 'Cadre supérieur'
            [8000 + randint(2, 8) * 100, 1]] // 'Dirigeant'
          texte += OutilsStats.texteSalaires(salaires, ['\\hspace{0.3cm}Ouvrier\\hspace{0.3cm}', 'Ouvrier qualifié', '\\hspace{0.5cm}Cadre\\hspace{0.5cm}', 'Cadre supérieur', 'Dirigeant'])
          let questind = 0
          for (let k = 0; k < typeQuestions.length; k++) {
            if (typeQuestions[k] === 1) {
              // moyenne
              texte += '<br>' + numAlpha(questind) + 'Calculer le salaire moyen.'
              const [, somme, effectif] = OutilsStats.computeMoyenneTirages2D(salaires)
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrMoyenneNotes(somme, effectif, 'salaires')
            } else if (typeQuestions[k] === 2) {
              // médiane
              texte += '<br>' + numAlpha(questind) + 'Calculer le salaire médian.'
              const [, , effectif] = OutilsStats.computeMoyenneTirages2D(salaires)
              const [, medianeCorr] = OutilsStats.computeMedianeTirages2D(effectif, salaires)
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrMedianeTirages2DSalaires(effectif, medianeCorr, salaires, ['\\hspace{0.3cm}Ouvrier\\hspace{0.3cm}', 'Ouvrier qualifié', '\\hspace{0.5cm}Cadre\\hspace{0.5cm}', 'Cadre supérieur', 'Dirigeant'])
            } else {
              // étendue
              texte += '<br>' + numAlpha(questind) + 'Calculer l\'étendue des salaires.'
              const [min, max] = [salaires[0][0], salaires[salaires.length - 1][0]]
              texteCorr += '<br>' + numAlpha(questind++) + OutilsStats.texteCorrEtendueNotes(min, max, 'salaire')
            }
          }
          break
        }
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Type de séries',
    'Nombres séparés par des tirets\n1 : Lancers de dés.\n2 : Liste de notes.\n3 : Un mois de températures.\n4 : Salaires.\n5 : Mélange.']
  this.besoinFormulaire2Texte = [
    'Choix des questions',
    'Nombres séparés par des tirets\n1 : Moyenne.\n2 : Médiane.\n3 : Etendue\n4 : Toutes.']
}
