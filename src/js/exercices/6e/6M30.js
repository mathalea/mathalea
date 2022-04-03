import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, arrondi, calcul, texNombrec, texNombre, texFraction, rangeMinMax, contraindreValeur, compteOccurences } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import Grandeur from '../../modules/Grandeur.js'

export const titre = 'Calculer le volume de solides donnés'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
/**
 * Calcul de volumes.
 * @author Jean-Claude Lhote // modifié par Mireille Gain pour y ajouter les décimaux
 * référence 6M30
 */

export default function CalculDeVolumes () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Calculer, en détaillant, le volume des solides donnés. Arrondir à l'unité."
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.classe = 6
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.sup3 = 2
  this.sup4 = 8
  this.nouvelleVersion = function (numeroExercice) {
    this.interactifType = parseInt(this.sup3) === 2 ? 'mathLive' : 'qcm'
    this.autoCorrection = []
    let typesDeQuestionsDisponibles = []
    let thissup4Max
    switch (this.classe) {
      case 6 : thissup4Max = 2
        break
      case 5 : thissup4Max = 4
        break
      case 4 : thissup4Max = 6
        break
      case 3 : thissup4Max = 7
        break
    }
    if (!this.sup4) { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = rangeMinMax(1, thissup4Max)
    } else {
      if (typeof (this.sup4) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        typesDeQuestionsDisponibles[0] = contraindreValeur(1, thissup4Max + 1, this.sup4, thissup4Max + 1)
      } else {
        typesDeQuestionsDisponibles = this.sup4.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, thissup4Max + 1, parseInt(typesDeQuestionsDisponibles[i]), thissup4Max + 1) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(typesDeQuestionsDisponibles, thissup4Max + 1) > 0) typesDeQuestionsDisponibles = rangeMinMax(1, thissup4Max) // Teste si l'utilisateur a choisi tout

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const listeUnites = [
      ['~\\text{m}', '~\\text{m}^3', 'm^3'],
      ['~\\text{dm}', '~\\text{dm}^3', 'dm^3'],
      ['~\\text{cm}', '~\\text{cm}^3', 'cm^3'],
      ['~\\text{mm}', '~\\text{mm}^3', 'mm^3']
    ]
    let partieDecimale1, partieDecimale2, partieDecimale3
    if (this.sup2) {
      partieDecimale1 = calcul(randint(1, 9) / 10 * randint(0, 1))
      partieDecimale2 = calcul(randint(1, 9) / 10 * randint(0, 1))
      partieDecimale3 = calcul(randint(1, 9) / 10 * randint(0, 1))
    } else {
      partieDecimale1 = 0
      partieDecimale2 = 0
      partieDecimale3 = 0
    }
    for (let i = 0, texte, texteCorr, L, l, h, c, r, j, resultat, resultat2, resultat3, resultat4, volume, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      switch (listeTypeDeQuestions[i]) {
        case 1: // cube
          c = calcul(randint(2, 10) + partieDecimale1)
          volume = c * c * c
          j = randint(0, 3) // pour le choix de l'unité
          texte = `Un cube de $${texNombre(c)} ${listeUnites[j][0]}$ d'arête en $${listeUnites[j][1]}$.`
          texteCorr = `$\\mathcal{V}= c^3 =c \\times c \\times c = ${texNombre(c)}${listeUnites[j][0]}\\times${texNombre(c)}${listeUnites[j][0]}\\times${texNombre(c)}${listeUnites[j][0]}=${texNombrec(volume)}${listeUnites[j][1]}`
          if (volume !== Math.round(volume)) {
            texteCorr += `\\approx ${Math.round(volume)}${listeUnites[j][1]}$`
          } else {
            texteCorr += '$'
          }
          resultat = Math.round(volume)
          if (c !== 6) resultat2 = Math.round(6 * c * c)
          else resultat2 = Math.round(24 * c)
          if (c !== 2) resultat3 = Math.round(4 * c)
          else resultat3 = 24
          resultat4 = Math.round(6 * c)
          break
        case 2: // pavé droit
          if (this.sup === 1) { // sans conversion
            j = randint(0, 3) // pour le choix de l'unité
            l = calcul(randint(2, 5) + partieDecimale1)
            h = calcul(randint(3, 6) + partieDecimale2)
            L = calcul(randint(6, 10) + partieDecimale3)
            volume = l * L * h
            texte = `Un pavé droit de $${texNombre(l)}${listeUnites[j][0]}$ de largeur, de $${texNombre(L)}${listeUnites[j][0]}$ de longueur et de $${texNombre(h)}${listeUnites[j][0]}$ de hauteur en $${listeUnites[j][1]}$.`
            texteCorr = `$\\mathcal{V}= l \\times L \\times h = ${texNombre(l)}${listeUnites[j][0]}\\times${texNombre(L)}${listeUnites[j][0]}\\times${texNombre(h)}${listeUnites[j][0]}=${texNombrec(volume)}${listeUnites[j][1]}`
            if (volume !== Math.round(volume)) {
              texteCorr += `\\approx ${Math.round(volume)}${listeUnites[j][1]}$`
            } else {
              texteCorr += '$'
            }
            resultat = Math.round(volume)
            resultat2 = Math.round(6 * (l + L + h))
            resultat3 = Math.round(2 * l * L + 2 * L * h + 2 * l * h)
            resultat4 = Math.round(2 * (l + L + h))
          } else {
            // avec conversion
            j = randint(1, 2) // pour le choix de l'unité  centrale
            l = calcul(randint(2, 5) + partieDecimale1)
            h = calcul(randint(3, 6) * 10 + partieDecimale2)
            L = arrondi(randint(6, 10) / 10, 1)
            volume = l * L * h
            texte = `Un pavé droit de $${texNombre(l)}${listeUnites[j][0]}$ de largeur, de $${texNombre(L)}${listeUnites[j - 1][0]}$ de longueur et de $${texNombre(h)}${listeUnites[j + 1][0]}$ de hauteur en $${listeUnites[j][1]}$.`
            texteCorr = `$\\mathcal{V}= l \\times L \\times h = ${texNombre(l)}${listeUnites[j][0]}\\times${texNombre(L)}${listeUnites[j - 1][0]}\\times${texNombre(h)}${listeUnites[j + 1][0]}=${l}${listeUnites[j][0]}\\times${texNombrec(L * 10)}${listeUnites[j][0]}\\times${texNombrec(h / 10)}${listeUnites[j][0]}=${texNombrec(volume)}${listeUnites[j][1]}`
            if (volume !== Math.round(volume)) {
              texteCorr += `\\approx ${Math.round(volume)}${listeUnites[j][1]}$`
            } else {
              texteCorr += '$'
            }
            resultat = Math.round(volume)
            resultat2 = Math.round(6 * (l + L + h))
            resultat3 = Math.round(2 * l * L + 2 * L * h + 2 * l * h)
            resultat4 = Math.round(2 * (l + L + h))
          }
          break
        case 3: // Cylindre
          if (this.sup === 1) {
            // sans conversion
            j = randint(0, 3) // pour le choix de l'unité
            r = randint(2, 10)
            h = randint(2, 15)
            volume = r * r * h * Math.PI
            resultat = Math.round(volume)
            resultat2 = Math.round(4 * volume)
            resultat3 = Math.round(volume / 2)
            resultat4 = Math.round(2 * volume)
            texte = `Un cylindre de $${r}${listeUnites[j][0]}$ de rayon et de $${texNombre(h)}${listeUnites[j][0]}$ de hauteur en $${listeUnites[j][1]}$.`
            texteCorr = `$\\mathcal{V}=\\pi \\times R ^2 \\times h =\\pi\\times\\left(${r}${listeUnites[j][0]}\\right)^2\\times${h}${listeUnites[j][0]}=${texNombrec(
              r * r * h
            )}\\pi${listeUnites[j][1]}\\approx${texNombrec(
              arrondi(volume, 0)
            )}${listeUnites[j][1]}$`
          } else {
            j = randint(2, 3) // pour le choix de l'unité
            r = randint(2, 10)
            h = randint(20, 150)
            texte = `Un cylindre de $${r}${listeUnites[j][0]}$ de rayon et de $${texNombrec(h / 10)}${listeUnites[j - 1][0]}$ de hauteur en $${listeUnites[j][1]}$.`
            texteCorr = `$\\mathcal{V}=\\pi \\times R ^2 \\times h =\\pi\\times\\left(${r}${listeUnites[j][0]}\\right)^2\\times${texNombrec(h / 10)}${listeUnites[j - 1][0]}=\\pi\\times${r * r}${listeUnites[j][0]}^2\\times${h}${listeUnites[j][0]}=${texNombrec(r * r * h)}\\pi${listeUnites[j][1]}\\approx${Math.round(volume)}${listeUnites[j][1]}$`
            resultat = Math.round(volume)
            resultat2 = Math.round(4 * volume)
            resultat3 = Math.round(volume / 2)
            resultat4 = Math.round(2 * volume)
          }
          break
        case 4: // prisme droit
          if (this.sup === 1) {
            // sans conversion
            j = randint(0, 3) // pour le choix de l'unité
            c = calcul(randint(2, 10) + partieDecimale3)
            h = randint(2, 5)
            l = randint(6, 10)
            volume = (c * h * l) / 2
            texte = `Un prisme droit de hauteur $${texNombre(l)}${listeUnites[j][0]}$ et dont les bases sont des triangles de base $${texNombre(c)}${listeUnites[j][0]}$ et de hauteur correspondante $${h}${listeUnites[j][0]}$ en $${listeUnites[j][1]}$.`
            texteCorr = `$\\mathcal{V}=\\mathcal{B} \\times h=\\dfrac{${texNombre(c)}${listeUnites[j][0]}\\times${texNombre(h)}${listeUnites[j][0]}}{2}\\times${texNombre(l)}${listeUnites[j][0]}=${texNombre(volume)}${listeUnites[j][1]}`
            if (volume !== Math.round(volume)) {
              texteCorr += `\\approx ${Math.round(volume)}${listeUnites[j][1]}$`
            } else {
              texteCorr += '$'
            }
            resultat = Math.round(volume)
            resultat2 = Math.round(4 * volume)
            resultat3 = Math.round((c + h) * l)
            resultat4 = Math.round(2 * volume)
          } else {
            j = randint(1, 2) // pour le choix de l'unité
            c = calcul(randint(2, 10) + partieDecimale3)
            h = randint(30, 50)
            l = arrondi(randint(5, 15) / 10, 1)
            texte = `Un prisme droit de hauteur $${texNombre(l)}${listeUnites[j - 1][0]}$ et dont les bases sont des triangles de base $${texNombre(c)}${listeUnites[j][0]}$ et de hauteur correspondante $${h}${listeUnites[j + 1][0]}$ en $${listeUnites[j][1]}$.`
            texteCorr = `$\\mathcal{V}=\\mathcal{B} \\times h=\\dfrac{${c}${listeUnites[j][0]}\\times${h}${listeUnites[j + 1][0]}}{2}\\times${texNombrec(l)}${listeUnites[j - 1][0]}=\\dfrac{${c}${listeUnites[j][0]}\\times${texNombrec(
              calcul(h / 10)
            )}${listeUnites[j][0]}}{2}\\times${l * 10}${listeUnites[j][0]}=${texNombre(volume)}${listeUnites[j][1]}`
            if (volume !== Math.round(volume)) {
              texteCorr += `\\approx ${Math.round(volume)}${listeUnites[j][1]}$`
            } else {
              texteCorr += '$'
            }
            resultat = Math.round(volume)
            resultat2 = Math.round(4 * volume)
            resultat3 = Math.round((c + h) * l)
            resultat4 = Math.round(2 * volume)
          }
          break
        case 5: // cone
          if (this.sup === 1) {
            // sans conversion
            j = randint(0, 3) // pour le choix de l'unité
            r = randint(2, 10)
            h = randint(2, 15)
            volume = (r * r * h * Math.PI) / 3
            texte = `Un cône de $${r}${listeUnites[j][0]}$ de rayon et de $${texNombre(h)}${listeUnites[j][0]}$ de hauteur en $${listeUnites[j][1]}$.`
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${listeUnites[j][0]}\\right)^2\\times${h}${listeUnites[j][0]}=${texFraction(
              r * r * h,
              3
            )}\\pi${listeUnites[j][1]}\\approx${texNombrec(Math.round(volume))}${listeUnites[j][1]}$`
            resultat = Math.round(volume)
            resultat2 = Math.round(4 * volume)
            resultat3 = Math.round(volume / 2)
            resultat4 = Math.round(2 * volume)
          } else {
            j = randint(2, 3) // pour le choix de l'unité
            r = randint(2, 10)
            h = randint(20, 150)
            volume = (r * r * h * Math.PI) / 3
            texte = `Un cône de $${texNombre(r)}${listeUnites[j][0]}$ de rayon et de $${texNombrec(h / 10)}${listeUnites[j - 1][0]}$ de hauteur en $${listeUnites[j][1]}$.`
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${listeUnites[j][0]}\\right)^2\\times${texNombrec(calcul(h / 10))}${listeUnites[j - 1][0]}=\\dfrac{1}{3}\\times\\pi\\times\\left(${r}${listeUnites[j][0]}\\right)^2\\times${texNombrec(h)}${listeUnites[j][0]}=${texFraction(r * r * h, 3)}\\pi\\approx${texNombre(Math.round(volume))}${listeUnites[j][1]}$`
            resultat = Math.round(volume)
            resultat2 = Math.round(4 * volume)
            resultat3 = Math.round(volume / 2)
            resultat4 = Math.round(2 * volume)
          }
          break
        case 6: // pyramide
          if (this.sup === 1) {
            // sans conversion
            j = randint(0, 3) // pour le choix de l'unité
            c = calcul(randint(2, 10) + partieDecimale2)
            h = randint(2, 5)
            l = randint(6, 10)
            volume = (c * c * h) / 3
            texte = `Une pyramide de hauteur $${h}${listeUnites[j][0]}$ et dont la base  est un carré de $${texNombre(c)}${listeUnites[j][0]}$ de côté en $${listeUnites[j][1]}$.`
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\left(${texNombre(c)}${listeUnites[j][0]}\\right)^2\\times${h}${listeUnites[j][0]}`
            if (calcul((c * c * h) / 3, false) === arrondi((c * c * h) / 3, 1)) {
              texteCorr += `=${texNombrec(
                arrondi(calcul((c * c * h) / 3), 1)
              )}${listeUnites[j][1]}$`
            } else {
              texteCorr += `\\approx${texNombre(Math.round(volume))}${listeUnites[j][1]}$`
            }
            resultat = Math.round(volume)
            resultat2 = Math.round(3 * volume)
            resultat3 = Math.round(3 * volume / 4)
            resultat4 = Math.round(volume / 2)
          } else {
            j = randint(1, 2) // pour le choix de l'unité
            c = calcul(randint(2, 10) + partieDecimale2)
            h = randint(30, 50)
            l = arrondi(randint(5, 15) / 10, 1)
            volume = (c * c * h) / 3
            texte = `Une pyramide de hauteur $${texNombrec(h / 10)}${listeUnites[j - 1][0]}$ et dont la base  est un carré de $${texNombre(c)}${listeUnites[j][0]}$ et de hauteur correspondante $${h}${listeUnites[j + 1][0]}$ en $${listeUnites[j][1]}$.`
            texteCorr = `$\\mathcal{V}=\\dfrac{1}{3} \\times \\mathcal{B} \\times h=\\dfrac{1}{3}\\times\\left(${texNombre(c)}${listeUnites[j][0]}\\right)^2\\times${texNombrec(h / 10)}${listeUnites[j - 1][0]}=\\dfrac{1}{3}\\times${c * c}${listeUnites[j][0]}^2\\times${texNombrec(h)}${listeUnites[j][0]}`
            if (volume === Math.round(volume)) {
              texteCorr += `=${texNombre(Math.round(volume))}${listeUnites[j][1]}$`
            } else {
              texteCorr += `\\approx${texNombre(Math.round(volume))}${listeUnites[j][1]}$`
            }
            resultat = Math.round(volume)
            resultat2 = Math.round(3 * volume)
            resultat3 = Math.round(3 * volume / 4)
            resultat4 = Math.round(volume / 2)
          }
          break
        case 7: // boule
          j = randint(0, 3) // pour le choix de l'unité
          r = randint(2, 10)
          volume = (4 * Math.PI * r * r * r) / 3
          texte = `Une boule de $${r}${listeUnites[j][0]}$ de rayon en $${listeUnites[j][1]}$.`
          texteCorr = `$\\mathcal{V}=\\dfrac{4}{3} \\times \\pi \\times R^3=\\dfrac{4}{3}\\times\\pi\\times\\left(${r}${listeUnites[j][0]}\\right)^3=${texFraction(calcul(4 * r * r * r), 3)}\\pi${listeUnites[j][1]}\\approx${texNombre(Math.round(volume))}${listeUnites[j][1]}$`
          resultat = Math.round(volume)
          resultat2 = Math.round(3 * volume)
          resultat3 = Math.round(4 * r * r * r / 3)
          resultat4 = Math.round(3 * volume / 4)
          break
      }
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [{
        texte: `$${texNombre(resultat)}$`,
        statut: true
      },
      {
        texte: `$${texNombre(resultat2)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat3)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat4)}$`,
        statut: false
      }
      ]
      this.autoCorrection[i].options = {}
      if (this.interactif && this.interactifType === 'qcm') {
        texte += propositionsQcm(this, i).texte
      } else {
        if (!context.isAmc) {
          setReponse(this, i, new Grandeur(Math.round(volume), listeUnites[j][2]), { formatInteractif: 'longueur' })
          texte += ajouteChampTexteMathLive(this, i, 'longueur')
        }
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    2,
    '1 : Sans conversion\n2 : Avec des conversions'
  ]
  this.besoinFormulaire2CaseACocher = ['Avec des décimaux', false]
  if (context.isHtml) this.besoinFormulaire3Numerique = ['Exercice interactif', 2, '1 : QCM\n2 : Numérique'] // Texte, tooltip
  this.besoinFormulaire4Texte = ['Type de solides', 'Nombres séparés par des tirets\n1 : Cubes\n2 : Pavés droits\n 3 : Mélange']
}
