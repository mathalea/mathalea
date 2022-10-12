import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice, rangeMinMax } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { numAlpha, texteEnCouleurEtGras } from '../../modules/outils/contextSensitif.js'
import { texNombre } from '../../modules/outils/texNombres.js'
import { ecriturePuissance } from '../../modules/outils/puissances.js'

export const titre = 'Puissances de 10'

/**
 * * Comparer des puissances de 10.
 *
 * Paramétrages possibles :
 * 1 : Puissances de 10 seules
 * 2 : mantisses différentes et même exposant
 * 3 : mêmes mantisses et exposants différents
 * 4 : mantisses et exposants différents
 * 5 : mantisses (négatives) et exposants différents
 * 6 : Tous types
 * Programmes : p130 : "Comparer, ranger, encadrer des nombres rationnels en écriture décimale, fractionnaire ou scientifique
 * @author Erwan Duplessy
 * date : 15/11/2020
 * 4C30-4
 */
export default function ComparerPuissance10 () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Dans chaque cas, comparer les deux nombres. Les deux nombres sont écrits en écriture scientifique.'
  this.nbQuestions = 5 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.correctionDetailleeDisponible = true
  context.isHtml ? this.correctionDetaillee = true : this.correctionDetaillee = false
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles = []
    typesDeQuestionsDisponibles = [1, 2, 3, 4, 5]

    for (let i = 0, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let a1 = 0 // mantisse 1
      let a2 = 0 // mantisse 2
      let n1 = 0 // puissance 1
      let n2 = 0 // puissance 2
      let nbA1 = 0 // valeur numérique du nombre 1
      let nbA2 = 0 // valeur numérique du nombre 2
      this.listeQuestions = [] // tableau contenant la liste des questions
      this.listeCorrections = []
      const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
      switch (listeTypeDeQuestions[i]) {
        case 1:
          a1 = 1
          n1 = randint(-9, 9)
          a2 = 1
          n2 = choice(rangeMinMax(-9, 9), [n1])
          nbA1 = a1 * 10 ** n1
          nbA2 = a2 * 10 ** n2
          break
        case 2:
          a1 = randint(1, 9) + 0.1 * randint(1, 9) * randint(0, 1)
          n1 = randint(-9, 9)
          a2 = choice([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [a1]) + 0.1 * randint(1, 9) * randint(0, 1)
          n2 = n1
          nbA1 = a1 * 10 ** n1
          nbA2 = a2 * 10 ** n2
          break
        case 3:
          a1 = randint(1, 9) + 0.1 * randint(0, 9) + 0.01 * randint(0, 9)
          n1 = randint(-9, 9)
          a2 = a1
          n2 = randint(-9, 9)
          break
        case 4:
          a1 = randint(1, 9) + 0.1 * randint(0, 9)
          n1 = randint(-9, 9)
          a2 = choice(rangeMinMax(1, 99)) / 10
          n2 = randint(-9, 9)
          break
        case 5:
          a1 = choice(rangeMinMax(-99, 99, [0])) / 10
          n1 = randint(-9, 9)
          a2 = choice(rangeMinMax(-99, 99, [0])) / 10
          n2 = randint(-9, 9)
          break
      }
      nbA1 = a1 * 10 ** n1
      nbA2 = a2 * 10 ** n2
      texte += numAlpha(i) + ' ' + ecriturePuissance(a1, 10, n1) + ' et ' + ecriturePuissance(a2, 10, n2) + '<br>'
      // début correction détaillée
      texteCorr += numAlpha(i) + ' '
      if (this.correctionDetaillee) {
        if (nbA1 === nbA2) {
          texteCorr += 'Les deux nombres ont la même écriture, ils sont donc égaux. <br>'
        } else {
          if (a1 * a2 === 0) {
            texteCorr += 'L\'un des deux nombres est nul. Il suffit de regarder le signe de l\'autre. <br>'
          } else {
            if (a1 * a2 < 0) { // a1 et a2 de signes opposés
              texteCorr += 'Les deux nombres sont de signes opposés. Le plus petit nombre est donc le nombre négatif. <br>'
            } else {
              if (a1 > 0 && a2 > 0) { // a1 et a2 strictement positifs
                texteCorr += 'Les deux nombres sont positifs. On compare les exposants de l\'écriture scientifique : '
                if (n1 > n2) {
                  texteCorr += `$${n1} > ${n2}$. <br>`
                }
                if (n1 === n2) {
                  texteCorr += `Les exposants sont égaux. On compare $${texNombre(a1)}$ et $${texNombre(a2)}$ : `
                  if (a1 < a2) {
                    texteCorr += `$${texNombre(a1)} < ${texNombre(a2)}$. <br>`
                  } else {
                    texteCorr += `$${texNombre(a1)} > ${texNombre(a2)}$. <br>`
                  }
                }
                if (n1 < n2) {
                  texteCorr += `$${n1} < ${n2}$.<br>`
                }
              }
              if (a1 < 0 && a2 < 0) { // a1 et a2 strictement négatifs
                texteCorr += `Les deux nombres sont négatifs. Ils sont rangés dans l'ordre contraire de leur opposé : ${ecriturePuissance(-a1, 10, n1)} et ${ecriturePuissance(-a2, 10, n2)}. <br>`
                texteCorr += 'On compare les exposants de l\'écriture scientifique : '
                if (n1 > n2) {
                  texteCorr += `$${n1} > ${n2}$. Donc ${ecriturePuissance(-a1, 10, n1)} $>$ ${ecriturePuissance(-a2, 10, n2)}. <br>`
                }
                if (n1 === n2) {
                  texteCorr += `les exposants sont égaux. On compare $${texNombre(a1)}$ et $${texNombre(a2)}$ : `
                  if (a1 < a2) {
                    texteCorr += `$${texNombre(a1)} < ${texNombre(a2)}$. Donc ${ecriturePuissance(-a1, 10, n1)} $<$ ${ecriturePuissance(-a2, 10, n2)}. <br><br>`
                  } else {
                    texteCorr += `$${texNombre(a1)} > ${texNombre(a2)}$. Donc ${ecriturePuissance(-a1, 10, n1)} $>$ ${ecriturePuissance(-a2, 10, n2)}. <br><br>`
                  }
                }
                if (n1 < n2) {
                  texteCorr += `$${n1} < ${n2}$. Donc ${ecriturePuissance(-a1, 10, n1)} $<$ ${ecriturePuissance(-a2, 10, n2)}. <br>`
                }
              }
            }
          }
        }
        texteCorr += texteEnCouleurEtGras('Conclusion : ')
      } // fin de la correction détaillée
      // correction courte :
      if (nbA1 > nbA2) {
        texteCorr += texteEnCouleurEtGras(` ${ecriturePuissance(a1, 10, n1)} $>$ ${ecriturePuissance(a2, 10, n2)} <br>`)
      } else {
        if (nbA1 === nbA2) {
          texteCorr += texteEnCouleurEtGras(` ${ecriturePuissance(a1, 10, n1)} $=$ ${ecriturePuissance(a2, 10, n2)} <br>`)
        } else {
          texteCorr += texteEnCouleurEtGras(` ${ecriturePuissance(a1, 10, n1)} $<$ ${ecriturePuissance(a2, 10, n2)} <br>`)
        }
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
}
