import Exercice from '../../Exercice.js'
import { fraction } from '../../../modules/fractions.js'
import {
  mathalea2d, point, labelPoint, polygoneAvecNom, milieu, texteParPosition, polygone, codageAngleDroit
} from '../../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, randint, texNombre, shuffle, simplificationDeFractionAvecEtapes, choice, calcul, sp, arrondi } from '../../../modules/outils.js'
import { setReponse } from '../../../modules/gestionInteractif.js'

import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
export const titre = 'CAN 3ième sujet 2022'
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
    const listeFractions23 = [[3, 2], [1, 2], [3, 4], [1, 4], [2, 5],
      [3, 5], [4, 5], [11, 2], [7, 2], [9, 2]
    ]
    const listeFractions11 = [[2, 3], [5, 8], [3, 5], [5, 6], [5, 7], [5, 9], [3, 7], [6, 7], [5, 4], [4, 5]
    ]
    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, fraction23, poly, propositions, chiffre, chiffre2, u, moy, k1, k2, e, f, g, choix, a, b, c, d, p, k, A, B, C, D, I, J, K, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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

          a = choice(listeFractions11)
          b = fraction(a[0], a[1])
          k = randint(4, 9)
          texte = `Complète :<br>
          $\\dfrac{${a[0]}}{${a[1]}}=\\dfrac{\\ldots}{${a[1] * k}}$`

          texteCorr = `Le dénominateur a été multiplié par $${k}$, donc le numérateur est $${a[0]}\\times ${k}=${a[0] * k}$.<br>
          Ainsi,  $\\dfrac{${a[0]}}{${a[1]}}=\\dfrac{${a[0] * k}}{${a[1] * k}}$.`

          reponse = a[0] * k
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 12:
          a = randint(1, 9)
          b = randint(1, 5, a)

          reponse = a ** 2 + 2 * b ** 2
          texte = `$a=${a}$ et $b=${b}$<br>
          Calcule  $a^2+2\\times b^2$`
          reponse = a ** 2 + 2 * b ** 2
          texteCorr = `$a^2+2\\times b^2=${a}^2+2\\times ${b}^2=${a ** 2}+2\\times ${b ** 2}=${a ** 2}+${2 * b ** 2}=${reponse}$ `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 13:

          a = randint(1, 25) / 100
          reponse = a * 100
          texte = `Complète :<br>
          $${texNombre(a, 2)}=$`

          texteCorr = `$${texNombre(a, 2)}=\\dfrac{${texNombre(a * 100, 0)}}{100}=${texNombre(a * 100, 0)} \\%$ `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '$\\%$' } else { texte += '$\\ldots \\%$' }
          nbChamps = 1

          break

        case 14:
          if (choice([true, false])) {
            a = randint(5, 99) / 10
            b = randint(2, 9) * 5
            c = 100 - b
            texte = `$${b}\\times${texNombre(a, 1)} + ${texNombre(a, 1)}\\times${c}=$ 
      `
            texteCorr = ` On factorise : <br>     $\\begin{aligned}
      ${b}\\times${texNombre(a, 1)} + ${texNombre(a, 1)}\\times${c}&=${texNombre(a, 1)}\\times \\underbrace{(${b}+${c})}_{=100}\\\\
      &=${texNombre(a, 1)}\\times 100\\\\
      &=${100 * a}
      \\end{aligned}$`
            reponse = 100 * a
          } else {
            a = randint(2, 9) + randint(1, 9) / 10
            b = randint(2, 9, 5)
            c = 10 - b
            texte = `$${b}\\times${texNombre(a, 1)} + ${texNombre(a, 1)}\\times${c}=$ 
      `
            texteCorr = ` On factorise : <br>     $\\begin{aligned}
      ${b}\\times${texNombre(a, 1)} + ${texNombre(a, 1)}\\times${c}&=${texNombre(a, 1)}\\times \\underbrace{(${b}+${c})}_{=10}\\\\
      &=${texNombre(a, 1)}\\times 10\\\\
      &=${10 * a}
      \\end{aligned}$`
            reponse = 10 * a
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break
        case 15:

          moy = randint(10, 15)
          k1 = choice([1.5, 2.5, 3.5])
          k2 = choice([4.5, 5.5, 6.5])
          a = moy - k2
          b = moy - k1
          c = moy + k1
          d = moy + k2
          texte = `Calcule la moyenne de :<br>
         $${texNombre(a, 1)}$ ${sp(4)} $${texNombre(b, 1)}$${sp(4)}$${texNombre(c, 1)}$${sp(4)}$${texNombre(d, 1)}$`

          texteCorr = `$\\underbrace{${texNombre(a, 1)}}_{${moy}-${k2}}$ ${sp(4)} $\\underbrace{${texNombre(b, 1)}}_{${moy}-${k1}}$ ${sp(4)}$${texNombre(moy)}$${sp(4)}
          $\\underbrace{${texNombre(c, 1)}}_{${moy}+${k1}}$${sp(4)}$\\underbrace{${texNombre(d, 1)}}_{${moy}+${k2}}$<br>
          La moyenne est donc $${moy}$.`

          reponse = moy
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 16:

          a = randint(3, 6)
          b = randint(4, 5) * 2
          c = a * b / 2
          A = point(0, 0, 'A', 'below')
          B = point(0, 4, 'B', 'above')
          C = point(6, 0, 'C', 'below')
          poly = polygone([A, B, C], 'black')
          poly.couleurDeRemplissage = 'lightgray'
          d = texteParPosition(`$${c} \\text{ cm}^2$`, 1.5, 1.5, 'milieu', 'black', 1, 'middle', false)
          e = texteParPosition(`$${a} \\text{ cm}$`, -0.7, 2, 'milieu', 'black', 1, 'middle', false)
          poly.epaisseur = 1
          reponse = b
          texte = '<br>'

          texte += mathalea2d({ xmin: -1.5, ymin: -1, xmax: 7.1, ymax: 5, scale: 0.7 }, poly, labelPoint(A, B, C), codageAngleDroit(B, A, C), d, e)
          texteCorr = `L'aire du triangle est $\\dfrac{\\text{AB}\\times \\text{AC}}{2}=\\dfrac{${a}\\times \\text{AC}}{2}$.<br>
          On obtient ainsi,  $\\dfrac{${a}\\times \\text{AC}}{2}=${c}$ soit $${a}\\times AC=2\\times ${c}$, soit $AC=\\dfrac{${c * 2}}{${a}}=${reponse}$ cm.`
          texte += '<br> $AC= $'
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
          } else { texte += '$\\ldots $ cm<br>' }
          nbChamps = 1
          break

        case 17:
          a = randint(1, 5)
          b = choice([0.25, 0.5, 0.75])
          d = calcul(b * 60)
          if (!this.interactif) {
            texte = `Convertir en heures/minutes : <br>$${texNombre(a + b, 2)}$ h $=$ ..... h..... min`
            texteCorr = `$${texNombre(a + b, 2)}$h$ = ${a}$ h $ + ${texNombre(b, 2)} \\times 60  = ${a}$ h $${d}$ min`
          } else {
            texte = `Convertir en heures/minutes : <br>$${texNombre(a + b, 2)}$ h $=$`
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, a)
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
            texteCorr = `$${texNombre(a + b, 2)}$h$ = ${a}$ h $ + ${texNombre(b, 2)} \\times 60$ min $  = ${a}$ h $${d}$ min`
            setReponse(this, index + 1, d)
            nbChamps = 2
          }
          break

        case 18:

          a = randint(1, 9) * 10
          p = randint(2, 9, 5) * 10
          reponse = calcul(a * p / 100)
          texte = `$${p}\\%$ de $${a}= $`

          texteCorr = `          Prendre $${p}\\%$  de $${a}$ revient à prendre $${p / 10}\\times 10\\%$  de $${a}$.<br>
            Comme $10\\%$  de $${a}$ vaut $${a / 10}$ (pour prendre $10\\%$  d'une quantité, on la divise par $10$), alors
            $${p}\\%$ de $${a}=${p / 10}\\times ${a / 10}=${reponse}$.
           `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break
        case 19:

          a = randint(1, 9) * 10 + 5
          b = 100 - a
          c = randint(6, 39, [a, 10, 20, 30])
          d = 100 - c
          e = randint(4, 9)
          reponse = 200 + e
          if (choice([true, false])) {
            texte = `$${a}+${c}+${b}+${d}+${e}=$
      `
            texteCorr = `$${a}+${c}+${b}+${d}+${e}=\\underbrace{${a}+${b}}_{=100}+\\underbrace{${c}+${d}}_{=100}+${e}=${reponse}$
          `
          } else {
            texte = `$${a}+${e}+${c}+${b}+${d}=$
          `
            texteCorr = `$${a}+${e}+${c}+${b}+${d}=\\underbrace{${a}+${b}}_{=100}+\\underbrace{${c}+${d}}_{=100}+${e}=${reponse}$
              `
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 20:
          a = randint(2, 9) + randint(2, 9) / 10 + randint(2, 9) / 100
          b = choice([0.1, 0.01])

          reponse = a / b

          texte = `$${texNombre(a, 2)}\\div ${texNombre(b, 2)}=$
      `
          texteCorr = `$${texNombre(a, 2)}\\div ${texNombre(b, 2)}=${texNombre(a, 2)}\\times ${texNombre(1 / b, 2)}=${texNombre(reponse, 2)}$.
          `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 21:
          a = randint(3, 5) + randint(1, 9) / 10
          b = randint(6, 10) - a

          A = point(0, 0, 'A', 'below')
          B = point(5, 1, 'B', 'below')
          C = point(6, 4, 'C', 'above')
          D = point(1, 3, 'D', 'above')
          poly = polygone([A, B, C, D], 'black')
          reponse = 2 * (a + b)
          d = texteParPosition(`$${texNombre(a, 1)} \\text{ cm}$`, 6.2, 2, 'milieu', 'black', 1, 'middle', false)
          e = texteParPosition(`$${texNombre(b * 10, 1)} \\text{ mm}$`, 3, 4, 'milieu', 'black', 1, 'middle', false)
          poly.epaisseur = 1

          texte = 'Périmètre du parallélogramme $ABCD$ :<br> '
          texte += mathalea2d({ xmin: -1.5, ymin: -1, xmax: 7.1, ymax: 6, scale: 0.7 }, poly, labelPoint(A, B, C, D), d, e)
          texteCorr = `Le périmètre en cm est donné par : 
          $2\\times ${texNombre(a, 1)}+2\\times ${texNombre(b, 1)} =2\\times(${texNombre(a, 1)}+${texNombre(b, 1)})=${reponse}$ cm`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ' <br>$\\mathscr{P}= $'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
          } else { texte += '<br> $\\mathscr{P}=\\ldots $ cm' }
          nbChamps = 1
          break

        case 22:
          a = randint(2, 9) * choice([-1, 1])
          b = randint(2, 9) * choice([-1, 1])
          c = randint(2, 9) * choice([-1, 1])
          d = randint(2, 9) * choice([-1, 1])
          e = randint(2, 9) * choice([-1, 1])
          f = randint(2, 9) * choice([-1, 1])
          g = randint(2, 9) * choice([-1, 1])
          choix = choice(['a', 'b', 'c'])
          if (choix === 'a') {
            texte = `Calcule : <br>
            $\\dfrac{${a}}{${b}}\\times\\dfrac{${c}}{${d}}\\times\\dfrac{0}{${e}}\\times\\dfrac{${f}}{${g}}$ `
            reponse = fraction(0, 1)
            texteCorr = 'Il s\'agit d\'un produit avec un facteur nul, donc la résultat est 0.'
          }
          if (choix === 'b') {
            if (choice([true, false])) {
              texte = `Calcule : <br>
            $\\dfrac{${a}}{${b}}\\times\\dfrac{${c}}{${d}}\\times\\dfrac{${d}}{${a}}\\times\\dfrac{${b}}{${c}}$ `
              reponse = fraction(3, 3)
              texteCorr = `En simplifiant, on obtient : <br>
            $\\dfrac{${a}}{${a}}\\times\\dfrac{${b}}{${b}}\\times\\dfrac{${c}}{${c}}\\times\\dfrac{${d}}{${d}}=1$ .`
            } else {
              texte = `Calcule : <br>
    $\\dfrac{${a}}{${b}}\\times\\dfrac{${-c}}{${d}}\\times\\dfrac{${d}}{${a}}\\times\\dfrac{${b}}{${c}}$ `
              reponse = fraction(-3, 3)
              texteCorr = `En simplifiant, on obtient : <br>
    $\\dfrac{${a}}{${a}}\\times\\dfrac{${b}}{${b}}\\times\\dfrac{${d}}{${d}}\\times\\dfrac{${-c}}{${c}}=-1$ .`
            }
          }
          if (choix === 'c') {
            if (choice([true, false])) {
              texte = `Calcule : <br>
            $\\dfrac{${a}}{${f}}\\times\\dfrac{${c}}{${d}}\\times\\dfrac{${d}}{${a}}\\times\\dfrac{${e}}{${c}}$ `
              reponse = fraction(e, f)
              texteCorr = `En simplifiant, on obtient : <br>
            $\\dfrac{${a}}{${a}}\\times\\dfrac{${c}}{${c}}\\times\\dfrac{${d}}{${d}}\\times\\dfrac{${e}}{${f}}=\\dfrac{${e}}{${f}}${simplificationDeFractionAvecEtapes(e, f)}$ .`
            } else {
              texte = `Calcule : <br>
    $\\dfrac{${a}}{${b}}\\times\\dfrac{${e}}{${d}}\\times\\dfrac{${d}}{${a}}\\times\\dfrac{${b}}{${f}}$ `
              reponse = fraction(e, f)
              texteCorr = `En simplifiant, on obtient : <br>
    $\\dfrac{${a}}{${a}}\\times\\dfrac{${b}}{${b}}\\times\\dfrac{${d}}{${d}}\\times\\dfrac{${e}}{${f}}=\\dfrac{${e}}{${f}}${simplificationDeFractionAvecEtapes(e, f)}$ .`
            }
          }
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }

          nbChamps = 1

          break
        case 23:

          fraction23 = choice(listeFractions23)
          a = fraction(fraction23[0], fraction23[1])
          k = randint(3, 9)
          reponse = fraction23[0] / fraction23[1]
          texte = `Ecriture décimale de $\\dfrac{${fraction23[0] * k}}{${fraction23[1] * k}}$.`
          texteCorr = `En simplifiant, on obtient : $\\dfrac{${fraction23[0] * k}}{${fraction23[1] * k}}=\\dfrac{${fraction23[0]}}{${fraction23[1]}}=${texNombre(reponse, 2)}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 24:
          a = randint(1, 9) * 10
          b = randint(-9, -2) * 10
          reponse = b - a
          texte = `Complète :<br>
          $${a}+$ `

          texteCorr = `Le nombre cherché est $${b}-${a}=${b - a}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '$($'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur12') + `$)=${b}$`
          } else { texte += `$\\ldots=${b}$` }
          nbChamps = 1

          break

        case 25:
          a = choice([2, 3, 6]) // diviseur de l'heure
          b = calcul(60 / a) // nombre de minutes de l'énoncé
          c = choice([30, 60, 90, 120])
          reponse = c / a
          texte = `Un véhicule se déplace à vitesse constante de $${c}$ km/h. Combien de km parcourt-il en $${b}$ minutes ?`
          texteCorr = `Le véhicule parcourt $${c / a}$ km.<br>
         En $${b}$ minutes, il parcourt $${a}$ fois moins de km qu'en $1$ heure, soit $\\dfrac{${c}}{${a}}=
          ${c / a}$ km.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km' }
          nbChamps = 1
          break

        case 26:
          if (choice([true, false])) {
            a = randint(2, 6)
            b = randint(7, 10)
            I = point(0, 0, 'I', 'below')
            K = point(4, 0, 'K', 'below')
            J = point(0, 6, 'J', 'above')

            xmin = -1
            ymin = -1
            xmax = 4.5
            ymax = 6.8
            poly = polygoneAvecNom(I, J, K)
            objets = []
            objets.push(poly[0])
            objets.push(
              texteParPosition(`$${a} \\text{ cm}$`, milieu(I, K).x, milieu(I, K).y - 0.3, 'milieu', 'black', 1, 'middle', true)
              , texteParPosition(`$${b} \\text{ cm}$`, milieu(J, K).x + 0.6, milieu(J, K).y, 'milieu', 'black', 1, 'middle', true)
              , labelPoint(I, J, K), codageAngleDroit(J, I, K))
            propositions = shuffle([`$IJ=\\sqrt{${a ** 2 + b ** 2}}$`, `$IJ=\\sqrt{${b ** 2 - a ** 2}}$`, `$IJ=\\sqrt{${a + b}}$`, `$IJ=${b - a}$`])

            reponse = [`\\sqrt{${b ** 2 - a ** 2}}`]
            texte = 'Recopie la bonne réponse. <br>'
            texte += `${propositions[0]} ${sp(7)} ${propositions[1]} ${sp(7)} ${propositions[2]}${sp(7)} ${propositions[3]}<br>`
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 25, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)

            texteCorr = `On utilise le théorème de Pythagore dans le triangle rectangle $IJK$ :<br>
              On a $IJ^2=JK^2-IK^2$, soit $IJ^2=${b}^2-${a}^2=${b ** 2 - a ** 2}$.<br>
              Par conséquent, $IJ=\\sqrt{${b ** 2 - a ** 2}}$.`
          } else {
            a = randint(2, 6)
            b = randint(7, 10)
            I = point(0, 0, 'K', 'below')
            K = point(4, 0, 'I', 'below')
            J = point(0, 6, 'J', 'above')

            xmin = -1.2
            ymin = -1
            xmax = 4.5
            ymax = 6.8
            poly = polygoneAvecNom(I, J, K)
            objets = []
            objets.push(poly[0])
            objets.push(
              texteParPosition(`$${a} \\text{ cm}$`, milieu(I, K).x, milieu(I, K).y - 0.3, 'milieu', 'black', 1, 'middle', true)
              , texteParPosition(`$${b} \\text{ cm}$`, milieu(J, I).x - 0.6, milieu(J, I).y, 'milieu', 'black', 1, 'middle', true)
              , labelPoint(I, J, K), codageAngleDroit(J, I, K))
            propositions = shuffle([`$IJ=\\sqrt{${a ** 2 + b ** 2}}$`, `$IJ=\\sqrt{${b ** 2 - a ** 2}}$`, `$IJ=\\sqrt{${a + b}}$`, `$IJ=${b - a}$`])

            reponse = [`\\sqrt{${b ** 2 + a ** 2}}`]
            texte = 'Recopie la bonne réponse. <br>'
            texte += `${propositions[0]} ${sp(7)} ${propositions[1]} ${sp(7)} ${propositions[2]}${sp(7)} ${propositions[3]}<br>`
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 25, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)

            texteCorr = `On utilise le théorème de Pythagore dans le triangle rectangle $IJK$ :<br>
                    On a $IJ^2=JK^2+IK^2$, soit $IJ^2=${b}^2+${a}^2=${b ** 2 + a ** 2}$.<br>
                    Par conséquent, $IJ=\\sqrt{${b ** 2 + a ** 2}}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '<br>$IJ=$'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }
          nbChamps = 1
          break
        case 27:
          a = randint(7, 10)
          b = choice([25, 30, 35, 40, 45])
          c = randint(36, 58)
          if (!this.interactif) {
            texte = `Benoît prend le départ d'un marathon à $${a}$h $${b}$. <br>
            Il parcourt la distance en $3$ h  $${c}$ min. <br>
            À quelle heure arrive-t-il ?<br>
             ..... h..... min`
            texteCorr = `On ajoute $3$ h à $${a}$h $${b}$. Cela fait $${a + 3}$h $${b}$.<br>
            On complète l'heure avec $60-${b}$ soit $${60 - b}$ min. Il reste $${c}-${60 - b}$ soit $${c - 60 + b}$ min qu'il faut encore ajouter.<br>
            Benoît arrive  à $${a + 4}$h $${c - 60 + b}$.`
          } else {
            texte = `Benoît prend le départ d'un marathon à $${a}$h $${b}$. <br>
            Il parcourt la distance en $3$ h  $${c}$ min. <br>
            À quelle heure arrive-t-il ?<br>`
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, a + 4)
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
            texteCorr = `On ajoute $3$ h à $${a}$h $${b}$. Cela fait $${a + 3}$h $${b}$.<br>
            On complète l'heure avec $60-${b}$ min soit $${60 - b}$. Il reste $${c}-${60 - b}$ soit $${c - 60 + b}$ min qu'il faut encore ajouter.<br>
            Benoît arrive  à $${a + 4}$h $${c - 60 + b}$.`
            setReponse(this, index + 1, c - 60 + b)
            nbChamps = 2
          }
          break

        case 28:

          a = choice([10, 20, 25, 50])
          if (a === 10) { b = randint(4, 9) } else { b = randint(11, 19) }
          reponse = 100 / a * b
          texte = `Sur $${a}$ élèves, $${b}$ ont voté pour Sylvie.<br>
          Quel est le pourcentage de voix de Sylvie ?
      `
          texteCorr = `$${a}\\times ${100 / a}=100$, donc s'il y avait $100$ élèves, le nombre de  voix de Sylvie serait $${100 / a}\\times ${b}=${reponse}$.<br>
          Ainsi, le pourcentage de voix de Sylvie est $${reponse} \\%$.

          `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '$\\%$' }
          nbChamps = 1
          break

        case 29:
          a = choice([-3, -2, -1, 2, 3])
          b = choice([['double', 2], ['triple', 3]])

          reponse = b[1] * 10 ** a
          texte = `Le ${b[0]} de $10^{${a}}$ est : `
          texteCorr = `Le ${b[0]} de $10^{${a}}$ est : $${b[1]}\\times 10^{${a}} =${b[1]}\\times${texNombre(10 ** a)}=${texNombre(b[1] * 10 ** a, 3)}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 30:
          if (choice([true, false])) {
            b = randint(1, 9)
            c = randint(0, 9)
            d = randint(0, 9, [b, c])
            a = calcul(b * 100 + c * 10 + d)
            reponse = a % 3
            texte = `Quel est le reste de la division euclidienne de $${a}$ par $3$ ?`
            if (a % 3 === 0) {
              texteCorr = `Le reste de la division de $${a}$ par $3$ est $${a % 3}$.`
              texteCorr += ` Un entier est divisible par $3$ lorsque la somme de ses chiffres est un multiple de $3$.<br> 
            La somme des chiffres qui composent $${a}$ est :  $${b}+${c}+${d}=${b + c + d}$.<br>
         $${b + c + d}$ est un mutiple de $3$, donc le reste de la division de $${a}$ par $3$ est $0$.
            `
            }
            if (a % 3 === 2) {
              texteCorr = `Le reste de la division de $${a}$ par $3$ est ${a % 3}.`
              texteCorr += `Un entier est divisible par $3$ lorsque la somme de ses chiffres est un multiple de $3$.<br> 
            La somme des chiffres qui composent $${a}$ est : $${b}+${c}+${d}=${b + c + d}$.<br>
            $${b + c + d}$ n'est pas un mutiple de $3$. <br>
            En enlevant 2 unités à $${b + c + d}$, on obtient $${b + c + d - 2}$ qui est un multiple de $3$.<br>
            Cela signifie que $${a}-2=${a - 2}$ est un multiple de $3$.<br>
           Ainsi, le reste de la division de $${a}$ par $3$ est donc $2$.`
            }
            if (a % 3 === 1) {
              texteCorr = `Le reste de la division de $${a}$ par $3$ est ${a % 3}.`
              texteCorr += `Un entier est divisible par $3$ lorsque la somme de ses chiffres est un multiple de $3$.<br> 
           La somme des chiffres qui composent $${a}$ est : $${b}+${c}+${d}=${b + c + d}$.<br>
           $${b + c + d}$ n'est pas un mutiple de $3$. <br>
           En enlevant 1 unité à $${b + c + d}$, on obtient $${b + c + d - 1}$ qui est un multiple de $3$.<br>
           Cela signifie que $${a}-1=${a - 1}$ est un multiple de $3$.<br>
          Ainsi, le reste de la division de $${a}$ par $3$ est donc $1$.`
            }
          } else {
            b = randint(1, 9)
            c = randint(0, 9)
            d = randint(0, 9, [b, c])
            a = calcul(b * 100 + c * 10 + d)
            reponse = a % 2
            texte = `Quel est le reste de la division euclidienne de $${a}$ par $2$ ?`
            if (a % 2 === 0) {
              texteCorr = ` 
            Le nombre est pair, le reste de la division de $${a}$ par $2$ est donc $0$.
             `
            }
            if (a % 2 === 1) {
              texteCorr = `
             Le nombre est impair, le reste de la division de $${a}$ par $2$ est donc $1$.
              `
            }
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
