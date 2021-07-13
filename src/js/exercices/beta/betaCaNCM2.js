import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, calcul, pgcd, texNombrec, choice, texNombre, sp, shuffle, texPrix, combinaisonListesSansChangerOrdre, range1 } from '../../modules/outils.js'
import { ajouteChampTexte, ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import Fraction from '../../modules/Fraction.js'
import Grandeur from '../../modules/Grandeur.js'
import { droiteGraduee2, mathalea2d } from '../../modules/2d.js'
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
  this.interactif = true
  if (this.interactif) {
    this.consigne = "Saisir la réponse numérique uniquement sauf si l'unité est explicitement demandée."
  } else {
    this.consigne = ''
  }

  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let a, b, c, d, resultat, propositions
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
    console.log(listeIndex)
    const fruits = [
      ['pêches', 4, 10, 30],
      ['Noix', 5, 4, 13],
      ['cerises', 6, 11, 20],
      ['pommes', 2, 20, 40],
      ['framboises', 15, 1, 5],
      ['fraises', 7, 5, 10],
      ['citrons', 1.5, 15, 30],
      ['bananes', 1.5, 15, 25]
    ]
    const hauteurs = [
      ['chaise', 75, 115, 'cm'],
      ['grue', 120, 250, 'dm'],
      ['tour', 50, 180, 'm'],
      ['girafe', 40, 50, 'dm'],
      ['coline', 75, 150, 'm']
    ]
    const typeQuestionsDisponibles = [ // les dix premières sont communes à betaCaNCM1
      'q1', // Somme d'entiers
      'q2', // Différence d'entiers
      'q3', // Somme d'entiers avec retenue
      'q4', // Différence d'entiers avec retenue
      'q5', // Décomposition
      'q6', // Division d'entiers
      'q7', // Somme décimal et entier
      'q8', // Somme de décimaux
      'q9', // Différence de décimaux
      'q10']/*, // Différence décimaux
      'q11', // Addition d'entiers
      'q12', // Soustraction d'entiers
      'q13', // Produit de trois entiers
      'q14', // Produit entier et décimal
      'q15', // division d'entiers
      'q16', // soustraction entier et décimal coût
      'q17', // soustraction entier et décimal coût
      'q18', // triple de décimal
      'q19', // quart de décimal
      'q20', // Périmètre carré
      'q21', // Division entier par 10
      'q22', // Multiplication et addition d'entiers
      'q23', // Soustraction de grands entiers
      'q24', // Suite de nombres
      'q25', // Augmentation décimaux
      'q26', // Soustraction décimaux
      'q27', // Multiplication entier par décimal
      'q28', // Moitié de décimal
      'q29', // Soustraction grands entiers
      'q30' // Quotient d'entiers
    ]
    */
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
  `1 : Moitié et double\n
  2 : quotient de a par b\n
  3 : Somme astucieuse de 4 nombres entiers\n
  4 : Somme de deux décimaux avec retenue\n
  5 : Double ou triple d'un nombre entier\n
  6 : Double ou triple d'un nombre décimal\n
  7 : Recomposition d'un entier\n
  8 : tables de multiplication\n
  9 : soustraire un nombre se finissant par 9\n
  10 :  Le quart ou le tiers d'un nombre.\n
  11 :  Recomposer un nombre à partir d'un nombre de centaines et d'un nombre d'unités\n
  12 :  Recomposer une nombre avec chevauchement.\n
  13 :  conversion heures et minutes\n
  14 :  Reste de la division par 3\n
  15 :  Une division par 9 qui tombe juste\n
  16 :  ajouter un nombre de la forme 10n+9\n
  17 :  4 × #,## × 25 ou 2 × #,## × 50\n
  18 :  addition à trou\n
  19 :  Nombre pair de 2 chiffres × 2\n
  20 :  Proportionnalité simple\n
  21 :  Ordre de grandeur\n
  22 :  Conversion cm -> m\n
  23 :  Fraction 1/n d'une quantité de L\n
  24 :  Reste de la division euclidienne\n
  25 :  Ordre de grandeur : hauteurs\n
  26 :  Appliquer un pourcentage\n
  27 :  Calcul de distance à vitesse constante\n
  28 :  Comparaison de périmètre\n
  29 :  Repérage fraction\n
  30 : Proportionnalité par linéarité\n`]
}
