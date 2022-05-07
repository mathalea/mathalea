import Exercice from '../../Exercice.js'
import { fraction } from '../../../modules/fractions.js'
import {
  mathalea2d, point, labelPoint, droiteGraduee2, polygoneAvecNom, segment, milieu, arc, droite, texteParPosition, tracePoint, repere2, polygone, codageAngleDroit, latexParCoordonnees
} from '../../../modules/2d.js'
import { round, min } from 'mathjs'
import Grandeur from '../../../modules/Grandeur.js'
import { listeQuestionsToContenu, arrondi, tableauColonneLigne, randint, texNombre, shuffle, ecritureParentheseSiNegatif, texFractionReduite, simplificationDeFractionAvecEtapes, choice, calcul, sp } from '../../../modules/outils.js'
import { setReponse } from '../../../modules/gestionInteractif.js'

import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
export const titre = 'CAN 5ième sujet 2022'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '02/05/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export default function SujetCAN2022cinquieme () {
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
    const nbQ1 = min(round(this.nbQuestions * 10 / 30), 1) // Choisir d'un nb de questions de niveau 1 parmi les 7 possibles.
    const nbQ2 = min(this.nbQuestions - nbQ1, 1)
    const typeQuestionsDisponiblesNiv1 = shuffle([21]).slice(-nbQ1).sort(compareNombres)
    const typeQuestionsDisponiblesNiv2 = shuffle([21]).slice(-nbQ2).sort(compareNombres)
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))
    const listeFractions18 = [[8, 14], [6, 14], [4, 14], [6, 16], [10, 16],
      [8, 12], [8, 10], [10, 12], [6, 18], [4, 18], [12, 16], [14, 16], [14, 18], [2, 18], [2, 14]
    ]
    const listeFractions12 = [[1, 4], [3, 4], [3, 2], [5, 2], [1, 5], [2, 5], [3, 5],
      [4, 5], [6, 5], [5, 4], [7, 4], [9, 4]
    ]
    const listeFractions24 = [[5, 3], [7, 9], [3, 7], [5, 7], [9, 7], [2, 9], [4, 7], [11, 5], [11, 3]
    ]
    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, maListe, fraction18, demiDisque, p, lA, segmentBC, segmentAB, segmentAD, segmentDC, codage1, codage2, codage3, codage4, traceA, indice, o, r, poly1, poly2, propositions, chiffre, chiffre2, u, k1, k2, e, f, choix, a, b, c, g, h, k, A, B, C, D, E, F, G, H, d, triplet, pol, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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

          a = randint(1, 9)
          b = randint(1, 9)
          texte = `Combien y a-t-il de petits cubes dans ce pavé droit ?
         `

          texteCorr = `Le nombre de petits cubes est donné par le produit :
          `

          reponse = a
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 12:
          a = randint(2, 4)
          b = randint(10, 59)
          d = calcul(a * 60 + b)
          if (!this.interactif) {
            texte = `Complète : <br>$${d}$ min $=$ ..... h..... min`
            texteCorr = ` On cherche le multiple de $60$ inférieur à $${d}$ le plus grand possible. C'est $${Math.floor(d / 60)}\\times 60 = ${Math.floor(d / 60) * 60}$.<br>
          Ainsi $${d} = ${Math.floor(d / 60) * 60} + ${d % 60}$ donc $${d}$min $= ${Math.floor(d / 60)}$h$${d % 60}$min.`
          } else {
            texte = `Complète : <br>$${d}$ min $=$ h $=$`
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, a)
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
            texteCorr = ` On cherche le multiple de $60$ inférieur à $${d}$ le plus grand possible. C'est $${Math.floor(d / 60)}\\times 60 = ${Math.floor(d / 60) * 60}$.<br>
          Ainsi $${d} = ${Math.floor(d / 60) * 60} + ${d % 60}$ donc $${d}$min $= ${Math.floor(d / 60)}$h$${d % 60}$min.`

            setReponse(this, index + 1, b)
          }
          nbChamps = 2

          break
        case 13:

          a = randint(2, 9)
          b = randint(2, 9)
          texte = `$${texNombre(a / 10, 1)}\\times ${b * 100}=$
           `

          texteCorr = `$${texNombre(a / 10, 1)}\\times ${b}=${texNombre(a, 1)}\\times 0,1 \\times ${b}\\times 100=\\underbrace{${a} \\times ${b}}_{=${a * b}}\\times \\underbrace{0,1\\times 100}_{=10}=${texNombre(a * b, 0)}\\times 10=${texNombre(a * b * 10, 0)}$
            `

          reponse = arrondi(a * b * 10, 0)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 14:
          choix = choice(['a', 'b'])//, 'b', 'c', 'd'

          a = randint(20, 29)// mes angle E->H
          b = randint(70, 75)// mes angle C->F
          c = 180 - a - b// mes angle D ->G
          A = point(4, 7, 'A', 'below')// axe
          B = point(6, 4, 'B', 'below')// axe
          C = point(1, 5, 'C', 'left')
          D = point(3, 6, 'D', 'above')
          E = point(4, 1, 'E', 'below')
          F = point(5.3, 7.5, 'F', 'left')
          G = point(7, 9, 'G', 'above')
          H = point(9.5, 4.7, 'H', 'below')
          d = droite(A, B)
          poly1 = polygone([C, D, E], 'black')
          poly2 = polygone([F, G, H], 'black')
          if (choix === 'a') { reponse = b }
          if (choix === 'b') { reponse = c }
          e = texteParPosition(`${a}°`, 3.5, 2.3)// angle E
          f = texteParPosition(`${b}°`, 1.5, 5)// angle C
          g = texteParPosition(`${c}°`, 2.7, 5.5)// angle D
          if (choix === 'a') { h = texteParPosition('?', 7, 8.5) }
          if (choix === 'b') { h = texteParPosition('?', 6, 7.5) }

          poly1.epaisseur = 1
          poly2.epaisseur = 1
          texte = 'Le triangle $FGH$ est le symétrique du triangle $DEF$ par rapport à la droite $d$<br> '
          texte += mathalea2d({ xmin: 0, ymin: 0, xmax: 10, ymax: 10, pixelsParCm: 27, scale: 1 }, poly1, poly2, labelPoint(C, D, E, F, G, H), d, e, f, g, h)
          texteCorr = `La symétrie axiale conserve les angles.
           Cela signifie que la mesure de l'angle  $\\widehat{C}$ est égale à celle de l'angle $\\widehat{G}$, celle de l'angle $\\widehat{D}$ est égale à celle de
           l'angle $\\widehat{F}$ et celle de l'angle $\\widehat{E}$ est égale à celle de l'angle $\\widehat{H}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ' <br>?$= $'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '$^°$'
          } else { texte += '<br> ? $=\\ldots ^°$' }
          nbChamps = 1
          break

        case 15:

          a = randint(1, 9)

          texte = `La moitié de $${texNombre((2 * a + 1) / 10, 1)}$
           `

          texteCorr = `La moitié de $${texNombre((2 * a + 1) / 10, 1)}$ est égale à $${texNombre((2 * a + 1) / 10, 1)}\\div 2=${texNombre((2 * a + 1) / 20, 2)}$.
            `

          reponse = arrondi((2 * a + 1) / 20, 2)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break
        case 16:

          a = randint(9, 15)
          b = randint(2, 4)
          propositions = shuffle([`$${texNombre(2 * a + 5 * b)}$ cm`, `$${texNombre(2 * a + 8 * b)}$ cm`, `$${texNombre(2 * a + 6 * b)}$ cm`, `$${texNombre(2 * a + 3 * b)}$ cm`])
          A = point(0, 0, 'A', 'below')
          B = point(6, 0, 'B', 'below')
          C = point(6, 4, 'C', 'left')
          D = point(0, 4, 'D', 'above')
          codage1 = codageAngleDroit(B, A, D)
          codage2 = codageAngleDroit(A, B, C)
          codage3 = codageAngleDroit(B, C, D)
          codage4 = codageAngleDroit(C, D, A)
          segmentAB = segment(A, B)
          segmentAD = segment(A, D)
          segmentDC = segment(D, C)
          segmentBC = segment(B, C)
          segmentBC.pointilles = 2
          demiDisque = arc(B, milieu(B, C), 180, false, 'white', 'black', 0.2)

          e = texteParPosition(`${a}  cm`, milieu(D, C).x - 0.5, milieu(D, C).y + 0.3)
          f = texteParPosition(`${texNombre(b * 2, 0)} cm`, milieu(A, D).x - 0.7, milieu(A, D).y)

          texte = 'Un ordre de grandeur du périmètre de cette figure est : <br> '
          texte += `${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}${sp(6)} ${propositions[3]}`
          texte += mathalea2d({ xmin: -1.5, ymin: -1, xmax: 10, ymax: 5, pixelsParCm: 27, scale: 1 }, segmentAB, segmentAD, segmentDC, segmentBC, demiDisque, e, f, codage1, codage2, codage3, codage4)
          texteCorr = `La figure est constituée de deux longueurs de $${a}$ cm, d'une longueur de $${texNombre(2 * b, 0)}$ cm et de la longueur d'un demmi-cercle de rayon $${b}$ cm.<br>
          Comme le périmètre d'un cercle est $2\\times \\pi \\times $ Rayon, le périmètre du demi-cercle est $ \\pi\\times $ Rayon, dont une valeur approchée est $3\\times $Rayon.<br>
          Ainsi, un ordre de grandeur du périmètre de la figure est : $2\\times ${a}+${texNombre(2 * b, 0)}+3\\times ${b}=${texNombre(2 * a + 5 * b)}$ cm.`

          setReponse(this, index, new Grandeur(2 * a + 5 * b, 'cm'), { formatInteractif: 'unites' })
          if (this.interactif) {
            texte += ' Recopier la réponse correcte (nombre et unité à recopier).'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15 longueur')
          }
          nbChamps = 1
          break

        case 17:

          a = randint(-9, -1) + randint(-9, -1) / 10
          if (choice([true, false])) {
            texte = `L'opposé de $${texNombre(a, 1)}$ est :
           `

            texteCorr = `L'opposé de $${texNombre(a, 1)}$ est : $-(${texNombre(a, 1)})=${texNombre(-a, 1)}$.
            `

            reponse = -a
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          } else {
            texte = `L'inverse  $${texNombre(a, 1)}$ est :
          `

            texteCorr = `L'inverse  $${texNombre(a, 1)}$ est :$\\dfrac{1}{${texNombre(a, 1)}}$.
           `

            reponse = fraction(1, a)
            setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          }
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 18:
          a = randint(1, 6)
          b = choice([1.5, 2.5, 3.5, 4.5])
          texte = `Complète : <br>
          $${texNombre(a * 2, 0)}\\times \\ldots =${texNombre(b * 2 * a, 1)}$
           `

          texteCorr = `Le nombre cherché est $\\dfrac{${texNombre(b * 2 * a, 1)}}{${texNombre(a * 2, 0)}}=${texFractionReduite(2 * a * b, a * 2)}=${texNombre(b, 1)}$.
            `

          reponse = b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 19:

          a = randint(1, 6)
          k = randint(3, 9)
          b = a * k
          c = randint(1, 9, a)
          reponse = c * k

          texte = 'Complète le tableau de proportionnalité ci-dessous :<br>'
          texte += tableauColonneLigne([a, b], [c], [''])
          texteCorr = `On constate que $${b}$ s'obtient en multipliant $${a}$ par $${k}$.
              Ainsi, on obtient la quatrième proportionnelle en multipliant $${c}$ par $${k}$.<br>
              La valeur cherchée est donc $${c}\\times ${k}=${k * c}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }

          nbChamps = 1
          break

        case 20:
          if (choice([true, false])) {
            a = randint(21, 28)
            k = randint(1, 9)
            reponse = arrondi(a + k / 10, 1)
            texte = 'Determine l\'abscisse du point A  :<br> ' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 1.5, scale: 0.8, style: 'margin: auto' }, droiteGraduee2({
              Unite: 10,
              Min: a - 0.2,
              Max: a + 1.2,
              x: 0,
              y: 0,
              thickSecDist: 1 / 10,
              thickSec: true,
              thickoffset: 0,
              axeStyle: '|->',
              pointListe: [[a + k / 10, 'A']],
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true,
              labelPointTaille: 12,
              step1: 1,
              step2: 1
            }))
            texteCorr = `L'unité est divisée en $10$ (chaque graduation "correspond" à $0,1$). Ainsi, l'abscisse du point A est  : $${texNombre(reponse, 1)}$`
          } else {
            a = randint(21, 28)
            k = randint(1, 4)
            reponse = arrondi(a + k / 5, 1)
            texte = 'Determine l\'abscisse du point A  :<br> ' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 1.5, scale: 0.8, style: 'margin: auto' }, droiteGraduee2({
              Unite: 10,
              Min: a - 0.2,
              Max: a + 1.2,
              x: 0,
              y: 0,
              thickSecDist: 1 / 5,
              thickSec: true,
              thickoffset: 0,
              axeStyle: '|->',
              pointListe: [[a + k / 5, 'A']],
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true,
              labelPointTaille: 12,
              step1: 1,
              step2: 1
            }))
            texteCorr = `L'unité est divisée en $5$ (chaque graduation "correspond" à $0,2$). Ainsi, l'abscisse du point A est  : $${texNombre(reponse, 1)}$`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 21:
          if (choice([true, false])) {
            a = randint(11, 69, [20, 30, 40, 50, 60])
            
            reponse = arrondi(a *2, 0)
            texte = `$20\\%$ de $${a*10}= $`
           
              texteCorr = `Comme $10\\%$  de $${a*10}$ vaut $${a }$ (pour prendre $10\\%$  d'une quantité, on la divise par $10$), alors
           $20\\%$ de $${a*10}=2\\times  ${a}=${reponse}$.`
            
          } else {
            a = randint(11, 69, [20, 30, 40, 50, 60])
            p = choice([30, 40])
            reponse = arrondi(2*a * p / 10, 0)
            texte = `gfbhgfghnn`

            texteCorr = `Comme $10\\%$  de $${a}$ vaut $${a / 10}$ (pour prendre $10\\%$  d'une quantité, on la divise par $10$), alors
           $${p}\\%$ de $${a}=2\\times  ${a / 10}=${reponse}$.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
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
