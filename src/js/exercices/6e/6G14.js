import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, range, rangeMinMax, shuffle, combinaisonListes, contraindreValeur, choice } from '../../modules/outils.js'
import { point, pointIntersectionDD, droite, droiteParPointEtParallele, droiteParPointEtPerpendiculaire, droiteParPointEtPente, rotation, codageAngleDroit } from '../../modules/2d.js'
export const amcReady = true
export const amcType = 'AMCOpen' // type de question AMC
export const titre = 'Utiliser les propriétés des droites perpendiculaires'

/**
 * Ref 6G14
 * @author Jean-Claude Lhote (EE : pour l'ajout d'AMC et la possibilité de sélectionner différents mélanges)
 * @author Mickael Guironnet (refactoring avec ajout des 4 à 6 et des figures)
 * publié le 22/11/2020
 */
export const uuid = '6a336'
export const ref = '6G14'
export default function ProprietesParallelesPerpendiculaires () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 4
  this.sup2 = false
  this.sup3 = true
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false
  this.nouvelleVersion = function () {
    this.autoCorrection = []
    let typesDeQuestionsDisponibles = []
    let questionsParNiveau = []
    if (!this.sup2) {
      questionsParNiveau.push(range(3))
      questionsParNiveau.push(rangeMinMax(4, 6))
      questionsParNiveau.push(rangeMinMax(9, 15))
      questionsParNiveau.push(rangeMinMax(19, 31, 20))
      questionsParNiveau.push(questionsParNiveau[0].concat(questionsParNiveau[1].concat(questionsParNiveau[2]).concat(questionsParNiveau[3])))
    } else {
      questionsParNiveau = [[2], [15], [31], [2, 15, 31]]
    }
    let AvecMelange = true
    if (!this.sup) { // Si aucun melange n'est saisi
      typesDeQuestionsDisponibles = questionsParNiveau[4]
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre, on duplique ce nombre et on insère un - entre les deux.
        this.sup = this.sup + '-' + this.sup
      } else { AvecMelange = false }

      let QuestionsDisponibles = []
      const IndiceNew = [0, 0, 0, 0, 0]
      let NumQuestionsDisponibles
      QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < this.nbQuestions; i++) { // on a un tableau avec des strings : ['1', '1', '2']
        NumQuestionsDisponibles = contraindreValeur(1, 5, parseInt(QuestionsDisponibles[i % QuestionsDisponibles.length]), 4) - 1
        typesDeQuestionsDisponibles[i] = choice(questionsParNiveau[NumQuestionsDisponibles], typesDeQuestionsDisponibles.slice(IndiceNew[NumQuestionsDisponibles])) // Ce slice permet de gérer, par exemple, le mélange 1-1-2 pour 10 questions car il n'y a pas assez de choix différents pour le mélange 1.
        if (typesDeQuestionsDisponibles[i] === undefined) { // Dans le cas, on a épuisé tous les choix différents d'un mélange
          IndiceNew[NumQuestionsDisponibles] = i
          typesDeQuestionsDisponibles[i] = choice(questionsParNiveau[NumQuestionsDisponibles], typesDeQuestionsDisponibles.slice(IndiceNew[NumQuestionsDisponibles]))
        }
      }
    }
    let listeTypeDeQuestions = []
    if (AvecMelange) {
      listeTypeDeQuestions = combinaisonListes(
        typesDeQuestionsDisponibles,
        this.nbQuestions
      )
    } else { listeTypeDeQuestions = typesDeQuestionsDisponibles }

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const droiteColor = (context.isHtml ? ['red', 'blue', 'green', 'black', 'magenta', '#f15929'] : ['black', 'black', 'black', 'black', 'black', 'black'])

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''

      const numDroites = shuffle([1, 2, 3, 4, 5])
      // const numDroites = [1, 2, 3, 4, 5]
      const d = []; const dE = []; const P = []; const objets = []; const objets2 = []
      let code = []; let code2 = []

      switch (listeTypeDeQuestions[i]) {
        case 0: // si 1//2 et 2//3 alors 1//3
          code = [[1, 2, 1], [2, 3, 1]]
          break
        case 1: // si 1//2 et 2T3 alors 1T3
          code = [[1, 2, 1], [2, 3, -1]]
          break
        case 2: // si 1T2 et 2T3 alors 1//3
          code = [[1, 2, -1], [2, 3, -1]]
          break
        case 3: // si 1T2 et 2//3 alors 1T3
          code = [[1, 2, -1], [2, 3, 1]]
          break
        case 4: // si 1T2 et 2//3 alors 1T3 et 4 distracteur
          code = [[1, 2, -1], [2, 3, 1]]
          code2 = [[1, 4, 1]]
          break
        case 5: // si 1T2 et 2T3 alors 1//3 et 4 distracteur
          code = [[1, 2, -1], [2, 3, -1]]
          code2 = [[2, 4, 1]]
          break
        case 6: // si 1//2 et 2//3 alors 1//3 et 4 distracteur
          code = [[1, 2, 1], [2, 3, 1]]
          code2 = [[1, 4, -1]]
          break
        case 8: // Si 1//2 et 2//3 et 3//4 alors 1//4
          code = [[1, 2, 1], [2, 3, 1], [3, 4, 1]]
          break
        case 9: // Si 1//2 et 2//3 et 3T4 alors 1T4
          code = [[1, 2, 1], [2, 3, 1], [3, 4, -1]]
          break
        case 10: // Si 1//2 et 2T3 et 3//4 alors 1T4
          code = [[1, 2, 1], [2, 3, 1], [3, 4, 1]]
          break
        case 11: // Si 1//2 et 2T3 et 3T4 alors 1//4
          code = [[1, 2, 1], [2, 3, -1], [3, 4, -1]]
          break
        case 12: // Si 1T2 et 2//3 et 3//4 alors 1T4
          code = [[1, 2, -1], [2, 3, 1], [3, 4, 1]]
          break
        case 13: // Si 1T2 et 2//3 et 3T4 alors 1//4
          code = [[1, 2, -1], [2, 3, 1], [3, 4, -1]]
          break
        case 14: // Si 1T2 et 2T3 et 3//4 alors 1//4
          code = [[1, 2, -1], [2, 3, -1], [3, 4, 1]]
          break
        case 15: // Si 1T2 et 2T3 et 3T4 alors 1T4
          code = [[1, 2, -1], [2, 3, -1], [3, 4, -1]]
          break
        case 16: // Si 1//2 et 2//3 et 3//4 et 4//5 alors 1//5
          code = [[1, 2, 1], [2, 3, 1], [3, 4, 1], [4, 5, 1]]
          break
        case 17: // Si 1//2 et 2//3 et 3T4 et 4//5 alors 1T5
          code = [[1, 2, 1], [2, 3, 1], [3, 4, -1], [4, 5, 1]]
          break
        case 18: // Si 1//2 et 2T3 et 3//4 et 4//5 alors 1T5
          code = [[1, 2, 1], [2, 3, -1], [3, 4, 1], [4, 5, 1]]
          break
        case 19: // Si 1//2 et 2T3 et 3T4 et 4//5 alors 1//5
          code = [[1, 2, 1], [2, 3, -1], [3, 4, -1], [4, 5, 1]]
          break
        case 20: // Si 1T2 et 2//3 et 3//4 et 4//5 alors 1T5
          code = [[1, 2, -1], [2, 3, 1], [3, 4, 1], [4, 5, 1]]
          break
        case 21: // Si 1T2 et 2//3 et 3T4 et 4//5 alors 1//5
          code = [[1, 2, -1], [2, 3, 1], [3, 4, -1], [4, 5, 1]]
          break
        case 22: // Si 1T2 et 2T3 et 3//4 et 4//5 alors 1//5
          code = [[1, 2, -1], [2, 3, -1], [3, 4, 1], [4, 5, 1]]
          break
        case 23: // Si 1T2 et 2T3 et 3T4 et 4//5 alors 1T5
          code = [[1, 2, -1], [2, 3, -1], [3, 4, -1], [4, 5, 1]]
          break
        case 24: // Si 1//2 et 2//3 et 3//4 et 4T5 alors 1T5
          code = [[1, 2, 1], [2, 3, 1], [3, 4, 1], [4, 5, -1]]
          break
        case 25: // Si 1//2 et 2//3 et 3T4 et 4T5 alors 1//5
          code = [[1, 2, 1], [2, 3, 1], [3, 4, -1], [4, 5, -1]]
          break
        case 26: // Si 1//2 et 2T3 et 3//4 et 4T5 alors 1//5
          code = [[1, 2, 1], [2, 3, -1], [3, 4, 1], [4, 5, -1]]
          break
        case 27: // Si 1//2 et 2T3 et 3T4 et 4T5 alors 1T5
          code = [[1, 2, 1], [2, 3, -1], [3, 4, -1], [4, 5, -1]]
          break
        case 28: // Si 1T2 et 2//3 et 3//4 et 4T5 alors 1//5
          code = [[1, 2, -1], [2, 3, 1], [3, 4, 1], [4, 5, -1]]
          break
        case 29: // Si 1T2 et 2//3 et 3T4 et 4T5 alors 1T5
          code = [[1, 2, -1], [2, 3, 1], [3, 4, -1], [4, 5, -1]]
          break
        case 30: // Si 1T2 et 2T3 et 3//4 et 4T5 alors 1T5
          code = [[1, 2, -1], [2, 3, -1], [3, 4, 1], [4, 5, -1]]
          break
        case 31: // Si 1T2 et 2T3 et 3T4 et 4T5 alors 1//5
          code = [[1, 2, -1], [2, 3, -1], [3, 4, -1], [4, 5, -1]]
          break
      }

      // enoncé mélangé
      const couleurd = []
      const phrases = []
      texte += 'On sait que '
      couleurd.push(randint(0, 5))
      const codeAll = code.concat(code2)
      for (let j = 0; j < codeAll.length; j++) {
        let textetemp = `$(d_${numDroites[codeAll[j][0] - 1]})`
        if (codeAll[j][2] === 1) {
          textetemp += '//'
          couleurd.push(couleurd[j])
        } else {
          textetemp += '\\perp'
          couleurd.push((couleurd[j] + 1) % 6)
        }
        textetemp += `(d_${numDroites[codeAll[j][1] - 1]})$`
        phrases.push(textetemp)
      }
      // phrases=shuffle(phrases)
      for (let j = 0; j < codeAll.length - 1; j++) {
        texte += phrases[j]
        if (j !== codeAll.length - 2) texte += ', '
        else texte += ' et '
      }
      texte += phrases[codeAll.length - 1] + '.<br>'

      // construction de la figure
      context.fenetreMathalea2d = [-2, -2, 15, 10] // important avec la création des droites
      P.push(point(0, 0))
      let droiteP = droiteParPointEtPente(P[0], randint(-1, 1, 0) / 10, `$(d_${numDroites[codeAll[0][0] - 1]})$`, droiteColor[couleurd[0]])
      droiteP.epaisseur = 2
      droite.pointilles = false
      d.push(droiteP)
      const droiteE = droite(point(droiteP.x1, droiteP.y1), point(droiteP.x2, droiteP.y2), `$(d_${numDroites[codeAll[0][0] - 1]})$`)
      droiteE.epaisseur = 2
      dE.push(droiteE)
      objets.push(d[0])
      objets2.push(dE[0])
      for (let x = 0; x < codeAll.length; x++) {
        if (codeAll[x][2] === 1) {
          P.push(point((x + 1) * 2, (x + 1) * 2))
          droiteP = droiteParPointEtParallele(P[x + 1], d[codeAll[x][0] - 1], `$(d_${numDroites[codeAll[x][1] - 1]})$`, droiteColor[couleurd[x + 1]])
          droiteP.epaisseur = 2
          droiteP.pointilles = d[[codeAll[x][0] - 1]].pointilles
          d.push(droiteP)
          const droiteP2 = droite(point(droiteP.x1, droiteP.y1), point(droiteP.x2, droiteP.y2), `$(d_${numDroites[codeAll[x][1] - 1]})$`)
          droiteP2.epaisseur = 2
          dE.push(droiteP2)
        } else {
          P.push(point((x + 1) * 2, (x + 1) * 2))
          droiteP = droiteParPointEtPerpendiculaire(P[x + 1], d[codeAll[x][0] - 1], `$(d_${numDroites[codeAll[x][1] - 1]})$`, droiteColor[couleurd[x + 1]])
          droiteP.epaisseur = 2
          droiteP.pointilles = x % 3 + 1
          d.push(droiteP)
          const droiteP2 = droite(point(droiteP.x1, droiteP.y1), point(droiteP.x2, droiteP.y2), `$(d_${numDroites[codeAll[x][1] - 1]})$`)
          droiteP2.epaisseur = 2
          dE.push(droiteP2)
          const Inter = pointIntersectionDD(d[codeAll[x][0] - 1], droiteP)
          const PP = rotation(P[x + 1], Inter, 90)
          objets.push(codageAngleDroit(PP, Inter, P[x + 1], 'black', 0.6))
          objets2.push(codageAngleDroit(PP, Inter, P[x + 1], 'black', 0.6))
        }
        objets.push(d[x + 1])
        objets2.push(dE[x + 1])
      }

      if (this.sup3) {
        texte += (context.vue === 'diap' ? '<center>' : '') + mathalea2d({ xmin: -2, xmax: 15, ymin: -2, ymax: 10, pixelsParCm: 20, scale: 0.3, mainlevee: false, amplitude: 0.3 }, objets2) + '<br>' + (context.vue === 'diap' ? '</center>' : '')
      }
      texte += `Que peut-on dire de $(d_${numDroites[code[0][0] - 1]})$ et $(d_${numDroites[code[code.length - 1][1] - 1]})$ ?`
      if (context.isAmc && !this.sup3) {
        texte += ' On pourra s\'aider en traçant une figure.'
      }

      // correction raisonnement ordonné
      texteCorr = 'À partir de l\'énoncé, on peut réaliser le schéma suivant (il en existe une infinité).<br> Les droites données parallèles dans l\'énoncé sont de même couleur/style.<br>'
      texteCorr += mathalea2d({ xmin: -2, xmax: 15, ymin: -2, ymax: 10, pixelsParCm: 20, scale: 0.3, mainlevee: false, amplitude: 0.3 }, objets) + '<br>'
      for (let j = 0; j < code.length - 1; j++) {
        if (this.correctionDetaillee) texteCorr += 'On sait que : '
        else texteCorr += 'Comme '
        texteCorr += `$(d_${numDroites[code[j][0] - 1]})`
        if (code[j][2] === 1) texteCorr += '//'
        else texteCorr += '\\perp'
        texteCorr += `(d_${numDroites[code[j][1] - 1]})$ et `
        texteCorr += `$(d_${numDroites[code[j + 1][0] - 1]})`
        if (code[j + 1][2] === 1) texteCorr += '//'
        else texteCorr += '\\perp'
        texteCorr += `(d_${numDroites[code[j + 1][1] - 1]})$`
        // quelle propriété ?
        if (code[j][2] * code[j + 1][2] === -1) { // Une parallèle et une perpendiculaire
          if (this.correctionDetaillee) texteCorr += '.<br> Or «Si deux droites sont parallèles alors toute droite perpendiculaire à l\'une est aussi perpendiculaire à l\'autre».<br>Donc'
          else texteCorr += ', on en déduit que '
          texteCorr += ` $(d_${numDroites[code[0][0] - 1]})\\perp(d_${numDroites[code[j + 1][1] - 1]})$.<br>`
          code[j + 1][0] = code[j][0]
          code[j + 1][2] = -1
        } else if (code[j][2] > 0) { // deux parallèles
          if (this.correctionDetaillee) texteCorr += '.<br> Or «Si deux droites sont parallèles à une même droite alors elles sont parallèles entre elles».<br>Donc'
          else texteCorr += ', on en déduit que '
          texteCorr += ` $(d_${numDroites[code[0][0] - 1]})//(d_${numDroites[code[j + 1][1] - 1]})$.<br>`
          code[j + 1][0] = code[j][0]
          code[j + 1][2] = 1
        } else { // deux perpendiculaires
          if (this.correctionDetaillee) texteCorr += '.<br> Or «Si deux droites sont perpendiculaires à une même droite alors elles sont parallèles entre elles».<br>Donc'
          else texteCorr += ', on en déduit que '
          texteCorr += ` $(d_${numDroites[code[0][0] - 1]})//(d_${numDroites[code[j + 1][1] - 1]})$.<br>`
          code[j + 1][0] = code[j][0]
          code[j + 1][2] = 1
        }
      }

      /** ********************** AMC Open *****************************/
      this.autoCorrection[i] = {}
      this.autoCorrection[i].options = { ordered: false }
      this.autoCorrection[i].enonce = texte + '<br>'
      this.autoCorrection[i].propositions = [
        {
          texte: texteCorr,
          statut: 3
        }
      ]
      /****************************************************/

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte + '<br>')
        this.listeCorrections.push(texteCorr + '<br>')
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Nombre d\'étapes de raisonnement', 'Nombres séparés par des tirets\n1 : Une étape (de 0 à 3)\n2 : Une étape avec distracteur (de 4 à 6)\n3 Deux étapes (de 9 à 15)\n4 : Trois étapes (de 19 à 31)\n5 : Mélange']
  this.besoinFormulaire2CaseACocher = ['Que des perpendiculaires', false]
  this.besoinFormulaire3CaseACocher = ['Avec le dessin', true]
}
