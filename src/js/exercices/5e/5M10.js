import { pointAdistance, point, parallelogramme2points1hauteur, afficheLongueurSegment, projectionOrtho, milieu, droite, segment, codageAngleDroit } from '../../modules/2d.js'
import { combinaisonListes, creerNomDePolygone, listeQuestionsToContenu, randint, texteEnCouleurEtGras } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'

export const titre = 'Aire du parallélogramme'

export const dateDeModifImportante = '08/05/2022'

/**
 * Des parallélogrammes sont tracés, on connaît les 2 côtés et une hauteur.
 * Il faut calculer leurs aires.
 *
 * Pas de version LaTeX
 * @author Rémi Angot
 * Ajout de la possibilité de choisir le nombre de questions par Guillaume Valmont le 08/05/2022
 * Référence 5M10
 **/
export const uuid = 'd6cd1'
export const ref = '5M10'
export default function AireDuParallelogramme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Calculer l'aire des parallélogrammes suivants."
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1

  const cadre = function (p, params) {
    let xmin = 0; let xmax = 0; let ymin = 0; let ymax = 0
    for (let i = 0; i < 4; i++) {
      xmin = Math.min(xmin, p[0].listePoints[i].x - 1)
      ymin = Math.min(ymin, p[0].listePoints[i].y - 1)
      xmax = Math.max(xmax, p[0].listePoints[i].x + 1)
      ymax = Math.max(ymax, p[0].listePoints[i].y + 1)
    }
    params.xmin = xmin
    params.xmax = xmax
    params.ymin = ymin
    params.ymax = ymax
    return params
  }

  this.nouvelleVersion = function (numeroExercice) {
    this.listeCorrections = [] // Liste de questions corrigées
    this.listeQuestions = []
    this.autoCorrection = []
    if (this.nbQuestions === 1) this.consigne = "Calculer l'aire du parallélogramme suivant."
    const typeQuestionsDisponibles = ['type1', 'type2', 'type3'] // On créé 3 types de questions
    const nom = creerNomDePolygone(this.nbQuestions * 4, 'QD')

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, params, c, h, A, B, P, C, I, H, s, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texteCorr = `Dans chaque parallélogramme, le segment en pointillés est ${texteEnCouleurEtGras('perpendiculaire')} à deux côtés opposés, c'est donc une ${texteEnCouleurEtGras('hauteur')}.<br>`
      texteCorr += `Pour obtenir l'aire, il faut multiplier cette ${texteEnCouleurEtGras('hauteur')} par la longueur de la ${texteEnCouleurEtGras('base')} correspondante.`
      switch (listeTypeQuestions[i]) {
        case 'type1':
          c = randint(3, 7)
          h = randint(2, 4)
          A = point(0, 0, nom[i * 4])
          B = pointAdistance(A, c, randint(-20, 20), nom[i * 4 + 1])
          P = parallelogramme2points1hauteur(nom.slice(i * 4, i * 4 + 4), A, B, h)
          C = P[0].listePoints[2]
          I = milieu(A, B)
          H = projectionOrtho(I, droite(P[0].listePoints[3], P[0].listePoints[2]))
          s = segment(I, H)
          s.pointilles = 2
          texteCorr += `$\\mathcal{A}_{${nom.slice(i * 4, i * 4 + 4)}}=${c}~\\text{cm}\\times  ${h}~\\text{cm}=${c * h}~\\text{cm}^2$`
          break
        case 'type2':
          c = randint(3, 7)
          h = randint(2, 7)
          A = point(0, 0)
          B = pointAdistance(A, c, randint(-20, 20), nom[i * 4 + 1])
          P = parallelogramme2points1hauteur(nom.slice(i * 4, i * 4 + 4), A, B, h)
          C = P[0].listePoints[2]
          I = milieu(A, B)
          H = projectionOrtho(I, droite(P[0].listePoints[3], P[0].listePoints[2]))
          s = segment(I, H)
          s.pointilles = 2
          texteCorr += `<br>$\\mathcal{A}_{${nom.slice(i * 4, i * 4 + 4)}}=${c}~\\text{cm}\\times  ${h}~\\text{cm}=${c * h}~\\text{cm}^2$`
          break
        case 'type3':
          c = randint(3, 10)
          h = randint(2, 4)
          A = point(0, 0)
          B = pointAdistance(A, c, randint(-20, 20), nom[i * 4 + 1])
          P = parallelogramme2points1hauteur(nom.slice(i * 4, i * 4 + 4), A, B, h)
          C = P[0].listePoints[2]
          I = milieu(A, B)
          H = projectionOrtho(I, droite(P[0].listePoints[3], P[0].listePoints[2]))
          s = segment(I, H)
          s.pointilles = 2
          texteCorr += `<br>$\\mathcal{A}_{${nom.slice(i * 4, i * 4 + 4)}}=${c}~\\text{cm}\\times  ${h}~\\text{cm}=${c * h}~\\text{cm}^2$`
          break
      }
      params = { xmin: 0, xmax: 0, ymin: 0, ymax: 0, pixelsParCm: 20, scale: 0.5, mainlevee: false }
      params = cadre(P, params)
      texte = mathalea2d(params, P[0], P[1], afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(I, H), s, codageAngleDroit(A, I, H), codageAngleDroit(C, H, I))

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, c, h, A, B, P, C, I, H, s)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
