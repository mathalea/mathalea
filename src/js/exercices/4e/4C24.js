import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, choice, decompositionFacteursPremiersBarres } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import FractionX from '../../modules/FractionEtendue.js'
export const titre = 'Simplifier des fractions à laide des nombres premiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const dateDePublication = '17/03/2022'
// export const dateDeModifImportante = '24/10/2021'

/**
 * @author Guillaume Valmont
 * Référence 4C24
*/
export default function NomExercice () {
  Exercice.call(this)
  this.consigne = 'Simplifier le plus possible les fractions suivantes.'
  this.nbQuestions = 10

  this.besoinFormulaireNumerique = ['Nombre de facteurs communs', 3, '1, 2 ou 3']
  this.sup = 2

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
      const facteurCommun1 = choice([2, 3, 5])
      let facteurCommun2 = choice([2, 3, 5])
      let facteurCommun3 = choice([2, 3, 5])
      const facteurSurprise = choice([2, 3, 5, 7])
      let facteurNumerateur = choice([2, 3, 5, 7])
      const facteurDenominateur = choice([2, 3, 5, 7])
      let numerateur, denominateur
      if (this.sup < 3) facteurCommun3 = 1
      if (this.sup < 2) facteurCommun2 = 1
      numerateur = facteurNumerateur * facteurCommun1 * facteurCommun2 * facteurCommun3
      denominateur = facteurDenominateur * facteurCommun1 * facteurCommun2 * facteurCommun3
      while (numerateur === denominateur) {
        facteurNumerateur = choice([2, 3, 5, 7])
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
      texte = `$\\cfrac{${numerateur}}{${denominateur}}$`
      texteCorr = `${texte} $
      = \\cfrac{${decompositionFacteursPremiersBarres(numerateur, [facteurCommun1, facteurCommun2, facteurCommun3])}}{${decompositionFacteursPremiersBarres(denominateur, [facteurCommun1, facteurCommun2, facteurCommun3])}}
      = \\cfrac{${numerateur / (facteurCommun1 * facteurCommun2 * facteurCommun3)}}{${denominateur / (facteurCommun1 * facteurCommun2 * facteurCommun3)}}$`
      setReponse(this, i, new FractionX(numerateur / (facteurCommun1 * facteurCommun2 * facteurCommun3), denominateur / (facteurCommun1 * facteurCommun2 * facteurCommun3)), { formatInteractif: 'fraction' })
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i, 'inline largeur25', { texte: ' =' })
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
}
