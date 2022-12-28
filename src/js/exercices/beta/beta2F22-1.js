import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { splineCatmullRom } from '../../modules/fonctionsMaths.js'
import { courbe, repere, segmentAvecExtremites } from '../../modules/2d.js'
import { listeQuestionsToContenu, combinaisonListes, randint } from '../../modules/outils.js'
import { max, min } from 'mathjs'

export const titre = 'Resoudre graphiquement une équation $f(x)=k$'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Jean Claude Lhote et Stéphane Guyon
 * Référence
*/
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Consigne'
    this.nbQuestions = 2 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.video = '' // Id YouTube ou url
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['2solA'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    // règles de bon codage :
    // définir les variables au plus près de leur utilisation
    // éviter les variables globales qui changent de valeur à chaque tour de boucle :     on ne verra pas si on oublie d'en initialiser une (ç vaut aussi pour texte et texteCorr même si on a toujours fait autrement)
    // ne mettre dans le switch case que ce qui est différent d'un case à l'autre => le tronc commun n'est à coder qu'une fois, donc à corriger une fois

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const tabY = []
      let x0 = -3 // on l'initialise pour ne pas qu'il se retrouve undefined par oubli
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case '2solA':// Cas où f croissante puis décroissante avec 2 solutions
          tabY[0] = -5
          tabY[1] = tabY[0] + randint(2, 8)
          tabY[2] = min(tabY[1] + randint(2, 5), 5)
          tabY[3] = max(tabY[2] - randint(2, 4), tabY[1] + 1)
          tabY[4] = tabY[1]
          tabY[5] = tabY[4] - randint(2, 4)
          x0 = randint(-5, -2)
          break
        case '1solA':// Cas où f croissante puis décroissante avec 2 solutions
          tabY[0] = -5
          tabY[1] = tabY[0] + randint(1, 3)
          tabY[2] = tabY[1] + randint(3, 9)
          tabY[3] = min(tabY[2] + randint(2, 5), 5)
          tabY[4] = max(tabY[3] - randint(2, 8), tabY[1] + 1)
          tabY[5] = tabY[4] + randint(2, 4)
          x0 = randint(-5, -2)
          break
      }
      const ymin = min(...tabY, -1)
      const ymax = max(...tabY, 1)
      let texte = `Résoudre $f(x)=${tabY[1]}$` // Le LateX entre deux symboles $, les variables dans des ${ }
      const r = repere({ xMin: x0, xMax: x0 + 10, yMin: ymin, yMax: ymax, xUnite: 2, yUnite: 2 })

      const f = splineCatmullRom({ tabY, x0, step: 2 }) // le tableau des ordonnées successives = tabY, x0 = -5, step = 1.
      const F = x => f.image(x) // On crée une fonction de x f.image(x) est une fonction polynomiale par morceaux utilisée dans courbeSpline()
      // const c = courbeSpline(f, { repere: r, step: 0.1 }) // Une première façon de tracer la courbe.
      const c = courbe(F, { repere: r, step: 0.1, color: 'red', epaisseur: 5 }) // F peut ainsi être utilisée dans courbe.
      const k = tabY[1]
      const g = x => k
      const fleches = []

      const cg = courbe(g, { repere: r, step: 0.1, color: 'blue', epaisseur: 3 })
      texte += mathalea2d({ xmin: -15, xmax: 15, ymin: -15, ymax: 15 }, r, c)

      const antecedents = f.solve(tabY[1])
      for (let pas = 0; pas < antecedents.length; pas++) {
        fleches[pas] = segmentAvecExtremites(antecedents, 0, antecedents, k, 'blue')
      }
      let texteCorr = `Lire graphiquement les solutions de l'équation $f(x)=${tabY[1]}$ c'est déterminer les abscisses des points de la courbe d'ordonnées.  ${tabY[1]}. <br>`
      texteCorr += `Pour les déterminer, il suffit de tracer la droite d'équation $y= ${tabY[1]}$, c'est à dire la droite horizontale d'ordonnée à l'origine.  ${tabY[1]}<br>`
      texteCorr += 'On lit alors les abscisses des points d\'intersection comme illustré sur le graphique.'
      texteCorr += mathalea2d({ xmin: -15, xmax: 15, ymin: -10, ymax: 10 }, r, c, cg, ...fleches)
      texteCorr += '$S=\\{$'
      texteCorr += antecedents.length > 0 ? antecedents.reduce((accu, current) => accu + ' ; ' + current) : ''
      texteCorr += '$\\}$'

      // Si la question n'a jamais été posée, on l'enregistre
      // Ne pas mettre texte (il peut être différent avec les mêmes données à cause des listeners de l'interactif qui sont labelisés de façon unique par question)
      if (this.questionJamaisPosee(i, ...tabY, listeTypeQuestions[i])) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
