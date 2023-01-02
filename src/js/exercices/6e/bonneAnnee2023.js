import { cercle, courbe, droite, labelPoint, latexParCoordonnees, point, repere, rotation, segment, texteParPosition } from '../../modules/2d.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import Operation from '../../modules/operations.js'
import { texteEnCouleur, combinaisonListes, choice, choisitLettresDifferentes, contraindreValeur, listeQuestionsToContenu, miseEnEvidence, numAlphaNum, rangeMinMax, sp, texNombre, texteEnCouleurEtGras } from '../../modules/outils.js'
import { RedactionPythagore } from '../4e/_pythagore.js'
import Exercice from '../Exercice.js'
export const titre = 'Bonne année...'

export const dateDePublication = '02/01/2023'

/**
 * Questions à propos de 2023 (et à l'occasion de la nouvelle année)
 * @author Eric Elter (et Jean-Claude Lhote pour l'exercice 22)
 */

export default function Questions2023 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.spacing = context.isHtml ? 2 : 1
  this.spacingCorr = context.isHtml ? 2 : 1
  this.listePackages = 'xlop'
  this.listePackages = 'oldprsn'
  this.sup = '1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-16-17-18-19-20-21-22-23-24-25-26-27-28'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let QuestionsDisponibles = []
    if (!this.sup) { // Si aucune liste n'est saisie
      QuestionsDisponibles = choice(rangeMinMax(1, 28))
    } else {
      if (!isNaN(this.sup)) { // Si c'est un nombre c'est qu'il y a qu'un problème
        QuestionsDisponibles[0] = contraindreValeur(1, 28, parseInt(this.sup), 1)
      } else {
        QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          QuestionsDisponibles[i] = contraindreValeur(1, 28, parseInt(QuestionsDisponibles[i]), 1) // parseInt en fait un tableau d'entiers
        }
      }
    }
    let texte = ''
    let texteCorr = ''
    // QuestionsDisponibles = range1(28)
    let choixLettre = choisitLettresDifferentes(23, 'OQW', true)
    choixLettre = combinaisonListes(choixLettre, 30)
    const unEspace = QuestionsDisponibles.length !== 1 ? sp(7) : ''
    for (let i = 0, rep, f, c, centre1, centre2, c1, c2, axeX, axeY, x1, x2, rayon1, rayon2, texte1, texte2, texte3, h1, h2, H1, H2, M1, M2, d, normale; i < QuestionsDisponibles.length; i++) {
      texte += QuestionsDisponibles.length === 1 ? '' : numAlphaNum(i)
      texteCorr += QuestionsDisponibles.length === 1 ? '' : numAlphaNum(i)
      switch (QuestionsDisponibles[i]) {
        case 1 : // CM
          texte += ` Soit la suite de nombres : $2-5-8-\\dots$ ${sp(5)} Quels sont les $7^{\\text{ème}}$ et $8^{\\text{ème}}$ termes de la suite ?<br>`
          texteCorr += ` Dans la suite de nombres : $2-5-8-\\dots$${sp()}, on remarque qu'à chaque nombre, on ajoute $3$ pour obtenir le prochain.<br>`
          texteCorr += ` Donc la suite de nombres se poursuit ainsi : $2-5-8-11-14-17-20-23$${sp()} et de fait, les $7^{\\text{ème}}$ et $8^{\\text{ème}}$ termes de la suite sont $${miseEnEvidence(20)}$ et $${miseEnEvidence(23)}$.<br>`
          break
        case 2 : // CM
          texte += ` $${texNombre(2023)}$ is it a $4$T-word ? A $4$T-word is a group of $4$ words in which the initial of each word is T.<br>`
          texteCorr += ` $${texNombre(2023)}$ s'écrit en anglais : ${texteEnCouleurEtGras('t')}wo ${texteEnCouleurEtGras('t')}housand ${texteEnCouleurEtGras('t')}wenty-${texteEnCouleurEtGras('t')}hree et les initiales de chacun des $4$ mots est un T.<br>`
          texteCorr += ` So, $${texNombre(2023)}$ is a $${miseEnEvidence(4)}$${texteEnCouleurEtGras('T-word')}.<br>`
          break
        case 3 : // CM
          texte += ` Comment écrire $${texNombre(2023)}$ comme somme de deux entiers consécutifs ?<br>`
          texteCorr += ` $${texNombre(2023)}\\div2=${texNombre(1011.5)}$<br>`
          texteCorr += ` Et donc $2023=${miseEnEvidence(texNombre(1011))}+${miseEnEvidence(texNombre(1012))}$.<br>`
          break
        case 4 : // CM
          texte += ` Quelle est l'écriture romaine de $${texNombre(2023)}$ ?<br>`
          texteCorr += ` L'écriture romaine de $${texNombre(2023)}$ est : $\\underbrace{\\text{MMXXIII}}_{(${texNombre(1000)}\\times2)+(10\\times2)+(1\\times3)}$.<br>`
          break
        case 5 : // 6e
          texte += ' Comment écrire $2023$ comme somme de sept entiers consécutifs ?<br>'
          texteCorr += ` $${texNombre(2023)}\\div7=289$<br>`
          texteCorr += ` Et donc $2023=${miseEnEvidence(texNombre(286))}+${miseEnEvidence(texNombre(287))}+${miseEnEvidence(texNombre(288))}+${miseEnEvidence(texNombre(289))}+${miseEnEvidence(texNombre(290))}+${miseEnEvidence(texNombre(291))}+${miseEnEvidence(texNombre(292))}$.<br>`
          break
        case 6: // 6e
          texte += ' Comment écrire $2023$ comme somme de quatorze entiers consécutifs ?<br>'
          texteCorr += ` $${texNombre(2023)}\\div14=${texNombre(144.5)}$<br>`
          texteCorr += ` Et donc $2023=\\underbrace{${miseEnEvidence(texNombre(138))}+${miseEnEvidence(texNombre(139))}+\\dots+${miseEnEvidence(texNombre(144))}}_{\\text{7 nombres}}+\\underbrace{${miseEnEvidence(texNombre(145))}+\\dots+${miseEnEvidence(texNombre(150))}+${miseEnEvidence(texNombre(151))}}_{\\text{7 nombres}}$.<br>`
          break
        case 7 : // 6e
          texte += ' Comment écrire $2023$ comme somme de dix-sept entiers consécutifs ?<br>'
          texteCorr += ` $${texNombre(2023)}\\div17=119$<br>`
          texteCorr += ` Et donc $2023=\\underbrace{${miseEnEvidence(texNombre(111))}+${miseEnEvidence(texNombre(112))}+\\dots+${miseEnEvidence(texNombre(118))}}_{\\text{8 nombres}}+${miseEnEvidence(texNombre(119))}+\\underbrace{${miseEnEvidence(texNombre(120))}+\\dots+${miseEnEvidence(texNombre(126))}+${miseEnEvidence(texNombre(127))}}_{\\text{8 nombres}}$.<br>`
          break
        case 8 : // 6e
          texte += ' Comment écrire $2023$ comme somme de trente-quatre entiers consécutifs ?<br>'
          texteCorr += ` $${texNombre(2023)}\\div34=${texNombre(59.5)}$<br>`
          texteCorr += ` Et donc $${texNombre(2023)}=\\underbrace{${miseEnEvidence(texNombre(43))}+${miseEnEvidence(texNombre(44))}+\\dots+${miseEnEvidence(texNombre(59))}}_{\\text{17 nombres}}+\\underbrace{${miseEnEvidence(texNombre(60))}+\\dots+${miseEnEvidence(texNombre(75))}+${miseEnEvidence(texNombre(76))}}_{\\text{17 nombres}}$.<br>`
          break
        case 9 : // 6e
          texte += ` Calculer : $${choixLettre[i]}=((10+9)\\times(8+7)\\div(6-5)+4)\\times(3\\times2+1)$<br>`
          texteCorr += ` $${choixLettre[i]}=((10+9)\\times(8+7)\\div(6-5)+4)\\times(3\\times2+1)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(19\\times15\\div1+4)\\times(6+1)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(285\\div1+4)\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(285+4)\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=289\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 10 : // 6e
          texte += ` $${texNombre(2023)}$ est-il divisible par la somme de ses chiffres ?<br>`
          texteCorr += `La somme des chiffres de $${texNombre(2023)}$ est $2+0+2+3=7$. Posons : $2023\\div7$.`
          texteCorr += Operation({ operande1: 2023, operande2: 7, type: 'divisionE' })
          texteCorr += `Le reste de la division euclidienne de $${texNombre(2023)}$ par $7$ est $0$ donc $${texNombre(2023)}$ est bien ${texteEnCouleurEtGras('divisible')} par la somme de ses chiffres.<br>`
          break
        case 11 : // 6e
          texte += ` Calculer : $${choixLettre[i]}=(10+(9\\times(((8-(7-6))\\times5)-4)))\\times(3\\times2+1)$<br>`
          texteCorr += ` $${choixLettre[i]}=(10+(9\\times(((8-(7-6))\\times5)-4)))\\times(3\\times2+1)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+(9\\times(((8-1)\\times5)-4)))\\times(6+1)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+(9\\times((7\\times5)-4)))\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+(9\\times(35-4)))\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+(9\\times31))\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+279))\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=289\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 12 : // 6e
          texte += ` Calculer : $${choixLettre[i]}=(10+(9+8\\times7)\\times 6)\\times 5+4\\times 3\\times 2-1$<br>`
          texteCorr += ` $${choixLettre[i]}=(10+(9+8\\times7)\\times 6)\\times 5+4\\times 3\\times 2-1$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+(9+56)\\times 6)\\times 5+12\\times 2-1$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+65\\times 6)\\times 5+24-1$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+390)\\times 5+23$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=400\\times 5+23$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${texNombre(2000)}+23$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 13 : // 5e
          texte += ` Calculer : $${choixLettre[i]}=(10+(9\\times(8-(7-6\\times5))))\\times(4\\times3\\div2+1)$<br>`
          texteCorr += ` $${choixLettre[i]}=(10+(9\\times(8-(7-6\\times5))))\\times(4\\times3\\div2+1)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+(9\\times(8-(7-30))))\\times(12\\div2+1)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+(9\\times(8-(-23))))\\times(6+1)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+(9\\times(8+23)))\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+(9\\times31))\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(10+279))\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=289\\times7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 14 : // 4e
          texte += ` Soit $DEF$ un triangle rectangle en $E$ tel que $DE=${texNombre(2040)}$ et $DF=${texNombre(2873)}$. Combien vaut $EF$?<br>`
          texteCorr += ' ' + RedactionPythagore('E', 'F', 'D', 2, 2023, 2040, 2873, '')[0] + '<br>'
          break
        case 15 : // 4e
          texte += ` Calculer : $${choixLettre[i]}=(2+0+2+3)\\times (2^2+0^2+2^2+3^2)^2$<br>`
          texteCorr += ` $${choixLettre[i]}=(2+0+2+3)\\times (2^2+0^2+2^2+3^2)^2$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=7\\times (4+0+4+9)^2$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=7\\times 17^2$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=7\\times 289$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 16 : // 4e
          texte += ` Calculer : $${choixLettre[i]}=(2+0+2+3)\\times(2+0+2^3+2^0+2\\times3)\\times(2\\times0+2+3+(2+0+2)\\times3)$<br>`
          texteCorr += ` $${choixLettre[i]}=(2+0+2+3)\\times(2+0+2^3+2^0+2\\times3)\\times(2\\times0+2+3+(2+0+2)\\times3)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=7\\times(2+0+8+1+6)\\times(0+2+3+4\\times3)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=7\\times17\\times(5+12)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=119\\times17$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 17 : // 3e
          texte += ` $${texNombre(2023)}$ est un nombre déficient. Prouver-le.<br>`
          texteCorr += ` Un nombre est déficient lorsque la somme de ses diviseurs est inférieure à 2 fois ce nombre. Or, les diviseurs de $${texNombre(2023)}$ sont : $1$, $7$, $17$, $119$, $289$ et $${texNombre(2023)}$.<br>`
          texteCorr += `$${texNombre(2023)}\\times2=${texNombre(4046)}$ et  $1+7+17+119+289+${texNombre(2023)}=${texNombre(2456)}${miseEnEvidence('<')}${texNombre(4046)}$.<br>`
          break
        case 18 : // 3e
          texte += ` $${texNombre(2023)}$ est un nombre équidigital. Prouver-le.<br>`
          texteCorr += ` Un nombre équidigital est un entier naturel qui a autant de chiffres dans son écriture que dans sa décomposition en facteurs premiers, exposants différents de 1 inclus. Or, la décomposition en facteurs premiers de  $${texNombre(2023)}$ est : $7\\times17^2$.<br>`
          texteCorr += `Il y a donc autant de chiffres dans $${texNombre(2023)}$ ($2$, $0$, $2$ et $3$) que dans sa décomposition en facteurs premiers ($7$, $1$, $7$ et $2$).<br>`
          break
        case 19 : // 3e
          texte += ` $${texNombre(2023)}$ est un nombre équidigital. Prouver-le.<br>`
          texteCorr += ' Un nombre équidigital est un entier naturel qui est divisible par la somme de ses chiffres.<br>'
          texteCorr += `La somme des chiffres de $${texNombre(2023)}$ est $2+0+2+3=7$. Posons : $2023\\div7$.`
          texteCorr += Operation({ operande1: 2023, operande2: 7, type: 'divisionE' })
          texteCorr += `Le reste de la division euclidienne de $${texNombre(2023)}$ par $7$ est $0$ donc $${texNombre(2023)}$ est bien ${texteEnCouleurEtGras('divisible')} par la somme de ses chiffres.<br>`
          break
        case 20 : // Première
          texte += ` Calculer : $${choixLettre[i]}=(2^3-1)\\displaystyle\\sum_{k=0}^{2^4}(2k+1)$<br>`
          texteCorr += ` $${choixLettre[i]}=(2^3-1)\\displaystyle\\sum_{k=0}^{2^4}(2k+1)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=(8-1)(\\displaystyle\\sum_{k=0}^{16}(2k)+\\displaystyle\\sum_{k=0}^{16}(1))$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=7(2\\displaystyle\\sum_{k=1}^{16}(k)+17)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=14\\displaystyle\\sum_{k=1}^{16}(k)+7\\times17$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=14\\times\\dfrac{16\\times17}{2}+119$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=14\\times136+119$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${texNombre(1904)}+119$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 21 : // Première
          texte += ` Calculer : $${choixLettre[i]}=\\displaystyle\\sum_{k=0}^{(2+0+2^3)\\times(2^0+2)+3}((2+0+2^3)\\times(2+0+2)+3+k)$<br>`
          texteCorr += ` $${choixLettre[i]}=\\displaystyle\\sum_{k=0}^{(2+0+2^3)\\times(2^0+2)+3}((2+0+2^3)\\times(2+0+2)+3+k)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=\\displaystyle\\sum_{k=0}^{(2+0+8)\\times(1+2)+3}((2+0+8)\\times4+3+k)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=\\displaystyle\\sum_{k=0}^{10\\times3+3}(10\\times4+3+k)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=\\displaystyle\\sum_{k=0}^{33}(43+k)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=\\displaystyle\\sum_{k=0}^{33}(43)+\\displaystyle\\sum_{k=0}^{33}(k)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=34\\times43+\\displaystyle\\sum_{k=1}^{33}(k)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=34\\times43+\\dfrac{33\\times34}{2}$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${texNombre(1462)}+\\dfrac{${texNombre(1122)}}{2}$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${texNombre(1462)}+${texNombre(561)}$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 22 : // 1ère
          rep = repere({ xMin: -3, xMax: 3, yMin: -1, yMax: 10, axeXisVisible: false, axeYisVisible: false, grille: false })
          f = x => (x ** 2) / 0.5
          c = courbe(f, { repere: rep, xMin: -3, xMax: 3, step: 0.1, epaisseur: 1 })
          centre1 = point(0, 3.75, 'C', 'above right')
          centre2 = point(0, 6.95, 'C\'', 'above left')
          c1 = cercle(centre1, 1.35, 'purple')
          c2 = cercle(centre2, 1.85, 'purple')
          axeX = segment(-3, 0, 3, 0)
          axeY = segment(0, -1, 0, 10)
          axeX.epaisseur = 0.3
          axeY.epaisseur = 0.3
          x1 = 1.33
          x2 = 1.825
          rayon1 = segment(centre1, rotation(point(x1, f(x1)), centre1, 160), 'red')
          rayon2 = segment(centre2, rotation(point(x2, f(x2)), centre2, 40), 'red')
          texte1 = texteParPosition('2022', -0.4, 4.3, 'milieu', 'red', 0.7, 'middle', true)
          texte2 = texteParPosition('r = ?', 0.4, 7.7, 'milieu', 'red', 0.8, 'middle', true)
          texte3 = latexParCoordonnees('y=x^2', 1, 1, 'black', 0, 20, '', 6)
          h1 = segment(0, f(x1), x1, f(x1))
          h2 = segment(0, f(x2), x2, f(x2))
          h1.pointilles = 2
          h2.pointilles = 2

          H1 = texteParPosition('H', -0.2, f(x1), 'milieu', 'black', 0.6, 'middle', true)
          H2 = texteParPosition('H\'', -0.2, f(x2), 'milieu', 'black', 0.6, 'middle', true)

          M1 = texteParPosition('M', x1 + 0.2, f(x1), 'milieu', 'black', 0.6, 'middle', true)
          M2 = texteParPosition('M\'', x2 + 0.2, f(x2) - 0.2, 'milieu', 'black', 0.6, 'middle', true)
          d = droite(centre2, point(x2, f(x2)))
          normale = texteParPosition('normale', -2.5, 7.7, 'milieu', 'black', 0.8, 'middle', false)
          texteCorr += 'La figure ci-dessous n\'est pas réaliste.<br>'
          texteCorr += mathalea2d({ xmin: -3, xmax: 3, ymin: -1, ymax: 10, pixelsParCm: 30, scale: 1 }, rep, c, axeX, axeY, c1, c2, rayon1, rayon2, texte1, texte2, texte3, h1, H1, M1, H2, M2, h2, d, normale, labelPoint(centre1, centre2))
          texteCorr += 'Préambule : Soit $y = ax+b$, l\'équation de la normale à la parabole en $( x_0 ; x_0^2 )$.<br>'
          texteCorr += sp(29) + 'Vu que le nombre dérivé en $x_0$ est $2x_0$, alors $a=\\dfrac{-1}{2x_0}$.<br>'
          texteCorr += sp(29) + 'Pour le point considéré, $x_0^2=\\dfrac{-1}{2x_0}x_0+b$ d\'où $b=x_0^2+0{,}5$.<br>'
          texteCorr += `${texteEnCouleur('Conclusion de ce préambule')}` + ' : La normale à la parabole coupe l\'axe des ordonnées une demie-unité plus haut que le point considéré de la parabole.<br><br>'
          texteCorr += `Dans le triangle $CHM$, rectangle en $H$, d'après la propriété de Pythagore, la longueur $HM$ est égale à : $\\sqrt{${texNombre(2022)}^2-0{,}5^2}$.<br>`
          texteCorr += 'C\'est aussi l\'abscisse du point $M$.<br>'
          texteCorr += `On en déduit que l'ordonnée du point $M$ (et donc de $H$) est $${texNombre(2022)}^2-0{,}25$.<br>`
          texteCorr += `Le point $C$ a donc pour coordonnées : $(0;${texNombre(2022)}^2+0{,}25)$.<br>`
          texteCorr += `Pour obtenir l'ordonnée de $C'$, on ajoute $r+${texNombre(2022)}$.<br>`
          texteCorr += `On obtient donc pour l'ordonnée de $C'$ : $${texNombre(2022)}^2+0{,}25+${texNombre(2022)}+r$.<br>`
          texteCorr += `Le point $M'$ a pour coordonnées $(\\sqrt{r^2-0{,}5^2}${sp(2)};${sp(2)}${texNombre(2022)}^2-0{,}25+${texNombre(2022)}+r)$.<br>`
          texteCorr += 'Or comme $M\'$ est sur la courbe, son ordonnée est aussi le carré de son abscisse, ce qui nous donne l\'égalité : '
          texteCorr += `$r^2-0{,}25 = ${texNombre(2022)}^2-0{,}25+${texNombre(2022)}+r$.<br>`
          texteCorr += `En réorganisant cette équation, nous obtenons : $r^2 - ${texNombre(2022)}^2 = ${texNombre(2022)}+r$.<br>`
          texteCorr += `On en déduit que : $(r-${texNombre(2022)})(r+${texNombre(2022)}) = r+${texNombre(2022)}$.<br>`
          texteCorr += `Ce qui conduit à : $r-${texNombre(2022)}=1$ d'où $r=${miseEnEvidence(texNombre(2023))}$.<br>`
          texte += (mathalea2d({ xmin: -3, xmax: 3, ymin: -1, ymax: 10, pixelsParCm: 30, scale: 1 }, rep, c, axeX, axeY, c1, c2, rayon1, rayon2, texte1, texte2, texte3))
          break
        case 23 : // Terminale
          texte += ' Quel est le reste de la division euclidienne de $\\text{7}^\\text{7}$ par $\\text{7!}$ ?<br>'
          texteCorr += `$\\text{7}^\\text{7}=${texNombre(823543)}$ et $\\text{7!}=${texNombre(5040)}$. Posons : $${texNombre(823543)}\\div${texNombre(5040)}$.`
          texteCorr += Operation({ operande1: 823543, operande2: 5040, type: 'divisionE' })
          texteCorr += `Le reste de la division euclidienne de $\\text{7}^\\text{7}$ par $\\text{7!}$ est $${miseEnEvidence(texNombre(2023))}$.<br>`
          break
        case 24 : // Terminale
          texte += ` Calculer : $${choixLettre[i]}=(10+9)\\times(8+7+6)\\times 5+4!+3+2-1$<br>`
          texteCorr += ` $${choixLettre[i]}=(10+9)\\times(8+7+6)\\times 5+4!+3+2-1$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=19\\times21\\times 5+24+3+2-1$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=19\\times21\\times 5+24+3+2-1$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${texNombre(1995)}+28$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 25 : // Terminale
          texte += ` Calculer : $${choixLettre[i]}=10\\times(9+8\\times7-6+5!+4!)-3\\times 2-1$<br>`
          texteCorr += ` $${choixLettre[i]}=10\\times(9+8\\times7-6+5!+4!)-3\\times 2-1$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=10\\times(9+56-6+120+24)-6-1$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=10\\times203-7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${texNombre(2030)}-7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 26 : // Terminale
          texte += ` Calculer : $${choixLettre[i]}=10\\times 9\\times 8\\times 7\\div 6\\div 5\\times 4\\times3+(2+1)!+0!$<br>`
          texteCorr += ` $${choixLettre[i]}=10\\times 9\\times 8\\times 7\\div 6\\div 5\\times 4\\times3+(2+1)!+0!$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=90\\times 56\\div 6\\div 5\\times 12+3!+1$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${texNombre(5040)}\\div 6\\div 5\\times 12+6+1$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=840\\div5\\times 12+7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=168\\times 12+7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${texNombre(2016)}+7$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 27 : // Terminale
          texte += ` Calculer : $${choixLettre[i]}=-1+\\displaystyle\\sum_{k=1}^{2^4+2^3-2^2+2^1-2^0}\\dfrac{k(k+1)}{2}$<br>`
          texteCorr += ` $${choixLettre[i]}=-1+\\displaystyle\\sum_{k=1}^{2^4+2^3-2^2+2^1-2^0}\\dfrac{k(k+1)}{2}$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=-1+\\displaystyle\\sum_{k=1}^{16+8-4+2-1}\\dfrac{k^2+k)}{2}$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=-1+\\dfrac{1}{2}(\\displaystyle\\sum_{k=1}^{21}k^2+\\displaystyle\\sum_{k=1}^{21}k)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=-1+\\dfrac{1}{2}(\\dfrac{22\\times23\\times45}{6}+\\dfrac{22\\times23}{2})$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=-1+\\dfrac{1}{2}(\\dfrac{${texNombre(22770)}}{6}+\\dfrac{506}{2})$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=-1+\\dfrac{1}{2}(${texNombre(3795)}+253)$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=-1+\\dfrac{1}{2}\\times${texNombre(4048)}$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=-1+${texNombre(2024)}$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
        case 28 : // Post Bac
          texte += ` Calculer : $${choixLettre[i]}=1!+2!-3!-4!!-5!+6!+7!!+8!!+9!!$<br>`
          texteCorr += ` $${choixLettre[i]}=1!+2!-3!-4!!-5!+6!+7!!+8!!+9!!$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=1+2-6-8-120+720+105+384+945$<br>`
          texteCorr += ` $${unEspace}${choixLettre[i]}=${miseEnEvidence(texNombre(2023))}$<br>`
          break
      }
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Choix des questions', 'Nombres séparés par des tirets\nDe 1 à 4 : Niveau CM2\nDe 5 à 12 : Niveau 6ème\n13 : Niveau 5ème\nDe 14 à 16 : Niveau 4ème\nDe 17 à 19 : Niveau 3ème\nDe 20 à 22 : Niveau 1ère\nDe 23 à 27 : Niveau Terminale\n28 : Niveau Post-Bac']
}
