import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, texteEnCouleur } from '../../modules/outils.js'
import { repere, courbe, segment, rotation, point, cercle, texteParPosition, latexParCoordonnees, droite, labelPoint } from '../../modules/2d.js'
import { mathalea2d } from '../../modules/2dGeneralites'
export const titre = 'Question parabolique'

export default function betaparabole2023 () {
  Exercice.call(this)
  this.nouvelleVersion = function () {
    const rep = repere({ xMin: -3, xMax: 3, yMin: -1, yMax: 10, axeXisVisible: false, axeYisVisible: false, grille: false })
    const f = x => (x ** 2) / 0.5
    const c = courbe(f, { repere: rep, xMin: -3, xMax: 3, step: 0.1, epaisseur: 1 })
    const centre1 = point(0, 3.75, 'C', 'above right')
    const centre2 = point(0, 6.95, 'C\'', 'above left')
    const c1 = cercle(centre1, 1.35, 'purple')
    const c2 = cercle(centre2, 1.85, 'purple')
    const axeX = segment(-3, 0, 3, 0)
    const axeY = segment(0, -1, 0, 10)
    axeX.epaisseur = 0.3
    axeY.epaisseur = 0.3
    const x1 = 1.33
    const x2 = 1.825
    const rayon1 = segment(centre1, rotation(point(x1, f(x1)), centre1, 160), 'red')
    const rayon2 = segment(centre2, rotation(point(x2, f(x2)), centre2, 40), 'red')
    const texte1 = texteParPosition('2022', -0.4, 4.3, 'milieu', 'red', 0.7, 'middle', true)
    const texte2 = texteParPosition('r = ?', 0.4, 7.7, 'milieu', 'red', 0.8, 'middle', true)
    const texte3 = latexParCoordonnees('y=x^2', 1, 1, 'black', 0, 20, '', 6)
    const h1 = segment(0, f(x1), x1, f(x1))
    const h2 = segment(0, f(x2), x2, f(x2))
    h1.pointilles = 2
    h2.pointilles = 2

    const H1 = texteParPosition('H', -0.2, f(x1), 'milieu', 'black', 0.6, 'middle', true)
    const H2 = texteParPosition('H\'', -0.2, f(x2), 'milieu', 'black', 0.6, 'middle', true)

    const M1 = texteParPosition('M', x1 + 0.2, f(x1), 'milieu', 'black', 0.6, 'middle', true)
    const M2 = texteParPosition('M\'', x2 + 0.2, f(x2), 'milieu', 'black', 0.6, 'middle', true)
    const d = droite(centre2, point(x2, f(x2)))
    const normale = texteParPosition('normale', -2.5, 7.7, 'milieu', 'black', 0.8, 'middle', false)
    let texteCorr = 'La figure ci-dessous n\'est pas réaliste.<br>'
    texteCorr += mathalea2d({ xmin: -3, xmax: 3, ymin: -1, ymax: 10, pixelsParCm: 30, scale: 1 }, rep, c, axeX, axeY, c1, c2, rayon1, rayon2, texte1, texte2, texte3, h1, H1, M1, H2, M2, h2, d, normale, labelPoint(centre1, centre2))
    texteCorr += 'Préambule : soit $y = ax+b$ l\'équation de la normale à la parabole en $( x_0 ; x_0^2 )$.<br>'
    texteCorr += 'Vu que le nombre dérivé en $x_0$ est $2x_0$, $a=\\dfrac{-1}{2x_0}$.<br>'
    texteCorr += 'Pour le point considéré, $x_0^2=\\dfrac{-1}{2x_0}x_0+b$ d\'où $b=x_0^2+0{,}5$.<br>'
    texteCorr += `${texteEnCouleur('Conslusion de ce préambule : la normale à la parabole coupe l\'axe des ordonnées une demi unité plus haut que le point considéré de la parabole.')}<br><br>`
    texteCorr += 'Dans le triangle $CHM$, rectangle en $H$, d\'après la propriété de Pythagore, la longueur $HM$ est égale à : $\\sqrt{2022^2-0{,}5^2}$.<br>'
    texteCorr += 'C\'est aussi l\'abscisse du point $M$.<br>'
    texteCorr += 'On en déduit que l\'ordonnée du point $M$ et donc de $H$ est $2022^2-0{,}25$.<br>'
    texteCorr += 'Le point $C$ a donc pour coordonnées : $(0;2022^2+0{,}25)$.<br>'
    texteCorr += 'Pour obtenir l\'ordonnée de $C\'$, on ajoute $r+2022$.<br>'
    texteCorr += 'On obtient donc :: $2022^2+0{,}25+2022+r$<br>'
    texteCorr += 'Le point $M\'$ a pour coordonnées $(\\sqrt{r^2-0{,}5^2};2022^2-0{,}25+2022+r)$.<br>'
    texteCorr += 'Or comme $M\'$ est sur la courbe, son ordonnée est aussi le carré de son abscisse, ce qui nous donne l\'égalité :<br>'
    texteCorr += '$r^2-0{,}25 = 2022^2-0{,}25+2022+r$<br>'
    texteCorr += 'En réorganisant cette équation, nous obtenons : $r^2 - 2022^2 = 2022+r$<br>'
    texteCorr += 'On en déduit que : $(r-2022)(r+2022) = r+2022$.<br>'
    texteCorr += 'Ce qui conduit à : $r-2022=1$ d\'où $r=2023$.<br>'
    this.listeQuestions.push(mathalea2d({ xmin: -3, xmax: 3, ymin: -1, ymax: 10, pixelsParCm: 30, scale: 1 }, rep, c, axeX, axeY, c1, c2, rayon1, rayon2, texte1, texte2, texte3))
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
