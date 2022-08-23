import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, lettreDepuisChiffre, texNombre, contraindreValeur, combinaisonListes } from '../../modules/outils.js'
import { point, labelPoint, rotation, afficheMesureAngle, sensDeRotation, homothetie, cibleCouronne, texteParPoint, similitude, segment, fixeBordures, demiDroite } from '../../modules/2d.js'

export const titre = 'Construire un angle de mesure donnée'
export const amcReady = true
export const amcType = 'AMCOpen'

/**
 * Construire un angle
 * @author Jean-Claude Lhote
 * Référence 6G23
 */
export default function ConstruireUnAngle () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 2
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.video = 'cU80v1p6mMI'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    this.sup = contraindreValeur(1, 4, this.sup, 1)
    let typeDeQuestions
    if (this.sup < 4) typeDeQuestions = [this.sup]
    else typeDeQuestions = [1, 2, 3]
    const listeTypeDeQuestion = combinaisonListes(typeDeQuestions, this.nbQuestions)
    let angle; let anglerot; let Apos; let Bpos; let Cpos; let fleche; const signe = []; let p; let texte; let texteCorr; let A; let B; let s; let C; let s2
    let labels, labels2, secteur, cible, xMin, xMax, yMin, yMax, objetsEnonce, objetsCorrection
    signe[0] = randint(-1, 1, 0)
    for (let i = 1; i < this.nbQuestions; i++) {
      signe.push((-1) * signe[i - 1])
    }
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestion[i]) {
        case 1 : angle = randint(1, 17, 9) * 10
          break
        case 2 : angle = randint(1, 8) * 10 + randint(0, 1) * 90 + 5
          break
        case 3 : angle = randint(1, 16) * 10 + randint(1, 9)
          break
      }
      angle = angle * signe[i]
      anglerot = randint(-50, 50)
      p = ['x', lettreDepuisChiffre(randint(1, 16)), 'y']
      texte = `Construire l'angle $\\widehat{${p[0] + p[1] + p[2]}}$ de mesure $${texNombre(Math.abs(angle))}\\degree$ en tournant dans le sens `
      if (angle < 0) {
        texte += 'des aiguilles d\'une montre.<br>'
      } else {
        texte += 'inverse des aiguilles d\'une montre.<br>'
      }
      A = point(0, 0)
      B = point(5, 0)
      B = rotation(B, A, anglerot)
      Apos = texteParPoint(p[1], similitude(B, A, -90, 0.1), 'milieu')
      Bpos = texteParPoint(p[0], similitude(A, homothetie(B, A, 0.9), signe[i] * 90, 0.1), 'milieu')

      s = segment(A, B)
      s.styleExtremites = '|-'
      s.epaisseur = 2
      C = rotation(B, A, angle)
      Cpos = texteParPoint(p[2], similitude(A, homothetie(C, A, 0.9), -signe[i] * 90, 0.1), 'milieu')
      fleche = sensDeRotation(B, A, signe[i])
      s2 = demiDroite(A, C, 'black', '|-')
      labels = labelPoint(A, B)
      labels2 = labelPoint(A, B, C)
      secteur = afficheMesureAngle(B, A, C)
      texteCorr = ''
      cible = cibleCouronne({ x: 0, y: 0, taille: 3 })
      xMin = Math.min(A.x - 4, C.x)
      xMax = Math.max(B.x, C.x) + 0.5
      yMin = Math.min(A.y - 4, C.y) - 0.5
      yMax = Math.max(A.y + 4, C.y) + 0.5
      context.fenetreMathalea2d = [xMin, yMin, xMax, yMax]
      objetsEnonce = [s, labels, cible, Apos, Bpos, fleche]
      const bordure = fixeBordures(objetsEnonce, { rxmax: 1.5 })
      objetsCorrection = [s, labels2, secteur, cible, s2, Apos, Bpos, Cpos, fleche]
      texte += mathalea2d(Object.assign({}, bordure, { pixelsParCm: 20, scale: 0.65 }), objetsEnonce)
      // if ((!context.isHtml) && ((i + 1) % 2 === 0 && !(i + 1) % 4 === 0)) texte += '\\columnbreak '
      if ((!context.isHtml) && ((i + 1) % 4 === 0)) texte += '\\newpage '
      texteCorr = mathalea2d(Object.assign({}, bordure, { pixelsParCm: 20, scale: 0.6 }), objetsCorrection)
      if (this.questionJamaisPosee(i, angle, signe[i])) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [{
              texte: texteCorr,
              statut: 0,
              sanscadre: true
            }
            ]
          }
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Précision de l\'angle', 4, '1 : Angle à 10°\n2 : Angle à 5°\n3 : Angle à 1°\n4 : Mélange']
}
