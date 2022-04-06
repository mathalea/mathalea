import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, calcul, pgcd, texNombrec, choice, texNombre, sp, shuffle, texPrix, combinaisonListesSansChangerOrdre, range1 } from '../../../modules/outils.js'
import FractionEtendue from '../../../modules/FractionEtendue.js'
import Grandeur from '../../../modules/Grandeur.js'
import { droiteGraduee2, mathalea2d } from '../../../modules/2d.js'
import { ajouteChampTexte, setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
export const titre = 'Course aux nombres fin de 6e'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Course aux nombres avec 30 questions pour fin de 6e
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can Predef6-3
*/
export default function CourseAuxNombres6e (numeroExercice) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 30
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
    let a, b, c, d, resultat, propositions
    let questions = []
    if (!this.sup) {
      // Si aucune question n'est sélectionnée
      questions = combinaisonListesSansChangerOrdre(range1(30), this.nbQuestions)
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
      'q1', // On donne le double d'un nombre et on demande sa moitié
      'q2', // On demande le nombre qui, multiplié par a donne b (3 type de réponses acceptés : décimale, fractionnaire ou a+b/c)
      'q3', // Somme astucieuse de 4 nombres entiers
      'q4', // Somme de deux décimaux avec retenue
      'q5', // Double ou triple d'un nombre entier de 2 chiffres
      'q6', // Double ou triple d'un nombre décimal
      'q7', // Recomposition d'un entier
      'q8', // tables de multiplication
      'q9', // soustraire un nombre se finissant par 9
      'q10', // Le quart ou le tiers d'un nombre.
      'q11', // Recomposer un nombre à partir d'un nombre de centaines et d'un nombre d'unités
      'q12', // Recomposer une nombre avec chevauchement.
      'q13', // conversion heures et minutes
      'q14', // Reste de la division par 3
      'q15', // Une division par 9 qui tombe juste
      'q16', // ajouter un nombre de la forme 10n+9
      'q17', // 4 × #,## × 25 ou 2 × #,## × 50
      'q18', // addition à trou
      'q19', // Nombre pair de 2 chiffres × 2
      'q20', // Proportionnalité simple
      'q21', // Ordre de grandeur
      'q22', // Conversion cm -> m
      'q23', // Fraction 1/n d'une quantité de L
      'q24', // Reste de la division euclidienne
      'q25', // Ordre de grandeur : hauteurs
      'q26', // Appliquer un pourcentage
      'q27', // Calcul de distance à vitesse constante
      'q28', // Comparaison de périmètre
      'q29', // Repérage fraction
      'q30' // Proportionnalité par linéarité

    ] // On créé 3 types de questions
    for (let i = 0, q = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (typeQuestionsDisponibles[listeIndex[i]]) { // Suivant le type de question, le contenu sera différent
        case 'q1':
          a = randint(1, 25)
          texte = `Le double d'un nombre vaut ${2 * a}, combien vaut sa moitié ?`
          texteCorr = `Le nombre est ${a}, sa moitié est ${texNombrec(a / 2)}.`
          setReponse(this, q, calcul(a / 2), { formatInteractif: 'calcul' })
          break
        case 'q2':
          a = randint(2, 25)
          b = randint(2, 25, a)
          a = calcul(a / pgcd(a, b))
          b = calcul(b / pgcd(a, b))
          c = new FractionEtendue(a, b)
          resultat = calcul(a / b)
          texte = `Quel est le nombre qui, multiplié par ${b} donne ${a} ?`
          texteCorr = `c'est $${c.texFraction}$ car $${c.texFraction}\\times ${b} = ${a}$`
          if (!c.valeurDecimale) {
            setReponse(this, q, [c.texFraction, `${Math.floor(a / b)}+\\dfrac{${a % b}}{${b}}`], { formatInteractif: 'calcul' })
          } else {
            setReponse(this, q, [c.texFraction, resultat, `${Math.floor(a / b)}+\\dfrac{${a % b}}{${b}}`], { formatInteractif: 'calcul' })
          }
          break
        case 'q3':
          a = randint(1, 9)
          b = randint(1, 9, a)
          c = randint(3, 7) * 10
          d = randint(10, 15) * 10 - c
          resultat = calcul(2 * (c + d))
          texte = `$${c - a} + ${d + b} + ${c + a} + ${d - b}$`
          texteCorr = `$${c - a} + ${c + a} + ${d + b}  + ${d - b} = ${2 * c} + ${2 * d}= ${2 * (c + d)}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q4':
          a = randint(1, 9)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          d = randint(1, 9, [a, b, c])
          resultat = calcul(10 + (b + d) * 0.1 + c * 0.01)
          texte = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}$`
          texteCorr = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}=${texNombrec(10 + (b + d) * 0.1 + c * 0.01)}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q5':
          a = randint(1, 3)
          b = randint(1, 9, a)
          c = calcul(a * 10 + b)
          if (choice([true, false])) {
            resultat = calcul(3 * c)
            texte = `Quel est le triple de $${texNombre(c)}$ ?`
            texteCorr = `Le triple de $${texNombre(c)}$ est $3 \\times ${texNombre(c)}=${texNombrec(3 * c)}$.`
          } else {
            resultat = calcul(2 * c)
            texte = `Quel est le double de $${texNombre(c)}$ ?`
            texteCorr = `Le double de $${texNombre(c)}$ est $2 \\times ${texNombre(c)}=${texNombrec(2 * c)}$.`
          }
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q6':
          a = randint(1, 3)
          b = randint(1, 9, a)
          d = randint(1, 9)
          c = calcul(a * 10 + b + d * 0.1)
          if (choice([true, false])) {
            resultat = calcul(3 * c)
            texte = `Quel est le triple de $${texNombre(c)}$ ?`
            texteCorr = `Le triple de $${texNombre(c)}$ est $3 \\times ${texNombre(c)}=${texNombrec(3 * c)}$.`
            setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          } else {
            resultat = calcul(2 * c)
            texte = `Quel est le double de $${texNombre(c)}$ ?`
            texteCorr = `Le double de $${texNombre(c)}$ est $2 \\times ${texNombre(c)}=${texNombrec(2 * c)}$.`
            setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          }
          break
        case 'q7':
          a = randint(1, 3)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          resultat = calcul(a * 1000 + b * 10 + c * 100)
          texte = `$${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100$`
          texteCorr = `$${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100 =${texNombre(resultat)}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q8':
          a = randint(5, 9)
          b = randint(5, 9)
          resultat = a * b
          texte = `$${a} \\times ${b}$`
          texteCorr = `$${a} \\times ${b}=${a * b}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q9':
          a = randint(5, 9)
          b = randint(2, 8)
          c = randint(1, 3)
          resultat = calcul(a * 10 + b - c * 10 - 9)
          texte = `$${a * 10 + b} - ${c * 10 + 9}$`
          texteCorr = `$${a * 10 + b} - ${c * 10 + 9}=${a * 10 + b}-${(c + 1) * 10} + 1 = ${resultat}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q10':
          a = randint(5, 15)

          if (choice([true, false])) {
            b = a * 8
            resultat = a * 2
            texte = `Quel est le quart de $${b}$ ?`
            texteCorr = `Le quart de $${b}$ est $${a * 2}.$`
            setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          } else {
            b = a * 6
            resultat = a * 2
            texte = `Quel est le tiers de $${b}$ ?`
            texteCorr = `Le tiers de $${b}$ est $${a * 2}.$`
            setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          }
          break
        case 'q11':
          a = randint(20, 70)
          b = randint(20, 70, a)
          resultat = a * 100 + b
          texte = `$${a}$ centaines et $${b}$ unités = ?`
          texteCorr = `$${a} \\times 100 + ${b} = ${a * 100 + b}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q12':
          a = randint(20, 70)
          b = randint(20, 70, a)
          resultat = a * 100 + b * 10
          texte = `$${a}$ centaines et $${b}$ dizaines = ?`
          texteCorr = `$${a} \\times 100 + ${b} \\times 10 = ${a * 100 + b * 10}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q13':
          a = randint(2, 4)
          b = randint(10, 59)
          d = calcul(a * 60 + b)
          texte = `Convertir $${d}$ minutes en heures et minutes (format : ...h...min)`
          texteCorr = `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ minutes = ${a}h ${b}min`
          setReponse(this, q, `${a}h${b}min`, { formatInteractif: 'texte' })
          break
        case 'q14':
          b = randint(1, 9)
          c = randint(0, 9)
          d = randint(0, 9, [b, c])
          a = calcul(b * 100 + c * 10 + d)
          resultat = a % 3
          texte = `Quel est le reste de la division de $${a}$ par $3$ ?`
          texteCorr = `Le reste de la division de $${a}$ par $3$ est ${a % 3}`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q15':
          b = randint(5, 9)
          a = calcul(b * 90 + 9)
          resultat = b * 10 + 1
          texte = `$${a}\\div 9$`
          texteCorr = `$${a}\\div 9 = ${resultat}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q16':
          a = randint(5, 9)
          b = randint(2, 8)
          c = randint(1, 3)
          resultat = calcul(a * 10 + b + c * 10 + 9)
          texte = `$${a * 10 + b} + ${c * 10 + 9}$`
          texteCorr = `$${a * 10 + b} + ${c * 10 + 9}=${a * 10 + b}+${(c + 1) * 10} - 1 = ${resultat}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q17':
          a = randint(1, 9)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          d = calcul(a + b * 0.1 + c * 0.01)
          resultat = calcul(100 * d)
          switch (choice([1, 2, 3, 4])) {
            case 1:
              texte = `$4 \\times ${texNombre(d)}\\times 25$`
              texteCorr = `$4 \\times ${texNombre(d)}\\times 25 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
              break
            case 2:
              texte = `$2 \\times ${texNombre(d)}\\times 50$`
              texteCorr = `$2 \\times ${texNombre(d)}\\times 50 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
              break
            case 3:
              texte = `$25 \\times ${texNombre(d)}\\times 4$`
              texteCorr = `$25 \\times ${texNombre(d)}\\times 4 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
              break
            case 4:
              texte = `$50 \\times ${texNombre(d)}\\times 2$`
              texteCorr = `$50 \\times ${texNombre(d)}\\times 2 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
              break
          }
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q18':
          a = randint(5, 9)
          b = randint(6, 9)
          c = randint(1, 5)
          d = randint(1, 4)
          resultat = d * 10 + b
          texte = `$${c * 10 + a} + \\dots = ${calcul((c + d) * 10 + b + a)}$`
          texteCorr = `$${calcul((c + d) * 10 + b + a)} - ${c * 10 + a} = ${resultat}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q19':
          a = randint(11, 24) * 2
          resultat = calcul(a * 5)
          texte = `$${a}\\times 5$`
          texteCorr = `$${a}\\times 5 = ${a} \\div 2 \\times 10 = ${calcul(a / 2)}\\times 10 =${resultat}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q20':
          a = randint(0, 7)
          b = fruits[a][1]
          c = randint(fruits[a][2], fruits[a][3])
          resultat = calcul(c / 5 * b)
          texte = `$${texNombrec(c / 10)}$ kg de ${fruits[a][0]} coûtent $${texNombrec(c / 10 * b)}$ €, combien coûtent $${texNombrec(c / 5)}$ kg de ${fruits[a][0]} ?`
          texteCorr = `$${texNombrec(c / 10 * b)} \\times 2 = ${texNombre(resultat)}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q21':
          a = randint(3, 7)
          b = randint(2, 9)
          c = randint(1, 9)
          d = randint(5, 9)
          resultat = calcul((a * 100 + b * 10 + c) * d)
          texte = `$${texNombrec(a * 100 + b * 10 + c)}\\times ${d}$<br> Choisis la bonne réponse sans effectuer précisément le calcul<br>`
          propositions = shuffle([`$${texNombre(resultat)}$`, `$${texNombrec(d * 1000 + a * 100 + b * 10 + c)}$`, `$${texNombrec((a * 1000 + b * 100 + c) * d)}$`])
          texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
          texteCorr = `$${texNombrec(a * 100 + b * 10 + c)} \\times ${d} = ${texNombre(resultat)}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q22':
          a = randint(11, 24) * 10 + randint(0, 9)
          resultat = calcul(a / 100)
          texte = `$${a}$ cm font combien de mètres ?`
          texteCorr = `$${a} cm = ${texNombre(resultat)} m$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q23':
          a = randint(3, 5)
          resultat = calcul(randint(2, 9) * 10)
          b = calcul(resultat * a)
          texte = `$\\dfrac{1}{${a}} \\text{ de } ${b} \\text{ L} = \\dots \\text{ L}$`
          texteCorr = `$\\dfrac{1}{${a}}$ de $${b}$ L = ${resultat} L`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q24':
          a = randint(7, 9)
          b = randint(1, a - 1)
          d = randint(5, 9)
          c = d * a + b
          resultat = c % a
          texte = `Je possède ${c} bonbons et je fabrique des sacs de ${a} bonbons. Une fois mes sacs complétés, combien me restera-t-il de bonbons ?`
          texteCorr = `$${c}=${d}\\times ${a} + ${b}$ , donc il me restera ${b} bonbons.`
          setReponse(this, q, b, { formatInteractif: 'calcul' })
          break
        case 'q25':
          a = randint(0, 4)
          b = randint(hauteurs[a][1], hauteurs[a][2])
          propositions = shuffle([`$${b}$ m`, `$${b}$ dm`, `$${b}$ cm`])
          texte = `Choisis parmi les propositions suivantes la hauteur d'une ${hauteurs[a][0]} (nombre et unité)<br>`
          texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
          texteCorr = `La hauteur d'une ${hauteurs[a][0]} est ${b} ${hauteurs[a][3]}`
          setReponse(this, q, new Grandeur(b, hauteurs[a][3]), { formatInteractif: 'unites' })
          break
        case 'q26':
          a = randint(2, 9) * 10
          b = randint(2, 9, a) * 10
          resultat = calcul(a * b / 100)
          texte = `$${a}\\%$ de $${b}$`
          texteCorr = `$${a}\\%$ de $${b} = ${resultat}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q27':
          a = randint(3, 6) * 20
          b = randint(1, 3)
          resultat = calcul(a * (b + 0.5))
          texte = `Une voiture roule à une vitesse constante de ${a} km/h. Combien de kilomètres parcourt-elle en ${b} h et 30 min ?`
          texteCorr = `$${a}\\times ${texNombrec(b + 0.5)} = ${resultat}$`
          setReponse(this, q, resultat, { formatInteractif: 'calcul' })
          break
        case 'q28':
          a = randint(3, 9)
          b = randint(0, 1)
          texte = `Est-il vrai qu'un carré de côté ${a} cm a le même périmètre qu'un rectangle de largeur ${a - b} cm et de longueur ${a + 1} cm ? (V ou F)`
          if (b === 0) {
            texteCorr = `Faux car $4\\times ${a}$ cm $\\neq 2\\times ${a}$ cm $+ 2\\times ${a + 1}$ cm.`
            setReponse(this, q, 'F')
          } else {
            texteCorr = `Vrai car $4\\times ${a}$ cm $= 2\\times ${a - 1}$ cm $+ 2\\times ${a + 1}$ cm $= ${4 * a}$ cm.`
            setReponse(this, q, 'V')
          }
          break
        case 'q29':
          a = randint(3, 5) // dénominateur
          b = randint(2, a * 4 - 1) // numérateur
          c = new FractionEtendue(b, a)
          resultat = calcul(b / a)

          texte = 'Determiner l\'abscisse du point A situé ci-dessous :<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5, scale: 0.5 }, droiteGraduee2({
            Unite: 3,
            Min: 0,
            Max: 4.2,
            x: 0,
            y: 0,
            thickSecDist: 1 / a,
            thickSec: true,
            thickoffset: 0,
            axeStyle: '|->',
            pointListe: [[b / a, 'A']],
            pointCouleur: 'blue',
            pointStyle: 'x',
            labelsPrincipaux: true,
            step1: 1,
            step2: 1
          }))
          texteCorr = `L'abscisse du point A est $\\dfrac{${b}}{${a}}$`
          if (a === 3) {
            setReponse(this, q, [c.texFraction, `${Math.floor(a / b)}+\\dfrac{${a % b}}{${b}}`], { formatInteractif: 'calcul' })
          } else {
            setReponse(this, q, [c.texFraction, resultat, `${Math.floor(a / b)}+\\dfrac{${a % b}}{${b}}`], { formatInteractif: 'calcul' })
          }
          break
        case 'q30':
          a = randint(0, 7) // index du fruit
          b = calcul(fruits[a][1] * (1 + choice([-1, 1]) * randint(1, 3) * 0.1)) // prix au kg
          c = Math.round(randint(fruits[a][2], fruits[a][3] / 10)) // nombre de kg première valeur
          d = randint(3, 6) // nombre de kg supplémentaires
          resultat = calcul(d * b)
          texte = `$${c}$ kg de ${fruits[a][0]} coûtent $${texPrix(c * b)}$ €.<br> $${c + d}$ kg de ces mêmes ${fruits[a][0]} coûtent $${texPrix((c + d) * b)}$ €.<br>Combien coûtent ${d} kg de ces ${fruits[a][0]} ?`
          texteCorr = `$${texPrix((c + d) * b)} € - ${texPrix(c * b)} € =${texPrix(resultat)} €$`
          setReponse(this, q, texPrix(resultat) + '€')
          break
      }
      if (typeQuestionsDisponibles[listeIndex[i]] === 'q25') {
        texte += ajouteChampTexteMathLive(this, q, 'longueur')
      } else if (typeQuestionsDisponibles[listeIndex[i]] === 'q13') {
        texte += ajouteChampTexte(this, q)
      } else {
        texte += ajouteChampTexteMathLive(this, q)
      }

      if (this.questionJamaisPosee(i, a, b, c, listeIndex[i])) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
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
  19 :  Nombre pair de 2 chiffres × 5\n
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
