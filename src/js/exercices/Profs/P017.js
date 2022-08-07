import Exercice from '../Exercice.js'
import { arrondi, listeQuestionsToContenu, sp, texNombre, texteEnCouleurEtGras } from '../../modules/outils.js'
import { cercle, colorToLatexOrHTML, droite, longueur, mathalea2d, point, polygone, symetrieAxiale, translation, vecteur } from '../../modules/2d.js'
import FractionX from '../../modules/FractionEtendue.js'
import { context } from '../../modules/context.js'
export const titre = 'Encadrer l\'aire d\'un disque'

/**
 * Encadre l'aire d'un disque par des aires de figures composées que de carrés de même taille
 * @author Eric Elter
 * Référence P017
*/
export default function encadrerAireDisque () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.spacing = context.isHtml ? 2 : 1
  this.nbCols = 1
  this.nbQuestions = 1
  this.sup = 10
  this.sup2 = 10

  this.nouvelleVersion = function (numeroExercice) {
    let texte = ''
    this.listeQuestions = []
    this.listeCorrections = [''] // Liste de questions corrigées
    let objets = []

    const centre = point(0, 0)
    const rayon = this.sup2
    const paramsEnonce = { xmin: -rayon - 1, ymin: -rayon - 1, xmax: rayon + 1, ymax: rayon + 1, pixelsParCm: 30, scale: 0.7, mainlevee: false }
    const cerc = cercle(centre, rayon, 'red')
    cerc.epaisseur = 2
    const cote = rayon
    let D = centre
    let A = D
    let B = D
    let C = D
    let Kre, Kre2, abscisse1, abscisse2, ordonnee1, ordonnee2, aireCarre
    let compteurExterieur
    let compteurInterieur
    let longueurCoteCarreRef

    texte += `Le disque a pour rayon ${texteEnCouleurEtGras(rayon + ' cm')}.<br>
    Pour chaque étape, encadrons le disque entre une figure basée sur un maximum de carrés et une figure basée sur un minimum de carrés. 
    Encadrons ensuite l'aire du disque par l'aire de chaque figure.<br>`
    for (let Nmax = 1; Nmax <= this.sup; Nmax++) {
      texte += texteEnCouleurEtGras(` Étape ${Nmax} :`)
      compteurExterieur = 0
      compteurInterieur = 0
      objets = [cerc]
      D = centre
      A = D
      B = D
      C = D
      longueurCoteCarreRef = new FractionX(cote, Nmax)
      abscisse1 = new FractionX(0, Nmax)
      abscisse2 = new FractionX(cote, Nmax)
      aireCarre = arrondi(abscisse2 * abscisse2, 4)
      ordonnee1 = new FractionX(0, Nmax)
      ordonnee2 = longueurCoteCarreRef

      // Carres exterieurs
      for (let i = 1; i <= Nmax; i++) {
        while (longueur(centre, D) < rayon) {
          A = D
          B = translation(centre, vecteur(abscisse2.num / abscisse2.den, ordonnee1.num / ordonnee1.den))
          C = translation(centre, vecteur(abscisse2.num / abscisse2.den, ordonnee2.num / ordonnee2.den))
          D = translation(centre, vecteur(abscisse1.num / abscisse1.den, ordonnee2.num / ordonnee2.den))
          Kre = polygone([A, B, C, D], 'green')
          Kre2 = symetrieAxiale(Kre, droite(centre, point(centre.x, centre.y + 1)))
          Kre.couleurDeRemplissage = colorToLatexOrHTML('green')
          Kre.opaciteDeRemplissage = 0.5
          Kre2.color = colorToLatexOrHTML('green')
          Kre2.couleurDeRemplissage = colorToLatexOrHTML('green')
          Kre2.opaciteDeRemplissage = 0.5
          objets.push(Kre, Kre2)
          Kre = symetrieAxiale(Kre, droite(centre, point(centre.x + 1, centre.y)))
          Kre2 = symetrieAxiale(Kre2, droite(centre, point(centre.x + 1, centre.y)))
          compteurExterieur = compteurExterieur + 4
          Kre.color = colorToLatexOrHTML('green')
          Kre.couleurDeRemplissage = colorToLatexOrHTML('green')
          Kre.opaciteDeRemplissage = 0.5
          Kre2.color = colorToLatexOrHTML('green')
          Kre2.couleurDeRemplissage = colorToLatexOrHTML('green')
          Kre2.opaciteDeRemplissage = 0.5
          objets.push(Kre, Kre2)
          ordonnee1 = ordonnee2
          ordonnee2 = ordonnee2.sommeFraction(longueurCoteCarreRef)
        }
        ordonnee1 = new FractionX(0, Nmax)
        ordonnee2 = longueurCoteCarreRef
        abscisse1 = abscisse2
        abscisse2 = abscisse2.sommeFraction(longueurCoteCarreRef)
        D = translation(centre, vecteur(abscisse1.num / abscisse1.den, ordonnee1.num / ordonnee1.den))
        A = D
        B = D
        C = D
      }

      // Carres interieurs
      D = centre
      ordonnee1 = new FractionX(0, Nmax)
      ordonnee2 = longueurCoteCarreRef
      abscisse1 = new FractionX(0, Nmax)
      abscisse2 = new FractionX(cote, Nmax)
      for (let i = 1; i <= Nmax; i++) {
        A = D
        B = translation(centre, vecteur(abscisse2.num / abscisse2.den, ordonnee1.num / ordonnee1.den))
        C = translation(centre, vecteur(abscisse2.num / abscisse2.den, ordonnee2.num / ordonnee2.den))
        D = translation(centre, vecteur(abscisse1.num / abscisse1.den, ordonnee2.num / ordonnee2.den))
        while (longueur(centre, B) <= rayon && longueur(centre, C) <= rayon && longueur(centre, D) <= rayon) {
          Kre = polygone([A, B, C, D], 'blue')
          Kre2 = symetrieAxiale(Kre, droite(centre, point(centre.x, centre.y + 1)))
          Kre.couleurDeRemplissage = colorToLatexOrHTML('blue')
          Kre.opaciteDeRemplissage = 0.5
          Kre2.color = colorToLatexOrHTML('blue')
          Kre2.couleurDeRemplissage = colorToLatexOrHTML('blue')
          Kre2.opaciteDeRemplissage = 0.5
          objets.push(Kre, Kre2)
          Kre = symetrieAxiale(Kre, droite(centre, point(centre.x + 1, centre.y)))
          Kre2 = symetrieAxiale(Kre2, droite(centre, point(centre.x + 1, centre.y)))
          compteurInterieur = compteurInterieur + 4
          Kre.color = colorToLatexOrHTML('blue')
          Kre.couleurDeRemplissage = colorToLatexOrHTML('blue')
          Kre.opaciteDeRemplissage = 0.5
          Kre2.color = colorToLatexOrHTML('blue')
          Kre2.couleurDeRemplissage = colorToLatexOrHTML('blue')
          Kre2.opaciteDeRemplissage = 0.5
          objets.push(Kre, Kre2)
          ordonnee1 = ordonnee2
          ordonnee2 = ordonnee2.sommeFraction(longueurCoteCarreRef)
          A = D
          B = translation(centre, vecteur(abscisse2.num / abscisse2.den, ordonnee1.num / ordonnee1.den))
          C = translation(centre, vecteur(abscisse2.num / abscisse2.den, ordonnee2.num / ordonnee2.den))
          D = translation(centre, vecteur(abscisse1.num / abscisse1.den, ordonnee2.num / ordonnee2.den))
        }
        ordonnee1 = new FractionX(0, Nmax)
        ordonnee2 = longueurCoteCarreRef
        abscisse1 = abscisse2
        abscisse2 = abscisse2.sommeFraction(longueurCoteCarreRef)
        D = translation(centre, vecteur(abscisse1.num / abscisse1.den, ordonnee1.num / ordonnee1.den))
        A = D
        B = D
        C = D
      }
      texte += mathalea2d(paramsEnonce, objets)
      texte += `<br>${compteurInterieur} carrés < Aire du disque < ${compteurExterieur} carrés<br>`
      texte += `Or l'aire d'un carré est $${texNombre(aireCarre)}${sp()}cm^2$ (ou environ).<br>`
      texte += `$${texNombre(compteurInterieur * aireCarre)}${sp()}cm^2$ < Aire du disque < $${texNombre(compteurExterieur * aireCarre)}${sp()}cm^2$<br>`
      texte += context.isHtml ? '<br>' : '\\newpage'
    }
    this.listeQuestions.push(texte)

    listeQuestionsToContenu(this)
  }

  this.besoinFormulaireNumerique = ['Nombre d\'étapes', 50, 'Un nombre entier entre 1 et 50']
  this.besoinFormulaire2Numerique = ['Rayon du disque', 20, 'Un nombre entier entre 1 et 20']
}
