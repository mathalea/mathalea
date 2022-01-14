import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombre, texNombrec, arrondi, egalOuApprox } from '../../modules/outils.js'
export const titre = 'Déterminer un taux d’évolution réciproque'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '16/01/2022'

/**
* Problèmes d'évolution réciproque'
*
* * Situations variées : A TROUVER ! prix ?; *
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
  this.nbQuestions = 2
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
    const typesDeQuestionsDisponibles = [1]
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let typesDeQuestions, CM, CMr, CMra, p, pr, nom, nomr, t, tr
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
          p = calcul(taux / 100)
          t = Math.abs(taux)
          CM = calcul(1 + p)
          CMr = calcul(1 / CM)
          CMra = arrondi(CMr, 4)
          pr = calcul(CMra - 1)
          tauxr = calcul(pr * 100)
          tr = Math.abs(tauxr)
          if (tauxr > 0) {
            nomr = 'hausse'
          }
          if (tauxr < 0) {
            nomr = 'baisse'
          }
          texte = `Le prix d'un article subit une ${nom} de $${t}~\\%$.<br>Quelle évolution devra-t-il subir pour revenir à son prix initial ?`
          texte += '<br>On donnera le taux d\'évolution en %, éventuellement arrondi à 0,01% près.'
          texteCorr = 'Pour déterminer le taux d\'évolution réciproque, on commence par calculer le coefficient multiplicateur associé :'
          if (taux > 0) {
            texteCorr += `<br>Augmenter de $${t}~\\%$ revient à multiplier par $ 1 + \\dfrac{${texNombrec(t)}}{100} = ${texNombrec(CM)}$ `
          }
          if (taux < 0) {
            texteCorr += `<br>Diminuer de $${t}~\\%$ revient à multiplier par $ 1 - \\dfrac{${texNombrec(t)}}{100} = ${texNombrec(CM)}$ `
          }
          texteCorr += `<br><br>Le coefficient multiplicateur réciproque est donc : $\\dfrac{1}{${texNombrec(CM)}} ${egalOuApprox(CMr, 4)} ${texNombrec(CMra)}$.`
          if (CMr > 1) {
            texteCorr += `<br><br>Or $${texNombrec(CMra)} = 1 + ${texNombre(pr)} = 1 + \\dfrac{${texNombrec(tr)}}{100}$ ce qui correspond à une hausse de $${texNombrec(tr)}~\\%$.`
          }
          if (CMr < 1) {
            texteCorr += `<br><br>Or $${texNombrec(CMra)} = 1 - ${texNombre(Math.abs(pr))} = 1 - \\dfrac{${texNombrec(tr)}}{100}$ ce qui correspond à une baisse de $${texNombrec(tr)}~\\%$.`
          }
          if (CMr - CMra === 0) {
            texteCorr += `<br><br>Il faut donc appliquer une ${nomr} de $${texNombre(tr)}~\\%$ pour revenir au prix initial.`
          } else {
            texteCorr += `<br><br>Il faut donc appliquer une ${nomr} d'environ $${texNombre(tr)}~\\%$ pour revenir au prix initial.`
          }
          break
      }
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
