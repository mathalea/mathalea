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
/**
 * * Calcul fractionnaire : somme d'une fraction et du produit de deux autres fractions. Paramétrages possibles :
 * 1 : Calcul avec nombres positifs sans piège de priorité
 * * 2 : Calcul avec nombres positifs avec piège
 * * 3 : Calcul avec nombres relatifs
 * @author Jean-Claude Lhote
 * 4C23
 */
export default function ExerciceAdditionnerFractionProduit () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1 // Avec ou sans relatifs
  this.titre = titre
  this.consigne = 'Calculer et donner le résultat sous forme irréductible'
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestionsDisponibles
    const listeFractions = obtenirListeFractionsIrreductibles()
    const listeFractionsFaciles = obtenirListeFractionsIrreductiblesFaciles()
    let nombreDeSigneMoins
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1, 2, 3, 4]// fractions faciles, relatifs
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = [1, 2, 3, 2]// 1*nombre entier,3*fraction (pas de négatifs)
    } else if (this.sup === 3) {
      typesDeQuestionsDisponibles = [3, 3, 4, 4]// fractions, 2*positifs, 2*relatifs
    } else {
      typesDeQuestionsDisponibles = [4]
    }

    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )
    for (
      let i = 0,
        ab = [],
        cd = [],
        ef = [],
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
        signe1,
        signe2,
        texte,
        texteCorr,
        produit = [],
        typesDeQuestions,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      if (this.sup === 1) { ab = choice(listeFractionsFaciles); cd = choice(listeFractionsFaciles); ef = choice(listeFractionsFaciles) } else { ab = choice(listeFractions); cd = choice(listeFractions); ef = choice(listeFractions) }

      a = ab[0]
      b = ab[1]
      c = cd[0]
      d = cd[1]
      e = ef[0]
      f = ef[1]
      switch (typesDeQuestions) {
        case 1: // sans piège fraction1 + fraction2 x fraction3 (tout positif)
          texte = `$${texFraction(a, b)}+${texFraction(c, d)}\\times${texFraction(e, f)}$`

          texteCorr = `$${texFraction(a, b)}+${texFraction(c, d)}\\times${texFraction(e, f)}$`
          produit = produitDeDeuxFractions(c, d, e, f)
          if (this.correctionDetaillee) {
            texteCorr += `$=${texFraction(a, b)}+${texFraction(c + '\\times' + e, d + '\\times' + f)}$`
            texteCorr += `$=${texFraction(a, b)}+${texFraction(c * e, d * f)}$`
          } else {
            texteCorr += `$=${texFraction(a, b)}+${produit[1]}$`
            texteCorr += `$=${texFraction(a, b)}+${produit[0]}$`
          }
          // faut-il simplifier c*e/d*f
          if (!this.correctionDetaillee) {
            [c, d, e, f] = produit[2]
          }
          p = pgcd(c * e, d * f)
          if (p !== 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texteCorr += `$=${texFraction(a, b)}+${texFraction((e * c) / p + '\\times\\cancel{' + p + '}', (f * d) / p + '\\times\\cancel{' + p + '}'
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
            texteCorr += `$=${texFraction(
              a + miseEnEvidence('\\times' + k1),
              b + miseEnEvidence('\\times' + k1)
            )}$`
          } else {
            if (k2 !== 1) {
              texteCorr += `$=${texFraction(a, b)}$`
            }
          }
          if (k2 !== 1) {
            texteCorr += `$+${texFraction(
              c + miseEnEvidence('\\times' + k2),
              d + miseEnEvidence('\\times' + k2)
            )}$`
          } else {
            if (k1 !== 1) {
              texteCorr += `$+${texFraction(c, d)}$`
            }
          }

          texteCorr += `$=${texFraction(a * k1, p)}+${texFraction(c * k2, p)}$`
          e = a * k1 + c * k2
          f = p

          texteCorr += `$=${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$`
          reponse = fraction(e, f).simplifie()
          break

        case 2: // sans piège fraction2 x fraction3 + fraction1  (tout positif)
          texte = `$${texFraction(c, d)}\\times${texFraction(e, f)}+${texFraction(a, b)}$`
          produit = produitDeDeuxFractions(c, d, e, f)
          texteCorr = `$${texFraction(c, d)}\\times${texFraction(e, f)}+${texFraction(a, b)}$`
          if (this.correctionDetaillee) {
            texteCorr += `$=${texFraction(c + '\\times' + e, d + '\\times' + f)}+${texFraction(a, b)}$`
            texteCorr += `$=${texFraction(c * e, d * f)}+${texFraction(a, b)}$`
          } else {
            texteCorr += `$=${produit[1]}+${texFraction(a, b)}$`
            texteCorr += `$=${produit[0]}+${texFraction(a, b)}$`
          }
          // faut-il simplifier c*e/d*f
          if (!this.correctionDetaillee) {
            [c, d, e, f] = produit[2]
          }
          p = pgcd(c * e, d * f)
          if (p !== 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texteCorr += `$=${texFraction((e * c) / p + '\\times\\cancel{' + p + '}', (f * d) / p + '\\times\\cancel{' + p + '}')}+${texFraction(a, b)}$`
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
            texteCorr += `$+${texFraction(
            a + miseEnEvidence('\\times' + k1),
            b + miseEnEvidence('\\times' + k1)
          )}$`
          } else {
            if (k2 !== 1) {
              texteCorr += `$+${texFraction(a, b)}$`
            }
          }

          if (this.correctionDetaillee) {
            texteCorr += `$=${texFraction(c * k2, p)}+${texFraction(a * k1, p)}$`
          }
          e = a * k1 + c * k2
          f = p

          texteCorr += `$=${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$`
          reponse = fraction(e, f).simplifie()
          break

        case 3: // avec piege addition non prioritaire fraction2 * fraction3 + fraction1  tout positif
          d = b
          produit = produitDeDeuxFractions(c, d, e, f)
          texte = `$${texFraction(a, b)}+${texFraction(c, d)}\\times${texFraction(e, f)}$`
          texteCorr = `$${texFraction(a, b)}+${texFraction(c, d)}\\times${texFraction(e, f)}`
          if (this.correctionDetaillee) {
            texteCorr += `=${texFraction(a, b)}+${texFraction(c + '\\times' + e, d + '\\times' + f)}`
            texteCorr += `=${texFraction(a, b)}+${texFraction(c * e, d * f)}`
          } else {
            texteCorr += `=${texFraction(a, b)}+${produit[1]}`
            texteCorr += `=${texFraction(a, b)}+${produit[0]}`
          }
          // faut-il simplifier c*e/d*f
          if (!this.correctionDetaillee) {
            [c, d, e, f] = produit[2]
          }
          p = pgcd(c * e, d * f)
          if (p !== 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texteCorr += `=${texFraction(a, b)}+${texFraction(
              (e * c) / p + '\\times\\cancel{' + p + '}',
              (f * d) / p + '\\times\\cancel{' + p + '}'
            )}`
            c = (e * c) / p
            d = (f * d) / p
          } else {
            c = e * c
            d = f * d
          }
          p = ppcm(b, d) // denominateur commun = p
          k1 = p / b
          k2 = p / d
          if (k1 !== 1) {
            texteCorr += `=${texFraction(
              a + miseEnEvidence('\\times' + k1),
              b + miseEnEvidence('\\times' + k1)
            )}`
          } else {
            if (k2 !== 1) {
              texteCorr += `=${texFraction(a, b)}`
            }
          }
          if (k2 !== 1) {
            texteCorr += `+${texFraction(
              c + '\\times' + k2,
              d + '\\times' + k2
            )}`
          } else {
            if (k1 !== 1) {
              texteCorr += `+${texFraction(c, d)}`
            }
          }

          if (this.correctionDetaillee) {
            texteCorr += `=${texFraction(a * k1, b * k1)}+${texFraction(c * k2, d * k2)}`
          }
          e = a * k1 + c * k2
          f = p
          texteCorr += `=${texFraction(e, f)}${simplificationDeFractionAvecEtapes(e, f)}$`
          reponse = fraction(e, f).simplifie()
          break

        case 4:
          a = a * randint(-1, 1, [0])
          b = b * randint(-1, 1, [0])
          c = c * randint(-1, 1, [0])
          d = d * randint(-1, 1, [0])
          e = e * randint(-1, 1, [0])
          f = f * randint(-1, 1, [0])

          nombreDeSigneMoins = (c < 0) + (d < 0) + (e < 0) + (f < 0)
          if (Math.pow(-1, nombreDeSigneMoins) === 1) {
            signe2 = '+'
          } else {
            signe2 = '-'
          }
          texte = `$${texFraction(a, b)}+${texFraction(c, d)}\\times${texFraction(e, f)}=$`
          texteCorr = `$${texFraction(a, b)}+${texFraction(c, d)}\\times${texFraction(e, f)}$`

          c = abs(c) // gestion du signe du produit avec {signe}
          d = abs(d)
          e = abs(e)
          f = abs(f)

          if (a * b > 0) {
            // suppression des signes - superflus de la première fraction
            signe1 = ''
          } else {
            signe1 = '-'
          }

          a = abs(a)
          b = abs(b)
          produit = produitDeDeuxFractions(c, d, e, f)
          if (this.correctionDetaillee) {
            texteCorr += `$=${signe1}${texFraction(
            a,
            b
          )}${signe2}${texFraction(c + '\\times' + e, d + '\\times' + f)}$`
            texteCorr += `$=${signe1}${texFraction(
            a,
            b
          )}${signe2}${texFraction(c * e, d * f)}$`
          } else {
            texteCorr += `$=${signe1}${texFraction(
              a,
              b
            )}${signe2}${produit[1]}$`
            texteCorr += `$=${signe1}${texFraction(
              a,
              b
            )}${signe2}${produit[0]}$`
          }
          // faut-il simplifier c*e/d*f
          if (!this.correctionDetaillee) {
            [c, d, e, f] = produit[2]
          }
          p = pgcd(c * e, d * f)
          if (p !== 1 && ppcm(b, d * f) > ppcm(b, (d * f) / p)) {
            texteCorr += `$=${signe1}${texFraction(
              a,
              b
            )}${signe2}${texFraction(
              (e * c) / p + '\\times\\cancel{' + p + '}',
              (f * d) / p + '\\times\\cancel{' + p + '}'
            )}$`
            c = (e * c) / p
            d = (f * d) / p
          } else {
            c = e * c
            d = f * d
          }
          p = ppcm(d, b) // mise au même dénominateur
          if (d % b !== 0 && b % d !== 0) {
            // dénominateur commun = p
            k1 = p / b
            k2 = p / d
            texteCorr += `$=${signe1}${texFraction(
              a + miseEnEvidence('\\times' + k1),
              b + miseEnEvidence('\\times' + k1)
            )}${signe2}${texFraction(
              c + miseEnEvidence('\\times' + k2),
              d + miseEnEvidence('\\times' + k2)
            )}$`
            texteCorr += `$=${signe1}${texFraction(
              a * k1,
              b * k1
            )}${signe2}${texFraction(c * k2, d * k2)}$`
            texteCorr += `$=${texFraction(
              signe1 + a * k1 + signe2 + c * k2,
              b * k1
            )}$`
            a = a * k1
            c = c * k2
            d = p
          } else {
            if (p === d) {
              k1 = d / b // d = dénominateur commun
              texteCorr += `$=${signe1}${texFraction(
                a + miseEnEvidence('\\times' + k1),
                b + miseEnEvidence('\\times' + k1)
              )}${signe2}${texFraction(c, d)}$`
              texteCorr += `$=${signe1}${texFraction(
                a * k1,
                d
              )}${signe2}${texFraction(c, d)}$`
              texteCorr += `$=${texFraction(
                signe1 + a * k1 + signe2 + c,
                d
              )}$`
              a = a * k1
            } else {
              // b=k2*d
              k2 = b / d // b= dénominateur commun
              texteCorr += `$=${signe1}${texFraction(
                a,
                b
              )}${signe2}${texFraction(
                c + miseEnEvidence('\\times' + k2),
                d + miseEnEvidence('\\times' + k2)
              )}$`
              texteCorr += `$=${signe1}${texFraction(
                a,
                b
              )}${signe2}${texFraction(c * k2, b)}$`
              texteCorr += `$=${texFraction(
                signe1 + a + signe2 + c * k2,
                b
              )}$`
              c = c * k2
              d = d * k2
            }
          }

          if (a !== c) {
            e = 0
            if (signe1 === '') {
              e = a
            } else {
              e = -a
            }
            if (signe2 === '+') {
              e += c
            } else {
              e -= c
            }
          } else {
            if (
              (signe1 === '-' && signe2 === '+') ||
              (signe1 === '' && signe2 === '-')
            ) {
              e = 0
            } else {
              e = 0
              if (signe1 === '') {
                e = a + c
              } else {
                e = -a - c
              }
            }
          }

          texteCorr += `$=${texFractionSigne(e, d)}${simplificationDeFractionAvecEtapes(e, d)}$`
          reponse = fraction(e, d).simplifie()
          break
      }

      if (this.questionJamaisPosee(i, a, b, c, d, typesDeQuestions)) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
        setReponse(this, i, reponse, { formatInteractif: 'fraction', digits: 5, digitsNum: 3, digitsDen: 2, signe: true })
        if (this.sup2) {
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
    'Niveau de difficulté', 4,
    '1 : Fractions faciles, positives ou non\n2 : Nombres positifs sans piège de priorité\n3 : Deux calculs avec positifs et piège de priorité et deux calculs avec relatifs\n4 : Calculs avec relatifs'
  ]
  this.besoinFormulaire2CaseACocher = ['Présentation des corrections en colonnes', false]
}
