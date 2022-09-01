import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { choice, combinaisonListes, abs, lettreDepuisChiffre, printlatex, listeQuestionsToContenuSansNumero, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Factoriser une expression'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'

/**
* Utiliser la simple ou la double distributivité et réduire l'expression
*
* @author Rémi Angot
* 3L11-4
* Ajout du paramétrage : Guillaume Valmont 13/08/2021
*/
export const uuid = '5f5a6'
export const ref = '3L11-4'
export default function FactoriserParNombreOux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Factoriser les expressions suivantes.'
  this.nbQuestions = 8
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 3
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Niveau 1\n2 : Niveau 2\n3 : Niveau 3\n4 : Mélange']

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    this.sup = parseInt(this.sup)
    let typesDeQuestionsDisponibles
    switch (this.sup) {
      case 1 :
        typesDeQuestionsDisponibles = ['ka+nkb', '-ka+nkb']
        break
      case 2 :
        typesDeQuestionsDisponibles = ['nka+mkb', 'nka-mkb']
        break
      case 3 :
        typesDeQuestionsDisponibles = ['nkx+mkx2', 'nkx-mkx2', 'nx2+x', 'nx2+mx']
        break
      default :
        typesDeQuestionsDisponibles = ['ka+nkb', '-ka+nkb', 'nka+mkb', 'nka-mkb', 'nkx+mkx2', 'nkx-mkx2', 'nx2+x', 'nx2+mx']
        break
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, reponse, n, m, couplenm, k, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      k = choice([2, 3, 5, 7, 11])
      couplenm = choice([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [3, 8], [5, 8], [7, 8], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [3, 10], [7, 10], [9, 10]]) // n et m sont premiers entre eux
      n = couplenm[0]
      m = couplenm[1]
      n = choice([n, n, -n])
      switch (listeTypeDeQuestions[i]) {
        case 'ka+nkb':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${k}*a+(${n * k})*b`)}$`
          texteCorr = texte
          if (n > 0) {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}a+${k}\\times${n}b$`
          } else {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}a-${k}\\times${abs(n)}b$`
          }
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}(${printlatex(`a+(${n})*b`)})$`
          reponse = [`${k}(${printlatex(`a+(${n})*b`)})`, `${-k}(${printlatex(`-a+(${-n})*b`)})`]
          break
        case '-ka+nkb':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${-k}*a+(${n * k})*b`)}$`
          texteCorr = texte
          if (n > 0) {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${-k}a+${k}\\times${n}b$`
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}(${printlatex(`-a+${n}*b`)})$`
            reponse = `${k}(${printlatex(`-a+(${n})*b`)})`
          } else {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${-k}a+(${-k})\\times${-n}b$`
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${-k}(${printlatex(`a+(${-n})*b`)})$`
            reponse = [`${-k}(${printlatex(`a+(${-n})*b`)})`, `${k}(${printlatex(`-a+(${n})*b`)})`]
          }
          break
        case 'nka+mkb':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${n * k}*a+(${m * k})*b`)}$`
          texteCorr = texte
          if (n < 0) {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}\\times(${n}a)+${k}\\times${m}b$`
          } else {
            texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}\\times${n}a+${k}\\times${m}b$`
          }
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}(${n}a+${m}b)$`
          reponse = [`${k}(${n}a+${m}b)`, `${-k}(${-n}a-${m}b)`]
          break
        case 'nka-mkb':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${n * k}*a-(${m * k})*b`)}$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}\\times${ecritureParentheseSiNegatif(n)}a-${k}\\times${m}b$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}(${n}a-${m}b)$`
          reponse = [`${k}(${n}a-${m}b)`, `${-k}(${-n}a+${m}b)`]
          break
        case 'nkx+mkx2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${n * k}*x+(${m * k})*x^2`)}$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x\\times${ecritureParentheseSiNegatif(n)}+${k}x\\times${m}x$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x(${n}+${m}x)$`
          reponse = [`${k}x(${n}+${m}x)`, `${-k}x(${-n}-${m}x)`]
          break
        case 'nkx-mkx2':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${n * k}*x-(${m * k})*x^2`)}$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x\\times${ecritureParentheseSiNegatif(n)}-${k}x\\times${m}x$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=${k}x(${n}-${m}x)$`
          reponse = [`${k}x(${n}-${m}x)`, `${-k}x(${-n}+${m}x)`]
          break
        case 'nx2+x':
          texte = `$${lettreDepuisChiffre(i + 1)}=${n}x^2+x$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x\\times ${ecritureParentheseSiNegatif(n)}x+x\\times 1$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x(${n}x+1)$`
          reponse = [`x(${n}x+1)`, `-x(${-n}x-1)`]
          break
        case 'nx2+mx':
          texte = `$${lettreDepuisChiffre(i + 1)}=${n}x^2+${m}x$`
          texteCorr = texte
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x\\times ${ecritureParentheseSiNegatif(n)}x+x\\times ${m}$`
          texteCorr += `<br>$\\phantom{${lettreDepuisChiffre(i + 1)}}=x(${n}x+${m})$`
          reponse = [`x(${n}x+${m})`, `-x(${-n}x-${m})`]
          break
      }
      if (!context.isAmc) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texte: ' $=$' })
        setReponse(this, i, reponse)
      } else {
        this.autoCorrection[i] = {
          enonce: texte,
          propositions: [{ texte: texteCorr, statut: 3, feedback: '' }]
        }
      }
      if (this.questionJamaisPosee(i, k, n, m)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
}
