import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texteEnCouleurEtGras } from '../../modules/outils/contextSensitif.js'
import { calcul, texNombre } from '../../modules/outils/texNombres.js'
import { nombreAvecEspace } from '../../modules/outils/stringNombre.js'

export const titre = 'Stabilisation des fréquences'

/**
 * Reconnaître une fonction affine
* @author Erwan Duplessy
* 3S21
* D'après le document "Attendus en fin de 3eme"
* On donne les fréquences d\'apparition de chaque face d\'un dé pour 10000 lancers.
* L\'élève interprète les résultats en les comparant aux probabilités théoriques.
*/

export default function StabilisationFrequence () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 4 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

  this.sup = 1 // situation 1=dés
  this.sup2 = 10000 // nbLancers
  this.sup3 = false // true = équiprobable, false = jeu truqué

  if (context.isHtml) {
    this.consigne = '<center><a title="Diacritica, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Dice_(typical_role_playing_game_dice).jpg"><img width="128" alt="Dice (typical role playing game dice)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Dice_%28typical_role_playing_game_dice%29.jpg/128px-Dice_%28typical_role_playing_game_dice%29.jpg"></a></center>'
  }

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const typesDeQuestionsDisponibles = [1, 2, 3, 4] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      const nbFaces = 2 * randint(1, 4) + 2 // nombre de faces du dé : 4, 6, 8, ou 10. Avec 12, le tableau devient trop grand....
      const nbLancers = 10000 // nombre de lancers
      const tabcoul = ['rouges', 'vertes', 'bleues', 'noires']
      let tabEff = [] // tableau d'effectifs temporaires - une dimension [eff]
      let tabEffModif = [] // tableau d'effectifs temporaires après modification - une dimension [eff]
      let S1 = 0; let S2 = 0 // effectif total
      const tabRes = [] // tableau des fréquences observées - deux dimensions [val, freq]
      const tabProba = [] // tableau des proba théoriques, à comparer à tabRes
      const tabValeur = [] // numéro de la face du dé
      let titreligne = 'Numéro de la face' // ou "couleur de la boule"
      let tabtitrecolonne = tabValeur // ou tabcoul
      let face = 0
      let N = 0 // largeur du tableau

      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1:
          // avec un dé
          // Cas où les fréquesnces rejoignent les proba
          texte += `On lance un dé équilibré à ${nbFaces} faces ${nombreAvecEspace(nbLancers)} fois. On étudie les fréquences d'apparition de chaque face. On obtient les résultats suivants : <br>`
          for (let i = 0; i < nbFaces; i++) {
            tabValeur[i] = i + 1
            tabEff[i] = [randint(90, 110)]
            S1 += parseInt(tabEff[i])
          }
          for (let i = 0; i < nbFaces; i++) {
            tabRes[i] = [i, calcul(tabEff[i] / S1)]
          }
          texteCorr += 'Le dé est équilibré, donc c\'est une situation d\'équiprobabilité. Chaque face du dé a une probabilité égale à '
          switch (nbFaces) {
            case 4:
              texteCorr += ' $\\dfrac{1}{4} = 25\\%$ '
              break
            case 6:
              texteCorr += ' $\\dfrac{1}{6} \\approx  16.7\\%$ '
              break
            case 8:
              texteCorr += ' $\\dfrac{1}{8} = 12.5\\%$ '
              break
            case 10:
              texteCorr += ' $\\dfrac{1}{10} = 10\\%$ '
              break
            case 12:
              texteCorr += ' $\\dfrac{1}{12} \\approx 8.3\\%$ '
              break
          }
          texteCorr += 'd\'apparaître. <br>'
          texteCorr += `Comme le dé a été lancé ${nombreAvecEspace(nbLancers)} fois, les fréquences doivent se stabiliser autour de la probabilité. `
          texteCorr += 'Les valeurs du tableau de fréquences sont toutes proches de cette probabilité. <br>'
          texteCorr += texteEnCouleurEtGras('Conclusion : les résultats semblent respecter le principe de stabilisation des fréquences ; le tableau est bien compatible avec un lancer aléatoire de dé. ')
          break

        case 2:
          // avec un dé
          // Cas où les fréquences ne rejoignent pas les proba
          texte += `On lance un dé équilibré à ${nbFaces} faces ${nombreAvecEspace(nbLancers)} fois. On étudie les fréquences d'apparition de chaque face. On obtient les résultats suivants : <br>`
          face = randint(1, nbFaces) // on choisit une face au hasard. Elle aura une fréquence déséquilibrée.
          for (let i = 0; i < nbFaces; i++) {
            tabValeur[i] = i + 1
            if (i === face) {
              tabEff[i] = [2 * randint(90, 110)]
            } else {
              tabEff[i] = [randint(90, 110)]
            }
            S1 += parseInt(tabEff[i])
          }
          for (let i = 0; i < nbFaces; i++) {
            tabRes[i] = [i, calcul(tabEff[i] / S1)]
          }
          texteCorr += 'Le dé est équilibré, donc c\'est une situation d\'équiprobabilité. Chaque face du dé a une probabilité égale à '
          switch (nbFaces) {
            case 4:
              texteCorr += ' $\\dfrac{1}{4} = 25\\%$ '
              break
            case 6:
              texteCorr += ' $\\dfrac{1}{6} \\approx  16.7\\%$ '
              break
            case 8:
              texteCorr += ' $\\dfrac{1}{8} = 12.5\\%$ '
              break
            case 10:
              texteCorr += ' $\\dfrac{1}{10} = 10\\%$ '
              break
            case 12:
              texteCorr += ' $\\dfrac{1}{12} \\approx 8.3\\%$ '
              break
          }
          texteCorr += 'd\'apparaître. <br>'
          texteCorr += `Comme le dé a été lancé ${nombreAvecEspace(nbLancers)} fois, les fréquences devraient se stabiliser autour de la probabilité. `
          texteCorr += 'Cependant, une valeur du tableau de fréquences est éloignée de cette probabilité. <br>'
          texteCorr += `Il s'agit de la fréquence d'apparition du ${tabValeur[face]}. <br>`
          texteCorr += texteEnCouleurEtGras('Conclusion : les résultats ne semblent pas respecter le principe de stabilisation des fréquences ; le tableau n\'est pas compatible avec un lancer aléatoire de dé.')
          break

        case 3:
          // avec une urne et des boules
          // Cas où les fréquences rejoignent les proba
          texte += 'CAS 3 *********************** <br>'
          tabEff = [randint(2, 9), randint(2, 9), randint(2, 9), randint(2, 9)]
          S1 = tabEff.reduce((a, b) => a + b, 0)
          for (let i = 0; i < 4; i++) {
            tabProba[i] = [tabcoul[i], calcul(tabEff[i] / S1)]
          }

          texte += 'Dans une urne opaque, il y a '
          for (let i = 0; i < 3; i++) {
            texte += `${tabEff[i]} boules ${tabcoul[i]}, `
          }
          texte += `et ${tabEff[3]} boules ${tabcoul[3]}. <br>`
          texte += `On prend une boule, on note sa couleur, et on remet la boule dans l'urne. On répète ce processus ${nombreAvecEspace(nbLancers)} fois. `
          texte += 'On étudie les fréquences d\'apparition de chaque couleur. On obtient les résultats suivants : <br>'
          tabEffModif = tabEff.map(x => x * (1 + randint(-50, 50) / 1000)) // on modifie très légèrement le tirage max 5%
          S2 = tabEff.reduce((a, b) => a + b, 0)
          for (let i = 0; i < 4; i++) {
            tabRes[i] = [tabcoul[i], calcul(tabEffModif[i] / S2)]
          }
          titreligne = 'Couleur des boules' // pour remplir le tableau
          tabtitrecolonne = tabcoul
          texteCorr += `Chaque boule a la même probabilité d'être choisie. Par exemple, la probabilité de tirer une boule ${tabcoul[0]} est : $\\dfrac{${tabEff[0]}}{${S1}}$. `
          texteCorr += 'Les probabilités théoriques sont : <br>'
          N = tabtitrecolonne.length
          texteCorr += '$\\begin{array}{|l|' + 'c|'.repeat(N) + '}\n'
          texteCorr += '\\hline\n'
          texteCorr += `\\text{${titreligne}}`
          for (let i = 0; i < N; i++) {
            texteCorr += ` & \\textbf{\\text{${tabtitrecolonne[i]}}}`
          }
          texteCorr += '\\\\\\hline\n'
          texteCorr += '\\text{Fréquence d\'apparition (en fraction)}'
          for (let i = 0; i < N; i++) {
            texteCorr += ` & \\dfrac{${tabEff[i]}}{${S1}} ` // probleme d'espace
          }
          texteCorr += '\\\\\\hline\n'
          texteCorr += '\\text{Fréquence d\'apparition (en pourcentage)}'
          for (let i = 0; i < N; i++) {
            texteCorr += ` & \\text{${texNombre(100 * tabEff[i] / S1, 1)}} \\% `
          }
          texteCorr += '\\\\\\hline\n'
          texteCorr += '\\end{array}\n$ <br>'
          texteCorr += 'Les probabilités semblent très proches des fréquences observées. <br>'
          texteCorr += texteEnCouleurEtGras('Conclusion : les résultats semblent respecter le principe de stabilisation des fréquences; le tableau est bien compatible avec un tirage aléatoire dans une urne.')

          break

        case 4:
          // avec une urne et des boules
          // Cas où les fréquences rejoignent les proba
          texte += 'CAS 4 *********************** <br>'
          face = randint(1, nbFaces) // on choisit une couleur au hasard. Elle aura une fréquence déséquilibrée.
          tabEff = [randint(2, 9), randint(2, 9), randint(2, 9), randint(2, 9)]
          S1 = tabEff.reduce((a, b) => a + b, 0)
          for (let i = 0; i < 4; i++) {
            tabProba[i] = [tabcoul[i], calcul(tabEff[i] / S1)]
          }
          texte += 'Dans une urne opaque, il y a '
          for (let i = 0; i < 3; i++) {
            texte += `${tabEff[i]} boules ${tabcoul[i]}, `
          }
          texte += `et ${tabEff[3]} boules ${tabcoul[3]}. <br>`
          texte += `On prend une boule, on note sa couleur, et on remet la boule dans l'urne. On répète ce processus ${nombreAvecEspace(nbLancers)} fois. `
          texte += 'On étudie les fréquences d\'apparition de chaque couleur. On obtient les résultats suivants : '
          tabEffModif = tabEff.map(x => x * (1 + randint(-50, 50) / 1000)) // on modifie très légèrement le tirage de max 5%
          tabEffModif[face] = 1.75 * tabEff[face] // on augmente de 75% l'effectif d'une couleur
          S2 = tabEffModif.reduce((a, b) => a + b, 0)
          for (let i = 0; i < 4; i++) {
            tabRes[i] = [tabcoul[i], calcul(tabEffModif[i] / S2)]
          }
          // CORRECTION :
          titreligne = 'Couleur des boules' // pour remplir le tableau
          tabtitrecolonne = tabcoul
          texteCorr += `Chaque boule a la même probabilité d'être choisie. Par exemple, la probabilité de tirer une boule ${tabcoul[0]} est : $\\dfrac{${tabEff[0]}}{${S1}}$. `
          texteCorr += 'Les probabilités théoriques sont : <br>'
          N = tabtitrecolonne.length
          texteCorr += '$\\begin{array}{|l|' + 'c|'.repeat(N) + '}\n'
          texteCorr += '\\hline\n'
          texteCorr += `\\text{${titreligne}}`
          for (let i = 0; i < N; i++) {
            texteCorr += ` & \\textbf{\\text{${tabtitrecolonne[i]}}}`
          }
          texteCorr += '\\\\\\hline\n'
          texteCorr += '\\text{Fréquence d\'apparition (en fraction)}'
          for (let i = 0; i < N; i++) {
            texteCorr += ` & \\dfrac{${tabEff[i]}}{${S1}} ` // probleme d'espace
          }
          texteCorr += '\\\\\\hline\n'
          texteCorr += '\\text{Fréquence d\'apparition (en pourcentage)}'
          for (let i = 0; i < N; i++) {
            texteCorr += ` & \\text{${texNombre(100 * tabEff[i] / S1, 1)}} \\% `
          }
          texteCorr += '\\\\\\hline\n'
          texteCorr += '\\end{array}\n$ <br>'
          texteCorr += `Les valeurs de fréquence et de probabilité pour les boules ${tabcoul[face]} ne correspondent pas. Il y a trop de différence. <br>`
          texteCorr += texteEnCouleurEtGras('Conclusion : les résultats ne semblent pas respecter le principe de stabilisation des fréquences ; le tableau n\'est pas compatible avec un tirage aléatoire dans une urne.')

          break
      }
      N = tabtitrecolonne.length

      context.isHtml ? texte += '<br><center>' : texte += '\\begin{center}'

      texte += '$\\begin{array}{|l|' + 'c|'.repeat(N) + '}\n'
      texte += '\\hline\n'
      texte += `\\text{${titreligne}}`
      for (let i = 0; i < N; i++) {
        texte += ` & \\textbf{\\text{${tabtitrecolonne[i]}}}`
      }
      texte += '\\\\\\hline\n'
      texte += '\\text{Fréquence d\'apparition}'
      for (let i = 0; i < N; i++) {
        texte += ` & \\text{${texNombre(100 * tabRes[i][1], 1)}} \\% `
      }
      texte += '\\\\\\hline\n'
      texte += '\\end{array}\n$'
      context.isHtml ? texte += '</center>' : texte += '\\end{center}'

      texte += '<br>'
      texte += 'Ces résultats vous semblent-ils respecter les principes des probabilités ? Détailler votre réponse en vous basant sur des calculs.<br>'

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  this.besoinFormulaireNumerique = ['Type d\'expérience', 2, '1 : Tirage de dés\n 2 : Tirage dans une urne']
  this.besoinFormulaire2Texte = ['Nombre de tirages']
  this.besoinFormulaire3CaseACocher = ['équiprobabilité', true]
} // Fin de l'exercice.
