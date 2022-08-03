import Exercice from '../../Exercice.js'
import { choice, randint, prenomF, prenomM, texPrix } from '../../../modules/outils.js'
export const titre = 'Résoudre un problème avec "de plus", "de moins"*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '24/07/2022'

/*!
 * @author Gilles Mora
 *
 */
export default function PlusOuMoins2 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const listeObjets = [
      ['biscuits'], ['billes'], ['bonbons'], ['ballons'], ['vis'], ['clous'], ['bandes dessinées']
    ]
    const listeClubs = [
      ['judo'], ['tennis'], ['tennis de table'], ['musique'], ['théâtre'], ['danse']

    ]
    let choix, a, b, r, e, m, somme, prenom1, prenom2, choix1, reponse1, reponse2, clubs, objets, choix2
    switch (choice([1, 2, 3])) { // 1, 2
      case 1:
        choix = choice(['a', 'b', 'c', 'd'])
        if (choix === 'a') { // somme d'argent ensemble avec de plus(1)
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
          if (choice([true, false])) {
            this.question = ` ${prenom2} dit à ${prenom1}  : « J'ai $${texPrix(r)}$ € soit $${texPrix(e)}$ € de plus que toi ».<br>`
            this.question += 'Combien d\'argent en tout possèdent les deux filles ?'
          } else {
            this.question = ` ${prenom2} a $${texPrix(r)}$ €. Elle a  $${texPrix(e)}$ € de plus que ${prenom1} ».<br>`
            this.question += 'Combien d\'argent en tout possèdent les deux filles ?'
          }
          this.correction = `${prenom2} a $${texPrix(r)}$ €.<br>${prenom2}  a $${texPrix(e)}$ € `
          this.correction += ' de plus '
          this.correction += `que ${prenom1} donc ${prenom1} a $${texPrix(e)}$ € `
          this.correction += ' de moins '
          this.correction += `que ${prenom2}. <br>${prenom1} a donc : $${texPrix(r)}-${texPrix(e)}=${texPrix(m)}$ €.`
          this.correction += `<br>$${texPrix(r)}+${texPrix(m)}= ${texPrix(somme)}$`
          this.correction += `<br>Les deux filles possèdent en tout : $${texPrix(somme)}$ €.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
        }
        if (choix === 'b') { // somme d'argent ensemble avec de moins(1)
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
          if (choice([true, false])) {
            this.question = ` ${prenom2} dit à ${prenom1}  : « J'ai $${texPrix(r)}$ € soit $${texPrix(e)}$ € de moins que toi ».<br>`
            this.question += 'Combien d\'argent en tout possèdent les deux filles ? '
          } else {
            this.question = ` ${prenom2} a $${texPrix(r)}$ €. Elle a $${texPrix(e)}$ € de moins ${prenom1}.<br>`
            this.question += 'Combien d\'argent en tout possèdent les deux filles ? '
          }

          this.correction = `${prenom2} a  $${texPrix(r)}$ €.<br>${prenom2}  a $${texPrix(e)}$ € `
          this.correction += ' de moins '
          this.correction += `que ${prenom1} signifie que ${prenom1} a $${texPrix(e)}$ € `
          this.correction += ' de plus '
          this.correction += `que ${prenom2}. <br>${prenom1} a donc : $${texPrix(r)} + ${texPrix(e)} = ${texPrix(m)}$ €.`
          this.correction += `<br>$${texPrix(r)} + ${texPrix(m)}  = ${texPrix(somme)}$`
          this.correction += `<br>Les deux filles possèdent en tout : $${texPrix(somme)}$ €.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
        }
        if (choix === 'c') { // somme d'argent ensemble avec de moins(2)
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
          if (choice([true, false])) {
            this.question = ` ${prenom2} dit à ${prenom1}  : « J'ai $${texPrix(r)}$ € et tu as  $${texPrix(e)}$ € de moins que moi ».<br>`
            this.question += 'Combien d\'argent en tout possèdent les deux filles ? '
          } else {
            this.question = ` ${prenom2} a $${texPrix(r)}$ €. ${prenom1} a $${texPrix(e)}$ € de moins.<br>`
            this.question += 'Combien d\'argent en tout possèdent les deux filles ? '
          }

          this.correction = `${prenom2} a  $${texPrix(r)}$ €.<br>${prenom1}  a $${texPrix(e)}$ € `
          this.correction += ' de moins '
          this.correction += `que ${prenom2}.`
          this.correction += ` <br>${prenom1} a donc : $${texPrix(r)} -${texPrix(e)} = ${texPrix(m)}$ €.`
          this.correction += `<br>$${texPrix(r)} + ${texPrix(m)}  = ${texPrix(somme)}$`
          this.correction += `<br>Les deux filles possèdent en tout : $${texPrix(somme)}$ €.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
        }
        if (choix === 'd') { // somme d'argent ensemble avec de plus(2)
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
          if (choice([true, false])) {
            this.question = ` ${prenom2} dit à ${prenom1}  : « J'ai $${texPrix(r)}$ € et tu as  $${texPrix(e)}$ € de plus que moi ».<br>`
            this.question += 'Combien d\'argent en tout possèdent les deux filles ?'
          } else {
            this.question = ` ${prenom2} a $${texPrix(r)}$ €. ${prenom1} a $${texPrix(e)}$ € de plus.<br>`
            this.question += 'Combien d\'argent en tout possèdent les deux filles ? '
          }
          this.correction = `${prenom2} a $${texPrix(r)}$ €.<br>${prenom1}  a $${texPrix(e)}$ € `
          this.correction += ' de plus '
          this.correction += `que ${prenom2}.  `
          this.correction += `  <br>${prenom1} a donc : $${texPrix(r)}+${texPrix(e)}=${texPrix(m)}$ €.`
          this.correction += `<br>$${texPrix(r)}+${texPrix(m)}= ${texPrix(somme)}$`
          this.correction += `<br>Les deux filles possèdent en tout : $${texPrix(somme)}$ €.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
        }

        break
      case 2:// ensemble, objets
        choix = choice(['a', 'b'])
        if (choix === 'a') {
          choix1 = choice([true, false])
          prenom1 = prenomF()
          prenom2 = prenomM()
          objets = choice(listeObjets)
          a = randint(35, 60)
          b = randint(9, 21, [10, 20])

          reponse1 = 2 * a - b
          reponse2 = 2 * a + b
          this.reponse = choix1 ? reponse1 : reponse2
          if (choice([true, false])) {
            this.question = `${prenom1} a $${a}$ ${objets}. Elle en  a $${b}$ ${choix1 ? 'de plus' : ' de moins '}
                      que ${prenom2}. <br>
                      Combien  en ont-ils ensemble ?`
          } else {
            this.question = `${prenom1} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}. <br>
                      Sachant que ${prenom1} a $${a}$ ${objets}, combien en ont-ils ensemble  ?`
          }
          this.correction = `${prenom1} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '} que ${prenom2} donc ${prenom2}  a $${b}$ ${objets} ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
                      Il a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) ${objets}, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} ${objets}.<br>
                      Ensemble, ils en ont (${choix1 ? `$${a - b}+${a}$` : `$${a + b}+${a}$`}) soit ${choix1 ? `$${reponse1}$` : `$${reponse2}$`}.`
        }
        if (choix === 'b') {
          choix1 = choice([true, false])
          prenom1 = prenomM()
          prenom2 = prenomF()
          objets = choice(listeObjets)
          a = randint(12, 20)
          b = randint(2, 8)
          if (choice([true, false])) {
            reponse1 = 2 * a + b
            reponse2 = 2 * a - b
            this.reponse = choix1 ? reponse2 : reponse1
            if (choice([true, false])) {
              this.question = `${prenom1} a $${a}$ ${objets}. Il a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '}
                  que ${prenom2}. <br>
                  Combien  en ont-ils ensemble ?`
            } else {
              this.question = `${prenom1} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '}
                  que ${prenom2}. <br>
                  Sachant qu'il a $${a}$ ${objets}, combien de ${objets} ont-ils ensemble ?`
            }
            this.correction = `${prenom1} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '} que ${prenom2} donc ${prenom2}  a $${b}$ ${objets} ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
                  Il en a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}), soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`}.<br>
                  Ensemble, ils ont donc (${choix1 ? `$${a - b}+${a}$` : `$${a + b}+${a}$`}), soit  ${choix1 ? `$${reponse2}$` : `$${reponse1}$`} ${objets}.
                   `
          } else {
            reponse1 = 2 * a + b
            reponse2 = 2 * a - b
            this.reponse = choix1 ? reponse1 : reponse2
            if (choice([true, false])) {
              this.question = `${prenom1} a $${a}$ ${objets}. ${prenom2} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '}
                  que lui. <br>
                  Combien  en ont-ils ensemble ?`
            } else {
              this.question = `${prenom2} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '}
                  que ${prenom1} qui en a $${a}$.  <br>
                  Combien  de ${objets} ont-ils ensemble ?`
            }
            this.correction = `${prenom1} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}.
             Il en a donc  (${choix1 ? `$${a}+${b}$` : `$${a}-${b}$`}), soit  ${choix1 ? `$${a + b}$` : `$${a - b}$`}. <br>
             Ensemble, ils ont donc (${choix1 ? `$${a + b}+${a}$` : `$${a - b}+${a}$`}), soit  ${choix1 ? `$${reponse1}$` : `$${reponse2}$`} ${objets}.
              `
          }
        }
        if (this.interactif) { this.optionsChampTexte = { texteApres: ` ${objets}` } }
        break

      case 3:
        choix = choice(['a', 'b'])
        if (choix === 'a') {
          choix1 = choice([true, false])
          choix2 = choice([true, false])
          prenom1 = prenomF()
          prenom2 = prenomM()
          clubs = choice(listeClubs)
          a = randint(35, 60)
          b = randint(9, 21, [10, 20])

          reponse1 = 2 * a + b
          reponse2 = 2 * a - b
          this.reponse = choix1 ? reponse1 : reponse2

          this.question = `Dans un club de ${clubs}, il y a $${a}$ ${choix2 ? ' garçons ' : ' filles'}. <br>
              Il y a $${b}$ ${choix2 ? ' filles ' : ' garçons'} ${choix1 ? 'de plus' : ' de moins '}
                      que de ${choix2 ? ' garçons ' : ' filles'}. <br>
                      Combien y a-t-il d'adhérents dans ce club ? `

          this.correction = ` Il y a $${b}$ ${choix2 ? ' filles ' : ' garçons'} ${choix1 ? 'de plus' : ' de moins '}
            que de ${choix2 ? ' garçons ' : ' filles'}.<br>
                      Il y a donc  (${choix1 ? `$${a}+${b}$` : `$${a}-${b}$`}) ${choix2 ? ' filles' : ' garçons'}, soit  ${choix1 ? `$${a + b}$` : `$${a - b}$`} ${choix2 ? ' filles ' : ' garçons'}. <br>
                      Dans ce club, il y a donc au total (${choix1 ? `$${a + b}+${a}$` : `$${a - b}+${a}$`}) soit ${choix1 ? `$${reponse1}$` : `$${reponse2}$`} adhérents.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' adhérents' } }
        }
        if (choix === 'b') {
          choix1 = choice([true, false])
          choix2 = choice([true, false])
          prenom1 = prenomF()
          prenom2 = prenomM()
          clubs = choice(listeClubs)
          a = randint(35, 60)
          b = randint(9, 21, [10, 20])

          reponse1 = 2 * a + b
          reponse2 = 2 * a - b
          this.reponse = choix1 ? reponse2 : reponse1

          this.question = `Dans un club de ${clubs}, il y a $${a}$ ${choix2 ? ' filles ' : ' garçons'}.<br>
                        Sachant qu'il y a $${b}$ ${choix2 ? ' filles ' : ' garçons'} ${choix1 ? 'de plus' : ' de moins '} que de ${choix2 ? ' garçons ' : ' filles'}, combien y a-t-il d'adhérents dans ce club ? `

          this.correction = ` Il y a $${b}$ ${choix2 ? ' filles ' : ' garçons'} ${choix1 ? 'de plus' : ' de moins '}
                      que de ${choix2 ? ' garçons ' : ' filles'}, il y a donc  $${b}$ ${choix2 ? ' garçons ' : ' filles'} ${choix1 ? 'de moins' : ' de plus '}
                      que de ${choix2 ? ' filles ' : ' garçons'}.<br>
                     Il y a (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) ${choix2 ? ' garçons' : ' filles'}, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} ${choix2 ? ' garçons' : ' filles'} dans ce club. 
                     <br>Dans ce club, il y a donc au total (${choix1 ? `$${a - b}+${a}$` : `$${a + b}+${a}$`}) soit ${choix1 ? `$${reponse2}$` : `$${reponse1}$`} adhérents.`
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' adhérents' } }
        }

        break
    }
  }
}
