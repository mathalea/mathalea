import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, texNombre } from '../../modules/outils.js'
import { number, fraction, multiply, add, subtract } from 'mathjs'
import { Arbre } from '../../modules/arbres.js'
export const titre = 'Probabilités simples'

/**
 * Description didactique de l'exercice
 * @author Rémi Angot et Matthieu Devillers
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  /**
 * fonction pour tester les méthodes ci-dessus.
 * @param {String} nom Nom d'un arbre pour tester
 */
  /* function testArbre (nom) {
    const pin = new Arbre(null, 'Omega', 1)
    const sylvestre = pin.setFils('sylvestre', fraction(0.8))
    const maritime = pin.setFils('maritime', fraction(0.3))
    const B = sylvestre.setFils('B', fraction(0.5))
    const A = sylvestre.setFils('A', fraction(0.5))
    const C = maritime.setFils('C', fraction(0.4))
    const D = maritime.setFils('D', fraction(0.6))
    const E = D.setFils('E', fraction(0.25))
    const F = D.setFils('F', fraction(0.75))
    const G = F.setFils('G', fraction(0.5))
    console.log('nombres de branches : ',pin.getFils(nom).branches())
    console.log(pin.getFils(nom))
    console.log(pin.getProba(nom))
    console.log(sylvestre.getProba(nom, 1)) // on met 1 pour calculer la proba conditionnelle ici le pin est sylvestre. Si nom ==='A', alors le résultat est 0.5
    console.log(sylvestre.getProba(nom)) // on prend la proba sylvestre = 0.8, c'est donc equivalent à pin.getProba(nom). Si nom ==='A' alors le résultat est 0.8*0.5 = 0.4
    console.log(maritime.getProba(nom))
    console.log(B.getProba(nom))
  }
*/
  function texProba (proba, rationnel) {
    return rationnel ? fraction(proba).toLatex().replace('frac', 'dfrac') : number(proba).toString().replace('.', '{,}')
  }
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const pM = fraction(randint(20, 60), 100)
    const pG = fraction(randint(50, 80), 100)
    const pP = fraction(randint(50, 80), 100)
    // on crée l'arbre des probabilités.
    const match = new Arbre(null, 'Match', 1, this.sup)
    const M = match.setFils('M', pM, this.sup)
    const nonM = match.setFils('nonM', subtract(1, pM), this.sup)
    const MG = M.setFils('MG', pG, this.sup)
    const MP = M.setFils('MP', subtract(1, pG), this.sup)
    const PP = nonM.setFils('PP', pP, this.sup)
    const PG = nonM.setFils('PG', subtract(1, pP), this.sup)
    console.log(match)

    const sport = choice(['hand-ball', 'football', 'rugby', 'basket', 'volley-ball', 'water-polo', 'baseball'])
    console.log(this.sup)
    this.consigne = `Lors d'un match de ${sport}, l'équipe qui reçoit un adversaire a une probabilité de $${texProba(pM, this.sup)}$ de mener à la mi-temps.<br>`
    this.consigne += ` Si elle mène à la mi-temps, sa probabilité de gagner le match est de $${texProba(pG, this.sup)}$.<br>`
    this.consigne += ` Si elle perd à la mi-temps, sa probabilité de perdre le match est de $${texProba(pP, this.sup)}$.<br>`

    const question1 = 'Quelle est la probabilité, pour cette équipe, de gagner le match ?'
    let correction1 = 'Notons M l\'événement "Mener à la mi-temps" et nonM l\'événement contraire.<br>'
    correction1 += 'Notons G l\"événement "Gagner le match" et nonP l\'événement contraire "Ne pas gagner le match".<br>'
    correction1 += `$\\phantom{\\text{P("Ne pas perdre le match")}} = ${texProba(pM, this.sup)} + $${texProba(pG, this.sup)}$ <br> `
    correction1 += `$\\phantom{\\text{P("Ne pas perdre le match")}}= ${texProba(add(pM, pG), this.sup)}$  <br>`
    const question2 = 'Quelle est la probabilité, pour cette équipe, de perdre le match ?'
    let correction2 = 'L\'évènement "Perdre le match" est l\'évènement contraire de "Ne pas perdre le match", on peut donc affirmer que : <br> <br>'
    correction2 += '$ \\text{P("Perdre le match") + } \\text{P("Ne pas perdre le match")} = 1$ <br>'
    correction2 += '$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = 1 - \\text{P("Ne pas perdre le match")}$ <br>'
    correction2 += `$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = 1 - $${texProba(add(pM, pG), this.sup)}$  <br>`
    correction2 += `$ \\phantom{\\text{P("Ne pas perdre le match") + }} \\text{P("Perdre le match")} = $${texProba(subtract(1, add(pM, pG)), this.sup)}$ <br>`

    this.listeQuestions.push(question1, question2)
    this.listeCorrections.push(correction1, correction2)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Proba rationnelle', true]
}
