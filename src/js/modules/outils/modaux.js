import { context } from '../context'

/**
* Fonction créant le bouton d'aide utilisée par les différentes fonctions modal_ type de contenu
* @param numeroExercice
* @param contenu code HTML
* @param icone
* @author Rémi Angot
*/
export function creerModal (numeroExercice, contenu, labelBouton, icone) {
  if (context.isHtml) {
    const HTML = `<button class="ui right floated mini compact button" onclick="$('#modal${numeroExercice}').modal('show');"><i class="large ${icone} icon"></i>${labelBouton}</button>
        <div class="ui modal" id="modal${numeroExercice}">
        ${contenu}
        </div>`
    return HTML
  } else {
    return ''
  }
}
/**
  * Fonction créant le bouton d'aide utilisée par les différentes fonctions modal_ type de contenu
  * @param numeroExercice
  * @param contenu code HTML
  * @param icone
  * @author Rémi Angot
  */
export function creerBoutonMathalea2d (numeroExercice, fonction, labelBouton = 'Aide', icone = 'info circle') {
  if (context.versionMathalea === 3) {
    return `<button class="inline-block px-6 py-2.5 mr-10 my-5 ml-6 bg-coopmaths text-white font-medium text-xs leading-tight uppercase rounded shadow-md transform hover:scale-110 hover:bg-coopmaths-dark hover:shadow-lg focus:bg-coopmaths-dark focus:shadow-lg focus:outline-none focus:ring-0 active:bg-coopmaths-dark active:shadow-lg transition duration-150 ease-in-out" id = "btnMathALEA2d_${numeroExercice}" onclick="${fonction}"><i class="large ${icone} icon"></i>${labelBouton}</button>`
  } else {
    return `<button class="ui toggle left floated mini compact button" id = "btnMathALEA2d_${numeroExercice}" onclick="${fonction}"><i class="large ${icone} icon"></i>${labelBouton}</button>`
  }
}

/**
  * Créé un bouton pour une aide modale avec un texte court
  * @param numeroExercice
  * @param texte Texte court qui sera affiché comme un titre
  * @param labelBouton Titre du bouton (par défaut Aide)
  * @param icone Nom de l'icone (par défaut c'est info circle icon), liste complète sur https://semantic-ui.com/elements/icon.html
  * @author Rémi Angot
  */
export function modalTexteCourt (numeroExercice, texte, labelBouton = 'Aide', icone = 'info circle') {
  const contenu = `<div class="header">${texte}</div>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}

/**
  * Créé un bouton pour une aide modale avec un texte et une vidéo YouTube
  * @param numeroExercice
  * @param idYoutube
  * @param titre Texte court qui sera affiché comme un titre
  * @param labelBouton Titre du bouton (par défaut Aide)
  * @param icone Nom de l'icone (par défaut c'est youtube icon), liste complète sur https://semantic-ui.com/elements/icon.html
  * @author Rémi Angot
  */
export function modalYoutube (numeroExercice, idYoutube, titre, labelBouton = 'Aide - Vidéo', icone = 'youtube') {
  let contenu
  if (idYoutube.substr(0, 4) === 'http') {
    if (idYoutube.slice(-4) === '.pdf') {
      contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><object type="application/pdf" data="${idYoutube}" width="560" height="315"> </object></p></div>`
    }
    if (idYoutube.substr(0, 17) === 'https://youtu.be/') {
      contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${idYoutube.substring(17)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
    } else {
      contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><iframe width="560" height="315" sandbox="allow-same-origin allow-scripts allow-popups" src="${idYoutube}" frameborder="0" allowfullscreen></iframe></p></div>`
    }
  } else if (idYoutube.substr(0, 4) === '<ifr') {
    contenu = `<div class="header">${titre}</div><div class="content"><p align="center">${idYoutube}</p></div>`
  } else {
    contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${idYoutube}?rel=0&showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
  }
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}

/**
  * Créé un bouton pour une aide modale avec un titre et un texte
  * @param numeroExercice
  * @param titre
  * @param texte
  * @param labelBouton Titre du bouton (par défaut Aide)
  * @param icone Nom de l'icone (par défaut c'est info circle icon), liste complète sur https://semantic-ui.com/elements/icon.html
  * @author Rémi Angot
  */
export function modalTexteLong (numeroExercice, titre, texte, labelBouton = 'Aide', icone = 'info circle') {
  let contenu = `<div class="header">${titre}</div>`
  contenu += `<div class="content">${texte}</div>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}

/**
  * Créé un bouton pour une aide modale avec un titre et un texte
  * @param numeroExercice
  * @param url
  * @param labelBouton Titre du bouton (par défaut Aide)
  * @param icone Nom de l'icone (par défaut c'est info circle icon), liste complète sur https://semantic-ui.com/elements/icon.html
  * @author Rémi Angot
  */
export function modalUrl (numeroExercice, url, labelBouton = 'Aide', icone = 'info circle') {
  const contenu = `<iframe width="100%" height="600"  src="${url}" frameborder="0" ></iframe>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}

/**
  * Créé un bouton pour une aide modale avec un texte et une vidéo YouTube
  * @param numeroExercice
  * @param urlPdf
  * @param titre Texte court qui sera affiché comme un titre
  * @param labelBouton Titre du bouton (par défaut Aide)
  * @param icone Nom de l'icone (par défaut c'est file pdf icon), liste complète sur https://semantic-ui.com/elements/icon.html
  * @author Rémi Angot
  */
export function modalPdf (numeroExercice, urlPdf, titre = 'Aide', labelBouton = 'Aide - PDF', icone = 'file pdf') {
  const contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><embed src=${urlPdf} width=90% height=500 type='application/pdf'/></p></div>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}

/**
   * Créé un bouton pour une aide modale avec une vidéo
   * @param numeroExercice désigne l'id du modal qui doit être unique
   * @param urlVideo
   * @param titre Texte court qui sera affiché comme un titre
   * @param labelBouton Titre du bouton (par défaut Vidéo)
   * @param icone Nom de l'icone (par défaut c'est file video outline icon), liste complète sur https://semantic-ui.com/elements/icon.html
   * @author Sébastien Lozano
   */
export function modalVideo (numeroExercice, urlVideo, titre, labelBouton = 'Vidéo', icone = 'file video outline') {
  // let contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><iframe width="560" height="315" src="${urlVideo}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
  const contenu = `
    <div class="header">${titre}</div>
    <div class="content">
      <div class="embed-responsive embed-responsive-16by9" align="center">
        <video width="560" height="315" controls  preload="none" style="max-width: 100%">
          <source src="` + urlVideo + `">
          Votre navigateur ne gère pas l'élément <code>video</code>.
        </video>
        </div>
    </div>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}
/**
   *
   * @param {number} numeroExercice
   * @param {string} urlImage
   * @param {string} titre = ce qui est écrit en titre de l'image
   * @param {string} labelBouton = ce qui est écrit sur le bouton à côté de l'icône d'image.
   * @param {string} icone
   */
export function modalImage (numeroExercice, urlImage, titre, labelBouton = 'Illustration', icone = 'image') {
  const contenu = `<div class="header">${titre}</div><div class="image content"><img class="ui centered medium image" src="${urlImage}"></div>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}
