import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { parse, create, all, unit } from 'mathjs'
import { toString, aleaVariables, assignVariables, calculer, toTex, resoudre, aleaName } from '../../modules/outilsMathjs.js'
import { GVGraphicView } from '../../modules/aleaFigure/GraphicView.js'
import { GVGrandeur } from '../../modules/aleaFigure/grandeurs.js'
import { GVLine, GVSegment, GVVector, GVPoint } from '../../modules/aleaFigure/elements.js'
import { GVAleaThalesConfig } from '../../modules/aleaFigure/outilsThales.js'
import { circularPermutation, name } from '../../modules/aleaFigure/outils.js'
import { colorToLatexOrHTML } from '../../modules/2dGeneralites.js'

// eslint-disable-next-line no-debugger
debugger

const nbCase = 43

export const math = create(all)
math.config({
  number: 'number',
  randomSeed: context.graine
})
const toTex2 = function (a) { return toTex(a, { suppr1: false }) }

export const titre = 'aleaFigure'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '03/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '08/01/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Frédéric PIOU
 * Référence
*/
export default function exercicesThales () {
  Exercice.call(this)
  const formulaire = [
    '1 : Angles marqués alternes-internes ou correspondants ?',
    '2 : Déterminer si des droites sont parallèles (angles marqués).',
    '3 : Calculer la mesure d\'un angle.',
    '4 : Nommer un angle alterne-interne ou correspondant à un angle marqué.',
    '5 : Nommer un angle alterne-interne ou correspondant à un angle nommé.',
    '6 : Déterminer si des droites sont parallèles (utiliser les noms d\'angles).',
    '7 : Calculer la mesure d\'un angle. (utiliser le nom des angles) ?',
    '8 : Mélange des questions'
  ]
  this.nbQuestions = 1
  this.besoinFormulaireNumerique = [
    'Type de question', nbCase, formulaire.join('\n')
  ]
  this.besoinFormulaire2Numerique = true
  this.besoinFormulaire2Numerique = [
    'Configuration ? ', 3, ['1 - Triangles emboités\n 2 - Papillon\n 3 - Mélange']
  ]
  this.besoinFormulaire3Numerique = true
  this.besoinFormulaire3Numerique = [
    'Configuration ? ', 3, ['1 - Calcul de ON\n 2 - Calcul de AB\n 3 - Calcul de AM']
  ]
  this.consigne = ''
  this.nbCols = 0
  this.nbColsCorr = 0
  this.tailleDiaporama = 1
  this.video = ''
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  context.isHtml ? (this.spacing = 2.5) : (this.spacing = 1.5)
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 2)
  this.sup = 'all'
  this.sup2 = 3
  this.sup3 = 1
  this.nouvelleVersion = function (numeroExercice, dDebug = true) {
    if (this.sup === 'all') this.nbQuestions = nbCase
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // À placer même si l'exercice n'a pas vocation à être corrigé
    let nquestion = 0
    for (let i = 0, exercice = { texte: 'Pas de texte', texteCorr: 'Pas de correction' }, cpt = 0; i < this.nbQuestions && cpt < 100;) { // Boucle principale où i+1 correspond au numéro de la question
      if (this.sup === 'all') {
        // if ([9, 10].indexOf(cpt + 1) !== -1) cpt = 11
        nquestion = cpt + 1
      } else {
        nquestion = this.sup
      }
      if (dDebug) {
        console.log(`
          ********************************
          Exercice ${i + 1} Case ${nquestion}
          ********************************`)
      }
      switch (nquestion) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 7: {
          // Dépasser la limite du nombre de points
          // Remarque : l'algorithme est lourd lorsqu'on dépasse 20 points
          // http://localhost:8090/mathalea.html?ex=betaThales,s=7
          const graphic = new GVGraphicView(0, 0, 10, 7)
          const points = graphic.addPoint(20).map(x => { x.showDot(); x.showName(); return x })
          exercice = { texte: graphic.getFigure(...points), texteCorr: '' }
          break
        }
        case 8: {
          // Nommer des points avec des numéros
          // http://localhost:8090/mathalea.html?ex=betaThales,s=8
          const graphic = new GVGraphicView(0, 0, 10, 7)
          graphic.names = ['M']
          const points = graphic.addPoint(11).map(x => { x.showDot(); x.showName(); return x })
          exercice = { texte: graphic.getFigure(...points), texteCorr: '' }
          break
        }
        case 9: {
          // Deux droites parallèles
          // http://localhost:8090/mathalea.html?ex=betaThales,s=9

          // Une seule droite s'affiche
          // http://localhost:8090/mathalea.html?ex=betaThales,s=9,n=1&serie=T2K6&z=1
          // http://localhost:8090/mathalea.html?ex=betaThales,s=9,n=1&serie=bm8b&z=1

          // Aucune droite ne s'affiche
          // http://localhost:8090/mathalea.html?ex=betaThales,s=9,n=1&serie=Yldw&z=1

          // Une seule droite s'affiche mais tronquée
          // http://localhost:8090/mathalea.html?ex=betaThales,s=9,n=1&serie=KrLG&z=1
          const graphic = new GVGraphicView(0, 0, 10, 7)
          const [A, B, C] = graphic.addNotAlignedPoint()
          const d = graphic.addLine(A, B)
          const parallels = graphic.addParallelLine(C, d)
          exercice = { texte: graphic.getFigure(A, B, C, ...parallels), texteCorr: '' }
          break
        }
        case 10: {
          // Une sécante à deux droites
          // Bug ? http://localhost:8090/mathalea.html?ex=betaThales,s=10
          // Manque le point D : http://localhost:8090/mathalea.html?ex=betaThales,s=all,n=24&serie=M3k4&v=ex&z=1
          // Manque le point D : http://localhost:8090/mathalea.html?ex=betaThales,s=all,n=24&serie=2498&v=ex&z=1
          const graphic = new GVGraphicView(0, 0, 10, 7)
          graphic.clipVisible = true
          const [A, B, C] = graphic.addNotAlignedPoint()
          const D = graphic.addNotAlignedPoint(A, B)[2]
          const dAB = graphic.addLine(A, B)
          const dAC = graphic.addLine(A, C)
          const dBD = graphic.addLine(B, D)
          exercice.texte = graphic.getFigure(A, B, C, D, dAB, dAC, dBD)
          break
        }
        case 11: {
          // Droite verticale visible !
          // http://localhost:8090/mathalea.html?ex=betaThales,s=11
          const graphic = new GVGraphicView(-5, -5, 5, 5)
          const [A, B, C] = graphic.addPoint(3)
          A.x = 0
          B.x = 0
          const d = graphic.addLine(A, B)
          const d2 = graphic.addLine(A, C)
          exercice.texte = graphic.getFigure(A, B, C, d, d2)
          break
        }
        case 12: {
          // La droite ne s'affiche pas :
          // http://localhost:8090/mathalea.html?ex=betaThales,s=12,n=1&serie=1Ziy&z=1
          // http://localhost:8090/mathalea.html?ex=betaThales,s=12,n=1&serie=XCRV&z=1
          // http://localhost:8090/mathalea.html?ex=betaThales,s=12,n=1&serie=dBgM&z=1

          // La droite ne change pas ! (ou très peu)
          // http://localhost:8090/mathalea.html?ex=betaThales,s=12,n=1&serie=CWoc&z=1
          // http://localhost:8090/mathalea.html?ex=betaThales,s=12,n=1&serie=FjjF&z=1

          // La droite n'apparaît pas entièrement !
          // http://localhost:8090/mathalea.html?ex=betaThales,s=12,n=1&serie=MmjS&z=1

          // La droite s'affiche :
          // http://localhost:8090/mathalea.html?ex=betaThales,s=12,n=1&serie=D108&z=1
          const graphic = new GVGraphicView(-5, -5, 5, 5)
          graphic.clipVisible = true
          const [A, B] = graphic.addPoint(2)
          const l = graphic.addLine(A, B)
          const graph = graphic.getFigure(
            A, B, l
          )
          exercice.texte = graph
          break
        }
        case 14 : {
          // Parallelogrammes
          // http://localhost:8090/mathalea.html?ex=betaThales,s=14,n=1&serie=1Ziy&z=1
          const graphic = new GVGraphicView(-5, -5, 5, 5)
          const [A, B, C, D] = graphic.addParallelogram().vertices
          const [E, F] = graphic.addParallelogram(A, B).vertices.slice(2)
          const [G] = graphic.addParallelogram(F, A, D).vertices.slice(3)
          const graph = graphic.getFigure(
            A, B, C, D, E, F, G
            , graphic.addSidesPolygon(A, B, C, D)
            , graphic.addSidesPolygon(A, B, E, F)
            , graphic.addSidesPolygon(F, A, D, G)
          )
          exercice = { texte: graph, texteCorr: '' }
          break
        }
        case 15 : {
          // Homothetie
          // http://localhost:8090/mathalea.html?ex=betaThales,s=15,s2=1,s3=1
          const graphic = new GVGraphicView(-5, -5, 5, 5)
          const ABCD = graphic.addParallelogram()
          let O
          switch (this.sup3) {
            case 1:
              O = graphic.addPointOutPolygon(...ABCD.vertices)
              break
            case 2:
              O = graphic.addPointInPolygon(...ABCD.vertices)
              break
            case 3:
              if (Math.floor(Math.random() * 2) === 1) {
                O = graphic.addPointOutPolygon(...ABCD.vertices)
              } else {
                O = graphic.addPointInPolygon(...ABCD.vertices)
              }
              break
          }
          graphic.placeLabelsPolygon(...ABCD.vertices)
          let k
          switch (this.sup2) {
            case 1:
              k = 0.4 + Math.random() * 0.3
              break
            case 2:
              k = 1.3 + Math.random() * 0.4
              break
            case 3:
              k = -0.4 - Math.random() * 0.3
              break
            case 4:
              k = -1.3 - Math.random() * 0.4
              break
            case 5:
              k = (Math.random() * 0.4 + (Math.floor(Math.random() * 2)) + 0.3) * (-1) ** Math.floor(Math.random() * 2)
              break
          }
          const EFGH = graphic.addHomothetic(O, k, ...ABCD.vertices)
          graphic.placeLabelsPolygon(...EFGH)
          O.showDot()
          O.showName()
          const graph = graphic.getFigure(O, ABCD, EFGH, graphic.addSidesPolygon(...EFGH))
          exercice.texte = name`Dans cette homothétie de centre $${O}$ le parallélogramme de départ est $${ABCD}$.

$\textbf{1.}$ Parmi les valeurs suivantes du rapport $k$, une seule est possible, laquelle ?

$\hspace{1cm}$ $${aleaName([toTex(k.toFixed(2)), toTex((-k).toFixed(2)), toTex((1 / k).toFixed(2)), toTex((-1 / k).toFixed(2))]).join('\\qquad')}$

$\textbf{2.}$ Quelle est l'image de $${ABCD.vertices[0]}$ ?

${graph}`
          exercice.texteCorr = name`$\textbf{1.}$ $k = ${toTex(k.toFixed(2))}$

$\textbf{2.}$ L'image de $${ABCD.vertices[0]}$ est $${EFGH[0]}$.`
          break
        }
        case 16 : {
          // 3 Points non alignés
          // http://localhost:8090/mathalea.html?ex=betaThales,s=16,n=1&serie=1Ziy&z=1
          const graphic = new GVGraphicView(-5, -5, 5, 5)
          const [A, B, C] = graphic.addNotAlignedPoint()
          A.name = 'A'
          B.name = 'B'
          C.name = 'C'
          graphic.show(A, B, C, ...graphic.addSidesPolygon(A, B, C))
          const AB = new GVGrandeur(A.name + B.name, graphic.distance(A, B), 2, 'cm')
          let texte = name`${AB}`
          const graph = graphic.getFigure(A, B, C, ...graphic.addSidesPolygon(A, B, C))
          texte = texte + '<br>'
          exercice = { texte: texte + graph, texteCorr: '' }
          break
        }
        case 17 : {
          // Configurations de Thalès
          // Triangles emboités  // http://localhost:8090/mathalea.html?ex=betaThales,s=17,n=1&serie=1Ziy&z=1&v=ex
          // Papillon // http://localhost:8090/mathalea.html?ex=betaThales,s=17,n=1&serie=pitq&v=ex&z=1
          // const graphic = new GVGraphicView(-0.1, -0.1, 0.1, 0.1)
          // graphic.scale *= 100
          // graphic.ppc *= 100
          const graphic = new GVGraphicView(-5, -5, 5, 5)
          const [O, A, B] = graphic.addNotAlignedPoint() // Trois points non alignés
          // On ajoute les droites (OB) et (AB)
          const dOB = graphic.addLine(O, B)
          const dAB = graphic.addLine(A, B)
          // M est un point de (OA)
          const M = graphic.addPointAligned(O, A)[2] // C'est le troisième point de la sortie addPointAligned
          // Exemple d'un vecteur créé à partir de deux points
          const vO = new GVVector(O.x, O.y)
          const vA = new GVVector(A.x, A.y)
          const vM = new GVVector(M.x, M.y)
          const vOA = vA.sub(vO)
          const vOM = vM.sub(vO)
          // configThales = true pour une configuration classique et papillon sinon
          const classicConfig = true
          if (classicConfig !== undefined && ((classicConfig && vOA.dot(vOM) < 0) || (!classicConfig && vOA.dot(vOM) > 0))) {
            Object.assign(M, graphic.addHomothetic(O, -1, M)[0])
          }
          // On crée une parallèle à (AB)
          const dMN = graphic.addParallelLine(M, dAB)[1] // C'est la seconde parallèle de addParalleleLine
          // On ajoute le point d'intersection de (OA) et (MN)
          const [N] = graphic.addIntersectLine(dMN, dOB) // C'est un tableau pour prévoir l'intersection de cercles par exemple
          // On commence par nommer les points et les droites
          // const aleaNames = aleaName(5) // Nommage aléatoire des points
          const aleaNames = ['O', 'A', 'B', 'M', 'N'] // Pour le debuggage
          const points = [O, A, B, M, N]
          points.forEach((x, i) => { x.name = aleaNames[i] })
          // On nomme les droites à partir des noms des points
          dAB.name = A.name + B.name // L'ordre des lettres est conservé
          dMN.aleaName(M, N) // L'ordre des lettres est aléatoirisé
          // Cela permet d'obtenir à l'aide du produit scalaire le signe de l'homothétie
          const signk = vOA.dot(vOM) < 0 ? -1 : 1
          // On définit deux grandeurs en imposant un nombre de décimales
          const OA = new GVGrandeur(O.name + A.name, graphic.distance(O, A), 1, 'cm')
          // On conservant signk le signe de k on a donc des longueurs algébriques
          const k = new GVGrandeur('k', signk * graphic.distance(O, M) / graphic.distance(O, A), 1)
          const OB = new GVGrandeur(O.name + B.name, graphic.distance(O, B), 1, 'cm')
          // On effectue le calcul pour OM à partir des grandeurs définies et non à partir des mesures de la figure
          // Ceci afin d'éviter les valeurs non décimales.
          const OM = OA.multiply(k)
          // OM porte le nom du calcul qui a permis de l'obtenir à savoir OA * k
          // On le renomme pour la suite
          OM.name = O.name + M.name
          // Même chose avec ON
          const ON = OB.multiply(OM).divide(OA)
          ON.name = O.name + N.name
          // On peut ainsi obtenir AM par le calcul vec les longueurs algébriques
          const AM = OA.neg().add(OM)
          AM.aleaName(A, M)
          // Calculer le périmètre
          const AB = new GVGrandeur(A.name + B.name, graphic.distance(A, B), 1, 'cm')
          const p = OA.abs().add(AB.abs()).add(OB.abs())
          p.name = 'p'
          // Un exemple d'utilisation de grandeur produit
          const aire = OA.multiply(OB).abs()
          // On définit les éléments à afficher sur la figure
          const graph = graphic.getFigure(
            O, A, B, M, N,
            graphic.addSidesPolygon(O, A, B), // Les segments visibles sont les côtés des deux triangles OAB et OMN
            graphic.addSidesPolygon(O, M, N)
          )
          // ObjetGarphic.name donne le nom en fonction de la nature de l'objet (droite, segment, point)
          // Grandeur.name donne le nom qu'on lui a affecté à sa création ou bien l'ensemble des calculs qui ont prmis de l'obtenir ou encore le nom qu'on lui a affecté
          // Grandeur.nameAndValue donne un format latex de la forme k = 1.5 cm par exemple
          // Grandeur.calcul donne une chaine de caractère avec les calculs au format string
          let texte = `
          Les droites $(${dAB.name}$) et $(${dMN.name})$ sont parallèles.
          <br>
          Calculer $${ON.name}$.
          <br>
          $${toTex(`${aire.calcul} = ${aire.toFixed}${aire.unit}`)}$
          <br>
          $${toTex(`${OA.name} = ${OA.toFixed}${OA.unit}`)}$
          <br>
          $${toTex(`${OB.name} = ${OB.toFixed}${OB.unit}`)}$
          <br>
          $${toTex(`${OM.name} = ${OM.abs().toFixed}${OM.unit}`)}$
          <br>
          $${toTex(`${ON.name} = ${ON.calcul}`)}$
          <br>
          $${toTex(`${ON.name} = ${ON.abs().toFixed}${ON.unit}`)}$
          <br>
          $${toTex(`${p.name} = ${p.calcul}`)}$
          <br>
          $${toTex(`${p.name} = ${p.toFixed}${p.unit}`)}$
          <br>
          $${toTex(`${AM.name} = ${AM.abs().toFixed}${AM.unit}`)}$
          `
          texte = texte + '<br>'
          exercice = { texte: texte + graph, texteCorr: '' }
          break
        }
        case 18: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=18,n=1&serie=fOS7&v=ex&z=1
          const graphic = new GVAleaThalesConfig()
          const [O, A, B, M, N] = graphic.geometric
          const graph = graphic.getFigure(
            O, A, B, M, N,
            graphic.addSidesPolygon(O, A, B), // Les segments visibles sont les côtés des deux triangles OAB et OMN
            graphic.addSidesPolygon(O, M, N)
          )
          exercice.texte = graph
          break
        }
        case 19: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=19,n=1&serie=fOS7&v=ex&z=1
          const graphic = new GVAleaThalesConfig()
          graphic.classicConfig = true
          const [O, A, B, M, N] = graphic.geometric
          const graph = graphic.getFigure(
            O, A, B, M, N,
            graphic.addSidesPolygon(O, A, B), // Les segments visibles sont les côtés des deux triangles OAB et OMN
            graphic.addSidesPolygon(O, M, N)
          )
          exercice.texte = graph
          break
        }
        case 20: {
          break
        }
        case 21: {
          // Problème toFixed : http://localhost:8090/mathalea.html?ex=betaThales,s=21,n=1&serie=3B5V&v=ex&z=1
          // const graphic = aleaThalesConfig(0, 0, 6, 6)
          // const graphic = new GVAleaThalesConfig()

          // Paramètres
          // graphic.setDimensions(0.5)
          // graphic.classicConfig = true
          // graphic.OAB = true
          // graphic.new()

          // Exemple avec des conversions
          // http://localhost:8090/mathalea.html?ex=betaThales,s=21,n=1&serie=GxI1&v=ex&z=1
          // Il faut mettre la précision à 2
          // ça bloque Problème toFixed : http://localhost:8090/mathalea.html?ex=betaThales,s=21,n=1&serie=8JRU&v=ex&z=1
          const graphic = new GVAleaThalesConfig()
          /* graphic.setDimensions(-0.1, -0.1, 0.1, 0.1)
          graphic.new()
          graphic.scale *= 15 / graphic.width
          graphic.ppc *= 15 / graphic.width */

          // On récupère les 5 points en configuration de Thalès
          const [O, A, B, M, N] = graphic.points

          // On nomme les droites à partir des noms des points
          const dAB = graphic.addLine(A, B)
          dAB.aleaName(A, B) // L'ordre des lettres est aléatoirisé
          const dMN = graphic.addLine(M, N)
          dMN.aleaName(M, N) // L'ordre des lettres est aléatoirisé

          const signk = graphic.classicConfig ? 1 : -1
          // On définit deux grandeurs en imposant un nombre de décimales
          const OA = new GVGrandeur(O.name + A.name, parse(unit(graphic.distance(O, A), 'cm').toString()).args[0].value, 1, parse(unit(graphic.distance(O, A), 'cm').toString()).args[1].toString())
          // On conservant signk le signe de k on a donc des longueurs algébriques
          const k = new GVGrandeur('k', signk * graphic.distance(O, M) / graphic.distance(O, A), 1)
          const OB = new GVGrandeur(O.name + B.name, parse(unit(graphic.distance(O, B), 'cm').toString()).args[0].value, 1, parse(unit(graphic.distance(O, B), 'cm').toString()).args[1].toString())

          // On effectue le calcul pour OM à partir des grandeurs définies et non à partir des mesures de la figure
          // Ceci afin d'éviter les valeurs non décimales.
          const OM = OA.multiply(k)
          // OM porte le nom du calcul qui a permis de l'obtenir à savoir OA * k
          // On le renomme pour la suite
          OM.name = O.name + M.name
          // Même chose avec ON
          const ON = OB.multiply(OM).divide(OA)
          ON.name = O.name + N.name

          // On peut ainsi obtenir AM par le calcul avec les longueurs algébriques
          const AM = OA.neg().add(OM)
          AM.aleaName(A, M)

          // On ajoute des droites pour l'énoncé
          const dAM = graphic.addLine(A, M)
          dAM.aleaName(A, M)
          const dBN = graphic.addLine(B, N)
          dBN.aleaName(B, N)

          // Préparation d'une autre question pour le calcul de MN
          const AB = new GVGrandeur(A.name + B.name, parse(unit(graphic.distance(A, B), 'cm').toString()).args[0].value, 1, parse(unit(graphic.distance(A, B), 'cm').toString()).args[1].toString())
          const MN = AB.multiply(k)
          MN.aleaName(M, N)

          // ObjetGarphic.name donne le nom en fonction de la nature de l'objet (droite, segment, point)
          // Grandeur.name donne le nom qu'on lui a affecté à sa création ou bien l'ensemble des calculs qui ont prmis de l'obtenir ou encore le nom qu'on lui a affecté
          // Grandeur.nameAndValue donne un format latex de la forme k = 1.5 cm par exemple
          // Grandeur.calcul donne une chaine de caractère avec les calculs au format string
          const aleaDonnees = aleaName(
            [`$${toTex(`${OA.name} = ${OA.toFixed}${OA.unit}`, { suppr1: false })}$`,
            `$${toTex(`${OB.name} = ${OB.toFixed}${OB.unit}`, { suppr1: false })}$`,
            `$${toTex(`${OM.name} = ${OM.abs().toFixed}${OM.unit}`, { suppr1: false })}$`,
            `$${toTex(`${MN.name} = ${MN.abs().toFixed}${MN.unit}`, { suppr1: false })}$`
            ]
          ).join(', ')
          const graph = graphic.getFigure(
            O, A, B, M, N,
            graphic.addSidesPolygon(O, A, B), // Les segments visibles sont les côtés des deux triangles OAB et OMN
            graphic.addSidesPolygon(O, M, N)
          )

          // Déterminer la meilleure unité pour les calculs avec les grandeurs
          const unite = parse(unit(graphic.width / 30, 'cm').toString()).args[1].toString()

          // Création du texte
          const texte = `
          Les droites $(${dAB.name}$) et $(${dMN.name})$ sont parallèles.
          <br> Les droites $(${dAM.name}$) et $(${dBN.name})$ sont sécantes en $${O.name}$.
          <br> On a : ${aleaDonnees}.
          <br> Calculer ${ON.name} en ${ON.unit} puis ${AB.name} en ${AB.unit}.
          `
          const texteCorr = `
          Les droites $(${dAB.name}$) et $(${dMN.name})$ sont parallèles.
          <br> Les droites $(${dAM.name}$) et $(${dBN.name})$ sont sécantes en $${O.name}$.
          <br>D'après le théorème de Thalès, on a : $${toTex(`${OA.name}/${OM.name}=${OB.name}/${ON.name}=${AB.name}/${MN.name}`, { suppr1: false })}$
          <br>D'une part $${toTex(`${OA.to(unite).toFixed}/${OM.abs().to(unite).toFixed}=${OB.to(unite).toFixed}/${ON.name}`, { suppr1: false })}$
          <br>On en déduit l'égalité des produits en croix : $${toTex(`${OA.to(unite).toFixed}*${ON.name}=${OB.to(unite).toFixed}*${OM.abs().to(unite).toFixed}`, { suppr1: false })}$
          <br> On résout l'équation d'inconnue $${ON.name}$ : $${toTex(`${ON.name}=${OB.to(unite).toFixed}*${OM.abs().to(unite).toFixed}/${OA.to(unite).toFixed}=${ON.abs().to(unite).toFixed}${ON.abs().to(unite).unit}`, { suppr1: false })}$
          <br>D'où ${ON.abs().nameAndValue}.
          <br> D'autre part $${toTex(`${AB.name}/${MN.abs().to(unite).toFixed}=${OA.to(unite).toFixed}/${OM.abs().to(unite).toFixed}`, { suppr1: false })}$
          <br>On en déduit l'égalité des produits en croix : $${toTex(`${AB.name}*${OM.abs().to(unite).toFixed}=${OA.to(unite).toFixed}*${MN.abs().to(unite).toFixed}`, { suppr1: false })}$
          <br> On résout l'équation d'inconnue $${AB.name}$ : $${toTex(`${AB.name}=${OA.to(unite).toFixed}*${MN.abs().to(unite).toFixed}/${OM.abs().to(unite).toFixed}=${AB.to(unite).toFixed}${AB.to(unite).unit}`, { suppr1: false })}$
          <br>D'où ${AB.nameAndValue}.
          `
          exercice.texte = texte + '<br>' + graph + '<br>' + texteCorr
          exercice.texteCorr = texteCorr
          break
        }
        case 22: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=22,n=1&serie=hZya&v=ex&z=1
          // Droites invisibles : http://localhost:8090/mathalea.html?ex=betaThales,s=22,n=1&serie=Ihry&v=ex&z=1
          // Droite tronquée http://localhost:8090/mathalea.html?ex=betaThales,s=22,n=1&serie=lS3Q&v=ex&z=1
          const graphic = new GVGraphicView(0, 0, 10, 10)
          const [l1, l2] = graphic.addParallelLine()
          const [A] = graphic.addPoint()
          A.showDot()
          const l3 = graphic.addParallelLine(A, l1)[1]
          graphic.clipVisible = true
          const graph = graphic.getFigure(
            l1, l2, A, l3
          )
          exercice.texte = graph
          break
        }
        case 23: {
          // Des rotations de rectangles
          // http://localhost:8090/mathalea.html?ex=betaThales,s=23,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView(0, 0, 10, 10)

          // Trois points formant un triangle rectangle pour obtenir un rectangle
          const [A, B, D] = graphic.addRectPoint()

          // Nombre aléatoire de rectangles
          const nbRectangles = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)]

          // Nommage aléatoires des sommets
          const names = aleaName(4)

          // Construction des rectangles
          let ABCD
          const rectangles = []
          for (let i = 0; i < nbRectangles; i++) {
            const sommets = graphic.addRotate(A, 2 * Math.PI / nbRectangles * i, ...graphic.addParallelogram(D, A, B).vertices)
            if (i === 0) {
              ABCD = sommets.map((x, i) => {
                x.name = names[i]
                x.showName()
                if (i === 0) {
                  x.labelPoints = [sommets[3], sommets[i], sommets[i + 1]]
                } else if (i === 3) {
                  x.labelPoints = [sommets[i - 1], sommets[i], sommets[0]]
                } else {
                  x.labelPoints = [sommets[i - 1], sommets[i], sommets[i + 1]]
                }
                return x.name
              })
            }
            rectangles.push(sommets, graphic.addSidesPolygon(...sommets))
          }
          const graph = graphic.getFigure(...rectangles)

          const n = new GVGrandeur('n', nbRectangles, 0)
          const AnglePlein = new GVGrandeur('', 360, 0, 'deg')
          const angle = AnglePlein.divide(n)
          // angle.name = aleaName(['\\alpha', '\\beta', '\\gamma', '\\delta'], 1)
          angle.name = aleaName(['\\alpha', '\\beta', '\\delta'], 1)[0]
          // L'exercice
          // Chaque rectangle et son suivant sont obtenus par une rotation de même centre et de même angle.
          exercice.texte = name`Compléter l'algorithme ci-dessous pour obtenir la figure.

$\textbf{Début de l'algorithme}$

$\small\color{gray} 01 \hspace{0.1cm}$ $\color{blue}\text{monrectangle}$ = Rectangle ${ABCD.join('')}

$\small\color{gray} 02 \hspace{0.1cm}$ variable $\color{blue}${angle.name}$ = $\color{red}\fbox{ ? }\degree$

$\small\color{gray} 03 \hspace{0.1cm}$ variable $\color{blue}n$ = 0

$\small\color{gray} 04 \hspace{0.1cm}$ Répéter $\color{red}\fbox{ ? }$ fois :

$\small\color{gray} 05 \hspace{0.5cm}$ Tracer l'image de $\color{blue}\text{monrectangle}$ par une rotation de centre $\color{red}\fbox{ ? }$ et d'angle $\color{blue}${angle.name}$

$\small\color{gray} 06 \hspace{0.5cm}$ $\color{blue}n$ = $\color{blue}n$ + 1

$\small\color{gray} 07 \hspace{0.5cm}$ $\color{blue}${angle.name}$ = $\color{blue}n$ * $\color{blue}${angle.name}$

$\small\color{gray} 08 \hspace{0.1cm}$ Fin de la boucle Répéter

$\textbf{Fin de l'algorithme}$

${graph.split('\n').filter(x => x !== '').filter(x => x !== '').join('\n')}`
          exercice.texteCorr = name`Il y a $${n.toFixed}$ rectangles il faut donc répéter au moins $\color{red}\fbox{${n.toFixed}}$ fois la boucle.

$${angle.name} = \dfrac{360\degree}{${n.toFixed}} = ${angle.toFixed}\degree$

La rotation est donc de centre $\color{red}\fbox{${ABCD[1]}}$ et d'angle $\color{red}\fbox{$${angle.name}=${angle.value}$\degree}$.`
          break
        }
        case 24: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=24,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView()
          const [A, B] = graphic.addPoint(2)
          const polygons = []
          const n = parseInt((Math.random() * 3 + 3).toFixed())
          const O = graphic.addRegularPolygonCenter(A, B, n)
          for (let i = 0; i < 10; i++) {
            const sommets = graphic.addHomothetic(O, 1 / (i + 1), ...graphic.addRegularPolygon(n, A, B).vertices)
            polygons.push(sommets, graphic.addSidesPolygon(...sommets))
          }
          const graph = graphic.getFigure(
            O
            , ...polygons
          )
          exercice.texte = graph
          break
        }
        case 25: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=25,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView()
          const [G, H] = graphic.addPoint(2)
          const I = graphic.addRegularPolygon(3, G, H).vertices[2]
          const triangle3 = graphic.addSidesPolygon(G, H, I)
          const [A, B, C] = graphic.addNotAlignedPoint()
          const triangle1 = graphic.addSidesPolygon(A, B, C)
          const [D, E, F] = graphic.addNotAlignedPoint()
          const triangle2 = graphic.addSidesPolygon(D, E, F)
          const graph = graphic.getFigure(
            A, B, C, D, E, F, G, H, I,
            triangle1,
            triangle2,
            triangle3
          )
          exercice.texte = graph
          break
        }
        case 26: {
          // Deux triangles symétriques par rapport à un point situé à l'extérieur d'un des deux triangles
          // http://localhost:8090/mathalea.html?ex=betaThales,s=26,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView()
          const triangle1 = graphic.addNotAlignedPoint()
          const M = graphic.addPointOutPolygon(...triangle1)
          const triangle2 = graphic.addSymetric(M, ...triangle1)
          M.showDot()
          const graph = graphic.getFigure(
            triangle1, graphic.addSidesPolygon(...triangle1)
            , M
            , triangle2, graphic.addSidesPolygon(...triangle2)
          )
          exercice.texte = graph
          break
        }
        case 27: {
          // Deux triangles symétriques par rapport à un point situé à l'intérieur d'un des deux triangles
          // http://localhost:8090/mathalea.html?ex=betaThales,s=27,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView()
          const [A, B, C] = graphic.addNotAlignedPoint()
          const triangle1 = graphic.addSidesPolygon(A, B, C)
          const M = graphic.addPointInPolygon(A, B, C)
          M.name = 'M'
          const triangle2 = graphic.addSidesPolygon(...graphic.addSymetric(M, A, B, C))
          const graph = graphic.getFigure(
            triangle1
            , M, A, B, C
            , triangle2
          )
          exercice.texte = graph
          break
        }
        case 28: {
          // Deux triangles symétriques par rapport à un point situé sur l'un des côtés
          // http://localhost:8090/mathalea.html?ex=betaThales,s=28,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView()
          const [A, B, C] = graphic.addNotAlignedPoint()
          const triangle1 = graphic.addSidesPolygon(A, B, C)
          const M = graphic.addPointOnPolygon(A, B, C)
          M.name = 'M'
          const triangle2 = graphic.addSidesPolygon(...graphic.addSymetric(M, A, B, C))
          const graph = graphic.getFigure(
            triangle1
            , M, A, B, C
            , triangle2
          )
          exercice.texte = graph
          break
        }
        case 29: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=29,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView()
          const [A, B] = graphic.addPoint(2)
          const C = graphic.addPointDistance(A, graphic.distance(A, B)) // AB=AC
          const triangle1 = graphic.addSidesPolygon(A, B, C)
          for (const P of [A, B, C]) {
            P.showName()
            P.showDot()
          }
          const graph = graphic.getFigure(
            A, B, C
            , triangle1
          )
          exercice.texte = graph
          break
        }
        case 30: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=30,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView()
          const [A, B] = graphic.addPoint(2)
          A.showDot()
          B.showDot()
          const C = graphic.addPointBetween(A, B)
          C.showDot()
          C.showName()

          const graph = graphic.getFigure(
            A, B, C
          )
          exercice.texte = graph
          break
        }
        case 31: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=31,s2=3,n=1,cd=1&serie=qFnt&v=ex&z=1
          // PB M : http://localhost:8090/mathalea.html?ex=betaThales,s=31,s2=3,s3=1,n=1,cd=1&serie=Ld9D&v=ex&z=1
          // On créé un objet configuration de Thalès
          const graphic = new GVAleaThalesConfig([true, false, undefined][this.sup2 - 1])

          // On conserve le signe de k pour les longueurs algébriques
          const signk = graphic.classicConfig ? 1 : -1

          // On décide d'une unité
          const unite1 = 'cm'
          // Unité différente pour travailler les conversions
          const unite2 = 'mm'

          // On récupère les 5 points en configuration de Thalès
          const [O, A, B, M, N] = graphic.points

          // On nomme les droites à partir des noms des points
          const dAB = graphic.addLine(A, B)
          dAB.aleaName(A, B) // L'ordre des lettres est aléatoirisé
          const dMN = graphic.addLine(M, N)
          dMN.aleaName(M, N) // L'ordre des lettres est aléatoirisé

          // On définit deux grandeurs en imposant un nombre de décimales
          // const OA = new Grandeur(O.name + A.name, parse(unit(graphic.distance(O, A), unite).toString()).args[0].value, 1, parse(unit(graphic.distance(O, A), unite).toString()).args[1].toString())
          const OA = new GVGrandeur(O.name + A.name, graphic.distance(O, A), 1, unite1)
          // On conservant signk le signe de k on a donc des longueurs algébriques
          const k = new GVGrandeur('k', signk * graphic.distance(O, M) / graphic.distance(O, A), 1)
          // const OB = new GVGrandeur(O.name + B.name, parse(unit(graphic.distance(O, B), unite).toString()).args[0].value, 1, parse(unit(graphic.distance(O, B), unite).toString()).args[1].toString())
          const OB = new GVGrandeur(O.name + B.name, graphic.distance(O, B), 1, unite1)

          // On effectue le calcul pour OM à partir des grandeurs définies et non à partir des mesures de la figure
          // Ceci afin d'éviter les valeurs non décimales.
          const OM = OA.multiply(k)
          // La grandeur OM porte le nom du calcul qui a permis de l'obtenir à savoir OA * k
          // On la renomme pour la suite
          OM.aleaName(O, M)

          // Même travail avec ON
          const ON = OB.multiply(OM).divide(OA)
          ON.aleaName(O, N)

          // On peut ainsi obtenir AM et BN par le calcul avec les longueurs algébriques
          const AM = OA.neg().add(OM)
          AM.aleaName(A, M)
          const BN = OB.neg().add(ON)
          BN.aleaName(B, N)

          // On ajoute des droites pour l'énoncé
          const dAM = graphic.addLine(A, M)
          dAM.aleaName(A, M)
          const dBN = graphic.addLine(B, N)
          dBN.aleaName(B, N)

          // Préparation d'une autre question pour le calcul de MN
          // const AB = new GVGrandeur(A.name + B.name, parse(unit(graphic.distance(A, B), unite1).toString()).args[0].value, 1, parse(unit(graphic.distance(A, B), unite).toString()).args[1].toString())
          const AB = new GVGrandeur(A.name + B.name, graphic.distance(A, B), 1, unite1)
          const MN = AB.multiply(k)
          MN.aleaName(M, N)

          // À ce stade nous n'avons plus besoins des longueurs algébriques
          for (const x of [OB, OM, ON, MN, AM, BN]) {
            x.toFixed = Math.abs(x.toFixed) // Les longueurs sont maintenant positives
            x.name = x.name + '' // Pour que nameAndValue soit actualisé
          }

          // On aléatoirise l'ordre des données
          const aleaDonnees = []
          aleaDonnees[0] = aleaName([OA, OB, OM, MN].map(x => `$ {${toTex2(`${x.name} = ${x.abs().toFixed}`)}~${x.unit}}$`)).join(', ')
          aleaDonnees[1] = aleaName([OA, OB, OM, MN].map(x => `$ {${toTex2(`${x.name} = ${x.abs().toFixed}`)}~${x.unit}}$`)).join(', ')
          aleaDonnees[2] = aleaName([OA, AB, MN].map(x => `$ {${toTex2(`${x.name} = ${x.abs().toFixed}`)}~${x.unit}}$`)).join(', ')
          // On créé l'export.
          // Attention à l'ordre d'affichage et notamment des labels (en premier)
          const graph = graphic.getFigure(
            O, A, B, M, N,
            graphic.addSidesPolygon(O, A, B), // Les segments visibles sont les côtés des deux triangles OAB et OMN
            graphic.addSidesPolygon(O, M, N)
          )

          // Création des textes et des solutions
          const texteCorr = ['', '', '']
          const texteDonnees = ['', '', '']
          const consigne = ['', '', '']

          const texteIntro = name`Les droites $(${dAB}$) et $(${dMN})$ sont parallèles.

Les droites $(${dAM}$) et $(${dBN})$ sont sécantes en $${O}$.`

          texteDonnees[0] = `On a : ${aleaDonnees[0]}.`
          texteDonnees[1] = `On a : ${aleaDonnees[1]}.`
          texteDonnees[2] = `On a : ${aleaDonnees[2]}.`

          consigne[0] = name`Calculer $${ON}$ en ${ON.to(unite2).unit}.`
          consigne[1] = name`Calculer $${AB}$ en ${AB.unit}.`
          consigne[2] = name`Calculer $${AM}$ en ${AM.unit}.`

          const texteCorrIntro = `D'après le théorème de Thalès, on a :

$$${toTex2(name`${OA} / ${OM} = ${OB} / ${ON} = ${AB} / ${MN}`)}$`
          // Calcul de ON
          texteCorr[0] = name`$\textbf{Calcul de ${ON}}$

On connait les longueurs $${OA}$, $${OB}$ et $${OM}$, d'où :

$$${toTex2(name`${OA.toFixed}/${OM.toFixed}=${OB.toFixed}/${ON}`)}$

On en déduit ensuite l'égalité des produits en croix :

$$${toTex2(name`${OA.toFixed} * ${ON}=${OB.toFixed} * ${OM.toFixed}`)}$

On résout enfin l'équation d'inconnue $${ON}$ :

$$${toTex2(name`${ON}=${OB.toFixed} * ${OM.toFixed}/${OA.toFixed}=${ON.toFixed}`)}~${ON.unit}$

Donc ${ON.to(unite2).nameAndValue}.`
          // Calcul de AB
          texteCorr[1] = name`$\textbf{Calcul de ${AB}}$

On connait les longueurs $${OA}$, $${OM}$ et $${MN}$, d'où :

$$${toTex2(name`${AB}/${MN.toFixed}=${OA.toFixed}/${OM.toFixed}`)}$

On en déduit l'égalité des produits en croix :

$$${toTex2(name`${AB} * ${OM.toFixed} = ${OA.toFixed} * ${MN.toFixed}`)}$

On résout l'équation d'inconnue $${AB}$ :

$$${toTex2(name`${AB} = ${OA.toFixed} * ${MN.toFixed} / ${OM.toFixed} = ${AB.toFixed}`)}~${AB.unit}$

Donc ${AB.nameAndValue}.`
          // Calcul de AM
          texteCorr[2] = name`$\textbf{Calcul de ${OM}}$

On connait les longueurs $${AB}$, $${MN}$ et $${OA}$, d'où :

$$${toTex2(name`${AB.toFixed}/${MN.toFixed}=${OA.toFixed}/${OM}`)}$

On en déduit l'égalité des produits en croix :

$$${toTex2(name`${AB.toFixed} * ${OM} = ${OA.toFixed} * ${MN.toFixed}`)}$

On résout l'équation d'inconnue $${OM}$ :

$$${toTex2(name`${OM} = ${OA.toFixed} * ${MN.toFixed} / ${AB.toFixed} = ${OM.toFixed}`)}~${OM.unit}$

$\textbf{Calcul de ${AM}}$

$$${toTex2(k.abs().value < 1 ? name`${AM} = ${OA} ${k.value > 0 ? '-' : '+'} ${OM}` : name`${AM} = ${OM} ${k.value > 0 ? '-' : '+'} ${OA}`)}$

$$${toTex2(k.abs().value < 1 ? name`${AM} = ${OA.toFixed} ${k.value > 0 ? '-' : '+'} ${OM.toFixed}` : name`${AM} = ${OM.toFixed} ${k.value > 0 ? '-' : '+'} ${OA.toFixed}`)}$

Donc ${AM.nameAndValue}.`
          const phrasesCorr = `${texteIntro}

${texteCorrIntro}

${texteCorr[this.sup3 - 1]}`.split('\n\n')

          if (this.correctionDetaillee) {
            exercice.texteCorr = phrasesCorr.join('<br>')
          } else {
            exercice.texteCorr = phrasesCorr.filter((x, i) => [3, 4, 6, 8, 10, 11, 12, 14, 16, 18, 19].indexOf(i) !== -1).join('<br>').replaceAll('$$', '$\\hspace{1cm}')
          }
          exercice.texte = `${texteIntro}

${texteDonnees[this.sup3 - 1]}

${consigne[this.sup3 - 1]}` + '<br>' + graph
          break
        }
        case 32: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=32,s2=3,s3=1,n=1,cd=1&serie=7wjj&v=ex&z=1
          // Ajouter des étiquettes aux extrémités d'un angle
          const graphic = new GVGraphicView()
          const [A, B, C] = graphic.addNotAlignedPoint()

          // Boucle ! http://localhost:8090/mathalea.html?ex=betaThales,s=32,s2=3,s3=1,n=1,cd=1&serie=lqd7&v=ex&z=1
          // const [D, E, F] = graphic.addPointAligned()

          // Afficher le label des points
          // A.showName()
          // C.showName()
          // B.showName(A, B, C).showDot()
          B.labelPoints = [A, B, C]
          B.label = true
          // Afficher les points sous forme de croix x
          A.showDot()
          // B.showDot()
          C.showDot()
          const graph = graphic.getFigure(
            graphic.addSidesPolygon(A, B, C)
            , B, A, C // , D, E, F
          )
          exercice.texte = graph
          break
        }
        case 33: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=33,s2=3,s3=1,n=1,cd=1&serie=7wjj&v=ex&z=1
          // Exercices sur les rotations
          const graphic = new GVGraphicView()
          const [A, B, C] = graphic.addNotAlignedPoint()
          A.showDot()
          const graph = graphic.getFigure(
            A, B, C,
            graphic.addSidesPolygon(A, B, C)
          )
          exercice.texte = graph
          break
        }
        case 34: {
          // Des rotations de rectangles
          // http://localhost:8090/mathalea.html?ex=betaThales,s=34,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView()

          // Trois points formant un triangle rectangle pour obtenir un rectangle
          const [A, B, D] = graphic.addRectPoint()

          // Nombre aléatoire de rectangles
          const nbRectangles = [3, 4, 5, 6, 8, 10][Math.floor(Math.random() * 6)]

          // Nommage aléatoires des sommets
          const names = aleaName(8)

          // Construction des rectangles
          let ABCD, EFGH
          const rectanglesPossibles = [2, 3, 5, 6, 7, 9, 10].filter(x => x < nbRectangles)
          const aleaRectangle = rectanglesPossibles[Math.floor(Math.random() * rectanglesPossibles.length)]
          const rectangles = []
          for (let i = 0; i < nbRectangles; i++) {
            const sommets = graphic.addRotate(A, 2 * Math.PI / nbRectangles * i, ...graphic.addParallelogram(D, A, B).vertices)
            if (i === 0) {
              ABCD = sommets.map((x, i) => {
                x.name = names[i]
                x.showName()
                if (i === 0) {
                  x.labelPoints = [sommets[3], sommets[i], sommets[i + 1]]
                } else if (i === 3) {
                  x.labelPoints = [sommets[i - 1], sommets[i], sommets[0]]
                } else {
                  x.labelPoints = [sommets[i - 1], sommets[i], sommets[i + 1]]
                }
                return x.name
              })
            }
            if (i === aleaRectangle) {
              EFGH = sommets.map((x, i) => {
                x.name = names[i + 4]
                if (i !== 1) x.showName()
                if (i === 0) {
                  x.labelPoints = [sommets[3], sommets[i], sommets[i + 1]]
                } else if (i === 3) {
                  x.labelPoints = [sommets[i - 1], sommets[i], sommets[0]]
                } else {
                  x.labelPoints = [sommets[i - 1], sommets[i], sommets[i + 1]]
                }
                if (i === 1) {
                  return ABCD[1]
                } else {
                  return x.name
                }
              })
            }
            rectangles.push(sommets, graphic.addSidesPolygon(...sommets))
          }
          rectangles.filter((x, i) => (i === 1 || i === 2 * aleaRectangle + 1)).map((y, j) => y.map(z => { z.color = colorToLatexOrHTML('blue'); return z }))
          const cotesRectangles = rectangles.filter(x => x[0] instanceof GVSegment)
          const sommetsRectangles = rectangles.filter(x => x[0] instanceof GVPoint)
          const graph = graphic.getFigure(...sommetsRectangles, ...cotesRectangles, cotesRectangles[0], cotesRectangles[aleaRectangle])

          const n = new GVGrandeur('n', nbRectangles, 0)
          const AnglePlein = new GVGrandeur('', 360, 0, 'deg')
          const angle = AnglePlein.divide(n)
          const k = new GVGrandeur('', aleaRectangle, 0)
          const angleSolution = angle.multiply(k)
          angle.name = aleaName(['\\alpha', '\\beta', '\\gamma', '\\delta'], 1)
          // L'exercice
          const P = aleaName([0, 2, 3])
          // Chaque rectangle et son suivant sont obtenus par une rotation de même centre et de même angle.
          exercice.texte = `On a effectué successiveement $${n.toFixed}$ rotations d'un rectangle avec le même angle et le même centre.

On est revenu sur le rectangle de départ.

On considère la rotation qui transforme le rectangle $${circularPermutation(ABCD).join('')}$ en $${circularPermutation(EFGH).join('')}$ dans le sens direct (anti-horaire).

$\\textbf{1.}$ Déterminer l'image de $${ABCD[P[i]]}$ par cette rotation.

$\\textbf{2.}$ Déterminer l'angle de la rotation.

${graph.split('\n').filter(x => x !== '').filter(x => x !== '').join('\n')}`
          exercice.texteCorr = `
$\\textbf{1.}$ L'image de $${ABCD[P[i]]}$ est $${EFGH[P[i]]}$.

$\\textbf{2.}$ Il y a $${n.value}$ rectangles en tout.

$\\dfrac{360\\degree}{${n.toFixed}} = ${angle.toFixed}\\degree$

On doit tourner $${aleaRectangle}$ fois d'un angle de $${angle.toFixed}\\degree$ dans le sens direct (anti-horaire).

$${aleaRectangle}\\times${angle.toFixed}\\degree=${angleSolution.toFixed}\\degree$

Donc c'est la rotation de centre $${ABCD[1]}$ et d'angle $${angleSolution.toFixed}\\degree$.
`.replaceAll('\n\n', '<br>')
          break
        }
        case 35: {
          // Des rotations de carrés
          // http://localhost:8090/mathalea.html?ex=betaThales,s=35,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView()

          // Trois points formant un triangle rectangle isocèle pour obtenir un carré
          const [A, B] = graphic.addPoint(2)
          const [D] = graphic.addRotate(A, Math.PI / 2, B)

          // Nombre aléatoire de rectangles
          const nbRectangles = [3, 5, 6][Math.floor(Math.random() * 3)]
          const rectangleImagePossibles = [2, 3, 4, 5].filter(x => x < nbRectangles && x !== nbRectangles / 2)
          const rectangleImage = rectangleImagePossibles[Math.floor(Math.random() * rectangleImagePossibles.length)]
          // Nommage aléatoires des sommets
          const names = aleaName(8)

          // Construction des rectangles
          let ABCD, EFGH
          const rectangles = []
          for (let i = 0; i < nbRectangles; i++) {
            const sommets = graphic.addRotate(A, 2 * Math.PI / nbRectangles * i, ...graphic.addParallelogram(D, A, B).vertices)
            if (i === 0) {
              ABCD = circularPermutation(sommets.map((x, i) => {
                x.name = names[i]
                x.showName()
                if (i === 0) {
                  x.labelPoints = [sommets[3], sommets[i], sommets[i + 1]]
                } else if (i === 3) {
                  x.labelPoints = [sommets[i - 1], sommets[i], sommets[0]]
                } else {
                  x.labelPoints = [sommets[i - 1], sommets[i], sommets[i + 1]]
                }
                return x.name
              }), 3)
            }
            if (i === rectangleImage) {
              EFGH = circularPermutation(sommets.map((x, i) => {
                x.name = names[i + 4]
                if (i !== 1) x.showName()
                if (i === 0) {
                  x.labelPoints = [sommets[3], sommets[i], sommets[i + 1]]
                } else if (i === 3) {
                  x.labelPoints = [sommets[i - 1], sommets[i], sommets[0]]
                } else {
                  x.labelPoints = [sommets[i - 1], sommets[i], sommets[i + 1]]
                }
                if (i === 1) {
                  return ABCD[2]
                } else {
                  return x.name
                }
              }), 3)
            }
            rectangles.push(sommets, graphic.addSidesPolygon(...sommets))
          }
          rectangles.filter((x, i) => (i === 1 || i === 2 * rectangleImage + 1)).map((y, j) => y.map(z => { z.color = colorToLatexOrHTML('blue'); return z }))
          const cotesRectangles = rectangles.filter(x => x[0] instanceof GVSegment)
          const sommetsRectangles = rectangles.filter(x => x[0] instanceof GVPoint)
          const graph = graphic.getFigure(...sommetsRectangles, ...cotesRectangles, cotesRectangles[0], cotesRectangles[rectangleImage])

          const n = new GVGrandeur('n', nbRectangles, 0)
          const AnglePlein = new GVGrandeur('', 360, 0, 'deg')
          const angle = AnglePlein.divide(n)
          const k = new GVGrandeur('', rectangleImage, 0)
          const angleSolution = angle.multiply(k)
          ABCD.name = circularPermutation(ABCD.concat([])).join('')
          EFGH.name = circularPermutation(EFGH.concat([])).join('')
          angle.name = aleaName(['\\alpha', '\\beta', '\\gamma', '\\delta'], 1)
          let remarque
          if (angleSolution.toFixed + 90 > 360) {
            remarque = `<br>\\textit{Remarque :} L'angle est plus grand que $360\\degree$.

$${angleSolution.toFixed + 90}-360=${angleSolution.toFixed + 90 - 360}$

Donc la solution peut être une rotation d'angle $${angleSolution.toFixed + 90 - 360}\\degree$.`
          } else { remarque = '' }
          // L'exercice
          // Chaque rectangle et son suivant sont obtenus par une rotation de même centre et de même angle.
          exercice.texte = `Il y a $${n.toFixed}$ carrés tous identiques dont $${ABCD.name}$ et $${EFGH.name}$.

Déterminer l'angle de la rotation de centre $${ABCD[2]}$ qui permet de transformer $${ABCD[3]}$ en $${EFGH[1]}$ dans le sens direct (anti-horaire).

${graph.split('\n').filter(x => x !== '').filter(x => x !== '').join('\n')}`.replaceAll('\n\n', context.isHtml ? '<br>' : '\n\n')
          exercice.texteCorr = `Il y a $${n.value}$ carrés en tout.

$\\dfrac{360\\degree}{${n.toFixed}} = ${angle.toFixed}\\degree$

On doit tourner $${rectangleImage}$ fois d'un angle de $${angle.toFixed}\\degree$ dans le sens direct (anti-horaire) pour passer de $${ABCD.name}$ à $${EFGH.name}$.

L'image de $${ABCD[3]}$ par cette rotation est $${EFGH[3]}$.

On doit ensuite effectuer une rotation de centre $${ABCD[2]}$ d'un angle de $90\\degree$ pour passer du point $${EFGH[3]}$ au point $${EFGH[1]}$.

$${rectangleImage}\\times${angle.toFixed}\\degree+90\\degree=${angleSolution.toFixed + 90}\\degree$

Donc c'est la rotation de centre $${ABCD[2]}$ et d'angle $${angleSolution.toFixed + 90}\\degree$.

${remarque}`
          break
        }
        case 36: {
          // Angles
          // http://localhost:8090/mathalea.html?ex=betaThales,s=36,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView()
          // const [A, B, C] = graphic.addRectPoint()
          const triangle = graphic.addTriangle()
          // graphic.aleaName(...triangle)
          graphic.addLabelsPointsPolygon(...triangle.vertices)
          const angles = graphic.addAnglesPolygon(...triangle.vertices)
          const aA = new GVGrandeur(circularPermutation(triangle.vertices.map(x => x.name), 2).join(''), angles[0].angle / Math.PI * 180, 0, 'deg')
          const aB = new GVGrandeur(circularPermutation(triangle.vertices.map(x => x.name), 0).join(''), angles[1].angle / Math.PI * 180, 0, 'deg')
          const aC = new GVGrandeur(circularPermutation(triangle.vertices.map(x => x.name), 1).join(''), 180 - (aA.toFixed + aB.toFixed), 0, 'deg')
          triangle.name = circularPermutation(triangle.vertices.map(x => x.name)).join('')
          const graph = graphic.getFigure(
            ...triangle.vertices
            , ...graphic.addSidesPolygon(...triangle.vertices)
            , ...angles.map(x => { x.fillColor = 'red'; x.right = true; return x })
          )
          exercice.texte = `$\\widehat{${aA.name}}=${aA.format()}$ $\\widehat{${aB.name}}=${aB.format()}$

${graph}`
          exercice.texteCorr = String.raw`Dans un triangle, la somme des angles est $180\degree$.

Dans le triangle $${triangle.name}$ :

$\begin{aligned}
\widehat{${aA.name}}+\widehat{${aB.name}}+\widehat{${aC.name}}&=180\degree\\
${aA.format()}+${aB.format()}+\widehat{${aC.name}}&=180\degree\\
\widehat{${aC.name}}&=180 - (${aA.format()}+${aB.format()})\\
\widehat{${aC.name}}&=180 - ${aA.add(aB).format()}\\
\widehat{${aC.name}}&=${aC.format()}
\end{aligned}$`
          break
        }
        case 37: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=37,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView(0, 0, 10, 7)
          // graphic.clipVisible = true
          const ABC = graphic.addTriangle()
          const [A, B, C] = ABC.vertices
          const k = new GVGrandeur('k', Math.floor(Math.random() * 10 + 10) / 10 + 0.1, 1)
          const DEF = graphic.addTriangle(
            k.toFixed * graphic.distance(A, B),
            k.toFixed * graphic.distance(B, C),
            k.toFixed * graphic.distance(A, C)
          )
          const [D, E, F] = DEF.vertices
          DEF.moveRight(ABC)
          const AB = new GVGrandeur([A, B], graphic.distance(A, B), 1, 'cm')
          const BC = new GVGrandeur([B, C], graphic.distance(B, C), 1, 'cm')
          const CA = new GVGrandeur([C, A], graphic.distance(C, A), 1, 'cm')
          const DE = AB.multiply(k)
          const EF = BC.multiply(k)
          const FD = CA.multiply(k)
          DE.aleaName(D, E)
          EF.aleaName(E, F)
          FD.aleaName(F, D)
          const graph = graphic.getFigure(ABC, DEF)
          const hfill = context.isHtml ? '\\hspace{1cm}' : '\\hfill'
          exercice.texte = name`$${DEF}$ est une agrandissement de $${ABC}$ tel que les points $${D}$, $${E}$, $${F}$ sont les homologues respectifs de $${A}$, $${B}$, $${C}$.

On sait que ${AB.nameAndValue}, ${BC.nameAndValue}, ${DE.nameAndValue} et ${FD.nameAndValue}.

$\textbf{1.}$ Calculer $${EF}$. $${hfill}$ $\textbf{2.}$ Calculer $${CA}$ $${hfill}$.

${graph}`
          exercice.texteCorr = name`$\textbf{1.} $ $${toTex(name`${DE}/${AB}=${DE.toFixed}/${AB.toFixed}=${k.toFixed}`)}$

Donc $${DEF}$ est $${k.format()}$ fois plus grand que $${ABC}$.

$${EF}=${k.format()}\times ${AB}$.

$${EF}=${k.format()}\times ${AB.format()}$.

$${EF}=${EF.format()}$.

$\textbf{2.}$ On a $${FD}=${k.format()}\times ${CA}$.

Soit $${FD.format()}=${k.format()}\times ${CA}$.

Résolvons l'équation d'inconnue $${CA}$.

${resoudre(name`${FD.toFixed}=${k.toFixed}*${CA}`, {}).texteCorr}

Donc ${CA.nameAndValue}.`
          break
        }
        case 38: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=38,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView(0, 0, 10, 7)
          graphic.clipVisible = false
          const ABCD = graphic.addRegularPolygon(4)
          const [A, B, C] = ABCD.vertices.slice(0, 3)
          const k = new GVGrandeur('k', Math.floor(Math.random() * 10 + 10) / 10 + 0.1, 1)
          const [E] = graphic.addPoint()
          const F = graphic.addPointDistance(E, k.toFixed * graphic.distance(A, B))
          const EFGH = graphic.addRegularPolygon(4, E, F)
          const G = EFGH.vertices[2]
          // Déplacer la figure
          EFGH.moveRight(ABCD)
          // Calcul des grandeurs
          const AB = new GVGrandeur('AB', graphic.distance(A, B), 1, 'cm')
          AB.aleaName(A, B)
          const AC = AB.hypotenuse(AB)
          AC.aleaName(A, C)
          const BC = AB.add(new GVGrandeur('', 0, 0, 'cm'))
          BC.aleaName(B, C)
          const EF = AB.multiply(k)
          EF.aleaName(E, F)
          const EG = EF.hypotenuse(EF)
          EG.aleaName(E, G)
          const AB2 = AB.pow(2).multiply(new GVGrandeur('', 2, 0))
          const graph = graphic.getFigure(ABCD, EFGH)
          exercice.texte = name`Le carré $${EFGH}$ est une agrandissement de $${ABCD}$.

L'échelle d'agrandissement est $${k.format()}$.

On sait que ${AB.nameAndValue}.

Calculer $${EG}$  arrondi au millimètre près.

${graph}`
          exercice.texteCorr = name`$${ABCD}$ est un carré donc $${A}${B}${C}$ est rectangle en ${B}.

D'après le théorème de Pythagore, on a :

$${AC}^2=${AB}^2+${BC}^2$

$${toTex(name`${AC}^2=${AB.toFixed}^2+${BC.toFixed}^2`)}$

$${toTex(name`${AC}^2=${AB2.toFixed}`)}$

$${AC}=\sqrt{${toTex(`${AB2.toFixed}`)}}$

On a donc $${EG} = ${k.format()} \times \sqrt{${toTex(`${AB2.toFixed}`)}}$

D'où ${EG.nameAndValue.replace('=', '\\approx')}.`
          break
        }
        case 39: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=39,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView(0, 0, 10, 7)
          graphic.clipVisible = false
          const ABCD = graphic.addRegularPolygon(4)
          const [A, B, C] = ABCD.vertices.slice(0, 3)
          const k = new GVGrandeur('k', Math.floor(Math.random() * 10 + 10) / 10 + 0.1, 1)
          const [E] = graphic.addPoint()
          const F = graphic.addPointDistance(E, k.toFixed * graphic.distance(A, B))
          const EFGH = graphic.addRegularPolygon(4, E, F)
          const G = EFGH.vertices[2]
          // Déplacer la figure
          EFGH.moveRight(ABCD)
          const AB = new GVGrandeur([A, B], graphic.distance(A, B), 1, 'cm')
          const AC = AB.hypotenuse(AB)
          AC.aleaName(A, C)
          const BC = AB.add(new GVGrandeur('', 0, 0, 'cm'))
          BC.aleaName(B, C)
          const EF = AB.multiply(k)
          EF.aleaName(E, F)
          const EG = EF.hypotenuse(EF)
          EG.aleaName(E, G)
          const FG = EF.add(new GVGrandeur('', 0, 0, 'cm'))
          const EF2 = EF.pow(2).multiply(new GVGrandeur('', 2, 0))
          const graph = graphic.getFigure(ABCD, EFGH)
          exercice.texte = name`Le carré $${EFGH}$ est une agrandissement de $${ABCD}$.

L'échelle d'agrandissement est $${k.format()}$.

On sait que ${EF.nameAndValue}.

Calculer $${AC}$ arrondi au millimètre près.

${graph}`
          exercice.texteCorr = name`$${EFGH}$ est un carré donc $${E}${F}${G}$ est rectangle en ${F}.

D'après le théorème de Pythagore, on a :

$${EG}^2=${EF}^2+${FG}^2$

$${toTex(name`${EG}^2=${EF.toFixed}^2+${FG.toFixed}^2`)}$

$${toTex(name`${EG}^2=${EF2.toFixed}`)}$

$${EG}=\sqrt{${toTex(`${EF2.toFixed}`)}}$

On a donc $${AC} = \dfrac{\sqrt{${toTex(`${EF2.toFixed}`)}}}{${k.format()}}$

D'où ${AC.nameAndValue.replace('=', '\\approx')}.`
          break
        }
        case 40: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=40,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView(0, 0, 10, 7)
          graphic.clipVisible = false
          const ABCD = graphic.addRegularPolygon(4)
          const [A, B] = ABCD.vertices.slice(0, 2)
          const k = new GVGrandeur('k', Math.floor(Math.random() * 10 + 10) / 10 + 0.1, 1)
          const [E] = graphic.addPoint()
          const F = graphic.addPointDistance(E, k.value * graphic.distance(A, B))
          const EFGH = graphic.addRegularPolygon(4, E, F)
          EFGH.moveRight(ABCD)
          const AB = new GVGrandeur([A, B], graphic.distance(A, B), 1, 'cm')
          const EF = AB.multiply(k)
          EF.aleaName(E, F)
          const AireEFGH = EF.multiply(EF)
          const graph = graphic.getFigure(ABCD, EFGH)
          exercice.texte = name`Le carré $${EFGH}$ est un agrandissement de $${ABCD}$.

L'échelle d'agrandissement est $${k.format()}$.

On sait que ${AB.nameAndValue}.

Calculer l'aire de $${EFGH}$ de deux manières.

${graph}`
          exercice.texteCorr = name`$${EF}=${k.format()}\times ${AB}$.

$${EF}=${k.format()}\times ${AB.format()}$

$${EF}=${EF.format()}$

L'aire d'un carré est le carré de la longueur de son côté.

$${EF}^2=${toTex(`${EF.toFixed}^2`)}=${toTex(`${EF.pow(2).toFixed}`)}$

L'aire du carré est donc $${AireEFGH.format()}$
`
          break
        }
        case 41: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=41,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView(0, 0, 7, 5)
          const ABCD = graphic.addRectangle()
          const [A, B, C, D] = ABCD.vertices
          const angles = graphic.addAnglesPolygon(A, B, C, D)
          const AB = graphic.addSegment(A, B)
          AB.direct = graphic.addAngle(A, B, C).direct
          const BC = graphic.addSegment(B, C)
          BC.direct = AB.direct
          const CD = graphic.addSegment(C, D)
          const DA = graphic.addSegment(D, A)
          const variables = aleaVariables({
            a: this.sup2 !== 1,
            c: this.sup2 !== 1,
            x: this.sup2 !== 1,
            AB: (10 * graphic.distance(A, B)).toFixed(0),
            BC: (10 * graphic.distance(B, C)).toFixed(0),
            b: 'AB-a*x',
            d: 'BC-c*x',
            p: '2*(a*x+b+c*x+d)',
            test: 'a*x+b>0 and c*x+d>0'
          })
          delete variables.x
          const exprAB = toString(assignVariables('a*x+b', variables))
          const exprBC = toString(assignVariables('c*x+d', variables))
          AB.text = context.isHtml ? `${exprAB}`.replaceAll('*', '') : `$${exprAB}$`.replaceAll('*', '')
          BC.text = context.isHtml ? `${exprBC}`.replaceAll('*', '') : `$${exprBC}$`.replaceAll('*', '')
          const p = variables.p
          const graph = graphic.getFigure(ABCD, AB, BC, ...angles.map(x => { x.right = true; return x }))
          const resolution = resoudre(`${p}=2*(${exprAB}) + 2*(${exprBC})`, { suppr1: false, substeps: this.correctionDetaillee })
          const calculAB = calculer('a*(x)+b'.replace('x', resolution.solution.exact), { name: AB.name, suppr1: false, substeps: this.correctionDetaillee, variables: variables })
          const calculBC = calculer('c*(x)+d'.replace('x', resolution.solution.exact), { name: BC.name, suppr1: false, substeps: this.correctionDetaillee, variables: variables })
          const calculAire = calculer(`${calculAB.result}*${calculBC.result}`, { name: '\\mathcal{A}', suppr1: false, substeps: this.correctionDetaillee, variables: variables })
          let solutionDecimale = math.fraction(calculAire.result.replaceAll(' ', '')).valueOf()
          const environ = solutionDecimale === math.round(solutionDecimale, 2) ? '' : 'environ'
          solutionDecimale = math.round(solutionDecimale, 2).toString()
          exercice.texte = name`$${ABCD}$ est un rectangle.

$x$ est un nombre tel que $ {${AB}=${toTex(exprAB)}}$ et $ {${BC}=${toTex(exprBC)}}$ en $cm$.

Le périmètre de $${ABCD}$ mesure $${p}~cm$.

Déterminer son aire en $cm^2$.

${graph}`
          exercice.texteCorr = name`$${ABCD}$ est un rectangle donc ses côtés opposés sont de la même longueur.

D'où $${AB}=${CD}$ et $${BC}=${DA}$.

Ainsi, $${toTex(name`${p} = 2*${AB} + 2*${BC}`)}$.

Ou encore $${toTex(`${p} = 2*(${exprAB}) + 2*(${exprBC})`)}$.

$\textbf{Résolvons cette équation d'inconnue $x$}$.

${resolution.texteCorr}

$\textbf{Calculons $${AB}$ en cm.}$

${calculAB.texteCorr}

$\textbf{Calculons $${BC}$ en cm.}$

${calculBC.texteCorr}

$\textbf{Calculons l'aire $\mathcal{A}$ de $${ABCD}$ en $cm^2$.}$

${calculAire.texteCorr}

Donc l'aire du rectangle $${ABCD}$ est ${environ} $${toTex(solutionDecimale)}~cm^2$.`
          break
        }
        case 42: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=42,n=1&serie=hZya&v=ex&z=1
          const graphic = new GVGraphicView(0, 0, 7, 5)
          const ABCD = graphic.addRectangle()
          const [A, B, C, D] = ABCD.vertices
          const angles = graphic.addAnglesPolygon(A, B, C, D)
          const AB = graphic.addSegment(A, B)
          AB.direct = graphic.addAngle(A, B, C).direct
          const BC = graphic.addSegment(B, C)
          const CD = graphic.addSegment(C, D)
          CD.direct = AB.direct
          const DA = graphic.addSegment(D, A)
          const variables = aleaVariables({
            c: this.sup2 !== 1,
            x: this.sup2 !== 1,
            a: this.sup2 !== 1,
            AB: (10 * graphic.distance(A, B)).toFixed(0),
            BC: (10 * graphic.distance(B, C)).toFixed(0),
            b: 'AB-a*x',
            d: 'AB-c*x',
            p: '2*(AB+BC)',
            test: 'a!=c and a*x+b>0'
          })
          delete variables.x
          const exprAB = toString(assignVariables('a*x+b', variables))
          const exprCD = toString(assignVariables('c*x+d', variables))
          AB.text = context.isHtml ? `${exprAB}`.replaceAll('*', '') : `$${exprAB}$`.replaceAll('*', '')
          CD.text = context.isHtml ? `${exprCD}`.replaceAll('*', '') : `$${exprCD}$`.replaceAll('*', '')
          const p = variables.p
          const graph = graphic.getFigure(ABCD, AB, CD, ...angles.map(x => { x.right = true; return x }))
          const resolution = resoudre(`${exprAB}=${exprCD}`, { suppr1: false, substeps: this.correctionDetaillee })
          const calculAB = calculer('a*(x)+b'.replace('x', resolution.solution.exact), { name: AB.name, suppr1: false, substeps: this.correctionDetaillee, variables: variables })
          const resolution2 = resoudre(name`${p} = 2*${calculAB.result} + 2*${BC}`, { suppr1: false, substeps: this.correctionDetaillee })
          const calculAire = calculer(`${calculAB.result}*${resolution2.solution.exact}`, { name: '\\mathcal{A}', suppr1: false, substeps: this.correctionDetaillee, variables: variables })
          let solutionDecimale = math.fraction(calculAire.result.replaceAll(' ', '')).valueOf()
          const environ = solutionDecimale === math.round(solutionDecimale, 2) ? '' : 'environ'
          solutionDecimale = math.round(solutionDecimale, 2).toString()
          exercice.texte = name`$${ABCD}$ est un rectangle.

$x$ est un nombre tel que $ {${AB}=${toTex(exprAB)}}$ et $ {${CD}=${toTex(exprCD)}}$ en $cm$.

Le périmètre de $${ABCD}$ mesure $${p}~cm$.

Déterminer son aire en $cm^2$.

${graph}`
          exercice.texteCorr = name`$${ABCD}$ est un rectangle donc ses côtés opposés sont de la même longueur.

D'où $${AB}=${CD}$ et $${BC}=${DA}$.

Ainsi $${toTex(`${exprAB}=${exprCD}`)}$.

$\textbf{Résolvons l'équation.}$

${resolution.texteCorr}

$\textbf{Calculons $${AB}$ en cm}.$

${calculAB.texteCorr}

Ainsi, $${toTex(name`${p} = 2* (${calculAB.result}) + 2* ${BC}`)}$.

$\textbf{Résolvons cette équation d'inconnue $${BC}$}$.

${resolution2.texteCorr}

$\textbf{Calculons l'aire $\mathcal{A}$ de $${ABCD}$ en $cm^2$.}$

${calculAire.texteCorr}

Donc l'aire du rectangle $${ABCD}$ est ${environ} $${toTex(solutionDecimale)}~cm^2$.`
          break
        }
        case 43: {
          // http://localhost:8090/mathalea.html?ex=betaThales,s=43,s2=3,s3=1,n=1,cd=1&serie=dA7c&v=ex&z=1
          const graphic = new GVGraphicView(-5, -5, 5, 5)
          this.consigne = 'Donner les coordonnées de tous les points.'
          graphic.clipVisible = false
          graphic.allowResize = false
          graphic.showLabelPoint = true
          graphic.limit = 100
          graphic.addGrid()
          graphic.addAxes()
          let A, B, C, D, E
          do {
            [A, B, C, D, E] = graphic.addPoint(5, 0.5)
          } while (A.x * A.y * B.x * B.y * C.x * C.y === 0 || D.x === D.y || E.x === -E.y)
          let C1, D1, E1
          const [A1] = graphic.addSymetric(new GVLine(new GVPoint(0, 0), new GVVector(1, 0)), A)
          const [B1] = graphic.addSymetric(new GVPoint(0, 0), B)
          if (this.sup2 > 2) {
            [C1] = graphic.addHomothetic(new GVPoint(0, 0), 0.5, C)
          } else {
            [C1] = graphic.addSymetric(new GVLine(new GVPoint(0, 0), new GVVector(0, 1)), C)
          }
          if (this.sup2 > 2) {
            [D1] = graphic.addRotate(new GVPoint(0, 0), Math.PI / 2, D)
          } else {
            [D1] = graphic.addSymetric(new GVLine(new GVPoint(0, 0), new GVVector(1, 1)), D)
          }
          if (this.sup2 > 1) {
            [E1] = graphic.addTranslate(B.sub(A).getVector(), E)
          } else {
            [E1] = graphic.addSymetric(new GVLine(new GVPoint(0, 0), new GVVector(-1, 1)), E)
          }
          [A1, B1, C1, D1, E1].forEach((P, i) => { P.name = [A, B, C, D, E][i].name + '\''; P.showDot(); P.showName() })
          const graph = graphic.getFigure(A, B, C, D, E)
          const graph2 = graphic.getFigure(A, B, C, D, E, A1, B1, C1, D1, E1)
          const donnees = []
          donnees.push([name`$${A1}$ est le symétrique de $${A}$ par rapport à l'axe des abscisses.`, name`$${A}${A.coordinates.format()}$ et $${A1}${A1.coordinates.format()}$.`])
          donnees.push([name`$${B1}$ est le symétrique de $${B}$ par rapport à l'origine du repère.`, name`$${B}${B.coordinates.format()}$ et $${B1}${B1.coordinates.format()}$.`])
          if (this.sup2 > 2) {
            donnees.push([name`$${C1}$ est l'image de $${C}$ par l'homothétie de centre l'origine du repère et de rapport $\dfrac{1}{2}$.`, name`$${C}${C.coordinates.format()}$ et $${C1}${C1.coordinates.format()}$.`])
          } else {
            donnees.push([name`$${C1}$ est le symétrique de $${C}$ par rapport à l'axe des ordonnées.`, name`$${C}${C.coordinates.format()}$ et $${C1}${C1.coordinates.format()}$.`])
          }
          if (this.sup2 > 2) {
            donnees.push([name`$${D1}$ est l'image de $${D}$ par la rotation de centre l'origine du repère et d'angle $90\degree$ dans le sens direct (anti-horaire).`, name`$${D}${D.coordinates.format()}$ et $${D1}${D1.coordinates.format()}$.`])
          } else {
            donnees.push([name`$${D1}$ est le symétrique de $${D}$ par rapport à la droite passant par l'origine et par le point de coordonnées $(1{;}1)$.`, name`$${D}${D.coordinates.format()}$ et $${D1}${D1.coordinates.format()}$.`])
          }
          if (this.sup2 > 1) {
            donnees.push([name`$${E1}$ est l'image de $${E}$ par la translation qui emmène $${A}$ sur $${B}$.`, name`$${E}${E.coordinates.format()}$ et $${E1}${E1.coordinates.format()}$.`])
          } else {
            donnees.push([name`$${E1}$ est le symétrique de $${E}$ par rapport à la droite passant par l'origine et par le point de coordonnées $(-1{;}1)$.`, name`$${E}${E.coordinates.format()}$ et $${E1}${E1.coordinates.format()}$.`])
          }
          const donneesMelangees = aleaName(donnees)
          exercice.texte = `${donneesMelangees.map(x => { return '$\\bullet~$ ' + x[0] }).join('<br>')}<br>${graph}`
          exercice.texteCorr = `${donneesMelangees.map(x => { return '$\\bullet~$ ' + x[1] }).join('<br>')}<br>${graph2}`
          break
        }
      }
      // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
      if (this.questionJamaisPosee(i, i)) {
        this.listeQuestions.push(exercice.texte.replaceAll('\n\n', '<br>'))
        this.listeCorrections.push(exercice.texteCorr.replaceAll('\n\n', '<br>').replaceAll('$$', '$\\hspace{0.5cm}'))
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
