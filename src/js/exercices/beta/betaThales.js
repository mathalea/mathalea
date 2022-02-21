import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, texNum } from '../../modules/outils.js'
import { polygone, labelPoint, homothetie, point, rotation, mathalea2d, droite } from '../../modules/2d.js'
import { parse, create, all, unit } from 'mathjs'
import { aleaVariables, toTex, resoudre, aleaExpression, aleaName } from '../../modules/outilsMathjs.js'
import { GraphicView } from '../../modules/aleaFigure/GraphicView.js'
import { Grandeur } from '../../modules/aleaFigure/grandeurs.js'
import { Line, Segment, Vector, Point } from '../../modules/aleaFigure/elements.js'
import { AleaThalesConfig } from '../../modules/aleaFigure/outilsThales.js'
import { circularPermutation } from '../../modules/aleaFigure/outils.js'

// eslint-disable-next-line no-debugger
debugger

const nbCase = 35

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

/*
function n(s, ...p) {
    console.log(arguments)
    p = p.map((x, k) => s[k] + (typeof x === 'number' ? parseFloat(x.toFixed(16)) : x));
    console.log(p)
    return p.join('') + s[s.length - 1];
}
n`J'ai ${0.1 + 0.2} éléphants et trois ${chat} incroyables`
*/

function name (s, ...p) {
  console.log(p)
  p = p.map((x, k) => {
    if (x instanceof Grandeur) {
      return s[k] + x.name
    } else if (x instanceof Line) {
      return s[k] + `(${x.name})`
    } else if (x instanceof Segment) {
      return s[k] + `[${x.name}]`
    } else {
      return x
    }
  })
  return p.join('') + s[s.length - 1]
}

/**
 * Produire une configuration de Thalès et les éléments de rédaction d'un énoncé et de sa solution
 * @returns {Objet} // retourne un objet
 */
