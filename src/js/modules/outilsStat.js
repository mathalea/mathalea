import {
  arrondi,
  choice,
  ecritureParentheseSiNegatif,
  lampeMessage,
  nomDuMois,
  prenom,
  stringNombre,
  texFraction,
  texNombre,
  texteGras
} from './outils.js'

function underbraceMediane (nbVal) {
  let sortie
  if (nbVal % 2 === 0) { // nb pair de valeurs
    sortie = `$\\underbrace{1^e\\hspace{0.25cm}2^e ... ${nbVal / 2 - 1}^e}_{${nbVal / 2 - 1}\\; valeurs} \\hspace{0.25cm} ${nbVal / 2}^e \\hspace{0.25cm} ${nbVal / 2 + 1}^e \\hspace{0.25cm} \\underbrace{${nbVal / 2 + 2}^e ... ${nbVal}^e}_{${nbVal / 2 - 1}\\; valeurs}$`
  } else { // nb impair de valeurs
    sortie = `$\\underbrace{1^e\\hspace{0.25cm}2^e ... ${(nbVal - 1) / 2}^e}_{${(nbVal - 1) / 2}\\; valeurs} \\hspace{0.25cm} ${(nbVal - 1) / 2 + 1}^e \\hspace{0.25cm} \\underbrace{${(nbVal - 1) / 2 + 2}^e ... ${nbVal}^e}_{${(nbVal - 1) / 2}\\; valeurs}$`
  }
  return sortie
}

