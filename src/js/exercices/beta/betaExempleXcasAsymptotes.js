import { xcas, listeQuestionsToContenu, randint, combinaisonListes } from '../../modules/outils.js'
import Exercice from '../Exercice.js'

export const titre = 'Recherche d\'une asymptote oblique'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Montrez que la fonction $f$ admet une asymptote oblique en $+\\infty$ dont on donnera l\'équation et la position relative'
  this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.typeExercice = 'XCas'
  this.spacingCorr = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typesDeQuestionsDisponibles = ['type1'] // On créé 3 types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, polyn,signe,texteCorr, a, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeDeQuestions[i]) { 
        case 'type1':
          a = randint(-5,5,0)

          polyn = `${xcas(`f:=(2*randint(0,1)-1) * randint(4) * x + randint(10) + (2*randint(0,1)-1) * randint(10) / randpoly(1)`)}` // f      
          polyn = `${xcas(`N:=numer(f)`)}` // Numérateur
          polyn = `${xcas(`D:=denom(f)`)}` // Dénominateur*/
          polyn = `${xcas(`Q:=quo(N,D)`)}` // Quotient
          polyn = `${xcas(`R:=rem(N,D)`)}` // Reste 
          polyn = `${xcas(`P:=piecewise(numer(f-Q)>0,'dessus','dessous')`)}` // par le dessus ou le dessous
          signe = `${xcas(`P`)}`.includes('dessus') ? '+' : '-'
          // Etapes de la division         
          polyn = `${xcas(`E1:=simplify(lcoeff(N)*x*D)`)}`
          polyn = `${xcas(`E2:=simplify(N-E1)`)}`
          polyn = `${xcas(`E3:=simplify(lcoeff(E2)*D)`)}`   
          polyn = `${xcas(`E4:=simplify(E2-E3)`)}` 
  
          // Enoncé                    
          texte = `$f(x)=${xcas(`simplify(f)`)}$`
          // Corrigé
          texteCorr = `Cherchons un candidat pour être l'asymptote oblique en effectuant la division de $${xcas(`N`)}$ par $${xcas(`D`)}$ :`
          texteCorr += `<br>$\\begin{array}{r|l} ${xcas(`N`)} & ${xcas(`D`)}\\\\`
          texteCorr += `\\underline{-(${xcas(`E1`)})} & \\overline{${xcas(`Q`)}}\\\\`
          texteCorr += `${xcas(`E2`)} & \\\\`   
          texteCorr += `\\underline{-(${xcas(`E3`)})} & \\\\`  
          texteCorr += `${xcas(`E4`)} & \\end{array}$`
          texteCorr += `<br>On en déduit que $f(x)=${xcas(`normal(f)`)}=${xcas(`partfrac(f)`)}$` 
          texteCorr += `<br>Vérifions que $D:y=${xcas(`Q`)}$ est asymptote oblique à la courbe de $f$ en $+\\infty$ :`    
          texteCorr += `<br>$\\lim\\limits_{x\\to+\\infty}f(x)-(${xcas(`Q`)})=`
          texteCorr += `\\lim\\limits_{x\\to+\\infty}${xcas(`normal(f-Q)`)}=`
          texteCorr += `\\dfrac{${xcas(`numer(f-Q)`)}}{${xcas(`limit(D,x,+inf)`)}}=0^${signe}$`
          texteCorr += `<br>De plus la fonction $f$ se rapproche de l'asymptote $D$ par le $${xcas(`P`)}$.`
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3]
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu
