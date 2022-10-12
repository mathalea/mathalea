import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texFraction } from '../../modules/outils/arrayFractions.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { miseEnEvidence } from '../../modules/outils/contextSensitif.js'
import { calcul, texNombre } from '../../modules/outils/texNombres.js'
import { nombreDeChiffresDansLaPartieDecimale, nombreDeChiffresDansLaPartieEntiere } from '../../modules/outils/decimales.js'
export const amcReady = true
export const amcType = 'AMCNum' // Question numérique
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Multiplier un nombre décimal par 10, 100 ou 1 000'
export const dateDeModifImportante = '12/12/2021'

/**
 * Multiplication d'un nombre décimal dans différentes écritures par 10, 100, 1000
 *
 *  * Type 1 : écriture décimale
 *  * Type 2 : écriture fractionnaire
 *  * Type 3 : écritures fractionnaires et décimales
 *
 *  * Sup2 : avec ou sans calculs à trous
 * @author Rémi Angot (Ajout 3 décimales maxi et que des entiers par Eric Elter)
 * Référence 6C30-1
 * Relecture : Décembre 2021 par EE
 *
 */
export const uuid = '2471d'
export const ref = '6C30-1'
export default function MultiplierDecimauxPar101001000 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calculer.'
  this.sup = 3
  this.sup2 = false
  this.sup3 = true
  this.sup4 = false
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 8

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
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
          if (!this.sup4) {
            if (this.sup3) {
              a = calcul(a / choice([10, 100, 1000]))
            } else {
              a = calcul(a / choice([10, 100, 1000, 10000]))
            }
          }
          b = facteurs[i]
          texte = `$${texNombre(a)}\\times${texNombre(b)}= ${this.interactif ? '' : '\\ldots'}$`
          texteCorr = `$${texNombre(a)} \\times ${texNombre(
            b
          )} = ${miseEnEvidence(texNombre(a * b))}$`
          reponse = calcul(a * b)
          break
        case 2: // 10 × a,abcd
          a = choice([randint(11, 99), randint(100, 999)])
          if (!this.sup4) {
            if (this.sup3) {
              a = calcul(a / choice([10, 100, 1000]))
            } else {
              a = calcul(a / choice([10, 100, 1000, 10000]))
            }
          }
          b = facteurs[i]
          texte = `$${texNombre(b)}\\times${texNombre(a)}= ${this.interactif ? '' : '\\ldots'}$`
          texteCorr = `$${texNombre(b)} \\times ${texNombre(
            a
          )} = ${miseEnEvidence(texNombre(a * b))}$`
          reponse = calcul(a * b)
          break
        case 3: // abcd/10 × 10
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          b = facteurs[i]
          if (this.sup4) {
            den = choice([10, 100, 1000])
            while (den > b) {
              den = choice([10, 100, 1000])
            }
          } else {
            den = choice([10, 100, 1000])
          }
          texte = `$${texFraction(a, den)}\\times${texNombre(b)}= ${this.interactif ? '' : '\\ldots'}$`
          texteCorr = `$${texFraction(a, den)} \\times ${texNombre(
            b
          )} = ${texFraction(a * b, den)} = ${miseEnEvidence(texNombre((a / den) * b))}$`
          reponse = calcul(a * b / den)
          break
        case 4: // 10 × abcd/10
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          b = facteurs[i]
          if (this.sup4) {
            den = choice([10, 100, 1000])
            while (den > b) {
              den = choice([10, 100, 1000])
            }
          } else {
            den = choice([10, 100, 1000])
          }
          texte = `$${texNombre(b)}\\times${texFraction(a, den)}= ${this.interactif ? '' : '\\ldots'}$`
          texteCorr = `$${texNombre(b)} \\times ${texFraction(
            a,
            den
          )} = ${texFraction(a * b, den)} = ${miseEnEvidence(texNombre((a / den) * b))}$`
          reponse = calcul(a * b / den)
          break
        case 5: // .... × 10 = a,abcd
          a = choice([randint(11, 99), randint(100, 999)])
          if (!this.sup4) {
            if (this.sup3) {
              a = calcul(a / choice([10, 100, 1000]))
            } else {
              a = calcul(a / choice([10, 100, 1000, 10000]))
            }
          }
          b = facteurs[i]
          texte = `$\\ldots \\times${texNombre(b)} = ${texNombre(a * b)}$`
          texteCorr = `$${miseEnEvidence(
            texNombre(a)
          )} \\times ${texNombre(b)} = ${texNombre(a * b)}$`
          reponse = a
          break
        case 6: // 10 × .... = a,abcd
          a = choice([randint(11, 99), randint(100, 999)])
          if (!this.sup4) {
            if (this.sup3) {
              a = calcul(a / choice([10, 100, 1000]))
            } else {
              a = calcul(a / choice([10, 100, 1000, 10000]))
            }
          }
          b = facteurs[i]
          texte = `$${texNombre(b)} \\times \\ldots = ${texNombre(a * b)}$`
          texteCorr = `$${texNombre(b)} \\times ${miseEnEvidence(
            texNombre(a)
          )}  = ${texNombre(a * b)}$`
          reponse = b
          break
        case 7: // case 3 avec un trou sur l'entier
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          b = facteurs[i]
          if (this.sup4) {
            den = choice([10, 100, 1000])
            while (den > b) {
              den = choice([10, 100, 1000])
            }
          } else {
            den = choice([10, 100, 1000])
          }
          texte = `$${texFraction(a, den)}\\times \\ldots = ${texNombre(
            (a / den) * b
          )}$`
          texteCorr = `$${texFraction(a, den)} \\times ${miseEnEvidence(
            texNombre(b)
          )} = ${texFraction(a * b, den)} = ${texNombre((a / den) * b)}$`
          reponse = b
          break
        case 8: // case 4 avec un trou sur l'entier
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          b = facteurs[i]
          if (this.sup4) {
            den = choice([10, 100, 1000])
            while (den > b) {
              den = choice([10, 100, 1000])
            }
          } else {
            den = choice([10, 100, 1000])
          }
          texte = `$ \\ldots \\times${texFraction(a, den)}= ${texNombre(
            (a / den) * b
          )}$`
          texteCorr = `$${miseEnEvidence(
            texNombre(b)
          )} \\times ${texFraction(a, den)} = ${texFraction(
            a * b,
            den
          )} = ${texNombre((a / den) * b)}$`
          reponse = b
          break
        case 9: // case 3 avec trou sur la fraction
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          b = facteurs[i]
          if (this.sup4) {
            den = choice([10, 100, 1000])
            while (den > b) {
              den = choice([10, 100, 1000])
            }
          } else {
            den = choice([10, 100, 1000])
          }
          texte = `$${texFraction(a, '\\ldots')}\\times${texNombre(
            b
          )} = ${texNombre((a / den) * b)}$`
          texteCorr = `$${texFraction(
            a,
            miseEnEvidence(texNombre(den))
          )} \\times ${texNombre(b)} = ${texFraction(
            a * b,
            den
          )} = ${texNombre((a / den) * b)}$`
          reponse = den
          break
        case 10: // case 4 avec trou sur la fraction
          a = choice([randint(11, 99), randint(100, 999), randint(2, 9)])
          b = facteurs[i]
          if (this.sup4) {
            den = choice([10, 100, 1000])
            while (den > b) {
              den = choice([10, 100, 1000])
            }
          } else {
            den = choice([10, 100, 1000])
          }
          texte = `$${texNombre(b)}\\times${texFraction(
            a,
            '\\ldots'
          )} = ${texNombre((a / den) * b)}$`
          texteCorr = `$${texNombre(b)} \\times ${texFraction(
            a,
            miseEnEvidence(texNombre(den))
          )} = ${texFraction(a * b, den)} = ${texNombre((a / den) * b)}$`
          reponse = den
          break
      }
      if (context.isHtml && this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
      setReponse(this, i, reponse)
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
        this.autoCorrection[i].propositions = [{ texte: texteCorr, statut: '' }]
        this.autoCorrection[i].reponse.param = { digits: nombreDeChiffresDansLaPartieEntiere(reponse) + nombreDeChiffresDansLaPartieDecimale(reponse) + 2, decimals: nombreDeChiffresDansLaPartieDecimale(reponse) + 1, signe: false, exposantNbChiffres: 0 }
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
    'Type de calculs',
    3,
    '1 : Écriture décimale\n2 : Écriture fractionnaire\n3 : Mélange'
  ]
  this.besoinFormulaire2CaseACocher = ['Avec des calculs à trous']
  this.besoinFormulaire3CaseACocher = ['Trois décimales maximum', true]
  this.besoinFormulaire4CaseACocher = ['Que des nombres entiers', true]
}
