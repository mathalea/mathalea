import { choice, prenom, texFraction, arrondi, ecritureParentheseSiNegatif, nomDuMois, stringNombre, texNombre, texteGras, lampeMessage } from './outils.js'

function underbraceMediane (nbVal) {
  let sortie
  if (nbVal % 2 === 0) { // nb pair de valeurs
    sortie = `$\\underbrace{1^e\\hspace{0.25cm}2^e ... ${nbVal / 2 - 1}^e}_{${nbVal / 2 - 1}\\; valeurs} \\hspace{0.25cm} ${nbVal / 2}^e \\hspace{0.25cm} ${nbVal / 2 + 1}^e \\hspace{0.25cm} \\underbrace{${nbVal / 2 + 2}^e ... ${nbVal}^e}_{${nbVal / 2 - 1}\\; valeurs}$`
  } else { // nb impair de valeurs
    sortie = `$\\underbrace{1^e\\hspace{0.25cm}2^e ... ${(nbVal - 1) / 2}^e}_{${(nbVal - 1) / 2}\\; valeurs} \\hspace{0.25cm} ${(nbVal - 1) / 2 + 1}^e \\hspace{0.25cm} \\underbrace{${(nbVal - 1) / 2 + 2}^e ... ${nbVal}^e}_{${(nbVal - 1) / 2}\\; valeurs}$`
  }
  return sortie
}

