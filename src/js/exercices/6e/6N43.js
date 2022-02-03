import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, sommeDesChiffres, calcul, texNombre } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Utiliser les critères de divisibilité'

/**
 * Un nombre est-il divisible par :
 *
 * * 2, 5, 10 ?
 * * 3, 9 ?
 * * 2, 3, 5, 9, 10 ?
 * * 2, 3, 5, 9, 10  et un autre nombre qui peut être 7, 13, 17, ou 19 ?
 * @author Rémi Angot
 * 6N43
 */
export default function CriteresDeDivisibilite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 4 // Correspond au facteur commun
  this.consigne = 'Répondre aux questions suivantes en justifiant.'
  this.spacing = 2
  this.spacingCorr = 1
  this.nbQuestions = 5

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let listeExercicesDisponibles
    if (this.sup === 1) {
      listeExercicesDisponibles = [2, 5, 10]
    }
    if (this.sup === 2) {
      listeExercicesDisponibles = [3, 9]
    }
    if (this.sup === 3) {
      listeExercicesDisponibles = [2, 3, 5, 9, 10]
    }
    if (this.sup > 3) {
      listeExercicesDisponibles = [2, 3, 5, 9, 10, 'autre']
    }
    const listeTypeDeQuestions = combinaisonListes(
      listeExercicesDisponibles,
      this.nbQuestions
    )
    for (let i = 0, n, u, texte, texteCorr, sommeString, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      this.autoCorrection[i].propositions = [
        {
          texte: 'Oui',
          statut: false
        },
        {
          texte: 'Non',
          statut: false
        },
        {
          texte: 'Je ne sais pas',
          statut: false
        }
      ]
      this.autoCorrection[i].options = { ordered: true } // On ne mélange pas les propositions 'Oui', 'Non' et 'Je ne sais pas'
      switch (listeTypeDeQuestions[i]) {
        case 2:
          u = randint(1, 2)
          n = randint(10, 999) * 10 + u
          texte = `$${texNombre(n)}$ est-il divisible par $2$ ?`
          if (u % 2 === 0) {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(n)}$ est divisible par $2$.`
            this.autoCorrection[i].propositions[0].statut = true
          } else {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(
              n
            )}$ n'est pas divisible par $2$.`
            this.autoCorrection[i].propositions[1].statut = true
          }
          break

        case 3:
          n = choice([randint(100, 999), randint(10000, 99999)])
          sommeString = sommeDesChiffres(n)
          texte = `$${texNombre(n)}$ est-il divisible par $3$ ?`
          if (n % 3 === 0) {
            texteCorr = `$${sommeString[1]}=${sommeString[0]}=3\\times ${calcul(sommeString[0] / 3)}$<br>`
            texteCorr += `La somme des chiffres de $${texNombre(n)}$ est divisible par $3$ donc $${texNombre(n)}$ est divisible par $3$.`
            this.autoCorrection[i].propositions[0].statut = true
          } else {
            texteCorr = `$${sommeString[1]}=${sommeString[0]}=3\\times ${calcul((sommeString[0] - sommeString[0] % 3) / 3)
              }+${sommeString[0] % 3}$<br>`
            texteCorr += `La somme des chiffres de $${texNombre(
              n
            )}$ n'est pas divisible par $3$ donc $${texNombre(
              n
            )}$ n'est pas divisible par $3$.`
            this.autoCorrection[i].propositions[1].statut = true
          }
          break

        case 9:
          n = choice([randint(100, 999), randint(10000, 99999)])
          sommeString = sommeDesChiffres(n)
          texte = `$${texNombre(n)}$ est-il divisible par $9$ ?`
          if (sommeString[0] % 9 === 0) {
            texteCorr = `$${sommeString[1]}=${sommeString[0]}=9\\times ${calcul(sommeString[0] / 9)}$<br>`
            texteCorr += `La somme des chiffres de $${texNombre(n)}$ est divisible par $9$ donc $${texNombre(n)}$ est divisible par $9$.`
            this.autoCorrection[i].propositions[0].statut = true
          } else {
            texteCorr = `$${sommeString[1]}=${sommeString[0]}=9\\times ${calcul((sommeString[0] - sommeString[0] % 9) / 9)}+${sommeString[0] % 9}$<br>`
            texteCorr += `La somme des chiffres de $${texNombre(n)}$ n'est pas divisible par $9$ donc $${texNombre(n)}$ n'est pas divisible par $9$.`
            this.autoCorrection[i].propositions[1].statut = true
          }
          break

        case 5:
          u = choice([randint(1, 9, [0, 5]), randint(1, 9, [0, 5]), 5, 0]) // 1 fois sur 2 ça sera divisible par 5
          n = randint(10, 9999) * 10 + u
          texte = `$${texNombre(n)}$ est-il divisible par $5$ ?`
          if (u % 5 === 0) {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(n)}$ est divisible par $5$.`
            this.autoCorrection[i].propositions[0].statut = true
          } else {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(
              n
            )}$ n'est pas divisible par $5$.`
            this.autoCorrection[i].propositions[1].statut = true
          }
          break

        case 10:
          u = choice([randint(1, 9), 0]) // 1 fois sur 2 ça sera divisible par 10
          n = randint(10, 9999) * 10 + u
          texte = `$${texNombre(n)}$ est-il divisible par $10$ ?`
          if (u === 0) {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(n)}$ est divisible par $10$.`
            this.autoCorrection[i].propositions[0].statut = true
          } else {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(
              n
            )}$ n'est pas divisible par $10$.`
            this.autoCorrection[i].propositions[1].statut = true
          }
          break

        case 'autre':
          n = randint(100, 999)
          u = choice([7, 7, 7, 7, 13, 17, 19])
          if (u === 7) {
            n = choice(
              [randint(10, 99) * 10 + 7],
              7 * randint(11, 99),
              randint(100, 999)
            ) // un nombre qui se termine par 7, un divisible par 7, un au hasard
          } else {
            n = choice(
              [randint(10, 99) * 100 + u],
              u * randint(11, 99),
              randint(100, 999)
            ) // un nombre qui se termine par u, un divisible par u, un au hasard
          }
          texte = `$${texNombre(n)}$ est-il divisible par $${u}$ ?`
          texteCorr = `On ne connaît pas de critère de divisibilité par $${u}$, on calcule donc la division euclidienne de $${texNombre(
            n
          )}$ par $${u}$.<br>`
          if (n % u === 0) {
            texteCorr += `$${texNombre(n)}=${u}\\times${texNombre(
              n / u
            )}$<br>`
            texteCorr += `Le reste de la division euclidienne est nul donc $${texNombre(
              n
            )}$ est divisible par $${u}$.`
            this.autoCorrection[i].propositions[0].statut = true
          } else {
            texteCorr += `$${texNombre(n)}=${u}\\times${(n - (n % u)) / u}+${n % u
              }$<br>`
            texteCorr += `Le reste de la division euclidienne n'est pas nul donc $${texNombre(
              n
            )}$ n'est pas divisible par $${u}$.`
            this.autoCorrection[i].propositions[1].statut = true
          }

          break
      }
      this.autoCorrection[i].enonce = `${texte}\n`
      if (this.interactif) {
        texte += '<br>' + propositionsQcm(this, i).texte
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de questions', 4, '1 : Critères de divisibilité par 2, 5 et10\n2 : Critères de divisibilité par 3 et 9\n3 : Critères de divisibilité par 2, 3, 5, 9 et 10\n4 : Avec ou sans critère de divisibilité']
}
