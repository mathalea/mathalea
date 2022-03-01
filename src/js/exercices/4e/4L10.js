import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif, ecritureParentheseSiMoins, signe, abs, lettreDepuisChiffre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Utiliser la simple distributivité'

export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Développer en utilisant la distributivité simple
 *
 * * La lettre peut être x, y, z, t, a, b ou c
 * # À partir du niveau 2
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
export default function ExerciceDevelopper (difficulte = 1) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = difficulte
  this.titre = titre
  this.interactifType = interactifType
  this.interactifReady = interactifReady
  this.consigne = 'Développer.'
  this.spacing = 1
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.sup2 = true

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    this.sup = parseInt(this.sup)
    let lettre = ['x', 'y', 'z', 't', 'a', 'b', 'c']
    if (this.sup2) {
      lettre = ['x']
    }
    let typesDeQuestionsDisponibles = [
      'simple',
      'simple',
      'simple2',
      'x_en_facteur',
      'developper_et_reduire'
    ]
    if (this.sup < 4) {
      typesDeQuestionsDisponibles = ['simple']
    }
    let typesDeQuestions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, reponse, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      let k = randint(2, 11)
      if (this.sup > 2) {
        // si difficulté 2, k peut être négatif
        k = k * choice([-1, 1])
      }
      const a = randint(1, 9)
      let b = randint(1, 9) * choice([-1, 1])
      if (this.sup === 1) {
        b = randint(1, 9)
      }
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
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=${k}(${inconnue}${ecritureAlgebrique(b)})=${k}
            \\times ${inconnue}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`
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
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=(${inconnue}${ecritureAlgebrique(
              b
            )})\\times${ecritureParentheseSiNegatif(k)}=${k}
            \\times ${inconnue}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`
          } else {
            texteCorr = `$${lettreDepuisChiffre(
              i + 1
            )}=(${a}${inconnue}${ecritureAlgebrique(
              b
            )})\\times${ecritureParentheseSiNegatif(k)}=${k}
            \\times ${a}${inconnue}+${ecritureParentheseSiNegatif(
              k
            )}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`
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
          reponse = `${k * a}${inconnue}${ecritureAlgebrique(k * b + c)}`
          break
      }
      setReponse(this, i, reponse)
      texte += ajouteChampTexteMathLive(this, i)

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Multiplication par un entier positif, tous les termes sont positifs\n2 : Multiplication par un entier positif\n3 : Multiplication par un entier relatif\n4: Multiplication par un facteur relatif et expressions sous des formes différentes '
  ]
  this.besoinFormulaire2CaseACocher = ['$x$ est la seule lettre utilisée']
}
