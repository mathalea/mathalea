import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { mathalea2d } from '../../modules/2d.js'
import { barre3d, cube3d, paveLPH3d, plaque3d } from '../../modules/3d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Déterminer le volume de pavés droit par dénombrement'
export const interactifReady = true
export const amcReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'

export default function VolumesPavesParDenombrement () {
  Exercice.call(this)
  this.nbQuestions = 1 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []
    context.anglePerspective = 30
    context.coeffPerspective = 0.5
    const dimensions = []
    for (let q = 0, cpt = 0, l, p, h, monPave, pavesCorr, cubes, plaques, barres, texte, texteCorr; q < this.nbQuestions && cpt < 50;) {
      l = randint(5, 10)
      p = randint(2, 5)
      h = randint(3, 6)
      monPave = paveLPH3d(0, 0, 0, 1, l, p, h, 'black')
      pavesCorr = []
      cubes = []
      barres = []
      plaques = []

      texte = 'Donner le nombre de petits cubes qui constituent ce pavé droit.<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: l + 0.9 * p, ymax: h + 0.6 * p }, ...monPave.c2d)
      if (!context.isAmc) texte += ajouteChampTexteMathLive(this, q, 'largeur25')
      for (let i = 0; i < h - 1; i++) {
        pavesCorr.push(...plaque3d(0, 0, i * 1.5, 1, l, p, 'black').c2d)
        plaques.push(...plaque3d(0, 0, i * 1.5, 1, l, p).c2d)
      }
      plaques.push(...plaque3d(0, 0, (h - 1) * 1.5, 1, l, p).c2d)
      for (let i = p - 1; i > 0; i--) {
        pavesCorr.push(...barre3d(0, i * 1.5, h * 1.5 - 1.5, 1, l, 'black').c2d)
        barres.push(...barre3d(0, i * 1.5, 0, 1, l).c2d)
      }
      barres.push(...barre3d(0, 0, 0, 1, l).c2d)
      for (let i = 0; i < l; i++) {
        pavesCorr.push(...cube3d(i * 1.2 - 0.06 * l, 0, h * 1.5 - 1.5, 1, 'black').c2d)
        cubes.push(...cube3d(1.5 * i - 0.06 * l, 0, 0, 1).c2d)
      }
      if (this.correctionDetaillee) {
        texteCorr = `Il y a ${l} cubes par barre :<br>`
        texteCorr += mathalea2d({ xmin: -1, xmax: l * 1.5 + 2, ymin: -0.5, ymax: 1.5 }, cubes)
        texteCorr += `<br>Il y a ${p} barres par plaque :<br>`
        texteCorr += mathalea2d({ xmin: -1, xmax: l * 1.5 + 2, ymin: -0.5, ymax: 1.5 + p * 0.3 }, barres)
        texteCorr += `<br>Enfin, il y a ${h} plaques empilées :<br>`
        texteCorr += mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 1.5 + h * 1.4 }, plaques)
        texteCorr += `<br>Il y a donc $${l} \\times ${p} \\times ${h} = ${h * l * p}$ cubes.<br>`
      } else {
        texteCorr = `Il y a  ${l} cubes par barre, ${p} barres par plaque et ${h} plaques. Il y a donc $${l} \\times ${p} \\times ${h} = ${h * l * p}$ cubes.<br>`
        texteCorr += mathalea2d({ xmin: -1, ymin: -1, xmax: Math.max(l * 1.2 + 1, l + p * 0.8), ymax: h * 1.5 + p * 0.8 }, pavesCorr)
      }
      if (dimensions.indexOf([l, p, h]) === -1) {
        setReponse(this, q, l * p * h)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        dimensions.push([l, p, h])
        q++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
