import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice, range1 } from '../../modules/outils/arrays.js'
import { ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenuSansNumero } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { miseEnEvidence } from '../../modules/outils/contextSensitif.js'
import { calcul } from '../../modules/outils/texNombres.js'
import { lettreDepuisChiffre } from '../../modules/outils/lettres.js'
import { nombreDeChiffresDansLaPartieEntiere } from '../../modules/outils/decimales.js'
export const interactifReady = true
export const interactifType = 'mathLive'

export const amcReady = true
export const amcType = 'AMCOpenNum' // type de question AMC

export const titre = 'Calculs utilisant les priorités opératoires et les puissances'

/**
 * Plusieurs type de calcul avec priorités opératoires/ relatifs/ puissances
 *
 * Sans parenthèses :
 * * a²+b*c
 * * a+b²*c
 * * a²+b+c*d
 *
 * * a²*b+c
 * * a*b²+c
 * * a²+b+c
 * * a+b²+c
 * * a+b+c²
 * * a+b²+c*d
 * * a+b+c²*d
 * * a+b+c*d²
 * * a²*b+c*d
 * * a*b+c*d²
 *
 * Avec parenthèses :
 * * a²*(b+c)
 * * a*(b²+c*d)
 * * (a+b+c²)*d
 * * d²(a+b+c)
 *
 * * a*(b²+c)
 * * a*(b+c²)
 * * (a²+b)*c
 * * (a+b²)*c
 * * (a+b)*c²
 * * a²*(b+c)*d
 * * a*(b²+c)*d
 * * a*(b+c²)*d
 * * a*(b+c)*d²
 * * a²*b*(c+d)
 * * a*b²*(c+d)
 * * a*b*(c²+d)
 * * a*b*(c+d²)
 * * a²*(b+c*d)
 * * a*(b+c²*d)
 * * a*(b+c*d²)
 * * a²+(b+c)
 * * a+(b²+c)
 * * a+(b+c²)
 * * (a²+b+c)*d
 * * (a+b²+c)*d
 * @author Mireille Gain
 * Référence 4C34
 * Date 2021-01-23
 * Ajout de l'interactivité par Guillaume Valmont le 2021-11-20
 */
