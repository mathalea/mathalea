import { abs, round } from 'mathjs'
import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { degCos, degSin } from '../fonctionsMaths'
import { arrondi } from '../outils'
/**
 * @author Jean-Claude Lhote (Sébastien Lozano et Sylvain Chambon pour la partie tikz)
 * @param {object} parametres paramètres de l'objet voir ci-dessous
 * @param {number} [parametres.rayon] rayon du disque sans les dents
 * @param {number} [parametres.rayonExt] rayon du disque avec les dents
 * @param {number} [parametres.rayonInt] rayon du trou de l'axe
 * @param {number} [parametres.nbDents] nombre de dents souhaitées
 * @param {xCenter} [parametres.xCenter] abscisse du centre
 * @param {yCenter} [parametres.yCenter] ordonnée du centre
 * @param {string} [parametres.couleur] couleur du tracé
 * @param {string} [parametres.couleurDeRemplissage] couleur du remplissage
 * @param {string} [parametres.couleurDuTrou] couleur du disque intérieur
 * @param {number} [parametres.dureeTour] temps en secondes mis par la roue pour effectuer un tout en SVG
 * @param {number} [parametres.angleStart] angle de départ de la première dent (90 par défaut) utile pour synchroniser deux roues
 * @param {number | null} marqueur position angulaire en degrés d'un marqueur si de type number
 * @class
 * @classdesc Constructeur de roues d'engrenage animées
 * @returns {Engrenage}
 */
