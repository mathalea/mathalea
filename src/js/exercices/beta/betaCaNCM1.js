import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, calcul, pgcd, texNombrec, choice, texNombre, sp, shuffle, texPrix, combinaisonListesSansChangerOrdre, range1, prenom, personne, miseEnEvidence } from '../../modules/outils.js'
import { ajouteChampTexte, ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import Fraction from '../../modules/Fraction.js'
import Grandeur from '../../modules/Grandeur.js'
import { droiteGraduee2, mathalea2d } from '../../modules/2d.js'
export const titre = 'Course aux nombres CM1'
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
      questions = combinaisonListesSansChangerOrdre(range1(11), this.nbQuestions)
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
    const fruits2 = [
      ['pêches', 4.5, 10, 30],
      ['Noix', 5.2, 4, 13],
      ['cerises', 6.4, 11, 20],
      ['pommes', 2.7, 20, 40],
      ['framboises', 10.5, 1, 5],
      ['fraises', 7.5, 5, 10],
      ['citrons', 1.8, 15, 30],
      ['bananes', 1.7, 15, 25]
    ]
    const hauteurs = [
      ['chaise', 75, 115, 'cm'],
      ['grue', 120, 250, 'dm'],
      ['tour', 50, 180, 'm'],
      ['girafe', 40, 50, 'dm'],
      ['coline', 75, 150, 'm']
    ]
    const typeQuestionsDisponibles = [ // Les dix premières sont identiques dans le fichier betaCaNCM2
      'q1', // Somme d'entiers
      'q2', // Différence d'entiers
      'q3', // Somme d'entiers avec retenue
      'q4', // Différence d'entiers avec retenue
      'q5', // Décomposition
      'q6', // Division d'entiers
      'q7', // Somme décimal et entier
      'q8', // Somme de décimaux
      'q9', // Différence de décimaux
      'q10', // Différence décimaux
      'q11', // Division d'entiers
      'q12', // Addition d'entiers
      'q13', // Différence d'entiers
      'q14', // Produit d'entiers
      'q15', // Produit décimal entier
      'q16', // Ajout d'un décimal à un entier
      'q17', // Fait numérique table de x
      'q18', // Multiplication par 4
      'q19', // Différence de décimaux
      'q20', // Somme de décimaux
      'q21', // Multiple de 8
      'q22', // Multiplication entier et décimal
      'q23', // Multiplier par 20
      'q24', // Proportionnalité
      'q25', // Quotient par 4
      'q26', // Triple d'entier
      'q27', // Soustraction entiers mesures
      'q28', // Durée
      'q29', // Proportionnalité
      'q30' // Addition d'entiers mesures
    ]
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      // texNombre(n) permet d'écrire un nombre avec le bon séparateur décimal
      // calcul(expression) permet d'éviter les erreurs de javascript avec les approximations décimales
      // texNombrec(expression) fait les deux choses ci-dessus.
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
          setReponse(this, i, calcul(a + b), { formatInteractif: 'calcul' })
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
        case 'q11' : // Divisions d'entiers
          a = choice([2, 3, 4, 5])
          b = randint(3, 9)
          c = prenom()
          texte = `J'ai ${calcul(a * b)} ans. Je suis ${a} fois plus âgé que ${c}.<br>Quel âge a ${c} ?`
          texteCorr = `L'âge de ${c} est : $${calcul(a * b)} \\div ${a}=${b}$.`
          setReponse(this, i, b, { formatInteractif: 'calcul' })
          break
        case 'q12' : // Addition d'entiers
          a = randint(1, 2) * 10 + randint(1, 9)
          b = randint(1, 2) * 10 + randint(1, 5)
          c = randint(1, 2) * 10 + randint(1, 9)
          d = personne()
          texte = `${d.prenom} participe à une course par étapes. La première étape fait ${a} km, la deuxième fait ${b} km et la dernière fait ${c} km.<br>Combien de kilomètres ${d.prenom} a-t-${d.pronom} parcourus ?`
          texteCorr = `${d.prenom} a parcouru : ${a} + ${b} + ${c} = ${a + b + c} km`
          setReponse(this, i, calcul(a + b + c), { formatInteractif: 'calcul' })
          break
        case 'q13' : // Différence d'entiers
          a = randint(11, 19)
          b = randint(3, 8)
          c = calcul(a - b)
          d = personne()
          switch (randint(1, 2)) {
            case 1:
              texte = `${d.prenom} a ${a} ans. ${d.pronom} a ${b} ans de plus que son frère.<br>Quel âge a son frère ?`
              texteCorr = `Le frère de ${d.prenom} a : ${a}-${b}=${a - b} ans.`
              break
            case 2:
              texte = `${d.prenom} a ${a} ans. Sa soeur a ${b} ans.<br>Quelle est leur différence d'âge ?`
              texteCorr = `La différence d'âge entre ${d.prenom} et sa soeur est : ${a}-${b}=${a - b} ans.`
              break
          }
          setReponse(this, i, calcul(a - b), { formatInteractif: 'calcul' })
          break
        case 'q14' : // Produit d'entiers
          a = randint(2, 6)
          b = randint(7, 12)
          d = personne()
          switch (randint(1, 2)) {
            case 1:
              texte = `${d.prenom} possède ${a} lots de ${b} ${choice(['crayons', 'cartes', 'stylos', 'livres'])}. Combien en a-t-${d.pronom} ?`
              texteCorr = `${d.prenom} en possède : $${a} \\times ${b}=${calcul(a * b)}$`
              break
            case 2:
              texte = `${d.prenom} a couru ${a} séquences de ${b} minutes. Combien de minutes a-t-${d.pronom} couru en tout ?`
              texteCorr = `${d.prenom} a couru : $${a} \\times ${b}=${calcul(a * b)}$ minutes.`
              break
          }
          setReponse(this, i, calcul(a * b), { formatInteractif: 'calcul' })
          break
        case 'q15': // Produit décimal entier
          a = calcul(randint(1, 5) + randint(1, 5) / 10)
          b = randint(2, 5)
          c = choice(fruits2)
          d = personne()
          texte = `Les ${c[0]} sont vendus ${texPrix(c[1])} € par kilogramme. ${d.prenom} en achète ${b} kg. Combien va-t-${d.pronom} payer ?`
          texteCorr = `${d.prenom} devra payer $${b}*${texPrix(c[1])}=${texPrix(c[1] * b)}$ €.`
          setReponse(this, i, calcul(b * c[1]), { formatInteractif: 'calcul' })
          break
        case 'q16': // ajout d'un décimal à un entier
          a = calcul(randint(1, 5) + randint(1, 5) / 10)
          b = randint(1, 15)
          switch (randint(1, 3)) {
            case 1:
              texte = `Combien font ${b} de plus que ${texNombre(a)} ?`
              texteCorr = `$${texNombre(a)}+${b}=${texNombrec(a + b)}$`
              break
            case 2:
              texte = `$\\ldots - ${texNombre(a)}=${b}$`
              texteCorr = `$${miseEnEvidence(texNombrec(a + b))} - ${texNombre(a)}=${b}$`
              break
            case 3:
              texte = `$\\ldots - ${b}=${texNombre(a)}$`
              texteCorr = `$${miseEnEvidence(texNombrec(a + b))} - ${b}=${texNombre(a)}$`
              break
          }
          setReponse(this, i, calcul(a + b), { formatInteractif: 'calcul' })
          break
        case 'q17' : // fait numérique table de multiplication
          a = randint(2, 9)
          b = randint(5, 9)
          switch (randint(1, 3)) {
            case 1:
              texte = `$${a} \\times ${b}$`
              texteCorr = `$${a} \\times ${b}=${calcul(a * b)}$`
              setReponse(this, i, calcul(a * b), { formatInteractif: 'calcul' })
              break
            case 2:
              texte = `$${a} \\times \\ldots = ${calcul(a * b)}$`
              texteCorr = `$${a} \\times ${miseEnEvidence(b)}=${calcul(a * b)}$`
              setReponse(this, i, b, { formatInteractif: 'calcul' })
              break
            case 3:
              texte = `$\\ldots \\times ${b}= ${calcul(a * b)}$`
              texteCorr = `$${miseEnEvidence(a)} \\times ${b}=${calcul(a * b)}$`
              setReponse(this, i, a, { formatInteractif: 'calcul' })
              break
          }
          break
        case 'q18' : // fait numérique multiplication par 4
          a = randint(6, 19)
          switch (randint(1, 3)) {
            case 1:
              texte = choice([`$${a} \\times 4$`, `$4 \\times ${a}$`])
              break
            case 2:
              texte = `Quel est le périmètre d'un carré de côté ${a} ?`
              texteCorr = `$${a} \\times 4=${calcul(a * 4)}$`
              break
            case 3:
              texte = `Le double du double de ${a}`
              break
          }
          texteCorr = `$${a} \\times 4=${calcul(a * 4)}$`
          setReponse(this, i, calcul(a * 4), { formatInteractif: 'calcul' })
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
  11 : Division d'entiers\n
  12 : Addition d'entiers\n
  13 : Différence d'entiers\n
  14 : Produit d'entiers\n
  15 : Produit décimal entier\n
  16 : Ajout d'un décimal à un entier\n
  17 : Fait numérique table de x\n
  18 : Multiplication par 4\n
  19 : Différence de décimaux\n
  20 : Somme de décimaux\n
  21 : Multiple de 8\n
  22 : Multiplication entier et décimal\n
  23 : Multiplier par 20\n
  24 : Proportionnalité\n
  25 : Quotient par 4\n
  26 : Triple d'entier\n
  27 : Soustraction entiers mesures\n
  28 : Durée\n
  29 : Proportionnalité\n
  30 : Addition d'entiers mesures `]
}
