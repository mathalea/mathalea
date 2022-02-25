import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureParentheseSiNegatif, extraireRacineCarree, texRacineCarree, texNombre } from '../../modules/outils.js'

export const titre = 'Utiliser la distance entre deux points dans un repère orthonormé'

/**
 * 2G12-1
 * @author Stéphane Guyon
 */
export default function Distance () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre

  this.nbQuestions = 2
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //

  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles = [1, 2, 3, 4, 5]; let typesDeQuestions
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1]
    }
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2, 3, 4, 5]
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, ux, uy, xA, yA, xB, yB, xC, yC, AB, XAB, YAB, XAC, YAC, AC, XBC, YBC, BC, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1:

          xA = randint(0, 5) * choice([-1, 1])
          yA = randint(0, 5) * choice([-1, 1])
          xB = randint(0, 5) * choice([-1, 1])
          yB = randint(0, 5) * choice([-1, 1])
          if (xB === xA && yA === yB) { xB = xB + randint(1, 5) * choice([-1, 1]) }
          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA)
          AB = XAB + YAB

          texte = 'Dans un repère orthonormé $(O,I,J)$, on donne les points suivants :'
          texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`
          texte += '<br>Calculer la distance $AB$ en justifiant le calcul.'

          texteCorr = 'On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère orthonormé,'
          texteCorr += ' alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>'
          texteCorr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yB}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${texNombre(XAB + YAB)}}$<br>`
          if (extraireRacineCarree(AB)[0] !== 1) { texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AB=${texRacineCarree(AB)}$<br>` }
          break
        case 2:

          xA = randint(0, 5) * choice([-1, 1])
          yA = randint(0, 9) * choice([-1, 1])
          ux = randint(0, 9) * choice([-1, 1])
          uy = randint(0, 9) * choice([-1, 1])
          xB = xA + ux
          yB = yA + uy
          xC = xA + uy * choice([-1, 1])
          yC = yA + ux * choice([-1, 1])

          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA)
          AB = XAB + YAB
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          AC = XAC + YAC

          texte = 'Dans un repère orthonormé (O,I,J), on donne les points suivants :'
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right)$`
          texte += `<br>Le point $C\\left(${xC};${yC}\\right)$ appartient-il au cercle de centre $A$ passant par $B$ ?`

          texteCorr = 'Le point $C$ appartient au cercle de centre $A$ passant par $B$ si et seulement si $CA=CB.$'
          texteCorr += '<br>On calcule séparément donc ces deux distances :'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère orthonormé,'
          texteCorr += ' alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}$<br>'
          texteCorr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yB}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${texNombre(XAB + YAB)}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AB=${texRacineCarree(AB)}$<br>`
          texteCorr += `De même : $AC=\\sqrt{\\left(${xC}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
          texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${texNombre(XAC + YAC)}}$<br>`
          if (extraireRacineCarree(AC)[0] !== 1) { texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AC=${texRacineCarree(AC)}$<br>` }
          texteCorr += 'On observe que $AC=AB$ donc le point $A$ est équidistant de $B$ et $C$.'
          texteCorr += '<br>Le point $C$ appartient bien au cercle de centre $A$ et passant par $B$.'
          break
        case 3:

          xA = randint(0, 5) * choice([-1, 1])
          yA = randint(0, 9) * choice([-1, 1])
          ux = randint(0, 9) * choice([-1, 1])
          uy = randint(0, 9) * choice([-1, 1])
          xB = xA + ux
          yB = yA + uy
          xC = xA + uy * choice([-1, 1]) + randint(1, 3)
          yC = yA + ux * choice([-1, 1])

          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA)
          AB = XAB + YAB
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          AC = XAC + YAC

          texte = 'Dans un repère orthonormé (O,I,J), on donne les points suivants :'
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
          texte += `<br>Le point $C\\left(${xC};${yC}\\right)$ appartient-il au cercle de centre $A$ et passant par $B$ ?`

          texteCorr = 'Le point $C$ appartient au cercle de centre $A$ et passant par $B$ si et seulement si $CA=CB.$'
          texteCorr += '<br>On calcule séparément donc ces deux distances :'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère orthonormé,'
          texteCorr += ' alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>'
          texteCorr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yB}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${texNombre(XAB + YAB)}}$<br>`
          if (extraireRacineCarree(AB)[0] !== 1) { texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AB=${texRacineCarree(AB)}$<br>` }
          texteCorr += `De même : $AC=\\sqrt{\\left(${xC}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
          texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${texNombre(XAC + YAC)}}$<br>`
          if (extraireRacineCarree(AC)[0] !== 1) { texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AC=${texRacineCarree(AC)}$<br>` }
          texteCorr += 'On observe que $AC\\neq AB$ donc le point $C$ n\'appartient pas au cercle de centre $A$ et passant par $B$'
          break
        case 4:

          xC = randint(0, 5) * choice([-1, 1])// coordonnées du point A
          yC = randint(0, 9) * choice([-1, 1])// coordonnées du point A
          ux = randint(0, 9) * choice([-1, 1])
          uy = randint(0, 9) * choice([-1, 1])
          xB = xC + ux
          yB = yC + uy
          xA = xC + uy * choice([-1, 1])
          yA = yC + ux * choice([-1, 1])

          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA)
          AB = XAB + YAB
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          AC = XAC + YAC

          XBC = (xC - xB) * (xC - xB)
          YBC = (yC - yB) * (yC - yB)
          BC = XBC + YBC

          texte = 'Dans un repère orthonormé (O,I,J), on donne les points suivants :'
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right)$`
          texte += `<br>Le point $C\\left(${xC};${yC}\\right)$ appartient-il à la médiatrice du segment $[AB]$ ?`

          texteCorr = 'Le point $C$ appartient à la médiatrice du segment $[AB]$ si et seulement si $CA=CB.$'
          texteCorr += '<br>On calcule séparément donc ces deux distances :'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère orthonormé,'
          texteCorr += ' alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}$<br>'
          texteCorr += `On applique la relation à l'énoncé : $BC=\\sqrt{\\left(${xC}-${ecritureParentheseSiNegatif(xB)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yB)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :        } BC=\\sqrt{${XBC}+${YBC}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :        } BC=\\sqrt{${texNombre(XBC + YBC)}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :   } BC=${texRacineCarree(BC)}$<br>`
          texteCorr += `De même : $AC=\\sqrt{\\left(${xC}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
          texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${texNombre(XAC + YAC)}}$<br>`
          if (extraireRacineCarree(AC)[0] !== 1) { texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AC=${texRacineCarree(AC)}$<br>` }
          texteCorr += 'On observe que $AC=BC$ donc le point $C$ est équidistant de $A$ et $B$.'
          texteCorr += '<br>Le point $C$ appartient bien à la médiatrice du segment $[AB]$.'
          break
        case 5:

          xA = randint(0, 5) * choice([-1, 1])
          yA = randint(0, 9) * choice([-1, 1])
          ux = randint(0, 9) * choice([-1, 1])
          uy = randint(0, 9) * choice([-1, 1])
          xB = xA + ux
          yB = yA + uy
          xC = xA + uy * choice([-1, 1]) + randint(1, 3)
          yC = yA + ux * choice([-1, 1])

          XAB = (xB - xA) * (xB - xA)
          YAB = (yB - yA) * (yB - yA)
          AB = XAB + YAB
          XAC = (xC - xA) * (xC - xA)
          YAC = (yC - yA) * (yC - yA)
          AC = XAC + YAC

          texte = 'Dans un repère orthonormé (O,I,J), on donne les points suivants :'
          texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right).$`
          texte += `<br>Le point $C\\left(${xC};${yC}\\right)$ appartient-il à la médiatrice du segment $[AB]$ ?`

          texteCorr = 'Le point $C$ appartient à la médiatrice du segment $[AB]$ si et seulement si $CA=CB.$'
          texteCorr += '<br>On calcule séparément donc ces deux distances :'
          texteCorr += '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère orthonormé,'
          texteCorr += ' alors on a : $AB=\\sqrt{\\left(x_B-x_A\\right)^{2}+\\left(y_B-y_A\\right)^{2}}.$<br>'
          texteCorr += `On applique la relation à l'énoncé : $AB=\\sqrt{\\left(${xB}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yB}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${XAB}+${YAB}}$<br>`
          texteCorr += `$\\phantom{on applique la relation a l'enonce :        } AB=\\sqrt{${texNombre(XAB + YAB)}}$<br>`
          if (extraireRacineCarree(AB)[0] !== 1) { texteCorr += `$\\phantom{on applique la relation a l'enonce :   } AB=${texRacineCarree(AB)}$<br>` }
          texteCorr += `De même : $AC=\\sqrt{\\left(${xC}-${ecritureParentheseSiNegatif(xA)}\\right)^{2}+\\left(${yC}-${ecritureParentheseSiNegatif(yA)}\\right)^{2}}$<br>`
          texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${XAC}+${YAC}}$<br>`
          texteCorr += `$\\phantom{De même :       } AC=\\sqrt{${texNombre(XAC + YAC)}}$<br>`
          if (extraireRacineCarree(AC)[0] !== 1) { texteCorr += `$\\phantom{De même :       } AC=${texRacineCarree(AC)}$<br>` }
          texteCorr += 'On observe que $AC\\neq AB$ donc le point $C$ n\'appartient pas à la médiatrice du segment $[AB]$'
          break
      }
      if (this.questionJamaisPosee(i, xA, yA, xB, yB, typesDeQuestions)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Application directe de la formule 2 : Application en situation']
}
