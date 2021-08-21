import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureAlgebrique, pgcd } from '../../modules/outils.js'
import { fraction } from '../../modules/fractions.js'
export const titre = 'Déterminer les termes d’une suite définie de façon explicite'

/**
 * 1N10
 * @author Gaelle Morvan
 */
export default function TermeDUneSuiteDefinieExplicitement () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Une suite étant donnée, calculer le terme demandé.'
  this.nbQuestions = 4

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Vide la liste de questions
    this.listeCorrections = [] // Vide la liste de questions corrigées

    const typesDeQuestionsDisponibles = [1, 2, 3]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texteCorr, cpt = 0, a, b, c, d, frac, k; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 1: // fonction affine
          a = randint(1, 7) * choice([-1, 1])
          b = randint(1, 10) * choice([-1, 1])
          k = randint(0, 20)

          texte = 'Soit $(u_n)$ une suite définie pour tout entier $n\\in\\mathbb{N}$ par $u_n = '
          if (a === 1) { texte += 'n' } else if (a === -1) { texte += '-n' } else { texte += `${a}n` };

          if (b > 0) { texte += `+${b}$.` } else { texte += `${b}$.` };
          texte += `<br>Calculer $u_{${k}}$.`

          texteCorr = `Dans l'expression de $u_n$ on remplace $n$ par ${k}, on obtient : $u_{${k}} =`
          if (a === 1) {
            texteCorr += `${k} ${ecritureAlgebrique(b)}`
          } else {
            if (a === -1) {
              texteCorr += `-${k} ${ecritureAlgebrique(b)}`
            } else {
              texteCorr += `${a} \\times ${k} ${ecritureAlgebrique(b)}`
            }
          }
          texteCorr += `=${a * k + b}$.`
          break

        case 2: // fonction polynome de degré 2
          a = randint(1, 5) * choice([-1, 1])
          b = randint(0, 5) * choice([-1, 1])
          c = randint(0, 9) * choice([-1, 1])
          k = randint(0, 9)

          texte = 'Soit $(u_n)$ une suite définie pour tout entier $n\\in\\mathbb{N}$ par $u_n = '
          if (a === 1) {
            texte += 'n^2$'
          } else {
            if (a === -1) {
              texte += '-n^2$'
            } else {
              texte += `${a}n^2$`
            }
          };
          if (b === 1) { texte += '$+n$' };
          if (b > 1) { texte += `$+${b}n$` };
          if (b === -1) { texte += '$-n$' };
          if (b < -1) { texte += `$${b}n$` };
          if (c > 0) { texte += `$+${c}$.` };
          if (c < 0) { texte += `$${c}$.` }
          texte += `<br>Calculer $u_{${k}}$.`

          texteCorr = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient : $u_{${k}} = `
          if (a === 1) { texteCorr += `${k}^2` } else {
            if (a === -1) { texteCorr += `-${k}^2` } else {
              texteCorr += `${a}\\times ${k}^2`
            }
          };
          if (b === 1) {
            texteCorr += `+${k}`
          } else {
            if (b === -1) {
              texteCorr += `-${k}`
            } else {
              texteCorr += `${ecritureAlgebrique(b)}\\times ${k}`
            }
          }
          texteCorr += `${ecritureAlgebrique(c)}=${a * k * k + b * k + c}$.`
          break

        case 3: // fonction homographique
          a = randint(1, 5) * choice([-1, 1])
          b = randint(1, 5) * choice([-1, 1])
          c = randint(2, 4)
          d = randint(1, 7)
          k = randint(1, 9)

          texte = 'Soit $(u_n)$ une suite définie pour tout entier $n\\in\\mathbb{N}$ par $u_n = \\dfrac{'
          if (a === 1) { texte += 'n' } else if (a === -1) { texte += '-n' } else { texte += `${a}n` };
          if (b > 0) { texte += `+${b}}{` } else { texte += `${b}}{` };
          if (c === 1) { texte += 'n' } else if (c === -1) { texte += '-n' } else { texte += `${c}n` };
          if (d > 0) { texte += `+${d}}$.` } else { texte += `${d}}$.` };

          texte += `<br>Calculer $u_{${k}}$.`
          frac = fraction(a * k + b, c * k + d)
          texteCorr = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient : $u_{${k}} = \\dfrac{${a}\\times ${k} ${ecritureAlgebrique(b)}}{${c}\\times ${k}
          ${ecritureAlgebrique(d)}} = ` + frac.texFraction
          if (pgcd(a * k + b, c * k + d) !== 1) { texteCorr += '=' + frac.texFractionSimplifiee }
          texteCorr += '$.'
          break
      }

      if (this.questionJamaisPosee(i, a, b, k)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte) // Sinon on enregistre la question dans listeQuestions
        this.listeCorrections.push(texteCorr) // On fait pareil pour la correction
        i++ // On passe à la question suivante
      }
      cpt++ // Sinon on incrémente le compteur d'essai pour avoir une question nouvelle
    }
    listeQuestionsToContenu(this) // La liste de question et la liste de la correction

    // sont transformés en chaine de caractère (avec une liste HTML ou LaTeX suivant le contexte)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
  // On aurait pu ajouter un formulaire pour régler le niveau de difficulté à l'aide de l'attribut this.sup
}