function desTabEffCumul (tirages, effCumulBool, categories = [], lignes = ['Catégories', 'Scores', 'Nombre d\'apparitions', 'Nombre d\'apparitions cumulées']) {
  let sortie
  if (!effCumulBool) {
    sortie = ''
    if (tirages.length > 12) {
      sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 1/2
      for (let j = 0; j <= Math.round(tirages.length / 2); j++) {
        sortie += '|c'
      }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline ' + `\\text{${lignes[0]}} `
        for (let j = 0; j < Math.round(tirages.length / 2); j++) {
          sortie += '&\\text{' + categories[j] + '}'
        }
        sortie += '\\\\'
      }
      sortie += '\\hline  ' + `\\text{${lignes[1]}} `
      for (let j = 0; j < Math.round(tirages.length / 2); j++) {
        sortie += '&' + tirages[j][0]
      }
      sortie += '\\\\\\hline ' + `\\text{${lignes[2]}} `
      for (let j = 0; j < Math.round(tirages.length / 2); j++) {
        sortie += '&' + tirages[j][1]
      }
      sortie += '\\\\\\hline\\end{array}$<br><br>'

      sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 2/2
      for (let j = Math.round(tirages.length / 2); j <= tirages.length; j++) {
        sortie += '|c'
      }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline ' + `\\text{${lignes[0]}} `
        for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) {
          sortie += '&\\text{' + categories[j] + '}'
        }
        sortie += '\\\\'
      }
      sortie += '\\hline ' + `\\text{${lignes[1]}} `
      for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) {
        sortie += '&' + tirages[j][0]
      }
      sortie += '\\\\\\hline ' + `\\text{${lignes[2]}} `
      for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) {
        sortie += '&' + tirages[j][1]
      }
      sortie += '\\\\\\hline\\end{array}$'
    } else {
      sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs en un seul morceau
      for (let j = 0; j <= tirages.length; j++) {
        sortie += '|c'
      }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline  ' + `\\text{${lignes[0]}} `
        for (let j = 0; j < tirages.length; j++) {
          sortie += '&\\text{' + categories[j] + '}'
        }
        sortie += '\\\\'
      }
      sortie += '\\hline  ' + `\\text{${lignes[1]}} `
      for (let j = 0; j < tirages.length; j++) {
        sortie += '&' + tirages[j][0]
      }
      sortie += '\\\\\\hline ' + `\\text{${lignes[2]}} `
      for (let j = 0; j < tirages.length; j++) {
        sortie += '&' + tirages[j][1]
      }
      sortie += '\\\\\\hline\\end{array}$'
    }
  } else {
    sortie = ''
    if (tirages.length > 12) {
      sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 1/2
      for (let j = 0; j <= Math.round(tirages.length / 2); j++) {
        sortie += '|c'
      }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline ' + `\\text{${lignes[0]}} `
        for (let j = 0; j < Math.round(tirages.length / 2); j++) {
          sortie += '&\\text{' + categories[j] + '}'
        }
        sortie += '\\\\'
      }
      sortie += '\\hline  ' + `\\text{${lignes[1]}} `
      for (let j = 0; j < Math.round(tirages.length / 2); j++) {
        sortie += '&' + tirages[j][0]
      }
      sortie += '\\\\\\hline  ' + `\\text{${lignes[2]}} `
      for (let j = 0; j < Math.round(tirages.length / 2); j++) {
        sortie += '&' + tirages[j][1]
      }
      sortie += '\\\\\\hline ' + `\\text{${lignes[3]}} `
      for (let j = 0; j < Math.round(tirages.length / 2); j++) {
        let cumul = 0
        for (let k = 0; k <= j; k++) {
          cumul += tirages[k][1]
        }
        sortie += '&' + cumul// tirages[j][1];
      }
      sortie += '\\\\\\hline\\end{array}$<br><br>'

      sortie += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // construction du tableau des effectifs 2/2
      for (let j = Math.round(tirages.length / 2); j <= tirages.length; j++) {
        sortie += '|c'
      }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline ' + `\\text{${lignes[0]}} `
        for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) {
          sortie += '&\\text{' + categories[j] + '}'
        }
        sortie += '\\\\'
      }
      sortie += '\\hline  ' + `\\text{${lignes[1]}} `
      for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) {
        sortie += '&' + tirages[j][0]
      }
      sortie += '\\\\\\hline ' + `\\text{${lignes[2]}} `
      for (let j = Math.round(tirages.length / 2); j < tirages.length; j++) {
        sortie += '&' + tirages[j][1]
      }
      sortie += '\\\\\\hline ' + `\\text{${lignes[3]}} `
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
      for (let j = 0; j <= tirages.length; j++) {
        sortie += '|c'
      }
      sortie += '}'
      if (categories.length > 0) {
        sortie += '\\hline ' + `\\text{${lignes[0]}} `
        for (let j = 0; j < tirages.length; j++) {
          sortie += '&\\text{' + categories[j] + '}'
        }
        sortie += '\\\\'
      }
      sortie += '\\hline  ' + `\\text{${lignes[1]}} `
      for (let j = 0; j < tirages.length; j++) {
        sortie += '&' + tirages[j][0]
      }
      sortie += '\\\\\\hline ' + `\\text{${lignes[2]}} `
      for (let j = 0; j < tirages.length; j++) {
        sortie += '&' + tirages[j][1]
      }
      sortie += '\\\\\\hline ' + `\\text{${lignes[3]}} `
      for (let j = 0; j < tirages.length; j++) {
        let cumul = 0
        for (let k = 0; k <= j; k++) {
          cumul += tirages[k][1]
        }
        sortie += '&' + cumul// tirages[j][1];
      }
      sortie += '\\\\\\hline\\end{array}$'
    }
  }

  return sortie
}

function computeMoyenne (notes) {
  let somme = 0
  for (let j = 0; j < notes.length; j++) {
    somme += notes[j]
  }

  return [texFraction(somme, notes.length), somme]
}

function computeMediane (notes) {
  const notesRangees = notes.sort((a, b) => a - b)
  let mediane
  if (notes.length % 2 === 0) { // attention les indices commencent à 0 !
    mediane = [notesRangees[notes.length / 2 - 1], notesRangees[notes.length / 2]]
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
    }

    scoresMedians.push(tirages[cpt][0])
    // On récupère le second score médian
    cpt = 0
    effCumulCroiss = tirages[0][1]
    while (effCumulCroiss < nombreTirages / 2 + 1) {
      cpt += 1
      effCumulCroiss += tirages[cpt][1]
    }

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
    }

    scoresMedians.push(tirages[cpt][0])
    medianeCorr = scoresMedians[0]
  }
  return [scoresMedians, medianeCorr]
}

