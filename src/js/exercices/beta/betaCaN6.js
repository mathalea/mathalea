import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'// eslint-disable-next-line camelcase
import { listeQuestionsToContenu, combinaisonListes, randint, calcul, pgcd, texNombrec, choice, texNombre } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import Fraction from '../../modules/Fraction.js'
export const titre = 'Course aux nombres 6e'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 4
/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function CourseAuxNombres6e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 20
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.amcReady = amcReady
  this.amcType = amcType

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let a, b, c, d, resultat
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
      'q20' // Proportionnalité simple
    ] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'q1':
          a = randint(1, 25)
          texte = `Le double d'un nombre vaut ${2 * a}, combien vaut sa moitié ?`
          texteCorr = `Le nombre est ${a}, sam moitié est ${calcul(a / 2)}.`
          setReponse(this, i, calcul(a / 2), { formatInteractif: 'calcul' })
          break
        case 'q2':
          a = randint(2, 25)
          b = randint(2, 25, a)
          a = calcul(a / pgcd(a, b))
          b = calcul(b / pgcd(a, b))
          c = new Fraction(a, b)
          resultat = calcul(a / b)
          texte = `Quel est le nombre qui, multiplié par ${b} donne ${a} ?`
          texteCorr = `c'est $${c.texFraction}$ car $${c.texFraction}\\times ${b} = ${a}$`
          if (!c.valeurDecimale) {
            setReponse(this, i, c.texFraction, { formatInteractif: 'calcul' })
          } else {
            setReponse(this, i, c.texFraction, { formatInteractif: 'calcul' })
          }
          setReponse(this, i, [c.texFraction, resultat, `${Math.floor(a / b)}+\\dfrac{${a % b}}{${b}}`], { formatInteractif: 'calcul' })
          break
        case 'q3':
          a = randint(1, 9)
          b = randint(1, 9, a)
          c = randint(3, 7) * 10
          d = randint(10, 15) * 10 - c
          resultat = calcul(2 * (c + d))
          texte = `$${c - a} + ${d + b} + ${c + a} + ${d - b}$`
          texteCorr = `$${2 * c} + ${2 * d}= ${2 * (c + d)}$`
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
          a = randint(1, 3)
          b = randint(1, 9, a)
          c = calcul(a * 10 + b)
          if (choice([true, false])) {
            resultat = calcul(3 * c)
            texte = `Quel est le triple de $${c}$ ?`
            texteCorr = `Le triple de $${c}$ est $3 \\times ${c}=${calcul(3 * c)}$.`
            setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          } else {
            resultat = calcul(2 * c)
            texte = `Quel est le double de $${c}$ ?`
            texteCorr = `Le double de $${c}$ est $2 \\times ${c}=${calcul(2 * c)}$.`
            setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          }
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
            setReponse(this, i, texNombre(resultat), { formatInteractif: 'calcul' })
          } else {
            resultat = calcul(2 * c)
            texte = `Quel est le double de $${texNombre(c)}$ ?`
            texteCorr = `Le double de $${texNombre(c)}$ est $2 \\times ${texNombre(c)}=${texNombrec(2 * c)}$.`
            setReponse(this, i, texNombre(resultat), { formatInteractif: 'calcul' })
          }
          break
        case 'q7':
          a = randint(1, 3)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          resultat = calcul(a * 1000 + b * 10 + c * 100)
          texte = `$${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100$`
          texteCorr = `$${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100 =${texNombre(d)}$`
          setReponse(this, i, texNombre(resultat), { formatInteractif: 'calcul' })
          break
        case 'q8':
          a = randint(5, 9)
          b = randint(5, 9)
          resultat = a * b
          texte = `$${a} \\times ${b}$`
          texteCorr = `$${a} \\times ${b}=${a * b}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q9':
          a = randint(5, 9)
          b = randint(2, 8)
          c = randint(1, 3)
          resultat = calcul(a * 10 + b - c * 10 - 9)
          texte = `$${a * 10 + b} - ${c * 10 + 9}$`
          texteCorr = `$${a * 10 + b} - ${c * 10 + 9}=${a * 10 + b}-${(c + 1) * 10} + 1 = ${d}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
          break
        case 'q10':
          a = randint(5, 15)

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
        case 'q11':
          a = randint(20, 70)
          b = randint(20, 70, a)
          resultat = a * 100 + b
          texte = `$${a}$ centaines et $${b}$ unités = ?`
          texteCorr = `$${a} \\times 100 + ${b} = ${a * 100 + b}$`
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
          texte = `Convertir $${d}$ minutes en heures(h) et minutes(min) :`
          texteCorr = `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ minutes = ${a}h ${b}min`
          setReponse(this, i, `${a}h ${b}min`)
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
          a = randint(11, 24) * 2
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
          texteCorr = `$${texNombrec(c / 100 * b)} \\times 2 = ${resultat}$`
          setReponse(this, i, resultat, { formatInteractif: 'calcul' })
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
