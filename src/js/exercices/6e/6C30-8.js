import Exercice from '../Exercice.js'
import { calcul, listeQuestionsToContenu, combinaisonListes, randint, texNombre2, choice, miseEnEvidence } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'

export const amcReady = true
export const amcType = 'qcmMono' // QCM
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Diviser par 10, 100 ou 1 000'

export const dateDePublication = '08/12/2021'

/**
 * @author Eric Elter (déclinaison de 6C30-5 de Jean-Claude Lhote)
 * Publié le 08/12/2021
 * Référence 6C30-8
 */
export const uuid = '9540b'
export const ref = '6C30-8'
export default function DiviserPar101001000 () {
  'use strict'
  Exercice.call(this)
  this.nbQuestions = 4 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.consigne = 'Compléter les pointillés.'
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

  this.sup = false
  this.sup2 = true
  this.sup3 = 4

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    this.sup3 = parseInt(this.sup3)
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []
    let typeDeQuestionsDisponibles
    if (parseInt(this.sup3) === 4) {
      typeDeQuestionsDisponibles = [1, 2, 3]
    } else {
      typeDeQuestionsDisponibles = [parseInt(this.sup3)]
    }
    const listeTypeDeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions)
    const rang = ['millièmes', 'centièmes', 'dixièmes']

    for (let i = 0, texte, texteCorr, coef, nombre, nombreentier, resultat, exposant, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      coef = -randint(1, 3)
      if (this.sup2) {
        if (this.sup) {
          exposant = 0
        } else {
          switch (coef) {
            case -1:
              exposant = -randint(0, 2)
              break
            case -2:
              exposant = -randint(0, 1)
              break
            case -3:
              exposant = -randint(0, 0)
              break
          }
        }
      } else {
        exposant = this.sup ? 0 : exposant = -randint(1, 3)
      }
      nombreentier = calcul(randint(10, 1000) + randint(10, 999) * choice([0, 1000]))
      nombre = calcul(nombreentier * 10 ** exposant)
      resultat = calcul(nombre * 10 ** coef)
      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1:
          texte = `$${texNombre2(nombre)}\\div ${texNombre2(calcul(10 ** -coef))}=\\ldots\\ldots\\ldots\\ldots$`
          texteCorr = `Quand on divise par $${texNombre2(calcul(10 ** -coef))}$, chaque chiffre prend une valeur $${texNombre2(calcul(10 ** (-coef)))}$ fois plus petite.<br>`
          texteCorr += `Le chiffre des unités se positionne donc dans les ${rang[3 + coef]} :<br>`
          texteCorr += `$${texNombre2(nombre)}\\div ${texNombre2(calcul(10 ** -coef))}=${miseEnEvidence(texNombre2(resultat), 'blue')}$`

          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texNombre2(resultat)}$`,
              statut: true
            },
            {
              texte: `$${texNombre2(calcul(nombre * 10 ** (-coef)))}$`,
              statut: false
            },
            {
              texte: `$${texNombre2(calcul(nombre * 10 ** (coef - 1)))}$`,
              statut: false
            },
            {
              texte: `$${texNombre2(calcul(nombre * 10 ** (-coef + 1)))}$`,
              statut: false
            }
          ]
          this.autoCorrection[i].options = {
            ordered: false,
            lastChoice: 5
          }
          break

        case 2:
          texte = `$${texNombre2(nombre)}\\div \\ldots\\ldots\\ldots=${texNombre2(resultat)}$`
          texteCorr = `Le chiffre des unités de $${texNombre2(nombre)}$ se positionne sur le chiffre des ${rang[3 + coef]} dans $${texNombre2(resultat)}$.<br>`
          texteCorr += `Chaque chiffre prend une valeur $${texNombre2(10 ** (-coef))}$ fois plus petite, donc on divise par $${texNombre2(10 ** -coef)}$.<br>`
          texteCorr += `$${texNombre2(nombre)}\\div ${miseEnEvidence(texNombre2(10 ** -coef), 'blue')}=${texNombre2(resultat)}$`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texNombre2(calcul(10 ** 1))}$`,
              statut: -coef === 1
            },
            {
              texte: `$${texNombre2(calcul(10 ** 2))}$`,
              statut: -coef === 2
            },
            {
              texte: `$${texNombre2(calcul(10 ** 3))}$`,
              statut: -coef === 3
            },
            {
              texte: `$${texNombre2(calcul(10 ** 4))}$`,
              statut: -coef === 4
            }
          ]
          this.autoCorrection[i].options = {
            ordered: false,
            lastChoice: 5
          }
          break

        case 3:
          texte = `$\\ldots\\ldots\\ldots\\ldots\\div ${texNombre2(10 ** -coef)}=${texNombre2(resultat)}$`
          texteCorr = `Quand on divise par $${texNombre2(10 ** -coef)}$, chaque chiffre prend une valeur $${texNombre2(10 ** (-coef))}$ fois plus petite.<br>`
          texteCorr += `Le chiffre des unités se positionne donc dans les ${rang[3 + coef]} :<br>`
          texteCorr += `$${miseEnEvidence(texNombre2(nombre), 'blue')}\\div ${texNombre2(10 ** -coef)}=${texNombre2(resultat)}$`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texNombre2(nombre)}$`,
              statut: true
            },
            {
              texte: `$${texNombre2(calcul(nombre / 10))}$`,
              statut: false
            },
            {
              texte: `$${texNombre2(calcul(nombre * 10))}$`,
              statut: false
            },
            {
              texte: `$${texNombre2(calcul(nombre * 10 ** (-coef + 1)))}$`,
              statut: false
            }
          ]
          this.autoCorrection[i].options = {
            ordered: false,
            lastChoice: 5
          }
          break
      }
      if (this.interactif) {
        texte += '<br>' + propositionsQcm(this, i).texte
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup3 et sup3.
  this.besoinFormulaireCaseACocher = ['Le dividende est un nombre entier', false]
  this.besoinFormulaire2CaseACocher = ['Trois décimales maximum', true]
  this.besoinFormulaire3Numerique = ['Type de questions', 4, ' 1 : Résultat à calculer\n 2 : Nombre à retrouver\n 3 : 10, 100 ou 1 000 à retrouver\n 4 : Mélange']

  // this.besoinFormulaire3CaseACocher =['Mode QCM',false]
} // Fin de l'exercice.
