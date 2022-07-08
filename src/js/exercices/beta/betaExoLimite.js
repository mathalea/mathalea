import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu, choice, shuffle } from '../../modules/outils.js'
import { mathalea2d, courbe, repere } from '../../modules/2d.js'
export const titre = 'Lecture graphique de limites'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '01/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '09/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Mathieu Degrange
 * Référence
*/
export default function NomExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 3 // Nombre de questions par défaut
  this.sup = false // x>2 au lieu de x->2+
  this.sup2 = false // asymptotes

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const nom = ['f', 'g', 'h', 'p', 'q', 'r', 's'][i % 7]
      texte = `Déterminer graphiquement les ${this.sup2 ? 'limites et asymtpotes' : 'limites'} de la fonction $${nom}$ dont la courbe représentative est tracée ci-dessous.<br>`
      texteCorr = ''

      // On détermine aléatoirement les abscisses avec une discontinuité
      // Étape n°1 : On liste les possibilités
      let x = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
      // Étape n°2 : On mélange les possibilités
      x = shuffle(x)
      // Étape n°3 : On choisi un nombre aléatoire de discontinuités
      // Il pourra y avoir de 0 à 3 discontinuité sauf pour la première question où il y aura toujours au moins une discontinuité
      x = x.slice(0, choice([i !== 0 ? 0 : 2, 1, 1, 2, 2, 3]))
      // Étape n°4 : On tri les discontinuités dans l'ordre croissant
      x = x.sort((a, b) => a - b) // Il faut passer une fonction de tri car par défaut javascript tri par code unicode donc -2 < -4

      const id = x.slice() // identifiant de la question qui dépant des données aléatoires

      const f = []
      const monRepere = repere()

      const limG = randint(-5, 5) // lim x->-oo
      const limD = randint(-5, 5, [limG]) // lim x->+oo

      if (x.length !== 0) {
        // Calcul entre xmin et x[0]
        {
          const lim1 = limG // lim x->-oo
          const lim2 = choice([-1, 1]) // lim x->x[0]- (-1 pour -oo, +1 pour +oo)
          const g = t => lim1 + lim2 * 1 / (t - x[0])
          f.push(courbe(g, { color: 'red', repere: monRepere, xMin: -10, xMax: x[0] - 0.5, yMin: -10, yMax: 10, step: 0.1 }))
          f.push(courbe(g, { color: 'red', repere: monRepere, xMin: x[0] - 0.5, xMax: x[0] - 0.001, yMin: -10, yMax: 10, step: 0.001 }))
          id.push(lim1, lim2)
          texteCorr += `$\\displaystyle\\lim_{x \\to -\\infty} ${nom}(x) = ${lim1}$<br>`
          texteCorr += `$\\displaystyle\\lim_{${xversreel(x[0], '-')}} ${nom}(x) = ${lim2 < 0 ? '+\\infty' : '-\\infty'}$<br>`
        }

        for (let k = 0; k < x.length - 1; k++) {
          // Calcul entre chaque borne
          const lim1 = choice([-1, 1]) // lim x->x[k]+ (-1 pour -oo, +1 pour +oo)
          const lim2 = choice([-1, 1]) // lim x->x[k+1]- (-1 pour -oo, +1 pour +oo)
          const c = randint(-3, 3)
          const g = t => lim1 * 1 / (t - x[k]) + c + lim2 * 1 / (t - x[k + 1])
          f.push(courbe(g, { color: 'red', repere: monRepere, xMin: x[k] + 0.001, xMax: x[k] + 0.5, yMin: -10, yMax: 10, step: 0.001 }))
          f.push(courbe(g, { color: 'red', repere: monRepere, xMin: x[k] + 0.5, xMax: x[k + 1] - 0.5, yMin: -10, yMax: 10, step: 0.1 }))
          f.push(courbe(g, { color: 'red', repere: monRepere, xMin: x[k + 1] - 0.5, xMax: x[k + 1] - 0.001, yMin: -10, yMax: 10, step: 0.001 }))
          id.push(lim1, lim2 /*, c */)
          texteCorr += `$\\displaystyle\\lim_{${xversreel(x[k], '+')}} ${nom}(x) = ${lim1 > 0 ? '+\\infty' : '-\\infty'}$<br>`
          texteCorr += `$\\displaystyle\\lim_{${xversreel(x[k + 1], '-')}} ${nom}(x) = ${lim2 < 0 ? '+\\infty' : '-\\infty'}$<br>`
        }

        // Calcul entre x[n] et xmax
        {
          const lim1 = choice([-1, 1]) // lim x->x[n]+ (-1 pour -oo, +1 pour +oo)
          const lim2 = limD // lim x->+oo
          const g = t => lim1 * 1 / (t - x[x.length - 1]) + lim2
          f.push(courbe(g, { color: 'red', repere: monRepere, xMin: x[x.length - 1] + 0.001, xMax: x[x.length - 1] + 0.5, yMin: -10, yMax: 10, step: 0.001 }))
          f.push(courbe(g, { color: 'red', repere: monRepere, xMin: x[x.length - 1] + 0.5, xMax: 10, yMin: -10, yMax: 10, step: 0.1 }))
          id.push(lim1, lim2)
          texteCorr += `$\\displaystyle\\lim_{${xversreel(x[x.length - 1], '+')}} ${nom}(x) = ${lim1 > 0 ? '+\\infty' : '-\\infty'}$<br>`
          texteCorr += `$\\displaystyle\\lim_{x \\to +\\infty} ${nom}(x) = ${lim2}$<br>`
        }
      } else {
        // f(x) = ax^3 + bx² + cx + d
        // f(-10) = l
        // f(10) = L
        // f'(-10) = 0
        // f'(10) = 0
        // f'(x) = 3ax^2 + 2bx + c
        // f'(10) = 300a + 20b + c
        // f'(-10) = 300a - 20b + c
        // 300a + 20b = 300a - 20b donc b = 0
        // 300a + c = 0 donc c = -300a
        // f(10) = 1000a - 3000a + d = -2000a + d = l
        // f(-10) = -1000a + 3000a + d = 2000a + d = L
        // d=(l+L)/2
        // a = (L-l)/4000
        // c = -3/40*(L-l)

        const a = (limG - limD) / 4000
        const c = -3 / 40 * (limG - limD)
        const d = (limG + limD) / 2
        const g = t => a * t * t * t + c * t + d
        f.push(courbe(g, { color: 'red', repere: monRepere, xMin: -10, xMax: 10, yMin: -10, yMax: 10, step: 0.1 }))
        id.push('∅', limG, limD)
        texteCorr += `$\\displaystyle\\lim_{x \\to -\\infty} ${nom}(x) = ${limG}$<br>`
        texteCorr += `$\\displaystyle\\lim_{x \\to +\\infty} ${nom}(x) = ${limD}$<br>`
      }

      if (this.sup2) {
        texteCorr += `La courbe admet les asymptotes horizontales d'équations $y=${limG}$ et $y=${limD}$.<br>`
        switch (x.length) {
          case 0 :
            break
          case 1 :
            texteCorr += `La courbe admet une asymptote verticale d'équation $x=${x[0]}$.<br>`
            break
          default :
            texteCorr += `La courbe admet les asymptotes verticales d'équations ${x.map((k, i) => (i === x.length - 1 ? ' et ' : ', ') + '$x=' + k + '$ ').join('').substring(2)}.<br>`
        }
      }

      texte += mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, scale: 0.5 }, monRepere, ...f)

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, id)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        // Ici, a est utilisée mais pas b, c et d, alors supprime ces trois derniers !
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  this.besoinFormulaireCaseACocher = ['Notation x>2 au lieu de 2+']

  const xversreel = (x, sens) => {
    let output = this.sup ? '\\substack{' : ''
    output += `x \\to ${x}`
    output += this.sup ? `\\\\x ${sens === '+' ? '>' : '<'} ${x}}` : `^${sens}`
    return output
  }

  this.besoinFormulaire2CaseACocher = ['Question sur les asymptotes']
}
