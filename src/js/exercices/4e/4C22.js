import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, obtenirListeFractionsIrreductibles, obtenirListeNombresPremiers, contraindreValeur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
import FractionX from '../../modules/FractionEtendue.js'
export const titre = 'Multiplier ou/et diviser des fractions'
export const amcReady = true
export const amcType = 'AMCNum' // type de question AMC
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDeModifImportante = '09/04/2022'

/**
 * Exercice de calcul de produit de deux fractions.
 *
 * Paramétrages possibles :
 * * 1 : Produits de nombres positifs seulement
 * * 2 : deux questions niveau 1 puis deux questions niveau 3
 * * 3 : Produits de nombres relatifs
 * * Si décomposition cochée : les nombres utilisés sont plus importants.
 * @author Jean-Claude Lhote
 * Ajout d'une option pour ne pas exiger une fraction irréductible le 09/04/2022 par Guillaume Valmont
 * 4C22
 */
export const uuid = '72ce7'
export const ref = '4C22'
export default function ExerciceMultiplierFractions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1 // Avec ou sans relatifs
  this.sup3 = true
  if (context.isAmc) this.titre = 'Multiplier des fractions et donner le résultat sous forme irréductible'
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.sup2 = false // méthode
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestionsDisponibles
    const listeFractions = obtenirListeFractionsIrreductibles()
    const fractionIrreductibleDemandee = this.sup3
    if (fractionIrreductibleDemandee) {
      this.consigne = 'Calculer et donner le résultat sous forme irréductible.'
    } else {
      this.consigne = 'Calculer.'
    }
    this.sup = contraindreValeur(1, 3, this.sup, 1)
    this.sup4 = contraindreValeur(1, 3, this.sup4, 1)
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1, 2, 2, 2]// 1*nombre entier,3*fraction (pas de négatifs)
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2, 3] // fractions, 50% fractions positives 50% fractions avec relatifs
    } else {
      typesDeQuestionsDisponibles = [3]
    }
    // On choisit les opérations en fonction de this.sup4
    const typesDoperation = []
    if (this.sup4 % 2 === 1) typesDoperation.push('mul')
    if (this.sup4 > 1) typesDoperation.push('div')
    const listeTypesDoperation = combinaisonListes(typesDoperation, this.nbQuestions)
    let nombreDeSigneMoins
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )
    for (
      let i = 0, a, b, c, d, texte, texteCorr, reponse, typesDeQuestions, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      do {
        const ab = choice(listeFractions)
        const cd = choice(listeFractions);
        [a, b] = ab;
        [c, d] = cd
      } while ((a * c) % (b * d) === 0 || (a * c) % d === 0 || (b * d === 100))

      if (this.sup2 === false) {
        // methode 1 : simplifications finale
        switch (typesDeQuestions) {
          case 1: // entier * fraction (tout positif)
            if (a === 1) {
              a = randint(2, 9)
            }
            if (a === c) {
              a = a + 1
            }
            b = 1
            break
          case 2: // fraction * fraction tout positif
            break

          case 3:
            do {
              a = a * choice([-1, 1])
              b = b * choice([-1, 1])
              c = c * choice([-1, 1])
              d = d * choice([-1, 1])
              nombreDeSigneMoins = (a < 0) + (b < 0) + (c < 0) + (d < 0)
            } while (nombreDeSigneMoins < 2)
            break
        }
      } else {
        // méthode 2 : décomposition
        if (a === c) {
          a++
        }
        const facteurA = obtenirListeNombresPremiers()[randint(1, 5)]
        const facteurB = obtenirListeNombresPremiers()[randint(1, 5, [facteurA])]
        a = a * facteurA
        d = d * facteurA
        b = b * facteurB
        c = c * facteurB
        switch (typesDeQuestions) {
          case 1: // entier * fraction (tout positif)
            b = 1
            break
          case 2: // fraction * fraction tout positif
            break
          case 3:
            do {
              a = a * choice([-1, 1])
              b = b * choice([-1, 1])
              c = c * choice([-1, 1])
              d = d * choice([-1, 1])
              nombreDeSigneMoins = (a < 0) + (b < 0) + (c < 0) + (d < 0)
            } while (nombreDeSigneMoins < 2)
            break
        }
      }
      const f1 = new FractionX(a, b)
      const f2 = new FractionX(c, d)
      if (listeTypesDoperation[i] === 'mul') {
        texte = `$${f1.texFSD}\\times${f2.texFraction}=$`
        texteCorr = `$${f1.texProduitFraction(f2, this.sup2)}$`
        reponse = f1.produitFraction(f2).simplifie()
      } else {
        texte = `$\\dfrac{${f1.texFSD}}{${f2.texFraction}}=$`
        texteCorr = `$${f1.texDiviseFraction(f2, this.sup2)}$`
        reponse = f1.diviseFraction(f2).simplifie()
      }
      if (this.questionJamaisPosee(i, a, b, c, d, typesDeQuestions)) {
        // Si la question n'a jamais été posée, on en créé une autre
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
        if (fractionIrreductibleDemandee) {
          if (context.isAmc) texte = 'Calculer et donner la réponse sous forme irréductible\\\\\n' + texte
          setReponse(this, i, reponse, { formatInteractif: 'fraction', digits: 5, digitsNum: 3, digitsDen: 2, signe: true })
        } else {
          if (context.isAmc) texte = 'Calculer\\\\\n' + texte
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale', digits: 5, digitsNum: 3, digitsDen: 2, signe: true })
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    3,
    ' 1 : Tout positif avec une fois sur 4 un entier\n 2 : Deux fractions (50% de type 1 et 50% de type 3)\n3 : Fractions avec nombres relatifs (au moins 2 négatifs)'
  ]
  this.besoinFormulaire2CaseACocher = ['Avec décomposition']
  this.besoinFormulaire3CaseACocher = ['Demander une fraction irréductible']
  this.besoinFormulaire4Numerique = ['Type d\'opération', 3, '1 : Multiplication\n2 : Division\n3 : Mélange']
}
