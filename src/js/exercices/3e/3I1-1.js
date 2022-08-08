import { texteEnCouleurEtGras, listeQuestionsToContenu, combinaisonListesSansChangerOrdre, randint, modalYoutube, lampeMessage, enumerateSansPuceSansNumero, texteGras } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'

import { mathalea2d, repere, traceGraphiqueCartesien, point, segment, texteParPosition } from '../../modules/2d.js'

export const titre = 'Conjecture de Syracuse'

/**
 * @class Syracuse
 * @classdesc Outils pour les suites de Syracuse
 * @author Sébastien Lozano
 */

function Syracuse ({ N }) {
  // Pour déterminer les éléments de la suite de Syracuse jusqu'au premier 1
  this.suiteDeSyracuse = function () {
    let sortie = [N]
    let u = N
    if (N === 1) {
      sortie = [1, 4, 2, 1]
    } else {
      while (u !== 1) {
        if (u % 2 === 0) {
          u = u / 2
        } else {
          u = 3 * u + 1
        };
        sortie.push(u)
      };
    }
    return sortie
  }

  // Pour créer les coordonées à placer dans un graphique cartésien d'une suite de Syracuse
  this.coordonneesSuiteDeSyracuse = function (suite) {
    const sortie = []
    for (let i = 0; i < suite.length; i++) {
      sortie.push([i, suite[i]])
    };
    return sortie
  }

  // Pour déterminer la valeur maximale de la suite jusqu'au premier 1
  this.altitudeMaximale = function () {
    const entier = N
    return Math.max(...this.suiteDeSyracuse(entier))
  }

  // Pour déterminer le nombre d'éléments de la suite de Syracuse jusqu'au premier 1
  // sans compter la valeur initiale
  this.tempsDeVol = function () {
    const entier = N
    return this.suiteDeSyracuse(entier).length - 1
  }

  // Pour déterminer le nombre d'éléments de la suite de Syracuse jusqu'au premier 1
  // qui sont strictement supérieurs à la valeur initiale sans la compter !
  this.tempsDeVolEnAltitude = function () {
    const entier = N
    let compteur = 1
    while (this.suiteDeSyracuse(entier)[compteur] > this.suiteDeSyracuse(entier)[0]) {
      compteur += 1
    };
    return compteur - 1
  }
};

function syracuse ({ N = '1' }) {
  return new Syracuse({ N: N })
};

export default function ConjectureDeSyracuse () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 5 // Ici le nombre de questions
  this.nbQuestionsModifiable = false // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.correctionDetailleeDisponible = true
  this.listePackages = 'bclogo'
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function (numeroExercice) {
    this.boutonAide = modalYoutube(
      numeroExercice,
      'https://youtu.be/aRe4ARtQiJY',
      'Conjecture de Syracuse',
      'En vidéo sur Maths-et-tiques'
    )
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions)
    // On choisit un entier pour l'étude de la suite de Syracuse correspondante
    // On contraint le temps de vol entre 5 et 25
    // On contraint l'altitude maximale en dessous de 100
    // let entier = 15;
    let entier = randint(1, 200)
    while (syracuse({ N: entier }).tempsDeVol() > 25 || syracuse({ N: entier }).tempsDeVol() < 5 || syracuse({ N: entier }).altitudeMaximale() > 100) {
      entier = randint(1, 200)
    };

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Petite intro connaissances
      let stringIntro = `En mathématiques, on appelle conjecture une proposition qui n'est pas encore démontrée.
        On a éventuellement vérifié cette proposition sur beaucoup d'exemples mais cela ne garantit pas qu'elle soit toujours vraie.<br>
        Nous allons nous intéresser à la ${texteGras('conjecture de Syracuse')} découverte par le mathématicien allemand ${texteGras('Lothar Collatz')} en 1930
        à l'université de Syracuse.`
      if (context.isHtml) {
        stringIntro += '<br><br>'
      } else {
        stringIntro += '\\par\\vspace{0.5cm}'
      };
      stringIntro += `${texteGras('Algorithme de Syracuse :')}`
      if (context.isHtml) {
        stringIntro += '<br>'
      };
      stringIntro += `        
        ${enumerateSansPuceSansNumero([
          'On choisit un nombre entier strictement positif.',
          '$\\leadsto$ Si l\'entier choisi est pair on le divise par 2.',
          '$\\leadsto$ Si l\'entier choisi est impair on le multiplie par 3 et on ajoute 1.',
          'On recommence avec le nouvel entier trouvé tant qu\'il ne vaut pas 1.'
        ])}<br>                    
        `
      stringIntro += `${texteGras('Conjecture de Syracuse :')}<br>`
      stringIntro += `Encore appelée conjecture de ${texteGras('Collatz')}, conjecture ${texteGras('d\'Ulam')},
        conjecture ${texteGras('tchèque')} ou ${texteGras('problème 3x + 1')}, est l'hypothèse mathématique selon laquelle
        la suite de Syracuse de n'importe quel entier strictement positif atteint 1.<br>
        En dépit de la simplicité de son énoncé, cette conjecture défie depuis de nombreuses années les mathématiciens.
        `

      this.introduction = lampeMessage({
        titre: 'Introduction',
        texte: stringIntro,
        couleur: 'nombres'
      })

      // Pour les objets de mathALEA2D
      const objetsCorrection = []; const objetsCorrectionPlus = []; let paramsCorrection = {}
      // On crée la liste de coordonnées de la suite de Syracuse
      const coordSyracuse = syracuse({ N: entier }).coordonneesSuiteDeSyracuse(syracuse({ N: entier }).suiteDeSyracuse())

      // Pour ajouter le graphique et le repère
      const yCoeff = 5
      const xCoeff = 2

      // Le repère
      const r2 = repere({
        axesEpaisseur: 3,
        grille: false,
        xMin: -1,
        yMin: -1,
        xMax: syracuse({ N: entier }).tempsDeVol() + 1,
        yMax: syracuse({ N: entier }).altitudeMaximale() + 5,
        yThickMin: 0,
        yThickDistance: 1 * yCoeff,
        yUnite: 1 / yCoeff,
        xUnite: 1 / xCoeff,
        xThickMin: 0,
        xThickDistance: 1 * xCoeff,
        xLegende: 'Applications de l\'algorithme',
        xLegendePosition: [(syracuse({ N: entier }).tempsDeVol() + 2) / xCoeff, 0],
        yLegende: 'Altitude',
        yLegendePosition: [-1, (syracuse({ N: entier }).altitudeMaximale() + 8) / yCoeff]
      })

      // Le graphique cartésien
      const g = traceGraphiqueCartesien(coordSyracuse, r2)

      // On pousse tout ça dans les objets, le repère aussi coño !!!
      objetsCorrection.push(r2, g)

      const A = point(0, syracuse({ N: entier }).suiteDeSyracuse()[0] / yCoeff)
      const B = point(syracuse({ N: entier }).tempsDeVol() / xCoeff, syracuse({ N: entier }).suiteDeSyracuse()[0] / yCoeff)
      const s = segment(A, B, 'red')
      // let t = texteParPoint('mon texte',B);
      const t = texteParPosition(
        'Altitude initiale',
        syracuse({ N: entier }).tempsDeVol() / xCoeff,
        syracuse({ N: entier }).suiteDeSyracuse()[0] / yCoeff + 0.2, 'milieu',
        'red', 1,
        'middle',
        true
      )

      objetsCorrectionPlus.push(r2, g, s, t)

      // On fixe la fenetre pour le SVG/Tikz
      paramsCorrection = {
        xmin: -2,
        ymin: -2,
        xmax: (syracuse({ N: entier }).tempsDeVol() + 20) / xCoeff,
        ymax: (syracuse({ N: entier }).altitudeMaximale() + 10) / yCoeff,
        pixelsParCm: 30,
        // scale: 0.7,
        optionsTikz: [`xscale=${18 / (syracuse({ N: entier }).tempsDeVol() + 20) / xCoeff}`, `yscale=${7 / ((syracuse({ N: entier }).altitudeMaximale() + 10) / yCoeff)}`],
        mainlevee: false
      }

      const stringConnaissance = {
        cas1: {
          titre: 'Cycle trivial',
          texte: `Après que le nombre 1 a été atteint, la suite des valeurs (4,2,1) se répète indéfiniment.
            C'est pourquoi on ne s'intéresse qu'à la liste des entiers jusqu'au premier 1.`
        },
        cas2: {
          titre: `Vol de la suite de Syracuse ${entier}`,
          texte: `Les graphiques font penser à la chute chaotique d'un grêlon ou bien à la trajectoire d'une feuille emportée par le vent.
            Sur le graphique ci-dessous, on peut observer le vol de la suite de Syracuse ${entier}.`
        },
        cas3: {
          titre: `Altitude maximale de la suite de Syracuse ${entier}`,
          texte: 'Si on file la métaphore, la valeur maximale atteinte par les valeurs trouvées serait désignée par l\'altitude maximale du vol. '
        },
        cas4: {
          titre: `Temps de vol de la suite de Syracuse ${entier}`,
          texte: 'C\'est le plus petit nombre de fois qu\'il faut appliquer l\'algorithme pour atteindre la valeur 1 pour la première fois.'
        },
        cas5: {
          titre: `Temps de vol en altitude de la suite de Syracuse ${entier}`,
          texte: `C'est le plus petit nombre de fois qu'il faut appliquer l'algorithme avant que la valeur suivante soit strictement inférieure
            à la valeur initiale. ${texteGras('Attention')} cela ne signifie pas que l'on ne repassera jamais au dessus de la valeur initiale.
            `
        }
      }

      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1: // étude du cas N = 1
          texte = 'On choisit le nombre entier 1. Quels sont tous les entiers déterminés par cet algorithme ?'
          texteCorr = `Si on choisit le nombre 1 au départ la suite de Syracuse est : ${texteGras(syracuse({ N: 1 }).suiteDeSyracuse())}<br><br>`
          texteCorr += texteEnCouleurEtGras('Remarque - ' + stringConnaissance.cas1.titre) + ' : ' + stringConnaissance.cas1.texte
          break
        case 2: // suite de Syracuse pour un entier aléatoire
          texte = `Déterminer tous les entiers issus de cet algorithme lorsqu'on choisit ${entier}.`
          texteCorr = `La suite de Syracuse du nombre ${entier} est : <br>
            ${texteGras(syracuse({ N: entier }).suiteDeSyracuse())}<br><br>`
          texteCorr += texteEnCouleurEtGras('Remarque - ' + stringConnaissance.cas2.titre) + ' : ' + stringConnaissance.cas2.texte + '<br><br>'

          if (this.correctionDetaillee) {
            texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
          }
          break
        case 3:// altitude max
          texte = 'Quelle est la valeur maximale de cette liste d\'entiers ?'
          texteCorr = `La valeur maximale atteinte vaut : ${texteGras(syracuse({ N: entier }).altitudeMaximale())}<br><br>`
          texteCorr += texteEnCouleurEtGras('Remarque - ' + stringConnaissance.cas3.titre) + ' : ' + stringConnaissance.cas3.texte
          break
        case 4:// temps de vol
          texte = 'Combien de fois au minimum faut-il appliquer l\'algorithme pour trouver la valeur 1 ?'
          texteCorr = `Il faut  appliquer au minimum ${texteGras(syracuse({ N: entier }).tempsDeVol())} fois l'algorithme pour trouver la valeur 1.<br><br>`
          texteCorr += texteEnCouleurEtGras('Remarque - ' + stringConnaissance.cas4.titre) + ' : ' + stringConnaissance.cas4.texte
          break
        case 5:// temps de vol en altitude
          texte = 'Au bout de combien d\'application minimum de l\'algorithme la valeur calculée suivante sera-t-elle strictement inférieure à la valeur initiale ?'
          // `Quelle est le nombre d'éléments de cette liste d'entiers qui sont strictement supérieurs à la valeur initiale, sans compter cette valeur initiale ?`;
          if (syracuse({ N: entier }).tempsDeVolEnAltitude() === 0) {
            texteCorr = 'Dès la première application de l\'algorithme la valer trouvée est inférieure à la valeur initiale.'
          } else {
            texteCorr = `Il faut appliquer au minimum ${texteGras(syracuse({ N: entier }).tempsDeVolEnAltitude())} fois l'algorithme pour que la valeur calculée suivante soit strictement inférieure à la valeur initiale.`
          };
          texteCorr += '<br><br>'
          // texteCorr += `${syracuse({N:entier}).tempsDeVolEnAltitude()}<br><br>`;
          texteCorr += texteEnCouleurEtGras('Remarque - ' + stringConnaissance.cas5.titre) + ' : ' + stringConnaissance.cas5.texte + '<br><br>'

          if (this.correctionDetaillee) {
            texteCorr += mathalea2d(paramsCorrection, objetsCorrectionPlus)
          }
          break
      };

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  // this.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
} // Fin de l'exercice.
