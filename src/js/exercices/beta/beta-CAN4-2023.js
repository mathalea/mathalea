import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML, fixeBordures } from '../../modules/2dGeneralites.js'
import FractionX from '../../modules/FractionEtendue.js'
import { obtenirListeFractionsIrreductibles } from '../../modules/fractions.js'
import { scratchblock } from '../../modules/scratchblock.js'
import {
  point, droiteGraduee, pave, droite, segment, milieu, codageAngle, rotation, labelPoint, tracePoint, codageAngleDroit, texteParPosition, polygone
} from '../../modules/2d.js'
import { paveLPH3d } from '../../modules/3d.js'
import { round, min } from 'mathjs'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, miseEnEvidence, texFractionReduite, printlatex, stringNombre, randint, texNombre, prenomF, simplificationDeFractionAvecEtapes, texPrix, shuffle, choice, sp, arrondi, texteEnCouleur, texteEnCouleurEtGras } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import Hms from '../../modules/Hms.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Decimal from 'decimal.js'
export const titre = 'CAN 4ième sujet 2023'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '02/03/2023' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Aléatoirisation du sujet 2023 de CAN 5e
 * Gilles Mora
 * Référence can5a-2023
*/

function compareNombres (a, b) {
  return a - b
}

export default function SujetCAN2023Quatrieme () {
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
    const typeQuestionsDisponiblesNiv1 = shuffle([23]).slice(-nbQ1).sort(compareNombres)// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    const typeQuestionsDisponiblesNiv2 = shuffle([23]).slice(-nbQ2).sort(compareNombres)// 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))

    for (let i = 0, index = 0, nbChamps, m, listeFraction, poly, maFraction, n, lettre, listeTriplet, triplet, choix1, h, pav, num, den, params, origine, traceA, traceD, traceB, traceorigine, ang1, s3, K, I, J, texte, texteCorr, reponse, prenom1, pol, L, l, E, F, G, H, propositions, choix, a, b, c, d, e, f, k, s1, s2, A, B, C, D, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[i]) {
        case 1:
          a = randint(4, 9)
          b = randint(4, 9)
          texte = `$${a} \\times ${b}$ `
          texteCorr = `$${a} \\times ${b}=${miseEnEvidence(a * b)}$`
          reponse = a * b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ' $=$' + ajouteChampTexteMathLive(this, index, 'inline largeur15') }
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
            traceA = tracePoint(A)
            traceA.taille = context.isHtml ? 2 : 1
            traceB = tracePoint(B)
            traceB.taille = context.isHtml ? 2 : 1
            traceorigine = tracePoint(origine)
            traceorigine.taille = context.isHtml ? 2 : 1
            xmin = -1
            ymin = -0.8
            xmax = 6.5
            ymax = 2.5
            objets = []
            reponse = 180 - ang1
            objets.push(texteParPosition('$A$', 0, -0.55, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition('$B$', 6, -0.55, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition('$O$', 3, -0.55, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              s1, s2, traceA, traceorigine, traceB, codageAngle(C, origine, A, 0.6), codageAngle(B, origine, C, 0.5)
            )
            if (ang1 < 50) {
              objets.push(texteParPosition('?', 2.2, 0.6, 'milieu', 'black', context.isHtml ? 1 : 0.7),
                texteParPosition(`${stringNombre(ang1)}°`, 3.8, 0.2, 'milieu', 'black', context.isHtml ? 1 : 0.7))
            } else { objets.push(texteParPosition('?', 2.2, 0.2, 'milieu', 'black', context.isHtml ? 1 : 0.7), texteParPosition(`${stringNombre(ang1)}°`, 3.8, 0.5, 'milieu', 'black', context.isHtml ? 1 : 0.7)) }
            reponse = 180 - ang1
            texte = '$A$, $O$ et $B$ sont alignés.<br>'
            texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.6, style: 'margin: auto' }, objets)
            texte += '? $=$'
            texteCorr = `Un angle plat a une mesure de  $180°$.<br>
             Ainsi, ?$=180-${ang1}=${miseEnEvidence(180 - ang1)}°$.`
          } else {
            ang1 = choice([30, 40, 60, 70, 110, 120, 130, 140, 150, 160])
            A = point(0, 0, 'A', 'below')
            B = point(2, 0, 'B', 'below')
            origine = point(0, 0, 'O', 'below')
            D = point(0, 2, 'D', 'right')
            C = rotation(B, origine, ang1)
            traceD = tracePoint(D)
            traceD.taille = context.isHtml ? 2 : 1
            traceB = tracePoint(B)
            traceB.taille = context.isHtml ? 2 : 1
            traceorigine = tracePoint(origine)
            traceorigine.taille = context.isHtml ? 2 : 1
            s1 = segment(origine, B)
            s2 = segment(origine, C)
            s3 = segment(origine, D)
            xmin = -2
            ymin = -0.8
            xmax = 4
            ymax = 2.5
            objets = []
            reponse = 180 - ang1
            objets.push(
              traceD, traceB, texteParPosition('$D$', 0.2, 1.8, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition('$B$', 2, -0.55, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition('$O$', 0, -0.55, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              s1, s2, s3, traceorigine, codageAngleDroit(B, origine, D, 'black', 0.3), codageAngle(B, origine, C, 0.8),
              codageAngle(D, origine, C, 0.4))

            if (ang1 < 90) {
              objets.push(
                texteParPosition('?', 0.2, 0.8, 'milieu', 'black', context.isHtml ? 1 : 0.7),
                texteParPosition(`${stringNombre(ang1)}°`, 1.2, 0.3, 'milieu', 'black', context.isHtml ? 1 : 0.5))

              reponse = 90 - ang1
              texte = 'L\'angle $\\widehat{BOD}$ est un angle droit.<br>'
              texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.8, style: 'margin: auto' }, objets)
              texte += '? $=$'
              texteCorr = `
               ?$=90-${ang1}=${miseEnEvidence(90 - ang1)}°$.`
            } else {
              objets.push(texteParPosition('?', -0.15, 0.6, 'milieu', 'black', context.isHtml ? 1 : 0.7),
                texteParPosition(`${stringNombre(ang1)}°`, 1, 0.8, 'milieu', 'black', context.isHtml ? 1 : 0.7))

              reponse = ang1 - 90
              texte = 'L\'angle $\\widehat{BOD}$ est un angle droit.<br>'
              texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.6, style: 'margin: auto' }, objets)
              texte += '? $=$'
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
            scale: 0.4,
            style: 'margin: auto'
          }
          f = new FractionX(num, den)
          reponse = f
          texte = 'Quelle fraction du disque représente l\'aire grisée ?<br>'
          texte += mathalea2d(params, f.representation(0, 0, 2, randint(0, den - 1), 'gateau', 'gray'))
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
          if (this.interactif) { texte += ' $=$' + ajouteChampTexteMathLive(this, index, 'inline largeur15') }
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

          listeFraction = [
            [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5]
          ]
          maFraction = choice(listeFraction)
          a = randint(1, 4)
          b = maFraction[0]
          c = maFraction[1]
          f = new FractionX(b, c)
          d = new FractionX(a * c + b, c).simplifie()
          e = new FractionX(a * c - b, c).simplifie()

          if (choice([true, false])) {
            texte = `$${a}+${f.texFraction}$`
            texteCorr = `$${a}+${f.texFraction} = \\dfrac{${a} \\times ${c}}{${c}} + \\dfrac{${b}}{${c}} = \\dfrac{${a * c}}{${c}} + \\dfrac{${b}}{${c}}  =${miseEnEvidence(d.texFraction)}$`
            reponse = d
          } else {
            texte = `$${a}-${f.texFraction}$`
            texteCorr = `$${a}-${f.texFraction} = \\dfrac{${a} \\times ${c}}{${c}} - \\dfrac{${b}}{${c}} = \\dfrac{${a * c}}{${c}} - \\dfrac{${b}}{${c}}  =${miseEnEvidence(e.texFraction)}$`
            reponse = e
          }
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break
        case 12:

          if (choice([true, false])) {
            a = randint(2, 10)
            b = randint(2, 10)
            c = randint(2, 10, [a, b])
            reponse = a * c + b
            texte = `Que vaut $${a}x+${b}$ si $x=${c}$ ?`
            texteCorr = `Pour $x=${c}$, on a $${a}x+${b}=${a}\\times ${c}+${b}=${a * c}+${b}=${miseEnEvidence(a * c + b)}$.`
          } else {
            a = randint(4, 10)
            b = randint(2, 10)
            c = randint(3, 10, [a, b])
            reponse = a * c - b
            texte = `Que vaut $${a}x-${b}$ si $x=${c}$ ?`
            texteCorr = `Pour $x=${c}$, on a  $${a}x-${b}=${a}\\times ${c}-${b}=${a * c}-${b}=${miseEnEvidence(a * c - b)}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case 13:

          a = new Decimal(randint(21, 69, [30, 40, 50, 60])).div(10)
          choix = choice(['a', 'b'])

          if (choix === 'a') {
            reponse = a
            texte = `$${texNombre(a, 1)}$ dm$^3=$`
            texteCorr = `$1$ dm$^3= 1$ L, donc $${texNombre(a, 1)}$ dm$^3=${miseEnEvidence(texNombre(a, 1))}$ L.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'L' } else { texte += ' $\\ldots$ L' }
          }
          if (choix === 'b') {
            reponse = new Decimal(a).mul(1000)
            texte = `$${texNombre(a, 1)}$ m$^3$ $=$`
            texteCorr = `$1$ m$^3= ${texNombre(1000)}$ L, donc $${texNombre(a, 1)}$ m$^3= ${miseEnEvidence(texNombre(a * 1000))}$ L.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'L' } else { texte += ' $\\ldots$ L' }
          }

          nbChamps = 1
          break
        case 14:
          a = randint(3, 10)
          b = a - randint(-1, 1, 0)
          choix1 = choice([true, false])
          reponse = choix1 ? `${a};${a + b}` : `${b};${a + b}`
          texte = `Une urne contient $${a}$ boules rouges et $${b}$ boules vertes. <br>
            On tire une boule au hasard. <br>
            Compléte : « On a $\\ldots$ chances sur $\\ldots$ de tirer une boule ${choix1 ? 'rouge' : 'verte'} ». `
          texteCorr = `Dans l'urne, il y a $${a}$ boules rouges et $${b}$ boules vertes, soit un total de $${a + b}$ boules. <br>
            On a donc $${miseEnEvidence(choix1 ? `${a}` : `${b}`)}$ chances sur $${miseEnEvidence(a + b)}$ de tirer une boule ${choix1 ? 'rouge' : 'verte'}.`

          setReponse(this, index, reponse, { formatInteractif: 'texte' })
          if (this.interactif) {
            texte += '<br>Écrire les deux nombres  séparés par un point virgule.'
            texte += ajouteChampTexteMathLive(this, index, 'largeur15 inline')
          }
          nbChamps = 1
          break

        case 15:

          reponse = 5
          texte = 'Le nombre de faces de ce solide est : '
          texteCorr = ''

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 16:
          a = choice(obtenirListeFractionsIrreductibles())
          c = choice([2, 3])
          b = new FractionX(1, a.d * c)
          if (choice([true, false])) {
            texte = `Calculer $${a.texFraction} - ${b.texFraction}$.`
            texteCorr = `$${a.texFraction} - ${b.texFraction}=
   \\dfrac{${a.n}\\times ${c}}{${a.d}\\times ${c}}- ${b.texFraction}
    =${a.reduire(c).texFraction} - ${b.texFraction}=\\dfrac{${a.n * c}-${b.n}}{${b.d}}=\\dfrac{${miseEnEvidence(a.n * c - b.n)}}{${miseEnEvidence(b.d)}}${simplificationDeFractionAvecEtapes(a.n * c - b.n, b.d)}$`
            reponse = a.differenceFraction(b).simplifie()
          } else {
            texte = `Calculer $${a.texFraction} + ${b.texFraction}$.`
            texteCorr = `$${a.texFraction} + ${b.texFraction}=
   \\dfrac{${a.n}\\times ${c}}{${a.d}\\times ${c}}+ ${b.texFraction}
    =${a.reduire(c).texFraction} + ${b.texFraction}=\\dfrac{${a.n * c}+${b.n}}{${b.d}}=\\dfrac{${miseEnEvidence(a.n * c + b.n)}}{${miseEnEvidence(b.d)}}${simplificationDeFractionAvecEtapes(a.n * c + b.n, b.d)}$`
            reponse = a.sommeFraction(b).simplifie()
          }
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 17:

          a = randint(2, 10)
          b = randint(2, 10)
          reponse = a * b
          texte = '\\begin{scratch}[print,fill,blocks,scale=0.8]\n \\blockinit{quand \\greenflag est cliqué}\n '
          texte += "\\blockpen{stylo en position d'écriture}\n"
          texte += `\\blockrepeat{répéter \\ovalnum{${a}} fois}\n`
          texte += `\\blockmove{avancer de \\ovalnum{${b}} pas}\n`
          texte += '} \n'
          texte += '\\end{scratch}'
          texteCorr = `Le stylo avance de $${a}\\times ${b}}=${a * b}$ pas.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 18:
          if (choice([true, false])) {
            a = randint(3, 6)
            b = randint(4, 5)
            c = a * b
            b = b * 2
            A = point(0, 0, 'A', 'below')
            B = point(0, 4, 'B', 'above')
            C = point(6, 0, 'C', 'below')
            poly = polygone([A, B, C], 'black')
            poly.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            d = texteParPosition(`${stringNombre(c)} cm²`, 1.5, 1.5, 'milieu', 'black', context.isHtml ? 1 : 0.7)
            e = texteParPosition(`${stringNombre(a)} cm`, -0.7, 2, 'milieu', 'black', context.isHtml ? 1 : 0.7)
            poly.epaisseur = 1
            reponse = b
            texte = 'On donne la figure suivante :<br>'

            texte += mathalea2d({ xmin: -1.5, ymin: -1, xmax: 7.1, ymax: 5, scale: 0.5 }, poly, labelPoint(A, B, C), codageAngleDroit(B, A, C), d, e) + '<br>'
            texteCorr = `L'aire du triangle est $\\dfrac{\\text{AB}\\times \\text{AC}}{2}=\\dfrac{${a}\\times \\text{AC}}{2}$.<br>
          On obtient ainsi,  $\\dfrac{${a}\\times \\text{AC}}{2}=${c}$ soit $${a}\\times AC=2\\times ${c}$, soit $AC=\\dfrac{${c * 2}}{${a}}=${reponse}$ cm.`
            texte += '$AC= $'
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
            } else { texte += ' $\\ldots$ cm' }
          } else {
            listeTriplet = [[3, 4, 5], [6, 8, 10], [5, 12, 13]]
            triplet = choice(listeTriplet)
            a = triplet[0]
            b = triplet[1]
            c = triplet[2]
            A = point(0, 0, 'A', 'below')
            B = point(4, 0.5, 'B', 'below')
            C = point(1, 2, 'C', 'above')
            poly = polygone([A, B, C], 'black')
            poly.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            d = texteParPosition(`${stringNombre(a)} cm`, milieu(A, C).x - 0.5, milieu(A, C).y, 'milieu', 'black', context.isHtml ? 1 : 0.7)
            e = texteParPosition(`${stringNombre(b)} cm`, milieu(B, C).x + 0.5, milieu(B, C).y + 0.2, 'milieu', 'black', context.isHtml ? 1 : 0.7)
            f = texteParPosition(`${stringNombre(c)} cm`, milieu(B, A).x, milieu(B, A).y - 0.3, 'milieu', 'black', context.isHtml ? 1 : 0.7)

            poly.epaisseur = 1
            reponse = arrondi(a * b / 2, 0)
            texte = 'L\'aire du triangle $ABC$ est :<br>'

            texte += mathalea2d({ xmin: -1.5, ymin: -1, xmax: 5, ymax: 2.5, scale: 1, pixelsParCm: 40 }, poly, labelPoint(A, B, C), codageAngleDroit(A, C, B), d, e, f)
            texteCorr = `L'aire du triangle est $\\dfrac{\\text{AC}\\times \\text{CB}}{2}=\\dfrac{${a}\\times ${a}}{2}=${miseEnEvidence(reponse)}$ cm$^2$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm$^2$'
            }
          }

          nbChamps = 1
          break

        case 19:

          a = randint(2, 10)
          b = randint(2, 4)
          c = randint(2, 5)
          reponse = (a + b) * c

          if (context.isHtml) {
            texte = `Quel est le résultat de ce programme de calcul lorsque le nombre de départ est $${a}$.`
            texte += '<br> Nombre de départ <br>'
            texte += `${sp(8)}$\\downarrow$<br>`
            texte += '$\\begin{array}{|l|}\n'
            texte += '\\hline\n'
            texte += `\\\n \\text{Ajouter } ${b} \\\n`
            texte += `\\\\\n \\text{Multiplier par } ${c}\\\\\n `
            texte += '\\hline\n'
            texte += '\\end{array}\n$<br>'
            texte += `${sp(8)}$\\downarrow$<br>
         `
            texte += 'Résultat'
          } else {
            texte = `Quel est le résultat de ce programme de calcul lorsque le nombre de départ est $${a}$.<br>
          
          `
            texte += `Nombre de départ <br>
          
          `
            texte += `
          ${sp(8)}$\\downarrow$<br>
          
          `
            texte += '\\medskip'
            texte += '\\fbox{'
            texte += '\\parbox{0.35\\linewidth}{'
            texte += '\\setlength{\\parskip}{.5cm}'
            texte += ` Ajouter $${b}$\\newline`
            texte += ` Multiplier par $${c}$`
            texte += '}'
            texte += '}'
            texte += '<br>'
            texte += `<br>${sp(8)}$\\downarrow$<br>
          
          `
            texte += 'Résultat'
          }

          texteCorr = `Le résultat est donné par : $(${a}+ ${b})\\times ${c}=${miseEnEvidence(reponse)}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 20:
          a = choice(obtenirListeFractionsIrreductibles())
          c = a.d

          if (choice([true, false])) {
            b = a.n
            d = new FractionX(b, c)
            texte = `L'opposé de $\\dfrac{${b}}{${c}}$ `
            texteCorr = `Deux nombres sont opposés lorsque leur somme est nulle.<br>
              Ainsi, l'opposé de $\\dfrac{${b}}{${c}}$ est $${miseEnEvidence('-')}${miseEnEvidence(d.texFraction)}$ car $\\dfrac{${b}}{${c}}+\\left(-${d.texFraction}\\right)=0$.`
            reponse = d.oppose()
          } else {
            b = a.n
            d = new FractionX(b, c)
            e = new FractionX(c, b)
            texte = `L'inverse de $\\dfrac{${b}}{${c}}$`
            texteCorr = `Deux nombres sont inverses l'un de l'autre lorsque leur produit vaut $1$.<br>
                Ainsi, l'inverse de $\\dfrac{${b}}{${c}}$ est $${miseEnEvidence(texFractionReduite(c, b))}$ car $\\dfrac{${b}}{${c}}\\times ${texFractionReduite(c, b)}=1$.`
            reponse = e
          }

          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 21:
          if (choice([true, false])) {
            a = randint(2, 10)
            b = randint(2, 3)
            c = 2
          } else {
            a = randint(2, 3)
            b = randint(2, 3)
            c = 3
          }
          reponse = a * (b ** c)
          texte = `$${a}\\times ${b}^${c}$`

          texteCorr = `$${a}\\times ${b}^${c}=${a}\\times ${b ** c}=${miseEnEvidence(reponse)}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 22:
          a = randint(2, 6)
          b = randint(8, 15)
          d = choice([27, 30, 33, 36, 39, 42, 45, 48])

          c = d - a - b

          texte = `Quelle est la moyenne de ces $3$ nombres ? <br>
                $${a}$ ${sp(4)} ; ${sp(4)} $${b}$ ${sp(4)} ; ${sp(4)} $${c}$ 
                `

          texteCorr = `La somme des $3$ nombres est : $${a}+${b}+${c} =${d}$.<br>
                La moyenne est donc $\\dfrac{${d}}{3}=${texNombre(d / 3, 0)}$.`

          reponse = arrondi(d / 3, 0)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case 23:
          lettre = choice(['a', 'b', 'x', 'y'])
          a = randint(2, 9)
          b = randint(2, 9)
          c = randint(2, 9)
          d = randint(2, 9)
          texte = `Simplifie l'expression : <br>
          $${a}${lettre}+${b}+${c}${lettre}+${d}$`
          texteCorr = ` $${a}${lettre}+${b}+${c}${lettre}+${d}=${a}${lettre}+${c}${lettre}+${b}+${d}=${miseEnEvidence(a + c)}${miseEnEvidence(lettre)}$ ${texteEnCouleurEtGras('+')} $${miseEnEvidence(b + d)}$`
          reponse = printlatex(`${a + c}*${lettre}+(${b + d})`)
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
