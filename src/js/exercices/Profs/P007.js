import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, nombreAvecEspace } from '../../modules/outils.js'
import { texteParPosition } from '../../modules/2d.js'
import { pavage } from '../../modules/Pavage.js'

export const titre = 'Fabriquer des pavages pour travailler les transformations'

/**
 * Outil de création de pavages pour le prof
 * @author Jean-Claude Lhote
 * Publié le 12/12/2020
 * Ref : P007
 */
export default function PavagesMathalea2d () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 4
  this.sup2 = '1-1'
  this.sup3 = true
  this.correctionDetaillee = false
  this.correctionDetailleeDisponible = true
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1.5)
  this.nouvelleVersion = function () {
    const objets = []
    let Nx, Ny // nombres de dalles en x et en y
    if (!this.sup2) { // On fixe le nombre de dalles en x et en y
      // Si aucune grandeur n'est saisie
      [Nx, Ny] = [1, 1]
    } else {
      if (!isNaN(this.sup2)) { // Si on ne met qu'un nombre alors on prend Nx=Ny
        [Nx, Ny] = [parseInt(this.sup2), parseInt(this.sup2)]
        this.nbQuestions = 1
      } else { // On fixe Nx et Ny avec les valeurs saisies.
        [Nx, Ny] = [parseInt(this.sup2.split('-')[0]), parseInt(this.sup2.split('-')[1])] // Sinon on créé un tableau à partir des valeurs séparées par des -
      }
    }
    this.listeCorrections = []
    this.listeQuestions = []
    let texte = ''; let texteCorr = ''

    const monpavage = pavage() // On crée l'objet Pavage qui va s'appeler monpavage
    const typeDePavage = parseInt(this.sup)
    monpavage.construit(typeDePavage, Nx, Ny, 3) // On initialise toutes les propriétés de l'objet.
    if (this.sup3) { // Doit-on afficher les Numéros ?
      for (let i = 0; i < monpavage.nb_polygones; i++) {
        objets.push(texteParPosition(nombreAvecEspace(i + 1), monpavage.barycentres[i].x + 0.3, monpavage.barycentres[i].y, 'milieu', 'black', 0.04 * monpavage.echelle, 0, true))
      }
    }
    if (this.correctionDetaillee) { // Doit-on montrer les centres des figures ?
      for (let i = 0; i < monpavage.nb_polygones; i++) {
        objets.push(monpavage.tracesCentres[i])
      }
    }
    for (let i = 0; i < monpavage.nb_polygones; i++) { // il faut afficher tous les polygones du pavage
      objets.push(monpavage.polygones[i])
    }
    texte = mathalea2d(monpavage.fenetre, objets) // monpavage.fenetre est calibrée pour faire entrer le pavage dans une feuille A4

    texteCorr = 'Le premier paramètre permet de choisir le pavage.<br>'
    texteCorr += 'Le deuxième permet de choisir le nombre de répétitions en x et y. Exemple : 3-2<br>'
    texteCorr += "Le troisième permet d'afficher un Numéro distinct sur chaque figure.<br>"
    texteCorr += 'En activant la correction détaillée, on affiche les barycentres de celles-ci.'

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de pavage', 7, '1 : Triangles équilatéraux\n2 : Carrés\n3 : Hexagones\n4 : Pavage 3².4.3.4\n5 : Pavage 8².4\n6 : Pavage hexagonal d\'écolier\n7 : Pavage 6.3.6.3']
  this.besoinFormulaire2Texte = ['Nombre de répétitions du motif (2 entiers séparés par un tiret)']
  this.besoinFormulaire3CaseACocher = ['Présence de numéros']
} // Fin de l'exercice.
