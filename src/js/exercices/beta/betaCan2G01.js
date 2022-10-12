import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenuSansNumero } from '../../modules/outils/miseEnForme.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { calcul } from '../../modules/outils/texNombres.js'
export const titre = 'Périmètres de carrés et de rectangles'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Gilles Mora
 */
export default function PerimetreCarreRectangle () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.interactifType = ''
  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.autoCorrection[0] = {}
    let a, b, question, correction, reponse, monQcm
    switch (choice(['a', 'b', 'c'])) {
      case 'a':
        a = randint(2, 9)
        b = randint(0, 1)
        this.interactifType = 'qcm'
        if (b === 0) {
          question = `Un carré de côté ${a} cm a le même périmètre qu'un rectangle de largeur ${a - b} cm et de longueur ${a + 1} cm ?`
          reponse = 'Faux'
          correction = `Faux car $4\\times ${a}$ cm$\\neq 2\\times ${a}$ cm$ + 2\\times ${a + 1}$ cm.`
        } else {
          question = `Un carré de côté ${a} cm a le même périmètre qu'un rectangle de largeur ${a - b} cm et de longueur ${a + 1} cm ?`
          reponse = 'Vrai'
          correction = `Vrai car $4\\times ${a}$ cm = $2\\times ${a - 1}$ cm $ + 2\\times ${a + 1}$ cm$= ${4 * a}$ cm.`
        }
        this.autoCorrection[0] = {
          enonce: question,
          propositions: [
            {
              texte: 'Vrai',
              statut: reponse === 'Vrai'
            },
            {
              texte: 'Faux',
              statut: reponse === 'Faux'
            },
            {
              texte: 'Je ne sais pas',
              statut: false
            }
          ],
          options: { ordered: true, vertical: false }
        }
        if (!context.isAmc) {
          monQcm = propositionsQcm(this, 0)
          question += monQcm.texte
          correction += monQcm.correction
        }
        break
      case 'b':
        a = randint(5, 20) * 4
        this.interactifType = 'mathLive'
        question = `Le périmètre d'un carré est $${a}$ cm.<br>Quelle est la longueur du côté du carré ? `
        question += ajouteChampTexteMathLive(this, 0, 'largeur 10 inline', { texteApres: ' cm' })
        reponse = calcul(a / 4)
        correction = `Le côté du carré est $${a}\\div 4=${reponse}$ cm.`
        setReponse(this, 0, reponse)
        break
      case 'c':
        a = randint(5, 10) * 2
        b = randint(2, a - 1)
        this.interactifType = 'mathLive'
        if (choice([true, false])) {
          question = `Le périmètre d'un rectangle de largeur $${b}$ cm est $${(a + b) * 2}$ cm.<br>Quelle est sa longueur ? `
          question += ajouteChampTexteMathLive(this, 0, 'largeur 10 inline', { texteApres: ' cm' })
          reponse = a
          correction = `Le demi-périmètre de ce rectangle est $${b}+L=${a + b}$ cm. Donc $L=${a}$ cm.`
        } else {
          question = `Le périmètre d'un rectangle de longueur $${a}$ cm est $${(a + b) * 2}$ cm.<br>Quelle est sa largeur ? `
          question += ajouteChampTexteMathLive(this, 0, 'largeur 10 inline', { texteApres: ' cm' })
          reponse = b
          correction = `Le demi-périmètre de ce rectangle est $${a}+l=${a + b}$ cm. Donc $l=${b}$ cm.`
        }
        setReponse(this, 0, reponse)
        break
    }
    this.listeQuestions[0] = question
    this.listeCorrections[0] = correction
    listeQuestionsToContenuSansNumero(this)
  }
}