function Engrenage ({ rayon = 1, rayonExt, rayonInt, nbDents = 12, xCenter = 0, yCenter = 0, couleur = 'black', couleurDeRemplissage = 'black', couleurDuTrou = 'white', dureeTour = 10, angleStart = 90, marqueur = null } = {}) {
  ObjetMathalea2D.call(this)
  this.rayon = rayon
  this.rayonExt = rayonExt > rayon ? rayonExt : round(rayon * 4 / 3)
  this.rayonInt = rayonInt < rayon ? rayonInt : round(rayon * 3 / 4)
  this.nbDents = nbDents
  this.xCenter = xCenter
  this.yCenter = yCenter
  this.dureeTour = dureeTour
  this.marqueur = marqueur
  this.color = colorToLatexOrHTML(couleur)
  this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
  this.couleurDuTrou = colorToLatexOrHTML(couleurDuTrou)
  this.angleStart = angleStart
  this.bordures = [xCenter - rayonExt - 0.2, yCenter - rayonExt - 0.2, xCenter + rayonExt + 0.2, yCenter + rayonExt + 0.2]
  this.svg = function (coeff) {
    const xC = this.xCenter * coeff
    const yC = -this.yCenter * coeff
    const R1 = round(this.rayon * coeff)
    const R2 = round(this.rayonExt * coeff)
    const R0 = round(this.rayonInt * coeff)
    const angle = 360 / this.nbDents
    const r1x = round(R2 - R1)
    const r1y = round(R1 * degSin(0.125 * angle))
    const Ax = round(xC + R1 * degCos(angle * 0.25 + this.angleStart))
    const Ay = round(yC + R1 * degSin(angle * 0.25 + this.angleStart))
    let code = `<g class="roueEngrenage" id=roue${this.id}>
      <path stroke="${this.color[0]}" fill="${this.couleurDeRemplissage[0]}"
        d="M ${Ax},${Ay} `
    for (let i = 0; i < this.nbDents; i++) {
      const Bx = round(xC + R1 * degCos(angle * (-i - 0.25) + this.angleStart))
      const By = round(yC + R1 * degSin(angle * (-i - 0.25) + this.angleStart))
      const Cx = round(xC + R2 * degCos(angle * (-i + 0.125) + this.angleStart))
      const Cy = round(yC + R2 * degSin(angle * (-i + 0.125) + this.angleStart))
      const Dx = round(xC + R2 * degCos(angle * (-i - 0.125) + this.angleStart))
      const Dy = round(yC + R2 * degSin(angle * (-i - 0.125) + this.angleStart))
      const Ex = round(xC + R1 * degCos(angle * (-i - 0.75) + this.angleStart))
      const Ey = round(yC + R1 * degSin(angle * (-i - 0.75) + this.angleStart))
      code += `A${r1x},${r1y} ${180 + this.angleStart - i * angle},0 0 ${Cx},${Cy} L${Dx},${Dy} A${r1x},${r1y} ${round(180 + this.angleStart - (i - 0.125) * angle)}, 0, 0 ${Bx},${By} A${R1},${R1} 0, 0, 0 ${Ex},${Ey} `
    }
    code += 'Z"/>'
    if (typeof this.marqueur === 'number') code += `<circle cx="${round(xC + (R1 - 5) * degCos(this.marqueur))}" cy="${round(yC + (R1 - 5) * degSin(this.marqueur))}" r="3" stroke="HotPink" fill="Sienna" />`
    if (this.dureeTour !== 0) {
      code += `<animateTransform
        id="animRoue${this.id}"
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 ${xC} ${yC}"
        to="${this.dureeTour < 0 ? -360 : 360} ${xC} ${yC}"
        dur="${abs(this.dureeTour)}"
        repeatCount="indefinite"
        />
        </g>
        <circle cx="${xC}" cy="${yC}" r="${R0}" stroke="${this.color[0]}" fill="${this.couleurDuTrou[0]}" />
        <text class="compteurDeTours" id="compteur${this.id}" fill="red" align="middle" dominant-baseline="middle" text-anchor="middle" x="${xC}" y="${yC}">0</text>`
    } else {
      code += `</g>
        <circle cx="${xC}" cy="${yC}" r="${R0}" stroke="${this.color[0]}" fill="${this.couleurDuTrou[0]}" />`
    }
    return code
  }
  this.tikz = function () {
    const R1 = this.rayon
    const R2 = this.rayonExt
    const R0 = this.rayonInt
    let code = `% engrenage de rayon ${this.rayon}, avec ${this.nbDents} dents centré en (${this.xCenter};${this.yCenter})
      \\foreach \\i in {1,2,...,${this.nbDents}}{
                    \\pgfmathparse{360*(\\i-1)/${this.nbDents}}\\let\\angle\\pgfmathresult
                    \\begin{scope}[shift={(${this.xCenter},${this.yCenter})}]
                        \\pgfmathparse{${this.rayon}*degCos(${this.angleStart}+90/${this.nbDents})}\\let\\Ax\\pgfmathresult 
                    \\pgfmathparse{${R1}*sin(${this.angleStart}+90/${this.nbDents})}\\let\\Ay\\pgfmathresult
                    \\pgfmathparse{${R1}*cos(${this.angleStart}-90/${this.nbDents})}\\let\\Bx\\pgfmathresult
                    \\pgfmathparse{${R1}*sin(${this.angleStart}-90/${this.nbDents})}\\let\\By\\pgfmathresult
                    \\pgfmathparse{${R2}*cos(${this.angleStart}+45/${this.nbDents})}\\let\\Cx\\pgfmathresult
                    \\pgfmathparse{${R2}*sin(${this.angleStart}+45/${this.nbDents})}\\let\\Cy\\pgfmathresult
                    \\pgfmathparse{${R2}*cos(${this.angleStart}-45/${this.nbDents})}\\let\\Dx\\pgfmathresult
                    \\pgfmathparse{${R2}*sin(${this.angleStart}-45/${this.nbDents})}\\let\\Dy\\pgfmathresult
                    \\pgfmathparse{${this.angleStart}-90/${this.nbDents}}\\let\\a\\pgfmathresult
                    \\pgfmathparse{${this.angleStart}-270/${this.nbDents}}\\let\\b\\pgfmathresult
                    \\fill[${this.couleurDeRemplissage[1]},draw,rotate=\\angle] (0,0) -- (\\Ax,\\Ay) to[bend left=15] (\\Cx,\\Cy) -- (\\Dx,\\Dy) to[bend left=15] (\\Bx,\\By) arc (\\a:\\b:${R1}cm) -- cycle; 
                    \\draw[${this.color[1]},rotate=\\angle] (\\Ax,\\Ay) to[bend left=15] (\\Cx,\\Cy) -- (\\Dx,\\Dy) to[bend left=15] (\\Bx,\\By) arc (\\a:\\b:${R1}cm); 
                    \\end{scope}}
                \\fill[${this.couleurDuTrou[1]},draw=${this.color[1]}] (${this.xCenter},${this.yCenter}) circle (${R0});
    `
    if (typeof this.marqueur === 'number') {
      code += `\\fill[HotPink,draw=black] (${arrondi(this.xCenter + (R1 - 0.2) * degCos(this.marqueur), 2)},${arrondi(this.yCenter + (R1 - 0.2) * degSin(this.marqueur), 2)}) circle (0.1degS);
  `
    }
    return code
  }
}

