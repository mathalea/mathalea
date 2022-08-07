import Exercice from '../../Exercice.js'
import { fraction } from '../../../modules/fractions.js'
import {
  mathalea2d, point, labelPoint, polygoneAvecNom, milieu, texteParPosition, tracePoint, repere, polygone, codageAngleDroit, latexParCoordonnees
} from '../../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, arrondi, randint, texNombre, shuffle, ecritureParentheseSiNegatif, simplificationDeFractionAvecEtapes, choice, calcul, sp } from '../../../modules/outils.js'
import { setReponse } from '../../../modules/gestionInteractif.js'

import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
export const titre = 'CAN 4ième sujet 2022'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '01/05/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export default function SujetCAN2022quatrieme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 30// 10,20,30
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const nbQ1 = min(round(this.nbQuestions * 10 / 30), 10) // Choisir d'un nb de questions de niveau 1 parmi les 7 possibles.
    const nbQ2 = min(this.nbQuestions - nbQ1, 20)
    const typeQuestionsDisponiblesNiv1 = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(-nbQ1).sort(compareNombres)
    const typeQuestionsDisponiblesNiv2 = shuffle([11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30]).slice(-nbQ2).sort(compareNombres)
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))
    const listeFractions18 = [[8, 14], [6, 14], [4, 14], [6, 16], [10, 16],
      [8, 12], [8, 10], [10, 12], [6, 18], [4, 18], [12, 16], [14, 16], [14, 18], [2, 18], [2, 14]
    ]
    const listeFractions12 = [[1, 4], [3, 4], [3, 2], [5, 2], [1, 5], [2, 5], [3, 5],
      [4, 5], [6, 5], [5, 4], [7, 4], [9, 4]
    ]
    const listeFractions24 = [[5, 3], [7, 9], [3, 7], [5, 7], [9, 7], [2, 9], [4, 7], [11, 5], [11, 3]
    ]
    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, fraction18, lA, traceA, indice, o, r, poly, propositions, chiffre, chiffre2, u, k1, k2, e, f, choix, a, b, c, k, A, B, C, D, d, triplet, pol, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[i]) {
        case 1:
          a = randint(4, 9)
          b = randint(4, 9)
          texte = `$${a} \\times ${b}=$ `
          texteCorr = `$${a} \\times ${b}=${a * b}$`
          reponse = a * b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 2:
          chiffre = [['un', 1], ['deux', 2], ['trois', 3], ['cinq', 5], ['quatre', 4], ['six', 6], ['sept', 7], ['huit', 8], ['neuf', 9]]
          chiffre2 = [['vingt', 20], ['trente', 30], ['quarante', 40], ['cinquante', 50], ['soixante', 60]]
          a = randint(0, 8)
          b = randint(0, 4)
          c = randint(0, 8)
          d = randint(0, 4)
          if (choice([true, false])) {
            chiffre = [['un', 1], ['deux', 2], ['trois', 3], ['cinq', 5], ['quatre', 4], ['six', 6], ['sept', 7], ['huit', 8], ['neuf', 9]]
            chiffre2 = [['vingt', 20], ['trente', 30], ['quarante', 40], ['cinquante', 50], ['soixante', 60]]
            a = randint(0, 8)
            b = randint(0, 4)
            c = randint(0, 8)
            d = randint(0, 4)
            if (a === 0) {
              texte = `Ecris en chiffres le nombre : <br>
              ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre[c][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]
              texteCorr = ` ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre[c][0]}$=
              ${(chiffre2[b][1] + chiffre[a][1]) * 1000} + ${chiffre[c][1]}=${(chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]}$ `
            } else {
              texte = `Ecris en chiffres le nombre : <br>
                          ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre[c][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]
              texteCorr = ` ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre[c][0]}$=
                          ${(chiffre2[b][1] + chiffre[a][1]) * 1000} + ${chiffre[c][1]}=${(chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]}$ `
            }
          } else {
            if (a === 0) {
              texte = `Ecris en chiffres le nombre : <br>
              ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre2[d][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]
              texteCorr = ` ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre2[d][0]}$=
              ${(chiffre2[b][1] + chiffre[a][1]) * 1000} + ${chiffre2[d][1]}=${(chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]}$ `
            } else {
              texte = `Ecris en chiffres le nombre : <br>
                          ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre2[d][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]
              texteCorr = ` ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre2[d][0]}$=
                          ${(chiffre2[b][1] + chiffre[a][1]) * 1000} + ${chiffre2[d][1]}=${(chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]}$ `
            }
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }

          nbChamps = 1
          break

        case 3:
          a = randint(51, 98, [49, 59, 69, 79, 89])
          b = choice([19, 29])
          reponse = a - b
          texte = `$${a}-${b}=$ `
          texteCorr = `$${a}-${b}=${a}-${b + 1}+1=${a - b}$ `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 4:
          if (choice([true, false])) {
            a = randint(1, 13) * 50
            reponse = a / 100
            texte = `$${a}$ cm  $=$`

            texteCorr = `
        Comme $1$ m $=100$ cm, alors $1$ cm $=0,01$ m.<br>
        Ainsi pour passer des "m" au "cm", on divise par $100$.<br>
          Comme : $${a}\\div 100 =${texNombre(a / 100, 2)}$, alors $${a}$ cm$=${texNombre(a / 100, 2)}$ m.  `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'm'
            } else { texte += '  $\\ldots$ m' }
          } else {
            a = randint(1, 9) + randint(1, 9) / 10
            reponse = a * 100
            texte = `$${texNombre(a, 1)}$ m  $=$ `
            texteCorr = ` Comme $1$ m $=100$ cm,  pour passer des "m" au "cm", on multiplie par $100$.<br>
                Comme : $${texNombre(a, 1)}\\times 100 =${texNombre(a * 100, 0)}$, alors $${texNombre(a, 2)}$ m$=${texNombre(reponse, 0)}$ cm.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
            } else { texte += '  $\\ldots$ cm' }
          }
          nbChamps = 1

          break
        case 5:
          a = randint(31, 89, [40, 50, 60, 70, 80])
          choix = choice(['a', 'b'])
          if (choix === 'a') {
            if (choice([true, false])) {
              texte = `$2\\times${a}\\times 5=$
             `
              texteCorr = `$2\\times${a}\\times 5=10\\times ${a}=${10 * a}$`
            } else {
              texte = `$5\\times${a}\\times 2=$
             `
              texteCorr = `$5\\times${a}\\times 2=10\\times ${a}=${10 * a}$`
            }

            reponse = 10 * a
          }
          if (choix === 'b') {
            if (choice([true, false])) {
              texte = `$4\\times${a}\\times 25=$
             `
              texteCorr = `$4\\times${a}\\times 25=100\\times ${a}=${100 * a}$`
            } else {
              texte = `$50\\times${a}\\times 2=$
             `
              texteCorr = `$50\\times${a}\\times 2=100\\times ${a}=${100 * a}$`
            }

            reponse = 100 * a
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 6:
          u = randint(21, 99)
          a = randint(1, 9)
          c = randint(1, 9)
          reponse = u + a * 0.1 + c * 0.001
          if (choice([true, false])) {
            texte = `Ecrire sous forme décimale : $${u}+\\dfrac{${a}}{10}+\\dfrac{${c}}{1000}$ `
            texteCorr = `$${u}+\\dfrac{${a}}{10}+\\dfrac{${c}}{1000}=${u}+${texNombre(a / 10, 1)}+${texNombre(c / 1000, 3)}=${texNombre(u + a / 10 + c / 1000, 3)}$`
          } else {
            texte = `Ecrire sous forme décimale : $${u}+\\dfrac{${c}}{1000}+\\dfrac{${a}}{10}$ `
            texteCorr = `$${u}+\\dfrac{${c}}{1000}+\\dfrac{${a}}{10}=${u}+${texNombre(c / 1000, 3)}+${texNombre(a / 10, 1)}=${texNombre(u + a / 10 + c / 1000, 3)}$
             `
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 7:
          a = randint(1, 9)
          b = randint(3, 9)
          c = randint(3, 9)
          reponse = a + b * c
          texte = `$${a}+${b}\\times ${c}=$`
          texteCorr = `La multiplication est prioritaire : $${a}+${b}\\times ${c}=${a}+${b * c}$
                                   `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 8:
          a = randint(42, 98, [49, 51, 59, 61, 69, 71, 79, 81, 89])
          b = choice([19, 29])
          reponse = a + b
          texte = `$${a}+${b}=$ `
          texteCorr = `$${a}+${b}=${a}+${b + 1}-1=${a + b}$ `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 9:
          choix = choice(['a', 'b', 'c'])//, 'b'
          if (choix === 'a') {
            a = randint(45, 49) + randint(1, 9) / 10
            b = randint(2, 5) + randint(1, 9) / 10

            propositions = shuffle([`$${texNombre(a * b / 10, 3)}$`, `$${texNombre(a * b * 10, 1)}$`, `$${texNombre(a * b, 2)}$`])
            reponse = arrondi(a * b, 3)
            texte = `Recopie  le résultat de  : 
            $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$<br>`

            texte += `${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}`
            texteCorr = `En prenant un ordre de grandeur pour chacun des deux nombres, on obtient  $50\\times ${Math.round(b)}=${50 * Math.round(b)}$.`
          }
          if (choix === 'b') {
            a = randint(3, 9) + randint(1, 9) / 10
            b = randint(2, 5) + randint(1, 9) / 10
            propositions = shuffle([`$${texNombre(a * b / 10, 3)}$`, `$${texNombre(a * b * 10, 1)}$`, `$${texNombre(a * b, 2)}$`])
            reponse = arrondi(a * b, 3)
            texte = `Recopie  le résultat de  : 
                $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$<br>`

            texte += `${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}`
            texteCorr = `En prenant un ordre de grandeur pour chacun des deux nombres, on obtient  $${Math.round(a)}\\times ${Math.round(b)}=${Math.round(a) * Math.round(b)}$.`
          }
          if (choix === 'c') {
            a = randint(45, 49) + randint(1, 9) / 10
            b = randint(25, 29) + randint(1, 9) / 10
            propositions = shuffle([`$${texNombre(a * b / 10, 3)}$`, `$${texNombre(a * b * 10, 1)}$`, `$${texNombre(a * b, 2)}$`])
            reponse = arrondi(a * b, 3)
            texte = `Recopie  le résultat de  : 
                    $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$<br>`

            texte += `${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}`
            texteCorr = 'En prenant un ordre de grandeur pour chacun des deux nombres, on obtient  $30\\times 50=1500$.'
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 10:
          a = randint(1, 9)
          b = randint(1, 9, a)
          c = randint(1, 9, b)
          f = a * 100 + b * 10 + c
          d = choice([0.1, 0.01, 0.001])
          reponse = arrondi(f * d, 3)

          if (d === 0.1) {
            texte = `$${f}\\times ${texNombre(d, 1)}=$`
            texteCorr = `$${f}\\times ${texNombre(d, 1)}=${texNombre(this.reponse)}$`
            texteCorr += `
          $${f}\\times ${texNombre(d, 1)}=${f}\\div 10=${a}${b},\\underline{${c}}$ `
          }
          if (d === 0.01) {
            texte = `$${f}\\times ${texNombre(d, 2)}=$`
            texteCorr = `$${f}\\times ${texNombre(d, 2)}=${texNombre(this.reponse)}$`
            texteCorr += `
          $${f}\\times ${texNombre(d, 2)}=${f}\\div 100=${a},${b}\\underline{${c}}$<br>
                      `
          }
          if (d === 0.001) {
            texte = `$${f}\\times ${texNombre(d, 3)}=$`
            texteCorr = `$${f}\\times ${texNombre(d, 3)}=${texNombre(this.reponse)}$`
            texteCorr += `
          $${f}\\times ${texNombre(d, 3)}=${f}\\div 1000=0,${a}${b}\\underline{${c}}$<br>

             `
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 11:

          a = choice([1, 10])
          b = randint(2, 199)
          texte = `$${a}\\%$ de $${b} =$
         `

          texteCorr = `$${a}\\%$ de $${b} =${texNombre(a / 100, 2)}\\times ${b}=${texNombre(b * a / 100, 2)}$.
          `

          reponse = arrondi((a / 100) * b, 2)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 12:

          a = choice(listeFractions12)
          b = fraction(a[0], a[1])

          texte = `Ecris $\\dfrac{${a[0]}}{${a[1]}}$ sous forme décimale.`

          texteCorr = `$\\dfrac{${a[0]}}{${a[1]}}=${texNombre(a[0] / a[1], 2)}$`

          reponse = arrondi(a[0] / a[1], 2)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case 13:
          a = randint(7, 10)
          b = randint(4, 6)

          A = point(0, 0, 'A', 'below')
          B = point(5, 1, 'B', 'below')
          C = point(6, 4, 'C', 'above')
          D = point(1, 3, 'D', 'above')
          poly = polygone([A, B, C, D], 'black')
          reponse = 2 * (a + b)
          d = latexParCoordonnees(`${b} \\text{ cm}`, 6, 2.5, 'black', 8, 6, 'white', 6)
          e = latexParCoordonnees(`${a} \\text{ cm}`, 2.8, 4.3, 'black', 8, 6, 'white', 6)
          poly.epaisseur = 1

          texte = 'Calcule le périmètre du parallélogramme $ABCD$.<br> '
          texte += mathalea2d({ xmin: -1.5, ymin: -1, xmax: 8, ymax: 5, scale: 0.5 }, poly, labelPoint(A, B, C, D), d, e)
          texteCorr = `Le périmètre en cm est donné par : 
            $2\\times ${a}+2\\times ${b} =2\\times(${a}+${b})=${reponse}$ cm`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ' <br>$\\mathscr{P}= $'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
          } else { texte += '<br> $\\mathscr{P}=\\ldots $ cm' }
          nbChamps = 1
          break

        case 14:

          a = randint(2, 9)

          texte = 'Complète :<br>'
          if (choice([true, false])) {
            reponse = -a
            if (!this.interactif) { texte += `$${a}+\\ldots=0$` } else {
              texte += `$${a}+(\\ldots)=0$`

              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
            }
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            texteCorr = `$${a}+(${-a})=0$. Les nombres $${a}$ et $${-a}$ sont opposés.`
          } else {
            reponse = fraction(1, a)
            if (!this.interactif) { texte += `$${a}\\times\\ldots=1$` } else {
              texte += `$${a}\\times\\ldots=1$`
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
            }
            setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
            texteCorr = `$${a}\\times\\dfrac{1}{${a}}=1$. Les nombres $${a}$ et $\\dfrac{1}{${a}}$ sont inverses.`
          }

          nbChamps = 1
          break

        case 15:

          a = (randint(0, 12) * 2 + 1) / 10

          texte = `La moitié de $${texNombre(a, 2)}$ est égale à : `

          texteCorr = `La moitié de $${texNombre(a, 2)}$ est égale à $${texNombre(a, 2)}\\div 2=${texNombre(a / 2, 2)}$.`

          reponse = arrondi(a / 2, 2)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 16:

          a = choice([1, 1.5, 2])
          b = choice([5, 10, 20, 30, 40, 25, 35, 45, 50, 55, 60])
          texte = `J'ouvre une bouteille de jus d'orange de  $${texNombre(a, 1)}$ L. Je verse $${b}$ cL dans un verre.<br>
          Combien de cL reste-t-il dans la bouteille ?`

          texteCorr = `$${texNombre(a, 1)}$ L $=${texNombre(a * 100, 0)}$ cL.<br>
          Il reste donc dans la bouteille : $${texNombre(a * 100, 0)}-${b}=${texNombre(a * 100 - b, 0)}$ cL`

          reponse = a * 100 - b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cL' }
          nbChamps = 1
          break

        case 17:
          if (choice([true, false])) {
            a = randint(3, 6)
            reponse = 1
            for (indice = 1; indice < a; indice++) {
              reponse = reponse * indice
            }
            texte = `Calcule : <br>
           `
            for (indice = 1; indice < a; indice++) {
              texte += `$(${a}-${indice})$`
            }
            texteCorr = 'On a :<br>'
            for (indice = 1; indice < a; indice++) {
              texteCorr += `$(${a}-${indice})$`
            }
            texteCorr += '$=$'
            for (indice = 1; indice < a - 1; indice++) {
              texteCorr += `$${a - indice}\\times$`
            }
            for (indice = a - 1; indice < a; indice++) {
              texteCorr += `$${a - indice}$`
            }
            texteCorr += `$=${reponse}$`

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$=\\ldots$' }
          } else {
            a = randint(3, 6)
            reponse = 0
            for (indice = 1; indice < a; indice++) {
              reponse = reponse * indice
            }
            texte = `Calcule : <br>
            `
            for (indice = 1; indice < a + 1; indice++) {
              texte += `$(${a}-${indice})$`
            }
            texteCorr = 'On a :<br>'
            for (indice = 1; indice < a + 1; indice++) {
              texteCorr += `$(${a}-${indice})$`
            }
            texteCorr += '$=$'
            for (indice = 1; indice < a; indice++) {
              texteCorr += `$${a - indice}\\times$`
            }

            texteCorr += '$0$'

            texteCorr += `$=${reponse}$`

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$=\\ldots$' }
          }
          nbChamps = 1
          break

        case 18:
          fraction18 = choice(listeFractions18)
          a = fraction(fraction18[0], fraction18[1])
          texte = `Complète : <br>
           $ ${a.texFraction}=\\dfrac{\\ldots}{${texNombre(1.5 * fraction18[1], 0)}}$`

          texteCorr = `$${a.texFraction}=\\dfrac{${texNombre(fraction18[0] / 2, 0)}}{${texNombre(fraction18[1] / 2, 0)}}=
          \\dfrac{3\\times ${texNombre(fraction18[0] / 2, 0)}}{3\\times${texNombre(fraction18[1] / 2, 0)}}=\\dfrac{${texNombre(3 * fraction18[0] / 2, 0)}}{${texNombre(3 * fraction18[1] / 2, 0)}}$`

          reponse = arrondi(1.5 * fraction18[0], 0)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 19:

          k2 = choice([3, 4, 5])
          k1 = choice([3, 4, 5])
          b = randint(-k2 + 1, k2 - 1)
          a = randint(-k1 + 1, k1 - 1)
          r = repere({
            xUnite: k1,
            yUnite: k2,
            xMin: -k1 - 1,
            xMax: k1 + 1,
            yMin: -k2 - 1,
            yMax: k2 + 1,
            afficheLabels: false,
            xLabelListe: [-1, 1],
            yLabelListe: [-1, 1],
            grilleSecondaire: true,
            axeStyleExtremites: true,
            grilleSecondaireXDistance: 1 / k1,
            grilleSecondaireYDistance: 1 / k2,
            axeXStyle: '->',
            axeYStyle: '->'
          })

          // C.color = colorToLatexOrHTML('red')
          // C.epaisseur = 2

          A = point(a, b)
          o = latexParCoordonnees('\\text{O}', -0.3, -0.4, 'black', 15, 10, '', 7)
          lA = latexParCoordonnees('A', a + 0.2, b + 0.2, 'red', 15, 10, '', 10)
          traceA = tracePoint(A, 'red') // Variable qui trace les points avec une croix
          traceA.taille = 4
          traceA.epaisseur = 2

          if (choice([true, false])) {
            texte = 'L\'abscisse du point $A$ est :<br>'
            texteCorr = `L'abscisse du point $A$ se lit sur l'axe horizontal. L'unité (sur l'axe des abscisses) est divisée en $${k1}$. <br>
            Le point $A$ a pour abscisse $\\dfrac{${a}}{${k1}}${simplificationDeFractionAvecEtapes(a, k1)}$.`
            reponse = fraction(a, k1)
          } else {
            texte = 'L\'ordonnée du point $A$ est :<br>'
            texteCorr = `L'ordonnée du point $A$ se lit sur l'axe vertical. L'unité (sur l'axe des ordonnées) est divisée en $${k2}$. <br>
            Le point $A$ a pour ordonnée $\\dfrac{${b}}{${k2}}${simplificationDeFractionAvecEtapes(b, k2)}$.`
            reponse = fraction(b, k2)
          }
          texte += mathalea2d({ xmin: -k1 - 1, xmax: k1 + 1, ymin: -k2 - 1, ymax: k2 + 1, scale: 0.7, pixelsParCm: 20 }, r, o, lA, traceA)
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 20:
          a = randint(1, 9)
          b = randint(4, 12)
          c = randint(1, 3)
          k = randint(1, 4)
          texte = `Calcule : <br>
             $${a}+\\dfrac{${k * b}}{${b - c}+${c}}=$`

          texteCorr = `$${a}+\\dfrac{${k * b}}{${b - c}+${c}}=${a}=${a}+\\dfrac{${k * b}}{${b}}${a}=${a}+${k}=${a + k}$`

          reponse = a + k
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break
        case 21:
          a = choice([2, 3, 6]) // diviseur de l'heure
          b = calcul(60 / a) // nombre de minutes de l'énoncé
          c = choice([30, 60, 90, 120])
          reponse = c / a
          texte = `Un véhicule roule à $${c}$ km/h. Quelle distance parcourt-il en $${b}$ minutes ?`
          texteCorr = `Le véhicule parcourt $${c / a}$ km.<br>
             En $${b}$ minutes, il parcourt $${a}$ fois moins de km qu'en $1$ heure, soit $\\dfrac{${c}}{${a}}=
              ${c / a}$ km.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km' }
          nbChamps = 1
          break
        case 22:
          a = randint(2, 4)
          b = randint(-4, 4, [-1, 0, 1])
          c = randint(-6, -2)
          reponse = a * b * c
          texte = `Calcule : <br>
                $${a}\\times ${ecritureParentheseSiNegatif(b)}\\times (${c})=$`
          texteCorr = `$${a}\\times ${ecritureParentheseSiNegatif(b)}\\times (${c})=${a * b}\\times (${c})=${reponse}$`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 23:
          a = randint(-10, 10, 0)

          reponse = a ** 2
          texte = `Calcule : <br>
                  $ ${ecritureParentheseSiNegatif(a)}^2=$`
          texteCorr = `$ ${ecritureParentheseSiNegatif(a)}^2=${ecritureParentheseSiNegatif(a)}\\times ${ecritureParentheseSiNegatif(a)}=${reponse}$`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 24:
          a = choice(listeFractions24)
          b = fraction(a[0], a[1])
          k1 = choice([3, 5, 7, 9])

          texte = `Simplifie au maximum la fraction : <br>
               $\\dfrac{${b.n * k1}}{${b.d * k1}}$ 
                 `

          texteCorr = `$\\dfrac{${b.n * k1}}{${b.d * k1}}=\\dfrac{${b.n}\\times ${k1}}{${b.d}\\times ${k1}}=\\dfrac{${b.n}}{${b.d}}$.`

          reponse = fraction(b.n, b.d).simplifie()
          setReponse(this, index, reponse, { formatInteractif: 'fraction' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case 25:
          a = randint(2, 6)
          b = randint(8, 15)
          d = choice([27, 30, 33, 36, 39, 42, 45, 48])

          c = d - a - b

          texte = `Quelle est la moyenne de cette série ? <br>
                $${a}$ ${sp(4)} ; ${sp(4)} $${b}$ ${sp(4)} ; ${sp(4)} $${c}$ 
                `

          texteCorr = `La somme des $3$ valeurs est : $${a}+${b}+${c} =${d}$.<br>
                La moyenne est donc $\\dfrac{${d}}{3}=${texNombre(d, 3, 0)}$.`

          reponse = arrondi(d / 3, 0)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 26:
          a = randint(2, 14, [5, 10]) * 2

          reponse = arrondi(1.5 * a, 0)

          if (choice([true, false])) {
            texte = `$1,5\\times ${a}=$
                  `
          } else {
            texte = `$ ${a}\\times 1,5=$
                  `
          }

          texteCorr = `$1,5\\times ${a}=${a}\\times 1,5=1\\times ${a}+\\underbrace{0,5\\times ${a}}_{=${a}\\div 2}=${a}+${texNombre(a * 0.5, 0)}=${reponse}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 27:
          if (choice([true, false])) {
            a = randint(2, 30)
            reponse = a * 1000
            texte = `Complète.<br>
                 $${a}$ L $=$ `
            texteCorr = `$1$ dm$^3 = 1$ L et $1$ dm$^3 = 1000$ cm$^3$.<br>
                  $${a}$ L = ${a} dm$^3 =${a} \\times 1000$ cm$^3=${texNombre(reponse, 3)}$ cm$^3$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' cm$^3$' } else { texte += '$\\ldots$ cm$^3$ ' }
          } else {
            reponse = arrondi(a / 1000, 3)
            texte = `Complète.<br>
                   $${a}$ cm$^3$ $=$ `
            texteCorr = `$1$ dm$^3 = 1$ L et $1$ cm$^3 = 0,001$ dm$^3$.<br>
                   $${a}$ cm$^3 = ${a} \\div 1000$ dm$^3= ${texNombre(a / 1000, 3)}$ dm$^3 =${texNombre(reponse, 3)}$ L.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' L' } else { texte += '$\\ldots$ L ' }
          }

          nbChamps = 1
          break

        case 28:
          triplet = [[3, 4, 5], [6, 8, 10]]
          a = choice(triplet)

          C = point(0, 0, 'C', 'below')
          A = point(2, 0, 'A', 'below')
          B = point(2, 3, 'B', 'above')

          xmin = -1
          ymin = -0.5
          xmax = 3.5
          ymax = 3.5
          pol = polygoneAvecNom(A, B, C)
          objets = []
          choix = choice(['a', 'b', 'c'])
          if (choix === 'a') {
            objets.push(pol[0])
            objets.push(
              texteParPosition(`$${a[0]} \\text{ cm}$`, milieu(A, C).x, milieu(A, C).y - 0.3, 'milieu', 'black', 1, 'middle', true)
              , texteParPosition(`$${a[2]} \\text{ cm}$`, milieu(B, C).x - 0.6, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true)
              , labelPoint(A, B, C), codageAngleDroit(B, A, C))
            reponse = a[1]
            texte = 'Calcule la longueur $AB$. <br>'

            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texte += '<br>$AB=$'

            texteCorr = `On utilise le théorème de Pythagore dans le triangle rectangle $ABC$ :<br>
                        On a $AB^2=BC^2-AC^2$, soit $AB^2=${a[2]}^2-${a[0]}^2=${a[2] ** 2 - a[0] ** 2}$.<br>
                        Par conséquent, $AB=${a[1]}$.`
          }
          if (choix === 'b') {
            objets.push(pol[0])
            objets.push(
              texteParPosition(`$${a[1]} \\text{ cm}$`, milieu(A, B).x + 0.5, milieu(A, B).y, 'milieu', 'black', 1, 'middle', true)
              , texteParPosition(`$${a[2]} \\text{ cm}$`, milieu(B, C).x - 0.6, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true)
              , labelPoint(A, B, C), codageAngleDroit(B, A, C))
            reponse = a[0]
            texte = 'Calcule la longueur $AC$. <br>'

            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texte += '<br>$AC=$'

            texteCorr = `On utilise le théorème de Pythagore dans le triangle rectangle $ABC$ :<br>
                          On a $AC^2=BC^2-AB^2$, soit $AC^2=${a[2]}^2-${a[1]}^2=${a[2] ** 2 - a[1] ** 2}$.<br>
                          Par conséquent, $AC=${a[0]}$.`
          }
          if (choix === 'c') {
            objets.push(pol[0])
            objets.push(
              texteParPosition(`$${a[1]} \\text{ cm}$`, milieu(A, B).x + 0.4, milieu(A, B).y, 'milieu', 'black', 1, 'middle', true)
              , texteParPosition(`$${a[0]} \\text{ cm}$`, milieu(A, C).x, milieu(A, C).y - 0.3, 'milieu', 'black', 1, 'middle', true)
              , labelPoint(A, B, C), codageAngleDroit(B, A, C))
            reponse = a[2]
            texte = 'Calcule la longueur $BC$. <br>'

            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texte += '<br>$BC=$'

            texteCorr = `On utilise le théorème de Pythagore dans le triangle rectangle $ABC$ :<br>
                            On a $BC^2=AB^2+AC^2$, soit $BC^2=${a[0]}^2+${a[1]}^2=${a[0] ** 2 + a[1] ** 2}$.<br>
                            Par conséquent, $BC=${a[2]}$.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' } else { texte += '$\\ldots$ cm' }
          nbChamps = 1
          break

        case 29:
          a = randint(-6, -2, 0)
          b = randint(2, 6)
          c = randint(-6, 6, [0, 1])
          d = randint(-6, 6, [0, 1])
          reponse = a * c + b * d

          texte = `Calcule $${a}x+${b}y$ pour $x=${c}$ et $y=${d}$.
                `

          texteCorr = `$${a}x+${b}y=${a}\\times ${ecritureParentheseSiNegatif(c)}+${b}\\times ${ecritureParentheseSiNegatif(d)}=${a * c}+${ecritureParentheseSiNegatif(b * d)}=${reponse}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 30:
          a = choice([4, 6, 8, 10])
          b = a / 2
          c = randint(3, 12, a)
          reponse = arrondi(c / 2, 2)

          texte = `$${a}$ caramels coûtent $${b}$ €.<br>
          Combien coûtent $${c}$ caramels ?
                  `

          texteCorr = `Le nombre de caramels et le prix mayé sont deux grandeurs proportionnelles. <br>
            Le prix payé est la moitié du nombre de caramels. Autrement dit, le prix d'un caramels est $0,50$ €.<br>
            $${c}$ caramels coûtent donc $${c}\\times 0,5=${texNombre(reponse, 2)}$ €.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' €' }
          nbChamps = 1
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
        index += nbChamps
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
