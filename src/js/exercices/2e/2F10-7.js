import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, reduireAxPlusB, choice, numAlpha, ecritureAlgebrique, ecritureAlgebriqueSauf1 } from '../../modules/outils.js'
import { tableauDeVariation, courbe, repere } from '../../modules/2d.js'
export const dateDePublication = '01/10/2022'
export const titre = 'Dresser et utiliser le tableau de signes d\'une fonction affine en lien avec son sens de variation'

/**
* @author Gilles Mora
* 2F10-7
*/

export default function SignefonctionaffineVariation () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 2 // On complète le nb de questions
  this.nbCols = 1
  this.nbColsCorr = 1
  this.video = ''
  this.spacing = 1
  this.spacingCorr = 1
  this.sup = 1

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = []
    this.listeCorrections = []
    // let typesDeQuestionsDisponibles = []
    // typesDeQuestionsDisponibles = [1, 2]// On complète selon le nb de cas dans l'exo (switch)

    // const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    const nomF = [
        ['f'], ['g'], ['h'], ['u'],
        ['v'], ['w']
      ]
    for (let i = 0, a, b, nom, sol, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;) { // on rajoute les variables dont on a besoin
      // typesDeQuestions = listeTypeDeQuestions[i]
      if (this.sup === 1) {
        nom = choice(nomF)
        a = randint(1, 4) * choice([-1, 1])// coefficient a de la fonction affine
        b = randint(0, 4) * choice([-1, 1])// coefficient b de la fonction affine
sol=randint(1,5)
       
        texte = `Une fonction affine $${nom}$  définie sur $\\mathbb R$ est strictement croissante. De plus $${nom}(${sol})=0$.<br>
        ${numAlpha(0)} Dresser son tableau de signes sur $\\mathbb R$.<br>
        ${numAlpha(1)} La fonction affine $${nom}$ peut-elle être définie par  ${choice([true, false]) ? 'f(x)=' : 'f(x)'}.`
       
          texte += `$f(x)=${reduireAxPlusB(a, b)}$ .<br>`
          texteCorr = 'On reconnaît que $f$ est une fonction affine, de la forme $f(x)=ax+b$, '
          texteCorr += `avec $a=${a}~$ et $b=${b}$. <br>`
        

      }

      if (this.questionJamaisPosee(i, this.sup, a, b)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
}
