import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { modalTexteCourt, combinaisonListes, listeQuestionsToContenu, randint, rangeMinMax } from '../../modules/outils.js'

import { fraction } from '../../modules/fractions.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Encadrer une fraction entre deux nombres entiers consécutifs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Une fraction avec pour dénominateur 2, 3, 4, 5, 10 à encadrer entre 2 entiers
 * @author Rémi Angot (AMC par EE)
 * Référence 6N20-1
 * Relecture : Novembre 2021 par EE
*/
export const uuid = '1f5de'
export const ref = '6N20-1'
export default function EncadrerFractionEntre2Entiers () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Compléter avec deux nombres entiers consécutifs.' + modalTexteCourt(1, 'Nombres entiers consécutifs : Ce sont deux nombres entiers qui se suivent comme 4 et 5.', 'Consécutifs')
  this.introduction = 'Exemple : $2 < \\dfrac{9}{4} < 3$ car  $2=\\dfrac{8}{4}$ et $3=\\dfrac{12}{4}$'
  this.nbQuestions = 6
  this.nbCols = 2
  this.nbColsCorr = 1
  this.correctionDetailleeDisponible = true
  this.lycee = false
  context.isHtml ? this.correctionDetaillee = true : this.correctionDetaillee = false

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    this.liste_de_denominateurs = this.lycee ? combinaisonListes([2, 3, 4, 5, 6, 7, 8, 9], this.nbQuestions) : combinaisonListes([2, 3, 4, 5, 10], this.nbQuestions)
    this.liste_de_k = this.lycee ? combinaisonListes(rangeMinMax(-5, 5), this.nbQuestions) : combinaisonListes([0, 1, 2, 3, 4, 5], this.nbQuestions)
    for (let i = 0, texte, texteCorr, n, d, k, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      d = this.liste_de_denominateurs[i]
      k = this.liste_de_k[i]
      n = k * d + randint(1, d - 1)
      texte = this.interactif ? ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline') + `$< \\dfrac{${n}}{${d}} <$` + ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline') : `$\\ldots < \\dfrac{${n}}{${d}} < \\ldots$`
      texteCorr = `$${k} < \\dfrac{${n}}{${d}} < ${k + 1}$`
      if (this.correctionDetaillee) {
        texteCorr += ` $\\qquad$ car $\\quad ${k}=\\dfrac{${k * d}}{${d}}\\quad$ et $\\quad${k + 1}=\\dfrac{${(k + 1) * d}}{${d}}$ `
        texteCorr += '<br><br>'
        texteCorr += mathalea2d({ xmin: -0.5, xmax: 24, ymax: 1.5, scale: 0.6 }, fraction(n, d).representation(0, 0, 3, 0, 'barre', 'blue')
        )
      }

      if (this.questionJamaisPosee(i, d, n)) {
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte,
            options: { multicols: true },
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
                  statut: '',
                  reponse: {
                    texte: 'Entier inférieur',
                    valeur: k,
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              },
              {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: 'Entier supérieur',
                    valeur: k + 1,
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
        } else {
          setReponse(this, 2 * i, k)
          setReponse(this, 2 * i + 1, k + 1)
        }
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
