import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, randint, texNombrec, texNombre2, calcul, choice, texFraction, shuffle2tableaux, chercheMinMaxFonction } from '../../modules/outils.js'

export const amcReady = true

export const titre = 'Multiplication par 0,1 ; 0,01 ; 0,001 (Placer la virgule)'

/**
 * @Auteur Jean-claude Lhote
 * Publié le 20/02/2021
 * Référence 6C30-4
 */
export default function PlacerLaVirgule () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 4 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.consigne = 'Les égalités suivantes sont fausses. Place la virgule correctement dans le résultat pour que l\'égalité soit juste.'
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  this.qcmDisponible = true
  this.modeQcm = false
  this.sup = false

  //  this.modeQcm = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function (numeroExercice) {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    // On exporte le numéro de l'exercice pour adapter l'id du bouton de validation du QCM
    this.numeroExercice = numeroExercice

    this.qcm = ['6C30-4', [], 'Multiplication par 0,1 ; 0,01 ; 0,001 (Placer la virgule)', 1]

    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const rang = ['millièmes', 'centièmes', 'dixièmes']
    let espace = ''
    // eslint-disable-next-line no-undef
    if (sortieHtml) {
      espace = '&emsp;'
    } else {
      espace = '\\qquad'
    }
    this.tableauPropositionsDuQcm = []
    this.tableauSolutionsDuQcm = []
    for (let i = 0, texte, texteCorr, coef, nombre, nombreentier, resultat, exposant, tabrep, tabicone, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      coef = -randint(1, 3)
      if (!this.sup) {
        exposant = -randint(1, 3)
      } else {
        exposant = 0
      }
      nombreentier = calcul(randint(10, 1000) + randint(10, 999) * choice([0, 1000]))
      nombre = calcul(nombreentier * 10 ** exposant)
      resultat = calcul(nombre * 10 ** coef)
      tabrep = [`$${texNombre2(resultat)}$`, `$${texNombre2(calcul(resultat / 10))}$`, `$${texNombre2(calcul(resultat * 10))}$`, `$${texNombre2(calcul(resultat / 100))}$`]
      tabicone = [1, 0, 0, 0]
      this.qcm[1].push([`Ou doit être placée la virgule dans le résultat ? $${texNombre2(nombre)} \\times ${texNombre2(calcul(10 ** coef))}~~ = ~~\\ldots\\ldots\\ldots\\ldots$.\\\\ \n`,
        tabrep,
        tabicone])

      texte = `$${texNombre2(nombre)} \\times ${texNombre2(calcul(10 ** coef))}~~ = ~~\\phantom{......}${texNombre2(nombreentier)}$<br>`
      // eslint-disable-next-line no-undef
      if (this.modeQcm && !mathalea.sortieAMC) {
        texte += `<br>  Réponses possibles : ${espace}  <form id="formEx${numeroExercice}Q${i}">`
        shuffle2tableaux(tabrep, tabicone)
        for (let rep = 0; rep < tabrep.length; rep++) {
          // texte += `$\\square\\;$ ${tabrep[i]}` + espace
          texte += `<div class="ui checkbox">
          <input type="checkbox" tabindex="0" class="hidden" id="checkEx${numeroExercice}Q${i}R${rep}">
          <label id="labelEx${numeroExercice}Q${i}R${rep}">${tabrep[rep] + espace}</label>
        </div>`
          if (tabicone[rep] === 1) {
            texteCorr += `$\\blacksquare\\;$ ${tabrep[rep]}` + espace
          } else {
            texteCorr += `$\\square\\;$ ${tabrep[rep]}` + espace
          }
        }
        texte += '</form>'
        this.tableauPropositionsDuQcm[i] = tabrep
        this.tableauSolutionsDuQcm[i] = tabicone
      } else {
        texteCorr = `Quand on multiplie par $${texNombre2(calcul(10 ** coef))}=${texFraction(1, calcul(10 ** (-coef)))}$ chaque chiffre prend une valeur $${texNombrec(10 ** (-coef))}$ fois plus petite.<br>`
        texteCorr += `Le chiffre des unités se positionne donc dans les ${rang[3 + coef]} :<br>`
        texteCorr += `$${texNombre2(nombre)} \\times ${texNombre2(calcul(10 ** coef))} = ${texNombre2(resultat)}$`// ${texNombrec(Math.floor(resultat))}${miseEnEvidence(',')}${texNombrec(resultat-Math.floor(resultat)).replace('0,','')}$`
      }
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

  this.besoinFormulaireCaseACocher = ['Nombres entiers', true]
  // this.besoin_formulaire2_case_a_cocher = ["Mode QCM",false];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]

  // On attend que les exercices soient affichés pour tester la présence du bouton
  document.addEventListener('exercicesAffiches', () => {
    // On active les checkbox
    $('.ui.checkbox').checkbox()
    const monRouge = 'rgba(217, 30, 24, 0.5)'
    const monVert = 'rgba(123, 239, 178, 0.5)'
    const button = document.querySelector(`#btnQcmEx${this.numeroExercice}`)
    if (button) {
      button.addEventListener('click', event => {
        for (let i = 0; i < this.nbQuestions; i++) {
          this.tableauPropositionsDuQcm[i].forEach((proposition, rep) => {
            const label = document.querySelector(`#labelEx${this.numeroExercice}Q${i}R${rep}`)
            const check = document.querySelector(`#checkEx${this.numeroExercice}Q${i}R${rep}`)
            // FIX-ME il faudrait empêcher les élèves de changer leur réponse après vérification
            check.classList.add('disabled')
            if (this.tableauSolutionsDuQcm[i][rep] === 1) {
              label.style.backgroundColor = monVert
            } else if (check.checked === true) {
              label.style.backgroundColor = monRouge
            }
          })
        }
      })
    }
  })
} // Fin de l'exercice.