function texteCorrMoyenneNotes (notesSeries, somme, nombreNotes, notes = 'notes') {
  const data = [
    ['notes', 'la moyenne des notes', ''],
    ['lancers', 'la moyenne des lancers', ''],
    ['températures', 'la moyenne des températures', ' $\\mathbf{^\\circ\\text{C}}$'],
    ['salaires', 'le salaire moyen', ' €'],
    ['pointures', 'la pointure moyenne', '']
  ]

  const noteStr = data.find(el => el[0] === notes) || ['', '', '']

  let texteCorr = ''
  if (notesSeries !== undefined && notesSeries instanceof Array && notesSeries.length > 0 && notesSeries[0] instanceof Array && notesSeries[0].length > 0) {
    // tableau à deux entrées
    texteCorr += '$\\text{Moyenne} = '
    texteCorr += `\\dfrac{${notesSeries[0][0]} \\times ${notesSeries[0][1]}`
    let eff = `${notesSeries[0][1]}`
    for (let j = 1; j < notesSeries.length; j++) {
      if (notesSeries.length < 10) {
        texteCorr += `+ ${notesSeries[j][0]} \\times ${notesSeries[j][1]}`
        eff += `+ ${notesSeries[j][1]}`
      } else {
        if (j < 3) texteCorr += `+ ${notesSeries[j][0]} \\times ${notesSeries[j][1]}`
        if (j < 3) eff += `+ ${notesSeries[j][1]}`
        if (j === 3) texteCorr += '+ \\ldots '
        if (j === 3) eff += '+ \\ldots '
        if (j + 3 >= notesSeries.length) texteCorr += `+ ${notesSeries[j][0]} \\times ${notesSeries[j][1]}`
        if (j + 3 >= notesSeries.length) eff += `+ ${notesSeries[j][1]}`
      }
    }
    texteCorr += `}{${eff}}=\\dfrac{${texNombre(somme, 0)}}{${texNombre(nombreNotes, 0)}}$. <br>`
  } else {
    // tableau à une entrée
    texteCorr += '$\\text{Moyenne} = '
    texteCorr += `\\dfrac{${notesSeries[0]} `
    for (let j = 1; j < notesSeries.length; j++) {
      if (notesSeries.length < 10) {
        texteCorr += `+ ${notesSeries[j]}`
      } else {
        if (j < 3) texteCorr += `+ ${notesSeries[j]}`
        if (j === 3) texteCorr += '+ \\ldots '
        if (j + 3 >= notesSeries.length) texteCorr += `+ ${notesSeries[j]}`
      }
    }
    texteCorr += `}{${notesSeries.length}}=\\dfrac{${texNombre(somme, 0)}}{${texNombre(nombreNotes, 0)}}$. <br>`
  }
  texteCorr += `La somme des ${notes} est : $${texNombre(somme, 0)}$.<br> Il y a $${texNombre(nombreNotes, 0)}$ ${notes}.<br>`
  texteCorr += `Donc ${texteGras(`${noteStr[1]} est `)} $\\mathbf{${texFraction(texNombre(somme, 0), texNombre(nombreNotes, 0))}`
  if (arrondi(somme / nombreNotes, 1) === somme / nombreNotes) { // moyenne exacte
    texteCorr += `=${texNombre(somme / nombreNotes, 1)}}$${noteStr[2]}.<br>`
  } else { // moyenne arrondie
    texteCorr += ` \\approx${texNombre(somme / nombreNotes, 1)}}$${noteStr[2]}.<br>`
  }
  return texteCorr
}

