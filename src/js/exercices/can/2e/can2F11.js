import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, abs, miseEnEvidence, randint, calcul, choice, texNombre } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Utiliser la fonction carré pour comparer deux images'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '30/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function ComparerAvecFctCarre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.spacing = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    let texte, texteCorr, a, b
    switch (choice([1, 2, 3])) { //
      case 1 :
        a = calcul(randint(0, 5) + randint(5, 9) / 10 + randint(5, 9) / 100 + randint(0, 2) / 1000)
        b = calcul(a + (2 * randint(1, 9) / 1000) * choice([1, -1]))
        if (this.interactif) {
          texte = 'Sélectionner la réponse correcte. '
          if (a < b) {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$${texNombre(a)}^2<${texNombre(b)}^2$`,
                  statut: true
                },
                {
                  texte: `$${texNombre(a)}^2>${texNombre(b)}^2$`,
                  statut: false
                }
              ]
            }
          } else {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$${texNombre(a)}^2>${texNombre(b)}^2$`,
                  statut: true
                },
                {
                  texte: `$${texNombre(a)}^2<${texNombre(b)}^2$`,
                  statut: false
                }
              ]
            }
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Comparer $${texNombre(a)}^2$ et $${texNombre(b)}^2$.`
        }

        texteCorr = `            La fonction carré étant strictement croissante sur $[0;+\\infty[$, elle conserve l'ordre. Cela signifie que deux nombres positifs sont rangés dans le même ordre que leurs carrés.   <br>
            Autrement dit, si $a$ et $b$ sont deux nombres  positifs et si $a < b$, alors $a^2 < b^2$.`

        if (a < b) {
          texteCorr += `<br>Comme $${texNombre(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(b)}$, 
          alors  $${texNombre(a)}^2${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(b)}^2$.`
        } else {
          texteCorr += `<br>Comme $${texNombre(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(a)}$, 
          alors  $${texNombre(b)}^2${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(a)}^2$.`
        }

        break
      case 2 :
        a = calcul((randint(0, 5) + randint(5, 9) / 10 + randint(5, 9) / 100 + randint(0, 2) / 1000) * (-1))
        b = calcul(a + (2 * randint(1, 9) / 1000) * choice([1, -1]))
        if (this.interactif) {
          texte = 'Sélectionner la réponse correcte. '
          if (a < b) {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$(${texNombre(a)})^2>(${texNombre(b)})^2$`,
                  statut: true
                },
                {
                  texte: `$(${texNombre(a)})^2<(${texNombre(b)})^2$`,
                  statut: false
                }
              ]
            }
          } else {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$(${texNombre(a)})^2<(${texNombre(b)})^2$`,
                  statut: true
                },
                {
                  texte: `$(${texNombre(a)})^2>(${texNombre(b)})^2$`,
                  statut: false
                }
              ]
            }
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          texte = `Comparer $(${texNombre(a)})^2$ et $(${texNombre(b)})^2$.`
        }

        texteCorr = ` La fonction carré étant strictement décroissante sur $]-\\infty;0]$, elle change l'ordre. <br>
            Cela signifie que deux nombres négatifs sont rangés dans l'ordre inverse de leurs carrés.<br>
            Autrement dit, si $a$ et $b$ sont deux nombres  négatifs et si $a < b$, alors $a^2 > b^2$.`

        if (a < b) {
          texteCorr += `<br>Comme $${texNombre(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(b)}$, 
        alors  $(${texNombre(a)})^2${miseEnEvidence('\\boldsymbol{>}', 'blue')}(${texNombre(b)})^2$`
        } else {
          texteCorr += `<br>Comme $${texNombre(b)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(a)}$, 
        alors  $(${texNombre(b)})^2${miseEnEvidence('\\boldsymbol{>}', 'blue')}(${texNombre(a)})^2$.`
        }

        break
      case 3 :
        a = calcul(randint(1, 6) + randint(5, 9) / 10 + randint(5, 9) / 100 + randint(0, 2) / 1000)
        b = calcul((-1) * a + (2 * randint(1, 9) / 1000) * choice([1, -1]))
        if (this.interactif) {
          texte = 'Sélectionner la réponse correcte. '
          if (abs(a) < abs(b)) {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$(${texNombre(b)})^2>${texNombre(a)}^2$`,
                  statut: true
                },
                {
                  texte: `$${texNombre(a)}^2>(${texNombre(b)})^2$`,
                  statut: false
                }
              ]
            }
          } else {
            this.autoCorrection[0] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `$${texNombre(a)}^2>(${texNombre(b)})^2$`,
                  statut: true
                },
                {
                  texte: `$(${texNombre(b)})^2>${texNombre(a)}^2$`,
                  statut: false
                }
              ]
            }
          }

          texte += propositionsQcm(this, 0).texte
        } else {
          if (choice([true, false])) { texte = `Comparer $${texNombre(a)}^2$ et $(${texNombre(b)})^2$.` } else { texte = `Comparer  $(${texNombre(b)})^2$ et $${texNombre(a)}^2$.` }
        }

        texteCorr = ` Le nombre $${texNombre(b)}$ est négatif, alors que le nombre $${texNombre(a)}$ est positif. 
            Comme deux nombres opposés ont le même carré, comparer $${texNombre(a)}^2$ et $(${texNombre(b)})^2$ 
            revient à comparer $${texNombre(a)}^2$ et $${texNombre(-b)}^2$.<br>
             La fonction carré étant strictement croissante sur $[0;+\\infty[$, elle conserve l'ordre. <br>
             Cela signifie que deux nombres positifs sont rangés dans le même ordre que leurs carrés.   <br>
             Autrement dit, si $a$ et $b$ sont deux nombres  positifs et si $a < b$, alors $a^2 < b^2$.`
        if (abs(a) < abs(b)) {
          texteCorr += `<br>Comme $${texNombre(a)}${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(-b)}$, 
        alors  $${texNombre(a)}^2${miseEnEvidence('\\boldsymbol{<}', 'blue')}${texNombre(-b)}^2$.<br>
        On en déduit que $${texNombre(a)}^2 < (${texNombre(b)})^2$.`
        } else {
          texteCorr += `<br>Comme $${texNombre(a)}${miseEnEvidence('\\boldsymbol{>}', 'blue')}${texNombre(-b)}$, 
        alors  $${texNombre(a)}^2${miseEnEvidence('\\boldsymbol{>}', 'blue')}${texNombre(-b)}^2$.<br>
        On en déduit que $${texNombre(a)}^2 > (${texNombre(b)})^2$.`
        }

        break
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
