import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, shuffle, miseEnEvidence } from '../../modules/outils.js'
import { point, codageAngleDroit, droite, droiteParPointEtPerpendiculaire, pointSurDroite, droiteParPointEtPente, labelPoint } from '../../modules/2d.js'
export const titre = 'Se servir des relations entre perpendicularité et parallélisme'

export const dateDePublication = '11/09/2022'

/**
 * d0 et d1 sont parallèles données par l’énoncé
 * d1 et d2 sont perpendiculaires à d3
 * d4 perpendiculaire à d3 non marquée
 * d5 (et d6 ?) random
 *
 * Question :
 * Donner tous les couples de droites parallèles en justifiant.
 * Ou
 * Donner tous les couples de droites perpendiculaires en justifiant
 * @author Guillaume Valmont
 * Référence 6G52
*/
export default class TracerCarresRectangleslongueurDonnees extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 2

    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = false

    this.besoinFormulaireNumerique = ['Consigne', 3, '1 : Droites parallèles\n2 : Droites perpendiculaires\n3 : Mélange']
    this.sup = 3
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    let typesDeQuestionsDisponibles = ['Parallèles', 'Perpendiculaires']
    if (this.sup === 1) typesDeQuestionsDisponibles = ['Parallèles']
    if (this.sup === 2) typesDeQuestionsDisponibles = ['Perpendiculaires']

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const objetsEnonce = []
      const noms = shuffle(['(d_1)', '(d_2)', '(d_3)', '(d_4)', '(d_5)', '(d_6)', '(d_7)'])
      const couleurs = shuffle(['BlueViolet', 'Crimson', 'ForestGreen', 'IndianRed', 'Navy', 'SteelBlue', 'GoldenRod'])
      const x = []
      const y = []
      for (let i = 0; i < 6; i++) {
        x.push(randint(-3, 3, x))
        y.push(randint(-3, 3, y))
      }
      for (let i = 0; i < 6; i++) {
        x[i] = x[i] * 2 + randint(-10, 10) / 20
        y[i] = y[i] * 2 + randint(-10, 10) / 20
      }
      const P03 = point(x[0], y[0], `$${miseEnEvidence(noms[0], couleurs[0])}$`, 'above left')
      const P13 = point(x[1], y[0] + randint(-10, 10) / 10, `$${miseEnEvidence(noms[1], couleurs[1])}$`, 'above left')
      const d3 = droite(P03, P13, '', couleurs[3])
      const P23 = pointSurDroite(d3, x[2], `$${miseEnEvidence(noms[2], couleurs[2])}$`, 'above left')
      const P43 = pointSurDroite(d3, x[3], `$${miseEnEvidence(noms[4], couleurs[4])}$`, 'above left')
      const P53 = pointSurDroite(d3, x[4], `$${miseEnEvidence(noms[5], couleurs[5])}$`, 'above left')
      const P63 = pointSurDroite(d3, x[5], `$${miseEnEvidence(noms[6], couleurs[6])}$`, 'above left')
      const P3 = pointSurDroite(d3, Math.max(P03.x, P13.x, P23.x, P43.x, P53.x, P63.x) + 1, `$${miseEnEvidence(noms[3], couleurs[3])}$`, 'right')
      const d0 = droiteParPointEtPerpendiculaire(P03, d3, '', couleurs[0])
      const d1 = droiteParPointEtPerpendiculaire(P13, d3, '', couleurs[1])
      const d2 = droiteParPointEtPerpendiculaire(P23, d3, '', couleurs[2])
      const d4 = droiteParPointEtPerpendiculaire(P43, d3, '', couleurs[4])
      const d5 = droiteParPointEtPente(P53, randint(-3, 3, [0]), '', couleurs[5])
      const d6 = droiteParPointEtPente(P63, randint(-3, 3, [0]), '', couleurs[6])
      const P1 = pointSurDroite(d1, 10)
      const P2 = pointSurDroite(d2, 10)
      const A13 = codageAngleDroit(P1, P13, P43, couleurs[1])
      const A23 = codageAngleDroit(P2, P23, P43, couleurs[2])
      objetsEnonce.push(d0, d1, d2, d3, d4, d5, d6, A13, A23, labelPoint(P03, P13, P23, P43, P53, P63, P3))
      // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
      const xmin = Math.min(P03.x, P13.x, P23.x, P43.x, P53.x, P63.x) - 2
      const xmax = Math.max(P03.x, P13.x, P23.x, P43.x, P53.x, P63.x) + 2
      const ymin = Math.min(P03.y, P13.y, P23.y, P43.y, P53.y, P63.y) - 4
      const ymax = Math.max(P03.y, P13.y, P23.y, P43.y, P53.y, P63.y) + 4
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      const params = { xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 20, scale: 1 }
      // On ajoute au texte de la correction, la figure de la correction
      function texDroite (indice) {
        return `$${miseEnEvidence(noms[indice], couleurs[indice])}$`
      }
      texte = `Les droites ${texDroite(0)} et ${texDroite(1)} sont parallèles.<br>`
      switch (listeTypeDeQuestions[i]) {
        case 'Parallèles':
          texte += 'Donner tous les couples de droites parallèles en justifiant'
          texteCorr = `D'après l'énoncé, les droites ${texDroite(0)} et ${texDroite(1)} sont parallèles.<br><br>`
          texteCorr += `Les droites ${texDroite(2)} et ${texDroite(1)} sont perpendiculaires à la même droite ${texDroite(3)}`
          this.correctionDetaillee ? texteCorr += '.<br>Or, si deux droites sont perpendiculaires à une même droite alors elles sont parallèles entre elles.<br>E' : texteCorr += ', e'
          texteCorr += 'lles sont donc parallèles.<br><br>'
          texteCorr += `Les droites ${texDroite(0)} et ${texDroite(2)} sont parallèles à la même droite ${texDroite(1)}`
          this.correctionDetaillee ? texteCorr += '.<br>Or, si deux droites sont parallèles à une même troisième droite alors elles sont parallèles entre elles.<br>E' : texteCorr += ', e'
          texteCorr += 'lles sont donc parallèles.<br>'
          texteCorr += `<br>Remarque :<br>La droite ${texDroite(4)} semble elle aussi être parallèle aux autres mais rien ne nous permet de l'affirmer.<br>Il aurait fallu que l'énoncé dise qu'elle est parallèle à une autre ou qu'un angle droit soit marqué par exemple.`
          break
        case 'Perpendiculaires':
          texte += 'Donner tous les couples de droites perpendiculaires en justifiant'
          texteCorr = `Les codages permettent d'affirmer que les droites ${texDroite(1)} et ${texDroite(2)} sont toutes les deux perpendiculaires à ${texDroite(3)}<br><br>`
          texteCorr += `Les droites ${texDroite(0)} et ${texDroite(1)} sont parallèles (c'est l'énoncé qui le dit) et ${texDroite(3)} est perpendiculaire à ${texDroite(1)}`
          this.correctionDetaillee ? texteCorr += '.<br>Or, si deux droites sont parallèles et si une troisième droite est perpendiculaire à l’une alors elle est perpendiculaire à l’autre.<br>D' : texteCorr += ' d'
          texteCorr += `onc ${texDroite(3)} est aussi perpendiculaire à ${texDroite(0)}.<br>`
          texteCorr += `<br>Remarque :<br>La droite ${texDroite(4)} semble elle aussi être perpendiculaire à ${texDroite(3)} mais rien ne nous permet de l'affirmer.<br>Il aurait fallu que l'énoncé dise qu'elle est parallèle à une autre ou qu'un angle droit soit marqué par exemple.`
          break
      }
      texte += '<br>' + mathalea2d(params, objetsEnonce)
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, x, y)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
