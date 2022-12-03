import Exercice from '../Exercice.js'
import { randint, choice, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif, ecritureParentheseSiMoins, signe, abs, lettreDepuisChiffre, listeQuestionsToContenuSansNumero } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'

export const titre = 'Utiliser la simple distributivité'

export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Développer en utilisant la distributivité simple
 *
 * * La lettre peut être x, y, z, t, a, b ou c
 * * 3 fois sur 6 c'est une distributivité simple :  k(ax+b)
 * * 1 fois sur 6 c'est une distributivité simple : (ax+b)×k
 * * 1 fois sur 6, la variable est en facteur : kx(ax+b)
 * * 1 fois sur 6 il faut ensuite réduire : k(ax+b)+c
 *
 * Niveau de difficulté :
 * * 1 : Multiplication par un facteur positif
 * * 2: Multiplication par un facteur relatif
 * @author Rémi Angot
 * 4L10 et 3L11
 */
export const uuid = '77a62'
export const ref = '3L11'
export default function ExerciceDevelopper (difficulte = 1) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = difficulte
  this.sup = parseInt(this.sup)
  this.sup2 = 1
  this.titre = titre
  this.interactifType = interactifType
  this.interactifReady = interactifReady
  this.nbQuestions = 5
  this.spacing = context.isHtml ? 3 : 2
  this.spacingCorr = context.isHtml ? 3 : 2
  this.nbColsCorr = 1
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    this.consigne = this.sup2 === 1 ? 'Développer' : 'Développer et réduire'
    if (this.nbQuestions > 1 && !context.isDiaporama) this.consigne += ' les expressions suivantes.'

    let lettre = ['x', 'y', 'z', 't', 'a', 'b', 'c']
    if (this.interactif) lettre = ['x']
    const typesDeQuestionsDisponibles = [
      'simple',
      'simple',
      'simple2',
      'x_en_facteur',
      'developper_et_reduire'
    ]
    let typesDeQuestions
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, reponse, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      let k = randint(2, 11)
      if (this.sup > 1) {
        // si difficulté 2, k peut être négatif
        k = k * choice([-1, 1])
      }
      const a = randint(1, 9)
      const b = randint(1, 9) * choice([-1, 1])
      const inconnue = choice(lettre)
      const c = randint(2, 9)
      switch (typesDeQuestions) {
        case 'simple':
          if (a === 1) {
            // ne pas écrire 1x
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${inconnue}${ecritureAlgebrique(b)})$`
          } else {
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecritureAlgebrique(b)})$`
          }

          if (a === 1) {
            // ne pas écrire 1x
            texteCorr = `$${lettreDepuisChiffre(i + 1)}=${k}(${inconnue}${ecritureAlgebrique(b)})=${k}\\times ${inconnue}+${ecritureParentheseSiNegatif(k)}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`
          } else {
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecritureAlgebrique(b)})=${k}
            \\times ${a}${inconnue}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`
          }
          reponse = `${k * a}${inconnue}${ecritureAlgebrique(k * b)}`
          break
        case 'simple2':
          if (a === 1) {
            // ne pas écrire 1x
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=(${inconnue}${ecritureAlgebrique(
              b
            )})\\times${ecritureParentheseSiNegatif(k)}$`
          } else {
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=(${a}${inconnue}${ecritureAlgebrique(
              b
            )})\\times${ecritureParentheseSiNegatif(k)}$`
          }

          if (a === 1) {
            // ne pas écrire 1x
            texteCorr = `$${lettreDepuisChiffre(i + 1)}=(${inconnue}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiNegatif(k)}=${k}\\times ${inconnue}+${ecritureParentheseSiNegatif(k)}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`
          } else {
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=(${a}${inconnue}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiNegatif(k)}=${k}\\times ${a}${inconnue}+${ecritureParentheseSiNegatif(k)}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`
          }
          reponse = `${k * a}${inconnue}${ecritureAlgebrique(k * b)}`
          break
        case 'x_en_facteur':
          if (a === 1) {
            // ne pas écrire 1x
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}${inconnue}(${inconnue}${ecritureAlgebrique(b)})$`
          } else {
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(b)})$`
          }

          if (a === 1) {
            // ne pas écrire 1x
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}${inconnue}(${inconnue}${ecritureAlgebrique(
              b
            )})=${k}${inconnue}\\times ${inconnue} ${signe(
              k * b
            )}${k}${inconnue}\\times ${abs(b)}=${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}$`
          } else {
            if (k > 0) {
              texteCorr = `$${lettreDepuisChiffre(
                i + 1
              )}=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(
                b
              )})=${k}${inconnue}\\times ${a}${inconnue} + ${k}${inconnue}\\times ${ecritureParentheseSiNegatif(
                b
              )}=${k * a}${inconnue}^2${ecritureAlgebrique(
                k * b
              )}${inconnue}$`
            } else {
              texteCorr = `$${lettreDepuisChiffre(
                i + 1
              )}=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(
                b
              )})=${k}${inconnue}\\times ${a}${inconnue} + (${k}${inconnue})\\times ${ecritureParentheseSiNegatif(
                b
              )}=${k * a}${inconnue}^2${ecritureAlgebrique(
                k * b
              )}${inconnue}$`
            }
          }
          reponse = `${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}`
          break
        case 'developper_et_reduire':
          if (a === 1) {
            // ne pas écrire 1x
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${inconnue}${ecritureAlgebrique(b)})+${c}$`
          } else {
            texte = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecritureAlgebrique(b)})+${c}$`
          }

          if (a === 1) {
            // ne pas écrire 1x
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${inconnue}${ecritureAlgebrique(
              b
            )})+${c}=${k}\\times ${inconnue}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}+${c}
            =${k * a}${inconnue}${ecritureAlgebrique(k * b)}+${c}=${k * a}${inconnue}${ecritureAlgebrique(k * b + c)}$`
          } else {
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${a}${inconnue}${ecritureAlgebrique(
              b
            )})+${c}=${k}\\times${ecritureParentheseSiMoins(
              a + inconnue
            )}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}+${c}
            =${k * a}${inconnue}${ecritureAlgebrique(k * b)}+${c}=${k * a}${inconnue}${ecritureAlgebrique(k * b + c)}$`
          }
          if (this.sup2 === 1) {
            reponse = [`${k * a}${inconnue}${ecritureAlgebrique(k * b)}${ecritureAlgebrique(c)}`, `${k * a}${inconnue}${ecritureAlgebrique(k * b + c)}`]
          } else {
            reponse = `${k * a}${inconnue}${ecritureAlgebrique(k * b + c)}`
          }
          break
      }
      if (this.sup2 === 1) {
        setReponse(this, i, reponse)
      } else {
        setReponse(this, i, reponse, { formatInteractif: 'formeDevelopee' })
      }
      texte += ajouteChampTexteMathLive(this, i, { texte: `$${lettreDepuisChiffre(i + 1)}$` })

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    2,
    '1 : Multiplication par un facteur positif\n2 : Multiplication par un facteur relatif'
  ]
  this.besoinFormulaire2Numerique = ['Consigne', 2, '1 : Développer, \n2 : Développer et réduire']
}
