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
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false
  this.nouvelleVersion = function () {
    this.autoCorrection = []
    let typesDeQuestionsDisponibles = []
    let questionsParNiveau = []
    if (!this.sup2) {
      questionsParNiveau.push(range(3))
      questionsParNiveau.push(rangeMinMax(9, 15))
      questionsParNiveau.push(rangeMinMax(19, 31, 20))
      questionsParNiveau.push(questionsParNiveau[0].concat(questionsParNiveau[1].concat(questionsParNiveau[2])))
    } else {
      questionsParNiveau = [[2], [15], [31], [2, 15, 31]]
    }
    let AvecMelange = true
    if (!this.sup) { // Si aucun melange n'est saisi
      typesDeQuestionsDisponibles = questionsParNiveau[3]
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre, on duplique ce nombre et on insère un - entre les deux.
        this.sup = this.sup + '-' + this.sup
      } else { AvecMelange = false }
      let QuestionsDisponibles = []
      const IndiceNew = [0, 0, 0, 0, 0]
      let NumQuestionsDisponibles
      QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < this.nbQuestions; i++) { // on a un tableau avec des strings : ['1', '1', '2']
        NumQuestionsDisponibles = contraindreValeur(1, 4, parseInt(QuestionsDisponibles[i % QuestionsDisponibles.length]), 4) - 1
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
    const droites = []; let code; let raisonnement; let numDroites = []; const phrases = []; let textetemp
    const d = []; const P = []; const objets = []; const couleurd = []; let droiteP; let PP; let Inter
    const droitecolor = function (num) {
      let couleurs
      context.isHtml ? couleurs = ['red', 'blue', 'green', 'black', 'magenta', '#f15929'] : couleurs = ['black', 'black', 'black', 'black', 'black', 'black']
      return couleurs[num]
    }

    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      texte = ''
      texteCorr = ''
      phrases.length = 0
      droites.length = 0
      objets.length = 0
      d.length = 0
      P.length = 0
      couleurd.length = 0
      numDroites = shuffle([1, 2, 3, 4, 5])
      raisonnement = listeTypeDeQuestions[i]

      switch (raisonnement) {
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
      texte += 'On sait que '
      couleurd.push(randint(0, 5))
      for (let j = 0; j < code.length; j++) {
        textetemp = `$(d_${numDroites[code[j][0] - 1]})`
        if (code[j][2] === 1) {
          textetemp += '//'
          couleurd.push(couleurd[j])
        } else {
          textetemp += '\\perp'
          couleurd.push((couleurd[j] + 1) % 6)
        }
        textetemp += `(d_${numDroites[code[j][1] - 1]})$`
        phrases.push(textetemp)
      }
      // phrases=shuffle(phrases)
      for (let j = 0; j < code.length - 1; j++) {
        texte += phrases[j]
        if (j !== code.length - 2) texte += ', '
        else texte += ' et '
      }
      texte += phrases[code.length - 1]
      texte += `.<br>Que peut-on dire de $(d_${numDroites[code[0][0] - 1]})$ et $(d_${numDroites[code[code.length - 1][1] - 1]})$ ?`
      if (context.isAmc) {
        texte += ' On pourra s\'aider en traçant une figure.'
      }
      // construction de la figure

      P.push(point(0, 0))
      droiteP = droiteParPointEtPente(P[0], randint(-1, 1, 0) / 10, `$(d_${numDroites[code[0][0] - 1]})$`, droitecolor(couleurd[0]))
      droiteP.epaisseur = 2
      droite.pointilles = false
      d.push(droiteP)
      objets.push(d[0])
      for (let x = 0; x < code.length; x++) {
        if (code[x][2] === 1) {
          P.push(point((x + 1) * 2, (x + 1) * 2))
          droiteP = droiteParPointEtParallele(P[x + 1], d[x], `$(d_${numDroites[code[x][1] - 1]})$`, droitecolor(couleurd[x + 1]))
          droiteP.epaisseur = 2
          droiteP.pointilles = d[x].pointilles
          d.push(droiteP)
        } else {
          P.push(point((x + 1) * 2, (x + 1) * 2))
          droiteP = droiteParPointEtPerpendiculaire(P[x + 1], d[x], `$(d_${numDroites[code[x][1] - 1]})$`, droitecolor(couleurd[x + 1]))
          droiteP.epaisseur = 2
          droiteP.pointilles = x % 3 + 1
          Inter = pointIntersectionDD(d[x], droiteP)
          PP = rotation(P[x + 1], Inter, 90)
          d.push(droiteP)
          objets.push(codageAngleDroit(PP, Inter, P[x + 1], 'black', 0.6))
        }
        objets.push(d[x + 1])
      }
      for (let i = 0; i < code.length; i++) { // on ajoute les angles droits

      }
      // correction raisonnement ordonné
      context.fenetreMathalea2d = [-2, -2, 15, 10]
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
  this.besoinFormulaireTexte = ['Nombre d\'étapes de raisonnement', 'Nombres séparés par des tirets\n1 : Une étape\n2 : Deux étapes\n3 : Trois étapes\n4 : Mélange']
  this.besoinFormulaire2CaseACocher = ['Que des perpendiculaires', false]
}
