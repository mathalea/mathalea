import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, combinaisonListes, sp } from '../../modules/outils.js'
import { point, pointSurSegment, rotation, codageAngle, texteParPoint } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Résoudre des problèmes de calcul de pourcentage par complément à 100%'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
export const amcReady = true

/**
 * Déduire un pourcentage par complément à 100%
 * @author Jean-Claude Lhote
 * Référence 6N33-2
 */
export const uuid = 'db772'
export const ref = '6N33-2'
export default function CalculerUnPourcentage () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.consigne = 'Calculer.'
  this.spacing = 2
  this.spacingCorr = 2
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    const typesDeQuestionsDisponibles = [1, 2, 3]
    const listeChoix = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const listeMoyens = ['en bus', 'en deux-roues', 'à  pieds', 'en voiture']
    const listeSports = ['le foot', 'la natation', 'le basket', 'le ping-pong', 'le volley', 'la gym']
    const listeHobbies = ['la couture', 'le cinéma', 'la musique', 'le sport', 'la programmation', 'le jardinage', 'la cuisine']
    let p1, p2, p3, moy1, moy2, moy3
    let objets; const centre = point(5, 5); const depart = point(10, 5)
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;
    ) {
      objets = []
      p1 = randint(6, 9) * 5
      p2 = randint(6, 9) * 5
      p3 = 100 - p1 - p2
      switch (listeChoix[i]) {
        case 1: // Les moyens de déplacement maison collège
          [moy1, moy2, moy3] = combinaisonListes(listeMoyens, 3)
          texte = `Dans un collège, $${p1}${sp(1)}\\%$ des élèves se déplacent ${moy1}, $${p2}${sp(1)}\\%$ ${moy2} et les autres ${moy3}.<br>
          
          `
          texte += `Quel est le pourcentage des élèves qui se déplacent ${moy3} ?`
          texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline', { texteApres: ' %' })
          texteCorr = `Les élèves qui ${moy1} ou qui ${moy2} représentent $${p1}${sp(1)}\\%$ + $${p2}${sp(1)}\\% = ${p1 + p2}${sp(1)}\\%$.<br>`
          texteCorr += `Donc on calcule : $100 - ${p1 + p2}${sp(1)}\\% = ${p3}${sp(1)}\\%$.<br>`
          texteCorr += `$${p3}${sp(1)}\\%$ des élèves ${moy3}.<br>`
          if (!context.isHtml) {
            this.canEnonce = texte
            this.correction = this.listeCorrections[0]
            this.canReponseACompleter = `$\\ldots ${sp(1)}\\%$`
          }
          break
        case 2: // Les sports pratiqués par les ados
          [moy1, moy2, moy3] = combinaisonListes(listeSports, 3)
          texte = `Dans une association sportive, $${p1}${sp(1)}\\%$ des ados pratiquent ${moy1}, $${p2}${sp(1)}\\%$ ${moy2} et les autres ${moy3}.<br>
          
          `
          texte += `Quel est le pourcentage des ados qui pratiquent ${moy3} ?`
          texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline', { texteApres: ' %' })
          texteCorr = `Les ados qui pratiquent ${moy1} ou ${moy2} représentent $${p1}${sp(1)}\\% + ${p2}${sp(1)}\\% = ${p1 + p2}${sp(1)}\\%$.<br>`
          texteCorr += `Donc on calcule : $100${sp(1)}\\% - ${p1 + p2}${sp(1)}\\% = ${p3}${sp(1)}\\%$.<br>`
          texteCorr += `$${p3}${sp(1)}\\%$ des ados de cette association sportive pratiquent ${moy3}.<br>`
          if (!context.isHtml) {
            this.canEnonce = texte
            this.correction = this.listeCorrections[0]
            this.canReponseACompleter = `$\\ldots ${sp(1)}\\%$`
          }
          break
        case 3: // Les sports pratiqués par les ados
          [moy1, moy2, moy3] = combinaisonListes(listeHobbies, 3)
          texte = `Dans une association culturelle, $${p1}${sp(1)}\\%$ des membres ont comme passe-temps favori ${moy1}, pour $${p2}${sp(1)}\\%$ c'est ${moy2} et pour les autres ${moy3}.<br>
          
          `
          texte += `Quel est le pourcentage des membres qui préfèrent ${moy3} ?`
          texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline', { texteApres: ' %' })
          texteCorr = `Les membres qui préfère ${moy1} ou ${moy2} représentent $${p1}${sp(1)}\\% + ${p2}${sp(1)}\\% = ${p1 + p2}${sp(1)}\\%$.<br>`
          texteCorr += `Donc on calcule : $100${sp(1)}\\% - ${p1 + p2}${sp(1)}\\% = ${p3}${sp(1)}\\%$.<br>`
          texteCorr += `$${p3}${sp(1)}\\%$ des membres de cette association culturelle préfèrent ${moy3}.<br>`
          if (!context.isHtml) {
            this.canEnonce = texte
            this.correction = this.listeCorrections[0]
            this.canReponseACompleter = `$\\ldots ${sp(1)}\\%$`
          }
          break
      }
      objets.push(codageAngle(depart, centre, p1 * 3.6, 4.9, '', 'black', 2, 1, 'red', 0.4), texteParPoint(`${moy1.substring(3)}`, pointSurSegment(centre, rotation(depart, centre, p1 * 1.8), 3), 0))
      objets.push(codageAngle(rotation(depart, centre, p1 * 3.6), centre, p2 * 3.6, 4.9, '', 'black', 2, 1, 'blue', 0.4), texteParPoint(`${moy2.substring(3)}`, pointSurSegment(centre, rotation(depart, centre, p1 * 3.6 + p2 * 1.8), 3), 0))
      objets.push(codageAngle(depart, centre, -p3 * 3.6, 4.9, '', 'black', 2, 1, 'yellow', 0.4), texteParPoint(`${moy3.substring(3)}`, pointSurSegment(centre, rotation(depart, centre, -p3 * 1.8), 3), 0))
      texteCorr += mathalea2d({ xmin: 0, ymin: 0, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 0.5, mainlevee: false, amplitude: 1 }, ...objets)
      setReponse(this, i, p3, { formatInteractif: 'calcul', digits: 5, decimals: 2, signe: false })

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)

        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
