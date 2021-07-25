import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texFraction, texFractionReduite, pgcd, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import { droiteVerticaleParPoint } from '../../modules/2d.js'
export const titre = 'Alignement de 3 points.'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  // this.consigne = 'Déterminer si les points donnés ci-dessous, sont ou non, alignés. <br> <i>On demande une démonstration en lien avec les équations de droites</i>'
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['non', 'oui'] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, xA, yA, xB, yB, xC, yC, n1, d1, n2, d2, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'non':
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          xB = randint(-5, 5, xA)
          yB = randint(-5, 5)
          xC = randint(-5, 5, xA)
          yC = randint(-5, 5)
          n1 = yB - yA
          d1 = xB - xA
          n2 = yC - yA
          d2 = xC - xA
          if (n1 * d2 === n2 * d1) { // on évite le cas de l'alignement
            yA = yA + 1
          }
          texte = ` $A(${xA};${yA})$ ; $B(${xB};${yB})$ et $C(${xC};${yC})$.`
          texteCorr = 'Pour déterminer si les points $A$, $B$, et $C$ sont alignés, on va étudier les positions relatives des droites $(AB)$ et $(AC)$'
          texteCorr += '<br>On observe déjà que les 3 abscisses sont distinctes. Ni la droite $(AB)$, ni la droite $(AC)$ n\'est verticale.'
          texteCorr += '<br>On peut donc calculer leur coefficient directeur respectif.'
          texteCorr += '<br>On sait d\'après le cours, que le coefficient directeur de la droite $(AB)$, si $x_A\\neq x_B$ est  : $m=\\dfrac{y_B-y_A}{x_B-x_A}$.'
          texteCorr += '<br>On applique avec les données de l\'énoncé pour chacune des deux droites : '
          texteCorr += `<br>$(AB)$ : $m_1=\\dfrac{${yB}-${ecritureParentheseSiNegatif(yA)}}{${xB}-${ecritureParentheseSiNegatif(xA)}}=${texFraction(n1, d1)}`
          if ((pgcd(n1, d1) !== 1 || d1 === 1 || d1 < 0) && n1 !== 0) {
            texteCorr += `=${texFractionReduite(n1, d1)}`
          }
          texteCorr += '$'
          texteCorr += `et $(AC)$ : $m_1=\\dfrac{${yC}-${ecritureParentheseSiNegatif(yA)}}{${xC}-${ecritureParentheseSiNegatif(xA)}}=${texFraction(n2, d2)}`
          if ((pgcd(n2, d2) !== 1 || d2 === 1 || d2 < 0) && n2 !== 0) {
            texteCorr += `=${texFractionReduite(n2, d2)}`
          }
          texteCorr += '$'
          texteCorr = +'<br>On onserve que $m_1 \\neq m_2$. '
          texteCorr = +'<br>Les droites $(AB)$ et $(AC)$ ne sont donc pas parallèles. '
          texteCorr = +'<br>Les points $A$, $B$ et $C$ ne sont pas alignés. '
          setReponse(this, i, 'non')

          break
        case 'oui':
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          xB = randint(-5, 5, xA)
          yB = randint(-5, 5)
          xC = randint(-5, 5, xA)
          yC = randint(-5, 5)
          n1 = yB - yA
          d1 = xB - xA
          n2 = yC - yA
          d2 = xC - xA
          if (n1 * d2 === n2 * d1) { // on évite le cas de l'alignement
            yA = yA + 1
          }
          texte = ` $A(${xA};${yA})$ ; $B(${xB};${yB})$ et $C(${xC};${yC})$.`
          texteCorr = 'Pour déterminer si les points $A$, $B$, et $C$ sont alignés, on va étudier les positions relatives des droites $(AB)$ et $(AC)$'
          texteCorr += '<br>On observe déjà que les 3 abscisses sont distinctes. Ni la droite $(AB)$, ni la droite $(AC)$ n\'est verticale.'
          texteCorr += '<br>On peut donc calculer leur coefficient directeur respectif.'
          texteCorr += '<br>On sait d\'après le cours, que le coefficient directeur de la droite $(AB)$, si $x_A\\neq x_B$ est  : $m=\\dfrac{y_B-y_A}{x_B-x_A}$.'
          texteCorr += '<br>On applique avec les données de l\'énoncé pour chacune des deux droites : '
          texteCorr += `<br>$(AB)$ : $m_1=\\dfrac{${yB}-${ecritureParentheseSiNegatif(yA)}}{${xB}-${ecritureParentheseSiNegatif(xA)}}=${texFraction(n1, d1)}`
          if ((pgcd(n1, d1) !== 1 || d1 === 1 || d1 < 0) && n1 !== 0) {
            texteCorr += `=${texFractionReduite(n1, d1)}`
          }
          texteCorr += '$'
          texteCorr += `et $(AC)$ : $m_1=\\dfrac{${yC}-${ecritureParentheseSiNegatif(yA)}}{${xC}-${ecritureParentheseSiNegatif(xA)}}=${texFraction(n2, d2)}`
          if ((pgcd(n2, d2) !== 1 || d2 === 1 || d2 < 0) && n2 !== 0) {
            texteCorr += `=${texFractionReduite(n2, d2)}`
          }
          texteCorr += '$'
          texteCorr = +'<br>On onserve que $m_1 \\neq m_2$. '
          texteCorr = +'<br>Les droites $(AB)$ et $(AC)$ ne sont donc pas parallèles. '
          texteCorr = +'<br>Les points $A$, $B$ et $C$ ne sont pas alignés. '
          setReponse(this, i, 'non')

          break
      }
      if (!this.interactif) {
        this.consigne = 'Soit $\\big(O,\\vec i;\\vec j\\big)$ un repère orthogonal.  Déterminer si les 3 points $A$, $B$ et $C$ suivants sont ou non alignés. <br> On demande une démonstration en lien avec les équations de droites. </i>.'
      } else {
        this.consigne = 'Soit $\\big(O,\\vec i;\\vec j\\big)$ un repère orthogonal.  Déterminer si les 3 points $A$, $B$ et $C$ suivants sont ou non alignés. <br> Ecrire "oui" ou "non" dans le champs réponse.'
      }
      texte += ajouteChampTexteMathLive(this, i)
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
