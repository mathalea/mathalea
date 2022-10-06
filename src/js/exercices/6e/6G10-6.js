import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, lettreDepuisChiffre, numAlpha, rangeMinMax } from '../../modules/outils.js'
import { point, tracePoint, pointSurDroite, labelPoint, droite, grille, seyes } from '../../modules/2d.js'
export const titre = 'Appartient ou n\'appartient pas'

/**
 * Fonction générale pour la notion d'appartenance
 * @author Mickael Guironnet
 */

export default class constructionElementaire extends Exercice {
//  'use strict'
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 1
    this.nbCols = 1
    this.nbColsCorr = 1
    this.sup = 1
    this.besoinFormulaireNumerique = [
      'Type de cahier',
      3,
      ' 1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche'
    ]
  }

  nouvelleVersion () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, texte, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const objetsEnonce = []
      const objetsCorrection = []
      const indLettre = randint(1, 15)
      const A = point(0, 0, lettreDepuisChiffre(indLettre), 'above left')
      const B = point(randint(10, 11), randint(-4, 4, [-1, 0, 1]), lettreDepuisChiffre(indLettre + 1), 'above right')
      const d = droite(A, B, '', 'blue')
      const AA = pointSurDroite(d, randint(1, 2), lettreDepuisChiffre(indLettre + 6), 'below')
      const BB = pointSurDroite(d, randint(3, 5), lettreDepuisChiffre(indLettre + 7), 'below')
      const CC = pointSurDroite(d, randint(6, 7), lettreDepuisChiffre(indLettre + 8), 'below')
      const DD = pointSurDroite(d, randint(8, 9), lettreDepuisChiffre(indLettre + 9), 'below')
      const C = point(randint(2, 4, [A.x]), randint(3, 6, [A.y]), lettreDepuisChiffre(indLettre + 2), 'above left')
      const D = point(randint(6, 8), randint(-7, -6, [A.y]), lettreDepuisChiffre(indLettre + 3))
      const T = tracePoint(A, B, C, D, AA, BB, CC, DD)
      T.tailleTikz = 0.3
      objetsEnonce.push(T, labelPoint(A, B, C, D, AA, BB, CC, DD), d)
      const Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x) - 1)
      const Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x) + 1)
      const Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y) - 1)
      const Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y) + 1)

      let g, sc, carreaux
      if (this.sup < 3) g = grille(Xmin, Ymin, Xmax, Ymax, 'gray', 0.7)
      else g = ''
      if (parseInt(this.sup) === 2) {
        sc = 0.8
        carreaux = seyes(Xmin, Ymin, Xmax, Ymax)
      } else {
        sc = 0.5
        carreaux = ''
      }
      objetsEnonce.push(g, carreaux)
      objetsCorrection.push(g, carreaux)
      const ppc = 20
      let enonce = '<br>' + (context.vue === 'diap' ? '<center>' : '') + mathalea2d(
        {
          xmin: Xmin,
          ymin: Ymin,
          xmax: Xmax,
          ymax: Ymax,
          pixelsParCm: ppc,
          scale: sc
        },
        objetsEnonce
      ) + (context.vue === 'diap' ? '</center>' : '<br>')

      enonce += 'Compléter avec $\\in$ ou $\\notin$. <br>'
      let correction = enonce
      let questind = 0
      const points = [A, AA, BB, CC, DD, B, C, D]
      const tirage = []
      const typeOld = []
      for (let k = 0; k < 10; k++) {
        const ind = randint(0, 7)
        const ind1 = randint(0, 4, [ind])
        const ind2 = randint(0, 5, rangeMinMax(0, ind1))
        if (typeOld.length > 3) {
          typeOld.length = 0
        }
        const type = randint(0, 3, typeOld)
        typeOld.push(type)
        const tira = ind.toString() + ind1.toString() + ind2.toString() + type.toString()
        if (tirage.indexOf(tira) > -1) {
          continue
        } else {
          tirage.push(tira)
        }
        let lettre = ['(', ')']
        let sol = ''
        switch (type) {
          case 0 : // droite
            lettre = ['(', ')']
            if (ind <= 5) { sol = '\\in' } else { sol = '\\notin' }
            break
          case 1 : // segment
            lettre = ['[', ']']
            if (ind <= 5 && ind >= ind1 && ind <= ind2) { sol = '\\in' } else { sol = '\\notin' }
            break
          case 2 : // demi-droite [)
            lettre = ['[', ')']
            if (ind <= 5 && ind >= ind1) { sol = '\\in' } else { sol = '\\notin' }
            break
          case 3 : // demi-droite (]
            lettre = ['(', ']']
            if (ind <= 5 && ind <= ind2) { sol = '\\in' } else { sol = '\\notin' }
            break
        }
        enonce +=
          numAlpha(questind) +
          `$${points[ind].nom} \\ldots\\ldots\\ldots\\ldots ${lettre[0]}${points[ind1].nom}${points[ind2].nom}${lettre[1]}$.<br>`
        correction +=
          numAlpha(questind++) +
          `$${points[ind].nom} ${sol} ${lettre[0]}${points[ind1].nom}${points[ind2].nom}${lettre[1]}$.<br>`
      }

      /****************************************************/
      if (this.listeQuestions.indexOf(texte) === -1) {
      // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(enonce + '<br>')
        this.listeCorrections.push(correction + '<br>')
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
}
