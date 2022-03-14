import Exercice from '../Exercice.js'
import { fraction } from '../../modules/fractions.js'
import {
  mathalea2d, point, polygoneAvecNom, droiteGraduee2, segmentAvecExtremites, segment, milieu, texteParPosition
} from '../../modules/2d.js'
import { listeQuestionsToContenu, randint, texNombrec, miseEnEvidence, shuffle, range1, combinaisonListesSansChangerOrdre, prenomF, choice, arrondi, calcul, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'CAN 6ième 30 questions sujet 2018'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '13/03/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/
export default function SujetCAN20186ieme () {
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
    let questions = []
    if (!this.sup) {
      // Si aucune question n'est sélectionnée
      questions = combinaisonListesSansChangerOrdre(range1(30), this.nbQuestions)
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
    const typeQuestionsDisponibles = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']//
    const listeFractions1 = [[5, 3], [7, 3], [10, 3], [11, 3], [17, 3],
      [13, 6], [17, 6], [23, 6], [8, 7], [15, 7], [20, 7],
      [14, 3], [22, 3], [25, 3]]
    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, fraction1 = [], propositions, choix, truc, chiffre, chiffre2, a, b, c, d, m, n, k, j, A, B, C, D, E, F, G, H, pol, n1, d1, pol2, l, L, l2, prenom1, xmin, xmax, ymin, ymax, objets, fleurs, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[listeIndex[i]]) {
        case '1':
          a = randint(4, 8)
          b = randint(4, 9)
          texte = `$${a} \\times ${b}=$`
          texteCorr = `$${a} \\times ${b}=${a * b}$`
          reponse = a * b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case '2':
          a = randint(21, 29)
          b = randint(11, 19)

          reponse = a + b
          texte = `$${a} + ${b}=$`
          texteCorr = `$${a}+${b}=${a + b}$`
          reponse = a + b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '3':

          a = randint(0, 3)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          d = randint(1, 9, [a, b, c])
          m = choice(['centaines', 'dizaines'])
          n = calcul(a * 1000 + b * 100 + c * 10 + d)
          texte = `Quel est le nombre entier de ${m} dans $${texNombrec(n)}$ ? `
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

        case '4':

          a = calcul(randint(1, 3) * 100 + randint(1, 10))
          b = choice([11, 12, 13])
          texte = `$${a}-${b}=$ `
          texteCorr = `$${a}-${b}=${a - b}$. `
          reponse = calcul(a - b)

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '5':
          a = randint(2, 9)
          b = randint(4, 10)
          c = a * b
          if (choice([true, false])) {
            texte = `Compléter : <br>$${a}\\times .... =${c}$`
            texteCorr = `$${a}\\times ${miseEnEvidence(b)} =${c}$`
          } else {
            texte = `Compléter :<br> $ .... \\times ${a}=${c}$`
            texteCorr = `$ ${miseEnEvidence(b)} \\times ${a}=${c}$`
          }
          reponse = b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case '6':
          a = randint(2, 5)
          b = choice([10, 15, 20, 25, 30, 35, 40])
          reponse = calcul(b + 15)
          texte = `Ajouter un quart d'heure à $${a}$ h $${b}$ min`

          texteCorr = `Un quart d'heure est égal à $15$ minutes. Ainsi $${a}$ h $${b}$ min + $15$ min est égal à $${a}$ h $${b + 15}$ min.`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, a, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
            texteCorr = `$${texNombrec(a + b)}$h$ = ${a}$ h $ + ${texNombrec(b)} \\times 60$ min $  = ${a}$ h $${d}$ min`
            setReponse(this, index + 1, reponse, { formatInteractif: 'calcul' })
          }
          nbChamps = 2

          break

        case '7':
          a = calcul(randint(13, 35) * 2)

          reponse = calcul(a / 2)
          texte = `La moitié de $${a}$ est égale à :`

          texteCorr = `La moitié de $${a}$ est égale à $${a}\\div 2=${texNombrec(a / 2)}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '8':
          a = randint(3, 6)
          b = choice([1, a - 1])
          reponse = fraction(b, a)// .simplifie()
          texte = 'Quelle est la fraction repérée par le point d’interrogation ?<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 11, ymax: 1.5, scale: 1, style: 'margin: auto' }, droiteGraduee2({
            Unite: 8,
            Min: 0,
            Max: 1.1,
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
          texteCorr = `L'unité est divisée en $${a}$. Ainsi, le point d'interrogation est   $\\dfrac{${b}}{${a}}$.`
          setReponse(this, index, reponse, { formatInteractif: 'fraction' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '9':
          a = randint(11, 15)
          b = calcul(randint(2, 5) * 10)
          k = randint(2, 3)
          truc = choice(['vis', 'boulons'])
          reponse = calcul(k * b)
          texte = `$${a}$ ${truc} pèsent $${b}$ g.<br>
           `

          texteCorr = `Si $${a}$ ${truc} pèsent $${b}$ g, alors $${k}\\times ${a}=${k * a}$ ${truc} pèsent $${k * b}$ g. `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += `$${a * k}$ ${truc} pèsent ` + ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' g' } else { texte += `$${a * k}$ ${truc} pèsent ....... g` }
          nbChamps = 1
          break

        case '10':
          a = calcul(randint(2, 4) * 12)
          k = choice([3, 4, 6])
          reponse = calcul(a / k)
          texte = `$${a}\\div ${k}=$`

          texteCorr = `$${a}\\div ${k}=${a / k}$ car $${k}\\times ${a / k}=${a}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case '11':
          a = randint(2, 9)
          b = randint(2, 9)
          texte = `Donner l'écriture décimale de $(${a}\\times 10)+\\left(${b}\\times \\dfrac{1}{100}\\right)$`
          texteCorr = `$(${a}\\times 10)+\\left(${b}\\times \\dfrac{1}{100}\\right)=${10 * a}+${b}\\times 0,01=${10 * a}+${texNombrec(b / 100)}=${texNombrec(10 * a + b / 100)}$`
          reponse = arrondi(10 * a + b / 100, 2)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case '12':
          a = randint(3, 9)
          b = randint(11, 29, 20)
          reponse = a * 10 + b
          texte = `$${a}$ dizaines $${b}$ unités $=$`

          texteCorr = `$${a}$ dizaines $${b}$ unités $=${texNombrec(a * 10)}+${b}=${texNombrec(a * 10 + b)}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '13':
          a = choice([1, 2, 3, 4, 6, 7, 8, 9]) // numérateur
          reponse = calcul(a / 5)
          texte = 'Determiner l\'abscisse du point A  :<br> On donnera le résultat sous  forme décimale.<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, droiteGraduee2({
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
          texteCorr = `L'unité est divisée en $5$. Ainsi, l'abscisse du point A est $\\dfrac{${a}}{5}=${texNombrec(reponse)}$`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '14':
          a = choice([4, 8, 12, 16])
          b = choice([0.5, 0.25])
          reponse = calcul(a * b)
          texte = `$${a}\\times ${texNombrec(b)}=$`
          if (b === 0.5) {
            texteCorr = `Multiplier par $0,5$ revient à multiplier par $\\dfrac{1}{2}$, c'est-à-dire diviser par $2$. <br>
                                Ainsi : $${a}\\times ${texNombrec(b)}=${a}\\div 2=${texNombrec(a / 2)}$.`
          }
          if (b === 0.25) {
            texteCorr = `Multiplier par $0,25$ revient à multiplier par $\\dfrac{1}{4}$, c'est-à-dire diviser par $4$. <br>
                                Ainsi : $${a}\\times ${texNombrec(b)}=${a}\\div 4=${texNombrec(a / 4)}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '15':
          fleurs = choice(['roses', 'tulipes', 'pâquerettes', 'mufliers'])
          k = randint(3, 7)

          b = calcul(randint(2, 5) * 10)
          a = calcul(b * k)

          reponse = a / b
          texte = `Avec $${a}$ ${fleurs}, un fleuriste fait $${b}$ bouquets identiques.<br>
          Combien y a-t-il de ${fleurs} dans chaque bouquet ?`
          texteCorr = `Le nombre de bouquets est donné par la division de  $${a}$ par $${b}$.<br>
          On a $${a}\\div ${b}=${k}$. Ainsi, le fleuriste pourra faire $${k}$ bouquets identiques.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '16':
          a = choice(['du quart', 'du cinquième', 'des trois quarts', 'de la moitié'])
          texte = `L'écriture décimale ${a} de $1$ est :`
          if (a === 'du quart') {
            reponse = 0.25
            texteCorr = `Le quart de $1$ est égal à $${1}\\div 4=0,25$.`
          }
          if (a === 'du cinquième') {
            reponse = 0.2
            texteCorr = `Le cinquième de $1$ est égal à $${1}\\div 5=0,2$.`
          }
          if (a === 'des trois quarts') {
            reponse = 0.75
            texteCorr = `Les trois quarts de  $1$ valent :  $${1}\\times\\dfrac{3}{4}=3\\times \\dfrac{1}{4}=3\\times 0,25=0,75$.`
          }
          if (a === 'de la moitié') {
            reponse = 0.5
            texteCorr = `La moitié de $1$ est égale à $${1}\\div 2=0,5$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case '17':
          truc = [['dixièmes', 0.1], ['centièmes', 0.01], ['millièmes', 0.001]]
          a = choice([10, 100, 1000])
          b = randint(1, 9)
          c = choice([0, 2])

          reponse = a * b * truc[c][1]
          texte = `Quel est le nombre $${a}$ fois plus grand que $${b}$ ${truc[c][0]} ?`
          texteCorr = `Le nombre $${a}$ fois plus grand que $${b}$ ${truc[c][0]} est $${a}\\times ${b}\\times ${texNombrec(truc[c][1])}=${texNombrec(a * b * truc[c][1])}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '18':
          j = randint(3, 8)
          A = point(0, 0)
          B = point(j, 0)
          C = point(j, 1.5)
          D = point(0, 1.5)
          xmin = -1.5
          ymin = -1
          xmax = j + 1
          ymax = 2.7
          pol = polygoneAvecNom(A, B, C, D)

          // segment((i + 1) * 2, -0.1, (i + 1) * 2, 0.1)
          objets = []
          objets.push(pol[0]) //, pol[1]
          for (let indice = 0; indice < j; indice++) {
            objets.push(segment(indice, 0, indice, 1.5))
          }
          objets.push(segmentAvecExtremites(-0.3, 0, -0.3, 1.5), segmentAvecExtremites(0, 1.8, j, 1.8))
          objets.push(texteParPosition(`$${texNombrec(j)} \\text{cm}$`, j / 2, 2, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('$1,5\\text{cm}$', -1, 0.75, 'milieu', 'black', 1, 'middle', true),
            segment(0, 0.5, j, 0.5)
          )
          reponse = calcul(j * 1.5)
          texte = 'Quelle est l\'aire du rectangle ?<br>'
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)

          texteCorr = `Le rectangle est constitué de  $${j}$ carrés d'aire $1$ cm$^2$ et de $${j}$ rectangles d'aire $0,5$ cm$^2$.<br>
            Son aire totale est donc :  $1\\times ${j}+0,5\\times ${j}=${reponse}$ cm$^2$.
            `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' cm$^2$' }
          nbChamps = 1
          break

        case '19':
          a = calcul((2 * randint(3, 12) + 1) / 2)

          reponse = calcul(a * 2)
          texte = `Le double de $${texNombrec(a)}$ est égal à :`

          texteCorr = `Le double de $${texNombrec(a)}$ est égal à : $${texNombrec(a)}\\times 2=${texNombrec(a * 2)}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '20':
          fraction1 = choice(listeFractions1)
          n1 = fraction1[0]
          d1 = fraction1[1]
          a = Math.floor(n1 / d1)

          texte = 'Encadre la fraction par deux entiers consécutifs :<br>'

          texteCorr = `$${a} < \\dfrac{${n1}}{${d1}} < ${a + 1}$`
          texteCorr += `$\\quad$  car $\\quad ${a}=\\dfrac{${a * d1}}{${d1}}\\quad$ et $\\quad${a + 1}=\\dfrac{${(a + 1) * d1}}{${d1}}$ `

          if (this.interactif) {
            setReponse(this, index, a, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + ` $< \\dfrac{${n1}}{${d1}} <$` })
            setReponse(this, index + 1, a + 1, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline')
          } else { texte += `$\\ldots < \\dfrac{${n1}}{${d1}} < \\ldots$` }
          nbChamps = 2
          break

        case '21':

          a = calcul(randint(1, 4) * 12)
          if (choice([true, false])) {
            texte = `Le tiers de $${a}$ oeufs est `
            reponse = a / 3
            texteCorr = `Le tiers de $${a}$ oeufs est $${a}\\div 3=${a / 3}$ oeufs. `
          } else {
            texte = `Le quart de $${a}$ oeufs est `
            reponse = a / 4
            texteCorr = `Le quart de $${a}$ oeufs est $${a}\\div 4=${a / 4}$ oeufs. `
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' oeufs' } else { texte += ' ....  oeufs' }
          nbChamps = 1
          break

        case '22':

          a = calcul(randint(1, 4) * 120)
          if (choice([true, false])) {
            texte = `Le tiers de $${a}$ g est `
            reponse = a / 3
            texteCorr = `Le tiers de $${a}$ g est $${a}\\div 3=${a / 3}$ g. `
          } else {
            texte = `Le quart de $${a}$ g est `
            reponse = a / 4
            texteCorr = `Le quart de $${a}$ g est $${a}\\div 4=${a / 4}$ g. `
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' g' } else { texte += ' ....  g' }
          nbChamps = 1
          break

        case '23':
          chiffre = [['deux', 2], ['trois', 3], ['cinq', 5]]
          chiffre2 = [['vingt', 20], ['trente', 30], ['cinquante', 50]]
          a = randint(0, 2)
          choix = choice(['a', 'b', 'c', 'd'])
          if (choix === 'a') {
            texte = `Ecris en chiffres : <br>
              Deux-millions-${chiffre[a][0]}-cent-${chiffre[a][0]}-mille-${chiffre[a][0]} `
            reponse = calcul(2 * 1000000 + chiffre[a][1] * 100000 + chiffre[a][1] * 1000 + chiffre[a][1])
            texteCorr = `Deux-millions-${chiffre[a][0]}-cent-${chiffre[a][0]}-mille-${chiffre[a][0]} $=
            ${texNombrec(2 * 1000000)} + ${texNombrec(chiffre[a][1] * 100000)} + ${texNombrec(chiffre[a][1] * 1000)} + ${texNombrec(chiffre[a][1])}
                        =${texNombrec(2 * 1000000 + chiffre[a][1] * 100000 + chiffre[a][1] * 1000 + chiffre[a][1])}$. `

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          }

          if (choix === 'b') {
            texte = `Ecris en chiffres : <br>
              Deux-millions-${chiffre[a][0]}-mille-${chiffre[a][0]} `
            reponse = calcul(2 * 1000000 + chiffre[a][1] * 1000 + chiffre[a][1])
            texteCorr = `Deux-millions-${chiffre[a][0]}-mille-${chiffre[a][0]} $=${texNombrec(2 * 1000000)}  + ${texNombrec(chiffre[a][1] * 1000)} + ${texNombrec(chiffre[a][1])}=${texNombrec(2 * 1000000 + chiffre[a][1] * 1000 + chiffre[a][1])}$. `

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          }

          if (choix === 'c') {
            texte = `Ecris en chiffres : <br>
              Deux-millions-${chiffre2[a][0]}-mille-${chiffre[a][0]} `
            reponse = calcul(2 * 1000000 + chiffre2[a][1] * 1000 + chiffre[a][1])
            texteCorr = `Deux-millions-${chiffre2[a][0]}-mille-${chiffre[a][0]} $=${texNombrec(2 * 1000000)}  + ${texNombrec(chiffre2[a][1] * 1000)} + ${texNombrec(chiffre[a][1])}=${texNombrec(2 * 1000000 + chiffre2[a][1] * 1000 + chiffre[a][1])}$. `

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          }

          if (choix === 'd') {
            texte = `Ecris en chiffres : <br>
              Deux-millions-${chiffre[a][0]}-mille-${chiffre2[a][0]} `
            reponse = calcul(2 * 1000000 + chiffre[a][1] * 1000 + chiffre2[a][1])
            texteCorr = `Deux-millions-${chiffre[a][0]}-mille-${chiffre2[a][0]} $=${texNombrec(2 * 1000000)}  + ${texNombrec(chiffre[a][1] * 1000)} + ${texNombrec(chiffre2[a][1])}=${texNombrec(2 * 1000000 + chiffre[a][1] * 1000 + chiffre2[a][1])}$. `

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          }
          nbChamps = 1
          break

        case '24':
          a = calcul(randint(4, 9) / 10)
          k = randint(2, 5)
          reponse = a
          texte = `$${k}$ sucettes couûtent $${texNombrec(k * a)}$ €. <br>
            Combien coûte $1$ sucette ?
             `

          texteCorr = `$${k}$ sucettes couûtent $${texNombrec(k * a)}$ €, donc $1$ sucette coûte $${k}$ fois moins, c'est-à-dire :
            $${texNombrec(k * a)}\\div ${k}=${texNombrec(a)}$ €.  `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' €' }
          nbChamps = 1
          break

        case '25':
          l = randint(2, 8)
          k = randint(2, 5)
          L = k * l
          l2 = calcul(l + randint(1, 3))
          A = point(0, 0)
          B = point(4, 0)
          C = point(4, 1.5)
          D = point(0, 1.5)
          E = point(0, 2.5)
          F = point(2.5, 2.5)
          G = point(2.5, 3.5)
          H = point(0, 3.5)
          xmin = -1
          ymin = -0.5
          xmax = 5.5
          ymax = 4
          pol = polygoneAvecNom(A, B, C, D)
          pol2 = polygoneAvecNom(E, F, G, H)

          // segment((i + 1) * 2, -0.1, (i + 1) * 2, 0.1)
          objets = []
          objets.push(pol[0]) //, pol[1]
          objets.push(pol2[0])

          objets.push(texteParPosition(`$${l} \\text{cm}$`, milieu(F, G).x + 0.4, milieu(F, G).y, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${L} \\text{cm}$`, milieu(E, F).x, milieu(E, F).y - 0.2, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${l2} \\text{cm}$`, milieu(B, C).x + 0.4, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('$\\large \\textcircled{1}$', 1.4, 3.2, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('$\\large \\textcircled{2}$', 2, 0.8, 'milieu', 'black', 1, 'middle', true)
          )
          reponse = calcul(l2 * k)
          texte = 'Le rectangle $\\textcircled{2}$ est un agrandissement du rectangle $\\textcircled{1}$. <br>'

          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
          texte += '<br>Quelle est la longueur du rectangle $\\textcircled{2}$ ?'
          texteCorr = `La longueur du rectangle $\\textcircled{1}$ est $${k}$ fois plus grande que sa largeur. On en déduit que la longueur du rectangle $\\textcircled{2}$ est aussi $${k}$ fois plus grande que sa largeur.<br>
          Elle est donc égale à $${l2}\\times ${k}=${k * l2}$ cm.
                  `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' }
          nbChamps = 1
          break

        case '26':
          a = randint(2, 9)
          b = calcul(randint(1, 9) / 10)

          texte = `$${texNombrec(a + b)}$ milliers $=$ `
          texteCorr = `$${texNombrec(a + b)}$ milliers $=${texNombrec(a + b)}\\times 1000=${texNombrec((a + b) * 1000)}$`
          reponse = (a + b) * 1000

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '27':
          prenom1 = prenomF()

          b = randint(3, 5)
          a = calcul(randint(4, 9) * b)
          texte = `${prenom1} a $${a}$ billes. Elle en a $${b}$ fois plus que sa soeur.<br>
            Combien de billes sa soeur  a-t-elle ? `
          texteCorr = `Puisque ${prenom1} en  a $${b}$ fois plus, sa soeur en a $${b}$ fois moins, soit  : $${a}\\div ${b}=${a / b}$. `
          reponse = calcul(a / b)

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '28':
          a = randint(2, 9)
          texte = `Complète $${a}$ m$^3=$ `
          texteCorr = `$1$ m$^3$ est égal à $1000$ litres. Ainsi, $${a}$ m$^3=${a}\\times 1000=${texNombrec(1000 * a)}$ L.`
          reponse = a * 1000

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'L' } else { texte += '$\\ldots$ L' }
          nbChamps = 1
          break

        case '29':
          a = calcul(2 + randint(6, 9) / 10)
          b = calcul(2 + randint(1, 7) / 10 + randint(1, 9) / 100)
          c = calcul(2 + randint(0, 7) / 10 + randint(7, 9) / 100 + randint(1, 9) / 1000)
          propositions = shuffle([`$${texNombrec(a)}$`, `$${texNombrec(b)}$`, `$${texNombrec(c)}$`])
          reponse = Math.max(a, b, c)
          texte = 'Recopier  le plus grand nombre : <br>'

          texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
          texteCorr = 'Les trois nombres ont les mêmes unités, le plus grand est celui qui a le plus grand chiffre des dixièmes. S\'ils ont le même chiffre des dixièmes, le plus grand est celui qui a le plus grand chiffre des centièmes, etc...'

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '30':
          a = randint(2, 3)
          b = randint(2, 3)
          c = randint(2, 3)
          texte = `A la cantine, il y a toujours $${a}$ entrées différentes, $${b}$ plats différents et $${c}$ desserts différents.<br>
            Combien de menus (composés d'une entrée, d'un plat et d'un dessert) différents peut-on avoir dans cette cantine ?`
          texteCorr = `On peut avoir : $${a}\\times ${b}\\times ${c} =${a * b * c}$ menus diférents.`
          reponse = calcul(a * b * c)
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
