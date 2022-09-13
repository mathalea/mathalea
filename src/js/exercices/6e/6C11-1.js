import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre, texteGras, texteEnCouleurEtGras, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = "Déterminer reste et quotient d'une division euclidienne à partir d'une égalité"

export const amcReady = true
export const amcType = 'AMCOpenNum✖︎2' // type de question AMC
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Détermination du reste et quotient à partir de l'égalité découlant de la division euclidienne
 *
 * @author Cédric GROLLEAU
 * Référence 6C11-1
 * Relecture : Novembre 2021 par EE
 */
export const uuid = '37267'
export const ref = '6C11-1'
export default function DivisionsEuclidiennesEgalite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigneCorrection = texteGras('Pour la division euclidienne de a par b, on cherche les nombres q et r tels que  a = b × q + r avec r < b')
  this.spacing = 2
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1) // Important sinon opidiv n'est pas joli
  this.nbQuestions = 4
  this.sup = 1

  this.nouvelleVersion = function () {
    this.consigne = 'Répondre  '
    this.consigne += this.nbQuestions === 1 ? 'à la question suivante' : 'aux questions suivantes'
    this.consigne = ' sans poser la division.'
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles, typesDeQuestions
    if (parseInt(this.sup) === 1) {
      typesDeQuestionsDisponibles = [1, 2, 2]
    } else if (parseInt(this.sup) === 2) {
      typesDeQuestionsDisponibles = [1, 2, 3, 4]
    }
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, q, r;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      q = randint(7, 75)
      b = randint(3, 25)
      r = typesDeQuestions === 1 ? 0 : randint(1, b - 1)
      a = b * q + r
      texte = `Utilise l'égalité suivante pour donner le quotient et le reste de la division euclidienne de $ ${texNombre(a)} $ par $ ${b} $.<br>`
      switch (typesDeQuestions) {
        case 1: // égalité "directe"
          texte += `$ ${texNombre(a)} = ${b} \\times ${q} $<br>`
          texteCorr = `L'égalité $ ${texNombre(a)} = ${b} \\times ${q} $ correspond bien à l'expression de la division euclidienne de $ ${texNombre(a)} $ par $ ${b} $. <br> Le quotient est ${texteEnCouleurEtGras(q)} et le reste est ${texteEnCouleurEtGras(0)}.`
          break
        case 2: // égalité "directe"
          texte += `$ ${texNombre(a)} = ${b} \\times ${q} + ${r} $<br>`
          texteCorr = `${r} est inférieur à ${b}, l'égalité $ ${texNombre(a)} = ${b} \\times ${q} + ${r} $ correspond bien à l'expression de la division euclidienne de $ ${texNombre(a)} $ par ${b}. <br> On a donc : ${texteEnCouleurEtGras(q)} le quotient et ${texteEnCouleurEtGras(r)} le reste.`
          break
        case 3:
          texte += `$ ${texNombre(a)} = ${b} \\times ${q - 1} + ${r + b} $<br>`
          texteCorr = `${r + b} est supérieur à ${b}. ${r + b} n'est donc pas le reste. <br> L'égalité $ ${texNombre(a)} = ${b} \\times ${q - 1} + ${r + b} $ ne traduit pas directement la division euclidienne de $ ${texNombre(a)} $ par ${b}. <br>
            Transformons cette égalité en utilisant le fait que $ ${r + b} = ${r} + ${b} $.<br>
            $ ${texNombre(a)} = ${b} \\times ${q - 1} + ${r + b} = ${b} \\times ${q - 1} + ${b} + ${r} = ${b} \\times ${q} + ${r} $ <br>
            Ainsi, $ ${texNombre(a)} = ${b} \\times ${q} + ${r} $.
            <br> On a donc : ${texteEnCouleurEtGras(q)} le quotient et ${texteEnCouleurEtGras(r)} le reste.`
          break
        case 4:
          texte += `$ ${texNombre(a)} = ${b} \\times ${q + 1} - ${b - r} $<br>`
          texteCorr = `L'égalité $ ${texNombre(a)} = ${b} \\times ${q + 1} - ${b - r} $ ne traduit pas directement la division euclidienne de $ ${texNombre(a)} $ par ${b}.  <br>
          Transformons cette égalité : <br>
          Dans cette égalité, on a pris ${q + 1} fois ${b} et on dépasse $ ${texNombre(a)} $. Cela veut dire qu'on a pris ${b} trop de fois.<br>
          Prenons-le une fois de moins, on va donc avoir ${q} fois ${b} : <br> 
          $ ${texNombre(a)} = ${b} \\times ${q + 1} - ${b - r} = ${b} \\times ${q} + ${b} - ${b - r} = ${b} \\times ${q} + ${r} $ <br>
          Ainsi, $ ${texNombre(a)} = ${b} \\times ${q} + ${r} $.
          <br> On a donc : ${texteEnCouleurEtGras(q)} le quotient et ${texteEnCouleurEtGras(r)} le reste.`
          break
      }
      if (this.questionJamaisPosee(this, i, a, b, q, r)) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (!context.isAmc) {
          texte += (this.interactif ? '<br>' : '') + ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texte: 'Quotient : ', texteApres: sp(5) })
          texte += (this.interactif ? '<br>' : '') + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texte: ' Reste : ' })
          setReponse(this, 2 * i, q)
          setReponse(this, 2 * i + 1, r)
        } else {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [{ texte: texteCorr, statut: 2, feedback: '' }],
            reponse: {
              texte: 'Quotient',
              valeur: q,
              param: {
                digits: 2,
                decimals: 0,
                signe: false,
                exposantNbChiffres: 0,
                approx: 0
              }
            },
            reponse2: {
              texte: 'Reste',
              valeur: r,
              param: {
                digits: 2,
                decimals: 0,
                signe: false,
                exposantNbChiffres: 0,
                approx: 0
              }
            }
          }
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        // Pour AMC question AmcOpen
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    2,
    "1 : L'égalité correspond à la division euclidienne.\n2 : L'égalité ne correspond pas nécessairement à la division euclidienne."
  ]
}
