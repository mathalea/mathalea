import Exercice from '../Exercice.js'
import {
  listeQuestionsToContenu, prenomF, prenomM, combinaisonListes, randint, calcul, texteEnCouleur, texteEnCouleurEtGras, pgcd, texNombrec, texFraction, texFractionReduite, choice, texNombre, sp, shuffle,
  texPrix, combinaisonListesSansChangerOrdre, range1
} from '../../modules/outils.js'
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
export default function CourseAuxNombresSeconde (numeroExercice) {
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
    let a, b, c, d, N, resultat, propositions, fraction, den, r, e, f, m, n, somme, prenom1, prenom2
    let questions = []
    if (!this.sup) {
      // Si aucune question n'est sélectionnée
      questions = combinaisonListesSansChangerOrdre(range1(10), this.nbQuestions)
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
    const liste_fractions = [
      [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6], [1, 7],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8], [1, 9], [2, 9],
      [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]
    ] // Couples de nombres premiers entre eux
    const fruits = [
      ['pêches', 4, 10, 30], ['Noix', 5, 4, 13], ['cerises', 6, 11, 20], ['pommes', 2, 20, 40],
      ['framboises', 15, 1, 5], ['fraises', 7, 5, 10], ['citrons', 1.5, 15, 30], ['bananes', 1.5, 15, 25]
    ]

    const hauteurs = [
      ['chaise', 75, 115, 'cm'],
      ['grue', 120, 250, 'dm'],
      ['tour', 50, 180, 'm'],
      ['girafe', 40, 50, 'dm'],
      ['coline', 75, 150, 'm']
    ]
    const typeQuestionsDisponibles = ['q1','q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10']//
    // 'q1',  produit d'entiers
    // 'q2', // somme ou différence d'entiers
    // 'q3', // Tiers, moitié, proportions d'une quantité
    // 'q4', // Conversion heures, minutes ....
    // 'q5', // Calculs avec des fractions simples <-> écriture décimale
    // 'q6', // pourcentage simple
    //  'q7', // *10, 100 0,1...ou division
    // 'q8', // droite graduée,encadrement, arrondi, position des chiffres
    // 'q9', // petits problèmes avec division euclidienne, partage, de plus, de moins, rendu de monnaie......
    // 'q10', // fraction simplification ou calcul avec racines carrées
    // 'q11', // proportionnalité
    // 'q12', // problème avec des fractions ou calcul
    // 'q13', // coefficient directeur
    // 'q14', // calcul littéral1
    // 'q15', // Périmètre/aires
    // 'q16', // arithmétique
    //  'q17', // pourcentage (évolution, proportion,....)
    //  'q18', // probabilité
    // 'q19', // Milieu/distance
    // 'q20', // pourcentage
    // 'q21', // image par une fonction
    // 'q22', // triangle (pythagore, thalès, ...)
    // 'q23', // Intervalles
    // 'q24', // statistiques
    // 'q25', // fonction
    // 'q26', // fonction (calcul, VI)
    // 'q27', // Calcul littéral2
    // 'q28', //  Problèmes avec vitesse, heures....
    //  'q29', // vecteurs
    // 'q30' // inéquation, signes

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
          switch (choice([1, 2, 3, 4, 5, 6, 7])) {
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
              a = randint(2, 9) / 100

              texte = `$1-${texNombrec(a)}=$`
              texteCorr = `$1-${texNombrec(a)}=${texNombrec(1 - a)}$`
              setReponse(this, i, 1 - a, { formatInteractif: 'calcul' })
              break
            case 7:// différence comme 346-47
              a = randint(2, 4)
              b = randint(3, 5)
              c = randint(1, 9)
              d = a * 100 + b * 10 + c
              e = b * 10 + c + 1
              resultat = d - e
              texte = `$${d}-${e}$`
              texteCorr = `$${d}-${e}=${d - e}$`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
          }
          break
        case 'q3':
          switch (choice([1, 2, 3])) {
            case 1:// double et triple
              a = randint(1, 2)
              b = randint(1, 5, a)
                            c = calcul(a * 10 + b)
              if (choice([true, false])) {
                resultat = calcul(3 * c)
                texte = `Quel est le triple de $${texNombre(c)}$ ?`
                texteCorr = `Le triple de $${texNombre(c)}$ est $3 \\times ${texNombre(c)}=${texNombrec(3 * c)}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              } else {
                resultat = calcul(2 * c)
                texte = `Quel est le double de $${texNombre(c)}$ ?`
                texteCorr = `Le double de $${texNombre(c)}$ est $2 \\times ${texNombre(c)}=${texNombrec(2 * c)}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break
            case 2:// tiers et quart
              a = randint(4, 10)

              if (choice([true, false])) {
                b = a * 8
                resultat = a * 2
                texte = `Quel est le quart de $${b}$ ?`
                texteCorr = `Le quart de $${b}$ est $${a * 2}.$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              } else {
                b = a * 6
                resultat = a * 2
                texte = `Quel est le tiers de $${b}$ ?`
                texteCorr = `Le tiers de $${b}$ est $${a * 2}.$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break
            case 3:// Fraction 1/n d'une quantité
              a = randint(3, 5)
              resultat = calcul(randint(2, 9) * 10)
              b = calcul(resultat * a)
              texte = `$\\dfrac{1}{${a}} \\text{ de } ${b}  =  $`
              texteCorr = `$\\dfrac{1}{${a}}$ de $${b}$  = ${resultat} `
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
          }
          break
        case 'q4':
          switch (choice([1, 2, 3, 4])) {
            case 1:// conversion minutes en heures
              a = randint(1, 2)
              b = randint(10, 59)
              d = calcul(a * 60 + b)
              texte = `Convertir $${d}$ minutes en heures et minutes (format : ...h...min)`
              texteCorr = `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ minutes = ${a}h ${b}min`
              setReponse(this, i, `${a}h${b}min`, { formatInteractif: 'texte' })
              break
            case 2:// heure décimale
              a = randint(1, 3)
              b = choice([0.25, 0.5, 0.75])
              d = calcul(b * 60)
              texte = `${texNombrec(a + b)}h$=$ (format : ...h...min)`
              texteCorr = `${texNombrec(a + b)}h = ${a} h $+ ${texNombrec(b)} \\times 60$  = ${a}h ${d}min`
              setReponse(this, i, `${a} h ${d} min`, { formatInteractif: 'texte' })
              break
            case 3:// conversion en minutes
              a = randint(1, 3)
              b = randint(1, 5) * 10
              d = calcul(a * 60)
              texte = `Convertir ${a}h${b}min en minutes :`
              texteCorr = `${a}h${b}min = $${a}\\times 60+ ${texNombrec(b)}   = ${d + b}$ min`
              setReponse(this, i, `${d + b} min`, { formatInteractif: 'texte' })
              break
              case 4:// calcul d'un temps en minutes
              a = randint(13, 15)
              b = a+1
              c=randint(1, 4)*10
d=randint(10, 58)
              resultat = calcul(b*60+d-(a * 60+c))
              texte = `${prenomM()} est parti à  ${a}h${c} de son domicile. Il est arrivé à ${b}h${d}.<br>
              Combien de temps (en minutes) à duré son trajet ?`
              texteCorr = `${b}h${d}-${a}h${c}=${resultat} min`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
          }
          break
        case 'q5':
          switch (choice([1, 2, 3])) {
            case 1:// conversion fraction <->décimale cinquième et quart
              a = randint(1, 9, 5)
              b = randint(1, 11, [2, 4, 6, 8, 10])

              if (choice([true, false])) {
                resultat = calcul(a / 5)
                texte = `Donner la valeur décimale de  $\\dfrac{${a}}{5}$ :`
                texteCorr = `$\\dfrac{${a}}{5}=${texNombrec(a / 5)}$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              } else {
                resultat = calcul(b / 4)
                texte = `Donner la valeur décimale de  $\\dfrac{${b}}{4}$ :`
                texteCorr = `$\\dfrac{${b}}{4}=${texNombrec(b / 4)}$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break
            case 2:// fraction addition avec un entier
              fraction = choice(liste_fractions)
              a = randint(1, 4)
              fraction = choice(liste_fractions)
              b = fraction[0]
              c = fraction[1]
              texte = `Calculer sous la forme d'une fraction irréductible :  $${a}+${texFraction(b, c)}$`
              texteCorr = `$${a}+${texFraction(b, c)} = \\dfrac{${a} \\times ${c}}{${c}} + \\dfrac{${b}}{${c}} =${texFractionReduite(a * c + b, c)}$`
              setReponse(this, i, new Fraction(a * c + b, c), { formatInteractif: 'fraction' })
              break

            case 3:// addition entier et fraction avec den =100, 1000
              b = choice([100, 1000])
              a = randint(1, 15)
              c = randint(1, 9)
              resultat = texNombrec(calcul(a + c / b))

              texte = `Ecrire le résultat sous forme décimale  :  $${a}+${texFraction(c, b)}$`
              texteCorr = `$${a}+${texFraction(c, b)} = ${texNombrec(a + c / b)}$`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
          }

          break
        case 'q6':
          switch (choice([1, 2])) {
            case 1:// pourcentage d'un multiple de 10
              a = randint(2, 9) * 10
              b = randint(2, 9, a) * 10
              resultat = calcul(a * b / 100)
              texte = `$${a}\\%$ de $${b}=$`
              texteCorr = `$${a}\\%$ de $${b} =${texNombrec(a / 100)}\\times ${b}= ${texNombrec(resultat)}$`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
            case 2:// prende 10%
              a = randint(1, 99)
              resultat = calcul(a * 10 / 100)
              texte = `$10\\%$ de $${a}=$`
              texteCorr = `$10\\%$ de $${a} = 0,1\\times ${a}=${texNombrec(resultat)}$`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
          }

          break
        case 'q7':
          switch (choice([1, 2, 3])) {
            case 1:// multiplier par 10, 100 ou 1000
              a = choice([randint(11, 99), randint(100, 999)])
              a = calcul(a / choice([10, 100, 1000, 10000]))
              b = choice([10, 100, 1000])
              resultat = calcul(a * b)
              texte = `$${texNombrec(a)}\\times${texNombre(b)}=$`
              texteCorr = `$${texNombrec(a)}\\times ${b} = ${resultat}$`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
            case 2:// multiplier par 0,1....
              a = randint(10, 1000)
              b = choice([0.1, 0.01, 0.001])
              resultat = texNombrec(a * b)
              texte = `$${texNombrec(a)}\\times${texNombre(b)}=$`
              texteCorr = `$${texNombrec(a)}\\times ${texNombre(b)} = ${resultat}$`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
            case 3:// multiplier par 10, 100 et fractions /10, /100....
              a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
              den = choice([10, 100, 1000])
              b = choice([10, 100, 1000])
              resultat = calcul(a * b / den)
              texte = `$${texFraction(a, den)}\\times${texNombre(b)}=$<br>
                On donnera le résultat sous la forme décimale.`
              texteCorr = `$${texFraction(a, den)} \\times ${texNombre(
                    b)} = ${texFraction(a * b, den)} = ${texNombrec((a / den) * b)}$`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
          }

          break

        case 'q8':
          switch (choice([1, 2, 3, 4, 5, 6])) {
            case 1:// droite graduée     /3
              a = choice([1, 2, 4, 5, 7, 8]) // numérateur
              c = new Fraction(a, 3)
              resultat = calcul(a / 3)
              texte = 'Determiner l\'abscisse du point A  :<br> On donnera le résultat sous la forme d\'une fraction irréductible.' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5 }, droiteGraduee2({
                Unite: 3,
                Min: 0,
                Max: 3.2,
                x: 0,
                y: 0,
                thickSecDist: 1 / 3,
                thickSec: true,
                thickoffset: 0,
                axeStyle: '|->',
                pointListe: [[a / 3, 'A']],
                pointCouleur: 'blue',
                pointStyle: 'x',
                labelsPrincipaux: true,
                step1: 1,
                step2: 1
              }))
              texteCorr = `L'abscisse du point A est $\\dfrac{${a}}{${3}}$`
              setReponse(this, i, [c.texFraction, resultat], { formatInteractif: 'calcul' })

              break
            case 2:// droite graduée     /4 resultat décimal
              a = choice([1, 3, 5, 6, 7, 9, 10, 11]) // numérateur
                            resultat = calcul(a / 4)
              texte = 'Determiner l\'abscisse du point A  :<br> On donnera le résultat sous  forme décimale.' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5 }, droiteGraduee2({
                Unite: 3,
                Min: 0,
                Max: 3.2,
                x: 0,
                y: 0,
                thickSecDist: 1 / 4,
                thickSec: true,
                thickoffset: 0,
                axeStyle: '|->',
                pointListe: [[a / 4, 'A']],
                pointCouleur: 'blue',
                pointStyle: 'x',
                labelsPrincipaux: true,
                step1: 1,
                step2: 1
              }))
              texteCorr = `L'abscisse du point A est $\\dfrac{${a}}{${4}}=${texNombrec(resultat)}$`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
            case 3:// droite graduée     /5 resultat décimal
              a = choice([1, 2, 3, 4, 6, 7, 8, 9]) // numérateur
              resultat = calcul(a / 5)
              texte = 'Determiner l\'abscisse du point A  :<br> On donnera le résultat sous  forme décimale.' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5 }, droiteGraduee2({
                Unite: 3,
                Min: 0,
                Max: 3.2,
                x: 0,
                y: 0,
                thickSecDist: 1 / 5,
                thickSec: true,
                thickoffset: 0,
                axeStyle: '|->',
                pointListe: [[a / 5, 'A']],
                pointCouleur: 'blue',
                pointStyle: 'x',
                labelsPrincipaux: true,
                step1: 1,
                step2: 1
              }))
              texteCorr = `L'abscisse du point A est $\\dfrac{${a}}{${5}}=${texNombrec(resultat)}$`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
            case 4:// droite graduée     /5 b
              a = choice([1, 2, 3, 4]) // numérateur
              c = new Fraction(a, 5)
              resultat = calcul(a / 5)
              texte = 'Determiner l\'abscisse du point A  :<br> On donnera le résultat sous la forme d\'une fraction irréductible.' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 1.5 }, droiteGraduee2({
                Unite: 6,
                Min: 0,
                Max: 1.2,
                x: 0,
                y: 0,
                thickSecDist: 1 / 10,
                thickSec: true,
                thickoffset: 0,
                axeStyle: '|->',
                pointListe: [[a / 5, 'A']],
                pointCouleur: 'blue',
                pointStyle: 'x',
                labelsPrincipaux: true,
                step1: 1,
                step2: 1
              }))
              texteCorr = `L'abscisse du point A est $\\dfrac{${a}}{${5}}$`
              setReponse(this, i, [c.texFraction, resultat], { formatInteractif: 'calcul' })

              break
            case 5:// encadrement racine carrée
              a = randint(3, 99, [4, 9, 16, 25, 36, 49, 64, 81]) // numérateur
              resultat = Math.floor(Math.sqrt(a))
              texte = `$a\\leqslant \\sqrt{${a}}\\leqslant b$ est un encadrement de $\\sqrt{${a}}$ par deux entiers consécutifs. <br> Quelle est la valeur de $a$ ? `
              texteCorr = ` On cherche le carré parfait le plus proche de $${a}$ inférieur à $${a}$ : $${Math.floor(Math.sqrt(a))}^2$. Ainsi : $a=${Math.floor(Math.sqrt(a))}$`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break

              case 6:// Position des chiffres
              a = randint(1, 2)
              b = randint(1, 9, a)
              c = randint(1, 9, [a, b])
              d = randint(1, 9, [a, b, c])
              e = randint(1, 9, [a, b, c, d])
              f = randint(1, 9, [a, b, c, d, e])
              m = choice(['dizaines', 'dixièmes', 'centièmes', 'millièmes'])
             n = a * 100 + b * 10 + c + d * 0.1 + e * 0.01+f*0.001
             texte = `Dans $${texNombrec(n)}$ quel est le chiffre des ${m} ? `
                          if (m==='dizaines') {
                                texteCorr = `Le chiffre des ${m} est $${b}$.`
                setReponse(this, i, b, { formatInteractif: 'calcul' })
              } if (m==='dixièmes') {
              texteCorr = `Le chiffre des ${m} est $${d}$.`
setReponse(this, i, d, { formatInteractif: 'calcul' })
}
if (m==='centièmes') {
  texteCorr = `Le chiffre des ${m} est $${e}$.`
setReponse(this, i, e, { formatInteractif: 'calcul' })
}
if (m==='millièmes') {
  texteCorr = `Le chiffre des ${m} est $${f}$.`
setReponse(this, i, f, { formatInteractif: 'calcul' })
}


              break
          }
          break

        case 'q9':// petits problèmes avec division euclidienne, partage, de plus, de moins, rendu de monnaie......
          switch (choice([1, 2, 3, 4, 5, 6, 7, 8])) {
            case 1:// de plus
              r = randint(4, 7) * 10
              e = randint(1, 3) * 10
              m = r - e
              somme = m + r
              prenom1 = prenomF()
              prenom2 = prenomF()
              while (prenom2 === prenom1) {
                prenom2 = prenomF()
              }
              texte = ` ${prenom2} dit à ${prenom1}  : "J'ai ${texPrix(r)} € soit ${texPrix(e)} € de plus que toi."<br>`
              texte += 'Combien d\'argent en tout possèdent les deux filles ?<br>Les deux filles possèdent en tout : '
              texteCorr = `D'après l'énoncé ${prenom2} a : ${texPrix(r)} €<br>${prenom2}  a ${texPrix(e)} €`
              texteCorr += texteEnCouleurEtGras(' de plus ')
              texteCorr += `que ${prenom1} signifie que ${prenom1} a ${texPrix(e)}€`
              texteCorr += texteEnCouleurEtGras(' de moins ')
              texteCorr += `que ${prenom2} . <br>${prenom1} a donc : ${texPrix(r)} € - ${texPrix(e)} € = ${texPrix(m)} €`
              texteCorr += `<br>${texPrix(r)} € + ${texPrix(m)} € = ${texPrix(somme)} €`
              texteCorr += texteEnCouleur(`<br>Les deux filles possèdent en tout : ${texPrix(somme)}€`)
              setReponse(this, i, somme, { formatInteractif: 'calcul' })
              break

            case 2://  de moins
              r = randint(4, 7) * 10
              e = randint(1, 3) * 10
              m = r + e
              somme = m + r
              prenom1 = prenomF()
              prenom2 = prenomF()
              while (prenom2 === prenom1) {
                prenom2 = prenomF()
              }
              texte = ` ${prenom2} dit à ${prenom1}  : "J'ai ${texPrix(r)} € soit ${texPrix(e)} € de moins que toi."<br>`
              texte += 'Combien d\'argent en tout possèdent les deux filles ?<br>Les deux filles possèdent en tout : '
              texteCorr = `D'après l'énoncé ${prenom2} a : ${texPrix(r)} €<br>${prenom2}  a ${texPrix(e)} €`
              texteCorr += texteEnCouleurEtGras(' de moins ')
              texteCorr += `que ${prenom1} signifie que ${prenom1} a ${texPrix(e)} €`
              texteCorr += texteEnCouleurEtGras(' de plus ')
              texteCorr += `que ${prenom2} . <br>${prenom1} a donc : ${texPrix(r)} € + ${texPrix(e)}€ = ${texPrix(m)} €`
              texteCorr += `<br>${texPrix(r)} € + ${texPrix(m)} € = ${texPrix(somme)} €`
              texteCorr += texteEnCouleur(`<br>Les deux filles possèdent en tout : ${texPrix(somme)}€`)
              setReponse(this, i, somme, { formatInteractif: 'calcul' })
              break

            case 3://  age
              a = randint(10, 20)
              b = randint(2, 8)
              resultat = a - b

              texte = `${prenomF()} a ${a} ans.`
              texte += `<br>Sachant qu'elle a ${b} ans de plus que son frère, quel âge a celui-ci ?`
              texteCorr = `L'âge de son frère est  : $${a}-${b}=${a - b}$ ans.`

              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break

            case 4://  boîte d'oeufs
              a = randint(40, 80, [42, 48, 54, 60, 66, 72, 78])
              resultat = Math.floor(a / 6) + 1

              texte = `Combien de boîtes de 6 oeufs faut-il pour ranger $${a}$ oeufs ?`
              texteCorr = `$${a}=6\\times${Math.floor(a / 6)} + ${a - 6 * Math.floor(a / 6)}$.<br>
                             Il en faut  donc  : $${Math.floor(a / 6)} +1=${Math.floor(a / 6) + 1}$.`

              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break

            case 5://  brouette
              a = randint(12, 22) * 10

              if (a / 20 % 1 !== 0) {
                resultat = Math.floor(a / 20) + 1
                texte = `${prenomM()} a $${a}$ kg de gravats à déplacer avec sa brouette. Dans celle-ci, il met $20$ kg de gravats.<br>
                  Combien de brouettes faudra-t-il pour déplacer tous les gravats ? `
                texteCorr = `$${a}=20\\times${Math.floor(a / 20)} + ${a - 20 * Math.floor(a / 20)}$.<br>
                  Il faudra donc $${Math.floor(a / 20)}+1$ brouettes pour déplacer tous les gravats.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              } else {
                resultat = Math.floor(a / 20)
                texte = `${prenomM()} a $${a}$ kg de gravats à déplacer avec sa brouette. Dans celle-ci, il met $20$ kg de gravats.<br>
                  Combien de brouettes faudra-t-il pour déplacer tous les gravats ? `
                texteCorr = `$${a}=20\\times${Math.floor(a / 20)} + ${a - 20 * Math.floor(a / 20)}$.<br>
                  Il faudra donc $${Math.floor(a / 20)}$ brouettes pour déplacer tous les gravats.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }

              break

            case 6://  rendu de monnaie1
              a = randint(1, 4) * 10
              b = a + 2
              resultat = 52 - b
              texte = `Un livre coûte ${texPrix(b)} €. Je donne un billet de $50$  € et une pièce de 2  €. <br>
  Combien me rend-on ?`
              texteCorr = `On doit me rendre $52-${b}=${52 - b}$ €.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break

            case 7://  rendu de monnaie2
              a = randint(1, 6) + (randint(1, 9)) / 10
              resultat = 10 - a
              texte = `Chez le boulanger, je dois payer  ${texPrix(a)} €. Je donne un billet de $10$  €. <br>
  Combien me rend-on ?`
              texteCorr = `On doit me rendre $10-${texNombrec(a)}=${texNombrec(10 - a)}$ €.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
            case 8:// partage
              b = randint(4, 7)
              a = randint(8, 11, 10) * b
              resultat = a / b
              texte = `  ${prenomF()} veut partager $${a}$ billes équitablement en $${b}$ enfants. Combien chacun aura-t-il de billes ? <br>
  `
              texteCorr = `Chaque enfant aura  $${a}\\div ${b}=${texNombrec(a / b)}$ billes.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
          }

          break

        case 'q10':
          switch (choice([1, 2, 3])) {
            case 1:// simplification
              fraction = choice(liste_fractions)
              n = fraction[0]
              d = fraction[1]
              a = randint(6, 9)
              resultat = new Fraction(n, d)
              texte = `Ecrire $${texFraction(n * a, d * a)}$ sous la forme d'une fraction irréductible.`
              texteCorr = `$${texFraction(n * a, d * a)}=\\dfrac{${n}\\times ${a}}{${d}\\times ${a}} =${texFractionReduite(n, d)}$.`
              setReponse(this, i, resultat, { formatInteractif: 'fraction' })
              break

            case 2:// racine carrée ()^2
              a = randint(2, 3)
              b = choice([2, 5, 6, 7, 10])
              resultat = a * a * b
              texte = `$(${a}\\sqrt{${b}})^2=$`
              texteCorr = `$(${a}\\sqrt{${b}})^2=${a}^2\\times (\\sqrt{${b}})^2=${a * a}\\times ${b}=${a * a * b}$.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break

            case 3:// somme racine carrée ()^2
              a = randint(2, 10)
              b = randint(2, 10, a)
              resultat = (a - b) * (a - b)

              if (a - b < 0) {
                texte = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=$`
                texteCorr = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=(${a}-${b})^2=(${a - b})^2=${(a - b) * (a - b)}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              } else {
                texte = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=$`
                texteCorr = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=(${a}-${b})^2=${a - b}^2=${(a - b) * (a - b)}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break
          }

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
