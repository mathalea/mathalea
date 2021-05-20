import { labelPoint, mathalea2d, point, segment, tracePoint } from '../../modules/2d.js'
// import { context } from '../../modules/context.js'// eslint-disable-next-line camelcase
import { lettreDepuisChiffre, listeQuestionsToContenu, randint } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
export const titre = 'Exercice de repérage dans un pavé droit'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Placer les points sur le pavé ci-dessous dans le repère $(A;I,J,K)$ : '
  this.nbQuestions = 3
  this.nbQuestionsModifiable = false // à modifier si besoin
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () { // c'est ici que les données sont relatives
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.introduction = '' // consigne avant les question y mettre le dessin + texte

    const hauteur = 12
    const largeur = 17
    const deltax = 5
    const deltay = 5
    const A = point(0, 0, 'A', 'below right')
    const B = point(largeur, 0, 'B', 'below right')
    const C = point(largeur + deltax, deltay, 'C', 'below right')
    const D = point(deltax, deltay, 'D', 'below right')
    const E = point(0, hauteur, 'E', 'below right')
    const F = point(largeur, hauteur, 'F', 'below right')
    const G = point(largeur + deltax, hauteur + deltay, 'G', 'below right')
    const H = point(deltax, hauteur + deltay, 'H', 'below right')

    const objetatracer = []
    let nbgraduationx = randint(2, 4)
    let nbgraduationy = randint(2, 3)
    let nbgraduationz = randint(2, 4)
    while ((nbgraduationx >= 3) && (nbgraduationy >= 3)) {
      nbgraduationx = randint(2, 4)
      nbgraduationy = randint(2, 3)
      nbgraduationz = randint(2, 4)
    }
    const I = point(largeur / nbgraduationx, 0, 'I', 'below right')
    const J = point(deltax / nbgraduationy, deltay / nbgraduationy, 'J', 'below right')
    const K = point(0, hauteur / nbgraduationz, 'K', 'below right')

    objetatracer.push(labelPoint(A, B, C, D, E, F, G, H, I, J, K))
    const deltaxx = (B.x - A.x) / nbgraduationx
    const deltaxy = (B.y - A.y) / nbgraduationx
    const deltayx = (D.x - A.x) / nbgraduationy
    const deltayy = (D.y - A.y) / nbgraduationy
    const deltazx = (E.x - A.x) / nbgraduationz
    const deltazy = (E.y - A.y) / nbgraduationz

    for (let i = 0; i <= nbgraduationy; i++) {
      for (let j = 0; j <= nbgraduationz; j++) {
        const s = segment(A.x + i * deltayx + j * deltazx, A.y + i * deltayy + j * deltazy, B.x + i * deltayx + j * deltazx, B.y + i * deltayy + j * deltazy)
        if ((i === 0) || (j === nbgraduationz)) {
          s.pointilles = false
        } else { s.pointilles = true }

        objetatracer.push(s)
      }
    }
    for (let i = 0; i <= nbgraduationx; i++) {
      for (let j = 0; j <= nbgraduationz; j++) {
        const s = segment(A.x + i * deltaxx + j * deltazx, A.y + i * deltaxy + j * deltazy, D.x + i * deltaxx + j * deltazx, D.y + i * deltaxy + j * deltazy)
        if ((i === nbgraduationx) || (j === nbgraduationz)) {
          s.pointilles = false
        } else { s.pointilles = true }

        objetatracer.push(s)
      }
    }
    for (let i = 0; i <= nbgraduationx; i++) {
      const s = segment(A.x + i * deltaxx, A.y + i * deltaxy, E.x + i * deltaxx, E.y + i * deltaxy)
      s.pointilles = false
      objetatracer.push(s)
      const sp = segment(D.x + i * deltaxx, D.y + i * deltaxy, H.x + i * deltaxx, H.y + i * deltaxy)
      if (i < nbgraduationx) { sp.pointilles = true } else { sp.pointilles = false }
      objetatracer.push(sp)
    }
    for (let i = 1; i < nbgraduationy; i++) {
      const s = segment(A.x + i * deltayx, A.y + i * deltayy, E.x + i * deltayx, E.y + i * deltayy)
      s.pointilles = true
      objetatracer.push(s)
      const sp = segment(B.x + i * deltayx, B.y + i * deltayy, F.x + i * deltayx, F.y + i * deltayy)
      sp.pointilles = false
      objetatracer.push(sp)
    }
    const poipointcoordt = []
    // boucle inutile
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      const pointcoord = [randint(0, nbgraduationx), randint(0, nbgraduationy), randint(0, nbgraduationz)]
      texte = `Placer le point $${lettreDepuisChiffre(i + 12)}$ de coordonnées $(${pointcoord[0]},${pointcoord[1]},${pointcoord[2]})$`
      const pointaplacer = point(pointcoord[0] * largeur / nbgraduationx + pointcoord[1] * deltax / nbgraduationz, pointcoord[1] * deltay / nbgraduationz + pointcoord[2] * hauteur / nbgraduationz, lettreDepuisChiffre(i + 12), 'below right')
      const s1 = segment(A.x, A.y, A.x + pointcoord[0] * largeur / nbgraduationx, A.y)
      const s2 = segment(A.x + pointcoord[0] * largeur / nbgraduationx, A.y, A.x + pointcoord[0] * largeur / nbgraduationx + pointcoord[1] * deltax / nbgraduationz, A.y + pointcoord[1] * deltay / nbgraduationz)
      const s3 = segment(A.x + pointcoord[0] * largeur / nbgraduationx + pointcoord[1] * deltax / nbgraduationz, A.y + pointcoord[1] * deltay / nbgraduationz, pointaplacer.x, pointaplacer.y)
      s1.color = 'red'
      s2.color = 'red'
      s3.color = 'red'
      s3.width='3px'
      
      const reponse = [s1, s2, s3]
      reponse.push(labelPoint(pointaplacer))

      reponse.push(tracePoint(pointaplacer,'red'))
      const objetatracercorr = objetatracer.concat(reponse)
      texteCorr = mathalea2d({ xmin: -1, xmax: 1 + largeur + deltax, ymin: -1, ymax: 1 + hauteur + deltay }, objetatracercorr)
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    this.introduction = mathalea2d({ xmin: -1, xmax: 1 + largeur + deltax, ymin: -1, ymax: 1 + hauteur + deltay }, objetatracer)

    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
  // M recupérable dans this.sup
}
