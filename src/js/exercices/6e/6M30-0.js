import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { mathalea2d } from '../../modules/2d.js'
import { paveLPH3d } from '../../modules/3d.js'

export const titre = 'Volumes de pavés droit par dénombrement'

export default function VolumesPavesParDenombrement () {
  'use strict'
  Exercice.call(this)
  this.nbQuestions = 1 // Ici le nombre de questions
  this.nbQuestionsModifiable = false // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []

    const l = randint(5, 10)
    const p = randint(2, 5)
    const h = randint(3, 6)
    const monPave = paveLPH3d(0, 0, 0, 1, l, p, h)
    const texte = mathalea2d({ xmin: 0, ymin: 0, xmax: 15, ymax: 10 }, monPave)
    const texteCorr = '' // Idem pour le texte de la correction.

    context.anglePerspective = 30
    context.coeffPerspective = 0.5

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
} // Fin de l'exercice.
