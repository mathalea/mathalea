import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, calcul, pgcd, texNombrec, choice, texNombre, sp, shuffle, texPrix, combinaisonListesSansChangerOrdre, range1 } from '../../modules/outils.js'
import { ajouteChampTexte, ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import Fraction from '../../modules/Fraction.js'
import Grandeur from '../../modules/Grandeur.js'
import { droiteGraduee2, mathalea2d } from '../../modules/2d.js'
export const titre = 'Course aux nombres seconde'
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
    let a, b, c, d, N, resultat, propositions
    let questions = []
    if (!this.sup) {
      // Si aucune question n'est sélectionnée
      questions = combinaisonListesSansChangerOrdre(range1(2), this.nbQuestions)
    } else {
      if (typeof this.sup === 'number') {
        // Si c'est un nombre c'est qu'il y a qu'une seule question
        questions[0] = this.sup
        this.nbQuestions = 5
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
    const typeQuestionsDisponibles = [
      'q1', // produit d'entiers
      'q2', // somme ou différence d'entiers
      'q3', // Tiers, moitié, proportions d'une quantité
      'q4', // Conversion heures, minutes ....
      'q5', // Calcul expression algébrique
      'q6', // pourcentage
      'q7', // *10, 100 0,1...ou division
      'q8', // droite graduée
      'q9', // Périmètre/aires
      'q10', // fraction
      'q11', // proportionnalité
      'q12', // fraction (mise au même )
      'q13', // coefficient directeur
      'q14', // encadrement, arrondi
      'q15', // problème géométrique
      'q16', // arithmétique
      'q17', // calcul (astucieux, évolution pourcentage, ....)
      'q18', // probabilité
      'q19', // Milieu/distance
      'q20', // pourcentage
      'q21', // image par une fonction
      'q22', // triangle (pythagore, thalès, ...)
      'q23', // Intervalles
      'q24', // statistiques
      'q25', // fonction (lectures graphiques, images, antécédents, variations....)
      'q26', // fonction (calcul, VI)
      'q27', // Calcul avec des fractions <-> écriture décimale
      'q28', //  Problèmes avec des heures
      'q29', // vecteurs
      'q30' // inéquation, signes
    ]
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (typeQuestionsDisponibles[listeIndex[i]]) { // Suivant le type de question, le contenu sera différent
        case 'q1':// produit d'entiers
          a = randint(3, 9)
          b = randint(3, 9)
          resultat = a * b
          texte = `$${a} \\times ${b}=$`
          texteCorr = `$${a} \\times ${b}=${a * b}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break

        case 'q2':
          switch (choice([1, 2, 3, 4, 5, 6])) {
            case 1:// somme d'entiers à deux chiffres avec retenue
              a = randint(1, 2) * 10 + randint(5, 9)
              b = randint(1, 4) * 10 + randint(11 - a % 10, 9)
              texte = `$${a}+${b}=$`
              texteCorr = `$${a}+${b}=${a + b}$`
              setReponse(this, i, a + b, { formatInteractif: 'calcul' })
              break

            case 2:// différence avec 100
              a = randint(11, 70)
              texte = `$100-${a}=$`
              texteCorr = `$100-${a}=${100 - a}$`
              setReponse(this, i, 100 - a, { formatInteractif: 'calcul' })
              break

            case 3:// différence négative
              a = randint(8, 15)
              b = randint(18, 30)
              texte = `$${a}-${b}=$`
              texteCorr = `$${a}-${b}=${a - b}$`
              setReponse(this, i, a - b, { formatInteractif: 'calcul' })
              break

            case 4:// produit positif
              a = randint(2, 7)
              b = randint(11, 25)
              texte = `$${a}\\times${b}=$`
              texteCorr = `$${a}\\times${b}=${a * b}$`
              setReponse(this, i, a * b, { formatInteractif: 'calcul' })
              break

            case 5:// division
              a = randint(6, 9)
              N = randint(7, 12)
              b = a * N
              texte = `$${b}\\div${a}=$`
              texteCorr = `$${b}\\div${a}=${b / a}$`
              setReponse(this, i, b / a, { formatInteractif: 'calcul' })
              break

              case 6:// différence avec 1
              a = randint(2, 9)/100

                            texte = `$1-${a}=$`
              texteCorr = `$1-${a}=${1-a}$`
              setReponse(this, i, 1-a, { formatInteractif: 'calcul' })
              break
          }

          case 'q3':
            switch (choice([1, 2, 3, 4, 5, 6])) {
              case 1:// somme d'entiers à deux chiffres avec retenue
                a = randint(1, 2) * 10 + randint(5, 9)
                b = randint(1, 4) * 10 + randint(11 - a % 10, 9)
                texte = `$${a}+${b}=$`
                texteCorr = `$${a}+${b}=${a + b}$`
                setReponse(this, i, a + b, { formatInteractif: 'calcul' })
                break
  
              case 2:// différence avec 100
                a = randint(11, 70)
                texte = `$100-${a}=$`
                texteCorr = `$100-${a}=${100 - a}$`
                setReponse(this, i, 100 - a, { formatInteractif: 'calcul' })
                break
  
              case 3:// différence négative
                a = randint(8, 15)
                b = randint(18, 30)
                texte = `$${a}-${b}=$`
                texteCorr = `$${a}-${b}=${a - b}$`
                setReponse(this, i, a - b, { formatInteractif: 'calcul' })
                break
  
              case 4:// produit positif
                a = randint(2, 7)
                b = randint(11, 25)
                texte = `$${a}\\times${b}=$`
                texteCorr = `$${a}\\times${b}=${a * b}$`
                setReponse(this, i, a * b, { formatInteractif: 'calcul' })
                break
  
              case 5:// division
                a = randint(6, 9)
                N = randint(7, 12)
                b = a * N
                texte = `$${b}\\div${a}=$`
                texteCorr = `$${b}\\div${a}=${b / a}$`
                setReponse(this, i, b / a, { formatInteractif: 'calcul' })
                break
  
                case 6:// différence avec 1
                a = randint(2, 9)/100
  
                              texte = `$1-${a}=$`
                texteCorr = `$1-${a}=${1-a}$`
                setReponse(this, i, 1-a, { formatInteractif: 'calcul' })
                break
            }
  

        
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
