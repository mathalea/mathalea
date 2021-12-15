import Exercice from '../Exercice.js'
import { segment, ObjetMathalea2D, texteParPoint, traceBarre, point, mathalea2d } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { listeEntiersSommeConnue, choice, randint, listeQuestionsToContenu, combinaisonListes } from '../../modules/outils.js'
import { sum, ceil, gcd, fraction, round, max } from 'mathjs'
export const titre = 'Calculs de probabilités'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '12/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

function num (nb) {
  return Intl.NumberFormat('fr-FR', { maximumFractionDigits: 20 }).format(nb).toString().replace(/\s+/g, '\\thickspace ').replace(',', '{,}')
}

function numberFormat (nb) {
  return Intl.NumberFormat('fr-FR', { maximumFractionDigits: 20 }).format(nb).toString().replace(/\s+/g, '\\thickspace ')
}

function fraction2Tex (fraction) {
  const signe = fraction.s === 1 ? '' : '-'
  return fraction.d !== 1 ? String.raw`${signe}\dfrac{${num(fraction.n)}}{${num(fraction.d)}}` : String.raw`${signe}${num(fraction.n)}`
}

function fixeBordures (objets, { rxmin = undefined, rymin = undefined, rxmax = undefined, rymax = undefined, rzoom = 1 } = {}) {
  rxmin = rxmin !== undefined ? rxmin : -1
  rymin = rymin !== undefined ? rymin : -1
  rxmax = rxmax !== undefined ? rxmax : 1
  rymax = rymax !== undefined ? rymax : 1
  let xmin = 0; let ymin = 0; let xmax = 0; let ymax = 0
  for (const objet of objets) {
    xmin = Math.min(xmin, objet.x + rxmin || 0)
    xmax = Math.max(xmax, objet.x + rxmax || 0)
    ymin = Math.min(ymin, objet.y + rymin || 0)
    ymax = Math.max(ymax, objet.y + rymax || 0)
    if (typeof objet.bordure !== 'undefined') {
      if (typeof objet.bordure[Symbol.iterator] === 'function') {
        for (const obj of objet.bordure) {
          xmin = Math.min(xmin, obj.x + rxmin || 0)
          xmax = Math.max(xmax, obj.x + rxmax || 0)
          ymin = Math.min(ymin, obj.y + rymin || 0)
          ymax = Math.max(ymax, obj.y + rymax || 0)
        }
      } else {
        xmin = Math.min(xmin, objet.bordure.x + rxmin || 0)
        xmax = Math.max(xmax, objet.bordure.x + rxmax || 0)
        ymin = Math.min(ymin, objet.bordure.y + rymin || 0)
        ymax = Math.max(ymax, objet.bordure.y + rymax || 0)
      }
    }
  }
  return { xmin: xmin * rzoom, xmax: xmax * rzoom, ymin: ymin * rzoom, ymax: ymax * rzoom }
}

function Axes (
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  thick = 0.2,
  xstep = 1,
  ystep = 1,
  epaisseur = 2,
  color = 'black',
  ytick = ystep,
  titre = ''
) {
  ObjetMathalea2D.call(this)
  const objets = []
  objets.push(texteParPoint(titre, point(xmin - thick - 0.1, ymax), 'gauche', color))
  const ordonnee = segment(-1, ymin, -1, ymax)
  ordonnee.styleExtremites = '->'
  ordonnee.epaisseur = epaisseur
  objets.push(ordonnee)
  ordonnee.color = color
  for (let y = ymin; y < ymax; y = fraction(y).add(ystep)) {
    const s = segment(xmin - thick, y, xmin, y)
    s.epaisseur = epaisseur
    s.color = color
    objets.push(s)
  }
  for (let y = ymin; y < ymax; y = fraction(y).add(ystep.div(ytick))) {
    const s = segment(xmin - thick / 2, y, xmin, y)
    s.epaisseur = epaisseur
    s.color = color
    objets.push(s)
  }
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
  this.commentaire = `Axes(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, thick = ${thick})`
}

function axes (...args) {
  return new Axes(...args)
}

