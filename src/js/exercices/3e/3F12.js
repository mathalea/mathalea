import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, randint, combinaisonListesSansChangerOrdre, texEnumerate, miseEnEvidence, itemize, tikz_machine_diag, num_alpha, tex_cadre_par_orange } from '../../modules/outils.js'
import { SVG_machine_diag_3F12 } from '../../modules/macroSvgJs.js'
export const titre = 'Fonctions : Calculs d’images'

/**
 * 3F12 Notion de fonction - Vocabulaire
 * Déterminer à partir de plusieurs modes de représentation l'image d'un nombre
 * @author Sébastien LOZANO
 */
export default function fonctions_calculs_d_images () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1
  this.titre = titre
  // pas de différence entre la version html et la version latex pour la consigne
  this.consigne = ''
  // pas de différence entre la version html et la version latex pour la consigne
  this.consigne += 'Calcule les images avec la méthode demandée.'

  sortieHtml ? this.spacing = 2 : this.spacing = 1
  sortieHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.nbQuestions = 4
  // this.correctionDetailleeDisponible = true;
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 5

  const num_ex = '3F12' // pour rendre unique les id des SVG, en cas d'utilisation dans plusieurs exercices y faisant appel

  if (sortieHtml) {
    var pourcentage = '100%' // pour l'affichage des svg. On a besoin d'une variable globale
  } else { // sortie LaTeX
  };
  this.nouvelleVersion = function (numeroExercice) {
    let type_de_questions
    if (sortieHtml) { // les boutons d'aide uniquement pour la version html
      //			 this.boutonAide = modalPdf(numeroExercice,"assets/pdf/FicheFonctions-3F1-act.pdf","Aide mémoire sur les fonctions (Sébastien Lozano)","Aide mémoire")
      //			 this.boutonAide += modal_video('videoTest','/videos/Fonctions.mp4','Petit conte mathématique','Intro Vidéo');
    }
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let type_de_questions_disponibles = []
    if (this.sup == 1) {
      type_de_questions_disponibles = [1] // prog de calcul
    } else if (this.sup == 2) {
      type_de_questions_disponibles = [2] // diagramme
    } else if (this.sup == 3) {
      type_de_questions_disponibles = [3] // f(x) = ...
    } else if (this.sup == 4) {
      type_de_questions_disponibles = [4] // f : x ---> ...
    } else if (this.sup == 5) {
      type_de_questions_disponibles = [1, 2, 3, 4] // mélange
    };
    // let type_de_questions_disponibles = [1];
    const liste_type_de_questions = combinaisonListesSansChangerOrdre(type_de_questions_disponibles, this.nbQuestions)

    for (let i = 0, a, b, c, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      type_de_questions = liste_type_de_questions[i]

      if (sortieHtml) {
        const id_unique = `${num_ex}_${i}_${Date.now()}`
        var id_du_div = `div_svg${numeroExercice}${id_unique}`
        var id_du_div_corr = `div_svg_corr${numeroExercice}${id_unique}`
      }
      // on part sur de l'affine avec coeff positifs, on verra ensuite
      a = randint(2, 9)
      b = randint(2, 9)
      c = randint(2, 9)

      switch (type_de_questions) {
        case 1:
          var j = 0 // pour la sous-numérotation
          texte = 'On donne le programme de calcul suivant qui correspond à une certaine fonction :'
          texteCorr = 'Avec ce programme de calcul :'
          if (sortieHtml) {
            texte += `
							<br>
							<div class="ui compact warning message">		
							<p>							
							- Choisir un nombre<br>
							- Multiplier ce nombre par ${a}<br>
							- Ajouter ${b} au résultat obtenu<br>
							</p>
							</div>
							<br>`
            // sous-question a/
            texte += num_alpha(j) + ` Appliquer ce programme de calcul au nombre ${c}<br>`
            texteCorr += '<br>' + num_alpha(j) + `
							<br>
							<div class="ui compact warning message">		
							<p>							
							- On choisit le nombre ${c}<br>
							- On multiplie ce nombre par ${a} : ${a}$\\times$ ${c} = ${a * c}<br>
							- On ajoute ${b} au résultat obtenu : ${a * c}+${b}=${a * c + b}<br>
							</p>
							</div>
							<br>							
							`
            j++
            // sous-question b/
            texte += num_alpha(j) + ' Traduire ce calcul par une phrase contenant le mot image'
            texteCorr += num_alpha(j) + `L'image de ${c} par cette fonction vaut ${a * c + b}`
            texteCorr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par cette fonction`
          } else {
            texte += tex_cadre_par_orange(itemize(['Choisir un nombre', `Multiplier ce nombre par ${a}`, `Ajouter ${b} au résultat obtenu`]))
            // sous-question a/
            texte += texEnumerate([`Appliquer ce programme de calcul au nombre ${c}`, 'Traduire ce calcul par une phrase contenant le mot image'], this.spacing)
            // texteCorr +=
            texteCorr += texEnumerate([tex_cadre_par_orange(itemize([`On choisit le nombre ${c}`, `On multiplie ce nombre par ${a} : $${a} \\times ${c} = ${a * c}$ `, `On ajoute ${b} au résultat obtenu : $${a * c}+${b}=${a * c + b}$`])), `L'image de ${c} par cette fonction vaut ${a * c + b}<br>On peut aussi dire que ${a * c + b} est l'image de ${c} par cette fonction`], this.spacing)
          };
          break
        case 2:
          var j = 0 // pour la sous-numérotation

          // les variables a,b,c changent sans refaire un appel à randint
          texte = `Soit $f$ la fonction définie par l'expression algébrique $f(x)=$ ${a}$x+$${b}`
          if (sortieHtml) {
            // sous-question a/
            texte += '<br>' + num_alpha(j) + ` Calculer l'image de ${c}`
            texte += '<br>'
            texteCorr = num_alpha(j) + ` Calculons l'image par $f$ de $x= ${c}$ :`
            texteCorr += `<br>$f(${miseEnEvidence('\\textit{\\textbf{x}}')})= ${a} ${miseEnEvidence('\\textit{\\textbf{x}}')}+${b}$`
            texteCorr += `<br>$f(${miseEnEvidence(c)})= ${a}\\times ${miseEnEvidence(c)}+${b}$`
            texteCorr += `<br>$f(${miseEnEvidence(c)})= ${a * c}+${b}$`
            texteCorr += `<br>$f(${miseEnEvidence(c)})= ${a * c + b}$`
            j++
            // sous question b/
            texte += num_alpha(j) + ' Traduire ce calcul par une phrase contenant le mot image'
            texteCorr += '<br>' + num_alpha(j) + ` L'image de ${c} par la fonction $f$ vaut ${a * c + b}`
            texteCorr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $f$`
          } else {
            // sous-question a/ et b/
            texte += texEnumerate([`Calculer l'image de ${c}`, 'Traduire ce calcul par une phrase contenant le mot image'], this.spacing)
            texteCorr = texEnumerate([`Calculons l'image par $f$ de $x= ${c}$ :
							<br>$f(${miseEnEvidence('\\textit{\\textbf{x}}')})= ${a} ${miseEnEvidence('\\textit{\\textbf{x}}')}+${b}$
							<br>$f(${miseEnEvidence(c)})= ${a}\\times ${miseEnEvidence(c)}+${b}$
							<br>$f(${miseEnEvidence(c)})= ${a * c}+${b}$
							<br>$f(${miseEnEvidence(c)})= ${a * c + b}$`, `L'image de ${c} par la fonction $f$ vaut ${a * c + b}
							<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $f$`
            ], this.spacing)
          };
          break
        case 3:
          var j = 0 // pour la sous-numérotation

          // les variables a,b,c changent sans refaire un appel à randint
          texte = `Soit $g$ la fonction définie par $g:x\\longmapsto$ ${a}$x+$${b}`
          if (sortieHtml) {
            // sous-question a/
            texte += '<br>' + num_alpha(j) + ` Calculer l'image de ${c}`
            texte += '<br>'
            texteCorr = num_alpha(j) + ` Calculons l'image par $g$ de $x= ${c}$ :`
            texteCorr += `<br>$g:${miseEnEvidence('\\textit{\\textbf{x}}')}\\longmapsto ${a} ${miseEnEvidence('\\textit{\\textbf{x}}')}+${b}$`
            texteCorr += `<br>$g:${miseEnEvidence(c)}\\longmapsto ${a}\\times${miseEnEvidence(c)}+${b}$`
            texteCorr += `<br>$g:${miseEnEvidence(c)}\\longmapsto ${a * c}+${b}$`
            texteCorr += `<br>$g:${miseEnEvidence(c)}\\longmapsto ${a * c + b}$`
            j++
            // sous question b/
            texte += num_alpha(j) + ' Traduire ce calcul par une phrase contenant le mot image'
            texteCorr += '<br>' + num_alpha(j) + ` L'image de ${c} par la fonction $g$ vaut ${a * c + b}`
            texteCorr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $g$`
          } else {
            // sous-question a/ et b/
            texte += texEnumerate([`Calculer l'image de ${c}`, 'Traduire ce calcul par une phrase contenant le mot image'], this.spacing)
            texteCorr = texEnumerate([`Calculons l'image par $g$ de $x= ${c}$ :
							<br>$g:${miseEnEvidence('\\textit{\\textbf{x}}')}\\longmapsto ${a} ${miseEnEvidence('\\textit{\\textbf{x}}')}+${b}$
							<br>$g:${miseEnEvidence(c)}\\longmapsto ${a}\\times ${miseEnEvidence(c)}+${b}$
							<br>$g:${miseEnEvidence(c)}\\longmapsto ${a * c}+${b}$
							<br>$g:${miseEnEvidence(c)}\\longmapsto ${a * c + b}$`, `L'image de ${c} par la fonction $g$ vaut ${a * c + b}
							<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $g$`
            ], this.spacing)
          };
          break
        case 4:
          texte = ''
          texteCorr = ''
          texteCorr += 'Calculer avec un diagramme '
          var j = 0 // pour la sous-numérotation

          // les variables a,b,c changent sans refaire un appel à randint
          texte += 'Soit la fonction $h$ définie par le diagramme '
          if (sortieHtml) {
            // sous-question a/
            texte += `<div id="${id_du_div}" style="width: ${pourcentage}"; height: 50px; display : table "></div>`
            SVG_machine_diag_3F12(id_du_div, 800, 100, 'h', 'x', [['' + a, a + 'x'], ['' + b, a + 'x+' + b]])
            texte += num_alpha(j) + ` Calculer l'image de ${c}`
            texte += '<br>'
            texteCorr += '<br>'
            texteCorr += num_alpha(j) + ` Calculons l'image par $h$ de $x=$ ${c} :`
            texteCorr += `<div id="${id_du_div_corr}" style="width: ${pourcentage}"; display : table "></div>`
            SVG_machine_diag_3F12(id_du_div_corr, 800, 100, 'h', '' + c, [['' + a, '' + (a * c)], ['' + b, '' + (a * c + b)]])
            j++
            // sous question b/
            texte += num_alpha(j) + ' Traduire ce calcul par une phrase contenant le mot image'
            texteCorr += '<br>' + num_alpha(j) + ` L'image de ${c} par la fonction $h$ vaut ${a * c + b}`
            texteCorr += `<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $h$`
          } else {
            texte += '<br>' + tikz_machine_diag('h', 'x', [['\\times ' + a, a + 'x'], ['+' + b, a + 'x+' + b]])
            // sous-question a/ et b/
            texte += texEnumerate([`Calculer l'image de ${c}`, 'Traduire ce calcul par une phrase contenant le mot image'], this.spacing)
            texteCorr = texEnumerate(
              [`Calculons l'image par $g$ de $x=$ ${c} :<br>` + tikz_machine_diag('h', c, [['\\times ' + a, (a * c)], ['+' + b, (a * c + b)]]),
							`L'image de ${c} par la fonction $g$ vaut ${a * c + b}
						 	<br> On peut aussi dire que ${a * c + b} est l'image de ${c} par la fonction $g$`
              ], this.spacing)
          };
          break
      };

      if (this.listeQuestions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Règle à travailler', 5, "1 : &Agrave; partir d'un programme de calcul\n2 : &Agrave; partir de l'expression algébrique sous forme f(x) = ...\n3 : &Agrave; partir de l'expression algébrique sous forme f : x --> ...\n4 : &Agrave; partir d'un diagramme\n5 : Mélange"]
}
