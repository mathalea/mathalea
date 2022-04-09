import Exercice from '../Exercice.js'
import { fraction } from '../../modules/fractions.js'
import {
  mathalea2d, point, repere2, droiteGraduee2, courbe2, labelPoint, segment, milieu, texteParPosition, codeSegment
} from '../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, miseEnEvidence, combinaisonListesSansChangerOrdre, range1, stringNombre, randint, ecritureAlgebrique, texNombre, texFractionReduite, printlatex, shuffle, simplificationDeFractionAvecEtapes, choice, calcul, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'

import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'CAN Sixième sujet 2021'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '05/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export default function SujetCAN2021Sixieme () {
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
    const typeQuestionsDisponibles = [16]

    const listeFractions15 = [[1, 3], [2, 3], [1, 6], [5, 6], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5]
    ]

    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, maListe, propositions, k1, k2, m, n, r, f, listeFacteurs16 = [], code1, code2, code3, code4, choix, truc, a, b, c, d, p, k, A, B, C, D, E, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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

          a = randint(2, 9)
          b = randint(4, 10)
          c = a * b
          reponse = b
          if (choice([true, false])) {
            texte = `Compléter : <br>$${a}\\times .... =${c}$`
            texteCorr = `$${a}\\times ${miseEnEvidence(b)} =${c}$`
          } else {
            texte = `Compléter :<br> $ .... \\times ${a}=${c}$`
            texteCorr = `$ ${miseEnEvidence(b)} \\times ${a}=${c}$`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 3:
          a = randint(12, 25, [10, 20]) * 2

          reponse = a / 2
          texte = `La moitié de $${a}$ est
             `
          texteCorr = `La moitié de $${a}$ est  $${a}\\div 2=${a / 2}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ':'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 4:
          a = randint(3, 8) // choix de la table = écart entre deux graduations
          c = Math.floor(randint(10, 40) / a) * a // premier nombre.
          maListe = []
          for (let i = 0; i < 2; i++) {
            maListe.push([c + a * i, texNombre(c + a * i)])
          }
          d = droiteGraduee2({
            Unite: 3 / a,
            Min: c - 2 * a,
            Max: c + 2 * a,
            x: 0,
            y: 0,
            thickDistance: a,
            thickSec: false,
            thickOffset: 0,
            axeStyle: '->',
            pointListe: [[c - a, '$\\large{?}$']],
            labelListe: maListe,
            pointCouleur: 'blue',
            pointStyle: 'x',
            labelsPrincipaux: false
          })
          reponse = c - a
          texte = 'Quel est le nombre écrit sous le point d\'interrogation ?<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 2, scale: 0.6, style: 'margin: auto' }, d)
          texteCorr = `Comme les graduations vont de $${a}$ en $${a}$,  le nombre écrit sous le point d'interrogation correspond à $${c}-${a}=${c - a}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break
        case 5:
          a = randint(201, 249)

          texte = `$${a}+99=$
             `

          texteCorr = `$${a}+99=${a}+100-1=${a + 100}-1=${a + 99}$`

          reponse = a + 99

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 6:
          a = randint(2, 5)
          b = randint(8, 12)
          k = randint(2, 5)
          reponse = b * k

          texte = `$${a}$ carreaux de chocolat pèsent $${b}$ g en tout.<br>
          Combien pèsent $${a * k}$ carreaux de chocolat ?
               `
          texteCorr = `$${a}$ carreaux de chocolat pèsent $${b}$ g, donc $${a}\\times ${k}$ carreaux pèsent $${b}\\times ${k}$ g, soit $${k * b}$ g.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'g' }
          nbChamps = 1
          break

        case 7:
          a = randint(5, 10)

          choix = choice(['a', 'a', 'b'])
          if (choix === 'a') {
            b = choice([35, 40, 45, 50, 55])
            texte = `Il est $${a}$ h $${b}$ min.<br>
            Dans une demi-heure, quelle heure sera-t-il ?`
            reponse = calcul(b - 30)
            texteCorr = `Une demi-heure est égale à $30$ minutes. Ainsi $${a}$ h $${b}$ min + $30$ min est égal à $${a + 1}$ h $${b - 30}$ min.`
          }
          if (choix === 'b') {
            b = choice([50, 55])
            texte = `Il est $${a}$ h $${b}$ min.<br>
          Dans un quart d'heure, quelle heure sera-t-il ?`
            reponse = calcul(b - 45)
            texteCorr = `Un quart d'heure est égal à $15$ minutes. Ainsi $${a}$ h $${b}$ min + $15$ min est égal à $${a + 1}$ h $${b - 45}$ min.`
          }
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, a + 1, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
            setReponse(this, index + 1, reponse, { formatInteractif: 'calcul' })
          }
          nbChamps = 2

          break

        case 8:
          a = randint(12, 25, [17, 18, 19, 20])
          k = randint(3, 6)

          reponse = a * k
          texte = `$${a}\\times ${k}=$`
          texteCorr = `$${a}\\times ${k}=${a * k}$
                                   `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 9:

          a = randint(2, 9) * 2 + 1

          texte = `Un ruban mesure $${a}$ cm. On le coupe en $2$ morceaux de même longueur.<br>
            Un morceau mesure `
          texteCorr = `Un morceau mesure : $${a}\\div 2=${texNombre(a / 2)}$ cm`
          reponse = a / 2

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' } else { texte += '$\\ldots$ cm' }
          nbChamps = 1
          break

        case 10:
          a = randint(0, 4)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          d = randint(1, 9, [a, b, c])
          m = choice(['centaines', 'dizaines'])
          n = calcul(a * 1000 + b * 100 + c * 10 + d)
          texte = `Combien y a-t-il de  ${m} en tout dans $${texNombre(n)}$ ? `
          if (a !== 0) {
            if (m === 'centaines') {
              texteCorr = `Comme $${a * 1000 + b * 100 + c * 10 + d}=${a * 10 + b}\\times 100+${c * 10 + d}$, il y a $${a * 10 + b}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
              reponse = a * 10 + b
            } if (m === 'dizaines') {
              texteCorr = `Comme $${a * 1000 + b * 100 + c * 10 + d}=${a * 100 + b * 10 + c}\\times 10+${d}$, il y a $${a * 100 + b * 10 + c}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
              reponse = a * 100 + b * 10 + c
            }
          } else {
            if (m === 'centaines') {
              texteCorr = `Comme  $${b * 100 + c * 10 + d}=${b}\\times 100+${c * 10 + d}$, il y a $${b}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
              reponse = b
            } if (m === 'dizaines') {
              texteCorr = `Comme $${b * 100 + c * 10 + d}=${b * 10 + c}\\times 10+${d}$, il y a $${b * 10 + c}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
              reponse = b * 10 + c
            }
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 11:

          a = randint(1, 2) + randint(3, 7) / 10
          k = randint(4, 6)
          reponse = a * k
          texte = `$${texNombre(a)}\\times ${k}=$`

          texteCorr = `$${texNombre(a)}\\times ${k}=${texNombre(a * k)}$ `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 12:
          a = randint(1, 9)
          b = randint(1, 9)
          truc = choice([10, 100])
          reponse = a - b / truc
          texte = `Donne l'écriture décimale de $${a}-\\dfrac{${b}}{${truc}}$.`

          texteCorr = `$${a}-\\dfrac{${b}}{${truc}}=${a}-${texNombre(b / truc)}=${texNombre(a - b / truc)}$ `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 13:

          a = randint(1, 9) + randint(1, 9) / 10
          reponse = 10 - a
          texte = `Complète :<br>$${texNombre(a)}+\\ldots=10$`

          texteCorr = `Le nombre cherché est donné par la différence : $10-${texNombre(a)}=${texNombre(10 - a)}$. `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 14:

          a = randint(3, 10)
          b = randint(a + 1, 20)
          reponse = b - a
          texte = `À midi, j'ai gagné $${a}$ cartes.<br>
            J'en ai maintenant $${b}$.<br>
            J'avais $\\ldots$ cartes ce matin.`

          texteCorr = `J'avais $${b}-${a}$ cartes ce matin, soit $${b - a}$ cartes.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 15:
          a = choice(listeFractions15)
          b = fraction(a[0], a[1])

          texte = `Quelle est la mesure de ce segment ?<br>
          `

          texteCorr = `L'unité est divisée en $${b.d}$. La mesure du segment est donc : $\\dfrac{${b.n}}{${b.d}}$ unité.`

          reponse = fraction(b.n, b.d).simplifie()
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'unité' } else { texte += '$\\ldots$ unité' }
          nbChamps = 1
          break

        case 16:
          if (choice([true, false])) {
          a = randint(3,6)+randint(2,9)/10
          b = randint(7,9)+randint(2,9)/10

          propositions = shuffle([`$${Math.floor(a*b)}$`, `$${Math.floor(a+b)}$`, `$${Math.floor(a*b*10)}$`])
          reponse = Math.floor(a*b)
          texte = `Recopie  le nombre le plus proche de  $${texNombre(a)}\\times ${texNombre(b)}$.<br>`

          texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
          texteCorr = `En remplaçant $${texNombre(a)}$ par $${Math.round(a)}$ et $${texNombre(b)}$ par $${Math.round(b)}$, on obtient : <br>
          $${Math.round(a)}\\times ${Math.round(b)}=${Math.round(a)*Math.round(b)}$, donc le nombre le plus proche est : $${Math.floor(a*b)}$.`
          }
          else{ a = randint(12,19)+randint(2,9)/10
          b = randint(15,29,20)+randint(2,9)/10

          propositions = shuffle([`$${Math.floor(a*b)}$`, `$${Math.floor(a+b)}$`, `$${Math.floor(a*b*10)}$`])
          reponse = Math.floor(a*b)
          texte = `Recopie  le nombre le plus proche de  $${texNombre(a)}\\times ${texNombre(b)}$.<br>`

          texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
          texteCorr = `Le produit de ces deux nombres donne un nombre a trois chiffres.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 17:
          a = randint(5, 99) / 10
          b = calcul(randint(2, 9) * 5)
          c = 100 - b
          texte = `$${b}\\times${texNombre(a)} + ${texNombre(a)}\\times${c}=$
      `
          texteCorr = ` On factorise : <br>     $\\begin{aligned}
      ${texNombre(b)}\\times${texNombre(a)} + ${texNombre(a)}\\times${c}&=${texNombre(a)}\\times \\underbrace{(${texNombre(b)}+${texNombre(c)})}_{=100}\\\\
      &=${texNombre(a)}\\times 100\\\\
      &=${texNombre(100 * a)}
      \\end{aligned}$`
          reponse = 100 * a
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 18:

          a = randint(1, 6)
          b = randint(3, 5)
          c = randint(2, 9)
          d = randint(1, 10)
          texte = `Dans un repère du plan, on donne $A(${a};${c})$ et $B(${b};${d})$.<br>
        Déterminer les coordonnées du milieu du segment  $[AB]$.`
          texteCorr = `Les coordonnées du milieu sont  données par :
        $\\left(\\dfrac{${a}+${b}}{2};\\dfrac{${c}+${d}}{2}\\right)=
        \\left(\\dfrac{${texNombre(a + b)}}{2};\\dfrac{${texNombre(c + d)}}{2}\\right)=
        (${texNombre((a + b) / 2)};${texNombre((c + d) / 2)})$.`
          if (this.interactif) {
            setReponse(this, index, fraction(a + b, 2), { formatInteractif: 'fractionEgale' })
            texte += '<br>$\\Bigg($'
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(3) + ';' })
            setReponse(this, index + 1, fraction(c + d, 2), { formatInteractif: 'fractionEgale' })
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline')
            texte += '$\\Bigg)$'
          }
          nbChamps = 2

          break

        case 19:
          a = randint(3, 9)// CB
          k = randint(2, 5)// coeff
          b = k * a// AC
          c = randint(1, a - 1)// EB
          d = k * c// AD
          A = point(0, 4, 'A', 'above')
          D = point(3.75, 4, 'D', 'above')
          E = point(4, -1, 'E', 'below')
          B = point(6, -1, 'B', 'below')
          C = point(3.91, 0.74, 'C', 'left')
          xmin = -1
          ymin = -2.5
          xmax = 7
          ymax = 4.7
          objets = []
          objets.push(
            texteParPosition(`$${d} \\text{ cm}$`, milieu(A, D).x, milieu(A, D).y + 0.3, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('$\\large \\text{?}$', milieu(B, E).x, milieu(B, E).y - 0.3, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${b} \\text{ cm}$`, milieu(A, C).x - 0.5, milieu(A, C).y, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${a} \\text{ cm}$`, milieu(C, B).x + 0.3, milieu(C, B).y + 0.2, 'milieu', 'black', 1, 'middle', true),
            labelPoint(A, B, C, D, E), segment(B, E), segment(D, E), segment(A, D), segment(A, B))
          reponse = c
          texte = `$(AD)//(EB)$.<br>
           $A$, $C$ et $B$ sont alignés <br>
           $D$, $C$ et $E$ sont alignés.<br>
           <br>`
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.8, style: 'margin: auto' }, objets)
          texteCorr = `Le triangle $ACD$ est un agrandissement du triangle $EBC$. Le coefficient d'agrandissement est donné par : $\\dfrac{${b}}{${a}}=${k}$.<br>
          On obtient donc la longueur $EB$ en divisant par $${k}$ la longueur $AD$.<br>
          $EB=\\dfrac{${d}}{${k}}=${c}$ cm.<br>`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '<br>$EB=$'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
          } else { texte += ' $EB=\\ldots$ cm' }

          nbChamps = 1
          break

        case 20:
          choix = choice(['a', 'b'])
          if (choix === 'a') {
            a = randint(18, 25) * 10
            b = choice([20, 25])
            reponse = a * 100 / b
            texte = `$${b} \\%$ des élèves d'un lycée sont externes. <br>
          Il y a $${a}$ externes. Combien y a-t-il d'élèves dans ce lycée ?
      `
            texteCorr = ` Comme $100 \\%$ est égal à $${100 / b}$ fois $${b} \\%$, alors le nombre d'élèves dans ce lycée est : $${a}\\times ${100 / b}=${reponse}$.`
          }
          if (choix === 'b') {
            a = randint(8, 15) * 10
            b = 10
            reponse = a * 10
            texte = `$${b} \\%$ des élèves d'un lycée sont externes. <br>
            Il y a $${a}$ externes. Combien y a-t-il d'élèves dans ce lycée ?
        `
            texteCorr = ` Comme $100 \\%$ est égal à $${100 / b}$ fois $${b} \\%$, alors le nombre d'élèves dans ce lycée est : $${a}\\times ${100 / b}=${reponse}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 21:
          choix = choice(['a', 'b'])
          if (choix === 'a') {
            a = randint(2, 10)
            b = randint(2, 10)
            reponse = [printlatex(`(${a}*x-${b})*(${a}*x+${b})`), printlatex(`(${a}*x+${b})*(${a}*x-${b})`)]

            texte = `Factoriser $${a ** 2}x^2-${b ** 2}$.
      `
            texteCorr = ` On reconnaît une différence de deux carrés : $a^2-b^2$ avec $a=${a}x$ et $b=${b}$.<br>
            Comme $a^2-b^2=(a-b)(a+b)$, alors $${a ** 2}x^2-${b ** 2}=(${a}x-${b})(${a}x+${b})$.`
          }
          if (choix === 'b') {
            a = randint(2, 10)
            b = randint(2, 10)
            reponse = [printlatex(`(${b}-${a}*x)*(${b}+${a}*x)`), printlatex(`(${b}+${a}*x)*(${b}-${a}*x)`)]

            texte = `Factoriser $${b ** 2}-${a ** 2}x^2$.
      `
            texteCorr = ` On reconnaît une différence de deux carrés : $a^2-b^2$ avec $a=${b}$ et $b=${a}x$.<br>
            Comme $a^2-b^2=(a-b)(a+b)$, alors  $${b ** 2}-${a ** 2}x^2=(${b}-${a}x)(${b}+${a}x)$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 22:
          a = randint(5, 6)
          b = randint(6, 10)
          if (choice([true, false])) {
            texte = 'Soit le script Python suivant :<br>$\\begin{array}{|l|}\n'
            texte += '\\hline\n'
            texte += '\\\n \\texttt{def calcul(a,b) :}  \\\n '
            texte += `\\\\\n ${sp(6)} \\texttt{if a!=6 or b>8 :}\\\n `
            texte += `\\\\\n ${sp(12)} \\texttt{b = a+b}\\\n `
            texte += `\\\\\n ${sp(6)} \\texttt{else :}\\\n `
            texte += `\\\\\n ${sp(12)} \\texttt{b = a-b}\\\n `
            texte += `\\\\\n ${sp(6)} \\texttt{return b}\\\\\n `
            texte += '\\hline\n'
            texte += '\\end{array}\n$'
            texte += `<br> Que renvoie l'instruction $\\texttt{calcul(${a},${b})}$ ?`
            if (a !== 6 || b > 8) {
              texteCorr = `Si $a$ est différent de $6$ ou $b>8$, le script renvoie la somme de $a$ et de $b$, sinon il renvoie la différence.<br>
          Dans ce cas, il renvoie la somme : $${a}+${b}=${a + b}$.`
              reponse = a + b
            } else {
              texteCorr = `Si $a$ est différent de $6$ ou $b>8$, le script renvoie la somme de $a$ et de $b$, sinon il renvoie la différence.<br>
              Dans ce cas, il renvoie la différence : $${a}-${b}=${a - b}$.`
              reponse = a - b
            }
          } else {
            texte = 'Soit le script Python suivant :<br>$\\begin{array}{|l|}\n'
            texte += '\\hline\n'
            texte += '\\\n \\texttt{def calcul(a,b) :}  \\\n '
            texte += `\\\\\n ${sp(6)} \\texttt{if a!=6 or b<8 :}\\\n `
            texte += `\\\\\n ${sp(12)} \\texttt{b = a+b}\\\n `
            texte += `\\\\\n ${sp(6)} \\texttt{else :}\\\n `
            texte += `\\\\\n ${sp(12)} \\texttt{b = a-b}\\\n `
            texte += `\\\\\n ${sp(6)} \\texttt{return b}\\\\\n `
            texte += '\\hline\n'
            texte += '\\end{array}\n$'
            texte += `<br> Que renvoie l'instruction $\\texttt{calcul(${a},${b})}$ ?`
            if (a !== 6 || b < 8) {
              texteCorr = `Si $a$ est différent de $6$ ou $b<8$, le script renvoie la somme de $a$ et de $b$, sinon il renvoie la différence.<br>
              Dans ce cas, il renvoie la somme : $${a}+${b}=${a + b}$.`
              reponse = a + b
            } else {
              texteCorr = `Si $a$ est différent de $6$ ou $b<8$, le script renvoie la somme de $a$ et de $b$, sinon il renvoie la différence.<br>
                  Dans ce cas, il renvoie la différence : $${a}-${b}=${a - b}$.`
              reponse = a - b
            }
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 23:
          a = randint(1, 9)
          b = randint(1, 9)
          k = randint(1, 4)
          c = a + k
          d = b + randint(2, 4) * k
          texte = `Dans un repère du plan, on considère les points $A(${a};${b})$ et $B(${c};${d})$.<br>
          Calculer le coefficient directeur de $(AB)$.
      `
          texteCorr = ` Le coefficient directeur de la droite $(AB)$ est donné par :<br>
           $\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{${d}-${b}}{${c}-${a}}=${(d - b) / (c - a)}$.
          `
          reponse = fraction(d - b, c - a)
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 24:
          a = randint(2, 10)

          reponse = 4 * a
          texte = `Déterminer le périmètre d'un carré d'aire $${a ** 2}$ cm$^2$.
      `
          texteCorr = `Si l'aire du carré est $${a ** 2}$ cm$^2$, la longueur de son côté est $\\sqrt{${a ** 2}}=${a}$ cm. <br>
          On en déduit que le périmètre du carré est $4\\times ${a}=${4 * a}$ cm. `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' }
          nbChamps = 1
          break

        case 25:
          a = randint(2, 10)
          b = randint(2, 10)
          reponse = fraction(a, a + b)
          texte = `On tire une boule dans une urne contenant $${a}$ boules rouges et $${b}$ boules vertes.<br>
          Quelle est la probabilité de tirer une boule rouge ?
      `
          texteCorr = `Il y a $${b}$ boules rouges sur un total de $${a + b}$ boules. <br>
          La probabilité de tirer une boule rouge est donc : $\\dfrac{${a}}{${a + b}}${simplificationDeFractionAvecEtapes(a, a + b)}$`

          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 26:
          choix = choice(['a', 'b', 'c'])
          if (choix === 'a') {
            a = choice([40, 60, 80, 100, 120])
            reponse = a / 4
            texte = `Une voiture roule à la vitesse moyenne de $${a}$ km/h.<br>
            Combien de kilomètres a-t-elle parcourus en $15$ minutes ?
        `
            texteCorr = `Dans une heure, il y a $4\\times 15$ minutes. <br>Ainsi en $15$ minutes, la voiture aura parcouru $${a}\\div 4=${a / 4}$ km.<br>
            `
          }

          if (choix === 'b') {
            a = choice([60, 90, 120])
            reponse = a / 6
            texte = `Une voiture roule à la vitesse moyenne de $${a}$ km/h.<br>
                          Combien de kilomètres a-t-elle parcourus en $10$ minutes ?
                      `
            texteCorr = `Dans une heure, il y a $6\\times 10$ minutes. <br>Ainsi en $10$ minutes, la voiture aura parcouru $${a}\\div 6=${a / 6}$ km.
                          `
          }

          if (choix === 'c') {
            a = choice([30, 60, 90, 120])
            reponse = a / 3
            texte = `Une voiture roule à la vitesse moyenne de $${a}$ km/h.<br>
                                        Combien de kilomètres a-t-elle parcourus en $20$ minutes ?
                                    `
            texteCorr = `Dans une heure, il y a $3\\times 20$ minutes. <br>Ainsi en $20$ minutes, la voiture aura parcouru $${a}\\div 3=${a / 3}$ km.
                                        `
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km' }
          nbChamps = 1
          break
        case 27:
          a = randint(1, 10)

          A = point(0, 0, 'A', 'below')
          B = point(4, 0, 'B', 'below')
          C = point(4, 4, 'C', 'above')
          D = point(0, 4, 'D', 'above')
          code1 = codeSegment(A, B, '|')
          code2 = codeSegment(B, C, '|')
          code3 = codeSegment(C, D, '|')
          code4 = codeSegment(A, D, '|')
          xmin = -1
          ymin = -1
          xmax = 5
          ymax = 5
          objets = []
          objets.push(
            texteParPosition(`$${a} \\text{ cm}$`, milieu(A, B).x, milieu(A, B).y - 0.4, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('$\\large \\text{?}$', milieu(D, B).x + 0.2, milieu(D, B).y + 0.1, 'milieu', 'black', 1, 'middle', true),
            labelPoint(A, B, C, D), segment(A, B), segment(B, C), segment(C, D), segment(D, A), segment(B, D), code1, code2, code3, code4)
          reponse = [`\\sqrt{${2 * a ** 2}}`, `${Math.sqrt(2 * a ** 2)}`, `${a}\\sqrt{2}`]
          texte = `Compléter : <br>
            `
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.8, style: 'margin: auto' }, objets)
          texteCorr = `Le théorème de Pythagore dans le triangle rectangle $ADB$ donne : <br>
            $DB^2=AD^2+AB^2$ soit $DB^2=${a}^2+${a}^2=2\\times ${a}^2=${2 * a ** 2}$.<br>
            Ainsi, $DB=\\sqrt{${2 * a ** 2}}$ ou encore $DB=${a}\\sqrt{2}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '<br>$DB=$'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
          } else { texte += ' $DB=\\ldots$ cm' }

          nbChamps = 1
          break

        case 28:
          a = choice([1, 2, 3, 4, 10])
          reponse = a ** 3 / 100
          texte = `La masse volumique d'un solide  est de $10$ g/cm$^3$.<br>
          Combien pèse (en kg) ce solide qui a la forme d'un cube  d'arête $${a}$ cm  ?
      `
          texteCorr = `Le volume du cube est $${a}^3=${a ** 3}$ cm$^3$.<br>
          Sa masse  est donc donnée par $${a ** 3}\\times 10=${10 * a ** 3}$ g soit $${texNombre(a ** 3 / 100)}$ kg.

          `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'kg' }
          nbChamps = 1
          break

        case 29:
          a = randint(-1, 6)
          b = randint(1, 4) + randint(1, 9) / 10

          r = repere2({ xMin: -4, xMax: 4, yMin: -3, yMax: 8, xUnite: 2, yUnite: 1 })
          // courbe2(x => a * x + b, { repere: repere, color: 'blue' })
          f = x => 0.5 * x ** 3 + b
          C = courbe2(f, { repere: r, color: 'red' })

          reponse = [Math.cbrt(2 * (a - b)) - 0.1, Math.cbrt(2 * (a - b)) + 0.1]
          texte = `Voici la courbe d'une fonction $f$. <br>
Donner une valeur approchée de l'antécédent de $${a}$ par $f$ ?<br>`
          texte += mathalea2d({ xmin: -8, xmax: 8.2, ymin: -3, ymax: 8, scale: 0.5 }, r, C)
          texteCorr = `L'antécédent de $${a}$ par $f$ est l'abscisse du point de la courbe d'ordonnée $${a}$ : $${texNombre(Math.cbrt(2 * (a - b)), 1)}$ en est une valeur approchée. `

          setReponse(this, index, reponse, { formatInteractif: 'intervalle' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 30:
          c = choice([2, 3, 11, 12])
          p = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
          choix = choice(['a', 'b', 'b'])
          if (choix === 'a') {
            texte = "On lance deux fois de suite un dé équilibré.<br>Quelle est la probabilité d’obtenir deux fois le même nombre ?<br>Donner le résultat sous la forme d'une fraction irréductible."
            texteCorr = "Sur $36$ cas possibles équiprobables, il y en a $6$ qui sont des doubles. Donc la probabilité d'obtenir deux fois le même nombre est $\\dfrac{6}{36}=\\dfrac{1}{6}$."
            reponse = fraction(1, 6)
          }
          if (choix === 'b') {
            texte = `On lance deux dés cubiques équilibrés.<br>Quelle est la probabilité d’obtenir un total de $${c}$ ?<br>Donner le résultat sous la forme d'une fraction irréductible.`
            texteCorr = `Sur $36$ cas possibles équiprobables, il y en a $${p[c - 2]}$ qui donnent une somme de $${c}$. Donc la probabilité d'obtenir un total de $${c}$ est $\\dfrac{${p[c - 2]}}{36}${simplificationDeFractionAvecEtapes(p[c - 2], 36)}$.`
            reponse = texFractionReduite(p[c - 2], 36)
          }
          setReponse(this, index, reponse, { formatInteractif: 'fraction' })
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
