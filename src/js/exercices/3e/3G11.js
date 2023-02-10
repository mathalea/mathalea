import Exercice from '../Exercice.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, choisitLettresDifferentes, lettreDepuisChiffre, arcenciel, texNombre, combinaisonListes, abs, texteGras } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, segment, dansLaCibleCarree, cibleCarree, homothetie, longueur, codageSegments } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'
import { context } from '../../modules/context.js'
export const titre = 'Construire l\'image d\'un point par une homothétie avec cible auto-corrective'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDePublication = '30/11/2020'
export const dateDeModifImportante = '31/01/2023'
/**
* Construction d'images par homothétie avec dispositif d'auto-correction aléatoire
* @author Jean-Claude Lhote (modifié par EE)
*/
export const uuid = '18e25'
export const ref = '3G11'
export default function ConstruireHomothetiePoint3e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 2
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 3
  this.sup2 = 3
  this.typeExercice = 'IEP'

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let plusieursCiblesPourUnPoint = true
    const listeRapports = [-2, -1.5, -0.5, 0.5, 1.5, 2]
    const choixCodage = ['OO', '|||', '//']
    for (let i = 0, s, cpt = 0, texte, texteCorr; i < this.nbQuestions && cpt < 100;) {
      const anim = new Alea2iep()
      let nontrouve; let assezloin; let cible
      const choixRapport = randint(0, 5)
      const rapport = listeRapports[choixRapport]
      plusieursCiblesPourUnPoint = this.sup2 === 3 ? !plusieursCiblesPourUnPoint : this.sup2 === 2
      let result = [0, 0]; texteCorr = ''; const nbpoints = plusieursCiblesPourUnPoint ? 1 : parseInt(this.sup)
      const propositionsAMC = []
      const celluleAlea = function (rang) {
        const lettre = lettreDepuisChiffre(randint(1, rang))
        const chiffre = Number(randint(1, rang)).toString()
        return lettre + chiffre
      }
      // On prépare la figure...
      const O = point(0, 0, 'O')
      const noms = choisitLettresDifferentes(nbpoints, 'QO', true)
      if (nbpoints > 1) {
        texte = `Construire l'image des points $${noms[0]}$`
        for (let k = 1; k < nbpoints - 1; k++) {
          texte += `, $${noms[k]}$`
        }
        texte += ` et $${noms[nbpoints - 1]}$`
      } else texte = `Construire l'image du point $${noms[0]}$`

      texte += ' par l\'homothétie de centre $O$'
      texte += ` et de rapport $${texNombre(rapport)}$.`
      const cibles = []; const M = []; const N = []; const objetsEnonce = []; const objetsCorrection = [] // cibles, M point marqués, N image de M
      let resultFaux; let rapportFaux
      const cellules = []
      let xMin, yMin, xMax, yMax;
      [xMin, yMin, xMax, yMax] = [0, 0, 0, 0]
      for (let k = 0; k < nbpoints; k++) { // On place les cibles.
        N.push(point(randint(-60, 60, 0) / 10, randint(-60, 60, 0) / 10, noms[k] + "'"))
        nontrouve = true
        while (longueur(N[k], O) < 3 || longueur(N[0], O) < 6 || nontrouve) {
          nontrouve = true
          if (longueur(N[k], O) < 3 || longueur(N[0], O) < 6) {
            N[k].x = randint(-60, 60, 0) / 10
            N[k].y = randint(-60, 60, 0) / 10
          } else {
            assezloin = true
            for (let j = 0; j < k; j++) {
              if (longueur(N[k], N[j]) < 4.5) { assezloin = false }
            }
            if (assezloin === false) { // éloigner les points donc les grilles
              N[k].x = randint(-60, 60, 0) / 10
              N[k].y = randint(-60, 60, 0) / 10
            } else { nontrouve = false }
          }
        }
      }
      objetsEnonce.push(tracePoint(O), labelPoint(O))
      objetsCorrection.push(tracePoint(O), labelPoint(O))
      const choixNumGrille = combinaisonListes([2, 1, 3, 4], 4)

      for (let k = 0; k < nbpoints; k++) {
        cellules.push(celluleAlea(4))
        result = dansLaCibleCarree(N[k].x, N[k].y, 4, 0.6, cellules[k])
        cible = cibleCarree({ x: result[0], y: result[1], rang: 4, num: plusieursCiblesPourUnPoint ? choixNumGrille[3] : k + 1, taille: 0.6, color: '#f15929', colorNum: 'gray', opaciteNum: context.isHtml ? 0.5 : 1 })
        cible.opacite = 0.7
        cibles.push(cible)

        M.push(homothetie(N[k], O, 1 / rapport, noms[k]))

        objetsEnonce.push(tracePoint(M[k]), labelPoint(M[k]), cibles[k])
        objetsCorrection.push(tracePoint(M[k], N[k]), labelPoint(M[k], N[k]), cibles[k])
        switch (choixRapport) {
          case 0 : // rapport = -2
            s = segment(O, M[k], arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s = segment(O, homothetie(M[k], O, -1), arcenciel(k))
            s.styleExtremites = '-|'
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s = segment(homothetie(M[k], O, -1), homothetie(M[k], O, -2), arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            break
          case 1 : // rapport = -1.5
            s = segment(O, homothetie(M[k], O, 0.5), arcenciel(k))
            s.styleExtremites = '-|'
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s = segment(homothetie(M[k], O, 0.5), homothetie(M[k], O, 1), arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s = segment(O, homothetie(M[k], O, -0.5), arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s = segment(homothetie(M[k], O, -0.5), homothetie(M[k], O, -1), arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s.styleExtremites = '|-|'
            s = segment(homothetie(M[k], O, -1.5), homothetie(M[k], O, -1), arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            break
          case 2 : // rapport = -0.5
            s = segment(O, homothetie(M[k], O, 0.5), arcenciel(k))
            s.styleExtremites = '-|'
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s = segment(homothetie(M[k], O, 0.5), homothetie(M[k], O, 1), arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s = segment(O, homothetie(M[k], O, -0.5), arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            break
          case 3 : // rapport = 0.5
            s = segment(O, homothetie(M[k], O, 0.5), arcenciel(k))
            s.styleExtremites = '-|'
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s = segment(homothetie(M[k], O, 0.5), homothetie(M[k], O, 1), arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            break
          case 4 : // rapport = 1.5
            s = segment(O, homothetie(M[k], O, 0.5), arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s = segment(homothetie(M[k], O, 0.5), homothetie(M[k], O, 1), arcenciel(k))
            s.styleExtremites = '|-'
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s = segment(homothetie(M[k], O, 1.5), homothetie(M[k], O, 1), arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            break
          case 5 : // rapport = 2
            s = segment(O, M[k], arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            s = segment(M[k], homothetie(M[k], O, 2), arcenciel(k))
            objetsCorrection.push(s, codageSegments(choixCodage[k], arcenciel(k), s))
            break
        }

        texteCorr += `$${noms[k]}'$, l'image du point $${noms[k]}$ est dans la case ${cellules[k]} de la grille ${plusieursCiblesPourUnPoint ? choixNumGrille[3] : k + 1}.<br>`
        propositionsAMC.push({
          type: 'AMCOpen',
          propositions: [
            {
              texte: ' ',
              statut: 1, // (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
              feedback: '',
              enonce: `Indiquer le numéro de la cible où se trouve l'image du point $${noms[k]}$ ${texteGras('ET')} son emplacement dans la cible : $\\ldots\\ldots\\ldots$ et $\\dotfill$<br>`, // EE : ce champ est facultatif et fonctionnel qu'en mode hybride (en mode normal, il n'y a pas d'intérêt)
              sanscadre: true // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
            }
          ]
        })
      }
      if (plusieursCiblesPourUnPoint) {
        rapportFaux = abs(rapport) > 1 ? [rapport + 1, 1 - rapport, -rapport] : abs(rapport) > -1 ? [1.5, -1.5, -0.5 * rapport / abs(rapport)] : [-rapport + 1, rapport - 1, -rapport]
        for (let j = 0; j < 3; j++) {
          resultFaux = homothetie(N[0], O, 1 / rapport)
          resultFaux = homothetie(resultFaux, O, rapportFaux[j])
          result = dansLaCibleCarree(resultFaux.x, resultFaux.y, 4, 0.6, cellules[0])
          cible = cibleCarree({ x: result[0], y: result[1], rang: 4, num: choixNumGrille[j], taille: 0.6, color: '#f15929', colorNum: 'gray', opaciteNum: context.isHtml ? 0.5 : 1 })
          cible.opacite = 0.7
          objetsEnonce.push(cible)
        }
      }
      for (let k = 0; k < nbpoints; k++) {
        xMin = Math.min(xMin, N[k].x - 3, M[k].x - 3)
        yMin = Math.min(yMin, N[k].y - 3, M[k].y - 3)
        xMax = Math.max(xMax, N[k].x + 3, M[k].x + 3)
        yMax = Math.max(yMax, N[k].y + 3, M[k].y + 3)
      }
      anim.xMin = xMin - 1
      anim.xMax = xMax
      anim.yMin = yMin - 1
      anim.yMax = yMax

      anim.recadre(xMin, yMax)

      anim.pointCreer(O)
      for (let k = 0; k < nbpoints; k++) {
        anim.pointCreer(M[k])
        anim.homothetiePoint(M[k], O, rapport, '', { positionTexte: { x: xMin + 2, y: yMin + 2 } })
      }
      texte += '<br>' + mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { pixelsParCm: 20, scale: 0.5 }), objetsEnonce)
      propositionsAMC[0].propositions[0].enonce = texte + '<br>' + propositionsAMC[0].propositions[0].enonce
      texteCorr += '<br>' + mathalea2d(Object.assign({}, fixeBordures(objetsCorrection), { pixelsParCm: 20, scale: 0.5 }), objetsCorrection)
      texteCorr += context.isHtml ? anim.html(numeroExercice, i) : ''

      if (context.isAmc) {
        this.autoCorrection[i] =
          {
            enonce: '',
            enonceAvant: false,
            enonceAvantUneFois: true,
            propositions: propositionsAMC
          }
      }

      if (this.questionJamaisPosee(i, texte)) {
      // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Nombre de points (1 à 5)', 5]
  this.besoinFormulaire2Numerique = ['Type de questions', 3, '1 : Une seule cible par point\n2 : Plusieurs cibles pour un seul point\n3 : Mélange']
}
