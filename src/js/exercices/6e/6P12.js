import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, stringNombre, prenomF, prenomM, texteEnCouleur, texPrix, texteEnCouleurEtGras, rangeMinMax, contraindreValeur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { getVueFromUrl } from '../../modules/gestionUrl.js'
export const titre = 'Résoudre des problèmes de proportionnalité en utilisant la proportionnalité simple'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = 'true'
export const amcType = 'AMCNum'
/**
 * On donne une relation de proportionnalité du type n objets coûtent x€ et on demande le prix de y objets
 * et le nombre d'objets qu'on peut acheter avec z€.
 * @author Jean-Claude Lhote // pour l'exercice 6P11 original
 * @author CGrolleau // pour avoir ajouté des situations de proportionnalité en 03/2021
 * @author Guillaume Valmont // pour avoir fait la transition coefficient de linéarité -> coefficient de proportionnalité en 08/2021
 * référence 6P12
 * Publié le 11/08/2021
 * Relecture : Novembre 2021 par EE
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
  const listeDeChose = [[]]
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
  listeDeChose[0] = [
    'un seul article',
    'un seul outil',
    'un seul accessoire',
    "une seule pièce d'outillage",
    'un seul pinceau',
    'une seule ampoule',
    'un seul tournevis',
    'une seule spatule',
    'un seul raccord de tuyaux'
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
  listeDeChose[1] = [
    'un seul poisson rouge',
    'un seul canneton',
    'une seule perruche',
    'un seul phasme',
    'un seul collier anti-puces',
    'une seule souris',
    'un seul lapereau',
    'un seul paquet de graines'
  ]
  listeDeChoses[2] = [
    'sets de tables',
    'verres',
    'assiettes',
    'os à mâcher',
    'dosettes de café',
    'packs de lait',
    'paquets de pâtes'
  ]
  listeDeChose[2] = [
    'un seul set de table',
    'un seul verre',
    'une seule assiette',
    'un seul os à mâcher',
    'une seule dosette de café',
    'un seul pack de lait',
    'un seul paquet de pâtes'
  ]
  listeDeChoses[3] = [
    'mangues',
    'ananas',
    'fruits de la passion',
    'melons',
    'paquets de madeleines de Commercy',
    'bergamotes',
    'bredeles',
    'pots de cancoillotte'
  ]
  listeDeChose[3] = [
    'une seule mangue',
    'un seul ananas',
    'un seul fruit de la passion',
    'un seul melon',
    'un seul paquet de madeleines de Commercy',
    'une seule bergamote',
    'un seul bredele',
    'un seul pot de cancoillotte'
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
  listeDeChose[4] = [
    'une seule carte',
    'un seul livre',
    'une seule gravure',
    'un seul puzzle',
    'une seule maquette',
    'une seule roche',
    'un seul jeu de société'
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
  const n = couplePremiersEntreEux[indexN][0]
  const y = couplePremiersEntreEux[indexN][1]
  let x
  if (versionSimplifiee) {
    x = calcul(n * randint(2, 5))
  } else {
    x = calcul(n * pu, 2)
  }
  let met = false
  let p
  while (met === false) {
    p = n * randint(2, 5)
    if (p !== y) {
      met = true
    }
  }
  const texte = `${prenoms[0]} a repéré, ${listeDeLieux[index1]}, des ${objet} qui l'intéressent.<br>
  Elle lit que ${n} ${objet} coûtent ${texPrix(x)} €. Elle veut en acheter ${y}.<br>
  Combien va-t-elle dépenser ?` + ajouteChampTexteMathLive(exo, i, 'largeur25 inline', { texteApres: ' €' })
  const texteCorr = `Commençons par trouver le prix d'${listeDeChose[index1][index2]}. <br>` +
`Si ${n} ${objet} coûtent ${texPrix(x)} €, alors ${listeDeChose[index1][index2]} coûte ${texteEnCouleur(n)} fois moins cher.<br>` +
`${texPrix(x)} € $\\div $ ${texteEnCouleur(n)} = ${texPrix(x / n)} € <br>` +
texteEnCouleurEtGras(' Conclusion intermédiaire : ', 'black') +
`${listeDeChose[index1][index2]} coûte ${texteEnCouleur(texPrix(x / n), 'blue')} €.<br>` +
        `Cherchons maintenant le prix de ${y} ${objet}. <br>` +
`${y} ${objet}, c'est ${texteEnCouleur(y)} fois plus qu'${listeDeChose[index1][index2]}. <br>` +
`${y} ${objet} coûtent donc ${texteEnCouleur(y)} fois plus que ${texteEnCouleur(texPrix(x / n), 'blue')} €, le prix d'${listeDeChose[index1][index2]}.` +
`<br> ${texteEnCouleur(texPrix(x / n), 'blue')} € $\\times$ ${texteEnCouleur(y)} = ${texPrix(x * y / n)} €<br>` +
` ${texteEnCouleurEtGras('Conclusion :', 'black')} ${y} ${objet} coûtent ${texPrix(x * y / n)} €.`
  setReponse(exo, i, calcul(x * y / n))

  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionRecette (exo, i) { // questions avec des masses pour un nombre de personne dans des recettes correction : passage à l'unité
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
  const nbPersonneInit = couplePremiersEntreEux[indexN][0] // nombre de personne indiqué dans la recette.
  const nbPersonneFinal = couplePremiersEntreEux[indexN][1] // nombre de personne pour lequel on veut cuisiner
  const alea1 = randint(0, 3) // pour le choix de l'ingredient
  const alea2 = randint(0, liste[alea1].recettes.length - 1) // pour le choix de la recette
  const alea3 = randint(0, liste[alea1].quantites_par_pers.length - 1) // pour le choix de la quantité par personne.
  const quantite = calcul(liste[alea1].quantites_par_pers[alea3] * nbPersonneInit) // Calcul de la quantité dans la recette à partir de la qtt/personne et du nb de personne
  const quantiteReponse = calcul(liste[alea1].quantites_par_pers[alea3] * nbPersonneFinal) // Pour la correction
  const prenoms = [prenomF(), prenomM()] // Choix de prénoms pour l'énoncé
  const texte = `${prenoms[0]} lit sur sa recette de ${liste[alea1].recettes[alea2]}${getVueFromUrl() === 'multi' ? '<br>' : ' '}pour ${nbPersonneInit} personnes qu'il faut ${stringNombre(quantite)} g de ${liste[alea1].ingredient}. <br>` +
`Elle veut adapter sa recette pour ${nbPersonneFinal} personnes.` +
`<br> Quelle masse de ${liste[alea1].ingredient} doit-elle prévoir ?` + ajouteChampTexteMathLive(exo, i, 'largeur25 inline', { texteApres: ' g' })
  const texteCorr = `Commençons par trouver la masse de ${liste[alea1].ingredient} pour une personne. <br>` +
` ${nbPersonneInit} personnes, c'est ${texteEnCouleur(nbPersonneInit)} fois 1 personne. ` +
`il faut donc ${texteEnCouleur(nbPersonneInit)} fois moins que ${stringNombre(quantite)} g pour 1 personne.<br>` +
`${stringNombre(quantite)} g $\\div $ ${texteEnCouleur(nbPersonneInit)} = ${liste[alea1].quantites_par_pers[alea3]} g <br>` +
texteEnCouleurEtGras(' Conclusion intermédiaire :', 'black') +
` il faut ${texteEnCouleur(liste[alea1].quantites_par_pers[alea3], 'blue')} g de ${liste[alea1].ingredient} pour 1 personne. <br>` +
        ` Cherchons maintenant la quantité nécessaire pour ${nbPersonneFinal} personnes. <br>` +
` ${nbPersonneFinal} personnes, c'est ${texteEnCouleur(nbPersonneFinal)} fois 1 personne. <br>` +
`Donc, il faut ${texteEnCouleur(nbPersonneFinal)} fois plus que ${liste[alea1].quantites_par_pers[alea3]} g de ${liste[alea1].ingredient} que pour 1 personne pour faire sa recette.` +
`<br> ${texteEnCouleur(liste[alea1].quantites_par_pers[alea3], 'blue')} g $\\times$ ${texteEnCouleur(nbPersonneFinal)} = ${quantiteReponse} g <br>
${texteEnCouleurEtGras('Conclusion : ', 'black')} ${prenoms[0]} doit utiliser ${quantiteReponse} g de ${liste[alea1].ingredient} pour ${nbPersonneFinal} personnes. `
  setReponse(exo, i, quantiteReponse)
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
  const volumeInitial = couplePremiersEntreEux[indexN][0] // volume d'eau pour la préparation
  const volumeFinal = couplePremiersEntreEux[indexN][1]
  const alea1 = randint(0, 3) // pour le choix du soluté
  const alea2 = randint(0, liste[alea1].volumeUnitaire.length - 1) // pour le choix du volume pour une unité de solvant
  let quantite
  if (versionSimplifiee) {
    quantite = volumeInitial * randint(2, 5)
  } else {
    quantite = liste[alea1].volumeUnitaire[alea2] * volumeInitial
  }
  if (volumeFinal < 2) {
    uniteSolvantVolumeFinal = liste[alea1].unite_solvant[0]
  } else {
    uniteSolvantVolumeFinal = liste[alea1].unite_solvant[1]
  }
  const volumeFinalAff = stringNombre(volumeFinal) // pour affichage avec bon séparateur.
  const volumeInitialAff = stringNombre(volumeInitial) // pour affichage avec bon séparateur.
  const texte = `Il est indiqué sur la bouteille de ${liste[alea1].solute} qu'il faut ${getVueFromUrl() === 'multi' ? '<br>' : ' '}` +
  ` ${stringNombre(quantite)} ${liste[alea1].unite_solute} de  ${liste[alea1].solute} pour ${volumeInitialAff} ${liste[alea1].unite_solvant[1]} d'eau.<br> ` +
  `On veut utiliser ${volumeFinalAff} ${uniteSolvantVolumeFinal} d'eau.` +
  `<br> Quel volume de ${liste[alea1].solute} doit-on prévoir ? ` + ajouteChampTexteMathLive(exo, i, 'largeur25 inline', { texteApres: ' ' + liste[alea1].unite_solute })

  const texteCorr = `Commençons par trouver combien est-ce qu'il faut de ${liste[alea1].solute} pour 1 ${liste[alea1].unite_solvant[0]} d'eau. <br>` +
  ` ${volumeInitial} ${liste[alea1].unite_solvant[1]} d'eau, c'est ${texteEnCouleur(volumeInitial)} fois 1 ${liste[alea1].unite_solvant[0]} d'eau. ` +
  `Pour 1 ${liste[alea1].unite_solvant[0]} d'eau, il faut donc ${texteEnCouleur(volumeInitial)} fois moins que ${stringNombre(quantite)} ${liste[alea1].unite_solute}.<br>` +
  `${stringNombre(quantite)} ${liste[alea1].unite_solute} $\\div $ ${texteEnCouleur(volumeInitial)} = ${stringNombre(quantite / volumeInitial)} ${liste[alea1].unite_solute} <br>` +
  texteEnCouleurEtGras(' Conclusion intermédiaire :', 'black') +
  ` il faut ${texteEnCouleur(stringNombre(quantite / volumeInitial), 'blue')} ${liste[alea1].unite_solute} de ${liste[alea1].solute} pour 1 ${liste[alea1].unite_solvant[0]} d'eau. <br>` +
      ` Cherchons maintenant la quantité nécessaire pour ${volumeFinalAff} ${uniteSolvantVolumeFinal} d'eau. <br>` +
  ` ${volumeFinalAff} ${uniteSolvantVolumeFinal} d'eau, c'est ${texteEnCouleur(volumeFinalAff)} fois 1 ${liste[alea1].unite_solvant[0]} d'eau.` +
  ` Il faut donc ${texteEnCouleur(volumeFinalAff)} fois plus de ${liste[alea1].solute} que ${stringNombre(quantite / volumeInitial)} ${liste[alea1].unite_solute} :` +
  `<br> ${texteEnCouleur(stringNombre(quantite / volumeInitial), 'blue')} ${liste[alea1].unite_solute} $\\times$ ${texteEnCouleur(volumeFinalAff)} = ${stringNombre(quantite / volumeInitial * volumeFinal)} ${liste[alea1].unite_solute}<br>` +
  `${texteEnCouleurEtGras('Conclusion :', 'black')} il faut prévoir ${stringNombre(quantite / volumeInitial * volumeFinal)} ${liste[alea1].unite_solute} de  ${liste[alea1].solute}.`
  setReponse(exo, i, calcul(quantite / volumeInitial * volumeFinal))
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionDistance (exo, i) { // questions de distance parcourue à une vitesse moyenne donnée
  const liste = [ // liste des "moyens de locomotion" et vitesses associées
    {
      locomotion: 'piéton',
      vitesse: [3, 4, 5, 6]
    },
    {
      locomotion: 'cycliste',
      vitesse: [12, 15, 16, 17, 18, 20, 22]
    },
    {
      locomotion: 'camion',
      vitesse: [75, 77, 80, 82, 85]
    },
    {
      locomotion: 'train',
      vitesse: [125, 150, 175, 185, 195]
    }
  ]
  let facteur
  if (versionSimplifiee) {
    facteur = 1
  } else {
    facteur = randint(1, 19, [10]) / 10
  }
  const alea1 = randint(0, 3) // pour le choix de locomotion
  const dureeQ = couplePremiersEntreEux[indexN][0]
  const dureeR = couplePremiersEntreEux[indexN][1]
  const alea2 = randint(0, liste[alea1].vitesse.length - 1) // pour le facteur de distance parcourue
  const texte = `Un ${liste[alea1].locomotion} parcourt en moyenne $${stringNombre(liste[alea1].vitesse[alea2] * dureeQ * facteur)}$ km en ${dureeQ} heures.
  <br> Quelle distance va-t-il parcourir, à la même vitesse, en ${dureeR} heures ?` + ajouteChampTexteMathLive(exo, i, 'largeur25 inline', { texteApres: ' km' })

  const texteCorr = `Commençons par trouver quelle est la distance parcourue en 1h. <br>
  1 h, c'est ${texteEnCouleur(dureeQ)} fois moins que ${dureeQ} h. 
   En 1 h, le ${liste[alea1].locomotion} parcourt donc une distance ${texteEnCouleur(dureeQ)} fois moins grande qu'en ${dureeQ} h.<br>` +
  `$${stringNombre(liste[alea1].vitesse[alea2] * facteur * dureeQ)}$ km $\\div $ ${texteEnCouleur(dureeQ)} = ${stringNombre(liste[alea1].vitesse[alea2] * facteur)} km <br>` +
  texteEnCouleurEtGras(' Conclusion intermédiaire :', 'black') +
  ` en 1h, le ${liste[alea1].locomotion} parcourt ${texteEnCouleur(stringNombre(liste[alea1].vitesse[alea2] * facteur), 'blue')} km. <br>` +
      ` Cherchons maintenant la distance parcourue en ${dureeR} h. <br>` +
  ` ${dureeR} h, c'est ${texteEnCouleur(dureeR)} fois 1 h.` +
  ` Le ${liste[alea1].locomotion} parcourt donc ${texteEnCouleur(dureeR)} fois plus de distance qu'en 1 h.` +
  `<br> ${texteEnCouleur(stringNombre(liste[alea1].vitesse[alea2] * facteur), 'blue')} km $\\times$ ${texteEnCouleur(dureeR)} = $${stringNombre(liste[alea1].vitesse[alea2] * dureeR * facteur)}$ km <br>` +
  `${texteEnCouleurEtGras('Conclusion :', 'black')} le ${liste[alea1].locomotion} parcourra en moyenne $${stringNombre(liste[alea1].vitesse[alea2] * dureeR * facteur)}$ km en ${dureeR} h.`
  setReponse(exo, i, calcul(liste[alea1].vitesse[alea2] * dureeR * facteur))
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionEchelle (exo, i) { // X cm sur une carte correspond à x km dans la réalité...
  const distanceCarte = couplePremiersEntreEux[indexN][0] // Choix d'un nombre de cm sur la carte
  let distanceReel = distanceCarte * randint(2, 5) // Choix d'un nombre de km dans la réalité (on évite d'avoir 1cm pour 1km)
  if (!versionSimplifiee) distanceReel *= randint(1, 19, [10]) / 10
  const distanceCarte2 = couplePremiersEntreEux[indexN][1]
  const prenoms = [prenomF(), prenomM()]
  const texte = `Sur une carte sur laquelle ${distanceCarte} cm représente ${stringNombre(distanceReel)} km dans la réalité, <br>
  ${prenoms[0]} mesure son trajet et elle trouve une distance de ${distanceCarte2} cm. <br>` +
  'À quelle distance cela correspond dans la réalité ?' + ajouteChampTexteMathLive(exo, i, 'largeur25 inline', { texteApres: ' km' })

  const texteCorr = `Commençons par trouver à combien de km dans la réalité, 1 cm sur la carte correspond. <br>
  1 cm, c'est ${texteEnCouleur(distanceCarte)} fois moins que ${distanceCarte} cm.<br>` +
  `${stringNombre(distanceReel)} km $\\div $ ${texteEnCouleur(distanceCarte)} = ${stringNombre(distanceReel / distanceCarte)} km <br>` +
  texteEnCouleurEtGras(' Conclusion intermédiaire :', 'black') +
  ` 1 cm sur la carte correspond donc à ${texteEnCouleur(stringNombre(distanceReel / distanceCarte), 'blue')} km dans la réalité. <br>` +
      ' Cherchons maintenant la distance réelle de son trajet. <br>' +
  ` ${distanceCarte2} cm, c'est ${texteEnCouleur(distanceCarte2)} fois 1 cm.` +
  `<br> ${texteEnCouleur(stringNombre(distanceReel / distanceCarte), 'blue')} km $\\times$ ${texteEnCouleur(distanceCarte2)} = ${stringNombre(distanceCarte2 * distanceReel / distanceCarte)} km<br>` +
  `${texteEnCouleurEtGras('Conclusion :', 'black')} son trajet correspond en réalité à une distance de ${stringNombre(distanceCarte2 * distanceReel / distanceCarte)} km.`
  setReponse(exo, i, calcul(distanceCarte2 * distanceReel / distanceCarte))
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionRecouvrirSurface (exo, i) { // peinture, gazon, carrelage pour une surface donnée.
  const liste = [
    {
      matiere: 'de la peinture',
      unite: 'L',
      qtt_matiere_unitaire: [0.5, 1, 1.5, 2], // quantité au m²
      qtt_surface: [2, 3, 5] // nombre de m² indiqués sur l'emballage
    },
    {
      matiere: 'du gazon',
      unite: 'kg',
      qtt_matiere_unitaire: [2.5, 3, 5, 10],
      qtt_surface: [25, 40, 50]
    },
    {
      matiere: 'du carrelage',
      unite: 'carreaux',
      qtt_matiere_unitaire: [25, 30, 50, 100],
      qtt_surface: [2, 4]
    }
  ]
  let alea1
  if (versionSimplifiee) alea1 = liste.length - 1 // Pour avoir un coef entier, la qtt_matiere_unitaire doit être plus grande que la surface, ce qui ne se trouve que dans le carrelage
  else alea1 = randint(0, liste.length - 1)
  const alea2 = randint(0, liste[alea1].qtt_matiere_unitaire.length - 1)
  const alea3 = randint(0, liste[alea1].qtt_surface.length - 1)
  const rapport = [0.25, 0.5, 0.75, 1.25, 1.5, 2, 3, 4, 5] // choix parmi des rapports simples (en 6eme cela parrait suffisant)
  const alea4 = randint(0, rapport.length - 1)
  let quantite, surfaceFinale, surfaceInitiale
  if (versionSimplifiee) {
    surfaceInitiale = couplePremiersEntreEux[indexN][0]
    quantite = surfaceInitiale * randint(2, 5)
    surfaceFinale = couplePremiersEntreEux[indexN][1]
  } else {
    surfaceInitiale = liste[alea1].qtt_surface[alea3]
    quantite = liste[alea1].qtt_matiere_unitaire[alea2]
    surfaceFinale = calcul(rapport[alea4] * liste[alea1].qtt_surface[alea3], 3)
  }
  const prenoms = [prenomF(), prenomM()]
  const qttaffichage = stringNombre(quantite) // Pour affichage avec virgule en séparateur.
  const texte = `${prenoms[0]} doit acheter ${liste[alea1].matiere}. <br>` +
  `Sur la notice, il est indiqué de prévoir ${qttaffichage} ${liste[alea1].unite} pour ${stringNombre(surfaceInitiale)} m$^2$. <br> ` +
  `Combien doit-elle en acheter pour une surface de ${stringNombre(surfaceFinale)} m$^2$ ?` + ajouteChampTexteMathLive(exo, i, 'largeur25 inline', { texteApres: ' ' + liste[alea1].unite })

  const texteCorr = `Commençons par trouver combien de ${liste[alea1].unite} il faut prévoir pour 1 m$^2$. <br>
  1 m$^2$, c'est ${texteEnCouleur(stringNombre(surfaceInitiale))} fois moins que ${stringNombre(surfaceInitiale)} m$^2$.<br>` +
  `${qttaffichage} ${liste[alea1].unite} $\\div $ ${texteEnCouleur(stringNombre(surfaceInitiale))} = ${stringNombre(quantite / surfaceInitiale)} ${liste[alea1].unite} <br>` +
  texteEnCouleurEtGras(' Conclusion intermédiaire :', 'black') +
  ` on a donc besoin de ${texteEnCouleur(stringNombre(quantite / surfaceInitiale), 'blue')} ${liste[alea1].unite} pour recouvrir 1 m$^2$ . <br>` +
      ` Cherchons maintenant la quantité de ${liste[alea1].unite} nécessaire pour recouvrir ${stringNombre(surfaceFinale)} m$^2$. <br>` +
  ` ${stringNombre(surfaceFinale)} m$^2$, c'est ${texteEnCouleur(stringNombre(surfaceFinale))} fois plus que 1 m$^2$.` +
  `<br> ${texteEnCouleur(stringNombre(quantite / surfaceInitiale), 'blue')} ${liste[alea1].unite} $\\times$ ${texteEnCouleur(stringNombre(surfaceFinale))} = ${stringNombre(quantite * surfaceFinale / surfaceInitiale)} ${liste[alea1].unite}<br>` +
  `${texteEnCouleurEtGras('Conclusion :', 'black')} ${prenoms[0]} aura besoin de ${stringNombre(quantite * surfaceFinale / surfaceInitiale)} ${liste[alea1].unite} pour recouvrir ${stringNombre(surfaceFinale)} m$^2$.`
  setReponse(exo, i, calcul(quantite * surfaceFinale / surfaceInitiale, 3))
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

// _______ Fin des fonctions correspondants aux situations problèmes _____

export const uuid = 'b0f4e'
export const ref = '6P12'
export default function ProportionnaliteParCoefDeProportionnalite () {
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
  this.besoinFormulaire2Texte = ['Type de questions', 'Nombres séparés par des tirets\n1 : Achat\n2 : Recette\n3 : Dilution\n4 : Distance\n5 : Échelle\n6 : Surface']
  this.nouvelleVersion = function () {
    this.consigne = this.nbQuestions === 1 ? 'Répondre à la question posée en justifiant.' : 'Répondre aux questions posées en justifiant.'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let listeIndexSituationsDisponible = []
    if (!this.sup2) { // Si aucune liste n'est saisie
      listeIndexSituationsDisponible = rangeMinMax(1, 6)
    } else {
      if (typeof (this.sup2) === 'number') { // Si c'est un nombre, c'est que le nombre a été saisi dans la barre d'adresses
        listeIndexSituationsDisponible[0] = contraindreValeur(1, 6, this.sup2, 6)
      } else {
        listeIndexSituationsDisponible = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeIndexSituationsDisponible.length; i++) { // on a un tableau avec des strings : ['1', '5', '2','toto','45']
          listeIndexSituationsDisponible[i] = contraindreValeur(1, 6, parseInt(listeIndexSituationsDisponible[i]), 6) // parseInt en fait un tableau d'entiers
        }
      }
    }
    const listeIndexSituations = combinaisonListes(listeIndexSituationsDisponible, this.nbQuestions)
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
          question = questionAchat(this, i)
          break
        case 2:
          question = questionRecette(this, i)
          break
        case 3:
          question = questionDillution(this, i)
          break
        case 4:
          question = questionDistance(this, i)
          break
        case 5:
          question = questionEchelle(this, i)
          break
        case 6:
          question = questionRecouvrirSurface(this, i)
          break
      }
      if (this.questionJamaisPosee(i, listeIndexSituations[i], this.autoCorrection[i].reponse.valeur[0], this.autoCorrection[i].enonce)) { // Si la question n'a jamais été posée, on la garde.
        this.listeQuestions.push(question.qtexte)
        this.listeCorrections.push(question.qtexteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
