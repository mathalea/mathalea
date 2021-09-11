import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombrec } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'

import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
import { evaluate } from 'mathjs'
// import math from 'mathjs'

export const titre = 'Notation scientifique'
export const interactifReady = true
export const interactifType = 'numerique'
export const amcReady = true
export const amcType = 'AMCNum' // type de question AMC

/**
 * Ecrire un nombre décimal en notation scientifique et inversement
 * @author Jean-Claude Lhote
 * 4C32
 */

export default function NotationScientifique () {
  Exercice.call(this)
  this.sup = 1
  this.sup2 = 1
  this.titre = titre
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nbQuestions = 5
  this.interactif = false
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.amcType = amcType
  this.amcReady = amcReady

  /********************************************************************/
  /** Type 4 : questionmultx avec AMCnumericChoices */
  // Dans ce cas, le tableau des booléens comprend les renseignements nécessaires pour paramétrer \AMCnumericCoices
  // {int digits,int decimals,bool signe,int exposantNbChiffres,bool exposantSigne,int approx}
  // La correction est dans tabQCM[1][0] et la réponse numlérique est dans tabQCM[1][1]
  /********************************************************************/

  this.nouvelleVersion = function () {
    let reponse
    if (parseInt(this.sup) === 1) this.consigne = 'Donner l\'écriture scientifique des nombres suivants.'
    else this.consigne = 'Donner l\'écriture décimale des nombres suivants.'
    let typesDeQuestionsDisponibles
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (parseInt(this.sup2) === 1) typesDeQuestionsDisponibles = [0, 0, 0, 1, 1]
    else if (parseInt(this.sup2) === 2) typesDeQuestionsDisponibles = [0, 1, 1, 2, 2]
    else typesDeQuestionsDisponibles = [2, 2, 3, 3, 3]

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, mantisse, exp, decimalstring, scientifiquestring, cpt = 0;
      i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 0:
          mantisse = randint(1, 9)
          if (!context.isAmc) {
            exp = randint(1, 5)
          } else {
            exp = randint(1, 3)
          }

          break
        case 1:
          mantisse = calcul(randint(11, 99) / 10)
          if (!context.isAmc) {
            exp = randint(1, 5)
          } else {
            exp = randint(1, 3)
          }
          break
        case 2:
          if (randint(0, 1) === 1) mantisse = calcul(randint(111, 999) / 100)
          else mantisse = calcul((randint(1, 9) * 100 + randint(1, 9)) / 100)
          if (!context.isAmc) {
            exp = randint(1, 7) * choice([-1, 1])
          } else {
            exp = randint(1, 3) * choice([-1, 1])
          }
          break
        case 3:
          if (randint(0, 1) === 1) mantisse = calcul((randint(1, 9) * 1000 + randint(1, 19) * 5) / 1000)
          else mantisse = calcul(randint(1111, 9999) / 1000)
          if (!context.isAmc) {
            exp = randint(1, 7) * choice([-1, 1])
          } else {
            exp = randint(1, 3) * choice([-1, 1])
          }
          break
      }
      reponse = calcul(mantisse * 10 ** exp)
      // decimalstring = texNombrec(mantisse * 10 ** exp)
      scientifiquestring = `${texNombrec(mantisse)}\\times 10^{${exp}}`
      decimalstring = scientifiqueToDecimal(mantisse, exp)
      
      if (this.sup === 1) {
        texte = `$${decimalstring}$`
        texteCorr = `$${decimalstring} = ${scientifiquestring}$`
        if (this.interactif) {
          texte = ajouteChampTexte(this, i, {
            texte: `$${decimalstring} = $`
          })
        }
      } else {
        texteCorr = `$${scientifiquestring} = ${decimalstring}$`
        texte = `$${scientifiquestring}$`
        if (this.interactif) {
          texte = ajouteChampTexte(this, i, {
            texte: `$${scientifiquestring} = $`
          })
        }
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)

        if (parseInt(this.sup) === 1) {
          setReponse(this, i, reponse, { digits: listeTypeDeQuestions[i] + 1, decimals: listeTypeDeQuestions[i], signe: false, exposantNbChiffres: 1, exposantSigne: true, approx: 0 })
        } else {
          setReponse(this, i, reponse, { strict: false, vertical: false, digits: 2 * Math.abs(exp) + 1, decimals: Math.abs(exp), signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 })
        }
        if (context.isAmc) {
          if (parseInt(this.sup) === 1) {
            this.amcType = 4
            this.autoCorrection[i].enonce = "Donner l'écriture scientifique du nombre " + texte
          } else {
            this.amcType = 1
            this.autoCorrection[i].enonce = "Donner l'écriture décimale du nombre " + texte
            this.autoCorrection[i].options = {
              ordered: false,
              lastChoice: 5
            }
            this.autoCorrection[i].propositions = [
              {
                texte: `$${decimalstring}$`,
                statut: true
              },
              {
                texte: `$${texNombrec(mantisse * 10 ** (exp - 1))}$`,
                statut: false
              },
              {
                texte: `$${texNombrec(mantisse * 10 ** (exp + 1))}$`,
                statut: false
              },
              {
                texte: `$${texNombrec(mantisse * 10 ** (-exp))}$`,
                statut: false
              }
            ]
          }
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ["Type d'exercices", 2, '1 : Traduire en notation scientifique\n2 : Traduire en notation décimale']
  this.besoinFormulaire2Numerique = ['Niveaux de difficulté', 3, '1 : Facile\n2 : Moyen\n3 : Difficile']
}

const scientifiqueToDecimal = (mantisse, exp) => {
  mantisse = mantisse.toString()
  const indiceVirguleDepart = mantisse.indexOf('.')
  const indiceVirguleArrivee = indiceVirguleDepart + exp
  let mantisseSansVirgule = mantisse.replace('.', '')
  const indiceMax = mantisseSansVirgule.length - 1
  // indiceMax est l'indice du chiffre des unités
  if (indiceVirguleArrivee > indiceMax) {
    // On ajoute des 0 à droite
    for (let i = indiceMax + 1; i < indiceVirguleArrivee; i++) {
      mantisseSansVirgule += '0'
    }
  } else if (indiceVirguleArrivee > 0 && indiceVirguleArrivee <= indiceMax) {
    // On insère la virgule
    mantisseSansVirgule = mantisseSansVirgule.substring(0, indiceVirguleArrivee) + ',' + mantisseSansVirgule.substring(indiceVirguleArrivee, mantisseSansVirgule.length)
  } else {
    // On ajoute des 0 à gauche
    let partiGauche = '0,'
    for (let i = 0; i < Math.abs(indiceVirguleArrivee); i++) {
      partiGauche += '0'
    }
    mantisseSansVirgule = partiGauche + mantisseSansVirgule
  }
  return insereEspaceDansNombre(mantisseSansVirgule)
}

const insereEspaceDansNombre = nb => {
  const indiceVirgule = nb.indexOf(',')
  const indiceMax = nb.length - 1
  const tableauIndicesEspaces = []
  if (indiceVirgule > 0) {
    for (let i = 0; i < indiceMax; i++) {
      if ((i - indiceVirgule) % 3 === 0 && (i - indiceVirgule) !== 0) {
        tableauIndicesEspaces.push(i)
      }
    }
  } else {
    for (let i = 0; i < indiceMax; i++) {
      if ((indiceMax - i) % 3 === 0) {
        tableauIndicesEspaces.push(i)
      }
    }
  }
  for (let i = tableauIndicesEspaces.length - 1; i >= 0; i--) {
    const indice = tableauIndicesEspaces[i] + 1
    nb = insertCharInString(nb, indice, ' \\thickspace ')
  }
  return nb
}

const insertCharInString = (string, index, char) => string.substring(0, index) + char + string.substring(index, string.length)
