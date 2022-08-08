import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, calcul, texNombre, nombreAvecEspace } from '../../modules/outils.js'
import { fraction } from '../../modules/fractions.js'
import { repere, traceBarre, mathalea2d } from '../../modules/2d.js'

export const titre = 'Simulation d\'expériences aléatoires'

/**
 * Reconnaître une fonction affine
* @author Erwan Duplessy
* 6C30-1
* D'après le document "Attendus en fin de 3eme"
* On donne les fréquences d\'apparition de chaque face d\'un dé pour 10000 lancers.
* L\'élève interprète les résultats en les comparant aux probabilités théoriques.
*/

export default function SimulateurAleatoire () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  this.sup = 1 // situation 1=dés
  this.sup2 = 10000 // nbLancers
  this.sup3 = false // true = équiprobable, false = jeu truqué

  this.consigne = '<center><a title="Diacritica, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Dice_(typical_role_playing_game_dice).jpg"><img width="128" alt="Dice (typical role playing game dice)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Dice_%28typical_role_playing_game_dice%29.jpg/128px-Dice_%28typical_role_playing_game_dice%29.jpg"></a></center>'

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    let texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
    let texteCorr = ''
    let nbFaces = 2 * randint(1, 5) + 2 // nombre de faces du dé : 4, 6, 8, 10 ou 12
    const nbLancers = parseInt(this.sup2) // nombre de lancers
    const tabEff = []// tableau d'effectifs temporaires - une dimension [eff]
    let S = 0 // effectif total
    const tabRes = [] // tableau des fréqeunces observées - deux dimensions [val, freq]
    this.listeCorrections = []
    this.listeQuestions = []
    const tabcoul = ['rouges', 'vertes', 'bleues', 'noires']
    const tabNbBoules = [randint(2, 5), randint(2, 5), randint(2, 5), randint(2, 5)]
    let nbBoules = 0; let f; let choix
    let face
    for (let i = 0; i < 4; i++) {
      nbBoules += tabNbBoules[i]
    }

    switch (parseInt(this.sup)) { //
      case 1: // Tirages de dés
        f = fraction(1, nbFaces)
        texteCorr = `Chaque face a la même probabilité de sortir : $${f.texFraction}\\approx ${texNombre(f.pourcentage, 2)}\\%$.<br>`

        texte += `On lance un dé à ${nbFaces} faces ${nombreAvecEspace(nbLancers)} fois.<br>On étudie les fréquences d'apparition de chaque face.<br>On obtient les résultats suivants : <br>`
        if (this.sup3) {
          for (let i = 0; i < nbFaces; i++) {
            tabEff.push(0)
          }
          for (let i = 0; i < nbLancers; i++) {
            tabEff[randint(1, nbFaces) - 1]++
          }
          for (let i = 0; i < nbFaces; i++) {
            tabRes[i] = [i, calcul(tabEff[i] / nbLancers)]
          }
        } else {
          face = randint(1, nbFaces) // on choisit une face au hasard. Elle aura une fréquence déséquilibrée.
          for (let i = 0; i < nbFaces; i++) {
            tabEff.push(0)
          }
          for (let i = 0; i < nbFaces; i++) {
            tabEff.push(0)
          }
          for (let i = 0; i < nbLancers; i++) {
            tabEff[randint(1, nbFaces) - 1]++
          }
          S = tabEff[face - 1] * 3 / 4
          tabEff[randint(1, nbFaces, face) - 1] += S
          tabEff[face - 1] -= S
          for (let i = 0; i < nbFaces; i++) {
            tabRes[i] = [i, calcul(tabEff[i] / nbLancers)]
          }
          texteCorr += 'Ici, l\'expérience montre qu\'il y a quelque chose qui semble fausser cette équiprobabilité comme un dé truqué.<br>'
          texteCorr += `En effet, la fréquence de la face $${face}$ est largement inférieure à $${texNombre(f.pourcentage, 2)}\\%$.`
        }

        break

      case 2: // Tirage dans une urne
        face = randint(1, 4)
        texte += 'Des boules de différentes couleurs sont placées dans une urne.<br>'
        texte += `Il y a $${tabNbBoules[0]}$ ${tabcoul[0]}, $${tabNbBoules[1]}$ ${tabcoul[1]}, $${tabNbBoules[2]}$ ${tabcoul[2]} et $${tabNbBoules[3]}$ ${tabcoul[3]}.<br>`
        texte += `On effectue $${nbLancers}$ tirages avec remise.<br>`
        texte += 'On étudie les fréquences d\'apparition de chaque couleur.<br>On obtient les résultats suivants : <br>'
        f = fraction(tabNbBoules[face - 1], nbBoules)
        if (this.sup3) {
          nbFaces = 4
          for (let i = 0; i < nbFaces; i++) {
            tabEff.push(0)
          }
          for (let i = 0; i < nbLancers; i++) {
            choix = randint(1, nbBoules)
            if (choix <= tabNbBoules[0]) {
              tabEff[0]++
            } else if (choix <= tabNbBoules[0] + tabNbBoules[1]) {
              tabEff[1]++
            } else if (choix <= tabNbBoules[0] + tabNbBoules[1] + tabNbBoules[2]) {
              tabEff[2]++
            } else {
              tabEff[3]++
            }
          }
          for (let i = 0; i < nbFaces; i++) {
            tabRes[i] = [i, calcul(tabEff[i] / nbLancers)]
          }
        } else {
          nbFaces = 4
          for (let i = 0; i < nbFaces; i++) {
            tabEff.push(0)
          }
          for (let i = 0; i < nbLancers; i++) {
            choix = randint(0, nbBoules - 1)
            if (choix < tabNbBoules[0]) {
              tabEff[0]++
            } else if (choix < tabNbBoules[0] + tabNbBoules[1]) {
              tabEff[1]++
            } else if (choix < tabNbBoules[0] + tabNbBoules[1] + tabNbBoules[2]) {
              tabEff[2]++
            } else {
              tabEff[3]++
            }
          }
          S = tabEff[face - 1] * 3 / 4
          tabEff[randint(1, 4, face) - 1] += S
          tabEff[face - 1] -= S
          for (let i = 0; i < nbFaces; i++) {
            tabRes[i] = [i, calcul(tabEff[i] / nbLancers)]
          }
          texteCorr += 'Ici, l\'expérience montre qu\'il y a quelque chose qui semble fausser cette équiprobabilité comme des boules discernables au toucher.<br>'
          texteCorr += `En effet, la fréquence des boules ${tabcoul[face - 1]} est largement inférieure à $${f.texFraction}\\approx ${texNombre(f.pourcentage, 2)}\\%$.`
        }
        break
    }
    switch (parseInt(this.sup)) {
      case 1:
        texte += '$\\begin{array}{|l|' + 'c|'.repeat(nbFaces) + '}\n'
        texte += '\\hline\n'
        texte += '\\text{Numéro de la face}'
        for (let i = 0; i < nbFaces; i++) {
          texte += ` & \\textbf{\\text{${i + 1}}}`
        }
        texte += '\\\\\\hline\n'
        texte += '\\text{Fréquence d\'apparition}'
        for (let i = 0; i < nbFaces; i++) {
          texte += ` & ${texNombre(100 * tabRes[i][1], 1)} \\% `
        }
        texte += '\\\\\\hline\n'
        texte += '\\end{array}\n$'
        texte += '<br>'
        if (this.correctionDetaillee) {
          const coef = 10
          const r = repere({
            grilleX: false,
            grilleY: 'pointilles',
            xThickListe: [],
            xLabelListe: [],
            yUnite: 1 / coef,
            yThickDistance: 1 * coef,
            yMax: 40,
            xMin: 0,
            xMax: 10,
            yMin: 0,
            axeXStyle: '',
            yLegende: 'fréquences en %'
          })

          const lstElementGraph = []
          for (let i = 0; i < nbFaces; i++) {
            lstElementGraph.push(traceBarre(((r.xMax - r.xMin) / nbFaces) * (i + 0.5), tabRes[i][1] * 10, i + 1), { unite: 1 / coef })
          }
          texte += mathalea2d({ xmin: -1, xmax: 11, ymin: -4, ymax: 5.5, pixelsParCm: 30, scale: 1 }, r, lstElementGraph)
        }
        break
      case 2:
        texte += '$\\begin{array}{|l|' + 'c|'.repeat(nbFaces) + '}\n'
        texte += '\\hline\n'
        texte += '\\text{Couleur de la boule}'
        for (let i = 0; i < nbFaces; i++) {
          texte += ` & \\textbf{\\text{${tabcoul[i].substring(0, tabcoul[i].length - 1)}}}`
        }
        texte += '\\\\\\hline\n'
        texte += '\\text{Fréquence d\'apparition}'
        for (let i = 0; i < nbFaces; i++) {
          texte += ` & ${texNombre(100 * tabRes[i][1], 1)} \\%`
        }
        texte += '\\\\\\hline\n'
        texte += '\\end{array}\n$'
        texte += '<br>'
        if (this.correctionDetaillee) {
          const coef = 10
          const r = repere({
            grilleX: false,
            grilleY: 'pointilles',
            xThickListe: [],
            xLabelListe: [],
            yUnite: 1 / coef,
            yThickDistance: 1 * coef,
            yMax: 55,
            xMin: 0,
            xMax: 10,
            yMin: 0,
            axeXStyle: '',
            yLegende: 'fréquences en %'
          })

          const lstElementGraph = []
          for (let i = 0; i < nbFaces; i++) {
            lstElementGraph.push(traceBarre(((r.xMax - r.xMin) / nbFaces) * (i + 0.5), tabRes[i][1] * 10, tabcoul[i]), { unite: 1 / coef })
          }
          texte += mathalea2d({ xmin: -1, xmax: 12, ymin: -4, ymax: 7, pixelsParCm: 30, scale: 1 }, r, lstElementGraph)
        }
        break
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  this.besoinFormulaireNumerique = ['Type d\'expérience', 2, '1 : Tirage de dés\n 2 : Tirage dans une urne']
  this.besoinFormulaire2Texte = ['Nombre de tirages', `Taper un nombre entier : ${10000}`]
  this.besoinFormulaire3CaseACocher = ['Équiprobabilité', true]
} // Fin de l'exercice.
