import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, carre, rotation, codageAngleDroit, mathalea2d } from '../../modules/2d.js'
export const titre = 'Programmes de constructions (en chantier)'

/**
 * Non Publié : base servant à faire des tutoriels vidéos
 * @author Jean-Claude Lhote
 * Réf : betaExoConstruction
 * publié le 1/12/2020
 */
export default function ExerciceConstructionsBasiques () {
  Exercice.call(this)
  this.nbQuestions = 1 // Ici le nombre de questions
  this.nbQuestionsModifiable = false // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1 // Le nombre de colonne pour la correction LaTeX
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
    const typesDeQuestionsDisponibles = [1] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    // Ci-dessus On crée une liste aléatoire comprenant nbQuestions parmi les types disponibles.
    /* Un exemple ci-dessous : si la classe est 6, alors les types dispo sont 1 et 2 sinon , 1,2,3 et 4.
    if (this.classe == 6) typesDeQuestionsDisponibles = [1, 2]
        else typesDeQuestionsDisponibles = [1, 2, 3,4]
    listeTypeDeQuestions = combin,aison_listes(typesDeQuestionsDisponibles, this.nbQuestions)
    */
    // boucle pour fabriquer les nbQuestions questions en s'assurant que si il n'y a pas nbQuestions différentes
    // La boucle s'arrête après 50 tentatives.
    let A, B, C, D, traces1, traces2, labels1, labels2, kare, aA, aB, aC, aD
    let objetsEnonce, objetsEnonceml, objetsCorrection, paramsEnonce, paramsEnonceml, paramsCorrection
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      objetsEnonceml = [] // Idem pour l'enoncé à main levée si besoin
      objetsCorrection = [] // Idem pour la correction

      texte = 'Construire le carré $ABCD$.<br>' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = 'Pour cette construction on peut utiliser la règle et l\'équerre.<br>' // Idem pour le texte de la correction.

      //      nom = creerNomDePolygone(3, "PQ")
      // fonction permettant de choisir un nom de polygone, soit ici 3 lettres qui se suivent à l'exclusion de la séquence PQ
      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1:
          A = point(0, 0, 'A', 'below')
          B = point(5, randint(-30, 30) / 10, 'B', 'below')
          C = rotation(A, B, -90, 'C', 'above')
          D = rotation(B, A, 90, 'D', 'above')
          traces1 = tracePoint(A, B)
          labels1 = labelPoint(A, B)
          traces2 = tracePoint(A, B, C, D)
          labels2 = labelPoint(A, B, C, D)
          kare = carre(A, B)
          kare.epaisseur = 2
          aA = codageAngleDroit(B, A, D)
          aB = codageAngleDroit(A, B, C)
          aC = codageAngleDroit(B, C, D)
          aD = codageAngleDroit(C, D, A)

          objetsEnonce.push(traces1, labels1)
          objetsEnonceml.push(traces2, labels2, kare, aA, aB, aC, aD)
          objetsCorrection.push(traces2, labels2, kare, aA, aB, aC, aD)
          // ici sont créés les texte, tex_corr, objets mathalea2d divers entrant dans le contenu de l'exercice
          break

        case 2:

          // Idem Cas1 mais avec d'autres texte, texteCorr...
          break

        case 3:

          break

        case 4:

          break
      }
      //  objetsEnonce.push () // On rempli les tableaux d'objets Mathalea2d
      //  objetsEnonceml.push()
      //  objetsCorrection.push()
      // paramètres de la fenêtre Mathalea2d pour l'énoncé main levée
      paramsEnonceml = { xmin: -5, ymin: -5, xmax: 9, ymax: 9, pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 1 }
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      paramsEnonce = { xmin: -5, ymin: -5, xmax: 9, ymax: 9, pixelsParCm: 20, scale: 1, mainlevee: false }
      // paramètres de la fenêtre Mathalea2d pour la correction
      paramsCorrection = { xmin: -5, ymin: -5, xmax: 9, ymax: 9, pixelsParCm: 20, scale: 1 }
      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += mathalea2d(paramsEnonceml, objetsEnonceml) + mathalea2d(paramsEnonce, objetsEnonce)
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.
  // his.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
} // Fin de l'exercice.
