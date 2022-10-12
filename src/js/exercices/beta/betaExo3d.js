import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { randint } from '../../modules/outils/entiers.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { barre3d, cube3d, paveLPH3d, plaque3d } from '../../modules/3d.js'

export const titre = 'Exo zéroMathalea2d3d'

export default function ExerciceZeroMathalea2d3d () {
  Exercice.call(this)
  this.nbQuestions = 1 // Ici le nombre de questions
  this.nbQuestionsModifiable = false // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []

    const l = randint(5, 10)
    const p = randint(2, 5)
    const h = randint(3, 6)
    const monPave = paveLPH3d(0, 0, 0, 1, l, p, h, 'black') // Objet 3d possédant une méthode svg et une méthode tikz pour mathalea2d
    const pavesCorr = []
    const texte = 'Donner le nombre de petits cubes qui constituent ce pavé droit<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 10 }, ...monPave.c2d)
    for (let i = 0; i < h - 1; i++) {
      pavesCorr.push(...plaque3d(0, 0, i * 1.5, 1, l, p, 'black').c2d) // autres objets 3d possédant des méthode svg et tikz.
    }
    for (let i = p - 1; i > 0; i--) {
      pavesCorr.push(...barre3d(0, i * 1.5, h * 1.5 - 1.5, 1, l, 'black').c2d)
    }
    for (let i = 0; i < l; i++) {
      pavesCorr.push(cube3d(i * 1.2, 0, h * 1.5 - 1.5, 1, 'black'))
    }
    const texteCorr = `Il y a ${h} plaques de ${p} barres de ${l} cubes. Il y a donc $${h} \\times ${p} \\times ${l} = ${h * l * p}$ cubes.<br>` + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 11.5 }, pavesCorr)
    context.anglePerspective = 30 // paramètre à modifier pour changer la vue en perspective
    context.coeffPerspective = 0.5 // autre paramètre : coefficient de réduction suivant l'axe de fuite y.

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
} // Fin de l'exercice.
