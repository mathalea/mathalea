//= ================================================
// fonctions de 3F1-act
//= ================================================

/**
* Crée une machine mathématique Tikz pour la version LaTeX
* @param {string} nom nom de la machine en mode maths!
* @param {string} etape1 chaine en mode maths attention aux espaces et accents
* @param {string} etape2 chaine en mode maths attention aux espaces et accents
* @param {string} etape3 chaine en mode maths attention aux espaces et accents
* @param {string} xLigne1 chaine en mode maths attention aux espaces et accents
* @param {string} xLigne2 chaine en mode maths attention aux espaces et accents
* @param {string} yLigne1 chaine en mode maths attention aux espaces et accents
* @param {string} yLigne2 chaine en mode maths attention aux espaces et accents
* @author Sébastien Lozano
*/

export function tikzMachineMaths (nom, etape1, etape2, etape3, xLigne1, xLigne2, yLigne1, yLigne2) {
  // tous les textes sont en mode maths !!!
  'use strict'
  return `
    \\definecolor{frvzsz}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
    \\begin{tikzpicture}[line cap=round,line join=round,>=triangle 45,x=1cm,y=1cm]
    \\draw [line width=3pt,color=frvzsz] (-4,4)-- (2,4);
    \\draw [line width=3pt,color=frvzsz] (2,4)-- (2,0);
    \\draw [line width=3pt,color=frvzsz] (2,0)-- (-4,0);
    \\draw [line width=3pt,color=frvzsz] (-4,0)-- (-4,4);
    \\draw [line width=3pt,color=frvzsz] (-4,2)-- (-5,2);
    \\draw [line width=3pt,color=frvzsz] (-5,2.4)-- (-5,1.6);
    \\draw [->,line width=3pt,color=frvzsz] (2,2) -- (3,2);
    \\node[text width=3cm,text centered, scale=1.8] at(-1,3.5){$\\mathbf{machine\\,${nom}}$};
    \\node[text width=3cm,text centered, scale=1.5] at(-1,2.8){$\\mathbf{${etape1}}$};
    \\node[text width=3cm,text centered, scale=1.5] at(-1,2.3){$${etape2}$};
    \\node[text width=3cm,text centered, scale=1.5] at(-1,1.6){$${etape3}$};
    \\node[text width=3cm,text centered, scale=1.5] at(-8,2.5) {$\\mathbf{${xLigne1}}$};
    \\node[text width=3cm,text centered, scale=1.5] at(-8,1.5) {$\\mathbf{${xLigne2}}$};
    \\fill [line width=3pt,color=frvzsz] (-6,2) -- (-6.5,1) -- (-5.5,2) -- (-6.5,3) -- cycle;
    %\\fill [line width=3pt,color=frvzsz] (1,2) -- (0.5,1) -- (1.5,2) -- (0.5,3) -- cycle;
    \\node[text width=3cm,text centered, scale=1.5] at(5.5,2.5) {$\\mathbf{${yLigne1}}$};
    \\node[text width=3cm,text centered, scale=1.5] at(5.5,1.5) {$\\mathbf{${yLigne2}}$};
    \\fill [line width=3pt,color=frvzsz] (3.5,2) -- (3,1) -- (4,2) -- (3,3) -- cycle;
    \\end{tikzpicture}
    `
}

/**
   * Crée un diagramme tikz pour une machine maths
   * @param {string} nom nom de la fonction
   * @param {string} xAnt nom du nombre de départ
   * @param {array} etapesExpressions tableau contenant les etapes et le expressions algébriques
   * attention mode maths pour les chaines
   * @author Sébastien Lozano
   */
