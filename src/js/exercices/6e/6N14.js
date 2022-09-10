import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { combinaisonListes, listeQuestionsToContenu, randint } from '../../modules/outils.js'

import { fraction } from '../../modules/fractions.js'
export const titre = 'Représenter des fractions'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Représenter des fractions simples avec des disques partagés de façon adéquate.
 * @author Jean-Claude Lhote
 * 6N14
 * Relecture : Novembre 2021 par EE
 */
export const uuid = '87479'
export const ref = '6N14'
export default function RepresenterUneFraction () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let sc
    const ppc = 20
    if (context.isHtml) {
      sc = 0.5
    } else {
      sc = 0.4
    }

    const params = {
      xmin: -2.2,
      ymin: -2.2,
      xmax: 18,
      ymax: 3,
      pixelsParCm: ppc,
      scale: sc
    }; let den; let num; let f

    const liste = combinaisonListes([2, 3, 4, 5, 6], this.nbQuestions)

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      den = liste[i]
      num = randint(1, den * 3)
      f = fraction(num, den)
      texte = `Sachant qu'un disque représente une unité, représenter la fraction $${f.texFraction}$ en coloriant la part correspondante.<br>`
      texte += mathalea2d(params, fraction(den * 3, den).representation(0, 0, 2, 0, 'gateau', 'white'))
      texteCorr = `Voici sur ces dessins, coloriés en bleu, la part correspondante à la fraction $${f.texFraction}$ :<br>`
      texteCorr += mathalea2d(params, f.representation(0, 0, 2, randint(0, den - 1), 'gateau', 'blue'))
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: 'ici la (ou les) question(s) est(sont) posée(s)',
          enonceAvant: false, // EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question.
          enonceAvantUneFois: false, // EE : ce champ est facultatif et permet (si true) d'afficher l'énoncé ci-dessus une seule fois avant la numérotation de la première question de l'exercice. Ne fonctionne correctement que si l'option melange est à false.
          propositions: [
            {
              type: 'AMCOpen', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
              propositions: [
                {
                  texte: texteCorr,
                  statut: 3, // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                  enonce: texte,
                  sanscadre: true // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
                }
              ]
            }
          ]
        }
      }
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