function texteCorrEtendueNotes (min, max, note = 'note') {
  const data = [
    ['note', 'La note la plus basse', 'La note la plus haute', ''],
    ['lancer', 'Le résultat du lancer le plus faible', 'Le résultat du lancer le plus élevé', ''],
    ['température', 'La température la plus basse', 'La température la plus haute', ' $\\mathbf{^\\circ\\text{C}}$'],
    ['salaire', 'Le salaire le plus bas', 'Le salaire le plus haut', ' €'],
    ['pointure', 'La pointure la plus basse', 'La pointure la plus haute', '']
  ]
  const notes = data.find(el => el[0] === note) || ['', '', '', '']
  let texteCorr = `${notes[1]} est $${min}$${notes[3]}.<br>${notes[2]} est $${max}$${notes[3]}.<br>`
  texteCorr += `Donc ${texteGras(`l'étendue des ${note}s est  $\\mathbf{${texNombre(max, 1)}-${ecritureParentheseSiNegatif(min)}=${texNombre(max - min, 1)}}$ ${notes[3]}`)}.`
  return texteCorr
}

function texteCorrMedianeTemperatures (temperatures, medianeCorr, scoresMedians) {
  return texteCorrMedianeNotes(temperatures, medianeCorr, scoresMedians, 'température')
}

function texteCorrMedianeNotes (notes, medianeCorr, scoresMedians, note = 'note') {
  const data = [
    ['note', '', '', ''],
    ['température', ' $\\mathbf{^\\circ\\text{C}}$', '', '']
  ]
  const noteStr = data.find(el => el[0] === note) || ['', '', '', '']
  let texteCorr = `Au total, il y a $${notes.length}$ ${noteStr[0]}s. `
  if (notes.length % 2 === 0) {
    texteCorr += `Le nombre de ${noteStr[0]}s est pair.<br>`
  } else {
    texteCorr += `Le nombre de ${noteStr[0]}s est impair.<br>`
  }

  texteCorr += `Les ${noteStr[0]}s sont rangées dans l'ordre croissant : <br> $${notes[0]}$`
  for (let j = 1; j < notes.length - 1; j++) {
    if (notes.length < 10) {
      texteCorr += `; $${notes[j]}$ `
    } else {
      if (j < 2) texteCorr += `; $${notes[j]}$ `
      if (j === 2) texteCorr += '; $\\dots$ '
      if (notes.length % 2 === 0 && j === notes.length / 2 - 2) texteCorr += `; $${notes[j]}$ `
      if (notes.length % 2 === 0 && j === notes.length / 2 - 1) texteCorr += `; $${notes[j]}$ `
      if (notes.length % 2 === 0 && j === notes.length / 2) texteCorr += `; $${notes[j]}$ `
      if (notes.length % 2 === 0 && j === notes.length / 2 + 1) texteCorr += `; $${notes[j]}$ `
      if (notes.length % 2 === 0 && j === notes.length / 2 + 2) texteCorr += '; $\\dots$ '
      if (notes.length % 2 === 1 && j === (notes.length - 1) / 2 - 1) texteCorr += `; $${notes[j]}$ `
      if (notes.length % 2 === 1 && j === (notes.length - 1) / 2) texteCorr += `; $${notes[j]}$ `
      if (notes.length % 2 === 1 && j === (notes.length - 1) / 2 + 1) texteCorr += `; $${notes[j]}$ `
      if (notes.length % 2 === 1 && j === (notes.length - 1) / 2 + 1) texteCorr += '; $\\dots$ '
      if (j + 2 > notes.length - 1) texteCorr += `; $${notes[j]}$ `
    }
  }
  texteCorr += `et $${notes[notes.length - 1]}$.<br>`

  if (notes.length % 2 === 0) {
    texteCorr += `Les valeurs centrales sont la $${notes.length / 2}^{e}$ valeur et la $${notes.length / 2 + 1}^{e}$ valeur.<br>
    En effet, ${underbraceMediane(notes.length)}<br>
    Une médiane peut être la demi-somme des deux valeurs centrales. <br>
    La $${notes.length / 2}^{e}$ valeur est $${scoresMedians[0]}$ et la $${notes.length / 2 + 1}^{e}$ valeur est $${scoresMedians[1]}$.<br>`
  } else {
    texteCorr += `La valeur centrale est donc la $${(notes.length + 1) / 2}^{e}$ valeur.<br>
    En effet, ${underbraceMediane(notes.length)}<br>
    La médiane est donc la $${(notes.length + 1) / 2}^{e}$ ${noteStr[0]}.<br>`
  }

  texteCorr += `D'où ${texteGras(`la médiane des ${noteStr[0]}s est ${scoresMedians[0] === scoresMedians[1] ? '' : `$\\mathbf{(${scoresMedians[0]} + ${scoresMedians[1]}) \\div 2=}$`} ${stringNombre(medianeCorr)}${noteStr[1]}`)}.<br>`
  if (notes.length % 2 === 0) {
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Il y a bien $${notes.length / 2}$ ${noteStr[0]}s inférieures ou égales à  $${texNombre(medianeCorr, 1)}$ et $${notes.length / 2}$ ${noteStr[0]}s supérieures ou égales à  $${texNombre(medianeCorr, 1)}$.`,
      couleur: 'nombres'
    })
  } else {
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Il y a bien $${(notes.length - 1) / 2}$ ${noteStr[0]}s inférieures ou égales à  $${texNombre(medianeCorr, 1)}$ et $${(notes.length - 1) / 2}$ ${noteStr[0]}s supérieures ou égales à  $${texNombre(medianeCorr, 1)}$.`,
      couleur: 'nombres'
    })
  }
  return texteCorr
}

