import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { texFractionReduite } from '../../../modules/outils/arrayFractions.js'
import { choice } from '../../../modules/outils/arrays.js'
import { sp } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { listeQuestionsToContenu } from '../../../modules/outils/miseEnForme.js'
import { calcul, texNombrec } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Convertir des heures décimales en heures/minutes et inversement'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '08/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can5D01
 */
export const uuid = 'd8797'
export const ref = 'can5D01'
export default function ConversionHeuresDecimalesMinutes () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let a, b, d, texte, texteCorr
    for (let i = 0, index = 0, nbChamps, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2])) { //, 'b'
        case 1 :

          a = randint(1, 5)
          b = choice([0.25, 0.5, 0.75])
          d = calcul(b * 60)
          if (!this.interactif) {
            texte = `Convertir en heures/minutes : <br>$${texNombrec(a + b)}$ h $=$ ..... h..... min`
            texteCorr = `$${texNombrec(a + b)}$h$ = ${a}$ h $ + ${texNombrec(b)} \\times 60  = ${a}$ h $${d}$ min`
          } else {
            texte = `Convertir en heures/minutes : <br>$${texNombrec(a + b)}$ h $=$`
            texte += ajouteChampTexteMathLive(this, index, 'largeur10 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, a)
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur10 inline', { texteApres: sp(5) + 'min' })
            texteCorr = `$${texNombrec(a + b)}$h$ = ${a}$ h $ + ${texNombrec(b)} \\times 60$ min $  = ${a}$ h $${d}$ min`
            setReponse(this, index + 1, d)
            nbChamps = 2
          }
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = `$${texNombrec(a + b)}$ h = $\\ldots$ h $\\ldots$ min`
          break

        case 2 :

          a = randint(1, 5)
          b = choice([0.25, 0.5, 0.75])
          d = calcul(b * 60)
          if (!this.interactif) {
            texte = `Compléter par un nombre décimal : <br>$${texNombrec(a)}$ h $${texNombrec(b * 60)}$ min  $=$ ..... h`
            texteCorr = `$${texNombrec(b * 60)}$ min  $=   \\dfrac{${texNombrec(b * 60)}}{60}$ h $=${texFractionReduite(b * 60, 60)}$ h $=   ${texNombrec(b)}$ h. <br>
          Ainsi, $${texNombrec(a)}$ h $${texNombrec(b * 60)}$ min  $=$ $${texNombrec(a + b)}$ h.`
          } else {
            texte = `Compléter par un nombre décimal : <br>$${texNombrec(a)}$ h $${texNombrec(b * 60)}$ min  $=$`
            texte += ajouteChampTexteMathLive(this, index, 'largeur10 inline', { texteApres: sp(5) + 'h' })
            texteCorr = `$${texNombrec(b * 60)}$ min  $=   \\dfrac{${texNombrec(b * 60)}}{60}$ h $=${texFractionReduite(b * 60, 60)}$ h $=   ${texNombrec(b)}$ h. <br>
          Ainsi, $${texNombrec(a)}$ h $${texNombrec(b * 60)}$ min  $=$ $${texNombrec(a + b)}$ h.`
            setReponse(this, index, a + b)
            nbChamps = 1
          }
          this.canEnonce = 'Compléter par un nombre décimal.'
          this.canReponseACompleter = `$${texNombrec(a)}$ h $${texNombrec(b * 60)}$ min  $= \\ldots$`
          break
      }
      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
        index += nbChamps
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
