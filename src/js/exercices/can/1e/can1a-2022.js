import Exercice from '../../Exercice.js'
import FractionX from '../../../modules/FractionEtendue.js'
import { Arbre } from '../../../modules/arbres.js'
import { mathalea2d, pave, point, repere, tracePoint, courbe, droite, labelPoint, segment, milieu, texteParPosition, plot, fixeBordures } from '../../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, arrondi, randint, ecritureParentheseSiNegatif, ecritureAlgebrique, texPrix, rienSi1, texNombre, arcenciel, miseEnEvidence, printlatex, shuffle, reduirePolynomeDegre3, choice, reduireAxPlusB, sp, ecritureAlgebriqueSauf1 } from '../../../modules/outils.js'
import { setReponse } from '../../../modules/gestionInteractif.js'

import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import Decimal from 'decimal.js/decimal.mjs'
export const titre = 'CAN première sujet 2022'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '09/07/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export default function SujetCAN2022Premiere () {
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
    const nbQ1 = min(round(this.nbQuestions * 10 / 30), 10) // Choisir d'un nb de questions de niveau 1 parmi les 8 possibles.
    const nbQ2 = min(this.nbQuestions - nbQ1, 20)
    const typeQuestionsDisponiblesNiv1 = shuffle([1, 2, 23, 4, 5, 6, 7, 8, 9, 10]).slice(-nbQ1).sort(compareNombres)
    const typeQuestionsDisponiblesNiv2 = shuffle([3,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 24, 25, 26, 27, 28, 29, 30]).slice(-nbQ2).sort(compareNombres)
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))
    const listeFractions2 = [[1, 3], [2, 3], [3, 7], [2, 7], [4, 3], [3, 5], [4, 7], [1, 5], [3, 5], [3, 4], [2, 9], [1, 9], [7, 9], [1, 8], [5, 8]
    ]
    const listeChoix17 = [['quinze', 'Quinze', 15, 4], ['dix', 'Dix', 10, 6], ['vingt', 'Vingt', 20, 3]]

    for (let i = 0, index = 0, nbChamps, texte, texteCorr, AB, AC, BC, reponse, prix, tang, pA, somme, o, omega, pBsachantA, pAbarre, pBsachantAbarre, ordonnee, n, q, xA, yA, xB, yB, xC, yC, F, traceA, traceB, traceC, l, L, h, pav, u, k, r, f, m, choix, nbre, a, b, c, d, e, g, p, A, B, C, D, E, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[i]) {
        case 1:
          a = randint(2, 9)
          b = new Decimal(randint(1, 9)).div(10)
          if (choice([true, false])) {
            texte = `$${a} \\times ${texNombre(b, 1)}=$ `
          } else { texte = `$${texNombre(b, 1)} \\times ${a}=$ ` }
          texteCorr = `$${a} \\times ${texNombre(b, 1)}=${a}\\times ${texNombre(b * 10, 0)}\\times 0,1=${texNombre(a * b, 1)}$`
          reponse = new Decimal(a).mul(b)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1

          break

        case 2:
          a = randint(1, 9)
          b = choice(listeFractions2)
          f = new FractionX(b[0], b[1])
          if (choice([true, false])) {
            reponse = new FractionX(a * b[1] + b[0], b[1])
            texte = `$${a}+${f.texFraction}= $`
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
            texteCorr = `$${a}+${f.texFraction}= \\dfrac{${a * b[1]}}{${b[1]}}+${f.texFraction}=${reponse.texFraction}${reponse.texSimplificationAvecEtapes()}$`
          } else {
            reponse = new FractionX(a * b[1] - b[0], b[1])
            texte = `$${a}-${f.texFraction}= $`
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
            texteCorr = `$${a}-${f.texFraction}= \\dfrac{${a * b[1]}}{${b[1]}}-${f.texFraction}=${reponse.texFraction}${reponse.texSimplificationAvecEtapes()}$`
          }
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })

          nbChamps = 1
          break

        case 3:
          a = randint(1, 5)
          b = randint(-3, 3, 0)
          c = randint(1, 5)
          d = randint(-5, 5, [0, b])

          texte = `Développer et réduire l'expression $(${reduireAxPlusB(a, b)})(${reduireAxPlusB(c, d)})$.`
          texteCorr = `$(${reduireAxPlusB(a, b)})(${reduireAxPlusB(c, d)})=${rienSi1(a * c)}x^2${ecritureAlgebriqueSauf1(a * d)}x${ecritureAlgebriqueSauf1(b * c)}x${ecritureAlgebrique(b * d)}=${reduirePolynomeDegre3(0, a * c, b * c + a * d, b * d)}$`
          reponse = [`${a * c}x^2+${b * c + a * d}x+${b * d}`]

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break
        case 4:
          if (choice([true, false])) {
            a = randint(2, 9)
            b = choice([2, 3])
            c = randint(2, 9)
            d = randint(2, 9)
            e = choice([-1, -2, -3])
            reponse = new Decimal(a * 10 ** b + c + d * 10 ** e)
            texte = `Donner l'écriture décimale de :  $${a}\\times10^${b}+${c}+${d}\\times 10^{${e}}$.`
            texteCorr = `$${a}\\times10^${b}+${c}+${d}\\times 10^{${e}}=${texNombre(a * 10 ** b, 3)}+${c}+${texNombre(c * 10 ** e, 3)}=${texNombre(reponse, 3)}$`
          } else {
            a = randint(2, 9)
            b = choice([2, 3])
            c = randint(2, 9)
            d = randint(2, 9)
            e = choice([-1, -2, -3])
            reponse = new Decimal(a * 10 ** b + c + d * 10 ** e)
            texte = `Donner l'écriture décimale de :  $${c}+${d}\\times 10^{${e}}+${a}\\times10^${b}$.`
            texteCorr = `$${c}+${d}\\times 10^{${e}}+${a}\\times10^${b}=${c}+${texNombre(d * 10 ** e, 3)}+${texNombre(a * 10 ** b, 3)}=${texNombre(reponse, 3)}$`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })

          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 5:
          a = randint(2, 10)
          b = randint(-10, 10, 0)
          f = new FractionX(-b, a)

          texte = `Résoudre l'équation $${reduireAxPlusB(a, b)}=0$.`
          texteCorr = `On se ramène à une équation du type $a\\times x=b$ :<br>
          $\\begin{aligned}
          ${a}x${ecritureAlgebrique(b)}&=0\\\\
         ${a}x&=${-b}\\\\
                              x&=${f.texFraction}${f.texSimplificationAvecEtapes()}
         \\end{aligned}$<br>
                   
        
          
          L'équation $${reduireAxPlusB(a, b)}=0$ a pour solution $x=${f.texFractionSimplifiee}$.`
          reponse = f

          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 6:
          choix = choice(['a', 'b', 'c'])//
          if (choix === 'a') {
            a = randint(2, 5) * 2
            prix = new Decimal(randint(7, 15)).div(10)
            reponse = new Decimal(prix * a).div(2)

            if (a === 2) {
              texte = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €.  Combien coûte $${texNombre(a / 2, 0)}$ croissant ?
              `
              texteCorr = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €, donc 
                       $${texNombre(a / 2, 0)}$ croissant coûte $2$ fois moins, soit : <br>
                       $${texPrix(prix * a)}\\div 2=${texPrix(reponse)}$ €.`
            } else {
              texte = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €.  Combien coûtent $${texNombre(a / 2, 0)}$ croissants ?
                        `
              texteCorr = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €, donc 
                       $${texNombre(a / 2, 0)}$ croissants coûtent $2$ fois moins, soit : <br>
                       $${texPrix(prix * a)}\\div 2=${texPrix(reponse)}$ €.`
            }
          }
          if (choix === 'b') {
            a = randint(1, 3) * 3
            prix = new Decimal(randint(7, 15)).div(10)
            reponse = new Decimal(prix).mul(a).div(3)

            if (a === 3) {
              texte = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €. Combien coûte $${texNombre(a / 3, 0)}$ croissant ?
                            `
              texteCorr = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €, donc 
                                     $${texNombre(a / 3, 0)}$ croissant coûte $3$ fois moins, soit : <br>
                                     $${texPrix(prix * a)}\\div 3=${texPrix(reponse)}$ €.`
            } else {
              texte = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €. Combien coûtent $${texNombre(a / 3, 0)}$ croissants ?
                                      `
              texteCorr = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €, donc 
                                     $${texNombre(a / 3, 0)}$ croissants coûtent $3$ fois moins, soit : <br>
                                     $${texPrix(prix * a)}\\div 3=${texPrix(reponse)}$ €.`
            }
          }
          if (choix === 'c') {
            a = randint(1, 3) * 4
            prix = new Decimal(randint(7, 15)).div(10)
            reponse = new Decimal(prix).mul(a).div(4)

            if (a === 4) {
              texte = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €. Combien coûte $${texNombre(a / 4, 0)}$ croissant ?
                                          `
              texteCorr = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €, donc 
                                                   $${texNombre(a / 4, 0)}$ croissant coûte $4$ fois moins, soit : <br>
                                                   $${texPrix(prix * a)}\\div 4=${texPrix(reponse)}$ €.`
            } else {
              texte = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €. Combien coûtent $${texNombre(a / 4, 0)}$ croissants ?
                                                    `
              texteCorr = `$${a}$ croissants coûtent  $${texPrix(prix * a)}$ €, donc 
                                                                                           $${texNombre(a / 4, 0)}$ croissants coûtent $4$ fois moins, soit : <br>
                                                                                           $${texPrix(prix * a)}\\div 4=${texPrix(reponse)}$ €.`
            }
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' €' }
          nbChamps = 1
          break

        case 7:
          a = randint(1, 6)
          b = randint(a + 1, 12)
          c = []
          for (let n = 0; n < a; n++) {
            c.push(true)
          }
          for (let n = 0; n < b - a; n++) {
            c.push(false)
          }
          c = shuffle(c)
          d = []
          for (let n = 0; n < b; n++) {
            d.push(plot(n % 5, -Math.floor(n / 5), { rayon: 0.2, couleur: 'black', couleurDeRemplissage: c[n] ? 'black' : 'white' }))
          }
          f = new FractionX(a, b)
          texte = `Calculer la fréquence de boules noires parmi ces boules :<br>
          ${mathalea2d(Object.assign({}, fixeBordures(d)), d)}`
          // $${a}$ boules noires $${b}$ boules au total.
          reponse = f
          texteCorr = `La fréquence est donnée par le quotient : $\\dfrac{\\text{Nombre de boules noires}}{\\text{Nombre total de boules}}=${f.texFraction}${f.texSimplificationAvecEtapes()}$.`

          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 8:
          a = randint(-3, -1)
          b = randint(-6, 6, 0)
          c = randint(-10, 10, 0)
          reponse = a ** 2 + b * a + c
          texte = `Calculer l'expression  $${reduirePolynomeDegre3(0, 1, b, c)}$ pour $x=${a}$.`
          texteCorr = `
            Pour $x=${a}$, on obtient : $${reduirePolynomeDegre3(0, 1, b, c)}=(${a})^2${ecritureAlgebrique(b)}\\times (${a})${ecritureAlgebrique(c)}=${reponse}$.
                      `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 9:
          if (choice([true, false])) {
            a = randint(1, 9)
            somme = choice([20, 40, 60])
            b = randint(1, 9)
            c = somme / 2 - a
            d = somme / 2 - b
          } else {
            a = randint(1, 29)
            somme = choice([60, 80, 90, 100, 120])
            b = randint(1, 29)
            c = somme / 2 - a
            d = somme / 2 - b
          }
          reponse = somme / 4
          texte = `Calculer la moyenne de :
            $${a}${sp(3)}; ${sp(3)}${b}${sp(3)}; ${sp(3)}${c}${sp(3)}; ${sp(3)}${d}$.`
          texteCorr = `La moyenne est donnée par : $\\dfrac{${a}+${b}+${c}+${d}}{4}=\\dfrac{${somme}}{4}=${reponse}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 10:
          a = randint(1, 9) * 10
          p = randint(2, 9, 5) * 10
          reponse = new Decimal(a * p).div(100)
          texte = `$${p}$ $\\%$ de $${a}= $`

          texteCorr = `          Prendre $${p}$ $\\%$  de $${a}$ revient à prendre $${texNombre(p / 10, 0)}\\times 10$ $\\%$  de $${a}$.<br>
            Comme $10$ $\\%$  de $${a}$ vaut $${a / 10}$ (pour prendre $10$ $\\%$  d'une quantité, on la divise par $10$), alors
            $${p}$ $\\%$ de $${a}=${texNombre(p / 10, 0)}\\times ${texNombre(a / 10, 0)}=${texNombre(reponse, 0)}$.
           `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 11:
          l = randint(2, 5)
          L = randint(2, 4)
          h = randint(2, 6, [l, L])
          pav = pave(L, l, h)
          texte = ' Quel est le volume en cm$^3$ de ce  pavé droit ?<br>'
          texte += ` ${mathalea2d({ xmin: -2, ymin: -2, xmax: 10, ymax: l + 2, scale: 0.8 }, pav)}`

          reponse = L * l * h
          texteCorr = `Le volume de ce pavé droit est : $${L}\\times ${l}\\times ${h}=${reponse}$ cm$^3$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' cm$^3$' }
          nbChamps = 1
          break

        case 12:
          if (choice([true, false])) {
            a = randint(1, 7) * choice([-1, 1])
            u = randint(1, 10) * choice([-1, 1])
            k = randint(2, 4)

            texte = `Pour tout entier naturel $n$, <br>
          $\\begin{cases} u_0=${u}\\\\u_{n+1}=u_n ${ecritureAlgebrique(a)}\\end{cases}$${sp(15)}
          $u_{${k}}=$`
            texteCorr = 'On calcule les termes successifs :'
            if (a > 0) {
              for (let indice = 0; indice < k; indice++) {
                texteCorr += `<br> $u_{${indice + 1}} = ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecritureAlgebrique(a)} =
                ${miseEnEvidence(u, arcenciel(indice, true))} + ${a} = ${miseEnEvidence(u + a, arcenciel(indice + 1, true))}$`
                u = u + a
              }
            } else {
              for (let indice = 0; indice < k; indice++) {
                texteCorr += `<br> $u_{${indice + 1}} = ${miseEnEvidence(' u_{' + indice + '}', arcenciel(indice, true))} ${ecritureAlgebrique(a)} =
              ${miseEnEvidence(u, arcenciel(indice, true))}  ${a} = ${miseEnEvidence(u + a, arcenciel(indice + 1, true))}$`
                u = u + a
              }
            }
            reponse = u
            if (this.interactif) {
              setReponse(this, index, reponse, { formatInteractif: 'calcul' })
              texte += ajouteChampTexteMathLive(this, index, 'largeur15 inline')
            } else { texte += ' $\\ldots$' }
          } else {
            a = randint(2, 3)
            u = 1
            k = randint(2, 4)

            texte = `Pour tout entier naturel $n$, <br>
              $\\begin{cases} u_0=${u}\\\\u_{n+1}=${a}\\times u_n \\end{cases}$${sp(15)}
              $u_{${k}}=$ `
            texteCorr = 'On calcule les termes avc la formule de récurrence :'

            for (let indice = 0; indice < k; indice++) {
              texteCorr += `<br> $u_{${indice + 1}} = ${miseEnEvidence(' u_{' + indice + '}', arcenciel(indice, true))} \\times ${a} =
                    ${miseEnEvidence(u, arcenciel(indice, true))} \\times ${a} = ${miseEnEvidence(u * a, arcenciel(indice + 1, true))}$`
              u = u * a
            }
            reponse = u
            if (this.interactif) {
              setReponse(this, index, reponse, { formatInteractif: 'calcul' })
              texte += ajouteChampTexteMathLive(this, index, 'largeur15 inline')
            } else { texte += ' $\\ldots$' }
          }
          nbChamps = 1
          break

        case 13:

          a = new Decimal(randint(1, 99)).div(10)
          b = randint(2, 30)
          if (choice([true, false])) {
            texte = `$${texNombre(a, 1)}$ cm $=$`
            texteCorr = `$1$ m $=10^6$ $\\mu$m, donc $1$ cm $=10^4 =${texNombre(10000, 0)}$ $\\mu$m.<br>
            Ainsi, $${texNombre(a, 1)}$ cm $=${texNombre(a * 10000, 0)}$ $\\mu$m.`
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '$\\mu$m' } else { texte += ' ..... $\\mu$m' }
            reponse = a * 10000
          } else {
            texte = `$${texNombre(b, 1)}$ $\\mu$m $=$`
            texteCorr = `$1$ $\\mu$m $=10^{-6}$ m, donc $1$ $\\mu$m  $=10^{-4}$ cm  $=${texNombre(0.0001, 4)}$ cm.<br>
            Ainsi, $${texNombre(b, 1)}$ $\\mu$m $=${texNombre(b / 10000, 5)}$ cm.`
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' } else { texte += ' ..... cm' }
            reponse = (new Decimal(b).div(10000))
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          nbChamps = 1

          break

        case 14:
          xA = randint(1, 5)
          yA = randint(3, 5)
          xB = randint(3, 5, xA)
          yB = randint(1, 2)
          xC = randint(1, 2, xA)
          yC = randint(1, 2)
          r = repere({
            xMin: -1,
            xMax: 6,
            xUnite: 1,
            yMin: -1,
            yMax: 6,
            thickHauteur: 0.2,
            xLabelMin: 1,
            xLabelMax: 5,
            yLabelMax: 5,
            yLabelMin: 1,
            axeXStyle: '->',
            axeYStyle: '->',
            yLabelDistance: 1,
            yLabelEcart: 0.6,
            grilleSecondaire: true,
            grilleSecondaireYDistance: 1,
            grilleSecondaireXDistance: 1,
            grilleSecondaireYMin: -1,
            grilleSecondaireYMax: 6,
            grilleSecondaireXMin: -1,
            grilleSecondaireXMax: 6
          })
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          A = point(xA, yA, 'A', 'above')
          B = point(xB, yB, 'B', 'below')
          C = point(xC, yC, 'C', 'below')
          AB = segment(A, B, 'blue')
          AC = segment(A, C, 'blue')
          BC = segment(B, C, 'blue')
          AB.epaisseur = 2
          AC.epaisseur = 2
          BC.epaisseur = 2
          traceA = tracePoint(A) // Variable qui trace les points avec une croix
          traceB = tracePoint(B)
          traceC = tracePoint(C)

          choix = choice(['a', 'b', 'c'])
          if (choix === 'a') {
            texte = 'Quelle est l’abscisse  du point $A$ ?<br>'
            texte += mathalea2d({ xmin: -1, xmax: 6.1, ymin: -1, ymax: 6, pixelsParCm: 25, scale: 0.8 },
              r, o, traceA, traceB, traceC, labelPoint(A, B, C), AB, AC, BC)
            texteCorr = `L'abscisse du point $A$ se lit sur l'axe horizontal. <br>
            $x_A=${xA}$.
            `
            reponse = xA
          }
          if (choix === 'b') {
            texte = 'Quelle est l’ordonnée  du point $A$ ?<br>'
            texte += mathalea2d({ xmin: -1, xmax: 6.1, ymin: -1, ymax: 6, pixelsParCm: 25, scale: 0.8 },
              r, o, traceA, traceB, traceC, labelPoint(A, B, C), AB, AC, BC)
            texteCorr = `L'ordonnée du point $A$ se lit sur l'axe vertical. <br>
            $y_A=${yA}$.
            `
            reponse = yA
          }
          if (choix === 'c') {
            texte = 'Quelle est l’abscisse  du point $B$ ?<br>'
            texte += mathalea2d({ xmin: -1, xmax: 6.1, ymin: -1, ymax: 6, pixelsParCm: 25, scale: 0.8 },
              r, o, traceA, traceB, traceC, labelPoint(A, B, C), AB, AC, BC)
            texteCorr = `L'abscisse du point $B$ se lit sur l'axe horizontal. <br>
            $x_B=${xB}$.
            `
            reponse = xB
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 15:
          a = randint(1, 9)
          b = new Decimal(randint(1, 9)).div(10)
          c = new Decimal(randint(1, 9, b)).div(100)
          d = new Decimal(randint(1, 9, [b, c])).div(1000)
          e = new Decimal(randint(0, 9, [b, c, d])).div(10000)
          f = new Decimal(randint(0, 9, [b, c, d, e])).div(100000)
          g = new Decimal(randint(1, 9, [b, c, d, e, f])).div(1000000)
          nbre = new Decimal(a).add(b).add(c).add(d).add(e).add(f).add(g)
          if (choice([true, false])) {
            texte = `Donner l'arrondi au millième de $${texNombre(nbre, 6)}$.
             `
            if (e * 10000 < 5) {
              texteCorr = `Le chiffre qui suit les millièmes est $${texNombre(e * 10000, 0)}<5$, donc l'arrondi au millième de $${texNombre(nbre, 6)}$ est $${texNombre(arrondi(nbre, 3))}$.`
            } else { texteCorr = `Le chiffre qui suit les millièmes est $${texNombre(e * 10000, 0)}\\geqslant5$, donc l'arrondi au millième de $${texNombre(nbre, 6)}$ est $${texNombre(arrondi(nbre, 3))}$.` }
            reponse = arrondi(nbre, 3)
          } else {
            texte = `Donner l'arrondi au centième de $${texNombre(nbre, 6)}$.
          `
            if (d * 1000 < 5) {
              texteCorr = `Le chiffre qui suit les centièmes est $${texNombre(d * 1000, 0)}<5$, donc l'arrondi au centième de $${texNombre(nbre, 6)}$ est $${texNombre(arrondi(nbre, 2))}$.`
            } else { texteCorr = `Le chiffre qui suit les centième est $${texNombre(d * 1000, 0)}\\geqslant5$, donc l'arrondi au centième de $${texNombre(nbre, 6)}$ est $${texNombre(arrondi(nbre, 2))}$.` }
            reponse = arrondi(nbre, 2)
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 16:

          a = randint(1, 7) * choice([-1, 1])
          b = randint(1, 10) * choice([-1, 1])
          k = randint(1, 10)

          texte = 'Soit $(u_n)$ une suite définie pour tout  $n\\in\\mathbb{N}$ par : $u_n = '
          if (a === 1) { texte += 'n' } else if (a === -1) { texte += '-n' } else { texte += `${a}n` };
          if (b > 0) { texte += `+${b}$.` } else { texte += `${b}$.` };
          texte += `<br> $u_{${k}}=$`

          texteCorr = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient : $u_{${k}} =`
          if (a === 1) {
            texteCorr += `${k} ${ecritureAlgebrique(b)}`
          } else {
            if (a === -1) {
              texteCorr += `-${k} ${ecritureAlgebrique(b)}`
            } else {
              texteCorr += `${a} \\times ${k} ${ecritureAlgebrique(b)}`
            }
          }
          texteCorr += `=${a * k + b}$.`
          reponse = a * k + b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 17:
          a = choice(listeChoix17)
          b = randint(1, 7) * 10
          reponse = b * a[3]
          texte = `Si l'on parcourt $${b}$ km en ${a[0]} minutes, alors la vitesse moyenne est : `
          texteCorr = `${a[1]} minutes représentent $\\dfrac{1}{${a[3]}}$ heure.<br>
          Donc en $1$ heure, on parcourt $${b}\\times ${a[3]}=${b * a[3]}$ km. <br>
          La vitesse moyenne est donc $${b * a[3]}$ km/h. `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km/h' } else { texte += ' $\\ldots$ km/h' }
          nbChamps = 1
          break

        case 18:

          a = new Decimal(randint(1, 99)).div(100)
          texte = `On applique un coefficient multiplicateur de $${texNombre(a, 2)}$.<br>
          À quelle baisse, en pourcentage, cela correspond-il ?`
          texteCorr = `Multiplier par $${texNombre(a, 2)}$ revient à multiplier par $1-\\dfrac{${texNombre(100 - a * 100, 0)}}{100}$. <br>
          Cela revient donc à baisser de $${texNombre(100 - a * 100)} \\%$. `
          reponse = new Decimal(a).mul(-1).add(1).mul(100)
          console.log(reponse)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '$\\%$' } else { texte += ' $\\ldots$ $\\%$' }
          nbChamps = 1

          break

        case 19:
          a = randint(1, 5)
          b = choice([0.5, 0.25, 0.75])
          d = new Decimal(b).mul(60)

          if (!this.interactif) {
            texte = `$${texNombre(a + b, 2)}$ h $=$ ..... h ..... min`
            texteCorr = `$${texNombre(a + b, 2)}$ h $ = ${a}$ h $ + ${texNombre(b, 2)} \\times 60$ min $  = ${a}$ h $${texNombre(d, 0)}$ min`
          } else {
            texte = `Convertir en heures/minutes : <br>$${texNombre(a + b)}$ h $=$`
            texte += ajouteChampTexteMathLive(this, index, 'largeur10 inline', { texteApres: sp(5) + 'h' })
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur10 inline', { texteApres: sp(5) + 'min' })
            texteCorr = `$${texNombre(a + b, 2)}$ h $ = ${a}$ h $ + ${texNombre(b, 2)} \\times 60$ min $ = ${a}$ h $${texNombre(d, 0)}$ min`
            setReponse(this, index, a)
            setReponse(this, index + 1, d)
            nbChamps = 2
          }
          break

        case 20:
          a = randint(-1, 1, 0)
          b = randint(-1, 0)
          c = randint(-1, 0)
          d = randint(-2, 2)
          r = repere({
            xMin: -2,
            xMax: 3,
            xUnite: 1.5,
            yMin: -5,
            yMax: 5,
            thickHauteur: 0.2,
            xLabelMin: -1,
            xLabelMax: 2,
            yLabelMax: 4,
            yLabelMin: -4,
            axeXStyle: '->',
            axeYStyle: '->',
            yLabelDistance: 1,
            yLabelEcart: 0.6,
            grilleSecondaire: true,
            grilleSecondaireYDistance: 1,
            grilleSecondaireXDistance: 1,
            grilleSecondaireYMin: -5,
            grilleSecondaireYMax: 5,
            grilleSecondaireXMin: -2,
            grilleSecondaireXMax: 5
          })
          F = x => a * x ** 3 + b * x ** 2 + c * x + d
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          if (choice([true, false])) {
            texte = `On donne la courbe représentative d'une fonction $f$. <br>
            $f(0)\\times f(1)=$ `
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$<br>' }
            texte += mathalea2d({ xmin: -3, xmax: 4.6, ymin: -5.1, ymax: 5.1, pixelsParCm: 30, scale: 0.7 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))
            texteCorr = `$f(0)=${F(0)}$ et $f(1)=${F(1)}$, donc $f(0)\\times f(1)=${F(0)}\\times ${ecritureParentheseSiNegatif(F(1))}=${F(0) * F(1)}$.`
            reponse = F(0) * F(1)
          } else {
            texte = `On donne la courbe représentative d'une fonction $f$. <br>
            $f(-1)\\times f(1)=$ `
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$<br>' }
            texte += mathalea2d({ xmin: -3, xmax: 4.6, ymin: -5.1, ymax: 5.1, pixelsParCm: 30, scale: 0.8 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))
            texteCorr = `$f(-1)=${F(-1)}$ et $f(1)=${F(1)}$, donc $f(-1)\\times f(1)=${F(-1)}\\times ${ecritureParentheseSiNegatif(F(1))}=${F(-1) * F(1)}$.`
            reponse = F(-1) * F(1)
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })

          nbChamps = 1
          break

        case 21:
          if (choice([true, false])) {
            nbre = randint(-4, 4)
            r = repere({
              xMin: -2,
              xMax: 3,
              xUnite: 1.5,
              yMin: -5,
              yMax: 5,
              thickHauteur: 0.2,
              xLabelMin: -1,
              xLabelMax: 2,
              yLabelMax: 4,
              yLabelMin: -4,
              axeXStyle: '->',
              axeYStyle: '->',
              yLabelDistance: 1,
              yLabelEcart: 0.6,
              grilleSecondaire: true,
              grilleSecondaireYDistance: 1,
              grilleSecondaireXDistance: 1,
              grilleSecondaireYMin: -5,
              grilleSecondaireYMax: 5,
              grilleSecondaireXMin: -2,
              grilleSecondaireXMax: 5
            })
            F = x => x ** 3 - x ** 2 - 3 * x + 1
            o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
            if (nbre >= -2 && nbre <= 2) {
              texte = `On donne la courbe représentative d'une fonction $f$. <br>
              Donner le nombre de solutions de $f(x)= ${nbre}$.<br>`
              texte += mathalea2d({ xmin: -3, xmax: 4.6, ymin: -5.1, ymax: 5.1, pixelsParCm: 30, scale: 0.7 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))
              texteCorr = `La droite d'équation $y=${nbre}$ coupe $3$ fois la courbe de $f$, on en déduit que le nombre de solutions de l'équation $f(x)=${nbre}$ est $3$.`
              reponse = 3
            } else {
              texte = `On donne la courbe représentative d'une fonction $f$. <br>
              Donner le nombre de solutions de $f(x)= ${nbre}$.<br>`
              texte += mathalea2d({ xmin: -3, xmax: 4.6, ymin: -5.1, ymax: 5.1, pixelsParCm: 30, scale: 0.7 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))
              texteCorr = `La droite d'équation $y=${nbre}$ coupe $1$ fois la courbe de $f$, on en déduit que le nombre de solutions de l'équation $f(x)=${nbre}$ est $1$.`
              reponse = 1
            }
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'solution(s)' }
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          } else {
            nbre = randint(-6, 2)
            r = repere({
              xMin: -2,
              xMax: 4,
              xUnite: 1.5,
              yMin: -6,
              yMax: 3,
              thickHauteur: 0.2,
              xLabelMin: -1,
              xLabelMax: 3,
              yLabelMax: 2,
              yLabelMin: -5,
              axeXStyle: '->',
              axeYStyle: '->',
              yLabelDistance: 1,
              yLabelEcart: 0.8,
              grilleSecondaire: true,
              grilleSecondaireYDistance: 1,
              grilleSecondaireXDistance: 1,
              grilleSecondaireYMin: -6,
              grilleSecondaireYMax: 5,
              grilleSecondaireXMin: -3,
              grilleSecondaireXMax: 5
            })
            F = x => -1 * x ** 3 + 3 * x ** 2 - 4
            o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
            if (nbre > -4 && nbre < 0) {
              texte = `On donne la courbe représentative d'une fonction $f$. <br>
              Donner le nombre de solutions de $f(x)= ${nbre}$.<br>`
              texte += mathalea2d({ xmin: -3, xmax: 6.1, ymin: -6.1, ymax: 3.1, pixelsParCm: 30, scale: 0.7 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))
              texteCorr = `La droite d'équation $y=${nbre}$ coupe $3$ fois la courbe de $f$, on en déduit que le nombre de solutions de l'équation $f(x)=${nbre}$ est $3$.`
              reponse = 3
            }
            if (nbre === -4 || nbre === 0) {
              texte = `On donne la courbe représentative d'une fonction $f$. <br>
              Donner le nombre de solutions de $f(x)= ${nbre}$. <br>`
              texte += mathalea2d({ xmin: -3, xmax: 6.1, ymin: -6.1, ymax: 3.1, pixelsParCm: 30, scale: 0.7 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))
              texteCorr = `La droite d'équation $y=${nbre}$ coupe $2$ fois la courbe de $f$, on en déduit que le nombre de solutions de l'équation $f(x)=${nbre}$ est $2$.`
              reponse = 2
            }
            if (nbre > 0 || nbre < -4) {
              texte = `On donne la courbe représentative d'une fonction $f$. <br>
          Donner le nombre de solutions de $f(x)= ${nbre}$. <br>`
              texte += mathalea2d({ xmin: -3, xmax: 6.1, ymin: -6.1, ymax: 3.1, pixelsParCm: 30, scale: 0.7 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }))
              texteCorr = `La droite d'équation $y=${nbre}$  coupe $1$ fois la courbe de $f$, on en déduit que le nombre de solutions de l'équation $f(x)=${nbre}$ est $1$.`
              reponse = 1
            }
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'solution(s)' }
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          }

          nbChamps = 1
          break

        case 22:
          a = 1
          b = -1
          c = randint(-3, -2)
          d = randint(0, 1)
          nbre = randint(-1, 2)
          r = repere({
            xMin: -2,
            xMax: 3,
            xUnite: 1.5,
            yMin: -5,
            yMax: 5,
            thickHauteur: 0.2,
            xLabelMin: -1,
            xLabelMax: 2,
            yLabelMax: 4,
            yLabelMin: -4,
            axeXStyle: '->',
            axeYStyle: '->',
            yLabelDistance: 1,
            yLabelEcart: 0.8,
            grilleSecondaire: true,
            grilleSecondaireYDistance: 1,
            grilleSecondaireXDistance: 1,
            grilleSecondaireYMin: -5,
            grilleSecondaireYMax: 5,
            grilleSecondaireXMin: -2,
            grilleSecondaireXMax: 5
          })
          f = x => 3 * a * x ** 2 + 2 * b * x + c
          F = x => a * x ** 3 + b * x ** 2 + c * x + d
          tang = x => f(nbre) * (x - nbre) + F(nbre)
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)

          texte = `La courbe représente une fonction $f$ et une tangente à cette représentation.<br> Quel est le coefficient directeur de la tangente au point d'abscisse $${nbre}$ ? <br>  `
          texte += mathalea2d({ xmin: -3, xmax: 4.6, ymin: -5.1, ymax: 5.1, pixelsParCm: 30, scale: 0.8 }, r, o, courbe(F, { repere: r, color: 'blue', epaisseur: 2 }), courbe(tang, { repere: r, color: 'red', epaisseur: 2 }))
          texteCorr = `Le coefficient directeur de la tangente à la courbe au point d'abscisse $${nbre}$ est  $${f(nbre)}$.`

          reponse = f(nbre)

          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })

          nbChamps = 1
          break

        case 23:
          if (choice([true, false])) {
            a = new Decimal(randint(1, 12) * 10 + randint(1, 9)).div(10)
            reponse = a * 1000
            texte = ` $${texNombre(a, 1)}$ m$^3=$`
            texteCorr = `Comme $1$ m$^3$= $1000$ L, $${texNombre(a, 1)}$ m$^3=${texNombre(reponse, 0)}$ L.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'L' } else { texte += ' $\\ldots$ L' }
          } else {
            a = new Decimal(randint(1, 12) * 10 + randint(1, 9)).div(10)
            reponse = new Decimal(a).div(1000)
            texte = ` $${texNombre(a, 1)}$ L $=$`
            texteCorr = `Comme $1$ L= $0,001$ m$^3$, $${texNombre(a, 1)}$ L $=${texNombre(reponse, 4)}$  m$^3$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' m$^3$' } else { texte += ' $\\ldots$ m$^3$' }
          }

          nbChamps = 1
          break

        case 24:
          choix = choice(['a', 'b'])
          if (choix === 'a') {
            a = randint(1, 10)
            b = randint(2, 10)
            reponse = [printlatex(`(${a}*x-${b})*(${a}*x+${b})`), printlatex(`(${a}*x+${b})*(${a}*x-${b})`)]

            texte = `Factoriser $${rienSi1(a ** 2)}x^2-${b ** 2}$.
      `
            texteCorr = ` On reconnaît une différence de deux carrés : $a^2-b^2$ avec $a=${a}x$ et $b=${b}$.<br>
            Comme $a^2-b^2=(a-b)(a+b)$, alors $${rienSi1(a ** 2)}x^2-${b ** 2}=(${rienSi1(a)}x-${b})(${rienSi1(a)}x+${b})$.`
          }
          if (choix === 'b') {
            a = randint(1, 10)
            b = randint(2, 10)
            reponse = [printlatex(`(${b}-${a}*x)*(${b}+${a}*x)`), printlatex(`(${b}+${a}*x)*(${b}-${a}*x)`)]

            texte = `Factoriser $${b ** 2}-${rienSi1(a ** 2)}x^2$.
      `
            texteCorr = ` On reconnaît une différence de deux carrés : $a^2-b^2$ avec $a=${b}$ et $b=${a}x$.<br>
            Comme $a^2-b^2=(a-b)(a+b)$, alors  $${b ** 2}-${rienSi1(a ** 2)}x^2=(${b}-${rienSi1(a)}x)(${b}+${rienSi1(a)}x)$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 25:
          m = randint(1, 5)
          p = randint(-10, 10, 0)
          ordonnee = randint(-5, 5)
          reponse = new FractionX(ordonnee - p, m)
          texte = `$M$ est un point d'ordonnée $${ordonnee}$ de la droite d'équation $y=${reduireAxPlusB(m, p)}$.<br>
      `

          texteCorr = `L'abscisse $x_M$ du point $M$ vérifie l'égalité : $${rienSi1(m)}x_M${ecritureAlgebrique(p)}=${ordonnee}$.<br>
          Ainsi, $x_M=${reponse.texFraction}${reponse.texSimplificationAvecEtapes()}$. `

          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) {
            texte += 'Compléter $M($'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur11') + `$;${ordonnee})$`
          } else { texte += `${sp(5)}Compléter $M(\\ldots$ ; $${ordonnee})$` }
          nbChamps = 1
          break

        case 26:
          a = randint(1, 5)
          b = randint(6, 20)
          q = randint(2, 5)
          k = a
          n = 0
          texte = `Que renvoie l'instruction $\\texttt{suite(${a})}$ ?<br>$\\begin{array}{|l|}\n`
          texte += '\\hline\n'
          texte += '\\\n \\texttt{def suite(u) :}  \\\n '
          texte += `\\\\\n ${sp(6)} \\texttt{n=0}\\\n `
          texte += `\\\\\n ${sp(6)} \\texttt{while u<${b}:}\\\n `
          texte += `\\\\\n ${sp(12)} \\texttt{u = u+${q}}\\\n `
          texte += `\\\\\n ${sp(12)} \\texttt{n = n+1}\\\n `
          texte += `\\\\\n ${sp(6)} \\texttt{return n}\\\\\n `
          texte += '\\hline\n'
          texte += '\\end{array}\n$'

          texteCorr = ` L'instruction $\\texttt{while u<${b}}$ signifie : tant que u<${b}.<br>
            On calcule les valeurs successives des  variables u et n. On s'arrête dès que u dépasse ${b} :<br>
          On a au départ, u=${a} et n=0, puis, `

          while (a < b) {
            texteCorr += `<br>n = ${n + 1} et u = ${a} $ +$ ${q} = ${a + q} `
            n = n + 1
            a = q + a
          }
          texteCorr += `$> ${b}$. Donc l'algorithme retourne $${n}$.`
          reponse = n
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 27:
          a = randint(1, 4)// AB
          k = randint(2, 3)// coeff
          b = k * a// BE
          c = randint(b, 22)// DC
          d = k * c// AD
          A = point(6, 0, 'A', 'right', 'below')
          D = point(0.46, 2.92, 'D', 'above left')
          E = point(4, 1, 'E', 'below')
          B = point(6.22, 2, 'B', 'above right')
          C = point(0, -1, 'C', 'left')
          xmin = -1
          ymin = -1.5
          xmax = 7.5
          ymax = 4
          objets = []
          objets.push(
            texteParPosition(`${a}`, milieu(A, B).x + 0.3, milieu(A, B).y - 0.2, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('?', milieu(C, E).x, milieu(C, E).y - 0.5, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`${b}`, milieu(B, E).x, milieu(B, E).y + 0.2, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`${c}`, milieu(D, C).x - 0.3, milieu(C, B).y + 0.5, 'milieu', 'black', 1, 'middle', true),
            labelPoint(A, B, C, D, E), droite(B, C), droite(D, A), droite(C, D), droite(A, B))
          reponse = k * c
          texte = `$(AB)//(CD)$<br><br>
          `
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 25, mainlevee: false, amplitude: 0.5, scale: 0.8, style: 'margin: auto' }, objets)
          texteCorr = `Le triangle $ECD$ est un agrandissement du triangle $EAB$. La longueur $BE$ est $${k}$ fois plus grande que la longueur $AB$. 
          On en déduit que la longueur $EC$ est $${k}$ fois plus grande que la longueur $CD$.<br>
          Ainsi, $CE=${k}\\times ${c}=${reponse}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '<br>$CE=$'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else { texte += ' $CE=\\ldots$ ' }

          nbChamps = 1
          break

        case 28:
          pA = (new Decimal(randint(1, 9, 5))).div(10)
          pAbarre = (new Decimal((pA)).mul(-1)).add(1)
          pBsachantA = (new Decimal(randint(1, 9, 5))).div(10)

          pBsachantAbarre = (new Decimal(randint(1, 9, 5))).div(10)

          reponse = new Decimal((pA)).mul(pBsachantA)

          omega = new Arbre({
            racine: true,
            rationnel: false,
            nom: '',
            proba: 1,
            visible: false,
            alter: '',
            enfants: [
              new Arbre(
                {
                  rationnel: false,
                  nom: 'A',
                  proba: 1,
                  visible: false,
                  alter: '',
                  enfants: [new Arbre(
                    {
                      rationnel: false,
                      nom: 'B',
                      proba: 1,
                      visible: false,
                      alter: ''
                    }),
                  new Arbre(
                    {
                      rationnel: false,
                      nom: '\\overline{B}',
                      proba: new Decimal(1 - pBsachantA)
                    })
                  ]
                }),
              new Arbre({
                rationnel: false,
                nom: '\\overline{A}',
                proba: pAbarre,
                enfants: [new Arbre({
                  rationnel: false,
                  nom: 'B',
                  proba: new Decimal(pBsachantAbarre)
                }),
                new Arbre({
                  rationnel: false,
                  nom: '\\overline{B}',
                  proba: new Decimal(1 - pBsachantAbarre)
                })
                ]
              })
            ]
          })

          omega.setTailles() // On calcule les tailles des arbres.
          objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
          texte = 'On donne l\'arbre de probabilités ci-dessous :<br>'
          texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7, style: 'inline', scale: 0.8 }, ...objets)

          if (this.interactif) {
            texte += '<br> $P(A\\cap B)=$ '
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else { texte += '<br>$P(A\\cap B)=\\ldots$ ' }

          texteCorr = ` $P(A\\cap B)=P(A)\\times P_{A}(B)$.<br>
      $P(A)=1-${texNombre(pAbarre, 1)}= ${texNombre(pA, 1)}$.<br>
      $P_{A}(B)=1-${texNombre(1 - pBsachantA, 1)}= ${texNombre(pBsachantA, 1)}$.<br>
      Ainsi, $P(A\\cap B)=P(A)\\times P_{A}(B)=${texNombre(pA, 1)}\\times ${texNombre(pBsachantA, 1)}=${texNombre(reponse, 2)}$.
      `
          setReponse(this, index, reponse)
          nbChamps = 1
          break

        case 29:
          if (choice([true, false])) {
            a = randint(2, 10)

            reponse = 4 * a
            texte = `Donner le périmètre d'un carré d'aire $${a * a}$ cm$^2$.`

            texteCorr = `La longueur du côté est donnée par $\\sqrt{${a * a}}=${a}$.<br>
          Le périmètre est donc $4\\times ${a}=${4 * a}$ cm. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' }
          } else {
            a = randint(2, 10)

            reponse = a * a
            texte = `Donner l'aire d'un carré de périmètre $${4 * a}$ cm.`

            texteCorr = `La longueur du côté est donnée par $${4 * a}\\div 4=${a}$.<br>
                      L'aire est donc $ ${a}\\times ${a}=${a * a}$ cm$^2$. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm$^2$' }
          }

          nbChamps = 1
          break

        case 30:
          a = randint(-10, 10, [0, 1])
          b = randint(-10, 10, [0, 1])
          c = randint(1, 10, [0, 1])
          reponse = a + b - c
          texte = `$\\dfrac{\\text{e}^{${a}}\\times \\text{e}^{${b}}}{\\text{e}^{${c}}}=$`

          texteCorr = `$\\dfrac{\\text{e}^{${a}}\\times \\text{e}^{${b}}}{\\text{e}^{${c}}}=
          \\dfrac{\\text{e}^{${a}+${ecritureParentheseSiNegatif(b)}}}{\\text{e}^{${c}}}=\\text{e}^{${a + b}-${c}}=\\text{e}^{${reponse}}$`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '$\\text{e}^a$ avec $a=$'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else { texte += '$\\ldots$' }
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
