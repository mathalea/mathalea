import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, texNum } from '../../modules/outils.js'
import { polygone, labelPoint, homothetie, point, rotation, mathalea2d, droite } from '../../modules/2d.js'
import { create, all } from 'mathjs'
import { aleaVariables, toTex, resoudre, aleaExpression, aleaName } from '../../modules/outilsMathjs.js'
import { GraphicView } from './aleaFigure/GraphicView.js'

// eslint-disable-next-line no-debugger
debugger

const nbCase = 15

export const math = create(all)

export const titre = 'aleaFigure'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '03/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '08/01/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Create a configuration of Thales in a given graphic view
 * @returns
 */
function aleaThalesConfiguration () {
  // http://localhost:8080/mathalea.html?ex=betaThales,s=6
  const graphic = new GraphicView(0, 0, 6, 5)
  const [O, A, B] = graphic.addNotAlignedPoint().elements // Trois points non alignés
  // On ajoute les droites (OB) et (AB)
  const droiteOB = graphic.addLine(O, B)
  const droiteAB = graphic.addLine(A, B)
  // M est un point de (OA)
  const M = graphic.addPointAligned(O, A)
  // On crée une parallèle à (AB)
  const droiteMN = graphic.addParallelLine(droiteAB, M)
  // On ajoute le point d'intersection de (OA) et (MN)
  const N = graphic.addIntersectLine(droiteMN, droiteOB)
  graphic.show(
    O, A, B, M, N, // Les points visibles
    graphic.addSidesPolygon(O, A, B), // Les segments visibles sont les côtés des deux triangles OAB et OMN
    graphic.addSidesPolygon(O, M, N)
  )
  O.name = 'O'
  A.name = 'A'
  B.name = 'B'
  M.name = 'M'
  N.name = 'N'
  return { texte: graphic.getMathalea2DExport(), texteCorr: '' }
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
  this.consigne = ''
  this.nbCols = 0
  this.nbColsCorr = 0
  this.tailleDiaporama = 1
  this.video = ''
  this.correctionDetailleeDisponible = false
  this.correctionDetaillee = true
  context.isHtml ? (this.spacing = 2.5) : (this.spacing = 0)
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 0)
  this.sup = 'all'
  this.nouvelleVersion = function (numeroExercice, dDebug = false) {
    if (this.sup === 'all') this.nbQuestions = formulaire.length - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // À placer même si l'exercice n'a pas vocation à être corrigé
    let nquestion = 0
    for (let i = 0, exercice, cpt = 0; i < this.nbQuestions && cpt < 100;) { // Boucle principale où i+1 correspond au numéro de la question
      if (this.sup === 'all') {
        nquestion += 1
      // } else if (this.sup === 9) {
      //  nquestion = choice([1, 2, 3, 4, 5, 6, 7, 8])
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
          // http://localhost:8080/mathalea.html?ex=betaThales,s=6
          exercice = aleaThalesConfiguration()
          break
        }
        case 7: {
          // Dépasser la limite du nombre de points
          // Remarque : l'algorithme est lourd lorsqu'on dépasse 20 points
          // http://localhost:8080/mathalea.html?ex=betaThales,s=7
          const graphic = new GraphicView()
          graphic.dimensions = { xmin: 0, ymin: 0, xmax: 10, ymax: 7 }
          graphic.show(...graphic.addPoint(20).elements)
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
          const graphic = new GraphicView(0, 0, 10, 7)
          const parallels = graphic.addParallelLine()
          graphic.show(parallels)
          exercice = { texte: graphic.getMathalea2DExport(), texteCorr: '' }
          break
        }
        case 10: {
          // Une sécante à deux droites
          // http://localhost:8080/mathalea.html?ex=betaThales,s=10
          const graphic = new GraphicView(0, 0, 10, 7)
          const [A, B, C] = graphic.addNotAlignedPoint().elements
          const D = graphic.addNotAlignedPoint(A, B).elements[2]
          const dAB = graphic.addLine(A, B)
          const dAC = graphic.addLine(A, C)
          const dBD = graphic.addLine(B, D)
          A.name = 'A'
          B.name = 'B'
          C.name = 'C'
          D.name = 'D'
          graphic.show(A, B, C, D, dAB, dAC, dBD)
          exercice = { texte: graphic.getMathalea2DExport(), texteCorr: '' }
          break
        }
        case 11: {
          // Droite verticale visible !
          // http://localhost:8080/mathalea.html?ex=betaThales,s=11
          const graphic = new GraphicView(-5, -5, 5, 5)
          const [A, B, C] = graphic.addPoint(3).elements
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
          const d = graphic.addLine()
          graphic.show(d, graphic.geometric[0], graphic.geometric[1])
          const graph = graphic.getMathalea2DExport()
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
          // Parallelogramme
          // http://localhost:8080/mathalea.html?ex=betaThales,s=14,n=1&serie=1Ziy&z=1
          const graphic = new GraphicView(-5, -5, 5, 5)
          const [A, B, C, D] = graphic.addParallelogram().elements
          A.name = 'A'
          B.name = 'B'
          C.name = 'C'
          D.name = 'D'
          const [E, F] = graphic.addParallelogram(A, B).elements.slice(2)
          E.name = 'E'
          F.name = 'F'
          const [G] = graphic.addParallelogram(F, A, D).elements.slice(3)
          G.name = 'G'
          graphic.show(A, B, C, D, E, F, graphic.addSidesPolygon(A, B, C, D), graphic.addSidesPolygon(A, B, E, F), graphic.addSidesPolygon(F, A, D, G))
          const graph = graphic.getMathalea2DExport()
          exercice = { texte: graph, texteCorr: '' }
          break
        }
        case 15 : {
          // Homothetie
          // http://localhost:8080/mathalea.html?ex=betaThales,s=15,n=1&serie=1Ziy&z=1
          const graphic = new GraphicView(-5, -5, 5, 5)
          const [A, B, C, D] = graphic.addParallelogram().elements
          A.name = 'A'
          B.name = 'B'
          C.name = 'C'
          D.name = 'D'
          const O = graphic.addPoint()
          O.name = 'O'
          const [E, F, G, H] = graphic.addHomothetic(O, -0.5, A, B, C, D).elements
          graphic.show(A, B, C, D, E, F, G, H, O, graphic.addSidesPolygon(A, B, C, D), graphic.addSidesPolygon(E, F, G, H))
          const graph = graphic.getMathalea2DExport()
          exercice = { texte: graph, texteCorr: '' }
          break
        }
      }
      // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
      if (this.questionJamaisPosee(i, exercice.texte)) {
        this.listeQuestions.push(exercice.texte)
        this.listeCorrections.push(exercice.texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
