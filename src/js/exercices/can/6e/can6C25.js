import Exercice from '../../Exercice.js'
import { randint, choice, texNombre, prenomF } from '../../../modules/outils.js'
export const titre = 'Rechercher un prix unitaire'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can6C25
 * Date de publication 18/10/2021
*/
export default function RecherchePrix () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: ' €' }
  this.nouvelleVersion = function () {
    const listeviennoiserie = [
      ['pains au chocolat', ' un pain au chocolat'],
      ['chocolatines', 'une chocolatine'], ['pains aux raisins', 'un pain aux raisins'], ['cookies', 'un cookie'], ['brioches', 'une brioche']]
    const a = randint(2, 6)
    const v = choice(listeviennoiserie)
    const p = v[0]
    const s = v[1]
    const t = choice([10, 20])
    const prenom1 = prenomF()
    const pu = choice([0.9, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6])
    this.question = `A la boulangerie, ${prenom1} achète $${a}$ ${p}.<br>
     Elle paie avec un billet de $${t}$ euros.<br>
    On lui rend $${texNombre(t - a * pu)}$ euros.<br>
    Quel est le prix d'${s} ?`
    this.correction = `${prenom1} achète $${a}$ ${p}. Comme on lui rend $${texNombre(t - a * pu)}$ euros sur son billet de $${t}$ euros,
    ses ${p} lui ont coûté : $${t}-${texNombre(t - a * pu)}=${texNombre(a * pu)}$ euros.<br>
    Le prix d'${s} est donc donné par :  $${texNombre(a * pu)}\\div ${a}=${texNombre(pu)}$ euros. `
    this.reponse = pu
  }
}

//
//    v = choice(listeviennoiserie)
//   p = v[0]
//   s = v[1]
