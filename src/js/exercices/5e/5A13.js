import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, choice, compareNombres, texNombre, combinaisonListes } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Décomposition en facteurs premiers'

/**
* Décomposer en produit de facteurs premiers un nombre (la décomposition aura 3, 4 ou 5 facteurs premiers)
* @author Rémi Angot
5A13
*/
export default function ExerciceDecomposerEnFacteursPremiers () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Écrire les nombres suivants sous la forme d'un produit de facteurs premiers rangés dans l'ordre croissant."
  this.spacing = 2
  this.nbQuestions = 6
  this.sup = 2 // 4 facteurs par défaut
  this.sup2 = false // pas de multiplication par 100

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const grandNombres = combinaisonListes([false, false, false, true], this.nbQuestions)
    this.sup = parseInt(this.sup)
    for (let i = 0, n, facteurs = [], nbFacteurs, texte, reponse, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      facteurs = []
      nbFacteurs = this.sup + 2
      for (let k = 0; k < nbFacteurs; k++) {
        if (k < nbFacteurs - 1) {
          if (nbFacteurs > 3 && k === 0) { facteurs.push(2) } else if (nbFacteurs > 4 && k === 1) { facteurs.push(2) } else {
            facteurs.push(choice([2, 3, 5]))
          }
        } else { facteurs.push(choice([2, 5, 7, 11])) }
      }

      if (this.sup2 && grandNombres[i]) { // Une fois sur 4 on multilie le nombre par 100
        facteurs.push(2, 2, 5, 5)
      }
      n = 1
      for (let k = 0; k < facteurs.length; k++) {
        n = n * facteurs[k]
      }
      texte = '$ ' + texNombre(n) + ' = \\dotfill $'
      texteCorr = '$ ' + texNombre(n) + ' = '
      reponse = ''
      facteurs.sort(compareNombres) // classe les facteurs dans l'ordre croissant
      for (let k = 0; k < facteurs.length - 1; k++) {
        texteCorr += facteurs[k] + ' \\times  '
        reponse += facteurs[k] + '\\times'
      }
      texteCorr += facteurs[facteurs.length - 1] + ' $'
      reponse += facteurs[facteurs.length - 1]
      texte += ajouteChampTexteMathLive(this, i)
      setReponse(this, i, reponse)
      if (this.questionJamaisPosee(i, ...facteurs)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Nombre de facteurs', 3, '1 : 3 facteurs\n2 : 4 facteurs\n3 : 5 facteurs']
  this.besoinFormulaire2CaseACocher = ['Grands nombres (une fois sur quatre)']
}