function texteCorrMedianeTirages2DSalaires (nombreTirages, medianeCorr, scoresMedians, salaires, categories, salaire = 'salaire') {
  const data = [
    ['note', 'F', 'la médiane des notes', '', `Le nombre de notes est $${nombreTirages}$.`, ['', 'Note', 'Coefficient (Effectif)', 'Effectifs cumulés']],
    ['salaire', 'M', 'le salaire médian', ' €', `Dans l'entreprise, le nombre de salariés est $${nombreTirages}$.`, ['Catégories', 'Salaires en €', 'Effectif', 'Effectifs cumulés']],
    ['pointure', 'M', 'la pointure médiane', '', `Le nombre de pointures relevées est $${nombreTirages}$.`, ['', 'Pointure', 'Effectif', 'Effectifs cumulés']]
  ]
  const salairesStr = data.find(el => el[0] === salaire) || ['', '', '', '', '', '']

  let texteCorr = salairesStr[4] + '<br>'
  if (nombreTirages % 2 === 0) {
    texteCorr += `Ce nombre est pair, les ${salairesStr[0]}s sont rangé${salairesStr[0] === 'M' ? '' : 'e'}s dans l'ordre croissant.<br>
              Les deux valeurs centrales sont la $${nombreTirages / 2}^{e}$ valeur et la $${nombreTirages / 2 + 1}^{e}$ valeur.<br>
              En effet, ${underbraceMediane(nombreTirages)} <br>
              Une médiane peut être la demi-somme des deux valeurs centrales. <br>
              On peut ajouter une ligne avec les effectifs cumulés pour trouver ces deux valeurs.<br><br>
              ${desTabEffCumul(salaires, true, categories, salairesStr[5])}<br><br>
              La $${nombreTirages / 2}^{e}$ valeur est $${scoresMedians[0]}$ et la $${nombreTirages / 2 + 1}^{e}$ valeur est $${scoresMedians[1]}$.<br>`
    texteCorr += `D'où ${texteGras(`${salairesStr[2]} est ${scoresMedians[0] === scoresMedians[1] ? '' : `$(${scoresMedians[0]} + ${scoresMedians[1]}) \\div 2=$`} ${stringNombre(medianeCorr)}`)}${salairesStr[3]}.<br>`
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Il y a bien $${(nombreTirages) / 2}$ ${salairesStr[0]}s dont la valeur est inférieure ou égale à  $${texNombre(medianeCorr, 1)}$${salairesStr[3]} et $${(nombreTirages) / 2}$ ${salairesStr[0]}s dont la valeur est supérieure ou égale à  $${texNombre(medianeCorr, 1)}$${salairesStr[3]}.`,
      couleur: 'nombres'
    })
  } else { // Le nombre de tirages est impair
    texteCorr += `Ce nombre est impair, les ${salairesStr[0]}s sont rangé${salairesStr[0] === 'M' ? '' : 'e'}s dans l'ordre croissant.<br>
                  La valeur centrale est la $${(nombreTirages - 1) / 2 + 1}^{e}$ valeur.<br>
                  En effet, ${underbraceMediane(nombreTirages)} <br>
                  La médiane est donc la $${(nombreTirages - 1) / 2 + 1}^{e}$ valeur.<br>
                  On peut ajouter une ligne avec les effectifs cumulés pour trouver cette valeur.<br><br>
                  ${desTabEffCumul(salaires, true, categories, salairesStr[5])}<br><br>`
    texteCorr += `D'où ${texteGras(`${salairesStr[2]} est ${stringNombre(medianeCorr)}`)}${salairesStr[3]}.<br>`
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Il y a bien $${(nombreTirages - 1) / 2}$ ${salairesStr[0]}s dont la valeur est inférieure ou égale à  $${texNombre(medianeCorr, 1)}$${salairesStr[3]} et $${(nombreTirages - 1) / 2}$ ${salairesStr[0]}s dont la valeur est supérieure ou égale à  $${texNombre(medianeCorr, 1)}$${salairesStr[3]}.`,
      couleur: 'nombres'
    })
  }
  return texteCorr
}

function texteCorrMedianeTirages2D (nombreTirages, medianeCorr, scoresMedians, tirages) {
  let texteCorr = `Au total, $${nombreTirages}$ lancers ont été réalisés.<br>`
  if (nombreTirages % 2 === 0) {
    texteCorr += `Le nombre de lancers est pair, les scores sont rangés dans l'ordre croissant.<br>
              Les deux valeurs centrales sont la $${nombreTirages / 2}^{e}$ et la $${nombreTirages / 2 + 1}^{e}$ valeur.<br>
              En effet, ${underbraceMediane(nombreTirages)} <br>
              Une médiane peut être la demi-somme des deux valeurs centrales. <br>
              On peut ajouter une ligne avec les effectifs cumulés pour trouver ces deux valeurs.<br><br>
              ${desTabEffCumul(tirages, true)}<br><br>
              La $${nombreTirages / 2}^{e}$ valeur est $${scoresMedians[0]}$ et la $${nombreTirages / 2 + 1}^{e}$ valeur est $${scoresMedians[1]}$.<br>`
    texteCorr += `D'où ${texteGras(`le score médian est ${scoresMedians[0] === scoresMedians[1] ? '' : `$(${scoresMedians[0]} + ${scoresMedians[1]}) \\div 2=$`} ${stringNombre(medianeCorr)}`)}.<br>`
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Il y a bien $${(nombreTirages) / 2}$ lancers dont le score est inférieur ou égal à  $${texNombre(medianeCorr, 1)}$ et $${(nombreTirages) / 2}$ lancers dont le score est supérieur ou égal à  $${texNombre(medianeCorr, 1)}$.`,
      couleur: 'nombres'
    })
  } else { // Le nombre de lancers est impair ici
    texteCorr += `Le nombre de lancers est impair, les scores sont rangés dans l'ordre croissant.<br>
                  La valeur centrale est la $${(nombreTirages - 1) / 2 + 1}^{e}$ valeur.<br>
                  En effet, ${underbraceMediane(nombreTirages)} <br>
                  La médiane est donc le $${(nombreTirages - 1) / 2 + 1}^{e}$ lancer.<br>
                  On peut ajouter une ligne avec les effectifs cumulés pour trouver cette valeur.<br><br>
                  ${desTabEffCumul(tirages, true)}<br><br>`
    texteCorr += `D'où ${texteGras(`le score médian est ${stringNombre(medianeCorr)}`)}.<br>`
    texteCorr += lampeMessage({
      titre: 'Interprétation',
      texte: `Il y a bien $${(nombreTirages - 1) / 2}$ lancers dont le score est inférieur ou égal à  $${texNombre(medianeCorr, 1)}$ et $${(nombreTirages - 1) / 2}$ lancers dont le score est supérieur ou égal à  $${texNombre(medianeCorr, 1)}$.`,
      couleur: 'nombres'
    })
  }
  return texteCorr
}

