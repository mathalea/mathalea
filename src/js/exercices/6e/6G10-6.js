import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { randint } from '../../modules/outils/entiers.js'
import { rangeMinMax } from '../../modules/outils/arrays.js'
import { point } from '../../modules/2d/point.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { droite } from '../../modules/2d/droites.js'
import { deuxColonnesResp, numAlpha, sp } from '../../modules/outils/contextSensitif.js'
import { tracePoint } from '../../modules/2d/tracePoint.js'
import { labelPoint } from '../../modules/2d/labelPoint.js'
import { pointSurDroite } from '../../modules/2d/pointSur.js'
import { lettreDepuisChiffre } from '../../modules/outils/lettres.js'
import { grille, seyes } from '../../modules/2d/grilles.js'
export const titre = 'Appartient ou n\'appartient pas ?'
export const dateDePublication = '05/10/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Fonction générale pour la notion d'appartenance
 * @author Mickael Guironnet
 */

export const uuid = '9af23'
export const ref = '6G10-6'
export default class constructionElementaire extends Exercice {
//  'use strict'
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 1
    this.nbCols = 1
    this.nbColsCorr = 1
    this.sup = 1
    this.sup2 = 4
    this.calling = [0]
    this.besoinFormulaireNumerique = [
      'Type de cahier',
      3,
      ' 1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche'
    ]
    this.besoinFormulaire2Numerique = [
      'Nombre de phrases à compléter',
      10,
      ' Choisir un nombre entier entre 2 et 10'
    ]
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, colonne1, colonne2, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
      colonne1 = (context.vue === 'diap' ? '<center>' : '') + mathalea2d(
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

      colonne2 = 'Compléter avec $\\in$ ou $\\notin$. <br>'
      let correction2 = colonne2
      let questind = 0
      const points = [A, AA, BB, CC, DD, B, C, D]
      const tirage = []
      const typeOld = []
      for (let k = 0; k < Math.max(2, this.sup2); k++) {
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
        colonne2 +=
          numAlpha(questind) +
          `$${points[ind].nom}${sp(3)}\\ldots\\ldots\\ldots${sp(3)}${lettre[0]}${points[ind1].nom}${points[ind2].nom}${lettre[1]}$<br>`
        correction2 +=
          numAlpha(questind++) +
          `$${points[ind].nom} ${sol} ${lettre[0]}${points[ind1].nom}${points[ind2].nom}${lettre[1]}$<br>`
      }
      const options = { eleId: numeroExercice + '_' + i, widthmincol1: '500px', widthmincol2: '300px' }
      const enonce = deuxColonnesResp(colonne1, colonne2, options)
      const optionsSol = { eleId: 's-' + numeroExercice + '_' + i, widthmincol1: '500px', widthmincol2: '300px' }
      const correction = deuxColonnesResp(colonne1, correction2, optionsSol)

      /****************************************************/
      if (this.listeQuestions.indexOf(enonce) === -1) {
      // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(enonce + '<br>')
        this.listeCorrections.push(correction + '<br>')

        // listener
        const reportWindowSize = function () {
          // console.log(options)
          const element = document.getElementById('cols-responsive1-' + options.eleId)
          // const element2 = document.getElementById('cols-responsive2-' + options.eleId)
          const element3 = document.getElementById('cols-responsive1-s-' + options.eleId)
          // const element4 = document.getElementById('cols-responsive2-s-' + options.eleId)
          if (element !== null &&
            element3 !== null &&
            element !== undefined &&
            element3 !== undefined &&
            element.clientWidth !== 0) {
            // console.log(element.clientWidth + ': ' + element.offsetWidth)
            // console.log(element2.clientWidth + ': ' + element2.offsetWidth)
            const qcms = element.querySelectorAll('.mathalea2d')
            // console.log('mathalea2d :' + qcms.length + ':' + qcms[0].getAttribute('width'))
            const widthMathalea2d = parseInt(qcms[0].getAttribute('width'))
            let col1 = parseInt(options.widthmincol1.replaceAll('px', ''))
            const col2 = parseInt(options.widthmincol2.replaceAll('px', ''))
            col1 = widthMathalea2d
            options.widthmincol1 = col1 + 'px'
            const diff = element.parentElement.clientWidth - parseInt(options.widthmincol1.replaceAll('px', ''))
            element.style.minWidth = options.widthmincol1
            element3.style.minWidth = options.widthmincol1
            if (diff > col2) {
              element.parentElement.style.gridTemplateColumns = 'repeat(2, 1fr)'
              element3.parentElement.style.gridTemplateColumns = 'repeat(2, 1fr)'
              // console.log(element.parentElement.clientWidth + ':repeat(2, 1fr)')
            } else {
              element.parentElement.style.gridTemplateColumns = 'auto'
              element3.parentElement.style.gridTemplateColumns = 'auto'
              // console.log(element.parentElement.clientWidth + ':auto')
            }
          }
        }

        const removelistener = function () {
          alert('removeListener' + options.eleId)
          document.removeEventListener('exercicesAffiches', reportWindowSize)
          document.removeEventListener('exercicesDiap', reportWindowSize)
          document.removeEventListener('zoominOrout', reportWindowSize)
          document.removeEventListener('pleinEcran', reportWindowSize)
          window.removeEventListener('resize', reportWindowSize)
          document.removeEventListener('buildex', removelistener)
        }

        const createlistener = function () {
          document.addEventListener('exercicesAffiches', reportWindowSize)
          document.addEventListener('exercicesDiap', reportWindowSize)
          document.addEventListener('zoominOrout', reportWindowSize)
          document.addEventListener('pleinEcran', reportWindowSize)
          window.addEventListener('resize', reportWindowSize)
          document.addEventListener('buildex', removelistener)
        }
        createlistener()
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
}
