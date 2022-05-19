import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, shuffle, calcul, texteEnCouleur, combinaisonListes } from '../../modules/outils.js'
import { creerLutin, avance, baisseCrayon, leveCrayon, tournerD, allerA, mathalea2d, scratchblock } from '../../modules/2d.js'

export const titre = 'Dessiner avec scratch'

/**
 * * Dessiner selon un programme scratch
 * * 4Algo1-0
 * @author Sébastien Lozano
 * mise à plat du big ouaille suite au passage à la V2
 * implémentation fonction scratchblock par Jean-Claude Lhote
 * la fonction gère la sortie Latex ou html du code scratch
 */

export default function TracerAvecScratch () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Laquelle des 4 figures ci-dessous va être tracée avec le script fourni ?'

  this.nbCols = 1
  this.nbColsCorr = 1

  this.listePackages = 'scratch3'
  this.typeExercice = 'Scratch'

  let typesDeQuestionsDisponibles
  this.nbQuestions = 3
  this.debug = false

  this.nouvelleVersion = function () {
    if (this.debug) {
      typesDeQuestionsDisponibles = [1, 2, 3, 4, 5]
    } else {
      typesDeQuestionsDisponibles = [1, 2, 3, 4, 5]
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const fenetreMathalea2D = { xmin: -10, ymin: -15, xmax: 60, ymax: 2, pixelsParCm: 10, scale: 0.2 }
    const pixelsParCm = fenetreMathalea2D.pixelsParCm * 5// 100;
    //    var unitesLutinParCm = 100;

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    // let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // une fonction pour gérer la sortie HTML/LaTeX
      // code est un string contenant le code svg ou tikz

      // une fonction pour dire le nom du polygone
      function myPolyName (n) {
        const sortie = {
          name: '',
          nameParSommets: '',
          nbPas: ''
        }
        switch (n) {
          case 2:
            sortie.name = 'segment'
            sortie.nameParSommets = 'AB'
            sortie.nbPas = 400
            break
          case 3:
            sortie.name = 'triangle équilatéral'
            sortie.nameParSommets = 'ABC'
            sortie.nbPas = 400
            break
          case 4:
            sortie.name = 'carré'
            sortie.nameParSommets = 'ABCD'
            sortie.nbPas = 400
            break
          case 5:
            sortie.name = 'pentagone régulier'
            sortie.nameParSommets = 'ABCDE'
            sortie.nbPas = 300
            break
          case 6:
            sortie.name = 'hexagone régulier'
            sortie.nameParSommets = 'ABCDEF'
            sortie.nbPas = 250
            break
          case 7:
            sortie.name = 'heptagone régulier'
            sortie.nameParSommets = 'ABCDEFG'
            sortie.nbPas = 200
            break
          case 8:
            sortie.name = 'octogone régulier'
            sortie.nameParSommets = 'ABCDEFGH'
            sortie.nbPas = 200
            break
          case 9:
            sortie.name = 'ennéagone régulier'
            sortie.nameParSommets = 'ABCDEFGHI'
            sortie.nbPas = 200
            break
        }
        return sortie
      }

      // une fonction pour renvoyer une situation
      // n définit le nombre de côtés du polygone régulier
      function mySituation (n) {
        const situations = [
          { // polygones réguliers
            nbCotes: n,
            nom: myPolyName(n).name,
            codeScratch: `\\begin{scratch}
\\blockinit{quand \\greenflag est cliqué}
\\blockpen{stylo en position décriture} 
\\blockrepeat{répéter \\ovalnum{${n}} fois}
{
\\blockmove{avancer de \\ovalnum{${myPolyName(n).nbPas}} pas}
\\blockmove{tourner \\turnright{} de \\ovaloperator{\\ovalnum{360}/\\ovalnum{${n}}} degrés}
}
\\end{scratch}`,
            fig: '',
            fig_corr: ''
          }
        ]

        let tabAbsDemLutin2
        if (n === 6) {
          tabAbsDemLutin2 = [0, 3 * myPolyName(n).nbPas, 6 * myPolyName(n).nbPas, 9 * myPolyName(n).nbPas]
        } else if (n === 8) {
          tabAbsDemLutin2 = [0, 4 * myPolyName(n).nbPas, 8 * myPolyName(n).nbPas, 12 * myPolyName(n).nbPas]
        } else {
          tabAbsDemLutin2 = [0, 2 * myPolyName(n).nbPas, 4 * myPolyName(n).nbPas, 6 * myPolyName(n).nbPas]
        };
        // on mélange tout ça !
        tabAbsDemLutin2 = shuffle(tabAbsDemLutin2)
        // Les figures de l'énoncé
        // le lutin2  trace le cadre en pointillés
        const lutin2 = creerLutin()
        lutin2.color = 'black'
        lutin2.pointilles = true
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin2)
        baisseCrayon(lutin2)
        allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin2)
        allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin2)
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin2)
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin2)
        leveCrayon(lutin2)
        // le lutin2 fait la bonne figure
        lutin2.pointilles = false
        lutin2.color = 'blue'
        allerA(tabAbsDemLutin2[0], 0, lutin2)
        baisseCrayon(lutin2)
        for (let k = 1; k < n + 1; k++) {
          avance(myPolyName(n).nbPas, lutin2)
          tournerD(calcul(360 / n, 2), lutin2)
        };
        // le lutin2 fait un polygone régulier avec un côté de plus
        leveCrayon(lutin2)
        allerA(tabAbsDemLutin2[1], 0, lutin2)
        baisseCrayon(lutin2)
        for (let k = 1; k < n + 1 + 1; k++) {
          avance(myPolyName(n + 1).nbPas, lutin2)
          tournerD(calcul(360 / (n + 1), 2), lutin2)
        };

        // le lutin2 fait un polygone régulier avec un côté de moins
        leveCrayon(lutin2)
        allerA(tabAbsDemLutin2[2], 0, lutin2)
        baisseCrayon(lutin2)
        for (let k = 1; k < n; k++) {
          avance(myPolyName(n - 1).nbPas, lutin2)
          tournerD(calcul(360 / (n - 1), 2), lutin2)
        };

        // le lutin2 fait une figure ouverte à n côtés
        leveCrayon(lutin2)
        allerA(tabAbsDemLutin2[3], 0, lutin2)
        baisseCrayon(lutin2)
        for (let k = 1; k < n + 1; k++) {
          avance(myPolyName(n).nbPas, lutin2)
          tournerD(calcul((360 / n) - 10, 2), lutin2)
        };
        allerA(tabAbsDemLutin2[3], 0, lutin2)

        const mesAppelsEnonce = [
          lutin2
        ]
        situations[0].fig = mathalea2d(
          fenetreMathalea2D,
          mesAppelsEnonce
        )

        // les figures de la correction
        // le lutin3  trace le cadre
        const lutin3 = creerLutin()
        lutin3.color = 'black'
        lutin3.pointilles = true
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin3)
        baisseCrayon(lutin3)
        allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin3)
        allerA(fenetreMathalea2D.xmax * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin3)
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymin * pixelsParCm, lutin3)
        allerA(fenetreMathalea2D.xmin * pixelsParCm, fenetreMathalea2D.ymax * pixelsParCm, lutin3)
        leveCrayon(lutin3)
        // le lutin3 fait la bonne figure
        lutin3.pointilles = false
        lutin3.color = 'green'
        allerA(tabAbsDemLutin2[0], 0, lutin3)
        baisseCrayon(lutin3)
        for (let k = 1; k < n + 1; k++) {
          avance(myPolyName(n).nbPas, lutin3)
          tournerD(calcul(360 / n, 2), lutin3)
        };
        // le lutin3 fait un polygone régulier avec un côté de plus
        lutin3.color = 'red'
        leveCrayon(lutin3)
        allerA(tabAbsDemLutin2[1], 0, lutin3)
        baisseCrayon(lutin3)
        for (let k = 1; k < n + 1 + 1; k++) {
          avance(myPolyName(n + 1).nbPas, lutin3)
          tournerD(calcul(360 / (n + 1), 2), lutin3)
        };

        // le lutin3 fait un polygone régulier avec un côté de moins
        leveCrayon(lutin3)
        allerA(tabAbsDemLutin2[2], 0, lutin3)
        baisseCrayon(lutin3)
        for (let k = 1; k < n; k++) {
          avance(myPolyName(n - 1).nbPas, lutin3)
          tournerD(calcul(360 / (n - 1), 2), lutin3)
        };

        // le lutin3 fait une figure ouverte à n côtés
        leveCrayon(lutin3)
        allerA(tabAbsDemLutin2[3], 0, lutin3)
        baisseCrayon(lutin3)
        for (let k = 1; k < n + 1; k++) {
          avance(myPolyName(n).nbPas, lutin3)
          tournerD(calcul((360 / n) - 10, 2), lutin3)
        };
        allerA(tabAbsDemLutin2[3], 0, lutin3)

        const mesAppelsCorr = [
          lutin3
        ]
        situations[0].fig_corr = mathalea2d(
          fenetreMathalea2D,
          mesAppelsCorr
        )

        const enonces = []
        enonces.push({
          enonce: `
          ${scratchblock(situations[0].codeScratch)}
          <br> 
          ${situations[0].fig}
          `,
          question: '',
          correction: `
          <br> Les figures rouges sont erronées.
          <br> La figure tracée par le programme a ${situations[0].nbCotes} côtés de même longueur et ${situations[0].nbCotes} angles de même mesure, c'est un ${situations[0].nom}.
          <br>${texteEnCouleur('La bonne figure est donc la figure verte.')}
          <br><br>
          ${situations[0].fig_corr}
          `
        })

        return enonces
      }

      const enonces = []
      enonces.push(mySituation(3)[0])
      enonces.push(mySituation(4)[0])
      enonces.push(mySituation(5)[0])
      enonces.push(mySituation(6)[0])
      enonces.push(mySituation(8)[0])
      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
          };
          break
        case 2:
          texte = `${enonces[1].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[1].correction}`
          };
          break
        case 3:
          texte = `${enonces[2].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[2].correction}`
          };
          break
        case 4:
          texte = `${enonces[3].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[3].correction}`
          };
          break
        case 5:
          texte = `${enonces[4].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[4].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[4].correction}`
          };
          break
      };

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
