import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombre, texNombrec, arrondi, arrondiVirgule } from '../../modules/outils.js'
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
    let typesDeQuestions, CM, CMr, CMra, p, pr, nom, verber, nomr, t, tr
    for (let i = 0, texte, texteCorr, taux, tauxr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 1 :
          taux = randint(-80, 80, 0)
          if (taux > 0) {
            nom = 'hausse'
          }
          if (tauxr > 0) {
            verber = 'Augmenter'
            nomr = 'hausse'
          }
          if (taux < 0) {
            nom = 'baisse'
          }
          if (tauxr < 0) {
            verber = 'Diminuer'
            nomr = 'baisse'
          }
          p = calcul(taux / 100)
          t = Math.abs(taux)
          CM = calcul(1 + p)
          CMr = calcul(1 / CM)
          CMra = arrondiVirgule(CMr, 4)
          pr = calcul(CMr - 1)
          tauxr = calcul(pr * 100)
          tr = Math.abs(tauxr)
          if (taux > 0) {
            nom = 'hausse'
          }
          if (taux < 0) {
            nom = 'baisse'
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
          texteCorr += `<br><br>Le coefficient multiplicateur réciproque est donc : $\\dfrac{1}{${texNombrec(CM)}} = ${texNombrec(CMra)}$.`
          if (CMr > 1) {
            texteCorr += `<br><br>Or $${texNombrec(CMra)} = 1 + ${arrondi(texNombre(Math.abs(pr)), 4)} = 1 + \\dfrac{${arrondi(texNombrec(tr), 2)}}{100}$ ce qui correspond à une hausse de $${texNombrec(t)}~\\%$.`
          }
          if (CM < 1) {
            texteCorr += `<br><br>Or $${arrondi(texNombrec(CMr), 4)} = 1 - ${arrondi(texNombre(Math.abs(pr)), 4)} = 1-\\dfrac{${arrondi(texNombrec(tr), 2)}}{100}$ ce qui correspond à une baisse de $${texNombrec(t)}~\\%$.`
          }
          texteCorr += `<br>Il faut appliquer une ${nomr} ou ${verber} globale de $${texNombre(Math.abs(tauxr))}~\\%$ pour revenir au prix initial.`
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