export function tikzMachineDiag (nom, xAnt, etapesExpressions) {
  'use strict'
  const xInit = -10
  let saut = 0
  const pas = 1
  let sortie = ''
  sortie += `
    \\definecolor{frvzsz}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
    \\begin{tikzpicture}[line cap=round,line join=round,>=triangle 45,x=1cm,y=1cm]
    \\draw [line width=3pt,color=frvzsz] (` + xInit + ',0.5) -- (' + (xInit + pas) + ',0.5) -- (' + (xInit + pas) + ',-0.5) -- (' + xInit + `,-0.5) -- cycle;
    \\node[text width=3cm,text centered, scale=1] at(` + (xInit + 0.5) + `,0){$${xAnt}$};
    `
  saut = saut + pas
  for (let i = 0; i < etapesExpressions.length; i++) {
    // si la longueur du tableau des etapes vaut i+1 c'est que c'est la derniere
    // on affiche donc chaque fois avec le nom de la fonction
    if (etapesExpressions.length === i + 1) {
      // si il y a une operation et une expression algébrique
      if (typeof etapesExpressions[i][0] !== 'undefined' && typeof etapesExpressions[i][1] !== 'undefined') {
        const wEtape = `${nom}(x)=${etapesExpressions[i][1]}}`.length
        sortie += `
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + `,0) circle(0.5);
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$${etapesExpressions[i][0]}$};
          \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',0.5) -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',0.5) -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-0.5) -- (' + (xInit + saut + 5 * pas / 2) + `,-0.5) -- cycle;
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + xAnt + `)=${etapesExpressions[i][1]}$};
          `
      }
      // si il y a une operation et pas d'expression algébrique
      if (typeof etapesExpressions[i][0] !== 'undefined' && typeof etapesExpressions[i][1] === 'undefined') {
        const wEtape = `${nom}(x)=\\ldots`.length
        sortie += `
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$${etapesExpressions[i][0]}$};
          \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + xAnt + `)=\\ldots$};
          `
      }
      // si il n'y a pas d'operation mais une expression algébrique
      if (typeof etapesExpressions[i][0] === 'undefined' && typeof etapesExpressions[i][1] !== 'undefined') {
        const wEtape = `${nom}(x)=${etapesExpressions[i][1]}`.length
        sortie += `
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$\\ldots$};
          \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + xAnt + `)=${etapesExpressions[i][1]}$};
          `
      }
      // si il n'y ni une operation et ni expression algébrique
      if (typeof etapesExpressions[i][0] === 'undefined' && typeof etapesExpressions[i][1] === 'undefined') {
        const wEtape = `${nom}(x)=\\ldots`.length
        sortie += `
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$\\ldots$};
          \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + xAnt + `)=\\ldots$};
          `
      }
    } else { // sinon c'est une étape intermédiaire
      // si il y a une operation et une expression algébrique
      if (typeof etapesExpressions[i][0] !== 'undefined' && typeof etapesExpressions[i][1] !== 'undefined') {
        const wEtape = `${etapesExpressions[i][1]}`.length
        sortie += `
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$${etapesExpressions[i][0]}$};
          \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${etapesExpressions[i][1]}$};
          `
        saut = saut + 3 * pas + wEtape / 4
      }
      // si il y a une operation et pas d'expression algébrique
      if (typeof etapesExpressions[i][0] !== 'undefined' && typeof etapesExpressions[i][1] === 'undefined') {
        const wEtape = '\\ldots'.length
        sortie += `
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$${etapesExpressions[i][0]}$};
          \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$\\ldots$};
          `
        saut = saut + 3 * pas + wEtape / 4
      }
      // si il n'y a pas d'operation mais une expression algébrique
      if (typeof etapesExpressions[i][0] === 'undefined' && typeof etapesExpressions[i][1] !== 'undefined') {
        const wEtape = `${etapesExpressions[i][1]}`.length
        sortie += `
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$\\ldots$};
          \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${etapesExpressions[i][1]}$};
          `
        saut = saut + 3 * pas + wEtape / 4
      }
      // si il n'y ni une operation et ni expression algébrique
      if (typeof etapesExpressions[i][0] === 'undefined' && typeof etapesExpressions[i][1] === 'undefined') {
        const wEtape = '\\ldots'.length
        sortie += `
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$\\ldots$};
          \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
          \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
          \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$\\ldots$};
          `
        saut = saut + 3 * pas + wEtape / 4
      }
    }
  }
  sortie += `
    \\end{tikzpicture}
    `
  return sortie
}
/**
 * crée un cadre orange autour d'un paragraphe
 * utilisé notamment dans 3F12 pour entourer les programmes de calcul
 * @param {string} texte paragraphe entouré par le cadre orange rectangulaire
 * @author Sébastien Lozano
 */

export function texCadreParOrange (texte) {
  'use strict'
  // \\definecolor{orangeCoop}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
  const sortie = `
     
     \\setlength{\\fboxrule}{1.5mm}
     \\par\\vspace{0.25cm}
     \\noindent\\fcolorbox{nombres}{white}{\\parbox{\\linewidth-2\\fboxrule-2\\fboxsep}{` + texte + `}}
     \\par\\vspace{0.25cm} 
     `

  return sortie
}

/**
   * affiche une video centrée dans une div
   * ATTENTION BUG SVG DONC LES ANIMATIONS SONT FILMEES A PARTIR DE CELLES GENEREES PAR LA FONCTION SVG_machine_maths() SOUS FIREFOX
   * DE FACON A AVOIR UN RENDU UNIFORME QUEL QUE SOIT LE NAVIGATEUR ON REND LES ANIMATIONS PAR DES VIDEOS
   * ON LAISSE LA PIROUETTE DE DETECTION DU USERAGENT EN COMMENTAIRE EN ATTENDANT DE TROUVER UNE SOLUTION DE RENDU LATEX DANS SVG UNIVERSELLE
   * @param {string} urlVideo
   * @author Sébastien Lozano
   */

export function machineMathsVideo (urlVideo) {
  'use strict'
  const video = `
    <div style="text-align:center"> 
    <video width="560" height="100%" controls  loop autoplay muted style="max-width: 100%">
      <source src="` + urlVideo + `">
      Votre navigateur ne gère pas l'élément <code>video</code>.
    </video>
    </div>`

  return video
}

/**
 * détecte si le navigateur et safari ou chrome et renvoie un booléen
 * @author Sébastien Lozano
 */
export function detectSafariChromeBrowser () {
  'use strict'
  let isChrome = navigator.userAgent.indexOf('Chrome') > -1
  // var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
  // var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
  let isSafari = navigator.userAgent.indexOf('Safari') > -1
  const isOpera = navigator.userAgent.toLowerCase().indexOf('op') > -1
  if ((isChrome) && (isSafari)) { isSafari = false }
  if ((isChrome) && (isOpera)) { isChrome = false }

  return (isChrome || isSafari)
}
