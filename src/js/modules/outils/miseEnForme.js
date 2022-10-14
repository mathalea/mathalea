/** @module mise en forme */

import { context } from '../context'
import { setReponse } from '../gestionInteractif'
import { getVueFromUrl } from '../gestionUrl'
import { nombreDeChiffresDansLaPartieDecimale, nombreDeChiffresDe } from './decimales'
import { htmlConsigne, htmlEnumerate, htmlLigne, htmlParagraphe } from './htmlMiseEnForme'
import { texConsigne, texEnumerate, texIntroduction, texMulticols, texParagraphe } from './texMiseEnForme'

/**
 * Affecte les propriétés contenu et contenuCorrection (d'après les autres propriétés de l'exercice)
 * @param {Exercice} exercice
 */
export function listeQuestionsToContenu (exercice) {
  if (context.isHtml) {
    exercice.contenu = htmlConsigne(exercice.consigne) + htmlParagraphe(exercice.introduction) + htmlEnumerate(exercice.listeQuestions, exercice.spacing, 'question', `exercice${exercice.numeroExercice}Q`, exercice.tailleDiaporama)
    if ((exercice.interactif && exercice.interactifReady) || getVueFromUrl() === 'eval') {
      exercice.contenu += `<button class="ui blue button checkReponses" type="submit" style="margin-bottom: 20px; margin-top: 20px" id="btnValidationEx${exercice.numeroExercice}-${exercice.id}">Vérifier les réponses</button>`
    }
    exercice.contenuCorrection = htmlParagraphe(exercice.consigneCorrection) + htmlEnumerate(exercice.listeCorrections, exercice.spacingCorr, 'correction', `correction${exercice.numeroExercice}Q`, exercice.tailleDiaporama)
  } else {
    let vspace = ''
    if (exercice.vspace) {
      vspace = `\\vspace{${exercice.vspace} cm}\n`
    }
    if (!context.isAmc) {
      if (document.getElementById('supprimer_reference').checked === true) {
        exercice.contenu = texConsigne(exercice.consigne) + vspace + texIntroduction(exercice.introduction) + texMulticols(texEnumerate(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
      } else {
        exercice.contenu = texConsigne(exercice.consigne) + `\n\\marginpar{\\footnotesize ${exercice.id}}` + vspace + texIntroduction(exercice.introduction) + texMulticols(texEnumerate(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
      }
    }
    exercice.contenuCorrection = texConsigne('') + texIntroduction(exercice.consigneCorrection) + texMulticols(texEnumerate(exercice.listeCorrections, exercice.spacingCorr), exercice.nbColsCorr)
    exercice.contenuCorrection = exercice.contenuCorrection.replace(/\\\\\n*/g, '\\\\\n')
    exercice.contenu = exercice.contenu.replace(/\\\\\n*/g, '\\\\\n')
  }
}

export function exerciceSimpleToContenu (exercice) {
  const listeQuestions = []
  const listeCorrections = []
  for (let i = 0, cpt = 0; i < exercice.nbQuestions & cpt < 50; cpt++) {
    if (exercice.questionJamaisPosee(i, exercice.question)) {
      if (context.isAmc) {
        listeQuestions.push(exercice.question + '<br>')
        listeCorrections.push(exercice.correction)
      } else {
        listeQuestions.push(exercice.question)
        listeCorrections.push(exercice.correction)
      }
      if (context.isAmc && exercice.amcType === 'AMCNum') {
        setReponse(exercice, i, exercice.reponse, {
          digits: nombreDeChiffresDe(exercice.reponse),
          decimals: nombreDeChiffresDansLaPartieDecimale(exercice.reponse),
          signe: exercice.reponse < 0,
          approx: 0
        })
      }
      exercice.nouvelleVersion()
      i++
    }
  }
  exercice.listeQuestions = listeQuestions
  exercice.listeCorrections = listeCorrections
  listeQuestionsToContenu(exercice)
}

/**
   * FIXME À documenter
   * @param {Exercice} exercice
   */
export function listeDeChosesAImprimer (exercice) {
  if (context.isHtml) {
    exercice.contenu = htmlLigne(exercice.listeQuestions, exercice.spacing)
    exercice.contenuCorrection = ''
  } else {
    // let vspace = ''
    // if (exercice.vspace) {
    //   vspace = `\\vspace{${exercice.vspace} cm}\n`
    // }
    if (document.getElementById('supprimer_reference').checked === true) {
      exercice.contenu = texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
    } else {
      exercice.contenu = `\n\\marginpar{\\footnotesize ${exercice.id}}` + texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
    }
    exercice.contenuCorrection = ''
  }
}

/**
   * Utilise liste_questions et liste_corrections pour remplir contenu et contenuCorrection
   * La liste des questions devient une liste HTML ou LaTeX avec html_ligne() ou tex_paragraphe()
   * @param {Exercice} exercice
   * @author Rémi Angot
   */
export function listeQuestionsToContenuSansNumero (exercice, retourCharriot = true) {
  // En vue diapCorr, les questions doivent toujours être numérotées car venant d'exercices différents
  if (context.vue === 'diapCorr') {
    listeQuestionsToContenu(exercice, retourCharriot = true)
  } else {
    if (context.isHtml) {
      exercice.contenu = htmlConsigne(exercice.consigne) + htmlParagraphe(exercice.introduction) + htmlEnumerate(exercice.listeQuestions, exercice.spacing, 'question', `exercice${exercice.numeroExercice}Q`, exercice.tailleDiaporama, 'sansNumero')
      if ((exercice.interactif && exercice.interactifReady) || getVueFromUrl() === 'eval') {
        exercice.contenu += `<button class="ui blue button checkReponses" type="submit" style="margin-bottom: 20px; margin-top: 20px" id="btnValidationEx${exercice.numeroExercice}-${exercice.id}">Vérifier les réponses</button>`
      }
      exercice.contenuCorrection = htmlParagraphe(exercice.consigneCorrection) + htmlEnumerate(exercice.listeCorrections, exercice.spacingCorr, 'correction', `correction${exercice.numeroExercice}Q`, exercice.tailleDiaporama, 'sansNumero')
    } else {
      if (document.getElementById('supprimer_reference').checked === true) {
        exercice.contenu = texConsigne(exercice.consigne) + texIntroduction(exercice.introduction) + texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing, retourCharriot), exercice.nbCols)
      } else {
        exercice.contenu = texConsigne(exercice.consigne) + `\n\\marginpar{\\footnotesize ${exercice.id}}` + texIntroduction(exercice.introduction) + texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing, retourCharriot), exercice.nbCols)
      }
      // exercice.contenuCorrection = texConsigne(exercice.consigneCorrection) + texMulticols(texEnumerateSansNumero(exercice.listeCorrections,exercice.spacingCorr),exercice.nbColsCorr)
      exercice.contenuCorrection = texConsigne(exercice.consigneCorrection) + texMulticols(texParagraphe(exercice.listeCorrections, exercice.spacingCorr, retourCharriot), exercice.nbColsCorr)
    }
  }
}

