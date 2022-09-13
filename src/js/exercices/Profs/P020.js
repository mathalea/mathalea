import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, shuffle, tableauColonneLigne } from '../../modules/outils.js'
export const titre = 'Encodeur de texte'
export default function EncodeurTexte () {
  Exercice.call(this)
  this.introduction = 'Générateur inspiré par la commande DefiTableTexte du package ProfCollege de Christophe Poulain.'
  this.consigne = 'Choisir un texte à encoder dans le formulaire en paramètre.'
  this.besoinFormulaireTexte = ['Texte à encoder (liste de mots ou de phrases séparés par /']
  this.besoinFormulaire2CaseACocher = ['Grille différente pour chaque morceau', false]
  this.sup = 'mathématiques'
  this.sup2 = false
  this.nbQuestions = 1

  const tableauDesCaracteres = Array.from('-xçwjè,k~:aq«rlgdmftbéocsà.êeipzhu\'ynvî»â!')
  tableauDesCaracteres[2] = 'ç'
  const enteteColonnes = ['×', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  for (let i = 0; i < enteteColonnes.length; i++) {
    enteteColonnes[i] = `\\colorbox{lightgrey}{${enteteColonnes[i]}}`
  }
  const enteteLignes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  for (let i = 0; i < enteteLignes.length; i++) {
    enteteLignes[i] = `\\colorbox{lightgrey}{${enteteLignes[i]}}`
  }
  function produitPourCaractere (car, map) {
    const liste = map.entries()
    for (const paire of liste) {
      if (paire[1] === car) return paire[0]
    }
    return NaN
  }
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    const texteAEncoder = this.sup.replaceAll(' ', '~').split('/') // On récupère la saisie du formulaire
    this.nbQuestions = texteAEncoder.length
    for (let j = 0; j < this.nbQuestions; j++) {
      texteAEncoder[j] = texteAEncoder[j].toLowerCase()
    }
    for (let i = 0, texte, associations, table, positionCourante, tabCar, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (i === 0 || this.sup2) { // on mélange les caractères pour la première question ou à chaque question si sup2=true
        associations = new Map() // objet qui contiendra des associations : '12' : 'a'
        table = []
        positionCourante = 0
        tabCar = shuffle(tableauDesCaracteres) // On mélange les caractères à disposition pour changer de grille à chaque fois
        // On initialise la grille (table) de 100 cases qui contiendra les caractères.
        for (let j = 0; j < 10; j++) {
          table[j] = []
          for (let k = 0, produit; k < 10; k++) {
            produit = (j + 1) * (k + 1) // La table js est indicée de 0 à 9 donc on ajoute 1 pour avoir le facteur correspondant.
            if (!associations.has(produit)) { // Ce produit n'est pas déjà associé
              associations.set(produit, tabCar[positionCourante]) // on lui associe le caractère courant
              positionCourante++ // On se positionne sur le caractère suivant n'ayant pas encore été assigné
            }
            table[j][k] = associations.get(produit) // on ajoute le caractère dans la table.
          }
        }
        texte = `${tableauColonneLigne(enteteColonnes, enteteLignes, table.flat(), 1.3, false)}`
      } else {
        texte = ''
      }
      texte += '<br><br>À l\'aide de la table ci-dessus, décoder le message suivant :<br>'
      for (let j = 0; j < texteAEncoder[i].length; j++) {
        texte += `${produitPourCaractere(texteAEncoder[i][j], associations)} `
      }
      texte += '<br><br>'

      if (this.questionJamaisPosee(i, texteAEncoder[i], table)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push('')
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