export const uuid = '2d79c'
export const ref = '4C34'
export default function PrioritesEtRelatifsEtPuissances () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calculer :'
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 1
  this.tailleDiaporama = 3
  this.video = 'https://youtu.be/0G9xWLl-0zg' // Id YouTube ou url
  this.spacing = context.isHtml ? 3 : 1
  this.spacingCorr = context.isHtml ? 3 : 1
  this.amcReady = amcReady
  this.amcType = amcType

  this.nouvelleVersion = function () {
    let reponse
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const listeQuestionsDisponibles = range1(7)

    const listeTypeDeQuestions = combinaisonListes(
      listeQuestionsDisponibles,
      this.nbQuestions
    )
    for (
      let i = 0, texte, texteCorr, a, b, c, d, m, n, p, cpt = 0;
      i < this.nbQuestions && cpt < 50;) {
      a = randint(1, 7) * choice([-1, 1])
      b = randint(1, 7) * choice([-1, 1])
      c = randint(1, 7) * choice([-1, 1])
      d = randint(1, 7) * choice([-1, 1])
      m = randint(1, 5) * choice([-1, 1])
      n = randint(1, 3) * (-1)
      p = randint(1, 3)
      this.autoCorrection[i] = {}
      switch (listeTypeDeQuestions[i]) {
        case 1: // a² + b*c
          texte = `$${lettreDepuisChiffre(i + 1)} = ${ecritureParentheseSiNegatif(a)}^2 +  ${ecritureParentheseSiNegatif(b)} \\times ${ecritureParentheseSiNegatif(c)}$`
          texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i + 1)}&
        =${miseEnEvidence(ecritureParentheseSiNegatif(a) + '^2', 'blue')}  +  ${ecritureParentheseSiNegatif(b)} \\times ${ecritureParentheseSiNegatif(c)}
        \\\\&=${a * a} + ${miseEnEvidence((ecritureParentheseSiNegatif(b) + '\\times' + ecritureParentheseSiNegatif(c)), 'blue')}
        \\\\&=${a * a} ${ecritureAlgebrique(b * c)}\\end{aligned}
        \\\\${miseEnEvidence(lettreDepuisChiffre(i + 1) + '=' + (a * a + b * c))}\\\\$`
          reponse = calcul(a * a + b * c)
          break

        case 2: // a + b²*c
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a} + ${ecritureParentheseSiNegatif(p)}^2 \\times ${ecritureParentheseSiNegatif(c)}$`
          texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i + 1)}&
          =${a} + ${miseEnEvidence(ecritureParentheseSiNegatif(p) + '^2', 'blue')} \\times ${ecritureParentheseSiNegatif(c)}
          \\\\&=${a} + ${miseEnEvidence(ecritureParentheseSiNegatif(p * p) + '\\times' + ecritureParentheseSiNegatif(c), 'blue')}
          \\\\&=${a + ecritureAlgebrique(p * p * c)}\\end{aligned}
          \\\\${miseEnEvidence(lettreDepuisChiffre(i + 1) + '=' + (a + p * p * c))}\\\\$`
          reponse = calcul(a + p * p * c)
          break

        case 3: // a²+b+c*d
          texte = `$${lettreDepuisChiffre(i + 1)} = ${ecritureParentheseSiNegatif(a)}^2   ${ecritureAlgebrique(b)} ${ecritureAlgebrique(c)} \\times ${ecritureParentheseSiNegatif(d)}$`
          texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i + 1)}&
        =${miseEnEvidence(ecritureParentheseSiNegatif(a) + '^2', 'blue')} ${ecritureAlgebrique(b)}  ${ecritureAlgebrique(c)} \\times ${ecritureParentheseSiNegatif(d)}
        \\\\&=${a * a} ${ecritureAlgebrique(b)} +  ${miseEnEvidence((ecritureParentheseSiNegatif(c) + '\\times' + ecritureParentheseSiNegatif(d)), 'blue')}
        \\\\&=${a * a + ecritureAlgebrique(b) + ecritureAlgebrique(c * d)}\\end{aligned}
        \\\\${miseEnEvidence(lettreDepuisChiffre(i + 1) + '=' + (a * a + b + c * d))}\\\\$`
          reponse = calcul(a * a + b + c * d)
          break

        case 4: // a²*(b+c)
          texte = `$${lettreDepuisChiffre(i + 1)} = ${ecritureParentheseSiNegatif(n)}^2 \\times ( ${b + ecritureAlgebrique(c)})$`
          texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i + 1)}&
          =${miseEnEvidence(ecritureParentheseSiNegatif(n) + '^2', 'blue')}  \\times ( ${b + ecritureAlgebrique(c)})
          \\\\&=${n * n} \\times ( ${miseEnEvidence(b + ecritureAlgebrique(c), 'blue')})
          \\\\&=${n * n} \\times ${ecritureParentheseSiNegatif(b + c)}\\end{aligned}
          \\\\${miseEnEvidence(lettreDepuisChiffre(i + 1) + '=' + (n * n * (b + c)))}\\\\$`
          reponse = calcul(n * n * (b + c))
          break

        case 5: // m*(n²+p*n)
          texte = `$${lettreDepuisChiffre(i + 1)} = ${m} \\times ( ${ecritureParentheseSiNegatif(n)}^2${ecritureAlgebrique(p)}\\times${ecritureParentheseSiNegatif(n)})$`
          texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i + 1)}&
            =${m} \\times ( ${miseEnEvidence(ecritureParentheseSiNegatif(n) + '^2', 'blue')} ${ecritureAlgebrique(p)}\\times${ecritureParentheseSiNegatif(n)})
            \\\\&=${m} \\times ( ${n * n} + ${miseEnEvidence(ecritureParentheseSiNegatif(p) + '\\times' + ecritureParentheseSiNegatif(n), 'blue')})
            \\\\&=${m}\\times ( ${miseEnEvidence((n * n + ecritureAlgebrique(p * n)), 'blue')})
            \\\\&=${m}\\times ${ecritureParentheseSiNegatif(n * n + p * n)}\\end{aligned}
            \\\\${miseEnEvidence(lettreDepuisChiffre(i + 1) + '=' + (m * (n * n + p * n)))}\\\\$`
          reponse = calcul(m * (n * n + p * n))
          break

        case 6: // (a+b+n²)*d
          texte = `$${lettreDepuisChiffre(i + 1)} = (${a} ${ecritureAlgebrique(b)} + ${ecritureParentheseSiNegatif(n)}^2 ) \\times ${ecritureParentheseSiNegatif(d)}$`
          texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i + 1)}&
              =(${a} + ${ecritureParentheseSiNegatif(b)} + ${miseEnEvidence(ecritureParentheseSiNegatif(n) + '^2', 'blue')}  ) \\times ${ecritureParentheseSiNegatif(d)}
              \\\\&=(${miseEnEvidence((a + ecritureAlgebrique(b) + ecritureAlgebrique(n * n)), 'blue')}) \\times ${ecritureParentheseSiNegatif(d)}
              \\\\&=${a + b + n * n} \\times ${ecritureParentheseSiNegatif(d)}\\end{aligned}
              \\\\${miseEnEvidence(lettreDepuisChiffre(i + 1) + '=' + ((a + b + n * n) * d))}\\\\$`
          reponse = calcul((a + b + n * n) * d)
          break

        case 7: // n²*(a+b+c)
          texte = `$${lettreDepuisChiffre(i + 1)} = ${ecritureParentheseSiNegatif(n)}^2 \\times ( ${a + ecritureAlgebrique(b) + ecritureAlgebrique(c)})$`
          texteCorr = `$\\begin{aligned}${lettreDepuisChiffre(i + 1)}&
                =${miseEnEvidence(ecritureParentheseSiNegatif(n) + '^2', 'blue')} \\times ( ${a} ${ecritureAlgebrique(b)} ${ecritureAlgebrique(c)})
                \\\\&=${n * n} \\times ( ${miseEnEvidence(a + ecritureAlgebrique(b) + ecritureAlgebrique(c), 'blue')})
                \\\\&=${n * n} \\times ${ecritureParentheseSiNegatif(a + b + c)}\\end{aligned}
                \\\\${miseEnEvidence(lettreDepuisChiffre(i + 1) + '=' + (n * n * (a + b + c)))}\\\\$`
          reponse = calcul(n * n * (a + b + c))
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        if (!context.isAmc && this.interactif) { // On vérifie qu'on est pas en AMC pour vérifier qu'on ne casse rien à ce qui a été fait pour AMC
          setReponse(this, i, reponse)
          texte += ' =' + ajouteChampTexteMathLive(this, i, 'inline largeur 25')
        } else if (context.isAmc) {
          this.autoCorrection[i].enonce = texte
          this.autoCorrection[i].propositions = [{ texte: texteCorr, statut: 3 }]
          this.autoCorrection[i].reponse = { texte: 'résultat', valeur: reponse, param: { digits: Math.max(2, nombreDeChiffresDansLaPartieEntiere(reponse)), decimals: 0, signe: true, exposantNbChiffres: 0, exposantSigne: false } }
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
}
// python3 list-to-js.py pour faire apparaître l'exercice dans le menu