function desTabEffCumul (tirages, effCumulBool, categories = [], lignes = ['Catégories', 'Scores', 'Nombres d\'apparitions']) {
  let sortie
  if (!effCumulBool) {
    sortie = ''
    if (tirages.length > 12) {
      sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 1/2
      for (let j = 0; j <= Math.round(tirages.length / 2); j++) { sortie += '|c' }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline ' + `\\text{${lignes[0]}} `
        for (let j = 0; j < Math.round(tirages.length / 2); j++) { sortie += '&\\text{' + categories[j] + '}' }
        sortie += '\\\\'
      }
      sortie += '\\hline  ' + `\\text{${lignes[1]}} `
      for (let j = 0; j < Math.round(tirages.length / 2); j++) { sortie += '&' + tirages[j][0] }
      sortie += '\\\\\\hline ' + `\\text{${lignes[2]}} `
      for (let j = 0; j < Math.round(tirages.length / 2); j++) { sortie += '&' + tirages[j][1] }
      sortie += '\\\\\\hline\\end{array}$<br><br>'

      sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 2/2
      for (let j = Math.round(tirages.length / 2); j <= tirages.length; j++) { sortie += '|c' }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline ' + `\\text{${lignes[0]}} `
        for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) { sortie += '&\\text{' + categories[j] + '}' }
        sortie += '\\\\'
      }
      sortie += '\\hline ' + `\\text{${lignes[1]}} `
      for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) { sortie += '&' + tirages[j][0] }
      sortie += '\\\\\\hline ' + `\\text{${lignes[2]}} `
      for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) { sortie += '&' + tirages[j][1] }
      sortie += '\\\\\\hline\\end{array}$'
    } else {
      sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs en un seul morceau
      for (let j = 0; j <= tirages.length; j++) { sortie += '|c' }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline  ' + `\\text{${lignes[0]}} `
        for (let j = 0; j < tirages.length; j++) { sortie += '&\\text{' + categories[j] + '}' }
        sortie += '\\\\'
      }
      sortie += '\\hline  ' + `\\text{${lignes[1]}} `
      for (let j = 0; j < tirages.length; j++) { sortie += '&' + tirages[j][0] }
      sortie += '\\\\\\hline ' + `\\text{${lignes[2]}} `
      for (let j = 0; j < tirages.length; j++) { sortie += '&' + tirages[j][1] }
      sortie += '\\\\\\hline\\end{array}$'
    };
  } else {
    sortie = ''
    if (tirages.length > 12) {
      sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 1/2
      for (let j = 0; j <= Math.round(tirages.length / 2); j++) { sortie += '|c' }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline ' + `\\text{${lignes[0]}} `
        for (let j = 0; j < Math.round(tirages.length / 2); j++) { sortie += '&\\text{' + categories[j] + '}' }
        sortie += '\\\\'
      }
      sortie += '\\hline  ' + `\\text{${lignes[1]}} `
      for (let j = 0; j < Math.round(tirages.length / 2); j++) { sortie += '&' + tirages[j][0] }
      sortie += '\\\\\\hline  ' + `\\text{${lignes[2]}} `
      for (let j = 0; j < Math.round(tirages.length / 2); j++) { sortie += '&' + tirages[j][1] }
      sortie += '\\\\\\hline \\text{Nombre d\'apparitions cumulées}'
      for (let j = 0; j < Math.round(tirages.length / 2); j++) {
        let cumul = 0
        for (let k = 0; k <= j; k++) {
          cumul += tirages[k][1]
        }
        sortie += '&' + cumul// tirages[j][1];
      }
      sortie += '\\\\\\hline\\end{array}$<br><br>'

      sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 2/2
      for (let j = Math.round(tirages.length / 2); j <= tirages.length; j++) { sortie += '|c' }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline ' + `\\text{${lignes[0]}} `
        for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) { sortie += '&\\text{' + categories[j] + '}' }
        sortie += '\\\\'
      }
      sortie += '\\hline  ' + `\\text{${lignes[1]}} `
      for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) { sortie += '&' + tirages[j][0] }
      sortie += '\\\\\\hline ' + `\\text{${lignes[2]}} `
      for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) { sortie += '&' + tirages[j][1] }
      sortie += '\\\\\\hline \\text{Nombre d\'apparitions cumulées}'
      for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) {
        let cumul = 0
        for (let k = 0; k <= j; k++) {
          cumul += tirages[k][1]
        }
        sortie += '&' + cumul// tirages[j][1];
      }
      sortie += '\\\\\\hline\\end{array}$'
    } else {
      sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs en un seul morceau
      for (let j = 0; j <= tirages.length; j++) { sortie += '|c' }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline ' + `\\text{${lignes[0]}} `
        for (let j = 0; j < tirages.length; j++) { sortie += '&\\text{' + categories[j] + '}' }
        sortie += '\\\\'
      }
      sortie += '\\hline  ' + `\\text{${lignes[1]}} `
      for (let j = 0; j < tirages.length; j++) { sortie += '&' + tirages[j][0] }
      sortie += '\\\\\\hline ' + `\\text{${lignes[2]}} `
      for (let j = 0; j < tirages.length; j++) { sortie += '&' + tirages[j][1] }
      sortie += '\\\\\\hline \\text{Nombre d\'apparitions cumulées}'
      for (let j = 0; j < tirages.length; j++) {
        let cumul = 0
        for (let k = 0; k <= j; k++) {
          cumul += tirages[k][1]
        }
        sortie += '&' + cumul// tirages[j][1];
      }
      sortie += '\\\\\\hline\\end{array}$'
    };
  };
  return sortie
}

function computeMoyenne (notes) {
  let somme = 0
  for (let j = 0; j < notes.length; j++) { somme += notes[j] }

  return [texFraction(somme, notes.length), somme]
}

function computeMediane (notes) {
  const notesRangees = notes.sort((a, b) => a - b)
  let mediane
  if (notes.length % 2 === 0) { // attention les indices commencent à 0 !
    notesRangees[notes.length / 2 - 1] === notesRangees[notes.length / 2] ? mediane = notesRangees[notes.length / 2 - 1] : mediane = [notesRangees[notes.length / 2 - 1], notesRangees[notes.length / 2]]
  } else {
    mediane = notesRangees[(notes.length - 1) / 2]
  }
  let medianeCorr // pour la correction statique
  Array.isArray(mediane) ? medianeCorr = (mediane[0] + mediane[1]) / 2 : medianeCorr = mediane
  return [mediane, medianeCorr]
}

function computeEtendue (notes) {
  let min = notes[0]
  let max = notes[0]
  for (let j = 1; j < notes.length; j++) { // On cherche la note minimum et la note maximum
    min = Math.min(notes[j], min)
    max = Math.max(notes[j], max)
  }
  return [min, max]
}

function computeMoyenneTirages2D (tirages) {
  let somme = 0
  let effectif = 0
  for (let k = 0; k < tirages.length; k++) {
    somme += tirages[k][0] * tirages[k][1]
    effectif += tirages[k][1]
  }
  return [texFraction(somme, effectif), somme, effectif]
}