function LabelY (
  ymin = 1,
  ymax = 20,
  step = 1,
  color = 'black',
  pos = -0.6,
  coeff = 1
) {
  ObjetMathalea2D.call(this)
  const objets = []
  for (let y = ceil(fraction(ymin, coeff));
    y.mul(coeff) <= ymax;
    y = y.add(step)
  ) {
    objets.push(
      texteParPoint(
        y.mul(coeff),
        point(pos, y),
        'gauche',
        color
      )
    )
  }
  this.svg = function (coeff) {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }
  this.tikz = function () {
    let code = ''
    for (const objet of objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
  this.commentaire = `labelX(ymin=${ymin},ymax=${ymax},step=${step},color=${color},pos=${pos})`
}

function labelY (...args) {
  return new LabelY(...args)
}

function diagrammeBarres (hauteursBarres, etiquettes, { reperageTraitPointille = false, couleur = 'blue', titre = '', hauteurDiagramme = 5, coeff = 2, axeVertical = false, etiquetteValeur = true, labelAxeVert = false } = {}) {
  const diagramme = []
  for (let j = 0; j < hauteursBarres.length; j++) {
    const abscisseBarre = j * coeff
    const hauteurBarre = hauteursBarres[j] * hauteurDiagramme / max(hauteursBarres)
    diagramme.push(traceBarre(abscisseBarre, hauteurBarre, etiquettes[j], 0, couleur, 1))
    if (reperageTraitPointille) {
      const ligne = segment(-1, hauteurBarre, abscisseBarre, hauteurBarre)
      ligne.pointilles = true
      ligne.epaisseur = 0.2
      diagramme.push(ligne)
    }
    diagramme.push(texteParPoint(numberFormat(hauteursBarres[j]), point(abscisseBarre, hauteurBarre + 0.3)))
    // Calculs permettant de graduer l'axe vertical et de placer des valeurs
    const steps = [1, 2, 5, 10, 20]
    const yticks = [1, 2, 5, 5, 5]
    let istep = 1
    let step = 1
    let ytick = 1
    while (max(hauteursBarres) / step > 5 && istep < 5) {
      istep += 1
      step = steps[istep - 1]
      ytick = yticks[istep - 1]
    }
    if (istep === 5) istep = 2
    while (max(hauteursBarres) / step > 5) {
      istep = istep + 1
      step = istep * 10
      ytick = 5
    }
    if (labelAxeVert) diagramme.push(labelY(0, max(hauteursBarres), fraction(hauteurDiagramme, max(hauteursBarres)).mul(step), 'black', -1.3, max(hauteursBarres) / hauteurDiagramme))
    if (axeVertical) diagramme.push(axes(-1, 0, abscisseBarre, hauteurDiagramme + 1, 0.2, abscisseBarre, fraction(hauteurDiagramme, max(hauteursBarres)).mul(step), 0.2, 'black', ytick, titre))
  }
  if (titre !== '') diagramme.push(texteParPoint(titre, point(hauteursBarres.length - 1, hauteurDiagramme + 1)))
  return mathalea2d(Object.assign({}, fixeBordures(diagramme, { rxmin: -3, rymin: -2, rymax: 1.5 }), { style: 'inline', scale: 1 }), ...diagramme)
}

function listeExhaustive (univers, ratios) {
  // On créé une liste exhaustive avec répétition de chaque issue
  // [blanche blanche blanche noire noire] pour un ratio 3:2 de billes blanches et noires
  const issues = []
  for (let j = 0; j < univers.length; j++) {
    if (ratios[j] > 1) {
      issues.push(...combinaisonListes([univers[j]], ratios[j]))
    } else {
      issues.push(univers[j])
    }
  }
  const issuesAbregees = []
  for (let j = 0; j < issues.length; j++) {
    issuesAbregees.push(issues[j][0].toUpperCase())
  }
  return { issues: issues, issuesAbregees: issuesAbregees }
}

function simulationExperienceAlaetoire (univers, ratios, nbEssais) {
  const issues = listeExhaustive(univers, ratios).issues
  const effectifs = []
  const realisees = []
  for (let j = 0; j < nbEssais; j++) {
    const issue = issues[randint(0, issues.length - 1)] // On choisit une issue dans la liste [blanche blanche blanche noire noire]
    const refIssue = univers.indexOf(issue) // On trouve sa position dans l'urne qui va être la référence dans realisees
    if (realisees.indexOf(refIssue) !== -1) { // On teste si cette référence à cette issue existe dans les issues réalisées
      effectifs[realisees.indexOf(refIssue)] += 1 // Si c'est le cas on ajoute 1
    } else {
      realisees.push(refIssue) // Sinon on ajoute la référénce aux issues réalisées
      effectifs.push(1) // L'effectif de cette référence passe à 1
    }
  }
  // Calcul des fréquences sous forme d'une fraction mathjs
  const frequences = []
  for (let j = 0; j < realisees.length; j++) {
    frequences.push(fraction(effectifs[j], nbEssais))
  }
  return { effectifs: effectifs, frequences: frequences, realisees: realisees }
}

function etapesSimplificationFraction (n = 21, d = 45, A = undefined, methode = 0, aligned = false) {
  let etapes = []
  const p = gcd(n, d)
  let netapes = 0
  switch (methode) {
    case 0:
      etapes.push(String.raw`\dfrac{${n / p}\times${p}}{${d / p}\times${p}}`)
      if (p > 1) {
        etapes.push(String.raw`\dfrac{${n / p}}{${d / p}}`)
        netapes += 1
      }
      if (A === undefined) {
        etapes = etapes.join('=')
        etapes = '$' + etapes + '$'
      } else if (A === '' && netapes > 0) {
        if (aligned) {
          etapes = etapes.join('\\\\&=')
          etapes = String.raw`
          <br>
          $\begin{aligned}
          \dfrac{${n}}{${d}}&=${etapes}
          \end{aligned}$
          <br>
          `
        } else {
          etapes = String.raw`$\dfrac{${n}}{${d}}=${etapes.join('=')}$`
        }
      } else if (netapes > 0) {
        if (aligned) {
          etapes = etapes.join('\\\\&=')
          etapes = String.raw`
          <br>
          $\begin{aligned}
          ${A}&=${etapes}
          \end{aligned}$
          <br>
          `
        } else {
          etapes = String.raw`$${A}=${etapes.join('=')}$`
        }
      } else {
        etapes = '<br>'
      }
      break
    case 1: // Pas de aligned, pas de détails
      if (netapes > 0) {
        if (A === undefined) { // Pour une sortie inline
          etapes = String.raw`$\dfrac{${n / p}}{${d / p}}$`
        } else if (A === '') {
          etapes = String.raw`
          <br>
          $\dfrac{${n}}{${p}} = \dfrac{${n / p}}{${d / p}}$
          <br>
          `
        } else {
          etapes = String.raw`
          <br>
          $${A} = \dfrac{${n / p}}{${d / p}}$
          <br>
          `
        }
      } else {
        etapes = '<br>'
      }
      break
  }
  return etapes
}

function diagrammeCalculsFrequences (typeReponseAttendue = 0) {
  const urne = combinaisonListes(['jaune', 'verte', 'bleue', 'rouge', 'noire']).slice(0, randint(2, 5))
  let totalRatios = urne.length + randint(1, 15)
  const ratios = listeEntiersSommeConnue(urne.length, totalRatios, 1) // On choisit au hasard les ratios
  if (gcd(...ratios) !== 1) {
    for (let j = 0; j < urne.length; j++) {
      ratios[j] = ratios[j] / gcd(...ratios)
    }
    totalRatios = sum(ratios)
  }
  const nbEssais = totalRatios * randint(1, 9)
  const experience = simulationExperienceAlaetoire(urne, ratios, nbEssais)
  const issuesReordonnees = []
  for (let j = 0; j < experience.realisees.length; j++) {
    issuesReordonnees.push(urne[experience.realisees[j]])
  }
  const diagrammeEffectifs = diagrammeBarres(experience.effectifs, issuesReordonnees)
  const choixRef = choice(experience.realisees) // Choix d'une référence
  const posRef = experience.realisees.indexOf(choixRef) // Position de la référence dans realises
  const choixIssue = urne[choixRef] // Issue correspondante à ce choix (les billes dans l'urne ne sont listées dans le même ordre)
  const remarque = [
    '$\\textit{* On donnera la valeur exacte et simplifiée.}$',
    '$\\textit{* On donnera une valeur décimale arrondie au millième.}$',
    '$\\textit{* On donnera un pourcentage arrondi à l\'unité.}$'
  ][typeReponseAttendue]
  let solution
  let environ = ''
  switch (typeReponseAttendue) {
    case 0:
      solution = {
        calculs: `${etapesSimplificationFraction(experience.effectifs[posRef], nbEssais, '', 0, true)}`,
        reponse: `$${fraction2Tex(experience.frequences[posRef], true)}$`
      }
      break
    case 1: {
      let approchee = fraction(round(experience.frequences[posRef].valueOf(), 3))
      environ = approchee - fraction(experience.effectifs[posRef], nbEssais) === 0 ? '' : 'environ'
      approchee = num(approchee)
      const approx = (environ === 'environ') ? '\\approx' : '='
      solution = {
        calculs: String.raw`<br>$\dfrac{${experience.effectifs[posRef]}}{${nbEssais}}${approx}${approchee}$<br>`,
        reponse: `$${approchee}$`
      }
      break
    }
    case 2: {
      let approchee = fraction(round(experience.frequences[posRef].valueOf(), 2))
      environ = approchee - fraction(experience.effectifs[posRef], nbEssais) === 0 ? '' : 'environ'
      approchee = { decimal: num(approchee), pourcentage: num(approchee.mul(100)) }
      const approx = (environ === 'environ') ? '\\approx' : '='
      solution = {
        calculs: String.raw`<br>$\dfrac{${experience.effectifs[posRef]}}{${nbEssais}}${approx}${approchee.decimal}$<br>`,
        reponse: `$${approchee.pourcentage}~\\%$`
      }
      break
    }
  }
  const texte = String.raw`Une urne contient des billes de différentes couleurs.
          L'expérience consiste à tirer une bille au hasard,
          à noter sa couleur, puis à la remettre dans l'urne.
          On obtient le diagramme des effectifs ci-dessous
          au bout de $${nbEssais}$ tirages.
          <br>
          ${diagrammeEffectifs}
          <br>
          Calculer la fréquence d'apparition de la couleur ${choixIssue}$\textit{*}$.
          <br>
          ${remarque}
          `
  const texteCorr = String.raw`
          La fréquence d'apparition d'une couleur est le quotient
          du nombre d'apparitions de cette couleur par le nombre total d'essais.
          <br>
          La bille de couleur ${choixIssue} est apparue
          $${experience.effectifs[posRef]}$ fois sur $${nbEssais}$ tirages.
          ${solution.calculs}
          Donc la fréquence d'apparition de la couleur ${choixIssue} est ${environ} ${solution.reponse}.
          `
  return { texte: texte, texteCorr: texteCorr }
}

function ratiosCalculsProbabilites () {
  const urne = combinaisonListes(['jaune', 'verte', 'bleue', 'rouge', 'noire']).slice(0, randint(2, 5))
  let totalRatios = urne.length + randint(1, 15)
  const ratios = listeEntiersSommeConnue(urne.length, totalRatios, 1) // On choisi au hasard les ratios
  if (gcd(...ratios) !== 1) {
    for (let j = 0; j < urne.length; j++) {
      ratios[j] = ratios[j] / gcd(...ratios)
    }
    totalRatios = sum(ratios)
  }
  const choixRef = randint(1, urne.length) - 1 // Choix d'une référence
  const choixIssue = urne[choixRef] // Issue correspondante à ce choix (les billes dans l'urne ne sont listées dans le même ordre)
  const choixRatio = ratios[choixRef]
  const plurielsIssues = []
  for (const issue of urne) {
    plurielsIssues.push(issue + 's')
  }
  const solution = {
    calculs: `${etapesSimplificationFraction(choixRatio, sum(ratios), '', 0, true)}`,
    reponse: `$${fraction2Tex(fraction(choixRatio, sum(ratios)))}$`
  }
  const texte = `Une urne contient des billes de couleurs différentes : des 
          ${plurielsIssues.slice(0, plurielsIssues.length - 1).join(', des ')}
          et des ${plurielsIssues[plurielsIssues.length - 1]}
          dans le ratio $${ratios.join('{:}')}$.
          <br>
          L'expérience consiste à tirer une bille au hasard et
          à noter sa couleur.
          <br>
          Calculer la probabilité d'obtenir une bille de couleur ${choixIssue}.`
  const texteCorr = String.raw`
          Comme $${ratios.join('+')}=${sum(ratios)}$, la proportion de billes ${choixIssue}s est $\dfrac{${choixRatio}}{${sum(ratios)}}$.
          ${solution.calculs}
          Donc la probabilité d'obtenir une bille de couleur ${choixIssue} est ${solution.reponse}.
          `
  return { texte: texte, texteCorr: texteCorr }
}

function probabilitesCalculsRatios () {
  const urne = combinaisonListes(['jaune', 'verte', 'bleue', 'rouge', 'noire']).slice(0, randint(2, 5))
  let totalRatios = urne.length + randint(1, 15)
  const ratios = listeEntiersSommeConnue(urne.length, totalRatios, 1) // On choisi au hasard les ratios
  if (gcd(...ratios) !== 1) {
    for (let j = 0; j < urne.length; j++) {
      ratios[j] = ratios[j] / gcd(...ratios)
    }
    totalRatios = sum(ratios)
  }
  const simplifications = []
  let compteurSimplifications = 0
  for (let j = 0; j < ratios.length; j++) {
    if (fraction(ratios[j], sum(ratios)).d !== sum(ratios)) {
      simplifications.push(String.raw`$${fraction2Tex(fraction(ratios[j], sum(ratios)))} = \dfrac{${ratios[j]}}{${sum(ratios)}}$`)
      compteurSimplifications += 1
    } else {
      simplifications.push(String.raw`$${fraction2Tex(fraction(ratios[j], sum(ratios)))}$`)
    }
  }
  let introCorrection
  if (compteurSimplifications === 0) {
    introCorrection = 'Toutes les probabilités ont le même dénominateur.'
  } else {
    introCorrection = String.raw`Écrivons toutes les probabilités avec le même dénominateur.
            <br>
            ${simplifications.join(' ; ')}
            `
  }
  const plurielsIssues = []
  for (const issue of urne) {
    plurielsIssues.push(issue + 's')
  }
  const probabilites = []
  for (let j = 0; j < urne.length; j++) {
    probabilites.push(`$${fraction2Tex(fraction(ratios[j], sum(ratios)))}$`)
  }
  const texte = `Une urne contient des billes de couleurs différentes : des
          ${plurielsIssues.slice(0, plurielsIssues.length - 1).join(', des ')}
          et des ${plurielsIssues[plurielsIssues.length - 1]}.
          <br>
          L'expérience consiste à tirer une bille au hasard et
          à noter sa couleur.
          <br>
          Les probabilités respectives de chaque couleur sont ${probabilites.slice(0, probabilites.length - 1).join(', ')}
          et ${probabilites[probabilites.length - 1]}.
          <br>
          Dans quel ratio les couleurs sont-elles ?`
  const texteCorr = String.raw`
          ${introCorrection}
          <br>
          Donc les couleurs ${plurielsIssues.slice(0, plurielsIssues.length - 1).join(', ')}
          et ${plurielsIssues[plurielsIssues.length - 1]}
          sont dans le ratio $${ratios.join('{:}')}$.
          `
  return { texte: texte, texteCorr: texteCorr }
}

function ratios2EpreuvesCalculsProbabilites () {
  const urne = combinaisonListes(['jaune', 'verte', 'bleue', 'rouge', 'noire']).slice(0, randint(2, 3))
  let totalRatios = urne.length + randint(0, 3)
  const ratios = listeEntiersSommeConnue(urne.length, totalRatios, 1) // On choisi au hasard les ratios
  if (gcd(...ratios) !== 1) {
    for (let j = 0; j < urne.length; j++) {
      ratios[j] = ratios[j] / gcd(...ratios)
    }
    totalRatios = sum(ratios)
  }
  const issues = listeExhaustive(urne, ratios)
  const choixRef = [randint(1, urne.length) - 1, randint(1, urne.length) - 1] // Choix d'une référence
  const choixIssue = [urne[choixRef[0]], urne[choixRef[1]]] // Issue correspondante à ce choix (les billes dans l'urne ne sont listées dans le même ordre)
  const evenement = choixIssue[0] === choixIssue[1]
    ? `Obtenir deux billes de couleurs ${choixIssue[1]}s`
    : `Obtenir une bille de couleur ${choixIssue[0]}
          et une bille de couleur ${choixIssue[1]}`
  const choixRatio = [ratios[choixRef[0]], ratios[choixRef[1]]]
  const plurielsIssues = []
  for (const issue of urne) {
    plurielsIssues.push(issue + 's')
  }
  const probabilites = []
  for (let j = 0; j < urne.length; j++) {
    probabilites.push(`$${fraction2Tex(fraction(ratios[j], sum(ratios)))}$`)
  }
  const texte = `Une urne contient des billes de couleurs différentes : des 
          ${plurielsIssues.slice(0, plurielsIssues.length - 1).join(', des ')}
          et des ${plurielsIssues[plurielsIssues.length - 1]}
          dans le ratio $${ratios.join('{:}')}$.
          <br>
          L'expérience consiste à tirer une bille au hasard,
          à noter sa couleur, à la replacer dans l'urne,
          puis à recommencer une seconde fois.
          <br>
          Quelle est la probabilité de l'événement "${evenement}" ?
          `
  let lignes = [`\\hline &${issues.issuesAbregees.join('&')}\\\\`]
  for (let j = 0; j < issues.issues.length; j++) {
    lignes.push(`\\hline ${issues.issuesAbregees[j]}`)
    for (let k = 0; k < issues.issues.length; k++) {
      lignes.push(`&(${issues.issuesAbregees[j]}{;}${issues.issuesAbregees[k]})`)
    }
    lignes.push('\\\\')
  }
  lignes = lignes.join('')
  const corrProba = choixIssue[0] === choixIssue[1] ? 1 : 2
  const issuesquirealisent = choixRatio[0] * choixRatio[1] * corrProba === 1 ? 'issue qui réalise' : 'issues qui réalisent'
  const texteCorr = String.raw`
          Listons dans un tableau à double entrée toutes les issues
          de cette expérience.
          <br>
          $
          \begin{array}{${listeExhaustive(['|c'], [issues.issues.length + 1]).issues.join('')}|}
          ${lignes}
          \hline
          \end{array}
          $
          <br>
          Il y a $${issues.issues.length ** 2}$ issues au total
          et toutes ont la même probabilité d'être obtenue.
          <br>
          Il y a $${choixRatio[0] * choixRatio[1] * corrProba}$ ${issuesquirealisent} l'événement "${evenement}".
          <br>
          Donc la probabilité de cet événement est $${fraction2Tex(fraction(choixRatio[0] * choixRatio[1] * corrProba, issues.issues.length ** 2))}$.
          `
  return { texte: texte, texteCorr: texteCorr }
}

function ratioPiece2EpreuvesCalculsProbabilites () {
  const urne1 = combinaisonListes(['jaune', 'verte', 'bleue', 'rouge', 'noire']).slice(0, randint(2, 3))
  const urne2 = combinaisonListes(['Pile', 'Face']).slice(0, 2)
  let totalRatios1 = urne1.length + randint(0, 3)
  const totalRatios2 = urne2.length
  const ratios1 = listeEntiersSommeConnue(urne1.length, totalRatios1, 1) // On choisi au hasard les ratios
  const ratios2 = listeEntiersSommeConnue(urne2.length, totalRatios2, 1) // On choisi au hasard les ratios
  if (gcd(...ratios1) !== 1) {
    for (let j = 0; j < urne1.length; j++) {
      ratios1[j] = ratios1[j] / gcd(...ratios1)
    }
    totalRatios1 = sum(ratios1)
  }
  const issues1 = listeExhaustive(urne1, ratios1)
  const issues2 = listeExhaustive(urne2, ratios2)
  const choixRef = [randint(1, urne1.length) - 1, randint(1, urne2.length) - 1] // Choix d'une référence
  const choixIssue = [urne1[choixRef[0]], urne2[choixRef[1]]] // Issue correspondante à ce choix (les billes dans l'urne ne sont listées dans le même ordre)
  const evenement = `Obtenir une bille de couleur ${choixIssue[0]} avec l'urne et obtenir ${choixIssue[1]} avec la pièce`
  const choixRatio = [ratios1[choixRef[0]], 1]
  const plurielsIssues = []
  for (const issue of urne1) {
    plurielsIssues.push(issue + 's')
  }
  const texte = `Une urne contient des billes de couleurs différentes : des
          ${plurielsIssues.slice(0, plurielsIssues.length - 1).join(', des ')}
          et des ${plurielsIssues[plurielsIssues.length - 1]}
          dans le ratio $${ratios1.join('{:}')}$.
          <br>
          L'expérience consiste à tirer une bille au hasard,
          à noter sa couleur, à lancer une pièce de monnaie équilibrée
          puis à noter la face du dessus.
          <br>
          Quelle est la probabilité de l'événement "${evenement}" ?
          `
  let lignes = [`\\hline &${issues1.issuesAbregees.join('&')}\\\\`]
  for (let j = 0; j < issues2.issues.length; j++) {
    lignes.push(`\\hline ${issues2.issuesAbregees[j]}`)
    for (let k = 0; k < issues1.issues.length; k++) {
      lignes.push(`&(${issues2.issuesAbregees[j]}{;}${issues1.issuesAbregees[k]})`)
    }
    lignes.push('\\\\')
  }
  lignes = lignes.join('')
  const issuesquirealisent = choixRatio[0] * choixRatio[1] === 1 ? 'issue qui réalise' : 'issues qui réalisent'
  const texteCorr = String.raw`
          Listons dans un tableau à double entrée toutes les issues
          de cette expérience.
          <br>
          $
          \begin{array}{${listeExhaustive(['|c'], [issues1.issues.length + 1]).issues.join('')}|}
          ${lignes}
          \hline
          \end{array}
          $
          <br>
          Il y a $${issues1.issues.length * issues2.issues.length}$ issues au total
          et toutes ont la même probabilité d'être obtenue.
          <br>
          Il y a $${choixRatio[0] * choixRatio[1]}$ ${issuesquirealisent} l'événement "${evenement}".
          <br>
          Donc la probabilité de cet événement est $${fraction2Tex(fraction(choixRatio[0] * choixRatio[1], issues1.issues.length * issues2.issues.length))}$.
          `
  return { texte: texte, texteCorr: texteCorr }
}

function diagrammeEffectifsCalculsLoiGrandNombre () {
  const urne = combinaisonListes(['jaune', 'verte', 'bleue', 'rouge', 'noire']).slice(0, randint(2, 5))
  let totalRatios = urne.length + randint(100, 350)
  const ratios = listeEntiersSommeConnue(urne.length, totalRatios, round(totalRatios / 10)) // On choisi au hasard les ratios
  if (gcd(...ratios) !== 1) {
    for (let j = 0; j < urne.length; j++) {
      ratios[j] = ratios[j] / gcd(...ratios)
    }
    totalRatios = sum(ratios)
  }
  const nbEssais = totalRatios * randint(300, 500)
  const experience = simulationExperienceAlaetoire(urne, ratios, nbEssais)
  const issuesReordonnees = []
  for (let j = 0; j < experience.realisees.length; j++) {
    issuesReordonnees.push(urne[experience.realisees[j]])
  }
  const diagrammeEffectifs = diagrammeBarres(experience.effectifs, issuesReordonnees)
  const choixRef = choice(experience.realisees) // Choix d'une référence
  const posRef = experience.realisees.indexOf(choixRef) // Position de la référence dans realises
  const choixIssue = urne[choixRef] // Issue correspondante à ce choix (les billes dans l'urne ne sont listées dans le même ordre)
  const solution = {
    // calculs: `${etapesSimplificationFraction(experience.effectifs[posRef], nbEssais, '', 0, true)}`,
    reponse: `${fraction2Tex(experience.frequences[posRef])}`
  }
  const texte = String.raw`Une urne contient ${totalRatios} billes de couleurs différentes.
          <br>
          L'expérience consiste à tirer une bille au hasard,
          à noter sa couleur, puis à la remettre dans l'urne.
          <br>
          On obtient le diagramme des effectifs ci-dessous
          après $${num(nbEssais)}$ tirages où on a pu constater
          une stabilisation des fréquences de chaque issue.
          <br>
          ${diagrammeEffectifs}
          <br>
          Calculer le nombre de billes de couleur ${choixIssue} qu'il y a dans l'urne.
          `
  const texteCorr = String.raw`
          La fréquence d'apparition d'une couleur est le quotient
          du nombre d'apparitions de cette couleur par le nombre total d'essais.
          <br>
          La bille de couleur ${choixIssue} est apparue
          $${num(experience.effectifs[posRef])}$ fois sur $${num(nbEssais)}$ tirages.
          <br>
          Donc la fréquence d'apparition de la couleur ${choixIssue} est $${solution.reponse}$.
          <br>
          Pour un nombre suffisamment grand d'essais, la fréquence d'une issue se stabilise autour de sa probabilité.
          <br>
          La proportion de billes de couleur ${choixIssue} est donc proche de cette fréquence.
          <br>
          $${solution.reponse} \times ${totalRatios} \approx ${ratios[choixRef]}$.
          <br>
          Il y a donc $${ratios[choixRef]}$ billes ${choixIssue}s dans l'urne.
          `
  return { texte: texte, texteCorr: texteCorr }
}
/**
 * Calculs de fréquences, probabilités, ratios
 * @author Frédéric PIOU
 * Référence
*/

export default function CalculsProbabilites () {
  Exercice.call(this)
  this.consigne = ''
  this.nbQuestions = 8
  this.nbCols = 0
  this.nbColsCorr = 0
  this.tailleDiaporama = 1
  this.video = ''
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  context.isHtml ? (this.spacing = 2.5) : (this.spacing = 1.5)
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1.5)
  this.sup = 0 // Type d'exercice
  this.besoinFormulaireNumerique = [
    'Type de question', 9, [
      '0 : Mélange des types de questions',
      '1 : Calculer une fréquence à partir du diagramme des effectifs (valeur exacte).',
      '2 : Calculer une fréquence à partir du diagramme des effectifs (valeur approchée).',
      '3 : Calculer une fréquence à partir du diagramme des effectifs (pourcentage).',
      '4 : Calcul d\'une probabilité à partir d\'un ratio.',
      '5 : Calcul d\'un probabilité à partir de pobabilités.',
      '6 : Expérience à deux épreuves (avec remise) : Calcul d\'une probabilité à partir de ratios.',
      '7 : Expérience à deux épreuves différentes : Calcul d\'une probabilité à partir de ratios.',
      '8 : Diagramme des effectifs : Utilisation de la stabilistation des fréquences.'
    ].join('\n')
  ]
  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // À placer même si l'exercice n'a pas vocation à être corrigé
    for (let i = 0, exercice, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const nquestion = this.sup === 0 ? randint(1, 8) : this.sup
      switch (nquestion) {
        case 1:
          exercice = diagrammeCalculsFrequences(0)
          break
        case 2:
          exercice = diagrammeCalculsFrequences(1)
          break
        case 3:
          exercice = diagrammeCalculsFrequences(2)
          break
        case 4: {
          exercice = ratiosCalculsProbabilites()
          break
        }
        case 5: {
          exercice = probabilitesCalculsRatios()
          break
        }
        case 6: {
          exercice = ratios2EpreuvesCalculsProbabilites()
          break
        }
        case 7: {
          exercice = ratioPiece2EpreuvesCalculsProbabilites()
          break
        }
        case 8: {
          exercice = diagrammeEffectifsCalculsLoiGrandNombre()
          break
        }
      }
      // Fin Probabilites
      if (this.questionJamaisPosee(i, nquestion)) {
        this.listeQuestions.push(exercice.texte)
        this.listeCorrections.push(exercice.texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
