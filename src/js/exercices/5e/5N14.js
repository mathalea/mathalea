import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, enleveElement, choice, miseEnEvidence, obtenirListeFractionsIrreductibles, texFraction, texFractionSigne, combinaisonListes } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'
export const titre = 'Comparer deux fractions (dénominateurs multiples)'

/**
* Comparer deux fractions dont les dénominateurs sont multiples (avec un coefficient paramétrable qui est par défaut inférieur à 11)
* @author Rémi Angot
* 5N14
* Ajout du paramètre d'inclusion de nombres négatifs le 14/08/2021 : Guillaume Valmont
* rendu interactif + AMC par Jean-Claude Lhote
*/
export const uuid = '234a7'
export const ref = '5N14'
export default function ExerciceComparerDeuxFractions (max = 11) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = max // Correspond au facteur commun
  this.consigne = 'Comparer les fractions suivantes.'
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.sup2 = false

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const listeSignes = combinaisonListes([-1, 1], this.nbQuestions)
    const listeFractions = obtenirListeFractionsIrreductibles()
    for (let i = 0, fraction, a, b, k, positifOuNegatif, signeAsurB, texte, texteCorr, signe, signe2; i < this.nbQuestions;) {
      this.autoCorrection[i] = {}
      if (this.sup2 === true) positifOuNegatif = listeSignes[i]
      else positifOuNegatif = 1
      fraction = choice(listeFractions)
      a = fraction[0] * positifOuNegatif
      b = fraction[1]
      k = randint(2, this.sup)
      let ecart = choice([-4, -3, -2, -1, 1, 2, 3, 4], [-k * a, k * a]) // On exclue -k * a pour ne pas avoir une fraction nulle
      if (k * a + ecart <= 0) {
        ecart = ecart * (-1)
      }
      if (ecart > 0) {
        signe = '<'
        signe2 = '>'
      } else {
        signe = '>'
        signe2 = '<'
      }
      enleveElement(listeFractions, fraction) // Il n'y aura pas 2 fois la même réponse

      const ordreDesFractions = randint(1, 2)
      if (ordreDesFractions === 1) {
        texte = `$${texFractionSigne(a, b)} \\quad$ et $\\quad ${texFractionSigne(k * a + ecart, k * b)}$`
      } else {
        texte = `$${texFractionSigne(k * a + ecart, k * b)} \\quad$ et $\\quad ${texFractionSigne(a, b)}$`
      }
      if (!context.isHtml) {
        texte = texte.replace('\\quad$ et $\\quad', '\\ldots\\ldots\\ldots')
      }
      if (a * b < 0) signeAsurB = '-'
      else signeAsurB = ''
      texteCorr = `$${texFractionSigne(a, b)}= ${signeAsurB} ${texFraction(Math.abs(a) + miseEnEvidence('\\times  ' + k), Math.abs(b) + miseEnEvidence('\\times  ' + k))}=${texFractionSigne(a * k, b * k)}\\quad$`
      if (ordreDesFractions === 1) {
        texteCorr += `  et   $\\quad${texFractionSigne(a * k, b * k)} ${signe} ${texFractionSigne(a * k + ecart, b * k)} \\quad$ donc $\\quad ${texFractionSigne(a, b)} ${signe} ${texFractionSigne(a * k + ecart, b * k)}$ `
      } else {
        texteCorr += `  et   $\\quad${texFractionSigne(a * k + ecart, b * k)} ${signe2} ${texFractionSigne(a * k, b * k)} \\quad$ donc $\\quad ${texFractionSigne(a * k + ecart, b * k)} ${signe2} ${texFractionSigne(a, b)} $ `
      }
      this.autoCorrection[i] = {
        enonce: 'comparer les fractions suivantes : ' + (ordreDesFractions < 2 ? `$${texFractionSigne(a, b)} \\quad$ et $\\quad ${texFractionSigne(k * a + ecart, k * b)}$` : `$${texFractionSigne(k * a + ecart, k * b)} \\quad$ et $\\quad ${texFractionSigne(a, b)}$`),
        propositions: [
          {
            texte: ordreDesFractions < 2 ? `$${texFractionSigne(a, b)} < ${texFractionSigne(k * a + ecart, k * b)}$` : `$${texFractionSigne(k * a + ecart, k * b)} < ${texFractionSigne(a, b)}$`,
            statut: ordreDesFractions < 2 ? ecart > 0 : ecart < 0
          },
          {
            texte: ordreDesFractions < 2 ? `$${texFractionSigne(a, b)} > ${texFractionSigne(k * a + ecart, k * b)}$` : `$${texFractionSigne(k * a + ecart, k * b)} >${texFractionSigne(a, b)}$`,
            statut: ordreDesFractions < 2 ? ecart < 0 : ecart > 0
          }
        ],
        options: { ordered: false }
      }

      if (this.interactif && !context.isAmc) {
        texte = propositionsQcm(this, i).texte
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      if (!context.isHtml) {
        this.canEnonce = 'Compléter avec $>$ ou $<$.<br>'
        this.correction = this.listeCorrections[0]
        if (ordreDesFractions === 1) {
          this.canReponseACompleter = `$${texFractionSigne(a, b)}\\ldots${texFractionSigne(k * a + ecart, k * b)}$`
        } else {
          this.canReponseACompleter = `$${texFractionSigne(k * a + ecart, k * b)} \\ldots${texFractionSigne(a, b)}$`
        }
      }
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
  this.besoinFormulaireNumerique = ['Valeur maximale du coefficient multiplicateur', 99999]
  this.besoinFormulaire2CaseACocher = ['Inclure des nombres négatifs']
}
