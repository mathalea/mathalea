import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, calcul, texNombrec, choice, texNombre, sp, shuffle, texPrix, combinaisonListesSansChangerOrdre } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import FractionEtendue from '../../../modules/FractionEtendue.js'
import Grandeur from '../../../modules/Grandeur.js'
import { droiteGraduee } from '../../../modules/2d.js'
export const titre = 'Course aux nombres début de 5e'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Course aux nombres avec 30 questions début de 5e
 * @author jeanclaude Lhote
 * Créé pendant l'été 2021
 * Référence canPredef5-1
*/
export const uuid = '9e40d'
export const ref = 'can5a-xxxx'
export default function CourseAuxNombres5e (numeroExercice) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 30
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let a, b, c, d, resultat, propositions
    const fruits = [
      ['pêches', 4, 10, 30],
      ['noix', 5, 4, 13],
      ['cerises', 6, 11, 20],
      ['pommes', 2, 20, 40],
      ['framboises', 15, 1, 5],
      ['fraises', 6, 5, 10],
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
      'q2', // somme d'entiers
      'q3', // différence d'entiers
      'q4', // Somme de deux décimaux avec retenue
      'q5', // Somme stratégique d'entiers
      'q6', // conversions horaires
      'q7', // (double, moitié, triple, tiers ...)
      'q8', // produit stratégique
      'q9', // division
      'q10', // division euclidienne
      'q11', // priorités opératoires
      'q12', // différence ab - ce avec e>b
      'q13', // petit problème numérique
      'q14', // produit ab × c
      'q15', // somme des angles
      'q16', // critère de divisibilité
      'q17', // quart
      'q18', // Moitié (aboutir à un décimal)
      'q19', // a/b × c
      'q20', // Proportionnalité simple
      'q21', // pourcentage.
      'q22', // simplification de fraction
      'q23', // produit de décimaux.
      'q24', // quotient comme pourcentage
      'q25', // Grandeurs métriques
      'q26', // Durée
      'q27', // Soustraction/ordre de grandeur
      'q28', // Proportionnalité
      'q29', // quotient d'un entier par un décimal
      'q30' // produit stratégique
    ] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListesSansChangerOrdre(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'q1':
          a = randint(12, 19)
          b = randint(2, 5)
          resultat = a * b
          texte = `$${a} \\times ${b}$`
          texteCorr = `$${a} \\times ${b}=${a * b}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q2':
          a = randint(2, 50) + 100
          b = randint(50, 99)
          resultat = calcul(a + b)
          texte = `$${b} + ${a}$`
          texteCorr = `$${b} + ${a}=${a + b}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q3':
          a = randint(2, 50) + 100
          b = randint(50, 99)
          resultat = calcul(a - b)
          texte = `$${a} - ${b}$`
          texteCorr = `$${a} - ${b}=${a - b}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q4':
          a = randint(1, 9)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          d = randint(1, 9, [a, b, c])
          resultat = calcul(10 + (b + d) * 0.1 + c * 0.01)
          texte = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}$`
          texteCorr = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}=${texNombrec(10 + (b + d) * 0.1 + c * 0.01)}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q5':
          a = randint(1, 9)
          b = randint(1, 9, a)
          c = randint(3, 7) * 10
          d = randint(10, 15) * 10 - c
          resultat = calcul(2 * (c + d))
          texte = `$${c - a} + ${d + b} + ${c + a} + ${d - b}$`
          texteCorr = `$${c - a} + ${d + b} + ${c + a} + ${d - b} = ${2 * c} + ${2 * d} = ${2 * (c + d)}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })

          break
        case 'q6':
          a = randint(2, 4)
          b = randint(10, 59)
          d = calcul(a * 60 + b)
          texte = `Convertir $${d}$ minutes en heures(h) et minutes(min) :`
          texteCorr = `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ minutes = ${a}h ${b}min`
          setReponse(this, i, `${a}h${b}min`)
          break
        case 'q7':
          a = randint(1, 10) * 2
          texte = `Le triple d'un nombre vaut ${3 * a}, combien vaut sa moitié ?`
          texteCorr = `Le nombre est ${a}, sa moitié est ${calcul(a / 2)}.`
          setReponse(this, i, calcul(a / 2), { formatInteractif: 'calcul' })
          break
        case 'q8':
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
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q9':
          a = randint(5, 15)
          b = randint(2, 8)
          c = a * b
          resultat = a
          texte = `$${c} \\div ${b}$`
          texteCorr = `$${c} \\div ${b}=${a}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q10':
          a = choice([25, 20, 50, 40])
          b = randint(5, a - 1)
          c = randint(3, 9)
          d = c * a + b
          texte = `Quel est le reste de la division de ${d} par ${a} ?`
          texteCorr = `$${d}=${a} \\times ${c} + ${b}$ avec $${b}<${a}$ donc le reste de la division de ${d} par ${a} est ${b}.`
          setReponse(this, i, b, { formatInteractif: 'calcul' })
          break
        case 'q11':
          a = randint(5, 9)
          b = 20 - a
          c = randint(3, 9)
          resultat = b + a * c
          texte = `$${b} + ${a} \\times ${c}$`
          texteCorr = `$${b} + ${a} \\times ${c}= ${b} + ${a * c} = ${resultat}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q12':
          a = randint(20, 70)
          b = randint(20, 70, a)
          resultat = a * 100 + b * 10
          texte = `$${a}$ centaines et $${b}$ dizaines = ?`
          texteCorr = `$${a} \\times 100 + ${b} \\times 10 = ${a * 100 + b * 10}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q13':
          a = randint(2, 4)
          b = randint(10, 59)
          d = calcul(a * 60 + b)
          texte = `$${a}$ heures et ${b} minutes font combien de minutes ?`
          texteCorr = `$${a}h ${b}min = ${a} \\times 60 + ${b}= ${d}$ donc $${d}$ minutes`
          setReponse(this, i, d)
          break
        case 'q14':
          b = randint(1, 9)
          c = randint(0, 9)
          d = randint(0, 9, [b, c])
          a = calcul(b * 100 + c * 10 + d)
          resultat = a % 3
          texte = `Quel est le reste de la division de $${a}$ par $3$ ?`
          texteCorr = `Le reste de la division de $${a}$ par $3$ est ${a % 3}`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q15':
          b = randint(5, 9)
          a = calcul(b * 90 + 9)
          resultat = b * 10 + 1
          texte = `$${a}\\div 9$`
          texteCorr = `$${a}\\div 9 = ${c}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q16':
          a = randint(5, 9)
          b = randint(2, 8)
          c = randint(1, 3)
          resultat = calcul(a * 10 + b + c * 10 + 9)
          texte = `$${a * 10 + b} + ${c * 10 + 9}$`
          texteCorr = `$${a * 10 + b} + ${c * 10 + 9}=${a * 10 + b}+${(c + 1) * 10} - 1 = ${d}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q17':
          a = randint(5, 15)
          b = a * 8
          resultat = a * 2
          texte = `Quel est le quart de $${b}$ ?`
          texteCorr = `Le quart de $${b}$ est $${a * 2}.$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q18':
          a = randint(5, 9)
          b = randint(6, 9)
          c = randint(1, 5)
          d = randint(1, 4)
          resultat = d * 10 + b
          texte = `$${c * 10 + a} + \\dots = ${calcul((c + d) * 10 + b + a)}$`
          texteCorr = `$${calcul((c + d) * 10 + b + a)} - ${c * 10 + a} = ${resultat}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q19':
          a = randint(11, 24) * 2 + 1
          resultat = calcul(a * 5)
          texte = `$${a}\\times 5$`
          texteCorr = `$${a}\\times 5 = ${a} \\div 2 \\times 10 = ${calcul(a / 2)}\\times 10 =${resultat}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q20':
          a = randint(0, 7)
          b = fruits[a][1]
          c = randint(fruits[a][2], fruits[a][3])
          resultat = calcul(c / 50 * b)
          texte = `$${texNombrec(c / 100)}$ kg de ${fruits[a][0]} coûtent $${texNombrec(c / 100 * b)}$ €, combien coûtent $${texNombrec(c / 50)}$ kg de ${fruits[a][0]} ?`
          texteCorr = `$${texNombrec(c / 100 * b)} \\times 2 = ${texNombre(resultat)}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q21':
          a = randint(3, 7)
          b = randint(2, 9)
          c = randint(1, 9)
          d = randint(5, 9) * choice([10, 100])
          resultat = calcul((a * 100 + b * 10 + c) * d)
          texte = `$${texNombrec(a * 100 + b * 10 + c)}\\times ${d}$<br> Choisis la bonne réponse sans effectuer précisément le calcul<br>`
          propositions = shuffle([`$${texNombre(resultat)}$`, `$${texNombrec(d * 1000 + a * 100 + b * 10 + c)}$`, `$${texNombrec((a * 1000 + b * 100 + c) * d)}$`])
          texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
          texteCorr = `$${texNombrec(a * 100 + b * 10 + c)} \\times ${d} = ${texNombre(resultat)}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q22':
          a = randint(11, 24) * 10 + randint(0, 9)
          if (choice([true, false])) {
            resultat = calcul(a / 100)
            texte = `Convertir $${a}$ cm en m.`
            texteCorr = `$${a}$ cm $= ${a} / 100$m $=${texNombre(resultat)}$ m`
          } else {
            resultat = calcul(a / 1000)
            texte = `Convertir $${a}$ mm en m.`
            texteCorr = `$${a}$ mm $= ${a} / 1000$m $=${texNombre(resultat)}$ m`
          }
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q23':
          a = randint(4, 5)
          c = randint(2, 3)
          resultat = calcul(randint(2, 9) * 10)
          b = calcul(resultat * a)

          texte = `$\\dfrac{${c}}{${a}} \\text{ de } ${b} \\text{ L} = \\dots \\text{ L}$`
          texteCorr = `$\\dfrac{${c}}{${a}}$ de $${b}$ L = ${c}\\times \\dfrac{${b}}{${a}}=${c}\\times ${resultat}=${resultat * c} L`
          setReponse(this, i, resultat * c, { formatInteractif: 'calcul' })
          break
        case 'q24':
          a = choice([12, 15, 20, 25])
          b = randint(1, a - 1)
          d = randint(5, 9)
          c = d * a + b
          resultat = c % a
          texte = `Je possède ${c} bonbons et je fabrique des sacs de ${a} bonbons. Une fois mes sacs complétés, combien me restera-t-il de bonbons ?`
          texteCorr = `$${c}=${d}\\times ${a} + ${b}$ , donc il me restera ${b} bonbons.`
          setReponse(this, i, b, { formatInteractif: 'calcul' })
          break
        case 'q25':
          a = randint(0, 4)
          b = randint(hauteurs[a][1], hauteurs[a][2])
          propositions = shuffle([`$${b}$ m`, `$${b}$ dm`, `$${b}$ cm`])
          texte = `Choisis parmi les propositions suivantes la hauteur d'une ${hauteurs[a][0]}<br>`
          texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
          texteCorr = `La hauteur d'une ${hauteurs[a][0]} est ${b} ${hauteurs[a][3]}`
          setReponse(this, i, new Grandeur(b, hauteurs[a][3]), { formatInteractif: 'unites' })
          break
        case 'q26':
          a = randint(2, 9) * 5
          b = randint(2, 9, a) * 10
          resultat = calcul(a * b / 100)
          texte = `$${a}\\%$ de $${b}$`
          texteCorr = `$${a}\\%$ de $${b} = ${resultat}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q27':
          a = randint(3, 6) * 15
          b = randint(1, 3)
          resultat = calcul(a * (b + 0.25))
          texte = `Une voiture roule à une vitesse constante de ${a} km/h. Quelle distance en km parcourt-elle en ${b} h et 20 min`
          texteCorr = `$${a}\\times ${calcul(b + 0.5)} = ${resultat}$`
          setReponse(this, i, new Grandeur(resultat, 'km'), { formatInteractif: 'unites' })
          break
        case 'q28':
          a = randint(3, 9)
          b = randint(0, 1)
          texte = `Est-il vrai qu'un carré de côté ${a} cm a le même périmètre qu'un rectangle de largeur ${a - b} cm et de longueur ${a + 1} cm ? (V ou F)`
          if (b === 0) {
            texteCorr = `Faux car $4\\times ${a} cm\\neq 2\\times ${a} cm + 2\\times ${a + 1} cm.`
            setReponse(this, i, 'F')
          } else {
            texteCorr = `Vrai car $4\\times ${a} cm = 2\\times ${a - 1} cm + 2\\times ${a + 1} cm= ${4 * a} cm.`
            setReponse(this, i, 'V')
          }
          break
        case 'q29':
          a = randint(3, 5) // dénominateur
          b = randint(2, a * 4 - 1) // numérateur
          c = new FractionEtendue(b, a)
          resultat = calcul(b / a)

          texte = 'Determiner l\'abscisse du point A situé ci-dessous :<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5, scale: 0.5 }, droiteGraduee({
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
            labelsPrincipaux: true,
            step1: 1,
            step2: 1
          }))
          texteCorr = `L'abscisse du point A est \\dfrac{${b}}{${a}}`
          if (a === 3) {
            setReponse(this, i, [c.texFraction, `${Math.floor(a / b)}+\\dfrac{${a % b}}{${b}}`], { formatInteractif: 'calcul' })
          } else {
            setReponse(this, i, [c.texFraction, resultat, `${Math.floor(a / b)}+\\dfrac{${a % b}}{${b}}`], { formatInteractif: 'calcul' })
          }
          break
        case 'q30':
          a = randint(0, 7) // index du fruit
          b = calcul(fruits[a][1] * (1 + choice([-1, 1]) * randint(1, 3) * 0.1)) // prix au kg
          c = Math.round(randint(fruits[a][2], fruits[a][3] / 10)) // nombre de kg première valeur
          d = randint(2, 6, c) // nombre de kg supplémentaires
          resultat = calcul(d * b)
          texte = `$${c}$ kg de ${fruits[a][0]} coûtent $${texPrix(c * b)}$ €.<br> $${c + d}$ kg de ces mêmes ${fruits[a][0]} coûtent $${texPrix((c + d) * b)}$ €.<br>Combien coûtent ${d} kg de ces ${fruits[a][0]} ?`
          texteCorr = `$${texPrix((c + d) * b)} € - ${texPrix(c * b)} € =${texPrix(resultat)} €$`
          setReponse(this, i, texPrix(resultat) + '€')
          break
      }
      if (listeTypeQuestions[i] === 'q22') {
        texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline', { texteApres: ' m' })
      } else if (listeTypeQuestions[i] === 'q25') {
        texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline', { texteApres: ` ${hauteurs[a][3]}` })
      } else if (listeTypeQuestions[i] === 'q27') {
        texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline unites[longueurs]')
      } else {
        texte += ajouteChampTexteMathLive(this, i)
      }
      if (this.questionJamaisPosee(i, a, b, c, d, resultat)) {
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
  `1 : Multiplication (facteur 12 à 19)\n
  2 : Somme à abc + de\n
  3 : Différence abc - de\n
  4 : Somme de deux décimaux avec retenue\n
  5 : Somme astucieuse\n
  6 : Conversion en heures et minutes\n
  7 : Triple et moitié\n
  8 : Produit avec facteur 100\n
  9 : Division\n
  10 : Reste de division par diviseur à 2 chiffres\n
  11 : Priorité opératoire\n
  12 : Recomposer une nombre avec chevauchement\n
  13 : conversion heures et minutes vers minutes\n
  14 :  Reste de la division par 3\n
  15 :  Une division par 9 qui tombe juste\n
  16 :  ajouter un nombre de la forme 10n+9\n
  17 :  quart d'un nombre\n
  18 :  addition à trou\n
  19 :  Nombre impair de 2 chiffres × 5\n
  20 :  Prix de la mitié\n
  21 :  Ordre de grandeur\n
  22 :  Conversion cm ou mm -> m\n
  23 :  Fraction m/n d'une quantité de L\n
  24 :  Reste de la division euclidienne\n
  25 :  Ordre de grandeur : hauteurs\n
  26 :  Appliquer un pourcentage\n
  27 :  Calcul de distance à vitesse constante\n
  28 :  Comparaison de périmètre\n
  29 :  Repérage fraction\n
  30 : Proportionnalité par linéarité\n`]
}
