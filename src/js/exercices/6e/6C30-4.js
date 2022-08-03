import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, texNombrec, texNombre2, calcul, choice, texFraction } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'

export const amcReady = true
export const amcType = 'qcmMono' // QCM
export const interactifType = 'qcm'
export const interactifReady = true

export const titre = 'Multiplier par 0,1 ; 0,01 ; 0,001 (placer la virgule)'

/**
 * @author Jean-claude Lhote
 * Publié le 20/02/2021
 * Référence 6C30-4
 * Relecture : Décembre 2021 par EE
 */
export default function PlacerLaVirgule () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 4 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.consigne = 'Les calculs suivants sont faux. Placer la virgule correctement dans le résultat pour que le calcul soit juste.'
  this.sup = false

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    if (this.nbQuestions > 1) {
      if (this.interactif) {
        this.consigne = 'Déterminer le résultat de ces multiplications.'
      } else {
        this.consigne = 'Les calculs suivants sont faux. Placer la virgule correctement dans le résultat pour que le calcul soit juste.'
      }
    } else {
      if (this.interactif) {
        this.consigne = 'Déterminer le résultat de cette multiplication.'
      } else {
        this.consigne = 'Le calcul suivant est faux. Placer la virgule correctement dans le résultat pour que le calcul soit juste.'
      }
    }

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []
    const rang = ['millièmes', 'centièmes', 'dixièmes']

    // Indispensable d'exporter les solutions pour rendre le QCM interactif
    this.tableauSolutionsDuQcm = []
    for (let i = 0, texte, texteCorr, coef, nombre, nombreentier, resultat, exposant, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      coef = -randint(1, 3)
      if (!this.sup) {
        exposant = -randint(1, 3)
      } else {
        exposant = 0
      }
      nombreentier = calcul(randint(10, 1000) + randint(10, 999) * choice([0, 1000]))
      nombre = calcul(nombreentier * 10 ** exposant)
      resultat = calcul(nombre * 10 ** coef)
      texte = `$${texNombre2(nombre)} \\times ${texNombre2(calcul(10 ** coef))}$`
      if (!this.interactif) {
        texte += `$~~ = ~~\\phantom{......}${texNombre2(nombreentier)}$<br>`
      }
      texteCorr = `Quand on multiplie par $${texNombre2(calcul(10 ** coef))}=${texFraction(1, calcul(10 ** (-coef)))}$, chaque chiffre prend une valeur $${texNombrec(10 ** (-coef))}$ fois plus petite.<br>`
      texteCorr += `Le chiffre des unités se positionne donc dans les ${rang[3 + coef]} :<br>`
      texteCorr += `$${texNombre2(nombre)} \\times ${texNombre2(calcul(10 ** coef))} = ${texNombre2(resultat)}$`// ${texNombrec(Math.floor(resultat))}${miseEnEvidence(',')}${texNombrec(resultat-Math.floor(resultat)).replace('0,','')}$`

      this.autoCorrection[i] = {}
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [
        {
          texte: `$${texNombre2(resultat)}$`,
          statut: true
        },
        {
          texte: `$${texNombre2(calcul(resultat / 10))}$`,
          statut: false
        },
        {
          texte: `$${texNombre2(calcul(resultat * 10))}$`,
          statut: false
        },
        {
          texte: `$${texNombre2(calcul(resultat / 100))}$`,
          statut: false
        }
      ]
      this.autoCorrection[i].options = {
        ordered: false,
        lastChoice: 4
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
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  this.besoinFormulaireCaseACocher = ['Nombres entiers', true]
} // Fin de l'exercice.
