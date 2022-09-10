/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%% LES INSTRUMENTS %%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

import { ObjetMathalea2D } from './2dGeneralites'
import { context } from './context'

/**
 * Affiche (en HTML) un crayon avec la mine sur le point A
 * @param {point} A
 * @property {string} svg sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @class
 */
// JSDOC Validee par EE Juin 2022
function AfficherCrayon (A) {
  ObjetMathalea2D.call(this, { })
  this.x = A.x
  this.y = A.y
  this.svg = function () {
    const code = `<g id="${this.id}" stroke="#000000" fill="none" transform="translate(${(this.x - 0.2) * context.pixelsParCm},${-60 - (this.y - 0.2) * context.pixelsParCm}) scale(.1) ">
     <path id="rect2990" d="m70.064 422.35 374.27-374.26 107.58 107.58-374.26 374.27-129.56 21.97z" stroke-width="30"/>
     <path id="path3771" d="m70.569 417.81 110.61 110.61" stroke-width="25"/>
     <path id="path3777" d="m491.47 108.37-366.69 366.68" stroke-width="25"/>
     <path id="path3763" d="m54.222 507.26 40.975 39.546" stroke-width="25"/>
    </g>`
    return code
  }
}

/**
   * Afficher (en HTML) un crayon avec la mine sur le point A
   * @param {point} A
   * @property {string} svg sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
   * @return {AfficherCrayon}
   */
// JSDOC Validee par EE Juin 2022
export function afficherCrayon (A) {
  return new AfficherCrayon(A)
}
