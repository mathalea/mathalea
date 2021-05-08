import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, calcul, randint, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../modules/outils.js'
export const titre = 'Déterminer une fonction affine'

/**
 * Description didactique de l'exercice
 * @Auteur
 * Référence
*/
export default function DeterminerFonctionAffine () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  // this.sup = 1
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    Exercice.call(this)
    this.titre = titre
    this.nbQuestions = 4 // Ici le nombre de questions
    this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
    this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const typeDeQuestionsDisponibles = [0, 1, 2] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, x1, x2, y1, y2, a, b, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.

      switch (listeTypeDeQuestions[i]) {
        case 0: // fonction constante
          a = 0
          b = randint(-10, 10, 0)
          x1 = randint(-5, -1)
          x2 = randint(1, 5)
          y1 = b
          y2 = b
          texteCorr = `On remarque que $f(${x1})=f(${x2})=${b}$ donc la droite représentant la fonction $f$ passe par deux points distincts ayant la même ordonnée.<br>`
          texteCorr += `Elle est donc parallèle à l'axe des abscisses. La fonction $f$ est une fonction constante et $f(x)=${b}$.`
          break

        case 1: // f(0)=y1 f(x2)= y2 a et b entiers relatifs.
          a = randint(-5, 5, 0)
          b = randint(-5, 5, 0)
          x1 = 0
          y1 = b
          x2 = randint(-5, 5, 0)
          y2 = calcul(b + a * x2)
          texteCorr = `Soit $f(x)=ax+b$. Nous savons que $f(0)=${y1}=b$.<br>`
          texteCorr += `Donc $f(x)=ax${ecritureAlgebrique(y1)}$. En utilisant la donnée $f(${x2})=${y2}$ on obtient : $a \\times ${ecritureParentheseSiNegatif(x2)}${ecritureAlgebrique(b)}=${y2}$ d'où $a \\times ${ecritureParentheseSiNegatif(x2)}=${y2}${ecritureAlgebrique(-b)}=${y2 - b}$ donc $a=\\dfrac{${y2 - b}}{${x2}}=${a}$.<br>`
          texteCorr += `Donc $f(x)=${a}x${ecritureAlgebrique(b)}$.`

          break

        case 2: // f(x1)=y1 et f(x1+1)=y2
          a = randint(-5, 5, 0)
          b = randint(-5, 5, 0)
          x1 = randint(-5, 5, [-1, 0])
          y1 = calcul(a * x1 + b)
          x2 = x1 + 1
          y2 = calcul(b + a * x2)
          texteCorr = `Soit $f(x)=ax+b$. On passe de $${x1}$ à $${x2}$ en ajoutant 1, donc la pente $a$ de la droite correspond à $f(${x2})-f(${x1})=${y2}-${ecritureParentheseSiNegatif(y1)}=${y2}${ecritureAlgebrique(-y1)}=${a}$.<br>`
          texteCorr += `Donc $f(x)=${a}x+b$.<br>En utilisant la donnée $f(${x2})=${y2}$ on obtient : $${a} \\times ${ecritureParentheseSiNegatif(x2)}+b=${y2}$ d'où $${a * x2}+b=${y2}$ donc $b=${y2}${ecritureAlgebrique(-a * x2)}=${b}$.<br>`
          texteCorr += `Donc $f(x)=${a}x${ecritureAlgebrique(b)}$.`

          break

        case 3:

          break

        case 4:

          break
      }
      texte = `La fonction $f$ est une fonction affine et on sait que $f(${x1})=${y1}$ et $f(${x2})=${y2}$.<br>`
      texte += 'Déterminer la forme algébrique de la fonction $f$.'
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3];
}
