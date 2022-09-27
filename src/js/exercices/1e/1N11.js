import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif, signe, texNombre, miseEnEvidence, arcenciel } from '../../modules/outils.js'

export const titre = 'Déterminer les termes d\'une suite définie par récurrence'

/**
 * 1N11
 * @author Gaelle Morvan
 */
export const uuid = 'b8c14'
export const ref = '1N11'
export default function TermeDUneSuiteDefinieParRecurrence () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Une suite étant donnée, calculer le terme demandé.'
  this.nbQuestions = 4

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Vide la liste de questions
    this.listeCorrections = [] // Vide la liste de questions corrigées

    const typesDeQuestionsDisponibles = [1, 2, 3, 4]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texteCorr, cpt = 0, u, a, b, k; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 1: // suite arithmétique
          a = randint(1, 10) * choice([-1, 1])
          u = randint(0, 10) * choice([-1, 1])
          k = randint(2, 10)

          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = u_n ${ecritureAlgebrique(a)}$.`

          texte += `<br>Calculer $u_{${k}}$.`

          texteCorr = `On calcule successivent les termes jusqu'à obtenir $u_{${k}}$ :`
          for (let indice = 0; indice < k; indice++) {
            texteCorr += `<br> $u_{${indice + 1}} = ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecritureAlgebrique(a)} = 
              ${miseEnEvidence(u, arcenciel(indice, true))} + ${a} = ${miseEnEvidence(u + a, arcenciel(indice + 1, true))}$`
            u = u + a
          }
          break

        case 2: // suite géométrique
          a = randint(2, 5) * choice([-1, 1])
          u = randint(1, 9) * choice([-1, 1])
          k = randint(2, 6)

          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = u_n \\times ${ecritureParentheseSiNegatif(a)}$.`

          texte += `<br>Calculer $u_{${k}}$.`

          texteCorr = `On calcule successivent les termes jusqu'à obtenir $u_${k}$ :`
          for (let indice = 0; indice < k; indice++) {
            texteCorr += `<br> $u_{${indice + 1}} = ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))} \\times ${ecritureParentheseSiNegatif(a)} = 
              ${miseEnEvidence(u, arcenciel(indice, true))} \\times ${ecritureParentheseSiNegatif(a)} = ${miseEnEvidence(u * a, arcenciel(indice + 1, true))}$`
            u = u * a
          }
          break

        case 3: // suite arithmético-géométrique
          a = randint(2, 5) * choice([-1, 1])
          b = randint(1, 5) * choice([-1, 1])
          u = randint(1, 5) * choice([-1, 1])
          k = randint(2, 6)

          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = ${a} u_n ${ecritureAlgebrique(b)}$.`

          texte += `<br>Calculer $u_{${k}}$.`

          texteCorr = `On calcule successivent les termes jusqu'à obtenir $u_${k}$ :`
          for (let indice = 0; indice < k; indice++) {
            texteCorr += `<br> $u_{${indice + 1}} = ${a}\\times ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecritureAlgebrique(b)}=`
            texteCorr += `${a} \\times ${ecritureParentheseSiNegatif(miseEnEvidence(u, arcenciel(indice, true)))} ${ecritureAlgebrique(b)} = 
            ${miseEnEvidence(a * u + b, arcenciel(indice + 1, true))}$`
            u = u * a + b
          }
          break

        case 4: // suite de la forme u(n+1) = a +- u(n)^2
          a = randint(1, 5) * choice([-1, 1])
          b = choice([-1, 1])
          u = randint(1, 5) * choice([-1, 1])
          k = randint(2, 3)

          texte = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout entier $n\\in\\mathbb{N}$ par $u_{n+1} = ${a} ${signe(b)} u_n^2$.`

          texte += `<br>Calculer $u_{${k}}$.`

          texteCorr = `On calcule successivent les termes jusqu'à obtenir $u_${k}$ :`
          for (let indice = 0; indice < k; indice++) {
            texteCorr += `<br> $u_{${indice + 1}} = ${a} ${signe(b)} (${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))})^2=`
            texteCorr += `${a} ${signe(b)} ${ecritureParentheseSiNegatif(miseEnEvidence(u, arcenciel(indice, true)))}^2 = 
              ${miseEnEvidence(texNombre(a + b * u * u), arcenciel(indice + 1, true))}$`
            u = a + b * u * u
          }
          break
      }

      if (this.questionJamaisPosee(i, a, u, k)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte) // Sinon on enregistre la question dans listeQuestions
        this.listeCorrections.push(texteCorr) // On fait pareil pour la correction
        i++ // On passe à la question suivante
      }
      cpt++ // Sinon on incrémente le compteur d'essai pour avoir une question nouvelle
    }
    listeQuestionsToContenu(this) // La liste de question et la liste de la correction
  }
}
