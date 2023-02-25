import Exercice from '../Exercice.js'
import { mathalea2d, fixeBordures, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import FractionX from '../../modules/FractionEtendue.js'
import { fraction } from '../../modules/fractions.js'
import {
  point, grille, droiteGraduee, plot, segment, milieu, codageAngle, rotation, tracePoint, codageAngleDroit, afficheMesureAngle, labelPoint, texteParPosition, polygoneAvecNom, polygone
} from '../../modules/2d.js'
import { round, min } from 'mathjs'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, miseEnEvidence, stringNombre, randint, texNombre, prenomF, parentheseSinegatif, prenomM, texPrix, shuffle, choice, sp, arrondi, texteEnCouleur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import Grandeur from '../../modules/Grandeur.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Decimal from 'decimal.js'
export const titre = 'CAN 5ième sujet 2023'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '17/02/2023' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Aléatoirisation du sujet 2023 de CAN 5e
 * Gilles Mora
 * Référence can5a-2023
*/

function compareNombres (a, b) {
  return a - b
}

export default function SujetCAN2023Cinquieme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 30
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
    const nbQ1 = min(round(this.nbQuestions * 10 / 30), 10) // Choisir d'un nb de questions de niveau 1 parmi les 8 possibles.
    const nbQ2 = min(this.nbQuestions - nbQ1, 20)
    const typeQuestionsDisponiblesNiv1 = shuffle([13]).slice(-nbQ1).sort(compareNombres)//, 2, 3, 4, 5, 6, 7, 8, 9, 10
    const typeQuestionsDisponiblesNiv2 = shuffle([13]).slice(-nbQ2).sort(compareNombres)//, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))

    for (let i = 0, index = 0, nbChamps, m, n, num, den, params, origine, ang1, s3, texte, texteCorr, reponse, prenom1, prenom2, prix, pol, pol2, L, l, l2, E, F, G, H, maListe, taille1, res, chiffre, chiffre2, propositions, choix, a, b, c, d, e, f, k, s1, s2, A, B, C, D, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[i]) {
        case 1:
          a = randint(4, 9)
          b = randint(4, 9)
          texte = `$${a} \\times ${b}=$ `
          texteCorr = `$${a} \\times ${b}=${miseEnEvidence(a * b)}$`
          reponse = a * b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break
        case 2:
          a = randint(1, 3)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          d = randint(1, 9, [a, b, c])
          e = randint(1, 9, [a, b, c, d])
          f = randint(1, 9, [a, b, c, d, e])
          n = new Decimal(a * 100 + b * 10 + c + d * 0.1 + e * 0.01 + f * 0.001)
          m = choice(['centaines', 'dizaines', 'dixièmes', 'centièmes', 'millièmes'])
          texte = `Dans $${texNombre(n)}$ quel est le chiffre des ${m} ? `
          switch (m) {
            case 'centaines':
              reponse = a
              break
            case 'dizaines':
              reponse = b
              break
            case 'dixièmes':
              reponse = d
              break
            case 'centièmes':
              reponse = e
              break
            case 'millièmes':
              reponse = f
              break
          }

          texteCorr = `Le chiffre des ${m} est $${miseEnEvidence(reponse)}$.<br>$
              \\begin{array}{|c|c|c|c|c|c|c|}
              \\hline
              \\text{\\small{Centaine}} &  \\text{\\small{Dizaine}} & \\text{\\small{Unité}}&  \\Large{\\textbf{,}}& \\text{\\small{Dixième}} & \\text{\\small{Centième}} & \\text{\\small{Millième}}${context.isHtml ? '\\\\' : '\\tabularnewline'}
              \\hline
              ${a}&${b}&${c} & \\Large{\\textbf{,}}& ${d}&${e}& ${f}${context.isHtml ? '\\\\' : '\\tabularnewline'}
              \\hline
              \\end{array}
              $
              `
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'largeur15 inline')
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          }
          nbChamps = 1

          break
        case 3:
          a = randint(14, 19)
          b = choice([20, 25, 35, 45, 55])

          d = choice([10, 30, 40, 50])
          reponse = 60 - b + d
          prenom1 = prenomF()
          texte = `${prenom1} part à  $${a}$ h $${b}$ min et arrive à  $${a + 1}$ h $${d}$ min.<br>
            Quelle est la durée de son trajet ?`
          texteCorr = `Pour atteindre $${a + 1}$ h, il faut $${60 - b}$ min, puis il faut ajouter encore $${d}$       
             min pour atteindre $${a + 1}$ h $${d}$ min. Son trajet aura  duré  $${miseEnEvidence(60 - b + d)}$ min.`

          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'largeur15 inline', { texteApres: sp(5) + 'min' })
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          }
          nbChamps = 1

          break

        case 4:

          if (choice([true, false])) {
            k = randint(12, 18)
            reponse = 3 * k
            texte = `Le triple de $${k}$ est :`
            texteCorr = `Le triple de $${k}$ est : $${k}\\times 3=${miseEnEvidence(reponse)}$.`

            reponse = 3 * k
          } else {
            k = randint(21, 29)
            reponse = 2 * k
            texte = `Le double de $${k}$ est :`
            texteCorr = `Le double de $${k}$ est : $${k}\\times 2=${miseEnEvidence(reponse)}$.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 5:
          if (choice([true, false])) {
            ang1 = choice([20, 30, 40, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160])
            A = point(0, 0, 'A', 'below')
            B = point(6, 0, 'B', 'below')
            origine = point(3, 0, 'O', 'below')
            C = rotation(B, origine, ang1)
            s1 = segment(A, B)
            s2 = segment(origine, C)

            xmin = -1
            ymin = -1
            xmax = 6.5
            ymax = 2.5
            objets = []
            reponse = 180 - ang1
            objets.push(
              texteParPosition('?', 2.3, 0.4), afficheMesureAngle(B, origine, C, 'black', 1),
              tracePoint(A, B),
              s1, s2, labelPoint(A, origine, B), codageAngle(C, origine, A, 0.6))
            reponse = 180 - ang1
            texte = '$A$, $O$ et $B$ sont alignés.<br>'
            texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.8, style: 'margin: auto' }, objets) + '<br>'
            texte += ' <br>? $=$'
            texteCorr = `Un angle plat a une mesure de  $180°$.<br>
             Ainsi, ?$=180-${ang1}=${miseEnEvidence(180 - ang1)}°$.`
          } else {
            ang1 = choice([20, 30, 40, 60, 70, 110, 120, 130, 140, 150, 160])
            A = point(0, 0, 'A', 'below')
            B = point(3, 0, 'B', 'below')
            origine = point(0, 0, 'O', 'below')
            C = rotation(B, origine, ang1)
            D = rotation(B, origine, 90)
            s1 = segment(origine, B)
            s2 = segment(origine, C)
            s3 = segment(origine, D)
            xmin = -2
            ymin = -1
            xmax = 4
            ymax = 2.5
            objets = []
            reponse = 180 - ang1
            if (ang1 < 90) {
              objets.push(
                texteParPosition('?', 0.1, 0.7), afficheMesureAngle(B, origine, C, 'black', 1),
                tracePoint(D, B),
                s1, s2, s3, labelPoint(D, origine, B), codageAngleDroit(B, origine, D), codageAngle(D, origine, C, 0.6))
              reponse = 90 - ang1
              texte = 'L\'angle $\\widehat{BOD}$ est un angle droit.<br>'
              texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.8, style: 'margin: auto' }, objets) + '<br>'
              texte += ' <br>? $=$'
              texteCorr = `
               ?$=90-${ang1}=${miseEnEvidence(90 - ang1)}°$.`
            } else {
              objets.push(texteParPosition('?', -0.2, 0.7), afficheMesureAngle(B, origine, C, 'black', 1),
                tracePoint(D, B),
                s1, s2, s3, labelPoint(D, origine, B), codageAngleDroit(B, origine, D), codageAngle(D, origine, C, 0.6))
              reponse = ang1 - 90
              texte = 'L\'angle $\\widehat{BOD}$ est un angle droit.<br>'
              texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.8, style: 'margin: auto' }, objets) + '<br>'
              texte += ' <br>? $=$'
              texteCorr = `?$=${ang1}-90=${miseEnEvidence(ang1 - 90)}°$.  `
            }
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '°' } else { texte += ' $\\ldots °$' }

          nbChamps = 1

          break
        case 6:
          if (choice([true, false])) {
            a = new Decimal(randint(101, 199)).div(10)
            reponse = new Decimal(a).mul(100)
            texte = `$${texNombre(a, 1)}$ m$^2$  $=$`

            texteCorr = `
        Comme $1$ m$^2$ $=100$ dm$^2$, alors $${texNombre(a, 1)}$ m$^2$  $=${texNombre(a, 1)}\\times 100$ dm$^2=${miseEnEvidence(texNombre(reponse, 0))}$ dm$^2$. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'dm$^2$'
            } else { texte += '  $\\ldots$ dm$^2$' }
          } else {
            a = new Decimal(randint(101, 199)).div(10)
            reponse = new Decimal(a).div(100)
            texte = `$${texNombre(a, 1)}$ dm$^2$  $=$`

            texteCorr = `
        Comme $1$ dm$^2$ $=0,01$ m$^2$, alors $${texNombre(a, 1)}$ dm$^2$  $=${texNombre(a, 1)}\\times 0,01$ m$^2=${miseEnEvidence(texNombre(reponse, 3))}$ m$^2$. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'm$^2$'
            } else { texte += '  $\\ldots$ m$^2$' }
          }
          break

        case 7:
          if (choice([true, false])) {
            a = randint(2, 6)
            k = randint(2, 4)
            b = k * a
            reponse = k * b
            texte = `$${a}$ classeurs identiques coûtent $${b}$ €, combien coûtent $${b}$ classeurs ? `

            texteCorr = `$${a}$ classeurs coûtent $${b}$ €.<br>
            $${k}\\times${a}=${k * a}$ classeurs coûtent $${k}\\times${b}=${miseEnEvidence(k * b)}$ €.`
          } else {
            a = randint(1, 4) * 2
            k = choice([new Decimal('1.5'), new Decimal('2.5')])
            b = k * a
            reponse = new Decimal(b).mul(k)
            texte = `$${a}$ classeurs identiques coûtent $${b}$ €, combien coûtent $${b}$ classeurs ? `

            texteCorr = `$${a}$ classeurs coûtent $${b}$ €.<br>
              $${a / 2}$ ${a / 2 === 1 ? 'classeur coûte' : 'classeurs coûtent'}  $${texPrix(b / 2)}$ €.<br>
              Ainsi,   $${b}$ classeurs coûtent ${k > 2 ? `$2\\times ${b}+ ${texPrix(b / 2)} =${miseEnEvidence(texPrix(reponse))}$ €.` : `$${b}+ ${texPrix(b / 2)} =${miseEnEvidence(texPrix(reponse))}$ €.`}`

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') +
            '€'
            }
          }
          nbChamps = 1
          break

        case 8:
          den = randint(5, 7)
          num = randint(1, 4)
          params = {
            xmin: -2.2,
            ymin: -2.2,
            xmax: 18,
            ymax: 3,
            pixelsParCm: 20,
            scale: 0.5,
            style: 'margin: auto'
          }
          f = new FractionX(num, den)
          reponse = f
          texte = 'Quelle fraction du disque représente l\'aire grisée ?<br>'
          texte += mathalea2d(params, f.representation(0, 0, 2, randint(0, den - 1), 'gateau', 'lightgray'))
          texteCorr = `L'aire grisée représente $${f.texFraction}$ de l'aire du disque.`

          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }

          break

        case 9:

          a = new Decimal(randint(41, 61, [50, 60])).div(10)
          b = new Decimal(randint(111, 149, [120, 130, 140])).div(100)
          reponse = new Decimal(a).add(b)
          texte = `$${texNombre(a, 1)}+${texNombre(b, 2)}$ `
          texteCorr = `$${texNombre(a, 1)}+${texNombre(b, 2)}=${miseEnEvidence(texNombre(reponse, 2))}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 10:
          a = randint(1, 20)
          b = randint(0, 9, 5)
          c = randint(1, 9, b)
          e = randint(1, 9)
          d = new Decimal(a + b * 0.1 + c * 0.01 + e * 0.001)
          if (choice([true, false])) {
            texte = `Quel est l'arrondi au dixième de $${texNombre(d)}$ ?`
            if (c > 4) {
              texteCorr = `Pour arrondir au dixième, on regarde le chiffre des centièmes : $${c}$.<br>
             Comme $${c}\\geqslant 5$, alors l'arrondi au dixième de $${texNombre(d)}$ est $${miseEnEvidence(texNombre(arrondi(d, 1)))}$.`
              reponse = arrondi(d, 1)
            } else {
              texteCorr = `Pour arrondir au dixième, on regarde le chiffre des centièmes : $${c}$.<br>
                Comme $${c}< 5$, alors l'arrondi au dixième de $${texNombre(d)}$  est $${miseEnEvidence(texNombre(arrondi(d, 1)))}$.`
              reponse = arrondi(d, 1)
            }
          } else {
            texte = `Quel est l'arrondi au centième de $${texNombre(d)}$ ?`
            if (e > 4) {
              texteCorr = `Pour arrondir au centième, on regarde le chiffre des millièmes : $${e}$.<br>
             Comme $${e}\\geqslant 5$, alors l'arrondi au centième de $${texNombre(d)}$ est $${miseEnEvidence(texNombre(arrondi(d, 2)))}$.`
              reponse = arrondi(d, 2)
            } else {
              texteCorr = `Pour arrondir au centième, on regarde le chiffre des millièmes : $${e}$.<br>
                Comme $${e}< 5$, alors l'arrondi au centième de $${texNombre(d)}$ est $${miseEnEvidence(texNombre(arrondi(d, 2)))}$.`
              reponse = arrondi(d, 2)
            }
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case 11:

          a = randint(-5, -1)
          d = droiteGraduee({
            Unite: 1.5,
            Min: -6,
            Max: 2,
            x: 0,
            y: 0,
            thickDistance: 1,
            thickSec: false,
            // thickSecDist: 0.5,
            // thickOffset: 0,
            axeStyle: '->',
            pointListe: [[a, 'A']],
            labelListe: [[1, `${stringNombre(1)}`], [0, `${stringNombre(0)}`]],
            pointCouleur: 'blue',
            pointStyle: 'x',
            labelsPrincipaux: false
          })

          reponse = a
          texte = 'Le point $A$ est repéré par le nombre :<br>' + mathalea2d({ xmin: -6, ymin: -1, xmax: 20, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, d) + '<br>'
          texteCorr = `Le point $A$ est repéré par le nombre : $${miseEnEvidence(texNombre(a, 2))}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 12:
          a = choice([['les trois cinquièmes', 3, 5, 2, 5], ['les trois quart', 3, 4, 1, 4], ['les deux cinquièmes', 2, 5, 3, 5], ['le tiers', 1, 3, 2, 3], ['les deux tiers', 2, 3, 1, 3], ['les quatre cinquièmes', 4, 5, 1, 5],
            ['les cinq sixièmes', 5, 6, 1, 6], ['les deux septièmes', 2, 7, 5, 7],
            ['les trois septièmes', 3, 7, 4, 7], ['les cinq septièmes', 5, 7, 2, 7],
            ['les trois dixièmes', 3, 10, 7, 10], ['les sept dixièmes', 7, 10, 3, 10], ['les neuf dixièmes', 9, 10, 1, 10]])

          reponse = new FractionX(a[3], a[4])
          texte = `On vide ${a[0]} d'une bouteille d'eau. <br>
            Quelle fraction de la bouteille est encore remplie ?`
          texteCorr = `La fraction de la bouteille encore remplie est donnée par : $1-\\dfrac{${a[1]}}{${a[2]}}=${miseEnEvidence(reponse.texFraction)}$.`

          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += '<br>' + ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 13:
          if (choice([true, false])) {
            a = new Decimal(randint(101, 199)).div(100)

            reponse = a.mul(-1)
            texte = `L'opposé de $${texNombre(a, 2)}$ est :`
            texteCorr = `L'opposé de $${texNombre(a, 2)}$ est : $${miseEnEvidence(texNombre(reponse, 2))}$.`
          } else {
            a = new Decimal(randint(-199, -101)).div(100)

            reponse = a.mul(-1)
            texte = `L'opposé de  $${texNombre(a, 2)}$ est :`
            texteCorr = `L'opposé de $${texNombre(a, 2)}$ est : $-(${texNombre(a, 2)})=${miseEnEvidence(texNombre(reponse, 2))}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 14:
          a = new Decimal(randint(1, 9)).div(10)
          b = new Decimal(randint(1, 9)).add(a)
          res = choice([10, 20])
          reponse = new Decimal(res).sub(b)
          texte = `Complète : <br>
          $${texNombre(b, 1)}+\\ldots =${res}$ `
          texteCorr = `Le nombre cherché est donné par : $${res}-${texNombre(b, 1)}=${miseEnEvidence(texNombre(reponse, 2))}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 15:
          a = new Decimal(2 * randint(2, 39, [10, 20, 30])).div(100)

          reponse = new Decimal(a).div(2)
          texte = `La moitié de  $${texNombre(a, 2)}$ est `
          texteCorr = `La moitié de $${texNombre(a, 2)}$ est $ ${texNombre(a, 2)}\\div 2=${texNombre(reponse, 2)}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 16:
          b = randint(2, 4)
          a = randint(b + 1, 6)
          c = randint(1, a - 1)
          d = randint(1, b)
          e = randint(0, c - 1)
          f = randint(d, b)
          A = polygone([point(0, 0), point(c, 0), point(c, d), point(e, d), point(e, f), point(0, f)], 'black')
          A.couleurDeRemplissage = colorToLatexOrHTML('lightgray')

          C = grille(0, 0, a, b, 'black', 1, 1, false)
          D = point(1 + a, 4 - b)

          texte = `Quelle fraction de la surface totale représente la surface grisée ?
          <br>`
          texte += mathalea2d({ xmin: -1, ymin: -0.1, xmax: 12.1, ymax: b + 1, scale: 0.3 }, A, C)
          texteCorr = `Il y a $${c * d + e * f - e * d}$ ${c * d + e * f - e * d > 1 ? 'carrés' : 'carré'} gris sur un total de $${a * b}$ carrés, la surface grisée représente donc $\\dfrac{${miseEnEvidence(c * d + e * f - e * d)}}{${miseEnEvidence(a * b)}}$ de la surface totale.`
          reponse = new FractionX(c * d + e * f - e * d, a * b)
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 17:
          a = randint(5, 9)
          b = randint(4, 9)
          c = a * b
          reponse = b
          texte = `Calcule $${c}\\div ${a}$.`
          texteCorr = `$${c}\\div ${a}=${miseEnEvidence(reponse)}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case 18:
          if (choice([true, false])) {
            a = choice([4, 6, 8, 10, 12, 14])
            b = a + a / 2

            reponse = arrondi(2 * b, 0)
            texte = `Si une pile de $${a}$ pièces de monnaie a une hauteur de $${2 * a}$ mm, alors une pile de 
          $${texNombre(b, 0)}$ pièces a une hauteur de`

            texteCorr = `Une pile de $${a}$ pièces de monnaie a une hauteur de $2\\times ${a}=${2 * a}$ mm.<br>
            Donc une pile de  $${texNombre(b, 0)}$ pièces aura une hauteur de $2\\times ${b}=${miseEnEvidence(2 * b)}$ mm.`

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') +
            'mm'
            } else { texte += '$\\ldots$ mm' }
          } else {
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
          }
          nbChamps = 1

          break

        case 19:
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
              texteParPosition('1 unité', milieu(C, D).x, milieu(C, D).y + 0.5),
              a, s1, s2, labelPoint(A, B), point(A, B))
            reponse = fraction(b, 4)
            texte = `Quelle est la longueur du segment $[AB]$ ? <br>
            `
            texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 0.3, style: 'margin: auto' }, objets)
            texteCorr = `Une unité correspond à $4$ carreaux, le segment $[AB]$ mesure $${b}$ carreaux, soit $\\dfrac{${b}}{4}=${miseEnEvidence(texNombre(b / 4))}$ unité. `
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
              texteParPosition('1 unité', milieu(C, D).x, milieu(C, D).y + 0.5),
              a, s1, s2, labelPoint(A, B), point(A, B))
            reponse = fraction(b, 5)
            texte = `Quelle est la longueur du segment $[AB]$ ? <br>
            `
            texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 25, mainlevee: false, amplitude: 0.5, scale: 0.3, style: 'margin: auto' }, objets)
            texteCorr = `Une unité correspond à $5$ carreaux, le segment $[AB]$ mesure $${b}$ carreaux, soit $\\dfrac{${b}}{5}=${miseEnEvidence(texNombre(b / 5))}$ unité. `
          }
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) {
            texte += '<br>' + ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'unité'
          } else { texte += ' <br>$\\ldots$ unité' }

          nbChamps = 1
          break
        case 20:
          a = randint(11, 19)
          b = randint(2, 7) * 100

          reponse = a * b
          texte = ` $${a}\\times ${b}=$`
          texteCorr = `$${a}\\times ${b}=${a}\\times ${texNombre(b / 100)}\\times 100=${miseEnEvidence(texNombre(reponse))}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 21:

          a = choice([2, 3, 4, 6]) // diviseur de l'heure
          b = 60 / a // nombre de minutes de l'énoncé
          if (a === 4) { c = choice([40, 80, 100]) } else { c = choice([30, 60, 90, 120]) }
          reponse = arrondi(c / a, 0)
          texte = `Une voiture roule à vitesse constante de $${c}$ km/h. <br>Combien de kilomètres 
        parcourt-elle en $${b}$ min ?`
          texteCorr = `La voiture parcourt $${texNombre(c / a, 0)}$ km.<br>
       En $${b}$ minutes, elle parcourt $${a}$ fois moins de km qu'en $1$ heure, soit $\\dfrac{${c}}{${a}}=
        ${miseEnEvidence(texNombre(c / a, 0))}$ km.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km' }
          nbChamps = 1

          break

        case 22:

          a = choice([3, 4, 6]) // diviseur de l'heure
          b = 60 / a // nombre de minutes de l'énoncé
          d = randint(1, 3)
          if (a === 4) { c = choice([40, 80, 100]) } else { c = choice([30, 60, 90, 120]) }
          if (a === 3) { e = randint(1, 2) } else { e = randint(1, 3) }
          reponse = arrondi(d * c + e * c / a, 0)
          texte = `Une voiture roule à vitesse constante de $${c}$ km/h.<br> Combien de kilomètres parcourt-elle 
        en $${d}$ h et $${b * e}$ min ?`
          texteCorr = `
        En $${d}$ h, elle parcourt $${d * c}$ km.<br>
       En $${b * e}$ min, elle parcourt $${texNombre(e * c / a, 0)}$ km.<br>
        Ainsi, en en $${d}$ h et $${b * e}$ min, elle parcourt donc $${miseEnEvidence(texNombre(d * c + e * c / a, 0))}$ km.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km' }
          nbChamps = 1
          break

        case 23:
          a = randint(3, 9)
          b = randint(3, 9)
          c = a * b

          reponse = b
          texte = `Dans $${c}$ combien de fois $${a}$ ?`
          texteCorr = `Dans $${c}$, il y a $${miseEnEvidence(b)}$ fois $${a}$ car $${a}\\times ${b}=${c}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 24:
          if (choice([true, false])) {
            a = randint(2, 9)
            d = new Decimal(randint(21, 99, [30, 40, 50, 60, 70, 80, 90])).div(10)
            c = new Decimal(a * 100).add(d)

            reponse = new Decimal(d).mul(10)
            texte = `Complète.
            <br>$${a}$ centaines et $\\ldots$ dixièmes font $${texNombre(c, 1)}$.`
            texteCorr = `
               $${a}$ centaines $=${a * 100}$.<br>
               $${texNombre(d, 1)}= ${texNombre(d * 10, 0)}$ dixièmes. <br>
               Ainsi, $${a}$ centaines et $${miseEnEvidence(texNombre(d * 10, 0))}$ dixièmes font $${texNombre(c, 1)}$.`
          } else {
            a = randint(2, 9)
            d = new Decimal(randint(21, 99, [30, 40, 50, 60, 70, 80, 90])).div(100)
            c = new Decimal(a * 10).add(d)

            reponse = new Decimal(d).mul(100)
            texte = `Complète.
            <br>$${a}$ dizaines et $\\ldots$ centièmes font $${texNombre(c, 2)}$.`
            texteCorr = `
                     $${a}$ dizaines $=${a * 10}$.<br>
                     $${texNombre(d, 2)}= ${texNombre(d * 100, 0)}$ centièmes. <br>
                     Ainsi, $${a}$ dizaines et $${miseEnEvidence(texNombre(d * 100, 0))}$ centièmes font $${texNombre(c, 2)}$.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 25:
          if (choice([true, false])) {
            prenom1 = prenomF()
            f = [[3, 5], [6, 5], [7, 5], [8, 5], [3, 2], [5, 2], [9, 5], [7, 2]]
            a = randint(0, 7)
            b = randint(2, 4)
            A = polygone([point(1, 5), point(11, 5), point(11, 4), point(1, 4)], 'black')
            A.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            B = texteParPosition('1 uA', 6, 4.5, 'milieu', 'black', 1, 'middle', false)
            C = grille(0, 0, 12, 5, 'black', 1, 1, false)
            D = point(1 + a, 4 - b)

            texte = `${prenom1} veut construire une figure d'aire $\\dfrac{${f[a][0]}}{${f[a][1]}}$ ${f[a][0] > f[a][1] > 2 ? 'unités' : 'unité'} d'aire (uA).<br>
        
            Combien de petits carreux doit-elle contenir ?
            <br>

        `
            texte += mathalea2d({ xmin: -1, ymin: -0.1, xmax: 12.1, ymax: 5.5, scale: 0.3 }, C, A, B)
            texteCorr = '$1$ uA est représentée par $10$ petits carreaux. <br>'
            texteCorr += `$\\dfrac{1}{${f[a][1]}}$ d'unité d'aire est donc rerésentée par $${texNombre(10 / f[a][1], 0)}$ petits carreaux. <br>
          Ainsi, une figure de $\\dfrac{${f[a][0]}}{${f[a][1]}}$ d'unité d'aire se représente par une figure de $${texNombre(10 / f[a][1] * f[a][0], 0)}$ petits carreaux.`
            reponse = 10 / f[a][1] * f[a][0]
          } else {
            prenom1 = prenomF()
            f = [[5, 4], [7, 4], [3, 2], [5, 2], [7, 2], [3, 4], [9, 4]]

            a = randint(0, 6)
            b = randint(2, 4)
            A = polygone([point(1, 5), point(3, 5), point(3, 3), point(1, 3)], 'black')
            A.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            B = texteParPosition('1 uA', 2, 5.4, 'milieu', 'black', 1, 'middle', false)
            C = grille(0, 0, 12, 5, 'black', 1, 1, false)

            texte = `${prenom1} veut construire une figure d'aire $\\dfrac{${f[a][0]}}{${f[a][1]}}$ ${f[a][0] / f[a][1] > 2 ? 'unités' : 'unité'} d'aire (uA).<br>
          
            Combien de petits carreux doit-elle contenir ?<br>

          `
            texte += mathalea2d({ xmin: -1, ymin: -0.1, xmax: 12.1, ymax: 6, scale: 0.3 }, A, C, B)
            if (f[a][1] === 4) {
              texteCorr = '$1$ uA est représentée par  $4$ petits carreaux. <br>'
              texteCorr += `$\\dfrac{1}{${f[a][1]}}$ d'unité d'aire est donc rerésentée par un petit carreau. <br>
          Ainsi, une figure de $\\dfrac{${f[a][0]}}{${f[a][1]}}$ d'unité d'aire se représente par une figure de $${miseEnEvidence(f[a][0])}$ petits carreaux.`
              reponse = f[a][0]
            } else {
              texteCorr = '$1$ uA est représentée par $4$ petits carreaux. <br>'
              texteCorr += `$\\dfrac{1}{${f[a][1]}}$ d'unité d'aire est donc rerésentée par deux petits carreaux. <br>
          Ainsi, une figure de $\\dfrac{${f[a][0]}}{${f[a][1]}}$ d'unité d'aire se représente par une figure de $${miseEnEvidence(2 * f[a][0])}$ petits carreaux.`
              reponse = 2 * f[a][0]
            }
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'petits carreaux.' }
          nbChamps = 1
          break

        case 26:
          if (choice([true, false])) {
            a = choice([1, 2, 3, 4, 6, 7, 8, 9]) // numérateur
            reponse = a / 5
            texte = 'Quel est le nombre écrit sous le point d\'interrogation ?<br>'

            texte += mathalea2d({ xmin: -1, ymin: -1.5, xmax: 14, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, texteParPosition('?', 3 * a / 5, 0.9, 'milieu', 'blue', 2), droiteGraduee({
              Unite: 3,
              Min: 0,
              Max: 3.2,
              x: 0,
              y: 0,
              thickSecDist: 1 / 5,
              thickSec: true,
              thickoffset: 0,
              axeStyle: '|->',
              pointListe: [[a / 5, '']],
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true,
              step1: 1,
              step2: 1
            }))
            texteCorr = `Le nombre écrit sous le point d'interrogation est : $${miseEnEvidence(texNombre(reponse, 1))}$.`
          } else {
            a = randint(121, 139, [130]) / 100
            reponse = a
            texte = 'Quel est le nombre écrit sous le point d\'interrogation ?<br>'

            texte += mathalea2d({ xmin: -1, ymin: -1.5, xmax: 14, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, droiteGraduee({
              Unite: 50,
              Min: 1.2,
              Max: 1.4,
              x: 0,
              y: 0,
              thickDistance: 0.1,
              thickSecDist: 1 / 100,
              thickSec: true,
              thickoffset: 0,
              axeStyle: '|->',
              pointListe: [[a, '?']],
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true,
              labelListe: [[1.2, `${stringNombre(1.2, 1)}`], [1.3, `${stringNombre(1.3, 1)}`]],
              step1: 1,
              step2: 1
            }))
            texteCorr = `Le nombre écrit sous le point d'interrogation est : $${miseEnEvidence(texNombre(reponse, 2))}$.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 27:
          if (choice([true, false])) {
            a = randint(2, 6)
            prix = new Decimal(2 + randint(1, 3) / 10).add(0.05)
            k = randint(2, 4)
            reponse = new Decimal(prix).mul(k)
            texte = `$${a}$ stylos identiques coûtent  $${texPrix(prix)}$ €. <br>
              Combien coûtent $${k * a}$ de ces mêmes stylos ?`

            texteCorr = `$${a}$ stylos identiques coûtent  $${texPrix(prix)}$ €, donc $${k * a}$
             de ces mêmes stylos coûtent  $${k}$ fois plus, soit $${k}\\times ${texPrix(prix)}=${miseEnEvidence(texNombre(k * prix))}$ €.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' €' }
          } else {
            prix = choice([new Decimal('1.20'), new Decimal('1.80'), new Decimal('2.40')])
            k = randint(3, 4)

            reponse = new Decimal(prix).div(k).mul(100)
            texte = `$${k * 2}$ cahiers coûtent  $${texPrix(prix)}$ €. <br>
                Combien coûtent $2$ cahiers ?`

            texteCorr = `$${k * 2}$ cahiers coûtent  $${texPrix(prix)}$ €, donc $2$
               de ces mêmes cahiers coûtent  $${k}$ fois moins, soit $ ${texPrix(prix)}\\div${k}=${texPrix(prix / k)}$ € $=${miseEnEvidence(texNombre(100 * prix / k, 0))}$ centimes.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' centimes' }
          }

          nbChamps = 1
          break

        case 28:
          if (choice([true, false])) {
            l = randint(2, 8)
            k = randint(2, 5)
            L = k * l
            l2 = l + randint(1, 3)
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
            objets.push(texteParPosition(`${stringNombre(l)} cm`, milieu(F, G).x + 0.7, milieu(F, G).y),
              texteParPosition(`${stringNombre(L)} cm`, milieu(E, F).x, milieu(E, F).y - 0.3),
              texteParPosition(`${stringNombre(l2)} cm`, milieu(B, C).x + 0.7, milieu(B, C).y),
              texteParPosition('A ', milieu(F, G).x - 1.2, milieu(F, G).y),
              texteParPosition('B ', milieu(B, C).x - 2, milieu(B, C).y)
            )
            reponse = l2 * k
            texte = 'Le rectangle B est un agrandissement du rectangle A.'
            texte += `Quelle est la longueur du rectangle B ?
            <br>`
            texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)

            texteCorr = `La longueur du rectangle A est $${k}$ fois plus grande que sa largeur. On en déduit que la longueur du rectangle B est aussi $${k}$ fois plus grande que sa largeur.<br>
          Elle est donc égale à $${l2}\\times ${k}=${miseEnEvidence(k * l2)}$ cm.
                  `
          } else {
            L = randint(3, 5) * 2 // Longueur grand rectngle
            l = randint(2, 5) // Largeur grand rectngle
            k = L - randint(1, 2)
            // L = k * l
            l2 = L / 2// long petit
            A = point(0, 0)
            B = point(2.5, 0)
            C = point(2.5, 1)
            D = point(0, 1)
            E = point(0, 2)
            F = point(4, 2)
            G = point(4, 4)
            H = point(0, 4)
            xmin = -1
            ymin = -0.5
            xmax = 5.5
            ymax = 4.5
            pol = polygoneAvecNom(A, B, C, D)
            pol2 = polygoneAvecNom(E, F, G, H)
            objets = []
            objets.push(pol[0]) //, pol[1]
            objets.push(pol2[0])
            objets.push(texteParPosition(`${stringNombre(l)} cm`, milieu(F, G).x + 0.7, milieu(F, G).y),
              texteParPosition(`${stringNombre(L)} cm`, milieu(E, F).x, milieu(E, F).y - 0.3),
              texteParPosition(`${stringNombre(l2)} cm`, milieu(A, B).x, milieu(A, B).y - 0.3),
              texteParPosition('A ', milieu(E, F).x, milieu(F, G).y),
              texteParPosition('B ', milieu(A, B).x, milieu(B, C).y)
            )
            reponse = new Decimal(l).div(2)
            texte = 'Le rectangle B est une réduction du rectangle A.<br>'
            texte += 'Quelle est la largeur du rectangle B ?<br>'
            texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)

            texteCorr = `La longueur du rectangle A est $2$ fois plus grande que la longeur du rectangle B. On en déduit que la largeur  du rectangle B est aussi $2$ fois plus petite que la largeur du rectangle A.<br>
                    Elle est donc égale à $${l}\\div 2=${miseEnEvidence(texNombre(reponse, 1))}$ cm.
                            `
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' }
          nbChamps = 1
          break

        case 29:
          a = new Decimal(randint(101, 199)).div(100)
          b = new Decimal(randint(4, 9)).div(10)

          reponse = new Decimal(a).add(b)
          texte = `$${texNombre(a, 2)}+ ${texNombre(b, 1)}=$`
          texteCorr = `$${texNombre(a, 2)}+ ${texNombre(b, 1)}=${miseEnEvidence(texNombre(reponse))}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 30:
          if (choice([true, false])) {
            a = randint(2, 3)
            b = randint(2, 3)
            c = randint(2, 3)
            texte = `À la cantine, il y a toujours $${a}$ entrées différentes, $${b}$ plats différents et $${c}$ desserts différents.<br>
            Combien de menus (composés d'une entrée, d'un plat et d'un dessert) différents peut-on avoir dans cette cantine ?`
            texteCorr = `On peut avoir : $${a}\\times ${b}\\times ${c} =${miseEnEvidence(a * b * c)}$ menus diférents.`
            reponse = a * b * c
          } else {
            a = randint(2, 5)
            b = randint(2, 5)

            texte = `En prenant un plat au choix parmi $${a}$ plats et un dessert au choix parmi $${b}$ desserts.<br>
            Combien de repas différents peut-on réaliser ?  `
            texteCorr = `On peut avoir : $${a}\\times ${b}=${miseEnEvidence(a * b)}$ repas diférents.`
            reponse = a * b
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
