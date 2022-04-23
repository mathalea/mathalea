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
  this.consigne = 'Déterminer la mesure principale de l\'angle $\\alpha$, c\'est-à-dire sa mesure sur $]-\\pi;\\pi]$'
  this.nbQuestions = 3 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3', 'type4', 'type5', 'type6', 'type7', 'type8', 'type9'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, k, p, n, angle,  texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':// k* 2\pi + p*\pi/n
          p = randint(-2, 2, [0])
          n = 3
          break
        case 'type2':// k* 2\pi + p*\pi/n
          p = randint(-5, 5, [-4, -3, -2, 0, 2, 3, 4])
          n = 6
          break
        case 'type3':// k* 2\pi + p*\pi/n
          p = randint(-4, 4, [0])
          n = 5
          break
        case 'type4':// k* 2\pi + p*\pi/n
          p = randint(-3, 3, [-2, 0, 2])
          n = 4
          break
        case 'type5':// k* 2\pi + p*\pi/n
          p = randint(-6, 6, [0])
          n = 7
          break
        case 'type6':// k* 2\pi + p*\pi/n
          p = randint(-8, 8, [-6, -3, 0, 3, 6])
          n = 9
          break
        case 'type7':// k* 2\pi + p*\pi/n
          p = randint(-9, 9, [-8, -6, -5, -4, -2, 0, 2, 4, 5, 6, 8])
          n = 10
          break
        case 'type8':// k* 2\pi + p*\pi/n
          p = randint(-10, 10, [0])
          n = 11
          break
        case 'type9':// k* 2\pi + p*\pi/n
          p = randint(-12, 12, [0])
          n = 13
          break
      }
      k = randint(-5, 5, [0, 1])// modulo 2k\pi
      angle = 2 * n * (k ) + p

      texte = `$\\alpha=\\dfrac{${angle}\\pi}{${n}}$` // Le LateX entre deux symboles $, les variables dans des ${ }
      texteCorr = `On cherche le nombre de multiples inutiles de $2\\pi$ pour déterminer la mesure principale de $\\dfrac{${angle}\\pi}{${n}}$,`
      texteCorr += `<br>c'est-à-dire le nombre de multiples de $${2 * n}\\pi$ dans $${angle}\\pi$.`
      texteCorr += '<br>On peut diviser le numérateur par le double du dénominateur, pour avoir un ordre de grandeur du meilleur multiple :'
      texteCorr += `<br> On obtient : $\\quad ${k - 1}<\\dfrac{${angle}}{${2 * n}}< ${k}$`
      texteCorr += `<br><br>D'une part : $\\alpha=\\dfrac{${angle}\\pi}{${n}}=\\dfrac{${p + 2 * n}\\pi${ecritureAlgebrique(2 * n * (k - 1))} \\pi  }{${n}}=  \\dfrac{${p + 2 * n}\\pi}{${n}}+\\dfrac{${(k - 1)} \\times ${2 * n}\\pi}{${n}} =\\dfrac{${p + 2 * n}\\pi}{${n}}${ecritureAlgebrique(k - 1)}\\times 2\\pi$`
      texteCorr += `<br><br>D'autre part : $\\alpha=\\dfrac{${2 * n * k + p}\\pi}{${n}}=\\dfrac{(${p}${ecritureAlgebrique(2 * n * k)})\\pi}{${n}}= \\dfrac{${p}\\pi}{${n}}+\\dfrac{${k} \\times ${2 * n}\\pi}{${n}}=\\dfrac{${rienSi1(p)}\\pi}{${n}}${ecritureAlgebrique(k)}\\times 2\\pi  .$`
      texteCorr += `<br><br>On observe que :  $\\dfrac{${p + 2 * n}\\pi}{${n}} ~\\notin ~]-\\pi~ ;~ \\pi ]$.`
      texteCorr += `<br><br>Alors que :  $\\dfrac{${rienSi1(p)}\\pi}{${n}}~\\in~]-\\pi~ ;~ \\pi ]$,`
      texteCorr += `<br> La mesure principale de $\\alpha$ est donc $\\dfrac{${rienSi1(p)}\\pi}{${n}}$.`
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
