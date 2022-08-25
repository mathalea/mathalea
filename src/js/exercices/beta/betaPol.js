import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { diagrammeCirculaire, fixeBordures } from '../../modules/2d.js'
import FractionX from '../../modules/FractionEtendue.js'

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

    /* const P = polygoneATrous({
      data: [0, 0, 5, 0, 5, 5, 0, 5, 1, 1, 2, 1, 2, 2, 1, 2, 3, 3, 4, 3, 4, 4, 3, 4],
      holes: [4, 8],
      noms: 'ABCDEFGHIJKL',
      color: 'red',
      couleurDeRemplissage: 'pink',
      backgroundColor: 'white'
    })

    objetsEnonce.push(P, ...P.triangulation)
    */
    const effectifs = [15, 25, 30, 10, 20]
    const labels = ['jaune', 'rouge', 'bleu', 'vert', 'blanc']
    const pourcents = [true, true, true, true, true]
    const valeurs = [true, true, true, true, true]
    const mesures = [true, true, true, true, true]
    const visibles = [true, true, true, true, true]
    const hachures = [false, false, false, false, false]
    const remplissage = [true, true, true, true, true]

    const diag = diagrammeCirculaire({ rayon: 7, semi: false, legendePosition: 'dessous', effectifs, labels, mesures, visibles, pourcents, valeurs, hachures, remplissage })
    objetsEnonce.push(diag)

    // paramètres de la fenêtre Mathalea2d pour l'énoncé normal

    const paramsEnonce = Object.assign({}, fixeBordures([diag]), { pixelsParCm: 20, scale: 1, mainlevee: false })
    console.log(paramsEnonce)
    // paramètres de la fenêtre Mathalea2d pour la correction
    // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
    for (let i = 0; i < 5; i++) {
      texte += `${labels[i]}${visibles[i] ? '' : '(*)'} : ${effectifs[i]} ; `
    }
    texte += '<br>(*) secteur non visible<br>'
    texte += mathalea2d(paramsEnonce, objetsEnonce)
    // On ajoute au texte de la correction, la figure de la correction
    texteCorr = ''
    const f = new FractionX(2, 1)
    texte += `$${f.texSimplificationAvecEtapes()}$`
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