function computeMedianeTirages2D (nombreTirages, tirages) {
  const scoresMedians = []
  let medianeCorr // pour la correction statique
  if (nombreTirages % 2 === 0) {
    // on récupère le score des deux lancers médians
    // compteur
    let cpt = 0
    // Pour cumuler les effectifs, tirages est un tableau 2D qui contient les couples [score,effectif]
    let effCumulCroiss = tirages[0][1]
    // On récupère le premier score médian
    while (effCumulCroiss < nombreTirages / 2) {
      cpt += 1
      effCumulCroiss += tirages[cpt][1]
    };
    scoresMedians.push(tirages[cpt][0])
    // On récupère le second score médian
    cpt = 0
    effCumulCroiss = tirages[0][1]
    while (effCumulCroiss < nombreTirages / 2 + 1) {
      cpt += 1
      effCumulCroiss += tirages[cpt][1]
    };
    scoresMedians.push(tirages[cpt][0])
    scoresMedians[0] === scoresMedians[1] ? medianeCorr = scoresMedians[0] : medianeCorr = (scoresMedians[0] + scoresMedians[1]) / 2
  } else { // Le nombre de lancers est impair ici
    // on récupère le score des deux lancers médians
    // compteur
    let cpt = 0
    // Pour cumuler les effectifs, tirages est un tableau 2D qui contient les couples [score,effectif]
    let effCumulCroiss = tirages[0][1]
    // On récupère le premier score médian
    while (effCumulCroiss <= nombreTirages / 2) {
      cpt += 1
      effCumulCroiss += tirages[cpt][1]
    };
    scoresMedians.push(tirages[cpt][0])
    medianeCorr = scoresMedians[0]
  }
  return [scoresMedians, medianeCorr]
}

function texteCorrMoyenneNotes (somme, nombreNotes, notes = 'notes') {
  let texteCorr = `La somme des ${notes} est : $${somme}$.<br> Il y a $${nombreNotes}$ ${notes}.<br>`
  texteCorr += 'Donc la moyenne est : ' + `$${texFraction(texNombre(somme), texNombre(nombreNotes))}$`
  if (arrondi(somme / nombreNotes, 2) === somme / nombreNotes) { // moyenne exacte
    texteCorr += `$=${texNombre(somme / nombreNotes, 2)}$<br>`
  } else { // moyenne arrondie
    texteCorr += ` $\\approx${texNombre(somme / nombreNotes, 2)}$`
  }
  return texteCorr
}

function texteCorrMedianeNotes (notes, medianeCorr) {
  let texteCorr = `Il y a $${notes.length}$ notes en tout. `
  if (notes.length % 2 === 0) {
    texteCorr += 'Le nombre de notes est pair.<br>'
  } else {
    texteCorr += 'Le nombre de notes est impair.<br>'
  };
  texteCorr += `Il faut par exemple ranger les notes dans l'ordre croissant : <br> $${notes[0]}$`
  for (let j = 1; j < notes.length - 1; j++) { texteCorr += `; $${notes[j]}$ ` } // On liste les notes (série brute)
  texteCorr += `et $${notes[notes.length - 1]}$.<br>`

  if (notes.length % 2 === 0) {
    texteCorr += `Les notes centrales sont la $${notes.length / 2}^{e}$ et la $${notes.length / 2 + 1}^{e}$.<br>
    En effet, ${underbraceMediane(notes.length)}<br>
    Une médiane est donc une note comprise entre la $${notes.length / 2}^{e}$ et la $${notes.length / 2 + 1}^{e}$ note, lorsque ces notes sont rangées.<br>`
  } else {
    texteCorr += `La note centrale est donc la $${(notes.length + 1) / 2}^{e}$.<br>
    En effet, ${underbraceMediane(notes.length)}<br>
    Une médiane est donc la $${(notes.length + 1) / 2}^{e}$ note, lorsque ces notes sont rangées.<br>`
  };
  texteCorr += `D'où ${texteGras(`la note médiane : ${stringNombre(medianeCorr)}`)}<br>`
  if (notes.length % 2 === 0) {
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Ìl y a bien $${notes.length / 2}$ notes inférieures ou égales à  $${texNombre(medianeCorr)}$ et $${notes.length / 2}$ notes supérieures ou égales à  $${texNombre(medianeCorr)}$.`,
      couleur: 'nombres'
    })
  } else {
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Ìl y a bien $${(notes.length - 1) / 2}$ notes inférieures ou égales à  $${texNombre(medianeCorr)}$ et $${(notes.length - 1) / 2}$ notes supérieures ou égales à  $${texNombre(medianeCorr)}$.`,
      couleur: 'nombres'
    })
  }
  return texteCorr
}

