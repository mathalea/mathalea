import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { choice, combinaisonListes, combinaisonListesSansChangerOrdre, listeQuestionsToContenu, randint, stringNombre } from '../../modules/outils.js'
import { centreGraviteTriangle, droite, mathalea2d, point, polygone, rotation, texteParPoint, translation, vecteur } from '../../modules/2d.js'

export const titre = 'Exo zéro Mathalea2d'

export default function betaExoPavage6e () {
  'use strict'
  Exercice.call(this)
  this.titre = 'Symétrie axiale dans un pavage de triangles équilatéraux'
  this.nbQuestions = 1 // Ici le nombre de questions (une seule pour cet exercice non modifiable)
  this.nbQuestionsModifiable = false // désactive le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

  this.sup = 1 // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const objetsEnonce = []
    const objetsCorrection = []
    let paramsEnonce = {}
    let paramsCorrection = {}
    let texte = ''
    let texteCorr = ''
    let typesDeQuestionsDisponibles
    // construction du pavage triangulaire
    const triAngles = [{}] // tableau des triangles { tri: polygone (le triangle), gra: point(son centre de gravité), num: texteParPoint(son numéro)} l'indice du triangle est son numéro
    const A = point(0, 0)
    const B = point(2, 0)
    const C = rotation(B, A, 60)
    const v = vecteur(2, 0)
    const w = rotation(vecteur(2, 0), A, 60)
    triAngles[0] = { tri: polygone(A, B, C), gra: centreGraviteTriangle(A, B, C) }
    triAngles[1] = { tri: rotation(triAngles[0].tri, B, -60), gra: rotation(triAngles[0].gra, B, -60) }
    for (let i = 0; i < 7; i++) {
      if (i !== 0) {
        triAngles[i * 2] = { tri: translation(triAngles[(i - 1) * 2].tri, v), gra: translation(triAngles[(i - 1) * 2].gra, v) }
        triAngles[i * 2 + 1] = { tri: translation(triAngles[(i - 1) * 2 + 1].tri, v), gra: translation(triAngles[(i - 1) * 2 + 1].gra, v) }
      }
      for (let j = 1; j < 7; j++) {
        triAngles[i * 2 + j * 14] = { tri: translation(triAngles[i * 2 + (j - 1) * 14].tri, w), gra: translation(triAngles[i * 2 + (j - 1) * 14].gra, w) }
        triAngles[i * 2 + 1 + j * 14] = { tri: translation(triAngles[i * 2 + 1 + (j - 1) * 14].tri, w), gra: translation(triAngles[i * 2 + 1 + (j - 1) * 14].gra, w) }
      }
    }
    for (let i = 0; i < triAngles.length; i++) {
      triAngles[i].num = texteParPoint(stringNombre(i), triAngles[i].gra, 'milieu', 'black', 1)
      objetsEnonce.push(triAngles[i].tri, triAngles[i].num)
    }
    paramsEnonce = { xmin: 0, ymin: -0.1, xmax: 22, ymax: 14, pixelsParCm: 30, scale: 1, mainlevee: false }
    paramsCorrection = paramsEnonce
    // on Choisit trois axes parmis les possibilités prédéfinies... 6 types d'axes laissant le pavage invariant
    // un axe horizontal passe par les sommets 0 de deux triangles d'indices 2n et 2n+2 (sauf si 2n%14=12)
    // un axe vertical passe par les centres de gravités de deux triangles d'indice i et i+13 (sauf si i%14=0)
    // un axe parallèle à [AC] passe par les sommets 0 de deux triangles d'indices 2n et 2n+14
    // un axe parallèle à [BC] passe par les sommets 0 de deux triangles d'indices 2n et 2n+12 (sauf si 2n%14=0)
    // un axe perpendiculaire à [BC] passe par les centres de gravité de deux triangles d'indice 2n et 2n+1
    // un axe perpendiculaire à [AC] passe par les centres de gravité de deux triangles d'indice 2n+1 et 2n+2 (sauf si (2n+1)%14=13)
    const choisitTriangle = function (i, typeAxe, index) { // retourne {antecedent: number, image: number, distracteurs: [number]}
      let figA
      let antecedent
      let rangM // rangée de l'antécédent
      let rangN // rangée de l'image
      let rangA // rangée de l'axe
      let deltaRang
      let image
      const distracteurs = []
      switch (typeAxe) {
        case 0:
          figA = axes[typeAxe][index][0] - axes[typeAxe][index][0] % 14 // figA est le triangle en tête de rangée dont le point A définit l'axe
          rangA = Math.floor(figA / 14)
          if (rangA < 4) { // On est avec un axe bas...
            if (rangA < 3) {
              antecedent = randint(0, rangA - 1) * 14 + randint(6, 13)
            } else {
              antecedent = randint(1, rangA - 1) * 14 + randint(8, 13)
            }
          } else { // on est avec un axe haut ...
            if (rangA > 4) {
              antecedent = randint(rangA, 6) * 14 + randint(0, 7)
            } else {
              antecedent = randint(rangA, 5) * 14 + randint(0, 7)
            }
          }
          rangM = Math.floor(antecedent / 14)
          deltaRang = rangA - rangM
          if (deltaRang > 0) { // l'axe est au dessus de l'antécédent
            image = antecedent + (deltaRang - 1) * 26 + 13
            distracteurs.push(image - 13)
            if (image + 13 < 98) distracteurs.push(image + 13)
            distracteurs.push(image - deltaRang * 2 + 1, image + deltaRang * 2 - 1)
          } else { // l'axe est en dessous de l'antécédent
            image = antecedent + deltaRang * 26 - 13
            distracteurs.push(image + 13)
            if (image - 13 > 0) distracteurs.push(image - 13)
            distracteurs.push(image + deltaRang * 2 - 1, image - deltaRang * 2 + 1)
          }

          break
        case 1:
          figA = axes[typeAxe][index][0] % 13 // figA est le triangle en pied de verticale dont le centre de gravité est sur l'axe
          rangA = figA // le numéro c'est aussi le rang de gauche à droite
          // sur la rangée rangM, rangA + rangM*13 est le numéro de la figure croisée par l'axe
          rangM = randint(2, 5) // on choisit la rangée de l'antécédent
          if (rangA < 10) { // On est avec un axe à gauche
          // l'antécédent doit être choisit entre rangM*14 et rangA +rangM*13
            antecedent = randint(rangM * 14 + 1, rangA + rangM * 13 - 1)
          } else { // on est avec un axe à droite
          // l'antécédent doit être choisit entre rangA +rangM*13 et rangM*14-1
            antecedent = randint(rangA + rangM * 13 + 1, rangA + rangM * 14)
          }
          deltaRang = rangA + rangM * 13 - antecedent
          console.log('delta : ', deltaRang, ' rangM : ', rangM, ' rangA : ', rangA)
          if (deltaRang > 0) { // l'axe est à droite de l'antécédent
            image = rangA + rangM * 13 + deltaRang
            distracteurs.push(image - 1)
            if (image + 13 < 98) distracteurs.push(image + 13)
            if (image - 13 > 0) {
              if (image % 14 === 13) {
                distracteurs.push(image - 2)
              } else {
                if (choice([false, true])) {
                  distracteurs.push(image - 13)
                } else {
                  distracteurs.push(image - 14)
                }
              }
            }
            if (image % 14 !== 13) distracteurs.push(image + 1)
          } else { // l'axe est à gauche de l'antécédent
            image = rangA + rangM * 13 + deltaRang
            distracteurs.push(image + 1)
            if (image + 14 < 98) {
              if (image % 14 === 0) {
                distracteurs.push(image + 14)
              } else {
                distracteurs.push(image + 13)
              }
            }
            if (image - 13 > 0) distracteurs.push(image - 13)
            if (image % 14 !== 0) distracteurs.push(image - 1)
          }

          break
        case 2: // axe parallèle à [AC]
          figA = axes[typeAxe][index][0] % 14 // figA est le triangle de la première rangée dont le côté [AC] définit l'axe
          rangA = figA >> 1 // le rang de gauche à droite est le numéro de la figure divisé par 2 car il n'y a que les figures paires qui comptent ici
          // sur la rangée rangM, rangA + rangM*13 est le numéro de la figure croisée par l'axe
          rangM = randint(rangA, 6 - rangA) // on choisit la rangée verticale de l'antécédent
          if (rangA < 4) { // On est avec un axe à gauche
          // l'antécédent doit être choisit entre rangM*14 et 2*(rangA-1) + rangM*14
            antecedent = randint(rangM * 14, (rangA - 1) * 2 + rangM * 14)
          } else { // on est avec un axe à droite
          // l'antécédent doit être choisit entre rangA*2 + 1 + rangM*14 et rangM*14+(rangA+1)*2
            antecedent = randint(rangA * 2 + 1 + rangM * 14, rangM * 14 + (rangA + 1) * 2)
          }
          deltaRang = rangA - ((antecedent % 14 - antecedent % 2) >> 1)
          console.log('delta : ', deltaRang, ' rangM : ', rangM, ' rangA : ', rangA)
          // l'axe est à droite de l'antécédent
          image = antecedent - 10 * deltaRang - 1 + 12 * (antecedent % 2) // ne me demandez pas d'où je sors ça !!!
          distracteurs.push(image - 1)
          if (deltaRang > 0) {
            distracteurs.push(antecedent + 2*(deltaRang+1))
          } else {
            distracteurs.push(antecedent + 3 * (deltaRang -1))
          }
          if (image - 13 > 0) {
            if (image % 14 === 13) {
              distracteurs.push(image - 2)
            } else {
                distracteurs.push(image - 13)
            }
          }
          if (image % 14 !== 13) distracteurs.push(image + 1)

          break
        case 3:

          break
        case 4:

          break
        case 5:

          break
      }
      return { antecedent: antecedent, image: image, distracteurs: distracteurs }
    }
    const axes = [ // contient des couples de numéros dont seront tirés les deux points servant à définir l'axe
      [[32, 34], [46, 48], [60, 62], [74, 76]], // axes horizontaux
      [[46, 59], [47, 60], [48, 61], [49, 62], [50, 63], [51, 64]], // axes verticaux
      [[32, 46], [34, 48], [36, 50], [38, 52]], // axes // à [AC]
      [[32, 44], [34, 46], [36, 48], [38, 50], [40, 52], [54, 66]], // axes // à [BC]
      [[6, 7], [20, 21], [18, 19], [32, 33], [30, 31], [44, 45], [42, 43]], // axes perpendiculaires à [BC]
      [[9, 10], [11, 12], [23, 24], [25, 26], [37, 38], [39, 40], [51, 52], [53, 54], [65, 66]] // axes perpendiculaires à [AC]
    ]
    if (parseInt(this.sup) === 1) {
      typesDeQuestionsDisponibles = [2, 1, 0]
    } else {
      typesDeQuestionsDisponibles = [1, 0, 2, 3, 4, 5]
    }
    const listeTypesDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, 3)
    const couleurs = ['blue', 'green', 'red']
    let M
    let N
    const d = []
    const question = []
    let choix
    for (let i = 0; i < 1; i++) {
      choix = randint(0, axes[listeTypesDeQuestions[i]].length - 1)
      switch (listeTypesDeQuestions[i]) { // ici on définit les 3 axes
        case 0: // axe horizontal
        case 2: // axe parallèle à [AC]
        case 3: // axe parallèle à [BC]
          console.log(axes[listeTypesDeQuestions[i]][choix][0], axes[listeTypesDeQuestions[i]][choix][1])
          M = triAngles[axes[listeTypesDeQuestions[i]][choix][0]].tri.listePoints[0]
          N = triAngles[axes[listeTypesDeQuestions[i]][choix][1]].tri.listePoints[0]
          d[i] = droite(M, N, `(d_${i + 1})`)
          d[i].color = couleurs[i]
          d[i].epaisseur = 2
          d[i].opacite = 0.7
          break
        case 1: // axe vertical
        case 4: // axe perpendicualire à [BC]
        case 5: // axe perpendicualire à [AC]
          M = triAngles[axes[listeTypesDeQuestions[i]][choix][0]].gra
          N = triAngles[axes[listeTypesDeQuestions[i]][choix][1]].gra
          d[i] = droite(M, N, `(d_${i + 1})`)
          d[i].color = couleurs[i]
          d[i].epaisseur = 2
          d[i].opacite = 0.7
          break
      }
      objetsEnonce.push(d[i])

      // ici on choisit les points et on crée les questions
      question[i] = choisitTriangle(i, listeTypesDeQuestions[i], choix)
      console.log('Antécédent : ', question[i].antecedent, ' Image : ', question[i].image, ' Distracteurs : ', question[i].distracteurs[0], question[i].distracteurs[1], question[i].distracteurs[2], question[i].distracteurs[3])
      triAngles[question[i].antecedent].tri.couleurDeRemplissage = 'black'
      triAngles[question[i].antecedent].tri.opaciteDeRemplissage = 0.5
      triAngles[question[i].image].tri.couleurDeRemplissage = 'pink'
      triAngles[question[i].image].tri.opaciteDeRemplissage = 0.7
      for (let j = 0; j < question[i].distracteurs.length; j++) {
        triAngles[question[i].distracteurs[j]].tri.couleurDeRemplissage = 'brown'
        triAngles[question[i].distracteurs[j]].tri.opaciteDeRemplissage = 0.3
      }
    }
    context.fenetreMathalea2d = [0, -0.1, 22, 14]
    texte += mathalea2d(paramsEnonce, objetsEnonce)
    texteCorr = texte

    // On ajoute au texte de la correction, la figure de la correction
    // texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  this.besoinFormulaireNumerique = ['Choix des axes :', 2, '1 : Axe horizontal\n2 : Axe vertical']
}
