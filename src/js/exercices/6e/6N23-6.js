import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import Operation from '../../modules/operations.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombre, arrondi, nombreDeChiffresDansLaPartieEntiere, nombreDeChiffresDansLaPartieDecimale, texFraction } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const amcReady = true // Jusqu'à l'adaptation à la version 2.6
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum' // Question numérique
export const titre = 'Calculer la valeur décimale d\'une fraction'
export const dateDePublication = '18/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Calculer la valeur décimale des fractions suivantes.
 *
 * Niveau de difficulté 1 :
 * * entier divisé par 4 quotient : xx,25 ou xx,75
 * * entier divisé par 8 quotient : x,125 ou x,375 ou x,625 ou x,875
 * * entier divisé par 6 quotient : xxx,5
 * * quotient xx,xx division par 2, 3 , 4 ou 5
 * * quotient x,xxx division par 6 à 9
 * * un 0 dans le quotient
 *
 * Niveau de difficulté 2 : division par 3, 7 ou 9
 * @author Mireille Gain, s'inspirant de 6C31
 * Référence 6N23-6
 */
export const uuid = 'd5e44'
export const ref = '6N23-6'
export default function DivisionFraction () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calculer la valeur décimale des fractions suivantes.'
  this.spacing = 2
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1) // Important sinon opdiv n'est pas joli
  this.nbQuestions = 4
  this.sup = 1
  this.listePackages = 'xlop'

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestionsDisponibles

    parseInt(this.sup) === 1
      ? (typesDeQuestionsDisponibles = [choice([1, 2, 3]), 4, 5])
      : (typesDeQuestionsDisponibles = [7, 8, 9])
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let typesDeQuestions
    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, q;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 1: // fraction : entier divisé par 4 quotient : xx,25 ou xx,75
          b = 4
          a = (randint(2, 9) * 10 + randint(2, 9)) * 4 + choice([1, 3])
          q = calcul(a / b)
          break
        case 2: // fraction : entier divisé par 8 quotient : x,125 ou x,375 ou x,625 ou x,875
          b = 8
          a = randint(2, 9) * 8 + choice([1, 3, 5, 7])
          q = calcul(a / b)
          break
        case 3: // fraction : entier divisé par 6 quotient : xxx,5
          b = 6
          q = calcul(
            randint(2, 9) * 100 + randint(2, 9) * 10 + randint(2, 9) + 0.5
          )
          a = q * 6
          break
        case 4: // fraction : entier divisé par 2
          b = 2
          a = randint(3, 50) * 2 + 1
          q = calcul(a / b)
          break
        case 5: // fraction : entier divisé par 5
          b = 5
          a = randint(3, 50) * 2 + 1
          q = calcul(a / b)
          break
        case 7: // dénominateur = 7
          a = randint(2, 9) * 7 + randint(1, 6)
          b = 7
          q = arrondi(a / b, 3)
          break
        case 8: // dénominateur = 9
          a = calcul((randint(11, 19) * 9) + randint(1, 8))
          b = 9
          q = arrondi(a / b, 3)
          break
        case 9: // dénominateur = 3
          a = calcul((randint(11, 99) * 3) + randint(1, 2))
          b = 3
          q = arrondi(a / b, 3)
      }
      if (this.sup === 2) {
        this.consigne =
          'Calculer une valeur approchée au centième près des fractions suivantes.'
      }
      texte = `$${texFraction(texNombre(a), texNombre(b))}$`
      if (this.sup === 1) {
        texteCorr = Operation({ operande1: a, operande2: b, type: 'division', precision: 3 })
        texteCorr += `<br>$${texFraction(texNombre(a), texNombre(b))}=${texNombre(q)}$`
      } else {
        texteCorr = Operation({ operande1: a, operande2: b, type: 'division', precision: 3 })
        texteCorr += `<br>$${texFraction(texNombre(a), texNombre(b))}\\approx${texNombre(q, 2)}$`
      }
      setReponse(this, i, q)
      if (context.isHtml && this.interactif) texte += '$~=$' + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
        this.autoCorrection[i].propositions = [{ texte: texteCorr, statut: '' }]
        this.autoCorrection[i].reponse.param = { digits: nombreDeChiffresDansLaPartieEntiere(q) + nombreDeChiffresDansLaPartieDecimale(q) + 2, decimals: nombreDeChiffresDansLaPartieDecimale(q) + 1, signe: false, exposantNbChiffres: 0 }
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
  this.besoinFormulaireNumerique = [
    'Type de questions',
    2,
    '1 : Déterminer le quotient exact\n2 : Déterminer un quotient approché au centième près'
  ]
}
