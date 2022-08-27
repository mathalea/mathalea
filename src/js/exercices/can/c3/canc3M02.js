import { codageSegments, milieu, texteParPosition, mathalea2d, point, segment, codageAngleDroit } from '../../../modules/2d.js'
import { randint, choice } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer une longueur/un périmètre/une aire (avec des entiers)'
export const dateDePublication = '03/08/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/*!
 * @author Gilles Mora
 * Créé le 03/08/2022
 * Référence canc3M02
 */
export default function ProblemesDeLongueursEtPerimetreCM () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: ' cm' }
  this.nouvelleVersion = function () {
    let choix; let a; let b; let A; let B; let C; let D; let objets = []; let s1; let s2; let s3; let s4
    switch (choice([1, 2, 3, 4])) { //
      case 1:// périmètre/aire carré
        choix = choice([true, false])
        objets = []
        a = randint(3, 14)
        A = point(0, 0, 'A', 'below')
        B = point(6, 0, 'B', 'below')
        C = point(6, 6, 'C', 'below')
        D = point(0, 6, 'D', 'below')
        s1 = segment(A, B)
        s2 = segment(B, C)
        s3 = segment(C, D)
        s4 = segment(A, D)
        if (choice([true, false])) {
          objets.push(codageSegments('||', 'blue', A, B), codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, D), codageSegments('||', 'blue', A, D),
            texteParPosition(`${a} cm`, milieu(A, B).x, milieu(A, B).y - 0.8),
            codageAngleDroit(D, A, B), codageAngleDroit(A, B, C), codageAngleDroit(B, C, D), codageAngleDroit(C, D, A), s1, s2, s3, s4)
          this.question = `${choix ? 'Quel' : 'Quelle'} est ${choix ? 'le périmètre' : 'l’aire'} de ce carré ? <br>` + mathalea2d({ xmin: -0.5, ymin: -1.2, xmax: 7, ymax: 7, scale: 0.5, style: 'margin: auto' }, objets)
          this.optionsChampTexte = { texteApres: choix ? ' cm' : ' cm$^2$' }

          this.reponse = choix ? 4 * a : a * a
          this.correction = `Il s'agit d'un carré. <br>
        Son ${choix ? 'périmètre' : 'aire'} est donc 
        ${choix ? `$4$ fois la longueur de son côté, soit $4\\times ${a}=${4 * a}$ cm.` : `le carré de la longueur de son côté, soit $${a}\\times ${a}=${a * a}$ cm$^2$.`}`
        } else {
          objets.push(codageSegments('||', 'blue', A, B), codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, D), codageSegments('||', 'blue', A, D),
            texteParPosition('?', milieu(A, B).x, milieu(A, B).y - 0.8),
            codageAngleDroit(D, A, B), codageAngleDroit(A, B, C), codageAngleDroit(B, C, D), codageAngleDroit(C, D, A), s1, s2, s3, s4)
          this.question = `Le périmètre  de ce carré est $${4 * a}$ cm.<br>
            Quelle est la longueur de son côté ? <br>` + mathalea2d({ xmin: -0.5, ymin: -1.2, xmax: 7, ymax: 7, scale: 0.5, style: 'margin: auto' }, objets)
          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = a
          this.correction = `Il s'agit d'un carré. <br>
            Son côté est  donc le quart de son périmètre, soit $${4 * a}\\div 4=${a}$ cm.`
        }
        break

      case 2:// périmètre/aire rectangle
        choix = choice([true, false])
        objets = []
        a = randint(6, 11)
        b = a - randint(1, 3)
        A = point(0, 0, 'A', 'below')
        B = point(8, 0, 'B', 'below')
        C = point(8, 6, 'C', 'below')
        D = point(0, 6, 'D', 'below')
        s1 = segment(A, B)
        s2 = segment(B, C)
        s3 = segment(C, D)
        s4 = segment(A, D)

        objets.push(codageSegments('||', 'blue', A, B), codageSegments('|', 'blue', B, C),
          codageSegments('||', 'blue', C, D), codageSegments('|', 'blue', A, D),
          texteParPosition(`${a} cm`, milieu(A, B).x, milieu(A, B).y - 0.7),
          texteParPosition(`${b} cm`, milieu(B, C).x + 1.5, milieu(B, C).y),
          codageAngleDroit(D, A, B), codageAngleDroit(A, B, C), codageAngleDroit(B, C, D), codageAngleDroit(C, D, A), s1, s2, s3, s4)
        this.question = `${choix ? 'Quel' : 'Quelle'} est ${choix ? 'le périmètre' : 'l’aire'} de ce rectangle ? <br>
        La figure n'est pas à l'échelle. <br>` + mathalea2d({ xmin: -0.5, ymin: -1.2, xmax: 11, ymax: 7, scale: 0.5, style: 'margin: auto' }, objets)
        this.optionsChampTexte = { texteApres: choix ? ' cm' : ' cm$^2$' }

        this.reponse = choix ? 2 * a + 2 * b : a * b
        this.correction = `Il s'agit d'un rectangle. <br>
        Son ${choix ? 'périmètre' : 'aire'} est donc 
        ${choix ? `$2$ fois la longueur de son demi-périmètre, soit $2\\times (${a}+${b})=${2 * a + 2 * b}$ cm.` : `le produit de sa longueur par sa largeur, soit $${a}\\times ${b}=${a * b}$ cm$^2$.`}`
        break

      case 3:// périmètre/longueur triangle équi
        objets = []
        a = randint(3, 14)
        A = point(0, 0, 'A', 'below')
        B = point(6, 0, 'B', 'below')
        C = point(3, 5.2, 'C', 'below')
        s1 = segment(A, B)
        s2 = segment(B, C)
        s3 = segment(A, C)

        if (choice([true, false])) {
          objets.push(codageSegments('||', 'blue', A, B), codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, A),
            texteParPosition(`${a} cm`, milieu(A, B).x, milieu(A, B).y - 0.8),
            s1, s2, s3)
          this.question = 'Quel est  le périmètre de ce triangle ? <br>' + mathalea2d({ xmin: -0.5, ymin: -1.2, xmax: 7, ymax: 6, scale: 0.5, style: 'margin: auto' }, objets)
          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = 3 * a
          this.correction = `Le triangle est équilatéral.<br>
        Son périmètre est $3$ fois la longueur de son côté, soit $3\\times ${a}=${3 * a}$ cm.`
        } else {
          objets.push(codageSegments('||', 'blue', A, B), codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, A),
            texteParPosition('?', milieu(A, B).x, milieu(A, B).y - 0.7),
            s1, s2, s3)
          this.question = `Le périmètre de ce triangle est  $${3 * a}$ cm, quelle est la longueur de son côté ?<br>` + mathalea2d({ xmin: -0.5, ymin: -1.2, xmax: 7, ymax: 6, scale: 0.5, style: 'margin: auto' }, objets)
          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = a
          this.correction = `Puisque le triangle est équilatéral, la longueur de son côté est le tiers de son périmètre, soit $${3 * a}\\div ${3}=${a}$ cm. `
        }
        break

      case 4:// périmètre/longueur triangle isocèle
        objets = []
        a = randint(3, 7)
        b = randint(8, 12)
        A = point(0, 0, 'A', 'below')
        B = point(5, 0, 'B', 'below')
        C = point(2.5, 2, 'C', 'below')
        s1 = segment(A, B)
        s2 = segment(B, C)
        s3 = segment(A, C)

        choix = choice(['a', 'b', 'c'])//
        if (choix === 'a') {
          objets.push(codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, A),
            texteParPosition(`${b} cm`, milieu(A, B).x, milieu(A, B).y - 0.7),
            texteParPosition(`${a} cm`, milieu(B, C).x + 1, milieu(B, C).y + 0.5),
            s1, s2, s3)
          this.question = `Quel est  le périmètre de ce triangle ? <br>
        La figure n'est pas à l'échelle. <br>` + mathalea2d({ xmin: -0.5, ymin: -1.2, xmax: 6, ymax: 3, scale: 0.7, style: 'margin: auto' }, objets)
          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = 2 * a + b
          this.correction = `Le triangle est isocèle.<br>
        Son périmètre est : $2\\times ${a}+${b}=${2 * a + b}$ cm.`
        }
        if (choix === 'b') {
          objets.push(codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, A),
            texteParPosition(`${b} cm`, milieu(A, B).x, milieu(A, B).y - 0.7),
            texteParPosition('?', milieu(B, C).x + 1, milieu(B, C).y + 0.5),
            s1, s2, s3)
          this.question = `Le périmètre de ce triangle est  $${2 * a + b}$ cm, quelle est la longueur manquante ?<br>
            La figure n'est pas à l'échelle. <br>` + mathalea2d({ xmin: -0.5, ymin: -1.2, xmax: 6, ymax: 2.5, scale: 0.7, style: 'margin: auto' }, objets)
          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = a
          this.correction = `Le triangle est isocèle, il possède donc deux longueurs égales.<br>
            Puisque le périmètre est  $${2 * a + b}$ cm, on obtient la somme des deux longueurs égales  du triangle en effectuant la différence $${2 * a + b}-${b}=${2 * a}$ cm.<br>
            On obtient  la longueur cherchée en divisant par $2$, soit $${2 * a}\\div 2=${a}$ cm.`
        }
        if (choix === 'c') {
          objets.push(codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, A),
            texteParPosition('?', milieu(A, B).x, milieu(A, B).y - 0.7),
            texteParPosition(`${a} cm`, milieu(B, C).x + 1, milieu(B, C).y + 0.5),
            s1, s2, s3)
          this.question = `Le périmètre de ce triangle est  $${2 * a + b}$ cm, quelle est la longueur manquante ?<br>
                La figure n'est pas à l'échelle. <br>` + mathalea2d({ xmin: -0.5, ymin: -1.2, xmax: 6, ymax: 2.5, scale: 0.7, style: 'margin: auto' }, objets)
          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = b
          this.correction = `Le triangle est isocèle, il possède donc deux longueurs égales.<br>
                Puisque le périmètre est  $${2 * a + b}$ cm, on obtient la longueur manquante par : $${2 * a + b}-2\\times ${a}=${b}$ cm.`
        }
        break
    }
  }
}
