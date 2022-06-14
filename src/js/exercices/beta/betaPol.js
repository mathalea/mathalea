import Exercice from '../Exercice.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { mathalea2d, point, polygone, tracePoint } from '../../modules/2d.js'

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
    // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

    //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
    //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
    //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre

    // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
    // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
    // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  // this.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  // this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
    // Fin de l'exercice.
  }

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  nouvelleVersion () {
  // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    // Ci-dessus On crée une liste aléatoire comprenant nbQuestions parmi les types disponibles.
    /* Un exemple ci-dessous : si la classe est 6, alors les types dispo sont 1 et 2 sinon , 1,2,3 et 4.
  if (this.classe == 6) typesDeQuestionsDisponibles = [1, 2]
      else typesDeQuestionsDisponibles = [1, 2, 3,4]
  listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
  */
    // boucle pour fabriquer les nbQuestions questions en s'assurant que si il n'y a pas nbQuestions différentes
    // La boucle s'arrête après 50 tentatives.

    const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé

    let texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
    let texteCorr = '' // Idem pour le texte de la correction.

    /***************************************/
    /** ******Ici on définit les objets 2d */
    /*************************************/
    let A
    let B
    const C = point(0, 0)
    const D = point(2.5, -2)
    const E = point(5, 0)
    const F = point(3, -2.5)
    const G = point(5, -5)
    const H = point(3, -3)
    const I = point(0, -5)
    const J = point(2, -3)
    const P = polygone(C, D, E, F, G, H, I, J)

    P.color = 'blue'
    const time = new Date()
    for (let x = -0.2; x < 5.2; x += 0.1) {
      for (let y = -5.2; y < 0.2; y += 0.1) {
        A = point(x, y)
        if (A.estDansPolygoneNonConvexe(P)) B = tracePoint(A, 'blue')
        else B = tracePoint(A, 'red')
        B.taille = 1
        B.epaisseur = 1
        B.style = '+'
        objetsEnonce.push(B)
      }
    }
    const time2 = new Date()
    console.log(time2 - time)
    objetsEnonce.push(P)
    // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
    const paramsEnonce = { xmin: -1, ymin: -6, xmax: 8, ymax: 1, pixelsParCm: 20, scale: 1, mainlevee: false }
    // paramètres de la fenêtre Mathalea2d pour la correction
    // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
    texte += mathalea2d(paramsEnonce, objetsEnonce)
    // On ajoute au texte de la correction, la figure de la correction
    texteCorr = ''
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
