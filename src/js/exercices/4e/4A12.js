import Exercice from '../Exercice.js'
import { combinaisonListes, listeNombresPremiersStrictJusqua, listeQuestionsToContenu, nombreAvecEspace, randint, texteEnCouleurEtGras, personne, warnMessage } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
import { svgEngrenages } from '../../modules/macroSvgJs.js'
import { context } from '../../modules/context.js'

export const titre = 'Problèmes d\'évenements récurrents'

/**
 * Problèmes d'événements récurrents avec résolution à l'aide de décompositions en produits de facteurs premiers
 * @author Guillaume Valmont
 * Référence 4A12
 * 30/10/2021
*/
export default function ProblemesEvenementsRecurrents () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.sup = 1
  this.besoinFormulaireNumerique = ['Difficulté', 3, '1 : 1 facteur commun, 1 facteur spécifique\n2 : 2 facteurs communs, 1 facteur spécifique\n3 : 2 facteurs communs, 2 facteurs spécifiques']
  this.correctionDetailleeDisponible = true

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    const saveurs = combinaisonListes(['guirlande', 'voiture', 'fusée', 'restau-ciné', 'engrenages'], this.nbQuestions)
    for (let i = 0, texte, texteCorr, listePremiers, indicesFacteursCommuns, indicesFacteursA, indicesFacteursB, Commun, A, B, decompositionCommun, decompositionA, decompositionB, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (this.sup) {
        case 1:
          listePremiers = listeNombresPremiersStrictJusqua(20)
          indicesFacteursCommuns = [randint(0, 2)]
          indicesFacteursA = [randint(0, listePremiers.length - 1, [indicesFacteursCommuns[0]])]
          indicesFacteursB = [randint(0, listePremiers.length - 1, [indicesFacteursCommuns[0], indicesFacteursA[0]])]
          Commun = listePremiers[indicesFacteursCommuns[0]]
          A = listePremiers[indicesFacteursA[0]]
          B = listePremiers[indicesFacteursB[0]]
          break
        case 2:
          listePremiers = listeNombresPremiersStrictJusqua(20)
          indicesFacteursCommuns = [randint(0, 2), randint(0, 2)]
          indicesFacteursCommuns = indicesFacteursCommuns.sort()
          indicesFacteursA = [randint(3, listePremiers.length - 1, [indicesFacteursCommuns[0], indicesFacteursCommuns[1]])]
          indicesFacteursB = [randint(3, listePremiers.length - 1, [indicesFacteursCommuns[0], indicesFacteursCommuns[1], indicesFacteursA[0]])]
          Commun = listePremiers[indicesFacteursCommuns[0]] * listePremiers[indicesFacteursCommuns[1]]
          A = listePremiers[indicesFacteursA[0]]
          B = listePremiers[indicesFacteursB[0]]
          break
        case 3:
          listePremiers = listeNombresPremiersStrictJusqua(20)
          indicesFacteursCommuns = [randint(0, 2), randint(0, 2)]
          indicesFacteursCommuns = indicesFacteursCommuns.sort((a, b) => a - b)
          indicesFacteursA = [randint(0, 2), randint(3, listePremiers.length - 1, [indicesFacteursCommuns[0], indicesFacteursCommuns[1]])]
          indicesFacteursB = [randint(0, 2, [indicesFacteursA[0], indicesFacteursA[1]]), randint(3, listePremiers.length - 1, [indicesFacteursCommuns[0], indicesFacteursCommuns[1], indicesFacteursA[0], indicesFacteursA[1]])]
          Commun = listePremiers[indicesFacteursCommuns[0]] * listePremiers[indicesFacteursCommuns[1]]
          A = listePremiers[indicesFacteursA[0]] * listePremiers[indicesFacteursA[1]]
          B = listePremiers[indicesFacteursB[0]] * listePremiers[indicesFacteursB[1]]
          break
        default: // identique au cas 1
          listePremiers = listeNombresPremiersStrictJusqua(20)
          indicesFacteursCommuns = [randint(0, 2)]
          indicesFacteursA = [randint(0, listePremiers.length - 1, [indicesFacteursCommuns[0]])]
          indicesFacteursB = [randint(0, listePremiers.length - 1, [indicesFacteursCommuns[0], indicesFacteursA[0]])]
          Commun = listePremiers[indicesFacteursCommuns[0]]
          A = listePremiers[indicesFacteursA[0]]
          B = listePremiers[indicesFacteursB[0]]
          break
      }
      let unite, phenomene1, phenomene2, texte1, texte2, texte3, texte4, cycles
      saveurs[i] = 'engrenages'
      const Robert = personne()
      switch (saveurs[i]) {
        case 'guirlande':
          texte = `Une guirlande électrique est constituée de lumières rouges et vertes.<br>
          les lumières rouges s’allument toutes les ${nombreAvecEspace(Commun * A)} secondes et les vertes toutes les ${nombreAvecEspace(Commun * B)} secondes.<br>
          À un instant donné, on voit les lumières rouges et vertes allumées en même temps.<br>
          Au bout de combien de temps ce phénomène se reproduira-t-il une nouvelle fois ?`
          unite = 'secondes'
          phenomene1 = 'les lumières rouges'
          phenomene2 = 'les lumières vertes'
          texte1 = 'Les lumières rouges seront allumées'
          texte2 = 'les lumières vertes'
          texte3 = 'Les lumières rouges et vertes seront allumées en même temps'
          texte4 = 'le temps nécessaire pour qu\'elle se rallument la première fois simultanément'
          cycles = ' cycles'
          break
        case 'voiture':
          texte = `Pour l'entretien de sa voiture, ${Robert.prenom} veut se tenir à un calendrier très précis :<br>
          ${Robert.pronom} nettoie l'intérieur de sa voiture tous les ${nombreAvecEspace(Commun * A)} jours et l'extérieur tous les ${nombreAvecEspace(Commun * B)} jours.<br>
          Aujourd'hui, ${Robert.pronom} a fait les deux.<br>
          Au bout de combien de temps fera-t-${Robert.pronom} les deux dans la même journée ?`
          unite = 'jours'
          phenomene1 = 'le nettoyage intérieur'
          phenomene2 = 'le nettoyage extérieur'
          texte1 = 'L\'intérieur sera nettoyé'
          texte2 = 'l\'extérieur'
          texte3 = 'Les nettoyages intérieur et extérieur auront lieu le même jour'
          texte4 = 'le nombre de jours avant un nettoyage intérieur et extérieur'
          cycles = ' nettoyages'
          break
        case 'fusée':
          texte = `Pour l'entretien de sa fusée, ${Robert.prenom} doit se tenir à un calendrier très précis :<br>
          ${Robert.pronom} remplace la coiffe tous les ${nombreAvecEspace(Commun * A)} jours et les boosters tous les ${nombreAvecEspace(Commun * B)} jours.<br>
          Aujourd'hui, ${Robert.pronom} a fait les deux.<br>
          Au bout de combien de temps fera-t-${Robert.pronom} les deux dans la même journée ?`
          unite = 'jours'
          phenomene1 = 'le remplacement de la coiffe'
          phenomene2 = 'le remplacement des boosters'
          texte1 = 'La coiffe sera remplacée'
          texte2 = 'les boosters'
          texte3 = 'Le remplacement de la coiffe et des boosters auront lieu le même jour'
          texte4 = 'le nombre de jours avant le remplacement de la coiffe et des boosters'
          cycles = ' remplacements'
          break
        case 'restau-ciné':
          texte = `Pour sa résolution de cette année, ${Robert.prenom} a décidé de ne pas abuser des bonnes choses :<br>
          ${Robert.Pronom} s'accorde le droit d'aller au restaurant tous les ${nombreAvecEspace(Commun * A)} jours et d'aller au cinéma tous les ${nombreAvecEspace(Commun * B)} jours.<br>
          Aujourd'hui, ${Robert.pronom} s'est fait un « restau - ciné ».<br>
          Au bout de combien de temps s'en fera-t-${Robert.pronom} un autre ?`
          unite = 'jours'
          phenomene1 = 'aller au restaurant'
          phenomene2 = 'aller au cinéma'
          texte1 = `${Robert.Pronom} va au restaurant`
          texte2 = 'au cinéma'
          texte3 = `${Robert.pronom} se fera à nouveau un « restau - ciné »`
          texte4 = 'le nombre de jours avant le prochain « restau - ciné »'
          cycles = ' sorties'
          break
        case 'engrenages':
          if (context.isHtml) {
            // eslint-disable-next-line no-var
            var pourcentage = '100%'
            let txtIntro = ''
            const idUnique = `${numeroExercice}_${Date.now()}`
            const idDivIntro = `divIntro${idUnique}`
            txtIntro += warnMessage('Attention, les roues ci-dessous ne comportent pas le nombre de dents de l\'énoncé!', 'nombres', 'Coup de pouce')
            txtIntro += `<div id="${idDivIntro}" style="width: ${pourcentage}; height: 50px; display : table "></div>`
            svgEngrenages(idDivIntro, 200, 200)
            this.introduction = txtIntro
          }
          texte = `Une première roue possède ${nombreAvecEspace(Commun * A)} dents et une seconde en possède ${nombreAvecEspace(Commun * B)}.<br>
          Elles tournent jusqu'à revenir (pour la première fois) en position initiale<br>
          De combien de dents chaque roue aura tourné ?
          Combien de tours aura effectué chaque roue ?`
          unite = 'dents'
          phenomene1 = 'la première roue'
          phenomene2 = 'la deuxième roue'
          texte1 = 'La première fera un tour'
          texte2 = 'la seconde'
          texte3 = 'Elles reviendront en position initiale'
          texte4 = 'le nombre de dents avant de revenir pour la première fois en position initiale'
          cycles = ' tours'
          break
        default:
          break
      }
      switch (this.sup) {
        case 1:
          decompositionCommun = texteEnCouleurEtGras(nombreAvecEspace(Commun), 'blue')
          decompositionA = texteEnCouleurEtGras(nombreAvecEspace(A), 'red')
          decompositionB = texteEnCouleurEtGras(nombreAvecEspace(B), 'green')
          break
        case 2:
          decompositionCommun = `${texteEnCouleurEtGras(nombreAvecEspace(listePremiers[indicesFacteursCommuns[0]]), 'blue')} $\\times$ ${texteEnCouleurEtGras(nombreAvecEspace(listePremiers[indicesFacteursCommuns[1]]), 'blue')}`
          decompositionA = texteEnCouleurEtGras(nombreAvecEspace(A), 'red')
          decompositionB = texteEnCouleurEtGras(nombreAvecEspace(B), 'green')
          break
        case 3:
          decompositionCommun = `${texteEnCouleurEtGras(nombreAvecEspace(listePremiers[indicesFacteursCommuns[0]]), 'blue')} $\\times$ ${texteEnCouleurEtGras(nombreAvecEspace(listePremiers[indicesFacteursCommuns[1]]), 'blue')}`
          decompositionA = `${texteEnCouleurEtGras(nombreAvecEspace(listePremiers[indicesFacteursA[0]]), 'red')} $\\times$ ${texteEnCouleurEtGras(nombreAvecEspace(listePremiers[indicesFacteursA[1]]), 'red')}`
          decompositionB = `${texteEnCouleurEtGras(nombreAvecEspace(listePremiers[indicesFacteursB[0]]), 'green')} $\\times$ ${texteEnCouleurEtGras(nombreAvecEspace(listePremiers[indicesFacteursB[1]]), 'green')}`
          break

        default:
          decompositionCommun = texteEnCouleurEtGras(nombreAvecEspace(Commun), 'blue')
          decompositionA = texteEnCouleurEtGras(nombreAvecEspace(A), 'red')
          decompositionB = texteEnCouleurEtGras(nombreAvecEspace(B), 'green')
          break
      }
      texteCorr = ''
      if (this.correctionDetaillee) {
        texteCorr += `${texte1} à chaque multiple de ${texteEnCouleurEtGras(nombreAvecEspace(Commun * A), 'red')} ${unite}, ${texte2} à chaque multiple de ${texteEnCouleurEtGras(nombreAvecEspace(Commun * B), 'green')} ${unite}.<br>
        ${texte3} à chaque multiple commun de ${texteEnCouleurEtGras(nombreAvecEspace(Commun * A), 'red')} et de ${texteEnCouleurEtGras(nombreAvecEspace(Commun * B), 'green')}.<br>
        Pour trouver ${texte4}, on cherche le plus petit multiple qu'ils ont en commun.<br>
        Un moyen d'y arriver est de décomposer les nombres de ${unite} en produits de facteurs premiers et d'identifier les différences entre les décompositions :<br>`
      }
      if (this.sup === 3) {
        console.log(indicesFacteursCommuns[1])
        if (indicesFacteursA[0] >= indicesFacteursCommuns[1]) {
          texteCorr += `${texteEnCouleurEtGras(nombreAvecEspace(Commun * A), 'red')} = ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[0]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[1]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursA[0]], 'red')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursA[1]], 'red')} <br>`
        } else if (indicesFacteursA[0] >= indicesFacteursCommuns[0] && indicesFacteursA[0] < indicesFacteursCommuns[1]) {
          texteCorr += `${texteEnCouleurEtGras(nombreAvecEspace(Commun * A), 'red')} = ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[0]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursA[0]], 'red')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[1]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursA[1]], 'red')} <br>`
        } else if (indicesFacteursA[0] < indicesFacteursCommuns[0]) {
          texteCorr += `${texteEnCouleurEtGras(nombreAvecEspace(Commun * A), 'red')} = ${texteEnCouleurEtGras(listePremiers[indicesFacteursA[0]], 'red')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[0]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[1]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursA[1]], 'red')} <br>`
        }
        if (indicesFacteursB[0] >= indicesFacteursCommuns[1]) {
          texteCorr += `${texteEnCouleurEtGras(nombreAvecEspace(Commun * B), 'green')} = ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[0]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[1]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursB[0]], 'green')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursB[1]], 'green')} <br>`
        } else if (indicesFacteursB[0] >= indicesFacteursCommuns[0] && indicesFacteursB[0] < indicesFacteursCommuns[1]) {
          texteCorr += `${texteEnCouleurEtGras(nombreAvecEspace(Commun * B), 'green')} = ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[0]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursB[0]], 'green')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[1]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursB[1]], 'green')} <br>`
        } else if (indicesFacteursB[0] < indicesFacteursCommuns[0]) {
          texteCorr += `${texteEnCouleurEtGras(nombreAvecEspace(Commun * B), 'green')} = ${texteEnCouleurEtGras(listePremiers[indicesFacteursB[0]], 'green')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[0]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursCommuns[1]], 'blue')} $\\times$ ${texteEnCouleurEtGras(listePremiers[indicesFacteursB[1]], 'green')} <br>`
        }
      } else {
        texteCorr += `${texteEnCouleurEtGras(nombreAvecEspace(Commun * A), 'red')} = ${decompositionCommun} $\\times$ ${decompositionA} <br>
        ${texteEnCouleurEtGras(nombreAvecEspace(Commun * B), 'green')} = ${decompositionCommun} $\\times$ ${decompositionB}<br>`
      }
      if (this.correctionDetaillee) {
        texteCorr += 'On multiplie les facteurs communs aux deux décompositions avec les facteurs spécifiques à chaque décomposition :<br>'
      }
      texteCorr += `${decompositionCommun} $\\times$ ${decompositionA} $\\times$ ${decompositionB} = ${nombreAvecEspace(Commun * A * B)}<br>
      Ce phénomène se produira à nouveau au bout de ${nombreAvecEspace(Commun * A * B)} ${unite}.<br>
      (Après ${texteEnCouleurEtGras(nombreAvecEspace(B) + cycles, 'green')} pour ${texteEnCouleurEtGras(phenomene1, 'red')} et après ${texteEnCouleurEtGras(nombreAvecEspace(A) + cycles, 'red')} pour ${texteEnCouleurEtGras(phenomene2, 'green')})<br>`
      if (this.correctionDetaillee) {
        texteCorr += `${nombreAvecEspace(Commun * A * B)} est bien un multiple de ${texteEnCouleurEtGras(nombreAvecEspace(Commun * A), 'red')} car :
         ${decompositionCommun} $\\times$ ${decompositionA} $\\times$ ${decompositionB} =
         (${decompositionCommun} $\\times$ ${decompositionA}) $\\times$ ${decompositionB} =
         ${texteEnCouleurEtGras(nombreAvecEspace(Commun * A), 'red')} $\\times$ ${texteEnCouleurEtGras(nombreAvecEspace(B), 'green')}<br>
        ${nombreAvecEspace(Commun * A * B)} est bien un multiple de ${texteEnCouleurEtGras(nombreAvecEspace(Commun * B), 'green')} car :
         ${decompositionCommun} $\\times$ ${decompositionA} $\\times$ ${decompositionB} =
         ${decompositionCommun} $\\times$ ${decompositionB} $\\times$ ${decompositionA} =
         (${decompositionCommun} $\\times$ ${decompositionB}) $\\times$ ${decompositionA} =
         ${texteEnCouleurEtGras(nombreAvecEspace(Commun * B), 'green')} $\\times$ ${texteEnCouleurEtGras(nombreAvecEspace(A), 'red')}<br>`
      }
      setReponse(this, i, 9)
      if (this.interactif) texte += ajouteChampTexte(this, i)
      if (this.questionJamaisPosee(Commun, A, B)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
