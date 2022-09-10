import Exercice from '../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Déterminer un taux d\'évolution global'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '06/01/2022'

/**
* Problèmes d'évolutions successives'
*
* * Situations variées : prix, habitants, adhérents  ##
*
* * Déterminer un taux d'évolution global
* * Mélange des 3 types de problèmes
* @author Florence Tapiero
* 2S12-1
*/

export const uuid = '018f3'
export const ref = '2S12-2'
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
    let typesDeQuestions, CM1, CM2, CM, p1, p2, p, verbe1, nom1, verbe2, nom2, nom, taux, t1, t2, t
    for (let i = 0, texte, texteCorr, taux1, taux2, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 1 :
          taux1 = randint(-80, 80, 0)
          taux2 = randint(-80, 80, 0)
          if (taux1 > 0) {
            verbe1 = 'Augmenter'
            nom1 = 'hausse'
          }
          if (taux2 > 0) {
            verbe2 = 'Augmenter'
            nom2 = 'hausse'
          }
          if (taux1 < 0) {
            verbe1 = 'Diminuer'
            nom1 = 'baisse'
          }
          if (taux2 < 0) {
            verbe2 = 'Diminuer'
            nom2 = 'baisse'
          }
          p1 = new Decimal(taux1).div(100)
          p2 = new Decimal(taux2).div(100)
          t1 = Math.abs(taux1)
          t2 = Math.abs(taux2)
          CM1 = p1.plus(1)
          CM2 = p2.plus(1)
          CM = CM1.mul(CM2)
          p = CM.sub(1)
          taux = p.mul(100)
          t = taux.abs()
          if (taux.isPos()) {
            nom = 'hausse'
          }
          if (taux.isNeg()) {
            nom = 'baisse'
          }
          texte = `Le prix d'un article subit une ${nom1} de $${t1}~\\%$ puis une ${nom2} de $${t2}~\\%$.<br>Déterminer le taux d'évolution global du prix de cet article.`
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texteApres: '%' })
          texteCorr = 'Pour déterminer le taux d\'évolution global, on commence par calculer le coefficient multiplicateur global.'
          texteCorr += '<br>Si une grandeur subit des évolutions successives, le coefficient multiplicateur global est le produit des coefficients multiplicateurs de chaque évolution :'
          texteCorr += `<br><br>Première évolution : ${verbe1} de $${t1}~\\%$ revient à multiplier par `
          if (taux1 > 0) {
            texteCorr += `$CM_1 = 1 + \\dfrac{${t1}}{100} = ${texNombre(CM1, 2)}$.`
          }
          if (taux1 < 0) {
            texteCorr += `$CM_1 = 1 - \\dfrac{${t1}}{100} = ${texNombre(CM1, 2)}$.`
          }
          texteCorr += `<br><br>Deuxième évolution : ${verbe2} de $${t2}~\\%$ revient à multiplier par `
          if (taux2 > 0) {
            texteCorr += `$CM_2 = 1 + \\dfrac{${t2}}{100} = ${texNombre(CM2, 2)}$.`
          }
          if (taux2 < 0) {
            texteCorr += `$CM_2 = 1 - \\dfrac{${t2}}{100} = ${texNombre(CM2, 2)}$.`
          }
          texteCorr += `<br><br>Le coefficient multiplicateur global est égal à $CM = CM_1 \\times CM_2 = ${texNombre(CM1, 2)} \\times ${texNombre(CM2, 2)} =${texNombre(CM, 4)}$.`
          if (CM > 1) {
            texteCorr += `<br><br>Or $CM =${texNombre(CM, 4)} = 1 + ${texNombre(Math.abs(p), 4)} = 1 + \\dfrac{${texNombre(t, 2)}}{100}$ ce qui correspond à une hausse de $${texNombre(t, 2)}~\\%$.`
          }
          if (CM < 1) {
            texteCorr += `<br><br>Or $CM = ${texNombre(CM, 4)} = 1 - ${texNombre(Math.abs(p), 4)} = 1-\\dfrac{${texNombre(t, 2)}}{100}$ ce qui correspond à une baisse de $${texNombre(t, 2)}~\\%$.`
          }
          texteCorr += `<br>Le prix de l'article a subi une ${nom} globale de $${texNombre(taux.abs(), 2)}~\\%$.`
          break
        case 2 :
          taux1 = randint(-20, 20, 0)
          taux2 = randint(-20, 20, 0)
          if (taux1 > 0) {
            verbe1 = 'Augmenter'
            nom1 = 'augmenté'
          }
          if (taux2 > 0) {
            verbe2 = 'Augmenter'
            nom2 = 'augmenté'
          }
          if (taux1 < 0) {
            verbe1 = 'Diminuer'
            nom1 = 'diminué'
          }
          if (taux2 < 0) {
            verbe2 = 'Diminuer'
            nom2 = 'diminué'
          }
          p1 = new Decimal(taux1).div(100)
          p2 = new Decimal(taux2).div(100)
          t1 = Math.abs(taux1)
          t2 = Math.abs(taux2)
          CM1 = p1.plus(1)
          CM2 = p2.plus(1)
          CM = CM1.mul(CM2)
          p = CM.sub(1)
          taux = p.mul(100)
          t = taux.abs()
          if (taux.isPos()) {
            nom = 'augmenté'
          }
          if (taux.isNeg()) {
            nom = 'diminué'
          }
          texte = `La population d'une ville a ${nom1} de $${t1}~\\%$ en $2020$ puis a ${nom2} de $${t2}~\\%$ en $2021$.<br>Quel est le taux d'évolution global ?`
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texteApres: '%' })
          texteCorr = 'Pour déterminer le taux d\'évolution global, on commence par calculer le coefficient multiplicateur global.'
          texteCorr += '<br>Si une grandeur subit des évolutions successives, le coefficient multiplicateur global est le produit des coefficients multiplicateurs de chaque évolution :'
          texteCorr += `<br><br>Première évolution : ${verbe1} de $${t1}~\\%$ revient à multiplier par `
          if (taux1 > 0) {
            texteCorr += `$CM_1 = 1 + \\dfrac{${t1}}{100} = ${texNombre(CM1, 2)}$.`
          }
          if (taux1 < 0) {
            texteCorr += `$CM_1 = 1 - \\dfrac{${t1}}{100} = ${texNombre(CM1, 2)}$.`
          }
          texteCorr += `<br><br>Deuxième évolution : ${verbe2} de $${t2}~\\%$ revient à multiplier par `
          if (taux2 > 0) {
            texteCorr += `$CM_2 = 1 + \\dfrac{${t2}}{100} = ${texNombre(CM2, 2)}$.`
          }
          if (taux2 < 0) {
            texteCorr += `$CM_2 = 1 - \\dfrac{${t2}}{100} = ${texNombre(CM2, 2)}$.`
          }
          texteCorr += `<br><br>Le coefficient multiplicateur global est égal à $CM = CM_1 \\times CM_2 = ${texNombre(CM1, 2)} \\times ${texNombre(CM2, 2)} =${texNombre(CM, 4)}$.`
          if (CM > 1) {
            texteCorr += `<br><br>Or $CM =${texNombre(CM, 4)} = 1 + ${texNombre(Math.abs(p), 4)} = 1 + \\dfrac{${texNombre(t, 2)}}{100}$ ce qui correspond à une hausse de $${texNombre(t, 2)}~\\%$.`
          }
          if (CM < 1) {
            texteCorr += `<br><br>Or $CM = ${texNombre(CM, 4)} = 1 - ${texNombre(Math.abs(p), 4)} = 1-\\dfrac{${texNombre(t, 2)}}{100}$ ce qui correspond à une baisse de $${texNombre(t, 2)}~\\%$.`
          }
          texteCorr += `<br>Le nombre d'habitants de cette ville a ${nom} de $${texNombre(taux.abs(), 2)}~\\%$ entre $2020$ et $2022$.`
          break
        case 3 :
          taux1 = randint(-40, 40, 0)
          taux2 = randint(-40, 40, 0)
          if (taux1 > 0) {
            verbe1 = 'Augmenter'
            nom1 = 'augmenté'
          }
          if (taux2 > 0) {
            verbe2 = 'Augmenter'
            nom2 = 'augmenté'
          }
          if (taux1 < 0) {
            verbe1 = 'Diminuer'
            nom1 = 'diminué'
          }
          if (taux2 < 0) {
            verbe2 = 'Diminuer'
            nom2 = 'diminué'
          }
          p1 = new Decimal(taux1).div(100)
          p2 = new Decimal(taux2).div(100)
          t1 = Math.abs(taux1)
          t2 = Math.abs(taux2)
          CM1 = p1.plus(1)
          CM2 = p2.plus(1)
          CM = CM1.mul(CM2)
          p = CM.sub(1)
          taux = p.mul(100)
          t = taux.abs()
          if (taux.isPos()) {
            nom = 'augmenté'
          }
          if (taux.isNeg()) {
            nom = 'diminué'
          }
          texte = `Le nombre d'adhérents d'une association a ${nom1} de $${t1}~\\%$ entre $2019$ et $2020$ puis a ${nom2} de $${t2}~\\%$ entre $2020$ et $2021$.<br>Quel est le taux d'évolution global du nombre d'adhérents ?`
          texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texteApres: '%' })
          texteCorr = 'Pour déterminer le taux d\'évolution global, on commence par calculer le coefficient multiplicateur global.'
          texteCorr += '<br>Si une grandeur subit des évolutions successives, le coefficient multiplicateur global est le produit des coefficients multiplicateurs de chaque évolution :'
          texteCorr += `<br><br>Première évolution : ${verbe1} de $${t1}~\\%$ revient à multiplier par `
          if (taux1 > 0) {
            texteCorr += `$CM_1 = 1 + \\dfrac{${t1}}{100} = ${texNombre(CM1, 2)}$.`
          }
          if (taux1 < 0) {
            texteCorr += `$CM_1 = 1 - \\dfrac{${t1}}{100} = ${texNombre(CM1, 2)}$.`
          }
          texteCorr += `<br><br>Deuxième évolution : ${verbe2} de $${t2}~\\%$ revient à multiplier par `
          if (taux2 > 0) {
            texteCorr += `$CM_2 = 1 + \\dfrac{${t2}}{100} = ${texNombre(CM2, 2)}$.`
          }
          if (taux2 < 0) {
            texteCorr += `$CM_2 = 1 - \\dfrac{${t2}}{100} = ${texNombre(CM2, 2)}$.`
          }
          texteCorr += `<br><br>Le coefficient multiplicateur global est égal à $CM = CM_1 \\times CM_2 = ${texNombre(CM1, 2)} \\times ${texNombre(CM2, 2)} =${texNombre(CM, 4)}$.`
          if (CM > 1) {
            texteCorr += `<br><br>Or $CM =${texNombre(CM, 4)} = 1 + ${texNombre(Math.abs(p), 4)} = 1 + \\dfrac{${texNombre(t, 2)}}{100}$ ce qui correspond à une hausse de $${texNombre(t, 2)}~\\%$.`
          }
          if (CM < 1) {
            texteCorr += `<br><br>Or $CM = ${texNombre(CM, 4)} = 1 - ${texNombre(Math.abs(p), 4)} = 1-\\dfrac{${texNombre(t, 2)}}{100}$ ce qui correspond à une baisse de $${texNombre(t, 2)}~\\%$.`
          }
          texteCorr += `<br>Le nombre d'adhérents de cette association a ${nom} de $${texNombre(taux.abs(), 2)}~\\%$ entre $2019$ et $2021$.`
          break
      }
      setReponse(this, i, taux)
      if (this.questionJamaisPosee(i, taux1, taux2)) {
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
