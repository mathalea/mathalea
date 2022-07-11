import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, choice, premiersEntreBornes } from '../../modules/outils.js'
import Decimal from 'decimal.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Déterminer si un nombre est premier'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '11/07/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice:
 * Dire si un nombre est premier : Un nombre premier inférieur à 30, Un nombre premier entre 30 et 500,
 * un produit de nombres premiers inférieur à 30 : tester les divisions
 * @author Olivier Mimeau
 * Référence 5A12-2
*/
export default class PremierOuPas extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Les nombres suivants sont ils premiers ?'
    this.consigneCorrection = 'Il faut mémoriser la liste des nombres premiers inférieur à $30$ : $2, 3, 5, 7, 11, 13, 17, 19, 23$ et $29$.' // Chaîne de caractère en général vide qui apparaît au-dessus des corrections.
    this.nbQuestions = 3 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.video = '' // Id YouTube ou url
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['PremierInf30', 'PremierSup30', 'NombreCompose'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    const listePremiers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    let nombreATrouver, racineNombreATrouver, nb1, nb2, nb12Min, ind
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'PremierInf30':
          nombreATrouver = choice(listePremiers)
          texteCorr = `$${nombreATrouver}$ est un nombre premier qui fait partie de la liste à apprendre.`
          this.autoCorrection[i] = {
            enonce: `${nombreATrouver}`,
            propositions: [
              {
                texte: 'est un nombre premier',
                statut: true, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: 'message1' // qui s'affichera si la réponse est juste ou s'il n'y a qu'une erreur
              },
              {
                texte: 'n\'est pas un nombre premier',
                statut: false, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: 'message1'
              }
            ],
            options: {
              ordered: true,
              vertical: true, // facultatif. true : si on veut une présentation en plusieurs colonnes. false : valeur par défaut, les cases à cocher sont à la suite, toutes sur une colonne. Exercice-témoin : can5A01
              nbCols: 2
            }
          }
          break
        case 'PremierSup30':
          nombreATrouver = choice(premiersEntreBornes(30, 500))
          racineNombreATrouver = Math.round(Math.sqrt(nombreATrouver))
          texteCorr = `$${nombreATrouver}$ est un nombre premier.`
          texteCorr += ` $${racineNombreATrouver} \\times ${racineNombreATrouver} < ${nombreATrouver} < ${racineNombreATrouver + 1} \\times ${racineNombreATrouver + 1}$. `
          texteCorr += ` On teste les divisions de $${nombreATrouver}$ par les nombres premiers inférieurs à $${racineNombreATrouver}$ :<br>`
          ind = 0
          while (listePremiers[ind] <= racineNombreATrouver) {
            texteCorr += `$${nombreATrouver} \\div  ${listePremiers[ind]}$ `
            const rsltDiv = new Decimal(nombreATrouver).div(listePremiers[ind])
            if (rsltDiv.equals(rsltDiv.toFixed(2))) {
              texteCorr += `= $${rsltDiv}$<br>`
            } else {
              texteCorr += `$\\approx$ $${rsltDiv.toFixed(2)}$<br>`
            }
            ind = ind + 1
          }
          texteCorr += `$${nombreATrouver}$ n'a donc pas d'autres diviseurs que $1$ et lui même.`
          this.autoCorrection[i] = {
            enonce: `${nombreATrouver}`,
            propositions: [
              {
                texte: 'est un nombre premier',
                statut: true, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: 'message1' // qui s'affichera si la réponse est juste ou s'il n'y a qu'une erreur
              },
              {
                texte: 'n\'est pas un nombre premier',
                statut: false, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: 'message1'
              }
            ],
            options: {
              ordered: true,
              vertical: true, // facultatif. true : si on veut une présentation en plusieurs colonnes. false : valeur par défaut, les cases à cocher sont à la suite, toutes sur une colonne. Exercice-témoin : can5A01
              nbCols: 2
            }
          }
          break
        case 'NombreCompose':
          nb1 = choice([7, 11, 13, 17, 19, 23, 29])
          nb2 = choice([7, 11, 13, 17, 19])
          nb12Min = Math.min(nb1, nb2)
          nombreATrouver = nb1 * nb2
          racineNombreATrouver = Math.round(Math.sqrt(nombreATrouver))
          texteCorr = `$${nombreATrouver}$ n'est pas un nombre premier.`
          if ((nombreATrouver !== 49) && (nombreATrouver !== 77)) {
            // texteCorr += ` On teste les divisions de $${nombreATrouver}$ par les nombres premiers :<br> `
            texteCorr += ` $${racineNombreATrouver} \\times ${racineNombreATrouver} < ${nombreATrouver} < ${racineNombreATrouver + 1} \\times ${racineNombreATrouver + 1}$. `
            texteCorr += ` On teste les divisions de $${nombreATrouver}$ par les nombres premiers inférieurs à $${racineNombreATrouver}$ :<br>`
            ind = 0
            while (listePremiers[ind] <= nb12Min) {
              texteCorr += `$${nombreATrouver} \\div  ${listePremiers[ind]}$ `
              const rsltDiv = new Decimal(nombreATrouver).div(listePremiers[ind])
              if (rsltDiv.equals(rsltDiv.toFixed(2))) {
                texteCorr += `= $${rsltDiv}$<br>`
              } else {
                texteCorr += `$\\approx$ $${rsltDiv.toFixed(2)}$<br>`
              }
              ind = ind + 1
            }
            texteCorr += `La dernière division permet d'écrire $${nombreATrouver} = ${nb1} \\times ${nb2}$.<br>`
            texteCorr += `$${nombreATrouver}$ a donc d'autres diviseurs que $1$ et lui même.`
          } else {
            texteCorr += `$${nombreATrouver} = ${nb1} \\times ${nb2}$.`
          }
          this.autoCorrection[i] = {
            enonce: `${nombreATrouver}`,
            propositions: [
              {
                texte: 'est un nombre premier',
                statut: false, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: 'message1' // qui s'affichera si la réponse est juste ou s'il n'y a qu'une erreur
              },
              {
                texte: 'n\'est pas un nombre premier',
                statut: true, // true ou false pour indiquer si c'est une bonne réponse (true)
                feedback: 'message1'
              }
            ],
            options: {
              ordered: true,
              vertical: true, // facultatif. true : si on veut une présentation en plusieurs colonnes. false : valeur par défaut, les cases à cocher sont à la suite, toutes sur une colonne. Exercice-témoin : can5A01
              nbCols: 2
            }
          }
          break
      }
      texte = `${nombreATrouver}`
      if (this.interactif) {
        texte += propositionsQcm(this, i).texte
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
