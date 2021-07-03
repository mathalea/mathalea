import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, texNombrec } from '../../modules/outils.js'
import { tracePoint, labelPoint, afficheMesureAngle, codageAngleDroit, mathalea2d } from '../../modules/2d.js'
import { point3d, vecteur3d, sphere3d, arete3d, rotationV3d, demicercle3d } from '../../modules/3d.js'

export const amcReady = true // tant qu'il n'a pas été adapté à la version 2.6

export const amcType = 'AMCOpen' // type de question AMC

export const titre = 'Calcul d’un parallèle terrestre'

/**
 * propose de calculer la longueur d'un parallèle terrestre à partir de la latitde
 * @author Jean-Claude Lhote
 * Référence 3G32-1
*/
export default function CalculsTrigonometriques1 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.spacingCorr = 2
  this.spacing = 2
  this.amcReady = amcReady
  this.amcType = amcType

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let alpha; let O; let H; let M; let R; let R2; let Axe; let normalV; let normalH; let P; let HP; let Sph; let OP; let PoleNord; let PoleSud; let objets = []

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question

      objets = []
      alpha = randint(30, 60)
      O = point3d(0, 0, 0, false, 'O')
      M = point3d(5, 0, 0, true, 'M')
      PoleNord = point3d(0, 0, 5, false, 'N')
      PoleSud = point3d(0, 0, -5, false, 'S')
      R = vecteur3d(O, M)
      Axe = arete3d(PoleSud, PoleNord)
      normalV = vecteur3d(0, 0, 1)
      M = rotationV3d(M, normalV, context.anglePerspective)
      M.p2d.nom = 'M'
      normalH = rotationV3d(R, normalV, 90)
      P = rotationV3d(M, normalH, -alpha)
      P.p2d.nom = 'P'
      H = point3d(0, 0, P.z, false)
      R2 = vecteur3d(H, P)
      H.p2d.nom = 'H'
      Sph = sphere3d(O, 5, 1, 3)
      HP = arete3d(H, P)
      OP = arete3d(O, P)
      objets.push(Sph, Axe.p2d, HP.p2d, OP.p2d, codageAngleDroit(P.p2d, H.p2d, O.p2d), tracePoint(H.p2d, P.p2d, O.p2d, M.p2d), labelPoint(H.p2d, P.p2d, O.p2d, M.p2d))
      objets.push(demicercle3d(H, normalV, R2, 'caché', 'red', 0), demicercle3d(H, normalV, R2, 'visible', 'red', 0))
      objets.push(arete3d(O, M).p2d)
      objets.push(afficheMesureAngle(M.p2d, O.p2d, P.p2d, 'black', 1.5, `${alpha}`))
      texte = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
      texte += `Quelle est la longueur du $${alpha}$e parallèle Nord ?`
      texteCorr = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
      texteCorr += `Considérons que le $${alpha}$e parallèle Nord est un cercle. Soit $H$ le centre de ce cercle situé sur l'axe de rotation de la terre.<br>`
      texteCorr += 'Les segments $[HP]$ et $[OM]$ sont parallèles, donc les angles alternes-internes $\\widehat{MOP}$ et $\\widehat{OPH}$ sont égaux.<br>'
      texteCorr += 'Dans le triangle $OPH$ rectangle en $H$, $\\cos(\\widehat{OPH})=\\dfrac{HP}{OP}$ d\'où $HP=OP\\times \\cos(\\widehat{OPH})$.<br>'
      texteCorr += 'Le rayon de la terre étant approximativement de $6400$ km, nous pouvons calculer $HP$ :<br>'
      texteCorr += `$HP=6400\\times \\cos(${alpha})\\approx ${texNombrec(6400 * Math.cos(alpha * Math.PI / 180))}$ km.<br>`
      texteCorr += `Calculons maintenant la longueur $L$ du $${alpha}$e parallèle : $L\\approx 2\\times \\pi\\times ${texNombrec(6400 * Math.cos(alpha * Math.PI / 180))}\\approx ${texNombrec(2 * Math.PI * 6400 * Math.cos(alpha * Math.PI / 180))}$ km.<br>`

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        // Pour AMC question AmcOpen
        this.autoCorrection[i] = { enonce: texte, propositions: [{ texte: texteCorr, statut: 3, feedback: '' }], reponse: { texte: 'Longueur arrondie au km près', valeur: Math.round(2 * Math.PI * 6400 * Math.cos(alpha * Math.PI / 180)), options: { digits: 0, decimals: 0 } } }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu
