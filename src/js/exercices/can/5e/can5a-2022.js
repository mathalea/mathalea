import Exercice from '../../Exercice.js'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites.js'
import { fraction } from '../../../modules/fractions.js'
import {
  point, labelPoint, droiteGraduee, grille, segment, milieu, arc, droite, texteParPosition, tracePoint, polygone, codageAngleDroit, pointSurSegment, angleModulo, rotation, rapporteur, codageAngle
} from '../../../modules/2d.js'
import { round, min, max } from 'mathjs'
import Grandeur from '../../../modules/Grandeur.js'
import { paveLPH3d } from '../../../modules/3d.js'
import { listeQuestionsToContenu, arrondi, tableauColonneLigne, stringNombre, randint, texNombre, shuffle, texFractionReduite, choice, calcul, sp, lettreDepuisChiffre } from '../../../modules/outils.js'
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
 * Gilles Mora avec aide EE et JCL
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export const uuid = '1fdf7'
export const ref = 'can5a-2022'
export default function SujetCAN2022cinquieme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 30// 10,20,30
  this.nbCols = 1
  this.nbColsCorr = 1
  this.comment = `Cet exercice fait partie des annales des Courses aux nombres.<br>
  Il est composé de 30 questions réparties de la façon suivante :<br>
  les 10 premières questions parfois communes à plusieurs niveaux font appels à des questions automatisées élémentaires et les 20 suivantes (qui ne sont pas rangées dans un ordre de difficulté) sont un peu plus « coûteuses » cognitivement.<br>
  Par défaut, les questions sont rangées dans le même ordre que le sujet officiel avec des données aléatoires. Ainsi, en cliquant sur « Nouvelles données », on obtient une nouvelle course aux nombres avec des données différentes.
  En choisissant un nombre de questions différents de 30, on fabrique une « mini » course aux nombres qui respecte la proportion de nombre de questions élémentaires par rapport aux autres.
  Par exemple, en choisissant 20 questions, la course aux nombres sera composée de 7 questions automatisées élémentaires choisies aléatoirement dans les 10 premières questions du sujet officiel puis de 13 autres questions choisies aléatoirement parmi les 20 autres questions du sujet officiel.`
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const nbQ1 = min(round(this.nbQuestions * 10 / 30), 10) // Choisir d'un nb de questions de niveau 1 parmi les 7 possibles.
    const nbQ2 = min(this.nbQuestions - nbQ1, 20)
    const typeQuestionsDisponiblesNiv1 = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(-nbQ1).sort(compareNombres)
    const typeQuestionsDisponiblesNiv2 = shuffle([11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30]).slice(-nbQ2).sort(compareNombres)
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))

    const listeFractions30 = [[11, 4], [13, 4], [15, 4], [17, 4], [19, 4], [21, 4], [23, 4], [27, 4], [29, 4], [7, 5], [9, 5],
      [11, 5], [13, 5], [17, 5]]

    // Pour la question 24
    let paramsEnonce; const objetsEnonce = []; let tailleRapporteur; let sudOuest; let nordOuest; let sudEst; let nordEst; let sensRot; let sensRot2; let numA; let numB; let numC; let angB; let posA; let posB; let B1; let angC; let posC; let C1; let AB; let AC; let ACCorr; let R

    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, fraction30, demiDisque, p, traceA, traceB, traceC, traceH, codeA, segmentBC, segmentAB, segmentAD, segmentDC, codage1, codage2, codage3, codage4, s1, s2, poly1, poly2, propositions, chiffre, chiffre2, u, e, f, choix, a, b, c, g, h, k, A, B, C, D, E, F, G, H, d, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
              texte = `Écris en chiffres le nombre : <br>
              ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre[c][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]
              texteCorr = ` ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre[c][0]}$=
              ${(chiffre2[b][1] + chiffre[a][1]) * 1000} + ${chiffre[c][1]}=${(chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]}$ `
            } else {
              texte = `Écris en chiffres le nombre : <br>
                          ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre[c][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]
              texteCorr = ` ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre[c][0]}$=
                          ${(chiffre2[b][1] + chiffre[a][1]) * 1000} + ${chiffre[c][1]}=${(chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]}$ `
            }
          } else {
            if (a === 0) {
              texte = `Écris en chiffres le nombre : <br>
              ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre2[d][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]
              texteCorr = ` ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre2[d][0]}$=
              ${(chiffre2[b][1] + chiffre[a][1]) * 1000} + ${chiffre2[d][1]}=${(chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]}$ `
            } else {
              texte = `Écris en chiffres le nombre : <br>
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
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '  $\\ldots$' }
          nbChamps = 1
          break

        case 6:
          u = randint(21, 99)
          a = randint(1, 9)
          c = randint(1, 9)
          reponse = arrondi(u + a * 0.1 + c * 0.001, 3)
          if (choice([true, false])) {
            texte = `Écrire sous forme décimale : $${u}+\\dfrac{${a}}{10}+\\dfrac{${c}}{1000}$. `
            texteCorr = `$${u}+\\dfrac{${a}}{10}+\\dfrac{${c}}{1000}=${u}+${texNombre(a / 10, 1)}+${texNombre(c / 1000, 3)}=${texNombre(u + a / 10 + c / 1000, 3)}$`
          } else {
            texte = `Écris sous forme décimale : $${u}+\\dfrac{${c}}{1000}+\\dfrac{${a}}{10}$. `
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
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
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
            $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$.<br>`

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
            texteCorr = `$${f}\\times ${texNombre(d, 1)}=${texNombre(reponse, 3)}$`
            texteCorr += `
          $${f}\\times ${texNombre(d, 1)}=${f}\\div 10=${a}${b},\\underline{${c}}$ `
          }
          if (d === 0.01) {
            texte = `$${f}\\times ${texNombre(d, 2)}=$`
            texteCorr = `$${f}\\times ${texNombre(d, 2)}=${texNombre(reponse, 3)}$`
            texteCorr += `
          $${f}\\times ${texNombre(d, 2)}=${f}\\div 100=${a},${b}\\underline{${c}}$<br>
                      `
          }
          if (d === 0.001) {
            texte = `$${f}\\times ${texNombre(d, 3)}=$`
            texteCorr = `$${f}\\times ${texNombre(d, 3)}=${texNombre(reponse, 3)}$`
            texteCorr += `
          $${f}\\times ${texNombre(d, 3)}=${f}\\div 1000=0,${a}${b}\\underline{${c}}$<br>

             `
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '  $\\ldots$ ' }
          nbChamps = 1
          break

        case 11:

          a = randint(5, 9)
          b = randint(2, 6)
          c = choice([2, 4, 5])
          d = paveLPH3d(0, 0, 0, 1, a, c, b, 'black')
          texte = `Combien y a-t-il de petits cubes dans ce pavé droit ?<br>
          ${mathalea2d(Object.assign(fixeBordures(d.c2d), { pixelsParCm: 20, scale: 0.5 }), d.c2d)}
         `

          texteCorr = `Le nombre de petits cubes est donné par le produit :<br>
          $${a}\\times ${b}\\times ${c} = ${a * b * c}$
          `

          reponse = a * b * c
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
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
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
          e = texteParPosition(`${stringNombre(a)}°`, 3.4, 2.5)// angle E
          f = texteParPosition(`${stringNombre(b)}°`, 1.6, 4.9)// angle C
          g = texteParPosition(`${stringNombre(c)}°`, 2.7, 5.5)// angle D
          if (choix === 'a') {
            h = texteParPosition('?', 7, 8.5)
            codeA = codageAngle(F, G, H)
          }
          if (choix === 'b') {
            h = texteParPosition('?', 5.8, 7.5)
            codeA = codageAngle(G, F, H)
          }

          poly1.epaisseur = 1
          poly2.epaisseur = 1
          texte = 'Le triangle $FGH$ est le symétrique du triangle $DEF$ par rapport à la droite $d$<br> '
          texte += mathalea2d({ xmin: 0, ymin: 0, xmax: 10, ymax: 10, pixelsParCm: 27, scale: 0.8 }, poly1, poly2, labelPoint(C, D, E, F, G, H), d, e, f, g, h, codeA)
          texteCorr = `La symétrie axiale conserve les angles.
           Cela signifie que la mesure de l'angle  $\\widehat{C}$ est égale à celle de l'angle $\\widehat{G}$, celle de l'angle $\\widehat{D}$ est égale à celle de
           l'angle $\\widehat{F}$ et celle de l'angle $\\widehat{E}$ est égale à celle de l'angle $\\widehat{H}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ' <br>?$= $'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '$^\\circ$'
          } else { texte += '<br> ? $=\\ldots ^°$' }
          nbChamps = 1
          break

        case 15:

          a = randint(1, 9)

          texte = `La moitié de $${texNombre((2 * a + 1) / 10, 1)}$ est : 
           `

          texteCorr = `La moitié de $${texNombre((2 * a + 1) / 10, 1)}$ est égale à $${texNombre((2 * a + 1) / 10, 1)}\\div 2=${texNombre((2 * a + 1) / 20, 2)}$.
            `

          reponse = arrondi((2 * a + 1) / 20, 2)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
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
          texte += `${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}${sp(6)} ${propositions[3]}<br>`
          texte += mathalea2d({ xmin: -1.5, ymin: -1, xmax: 10, ymax: 5, pixelsParCm: 27, scale: 1 }, segmentAB, segmentAD, segmentDC, segmentBC, demiDisque, e, f, codage1, codage2, codage3, codage4)
          texteCorr = `La figure est constituée de deux longueurs de $${a}$ cm, d'une longueur de $${texNombre(2 * b, 0)}$ cm et de la longueur d'un demmi-cercle de rayon $${b}$ cm.<br>
          Comme le périmètre d'un cercle est $2\\times \\pi \\times $ Rayon, le périmètre du demi-cercle est $ \\pi\\times $ Rayon, dont une valeur approchée est $3\\times $Rayon.<br>
          Ainsi, un ordre de grandeur du périmètre de la figure est : $2\\times ${a}+${texNombre(2 * b, 0)}+3\\times ${b}=${texNombre(2 * a + 5 * b)}$ cm.`

          setReponse(this, index, new Grandeur(2 * a + 5 * b, 'cm'), { formatInteractif: 'unites' })
          if (this.interactif) {
            texte += ' Recopie la réponse correcte (nombre et unité à recopier).'
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
            texte = `L'inverse de $${texNombre(a, 1)}$ est :
          `

            texteCorr = `L'inverse de $${texNombre(a, 1)}$ est :$\\dfrac{1}{${texNombre(a, 1)}}$.
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
            texte = 'Détermine l\'abscisse du point A  :<br> ' + mathalea2d({ xmin: -0.8, ymin: -1, xmax: 15, ymax: 1.5, scale: 0.7, style: 'margin: auto' }, droiteGraduee({
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
            texte = 'Determine l\'abscisse du point A  :<br> ' + mathalea2d({ xmin: -0.8, ymin: -1, xmax: 15, ymax: 1.5, scale: 0.7, style: 'margin: auto' }, droiteGraduee({
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

            reponse = arrondi(a * 2, 0)
            texte = `$20\\%$ de $${a * 10}= $`

            texteCorr = `Comme $10\\%$  de $${a * 10}$ vaut $${a}$ (pour prendre $10\\%$  d'une quantité, on la divise par $10$), alors
           $20\\%$ de $${a * 10}=2\\times  ${a}=${reponse}$.`
          } else {
            a = randint(11, 35, [20, 17, 18, 19, 27, 28, 29])
            p = choice([30, 40])
            reponse = arrondi(a * p / 10, 0)
            texte = `$${p}\\%$ de $${a * 10}= $`

            texteCorr = `Comme $10\\%$  de $${a * 10}$ vaut $${a}$ (pour prendre $10\\%$  d'une quantité, on la divise par $10$), alors
           $${p}\\%$ de $${a * 10}=${p / 10}\\times  ${a}=${reponse}$.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break
        case 22:
          a = randint(1, 9)
          b = randint(1, 9)
          c = randint(1, 9)
          e = randint(1, 9)
          f = randint(1, 9, b)
          g = randint(1, 9)
          k = choice([10, 20])

          reponse = arrondi(k + e + f / 10 + g / 100, 2)
          if (choice([true, false])) {
            texte = `
          $${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(e + f / 10 + g / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}=$`

            texteCorr = `$${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(e + f / 10 + g / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}=
            \\underbrace{${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}}_{=${k}}+${texNombre(e + f / 10 + g / 100, 2)}=${texNombre(reponse, 2)}$`
          } else {
            texte = `
            $${texNombre(e + f / 10 + g / 100, 2)}+${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}=$`

            texteCorr = `$${texNombre(e + f / 10 + g / 100, 2)}+${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}=
              \\underbrace{${texNombre(a + b / 10 + c / 100, 2)}+${texNombre(k - a - b / 10 - c / 100, 2)}}_{=${k}}+${texNombre(e + f / 10 + g / 100, 2)}=${texNombre(reponse, 2)}$`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 23:
          a = randint(41, 79, [50, 60, 70])

          reponse = a
          texte = `$0,5\\times ${2 * a}=$`
          texteCorr = `Multiplier par $0,5$ revient à diviser par $2$. <br>
          Ainsi, $0,5\\times ${2 * a}=${2 * a}\\div 2=${a}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 24:
          a = randint(1, 17, 9)
          tailleRapporteur = 7
          // Mise en place des points encadrant l'espace pour le rapporteur. Utiles pour paramsEnonce car le rapporteur peut tourner et optimisons l'espace pour ce rapporteur.
          sudOuest = point(-(tailleRapporteur + 0.5), 0)
          nordOuest = point(-(tailleRapporteur + 0.5), tailleRapporteur + 0.5)
          sudEst = point(tailleRapporteur + 0.5, 0)
          nordEst = point(tailleRapporteur + 0.5, tailleRapporteur + 0.5)

          // Le centre du rapporteur est A.
          // Le point sur la ligne 0 est B. En fait, on construit B1 et B est entre A et B1 (afin que B ne soit pas toujours à X cm de A car cette distance n'a pas à être fixe pour un élève)
          // Les autres points seront dans l'ordre C, D, E et F. Avec la construction préalable de C1, D1... dans les mêmes conditions que précédemment.

          sensRot = choice([-1, 1]) // Ce sens de rotation indique si on part du 0 de gauche ou du O de droite.
          sensRot2 = choice([-1, 1]) // Ce sens de rotation indique si on fait une rotation de B dans le sens trigo ou l'autre sens.
          numA = randint(1, 26, [4, 5, 15, 23, 24, 25])
          numB = randint(1, 26, [4, 5, 15, 23, 24, 25, numA])
          angB = this.sup === 1 ? 90 + sensRot * 90 : (this.sup === 2 ? sensRot * 90 : randint(0, 360) - 180)

          // posA (et posB, pos C...) permet de choisir une position du point pour ne pas que celui-ci soit illisible (géné par le rapporteur ou l'orientation d'une demi-droite)
          if (sensRot2 * sensRot === 1) {
            posA = angB > 135 ? 'above' : (angB > 45 ? 'right' : (angB > -45 ? 'below' : (angB > -135 ? 'left' : 'above')))
          } else {
            posA = angB > 135 ? 'below' : (angB > 45 ? 'left' : (angB > -45 ? 'above' : (angB > -135 ? 'right' : 'below')))
          }
          A = point(0, 0, lettreDepuisChiffre(numA), posA)
          B1 = rotation(point(tailleRapporteur + 0.5, 0), A, angB)

          posB = angB > 135 ? 'above' : (angB > 45 ? 'right' : (angB > -45 ? 'below' : (angB > -135 ? 'left' : 'above')))
          B = pointSurSegment(A, B1, tailleRapporteur + 0.5, lettreDepuisChiffre(numB), posB)
          angC = sensRot * sensRot2 * a * 10
          posC = angleModulo(angB + angC) > 135 ? 'above' : (angleModulo(angB + angC) > 45 ? 'right' : (angleModulo(angB + angC) > -45 ? 'below' : (angleModulo(angB + angC) > -135 ? 'left' : 'above')))

          C1 = rotation(B1, A, angC)
          numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numA, numB])
          C = pointSurSegment(A, C1, tailleRapporteur + 0.5, lettreDepuisChiffre(numC), posC)
          AB = segment(A, B1)
          AC = segment(A, C1)
          ACCorr = segment(A, C1, 'red')
          ACCorr.epaisseur = 2
          R = rapporteur({ x: 0, y: 0, taille: tailleRapporteur, depart: angC < 0 ? angB + 180 : angB, semi: true, avecNombre: 'deuxSens', precisionAuDegre: 10, stepGraduation: 90, rayonsVisibles: false })
          sudEst = rotation(sudEst, A, angC < 0 ? angB + 180 : angB)
          nordEst = rotation(nordEst, A, angC < 0 ? angB + 180 : angB)
          sudOuest = rotation(sudOuest, A, angC < 0 ? angB + 180 : angB)
          nordOuest = rotation(nordOuest, A, angC < 0 ? angB + 180 : angB)
          objetsEnonce.push(R, AB, AC, codageAngle(B, A, angC, 1, '', 'black', 2, 1, 'none', 0, false, true, '?', 2)) // On remplit les tableaux d'objets Mathalea2d
          texte = 'Donne la mesure de l\'angle.'
          paramsEnonce = { xmin: min(nordEst.x, nordOuest.x, sudEst.x, sudOuest.x), ymin: -1 + min(nordEst.y, nordOuest.y, sudEst.y, sudOuest.y), xmax: max(nordEst.x, nordOuest.x, sudEst.x, sudOuest.x), ymax: 1 + max(nordEst.y, nordOuest.y, sudEst.y, sudOuest.y), pixelsParCm: 20, scale: 0.4, mainlevee: false }
          texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce)

          reponse = a * 10

          if (a < 9) {
            texteCorr = `L'angle est aigu (sa mesure est inférieure à $90^\\circ$).<br>
          Chaque graduation mesure $10^\\circ$. On en déduit que l'angle a une mesure de $${a * 10}^\\circ$. `
          } else {
            texteCorr = `L'angle est obtus (sa mesure est supérieure à $90^\\circ$).<br>
          Chaque graduation mesure $10^\\circ$. On en déduit que l'angle a une mesure de $${a * 10}^\\circ$. `
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '<br>? $=$'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '$^\\circ$'
          }
          nbChamps = 1
          break
        case 25:
          a = randint(2, 9)
          b = randint(11, 18)
          d = choice([20, 30, 40, 50, 60, 70])

          c = d - b
          reponse = a * b + a * c
          texte = `Calcule le produit de $${a}$ par la somme de $${b}$ et $${c}$.
                `

          texteCorr = `La somme  de $${b}$ et $${c}$ est : $${b}+${c}=${b + c}$.<br>
          Le produit de $${a}$ par la somme de $${b}$ et $${c}$ est donc : $${a}\\times ${b + c}=${reponse}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 26:
          a = randint(1, 15)
          b = randint(5, 12)
          c = randint(1, b - 1)
          d = randint(2, 5)
          reponse = a + d * b - d * c

          texte = `Calcule : $ ${a}+(${b}-${c})\\times ${d}=$
                  `

          texteCorr = `$ ${a}+(${b}-${c})\\times ${d}=${a}+${b - c}\\times ${d}=${a}+${d * b - d * c}=${reponse}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 27:

          a = grille(-2, -2, 9, 8, 'gray', 1, 1)

          b = randint(1, 8, 4)
          c = randint(1, 7)
          d = randint(0, 1)

          A = point(b, c, 'A', 'above')
          B = point(0, 0, 'B', 'below')
          C = point(4, 0, 'C', 'below')

          D = point(-1, 7, 'D', 'above')
          E = point(d, 7, 'E', 'above')
          H = point(b, 0, 'H', 'below')
          s1 = segment(D, E)
          s1.epaisseur = 3
          s2 = segment(A, H)
          s2.epaisseur = 3
          xmin = -2
          ymin = -2
          xmax = 9
          ymax = 8
          traceA = tracePoint(A, 'red') // Variable qui trace les points avec une croix
          traceB = tracePoint(B)
          traceC = tracePoint(C)
          traceH = tracePoint(H)
          objets = []
          objets.push(
            texteParPosition('1  cm', milieu(D, E).x, milieu(D, E).y + 0.4, 'milieu', 'black', 1, 'middle', true),
            a, s1, labelPoint(A, B, C), traceA, traceB, traceC)
          reponse = arrondi(c / (d + 1), 1)
          texte = `Quelle est la distance du point $A$ à la droite $(BC)$ ? <br>
            `
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)
          texteCorr = mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 15, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets, s2, traceH, droite(B, C),
            texteParPosition(`${reponse}  cm`, milieu(A, H).x - 0.9, milieu(A, H).y, 'milieu', 'black', 1, 'middle', true), labelPoint(H))
          texteCorr += `<br>La distance du point $A$ à la droite $(BC)$ est donnée par la longueur $AH$ : $${texNombre(reponse, 1)}$ cm`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
          } else { texte += ' $\\ldots$ cm' }

          nbChamps = 1

          break
        case 28:

          a = randint(17, 39, [20, 30])
          reponse = 101 * a
          texte = `$${a}\\times 101=$`
          texteCorr = `$${a}\\times 101 = ${101 * a}$<br>`

          texteCorr += `$${a}\\times 101 = ${a}\\times (100+1)=${a}\\times 100+${a}\\times 1=${texNombre(a * 100, 0)}+${a}=${texNombre(101 * a, 0)}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 29:
          a = randint(2, 12)

          reponse = a * a

          texte = `L'aire d'un disque de rayon $${a}$ cm est : 
                `

          texteCorr = `L'aire d'un disque de rayon $${a}$ cm est : $\\pi\\times \\text{Rayon}^2=\\pi\\times ${a}^2=${a * a}\\pi$ cm$^2$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '$\\pi$ cm$^2$' } else { texte += '$\\ldots \\pi$ cm$^2$' }
          nbChamps = 1
          break

        case 30:
          fraction30 = choice(listeFractions30)
          a = fraction(fraction30[0], fraction30[1])

          reponse = arrondi(fraction30[0] / fraction30[1], 2)
          texte = `Écriture décimale de $\\dfrac{${fraction30[0]}}{${fraction30[1]}}$.`
          if (fraction30[1] === 4) {
            texteCorr = `$\\dfrac{${fraction30[0]}}{${fraction30[1]}}=
          \\dfrac{${Math.floor(fraction30[0] / 4) * 4}+${fraction30[0] - Math.floor(fraction30[0] / 4) * 4}}{4 }=
          \\dfrac{${Math.floor(fraction30[0] / 4) * 4}}{4}+\\dfrac{${fraction30[0] - Math.floor(fraction30[0] / 4) * 4}}{4 }
          =${Math.floor(fraction30[0] / 4)}+${texNombre((fraction30[0] - Math.floor(fraction30[0] / 4) * 4) / 4, 2)}=${texNombre(reponse, 2)}$`
          } else {
            texteCorr = `$\\dfrac{${fraction30[0]}}{${fraction30[1]}}=
          \\dfrac{${Math.floor(fraction30[0] / 5) * 5}+${fraction30[0] - Math.floor(fraction30[0] / 5) * 5}}{5 }=
          \\dfrac{${Math.floor(fraction30[0] / 5) * 5}}{5}+\\dfrac{${fraction30[0] - Math.floor(fraction30[0] / 5) * 5}}{5 }
          =${Math.floor(fraction30[0] / 5)}+${texNombre((fraction30[0] - Math.floor(fraction30[0] / 5) * 5) / 5, 2)}=${texNombre(reponse, 2)}$`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
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
