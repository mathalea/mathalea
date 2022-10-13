import { afficheLongueurSegment, codageAngle } from '../../../modules/2d/codages.js'
import { point } from '../../../modules/2d/point.js'
import { pointAdistance } from '../../../modules/2d/pointSur.js'
import { polygoneAvecNom } from '../../../modules/2d/polygone.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { choice } from '../../../modules/outils/arrays.js'
import { texteEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { randint } from '../../../modules/outils/entiers.js'
import { creerNomDePolygone } from '../../../modules/outils/strings.js'
import { texNombrec } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Déterminer une longueur avec des triangles semblables'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can4G01
*/
export const uuid = 'f0b9b'
export const ref = 'can4G01'
export default function LongueurPythagore () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: ' cm' }
  this.nouvelleVersion = function () {
    const triplet = choice([

      [6, 8, 10],
      [9, 12, 15],
      [12, 16, 20],
      [15, 20, 25],
      [18, 24, 30],
      [21, 28, 35],
      [24, 32, 40],
      [27, 36, 45],
      [30, 40, 50]
    ])
    const nom = creerNomDePolygone(3, 'QD')
    const [a, b, c] = triplet
    const A = point(0, 0, nom[0])
    const B = pointAdistance(A, b, 0, nom[1]) // triplet[1] sera la longueur c
    const C = pointAdistance(B, a, 90, nom[2]) // triplet[0] sera la longueur a
    const pol = polygoneAvecNom(A, B, C) // donc triplet[2] sera la longueur b
    const lc = afficheLongueurSegment(B, A)
    const la = afficheLongueurSegment(C, B)
    const lb = afficheLongueurSegment(A, C)

    const objets = []
    switch (randint(0, 2)) {
      case 0: // calcul du côté horizontal de l'angle droit
        objets.push(pol[0], pol[1], la, lb, codageAngle(A, B, C))
        this.question = `Un triangle dont les côtés ont pour longueurs $3$, $4$ et $5$ est un triangle rectangle.<br>

      Calculer la longueur $${nom[0]}${nom[1]}$.<br>
      
      `
        this.question += mathalea2d({ xmin: -b / 10, xmax: b + b / 10, ymin: -b / 10, ymax: C.y + b / 10, pixelsParCm: 140 / b, scale: 4 / b, style: 'margin: auto' }, objets) + '<br>'
        this.correction = ` $${nom[0]}${nom[1]}=${b}$ cm.`
        this.reponse = b
        this.canEnonce = this.question// 'Compléter'
        this.canReponseACompleter = ` $${nom[0]}${nom[1]}=\\ldots$ cm.`
        break
      case 1: // calcul du côté vertical de l'angle droit
        objets.push(pol[0], pol[1], lc, lb, codageAngle(A, B, C))
        this.question = `Un triangle dont les côtés ont pour longueurs $3$, $4$ et $5$ est un triangle rectangle.<br>
        Calculer la longueur $${nom[1]}${nom[2]}$.<br>
        
        `
        this.question += mathalea2d({ xmin: -b / 10, xmax: b + b / 10, ymin: -b / 10, ymax: C.y + b / 10, pixelsParCm: 140 / b, scale: 4 / b, style: 'margin: auto' }, objets) + '<br>'
        this.correction = ` $${nom[1]}${nom[2]}=${a}$ cm.`
        this.reponse = a
        this.canEnonce = this.question// 'Compléter'
        this.canReponseACompleter = ` $${nom[1]}${nom[2]}=\\ldots$ cm.`
        break
      case 2: // calcul de l'hypoténuse.
        objets.push(pol[0], pol[1], la, lc, codageAngle(A, B, C))
        this.question = `Un triangle dont les côtés ont pour longueurs $3$, $4$ et $5$ est un triangle rectangle.<br>
       Calculer la longueur $${nom[0]}${nom[2]}$.<br>
       
       `
        this.question += mathalea2d({ xmin: -b / 10, xmax: b + b / 10, ymin: -b / 10, ymax: C.y + b / 10, pixelsParCm: 140 / b, scale: 4 / b, style: 'margin: auto' }, objets) + '<br>'

        this.correction = ` $${nom[0]}${nom[2]}=${c}$ cm.`
        this.reponse = c
        this.canEnonce = this.question// 'Compléter'
        this.canReponseACompleter = ` $${nom[0]}${nom[2]}=\\ldots$ cm.`
        break
    }
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Les deux valeurs sur le graphique montrent que ce triangle est semblable au triangle rectangle $3$, $4$, $5$ (qui correspond à un triplet pythagoricien bien connu). <br>
    Pour obtenir ses longueurs, il suffit de multiplier les nombres $3$, $4$, $5$ par $${texNombrec(triplet[0] / 3)}$.<br>
    On obtient ainsi les longueurs : <br>
    $\\bullet$  $${texNombrec(triplet[0] / 3)}\\times 3= ${texNombrec(triplet[0])}$ cm ;<br>
    $\\bullet$  $${texNombrec(triplet[0] / 3)}\\times 4= ${texNombrec(triplet[1])}$ cm ;<br>
    $\\bullet$  $${texNombrec(triplet[0] / 3)}\\times 5= ${texNombrec(triplet[2])}$ cm ;<br>
    On obtient la longueur manquante par déduction.`)
  }
}
