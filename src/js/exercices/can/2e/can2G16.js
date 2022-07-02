import { droiteGraduee2, mathalea2d } from '../../../modules/2d.js'
import FractionX from '../../../modules/FractionEtendue.js'
import { randint, choice, texteCentre, choisitLettresDifferentes } from '../../../modules/outils'
import Exercice from '../../Exercice.js'
export const titre = 'Trouver un coefficient de colinéarité (graphique)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/*!
 * @author Gilles Mora
 */
export const dateDePublication = '22/06/2022'
export default function VecteursCol () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'fractionEgale'
  this.consigne = ''

  this.nouvelleVersion = function () {
    const a = randint(3, 10) // abscisse de C
    const b = randint(1, a - 1)// abscisse de B l'abscisse de A est 0
    const noms = choisitLettresDifferentes(3, 'O', true)

    const f1 = new FractionX(b, a)
    const f2 = new FractionX(a, b)
    const f3 = new FractionX(b, a).multiplieEntier(-1)
    const f4 = new FractionX(a, b).multiplieEntier(-1)
    switch (choice([1, 2, 3, 4])) { //
      case 1:

        this.reponse = f1
        this.question = `Compléter l’égalité vectorielle :<br>
    ${texteCentre(`$\\overrightarrow{${noms[0]}${noms[1]}}= ....\\overrightarrow{${noms[0]}${noms[2]}}$`)}  ` +
     mathalea2d({ xmin: -1, ymin: -1, xmax: 15.5, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, droiteGraduee2({
       Unite: 1.5,
       Min: 0,
       Max: a,
       x: 0,
       y: 0,
       thickOffset: 0,
       axeStyle: '|-',
       pointListe: [[0, `${noms[0]}`], [b, `${noms[1]}`], [a, `${noms[2]}`]],
       pointCouleur: 'blue',
       labelsPrincipaux: false

     }))

        this.correction = `Les vecteurs $\\overrightarrow{${noms[0]}${noms[1]}}$ et $\\overrightarrow{${noms[0]}${noms[2]}}$
       sont colinéaires de même sens. Le nombre cherché est donc positif.<br>
       Les graduations indiquent $${noms[0]}${noms[2]}=${a}$ et $${noms[0]}${noms[1]}=${b}$. <br>
       Le nombre cherché est donc : $${f1.texFraction}${f1.texSimplificationAvecEtapes()}$.<br>
       Ainsi, $\\overrightarrow{${noms[0]}${noms[1]}}= ${f1.texFractionSimplifiee}\\overrightarrow{${noms[0]}${noms[2]}}$
      `
        break

      case 2:

        this.reponse = f2
        this.question = `Compléter l’égalité vectorielle :<br>
    ${texteCentre(`$\\overrightarrow{${noms[0]}${noms[2]}}= ....\\overrightarrow{${noms[0]}${noms[1]}}$`)}  ` +
     mathalea2d({ xmin: -1, ymin: -1, xmax: 15.5, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, droiteGraduee2({
       Unite: 1.5,
       Min: 0,
       Max: a,
       x: 0,
       y: 0,
       thickOffset: 0,
       axeStyle: '|-',
       pointListe: [[0, `${noms[0]}`], [b, `${noms[1]}`], [a, `${noms[2]}`]],
       pointCouleur: 'blue',
       labelsPrincipaux: false

     }))

        this.correction = `Les vecteurs $\\overrightarrow{${noms[0]}${noms[1]}}$ et $\\overrightarrow{${noms[0]}${noms[2]}}$
       sont colinéaires de même sens. Le nombre cherché est donc positif.<br>
       Les graduations indiquent $${noms[0]}${noms[1]}=${b}$ et $${noms[0]}${noms[2]}=${a}$. <br>
       Le nombre cherché est donc : $${f2.texFraction}${f2.texSimplificationAvecEtapes()}$.<br>
       Ainsi, $\\overrightarrow{${noms[0]}${noms[2]}}= ${f2.texFractionSimplifiee}\\overrightarrow{${noms[0]}${noms[1]}}$
      `
        break

      case 3:

        this.reponse = f3
        this.question = `Compléter l’égalité vectorielle :<br>
      ${texteCentre(`$\\overrightarrow{${noms[0]}${noms[1]}}= ....\\overrightarrow{${noms[2]}${noms[0]}}$`)}  ` +
       mathalea2d({ xmin: -1, ymin: -1, xmax: 15.5, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, droiteGraduee2({
         Unite: 1.5,
         Min: 0,
         Max: a,
         x: 0,
         y: 0,
         thickOffset: 0,
         axeStyle: '|-',
         pointListe: [[0, `${noms[0]}`], [b, `${noms[1]}`], [a, `${noms[2]}`]],
         pointCouleur: 'blue',
         labelsPrincipaux: false

       }))

        this.correction = `Les vecteurs $\\overrightarrow{${noms[0]}${noms[1]}}$ et $\\overrightarrow{${noms[2]}${noms[0]}}$
         sont colinéaires de même contraires. Le nombre cherché est donc négatif.<br>
         Les graduations indiquent $${noms[0]}${noms[2]}=${a}$ et $${noms[0]}${noms[1]}=${b}$. <br>
         Le nombre cherché est donc : $${f3.texFraction}${f3.texSimplificationAvecEtapes()}$.<br>
         Ainsi, $\\overrightarrow{${noms[0]}${noms[1]}}= ${f3.texFractionSimplifiee}\\overrightarrow{${noms[2]}${noms[0]}}$
        `
        break
      case 4:

        this.reponse = f4
        this.question = `Compléter l’égalité vectorielle :<br>
        ${texteCentre(`$\\overrightarrow{${noms[0]}${noms[2]}}= ....\\overrightarrow{${noms[1]}${noms[0]}}$`)}  ` +
         mathalea2d({ xmin: -1, ymin: -1, xmax: 15.5, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, droiteGraduee2({
           Unite: 1.5,
           Min: 0,
           Max: a,
           x: 0,
           y: 0,
           thickOffset: 0,
           axeStyle: '|-',
           pointListe: [[0, `${noms[0]}`], [b, `${noms[1]}`], [a, `${noms[2]}`]],
           pointCouleur: 'blue',
           labelsPrincipaux: false

         }))

        this.correction = `Les vecteurs $\\overrightarrow{${noms[1]}${noms[0]}}$ et $\\overrightarrow{${noms[0]}${noms[2]}}$
           sont colinéaires de sens contraires. Le nombre cherché est donc négatif.<br>
           Les graduations indiquent $${noms[1]}${noms[0]}=${b}$ et $${noms[0]}${noms[2]}=${a}$. <br>
           Le nombre cherché est donc : $${f4.texFraction}${f4.texSimplificationAvecEtapes()}$.<br>
           Ainsi, $\\overrightarrow{${noms[0]}${noms[2]}}= ${f4.texFractionSimplifiee}\\overrightarrow{${noms[1]}${noms[0]}}$
          `
        break
    }
  }
}
