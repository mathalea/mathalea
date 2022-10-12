import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { ppcm, randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { fractionSimplifiee, simplificationDeFractionAvecEtapes, texFraction, texFractionReduite } from '../../modules/outils/arrayFractions.js'
import { numAlpha } from '../../modules/outils/contextSensitif.js'
import { prenomF, prenomM } from '../../modules/outils/objetspersonnes.js'
export const titre = 'Calculer des probabilités dans une expérience aléatoire à deux épreuves'

/**
 * Calculs de probabilités sur une expérience aléatoire à deux épreuves
 * @author Jean-Claude Lhote
 * 3S20
 */
export const uuid = '04f53'
export const ref = '3S20'
export default function FonctionsProbabilite2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 2
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  context.isHtml ? this.spacing = 2 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 3 : this.spacingCorr = 2
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const indexDisponibles = [0, 1, 2, 3]
    const listeIndex = combinaisonListes(indexDisponibles, this.nbQuestions)
    const qualites = [[]]
    const Initiale = []
    const Couleurs = ['red', 'green', 'blue', 'gray', 'brown', '#f15929', 'magenta', 'pink', 'black', 'lightgray']
    qualites[0] = ['à la fraise', 'à la vanille', 'à l\'abricot', 'à la cerise', 'à la banane']
    qualites[1] = ['trèfle', 'carreau', 'coeur', 'pique']
    qualites[2] = ['rouges', 'vertes', 'bleues', 'noires', 'blanches']
    qualites[3] = ['gris', 'cyans', 'roses', 'jaunes', 'violets']
    qualites[4] = ['rouges', 'verts', 'bleus', 'noirs', 'jaunes']
    qualites[5] = ['rouges', 'verts', 'bleus', 'noirs', 'blancs']
    qualites[6] = ['rouges', 'verts', 'bleus', 'noirs', 'jaunes']
    for (let i = 0, p, q, r, e, f, g, somme1, somme2, quidame, quidam, n = [], m = [], fra1 = [], fra2 = [], p1 = [], p2 = [], p3 = [], den, trouve, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      quidame = prenomF()
      quidam = prenomM()
      switch (listeIndex[i]) {
        case 0:
          Initiale[0] = 'F'
          Initiale[1] = 'V'
          Initiale[2] = 'A'
          Initiale[3] = 'C'
          Initiale[4] = 'B'
          p = randint(0, 4)
          q = randint(0, 4, [p])
          r = randint(0, 4, [p, q])
          n[p] = randint(2, 5)
          n[q] = randint(1, 6) + 2
          n[r] = randint(1, 3) * 2

          // n[3]=randint(1,4)+2;
          // n[4]=randint(2,5);
          somme1 = n[p] + n[q] + n[r] // +n[3]+n[4];
          texte = `Dans le frigo il y a ${somme1} yaourts. ${n[p]} sont ${qualites[0][p]}, ${n[q]} sont ${qualites[0][q]} et ${n[r]} sont ${qualites[0][r]}.<br>` //  ${n[3]} sont ${qualites[index1][3]} et ${n[4]} sont ${qualites[index1][4]}.<br> `;
          texte += `${quidame} en choisit un au hasard. Son frère ${quidam} en choisit un au hasard à son tour.<br>`
          texte += numAlpha(0) + ' Combien d\'issues possède cette experience aléatoire ? Donner un exemple d\'issue.<br>'
          texte += numAlpha(1) + ' Est-ce une expérience en situation d\'équiprobabilité ? Justifier.<br>'
          texte += numAlpha(2) + ` Calculer la probabilité que ${quidame} et ${quidam} aient choisi tous les deux un yaourt ${qualites[0][p]}.<br>`
          texte += numAlpha(3) + ' Calculer la probabilité qu\'ils aient choisi des yaourts aux parfums identiques.<br>'
          texte += numAlpha(4) + ' Calculer la probabilité qu\'ils aient choisi des yaourts aux parfums différents.<br>'
          texteCorr = ''
          texteCorr += numAlpha(0) + ` ${quidame} peut avoir choisi un yaourt ${qualites[0][p]}, ${qualites[0][q]} ou ${qualites[0][r]}. Une fois qu'elle a choisi, et comme il y a au moins 2 yaourts de chaque sorte, ${quidam} a les mêmes 3 possibilités. Il y a donc $3\\times3=9$ issues possibles.<br>`
          texteCorr += `Par exemple : ${quidame} a pris un yaourt ${qualites[0][p]} et ${quidam} un yaourt ${qualites[0][q]}. Ce qu'on peut noter (${Initiale[p]},${Initiale[q]}).<br>`
          texteCorr += 'Les 9 issues sont : '
          for (const j of [p, q, r]) {
            for (const k of [p, q, r]) { texteCorr += `(${Initiale[j]},${Initiale[k]}) ` }
          }
          texteCorr += '<br>'
          if (n[0] === n[1] && n[1] === n[2]) {
            texteCorr += numAlpha(1) + ` Comme le nombre de yaourts de chaque sorte est le même, alors ${quidame} a la même probabilité de choisir n'importe quel parfum, mais ensuite son frère aura un yaourt de moins de l'un des parfums. Il est donc moins probable qu'il choisisse le même parfum que sa soeur que l'un des deux autres parfums.<br>`
            texteCorr += `l'issue (${Initiale[p]},${Initiale[p]}) est donc moins probable que l'issue (${Initiale[p]},${Initiale[q]}). Ce n'est donc pas une situation d'équiprobabilité.`
          } else {
            texteCorr += numAlpha(1) + ` Comme le nombre de yaourts est différent d'un parfum à l'autre, ${quidame} n'a pas la même probabilité de choisir n'importe quel parfum. On en déduit qu'il est impossible que les issues (${Initiale[p]},${Initiale[p]}), (${Initiale[q]},${Initiale[q]}) et (${Initiale[r]},${Initiale[r]}) aient la même probabilité.<br>`
          }
          texteCorr += numAlpha(2) + ` Il y a ${n[p]} yaourts ${qualites[0][p]}, et ${somme1} yaourts en tout, la probabilité que ${quidame} choisisse un yaourt ${qualites[0][p]} est : $${texFraction(n[p], somme1)}${simplificationDeFractionAvecEtapes(n[p], somme1)}$.<br>`
          texteCorr += `Ensuite il reste ${n[p] - 1} yaourts ${qualites[0][p]} pour ${quidam} sur un total de ${somme1 - 1} yaourts.<br> La probabilité qu'il choisisse à son tour et dans ces conditions ce parfum est ; $${texFraction(n[p] - 1, somme1 - 1)}${simplificationDeFractionAvecEtapes(n[p] - 1, somme1 - 1)}$.<br>`
          texteCorr += `La probabilité de l'issue (${Initiale[p]},${Initiale[p]}) est le produit de ces deux probabilités, donc : $${texFraction(n[p], somme1)}\\times${texFraction(n[p] - 1, somme1 - 1)}=${texFraction(n[p] * (n[p] - 1), somme1 * (somme1 - 1))}${simplificationDeFractionAvecEtapes(n[p] * (n[p] - 1), somme1 * (somme1 - 1))}$.<br>`
          texteCorr += numAlpha(3) + ` Les probabilités des issues (${Initiale[q]},${Initiale[q]}) et (${Initiale[r]},${Initiale[r]}) peuvent être calculées de la même façon qu'à la question c) :<br>`
          texteCorr += `$${texFraction(n[q], somme1)}\\times${texFraction(n[q] - 1, somme1 - 1)}=${texFraction(n[q] * (n[q] - 1), somme1 * (somme1 - 1))}$.<br>`
          texteCorr += `$${texFraction(n[r], somme1)}\\times${texFraction(n[r] - 1, somme1 - 1)}=${texFraction(n[r] * (n[r] - 1), somme1 * (somme1 - 1))}$.<br>`
          texteCorr += `La probabilité qu'ils choisissent le même parfum est la somme des probabilités des issues (${Initiale[p]},${Initiale[p]}), (${Initiale[q]},${Initiale[q]}) et (${Initiale[r]},${Initiale[r]}), soit :<br>`
          texteCorr += `$${texFraction(n[p] * (n[p] - 1), somme1 * (somme1 - 1))}+${texFraction(n[q] * (n[q] - 1), somme1 * (somme1 - 1))}+${texFraction(n[r] * (n[r] - 1), somme1 * (somme1 - 1))}=${texFraction(n[p] * (n[p] - 1) + n[q] * (n[q] - 1) + n[r] * (n[r] - 1), somme1 * (somme1 - 1))}${simplificationDeFractionAvecEtapes(n[p] * (n[p] - 1) + n[q] * (n[q] - 1) + n[r] * (n[r] - 1), somme1 * (somme1 - 1))}$<br>`
          texteCorr += numAlpha(4) + ' Choisir des parfums différents est l\'événement contraire de l\'événement dont on a calculé la probabilité à la question d).<br>'
          fra1 = fractionSimplifiee(n[p] * (n[p] - 1) + n[q] * (n[q] - 1) + n[r] * (n[r] - 1), somme1 * (somme1 - 1))
          texteCorr += `La probabilité de cet événement est donc : $1-${texFraction(fra1[0], fra1[1])}=${texFraction(fra1[1], fra1[1])}-${texFraction(fra1[0], fra1[1])}=${texFraction(fra1[1] - fra1[0], fra1[1])}${simplificationDeFractionAvecEtapes(fra1[1] - fra1[0], fra1[1])}$`
          break
        case 1:
          p = randint(0, 3)
          if (randint(0, 1) === 0) { q = 32 } else { q = 52 }
          r = Math.floor(q / 33)
          Initiale[0] = choice(['sept', 'huit', 'neuf', 'dix', 'valet', 'roi', 'as'])
          Initiale[1] = choice(['deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'valet', 'roi', 'as'])
          texte = `On considère l'expérience consistant à tirer deux cartes dans un jeu de ${q} cartes.<br>`
          texte += 'Partie 1 : On effectue le tirage de la deuxième carte après remise de la première dans le jeu.<br>'
          texte += numAlpha(0) + ' Quelle est la probabilité de tirer 2 cartes de la même couleur (Rouge/Rouge ou Noire/Noire) ?<br>'
          texte += numAlpha(1) + ` Quelle est la probabilité de tirer 2 ${Initiale[r]}`
          if (Initiale[r] === 'valet' || Initiale[r] === 'roi') { texte += 's' }
          texte += ' ?<br>'
          texte += numAlpha(2) + ` Quelle est la probabilité de tirer 2 cartes de ${qualites[1][p]} ?<br>`
          texte += 'Partie 2 : On effectue le tirage de la deuxième carte sans remise de la première dans le jeu.<br>'
          texte += '    Reprendre les 3 questions de la partie 1 dans cette nouvelle expérience.'
          texteCorr = 'Partie 1.<br>    '
          texteCorr += numAlpha(0) + ` On ne s'intéresse ici qu'au tirage de la deuxième carte. En effet, pour réaliser l'événement, il faudra que cette carte soit de la même couleur que la première. Il y a deux couleurs (rouge et noire) et le nombre de cartes rouges est le même que le nombre de cartes noires : ${q / 2}.<br>`
          texteCorr += `    La probabilité que la deuxième carte soit de la même couleur que la première est donc : $${texFraction(q / 2, q)}=${texFraction(1, 2)}$.<br>`
          texteCorr += numAlpha(1) + ` Il y a 4 ${Initiale[r]}`
          if (Initiale[r] === 'valet' || Initiale[r] === 'roi') { texte += 's' }
          texteCorr += ` dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${Initiale[r]} est donc de $${texFraction(4, q)}=${texFractionReduite(4, q)}$.<br>`
          texteCorr += `    Comme la deuxième carte est tirée dans le jeu complet (après remise de la première), la probabilité de tirer un ${Initiale[r]} est la même pour cette carte.<br>`
          texteCorr += `    La probabilité de tirer 2 ${Initiale[r]}`
          if (Initiale[r] === 'valet' || Initiale[r] === 'roi') { texte += 's' }
          texteCorr += ` est donc : $${texFractionReduite(4, q)}\\times${texFractionReduite(4, q)}=${texFractionReduite(16, q * q)}$.<br>`
          texteCorr += numAlpha(2) + ` Il y a ${q / 4} cartes de ${qualites[1][p]} dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${qualites[1][p]} est donc de $${texFraction(q / 4, q)}=${texFraction(1, 4)}$.<br>`
          texteCorr += `    Comme la deuxième carte est tirée dans le jeu complet (après remise de la première) la probabilité de tirer un ${qualites[1][p]} est la même pour cette carte.<br>`
          texteCorr += `    La probabilité de tirer 2 ${qualites[1][p]}s est donc $${texFraction(1, 4)}\\times${texFraction(1, 4)}=${texFraction(1, 16)}$.<br>`
          texteCorr += 'Partie 2.<br>'
          texteCorr += numAlpha(0) + ` On ne s'intéresse ici qu'au tirage de la deuxième carte. En effet, pour réaliser l'événement, il faudra que cette carte soit de la même couleur que la première. Il y a maintenant une carte en moins dans la couleur désirée, soit  ${q / 2 - 1}, et il y a une carte en moins dans le jeu, soit ${q - 1}.<br>`
          texteCorr += `    La probabilité que la deuxième carte soit de la même couleur que la première est donc : $${texFraction(q / 2 - 1, q - 1)}$.<br>`
          texteCorr += numAlpha(1) + ` Il y a 4 ${Initiale[r]}`
          if (Initiale[r] === 'valet' || Initiale[r] === 'roi') { texte += 's' }
          texteCorr += ` dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${Initiale[r]} est donc de $${texFraction(4, q)}=${texFractionReduite(4, q)}$.<br>`
          texteCorr += `    Pour que l'événement se réalise la deuxième carte est tirée dans les ${q - 1} cartes restantes dans lesquelles il manque un ${Initiale[r]}.<br>`
          texteCorr += `    La probabilité de tirer un deuxième ${Initiale[r]} est donc : $${texFraction(3, q - 1)}$.`
          if (q === 52) { texteCorr += `$=${texFraction(1, 17)}$.` }
          texteCorr += `<br> La probabilité de tirer 2 ${Initiale[r]}`
          if (Initiale[r] === 'valet' || Initiale[r] === 'roi') { texte += 's' }
          texteCorr += ` est donc : $${texFractionReduite(4, q)}\\times${texFractionReduite(3, q - 1)}=${texFractionReduite(12, q * (q - 1))}$.<br>`
          texteCorr += numAlpha(2) + ` Il y a ${q / 4} cartes de ${qualites[1][p]} dans le jeu sur ${q} cartes possibles. La probabilité de tirer un ${qualites[1][p]} est donc de $${texFraction(q / 4, q)}=${texFraction(1, 4)}$.<br>`
          texteCorr += `    Pour que l'événement se réalise, la deuxième carte est tirée dans les ${q - 1} cartes restantes dans lesquelles il manque un ${qualites[1][p]}.<br>`
          texteCorr += `    La probabilité de tirer un deuxième ${qualites[1][p]} est donc : $${texFraction(q / 4 - 1, q - 1)}$.`
          if (q === 52) { texteCorr += `$=${texFraction(4, 17)}$<br>La probabilité de tirer 2 ${qualites[1][p]}s est donc $${texFraction(1, 4)}\\times${texFraction(4, 17)}=${texFraction(1, 17)}$.` } else { texteCorr += `<br>La probabilité de tirer 2 ${qualites[1][p]}s est donc $${texFraction(1, 4)}\\times${texFractionReduite(7, 31)}=${texFraction(7, 124)}$.` }
          break
        case 2:
          n[0] = randint(2, 5); m[0] = randint(2, 5)
          n[1] = randint(1, 6) + 1; m[1] = randint(1, 6) + 1
          n[2] = randint(1, 3) * 2; m[2] = randint(1, 3) * 2
          n[3] = randint(1, 4) + 2; m[3] = randint(1, 4) + 2
          n[4] = randint(2, 5); m[4] = randint(2, 5)
          somme1 = n[0] + n[1] + n[2] + n[3] + n[4]
          somme2 = m[0] + m[1] + m[2] + m[3] + m[4]
          r = randint(0, 4)
          p = randint(0, 4, [r])
          q = randint(0, 4, [p, r])
          texte = `Dans sa commode, ${quidam} a mis dans le premier tiroir des paires de chaussettes. Il y a `
          for (let j = 0; j < 3; j++) {
            texte += `${n[j]} paires de chaussettes ${qualites[2][j]}, `
          }
          texte += `${n[3]} paires de chaussettes ${qualites[2][3]} et ${n[4]} paires de chaussettes ${qualites[2][4]}.<br>`
          texte += `Dans le deuxième tiroir, ${quidam} a mis des T-shirt. Il y a `
          for (let j = 0; j < 3; j++) {
            texte += `${m[j]} T-shirt ${qualites[5][j]}, `
          }
          texte += `${m[3]} T-shirt ${qualites[5][3]} et ${m[4]} T-shirt ${qualites[5][4]}.<br>`
          texte += `Un matin, il y a une panne de courant et ${quidam} prend au hasard une paire de chaussettes dans le premier tiroir et un T-shirt dans le deuxième.<br>`
          texte += numAlpha(0) + ` Quelle est la probabilité que ${quidam} ait choisi des chaussettes et un T-shirt ${qualites[5][r]} ?<br>`
          texte += numAlpha(1) + ` Quelle est la probabilité que ${quidam} ait choisi des chaussettes et un T-shirt de la même couleur ?<br>`
          texte += numAlpha(2) + ` Quelle est la probabilité que ${quidam} ait choisi des chaussettes et un T-shirt de couleurs différentes ?`
          texteCorr = numAlpha(0) + ` Il y a ${n[r]} paires de chaussettes ${qualites[2][r]} et il y a ${somme1} paires de chaussettes possibles. `
          texteCorr += `La probabilité de choisir une paire de chaussettes ${qualites[2][r]} est : $${texFraction(n[r], somme1)}${simplificationDeFractionAvecEtapes(n[r], somme1)}$.<br>`
          texteCorr += `Il y a ${m[r]} T-shirt ${qualites[5][r]} et il y a ${somme2} T-shirt possibles. `
          texteCorr += `La probabilité de choisir un des T-shirt ${qualites[5][r]} est : $${texFraction(m[r], somme2)}${simplificationDeFractionAvecEtapes(m[r], somme2)}$.<br>`
          texteCorr += `${quidam} a donc $${texFractionReduite(m[r], somme2)}$ de `
          fra1 = fractionSimplifiee(n[r], somme1)
          fra2 = fractionSimplifiee(m[r], somme2)
          if (fra1[0] === 1) { texteCorr += 'une chance ' } else { texteCorr += `$${fra1[0]}$ chances ` }
          texteCorr += `sur $${fra1[1]}$ de choisir des chaussettes et un T-shirt ${qualites[5][r]}.<br>`
          texteCorr += `Soit $${texFractionReduite(m[r], somme2)}\\times${texFractionReduite(n[r], somme1)}=\\dfrac{${fra2[0]}\\times${fra1[0]}}{${fra2[1]}\\times${fra1[1]}}=${texFraction(fra1[0] * fra2[0], fra1[1] * fra2[1])}${simplificationDeFractionAvecEtapes(fra1[0] * fra2[0], fra1[1] * fra2[1])}$.<br>`
          p1 = fractionSimplifiee(fra1[0] * fra2[0], fra1[1] * fra2[1])
          fra1 = fractionSimplifiee(n[p], somme1)
          fra2 = fractionSimplifiee(m[p], somme2)
          texteCorr += numAlpha(1) + ` La probabilité de choisir une paire de chaussettes ${qualites[2][p]} est : $${texFraction(n[p], somme1)}${simplificationDeFractionAvecEtapes(n[p], somme1)}$ et `
          texteCorr += `La probabilité de choisir l'un des T-shirt ${qualites[5][p]} est : $${texFraction(m[p], somme2)}${simplificationDeFractionAvecEtapes(m[p], somme2)}$.<br>`
          texteCorr += `Donc la probabilité de choisir des chaussettes et un T-shirt ${qualites[5][p]} est : $${texFractionReduite(m[p], somme2)}\\times${texFractionReduite(n[p], somme1)}=\\dfrac{${fra2[0]}\\times${fra1[0]}}{${fra2[1]}\\times${fra1[1]}}=${texFraction(fra1[0] * fra2[0], fra1[1] * fra2[1])}${simplificationDeFractionAvecEtapes(fra1[0] * fra2[0], fra1[1] * fra2[1])}$.<br>`
          p2 = fractionSimplifiee(fra1[0] * fra2[0], fra1[1] * fra2[1])
          fra1 = fractionSimplifiee(n[q], somme1)
          fra2 = fractionSimplifiee(m[q], somme2)
          texteCorr += `La probabilité de choisir une paire de chaussettes ${qualites[2][q]} est : $${texFraction(n[q], somme1)}${simplificationDeFractionAvecEtapes(n[q], somme1)}$ et `
          texteCorr += `la probabilité de choisir l'un des T-shirt ${qualites[5][q]} est : $${texFraction(m[q], somme2)}${simplificationDeFractionAvecEtapes(m[q], somme2)}$.<br>`
          texteCorr += `Donc la probabilité de choisir des chaussettes et un T-shirt ${qualites[5][q]} est : $${texFractionReduite(m[q], somme2)}\\times${texFractionReduite(n[q], somme1)}=\\dfrac{${fra2[0]}\\times${fra1[0]}}{${fra2[1]}\\times${fra1[1]}}=${texFraction(fra1[0] * fra2[0], fra1[1] * fra2[1])}${simplificationDeFractionAvecEtapes(fra1[0] * fra2[0], fra1[1] * fra2[1])}$.<br>`
          p3 = fractionSimplifiee(fra1[0] * fra2[0], fra1[1] * fra2[1])
          texteCorr += 'On en déduit que la probabilité de choisir des chaussettes et un T-shirt de la même couleur est :<br>'
          texteCorr += `$${texFraction(p1[0], p1[1])}+${texFraction(p2[0], p2[1])}+${texFraction(p3[0], p3[1])}=`
          if (p1[1] === p2[1] && p2[1] === p3[1]) {
            texteCorr += `\\dfrac{${p1[0]}+${p2[0]}+${p3[0]}}{${p1[1]}}=${texFraction(p1[0] + p2[0] + p3[0], p1[1])}${simplificationDeFractionAvecEtapes(p1[0] + p2[0] + p3[0], p1[1])}$<br>`
            fra1 = fractionSimplifiee(p1[0] + p2[0] + p3[0], p1[1])
          } else {
            den = ppcm(p1[1], ppcm(p2[1], p3[1]))
            e = den / p1[1]
            f = den / p2[1]
            g = den / p3[1]
            texteCorr += `${texFraction(p1[0] * e, den)}+${texFraction(p2[0] * f, den)}+${texFraction(p3[0] * g, den)}=${texFraction(p1[0] * e + p2[0] * f + p3[0] * g, den)}${simplificationDeFractionAvecEtapes(p1[0] * e + p2[0] * f + p3[0] * g, den)}$<br>`
            fra1 = fractionSimplifiee(p1[0] * e + p2[0] * f + p3[0] * g, den)
          }
          texteCorr += numAlpha(2) + ' L\'événement "choisir des chaussettes et un T-shirt de couleurs différentes" est l\'événement contraire de l\'événement "choisir des chaussettes et un T-shirt de même couleur".<br>'
          texteCorr += `Donc sa probabilité est : $1-${texFraction(fra1[0], fra1[1])}=\\dfrac{${fra1[1]}-${fra1[0]}}{${fra1[1]}}=${texFraction(fra1[1] - fra1[0], fra1[1])}${simplificationDeFractionAvecEtapes(fra1[1] - fra1[0], fra1[1])}$<br>`
          break
        case 3:
          quidam = prenomM()
          quidame = prenomF()
          do {
            p = choice([4, 6, 8, 10, 12])
            q = choice([4, 6, 8, 10, 12], p)
            n[0] = Math.min(p, q) // petit dé de quidam
            m[0] = Math.max(p, q) // grand dé de quidam
            p1[0] = n[0] * m[0] // nombre de couples pour quidam
            p = choice([4, 6, 8, 10, 12], [n[0], m[0]])
            q = choice([4, 6, 8, 10, 12], [n[0], m[0], p])
            n[1] = Math.min(p, q) // petit dé de quidame
            m[1] = Math.max(p, q) // grand dé de quidame
            p1[1] = n[1] * m[1] // nombre de couples pour quidame
            somme1 = n[0] + m[0] // maximum pour quidam
            somme2 = n[1] + m[1] // maximum pour quidame
            r = Math.min(somme1, somme2) // Plus grand résultat commun.
          } while (n[0] + 1 > somme2)
          for (let j = 0; j < n[0] + m[0] - 1; j++) { fra1[j] = 0 }
          for (let j = 1; j <= n[0]; j++) {
            for (let k = 1; k <= m[0]; k++) {
              fra1[j + k - 2]++ // numérateurs de probas pour quidam = nombre d'occurences des différents résultats possibles
            }
          }
          for (let j = 0; j < n[1] + m[1] - 1; j++) { fra2[j] = 0 }
          for (let j = 1; j <= n[1]; j++) {
            for (let k = 1; k <= m[1]; k++) {
              fra2[j + k - 2]++ // numérateurs de probas pour quidame = nombre d'occurences des différents résultats possibles
            }
          }
          for (let j = 0; j < r - 1; j++) {
            p2[j] = fra2[j] / p1[1] - fra1[j] / p1[0] // différence entre les probas de l'un et de l'autre (positif si Quidame a plus de chance...)
          }

          texte = `${quidam} dispose d'un dé à ${n[0]} faces numérotées de 1 à ${n[0]} et d'un dé à ${m[0]} faces numérotées de 1 à ${m[0]}.<br>`
          texte += 'Il lance ses deux dés et en fait la somme.<br>'
          texte += numAlpha(0) + ' Reporter dans un tableau les issues possibles de cette expérience aléatoire et leurs probabilités respectives.<br>'
          texte += numAlpha(1) + ` ${quidame} dispose d'un dé à ${n[1]} faces numérotées de 1 à ${n[1]} et d'un dé à ${m[1]} faces numérotées de 1 à ${m[1]}.<br>`
          texte += `Elle décide de proposer un défi à ${quidam} : "On choisit un nombre cible entre 2 et ${r}, on lance nos deux dés en même temps. Le premier dont la somme des dés est la cible a gagné."<br>`
          texte += numAlpha(2) + ` ${quidam} qui connaît les probabilités calculées au 1) propose alors de choisir ${n[0] + 1} comme nombre cible. Il pense avoir plus de chances de gagner que ${quidame}. A-t-il raison ?<br>`
          texte += `Si oui, quel nombre doit choisir ${quidame} pour avoir un défi qui lui soit favorable et si non, y a-t-il un meilleur choix pour ${quidam} ?<br>`
          texte += numAlpha(3) + ' Y a-t-il un nombre cible qui donne un jeu équitable où chacun aura la même probabilité de gagner ?<br>'
          texte += '$\\textit {Exercice inspiré des problèmes DuDu (mathix.org)}$'
          texteCorr = numAlpha(0) + ` Les différents résultats de l'expérience de ${quidam} sont présentés dans cette table :<br>`
          // tableau d'addition des dé
          texteCorr += '$\\def\\arraystretch{1.5}\\begin{array}{|c'
          for (let j = 0; j <= m[0]; j++) { texteCorr += '|c' }
          texteCorr += '} \\hline  \\text{Dé 1/Dé 2}'
          for (let j = 1; j <= m[0]; j++) { texteCorr += '&' + j }
          for (let k = 1; k <= n[0]; k++) {
            texteCorr += ' \\\\\\hline ' + k
            for (let j = 1; j <= m[0]; j++) { texteCorr += `& \\textcolor {${Couleurs[(j + k) % 10]}}{${j + k}}` }
          }
          texteCorr += '\\\\\\hline\\end{array}$<br>'
          // fin du tableau
          texteCorr += 'Les probabilités de chaque issue sont données par ce tableau :<br>'
          // tableau des probas
          texteCorr += '$\\def\\arraystretch{2.5}\\begin{array}{|c'
          for (let j = 1; j <= somme1; j++) { texteCorr += '|c' }
          texteCorr += '} \\hline  \\text{résultats}'
          for (let j = 2; j <= somme1; j++) { texteCorr += '&' + j }
          texteCorr += ' \\\\\\hline \\text{Probabilité}'
          for (let j = 2; j <= somme1; j++) { texteCorr += `& \\textcolor {${Couleurs[j % 10]}}` + `{\\dfrac{${fra1[j - 2]}}{${p1[0]}}}` }

          texteCorr += '\\\\\\hline\\end{array}$<br>'
          // fin du tableau
          texteCorr += numAlpha(1) + ` Les probabilités en ce qui concerne ${quidame} sont données par le tableau ci-dessous :<br>`
          // tableau des probas pour quidame
          texteCorr += '$\\def\\arraystretch{2.5}\\begin{array}{|c'
          for (let j = 1; j <= somme2; j++) { texteCorr += '|c' }
          texteCorr += '} \\hline  \\text{Résultats}'
          for (let j = 2; j <= somme2; j++) { texteCorr += '&' + j }
          texteCorr += ' \\\\\\hline \\text{Probabilité}'
          for (let j = 2; j <= somme2; j++) { texteCorr += `& \\textcolor {${Couleurs[j % 10]}}` + `{\\dfrac{${fra2[j - 2]}}{${p1[1]}}}` }
          texteCorr += '\\\\\\hline\\end{array}$<br>'

          texteCorr += `La probabilité qu'a ${quidame} de faire ${n[0] + 1} est : $\\textcolor {${Couleurs[(n[0] + 1) % 10]}}{${texFraction(fra2[n[0] - 1], p1[1])}}${simplificationDeFractionAvecEtapes(fra2[n[0] - 1], p1[1])}$.<br>`
          texteCorr += `La probabilité qu'a ${quidam} de faire ${n[0] + 1} est : $\\textcolor {${Couleurs[(n[0] + 1) % 10]}}{${texFraction(fra1[n[0] - 1], p1[0])}}${simplificationDeFractionAvecEtapes(fra1[n[0] - 1], p1[0])}$.<br>`
          if (p2[n[0] - 1] > 0) { // Si quidame a plus de chance de gagner avec le choix de quidam
            texteCorr += `${quidam} se trompe en croyant avoir plus de chances de gagner car $${texFractionReduite(fra2[n[0] - 1], p1[1])}>${texFractionReduite(fra1[n[0] - 1], p1[0])}$.<br>`
            // choix du nombre cible qui favorise quidam
            trouve = false
            for (let j = r - 2; j >= 0; j--) {
              if (p2[j] < 0) {
                texteCorr += numAlpha(2) + ` ${quidam} aurait du choisir ${j + 2} comme nombre cible.<br> Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${texFraction(fra1[j], p1[0])}}${simplificationDeFractionAvecEtapes(fra1[j], p1[0])}$ et celle de ${quidame} serait de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${texFraction(fra2[j], p1[1])}}${simplificationDeFractionAvecEtapes(fra2[j], p1[1])}$.<br>`
                trouve = true
              }
              if (trouve === true) { break }
            }
            if (trouve === false) {
              texteCorr += numAlpha(2) + ` Il n'existe pas de choix qui permette à ${quidam} d'avoir plus de chance que ${quidame} de gagner.`
            }
          } else // quidam a plus de chances de gagner
          if (p2[n[0] - 1] < 0) {
            texteCorr += `${quidam} a raison de penser avoir plus de chances de gagner car $${texFractionReduite(fra2[n[0] - 1], p1[1])}<${texFractionReduite(fra1[n[0] - 1], p1[0])}$.<br>`
            // choix du nombre cible qui favorise quidame
            trouve = false
            for (let j = r - 2; j >= 0; j--) {
              if (p2[j] > 0) {
                texteCorr += numAlpha(2) + ` ${quidame} devrait choisir ${j + 2} comme nombre cible.<br>Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${texFraction(fra2[j], p1[1])}}${simplificationDeFractionAvecEtapes(fra2[j], p1[1])}$.<br>Celle de ${quidam} serait de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${texFraction(fra1[j], p1[0])}}${simplificationDeFractionAvecEtapes(fra1[j], p1[0])}$ et $${texFractionReduite(fra1[j], p1[0])}<${texFraction(fra2[j], p1[1])}$.<br>`
                trouve = true
              }
              if (trouve === true) { break }
            }
            if (trouve === false) {
              texteCorr += numAlpha(2) + ` Il n'existe pas de choix qui permette à ${quidame} d'avoir plus de chance que ${quidam} de gagner.<br>`
            }
          } else { // Ils ont autant de chances de gagner l'un que l'autre
            texteCorr += `${quidam} et ${quidame} ont autant de chances de gagner car ils ont tous deux la même probabilité de faire ${n[0] + 1}, ce qui répond à la question ${numAlpha(3)}.<br>`
            // choix du nombre cible qui favorise quidam
            trouve = false
            for (let j = r - 2; j >= 0; j--) {
              if (p2[j] < 0) {
                texteCorr += numAlpha(2) + ` ${quidam} aurait du choisir ${j + 2} comme nombre cible.<br> Sa probabilité de réussir serait alors de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${texFraction(fra1[j], p1[0])}}${simplificationDeFractionAvecEtapes(fra1[j], p1[0])}$ et celle de ${quidame} serait de $\\textcolor {${Couleurs[(j + 2) % 10]}}{${texFraction(fra2[j], p1[1])}}${simplificationDeFractionAvecEtapes(fra2[j], p1[1])}$.<br>`
                trouve = true
              }
              if (trouve === true) { break }
            }
            if (trouve === false) {
              texteCorr += numAlpha(2) + ` Il n'existe pas de choix qui permette à ${quidam} d'avoir plus de chance que ${quidame} de gagner.<br>`
            }
          }
          if (p2[n[0] - 1] === 0) {
            texteCorr += numAlpha(3) + ` Il a été déjà répondu à cette question à la question ${numAlpha(1)}.<br>`
          } else { // choix de la cible pour un jeu équitable
            trouve = false
            for (let j = r - 2; j >= 0; j--) {
              if (p2[j] === 0) {
                texteCorr += numAlpha(3) + ` En choisissant ${j + 2} comme cible, ${quidam} et ${quidame} ont la même probabilité de gagner.<br>
                                Pour ${quidam} la probabilité est : $\\textcolor {${Couleurs[(j + 2) % 10]}}{${texFraction(fra1[j], p1[0])}}${simplificationDeFractionAvecEtapes(fra1[j], p1[0])}$ tout comme pour ${quidame} : $\\textcolor {${Couleurs[(j + 2) % 10]}}{${texFraction(fra2[j], p1[1])}}${simplificationDeFractionAvecEtapes(fra2[j], p1[1])}$.<br>`
                trouve = true
              }
              if (trouve === true) { break }
            }
            if (trouve === false) {
              texteCorr += numAlpha(3) + ` Il n'existe pas de choix qui permette à ${quidam} et à ${quidame} d'avoir la même probabilité de gagner car : <br>`
              for (let j = 2; j < r / 2; j++) {
                texteCorr += `$\\textcolor {${Couleurs[(j) % 10]}}{${texFraction(fra1[j - 2], p1[0])}}\\ne \\textcolor {${Couleurs[(j) % 10]}}{${texFraction(fra2[j - 2], p1[1])}}$ ; `
              }
              texteCorr += `et $\\textcolor {${Couleurs[(r / 2) % 10]}}{${texFraction(fra1[r / 2], p1[0])}}\\ne \\textcolor {${Couleurs[(r / 2) % 10]}}{${texFraction(fra2[r / 2], p1[1])}}$.`
            }
          }
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
}
