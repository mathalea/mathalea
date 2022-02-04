import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, choice, texNum } from '../../modules/outils.js'
import { polygone, labelPoint, texteSurArc, homothetie, point, rotation, mathalea2d, fixeBordures, droite, translation, vecteur, arcPointPointAngle } from '../../modules/2d.js'
import { pickRandom, create, all } from 'mathjs'
import { aleaVariables, toTex, resoudre, aleaExpression, aleaName } from '../../modules/outilsMathjs.js'

export const math = create(all)
// console.log(math.parse('2'))
export const titre = 'Angles et parallèles'
// eslint-disable-next-line no-debugger
debugger

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '15/01/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '08/01/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

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

function anglesSecantes (A, rot = { O: 60, A: 0 }) {
  const s = rotation(translation(A, vecteur(1, 0)), A, rot.A)
  const S = rotation(translation(A, vecteur(3, 0)), A, rot.A)
  const t = rotation(s, A, 180)
  const T = rotation(S, A, 180)
  const x = rotation(translation(A, vecteur(1, 0)), A, rot.O)
  const X = rotation(translation(A, vecteur(3, 0)), A, rot.O)
  const Ox = rotation(x, A, 180)
  const OX = rotation(X, A, 180)
  return {
    a: arcPointPointAngle(s, x, rot.O - rot.A, true, 'blue'),
    b: arcPointPointAngle(x, t, 180 - (rot.O - rot.A), true, 'green'),
    c: arcPointPointAngle(t, Ox, rot.O - rot.A, true, 'red'),
    d: arcPointPointAngle(Ox, s, 180 - (rot.O - rot.A), true, 'gray'),
    s: s,
    S: S,
    t: t,
    T: T,
    x: x,
    X: X,
    Ox: Ox,
    OX: OX,
    As: droite(A, s),
    Ax: droite(A, x),
    A: A,
    labela: texteSurArc((rot.O - rot.A) % 180 + '°', s, x, rot.O - rot.A, 'black'),
    labelb: texteSurArc((180 - (rot.O - rot.A)) % 180 + '°', x, t, 180 - (rot.O - rot.A), 'black'),
    labelc: texteSurArc((rot.O - rot.A) % 180 + '°', t, Ox, rot.O - rot.A, 'black'),
    labeld: texteSurArc((180 - (rot.O - rot.A)) % 180 + '°', Ox, s, 180 - (rot.O - rot.A), 'black')
  }
}
/**
 * Description didactique de l'exercice
 * @author Frédéric PIOU
 * Référence
*/
export default function exercicesAnglesAIC () {
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
    'Type de question', 8, formulaire.join('\n')
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
  this.sup = 'all' // Type d'exercice
  this.nouvelleVersion = function (numeroExercice, dDebug = false) {
    if (this.sup === 'all') this.nbQuestions = formulaire.length - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // À placer même si l'exercice n'a pas vocation à être corrigé
    let nquestion = 0
    for (let i = 0, exercice, cpt = 0; i < this.nbQuestions && cpt < 100;) { // Boucle principale où i+1 correspond au numéro de la question
      if (this.sup === 'all') {
        nquestion += 1
      } else if (this.sup === 8) {
        nquestion = choice([1, 2, 3, 4, 5, 6, 7])
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
          const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
          const objetsCorrection = [] // Idem pour la correction
          const param = aleaVariables(
            {
              O: 'randomInt(0,90)',
              A: 'randomInt(-90,90)',
              B: 'A',
              r1: 'pickRandom([1.5,2])',
              r2: 'pickRandom([1.5,2])',
              test: '70>O-A>30 and 70>O-B>30 and abs(A-B)<45'
            }
          )
          const ab = aleaVariables(
            {
              a: 'randomInt(0,3)',
              b: 'randomInt(0,3)',
              test: 'a!=b and (a!=2 or b!=0) and (a!=3 or b!=1)'
            }
          )
          if (dDebug) console.log(param)
          const O = point(0, 0)
          const anglesA = anglesSecantes(homothetie(rotation(point(1, 0), O, param.O), O, param.r1), { O: param.O, A: param.A })
          const anglesB = anglesSecantes(homothetie(rotation(point(1, 0), O, param.O + 180), O, param.r2), { O: param.O, A: param.B })
          const nomsPoints = aleaName(['A', 'B', 'C', 'D', 'E', 'F'], 2)
          anglesA.A.nom = nomsPoints[0]
          anglesB.A.nom = nomsPoints[1]
          const nomsDirections = aleaName(['s', 't', 'u', 'v', 'x', 'y'], 6)
          anglesA.S.nom = nomsDirections[0]
          anglesA.T.nom = nomsDirections[1]
          anglesA.X.nom = nomsDirections[2]
          anglesA.OX.nom = anglesB.A.nom
          anglesB.S.nom = nomsDirections[3]
          anglesB.T.nom = nomsDirections[4]
          anglesB.OX.nom = nomsDirections[5]
          anglesB.X.nom = anglesA.A.nom
          const nameAngles = ['S A X'.split(' '), 'X A T'.split(' '), 'T A OX'.split(' '), 'OX A S'.split(' ')]
          nameAngles.forEach(function (n, i) {
            anglesA[['a', 'b', 'c', 'd'][i]].nom = ''
            anglesB[['a', 'b', 'c', 'd'][i]].nom = ''
            for (let j = 0; j < 3; j++) {
              anglesA[['a', 'b', 'c', 'd'][i]].nom += anglesA[n[j]].nom
              anglesB[['a', 'b', 'c', 'd'][i]].nom += anglesB[n[j]].nom
            }
          })
          if (Math.abs(param.A) > 70) {
            anglesA.S.positionLabel = 'left'
            anglesA.T.positionLabel = 'left'
          }
          if (Math.abs(param.B) > 70) {
            anglesB.S.positionLabel = 'left'
            anglesB.T.positionLabel = 'left'
          }
          if (Math.abs(param.O) > 70) {
            anglesA.X.positionLabel = 'left'
            anglesB.OX.positionLabel = 'left'
          }
          for (const i of ['a', 'b', 'c', 'd']) {
            anglesA[i].couleurDeRemplissage = 'red'
            anglesB[i].couleurDeRemplissage = 'red'
          }
          const a = ['a', 'b', 'c', 'd'][parseInt(ab.a)]
          const b = ['a', 'b', 'c', 'd'][parseInt(ab.b)]
          const epsilon = choice([pickRandom([-2, -1, 1, 2]), 0])
          anglesA.labela = texteSurArc(((param.O - param.A) % 180 + epsilon) + '°', anglesA.s, anglesA.x, param.O - param.A, 'black')
          anglesA.labelb = texteSurArc((180 - (param.O - param.A) + epsilon) % 180 + '°', anglesA.x, anglesA.t, 180 - (param.O - param.A), 'black')
          anglesA.labelc = texteSurArc((param.O - param.A + epsilon) % 180 + '°', anglesA.t, anglesA.Ox, param.O - param.A, 'black')
          anglesA.labeld = texteSurArc((180 - (param.O - param.A) + epsilon) % 180 + '°', anglesA.Ox, anglesA.s, 180 - (param.O - param.A), 'black')
          anglesB.labela = texteSurArc(((param.O - param.A) % 180) + '°', anglesB.s, anglesB.x, param.O - param.A, 'black')
          anglesB.labelb = texteSurArc((180 - (param.O - param.A)) % 180 + '°', anglesB.x, anglesB.t, 180 - (param.O - param.A), 'black')
          anglesB.labelc = texteSurArc((param.O - param.A) % 180 + '°', anglesB.t, anglesB.Ox, param.O - param.A, 'black')
          anglesB.labeld = texteSurArc((180 - (param.O - param.A)) % 180 + '°', anglesB.Ox, anglesB.s, 180 - (param.O - param.A), 'black')
          objetsEnonce.push(
            anglesA[a],
            anglesA.As,
            anglesA.Ax,
            anglesB[b],
            anglesB.As,
            anglesB.Ax,
            anglesA['label' + a],
            anglesB['label' + b],
            labelPoint(anglesA.S),
            labelPoint(anglesA.T),
            labelPoint(anglesA.X),
            labelPoint(anglesB.S),
            labelPoint(anglesB.T),
            labelPoint(anglesB.OX),
            labelPoint(anglesA.A),
            labelPoint(anglesB.A)
          )
          objetsEnonce.forEach(objet => {
            objetsCorrection.push(objet)
          })
          let angles, calculs
          switch (a + b) {
            case 'ab':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'correspondants'
              calculs = `$180°-${anglesB.labelb.texte} = ${anglesB.labela.texte}$`
              break
            case 'ac':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'correspondants'
              break
            case 'ad':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'correspondants'
              calculs = `$180°-${anglesB.labeld.texte} = ${anglesB.labela.texte}$`
              break
            case 'ba':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'correspondants'
              calculs = `$180°-${anglesB.labela.texte} = ${anglesB.labelb.texte}$`
              break
            case 'bc':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'correspondants'
              calculs = `$180°-${anglesB.labelc.texte} = ${anglesB.labelb.texte}$`
              break
            case 'bd':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'correspondants'
              break
            case 'cb':
              anglesB.a.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'alternes-internes'
              calculs = `$180°-${anglesB.labelb.texte} = ${anglesB.labela.texte}$`
              break
            case 'cd':
              anglesB.a.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'alternes-internes'
              calculs = `$180°-${anglesB.labeld.texte} = ${anglesB.labela.texte}$`
              break
            case 'da':
              anglesB.b.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'alternes-internes'
              calculs = `$180°-${anglesB.labela.texte} = ${anglesB.labelb.texte}$`
              break
            case 'dc':
              anglesB.b.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'alternes-internes'
              calculs = `$180°-${anglesB.labelc.texte} = ${anglesB.labelb.texte}$`
              break
          }
          const paramsEnonce = fixeBordures([
            ...Object.keys(anglesA).map(key => { return anglesA[key] }),
            ...Object.keys(anglesB).map(key => { return anglesB[key] })
          ])
          let texte = 'Les droites sont-elles parallèles ?<br>'
          let sont
          if (epsilon !== 0) {
            sont = 'ne sont pas'
          } else {
            sont = 'sont'
          }
          const nomAngleSolution = angles !== 'alternes-internes' ? anglesB[a].nom : a === 'c' ? anglesB.a.nom : anglesB.b.nom
          const texteCorr = mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsCorrection) + String.raw`
          <br>
          ${calculs !== undefined ? calculs : String.raw`Les angles $\widehat{${anglesB[a].nom}}$ et $\widehat{${anglesB[b].nom}}$ sont opposés par le sommet. Ils sont donc de même mesure.`}
          <br>
          Les angles $\widehat{${anglesA[a].nom}}$ et $\widehat{${nomAngleSolution}}$ sont ${angles} et ${sont} de la même mesure.
          <br>
          Donc les droites ${sont} parallèles.
          `
          texte += mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsEnonce)
          exercice = { texte: texte, texteCorr: texteCorr }
          break
        }
        case 7: {
          const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
          const objetsCorrection = [] // Idem pour la correction
          const param = aleaVariables(
            {
              O: 'randomInt(0,90)',
              A: 'randomInt(-90,90)',
              B: 'A',
              r1: 'pickRandom([1.5,2])',
              r2: 'pickRandom([1.5,2])',
              test: '70>O-A>30 and 70>O-B>30 and abs(A-B)<45'
            }
          )
          const ab = aleaVariables(
            {
              a: 'randomInt(0,3)',
              b: 'randomInt(0,3)',
              test: 'a!=b and (a!=2 or b!=0) and (a!=3 or b!=1)'
            }
          )
          if (dDebug) console.log(param)
          const O = point(0, 0)
          const anglesA = anglesSecantes(homothetie(rotation(point(1, 0), O, param.O), O, param.r1), { O: param.O, A: param.A })
          const anglesB = anglesSecantes(homothetie(rotation(point(1, 0), O, param.O + 180), O, param.r2), { O: param.O, A: param.B })
          const nomsPoints = aleaName(['A', 'B', 'C', 'D', 'E', 'F'], 2)
          anglesA.A.nom = nomsPoints[0]
          anglesB.A.nom = nomsPoints[1]
          const nomsDirections = aleaName(['s', 't', 'u', 'v', 'x', 'y'], 6)
          anglesA.S.nom = nomsDirections[0]
          anglesA.T.nom = nomsDirections[1]
          anglesA.X.nom = nomsDirections[2]
          anglesA.OX.nom = anglesB.A.nom
          anglesB.S.nom = nomsDirections[3]
          anglesB.T.nom = nomsDirections[4]
          anglesB.OX.nom = nomsDirections[5]
          anglesB.X.nom = anglesA.A.nom
          const nameAngles = ['S A X'.split(' '), 'X A T'.split(' '), 'T A OX'.split(' '), 'OX A S'.split(' ')]
          nameAngles.forEach(function (n, i) {
            anglesA[['a', 'b', 'c', 'd'][i]].nom = ''
            anglesB[['a', 'b', 'c', 'd'][i]].nom = ''
            for (let j = 0; j < 3; j++) {
              anglesA[['a', 'b', 'c', 'd'][i]].nom += anglesA[n[j]].nom
              anglesB[['a', 'b', 'c', 'd'][i]].nom += anglesB[n[j]].nom
            }
          })
          if (Math.abs(param.A) > 70) {
            anglesA.S.positionLabel = 'left'
            anglesA.T.positionLabel = 'left'
          }
          if (Math.abs(param.B) > 70) {
            anglesB.S.positionLabel = 'left'
            anglesB.T.positionLabel = 'left'
          }
          if (Math.abs(param.O) > 70) {
            anglesA.X.positionLabel = 'left'
            anglesB.OX.positionLabel = 'left'
          }
          for (const i of ['a', 'b', 'c', 'd']) {
            anglesA[i].couleurDeRemplissage = 'blue'
            anglesB[i].couleurDeRemplissage = 'blue'
          }
          const a = ['a', 'b', 'c', 'd'][parseInt(ab.a)]
          const b = ['a', 'b', 'c', 'd'][parseInt(ab.b)]
          const epsilon = 0
          anglesA.labela = texteSurArc(((param.O - param.A) % 180 + epsilon) + '°', anglesA.s, anglesA.x, param.O - param.A, 'black')
          anglesA.labelb = texteSurArc((180 - (param.O - param.A) + epsilon) % 180 + '°', anglesA.x, anglesA.t, 180 - (param.O - param.A), 'black')
          anglesA.labelc = texteSurArc((param.O - param.A + epsilon) % 180 + '°', anglesA.t, anglesA.Ox, param.O - param.A, 'black')
          anglesA.labeld = texteSurArc((180 - (param.O - param.A) + epsilon) % 180 + '°', anglesA.Ox, anglesA.s, 180 - (param.O - param.A), 'black')
          anglesB.labela = texteSurArc(((param.O - param.A) % 180) + '°', anglesB.s, anglesB.x, param.O - param.A, 'black')
          anglesB.labelb = texteSurArc((180 - (param.O - param.A)) % 180 + '°', anglesB.x, anglesB.t, 180 - (param.O - param.A), 'black')
          anglesB.labelc = texteSurArc((param.O - param.A) % 180 + '°', anglesB.t, anglesB.Ox, param.O - param.A, 'black')
          anglesB.labeld = texteSurArc((180 - (param.O - param.A)) % 180 + '°', anglesB.Ox, anglesB.s, 180 - (param.O - param.A), 'black')
          objetsEnonce.push(
            anglesA[a],
            anglesA.As,
            anglesA.Ax,
            anglesB.As,
            anglesB.Ax,
            anglesA['label' + a],
            labelPoint(anglesA.S),
            labelPoint(anglesA.T),
            labelPoint(anglesA.X),
            labelPoint(anglesB.S),
            labelPoint(anglesB.T),
            labelPoint(anglesB.OX),
            labelPoint(anglesA.A),
            labelPoint(anglesB.A)
            // anglesB['label' + b]
          )
          objetsEnonce.forEach(objet => {
            objetsCorrection.push(objet)
          })
          objetsCorrection.push(anglesB['label' + b])
          objetsCorrection.push(anglesB[b])
          let angles, calculs, mesure
          switch (a + b) {
            case 'ab':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'correspondants'
              calculs = `$180°- ${anglesB.labela.texte}=${anglesB.labelb.texte}$`
              mesure = anglesB.labelb.texte
              break
            case 'ac':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'correspondants'
              mesure = anglesB.labela.texte
              break
            case 'ad':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'correspondants'
              calculs = `$180°-${anglesB.labela.texte}=${anglesB.labeld.texte}$`
              mesure = anglesB.labeld.texte
              break
            case 'ba':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'correspondants'
              calculs = `$180°-${anglesB.labelb.texte}=${anglesB.labela.texte}$`
              mesure = anglesB.labela.texte
              break
            case 'bc':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'correspondants'
              calculs = `$180°- ${anglesB.labelb.texte}=${anglesB.labelc.texte}$`
              mesure = anglesB.labelc.texte
              break
            case 'bd':
              anglesB[a].couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'correspondants'
              mesure = anglesB.labelb.texte
              break
            case 'cb':
              anglesB.a.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'alternes-internes'
              calculs = `$180°- ${anglesB.labela.texte}=${anglesB.labelb.texte}$`
              mesure = anglesB.labelb.texte
              break
            case 'cd':
              anglesB.a.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'a'], anglesB.a)
              angles = 'alternes-internes'
              calculs = `$180°-${anglesB.labela.texte}=${anglesB.labeld.texte}$`
              mesure = anglesB.labeld.texte
              break
            case 'da':
              anglesB.b.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              angles = 'alternes-internes'
              calculs = `$180°- ${anglesB.labelb.texte}=${anglesB.labela.texte}$`
              mesure = anglesB.labela.texte
              break
            case 'dc':
              anglesB.b.couleurDeRemplissage = 'green'
              anglesA[a].couleurDeRemplissage = 'red'
              objetsCorrection.push(anglesB['label' + 'b'], anglesB.b)
              calculs = `$180°- ${anglesB.labelb.texte}=${anglesB.labelc.texte}$`
              angles = 'alternes-internes'
              mesure = anglesB.labelc.texte
              break
          }
          const paramsEnonce = fixeBordures([
            ...Object.keys(anglesA).map(key => { return anglesA[key] }),
            ...Object.keys(anglesB).map(key => { return anglesB[key] })
          ])
          let texte = String.raw`
          Donnée : Les droites sont parallèles.
          <br>
          En déduire la mesure de l'angle $\widehat{${anglesB[b].nom}}$.
          `
          const nomAngleSolution = angles !== 'alternes-internes' ? anglesB[a].nom : a === 'c' ? anglesB.a.nom : anglesB.b.nom
          const texteCorr = mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsCorrection) + String.raw`
          <br>
          Les angles $\widehat{${anglesA[a].nom}}$ et $\widehat{${nomAngleSolution}}$ sont ${angles} et formés par des droites parallèles.
          <br>
          Donc ils sont de même mesure.
          <br>
          ${calculs !== undefined ? calculs : String.raw`Les angles $\widehat{${anglesB[a].nom}}$ et $\widehat{${anglesB[b].nom}}$ et vert sont opposés par le sommet.<br> Ils sont donc de même mesure.`}
          <br>
          L'angle $\widehat{${anglesB[b].nom}}$ mesure donc ${mesure}.
          `
          texte += mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsEnonce)
          exercice = { texte: texte, texteCorr: texteCorr }
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
