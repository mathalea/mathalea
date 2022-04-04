import Exercice from '../Exercice.js'
import { fraction, obtenirListeFractionsIrreductibles } from '../../modules/fractions.js'
import {
  mathalea2d, point, polygoneAvecNom, codageAngleDroit, demiDroite, labelPoint, segment, milieu, texteParPosition
} from '../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, combinaisonListesSansChangerOrdre, stringNombre, range1, randint, ecritureAlgebrique, texNombre, texFractionReduite, tableauColonneLigne, combinaisonListes, texFraction, printlatex, shuffle, simplificationDeFractionAvecEtapes, choice, calcul, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import FractionEtendue from '../../modules/FractionEtendue.js'

import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

export const titre = 'CAN Seconde sujet 2021'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '31/03/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export default function SujetCAN2021Seconde () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 1
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
    const typeQuestionsDisponibles = [23]
    const listeFractions3 = [[1, 3, 1, 5], [1, 7, 1, 2], [1, 4, 1, 3], [1, 2, 1, 5], [1, 9, 1, 2], [1, 7, 1, 4],
      [1, 11, 1, 2], [1, 5, 1, 6], [1, 10, 1, 3], [1, 3, 1, 8], [1, 9, 1, 4], [1, 5, 1, 9], [1, 7, 1, 10], [1, 6, 1, 7]
    ]
    const listeFractions7 = [[1, 5, 3, 2], [2, 5, 1, 3], [1, 5, 2, 3], [1, 3, 5, 2], [1, 3, 5, 4]
    ]

    const listeFractions15 = [[5, 3], [7, 9], [3, 7], [5, 7], [9, 7], [2, 9], [4, 7], [11, 5], [11, 3]
    ]

    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, k1, k2, listeFacteurs16 = [], fraction1 = [], fraction2 = [], triplet, propositions, prix, choix, truc, a, b, c, d, e, m, n, p, k, A, B, C, D, E, pol, L, l2, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[listeIndex[i]]) {
        case 1:
          a = randint(2, 9)

          texte = `$${a} \\times 99=$ `
          texteCorr = `$${a} \\times 99=${a}\\times 100-${a}=${a * 99}$`
          reponse = a * 99
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 2:

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

        case 3:
          a = choice(listeFractions3)
          b = fraction(a[0], a[1])
          c = fraction(a[2], a[3])

          texte = `$${b.texFraction} + ${c.texFraction}=$
             `
          texteCorr = `Pour additionner des fractions, on les met au même dénominateur.<br>
  
             Ainsi, $${b.texFraction} + ${c.texFraction}
             =\\dfrac{${b.n}\\times${c.d}}{${b.d}\\times${c.d}}+ \\dfrac{${c.n}\\times${b.d}}{${b.d}\\times${c.d}}
             =\\dfrac{${b.n * c.d}+${c.n * b.d}}{${c.d * b.d}}=\\dfrac{${b.n * c.d + c.n * b.d}}{${b.d * c.d}}$.`

          reponse = fraction(b.n * c.d + c.n * b.d, b.d * c.d)
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break
        case 4:
          a = randint(1, 10)
          b = a * a

          texte = `$\\sqrt{${b}}=$
               `
          texteCorr = `$\\sqrt{${b}}$ est le nombre positif dont le carré vaut $${b}$. Comme  $${a}^2=${b}$, alors $\\sqrt{${b}}=${a}$.`

          reponse = a
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break
        case 5:
          a = randint(3, 15)
          b = choice([15, 30])

          texte = `Si l'on parcourt $${a}$ km en $${b}$ min, la vitesse moyenne est de 
             `
          if (b === 15) {
            texteCorr = `$15$ min est le quart d'une heure. Donc la vitesse moyenne est $${a}\\times 4=${4 * a}$ km/h.`

            reponse = a * 4
          } else {
            texteCorr = `$30$ min est la moitié d'une heure. Donc la vitesse moyenne est $${a}\\times 2=${2 * a}$ km/h.`

            reponse = a * 2
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km/h' } else { texte += '$\\ldots$ km/h' }
          nbChamps = 1
          break

        case 6:
          a = randint(-9, -1)
          b = randint(2, 9)
          reponse = a ** 2 + b

          texte = `Calculer $x^2+${b}$ pour $x=${a}$. 
               `
          texteCorr = `Pour $x=${a}$, $x^2+${b}=(${a})^2+${b}=${a ** 2}+${b}=${reponse}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 7:
          a = choice(listeFractions7)
          b = fraction(a[0], a[1])
          c = fraction(a[2], a[3])
          k1 = 3
          k2 = 7
          texte = `$\\dfrac{${b.n * k2}}{${b.d * k1}}\\times \\dfrac{${c.n * k1}}{${c.d * k2}}=$
             `
          reponse = fraction(b.n * c.n, b.d * c.d)
          texteCorr = `$\\dfrac{${b.n * k2}}{${b.d * k1}}\\times \\dfrac{${c.n * k1}}{${c.d * k2}}=
          \\dfrac{${b.n}\\times ${k2}}{${b.d}\\times${k1}}\\times \\dfrac{${c.n}\\times ${k1}}{${c.d}\\times ${k2}}=\\dfrac{${b.n}\\times ${k2}\\times ${c.n}\\times ${k1}}{${b.d}\\times${k1}\\times ${c.d}\\times ${k2}}=${texFractionReduite(b.n * c.n, b.d * c.d)}$`

          reponse = fraction(b.n * c.n, b.d * c.d)
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 8:
          a = randint(2, 5)
          reponse = randint(2, 9)
          c = randint(1, 9)
          b = c - a * reponse
          texte = `Résoudre : <br>$${a}x${ecritureAlgebrique(b)}=${c}$`
          texteCorr = `
             $\\begin{aligned}
             ${a}x${ecritureAlgebrique(b)}&=${c}\\\\
            ${a}x&=${c}${ecritureAlgebrique(-b)}\\\\
                                 x&=${reponse}
            \\end{aligned}$<br>
                      `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 9:
          if (choice([true, false])) {
            a = randint(2, 9)
            b = choice([-1, -2])
            texte = `Ecriture décimale de : <br>
                        $10^3+${a}\\times 10^2+10^{${b}}$`
            texteCorr = `$10^3+${a}\\times 10^2+10^${b}=1000+${a * 100}+${texNombre(10 ** b)}=${texNombre(1000 + a * 100 + 10 ** b)}$`
            reponse = 1000 + a * 100 + 10 ** b
          } else {
            a = randint(2, 9)
            b = choice([-1, -2])
            texte = `Ecriture décimale de : <br>
                         $${a}\\times 10^3+ 10^2+10^{${b}}$`
            texteCorr = `$${a}\\times10^3+ 10^2+10^${b}=${a * 1000}+100+${texNombre(10 ** b)}=${texNombre(a * 1000 + 100 + 10 ** b)}$`
            reponse = a * 1000 + 100 + 10 ** b
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 10:
          a = randint(3, 11)
          b = randint(5, 12, a)

          reponse = 30 - a - b
          texte = `La moyenne de $${a}$ ; $${b}$ et $n$ vaut $10$.<br>
         $n=$`
          texteCorr = `
        Pour avoir une moyenne de $10$, la somme des $3$ nombres doit être égale à $30$. <br>Par conséquent $n=30-${a}-${b}=${30 - a - b}$.
                   `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 11:
          choix = choice(['a', 'b', 'c'])//
          if (choix === 'a') {
            a = randint(11, 39, [10, 20, 30]) / 1000
            truc = a * 100
            reponse = `${stringNombre(truc)}\\times 10^{-2}`
            texte = `Ecriture  scientifique de $${texNombre(a)}$`

            texteCorr = `L'écriture scientifique est de la forme $a\\times 10^{n}$ avec $1\\leqslant a <10$ et $n$ un entier relatif.<br>
            Ici : $${texNombre(a)}=\\underbrace{${texNombre(truc)}}_{1\\leqslant ${texNombre(truc)} <10}\\times 10^{-2}$. `
          }
          if (choix === 'b') {
            a = randint(111, 399, [200, 300]) / 100000
            truc = a * 1000
            reponse = `${stringNombre(truc)}\\times 10^{-3}`
            texte = `Ecriture  scientifique de $${texNombre(a)}$`

            texteCorr = `L'écriture scientifique est de la forme $a\\times 10^{n}$ avec $1\\leqslant a <10$ et $n$ un entier relatif.<br>
              Ici : $${texNombre(a)}=\\underbrace{${texNombre(truc)}}_{1\\leqslant ${texNombre(truc)} <10}\\times 10^{-3}$. `
          }
          if (choix === 'c') {
            a = randint(111, 399, [200, 300]) / 1000000
            truc = a * 10000
            reponse = `${stringNombre(truc)}\\times 10^{-4}`
            texte = `Ecriture  scientifique de $${texNombre(a)}$`

            texteCorr = `L'écriture scientifique est de la forme $a\\times 10^{n}$ avec $1\\leqslant a <10$ et $n$ un entier relatif.<br>
                Ici : $${texNombre(a)}=\\underbrace{${texNombre(truc)}}_{1\\leqslant ${texNombre(truc)} <10}\\times 10^{-4}$. `
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 12:
          a = randint(3, 99, [4, 9, 16, 25, 36, 49, 64, 81])
          reponse = Math.floor(Math.sqrt(a))
          texte = `Encadrer $\\sqrt{${a}}$  par deux entiers consécutifs :<br>
      `
          texteCorr = ` On cherche le carré parfait le plus proche de $${a}$ inférieur à $${a}$.<br>
       Comme $${Math.floor(Math.sqrt(a)) ** 2}=${Math.floor(Math.sqrt(a))}^2$, alors :
     $${Math.floor(Math.sqrt(a))}< \\sqrt{${a}} < ${Math.floor(Math.sqrt(a)) + 1}$`

          if (this.interactif) {
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + ` $< \\sqrt{${a}} <$` })
            setReponse(this, index + 1, reponse + 1, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline')
          } else { texte += `$\\ldots < \\sqrt{${a}} < \\ldots$` }
          nbChamps = 2
          break

        case 13:

          a = randint(1, 5)
          b = randint(2, 5)
          if (choice([true, false])) {
            texte = `Développer $(${b}x+${a})^2$`
            texteCorr = `On utilise l'égalité remarquable $(a+b)^2=a^2+2ab+b^2$ avec $a=${b}x$ et $b=${a}$.<br>
              $(${b}x+${a})^2=(${b}x)^2+2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2+${2 * b * a}x+${a * a}$`
            reponse = [`${b * b}x^2+${2 * b * a}x+${a * a}`]
          } else {
            texte = `Développer $(${b}x-${a})^2$`
            texteCorr = `On utilise l'égalité remarquable $(a+b)^2=a^2-2ab+b^2$ avec $a=${b}x$ et $b=${a}$.<br>
              $(${b}x-${a})^2=(${b}x)^2-2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2-${2 * b * a}x+${a * a}$`
            reponse = [`${b * b}x^2-${2 * b * a}x+${a * a}`]
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 14:
          choix = choice(['a', 'b'])//, 'b', 'c'
          if (choix === 'a') {
            a = randint(11, 39, [10, 20, 30]) + randint(1, 9) / 10

            reponse = a * 1000
            texte = `$${texNombre(a)}$ m$^3=$`

            texteCorr = `$1$ m$^3 = 1000$ L, donc  $${texNombre(a)}$ m$^3=${texNombre(a)}\\times 1000$ L$=${texNombre(a * 1000)}$ L`
          }
          if (choix === 'b') {
            a = randint(11, 39, [10, 20, 30]) + randint(11, 99, [10, 20, 30, 40, 50, 60, 70, 80, 90]) / 100

            reponse = a * 1000
            texte = `$${texNombre(a)}$ m$^3=$`

            texteCorr = `$1$ m$^3 = 1000$ L, donc  $${texNombre(a)}$ m$^3=${texNombre(a)}\\times 1000$ L$=${texNombre(a * 1000)}$ L`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'm$^3$' } else { texte += '$\\ldots$ m$^3$' }
          nbChamps = 1
          break

        case 15:
          a = choice(listeFractions15)
          b = fraction(a[0], a[1])
          k1 = choice([3, 5, 7, 9])

          texte = `Ecrire $\\dfrac{${b.n * k1}}{${b.d * k1}}$ sous forme d'une fraction irréductible.
             `

          texteCorr = `$\\dfrac{${b.n * k1}}{${b.d * k1}}=\\dfrac{${b.n}\\times ${k1}}{${b.d}\\times ${k1}}=\\dfrac{${b.n}}{${b.d}}$.`

          reponse = fraction(b.n, b.d).simplifie()
          setReponse(this, index, reponse, { formatInteractif: 'fraction' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 16:

          choix = choice(['a', 'b'])
          if (choix === 'a') {
            listeFacteurs16 = [2, 3, 5, 7]
            listeFacteurs16 = shuffle(listeFacteurs16)

            reponse = [`${listeFacteurs16[0]}\\times${listeFacteurs16[1]}\\times ${listeFacteurs16[2]}`]
            texte = `Décomposer $${listeFacteurs16[0] * listeFacteurs16[1] * listeFacteurs16[2]}$ en produits de facteurs premiers.`

            texteCorr = `$${listeFacteurs16[0] * listeFacteurs16[1] * listeFacteurs16[2]}=${listeFacteurs16[0]}\\times ${listeFacteurs16[1]}\\times ${listeFacteurs16[2]}$`
          }
          if (choix === 'b') {
            listeFacteurs16 = [2, 3, 5]
            listeFacteurs16 = shuffle(listeFacteurs16)

            reponse = [`${listeFacteurs16[0]}\\times${listeFacteurs16[0]}\\times ${listeFacteurs16[1]}`,
                `${listeFacteurs16[0]}^2\\times ${listeFacteurs16[1]}`]
            texte = `Décomposer $${listeFacteurs16[0] * listeFacteurs16[0] * listeFacteurs16[1]}$ en produits de facteurs premiers.`

            texteCorr = `$${listeFacteurs16[0] * listeFacteurs16[0] * listeFacteurs16[1]}=${listeFacteurs16[0]}\\times ${listeFacteurs16[0]}\\times ${listeFacteurs16[2]}=${listeFacteurs16[0]}^2\\times ${listeFacteurs16[1]}$`
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
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
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
          ymin = -2
          xmax = 6.5
          ymax = 4.5
          objets = []
          objets.push(
            texteParPosition(`$${d} \\text{ cm}$`, milieu(A, D).x, milieu(A, D).y + 0.3, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('$\\large \\text{?}$', milieu(B, E).x, milieu(B, E).y - 0.3, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${b} \\text{ cm}$`, milieu(A, C).x - 0.5, milieu(A, C).y, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${a} \\text{ cm}$`, milieu(C, B).x + 0.6, milieu(C, B).y, 'milieu', 'black', 1, 'middle', true),
            labelPoint(A, B, C, D, E), segment(B, E), segment(D, E), segment(A, D), segment(A, B))
          reponse = c
          texte = `$(AD)//(EB)$.<br>
           $A$, $C$ et $B$ sont alignés <br>
           $D$, $C$ et $E$ sont alignés.<br>
           <br>`
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
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
          b =randint(1,9)
          k=randint(1,4)
          c = a+k
          d=b+randint(2,4)*k
          texte = `Dans un repère du plan, on considère les points $A(${a};${b})$ et $B(${c};${d})$.<br>
          Calculer le coefficient directeur de $(AB)$. 
      `
          texteCorr = ` Le coefficient directeur de la droite $(AB)$ est donné par :<br>
           $\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{${d}-${b}}{${c}-${a}}=${(d-b)/(c-a)}$.
          `
          reponse = fraction(d-b,c-a)
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
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
