import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { pgcd, ppcm, randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { ecritureParentheseSiNegatif } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { simplificationDeFractionAvecEtapes, texFraction } from '../../modules/outils/arrayFractions.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { miseEnEvidence } from '../../modules/outils/contextSensitif.js'
import { calcul } from '../../modules/outils/texNombres.js'
import { fraction } from '../../modules/fractions.js'
import { lettreDepuisChiffre } from '../../modules/outils/lettres.js'
export const amcReady = true
export const amcType = 'AMCNum' // type de question AMC
export const titre = 'Additionner ou soustraire deux fractions'
export const interactifReady = true
export const interactifType = 'mathLive'

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
export const uuid = '5f429'
export const ref = '4C21'
export default function ExerciceAdditionnerOuSoustraireDesFractions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 2 // Niveau de difficulté
  this.sup2 = false // Avec ou sans relatifs
  this.sup3 = true // Si false alors le résultat n'est pas en fraction simplifiée
  this.sup4 = false // Par défaut c'est l'ancienne correction qui est affichée
  this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée."
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    if (!this.sup3 && !context.isAmc) {
      this.consigne = 'Calculer :'
    } else {
      this.consigne = "Calculer et donner le résultat sous la forme d'une fraction simplifiée."
    }
    this.sup = parseInt(this.sup)
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = ['b_multiple_de_d', 'd_multiple_de_b', 'b_multiple_de_d', 'd_multiple_de_b', 'entier']
    }
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = ['ppcm', 'ppcm', 'premiers_entre_eux', choice(['b_multiple_de_d', 'd_multiple_de_b']), 'entier']
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeDePlusOuMoins = combinaisonListes(['-', '-', '+', '+'], this.nbQuestions)
    const listeCouplesDeDenominateurs = [[6, 9], [4, 6], [8, 12], [9, 12], [10, 15], [10, 25], [6, 21], [12, 30], [6, 8], [50, 75]]
    for (let i = 0, a, b, c, d, k, k1, k2, num, den, texte, texteCorr, reponse, couplesDeDenominateurs, typesDeQuestions; i < this.nbQuestions; i++) {
      const plusOuMoins = listeDePlusOuMoins[i]
      const plusOuMoinsUn = plusOuMoins === '+' ? 1 : -1
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 'ppcm':
          couplesDeDenominateurs = choice(listeCouplesDeDenominateurs)
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
          while (pgcd(b, d) !== 1) {
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
      if (!this.sup2 && plusOuMoins === '-' && a / b < c / d) { // s'il n'y a pas de relatifs, il faut s'assurer que la soustraction soit positive
        [a, b, c, d] = [c, d, a, b] // on échange les 2 fractions
        k1 = ppcm(b, d) / b
        k2 = ppcm(b, d) / d
        if (typesDeQuestions === 'd_multiple_de_b') {
          typesDeQuestions = 'b_multiple_de_d' // comme on a échangé les 2 fractions, le type de la question change
          k = b / d
        } else if (typesDeQuestions === 'b_multiple_de_d') {
          typesDeQuestions = 'd_multiple_de_b' // comme on a échangé les 2 fractions, le type de la question change
          k = d / b
        }
      }
      texte = `$${texFraction(a, b)}${plusOuMoins}${texFraction(c, d)}$`
      texteCorr = `$${texFraction(a, b)}${plusOuMoins}${texFraction(c, d)}`

      // a/b(+ou-)c/d = num/den (résultat non simplifié)
      if (typesDeQuestions === 'ppcm' || typesDeQuestions === 'premiers_entre_eux') {
        texteCorr += `=${texFraction(a + miseEnEvidence('\\times ' + k1), b + miseEnEvidence('\\times ' + k1))}${plusOuMoins}${texFraction(c + miseEnEvidence('\\times ' + k2), d + miseEnEvidence('\\times ' + k2))}`
        num = calcul(a * k1 + plusOuMoinsUn * c * k2)
        den = b * k1
        texteCorr += `=${texFraction(a * k1 + plusOuMoins + ecritureParentheseSiNegatif(c * k2), den)}`
      }

      if (typesDeQuestions === 'd_multiple_de_b') {
        texteCorr += `=${texFraction(a + miseEnEvidence('\\times ' + k), b + miseEnEvidence('\\times ' + k))}${plusOuMoins}${texFraction(c, d)}`
        num = calcul(a * k + plusOuMoinsUn * c)
        den = b * k
        texteCorr += `=${texFraction(a * k + plusOuMoins + ecritureParentheseSiNegatif(c), den)}`
      }

      if (typesDeQuestions === 'b_multiple_de_d') {
        texteCorr += `=${texFraction(a, b)}${plusOuMoins}${texFraction(c + miseEnEvidence('\\times ' + k), d + miseEnEvidence('\\times ' + k))}`
        num = calcul(a + plusOuMoinsUn * c * k)
        den = b
        texteCorr += `=${texFraction(a + plusOuMoins + ecritureParentheseSiNegatif(c * k), den)}`
      }

      if (typesDeQuestions === 'entier') {
        a = randint(1, 9)
        b = randint(2, 9, [a])
        let n = randint(1, 9)
        if (this.sup2) {
          a = a * choice([-1, 1])
          n = n * choice([-1, 1])
        }
        if (choice([true, false])) {
          // n+-a/b
          if (!this.sup2 && plusOuMoins === '-' && n < a / b) {
            n = randint(5, 9) // max(a/b)=9/2
          }
          texte = `$${n}${plusOuMoins}${texFraction(a, b)}$`
          texteCorr = texte
          texteCorr += `$=${texFraction(n + miseEnEvidence('\\times ' + b), miseEnEvidence(b))}${plusOuMoins}${texFraction(a, b)}`
          texteCorr += `=${texFraction(n * b + plusOuMoins + ecritureParentheseSiNegatif(a), b)}`
          num = calcul(n * b + plusOuMoinsUn * a)
        } else {
          // a/b +-n
          if (!this.sup2 && plusOuMoins === '-' && n > a / b) {
            n = randint(1, 4) //
            a = n * b + randint(1, 9) // (n*b+?)/b-n>0
          }
          texte = `$${texFraction(a, b)}${plusOuMoins}${ecritureParentheseSiNegatif(n)}`
          texteCorr = texte
          texte += '$'
          texteCorr += `=${texFraction(a, b)}${plusOuMoins}${texFraction(n + miseEnEvidence('\\times ' + b), miseEnEvidence(b))}`
          texteCorr += `=${texFraction(a + plusOuMoins + ecritureParentheseSiNegatif(n * b), b)}`
          num = calcul(a + plusOuMoinsUn * n * b)
        }
        den = b
      }

      if (this.sup3) {
        texteCorr += `=${texFraction(num, den)}`
        texteCorr += simplificationDeFractionAvecEtapes(num, den) + '$'
      } else {
        texteCorr += `=${texFraction(num, den)}`
        texteCorr += '$'
      }

      const myTexteCorrCol = texteCorr
      if (this.sup4) {
        texteCorr = ''
        // On redécoupe comme un chacal
        const etapes = myTexteCorrCol.split('=')
        texteCorr += `${lettreDepuisChiffre(i + 1)} = $${etapes[0].replace('$', '')}$ <br>`
        for (let w = 1; w < etapes.length - 1; w++) {
          if (context.isHtml) {
            texteCorr += '<br>'
          }
          texteCorr += `${lettreDepuisChiffre(i + 1)} = $${etapes[w]}$ <br>`
        }
        if (context.isHtml) {
          texteCorr += '<br>'
        }
        texteCorr += `${lettreDepuisChiffre(i + 1)} = $${etapes[etapes.length - 1].replace('$', '')}$ <br>`
      } else {
        texteCorr = myTexteCorrCol
      }
      // Pour l'instant pour tester je mets num et den dans reponse

      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline nospacebefore', { texte: '=' })
      }
      reponse = fraction(num, den).simplifie()
      setReponse(this, i, reponse, { digits: 4, digitsNum: 2, digitsDen: 2, formatInteractif: 'fraction' })
      if (context.isAmc) texte = 'Calculer et donner le résultat sous forme irréductible\\\\\n' + texte
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }

    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, "1 : Un dénominateur multiple de l'autre\n2 : Cas général"]
  this.besoinFormulaire2CaseACocher = ['Avec des nombres relatifs']
  this.besoinFormulaire3CaseACocher = ['Avec l\'écriture simplifiée de la fraction résultat']
  this.besoinFormulaire4CaseACocher = ['Présentation des corrections en colonnes', false]
}
