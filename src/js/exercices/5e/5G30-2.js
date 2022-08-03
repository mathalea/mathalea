import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, choice, rangeMinMax, contraindreValeur, compteOccurences, combinaisonListes } from '../../modules/outils.js'
import { labelPoint, texteSurArc, homothetie, point, rotation, mathalea2d, fixeBordures, droite, translation, vecteur, arcPointPointAngle } from '../../modules/2d.js'
import { pickRandom } from 'mathjs'
import { aleaVariables } from '../../modules/outilsMathjs.js'
export const titre = 'Angles et parallèles'
// eslint-disable-next-line no-debugger
// debugger

function aleaName (names = [], n = names.length, result = []) {
  const r = Math.floor(Math.random() * names.length)
  result.push(names[r])
  names.splice(r, 1)
  if (result.length === n) {
    return result
  } else {
    return aleaName(names, n, result)
  }
}

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '15/01/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '08/01/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

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
    '2 : Déterminer si des droites sont parallèles (angles marqués)',
    '3 : Calculer la mesure d\'un angle.',
    '4 : Nommer un angle alterne-interne ou correspondant à un angle marqué',
    '5 : Nommer un angle alterne-interne ou correspondant à un angle nommé',
    '6 : Déterminer si des droites sont parallèles (utiliser les noms d\'angles)',
    '7 : Calculer la mesure d\'un angle. (utiliser le nom des angles) ?',
    '8 : Mélange des questions'
  ]
  this.nbQuestions = 7
  this.besoinFormulaireTexte = ['Choix des questions', 'Nombres séparés par des tirets\n' + formulaire.join('\n')]
  this.consigne = ''
  this.nbCols = 0
  this.nbColsCorr = 0
  this.tailleDiaporama = 1
  this.video = ''
  this.correctionDetailleeDisponible = false
  this.correctionDetaillee = true
  context.isHtml ? (this.spacing = 2.5) : (this.spacing = 0)
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 0)
  this.sup = 8
  this.nouvelleVersion = function (numeroExercice, dDebug = false) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // À placer même si l'exercice n'a pas vocation à être corrigé
    let QuestionsDisponibles = []
    if (!this.sup) { // Si aucune liste n'est saisie
      QuestionsDisponibles = rangeMinMax(1, 7)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        QuestionsDisponibles[0] = contraindreValeur(1, 8, this.sup, 8)
      } else {
        QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          QuestionsDisponibles[i] = contraindreValeur(1, 8, parseInt(QuestionsDisponibles[i]), 8) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(QuestionsDisponibles, 8) > 0) QuestionsDisponibles = rangeMinMax(1, 7) // Teste si l'utilisateur a choisi tout
    QuestionsDisponibles = combinaisonListes(QuestionsDisponibles, this.nbQuestions)
    console.log(QuestionsDisponibles)
    for (let i = 0, exercice, cpt = 0; i < this.nbQuestions && cpt < 100;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (QuestionsDisponibles[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1: {
          const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
          const objetsEnonceml = [] // Idem pour l'enoncé à main levée si besoin
          const objetsCorrection = [] // Idem pour la correction
          const param = aleaVariables(
            {
              O: 'randomInt(0,90)',
              A: 'randomInt(-90,90)',
              B: 'randomInt(-90,90)',
              r1: 'pickRandom([1.5,2])',
              r2: 'pickRandom([1.5,2])',
              test: 'O-A>30 and O-B>30'
            }
          )
          if (dDebug) console.log(param)
          const O = point(0, 0)
          const anglesA = anglesSecantes(homothetie(rotation(point(1, 0), O, param.O), O, param.r1), { O: param.O, A: param.A })
          const anglesB = anglesSecantes(homothetie(rotation(point(1, 0), O, param.O + 180), O, param.r2), { O: param.O, A: param.B })
          for (const i of ['a', 'b', 'c', 'd']) {
            anglesA[i].couleurDeRemplissage = 'red'
            anglesB[i].couleurDeRemplissage = 'red'
          }
          const ab = choice([
            choice(['aa', 'bb', 'cc', 'dd']),
            choice(['ca', 'db']),
            choice(['a', 'b', 'c', 'd']) + choice(['a', 'b', 'c', 'd'])
          ])
          const a = ab[0]
          const b = ab[1]
          objetsEnonce.push(
            anglesA[a],
            anglesA.As,
            anglesA.Ax,
            anglesB[b],
            anglesB.As,
            anglesB.Ax,
            anglesA['label' + a],
            anglesB['label' + b]
          )
          const paramsEnonce = fixeBordures([
            ...Object.keys(anglesA).map(key => { return anglesA[key] }),
            ...Object.keys(anglesB).map(key => { return anglesB[key] })
          ])
          // On copie tout le contenu de objetsEnonce et de objetsEnonceml dans objetsCorrection
          objetsEnonce.forEach(objet => {
            objetsCorrection.push(objet)
          })
          objetsEnonceml.forEach(objet => {
            objetsCorrection.push(objet)
          })
          // ici sont créés les texte, tex_corr, objets mathalea2d divers entrant dans le contenu de l'exercice
          let texte = 'Les angles marqués sont-ils alternes-internes, correspondants ou ni l\'un ni l\'autre ?<br>'
          let reponse
          if (a === b) {
            reponse = 'correspondants'
          } else if (a + b === 'ca' || a + b === 'db') {
            reponse = 'alternes-internes'
          } else {
            reponse = 'ni alternes-internes ni correspondants'
          }
          const texteCorr = `Les angles marqués sont ${reponse}.`
          texte += mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsEnonce)
          exercice = { texte: texte, texteCorr: texteCorr }
          break
        }
        case 2: {
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
          for (const i of ['a', 'b', 'c', 'd']) {
            anglesA[i].couleurDeRemplissage = 'blue'
            anglesB[i].couleurDeRemplissage = 'blue'
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
            anglesB['label' + b]
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
              calculs = `$180°-${anglesB.labelc.texte} = ${anglesB.labelb.texte}$`
              angles = 'alternes-internes'
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
          const texteCorr = mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsCorrection) + String.raw`
          <br>
          ${calculs !== undefined ? calculs : 'Les angles bleu et vert sont opposés par le sommet. Ils sont donc de même mesure.'}
          <br>
          Les angles rouge et vert sont ${angles} et ${sont} de la même mesure.
          <br>
          Donc les droites ${sont} parallèles.
          `
          texte += mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsEnonce)
          exercice = { texte: texte, texteCorr: texteCorr }
          break
        }
        case 3: {
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
            anglesB[b],
            anglesB.As,
            anglesB.Ax,
            anglesA['label' + a]
            // anglesB['label' + b]
          )
          objetsEnonce.forEach(objet => {
            objetsCorrection.push(objet)
          })
          objetsCorrection.push(anglesB['label' + b])
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
          let texte = `
          Donnée : Les droites sont parallèles.
          <br>
          En déduire la mesure de l'angle bleu.
          `
          const texteCorr = mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsCorrection) + String.raw`
          <br>
          Les angles rouge et vert sont ${angles} et formés par des droites parallèles.
          <br>
          Donc ils sont de même mesure.
          <br>
          ${calculs !== undefined ? calculs : 'Les angles bleu et vert sont opposés par le sommet.<br> Ils sont donc de même mesure.'}
          <br>
          L'angle bleu mesure donc ${mesure}.
          `
          texte += mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsEnonce)
          exercice = { texte: texte, texteCorr: texteCorr }
          break
        }
        case 4: {
          const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
          const objetsEnonceml = [] // Idem pour l'enoncé à main levée si besoin
          const objetsCorrection = [] // Idem pour la correction
          const param = aleaVariables(
            {
              O: 'randomInt(0,90)',
              A: 'randomInt(-90,90)',
              B: 'randomInt(-90,90)',
              r1: 'pickRandom([1.5,2])',
              r2: 'pickRandom([1.5,2])',
              test: '40<O-A<140 and 40<O-B<140 and abs(B-A)<20'
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
          const ab = choice([
            choice(['aa', 'bb', 'cc', 'dd']),
            choice(['ca', 'db'])
          ])
          const a = ab[0]
          const b = ab[1]
          objetsEnonce.push(
            anglesA[a],
            anglesA.As,
            anglesA.Ax,
            // anglesB[b],
            anglesB.As,
            anglesB.Ax,
            // anglesA['label' + a],
            // anglesB['label' + b],
            labelPoint(anglesA.S),
            labelPoint(anglesA.T),
            labelPoint(anglesA.X),
            labelPoint(anglesB.S),
            labelPoint(anglesB.T),
            labelPoint(anglesB.OX),
            labelPoint(anglesA.A),
            labelPoint(anglesB.A)
          )
          const paramsEnonce = fixeBordures([
            ...Object.keys(anglesA).map(key => { return anglesA[key] }),
            ...Object.keys(anglesB).map(key => { return anglesB[key] })
          ], { rzoom: 1.5 })
          // On copie tout le contenu de objetsEnonce et de objetsEnonceml dans objetsCorrection
          objetsEnonce.forEach(objet => {
            objetsCorrection.push(objet)
          })
          objetsEnonceml.forEach(objet => {
            objetsCorrection.push(objet)
          })
          // ici sont créés les texte, tex_corr, objets mathalea2d divers entrant dans le contenu de l'exercice
          let reponse
          if (a === b) {
            reponse = 'correspondant'
          } else if (a + b === 'ca' || a + b === 'db') {
            reponse = 'alterne-interne'
          }
          let texte = String.raw`Quel est l'angle ${reponse} à l'angle marqué ?<br>`
          const texteCorr = String.raw`L'angle ${reponse} à l'angle marqué est $\widehat{${anglesB[b].nom}}$.`
          texte += mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsEnonce)
          exercice = { texte: texte, texteCorr: texteCorr }
          break
        }
        case 5: {
          const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
          const objetsEnonceml = [] // Idem pour l'enoncé à main levée si besoin
          const objetsCorrection = [] // Idem pour la correction
          const param = aleaVariables(
            {
              O: 'randomInt(0,90)',
              A: 'randomInt(-90,90)',
              B: 'randomInt(-90,90)',
              r1: 'pickRandom([1.5,2])',
              r2: 'pickRandom([1.5,2])',
              test: '40<O-A<140 and 40<O-B<140 and abs(B-A)<20'
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
          const ab = choice([
            choice(['aa', 'bb', 'cc', 'dd']),
            choice(['ca', 'db'])
          ])
          const a = ab[0]
          const b = ab[1]
          objetsEnonce.push(
            // anglesA[a],
            anglesA.As,
            anglesA.Ax,
            // anglesB[b],
            anglesB.As,
            anglesB.Ax,
            // anglesA['label' + a],
            // anglesB['label' + b],
            labelPoint(anglesA.S),
            labelPoint(anglesA.T),
            labelPoint(anglesA.X),
            labelPoint(anglesB.S),
            labelPoint(anglesB.T),
            labelPoint(anglesB.OX),
            labelPoint(anglesA.A),
            labelPoint(anglesB.A)
          )
          const paramsEnonce = fixeBordures([
            ...Object.keys(anglesA).map(key => { return anglesA[key] }),
            ...Object.keys(anglesB).map(key => { return anglesB[key] })
          ], { rzoom: 1.5 })
          // On copie tout le contenu de objetsEnonce et de objetsEnonceml dans objetsCorrection
          objetsEnonce.forEach(objet => {
            objetsCorrection.push(objet)
          })
          objetsEnonceml.forEach(objet => {
            objetsCorrection.push(objet)
          })
          // ici sont créés les texte, tex_corr, objets mathalea2d divers entrant dans le contenu de l'exercice
          let reponse
          if (a === b) {
            reponse = 'correspondant'
          } else if (a + b === 'ca' || a + b === 'db') {
            reponse = 'alterne-interne'
          }
          let texte = String.raw`Quel est l'angle ${reponse} à $\widehat{${anglesA[a].nom}}$ ?<br>`
          const texteCorr = String.raw`L'angle ${reponse} à $\widehat{${anglesA[a].nom}}$ est $\widehat{${anglesB[b].nom}}$.`
          texte += mathalea2d(Object.assign({ scale: 0.7 }, paramsEnonce), objetsEnonce)
          exercice = { texte: texte, texteCorr: texteCorr }
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
