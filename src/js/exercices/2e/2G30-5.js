import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, ecritureParentheseSiNegatif, ecritureAlgebrique } from '../../modules/outils.js'
export const titre = 'Déterminer une équation cartésienne à partir d\'un point et de la pente'
/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence 2G30-5
*/
export const uuid = 'd1da3'
export const ref = '2G30-5'
export default function Determinerequationcartesienneavecpente () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 2
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    for (let i = 0, xA, yA, m, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      xA = randint(-5, 5)
      yA = randint(-5, 5)
      m = randint(1, 5) * choice([-1, 1])
      texte = `Soit $A(${xA};${yA})$ un point d'un repère $(O ; \\vec{i} ;\\vec{j})$.`
      texte += `<br>Déterminer une équation cartésienne de la droite$(d)$ passant par le point $A$ et ayant pour coefficent directeur $${m}$.`
      texteCorr = '<br>On sait que si une droite $(d)$ possède une pente égale à un réel $m$, alors elle admet $\\vec{u}(1;m)$ comme vecteur directeur.'
      texteCorr += `<br>Dans notre situation, cela signifie que la droite $(d)$ dont nous cherchons une équation cartésienne, admet comme vecteur directeur $ \\vec{u}(1;${m})$.`
      texteCorr += '<br>On sait d\'autre part qu\'une droite portée par un vecteur directeur de coordonnées $\\vec {u}(-b;a)$, avec $(-b;a)\\neq (0;0)$, admet une équation cartesienne de la forme $ax+by+c=0$'
      texteCorr += `<br>Ce qui signifie que : $-b=1$ donc $b=-1$ et $a=${m}$.`
      texteCorr += `<br>On en déduit que la droite $(d)$ admet une équation cartésienne de la forme $${m} x-y+c=0.$`
      texteCorr += '<br>Il reste à déterminer la valeur de $c$.'
      texteCorr += `<br>Pour cela nous allons utiliser le fait que $A$ appartient à la droite $(d)$, donc ses coordonnées $(${xA};${yA})$ vérifient l'équation : `
      texteCorr += `$${m} x-y+c=0$`
      texteCorr += `<br>Ce qui implique que  $${m}\\times ${ecritureParentheseSiNegatif(xA)}-${ecritureParentheseSiNegatif(yA)}+c=0$`
      texteCorr += `<br>d'où $c=${-m * xA + yA}$.`
      texteCorr += `<br>Ce qui permet de conclure qu'une équation cartésienne de $(d)$ est $(d):~${m} x-y${ecritureAlgebrique(-m * xA + yA)}=0$.`
      if (m < 0 & -m * xA + yA < 0) {
        texteCorr += `<br>ou encore plus simplement : $(d):~$  $${-m} x+y${ecritureAlgebrique(m * xA - yA)}=0$.`
      }
      if (this.questionJamaisPosee(i, xA, yA, m)) {
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
