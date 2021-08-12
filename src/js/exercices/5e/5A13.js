import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, compareNombres, texNombre } from '../../modules/outils.js'

export const titre = 'Décomposition en facteurs premiers'

/**
* Décomposer en produit de facteurs premiers un nombre (la décomposition aura 3, 4 ou 5 facteurs premiers)
* @author Rémi Angot
5A13
*/
export default function ExerciceDecomposerEnFacteursPremiers () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Écrire les nombres suivants sous la forme d'un produit de facteurs premiers."
  this.spacing = 2
  this.nbQuestions = 6

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, n, facteurs = [], nbFacteurs, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      facteurs = []
      nbFacteurs = randint(3, 5)
      for (let k = 0; k < nbFacteurs; k++) {
        if (k < nbFacteurs - 1) {
          if (nbFacteurs > 3 && k === 0) { facteurs.push(2) } else if (nbFacteurs > 4 && k == 1) { facteurs.push(2) } else {
            facteurs.push(choice([2, 3, 5]))
          }
        } else { facteurs.push(choice([2, 5, 7, 11])) }
      }

      if (randint(1, 4) == 1) { // Une fois sur 4 on multilie le nombre par 100
        facteurs.push(2, 2, 5, 5)
      }
      n = 1
      for (let k = 0; k < facteurs.length; k++) {
        facteurs[k]
        n = n * facteurs[k]
      }
      texte = '$ ' + texNombre(n) + ' = \\dotfill $'
      texteCorr = '$ ' + texNombre(n) + ' = '
      facteurs.sort(compareNombres) // classe les facteurs dans l'ordre croissant
      for (let k = 0; k < facteurs.length - 1; k++) {
        facteurs[k]
        texteCorr += facteurs[k] + ' \\times  '
      }
      texteCorr += facteurs[facteurs.length - 1] + ' $'

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
