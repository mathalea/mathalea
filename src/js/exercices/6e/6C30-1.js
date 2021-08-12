import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombrec, texNombre, miseEnEvidence, texFraction, nombreDeChiffresDansLaPartieEntiere, nombreDeChiffresDansLaPartieDecimale } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
export const amcReady = true
export const amcType = 'AMCNum' // Question numérique
export const interactifReady = true
export const interactifType = 'numerique'

export const titre = 'Multiplications d’un nombre décimal par 10, 100 ou 1 000.'

/**
 * Multiplication d'un nombre décimal dans différentes écritures par 10, 100, 1000
 *
 *  * Type 1 : écriture décimale
 *  * Type 2 : écriture fractionnaire
 *  * Type 3 : écritures fractionnaires et décimales
 *
 *  * Sup2 : avec ou sans calculs à trous
 * @author Rémi Angot
* Référence 6C30-1
  *
 */
export default function MultiplierDecimauxPar101001000 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calculer.'
  this.sup = 3
  this.sup2 = false
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 8

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles = []; let typesDeQuestions
    if (this.sup === 1 && !this.sup2) typesDeQuestionsDisponibles = [1, 2]
    if (this.sup === 1 && this.sup2) { typesDeQuestionsDisponibles = [1, 2, 5, 6] }
    if (this.sup === 2 && !this.sup2) typesDeQuestionsDisponibles = [3, 4]
    if (this.sup === 2 && this.sup2) { typesDeQuestionsDisponibles = [3, 4, 3, 4, 7, 8, 9, 10] }
    if (this.sup === 3 && !this.sup2) { typesDeQuestionsDisponibles = [1, 2, 3, 4] }
    if (this.sup === 3 && this.sup2) { typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }

    if (this.sup2) this.consigne = 'Calculer et compléter.'
    let reponse
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const facteurs = combinaisonListes(
      [10, 100, 1000],
      this.nbQuestions
    )

    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, den;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 1: // a,abcd × 10
          a = choice([randint(11, 99), randint(100, 999)])
          a = calcul(a / choice([10, 100, 1000, 10000]))
          b = facteurs[i]
          texte = `$${texNombre(a)}\\times${texNombre(b)}=\\ldots$`
          texteCorr = `$${texNombre(a)} \\times ${texNombre(
            b
          )} = ${texNombrec(a * b)}$`
          reponse = calcul(a * b)
          break
        case 2: // 10 × a,abcd
          a = choice([randint(11, 99), randint(100, 999)])
          a = calcul(a / choice([10, 100, 1000, 10000]))
          b = facteurs[i]
          texte = `$${texNombre(b)}\\times${texNombre(a)}=\\ldots$`
          texteCorr = `$${texNombre(b)} \\times ${texNombre(
            a
          )} = ${texNombrec(a * b)}$`
          reponse = calcul(a * b)
          break
        case 3: // abcd/10 × 10
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          den = choice([10, 100, 1000])
          b = facteurs[i]
          texte = `$${texFraction(a, den)}\\times${texNombre(b)}=\\ldots$`
          texteCorr = `$${texFraction(a, den)} \\times ${texNombre(
            b
          )} = ${texFraction(a * b, den)} = ${texNombrec((a / den) * b)}$`
          reponse = calcul(a * b / den)
          break
        case 4: // 10 × abcd/10
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          den = choice([10, 100, 1000])
          b = facteurs[i]
          texte = `$${texNombre(b)}\\times${texFraction(a, den)}=\\ldots$`
          texteCorr = `$${texNombre(b)} \\times ${texFraction(
            a,
            den
          )} = ${texFraction(a * b, den)} = ${texNombrec((a / den) * b)}$`
          reponse = calcul(a * b / den)
          break
        case 5: // .... × 10 = a,abcd
          a = choice([randint(11, 99), randint(100, 999)])
          a = calcul(a / choice([10, 100, 1000, 10000]))
          b = facteurs[i]
          texte = `$\\ldots \\times${texNombre(b)} = ${texNombrec(a * b)}$`
          texteCorr = `$${miseEnEvidence(
            texNombre(a)
          )} \\times ${texNombre(b)} = ${texNombrec(a * b)}$`
          reponse = a
          break
        case 6: // 10 × .... = a,abcd
          a = choice([randint(11, 99), randint(100, 999)])
          a = calcul(a / choice([10, 100, 1000, 10000]))
          b = facteurs[i]
          texte = `$${texNombre(b)} \\times \\ldots = ${texNombrec(a * b)}$`
          texteCorr = `$${texNombre(b)} \\times ${miseEnEvidence(
            texNombre(a)
          )}  = ${texNombrec(a * b)}$`
          reponse = b
          break
        case 7: // case 3 avec un trou sur l'entier
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          den = choice([10, 100, 1000])
          b = facteurs[i]
          texte = `$${texFraction(a, den)}\\times \\ldots = ${texNombrec(
            (a / den) * b
          )}$`
          texteCorr = `$${texFraction(a, den)} \\times ${miseEnEvidence(
            texNombre(b)
          )} = ${texFraction(a * b, den)} = ${texNombrec((a / den) * b)}$`
          reponse = b
          break
        case 8: // case 4 avec un trou sur l'entier
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          den = choice([10, 100, 1000])
          b = facteurs[i]
          texte = `$ \\ldots \\times${texFraction(a, den)}= ${texNombrec(
            (a / den) * b
          )}$`
          texteCorr = `$${miseEnEvidence(
            texNombre(b)
          )} \\times ${texFraction(a, den)} = ${texFraction(
            a * b,
            den
          )} = ${texNombrec((a / den) * b)}$`
          reponse = b
          break
        case 9: // case 3 avec trou sur la fraction
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          den = choice([10, 100, 1000])
          b = facteurs[i]
          texte = `$${texFraction(a, '\\ldots')}\\times${texNombre(
            b
          )} = ${texNombrec((a / den) * b)}$`
          texteCorr = `$${texFraction(
            a,
            miseEnEvidence(texNombre(den))
          )} \\times ${texNombre(b)} = ${texFraction(
            a * b,
            den
          )} = ${texNombrec((a / den) * b)}$`
          reponse = den
          break
        case 10: // case 4 avec trou sur la fraction
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          den = choice([10, 100, 1000])
          b = facteurs[i]
          texte = `$${texNombre(b)}\\times${texFraction(
            a,
            '\\ldots'
          )} = ${texNombrec((a / den) * b)}$`
          texteCorr = `$${texNombre(b)} \\times ${texFraction(
            a,
            miseEnEvidence(texNombre(den))
          )} = ${texFraction(a * b, den)} = ${texNombrec((a / den) * b)}$`
          reponse = den
          break
      }
      if (context.isHtml && this.interactif) texte += '$~=$' + ajouteChampTexte(this, i)
      setReponse(this, i, reponse)
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
        this.autoCorrection[i].propositions = [{ texte: texteCorr, statut: '' }]
        this.autoCorrection[i].reponse = { valeur: reponse, param: { digits: nombreDeChiffresDansLaPartieEntiere(reponse) + nombreDeChiffresDansLaPartieDecimale(reponse) + 2, decimals: nombreDeChiffresDansLaPartieDecimale(reponse) + 1, signe: false, exposantNbChiffres: 0 } }
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
    'Types de calculs',
    3,
    '1 : Écriture décimale\n2 : Écriture fractionnaire\n3 : Écritures décimales et fractionnaires'
  ]
  this.besoinFormulaire2CaseACocher = ['Avec des calculs à trous']
}
