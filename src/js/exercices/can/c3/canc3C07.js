import { choice, randint, prenomF, prenomM } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Résoudre un problème avec "de plus", "de moins"'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '25/07/2022'

/*!
 * @author Gilles Mora
 * Référence canc3C07
 */
export const uuid = '02561'
export const ref = 'canc3C07'
export default function PlusOuMoins () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const listeObjets = [
      ['biscuits'], ['billes'], ['bonbons'], ['ballons'], ['vis'], ['clous'], ['bandes dessinées']
    ]
    const listeClubs = [
      ['judo'], ['tennis'], ['tennis de table'], ['musique'], ['théâtre'], ['danse']

    ]
    let choix, a, b, prenom1, prenom2, choix1, reponse1, reponse2, objets, choix2, clubs
    switch (choice([1, 2, 3])) {
      case 1:// âge
        choix = choice(['a', 'b'])
        if (choix === 'a') {
          choix1 = choice([true, false])
          prenom1 = prenomM()
          prenom2 = prenomF()

          a = randint(12, 20)
          b = randint(2, 8)
          if (choice([true, false])) {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse2 : reponse1
            if (choice([true, false])) {
              this.question = `${prenom1} a $${a}$ ans. Il a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '}
                que ${prenom2}. <br>

                Quel est l'âge de ${prenom2} ?`
            } else {
              this.question = `${prenom1} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '}
                que ${prenom2}. <br>
                
                Sachant qu'il a $${a}$ ans, quel est l'âge de ${prenom2} ?`
            }
            this.correction = `${prenom1} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} que ${prenom2} donc ${prenom2}  a $${b}$ années ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
                Il a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) ans, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} ans. `
            if (this.interactif) { this.optionsChampTexte = { texteApres: ' ans' } }
          } else {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse1 : reponse2
            if (choice([true, false])) {
              this.question = `${prenom1} a $${a}$ ans. ${prenom2} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '}
                que ${prenom1}. <br>

                Quel est l'âge de ${prenom2} ?`
            } else {
              this.question = `${prenom2} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '}
                que ${prenom1} qui a $${a}$ ans.  <br>
                Quel est l'âge de ${prenom2} ?`
            }
            this.correction = `${prenom1} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}.
           Il a donc  (${choix1 ? `$${a}+${b}$` : `$${a}-${b}$`}) ans, soit  ${choix1 ? `$${a + b}$` : `$${a - b}$`} ans. `
            if (this.interactif) { this.optionsChampTexte = { texteApres: ' ans' } }
          }
        }

        if (choix === 'b') {
          choix1 = choice([true, false])
          prenom1 = prenomM()

          a = randint(12, 20)
          b = randint(2, 8)
          if (choice([true, false])) {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse2 : reponse1
            if (choice([true, false])) {
              this.question = `${prenom1} a $${a}$ ans. Il a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '}
                  que sa sœur. <br>

                  Quel est l'âge de sa sœur ?`
            } else {
              this.question = `${prenom1} a $${a}$ ans soit $${b}$ ans ${choix1 ? 'de plus' : ' de moins '}
                  que sa sœur. <br>

                  Quel est l'âge de sa sœur ?`
            }
            this.correction = `${prenom1} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} que sa sœur donc sa sœur a $${b}$ années ${choix1 ? 'de moins' : ' de plus '} que son frère.<br>
                  Elle a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) ans, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} ans. `
          } else {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse1 : reponse2
            if (choice([true, false])) {
              this.question = `${prenom1} a $${a}$ ans. Sa sœur a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '}
                            que lui. <br>

                            Quel est l'âge de sa sœur ?`
            } else {
              this.question = `La sœur de ${prenom1} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '}
                            que lui. <br>Sachant que  ${prenom1} a $${a}$ ans, quel est l'âge de sa sœur ?`
            }
            this.correction = `${prenom1} a $${a}$ ans et sa sœur  a $${b}$ ans de ${choix1 ? 'de plus' : ' de moins '}.<br>
                            Elle a donc  (${choix1 ? `$${a}+${b}$` : `$${a}-${b}$`}) ans, soit  ${choix1 ? `$${a + b}$` : `$${a - b}$`} ans. `
          }
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' ans' } }
        }

        break

      case 2:
        choix = choice(['a', 'b'])
        if (choix === 'a') {
          choix1 = choice([true, false])
          prenom1 = prenomF()
          prenom2 = prenomM()
          objets = choice(listeObjets)
          a = randint(35, 60)
          b = randint(9, 21, [10, 20])

          reponse1 = a + b
          reponse2 = a - b
          this.reponse = choix1 ? reponse2 : reponse1
          if (choice([true, false])) {
            this.question = `${prenom1} a $${a}$ ${objets}. Elle en  a $${b}$ ${choix1 ? 'de plus' : ' de moins '}
                    que ${prenom2}. <br>

                    Combien ${prenom2} a-t-il de ${objets} ?`
          } else {
            this.question = `${prenom1} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}. <br>
                    
            Sachant que ${prenom1} a $${a}$ ${objets}, combien ${prenom2} en a-t-il ?`
          }
          this.correction = `${prenom1} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '} que ${prenom2} donc ${prenom2}  a $${b}$ ${objets} ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
                    Il a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) ${objets}, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} ${objets}. `
        }
        if (choix === 'b') {
          choix1 = choice([true, false])
          prenom1 = prenomM()
          prenom2 = prenomF()
          objets = choice(listeObjets)
          a = randint(12, 20)
          b = randint(2, 8)
          if (choice([true, false])) {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse2 : reponse1
            if (choice([true, false])) {
              this.question = `${prenom1} a $${a}$ ${objets}. Il a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '}
                que ${prenom2}. <br>

                Combien ${prenom2} a-t-il de ${objets} ?`
            } else {
              this.question = `${prenom1} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '}
                que ${prenom2}. <br>

                Sachant qu'il a $${a}$ ${objets}, combien de ${objets} possède ${prenom2} ?`
            }
            this.correction = `${prenom1} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '} que ${prenom2} donc ${prenom2}  a $${b}$ ${objets} ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
                Il en a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}), soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`}. `
          } else {
            reponse1 = a + b
            reponse2 = a - b
            this.reponse = choix1 ? reponse1 : reponse2
            if (choice([true, false])) {
              this.question = `${prenom1} a $${a}$ ${objets}. ${prenom2} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '}
                que lui. <br>

                Combien ${prenom2} a-t-il de ${objets} ?`
            } else {
              this.question = `${prenom2} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '}
                que ${prenom1} qui en a $${a}$.  <br>

                Combien ${prenom2} a-t-il de ${objets} ?`
            }
            this.correction = `${prenom1} a $${b}$ ${objets} ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}.
           Il en a donc  (${choix1 ? `$${a}+${b}$` : `$${a}-${b}$`}), soit  ${choix1 ? `$${a + b}$` : `$${a - b}$`}. `
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

          reponse1 = a + b
          reponse2 = a - b
          this.reponse = choix1 ? reponse1 : reponse2

          this.question = `Dans un club de ${clubs}, il y a $${a}$ ${choix2 ? ' garçons ' : ' filles'}. <br>
              Il y a $${b}$ ${choix2 ? ' filles ' : ' garçons'} ${choix1 ? 'de plus' : ' de moins '}
                      que de ${choix2 ? ' garçons ' : ' filles'}. <br>

                      Combien y a-t-il de ${choix2 ? ' filles' : ' garçons '} dans ce club ? `

          this.correction = ` Il y a $${b}$ ${choix2 ? ' filles ' : ' garçons'} ${choix1 ? 'de plus' : ' de moins '}
            que de ${choix2 ? ' garçons ' : ' filles'}.<br>
                      Il y a donc  (${choix1 ? `$${a}+${b}$` : `$${a}-${b}$`}) ${choix2 ? ' filles' : ' garçons'}, soit  ${choix1 ? `$${a + b}$` : `$${a - b}$`} ${choix2 ? ' filles ' : ' garçons'}. `
          if (this.interactif) { this.optionsChampTexte = { texteApres: ` ${choix2 ? ' filles' : ' garçons'}` } }
        }
        if (choix === 'b') {
          choix1 = choice([true, false])
          choix2 = choice([true, false])
          prenom1 = prenomF()
          prenom2 = prenomM()
          clubs = choice(listeClubs)
          a = randint(35, 60)
          b = randint(9, 21, [10, 20])

          reponse1 = a + b
          reponse2 = a - b
          this.reponse = choix1 ? reponse2 : reponse1

          this.question = `Dans un club de ${clubs}, il y a $${a}$ ${choix2 ? ' filles ' : ' garçons'}.<br>
                        
          Sachant qu'il y a $${b}$ ${choix2 ? ' filles ' : ' garçons'} ${choix1 ? 'de plus' : ' de moins '} que de ${choix2 ? ' garçons ' : ' filles'}, combien y a-t-il de ${choix2 ? 'garçons' : 'filles'} dans ce club ? `

          this.correction = ` Il y a $${b}$ ${choix2 ? ' filles ' : ' garçons'} ${choix1 ? 'de plus' : ' de moins '}
                      que de ${choix2 ? ' garçons ' : ' filles'}, il y a donc  $${b}$ ${choix2 ? ' garçons ' : ' filles'} ${choix1 ? 'de moins' : ' de plus '}
                      que de ${choix2 ? ' filles ' : ' garçons'}.<br>
                     Il y a (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) ${choix2 ? ' garçons' : ' filles'}, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} ${choix2 ? ' garçons' : ' filles'} dans ce club.<br>
     `
          if (this.interactif) { this.optionsChampTexte = { texteApres: ` ${choix2 ? ' garçons' : ' filles'}` } }
        }

        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
