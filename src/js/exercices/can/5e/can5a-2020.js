import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js'
import FractionX from '../../../modules/FractionEtendue.js'
import { mathalea2d, colorToLatexOrHTML } from '../../../modules/2dGeneralites.js'
import { fraction } from '../../../modules/fractions.js'
import { pave, point, grille, labelPoint, codageSegment, codageAngleDroit, polygone, repere, traceBarre, droiteGraduee, segment, milieu, texteParPosition, polygoneAvecNom } from '../../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, stringNombre, sp, randint, prenomM, texNombre, miseEnEvidence, shuffle, choice, calcul, texPrix } from '../../../modules/outils.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
export const titre = 'CAN 5ième sujet 2020'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '04/09/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export const uuid = '7292b'
export const ref = 'can5a-2020'
export default function SujetCAN20205ieme () {
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
    const nbQ1 = min(round(this.nbQuestions * 10 / 30), 10) // Choisir d'un nb de questions de niveau 1 parmi les 7 possibles.
    const nbQ2 = min(this.nbQuestions - nbQ1, 20)
    const typeQuestionsDisponiblesNiv1 = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(-nbQ1).sort(compareNombres)
    const typeQuestionsDisponiblesNiv2 = shuffle([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]).slice(-nbQ2).sort(compareNombres)
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))

    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, somme, u, abs0, abs1, pav, pol, pol2, r, l, segmentED, segmentEA, prenom, x1, a1, poly, f, propositions, prix, choix, code1, code2, a, b, c, d, e, h, k, A, B, C, D, E, F, G, H, I, J, K, L, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[i]) {
        case 1:
          a = randint(5, 9)
          b = randint(3, 9)
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

        case 2:
          u = randint(21, 99)
          a = randint(1, 9)
          c = randint(1, 9)
          reponse = new Decimal(u).add(a / 10).add(c / 1000)
          if (choice([true, false])) {
            texte = `Écris sous forme décimale : $${u}+\\dfrac{${a}}{10}+\\dfrac{${c}}{${texNombre(1000)}}$. `
            texteCorr = `$${u}+\\dfrac{${a}}{10}+\\dfrac{${c}}{${texNombre(1000)}}=${u}+${texNombre(a / 10, 1)}+${texNombre(c / 1000, 3)}=${texNombre(u + a / 10 + c / 1000, 3)}$`
          } else {
            texte = `Écris sous forme décimale : $${u}+\\dfrac{${c}}{${texNombre(1000)}}+\\dfrac{${a}}{10}$. `
            texteCorr = `$${u}+\\dfrac{${c}}{${texNombre(1000)}}+\\dfrac{${a}}{10}=${u}+${texNombre(c / 1000, 3)}+${texNombre(a / 10, 1)}=${texNombre(u + a / 10 + c / 1000, 3)}$
             `
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 3:

          a = new Decimal(randint(12, 49, [20, 30, 40])).div(100)
          b = new Decimal(randint(31, 69, [40, 50, 60])).div(10)
          reponse = new Decimal(a).add(b)
          texte = `$${texNombre(a, 2)}+${texNombre(b, 2)}=$`
          texteCorr = ` $${texNombre(a, 2)}+${texNombre(b, 2)}=${texNombre(reponse, 2)}$`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$ ' }

          nbChamps = 1
          break

        case 4:

          a = choice([10, 100])
          b = new Decimal(randint(31, 69, [40, 50, 60])).div(10)
          reponse = new Decimal(a).sub(b)
          texte = `$${texNombre(a, 0)}-${texNombre(b, 2)}=$`
          texteCorr = ` $${texNombre(a, 2)}-${texNombre(b, 2)}=${texNombre(reponse, 2)}$`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$ ' }

          nbChamps = 1
          break

        case 5:
          a = choice([1, 10])
          b = randint(2, 199)
          texte = `$${a}$ $\\%$ de $${b} =$
         `

          texteCorr = `$${a}$ $\\%$ de $${b} =${texNombre(a / 100, 2)}\\times ${b}=${texNombre(b * a / 100, 2)}$
          `

          reponse = new Decimal(a).div(100).mul(b)
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 6:
          a = randint(3, 9)
          b = randint(5, 9)
          c = a * b
          texte = `$${c} \\div ${a} = $
          `
          reponse = b

          texteCorr = `$${c} \\div ${a} = ${b}$
           `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 7:
          a = randint(14, 19)
          b = choice([25, 30, 40, 50])
          c = randint(1, 3)
          d = choice([40, 50])
          prenom = prenomM()
          texte = `${prenom} part à  $${a}$ h $${b}$ min et son trajet dure  $${c}$ h $${d}$ min.<br>
          À quelle heure arrive-t-il ?`
          texteCorr = `Pour atteindre $${a + 1}$ h, il faut $${60 - b}$ min, puis il faut ajouter encore $${c}$  ${c > 1 ? ' heures' : ' heure '}      
          et $${d - 60 + b}$ min, soit une arrivée à  $${a + c + 1}$ h $${b + d - 60}$ min.`

          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, a + c + 1, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
            setReponse(this, index + 1, b + d - 60, { formatInteractif: 'calcul' })
          }
          nbChamps = 2
          break

        case 8:
          a = randint(11, 25, 20)
          b = randint(16, 39, [20, 30])

          if (choice([true, false])) {
            reponse = a
            texte = `La moitié de $${2 * a}$ est égale à `
            texteCorr = `La moitié de $${2 * a}$ est égale à $${2 * a}\\div 2=${a}$`
          } else {
            reponse = 2 * b
            texte = `Le double de $${b}$ est égal à `
            texteCorr = `Le double de $${b}$ est égal à $2\\times ${b}=${2 * b}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 9:
          a = randint(1, 4)
          prix = choice([7, 9, 11, 13])

          reponse = new Decimal(prix).add(prix / 2)
          texte = `$${2 * a}$ gâteaux coûtent  $${texPrix(prix)}$ €. <br>
            Combien coûtent $${3 * a}$ de ces mêmes gâteaux ?
             `

          texteCorr = `$${2 * a}$ gâteaux coûtent  $${texPrix(prix)}$ €, donc $${a}$ ${a > 1 ? 'gâteaux coûtent' : 'gâteau coûte'} $${texPrix(prix)} \\text{ €} \\div 2=${texPrix(prix / 2)}$ €.<br>
          Ainsi, $${3 * a}$ gâteaux coûtent $${texPrix(prix)}\\text{ €}+${texPrix(prix / 2)}\\text{ €}=${texPrix(reponse)}$ €.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' €' }
          nbChamps = 1
          break

        case 10:

          a = randint(3, 9)
          b = randint(1, a - 1)
          c = randint(3, 9)
          d = c * a + b
          texte = `Le reste de la division euclidienne de $${d}$ par $${a}$ est `
          texteCorr = `$${d}=${a} \\times ${c} + ${b}$ avec $${b}<${a}$ donc le reste de la division de $${d}$ par $${a}$ est $${b}$.`
          reponse = b

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 11:
          a = randint(1, 2)
          k = randint(2, 5)
          abs0 = randint(26, 55, [30, 40, 50])
          abs1 = new Decimal(abs0).add(3 * k)
          x1 = new Decimal(abs0).add(a * k)
          d = droiteGraduee({
            Unite: 2,
            Min: 0,
            Max: 4.1,
            axeStyle: '->',
            pointTaille: 5,
            pointStyle: 'x',
            labelsPrincipaux: false,
            thickSec: false,
            labelListe: [[0, `${stringNombre(abs0)}`], [3, `${stringNombre(abs1)}`]],
            pointListe: [[a, 'A']]
          })
          reponse = x1
          texte = 'Determine l\'abscisse du point $A$. <br>' + mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1.5, pixelsParCm: 30, scale: 0.8 }, d)
          texteCorr = `Entre $${texNombre(abs0, 0)}$ et $${texNombre(abs1, 0)}$, il y a $3$ intervalles.<br>
       Une graduation correspond donc à $\\dfrac{${texNombre(abs1, 0)}-${texNombre(abs0, 0)}}{3}=${k}$. Ainsi, l'abscisse du point $A$ est $${texNombre(reponse, 0)}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 12:
          a = new Decimal(2 + randint(1, 9) / 10)
          b = new Decimal(1 + randint(1, 9) / 10)
          c = new Decimal(b).mul(2)

          A = point(0, 0)
          B = point(1.7, 0)
          C = point(1.7, 0.5)
          D = point(1.2, 0.5)
          E = point(1.2, 1)
          F = point(0, 1)
          G = point(2.7, 0)
          H = point(6.1, 0)
          I = point(6.1, 1)
          J = point(5.1, 1)
          K = point(5.1, 2)
          L = point(2.7, 2)
          xmin = -1
          ymin = -0.5
          xmax = 6.5
          ymax = 2.5
          pol = polygoneAvecNom(A, B, C, D, E, F)
          pol2 = polygoneAvecNom(G, H, I, J, K, L)

          // segment((i + 1) * 2, -0.1, (i + 1) * 2, 0.1)
          objets = []
          objets.push(pol[0]) //, pol[1]
          objets.push(pol2[0])

          objets.push(texteParPosition(`${stringNombre(a)} cm`, milieu(A, B).x, milieu(A, B).y - 0.2),
            texteParPosition(`${stringNombre(b)} cm`, milieu(A, F).x - 0.5, milieu(A, F).y),
            texteParPosition(`${stringNombre(c)} cm`, milieu(G, L).x - 0.6, milieu(G, L).y),
            texteParPosition('?', milieu(G, H).x, milieu(G, H).y - 0.4),
            texteParPosition('A', 0.7, 0.3, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('B', 4, 1, 'milieu', 'black', 1, 'middle', true)
          )
          reponse = new Decimal(a).mul(2)
          texte = 'La figure $B$ est un agrandissement de la figure $A$. <br>'

          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 1.2, style: 'margin: auto' }, objets)
          texte += '<br>? $=$'
          texteCorr = `Les longueurs de la figure $B$ sont le double de celles de la figure $A$.<br>
          Ainsi, ?$=2\\times ${texNombre(a, 1)}\\text{ cm}= ${texNombre(reponse, 1)}$ cm.
                  `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' } else { texte += ' $\\ldots$ cm' }
          nbChamps = 1
          break

        case 13:
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

          texte = 'Quelle fraction de la surface totale représente la surface grisée ?<br>'
          texte += mathalea2d({ xmin: -1, ymin: -0.1, xmax: 12.1, ymax: b + 1, scale: 0.7 }, A, C)
          texteCorr = `Il y a $${c * d + e * f - e * d}$ ${c * d + e * f - e * d > 1 ? 'carrés' : 'carré'} gris sur un total de $${a * b}$ carrés, la surface grisée représente donc $\\dfrac{${c * d + e * f - e * d}}{${a * b}}$ de la surface totale.`
          reponse = new FractionX(c * d + e * f - e * d, a * b)
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 14:
          a = randint(1, 9)
          b = randint(3, 9)
          c = randint(3, 9)
          reponse = a + b * c
          texte = `$${a}+${b}\\times ${c}=$`
          texteCorr = `La multiplication est prioritaire : $${a}+${b}\\times ${c}=${a}+${b * c}=${reponse}$.
                                   `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 15:
          a = new Decimal(randint(11, 39, [20, 30])).div(10)
          b = randint(2, 5)
          choix = choice(['a', 'b'])//
          if (choix === 'a') {
            reponse = new Decimal(a).mul(4)
            texte = `Complète la suite logique :<br>
            $${texNombre(a, 1)}$ $${sp(8)}${texNombre(new Decimal(a).mul(2), 1)}$${sp(8)}?$${sp(8)}${texNombre(new Decimal(a).mul(8), 1)}$
           `
            texte += '<br>? $=$'

            texteCorr = `L'hypothèse que l'on peut faire est que l'on passe d'un terme au suivant en multiplant par $2$. <br>
            Ainsi, ? $=2\\times ${texNombre(new Decimal(a).mul(2), 1)}= ${texNombre(reponse, 1)}$.<br>
            On vérifie avec la dernière valeur : $2\\times ${texNombre(reponse, 1)}=${texNombre(new Decimal(a).mul(8), 1)}$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          }
          if (choix === 'b') {
            reponse = new Decimal(a).add(2 * b)
            texte = `Complète la suite logique :<br>
            $${texNombre(a, 1)}$ $${sp(8)}${texNombre(new Decimal(a).add(b), 1)}$${sp(8)}?$${sp(8)}${texNombre(new Decimal(a).add(3 * b), 1)}$
           `
            texte += '<br>? $=$'
            texteCorr = `L'hypothèse que l'on peut faire est que l'on passe d'un terme au suivant en ajoutant  $${b}$. <br>
            Ainsi, ? $= ${texNombre(new Decimal(a).add(b), 1)}+${b}= ${texNombre(reponse, 1)}$.<br>
            On vérifie avec la dernière valeur : $${texNombre(reponse, 1)}+${b}=${texNombre(new Decimal(a).add(3 * b), 1)}$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          }

          nbChamps = 1
          break

        case 16:
          objets = []
          a = randint(1, 8)
          b = randint(1, 8)
          c = randint(1, 8, a)
          r = repere({
            grilleX: false,
            grilleY: true,
            xThickListe: [],
            xLabelListe: [],
            yUnite: 0.02,
            yThickDistance: 50,
            yMax: 460,
            xMin: 0,
            xMax: 10,
            yMin: 0,
            axeXStyle: '',
            yLegende: 'Effectifs'
          })

          reponse = 50 * a + 50 * b + 50 * c

          objets.push(r)
          objets.push(traceBarre(2, a, 'Chien', { epaisseur: 2, couleurDeRemplissage: 'red', hachures: true }))
          objets.push(traceBarre(5, b, 'Chat', { epaisseur: 2, couleurDeRemplissage: 'red', hachures: true }))
          objets.push(traceBarre(8, c, 'Autre animal', { epaisseur: 2, couleurDeRemplissage: 'red', hachures: true }))
          texte = 'À partir du diagramme ci-dessous, détermine le nombre total d\'animaux comptabilisés. <br>'
          texte += mathalea2d({ xmin: -5, xmax: 11, ymin: -3.5, ymax: 10.5, pixelsParCm: 25, scale: 0.8 }, objets)
          texteCorr = `Le nombre total d'animaux est : $${50 * a}+${50 * b}+${50 * c}=${reponse}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 17:

          a = choice([25, 10, 50, 20])
          if (a === 10) {
            b = randint(2, 8)
            reponse = 10 * b
            texteCorr = `Sur $${a}$ chiots, $${b}$ sont de couleurs marron, donc sur $${a}\\times 10=100$ chiots, $10\\times ${b}$ soit $${10 * b}$ sont de couleur marron.<br>
            Il y a donc $${reponse}$ $\\%$ de chiots marron.`
          }
          if (a === 20) {
            b = randint(8, 15)
            reponse = 5 * b
            texteCorr = `Sur $${a}$ chiots, $${b}$ sont de couleurs marron, donc sur $${a}\\times 5=100$ chiots, $10\\times ${b}$ soit $${5 * b}$ sont de couleur marron.<br>
            Il y a donc $${reponse}$ $\\%$ de chiots marron.`
          }
          if (a === 25) {
            b = randint(8, 15)
            reponse = 4 * b
            texteCorr = `Sur $${a}$ chiots, $${b}$ sont de couleurs marron, donc sur $${a}\\times 4=100$ chiots, $4\\times ${b}$ soit $${4 * b}$ sont de couleur marron.<br>
            Il y a donc $${reponse}$ $\\%$ de chiots marron.`
          }
          if (a === 50) {
            b = randint(15, 65, [20, 25, 30, 40, 50])
            reponse = 2 * b
            texteCorr = `Sur $${a}$ chiots, $${b}$ sont de couleurs marron, donc sur $${a}\\times 2=100$ chiots, $2\\times ${b}$ soit $${2 * b}$ sont de couleur marron.<br>
            Il y a donc $${reponse}$ $\\%$ de chiots marron.`
          }

          texte = `Sur $${a}$ chiots, $${b}$ sont de couleur marron.<br>
          Quel est le pourcentage de chiots marron ?`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' $\\%$' }
          nbChamps = 1

          break

        case 18:
          a = randint(1, 5)
          b = new Decimal(choice([25, 50, 75])).div(100)
          d = new Decimal(b).mul(60)
          if (!this.interactif) {
            texte = `Convertis en heures/minutes : <br>$${texNombre(new Decimal(a).add(b), 2)}\\text{ h}=\\ldots  \\text{ h } \\ldots \\text{ min}$`
            texteCorr = `$${texNombre(new Decimal(a).add(b), 2)}\\text{ h}= ${a}\\text{ h} + ${texNombre(b, 2)} \\times 60 \\text{ min} = ${a}\\text{ h }${d}\\text{ min}$`
          } else {
            texte = `Convertis en heures/minutes : <br>$${texNombre(new Decimal(a).add(b), 2)}\\text{ h}=$`
            texte += ajouteChampTexteMathLive(this, index, 'largeur10 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, a)
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur10 inline', { texteApres: sp(5) + 'min' })
            texteCorr = `$${texNombre(new Decimal(a).add(b), 2)}\\text{ h}=${a}\\text{ h}+${texNombre(b, 2)} \\times 60\\text{ min}=${a}\\text{ h } ${d}\\text{ min}$`
            setReponse(this, index + 1, d)
          }

          nbChamps = 2

          break

        case 19:
          choix = choice(['a', 'b'])
          if (choix === 'a') {
            a = randint(8, 15, 10)
            b = randint(2, 6, 4)
            reponse = a * b * 100
            if (choice([true, false])) {
              texte = ` $25\\times ${a}\\times 4\\times ${b}=$`
              texteCorr = `$25\\times ${a}\\times 4\\times ${b}=\\underbrace{25\\times 4}_{=100}\\times \\underbrace{${a}\\times ${b}}_{=${a * b}}=${reponse}$`
            } else {
              texte = ` $${b}\\times 4\\times ${a}\\times 25= $`
              texteCorr = `$${b}\\times 4\\times ${a}\\times 25=\\underbrace{25\\times 4}_{=100}\\times \\underbrace{${a}\\times ${b}}_{=${a * b}}=${reponse}$`
            }
          }
          if (choix === 'b') {
            a = randint(8, 15, 10)
            b = randint(3, 6)
            reponse = a * b * 100
            if (choice([true, false])) {
              texte = ` $50\\times ${b}\\times 2\\times ${a}=$`
              texteCorr = `$50\\times ${b}\\times 2\\times ${a}=\\underbrace{50\\times 2}_{=100}\\times \\underbrace{${b}\\times ${a}}_{=${a * b}}=${reponse}$`
            } else {
              texte = ` $${b}\\times 2\\times ${a}\\times 50= $`
              texteCorr = `$${b}\\times 2\\times ${a}\\times 50=\\underbrace{50\\times 2}_{=100}\\times \\underbrace{${b}\\times ${a}}_{=${a * b}}=${reponse}$`
            }
          }

          if (this.interactif) {
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index, 'largeur15 inline')
          } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break
        case 20:

          a = randint(11, 49, [20, 30, 40])
          a1 = new Decimal(a).div(10)
          b = new Decimal(randint(11, 49, [20, 30, 40])).div(10)
          reponse = new Decimal(a1 * 2).add(b * 2)

          texte = ` Quel est le périmètre d'un rectangle $ABCD$ tel que :
                $AB=${a}$ mm et $BC=${texNombre(b, 1)}$ cm ?<br>`
          texteCorr = `$${a}$ mm $= ${texNombre(a1, 1)}$ cm.<br>
                Le périmètre de $ABCD$ est donc : $2\\times ${texNombre(a1, 1)} \\text{ cm}+ 2\\times ${texNombre(b, 1)} \\text{ cm}=${texNombre(reponse, 1)}$ cm.`

          if (this.interactif) {
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index, 'largeur15 inline', { texteApres: ' cm' })
          } else { texte += 'Périmètre $=\\ldots$ cm' }
          nbChamps = 1
          break

        case 21:

          a = new Decimal(choice([15, 25, 35, 45, 55, 65, 75, 85, 95])).div(10)
          b = new Decimal(choice([15, 25, 35, 45, 55, 65, 75, 85, 95])).div(10)
          somme = new Decimal(a).add(b)
          c = randint(10, 15)
          propositions = shuffle([`$${texNombre(a)}$`, `$${texNombre(b)}$`, `$${texNombre(c)}$`])
          texte = `VRAI/FAUX<br>
          On peut construire un triangle (non aplati) dont les trois côtés ont pour longueur :<br>`
          texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
          if (somme > c) {
            setReponse(this, index, ['V', 'v'], { formatInteractif: 'texte' })
            texteCorr = `Pour qu'un triangle soit constructible (non aplati), il faut que la longueur du plus grand côté soit strictement inférieure à la somme des deux autres.<br>
          On a $${texNombre(a, 1)}+${texNombre(b, 1)}=${texNombre(somme, 0)} > ${c}$.<br>
          L'affirmation est donc vraie.`
          } else {
            setReponse(this, index, ['F', 'f'], { formatInteractif: 'texte' })
            texteCorr = `Pour qu'un triangle soit constructible (non aplati), il faut que la longueur du plus grand côté soit strictement inférieure à la somme des deux autres.<br>
          On a $${texNombre(a, 1)}+${texNombre(b, 1)}=${texNombre(new Decimal(a).add(b), 0)} < ${c}$.<br>
          L'affirmation est donc fausse.`
          }
          if (this.interactif) {
            texte += '<br>Pour VRAI, écrire V et pour FAUX : F'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }

          nbChamps = 1
          break

        case 22:
          l = randint(2, 5)
          L = randint(2, 4)
          h = randint(2, 6, [l, L])
          pav = pave(L, l, h)
          texte = `Quel est le volume du pavé droit ci-dessous ?<br>
        ${mathalea2d({ xmin: -2, ymin: -2, xmax: 10, ymax: 0.5 * h + l }, pav)}`
          reponse = L * l * h
          texteCorr = `Le volume de ce pavé droit est : $${L}\\text{ cm}\\times ${l} \\text{ cm}\\times ${h}\\text{ cm}=${reponse}$ cm$^3$.`
          texte += ajouteChampTexteMathLive(this, index, 'inline largeur15', { texteApres: ' cm$^3$' })
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          nbChamps = 1
          break

        case 23:
          a = randint(11, 24, 20)
          reponse = calcul(101 * a)
          texte = `$${a}\\times 101=$`
          texteCorr = `$${a}\\times 101 = ${texNombre(101 * a)}$<br>`

          texteCorr += `$${a}\\times 101 = ${a}\\times (100+1)=${a}\\times 100+${a}\\times 1=${texNombre(a * 100)}+${a}=${texNombre(101 * a)}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 24:
          a = randint(2, 6)
          b = randint(2, 7)

          reponse = b * b + b * a

          texte = `Calcule $n\\times (n+${a})$ pour $n=${b}$. `
          texteCorr = `$${b}\\times (${b}+${a})=${b}\\times ${b + a}=${reponse}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 25:
          choix = choice(['a', 'b'])
          if (choix === 'a') {
            a = randint(11, 15)
            prenom = prenomM()
            if (choice([true, false])) {
              texte = `${prenom} mange les deux tiers d'un fromage de $${3 * a}$ g.<br>
            Quelle masse de fromage a-t-il mangé ?`

              texteCorr = `$\\dfrac{2}{3}\\times ${3 * a}=2\\times ${a}=${2 * a}$<br>
            ${prenom} a mangé $${2 * a}$ g de fromage.`
              reponse = 2 * a
            } else {
              texte = `${prenom} mange le  tiers d'un fromage de $${3 * a}$ g.<br>
            Quelle masse de fromage a-t-il mangé ?`

              texteCorr = `$\\dfrac{1}{3}\\times ${3 * a}=${a}$<br>
            ${prenom} a mangé $${a}$ g de fromage.`
              reponse = a
            }
          }
          if (choix === 'b') {
            a = randint(11, 15)
            prenom = prenomM()
            if (choice([true, false])) {
              texte = `${prenom} mange les trois quarts d'un fromage de $${4 * a}$ g.<br>
            Quelle masse de fromage a-t-il mangé ?`

              texteCorr = `$\\dfrac{3}{4}\\times ${4 * a}=3\\times ${a}=${3 * a}$.<br>
            ${prenom} a mangé $${3 * a}$ g de fromage.`
              reponse = 3 * a
            } else {
              texte = `${prenom} mange le quart d'un fromage de $${4 * a}$ g.<br>
            Quelle masse de fromage a-t-il mangé ?`

              texteCorr = `$\\dfrac{1}{4}\\times ${4 * a}=${a}$.<br>
            ${prenom} a mangé $${a}$ g de fromage.`
              reponse = a
            }
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' g' }
          nbChamps = 1
          break

        case 26:

          a = randint(1, 6)
          b = choice([1.5, 2.5, 3.5, 4.5])
          texte = `Complète : <br>
          $${texNombre(a * 2, 0)}\\times \\ldots =${texNombre(b * 2 * a, 1)}$
           `

          texteCorr = `Le nombre cherché est $${texNombre(b * 2 * a, 1)}\\div ${texNombre(a * 2, 0)}=${texNombre(b, 1)}$.
            `

          reponse = fraction(b, 1)

          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 27:
          a = randint(2, 9)
          choix = choice(['a', 'b', 'c', 'd'])//
          if (choix === 'a') {
            reponse = a * 1000
            texte = `$${a}$ dm$^3=$`
            texteCorr = `$1$ dm$^3= ${texNombre(1000)}$ cm$^3$, donc $${a}$ dm$^3=${a}\\times ${texNombre(1000)}$ cm$^3=${a * 1000}$ cm$^3$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm$^3$' } else { texte += ' $\\ldots$ cm$^3$' }
          }
          if (choix === 'b') {
            reponse = a / 1000
            texte = `$${a}$ cm$^3=$`
            texteCorr = `$1$ cm$^3= 0,001$ dm$^3$, donc $${a}$ cm$^3=${a}\\times 0,001$ dm$^3=${texNombre(a / 1000)}$ dm$^3$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'dm$^3$' } else { texte += ' $\\ldots$ dm$^3$' }
          }
          if (choix === 'c') {
            reponse = a * 1000
            texte = `$${a}$ m$^3=$`
            texteCorr = `$1$ m$^3= ${texNombre(1000)}$ dm$^3$, donc $${a}$ m$^3=${a}\\times ${texNombre(1000)}$ dm$^3=${a * 1000}$ dm$^3$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'dm$^3$' } else { texte += ' $\\ldots$ dm$^3$' }
          }
          if (choix === 'd') {
            reponse = a / 1000
            texte = `$${a}$ dm$^3=$`
            texteCorr = `$1$ dm$^3= 0,001$ m$^3$, donc $${a}$ dm$^3=${a}\\times 0,001$ m$^3=${texNombre(a / 1000)}$ m$^3$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'm$^3$' } else { texte += ' $\\ldots$ m$^3$' }
          }

          nbChamps = 1
          break

        case 28:
          a = randint(1, 3)
          b = randint(2, 5)
          c = a + b
          f = new Decimal(a * b).div(2)
          A = point(0, 0, 'A', 'below')
          B = point(5, 0, 'B', 'below')
          C = point(5, 3, 'C', 'above')
          D = point(2, 3, 'D', 'above')
          E = point(0, 3, 'E', 'above')
          poly = polygone([A, B, C, D], 'black')

          code1 = codageSegment(B, C, '||')
          segmentED = segment(E, D)
          segmentED.pointilles = 2
          segmentEA = segment(E, A)
          segmentEA.pointilles = 2
          code2 = codageSegment(D, C, '||')
          poly.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
          d = texteParPosition(`${c} cm`, milieu(A, B).x, milieu(A, B).y - 0.5, 'milieu', 'black', 1, 'middle', false)
          e = texteParPosition(`${b} cm`, milieu(B, C).x + 1, milieu(B, C).y, 'milieu', 'black', 1, 'middle', false)
          poly.epaisseur = 1
          reponse = new Decimal(b * c).sub(f)
          texte = 'Quelle est l\'aire du polygone grisé ?<br>'

          texte += mathalea2d({ xmin: -1.5, ymin: -1, xmax: 7.1, ymax: 4, pixelsParCm: 30, scale: 0.7 }, poly, labelPoint(A, B, C, D, E),
            codageAngleDroit(E, A, B), codageAngleDroit(A, B, C), codageAngleDroit(B, C, E), codageAngleDroit(C, E, A),
            code1, code2, d, e, segmentED, segmentEA)
          texteCorr = `L'aire du rectangle $ABCD$ est : $${b}\\text{ cm}\\times ${c}\\text{ cm}=${b * c}$ cm$^2$.<br>
          L'aire du triangle $AED$ est : $\\dfrac{${a}\\text{ cm}\\times ${b}\\text{ cm}}{2}=${texNombre(f, 1)}$ cm$^2$.<br>
          On en déduit que l'aire du polygone grisé est : $${b * c}\\text{ cm}^2-${texNombre(f, 1)}\\text{ cm}^2=${texNombre(reponse, 1)}$ cm$^2$.`
          texte += '<br> Aire $= $'
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' cm$^2$'
          } else { texte += ' $\\ldots $ cm$^2$<br>' }
          nbChamps = 1
          break

        case 29:

          a = randint(2, 6)
          b = randint(2, 9)
          d = randint(2, 9)
          k = randint(2, 6)
          c = d + k
          reponse = (a + b) * (c - d)
          texte = `Le produit de la somme de $${a}$ et $${b}$ par la différence de $${c}$ et $${d}$ est égal à :`
          texteCorr = `Le produit de la somme de $${a}$ et $${b}$ par la différence de $${c}$ et $${d}$ est : <br>
          $(${a}+${b})\\times (${c}-${d})=${a + b}\\times ${k}=${reponse}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$' }
          nbChamps = 1
          break

        case 30:
          if (choice([true, false])) {
            a = randint(2, 9)

            texte = `$${a}-${a}\\div ${a}\\times ${a}+${a}\\times ${a}=$`
            texteCorr = `$${a}-${a}\\div ${a}\\times ${a}+${a}\\times ${a}=${a}-1\\times ${a}+${a * a}=${a}-${a}+${a * a}=${a * a}$.`
            reponse = a * a
          } else {
            a = randint(2, 9)

            texte = `$${a}\\div ${a}\\times ${a}-${a}+${a}\\times ${a}=$`
            texteCorr = `$${a}\\div ${a}\\times ${a}-${a}+${a}\\times ${a}=1\\times ${a}-${a}+${a * a}=${a}-${a}+${a * a}=${a * a}$`
            reponse = a * a
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += ' $\\ldots$ ' }
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
