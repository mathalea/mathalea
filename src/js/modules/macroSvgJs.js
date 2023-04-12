/* global $ */
/* eslint-disable camelcase */
import katex from 'katex'
import { SVG } from '@svgdotjs/svg.js'
import { context } from './context.js'

/**
 * Renvoie deux engrenages en HTML
 * @author Sébastien Lozano
 */

export function svgEngrenages () {
  'use strict'
  class SvgEngrenage extends HTMLElement {
    constructor () {
      super()
      const shadowRoot = this.attachShadow({ mode: 'closed' })
      const w = this.hasAttribute('width') ? this.getAttribute('width') : 120
      const h = this.hasAttribute('height') ? this.getAttribute('height') : 128
      shadowRoot.innerHTML = `
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
      width="${w}pt" height="${h}pt" viewBox="0 0 ${w} ${h}"
      preserveAspectRatio="xMidYMid meet">
     <g transform="translate(0,${h}) scale(0.01,-0.01)"
     fill="#000000" stroke="none">
     <path d="M8500 12793 c-203 -19 -252 -24 -264 -29 -21 -8 -67 -401 -84 -718
     l-7 -129 -110 -27 c-60 -15 -144 -41 -185 -58 -105 -43 -337 -154 -397 -191
     -28 -17 -53 -31 -55 -31 -3 0 -151 120 -329 266 -178 146 -330 268 -336 271
     -24 10 -229 -164 -382 -323 -147 -152 -315 -362 -303 -377 43 -57 207 -259
     347 -427 94 -113 175 -211 179 -218 4 -8 -9 -38 -34 -78 -67 -106 -145 -271
     -180 -379 -18 -55 -43 -132 -56 -172 -13 -39 -24 -78 -24 -86 0 -11 -19 -16
     -72 -21 -390 -36 -765 -79 -775 -90 -31 -30 -51 -432 -34 -649 12 -151 35
     -315 46 -325 4 -5 299 -34 757 -77 l77 -7 6 -41 c4 -23 15 -62 25 -87 10 -25
     34 -97 54 -161 39 -121 120 -293 187 -393 22 -33 38 -65 35 -73 -3 -7 -83
     -106 -179 -220 -264 -316 -348 -423 -340 -436 34 -60 195 -249 308 -363 149
     -150 382 -344 393 -328 4 6 99 86 212 179 113 93 250 207 305 254 55 48 107
     92 117 99 14 11 33 4 130 -51 134 -76 299 -144 459 -187 63 -17 121 -35 127
     -39 8 -5 23 -109 42 -302 30 -293 57 -524 64 -545 8 -21 310 -37 569 -31 206
     5 407 24 423 39 2 3 20 180 39 394 20 214 38 404 41 422 6 38 4 37 177 88 145
     43 338 128 455 201 47 30 90 52 96 49 6 -2 67 -52 136 -111 232 -200 522 -426
     537 -421 27 11 138 96 200 153 129 120 483 521 483 547 0 3 -114 141 -252 307
     -139 165 -263 313 -275 328 l-22 27 59 114 c79 151 156 344 189 471 l26 104
     185 17 c102 9 294 27 427 39 l242 23 6 26 c13 63 26 219 31 380 9 237 -17 582
     -44 599 -7 4 -197 24 -424 45 -227 21 -416 40 -420 42 -4 2 -12 30 -18 62 -27
     137 -115 364 -206 533 l-65 121 38 46 c21 26 139 171 264 323 124 152 229 281
     233 288 8 12 -71 113 -203 260 -146 162 -481 451 -504 434 -83 -63 -382 -305
     -487 -394 -75 -62 -142 -119 -151 -126 -12 -10 -54 7 -229 96 -153 76 -247
     116 -325 139 -60 18 -120 32 -132 32 -25 0 -25 -3 -49 255 -17 191 -64 608
     -68 612 -8 8 -126 23 -252 32 -130 10 -372 12 -454 4z m455 -2094 c217 -36
     427 -151 610 -333 179 -178 289 -374 335 -601 104 -501 -99 -998 -520 -1276
     -192 -127 -378 -186 -616 -196 -222 -10 -388 24 -579 117 -239 117 -419 293
     -546 534 -96 183 -134 343 -133 571 1 281 77 507 244 723 212 275 500 446 795
     471 111 9 329 4 410 -10z"/>
     <path d="M8500 10521 c-365 -80 -663 -359 -777 -727 -25 -83 -27 -101 -27
     -279 -1 -207 4 -238 65 -396 65 -169 235 -378 398 -488 90 -61 214 -117 317
     -143 128 -32 372 -32 490 0 140 38 241 86 354 170 320 238 473 583 430 970
     -27 250 -124 448 -301 617 -134 128 -274 210 -448 262 -119 35 -371 43 -501
     14z m382 -256 c228 -48 440 -209 537 -407 17 -35 41 -101 52 -147 18 -73 21
     -105 17 -235 -4 -132 -8 -161 -34 -236 -76 -227 -298 -429 -546 -496 -76 -21
     -290 -24 -358 -5 -147 40 -267 110 -374 217 -45 44 -96 106 -115 137 -222 373
     -105 862 259 1078 74 43 186 87 260 99 75 13 231 10 302 -5z"/>
     <path d="M4716 8448 c-75 -191 -162 -428 -251 -680 l-98 -278 -122 0 c-231 0
     -583 -47 -788 -106 -70 -20 -129 -35 -131 -33 -1 2 -36 51 -77 109 -140 200
     -570 790 -575 790 -10 0 -181 -68 -219 -88 -22 -11 -74 -36 -115 -56 -41 -19
     -120 -61 -175 -94 -55 -32 -148 -87 -207 -122 -105 -62 -250 -166 -342 -245
     l-46 -41 120 -259 c67 -143 171 -367 232 -498 l111 -238 -76 -77 c-196 -200
     -433 -511 -513 -675 -16 -32 -32 -57 -37 -57 -4 0 -146 24 -315 54 -329 58
     -773 129 -777 124 -8 -8 -103 -248 -140 -353 -51 -146 -135 -558 -170 -840
     l-6 -50 508 -195 508 -195 2 -95 c4 -171 23 -381 44 -489 11 -58 27 -141 35
     -183 8 -43 26 -116 39 -163 14 -47 25 -92 25 -100 0 -7 -93 -80 -207 -161
     -115 -81 -313 -224 -441 -318 -208 -152 -232 -173 -227 -193 22 -88 216 -464
     346 -672 74 -116 223 -330 264 -378 l30 -34 175 81 c172 81 736 339 796 365
     l30 14 135 -125 c169 -158 253 -221 482 -361 138 -84 182 -116 180 -130 -1
     -10 -22 -142 -47 -293 -44 -266 -116 -748 -116 -773 0 -7 15 -18 33 -26 225
     -90 426 -152 715 -220 193 -46 473 -94 483 -83 18 20 261 659 355 929 l38 113
     152 0 c262 0 447 26 712 102 122 34 146 38 157 27 7 -8 153 -212 325 -454 172
     -242 314 -442 316 -443 3 -4 91 37 361 170 112 55 243 130 345 197 145 96 331
     233 381 281 18 16 15 25 -81 241 -55 123 -159 350 -230 504 l-130 279 117 126
     c160 170 305 368 405 552 25 48 50 89 54 91 4 2 95 -11 202 -29 559 -94 883
     -145 894 -141 22 9 178 453 221 627 8 36 20 75 25 87 9 21 73 382 84 475 l6
     47 -48 21 c-62 28 -480 186 -764 290 l-228 83 0 156 c0 179 -10 281 -41 448
     -18 99 -67 314 -85 375 -4 12 44 51 188 154 217 155 695 511 703 525 7 11 -61
     171 -143 334 -116 233 -266 468 -424 667 l-77 97 -133 -58 c-184 -81 -480
     -217 -687 -317 l-173 -84 -134 127 c-142 134 -314 268 -429 336 -60 35 -183
     116 -208 137 -4 4 11 123 33 266 112 714 131 836 128 839 -2 1 -73 29 -158 62
     -180 70 -399 143 -431 143 -12 0 -47 9 -78 19 -80 28 -488 110 -546 111 -16 0
     -26 -16 -49 -72z m-181 -2623 c276 -49 564 -184 772 -363 246 -212 460 -599
     518 -936 22 -127 20 -347 -4 -488 -44 -255 -154 -525 -285 -698 -231 -307
     -631 -548 -1020 -615 -114 -19 -334 -19 -454 0 -228 37 -486 130 -646 233
     -356 230 -620 625 -702 1052 -24 127 -24 358 0 495 90 509 329 862 761 1126
     114 70 293 142 430 175 193 46 439 53 630 19z"/>
     <path d="M4175 5623 c-215 -25 -337 -62 -515 -154 -350 -181 -559 -444 -665
     -838 -50 -184 -58 -241 -59 -391 0 -142 16 -252 55 -371 24 -74 109 -259 119
     -259 3 0 34 -42 67 -92 148 -223 355 -389 609 -488 506 -198 1037 -94 1437
     280 180 168 328 436 378 682 69 343 12 664 -173 974 -199 335 -459 524 -858
     623 -134 33 -292 47 -395 34z m345 -374 c312 -78 532 -261 681 -565 68 -141
     83 -214 83 -409 0 -199 -15 -270 -90 -424 -55 -115 -112 -196 -195 -279 -290
     -285 -627 -368 -1024 -252 -258 75 -462 253 -595 519 -127 254 -139 573 -33
     816 105 236 289 424 525 535 217 102 408 119 648 59z"/>
     </g>
     </svg>
      `
    }
  }
  if (context.isHtml) {
    // Si le customElement n'existe pas dans le registre, on le crée
    if (customElements.get('svg-engrenage') === undefined) {
      customElements.define('svg-engrenage', SvgEngrenage)
    }
  }
}

