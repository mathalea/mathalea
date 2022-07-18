import Exercice from '../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texteEnCouleur, texNombre, egalOuApprox } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Déterminer un taux d\'évolution réciproque'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '16/01/2022'

/**
* Problèmes d'évolution réciproque'
*
* * Situations variées : prix , tarif horaire, nombre d'employés
* * Déterminer un taux d'évolution réciproque
* * Mélange des 3 types de problèmes
* @author Florence Tapiero
* 2S12-3
*/
export default function EvolutionsSuccesives () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 4 // type de questions
  this.spacing = 1
  this.spacingCorr = 1

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // Cette ligne doit être ajoutée afin de vider les précédentes valeurs pour AMC
    const typesDeQuestionsDisponibles = [1, 2, 3]
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let typesDeQuestions, CM, CMr, CMra, p, pr, nom, nomr, t, tr, metier
    for (let i = 0, texte, texteCorr, taux, tauxr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 1 :
          taux = randint(-50, 50, 0)
          if (taux > 0) {
            nom = 'hausse'
          }
          if (taux < 0) {
            nom = 'baisse'
          }
          p = new Decimal(taux).div(100)
          t = Math.abs(taux)
          CM = p.plus(1)
          CMr = CM.pow(-1)
          CMra = CMr.toDP(4)
          pr = CMra.sub(1)
          tauxr = pr.mul(100)
          tr = tauxr.abs()
          if (tauxr.isPos()) {
            nomr = 'hausse'
          }
          if (tauxr.isNeg()) {
            nomr = 'baisse'
          }
          texte = `Le prix d'un article subit une ${nom} de $${t}~\\%$.<br>Quelle évolution devra-t-il subir pour revenir à son prix initial ?`
          texte += '<br>On donnera le taux d\'évolution en pourcentage, éventuellement arrondi à 0,01% près.'
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texteApres: '%' })
          texteCorr = 'Pour déterminer le taux d\'évolution réciproque, on commence par calculer le coefficient multiplicateur associé :'
          if (taux > 0) {
            texteCorr += `<br>Augmenter de $${t}~\\%$ revient à multiplier par $ 1 + \\dfrac{${t}}{100} = ${texNombre(CM, 2)}$ `
          }
          if (taux < 0) {
            texteCorr += `<br>Diminuer de $${t}~\\%$ revient à multiplier par $ 1 - \\dfrac{${t}}{100} = ${texNombre(CM, 2)}$ `
          }
          texteCorr += `<br><br>Le coefficient multiplicateur réciproque est donc : $\\dfrac{1}{${texNombre(CM, 2)}} ${egalOuApprox(CMr, 4)} ${texNombre(CMra, 4)}$.`
          if (CMr - CMra !== 0) {
            texteCorr += texteEnCouleur('<br>Remarque : Il faut arrondir les valeurs à $10^{-4}$ pour avoir un arrondi en pourcentage à $10^{-2}$.')
          }
          if (CMr > 1) {
            texteCorr += `<br><br>Or $${texNombre(CMra, 4)} = 1 + ${texNombre(pr, 4)} = 1 + \\dfrac{${texNombre(tr, 2)}}{100}$ ce qui correspond à une hausse de $${texNombre(tr, 2)}~\\%$.`
          }
          if (CMr < 1) {
            texteCorr += `<br><br>Or $${texNombre(CMra, 4)} = 1 - ${texNombre(pr.abs(), 4)} = 1 - \\dfrac{${texNombre(tr, 2)}}{100}$ ce qui correspond à une baisse de $${texNombre(tr, 2)}~\\%$.`
          }
          if (CMr - CMra === 0) {
            texteCorr += `<br><br>Il faut donc appliquer une ${nomr} de $${texNombre(tr, 2)}~\\%$ pour revenir au prix initial.`
          } else {
            texteCorr += `<br><br>Il faut donc appliquer une ${nomr} d'environ $${texNombre(tr, 2)}~\\%$ pour revenir au prix initial.`
          }
          break
        case 2 :
          taux = randint(-50, 50, 0)
          if (taux > 0) {
            nom = 'd\'augmenter'
          }
          if (taux < 0) {
            nom = 'de diminuer'
          }
          p = new Decimal(taux).div(100)
          t = Math.abs(taux)
          CM = p.plus(1)
          CMr = CM.pow(-1)
          CMra = CMr.toDP(4)
          pr = CMra.sub(1)
          tauxr = pr.mul(100)
          tr = tauxr.abs()

          if (tauxr > 0) {
            nomr = 'hausse'
          }
          if (tauxr < 0) {
            nomr = 'baisse'
          }
          metier = choice(['Un artisan', 'Un ouvrier', 'Un coiffeur', 'Une informaticienne', 'Une cordonnière', 'Une luthière'])
          texte = `${metier} a décidé ${nom} son tarif horaire de $${t}~\\%$.<br>Quelle évolution devra-t-il subir pour revenir à son niveau de départ ?`
          texte += '<br>On donnera le taux d\'évolution en pourcentage, éventuellement arrondi à 0,01% près.'
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texteApres: '%' })
          texteCorr = 'Pour déterminer le taux d\'évolution réciproque, on commence par calculer le coefficient multiplicateur associé :'
          if (taux > 0) {
            texteCorr += `<br>Augmenter de $${t}~\\%$ revient à multiplier par $ 1 + \\dfrac{${t}}{100} = ${texNombre(CM, 2)}$ `
          }
          if (taux < 0) {
            texteCorr += `<br>Diminuer de $${t}~\\%$ revient à multiplier par $ 1 - \\dfrac{${t}}{100} = ${texNombre(CM, 2)}$ `
          }
          texteCorr += `<br><br>Le coefficient multiplicateur réciproque est donc : $\\dfrac{1}{${texNombre(CM, 2)}} ${egalOuApprox(CMr, 4)} ${texNombre(CMr, 4)}$.`
          if (CMr - CMra !== 0) {
            texteCorr += texteEnCouleur('<br>Remarque : Il faut arrondir les valeurs à $10^{-4}$ pour avoir un arrondi en pourcentage à $10^{-2}$.')
          }
          if (CMr > 1) {
            texteCorr += `<br><br>Or $${texNombre(CMra, 4)} = 1 + ${texNombre(pr, 4)} = 1 + \\dfrac{${texNombre(tr, 2)}}{100}$ ce qui correspond à une hausse de $${texNombre(tr, 2)}~\\%$.`
          }
          if (CMr < 1) {
            texteCorr += `<br><br>Or $${texNombre(CMra, 4)} = 1 - ${texNombre(pr.abs(), 4)} = 1 - \\dfrac{${texNombre(tr, 2)}}{100}$ ce qui correspond à une baisse de $${texNombre(tr, 2)}~\\%$.`
          }
          if (CMr - CMra === 0) {
            texteCorr += `<br><br>Il faut donc appliquer une ${nomr} de $${texNombre(tr, 2)}~\\%$ pour revenir au niveau de départ.`
          } else {
            texteCorr += `<br><br>Il faut donc appliquer une ${nomr} d'environ $${texNombre(tr, 2)}~\\%$ pour revenir au niveau de départ.`
          }
          break
        case 3 :
          taux = randint(-50, 50, 0)
          if (taux > 0) {
            nom = 'augmenté'
          }
          if (taux < 0) {
            nom = 'baissé'
          }
          p = new Decimal(taux).div(100)
          t = Math.abs(taux)
          CM = p.plus(1)
          CMr = CM.pow(-1)
          CMra = CMr.toDP(4)
          pr = CMra.sub(1)
          tauxr = pr.mul(100)
          tr = tauxr.abs()
          if (tauxr > 0) {
            nomr = 'hausse'
          }
          if (tauxr < 0) {
            nomr = 'baisse'
          }
          metier = choice(['d\'employés', 'de commmerciaux', 'de stagiaires', 'de jeunes diplomés'])
          texte = `Le nombre ${metier} d'une entreprise a ${nom} de $${t}~\\%$.<br>Quelle évolution permettrait de retrouver le nombre de départ ?`
          texte += '<br>On donnera le taux d\'évolution en pourcentage, éventuellement arrondi à 0,1% près.'
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texteApres: '%' })
          texteCorr = 'Pour déterminer le taux d\'évolution réciproque, on commence par calculer le coefficient multiplicateur associé :'
          if (taux > 0) {
            texteCorr += `<br>Augmenter de $${t}~\\%$ revient à multiplier par $ 1 + \\dfrac{${t}}{100} = ${texNombre(CM, 2)}$ `
          }
          if (taux < 0) {
            texteCorr += `<br>Diminuer de $${t}~\\%$ revient à multiplier par $ 1 - \\dfrac{${t}}{100} = ${texNombre(CM, 2)}$ `
          }
          texteCorr += `<br><br>Le coefficient multiplicateur réciproque est donc : $\\dfrac{1}{${texNombre(CM, 2)}} ${egalOuApprox(CMr, 3)} ${texNombre(CMr, 4)}$.`
          if (CMr - CMra !== 0) {
            texteCorr += texteEnCouleur('<br>Remarque : Il faut arrondir les valeurs à $10^{-3}$ pour avoir un arrondi en pourcentage à $10^{-1}$.')
          }
          if (CMr > 1) {
            texteCorr += `<br><br>Or $${texNombre(CMra, 4)} = 1 + ${texNombre(pr, 4)} = 1 + \\dfrac{${texNombre(tr, 2)}}{100}$ ce qui correspond à une hausse de $${texNombre(tr, 2)}~\\%$.`
          }
          if (CMr < 1) {
            texteCorr += `<br><br>Or $${texNombre(CMra, 4)} = 1 - ${texNombre(pr.abs(), 4)} = 1 - \\dfrac{${texNombre(tr, 2)}}{100}$ ce qui correspond à une baisse de $${texNombre(tr, 2)}~\\%$.`
          }
          if (CMr - CMra === 0) {
            texteCorr += `<br><br>Il faut donc appliquer une ${nomr} de $${texNombre(tr, 2)}~\\%$ pour revenir au niveau de départ.`
          } else {
            texteCorr += `<br><br>Il faut donc appliquer une ${nomr} d'environ $${texNombre(tr, 2)}~\\%$ pour revenir au niveau de départ.`
          }
          break
      }
      setReponse(this, i, taux)
      if (this.questionJamaisPosee(i, taux)) {
      // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
