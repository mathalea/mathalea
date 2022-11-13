import Exercice from '../Exercice.js'
import { combinaisonListes, contraindreValeur, listeQuestionsToContenu, miseEnEvidence, numAlpha, ppcm, randint, texNombre } from '../../modules/outils.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { engrenages } from '../../modules/2d/engrenage.js'

export const titre = 'Problèmes avec des engrenages'
export const dateDePublication = '05/10/2022'

/**
 * @author Jean-Claude Lhote
 * Résoudre des problèmes de ppcm avec les engrenages.
 */
export const uuid = '6b37f'
export const ref = '3A12-0'
export default class EngrenagesAnimes extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 1
    this.nbCols = 1
    this.nbColsCorr = 1
    this.sup = 1
    this.sup2 = false
    this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Calculer le nombre de dents\n2 : Calculer le nombre de tours\n3 : Synchroniser 3 roues\n4 : Mélange']
    this.besoinFormulaire2CaseACocher = ['Arrêt de l\'animation après un cycle']
  }

  // eslint-disable-next-line no-unused-vars

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.sup = contraindreValeur(1, 4, this.sup, 1)
    const typeDeQuestionsDisponibles = this.sup === 1 ? [1, 2] : this.sup === 2 ? [3, 4] : this.sup === 3 ? [5] : [1, 2, 3, 4, 5]
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
      let interA, interB, interC, interABC
      let nbDentsRoueA, nbDentsRoueB, nbDentsRoueC
      let nbToursA, nbToursB, nbToursC, nbToursAbc
      let roueACorr, roueBCorr, roueCCorr
      let texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      let texteCorr = '' // Idem pour le texte de la correction.
      let remiseAZero
      const divM2d = document.createElement('div') // Notre nouveau div de type HTMLElement (et non plus un string)
      let roues = []
      let rouesCorr
      switch (listeTypesDeQuestions[i]) {
        case 1:
          do {
            nbDentsRoueA = randint(8, 25)
            nbDentsRoueB = randint(8, 25, nbDentsRoueA)
            nbToursA = ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueA
            nbToursB = ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueB
          } while ((nbToursA > 4 && nbToursB > 4) || nbToursA === 1 || nbToursB === 1) // au moins une des deux roues fait moins de 5 tours
          texte += `La roue dentée de gauche possède $${nbDentsRoueA}$ dents (le dessin n'est pas représentatif).<br>`
          texte += `Quand elle effectue $${nbToursA}$ tours, la roue de droite effectue $${nbToursB}$ tours.<br>`
          texte += 'Combien la roue de droite possède-t-elle de dents ?<br>'
          texteCorr += 'Le nombre de dents multiplié par le nombre de tours de chaque roue doit donner le même résultat.<br>'
          texteCorr = `La roue de gauche effectue $${nbToursA}$ tours, donc tourne de $${nbToursA}\\times ${nbDentsRoueA}=${nbDentsRoueA * nbToursA}$ dents.<br>`
          texteCorr += `Soit $n$ le nombre de dents de la roue de droite qui effectue $${nbToursB}$ tours, on a alors : $n\\times${nbToursB} = ${nbDentsRoueA}\\times ${nbToursA} = ${nbDentsRoueA * nbToursA}$.<br>`
          texteCorr += `On en déduit que $n=\\dfrac{${nbDentsRoueA * nbToursA}}{${nbToursB}}=${nbDentsRoueB}$<br>`
          texteCorr += `La roue de droite a donc $${nbDentsRoueB}$ dents.<br>`
          roues = engrenages(0, 0.5, nbDentsRoueA, nbDentsRoueB)
          roues[1].marqueur = 180
          rouesCorr = engrenages(Math.ceil(20 / Math.max(nbToursA, nbToursB)), 0.5, nbDentsRoueA, nbDentsRoueB)
          roueACorr = rouesCorr[0]
          roueBCorr = rouesCorr[1]
          roueBCorr.marqueur = 180
          remiseAZero = () => {
            clearInterval(interABC)
            clearInterval(interA)
            clearInterval(interB)
            clearInterval(interC)
            const animRoueA = divM2d.querySelector(`#animRoue${roueACorr.id}`)
            const animRoueB = divM2d.querySelector(`#animRoue${roueBCorr.id}`)
            animRoueA.beginElement()
            animRoueB.beginElement()
            const compteurRoueA = divM2d.querySelector(`#compteur${roueACorr.id}`)
            const compteurRoueB = divM2d.querySelector(`#compteur${roueBCorr.id}`)
            compteurRoueA.innerHTML = '0'
            compteurRoueB.innerHTML = '0'
            interA = setInterval(() => {
              compteurRoueA.innerHTML = parseInt(compteurRoueA.innerHTML) + 1
            }, animRoueA.getAttribute('dur') * 1000)
            interB = setInterval(() => {
              compteurRoueB.innerHTML = parseInt(compteurRoueB.innerHTML) + 1
            }, animRoueB.getAttribute('dur') * 1000)
            if (this.sup2) {
              interABC = setInterval(() => {
                animRoueA.endElement()
                animRoueB.endElement()
                clearInterval(interA)
                clearInterval(interB)
              }, ppcm(2 * parseFloat(animRoueA.getAttribute('dur')), 2 * parseFloat(animRoueB.getAttribute('dur'))) * 500)
            }
          }

          break
        case 2:
          do {
            nbDentsRoueA = randint(8, 25)
            nbDentsRoueB = randint(8, 25, nbDentsRoueA)
            nbToursA = ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueA
            nbToursB = ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueB
          } while ((nbToursA > 4 && nbToursB > 4) || nbToursA === 1 || nbToursB === 1) // au moins une des deux roues fait moins de 5 tours
          texte += `La roue dentée de gauche possède $${nbDentsRoueA}$ dents (le dessin n'est pas représentatif).<br>`
          texte += `Elle tourne de $${nbToursA * nbDentsRoueA}$ dents. Pendant ce temps, la roue de droite fait $${nbToursB}$ tour${nbToursB > 1 ? 's' : ''}.<br>`
          texte += 'Combien la roue de droite possède-t-elle de dents ?<br>'
          texteCorr += 'Le nombre de dents multiplié par le nombre de tours de chaque roue doit donner le même résultat.<br>'
          texteCorr += `La roue de gauche tourne de $${nbToursA * nbDentsRoueA}$ dents en $${nbToursA}$ tours.<br>`
          texteCorr += `Soit $n$ le nombre de dents de la roue de droite, on a alors : $n\\times${nbToursB} = ${nbDentsRoueA * nbToursA}$.<br>`
          texteCorr += `On en déduit que $n=\\dfrac{${nbDentsRoueA * nbToursA}}{${nbToursB}}=${nbDentsRoueB}$<br>`
          texteCorr += `La roue de droite a donc $${nbDentsRoueB}$ dents.<br>`
          roues = engrenages(0, 0.5, nbDentsRoueA, nbDentsRoueB)
          roues[1].marqueur = 180
          rouesCorr = engrenages(Math.ceil(20 / Math.max(nbToursA, nbToursB)), 0.5, nbDentsRoueA, nbDentsRoueB)
          roueACorr = rouesCorr[0]
          roueBCorr = rouesCorr[1]
          roueBCorr.marqueur = 180
          remiseAZero = () => {
            clearInterval(interABC)
            clearInterval(interA)
            clearInterval(interB)
            clearInterval(interC)
            const animRoueA = divM2d.querySelector(`#animRoue${roueACorr.id}`)
            const animRoueB = divM2d.querySelector(`#animRoue${roueBCorr.id}`)
            animRoueA.beginElement()
            animRoueB.beginElement()
            const compteurRoueA = divM2d.querySelector(`#compteur${roueACorr.id}`)
            const compteurRoueB = divM2d.querySelector(`#compteur${roueBCorr.id}`)
            compteurRoueA.innerHTML = '0'
            compteurRoueB.innerHTML = '0'
            interA = setInterval(() => {
              compteurRoueA.innerHTML = parseInt(compteurRoueA.innerHTML) + 1
            }, animRoueA.getAttribute('dur') * 1000)
            interB = setInterval(() => {
              compteurRoueB.innerHTML = parseInt(compteurRoueB.innerHTML) + 1
            }, animRoueB.getAttribute('dur') * 1000)
            if (this.sup2) {
              interABC = setInterval(() => {
                animRoueA.endElement()
                animRoueB.endElement()
                clearInterval(interA)
                clearInterval(interB)
              }, ppcm(2 * parseFloat(animRoueA.getAttribute('dur')), 2 * parseFloat(animRoueB.getAttribute('dur'))) * 500)
            }
          }

          break
        case 3:
          do {
            nbDentsRoueA = randint(8, 25)
            nbDentsRoueB = randint(8, 25, nbDentsRoueA)
            nbToursA = ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueA
            nbToursB = ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueB
          } while ((nbToursA > 4 && nbToursB > 4) || nbToursA === 1 || nbToursB === 1) // au moins une des deux roues fait moins de 5 tours
          texte += `La roue dentée de gauche possède $${nbDentsRoueA}$ dents et celle de droite possède $${nbDentsRoueB}$ dents.<br>`
          texte += `${numAlpha(0)} Au bout de combien de tours pour la roue de gauche les deux roues retrouveront leur position initiale ?<br>`
          texte += `${numAlpha(1)} Combien de tours aura alors effectués la roue de droite ?<br>`
          texteCorr += `Lorsque la roue de gauche effectue $n$ tours, cela fait $${nbDentsRoueA}n$ dents.<br>`
          texteCorr += `Lorsque la roue de gauche effectue $m$ tours, cela fait $${nbDentsRoueB}m$ dents.<br>`
          texteCorr += `Nous cherchons donc le plus petit multiple commun à $${nbDentsRoueA}$ et à $${nbDentsRoueB}$.<br>`
          texteCorr += listePremiersMultiples(nbDentsRoueA, nbDentsRoueB)
          texteCorr += listePremiersMultiples(nbDentsRoueB, nbDentsRoueA)
          texteCorr += `${numAlpha(0)}Il faudra donc $${nbToursA}$ tours de la roue de gauche pour que les roues retrouvent leur position initiale.<br>`
          texteCorr += `${numAlpha(1)}La roue de droite aura effectué alors $${nbToursB}$ tours.<br>`
          roues = engrenages(0, 0.5, nbDentsRoueA, nbDentsRoueB)
          roues[1].marqueur = 180
          rouesCorr = engrenages(Math.ceil(20 / Math.max(nbToursA, nbToursB)), 0.5, nbDentsRoueA, nbDentsRoueB)
          roueACorr = rouesCorr[0]
          roueBCorr = rouesCorr[1]
          roueBCorr.marqueur = 180
          remiseAZero = () => {
            clearInterval(interABC)
            clearInterval(interA)
            clearInterval(interB)
            clearInterval(interC)
            const animRoueA = divM2d.querySelector(`#animRoue${roueACorr.id}`)
            const animRoueB = divM2d.querySelector(`#animRoue${roueBCorr.id}`)
            animRoueA.beginElement()
            animRoueB.beginElement()
            const compteurRoueA = divM2d.querySelector(`#compteur${roueACorr.id}`)
            const compteurRoueB = divM2d.querySelector(`#compteur${roueBCorr.id}`)
            compteurRoueA.innerHTML = '0'
            compteurRoueB.innerHTML = '0'
            interA = setInterval(() => {
              compteurRoueA.innerHTML = parseInt(compteurRoueA.innerHTML) + 1
            }, animRoueA.getAttribute('dur') * 1000)
            interB = setInterval(() => {
              compteurRoueB.innerHTML = parseInt(compteurRoueB.innerHTML) + 1
            }, animRoueB.getAttribute('dur') * 1000)
            if (this.sup2) {
              interABC = setInterval(() => {
                animRoueA.endElement()
                animRoueB.endElement()
                clearInterval(interA)
                clearInterval(interB)
              }, ppcm(2 * parseFloat(animRoueA.getAttribute('dur')), 2 * parseFloat(animRoueB.getAttribute('dur'))) * 500)
            }
          }
          break
        case 4:
          do {
            nbDentsRoueA = randint(8, 25)
            nbDentsRoueB = randint(8, 25, nbDentsRoueA)
            nbToursA = ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueA
            nbToursB = ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueB
          } while ((nbToursA > 4 && nbToursB > 4) || nbToursA === 1 || nbToursB === 1) // au moins une des deux roues fait moins de 5 tours
          texte += `La roue dentée de gauche possède $${nbDentsRoueA}$ dents et la roue de droite en possède $${nbDentsRoueB}$ (le dessin n'est pas représentatif).<br>`
          texte += `La roue de gauche tourne de $${nbToursA * nbDentsRoueA}$ dents.<br>Pendant ce temps, combien la roue de droite effectue-t-elle de tours ?<br>`
          texteCorr += 'Le nombre de dents multiplié par le nombre de tours de chaque roue doit donner le même résultat.<br>'
          texteCorr += `La roue de gauche tourne de $${nbToursA * nbDentsRoueA}$ dents.<br>`
          texteCorr += `Soit $n$ le nombre de tours de la roue de droite qui a $${nbDentsRoueB}$ dents, on a alors : $n\\times${nbDentsRoueB} = ${nbDentsRoueA * nbToursA}$.<br>`
          texteCorr += `On en déduit que $n=\\dfrac{${nbDentsRoueA * nbToursA}}{${nbDentsRoueB}}=${nbToursB}$<br>`
          texteCorr += `La roue de droite a donc effectué $${nbToursB}$ tours pendant que la roue de gauche en a effectués $${nbToursA}$.<br>`
          roues = engrenages(0, 0.5, nbDentsRoueA, nbDentsRoueB)
          roues[1].marqueur = 180
          rouesCorr = engrenages(Math.ceil(20 / Math.max(nbToursA, nbToursB)), 0.5, nbDentsRoueA, nbDentsRoueB)
          roueACorr = rouesCorr[0]
          roueBCorr = rouesCorr[1]
          roueBCorr.marqueur = 180
          remiseAZero = () => {
            clearInterval(interABC)
            clearInterval(interA)
            clearInterval(interB)
            clearInterval(interC)
            const animRoueA = divM2d.querySelector(`#animRoue${roueACorr.id}`)
            const animRoueB = divM2d.querySelector(`#animRoue${roueBCorr.id}`)
            animRoueA.beginElement()
            animRoueB.beginElement()
            const compteurRoueA = divM2d.querySelector(`#compteur${roueACorr.id}`)
            const compteurRoueB = divM2d.querySelector(`#compteur${roueBCorr.id}`)
            compteurRoueA.innerHTML = '0'
            compteurRoueB.innerHTML = '0'
            interA = setInterval(() => {
              compteurRoueA.innerHTML = parseInt(compteurRoueA.innerHTML) + 1
            }, animRoueA.getAttribute('dur') * 1000)
            interB = setInterval(() => {
              compteurRoueB.innerHTML = parseInt(compteurRoueB.innerHTML) + 1
            }, animRoueB.getAttribute('dur') * 1000)
            if (this.sup2) {
              interABC = setInterval(() => {
                animRoueA.endElement()
                animRoueB.endElement()
                clearInterval(interA)
                clearInterval(interB)
              }, ppcm(2 * parseFloat(animRoueA.getAttribute('dur')), 2 * parseFloat(animRoueB.getAttribute('dur'))) * 500)
            }
          }
          break
        case 5:
          do {
            nbDentsRoueA = randint(8, 25)
            nbDentsRoueB = randint(8, 12, nbDentsRoueA)
            nbDentsRoueC = randint(8, 25, [nbDentsRoueA, nbDentsRoueB])
            nbToursA = ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueA
            nbToursB = ppcm(nbDentsRoueA, nbDentsRoueB) / nbDentsRoueB
            nbToursC = ppcm(nbDentsRoueA, nbDentsRoueC) / nbDentsRoueC
            nbToursAbc = ppcm(ppcm(nbDentsRoueA, nbDentsRoueB), nbDentsRoueC) / nbDentsRoueA
          } while ((nbToursA > 4 && nbToursC > 4 && nbToursB > 4) || nbToursA === 1 || nbToursC === 1 || nbToursB === 1) // au moins une des deux roues fait moins de 5 tours
          roues = engrenages(0, 0.5, nbDentsRoueA, nbDentsRoueB, nbDentsRoueC)
          roues[2].marqueur = 180
          rouesCorr = engrenages(Math.ceil(20 / Math.max(nbToursA, nbToursB, nbToursC)), 0.5, nbDentsRoueA, nbDentsRoueB, nbDentsRoueC)
          roueACorr = rouesCorr[0]
          roueBCorr = rouesCorr[1]
          roueCCorr = rouesCorr[2]
          roueCCorr.marqueur = 180
          texte += `La roue de gauche possède $${nbDentsRoueA}$ dents, celle du milieu en a $${nbDentsRoueB}$ et celle de droite en a $${nbDentsRoueC}$.<br>`
          texte += `${numAlpha(0)}Combien de tours doit effectuer la roue de gauche avant que son repère et celui de la roue du milieu soient à nouveau comme dans la position initiale ?<br>`
          texte += `${numAlpha(1)}Combien de tours doit effectuer la roue de gauche avant que son repère et celui de la roue de droite soient à nouveau comme dans la position initiale ?<br>`
          texte += `${numAlpha(2)}Dans la situation ${numAlpha(1)}, la roue du milieu est-elle dans sa position initiale ? Sinon, combien de tours la roue de gauche doit-elle effectuer pour que les trois roues retrouvent leur position initiale ?<br>`
          texteCorr += 'Le nombre de dents multiplié par le nombre de tours de chaque roue doit donner le même résultat.<br>'
          texteCorr += `Nous cherchons donc le plus petit multiple commun à $${nbDentsRoueA}$ et à $${nbDentsRoueB}$.<br>`
          texteCorr += listePremiersMultiples(nbDentsRoueA, nbDentsRoueB)
          texteCorr += listePremiersMultiples(nbDentsRoueB, nbDentsRoueA)
          texteCorr += `${numAlpha(0)}Il faudra donc $${nbToursA}$ tours de la roue de gauche et $${nbToursB}$ tours à la roue du milieu pour qu'elles se retrouvent dans leur position initiale.<br>`
          texteCorr += `${numAlpha(1)}Faisons de même avec la roue de gauche et celle de droite.<br>`
          texteCorr += `Nous cherchons donc le plus petit multiple commun à $${nbDentsRoueA}$ et à $${nbDentsRoueC}$.<br>`
          texteCorr += listePremiersMultiples(nbDentsRoueA, nbDentsRoueC)
          texteCorr += listePremiersMultiples(nbDentsRoueC, nbDentsRoueA)
          texteCorr += `La roue de droite effectuera donc $${nbToursC}$ tours quand la roue de gauche en effectuera $${nbToursC * nbDentsRoueC / nbDentsRoueA}$.<br>`
          if (nbToursC !== nbDentsRoueA) {
            texteCorr += `En effet $${nbToursC}\\times ${nbDentsRoueC}=${nbToursC * nbDentsRoueC / nbDentsRoueA}\\times ${nbDentsRoueA}=${nbToursC * nbDentsRoueC}$.<br>`
          } else {
            texteCorr += `Remarque : Quand le plus petit multiple commun de deux nombres est le produit de ces nombres, on dit qu'ils sont premiers entre eux. $${nbDentsRoueC}$ et $${nbDentsRoueA}$ sont premiers entre eux.<br>`
          }
          texteCorr += `${numAlpha(2)}Dans cette situation la roue du milieu tourne, elle aussi de $${nbToursC * nbDentsRoueC}$ dents.<br>`
          texteCorr += nbToursC * nbDentsRoueC % nbDentsRoueB === 0 ? `Ce nombre est un multiple du nombre de dents de la roue du milieu, donc elle a effectué exactement $\\dfrac{${nbToursC * nbDentsRoueC}}{${nbDentsRoueB}}=${nbToursC * nbDentsRoueC / nbDentsRoueB}$ tours.<br>` : 'Ce nombre n\'est un multiple du nombre de dents de la roue du milieu, donc elle ne sera pas dans sa position initiale.<br>'
          texteCorr += `Il faudra attendre que la roue de gauche tourne de $${nbToursAbc * nbDentsRoueA}$ dents soit $${nbToursAbc}$ tours, la roue du milieu en fera $${nbToursAbc * nbDentsRoueA / nbDentsRoueB}$ et la roue de droite en fera $${nbToursAbc * nbDentsRoueA / nbDentsRoueC}$.<br>`
          remiseAZero = () => {
            clearInterval(interABC)
            clearInterval(interA)
            clearInterval(interB)
            clearInterval(interC)
            const animRoueA = divM2d.querySelector(`#animRoue${roueACorr.id}`)
            const animRoueB = divM2d.querySelector(`#animRoue${roueBCorr.id}`)
            const animRoueC = divM2d.querySelector(`#animRoue${roueCCorr.id}`)
            animRoueA.beginElement()
            animRoueB.beginElement()
            animRoueC.beginElement()
            const compteurRoueA = divM2d.querySelector(`#compteur${roueACorr.id}`)
            const compteurRoueB = divM2d.querySelector(`#compteur${roueBCorr.id}`)
            const compteurRoueC = divM2d.querySelector(`#compteur${roueCCorr.id}`)
            compteurRoueA.innerHTML = '0'
            compteurRoueB.innerHTML = '0'
            compteurRoueC.innerHTML = '0'
            interA = setInterval(() => {
              compteurRoueA.innerHTML = parseInt(compteurRoueA.innerHTML) + 1
            }, animRoueA.getAttribute('dur') * 1000)
            interB = setInterval(() => {
              compteurRoueB.innerHTML = parseInt(compteurRoueB.innerHTML) + 1
            }, animRoueB.getAttribute('dur') * 1000)
            interC = setInterval(() => {
              compteurRoueC.innerHTML = parseInt(compteurRoueC.innerHTML) + 1
            }, animRoueC.getAttribute('dur') * 1000)
            if (this.sup2) {
              interABC = setInterval(() => {
                animRoueA.endElement()
                animRoueB.endElement()
                animRoueC.endElement()
                clearInterval(interA)
                clearInterval(interB)
                clearInterval(interC)
              }, parseFloat(animRoueA.getAttribute('dur')) * nbToursAbc * 1000)
            }
          }
          break
      }

      objetsEnonce.push(...roues)
      objetsCorrection.push(...rouesCorr)

      const paramsEnonce = Object.assign({}, fixeBordures(objetsEnonce), { pixelsParCm: 20, scale: 1 })
      const paramsCorrection = Object.assign({}, fixeBordures(objetsCorrection), { pixelsParCm: 20, scale: 1 })

      texte += mathalea2d(paramsEnonce, objetsEnonce)
      texteCorr += context.isHtml ? `<div id="animRoues${numeroExercice}C${i}"></div>` : mathalea2d(paramsCorrection, objetsCorrection)

      divM2d.innerHTML = mathalea2d(paramsCorrection, objetsCorrection)

      function insertInDom () {
        const div = document.querySelector(`#animRoues${numeroExercice}C${i - 1}`) // Quand insertInDom sera exécuté, le i aura été incrémenté d'où ce i - 1
        if (div) {
          div.innerHTML = ''
          div.appendChild(divM2d)
          const button = document.createElement('button')
          button.innerText = 'Relancer l\'animation'
          button.onclick = remiseAZero
          div.appendChild(button)
          if (context.versionMathalea === 2) {
            button.classList.add('btn', 'ui', 'icon', 'button')
          } else {
            button.classList.add('px-6', 'py-2.5', 'mr-10', 'my-5', 'ml-6', 'bg-coopmaths', 'text-white', 'font-medium', 'text-xs', 'leading-tight', 'uppercase', 'rounded', 'shadow-md',
              'transform', 'hover:scale-110', 'hover:bg-coopmaths-dark', 'hover:shadow-lg', 'focus:bg-coopmaths-dark', 'focus:shadow-lg', 'focus:outline-none', 'focus:ring-0', 'active:bg-coopmaths-dark', 'active:shadow-lg', 'transition', 'duration-150', 'ease-in-out')
          }
          document.removeEventListener('exerciceAffiches', remiseAZero)
          document.removeEventListener('exercicesAffiches', insertInDom)
        }
      }
      document.addEventListener('exercicesAffiches', remiseAZero)
      document.addEventListener('exercicesAffiches', insertInDom)

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
