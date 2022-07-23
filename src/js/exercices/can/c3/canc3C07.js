
import { choice, randint, prenomF, prenomM, texPrix } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Résoudre un problème avec "de plus", "de moins" (nombres entiers)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '20/07/2022'

/*!
 * @author Gilles Mora
 * Référence canc3C07
 */
export default function PlusOuMoins () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let choix, a, b, r, e, m, somme, prenom1, prenom2, choix1, reponse1, reponse2
    switch (choice([1, 2])) { // 1, 2
      case 1:
        choix = choice(['a', 'b', 'c', 'd'])//, 'b', 'c'
        if (choix === 'a') { // age entre Fille et garcon
          choix1 = choice([true, false])
          prenom1 = prenomM()
          prenom2 = prenomF()

          a = randint(12, 20)
          b = randint(2, 8)
          if (choice([true, false])) {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse2 : reponse1
            this.question = `${prenom1} a $${a}$ ans. Il a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} 
                que ${prenom2}. <br>
                Quel est l'âge de ${prenom2} ?`
            this.correction = `${prenom1} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} que ${prenom2} donc ${prenom2}  a $${b}$ années ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
                Il a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) ans, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} ans. `
          } else {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse1 : reponse2
            this.question = `${prenom1} a $${a}$ ans. ${prenom2} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} 
                        que ${prenom1}. <br>
                        Quel est l'âge de ${prenom2} ?`
            this.correction = `${prenom2} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} que ${prenom1}.<br>
                        Elle a donc  (${choix1 ? `$${a}+${b}$` : `$${a}-${b}$`}) ans, soit  ${choix1 ? `$${a + b}$` : `$${a - b}$`} ans. `
          }
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' ans' } }
        }
        if (choix === 'b') { // age avec soeur
          choix1 = choice([true, false])
          prenom1 = prenomM()

          a = randint(35, 60)
          b = randint(3, 9)
          if (choice([true, false])) {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse2 : reponse1
            this.question = `${prenom1} a $${a}$ ans. Il a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} 
                  que sa soeur. <br>
                  Quel est l'âge de sa soeur ?`
            this.correction = `${prenom1} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} que sa soeur donc sa soeur a $${b}$ années ${choix1 ? 'de moins' : ' de plus '} que son frère.<br>
                  Elle a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) ans, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} ans. `
          } else {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse1 : reponse2
            this.question = `${prenom1} a $${a}$ ans. Sa soeur a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '}. <br>
                            Quel est l'âge de sa soeur ?`
            this.correction = `La soeur de ${prenom1} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} que lui.<br>
                            Elle a donc  (${choix1 ? `$${a}+${b}$` : `$${a}-${b}$`}) ans, soit  ${choix1 ? `$${a + b}$` : `$${a - b}$`} ans. `
          }
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' ans' } }
        }

        if (choix === 'c') { // age avec frere
          a = randint(10, 20)
          b = randint(2, 8)
          choix1 = choice([true, false])
          if (choice([true, false])) {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse2 : reponse1
            this.question = `${prenomF()} a $${a}$ ans.`
            this.question += `<br>Sachant qu'elle a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} que son frère, quel âge a celui-ci ?`
            this.correction = `Son frère est donc $${b}$ ans ${choix1 ? 'moins' : ' plus '} âgé que sa soeur. <br>
          Il a  donc $${choix1 ? `${a}-${b}=${a - b}` : `${a}+${b}=${a + b}`}$ ans.`
          } else {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse1 : reponse2
            this.question = `${prenomF()} a $${a}$ ans.`
            this.question += `<br>Sachant que son frère a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '}, quel âge a celui-ci ?`
            this.correction = `Le frère de ${prenomF()} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} que celle-ci.  <br>
  Il a donc  $${choix1 ? `${a}+${b}=${a + b}` : `${a}-${b}=${a - b}`}$ ans.`
          }
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' ans' } }
        }

        if (choix === 'd') { // billes de plus de moins
          choix1 = choice([true, false])
          prenom1 = prenomF()
          prenom2 = prenomM()

          a = randint(35, 60)
          b = randint(9, 21, [10, 20])
          if (choice([true, false])) {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse2 : reponse1
            this.question = `${prenom1} a $${a}$ billes. Elle en  a $${b}$ ${choix1 ? 'de plus' : ' de moins '} 
                    que ${prenom2}. <br>
                    Combien ${prenom2} a-t-il de billes ?`
            this.correction = `${prenom1} a $${b}$ billes ${choix1 ? 'de plus' : ' de moins '} que ${prenom2} donc ${prenom2}  a $${b}$ billes ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
                    Il a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) billes, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} billes. `
          } else {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse1 : reponse2
            this.question = `${prenom1} a $${a}$ billes. ${prenom2} en  a $${b}$ ${choix1 ? 'de plus' : ' de moins '} 
                                qu'elle. <br>
                                Combien ${prenom2} a-t-il de billes ?`
            this.correction = `${prenom2} a $${b}$ billes ${choix1 ? 'de plus' : ' de moins '} que ${prenom1}.<br>
                                Il a donc  (${choix1 ? `$${a}+${b}$` : `$${a}-${b}$`}) billes, soit  ${choix1 ? `$${a + b}$` : `$${a - b}$`} billes. `
          }
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' billes' } }
        }

        break

      case 2:
        choix = choice(['a', 'b', 'c'])
        if (choix === 'a') { // somme d'argent ensemble avec de plus
          r = randint(4, 7) * 10
          e = randint(1, 3) * 10
          m = r - e
          somme = m + r
          this.reponse = m + r
          prenom1 = prenomF()
          prenom2 = prenomF()
          while (prenom2 === prenom1) {
            prenom2 = prenomF()
          }
          this.question = ` ${prenom2} dit à ${prenom1}  : « J'ai $${texPrix(r)}$ € soit $${texPrix(e)}$ € de plus que toi ».<br>`
          this.question += 'Combien d\'argent en tout possèdent les deux filles ?'
          this.correction = `${prenom2} a $${texPrix(r)}$ €.<br>${prenom2}  a $${texPrix(e)}$ € `
          this.correction += ' de plus '
          this.correction += `que ${prenom1} donc ${prenom1} a $${texPrix(e)}$ € `
          this.correction += ' de moins '
          this.correction += `que ${prenom2}. <br>${prenom1} a donc : $${texPrix(r)}-${texPrix(e)}=${texPrix(m)}$ €.`
          this.correction += `<br>$${texPrix(r)}+${texPrix(m)}= ${texPrix(somme)}$`
          this.correction += `<br>Les deux filles possèdent en tout : $${texPrix(somme)}$ €.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
        }
        if (choix === 'b') { // somme d'argent ensemble avec de moins
          r = randint(4, 7) * 10
          e = randint(1, 3) * 10
          m = r + e
          somme = m + r
          this.reponse = m + r
          prenom1 = prenomF()
          prenom2 = prenomF()
          while (prenom2 === prenom1) {
            prenom2 = prenomF()
          }
          this.question = ` ${prenom2} dit à ${prenom1}  : « J'ai $${texPrix(r)}$ € soit $${texPrix(e)}$ € de moins que toi ».<br>`
          this.question += 'Combien d\'argent en tout possèdent les deux filles ? '

          this.correction = `${prenom2} a  $${texPrix(r)}$ €.<br>${prenom2}  a $${texPrix(e)}$ € `
          this.correction += ' de moins '
          this.correction += `que ${prenom1} signifie que ${prenom1} a $${texPrix(e)}$ € `
          this.correction += ' de plus '
          this.correction += `que ${prenom2}. <br>${prenom1} a donc : $${texPrix(r)} ${texPrix(e)} = ${texPrix(m)}$ €.`
          this.correction += `<br>$${texPrix(r)} + ${texPrix(m)}  = ${texPrix(somme)}$`
          this.correction += `<br>Les deux filles possèdent en tout : $${texPrix(somme)}$ €.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
        }

        if (choix === 'c') { /// / somme de billes
          choix1 = choice([true, false])
          prenom1 = prenomM()
          prenom2 = prenomF()

          a = randint(18, 30)
          b = randint(4, 12, [10])

          reponse1 = 2 * a - b
          reponse2 = 2 * a + b
          this.reponse = choix1 ? reponse2 : reponse1
          this.question = `${prenom1} a $${a}$ billes. ${prenom2} en a $${b}$ ${choix1 ? 'de plus' : ' de moins '}.
                        <br>
                        Combien en ont-ils à eux deux ?`
          this.correction = `${prenom2} a $${b}$ billes ${choix1 ? 'de plus' : ' de moins '} que ${prenom1}. Elle en a donc (${choix1 ? `$${a}+${b}$` : `$${a}-${b}$`}), soit ${choix1 ? `$${a + b}$` : `$${a - b}$`}.<br>
            Ensemble, ils ont donc (${choix1 ? `$${a + b}+${a}$` : `$${a - b}+${a}$`}) billes, soit ${choix1 ? `$${2 * a + b}$` : `$${2 * a - b}$`} billes.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' billes' } }
        }
        break
    }
  }
}
