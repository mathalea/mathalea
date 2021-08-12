import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureNombreRelatif, ecritureParentheseSiNegatif, pgcd, simplificationDeFractionAvecEtapes, calcul, miseEnEvidence, texFraction, ppcm, fractionSimplifiee, texFractionReduite } from '../../modules/outils.js'

export const amcReady = true
export const amcType = 'AMCOpenNum✖︎2' // type de question AMC
export const titre = 'Additionner ou soustraire deux fractions'

/**
* Effectuer la somme ou la différence de deux fractions
*
* * Niveau 1 : 4 fois sur 5 un dénominateur est un multiple de l'autre et une fois sur 5 il faut additionner une fraction et un entier
* * Niveau 2 : 2 fois sur 5, il faut trouver le ppcm, 1 fois sur 5 le ppcm correspond à leur produit, 1 fois sur 5 un dénominateur est multiple de l'autre, 1 fois sur 5 il faut additionner une fraction et un entier
* * Paramètre supplémentaire : utiliser des nommbres relatifs (par défaut tous les nombres sont positifs)
* * 2 fois sur 4 il faut faire une soustraction
* @author Rémi Angot
* 4C21
*/
export default function Exercice_additionner_ou_soustraire_des_fractions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 2 // Niveau de difficulté
  this.sup2 = false // Avec ou sans relatifs
  this.titre = titre
  this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée."
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.amcReady = amcReady
  this.amcType = amcType

  this.nouvelleVersion = function () {
	  this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    if (this.sup == 1) {
      typesDeQuestionsDisponibles = ['b_multiple_de_d', 'd_multiple_de_b', 'b_multiple_de_d', 'd_multiple_de_b', 'entier']
    }
    if (this.sup == 2) {
      typesDeQuestionsDisponibles = ['ppcm', 'ppcm', 'premiers_entre_eux', choice(['b_multiple_de_d', 'd_multiple_de_b']), 'entier']
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeDePlusOuMoins = combinaisonListes(['-', '-', '+', '+'], this.nbQuestions)
    for (let i = 0, a, b, c, d, k, k1, k2, num, den, texte, texteCorr, typesDeQuestions; i < this.nbQuestions; i++) {
      const plusOuMoins = listeDePlusOuMoins[i]
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 'ppcm':
          const listeCouplesDeDenominateurs = [[6, 9], [4, 6], [8, 12], [9, 12], [10, 15], [10, 25], [6, 21], [12, 30], [6, 8], [50, 75]]
          const couplesDeDenominateurs = choice(listeCouplesDeDenominateurs)
          if (choice([true, false])) {
            b = couplesDeDenominateurs[0]
            d = couplesDeDenominateurs[1]
          } else {
            b = couplesDeDenominateurs[1]
            d = couplesDeDenominateurs[0]
          }
          k1 = ppcm(b, d) / b
          k2 = ppcm(b, d) / d
          break

        case 'premiers_entre_eux':
          b = randint(2, 9)
          d = randint(2, 9)
          while (pgcd(b, d) != 1) {
            b = randint(2, 9)
            d = randint(2, 9)
          }
          k1 = ppcm(b, d) / b
          k2 = ppcm(b, d) / d
          break

        case 'd_multiple_de_b':
          b = randint(2, 9)
          k = randint(2, 11)
          d = b * k
          break

        case 'b_multiple_de_d':
          d = randint(2, 9)
          k = randint(2, 11)
          b = d * k
          break
      }

      a = randint(1, 9, [b])
      c = randint(1, 9, [d])
      if (this.sup2) { // si les numérateurs sont relatifs
        a = a * choice([-1, 1])
        c = c * choice([-1, 1])
      }
      if (!this.sup2 && plusOuMoins == '-' && a / b < c / d) { // s'il n'y a pas de relatifs, il faut s'assurer que la soustraction soit positive
        [a, b, c, d] = [c, d, a, b] // on échange les 2 fractions
        k1 = ppcm(b, d) / b
        k2 = ppcm(b, d) / d
        if (typesDeQuestions == 'd_multiple_de_b') {
          typesDeQuestions = 'b_multiple_de_d' // comme on a échangé les 2 fractions, le type de la question change
          k = b / d
        } else if (typesDeQuestions == 'b_multiple_de_d') {
          typesDeQuestions = 'd_multiple_de_b' // comme on a échangé les 2 fractions, le type de la question change
          k = d / b
        }
        const echange = true
      }
      texte = `$${texFraction(a, b)}${plusOuMoins}${texFraction(c, d)}=$`
      texteCorr = `$${texFraction(a, b)}${plusOuMoins}${texFraction(c, d)}`

      // a/b(+ou-)c/d = num/den (résultat non simplifié)
      if (typesDeQuestions == 'ppcm' || typesDeQuestions == 'premiers_entre_eux') {
        texteCorr += `=${texFraction(a + miseEnEvidence('\\times ' + k1), b + miseEnEvidence('\\times ' + k1))}${plusOuMoins}${texFraction(c + miseEnEvidence('\\times ' + k2), d + miseEnEvidence('\\times ' + k2))}`
        num = calcul(a * k1 + plusOuMoins + ecritureNombreRelatif(c * k2))
        den = b * k1
        texteCorr += `=${texFraction(a * k1 + plusOuMoins + ecritureParentheseSiNegatif(c * k2), den)}`
      }

      if (typesDeQuestions == 'd_multiple_de_b') {
        texteCorr += `=${texFraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}${plusOuMoins}${texFraction(c, d)}`
        num = calcul(a * k + plusOuMoins + ecritureNombreRelatif(c))
        den = b * k
        texteCorr += `=${texFraction(a * k + plusOuMoins + ecritureParentheseSiNegatif(c), den)}`
      }

      if (typesDeQuestions == 'b_multiple_de_d') {
        texteCorr += `=${texFraction(a, b)}${plusOuMoins}${texFraction(c + miseEnEvidence('\\times ' + k), d + miseEnEvidence('\\times ' + k))}`
        num = calcul(a + plusOuMoins + ecritureNombreRelatif(c * k))
        den = b
        texteCorr += `=${texFraction(a + plusOuMoins + ecritureParentheseSiNegatif(c * k), den)}`
      }

      if (typesDeQuestions == 'entier') {
        a = randint(1, 9)
        b = randint(2, 9, [a])
        let n = randint(1, 9)
        if (this.sup2) {
          a = a * choice([-1, 1])
          n = n * choice([-1, 1])
        }
        if (choice([true, false])) {
          // n+-a/b
          if (!this.sup2 && plusOuMoins == '-' && n < a / b) {
            n = randint(5, 9) // max(a/b)=9/2
          }
          texte = `$${n}${plusOuMoins}${texFraction(a, b)}=$`
          texteCorr = texte
          texteCorr += `$${texFraction(n + miseEnEvidence('\\times ' + b), miseEnEvidence(b))}${plusOuMoins}${texFraction(a, b)}`
          texteCorr += `=${texFraction(n * b + plusOuMoins + ecritureParentheseSiNegatif(a), b)}`
        } else {
          // a/b +-n
          if (!this.sup2 && plusOuMoins == '-' && n > a / b) {
            n = randint(1, 4) //
            a = n * b + randint(1, 9) // (n*b+?)/b-n>0
          }
          texte = `$${texFraction(a, b)}${plusOuMoins}${ecritureParentheseSiNegatif(n)}=$`
          texteCorr = texte
          texteCorr += `$${texFraction(a, b)}${plusOuMoins}${texFraction(n + miseEnEvidence('\\times ' + b), miseEnEvidence(b))}`
          texteCorr += `=${texFraction(a + '+' + ecritureParentheseSiNegatif(n * b), b)}`
        }
        num = calcul(n * b + plusOuMoins + ecritureParentheseSiNegatif(a))
        den = b
      }
      texteCorr += `=${texFraction(num, den)}`
      texteCorr += simplificationDeFractionAvecEtapes(num, den) + '$'
      // Pour l'instant pour tester je mets num et den dans reponse
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      this.autoCorrection[i] = {
        enonce: `Calculer $${texte.substring(1, texte.length - 2)}$ et donner le résultat sous forme irreductible`,
        propositions: [
          {
            texte: texteCorr,
            statut: 3,
            feedback: ''
          }
        ],
        reponse: {
          texte: 'numérateur',
          valeur: fractionSimplifiee(num, den)[0],
          param: {
            digits: 2,
            decimals: 0,
            exposantNbChiffres: 0,
            exposantSigne: false,
            signe: true,
            approx: 0
          }
        },
        reponse2: {
          texte: 'dénominateur',
          valeur: fractionSimplifiee(num, den)[1],
          param: {
            digits: 2,
            decimals: 0,
            exposantNbChiffres: 0,
            exposantSigne: false,
            signe: false,
            approx: 0
          }
        }
      }
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, "1 : Un dénominateur multiple de l'autre\n\
2 : Cas général"]
  this.besoinFormulaire2CaseACocher = ['Avec des nombres relatifs']
}
