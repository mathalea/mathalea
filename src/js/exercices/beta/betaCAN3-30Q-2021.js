import Exercice from '../Exercice.js'
import { fraction, obtenirListeFractionsIrreductibles } from '../../modules/fractions.js'
import {
  mathalea2d, point, polygoneAvecNom, codageAngleDroit, labelPoint, segment, milieu, texteParPosition, demiDroite, ellipse, codeSegment, droite
} from '../../modules/2d.js'
import { listeQuestionsToContenu, randint, texNombre, printlatex, tableauColonneLigne, combinaisonListes, texFraction, miseEnEvidence, shuffle, range1, simplificationDeFractionAvecEtapes, combinaisonListesSansChangerOrdre, choice, calcul, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'CAN 3ième 30 questions sujet 2021'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '20/03/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/
export default function SujetCAN20213ieme () {
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
    const typeQuestionsDisponibles = ['25']// '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    // '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    // '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
    const listeFractions18 = [[3, 2], [1, 2], [3, 4], [1, 4], [2, 5],
      [3, 5], [4, 5]
    ]
    const listeFractions22 = [[4, 15], [3, 11], [2, 9], [5, 11], [3, 13],
      [10, 9], [4, 11], [7, 15], [2, 15], [5, 12]
    ]

    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, fraction18 = [], fraction22 = [], triplet, sCote1, sCote2, s1, s2, s3, s4, s5, s6, propositions, prix, choix, truc, a, b, c, d, e, m, n, p, k, A, B, C, D, E, F, G, pol, code1, code2, code3, code4, code5, code6, L, l2, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[listeIndex[i]]) {
        case '1':
          a = randint(4, 9)
          b = randint(4, 9)
          texte = `$${a} \\times ${b}=$ `
          texteCorr = `$${a} \\times ${b}=${a * b}$`
          reponse = a * b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case '2':
          a = calcul(randint(6, 12) * 4)
          b = calcul(randint(6, 15) * 3)
          m = choice(['quart', 'tiers'])

          if (m === 'quart') {
            texte = `Le quart de $${a}$ est :  `
            texteCorr = `Prendre le quart d'un nombre revient à le diviser par $4$.<br>
                Ainsi le quart de $${a}$ est : $${a}\\div 4 =${texNombre(a / 4)}$.`
            reponse = a / 4
          } if (m === 'tiers') {
            texte = `Le tiers de $${b}$ est :  `
            texteCorr = `Prendre le tiers d'un nombre revient à le diviser par $3$.<br>
                Ainsi le tiers de $${b}$ est : $${b}\\div 3 =${texNombre(b / 3)}$.`
            reponse = b / 3
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case '3':

          a = randint(101, 121)
          b = randint(21, 45)

          reponse = a - b
          texte = `$${a} - ${b}=$ `
          texteCorr = `$${a}-${b}=${a - b}$`
          reponse = calcul(a - b)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case '4':

          a = calcul(randint(3, 9) + randint(1, 4) / 10)
          b = calcul(randint(1, 5) / 10 + randint(2, 9) / 100)
          texte = `$${texNombre(a)}+${texNombre(b)}=$ `
          texteCorr = `$${texNombre(a)}+${texNombre(b)}=${texNombre(a + b)}$ `
          reponse = calcul(a + b)

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case '5':
          a = randint(11, 18)
          b = randint(3, 5)
          c = a * b
          if (choice([true, false])) {
            texte = `Complète : <br>$${a}\\times .... =${c}$`
            texteCorr = `$${a}\\times ${miseEnEvidence(b)} =${c}$`
          } else {
            texte = `Complète :<br> $ .... \\times ${a}=${c}$`
            texteCorr = `$ ${miseEnEvidence(b)} \\times ${a}=${c}$`
          }
          reponse = b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '6':
          a = calcul(randint(1, 9) * 10 + randint(1, 9) + 0.9 + randint(1, 9) / 100)
          b = calcul(randint(1, 9) * 10 + randint(1, 9) / 10 + 0.09 + randint(1, 9) / 1000)

          if (choice([true, false])) {
            texte = `Quel nombre obtient-on si on ajoute un dixième à $${texNombre(a)}$ ?`
            texteCorr = `$1$ dixième $=0,1$, d'où $${texNombre(a)}+0,1 =${texNombre(a + 0.1)}$`
            reponse = a + 0.1
          } else {
            texte = `Quel nombre obtient-on si on ajoute un centième à $${texNombre(b)}$ ?`
            texteCorr = `$1$ centième $=0,01$, d'où $${texNombre(b)}+0,01 =${texNombre(b + 0.01)}$`
            reponse = b + 0.01
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '7':
          a = randint(1, 9)
          b = randint(1, 9, a)

          k = calcul(a * 100 + b * 10)
          d = choice([0.1, 0.01, 0.001])
          reponse = calcul(k * d)

          if (d === 0.1) {
            texte = `$${k}\\times ${texNombre(d)}=$`
            texteCorr = `$${k}\\times ${texNombre(d)}=${texNombre(reponse)}$`
            texteCorr += `<br>
        Multiplier par $0,1$ revient à diviser par $10$. <br>
               $${k}\\times ${texNombre(d)}=${k}\\div 10=${a}${b},\\underline{0}$.<br>
                  `
          }
          if (d === 0.01) {
            texte = `$${k}\\times ${texNombre(d)}=$`
            texteCorr = `$${k}\\times ${texNombre(d)}=${texNombre(reponse)}$`
            texteCorr += `    <br>    Multiplier par $0,01$ revient à diviser par $100$. <br>
                $${k}\\times ${texNombre(d)}=${k}\\div 100=${a},${b}\\underline{0}$.<br>
                  `
          }
          if (d === 0.001) {
            texte = `$${k}\\times ${texNombre(d)}=$`
            texteCorr = `$${k}\\times ${texNombre(d)}=${texNombre(reponse)}$`
            texteCorr += `<br>
        Multiplier par $0,001$ revient à diviser par $1000$. <br>
                $${k}\\times ${texNombre(d)}=${k}\\div 1000=0,${a}${b}\\underline{0}$.<br>
                  `
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case '8':
          a = randint(2, 5)
          b = randint(2, 9)
          c = randint(2, 9)

          if (choice([true, false])) {
            reponse = calcul(a * 10000 + b * 100 + c * 10)
            texte = `$${texNombre(a)}\\times 10000 + ${texNombre(b)}\\times 100 + ${texNombre(c)}\\times 10=$`
            texteCorr = `$${texNombre(a)}\\times 10000 + ${texNombre(b)}\\times 100 + ${texNombre(c)}\\times 10 =
     ${texNombre(a * 10000)} + ${texNombre(b * 100)} + ${texNombre(c * 10)}=${texNombre(reponse)}$`
          } else {
            reponse = calcul(c * 10000 + b * 1000 + a * 10)
            texte = `$ ${texNombre(c)}\\times 10000+ ${texNombre(b)}\\times 1000 + ${texNombre(a)}\\times 10 =$`
            texteCorr = `$ ${texNombre(c)}\\times 10000+ ${texNombre(b)}\\times 1000 + ${texNombre(a)}\\times 10  =
      ${texNombre(c * 10000)}+ ${texNombre(b * 1000)} + ${texNombre(a * 10)} =${texNombre(reponse)}$`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case '9':
          a = randint(2, 6)
          prix = calcul(2 + randint(1, 3) / 10 + 0.05)
          k = randint(2, 4)
          reponse = prix * k
          texte = `$${a}$ stylos identiques coûtent  $${texNombre(prix)}$ €. <br>
            Combien coûtent $${k * a}$ de ces mêmes stylos ?
             `

          texteCorr = `$${a}$ stylos identiques coûtent  $${texNombre(prix)}$ €, donc $${k * a}$
           de ces mêmes stylos coûtent  $${k}$ fois plus, soit $${k}\\times ${prix}=${texNombre(k * prix)}$ €.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' €' }
          nbChamps = 1
          break

        case '10':

          a = randint(11, 24, 20)
          reponse = calcul(101 * a)
          texte = `$${a}\\times 101=$`
          texteCorr = `$${a}\\times 101 = ${101 * a}$<br>`

          texteCorr += `$${a}\\times 101 = ${a}\\times (100+1)=${a}\\times 100+${a}\\times 1=${a * 100}+${a}=${101 * a}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case '11':
          a = choice([15, 35, 42, 10, 14, 21, 22])

          texte = `Donne la liste des diviseurs de $${a}$.<br>`

          if (a === 15) {
            texteCorr = `Les diviseurs de $${a}$ sont : $1$, $3$, $5$ et $15$. `
            reponse = '1;3;5;15'
          }
          if (a === 35) {
            texteCorr = `Les diviseurs de $${a}$ sont : $1$, $5$, $7$ et $35$. `
            reponse = '1;5;7;35'
          }
          if (a === 42) {
            texteCorr = `Les diviseurs de $${a}$ sont : $1$, $2$, $3$, $7$ et $42$. `
            reponse = '1;2;3;7;42'
          }
          if (a === 10) {
            texteCorr = `Les diviseurs de $${a}$ sont : $1$, $2$, $5$ et $10$. `
            reponse = '1;2;5;10'
          }
          if (a === 14) {
            texteCorr = `Les diviseurs de $${a}$ sont : $1$, $2$, $7$,  et $14$. `
            reponse = '1;2;7;14'
          }
          if (a === 21) {
            texteCorr = `Les diviseurs de $${a}$ sont : $1$, $2$, $3$, $7$ et $21$. `
            reponse = '1;2;3;7;21'
          }
          if (a === 22) {
            texteCorr = `Les diviseurs de $${a}$ sont : $1$, $2$, $11$ et $22$. `
            reponse = '1;2;11;22'
          }
          setReponse(this, index, reponse, { formatInteractif: 'texte' })
          if (this.interactif) {
            texte += 'Ecrire les diviseurs dans l’ordre croissant, séparés par un point virgule'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur17')
          }
          nbChamps = 1
          break
        case '12':
          a = randint(1, 9)// longueur BE
          k = randint(2, 4)
          b = k * a // longueur DC
          c = a + 1// longueur AE
          d = k * c// longueur AD
          A = point(0, 0, 'A', 'below')
          B = point(2, -0.4, 'B', 'below')
          C = point(5, -1, 'C', 'below')
          D = point(4, 2, 'D', 'above')
          E = point(1.6, 0.8, 'E', 'above')
          xmin = -1
          ymin = -2
          xmax = 6
          ymax = 4.5
          sCote1 = segment(point(A.x - 0.3, A.y + 0.5), point(E.x - 0.2, E.y + 0.5))
          sCote2 = segment(point(A.x - 0.8, A.y + 1.3), point(D.x - 0.8, D.y + 1.3))
          sCote1.styleExtremites = '<->'
          sCote2.styleExtremites = '<->'
          objets = []
          objets.push(
            texteParPosition(`$${a} $`, milieu(B, E).x + 0.4, milieu(B, E).y, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('$\\large \\text{?}$', milieu(A, E).x - 0.4, milieu(A, E).y + 1, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${b} $`, milieu(D, C).x + 0.5, milieu(D, C).y, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${d} $`, milieu(A, D).x - 1, milieu(A, D).y + 1.8, 'milieu', 'black', 1, 'middle', true),
            demiDroite(A, C), demiDroite(A, D), labelPoint(A, B, C, D, E), segment(B, E), segment(D, C), sCote1, sCote2)
          reponse = c
          texte = '$(BE)//(DC)$.  Détermine la longueur $AE$.<br>'
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
          texteCorr = `Le triangle $ADC$ est un agrandissement du triangle $ABE$. Le coefficient d'agrandissement est donné par : $\\dfrac{${b}}{${a}}=${texNombre(b / a)}$.<br>
          On obtient donc la longueur $AE$ en divisant par $${k}$ la longueur $AD$.<br>
          $AE=\\dfrac{${d}}{${k}}=${c}$.<br>`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '<br>$AE=$'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }
          nbChamps = 1
          break

        case '13':
          a = randint(-9, -4)
          b = randint(2, 8)
          c = randint(2, 5)
          texte = `$f(x)=${a}x+${b}$<br>
          $f(${c})= $ `
          reponse = calcul(a * c + b)
          texteCorr = `$f(${c})=${a}\\times ${c}+${b}=${a * c}+${b}=${reponse}$. `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case '14':

          a = randint(1, 5)
          b = choice([0.25, 0.5, 0.75])
          d = calcul(b * 60)
          if (!this.interactif) {
            texte = `$${texNombre(a + b)}$ h $=$ ..... h..... min`
            texteCorr = `$${texNombre(a + b)}$h$ = ${a}$ h $ + ${texNombre(b)} \\times 60  = ${a}$ h $${d}$ min`
          } else {
            texte = `$${texNombre(a + b)}$ h $=$`
            texte += ajouteChampTexteMathLive(this, index, 'largeur10 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, a)
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur10 inline', { texteApres: sp(5) + 'min' })
            texteCorr = `$${texNombre(a + b)}$h$ = ${a}$ h $ + ${texNombre(b)} \\times 60$ min $  = ${a}$ h $${d}$ min`
            setReponse(this, index + 1, d)
            nbChamps = 2
          }
          break

        case '15':
          a = randint(1, 5) * 10
          p = randint(2, 9, 5) * 10
          reponse = calcul(a * p / 100)
          texte = `$${p}\\%$ de $${a}= $`
          texteCorr = ` Prendre $${p}\\%$  de $${a}$ revient à prendre $${p / 10}\\times 10\\%$  de $${a}$.<br>
          Comme $10\\%$  de $${a}$ vaut $${a / 10}$ (pour prendre $10\\%$  d'une quantité, on la divise par $10$), alors 
          $${p}\\%$ de $${a}=${p / 10}\\times ${a / 10}=${reponse}$.
         `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case '16':

          b = randint(8, 15) // longueur hauteur

          A = point(0, 0, 'A', 'below')
          B = point(-2, 0, 'B', 'below')
          C = point(2, 0, 'C', 'below')
          D = point(0, -4, 'D', 'above')
          c = ellipse(A, 2, 0.5)
          s1 = segment(D, A)
          s1.pointilles = true
          s2 = segment(A, C)
          s2.pointilles = true

          xmin = -3
          ymin = -5
          xmax = 3
          ymax = 1
          objets = []
          objets.push(
            texteParPosition('$3 \\text{ cm} $', milieu(A, C).x, milieu(A, C).y + 0.2, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${b} \\text{ cm} $`, milieu(A, D).x + 0.6, milieu(A, D).y + 0.3, 'milieu', 'black', 1, 'middle', true),
            segment(B, D), segment(D, C), s1, s2, c)
          reponse = calcul(9 * b / 3)
          texte = 'Donne le volume exact de ce cône.<br>'
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
          texteCorr = `Le volume du cône est  : $\\dfrac{1}{3}\\times \\text{(Aire de la base)}\\times \\text{Hauteur}$.<br>
          Soit : $\\dfrac{1}{3}\\times \\pi \\times 3^2\\times ${b}=${reponse}\\pi$ cm$^3$.  `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '$\\pi$cm$^3$' }
          nbChamps = 1
          break

        case '17':
          a = randint(21, 39)
          b = randint(121, 149, [130, 140])
          c = randint(61, 98, [70, 80, 90])
          d = randint(2, 5)
          e = choice([[b, 200 - b], [c, 100 - c], [d, 10 - d]])
          reponse = calcul(a * e[0] + a * e[1])
          texte = `$${a}\\times ${e[0]}+${a}\\times ${e[1]}= $ `

          texteCorr = `$${a}\\times ${e[0]}+${a}\\times ${e[1]}=${a}\\times( ${e[0]}+ ${e[1]})=${a}\\times ${e[0] + e[1]}=${reponse}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case '18':
          fraction18 = choice(listeFractions18)
          a = fraction(fraction18[0], fraction18[1])
          k = randint(3, 9)
          reponse = calcul(fraction18[0] / fraction18[1])
          texte = `Ecriture décimale de $\\dfrac{${fraction18[0] * k}}{${fraction18[1] * k}}$.`
          texteCorr = `En simpplifiant, on obtient : $\\dfrac{${fraction18[0] * k}}{${fraction18[1] * k}}=\\dfrac{${fraction18[0]}}{${fraction18[1]}}=${texNombre(reponse)}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '19':
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
              texteParPosition(`$${a[0]} \\text{ dm}$`, milieu(A, C).x, milieu(A, C).y - 0.3, 'milieu', 'black', 1, 'middle', true)
              , texteParPosition(`$${a[2]} \\text{ dm}$`, milieu(B, C).x - 0.6, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true)
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
              texteParPosition(`$${a[1]} \\text{ dm}$`, milieu(A, B).x + 0.5, milieu(A, B).y, 'milieu', 'black', 1, 'middle', true)
              , texteParPosition(`$${a[2]} \\text{ dm}$`, milieu(B, C).x - 0.6, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true)
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
              texteParPosition(`$${a[1]} \\text{ dm}$`, milieu(A, B).x + 0.4, milieu(A, B).y, 'milieu', 'black', 1, 'middle', true)
              , texteParPosition(`$${a[0]} \\text{ dm}$`, milieu(A, C).x, milieu(A, C).y - 0.3, 'milieu', 'black', 1, 'middle', true)
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
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'dm' } else { texte += '$\\ldots$ ' }
          nbChamps = 1
          break

        case '20':
          a = choice([5, 10, 20, 30, 40])
          b = randint(1, 3)
          reponse = calcul(a * 60 * b + 30 * a)
          texte = `Un véhicule se déplace à une vitesse de $${a}$ m/s.<br>
          Quelle distance parcourt-il en  $${b}$ min $30$ s ? `
          texteCorr = `En $1$ minute, il parcourt $60\\times ${a}=${60 * a}$ m et en $30$ s, $${60 * a}\\div 2=${30 * a}$.<br>
          En $${b}$ min $30$ s, il aura parcouru : $${b}\\times ${60 * a}+${30 * a}=${a * (60 * b + 30)}$ m.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'm' } else { texte += '(en m)' }
          nbChamps = 1
          break

        case '21':
          a = choice([calcul(randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9)), calcul(randint(1, 9) * 10 + randint(1, 9))])
          reponse = calcul(a / 1000)
          texte = `Complète.<br>
         $${a}$ cm$^3 = $ `
          texteCorr = `$1$ cm$^3 = 0,001 $dm$^3$ et $1$ dm$^3 = 1$ L.<br>
          $${a}$ cm$^3 = ${a}\\times 0,001=${texNombre(reponse)}$ L.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'L' } else { texte += '$\\ldots$ L ' }
          nbChamps = 1
          break

        case '22':
          k = calcul(randint(2, 5) * 10)
          fraction22 = choice(listeFractions22)
          a = fraction(fraction22[0] * k, fraction22[1] * k)

          b = fraction(fraction22[0], fraction22[1])
          texte = `Donne la fraction irréductible égale à : $${a.texFraction}$<br>
          `
          texteCorr = ` $${a.texFraction}=\\dfrac{${fraction22[0]}\\times 10\\times ${k / 10}}{${fraction22[1]}\\times 10\\times ${k / 10}}=${b.texFraction}$.
           <br>
          `

          reponse = b.simplifie()

          setReponse(this, index, reponse, { formatInteractif: 'fraction' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '23':
          choix = choice(['a', 'b', 'c', 'd'])
          if (choix === 'a') {
            b = randint(7, 12)
            a = randint(2, 5)
            A = point(0.13, 0.5)
            B = point(1, 1)
            C = point(2, 1)
            D = point(3, 2)
            E = point(3, -1)
            F = point(2, 0)
            G = point(1, 0)
            s1 = segment(A, B)
            code1 = codeSegment(A, B, '||')
            s2 = segment(B, C)
            code2 = codeSegment(B, C, '||')
            s3 = segment(A, G)
            code3 = codeSegment(A, G, '||')
            s4 = segment(G, F)
            code4 = codeSegment(G, F, '||')
            s5 = segment(C, D)
            code5 = codeSegment(C, D, '|')
            s6 = segment(E, F)
            code6 = codeSegment(E, F, '|')
            xmin = -1
            ymin = -2
            xmax = 4
            ymax = 2.5
            objets = []
            objets.push(
              texteParPosition('$x $', milieu(B, C).x, milieu(B, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${b}  $`, milieu(D, E).x + 0.3, milieu(D, E).y, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${a}  $`, milieu(D, C).x, milieu(D, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              s1, s2, s3, s4, s5, s6, code1, code2, code3, code4, code5, code6, segment(D, E))
            reponse = printlatex(`4x+${texNombre(calcul(2 * a + b))}`)
            texte = 'Exprime en fonction de $x$, le périmètre de cette figure.<br>'
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = `La figure est composée de $4$ segments de longueur $x$, de $2$ segments de longueur $${a}$ et d'un segment de longueur $${b}$.<br>
          Le périmètre de cette figure est donc : $4\\times x+2\\times ${a}+${b}=4x+${4 * a + b}$.   `
          }
          if (choix === 'b') {
            b = randint(7, 12)
            a = randint(2, 5)
            A = point(0.13, 0.5)
            B = point(1, 1)
            C = point(2, 1)
            D = point(3, 2)
            E = point(3, -1)
            F = point(2, 0)
            G = point(1, 0)
            s1 = segment(A, B)
            code1 = codeSegment(A, B, '||')
            s2 = segment(B, C)
            code2 = codeSegment(B, C, '||')
            s3 = segment(A, G)
            code3 = codeSegment(A, G, '||')
            s4 = segment(G, F)
            code4 = codeSegment(G, F, '||')
            s5 = segment(C, D)
            code5 = codeSegment(C, D, '|')
            s6 = segment(E, F)
            code6 = codeSegment(E, F, '|')
            xmin = -1
            ymin = -2
            xmax = 4
            ymax = 2.5
            objets = []
            objets.push(
              texteParPosition(`$${a} $`, milieu(B, C).x, milieu(B, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${b}  $`, milieu(D, E).x + 0.3, milieu(D, E).y, 'milieu', 'black', 1, 'middle', true),
              texteParPosition('$x$', milieu(D, C).x, milieu(D, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              s1, s2, s3, s4, s5, s6, code1, code2, code3, code4, code5, code6, segment(D, E))
            reponse = printlatex(`2x+${texNombre(calcul(4 * a + b))}`)
            texte = 'Exprime en fonction de $x$, le périmètre de cette figure.<br>'
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = `La figure est composée de $2$ segments de longueur $x$, de $4$ segments de longueur $${a}$ et d'un segment de longueur $${b}$.<br>
            Le périmètre de cette figure est donc : $2\\times x+4\\times ${a}+${b}=2x+${4 * a + b}$.   `
          }

          if (choix === 'c') {
            b = randint(7, 12)
            a = randint(2, 5)
            B = point(1, 1)
            C = point(2, 1)
            D = point(3, 2)
            E = point(3, -1)
            F = point(2, 0)
            G = point(1, 0)
            s1 = segment(B, G)
            code1 = codeSegment(B, G, '||')
            s2 = segment(B, C)
            code2 = codeSegment(B, C, '||')
            s4 = segment(G, F)
            code4 = codeSegment(G, F, '||')
            s5 = segment(C, D)
            code5 = codeSegment(C, D, '|')
            s6 = segment(E, F)
            code6 = codeSegment(E, F, '|')
            xmin = -1
            ymin = -2
            xmax = 4
            ymax = 2.5
            objets = []
            objets.push(
              texteParPosition(`$${a} $`, milieu(B, C).x, milieu(B, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${b}  $`, milieu(D, E).x + 0.3, milieu(D, E).y, 'milieu', 'black', 1, 'middle', true),
              texteParPosition('$x$', milieu(D, C).x, milieu(D, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              s1, s2, s4, s5, s6, code1, code2, code4, code5, code6, segment(D, E))
            reponse = printlatex(`2x+${texNombre(calcul(3 * a + b))}`)
            texte = 'Exprime en fonction de $x$, le périmètre de cette figure.<br>'
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = `La figure est composée de $2$ segments de longueur $x$, de $3$ segments de longueur $${a}$ et d'un segment de longueur $${b}$.<br>
              Le périmètre de cette figure est donc : $2\\times x+3\\times ${a}+${b}=2x+${3 * a + b}$.   `
          }
          if (choix === 'd') {
            b = randint(7, 12)
            a = randint(2, 5)
            B = point(1, 1)
            C = point(2, 1)
            D = point(3, 2)
            E = point(3, -1)
            F = point(2, 0)
            G = point(1, 0)
            s1 = segment(B, G)
            code1 = codeSegment(B, G, '||')
            s2 = segment(B, C)
            code2 = codeSegment(B, C, '||')
            s4 = segment(G, F)
            code4 = codeSegment(G, F, '||')
            s5 = segment(C, D)
            code5 = codeSegment(C, D, '|')
            s6 = segment(E, F)
            code6 = codeSegment(E, F, '|')
            xmin = -1
            ymin = -2
            xmax = 4
            ymax = 2.5
            objets = []
            objets.push(
              texteParPosition('$x$', milieu(B, C).x, milieu(B, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${b}  $`, milieu(D, E).x + 0.3, milieu(D, E).y, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${a}$`, milieu(D, C).x, milieu(D, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              s1, s2, s4, s5, s6, code1, code2, code4, code5, code6, segment(D, E))
            reponse = printlatex(`3x+${texNombre(calcul(2 * a + b))}`)
            texte = 'Exprime en fonction de $x$, le périmètre de cette figure.<br>'
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = `La figure est composée de $3$ segments de longueur $x$, de $2$ segments de longueur $${a}$ et d'un segment de longueur $${b}$.<br>
                Le périmètre de cette figure est donc : $3\\times x+2\\times ${a}+${b}=2x+${2 * a + b}$.   `
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '24':
          a = randint(-30, -11)
          b = randint(25, 49)

          reponse = calcul(a - b)

          texte = `Donne la solution de l'équation :<br>
          $${a}-x=${b}$`

          texteCorr = `En ajoutant $${-a}$ dans chacun des deux membres, on obtient, $-x=${b - a}$, d'où $x=${a - b}$. `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }

          nbChamps = 1
          break

        case '25':

          a = calcul(randint(2, 10) * 1000)
          b = randint(2, 5)
          reponse = calcul(a * (1 + b / 100))
          texte = ` Un capital de $${texNombre(a)}$ € rapporte $${b} \\%$  $${a}-${texNombre(b * a / 100)}$ par an.<br>
           Quelle est la valeur du capital au bout d'un an ?`
          texteCorr = `Le capital est augmenté de $${b}\\%$ de $${a}$, soit de $${texNombre(b / 100)}\\times ${texNombre(a)}=${texNombre(a * b / 100)}$.<br>
          Le capital au bout d'un an sera donc de : $${texNombre(a)}+ ${texNombre(a * b / 100)}=${texNombre(a + a * b / 100)}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '€' }
          nbChamps = 1
          break

        case '26':
          a = randint(10, 29)
          b = randint(3, 8)
          truc = randint(-8, -2)
          texte = `Une urne contient $${a}$  boules numérotées de $1$ à $${a}$. <br>
          On choisit une boule au hasard. Quelle est la probabilité d'obtenir  un nombre premier ? `
          texteCorr = `Pour $x=${truc}$, on obtient :  $${a}+${b}x=${a}+${b}\\times(${truc})=${a + b * truc}$.`
          reponse = calcul(a + b * truc)

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '27':
          a = choice([2, 3, 4, 5, 6, 10]) // nombre de secondes pour remplir un litre
          b = calcul(60 / a) // nombres de litres/min
          c = randint(2, b - 1) % 10 // volume du seau à remplir
          reponse = calcul(c * a)
          texte = `Le débit d'eau d'un robinet est de $${b}$ L/min. <br>Combien de secondes faut-il pour remplir un seau de $${c}$ L ?`
          texteCorr = `
          On commence par déterminer le temps en seconde (puisque dans la question,
             il est demandé un temps en seconde) qu'il faut pour remplir $1$ L.<br>
          Comme le débit est de  $${b}$ L 
          pour une minute soit $60$ secondes, on divise $60$ par $${b}$ pour obtenir 
          ce temps :  $\\dfrac{60}{${b}}=${a}$ s.<br>
          Puisqu'il faut $${a}$ s pour remplir un litre, il en faut $${c}$ fois plus pour remplir un seau de 
          $${c}$ L, soit $${a}\\times ${c}=${a * c}$ s.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'secondes' }
          nbChamps = 1
          break

        case '28':
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

        case '29':
          fraction1 = choice(listeFractions1)
          a = fraction(fraction1[0], fraction1[1])
          texte = `Ecriture décimale de $${a.texFraction}$. <br>`
          texteCorr = `$\\dfrac{1}{5}=0,2$, ainsi  $${a.texFraction}=${fraction1[0]}\\times\\dfrac{1}{5}=${texNombre(fraction1[0] / fraction1[1])}$`
          reponse = calcul(fraction1[0] / fraction1[1])
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case '30':
          a = calcul(randint(2, 6) * 10)
          n = choice(['pull', 'pantalon', 'tee-shirt', 'vêtement', 'blouson', 'sweat'])
          b = choice([5, 15])
          texte = `Le prix d'un ${n} est $${a}$ €. Il baisse de $${b}\\%$ . <br>
          Quel est son nouveau prix ? `

          if (b === 5) {
            texteCorr = `

       $10\\%$  de $${a}$ est égal à $${a}\\div 10=${a / 10}$.<br>
      Puisque $5\\%$  est deux fois plus petit  que $10\\%$ ,  $5\\%$  de $${a}$ est égal à $ ${a / 10}\\div 2=${a / 20}$.<br>
                   La réduction est donc de : $${texNombre(b * a / 100)}$ €.<br>
           Le nouveau prix est :   $${a}-${texNombre(b * a / 100)}= ${texNombre(a - (b * a) / 100)}$  €.

    `
          } else {
            texteCorr = `
           $10\\%$  de $${a}$ est égal à $${a}\\div 10=${a / 10}$.<br>
       $5\\%$  de $${a}$  est égal à la moitié de $10\\%$  de $${a}$, soit
      $${a / 10}\\div 2=${a / 20}$.<br>
      Puisque $15\\%$  est égal à $10\\%$  $+5\\%$ ,  $15\\%$  de $${a}$ est égal à $${a / 10}+${a / 20}=${3 * a / 20}$.<br>
                      La réduction est donc de : $${texNombre(3 * a / 20)}$ €.<br>
           Le nouveau prix est :   $${a}-${texNombre(b * a / 100)}= ${texNombre(a - (b * a) / 100)}$  €.

  `
          }
          reponse = calcul(a - (b * a) / 100)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '€' }
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
