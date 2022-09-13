
import { choice, randint, prenomF, prenomM } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Résoudre un problème avec "fois plus", "fois moins"*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '23/07/2022'

/*!
 * @author Gilles Mora
 *
 */
export const uuid = '06268'
export const ref = 'canc3C10'
export default function FoisPlusFoisMoins2 () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const listeObjets = [['biscuits'], ['billes'], ['bonbons'], ['ballons'], ['vis'], ['clous']]
    const listeClubs = [
      ['judo'], ['tennis'], ['tennis de table'], ['musique'], ['théâtre'], ['danse']

    ]
    let a, b, k, prenom1, prenom2, choix1, reponse1, reponse2, objets, clubs, choix2
    switch (choice([1, 2, 3])) { // 1, 2
      case 1:
        choix1 = choice([true, false])
        prenom1 = prenomM()
        prenom2 = prenomF()
        objets = choice(listeObjets)
        a = randint(3, 12)
        k = choice([3, 4, 5, 6])
        b = a * k

        if (choice([true, false])) {
          reponse1 = a + b
          reponse2 = a + b
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom1} a $${k}$ fois  ${choix1 ? ' plus' : ' moins '}  de ${objets}
              que ${prenom2} qui en a ${choix1 ? `$${a}$` : ` $${b}$`}. <br>
           Combien de ${objets[0]} ont-ils ensemble ? `
          this.correction = `${prenom2}  a ${choix1 ? `$${a}$` : ` $${b}$`}  ${objets}. <br>
          ${prenom1} en a $${k}$ fois  ${choix1 ? ' plus' : ' moins '}, il en a donc 
          ${choix1 ? `$${k}\\times ${a}$` : ` $${b}\\div ${k}$ `}, soit ${choix1 ? `$${k * a}$` : ` $${a}$`}.<br>
          Ensemble ils en ont ${choix1 ? `$${a}+${b}$` : ` $${a}+ ${b}$ `}, soit ${choix1 ? `$${a + b}$` : ` $${a + b}$ `}.
          `
        } else {
          reponse1 = a + b
          reponse2 = a + b
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom2} a ${choix1 ? `$${a}$` : ` $${b}$ `}  ${objets}. ${prenom1} en a $${k}$ fois ${choix1 ? ' plus' : ' moins'}. <br>
       Combien de ${objets[0]} ont-ils ensemble ? `
          this.correction = `${prenom2}  a ${choix1 ? `$${a}$` : ` $${b}$ `}  ${objets}. <br>
       ${prenom1} en a $${k}$ fois  ${choix1 ? ' plus' : ' moins '}, il en a donc 
       ${choix1 ? `$${k}\\times ${a}$` : ` $${b}\\div ${k}$ `}, soit ${choix1 ? `$${k * a}$` : ` $${a}$`}.<br>
       Ensemble ils en ont ${choix1 ? `$${a}+${b}$` : ` $${a}+ ${b}$ `}, soit ${choix1 ? `$${a + b}$` : ` $${a + b}$`}.
       `
        }
        if (this.interactif) { this.optionsChampTexte = { texteApres: ` ${objets}` } }

        break
      case 2:
        choix1 = choice([true, false])
        prenom1 = prenomM()
        prenom2 = prenomF()
        objets = choice(listeObjets)
        a = randint(3, 12)
        k = choice([3, 4, 5, 6])
        b = a * k
        if (choice([true, false])) {
          reponse1 = a + b
          reponse2 = b + a
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom1} a ${choix1 ? `$${b}$` : ` $${a}$ `} ${objets}. Il en a $${k}$ fois  
              ${choix1 ? ' plus' : ' moins '}  que ${prenom2}. <br>
               Combien de ${objets[0]}  ont-ils ensemble ? `
          this.correction = `Puisque   ${prenom1} a ${choix1 ? `$${b}$` : ` $${a}$ `} ${objets} et qu'il en a $${k}$ fois  
              ${choix1 ? ' plus' : ' moins '}  que ${prenom2}, ${prenom2} en a donc $${k}$ fois ${choix1 ? ' moins' : ' plus '}. <br>
              Elle en a donc ${choix1 ? `$${b}\\div ${k}$` : ` $${k}\\times ${a}$ `}, soit ${choix1 ? `$${a}$` : ` $${b}$ `} ${objets}.<br>
              Ensemble, ils en ont donc : ${choix1 ? `$${a}+${b}$` : ` $${b}+${a}$ `} soit $${a + b}$.`
        } else {
          reponse1 = a + b
          reponse2 = a + b
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom1} a  $${k}$ fois  
              ${choix1 ? ' plus' : ' moins '} de ${objets} que ${prenom2}. Sachant qu'il a ${choix1 ? `$${b}$` : ` $${a}$`} ${objets}, combien en ont-ils ensemble ? `
          this.correction = `Puisque   ${prenom1} a ${choix1 ? `$${b}$` : ` $${a}$ `} ${objets} et qu'il en a $${k}$ fois  
              ${choix1 ? ' plus' : ' moins '}  que ${prenom2}, ${prenom2} en a donc $${k}$ fois ${choix1 ? ' moins' : ' plus'}. <br>
              Elle en a donc ${choix1 ? `$${b}\\div ${k}$` : ` $${k}\\times ${a}$ `}, soit ${choix1 ? `$${a}$` : ` $${b}$`} ${objets}.<br>
              Ensemble, ils en ont donc : ${choix1 ? `$${a}+${b}$` : ` $${b}+${a}$ `} soit $${a + b}$.`
        }
        if (this.interactif) { this.optionsChampTexte = { texteApres: ` ${objets}` } }
        break
      case 3:
        choix1 = choice([true, false])
        choix2 = choice([true, false])
        prenom1 = prenomM()
        prenom2 = prenomF()
        clubs = choice(listeClubs)
        a = randint(3, 12)
        k = choice([3, 4, 5, 6])
        b = a * k
        if (choice([true, false])) {
          reponse1 = a + b
          reponse2 = a + b
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `Dans un club de ${clubs}, il y a ${choix1 ? `$${a}$` : ` $${b}$ `} ${choix2 ? ' garçons ' : ' filles'} et 
                  $${k}$ fois  ${choix1 ? ' plus' : ' moins '} de ${choix2 ? ' filles ' : ' garçons'}.<br>
                  Combien y a-t-il d'adhérents dans ce club ? `
          this.correction = `Puisqu'il y a    ${choix1 ? `$${a}$` : ` $${b}$ `} ${choix2 ? ' garçons ' : ' filles'} 
                  et $${k}$ fois  ${choix1 ? ' plus' : ' moins '} de ${choix2 ? ' filles ' : ' garçons'}, 
                  le nombre de ${choix2 ? ' filles ' : ' garçons'} est donc : 
                  ${choix1 ? `$${k}\\times ${a}$` : ` $${b}\\div ${k}$ `}, soit ${choix1 ? `$${k * a}$` : ` $${a}$`}.<br>
                  Le nombre total d'adhérents dans ce club est donc ${choix1 ? `$${k * a}+${a}$` : ` $${a}+${b}$`} soit ${choix1 ? `$${a + b}$` : ` $${a + b}$`}.`
        } else {
          reponse1 = b + a
          reponse2 = a + b
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `Dans un club de ${clubs}, il y a $${k}$ fois  ${choix1 ? 'plus' : 'moins'} de ${choix2 ? ' filles' : ' garçons'} que de ${choix2 ? ' garçons' : ' filles'}. <br>
                  Sachant qu'il y a ${choix1 ? `$${a}$` : ` $${b}$ `} ${choix2 ? ' garçons ' : ' filles'}, combien y a-t-il d'adhérents dans ce club ? `
          this.correction = `Puisqu'il y a  $${k}$ fois  ${choix1 ? ' plus' : ' moins '} de ${choix2 ? ' filles ' : ' garçons'} que de ${choix2 ? ' garçons ' : ' filles'}, 
                  le nombre de  ${choix2 ? ' filles ' : ' garçons'} est : ${choix1 ? `$${k}\\times ${a}$` : ` $${b}\\div ${k}$ `}, soit ${choix1 ? `$${k * a}$` : ` $${a}$`}.<br>
                  Le nombre total d'adhérents dans ce club est donc ${choix1 ? `$${k * a}+${a}$` : ` $${a}+${b}$ `} soit ${choix1 ? `$${a + b}$` : ` $${a + b}$`}.`
        }
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' adhérents' } }

        break
    }
  }
}
