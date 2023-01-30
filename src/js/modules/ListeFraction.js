import { lcm } from 'mathjs'
import { listeDiviseurs } from './outils.js'

function ppcm ([...n]) {
  return parseInt(lcm(...n))
}

/**
 * Trie la liste pour la retourner dans l'ordre croissant
 * @private
 * @param {Fraction[]} liste
 * @return {Fraction[]}
 */
const sortFractions = liste => liste.slice().sort((f1, f2) => f1.valeurDecimale - f2.valeurDecimale)

/**
 * Classe ListeFraction qui propose des méthodes utiles sur les collections de fractions
 * @author Jean-Claude Lhote sur une idée de Sébastien Lozano
 */
class ListeFraction {
  constructor (...fractions) {
    /**
     * La liste des fractions passées au constructeur (une par argument)
     * @type {Fraction[]}
     */
    this.liste = fractions
    /**
     * @typedef listeNombres
     * @type {number[]}
     */
    /**
     * Les tableaux contenant les diviseurs différents de 1 de chaque dénominateur
     * @type {listeNombres[]}
     */
    this.denominateurs_amis = []
    let listetemp = []
    const dens = []
    this.liste.forEach(f => {
      dens.push(f.d)
      listetemp = listeDiviseurs(f.d)
      listetemp.splice(0, 1)
      this.denominateurs_amis.push(listetemp)
    })
    const den = ppcm(dens)
    /**
     * La liste des fractions mises au même dénominateur dans le même ordre que this.liste
     * @type {listeNombres[]}
     */
    this.listeMemeDenominateur = []
    this.liste.forEach(f => {
      this.listeMemeDenominateur.push(f.reduire(Math.round(den / f.d)))
    })

    /**
     * La liste de fraction rangée dans l'ordre croissant.
     * @type {Fraction[]}
     */
    this.listeRangee = sortFractions(this.liste)
    /**
     * La liste des fractions mises au même dénominateur par ordre croissant
     * @type {Fraction[]}
     */
    this.listeRangeeMemeDenominateur = sortFractions(this.listeMemeDenominateur)
    /**
     * la liste des fractions simplifiées (dans le même ordre que celles fournies)
     * @type {Fraction[]}
     */
    this.listeSimplifiee = this.liste.map(f => f.simplifie())
    /**
     * la liste des fractions simplifiées par ordre croissant
     * @type {Fraction[]}
     */
    this.listeRangeeSimplifiee = sortFractions(this.listeSimplifiee)
    /**
     * La liste des fractions au format LaTeX, séparées par ;
     * @type {string}
     */
    this.texListe = this.liste.map(f => f.texFraction).join(' ; ')
  }

  /**
   * @todo virer cette méthode jamais utilisée
   * @param {...Fraction}
   */
  completeListe (...frac) {
    const dens = [this.listeMemeDenominateur[0].d]
    for (let i = 0; i < frac.length; i++) {
      this.liste.push(frac[i])
      dens.push(frac[i].d)
      const listetemp = listeDiviseurs(frac[i].d)
      listetemp.splice(0, 1)
      this.denominateurs_amis.push(listetemp)
    }
    const den = ppcm(dens)
    this.listeMemeDenominateur = []
    for (let i = 0; i < this.liste.length; i++) {
      this.listeMemeDenominateur.push(this.liste[i].reduire(Math.round(den / this.liste[i].d)))
    }
    this.listeSimplifiee = []
    for (let i = 0; i < this.liste.length; i++) {
      this.listeSimplifiee.push(this.liste[i].simplifie())
    }
    this.texListe = ''
    for (let i = 0; i < this.liste.length - 1; i++) {
      this.texListe += this.liste[i].texFraction + ' ; '
    }
    this.texListe += this.liste[this.liste.length - 1].texFraction
    this.listeRangee = sortFractions(this.liste) // La liste de fraction rangée dans l'ordre croissant.
    this.listeRangeeMmeDenominateur = sortFractions(this.listeMemeDenominateur)
    this.listeRangeeSimplifiee = sortFractions(this.listeSimplifiee)
  }
}

export default ListeFraction
