import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { ecritureAlgebrique } from '../../../modules/outils/ecritures.js'
import { texFraction } from '../../../modules/outils/arrayFractions.js'
import { miseEnEvidence } from '../../../modules/outils/contextSensitif.js'
import { signe } from '../../../modules/outils/nombres.js'
import { calcul, texNombre } from '../../../modules/outils/texNombres.js'
import { arcenciel } from '../../../modules/outils/couleurs.js'
export const titre = 'Calculer un terme d’une suite récurrente'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '14/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora (exercice en partie repris de Gaelle Morvan (1N11))
 * Référence
*/
export const uuid = '3f032'
export const ref = 'can1S02'
export default function CalculTermeSuiteRec () {
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
        k = 1

        this.question = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $u_{n+1} = u_n ${ecritureAlgebrique(a)}$.`

        if (!this.interactif) {
          this.question += `<br>Calculer $u_{${k}}$.`
        } else { this.question += `<br> $u_{${k}}=.....$` }

        if (a > 0) {
          for (let indice = 0; indice < k; indice++) {
            this.correction = `En utilisant la relation de récurrence pour $n=0$, on obtient :<br> 
            $u_{${indice + 1}} = ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecritureAlgebrique(a)} = 
              ${miseEnEvidence(u, arcenciel(indice, true))} + ${a} = ${miseEnEvidence(u + a, arcenciel(indice + 1, true))}$`
          }
        } else {
          for (let indice = 0; indice < k; indice++) {
            this.correction = `En utilisant la relation de récurrence pour $n=0$, on obtient :<br> $u_{${indice + 1}} = ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecritureAlgebrique(a)} = 
            ${miseEnEvidence(u, arcenciel(indice, true))}  ${a} = ${miseEnEvidence(u + a, arcenciel(indice + 1, true))}$`
          }
        }
        this.reponse = calcul(u + a)
        break
      case 'b':// suite géométrique
        a = randint(2, 10) * choice([-1, 1])
        u = randint(1, 10) * choice([-1, 1])
        k = 1

        this.question = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $u_{n+1} = ${a}u_n $.`

        if (!this.interactif) {
          this.question += `<br>Calculer $u_{${k}}$.`
        } else { this.question += `<br> $u_{${k}}=.....$` }
        if (u < 0) {
          for (let indice = 0; indice < k; indice++) {
            this.correction = `En utilisant la relation de récurrence pour $n=0$, on obtient :<br> $u_{${indice + 1}} = ${a}\\times ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))}  = 
             ${a}\\times (${miseEnEvidence(u, arcenciel(indice, true))})  = ${miseEnEvidence(u * a, arcenciel(indice + 1, true))}$`
          }
        } else {
          for (let indice = 0; indice < k; indice++) {
            this.correction = `En utilisant la relation de récurrence pour $n=0$, on obtient :<br> $u_{${indice + 1}} = ${a}\\times ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))}  = 
               ${a}\\times ${miseEnEvidence(u, arcenciel(indice, true))}  = ${miseEnEvidence(u * a, arcenciel(indice + 1, true))}$`
          }
        }
        this.reponse = calcul(u * a)
        break

      case 'c':// suite géométrique avec fraction
        listeFractions1 = [[1, 2], [2, 3], [3, 4], [2, 5], [4, 5],
          [5, 6], [2, 7], [4, 7], [6, 7], [3, 8], [7, 8],
          [2, 9], [5, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
        fraction1 = choice(listeFractions1)
        k = 1
        n1 = fraction1[0]
        d1 = fraction1[1]
        a = randint(1, 10) * choice([-1, 1])
        u = calcul(a * d1)
        this.question = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $u_{n+1} = ${texFraction(n1, d1)}u_n $.`

        if (!this.interactif) {
          this.question += `<br>Calculer $u_{${k}}$.`
        } else { this.question += `<br> $u_{${k}}=.....$` }

        if (u < 0) {
          for (let indice = 0; indice < k; indice++) {
            this.correction = `En utilisant la relation de récurrence pour $n=0$, on obtient :<br> $u_{${indice + 1}} = ${texFraction(n1, d1)}\\times ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))}  = 
          ${texFraction(n1, d1)}\\times (${miseEnEvidence(u, arcenciel(indice, true))})  = ${miseEnEvidence(n1 * a, arcenciel(indice + 1, true))}$`
          }
        } else {
          for (let indice = 0; indice < k; indice++) {
            this.correction = `En utilisant la relation de récurrence pour $n=0$, on obtient :<br> $u_{${indice + 1}} = ${texFraction(n1, d1)}\\times ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))}  = 
    ${texFraction(n1, d1)}\\times ${miseEnEvidence(u, arcenciel(indice, true))}  = ${miseEnEvidence(n1 * a, arcenciel(indice + 1, true))}$`
          }
        }
        this.reponse = calcul(n1 * a)
        break

      case 'd':// suite arithmético-géométrique
        a = randint(2, 10) * choice([-1, 1])
        b = randint(1, 5) * choice([-1, 1])
        u = randint(1, 10) * choice([-1, 1])
        k = 1

        this.question = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout $n\\in\\mathbb{N}$ par $u_{n+1} = ${a} u_n ${ecritureAlgebrique(b)}$.`

        if (!this.interactif) {
          this.question += `<br>Calculer $u_{${k}}$.`
        } else { this.question += `<br> $u_{${k}}=.....$` }

        this.correction = 'En utilisant la relation de récurrence pour $n=0$, on obtient :<br>'

        if (u < 0) {
          for (let indice = 0; indice < k; indice++) {
            this.correction += `$u_{${indice + 1}} = ${a}\\times ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecritureAlgebrique(b)}=`
            this.correction += `${a} \\times (${miseEnEvidence(u, arcenciel(indice, true))}) ${ecritureAlgebrique(b)} = 
        ${miseEnEvidence(a * u + b, arcenciel(indice + 1, true))}$`
          }
        } else {
          for (let indice = 0; indice < k; indice++) {
            this.correction += `$u_{${indice + 1}} = ${a}\\times ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))} ${ecritureAlgebrique(b)}=`
            this.correction += `${a} \\times ${miseEnEvidence(u, arcenciel(indice, true))} ${ecritureAlgebrique(b)} = 
        ${miseEnEvidence(a * u + b, arcenciel(indice + 1, true))}$`
          }
        }
        this.reponse = calcul(u * a + b)
        break

      case 'e':// suite de la forme u(n+1) = a +- u(n)^2
        a = randint(1, 10) * choice([-1, 1])
        b = choice([-1, 1])
        u = randint(1, 10) * choice([-1, 1])
        k = 1

        this.question = `Soit $(u_n)$ une suite définie par $u_0=${u}$ et pour tout $n\\in\\mathbb{N}$ par $u_{n+1} = ${a} ${signe(b)} u_n^2$.`

        if (!this.interactif) {
          this.question += `<br>Calculer $u_{${k}}$.`
        } else { this.question += `<br> $u_{${k}}=.....$` }

        this.correction = `En utilisant la relation de récurrence pour $n=0$, on obtient :
       `
        if (u < 0) {
          for (let indice = 0; indice < k; indice++) {
            this.correction += `<br> $u_{${indice + 1}} = ${a} ${signe(b)} (${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))})^2=`
            this.correction += `${a} ${signe(b)} (${miseEnEvidence(u, arcenciel(indice, true))})^2 = 
              ${miseEnEvidence(texNombre(a + b * u * u), arcenciel(indice + 1, true))}$`
          }
        } else {
          for (let indice = 0; indice < k; indice++) {
            this.correction += `<br> $u_{${indice + 1}} = ${a} ${signe(b)} ${miseEnEvidence('u_{' + indice + '}', arcenciel(indice, true))}^2=`
            this.correction += `${a} ${signe(b)} ${miseEnEvidence(u, arcenciel(indice, true))}^2 = 
                ${miseEnEvidence(texNombre(a + b * u * u), arcenciel(indice + 1, true))}$`
          }
        }
        this.reponse = calcul(a + b * u * u)
        break
    }
  }
}
