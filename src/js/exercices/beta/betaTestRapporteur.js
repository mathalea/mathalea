import Exercice from '../ExerciceTS.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { arc, mathalea2d, point, rapporteur, rotation, segment } from '../../modules/2d.js'

export const titre = 'Exo zéro Mathalea2d'

export default class SuperExoMathalea2d extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 1 // Ici le nombre de questions (une seule pour cet exercice non modifiable)
    this.nbQuestionsModifiable = false // désactive le formulaire nombre de questions
    this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
    this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  }

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  nouvelleVersion () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []

    const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
    const objetsCorrection = [] // Idem pour la correction

    let texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
    let texteCorr = '' // Idem pour le texte de la correction.

    /***************************************/
    /** ******Ici on définit les objets 2d */
    /*************************************/
    const A = point(0, 0)
    const B = point(9, 0)
    const C = rotation(B, A, randint(50, 160))
    const s = segment(A, B)
    const t = segment(A, C)
    const a = arc(B, A, C)
    const R = rapporteur({ x: 0, y: 0, taille: 7, taille2: 6, depart: 0, semi: false, avecNombre: 'deuxSens' })

    objetsEnonce.push(s, t, a, R) // On rempli les tableaux d'objets Mathalea2d
    objetsCorrection.push(s, t, a, R)

    // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
    const paramsEnonce = { xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: false }
    // paramètres de la fenêtre Mathalea2d pour la correction
    const paramsCorrection = { xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1 }
    // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
    texte += mathalea2d(paramsEnonce, objetsEnonce)
    // On ajoute au texte de la correction, la figure de la correction
    texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
