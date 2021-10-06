import Exercice from '../../Exercice.js'
import { randint, choice, creerNomDePolygone, texNombrec, texteEnCouleur } from '../../../modules/outils.js'
import {
  mathalea2d, point, latexParCoordonnees, pointAdistance, longueur, polygoneAvecNom, milieu, codageAngleDroit, similitude
} from '../../../modules/2d.js'
export const titre = 'Calcul de l’hypoténuse avec Pythagore'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can4G03
 * Date de publication
*/
export default function CalculHypotenusePythagore () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.interactif = true
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  let a, b
  this.nouvelleVersion = function () {
    const nom = creerNomDePolygone(3, ['Q'])
    a = randint(2, 7)//
    b = randint(3, 7)//
    const A = point(0, 0, nom[0])
    const B = pointAdistance(A, a, randint(0, 45), nom[1])
    const C = similitude(A, B, 90, b / a, nom[2])
    const pol = polygoneAvecNom(A, B, C) // polygoneAvecNom s'occupe du placement des noms des sommets
    console.log('AB : ', a, '  BC : ', b, '  AC : ', longueur(A, C))
    const objets = []
    const xmin = Math.min(A.x, B.x, C.x) - 1
    const ymin = Math.min(A.y, B.y, C.y) - 1
    const xmax = Math.max(A.x, B.x, C.x) + 1
    const ymax = Math.max(A.y, B.y, C.y) + 1
    switch (choice(['a', 'b'])) {
      case 'a':
        objets.push(pol[0], pol[1], codageAngleDroit(A, B, C)) // pol[0], c'est le tracé et pol[1] ce sont les labels
        objets.push(latexParCoordonnees(`${texNombrec(a)}`, milieu(A, B).x, milieu(A, B).y + 0.2, 'black', 20, 10, ''),
          latexParCoordonnees(`${texNombrec(b)}`, milieu(B, C).x + 0.2, milieu(B, C).y, 'black', 20, 10, '')
        )
        this.question = `Sur cette figure, calculer la valeur exacte de $${nom[0]}${nom[2]}$.<br>`
        this.question += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.3, scale: 0.7 }, objets)

        if (a ** 2 + b ** 2 === 9 || a ** 2 + b ** 2 === 16 || a ** 2 + b ** 2 === 25 || a ** 2 + b ** 2 === 36 || a ** 2 + b ** 2 === 49) {
          this.correction = ` On utilise le théorème de Pythagore dans le triangle $${nom[0]}${nom[1]}${nom[2]}$,  rectangle en $${nom[1]}$.<br>
            On obtient :<br>
            $\\begin{aligned}
              ${nom[0]}${nom[1]}^2+${nom[1]}${nom[2]}^2&=${nom[0]}${nom[2]}^2\\\\
              ${nom[0]}${nom[2]}^2&=${nom[1]}${nom[2]}^2+${nom[0]}${nom[1]}^2\\\\
              ${nom[0]}${nom[2]}^2&=${b}^2+${a}^2\\\\
              ${nom[0]}${nom[2]}^2&=${b ** 2}+${a ** 2}\\\\
              ${nom[0]}${nom[2]}^2&=${b ** 2 + a ** 2}\\\\
              ${nom[0]}${nom[2]}&=\\sqrt{${b ** 2 + a ** 2}}\\\\
              ${nom[0]}${nom[2]}&=${Math.sqrt(b ** 2 + a ** 2)}
              \\end{aligned}$`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
    La longueur $${nom[0]}${nom[2]}$ est donnée par la racine carrée de la somme des carrés de $${b}$ et de $${a}$.<br>
    Cette somme vaut $${b ** 2}+${a ** 2}=${b ** 2 + a ** 2}$. <br>
    La valeur cherchée est donc : $\\sqrt{${b ** 2 + a ** 2}}$, soit $${Math.sqrt(b ** 2 + a ** 2)}$.
      `)
        } else {
          this.correction = ` On utilise le théorème de Pythagore dans le triangle $${nom[0]}${nom[1]}${nom[2]}$,  rectangle en $${nom[1]}$.<br>
      On obtient :<br>
      $\\begin{aligned}
        ${nom[0]}${nom[1]}^2+${nom[1]}${nom[2]}^2&=${nom[0]}${nom[2]}^2\\\\
        ${nom[0]}${nom[2]}^2&=${nom[1]}${nom[2]}^2+${nom[0]}${nom[1]}^2\\\\
        ${nom[0]}${nom[2]}^2&=${b}^2+${a}^2\\\\
        ${nom[0]}${nom[2]}^2&=${b ** 2}+${a ** 2}\\\\
        ${nom[0]}${nom[2]}^2&=${b ** 2 + a ** 2}\\\\
        ${nom[0]}${nom[2]}&=\\sqrt{${b ** 2 + a ** 2}}
        \\end{aligned}$`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
La longueur $${nom[0]}${nom[2]}$ est donnée par la racine carrée de la somme des carrés de $${b}$ et de $${a}$.<br>
Cette somme vaut $${b ** 2}+${a ** 2}=${b ** 2 + a ** 2}$. <br>
La valeur cherchée est donc : $\\sqrt{${b ** 2 + a ** 2}}$.
`)
        }
        this.reponse = [`\\sqrt{${b ** 2 + a ** 2}}`, `${Math.sqrt(b ** 2 + a ** 2)}`]
        break

      case 'b':
        a = randint(1, 10)//
        b = randint(2, 10, [4, 9])//
        if (a ** 2 + b === 9 || a ** 2 + b === 16 || a ** 2 + b === 25 || a ** 2 + b === 36 || a ** 2 + b === 49) {
          this.question = `$${nom[0]}${nom[1]}${nom[2]}$ est un triangle rectangle en $${nom[0]}$ dans lequel 
                  $${nom[0]}${nom[1]}=${a}$ et $${nom[0]}${nom[2]}=\\sqrt{${b}}$.<br>
                   Calculer la valeur exacte de $${nom[1]}${nom[2]}$ .<br>
        `
          this.correction = ` On utilise le théorème de Pythagore dans le triangle $${nom[0]}${nom[1]}${nom[2]}$,  rectangle en $${nom[0]}$.<br>
        On obtient :<br>
        $\\begin{aligned}
          ${nom[0]}${nom[1]}^2+${nom[0]}${nom[2]}^2&=${nom[1]}${nom[2]}^2\\\\
          ${nom[1]}${nom[2]}^2&=${nom[0]}${nom[1]}^2+${nom[0]}${nom[2]}^2\\\\
          ${nom[1]}${nom[2]}^2&=\\sqrt{${b}}^2+${a}^2\\\\
          ${nom[1]}${nom[2]}^2&=${b}+${a ** 2}\\\\
          ${nom[1]}${nom[2]}^2&=${b + a ** 2}\\\\
          ${nom[1]}${nom[2]}&=\\sqrt{${b + a ** 2}}
          ${nom[1]}${nom[2]}&=${Math.sqrt(a ** 2 + b)}
          \\end{aligned}$
          `
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
    La longueur $${nom[1]}${nom[2]}$ est donnée par la racine carrée de la somme des carrés de $\\sqrt{${b}}$ et de $${a}$.<br>
    Cette somme vaut $${b}+${a ** 2}=${b + a ** 2}$ (n'oubliez pas que $(\\sqrt{${b}})^2=${b}$). <br>
    La valeur cherchée est donc : $\\sqrt{${b + a ** 2}}$.
      `)
        } else {
          this.question = `$${nom[0]}${nom[1]}${nom[2]}$ est un triangle rectangle en $${nom[0]}$ dans lequel 
      $${nom[0]}${nom[1]}=${a}$ et $${nom[0]}${nom[2]}=\\sqrt{${b}}$.<br>
       Calculer la valeur exacte de $${nom[1]}${nom[2]}$ .<br>
`
          this.correction = ` On utilise le théorème de Pythagore dans le triangle $${nom[0]}${nom[1]}${nom[2]}$,  rectangle en $${nom[0]}$.<br>
On obtient :<br>
$\\begin{aligned}
${nom[0]}${nom[1]}^2+${nom[0]}${nom[2]}^2&=${nom[1]}${nom[2]}^2\\\\
${nom[1]}${nom[2]}^2&=${nom[0]}${nom[1]}^2+${nom[0]}${nom[2]}^2\\\\
${nom[1]}${nom[2]}^2&=\\sqrt{${b}}^2+${a}^2\\\\
${nom[1]}${nom[2]}^2&=${b}+${a ** 2}\\\\
${nom[1]}${nom[2]}^2&=${b + a ** 2}\\\\
${nom[1]}${nom[2]}&=\\sqrt{${b + a ** 2}}
\\end{aligned}$
`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
La longueur $${nom[1]}${nom[2]}$ est donnée par la racine carrée de la somme des carrés de $\\sqrt{${b}}$ et de $${a}$.<br>
Cette somme vaut $${b}+${a ** 2}=${b + a ** 2}$ (n'oubliez pas que $(\\sqrt{${b}})^2=${b}$). <br>
La valeur cherchée est donc : $\\sqrt{${b + a ** 2}}$.
`)
        }
        this.reponse = [`\\sqrt{${a ** 2 + b}}`, `${Math.sqrt(a ** 2 + b)}`]

        break
    }
  }
}
