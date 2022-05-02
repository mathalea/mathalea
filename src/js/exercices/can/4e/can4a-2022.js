import Exercice from '../../Exercice.js'
import { fraction } from '../../../modules/fractions.js'
import {
  mathalea2d, point, labelPoint, polygoneAvecNom, milieu, texteParPosition, polygone, codageAngleDroit, latexParCoordonnees
} from '../../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, arrondi, randint, texNombre, shuffle, simplificationDeFractionAvecEtapes, choice, calcul, sp } from '../../../modules/outils.js'
import { setReponse } from '../../../modules/gestionInteractif.js'

import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
export const titre = 'CAN 4ième sujet 2022'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '19/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export default function SujetCAN2022troisieme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 1// 10,20,30
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const nbQ1 = min(round(this.nbQuestions * 1 / 1), 1) // Choisir d'un nb de questions de niveau 1 parmi les 7 possibles.
    const nbQ2 = min(this.nbQuestions - nbQ1, 0)
    const typeQuestionsDisponiblesNiv1 = shuffle([17]).slice(-nbQ1).sort(compareNombres)
    const typeQuestionsDisponiblesNiv2 = shuffle([17]).slice(-nbQ2).sort(compareNombres)
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))
    const listeFractions23 = [[3, 2], [1, 2], [3, 4], [1, 4], [2, 5],
      [3, 5], [4, 5], [11, 2], [7, 2], [9, 2]
    ]
    const listeFractions12 = [[1, 4], [3, 4], [3, 2], [5, 2], [1, 5], [2, 5], [3, 5],
      [4, 5], [6, 5], [5, 4], [7, 4], [9, 4]
    ]
    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, fraction23, indice, poly, propositions, chiffre, chiffre2, u, moy, k1, k2, e, f, g, choix, a, b, c, d, p, k, A, B, C, D, I, J, K, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
            reponse = a * b
            texte = `Recopie  le résultat de  : 
            $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$<br>`

            texte += `${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}`
            texteCorr = `En prenant un ordre de grandeur pour chacun des deux nombres, on obtient  $50\\times ${Math.round(b)}=${50 * Math.round(b)}$.`
          }
          if (choix === 'b') {
            a = randint(3, 9) + randint(1, 9) / 10
            b = randint(2, 5) + randint(1, 9) / 10
            propositions = shuffle([`$${texNombre(a * b / 10, 3)}$`, `$${texNombre(a * b * 10, 1)}$`, `$${texNombre(a * b, 2)}$`])
            reponse = a * b
            texte = `Recopie  le résultat de  : 
                $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$<br>`

            texte += `${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}`
            texteCorr = `En prenant un ordre de grandeur pour chacun des deux nombres, on obtient  $${Math.round(a)}\\times ${Math.round(b)}=${Math.round(a) * Math.round(b)}$.`
          }
          if (choix === 'c') {
            a = randint(45, 49) + randint(1, 9) / 10
            b = randint(25, 29) + randint(1, 9) / 10
            propositions = shuffle([`$${texNombre(a * b / 10, 3)}$`, `$${texNombre(a * b * 10, 1)}$`, `$${texNombre(a * b, 2)}$`])
            reponse = a * b
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
          reponse = f * d

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
          d = latexParCoordonnees(`${a} \\text{ cm}`, 6, 2.5, 'black', 10, 6, 'white', 6)
          e = latexParCoordonnees(`${b} \\text{ cm}`, 2.5, 4.5, 'black', 10, 6, 'white', 6)
          poly.epaisseur = 1

          texte = 'Calcule le périmètre du parallélogramme $ABCD$.<br> '
          texte += mathalea2d({ xmin: -1.5, ymin: -1, xmax: 8, ymax: 5, scale: 0.7 }, poly, labelPoint(A, B, C, D), d, e)
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

          a = randint(3, 6)
         reponse=1
          for (indice = 1; indice < a; indice++) {
            reponse = reponse*indice
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
