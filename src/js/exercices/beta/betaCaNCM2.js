import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, calcul, texNombrec, texNombre, combinaisonListesSansChangerOrdre, range1 } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Course aux nombres CM2'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Ensemble de questions pour course aux nombres
 * @author Jean-Claude Lhote
 * Référence
*/
export default function CourseAuxNombresCM (numeroExercice) {
  Exercice.call(this) // Héritage de la classe Exercice()
  if (this.interactif) {
    this.consigne = "Saisir la réponse numérique uniquement sauf si l'unité est explicitement demandée."
  } else {
    this.consigne = ''
  }

  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let a, b, c, resultat
    let questions = []
    if (!this.sup) {
      // Si aucune question n'est sélectionnée
      questions = combinaisonListesSansChangerOrdre(range1(10), this.nbQuestions)
    } else {
      if (typeof this.sup === 'number') {
        // Si c'est un nombre c'est qu'il y a qu'une seule question
        questions[0] = this.sup
        this.nbQuestions = 1
      } else {
        questions = this.sup.split('-') // Sinon on créé un tableau à partir des valeurs séparées par des -
        this.nbQuestions = questions.length
      }
    }
    for (let i = 0; i < questions.length; i++) {
      questions[i] = parseInt(questions[i]) - 1
    }
    const listeIndex = combinaisonListesSansChangerOrdre(questions, this.nbQuestions)
    const typeQuestionsDisponibles = [ // les dix premières sont communes à betaCaNCM1
      'q1', // Somme d'entiers\n
      'q2', // Différence d'entiers\n
      'q3', // Somme d'entiers avec retenue\n
      'q4', // Différence d'entiers avec retenue\n
      'q5', // Décomposition\n
      'q6', // Division d'entiers\n
      'q7', // Somme décimal et entier\n
      'q8', // Somme de décimaux\n
      'q9', // Différence de décimaux\n
      'q10', // Différence décimaux\n
      'q11', // Addition d'entiers\n
      'q12', // Soustraction d'entiers\n
      'q13', // Produit de trois entiers\n
      'q14', // Produit entier et décimal\n
      'q15', // division d'entiers\n
      'q16', // soustraction entier et décimal coût\n
      'q17', // soustraction entier et décimal coût\n
      'q18', // triple de décimal\n
      'q19', // quart de décimal\n
      'q20', // Périmètre carré\n
      'q21', // Division entier par 10\n
      'q22', // Multiplication et addition d'entiers\n
      'q23', // Soustraction de grands entiers\n
      'q24', // Suite de nombres\n
      'q25', // Augmentation décimaux\n
      'q26', // Soustraction décimaux\n
      'q27', // Multiplication entier par décimal\n
      'q28', // Moitié de décimal\n
      'q29', // Soustraction grands entiers\n
      'q30' // Quotient d'entiers
    ]
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (typeQuestionsDisponibles[listeIndex[i]]) { // Suivant le type de question, le contenu sera différent
        case 'q1': // somme d'entiers à deux chiffres sans retenue
          a = randint(1, 3) * 10 + randint(1, 5)
          b = randint(1, 5) * 10 + randint(1, 4)
          texte = `$${a}+${b}$`
          texteCorr = `$${a}+${b}=${a + b}$`
          setReponse(this, i, a + b, { formatInteractif: 'calcul' })
          break
        case 'q2': // différence d'entiers sans retenue
          a = randint(1, 3) * 10 + randint(1, 5)
          b = randint(1, 5) * 10 + randint(1, 4)
          texte = `$${a + b}-${a}$`
          texteCorr = `$${a + b}-${a}=${b}$`
          setReponse(this, i, b, { formatInteractif: 'calcul' })
          break
        case 'q3': // somme d'entiers à deux chiffres avec retenue
          a = randint(1, 3) * 10 + randint(5, 9)
          b = randint(1, 5) * 10 + randint(11 - a % 10, 9)
          texte = `$${a}+${b}$`
          texteCorr = `$${a}+${b}=${a + b}$`
          setReponse(this, i, a + b, { formatInteractif: 'calcul' })
          break
        case 'q4': // difference avec retenue
          a = randint(1, 3) * 10 + randint(5, 9)
          b = randint(1, 5) * 10 + randint(11 - a % 10, 9)
          texte = `$${a + b}-${a}$`
          texteCorr = `$${a + b}-${a}=${b}$`
          setReponse(this, i, b, { formatInteractif: 'calcul' })
          break
        case 'q5': // Décomposition
          a = randint(1, 3)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          resultat = calcul(a * 1000 + b * 10 + c * 100)
          texte = `$${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100$`
          texteCorr = `$${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100 =${texNombre(resultat)}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q6': // Division d'entiers
          a = randint(2, 9)
          b = randint(3, 9)
          texte = `$${a * b}\\div${a}$`
          texteCorr = `$${a * b}\\div${a}=${b}$`
          setReponse(this, i, b, { formatInteractif: 'calcul' })
          break
        case 'q7': // Somme entier et décimal
          a = calcul(randint(1, 5) + randint(1, 5) / 10)
          b = randint(1, 4)
          texte = `$${texNombre(a)}+${b}$`
          texteCorr = `$${texNombre(a)}+${b}=${texNombrec(a + b)}$`
          setReponse(this, i, a + b, { formatInteractif: 'calcul' })
          break
        case 'q8': // Somme décimaux
          a = calcul(randint(1, 5) + randint(1, 5) / 10)
          b = calcul(randint(1, 4) + randint(1, 4) / 10 + randint(1, 9) / 100)
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          texteCorr = `$${texNombre(a)}+${texNombre(b)}=${texNombrec(a + b)}$`
          setReponse(this, i, calcul(a + b), { formatInteractif: 'calcul' })
          break
        case 'q9': // Différence décimaux
          a = calcul(randint(1, 5) + randint(1, 5) / 10)
          b = calcul(randint(1, 4) + randint(1, 4) / 10 + randint(1, 9) / 100)
          texte = `$${texNombrec(a + b)}-${texNombre(a)}$`
          texteCorr = `$${texNombrec(a + b)}-${texNombre(a)}=${texNombre(b)}$`
          setReponse(this, i, b, { formatInteractif: 'calcul' })
          break
        case 'q10': // Différence décimaux avec retenue
          a = calcul(randint(1, 5) + randint(5, 9) / 10)
          b = calcul(randint(1, 4) + randint(5, 9) / 10)
          texte = `$${texNombrec(a + b)}-${texNombre(a)}$`
          texteCorr = `$${texNombrec(a + b)}-${texNombre(a)}=${texNombre(b)}$`
          setReponse(this, i, b, { formatInteractif: 'calcul' })
          break
      }
      texte += ajouteChampTexteMathLive(this, i)
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
  this.besoinFormulaireTexte = ['Choix des questions (nombres séparés par des tirets)',
  `1 : Somme d'entiers\n
  2 : Différence d'entiers\n
  3 : Somme d'entiers avec retenue\n
  4 : Différence d'entiers avec retenue\n
  5 : Décomposition\n
  6 : Division d'entiers\n
  7 : Somme décimal et entier\n
  8 : Somme de décimaux\n
  9 : Différence de décimaux\n
  10 : Différence décimaux\n
  11 : Addition d'entiers\n
  12 : Soustraction d'entiers\n
  13 : Produit de trois entiers\n
  14 : Produit entier et décimal\n
  15 : division d'entiers\n
  16 : soustraction entier et décimal coût\n
  17 : soustraction entier et décimal coût\n
  18 : triple de décimal\n
  19 : quart de décimal\n
  20 : Périmètre carré\n
  21 : Division entier par 10\n
  22 : Multiplication et addition d'entiers\n
  23 : Soustraction de grands entiers\n
  24 : Suite de nombres\n
  25 : Augmentation décimaux\n
  26 : Soustraction décimaux\n
  27 : Multiplication entier par décimal\n
  28 : Moitié de décimal\n
  29 : Soustraction grands entiers\n
  30 : Quotient d'entiers`]
}
