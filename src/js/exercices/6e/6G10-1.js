import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { combinaisonListes, listeQuestionsToContenu, randint, choice, creerNomDePolygone, calcul } from '../../modules/outils.js'
import { point, tracePointSurDroite, droite, demiDroite, labelPoint, segment } from '../../modules/2d.js'

export const titre = 'Donner description et notation de droites, segments et demi-droites'

/**
 * Utiliser les notations des segments, droites et demi-droites
 * @author Rémi Angot
 * Référence 6G10-1
 */
export const uuid = 'd81c6'
export const ref = '6G10-1'
export default function DescriptionSegmentDroiteDemiDroite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Faire une phrase pour décrire le plus précisément possible la figure et donner sa notation mathématique.'
  this.nbQuestions = 3
  this.nbCols = 3
  this.nbColsCorr = 1

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const typesDeQuestionsDisponibles = [1, 4, choice([2, 3])]
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let listeDeNomsDePolygones
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (i % 5 === 0) listeDeNomsDePolygones = ['QD']
      const p = creerNomDePolygone(2, listeDeNomsDePolygones)
      listeDeNomsDePolygones.push(p)
      const A = point(0, calcul(randint(0, 20) / 10), p[0])
      const B = point(4, calcul(randint(0, 20) / 10), p[1])
      const t1 = tracePointSurDroite(A, B)
      const t2 = tracePointSurDroite(B, A)
      function creerDroiteDemiSegment (A, B) {
        let trait, correction
        switch (listeTypeDeQuestions[i]) {
          case 1:
            trait = droite(A, B)
            correction = `La droite qui passe par les points $${A.nom}$ et $${B.nom}$ notée $(${A.nom}${B.nom})$.`
            break
          case 2:
            trait = demiDroite(A, B)
            correction = `La demi-droite d'origine $${A.nom}$ passant par $${B.nom}$ notée $[${A.nom}${B.nom})$.`
            break
          case 3:
            trait = demiDroite(B, A)
            correction = `La demi-droite d'origine $${B.nom}$ passant par $${A.nom}$ notée $[${B.nom}${A.nom})$.`
            break
          case 4:
            trait = segment(A, B)
            correction = `Le segment d'extrémités $${A.nom}$ et $${B.nom}$ noté $[${A.nom}${B.nom}]$.`
            break
        }
        return [trait, correction]
      }
      const [dAB, dABCorr] = creerDroiteDemiSegment(A, B)
      const labels = labelPoint(A, B)
      texte = mathalea2d(
        { xmin: -2, ymin: -1, xmax: 7, ymax: 3, pixelsParCm: 40, scale: 0.6 },
        dAB,
        t1,
        t2,
        labels
      )
      texteCorr = dABCorr

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
