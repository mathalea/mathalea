import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, pgcd, produitDeDeuxFractions, simplificationDeFractionAvecEtapes, miseEnEvidence, obtenirListeFractionsIrreductibles, obtenirListeFractionsIrreductiblesFaciles, texFraction, ppcm, lettreDepuisChiffre, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { fraction } from '../../modules/fractions.js'
import FractionX from '../../modules/FractionEtendue.js'
export const titre = 'Fractions et priorités opératoires'
export const amcReady = true
export const amcType = 'AMCNum' // type de question AMC
export const interactifReady = true
export const interactifType = 'mathLive'
/** Styles d'expressions :
    1 : Fractions faciles, tout enchaînement d'opérations possibles
    2 : Fractions standards, tout enchaînement d'opérations possibles
    3 : Des expressions pièges démarrant sur une opération prioritaire ou pas
    4 : Uniquement des expressions pièges démarrant sur une opération non prioritaire`
 * @author Jean-Claude Lhote
 * Référence 4C23
 */
export const uuid = '18ddd'
export const ref = '4C23-1'
export default function ExerciceAdditionnerFractionProduit () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 3
  this.sup2 = false
  this.sup3 = true
  this.sup4 = true
  this.titre = titre
  this.consigne = 'Calculer et donner un résultat simplifié.'
  this.nbCols = 2
  this.spacing = 1
  this.spacingCorr = 2
  this.nbQuestions = 6
  this.nbColsCorr = this.sup4 ? 2 : 1
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestionsDisponibles
    const listeFractions = obtenirListeFractionsIrreductibles()
    const listeFractionsFaciles = obtenirListeFractionsIrreductiblesFaciles()
    let piegeObligatoire = false

    // Définition des styles d'exercices
    switch (this.sup) {
      case 1: // Fractions faciles, tout enchaînement d'opérations possibles
        typesDeQuestionsDisponibles = [1, 2]
        break

      case 2: // Fractions standards, tout enchaînement d'opérations possibles
        typesDeQuestionsDisponibles = [1, 2]
        break

      case 3: // Uniquement expressions pièges démarrant sur une opération prioritaire *ou pas*
        typesDeQuestionsDisponibles = [1, 2]
        piegeObligatoire = true
        break

      case 4: // Uniquement des expressions pièges démarrant sur une opération non prioritaire`
        typesDeQuestionsDisponibles = [1]
        piegeObligatoire = true
        break

      default: // En cas de pépin…
        typesDeQuestionsDisponibles = [1]
        break
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)

    const texFractionND = function (a) {
      return `\\dfrac{${(a.num)}}{${a.den}}`
    }

    const texProduitFraction = function (f1, f2) {
      // sans gérer les parenthèses et les nombres entiers...
      return `${texFractionND(f1)}\\times ${texFractionND(f2)}=\\dfrac{${f1.num + '\\times' + ecritureParentheseSiNegatif(f2.num)}}{${f1.den + '\\times' + ecritureParentheseSiNegatif(f2.den)}} = \\dfrac{ ${f1.num * f2.num} }{${f1.den * f2.den}}`
    }

    const differenceFraction = function (f1, f2) {
      if (f1.den === f2.den) { // on ajoute 2 fractions de même dénominateur
        return new FractionX(f1.num - f2.num, f2.den)
      } else {
        window.notify('differenceFraction seulement avec le même dénominateur : division par zéro', { f1, f2 })
        return NaN
      }
    }

    const simplifySign = function (f1) {
      if (f1.s > 0 && f1.num < 0) return [new FractionX(f1.num * -1, f1.den * -1), true]
      else if (f1.s < 0 && f1.den < 0) return [new FractionX(f1.num * -1, f1.den * -1), true]
      else {
        return [new FractionX(f1.num, f1.den), false]
      }
    }

    for (let i = 0, a, b, c, d, e, f, reponse, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const typesDeQuestions = listeTypeDeQuestions[i]

      if (this.sup === 1) {
        [a, b] = choice(listeFractionsFaciles); [c, d] = choice(listeFractionsFaciles); [e, f] = choice(listeFractionsFaciles)
      } else {
        [a, b] = choice(listeFractions); [c, d] = choice(listeFractions); [e, f] = choice(listeFractions)
      }

      if (this.sup2) { [a, b, c, d, e, f] = [a, b, c, d, e, f].map(e => e * randint(-1, 1, [0])) }

      const operation1 = randint(0, 1) // Pioche la soustraction (0) ou l'addition (1)
      const operation2 = this.sup3 ? randint(0, 1) : 1 // Si l'option est cochée, Pioche la division (0) ou la multiplication (1)
      const texteOperation1 = operation1 ? '+' : '-'
      const texteOperation2 = operation2 ? ' \\times ' : ' \\div '
      texte = ''

      switch (typesDeQuestions) {
        case 1: { // De la forme : « a⁄b ± c⁄d ×÷ e⁄f »
          if (piegeObligatoire) { d = b };

          let f1 = new FractionX(a, b)
          const f2 = new FractionX(c, d)
          let f3 = new FractionX(e, f)
          texteCorr = `$${f1.texFraction} ${texteOperation1} ${f2.texFraction} ${texteOperation2} ${f3.texFraction}$`

          texte += texteCorr
          if (!operation2) { // Si il y a division, multiplier par l'inverse du diviseur
            f3 = f3.inverse()
            texteCorr += `$=${f1.texFraction} ${texteOperation1} ${f2.texFraction} \\times ${texFractionND(f3)}$`
          }

          let produit = f2.produitFraction(f3)
          if (this.correctionDetaillee) {
            texteCorr += '$'
            const pdt = texProduitFraction(f2, f3)
            const etapes = pdt.split('=')
            etapes.forEach(function (etape, index) {
              if (index > 0) texteCorr += `=${f1.texFraction} ${texteOperation1}  ${etape}`
            })
            texteCorr += '$'
          } else {
            texteCorr += `$=${f1.texFraction} ${texteOperation1} ${produit.texFraction}$`
          }

          // on gere les signes
          const modify1 = simplifySign(f1)
          const modify2 = simplifySign(produit)
          if (modify1[1] || modify2[1]) {
            f1 = modify1[0]
            produit = modify2[0]
            texteCorr += `$=${f1.texFraction} ${texteOperation1} ${produit.texFraction}$`
          }

          // faut-il simplifier c×e⁄d×f ?
          let p = pgcd(produit.num, produit.den)
          if (p !== 1 && ppcm(f1.den, produit.den) > ppcm(f1.den, (produit.den) / p)) {
            texteCorr += `$=${f1.texFraction} ${texteOperation1} ${texFraction((produit.num) / p + '\\times\\cancel{' + ecritureParentheseSiNegatif(p) + '}', (produit.den) / p + '\\times\\cancel{' + ecritureParentheseSiNegatif(p) + '}')}$`
            produit = new FractionX(produit.num / p, produit.den / p)
          }

          p = ppcm(f1.den, produit.den) // p = dénominateur commun
          const k1 = p / f1.den
          const k2 = p / produit.den
          if (k1 !== 1) {
            texteCorr += `$=${texFraction(f1.num + miseEnEvidence('\\times' + ecritureParentheseSiNegatif(k1)), f1.den + miseEnEvidence('\\times' + ecritureParentheseSiNegatif(k1)))}$`
            f1 = new FractionX(f1.num * k1, f1.den * k1)
          } else {
            if (k2 !== 1) {
              texteCorr += `$=${f1.texFraction}$`
            }
          }
          if (k2 !== 1) {
            texteCorr += `$ ${texteOperation1} ${texFraction(produit.num + miseEnEvidence('\\times' + ecritureParentheseSiNegatif(k2)), produit.den + miseEnEvidence('\\times' + ecritureParentheseSiNegatif(k2)))}$`
            produit = new FractionX(produit.num * k2, produit * k2)
          } else {
            if (k1 !== 1) {
              texteCorr += `$ ${texteOperation1} ${produit.texFraction}$`
            }
          }
          if (k1 !== 1 || k2 !== 1) {
            texteCorr += `$=${f1.texFraction} ${texteOperation1} ${produit.texFraction}$`
          }
          texteCorr += `$=\\dfrac{${f1.num} ${texteOperation1} ${ecritureParentheseSiNegatif(produit.num)}}{${f1.den}}$`
          f1 = operation1 ? f1.sommeFraction(produit) : differenceFraction(f1, produit)
          texteCorr += `$=${f1.texFraction}${f1.texSimplificationAvecEtapes(true)}$`
          reponse = f1.simplifie()
          break
        }
        case 2: { // De la forme : « c⁄d ×÷ e⁄f ± a⁄b »
          if (piegeObligatoire) { f = b };

          let f3 = new FractionX(a, b)
          const f1 = new FractionX(c, d)
          let f2 = new FractionX(e, f)

          texteCorr = `$${f1.texFraction} ${texteOperation2} ${f2.texFraction} ${texteOperation1} ${f3.texFraction}$`
          texte += texteCorr
          if (!operation2) { // Si il y a division, multiplier par l'inverse du diviseur
            f2 = f2.inverse()
            texteCorr += `$=${f1.texFraction} \\times ${texFractionND(f2)} ${texteOperation1} ${f3.texFraction}$`
          }

          let produit = f1.produitFraction(f2)
          if (this.correctionDetaillee) {
            texteCorr += '$'
            const pdt = texProduitFraction(f1, f2)
            const etapes = pdt.split('=')
            etapes.forEach(function (etape, index) {
              if (index > 0) texteCorr += `= ${etape} ${texteOperation1} ${f3.texFraction}`
            })
            texteCorr += '$'
          } else {
            texteCorr += `$=${produit.texFraction} ${texteOperation1} ${f3.texFraction}$`
          }

          // on gere les signes
          const modify1 = simplifySign(f3)
          const modify2 = simplifySign(produit)
          if (modify1[1] || modify2[1]) {
            f3 = modify1[0]
            produit = modify2[0]
            texteCorr += `$=${produit.texFraction} ${texteOperation1} ${f3.texFraction}$`
          }

          // faut-il simplifier c×e⁄d×f ?
          let p = pgcd(produit.num, produit.den)
          if (p !== 1 && ppcm(f3.den, produit.den) > ppcm(f3.den, (produit.den) / p)) {
            texteCorr += `$=${texFraction((produit.num) / p + '\\times\\cancel{' + ecritureParentheseSiNegatif(p) + '}', (f * d) / p + '\\times\\cancel{' + ecritureParentheseSiNegatif(p) + '}')} ${texteOperation1} ${f3.texFraction}$`
            produit = new FractionX(produit.num / p, produit.den / p)
          }

          p = ppcm(f3.den, produit.den) // p = dénominateur commun
          const k1 = p / f3.den
          const k2 = p / produit.den
          if (k2 !== 1) {
            texteCorr += `$=${texFraction(produit.num + miseEnEvidence('\\times' + ecritureParentheseSiNegatif(k2)), produit.den + miseEnEvidence('\\times' + ecritureParentheseSiNegatif(k2)))}$`
            produit = new FractionX(produit.num * k2, produit.den * k2)
          } else {
            if (k1 !== 1) {
              texteCorr += `$=${produit.texFraction}$`
            }
          }

          if (k1 !== 1) {
            texteCorr += `$ ${texteOperation1} ${texFraction(f3.num + miseEnEvidence('\\times' + ecritureParentheseSiNegatif(k1)), f3.den + miseEnEvidence('\\times' + ecritureParentheseSiNegatif(k1)))}$`
            f3 = new FractionX(f3.num * k1, f3.den * k1)
          } else {
            if (k2 !== 1) {
              texteCorr += `$ ${texteOperation1} ${f3.texFraction}$`
            }
          }

          if (k1 !== 1 || k2 !== 1) {
            texteCorr += `$=${produit.texFraction} ${texteOperation1} ${f3.texFraction}$`
          }

          texteCorr += `$=\\dfrac{${produit.num} ${texteOperation1} ${ecritureParentheseSiNegatif(f3.num)}}{${f3.den}}$`
          f3 = operation1 ? produit.sommeFraction(f3) : differenceFraction(produit, f3)
          texteCorr += `$=${f3.texFraction}${f3.texSimplificationAvecEtapes(true)}$`
          reponse = f3.simplifie()
          break
        }
      }

      if (this.questionJamaisPosee(i, a, b, c, d, typesDeQuestions)) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
        setReponse(this, i, reponse, { formatInteractif: 'fraction', digits: 5, digitsNum: 3, digitsDen: 2, signe: true })
        if (this.sup4) {
          texte = `$${lettreDepuisChiffre(i + 1)} = $ ${texte}`
          // On découpe
          const etapes = texteCorr.split('=')
          texteCorr = ''
          etapes.forEach(function (etape) {
            // etape = etape.replace('$', '')
            etape = etape.split('$').join('')
            if (context.isHtml) {
              texteCorr += '<br>'
            }
            texteCorr += `$ ${lettreDepuisChiffre(i + 1)} = ${etape}$ <br>`
          })
        }
        if (context.isAmc) texte = 'Calculer et donner le résultat sous forme irréductible\\\\\n' + texte
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
  this.besoinFormulaireNumerique = [
    'Style d\'expressions',
    4,
`   1 : Fractions faciles, tout enchaînement d'opérations possibles
    2 : Fractions standards, tout enchaînement d'opérations possibles
    3 : Des expressions pièges démarrant sur une opération prioritaire ou pas
    4 : Uniquement des expressions pièges démarrant sur une opération non prioritaire`
  ]
  this.besoinFormulaire2CaseACocher = ['Utiliser les nombres relatifs', false]
  this.besoinFormulaire3CaseACocher = ['Utiliser les divisions', true]
  this.besoinFormulaire4CaseACocher = ['Présentation des calculs en colonnes', true]
}