/**
 * Crée un diagramme pour une fonction arithmétique à deux étapes produit puis somme
 * @param {string} id_du_div id du div contenant le SVG
 * @param {number} w largeur du div du svg
 * @param {numer} h hauteur du div du svg
 * @param {string} nom nom de la fonction
 * @param {string} xAnt antécédent de départ
 * @param {array} etapesExpressions tableau contenant les opérations et les expressions algébriques des étapes
 * @author Sébastien Lozano
 */
export function SvgMachineDiag3F12 (id_du_div, w, h, nom, xAnt, etapesExpressions) {
  'use strict'
  const interligne = 10// w/80; //h/10; // unité d'espacement
  if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
  // SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
  window.SVGExist[id_du_div] = setInterval(function () {
    if ($(`#${id_du_div}`).length) {
      $(`#${id_du_div}`).html('')// Vide le div pour éviter les SVG en doublon
      // on crée un rectangle dont la taille est adaptée au texte
      // let path_cadre_rect_ant = 'M0,0L0,-'+interligne+',L'+(w_x_ant + 2*interligne)+',-'+interligne+',L'+(w_x_ant + 2*interligne)+','+interligne+'L0,'+interligne+'Z';
      document.getElementById(id_du_div).innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ` + w + ' ' + h + '" width="' + w + `">
                      <g>
                          <path d="M0 ` + 5 * interligne + 'L0 ' + 3 * interligne + 'L' + 5 * interligne + ' ' + 3 * interligne + 'L' + 5 * interligne + ' ' + 7 * interligne + 'L0 ' + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + interligne + '" height="' + h / 2 + '" x="' + 2.5 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">` + xAnt + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                      <g>
                          <line x1="` + 5 * interligne + '" y1="' + 5 * interligne + '" x2="' + 7 * interligne + '" y2="' + 5 * interligne + `" stroke-width="3" stroke="#f15929">
                          </line>
                          <circle r="` + 2 * interligne + '" cx="' + 9 * interligne + '" cy="' + 5 * interligne + `" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </circle>
                          <path d="M` + 11 * interligne + ' ' + 5 * interligne + 'L' + 13 * interligne + ' ' + 5 * interligne + 'L' + (13 * interligne - interligne / 2) + ' ' + (5 * interligne - interligne / 2) + 'M' + 13 * interligne + ' ' + 5 * interligne + 'L' + (13 * interligne - interligne / 2) + ' ' + (5 * interligne + interligne / 2) + ` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 4 * interligne + '" height="' + h / 2 + '" x="' + 7.5 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">×` + etapesExpressions[0][0] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                      <g>
                          <path d="M` + 13 * interligne + ' ' + 5 * interligne + 'L' + 13 * interligne + ' ' + 3 * interligne + 'L' + 21 * interligne + ' ' + 3 * interligne + 'L' + 21 * interligne + ' ' + 7 * interligne + 'L' + 13 * interligne + ' ' + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 2.5 * interligne + '" height="' + h / 2 + '" x="' + 16 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">` + etapesExpressions[0][1] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                      <g>
                          <line x1="` + 21 * interligne + '" y1="' + 5 * interligne + '" x2="' + 23 * interligne + '" y2="' + 5 * interligne + `" stroke-width="3" stroke="#f15929">
                          </line>
                          <circle r="` + 2 * interligne + '" cx="' + 25 * interligne + '" cy="' + 5 * interligne + `" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </circle>
                          <path d="M` + 27 * interligne + ' ' + 5 * interligne + 'L' + 29 * interligne + ' ' + 5 * interligne + 'L' + (29 * interligne - interligne / 2) + ' ' + (5 * interligne - interligne / 2) + 'M' + 29 * interligne + ' ' + 5 * interligne + 'L' + (29 * interligne - interligne / 2) + ' ' + (5 * interligne + interligne / 2) + ` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 4 * interligne + '" height="' + h / 2 + '" x="' + 23.5 * interligne + '" y="' + h / 4 + `">
                          <body xmlns="http://www.w3.org/1999/xhtml">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">+` + etapesExpressions[1][0] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                              </body>
                          </foreignObject>
                      </g>
                      <g>
                          <path d="M` + 29 * interligne + ' ' + 5 * interligne + 'L' + 29 * interligne + ' ' + 3 * interligne + 'L' + 44 * interligne + ' ' + 3 * interligne + 'L' + 44 * interligne + ' ' + 7 * interligne + 'L' + 29 * interligne + ' ' + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 12 * interligne + '" height="' + h / 2 + '" x="' + 31 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">` + nom + '<span class="mopen">(</span>' + xAnt + '<span class="mclose">)</span><span class="mspace" style="margin-right: 0.408889em;"></span>=<span class="mspace" style="margin-right: 0.408889em;"></span>' + etapesExpressions[1][1] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                  </svg>
                  `

      clearInterval(window.SVGExist[id_du_div])// Arrête le timer
    }
  }, 100) // Vérifie toutes les 100ms
}