/**
   * Utilise liste_questions et liste_corrections pour remplir contenu et contenuCorrection
   *
   * Uniquement en version LaTeX
   * La liste des questions devient une liste HTML ou LaTeX avec html_ligne() ou tex_paragraphe()
   * @param {Exercice} exercice
   * @author Rémi Angot
   */
export function listeQuestionsToContenuSansNumeroEtSansConsigne (exercice) {
  if (document.getElementById('supprimer_reference').checked === true) {
    exercice.contenu = texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
  } else {
    exercice.contenu = `\n\\marginpar{\\footnotesize ${exercice.id}` + texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
  }
  // exercice.contenuCorrection = texConsigne(exercice.consigneCorrection) + texMulticols(texEnumerateSansNumero(exercice.listeCorrections,exercice.spacingCorr),exercice.nbColsCorr)
  exercice.contenuCorrection = texMulticols(texParagraphe(exercice.listeCorrections, exercice.spacingCorr), exercice.nbColsCorr)
}
/**
   *
   * @param {string} texte
   * @returns le texte centré dans la page selon le contexte.
   * @author Jean-Claude Lhote
   */
export function centrage (texte) {
  return context.isHtml ? `<center>${texte}</center>` : `\\begin{center}\n\t${texte}\n\\end{center}\n`
}
