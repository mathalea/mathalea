import Exercice from '../Exercice.js'
import { combinaisonListes, listeQuestionsToContenu, miseEnEvidence, numAlpha, ppcm, randint, texNombre } from '../../modules/outils.js'
import { engrenage } from '../../modules/2d.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'

export const titre = 'Exo zéro Mathalea2d'

export default class SuperExoMathalea2d extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 1
    this.nbCols = 1
    this.nbColsCorr = 1
    this.pasDeVersionLatex = false
    this.pas_de_version_HMTL = false
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []
    const typeDeQuestionsDisponibles = [1]
    const listeTypesDeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions)
    /**
     * Liste les multiples de nbDentsRoueA par séries de 5 jusqu'à mettre en évidence un multiple de nbDentsRoueB
     * @param {number} nbDentsRoueA
     * @param {number} nbDentsRoueB
     */
    const listePremiersMultiples = function (nbDentsRoueA, nbDentsRoueB) {
      let result = `Voici la liste des premiers multiples de $${nbDentsRoueA}$:<br>`
      // on va faire en sorte de toujours avoir un nombre de multiples multiple de 5
      const nbMarge = 5 - (ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueA) % 5
      const kMax = (ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueA + nbMarge)
      for (let k = 1; k < kMax + 1; k++) {
        result += `$${k}\\times${nbDentsRoueA} = `
        if (k === (ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueA)) {
          result += miseEnEvidence(texNombre(k * nbDentsRoueA, 0))
          result += '$ ; '
        } else {
          result += `${texNombre(k * nbDentsRoueA, 0)}$ ; `
        };
        if (k % 5 === 0) {
          result += '<br>'
        }
      };
      result += '$\\ldots$ '
      result += '<br>'
      return result
    }
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const objetsEnonce = []
      const objetsCorrection = []
      let nbDentsRoueA, nbDentsRoueB, nbDentsRoueC
      let rayonA, rayonB, rayonC
      let roueA, roueB, roueC
      let roueACorr, roueBCorr, roueCCorr
      let texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      let texteCorr = '' // Idem pour le texte de la correction.
      switch (listeTypesDeQuestions[i]) {
        case 1:
          nbDentsRoueA = randint(8, 20)
          nbDentsRoueB = randint(8, 20, nbDentsRoueA)
          texte += `La roue dentée de gauche possède $${nbDentsRoueA}$ dents et celle de droite possède $${nbDentsRoueB}$ dents.<br>`
          texte += `${numAlpha(0)} Au bout de combien de tours pour la roue de gauche les deux roues retrouveront leur position initiale ?<br>`
          texte += `${numAlpha(1)} Combien de tours aura fait la roue de droite ?<br>`
          texteCorr += `Lorsque la roue de gauche fait $n$ tours, cela fait $${nbDentsRoueA}n$ dents.<br>`
          texteCorr += `Lorsque la roue de gauche fait $m$ tours, cela fait $${nbDentsRoueB}m$ dents.<br>`
          texteCorr += `Nous cherchons donc le plus petit multiple commun à $${nbDentsRoueA}$ et à $${nbDentsRoueB}$.<br>`
          texteCorr += listePremiersMultiples(nbDentsRoueA, nbDentsRoueB)
          texteCorr += listePremiersMultiples(nbDentsRoueB, nbDentsRoueA)
          texteCorr += `${numAlpha(0)}Il faudra donc $${ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueA}$ tours de la roue de gauche pour que les roues retrouvent leur position initiale.<br>`
          texteCorr += `${numAlpha(1)}La roue de droite aura fait alors $${ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueB}$ tours.<br>`
          if (context.isHtml) {
            texteCorr += '<button class="btn ui labeled icon button"  style="margin:10px" onclick="document.querySelectorAll(\'animateTransform\').forEach((el)=>el.beginElement())"><i class="redo circle icon"></i>Relancer l\'animation</button>'
          }
          rayonA = nbDentsRoueA / 5
          rayonB = nbDentsRoueB / 5
          roueA = engrenage({ rayon: rayonA, rayonInt: 0.8, rayonExt: rayonA + 1, nbDents: nbDentsRoueA, xCenter: 0, yCenter: 0, angleStart: 0, couleur: 'black', couleurDeRemplissage: 'green', couleurDuTrou: 'white', dureeTour: 0, marqueur: 0 })
          roueB = engrenage({ rayon: rayonB, rayonInt: 0.8, rayonExt: rayonB + 1, nbDents: nbDentsRoueB, xCenter: rayonA + rayonB + 1.1, yCenter: 0, angleStart: 180 - 180 / nbDentsRoueB, couleur: 'black', couleurDeRemplissage: 'green', couleurDuTrou: 'white', dureeTour: 0, marqueur: 180 })
          roueACorr = engrenage({ rayon: rayonA, rayonInt: 0.8, rayonExt: rayonA + 1, nbDents: nbDentsRoueA, xCenter: 0, yCenter: 0, angleStart: 0, couleur: 'black', couleurDeRemplissage: 'green', couleurDuTrou: 'white', dureeTour: nbDentsRoueA / 2, marqueur: 0 })
          roueBCorr = engrenage({ rayon: rayonB, rayonInt: 0.8, rayonExt: rayonB + 1, nbDents: nbDentsRoueB, xCenter: rayonA + rayonB + 1.1, yCenter: 0, angleStart: 180 - 180 / nbDentsRoueB, couleur: 'black', couleurDeRemplissage: 'green', couleurDuTrou: 'white', dureeTour: -nbDentsRoueB / 2, marqueur: 180 })
          break
        case 2:

          break
        case 3:

          break
      }

      objetsEnonce.push(roueA, roueB)
      objetsCorrection.push(roueACorr, roueBCorr)

      const paramsEnonce = Object.assign({}, fixeBordures(objetsEnonce), { pixelsParCm: 20, scale: 1 })
      const paramsCorrection = Object.assign({}, fixeBordures(objetsCorrection), { pixelsParCm: 20, scale: 1 })
      texte += mathalea2d(paramsEnonce, objetsEnonce)
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
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
