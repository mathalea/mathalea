import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { ecritureAlgebrique } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { printlatex } from '../../modules/outils/texMiseEnForme.js'
import { lettreDepuisChiffre } from '../../modules/outils/lettres.js'
export const titre = 'Réduire une expression de la forme $ax+bx$ '
export const interactifReady = true
export const interactifType = 'mathLive'

/**
* Réduire des expressions de la forme ax+bx
*
* @author Rémi Angot
* 5L13
*/
export const uuid = '1bce3'
export const ref = '5L13'
export default function Reductionaxbx () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = 'Réduire les expressions suivantes, si cela est possible.'
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typesDeQuestionsDisponibles = ['ax+bx', 'ax+bx', 'ax+bx', 'ax+bx', 'ax+x']
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, reponse, a, b, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(-11, 11, 0)
      b = randint(-11, 11, [0, a])
      switch (listeTypeDeQuestions[i]) {
        case 'ax+bx':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x)`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+(${b}*x)`)}=(${a}${ecritureAlgebrique(b)})\\times x=${printlatex(`${a + b}x`)}$`
          reponse = printlatex(`${a + b}x`)
          break
        case 'ax+x':
          texte = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+x`)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${printlatex(`${a}*x+x`)}=(${a}+1)\\times x=${printlatex(`${a + 1}x`)}$`
          reponse = printlatex(`${a + 1}x`)
          break
      }
      setReponse(this, i, [reponse, `${lettreDepuisChiffre(i + 1)}=${reponse}`])
      texte += ajouteChampTexteMathLive(this, i)
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
