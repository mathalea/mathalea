import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { range } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { simplificationDeFractionAvecEtapes, texFraction } from '../../modules/outils/arrayFractions.js'
import { numAlpha } from '../../modules/outils/contextSensitif.js'
import { prenom } from '../../modules/outils/objetsPersonnes.js'
export const titre = 'Calculer des probabilités dans une expérience aléatoire à une épreuve'

/**
 * Calculs de probabilités sur une expérience aléatoire à une épreuve.
 * @author Jean-Claude Lhote
 * Référence 5S21
 * Ajout de la partie vocabulaire (this.sup !== 1) par Guillaume Valmont le 03/04/2022
 * Remplacement des this.sup par des this.niveau par Guillaume Valmont le 07/05/2022
 */
export const uuid = '69e1f'
export const ref = '5S21'
export default function FonctionsProbabilite1 () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 4
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  context.isHtml ? this.spacing = 2 : this.spacing = 1
  context.isHtml ? this.spacingCorr = 3 : this.spacingCorr = 1
  this.niveau = 1

  function singulier (qualite, index1) {
    if (index1 > 1) {
      return qualite.slice(0, -1)
    } else {
      return qualite
    }
  }

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const listeIndexDisponibles = [0, 1, 2, 3, 4, 5, 6]
    const listeIndex = combinaisonListes(listeIndexDisponibles, this.nbQuestions)
    const listeDeLieuxChoses = [['le frigo', 'yaourt', 'yaourts'], ['le frigo', 'dessert lacté', 'desserts lactés'], ['une urne', 'boule', 'boules'], ['une urne', 'jeton', 'jetons'], ['un paquet de bonbons', 'nounours', 'nounours'], ['un tiroir de la commode', 't-shirt', 't-shirts'], ['un tas de jetons de poker', 'jeton', 'jetons']]
    const qualites = [[]]
    qualites[0] = ['à la fraise', 'à la vanille', 'à l\'abricot', 'à l\'ananas', 'à la cerise']
    qualites[1] = ['au chocolat', 'à la vanille', 'au café', 'à la pistache', 'au caramel']
    qualites[2] = ['rouges', 'vertes', 'bleues', 'noires', 'blanches']
    qualites[3] = ['oranges', 'cyans', 'roses', 'jaunes', 'violets']
    qualites[4] = ['rouges', 'verts', 'bleus', 'noirs', 'jaunes']
    qualites[5] = ['rouges', 'verts', 'bleus', 'noirs', 'blancs']
    qualites[6] = ['rouges', 'verts', 'bleus', 'noirs', 'jaunes']
    for (let i = 0, p, m, q, somme, quidam, index1, lieu, objet, objets, article, pronom, defini, n = [], texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      index1 = listeIndex[i]
      if (index1 === 2) { article = 'une'; pronom = 'elles'; defini = 'si elle' } else { article = 'un'; pronom = 'eux'; defini = 's\'il' }
      quidam = prenom()
      lieu = listeDeLieuxChoses[index1][0]
      objet = listeDeLieuxChoses[index1][1]
      objets = listeDeLieuxChoses[index1][2]
      n[0] = randint(2, 5)
      n[1] = randint(1, 6) + 1
      n[2] = randint(1, 3) * 2
      n[3] = randint(1, 4) + 2
      n[4] = randint(2, 5)

      somme = n[0] + n[1] + n[2] + n[3] + n[4]
      m = randint(0, 4)
      p = randint(0, 4, [m])
      q = randint(0, 4, [p, m])
      const indexEvenementContraire = range(4, [m, p])

      texte = `Dans ${lieu} il y a ${somme} ${objets}. ${n[0]} sont ${qualites[index1][0]}, ${n[1]} sont ${qualites[index1][1]}, ${n[2]} sont ${qualites[index1][2]}, ${n[3]} sont ${qualites[index1][3]} et ${n[4]} sont ${qualites[index1][4]}.<br> `
      texte += `${quidam} choisit au hasard l'${article} d'entre ${pronom}.<br> `
      if (parseInt(this.niveau) === 1) {
        texte += numAlpha(0) + ` Quelle est la probabilité que son choix tombe sur l'${article} des ${objets} ${qualites[index1][m]} ?<br>`
        texte += numAlpha(1) + ` Quelle est la probabilité que son choix tombe sur l'${article} des ${objets} ${qualites[index1][p]} ?<br>`
        texte += numAlpha(2) + ` Quelle est la probabilité que son choix ne tombe pas sur l'${article} des ${objets} ${qualites[index1][q]} ?<br>`
        texte += numAlpha(3) + ` Quelle est la probabilité que son choix tombe sur l'${article} des ${objets} ${qualites[index1][m]} ou ${qualites[index1][p]} ?<br>`
        texteCorr = 'On est dans une situation d\'équiprobabilité donc la probabilité est donnée par le quotient du nombre de cas favorables par le nombre de cas au total.<br>'
        texteCorr += numAlpha(0) + ` Il y a ${n[m]} ${objets} ${qualites[index1][m]} et il y a ${somme} ${objets} possibles. La probabilité que son choix tombe sur l'${article} des ${objets} ${qualites[index1][m]} est :<br> $${texFraction(n[m], somme)}${simplificationDeFractionAvecEtapes(n[m], somme)}$.<br>`
        texteCorr += numAlpha(1) + ` Il y a ${n[p]} ${objets} ${qualites[index1][p]} et il y a ${somme} ${objets} possibles. La probabilité que son choix tombe sur l'${article} des ${objets} ${qualites[index1][p]} est :<br> $${texFraction(n[p], somme)}${simplificationDeFractionAvecEtapes(n[p], somme)}$.<br>`
        texteCorr += numAlpha(2) + ` Il y a ${n[q]} ${objets} ${qualites[index1][q]}, donc il y a ${somme} $-$ ${n[q]} $=$ ${somme - n[q]} autres ${objets} et il y a ${somme} ${objets} possibles. La probabilité que son choix ne tombe pas sur l'${article} des ${objets} ${qualites[index1][q]} est :<br> $${texFraction(somme - n[q], somme)}${simplificationDeFractionAvecEtapes(somme - n[q], somme)}$.<br>`
        texteCorr += numAlpha(3) + ` La probabilité d'un événement est la somme des probabilités des issues qui le composent. Donc la probabilité que son choix tombe sur l'${article} des ${objets} ${qualites[index1][m]} ou ${qualites[index1][p]} est :<br> $${texFraction(n[m], somme)}+${texFraction(n[p], somme)}=${texFraction(n[p] + n[m], somme)}${simplificationDeFractionAvecEtapes(n[p] + n[m], somme)}$.<br>`
      } else {
        texte += numAlpha(0) + ' Est-ce que c\'est une expérience aléatoire ? Pourquoi ?<br>'
        texteCorr = '<br>' + numAlpha(0) + ` On sait qu'on tombera sur ${article} ${objet} mais on ne sait pas ${defini} sera ${singulier(qualites[index1][0], index1)}, ${singulier(qualites[index1][1], index1)}, ${singulier(qualites[index1][2], index1)}, ${singulier(qualites[index1][3], index1)} ou ${singulier(qualites[index1][4], index1)}.<br>On ne peut pas prévoir à l'avance le résultat, c'est donc une expérience aléatoire.<br>`
        texte += numAlpha(1) + ' Quelles sont les issues ?<br>'
        texteCorr += numAlpha(1) + `Les issues sont :<br>
        - tomber sur ${article} ${objet} ${singulier(qualites[index1][0], index1)} ;<br>
        - tomber sur ${article} ${objet} ${singulier(qualites[index1][1], index1)} ;<br>
        - tomber sur ${article} ${objet} ${singulier(qualites[index1][2], index1)} ;<br>
        - tomber sur ${article} ${objet} ${singulier(qualites[index1][3], index1)} ;<br>
        - tomber sur ${article} ${objet} ${singulier(qualites[index1][4], index1)}.<br>`
        texte += numAlpha(2) + ` Quelles issues réalisent l'événement "Tomber sur l'${article} des ${objets} ${qualites[index1][m]} ou ${qualites[index1][p]}" ?<br>`
        texteCorr += numAlpha(2) + `Les issues qui réalisent l'événement "Tomber sur l'${article} des ${objets} ${qualites[index1][m]} ou ${qualites[index1][p]}" sont :<br>
        - tomber sur ${article} ${objet} ${singulier(qualites[index1][m], index1)} ;<br>
        - tomber sur ${article} ${objet} ${singulier(qualites[index1][p], index1)}.<br>`
        if (parseInt(this.niveau) > 2) {
          texte += numAlpha(3) + ` Quel est l'événement contraire de "Tomber sur l'${article} des ${objets} ${qualites[index1][m]} ou ${qualites[index1][p]}" ?<br>`
          texteCorr += numAlpha(3) + ` L'événement contraire de "Tomber sur l'${article} des ${objets} ${qualites[index1][m]} ou ${qualites[index1][p]}" est l'événement "Tomber sur l'${article} des ${objets} ${qualites[index1][indexEvenementContraire[0]]}, ${qualites[index1][indexEvenementContraire[1]]} ou ${qualites[index1][indexEvenementContraire[2]]}".`
        } else {
          texte += numAlpha(3) + ` Quelles issues ne réalisent pas l'événement "Tomber sur l'${article} des ${objets} ${qualites[index1][q]} ou ${qualites[index1][m]}" ?<br>`
          texteCorr += numAlpha(3) + ` Les issues qui ne réalisent pas l'événement "Tomber sur l'${article} des ${objets} ${qualites[index1][m]} ou ${qualites[index1][p]}" sont :<br>
          - tomber sur ${article} ${objet} ${singulier(qualites[index1][indexEvenementContraire[0]], index1)} ;<br>
          - tomber sur ${article} ${objet} ${singulier(qualites[index1][indexEvenementContraire[1]], index1)} ;<br>
          - tomber sur ${article} ${objet} ${singulier(qualites[index1][indexEvenementContraire[2]], index1)}.`
        }
      }
      if (this.questionJamaisPosee(i, n[0], n[1], n[2], n[3], n[4], m, p, q)) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
}
