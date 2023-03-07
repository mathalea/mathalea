import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import FractionX from '../../modules/FractionEtendue.js'
import { obtenirListeFractionsIrreductibles } from '../../modules/fractions.js'
import { scratchblock } from '../../modules/scratchblock.js'
import {
  point, segment, milieu, codageAngle, rotation, polygoneAvecNom, labelPoint, codageSegments, segmentAvecExtremites, tracePoint, codageAngleDroit, texteParPosition, polygone
} from '../../modules/2d.js'
import { round, min } from 'mathjs'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, miseEnEvidence, ecritureParentheseSiNegatif, ecritureAlgebrique, signe, texFractionReduite, creerNomDePolygone, printlatex, stringNombre, randint, texNombre, prenomF, simplificationDeFractionAvecEtapes, texPrix, shuffle, choice, sp, arrondi, texteEnCouleur, texteEnCouleurEtGras } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import Hms from '../../modules/Hms.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Decimal from 'decimal.js'
export const titre = 'CAN 3ième sujet 2023'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '05/03/2023' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Aléatoirisation du sujet 2023 de CAN 5e
 * Gilles Mora
 * Référence can5a-2023
*/

function compareNombres (a, b) {
  return a - b
}

export default function SujetCAN2023troisieme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 30
  this.nbCols = 1
  this.nbColsCorr = 1
  this.listePackages = 'scratch3'
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
    const typeQuestionsDisponiblesNiv1 = shuffle([21]).slice(-nbQ1).sort(compareNombres)// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    const typeQuestionsDisponiblesNiv2 = shuffle([21]).slice(-nbQ2).sort(compareNombres)// 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))

    for (let i = 0, index = 0, nbChamps, m, nom, pol, n, listeFraction, maFraction, g, poly1, poly2, poly3, poly4, K, F, G, H, I, num, den, params, inconnue, triplet, origine, traceA, traceD, traceB, traceorigine, ang1, s3, J, texte, texteCorr, reponse, prenom1, L, E, choix, a, b, c, d, e, f, k, s1, s2, A, B, C, D, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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

          texteCorr = `Le chiffre des ${m} est $${miseEnEvidence(reponse)}$.<br>
          Dans le tableau suivant : C : centaines<br>
          $D$ : dizaines et $U$ : unités. <br>
          $\\begin{array}{|c|c|c|c|c|c|c|}
              \\hline
              \\text{\\small{C}} &  \\text{\\small{D}} & \\text{\\small{U}}&  \\Large{\\textbf{,}}& \\text{\\small{Dixièmes}} & \\text{\\small{Centièmes}} & \\text{\\small{Millièmes}}${context.isHtml ? '\\\\' : '\\tabularnewline'}
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
            xmax: 8,
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
          if (choice([true, false])) {
            nom = creerNomDePolygone(3, ['QD'])
            a = choice([20, 30, 40, 50, 70, 80])

            texte = `Quelle est la mesure de $\\widehat{${nom[0]}${nom[2]}${nom[1]}}$ ? <br>
          `
            texteCorr = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
          Ainsi $\\widehat{${nom[0]}${nom[2]}${nom[1]}}=180°-2\\times ${a}°=${miseEnEvidence(texNombre(180 - 2 * a, 0))}°$.
      <br>`
            reponse = 180 - 2 * a

            A = point(0, 0, nom[0])
            if (a > 60) {
              B = point(4, 0, nom[1])
              C = point(2, 3.5, nom[2])
            } else {
              B = point(6, 0, nom[1])
              C = point(3, 2.1, nom[2])
            }
            pol = polygoneAvecNom(A, B, C)

            objets = []
            xmin = -1
            ymin = -0.5
            xmax = B.x + 1
            ymax = C.y + 1
            objets.push(pol[0], pol[1])
            objets.push(codageSegments('||', 'blue', C, A, C, B), texteParPosition('?', C.x, C.y - 1, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition(`${stringNombre(a)}°`, A.x + 1.2, A.y + 0.4, 'milieu', 'black', context.isHtml ? 1 : 0.7), codageAngle(A, C, B, 0.6), codageAngle(C, A, B, 0.5))

            texte += mathalea2d({ xmin, ymin, xmax, ymax, mainlevee: false, amplitude: 0.3, scale: 0.6, style: 'margin: auto' }, objets)
          } else {
            nom = creerNomDePolygone(3, ['QD'])
            a = choice([30, 40, 50, 70, 80, 100, 110, 120, 130])

            texte = `Quelle est la mesure de $\\widehat{${nom[2]}${nom[0]}${nom[1]}}$ ? <br>
          `
            texteCorr = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
          Ainsi $\\widehat{${nom[2]}${nom[0]}${nom[1]}}=(180-${a})\\div 2=${miseEnEvidence(texNombre((180 - a) / 2, 0))}°$.
      <br>`
            reponse = arrondi((180 - a) / 2)

            A = point(0, 0, nom[0])
            if (a < 100) {
              B = point(4, 0, nom[1])
              C = point(2, 3.5, nom[2])
            } else {
              B = point(6, 0, nom[1])
              C = point(3, 2.1, nom[2])
            }
            pol = polygoneAvecNom(A, B, C)

            objets = []
            xmin = -1
            ymin = -0.5
            xmax = B.x + 1
            ymax = C.y + 1
            objets.push(pol[0], pol[1])
            objets.push(codageSegments('||', 'blue', C, A, C, B), texteParPosition(`${stringNombre(a)}°`, C.x, C.y - 1, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition('?', A.x + 1.1, A.y + 0.4, 'milieu', 'black', context.isHtml ? 1 : 0.7), codageAngle(A, C, B, 0.6), codageAngle(C, A, B, 0.5))

            texte += mathalea2d({ xmin, ymin, xmax, ymax, mainlevee: false, amplitude: 0.3, scale: 0.6, style: 'margin: auto' }, objets)
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '$°$' }
          nbChamps = 1
          break

        case 12:

          a = new Decimal(choice([15, 25, 35, 45, 55, 65, 75, 85, 95])).div(10)
          b = randint(3, 9)
          c = a.mul(2)
          d = b * 2
          e = a.add(c)

          reponse = b + d

          texte = 'Voici un tableau de proportionnalité :'
          texte += context.isHtml ? '<br>' : '\\par\\smallskip'
          texte += context.isHtml ? '' : '{\\renewcommand{\\arraystretch}{1}'
          texte += `$
          \\begin{array}{|c|c|c|}
          \\hline
          ${texNombre(a, 1)}&${c}&${texNombre(e, 1)}${context.isHtml ? '\\\\' : '\\tabularnewline'}
          \\hline
          ${b}&${d}&x${context.isHtml ? '\\\\' : '\\tabularnewline'}
          \\hline
          \\end{array}
          $${sp(6)} $x=$`
          texte += context.isHtml ? '' : '}\\medskip'
          texteCorr = `$${texNombre(e, 1)}$ s'obtient par la somme de $${texNombre(a, 1)}$ et $${c}$. <br>
          $x$ est donc la somme de $${b}$ et $${d}$. Ainsi, $x=${miseEnEvidence(b + d)}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }

          nbChamps = 1

          break

        case 13:

          a = randint(-4, 4, [0, 1])
          b = randint(-5, 5, [-1, 0, 1])
          reponse = b * a ** 2
          texte = `Pour $x=${a}$, ${sp(5)} $${b}x^2=$ `
          texteCorr = `Pour $x=${a}$, ${sp(5)} $${b}x^2=${b}\\times${ecritureParentheseSiNegatif(a)}=${miseEnEvidence(reponse)}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 14:
          triplet = [[3, 4, 5], [6, 8, 10]]
          a = choice(triplet)

          C = point(0, 0, 'C', 'below')
          A = point(2, 0, 'A', 'below')
          B = point(2, 3, 'B', 'above')

          xmin = -1
          ymin = -1
          xmax = 3.5
          ymax = 4
          pol = polygoneAvecNom(A, B, C)
          objets = []
          choix = choice(['a', 'b', 'c'])
          if (choix === 'a') {
            objets.push(pol[0])
            objets.push(
              texteParPosition(`${stringNombre(a[0])} cm`, milieu(A, C).x, milieu(A, C).y - 0.4, 'milieu', 'black', context.isHtml ? 1 : 0.7)
              , texteParPosition(`${stringNombre(a[2])} cm`, milieu(B, C).x - 0.8, milieu(B, C).y, 'milieu', 'black', context.isHtml ? 1 : 0.7)

              , labelPoint(A, B, C), codageAngleDroit(B, A, C))
            reponse = a[1]
            texte = `Calcule la longueur $AB$.
                            `

            texte += '<br>' + mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.3, scale: 0.6, style: 'margin: auto' }, objets)
            texte += '<br>$AB=$'

            texteCorr = `On utilise le théorème de Pythagore dans le triangle rectangle $ABC$ :<br>
                On a $AB^2=BC^2-AC^2$, soit $AB^2=${a[2]}^2-${a[0]}^2=${a[2] ** 2 - a[0] ** 2}$.<br>
                Par conséquent, $AB=${miseEnEvidence(a[1])}$ cm.`
          }
          if (choix === 'b') {
            objets.push(pol[0])
            objets.push(
              texteParPosition(`${stringNombre(a[1])} cm`, milieu(A, B).x + 0.6, milieu(A, B).y, 'milieu', 'black', context.isHtml ? 1 : 0.7)
              , texteParPosition(`${stringNombre(a[2])} cm`, milieu(B, C).x - 0.8, milieu(B, C).y, 'milieu', 'black', context.isHtml ? 1 : 0.7)
              , labelPoint(A, B, C), codageAngleDroit(B, A, C))
            reponse = a[0]
            texte = `Calcule la longueur $AC$.
              `

            texte += '<br>' + mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.3, scale: 0.6, style: 'margin: auto' }, objets)
            texte += '<br>$AC=$'

            texteCorr = `On utilise le théorème de Pythagore dans le triangle rectangle $ABC$ :<br>
                  On a $AC^2=BC^2-AB^2$, soit $AC^2=${a[2]}^2-${a[1]}^2=${a[2] ** 2 - a[1] ** 2}$.<br>
                  Par conséquent, $AC=${miseEnEvidence(a[0])}$ cm.`
          }
          if (choix === 'c') {
            objets.push(pol[0])
            objets.push(
              texteParPosition(`${stringNombre(a[1])} cm`, milieu(A, B).x + 0.8, milieu(A, B).y, 'milieu', 'black', context.isHtml ? 1 : 0.7)
              , texteParPosition(`${stringNombre(a[0])} cm`, milieu(A, C).x, milieu(A, C).y - 0.4, 'milieu', 'black', context.isHtml ? 1 : 0.7)
              , labelPoint(A, B, C), codageAngleDroit(B, A, C))
            reponse = a[2]
            texte = `Calcule la longueur $BC$.
              `

            texte += '<br>' + mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.3, scale: 0.6, style: 'margin: auto' }, objets)
            texte += '<br>$BC=$'

            texteCorr = `On utilise le théorème de Pythagore dans le triangle rectangle $ABC$ :<br>
                    On a $BC^2=AB^2+AC^2$, soit $BC^2=${a[0]}^2+${a[1]}^2=${a[0] ** 2 + a[1] ** 2}$.<br>
                    Par conséquent, $BC=${miseEnEvidence(a[2])}$ cm.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' } else { texte += ' $\\ldots$ cm' }
          nbChamps = 1
          break

        case 15:

          a = choice([new Decimal('0.1'), new Decimal('0.2'),
            new Decimal('0.3'), new Decimal('0.4'), new Decimal('0.6'), new Decimal('0.7'),
            new Decimal('0.8'), new Decimal('0.9'), new Decimal('0.25'), new Decimal('0.75')])

          reponse = new Decimal(a).mul(60)
          texte = `$${texNombre(a, 2)}$ h $=$ `
          texteCorr = `$${texNombre(a, 2)}\\text{ h }=${texNombre(a, 2)}\\times 60 \\text{ min }=${miseEnEvidence(texNombre(reponse, 0))} \\text{ min}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'min' } else { texte += ' $\\ldots$ min' }
          nbChamps = 1
          break

        case 16:

          a = randint(-9, -2)
          b = randint(-9, -2, a)
          c = choice([-10, -5])
          reponse = a * b * c
          texte = `$(${a})\\times (${b})\\times(${c})$ `
          texteCorr = `$(${a})\\times (${b})\\times(${c})=${miseEnEvidence(reponse)}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 17:

          a = randint(31, 99, [40, 50, 60, 70, 80, 90]) * 10

          b = randint(-4, -1)
          reponse = new Decimal(a).mul(10 ** b)
          texte = `Écriture décimale de $${a}\\times 10^{${b}}$ `
          texteCorr = `$${a}\\times 10^{${b}}=${a}\\times ${texNombre(10 ** b, 4)}=${miseEnEvidence(texNombre(reponse, 4))}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case 18:
          a = randint(1, 4)
          b = randint(1, 9) * choice([-1, 1])
          k = randint(2, 7) * choice([-1, 1])
          inconnue = choice(['x', 'y'])

          if (a === 1) {
            // ne pas écrire 1x
            texte = `Développe $${k}${inconnue}(${inconnue}${ecritureAlgebrique(b)})$`
            texteCorr = `$${k}${inconnue}(${inconnue}${ecritureAlgebrique(b)})=${k}${inconnue}\\times ${inconnue} ${signe(k * b)}${k}${inconnue}\\times ${Math.abs(b)}=${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}$`
            reponse = printlatex(`${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}`)
          } else {
            texte = `Développe $${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(b)})$`
            if (k > 0) {
              texteCorr = `$${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(b)})=${k}${inconnue}\\times ${a}${inconnue} + ${k}${inconnue}\\times ${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}$`
              reponse = printlatex(`${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}`)
            } else {
              texteCorr = `$${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(b)})=${k}${inconnue}\\times ${a}${inconnue} + (${k}${inconnue})\\times ${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}$`
              reponse = printlatex(`${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}`)
            }
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case 19:
          if (choice([true, false])) {
            d = new Decimal(randint(112, 199, [120, 130, 140, 150, 160, 170, 180, 190])).div(10)
            e = randint(3, 7)

            texte = `$${texNombre(e)} \\times ${texNombre(d, 1)}+${texNombre(10 - e, 1)}\\times ${texNombre(d, 1)}$`
            texteCorr = `$${texNombre(e)} \\times ${texNombre(d, 1)}+${texNombre(10 - e)}\\times ${texNombre(d, 1)}=${texNombre(d, 1)}\\times (${e}+${10 - e})=${texNombre(d, 1)}\\times 10=${miseEnEvidence(texNombre(10 * d, 0))}$`
            reponse = new Decimal(d).mul(10)
          } else {
            d = new Decimal(randint(112, 199, [120, 130, 140, 150, 160, 170, 180, 190])).div(10)
            e = randint(3, 49, [10, 20, 30, 40])

            texte = `$${texNombre(e)} \\times ${texNombre(d, 1)}+${texNombre(100 - e, 1)}\\times ${texNombre(d, 1)}$`
            texteCorr = `$${texNombre(e)} \\times ${texNombre(d, 1)}+${texNombre(100 - e)}\\times ${texNombre(d, 1)}=${texNombre(d, 1)}\\times (${e}+${100 - e})=${texNombre(d, 1)}\\times 100=${miseEnEvidence(texNombre(100 * d, 0))}$`
            reponse = new Decimal(d).mul(100)
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 20:

          if (choice([true, false])) {
            b = randint(2, 4)
            a = randint(5, 9)
            c = 2 * a + b
            A = point(0, 0)
            B = point(10, 0)
            C = point(10, 0.7)
            D = point(0, 0.7)
            E = point(4, 0.7)
            F = point(4, 0)
            G = point(8, 0.7)
            H = point(8, 0)
            I = point(0, 1)
            J = point(10, 1)

            s1 = segmentAvecExtremites(I, J)
            s1.styleExtremites = '<->'
            xmin = -1
            ymin = -0.5
            xmax = 11
            ymax = 2
            poly1 = polygone(A, F, E, D)
            poly2 = polygone(E, F, H, G)
            poly3 = polygone(G, H, B, C)
            poly1.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            poly2.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            objets = []
            objets.push(poly1, poly2, poly3, s1)
            objets.push(
              context.isHtml ? texteParPosition('$a$', milieu(A, F).x, milieu(A, F).y, 'milieu', 'black') : texteParPosition('$a$', milieu(A, F).x, milieu(A, F).y + 0.3, 'milieu', 'black', 0.7)
              , context.isHtml ? texteParPosition('$a$', milieu(F, H).x, milieu(F, H).y, 'milieu', 'black') : texteParPosition('$a$', milieu(F, H).x, milieu(F, H).y + 0.3, 'milieu', 'black', 0.7)
              , context.isHtml ? texteParPosition(`$${b}$`, milieu(B, H).x, milieu(B, H).y, 'milieu', 'black') : texteParPosition(`$${b}$`, milieu(B, H).x, milieu(B, H).y + 0.3, 'milieu', 'black', 0.7)
              , context.isHtml ? texteParPosition(`$${c}$`, milieu(I, J).x, milieu(I, J).y + 0.1, 'milieu', 'black') : texteParPosition(`$${c}$`, milieu(I, J).x, milieu(I, J).y + 0.3, 'milieu', 'black', 0.7))
            reponse = a
            texte = `Loïs a représenté un problème : 
                            `

            texte += '<br>' + mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.3, scale: 0.6, style: 'margin: auto' }, objets)
            texte += `<br>
            
            $a=$`

            texteCorr = `$a=\\dfrac{${c}-${b}}{2}=${miseEnEvidence(a)}$.`
          } else {
            b = randint(7, 9)
            a = randint(2, 5)
            c = 3 * a + b
            A = point(0, 0)
            B = point(10, 0)
            C = point(10, 0.7)
            D = point(0, 0.7)
            E = point(2, 0.7)
            F = point(2, 0)
            G = point(4, 0.7)
            H = point(4, 0)
            I = point(6, 0.7)
            J = point(6, 0)
            K = point(0, 1)
            L = point(10, 1)
            s1 = segmentAvecExtremites(K, L)
            s1.styleExtremites = '<->'
            xmin = -1
            ymin = -0.5
            xmax = 11
            ymax = 2
            poly1 = polygone(A, F, E, D)
            poly2 = polygone(E, F, H, G)
            poly3 = polygone(G, H, J, I)
            poly4 = polygone(G, H, B, C)
            poly1.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            poly2.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            poly3.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            objets = []
            objets.push(poly1, poly2, poly3, poly4, s1)
            objets.push(
              context.isHtml ? texteParPosition('$a$', milieu(A, F).x, milieu(A, F).y, 'milieu', 'black') : texteParPosition('$a$', milieu(A, F).x, milieu(A, F).y + 0.3, 'milieu', 'black', 0.7)
              , context.isHtml ? texteParPosition('$a$', milieu(F, H).x, milieu(F, H).y, 'milieu', 'black') : texteParPosition('$a$', milieu(F, H).x, milieu(F, H).y + 0.3, 'milieu', 'black', 0.7)
              , context.isHtml ? texteParPosition('$a$', milieu(H, J).x, milieu(H, J).y, 'milieu', 'black') : texteParPosition('$a$', milieu(H, J).x, milieu(H, J).y + 0.3, 'milieu', 'black', 0.7), context.isHtml ? texteParPosition(`$${b}$`, milieu(B, J).x, milieu(B, J).y, 'milieu', 'black') : texteParPosition(`$${b}$`, milieu(B, J).x, milieu(B, J).y + 0.3, 'milieu', 'black', 0.7)
              , context.isHtml ? texteParPosition(`$${c}$`, milieu(K, L).x, milieu(K, L).y + 0.1, 'milieu', 'black') : texteParPosition(`$${c}$`, milieu(K, L).x, milieu(K, L).y + 0.3, 'milieu', 'black', 0.7))
            reponse = a
            texte = `Loïs a représenté un problème : 
                            `

            texte += '<br>' + mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.3, scale: 0.6, style: 'margin: auto' }, objets)
            texte += `<br>
            
            $a=$`

            texteCorr = `$a=\\dfrac{${c}-${b}}{2}=${miseEnEvidence(a)}$.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$ ' }
          nbChamps = 1
          break

          case 21:

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
