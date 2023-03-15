import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, Triangles, tableauColonneLigne, miseEnEvidence } from '../../modules/outils.js'

export const titre = 'Déterminer un angle dans un triangle et sa nature'
export const dateDePublication = '11/01/2023'

/**
* Déterminer la valeur d'un angle dans un triangle et sa nature.
*
* Correction avec ou sans détails.
* * Triangle quelconque.
* * Triangle rectangle.
* * Triangle isocèle.
* * Triangle isocèle rectangle.
* * Triangle équilatéral
* @author Sébastien LOZANO
* Référence 5G31-2
*/

export const uuid = 'c2f77'
export const ref = '5G31-2'
export default class anglesTrianglesTableau extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.sup = 1
    this.nbQuestions = 1
    context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1.5
    context.isHtml ? this.spacing = 2 : this.spacing = 2
    this.consigneModifiable = false
    this.correctionDetailleeDisponible = true
    // Correction détaillée par défaut
    this.correctionDetaillee = true
    this.besoinFormulaireNumerique = ['Type de triangle', 4, ' 1 : Quelconque \n 2 : Rectangle \n 3 : Isocèle-Équilatéral \n 4 : Mélange']
    // Une fonction pour calculer le troisième angle d'un triangle
    this.troisiemeAngle = function (a1, a2) {
      let sortie = -1
      if (a1 + a2 < 180) {
        sortie = 180 - (a1 + a2)
      }
      return sortie
    }
    // Une fonction pour factoriser
    this.affichageFactorise = function (triangle, type, choix) {
      const sortie = { enonce: { valeurs: [], noms: [], tableau: '' }, correction: { valeurs: [], noms: [], tableau: '', details: '' } }
      sortie.enonce.noms = [triangle.getAngles()[0], triangle.getAngles()[1], triangle.getAngles()[2]]
      sortie.correction.valeurs = [triangle.a1, triangle.a2, triangle.a3]
      sortie.correction.noms = [triangle.getAngles()[0], triangle.getAngles()[1], triangle.getAngles()[2]]
      switch (choix) {
        case 0:
          sortie.enonce.valeurs = ['\\ldots', triangle.a2, triangle.a3]
          sortie.correction.details = `Donc ${sortie.enonce.noms[0]} $=180\\degree-($ ${sortie.enonce.noms[1]} $+$ ${sortie.enonce.noms[2]} $)$.<br>`
          sortie.correction.details += `Donc ${sortie.enonce.noms[0]} $=180\\degree-( ${sortie.enonce.valeurs[1]}\\degree + ${sortie.enonce.valeurs[2]}\\degree )$.<br>`
          sortie.correction.details += `Donc ${sortie.enonce.noms[0]} $=180\\degree-${sortie.enonce.valeurs[1] + sortie.enonce.valeurs[2]}\\degree$.<br>`
          sortie.correction.details += `Donc ${sortie.enonce.noms[0]} $=${180 - sortie.enonce.valeurs[1] - sortie.enonce.valeurs[2]}\\degree$.<br>`
          sortie.correction.tableau = `${tableauColonneLigne(
            [`\\text{${sortie.enonce.noms[0]}}`, `\\text{${sortie.enonce.noms[1]}}`, `\\text{${sortie.enonce.noms[2]}}`, '\\text{Nature du triangle}'],
            [miseEnEvidence(`${sortie.correction.valeurs[0]}\\degree`)],
            [`${sortie.correction.valeurs[1]}\\degree`, `${sortie.correction.valeurs[2]}\\degree`, miseEnEvidence(`\\text{${type}}`)]
          )}`
          break
        case 1:
          sortie.enonce.valeurs = [triangle.a1, '\\ldots', triangle.a3]
          sortie.correction.details = `Donc ${sortie.enonce.noms[1]} $=180\\degree-($ ${sortie.enonce.noms[0]} $+$ ${sortie.enonce.noms[2]} $)$.<br>`
          sortie.correction.details += `Donc ${sortie.enonce.noms[1]} $=180\\degree-( ${sortie.enonce.valeurs[0]}\\degree + ${sortie.enonce.valeurs[2]}\\degree )$.<br>`
          sortie.correction.details += `Donc ${sortie.enonce.noms[1]} $=180\\degree-${sortie.enonce.valeurs[0] + sortie.enonce.valeurs[2]}\\degree$.<br>`
          sortie.correction.details += `Donc ${sortie.enonce.noms[1]} $=${180 - sortie.enonce.valeurs[0] - sortie.enonce.valeurs[2]}\\degree$.<br>`
          sortie.correction.tableau = `${tableauColonneLigne(
            [`\\text{${sortie.enonce.noms[0]}}`, `\\text{${sortie.enonce.noms[1]}}`, `\\text{${sortie.enonce.noms[2]}}`, '\\text{Nature du triangle}'],
            [`${sortie.correction.valeurs[0]}\\degree`],
            [miseEnEvidence(`${sortie.correction.valeurs[1]}\\degree`), `${sortie.correction.valeurs[2]}\\degree`, miseEnEvidence(`\\text{${type}}`)]
          )}`
          break
        case 2:
          sortie.enonce.valeurs = [triangle.a1, triangle.a2, '\\ldots']
          sortie.correction.details = `Donc ${sortie.enonce.noms[2]} $=180\\degree-($ ${sortie.enonce.noms[1]} $+$ ${sortie.enonce.noms[0]} $)$.<br>`
          sortie.correction.details += `Donc ${sortie.enonce.noms[2]} $=180\\degree-( ${sortie.enonce.valeurs[1]}\\degree + ${sortie.enonce.valeurs[0]}\\degree )$.<br>`
          sortie.correction.details += `Donc ${sortie.enonce.noms[2]} $=180\\degree-${sortie.enonce.valeurs[1] + sortie.enonce.valeurs[0]}\\degree$.<br>`
          sortie.correction.details += `Donc ${sortie.enonce.noms[2]} $=${180 - sortie.enonce.valeurs[1] - sortie.enonce.valeurs[0]}\\degree$.<br>`
          sortie.correction.tableau = `${tableauColonneLigne(
            [`\\text{${sortie.enonce.noms[0]}}`, `\\text{${sortie.enonce.noms[1]}}`, `\\text{${sortie.enonce.noms[2]}}`, '\\text{Nature du triangle}'],
            [`${sortie.correction.valeurs[0]}\\degree`],
            [`${sortie.correction.valeurs[1]}\\degree`, miseEnEvidence(`${sortie.correction.valeurs[2]}\\degree`), miseEnEvidence(`\\text{${type}}`)]
          )}`
          break
      }
      sortie.enonce.tableau = `${tableauColonneLigne(
        [`\\text{${sortie.enonce.noms[0]}}`, `\\text{${sortie.enonce.noms[1]}}`, `\\text{${sortie.enonce.noms[2]}}`, '\\text{Nature du triangle}'],
        [`${sortie.enonce.valeurs[0]}\\degree`],
        [`${sortie.enonce.valeurs[1]}\\degree`, `${sortie.enonce.valeurs[2]}\\degree`, '']
      )}`

      return sortie
    }
    // Une fonction pour le controle de tous les cas
    this.typeTriangle = function (type) {
      const sortie = { texte: '', texteCorr: '', natureTriangleCorr: '' }
      // On crée le triangle
      const triangle = new Triangles()
      switch (type) {
        case 'quelconque':
          triangle.a1 = randint(10, 40, [90])
          triangle.a2 = randint(20, 100, [triangle.a1, 90, 90 - triangle.a1])
          triangle.a3 = this.troisiemeAngle(triangle.a1, triangle.a2)
          while (triangle.a3 === -1) {
            triangle.a1 = randint(10, 40, [90])
            triangle.a2 = randint(20, 100, [triangle.a1, 90, 90 - triangle.a1])
            triangle.a3 = this.troisiemeAngle(triangle.a1, triangle.a2)
          }
          sortie.natureTriangleCorr = `Le triangle ${triangle.getNom()} ne présente aucune particularité donc c'est un triangle ${type}.`
          break
        case 'rectangle':
          triangle.a1 = 90
          triangle.a2 = randint(20, 100, [triangle.a1])
          triangle.a3 = this.troisiemeAngle(triangle.a1, triangle.a2)
          while (triangle.a3 === -1) {
            triangle.a1 = 90
            triangle.a2 = randint(20, 100, [triangle.a1])
            triangle.a3 = this.troisiemeAngle(triangle.a1, triangle.a2)
          }
          sortie.natureTriangleCorr = `Le triangle ${triangle.getNom()} a un angle droit donc c'est un triangle ${type}.`
          break
        case 'isocèle':
          triangle.a1 = randint(20, 100, [90])
          triangle.a2 = triangle.a1
          triangle.a3 = this.troisiemeAngle(triangle.a1, triangle.a2)
          while (triangle.a3 === -1) {
            triangle.a1 = randint(20, 100, [90])
            triangle.a2 = triangle.a1
            triangle.a3 = this.troisiemeAngle(triangle.a1, triangle.a2)
          }
          sortie.natureTriangleCorr = `Le triangle ${triangle.getNom()} a deux angles égaux donc c'est un triangle ${type}.`
          break
        case 'isocèle rectangle':
          triangle.a1 = 90
          triangle.a2 = 45
          triangle.a3 = triangle.a2
          sortie.natureTriangleCorr = `Le triangle ${triangle.getNom()} a deux angles égaux et un angle droit donc c'est un triangle ${type}.`
          break
        case 'équilatéral':
          triangle.a1 = 60
          triangle.a2 = 60
          triangle.a3 = triangle.a2
          sortie.natureTriangleCorr = `Le triangle ${triangle.getNom()} a trois angles égaux donc c'est un triangle ${type}.`
          break
      }
      // On choisit l'angle çà calculer aléatoirement
      const choix = randint(0, 2)
      // On mélange pour l'affichage
      const anglesEnonce = this.affichageFactorise(triangle, type, choix).enonce
      const anglesCorrection = this.affichageFactorise(triangle, type, choix).correction
      sortie.texte = anglesEnonce.tableau
      if (this.correctionDetaillee) {
        sortie.texteCorr = `Dans le triangle ${triangle.getNom()}, `
        sortie.texteCorr += `${anglesEnonce.noms[0]} + ${anglesEnonce.noms[1]} + ${anglesEnonce.noms[2]} $=180\\degree$<br>`
        sortie.texteCorr += `${anglesCorrection.details}<br>`
      }
      sortie.texteCorr += context.isHtml ? '' : '\\medskip '
      sortie.texteCorr += `${anglesCorrection.tableau} <br>`
      sortie.texteCorr += context.isHtml ? '' : '<br>\\medskip '
      if (this.correctionDetaillee) {
        sortie.texteCorr += sortie.natureTriangleCorr
      }
      return sortie
    }
  }

  nouvelleVersion (numeroExercice) {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let typesDeQuestionsDisponibles
    switch (this.sup) {
      case 1: // quelconque
        typesDeQuestionsDisponibles = [1]
        break
      case 2: // rectangle
        typesDeQuestionsDisponibles = [2, 4]
        break
      case 3: // isocele - equilatéral
        typesDeQuestionsDisponibles = [3, 4, 5]
        break
      case 4:
        typesDeQuestionsDisponibles = [1, 2, 3, 4, 5]
        break
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    this.nbQuestions === 1 ? this.consigne = 'Compléter le tableau suivant avec la mesure de l\'angle manquant et la nature du triangle.' : this.consigne = 'Compléter les tableaux suivants avec la mesure de l\'angle manquant et la nature du triangle.'

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (this.correctionDetaillee) { texteCorr = 'Dans un triangle, la somme des angles est égale à $180\\degree$.<br>' } else { texteCorr = '' }
      switch (listeTypeDeQuestions[i]) {
        case 1: { // triangle quelconque
          const currentTriangle = this.typeTriangle('quelconque')
          texte = currentTriangle.texte
          texteCorr = currentTriangle.texteCorr
        }
          break
        case 2: { // triangle rectangle
          const currentTriangle = this.typeTriangle('rectangle')
          texte = currentTriangle.texte
          texteCorr = currentTriangle.texteCorr
        }
          break
        case 3: { // triangle isocèle
          const currentTriangle = this.typeTriangle('isocèle')
          texte = currentTriangle.texte
          texteCorr = currentTriangle.texteCorr
        }
          break
        case 4: { // triangle isocèle rectangle
          const currentTriangle = this.typeTriangle('isocèle rectangle')
          texte = currentTriangle.texte
          texteCorr = currentTriangle.texteCorr
        }
          break
        case 5: { // triangle équilatéral
          const currentTriangle = this.typeTriangle('équilatéral')
          texte = currentTriangle.texte
          texteCorr = currentTriangle.texteCorr
        }
          break
      }

      texte += '<br>'

      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
