import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, texNombre, texNombrec } from '../../modules/outils.js'
import { tracePoint, labelPoint, afficheMesureAngle, codageAngleDroit, mathalea2d } from '../../modules/2d.js'
import { point3d, vecteur3d, sphere3d, arete3d, rotationV3d, demicercle3d } from '../../modules/3d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const amcReady = true // tant qu'il n'a pas été adapté à la version 2.6
export const amcType = 'AMCOpenNum' // type de question AMC
export const titre = 'Calcul d’un parallèle terrestre'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * propose de calculer la longueur d'un parallèle terrestre à partir de la latitde
 * @author Jean-Claude Lhote
 * Référence 3G32-1
*/
export default function CalculsTrigonometriques1 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.spacingCorr = 2
  this.spacing = 2

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let alpha; let O; let H; let M; let R; let R2; let Axe; let normalV; let normalH; let P; let HP; let Sph; let OP; let PoleNord; let PoleSud; let objets = []

    for (let i = 0, texte, texteCorr, reponse, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
      M.c2d.nom = 'M'
      normalH = rotationV3d(R, normalV, 90)
      P = rotationV3d(M, normalH, -alpha)
      P.c2d.nom = 'P'
      H = point3d(0, 0, P.z, false)
      R2 = vecteur3d(H, P)
      H.c2d.nom = 'H'
      Sph = sphere3d(O, 5, 1, 3)
      HP = arete3d(H, P)
      OP = arete3d(O, P)
      objets.push(...Sph.c2d, Axe.c2d, HP.c2d, OP.c2d, codageAngleDroit(P.c2d, H.c2d, O.c2d), tracePoint(H.c2d, P.c2d, O.c2d, M.c2d), labelPoint(H.c2d, P.c2d, O.c2d, M.c2d))
      objets.push(demicercle3d(H, normalV, R2, 'caché', 'red', 0), demicercle3d(H, normalV, R2, 'visible', 'red', 0))
      objets.push(arete3d(O, M).c2d)
      objets.push(afficheMesureAngle(M.c2d, O.c2d, P.c2d, 'black', 1.5, `${alpha}`))
      texte = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
      texte += `Quelle est la longueur du $${alpha}$e parallèle Nord au kilomètre près ?`
      texteCorr = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
      texteCorr += `Considérons que le $${alpha}$e parallèle Nord est un cercle. Soit $H$ le centre de ce cercle situé sur l'axe de rotation de la terre.<br>`
      texteCorr += 'Les segments $[HP]$ et $[OM]$ sont parallèles, donc les angles alternes-internes $\\widehat{MOP}$ et $\\widehat{OPH}$ sont égaux.<br>'
      texteCorr += 'Dans le triangle $OPH$ rectangle en $H$, $\\cos(\\widehat{OPH})=\\dfrac{HP}{OP}$ d\'où $HP=OP\\times \\cos(\\widehat{OPH})$.<br>'
      texteCorr += 'Le rayon de la terre étant approximativement de $6400$ km, nous pouvons calculer $HP$ :<br>'
      texteCorr += `$HP=6400\\times \\cos(${alpha})\\approx ${texNombrec(6400 * Math.cos(alpha * Math.PI / 180))}$ km.<br>`
      reponse = Math.round(2 * Math.PI * 6400 * Math.cos(alpha * Math.PI / 180))
      texteCorr += `Calculons maintenant la longueur $L$ du $${alpha}$e parallèle : $L\\approx 2\\times \\pi\\times ${texNombrec(6400 * Math.cos(alpha * Math.PI / 180))}\\approx ${texNombre(reponse)}$ km.<br>`

      if (this.questionJamaisPosee(i, alpha)) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (context.isAmc) {
          this.autoCorrection[i] = { enonce: texte, propositions: [{ texte: texteCorr, statut: 3, feedback: '' }], reponse: { texte: 'Longueur arrondie au km près', valeur: [reponse], options: { digits: 0, decimals: 0 } } }
        } else {
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: ' $L=$', texteApres: ' km' })
          setReponse(this, i, reponse)
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu
