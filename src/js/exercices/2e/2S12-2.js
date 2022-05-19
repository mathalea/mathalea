import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombre, texNombrec } from '../../modules/outils.js'
export const titre = 'Déterminer un taux dévolution global'
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
          p1 = calcul(taux1 / 100)
          p2 = calcul(taux2 / 100)
          t1 = Math.abs(taux1)
          t2 = Math.abs(taux2)
          CM1 = calcul(1 + p1)
          CM2 = calcul(1 + p2)
          CM = calcul(CM1 * CM2)
          p = calcul(CM - 1)
          taux = calcul(p * 100)
          t = Math.abs(taux)
          if (taux > 0) {
            nom = 'hausse'
          }
          if (taux < 0) {
            nom = 'baisse'
          }
          texte = `Le prix d'un article subit une ${nom1} de $${t1}~\\%$ puis une ${nom2} de $${t2}~\\%$.<br>Déterminer le taux d'évolution global du prix de cet article.`
          texteCorr = 'Pour déterminer le taux d\'évolution global, on commence par calculer le coefficient multiplicateur global.'
          texteCorr += '<br>Si une grandeur subit des évolutions successives, le coefficient multiplicateur global est le produit des coefficients multiplicateurs de chaque évolution :'
          texteCorr += `<br><br>Première évolution : ${verbe1} de $${t1}~\\%$ revient à multiplier par `
          if (taux1 > 0) {
            texteCorr += `$CM_1 = 1 + \\dfrac{${texNombrec(t1)}}{100} = ${texNombrec(CM1)}$.`
          }
          if (taux1 < 0) {
            texteCorr += `$CM_1 = 1 - \\dfrac{${texNombrec(t1)}}{100} = ${texNombre(CM1)}$.`
          }
          texteCorr += `<br><br>Deuxième évolution : ${verbe2} de $${t2}~\\%$ revient à multiplier par `
          if (taux2 > 0) {
            texteCorr += `$CM_2 = 1 + \\dfrac{${texNombrec(t2)}}{100} = ${texNombre(CM2)}$.`
          }
          if (taux2 < 0) {
            texteCorr += `$CM_2 = 1 - \\dfrac{${texNombrec(t2)}}{100} = ${texNombre(CM2)}$.`
          }
          texteCorr += `<br><br>Le coefficient multiplicateur global est égal à $CM = CM_1 \\times CM_2 = ${texNombre(CM1)} \\times ${texNombre(CM2)} =${texNombre(CM)}$.`
          if (CM > 1) {
            texteCorr += `<br><br>Or $CM =${texNombre(CM)} = 1 + ${texNombre(Math.abs(p))} = 1 + \\dfrac{${texNombrec(t)}}{100}$ ce qui correspond à une hausse de $${texNombrec(t)}~\\%$.`
          }
          if (CM < 1) {
            texteCorr += `<br><br>Or $CM = ${texNombre(CM)} = 1 - ${texNombre(Math.abs(p))} = 1-\\dfrac{${texNombrec(t)}}{100}$ ce qui correspond à une baisse de $${texNombrec(t)}~\\%$.`
          }
          texteCorr += `<br>Le prix de l'article a subi une ${nom} globale de $${texNombre(Math.abs(taux))}~\\%$.`
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
          p1 = calcul(taux1 / 100)
          p2 = calcul(taux2 / 100)
          t1 = Math.abs(taux1)
          t2 = Math.abs(taux2)
          CM1 = calcul(1 + p1)
          CM2 = calcul(1 + p2)
          CM = calcul(CM1 * CM2)
          p = calcul(CM - 1)
          taux = calcul(p * 100)
          t = Math.abs(taux)
          if (taux > 0) {
            nom = 'augmenté'
          }
          if (taux < 0) {
            nom = 'diminué'
          }
          texte = `La population d'une ville a ${nom1} de $${t1}~\\%$ en $2020$ puis a ${nom2} de $${t2}~\\%$ en $2021$.<br>Quel est le taux d'évolution global ?`
          texteCorr = 'Pour déterminer le taux d\'évolution global, on commence par calculer le coefficient multiplicateur global.'
          texteCorr += '<br>Si une grandeur subit des évolutions successives, le coefficient multiplicateur global est le produit des coefficients multiplicateurs de chaque évolution :'
          texteCorr += `<br><br>Première évolution : ${verbe1} de $${t1}~\\%$ revient à multiplier par `
          if (taux1 > 0) {
            texteCorr += `$CM_1 = 1 + \\dfrac{${texNombrec(t1)}}{100} = ${texNombrec(CM1)}$.`
          }
          if (taux1 < 0) {
            texteCorr += `$CM_1 = 1 - \\dfrac{${texNombrec(t1)}}{100} = ${texNombre(CM1)}$.`
          }
          texteCorr += `<br><br>Deuxième évolution : ${verbe2} de $${t2}~\\%$ revient à multiplier par `
          if (taux2 > 0) {
            texteCorr += `$CM_2 = 1 + \\dfrac{${texNombrec(t2)}}{100} = ${texNombre(CM2)}$.`
          }
          if (taux2 < 0) {
            texteCorr += `$CM_2 = 1 - \\dfrac{${texNombrec(t2)}}{100} = ${texNombre(CM2)}$.`
          }
          texteCorr += `<br><br>Le coefficient multiplicateur global est égal à $CM = CM_1 \\times CM_2 = ${texNombre(CM1)} \\times ${texNombre(CM2)} =${texNombre(CM)}$.`
          if (CM > 1) {
            texteCorr += `<br><br>Or $CM =${texNombre(CM)} = 1 + ${texNombre(Math.abs(p))} = 1 + \\dfrac{${texNombrec(t)}}{100}$ ce qui correspond à une hausse de $${texNombrec(t)}~\\%$.`
          }
          if (CM < 1) {
            texteCorr += `<br><br>Or $CM = ${texNombre(CM)} = 1 - ${texNombre(Math.abs(p))} = 1-\\dfrac{${texNombrec(t)}}{100}$ ce qui correspond à une baisse de $${texNombrec(t)}~\\%$.`
          }
          texteCorr += `<br>Le nombre d'habitants de cette ville a ${nom} de $${texNombre(Math.abs(taux))}~\\%$ entre $2020$ et $2022$.`
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
          p1 = calcul(taux1 / 100)
          p2 = calcul(taux2 / 100)
          t1 = Math.abs(taux1)
          t2 = Math.abs(taux2)
          CM1 = calcul(1 + p1)
          CM2 = calcul(1 + p2)
          CM = calcul(CM1 * CM2)
          p = calcul(CM - 1)
          taux = calcul(p * 100)
          t = Math.abs(taux)
          if (taux > 0) {
            nom = 'augmenté'
          }
          if (taux < 0) {
            nom = 'diminué'
          }
          texte = `Le nombre d'adhérents d'une association a ${nom1} de $${t1}~\\%$ entre $2019$ et $2020$ puis a ${nom2} de $${t2}~\\%$ entre $2020$ et $2021$.<br>Quel est le taux d'évolution global du nombre d'adhérents ?`
          texteCorr = 'Pour déterminer le taux d\'évolution global, on commence par calculer le coefficient multiplicateur global.'
          texteCorr += '<br>Si une grandeur subit des évolutions successives, le coefficient multiplicateur global est le produit des coefficients multiplicateurs de chaque évolution :'
          texteCorr += `<br><br>Première évolution : ${verbe1} de $${t1}~\\%$ revient à multiplier par `
          if (taux1 > 0) {
            texteCorr += `$CM_1 = 1 + \\dfrac{${texNombrec(t1)}}{100} = ${texNombrec(CM1)}$.`
          }
          if (taux1 < 0) {
            texteCorr += `$CM_1 = 1 - \\dfrac{${texNombrec(t1)}}{100} = ${texNombre(CM1)}$.`
          }
          texteCorr += `<br><br>Deuxième évolution : ${verbe2} de $${t2}~\\%$ revient à multiplier par `
          if (taux2 > 0) {
            texteCorr += `$CM_2 = 1 + \\dfrac{${texNombrec(t2)}}{100} = ${texNombre(CM2)}$.`
          }
          if (taux2 < 0) {
            texteCorr += `$CM_2 = 1 - \\dfrac{${texNombrec(t2)}}{100} = ${texNombre(CM2)}$.`
          }
          texteCorr += `<br><br>Le coefficient multiplicateur global est égal à $CM = CM_1 \\times CM_2 = ${texNombre(CM1)} \\times ${texNombre(CM2)} =${texNombre(CM)}$.`
          if (CM > 1) {
            texteCorr += `<br><br>Or $CM =${texNombre(CM)} = 1 + ${texNombre(Math.abs(p))} = 1 + \\dfrac{${texNombrec(t)}}{100}$ ce qui correspond à une hausse de $${texNombrec(t)}~\\%$.`
          }
          if (CM < 1) {
            texteCorr += `<br><br>Or $CM = ${texNombre(CM)} = 1 - ${texNombre(Math.abs(p))} = 1-\\dfrac{${texNombrec(t)}}{100}$ ce qui correspond à une baisse de $${texNombrec(t)}~\\%$.`
          }
          texteCorr += `<br>Le nombre d'adhérents de cette association a ${nom} de $${texNombre(Math.abs(taux))}~\\%$ entre $2019$ et $2021$.`
          break
      }
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
