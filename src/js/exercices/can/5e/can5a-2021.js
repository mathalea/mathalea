import Exercice from '../../Exercice.js'
import { fraction, obtenirListeFractionsIrreductibles } from '../../../modules/fractions.js'
import { mathalea2d, point, labelPoint, codeSegment, codeAngle, droiteGraduee2, segment, milieu, texteParPosition } from '../../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, printlatex, randint, simplificationDeFractionAvecEtapes, texNombre, tableauColonneLigne, miseEnEvidence, shuffle, choice, calcul, sp } from '../../../modules/outils.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
export const titre = 'CAN 5ième sujet 2021'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '30/03/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export default function SujetCAN20215ieme () {
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

    const listeFractions13 = [[12, 5], [11, 5], [13, 5], [17, 5], [19, 5],
      [27, 5], [18, 5], [29, 5], [10, 3], [19, 3], [17, 3], [16, 3], [23, 3],
      [29, 3], [29, 7], [17, 7], [15, 7], [13, 7], [17, 7]]
    const listeFractions22 = [[1, 4], [3, 4], [1, 25], [2, 25], [3, 25],
      [4, 25], [1, 20], [3, 20], [7, 20], [5, 4]
    ]

    const listeFractions25 = [[8, 5, 2, 3], [3, 4, 4, 3], [7, 3, 5, 6], [7, 9, 11, 8],
      [11, 9, 7, 8], [1, 3, 7, 6], [11, 7, 12, 13]
    ]
    const listeFractions25B = [[2, 7, 3, 8], [8, 3, 13, 6], [9, 7, 5, 4], [4, 7, 5, 8],
      [11, 9, 4, 3], [1, 3, 6, 7], [11, 7, 9, 5]
    ]

    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, nombre, a1, b1, f, fraction1 = [], fraction2 = [], propositions, prix, choix, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, code1, code2, code3, code4, code5, code6, code7, code8, code9, code10, code11, code12, truc, a, b, c, d, e, m, p, k, A, B, C, D, E, F, G, H, I, J, K, L, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
          choix = choice(['a', 'a', 'a', 'b'])
          if (choix === 'a') {
            a = randint(1, 5) * 10
            p = randint(2, 9, 5) * 10
            reponse = calcul(a * p / 100)
            texte = `$${p}\\%$ de $${a}= $`

            texteCorr = `          Prendre $${p}\\%$  de $${a}$ revient à prendre $${p / 10}\\times 10\\%$  de $${a}$.<br>
            Comme $10\\%$  de $${a}$ vaut $${a / 10}$ (pour prendre $10\\%$  d'une quantité, on la divise par $10$), alors
            $${p}\\%$ de $${a}=${p / 10}\\times ${a / 10}=${reponse}$.
           `
          } else {
            a = choice([10, 20, 40, 60, 120])
            p = 25
            reponse = calcul(a * p / 100)
            texte = `$${p}\\%$ de $${a}= $`

            texteCorr = `          Prendre $${p}\\%$  de $${a}$ revient à prendre le quart  de $${a}$.<br>
          $\\dfrac{1}{4}$ de $${a}=\\dfrac{${a}}{4}=${texNombre(reponse)}$.
           `
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 12:
          a = randint(3, 12)
          b = randint(1, 6)
          c = randint(1, 6, b)
          reponse = a * b + a * c
          texte = `Le produit de $${a}$ par la somme de $${b}$ et de $${c}$ est égal à : `
          texteCorr = `Le produit de $${a}$ par la somme de $${b}$ et de $${c}$ est égal à : $${a}\\times \\underbrace{(${b}+${c})}_{\\text{Somme de } ${b} \\text{ et } ${c}}=${a}\\times ${b + c}=${a * b + a * c}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 13:
          fraction1 = choice(listeFractions13)
          a = fraction(fraction1[0], fraction1[1])

          texte = `$${a.texFraction} =${Math.floor(fraction1[0] / fraction1[1])}+\\dfrac{?}{${fraction1[1]}}$<br>
                   ? $ = $
            `
          texteCorr = ` $${a.texFraction} =
          \\dfrac{${Math.floor(fraction1[0] / fraction1[1])}\\times ${fraction1[1]}}{${fraction1[1]}}+\\dfrac{${fraction1[0] - Math.floor(fraction1[0] / fraction1[1]) * fraction1[1]}}{${fraction1[1]}}
          =\\dfrac{${Math.floor(fraction1[0] / fraction1[1]) * fraction1[1]}}{${fraction1[1]}}+\\dfrac{${fraction1[0] - Math.floor(fraction1[0] / fraction1[1]) * fraction1[1]}}{${fraction1[1]}}$ donc ?$=${fraction1[0] - Math.floor(fraction1[0] / fraction1[1]) * fraction1[1]}$.
            `
          reponse = fraction1[0] - Math.floor(fraction1[0] / fraction1[1]) * fraction1[1]
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 14:
          choix = choice(['a', 'b', 'c'])
          if (choix === 'a') {
            a = randint(2, 6)
            A = point(0, 0)
            B = point(-1, 0)
            C = point(-1, -1)
            D = point(0, -1)
            E = point(0, -2)
            F = point(1, -2)
            G = point(1, -1)
            H = point(2, -1)
            I = point(2, 0)
            J = point(1, 0)
            K = point(1, 1)
            L = point(0, 1)
            s1 = segment(A, B)
            code1 = codeSegment(A, B, '|')
            s2 = segment(B, C)
            code2 = codeSegment(B, C, '|')
            s3 = segment(C, D)
            code3 = codeSegment(C, D, '|')
            s4 = segment(D, E)
            code4 = codeSegment(D, E, '|')
            s5 = segment(E, F)
            code5 = codeSegment(E, F, '|')
            s6 = segment(F, G)
            code6 = codeSegment(F, G, '|')
            s7 = segment(G, H)
            code7 = codeSegment(G, H, '|')
            s8 = segment(H, I)
            code8 = codeSegment(H, I, '|')
            s9 = segment(I, J)
            code9 = codeSegment(I, J, '|')
            s10 = segment(J, K)
            code10 = codeSegment(J, K, '|')
            s11 = segment(K, L)
            code11 = codeSegment(K, L, '|')
            s12 = segment(L, A)
            code12 = codeSegment(L, A, '|')
            xmin = -2
            ymin = -2.1
            xmax = 3
            ymax = 1.2
            objets = []
            objets.push(
              texteParPosition(`$${a} \\text{cm} $`, milieu(B, C).x - 0.5, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true),
              s1, s2, s3, s4, s5, s6, code1, code2, code3, code4, code5, code6, s7, s8, s9, s10, s11, s12, code7, code8, code9, code10, code11, code12)
            reponse = 12 * a
            texte = 'Quel est le périmètre de cette figure ?<br>'
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = `La figure est composée de $12$ segments de longueur $${a}$ cm.<br>
              Le périmètre de cette figure est donc : $12\\times\\times ${a}=${12 * a}$ cm.   `
          }
          if (choix === 'b') {
            b = randint(6, 10)
            a = randint(1, 3)
            c = randint(4, 5)
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
              texteParPosition(`$${a} \\text{cm} $`, milieu(B, C).x, milieu(B, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${b} \\text{cm}  $`, milieu(D, E).x + 0.3, milieu(D, E).y, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${c} \\text{cm} $`, milieu(D, C).x - 0.2, milieu(D, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              s1, s2, s3, s4, s5, s6, code1, code2, code3, code4, code5, code6, segment(D, E))
            reponse = 4 * a + 2 * c + b
            texte = 'Quel est le périmètre de cette figure ?<br>'
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = `La figure est composée de $4$ segments de longueur $${a}$, de $2$ segments de longueur $${c}$ et d'un segment de longueur $${b}$.<br>
            Le périmètre de cette figure est donc : $4\\times ${a}+2\\times ${c}+${b}=${4 * a + 2 * c + b}$ cm.   `
          }

          if (choix === 'c') {
            b = randint(7, 10)
            a = randint(4, 5)
            c = randint(1, 3)
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
              texteParPosition(`$${c} \\text{cm} $`, milieu(B, C).x, milieu(B, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${b}  \\text{cm}$`, milieu(D, E).x + 0.3, milieu(D, E).y, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${a} \\text{cm}$`, milieu(D, C).x, milieu(D, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              s1, s2, s4, s5, s6, code1, code2, code4, code5, code6, segment(D, E))
            reponse = 3 * c + 2 * a + b
            texte = 'Quel est le périmètre de cette figure ?<br>'
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = `La figure est composée de $3$ segments de longueur $${c}$, de $2$ segments de longueur $${a}$ et d'un segment de longueur $${b}$.<br>
                    Le périmètre de cette figure est donc : $3\\times ${c}+2\\times ${a}+${b}=${3 * c + 2 * a + b}$ cm.   `
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '$\\mathscr{P}=$'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
          }
          nbChamps = 1
          break

        case 15:
          a = randint(2, 9)
          choix = choice(['a', 'b', 'c', 'd'])//
          if (choix === 'a') {
            reponse = a * 100
            texte = `$${a}$ dm$^2=$`
            texteCorr = `$1$ dm$^2= 100$ cm$^2$, donc $${a}$ dm$^2=${a}\\times 100$ cm$^2=${a * 100}$ cm$^2$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm$^2$' } else { texte += '$\\ldots$ cm$^2$' }
          }
          if (choix === 'b') {
            reponse = a / 100
            texte = `$${a}$ cm$^2=$`
            texteCorr = `$1$ cm$^2= 0,01$ dm$^2$, donc $${a}$ cm$^2=${a}\\times 0,01$ dm$^2=${texNombre(a / 100)}$ dm$^2$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'dm$^2$' } else { texte += '$\\ldots$ dm$^2$' }
          }
          if (choix === 'c') {
            reponse = a * 100
            texte = `$${a}$ m$^2=$`
            texteCorr = `$1$ m$^2= 100$ dm$^2$, donc $${a}$ m$^2=${a}\\times 100$ dm$^2=${a * 100}$ dm$^2$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'dm$^2$' } else { texte += '$\\ldots$ dm$^2$' }
          }
          if (choix === 'd') {
            reponse = a / 100
            texte = `$${a}$ dm$^2=$`
            texteCorr = `$1$ dm$^2= 0,01$ m$^2$, donc $${a}$ dm$^2=${a}\\times 0,01$ m$^2=${texNombre(a / 100)}$ m$^2$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'm$^2$' } else { texte += '$\\ldots$ m$^2$' }
          }

          nbChamps = 1
          break

        case 16:
          if (choice([true, false])) {
            a = randint(1, 4)// AB
            b = randint(5, 10)// AC
            c = randint(b - a, b - 1) + randint(1, 5) / 10// BC possible
            d = randint(1, b - a) - randint(1, 5) / 10// BC impossible
            e = randint(a + b + 1, 16)// BC impossible
            reponse = c
            propositions = shuffle([`$${texNombre(c)}$`, `$${texNombre(d)}$`, `$${texNombre(e)}$`])
            texte = `Dans le triangle $ABC$, on a $AB=${a}$ et $AC=${b}$. <br>
          Recopie la longueur possible de $[BC]$.<br>`

            texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
          } else {
            a = randint(2, 4)// AB
            b = randint(5, 8)// AC
            c = randint(b + 1, a + b - 1)// BC possible
            d = randint(1, b - a) - randint(1, 5) / 10// BC impossible
            e = randint(a + b + 1, 16)// BC impossible
            reponse = c
            propositions = shuffle([`$${texNombre(c)}$`, `$${texNombre(d)}$`, `$${texNombre(e)}$`])
            texte = `Dans le triangle $ABC$, on a $AB=${a}$ et $AC=${b}$. <br>
          Recopie la longueur possible de $[BC]$.<br>`

            texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
          }
          texteCorr = `Pour qu'un triangle soit constructible, il faut que la longueur du plus grand côté soit inférieure à la somme des deux autres.<br>
          Seule la longueur $${texNombre(c)}$ est possible pour $BC$. `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 17:
          a = randint(3, 6)
          b = choice([-1, -a + 1])
          reponse = fraction(b, a)// .simplifie()
          texte = 'Quelle est la fraction repérée par le point d’interrogation ?<br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 8, ymax: 1.5, scale: 0.8, style: 'margin: auto' }, droiteGraduee2({
            Unite: 3,
            Min: -1,
            Max: 1,
            x: 0,
            y: 0,
            thickSecDist: 1 / a,
            thickSec: true,
            thickoffset: 0,
            axeStyle: '|->',
            pointListe: [[b / a, '?']],
            labelPointTaille: 15,
            pointCouleur: 'blue',
            pointStyle: 'x',
            labelsPrincipaux: true,
            step1: 1,
            step2: 1
          }))
          texteCorr = `L'unité est divisée en $${a}$. Ainsi, le point d'interrogation est   $\\dfrac{${b}}{${a}}$.`
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 18:
          if (choice([true, false])) {
            a = randint(-15, -7)
            b = randint(-9, -1) / 10
            c = randint(-9, -1) / 100
            nombre = a + b + c
            texte = `Donne un encadrement au dixième près du nombre $${texNombre(nombre)}$ :<br>`

            texteCorr = `Le chiffre des dixième est le premier chiffre après la virgule. <br>Ainsi : $${texNombre(a + b - 0.1)} \\leqslant ${texNombre(nombre)} \\leqslant ${texNombre(a + b)}$.`

            if (this.interactif) {
              setReponse(this, index, a + b - 0.1, { formatInteractif: 'calcul' })
              texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + ` $\\leqslant  ${texNombre(nombre)} \\leqslant$` })
              setReponse(this, index + 1, a + b, { formatInteractif: 'calcul' })
              texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline')
            } else { texte += `$\\ldots \\leqslant ${texNombre(nombre)} \\leqslant \\ldots$` }
          } else {
            a = randint(-15, -7)
            b = randint(-9, -1) / 10
            c = randint(-9, -1) / 100
            d = randint(-9, -1) / 1000
            nombre = a + b + c + d
            texte = `Donne un encadrement au centième près du nombre $${texNombre(nombre)}$ :<br>`

            texteCorr = `Le chiffre des centième est le deuxième chiffre après la virgule. <br>Ainsi : $${texNombre(a + b + c - 0.01)} \\leqslant ${texNombre(nombre)} \\leqslant ${texNombre(a + b + c)}$.`

            if (this.interactif) {
              setReponse(this, index, a + b + c - 0.01, { formatInteractif: 'calcul' })
              texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + ` $\\leqslant  ${texNombre(nombre)} \\leqslant$` })
              setReponse(this, index + 1, a + b + c, { formatInteractif: 'calcul' })
              texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline')
            } else { texte += `$\\ldots \\leqslant ${texNombre(nombre)} \\leqslant \\ldots$` }
          }
          nbChamps = 2
          break

        case 19:
          a = randint(3, 12)
          texte = `Une brioche est vendue $${a}$ €.<br>
          Quel est son prix si on bénéficie d'une remise de $10\\%$ ? `
          reponse = 0.9 * a
          texteCorr = `$10\\%$ de $${a}$ $=0,1\\times ${a}=${texNombre(0.1 * a)}$. <br>
          Le montant de la remise est $${texNombre(0.1 * a)}$ €. La brioche coûtera donc après remise : $${a}-${texNombre(0.1 * a)}=${texNombre(0.9 * a)}$ €.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' €' }
          nbChamps = 1
          break

        case 20:
          a = randint(7, 21)
          b = choice([45, 50, 55])
          c = choice([20, 30, 40, 50])

          texte = `Une montre affiche  $${a}$ h $${b}$ min.<br>
          Quelle heure affichera-t-elle $1$ h $${c}$ plus tard ?`

          texteCorr = ` $${a}$ h $${b}$ min + $1$ h $${c}$ min est égal à $${a + 2}$ h $${b + c - 60}$ min.`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, a + 2, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
            setReponse(this, index + 1, b + c - 60, { formatInteractif: 'calcul' })
          }
          nbChamps = 2
          break

        case 21:
          if (choice([true, false])) {
            a = randint(2, 6)
            b = randint(2, 6)
            truc = randint(2, 5)
            c = a + b + truc
            texte = `VRAI/FAUX<br>
          L' égalité $${a}x+${b}=${c}$ est vérifiée pour $x=${truc}$.<br>`
            setReponse(this, index, ['F', 'f'], { formatInteractif: 'texte' })
            if (this.interactif) {
              texte += 'Pour VRAI, écrire V et pour FAUX : F'
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
            }
          } else {
            a = randint(2, 6)
            b = randint(2, 6)
            truc = randint(2, 5)
            c = b + a * truc
            texte = `VRAI/FAUX<br>
          L' égalité $${a}x+${b}=${c}$ est vérifiée pour $x=${truc}$.<br>`
            setReponse(this, index, ['V', 'v'], { formatInteractif: 'texte' })
            texteCorr = `Pour $x=${truc}$, $${a}x+${b}=${a}\\times ${truc}+${b}=${a * truc + b}$.`
            if (this.interactif) {
              texte += 'Pour VRAI, écrire V et pour FAUX : F'
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
            }
          }
          nbChamps = 1
          break

        case 22:
          fraction2 = choice(listeFractions22)
          a = fraction(fraction2[0], fraction2[1])

          texte = `Complète $${a.texFraction} =\\dfrac{...}{100}$`

          texteCorr = ` Le dénominateur de $${a.texFraction}$ est multiplié par $${100 / fraction2[1]}$.<br>
          Il faut donc multiplier le numérateur par $${100 / fraction2[1]}$. On obtient : $${fraction2[0]}\\times ${100 / fraction2[1]}=${fraction2[0] * 100 / fraction2[1]}$.`
          reponse = fraction2[0] * 100 / fraction2[1]
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '<br>$ \\ldots=$'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }
          nbChamps = 1
          break

        case 23:
          a = randint(-99, -81, -90)
          b = choice([-80, -70, -60, -50, -40, -30])

          if (choice([true, false])) {
            texte = `
            $${a}-(${b})=$ `
            reponse = a - b
            texteCorr = ` $${a}-(${b})=${a}+${-b}=${a - b}$`
          } else {
            texte = `
          $${b}-(${a})=$ `
            reponse = b - a
            texteCorr = ` $${b}-(${a})=${b}+${-a}=${b - a}$`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }

          nbChamps = 1
          break

        case 24:
          if (choice([true, false])) {
            a = choice([100, 110, 120])
            b = choice([10, 15, 20])
            A = point(0, 0)
            B = point(6, 0)
            C = point(4, 2)
            s1 = segment(A, B)
            s2 = segment(A, C)
            s3 = segment(B, C)

            xmin = -1
            ymin = -1
            xmax = 6.5
            ymax = 2.5
            objets = []
            objets.push(
              texteParPosition(`$${a}° $`, 4, 1.5, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${b}° $`, 1.2, 0.25, 'milieu', 'black', 1, 'middle', true),
              texteParPosition('?', 5.3, 0.3, 'milieu', 'black', 1, 'middle', true),
              s1, s2, s3, codeAngle(B, C, A, 0.8, '|'), codeAngle(C, A, B, 0.8, '||'))
          } else {
            a = choice([100, 110, 120])
            b = choice([45, 50, 55])
            A = point(0, 0)
            B = point(6, 0)
            C = point(2, 2)
            s1 = segment(A, B)
            s2 = segment(A, C)
            s3 = segment(B, C)

            xmin = -1
            ymin = -1
            xmax = 6.5
            ymax = 2.5
            objets = []
            objets.push(
              texteParPosition(`$${a}° $`, 2, 1.5, 'milieu', 'black', 1, 'middle', true),
              texteParPosition(`$${b}° $`, 1.2, 0.25, 'milieu', 'black', 1, 'middle', true),
              texteParPosition('?', 5.2, 0.3, 'milieu', 'black', 1, 'middle', true),
              s1, s2, s3, codeAngle(B, C, A, 0.8, '|'), codeAngle(C, A, B, 0.8, '||'))
          }
          reponse = 180 - a - b
          texte = '<br>'
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
          texte += ' ? $=$'
          texteCorr = `Dans un triangle, la somme des angles vaut $180°$.<br>
         ?$=180-${a}-${b}=${180 - a - b}°$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '°' } else { texte += '$\\ldots °$' }

          nbChamps = 1
          break

        case 25:
          fraction1 = choice(listeFractions25)
          fraction2 = choice(listeFractions25B)
          if (choice([true, false])) {
            a = fraction(fraction1[0], fraction1[1])
            b = fraction(fraction1[2], fraction1[3])
            if (this.interactif) { texte = '' } else { texte = ' Complète avec $<$, $>$ ou $=$ :<br>' }
            texte += `$${a.texFraction} ...... ${b.texFraction}$`
            texteCorr = 'Une des deux fractions  est un nombre supérieur à $1$ (numérateur plus grand que dénominateur) et l\'autre un nombre inférieur à $1$. La plus grande est donc celle qui a le numérateur plus grand que le dénominateur.'
          } else {
            a = fraction(fraction2[0], fraction2[1])
            a1 = fraction(fraction2[0] * fraction2[3], fraction2[1] * fraction2[3])
            b = fraction(fraction2[2], fraction2[3])
            b1 = fraction(fraction2[2] * fraction2[1], fraction2[3] * fraction2[1])
            if (this.interactif) { texte = '' } else { texte = ' Complète avec $<$, $>$ ou $=$ :<br>' }
            texte += `$${a.texFraction} ...... ${b.texFraction}$`
            texteCorr = `En écrivant les deux fractions avec le même dénominateur, on obtient : <br>
            $${a.texFraction}=${a1.texFraction}$ et $${b.texFraction}=${b1.texFraction}$. On en déduit que la plus grande est celle qui a le plus grand numérateur.`
          }
          if (fraction1[0] / fraction1[1] > fraction1[2] / fraction1[3]) {
            setReponse(this, index, '>', { formatInteractif: 'texte' })
          } else { setReponse(this, index, '<', { formatInteractif: 'texte' }) }
          if (this.interactif) {
            texte += '<br>Indique le symbole qui convient : $<$, $>$ ou $=$'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }
          nbChamps = 1
          break

        case 26:
          choix = choice(['a', 'b'])//, 'b', 'c', 'd'
          if (choix === 'a') {
            a = randint(1, 5)
            b = randint(5, 9)
            c = randint(1, 5)
            d = randint(1, 5)
            e = randint(3, 8)
            f = randint(1, 5)
            texte = 'Quelle est la proportion d\'élèves ayant obtenu une note supérieure ou égale à $14$ ?<br>'
            texte += tableauColonneLigne(['\\text{Note}', '7', '8', '10', '12', '14', '16'], ['\\text{Effectif}'], [a, b, c, d, e, f])
            texteCorr = `$${e}+${f}=${e + f}$ élèves ont une note supérieure ou égale à $14$.<br>
          Le nombre total d'élève est : $${a}+${b}+${c}+${d}+${e}+${f}=${a + b + c + d + e + f}$.<br>
           La proportion d'élèves ayant obtenu une note supérieure ou égale à $14$ est donc : $\\dfrac{${e + f}}{${a + b + c + d + e + f}}$<br>
           La fraction simplifiée (ou la valeur décimale exacte) sont d'autres réponses correctes.`
            reponse = fraction(e + f, a + b + c + d + e + f)
          }
          if (choix === 'b') {
            a = randint(1, 5)
            b = randint(5, 9)
            c = randint(1, 5)
            d = randint(1, 5)
            e = randint(3, 8)
            f = randint(1, 5)
            texte = 'Quelle est la proportion d\'élèves ayant obtenu une note inférieure ou égale à $10$ ?<br>'
            texte += tableauColonneLigne(['\\text{Note}', '7', '8', '10', '12', '14', '16'], ['\\text{Effectif}'], [a, b, c, d, e, f])
            texteCorr = `$${a}+${b}+${c}=${a + b + c}$ élèves ont une note inférieure ou égale à $10$.<br>
            Le nombre total d'élève est : $${a}+${b}+${c}+${d}+${e}+${f}=${a + b + c + d + e + f}$.<br>
             La proportion d'élèves ayant obtenu une note inféreire ou égale à $10$ est donc : $\\dfrac{${a + b + c}}{${a + b + c + d + e + f}}$<br>
             La fraction simplifiée (ou la valeur décimale exacte) sont d'autres réponses correctes.`
            reponse = fraction(a + b + c, a + b + c + d + e + f)
          }
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 27:

          a = randint(1, 4) * 3
          b = randint(9, 15) * 3
          A = point(0, 0, 'A', 'left')
          E = point(3, -1, 'E', 'below')
          D = point(4.73, 0, 'D', 'right')
          C = point(3, 1, 'C', 'above')
          reponse = (b - 2 * a) / 2
          s1 = segment(A, E)
          code1 = codeSegment(A, E, '||')
          s2 = segment(A, C)
          code2 = codeSegment(A, C, '||')
          s3 = segment(C, E)
          code3 = codeSegment(C, E, '|')
          s4 = segment(C, D)
          code4 = codeSegment(C, D, '|')
          s5 = segment(E, D)
          code5 = codeSegment(E, D, '|')
          xmin = -1
          ymin = -1.5
          xmax = 5.5
          ymax = 1.5
          objets = []
          if (a > (b - 2 * a) / 2) {
            objets.push(
              texteParPosition(`$${a} \\text{cm} $`, milieu(A, C).x, milieu(A, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              s1, s2, s3, s4, s5, code1, code2, code3, code4, code5, labelPoint(A, C, D, E))
            texte = `Le périmètre du quadrilatère $AEDC$ est égal à $${b}$ cm.<br>
          `
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = ` Le quadrilatère est composé de $2$ segments de $${a}$ cm et de deux autres segments de même longueur.<br>
          Ainsi, $CD=(${b}-2\\times ${a})\\div 2=${texNombre((b - 2 * a) / 2)}$  `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += '$CD=$'
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
            } else { texte += '<br>$CD=\\ldots$ cm' }
          } else {
            objets.push(texteParPosition(`$${a} \\text{cm} $`, milieu(D, C).x, milieu(D, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
              s1, s2, s3, s4, s5, code1, code2, code3, code4, code5, labelPoint(A, C, D, E))
            texte = `Le périmètre du quadrilatère $AEDC$ est égal à $${b}$ cm.<br>
          `
            texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1, style: 'margin: auto' }, objets)
            texteCorr = ` Le quadrilatère est composé de $2$ segments de $${a}$ cm et de deux autres segments de même longueur.<br>
          Ainsi, $AE=(${b}-2\\times ${a})\\div 2=${texNombre((b - 2 * a) / 2)}$  `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += '$AE=$'
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
            } else { texte += '<br>$AE=\\ldots$ cm' }
          }

          nbChamps = 1
          break

        case 28:
          a = choice(obtenirListeFractionsIrreductibles())
          c = choice([2, 4])
          b = fraction(1, a.d * c)
          if (choice([true, false])) {
            texte = `Complète : <br>$${a.texFraction} + ${b.texFraction}=$`
            texteCorr = ` $${a.texFraction} + ${b.texFraction}
           =\\dfrac{${a.n}\\times ${c}}{${a.d}\\times ${c}}+ ${b.texFraction}
          =${a.reduire(c).texFraction} + ${b.texFraction}
          =\\dfrac{${a.n * c}+${b.n}}{${b.d}}
          =\\dfrac{${a.n * c + b.n}}{${b.d}}${simplificationDeFractionAvecEtapes(a.n * c + b.n, b.d)}$`
          } else {
            texte = `Complète : <br>$ ${b.texFraction}+${a.texFraction}=$`
            texteCorr = ` $ ${b.texFraction}+${a.texFraction}
           = ${b.texFraction}+\\dfrac{${a.n}\\times ${c}}{${a.d}\\times ${c}}
          =${b.texFraction}+${a.reduire(c).texFraction} 
          =\\dfrac{${b.n}+${a.n * c}}{${b.d}}
          =\\dfrac{${b.n + a.n * c}}{${b.d}}${simplificationDeFractionAvecEtapes(a.n * c + b.n, b.d)}$`
          }

          reponse = a.sommeFraction(b)
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$ ' }
          nbChamps = 1
          break

        case 29:

          a = randint(2, 9)
          b = randint(2, 9)
          c = randint(2, 9)
          d = randint(2, 9)
          texte = `Simplifie l'expression : <br>
          $${a}a+${b}+${c}a+${d}$`
          texteCorr = ` $${a}a+${b}+${c}a+${d}=${a}a+${c}a+${b}+${d}=${a + c}a+${b + d}$`
          reponse = printlatex(`${a + c}*a+(${b + d})`)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 30:
          if (choice([true, false])) {
            a = randint(1, 4) * 4

            texte = `Chaque face d'un cube a pour périmètre $${a}$ cm.<br>
                    Quel est le volume de ce cube ?`
            texteCorr = `La longueur de l'arête du cube est $${a}\\div 4=${a / 4}$.<br>
                    Le volume du cube est donc $${a / 4}^3=${a ** 3 / 64}$ cm$^3$.`
            reponse = (a / 4) ** 3
          } else {
            a = randint(1, 4)

            texte = `Chaque face d'un cube a pour aire $${a ** 2}$ cm$^2$.<br>
                      Quel est le volume de ce cube ?`
            texteCorr = `La longueur de l'arête du cube est $${a}$.<br>
                      Le volume du cube est donc $${a}^3=${a ** 3}$ cm$^3$.`
            reponse = a ** 3
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm$^3$' }
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