/**
   * @author Jean-Claude Lhote (Sébastien Lozano et Sylvain Chambon pour la partie tikz)
   * @param {object} parametres paramètres de l'objet voir ci-dessous
   * @param {number} [parametres.rayon] rayon du disque sans les dents
   * @param {number} [parametres.rayonExt] rayon du disque avec les dents
   * @param {number} [parametres.rayonInt] rayon du trou de l'axe
   * @param {number} [parametres.nbDents] nombre de dents souhaitées
   * @param {xCenter} [parametres.xCenter] abscisse du centre
   * @param {yCenter} [parametres.yCenter] ordonnée du centre
   * @param {string} [parametres.couleur] couleur du tracé
   * @param {string} [parametres.couleurDeRemplissage] couleur du remplissage
   * @param {string} [parametres.couleurDuTrou] couleur du disque intérieur
   * @param {number} [parametres.dureeTour] temps en secondes mis par la roue pour effectuer un tout en SVG
   * @param {number} [parametres.angleStart] angle de départ de la première dent (90 par défaut) utile pour synchroniser deux roues
   * @param {number | null} marqueur position angulaire en degrés d'un marqueur si de type number
   * @returns {Engrenage}
   */
function engrenage ({ rayon = 1, rayonExt = 1.3, rayonInt = 0.75, nbDents = 12, xCenter = 0, yCenter = 0, couleur = 'black', couleurDeRemplissage = 'black', couleurDuTrou = 'white', dureeTour = 10, angleStart = 90, marqueur = null } = {}) {
  return new Engrenage({ rayon, rayonExt, rayonInt, nbDents, xCenter, yCenter, couleur, couleurDeRemplissage, couleurDuTrou, dureeTour, angleStart, marqueur })
}

/**
 *
 * @param {number} dureeTourBase temps en secondes por que la première roue fasse un tour. La vitesse des autres roues est règlée sur celle-ci
 * @param {number} module paramètre dimensionnel générateur. Les valeurs sont généralement comprise entre 0.3 et 1
 * @param nbDents
 * @returns {*[]}
 */
export function engrenages (dureeTourBase, module, ...nbDents) {
  const roues = []
  let x = 0; const y = 0
  let d1, d2
  let dureeTour = dureeTourBase
  let angleStart = 0
  for (let i = 0; i < nbDents.length - 1; i++) {
    d1 = module * nbDents[i]
    d2 = module * nbDents[i + 1]
    const entraxe = (d1 + d2) / 2 // Formule trouvée sur carrefour-numerique.cite-sciences.fr et réduite pour un angle de pression de 20° en ajoutant du jeux.
    roues.push(engrenage({ marqueur: 0, dureeTour, angleStart, rayonInt: module, rayon: d1 * 0.5 - 0.625 * module, rayonExt: d1 * 0.5 + module / 2, nbDents: nbDents[i], xCenter: x, yCenter: y, couleurDeRemplissage: 'green', couleur: 'black', couleurDuTrou: 'white' }))
    x += entraxe
    console.log('diamètre primitif 1', d1, 'diamètre primitif 2', d2, 'entraxe ', entraxe, 'rayon intérieur ', d1 * 0.5 - 0.625 * module, 'rayon extérieur ', d1 * 0.5 + module / 2)
    if (angleStart === 0) {
      if (nbDents[i + 1] % 2 === 0) {
        angleStart = 180 / nbDents[i + 1]
      } else {
        angleStart = 0
      }
    } else {
      if (nbDents[i + 1] % 2 === 0) {
        angleStart = 0
      } else {
        angleStart = 180 / nbDents[i + 1]
      }
    }
    dureeTour = -dureeTour * d2 / d1
  }
  roues.push(engrenage({ marqueur: 0, dureeTour, angleStart, rayonInt: module, rayon: d2 * 0.5 - 0.625 * module, rayonExt: d2 * 0.5 + module / 2, nbDents: nbDents[nbDents.length - 1], xCenter: x, yCenter: y, couleurDeRemplissage: 'green', couleur: 'black', couleurDuTrou: 'white' }))
  return roues
}
