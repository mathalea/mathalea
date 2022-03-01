import { scratchblock } from '../../../modules/2d'
import { setReponse } from '../../../modules/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive'
import { propositionsQcm } from '../../../modules/interactif/questionQcm'
import { calcul, choice, listeQuestionsToContenuSansNumero, randint, texteEnCouleur } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Travailler les répétitions (Scratch)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * publié le 24/10/2021
 * Référence can5A01
 */
export default function RepetitionScratch () {
  Exercice.call(this)
  this.listeQuestions = []
  this.listeCorrections = []
  this.typeExercice = 'Scratch'
  this.listePackages = 'scratch3'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let prog = '\\begin{scratch}[print,fill,blocks,scale=0.8]\n \\blockinit{quand \\greenflag est cliqué}\n '
    prog += "\\blockpen{stylo en position d'écriture}\n"
    const b = choice([[120, 'triangle équilatéral'], [90, 'carré'], [72, 'pentagone régulier'], [60, 'hexagone régulier'], [45, 'octogone régulier'], [40, 'énéagone régulier'], [36, 'décagone régulier']])
    const nbRep = calcul(360 / b[0])
    const angleRot = b[0]
    switch (randint(1, 3)) {
      case 1: // trouver l'angle de rotation
        this.interactifType = 'mathLive'
        this.amcType = 'AMCNum'
        prog += `\\blockrepeat{répéter \\ovalnum{${nbRep}} fois}{\n`
        prog += '\\blockmove{avancer de \\ovalnum{20} pas}\n'
        prog += '\\blockmove{tourner \\turnright{} de \\ovalnum{...} degrés}\n'
        prog += '} \n'
        prog += '\\end{scratch}'
        setReponse(this, 0, angleRot)
        this.listeQuestions[0] = `${scratchblock(prog)}<br>Quel nombre doit-on écrire à la place des pointillés pour tracer un ${b[1]} ?` + ajouteChampTexteMathLive(this, 0, 'largeur15 inline')
        this.listeCorrections[0] = `Un ${b[1]} a des anlges de $${calcul(180 - angleRot)}\\degree$. Le lutin doit tourner de $180-${calcul(180 - angleRot)}=${angleRot}\\degree$ après avoir tracé un côté.<br>`
        this.listeCorrections[0] += texteEnCouleur(`Mentalement on divise $360$ par $${nbRep}$ : $\\dfrac{360}{${nbRep}}=${angleRot}$.`)
        break
      case 2: // trouver le nombre de répétition
        this.interactifType = 'mathLive'
        this.amcType = 'AMCNum'
        prog += '\\blockrepeat{répéter \\ovalnum{...} fois}{\n'
        prog += '\\blockmove{avancer de \\ovalnum{20} pas}\n'
        prog += `\\blockmove{tourner \\turnright{} de \\ovalnum{${angleRot}} degrés}\n`
        prog += '} \n'
        prog += '\\end{scratch}'
        setReponse(this, 0, nbRep)
        this.listeQuestions[0] = `${scratchblock(prog)}<br>Quel nombre doit-on écrire à la place des pointillés pour tracer un ${b[1]} ?` + ajouteChampTexteMathLive(this, 0, 'largeur15 inline')
        this.listeCorrections[0] = `Un ${b[1]} a ${nbRep} côtés ($${nbRep}\\times ${angleRot}=360\\degree$), il faut donc répéter ${nbRep} fois les instructions de la boucle.<br>`
        this.listeCorrections[0] += texteEnCouleur(`Mentalement, on divise $360$ par $${angleRot}$ : $\\dfrac{360}{${angleRot}}=${nbRep}$.`)
        break
      case 3: //
        this.interactifType = 'qcm'
        this.amcType = 'qcmMono'
        this.autoCorrection[0] = {
          enonce: this.listeQuestions[0],
          options: { ordered: false, vertical: true, nbCols: 3 },
          propositions: [
            {
              texte: 'Triangle équilatéral',
              statut: b[1] === 'triangle équilatéral'
            },
            {
              texte: 'Carré',
              statut: b[1] === 'carré'
            },
            {
              texte: 'Pentagone régulier',
              statut: b[1] === 'pentagone régulier'
            },
            {
              texte: 'Hexagone régulier',
              statut: b[1] === 'hexagone régulier'
            },
            {
              texte: 'Octogone régulier',
              statut: b[1] === 'octogone régulier'
            },
            {
              texte: 'Ennéagone régulier',
              statut: b[1] === 'énéagone régulier'
            },
            {
              texte: 'Décagone régulier',
              statut: b[1] === 'décagone régulier'
            }
          ]
        }
        prog += `\\blockrepeat{répéter \\ovalnum{${nbRep}} fois}{\n`
        prog += '\\blockmove{avancer de \\ovalnum{20} pas}\n'
        prog += `\\blockmove{tourner \\turnright{} de \\ovalnum{${angleRot}} degrés}\n`
        prog += '} \n'
        prog += '\\end{scratch}'
        this.listeQuestions[0] = `${scratchblock(prog)}<br>Quelle figure le lutin va-t-il tracer ?` + propositionsQcm(this, 0).texte
        this.listeCorrections[0] = `Un ${b[1]} a ${nbRep} côtés ($${nbRep}\\times ${angleRot}=360\\degree$), il faut donc répéter ${nbRep} fois les instructions de la boucle.<br>`
        this.listeCorrections[0] += texteEnCouleur(`Mentalement, on divise $360$ par $${angleRot}$ : $\\dfrac{360}{${angleRot}}=${nbRep}$.`)
        break
    }
    listeQuestionsToContenuSansNumero(this)
  }
}