function texteCorrEtendueNotes (min, max, note = 'note') {
  const fem = [
    ['note', 'La note la plus basse', 'La note la plus haute'],
    ['lancer', 'Le résultat du lancer le plus faible', 'Le résultat du lancer le plus élevé'],
    ['température', 'La température la plus basse', 'La température la plus haute'],
    ['salaire', 'Le salaire le plus bas', 'Le salaire le plus haut']
  ]
  const notes = fem.find(el => el[0] === note)
  let texteCorr = `${notes[1]} est $${min}$.<br>${notes[2]} est $${max}$<br>`
  texteCorr += `Donc l'étendue de ces ${note}s est :  $${texNombre(max)}-${ecritureParentheseSiNegatif(min)}=${texNombre(max - min)}$`
  return texteCorr
}

function texteCorrMedianeTemperature (temperatures, medianeCorr) {
  let texteCorr = `Il y a $${temperatures.length}$ températures relevées en tout. `
  if (temperatures.length % 2 === 0) {
    texteCorr += 'Le nombre de températures est pair.<br>'
  } else {
    texteCorr += 'Le nombre de températures est impair.<br>'
  };
  texteCorr += `Il faut par exemple ranger les températures dans l'ordre croissant : <br> $${temperatures[0]}$`
  for (let j = 1; j < temperatures.length - 1; j++) { texteCorr += `; $${temperatures[j]}$ ` } // On liste les temperatures (série brute)
  texteCorr += `et $${temperatures[temperatures.length - 1]}$.<br>`
  if (temperatures.length % 2 === 0) {
    texteCorr += `Les températures centrales sont la $${temperatures.length / 2}^{e}$ et la $${temperatures.length / 2 + 1}^{e}$.<br>
    En effet, ${underbraceMediane(temperatures.length)}<br>
    Une médiane est donc une température comprise entre la $${temperatures.length / 2}^{e}$ et la $${temperatures.length / 2 + 1}^{e}$ temperature, lorsque ces températures sont rangées.<br>`
  } else {
    texteCorr += `La température centrale est donc la $${(temperatures.length + 1) / 2}^{e}$.<br>
    En effet, ${underbraceMediane(temperatures.length)}<br>
    Une médiane est donc la $${(temperatures.length + 1) / 2}^{e}$ température, lorsque ces températures sont rangées.<br>`
  };
  texteCorr += `D'où ${texteGras(`une température médiane : ${stringNombre(medianeCorr)}`)}<br>`
  if (temperatures.length % 2 === 0) {
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Ìl y a bien $${temperatures.length / 2}$ températures inférieures ou égales à  $${texNombre(medianeCorr)}$ et $${temperatures.length / 2}$ températures supérieures ou égales à  $${texNombre(medianeCorr)}$.`,
      couleur: 'nombres'
    })
  } else {
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Ìl y a bien $${(temperatures.length - 1) / 2}$ températures inférieures ou égales à  $${texNombre(medianeCorr)}$ et $${(temperatures.length - 1) / 2}$ temperatures supérieures ou égales à  $${texNombre(medianeCorr)}$.`,
      couleur: 'nombres'
    })
  }
  return texteCorr
}

