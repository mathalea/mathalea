import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, Triangles, tableauColonneLigne, miseEnEvidence } from '../../modules/outils.js'

export const titre = 'Déterminer un angle dans un triangle et sa nature'
export const dateDePublication = '11/01/2023'

/**
* Déterminer la valeur d'un angle dans un triangle et sa nature.
*
* Correction avec ou sans détails.
* * Triangle quelconque.
* * Triangle rectangle. 2 cas
* * Triangle isocèle. 2 cas
* * Triangle équilatéral
* @author Sébastien LOZANO
* Référence 5G31-2
*/

export default class anglesTrianglesTableau extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.sup = 1
    this.nbQuestions = 1
    this.spacing = 2
    this.consigneModifiable = false
    this.correctionDetailleeDisponible = true
    this.besoinFormulaireNumerique = ['Type de triangle', 5, ' 1 : Quelconque \n 2 : Rectangle \n 3 : Isocèle \n 4 : Équilatéral \n 5 : Mélange']
    // Une fonction pour calculer le troisième angle d'un triangle
    this.troisiemeAngle = function (a1, a2) {
      let sortie = -1
      if (a1 + a2 <= 180) {
        sortie = 180 - (a1 + a2)
      }
      return sortie
    }
    // Une fonction pour factoriser
    this.affichageFactorise = function (triangle, type) {
      const sortie = { enonce: { valeurs: [], noms: [], tableau: '' }, correction: { valeurs: [], noms: [], tableau: '', details: '' } }
      const choix = randint(0, 2)
      sortie.enonce.noms = [triangle.getAngles()[0], triangle.getAngles()[1], triangle.getAngles()[2]]
      sortie.correction.valeurs = [triangle.a1, triangle.a2, triangle.a3]
      sortie.correction.noms = [triangle.getAngles()[0], triangle.getAngles()[1], triangle.getAngles()[2]]
      switch (choix) {
        case 0:
          sortie.enonce.valeurs = ['\\ldots', triangle.a2, triangle.a3]
          sortie.correction.details =  `Donc ${sortie.enonce.noms[0]} $=180\\degree-($ ${sortie.enonce.noms[1]} $+$ ${sortie.enonce.noms[2]} $)$.<br>`
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
          sortie.correction.details =  `Donc ${sortie.enonce.noms[1]} $=180\\degree-($ ${sortie.enonce.noms[0]} $+$ ${sortie.enonce.noms[2]} $)$.<br>`
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
          sortie.correction.details =  `Donc ${sortie.enonce.noms[2]} $=180\\degree-($ ${sortie.enonce.noms[1]} $+$ ${sortie.enonce.noms[0]} $)$.<br>`
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
          sortie.natureTriangleCorr = `Le triangle ${triangle.getNom()} ne présente aucune particularité donc c'est un triangle ${type}.`
          break
      }
      // On mélange pour l'affichage
      const anglesEnonce = this.affichageFactorise(triangle, type).enonce
      const anglesCorrection = this.affichageFactorise(triangle, type).correction
      sortie.texte = anglesEnonce.tableau
      sortie.texteCorr = `Dans le triangle ${triangle.getNom()}, `
      if (this.correctionDetaillee) {
        sortie.texteCorr += `${anglesEnonce.noms[0]} + ${anglesEnonce.noms[1]} + ${anglesEnonce.noms[2]} $=180\\degree$<br>`
        sortie.texteCorr += anglesCorrection.details
      }
      sortie.texteCorr += `${anglesCorrection.tableau} <br>`
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
      case 1:
        typesDeQuestionsDisponibles = [1]
        break
      case 2:
        typesDeQuestionsDisponibles = [1]
        break
      case 3:
        typesDeQuestionsDisponibles = [1]
        break
      case 4:
        typesDeQuestionsDisponibles = [1]
        break
      case 5:
        typesDeQuestionsDisponibles = [1]
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
        //   // On crée le triangle
        //   const triangle = new Triangles()
        //   triangle.a1 = randint(10, 40)
        //   triangle.a2 = randint(20, 100)
        //   triangle.a3 = this.troisiemeAngle(triangle.a1, triangle.a2)
        //   // On mélange pour l'affichage
        //   const angles = this.affichageAnglesTableau(`${triangle.a1}\\degree`, `${triangle.a2}\\degree`, `${triangle.a3}\\degree`)
        //   texte = `${tableauColonneLigne(
        //     [`\\text{${triangle.getAngles()[0]}}`, `\\text{${triangle.getAngles()[1]}}`, `\\text{${triangle.getAngles()[2]}}`, '\\text{Nature du triangle}'],
        //     [angles[0]],
        //     [angles[1], angles[2], '']
        //   )}`
        //   if (this.correctionDetaillee) {
        //     texteCorr += `${triangle.getAngles()[0]} + ${triangle.getAngles()[1]} + ${triangle.getAngles()[2]} $=180\\degree$<br>`
        //     texteCorr += `Donc ${triangle.getAngles()[2]} $=180-($ ${triangle.getAngles()[0]} $+$ ${triangle.getAngles()[1]} $)$.<br>D'où le tableau complété : <br>`
        //   }
        //   texteCorr += `${tableauColonneLigne(
        //     [`\\text{${triangle.getAngles()[0]}}`, `\\text{${triangle.getAngles()[1]}}`, `\\text{${triangle.getAngles()[2]}}`, '\\text{Nature du triangle}'],
        //     [`${triangle.a1}\\degree`],
        //     [`${triangle.a2}\\degree`, `${triangle.a3}\\degree`, '\\text{quelconque}']
        //   )}`
        // }
          break
      }

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
