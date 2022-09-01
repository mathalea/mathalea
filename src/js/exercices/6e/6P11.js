import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, prenomF, prenomM, texteEnCouleur, texPrix, texteEnCouleurEtGras, numAlpha, texteExposant, arrondi, nombreDeChiffresDe, nombreDeChiffresDansLaPartieDecimale, nombreDeChiffresDansLaPartieEntiere, contraindreValeur, rangeMinMax, stringNombre, sp, compteOccurences } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { getVueFromUrl } from '../../modules/gestionUrl.js'

export const titre = 'Résoudre des problèmes de proportionnalité en utilisant la linéarité simple'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * On donne une relation de proportionnalité du type n objets coûtent x€ et on demande le prix de y objets
 * et le nombre d'objets qu'on peut acheter avec z€.
 * @author Jean-Claude Lhote
 * référence 6P11
 * 03/2021 : ajout de situations de proportionnalité : CGrolleau
 * 08/2021 : Ajout de la version simplifiée et de la possibilité de choisir le type de question : Guillaume Valmont
 * Relecture : Décembre 2021 par EE
*/

// _____ Les fonctions suivantes renvoient un objet : {texte = ; texteCorr = ;} ______
// elles correspondent aux différentes situations problèmes
let versionSimplifiee = false
let indexN
const couplePremiersEntreEux = [
  [3, 4],
  [3, 5],
  [3, 7],
  [6, 7],
  [3, 8],
  [7, 8],
  [7, 9],
  [3, 10],
  [7, 10],
  [9, 10],
  [3, 11],
  [6, 11],
  [7, 11],
  [9, 11],
  [7, 12],
  [9, 12],
  [11, 12],
  [3, 13],
  [6, 13],
  [7, 13],
  [9, 13],
  [11, 13],
  [12, 13]
] // Couples de nombres premiers entre eux

