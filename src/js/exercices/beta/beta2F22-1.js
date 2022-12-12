import Exercice from '../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { splineCatmullRom } from '../../modules/fonctionsMaths.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'

import { repere, texteParPosition, point, courbeSpline, droite, courbeInterpolee, antecedentParDichotomie, segment, courbe } from '../../modules/2d.js'
import { listeQuestionsToContenu, combinaisonListes, miseEnEvidence, stringNombre, prenom, prenomM, texPrix, texteGras, choice, sp, texNombre, randint, numAlpha } from '../../modules/outils.js'
import { exp } from 'mathjs'
export const titre = 'Résoudre une équation du type $f(x)=k$ graphiquement'

/**
 * Description didactique de l'exercice
 * @author Gilles Mora
 * Référence
*/
export default function ResoudreEquationsG () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  // this.nbQuestionsModifiable = false
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false
  this.tailleDiaporama = 2 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.spacing = 1.5 // Interligne des questions
  this.spacingCorr = 1 // Interligne des réponses
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['typeE1']
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['typeE1']
    } 
    //
    const listeTypeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      const nomF = [
        ['f'], ['g'], ['h'], ['u'],
        ['v'], ['w']
      ]
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'typeE1':// courbe1
          {
            const choix = choice(['a'])//,

            const cours = `Les solutions de l'équation $f(x)=k$ sont les abscisses des points d'intersection entre la courbe de $f$ et la droite d'équation $y=k$.<br>
`
            const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
            const A = point(0, 1)
            const Ax = point(A.x, 0)
            const sAAx = segment(A, Ax)

            sAAx.epaisseur = 2
            sAAx.pointilles = 5
            const r1 = repere({
              xMin: -6,
              yMin: -4,
              yMax: 4,
              xMax: 6,
              xUnite: 1,
              yUnite: 1,
              thickHauteur: 0.1,
              xLabelMin: -5,
              yLabelMin: -3,
              xLabelMax: 5,
              yLabelMax: 3,
              yThickDistance: 1,
              xThickDistance: 1,
              axeXStyle: '->',
              axeYStyle: '->',
              grilleYDistance: 0.5,
              grilleSecondaire: true,
              grilleSecondaireYDistance: 0.5,
              grilleSecondaireXDistance: 0.5,
              grilleSecondaireYMin: -4,
              grilleSecondaireYMax: 4,
              grilleSecondaireXMin: -6,
              grilleSecondaireXMax: 6

            })
            if (choice([true, false])) {
              const da1=droite(point(-5, 2), point(5, 2),'', 'blue')
              const da2= droite(point(-5, -2), point(5, -2),'', 'green')
              da1.epaisseur = 2
              da2.epaisseur = 2
              const A1 = point(-4, 2)
              const A1x = point(A1.x, 0)
              const sA1A1x = segment(A1, A1x,'blue')
              sA1A1x.epaisseur = 2
              sA1A1x.pointilles = 5
              const A2 = point(0, 2)
              const A2x = point(A2.x, 0)
              const sA2A2x = segment(A2, A2x,'blue')
              sA2A2x.epaisseur = 2
              sA2A2x.pointilles = 5
              const A3 = point(4, 2)
              const A3x = point(A3.x, 0)
              const sA3A3x = segment(A3, A3x,'blue')
              sA3A3x.epaisseur = 2
              sA3A3x.pointilles = 5
              const A4 = point(-2, -2)
              const A4x = point(A4.x, 0)
              const sA4A4x = segment(A4, A4x,'green')
              sA4A4x.epaisseur = 2
              sA4A4x.pointilles = 5
              const TexteY1 = texteParPosition('$y=2$', 6, 2.2, 'milieu', 'blue', 1.3)
              const TexteY2 = texteParPosition('$y=-2$', 6, -2.2, 'milieu', 'green', 1.3)
              const tabY = [3, 2, -1, -2, -1, 2, 3, 4, 3, 2, -1]
              const f1 = splineCatmullRom({ tabY, x0: -5, step: 1 }) // le tableau des ordonnées successives = tabY, x0 = -5, step = 1.
              const c1 = courbeSpline(f1, { repere: r1, step: 0.1, color: 'red', xMin: -5, xMax: 5 })
              const graphique1 = mathalea2d({
                xmin: -7,
                xmax: 7,
                ymin: -5,
                ymax: 5,
                pixelsParCm: 30,
                scale: 1,
                style: 'margin: auto'
              }
              , r1, o, c1)
              const graphiqueCorra = mathalea2d({
                xmin: -7,
                xmax: 7,
                ymin: -5,
                ymax: 5,
                pixelsParCm: 30,
                scale: 1,
                style: 'margin: auto'
              }
              , r1, o, c1, da1, da2, sA1A1x, sA2A2x, sA3A3x, sA4A4x, TexteY1, TexteY2)
              if (choix === 'a') {
                texte = `Résoudre graphiquement les équations :<br>
              $f(x)=2$${sp(5)};${sp(5)}$f(x)=-2$<br>

              `
                texte += `${graphique1}
              `
                texteCorr = `
              L'équation $f(x)=2$ a pour ensemble de solutions : $S=\\{-4\\,;\\,0\\,;\\,4\\}$.<br>
              L'équation $f(x)=-2$ a pour ensemble de solutions : $S=\\{-2\\}$.`
                if (this.correctionDetaillee) {

                  texteCorr = `${cours}
                $\\bullet$   Pour résoudre l'équation $f(x)=2$, on trace la droite d'équation $y=2$. <br>
                  Les solutions de l'équation sont les abscisses des points d'intersection de cette droite avec la courbe. <br>
                  Cette équation  a pour ensemble de solutions : $${miseEnEvidence('S=\\{-4\\,;\\,0\\,;\\,4\\}', 'blue')}$.<br>
                  $\\bullet$   Pour résoudre l'équation $f(x)=-2$, on trace la droite d'équation $y=-2$. <br>
                  Les solutions de l'équation sont les abscisses des points d'intersection de cette droite avec la courbe. <br>
                  Cette équation  a pour ensemble de solutions : $${miseEnEvidence('S=\\{-2\\}', 'green')}$.<br>
                ${graphiqueCorra}`
                }
              }
              if (choix === 'b') {
                texte = `Résoudre graphiquement les équations :<br>
                $f(x)=-1$${sp(5)};${sp(5)}$f(x)=4$<br>
  
                `
                texte += `${graphique1}
                `
                texteCorr = `L'équation $f(x)=-1$ a pour ensemble de solutions : $S=\\{-3\\,;\\,-1\\,;\\,5\\}$.<br>
                L'équation $f(x)=4$ a pour ensemble de solutions : $S=\\{2}$.`
                if (this.correctionDetaillee) {
                  texteCorr = 'avec detail'
                }
              }
              if (choix === 'c') {
                texte = `Résoudre graphiquement les équations :<br>
                  $f(x)=-3$${sp(5)};${sp(5)}$f(x)=3$<br>
    
                  `
                texte += `${graphique1}
                  `
                texteCorr = `L'équation $f(x)=-3$ a pour ensemble de solutions : $S=\\emptyset$.<br>
                  L'équation $f(x)=3$ a pour ensemble de solutions : $S=\\{-5\\,;\\,1\\,;\\,3\\}$.`
                if (this.correctionDetaillee) {
                  texteCorr = 'avec detail'
                }
              }
            } else {
              const tabY = [-3, -2, 1, 2, 1, -2, -3, -4, -3, -2, 1]
              const f1 = splineCatmullRom({ tabY, x0: -5, step: 1 }) // le tableau des ordonnées successives = tabY, x0 = -5, step = 1.
              const c1 = courbeSpline(f1, { repere: r1, step: 0.1, color: 'red', xMin: -5, xMax: 5 })
              const graphique1 = mathalea2d({
                xmin: -7,
                xmax: 7,
                ymin: -5,
                ymax: 5,
                pixelsParCm: 30,
                scale: 1,
                style: 'margin: auto'
              }
              , r1, o, c1)
              texte = `${graphique1}
              `
            }
          }
          break
      }
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
  this.besoinFormulaireNumerique = ['Choix des questions', 2, '1 : Avec des valeurs exactes\n2 : Avec des valeurs approchées']
}