/**
* Crée une flèche orange pour la fonction machine
* @param {object} groupe groupe svg
* @param {string} chemin path pour la ligne
* @param {string} couleur couleur
* @author Sébastien Lozano
*/
export function SVG_fleche_machine_maths (groupe, chemin, couleur) {
  'use strict'
  return groupe.path(chemin).fill(couleur).stroke({ color: couleur, width: 1, linecap: 'round', linejoin: 'null' })
}

/** Trace un chemin pour un groupe donné avec une couleur donnée
  * @param {object} groupe groupe
  * @param {string} chemin path
  * @param {string} couleur couleur
  * @author Sébastien Lozano
  */
export function SVG_chemin (groupe, chemin, couleur) {
  'use strict'
  return groupe.path(chemin).fill('none').stroke({ color: couleur, width: 1, linecap: 'round', linejoin: 'null' })
}

/**
   * Crée un diagramme pour une fonction arithmétique à une étape produit
   * @param {string} id_du_div id du div contenant le SVG
   * @param {number} w largeur du div du svg
   * @param {numer} h hauteur du div du svg
   * @param {string} nom nom de la fonction
   * @param {string} xAnt antécédent de départ
   * @param {array} etapesExpressions tableau contenant les opérations et les expressions algébriques des étapes
   * @author Sébastien Lozano
   */