function texteNotes (notes) {
  let texte = `${prenom()} a obtenu ces notes ce trimestre-ci en mathématiques :<br>`
  texte += `$${notes[0]}$`
  for (let j = 1; j < notes.length - 1; j++) {
    texte += `; $${notes[j]}$ `
  } // On liste les notes (série brute)
  texte += `et $${notes[notes.length - 1]}$.`
  return texte
}

function texteTemperatures (annee, mois, temperatures) {
  let texte = `En ${nomDuMois(mois)} ${annee}, à ${choice(['Moscou', 'Berlin', 'Paris', 'Bruxelles', 'Rome', 'Belgrade'])}, on a relevé les températures suivantes : <br>`
  texte += '<br>$\\def\\arraystretch{1.5}\\begin{array}{|c' // On construit le tableau des températures
  texte += '|c'
  for (let j = 0; j < Math.round(temperatures.length / 2); j++) {
    texte += '|c'
  }
  texte += '}\\hline  \\text{Jour}'
  for (let j = 0; j < Math.round(temperatures.length / 2); j++) {
    texte += '&' + texNombre(j + 1, 1)
  }
  texte += '\\\\\\hline \\text{Température en}  ^\\circ\\text{C}'
  for (let j = 0; j < Math.round(temperatures.length / 2); j++) {
    texte += '&' + temperatures[j]
  }
  texte += '\\\\\\hline\\end{array}$<br><br>'
  texte += '$\\def\\arraystretch{1.5}\\begin{array}{|c' // On construit le tableau des températures
  texte += '|c'
  for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) {
    texte += '|c'
  }
  texte += '}\\hline  \\text{Jour}'
  for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) {
    texte += '&' + texNombre(j + 1, 1)
  }
  texte += '\\\\\\hline \\text{Température en}  ^\\circ\\text{C}'
  for (let j = Math.round(temperatures.length / 2); j < temperatures.length; j++) {
    texte += '&' + temperatures[j]
  }
  texte += '\\\\\\hline\\end{array}$'
  texte += '<br>'
  return texte
}

