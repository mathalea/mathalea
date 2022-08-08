import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu, combinaisonListes, texNombre, miseEnEvidence } from '../../modules/outils.js'
export const titre = 'Comparer deux nombres entiers'

export const dateDePublication = '07/08/2022'

/**
 * Comparaison de deux nombres entiers avec deux niveaux de difficulté : avec un nombre de chiffres différents et avec le même nombre de chiffres
 * Dans le cas où les nombres ont le même nombre de chiffres, ils ont entre 1 et (max - 1) chiffres identiques
 * @author Guillaume Valmont
 * Référence 6N11-5
*/
export default class ComparerDeuxNombresEntiers extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Comparer'
    this.nbQuestions = 5

    this.besoinFormulaireNumerique = ['Difficulté', 3, '1 : Avec un nombre de chiffres différents\n2 : Avec le même nombre de chiffres\n3 : Mélange']
    this.sup = 3

    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = true

    this.spacingCorr = 1.5
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    let typeDeQuestionsDisponibles
    switch (this.sup) {
      case 1:
        typeDeQuestionsDisponibles = ['differentNbDeChiffres']
        break
      case 2:
        typeDeQuestionsDisponibles = ['memeNbDeChiffres']
        break
      default:
        typeDeQuestionsDisponibles = ['memeNbDeChiffres', 'differentNbDeChiffres']
        break
    }

    const typesDeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions)
    const nombreDeChiffres = combinaisonListes([3, 4, 5, 8], this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const nbChiffresPremierNombre = nombreDeChiffres[i]
      let nbChiffresDeuxiemeNombre, nbChiffresIdentiques
      switch (typesDeQuestions[i]) {
        case 'differentNbDeChiffres':
          nbChiffresDeuxiemeNombre = nbChiffresPremierNombre + randint(-1, 1, [0])
          nbChiffresIdentiques = 0
          break
        case 'memeNbDeChiffres':
          nbChiffresDeuxiemeNombre = nbChiffresPremierNombre
          nbChiffresIdentiques = randint(1, nbChiffresPremierNombre - 1)
          break
      }
      const partieIdentique = randint(10 ** (nbChiffresIdentiques - 1), 10 ** nbChiffresIdentiques - 1)
      const nbChiffresDifferentsPremierNombre = nbChiffresPremierNombre - nbChiffresIdentiques
      const nbChiffresDifferentsDeuxiemeNombre = nbChiffresDeuxiemeNombre - nbChiffresIdentiques
      const a = partieIdentique * 10 ** nbChiffresDifferentsPremierNombre + randint(10 ** (nbChiffresDifferentsPremierNombre - 1), 10 ** nbChiffresDifferentsPremierNombre - 1)
      const b = partieIdentique * 10 ** nbChiffresDifferentsDeuxiemeNombre + randint(10 ** (nbChiffresDifferentsDeuxiemeNombre - 1), 10 ** nbChiffresDifferentsDeuxiemeNombre - 1)
      texte = `$${texNombre(a, 0)}$ et $${texNombre(b, 0)}$`
      texteCorr = ''
      switch (typesDeQuestions[i]) {
        case 'differentNbDeChiffres':
          if (this.correctionDetaillee) {
            texteCorr += `$${texNombre(a)}$ compte ${nbChiffresPremierNombre} chiffres alors que $${texNombre(b)}$ en compte ${nbChiffresDeuxiemeNombre}.<br>`
            if (a > b) {
              texteCorr += `Comme $${texNombre(a)}$ compte plus de chiffres que $${texNombre(b)}$, alors $${texNombre(a)}$ est plus grand que $${texNombre(b)}$.<br>`
            } else {
              texteCorr += `Comme $${texNombre(a)}$ compte moins de chiffres que $${texNombre(b)}$, alors $${texNombre(a)}$ est plus petit que $${texNombre(b)}$.<br>`
            }
            texteCorr += 'On peut l\'écrire en langage mathématique :<br>'
          }
          break
        case 'memeNbDeChiffres':
          if (this.correctionDetaillee) {
            texteCorr += `$${texNombre(a)}$ et $${texNombre(b)}$ comptent le même nombre de chiffres.<br>`
            texteCorr += 'On cherche le premier chiffre différent à partir de la gauche :<br>'
            const dernierChiffreEnCommunPremierNombre = miseEnEvidenceDesChiffresEnCommun(a, b)
            const dernierChiffreEnCommunDeuxiemeNombre = miseEnEvidenceDesChiffresEnCommun(b, a)
            if (a > b) {
              texteCorr += `Comme $${dernierChiffreEnCommunPremierNombre}$ est plus grand que $${dernierChiffreEnCommunDeuxiemeNombre}$, alors $${texNombre(a)}$ est plus grand que $${texNombre(b)}$.<br>`
            } else {
              texteCorr += `Comme $${dernierChiffreEnCommunPremierNombre}$ est plus petit que $${dernierChiffreEnCommunDeuxiemeNombre}$, alors $${texNombre(a)}$ est plus petit que $${texNombre(b)}$.<br>`
            }
            function miseEnEvidenceDesChiffresEnCommun (premierChiffre, deuxiemeChiffre) {
              let dernierChiffreCommunTrouve = false
              let dernierChiffreCommun
              for (let i = 0; i < premierChiffre.toString().length; i++) {
                if (premierChiffre.toString()[i] === deuxiemeChiffre.toString()[i] && !dernierChiffreCommunTrouve) {
                  texteCorr += `$${miseEnEvidence(premierChiffre.toString()[i])}$`
                } else {
                  if (!dernierChiffreCommunTrouve) dernierChiffreCommun = premierChiffre.toString()[i]
                  dernierChiffreCommunTrouve = true
                  texteCorr += `$${premierChiffre.toString()[i]}$`
                }
              }
              texteCorr += '<br>'
              return dernierChiffreCommun
            }
            texteCorr += 'On peut l\'écrire en langage mathématique :<br>'
          }
          break
      }
      if (a > b) {
        texteCorr += `$${texNombre(a)}$ > $${texNombre(b)}$`
      } else {
        texteCorr += `$${texNombre(a)}$ < $${texNombre(b)}$`
      }
      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
