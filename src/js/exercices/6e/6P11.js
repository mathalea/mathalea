import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombrec, prenomF, prenomM, texteEnCouleur, texPrix, texteEnCouleurEtGras, numAlpha } from '../../modules/outils.js'
export const titre = 'Résoudre des problèmes de proportionnalité en utilisant la linéarité simple'

/**
 * On donne une relation de proportionnalité du type n objets coûtent x€ et on demande le prix de y objets
 * et le nombre d'objets qu'on peut acheter avec z€.
 * @author Jean-Claude Lhote
 * référence 6P11
 * 03/2021 : ajout de situations de proportionnalité : CGrolleau
*/

// _____ Les fonctions suivantes renvoient un objet : {texte = ; texteCorr = ;} ______
// elles correspondent aux différentes situations problèmes

function questionAchat () { // questions d'origine du 6P11 : achat.
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
  const n = randint(3, 6)
  const y = n * randint(2, 5)
  const x = calcul(n * pu, 2)
  const somme = calcul(y * pu, 2)
  let met = false
  let p
  while (met === false) {
    p = n * randint(2, 5)
    if (p !== y) {
      met = true
    }
  }
  const z = calcul(p * pu, 2)
  let texte = `${numAlpha(0)} ${prenoms[0]} a repéré ${listeDeLieux[index1]} des ${objet} qui l'intéressent.<br> ` +
`Elle lit que ${n} ${objet} coûtent ${texPrix(x)} €. ` +
`Elle veut en acheter ${y}.<br> Combien va-t-elle dépenser ?<br>`
  let texteCorr = `${numAlpha(0)} ${y} ${objet}, c'est ${texteEnCouleur(
        texNombrec(y / n)
      )} fois ${texteEnCouleur(
        n,
        'blue'
      )} ${objet}.<br> Si ${texteEnCouleur(
        n,
        'blue'
      )} ${objet} coûtent ${texPrix(x)} €, alors ${texteEnCouleur(
        texNombrec(y / n)
      )} fois ${texteEnCouleur(
        n,
        'blue'
      )} ${objet} coutent ${texteEnCouleur(
        texNombrec(y / n)
      )} fois ${texPrix(x)} €.<br>` +
texteEnCouleurEtGras(`Donc ${prenoms[0]} dépensera ${texteEnCouleur(
        texNombrec(y / n)
      )} $\\times$ ${texPrix(x)} € = ${texPrix(somme)} €.`, 'black') + '<br><br>'
  texte += `${numAlpha(1)} ${prenoms[1]
        } veut lui aussi acheter ces ${objet}. Il dispose de ${texPrix(
          z
        )} €.<br> Combien peut-il en acheter ?<br>`
  texteCorr += `${numAlpha(1)} ${texPrix(z)} €, c'est ${texteEnCouleur(
        texNombrec(z / x)
      )} fois ${texPrix(x)} €.<br> Si avec ${texPrix(
        x
      )} € on peut acheter ${texteEnCouleur(
        n,
        'blue'
      )} ${objet}, alors avec ${texteEnCouleur(
        texNombrec(z / x)
      )} fois ${texPrix(x)} €, on peut acheter ${texteEnCouleur(
        texNombrec(z / x)
      )} fois ${texteEnCouleur(n, 'blue')} ${objet}.<br>`
  texteCorr += texteEnCouleurEtGras(`Donc ${prenoms[1]} pourra acheter ${texteEnCouleur(
        texNombrec(z / x)
      )} $\\times$ ${texteEnCouleur(n, 'blue')} = ${p} ${objet}.`, 'black') + '<br>'
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionRecette () { // questions avec des masses pour un nombre de personne dans des recettes correction : passage à l'unité
  let texte, texteCorr
  const liste = [ // liste des ingrédients avec différentes recettes associées et masses
    {
      ingredient: 'farine',
      recettes: ['gateau au citron', 'gauffres', 'crepes', 'cake'],
      quantites_par_pers: [20, 25, 30, 35, 40, 50] // A voir pour l'instant quantités "simples".
    },
    {
      ingredient: 'sucre',
      recettes: ['gateau', 'mousse au chocolat', 'pain perdu', 'riz au lait'],
      quantites_par_pers: [15, 20, 25, 30, 35]
    },
    {
      ingredient: 'chocolat',
      recettes: ['gateau', 'mousse au chocolat', 'flan', 'riz au lait'],
      quantites_par_pers: [10, 15, 20, 25, 30, 35]
    },
    {
      ingredient: 'beurre',
      recettes: ['gateau', 'mousse au chocolat'],
      quantites_par_pers: [10, 12, 15, 18]
    }
  ]
  const nbPersonneInit = randint(2, 6) // nombre de personne indiqué dans la recette.
  const nbPersonneFinal = randint(2, 12, [nbPersonneInit]) // nombre de personne pour lequel on veut cuisiner
  const alea1 = randint(0, 3) // pour le choix de l'ingredient
  const alea2 = randint(0, liste[alea1].recettes.length - 1) // pour le choix de la recette
  const alea3 = randint(0, liste[alea1].quantites_par_pers.length - 1) // pour le choix de la quantité par personne.
  const quantite = calcul(liste[alea1].quantites_par_pers[alea3] * nbPersonneInit) // Calcul de la quantité dans la recette à partir de la qtt/personne et du nb de personne
  const quantiteReponse = calcul(liste[alea1].quantites_par_pers[alea3] * nbPersonneFinal) // Pour la correction
  const alea4 = randint(2, 12, [nbPersonneInit, nbPersonneFinal]) // Pour la deuxième question (on évite une réponse identique à la 1ere et à la recette.)
  const quantiteQ2 = calcul(liste[alea1].quantites_par_pers[alea3] * alea4)
  const prenoms = [prenomF(), prenomM()] // Choix de prénoms pour l'énoncé
  texte = `${numAlpha(0)} ${prenoms[0]} lit sur sa recette de ${liste[alea1].recettes[alea2]} pour ${nbPersonneInit} personnes qu'il faut ${quantite} g de ${liste[alea1].ingredient}. <br>` +
`Elle veut adapter sa recette pour ${nbPersonneFinal} personnes.` +
`<br> Quelle masse de ${liste[alea1].ingredient} doit-elle prévoir ? <br><br>`
  texteCorr = `${numAlpha(0)} Commençons par trouver la masse de ${liste[alea1].ingredient} pour une personne : <br>` +
` ${nbPersonneInit} personnes, c'est ${texteEnCouleur(nbPersonneInit)} fois 1 personne. ` +
`il faut donc ${texteEnCouleur(nbPersonneInit)} fois moins que ${quantite} g pour 1 personne.<br>` +
`${quantite} $\\div $ ${texteEnCouleur(nbPersonneInit)} = ${liste[alea1].quantites_par_pers[alea3]}. <br>` +
texteEnCouleurEtGras(' Conclusion intermédiaire :', 'black') +
` il faut ${liste[alea1].quantites_par_pers[alea3]} g de ${liste[alea1].ingredient} pour 1 personne. <br>` +
        ` Cherchons maintenant la quantité nécessaire pour ${nbPersonneFinal} personnes : <br>` +
` ${nbPersonneFinal} personnes c'est ${texteEnCouleur(nbPersonneFinal)} fois 1 personne. <br>` +
`Donc il faut ${texteEnCouleur(nbPersonneFinal)} fois plus que ${liste[alea1].quantites_par_pers[alea3]} g de ${liste[alea1].ingredient} que pour 1 personne pour faire sa recette :` +
`<br> ${liste[alea1].quantites_par_pers[alea3]} $\\times$ ${texteEnCouleur(nbPersonneFinal)} = ${quantiteReponse} <br>` +
texteEnCouleurEtGras(`Conclusion : ${prenoms[0]} doit utiliser ${quantiteReponse} g de ${liste[alea1].ingredient} pour ${nbPersonneFinal} personnes. `, 'black') +
' <br><br>'
  texte += `${numAlpha(1)} ${prenoms[1]} utilise la même recette de ${liste[alea1].recettes[alea2]}. Il dispose de ${quantiteQ2} g de ${liste[alea1].ingredient}. <br>` +
' Pour combien de personnes au maximum peut-il cuisiner ? <br>'
  texteCorr += `${numAlpha(1)} ${prenoms[1]} utilise ${quantiteQ2} g de ${liste[alea1].ingredient} cela représente ${texteEnCouleur(alea4, 'blue')} fois plus que ${liste[alea1].quantites_par_pers[alea3]} g (quantité pour 1 personne).<br>` +
texteEnCouleurEtGras(`  Conclusion :  Il peut donc préparer sa recette pour ${texteEnCouleur(alea4, 'blue')} personnes.`, 'black')
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionDillution () { // questions de mélange de volumes
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
  const volumeFinal = randint(1, 5) + (randint(1, 5)) * 0.1 * randint(-1, 1, [0]) // volume d'eau pour la préparation
  const alea1 = randint(0, 3) // pour le choix du soluté
  const alea2 = randint(0, liste[alea1].volumeUnitaire.length - 1) // pour le choix du volume pour une unité de solvant
  const quantite = liste[alea1].volumeUnitaire[alea2]
  const quantiteReponse = calcul(volumeFinal * quantite) // Calcul du volume de soluté final (pour la correction.)
  if (volumeFinal < 2) {
    uniteSolvantVolumeFinal = liste[alea1].unite_solvant[0]
  } else {
    uniteSolvantVolumeFinal = liste[alea1].unite_solvant[1]
  }
  const volumeFinalAff = texNombrec(volumeFinal) // pour affichage avec bon séparateur.
  const texte = `Il est indiqué sur la bouteille de ${liste[alea1].solute} qu'il faut  ` +
` ${texNombrec(quantite)} ${liste[alea1].unite_solute} de  ${liste[alea1].solute} pour 1 ${liste[alea1].unite_solvant[0]} d'eau.<br> ` +
`On veut utiliser ${volumeFinalAff} ${uniteSolvantVolumeFinal} d'eau.` +
`<br> Quel volume de ${liste[alea1].solute} doit-on prévoir ? <br>`
  const texteCorr = `Le volume de ${liste[alea1].solute} est proportionnel au volume d'eau <br> ` +
` ${texteEnCouleur(volumeFinalAff)} ${uniteSolvantVolumeFinal} d'eau, c'est ${texteEnCouleur(volumeFinalAff)} fois 1 ${liste[alea1].unite_solvant[0]} d'eau. <br> ` +
`il faut donc ${texteEnCouleur(volumeFinalAff)} fois plus que ${texteEnCouleur(texNombrec(quantite), 'blue')} ${liste[alea1].unite_solute} de ${liste[alea1].solute}. <br>` +
`${texteEnCouleur(texNombrec(quantite), 'blue')} ${liste[alea1].unite_solute} $\\times $ ${texteEnCouleur(volumeFinalAff)} = ${texNombrec(quantiteReponse)}  ${liste[alea1].unite_solute}  <br>  ` +
        texteEnCouleurEtGras(` Conclusion : Il faut donc prévoir ${texNombrec(quantiteReponse)} ${liste[alea1].unite_solute} de ${liste[alea1].solute}.`, 'black') + ' <br>'
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionDistance () { // questions de distance parcourue à une vitesse moyenne donnée
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
    temps: '1 heure et demi',
    rapport: 1.5
  },
  {
    temps: '2 heures',
    rapport: 2
  },
  {
    temps: '2 heures et demi',
    rapport: 2.5
  },
  {
    temps: '3 heures',
    rapport: 3
  }]
  const alea2 = randint(0, liste[alea1].vitesse.length - 1) // pour le choix du temps passé
  const rapportQuestion2 = [0.25, 0.5, 0.75, 1.25, 1.5, 2]
  const alea3 = randint(0, rapportQuestion2.length - 1, [alea2])
  const reponseQ1 = calcul(duree[alea2].rapport * liste[alea1].vitesse[alea2])
  const distance = texNombrec(calcul(rapportQuestion2[alea3] * liste[alea1].vitesse[alea2])) // pour question 2
  texte = `${numAlpha(0)} Un ${liste[alea1].locomotion} parcourt en moyenne ${texNombrec(liste[alea1].vitesse[alea2])} km en une heure.<br> Quelle distance va-t-il parcourir, à la même vitesse en ${duree[alea2].temps} ? <br><br> `
  texteCorr = `${numAlpha(0)} ${duree[alea2].temps} c'est ${texteEnCouleur(texNombrec(duree[alea2].rapport))} fois une heure.<br> ` +
`En une heure le ${liste[alea1].locomotion} parcourt ${texteEnCouleur(texNombrec(liste[alea1].vitesse[alea2], 'blue'))} km donc en ${duree[alea2].temps} il va parcourir ${texteEnCouleur(texNombrec(duree[alea2].rapport))} fois ${texteEnCouleur(texNombrec(liste[alea1].vitesse[alea2], 'blue'))} km. <br>` +
`${texteEnCouleur(texNombrec(duree[alea2].rapport))} $\\times$ ${texteEnCouleur(texNombrec(liste[alea1].vitesse[alea2], 'blue'))} km = ${texNombrec(reponseQ1)} km <br>` +
texteEnCouleurEtGras(` Conclusion : Le ${liste[alea1].locomotion} va donc parcourir ${texNombrec(reponseQ1)} km.`, 'black') + '<br><br>'
  texte += `${numAlpha(1)} Combien de temps va-t-il mettre pour parcourir ${distance} km à cette même vitesse ? <br> `
  texteCorr += `${numAlpha(1)} ${distance} c'est ${texteEnCouleur(texNombrec(rapportQuestion2[alea3]))} fois ${texNombrec(liste[alea1].vitesse[alea2])} km.
Il parcourt ${texNombrec(liste[alea1].vitesse[alea2])} km en une heure. <br>` +
`Il va mettre donc ${texteEnCouleur(texNombrec(rapportQuestion2[alea3]))} fois une heure à parcourir ${distance} km <br>` +
texteEnCouleurEtGras(`Conclusion : Il va donc mettre  ${texNombrec(rapportQuestion2[alea3])} heure(s) ( ${texNombrec(rapportQuestion2[alea3])} $\\times$ 1 ) à parcourir ${distance} km  ce qui fait ${calcul(rapportQuestion2[alea3] * 60)} minutes.`, 'black') + '<br><br>'
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionEchelle () { // X cm sur une carte correspond à x km dans la réalité...
  let texte, texteCorr
  const distanceCarte = randint(1, 7) // Choix d'un nombre de cm sur la carte
  const distanceReel = randint(3, 20, [distanceCarte]) // Choix d'un nombre de km dans la réalité (on évite d'avoir 1cm pour 1km)
  const rapport = [0.25, 0.5, 0.75, 1.25, 1.5, 2, 3, 4, 5] // rapport entre la référence et la question (rapports simples car niveau 6eme)
  const alea1 = randint(0, rapport.length - 1)
  const alea2 = randint(0, rapport.length - 1, [alea1])
  const distanceCarte2 = texNombrec(calcul(rapport[alea1] * distanceCarte))
  const distanceReelQ2 = texNombrec(calcul(rapport[alea2] * distanceReel))
  const prenoms = [prenomF(), prenomM()]
  texte = `${numAlpha(0)} Sur une carte sur laquelle ${distanceCarte} cm représente ${distanceReel} km dans la réalité, <br>
${prenoms[0]} mesure sont trajet, elle trouve une distance de ${distanceCarte2} cm. <br>` +
'A quelle distance cela correspond dans la réalité ? <br><br>'
  texteCorr = `${numAlpha(0)} ${distanceCarte2} cm c'est ${texteEnCouleur(texNombrec(rapport[alea1]))} fois ${distanceCarte} cm <br>
Dans la réalité, ${distanceCarte} cm correspond à ${texteEnCouleur(distanceReel, 'blue')} km donc <br>` +
`  ${distanceCarte2} cm va correspondre à ${texteEnCouleur(texNombrec(rapport[alea1]))} fois ${texteEnCouleur(distanceReel, 'blue')} km  <br>` +
`${texteEnCouleur(texNombrec(rapport[alea1]))} $\\times$ ${texteEnCouleur(distanceReel, 'blue')} km = ${texNombrec(calcul(rapport[alea1] * distanceReel))} km <br>` +
texteEnCouleurEtGras(`Conclusion : le trajet de ${prenoms[0]} est de ${texNombrec(calcul(rapport[alea1] * distanceReel))} km.`, 'black') + '<br><br>'
  texte += `${numAlpha(1)} Deux villes sont distantes de ${texNombrec(distanceReelQ2)} km. <br>` +
'Quelle distance va-t-on mesurer sur la carte entre ces deux villes ?'
  texteCorr += `${numAlpha(1)} ${texNombrec(distanceReelQ2)} km c'est ${texteEnCouleur(texNombrec(rapport[alea2]))} fois ${distanceReel} km.
Or ${distanceReel} km est représenté par ${texteEnCouleur(distanceCarte, 'blue')} cm sur la carte. <br>` +
`Donc ${texNombrec(distanceReelQ2)} km est représenté par ${texteEnCouleur(texNombrec(rapport[alea2]))} fois ${texteEnCouleur(distanceCarte, 'blue')} cm sur la carte <br>` +
`${texteEnCouleur(texNombrec(rapport[alea2]))} $\\times$ ${texteEnCouleur(distanceCarte, 'blue')} cm = ${texNombrec(calcul(rapport[alea2] * distanceCarte))} cm <br>` +
texteEnCouleurEtGras(`Conclusion : Les deux villes sont séparées de ${texNombrec(calcul(rapport[alea2] * distanceCarte))} cm sur la carte.`, 'black') + '<br><br>'
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

function questionRecouvrirSurface () { // peinture, gazon, carrelage pour une surface donnée.
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
      qtt_matiere_unitaire: [25, 30, 50, 100],
      qtt_surface: [10, 20, 5]
    }
  ]
  const alea1 = randint(0, liste.length - 1)
  const alea2 = randint(0, liste[alea1].qtt_matiere_unitaire.length - 1)
  const alea3 = randint(0, liste[alea1].qtt_surface.length - 1)
  const rapport = [0.25, 0.5, 0.75, 1.25, 1.5, 2, 3, 4, 5] // choix parmi des rapports simples (en 6eme cela parrait suffisant)
  const quantite = liste[alea1].qtt_matiere_unitaire[alea2]
  const alea4 = randint(0, rapport.length - 1)
  const surfaceFinale = calcul(rapport[alea4] * liste[alea1].qtt_surface[alea3])
  const alea5 = randint(0, rapport.length - 1, [alea4])
  const quantite2 = calcul(rapport[alea5] * liste[alea1].qtt_matiere_unitaire[alea2])
  const alea6 = randint(-2, 2, [0])
  const surfaceFinale2 = calcul(rapport[alea5] * liste[alea1].qtt_surface[alea3] + alea6)
  const prenoms = [prenomF(), prenomM()]
  const qttaffichage = texNombrec(quantite) // Pour affichage avec virgule en séparateur.
  texte = `${numAlpha(0)} ${prenoms[0]} doit acheter ${liste[alea1].matiere}. <br>` +
`Sur la notice il est indiqué de prévoir ${qttaffichage} ${liste[alea1].unite} pour ${liste[alea1].qtt_surface[alea3]} m$^2$ <br> ` +
`Combien doit-elle en acheter pour une surface de ${texNombrec(surfaceFinale)} m$^2$ ? <br>`
  texteCorr = `${numAlpha(0)} ${texNombrec(surfaceFinale)} $m^2$ c'est ${texteEnCouleur(texNombrec(rapport[alea4]))} fois ${liste[alea1].qtt_surface[alea3]} $m^2$ <br>` +
`Il va donc falloir ${texteEnCouleur(texNombrec(rapport[alea4]))} fois ${texteEnCouleur(qttaffichage, 'blue')} ${liste[alea1].unite} pour ${texNombrec(surfaceFinale)} $m^2$ <br>` +
`${texteEnCouleur(texNombrec(rapport[alea4]))} $\\times$ ${texteEnCouleur(qttaffichage, 'blue')} ${liste[alea1].unite} = ${texNombrec(calcul(rapport[alea4] * quantite))} ${liste[alea1].unite}<br>` +
texteEnCouleurEtGras(`Conclusion : elle doit en acheter ${texteEnCouleur(texNombrec(rapport[alea4]))} $\\times$ ${texteEnCouleur(qttaffichage, 'blue')} ${liste[alea1].unite} = ${texNombrec(calcul(rapport[alea4] * quantite))} ${liste[alea1].unite}.`, 'black') + '<br>  '
  texte += `<br> ${numAlpha(1)} ${prenoms[1]} a acheté ${liste[alea1].matiere}. Il lui en reste ${texNombrec(quantite2)} ${liste[alea1].unite}. <br> Sur la notice il est indiqué de prévoir ${qttaffichage} ${liste[alea1].unite} pour ${texNombrec(liste[alea1].qtt_surface[alea3])} m$^2$ <br>` +
`En a-t-il suffisament pour la surface de ${texNombrec(surfaceFinale2)} m$^2$ qu'il lui reste à faire ? <br>`
  texteCorr += `<br> ${numAlpha(1)} ${texNombrec(quantite2)} ${liste[alea1].unite} c'est ${texteEnCouleur(texNombrec(rapport[alea5]))} fois ${qttaffichage} ${liste[alea1].unite}. <br>` +
`avec ${texNombrec(quantite2)} ${liste[alea1].unite} on peut donc traiter une surface de ${texteEnCouleur(texNombrec(rapport[alea5]))}
fois ${texteEnCouleur(texNombrec(liste[alea1].qtt_surface[alea3]), 'blue')} m$^2$ <br>` +
`${texteEnCouleur(texNombrec(rapport[alea5]))} $\\times$ ${texteEnCouleur(texNombrec(liste[alea1].qtt_surface[alea3]), 'blue')} m$^2$ = ${texNombrec(calcul(rapport[alea5] * liste[alea1].qtt_surface[alea3]))} m$^2$. <br>`
  if (calcul(rapport[alea5] * liste[alea1].qtt_surface[alea3]) > surfaceFinale2) {
    texteCorr += texteEnCouleurEtGras(`Conclusion : ${texNombrec(calcul(rapport[alea5] * liste[alea1].qtt_surface[alea3]))} m$^2$ > ${texNombrec(surfaceFinale2)} $m^2$ donc il a suffisament pour ${surfaceFinale2} m$^2$.`, 'black') + ' <br>'
  } else {
    texteCorr += texteEnCouleurEtGras(`Conclusion : ${texNombrec(calcul(rapport[alea5] * liste[alea1].qtt_surface[alea3]))} m$^2$ < ${texNombrec(surfaceFinale2)} $m^2$ donc il n'a pas assez pour ${surfaceFinale2} m$^2$.`, 'black') + ' <br>'
  }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}

// _______ Fin des fonctions correspondants aux situations problèmes _____

export default function ProportionnaliteParLinearite () {
  'use strict'
  let question
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Répondre aux questions posées en justifiant'
  context.isHtml ? (this.spacing = 2) : (this.spacing = 1)
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1)
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const listeIndexSituationsDisponible = [0, 1, 2, 3, 4, 5]
    const listeIndexSituations = combinaisonListes(
      listeIndexSituationsDisponible,
      this.nbQuestions
    ) // permet de ne pas avoir 2 fois la même situation si - de questions que de situations
    // boucle pour le nombre de question.
    // A chaque question on vérifie qu'elle n'existe pas déjà pour en refaire une. Sécurité : on ajoute un compteur pour eviter trop d'essais...
    let cpt = 0
    for (let i = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeIndexSituations[i]) {
        case 0:
          question = questionAchat()
          break
        case 1:
          question = questionRecette()
          break
        case 2:
          question = questionDillution()
          break
        case 3:
          question = questionDistance()
          break
        case 4:
          question = questionEchelle()
          break
        case 5:
          question = questionRecouvrirSurface()
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