function texteSalaires (salaires, categoriesCol, salaire = 'salaires') {
  const data = [
    ['salaires', 'La grille des salaires des employés d\'une PME est donnée par le tableau ci-dessous', ['Catégories', 'Salaires en €', 'Effectif']],
    ['notes', `Voici les notes obtenues par ${prenom()} en mathématiques cette année`, ['', 'Note', 'Effectif']],
    ['pointures', `Pour passer une commande de chaussures de foot, ${prenom()} a noté les pointures des membres de son club dans un tableau`, ['', 'Pointure', 'Effectif']]
  ]
  const salairesStr = data.find(el => el[0] === salaire) || ['', '', '', '']
  let texte = salairesStr[1] + ' :<br> '
  texte += '<br>' + desTabEffCumul(salaires, false, categoriesCol, salairesStr[2]) + '<br>'
  return texte
}

function texteTirages2D (nombreDes, nombreTirages, nombreFaces, tirages, aveclampeMessage = true) {
  let texte = ''
  if (nombreDes > 1) {
    texte = `On a réalisé $${nombreTirages}$ lancers de $${nombreDes}$ dés à $${nombreFaces}$ faces.<br>
            On a relevé la somme des $${nombreDes}$ dés.<br>`
  } else {
    texte = `On a réalisé $${nombreTirages}$ lancers d'un dé à $${nombreFaces}$ faces.<br>`
  }
  texte += aveclampeMessage
    ? lampeMessage({
      titre: 'Vocabulaire',
      texte: `Le solide qui correspond à ce type de dé s'appelle ${texteGras(solidName(nombreFaces))}.`,
      couleur: 'nombres'
    }) + '<br>'
    : ''
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
      return 'décaèdre'
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
  texteCorrMedianeTemperatures,
  texteCorrMedianeNotes,
  texteCorrEtendueNotes,
  // calcul
  computeEtendue,
  computeMoyenne,
  computeMediane,
  computeMoyenneTirages2D,
  computeMedianeTirages2D
}
