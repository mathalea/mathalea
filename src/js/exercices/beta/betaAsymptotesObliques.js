import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texFraction } from '../../modules/outils/arrayFractions.js'
import { xcas } from '../../modules/outils/xcas.js'
export const titre = 'Asymptote oblique'

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Montrez que la fonction $f$ admet une asymptote oblique en $+\\infty$ dont on donnera l\'équation et la position relative'
  this.nbQuestions = 2
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.typeExercice = 'XCas'
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1)
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typesDeQuestionsDisponibles = ['type1'] // On créé 3 types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, etape, signe, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeDeQuestions[i]) {
        case 'type1':
          etape = `${xcas('f:=(2*randint(0,1)-1) * randint(4) * x + randint(10) + (2*randint(0,1)-1) * randint(10) / randpoly(1)')}` // f
          // Numérateur, Dénominateur, Quotient, Reste
          etape = [
            'N:=numer(f)', 'D:=denom(f)', 'Q:=quo(N,D)', 'R:=rem(N,D)'
          ].forEach(e => `${xcas(e)}`)

          etape = `${xcas('P:=piecewise(numer(f-Q)>0,\'dessus\',\'dessous\')')}` // par le dessus ou le dessous
          signe = `${xcas('P')}`.includes('dessus') ? '+' : '-'
          // Etapes de la division
          etape = [
            'E1:=simplify(lcoeff(N)*x*D)',
            'E2:=simplify(N-E1)',
            'E3:=simplify(lcoeff(E2)*D)',
            'E4:=simplify(E2-E3)'
          ].forEach(e => `${xcas(e)}`)
          // Enoncé
          texte = `$f(x)=${texFraction(xcas('N'), xcas('D'))}$`
          // Corrigé
          texteCorr = `Cherchons un candidat pour être l'asymptote oblique en effectuant la division de $${xcas('N')}$ par $${xcas('D')}$ :`
          texteCorr += `<br>$\\begin{array}{r|l} ${xcas('N')} & ${xcas('D')}\\\\`
          texteCorr += `\\underline{-(${xcas('E1')})} & \\overline{${xcas('Q')}}\\\\`
          texteCorr += `${xcas('E2')} & \\\\`
          texteCorr += `\\underline{-(${xcas('E3')})} & \\\\`
          texteCorr += `${xcas('E4')} & \\end{array}$`
          texteCorr += `<br>On en déduit que $f(x)=${texFraction(xcas('N'), xcas('D'))}=${xcas('Q')}+${texFraction(xcas('R'), xcas('D'))}$`
          texteCorr += `<br>Vérifions que $D:y=${xcas('Q')}$ est asymptote oblique à la courbe de $f$ en $+\\infty$ :`
          texteCorr += `<br>$\\lim\\limits_{x\\to+\\infty}f(x)-(${xcas('Q')})=`
          texteCorr += `\\lim\\limits_{x\\to+\\infty}${xcas('normal(f-Q)')}=`
          texteCorr += `\\dfrac{${xcas('numer(f-Q)')}}{${xcas('limit(D,x,+inf)')}}=0^${signe}$`
          texteCorr += `<br>De plus la fonction $f$ se rapproche de l'asymptote $D$ par le $${xcas('P')}$.`
          break
        case 'type2':
          break
        case 'type3':
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3]
}

// python3 list-to-js.py pour faire apparaître l'exercice dans le menu
