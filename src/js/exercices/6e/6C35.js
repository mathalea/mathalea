/* eslint-disable camelcase */

import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice, rangeMinMax, shuffle, range } from '../../modules/outils/arrays.js'
import { segment } from '../../modules/2d/segment.js'
import { point } from '../../modules/2d/point.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { texteParPosition } from '../../modules/2d/textes.js'
import { deuxColonnesResp, sp, texteEnCouleurEtGras } from '../../modules/outils/contextSensitif.js'
import { max } from 'mathjs'
import { polygone } from '../../modules/2d/polygone.js'
import { jour } from '../../modules/outils/statistiques.js'
import { objet, objetF, objetM, prenomF, prenomM } from '../../modules/outils/objetsPersonnes.js'
export const titre = 'Modéliser des problèmes'
export const interactifReady = true
export const interactifType = 'mathLive'

// Gestion de la date de publication initiale
export const dateDePublication = '24/04/2021'

// Gestion de la date de modification importante
export const dateDeModifImportante = '16/11/2021'
// Passage sur 2 colonnes en sortie HTML

/**
 * Associer huit (ou quatre) problèmes à huit (ou quatre) types de modélisation différents
 * Autre option : faire trouver ces types de modélisation sans proposition (fait par EE sur proposition d'Aude D.)
 * Autre option : faire trouver la méthode de résolution sans utiliser de schéma de modélisation (fait par EE)
 *                et en choisissant le nombre de problèmes (limité à 8 toutefois)
 * @author Mireille Gain, 24 avril 2021
 * Référence 6C35
 * Relecture : Novembre 2021 par EE
*/
export const uuid = '4e89b'
export const ref = '6C35'
export default function ModelisationProblemes () {
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 8
  this.nbQuestionsModifiable = true
  this.sup = 2
  this.sup2 = 3
  this.sup3 = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.video = ''
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true

  this.nouvelleVersion = function () {
    if (this.interactif & this.sup3 === 2) {
      this.sup3 = 3
    }
    if (this.sup3 === 1) {
      this.consigne = 'Trouver l\'opération qui permet de résoudre le problème. Il n\'est pas demandé d\'effectuer le calcul.'
    } else if (this.sup3 === 2) {
      this.consigne = 'Déterminer un schéma à associer à chaque problème. Il n\'est pas demandé de résoudre le problème.'
    } else {
      this.consigne = 'Associer chaque problème avec sa modélisation.'
    }
    this.sup = parseInt(this.sup)
    this.sup3 = parseInt(this.sup3)
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let colorA, colorB
    let lettres
    const schemas = []
    let brouilleLesCartes
    let typesDeQuestionsDisponibles
    let correctionSansSchema = []
    let correctionSansSchemaLatex = ''
    switch (parseInt(this.sup2)) {
      case 1:
        this.nbQuestion = 4
        typesDeQuestionsDisponibles = rangeMinMax(1, 4, [choice(rangeMinMax(1, 4))])
        colorA = 'black'
        lettres = shuffle(['A', 'B', 'C'])
        brouilleLesCartes = shuffle(range(2))
        break
      case 2:
        this.nbQuestions = 4
        typesDeQuestionsDisponibles = [5, 6, 7, 8]
        colorB = 'black'
        lettres = shuffle(['A', 'B', 'C', 'D'])
        brouilleLesCartes = shuffle(range(3))
        break
      case 3:
        this.nbQuestions = 8
        typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8]
        colorA = 'red'
        colorB = 'blue'
        lettres = shuffle(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])
        brouilleLesCartes = shuffle(range(7))
        break
      case 4:
        this.nbQuestions = 8
        typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8]
        colorA = 'black'
        colorB = 'black'
        lettres = shuffle(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])
        brouilleLesCartes = shuffle(range(7))
        break
      default :
        this.nbQuestions = max(parseInt(this.nbQuestions), 1)
        typesDeQuestionsDisponibles = shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, this.nbQuestions)
        colorA = 'black'
        colorB = 'black'
        lettres = shuffle(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']).slice(0, this.nbQuestions)
        brouilleLesCartes = shuffle(range(this.nbQuestions - 1))
    }
    const listeTypeDeQuestions = shuffle(typesDeQuestionsDisponibles)
    const b1 = randint(15, 50)
    let c1 = randint(5, 9)
    const c3 = randint(5, 9)
    const d3 = c3 * randint(7, 13)
    let b5 = randint(15, 50)
    let c5 = randint(5, 9)
    let a7 = randint(9, 13)
    let b7 = randint(15, 50)
    if (this.sup === 2) {
      c1 = c3; b5 = b1; c5 = c1; b7 = d3; a7 = b1
    }
    let A1, A2, A3, A4, A5, A6, A7, A8, B1, B2, B3, B4, B5, B6, B7, B8, C1, C2, C3, C4, C5, C6, C7, C8, D1, D2, D3, D4, D5, D6, D7, D8, n1, n2, n3, n4, n5, n6, n7, n8,
      p1, traitHorizontal1, traitVertical1, tb1, th1, th12,
      p2, traitHorizontal2, traitVertical2, tb2, th2, th22, traitHorizontal22, traitVertical22, traitVertical23, th23, th24, th25,
      p3, traitHorizontal3, traitVertical3, tb3, th3, th32,
      p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45,
      p5, traitHorizontal5, traitVertical5, tb5, th5, th52, traitHorizontal52, traitVertical52, traitVertical53, th53, th54, th55,
      p6, traitHorizontal6, traitVertical6, tb6, th6, th62,
      p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75,
      p8, traitHorizontal8, traitVertical8, tb8, th8, th82

    for (let i = 0, o, colonne1, texteCorr; i < listeTypeDeQuestions.length; i++) {
      colonne1 = ''
      texteCorr = ''

      switch (listeTypeDeQuestions[i]) {
        case 1:
          o = choice([1, 2])
          if (o === 1) {
            colonne1 += `${prenomF()} avait ${b1} ${objetM()} ${jour()}. `
            colonne1 += `<br>Le lendemain, elle en a trouvé ${c1} autres.`
            colonne1 += '<br>Combien cela lui en fait-il ?'
          } else {
            colonne1 += `${prenomM()} a ${c1} ans de moins que sa soeur ${prenomF()}.`
            colonne1 += `<br>Sachant qu'il a ${b1} ans, quel âge a sa soeur ?`
          }
          correctionSansSchema = []
          correctionSansSchema[0] = `${b1}+${c1}`
          correctionSansSchema[1] = `${c1}+${b1}`
          correctionSansSchemaLatex = `${b1} + ${c1}`
          A1 = point(0, 0)
          B1 = point(12, 0)
          C1 = point(12, 4)
          D1 = point(0, 4)
          p1 = polygone([A1, B1, C1, D1], colorA)
          p1.epaisseur = 3
          traitHorizontal1 = segment(point(0, 2), point(12, 2))
          traitVertical1 = segment(point(6, 2), point(6, 4))
          tb1 = texteParPosition('?', 6, 1)
          th1 = texteParPosition(b1, 3, 3)
          th12 = texteParPosition(c1, 9, 3)
          n1 = (this.sup3 === 2) ? texteParPosition('', -1, 4) : texteParPosition(`${lettres[i]}.`, -1, 4)
          schemas[brouilleLesCartes[i]] = mathalea2d({ xmin: -2, ymin: -1, xmax: 16, ymax: 6, style: 'display: inline', pixelsParCm: 15, scale: 0.25 }, p1, traitHorizontal1, traitVertical1, tb1, th1, th12, n1)
          break

        case 2:
          o = choice([1, 2])
          if (o === 1) {
            colonne1 += `${prenomM()} achète ${b1 * c1} ${objetM()} par paquets de ${b1}.`
            colonne1 += '<br>Combien a-t-il acheté de paquets ?'
          } else {
            colonne1 += `${prenomM()} a besoin de ${b1 * c1} ${objetF()}.`
            colonne1 += `<br>Il en récupère ${b1} chaque jour.`
            colonne1 += '<br>Au bout de combien de temps aura-t-il le nécessaire ?'
          }
          correctionSansSchema = []
          correctionSansSchema[0] = `${b1 * c1}\\div${b1}`
          correctionSansSchemaLatex = `${b1 * c1} $\\div$ ${b1}`
          A2 = point(0, 0)
          B2 = point(12, 0)
          C2 = point(12, 4)
          D2 = point(0, 4)
          p2 = polygone([A2, B2, C2, D2], colorA)
          p2.epaisseur = 3
          traitHorizontal2 = segment(point(0, 2), point(12, 2))
          traitHorizontal22 = segment(point(0, 4.5), point(12, 4.5))
          traitHorizontal22.styleExtremites = '<->'
          traitVertical2 = segment(point(2, 2), point(2, 4))
          traitVertical22 = segment(point(4, 2), point(4, 4))
          traitVertical23 = segment(point(10, 2), point(10, 4))
          tb2 = texteParPosition(b1 * c1, 6, 1)
          th2 = texteParPosition(b1, 1, 3)
          th22 = texteParPosition(b1, 3, 3)
          th23 = texteParPosition('...', 7, 3)
          th24 = texteParPosition(b1, 11, 3)
          th25 = texteParPosition('?', 6, 5)
          n2 = (this.sup3 === 2) ? texteParPosition('', -1, 4) : texteParPosition(`${lettres[i]}.`, -1, 4)
          schemas[brouilleLesCartes[i]] = mathalea2d({ xmin: -2, ymin: -1, xmax: 16, ymax: 6, style: 'display: inline', pixelsParCm: 15, scale: 0.25 }, p2, traitHorizontal2, traitVertical2, tb2, th2, th22, traitHorizontal22, traitVertical22, traitVertical23, th23, th24, th25, n2)
          break

        case 3:
          o = choice([1, 2])
          if (o === 1) {
            colonne1 += `${prenomF()} a ${b5} ans.`
            colonne1 += `<br>Sachant qu'elle a ${c5} ans de plus que son frère, quel âge a celui-ci ?`
          } else {
            colonne1 += `${prenomF()} a acheté ${b5} ${objetM()} pour les donner à ses amis.`
            colonne1 += `<br>Il lui en reste encore ${c5} à donner.`
            colonne1 += '<br>Combien en a-t-elle déjà distribué ?'
          }
          correctionSansSchema = []
          correctionSansSchema[0] = `${b5}-${c5}`
          correctionSansSchemaLatex = `${b5} - ${c5}`
          A3 = point(0, 0)
          B3 = point(12, 0)
          C3 = point(12, 4)
          D3 = point(0, 4)
          p3 = polygone([A3, B3, C3, D3], colorA)
          p3.epaisseur = 3
          traitHorizontal3 = segment(point(0, 2), point(12, 2))
          traitVertical3 = segment(point(6, 2), point(6, 4))
          tb3 = texteParPosition(b5, 6, 1)
          th3 = texteParPosition('?', 3, 3)
          th32 = texteParPosition(c5, 9, 3)
          n3 = (this.sup3 === 2) ? texteParPosition('', -1, 4) : texteParPosition(`${lettres[i]}.`, -1, 4)
          schemas[brouilleLesCartes[i]] = mathalea2d({ xmin: -2, ymin: -1, xmax: 16, ymax: 6, style: 'display: inline', pixelsParCm: 15, scale: 0.25 }, p3, traitHorizontal3, traitVertical3, tb3, th3, th32, n3)
          break

        case 4:
          o = choice([1, 2])
          if (o === 1) {
            colonne1 += `${prenomF()} a acheté ${c5} ${objetM()} à ${b5} € pièce.`
            colonne1 += '<br>Combien a-t-elle payé ?'
          } else {
            colonne1 += `${prenomF()} récupère ${c5} paquets de ${b5} ${objetM()} chacun.`
            colonne1 += '<br>Combien en a-t-elle en tout ?'
          }
          correctionSansSchema = []
          correctionSansSchema[0] = `${c5}\\times${b5}`
          correctionSansSchema[1] = `${b5}\\times${c5}`
          correctionSansSchemaLatex = ` ${c5} $\\times$ ${b5}`
          A4 = point(0, 0)
          B4 = point(12, 0)
          C4 = point(12, 4)
          D4 = point(0, 4)
          p4 = polygone([A4, B4, C4, D4], colorA)
          p4.epaisseur = 3
          traitHorizontal4 = segment(point(0, 2), point(12, 2))
          traitHorizontal42 = segment(point(0, 4.5), point(12, 4.5))
          traitHorizontal42.styleExtremites = '<->'
          traitVertical4 = segment(point(2, 2), point(2, 4))
          traitVertical42 = segment(point(4, 2), point(4, 4))
          traitVertical43 = segment(point(10, 2), point(10, 4))
          tb4 = texteParPosition('?', 6, 1)
          th4 = texteParPosition(b5, 1, 3)
          th42 = texteParPosition(b5, 3, 3)
          th43 = texteParPosition('. . .', 7, 3)
          th44 = texteParPosition(b5, 11, 3)
          th45 = texteParPosition(c5, 6, 5)
          n4 = (this.sup3 === 2) ? texteParPosition('', -1, 4) : texteParPosition(`${lettres[i]}.`, -1, 4)
          schemas[brouilleLesCartes[i]] = mathalea2d({ xmin: -2, ymin: -1, xmax: 16, ymax: 6, style: 'display: inline', pixelsParCm: 15, scale: 0.25 }, p4, traitHorizontal4, traitVertical4, tb4, th4, th42, traitHorizontal42, traitVertical42, traitVertical43, th43, th44, th45, n4)
          break

        case 5:
          o = choice([1, 2])
          if (o === 1) {
            colonne1 += `J'ai ${d3} ${objetF()} dans mon sac et je souhaite les partager avec mes ${c3 - 1} amis.`
            colonne1 += '<br>Quelle sera la part de chacun ?'
          } else {
            colonne1 += `${c3} ${objetF()} identiques coûtent ${d3} €.`
            colonne1 += '<br>Quel est le prix d\'une d\'entre elles ?'
          }
          correctionSansSchema = []
          correctionSansSchema[0] = `${d3}$\\div$${c3}`
          correctionSansSchemaLatex = `${d3} $\\div$ ${c3}`
          A5 = point(0, 0)
          B5 = point(12, 0)
          C5 = point(12, 4)
          D5 = point(0, 4)
          p5 = polygone([A5, B5, C5, D5], colorB)
          p5.epaisseur = 3
          traitHorizontal5 = segment(point(0, 2), point(12, 2))
          traitHorizontal52 = segment(point(0, 4.7), point(12, 4.7))
          traitHorizontal52.styleExtremites = '<->'
          traitVertical5 = segment(point(2, 2), point(2, 4))
          traitVertical52 = segment(point(4, 2), point(4, 4))
          traitVertical53 = segment(point(10, 2), point(10, 4))
          tb5 = texteParPosition(d3, 6, 1)
          th5 = texteParPosition('?', 1, 3)
          th52 = texteParPosition('?', 3, 3)
          th53 = texteParPosition('. . .', 7, 3)
          th54 = texteParPosition('?', 11, 3)
          th55 = texteParPosition(c3, 6, 5.2)
          n5 = (this.sup3 === 2) ? texteParPosition('', -1, 4) : texteParPosition(`${lettres[i]}.`, -1, 4)
          schemas[brouilleLesCartes[i]] = mathalea2d({ xmin: -2, ymin: -1, xmax: 16, ymax: 6, style: 'display: inline', pixelsParCm: 15, scale: 0.25 }, p5, traitHorizontal5, traitVertical5, tb5, th5, th52, traitHorizontal52, traitVertical52, traitVertical53, th53, th54, th55, n5)
          break

        case 6:
          o = choice([1, 2])
          if (o === 1) {
            colonne1 += `${prenomF()} récupère ${b7} ${objet()} dans une salle, puis ${a7} dans une autre.`
            colonne1 += '<br>Combien en a-t-elle en tout ?'
          } else {
            colonne1 += `Un lot de ${objetM()} coûte ${b7} € et un lot de ${objetF()} coûte ${a7} €.`
            colonne1 += '<br>Combien coûte l\'ensemble ?'
          }
          correctionSansSchema = []
          correctionSansSchema[0] = `${a7}+${b7}`
          correctionSansSchema[1] = `${b7}+${a7}`
          correctionSansSchemaLatex = `${b7} + ${a7}`
          A6 = point(0, 0)
          B6 = point(12, 0)
          C6 = point(12, 4)
          D6 = point(0, 4)
          p6 = polygone([A6, B6, C6, D6], colorB)
          p6.epaisseur = 3
          traitHorizontal6 = segment(point(0, 2), point(12, 2))
          traitVertical6 = segment(point(6, 2), point(6, 4))
          tb6 = texteParPosition('?', 6, 1)
          th6 = texteParPosition(b7, 3, 3)
          th62 = texteParPosition(a7, 9, 3)
          n6 = (this.sup3 === 2) ? texteParPosition('', -1, 4) : texteParPosition(`${lettres[i]}.`, -1, 4)
          schemas[brouilleLesCartes[i]] = mathalea2d({ xmin: -2, ymin: -1, xmax: 16, ymax: 6, style: 'display: inline', pixelsParCm: 15, scale: 0.25 }, p6, traitHorizontal6, traitVertical6, tb6, th6, th62, n6)
          break

        case 7:
          o = choice([1, 2])
          if (o === 1) {
            colonne1 += `J'ai ${d3} ${objetM()} dans mon sac et je dois les regrouper par ${c3}.`
            colonne1 += '<br>Combien puis-je faire de tas ?'
          } else {
            colonne1 += `J'ai payé ${d3} € pour des ${objetM()} coûtant ${c3} € chacun.`
            colonne1 += '<br>Combien en ai-je acheté ?'
          }
          correctionSansSchema = []
          correctionSansSchema[0] = `${d3}\\div${c3}`
          correctionSansSchemaLatex = `${d3} $\\div$ ${c3}`
          A7 = point(0, 0)
          B7 = point(12, 0)
          C7 = point(12, 4)
          D7 = point(0, 4)
          p7 = polygone([A7, B7, C7, D7], colorB)
          p7.epaisseur = 3
          traitHorizontal7 = segment(point(0, 2), point(12, 2))
          traitHorizontal72 = segment(point(0, 4.7), point(12, 4.7))
          traitHorizontal72.styleExtremites = '<->'
          traitVertical7 = segment(point(2, 2), point(2, 4))
          traitVertical72 = segment(point(4, 2), point(4, 4))
          traitVertical73 = segment(point(10, 2), point(10, 4))
          tb7 = texteParPosition(d3, 6, 1)
          th7 = texteParPosition(c3, 1, 3)
          th72 = texteParPosition(c3, 3, 3)
          th73 = texteParPosition('. . .', 7, 3)
          th74 = texteParPosition(c3, 11, 3)
          th75 = texteParPosition('?', 6, 5.2)
          n7 = (this.sup3 === 2) ? texteParPosition('', -1, 4) : texteParPosition(`${lettres[i]}.`, -1, 4)
          schemas[brouilleLesCartes[i]] = mathalea2d({ xmin: -2, ymin: -1, xmax: 16, ymax: 6, style: 'display: inline', pixelsParCm: 15, scale: 0.25 }, p7, traitHorizontal7, traitVertical7, tb7, th7, th72, traitHorizontal72, traitVertical72, traitVertical73, th73, th74, th75, n7)
          break

        case 8:
          o = choice([1, 2])
          if (o === 1) {
            colonne1 += `Dans un sac, il y a ${a7} ${objetF()} et dans l'autre, il y en a ${b7}.`
            colonne1 += '<br>Combien y en a-t-il de plus dans ce deuxième sac ?'
          } else {
            colonne1 += `${prenomF()} a trouvé ${b7} ${objetF()} et ${prenomM()} en a trouvé ${a7}.`
            colonne1 += '<br>Combien en a-t-il de moins qu\'elle ?'
          }
          correctionSansSchema = []
          correctionSansSchema[0] = `${b7}-${a7}`
          correctionSansSchemaLatex = `${b7} - ${a7}`
          A8 = point(0, 0)
          B8 = point(12, 0)
          C8 = point(12, 4)
          D8 = point(0, 4)
          p8 = polygone([A8, B8, C8, D8], colorB)
          p8.epaisseur = 3
          traitHorizontal8 = segment(point(0, 2), point(12, 2))
          traitVertical8 = segment(point(6, 2), point(6, 4))
          tb8 = texteParPosition(b7, 6, 1)
          th8 = texteParPosition(a7, 3, 3)
          th82 = texteParPosition('?', 9, 3)
          n8 = (this.sup3 === 2) ? texteParPosition('', -1, 4) : texteParPosition(`${lettres[i]}.`, -1, 4)
          schemas[brouilleLesCartes[i]] = mathalea2d({ xmin: -2, ymin: -1, xmax: 16, ymax: 6, style: 'display: inline', pixelsParCm: 15, scale: 0.25 }, p8, traitHorizontal8, traitVertical8, tb8, th8, th82, n8)
          break
      }
      if (this.correctionDetaillee) {
        texteCorr += colonne1 + '<br><br>'
      }

      if (this.sup3 === 1) {
        setReponse(this, i, correctionSansSchema, { formatInteractif: 'texte' })
        texteCorr += "L'opération qui peut résoudre le problème est : "
        texteCorr += texteEnCouleurEtGras(correctionSansSchemaLatex)
        colonne1 += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texte: sp(5) + '<br>Opération :' })
      } else if (this.sup3 === 2) {
        texteCorr += 'Cet énoncé peut être associé avec le schéma ci-dessous.<br>' + schemas[brouilleLesCartes[i]]
      } else {
        texteCorr += `Cet énoncé est associé avec le schéma ${lettres[i]}.`
        setReponse(this, i, [lettres[i], lettres[i].toLowerCase()], { formatInteractif: 'texte' })
        if (this.correctionDetaillee) {
          texteCorr += '<br>' + schemas[brouilleLesCartes[i]]
        }
        colonne1 += ajouteChampTexteMathLive(this, i, 'largeur15 inline', { texte: sp(5) + '<br>Schéma :' })
      }
      this.listeQuestions.push(colonne1)
      this.listeCorrections.push(texteCorr)
    }

    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
    let colonne2 = ''
    if (this.sup3 === 3) {
      colonne2 = `Les schémas à associer à chacun des énoncés sont : ${context.isHtml ? '<br>' : '\\\\\n'}`
      for (let j = 0; j < Math.min(4, listeTypeDeQuestions.length); j++) {
        colonne2 += schemas[j]
      }
      colonne2 += context.isHtml ? '<br>' : '\\\\\n'
      for (let j = 4; j < Math.min(8, listeTypeDeQuestions.length); j++) {
        colonne2 += schemas[j]
      }
    }
    if (context.isHtml & this.sup3) {
      this.contenu = deuxColonnesResp(this.contenu, colonne2, 35)
    } else {
      this.contenu += colonne2
    }
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Valeurs différentes suivant les exercices\n2 : Valeurs identiques dans tous les exercices']
  this.besoinFormulaire2Numerique = ['Sélection de problèmes', 4, '1 : 3 problèmes basés sur les mêmes nombres\n2 : 4 problèmes basés sur les mêmes nombres\n3 : 8 problèmes (par groupe de 4, avec distinction de 2 couleurs)\n4 : 8 problèmes mélangés (sans distinction de couleurs)\n5 : Nombre de problèmes choisi par l\'utilisateur']
  this.besoinFormulaire3Numerique = ['Variante avec les schémas', 4, '1 : Sans aucun schéma\n2 : Avec des schémas uniquement dans la correction\n3 : Avec des schémas dans l\'énoncé et la correction']
}
