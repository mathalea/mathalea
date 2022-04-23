import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, ecritureAlgebrique, rienSi1 } from '../../modules/outils.js'
export const titre = 'Mesure principale d\'un angle'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '20/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence
*/
export default function MesurePrincipale () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Déterminer la mesure principale de l\'angle $\\alpha$, c\'est à dire sa mesure entre $]-\\pi;\\pi]$'
  this.nbQuestions = 3 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3', 'type4', 'type5'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, k, p, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':// k* 2\pi + p*\pi/3
          k = randint(-5, 5, [0])//
          p = randint(-2, 2, [0])
          texte = `$\\alpha=\\dfrac{${6 * k + p}\\pi}{3}$` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `$\\alpha=\\dfrac{${6 * k + p}\\pi}{3}= \\dfrac{${3 * k} \\times 2\\pi  ${ecritureAlgebrique(p)}\\pi}{3}=${k}\\times 2\\pi+\\dfrac{${rienSi1(p)}\\pi}{3}$`
          texteCorr += `<br>On vérifie que $\\dfrac{${rienSi1(p)}\\pi}{3}\\in]-\\pi;\\pi]$.`
          texteCorr += `<br>La mesure principale de $\\alpha$ est donc $\\dfrac{${rienSi1(p)}\\pi}{3}$`
          break
        case 'type2':// k* 2\pi + p*\pi/6
          k = randint(-5, 5, [0])
          p = randint(-5, 5, [-4, -3, -2, 0, 2, 3, 4])
          texte = `$\\alpha=\\dfrac{${12 * k + p}\\pi}{6}$` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `$\\alpha=\\dfrac{${12 * k + p}\\pi}{6}= \\dfrac{${3 * k} \\times 2\\pi  ${ecritureAlgebrique(p)}\\pi}{3}=\\dfrac{${6 * k} \\times 2\\pi  ${ecritureAlgebrique(p)}\\pi}{6}=${k}\\times 2\\pi+\\dfrac{${p}\\pi}{6}$`
          texteCorr += `<br>On vérifie que $\\dfrac{${rienSi1(p)}\\pi}{6}\\in]-\\pi;\\pi]$.`
          texteCorr += `<br>La mesure principale de $\\alpha$ est donc $\\dfrac{${rienSi1(p)}\\pi}{6}$`
          break
        case 'type3':// k* 2\pi + p*\pi/5
          k = randint(-5, 5, [0])
          p = randint(-4, 4, [0])
          texte = `$\\alpha=\\dfrac{${10 * k + p}\\pi}{5}$` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `$\\alpha=\\dfrac{${10 * k + p}\\pi}{5}=\\dfrac{${5 * k} \\times 2\\pi  ${ecritureAlgebrique(p)}\\pi}{5}=${k}\\times 2\\pi+\\dfrac{${ecritureAlgebrique(p)}\\pi}{5}$`
          texteCorr += `<br>On vérifie que $\\dfrac{${rienSi1(p)}\\pi}{5}\\in]-\\pi;\\pi]$.`
          texteCorr += `<br>La mesure principale de $\\alpha$ est donc $\\dfrac{${rienSi1(p)}\\pi}{5}$`
          break
        case 'type4':// k* 2\pi + p*\pi/4
          k = randint(-5, 5, [0])
          p = randint(-3, 3, [-2, 0, 2])
          texte = `$\\alpha=\\dfrac{${8 * k + p}\\pi}{4}$` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `$\\alpha=\\dfrac{${8 * k + p}\\pi}{4}=\\dfrac{${4 * k} \\times 2\\pi  ${ecritureAlgebrique(p)}\\pi}{4}${k}\\times 2\\pi+\\dfrac{${ecritureAlgebrique(p)}\\pi}{4}$`
          texteCorr += `<br>On vérifie que $\\dfrac{${rienSi1(p)}\\pi}{4}\\in]-\\pi;\\pi]$.`
          texteCorr += `<br>La mesure principale de $\\alpha$ est donc $\\dfrac{${rienSi1(p)}\\pi}{4}$`
          break
        case 'type5':// k* 2\pi + p*\pi/7
          k = randint(-5, 5, [0])
          p = randint(-6, 6, [0])
          texte = `$\\alpha=\\dfrac{${14 * k + p}\\pi}{7}$` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `$\\alpha=\\dfrac{${14 * k + p}\\pi}{7}=\\dfrac{${7 * k} \\times 2\\pi  ${ecritureAlgebrique(p)}\\pi}{7}${k}\\times 2\\pi+\\dfrac{${ecritureAlgebrique(p)}\\pi}{7}$`
          texteCorr += `<br>On vérifie que $\\dfrac{${rienSi1(p)}\\pi}{7}\\in]-\\pi;\\pi]$.`
          texteCorr += `<br>La mesure principale de $\\alpha$ est donc $\\dfrac{${rienSi1(p)}\\pi}{7}$`
          break
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