function thales () {
  const v = aleaVariables(
    {
      xA: 'pickRandom([-1,1])*round(random(1,3),1)', // Abscisse du point A
      yA: '0', // Ordonnée de A
      alpha: 'random(10,350)', // Angle de rotation autour de O pour B
      kB: 'pickRandom([-1,1])*pickRandom([round(random(0.3,0.7),1),round(random(1.3,3),1)])', // rapport d'ag-red de OB=kB*OA
      k: 'pickRandom([-1,1])*pickRandom([round(random(0.3,0.7),1),round(random(1.3,3),1)])', // OM = k * OA et ON = k * OB
      xB: 'kB*xA*cos(alpha/180*PI)',
      yB: 'kB*xA*sin(alpha/180*PI)',
      xM: 'k*xA',
      yM: 'k*yA',
      xN: 'k*xB',
      yN: 'k*yB',
      xmin: 'min([0,xA,xB,xM,xN])',
      xmax: 'max([0,xA,xB,xM,xN])',
      ymin: 'min([0,yA,yB,yM,yN])',
      ymax: 'max([0,yA,yB,yM,yN])',
      largeur: 'xmax-xmin',
      hauteur: 'ymax-ymin',
      ppc: '10/largeur*20',
      scale: '5/largeur',
      ratio: 'largeur/hauteur',
      test: 'abs(kB)!=1 and abs(k)!=1 and 1<ratio<1.3',
      OA: 'distance([0,0],[xA,yA])',
      OM: 'distance([0,0],[xM,yM])',
      ON: 'distance([0,0],[xN,yN])',
      AB: 'round(distance([xB,yB],[xA,yA]),1)',
      MN: 'abs(k)*AB',
      OB: 'distance([0,0],[xB,yB])'
    }, { valueOf: true }
  )
  const listeNames = aleaName(5)
  const objets = []
  const O = point(0, 0, listeNames[0], 'left')
  const A = point(v.xA, 0, listeNames[1], 'below')
  const B = homothetie(rotation(A, O, v.alpha), O, v.kB)
  B.nom = listeNames[2]
  B.positionLabel = 'above'
  const M = homothetie(A, O, v.k)
  M.nom = listeNames[3]
  M.positionLabel = 'below'
  const N = homothetie(B, O, v.k)
  N.nom = listeNames[4]
  N.positionLabel = 'above'
  const dOA = droite(O, A)
  const dOB = droite(O, B)
  // const OM = segment(O, M)
  // const ON = segment(O, N)
  const dAB = droite(A, B)
  const dMN = droite(M, N)
  objets.push(O, A, B, M, N, dOA, dOB, dAB, dMN)
  for (const i of objets) {
    if (i.typeObjet === 'point') objets.push(labelPoint(i))
  }
  const k = 20 / v.ppc
  const clip = { xmin: v.xmin - k, xmax: v.xmax + k, ymin: v.ymin - k, ymax: v.ymax + k }
  const drawClip = polygone(
    point(clip.xmin, clip.ymin),
    point(clip.xmax, clip.ymin),
    point(clip.xmax, clip.ymax),
    point(clip.xmin, clip.ymax)
  )
  objets.push(drawClip)
  const droitesparalleles = aleaName([aleaName([A, B]).map(x => { return x.nom }).join(''), aleaName([M, N]).map(x => { return x.nom }).join('')])
  const d1 = droitesparalleles[0]
  const d2 = droitesparalleles[1]
  const droitessecantes = aleaName([aleaName([A, M]).map(x => { return x.nom }).join(''), aleaName([B, N]).map(x => { return x.nom }).join('')])
  const d3 = droitessecantes[0]
  const d4 = droitessecantes[1]
  const OA = { l: v.OA, nom: [O, A].map(x => { return x.nom }).join(''), nomAlea: aleaName([O, A]).map(x => { return x.nom }).join('') }
  const OM = { l: v.OM, nom: [O, M].map(x => { return x.nom }).join(''), nomAlea: aleaName([O, M]).map(x => { return x.nom }).join('') }
  const OB = { l: v.OB, nom: [O, B].map(x => { return x.nom }).join(''), nomAlea: aleaName([O, B]).map(x => { return x.nom }).join('') }
  const ON = { l: v.ON, nom: [O, N].map(x => { return x.nom }).join(''), nomAlea: aleaName([O, N]).map(x => { return x.nom }).join('') }
  const AB = { l: v.AB, nom: [A, B].map(x => { return x.nom }).join(''), nomAlea: aleaName([A, B]).map(x => { return x.nom }).join('') }
  const MN = { l: v.MN, nom: [M, N].map(x => { return x.nom }).join(''), nomAlea: aleaName([M, N]).map(x => { return x.nom }).join('') }
  const inverse = aleaName([0, 1], 1) // Peut-être pas utile
  const quotientsEgaux = '$$'.split('').join([[OA, OM], [OB, ON], [AB, MN]].map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return toTex(quotient.map(x => { return x.nom }).join('/'))
  }).join('='))
  const variables = {}
  variables[OA.nom] = OA.l
  variables[OB.nom] = OB.l
  variables[OM.nom] = OM.l
  // Calculer ON
  const deuxQuotients = '$$'.split('').join(aleaName([[OA, OM], [OB, ON]]).map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return toTex(quotient.map(x => { return x.nom }).join('/'), { variables: variables })
  }).join('='))
  const resoudreQuotients = [[OA, OM], [OB, ON]].map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return aleaExpression(quotient.map(x => { return x.nom }).join('/'), variables)
  }).join('=')
  const steps = []
  steps.push('$$'.split('').join([[OA, ON], [OM, OB]].map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return toTex(quotient.map(x => { return x.nom }).join('*'), { variables: variables })
  }).join('=')))
  steps.push('$$'.split('').join(toTex(`${ON.nom}=(${OM.nom}*${OB.nom})/${OA.nom}`, { variables: variables })))
  // Calculer MN
  const variablesMN = {}
  variablesMN[OA.nom] = OA.l
  variablesMN[AB.nom] = AB.l
  variablesMN[OM.nom] = OM.l
  const deuxQuotientsMN = '$$'.split('').join(aleaName([[OA, OM], [AB, MN]]).map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return toTex(quotient.map(x => { return x.nom }).join('/'), { variables: variablesMN })
  }).join('='))
  const stepsMN = []
  stepsMN.push('$$'.split('').join([[OA, MN], [OM, AB]].map(quotient => {
    quotient = [quotient[(0 + inverse) % 2], quotient[(1 + inverse) % 2]]
    return toTex(quotient.map(x => { return x.nom }).join('*'), { variables: variablesMN })
  }).join('=')))
  stepsMN.push('$$'.split('').join(toTex(`${MN.nom}=(${OM.nom}*${AB.nom})/${OA.nom}`, { variables: variablesMN })))
  const donnees = aleaName([OA, OB, OM]).map(x => { return `$${x.nomAlea}=${texNum(x.l)}\\text{ cm}$` }).join(', ')
  const donneesMN = aleaName([OA, AB, OM]).map(x => { return `$${x.nomAlea}=${texNum(x.l)}\\text{ cm}$` }).join(', ')
  const enonce = [
    `$(${d1})$ et $(${d2})$ sont parallèles.`,
    `$(${d3})$ et $(${d4})$ sont sécantes en $${O.nom}$.`,
    'D\'après le théorème de Thalès, on a l\'égalité suivante.',
    `${quotientsEgaux}`,
    `On a ${donnees}.`,
    `Calculer $${ON.nom}$.`,
    `${deuxQuotients}`,
    'On en déduit l\'égalité des produits en croix :',
    `${steps[0]}`,
    `${steps[1]}`,
    `Donc $${ON.nom}=${texNum(ON.l)}\\text{ cm}$.`,
    `On a ${donneesMN}.`,
    `Calculer $${MN.nom}$.`,
    `${deuxQuotientsMN}`,
    'On en déduit l\'égalité des produits en croix :',
    `${stepsMN[0]}`,
    `${stepsMN[1]}`,
    `Donc $${MN.nom}=${texNum(MN.l)}\\text{ cm}$.`,
    `${resoudre(resoudreQuotients).texteCorr}`
  ]
  const figure = '<br><br>' + mathalea2d(Object.assign({ pixelsParCm: v.ppc, scale: v.scale }, clip), objets) + '<br><br>'
  return { enonce: enonce, figure: figure, quotientsEgaux: quotientsEgaux }
}

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
        case 1: {
          exercice = thales()
          exercice.texte = 'En admettant que toutes les conditions sont réunies, appliquer le théorème de Thalès à la configuration ci-dessous.' + exercice.figure
          exercice.texteCorr = exercice.enonce.slice(0, 4).join('<br>')
          break
        }
        case 2: {
          exercice = thales()
          exercice.texte = exercice.enonce.slice(5, 7).join('<br>')
          exercice.texteCorr = exercice.enonce.slice(7, 11).join('<br>')
          break
        }
        case 3: {
          exercice = thales()
          exercice.texte = exercice.enonce.slice(0, 2).join('<br>')
          exercice.texte += '<br>' + 'Faire une figure à main levée puis appliquer le théorème de Thalès.'
          exercice.texteCorr = exercice.figure + exercice.enonce.slice(3, 4).join('<br>')
          break
        }
        case 4: {
          exercice = thales()
          exercice.texte = 'On admet que toutes les conditions sont réunies pour une configuration de Thalès.'
          exercice.texte += exercice.figure
          exercice.texte += exercice.enonce.slice(4, 6).join('<br>')
          exercice.texteCorr = exercice.enonce.slice(0, 4).join('<br>')
          exercice.texteCorr += '<br>' + exercice.enonce.slice(6, 11).join('<br>')
          break
        }
        case 5: {
          exercice = thales()
          exercice.texte = 'On admet que toutes les conditions sont réunies pour une configuration de Thalès.'
          exercice.texte += exercice.figure
          exercice.texte += exercice.enonce.slice(11, 13).join('<br>')
          exercice.texteCorr = exercice.enonce.slice(0, 4).join('<br>')
          exercice.texteCorr += '<br>' + exercice.enonce.slice(13, 18).join('<br>')
          break
        }
        case 6: {
          // http://localhost:8080/mathalea.html?ex=betaThales,s=6,n=1&serie=fOS7&v=ex&z=1
          // exercice = aleaThalesConfig(true)
          break
        }
        case 7: {
          // Dépasser la limite du nombre de points
          // Remarque : l'algorithme est lourd lorsqu'on dépasse 20 points
          // http://localhost:8080/mathalea.html?ex=betaThales,s=7
          const graphic = new GraphicView()
          graphic.dimensions = { xmin: 0, ymin: 0, xmax: 10, ymax: 7 }
          graphic.show(...graphic.addPoint(20))
          exercice = { texte: graphic.getMathalea2DExport(), texteCorr: '' }
          break
        }
        case 8: {
          // Nommer des points avec des numéros
          // http://localhost:8080/mathalea.html?ex=betaThales,s=8
          const graphic = new GraphicView(0, 0, 10, 7)
          graphic.names = ['M']
          graphic.show(graphic.addPoint(11))
          exercice = { texte: graphic.getMathalea2DExport(), texteCorr: '' }
          break
        }
        case 9: {
          // Deux droites parallèles
          // http://localhost:8080/mathalea.html?ex=betaThales,s=9

          // Une seule droite s'affiche
          // http://localhost:8080/mathalea.html?ex=betaThales,s=9,n=1&serie=T2K6&z=1
          // http://localhost:8080/mathalea.html?ex=betaThales,s=9,n=1&serie=bm8b&z=1

          // Aucune droite ne s'affiche
          // http://localhost:8080/mathalea.html?ex=betaThales,s=9,n=1&serie=Yldw&z=1

          // Une seule droite s'affiche mais tronquée
          // http://localhost:8080/mathalea.html?ex=betaThales,s=9,n=1&serie=KrLG&z=1
          const graphic = new GraphicView(0, 0, 10, 7)
          const parallels = graphic.addParallelLine()
          graphic.show(parallels)
          // exercice = { texte: graphic.getMathalea2DExport(), texteCorr: '' }
          break
        }
        case 10: {
          // Une sécante à deux droites
          // Bug ? http://localhost:8080/mathalea.html?ex=betaThales,s=10
          // Manque le point D : http://localhost:8080/mathalea.html?ex=betaThales,s=all,n=24&serie=M3k4&v=ex&z=1
          // Manque le point D : http://localhost:8080/mathalea.html?ex=betaThales,s=all,n=24&serie=2498&v=ex&z=1
          const graphic = new GraphicView(0, 0, 10, 7)
          graphic.clipVisible = true
          const [A, B, C] = graphic.addNotAlignedPoint()
          const D = graphic.addNotAlignedPoint(A, B)[2]
          const dAB = graphic.addLine(A, B)
          const dAC = graphic.addLine(A, C)
          const dBD = graphic.addLine(B, D)
          // exercice = graphic.getMathalea2DExport(A, B, C, D, dAB, dAC, dBD)
          break
        }
        case 11: {
          // Droite verticale visible !
          // http://localhost:8080/mathalea.html?ex=betaThales,s=11
          const graphic = new GraphicView(-5, -5, 5, 5)
          const [A, B, C] = graphic.addPoint(3)
          A.x = 0
          B.x = 0
          const d = graphic.addLine(A, B)
          const d2 = graphic.addLine(A, C)
          graphic.show(A, B, C, d, d2)
          exercice = { texte: graphic.getMathalea2DExport(), texteCorr: '' }
          break
        }
        case 12: {
          // La droite ne s'affiche pas :
          // http://localhost:8080/mathalea.html?ex=betaThales,s=12,n=1&serie=1Ziy&z=1
          // http://localhost:8080/mathalea.html?ex=betaThales,s=12,n=1&serie=XCRV&z=1
          // http://localhost:8080/mathalea.html?ex=betaThales,s=12,n=1&serie=dBgM&z=1

          // La droite ne change pas ! (ou très peu)
          // http://localhost:8080/mathalea.html?ex=betaThales,s=12,n=1&serie=CWoc&z=1
          // http://localhost:8080/mathalea.html?ex=betaThales,s=12,n=1&serie=FjjF&z=1

          // La droite n'apparaît pas entièrement !
          // http://localhost:8080/mathalea.html?ex=betaThales,s=12,n=1&serie=MmjS&z=1

          // La droite s'affiche :
          // http://localhost:8080/mathalea.html?ex=betaThales,s=12,n=1&serie=D108&z=1
          const graphic = new GraphicView(-5, -5, 5, 5)
          graphic.clipVisible = true
          const [A, B] = graphic.addPoint(2)
          const graph = graphic.getMathalea2DExport(
            A, B, graphic.addLine(A, B)
          )
          exercice = { texte: graph, texteCorr: '' }
          break
        }
        case 13: {
          // La droite ne s'affiche pas
          // http://localhost:8080/mathalea.html?ex=betaThales,s=13,n=1&serie=1Ziy&z=1
          const clip = {
            xmin: -7.705072691422527,
            xmax: -1.505964975637891,
            ymin: -3.412118272892237,
            ymax: 2.786989442892399
          }
          const d = droite(5.165923096487196, 0.09340055601848096, 23.82094980359306)
          exercice = { texte: '', texteCorr: '' }
          exercice.texte = mathalea2d(
            Object.assign({ pixelsParCm: 38.71524919447583, scale: 1.9357624597237915 }, clip), [d]
          )
          break
        }
        case 14 : {
          // Parallelogrammes
          // http://localhost:8080/mathalea.html?ex=betaThales,s=14,n=1&serie=1Ziy&z=1
          const graphic = new GraphicView(-5, -5, 5, 5)
          const [A, B, C, D] = graphic.addParallelogram()
          const [E, F] = graphic.addParallelogram(A, B).slice(2)
          const [G] = graphic.addParallelogram(F, A, D).slice(3)
          const graph = graphic.getMathalea2DExport(
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
          // http://localhost:8080/mathalea.html?ex=betaThales,s=15,s2=3,s3=1,n=1,cd=1&serie=GDGD&v=ex&z=1
          const graphic = new GraphicView(-5, -5, 5, 5)
          const ABCD = graphic.addParallelogram()
          const O = graphic.addPointOutPolygon(...ABCD)
          graphic.placeLabelsPolygon(...ABCD)
          const k = (Math.random() * 0.4 + (Math.floor(Math.random() * 2)) + 0.3) * (-1) ** Math.floor(Math.random() * 2)
          const EFGH = graphic.addHomothetic(O, k, ...ABCD)
          graphic.placeLabelsPolygon(...EFGH)
          const names = aleaName(9)
          for (let i = 0; i < 8; i++) {
            [...ABCD, ...EFGH][i].name = names[i]
          }
          O.name = names[8]
          O.showDot()
          O.showLabel()
          const graph = graphic.getMathalea2DExport(
            O, ...ABCD, ...EFGH
            , graphic.addSidesPolygon(...ABCD), graphic.addSidesPolygon(...EFGH)
          )
          ABCD.name = circularPermutation(ABCD.map(x => x.name).join('')).join('')
          EFGH.name = circularPermutation(EFGH.map(x => x.name).join('')).join('')
          exercice.texte = `${graph}<br>
Dans cette homothétie de centre $${O.name}$ le parallélogramme de départ est $${ABCD.name}$.

$\\textbf{1.}$ Parmi les valeurs suivantes du rapport $k$, une seule est possible, laquelle ?

$\\hspace{1cm}$ $${aleaName([toTex(k.toFixed(1)), toTex((-k).toFixed(1)), toTex((1 / k).toFixed(1)), toTex((-1 / k).toFixed(1))]).join('\\qquad')}$

$\\textbf{2.}$ Quelle est l'image de $${ABCD[0].name}$ ?`.replaceAll('\n\n', '<br>')
          exercice.texteCorr = `$\\textbf{1.}$ $k = ${toTex(k.toFixed(1))}$

$\\textbf{2.}$ L'image de $${ABCD[0].name}$ est $${EFGH[0].name}$.`.replaceAll('\n\n', '<br>')
          break
        }
        case 16 : {
          // 3 Points non alignés
          // http://localhost:8080/mathalea.html?ex=betaThales,s=16,n=1&serie=1Ziy&z=1
          const graphic = new GraphicView(-5, -5, 5, 5)
          const [A, B, C] = graphic.addNotAlignedPoint()
          A.name = 'A'
          B.name = 'B'
          C.name = 'C'
          graphic.show(A, B, C, graphic.addSidesPolygon(A, B, C))
          const AB = new Grandeur(A.name + B.name, graphic.distance(A, B), 2, 'cm')
          let texte = name`${AB}`
          const graph = graphic.getMathalea2DExport()
          texte = texte + '<br>'
          exercice = { texte: texte + graph, texteCorr: '' }
          break
        }
        case 17 : {
          // Configurations de Thalès
          // Triangles emboités  // http://localhost:8080/mathalea.html?ex=betaThales,s=17,n=1&serie=1Ziy&z=1&v=ex
          // Papillon // http://localhost:8080/mathalea.html?ex=betaThales,s=17,n=1&serie=pitq&v=ex&z=1
          // const graphic = new GraphicView(-0.1, -0.1, 0.1, 0.1)
          // graphic.scale *= 100
          // graphic.ppc *= 100
          const graphic = new GraphicView(-5, -5, 5, 5)
          const [O, A, B] = graphic.addNotAlignedPoint() // Trois points non alignés
          // On ajoute les droites (OB) et (AB)
          const dOB = graphic.addLine(O, B)
          const dAB = graphic.addLine(A, B)
          // M est un point de (OA)
          const M = graphic.addPointAligned(O, A)[2] // C'est le troisième point de la sortie addPointAligned
          // Exemple d'un vecteur créé à partir de deux points
          const vO = new Vector(O.x, O.y)
          const vA = new Vector(A.x, A.y)
          const vM = new Vector(M.x, M.y)
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
          const OA = new Grandeur(O.name + A.name, graphic.distance(O, A), 1, 'cm')
          // On conservant signk le signe de k on a donc des longueurs algébriques
          const k = new Grandeur('k', signk * graphic.distance(O, M) / graphic.distance(O, A), 1)
          const OB = new Grandeur(O.name + B.name, graphic.distance(O, B), 1, 'cm')
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
          const AB = new Grandeur(A.name + B.name, graphic.distance(A, B), 1, 'cm')
          const p = OA.abs().add(AB.abs()).add(OB.abs())
          p.name = 'p'
          // Un exemple d'utilisation de grandeur produit
          const aire = OA.multiply(OB).abs()
          // On définit les éléments à afficher sur la figure
          const graph = graphic.getMathalea2DExport(
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
          // http://localhost:8080/mathalea.html?ex=betaThales,s=18,n=1&serie=fOS7&v=ex&z=1
          const graphic = new AleaThalesConfig()
          const [O, A, B, M, N] = graphic.geometric
          const graph = graphic.getMathalea2DExport(
            O, A, B, M, N,
            graphic.addSidesPolygon(O, A, B), // Les segments visibles sont les côtés des deux triangles OAB et OMN
            graphic.addSidesPolygon(O, M, N)
          )
          exercice.texte = graph
          break
        }
        case 19: {
          // http://localhost:8080/mathalea.html?ex=betaThales,s=19,n=1&serie=fOS7&v=ex&z=1
          const graphic = new AleaThalesConfig()
          graphic.classicConfig = true
          const [O, A, B, M, N] = graphic.geometric
          const graph = graphic.getMathalea2DExport(
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
          // Problème toFixed : http://localhost:8080/mathalea.html?ex=betaThales,s=21,n=1&serie=3B5V&v=ex&z=1
          // const graphic = aleaThalesConfig(0, 0, 6, 6)
          // const graphic = new AleaThalesConfig()

          // Paramètres
          // graphic.setDimensions(0.5)
          // graphic.classicConfig = true
          // graphic.OAB = true
          // graphic.new()

          // Exemple avec des conversions
          // http://localhost:8080/mathalea.html?ex=betaThales,s=21,n=1&serie=GxI1&v=ex&z=1
          // Il faut mettre la précision à 2
          // ça bloque Problème toFixed : http://localhost:8080/mathalea.html?ex=betaThales,s=21,n=1&serie=8JRU&v=ex&z=1
          const graphic = new AleaThalesConfig()
          /* graphic.setDimensions(-0.1, -0.1, 0.1, 0.1)
          graphic.new()
          graphic.scale *= 15 / graphic.width
          graphic.ppc *= 15 / graphic.width */

          // On récupère les 5 points en configuration de Thalès
          const [O, A, B, M, N] = graphic.geometric

          // On nomme les droites à partir des noms des points
          const dAB = graphic.addLine(A, B)
          dAB.aleaName(A, B) // L'ordre des lettres est aléatoirisé
          const dMN = graphic.addLine(M, N)
          dMN.aleaName(M, N) // L'ordre des lettres est aléatoirisé

          const signk = graphic.classicConfig ? 1 : -1
          // On définit deux grandeurs en imposant un nombre de décimales
          const OA = new Grandeur(O.name + A.name, parse(unit(graphic.distance(O, A), 'cm').toString()).args[0].value, 1, parse(unit(graphic.distance(O, A), 'cm').toString()).args[1].toString())
          // On conservant signk le signe de k on a donc des longueurs algébriques
          const k = new Grandeur('k', signk * graphic.distance(O, M) / graphic.distance(O, A), 1)
          const OB = new Grandeur(O.name + B.name, parse(unit(graphic.distance(O, B), 'cm').toString()).args[0].value, 1, parse(unit(graphic.distance(O, B), 'cm').toString()).args[1].toString())

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
          const AB = new Grandeur(A.name + B.name, parse(unit(graphic.distance(A, B), 'cm').toString()).args[0].value, 1, parse(unit(graphic.distance(A, B), 'cm').toString()).args[1].toString())
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
          const graph = graphic.getMathalea2DExport(
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
          // http://localhost:8080/mathalea.html?ex=betaThales,s=22,n=1&serie=hZya&v=ex&z=1
          // Droites invisibles : http://localhost:8080/mathalea.html?ex=betaThales,s=22,n=1&serie=Ihry&v=ex&z=1
          // Droite tronquée http://localhost:8080/mathalea.html?ex=betaThales,s=22,n=1&serie=lS3Q&v=ex&z=1
          const graphic = new GraphicView()
          const [l1, l2] = graphic.addParallelLine()
          const [A] = graphic.addPoint()
          const l3 = graphic.addParallelLine(A, l1)[1]
          const graph = graphic.getMathalea2DExport(
            l1, l2, A, l3
          )
          exercice.texte = graph
          break
        }
        case 23: {
          // Des rotations de rectangles
          // http://localhost:8080/mathalea.html?ex=betaThales,s=23,n=1&serie=hZya&v=ex&z=1
          const graphic = new GraphicView()

          // Trois points formant un triangle rectangle pour obtenir un rectangle
          const [A, B, D] = graphic.addRectPoint()

          // Nombre aléatoire de rectangles
          const nbRectangles = math.pickRandom([2, 3, 4, 5, 6, 8])

          // Nommage aléatoires des sommets
          const names = aleaName(4)

          // Construction des rectangles
          let ABCD
          const rectangles = []
          for (let i = 0; i < nbRectangles; i++) {
            const sommets = graphic.addRotate(A, 2 * Math.PI / nbRectangles * i, ...graphic.addParallelogram(D, A, B))
            if (i === 0) {
              ABCD = sommets.map((x, i) => {
                x.name = names[i]
                x.showLabel()
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
          const graph = graphic.getMathalea2DExport(...rectangles)

          const n = new Grandeur('n', nbRectangles, 0)
          const AnglePlein = new Grandeur('', 360, 0, 'deg')
          const angle = AnglePlein.divide(n)
          angle.name = aleaName(['\\alpha', '\\beta', '\\gamma', '\\delta'], 1)
          // L'exercice
          // Chaque rectangle et son suivant sont obtenus par une rotation de même centre et de même angle.
          exercice.texte = `${graph.split('\n').filter(x => x !== '').filter(x => x !== '').join('\n')}

Compléter l'algorithme ci-dessous pour obtenir la figure.

$\\textbf{Début de l'algorithme}$

$\\small\\color{gray} 01 \\hspace{0.1cm} $ $\\color{blue}\\text{monrectangle}$ = Rectangle ${ABCD.join('')}

$\\small\\color{gray} 02 \\hspace{0.1cm}$ variable $\\color{blue}${angle.name}$ = $\\color{red}\\fbox{ ? }\\degree$

$\\small\\color{gray} 03 \\hspace{0.1cm}$ variable $\\color{blue}n$ = 0

$\\small\\color{gray} 04 \\hspace{0.1cm}$ Répéter $\\color{red}\\fbox{ ? }$ fois :

$\\small\\color{gray} 05 \\hspace{0.5cm}$ Tracer l'image de $\\color{blue}\\text{monrectangle}$ par une rotation de centre $\\color{red}\\fbox{ ? }$ et d'angle $\\color{blue}${angle.name}$

$\\small\\color{gray} 06 \\hspace{0.5cm}$ $\\color{blue}n$ = $\\color{blue}n$ + 1

$\\small\\color{gray} 07 \\hspace{0.5cm}$ $\\color{blue}${angle.name}$ = $\\color{blue}n$ * $\\color{blue}${angle.name}$

$\\small\\color{gray} 08 \\hspace{0.1cm}$ Fin de la boucle Répéter

$\\textbf{Fin de l'algorithme}$`.replaceAll('\n\n', context.isHtml ? '<br>' : '\n\n')
          exercice.texteCorr = `Il y a $${n.toFixed}$ rectangles il faut donc répéter au moins $\\color{red}\\fbox{${n.toFixed}}$ fois la boucle.

$${angle.name} = \\dfrac{360\\degree}{${n.toFixed}} = ${angle.toFixed}\\degree$

La rotation est donc de centre $\\color{red}\\fbox{${ABCD[1]}}$ et d'angle $\\color{red}\\fbox{$${angle.name}=${angle.value}$\\degree}$.`.replaceAll('\n\n', '<br>')
          break
        }
        case 24: {
          // http://localhost:8080/mathalea.html?ex=betaThales,s=24,n=1&serie=hZya&v=ex&z=1
          const graphic = new GraphicView()
          const [A, B] = graphic.addPoint(2)
          const polygons = []
          const n = (Math.random() * 3 + 3).toFixed()
          const O = graphic.addRegularPolygonCenter(A, B, n)
          for (let i = 0; i < 10; i++) {
            const sommets = graphic.addHomothetic(O, 1 / (i + 1), ...graphic.addRegularPolygon(A, B, n))
            polygons.push(sommets, graphic.addSidesPolygon(...sommets))
          }
          const graph = graphic.getMathalea2DExport(
            O
            , ...polygons
          )
          exercice.texte = graph
          break
        }
        case 25: {
          // http://localhost:8080/mathalea.html?ex=betaThales,s=25,n=1&serie=hZya&v=ex&z=1
          const graphic = new GraphicView()
          const [G, H] = graphic.addPoint(2)
          const I = graphic.addRegularPolygon(G, H, 3)[2]
          const triangle3 = graphic.addSidesPolygon(G, H, I)
          const [A, B, C] = graphic.addNotAlignedPoint()
          const triangle1 = graphic.addSidesPolygon(A, B, C)
          const [D, E, F] = graphic.addNotAlignedPoint()
          const triangle2 = graphic.addSidesPolygon(D, E, F)
          const graph = graphic.getMathalea2DExport(
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
          // http://localhost:8080/mathalea.html?ex=betaThales,s=26,n=1&serie=hZya&v=ex&z=1
          const graphic = new GraphicView()
          const triangle1 = graphic.addNotAlignedPoint()
          const M = graphic.addPointOutPolygon(...triangle1)
          const triangle2 = graphic.addSymetric(M, ...triangle1)
          M.showDot()
          const graph = graphic.getMathalea2DExport(
            triangle1, graphic.addSidesPolygon(...triangle1)
            , M
            , triangle2, graphic.addSidesPolygon(...triangle2)
          )
          exercice.texte = graph
          break
        }
        case 27: {
          // Deux triangles symétriques par rapport à un point situé à l'intérieur d'un des deux triangles
          // http://localhost:8080/mathalea.html?ex=betaThales,s=27,n=1&serie=hZya&v=ex&z=1
          const graphic = new GraphicView()
          const [A, B, C] = graphic.addNotAlignedPoint()
          const triangle1 = graphic.addSidesPolygon(A, B, C)
          const M = graphic.addPointInPolygon(A, B, C)
          M.name = 'M'
          const triangle2 = graphic.addSidesPolygon(...graphic.addSymetric(M, A, B, C))
          const graph = graphic.getMathalea2DExport(
            triangle1
            , M, A, B, C
            , triangle2
          )
          exercice.texte = graph
          break
        }
        case 28: {
          // Deux triangles symétriques par rapport à un point situé sur l'un des côtés
          // http://localhost:8080/mathalea.html?ex=betaThales,s=28,n=1&serie=hZya&v=ex&z=1
          const graphic = new GraphicView()
          const [A, B, C] = graphic.addNotAlignedPoint()
          const triangle1 = graphic.addSidesPolygon(A, B, C)
          const M = graphic.addPointOnPolygon(A, B, C)
          M.name = 'M'
          const triangle2 = graphic.addSidesPolygon(...graphic.addSymetric(M, A, B, C))
          const graph = graphic.getMathalea2DExport(
            triangle1
            , M, A, B, C
            , triangle2
          )
          exercice.texte = graph
          break
        }
        case 29: {
          // http://localhost:8080/mathalea.html?ex=betaThales,s=29,n=1&serie=hZya&v=ex&z=1
          const graphic = new GraphicView()
          const [A, B] = graphic.addPoint(2)
          const C = graphic.addPointDistance(A, graphic.distance(A, B)) // AB=AC
          const triangle1 = graphic.addSidesPolygon(A, B, C)
          for (const P of [A, B, C]) {
            P.showLabel()
            P.showDot()
          }
          const graph = graphic.getMathalea2DExport(
            A, B, C
            , triangle1
          )
          exercice.texte = graph
          break
        }
        case 30: {
          // http://localhost:8080/mathalea.html?ex=betaThales,s=30,n=1&serie=hZya&v=ex&z=1
          const graphic = new GraphicView()
          const [A, B] = graphic.addPoint(2)
          A.showDot()
          B.showDot()
          const C = graphic.addPointBetween(A, B)
          C.showDot()
          C.showLabel()

          const graph = graphic.getMathalea2DExport(
            A, B, C
          )
          exercice.texte = graph
          break
        }
        case 31: {
          // http://localhost:8080/mathalea.html?ex=betaThales,s=31,s2=3,n=1,cd=1&serie=qFnt&v=ex&z=1
          // PB M : http://localhost:8080/mathalea.html?ex=betaThales,s=31,s2=3,s3=1,n=1,cd=1&serie=Ld9D&v=ex&z=1
          // On créé un objet configuration de Thalès
          const graphic = new AleaThalesConfig([true, false, undefined][this.sup2 - 1])

          // On conserve le signe de k pour les longueurs algébriques
          const signk = graphic.classicConfig ? 1 : -1

          // On décide d'une unité
          const unite1 = 'cm'
          // Unité différente pour travailler les conversions
          const unite2 = 'mm'

          // On récupère les 5 points en configuration de Thalès
          const [O, A, B, M, N] = graphic.geometric

          // On nomme les droites à partir des noms des points
          const dAB = graphic.addLine(A, B)
          dAB.aleaName(A, B) // L'ordre des lettres est aléatoirisé
          const dMN = graphic.addLine(M, N)
          dMN.aleaName(M, N) // L'ordre des lettres est aléatoirisé

          // On définit deux grandeurs en imposant un nombre de décimales
          // const OA = new Grandeur(O.name + A.name, parse(unit(graphic.distance(O, A), unite).toString()).args[0].value, 1, parse(unit(graphic.distance(O, A), unite).toString()).args[1].toString())
          const OA = new Grandeur(O.name + A.name, graphic.distance(O, A), 1, unite1)
          // On conservant signk le signe de k on a donc des longueurs algébriques
          const k = new Grandeur('k', signk * graphic.distance(O, M) / graphic.distance(O, A), 1)
          // const OB = new Grandeur(O.name + B.name, parse(unit(graphic.distance(O, B), unite).toString()).args[0].value, 1, parse(unit(graphic.distance(O, B), unite).toString()).args[1].toString())
          const OB = new Grandeur(O.name + B.name, graphic.distance(O, B), 1, unite1)

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
          // const AB = new Grandeur(A.name + B.name, parse(unit(graphic.distance(A, B), unite1).toString()).args[0].value, 1, parse(unit(graphic.distance(A, B), unite).toString()).args[1].toString())
          const AB = new Grandeur(A.name + B.name, graphic.distance(A, B), 1, unite1)
          const MN = AB.multiply(k)
          MN.aleaName(M, N)

          // À ce stade nous n'avons plus besoins des longueurs algébriques
          for (const x of [OB, OM, ON, MN, AM, BN]) {
            x.toFixed = Math.abs(x.toFixed) // Les longueurs sont maintenant positives
            x.name = x.name + '' // Pour que nameAndValue soit actualisé
          }

          // On aléatoirise l'ordre des données
          const aleaDonnees = []
          aleaDonnees[0] = aleaName(
            [`${OA.name} = ${OA.toFixed}${OA.unit}`,
            `${OB.name} = ${OB.toFixed}${OB.unit}`,
            `${OM.name} = ${OM.abs().toFixed}${OM.unit}`,
            `${MN.name} = ${MN.abs().toFixed}${MN.unit}`
            ].map(x => `$ {${toTex2(x)}}$`)
          ).join(', ')
          aleaDonnees[1] = aleaName(
            [`${OA.name} = ${OA.toFixed}${OA.unit}`,
            `${OB.name} = ${OB.toFixed}${OB.unit}`,
            `${OM.name} = ${OM.abs().toFixed}${OM.unit}`,
            `${MN.name} = ${MN.abs().toFixed}${MN.unit}`
            ].map(x => `$ {${toTex2(x)}}$`)
          ).join(', ')
          aleaDonnees[2] = aleaName(
            [`${OA.name} = ${OA.toFixed}${OA.unit}`,
            `${AB.name} = ${AB.toFixed}${AB.unit}`,
            `${MN.name} = ${MN.toFixed}${MN.unit}`
            ].map(x => `$ {${toTex2(x)}}$`)
          ).join(', ')
          // On créé l'export.
          // Attention à l'ordre d'affichage et notamment des labels (en premier)
          const graph = graphic.getMathalea2DExport(
            O, A, B, M, N,
            graphic.addSidesPolygon(O, A, B), // Les segments visibles sont les côtés des deux triangles OAB et OMN
            graphic.addSidesPolygon(O, M, N)
          )

          // Création des textes et des solutions
          const texteCorr = ['', '', '']
          const texteDonnees = ['', '', '']
          const consigne = ['', '', '']

          const texteIntro = `Les droites $(${dAB.name}$) et $(${dMN.name})$ sont parallèles.

Les droites $(${dAM.name}$) et $(${dBN.name})$ sont sécantes en $${O.name}$.`

          texteDonnees[0] = `On a : ${aleaDonnees[0]}.`
          texteDonnees[1] = `On a : ${aleaDonnees[1]}.`
          texteDonnees[2] = `On a : ${aleaDonnees[2]}.`

          consigne[0] = `Calculer $${ON.name}$ en ${ON.to(unite2).unit}.`
          consigne[1] = `Calculer $${AB.name}$ en ${AB.unit}.`
          consigne[2] = `Calculer $${AM.name}$ en ${AM.unit}.`

          const texteCorrIntro = `D'après le théorème de Thalès, on a :

$$${toTex2(`${OA.name} / ${OM.name} = ${OB.name} / ${ON.name} = ${AB.name} / ${MN.name}`)}$`
          // Calcul de ON
          texteCorr[0] = `$\\textbf{Calcul de ${ON.name}}$

On connait les longueurs $${OA.name}$, $${OB.name}$ et $${OM.name}$, d'où :

$$${toTex2(`${OA.toFixed}/${OM.toFixed}=${OB.toFixed}/${ON.name}`)}$

On en déduit ensuite l'égalité des produits en croix :

$$${toTex2(`${OA.toFixed} * ${ON.name}=${OB.toFixed} * ${OM.toFixed}`)}$

On résout enfin l'équation d'inconnue $${ON.name}$ :

$$${toTex2(`${ON.name}=${OB.toFixed} * ${OM.toFixed}/${OA.toFixed}=${ON.toFixed}${ON.unit}`)}$

Donc ${ON.to(unite2).nameAndValue}.`
          // Calcul de AB
          texteCorr[1] = `$\\textbf{Calcul de ${AB.name}}$

On connait les longueurs $${OA.name}$, $${OM.name}$ et $${MN.name}$, d'où :

$$${toTex2(`${AB.name}/${MN.toFixed}=${OA.toFixed}/${OM.toFixed}`)}$

On en déduit l'égalité des produits en croix :

$$${toTex2(`${AB.name} * ${OM.toFixed} = ${OA.toFixed} * ${MN.toFixed}`)}$

On résout l'équation d'inconnue $${AB.name}$ :

$$${toTex2(`${AB.name} = ${OA.toFixed} * ${MN.toFixed} / ${OM.toFixed} = ${AB.toFixed}${AB.unit}`)}$

Donc ${AB.nameAndValue}.`
          // Calcul de AM
          texteCorr[2] = `$\\textbf{Calcul de ${OM.name}}$

On connait les longueurs $${AB.name}$, $${MN.name}$ et $${OA.name}$, d'où :

$$${toTex2(`${AB.toFixed}/${MN.toFixed}=${OA.toFixed}/${OM.name}`)}$

On en déduit l'égalité des produits en croix :

$$${toTex2(`${AB.toFixed} * ${OM.name} = ${OA.toFixed} * ${MN.toFixed}`)}$

On résout l'équation d'inconnue $${OM.name}$ :

$$${toTex2(`${OM.name} = ${OA.toFixed} * ${MN.toFixed} / ${AB.toFixed} = ${OM.toFixed}${OM.unit}`)}$

$\\textbf{Calcul de ${AM.name}}$

$$${toTex2(k.abs().value < 1 ? `${AM.name} = ${OA.name} ${k.value > 0 ? '-' : '+'} ${OM.name}` : `${AM.name} = ${OM.name} ${k.value > 0 ? '-' : '+'} ${OA.name}`)}$

$$${toTex2(k.abs().value < 1 ? `${AM.name} = ${OA.toFixed} ${k.value > 0 ? '-' : '+'} ${OM.toFixed}` : `${AM.name} = ${OM.toFixed} ${k.value > 0 ? '-' : '+'} ${OA.toFixed}`)}$

Donc ${AM.nameAndValue}.`
          const phrasesCorr = `${texteIntro}

${texteCorrIntro}

${texteCorr[this.sup3 - 1]}`.split('\n\n')

          if (this.correctionDetaillee) {
            exercice.texteCorr = phrasesCorr.join('<br>').replaceAll('$$', '$\\hspace{1cm}')
          } else {
            exercice.texteCorr = phrasesCorr.filter((x, i) => [3, 4, 6, 8, 10, 11, 12, 14, 16, 18, 19].indexOf(i) !== -1).join('<br>').replaceAll('$$', '$\\hspace{1cm}')
          }
          exercice.texte = `${texteIntro}

${texteDonnees[this.sup3 - 1]}

${consigne[this.sup3 - 1]}`.replaceAll('\n\n', '<br>') + '<br>' + graph
          break
        }
        case 32: {
          // http://localhost:8080/mathalea.html?ex=betaThales,s=32,s2=3,s3=1,n=1,cd=1&serie=7wjj&v=ex&z=1
          // Ajouter des étiquettes aux extrémités d'un angle
          const graphic = new GraphicView()
          const [A, B, C] = graphic.addNotAlignedPoint()

          // Boucle ! http://localhost:8080/mathalea.html?ex=betaThales,s=32,s2=3,s3=1,n=1,cd=1&serie=lqd7&v=ex&z=1
          // const [D, E, F] = graphic.addPointAligned()

          // Afficher le label des points
          // A.showLabel()
          // C.showLabel()
          // B.showLabel(A, B, C).showDot()
          B.labelPoints = [A, B, C]
          B.label = true
          // Afficher les points sous forme de croix x
          A.showDot()
          // B.showDot()
          C.showDot()
          const graph = graphic.getMathalea2DExport(
            graphic.addSidesPolygon(A, B, C)
            , B, A, C // , D, E, F
          )
          exercice.texte = graph
          break
        }
        case 33: {
          // http://localhost:8080/mathalea.html?ex=betaThales,s=33,s2=3,s3=1,n=1,cd=1&serie=7wjj&v=ex&z=1
          // Exercices sur les rotations
          const graphic = new GraphicView()
          const [A, B, C] = graphic.addNotAlignedPoint()
          A.showDot()
          const graph = graphic.getMathalea2DExport(
            A, B, C,
            graphic.addSidesPolygon(A, B, C)
          )
          exercice.texte = graph
          break
        }
        case 34: {
          // Des rotations de rectangles
          // http://localhost:8080/mathalea.html?ex=betaThales,s=34,n=1&serie=hZya&v=ex&z=1
          const graphic = new GraphicView()

          // Trois points formant un triangle rectangle pour obtenir un rectangle
          const [A, B, D] = graphic.addRectPoint()

          // Nombre aléatoire de rectangles
          const nbRectangles = math.pickRandom([3, 4, 5, 6, 8, 10])

          // Nommage aléatoires des sommets
          const names = aleaName(8)

          // Construction des rectangles
          let ABCD, EFGH
          const aleaRectangle = math.pickRandom([2, 3, 5, 6, 7, 9, 10].filter(x => x < nbRectangles))
          const rectangles = []
          for (let i = 0; i < nbRectangles; i++) {
            const sommets = graphic.addRotate(A, 2 * Math.PI / nbRectangles * i, ...graphic.addParallelogram(D, A, B))
            if (i === 0) {
              ABCD = sommets.map((x, i) => {
                x.name = names[i]
                x.showLabel()
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
                if (i !== 1) x.showLabel()
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
          rectangles.filter((x, i) => (i === 1 || i === 2 * aleaRectangle + 1)).map((y, j) => y.map(z => { z.color = 'blue'; return z }))
          const cotesRectangles = rectangles.filter(x => x[0] instanceof Segment)
          const sommetsRectangles = rectangles.filter(x => x[0] instanceof Point)
          const graph = graphic.getMathalea2DExport(...sommetsRectangles, ...cotesRectangles, cotesRectangles[0], cotesRectangles[aleaRectangle])

          const n = new Grandeur('n', nbRectangles, 0)
          const AnglePlein = new Grandeur('', 360, 0, 'deg')
          const angle = AnglePlein.divide(n)
          const k = new Grandeur('', aleaRectangle, 0)
          const angleSolution = angle.multiply(k)
          angle.name = aleaName(['\\alpha', '\\beta', '\\gamma', '\\delta'], 1)
          // L'exercice
          const P = aleaName([0, 2, 3])
          // Chaque rectangle et son suivant sont obtenus par une rotation de même centre et de même angle.
          exercice.texte = `${graph.split('\n').filter(x => x !== '').filter(x => x !== '').join('\n')}

On a effectué successiveement $${n.toFixed}$ rotations d'un rectangle avec le même angle et le même centre.

On est revenu sur le rectangle de départ.

On considère la rotation qui transforme le rectangle $${circularPermutation(ABCD).join('')}$ en $${circularPermutation(EFGH).join('')}$ dans le sens direct (anti-horaire).

$\\textbf{1.}$ Déterminer l'image de $${ABCD[P[i]]}$ par cette rotation.

$\\textbf{2.}$ Déterminer l'angle de la rotation.`.replaceAll('\n\n', context.isHtml ? '<br>' : '\n\n')
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
          // http://localhost:8080/mathalea.html?ex=betaThales,s=35,n=1&serie=hZya&v=ex&z=1
          const graphic = new GraphicView()

          // Trois points formant un triangle rectangle isocèle pour obtenir un carré
          const [A, B] = graphic.addPoint(2)
          const [D] = graphic.addRotate(A, Math.PI / 2, B)

          // Nombre aléatoire de rectangles
          const nbRectangles = math.pickRandom([3, 5, 6])

          // Nommage aléatoires des sommets
          const names = aleaName(8)

          // Construction des rectangles
          let ABCD, EFGH
          const aleaRectangle = math.pickRandom([2, 3, 4, 5, 6, 7, 8, 9, 10].filter(x => x < nbRectangles))
          const rectangles = []
          for (let i = 0; i < nbRectangles; i++) {
            const sommets = graphic.addRotate(A, 2 * Math.PI / nbRectangles * i, ...graphic.addParallelogram(D, A, B))
            if (i === 0) {
              ABCD = circularPermutation(sommets.map((x, i) => {
                x.name = names[i]
                x.showLabel()
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
            if (i === aleaRectangle) {
              EFGH = circularPermutation(sommets.map((x, i) => {
                x.name = names[i + 4]
                if (i !== 1) x.showLabel()
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
          rectangles.filter((x, i) => (i === 1 || i === 2 * aleaRectangle + 1)).map((y, j) => y.map(z => { z.color = 'blue'; return z }))
          const cotesRectangles = rectangles.filter(x => x[0] instanceof Segment)
          const sommetsRectangles = rectangles.filter(x => x[0] instanceof Point)
          const graph = graphic.getMathalea2DExport(...sommetsRectangles, ...cotesRectangles, cotesRectangles[0], cotesRectangles[aleaRectangle])

          const n = new Grandeur('n', nbRectangles, 0)
          const AnglePlein = new Grandeur('', 360, 0, 'deg')
          const angle = AnglePlein.divide(n)
          const k = new Grandeur('', aleaRectangle, 0)
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
          exercice.texte = `${graph.split('\n').filter(x => x !== '').filter(x => x !== '').join('\n')}

On a effectué successivement $${n.toFixed}$ rotations d'un carré avec le même angle et le même centre.

On est revenu sur le carré de départ.

$${ABCD.name}$ a pour image $${EFGH.name}$ par une rotation.

Déterminer l'angle de la rotation de centre $${ABCD[2]}$ qui permet de transformer $${ABCD[3]}$ en $${EFGH[1]}$ dans le sens direct (anti-horaire).`.replaceAll('\n\n', context.isHtml ? '<br>' : '\n\n')
          exercice.texteCorr = `Il y a $${n.value}$ carrés en tout.

$\\dfrac{360\\degree}{${n.toFixed}} = ${angle.toFixed}\\degree$

On doit tourner $${aleaRectangle}$ fois d'un angle de $${angle.toFixed}\\degree$ dans le sens direct (anti-horaire) pour passer de $${ABCD.name}$ à $${EFGH.name}$.

L'image de $${ABCD[3]}$ par cette rotation est $${EFGH[3]}$.

On doit ensuite effectuer une rotation de centre $${ABCD[2]}$ d'un angle de $90\\degree$ pour passer du point $${EFGH[3]}$ au point $${EFGH[1]}$.

$${aleaRectangle}\\times${angle.toFixed}\\degree+90\\degree=${angleSolution.toFixed + 90}\\degree$

Donc c'est la rotation de centre $${ABCD[2]}$ et d'angle $${angleSolution.toFixed + 90}\\degree$.

Remarque : ${remarque}`.replaceAll('\n\n', '<br>')
          break
        }
      }
      // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
      if (this.questionJamaisPosee(i, i)) {
        this.listeQuestions.push(exercice.texte)
        this.listeCorrections.push(exercice.texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
