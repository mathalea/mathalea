import Exercice from '../Exercice.js'
import { fraction } from '../../modules/fractions.js'
import {
  mathalea2d, point, grille, droiteGraduee2, segment, milieu, labelPoint, texteParPosition, codeSegment, codageAngleDroit
} from '../../modules/2d.js'
import { round, min } from 'mathjs'

import { listeQuestionsToContenu, miseEnEvidence, combinaisonListesSansChangerOrdre, range1, randint, texNombre, shuffle, choice, calcul, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import Grandeur from '../../modules/Grandeur.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'CAN Sixième sujet 2022'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '11/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export default function SujetCAN2022Sixieme () {
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
    let questions = []
    if (!this.sup) {
      // Si aucune question n'est sélectionnée
      questions = combinaisonListesSansChangerOrdre(range1(1), this.nbQuestions)
    } else {
      if (typeof this.sup === 'number') {
        // Si c'est un nombre c'est qu'il y a qu'une seule question
        questions[0] = this.sup
        this.nbQuestions = 1
      } else {
        questions = this.sup.split('-') // Sinon on créé un tableau à partir des valeurs séparées par des -
        this.nbQuestions = questions.length
      }
    }
    for (let i = 0; i < questions.length; i++) {
      questions[i] = parseInt(questions[i]) - 1
    }
    const listeIndex = combinaisonListesSansChangerOrdre(questions, this.nbQuestions)
    const typeQuestionsDisponibles = [26]
    const hauteurs = [
      ['fourmi', 3, 115, 'cm'],
      ['grue', 120, 250, 'dm'],
      ['tour', 50, 180, 'm'],
      ['girafe', 40, 50, 'dm'],
      ['coline', 75, 150, 'm']
    ]
    const listeFractions15 = [[1, 3], [2, 3], [1, 6], [5, 6], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5]
    ]
    const listeFractions20 = [[1, 10], [3, 10], [7, 10], [9, 10], [1, 2], [1, 4], [3, 4]
    ]
    const nombre18 = [
      ['dixièmes', 10],
      ['centième', 100],
      ['millième', 1000]
    ]
    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, maListe, taille1, taille2, chiffre, chiffre2, propositions, p, m, n, code1, code2, code3, code4, choix, truc, a, b, c, d, k, s1, s2, A, B, C, D, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[listeIndex[i]]) {
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

          a = randint(11, 25, 20) * 2
          reponse = a / 2
          texte = `La moitié de $${a}$ est : `
          texteCorr = `La moitié de $${a}$ est $${a}\\div 2=${a / 2}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '\\ldots' }
          nbChamps = 1
          break

        case 3:
          a = randint(12, 39, [20, 30])

          reponse = 100 - a
          texte = `Complète : <br>$${a}+\\ldots =100$ `

          texteCorr = `$100-${a}=${100 - a}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }
          nbChamps = 1
          break

        case 4:
          a = randint(2, 6)
          k = randint(2, 4)
          b = k * a
          reponse = k * b
          texte = `$${a}$ cahiers coûtent $${b}$ €.<br>
             $${b}$ cahiers coûtent `

          texteCorr = `$${a}$ cahiers coûtent $${b}$ €.<br>
            $${k}\\times${a}=${k * a}$ cahiers coûtent $${k}\\times${b}=${k * b}$ €.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') +
            '€'
          } else { texte += '$\\ldots$ €' }
          nbChamps = 1
          break
        case 5:
          a = randint(1, 11) * 5
          b = choice([1, 2])
          texte = `$${b}$ h $${a}$ min $=$
             `

          texteCorr = `$${b}$ h $${a}$ min $=${b}\\times 60+ ${a}$ min $=${b * 60 + a}$ min`

          reponse = b * 60 + a

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'min' } else { texte += '$\\ldots$ min' }
          nbChamps = 1
          break

        case 6:
          a = randint(84, 100) // choix de la table = écart entre deux graduations

          d = droiteGraduee2({
            Unite: 0.5,
            Min: 81,
            Max: 105,
            x: 0,
            y: 0,
            thickDistance: 10,
            thickSec: true,
            thickSecDist: 1,
            thickOffset: 0,
            axeStyle: '->',
            pointListe: [[a, '$\\large{?}$']],
            labelListe: maListe,
            pointCouleur: 'blue',
            pointStyle: 'x',
            labelsPrincipaux: true
          })
          reponse = a
          texte = 'Quel est le nombre écrit sous le point d\'interrogation ?<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 2, scale: 0.6, style: 'margin: auto' }, d)
          texteCorr = `Le nombre écrit sous le point d'interrogation est : $${a}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 7:
          a = randint(21, 38, [30, 29])
          b = choice([19, 29, 39])

          texte = `$${a}+${b}=$`
          reponse = a + b
          if (b === 19) { texteCorr = `$${a}+${b}=${a}+20-1=${a + 20}-1=${reponse}$` }
          if (b === 29) { texteCorr = `$${a}+${b}=${a}+30-1=${a + 30}-1=${reponse}$` }
          if (b === 39) { texteCorr = `$${a}+${b}=${a}+40-1=${a + 40}-1=${reponse}$` }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 8:
          choix = choice(['a', 'b', 'c'])
          if (choix === 'a') {
            a = randint(4, 9) * 3

            reponse = a / 3
            texte = `$${a}$ élèves se mettent par groupe de $3$. <br>
          Il y a `
            texteCorr = `Le nombre de groupes est donné par $${a}\\div 3=${a / 3}$.`
          }
          if (choix === 'b') {
            a = randint(4, 9) * 4

            reponse = a / 4
            texte = `$${a}$ élèves se mettent par groupe de $4$. <br>
            Il y a `
            texteCorr = `Le nombre de groupes est donné par $${a}\\div 4=${a / 4}$.`
          }
          if (choix === 'c') {
            a = randint(4, 7) * 5

            reponse = a / 5
            texte = `$${a}$ élèves se mettent par groupe de $5$. <br>
                Il y a `
            texteCorr = `Le nombre de groupes est donné par $${a}\\div 5=${a / 5}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'groupes' } else { texte += '$\\ldots$ groupes.' }
          nbChamps = 1
          break

        case 9:

          choix = choice(['a', 'b', 'c'])//, 'b', 'c'
          if (choix === 'a') {
            a = randint(4, 9) * 4

            reponse = a / 4
            texte = `Le quart de $${a}$ est :  `
            texteCorr = `Le quart de $${a}$ est : $${a}\\div 4=${a / 4}$.`
          }
          if (choix === 'b') {
            a = choice([100, 200, 40, 80, 120, 160])

            reponse = a / 4
            texte = `Le quart de $${a}$ est :  `
            texteCorr = `Le quart de $${a}$ est : $${a}\\div 4=${a / 4}$.`
          }
          if (choix === 'c') {
            a = randint(4, 10) * 3

            reponse = a / 3
            texte = `Le tiers de $${a}$ est :  `
            texteCorr = `Le tiers de $${a}$ est : $${a}\\div 3=${a / 3}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$ ' }
          nbChamps = 1
          break

        case 10:
          a = randint(4, 9)
          b = randint(2, 9)
          c = randint(2, 5, [a, b])
          texte = `Complète :<br>
            $${a}+${b}=\\ldots+${c}$`
          reponse = a + b - c
          texteCorr = `Le nombre cherché est : $${a}+${b}-${c}=${reponse}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 11:

          a = randint(1, 9) + randint(3, 7) / 10
          k = choice([10, 100, 1000])
          reponse = a * k
          texte = `$${texNombre(a)}\\times ${k}=$`

          texteCorr = `$${texNombre(a)}\\times ${k}=${texNombre(a * k)}$ `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 12:
          a = randint(14, 19)
          b = choice([35, 40, 45, 50, 55])
          c = a + 2
          d = b - choice([5, 10, 15, 20, 25, 30])

          texte = `Un film commence à $${a}$ h $${b}$ et se termine à $${c}$ h $${d}$.<br>
          Combien de temps a duré le film ?`

          texteCorr = `Pour aller à $${a + 1}$ h, il faut $${60 - b}$ min, et il faut ajouter $1$ heure et $${d}$ min pour arriver à $${c}$ h $${d}$, soit au total $1$ h $${60 - b + d}$ min.`

          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, 1, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
            setReponse(this, index + 1, 60 - b + d, { formatInteractif: 'calcul' })
          }
          nbChamps = 2
          break

        case 13:
          if (choice([true, false])) {
            a = randint(2, 7)
            reponse = 4 * a
            texte = `Complète :<br>$${a}=$`

            texteCorr = `$${a}=\\dfrac{${4 * a}}{4}=${4 * a}\\times \\dfrac{1}{4}$, donc $${4 * a}$ quarts $=${a}$. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'quarts' } else { texte += '\\ldots$ quarts' }
          } else {
            a = randint(2, 7)
            reponse = 3 * a
            texte = `Complète :<br>$${a}=$`

            texteCorr = `$${a}=\\dfrac{${3 * a}}{3}=${3 * a}\\times \\dfrac{1}{3}$, donc $${3 * a}$ tiers $=${a}$. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'tiers' } else { texte += '\\ldots$ tiers' }
          }

          nbChamps = 1

          break

        case 14:
          if (choice([true, false])) {
            a = randint(6, 10)
            b = choice([35, 40, 45, 50, 55])
            c = choice([30, 35, 40, 45])
            texte = `Ajoute $${b}$ min à $${a}$ h $${c}$ min.`
            reponse = b + c - 60
            texteCorr = `Pour aller à $${a + 1}$ h, il faut $${60 - c}$ min, et il reste $${b - 60 + c}$ min à ajouter, ce qui donne 
            $${a + 1}$ h et $${reponse}$ min.`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
              setReponse(this, index, a + 1, { formatInteractif: 'calcul' })
              texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
              setReponse(this, index + 1, reponse, { formatInteractif: 'calcul' })
            }
          } else {
            a = randint(6, 10)
            b = choice([20, 25, 30, 35])
            c = choice([45, 50, 55])
            texte = `Ajoute $${b}$ min à $${a}$ h $${c}$ min.`
            reponse = b + c - 60
            texteCorr = `Pour aller à $${a + 1}$ h, il faut $${60 - c}$ min, et il reste $${b - 60 + c}$ min à ajouter, ce qui donne 
$${a + 1}$ h et $${reponse}$ min.`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
              setReponse(this, index, a + 1, { formatInteractif: 'calcul' })
              texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
              setReponse(this, index + 1, reponse, { formatInteractif: 'calcul' })
            }
          }
          nbChamps = 2
          break

        case 15:
          a = calcul(randint(1, 9) + 0.9 + randint(1, 9) / 100)
          b = calcul(randint(1, 9) + randint(1, 9) / 10 + 0.09 + randint(1, 9) / 1000)

          if (choice([true, false])) {
            texte = `Ajoute un dixième à $${texNombre(a)}$ ?`
            texteCorr = `$1$ dixième $=0,1$, d'où $${texNombre(a)}+0,1 =${texNombre(a + 0.1)}$`
            reponse = a + 0.1
          } else {
            texte = `Ajoute un centième à $${texNombre(b)}$ ?`
            texteCorr = `$1$ centième $=0,01$, d'où $${texNombre(b)}+0,01 =${texNombre(b + 0.01)}$`
            reponse = b + 0.01
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 16:
          if (choice([true, false])) {
            a = choice([20, 25, 30, 35, 40, 45, 50])
            b = randint(3, 9)

            reponse = a - b
            texte = `Yann a $${a}$ billes. Il a $${b}$ billes de plus que Lou.<br>
            Lou a `

            texteCorr = `Yann a $${b}$ billes de plus que Lou, donc Lou en a $${b}$ de moins, soit $${a}-${b}=${a - b}$ billes.`
          } else {
            a = choice([20, 25, 30, 35, 40, 45, 50])
            b = randint(3, 9)

            reponse = a + b
            texte = `Yann a $${a}$ billes. Il a $${b}$ billes de moins que Lou.<br>
               Lou a `
            texteCorr = `Yann a $${b}$ billes de moins que Lou, donc Lou en a $${b}$ de plus, soit $${a}+${b}=${a + b}$ billes.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'billes' } else { texte += '$\\ldots$ billes.' }
          nbChamps = 1
          break

        case 17:
          a = randint(7, 12) * 2 + 1
          b = randint(3, 6) * 2 + 1

          A = point(0, 0, 'A', 'below')
          B = point(4, 0, 'B', 'below')
          C = point(4, 3, 'C', 'above')
          D = point(0, 3, 'D', 'above')
          code1 = codageAngleDroit(A, B, C)
          code2 = codageAngleDroit(B, C, D)
          code3 = codageAngleDroit(C, D, A)
          code4 = codageAngleDroit(D, A, B)
          xmin = -1.5
          ymin = -1
          xmax = 5
          ymax = 4
          objets = []
          objets.push(
            texteParPosition(`$${texNombre(a / 2)} \\text{ cm}$`, milieu(A, B).x, milieu(A, B).y - 0.4, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${texNombre(a / 2)} \\text{ cm}$`, milieu(D, C).x, milieu(D, C).y + 0.4, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('$\\text{?}$', milieu(D, C).x, milieu(D, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
            segment(A, B), segment(B, C), segment(C, D), segment(D, A), code1, code2, code3, code4)
          reponse = b / 2
          texte = `Le périmètre de cette figure est $${a + b}$ cm. <br>
            `
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.8, style: 'margin: auto' }, objets)
          texteCorr = `Puisque le périmètre du rectangle est $${a + b}$ cm, alors $\\text{?}=(${a + b}-2\\times ${texNombre(a / 2)})\\div 2=${texNombre(b / 2)}$ cm.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '<br>$\\text{?}=$'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
          } else { texte += '  $\\text{?}=\\ldots$ cm' }

          nbChamps = 1
          break
        case 18:
          if (choice([true, false])) {
            a = randint(1, 13) * 50
            reponse = a / 1000
            texte = `$${texNombre(a)}$ g  =`

            texteCorr = `
    Comme $1$ kg $=${texNombre(1000)}$ g, alors $1$ g $=0,001$ kg.<br>
    Ainsi pour passer des "g" au "kg", on divise par $${texNombre(1000)}$.<br>
      Comme : $${texNombre(a)}\\div ${texNombre(1000)} =${texNombre(a / 1000)}$, alors $${texNombre(a)}$ g$=${texNombre(a / 1000)}$ kg.  `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'kg'
            } else { texte += '  $\\ldots$ kg' }
          } else {
            a = randint(1, 5) / 10
            reponse = a * 1000
            texte = `$${texNombre(a)}$ kg  = `
            texteCorr = ` Comme $1$ kg $=${texNombre(1000)}$ g,  pour passer des "kg" au "g", on multiplie par $${texNombre(1000)}$.<br>
            Comme : $${texNombre(a)}\\times ${texNombre(1000)} =${texNombre(a * 1000)}$, alors $${texNombre(a)}$ kg$=${reponse}$ g.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'g'
            } else { texte += '  $\\ldots$ g' }
          }
          nbChamps = 1
          break

        case 19:
          chiffre = [['deux', 2], ['trois', 3], ['cinq', 5]]
          chiffre2 = [['vingt', 20], ['trente', 30], ['cinquante', 50]]
          a = randint(0, 2)
          choix = choice(['a', 'b', 'c', 'd'])
          if (choix === 'a') {
            texte = `Ecris en chiffres : <br>
              Deux-millions-${chiffre[a][0]}-cent-${chiffre[a][0]}-mille `
            reponse = 2 * 1000000 + chiffre[a][1] * 100000 + chiffre[a][1] * 1000
            texteCorr = `Deux-millions-${chiffre[a][0]}-cent-${chiffre[a][0]}-mille$=
            ${texNombre(2 * 1000000)} + ${texNombre(chiffre[a][1] * 100000)} + ${texNombre(chiffre[a][1] * 1000)} 
                        =${texNombre(2 * 1000000 + chiffre[a][1] * 100000 + chiffre[a][1] * 1000)}$. `

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          }

          if (choix === 'b') {
            texte = `Ecris en chiffres : <br>
              Deux-millions-${chiffre[a][0]}-mille `
            reponse = calcul(2 * 1000000 + chiffre[a][1] * 1000)
            texteCorr = `Deux-millions-${chiffre[a][0]}-mille-${chiffre[a][0]} $=${texNombre(2 * 1000000)}  + ${texNombre(chiffre[a][1] * 1000)} + ${texNombre(chiffre[a][1])}=${texNombre(2 * 1000000 + chiffre[a][1] * 1000)}$. `

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          }

          if (choix === 'c') {
            texte = `Ecris en chiffres : <br>
              Deux-millions-${chiffre2[a][0]}-mille `
            reponse = calcul(2 * 1000000 + chiffre2[a][1] * 1000)
            texteCorr = `Deux-millions-${chiffre2[a][0]}-mille $=${texNombre(2 * 1000000)}  + ${texNombre(chiffre2[a][1] * 1000)} =${texNombre(2 * 1000000 + chiffre2[a][1] * 1000)}$. `

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          }

          if (choix === 'd') {
            texte = `Ecris en chiffres : <br>
              Deux-millions-${chiffre[a][0]}-mille `
            reponse = calcul(2 * 1000000 + chiffre[a][1] * 1000)
            texteCorr = `Deux-millions-${chiffre[a][0]}-mille-${chiffre2[a][0]} $=${texNombre(2 * 1000000)}  + ${texNombre(chiffre[a][1] * 1000)} =${texNombre(2 * 1000000 + chiffre[a][1] * 1000)}$. `

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          }
          nbChamps = 1
          break
        case 20:
          if (choice([true, false])) {
            a = grille(-2, -2, 9, 4, 'gray', 1, 1)

            b = randint(1, 6, 4)

            A = point(0, 0, 'A', 'below')
            B = point(b, 0, 'B', 'below')
            C = point(0, 2, 'C', 'above')
            D = point(4, 2, 'D', 'above')
            s1 = segment(C, D)
            s1.epaisseur = 4
            s2 = segment(A, B)
            s2.epaisseur = 4
            xmin = -1
            ymin = -2
            xmax = 9
            ymax = 4
            objets = []
            objets.push(
              texteParPosition('1 unité', milieu(C, D).x, milieu(C, D).y + 0.4, 'milieu', 'black', 1, 'middle', true),
              a, s1, s2, labelPoint(A, B), point(A, B))
            reponse = fraction(b, 4)
            texte = `Quelle est la longueur du segment $[AB]$ ? <br>
            `
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = `Une unité correspond à $4$ carreaux, le segment $[AB]$ mesure $${b}$ carreaux, soit $\\dfrac{${b}}{4}=${texNombre(b / 4)}$ unité. `
          } else {
            a = grille(-2, -2, 10, 4, 'gray', 1, 1)

            b = randint(1, 9, 5)

            A = point(0, 0, 'A', 'below')
            B = point(b, 0, 'B', 'below')
            C = point(0, 2, 'C', 'above')
            D = point(5, 2, 'D', 'above')
            s1 = segment(C, D)
            s1.epaisseur = 4
            s2 = segment(A, B)
            s2.epaisseur = 4
            xmin = -1
            ymin = -2
            xmax = 10
            ymax = 4
            objets = []
            objets.push(
              texteParPosition('1 unité', milieu(C, D).x, milieu(C, D).y + 0.4, 'milieu', 'black', 1, 'middle', true),
              a, s1, s2, labelPoint(A, B), point(A, B))
            reponse = fraction(b, 5)
            texte = `Quelle est la longueur du segment $[AB]$ ? <br>
            `
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 25, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = `Une unité correspond à $5$ carreaux, le segment $[AB]$ mesure $${b}$ carreaux, soit $\\dfrac{${b}}{5}=${texNombre(b / 5)}$ unité. `
          }
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'unité'
          } else { texte += ' $\\ldots$ unité' }

          nbChamps = 1

          break

        case 21:

          a = choice([2, 3, 5, 10, 100])
          texte = `Complète : <br>
            $${a}$ jours $=$`
          reponse = 24 * a
          texteCorr = `Dans une journée, il y a $24$ heures, donc dans $${a}$ jours, il y a $${a}\\times 24=${a * 24}$ heures.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'h'
          } else { texte += '$\\ldots$ h' }

          nbChamps = 1

          break

        case 22:
          a = randint(2, 10)
          texte = `Complète : <br>
          $${a}$ heures $=$`
          reponse = 60 * a
          texteCorr = `Dans une heuree, il y a $60$ minutes, donc dans $${a}$ heures, il y a $${a}\\times 60=${a * 60}$ heures.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'min'
          } else { texte += '$\\ldots$ min' }

          nbChamps = 1

          break
        case 23:
          choix = choice(['a', 'b', 'c'])
          if (choix === 'a') {
            a = randint(2, 5) + randint(1, 9) / 10

            reponse = a * 10
            texte = `Combien faut-il de pièces de $10$ centimes pour avoir $${texNombre(a, 2, true)}$ €. <br>
                    `
            texteCorr = `Il faut : $${texNombre(a)}\\div 0,1=${texNombre(a)}\\times 10=${a * 10}$ pièces.`
          } if (choix === 'b') {
            a = randint(2, 5) + (randint(1, 4) * 2) / 10

            reponse = a * 5
            texte = `Combien faut-il de pièces de $20$ centimes pour avoir $${texNombre(a, 2, true)}$ €. <br>
                     `
            texteCorr = `Pour un euro, il faut $5$ pièces de $20$ centimes, donc pour $${Math.trunc(a)}$ €, il en faut $${Math.trunc(a)}\\times 5=${Math.trunc(a) * 5}$. <br>
           Pour $${texNombre(a - Math.trunc(a))}$ €, il en faut $${texNombre((a - Math.trunc(a)) * 5)}$, donc en tout $${reponse}$.`
          }
          if (choix === 'c') {
            a = randint(2, 9) + 5 / 10

            reponse = a * 2
            texte = `Combien faut-il de pièces de $50$ centimes pour avoir $${texNombre(a, 2, true)}$ €. <br>
                   `
            texteCorr = `Pour un euro, il faut $2$ pièces de $50$ centimes, 
          donc pour $${Math.trunc(a)}$, 
          il en faut $${Math.trunc(a)}\\times 2=${Math.trunc(a) * 2}$. <br>
          Donc pour $${texNombre(a, 2, true)}$ €, il en faut  $${reponse}$.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }

          nbChamps = 1
          
          break

        case 24:
          if (choice([true, false])) {
            a = choice([1, 2, 3, 4, 6, 7, 8, 9]) // numérateur
            reponse = calcul(a / 5)
            texte = 'Determine l\'abscisse du point A  :<br> On donnera le résultat sous  forme décimale.<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5, scale: 0.8, style: 'margin: auto' }, droiteGraduee2({
              Unite: 3,
              Min: 0,
              Max: 3.2,
              x: 0,
              y: 0,
              thickSecDist: 1 / 5,
              thickSec: true,
              thickoffset: 0,
              axeStyle: '|->',
              pointListe: [[a / 5, 'A']],
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true,
              step1: 1,
              step2: 1
            }))
            texteCorr = `L'unité est divisée en $5$. Ainsi, l'abscisse du point A est $\\dfrac{${a}}{5}=${texNombre(reponse)}$`
          } else {
            a = choice([1, 3, 5, 7, 9]) // numérateur
            reponse = calcul(a / 4)
            texte = 'Determine l\'abscisse du point A  :<br> On donnera le résultat sous  forme décimale.<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5, scale: 0.8, style: 'margin: auto' }, droiteGraduee2({
              Unite: 3,
              Min: 0,
              Max: 3.2,
              x: 0,
              y: 0,
              thickSecDist: 1 / 4,
              thickSec: true,
              thickoffset: 0,
              axeStyle: '|->',
              pointListe: [[a / 4, 'A']],
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true,
              step1: 1,
              step2: 1
            }))
            texteCorr = `L'unité est divisée en $4$. Ainsi, l'abscisse du point A est $\\dfrac{${a}}{4}=${texNombre(reponse)}$`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 25:

          a = randint(1, 9) / 10 + randint(1, 9) / 100
          b = randint(1, 9) / 10
          reponse = a + b
          texte = `$${texNombre(a)}+${texNombre(b)}=$`
          texteCorr = ` $${texNombre(a)}+${texNombre(b)}=${texNombre(a + b)}$`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$ ' }

          nbChamps = 1
          break

        case 26:
          taille1= [['fourmi', 2,5, 'mm'], ['girafe', 40,50,'dm'],['crevette',5,10,'cm'] ,['baleine',15,25,'m'] , ['souris', 40,60, 'mm']]
         
          a = randint(0, 1)
          b = randint(taille1[a][1], taille1[a][2])
          propositions = shuffle([`$${b}$ m`, `$${b}$ dm`, `$${b}$ cm`, `$${b}$ mm`])
         
          texte = `Choisis parmi les propositions suivantes la taille d'une ${taille1[a][0]} (nombre et unité à recopier)<br>`
                    texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}${sp(4)} ${propositions[3]}`
          texteCorr = `La taille d'une ${taille1[a][0]} est ${b} ${taille1[a][3]}`
          setReponse(this, index, new Grandeur(b, taille1[a][3]), { formatInteractif: 'unites' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
                    nbChamps = 1
          break

        case 27:
          a = randint(3, 6)
          b = choice([a + 1, 2 * a - 1])
          reponse = fraction(b, a)// .simplifie()
          texte = 'Quelle est la fraction repérée par le point d’interrogation ?<br>' +
           mathalea2d({ xmin: -0.5, ymin: -1, xmax: 10, ymax: 1.5, scale: 0.8, style: 'margin: auto' }, droiteGraduee2({
             Unite: 8,
             Min: 1,
             Max: 2,
             x: 0,
             y: 0,
             thickSecDist: 1 / a,
             thickSec: true,
             thickoffset: 0,
             axeStyle: '|->',
             pointListe: [[b / a, '$\\large ?$']],
             pointCouleur: 'blue',
             pointStyle: 'x',
             labelsPrincipaux: true,
             step1: 1,
             step2: 1
           }))
          texteCorr = `L'unité est divisée en $${a}$. <br>
          $1=\\dfrac{${a}}{${a}}$ et $2=\\dfrac{${2 * a}}{${a}}$. Ainsi, le point d'interrogation est   $\\dfrac{${b}}{${a}}$.`
          setReponse(this, index, reponse, { formatInteractif: 'fraction' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 28:
          a = randint(5, 11) * 2
          b = choice([5, 7, 9])
          reponse = a * b / 2
          texte = `$2$ BD identiques coûtent $${a}$ €.<br>
          Combien coûtent $${b}$ BD identiques ?
      `
          texteCorr = `Une BD coûte $${a}\\div 2=${a / 2}$ €, donc $${b}$ BD identiques coûtent $${a / 2}\\times ${b}=${reponse}$ €.

          `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '€' }
          nbChamps = 1
          break

        case 29:
          a = randint(2, 5)
          b = randint(3, 6)

          reponse = a * b
          texte = `Une usine fabrique des tasses.<br>
          $${a}$ tailles et $${b}$ couleurs sont possibles.<br>
          Combien de types de tasses peut-elle fabriquer ?`
          texteCorr = `Elle peut en fabriquer $${a}\\times ${b}=${a * b}$ types différents. `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 30:

          a = randint(1, 5)
          texte = `En grisé, on a représenté une unité d'aire, notée uA.<br>
            Quelle est l'aire de la figure hachurée ?`
          texteCorr = '$1$ uA est représentée par  .... petits carreaux. La figure grisée compte .... petits carreaux....'
          reponse = a

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'uA' } else { texte += '<br>Aire $=\\ldots $ uA' }
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
