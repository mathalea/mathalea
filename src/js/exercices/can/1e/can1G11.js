import Exercice from '../../Exercice.js'
import { choice } from '../../../modules/outils.js'
export const titre = 'Donner la mesure d\'un angle à partir des cosinus et sinus '
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '02/11/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can1G11
 *
*/

export default function mesureAngleCosSin () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const choix1 = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]'])
    const choix2 = choice(['a', 'b', 'c', 'd'])
    switch (choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])) { //, 2, 3, 4, 5
      case 1:// pi/6
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=\\dfrac{\\sqrt{3}}{2}$ et $\\sin(\\alpha)=\\dfrac{1}{2}$. <br>
        
        Quelle est la valeur de $\\alpha$ en radians ?`
        this.correction = `$\\cos \\dfrac{\\pi}{6}=\\dfrac{\\sqrt{3}}{2}$ et $\\sin \\dfrac{\\pi}{6}=\\dfrac{1}{2}$.<br>
          $\\dfrac{\\pi}{6}\\in ${choix1}$, donc $\\alpha=\\dfrac{\\pi}{6}$.`
        this.reponse = '\\dfrac{\\pi}{6}'
        break
      case 2:// pi/4
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=\\dfrac{\\sqrt{2}}{2}$ et $\\sin(\\alpha)=\\dfrac{\\sqrt{2}}{2}$. <br>
       
        Quelle est la valeur de $\\alpha$ en radians ?`
        this.correction = `$\\cos \\dfrac{\\pi}{4}=\\dfrac{\\sqrt{2}}{2}$ et $\\sin \\dfrac{\\pi}{4}=\\dfrac{\\sqrt{2}}{2}$.<br>
          $\\dfrac{\\pi}{4}\\in ${choix1}$, donc $\\alpha=\\dfrac{\\pi}{4}$.`
        this.reponse = '\\dfrac{\\pi}{4}'
        break
      case 3:// pi/3
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=\\dfrac{1}{2}$ et $\\sin(\\alpha)=\\dfrac{\\sqrt{3}}{2}$. <br>
       
        Quelle est la valeur de $\\alpha$ en radians ?`
        this.correction = `$\\cos \\dfrac{\\pi}{3}=\\dfrac{1}{2}$ et $\\sin \\dfrac{\\pi}{3}=\\dfrac{\\sqrt{3}}{2}$.<br>
          $\\dfrac{\\pi}{3}\\in ${choix1}$, donc $\\alpha=\\dfrac{\\pi}{3}$.`
        this.reponse = '\\dfrac{\\pi}{3}'
        break
      case 4:// 2pi/3
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=\\dfrac{1}{2}$ et $\\sin(\\alpha)=\\dfrac{\\sqrt{3}}{2}$. <br>
       
        Quelle est la valeur de $\\alpha$ en radians ?`
        this.correction = `$\\cos \\dfrac{2\\pi}{3}=-\\dfrac{1}{2}$ et $\\sin \\dfrac{2\\pi}{3}=\\dfrac{\\sqrt{3}}{2}$.<br>
          $\\dfrac{2\\pi}{3}\\in ${choix1}$, donc $\\alpha=\\dfrac{2\\pi}{3}$.`
        this.reponse = '\\dfrac{2\\pi}{3}'
        break
      case 5:// 3pi/4
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=-\\dfrac{\\sqrt{2}}{2}$ et $\\sin(\\alpha)=\\dfrac{\\sqrt{2}}{2}$. <br>
       
        Quelle est la valeur de $\\alpha$ en radians ?`
        this.correction = `$\\cos \\dfrac{3\\pi}{4}=-\\dfrac{\\sqrt{2}}{2}$ et $\\sin \\dfrac{3\\pi}{4}=\\dfrac{\\sqrt{2}}{2}$.<br>
          $\\dfrac{3\\pi}{4}\\in ${choix1}$, donc $\\alpha=\\dfrac{3\\pi}{4}$.`
        this.reponse = '\\dfrac{3\\pi}{4}'
        break
      case 6:// 5pi/6
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=-\\dfrac{\\sqrt{3}}{2}$ et $\\sin(\\alpha)=\\dfrac{1}{2}$. <br>
       
        Quelle est la valeur de $\\alpha$ en radians ?`
        this.correction = `$\\cos \\dfrac{5\\pi}{6}=-\\dfrac{\\sqrt{3}}{2}$ et $\\sin \\dfrac{5\\pi}{6}=\\dfrac{1}{2}$.<br>
          $\\dfrac{5\\pi}{6}\\in ${choix1}$, donc $\\alpha=\\dfrac{5\\pi}{6}$.`
        this.reponse = '\\dfrac{5\\pi}{6}'
        break
      case 7:// 7pi/6
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=-\\dfrac{\\sqrt{3}}{2}$ et $\\sin(\\alpha)=-\\dfrac{1}{2}$. <br>
       
        Quelle est la valeur de $\\alpha$ en radians ?`
        if (choix1 === '[0\\,;\\,2\\pi[') {
          this.correction = `$\\cos \\dfrac{7\\pi}{6}=-\\dfrac{\\sqrt{3}}{2}$ et $\\sin \\dfrac{7\\pi}{6}=-\\dfrac{1}{2}$.<br>
          $\\dfrac{7\\pi}{6}\\in ${choix1}$, donc $\\alpha=\\dfrac{7\\pi}{6}$.`
          this.reponse = '\\dfrac{7\\pi}{6}'
        } else {
          this.correction = `$\\cos \\dfrac{-5\\pi}{6}=-\\dfrac{\\sqrt{3}}{2}$ et $\\sin \\dfrac{-5\\pi}{6}=-\\dfrac{1}{2}$.<br>
        $\\dfrac{-5\\pi}{6}\\in ${choix1}$, donc $\\alpha=\\dfrac{-5\\pi}{6}$.`
          this.reponse = '-\\dfrac{5\\pi}{6}'
        }
        break
      case 8:// 5pi/4
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=-\\dfrac{\\sqrt{2}}{2}$ et $\\sin(\\alpha)=\\dfrac{\\sqrt{2}}{2}$. <br>
       
        Quelle est la valeur de $\\alpha$ en radians ?`
        if (choix1 === '[0\\,;\\,2\\pi[') {
          this.correction = `$\\cos \\dfrac{5\\pi}{4}=-\\dfrac{\\sqrt{2}}{2}$ et $\\sin \\dfrac{5\\pi}{4}=-\\dfrac{\\sqrt{2}}{2}$.<br>
          $\\dfrac{5\\pi}{4}\\in ${choix1}$, donc $\\alpha=\\dfrac{5\\pi}{4}$.`
          this.reponse = '\\dfrac{5\\pi}{4}'
        } else {
          this.correction = `$\\cos \\dfrac{-3\\pi}{4}=-\\dfrac{\\sqrt{2}}{2}$ et $\\sin \\dfrac{-3\\pi}{4}=-\\dfrac{\\sqrt{2}}{2}}$.<br>
        $\\dfrac{-3\\pi}{4}\\in ${choix1}$, donc $\\alpha=\\dfrac{-3\\pi}{4}$.`
          this.reponse = '-\\dfrac{3\\pi}{4}'
        }
        break
      case 9:// 4pi/3
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=-\\dfrac{1}{2}$ et $\\sin(\\alpha)=-\\dfrac{\\sqrt{3}}{2}$. <br>
       
        Quelle est la valeur de $\\alpha$ en radians ?`
        if (choix1 === '[0\\,;\\,2\\pi[') {
          this.correction = `$\\cos \\dfrac{4\\pi}{3}=-\\dfrac{1}{2}$ et $\\sin \\dfrac{4\\pi}{3}=-\\dfrac{\\sqrt{3}}{2}$.<br>
          $\\dfrac{4\\pi}{3}\\in ${choix1}$, donc $\\alpha=\\dfrac{4\\pi}{3}$.`
          this.reponse = '\\dfrac{4\\pi}{3}'
        } else {
          this.correction = `$\\cos \\dfrac{-2\\pi}{3}=-\\dfrac{1}{2}$ et $\\sin \\dfrac{-2\\pi}{3}=-\\dfrac{1}{2}$.<br>
          $\\dfrac{-2\\pi}{3}\\in ${choix1}$, donc $\\alpha=\\dfrac{-2\\pi}{3}$.`
          this.reponse = '-\\dfrac{2\\pi}{3}'
        }
        break
      case 10:// 5pi/3
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=\\dfrac{1}{2}$ et $\\sin(\\alpha)=-\\dfrac{\\sqrt{3}}{2}$. <br>
       
        Quelle est la valeur de $\\alpha$ en radians ?`
        if (choix1 === '[0\\,;\\,2\\pi[') {
          this.correction = `$\\cos \\dfrac{5\\pi}{3}=\\dfrac{1}{2}$ et $\\sin \\dfrac{5\\pi}{3}=-\\dfrac{\\sqrt{3}}{2}$.<br>
          $\\dfrac{5\\pi}{3}\\in ${choix1}$, donc $\\alpha=\\dfrac{5\\pi}{3}$.`
          this.reponse = '\\dfrac{5\\pi}{3}'
        } else {
          this.correction = `$\\cos \\dfrac{-\\pi}{3}=-\\dfrac{1}{2}$ et $\\sin \\dfrac{-\\pi}{3}=-\\dfrac{\\sqrt{3}}{2}$.<br>
          $\\dfrac{-\\pi}{3}\\in ${choix1}$, donc $\\alpha=\\dfrac{-\\pi}{3}$.`
          this.reponse = '-\\dfrac{\\pi}{3}'
        }
        break
      case 11:// 7pi/4
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=\\dfrac{\\sqrt{2}}{2}$ et $\\sin(\\alpha)=-\\dfrac{\\sqrt{2}}{2}$. <br>
       
        Quelle est la valeur de $\\alpha$ en radians ?`
        if (choix1 === '[0\\,;\\,2\\pi[') {
          this.correction = `$\\cos \\dfrac{7\\pi}{4}=\\dfrac{\\sqrt{2}}{2}$ et $\\sin \\dfrac{7\\pi}{4}=-\\dfrac{\\sqrt{2}}{2}$.<br>
          $\\dfrac{7\\pi}{4}\\in ${choix1}$, donc $\\alpha=\\dfrac{7\\pi}{4}$.`
          this.reponse = '\\dfrac{7\\pi}{4}'
        } else {
          this.correction = `$\\cos \\dfrac{-\\pi}{4}=-\\dfrac{\\sqrt{2}}{2}$ et $\\sin \\dfrac{-\\pi}{4}=-\\dfrac{\\sqrt{2}}{2}$.<br>
          $\\dfrac{-\\pi}{4}\\in ${choix1}$, donc $\\alpha=\\dfrac{-\\pi}{4}$.`
          this.reponse = '-\\dfrac{\\pi}{4}'
        }
        break
      case 12:// 11pi/6
        this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=\\dfrac{\\sqrt{3}}{2}$ et $\\sin(\\alpha)=-\\dfrac{1}{2}$. <br>
       
        Quelle est la valeur de $\\alpha$ en radians ?`
        if (choix1 === '[0\\,;\\,2\\pi[') {
          this.correction = `$\\cos \\dfrac{11\\pi}{6}=\\dfrac{\\sqrt{3}}{2}$ et $\\sin \\dfrac{11\\pi}{6}=-\\dfrac{1}{2}$.<br>
          $\\dfrac{11\\pi}{6}\\in ${choix1}$, donc $\\alpha=\\dfrac{11\\pi}{6}$.`
          this.reponse = '\\dfrac{11\\pi}{6}'
        } else {
          this.correction = `$\\cos \\dfrac{-\\pi}{6}=\\dfrac{\\sqrt{3}}{2}$ et $\\sin \\dfrac{-\\pi}{6}=-\\dfrac{1}{2}$.<br>
        $\\dfrac{-\\pi}{6}\\in ${choix1}$, donc $\\alpha=\\dfrac{-\\pi}{6}$.`
          this.reponse = '-\\dfrac{\\pi}{6}'
        }
        break

      case 13:// 0, pi/2, pi, 3pi/2
        if (choix2 === 'a') {
          this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=1$. <br>
       
          Quelle est la valeur de $\\alpha$ en radians ?`
          this.correction = `$\\cos 0=1$.<br>
          $0\\in ${choix1}$, donc $\\alpha=0$.`
          this.reponse = '0'
        }
        if (choix2 === 'b') {
          this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\sin(\\alpha)=1$. <br>
        Quelle est la valeur de $\\alpha$ en radians ?`
          this.correction = ` $\\sin \\dfrac{\\pi}{2}=1$.<br>
          $\\dfrac{\\pi}{2}\\in ${choix1}$, donc $\\alpha=\\dfrac{\\pi}{2}$.`
          this.reponse = '\\dfrac{\\pi}{2}'
        }

        if (choix2 === 'c') {
          this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\cos(\\alpha)=-1$. <br>
       
          Quelle est la valeur de $\\alpha$ en radians ?`
          this.correction = `$\\cos \\pi=-1$.<br>
          $\\pi \\in ${choix1}$, donc $\\alpha=\\pi$.`
          this.reponse = '\\pi'
        }

        if (choix2 === 'd') {
          this.question = `$\\alpha$ est un réel de $${choix1}$ vérifiant $\\sin(\\alpha)=-1$. <br>
      
          Quelle est la valeur de $\\alpha$ en radians ?`
          if (choix1 === '[0\\,;\\,2\\pi[') {
            this.correction = `$\\sin \\dfrac{3\\pi}{2}=-1$.<br>
          $\\dfrac{3\\pi}{2} \\in ${choix1}$, donc $\\alpha=\\dfrac{3\\pi}{2}$.`
            this.reponse = '\\dfrac{3\\pi}{2}'
          } else {
            this.correction = `$\\sin \\dfrac{-\\pi}{2}=-1$.<br>
          $\\dfrac{-\\pi}{2} \\in ${choix1}$, donc $\\alpha=\\dfrac{-\\pi}{2}$.`
            this.reponse = '-\\dfrac{\\pi}{2}'
          }
        }

        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\alpha=\\ldots$'
  }
}
