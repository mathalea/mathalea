import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'// eslint-disable-next-line camelcase
import { listeQuestionsToContenu, combinaisonListes, randint, calcul, pgcd, texNombrec, choice, texNombre } from '../../modules/outils.js'
import { ajouteChampTexte, ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
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
  this.nbQuestions = 15
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
    let a, b, c, d
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
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 'q2':
          a = randint(2, 25)
          b = randint(2, 25, a)
          a = calcul(a / pgcd(a, b))
          b = calcul(b / pgcd(a, b))
          c = new Fraction(a, b)
          texte = `Quel est le nombre qui, multiplié par ${b} donne ${a} ?`
          texteCorr = `c'est $${c.texFraction}$ car $${c.texFraction}\\times ${b} = ${a}$`
          if (!c.valeurDecimale) {
            setReponse(this, i, c.texFraction, { formatInteractif: 'calcul' })
          } else {
            setReponse(this, i, c.texFraction, { formatInteractif: 'calcul' })
          }
          setReponse(this, i, [c.texFraction, calcul(a / b), `${Math.floor(a / b)}+\\dfrac{${a % b}}{${b}}`], { formatInteractif: 'calcul' })
          texte += ajouteChampTexteMathLive(this, i)

          break
        case 'q3':
          a = randint(1, 9)
          b = randint(1, 9, a)
          c = randint(3, 7) * 10
          d = randint(10, 15) * 10 - c
          texte = `$${c - a} + ${d + b} + ${c + a} + ${d - b}$`
          texteCorr = `$${2 * c} + ${2 * d}= ${2 * (c + d)}$`
          setReponse(this, i, calcul(2 * (c + d)), { formatInteractif: 'calcul' })
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 'q4':
          a = randint(1, 9)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          d = randint(1, 9, [a, b, c])
          texte = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}$`
          texteCorr = `$${texNombrec(a + b * 0.1 + c * 0.01)}+${texNombrec(10 - a + d * 0.1)}=${texNombrec(10 + (b + d) * 0.1 + c * 0.01)}$`
          setReponse(this, i, calcul(10 + (b + d) * 0.1 + c * 0.01), { formatInteractif: 'calcul' })
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 'q5':
          a = randint(1, 3)
          b = randint(1, 9, a)
          c = calcul(a * 10 + b)
          if (choice([true, false])) {
            texte = `Quel est le triple de $${c}$ ?`
            texteCorr = `Le triple de $${c}$ est $3 \\times ${c}=${calcul(3 * c)}$.`
            setReponse(this, i, calcul(3 * c), { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, i)
          } else {
            texte = `Quel est le double de $${c}$ ?`
            texteCorr = `Le double de $${c}$ est $2 \\times ${c}=${calcul(2 * c)}$.`
            setReponse(this, i, calcul(2 * c), { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, i)
          }
          break
        case 'q6':
          a = randint(1, 3)
          b = randint(1, 9, a)
          d = randint(1, 9)
          c = calcul(a * 10 + b + d * 0.1)
          if (choice([true, false])) {
            texte = `Quel est le triple de $${texNombre(c)}$ ?`
            texteCorr = `Le triple de $${texNombre(c)}$ est $3 \\times ${texNombre(c)}=${texNombrec(3 * c)}$.`
            setReponse(this, i, texNombrec(3 * c), { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, i)
          } else {
            texte = `Quel est le double de $${texNombre(c)}$ ?`
            texteCorr = `Le double de $${texNombre(c)}$ est $2 \\times ${texNombre(c)}=${texNombrec(2 * c)}$.`
            setReponse(this, i, texNombrec(2 * c), { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, i)
          }
          break
        case 'q7':
          a = randint(1, 3)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          d = calcul(a * 1000 + b * 10 + c * 100)
          texte = `$${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100$`
          texteCorr = `$${texNombre(a)}\\times 1000 + ${texNombre(b)}\\times 10 + ${texNombre(c)}\\times 100 =${texNombre(d)}$`
          setReponse(this, i, texNombre(d), { formatInteractif: 'calcul' })
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 'q8':
          a = randint(5, 9)
          b = randint(5, 9)
          texte = `$${a} \\times ${b}$`
          texteCorr = `$${a} \\times ${b}=${a * b}$`
          setReponse(this, i, a * b, { formatInteractif: 'calcul' })
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 'q9':
          a = randint(5, 9)
          b = randint(2, 8)
          c = randint(1, 3)
          d = calcul(a * 10 + b - c * 10 - 9)
          texte = `$${a * 10 + b} - ${c * 10 + 9}$`
          texteCorr = `$${a * 10 + b} - ${c * 10 + 9}=${a * 10 + b}-${(c + 1) * 10} + 1 = ${d}$`
          setReponse(this, i, d, { formatInteractif: 'calcul' })
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 'q10':
          a = randint(5, 15)

          if (choice([true, false])) {
            b = a * 8
            texte = `Quel est le quart de $${b}$ ?`
            texteCorr = `Le quart de $${b}$ est $${a * 2}.$`
            setReponse(this, i, a * 2, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, i)
          } else {
            b = a * 6
            texte = `Quel est le tiers de $${b}$ ?`
            texteCorr = `Le tiers de $${b}$ est $${a * 2}.$`
            setReponse(this, i, a * 2, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, i)
          }
          break
        case 'q11':
          a = randint(20, 70)
          b = randint(20, 70, a)
          c = randint(1, 3)
          d = calcul(a * 10 + b - c * 10 - 9)
          texte = `$${a}$ centaines et $${b}$ unités = ?$`
          texteCorr = `$${a} \\times 100 + ${b} = ${a * 100 + b}$`
          setReponse(this, i, a * 100 + b, { formatInteractif: 'calcul' })
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 'q12':
          a = randint(20, 70)
          b = randint(20, 70, a)
          c = randint(1, 3)
          d = calcul(a * 10 + b - c * 10 - 9)
          texte = `$${a}$ centaines et $${b}$ dizaines = ?`
          texteCorr = `$${a} \\times 100 + ${b} \\times 10 = ${a * 100 + b * 10}$`
          setReponse(this, i, a * 100 + b * 10, { formatInteractif: 'calcul' })
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 'q13':
          a = randint(2, 4)
          b = randint(10, 59)
          d = calcul(a * 60 + b)
          texte = `Convertir $${d}$ minutes en heures(h) et minutes(min) :`
          texteCorr = `$${d} = ${a} \\times 60 + ${b}$ donc $${d}$ minutes = ${a}h ${b}min`
          setReponse(this, i, `${a}h ${b}min`)
          texte += ajouteChampTexte(this, i)
          break
        case 'q14':
          b = randint(1, 9)
          c = randint(0, 9)
          d = randint(0, 9, [b, c])
          a = calcul(b * 100 + c * 10 + d)
          texte = `Quel est le reste de la division de $${a}$ par $3$ ?`
          texteCorr = `Le reste de la division de $${a}$ par $3$ est ${a % 3}`
          setReponse(this, i, a % 3, { formatInteractif: 'calcul' })
          texte += ajouteChampTexte(this, i)
          break
        case 'q15':
          b = randint(5, 9)
          a = calcul(b * 90 + 9)
          c = b * 10 + 1
          texte = `$${a}\\div 9$`
          texteCorr = `$${a}\\div 9 = ${c}$`
          setReponse(this, i, c, { formatInteractif: 'calcul' })
          texte += ajouteChampTexte(this, i)
          break
      }
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
