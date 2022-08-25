import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, prenom, tirerLesDes, listeDeNotes, joursParMois, unMoisDeTemperature, nomDuMois, stringNombre, texNombre, texteGras, lampeMessage, combinaisonListes, calcul } from '../../modules/outils.js'

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

    for (let i = 0, temperatures, nombreTemperatures, nombreNotes, notes, nombreDes, nombreFaces, nombreTirages, indexValeur, tirages, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const underbraceMediane = (nbVal) => {
        let sortie
        if (nbVal % 2 === 0) { // nb pair de valeurs
          sortie = `$\\underbrace{1^e\\hspace{0.25cm}2^e ... ${nbVal / 2 - 1}^e}_{${nbVal / 2 - 1}\\; valeurs} \\hspace{0.25cm} ${nbVal / 2}^e \\hspace{0.25cm} ${nbVal / 2 + 1}^e \\hspace{0.25cm} \\underbrace{${nbVal / 2 + 2}^e ... ${nbVal}^e}_{${nbVal / 2 - 1}\\; valeurs}$`
        } else { // nb impair de valeurs
          sortie = `$\\underbrace{1^e\\hspace{0.25cm}2^e ... ${(nbVal - 1) / 2}^e}_{${(nbVal - 1) / 2}\\; valeurs} \\hspace{0.25cm} ${(nbVal - 1) / 2 + 1}^e \\hspace{0.25cm} \\underbrace{${(nbVal - 1) / 2 + 2}^e ... ${nbVal}^e}_{${(nbVal - 1) / 2}\\; valeurs}$`
        }
        return sortie
      }
      const desTabEffCumul = (tirages, effCumulBool) => {
        let sortie
        if (!effCumulBool) {
          sortie = ''
          if (tirages.length > 12) {
            sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 1/2
            for (let j = 0; j <= Math.round(tirages.length / 2); j++) { sortie += '|c' }
            sortie += '}\\hline  \\text{Scores}'
            for (let j = 0; j < Math.round(tirages.length / 2); j++) { sortie += '&' + tirages[j][0] }
            sortie += '\\\\\\hline \\text{Nombre d\'apparitions}'
            for (let j = 0; j < Math.round(tirages.length / 2); j++) { sortie += '&' + tirages[j][1] }
            sortie += '\\\\\\hline\\end{array}$<br><br>'

            sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 2/2
            for (let j = Math.round(tirages.length / 2); j <= tirages.length; j++) { sortie += '|c' }
            sortie += '}\\hline  \\text{Scores}'
            for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) { sortie += '&' + tirages[j][0] }
            sortie += '\\\\\\hline \\text{Nombre d\'apparitions}'
            for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) { sortie += '&' + tirages[j][1] }
            sortie += '\\\\\\hline\\end{array}$'
          } else {
            sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs en un seul morceau
            for (let j = 0; j <= tirages.length; j++) { sortie += '|c' }
            sortie += '}\\hline  \\text{Scores}'
            for (let j = 0; j < tirages.length; j++) { sortie += '&' + tirages[j][0] }
            sortie += '\\\\\\hline \\text{Nombre d\'apparitions}'
            for (let j = 0; j < tirages.length; j++) { sortie += '&' + tirages[j][1] }
            sortie += '\\\\\\hline\\end{array}$'
          };
        } else {
          sortie = ''
          if (tirages.length > 12) {
            sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 1/2
            for (let j = 0; j <= Math.round(tirages.length / 2); j++) { sortie += '|c' }
            sortie += '}\\hline  \\text{Scores}'
            for (let j = 0; j < Math.round(tirages.length / 2); j++) { sortie += '&' + tirages[j][0] }
            sortie += '\\\\\\hline \\text{Nombre d\'apparitions}'
            for (let j = 0; j < Math.round(tirages.length / 2); j++) { sortie += '&' + tirages[j][1] }
            sortie += '\\\\\\hline \\text{Nombre d\'apparitions cumulées}'
            for (let j = 0; j < Math.round(tirages.length / 2); j++) {
              let cumul = 0
              for (let k = 0; k <= j; k++) {
                cumul += tirages[k][1]
              }
              sortie += '&' + cumul// tirages[j][1];
            }
            sortie += '\\\\\\hline\\end{array}$<br><br>'

            sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 2/2
            for (let j = Math.round(tirages.length / 2); j <= tirages.length; j++) { sortie += '|c' }
            sortie += '}\\hline  \\text{Scores}'
            for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) { sortie += '&' + tirages[j][0] }
            sortie += '\\\\\\hline \\text{Nombre d\'apparitions}'
            for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) { sortie += '&' + tirages[j][1] }
            sortie += '\\\\\\hline \\text{Nombre d\'apparitions cumulées}'
            for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) {
              let cumul = 0
              for (let k = 0; k <= j; k++) {
                cumul += tirages[k][1]
              }
              sortie += '&' + cumul// tirages[j][1];
            }
            sortie += '\\\\\\hline\\end{array}$'
          } else {
            sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs en un seul morceau
            for (let j = 0; j <= tirages.length; j++) { sortie += '|c' }
            sortie += '}\\hline  \\text{Scores}'
            for (let j = 0; j < tirages.length; j++) { sortie += '&' + tirages[j][0] }
            sortie += '\\\\\\hline \\text{Nombre d\'apparitions}'
            for (let j = 0; j < tirages.length; j++) { sortie += '&' + tirages[j][1] }
            sortie += '\\\\\\hline \\text{Nombre d\'apparitions cumulées}'
            for (let j = 0; j < tirages.length; j++) {
              let cumul = 0
              for (let k = 0; k <= j; k++) {
                cumul += tirages[k][1]
              }
              sortie += '&' + cumul// tirages[j][1];
            }
            sortie += '\\\\\\hline\\end{array}$'
          };
        };
        return sortie
      }
      let repInteractive
      if (this.sup === 1) { // ici on lance des dés
        const solidName = (nbCot) => {
          switch (nbCot) {
            case 4:
              return 'tétraèdre'
            case 6:
              return 'hexaèdre'
            case 8:
              return 'octaèdre'
            case 10:
              return 'decaèdre'
            default:
              return 'cas non prévu'
          };
        }
        nombreDes = randint(1, 2)
        nombreFaces = choice([4, 6, 8, 10])
        if (listePairOuImpair[i] === 'pair') {
          nombreTirages = choice([50, 100, 200, 500, 1000, 2000])
        } else {
          nombreTirages = choice([49, 99, 199, 299, 999, 1999])
        }
        tirages = tirerLesDes(nombreTirages, nombreFaces, nombreDes) // on récupère une série rangée dans l'ordre croissant avec les effectifs correspondants
        do { indexValeur = randint(0, tirages.length - 1) }
        while (tirages[indexValeur][1] === 0) // on choisit au hasard l'index d'une valeur dont l'effectif est différent de 0.
        if (nombreDes > 1) {
          texte = `On a réalisé $${nombreTirages}$ lancers de $${nombreDes}$ dés à $${nombreFaces}$ faces.<br>`
        } else {
          texte = `On a réalisé $${nombreTirages}$ lancers d'un dé à $${nombreFaces}$ faces.<br>`
        }
        texte += lampeMessage({
          titre: 'Vocabulaire',
          texte: `Le solide qui correspond à ce type de dé s'appelle ${texteGras(solidName(nombreFaces))}.`,
          couleur: 'nombres'
        }) + '<br>'
        texte += 'Les résultats sont inscrits dans le tableau ci-dessous :<br><br>'
        texte += desTabEffCumul(tirages, false) + '<br>'

        texteCorr = `On a réalisé $${nombreTirages}$ lancers en tout.<br>`
        if (nombreTirages % 2 === 0) {
          texteCorr += `Le nombre de lancers est pair, les scores sont rangés dans l'ordre croissant.<br>
                    Les deux valeurs centrales sont la $${nombreTirages / 2}^{e}$ et la $${nombreTirages / 2 + 1}^{e}$ valeur.<br>
                    En effet, ${underbraceMediane(nombreTirages)} <br>
                    Une médiane est donc un score compris entre le $${nombreTirages / 2}^{e}$ et le $${nombreTirages / 2 + 1}^{e}$ score.<br>
                    On peut ajouter une ligne avec les effectifs cumulés pour trouver ces deux valeurs.<br><br>
                    ${desTabEffCumul(tirages, true)}<br><br>
                    `
          // on récupère le score des deux lancers médians
          const scoresMedians = []
          // compteur
          let cpt = 0
          // Pour cumuler les effectifs, tirages est un tableau 2D qui contient les couples [score,effectif]
          let effCumulCroiss = tirages[0][1]
          // On récupère le premier score médian
          while (effCumulCroiss < nombreTirages / 2) {
            cpt += 1
            effCumulCroiss += tirages[cpt][1]
          };
          scoresMedians.push(tirages[cpt][0])
          // On récupère le second score médian
          cpt = 0
          effCumulCroiss = tirages[0][1]
          while (effCumulCroiss < nombreTirages / 2 + 1) {
            cpt += 1
            effCumulCroiss += tirages[cpt][1]
          };
          scoresMedians.push(tirages[cpt][0])
          let medianeCorr // pour la correction statique
          scoresMedians[0] === scoresMedians[1] ? medianeCorr = scoresMedians[0] : medianeCorr = (scoresMedians[0] + scoresMedians[1]) / 2
          texteCorr += `D'où ${texteGras(`le score médian : ${stringNombre(medianeCorr)}`)}<br>`
          texteCorr += lampeMessage({
            titre: 'Interprétation',
            texte: `Ìl y a bien $${(nombreTirages) / 2}$ lancers dont le score est inférieur ou égal à  $${texNombre(medianeCorr)}$ et $${(nombreTirages) / 2}$ lancers dont le score est supérieur ou égal à  $${texNombre(medianeCorr)}$.`,
            couleur: 'nombres'
          })
          scoresMedians[0] === scoresMedians[1] ? repInteractive = scoresMedians[0] : repInteractive = scoresMedians
        } else { // Le nombre de lancers est impair ici
          texteCorr += `Le nombre de lancers est impair, les scores sont rangés dans l'odre croissant.<br>
          La valeur centrale est la $${(nombreTirages - 1) / 2 + 1}^{e}$ valeur.<br>
          En effet, ${underbraceMediane(nombreTirages)} <br>
          Une médiane est donc le $${(nombreTirages - 1) / 2 + 1}^{e}$ score.<br>
          On peut ajouter une ligne avec les effectifs cumulés pour trouver cette valeur.<br><br>
          ${desTabEffCumul(tirages, true)}<br><br>`
          // on récupère le score des deux lancers médians
          const scoresMedians = []
          // compteur
          let cpt = 0
          // Pour cumuler les effectifs, tirages est un tableau 2D qui contient les couples [score,effectif]
          let effCumulCroiss = tirages[0][1]
          // On récupère le premier score médian
          while (effCumulCroiss <= nombreTirages / 2) {
            cpt += 1
            effCumulCroiss += tirages[cpt][1]
          };
          scoresMedians.push(tirages[cpt][0])
          texteCorr += `D'où ${texteGras(`le score médian : ${stringNombre(scoresMedians[0])}`)}<br>`
          texteCorr += lampeMessage({
            titre: 'Interprétation',
            texte: `Ìl y a bien $${(nombreTirages - 1) / 2}$ lancers dont le score est inférieur ou égal à  $${texNombre(scoresMedians[0])}$ et $${(nombreTirages - 1) / 2}$ lancers dont le score est supérieur ou égal à  $${texNombre(scoresMedians[0])}$.`,
            couleur: 'nombres'
          })
          repInteractive = scoresMedians[0]
        }
      } else if (this.sup === 2) { // ici on trie des notes
        if (listePairOuImpair[i] === 'pair') {
          nombreNotes = choice([8, 10, 12])
        } else {
          nombreNotes = choice([7, 9, 11])
        }
        notes = listeDeNotes(nombreNotes, randint(0, 7), randint(13, 20)) // on récupère une liste de notes (série brute)
        indexValeur = randint(0, notes.length - 1) // on choisi une des notes au hasard
        texte = `${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`
        texte += `$${notes[0]}$`
        for (let j = 1; j < nombreNotes - 1; j++) { texte += `; $${notes[j]}$ ` } // On liste les notes (série brute)
        texte += `et $${notes[nombreNotes - 1]}$.`
        const notesRangees = notes.sort((a, b) => a - b)
        let mediane
        if (notes.length % 2 === 0) { // attention les indices commencent à 0 !
          notesRangees[notes.length / 2 - 1] === notesRangees[notes.length / 2] ? mediane = notesRangees[notes.length / 2 - 1] : mediane = [notesRangees[notes.length / 2 - 1], notesRangees[notes.length / 2]]
        } else {
          mediane = notesRangees[(notes.length - 1) / 2]
        }
        texteCorr = `Il y a $${notes.length}$ notes en tout. `
        if (notes.length % 2 === 0) {
          texteCorr += 'Le nombre de notes est pair.<br>'
        } else {
          texteCorr += 'Le nombre de notes est impair.<br>'
        };
        texteCorr += `Il faut par exemple ranger les notes dans l'ordre croissant : <br> $${notes[0]}$`
        for (let j = 1; j < nombreNotes - 1; j++) { texteCorr += `; $${notes[j]}$ ` } // On liste les notes (série brute)
        texteCorr += `et $${notes[nombreNotes - 1]}$.<br>`

        if (notes.length % 2 === 0) {
          texteCorr += `Les notes centrales sont la $${notes.length / 2}^{e}$ et la $${notes.length / 2 + 1}^{e}$.<br>
          En effet, ${underbraceMediane(notes.length)}<br>
          Une médiane est donc une note comprise entre la $${notes.length / 2}^{e}$ et la $${notes.length / 2 + 1}^{e}$ note, lorsque ces notes sont rangées.<br>`
        } else {
          texteCorr += `La note centrale est donc la $${(notes.length + 1) / 2}^{e}$.<br>
          En effet, ${underbraceMediane(notes.length)}<br>
          Une médiane est donc la $${(notes.length + 1) / 2}^{e}$ note, lorsque ces notes sont rangées.<br>`
        };
        let medianeCorr // pour la correction statique
        Array.isArray(mediane) ? medianeCorr = (mediane[0] + mediane[1]) / 2 : medianeCorr = mediane
        texteCorr += `D'où ${texteGras(`la note médiane : ${stringNombre(medianeCorr)}`)}<br>`
        if (notes.length % 2 === 0) {
          texteCorr += lampeMessage({
            titre: 'Interprétation',
            texte: `Ìl y a bien $${notes.length / 2}$ notes inférieures ou égales à  $${texNombre(medianeCorr)}$ et $${notes.length / 2}$ notes supérieures ou égales à  $${texNombre(medianeCorr)}$.`,
            couleur: 'nombres'
          })
        } else {
          texteCorr += lampeMessage({
            titre: 'Interprétation',
            texte: `Ìl y a bien $${(notes.length - 1) / 2}$ notes inférieures ou égales à  $${texNombre(medianeCorr)}$ et $${(notes.length - 1) / 2}$ notes supérieures ou égales à  $${texNombre(medianeCorr)}$.`,
            couleur: 'nombres'
          })
        }
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
        nombreTemperatures = joursParMois(mois, annee)
        temperatures = unMoisDeTemperature(temperaturesDeBase[mois - 1], mois, annee) // on récupère une série de température correspondant à 1 mois d'une année (série brute)
        indexValeur = randint(0, temperatures.length - 1) // on choisi l'index d'une valeur au hasard
        texte = `En ${nomDuMois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, on a relevé les températures suivantes<br>`
        texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // On construit le tableau des températures
        texte += '|c'
        for (let j = 0; j < Math.round(temperatures.length / 2); j++) { texte += '|c' }
        texte += '}\\hline  \\text{Jour}'
        for (let j = 0; j < Math.round(temperatures.length / 2); j++) { texte += '&' + texNombre(j + 1) }
        texte += '\\\\\\hline \\text{Température en}  ^\\circ\\text{C}'
        for (let j = 0; j < Math.round(temperatures.length / 2); j++) { texte += '&' + temperatures[j] }
        texte += '\\\\\\hline\\end{array}$<br><br>'
        texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // On construit le tableau des températures
        texte += '|c'
        for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { texte += '|c' }
        texte += '}\\hline  \\text{Jour}'
        for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { texte += '&' + texNombre(j + 1) }
        texte += '\\\\\\hline \\text{Température en}  ^\\circ\\text{C}'
        for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { texte += '&' + temperatures[j] }
        texte += '\\\\\\hline\\end{array}$'
        texteCorr = ''
        const temperaturesRangees = temperatures.sort((a, b) => a - b)
        let mediane
        if (temperatures.length % 2 === 0) { // attention les indices commencent à 0 !
          temperaturesRangees[temperatures.length / 2 - 1] === temperaturesRangees[temperatures.length / 2] ? mediane = temperaturesRangees[temperatures.length / 2 - 1] : mediane = [temperaturesRangees[temperatures.length / 2 - 1], temperaturesRangees[temperatures.length / 2]]
        } else {
          mediane = temperaturesRangees[(temperatures.length - 1) / 2]
        };
        texteCorr = `Il y a $${temperatures.length}$ températures relevées en tout. `
        if (temperatures.length % 2 === 0) {
          texteCorr += 'Le nombre de temperatures est pair.<br>'
        } else {
          texteCorr += 'Le nombre de temperatures est impair.<br>'
        };
        texteCorr += `Il faut par exemple ranger les temperatures dans l'ordre croissant : <br> $${temperatures[0]}$`
        for (let j = 1; j < nombreTemperatures - 1; j++) { texteCorr += `; $${temperatures[j]}$ ` } // On liste les temperatures (série brute)
        texteCorr += `et $${temperatures[nombreTemperatures - 1]}$.<br>`

        if (temperatures.length % 2 === 0) {
          texteCorr += `Les temperatures centrales sont la $${temperatures.length / 2}^{e}$ et la $${temperatures.length / 2 + 1}^{e}$.<br>
          En effet, ${underbraceMediane(temperatures.length)}<br>
          Une médiane est donc une temperature comprise entre la $${temperatures.length / 2}^{e}$ et la $${temperatures.length / 2 + 1}^{e}$ temperature, lorsque ces temperatures sont rangées.<br>`
        } else {
          texteCorr += `La temperature centrale est donc la $${(temperatures.length + 1) / 2}^{e}$.<br>
          En effet, ${underbraceMediane(temperatures.length)}<br>
          Une médiane est donc la $${(temperatures.length + 1) / 2}^{e}$ temperature, lorsque ces temperatures sont rangées.<br>`
        };
        let medianeCorr // pour la correction statique
        Array.isArray(mediane) ? medianeCorr = (mediane[0] + mediane[1]) / 2 : medianeCorr = mediane
        texteCorr += `D'où ${texteGras(`une temperature médiane : ${stringNombre(medianeCorr)}`)}<br>`
        if (temperatures.length % 2 === 0) {
          texteCorr += lampeMessage({
            titre: 'Interprétation',
            texte: `Ìl y a bien $${temperatures.length / 2}$ temperatures inférieures ou égales à  $${texNombre(medianeCorr)}$ et $${temperatures.length / 2}$ temperatures supérieures ou égales à  $${texNombre(medianeCorr)}$.`,
            couleur: 'nombres'
          })
        } else {
          texteCorr += lampeMessage({
            titre: 'Interprétation',
            texte: `Ìl y a bien $${(temperatures.length - 1) / 2}$ temperatures inférieures ou égales à  $${texNombre(medianeCorr)}$ et $${(temperatures.length - 1) / 2}$ temperatures supérieures ou égales à  $${texNombre(medianeCorr)}$.`,
            couleur: 'nombres'
          })
        }
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
