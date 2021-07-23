import { xcas, listeQuestionsToContenu, randint, combinaisonListes } from '../../modules/outils.js'
import Exercice from '../Exercice.js'

export const titre = 'Division de polynômes'

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculer le quotient Q(x) de la division de P(x) par D(x)'
  this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.typeExercice = 'XCas'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typesDeQuestionsDisponibles = ['type1'] 
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, polyn,texteCorr, a, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeDeQuestions[i]) { 
        case 'type1':
          a = randint(-5,5,0)
          polyn = `${xcas(`D:=x+${a}`)}` // Diviseur D(x)
          // P(x) = D(x) * 2 polynômes "ax+b" avec a=1 ou 2 et b entre -3 et 3 mais non nul
          polyn = `${xcas(`P:=simplify(D*product(randint(2)*x+(2*randint(1)-1)*randint(1,3),k,1,2)))`)}` 
          // Etapes de la division         
          polyn = `${xcas(`E1:=simplify(lcoeff(P)*x^2*D)`)}`
          polyn = `${xcas(`E2:=simplify(P-E1)`)}`
          polyn = `${xcas(`E3:=simplify(lcoeff(E2)*x^(degree(E2)-1)*D)`)}`   
          polyn = `${xcas(`E4:=simplify(E2-E3)`)}` 
          polyn = `${xcas(`E5:=simplify(lcoeff(E4)*D)`)}`   
          polyn = `${xcas(`E6:=simplify(E4-E5)`)}`    
          // Enoncé                    
          texte = `$P(x)=${xcas(`P`)} \\text{ par } D(x)=${xcas(`D`)}$`
          // Corrigé
          texteCorr = `$\\begin{array}{r|l} ${xcas(`P`)} & ${xcas(`D`)}\\\\`
          texteCorr += `\\underline{-(${xcas(`E1`)})} & \\overline{${xcas(`quo(P,D)`)}}\\\\`
          texteCorr += `${xcas(`E2`)} & \\\\`   
          texteCorr += `\\underline{-(${xcas(`E3`)})} & \\\\`  
          texteCorr += `${xcas(`E4`)} & \\\\`   
          texteCorr += `\\underline{-(${xcas(`E5`)})} & \\\\`  
          texteCorr += `${xcas(`E6`)} & \\end{array}$`                                 
          texteCorr += `<br>D'où $Q(x)=${xcas(`quo(P,D)`)}$` 
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
