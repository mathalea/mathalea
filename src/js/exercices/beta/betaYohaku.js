import { randint } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
export const titre = 'Générateur de Yohaku'

class Yohaku {
  constructor ({ largeur = 2, hauteur = 2, taille = 3, Case = null, cellules = [], operation = 'addition', valeurMax = 50 }) {
    this.largeur = largeur
    this.hauteur = hauteur
    this.Case = Case
    this.cellules = cellules
    this.resultats = []
    this.taille = taille || 2
    this.operation = operation || 'addition'
    this.valeurMax = valeurMax || 50
    // Si les cellules ne sont pas données, on en calcule le contenu aléatoirement.
    if (cellules === undefined || cellules.lenght === 0) {
      for (let i = 0; i < this.taille ** 2; i++) {
        cellules.push(randint(1, this.valeurMax))
      }
    } else { // si elles sont définies, on complète éventuellement la grille aléatoirement.
      for (let i = this.cellules.length; i < this.taille ** 2; i++) {
        cellules.push(randint(1, this.valeurMax))
      }
    }
    // On calcule les résultats
    let valeurs
    for (let i = 0; i < this.taille; i++) {
      valeurs = []
      for (let j = 0; j < this.taille; j++) {
        valeurs.push(this.cellules[i + j * this.taille])
      }
      this.operate(valeurs, i)
    }
    for (let i = this.taille; i < this.taille * 2; i++) {
      valeurs = []
      for (let j = 0; j < this.taille; j++) {
        valeurs.push(this.cellules[(i - this.taille) * this.taille + j])
      }
      this.operate(valeurs, i)
    }
  }

  operate (valeurs, i) {
    let initialValue
    switch (this.operation) {
      case 'addition':
        initialValue = 0
        this.resultats[i] = valeurs.reduce((previous, current) => previous + current, initialValue)
        break
      case 'multiplication':
        initialValue = 1
        this.resultats[i] = valeurs.reduce((previous, current) => previous * current, initialValue)
        break
    }
  }

  representation () {
  }
}

export default function fabriqueAYohaku () {
  Exercice.call(this)
  this.sup = '1/2/3/4/5/6/7/8/9'
  this.besoinFormulaireTexte = ['Données séparées par /']
  this.nouvelleVersion = function () {
    const donnees = this.sup.split('/')
    for (let i = 0; i < donnees.length; i++) {
      donnees[i] = parseInt(donnees[i])
    }

    const yohaku = new Yohaku({ taille: 3, operation: 'multiplication', cellules: donnees })
    console.log(yohaku)
  }
}
