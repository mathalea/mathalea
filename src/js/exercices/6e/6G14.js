import Exercice from '../Exercice.js'
import { mathalea2d, vide2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, range, egal, rangeMinMax, shuffle, combinaisonListes, contraindreValeur, choice } from '../../modules/outils.js'
import { point, pointIntersectionDD, droite, droiteParPointEtParallele, droiteParPointEtPerpendiculaire, droiteParPointEtPente, rotation, codageAngleDroit, latexParCoordonneesBox, pointSurDroite, segment, pointIntersectionCC } from '../../modules/2d.js'
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
        // \n1 : Une étape (de 0 à 3)\n2 : Une étape avec distracteur (de 4 à 6)\n3 : Deux étapes (de 9 à 15)\n4 : Trois étapes (de 19 à 31)\n5 : Mélange']
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
      const labels = []
      P.push(point(0, 0))
      let droiteP = droiteParPointEtPente(P[0], randint(-1, 1, -2) / 10, '', droiteColor[couleurd[0]])
      droiteP.epaisseur = 2
      droite.pointilles = false
      d.push(droiteP)
      const droiteE = droite(point(droiteP.x1, droiteP.y1), point(droiteP.x2, droiteP.y2), '')
      droiteE.epaisseur = 2
      dE.push(droiteE)
      labels.push(labelOnLine(droiteE, `$(d_${numDroites[codeAll[0][0] - 1]})$`))
      objets.push(d[0])
      objets2.push(dE[0])
      for (let x = 0; x < codeAll.length; x++) {
        if (codeAll[x][2] === 1) {
          P.push(point((x + 1) * 2, (x + 1) * 2))
          droiteP = droiteParPointEtParallele(P[x + 1], d[codeAll[x][0] - 1], '', droiteColor[couleurd[x + 1]])
          droiteP.epaisseur = 2
          droiteP.pointilles = d[[codeAll[x][0] - 1]].pointilles
          d.push(droiteP)
          const droiteP2 = droite(point(droiteP.x1, droiteP.y1), point(droiteP.x2, droiteP.y2), '')
          droiteP2.epaisseur = 2
          dE.push(droiteP2)
          labels.push(labelOnLine(droiteP2, `$(d_${numDroites[codeAll[x][1] - 1]})$`))
        } else {
          P.push(point((x + 1) * 2, (x + 1) * 2))
          droiteP = droiteParPointEtPerpendiculaire(P[x + 1], d[codeAll[x][0] - 1], '', droiteColor[couleurd[x + 1]])
          droiteP.epaisseur = 2
          droiteP.pointilles = x % 3 + 1
          d.push(droiteP)
          const droiteP2 = droite(point(droiteP.x1, droiteP.y1), point(droiteP.x2, droiteP.y2), '')
          labels.push(labelOnLine(droiteP2, `$(d_${numDroites[codeAll[x][1] - 1]})$`))
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
      objets2.push(...labels)
      objets.push(...labels)

      if (this.sup3) {
        texte += (context.vue === 'diap' ? '<center>' : '') + mathalea2d({ xmin: -2, xmax: 15, ymin: -2, ymax: 10, pixelsParCm: 20, scale: (context.vue !== 'latex' ? 0.3 : 0.6), mainlevee: false, amplitude: 0.3 }, objets2) + '<br>' + (context.vue === 'diap' ? '</center>' : '')
      }
      texte += `Que peut-on dire de $(d_${numDroites[code[0][0] - 1]})$ et $(d_${numDroites[code[code.length - 1][1] - 1]})$ ?`
      if (context.isAmc && !this.sup3) {
        texte += ' On pourra s\'aider en traçant une figure.'
      }

      // correction raisonnement ordonné
      texteCorr = 'À partir de l\'énoncé, on peut réaliser le schéma suivant (il en existe une infinité).<br>'
      if ([2, 5, 15, 31].indexOf(listeTypeDeQuestions[i]) === -1 && !this.sup2) {
        texteCorr += ' Les droites données parallèles dans l\'énoncé sont de même '
        texteCorr += (context.html) ? ' couleur/style.<br>' : 'style.<br>'
      }
      texteCorr += mathalea2d({ xmin: -2, xmax: 15, ymin: -2, ymax: 10, pixelsParCm: 20, scale: (context.vue !== 'latex' ? 0.3 : 0.6), mainlevee: false, amplitude: 0.3 }, objets) + '<br>'
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
  this.besoinFormulaireTexte = ['Nombre d\'étapes de raisonnement', 'Nombres séparés par des tirets\n1 : Une étape\n2 : Une étape avec distracteur\n3 : Deux étapes\n4 : Trois étapes\n5 : Mélange']
  this.besoinFormulaire2CaseACocher = ['Que des perpendiculaires', false]
  this.besoinFormulaire3CaseACocher = ['Avec le dessin', true]
}
/**
 * Ajouter une étiquette sur une droite.
 * @param {*} droite La droite où on va rajouter une étiquette
 * @param {*} nom Le nom de la droite doit être au format latex, c'est-à-dire compris entre $ et $
 * @param {*} options Les options permettant de personnaliser la position de l'étiquette et la mise en forme
 *  options.preferedPosition La position à privilégier si possible sur le bord de l'image ('left', 'right', 'above', 'below'), par défaut 'left'
 *  options.usedPosition Un tableau des anciennes positions déjà allouées pour éviter les colisions avec des étiquettes d'autres droites
 *  options.taille La taille de la police de l'étiquette par défaut 6
 *  options.color La couleur de l'étiquette par défaut 'red'
 * @returns LatexParCoordonneesBox L'étiquette
 *
 * Exemple :
 *   context.fenetreMathalea2d = [xmin + 0.2, ymin, xmax, ymax] // important pour la position des labels
 *   const d3nom = labelOnLine(d3, '$' + noms[3] + '$', { color: 'blue', taille: 8, preferedPosition: 'left' })
 *   const d0nom = labelOnLine(d0, '$' + noms[0] + '$', { color: 'red', taille: 8, usedPosition: [d3nom] })
 *
 * @author Mickael Guironnet
 */
export function labelOnLine (droite, nom, options = {}) {
  if (options.preferedPosition === undefined) options.preferedPosition = 'left'
  if (options.usedPosition === undefined) options.usedPosition = []
  if (options.taille === undefined) options.taille = 6
  if (options.color === undefined) options.color = 'red'

  const largeur = Math.ceil((nom.replaceAll('$', '').length) * 10 * Math.log10(options.taille))
  const hauteur = 20

  let absNom, ordNom, leNom, anchor, usedPosition; const positions = []
  if (nom !== '') {
    if (egal(droite.b, 0, 0.05)) { // ax+c=0 x=-c/a est l'équation de la droite
      // droite quasi verticale
      absNom = -droite.c / droite.a + largeur * 0.5 / context.pixelsParCm + 2 / context.pixelsParCm
      ordNom = context.fenetreMathalea2d[1] + 1 // l'ordonnée du label est ymin +1
      anchor = 'right'
      usedPosition = 'below'
      leNom = latexParCoordonneesBox(nom.substr(1, nom.length - 2), absNom, ordNom, options.color, largeur, hauteur, '', options.taille, { anchor })
      positions.push({ label: leNom, position: usedPosition })
    } else if (egal(droite.a, 0, 0.05)) { // by+c=0 y=-c/b est l'équation de la droite
      // droite quasi horizontale
      absNom = context.fenetreMathalea2d[0] + 1 // l'abscisse du label est xmin +1
      ordNom = -droite.c / droite.b + hauteur * 0.5 / context.pixelsParCm
      anchor = 'above'
      usedPosition = 'left'
      leNom = latexParCoordonneesBox(nom.substr(1, nom.length - 2), absNom, ordNom, options.color, largeur, hauteur, '', options.taille, { anchor })
      positions.push({ label: leNom, position: usedPosition })
    } else { // a et b sont différents de 0 ax+by+c=0 est l'équation
      // y=(-a.x-c)/b est l'equation cartésienne et x=(-by-c)/a
      const y0 = (-droite.a * (context.fenetreMathalea2d[0] + 1) - droite.c) / droite.b
      const y1 = (-droite.a * (context.fenetreMathalea2d[2] - 1) - droite.c) / droite.b
      const x0 = (-droite.b * (context.fenetreMathalea2d[1] + 1) - droite.c) / droite.a
      const x1 = (-droite.b * (context.fenetreMathalea2d[3] - 1) - droite.c) / droite.a
      if (y0 > context.fenetreMathalea2d[1] && y0 < context.fenetreMathalea2d[3]) {
        // à gauche
        absNom = context.fenetreMathalea2d[0] + 1
        ordNom = y0 - droite.pente * (largeur * 0.5 / context.pixelsParCm) + (droite.pente > 0 ? -1 : 1) * hauteur * 0.5 / context.pixelsParCm
        anchor = (droite.pente > 0 ? 'below' : 'above')
        usedPosition = 'left'
        if (ordNom < context.fenetreMathalea2d[1] + 1 || ordNom > context.fenetreMathalea2d[3] - 1) {
          // console.log('problème:nom:' + nom + ':position:' + usedPosition + (context.fenetreMathalea2d[1] + 1) + '<' + ordNom + '<' + (context.fenetreMathalea2d[3] - 1))
        } else {
          leNom = latexParCoordonneesBox(nom.substr(1, nom.length - 2), absNom, ordNom, options.color, largeur, hauteur, '', options.taille, { anchor })
          positions.push({ label: leNom, position: usedPosition })
        }
      }
      if (y1 > context.fenetreMathalea2d[1] && y1 < context.fenetreMathalea2d[3]) {
        // à droite
        absNom = context.fenetreMathalea2d[2] - 1
        ordNom = y1 - droite.pente * (largeur * 0.5 / context.pixelsParCm) + (droite.pente > 0 ? -1 : 1) * hauteur * 0.5 / context.pixelsParCm
        anchor = (droite.pente > 0 ? 'below' : 'above')
        usedPosition = 'right'
        if (ordNom < context.fenetreMathalea2d[1] + 1 || ordNom > context.fenetreMathalea2d[3] - 1) {
          // console.log('problème:nom:' + nom + ':position:' + usedPosition + (context.fenetreMathalea2d[1] + 1) + '<' + ordNom + '<' + (context.fenetreMathalea2d[3] - 1))
        } else {
          leNom = latexParCoordonneesBox(nom.substr(1, nom.length - 2), absNom, ordNom, options.color, largeur, hauteur, '', options.taille, { anchor })
          positions.push({ label: leNom, position: usedPosition })
        }
      }
      if (x0 > context.fenetreMathalea2d[0] && x0 < context.fenetreMathalea2d[2]) {
        // en bas
        absNom = x0 + (droite.pente > 0 ? -1 : 1) * largeur * 0.5 / context.pixelsParCm - (droite.pente > 0 ? 1 : 1) * (hauteur * 0.5 / context.pixelsParCm) / droite.pente - (droite.pente > 0 ? 1 : -1) * 2 / context.pixelsParCm
        ordNom = context.fenetreMathalea2d[1] + 1
        anchor = (droite.pente > 0 ? 'left' : 'right')
        usedPosition = 'below'
        if (absNom < context.fenetreMathalea2d[0] + 1 || absNom > context.fenetreMathalea2d[2] - 1) {
          // console.log('problème:nom:' + nom + ':position:' + usedPosition + (context.fenetreMathalea2d[0] + 1) + '<' + absNom + '<' + (context.fenetreMathalea2d[2] - 1))
        } else {
          leNom = latexParCoordonneesBox(nom.substr(1, nom.length - 2), absNom, ordNom, options.color, largeur, hauteur, '', options.taille, { anchor })
          positions.push({ label: leNom, position: usedPosition })
        }
      }
      if (x1 > context.fenetreMathalea2d[0] && x1 < context.fenetreMathalea2d[2]) {
        // au haut
        absNom = x1 + (droite.pente > 0 ? -1 : 1) * largeur * 0.5 / context.pixelsParCm - (droite.pente > 0 ? 1 : 1) * (hauteur * 0.5 / context.pixelsParCm) / droite.pente - (droite.pente > 0 ? 1 : -1) * 2 / context.pixelsParCm
        ordNom = context.fenetreMathalea2d[3] - 1
        anchor = (droite.pente > 0 ? 'left' : 'right')
        usedPosition = 'above'
        if (absNom < context.fenetreMathalea2d[0] + 1 || absNom > context.fenetreMathalea2d[2] - 1) {
          // console.log('problème:nom:' + nom + ':position:' + usedPosition + (context.fenetreMathalea2d[0] + 1) + '<' + absNom + '<' + (context.fenetreMathalea2d[2] - 1))
        } else {
          leNom = latexParCoordonneesBox(nom.substr(1, nom.length - 2), absNom, ordNom, options.color, largeur, hauteur, '', options.taille, { anchor })
          positions.push({ label: leNom, position: usedPosition })
        }
      }
      if (positions.length === 0) {
        // au milieu
        absNom = (context.fenetreMathalea2d[0] + context.fenetreMathalea2d[2]) / 2
        ordNom = pointSurDroite(droite, absNom).y
        anchor = (droite.pente > 0 ? 'left' : 'right')
        usedPosition = 'middle'
        leNom = latexParCoordonneesBox(nom.substr(1, nom.length - 2), absNom, ordNom, options.color, largeur, hauteur, '', options.taille, { anchor })
        positions.push({ label: leNom, position: usedPosition })
      }
    }

    // vérifie s'il y a des colisions entre labels
    for (let i = 0; i < positions.length; i++) {
      const coli = []
      for (let j = 0; j < options.usedPosition.length; j++) {
        const label = options.usedPosition[j]
        const dis = segment(point(label.x, label.y), point(positions[i].label.x, positions[i].label.y)).longueur * context.pixelsParCm
        // console.log('nom:' + nom + ':position:' + positions[i].position + ':i:' + i + ':j:' + j + ':dis:' + dis + 'texte:' + label.texte)
        const r0 = Math.max(label.largeur / 2, label.hauteur / 2)
        const r1 = Math.max(positions[i].label.largeur / 2, positions[i].label.hauteur / 2)
        let colision = true
        if (dis > r0 + r1 || dis < Math.abs(r0 - r1)) colision = false
        coli[j] = [dis, colision]
      }
      positions[i].colision = coli
    }
    // 1ere stratégie : la préférence de l'utilisateur
    // on vérifie seulement s'il y a une colision
    const found = [false, 0]
    for (let i = 0; i < positions.length && !found[0]; i++) {
      if (positions[i].position === options.preferedPosition) {
        found[0] = true
        for (let j = 0; j < options.usedPosition.length; j++) {
          if (positions[i].colision[j][2]) found[0] = false
        }
        found[1] = i
        // console.log('1er : nom:' + nom + ':position:' + positions[i].position + ':i:' + i + ':preferedPosition:' + options.preferedPosition)
      }
    }

    // 2e stratégie : le plus loin en terme de distance!
    let disMax = [0, 0, 0]
    for (let i = 0; i < positions.length && !found[0]; i++) {
      let dis = [1000, 0, 0]
      for (let j = 0; j < options.usedPosition.length; j++) {
        if (positions[i].colision[j][0] < dis[0]) {
          dis = [positions[i].colision[j][0], i, j]
          // console.log('2e:nom:' + nom + ':position:' + positions[i].position + ':i:' + i + ':j:' + j + 'dis:' + dis[0])
        }
      }
      if (dis[0] > disMax[0]) {
        disMax = dis
        // console.log('Max 2e:nom:' + nom + ':position:' + positions[i].position + ':i:' + i + 'dis:' + dis[0])
      }
    }
    leNom = found[0] ? positions[found[1]].label : (disMax[0] > 0 ? positions[disMax[1]].label : positions[0].label)
  } else {
    leNom = vide2d()
  }
  return leNom
}
