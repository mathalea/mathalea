import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, criblePolynomeEntier, arrondi, texNombre } from '../../modules/outils.js'
import { antecedentInterpole, courbe2, graphiqueInterpole, imageInterpolee, mathalea2d, repere2 } from '../../modules/2d.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Exercice exemple'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function LecturesGraphiques () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeFonctionsDisponibles = ['interpolee'] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeFonctionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    let noeuds
    for (let i = 0, coeff, x0, x1, y0, y1, f, k, r, graph, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'interpolee':
          r = repere2({ xMin: -10, yMin: -5, xMax: 10, yMax: 5, yUnite: 2, grilleSecondaire: true, grilleSecondaireYDistance: 0.2 })
          noeuds = []
          for (let x = -10, y = -10; x <= 10; x += 2.5) {
            y = randint(-4, 4, y)
            noeuds.push([x, y])
          }
          x0 = randint(-18, 18, [-15, -10, -5, 0, 5, 10, 15]) / 2
          x1 = randint(-9, 9, [-5, 0, 5, x0])
          graph = graphiqueInterpole(noeuds, { repere: r, step: 0.1 })
          k = 0
          while (x0 > noeuds[k + 1][0]) {
            k++
          }
          y0 = arrondi(imageInterpolee([[noeuds[k][0], noeuds[k][1]], [noeuds[k + 1][0], noeuds[k + 1][1]]], x0), 1)
          k = 0
          while (x1 > noeuds[k + 1][0]) {
            k++
          }
          y1 = arrondi(imageInterpolee([[noeuds[k][0], noeuds[k][1]], [noeuds[k + 1][0], noeuds[k + 1][1]]], x1), 1)
          texte = `Lire graphiquement l'image de ${texNombre(x0)} par la fonction $f$ représentée ci-dessous.<br>Donner la réponse à 0,1 près.<br>`
          setReponse(this, 2 * i, y0)
          texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur25 inline')
          texte += `Lire graphiquement l'image de ${texNombre(x1)} par la fonction $f$ représentée ci-dessous.<br>Donner la réponse à 0,1 près.<br>`
          setReponse(this, 2 * i + 1, y1)
          texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur25 inline') + '<br>'
          texteCorr = `$f(${texNombre(x0)})=${texNombre(y0)}$ et $f(${texNombre(x1)})=${texNombre(y1)}$.`
          break
        case 'cubique':
          coeff = []
          coeff = criblePolynomeEntier()
          f = x => coeff[0][0] / coeff[0][1] * x ** 3 + coeff[1][0] / coeff[1][1] * x ** 2 + coeff[2][0] / coeff[2][1] * x + coeff[6]
          console.log(coeff)
          graph = courbe2(f, { repere: r })
          break
      }
      graph.epaisseur = 2
      texte += mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10 }, r, graph)
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
