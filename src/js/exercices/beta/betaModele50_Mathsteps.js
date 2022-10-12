import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { resoudre, calculer, aleaVariables, toTex } from '../../modules/outilsMathjs.js'
import { simplify } from 'mathjs'
export const titre = 'Nom de l\'exercice'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Consigne'
    this.nbQuestions = 6 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.video = '' // Id YouTube ou url
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3', 'type4', 'type5', 'type6'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, exercice = {}, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1': {
          const variables = aleaVariables(
            {
              a: false,
              b: false
            }
          )
          exercice = calculer('(a*x+b)^2', { variables: variables, name: 'A' })
          exercice.texte = `Développer puis réduire l'expression suivante : $${exercice.name}=${exercice.printExpression}$`
          exercice.texteCorr = this.correctionDetaillee ? '<br>' + exercice.texteCorr : `$${exercice.name}=${exercice.printResult}$`
          break
        }
        case 'type2' : {
          const variables = aleaVariables(
            {
              a: false,
              b: false,
              c: false
            }
          )
          exercice = calculer('a/2*(b/3+c/8)', { variables: variables, substeps: true })
          exercice.texte = `Calculer : $${exercice.printExpression}$`
          exercice.texteCorr = this.correctionDetaillee ? '<br>' + exercice.texteCorr : `$${exercice.printExpression}=${exercice.printResult}$`
          break
        }
        case 'type3': {
          const variables = aleaVariables(
            {
              a: true,
              b: true,
              c: true,
              d: false,
              e: false,
              f: false,
              disc: '(b/e)^2-4*(a/d)*(c/f)'
              // test: 'abs(a)!=d and abs(b)!=e and abs(c)!=f and 1<d and 1<e and 1<f and gcd(abs(a),d)==1 and gcd(abs(b),e)==1 and gcd(abs(c),f)==1'
            }
          )
          const polynomeTex = toTex(simplify('a/d*x^2+b/e*x+c/f', [], variables), { suppr1: true })
          const discriminantTex = toTex(simplify('(b/e)^2-4*(a/d)*(c/f)', [], variables), { suppr1: true })
          const stepscalculsDiscriminant = calculer('(b/e)^2-4*(a/d)*c/f', { variables: variables, comments: false, mixed: false, name: '\\Delta' }).texteCorr
          exercice = {}
          exercice.texteCorr = `$\\Delta = b^2-4ac=${discriminantTex}=${toTex(variables.disc.toFraction())}$
          <br>
          Calcul détaillé :
          <br>
          ${stepscalculsDiscriminant}`
          exercice.texte = `Le discriminant de $${polynomeTex}$ est : `
          break
        }
        case 'type4': {
          const variables = aleaVariables(
            {
              a: true,
              b: true
            }
          )
          const commentairesPersonnalises = {
            CANCEL_MINUSES: 'Simplifier l\'écriture',
            SUBTRACT_FROM_BOTH_SIDES: 'Enlever {stepChange} à chaque membre.',
            SIMPLIFY_ARITHMETIC: '',
            SIMPLIFY_RIGHT_SIDE: 'Réduire.',
            SIMPLIFY_LEFT_SIDE: 'Réduire.'
          }
          exercice = resoudre('3*x+a=9*x+b', { variables: variables, comment: true, comments: commentairesPersonnalises })
          exercice.texte = `Résoudre l'équation $${exercice.equation}$ en détaillant les étapes.`
          exercice.texteCorr = `<br>
          ${exercice.texteCorr}
          <br>
          La solution de cette équation est donc $${exercice.solution}$.`
        }
          break
        case 'type5': {
          const variables = aleaVariables(
            {
              a: true,
              b: true,
              test: 'a!=b'
            }
          )
          exercice = resoudre('a*x+7=b*x-3', { variables: variables, color: 'black', comment: true })
          exercice.texte = `Résoudre : $${exercice.equation}$`
          exercice.texteCorr = this.correctionDetaillee ? '<br>' + exercice.texteCorr : `La solution est $${exercice.solution}$`
        }
          break
        case 'type6': {
          const variables = aleaVariables(
            {
              a: true,
              b: true,
              c: true,
              d: true,
              test: 'a!=c'
            }
          )
          // Toutes les étapes sont détaillées avec le paramètre reduceSteps: false
          exercice = resoudre('a*x+b=c*x+d', { reduceSteps: false, variables: variables, color: 'blue', comment: true })
          exercice.texte = `Résoudre : $${exercice.equation}$`
          exercice.texteCorr = `
          <br>
          ${exercice.texteCorr}
          <br>
          La solution est $${exercice.solution}$.
          <br>
          Vérification :
          <br>
          D'une part : $${exercice.verifLeftSide.printExpression}=${exercice.verifLeftSide.printResult}$
          <br>
          D'autre part : $${exercice.verifRightSide.printExpression}=${exercice.verifRightSide.printResult}$
          `
          break
        }
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, exercice.texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(exercice.texte)
        this.listeCorrections.push(exercice.texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
