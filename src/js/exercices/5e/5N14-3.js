import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { fraction } from '../../modules/fractions.js'
import { listeQuestionsToContenu, randint, choice, calcul, texNombre, miseEnEvidence } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'

export const titre = 'Fractions égales et égalité des produits en croix'

export const amcReady = true
export const amcType = 'qcmMono'
export const interactifType = 'qcm'
export const interactifReady = true

export const description = 'Déterminer si une égalité de deux fractions est vraie en utilisant les produits en croix.<br> 4 niveaux : petits entiers, grands entiers, décimaux, mélange.'

/**
 * * Fractions et égalité des produits en croix
 * * 5N14-3
 * * publication initiale le 23/05/2021
 * * modification le jj/mm/aaaa pour ....
 * @author Sébastien Lozano
 */
export const uuid = 'd1fb2'
export const ref = '5N14-3'
export default function EqResolvantesThales () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  if (this.debug) {
    this.nbQuestions = 4
  } else {
    this.nbQuestions = 4
  };
  this.sup = 1 // Niveau de difficulté
  this.consigne = 'Les égalités suivantes sont-elles vraies ? Justifier.'

  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5

  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.niveau = '5e'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const listeTypeDeQuestions = Array(this.nbQuestions).fill(this.sup)
    if (this.sup === 4) {
      for (let i = 0; i < this.nbQuestions; i++) {
        listeTypeDeQuestions[i] = randint(1, 3)
      }
    }
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On a besoin d'un booléen pour que tout ne soit pas vrai ou faux
      let equalOrNot
      // On a besoin de variables opur les fractions
      let f, fEqOrNot, deuxFractions
      // On a besoin d'un numerateur d'un dénominateur et d'un coefficient pour les fractions égales
      let num, den
      // On a besoin d'un string pour stocker l'égalité et un autre pour la justification
      let egalite, justification
      /**
      * Une fonction pour rendre deux fractions égales ou pas
      * @param {boolean} bool
      * @returns deux fractions egales ou non
      */
      function fracEqualOrNot (bool, n, d) {
        // On a besoin de deux fractions
        let f2
        const f1 = fraction(n, d)
        if (bool) {
          f2 = fraction(calcul(n * k), calcul(d * k))
        } else {
          f2 = fraction(calcul(n + k), calcul(d + k))
        }
        return { frac: f1, fracEqualOrNot: f2 }
      }
      /**
      * Une fonction pour afficher des fraction avec num et/ou den décimaux
      * @param num le numerateur de type number
      * @param den le dénominateur de type number
      */
      function showFracNumDenDec (num, den) {
        const f = fraction(num, den)
        return `\\dfrac{${texNombre(f.num, 2)}}{${texNombre(f.den, 2)}}`
      }

      /**
      * Une fonction pour la correction
      * @param bool le booléen pour savoir si il y a égalité ou pas
      * @param f une fraction
      * @param fEqOrNot l'autre fraction égale ou pas
      */
      function justifyEq (bool, deuxFractions, decimal = false) {
        let f = deuxFractions.frac
        let fEqOrNot = deuxFractions.fracEqualOrNot
        if (decimal) {
          f = f.reduire(0.1)
          fEqOrNot = fEqOrNot.reduire(0.1)
        }

        let strOut
        if (bool) {
          strOut = `D'une part, $${texNombre(f.num)}\\times ${texNombre(fEqOrNot.den)} = ${miseEnEvidence(texNombre(f.num * fEqOrNot.den))}$.<br>
          D'autre part, $${texNombre(f.den)}\\times ${texNombre(fEqOrNot.num)} = ${miseEnEvidence(texNombre(f.den * fEqOrNot.num))}$.<br>
          On constate que les produits en croix sont égaux.<br>
          `
          strOut += `Les fractions $${showFracNumDenDec(f.num, f.den)}$ et $${showFracNumDenDec(fEqOrNot.num, fEqOrNot.den)}$ sont donc égales.`
        } else {
          strOut = `D'une part, $${texNombre(f.num)}\\times ${texNombre(fEqOrNot.den)} = ${miseEnEvidence(texNombre(f.num * fEqOrNot.den))}$.<br>
          D'autre part, $${texNombre(f.den)}\\times ${texNombre(fEqOrNot.num)} = ${miseEnEvidence(texNombre(f.den * fEqOrNot.num))}$.<br>
          On constate que les produits en croix ne sont pas égaux.<br>
          `
          if (Number.isInteger(f.num)) {
            strOut += `Les fractions $${f.texFraction}$ et $${fEqOrNot.texFraction}$ ne sont donc pas égales.`
          } else {
            strOut += `Les fractions $${showFracNumDenDec(f.num, f.den)}$ et $${showFracNumDenDec(fEqOrNot.num, fEqOrNot.den)}$ ne sont donc pas égales.`
          }
        }
        return strOut
      }
      const k = randint(2, 9)
      // On prépare tous les contenus selon le type de questions
      this.sup = Number(this.sup) // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !
      switch (listeTypeDeQuestions[i]) {
        case 1: // petits entiers égalité
          equalOrNot = choice([true, false])
          num = randint(1, 9)
          den = randint(2, 9, num)
          deuxFractions = fracEqualOrNot(equalOrNot, num, den)
          egalite = `$${deuxFractions.frac.texFraction}\\overset{?}{=}${deuxFractions.fracEqualOrNot.texFraction}$`
          justification = justifyEq(equalOrNot, deuxFractions)
          break
        case 2: // grands entiers
          equalOrNot = choice([true, false])
          num = randint(11, 99)
          den = randint(11, 99, num)
          deuxFractions = fracEqualOrNot(equalOrNot, num, den)
          egalite = `$${deuxFractions.frac.texFraction}\\overset{?}{=}${deuxFractions.fracEqualOrNot.texFraction}$`
          justification = justifyEq(equalOrNot, deuxFractions)
          break
        case 3: // décimaux
          equalOrNot = choice([true, false])
          num = randint(11, 99)
          den = randint(11, 99, num)
          deuxFractions = fracEqualOrNot(equalOrNot, num, den)
          f = deuxFractions.frac
          fEqOrNot = deuxFractions.fracEqualOrNot
          egalite = `$${showFracNumDenDec(f.num / 10, f.den / 10)}\\overset{?}{=}${showFracNumDenDec(fEqOrNot.num / 10, fEqOrNot.den / 10)}$`
          justification = justifyEq(equalOrNot, deuxFractions, true)
          break
      }

      const enonces = []
      for (let k = 0; k < 4; k++) {
        enonces.push({
          enonce: egalite,
          question: '',
          correction: justification
        })
      };
      // autant de case que d'elements dans le tableau des situations
      switch (listeTypeDeQuestions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
          };
          break
        case 1:
          texte = `${enonces[1].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[1].correction}`
          };
          break
        case 2:
          texte = `${enonces[2].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[2].correction}`
          };
          break
        case 3:
          texte = `${enonces[3].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[3].correction}`
          };
          break
      };
      this.autoCorrection[i] = {}
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [
        {
          texte: 'L\'égalité est vraie',
          statut: equalOrNot
        },
        {
          texte: 'L\'égalité est fausse',
          statut: !equalOrNot
        },
        {
          texte: 'Je ne sais pas',
          statut: false
        }
      ]
      this.autoCorrection[i].options = { ordered: true } // On ne mélange pas les propositions 'Oui', 'Non' et 'Je ne sais pas'
      if (this.interactif) {
        texte += '<br>' + propositionsQcm(this, i).texte
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de nombres', 4, '1 : Petits entiers\n2 : Grands entiers\n3 : Décimaux\n4 : Mélange']
}
