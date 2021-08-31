import Exercice from '../Exercice.js'
import {
  listeQuestionsToContenu, prenomF, prenomM, randint, ecritureParentheseSiNegatif,
  ecritureAlgebrique,
  calcul, texteEnCouleur, texteEnCouleurEtGras, pgcd, texNombrec, texFraction, signe, abs, listeDeNotes, prenom,
  texFractionReduite, choice, texNombre, printlatex,
  texPrix, combinaisonListesSansChangerOrdre, range1, reduireAxPlusB, rienSi1, texRacineCarree, combinaisonListes, simplificationDeFractionAvecEtapes
} from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import Fraction from '../../modules/Fraction.js'
import { calcule, tan } from '../../modules/fonctionsMaths.js'
import {
  droiteGraduee2, mathalea2d, repere2, courbe2, tracePoint, point, droite, segmentAvecExtremites,
  codeSegments, codageAngleDroit, afficheMesureAngle, milieu, labelPoint, segment, latexParCoordonnees
} from '../../modules/2d.js'

export const titre = 'Course aux nombres seconde'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Ensemble de questions pour course aux nombres
 * @author Gilles Mora
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
  this.nbQuestions = 30
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let a, b, c, d, N, xA, xB, yA, yB, x1, x2, y1, y2, A, B, C, D, E, G, H, k, u, p, q, ux, uy, vx, vy,
      resultat, inconnue, objets, repere, fraction, racine, den, r, e, f, m, n, somme, tA, tB, triplet,
      prenom1, prenom2, expression, x, max, min, notes, nombreNotes, couplenm
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
    console.log(listeIndex)
    const listeFractions = [
      [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6], [1, 7],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8], [1, 9], [2, 9],
      [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]
    ] // Couples de nombres premiers entre eux

    const listeFractions1 = [
      [10, 3], [5, 4], [7, 4], [10, 7], [11, 7], [12, 7]
    ] // Couples de nombres premiers entre eux >1

    const listeRacines1 = [
      [2, 8], [32, 2], [2, 50], [3, 27], [5, 20], [2, 18]
    ] // couples pour simplifier des produits de racines carrées

    const fruits = [
      ['pêches', 3.5, 10, 30], ['Noix', 4.5, 4, 13], ['cerises', 5.5, 11, 20], ['pommes', 2.5, 20, 40],
      ['framboises', 6.5, 1, 5], ['fraises', 4.5, 5, 10], ['citrons', 1.5, 15, 30], ['bananes', 2.5, 15, 25]
    ]

    const listeTriplet = [
      [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 35, 37], [9, 40, 41], [11, 60, 61]
    ] // triplets Pythagore
    const plat = [
      ['nems'], ['samossas'], ['parts de quiches'], ['parts de pizzas'], ['beignets']
    ]

    const signesDeX = combinaisonListes([true, false], this.nbQuestions)
    const typeQuestionsDisponibles = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20',
      'q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30']
    // 'q1',  produit d'entiers
    // 'q2', // somme ou différence d'entiers
    // 'q3', // Tiers, moitié, proportions d'une quantité
    // 'q4', // Conversion heures, minutes .... ou changments d'unités
    // 'q5', // Calculs avec des fractions simples <-> écriture décimale
    // 'q6', // pourcentage simple
    //  'q7', // *10, 100 0,1...ou division
    // 'q8', // droite graduée,encadrement, arrondi, position des chiffres
    // 'q9', // petits problèmes avec division euclidienne, partage, de plus, de moins, rendu de monnaie......
    // 'q10', // fraction simplification ou calcul avec racines carrées
    // 'q11', // proportionnalité
    // 'q12', // problème avec des fractions ou calcul numérique
    // 'q13', // coefficient directeur calcul et lecture graphique
    // 'q14', // calcul littéral1, équation (pas id remarquables)
    // 'q15', // Périmètre/aires, agrandissement/réduction
    // 'q16', //  calculs astucieux, calculs avec parenthèses, puissances (1)
    //  'q17', // pourcentage 1 (évolution, proportion,....)
    //  'q18', // probabilité, denombrement
    // 'q19', // Milieu/distance
    // 'q20', // triangle (pythagore, thalès, angles, trigo ...)
    // 'q21', // image/antécédents par une fonction
    // 'q22', // Droites
    // 'q23', // arithmétique, calculs (y compris astucieux) ,  racines carrées, programme de calcul, puissances (2)
    // 'q24', // statistiques
    // 'q25', // inéquation, inégalités, intervalles, signes
    // 'q26', // fonction (calcul, VI)
    // 'q27', // Calcul littéral2 (avec id) , équations
    // 'q28', //  Problèmes avec vitesse, heures, conversions....
    //  'q29', // vecteurs
    // 'q30' // "question surprise", Questions diverses

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objets = []
      // Boucle principale où i+1 correspond au numéro de la question
      switch (typeQuestionsDisponibles[listeIndex[i]]) { // Suivant le type de question, le contenu sera différent
        case 'q1':// produit d'entiers (existe en can simple)
          a = randint(3, 9)
          b = randint(3, 9)
          resultat = a * b
          texte = `$${a} \\times ${b}=$`
          texteCorr = `$${a} \\times ${b}=${a * b}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })

          break
        case 'q2':
          switch (choice([1, 2, 3, 4, 5, 6, 7])) { //
            case 1:// somme d'entiers à deux chiffres avec retenue (existe en can simple)
              a = randint(1, 2) * 10 + randint(5, 9)
              b = randint(1, 4) * 10 + randint(11 - a % 10, 9)
              texte = `$${a}+${b}=$`
              texteCorr = `$${a}+${b}=${a + b}$`
              setReponse(this, i, a + b, { formatInteractif: 'calcul' })
              break

            case 2:// différence avec 100 (existe en can simple)
              a = randint(11, 70)
              texte = `$100-${a}=$`
              texteCorr = `$100-${a}=${100 - a}$`
              setReponse(this, i, 100 - a, { formatInteractif: 'calcul' })
              break

            case 3:// différence négative (existe en can simple)
              a = randint(8, 15)
              b = randint(18, 30)
              texte = `$${a}-${b}=$`
              texteCorr = `$${a}-${b}=${a - b}$`
              setReponse(this, i, a - b, { formatInteractif: 'calcul' })
              break

            case 4:// produit positif (existe en can simple)
              a = randint(2, 7)
              b = randint(11, 25)
              texte = `$${a}\\times${b}=$`
              texteCorr = `$${a}\\times${b}=${a * b}$`
              setReponse(this, i, a * b, { formatInteractif: 'calcul' })
              break

            case 5:// division (existe en can simple)
              a = randint(6, 9)
              N = randint(7, 12)
              b = a * N
              texte = `$${b}\\div${a}=$`
              texteCorr = `$${b}\\div${a}=${b / a}$`
              setReponse(this, i, b / a, { formatInteractif: 'calcul' })
              break

            case 6:// différence avec 1 (existe en can simple)
              a = choice([true, false]) ? calcul(randint(2, 9) / 100) : calcul(randint(2, 9) / 10)
              texte = `$1-${texNombrec(a)}=$`
              texteCorr = `$1-${texNombrec(a)}=${texNombrec(1 - a)}$`
              setReponse(this, i, calcul(1 - a), { formatInteractif: 'calcul' })
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
            case 1:// double et triple (existe en can simple)
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
            case 2:// tiers et quart (existe en can simple)
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
            case 3:// Fraction 1/n d'une quantité (existe en can simple)
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
          switch (choice([1, 2, 3, 4, 5, 6])) { //
            case 1:// conversion minutes en heures (existe en can simple)
              a = randint(1, 2)
              b = randint(10, 59)
              d = calcul(a * 60 + b)
              texte = ` $${d}$ minutes $=$  $a$ heure(s) et  $b$ minute(s).<br>
              Quelle est la valeur de $b$ ?`
              texteCorr = `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ minutes = ${a}h ${b}min, donc $b=${b}}$.`
              setReponse(this, i, `${b}`, { formatInteractif: 'calcul' })
              break
            case 2:// heure décimale (existe en can simple)
              a = randint(1, 3)
              b = choice([0.25, 0.5, 0.75])
              d = calcul(b * 60)
              texte = `${texNombrec(a + b)}h$=$ (format : ...h...min)`
              texteCorr = `${texNombrec(a + b)}h = ${a} h $+ ${texNombrec(b)} \\times 60$  = ${a}h ${d}min`
              setReponse(this, i, `${a}h${d}\\min`, { formatInteractif: 'texte' })
              break
            case 3:// conversion en minutes (existe en can simple)
              a = randint(1, 3)
              b = randint(1, 5) * 10
              d = calcul(a * 60)
              texte = `Convertir ${a}h${b}min en minutes :`
              texteCorr = `${a}h${b}min = $${a}\\times 60+ ${texNombrec(b)}   = ${d + b}$ min`
              setReponse(this, i, `${d + b} min`, { formatInteractif: 'texte' })
              break

            case 4:// calcul d'un temps en minutes (existe en can simple)
              a = randint(13, 15)
              b = a + 1
              c = randint(1, 4) * 10
              d = randint(10, 58)
              resultat = calcul(b * 60 + d - (a * 60 + c))
              texte = `${prenomM()} est parti à  ${a}h${c} de son domicile. Il est arrivé à ${b}h${d}.<br>
              Combien de temps (en minutes) à duré son trajet ?`
              texteCorr = `${b}h${d}-${a}h${c}=${resultat} min`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
            case 5:// conversion unités (existe en can simple)
              switch (choice(['a', 'b', 'c', 'd'])) {
                case 'a':
                  if (choice([true, false])) {
                    a = randint(1, 13) * 50
                    resultat = calcul(a / 1000)
                    texte = `$${texNombrec(a)}$ g $ = \\ldots $ kg`
                    texteCorr = `$${texNombrec(a)}$ g$=${texNombrec(a / 1000)}$ kg`
                    setReponse(this, i, resultat, { formatInteractif: 'calcul' })
                  } else {
                    a = randint(1, 5) / 10
                    resultat = a * 1000
                    texte = `$${texNombrec(a)}$ kg $ = \\ldots $ g`
                    texteCorr = `$${texNombrec(a)}$ g$=${texNombrec(a * 1000)}$ kg`
                    setReponse(this, i, resultat, { formatInteractif: 'calcul' })
                  }
                  break
                case 'b':
                  if (choice([true, false])) {
                    a = randint(1, 13) * 5
                    resultat = a * 100
                    texte = `$${texNombrec(a)}$ m $ = \\ldots $ cm`
                    texteCorr = `$${texNombrec(a)}$ m$=${texNombrec(a * 100)}$ cm`
                    setReponse(this, i, resultat, { formatInteractif: 'calcul' })
                  } else {
                    a = randint(1, 12) * 10
                    resultat = calcul(a / 100)
                    texte = `$${texNombrec(a)}$ cm $ = \\ldots $ m`
                    texteCorr = `$${texNombrec(a)}$ cm$=${texNombrec(a / 100)}$ m`
                    setReponse(this, i, resultat, { formatInteractif: 'calcul' })
                  }
                  break
                case 'c':
                  if (choice([true, false])) {
                    a = randint(1, 13) / 10
                    resultat = a * 10
                    texte = `$${texNombrec(a)}$ c$\\ell$  $= \\ldots $ m$\\ell$`
                    texteCorr = `$${texNombrec(a)}$ c$\\ell$$=${texNombrec(a * 10)}$ m$\\ell$`
                    setReponse(this, i, resultat, { formatInteractif: 'calcul' })
                  } else {
                    a = randint(1, 12)
                    resultat = calcul(a / 10)
                    texte = `$${texNombrec(a)}$ m$\\ell$ $ = \\ldots $ c$\\ell$`
                    texteCorr = `$${texNombrec(a)}$ c$\\ell$$=${texNombrec(a / 10)}$ m$\\ell$`
                    setReponse(this, i, resultat, { formatInteractif: 'calcul' })
                  }
                  break
                case 'd':
                  if (choice([true, false])) {
                    a = randint(1, 20) * 10
                    resultat = calcul(a / 1000)
                    texte = `$${texNombrec(a)}$ m  $= \\ldots $ km`
                    texteCorr = `$${texNombrec(a)}$ m$=${texNombrec(a / 1000)}$ km`
                    setReponse(this, i, resultat, { formatInteractif: 'calcul' })
                  } else {
                    a = randint(1, 35) / 100
                    resultat = a * 1000
                    texte = `$${texNombrec(a)}$ km $ = \\ldots $ m`
                    texteCorr = `$${texNombrec(a)}$ km$=${texNombrec(a * 1000)}$ m`
                    setReponse(this, i, resultat, { formatInteractif: 'calcul' })
                  }
                  break
              }
              break
            case 6:// conversion (existe en can simple can6M05)
              switch (choice(['a', 'b'])) {
                case 'a':
                  a = calcul(randint(1, 12) + randint(1, 9) / 10)
                  texte = ` $${texNombre(a)}$ m$^3=$.... L`
                  texteCorr = `$1$ m$^3$= $1000$ L, donc $${texNombre(a)}$ m$^3$=$${texNombre(a)}\\times 1000$ L $=${a * 1000}$ L.`
                  setReponse(this, i, a * 1000, { formatInteractif: 'calcul' })
                  break
                case 'b':
                  a = calcul(randint(1, 9) + randint(1, 9) * 10 + randint(0, 9) * 100)
                  texte = `.... m$^3=${texNombre(a)}$  L`
                  texteCorr = `$1$ m$^3$= $1000$ L, donc $${texNombre(a)}$ L$=${texNombre(a)}\\div 1000$ m$^3=${calcul(a / 1000)}$ m$^3$.`
                  setReponse(this, i, calcul(a / 1000), { formatInteractif: 'calcul' })
                  break
              }
              break
          }
          break
        case 'q5':
          switch (choice([1, 2, 3, 4])) {
            case 1:// conversion fraction <->décimale cinquième et quart
              a = randint(1, 9, 5)
              b = choice([1, 3, 5, 9, 11])
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
              fraction = choice(listeFractions)
              a = randint(1, 4)
              b = fraction[0]
              c = fraction[1]
              d = fraction(a * c + b, c).simplifie()
              texte = `Calculer sous la forme d'une fraction irréductible :  $${a}+${texFraction(b, c)}$`
              texteCorr = `$${a}+${texFraction(b, c)} = \\dfrac{${a} \\times ${c}}{${c}} + \\dfrac{${b}}{${c}} =${d.texFraction}$`
              setReponse(this, i, d, { formatInteractif: 'fraction' })
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
            case 4:// addition entier et fraction avec den =100 et 1000
              a = randint(1, 15)
              b = randint(11, 19)
              c = randint(1, 9)
              resultat = texNombrec(calcul(a + b / 100 + c / 1000))

              texte = `Ecrire le résultat sous forme décimale  :  $${a}+\\dfrac{${b}}{100}+\\dfrac{${c}}{1000}$.`
              texteCorr = `$${a}+\\dfrac{${b}}{100}+\\dfrac{${c}}{1000}=${a}+${texNombrec(b / 100)}+${texNombrec(c / 1000)}=${texNombrec(a + b / 100 + c / 1000)}$.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
          }

          break
        case 'q6':
          switch (choice([1, 2, 3])) {
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

            case 3:// prendre  20%, 30%, 40%......
              a = randint(1, 9) * 10
              p = randint(2, 9, 5) * 10
              resultat = calcul(a * p / 100)
              texte = `$${p}\\%$ de $${a}=$`
              texteCorr = `$${p}\\%$ de $${a} = ${texNombrec(p / 100)}\\times ${a}=${texNombrec(resultat)}$`
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
          switch (choice([1, 2, 3, 4, 5, 6, 7])) { //
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
              n = calcul(a * 100 + b * 10 + c + d * 0.1 + e * 0.01 + f * 0.001)
              texte = `Dans $${texNombre(n)}$ quel est le chiffre des ${m} ? `
              if (m === 'dizaines') {
                texteCorr = `Le chiffre des ${m} est $${b}$.`
                setReponse(this, i, b, { formatInteractif: 'calcul' })
              } if (m === 'dixièmes') {
                texteCorr = `Le chiffre des ${m} est $${d}$.`
                setReponse(this, i, d, { formatInteractif: 'calcul' })
              }
              if (m === 'centièmes') {
                texteCorr = `Le chiffre des ${m} est $${e}$.`
                setReponse(this, i, e, { formatInteractif: 'calcul' })
              }
              if (m === 'millièmes') {
                texteCorr = `Le chiffre des ${m} est $${f}$.`
                setReponse(this, i, f, { formatInteractif: 'calcul' })
              }

              break
            case 7:// suite logique
              a = randint(1, 9) * 10 + randint(1, 9)
              N = choice(['a', 'b'])

              texte = ` Compléter la suite logique : <br>
 $${texNombrec(a + 0.6)}$ &nbsp ; &nbsp$${texNombrec(a + 0.7)}$ &nbsp ; &nbsp$${texNombrec(a + 0.8)}$ &nbsp ; &nbsp$${texNombrec(a + 0.9)}$ &nbsp ; &nbsp .....
                                    `

              texteCorr = `$${a + 1}$
               `
              setReponse(this, i, a + 1, { formatInteractif: 'calcul' })

              break
          }
          break

        case 'q9':// petits problèmes avec division euclidienne, partage, de plus, de moins, rendu de monnaie......
          switch (choice([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
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
            case 9:// division euclidienne
              q = randint(11, 15)
              b = randint(8, 11)
              r = randint(1, b - 1)
              a = b * q + r
              texte = `   En utilisant l'égalité $${a}=${b}\\times ${q}+${r}$, donner le reste de la division euclidienne de $${a}$ par $${b}$.
  `
              texteCorr = `Puisque $${r}$ est strictement inférieur à $${b}$, le reste est $${r}$.`
              setReponse(this, i, r, { formatInteractif: 'calcul' })
              break
          }

          break

        case 'q10':
          switch (choice([1, 2, 3])) {
            case 1:// simplification
              fraction = choice(listeFractions)
              n = fraction[0]
              d = fraction[1]
              a = randint(6, 9)
              resultat = new Fraction(n, d)
              texte = `Ecrire $${texFraction(n * a, d * a)}$ sous la forme d'une fraction irréductible.`
              texteCorr = `$${texFraction(n * a, d * a)}=\\dfrac{${n}\\times ${a}}{${d}\\times ${a}} =${texFractionReduite(n, d)}$.`
              setReponse(this, i, resultat, { formatInteractif: 'fraction' })
              break

            case 2:// racine carrée ()^2 ou rac(0,04) par ex
              N = choice(['a', 'b'])
              if (N === 'a') {
                a = randint(2, 3)
                b = choice([2, 5, 6, 7, 10])
                resultat = a * a * b
                texte = `$(${a}\\sqrt{${b}})^2=$`
                texteCorr = `$(${a}\\sqrt{${b}})^2=${a}^2\\times (\\sqrt{${b}})^2=${a * a}\\times ${b}=${a * a * b}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = randint(1, 9) / 10

                resultat = a
                texte = `$\\sqrt{${texNombrec(a ** 2)}}=$`
                texteCorr = `$\\sqrt{${texNombrec(a ** 2)}}=${texNombrec(a)}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
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

        case 'q11':
          switch (choice([1, 2, 3, 4, 5])) { //
            case 1:// proportionnalité avec fruits
              a = randint(0, 7) // index du fruit
              b = calcul(fruits[a][1] + choice([-1, 1]))// prix au kg
              c = randint(2, 8) // nombre de kg première valeur
              d = randint(3, 6, c) // nombre de kg supplémentaires
              resultat = calcul(d * b)
              texte = `$${c}$ kg de ${fruits[a][0]} coûtent $${texPrix(c * b)}$ €.<br> $${c + d}$ kg de ces mêmes ${fruits[a][0]} coûtent $${texPrix((c + d) * b)}$ €.<br>Combien coûtent ${d} kg de ces ${fruits[a][0]} ?`
              texteCorr = `$${texPrix((c + d) * b)} € - ${texPrix(c * b)} € =${texPrix(resultat)} €$`
              setReponse(this, i, texPrix(resultat) + '€')
              break
            case 2:// proportionnalité débit
              a = choice([50, 100])
              b = choice([10, 20, 30])
              c = choice([150, 250, 300, 350])

              resultat = calcul((c / a) * b)
              texte = `Le débit d’un robinet est de $${a}$ L en $${b}$ min. Combien de temps (en minutes) faut-il pour remplir un réservoir de $${c}$ L ?`
              texteCorr = `$\\dfrac{${c}}{${a}}\\times ${b}=${resultat}$. Il faut donc $${resultat}$ minutes pour remplir le réservoir.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
            case 3:// proportionnalité plats
              c = randint(0, 4) // index du plat
              b = randint(12, 15)
              u = randint(2, 5)
              n = randint(3, 6)
              a = randint(2, 6)
              resultat = calcul(n * u * a)
              texte = `$${a}$ ${plat[c]} coûtent $${u * a}$ €, combien coûtent $${n * a}$ ${plat[c]} ?`
              texteCorr = `$${n * a}$ ${plat[c]} coûtent $${u}\\times ${n * a}$ €, soit $${resultat}$ €.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break

            case 4:// proportionnalité 4ième proportionnelle
              if (choice([true, false])) {
                a = randint(1, 4) //
                n = randint(3, 7)
                c = a * n
                b = randint(2, 5, a) * n
                c = a * n
                resultat = calcul(b / n)
                texte = `Déterminer la valeur qui manque dans ce tableau de proportionnalité : <br>
              $\\begin{array}{|l|c|}\n`
                texte += '\\hline\n'
                texte += `\\\\\n\\phantom{-5}? \\phantom{-5}& \\phantom{-5}${a} \\phantom{-5} \\\\\n \\\\\n`
                texte += '\\hline\n'
                texte += `\\\\\n\\phantom{-5}${b}\\phantom{-5} & \\phantom{-5}${c}\\phantom{-5}  \\\\\n \\\\\n`
                texte += '\\hline\n'
                texte += '\\end{array}\n$'

                texteCorr = `On passe de la première ligne à la deuxième en multipliant par $${n}$, ainsi, ?$=\\dfrac{${b}}{${n}}=${calcul(b / n)}$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              } else {
                a = randint(1, 9)
                b = randint(1, 9, a)
                n = randint(2, 9, 5) / 10
                d = b * n
                c = a * n

                resultat = calcul(a + b)
                texte = `Déterminer la valeur qui manque dans ce tableau de proportionnalité : <br>
$\\begin{array}{|l|c|c|}\n`
                texte += '\\hline\n'
                texte += `\\\\\n\\phantom{-5}${texNombrec(a)} \\phantom{-5}& \\phantom{-5}${texNombrec(b)} \\phantom{-5}& \\phantom{-5}? \\phantom{-5} \\\\\n \\\\\n`
                texte += '\\hline\n'
                texte += `\\\\\n\\phantom{-5}${texNombrec(c)}\\phantom{-5} & \\phantom{-5}${texNombrec(d)}\\phantom{-5} & \\phantom{-5}${texNombrec(c + d)} \\phantom{-5} \\\\\n \\\\\n`
                texte += '\\hline\n'
                texte += '\\end{array}\n$'

                texteCorr = `La valeur cherchée est donnée par la somme $${a}+${b}=${a + b}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break
            case 5:// proportionnalité 6iemJC
              a = choice([2, 3, 4, 5]) // choix du coefficient
              b = randint(3, 10) // donnée 1
              c = randint(2, 10, b) // donnée 2
              d = choice([['un train électrique', 'il'], ['une voiture électrique', 'elle'], ['un manège', 'il']])
              texte = `En ${a * b} minutes, ${d[0]} fait ${a * c} tours.<br>En ${b} minutes ${d[1]} fait \\ldots tours.`
              texteCorr = `En ${a} fois moins de temps, ${d[1]} fait ${a} fois moins de tours, soit : $${a * c} \\div ${a}=${c}$ tours.`
              setReponse(this, i, c, { formatInteractif: 'calcul' })
              break
          }

          break

        case 'q12':
          switch (choice([1, 2, 3, 4])) { // 1
            case 1:// petits problèmes avec quart, cinquième, ...
              a = choice([12, 24, 36, 48])
              b = choice([15, 20, 25, 30, 35, 40, 45])
              N = choice(['quart', 'tiers', 'cinquième', 'sixième'])

              if (N === 'cinquième') {
                resultat = calcul(0.8 * b)
                texte = `J'ai mangé le ${N} d'un paquet de gâteaux qui contenait $${b}$ gâteaux. <br>
                Combien en reste-t-il ?`
                texteCorr = `$\\dfrac{1}{5}\\times ${b}=${texNombrec(b / 5)}$.<br>
                Il en reste donc $${b}-${texNombrec(b / 5)}=${resultat}$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'quart') {
                resultat = calcul(0.75 * a)
                texte = `J'ai mangé le ${N} d'un paquet de gâteaux qui contenait $${a}$ gâteaux. <br>
                Combien en reste-t-il ?`
                texteCorr = `$\\dfrac{1}{4}\\times ${a}=${texNombrec(a / 4)}$.<br>
                Il en reste donc $${a}-${texNombrec(a / 4)}=${resultat}$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'tiers') {
                resultat = calcul((2 * a) / 3)
                texte = `J'ai mangé le ${N} d'un paquet de gâteaux qui contenait $${a}$ gâteaux. <br>
                Combien en reste-t-il ?`
                texteCorr = `$\\dfrac{1}{3}\\times ${a}=${texNombrec(a / 3)}$.<br>
                Il en reste donc $${a}-${texNombrec(a / 5)}=${resultat}$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'sixième') {
                resultat = calcul((5 * a) / 6)
                texte = `J'ai mangé le ${N} d'un paquet de gâteaux qui contenait $${a}$ gâteaux. <br>
                Combien en reste-t-il ?`
                texteCorr = `$\\dfrac{1}{6}\\times ${a}=${texNombrec(a / 6)}$.<br>
                Il en reste donc $${a}-${texNombrec(a / 6)}=${resultat}$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break
            case 2:// addition 1/a+1/b
              a = randint(2, 7)
              b = randint(2, 7, a)
              if (choice([true, false])) {
                resultat = new Fraction(b + a, a * b)
                resultat = resultat.simplifie()
                texte = `Calculer sous la fomre d'une fraction irréductible : $\\dfrac{1}{${a}}+\\dfrac{1}{${b}}$`
                texteCorr = `$\\dfrac{1}{${a}}+\\dfrac{1}{${b}}=\\dfrac{${b}+${a}}{${a}\\times ${b}}=${texFractionReduite(b + a, a * b)}$`
                setReponse(this, i, resultat, { formatInteractif: 'fraction' })
              } else {
                resultat = new Fraction(b - a, a * b)
                resultat = resultat.simplifie()
                texte = `Calculer sous la fomre d'une fraction irréductible : $\\dfrac{1}{${a}}-\\dfrac{1}{${b}}$`
                texteCorr = `$\\dfrac{1}{${a}}-\\dfrac{1}{${b}}=\\dfrac{${b}-${a}}{${a}\\times ${b}}=${texFractionReduite(b - a, a * b)}$`
                setReponse(this, i, resultat, { formatInteractif: 'fraction' })
              }
              break
            case 3:// double/moitié
              a = randint(1, 25)
              texte = `Le double d'un nombre vaut ${2 * a}, combien vaut sa moitié ?`
              texteCorr = `Le nombre est ${a}, sa moitié est ${texNombrec(a / 2)}.`
              setReponse(this, i, calcul(a / 2), { formatInteractif: 'calcul' })
              break

            case 4:// on donne 2a calculer a+1
              a = randint(11, 25, 20) / 10
              resultat = calcul(a / 2 + 1)
              texte = `On a  $2\\times a=${texNombrec(a)}$, combien vaut $a+1$ ?`
              texteCorr = `Le nombre $a$ est égal à $${texNombrec(a)}\\div 2=${texNombrec(a / 2)}$, donc $a+1=${texNombrec(a / 2)}+1=${texNombrec(a / 2 + 1)}$.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
          }

          break

        case 'q13':
          switch (choice([1, 2, 3, 4])) { //
            case 1:// coefficient directeur droite
              xA = randint(0, 7)
              yA = randint(0, 7)
              xB = randint(0, 7, xA)
              yB = randint(0, 7)
              n = yB - yA
              d = xB - xA

              texte = `Dans un repère du plan, on considère les points $A(${xA};${yA})$ et $B(${xB};${yB})$.<br>
              Calculer le coefficient directeur de la droite $(AB)$.<br>
              Donner le résultat sous la forme d'une fraction irréductible ou d'un entier le cas échéant.`
              texteCorr = 'On observe que $ x_B\\neq x_A$.'
              texteCorr += '<br>La droite $(AB)$ n\'est donc pas verticale.'
              texteCorr += '<br>On peut donc calculer le coefficient directeur de la droite.'
              texteCorr += '<br>On sait d\'après le cours : $m=\\dfrac{y_B-y_A}{x_B-x_A}$.'
              texteCorr += `<br>On applique avec les données de l'énoncé : $m=\\dfrac{${yB}-${ecritureParentheseSiNegatif(yA)}}{${xB}-${ecritureParentheseSiNegatif(xA)}}=${texFraction(n, d)}`
              if ((pgcd(n, d) !== 1 || d === 1 || d < 0)) {
                texteCorr += `=${texFractionReduite(n, d)}`
              }
              texteCorr += '$'
              setReponse(this, i, texFractionReduite(n, d), { formatInteractif: 'calcul' })

              break

            case 2:// coefficient directeur droite
              a = randint(-4, 4, 0)
              b = randint(-4, 4, 0)
              x1 = randint(-3, 3, [-1, 0])
              y1 = calcule(a * x1 + b)
              x2 = x1 + 1
              y2 = calcule(b + a * x2)
              tA = tracePoint(point(x1, y1))
              tB = tracePoint(point(x2, y2))
              tA.color = 'red'
              tB.color = 'red'
              repere = repere2({ xMin: -5, yMin: -5, xMax: 5, yMax: 5 })
              texte = `Donner le coefficient directeur de la droite bleue.<br>
          `
              texte += `${mathalea2d({ xmin: -5, ymin: -5, xmax: 5, ymax: 5, pixelsParCm: 20, scale: 0.7 }, repere, courbe2(x => a * x + b, { repere: repere, color: 'blue' }))}`
              texteCorr += `<br>Le coefficient directeur est $${a}$`
              setReponse(this, i, a, { formatInteractif: 'calcul' })

              break

            case 3:// coefficient directeur droite a partir equ reduite
              a = randint(-9, 9, 0)
              b = randint(-9, 9, 0)
              if (choice([true, false])) {
                texte = `On considère la droite d'équation $y=${reduireAxPlusB(a, b)}$. <br>
                Le coefficient directeur est :<br>
            `
                texteCorr = `Le coefficient directeur est $${a}$`
                setReponse(this, i, a, { formatInteractif: 'calcul' })
              } else {
                if (a < 0) {
                  texte = `On considère la droite d'équation $y=${b}${reduireAxPlusB(a, 0)}$. <br>
              Le coefficient directeur est :<br>
          `
                  texteCorr = `Le coefficient directeur est $${a}$`
                  setReponse(this, i, a, { formatInteractif: 'calcul' })
                } else {
                  texte = `On considère la droite d'équation $y=${b}+${reduireAxPlusB(a, 0)}$. <br>
                Le coefficient directeur est :<br>
            `
                  texteCorr = `Le coefficient directeur est $${a}$`
                  setReponse(this, i, a, { formatInteractif: 'calcul' })
                }
              }

              break
            case 4:// coefficient directeur fct linéaire
              xA = randint(1, 10)
              yA = randint(-10, 10, 0)

              texte = `Le coefficient directeur d'une fonction linéaire passant par le point $A(${xA};${yA})$ est :<br>
              On donnera le résultat sous la fomre d'une fraction irréductible ou d'un entier le cas échéant.`

              texteCorr = `Le coefficient directeur de la droite est donné par : $m=\\dfrac{y_A}{x_A}=\\dfrac{${yA}}{${xA}}=${texFractionReduite(yA, xA)}$.`
              setReponse(this, i, texFractionReduite(yA, xA), { formatInteractif: 'calcul' })

              break
          }

          break

        case 'q14':
          switch (choice([1, 2, 3, 4])) { //
            case 1:// calcul pour une valeur
              a = randint(-5, -1)
              b = randint(1, 9)
              d = randint(1, 9)
              c = randint(1, 4)
              if (c === 1) {
                a = randint(-5, -1)
                b = randint(1, 9)
                d = randint(1, 9)
                resultat = calcul(a ** 2 + b)
                texte = `Calculer $x^2+${b}$ pour $x=${a}$ :`
                texteCorr = `$(${a})^2+${b}=${a ** 2 + b}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              } if (c === 2) {
                a = randint(2, 7)
                b = randint(1, 9)
                d = randint(1, 9)
                resultat = calcul(-b + a ** 2)
                texte = `Calculer $-${b}+x^2$ pour $x=${a}$ :`
                texteCorr = `$-${b}+(${a})^2=${-b + a * a}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (c === 3) {
                a = randint(2, 9)
                b = randint(1, 9)
                d = randint(1, 9)
                resultat = calcul(a - a * a)
                texte = `Calculer $x-x^2$ pour $x=${a}$ :`
                texteCorr = `$${a}-${a}^2=${a - a ** 2}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (c === 4) {
                a = randint(1, 6)
                b = randint(1, 9)
                d = randint(1, 9)
                resultat = calcul(a ** 2 + a - d)
                texte = `Calculer $x^2+x-${d}$ pour $x=${a}$ :`
                texteCorr = `$(${a})^2+${a}-${d}=${a ** 2 + a - d}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break
            case 2:// resolution de ax+b=c
              a = randint(2, 9)
              b = randint(1, 9)
              c = randint(1, 9, b)

              texte = `Donner la solution de l'équation $${reduireAxPlusB(a, b)}=${c}$.<br>
                Donner le résultat sous la forme d'une fraction irréductible ou d'un entier le cas échéant.`
              texteCorr = `En retranchant $${b}$ dans chaque membre, puis en divisant par $${a}$, on obtient la solution $${texFractionReduite(c - b, a)}$`
              setReponse(this, i, [`${texFractionReduite(c - b, a)}`])

              break
            case 3:// developpement k*(a+b)
              a = randint(1, 4)
              b = randint(1, 9) * choice([-1, 1])
              k = randint(2, 7) * choice([-1, 1])
              inconnue = choice(['x', 'y'])
              if (a === 1) {
                // ne pas écrire 1x
                texte = `Développer : $A=(${inconnue}${ecritureAlgebrique(
        b
      )})\\times${ecritureParentheseSiNegatif(k)}$`
              } else {
                texte = `Développer : $A=(${a}${inconnue}${ecritureAlgebrique(
        b
      )})\\times${ecritureParentheseSiNegatif(k)}$`
              }

              if (a === 1) {
                // ne pas écrire 1x
                texteCorr = `Développer : $A=(${inconnue}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiNegatif(k)}=${k}\\times ${inconnue}+${ecritureParentheseSiNegatif(k)}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`
              } else {
                texteCorr = `Développer : $A=(${a}${inconnue}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiNegatif(k)}=${k}\\times ${a}${inconnue}+${ecritureParentheseSiNegatif(k)}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`
              }
              setReponse(this, i, [`${k * a}${inconnue}${ecritureAlgebrique(k * b)}`])

              break

            case 4:// developpement kx*(a+b)
              a = randint(1, 4)
              b = randint(1, 9) * choice([-1, 1])
              k = randint(2, 7) * choice([-1, 1])
              inconnue = choice(['x', 'y'])
              if (a === 1) {
                // ne pas écrire 1x
                texte = `Développer : $A=${k}${inconnue}(${inconnue}${ecritureAlgebrique(b)})$`
              } else {
                texte = `Développer : $A=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(b)})$`
              }

              if (a === 1) {
                // ne pas écrire 1x
                texteCorr = `$A=${k}${inconnue}(${inconnue}${ecritureAlgebrique(
                  b
                )})=${k}${inconnue}\\times ${inconnue} ${signe(
                  k * b
                )}${k}${inconnue}\\times ${abs(b)}=${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}$`
              } else {
                if (k > 0) {
                  texteCorr = `$A=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(
                    b
                  )})=${k}${inconnue}\\times ${a}${inconnue} + ${k}${inconnue}\\times ${ecritureParentheseSiNegatif(
                    b
                  )}=${k * a}${inconnue}^2${ecritureAlgebrique(
                    k * b
                  )}${inconnue}$`
                } else {
                  texteCorr = `$A=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(
                    b
                  )})=${k}${inconnue}\\times ${a}${inconnue} + (${k}${inconnue})\\times ${ecritureParentheseSiNegatif(
                    b
                  )}=${k * a}${inconnue}^2${ecritureAlgebrique(
                    k * b
                  )}${inconnue}$`
                }
              }

              setReponse(this, i, [`${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}`])

              break
          }

          break

        case 'q15':
          switch (choice([1, 2, 3, 4, 5, 6, 7])) { // 1, 2, 3, 4, 5, 6, 7
            case 1:// conversion fraction <->décimale cinquième et quart
              a = randint(3, 9)
              b = randint(0, 1)
              texte = `Un carré de côté ${a} cm a le même périmètre qu'un rectangle de largeur ${a - b} cm et de longueur ${a + 1} cm ? (V ou F)`
              if (b === 0) {
                texteCorr = `Faux car $4\\times ${a}$ cm$\\neq 2\\times ${a}$ cm$ + 2\\times ${a + 1}$ cm.`
                setReponse(this, i, 'F')
              } else {
                texteCorr = `Vrai car $4\\times ${a}$ cm = $2\\times ${a - 1}$ cm $ + 2\\times ${a + 1}$ cm$= ${4 * a}$ cm.`
                setReponse(this, i, 'V')
              }
              break
            case 2:// aire d'un carré connaissant son perimètre
              a = randint(2, 10)
              resultat = calcul(a * a)
              texte = `Quelle est l'aire d'un carré en cm$^2$ dont le périmètre est $${4 * a}$ cm ? `
              texteCorr = `Le côté du carré est $${4 * a}\\div 4=${a}$, donc son aire est : $${a}\\times ${a}=${a ** 2}$ cm$^2$.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
            case 3:// perimètre d'un carré connaissant son aire
              a = randint(1, 10)
              c = a * a
              resultat = calcul(4 * a)
              texte = `Déterminer le périmètre (en cm) d'un carré d'aire $${c}$ cm$^2$. `
              texteCorr = `Le côté du carré est $\\sqrt{${c}}=${a}$. Son périmètre est donc $4\\times ${a}=${4 * a}$ cm.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break

            case 4:// côté d'un carré connaissant son perimètre
              a = randint(5, 20) * 4
              resultat = calcul(a / 4)
              texte = `Le périmètre d'un carré est $${a}$ cm. Quelle est la longueur (en cm) du côté du carré ? `
              texteCorr = `Le côté du carré est $${a}\\div 4=${a / 4}$.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
            case 5:// périmètre d'une figure
              a = randint(1, 3)//
              b = randint(4, 7)//
              n = randint(7, 12)
              c = randint(1, 6) + randint(3, 9) / 10
              d = n - c
              A = point(0, 0, 'P')
              B = point(7, 1, 'Q', 'below')
              C = point(6.5, 4, 'R')
              D = point(2, 5, 'R')

              objets.push(segment(A, B), segment(B, C), segment(C, D), segment(D, A), tracePoint(A, B, C, D))
              objets.push(latexParCoordonnees(`${texNombrec(b)}\\text{m}`, milieu(A, D).x - 0.5, milieu(A, D).y, 'black', 20, 10, ''),
                latexParCoordonnees(`${texNombrec(a)}\\text{m}`, milieu(B, C).x + 0.5, milieu(B, C).y, 'black', 20, 10, ''),
                latexParCoordonnees(`${texNombrec(c)}\\text{m}`, milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, ''),
                latexParCoordonnees(`${texNombrec(d)}\\text{m}`, milieu(C, D).x, milieu(C, D).y + 0.5, 'black', 20, 10, ''))

              texte = `Quel est le périmètre de cette figure (en m) ?
              `
              texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 8, ymax: 6, pixelsParCm: 30, mainlevee: true, amplitude: 0.5, scale: 0.7 }, objets)
              texteCorr = ` Le périmètre est donné par : $${texNombrec(a)}+${texNombrec(b)}+${texNombrec(c)}+${texNombrec(d)}=${texNombrec(a + b + c + d)}$.
          <br>`

              setReponse(this, i, a + b + c + d, { formatInteractif: 'calcul' })

              break
            case 6:// agrandissement/réduction
              N = choice(['a', 'b', 'c'])
              if (N === 'a') {
                a = randint(2, 7)// aire
                c = randint(2, 4)// coefficient
                texte = `Les longueurs d'un rectangle de $${a}$ cm$^2$  sont multipliées par $${c}$.<br>
              Quelle est l'aire (en cm$^2$) du rectangle ainsi obtenu ?
              `

                texteCorr = ` Si les longueurs sont multiplées par $k$, les aires sont multipliées par $k^2$, soit ici par $${c}^2=${c ** 2}$.<br>
              Ainsi, l'aire du nouveau rectangle est : $${a}\\times ${c * c}=${a * c * c}$ cm $^2$.
          <br>`

                setReponse(this, i, a * c * c, { formatInteractif: 'calcul' })
              }

              if (N === 'b') {
                fraction = choice(listeFractions)
                n = fraction[0]
                d = fraction[1]
                texte = `Les longueurs d'un triangle sont multipliées par $\\dfrac{${n}}{${d}}$.<br>
              Par combien est multipliée son aire  ?
              `

                texteCorr = ` Si les longueurs sont multiplées par $k$, les aires sont multipliées par $k^2$.<br>
              Ainsi, l'aire a été multipliée par : $\\left(\\dfrac{${n}}{${d}}\\right)^2=\\dfrac{${n * n}}{${d * d}}$.
          <br>`

                setReponse(this, i, new Fraction(n * n, d * d), { formatInteractif: 'fraction' })
              }
              if (N === 'c') {
                fraction = choice(listeFractions)
                n = fraction[0]
                d = fraction[1]
                texte = `L'aire d'un parallélogramme a été multipliée par $\\dfrac{${n * n}}{${d * d}}$.<br>
              Par combien ont été multipliées les longueurs de ses côtés ?
              `

                texteCorr = ` Si les aires sont multiplées par $k$, les longueurs sont multipliées par $\\sqrt{k}$.<br>
              Ainsi, les longueurs ont été multipliées par  : $\\sqrt{\\dfrac{${n * n}}{${d * d}}}=\\dfrac{${n}}{${d}}$.
          <br>`

                setReponse(this, i, new Fraction(n, d), { formatInteractif: 'fraction' })
              }
              break
            case 7:// longueur à trouver à partir d'une aire triangle rectangle
              a = randint(2, 10)//
              b = randint(1, 5) * a
              A = point(0, 0, 'A', 'below')
              B = point(8, 0, 'B', 'below')
              C = point(6, 3.46, 'C')

              objets.push(segment(A, B), segment(B, C), segment(C, A), labelPoint(A, B, C), tracePoint(A, B, C), codageAngleDroit(A, C, B))
              objets.push(latexParCoordonnees(`${texNombrec(a)}\\text{m}`, milieu(B, C).x + 0.5, milieu(B, C).y + 0.5, 'black', 20, 10, '')
              )

              texte = ` L'aire de ce triangle est $${b}$ m$^2$. Donner la longueur $AC$ (en m).
              `
              texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 9, ymax: 4.5, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
              texteCorr = ` L'aire de ce triangle rectangle est donnée par : $\\dfrac{BC\\times AC}{2}$.<br>
              On cherche $AC$ telle que $\\dfrac{${a}\\times AC}{2}=${b}$. <br>
              $AC=\\dfrac{2\\times ${b}}{${a}}=${texFractionReduite(2 * b, a)}$ m.
          <br>`

              setReponse(this, i, 2 * b / a, { formatInteractif: 'calcul' })

              break
          }

          break

        case 'q16':
          switch (choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) { //
            case 1:// nombre de nombres entiers entre deux valeurs
              a = randint(10, 80)

              resultat = calcul(a - 2)
              texte = `Le nombre d'entiers strictement compris entre $1$ et $${a}$ est :`
              texteCorr = `Il y a $${a}-2$ soit $${a - 2}$ entiers strictement compris entre 1 et $${a}$ `
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
            case 2:// calculs divers

              N = choice(['a', 'b'])
              if (N === 'a') {
                a = randint(-10, -1)
                resultat = calcul(2 * a * a)
                texte = `Calculer $A=(${a})^2+(${abs(a)})^2$.`
                texteCorr = `$A=(${a})^2+(${abs(a)})^2=${a * a}+${a * a}=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = randint(2, 9)
                b = randint(2, 9)
                c = randint(-9, 9, 0)
                resultat = calcul(a - b * c)
                texte = `$${a}-${b}\\times ${ecritureParentheseSiNegatif(c)}$`
                texteCorr = `$${a}-${b}\\times ${ecritureParentheseSiNegatif(c)}=${a}-${ecritureParentheseSiNegatif(b * c)}=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break

            case 3:// calcul astucieux avec 100
              N = choice(['a', 'b'])
              a = randint(1, 9)
              b = randint(1, 9, a)
              c = randint(1, 9, [a, b])
              d = calcul(a + b * 0.1 + c * 0.01)
              resultat = calcul(100 * d)
              N = choice(['a', 'b', 'c', 'd'])
              if (N === 'a') {
                texte = `$4 \\times ${texNombre(d)}\\times 25$`
                texteCorr = `$4 \\times ${texNombre(d)}\\times 25 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                texte = `$2 \\times ${texNombre(d)}\\times 50$`
                texteCorr = `$2 \\times ${texNombre(d)}\\times 50 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'c') {
                texte = `$25 \\times ${texNombre(d)}\\times 4$`
                texteCorr = `$25 \\times ${texNombre(d)}\\times 4 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'd') {
                texte = `$50 \\times ${texNombre(d)}\\times 2$`
                texteCorr = `$50 \\times ${texNombre(d)}\\times 2 = 100 \\times ${texNombre(d)} = ${calcul(100 * d)}$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break
            case 4:// calcul avec des puissances de 10
              a = randint(1, 6)
              n = (2 * a + 1) / 2
              b = randint(1, 6, a)
              N = (2 * b + 1) / 2
              c = randint(2, 3)
              d = randint(2, 3)
              resultat = calcul(n * 10 ** c + N * 10 ** d)
              texte = `Calculer sous forme décimale : $B=${texNombrec(n)}\\times 10^{${c}}+${texNombrec(N)}\\times 10^{${d}}$.`
              texteCorr = `$B=${texNombrec(n * 10 ** c)}+${texNombrec(N * 10 ** d)}=${resultat}$.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break

            case 5:// calculs astucieux avec puissances1
              N = choice(['a', 'b'])
              if (N === 'a') {
                a = choice([0.25, 0.5])
                b = randint(2, 5)
                resultat = ((4 ** b) * (a ** b))
                texte = `$4^{${b}} \\times ${texNombrec(a)}^{${b}}=$`
                texteCorr = `$4^{${b}}\\times ${texNombrec(a)}^{${b}}=(4\\times ${a})^{${b}}=${texNombrec((4 ** b) * (a ** b))} $`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = choice([0.2, 0.4])
                b = randint(2, 5)
                resultat = ((5 ** b) * (a ** b))
                texte = `$5^{${b}} \\times ${texNombrec(a)}^{${b}}= $`
                texteCorr = `$5^{${b}} \\times ${texNombrec(a)}^{${b}}=(5\\times ${texNombrec(a)})^{${b}}=${texNombrec((5 ** b) * (a ** b))} $`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break
            case 6:// calculs astucieux avec puissances2
              N = choice(['a', 'b', 'c'])
              if (N === 'a') {
                a = randint(-3, -1)
                resultat = ((2 ** a) * 8)
                texte = `$2^{${a}} \\times 8=$`
                texteCorr = `$2^{${a}}\\times 8=\\dfrac{1}{2^{${abs(a)}}}\\times 8=${texNombrec(8 * 1 / 2 ** (-a))} $`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = randint(-4, -1)
                resultat = ((2 ** a) * 16)
                texte = `$2^{${a}} \\times 16=$`
                texteCorr = `$2^{${a}} \\times 16=\\dfrac{1}{2^{${abs(a)}}}\\times 16=${texNombrec(16 * 1 / 2 ** (-a))} $`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'c') {
                a = randint(-5, -1)
                resultat = ((2 ** a) * 32)
                texte = `$2^{${a}} \\times 32=$`
                texteCorr = `$2^{${a}} \\times 32=\\dfrac{1}{2^{${abs(a)}}}\\times 32=${texNombrec(32 * 1 / 2 ** (-a))} $`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break
            case 7:// propriétés puissances
              a = randint(2, 10)
              c = randint(-5, 10, [0, 1])
              d = randint(2, 10)
              resultat = calcul(-d - c)
              texte = `$${a}^{...}\\times ${a}^{${c}}=${a}^{${-d}}$`
              texteCorr = `$\\ldots +${ecritureParentheseSiNegatif(c)}=-${d}$, soit $....=-${d}-${ecritureParentheseSiNegatif(c)}=${-d - c}$.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
            case 8:// difference (a+1)^2-a^2 ou opposé
              a = randint(20, 40)
              b = a + 1
              N = choice(['a', 'b'])
              if (N === 'a') {
                resultat = calcul(b ** 2 - a ** 2)
                texte = `$${b}^2-${a}^2=....$`
                texteCorr = `$${b}^2-${a}^2=(${b}-${a})(${b}+${a})=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                resultat = calcul(a ** 2 - b ** 2)
                texte = `$${a}^2-${b}^2=....$`
                texteCorr = `$${a}^2-${b}^2=(${a}-${b})(${a}+${b})=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }

              break
            case 9:// calculs +99 +999 -99 -999

              N = choice(['a', 'b', 'c', 'd', 'e'])
              if (N === 'a') {
                a = randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9)
                resultat = calcul(a + 99)
                texte = `Calculer $${a}+99$.`
                texteCorr = `$${a}+99=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = randint(1, 9) * 1000 + randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9)
                resultat = calcul(a + 999)
                texte = `Calculer $${a}+999$.`
                texteCorr = `$${a}+999=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'c') {
                a = randint(1, 9) * 1000 + randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9)
                resultat = calcul(a - 999)
                texte = `Calculer $${a}-999$.`
                texteCorr = `$${a}-999=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'd') {
                a = randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9)
                resultat = calcul(a - 99)
                texte = `Calculer $${a}-99$.`
                texteCorr = `$${a}-99=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'e') {
                a = randint(1, 9) * 1000 + randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9)
                resultat = calcul(a + 99)
                texte = `Calculer $${a}+99$.`
                texteCorr = `$${a}+99=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break

            case 10:// division avec décimaux
              a = randint(3, 9) / 10
              b = randint(2, 9)

              resultat = calcul((a * b) / a)
              texte = `Calculer $\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}$.<br>
              On donnera le résultat sous forme décimale.`
              texteCorr = `$\\dfrac{${texNombrec(a * b)}}{${texNombrec(a)}}=\\dfrac{${texNombrec(a * b)}\\times 10}{${texNombrec(a)}\\times 10}=\\dfrac{${texNombrec(a * b * 10)}}{${texNombrec(a * 10)}}=${texNombrec((a * b) / a)}$. `
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
          }

          break

        case 'q17':
          switch (choice([1, 2, 3, 4])) { // 1, 2, 3
            case 1:// pourcentage prix après  diminution de  10 ou 20%
              N = choice(['a', 'b'])
              if (N === 'a') {
                a = randint(4, 13) * 5
                n = choice(['pull', 'pantalon', 'tee-shirt', 'vêtement'])
                b = choice([10, 20])
                resultat = calcul(a - (b * a) / 100)
                texte = `Le prix d'un ${n} est $${a}$ €. Il baisse de $${b}$ %. <br>
            Quel est son nouveau prix ? `
                texteCorr = `Il coûte : $${a}-${texNombrec(calcul(b / 100))}\\times ${a}= ${texNombrec(a - (b * a) / 100)} €.$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = randint(4, 13) * 5
                n = choice(['pull', 'pantalon', 'tee-shirt', 'vêtement'])
                b = choice([10, 20])
                resultat = calcul(a - (b * a) / 100)
                texte = `Le prix d'un ${n} est ${a} €. Il baisse de ${b} %. <br>
                  Quel est son nouveau prix ? `
                texteCorr = `Il coûte : $${a}-${texNombrec(calcul(b / 100))}\\times ${a}= ${a - (b * a) / 100} €.$`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }

              break
            case 2:// situation proportion1

              a = choice([5, 6, 7])
              if (a === 5) {
                b = randint(4, 7) * 5
                resultat = calcul(4 * b / 5)
                texte = `$\\dfrac{1}{${a}}$ des élèves d'une classe de $${b}$ élèves a des lunettes.<br>
                Quel est le nombre d'élèves n'en ayant pas ?`
                texteCorr = `Si $\\dfrac{1}{${a}}$ en a, $\\dfrac{4}{${a}}$ n'en a pas, soit : $4\\times \\dfrac{${b}}{5}=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (a === 6) {
                b = randint(3, 6) * 6
                resultat = calcul(5 * b / 6)
                texte = `$\\dfrac{1}{${a}}$ des élèves d'une classe de $${b}$ élèves a des lunettes.<br>
                Quel est le nombre d'élèves n'en ayant pas ?`
                texteCorr = `Si $\\dfrac{1}{${a}}$ en a, $\\dfrac{5}{${a}}$ n'en a pas, soit : $5\\times \\dfrac{${b}}{6}=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (a === 7) {
                b = randint(3, 5) * 7
                resultat = calcul(6 * b / 7)
                texte = `$\\dfrac{1}{${a}}$ d'une classe de $${b}$ élèves ont des lunettes.<br>
                Quel est le nombre d'élèves n'en ayant pas ?`
                texteCorr = `Si $\\dfrac{1}{${a}}$ en a, $\\dfrac{6}{${a}}$ n'en a pas, soit : $6\\times \\dfrac{${b}}{7}=${resultat}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }

              break
            case 3:// situation proportion2
              a = choice([20, 40])
              b = choice([4, 8, 16])
              texte = ` Dans une classe de $${a}$ élèves, $${b}$  sont des filles.<br>
             Elles représentent ..... % de l'effectif de la classe.`
              texteCorr = `La proportion de filles est donnée par $\\dfrac{${b}}{${a}}=${texNombrec(b / a)}$, soit $${texNombrec((b / a) * 100)}$%.`

              setReponse(this, i, (b / a) * 100)

              break

            case 4:// situation proportion3
              a = choice([20, 40, 60, 80])
              b = choice([50, 10, 20])
              c = choice([50, 10, 20])
              texte = ` Dans un sachet, il y a $${a}$ bonbons.<br>
$${b}$ % des bonbons sont verts et $${c}$ % de ceux-ci sont à la pomme.<br>
Quel est le nombre de bonbons verts à la pomme ?`
              texteCorr = `Les bonbons verts à la pomme représentent $${b}$ % de $${c}$ % des bonbons.<br>
$${b}$ % de $${a}=${texNombrec(b / 100)}\\times ${a}=${texNombrec(b * a / 100)}$.<br>
Il y a $${texNombrec(b * a / 100)}$ bonbons verts.<br>
$${c}$ % de $${texNombrec(b * a / 100)}=${texNombrec(c / 100)}\\times ${b * a / 100}=${texNombrec(c * b * a / 10000)}$.<br>
Il y a donc $${texNombrec(c * b * a / 10000)}$ bonbons verts à la pomme.
`

              setReponse(this, i, c * b * a / 10000)

              break
          }

          break

        case 'q18':
          switch (choice([1, 2, 3])) { //
            case 1:// proba urne boulesB et boulesN
              a = randint(2, 9)
              b = randint(5, 15)

              resultat = calcul(a / (a + b))
              texte = `Dans une urne, il y a $${a}$ boules noires et $${b}$ boules blanches.<br>
                On tire une boule de manière équiprobable. <br>
                La probabilité d'obtenir une boule noire est : <br>
               (donner le résultat sous la forme d'une fraction irréductible)`
              texteCorr = `La probabilité est donnée par : $\\dfrac{${a}}{${a}+${b}}=${texFractionReduite(a, a + b)}$`
              setReponse(this, i, [`${texFractionReduite(a, a + b)}`])

              break
            case 2:// débombrement
              a = randint(3, 5)
              b = randint(2, 4)
              c = randint(2, 4)
              resultat = calcul(a * b * c)
              texte = `A la cantine, il y a toujours $${a}$ entrées différentes, $${b}$ plats différents et $${c}$ desserts différents.<br>
              Combien de menus (composés d'une entrée, d'un plat et d'un dessert) différents peut-on avoir dans cette cantine ?`
              texteCorr = `On peut avoir : $${a}\\times ${b}\\times ${c} =${a * b * c}$ menus diférents.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
            case 3:// proba evenement contraire
              fraction = choice(listeFractions)
              n = fraction[0]
              d = fraction[1]

              texte = `La probabilité d'un événement $A$ est $${texFraction(n, d)}$. <br>
              Quelle est la probabilité de son événement contraire ?<br>
              On donnera le résultat sous la forme d'une fraction irréductible. `
              texteCorr = `On a $P(\\overline{A})=1-P(A)=1-\\dfrac{${n}}{${d}}=${texFraction(d - n, d)}$.`
              setReponse(this, i, [`${texFractionReduite(d - n, d)}`])

              break
            case 4:// calcul proba val décimale
              a = randint(1, 9)
              b = 10 - a

              resultat = calcul(a / 10)
              texte = `Une urne contient $${a}$ boules bleues et $${b}$ boules rouges. <br>
              On tire une boule au hasard.<br>
              Quelle est la probabilité de tirer une boule bleue ?<br>
              On donnera le résultat sous forme décimale.`
              texteCorr = `La probabilité est donnée par : $\\dfrac{${a}}{${a}+${b}}= ${texNombrec(a / 10)}$.`

              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
          }

          break

        case 'q19':
          switch (choice([1, 2, 3, 4, 5, 6])) { // 1,2,3,4,5
            case 1:// calcul  coordonnées milieu
              a = randint(1, 6)
              b = randint(3, 5)
              c = randint(2, 9)
              d = randint(1, 10)

              texte = `Dans un repère du plan, on donne $A(${a};${c})$ et $B(${b};${d})$.<br>
              Déterminer les coordonnées du milieu de $[AB]$ sous forme décimale.`
              texteCorr = `Les coordonnées du milieu sont  données par : 
              $\\left(\\dfrac{${a}+${b}}{2};\\dfrac{${c}+${d}}{2}\\right)=(${texNombrec((a + b) / 2)};${texNombrec((c + d) / 2)})$`
              setReponse(this, i, [`(${texNombrec((a + b) / 2)};${texNombrec((c + d) / 2)})`])

              break
            case 2:// calcul  coordonnées milieu (avec l'origine)
              a = randint(-9, 9, 0)
              b = randint(-9, 9, 0)

              texte = `Dans un repère du plan d'origine $O$, on donne $A(${a};${b})$.<br>
              Déterminer les coordonnées du milieu de $[OA]$ sous forme décimale.`
              texteCorr = `Les coordonnées du milieu sont  données par : 
              $\\left(\\dfrac{0+${ecritureParentheseSiNegatif(a)}}{2};\\dfrac{0+${ecritureParentheseSiNegatif(a)}}{2}\\right)=(${texNombrec((a) / 2)};${texNombrec((b) / 2)})$`
              setReponse(this, i, [`(${texNombrec((a) / 2)};${texNombrec((b) / 2)})`])

              break
            case 3:// calcul  coordonnées d'un point avec O milieu
              a = randint(-9, 9, 0)
              b = randint(-9, 9, 0)

              texte = `Dans un repère du plan d'origine $O$, on donne $A(${a};${b})$.<br>
              Déterminer les coordonnées du point $B$ de façon que $O$ soit le milieu de $[AB]$.<br>
              (donner les coordonnées  sous forme décimale)`
              texteCorr = `Les points $A$ et $B$ ont des coordonnées oppsées, donc $B(${texNombrec(-a)};${texNombrec(-b)})$`
              setReponse(this, i, [`(${texNombrec(-a)};${texNombrec(-b)})`])

              break

            case 4:// distance OA
              a = randint(-5, 5, 0)
              b = randint(-5, 5, 0)

              texte = `Dans un repère du plan d'origine $O$, on donne $A(${a};${b})$.<br>
              Déterminer la longueur du segment $[OA]$.<br>
              (donner le résultat sous la forme $\\sqrt{a}$)`
              texteCorr = `$OA=\\sqrt{x_A^2+y_A^2}=\\sqrt{${ecritureParentheseSiNegatif(a)}^2+${ecritureParentheseSiNegatif(b)}^2}=\\sqrt{${a ** 2}+${b ** 2}}=\\sqrt{${a ** 2 + b ** 2}}$`
              setReponse(this, i, [`\\sqrt{${a ** 2 + b ** 2}}`])

              break

            case 5:// distance AB
              a = randint(1, 6)
              b = randint(1, 6, a)
              c = randint(1, 6)
              d = randint(1, 6, b)
              if ((c - a) ** 2 + (d - b) ** 2 === 1 || (c - a) ** 2 + (d - b) ** 2 === 4 || (c - a) ** 2 + (d - b) ** 2 === 9 || (c - a) ** 2 + (d - b) ** 2 === 16 || (c - a) ** 2 + (d - b) ** 2 === 25 || (c - a) ** 2 + (d - b) ** 2 === 36) {
                texte = `Dans un repère du plan d'orignine $O$, on donne $A(${a};${b})$ et $B(${c};${d})$.<br>
              Déterminer la longueur du segment $[AB]$.<br>
              (donner le résultat sous la forme $\\sqrt{a}$ ou d'un nombre entier le cas échéant)`
                texteCorr = `$AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}=\\sqrt{(${c}-${ecritureParentheseSiNegatif(a)})^2+(${d}-${ecritureParentheseSiNegatif(b)})^2}=\\sqrt{${(c - a) ** 2}+${(d - b) ** 2}}=\\sqrt{${(c - a) ** 2 + (d - b) ** 2}}=${Math.sqrt((c - a) ** 2 + (d - b) ** 2)}$`
                setReponse(this, i, Math.sqrt((c - a) ** 2 + (d - b) ** 2), { formatInteractif: 'calcul' })
              } else {
                texte = `Dans un repère du plan d'orignine $O$, on donne $A(${a};${b})$ et $B(${c};${d})$.<br>
              Déterminer la longueur du segment $[AB]$.<br>
              (donner le résultat sous la forme $\\sqrt{a}$ ou d'un nombre entier le cas échéant)`
                texteCorr = `$AB=\\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}=\\sqrt{(${c}-${ecritureParentheseSiNegatif(a)})^2+(${d}-${ecritureParentheseSiNegatif(b)})^2}=\\sqrt{${(c - a) ** 2}+${(d - b) ** 2}}=\\sqrt{${(c - a) ** 2 + (d - b) ** 2}}$`
                setReponse(this, i, [`\\sqrt{${(c - a) ** 2 + (d - b) ** 2}}`])
              }

              break
            case 6:// milieu entre 1 et fraction avec graphique
              fraction = choice(listeFractions1)
              n = fraction[0]
              d = fraction[1]
              a = randint(6, 9)
              A = point(0, 0, '1', 'below')
              B = point(4, 0, 'I', 'below')
              C = point(8, 0)

              objets.push(segmentAvecExtremites(A, B), segmentAvecExtremites(B, C), labelPoint(B), codeSegments('||', 'blue', A, B, B, C))
              objets.push(latexParCoordonnees('1', 0, -0.5, 'black', 20, 10, ''),
                latexParCoordonnees(`${texFraction(n, d)}`, 8, -0.5, 'black', 20, 10, ''))

              texte = `Quelle est l'abscisse du point $I$ sous forme de fraction irréductible ? 
              `
              texte += mathalea2d({ xmin: -1, ymin: -3, xmax: 10, ymax: 2, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
              texteCorr = ` $x_I=\\dfrac{1+${texFraction(n, d)}}{2}=${texFractionReduite(d + n, 2 * d)}$.
          <br>`
              setReponse(this, i, [`${texFractionReduite(d + n, 2 * d)}`])
              break
          }

          break

        case 'q20':
          switch (choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) { //
            case 1:// pythagore hypoténuse
              a = randint(1, 6)//

              b = randint(1, 5)//

              A = point(0, 0, 'A', 'below')
              B = point(8, 0, 'B', 'below')
              C = point(8, 6, 'C')

              objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(A, B, C))
              objets.push(latexParCoordonnees(`${texNombrec(a)}`, milieu(B, C).x + 0.5 + 0, milieu(B, C).y, 'black', 20, 10, ''),
                latexParCoordonnees('x', milieu(A, C).x, milieu(A, C).y + 0.5, 'black', 20, 10, ''), latexParCoordonnees(`${texNombrec(b)}`, milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, ''))

              texte = `Sur cette figure $x=\\sqrt{a}$ avec $a=$ 
              `
              texte += mathalea2d({ xmin: -1, ymin: -3, xmax: 12, ymax: 8, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
              texteCorr = ` En utilisant le théorème de Pythagore, on a :<br>
           $AB^2+BC^2=AC^2$, soit $x=\\sqrt{${a}^2+${b}^2}=\\sqrt{${a ** 2 + b ** 2}}$
          <br>`

              setReponse(this, i, a ** 2 + b ** 2, { formatInteractif: 'calcul' })

              break
            case 2:// pythagore côté
              a = randint(1, 5)//

              b = randint(6, 9)//

              A = point(0, 5, 'P')
              B = point(5, 0, 'Q', 'below')
              C = point(5, 5, 'R')

              objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(A, C, B))
              objets.push(latexParCoordonnees(`${texNombrec(a)}`, milieu(B, C).x + 0.5 + 0, milieu(B, C).y, 'black', 20, 10, ''),
                latexParCoordonnees('x', milieu(A, C).x, milieu(A, C).y + 0.5, 'black', 20, 10, ''), latexParCoordonnees(`${texNombrec(b)}`, milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, ''))

              texte = `Sur cette figure $x=\\sqrt{a}$ avec $a=$ 
              `
              texte += mathalea2d({ xmin: -1, ymin: -3, xmax: 12, ymax: 8, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
              texteCorr = ` En utilisant le théorème de Pythagore, on a :<br>
           $PR^2+RQ^2=PQ^2$ soit $RQ^2=PQ^2-PR^2$, d'où $x=\\sqrt{${b}^2-${a}^2}=\\sqrt{${b ** 2 - a ** 2}}$
          <br>`

              setReponse(this, i, b ** 2 - a ** 2, { formatInteractif: 'calcul' })

              break
            case 3:// angle  triangle isocèle
              if (choice([true, false])) {
                a = randint(3, 7, 6) * 10
                A = point(0, 0, 'A', 'below')
                B = point(5, 0, 'B', 'below')
                C = point(2.5, 2.5 * tan(a), 'C')
                objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C),
                  afficheMesureAngle(B, A, C, 'black', 1), codeSegments('||', 'blue', C, A, C, B))
                resultat = 180 - 2 * a
                texte = `Sur cette figure, quelle est la mesure en degré de l'angle $\\widehat{C}$ ? 
              `
                texte += mathalea2d({ xmin: -1, ymin: -0.8, xmax: 6, ymax: 8, pixelsParCm: 30, mainlevee: true, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
              Ainsi $\\widehat{C}=180°-2\\times ${a}°=${resultat}°$
          <br>`

                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              } else {
                a = randint(2, 7, 6) * 10

                A = point(0, 0, 'A', 'below')
                B = point(5, 0, 'B', 'below')
                C = point(2.5, 2.5 / tan(a / 2), 'C')

                objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C),
                  afficheMesureAngle(A, C, B, 'black', 1), codeSegments('||', 'blue', C, A, C, B))

                resultat = (180 - a) / 2
                texte = `Sur cette figure, quelle est la mesure en degré de l'angle $\\widehat{A}$ ? 
                `
                texte += mathalea2d({ xmin: -1, ymin: -0.8, xmax: 8, ymax: 14, pixelsParCm: 20, mainlevee: true, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
                Ainsi $\\widehat{A}=\\dfrac{180-${a}}{2}=${resultat}°$
            <br>`

                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }

              break
            case 4:// diagonale carré
              a = randint(1, 10)//

              texte = `La longueur de la diagonale d'un carré de côté $${a}$ est :<br>
              (donner le résultat sous la forme $\\sqrt{a}$)
                `

              texteCorr = ` En utilisant le théorème de Pythagore dans un carré de côté $${a}$ et de diagonale $d$, on a <br>
             $${a}^2+${a}^2=d^2$ soit $d^2=2\\times ${a}^2$, d'où $d=\\sqrt{2\\times ${a}^2}=\\sqrt{${2 * a ** 2}}$
            <br>`
              setReponse(this, i, [`\\sqrt{${2 * a ** 2}}`])

              break

            case 5:// Pythagore avec racine carrée
              a = randint(1, 10)//
              b = randint(2, 10, [4, 9])//
              texte = `$ABC$ est un triangle rectangle en $A$.<br>
              $AB=${a}$ ; $AC=\\sqrt{${b}}$. Calculer $BC$.
                `

              texteCorr = ` En utilisant le théorème de Pythagore dans $ABC$ rectangle en $A$, on obtient :<br>
              $AB^2+AC^2=BC^2$, <br>
              soit $${a}^2+\\sqrt{${b}}^2=BC^2$, d'où $BC=\\sqrt{${a * a + b}}$.
            <br>`

              setReponse(this, i, [`\\sqrt{${a ** 2 + b}}`])

              break
            case 6:// thalès1

              k = choice([1.5, 2, 2.5])
              b = randint(2, 5)//
              a = k * b
              c = randint(2, 5, b)//
              A = point(0, 0, 'A', 'below')
              B = point(1.71, 2.29, 'B')
              C = point(5, 2, 'C', 'below')
              D = point(3, 4, 'D')
              E = point(2.86, 1.14, 'E', 'below')
              G = point(-0.44, 0.44, 'K')
              H = point(2.52, 4.3, 'L')
              objets.push(droite(A, B), segment(B, E), droite(A, C), segment(D, C), segmentAvecExtremites(G, H), labelPoint(A, B, C, D, E))
              objets.push(latexParCoordonnees(`${texNombrec(a)}`, milieu(G, H).x, milieu(G, H).y + 0.75, 'black', 20, 10, ''),
                latexParCoordonnees(`${texNombrec(b)}`, milieu(A, B).x, milieu(A, B).y + 0.25, 'black', 20, 10, ''), latexParCoordonnees(`${texNombrec(c)}`, milieu(B, E).x, milieu(B, E).y + 0.2, 'black', 20, 10, ''))
              resultat = a * c / b
              texte = `Sur cette figure les droites $(BE)$ et $(DC)$ sont parallèles.<br>
              Calculer $DC$.`
              texte += mathalea2d({ xmin: -1, ymin: -3, xmax: 8, ymax: 5, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 2 }, objets)
              texteCorr = ` Les longueurs du triangle $ADC$ sont $\\dfrac{${a}}{${b}}=${texNombrec(a / b)}$ fois plus grandes que les longueurs du triangle $ABE$. <br>
Ainsi, $DC=${texNombrec(a / b)}\\times ${c}=${texNombrec(a * c / b)}$.
          <br>`

              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
            case 7:// thalès2

              k = choice([1.5, 2, 2.5])
              b = randint(2, 5) * 2//
              a = k * b
              c = randint(2, 6, b)//
              A = point(2, 3, 'A')
              B = point(1, 0, 'B')
              C = point(8, 4, 'C')
              D = point(6, -2, 'D', 'below')
              E = point(3.33, 1.33, 'E')

              objets.push(droite(A, B), droite(A, D), droite(B, C), droite(C, D), labelPoint(A, B, C, D, E))
              objets.push(latexParCoordonnees(`${texNombrec(c)}`, milieu(A, B).x, milieu(A, B).y + 0.5, 'black', 20, 10, ''),

                latexParCoordonnees(`${texNombrec(b)}`, milieu(B, E).x, milieu(B, E).y - 0.3, 'black', 20, 10, ''),
                latexParCoordonnees(`${texNombrec(a)}`, milieu(E, C).x, milieu(C, E).y + 0.2, 'black', 20, 10, ''),
                latexParCoordonnees('?', milieu(D, C).x + 0.5, milieu(C, D).y, 'black', 20, 10, ''))
              resultat = a * c / b
              texte = `Sur cette figure les droites $(AB)$ et $(DC)$ sont parallèles.<br>
              Calculer $DC$.`
              texte += mathalea2d({ xmin: 0, ymin: -3, xmax: 9, ymax: 5, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 2 }, objets)
              texteCorr = ` Les longueurs du triangle $EDC$ sont $\\dfrac{${a}}{${b}}=${texNombrec(a / b)}$ fois plus grandes que les longueurs du triangle $ABE$. <br>
Ainsi, $DC=${texNombrec(a / b)}\\times ${c}=${texNombrec(a * c / b)}$.
          <br>`

              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break
            case 8:// thalès3 (milieu)

              a = randint(1, 9) + randint(1, 5) / 10 + randint(1, 9) / 100
              A = point(0, 0, 'A', 'below')
              B = point(6, 0, 'B', 'below')
              C = point(5, 4, 'C')
              D = point(2.5, 2, 'D')
              E = point(3, 0, 'E', 'below')

              objets.push(segment(A, B), segment(D, E), segment(A, C), segment(B, C), codeSegments('||', 'blue', A, D, D, C), labelPoint(A, B, C, D, E))
              resultat = 2 * a
              texte = `$(DE)//(BC)$.<br>
              $DE=${texNombrec(a)}$. <br>
              Calculer $BC$.`
              texte += mathalea2d({ xmin: -1, ymin: -3, xmax: 8, ymax: 5, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 2 }, objets)
              texteCorr = ` Les longueurs du triangle $ABC$ sont 2 fois plus grandes que les longueurs du triangle $ADE$.<br>
              Ainsi : $BC=2\\times DE=2\\times ${texNombrec(a)}=${texNombrec(2 * a)}$.
          <br>`

              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
            case 9:// calcul de x pour que le triangle soit rectangle
              A = point(0, 0, 'P')
              B = point(4, 0, 'Q')
              C = point(1.58, 3.7, 'R')

              if (choice([true, false])) {
                a = randint(1, 5) * 2//

                objets.push(segment(A, B), segment(B, C), segment(A, C))
                objets.push(latexParCoordonnees(`${texNombrec(a)}`, milieu(B, C).x + 0.5 + 0, milieu(B, C).y, 'black', 20, 10, ''),
                  latexParCoordonnees('x', milieu(A, C).x - 0.5, milieu(A, C).y, 'black', 20, 10, ''),
                  latexParCoordonnees('x', milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, ''))

                texte = `Déterminer $x$ pour que le triangle soit rectangle.<br>
              (donner le résultat sous la forme $\\sqrt{a}$)
              `
                texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 6, ymax: 5, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` Le plus grand côté est $${a}$ (autrement il y aurait deux hypoténuses). On cherche $x$ tel que $x^2+x^2=${a}^2$.<br>
              On obtient $2x^2=${a * a}$, soit  $x=\\sqrt{${texNombrec(a ** 2 / 2)}}$.
          <br>`

                setReponse(this, i, [`\\sqrt{${a ** 2 / 2}}`])
              } else {
                a = choice([8, 18, 32, 50, 72, 98])// avec une racine carrée

                objets.push(segment(A, B), segment(B, C), segment(A, C))
                objets.push(latexParCoordonnees(`\\sqrt{${a}}`, milieu(B, C).x + 0.5 + 0, milieu(B, C).y, 'black', 20, 10, ''),
                  latexParCoordonnees('x', milieu(A, C).x - 0.5, milieu(A, C).y, 'black', 20, 10, ''),
                  latexParCoordonnees('x', milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, ''))

                texte = `Déterminer $x$ pour que le triangle soit rectangle.<br>
            
            `
                texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 6, ymax: 5, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` Le plus grand côté est $\\sqrt{${a}}$ (autrement il y aurait deux hypoténuses). On cherche $x$ tel que $x^2+x^2=${a}$.<br>
            On obtient $2x^2=${a}$, soit  $x=${Math.sqrt(a / 2)}$.
        <br>`

                setReponse(this, i, Math.sqrt(a / 2), { formatInteractif: 'calcul' })
              }

              break

            case 10:// trigo
              triplet = choice(listeTriplet)
              a = triplet[0]
              b = triplet[1]
              c = triplet[2]
              A = point(0, 0, 'A', 'below')
              B = point(-2, 3, 'B')
              C = point(2, 5.7, 'C')
              N = choice(['a', 'b', 'c', 'd', 'e', 'f'])

              objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(A, B, C))
              objets.push(latexParCoordonnees(`${texNombrec(b)}`, milieu(B, C).x, milieu(B, C).y + 0.25, 'black', 20, 10, ''),
                latexParCoordonnees(`${texNombrec(c)}`, milieu(A, C).x + 0.5, milieu(A, C).y, 'black', 20, 10, ''),
                latexParCoordonnees(`${texNombrec(a)}`, milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, ''))
              if (N === 'a') {
                texte = `$\\cos\\widehat{C}=$<br>
              (Sous forme d'une fraction irréductible)
                              `
                texte += mathalea2d({ xmin: -3, ymin: -1, xmax: 3, ymax: 7, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)

                texteCorr = ` Dans le triangle $ABC$ rectangle en $C$, on a : 
              $\\cos\\widehat{C}=\\dfrac{\\text{Côté adjacent à } \\widehat{C}}{\\text{Hypoténuse}}=\\dfrac{${b}}{${c}}.$
            <br>`

                setReponse(this, i, [`\\dfrac{${b}}{${c}}`])
              }
              if (N === 'b') {
                texte = `$\\sin\\widehat{C}=$<br>
                (Sous forme d'une fraction irréductible)
                                `
                texte += mathalea2d({ xmin: -3, ymin: -1, xmax: 3, ymax: 7, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)

                texteCorr = ` Dans le triangle $ABC$ rectangle en $C$, on a : 
                $\\sin\\widehat{C}=\\dfrac{\\text{Côté opposé à } \\widehat{C}}{\\text{Hypoténuse}}=\\dfrac{${a}}{${c}}.$
              <br>`

                setReponse(this, i, [`\\dfrac{${a}}{${c}}`])
              }
              if (N === 'c') {
                texte = `$\\tan\\widehat{C}=$<br>
                  (Sous forme d'une fraction irréductible)
                                  `
                texte += mathalea2d({ xmin: -3, ymin: -1, xmax: 3, ymax: 7, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)

                texteCorr = ` Dans le triangle $ABC$ rectangle en $C$, on a : 
                  $\\tan\\widehat{C}=\\dfrac{\\text{Côté opposé à } \\widehat{C}}{\\text{Côté opposé à } \\widehat{C}}=\\dfrac{${a}}{${b}}.$
                <br>`

                setReponse(this, i, [`\\dfrac{${a}}{${b}}`])
              }
              if (N === 'd') {
                texte = `$\\cos\\widehat{A}=$<br>
                    (Sous forme d'une fraction irréductible)
                                    `
                texte += mathalea2d({ xmin: -3, ymin: -1, xmax: 3, ymax: 7, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)

                texteCorr = ` Dans le triangle $ABC$ rectangle en $C$, on a : 
                    $\\cos\\widehat{A}=\\dfrac{\\text{Côté adjacent à } \\widehat{A}}{\\text{Hypoténuse}}=\\dfrac{${a}}{${b}}.$
                  <br>`

                setReponse(this, i, [`\\dfrac{${a}}{${c}}`])
              }
              if (N === 'e') {
                texte = `$\\sin\\widehat{A}=$<br>
                      (Sous forme d'une fraction irréductible)
                                      `
                texte += mathalea2d({ xmin: -3, ymin: -1, xmax: 3, ymax: 7, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)

                texteCorr = ` Dans le triangle $ABC$ rectangle en $C$, on a : 
                      $\\sin\\widehat{A}=\\dfrac{\\text{Côté opposé à } \\widehat{A}}{\\text{Hypoténuse}}=\\dfrac{${b}}{${c}}.$
                    <br>`

                setReponse(this, i, [`\\dfrac{${b}}{${c}}`])
              }
              if (N === 'f') {
                texte = `$\\tan\\widehat{A}=$<br>
                        (Sous forme d'une fraction irréductible)
                                        `
                texte += mathalea2d({ xmin: -3, ymin: -1, xmax: 3, ymax: 7, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)

                texteCorr = ` Dans le triangle $ABC$ rectangle en $C$, on a : 
                        $\\tan\\widehat{A}=\\dfrac{\\text{Côté opposé à } \\widehat{A}}{\\text{Côté adjacent à } \\widehat{A}}=\\dfrac{${b}}{${a}}.$
                      <br>`

                setReponse(this, i, [`\\dfrac{${b}}{${a}}`])
              }
              break
          }

          break

        case 'q21':// calculs d'images
          switch (choice([1, 2, 3, 4])) {
            case 1:// avec un poly du second degré
              x = randint(1, 3)
              if (signesDeX[i]) {
                x = -1 * x
              }
              a = randint(1, 2)
              b = randint(1, 2)
              c = randint(2, 5)
              expression = `${rienSi1(a)}x^2+${rienSi1(b)}x+${c}`
              texte = `On considère la fonction $f$ définie par $f(x)= ${expression}$. <br>
          Calculer $f(${x})$.`
              texteCorr = `$f(${x})=
          ${a}\\times ${ecritureParentheseSiNegatif(x)}^2+${rienSi1(b)}\\times ${ecritureParentheseSiNegatif(x)}+${c}=
          ${a}\\times${x * x}${ecritureAlgebrique(b * x)}=
          ${a * x * x}${ecritureAlgebrique(b * x)}+${c}=
          ${a * x * x + b * x + c}$`
              setReponse(this, i, a * x * x + b * x + c)

              break

            case 2:// calculs image  avec un produit
              a = randint(-3, 3, [0, 1, -1])
              b = randint(-3, 3, [0])
              c = randint(-3, 3, [0, 1, -1])
              d = randint(-3, 3, [0])
              x = randint(-2, 2, [0])

              expression = `(${a}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})`
              texte = `On considère la fonction $f$ définie par $f(x)= ${expression}$. <br>
          Calculer $f(${x})$.`
              texteCorr = `$f(${x})=\\left(${a}\\times${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(b)}\\right)\\left(${c}\\times${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(d)}\\right)=(${a * x}${ecritureAlgebrique(b)})(${c * x}${ecritureAlgebrique(d)})=${a * x + b}\\times${ecritureParentheseSiNegatif(c * x + d)}=${(a * x + b) * (c * x + d)}$`
              setReponse(this, i, (a * x + b) * (c * x + d))
              break
            case 3:// image avec (x+a)^2
              a = randint(-4, 4, [0, -1, 1])
              b = randint(-4, 4, [0])
              c = randint(-4, 4, [0, -1, 1])
              d = randint(-4, 4, [0])
              x = randint(-2, 2, [0])

              expression = `(${a}x${ecritureAlgebrique(b)})^2`
              texte = `On considère la fonction $f$ définie par $f(x)= ${expression}$. <br>
  Calculer $f(${x})$.`
              texteCorr = `$f(${x})=\\left(${a}\\times${ecritureParentheseSiNegatif(x)}${ecritureAlgebrique(b)}\\right)^2=(${a * x}${ecritureAlgebrique(b)})^2=${ecritureParentheseSiNegatif(a * x + b)}^2=${(a * x + b) * (a * x + b)}$`
              setReponse(this, i, (a * x + b) * (a * x + b))
              break

            case 4: // image avec un quotient
              a = randint(2, 4)
              b = randint(1, 4)
              c = randint(2, 4)
              d = randint(1, 5, b)
              x = randint(-3, 3, 0)
              while (c * x + d === 0) {
                c = randint(2, 4)
              }
              while (a * x + b === 0) {
                a = randint(2, 4)
              }
              expression = `\\dfrac{${a}x+${b}}{${c}x+${d}}`
              texte = `On considère la fonction $f$ définie par $f(x)= ${expression}$. <br>
  Calculer $f(${x})$ sous la forme d'une fraction irréductible ou d'un entier le cas échéant.`
              texteCorr = `$f(${x})=\\dfrac{${a}\\times${ecritureParentheseSiNegatif(x)}+${b}}{${c}\\times${ecritureParentheseSiNegatif(x)}+${d}}=\\dfrac{${a * x}+${b}}{${c * x}+${d}}=\\dfrac{${a * x + b}}{${c * x + d}}=${texFractionReduite(a * x + b, c * x + d)}$`
              setReponse(this, i, texFractionReduite(a * x + b, c * x + d))
              break
          }
          break

        case 'q22':// autour des droites
          switch (choice([1, 2, 3])) {
            case 1:// coordonnées d'un point d'une droite
              a = randint(-10, 10, 0)
              b = randint(-10, 10, 0)
              c = randint(-10, 10, 0)

              texte = ` Donner les coordonnées du point de la droite d'équation $y=${reduireAxPlusB(a, b)}$ qui a pour abscisse $${c}$`
              texteCorr = `Puisque $${c}$ est l'abscisse de ce point, son ordonnée est donnée par
            $y=${a}\\times ${ecritureParentheseSiNegatif(c)}+${ecritureParentheseSiNegatif(b)}=${a * c + b}$.<br>
            Les coordonnées du  point sont donc : $(${c};${texNombrec(a * c + b)})$.`

              setReponse(this, i, [`(${texNombrec(c)};${texNombrec(a * c + b)})`])
              break
            case 2:// coordonnées point d'intersection droite et axe des abscisses
              a = randint(-10, 10, 0)
              n = randint(-5, 5, 0)
              b = n * a

              texte = ` Donner les coordonnées du point d'intersection entre la droite d'équation $y=${reduireAxPlusB(a, b)}$ et l'axe des abscisses.`
              texteCorr = `L'ordonnée de ce point est $0$.<br>
              Son abscisse est la solution de l'équation  $${reduireAxPlusB(a, b)}=$, c'est-à-dire $${texFractionReduite(-b, a)}$.
            Les coordonnées de ce   point sont donc : $(${texFractionReduite(-b, a)};0)$.`

              setReponse(this, i, [`(${texFractionReduite(-b, a)};0)`])
              break
            case 3:// coordonnées point d'intersection droite et axe des ordonnées
              a = randint(-10, 10, 0)
              b = randint(1, 10)
              n = randint(-5, 5, 0)
              c = n * b
              if (c > 0) {
                texte = ` Donner les coordonnées du point d'intersection entre la droite d'équation $${rienSi1(a)}x+${rienSi1(b)}y+${c}=0$ et l'axe des ordonnées.`
                texteCorr = `L'abscisse de ce point est $0$.<br>
              Son ordonnée est la solution de l'équation  $${b}y+${c}=0$, c'est-à-dire $${texFractionReduite(-c, b)}$.
            Les coordonnées de ce   point sont donc : $(${texFractionReduite(-c, b)};0)$.`

                setReponse(this, i, [`(0;${texFractionReduite(-c, b)})`])
              } else {
                texte = ` Donner les coordonnées du point d'intersection entre la droite d'équation $${rienSi1(a)}x+${rienSi1(b)}y${c}=0$ et l'axe des ordonnées.`
                texteCorr = `L'abscisse de ce point est $0$.<br>
              Son ordonnée est la solution de l'équation  $${b}y${c}=0$, c'est-à-dire $${texFractionReduite(-c, b)}$.
            Les coordonnées de ce   point sont donc : $(0;${texFractionReduite(-c, b)})$.`

                setReponse(this, i, [`(0;${texFractionReduite(-c, b)})`])
              }
              break
          }
          break

        case 'q23':// arithmétique, calculs astucieux (avec racines carrées aussi), calculs avec parenthèses, puissances (2)
          switch (choice([1, 2, 3, 4, 5, 6, 7])) { // 1, 2, 3, 4, 5,6
            case 1:// calcul d'un carré avec racine carré
              racine = choice(listeRacines1)
              a = racine[0]
              b = racine[1]

              N = choice(['a', 'b'])
              if (N === 'a') {
                texte = `Le carré de $\\sqrt{${a}}+\\sqrt{${b}}$ est égal à : `
                texteCorr = `On utilise l'égalité remarquable $(a+b)^2=a^2+2ab+b^2$ avec $a=\\sqrt{${a}}$ et $b=\\sqrt{${b}}$.<br>
                $\\begin{aligned}(\\sqrt{${a}}+\\sqrt{${b}})^2&
                =(\\sqrt{${a}})^2+2\\times \\sqrt{${a}}\\times \\sqrt{${b}}+(\\sqrt{${b}})^2
                \\\\&=${a}+2\\sqrt{${texNombrec(a * b)}}+${b}
                \\\\&=${a + b}+2\\times${Math.sqrt(a * b)}
                \\\\ &=${a + b + 2 * Math.sqrt(a * b)}\\end{aligned}$
              `
                setReponse(this, i, a + b + 2 * Math.sqrt(a * b), { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                texte = `Le carré de $\\sqrt{${a}}-\\sqrt{${b}}$ est égal à : `
                texteCorr = `On utilise l'égalité remarquable $(a-b)^2=a^2-2ab+b^2$ avec $a=\\sqrt{${a}}$ et $b=\\sqrt{${b}}$.<br>
                $\\begin{aligned}(\\sqrt{${a}}-\\sqrt{${b}})^2&
                =(\\sqrt{${a}})^2-2\\times \\sqrt{${a}}\\times \\sqrt{${b}}+(\\sqrt{${b}})^2
                \\\\&=${a}-2\\sqrt{${texNombrec(a * b)}}+${b}
                \\\\&=${a + b}-2\\times${Math.sqrt(a * b)}
                \\\\ &=${a + b - 2 * Math.sqrt(a * b)}\\end{aligned}$`
                setReponse(this, i, a + b - 2 * Math.sqrt(a * b), { formatInteractif: 'calcul' })
              }

              break
            case 2:// programme de calcul écrit
              a = choice([45, 55, 60, 65])
              b = choice([44, 56, 52, 56])
              c = choice([36, 39, 42, 45, 48])
              d = choice([54, 60, 72, 78])
              e = randint(3, 7)
              N = choice(['quart', 'tiers', 'cinquième', 'sixième'])

              if (N === 'cinquième') {
                texte = `Prendre le ${N} de $${a}$, puis soustraire $${e}$ et élever le résultat au carré. <br>
               Quel nombre obtient-on ?`
                texteCorr = `$\\dfrac{1}{5}\\times ${a}=${texNombrec(a / 5)}$.<br>
                On soustrait $${e}$, on obtient : $${texNombrec(a / 5)}-${texNombrec(e)}=${texNombrec(a / 5 - e)}$<br>
                On élève au carré : $${texNombrec(a / 5 - e)}^2=${texNombrec((a / 5 - e) * (a / 5 - e))}$`
                setReponse(this, i, (a / 5 - e) * (a / 5 - e), { formatInteractif: 'calcul' })
              }
              if (N === 'quart') {
                texte = `Prendre le ${N} de $${b}$, puis soustraire $${e}$ et élever le résultat au carré. <br>
                Quel nombre obtient-on ?`
                texteCorr = `$\\dfrac{1}{4}\\times ${b}=${texNombrec(b / 4)}$.<br>
                 On soustrait $${e}$, on obtient : $${texNombrec(b / 4)}-${texNombrec(e)}=${texNombrec(b / 4 - e)}$<br>
                 On élève au carré : $${texNombrec(b / 4 - e)}^2=${texNombrec((b / 4 - e) * (b / 4 - e))}$`
                setReponse(this, i, (b / 4 - e) * (b / 4 - e), { formatInteractif: 'calcul' })
              }
              if (N === 'tiers') {
                texte = `Prendre le ${N} de $${c}$, puis soustraire $${e}$ et élever le résultat au carré. <br>
               Quel nombre obtient-on ?`
                texteCorr = `$\\dfrac{1}{3}\\times ${c}=${texNombrec(c / 3)}$.<br>
                On soustrait $${e}$, on obtient : $${texNombrec(c / 3)}-${texNombrec(e)}=${texNombrec(c / 3 - e)}$<br>
                On élève au carré : $${texNombrec(c / 3 - e)}^2=${texNombrec((c / 3 - e) * (c / 3 - e))}$`
                setReponse(this, i, (c / 3 - e) * (c / 3 - e), { formatInteractif: 'calcul' })
              }
              if (N === 'sixième') {
                texte = `Prendre le ${N} de $${d}$, puis soustraire $${e}$ et élever le résultat au carré. <br>
                Quel nombre obtient-on ?`
                texteCorr = `$\\dfrac{1}{6}\\times ${d}=${texNombrec(d / 6)}$.<br>
                 On soustrait $${e}$, on obtient : $${texNombrec(d / 6)}-${texNombrec(e)}=${texNombrec(d / 6 - e)}$<br>
                 On élève au carré : $${texNombrec(d / 6 - e)}^2=${texNombrec((a / 5 - e) * (d / 6 - e))}$`
                setReponse(this, i, (d / 6 - e) * (d / 6 - e), { formatInteractif: 'calcul' })
              }
              break

            case 3: // calculer (-a)^2+a^2
              a = randint(1, 10)
              texte = `Calculer $A=(-${a})^2+(${a})^2$. <br>
  `
              texteCorr = `$A=(-${a})^2+(${a})^2=${a * a}+${a * a}=${2 * a * a}$.`
              setReponse(this, i, 2 * a * a, { formatInteractif: 'calcul' })
              break

            case 4: // reste division euclidienne
              q = randint(8, 10)
              b = randint(5, 9)
              r = randint(1, b - 1)
              a = b * q + r
              texte = `Quel est le  reste de la division euclidienne de $ ${texNombre(a)} $ par $ ${b} $<br>`

              texteCorr = `$ ${texNombre(a)} = ${b} \\times ${q} + ${r} $, donc le reste est :$${r}$.`
              setReponse(this, i, r, { formatInteractif: 'calcul' })
              break

            case 5: // encadrement puissance de 10
              N = choice(['a', 'b', 'c', 'd'])
              if (N === 'a') {
                a = randint(2, 9) * 10 ** 4 + randint(1, 9) * 10 ** 3 + randint(1, 9) * 10 ** 2 + randint(1, 9) * 10 + randint(1, 9)
                texte = `L'encadrement de $${texNombrec(a)}$ par  deux puissances de $10$ d'exposants consécutifs est $10^a<${texNombrec(a)}<10^b$.<br>
            Quelle est la valeur de $b$ ?
            `
                texteCorr = `On a : $10^4<${texNombrec(a)}<10^5$, donc $b=5$.`
                setReponse(this, i, '5', { formatInteractif: 'texte' })
              }

              if (N === 'b') {
                a = randint(2, 9) * 10 ** 5 + randint(1, 9) * 10 ** 4 + randint(1, 9) * 10 ** 3 + randint(1, 9) * 10 ** 2 + randint(1, 9) * 10 + randint(1, 9)
                texte = `L'encadrement de $${texNombrec(a)}$ par  deux puissances de $10$ d'exposants consécutifs est $10^a<${texNombrec(a)}<10^b$.<br>
                Quelle est la valeur de $b$ ?
                `
                texteCorr = `On a : $10^5<${texNombrec(a)}<10^6$, donc $b=6$.`
                setReponse(this, i, '6', { formatInteractif: 'texte' })
              }

              if (N === 'c') {
                a = randint(2, 9) * 0.001 + randint(1, 9) * 0.01
                texte = `L'encadrement de $${texNombrec(a)}$ par  deux puissances de $10$ d'exposants consécutifs est $10^a<${texNombrec(a)}<10^b$.<br>
                      Quelle est la valeur de $b$ ?
                      `
                texteCorr = `On a : $10^{-2}<${texNombrec(a)}<10^{-1}$, donc $b=-1$.`
                setReponse(this, i, '-1', { formatInteractif: 'texte' })
              }
              if (N === 'd') {
                a = randint(2, 9) * 0.0001
                texte = `L'encadrement de $${texNombrec(a)}$ par  deux puissances de $10$ d'exposants consécutifs est $10^a<${texNombrec(a)}<10^b$.<br>
                        Quelle est la valeur de $a$ ?
                        `
                texteCorr = `On a : $10^{-4}<${texNombrec(a)}<10^{-3}$, donc $a=-4$.`
                setReponse(this, i, '-4', { formatInteractif: 'texte' })
              }
              break
            case 6: // racine carrée et égalité remarquable
              a = randint(1, 5)
              b = randint(2, 20, [4, 9, 16])

              texte = `Calculer $(${a}-\\sqrt{${b}})(${a}+\\sqrt{${b}})$.`

              texteCorr = `$(${a}-\\sqrt{${b}})(${a}+\\sqrt{${b}})=(${a})^2-(\\sqrt{${b}})^2=${a * a - b}$.`
              setReponse(this, i, a ** 2 - b, { formatInteractif: 'calcul' })
              break

            case 7: // calcul astucieux factorisation
              N = choice(['a', 'b'])
              if (N === 'a') {
                a = randint(5, 99) / 10
                b = randint(2, 8) * 10
                c = 100 - b
                texte = `$${texNombrec(a)}\\times ${b}+${texNombrec(a)}\\times ${c}=$ <br>
  `
                texteCorr = `$${texNombrec(a)}\\times ${b}+${texNombrec(a)}\\times ${c}=${texNombrec(a)}(${b}+${c})=${texNombrec(a)}\\times 100=${texNombrec(100 * a)}$.`
                setReponse(this, i, 100 * a, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = randint(5, 99) / 100
                b = randint(2, 8)
                c = 10 - b
                texte = `$${texNombrec(a)}\\times ${b}+ ${c}\\times${texNombrec(a)}=$ <br>
    `
                texteCorr = `$${texNombrec(a)}\\times ${b}+${texNombrec(a)}\\times ${c}=${texNombrec(a)}(${b}+${c})=${texNombrec(a)}\\times 10=${texNombrec(10 * a)}$.`
                setReponse(this, i, 10 * a, { formatInteractif: 'calcul' })
              }
              break
          }
          break

        case 'q24':// statistiques
          switch (choice([1, 2, 3, 4, 5])) { //
            case 1: // étendue
              nombreNotes = randint(4, 7)
              notes = listeDeNotes(nombreNotes, randint(0, 7), randint(13, 20)) // on récupère une série de notes (série brute)
              min = 20
              max = 0
              for (let j = 0; j < nombreNotes; j++) { // On cherche la note minimum et la note maximum
                min = Math.min(notes[j], min)
                max = Math.max(notes[j], max)
              }
              texte = `${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`
              texte += `$${notes[0]}$`
              for (let j = 1; j < nombreNotes - 1; j++) { texte += `; $${notes[j]}$ ` } // On liste les notes
              texte += `et $${notes[nombreNotes - 1]}$.<br>`
              texte += 'Calculer l\'étendue de cette série de notes.'
              texteCorr = `La note la plus basse est : $${min}$.<br>La note la plus haute est : $${max}$<br>`
              texteCorr += 'Donc l\'étendue de cette série est : ' + `$${texNombre(max)}-${texNombre(min)}=${texNombre(max - min)}$`
              setReponse(this, i, max - min, { formatInteractif: 'calcul' })
              break
            case 2: // moyenne1
              a = randint(2, 6)
              b = randint(8, 15)
              c = randint(7, 11)
              e = choice([36, 40, 44, 48, 52])
              d = e - a - b - c
              texte = `$${a}$ ; $${b}$ ; $${c}$ ; $${d}$<br>
        Quelle est la moyenne de cette série ?<br>`

              texteCorr = `La somme des $4$ valeurs est $${e}$. La moyenne est donc $\\dfrac{${e}}{4}=${texFractionReduite(e, 4)}$.<br>`

              setReponse(this, i, e / 4, { formatInteractif: 'calcul' })
              break
            case 3: // moyenne2
              a = randint(1, 2) * 5
              b = randint(9, 10)
              c = randint(5, 7)
              d = randint(1, 5)
              e = choice([35, 40, 45, 50])
              f = e - a - b - c - d
              texte = `$${b}$ ; $${a}$ ; $${c}$ ; $${d}$ ; $${f}$<br>
        Quelle est la moyenne de cette série ?<br>`

              texteCorr = `La somme des $5$ valeurs est $${e}$. La moyenne est donc $\\dfrac{${e}}{5}=${texFractionReduite(e, 5)}$.<br>`

              setReponse(this, i, e / 5, { formatInteractif: 'calcul' })
              break
            case 4: // moyenne3

              N = choice(['a', 'b', 'c'])
              if (N === 'a') {
                a = randint(3, 10)
                e = randint(2, 9) / 10
                b = a - e
                c = a + e
                texte = `$${texNombrec(a)}$ &nbsp&nbsp ; &nbsp&nbsp $${texNombrec(b)}$ &nbsp&nbsp ; &nbsp&nbsp $${texNombrec(c)}$<br>
            Quelle est la moyenne de cette série ?<br>`

                texteCorr = `On a $${texNombrec(b)}=${texNombrec(a)}-${texNombrec(e)}$ et $${texNombrec(c)}=${texNombrec(a)}+${texNombrec(e)}$.<br>
                  On en déduit que la moyenne est $${texNombrec(a)}$.`

                setReponse(this, i, a, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = randint(10, 20)
                e = randint(2, 9)
                b = a - e
                c = a + e
                texte = `$${texNombrec(a)}$ &nbsp&nbsp ; &nbsp&nbsp$${texNombrec(c)}$&nbsp&nbsp ; &nbsp&nbsp$${texNombrec(b)}$<br>
                    Quelle est la moyenne de cette série ?<br>`

                texteCorr = `On a $${texNombrec(b)}=${texNombrec(a)}-${texNombrec(e)}$ et $${texNombrec(c)}=${texNombrec(a)}+${texNombrec(e)}$.<br>
                          On en déduit que la moyenne est $${texNombrec(a)}$.`

                setReponse(this, i, a, { formatInteractif: 'calcul' })
              }
              if (N === 'c') {
                a = randint(100, 200)
                e = randint(1, 5)
                b = a - e
                c = a + e
                texte = `$${texNombrec(c)}$&nbsp&nbsp ; &nbsp&nbsp $${texNombrec(a)}$ &nbsp&nbsp ; &nbsp&nbsp$${texNombrec(b)}$<br>
                            Quelle est la moyenne de cette série ?<br>`

                texteCorr = `On a $${texNombrec(b)}=${texNombrec(a)}-${texNombrec(e)}$ et $${texNombrec(c)}=${texNombrec(a)}+${texNombrec(e)}$.<br>
                                  On en déduit que la moyenne est $${texNombrec(a)}$.`

                setReponse(this, i, a, { formatInteractif: 'calcul' })
              }
              break
            case 5: // médiane
              a = randint(10, 15)
              n = randint(1, 4)
              c = a * 2 * n + 1
              texte = `Une série de $${c}$ données est rangée dans l’ordre croissant.
              La médiane se situe au rang .....<br>`

              texteCorr = `Puisque la série comporte un nombre impair de valeurs, la médiane se situe au rang $\\dfrac{${c}+1}{2}=${texFractionReduite(c + 1, 2)}$.`

              setReponse(this, i, (c + 1) / 2, { formatInteractif: 'calcul' })
              break
          }
          break
        case 'q25':// inéquation, intervlles, inégalités
          switch (choice([1, 2, 3, 4])) { //
            case 1:// inégalités, intervalles ....
              a = randint(1, 4) * (-1)
              b = randint(1, 4)
              N = choice(['a', 'b', 'c', 'd'])
              if (N === 'a') {
                texte = `Combien y a-t-il d'entiers dans l'intervalle $[${a}&nbsp; &nbsp${b}]$ ?`
                texteCorr = `Il y en a $${b - a + 1}$.`
                setReponse(this, i, b - a + 1, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                texte = `Combien y a-t-il d'entiers dans l'intervalle $]${a}&nbsp ; &nbsp${b}]$ ?`
                texteCorr = `Il y en a $${b - a}$.`
                setReponse(this, i, b - a, { formatInteractif: 'calcul' })
              }
              if (N === 'c') {
                texte = `Combien y a-t-il d'entiers dans l'intervalle $]${a}&nbsp ; &nbsp${b}[$ ?`
                texteCorr = `Il y en a $${b - a - 1}$.`
                setReponse(this, i, b - a - 1, { formatInteractif: 'calcul' })
              }
              if (N === 'd') {
                c = randint(-4, -1) + randint(-9, -1) / 10
                texte = `Combien y a-t-il d'entiers dans l'intervalle $[${texNombrec(c)}&nbsp ;&nbsp ${b}[$ ?`
                texteCorr = `Il y en a $${b - Math.trunc(c)}$.`
                setReponse(this, i, b - Math.trunc(c), { formatInteractif: 'calcul' })
              }
              break

            case 2:// Solution d'une inéquation
              a = randint(1, 4)
              b = randint(1, 4)
              c = randint(2, 5)
              d = randint(-3, 3)
              N = choice(['a', 'b'])
              if (N === 'a') {
                texte = `$${d}$ est solution de l'inéquation &nbsp $${rienSi1(a)}x+${b}>${c}$.<br>
          Vrai (V) ou Faux (F).`
                if (a * d + b > c) {
                  texteCorr = `$${d}$ est solution car : $${a}\\times ${ecritureParentheseSiNegatif(d)}+${b}>${c}$.`
                  setReponse(this, i, 'V')
                } else {
                  texteCorr = `$${d}$ n'est pas  solution car : $${a}\\times ${ecritureParentheseSiNegatif(d)}+${b}<${c}$.`
                  setReponse(this, i, 'F')
                }
              }
              if (N === 'b') {
                texte = `$${d}$ est solution de l'inéquation&nbsp  $${rienSi1(a)}x^2-${b}>${c}$.<br>
            Vrai (V) ou Faux (F).`
                if (a * d * d - b > c) {
                  texteCorr = `$${d}$ est solution car : $${a}\\times ${ecritureParentheseSiNegatif(d)}^2-${b}>${c}$.`
                  setReponse(this, i, 'V')
                } else {
                  texteCorr = `$${d}$ n'est pas  solution car : $${a}\\times ${ecritureParentheseSiNegatif(d)}^2-${b}<${c}$.`
                  setReponse(this, i, 'F')
                }
              }
              break

            case 3: // nombres d'entiers par inégalité
              a = randint(3, 5)
              b = randint(15, 25)

              texte = `Combien y a-t-il d'entiers $n$ tels que : $${a}\\leqslant n \\leqslant ${b}$ ?`

              texteCorr = `Il y en $${b - a + 1}$.`

              setReponse(this, i, b - a + 1, { formatInteractif: 'calcul' })
              break

            case 4: // signe d'une expression affine

              a = randint(-5, 5, 0)
              n = randint(2, 7) * choice([-1, 1])
              b = n * a
              N = choice(['a', 'b'])
              if (N === 'a') {
                texte = `Vrai (V) ou Faux (F) :<br>
              $${reduireAxPlusB(a, b)}$ est strictement positif pour $x>${texFractionReduite(-b, a)}$.`
                if (a > 0) {
                  texteCorr = `$${reduireAxPlusB(a, b)}>0$.<br>
              En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
              $${rienSi1(a)}x>${-b}$<br>
              En divisant par $${a}$ dans chaque membre, on obtient :<br>
              $x>${texFractionReduite(-b, a)}$.`

                  setReponse(this, i, 'V')
                } else {
                  texteCorr = `$${reduireAxPlusB(a, b)}>0$.<br>
              En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
              $${rienSi1(a)}x>${-b}$<br>
              En divisant par $(${a})$ dans chaque membre, on obtient :<br>
              $x<${texFractionReduite(-b, a)}$.`

                  setReponse(this, i, 'F')
                }
              }
              if (N === 'b') {
                texte = `Vrai (V) ou Faux (F) :<br>
                $${reduireAxPlusB(a, b)}$ est strictement positif pour $x<${texFractionReduite(-b, a)}$.`
                if (a > 0) {
                  texteCorr = `$${reduireAxPlusB(a, b)}>0$.<br>
                En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
                $${rienSi1(a)}x>${-b}$<br>
                En divisant par $${a}$ dans chaque membre, on obtient :<br>
                $x>${texFractionReduite(-b, a)}$.`

                  setReponse(this, i, 'F')
                } else {
                  texteCorr = `$${reduireAxPlusB(a, b)}>0$.<br>
                En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
                $${rienSi1(a)}x>${-b}$<br>
                En divisant par $(${a})$ dans chaque membre, on obtient :<br>
                $x<${texFractionReduite(-b, a)}$.`

                  setReponse(this, i, 'V')
                }
              }

              break
          }
          break

        case 'q26':
          switch (choice([1, 2, 3])) { // fonctions calculs VI
            case 1:// déterminer a pour fonction affine avec une valeur

              b = randint(-3, 3, 0)
              c = randint(1, 5)

              n = choice([-3, -2, 2, 3])

              d = b + n * c
              if (b > 0) {
                texte = `$f$ est une fonction affine telle que $f(x)=ax+${b}$ et $f(${c})=${d}$.<br>
                Combien vaut $a$ ?
                `
                texteCorr = `Comme $f(${c})=${d}$, on a $a\\times ${c}+${ecritureParentheseSiNegatif(b)}=${d}$.<br>
                On en déduit $a\\times ${ecritureParentheseSiNegatif(c)}=${d}-${ecritureParentheseSiNegatif(b)}$, d'où $a=\\dfrac{${d}-${ecritureParentheseSiNegatif(b)}}{${c}}=${texFractionReduite(d - b, c)}$.`
                setReponse(this, i, (d - b) / c, { formatInteractif: 'calcul' })
              } else {
                texte = `$f$ est une fonction affine telle que $f(x)=ax-${abs(b)}$ et $f(${c})=${d}$.<br>
               Combien vaut $a$ ?
               `
                texteCorr = `Comme $f(${c})=${d}$, on a $a\\times ${c}+${ecritureParentheseSiNegatif(b)}=${d}$.<br>
               On en déduit $a\\times ${ecritureParentheseSiNegatif(c)}=${d}-${ecritureParentheseSiNegatif(b)}$, d'où $a=\\dfrac{${d}-${ecritureParentheseSiNegatif(b)}}{${c}}=${texFractionReduite(d - b, c)}$.`
                setReponse(this, i, (d - b) / c, { formatInteractif: 'calcul' })
              }
              break

            case 2:// si 2x+3=4, combien -4x-6 ?

              a = randint(-3, 3, 0)
              b = randint(-5, 5, 0)
              c = randint(-5, 5, 0)
              n = randint(-7, -1)

              texte = `Si   $${reduireAxPlusB(a, b)}=${c}$,  alors   $${reduireAxPlusB(n * a, n * b)}=$<br>
                
                `
              texteCorr = `Comme $${reduireAxPlusB(n * a, n * b)}=${n}\\times (${reduireAxPlusB(a, b)})$, alors 
                $${reduireAxPlusB(n * a, n * b)}=${n}\\times ${ecritureParentheseSiNegatif(c)}=${n * c}$`
              setReponse(this, i, n * c, { formatInteractif: 'calcul' })
              break

            case 3:// VI
              if (choice([true, false])) {
                a = randint(-10, 10, 0)
                b = randint(-10, 10, 0)
                c = randint(-10, 10, 0)

                texte = `Donner la valeur interdite de $\\dfrac{${rienSi1(a)}x}{${reduireAxPlusB(b, c)}}$.<br>
              (Résultat sous la forme d'une fraction réduite ou d'un entier le cas échéant).
                
                `
                texteCorr = `La valeur interdite est la solution de l'équation $${reduireAxPlusB(b, c)}=0$.<br>
              La valeur interdite est donc $${texFractionReduite(-c, b)}$.`
                setReponse(this, i, [`${texFractionReduite(-c, b)}`])
              } else {
                a = randint(-10, 10, 0)

                b = randint(1, 100)

                texte = `Donner la plus petite valeur interdite de $\\dfrac{${rienSi1(a)}x}{x^2-${b}}$.<br>
                (Résultat sous la forme $a\\sqrt{b}$ avec $b$ le plus petit possible ou d'un entier le cas échéant).
                  
                  `
                texteCorr = `Les valeurs interdites sont les solutions de l'équation $x^2-${b}=0$.<br>
               Cette équation a deux solutions : $${texRacineCarree(b)}$ et $-${texRacineCarree(b)}$.<br>
               La plus petite valeur interdite est donc : $-${texRacineCarree(b)}$. `
                setReponse(this, i, [`-${texRacineCarree(b)}`])
              }
              break
          }
          break

        case 'q27':// Calcul littéral2 (avec id) , équations
          switch (choice([1, 2, 3])) { //
            case 1:// développement id remarquables
              inconnue = choice(['x', 'y'])
              a = randint(1, 9)
              b = randint(2, 5)
              N = choice(['a', 'b', 'c', 'd', 'e', 'f'])
              if (N === 'a') {
                texte = ` Développer $(${inconnue}+${a})^2$.` // (x+a)²
                texteCorr = `$(${inconnue}+${a})^2=${inconnue}^2+2 \\times ${a} \\times ${inconnue}+${a}^2=${inconnue}^2+${2 * a}${inconnue}+${a * a}$`
                setReponse(this, i, [`${inconnue}^2+${2 * a}${inconnue}+${a * a}`])
              }
              if (N === 'b') {
                texte = ` Développer $(${inconnue}-${a})^2$.` // (x+a)²
                texteCorr = `$(${inconnue}+${a})^2=${inconnue}^2-2 \\times ${a} \\times ${inconnue}+${a}^2=${inconnue}^2-${2 * a}${inconnue}+${a * a}$`
                setReponse(this, i, [`${inconnue}^2-${2 * a}${inconnue}+${a * a}`])
              }
              if (N === 'c') {
                texte = `Développer $(x-${a})(x+${a})$` // (x-a)(x+a)
                texteCorr = `$(x-${a})(x+${a})=x^2-${a}^2=x^2-${a * a}$.`
                setReponse(this, i, [`x^2-${a * a}`])
              }
              if (N === 'd') {
                texte = `Développer $(${b}x+${a})^2$` // (bx+a)²  b>1
                texteCorr = `$(${b}x+${a})^2=(${b}x)^2+2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2+${2 * b * a}x+${a * a}$`
                setReponse(this, i, [`${b * b}x^2+${2 * b * a}x+${a * a}`])
              }
              if (N === 'e') {
                texte = `Développer $(${b}x-${a})^2$` // (bx-a)² b>1
                texteCorr = `$(${b}x-${a})^2=(${b}x)^2-2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2-${2 * b * a}x+${a * a}$`
                setReponse(this, i, [`${b * b}x^2-${2 * b * a}x+${a * a}`])
              }
              if (N === 'f') {
                texte = `Développer $(${b}x-${a})(${b}x+${a})$` // (bx-a)(bx+a) b>1
                texteCorr = `$(${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b * b}x^2-${a * a}$`
                setReponse(this, i, [`${b * b}x^2-${a * a}`])
              }
              break
            case 2:// factoriser
              r = choice([2, 3, 5])
              couplenm = choice([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [3, 8], [5, 8], [7, 8], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [3, 10], [7, 10], [9, 10]]) // n et m sont premiers entre eux
              n = couplenm[0]
              m = couplenm[1]
              N = choice(['a', 'b', 'c', 'd', 'e'])
              a = randint(1, 9)
              b = randint(2, 9)
              if (N === 'a') {
                texte = ` Factoriser au maximum  $${printlatex(`${n * r}*x+(${m * r})*x^2`)}$.` //
                texteCorr = `$${printlatex(`${n * r}*x+(${m * r})*x^2`)}=${r}\\times ${n}x +${r}\\times ${m}x^2=${r}x(${n}+${m}x).$`
                setReponse(this, i, [`${r}x(${n}+${m}x)`])
              }
              if (N === 'b') {
                texte = ` Factoriser  $${r}a+${r}\\times${n}b$.` //
                texteCorr = `$${r}a+${r}\\times${n}b=${r}(a+${n}b)$`
                setReponse(this, i, [`${r}(${printlatex(`a+(${n})*b`)})`])
              }
              if (N === 'c') {
                texte = ` Factoriser  $x\\times ${n}x+x\\times ${m}$.` //
                texteCorr = `$x\\times ${n}x+x\\times ${m}=x(${n}x+${m})$`
                setReponse(this, i, [`x(${n}x+${m})`])
              }
              if (N === 'd') {
                texte = ` Factoriser  $x^2-${a * a}$.` //
                texteCorr = `$x^2-${a * a}=x^2-${a}^2=(x-${a})(x+${a})$`
                setReponse(this, i, [`(x-${a})(x+${a})`, `(x+${a})(x-${a})`])
              }
              if (N === 'e') {
                texte = ` Factoriser  $${b * b}x^2-${a * a}$.` //
                texteCorr = `$${b * b}x^2-${a * a}=(${b}x)^2-${a}^2=(${b}x-${a})(${b}x+${a})$`
                setReponse(this, i, [`(${b}x-${a})(${b}x+${a})`, `(${b}x+${a})(${b}x-${a})`])
              }
              break

            case 3:// équations

              N = choice(['a', 'b'])
              b = randint(1, 10) // (x+a)(x+b)=0 avec a et b entiers
              d = randint(1, 10, [b])

              if (N === 'a') {
                texte = `Le produit des solutions de l'équation $(x+${b})(x+${d})=0$ vaut : ` //
                texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
                texteCorr += '<br>' + `$(x+${b})(x+${d})=0$`
                texteCorr += '<br> Soit ' + `$x+${b}=0$` + ' ou ' + `$x+${d}=0$`
                texteCorr += '<br> Donc ' + `$x=${0 - b}$` + ' ou ' + `$x=${0 - d}$`
                texteCorr += '<br>Le produit vaut donc :' + `$(${-b})\\times (${-d})=${b * d}$.`
                setReponse(this, i, b * d, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                texte = `Le produit des solutions de l'équation $(x-${b})(x+${d})=0$ vaut : ` //
                texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
                texteCorr += '<br>' + `$(x-${b})(x+${d})=0$`
                texteCorr += '<br> Soit ' + `$x-${b}=0$` + ' ou  ' + `$x+${d}=0$`
                texteCorr += '<br> Donc ' + `$x=${b}$` + ' ou ' + `$x=${0 - d}$`
                texteCorr += '<br>Le produit vaut donc :' + `$${b}\\times (${-d})=${-b * d}$.`
                setReponse(this, i, b * (-d), { formatInteractif: 'calcul' })
              }
              break
          }

          break

        case 'q28':
          switch (choice([1, 2, 3])) { // 1,2,3
            case 1:// conversion m/s en km/h

              a = choice([10, 100, 1000])

              texte = `$${a}$m/s $=.....$ km/h.<br>`

              texteCorr = `$${a}$ m/s $=${texNombrec(a / 1000)}$ km/s $=${3.6 * a}$ km/h `
              setReponse(this, i, 3.6 * a, { formatInteractif: 'calcul' })

              break
            case 2:// distance à partir de vitesse et temps
              b = choice([30, 90])
              a = choice([20, 25, 30, 35, 40, 45, 50, 60])

              texte = `Quelle est la distance (en km) parcourue en $${b}$ min  par un véhicule se déplaçant à $${a}$ km/h ?`
              if (b === 30) {
                texteCorr = `Le véhicule parcourt $${a}$ km en 1 h, donc en $${b}$ minutes, il parcourt $0,5\\times ${a}$ km, soit $${texNombrec(a / 2)}$ km.`
                setReponse(this, i, a / 2, { formatInteractif: 'calcul' })
              } else {
                texteCorr = `Le véhicule parcourt $${a}$ km en 1 h, donc en $${b}$ minutes, il  parcourt $1,5\\times ${a}$ km, soit $${texNombrec(1.5 * a)}$ km.`
                setReponse(this, i, 1.5 * a, { formatInteractif: 'calcul' })
              }
              break
            case 3:// vtesse à partir de distance et temps
              b = choice([10, 15, 30, 45])
              a = randint(2, 5) * 3

              texte = `Si l'on parcourt $${a}$ km en $${b}$ minutes, la vitesse moyenne (en km/h) est de :`
              if (b === 15) {
                texteCorr = `En 1 heure, on parcourt $4$ fois plus de km qu'en 15 min, soit $4\\times ${a}=${4 * a}$ km.<br>
               La vitesse moyenne est donc :  $${4 * a}$ km/h`
                setReponse(this, i, 4 * a, { formatInteractif: 'calcul' })
              } if (b === 30) {
                texteCorr = `En 1 heure, on parcourt $2$ fois plus de km qu'en 30 min, soit $2\\times ${a}=${2 * a}$ km.<br>
               La vitesse moyenne est donc :  $${4 * a}$ km/h`
                setReponse(this, i, 2 * a, { formatInteractif: 'calcul' })
              }
              if (b === 10) {
                texteCorr = `En 1 heure, on parcourt $6$ fois plus de km qu'en 10 min, soit $6\\times ${a}=${6 * a}$ km.<br>
                La vitesse moyenne est donc :  $${6 * a}$ km/h`
                setReponse(this, i, 6 * a, { formatInteractif: 'calcul' })
              }
              if (b === 45) {
                texteCorr = `En 15 min, on parcourt $3$ fois moins de km qu'en 45 min, soit $ ${a}\\div 3=${a / 3}$ km.<br>
              En 1 heure, on parcourt $4$ fois plus de km qu'en $15$ min, soit  $ ${a / 3}\\times 4=${(4 * a) / 3}$ km.<br>
              La vitesse moyenne est donc :  $${4 * a / 3}$ km/h`
                setReponse(this, i, 4 * a / 3, { formatInteractif: 'calcul' })
              }
              break
          }
          break

        case 'q29':// vecteurs
          switch (choice([1, 2, 3, 4])) { //
            case 1:// coordonnées

              xA = randint(0, 5)
              yA = randint(0, 5)
              ux = randint(1, 5)
              uy = randint(1, 5)
              xB = xA + ux

              yB = yA + uy
              texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne les points suivants :'
              texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`
              texte += '<br>Déterminer les coordonnées du vecteur $\\overrightarrow{AB}$ '
              texteCorr = '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère,'
              texteCorr += ' <br>alors on a : $\\overrightarrow{AB}(x_B-x_A  ;y_B-y_A)$<br>'
              texteCorr += ' <br>On applique ici aux données de l\'énoncé :'
              texteCorr += ` $\\overrightarrow{AB}(${xB}-${ecritureParentheseSiNegatif(xA)}  ;${yB}-${ecritureParentheseSiNegatif(yA)})$<br>`
              texteCorr += `Ce qui donne au final : $\\overrightarrow{AB}(${xB - xA}  ;${yB - yA})$<br>`
              setReponse(this, i, [`(${ux};${uy})`])
              break

            case 2:// vecteurs colinéaires1

              p = choice([-2, 2, 3, -3])
              ux = randint(1, 5)
              uy = randint(1, 5)
              vx = p * ux
              vy = p * uy
              texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on a :'
              texte += ` $\\vec{u}\\left(${ux};${uy}\\right)$ et $\\vec{v}\\left(${vx};a\\right)$`
              texte += '<br>Déterminer la valeur de $a$ afin que les vecteurs $\\vec{u}$ et $\\vec{v}$ soient colinéaires. '

              texteCorr = `Les deux vecteurs sont colinéaires, donc il existe un réel $k$ tel que $\\vec{v}=k\\times \\vec{u}$.<br>
              Comme $${vx}=${p}\\times ${ux}$, alors $y_{\\vec{v}}=${p}\\times${uy}$, donc $a=${p * uy}$.`

              setReponse(this, i, vy, { formatInteractif: 'calcul' })
              break

            case 3:// vecteurs colinéaires2

              p = choice([-1.5, -0.5, 1.5, 0.5])
              ux = randint(1, 4) * 2
              uy = randint(1, 4) * 2
              vx = p * ux
              vy = p * uy
              texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on a :'
              texte += ` $\\vec{u}\\left(${ux};${uy}\\right)$ et $\\vec{v}\\left(${vx};a\\right)$`
              texte += '<br>Déterminer la valeur de $a$ afin que les vecteurs $\\vec{u}$ et $\\vec{v}$ soient colinéaires. '

              texteCorr = `Les deux vecteurs sont colinéaires, donc il existe un réel $k$ tel que $\\vec{v}=k\\times \\vec{u}$.<br>
              Comme $${vx}=${texNombrec(p)}\\times ${ux}$, alors $y_{\\vec{v}}=${texNombrec(p)}\\times${uy}$, donc $a=${p * uy}$.`

              setReponse(this, i, vy, { formatInteractif: 'calcul' })
              break
            case 4:// coordonnées 2
              a = randint(-6, 6, [0, 1, -1])
              b = randint(2, 10)

              texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on a :'
              texte += ` $\\vec{u}=${a}(\\vec{i}+${b}\\vec{j})$.`
              texte += '<br>Donner les coordonnées du vecteur $\\vec{u}$ dans le repère $(O,\\vec i,\\vec j)$. '

              texteCorr = `$\\vec{u}=${a}(\\vec{i}+${b}\\vec{j})=${a}\\vec{i}+${ecritureParentheseSiNegatif(a * b)}\\vec{j}$.<br>
              Les coordonnées du vecteur $\\vec{u}$ sont donc $(${a};${a * b})$.`

              setReponse(this, i, [`(${a};${a * b})`])
              break
          }
          break

        case 'q30':
          switch (choice([1, 2, 3, 4, 5, 6, 7, 8])) { //
            case 1:// géométrie Pythagore, trigo
              N = choice(['a', 'b', 'c', 'd'])
              if (N === 'a') {
                A = point(0, 0, 'A', 'below')
                B = point(2, 3, 'B')
                C = point(6, 0.35, 'C', 'below')

                objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(A, B, C))
                objets.push(latexParCoordonnees('4\\text{cm} ', milieu(B, C).x + 0.5 + 0, milieu(B, C).y, 'black', 20, 10, ''),
                  latexParCoordonnees('3 \\text{cm}', milieu(A, B).x - 0.2, milieu(A, B).y + 0.5, 'black', 20, 10, ''))

                texte = `Quel est le périmètre de ce triangle (en cm) ?
                  `
                texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 7, ymax: 4, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` En utilisant le théorème de Pythagore, on a :<br>
               $AB^2+BC^2=AC^2$ soit $AC^2=3^2+4^2$, d'où $AC=5$.
              <br>
              Le périmètre du triangle est donc : $5+4+3=12$ cm`

                setReponse(this, i, '12')
              }
              if (N === 'b') {
                A = point(0, 0, 'A', 'below')
                B = point(2, 3, 'B')
                C = point(6, 0.35, 'C', 'below')

                objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(A, B, C))
                objets.push(latexParCoordonnees('12\\text{cm} ', milieu(B, C).x + 0.5 + 0, milieu(B, C).y, 'black', 20, 10, ''),
                  latexParCoordonnees('15\\text{cm} ', milieu(A, C).x, milieu(A, C).y - 0.5, 'black', 20, 10, ''))

                texte = `L'aire de ce triangle est $54$ cm$^2$.<br>
                  Quel est son périmètre (en cm) ?
                  `
                texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 7, ymax: 4, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` En utilisant le théorème de Pythagore, on a :<br>
               $AB^2+BC^2=AC^2$ soit $AB^2=15^2-12^2$, d'où $AB=9$.
              <br>
              Le périmètre du triangle est donc : $15+12+9=36$ cm`

                setReponse(this, i, '36')
              }
              if (N === 'c') {
                A = point(0, 0, 'A', 'below')
                B = point(2, 3, 'B')
                C = point(6, 0.35, 'C', 'below')
                a = randint(5, 8)
                objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(A, B, C))
                objets.push(latexParCoordonnees(`${a}`, milieu(A, B).x + 0, milieu(B, C).y + 0.25, 'black', 20, 10, ''),
                  latexParCoordonnees('50°', 1.2, 0.5, 'black', 20, 10, ''))

                texte = ` On a $\\tan 50° \\simeq 1,2$.<br>
                Donner une valeur approchée de la longueur $BC$.
                  `
                texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 7, ymax: 4, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` $\\tan 50°=\\dfrac{BC}{AB}=\\dfrac{BC}{${a}}=1,2$.<br>
                Ainsi, $BC=1,2\\times ${a}=${texNombrec(1, 2 * a)}$.
              `

                setReponse(this, i, 1.2 * a, { formatInteractif: 'calcul' })
              }
              if (N === 'd') {
                A = point(0, 0, 'A', 'below')
                B = point(2, 3, 'B')
                C = point(6, 0.35, 'C', 'below')
                a = randint(4, 11)
                objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(A, B, C))
                objets.push(latexParCoordonnees(`${a}`, milieu(A, C).x + 0, milieu(A, C).y - 0.4, 'black', 20, 10, ''),
                  latexParCoordonnees('43°', 4.6, 0.5, 'black', 20, 10, ''))

                texte = ` On a $\\sin 43° \\simeq 0,7$.<br>
                Donner une valeur approchée de la longueur $AB$.
                  `
                texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 7, ymax: 4, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` $\\sin 43°=\\dfrac{AB}{AC}=\\dfrac{AB}{${a}}=0,7$.<br>
                Ainsi, $AB=0,7\\times ${a}=${texNombrec(0.7 * a)}$.
              `

                setReponse(this, i, 0.7 * a, { formatInteractif: 'calcul' })
              }
              break

            case 2:// calculs astucieux

              N = choice(['a', 'b'])

              if (N === 'a') {
                a = randint(3, 9) * 10

                texte = ` $${a - 2}\\times ${a + 2}=$<br>
                  
                  `
                texteCorr = `$${a - 2}\\times ${a + 2}=(${a}-2)(${a}+2)=${a}^2-4=${a * a - 4}$.`
                setReponse(this, i, a * a - 4, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = randint(12, 21)
                c = randint(9, 16)
                b = 2 * c + 1
                texte = ` Donner l'écriture décimale de $\\dfrac{${b}\\times ${a}}{${a * 2}}$.
                    
                    `
                texteCorr = `$\\dfrac{${b}\\times ${a}}{${a * 2}}=\\dfrac{${b}\\times ${a}\\times 5}{2\\times ${a}}=\\dfrac{${b}}{2}=${texNombrec(b / 2)}$`
                setReponse(this, i, b / 2, { formatInteractif: 'calcul' })
              }
              break

            case 3:// vitesse

              texte = ` Si je cours 100 m en 30 s, quelle est ma vitesse en km/h ?
                  
                  `
              texteCorr = `100 m en 30 s, correspond à 200 m en 1 minute, soit $60\\times 200$ m en 1h.<br>
              $60\\times 200$ m $=12000$ m soit $12$ km en 1 h. `
              setReponse(this, i, '12', { formatInteractif: 'calcul' })
              break

            case 4:// rayon cercle circonscrit d'un triangle rectangle
              a = choice([3, 5, 8, 7, 9])

              if (a === 3) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=${a}$ cm, $AC=4$ cm et $BC=5$ cm.<br>
                Donner le rayon (en cm) du cercle circonscrit de ce triangle (résultat sous forme décimale).
                  
                `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (son centre se situe au milieu de l'hypoténuse).<br>
                Donc son rayon vaut $5\\div 2=2,5$ cm`
                setReponse(this, i, '2,5')
              }
              if (a === 5) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=${a}$ cm, $AC=13$ cm et $BC=12$ cm.<br>
                              Donner le rayon (en cm) du cercle circonscrit de ce triangle (résultat sous forme décimale).
                                
                              `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (le plus grand côté).<br>
                              Donc son rayon vaut $13\\div 2=6,5$ cm`
                setReponse(this, i, '6,5')
              }
              if (a === 8) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=17$ cm, $AC=15$ cm et $BC=${a}$ cm.<br>
                                            Donner le rayon (en cm) du cercle circonscrit de ce triangle (résultat sous forme décimale).
                                              
                                            `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (le plus grand côté).<br>
                                            Donc son rayon vaut $17\\div 2=8,5$ cm`
                setReponse(this, i, '8,5')
              }
              if (a === 7) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=24$ cm, $AC=${a}$ cm et $BC=25$ cm.<br>
                                                          Donner le rayon (en cm) du cercle circonscrit de ce triangle (résultat sous forme décimale).
                                                            
                                                          `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (le plus grand côté).<br>
                                                          Donc son rayon vaut $25\\div 2=12,5$ cm`
                setReponse(this, i, '12,5')
              }
              if (a === 8) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=17$ cm, $AC=15$ cm et $BC=${a}$ cm.<br>
                                                                        Donner le rayon (en cm) du cercle circonscrit de ce triangle.
                                                                          
                                                                        `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (le plus grand côté).<br>
                                                                        Donc son rayon vaut $17\\div 2=8,5$ cm`
                setReponse(this, i, '8,5')
              }
              if (a === 9) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=40$ cm, $AC=41$ cm et $BC=25$ cm.<br>
                                                                                      Donner le rayon (en cm) du cercle circonscrit de ce triangle.
                                                                                        
                                                                                      `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (le plus grand côté).<br>
                                                                                      Donc son rayon vaut $41\\div 2=20,5$ cm`
                setReponse(this, i, '20,5')
              }
              break
            case 5:// aire/périmètres
              a = choice([2, 3, 5])
              b = choice([4, 8, 16])
              texte = ` Quelle est l'aire (en cm$^2$) d'un carré de périmètre $${b}\\sqrt{${a}}$.
                  
                  `
              texteCorr = `Le côté du carré mesure $\\dfrac{${b}\\sqrt{${a}}}{4}$, 
              soit $${texFractionReduite(b, 4)}\\sqrt{${a}}$.<br>
              Son aire est donc : $(${texFractionReduite(b, 4)}\\sqrt{${a}})^2=${texFractionReduite(b * b * a, 16)}$ cm$^2$.

               `
              setReponse(this, i, (b * b * a) / 16, { formatInteractif: 'calcul' })
              break

            case 6:// inéquations
              N = choice(['a', 'b'])
              if (N === 'a') {
                a = randint(1, 30) * 10

                texte = ` Déterminer la plus petite valeur de $n$ vérifiant $2^n>${a}$.
                                    `
                let n = 0
                while (2 ** n < a) { n++ }
                texteCorr = `La plus valeur de $n$ est $${n}$ car $2^{${n}}=${2 ** n}>${a}$ et $2^{${n - 1}}=${2 ** (n - 1)}<${a}$.
               `
                setReponse(this, i, n, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = randint(1, 10) * 10

                texte = ` Déterminer la plus petite valeur de $n$ vérifiant $3^n>${a}$.
                                      `
                let n = 0
                while (3 ** n < a) { n++ }
                texteCorr = `La plus valeur de $n$ est $${n}$ car $3^{${n}}=${3 ** n}>${a}$ et $3^{${n - 1}}=${3 ** (n - 1)}<${a}$.
                 `
                setReponse(this, i, n, { formatInteractif: 'calcul' })
              }
              break
            case 7:// probabilités
              a = randint(2, 4)
              b = choice([2, 3])
              c = randint(2, 12)
              p = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
              switch (choice(['a', 'b', 'c', 'd'])) {
                case 'a':
                  texte = "On lance deux fois de suite un dé équilibré.<br>Quelle est la probabilité d’obtenir deux fois le même nombre ?<br>Donner le résultat sous la forme d'une fraction irréductible."
                  texteCorr = "Sur 36 cas possibles équiprobables, il y en a 6 qui sont des doubles. Donc la probabilité d'obtenir deux fois le même nombre est $\\dfrac{6}{36}=\\dfrac{1}{6}$."
                  setReponse(this, i, fraction(1, 6), { formatInteractif: 'fraction' })
                  break
                case 'b':
                  texte = `Si on lance une pièce $${a}$ fois de suite, quelle est la probabilité d'obtenir PILE $${a}$ fois ?<br>Donner le résultat sous la forme d'une fraction irréductible.`
                  texteCorr = `A chaque lancer, la probabilité d'obtenir PILE est $\\dfrac{1}{2}$, donc si on lance $${a}$ fois la pièce, la probabilité d'obtenir $${a}$ fois PILE est $\\left(\\dfrac{1}{2}\\right)^${a}=\\dfrac{1}{${2 ** a}}$.`
                  setReponse(this, i, fraction(1, 2 ** a), { formatInteractif: 'fraction' })
                  break
                case 'c':
                  texte = `On lance un dé cubique équilibré.<br>Quelle est la probabilité d’obtenir un multiple de $${b}$ ?<br>Donner le résultat sous la forme d'une fraction irréductible.`
                  texteCorr = `Comme il y a $${5 - b}$ multiples de $${b}$, la probabilité d'ibtenir un multiple de $${b}$ est $\\dfrac{${5 - b}}{6}=\\dfrac{1}{${b}}$.`
                  setReponse(this, i, fraction(1, b), { formatInteractif: 'fraction' })
                  break
                case 'd':
                  texte = `On lance deux dés cubiques équilibrés.<br>Quelle est la probabilité d’obtenir un total de $${c}$ ?<br>Donner le résultat sous la forme d'une fraction irréductible.`
                  texteCorr = `Sur 36 cas possibles équiprobables, il y en a $${p[c - 2]}$ qui donnent une somme de $${c}$. Donc la probabilité d'obtenir un total de $${c}$ est $\\dfrac{${p[c - 2]}}{36}${simplificationDeFractionAvecEtapes(p[c - 2], 36)}$.`
                  setReponse(this, i, fraction(p[c - 2], 36).simplifie(), { formatInteractif: 'fraction' })
                  break
              }
              break

            case 8:// nbre de solution d'une équation (existe en question simple can2L01)
              a = randint(1, 9)
              b = randint(1, 9)
              texte = ` Combien de solutions réelles possède l'équation $-x^2+${a}=${b}$ ?<br>
              
                                   `
              if (a - b > 0) {
                texteCorr = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
              $${a - b}$ étant strictement positif, cette équation a deux solutions : $${texRacineCarree(a - b)}$ et  $-${texRacineCarree(a - b)}$.
               `
                setReponse(this, i, '2')
              }

              if (a - b === 0) {
                texteCorr = `L'équation est équivalente à$-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
              cette équation a une seul solution réelle : 0.

               `
                setReponse(this, i, '1')
              }
              if (a - b < 0) {
                texteCorr = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
             Cette équation n'a pas de solution réelle car $${a - b}<0$.
               `
                setReponse(this, i, '0')
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
  `1 : produit d'entiers\n
  2 : somme ou différence d'entiers\n
  3 : Tiers, moitié, proportions d'une quantité\n
  4 : Conversion heures, minutes .... ou changements d'unités\n
  5 : Calculs avec des fractions simples <-> écriture décimale\n
  6 : pourcentage simple\n
  7 : *10, 100 0,1...ou division\n
  8 : droite graduée,encadrement, arrondi, position des chiffres\n
  9 : petits problèmes avec division euclidienne, partage, de plus, de moins, rendu de monnaie......\n
  10 : fraction simplification ou calcul avec racines carrées\n
  11 :  proportionnalité\n
  12 : problème avec des fractions ou calcul numérique\n
  13 : coefficient directeur calcul et lecture graphique\n
  14 : calcul littéral1, équation (pas id remarquables)\n
  15 : Périmètre/aires, agrandissement/réduction\n
  16 : calculs astucieux, calculs avec parenthèses, puissances (1)\n
  17 :pourcentage 1 (évolution, proportion,....)\n
  18 : probabilité, denombrement\n
  19 : Milieu/distance\n
  20 : triangle (pythagore, thalès, angles, trigo ...)\n
  21 :  image/antécédents par une fonction\n
  22 :Droites\n
  23 : arithmétique, calculs (y compris astucieux) ,  racines carrées, programme de calcul, puissances (\n
  24 : statistiques\n
  25 :  inéquation, inégalités, intervalles, signes\n
  26 : fonction (calcul, VI)x\n
  27 : Calcul littéral2 (avec id) , équations\n
  28 : Problèmes avec vitesse, heures, conversions....\n
  29 : vecteurs\n
  30 : "question surprise", Questions diverses`]
}
