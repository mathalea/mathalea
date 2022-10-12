import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { pgcd, randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenuSansNumero } from '../../modules/outils/miseEnForme.js'
import { simplificationDeFractionAvecEtapes, texFraction } from '../../modules/outils/arrayFractions.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { miseEnEvidence } from '../../modules/outils/contextSensitif.js'
import { fraction } from '../../modules/fractions.js'
import { lettreDepuisChiffre } from '../../modules/outils/lettres.js'
export const titre = 'Somme, différence ou produit de fractions'
export const interactifType = 'mathLive'
export const interactifReady = true

/**
 * Description didactique de l'exercice
 * @author Mireille Gain
 * Référence 4C23-1
 * Date de publication septembre 2021
*/
export const uuid = '374b6'
export const ref = '4C23'
export default function SommeOuProduitFractions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.spacing = context.isHtml ? 4 : 3
  this.spacingCorr = context.isHtml ? 4 : 3
  this.nbColonneModifiable = false
  this.consigne = 'Effectuer les calculs suivants.'
  this.nbQuestions = 8 // Nombre de questions par défaut
  this.nbCols = 4 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.sup = 1
  this.correctionDetailleeDisponible = true // booléen qui indique si une correction détaillée est disponible.
  this.correctionDetaillee = false

  this.nouvelleVersion = function (numeroExercice) {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.sup = parseInt(this.sup)

    let typeQuestionsDisponibles = ['type1', 'type2', 'type3', 'type4', 'type5', 'type6'] // On crée 6 types de questions
    switch (this.sup) {
      case 1:
        typeQuestionsDisponibles = ['type1', 'type1', 'type1', 'type1', 'type2', 'type2', 'type5', 'type6']
        break
      case 2:
        typeQuestionsDisponibles = ['type1', 'type2', 'type3', 'type3', 'type3', 'type4', 'type5', 'type6']
        break
      case 3:
        typeQuestionsDisponibles = ['type1', 'type2', 'type3', 'type4', 'type5', 'type6', 'type7', 'type8']
        break
    }

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, num1, num2, den1, den2, den3, k, k2, alea, texte, texteCorr, num, den, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      // les numérateurs
      num1 = randint(1, 7)
      num2 = randint(3, 9)
      // les dénominateurs
      den1 = randint(2, 9)
      k = randint(1, 4)
      k2 = randint(2, 5)
      den2 = k * den1
      den3 = randint(2, 9)
      alea = choice([1, 2])
      texte = ''
      texteCorr = ''

      if (!context.isHtml) {
        if (i % 4 === 0) {
          texteCorr += '\\begin{multicols}{4}'
        }
      }

      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1': // Somme de fractions de dénominateurs égaux ou multiples

          if (alea === 1) {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)}+${texFraction(num2, den2)}$ `
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)}+${texFraction(num2, den2)}$<br>`
            if (k > 1) {
              if (this.correctionDetaillee) {
                texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1 + miseEnEvidence('\\times' + k), den1 + miseEnEvidence('\\times' + k))}+${texFraction(num2, den2)}$<br>`
              }
              texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1 * k, den2)}+${texFraction(num2, den2)}$<br>`
            }
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 * k + num2, den2)}$ `
            num = num1 * k + num2
            den = den2
          } else {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den2)}+${texFraction(num2, den1)}$ `
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den2)}+${texFraction(num2, den1)}$<br>`
            if (k > 1) {
              if (this.correctionDetaillee) {
                texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den2)}+${texFraction(num2 + miseEnEvidence('\\times' + k), den1 + miseEnEvidence('\\times' + k))}$<br>`
              }
              texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den2)}+${texFraction(num2 * k, den2)}$<br>`
            }
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 + num2 * k, den2)}$ `
            num = num1 + num2 * k
            den = den2
          }

          break

        case 'type2': // Somme d'une fraction et d'un entier'
          if (alea === 1) {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${k} + ${texFraction(num1, den1)} $ `
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${k} + ${texFraction(num1, den1)} $<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(k * den1, den1)} + ${texFraction(num1, den1)}$<br>`
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 + k * den1, den1)}$`
          } else {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} + ${k} $`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)}+${k}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)}+${texFraction(k * den1, den1)}$<br>`
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 + k * den1, den1)}$`
          }
          num = num1 + k * den1
          den = den1
          break

        case 'type3': // Différence de fractions de dénominateurs égaux ou multiples
          if (alea === 1) {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)}-${texFraction(num2, den2)}$`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)}-${texFraction(num2, den2)}$<br>`
            if (k > 1) {
              if (this.correctionDetaillee) {
                texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1 + miseEnEvidence('\\times' + k), den1 + miseEnEvidence('\\times' + k))} - ${texFraction(num2, den2)}$<br>`
              }
              texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1 * k, den1 * k)}-${texFraction(num2, den2)}$<br>`
            }
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 * k - num2, den2)}$ `
            num = num1 * k - num2
            den = den2
          } else {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den2)}-${texFraction(num2, den1)}$`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den2)}-${texFraction(num2, den1)}$<br>`
            if (k > 1) {
              if (this.correctionDetaillee) {
                texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den2)}-${texFraction(num2 + miseEnEvidence('\\times' + k), den1 + miseEnEvidence('\\times' + k))}$<br>`
              }
              texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den2)}-${texFraction(num2 * k, den2)}$<br>`
            }
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 - num2 * k, den2)}$`
            num = num1 - num2 * k
            den = den2
          }

          break

        case 'type4': // Différence d'une fraction et d'un entier
          if (alea === 1) {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${k} - ${texFraction(num1, den1)} $`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${k} - ${texFraction(num1, den1)}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(k * den1, den1)} - ${texFraction(num1, den1)}$<br>`
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(k * den1 - num1, den1)}$`
            num = k * den1 - num1
            den = den1
          } else {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)}-${k}$`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)}-${k}$<br>`
            if (k > 1) {
              texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)}-${texFraction(k * den1, den1)}$<br>`
            }
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 - k * den1, den1)}$ `
            num = num1 - k * den1
            den = den1
          }

          break

        case 'type5': // Produit de fractions
          texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} \\times ${texFraction(num2, den3)}$`
          texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} \\times ${texFraction(num2, den3)}$<br>`
          if (!context.isHtml) {
            if (i !== (this.nbQuestions - 1)) {
              if (i % 4 !== 3) {
                texteCorr += '\\columnbreak\n'
              }
            }
          } texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 * num2, den1 * den3)}$`
          num = num1 * num2
          den = den1 * den3
          break

        case 'type6': // Produit d'une fraction par un entier
          if (alea === 1) {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} \\times ${k2}$`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} \\times ${k2}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} \\times ${texFraction(k2, '1')}$<br>`
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 * k2, den1)}$`
          } else {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${k2} \\times ${texFraction(num1, den1)} $`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${k2} \\times ${texFraction(num1, den1)}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(k2, '1')} \\times  ${texFraction(num1, den1)}$<br>`
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 * k2, den1)}$`
          }
          num = num1 * k2
          den = den1

          break

        case 'type7': // Avec priorité opératoire : a +/- bc
          if (alea === 1) {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} + ${texFraction(num2, den1)} \\times ${texFraction(k2, den3)}$ `
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} + ${texFraction(num2, den1)} \\times ${texFraction(k2, den3)}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} + ${texFraction(num2 * k2, den1 * den3)}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1 * den3, den1 * den3)} + ${texFraction(num2 * k2, den1 * den3)}$<br>`
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 * den3 + num2 * k2, den1 * den3)}$`
            num = num1 * den3 + num2 * k2
            den = den1 * den3
          } else {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} - ${texFraction(num2, den1)} \\times ${texFraction(k2, den3)}$`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} - ${texFraction(num2, den1)} \\times ${texFraction(k2, den3)}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1, den1)} - ${texFraction(num2 * k2, den1 * den3)}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num1 * den3, den1 * den3)} - ${texFraction(num2 * k2, den1 * den3)}$<br>`
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num1 * den3 - num2 * k2, den1 * den3)}$`
            num = num1 * den3 - num2 * k2
            den = den1 * den3
          }

          break

        case 'type8': // Avec priorité opératoire : ab +/- c
          if (alea === 1) {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num2, den1)} \\times ${texFraction(k2, den3)} + ${texFraction(num1, den1)}$`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num2, den1)} \\times ${texFraction(k2, den3)} + ${texFraction(num1, den1)}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num2 * k2, den1 * den3)} + ${texFraction(num1, den1)}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num2 * k2, den1 * den3)} + ${texFraction(num1 * den3, den1 * den3)}$<br>`
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num2 * k2 + num1 * den3, den1 * den3)}$`
            num = num2 * k2 + num1 * den3
            den = den1 * den3
          } else {
            texte += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num2, den1)} \\times ${texFraction(k2, den3)} - ${texFraction(num1, den1)}$`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num2, den1)} \\times ${texFraction(k2, den3)} - ${texFraction(num1, den1)}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num2 * k2, den1 * den3)} - ${texFraction(num1, den1)}$<br>`
            texteCorr += `$${lettreDepuisChiffre(i + 1)} = ${texFraction(num2 * k2, den1 * den3)} - ${texFraction(num1 * den3, den1 * den3)}$<br>`
            if (!context.isHtml) {
              if (i !== (this.nbQuestions - 1)) {
                if (i % 4 !== 3) {
                  texteCorr += '\\columnbreak\n'
                }
              }
            }
            texteCorr += `$${lettreDepuisChiffre(i + 1) + '=' + texFraction(num2 * k2 - num1 * den3, den1 * den3)}$`
            num = num2 * k2 - num1 * den3
            den = den1 * den3
          }
          break
      }
      if (pgcd(num, den) !== 1) {
        texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}  ${simplificationDeFractionAvecEtapes(num, den)}$`
      }
      texte += '<br>'
      texteCorr += '\n'
      if (!context.isHtml) {
        if (i % 4 === 3) {
          texteCorr += '\\end{multicols}'
        } else if (i === this.nbQuestions - 1) {
          texteCorr += '\\end{multicols}'
        }
      }

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
        setReponse(this, i, fraction(num, den), { formatInteractif: 'fractionEgale' })
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }

      cpt++
    }

    listeQuestionsToContenuSansNumero(this, false) // On envoie l'exercice à la fonction de mise en page
  }
  this.besoinFormulaireNumerique = ['Type de questions', 3, '1 : Somme et produit\n2 : Somme ou différence, et produit\n3 : Avec priorité opératoire']
}
