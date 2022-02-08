import { setReponse } from '../../../modules/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive'
import { calcul, choice, listeQuestionsToContenu, randint, sp, texNombrec, texFractionReduite }
  from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Convertir des heures décimales en heures/minutes et inversement*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '08/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/*!
 * @author Gilles Mora
 */
export default function HeuresDecimalesHeuresMinutes2 () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let a, b, d, texte, texteCorr
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2])) { //, 'b'
        case 1 :

          a = randint(1, 5)
          b = choice([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.25, 0.75])
          d = calcul(b * 60)
          if (!this.interactif) {
            texte = `Convertir en heures/minutes : <br>$${texNombrec(a + b)}$ h $=$ ..... h..... min`
            texteCorr = `$${texNombrec(a + b)}$h$ = ${a}$ h $ + ${texNombrec(b)} \\times 60  = ${a}$ h $${d}$ min`
          } else {
            texte = `Convertir en heures/minutes : <br>$${texNombrec(a + b)}$ h $=$`
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texteApres: sp(5) + 'h' })
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline', { texteApres: sp(5) + 'min' })
            texteCorr = `$${texNombrec(a + b)}$h$ = ${a}$ h $ + ${texNombrec(b)} \\times 60  = ${a}$ h $${d}$ min`
            setReponse(this, 2 * i, a)
            setReponse(this, 2 * i + 1, d)
          }
          break

        case 2 :

          a = randint(1, 5)
          b = choice([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.25, 0.75])
          d = calcul(b * 60)
          if (!this.interactif) {
            texte = `Compléter par un nombre décimal : <br>$${texNombrec(a)}$ h $${texNombrec(b * 60)}$ min  $=$ ..... h`
            texteCorr = `$${texNombrec(b * 60)}$ min  $=   \\dfrac{${texNombrec(b * 60)}}{60}$ h $=${texFractionReduite(b * 60, 60)}$ h $=   ${texNombrec(b)}$ h. <br>
            Ainsi, $${texNombrec(a)}$ h $${texNombrec(b * 60)}$ min  $=$ $${texNombrec(a + b)}$ h.`
          } else {
            texte = `Compléter par un nombre décimal : <br>$${texNombrec(a)}$ h $${texNombrec(b * 60)}$ min  $=$`
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline', { texteApres: sp(5) + 'h' })
            texteCorr = `$${texNombrec(b * 60)}$ min  $=   \\dfrac{${texNombrec(b * 60)}}{60}$ h $=${texFractionReduite(b * 60, 60)}$ h $=   ${texNombrec(b)}$ h. <br>
            Ainsi, $${texNombrec(a)}$ h $${texNombrec(b * 60)}$ min  $=$ $${texNombrec(a + b)}$ h.`
            setReponse(this, 2 * i, a + b)
          }
          break
      }
      if (this.questionJamaisPosee(i, a, b, d)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
