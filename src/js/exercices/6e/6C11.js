import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texNombre } from '../../modules/outils.js'
import Operation from '../../modules/operations.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Poser divisions euclidiennes'

/**
 * Poser et effectuer les divisions euclidiennes suivantes puis donner l'égalité fondamentale correspondante.
 *
 * Niveau de difficulté 2 :
 * * division par 2, 3 , 4 ou 5
 *
 * Niveau de difficulté 2 :
 * * division par 2, 3 , 4 ou 5
 * * division par 6 à 9
 * * un 0 dans le quotient
 *
 * Niveau de difficulté 3 :
 * * division par 11, 12, 15, 25
 * * division par 13,14,21,22,23 ou 24 et un 0 dans le quotient
 * * division par un multiple de 10 et un 0 dans le quotient
 * @author Rémi Angot
 * Référence 6C11
 */
export const uuid = '2da81'
export const ref = '6C11'
export default function DivisionsEuclidiennes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 2
  this.titre = titre
  this.spacing = 2
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1) // Important sinon opidiv n'est pas joli
  this.nbQuestions = 4
  this.listePackages = 'xlop'

  this.nouvelleVersion = function () {
    this.consigne = 'Poser et effectuer '
    this.consigne += this.nbQuestions === 1 ? 'la division euclidienne suivante ' : 'les divisions euclidiennes suivantes '
    this.consigne += "puis donner l'égalité fondamentale correspondante."
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles, typesDeQuestions
    if (this.sup === 1) typesDeQuestionsDisponibles = [1, 1, 1, 1]
    else if (this.sup === 2) typesDeQuestionsDisponibles = [1, 2, 2, 3]
    else if (this.sup === 3) typesDeQuestionsDisponibles = [4, 4, 5, 6]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (
      let i = 0, texte = '', texteCorr = '', cpt = 0, a, b, q, r;
      i < this.nbQuestions && cpt < 50;

    ) {
      // La ligne suivante ne doit pas être mise après les setReponses car sinon elle les efface
      this.autoCorrection[i] = { enonce: texte, propositions: [{ texte: texteCorr, statut: 4, feedback: '' }] }
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 1: // division par 2, 3 , 4 ou 5
          q = randint(2, 5) * 100 + randint(2, 5) * 10 + randint(2, 5)
          b = randint(2, 5)
          break
        case 2: // division par 6 à 9
          q = randint(5, 9) * 100 + randint(2, 5) * 10 + randint(5, 9)
          b = randint(6, 9)
          break
        case 3: // un 0 dans le quotient
          if (randint(1, 2) === 1) {
            q = randint(2, 9) * 1000 + randint(2, 9) * 100 + randint(2, 9)
          } else {
            q = randint(2, 9) * 1000 + randint(2, 9) * 10 + randint(2, 9)
          }
          b = randint(7, 9)
          break
        case 4: // division par 11, 12, 15, 25
          q = randint(1, 5) * 100 + randint(1, 5) * 10 + randint(1, 5)
          b = choice([11, 12, 15, 25])
          break
        case 5: // division par 13,14,21,22,23 ou 24 et un 0 dans le quotient
          q = randint(1, 5) * 1000 + randint(6, 9) * 100 + randint(1, 5)
          b = choice([11, 12, 13, 14, 21, 22, 23, 24])
          break
        case 6: // division par un multiple de 10 et un 0 dans le quotient
          q = randint(6, 9) * 1000 + randint(6, 9) * 10 + randint(1, 5)
          b = randint(2, 9) * 10
          break
      }
      r = randint(0, b - 1) // reste inférieur au diviseur
      a = b * q + r
      texte = `$${texNombre(a)}\\div${b}$`
      if (r === 0) {
        texteCorr = Operation({ operande1: a, operande2: b, type: 'divisionE' }) + `$${texNombre(a)}\\div${b}=${texNombre(q)}$`
        setReponse(this, i, [`${a}=${b}\\times ${q}`, `${a}=${q}\\times ${b}`,
        `${b}\\times ${q}`, `${q}\\times ${b}=${a}`])
      } else {
        texteCorr = Operation({ operande1: a, operande2: b, type: 'divisionE' }) + `$${texNombre(a)}=${b}\\times${texNombre(q)}+${r}$`
        setReponse(this, i, [`${a}=${b}\\times ${q}+${r}`, `${a}=${q}\\times ${b}+${r}`,
        `${b}\\times ${q}+${r}=${a}`, `${q}\\times ${b}+${r}=${a}`])
      }
      texte += ajouteChampTexteMathLive(this, i)
      // Pour AMC question AmcOpen
      if (context.isAmc) {
        this.autoCorrection[i].enonce = 'Poser et effectuer la division euclidienne suivante puis donner l\'égalité fondamentale correspondante.<br>' + texte
        this.autoCorrection[i].propositions[0].texte = texteCorr
        this.autoCorrection[i].propositions[0].sanscadre = false
        this.autoCorrection[i].propositions[0].statut = 3
        this.autoCorrection[i].propositions[0].pointilles = false
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Divisions par 2, 3, 4 ou 5\n2 : Diviseur à 1 chiffre\n3 : Diviseur à 2 chiffres'
  ]
}
