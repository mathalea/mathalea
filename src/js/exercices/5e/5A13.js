import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { choice } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { texteEnCouleurEtGras } from '../../modules/outils/contextSensitif.js'
import { texFactorisation } from '../../modules/outils/factorisation.js'
import { texNombre } from '../../modules/outils/texNombres.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Décomposition en facteurs premiers'

/**
* Décomposer en produit de facteurs premiers un nombre (la décomposition aura 3, 4 ou 5 facteurs premiers)
* @author Rémi Angot
5A13
*/
export const uuid = '7f50c'
export const ref = '5A13'
export default function ExerciceDecomposerEnFacteursPremiers () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Écrire les nombres suivants sous la forme d'un produit de facteurs premiers rangés dans l'ordre croissant."
  this.spacing = 2
  this.nbQuestions = 6
  this.sup = 2 // 4 facteurs par défaut
  this.sup2 = false // pas de multiplication par 100
  this.sup3 = false
  this.sup4 = false
  this.correctionDetailleeDisponible = true // booléen qui indique si une correction détaillée est disponible.
  this.correctionDetaillee = false // booléen indiquant si la correction détaillée doit être affiché par défaut (récupéré dans l'url avec le paramètre `,cd=`).
  function compareNombres (a, b) {
    return a - b
  }
  this.nouvelleVersion = function () {
    if (this.level === 2) {
      this.sup = 3
      this.sup2 = true
    }
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let grandNombres
    let listeFacteurs1, listeFacteurs2
    if (this.sup3) {
      listeFacteurs1 = [2, 3, 5, 7, 11]
      listeFacteurs2 = [2, 3, 7, 13, 17]
    } else {
      listeFacteurs1 = [2, 3, 5]
      listeFacteurs2 = [2, 5, 7, 11]
    }
    if (this.sup2 && this.sup3) {
      grandNombres = combinaisonListes([true, true, false, true], this.nbQuestions)
    } else if (this.sup2) {
      grandNombres = combinaisonListes([false, false, false, true], this.nbQuestions)
    } else {
      grandNombres = combinaisonListes([false, false, false, false], this.nbQuestions)
    }
    this.sup = parseInt(this.sup)
    for (let i = 0, n, facteurs = [], nbFacteurs, texte, reponse, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      facteurs = []
      nbFacteurs = this.sup + 2
      for (let k = 0; k < nbFacteurs; k++) {
        if (k < nbFacteurs - 1) {
          if (nbFacteurs > 3 && k === 0) {
            this.sup3 ? facteurs.push(choice([2, 3])) : facteurs.push(2)
          } else if (nbFacteurs > 4 && k === 1) {
            this.sup3 ? facteurs.push(choice([2, 3])) : facteurs.push(2)
          } else {
            this.sup3 ? facteurs.push(choice(listeFacteurs1.concat(7))) : facteurs.push(choice(listeFacteurs1))
          }
        } else {
          this.sup3 ? facteurs.push(choice(listeFacteurs2.concat([3, 13]))) : facteurs.push(choice(listeFacteurs2))
        }
      }

      if (this.sup2 && grandNombres[i]) { // Une fois sur 4 on multilie le nombre par 100 (par 60 pour le niveau 2nde)
        this.sup3 ? facteurs.push(2, 2, 3, 5) : facteurs.push(2, 2, 5, 5)
      }
      n = 1
      for (let k = 0; k < facteurs.length; k++) {
        n = n * facteurs[k]
      }
      texte = '$ ' + texNombre(n) + ' =$'
      if (!this.correctionDetaillee) {
        texteCorr = '$ ' + texNombre(n) + ' = '
      } else {
        texteCorr = ''
      }
      reponse = ''
      facteurs.sort(compareNombres) // classe les facteurs dans l'ordre croissant
      let ensembleDeFacteurs = new Set(facteurs)
      ensembleDeFacteurs = [...ensembleDeFacteurs] // tableau des facteurs sans répétition
      let produitAvecPuissances = ''
      for (let k = 0; k < ensembleDeFacteurs.length; k++) {
        const facteur = ensembleDeFacteurs[k]
        let puissance = 0
        for (let j = 0; j < facteurs.length; j++) {
          if (facteurs[j] === facteur) puissance++
        }
        if (puissance > 1) {
          produitAvecPuissances += `${facteur}^${puissance}`
        } else {
          produitAvecPuissances += `${facteur}`
        }
        if (k !== ensembleDeFacteurs.length - 1) produitAvecPuissances += ' \\times '
      }
      let produitRestant = 1
      let debutDecomposition = ''
      let decompositionFinale = ''
      // texteCorr += facteurs
      for (let k = 0; k < facteurs.length - 1; k++) {
        if (!this.sup3 && !this.sup4) {
          if (!this.correctionDetaillee) {
            texteCorr += facteurs[k] + ' \\times  '
          } else {
            debutDecomposition += facteurs[k] + ' \\times  '
            for (let j = k + 1; j < facteurs.length; j++) {
              produitRestant = produitRestant * facteurs[j]
            }
            texteCorr += '$' + texNombre(n) + ' = ' + debutDecomposition + produitRestant + '$<br>'
            decompositionFinale = debutDecomposition + produitRestant
            produitRestant = 1
          }
        }
        reponse += facteurs[k] + '\\times'
      }
      if (!this.sup3 && !this.sup4) {
        if (!this.correctionDetaillee) {
          texteCorr += facteurs[facteurs.length - 1]
        }
      } else {
        texteCorr += texFactorisation(n, true)
      }
      if (!this.correctionDetaillee) {
        texteCorr += ' $'
      } else {
        texteCorr += texteEnCouleurEtGras(`Donc la décomposition en produit de facteurs premiers de $\\mathbf{${texNombre(n)}}$ vaut $\\mathbf{${decompositionFinale}}$`)
      }
      reponse += facteurs[facteurs.length - 1]
      texte += ajouteChampTexteMathLive(this, i)
      setReponse(this, i, [reponse, produitAvecPuissances])
      if (this.questionJamaisPosee(i, ...facteurs)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : 3 facteurs\n2 : 4 facteurs\n3 : 5 facteurs']
  this.besoinFormulaire2CaseACocher = ['Grands nombres (une fois sur quatre)']
}
