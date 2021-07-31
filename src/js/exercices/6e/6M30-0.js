import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { mathalea2d } from '../../modules/2d.js'
import { barre3d, cube3d, paveLPH3d, plaque3d } from '../../modules/3d.js'

export const titre = 'Volumes de pavés droit par dénombrement'
export const interactifReady = false
export const amcReady = false

export default function VolumesPavesParDenombrement () {
  Exercice.call(this)
  this.nbQuestions = 1 // Ici le nombre de questions
  this.nbQuestionsModifiable = false // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.correctionDetailleeDisponible = true

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []

    const l = randint(5, 10)
    const p = randint(2, 5)
    const h = randint(3, 6)
    const monPave = paveLPH3d(0, 0, 0, 1, l, p, h, 'black')
    const pavesCorr = []
    const cubes = []
    const barres = []
    const plaques = []

    const texte = 'Donner le nombre de petits cubes qui constituent ce pavé droit<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 10 }, monPave)
    let texteCorr
    for (let i = 0; i < h - 1; i++) {
      pavesCorr.push(plaque3d(0, 0, i * 1.5, 1, l, p, 'black'))
      plaques.push(plaque3d(0, 0, i * 1.5, 1, l, p))
    }
    plaques.push(plaque3d(0, 0, (h - 1) * 1.5, 1, l, p))
    for (let i = p - 1; i > 0; i--) {
      pavesCorr.push(barre3d(0, i * 1.5, h * 1.5 - 1.5, 1, l, 'black'))
      barres.push(barre3d(0, i * 1.5, 0, 1, l))
    }
    barres.push(barre3d(0, 0, 0, 1, l))
    for (let i = 0; i < l; i++) {
      pavesCorr.push(cube3d(i * 1.2, 0, h * 1.5 - 1.5, 1, 'black'))
      cubes.push(cube3d(1.5 * i, 0, 0, 1))
    }
    if (this.correctionDetaillee) {
      texteCorr = `Il y a ${l} cubes par barre :<br>`
      texteCorr += mathalea2d({ xmin: -0.5, xmax: l * 1.5 + 2, ymin: -0.5, ymax: 1.5 }, cubes)
      texteCorr += `<br>Il y a ${p} barres par plaque :<br>`
      texteCorr += mathalea2d({ xmin: -0.5, xmax: l + 2, ymin: -0.5, ymax: 1.5 + p * 0.75 }, barres)
      texteCorr += `<br>Enfin, il y a ${h} plaques empilées :<br>`
      texteCorr += mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: h * 1 * 1.5 + p * 0.75 + 0.5 }, plaques)
      texteCorr += `<br>Il y a donc $${l} \\times ${p} \\times ${h} = ${h * l * p}$ cubes.<br>`
    } else {
      texteCorr = `Il y a  ${l} cubes par barre, ${p} barres par plaque et ${h} plaques. Il y a donc $${l} \\times ${p} \\times ${h} = ${h * l * p}$ cubes.<br>`
      texteCorr += mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 11.5 }, pavesCorr)
    }
    context.anglePerspective = 30
    context.coeffPerspective = 0.5

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
