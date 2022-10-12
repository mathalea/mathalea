import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { choice } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import FractionX from '../../modules/FractionEtendue.js'
export const titre = 'Simplifier des fractions à l\'aide des nombres premiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

export const dateDePublication = '17/03/2022'
// export const dateDeModifImportante = '24/10/2021'

/**
 * @author Guillaume Valmont (amendée par Eric Elter pour this.sup2 et une version 3e)
 * Référence 4C24
*/
export const uuid = '612b9'
export const ref = '4C24'
export default function SimplifierFractions () {
  Exercice.call(this)
  this.consigne = 'Simplifier le plus possible les fractions suivantes.'
  this.nbQuestions = 5

  this.besoinFormulaireNumerique = ['Nombre de facteurs communs', 3, '1, 2 ou 3']
  this.besoinFormulaire2Numerique = ['Facteurs premiers utilisés', 2, '1 : De 2 à 7\n2 : De 2 à 23']
  this.sup = 2
  this.sup2 = 1
  this.sup3 = 1
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 3
  this.video = ''

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    if (parseInt(this.nbQuestions) === 1) {
      this.consigne = 'Simplifier le plus possible la fraction suivante.'
    }

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const facteurCommun1 = this.sup2 !== 1 ? choice([2, 3, 5, 11, 13, 17, 19]) : choice([2, 3, 5])
      let facteurCommun2 = this.sup2 !== 1 ? choice([2, 3, 5, 11, 13, 17, 19]) : choice([2, 3, 5])
      let facteurCommun3 = this.sup2 !== 1 ? choice([2, 3, 5, 11, 13, 17, 19]) : choice([2, 3, 5])
      const facteurSurprise = this.sup2 !== 1 ? choice([2, 3, 5, 11, 13, 17, 19, 23]) : choice([2, 3, 5, 7])
      let facteurNumerateur = this.sup2 !== 1 ? choice([2, 3, 5, 11, 13, 17, 19, 23]) : choice([2, 3, 5, 7])
      const facteurDenominateur = this.sup2 !== 1 ? choice([2, 3, 5, 11, 13, 17, 19, 23]) : choice([2, 3, 5, 7])
      let numerateur, denominateur
      if (this.sup < 3) facteurCommun3 = 1
      if (this.sup < 2) facteurCommun2 = 1
      numerateur = facteurNumerateur * facteurCommun1 * facteurCommun2 * facteurCommun3
      denominateur = facteurDenominateur * facteurCommun1 * facteurCommun2 * facteurCommun3
      while (numerateur === denominateur) {
        facteurNumerateur = this.sup2 !== 1 ? choice([2, 3, 5, 11, 13, 17, 19, 23]) : choice([2, 3, 5, 7])
        numerateur = facteurNumerateur * facteurCommun1 * facteurCommun2 * facteurCommun3
      }
      const surprise = choice(['numerateur', 'denominateur', 'aucun'])
      switch (surprise) {
        case 'numerateur':
          numerateur = numerateur * facteurSurprise
          break
        case 'denominateur':
          denominateur = denominateur * facteurSurprise
          break
      }
      const f = new FractionX(numerateur, denominateur)
      texte = `$${f.texFraction}$${ajouteChampTexteMathLive(this, i, 'inline largeur25', { texte: ' =' })}`
      texteCorr = `$${f.texFraction}${f.texSimplificationAvecEtapes(true)}$`
      setReponse(this, i, f.simplifie(), { formatInteractif: 'fraction' })
      if (context.isAmc) {
        if (this.sup3 === 1) {
          this.autoCorrection[i] = {
            enonce: '',
            enonceAvant: false,
            propositions: [
              {
                type: 'AMCOpen',
                propositions: [{
                  enonce: 'Rendre irréductible la fraction ' + texte + '.<br>La rédaction sera évaluée plus que le résultat en lui-même.',
                  texte: texteCorr,
                  statut: 3, // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                  sanscadre: false, // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
                  pointilles: false // EE : ce champ est facultatif et permet (si false) d'enlever les pointillés sur chaque ligne.
                }]
              }
            ]
          }
        } else {
          this.autoCorrection[i] = {
            enonce: '',
            enonceAvant: false,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: 'Rendre irréductible la fraction ' + texte + '.',
                    valeur: [f.simplifie()],
                    param: {
                      digits: 2,
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
        }
      }
      if (this.questionJamaisPosee(i, numerateur, denominateur)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
  if (context.isAmc) this.besoinFormulaire3Numerique = ['Type de réponses AMC', 2, '1 : Question ouverte\n2 : Réponse numérique']
}
