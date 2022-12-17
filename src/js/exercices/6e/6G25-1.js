import Exercice from '../Exercice.js'
import { colorToLatexOrHTML, mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { choice, combinaisonListes, listeQuestionsToContenu, randint, stringNombre, texteEnCouleur, numAlpha } from '../../modules/outils.js'
import { centreGraviteTriangle, droite, point, polygone, rotation, symetrieAxiale, texteParPointEchelle, translation, vecteur } from '../../modules/2d.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { symetrieAnimee } from '../../modules/2dAnimation.js'
export const titre = 'Utiliser des symétries axiales en pavage triangulaire'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
* Référence 6G25-1
* Relecture : Novembre 2021 par EE
*/

export const uuid = '49cb2'
export const ref = '6G25-1'
export default function SymetrieAxialePavageTriangulaire () {
  'use strict'
  Exercice.call(this)
  this.titre = 'Symétrie axiale dans un pavage de triangles équilatéraux'
  this.nbQuestionsModifiable = false // désactive le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.nbQuestions = 3
  this.nbQuestionsModifiable = false
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  context.fenetreMathalea2d = [0, -0.1, 15, 10]
  this.sup = false
  // on Choisit trois axes parmi les possibilités prédéfinies... 6 types d'axes laissant le pavage invariant
  // un axe horizontal passe par les sommets 0 de deux triangles d'indices 2n et 2n+2 (sauf si 2n%14=12)
  // un axe vertical passe par les centres de gravités de deux triangles d'indice i et i+13 (sauf si i%14=0)
  // un axe parallèle à [AC] passe par les sommets 0 de deux triangles d'indices 2n et 2n+14
  // un axe parallèle à [BC] passe par les sommets 0 de deux triangles d'indices 2n et 2n+12 (sauf si 2n%14=0)
  // un axe perpendiculaire à [BC] passe par les centres de gravité de deux triangles d'indice 2n et 2n+1
  // un axe perpendiculaire à [AC] passe par les centres de gravité de deux triangles d'indice 2n+1 et 2n+2 (sauf si (2n+1)%14=13)

  const axes = [ // contient des couples de numéros dont seront tirés les deux points servant à définir l'axe
    [[32, 34], [46, 48], [60, 62], [74, 76]], // axes horizontaux
    [[46, 59], [47, 60], [48, 61], [49, 62], [50, 63], [51, 64]], // axes verticaux
    [[32, 46], [34, 48], [36, 50], [38, 52]], // axes // à [AC]
    [[44, 56], [46, 58], [48, 60], [50, 62], [52, 64], [54, 66]], // axes // à [BC]
    [[4, 5], [2, 3], [0, 1], [14, 15], [28, 29]], // axes perpendiculaires à [BC]
    [[42, 31], [43, 44], [56, 45], [57, 58], [70, 59], [71, 72]] // axes perpendiculaires à [AC]
  ]
  // fonction qui choisit un triangle selon le type d'axe et sa position retourne le triangle choisi, son image et des distracteurs pour un QCM
  const choisitTriangle = function (typeAxe, index) { // retourne {antecedent: number, image: number, distracteurs: [number]}
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
        // l'axe est à droite de l'antécédent
        image = antecedent - 10 * deltaRang - 1 + 12 * (antecedent % 2) // ne me demandez pas d'où je sors ça !!!
        distracteurs.push(image - 1)
        if (deltaRang > 0) {
          distracteurs.push(antecedent + 2 * (deltaRang + 1))
        } else {
          distracteurs.push(antecedent + 3 * (deltaRang - 1))
        }
        if (image - 13 > 0) {
          if (image % 14 === 13) {
            distracteurs.push(image - 2)
          } else {
            distracteurs.push(image - 13)
          }
        } else {
          distracteurs.push(image + 13)
        }

        if (image % 14 !== 13) distracteurs.push(image + 1)

        break
      case 3:
        figA = axes[typeAxe][index][0] // figA un nombre pair entre 44 et 54 inclus. l'axe passe par son sommet gauche
        rangA = (figA - 42) >> 1 // le rang de gauche à droite. rangA va de 1 à 6 inclus
        if (rangA < 4) { // l'antécédent sera à gauche de l'axe
          rangM = randint(0, Math.min(2 + rangA, 6)) // on choisit la rangée verticale de l'antécédent
          // l'antécédent doit être choisit entre 0 et ?
          antecedent = rangM * 14 + 2 * randint(0, 2 + rangA - rangM)
        } else { // l'antécédent sera à droite de l'axe
          rangM = randint(rangA - 2, 6) // on choisit la rangée verticale de l'antécédent
          // l'antécédent doit être choisit entre rangA*2 + 1 + rangM*14 et rangM*14+(rangA+1)*2
          antecedent = rangM * 14 + randint(rangA * 2, 13)
        }
        rangN = antecedent % 14
        rangN -= rangN % 2
        rangN = rangN / 2
        deltaRang = rangA - rangN + 3 - rangM
        // l'axe est à droite de l'antécédent
        image = antecedent + 16 * deltaRang - 15 - 2 * (antecedent % 2) // ne me demandez pas d'où je sors ça !!!
        if (image > 0) {
          distracteurs.push(image - 1)
        }
        if (image < 97) {
          distracteurs.push(image + 1)
        }
        if (image - 13 > 0) {
          if (image % 14 === 13) {
            distracteurs.push(image - 2)
          } else {
            distracteurs.push(image - 13)
          }
        } else {
          distracteurs.push(image + 14)
        }
        if (image + 13 < 97) {
          if (image % 14 === 0) {
            distracteurs.push(image + 2)
          } else {
            distracteurs.push(image + 13)
          }
        }
        break
      case 4:
        figA = axes[typeAxe][index][0] // figA un nombre pair entre 44 et 54 inclus. l'axe passe par son sommet gauche
        rangA = figA % 14 // le rang de gauche à droite. rangA va de 1 à 6 inclus
        if (index < 2) { // l'antécédent sera sous l'axe qui est sous la diagonale
          rangM = randint(0, 3 + index) // on choisit la rangée verticale de l'antécédent
          antecedent = rangM * 14 + randint((3 + rangM - index) * 2, 13)
        } else if (index > 2) { // l'antécédent sera au dessus de l'axe qui est au dessus
          rangM = randint(index, 6) // on choisit la rangée verticale de l'antécédent
          antecedent = rangM * 14 + randint(0, rangM + 2 * (4 - index))
        } else { // l'antécédent est partout sauf sur la diagonale car c'est l'axe
          rangM = randint(0, 6)
          antecedent = rangM * 14 + randint(0, 13, [rangM * 2, rangM * 2 + 1, rangM * 2 - 1])
        }
        deltaRang = 4 - index * 2 + 16 * rangM - (antecedent >> 1) * 2 // Vaudrait mieux que ça marche... je ne sais pas où je vais chercher tout ça !
        if (deltaRang > 0) {
          deltaRang >>= 1
        } else {
          deltaRang = -((-deltaRang) >> 1)
        }
        // l'axe est à droite de l'antécédent
        image = antecedent - 12 * deltaRang
        if (image > 0) {
          distracteurs.push(image - 1)
        }
        if (image < 97) {
          distracteurs.push(image + 1)
        }
        if (image - 13 > 0) {
          if (image % 14 === 13) {
            distracteurs.push(image - 2)
          } else {
            distracteurs.push(image - 13)
          }
        } else {
          distracteurs.push(image + 14)
        }
        if (image + 13 < 97) {
          if (image % 14 === 0) {
            distracteurs.push(image + 2)
          } else {
            distracteurs.push(image + 13)
          }
        }
        break
      case 5:
        figA = axes[typeAxe][index][0] // figA un nombre pair entre 44 et 54 inclus. l'axe passe par son sommet gauche
        rangA = Math.floor(figA / 14) // le rang de gauche à droite. rangA va de 1 à 6 inclus
        if (index < 4) { // l'antécédent sera sous l'axe
          rangM = randint(1, rangA - 2) // on choisit la rangée verticale de l'antécédent
          rangN = randint(rangA - rangM, 4 * (rangA - rangM) + 2 * (figA % 2) - 2)
          antecedent = rangM * 14 + rangN
        } else { // l'antécédent sera au dessus de l'axe
          rangM = randint(rangA - 1, 5) // on choisit la rangée verticale de l'antécédent
          rangN = randint(4 * (rangA - rangM) + 2 * (figA % 2) + 2, 12)
          antecedent = rangM * 14 + rangN
        }
        deltaRang = 44 + 14 * (index >> 1) + 2 * (index % 2) + 10 * (rangM - rangA) - (antecedent >> 1) * 2 // Vaudrait mieux que ça marche... je ne sais pas où je vais chercher tout ça !
        if (deltaRang > 0) {
          deltaRang >>= 1
        } else {
          deltaRang = -((-deltaRang) >> 1)
        }
        // l'axe est à droite de l'antécédent
        image = antecedent + 14 * deltaRang - 14 * (1 + antecedent % 2)
        if (image > 0) {
          distracteurs.push(image - 1)
        }
        if (image < 97) {
          distracteurs.push(image + 1)
        }
        if (image - 13 > 0) {
          if (image % 14 === 13) {
            distracteurs.push(image - 2)
          } else {
            distracteurs.push(image - 13)
          }
        } else {
          distracteurs.push(image + 14)
        }
        if (image + 13 < 97) {
          if (image % 14 === 0) {
            distracteurs.push(image + 2)
          } else {
            distracteurs.push(image + 13)
          }
        }
        break
    }
    return { antecedent, image, distracteurs }
  }

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autocorrection = []
    const objetsEnonce = []
    let paramsEnonce = {}
    let texte = ''
    let texteCorr = ''
    let typesDeQuestionsDisponibles
    const scaleFigure = 1
    // construction du pavage triangulaire
    const triAngles = [{}] // tableau des triangles { tri: polygone (le triangle), gra: point(son centre de gravité), num: texteParPoint(son numéro)} l'indice du triangle est son numéro
    const images = []
    const A = point(0, 0, '')
    const B = point(1.2, 0, '')
    const C = rotation(B, A, 60, '')
    const v = vecteur(1.2, 0)
    const w = rotation(vecteur(1.2, 0), A, 60)
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
      triAngles[i].n = texteParPointEchelle(stringNombre(i), triAngles[i].gra, 'milieu', 'black', 0.5)
      objetsEnonce.push(triAngles[i].tri, triAngles[i].n)
    }
    paramsEnonce = { xmin: 0, ymin: -0.1, xmax: 15, ymax: 10, pixelsParCm: 30 * scaleFigure, zoom: 1.5, scale: scaleFigure * 0.7, mainlevee: false }
    if (!this.sup) {
      this.nbQuestions = 3
      typesDeQuestionsDisponibles = [0, 1, 2]
    } else {
      this.nbQuestions = 6
      typesDeQuestionsDisponibles = [0, 1, 2, 3, 4, 5]
    }
    const listeTypesDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, 3)
    const couleurs = ['blue', 'green', 'red', 'gray', 'magenta', 'purple']
    let M
    let N
    const d = []
    const question = []
    let choix
    for (let i = 0; i < this.nbQuestions; i++) {
      choix = randint(0, axes[listeTypesDeQuestions[i]].length - 1)
      switch (listeTypesDeQuestions[i]) { // ici on définit les 3 axes
        case 0: // axe horizontal
        case 2: // axe parallèle à [AC]
        case 3: // axe parallèle à [BC]
          M = triAngles[axes[listeTypesDeQuestions[i]][choix][0]].tri.listePoints[0]
          N = triAngles[axes[listeTypesDeQuestions[i]][choix][1]].tri.listePoints[0]
          d[i] = droite(M, N, `$(d_${i + 1})$`, couleurs[i])
          d[i].epaisseur = 3
          d[i].opacite = 0.6
          break
        case 1: // axe vertical
        case 4: // axe perpendiculaire à [BC]
        case 5: // axe perpendiculaire à [AC]
          M = triAngles[axes[listeTypesDeQuestions[i]][choix][0]].gra
          N = triAngles[axes[listeTypesDeQuestions[i]][choix][1]].gra
          d[i] = droite(M, N, `$(d_${i + 1})$`, couleurs[i])
          d[i].epaisseur = 3
          d[i].opacite = 0.6
          break
      }
      objetsEnonce.push(d[i])
      // ici on choisit les figures et on crée les questions
      question[i] = choisitTriangle(listeTypesDeQuestions[i], choix)
      triAngles[question[i].antecedent].tri.couleurDeRemplissage = colorToLatexOrHTML(couleurs[i])
      triAngles[question[i].antecedent].tri.opaciteDeRemplissage = 0.7
    }
    this.introduction = mathalea2d(paramsEnonce, objetsEnonce)
    for (let i = 0; i < this.nbQuestions; i++) {
      texte = `${texteEnCouleur("Quelle est l'image de la figure " + question[i].antecedent + " par la symétrie axiale d'axe " + d[i].nom + ' ?', couleurs[i])}`
      texteCorr = `${texteEnCouleur("L'image de la figure " + question[i].antecedent + " par la symétrie axiale d'axe " + d[i].nom + ' est la figure ' + question[i].image + '.', couleurs[i])}`
      if (context.isAmc) {
        if (i === 0) {
          this.autoCorrection[0] = {
            enonce: this.introduction + '\\\\\n' + numAlpha(0) + texte + '\\\\\n',
            propositions: [
              {
                type: 'qcmMono',
                propositions: [
                  {
                    texte: question[i].image,
                    statut: true,
                    feedback: ''
                  }
                ]
              }
            ]
          }
        } else {
          this.autoCorrection[0].enonce += `${numAlpha(i)} ${texte} \\\\\n`
          this.autoCorrection[0].propositions.push({
            type: 'qcmMono',
            propositions: [
              {
                texte: question[i].image,
                statut: true,
                feedback: ''
              }
            ]
          })
        }

        for (let j = 0; j < question[i].distracteurs.length; j++) {
          this.autoCorrection[0].propositions[i].propositions.push({
            texte: question[i].distracteurs[j],
            statut: false,
            feedback: ''
          })
        }
      } else {
        this.autoCorrection[i] = {
          enonce: (context.isAmc ? this.introduction + '\\\\' + texte : texte),
          propositions: [{
            texte: question[i].image,
            statut: true,
            feedback: ''
          }
          ]
        }
        for (let j = 0; j < question[i].distracteurs.length; j++) {
          this.autoCorrection[i].propositions.push({
            texte: question[i].distracteurs[j],
            statut: false,
            feedback: ''
          })
        }
      }
      objetsEnonce.push(symetrieAnimee(triAngles[question[i].antecedent].tri, d[i], `id="anim${numeroExercice}-${i}" dur="2s" repeatCount="2" `))
      images[i] = symetrieAxiale(triAngles[question[i].antecedent].tri, d[i])
      images[i].couleurDeRemplissage = colorToLatexOrHTML(couleurs[i])
      images[i].opaciteDeRemplissage = 0.3
      objetsEnonce.push(images[i])
      // On ajoute au texte de la correction, la figure de la correction
      // texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
      if (this.interactif && !context.isAmc) {
        texte += '<br>' + propositionsQcm(this, i).texte
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
    // this.contenuCorrection += '<br>' + mathalea2d(paramsEnonce, objetsEnonce)
    this.contenuCorrection += mathalea2d(paramsEnonce, objetsEnonce)
    if (context.isHtml) {
      for (let i = 0; i < this.nbQuestions; i++) {
        this.contenuCorrection += `<br><button class="btn ui labeled icon button"  style="margin:10px" onclick="document.getElementById('anim${numeroExercice}-${i}').beginElement()"><i class="redo circle icon"></i>Relancer l'animation de la symétrie par rapport à ${d[i].nom}</button>`
      }
    }
  }
  this.besoinFormulaireCaseACocher = ['Nombre d\'axes de symétrie = 6 si coché, 3 sinon', false]
}