export function SvgMachineDiag3F1ActMono (id_du_div, w, h, nom, xAnt, etapesExpressions) {
  'use strict'
  const interligne = 10// w/80; //h/10; // unité d'espacement
  if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
  // SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
  window.SVGExist[id_du_div] = setInterval(function () {
    if ($(`#${id_du_div}`).length) {
      $(`#${id_du_div}`).html('')// Vide le div pour éviter les SVG en doublon
      // on crée un rectangle dont la taille est adaptée au texte
      // let path_cadre_rect_ant = 'M0,0L0,-'+interligne+',L'+(w_x_ant + 2*interligne)+',-'+interligne+',L'+(w_x_ant + 2*interligne)+','+interligne+'L0,'+interligne+'Z';
      document.getElementById(id_du_div).innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ` + w + ' ' + h + '" width="' + w + `">
                      <g>
                          <path d="M0 ` + 5 * interligne + 'L0 ' + 3 * interligne + 'L' + 5 * interligne + ' ' + 3 * interligne + 'L' + 5 * interligne + ' ' + 7 * interligne + 'L0 ' + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + interligne + '" height="' + h / 2 + '" x="' + 2.5 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">` + xAnt + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                      <g>
                          <line x1="` + 5 * interligne + '" y1="' + 5 * interligne + '" x2="' + 7 * interligne + '" y2="' + 5 * interligne + `" stroke-width="3" stroke="#f15929">
                          </line>
                          <circle r="` + 2 * interligne + '" cx="' + 9 * interligne + '" cy="' + 5 * interligne + `" fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </circle>
                          <path d="M` + 11 * interligne + ' ' + 5 * interligne + 'L' + 13 * interligne + ' ' + 5 * interligne + 'L' + (13 * interligne - interligne / 2) + ' ' + (5 * interligne - interligne / 2) + 'M' + 13 * interligne + ' ' + 5 * interligne + 'L' + (13 * interligne - interligne / 2) + ' ' + (5 * interligne + interligne / 2) + ` " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 4 * interligne + '" height="' + h / 2 + '" x="' + 7.5 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  <span class="mord mathdefault">×` + etapesExpressions[0][0] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                      <g>
                          <path d="M` + 13 * interligne + ' ' + 5 * interligne + 'L' + 13 * interligne + ' ' + 3 * interligne + 'L' + 27 * interligne + ' ' + 3 * interligne + 'L' + 27 * interligne + ' ' + 7 * interligne + 'L' + 13 * interligne + ' ' + 7 * interligne + `Z " fill="none" stroke-linejoin="null" stroke-linecap="round" stroke-width="3" stroke="#f15929">
                          </path>
                          <foreignObject width="` + 12 * interligne + '" height="' + h / 2 + '" x="' + 16 * interligne + '" y="' + h / 4 + `">
                              <div style="position: fixed">
                                  <span class="katex-display">
                                      <span class="katex">
                                          <span class="katex-html" aria-hidden="true">
                                              <span class="base">
                                                  
                                                  <span class="mord mathdefault">` + nom + '<span class="mopen">(</span>' + xAnt + '<span class="mclose">)</span><span class="mspace" style="margin-right: 0.408889em;"></span>=<span class="mspace" style="margin-right: 0.408889em;"></span>' + etapesExpressions[0][1] + `</span>
                                              </span>
                                          </span>
                                      </span>
                                  </span>
                              </div>
                          </foreignObject>
                      </g>
                  </svg>
                  `

      clearInterval(window.SVGExist[id_du_div])// Arrête le timer
    }
  }, 100) // Vérifie toutes les 100ms
}

/**
   * Fonction pour particulariser une police svg et ses paramètres
   * @param {string} font
   * @param {string} interligne
   * @param {string} ancre
   * @param {string} f_style
   * @param {string} f_weight
   * @author Sébastien Lozano
   */
export function my_svg_font (font, interligne, ancre, f_style, f_weight) {
  'use strict'
  return {
    family: font,
    size: interligne,
    anchor: ancre,
    style: f_style,
    //, leading : 0.5
    weight: f_weight
  }
}

/**
   * Fonction pour créer une machine mathématique SVG, une fonction!
   * gestion du rendu KaTeX temporaire avec insertion manuelle de balises foreignObject pour les textes
   * ATTENTION BUG SVG DONC LES ANIMATIONS SONT FILMEES A PARTIR DE CELLES GENEREES PAR LA FONCTION SVG_machine_maths() SOUS FIREFOX
   * DE FACON A AVOIR UN RENDU UNIFORME QUEL QUE SOIT LE NAVIGATEUR ON REND LES ANIMATIONS PAR DES VIDEOS
   * ON LAISSE LA PIROUETTE DE DETECTION DU USERAGENT EN COMMENTAIRE EN ATTENDANT DE TROUVER UNE SOLUTION DE RENDU LATEX DANS SVG UNIVERSELLE
   * @param {string} id_du_div id_du_div
   * @param {number} w width du svg
   * @param {number} h height du svg
   * @param {string} nom nom de la fonction
   * @param {string} etape1 etape 1 du procédé de calcul
   * @param {string} etape2 etape 2 du procédé de calcul
   * @param {string} etape3 etape 3 du procédé de calcul
   * @param {string} xLigne1 antécédent ligne1
   * @param {string} xLigne2 antécédent ligne2
   * @param {string} yLigne1 image ligne1
   * @param {string} yLigne2 image ligne2
   * @author Sébastien Lozano
   */
export function SVG_machine_maths (id_du_div, w, h, nom, etape1, etape2, etape3, xLigne1, xLigne2, yLigne1, yLigne2) {
  'use strict'
  const interligne = 15 // pour un interligne uniforme
  const prop_font = my_svg_font('Helvetica', interligne, 'start', 'normal', 'normal')
  const prop_font_nom = my_svg_font('Helvetica', interligne, 'start', 'normal', 'bold')
  const prop_font_etape = my_svg_font('Helvetica', 4 * interligne / 5, 'start', 'normal', 'normal')

  if (!window.SVGExist) { window.SVGExist = {} } // Si SVGExist n'existe pas on le créé
  // SVGExist est un dictionnaire dans lequel on stocke les listenner sur la création des div
  window.SVGExist[id_du_div] = setInterval(function () {
    if ($(`#${id_du_div}`).length) {
      $(`#${id_du_div}`).html('')// Vide le div pour éviter les SVG en doublon
      // const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h).size('100%','100%');
      const mon_svg = SVG().addTo(`#${id_du_div}`).viewbox(0, 0, w, h)
      // on trace un cadre pour le debug
      // mon_svg.path('M0,0 L'+w+',0L'+w+','+h+'L0,'+h+'Z').fill('none').stroke({ color: '#f15929', width: 1, linecap: 'round', linejoin:'null'});

      // path pour créer des fleches
      const path_fleche = 'm0,0 l-' + interligne / 2 + ',-' + interligne + ' l' + interligne + ',' + interligne + ' l-' + interligne + ',' + interligne + ' l' + interligne / 2 + ',-' + interligne + 'z'

      // On crée une timeline
      const timeline = new SVG.Timeline()

      // ------------CREATION DES GROUPES----------------------
      // ------------Antécédent--------------------------------
      const ant = mon_svg.group()

      // ------------Image-------------------------------------
      const im = mon_svg.group()

      // ------------PREPARATION DES DIMENSIONS NECESSAIRES----
      // ------------Dimension Antécédent----------------------
      const ant_ligne1 = ant.text(xLigne1).font(prop_font)
      const ant_ligne2 = ant.text(xLigne2).font(prop_font)
      const w_ant = Math.max(ant_ligne1.length(), ant_ligne2.length()) + interligne
      ant_ligne1.clear()
      ant_ligne2.clear()

      // ------------Dimension Image---------------------------
      const im_ligne1 = im.text(yLigne1).font(prop_font)
      const im_ligne2 = im.text(yLigne2).font(prop_font)
      const w_im = Math.max(im_ligne1.length(), im_ligne2.length()) + interligne
      im_ligne1.clear()
      im_ligne2.clear()

      // ------------Dimension Machine-------------------------
      // on crée des variables pour le texte à afficher sur la machine afin de récupérer leur taille
      // pour ajuster celle de la machine.
      let w_machine_nom, machine_nom, machine_etape1, w_machine_etape1, machine_etape2, w_machine_etape2, machine_etape3, w_machine_etape3
      if (nom !== '') {
        machine_nom = mon_svg.text(nom).font(prop_font_nom)
        w_machine_nom = machine_nom.length()
        machine_nom.clear()
      } else {
        w_machine_nom = 0
      }
      if (etape1 !== '') {
        machine_etape1 = mon_svg.text(etape1).font(prop_font_etape)
        w_machine_etape1 = machine_etape1.length()
        machine_etape1.clear()
      } else {
        w_machine_etape1 = 0
      }
      if (etape2 !== '') {
        machine_etape2 = mon_svg.text(etape2).font(prop_font_etape)
        w_machine_etape2 = machine_etape2.length()
        machine_etape2.clear()
      } else {
        w_machine_etape2 = 0
      }
      if (etape3 !== '') {
        machine_etape3 = mon_svg.text(etape3).font(prop_font_etape)
        w_machine_etape3 = machine_etape3.length()
        machine_etape3.clear()
      } else {
        w_machine_etape3 = 0
      }

      const w_etape_max = Math.max(w_machine_nom, w_machine_etape1, w_machine_etape2, w_machine_etape3, w_ant + interligne, w_im + interligne) + 1.5 * interligne

      // ------------GROUPE ANTECEDENT-------------------------
      const ant_ligne = ant.foreignObject(w_ant, h).attr({ x: '0', y: '0' })
      const antDiv = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
      katex.render(xLigne1 + '\\newline ' + xLigne2, antDiv, {
        displayMode: true, throwOnError: true, errorColor: '#CC0000', strict: 'ignore', trust: false
      })
      ant_ligne.add(antDiv)
      ant_ligne.dmove(0, -antDiv.offsetHeight / 2)
      const fleche_ant = SVG_fleche_machine_maths(ant, path_fleche, '#f15929')
      fleche_ant.dmove(antDiv.offsetWidth + interligne / 2, interligne)
      // on positionne le groupe antécédent
      ant.dmove(0, h / 2 - interligne)

      // ------------GROUPE IMAGE-------------------------
      const im_ligne = im.foreignObject(w_im, h).attr({ x: '0', y: '0' })
      const imDiv = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
      katex.render(yLigne1 + '\\newline ' + yLigne2, imDiv, {
        displayMode: true, throwOnError: true, errorColor: '#CC0000', strict: 'ignore', trust: false
      })
      im_ligne.add(imDiv)
      im_ligne.dmove(0, -imDiv.offsetHeight / 2)
      const fleche_im = SVG_fleche_machine_maths(im, path_fleche, '#f15929')
      fleche_im.dmove(-interligne / 2, interligne)
      // on positionne le groupe image
      im.dmove(w / 2 - imDiv.offsetWidth / 2, h / 2 - interligne)

      // ------------GROUPE MACHINE-------------------------
      // const path_machine = 'M-5,0 L-5,-5 L-5,5 M-5,0 L10,0 L10,-40 L100,-40 L100,0 L120,0 L115,-5 L120,0 L115,5 L120,0 L100,0 L100,40 L10,40 L10,0';
      const path_machine = 'M-10,0 L-10,-5 L-10,5 M-10,0 L10,0 L10,-' + (h / 2 - 5) + ' L' + (w_etape_max + 20) + ',-' + (h / 2 - 5) + ' L' + (w_etape_max + 20) + ',0 L' + (w_etape_max + 40) + ',0 L' + (w_etape_max + 35) + ',-5 L' + (w_etape_max + 40) + ',0 L' + (w_etape_max + 35) + ',5 L' + (w_etape_max + 40) + ',0 L' + (w_etape_max + 20) + ',0 L' + (w_etape_max + 20) + ',' + (h / 2 - 5) + ' L10,' + (h / 2 - 5) + ' L10,0'
      const machine = mon_svg.path(path_machine).fill('#fff').stroke({ color: '#f15929', width: 3, linecap: 'round', linejoin: 'round' })
      machine.dmove(w / 2 - w_etape_max / 2 - 20 + interligne / 2, h / 2) // w/2;  60 est la moitié de la taille de la machine en largeur

      const fobj_machine = mon_svg.foreignObject(w_etape_max, h).attr({ x: w / 2 - w_etape_max / 2, y: '0' })
      const machineDiv = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
      katex.render('\\mathbf{' + nom + '}\\newline ' + etape1 + '\\newline ' + etape2 + '\\newline ' + etape3, machineDiv, {
        displayMode: true, throwOnError: true, errorColor: '#CC0000', strict: 'ignore', trust: false
      })
      fobj_machine.add(machineDiv)
      fobj_machine.dmove(0, h / 2 - interligne - machineDiv.offsetHeight / 2)

      // ------------ANIMATION-------------------------
      ant.timeline(timeline)
      im.timeline(timeline)

      const runner1 = ant.animate(8000, 0, 'absolute').dmove(w / 2 - w_ant / 2, 0)
      const runner2 = im.animate(8000, 0, 'after').dmove(w - w_im / 2, 0)

      runner1.loop(true, false, 8000)
      runner2.loop(true, false, 8000)

      clearInterval(window.SVGExist[id_du_div])// Arrête le timer
    }
  }, 100) // Vérifie toutes les 100ms
}
