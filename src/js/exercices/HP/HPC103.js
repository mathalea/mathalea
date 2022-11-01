import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu } from '../../modules/outils.js'
import { create, all } from 'mathjs'

export const titre = 'Produit de matrices'
const math = create(all)

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Maxime Nguyen
 * Référence HPC103
*/
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'On définit deux matrices $A$ et $B$. Si le produit $A \\times B$ est possible, effectuer le calcul. Faire de même pour $B \\times A$.'
    this.nbQuestions = 3 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
    this.video = '' // Id YouTube ou url
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const matrices = []
      const matricesprint = []
      const nbmatrice = 2
      let n = randint(1, 4)
      let m = randint(1, 4)
      const nblignes = []
      nblignes.push(n)
      const nbcolonnes = []
      nbcolonnes.push(m)
      nblignes.push(math.pickRandom([m, m, m, 1, 2, 3, 4]))
      nbcolonnes.push(math.pickRandom([n, n, n, 1, 2, 3, 4]))
      for (let compteur = 0; compteur < nbmatrice; compteur++) {
        let ligne
        let matrice = []
        n = nblignes[compteur]
        m = nbcolonnes[compteur]
        for (let i = 0; i < n; i++) {
          ligne = []
          for (let j = 0; j < m; j++) {
            const coef = math.pickRandom([-6, -5, -4, -3, -2, -1, -1, -1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 5, 6])
            ligne.push(coef)
          }
          matrice.push(ligne)
        }
        matrice = math.matrix(matrice)
        matrices.push(matrice)
        matrice = matrice.toString()
        matrice = math.parse(matrice).toTex().replaceAll('bmatrix', 'pmatrix')
        matricesprint.push(matrice)
      }

      texte = `Soient les matrices $A=${matricesprint[0]}$ et $B = ${matricesprint[1]}$` // Le LateX entre deux symboles $, les variables dans des ${ }
      texteCorr = `La matrice $A$ a $${nblignes[0]}$ lignes et $${nbcolonnes[0]}$ colonnes.`
      texteCorr += `<br> La matrice $B$ a $${nblignes[1]}$ lignes et $${nbcolonnes[1]}$ colonnes.`
      if (nbcolonnes[0] === nblignes[1]) {
        const produit = math.multiply(matrices[0], matrices[1])
        let produitprint = produit.toString()
        produitprint = math.parse(produitprint).toTex().replaceAll('bmatrix', 'pmatrix')
        texteCorr += `<br> Le produit $A \\times B$ est possible et on calcule $A \\times B = ${produitprint}$.`
      } else {
        texteCorr += '<br> Le produit $A \\times B$ n\'est pas possible car le nombre de colonnes de $A$ n\'est pas égal au nombre de lignes de $B$.'
      }
      if (nbcolonnes[1] === nblignes[0]) {
        const produit = math.multiply(matrices[1], matrices[0])
        let produitprint = produit.toString()
        produitprint = math.parse(produitprint).toTex().replaceAll('bmatrix', 'pmatrix')
        texteCorr += `<br> Le produit $B \\times A$ est possible et on calcule $B \\times A = ${produitprint}$.`
      } else {
        texteCorr += '<br> Le produit $B \\times A$ n\'est pas possible car le nombre de colonnes de $B$ n\'est pas égal au nombre de lignes de $A$.'
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, matrices)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c, d...)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