function questionAchat (exo, i) { // questions d'origine du 6P11 : achat.
  const listeDeLieux = [
    'dans un magasin de bricolage',
    'dans une animalerie',
    'au supermarché local',
    "à l'épicerie",
    'dans la boutique du musée'
  ]
  const listeDeChoses = [[]]
  const listeDePrixUnit = [[]]
  listeDeChoses[0] = [
    'articles',
    'outils',
    'accessoires',
    "pièces d'outillage",
    'pinceaux',
    'ampoules',
    'tournevis',
    'spatules',
    'raccords de tuyaux'
  ]
  listeDeChoses[1] = [
    'poissons rouges',
    'cannetons',
    'perruches',
    'phasmes',
    'colliers anti-puces',
    'souris',
    'lapereaux',
    'paquets de graines'
  ]
  listeDeChoses[2] = [
    'sets de tables',
    'verres',
    'assiettes',
    'os à macher',
    'dosettes de café',
    'packs de lait',
    'paquets de pâtes'
  ]
  listeDeChoses[3] = [
    'mangues',
    'ananas',
    'fruits de la passion',
    'melons',
    'paquets de madeleines de Commercy',
    'bergamottes',
    'bredeles',
    'pots de cancoillotte'
  ]
  listeDeChoses[4] = [
    'cartes',
    'livres',
    'gravures',
    'puzzles',
    'maquettes',
    'roches',
    'jeux de société'
  ]
  listeDePrixUnit[0] = [5, 4, 1.25, 3, 0.5, 1.5, 2, 6, 4.5]
  listeDePrixUnit[1] = [1.5, 7, 20, 2.5, 25, 2, 15, 8]
  listeDePrixUnit[2] = [1.25, 1.5, 2, 0.5, 5, 4.5, 3]
  listeDePrixUnit[3] = [2, 2.5, 1.25, 1.5, 4, 7, 12, 3]
  listeDePrixUnit[4] = [0.5, 5, 7, 13.5, 10, 15, 20]
  const index1 = randint(0, 4)
  const prenoms = [prenomF(), prenomM()]
  const index2 = randint(0, listeDeChoses[index1].length - 1)
  const objet = listeDeChoses[index1][index2]
  const pu = listeDePrixUnit[index1][index2] * (1 + randint(1, 2) * 0.2 * randint(-1, 1))
  let n, x, y
  if (versionSimplifiee) {
    n = couplePremiersEntreEux[indexN][0]
    x = couplePremiersEntreEux[indexN][1]
    y = n * randint(2, 5)
  } else {
    n = randint(3, 6)
    x = calcul(n * pu, 2)
    y = n * randint(2, 5)
  }
  let met = false
  let p, z
  while (met === false) {
    p = n * randint(2, 5)
    if (p !== y) {
      met = true
    }
  }
  if (versionSimplifiee) {
    z = x * randint(2, 5)
  } else {
    z = calcul(p * pu, 2)
  }
  let enonceAMC1 = `${numAlpha(0)} ${prenoms[0]} a repéré, ${listeDeLieux[index1]}, des ${objet} qui l'intéressent. ` +
`Elle lit que ${n} ${objet} coûtent $${texPrix(x)}$${sp()}€. `
  let texte = enonceAMC1
  enonceAMC1 += `Elle veut en acheter ${y}.<br> Combien d'euros va-t-elle dépenser${sp()}? `
  texte += `Elle veut en acheter ${y}.<br> Combien va-t-elle dépenser${sp()}? `
  texte += ajouteChampTexteMathLive(exo, i, 'largeur25 inline', { texteApres: `${sp()}€` })
  let texteCorr = `${numAlpha(0)} ${y} ${objet}, c'est ${texteEnCouleur(
        stringNombre(y / n)
      )} fois ${texteEnCouleur(
        n,
        'blue'
      )} ${objet}.<br> Si ${texteEnCouleur(
        n,
        'blue'
      )} ${objet} coûtent $${texPrix(x)}$${sp()}€, alors ${texteEnCouleur(
        stringNombre(y / n)
      )} fois ${texteEnCouleur(
        n,
        'blue'
      )} ${objet} coûtent ${texteEnCouleur(
        stringNombre(y / n)
      )} fois $${texPrix(x)}$${sp()}€.<br>` +
      `${texteEnCouleur(
        stringNombre(y / n)
      )} $\\times$ ${texteEnCouleur(`$${texPrix(x)}$`, 'blue')}${sp()}€ = ${stringNombre(y * x / n)}${sp()}€<br>` +
texteEnCouleurEtGras(`Conclusion : ${prenoms[0]} dépensera $${texPrix(y * x / n)}$${sp()}€.`, 'black') + '<br>'
  const enonceAMC2 = `${numAlpha(1)} ${prenoms[1]
        } veut lui aussi acheter ces ${objet}. Il dispose de $${texPrix(z)}$${sp()}€.<br> Combien peut-il en acheter${sp()}?<br>`
  texte += '<br>' + enonceAMC2 + ajouteChampTexteMathLive(exo, i + 1, 'largeur25 inline', { texteApres: ' ' + objet })
  texteCorr += `${numAlpha(1)} $${texPrix(z)}$${sp()}€, c'est ${texteEnCouleur(
        stringNombre(z / x)
      )} fois $${texPrix(x)}$${sp()}€.<br> Si avec $${texPrix(x)}$${sp()}€ on peut acheter ${texteEnCouleur(
        n,
        'blue'
      )} ${objet}, alors avec ${texteEnCouleur(
        stringNombre(z / x)
      )} fois $${texPrix(x)}$${sp()}€, on peut acheter ${texteEnCouleur(
        stringNombre(z / x)
      )} fois ${texteEnCouleur(n, 'blue')} ${objet}.<br>`
  texteCorr += `${texteEnCouleur(
    stringNombre(z / x)
  )} $\\times$ ${texteEnCouleur(n, 'blue')} = ${stringNombre(z * n / x)}<br>`
  texteCorr += texteEnCouleurEtGras(`Conclusion : ${prenoms[1]} pourra acheter ${stringNombre(z * n / x)} ${objet}.`, 'black') + '<br>'
  if (!context.isAmc) {
    setReponse(exo, i, calcul(y * x / n, 2))
    setReponse(exo, i + 1, calcul(z * n / x, 2))
  } else {
    exo.autoCorrection[i] = {
      enonce: '',
      enonceAvant: false,
      options: { multicols: true, barreseparation: true },
      propositions: [
        {
          type: 'AMCNum',
          propositions: [{
            texte: texteCorr,
            statut: '',
            reponse: {
              texte: enonceAMC1,
              valeur: [arrondi(y * x / n, 2)],
              param: {
                digits: nombreDeChiffresDe(arrondi(y * x / n, 2)),
                decimals: nombreDeChiffresDansLaPartieDecimale(arrondi(y * x / n, 2)),
                signe: false,
                approx: 0
              }
            }
          }]
        },
        {
          type: 'AMCNum',
          propositions: [{
            texte: '',
            statut: '',
            reponse: {
              texte: enonceAMC2,
              valeur: [arrondi(z * n / x, 0)],
              param: {
                digits: nombreDeChiffresDansLaPartieEntiere(z * n / x, 0),
                decimals: 0,
                signe: false,
                approx: 0
              }
            }
          }]
        }
      ]
    }
  }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionRecette (exo, i) { // questions avec des masses pour un nombre de personne dans des recettes correction : passage à l'unité
  let texte, texteCorr
  const liste = [ // liste des ingrédients avec différentes recettes associées et masses
    {
      ingredient: 'farine',
      recettes: ['gâteau au citron', 'gaufres', 'crêpes', 'cake'],
      quantites_par_pers: [20, 25, 30, 35, 40, 50] // A voir pour l'instant quantités "simples".
    },
    {
      ingredient: 'sucre',
      recettes: ['gâteau', 'mousse au chocolat', 'pain perdu', 'riz au lait'],
      quantites_par_pers: [15, 20, 25, 30, 35]
    },
    {
      ingredient: 'chocolat',
      recettes: ['gâteau', 'mousse au chocolat', 'flan', 'riz au lait'],
      quantites_par_pers: [10, 15, 20, 25, 30, 35]
    },
    {
      ingredient: 'beurre',
      recettes: ['gâteau', 'mousse au chocolat'],
      quantites_par_pers: [10, 12, 15, 18]
    }
  ]
  const nbPersonneInit = randint(2, 6) // nombre de personnes indiqué dans la recette.
  const alea4 = randint(2, 5)
  const nbPersonneFinal = nbPersonneInit * alea4 // nombre de personnes pour lequel on veut cuisiner
  const alea1 = randint(0, 3) // pour le choix de l'ingredient
  const alea2 = randint(0, liste[alea1].recettes.length - 1) // pour le choix de la recette
  const alea3 = randint(0, liste[alea1].quantites_par_pers.length - 1) // pour le choix de la quantité par personne.
  const quantite = calcul(liste[alea1].quantites_par_pers[alea3] * nbPersonneInit, 3) // Calcul de la quantité dans la recette à partir de la qtt/personne et du nb de personnes
  const quantite2 = quantite * randint(2, 5, [alea4])
  const quantiteReponse = calcul(liste[alea1].quantites_par_pers[alea3] * nbPersonneFinal, 3) // Pour la correction
  const prenoms = [prenomF(), prenomM()] // Choix de prénoms pour l'énoncé
  let enonceAMC1 = `${numAlpha(0)} ${prenoms[0]} lit sur sa recette de ${liste[alea1].recettes[alea2]} pour ${nbPersonneInit} personnes qu'il faut ${quantite}${sp()}g de ${liste[alea1].ingredient}. ` +
  `Elle veut adapter sa recette pour ${nbPersonneFinal} personnes.`
  texte = enonceAMC1
  enonceAMC1 += `<br> Quelle masse, en${sp()}g, de ${liste[alea1].ingredient} doit-elle prévoir${sp()}? `
  texte += `<br> Quelle masse de ${liste[alea1].ingredient} doit-elle prévoir${sp()}? `
  texte += ajouteChampTexteMathLive(exo, i, 'largeur25 inline', { texteApres: ' g' })
  texteCorr = `${numAlpha(0)} ${nbPersonneFinal} personnes, c'est ${texteEnCouleur(nbPersonneFinal / nbPersonneInit)} fois ${nbPersonneInit} personnes. ` +
  `Il faut donc ${texteEnCouleur(nbPersonneFinal / nbPersonneInit)} fois plus de ${liste[alea1].ingredient}.<br>` +
  `${quantite}${sp()}g $\\times $ ${texteEnCouleur(nbPersonneFinal / nbPersonneInit)} = ${quantiteReponse}${sp()}g. <br>` +
  texteEnCouleurEtGras(`Conclusion : ${prenoms[0]} doit utiliser ${quantiteReponse}${sp()}g de ${liste[alea1].ingredient} pour ${nbPersonneFinal} personnes.<br>`, 'black')
  const enonceAMC2 = `${numAlpha(1)} ${prenoms[1]} utilise la même recette de ${liste[alea1].recettes[alea2]}. Il dispose de ${quantite2}${sp()}g de ${liste[alea1].ingredient}. 
  Pour combien de personnes au maximum peut-il cuisiner${sp()}?`
  texte += '<br> ' + enonceAMC2 + ajouteChampTexteMathLive(exo, i + 1, 'largeur25 inline', { texteApres: ' personnes' })
  texteCorr += `${numAlpha(1)} ${quantite2}${sp()}g, c'est ${texteEnCouleur(quantite2 / quantite)} fois ${quantite}${sp()}g. ` +
  `${prenoms[1]} peut donc cuisiner pour ${texteEnCouleur(quantite2 / quantite)} fois plus de personnes.<br>` +
  `${nbPersonneInit}${sp()}g $\\times $ ${texteEnCouleur(quantite2 / quantite)} = ${nbPersonneInit * quantite2 / quantite}. <br>` +
  texteEnCouleurEtGras(`Conclusion : ${prenoms[1]} peut donc préparer sa recette pour ${nbPersonneInit * quantite2 / quantite} personnes.`, 'black')
  if (!context.isAmc) {
    setReponse(exo, i, quantiteReponse)
    setReponse(exo, i + 1, calcul(nbPersonneInit * quantite2 / quantite, 3))
  } else {
    exo.autoCorrection[i] = {
      enonce: '',
      enonceAvant: false,
      options: { multicols: true, barreseparation: true },
      propositions: [
        {
          type: 'AMCNum',
          propositions: [{
            texte: texteCorr,
            statut: '',
            reponse: {
              texte: enonceAMC1,
              valeur: [quantiteReponse],
              param: {
                digits: nombreDeChiffresDe(quantiteReponse),
                decimals: nombreDeChiffresDansLaPartieDecimale(quantiteReponse),
                signe: false,
                approx: 0
              }
            }
          }]
        },
        {
          type: 'AMCNum',
          propositions: [{
            texte: '',
            statut: '',
            reponse: {
              texte: enonceAMC2,
              valeur: [calcul(nbPersonneInit * quantite2 / quantite, 3)],
              param: {
                digits: nombreDeChiffresDansLaPartieEntiere(nbPersonneInit * quantite2 / quantite),
                decimals: 0,
                signe: false,
                approx: 0
              }
            }
          }]
        }
      ]
    }
  }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionDillution (exo, i) { // questions de mélange de volumes
  let uniteSolvantVolumeFinal
  const liste = [
    {
      solute: 'sirop',
      volumeUnitaire: [12, 15, 18, 20],
      unite_solute: 'cL',
      unite_solvant: ['L', 'L'] // liste pour [0] singulier [1] pluriel
    },
    {
      solute: 'nettoyant pour sol',
      volumeUnitaire: [5, 8, 10, 12],
      unite_solute: 'cL',
      unite_solvant: ['L', 'L']
    },
    {
      solute: 'médicament',
      volumeUnitaire: [3, 3.5, 4, 4.5, 5, 7.5],
      unite_solute: 'mL',
      unite_solvant: ['dL', 'dL']
    },
    {
      solute: 'produit pour piscine',
      volumeUnitaire: [1, 1.2, 0.8, 1.5],
      unite_solute: 'L',
      unite_solvant: ['dizaine de mètres cubes', 'dizaines de mètres cubes']
    }
  ]
  const alea1 = randint(0, 3) // pour le choix du soluté
  const alea2 = randint(0, liste[alea1].volumeUnitaire.length - 1) // pour le choix du volume pour une unité de solvant
  let volumeInitial, quantite
  if (versionSimplifiee) {
    volumeInitial = couplePremiersEntreEux[indexN][0]
    quantite = couplePremiersEntreEux[indexN][1]
  } else {
    volumeInitial = randint(1, 5) + (randint(1, 5)) * 0.1 * randint(-1, 1, [0]) // volume d'eau pour la préparation
    quantite = liste[alea1].volumeUnitaire[alea2] * volumeInitial
  }
  const volumeFinal = volumeInitial * randint(2, 5)
  if (volumeFinal < 2) {
    uniteSolvantVolumeFinal = liste[alea1].unite_solvant[0]
  } else {
    uniteSolvantVolumeFinal = liste[alea1].unite_solvant[1]
  }
  const volumeFinalAff = stringNombre(volumeFinal) // pour affichage avec bon séparateur.
  const volumeInitialAff = stringNombre(volumeInitial) // pour affichage avec bon séparateur.
  let enonceAMC = `Il est indiqué sur la bouteille de ${liste[alea1].solute} ${getVueFromUrl() === 'multi' ? '<br>' : ' '} qu'il faut ` +
  ` ${stringNombre(quantite)}${sp()}${liste[alea1].unite_solute} de  ${liste[alea1].solute} pour $${volumeInitialAff}$ `
  enonceAMC += volumeInitialAff < 2 ? `${liste[alea1].unite_solvant[0]} d'eau.<br> ` : `${liste[alea1].unite_solvant[1]} d'eau.<br>`
  enonceAMC += `On veut utiliser $${volumeFinalAff}$ ${uniteSolvantVolumeFinal} d'eau. `
  let texte = enonceAMC
  enonceAMC += `Quel volume, en${sp()}${liste[alea1].unite_solute}, de ${liste[alea1].solute} doit-on prévoir${sp()}? `
  texte += `Quel volume de ${liste[alea1].solute} doit-on prévoir${sp()}? `
  texte += ajouteChampTexteMathLive(exo, i, 'largeur25 inline', { texteApres: ' ' + liste[alea1].unite_solute })
  const texteCorr = `Le volume de ${liste[alea1].solute} est proportionnel au volume d'eau. <br> ` +
` ${texteEnCouleur(volumeFinalAff)} ${uniteSolvantVolumeFinal} d'eau, c'est ${texteEnCouleur(stringNombre(volumeFinal / volumeInitial))} fois ${volumeInitialAff} ${liste[alea1].unite_solvant[0]} d'eau. <br> ` +
`Il faut donc ${texteEnCouleur(stringNombre(volumeFinal / volumeInitial))} fois plus que ${texteEnCouleur(stringNombre(quantite), 'blue')}${sp()}${liste[alea1].unite_solute} de ${liste[alea1].solute}. <br>` +
`${texteEnCouleur(stringNombre(quantite), 'blue')}${sp()}${liste[alea1].unite_solute} $\\times $ ${texteEnCouleur(stringNombre(volumeFinal / volumeInitial))} = ${stringNombre(quantite * volumeFinal / volumeInitial)}${sp()}${liste[alea1].unite_solute}  <br>
        ${texteEnCouleurEtGras(`Conclusion : Il faut donc prévoir ${stringNombre(quantite * volumeFinal / volumeInitial)}${sp()}${liste[alea1].unite_solute} de ${liste[alea1].solute}.`, 'black')}`
  if (!context.isAmc) {
    setReponse(exo, i, calcul(quantite * volumeFinal / volumeInitial, 3))
  } else {
    exo.autoCorrection[i] = {
      enonce: '',
      enonceAvant: false,
      // options: { multicols: true, barreseparation: true },
      propositions: [
        {
          type: 'AMCNum',
          propositions: [{
            texte: texteCorr,
            statut: '',
            reponse: {
              texte: enonceAMC,
              valeur: [calcul(quantite * volumeFinal / volumeInitial, 3)],
              param: {
                digits: nombreDeChiffresDe(calcul(quantite * volumeFinal / volumeInitial)),
                decimals: nombreDeChiffresDansLaPartieDecimale(calcul(quantite * volumeFinal / volumeInitial, 3)),
                signe: false,
                approx: 0
              }
            }
          }]
        }
      ]
    }
  }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionDistance (exo, i) { // questions de distance parcourue à une vitesse moyenne donnée
  let texte, texteCorr
  const liste = [ // liste des "moyens de locomotion" et vitesses associées
    {
      locomotion: 'piéton',
      vitesse: [3, 3.5, 4, 4.5]
    },
    {
      locomotion: 'cycliste',
      vitesse: [12, 15, 16, 17, 18, 20, 22]
    },
    {
      locomotion: 'camion',
      vitesse: [75, 77.5, 80, 82.5, 85]
    },
    {
      locomotion: 'train',
      vitesse: [125, 150, 175, 185, 195]
    }
  ]
  const alea1 = randint(0, 3) // pour le choix de locomotion
  const duree = [{
    temps: '15 minutes',
    rapport: 0.25
  },
  {
    temps: '30 minutes',
    rapport: 0.5
  },
  {
    temps: '45 minutes',
    rapport: 0.75
  },
  {
    temps: '1 heure et demie',
    rapport: 1.5
  },
  {
    temps: '2 heures',
    rapport: 2
  },
  {
    temps: '2 heures et demie',
    rapport: 2.5
  },
  {
    temps: '3 heures',
    rapport: 3
  }]
  if (versionSimplifiee) {
    const alea1 = randint(0, 3) // pour le choix de locomotion
    let dureeQ, distance
    if (alea1 === 0) { // Si piéton
      const indice = randint(0, 3)
      dureeQ = couplePremiersEntreEux[indice][0]
      distance = couplePremiersEntreEux[indice][1] * (couplePremiersEntreEux[indice][0] + 1)
    } else {
      dureeQ = couplePremiersEntreEux[indexN][0]
      distance = couplePremiersEntreEux[indexN][1] * 2 * alea1 * alea1 * (couplePremiersEntreEux[indexN][0] + 1)
    }
    const dureeR = dureeQ * randint(2, 5)
    let enonceAMC = `Un ${liste[alea1].locomotion} parcourt en moyenne ${stringNombre(distance)}${sp()}km en ${dureeQ} heures.`
    texte = enonceAMC
    enonceAMC += `<br> Quelle distance, en${sp()}km, va-t-il parcourir, à la même vitesse en ${dureeR} heures${sp()}?`
    texte += `<br> Quelle distance va-t-il parcourir, à la même vitesse en ${dureeR} heures${sp()}?` + ajouteChampTexteMathLive(exo, i, 'largeur25 inline', { texteApres: ' km' })
    texteCorr = `${texteEnCouleur(dureeR)} heures, c'est ${texteEnCouleur(dureeR / dureeQ)} fois ${dureeQ} heures.<br> ` +
    `Le ${liste[alea1].locomotion} parcourra donc ${texteEnCouleur(dureeR / dureeQ)} fois plus de distance qu'en ${dureeQ} heures.<br>` +
    `${stringNombre(distance)}${sp()}km $\\times $ ${texteEnCouleur(dureeR / dureeQ)} = ${stringNombre(distance * dureeR / dureeQ)}${sp()}km.<br>
    ${texteEnCouleurEtGras(`Conclusion : Le ${liste[alea1].locomotion} parcourra ${stringNombre(distance * dureeR / dureeQ)}${sp()}km à la même vitesse en ${dureeR} heures.`, 'black')}`
    if (!context.isAmc) {
      setReponse(exo, i, calcul(distance * dureeR / dureeQ, 3))
    } else {
      exo.autoCorrection[i] = {
        enonce: '',
        enonceAvant: false,
        propositions: [
          {
            type: 'AMCNum',
            propositions: [{
              texte: texteCorr,
              statut: '',
              reponse: {
                texte: texte,
                valeur: [calcul(distance * dureeR / dureeQ)],
                param: {
                  digits: nombreDeChiffresDe(calcul(distance * dureeR / dureeQ, 3)),
                  decimals: nombreDeChiffresDansLaPartieDecimale(calcul(distance * dureeR / dureeQ, 3)),
                  signe: false,
                  approx: 0
                }
              }
            }]
          }
        ]
      }
    }
  } else {
    const alea2 = randint(0, liste[alea1].vitesse.length - 1) // pour le choix du temps passé
    const rapportQuestion2 = [0.25, 0.5, 0.75, 1.25, 1.5, 2]
    let alea3 = randint(0, rapportQuestion2.length - 1)
    while (duree[alea2].rapport === rapportQuestion2[alea3]) {
      alea3 = randint(0, rapportQuestion2.length - 1)
    }
    const reponseQ1 = calcul(duree[alea2].rapport * liste[alea1].vitesse[alea2], 3)
    const distance = stringNombre(calcul(rapportQuestion2[alea3] * liste[alea1].vitesse[alea2])) // pour question 2
    let enonceAMC1 = `${numAlpha(0)} Un ${liste[alea1].locomotion} parcourt en moyenne ${stringNombre(liste[alea1].vitesse[alea2])}${sp()}km en une heure.<br>`
    texte = enonceAMC1
    enonceAMC1 += `Quelle distance, en${sp()}km, va-t-il parcourir, à la même vitesse, en ${duree[alea2].temps}${sp()}? `
    texte += `Quelle distance va-t-il parcourir, à la même vitesse, en ${duree[alea2].temps}${sp()}? `
    texte += ajouteChampTexteMathLive(exo, i, 'largeur25  inline', { texteApres: ' km' })
    texteCorr = `${numAlpha(0)} ${duree[alea2].temps}, c'est ${texteEnCouleur(stringNombre(duree[alea2].rapport))} fois une heure.<br> ` +
  `En une heure, le ${liste[alea1].locomotion} parcourt ${texteEnCouleur(stringNombre(liste[alea1].vitesse[alea2], 'blue'))}${sp()}km donc en ${duree[alea2].temps}, il va parcourir ${texteEnCouleur(stringNombre(duree[alea2].rapport))} fois ${texteEnCouleur(stringNombre(liste[alea1].vitesse[alea2], 'blue'))}${sp()}km. <br>` +
  `${texteEnCouleur(stringNombre(duree[alea2].rapport))} $\\times$ ${texteEnCouleur(stringNombre(liste[alea1].vitesse[alea2], 'blue'))}${sp()}km = ${stringNombre(reponseQ1)}${sp()}km <br>` +
  texteEnCouleurEtGras(` Conclusion : Le ${liste[alea1].locomotion} va donc parcourir ${stringNombre(reponseQ1)}${sp()}km.`, 'black') + '<br>'
    const enonceAMC2 = `${numAlpha(1)} Combien de temps, en minutes, va-t-il mettre pour parcourir ${distance}${sp()}km à cette même vitesse${sp()}? `
    texte += `<br> ${numAlpha(1)} Combien de temps va-t-il mettre pour parcourir ${distance}${sp()}km à cette même vitesse${sp()}? ` + ajouteChampTexteMathLive(exo, i + 1, 'largeur25  inline', { texteApres: ' minutes' })
    texteCorr += `${numAlpha(1)} ${distance}${sp()}km, c'est ${texteEnCouleur(stringNombre(rapportQuestion2[alea3]))} fois ${stringNombre(liste[alea1].vitesse[alea2])}${sp()}km.
      Le ${liste[alea1].locomotion} parcourt ${stringNombre(liste[alea1].vitesse[alea2])}${sp()}km en une heure. <br>` +
  `Il va mettre donc ${texteEnCouleur(stringNombre(rapportQuestion2[alea3]))} fois une heure à parcourir ${distance}${sp()}km. <br>` +
  texteEnCouleurEtGras(`Conclusion : Le ${liste[alea1].locomotion} va donc mettre  ${stringNombre(rapportQuestion2[alea3])} heure${rapportQuestion2[alea3] >= 2 ? 's' : ''} à parcourir ${distance}${sp()}km,  ce qui fait ${calcul(rapportQuestion2[alea3] * 60, 0)} minutes (${stringNombre(rapportQuestion2[alea3])} $\\times$ 60 minutes).`, 'black')
    if (!context.isAmc) {
      setReponse(exo, i, reponseQ1)
      setReponse(exo, i + 1, calcul(rapportQuestion2[alea3] * 60, 2))
    } else {
      exo.autoCorrection[i] = {
        enonce: '',
        enonceAvant: false,
        options: { multicols: true, barreseparation: true },
        propositions: [
          {
            type: 'AMCNum',
            propositions: [{
              texte: texteCorr,
              statut: '',
              reponse: {
                texte: enonceAMC1,
                valeur: [reponseQ1],
                param: {
                  digits: nombreDeChiffresDe(reponseQ1),
                  decimals: nombreDeChiffresDansLaPartieDecimale(reponseQ1),
                  signe: false,
                  approx: 0
                }
              }
            }]
          },
          {
            type: 'AMCNum',
            propositions: [{
              texte: '',
              statut: '',
              reponse: {
                texte: enonceAMC2,
                valeur: [calcul(rapportQuestion2[alea3] * 60, 2)],
                param: {
                  digits: nombreDeChiffresDe(calcul(rapportQuestion2[alea3] * 60, 2)),
                  decimals: nombreDeChiffresDansLaPartieDecimale(calcul(rapportQuestion2[alea3] * 60, 2)),
                  signe: false,
                  approx: 0
                }
              }
            }]
          }
        ]
      }
    }
  }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionEchelle (exo, i) { // X cm sur une carte correspond à x km dans la réalité...
  let texte, texteCorr
  const distanceCarte = couplePremiersEntreEux[indexN][0] // Choix d'un nombre de cm sur la carte
  const distanceReel = couplePremiersEntreEux[indexN][1] // Choix d'un nombre de km dans la réalité (on évite d'avoir 1cm pour 1km)
  const rapport = [0.25, 0.5, 0.75, 1.25, 1.5, 2, 3, 4, 5] // rapport entre la référence et la question (rapports simples car niveau 6eme)
  const alea1 = randint(0, rapport.length - 1)
  const alea2 = randint(0, rapport.length - 1, [alea1])
  if (versionSimplifiee) { rapport[alea1] = randint(2, 5); rapport[alea2] = randint(2, 5, [rapport[alea1]]) }
  const distanceCarte2 = stringNombre(calcul(rapport[alea1] * distanceCarte, 2))
  const distanceReelQ2 = stringNombre(calcul(rapport[alea2] * distanceReel, 2))
  const prenoms = [prenomF(), prenomM()]
  texte = `${numAlpha(0)} Sur une carte sur laquelle ${distanceCarte} cm représente ${distanceReel}${sp()}km dans la réalité, 
${prenoms[0]} mesure son trajet et elle trouve une distance de ${distanceCarte2} cm. <br>`
  const enonceAMC1 = texte + `À quelle distance, en${sp()}km, cela correspond dans la réalité${sp()}?`
  texte += `À quelle distance cela correspond dans la réalité${sp()}? ` + ajouteChampTexteMathLive(exo, i, 'largeur25  inline', { texteApres: ' km' })
  texteCorr = `${numAlpha(0)} ${distanceCarte2} cm, c'est ${texteEnCouleur(stringNombre(rapport[alea1]))} fois ${distanceCarte} cm. <br>
Dans la réalité, ${distanceCarte} cm correspond à ${texteEnCouleur(distanceReel, 'blue')}${sp()}km donc` +
`  ${distanceCarte2} cm va correspondre à ${texteEnCouleur(stringNombre(rapport[alea1]))} fois ${texteEnCouleur(distanceReel, 'blue')}${sp()}km.  <br>` +
`${texteEnCouleur(stringNombre(rapport[alea1]))} $\\times$ ${texteEnCouleur(distanceReel, 'blue')}${sp()}km = ${stringNombre(calcul(rapport[alea1] * distanceReel, 2))}${sp()}km <br>` +
texteEnCouleurEtGras(`Conclusion : Le trajet de ${prenoms[0]} est de ${stringNombre(calcul(rapport[alea1] * distanceReel, 2))}${sp()}km.`, 'black') + '<br>'
  let enonceAMC2 = `${numAlpha(1)} Deux villes sont distantes de ${distanceReelQ2}${sp()}km. `
  texte += '<br> ' + enonceAMC2
  enonceAMC2 += `Quelle distance, en cm, va-t-on mesurer sur la carte entre ces deux villes${sp()}?`
  texte += `Quelle distance va-t-on mesurer sur la carte entre ces deux villes${sp()}?` + ajouteChampTexteMathLive(exo, i + 1, 'largeur25  inline', { texteApres: ' cm' })
  texteCorr += `${numAlpha(1)} ${distanceReelQ2}${sp()}km, c'est ${texteEnCouleur(stringNombre(rapport[alea2]))} fois ${distanceReel}${sp()}km.
Or ${distanceReel}${sp()}km est représenté par ${texteEnCouleur(distanceCarte, 'blue')} cm sur la carte. <br>` +
`Donc ${distanceReelQ2}${sp()}km est représenté par ${texteEnCouleur(stringNombre(rapport[alea2]))} fois ${texteEnCouleur(distanceCarte, 'blue')} cm sur la carte. <br>` +
`${texteEnCouleur(stringNombre(rapport[alea2]))} $\\times$ ${texteEnCouleur(distanceCarte, 'blue')} cm = ${stringNombre(calcul(rapport[alea2] * distanceCarte, 2))} cm <br>` +
texteEnCouleurEtGras(`Conclusion : Les deux villes sont séparées de ${stringNombre(calcul(rapport[alea2] * distanceCarte, 2))} cm sur la carte.`, 'black')
  if (!context.isAmc) {
    setReponse(exo, i, calcul(rapport[alea1] * distanceReel, 2))
    setReponse(exo, i + 1, calcul(rapport[alea2] * distanceCarte, 2))
  } else {
    exo.autoCorrection[i] = {
      enonce: '',
      enonceAvant: false,
      options: { multicols: true, barreseparation: true },
      propositions: [
        {
          type: 'AMCNum',
          propositions: [{
            texte: texteCorr,
            statut: '',
            reponse: {
              texte: enonceAMC1,
              valeur: [calcul(rapport[alea1] * distanceReel, 2)],
              param: {
                digits: nombreDeChiffresDe(calcul(rapport[alea1] * distanceReel, 2)),
                decimals: nombreDeChiffresDansLaPartieDecimale(calcul(rapport[alea1] * distanceReel, 2)),
                signe: false,
                approx: 0
              }
            }
          }]
        },
        {
          type: 'AMCNum',
          propositions: [{
            texte: '',
            statut: '',
            reponse: {
              texte: enonceAMC2,
              valeur: [calcul(rapport[alea2] * distanceCarte, 2)],
              param: {
                digits: nombreDeChiffresDe(calcul(rapport[alea2] * distanceCarte, 2)),
                decimals: nombreDeChiffresDansLaPartieDecimale(calcul(rapport[alea2] * distanceCarte, 2)),
                signe: false,
                approx: 0
              }
            }
          }]
        }
      ]
    }
  }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionRecouvrirSurface (exo, i) { // peinture, gazon, carrelage pour une surface donnée.
  let texte, texteCorr
  const liste = [
    {
      matiere: 'de la peinture',
      unite: 'L',
      qtt_matiere_unitaire: [0.5, 1, 1.5, 2], // quantité au m²
      qtt_surface: [10, 25, 15] // nombre de m² indiqués sur l'emballage
    },
    {
      matiere: 'du gazon',
      unite: 'kg',
      qtt_matiere_unitaire: [2.5, 3, 5, 10],
      qtt_surface: [200, 175, 150]
    },
    {
      matiere: 'du carrelage',
      unite: 'carreaux',
      qtt_matiere_unitaire: [24, 40, 60, 100],
      qtt_surface: [10, 20, 5]
    }
  ]
  const prenoms = [prenomF(), prenomM()]
  if (versionSimplifiee) {
    const alea1 = 2 // Pour avoir un coef entier, qtt_matiere_unitaire doit être plus grand que qtt_surface, ce qui n'est possible qu'avec les carreaux
    const quantiteD = couplePremiersEntreEux[indexN][1]
    const surfaceD = couplePremiersEntreEux[indexN][0]
    const coef = randint(2, 5)
    const quantiteF = calcul(quantiteD * coef, 2)
    const surfaceF = calcul(surfaceD * coef, 2)
    const enonceAMC = `${prenoms[0]} doit acheter ${liste[alea1].matiere}. ` +
`Sur la notice, il est indiqué de prévoir ${quantiteD}${sp()}${liste[alea1].unite} pour ${surfaceD}${sp()}m${texteExposant(2)}. <br> ` +
`Combien de${sp()}${liste[alea1].unite} doit-elle en acheter pour une surface de ${surfaceF}${sp()}m${texteExposant(2)}${sp()}?`
    texte = enonceAMC + ajouteChampTexteMathLive(exo, i, 'largeur25  inline', { texteApres: ' ' + liste[alea1].unite })
    texteCorr = `${stringNombre(surfaceF)}${sp()}m${texteExposant(2)}, c'est ${texteEnCouleur(coef)} fois ${surfaceD}${sp()}m${texteExposant(2)} <br>` +
`Il va donc falloir ${texteEnCouleur(coef)} fois ${texteEnCouleur(quantiteD, 'blue')}${sp()}${liste[alea1].unite} pour ${stringNombre(surfaceF)}${sp()}m${texteExposant(2)} <br>` +
`${texteEnCouleur(coef)} $\\times$ ${texteEnCouleur(quantiteD, 'blue')}${sp()}${liste[alea1].unite} = ${stringNombre(quantiteF)}${sp()}${liste[alea1].unite}<br>` +
texteEnCouleurEtGras(`Conclusion : ${prenoms[0]} doit en acheter ${quantiteF}${sp()}${liste[alea1].unite}.`, 'black') + '<br>  '
    if (!context.isAmc) {
      setReponse(exo, i, quantiteF)
    } else {
      exo.autoCorrection[i] = {
        enonce: '',
        enonceAvant: false,
        propositions: [
          {
            type: 'AMCNum',
            propositions: [{
              texte: texteCorr,
              statut: '',
              reponse: {
                texte: enonceAMC,
                valeur: [quantiteF],
                param: {
                  digits: nombreDeChiffresDe(quantiteF),
                  decimals: nombreDeChiffresDansLaPartieDecimale(quantiteF),
                  signe: false,
                  approx: 0
                }
              }
            }]
          }
        ]
      }
    }
  } else {
    const alea1 = randint(0, liste.length - 1)
    const alea2 = randint(0, liste[alea1].qtt_matiere_unitaire.length - 1)
    const alea3 = randint(0, liste[alea1].qtt_surface.length - 1)
    const rapport = [0.25, 0.5, 0.75, 1.25, 1.5, 2, 3, 4, 5] // choix parmi des rapports simples (en 6eme cela paraît suffisant)
    const quantite = liste[alea1].qtt_matiere_unitaire[alea2]
    const alea4 = randint(0, rapport.length - 1)
    const surfaceFinale = calcul(rapport[alea4] * liste[alea1].qtt_surface[alea3], 3)
    const alea5 = randint(0, rapport.length - 1, [alea4])
    const quantite2 = calcul(rapport[alea5] * liste[alea1].qtt_matiere_unitaire[alea2], 3)
    const alea6 = randint(-2, 2, [0])
    const surfaceFinale2 = calcul(rapport[alea5] * liste[alea1].qtt_surface[alea3] + alea6, 3)
    const qttaffichage = stringNombre(quantite) // Pour affichage avec virgule en séparateur.
    const enonceAMC1 = `${numAlpha(0)} ${prenoms[0]} doit acheter ${liste[alea1].matiere}. ` +
`Sur la notice, il est indiqué de prévoir ${qttaffichage}${sp()}${liste[alea1].unite} pour ${liste[alea1].qtt_surface[alea3]}${sp()}m${texteExposant(2)}. <br> ` +
`Combien de${sp()}${liste[alea1].unite} doit-elle en acheter pour une surface de ${stringNombre(surfaceFinale)}${sp()}m${texteExposant(2)}${sp()}?`
    texte = enonceAMC1 + ajouteChampTexteMathLive(exo, i, 'largeur25  inline', { texteApres: ' ' + liste[alea1].unite })
    texteCorr = `${numAlpha(0)} ${stringNombre(surfaceFinale)}${sp()}m${texteExposant(2)}, c'est ${texteEnCouleur(stringNombre(rapport[alea4]))} fois ${liste[alea1].qtt_surface[alea3]}${sp()}m${texteExposant(2)}. <br>` +
`Il va donc falloir ${texteEnCouleur(stringNombre(rapport[alea4]))} fois ${texteEnCouleur(qttaffichage, 'blue')}${sp()}${liste[alea1].unite} pour ${stringNombre(surfaceFinale)}${sp()}m${texteExposant(2)}. <br>` +
`${texteEnCouleur(stringNombre(rapport[alea4]))} $\\times$ ${texteEnCouleur(qttaffichage, 'blue')}${sp()}${liste[alea1].unite} = ${stringNombre(calcul(rapport[alea4] * quantite, 2))}${sp()}${liste[alea1].unite}<br>` +
texteEnCouleurEtGras(`Conclusion : ${prenoms[0]} doit acheter ${stringNombre(calcul(rapport[alea4] * quantite, 2))}${sp()}${liste[alea1].unite}.`, 'black') + '<br>  '
    const enonceAMC2 = `${numAlpha(1)} ${prenoms[1]} a acheté ${liste[alea1].matiere}. Il lui en reste ${stringNombre(quantite2)}${sp()}${liste[alea1].unite}. Sur la notice, il est aussi indiqué de prévoir ${qttaffichage}${sp()}${liste[alea1].unite} pour ${stringNombre(liste[alea1].qtt_surface[alea3])}${sp()}m${texteExposant(2)}. <br>` +
`En a-t-il suffisamment pour la surface de ${stringNombre(surfaceFinale2)}${sp()}m${texteExposant(2)} qu'il lui reste à faire${sp()}?<br>`
    texte += '<br>' + enonceAMC2 + ajouteChampTexteMathLive(exo, i + 1, 'largeur25  inline', { texteApres: ' (oui ou non)' })
    texteCorr += `${numAlpha(1)} ${stringNombre(quantite2)}${sp()}${liste[alea1].unite}, c'est ${texteEnCouleur(stringNombre(rapport[alea5]))} fois ${qttaffichage}${sp()}${liste[alea1].unite}. <br>` +
`Avec ${stringNombre(quantite2)}${sp()}${liste[alea1].unite} on peut donc traiter une surface de ${texteEnCouleur(stringNombre(rapport[alea5]))}
fois ${texteEnCouleur(stringNombre(liste[alea1].qtt_surface[alea3]), 'blue')}${sp()}m${texteExposant(2)}. <br>` +
`${texteEnCouleur(stringNombre(rapport[alea5]))} $\\times$ ${texteEnCouleur(stringNombre(liste[alea1].qtt_surface[alea3]), 'blue')}${sp()}m${texteExposant(2)} = ${stringNombre(calcul(rapport[alea5] * liste[alea1].qtt_surface[alea3], 2))}${sp()}m${texteExposant(2)}<br>`
    texteCorr += rapport[alea5] * liste[alea1].qtt_surface[alea3] < surfaceFinale2
      ? texteEnCouleurEtGras(`Conclusion : ${stringNombre(calcul(rapport[alea5] * liste[alea1].qtt_surface[alea3], 2))}${sp()}m${texteExposant(2)} < ${stringNombre(surfaceFinale2)}${sp()}m${texteExposant(2)} donc ${prenoms[1]} en a suffisamment pour ${surfaceFinale2}${sp()}m${texteExposant(2)}.`, 'black') + ' <br>'
      : texteEnCouleurEtGras(`Conclusion : ${stringNombre(calcul(rapport[alea5] * liste[alea1].qtt_surface[alea3], 2))}${sp()}m${texteExposant(2)} > ${stringNombre(surfaceFinale2)}${sp()}m${texteExposant(2)} donc ${prenoms[1]} n'en a pas assez pour ${surfaceFinale2}${sp()}m${texteExposant(2)}.`, 'black') + ' <br>'

    if (!context.isAmc) {
      setReponse(exo, i, calcul(rapport[alea4] * quantite, 2))
      setReponse(exo, i + 1, calcul(rapport[alea5] * liste[alea1].qtt_surface[alea3], 2) > surfaceFinale2 ? 'oui' : 'non')
    } else {
      exo.autoCorrection[i] = {
        enonce: '',
        enonceAvant: false,
        propositions: [
          {
            type: 'AMCNum',
            propositions: [{
              texte: texteCorr,
              statut: '',
              reponse: {
                texte: enonceAMC1,
                valeur: [calcul(rapport[alea4] * quantite)],
                param: {
                  digits: nombreDeChiffresDe(calcul(rapport[alea4] * quantite, 2)),
                  decimals: nombreDeChiffresDansLaPartieDecimale(calcul(rapport[alea4] * quantite, 2)),
                  signe: false,
                  approx: 0
                }
              }
            }]
          },
          {
            type: 'AMCOpen',
            propositions: [{
              enonce: enonceAMC2,
              statut: 2
            }]
          }
        ]
      }
    }
  }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

// _______ Fin des fonctions correspondants aux situations problèmes _____

export const uuid = 'f7a14'
export const ref = '6P11'
export default function ProportionnaliteParLinearite () {
  'use strict'
  let question
  Exercice.call(this) // Héritage de la classe Exercice()
  context.isHtml ? (this.spacing = 2) : (this.spacing = 1)
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1)
  this.nbQuestions = 6
  this.nbCols = 1
  this.nbColsCorr = 1
  this.besoinFormulaireCaseACocher = ['Version simplifiée ne comportant que des nombres entiers']
  this.sup = false
  this.besoinFormulaire2Texte = ['Type de questions', 'Nombres séparés par des tirets\n1 : Achat\n2 : Recette\n3 : Dilution\n4 : Distance\n5 : Echelle\n6 : Surface\n7 : Mélange']
  this.sup2 = 7
  this.nouvelleVersion = function () {
    this.consigne = this.nbQuestions === 1 ? 'Répondre à la question posée en justifiant.' : 'Répondre aux questions posées en justifiant.'
    let indiceQuestion = 0
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let listeIndexSituationsDisponible = []

    if (!this.sup2) { // Si aucune liste n'est saisie
      listeIndexSituationsDisponible = rangeMinMax(1, 6)
    } else {
      if (typeof (this.sup2) === 'number') { // Si c'est un nombre, c'est que le nombre a été saisi dans la barre d'adresses
        listeIndexSituationsDisponible[0] = contraindreValeur(1, 7, this.sup2, 7)
      } else {
        listeIndexSituationsDisponible = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeIndexSituationsDisponible.length; i++) { // on a un tableau avec des strings : ['1', '5', '2','toto','45']
          listeIndexSituationsDisponible[i] = contraindreValeur(1, 7, parseInt(listeIndexSituationsDisponible[i]), 7) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(listeIndexSituationsDisponible, 7) > 0) listeIndexSituationsDisponible = rangeMinMax(1, 6) // Teste si l'utilisateur a choisi tout
    const listeIndexSituations = combinaisonListes(listeIndexSituationsDisponible, this.nbQuestions) // permet de ne pas avoir 2 fois la même situation si - de questions que de situations
    // boucle pour le nombre de question.
    // A chaque question on vérifie qu'elle n'existe pas déjà pour en refaire une. Sécurité : on ajoute un compteur pour eviter trop d'essais...
    let cpt = 0
    for (let i = 0; i < this.nbQuestions && cpt < 50;) {
      indexN = randint(0, couplePremiersEntreEux.length - 1)
      if (this.sup) {
        versionSimplifiee = true
      } else {
        versionSimplifiee = false
      }
      switch (parseInt(listeIndexSituations[i])) {
        case 1:
          question = questionAchat(this, indiceQuestion)
          if (!context.isAmc) {
            indiceQuestion += 2
          } else {
            indiceQuestion++
          }
          break
        case 2:
          question = questionRecette(this, indiceQuestion)
          if (!context.isAmc) {
            indiceQuestion += 2
          } else {
            indiceQuestion++
          }
          break
        case 3:
          question = questionDillution(this, indiceQuestion)
          indiceQuestion++
          break
        case 4:
          question = questionDistance(this, indiceQuestion)
          if (versionSimplifiee) {
            indiceQuestion++
          } else {
            if (!context.isAmc) {
              indiceQuestion += 2
            } else {
              indiceQuestion++
            }
          }
          break
        case 5:
          question = questionEchelle(this, indiceQuestion)
          if (!context.isAmc) {
            indiceQuestion += 2
          } else {
            indiceQuestion++
          }
          break
        case 6:
          question = questionRecouvrirSurface(this, indiceQuestion)
          if (versionSimplifiee) {
            indiceQuestion++
          } else {
            if (!context.isAmc) {
              indiceQuestion += 2
            } else {
              indiceQuestion++
            }
          }
          break
      }
      if (this.listeQuestions.indexOf(question.qtexte) === -1) { // Si la question n'a jamais été posée, on la garde.
        this.listeQuestions.push(question.qtexte)
        this.listeCorrections.push(question.qtexteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
}
