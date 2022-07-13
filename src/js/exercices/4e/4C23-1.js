import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, abs, pgcd, produitDeDeuxFractions, simplificationDeFractionAvecEtapes, miseEnEvidence, texFractionSigne, obtenirListeFractionsIrreductibles, obtenirListeFractionsIrreductiblesFaciles, texFraction, ppcm, lettreDepuisChiffre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { fraction } from '../../modules/fractions.js'
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
export default function ExerciceAdditionnerFractionProduit () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 3
  this.sup2 = false
  this.sup3 = true
  this.sup4 = true
  this.titre = titre
  this.consigne = 'Calculer sous la forme d\'un nombre rationnel relatif irréductible'
  this.nbCols = 2
  this.spacing = 1
  this.spacingCorr = 2
  this.nbQuestions = 6
  this.nbColsCorr = this.sup4 ? 2 : 1;
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = []    // Liste de questions
    this.listeCorrections = []  // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestionsDisponibles
    const listeFractions = obtenirListeFractionsIrreductibles()
    const listeFractionsFaciles = obtenirListeFractionsIrreductiblesFaciles()
    let piegeObligatoire = false;
    
    // Définition des styles d'exercices
    switch (this.sup) {
      case 1: // Fractions faciles, tout enchaînement d'opérations possibles
        typesDeQuestionsDisponibles = [1, 2]
        break;
        
      case 2: // Fractions standards, tout enchaînement d'opérations possibles
        typesDeQuestionsDisponibles = [1, 2]
        break;

      case 3: // Uniquement expressions pièges démarrant sur une opération prioritaire *ou pas*
        typesDeQuestionsDisponibles = [1, 2]
        piegeObligatoire = true;
        break;

      case 4: // Uniquement des expressions pièges démarrant sur une opération non prioritaire`
        typesDeQuestionsDisponibles = [1]           
        piegeObligatoire = true;
        break;

      default: // En cas de pépin…
        typesDeQuestionsDisponibles = [1]
        break;      
    }

    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )

    for (
      let i = 0,
        ab = Array(2),
        cd = Array(2),
        ef = Array(2),
        a,
        b,
        c,
        d,
        e,
        f,
        p,
        k1,
        k2,
        reponse,
        operation1,
        operation2,
        texteOperation1,
        texteOperation2,
        texte,
        texteCorr,
        produit = Array(3),
        typesDeQuestions,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      
      if (this.sup === 1) {
        ab = choice(listeFractionsFaciles); cd = choice(listeFractionsFaciles); ef = choice(listeFractionsFaciles)
      } else {
        ab = choice(listeFractions); cd = choice(listeFractions); ef = choice(listeFractions)
      }
      
      [a, b] = ab;
      [c, d] = cd;
      [e, f] = ef;
      
      if(this.sup2) { [a,b,c,d,e,f] = [a,b,c,d,e,f].map(e => e * randint(-1, 1, [0])); }
     
      operation1 = randint(0,1);                  // Pioche la soustraction (0) ou l'addition (1)
      operation2 = this.sup3 ? randint(0,1) : 1;  // Si l'option est cochée, Pioche la division (0) ou la multiplication (1)
      texteOperation1 = operation1 ? '+' : '-';
      texteOperation2 = operation2 ? ' \\times ' : ' \\div ';
      texte = '';

      switch (typesDeQuestions) {
        case 1: // De la forme : « a⁄b ± c⁄d ×÷ e⁄f »
          if (piegeObligatoire) { d = b };
        
          texte += `$${texFraction(a, b)} ${texteOperation1} ${texFraction(c, d)} ${texteOperation2} ${texFraction(e, f)}$`

          texteCorr = `$${texFraction(a, b)} ${texteOperation1} ${texFraction(c, d)} ${texteOperation2} ${texFraction(e, f)}$`
          if(!operation2) { // Si il y a division, multiplier par l'inverse du diviseur
            [e, f] = [f, e]
            texteCorr += `$=${texFraction(a, b)} ${texteOperation1} ${texFraction(c, d)} \\times ${texFraction(e, f)}$`
          }
          produit = produitDeDeuxFractions(c, d, e, f)
          if (this.correctionDetaillee) {
            texteCorr += `$=${texFraction(a, b)} ${texteOperation1} ${texFraction(c + '\\times' + e, d + '\\times' + f)}$`
            texteCorr += `$=${texFraction(a, b)} ${texteOperation1} ${texFraction(c * e, d * f)}$`
          } else {
            texteCorr += `$=${texFraction(a, b)} ${texteOperation1} ${produit[1]}$`
            texteCorr += `$=${texFraction(a, b)} ${texteOperation1} ${produit[0]}$`
          }
          
          // faut-il simplifier c×e⁄d×f ?
          if (!this.correctionDetaillee) {
            [c, d, e, f] = produit[2]
          }
          p = pgcd(c * e, d * f)
          if (p !== 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texteCorr += `$=${texFraction(a, b)} ${texteOperation1} ${texFraction((e * c) / p + '\\times\\cancel{' + p + '}', (f * d) / p + '\\times\\cancel{' + p + '}'
            )}$`
            c = (e * c) / p
            d = (f * d) / p
          } else {
            c = e * c
            d = f * d
          }
          p = ppcm(b, d) // p = dénominateur commun
          k1 = p / b
          k2 = p / d
          if (k1 !== 1) {
            texteCorr += `$=${texFraction(a + miseEnEvidence('\\times' + k1), b + miseEnEvidence('\\times' + k1))}$`
          } else {
            if (k2 !== 1) {
              texteCorr += `$=${texFraction(a, b)}$`
            }
          }
          if (k2 !== 1) {
            texteCorr += `$ ${texteOperation1} ${texFraction(c + miseEnEvidence('\\times' + k2), d + miseEnEvidence('\\times' + k2))}$`
          } else {
            if (k1 !== 1) {
              texteCorr += `$ ${texteOperation1} ${texFraction(c, d)}$`
            }
          }

          texteCorr += `$=${texFraction(a * k1, p)} ${texteOperation1} ${texFraction(c * k2, p)}$`
          e = operation1 ? a * k1 + c * k2 : a * k1 - c * k2;
          f = p
          texteCorr += `$=${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$`
          reponse = fraction(e, f).simplifie()
          break;

        case 2: // De la forme : « c⁄d ×÷ e⁄f ± a⁄b »
          if (piegeObligatoire) { f = b };
          texte += `$${texFraction(c, d)} ${texteOperation2} ${texFraction(e, f)} ${texteOperation1} ${texFraction(a, b)}$`
          
          texteCorr = `$${texFraction(c, d)} ${texteOperation2} ${texFraction(e, f)} ${texteOperation1} ${texFraction(a, b)}$`
          if(!operation2) { // Si il y a division, multiplier par l'inverse du diviseur
            [e, f] = [f, e]
            texteCorr += `$=${texFraction(c, d)} \\times ${texFraction(e, f)} ${texteOperation1} ${texFraction(a, b)}$`
          }
          
          produit = produitDeDeuxFractions(c, d, e, f)
          texteCorr += `$=${texFraction(c, d)}\\times ${texFraction(e, f)} ${texteOperation1} ${texFraction(a, b)}$`
          if (this.correctionDetaillee) {
            texteCorr += `$=${texFraction(c + '\\times' + e, d + '\\times' + f)} ${texteOperation1} ${texFraction(a, b)}$`
            texteCorr += `$=${texFraction(c * e, d * f)} ${texteOperation1} ${texFraction(a, b)}$`
          } else {
            texteCorr += `$=${produit[1]} ${texteOperation1} ${texFraction(a, b)}$`
            texteCorr += `$=${produit[0]} ${texteOperation1} ${texFraction(a, b)}$`
          }
          
          // faut-il simplifier c×e⁄d×f ?
          if (!this.correctionDetaillee) {
            [c, d, e, f] = produit[2]
          }
          p = pgcd(c * e, d * f)
          if (p !== 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texteCorr += `$=${texFraction((e * c) / p + '\\times\\cancel{' + p + '}', (f * d) / p + '\\times\\cancel{' + p + '}')} ${texteOperation1} ${texFraction(a, b)}$`
            c = (e * c) / p
            d = (f * d) / p
          } else {
            c = e * c
            d = f * d
          }
          p = ppcm(b, d) // p = dénominateur commun
          k1 = p / b
          k2 = p / d
          if (k2 !== 1) {
            texteCorr += `$=${texFraction(
            c + miseEnEvidence('\\times' + k2),
            d + miseEnEvidence('\\times' + k2)
          )}$`
          } else {
            if (k1 !== 1) {
              texteCorr += `$=${texFraction(c, d)}$`
            }
          }

          if (k1 !== 1) {
            texteCorr += `$ ${texteOperation1} ${texFraction(
            a + miseEnEvidence('\\times' + k1),
            b + miseEnEvidence('\\times' + k1)
          )}$`
          } else {
            if (k2 !== 1) {
              texteCorr += `$ ${texteOperation1} ${texFraction(a, b)}$`
            }
          }

          if (this.correctionDetaillee) {
            texteCorr += `$=${texFraction(c * k2, p)} ${texteOperation1} ${texFraction(a * k1, p)}$`
          }
          e = operation1 ? c * k2 + a * k1 : c * k2 - a * k1 ;
          f = p

          texteCorr += `$=${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$`
          reponse = fraction(e, f).simplifie()
          break;
      }

      if (this.questionJamaisPosee(i, a, b, c, d, typesDeQuestions)) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
        setReponse(this, i, reponse, { formatInteractif: 'fraction', digits: 5, digitsNum: 3, digitsDen: 2, signe: true })
        if (this.sup4) {
          texte = `${lettreDepuisChiffre(i + 1)} = ${texte}`
          // On découpe
          const etapes = texteCorr.split('=')
          texteCorr = ''
          etapes.forEach(function (etape) {
            // etape = etape.replace('$', '')
            etape = etape.split('$').join('')
            if (context.isHtml) {
              texteCorr += '<br>'
            }
            texteCorr += `${lettreDepuisChiffre(i + 1)} = $${etape}$ <br>`
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
    `Style d'expressions`,
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