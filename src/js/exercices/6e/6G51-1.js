import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, choisitLettresDifferentes, choice } from '../../modules/outils.js'
import { pointAdistance, tracePoint, labelPoint, droite, pointSurDroite } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
export const titre = 'Reconnaître des points alignés'

export const dateDePublication = '22/02/2023'

/**
 * Reconnaître si trois points sont alignés en traçant une droite qui passe par les deux premiers et en vérifiant qu'elle passe bien par le troisième.
 * @author Guillaume Valmont
 * Référence 6G51-1
*/
export const uuid = '02320'
export const ref = '6G51-1'
export default class ReconnaitreDesPointsAlignes extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 2
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    const typesDeQuestionsDisponibles = ['oui', 'non']
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let A, B, C, D, d
    let objetsEnonce, objetsCorrection, paramsEnonce, paramsCorrection
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objetsEnonce = []
      objetsCorrection = []

      const lettres = choisitLettresDifferentes(4)
      const positionLabel = choice(['above', 'below'])
      d = droite(randint(-15, 15) / 10, -1, 0)
      A = pointSurDroite(d, 0, lettres[0], positionLabel)
      B = pointSurDroite(d, randint(10, 30) / 10, lettres[1], positionLabel)
      C = pointSurDroite(d, randint(40, 60) / 10, lettres[2], positionLabel)
      D = pointAdistance(C, 0.5, positionLabel === 'above' ? 90 : -90, lettres[3], positionLabel)
      const traceA = tracePoint(A)
      traceA.taille = context.isHtml ? 2 : 1
      const traceB = tracePoint(B)
      traceB.taille = context.isHtml ? 2 : 1
      objetsEnonce.push(traceA, traceB, labelPoint(A, B))
      texte = 'Graphiquement, les points suivants sont-ils alignés ?<br>'
      texteCorr = `Pour le savoir, on trace la droite qui passe par les points $${A.nom}$ et $${B.nom}$ et on vérifie si elle passe aussi par le point `
      switch (listeTypeDeQuestions[i]) {
        case 'oui': {
          const traceC = tracePoint(C)
          traceC.taille = context.isHtml ? 2 : 1
          objetsEnonce.push(traceC, labelPoint(C))
          texteCorr += `$${C.nom}$.<br>La droite ($${A.nom + B.nom}$) passe aussi par le point $${C.nom}$ donc graphiquement on observe que les points $${A.nom}$, $${B.nom}$ et $${C.nom}$ sont alignés.<br>`
          break
        }
        case 'non': {
          const traceD = tracePoint(D)
          traceD.taille = context.isHtml ? 2 : 1
          objetsEnonce.push(traceD, labelPoint(D))
          texteCorr += `$${D.nom}$.<br>La droite ($${A.nom + B.nom}$) ne passe pas par le point $${D.nom}$ donc graphiquement on observe que les points $${A.nom}$, $${B.nom}$ et $${D.nom}$ ne sont pas alignés.<br>`
          break
        }
      }
      d.pointilles = 5
      objetsCorrection.push(d)
      objetsEnonce.forEach(objet => {
        objetsCorrection.push(objet)
      })
      // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
      const xmin = Math.min(A.x, B.x, C.x, D.x) - 2
      const xmax = Math.max(A.x, B.x, C.x, D.x) + 2
      const ymin = Math.min(A.y, B.y, C.y, D.y) - 2
      const ymax = Math.max(A.y, B.y, C.y, D.y) + 2
      paramsEnonce = { xmin, ymin, xmax, ymax, pixelsParCm: 20, scale: 1 }
      paramsCorrection = paramsEnonce
      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += mathalea2d(paramsEnonce, objetsEnonce)
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, A.nom, B.nom, typesDeQuestionsDisponibles === 'oui' ? C.nom : D.nom)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        // Dans cet exercice, on n'utilise pas a, b, c et d mais A, B, C et D alors remplace-les !
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
