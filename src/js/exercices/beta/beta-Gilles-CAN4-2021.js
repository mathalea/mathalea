import Exercice from '../Exercice.js'
import { fraction, obtenirListeFractionsIrreductibles } from '../../modules/fractions.js'
import {
  mathalea2d, point, polygoneAvecNom, codageAngleDroit, labelPoint, segment, milieu, texteParPosition
} from '../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, randint, texNombre, texFractionReduite, tableauColonneLigne, combinaisonListes, texFraction, miseEnEvidence, shuffle, simplificationDeFractionAvecEtapes, choice, calcul, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import FractionEtendue from '../../modules/FractionEtendue.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'CAN 4ième sujet 2021'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '26/03/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export default function SujetCAN20214ieme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 30
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const nbQ1 = min(round(this.nbQuestions * 8 / 30), 8) // Choisir d'un nb de questions de niveau 1 parmi les 7 possibles.
    const nbQ2 = min(this.nbQuestions - nbQ1, 22)
    const typeQuestionsDisponiblesNiv1 = shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(-nbQ1).sort(compareNombres)
    const typeQuestionsDisponiblesNiv2 = shuffle([9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30]).slice(-nbQ2).sort(compareNombres)
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))
    const listeFractions1 = [[1, 5], [2, 5], [3, 5], [4, 5], [6, 5],
      [7, 5], [8, 5], [9, 5]
    ]
    const listeFractions2 = [[2, 3], [4, 3], [5, 3], [7, 3], [8, 3],
      [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6]
    ]

    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, fraction1 = [], fraction2 = [], triplet, propositions, prix, choix, truc, a, b, c, d, e, m, n, p, k, A, B, C, D, pol, L, l2, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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

        case 3:

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

        case 4:

          a = calcul(randint(3, 9) + randint(1, 4) / 10)
          b = calcul(randint(1, 5) / 10 + randint(2, 9) / 100)
          texte = `$${texNombre(a)}+${texNombre(b)}=$ `
          texteCorr = `$${texNombre(a)}+${texNombre(b)}=${texNombre(a + b)}$ `
          reponse = calcul(a + b)

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 5:
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

        case 6:
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

        case 7:
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

        case 8:
          a = randint(2, 5)
          b = randint(2, 9)
          c = randint(2, 9)

          if (choice([true, false])) {
            reponse = calcul(a * 10000 + b * 100 + c * 10)
            texte = `$${texNombre(a)}\\times ${texNombre(10000)} + ${texNombre(b)}\\times 100 + ${texNombre(c)}\\times 10=$`
            texteCorr = `$${texNombre(a)}\\times ${texNombre(1000)} + ${texNombre(b)}\\times 100 + ${texNombre(c)}\\times 10 =
     ${texNombre(a * 10000)} + ${texNombre(b * 100)} + ${texNombre(c * 10)}=${texNombre(reponse)}$`
          } else {
            reponse = calcul(c * 10000 + b * 1000 + a * 10)
            texte = `$ ${texNombre(c)}\\times ${texNombre(10000)}+ ${texNombre(b)}\\times ${texNombre(1000)} + ${texNombre(a)}\\times 10 =$`
            texteCorr = `$ ${texNombre(c)}\\times ${texNombre(10000)}+ ${texNombre(b)}\\times ${texNombre(1000)} + ${texNombre(a)}\\times 10  =
      ${texNombre(c * 10000)}+ ${texNombre(b * 1000)} + ${texNombre(a * 10)} =${texNombre(reponse)}$`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 9:
          a = randint(2, 6)
          prix = calcul(2 + randint(1, 3) / 10 + 0.05)
          k = randint(2, 4)
          reponse = prix * k
          texte = `$${a}$ stylos identiques coûtent  $${texNombre(prix)}$ €. <br>
            Combien coûtent $${k * a}$ de ces mêmes stylos ?
             `

          texteCorr = `$${a}$ stylos identiques coûtent  $${texNombre(prix)}$ €, donc $${k * a}$
           de ces mêmes stylos coûtent  $${k}$ fois plus, soit $${k}\\times ${texNombre(prix)}=${texNombre(k * prix)}$ €.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' €' }
          nbChamps = 1
          break

        case 10:

          a = randint(11, 24, 20)
          reponse = calcul(101 * a)
          texte = `$${a}\\times 101=$`
          texteCorr = `$${a}\\times 101 = ${101 * a}$<br>`

          texteCorr += `$${a}\\times 101 = ${a}\\times (100+1)=${a}\\times 100+${a}\\times 1=${a * 100}+${a}=${101 * a}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 11:
          a = randint(-22, -11)
          b = randint(-9, -2)
          texte = `$${a}-(${b})=$`
          texteCorr = `$${a}-(${b})=${a}+${texNombre(-b)}=${a - b}$.`
          reponse = a - b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break
        case 12:
          a = choice([2, 2, 2, 3, 3, 4, 5])
          if (a === 2) {
            b = randint(3, 6)
            reponse = calcul(a ** b)
            texte = `Recopie la bonne réponse.<br>
          $${a}^{${b}}$ est égal à :<br>`
          }
          if (a === 3) {
            b = randint(2, 4)
            reponse = calcul(a ** b)
            texte = `Recopie la bonne réponse.<br>
           $${a}^{${b}}$ est égal à :<br>`
          }
          if (a === 4) {
            b = randint(2, 3)
            reponse = calcul(a ** b)
            texte = `Recopie la bonne réponse.<br>
             $${a}^{${b}}$ est égal à :<br>`
          }
          if (a === 5) {
            b = 2
            reponse = calcul(a ** b)
            texte = `Recopie la bonne réponse.<br>
               $${a}^{${b}}$ est égal à :<br>`
          }
          propositions = shuffle([`$${texNombre(reponse)}$`, `$${texNombre(a * b)}$`, `$${texNombre(a + b)}$`])
          texte += `$\\square$ ${propositions[0]} ${sp(6)} $\\square$ ${propositions[1]} ${sp(6)} $\\square$ ${propositions[2]}`
          texteCorr = `$${a}^{${b}}$ est le produit de $${b}$ facteurs tous égaux à $${a}$. Ainsi, $${a}^{${b}}=${a ** b}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 13:
          L = randint(8, 12)
          a = calcul(L * randint(2, 7))
          texte = `Un rectangle a une aire de $${a}$ m$^2$ et sa longueur mesure $${L}$ m.<br>
            Détermine sa largeur.`
          texteCorr = `L'aire d'un rectangle est obtenue  par le produit de sa longueur par sa largeur. <br>
          On obtient donc sa largeur
            en divisant l'aire par sa longueur : $\\ell=${a}\\div ${L}=${a / L}$. `
          reponse = calcul(a / L)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'm' }
          nbChamps = 1
          break

        case 14:
          a = choice(obtenirListeFractionsIrreductibles())
          c = choice([2, 4])
          b = fraction(1, a.d * c)
          if (choice([true, false])) {
            texte = `$${a.texFraction} + ${b.texFraction}=$
           `
            texteCorr = `Pour additionner des fractions, on les met au même dénominateur.<br>

           Ainsi, $${a.texFraction} + ${b.texFraction}
           =\\dfrac{${a.n}\\times ${c}}{${a.d}\\times ${c}}+ ${b.texFraction}
          =${a.reduire(c).texFraction} + ${b.texFraction}
          =\\dfrac{${a.n * c}+${b.n}}{${b.d}}
          =\\dfrac{${a.n * c + b.n}}{${b.d}}${simplificationDeFractionAvecEtapes(a.n * c + b.n, b.d)}$`
          } else {
            texte = `$ ${b.texFraction}+${a.texFraction}=$`
            texteCorr = `Pour additionner des fractions, on les met au même dénominateur.<br>
           <br>
           Ainsi, $ ${b.texFraction}+${a.texFraction}
           = ${b.texFraction}+\\dfrac{${a.n}\\times ${c}}{${a.d}\\times ${c}}
          =${b.texFraction}+${a.reduire(c).texFraction}
          =\\dfrac{${b.n}+${a.n * c}}{${b.d}}
          =\\dfrac{${b.n + a.n * c}}{${b.d}}${simplificationDeFractionAvecEtapes(a.n * c + b.n, b.d)}$`
          }

          reponse = fraction(a.n * c + b.n, b.d)
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 15:
          a = choice([2, 3, 6]) // diviseur de l'heure
          b = calcul(60 / a) // nombre de minutes de l'énoncé
          c = choice([30, 60, 90, 120])
          reponse = calcul(c / a)
          texte = `Une voiture roule à $${c}$ km/h. Combien de kilomètres parcourt-elle en $${b}$ minutes ?`
          texteCorr = `La voiture parcourt $${calcul(c / a)}$ km.<br>
         En $${b}$ minutes, elle parcourt $${a}$ fois moins de km qu'en $1$ heure, soit $\\dfrac{${c}}{${a}}=
          ${calcul(c / a)}$ km.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km' }
          nbChamps = 1
          break

        case 16:
          a = randint(-19, -11)
          b = randint(3, 8)
          c = randint(4, 10)
          reponse = calcul(a + b * c)
          texte = `$${a}+${b}\\times ${c}= $`
          texteCorr = `La multiplication est prioritaire. On obtient : <br>
          $${a}+${b}\\times ${c}=${a}+${b * c}=${a + b * c}$. `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 17:
          a = choice(obtenirListeFractionsIrreductibles())
          c = choice([2, 3, 4, 5, 6])
          b = a.d * c
          reponse = calcul(a.n * c)
          texte = `$${a.texFraction}\\times ${b}= $`
          if (a.n === 1) {
            texteCorr = `Pour multiplier $${b}$ par $${a.texFraction}$, on divise $'${b}$ par $${a.d}$ : on obtient $\\dfrac{${b}}{${a.d}}=${b / a.d}$<br>`
            texteCorr += `Ainsi $${a.texFraction}\\times ${b}= \\dfrac{${b}}{${a.d}}=${a.n * c}$.<br>`
          } else {
            texteCorr = `Pour multiplier $${b}$ par $${a.texFraction}$, on commence par diviser  $${b}$ par $${a.d}$ (car la division "tombe juste") : on obtient $\\dfrac{${b}}{${a.d}}=${b / a.d}$.<br>`
            texteCorr += `Puis, on multiplie ce résultat par $${a.n}$, ce qui donne : $${a.n} \\times ${b / a.d}=${a.n * c}$.<br>`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 18:
          a = choice(obtenirListeFractionsIrreductibles())
          c = a.d

          reponse = calcul(a * 2)

          if (choice([true, false])) {
            b = a.n
            d = fraction(b, c)
            texte = `L'opposé de $\\dfrac{${b}}{${c}}$ est : `
            texteCorr = `Deux nombres sont opposés lorsque leur somme est nulle.<br>
              Ainsi, l'opposé de $\\dfrac{${b}}{${c}}$ est $-${d.texFraction}$ car $\\dfrac{${b}}{${c}}+\\left(-${d.texFraction}\\right)=0$.`
            reponse = d.oppose()
          } else {
            b = a.n
            d = fraction(b, c)
            e = fraction(c, b)
            texte = `L'inverse de $\\dfrac{${b}}{${c}}$ est :`
            texteCorr = `Deux nombres sont inverses l'un de l'autre lorsque leur produit vaut $1$.<br>
                Ainsi, l'inverse de $\\dfrac{${b}}{${c}}$ est $${texFractionReduite(c, b)}$ car $\\dfrac{${b}}{${c}}\\times ${texFractionReduite(c, b)}=1$.`
            reponse = e
          }

          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 19:
          a = combinaisonListes([0, 1, 2, 3], 3)
          texte = `$10^${a[0]}+10^${a[1]}+10^${a[2]}= $`
          texteCorr = `$10^${a[0]}+10^${a[1]}+10^${a[2]}=
    ${texNombre(10 ** a[0])}+${texNombre(10 ** a[1])}+${texNombre(10 ** a[2])}
    =${texNombre(10 ** a[0] + 10 ** a[1] + 10 ** a[2])}$`
          reponse = calcul(10 ** a[0] + 10 ** a[1] + 10 ** a[2])
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 20:
          a = randint(1, 5) * 10
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

        case 21:
          if (choice([true, false])) {
            L = randint(3, 9)
            B = point(0, 0, 'B', 'below')
            C = point(3, 0, 'C', 'below')
            D = point(3, 3, 'D', 'above')
            A = point(0, 3, 'A', 'above')
            xmin = -1
            ymin = -0.5
            xmax = 4.5
            ymax = 4
            pol = polygoneAvecNom(A, B, C, D)
            objets = []
            objets.push(pol[0])
            objets.push(
              texteParPosition(`$${L} \\text{ cm}$`, milieu(C, D).x + 0.5, milieu(C, D).y, 'milieu', 'black', 1, 'middle', true)
              , segment(B, D), labelPoint(A, B, C, D))
            reponse = calcul(L * L / 2)
            texte = '$ABCD$ est un carré. Calcule l\'aire du triangle $ABD$. <br>'
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = `$ABD$ est un triangle rectangle isocèle. Son aire est donc la moitié de celle du carré :<br>
            $\\dfrac{${L}\\times ${L}}{2}=${L * L / 2}$ cm$^2$
                           `
          } else {
            L = randint(2, 5)
            l2 = randint(7, 9)
            B = point(0, 0, 'B', 'below')
            C = point(4, 0, 'C', 'below')
            D = point(4, 2.5, 'D', 'above')
            A = point(0, 2.5, 'A', 'above')
            xmin = -1
            ymin = -0.8
            xmax = 6
            ymax = 3
            pol = polygoneAvecNom(A, B, C, D)
            objets = []
            objets.push(pol[0])
            objets.push(
              texteParPosition(`$${L} \\text{ cm}$`, milieu(C, D).x + 0.5, milieu(C, D).y, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${l2} \\text{ cm}$`, milieu(B, C).x, milieu(B, C).y - 0.4, 'milieu', 'black', 1, 'middle', true),
              segment(B, D), labelPoint(A, B, C, D))
            reponse = calcul(L * l2 / 2)
            texte = '$ABCD$ est un rectangle. Calcule l\'aire du triangle $ABD$. <br>'
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = `$ABD$ est un triangle rectangle. Son aire est donc la moitié de celle du rectangle : <br>
            $\\dfrac{${L}\\times ${l2}}{2}=${L * l2 / 2}$ cm$^2$
            `
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm$^2$' }
          nbChamps = 1
          break

        case 22:

          fraction2 = choice(listeFractions2)
          a = fraction(fraction2[0], fraction2[1])

          b = fraction(4 * fraction2[0], 2 * fraction2[1])
          texte = `$A=${a.texFraction} -${b.texFraction}$<br>
           Donne la valeur de $A$ sous la forme d'une fraction simplifiée au maximum ou d'un nombre entier.`
          texteCorr = ` $A=${a.texFraction} -${b.texFraction}=${texFraction(2 * fraction2[0], 2 * fraction2[1])}-${b.texFraction}=${texFraction(-2 * fraction2[0], 2 * fraction2[1])}=${texFractionReduite(-2 * fraction2[0], 2 * fraction2[1])}$.
           <br>
          `

          setReponse(this, index, (new FractionEtendue(-fraction2[0], fraction2[1])).simplifie(), { formatInteractif: 'fraction' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 23:
          a = randint(-5, -2)
          b = randint(2, 4)
          truc = randint(-5, -2)
          c = calcul(a * b * truc)
          texte = `Complète l'égalité : <br>
            $${a}\\times ${b}\\times \\ldots =${c}$ `
          reponse = truc
          texteCorr = `On cherche le nombre qui multiplié par $${a}\\times ${b}=${a * b}$ donne $${c}$, il s'agit de $\\dfrac{${c}}{${a * b}}=${truc}$. `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }

          nbChamps = 1
          break

        case 24:
          a = randint(1, 6) * 2
          b = calcul(a + a / 2)
          c = randint(7, 12) * 2
          reponse = calcul(c + c / 2)

          texte = 'Complète le tableau de proportionnalité ci-dessous :<br>'
          texte += tableauColonneLigne([a, b], [c], [''])
          texteCorr = `On constate que $${b}$ s'obtient en augmentant $${a}$ de la moitié de $${a}$.
              Ainsi, on obtient la quatrième proportionnelle en augmentant $${c}$ de la moitié de $${c}$.<br>
              La valeur cherchée est donc $${c}+${c / 2}=${c + c / 2}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }

          nbChamps = 1
          break

        case 25:

          a = calcul(randint(1, 12) + randint(1, 9) / 10)
          reponse = calcul(a * 1000)
          texte = ` $${texNombre(a)}$ m$^3=$`
          texteCorr = `Comme $1$ m$^3$= $1000$ L, $${texNombre(a)}$ m$^3=${a * 1000}$ L.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'L' } else { texte += '$\\ldots$ L' }
          nbChamps = 1
          break

        case 26:
          a = randint(10, 29)
          b = randint(3, 8)
          truc = randint(-8, -2)
          texte = `Calcule $${a}+${b}x$ pour $x=${truc}$. `
          texteCorr = `Pour $x=${truc}$, on obtient :  $${a}+${b}x=${a}+${b}\\times(${truc})=${a + b * truc}$.`
          reponse = calcul(a + b * truc)

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 27:
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
          fraction1 = choice(listeFractions1)
          a = fraction(fraction1[0], fraction1[1])
          texte = `Ecriture décimale de $${a.texFraction}$. <br>`
          texteCorr = `$\\dfrac{1}{5}=0,2$, ainsi  $${a.texFraction}=${fraction1[0]}\\times\\dfrac{1}{5}=${texNombre(fraction1[0] / fraction1[1])}$`
          reponse = calcul(fraction1[0] / fraction1[1])
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 30:
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
