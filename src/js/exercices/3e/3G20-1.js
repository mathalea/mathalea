import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, arrondi, calcul, texNombrec, creerNomDePolygone, nombreAvecEspace, texFraction, texNombre } from '../../modules/outils.js'
import { point, milieu, pointSurSegment, labelPoint, segment, polygone, codageAngleDroit, texteSurSegment, texteParPoint, longueur, mathalea2d } from '../../modules/2d.js'
export const titre = 'Problèmes avec le théorème de Thalès'

/**
* Banque de problèmes utilisant le théorème de Thalès et différentes propriétés de géométrie
* @author Rémi Angot
* 3G20-1
*/
export default function ProblemesThales () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let texte = ''
    let texteCorr = ''
    const typesDeQuestions = randint(1, 2)
    let A, B, C, D, E, M, N, x, k, y, p, codage1, codage2, codage3, codage4, sMN, sBD, sCote, texte1, texte2, texte3, texte4, labels, BC, BD, MN
    const [nomA, nomB, nomC, nomD] = creerNomDePolygone(4, ['MNQD'])
    switch (typesDeQuestions) {
      case 1:
        x = randint(6, 10)
        k = calcul(randint(12, 19) / 10)
        y = calcul(randint(30, 50) / 10);
        [A, B, C, D, E] = creerNomDePolygone(5, 'QD')
        texte = `On sait que $${A}${E}=${x}$ cm ; $${A}${D}=${texNombrec(k * x)}$ cm et $${E}${B}=${texNombre(y)}$ cm.<br>`
        texte += `Calculer la valeur exacte de $${D}${C}$.`
        if (context.isHtml) {
          // Pour le svg toutes les longueurs sont multipliées par 20
          const fig1 = `<div><svg width="450" height="300" viewBox="-40 -40 450 300" xmlns="http://www.w3.org/2000/svg">
 <polygon points="0,0 ${calcul(k * x * 20)},0 ${calcul(k * x * 20)},${calcul(k * y * 20)}  " fill="none" stroke="black" />
 <line x1="${calcul(x * 20)}" y1="0" x2="${calcul(x * 20)}" y2="${calcul(y * 20)}" stroke="black" /> //[BE]
 <polyline points="${calcul(x * 20 - 10)},0 ${calcul(x * 20 - 10)},10 ${calcul(x * 20)},10" fill="none" stroke="black" />  //Angle droit en E
 <polyline points="${calcul(k * x * 20 - 10)},0 ${calcul(k * x * 20 - 10)},10 ${calcul(k * x * 20)},10" fill="none" stroke="black" />  //Angle droit en D
 <text x="-10" y="-10" text-anchor="middle" alignment-baseline="central">${A}</text> 
 <text x="${calcul(x * 20)}" y="-10" text-anchor="middle" alignment-baseline="central">${E}</text> 
 <text x="${calcul(x * 20)}" y="${calcul(y * 20 + 10)}" text-anchor="middle" alignment-baseline="central">${B}</text> 
 <text x="${calcul(k * x * 20 + 10)}" y="-10" text-anchor="middle" alignment-baseline="central">${D}</text>
<text x="${calcul(k * x * 20 + 10)}" y="${calcul(k * y * 20 + 10)}" text-anchor="middle" alignment-baseline="central">${C}</text>
</svg></div>`

          const fig2 = `<div><svg width="450" height="300" viewBox="-40 -260 450 300" xmlns="http://www.w3.org/2000/svg">
 <polygon points="0,0 ${calcul(k * x * 20)},0 ${calcul(k * x * 20)},${calcul(-k * y * 20)}  " fill="none" stroke="black" />
 <line x1="${calcul(x * 20)}" y1="0" x2="${calcul(x * 20)}" y2="${calcul(-y * 20)}" stroke="black" /> //[BE]
 <polyline points="${calcul(x * 20 - 10)},0 ${calcul(x * 20 - 10)},-10 ${calcul(x * 20)},-10" fill="none" stroke="black" />  //Angle droit en E
 <polyline points="${calcul(k * x * 20 - 10)},0 ${calcul(k * x * 20 - 10)},-10 ${calcul(k * x * 20)},-10" fill="none" stroke="black" />  //Angle droit en D
 <text x="-10" y="-10" text-anchor="middle" alignment-baseline="central">${A}</text> 
 <text x="${calcul(x * 20)}" y="10" text-anchor="middle" alignment-baseline="central">${E}</text> 
 <text x="${calcul(x * 20)}" y="${calcul(-y * 20 - 10)}" text-anchor="middle" alignment-baseline="central">${B}</text> 
 <text x="${calcul(k * x * 20 + 10)}" y="10" text-anchor="middle" alignment-baseline="central">${D}</text>
 <text x="${calcul(k * x * 20 + 10)}" y="${calcul(-k * y * 20 - 10)}" text-anchor="middle" alignment-baseline="central">${C}</text>
</svg></div>`

          texte += choice([fig1, fig2])
        } else {
          const fig1 = `\\begin{tikzpicture}[scale=.6]
\\draw (0,0)--(${calcul(k * x)},0)--(${calcul(k * x)},${-k * y})--cycle;
\\draw (${x},0)--(${x},${-y});
\\draw (${x},0) rectangle ++(-.5,-.5);
\\draw (${calcul(k * x)},0) rectangle ++(-.5,-.5);
\\node [above left] at (0,0) {${A}};
\\node [above] at (${x},0) {${E}};
\\node [above right] at (${k * x},0) {${D}};
\\node [below right] at (${k * x},${-k * y}) {${C}};
\\node [below] at (${x},${-y}) {${B}};
\\end{tikzpicture}`

          const fig2 = `\\begin{tikzpicture}[scale=.6]
\\draw (0,0)--(${calcul(k * x)},0)--(${calcul(k * x)},${k * y})--cycle;
\\draw (${x},0)--(${x},${y});
\\draw (${x},0) rectangle ++(.5,.5);
\\draw (${calcul(k * x)},0) rectangle ++(.5,.5);
\\node [below left] at (0,0) {${A}};
\\node [below] at (${x},0) {${E}};
\\node [below right] at (${k * x},0) {${D}};
\\node [above right] at (${k * x},${k * y}) {${C}};
\\node [above] at (${x},${y}) {${B}};
\\end{tikzpicture}`

          texte += '<br>' + choice([fig1, fig2])
        }
        texteCorr = `Les droites $(${E}${B})$ et $(${D}${C})$ sont perpendiculaires à la même droite $(${A}${D})$, elles sont donc parallèles entre elles.`
        texteCorr += `<br>De plus les points $${A}$, $${E}$, $${D}$  et $${A}$, $${B}$, $${C}$ sont alignés dans cet ordre donc d'après le théorème de Thalès on a :`
        texteCorr += `<br><br>$\\dfrac{${A}${E}}{${A}${D}}=\\dfrac{${E}${B}}{${D}${C}}=\\dfrac{${A}${B}}{${A}${C}}$`
        texteCorr += `<br><br>$\\dfrac{${x}}{${texNombrec(k * x)}}=\\dfrac{${texNombre(y)}}{${D}${C}}$`
        texteCorr += `<br><br>$${D}${C}=\\dfrac{${texNombrec(k * x)}\\times${texNombre(y)}}{${x}}=${texNombrec(k * y)}$`
        break

      case 2:
        BC = randint(2, 6)
        BD = 2 * BC
        MN = calcul(BD * choice([0.2, 0.3, 0.4]))
        A = point(0, 4, nomA, 'above')
        B = point(7, 4, nomB, 'above')
        C = point(7, 0, nomC, 'below')
        D = point(0, 0, nomD, 'below')
        p = polygone(A, B, C, D)
        codage1 = codageAngleDroit(D, A, B)
        codage2 = codageAngleDroit(A, B, C)
        codage3 = codageAngleDroit(B, C, D)
        codage4 = codageAngleDroit(C, D, A)
        M = pointSurSegment(A, B, longueur(A, B) / 3, 'M', 'above')
        N = pointSurSegment(A, D, longueur(A, D) / 3, 'N', 'left')
        sMN = segment(M, N)
        sBD = segment(B, D)
        sCote = segment(point(N.x - 1.3, N.y), point(D.x - 1.3, D.y))
        sCote.styleExtremites = '<->'
        texte1 = texteParPoint('?', milieu(point(N.x - 1.5, N.y), point(D.x - 1.5, D.y)), 'gauche')
        texte2 = texteSurSegment(nombreAvecEspace(BD) + ' cm', B, D)
        texte3 = texteSurSegment(nombreAvecEspace(MN) + ' cm', M, N)
        texte4 = texteSurSegment(nombreAvecEspace(BC) + ' cm', B, C)

        labels = labelPoint(M, N, A, B, C, D)

        texte = `Sur la figure ci-dessous $${nomA + nomB + nomC + nomD}$ est un rectangle et $(MN)$ est parallèle à la diagonale $(${nomB + nomD})$.`
        texte += `<br>Calculer la longueur $${nomD + 'N'}$ au millimètre près.<br><br>`
        texte += mathalea2d({
          xmin: -2,
          xmax: 9,
          ymin: -1.5,
          ymax: 5,
          scale: 0.8
        }, p, codage1, codage2, codage3, codage4, sMN, sBD, sCote, texte1, texte2, texte3, texte4, labels)

        texteCorr = `Dans le triangle $${nomA + nomB + nomD}$, $M$ est un point de $[${nomA + nomB}]$, $N$ est un point de $[${nomA + nomD}]$ et $(MN)$ est parallèle à $(${nomB + nomD})$ donc d'après le théorème de Thalès on a : `
        texteCorr += `<br><br> $${texFraction(nomA + 'M', nomA + nomB)}=${texFraction(nomA + 'N', nomA + nomD)}=${texFraction('MN', nomB + nomD)}$`
        texteCorr += `<br><br> $${texFraction(nomA + 'M', nomA + nomB)}=${texFraction(nomA + 'N', BC)}=${texFraction(MN, BD)}$`
        texteCorr += `<br><br> $${nomA}N = ${texFraction(BC + '\\times' + MN, BD)}=${arrondi(calcul(BC * MN / BD, 1))}$ cm`
        texteCorr += `<br><br> Les points $${nomA}$, $N$ et $${nomD}$ sont alignés dans cet ordre donc $N${nomD}=${nomA + nomD}-${nomA}N= ${BC}-${arrondi(calcul(BC * MN / BD, 1))}=${arrondi(calcul(BC - BC * MN / BD, 1))}$ cm.`
        break
    }

    this.listeQuestions[0] = texte
    this.listeCorrections[0] = texteCorr
    listeQuestionsToContenu(this)
    // this.besoinFormulaireNumerique = ['Type de questions',2,"1 : Donner l'égalité\n2 : Compléter une égalité avec une addition ou une soustraction"];
    // this.besoinFormulaire2CaseACocher = ['Sans figures']
  }
}
