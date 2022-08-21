import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { symetrieAnimee, rotationAnimee, translationAnimee, polygone, point, milieu, pointSurSegment, droite, mediatrice, translation, similitude, rotation, pointAdistance, longueur, symetrieAxiale, vecteur, latexParPoint, tracePoint, labelPoint, polygoneAvecNom, renommePolygone, nommePolygone } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'

export const titre = 'Tranformations de triangle'
export default function TransformationsDeTriangle () {
  'use strict'
  Exercice.call(this)
  this.titre = 'Tranformations de triangle'
  this.nbQuestions = 1 // Ici le nombre de questions (une seule pour cet exercice non modifiable)
  this.nbQuestionsModifiable = false // désactive le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.typeExercice = 'IEP'
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function (numeroExercice) {
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
    const objetsCorrection = [] // Idem pour la correction

    let texteCorr = '' // Idem pour le texte de la correction.
    let largeur = 20; let hauteur = 20
    let A, B, C, triangle, triangle0, O, M, X, Y, triangle1, A1, B1, C1, d1, triangle2, med, D, F, triangle3, triangle4, triangle5, traces, labels
    let xMin, xMax, yMin, yMax
    let alpha, beta
    const anim = new Alea2iep()
    /***************************************/
    /** ******Ici on définit les objets 2d */
    /*************************************/
    while (largeur > 16 && hauteur > 16) {
      xMin = 0
      xMax = 0
      yMin = 0
      yMax = 0
      A = point(0, 0, 'A')
      B = pointAdistance(A, randint(40, 60) / 10, randint(70, 100), 'B')
      C = similitude(B, A, randint(20, 50), randint(8, 12) / 10, 'C')
      triangle0 = polygone(A, B, C)
      triangle = polygoneAvecNom(A, B, C)
      // d0=droite(A,B)
      O = pointSurSegment(B, A, 2 + longueur(A, B))
      // d0.isVisible=false
      beta = randint(-45, -20)
      A1 = rotation(A, O, beta, 'A')
      B1 = rotation(B, O, beta, 'B')
      C1 = rotation(C, O, beta, 'C')
      triangle1 = polygone(A1, B1, C1)
      renommePolygone(triangle1, ['$A_1$', '$B_1$', '$C_1$'])
      M = milieu(A, A1)
      d1 = droite(A1, B1)
      triangle2 = symetrieAxiale(triangle1, d1)
      renommePolygone(triangle2, ['$A_1$', '$B_1$', '$C_1$'])
      med = mediatrice(A, A1)
      X = pointSurSegment(M, O, 5)
      Y = pointSurSegment(O, M, 10)
      D = similitude(B1, A1, randint(-40, -10), 1.5, 'D')
      triangle3 = rotation(triangle2, D, 180)
      renommePolygone(triangle3, ['$A_2$', '$B_2$', '$C_2$'])
      F = translation(D, vecteur(B, A), 'F')
      traces = tracePoint(D, F)
      labels = labelPoint(D, F)
      triangle4 = translation(triangle3, vecteur(D, F))
      renommePolygone(triangle4, ['$A_3$', '$B_3$', '$C_3$'])
      alpha = -randint(80, 110)
      triangle5 = rotation(triangle4, F, alpha)
      renommePolygone(triangle5, ['$A_4$', '$B_4$', '$C_4$'])

      for (let i = 0; i < 3; i++) {
        xMin = Math.min(xMin, triangle0.listePoints[i].x, triangle1.listePoints[i].x, triangle2.listePoints[i].x, triangle3.listePoints[i].x, triangle4.listePoints[i].x, triangle5.listePoints[i].x)
        xMax = Math.max(xMax, triangle0.listePoints[i].x, triangle1.listePoints[i].x, triangle2.listePoints[i].x, triangle3.listePoints[i].x, triangle4.listePoints[i].x, triangle5.listePoints[i].x)
        yMin = Math.min(yMin, triangle0.listePoints[i].y, triangle1.listePoints[i].y, triangle2.listePoints[i].y, triangle3.listePoints[i].y, triangle4.listePoints[i].y, triangle5.listePoints[i].y)
        yMax = Math.max(yMax, triangle0.listePoints[i].y, triangle1.listePoints[i].y, triangle2.listePoints[i].y, triangle3.listePoints[i].y, triangle4.listePoints[i].y, triangle5.listePoints[i].y)
      }
      xMax += 4
      xMin--
      yMin--
      yMax++
      largeur = xMax - xMin
      hauteur = yMax - yMin
    }

    let texte = 'Construire<br>$A_1B_1C_1$ le triangle symétrique de $ABC$ par rapport à la droite $(d)$;<br>' // Nous utilisons souvent cette variable pour construire le texte de la question.
    texte += '$A_2B_2C_2$ le triangle symétrique de $A_1B_1C_1$ par rapport au point $D$;<br>'
    texte += '$A_3B_3C_3$ le triangle translaté de $A_2B_2C_2$ tel que $D$ soit transformé en $F$;<br>'
    texte += `$A_4B_4C_4$ le triangle obtenu par la rotation de $A_3B_3C_3$ de centre $F$ et d'angle $${Math.abs(alpha)}\\degree$ dans le sens des aiguilles d'une montre.<br>`

    const nomd = latexParPoint('(d)', translation(milieu(B, B1), vecteur(1, 0)), 'black', 30, 12, '')
    const triangle2a = symetrieAnimee(triangle0, med, `id='anim${numeroExercice}A' begin="0s" dur ="2s" repeatcount="1" fill="freeze"`)
    const triangle3a = rotationAnimee(triangle2, D, 180, `id='anim${numeroExercice}B' begin="2s" dur ="2s" repeatcount="1" fill="freeze"`)
    const triangle4a = translationAnimee(triangle3, vecteur(D, F), `id='anim${numeroExercice}C' begin="4s" dur ="2s" repeatcount="1" fill="freeze"`)
    const triangle5a = rotationAnimee(triangle4, F, alpha, `id='anim${numeroExercice}D' begin="6s" dur ="2s" repeatcount="1" fill="freeze"`)
    anim.vitesse = 15
    anim.tempo = 0.5
    anim.recadre(xMin, yMax)
    anim.polygoneRapide(...triangle0.listePoints)
    anim.pointsCreer(A, B, C, F, D)
    anim.couleur = 'black'
    anim.traitRapide(X, Y)
    anim.textePoint('(d)', milieu(B, B1))
    anim.symetrieAxialePolygone(triangle0, med, ['A_1', 'B_1', 'C_1'], { couleur: 'blue', couleurCodage: 'lightblue' })
    anim.demiTourPolygone(triangle2, D, ['A_2', 'B_2', 'C_2'], { couleur: 'red', couleurCodage: 'pink' })
    anim.translationPolygone(triangle3, D, F, ['A_3', 'B_3', 'C_3'], { couleur: 'brown', couleurCodage: 'orange' })
    anim.rotationPolygone(triangle4, F, alpha, ['A_4', 'B_4', 'C_4'], { couleur: 'green', couleurCodage: 'lightgreen' })
    anim.crayonMasquer()

    context.fenetreMathalea2d = [xMin, yMin, xMax, yMax]
    objetsEnonce.push(triangle0, triangle[1], traces, labels, med, nomd) // On rempli les tableaux d'objets Mathalea2d
    objetsCorrection.push(triangle0, triangle[1], traces, labels, med, nomd, triangle2, nommePolygone(triangle2), triangle3, nommePolygone(triangle3), triangle4, nommePolygone(triangle4), triangle5, nommePolygone(triangle5), triangle2a, triangle3a, triangle4a, triangle5a)

    // paramètres de la fenêtre Mathalea2d pour l'énoncé main levée
    //    paramsEnonceml = { xmin: Math.min(objetsEnonceml.x), ymin: Math.min(objetsEnonceml.y), xmax: Math.max(objetsEnonceml.x), ymax: Math.max(objetsEnonceml.y), pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 1 }
    // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
    const paramsEnonce = { xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 1, mainlevee: false }
    // paramètres de la fenêtre Mathalea2d pour la correction
    const paramsCorrection = { xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 1 }
    // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
    texte += mathalea2d(paramsEnonce, objetsEnonce)
    // On ajoute au texte de la correction, la figure de la correction
    texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
    texteCorr += '<br>'
    texteCorr += `<button class="ui mini compact button"  style="margin:10px" onclick="document.getElementById('anim${numeroExercice}A').beginElement()"><i class="redo circle icon"></i>symétrie axiale</button>`
    texteCorr += `<button class="ui mini compact button"  style="margin:10px" onclick="document.getElementById('anim${numeroExercice}B').beginElement()"><i class="redo circle icon"></i>symétrie centrale</button>`
    texteCorr += `<button class="ui mini compact button"  style="margin:10px" onclick="document.getElementById('anim${numeroExercice}C').beginElement()"><i class="redo circle icon"></i>translation</button>`
    texteCorr += `<button class="ui mini compact button"  style="margin:10px" onclick="document.getElementById('anim${numeroExercice}D').beginElement()"><i class="redo circle icon"></i>rotation</button>`

    texteCorr += anim.html(numeroExercice)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  // this.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
} // Fin de l'exercice.
