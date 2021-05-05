import Exercice from '../ClasseExercice.js'
import { shuffle2tableaux, listeQuestionsToContenu, randint, choice, combinaisonListes, sommeDesChiffres, calcul, texNombre } from '../../modules/outils.js'
export const amcReady = true

export const titre = 'Critères de divisibilité'

/**
 * Un nombre est-il divisible par :
 *
 * * 2, 5, 10 ?
 * * 3, 9 ?
 * * 2, 3, 5, 9, 10 ?
 * * 2, 3, 5, 9, 10  et un autre nombre qui peut être 7, 13, 17, ou 19 ?
 * @Auteur Rémi Angot
 * 6N43
 */
export default function Criteres_de_divisibilite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 4 // Correspond au facteur commun
  this.titre = titre
  this.consigne = 'Répondre aux questions suivantes en justifiant.'
  this.spacing = 2
  this.spacingCorr = 1
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.qcmDisponible = true
  this.modeQcm = false

  this.nouvelleVersion = function () {
    this.qcm = ['6N43', [], 'Critères de divisibilité', 1, { ordered: true, lastChoices: 2 }]
    let tabrep, tabicone
    let espace = ''
    if (sortieHtml) {
      espace = '&emsp;'
    } else {
      espace = '\\qquad'
    }
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let liste_des_exercices_disponibles
    if (this.sup == 1) {
      liste_des_exercices_disponibles = [2, 5, 10]
    }
    if (this.sup == 2) {
      liste_des_exercices_disponibles = [3, 9]
    }
    if (this.sup == 3) {
      liste_des_exercices_disponibles = [2, 3, 5, 9, 10]
    }
    if (this.sup > 3) {
      liste_des_exercices_disponibles = [2, 3, 5, 9, 10, 'autre']
    }
    const liste_type_de_questions = combinaisonListes(
      liste_des_exercices_disponibles,
      this.nbQuestions
    )
    for (
      let i = 0, n, u, texte, texteCorr, sommeString, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 2:
          u = randint(1, 2)
          n = randint(10, 999) * 10 + u
          texte = `$${texNombre(n)}$ est-il divisible par $2$ ?`
          if (u % 2 == 0) {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(n)}$ est divisible par $2$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [1, 0, 0, 0]
          } else {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(
              n
            )}$ n'est pas divisible par $2$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [0, 1, 0]
          }
          break

        case 3:
          n = choice([randint(100, 999), randint(10000, 99999)]).toString() // transformé en string pour avoir accès aux chiffres
          sommeString = sommeDesChiffres(n)
          texte = `$${texNombre(n)}$ est-il divisible par $3$ ?`
          if (calcul(sommeString) % 3 == 0) {
            texteCorr = `$${sommeString}=${calcul(sommeString)}=3\\times${calcul(sommeString) / 3
              }$<br>`
            texteCorr += `La somme des chiffres de $${texNombre(
              n
            )}$ est divisible par $3$ donc $${texNombre(
              n
            )}$ est divisible par $3$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [1, 0, 0]
          } else {
            texteCorr = `$${sommeString}=${calcul(sommeString)}=3\\times${(calcul(sommeString) - (calcul(sommeString) % 3)) / 3
              }+${calcul(sommeString) % 3}$<br>`
            texteCorr += `La somme des chiffres de $${texNombre(
              n
            )}$ n'est pas divisible par $3$ donc $${texNombre(
              n
            )}$ n'est pas divisible par $3$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [0, 1, 0]
          }
          break

        case 9:
          n = choice([randint(100, 999), randint(10000, 99999)]).toString() // transformé en string pour avoir accès aux chiffres
          sommeString = sommeDesChiffres(n)
          texte = `$${texNombre(n)}$ est-il divisible par $9$ ?`
          if (calcul(sommeString) % 9 == 0) {
            texteCorr = `$${sommeString}=${calcul(sommeString)}=9\\times${calcul(sommeString) / 9
              }$<br>`
            texteCorr += `La somme des chiffres de $${texNombre(
              n
            )}$ est divisible par $9$ donc $${texNombre(
              n
            )}$ est divisible par $9$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [1, 0, 0]
          } else {
            texteCorr = `$${sommeString}=${calcul(sommeString)}=9\\times${(calcul(sommeString) - (calcul(sommeString) % 9)) / 9
              }+${calcul(sommeString) % 9}$<br>`
            texteCorr += `La somme des chiffres de $${texNombre(
              n
            )}$ n'est pas divisible par $9$ donc $${texNombre(
              n
            )}$ n'est pas divisible par $9$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [0, 1, 0]
          }
          break

        case 5:
          u = choice([randint(1, 9, [0, 5]), randint(1, 9, [0, 5]), 5, 0]) // 1 fois sur 2 ça sera divisible par 5
          n = randint(10, 9999) * 10 + u
          texte = `$${texNombre(n)}$ est-il divisible par $5$ ?`
          if (u % 5 == 0) {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(n)}$ est divisible par $5$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [1, 0, 0]
          } else {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(
              n
            )}$ n'est pas divisible par $5$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [0, 1, 0]
          }
          break

        case 10:
          u = choice([randint(1, 9), 0]) // 1 fois sur 2 ça sera divisible par 10
          n = randint(10, 9999) * 10 + u
          texte = `$${texNombre(n)}$ est-il divisible par $10$ ?`
          if (u == 0) {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(n)}$ est divisible par $10$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [1, 0, 0]
          } else {
            texteCorr = `Le chiffre des unités de $${texNombre(
              n
            )}$ est $${u}$ donc $${texNombre(
              n
            )}$ n'est pas divisible par $10$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [0, 1, 0]
          }
          break

        case 'autre':
          n = randint(100, 999)
          u = choice([7, 7, 7, 7, 13, 17, 19])
          if (u == 7) {
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
          texteCorr = `On ne connait pas de critère de divisibilité par $${u}$, on calcule donc la division euclidienne de $${texNombre(
            n
          )}$ par $${u}$.<br>`
          if (n % u == 0) {
            texteCorr += `$${texNombre(n)}=${u}\\times${texNombre(
              n / u
            )}$<br>`
            texteCorr += `Le reste de la division euclidienne est nul donc $${texNombre(
              n
            )}$ est divisible par $${u}$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [1, 0, 0]
          } else {
            texteCorr += `$${texNombre(n)}=${u}\\times${(n - (n % u)) / u}+${n % u
              }$<br>`
            texteCorr += `Le reste de la division euclidienne n'est pas nul donc $${texNombre(
              n
            )}$ n'est pas divisible par $${u}$.`
            tabrep = ['Oui', 'Non', 'Je ne sais pas']
            tabicone = [0, 1, 0]
          }

          break
      }
      if (this.modeQcm && !mathalea.sortieAMC) {
        texteCorr = ''
        texte += `<br><br>  Réponses possibles : ${espace}  `
        shuffle2tableaux(tabrep, tabicone)
        for (let i = 0; i < tabrep.length; i++) {
          texte += `$\\square\\;$ ${tabrep[i]}` + espace
          if (tabicone[i] == 1) {
            texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace
          } else {
            texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace
          }
        }
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
        this.qcm[1].push([`${texte}. \n `,
          tabrep,
          tabicone])
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Choix des questions',
    4,
    '1 : Critères de divisibilité par 2, 5, 10\n\
2 : Critères de divisibilité par 3,9\n3 : Critères de divisibilité par 2, 3, 5, 9, 10\n4 : Avec ou sans critère de divisibilité'
  ]
}
