import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../../modules/outils/ecritures.js'
import { texFraction } from '../../../modules/outils/arrayFractions.js'
import { miseEnEvidence } from '../../../modules/outils/contextSensitif.js'
import { signe } from '../../../modules/outils/nombres.js'
import { calcul, texNombre } from '../../../modules/outils/texNombres.js'
import { arcenciel } from '../../../modules/outils/couleurs.js'
export const titre = 'Calculer un terme d’une suite récurrente*'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '15/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = 'fccb4'
export const ref = 'can1S03'
export default function CalculTermeSuiteRec2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, b, k, u, listeFractions1, fraction1, n1, d1
    switch (choice(['a', 'b', 'c', 'd', 'e'])) { //
      case 'a':// suite arithmétique
        a = randint(1, 10) * choice([-1, 1])
        u = randint(1, 10) * choice([-1, 1])
        k = 2

        this.question = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $u_{n+1} = u_n ${ecritureAlgebrique(a)}$.`
        if (!this.interactif) {
          this.question += `<br>Calculer $u_{${k}}$.`
        } else { this.question += `<br> $u_{${k}}=.....$` }

        this.correction = `On calcule successivement les termes jusqu'à obtenir $u_{${k}}$ :`

        if (a > 0) {
          for (let indice = 0; indice < k; indice++) {
            this.correction += `<br> $u_{${indice + 1}} = ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecritureAlgebrique(a)} =
              ${miseEnEvidence(u, arcenciel(indice, true))} + ${a} = ${miseEnEvidence(u + a, arcenciel(indice + 1, true))}$`
            u = u + a
          }
        } else {
          for (let indice = 0; indice < k; indice++) {
            this.correction += `<br> $u_{${indice + 1}} = ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecritureAlgebrique(a)} =
            ${miseEnEvidence(u, arcenciel(indice, true))}  ${a} = ${miseEnEvidence(u + a, arcenciel(indice + 1, true))}$`
            u = u + a
          }
        }

        this.reponse = u
        break
      case 'b':// suite géométrique
        a = randint(2, 5) * choice([-1, 1])
        u = randint(1, 4) * choice([-1, 1])
        k = 2

        this.question = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $u_{n+1} = ${a}u_n $.`
        if (!this.interactif) {
          this.question += `<br>Calculer $u_{${k}}$.`
        } else { this.question += `<br> $u_{${k}}=.....$` }
        this.correction = `On calcule successivement les termes jusqu'à obtenir $u_{${k}}$ :`

        for (let indice = 0; indice < k; indice++) {
          this.correction += `<br> $u_{${indice + 1}} = ${a}\\times ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))}  =
               ${a}\\times ${miseEnEvidence(ecritureParentheseSiNegatif(u, arcenciel(indice, true)))}  = ${miseEnEvidence(u * a, arcenciel(indice + 1, true))}$`
          u = u * a
        }

        this.reponse = u
        break

      case 'c':// suite géométrique avec fraction
        listeFractions1 = [[1, 2], [2, 3], [3, 4], [2, 5], [4, 5],
          [1, 6], [1, 10], [3, 10], [7, 10], [5, 3], [4, 3], [3, 2], [5, 2]]
        fraction1 = choice(listeFractions1)
        k = 2
        n1 = fraction1[0]
        d1 = fraction1[1]
        a = randint(1, 2) * choice([-1, 1])
        u = calcul(a * d1 * d1)
        this.question = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $u_{n+1} = ${texFraction(n1, d1)}u_n $.`

        if (!this.interactif) {
          this.question += `<br>Calculer $u_{${k}}$.`
        } else { this.question += `<br> $u_{${k}}=.....$` }

        this.correction = `On calcule successivement les termes jusqu'à obtenir $u_{${k}}$ :`
        for (let indice = 0; indice < k; indice++) {
          this.correction += `<br> $u_{${indice + 1}} = ${texFraction(n1, d1)}\\times ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))}  =
          ${texFraction(n1, d1)}\\times ${miseEnEvidence(ecritureParentheseSiNegatif(u, arcenciel(indice, true)))}  = ${miseEnEvidence(u * n1 / d1, arcenciel(indice + 1, true))}$`
          u = n1 * a * d1
        }
        this.reponse = n1 * n1 * a
        break

      case 'd':// suite arithmético-géométrique
        a = randint(2, 4) * choice([-1, 1])
        b = randint(1, 7) * choice([-1, 1])
        u = randint(1, 4) * choice([-1, 1])
        k = 2

        this.question = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout $n\\in\\mathbb{N}$ par $u_{n+1} = ${a} u_n ${ecritureAlgebrique(b)}$.`

        if (!this.interactif) {
          this.question += `<br>Calculer $u_{${k}}$.`
        } else { this.question += `<br> $u_{${k}}=.....$` }

        this.correction = `On calcule successivement les termes jusqu'à obtenir $u_{${k}}$ :`

        for (let indice = 0; indice < k; indice++) {
          this.correction += `<br>$u_{${indice + 1}} = ${a}\\times ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecritureAlgebrique(b)}=
            ${a} \\times ${miseEnEvidence(ecritureParentheseSiNegatif(u, arcenciel(indice, true)))} ${ecritureAlgebrique(b)} =
        ${miseEnEvidence(a * u + b, arcenciel(indice + 1, true))}$`
          u = u * a + b
        }
        this.reponse = u
        break

      case 'e':// suite de la forme u(n+1) = a +- u(n)^2
        a = randint(1, 3) * choice([-1, 1])
        b = choice([-1, 1])
        u = randint(1, 3) * choice([-1, 1])
        k = 2

        this.question = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout $n\\in\\mathbb{N}$ par $u_{n+1} = ${a} ${signe(b)} u_n^2$.`

        if (!this.interactif) {
          this.question += `<br>Calculer $u_{${k}}$.`
        } else { this.question += `<br> $u_{${k}}=.....$` }

        this.correction = `En utilisant la relation de récurrence pour $n=0$, on obtient :<br>
       `

        for (let indice = 0; indice < k; indice++) {
          this.correction += `<br> $u_{${indice + 1}} = ${a} ${signe(b)} ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))}^2=`
          this.correction += `${a} ${signe(b)} ${miseEnEvidence(ecritureParentheseSiNegatif(u, arcenciel(indice, true)))}^2 =
              ${miseEnEvidence(texNombre(a + b * u * u), arcenciel(indice + 1, true))}$`
          u = a + b * u * u
        }
        this.reponse = u
        break
    }
  }
}