function texteCorrMedianeTirages2DSalaires (nombreTirages, medianeCorr, salaires, categories) {
  let texteCorr = `Il y a $${nombreTirages}$ salariés dans l'entreprise.<br>`
  if (nombreTirages % 2 === 0) {
    texteCorr += `Ce nombre est pair, les salaires sont rangés dans l'ordre croissant.<br>
              Les deux valeurs centrales sont la $${nombreTirages / 2}^{e}$ et la $${nombreTirages / 2 + 1}^{e}$ valeur.<br>
              En effet, ${underbraceMediane(nombreTirages)} <br>
              Une médiane est donc un salaire compris entre le $${nombreTirages / 2}^{e}$ et le $${nombreTirages / 2 + 1}^{e}$ score.<br>
              On peut ajouter une ligne avec les effectifs cumulés pour trouver ces deux valeurs.<br><br>
              ${desTabEffCumul(salaires, true, categories, ['Catégories', 'Salaires en €', 'Effectif'])}<br><br>`
    texteCorr += `D'où ${texteGras(`le salaire médian : ${stringNombre(medianeCorr)}`)}<br>`
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Ìl y a bien $${(nombreTirages) / 2}$ salaires dont la valeure est inférieure ou égale à  $${texNombre(medianeCorr)}$ et $${(nombreTirages) / 2}$ salaires dont la valeur est supérieure ou égale à  $${texNombre(medianeCorr)}$.`,
      couleur: 'nombres'
    })
  } else { // Le nombre de lancers est impair ici
    texteCorr += `Ce nombre est impair, les salaires sont rangés dans l'ordre croissant.<br>
                  La valeur centrale est la $${(nombreTirages - 1) / 2 + 1}^{e}$ valeur.<br>
                  En effet, ${underbraceMediane(nombreTirages)} <br>
                  Une médiane est donc le $${(nombreTirages - 1) / 2 + 1}^{e}$ salaire.<br>
                  On peut ajouter une ligne avec les effectifs cumulés pour trouver cette valeur.<br><br>
                  ${desTabEffCumul(salaires, true, categories, ['Catégories', 'Salaires en €', 'Effectif'])}<br><br>`
    texteCorr += `D'où ${texteGras(`le salaire médian : ${stringNombre(medianeCorr)}`)}<br>`
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Ìl y a bien $${(nombreTirages - 1) / 2}$ salaires dont la valeure est inférieure ou égale à  $${texNombre(medianeCorr)}$ et $${(nombreTirages - 1) / 2}$ salaires dont la valeur est supérieure ou égale à  $${texNombre(medianeCorr)}$.`,
      couleur: 'nombres'
    })
  }
  return texteCorr
}

function texteCorrMedianeTirages2D (nombreTirages, medianeCorr, tirages) {
  let texteCorr = `On a réalisé $${nombreTirages}$ lancers en tout.<br>`
  if (nombreTirages % 2 === 0) {
    texteCorr += `Le nombre de lancers est pair, les scores sont rangés dans l'ordre croissant.<br>
              Les deux valeurs centrales sont la $${nombreTirages / 2}^{e}$ et la $${nombreTirages / 2 + 1}^{e}$ valeur.<br>
              En effet, ${underbraceMediane(nombreTirages)} <br>
              Une médiane est donc un score compris entre le $${nombreTirages / 2}^{e}$ et le $${nombreTirages / 2 + 1}^{e}$ score.<br>
              On peut ajouter une ligne avec les effectifs cumulés pour trouver ces deux valeurs.<br><br>
              ${desTabEffCumul(tirages, true)}<br><br>`
    texteCorr += `D'où ${texteGras(`le score médian : ${stringNombre(medianeCorr)}`)}<br>`
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Ìl y a bien $${(nombreTirages) / 2}$ lancers dont le score est inférieur ou égal à  $${texNombre(medianeCorr)}$ et $${(nombreTirages) / 2}$ lancers dont le score est supérieur ou égal à  $${texNombre(medianeCorr)}$.`,
      couleur: 'nombres'
    })
  } else { // Le nombre de lancers est impair ici
    texteCorr += `Le nombre de lancers est impair, les scores sont rangés dans l'ordre croissant.<br>
                  La valeur centrale est la $${(nombreTirages - 1) / 2 + 1}^{e}$ valeur.<br>
                  En effet, ${underbraceMediane(nombreTirages)} <br>
                  Une médiane est donc le $${(nombreTirages - 1) / 2 + 1}^{e}$ score.<br>
                  On peut ajouter une ligne avec les effectifs cumulés pour trouver cette valeur.<br><br>
                  ${desTabEffCumul(tirages, true)}<br><br>`
    texteCorr += `D'où ${texteGras(`le score médian : ${stringNombre(medianeCorr)}`)}<br>`
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Ìl y a bien $${(nombreTirages - 1) / 2}$ lancers dont le score est inférieur ou égal à  $${texNombre(medianeCorr)}$ et $${(nombreTirages - 1) / 2}$ lancers dont le score est supérieur ou égal à  $${texNombre(medianeCorr)}$.`,
      couleur: 'nombres'
    })
  }
  return texteCorr
}

function texteNotes (notes) {
  let texte = `${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`
  texte += `$${notes[0]}$`
  for (let j = 1; j < notes.length - 1; j++) { texte += `; $${notes[j]}$ ` } // On liste les notes (série brute)
  texte += `et $${notes[notes.length - 1]}$.`
  return texte
}

function texteTemperatures (annee, mois, temperatures) {
  let texte = `En ${nomDuMois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, on a relevé les températures suivantes<br>`
  texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // On construit le tableau des températures
  texte += '|c'
  for (let j = 0; j < Math.round(temperatures.length / 2); j++) { texte += '|c' }
  texte += '}\\hline  \\text{Jour}'
  for (let j = 0; j < Math.round(temperatures.length / 2); j++) { texte += '&' + texNombre(j + 1) }
  texte += '\\\\\\hline \\text{Température en}  ^\\circ\\text{C}'
  for (let j = 0; j < Math.round(temperatures.length / 2); j++) { texte += '&' + temperatures[j] }
  texte += '\\\\\\hline\\end{array}$<br><br>'
  texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // On construit le tableau des températures
  texte += '|c'
  for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { texte += '|c' }
  texte += '}\\hline  \\text{Jour}'
  for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { texte += '&' + texNombre(j + 1) }
  texte += '\\\\\\hline \\text{Température en}  ^\\circ\\text{C}'
  for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) { texte += '&' + temperatures[j] }
  texte += '\\\\\\hline\\end{array}$'
  return texte
}

function texteSalaires (salaires, categories) {
  let texte = 'La grille des salaires des employés d\'une PME est données par le tableau ci-dessous :<br> '
  texte += desTabEffCumul(salaires, false, categories, ['Catégories', 'Salaires en €', 'Effectif'])
  return texte
}

function texteTirages2D (nombreDes, nombreTirages, nombreFaces, tirages) {
  let texte = ''
  if (nombreDes > 1) {
    texte = `On a réalisé $${nombreTirages}$ lancers de $${nombreDes}$ dés à $${nombreFaces}$ faces.<br>
            On a relevé la somme des $${nombreDes}$ dés.<br>`
  } else {
    texte = `On a réalisé $${nombreTirages}$ lancers d'un dé à $${nombreFaces}$ faces.<br>`
  }
  texte += lampeMessage({
    titre: 'Vocabulaire',
    texte: `Le solide qui correspond à ce type de dé s'appelle ${texteGras(solidName(nombreFaces))}.`,
    couleur: 'nombres'
  }) + '<br>'
  texte += 'Les résultats sont inscrits dans le tableau ci-dessous :<br><br>'
  texte += desTabEffCumul(tirages, false) + '<br>'
  return texte
}

function solidName (nbCot) {
  switch (nbCot) {
    case 4:
      return 'tétraèdre'
    case 6:
      return 'hexaèdre'
    case 8:
      return 'octaèdre'
    case 10:
      return 'decaèdre'
    default:
      return 'cas non prévu'
  }
}

export const OutilsStats = {
  desTabEffCumul,
  // consigne
  texteNotes,
  texteTirages2D,
  texteSalaires,
  texteTemperatures,
  // correction
  texteCorrMoyenneNotes,
  texteCorrMedianeTirages2D,
  texteCorrMedianeTirages2DSalaires,
  texteCorrMedianeTemperature,
  texteCorrMedianeNotes,
  texteCorrEtendueNotes,
  // calcul
  computeEtendue,
  computeMoyenne,
  computeMediane,
  computeMoyenneTirages2D,
  computeMedianeTirages2D
}
