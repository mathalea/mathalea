/** @module export AutoMultipleChoice */

/**
 *
 * @param {array} thisAmc tableau this.amc d'un exercice : [référence de l'exercice,this.autoCorrection de l'exercice,titre de l'exercice, type de question AMC,{options ?}]
 * @param {number} idExo c'est un numéro unique pour gérer les noms des éléments d'un groupe de question, il est incrémenté par creerDocumentAmc()
 */

import { elimineDoublons } from '../interactif/questionQcm'
import { nombreDeChiffresDansLaPartieDecimale, nombreDeChiffresDansLaPartieEntiere } from './decimales'
import { randint } from './entiers'
import { lettreDepuisChiffre } from './lettres'
import { arrondi } from './nombres'
import { decimalToScientifique } from './puissances'

export function exportQcmAmc (exercice, idExo) {
  const ref = `${exercice.id}${exercice.sup ? 'S:' + exercice.sup : ''}${exercice.sup2 ? 'S2:' + exercice.sup2 : ''}${exercice.sup3 ? 'S3:' + exercice.sup3 : ''}${exercice.sup4 ? 'S4:' + exercice.sup4 : ''}`
  const autoCorrection = exercice.autoCorrection
  const titre = exercice.titre
  const type = exercice.amcType
  let texQr = ''
  let id = 0
  let reponse, reponse2, reponse3
  let horizontalite = 'reponseshoriz'
  let lastchoice = false
  let ordered = false
  let nbChiffresPd, nbChiffresPe
  let melange = true
  let sautDeLigneApresEnonce
  for (let j = 0; j < autoCorrection.length; j++) {
    if (autoCorrection[j] === undefined) { // normalement, cela ne devrait jamais arriver !
      autoCorrection[j] = {}
    }
    if (autoCorrection[j].options !== undefined) {
      if (autoCorrection[j].options.vertical === undefined) {
        horizontalite = 'reponseshoriz'
      } else {
        horizontalite = 'reponses'
      }
      if (autoCorrection[j].options.ordered) {
        ordered = true
      }
      if (autoCorrection[j].options.lastChoice !== undefined) {
        lastchoice = autoCorrection[j].options.lastChoice
      }
    }
    let valeurAMCNum = 0
    if (autoCorrection[j].reponse !== undefined) {
      if (!Array.isArray(autoCorrection[j].reponse.valeur)) autoCorrection[j].reponse.valeur = [autoCorrection[j].reponse.valeur]
      valeurAMCNum = autoCorrection[j].reponse.valeur[0]
      if (typeof valeurAMCNum === 'string') {
        valeurAMCNum = valeurAMCNum.replace(/\s/g, '').replaceAll(',', '.')
      }
    }
    switch (type) {
      case 'qcmMono': // question QCM 1 bonne réponse
        if (elimineDoublons(autoCorrection[j].propositions)) {
          console.log('doublons trouvés')
        }
        if (autoCorrection[j].enonce === undefined) {
          autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        texQr += `\\element{${ref}}{\n `
        texQr += `\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
        texQr += `${autoCorrection[j].enonce} \n `
        texQr += `\t\\begin{${horizontalite}}`
        if (ordered) {
          texQr += '[o]'
        }
        texQr += '\n '
        for (let i = 0; i < autoCorrection[j].propositions.length; i++) {
          if (lastchoice > 0 && i === lastchoice) {
            texQr += '\t\t\\lastchoices\n'
          }
          if (autoCorrection[j].propositions[i].statut) {
            texQr += `\t\t\\bonne{${autoCorrection[j].propositions[i].texte}}\n `
          } else {
            texQr += `\t\t\\mauvaise{${autoCorrection[j].propositions[i].texte}}\n `
          }
        }
        texQr += `\t\\end{${horizontalite}}\n `
        texQr += '\\end{question}\n }\n '
        id++
        break

      case 'qcmMult': // question QCM plusieurs bonnes réponses (même si il n'y a qu'une seule bonne réponse, il y aura le symbole multiSymbole)
        if (elimineDoublons(autoCorrection[j].propositions)) {
          console.log('doublons trouvés')
        }
        if (autoCorrection[j].enonce === undefined) {
          autoCorrection[j].enonce = exercice.listeQuestions[j]
        }

        texQr += `\\element{${ref}}{\n `
        texQr += `\\begin{questionmult}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
        texQr += `${autoCorrection[j].enonce} \n `
        texQr += `\t\\begin{${horizontalite}}`
        if (ordered) {
          texQr += '[o]'
        }
        texQr += '\n '
        for (let i = 0; i < autoCorrection[j].propositions.length; i++) {
          if (lastchoice > 0 && i === lastchoice) {
            texQr += '\t\t\\lastchoices\n'
          }
          if (autoCorrection[j].propositions[i].statut) {
            texQr += `\t\t\\bonne{${autoCorrection[j].propositions[i].texte}}\n `
          } else {
            texQr += `\t\t\\mauvaise{${autoCorrection[j].propositions[i].texte}}\n `
          }
        }
        texQr += `\t\\end{${horizontalite}}\n `
        texQr += ' \\end{questionmult}\n }\n '
        id++
        break
      case 'AMCOpen': // AMCOpen question ouverte corrigée par l'enseignant
        if (autoCorrection[j].enonce === undefined) {
          autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        if (autoCorrection[j].propositions === undefined) {
          autoCorrection[j].propositions = [{ texte: exercice.listeCorrections[j], statut: '3' }]
        }
        texQr += `\\element{${ref}}{\n `
        texQr += `\t\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
        texQr += `\t\t${autoCorrection[j].enonce} \n `
        texQr += `\t\t\\explain{${autoCorrection[j].propositions[0].texte}}\n`
        texQr += `\t\t\\notation{${autoCorrection[j].propositions[0].statut}}`
        if (autoCorrection[j].propositions[0].sanscadre !== undefined) {
          texQr += `[${autoCorrection[j].propositions[0].sanscadre}]` // le statut contiendra si on a un cadre ou pas
        } else texQr += '[false]'
        if (autoCorrection[j].propositions[0].pointilles !== undefined) {
          texQr += `[${autoCorrection[j].propositions[0].pointilles}]` // // le statut contiendra les lignes sont des pointillés ou vierges
        } else texQr += '[true]'

        texQr += '\n\t\\end{question}\n }\n'
        id++
        break
      case 'AMCNum': // AMCNum avec encodage numérique de la réponse
        /********************************************************************/
        // On pourra rajouter des options : les paramètres sont nommés.
        // {digits=0,digitsDen=0,digitsNum=0,decimals=0,vertical=false,signe=false,exposantNbChiffres=0,exposantSigne=false,approx=0}
        // si digits=0 alors la fonction va analyser le nombre décimal (ou entier) pour déterminer digits et decimals
        // signe et exposantSigne sont des booléens
        // approx est un entier : on enlève la virgule pour comparer la réponse avec la valeur : approx est le seuil de cette différence.
        /********************************************************************/
        if (autoCorrection[j].enonce === undefined) {
          autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        if (autoCorrection[j].propositions === undefined) {
          autoCorrection[j].propositions = [{ texte: exercice.listeCorrections[j], statut: '' }]
        }
        if (!Array.isArray(autoCorrection[j].reponse.valeur)) {
          autoCorrection[j].reponse.valeur = [autoCorrection[j].reponse.valeur]
        }
        if (autoCorrection[j].reponse.param.basePuissance !== undefined) {
          if (autoCorrection[j].reponse.param.exposantPuissance === undefined) {
            autoCorrection[j].reponse.param.exposantPuissance = 1000 // Nb volontairement grand pour faire comprendre à l'utilisateur AMC qu'il y a eu une erreur de programmation lors de la conception de l'exercice.
          }
          texQr += `\\element{${ref}}{\n`
          texQr += '\\begin{minipage}{\\textwidth}\n'
          texQr += '\\begin{multicols}{2}\n'
          texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
          texQr += `${autoCorrection[j].enonce} \n \\vspace{0.25cm} \n`
          if (autoCorrection[j].propositions !== undefined) {
            texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
          }
          let digitsBase = 0
          if (autoCorrection[j].reponse.param.baseNbChiffres !== undefined) {
            digitsBase = Math.max(autoCorrection[j].reponse.param.baseNbChiffres, nombreDeChiffresDansLaPartieEntiere(autoCorrection[j].reponse.param.basePuissance))
          } else {
            digitsBase = nombreDeChiffresDansLaPartieEntiere(autoCorrection[j].reponse.param.basePuissance)
          }
          let digitsExposant = 0
          if (autoCorrection[j].reponse.param.exposantNbChiffres !== undefined) {
            digitsExposant = Math.max(autoCorrection[j].reponse.param.exposantNbChiffres, nombreDeChiffresDansLaPartieEntiere(autoCorrection[j].reponse.param.exposantPuissance))
          } else {
            digitsExposant = nombreDeChiffresDansLaPartieEntiere(autoCorrection[j].reponse.param.exposantPuissance)
          }
          texQr += '\n'
          texQr += `Base\n \\AMCnumericChoices{${autoCorrection[j].reponse.param.basePuissance}}{digits=${digitsBase},decimals=0,sign=${autoCorrection[j].reponse.param.basePuissance < 0 || autoCorrection[j].reponse.param.signe ? 'true' : 'false'},approx=0,`
          if (autoCorrection[j].reponse.param.aussiCorrect !== undefined) texQr += `alsocorrect=${autoCorrection[j].reponse.param.aussiCorrect},`
          texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,}}\n`
          texQr += '\\end{questionmultx}\n'
          texQr += '\\AMCquestionNumberfalse\\def\\AMCbeginQuestion#1#2{}'
          texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 1}} \n `
          texQr += '\\vspace{18pt}'
          // texQr += `Exposant\n \\AMCnumericChoices{${autoCorrection[j].reponse.param.exposantPuissance}}{digits=${digitsExposant},decimals=0,sign=${autoCorrection[j].reponse.param.exposantPuissance < 0 ? 'true' : 'false'},approx=0,`
          texQr += `Exposant\n \\AMCnumericChoices{${autoCorrection[j].reponse.param.exposantPuissance}}{digits=${digitsExposant},decimals=0,sign=true,approx=0,`
          texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,}}\n`
          texQr += '\\end{questionmultx}\n\\end{multicols}\n\\end{minipage}\n}\n\n'
          id += 2
        } else if (valeurAMCNum.num !== undefined) { // Si une fraction a été passée à AMCNum, on met un seul AMCNumericChoice particulier
          texQr += `\\element{${ref}}{\n`
          texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
          texQr += `${autoCorrection[j].enonce} \n`
          if (autoCorrection[j].propositions !== undefined) {
            texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
          }
          let digitsNum = 0
          if (autoCorrection[j].reponse.param.digitsNum !== undefined) {
            digitsNum = Math.max(autoCorrection[j].reponse.param.digitsNum, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num))
          } else if (autoCorrection[j].reponse.param.digits !== undefined) {
            digitsNum = Math.max(autoCorrection[j].reponse.param.digits, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num))
          } else {
            digitsNum = nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num)
          }
          let digitsDen = 0
          if (autoCorrection[j].reponse.param.digitsDen !== undefined) {
            digitsDen = Math.max(autoCorrection[j].reponse.param.digitsDen, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den))
          } else if (autoCorrection[j].reponse.param.digits !== undefined) {
            digitsDen = Math.max(autoCorrection[j].reponse.param.digits, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den))
          } else {
            digitsDen = nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)
          }
          let signeNum = true
          if (autoCorrection[j].reponse.param.signe !== undefined) {
            signeNum = autoCorrection[j].reponse.param.signe
          } else {
            signeNum = valeurAMCNum.signe === -1
          }
          let reponseF
          let reponseAlsoCorrect
          if (valeurAMCNum.num > 0) {
            reponseF = arrondi(valeurAMCNum.num + valeurAMCNum.den / (10 ** nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)), 8)
            reponseAlsoCorrect = arrondi(valeurAMCNum.num + valeurAMCNum.den / (10 ** digitsDen), 8)
          } else {
            reponseF = arrondi(valeurAMCNum.num - valeurAMCNum.den / (10 ** nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)), 8)
            reponseAlsoCorrect = arrondi(valeurAMCNum.num - valeurAMCNum.den / (10 ** digitsDen), 8)
          }
          texQr += `\\AMCnumericChoices{${reponseF}}{digits=${digitsNum + digitsDen},decimals=${digitsDen},sign=${signeNum},approx=0,`
          texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreexact=1,Tpoint={\\vspace{0.5cm} \\vrule height 0.4pt width 5.5cm },alsocorrect=${reponseAlsoCorrect}}\n`
          texQr += '\\end{questionmultx}\n}\n\n'
          id += 2
        } else {
          let nbChiffresExpo
          if (autoCorrection[j].reponse.param.exposantNbChiffres !== undefined && autoCorrection[j].reponse.param.exposantNbChiffres !== 0) {
            nbChiffresPd = Math.max(nombreDeChiffresDansLaPartieDecimale(decimalToScientifique(valeurAMCNum)[0]), autoCorrection[j].reponse.param.decimals)
            nbChiffresPe = Math.max(nombreDeChiffresDansLaPartieEntiere(decimalToScientifique(valeurAMCNum)[0]), autoCorrection[j].reponse.param.digits - nbChiffresPd)
            nbChiffresExpo = Math.max(nombreDeChiffresDansLaPartieEntiere(decimalToScientifique(valeurAMCNum)[1]), autoCorrection[j].reponse.param.exposantNbChiffres)
          } else {
            nbChiffresPd = Math.max(nombreDeChiffresDansLaPartieDecimale(valeurAMCNum), autoCorrection[j].reponse.param.decimals)
            nbChiffresPe = Math.max(nombreDeChiffresDansLaPartieEntiere(valeurAMCNum), autoCorrection[j].reponse.param.digits - nbChiffresPd)
          }
          if (autoCorrection[j].reponse.param.milieuIntervalle !== undefined) {
            const demiMediane = autoCorrection[j].reponse.param.milieuIntervalle - valeurAMCNum
            nbChiffresPd = Math.max(nbChiffresPd, nombreDeChiffresDansLaPartieDecimale(demiMediane))
            valeurAMCNum = autoCorrection[j].reponse.param.milieuIntervalle
            autoCorrection[j].reponse.param.approx = autoCorrection[j].reponse.param.approx === 'intervalleStrict' ? demiMediane * 10 ** nbChiffresPd - 1 : demiMediane * 10 ** nbChiffresPd
          }
          texQr += `\\element{${ref}}{\n `
          texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
          texQr += `${autoCorrection[j].enonce} \n `
          if (autoCorrection[j].propositions !== undefined) {
            texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
          }
          if (autoCorrection[j].reponse.textePosition === 'left') texQr += `${autoCorrection[j].reponse.texte} `
          texQr += `\\AMCnumericChoices{${valeurAMCNum}}{digits=${nbChiffresPe + nbChiffresPd},decimals=${nbChiffresPd},sign=${autoCorrection[j].reponse.param.signe},`
          if (autoCorrection[j].reponse.param.aussiCorrect !== undefined) texQr += `alsocorrect=${autoCorrection[j].reponse.param.aussiCorrect},`
          if (autoCorrection[j].reponse.param.exposantNbChiffres !== undefined && autoCorrection[j].reponse.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
            texQr += `exponent=${nbChiffresExpo},exposign=${autoCorrection[j].reponse.param.exposantSigne},`
          }
          if (autoCorrection[j].reponse.param.approx !== undefined && autoCorrection[j].reponse.param.approx !== 0) {
            texQr += `approx=${autoCorrection[j].reponse.param.approx},`
            texQr += `scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},`
          }
          if (autoCorrection[j].reponse.param.vertical !== undefined && autoCorrection[j].reponse.param.vertical) {
            texQr += `vertical=${autoCorrection[j].reponse.param.vertical},`
          }
          if (autoCorrection[j].reponse.param.strict !== undefined && autoCorrection[j].reponse.param.strict) {
            texQr += `strict=${autoCorrection[j].reponse.param.strict},`
          }
          if (autoCorrection[j].reponse.param.vhead !== undefined && autoCorrection[j].reponse.param.vhead) {
            texQr += `vhead=${autoCorrection[j].reponse.param.vhead},`
          }
          if (autoCorrection[j].reponse.param.tpoint !== undefined && autoCorrection[j].reponse.param.tpoint) {
            texQr += `Tpoint={${autoCorrection[j].reponse.param.tpoint}},`
          } else {
            texQr += 'Tpoint={,},'
          }
          texQr += 'borderwidth=0pt,backgroundcol=lightgray,scoreexact=1} '
          if (autoCorrection[j].reponse.textePosition === 'right') texQr += `${autoCorrection[j].reponse.texte}\n`
          texQr += '\\end{questionmultx}\n }\n\n'
          id++
        }
        break
      case 'AMCOpenNum': // AMCOpen + AMCnumeric Choices. (A ne plus utiliser au profit de AMCHybride)
        /********************************************************************/
        // On pourra rajouter des options : les paramètres sont nommés.
        // {digits=0,decimals=0,signe=false,exposantNbChiffres=0,exposantSigne=false,approx=0}
        // si digits=0 alors la fonction va analyser le nombre décimal (ou entier) pour déterminer digits et decimals
        // signe et exposantSigne sont des booléens
        // approx est un entier : on enlève la virgule pour comparer la réponse avec la valeur : approx est le seuil de cette différence.
        // La correction est dans tabQCM[1][0], la réponse numérique est dans tabQCM[1][1] et le nombre de ligne pour le cadre dans tabQCM[1][2] et
        /********************************************************************/
        if (exercice.autoCorrection[j].enonce === undefined) {
          exercice.autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        if (exercice.autoCorrection[j].propositions === undefined) {
          exercice.autoCorrection[j].propositions = [{ texte: exercice.listeCorrections[j], statut: 2, feedback: '' }]
        }
        if (!Array.isArray(autoCorrection[j].reponse.valeur)) {
          autoCorrection[j].reponse.valeur = [autoCorrection[j].reponse.valeur]
        }
        texQr += `\\element{${ref}}{\n `
        texQr += '\\begin{minipage}[b]{0.7 \\linewidth}\n'
        texQr += `\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}a} \n `
        texQr += `${autoCorrection[j].enonce} \n `
        if (autoCorrection[j].propositions !== undefined) {
          texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
        }
        texQr += `\t\t\\notation{${autoCorrection[j].propositions[0].statut}}`
        if (!(isNaN(autoCorrection[j].propositions[0].sanscadre))) {
          texQr += `[${autoCorrection[j].propositions[0].sanscadre}]` // le statut contiendra le nombre de lignes pour ce type
        }
        texQr += '\n\t\\end{question}\n\\end{minipage}\n'
        if (autoCorrection[j].reponse.param.exposantNbChiffres !== undefined && autoCorrection[j].reponse.param.exposantNbChiffres === 0) {
          if (autoCorrection[j].reponse.param.digits === 0) {
            nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(valeurAMCNum)
            autoCorrection[j].reponse.param.decimals = nbChiffresPd
            nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(valeurAMCNum)
            autoCorrection[j].reponse.param.digits = nbChiffresPd + nbChiffresPe
          } else if (autoCorrection[j].reponse.param.decimals === undefined) {
            autoCorrection[j].reponse.param.decimals = 0
          }
          if (autoCorrection[j].reponse.param.exposantSigne === undefined) {
            autoCorrection[j].reponse.param.exposantSigne = false
          }
        }
        if (autoCorrection[j].reponse.param.signe === undefined) {
          autoCorrection[j].reponse.param.signe = false
        }
        texQr += '\\begin{minipage}[b]{0.3 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}b} \n `
        texQr += `\\AMCnumericChoices{${valeurAMCNum}}{digits=${autoCorrection[j].reponse.param.digits},decimals=${autoCorrection[j].reponse.param.decimals},sign=${autoCorrection[j].reponse.param.signe},`
        if (autoCorrection[j].reponse.param.exposantNbChiffres === 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse.param.approx !== 0 && autoCorrection[j].reponse.param.approx !== undefined) {
          texQr += `approx=${autoCorrection[j].reponse.param.approx},`
        }
        if (autoCorrection[j].reponse.param.vertical !== undefined && autoCorrection[j].reponse.param.vertical) {
          texQr += `vertical=${autoCorrection[j].reponse.param.vertical},`
        }
        if (autoCorrection[j].reponse.param.strict !== undefined && autoCorrection[j].reponse.param.strict) {
          texQr += `strict=${autoCorrection[j].reponse.param.strict},`
        }
        if (autoCorrection[j].reponse.param.vhead !== undefined && autoCorrection[j].reponse.param.vhead) {
          texQr += `vhead=${autoCorrection[j].reponse.param.vhead},`
        }
        if (autoCorrection[j].reponse.param.tpoint !== undefined && autoCorrection[j].reponse.param.tpoint) {
          texQr += `Tpoint={${autoCorrection[j].reponse.param.tpoint}},`
        } else {
          texQr += 'Tpoint={,},'
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scorapprox || 0.667},scoreexact=1,vertical=true}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}}\n'
        id++
        break
      case 'AMCOpenNum✖︎2': // AMCOpen + deux AMCnumeric Choices. (Nouveau ! en test)
        /********************************************************************/
        // /!\/!\/!\/!\ ATTENTION /!\/!\/!\/!\
        // Pour ce type :
        // =======autoCorrection[j].enonce contient toujours le texte de l'énoncé
        // les réponses à évaluer sont dans autoCorrection[j].reponse et autoCorrection[j].reponse2
        /********************************************************************/
        if (exercice.autoCorrection[j].enonce === undefined) {
          exercice.autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        if (exercice.autoCorrection[j].propositions === undefined) {
          exercice.autoCorrection[j].propositions = [{ texte: exercice.listeCorrections[j], statut: '', feedback: '' }]
        }
        if (!Array.isArray(autoCorrection[j].reponse.valeur)) {
          autoCorrection[j].reponse.valeur = [autoCorrection[j].reponse.valeur]
        }
        if (!Array.isArray(autoCorrection[j].reponse2.valeur)) {
          autoCorrection[j].reponse2.valeur = [autoCorrection[j].reponse2.valeur]
        }
        texQr += `\\element{${ref}}{\n `
        // premier champ de codage
        texQr += '\\begin{minipage}[b]{0.7 \\linewidth}\n'
        texQr += `\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}a} \n `
        texQr += `${autoCorrection[j].enonce} \n `
        if (autoCorrection[j].propositions !== undefined) {
          texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
        }
        texQr += `\\notation{${autoCorrection[j].propositions[0].statut}}\n`
        texQr += '\\end{question}\n\\end{minipage}\n'
        texQr += '\\begin{minipage}[b]{0.05 \\linewidth}\\hspace{6pt}\\end{minipage}'
        reponse = autoCorrection[j].reponse.valeur[0]
        if (autoCorrection[j].reponse.param.digits === 0) {
          nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(reponse)
          autoCorrection[j].reponse.param.decimals = nbChiffresPd
          nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(reponse)
          autoCorrection[j].reponse.param.digits = nbChiffresPd + nbChiffresPe
        } else if (autoCorrection[j].reponse.param.decimals === undefined) {
          autoCorrection[j].reponse.param.decimals = 0
        }
        // deuxième champ de codage numérique
        texQr += '\\begin{minipage}[b]{0.15 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}b} \n `
        texQr += `${autoCorrection[j].reponse.texte}\n` // pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut
        texQr += `\\AMCnumericChoices{${reponse}}{digits=${autoCorrection[j].reponse.param.digits},decimals=${autoCorrection[j].reponse.param.decimals},sign=${autoCorrection[j].reponse.param.signe},`
        if (autoCorrection[j].reponse.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse.param.approx !== 0) {
          texQr += `approx=${autoCorrection[j].reponse.param.approx},`
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,},vertical=true}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}\n'

        // troisième champ de codage numérique
        texQr += '\\begin{minipage}[b]{0.15 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}c} \n `
        reponse2 = autoCorrection[j].reponse2.valeur[0]
        if (autoCorrection[j].reponse2.param.digits === 0) {
          nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(reponse2)
          autoCorrection[j].reponse2.param.decimals = nbChiffresPd
          nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(reponse2)
          autoCorrection[j].reponse2.param.digits = nbChiffresPd + nbChiffresPe
        } else if (autoCorrection[j].reponse2.param.decimals === undefined) {
          autoCorrection[j].reponse2.param.decimals = 0
        }
        texQr += `${autoCorrection[j].reponse2.texte}\n` // pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut
        texQr += `\\AMCnumericChoices{${autoCorrection[j].reponse2.valeur}}{digits=${autoCorrection[j].reponse2.param.digits},decimals=${autoCorrection[j].reponse2.param.decimals},sign=${autoCorrection[j].reponse2.param.signe},`
        if (autoCorrection[j].reponse2.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse2.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse2.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse2.approx !== 0) {
          texQr += `approx=${autoCorrection[j].reponse2.param.approx},`
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,},vertical=true}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}}\n'

        id++
        break

      case 'AMCOpenNum✖︎3': // Un amcOpen et trois  AMCnumeric Choices. (Nouveau ! en test)
        /********************************************************************/
        // /!\/!\/!\/!\ ATTENTION /!\/!\/!\/!\
        // Pour ce type :
        // =======autoCorrection[j].enonce contient toujours le texte de l'énoncé
        // les réponses à évaluer sont dans autoCorrection[j].reponse, autoCorrection[j].reponse2 et autoCorrection[j].reponse3
        /********************************************************************/
        if (exercice.autoCorrection[j].enonce === undefined) {
          exercice.autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        if (exercice.autoCorrection[j].propositions === undefined) {
          exercice.autoCorrection[j].propositions = [{ texte: exercice.listeCorrections[j], statut: '', feedback: '' }]
        }
        if (!Array.isArray(autoCorrection[j].reponse.valeur)) {
          autoCorrection[j].reponse.valeur = [autoCorrection[j].reponse.valeur]
        }
        if (!Array.isArray(autoCorrection[j].reponse2.valeur)) {
          autoCorrection[j].reponse2.valeur = [autoCorrection[j].reponse2.valeur]
        }
        if (!Array.isArray(autoCorrection[j].reponse3.valeur)) {
          autoCorrection[j].reponse3.valeur = [autoCorrection[j].reponse3.valeur]
        }
        texQr += `\\element{${ref}}{\n `
        // premier champ de codage
        texQr += '\\begin{minipage}[b]{0.4 \\linewidth}\n'
        texQr += `\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}a} \n `
        texQr += `${autoCorrection[j].enonce} \n `
        if (autoCorrection[j].propositions !== undefined) {
          texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
        }
        texQr += `\\notation{${autoCorrection[j].propositions[0].statut}}\n`
        texQr += '\\end{question}\n\\end{minipage}\n'
        reponse = valeurAMCNum
        if (autoCorrection[j].reponse.param.digits === 0) {
          nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(reponse)
          autoCorrection[j].reponse.param.decimals = nbChiffresPd
          nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(reponse)
          autoCorrection[j].reponse.param.digits = nbChiffresPd + nbChiffresPe
        } else if (autoCorrection[j].reponse.param.decimals === undefined) {
          autoCorrection[j].reponse.param.decimals = 0
        }
        // deuxième champ de codage numérique
        texQr += '\\begin{minipage}[b]{0.2 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}b} \n `
        if (autoCorrection[j].reponse.textePosition === 'top') texQr += `${autoCorrection[j].reponse.texte}\n` // pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut
        else if (autoCorrection[j].reponse.textePosition === 'left') texQr += `${autoCorrection[j].reponse.texte} `
        texQr += `\\AMCnumericChoices{${valeurAMCNum}}{digits=${autoCorrection[j].reponse.param.digits},decimals=${autoCorrection[j].reponse.param.decimals},sign=${autoCorrection[j].reponse.param.signe},`
        if (autoCorrection[j].reponse.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse.param.approx !== 0) {
          texQr += `approx=${autoCorrection[j].reponse.param.approx},`
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,},vertical=true}`
        if (autoCorrection[j].reponse.textePosition === 'right') texQr += `${autoCorrection[j].reponse.texte}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}\n'

        // troisième champ de codage numérique
        texQr += '\\begin{minipage}[b]{0.2 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}c} \n `
        reponse2 = autoCorrection[j].reponse2.valeur[0]
        if (autoCorrection[j].reponse2.param.digits === 0) {
          nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(reponse2)
          autoCorrection[j].reponse2.param.decimals = nbChiffresPd
          nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(reponse2)
          autoCorrection[j].reponse2.param.digits = nbChiffresPd + nbChiffresPe
        } else if (autoCorrection[j].reponse2.param.decimals === undefined) {
          autoCorrection[j].reponse2.param.decimals = 0
        }
        if (autoCorrection[j].reponse2.textePosition === 'top') texQr += `${autoCorrection[j].reponse2.texte}\n` // pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut
        else if (autoCorrection[j].reponse2.textePosition === 'left') texQr += `${autoCorrection[j].reponse2.texte} `
        texQr += `\\AMCnumericChoices{${autoCorrection[j].reponse2.valeur}}{digits=${autoCorrection[j].reponse2.param.digits},decimals=${autoCorrection[j].reponse2.param.decimals},sign=${autoCorrection[j].reponse2.param.signe},`
        if (autoCorrection[j].reponse2.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse2.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse2.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse2.approx !== 0) {
          texQr += `approx=${autoCorrection[j].reponse2.param.approx},`
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,},vertical=true}`
        if (autoCorrection[j].reponse2.textePosition === 'right') texQr += `${autoCorrection[j].reponse2.texte}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}\n'

        // quatrième champ de codage numérique
        texQr += '\\begin{minipage}[b]{0.2 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}d} \n `
        reponse3 = autoCorrection[j].reponse3.valeur[0]
        if (autoCorrection[j].reponse3.param.digits === 0) {
          nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(reponse3)
          autoCorrection[j].reponse3.param.decimals = nbChiffresPd
          nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(reponse3)
          autoCorrection[j].reponse3.param.digits = nbChiffresPd + nbChiffresPe
        } else if (autoCorrection[j].reponse3.param.decimals === undefined) {
          autoCorrection[j].reponse3.param.decimals = 0
        }
        if (autoCorrection[j].reponse3.textePosition === 'top') texQr += `${autoCorrection[j].reponse3.texte}\n` // pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut
        else if (autoCorrection[j].reponse3.textePosition === 'left') texQr += `${autoCorrection[j].reponse3.texte} `
        texQr += `\\AMCnumericChoices{${autoCorrection[j].reponse3.valeur}}{digits=${autoCorrection[j].reponse3.param.digits},decimals=${autoCorrection[j].reponse3.param.decimals},sign=${autoCorrection[j].reponse3.param.signe},`
        if (autoCorrection[j].reponse3.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse3.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse3.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse3.approx !== 0) {
          texQr += `approx=${autoCorrection[j].reponse3.param.approx},`
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,},vertical=true} `
        if (autoCorrection[j].reponse3.textePosition === 'right') texQr += `${autoCorrection[j].reponse3.texte}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}\n}\n'
        id++
        break

      default : // Si on arrive ici, c'est que le type est AMCHybride
        if (type !== 'AMCHybride') {
          window.notify('exportQcmAMC : Il doit y avoir une erreur de type AMC, je ne connais pas le type : ', { type })
        }

        if (autoCorrection[j].enonce === undefined) { // Si l'énoncé n'a pas été défini, on va le chercher dans la question
          autoCorrection[j].enonce = exercice.listeQuestions[j]
          if (autoCorrection[j].enonce === undefined) break // Toujours vide car exercice.listeQuestions[j] vide. Ce cas se produit lorsqu'on a un exercice avec multi-réponses en interactif mais un seul AMChybride avec plusieurs AMCNum, comme 6N11
        }
        if (autoCorrection[j].propositions === undefined) break

        if (autoCorrection[j].melange !== undefined) {
          melange = autoCorrection[j].melange
        }
        texQr += `\\element{${ref}}{\n ` // Un seul élément du groupe de question pour AMC... plusieurs questions dedans !
        if (typeof autoCorrection[j].options !== 'undefined') {
          if (autoCorrection[j].options.multicolsAll) {
            texQr += '\\setlength{\\columnseprule}{'
            if (autoCorrection[j].options.barreseparation) {
              texQr += '0.5'
            } else {
              texQr += '0'
            }
            texQr += 'pt}\\begin{multicols}{2}\n'
          }
        }
        if (autoCorrection[j].enonceAGauche) {
          texQr += `\\noindent\\fbox{\\begin{minipage}{${autoCorrection[j].enonceAGauche[0]}\\linewidth}\n`
        }
        sautDeLigneApresEnonce = '\n '
        if (!(autoCorrection[j].enonceCentre === undefined) || (autoCorrection[j].enonceCentre)) {
          texQr += '\\begin{center}'
          sautDeLigneApresEnonce = ''
        }
        if (autoCorrection[j].enonceAvant === undefined) { // Dans une suite de questions, il se peut qu'il n'y ait pas d'énoncé général donc pas besoin de saut de ligne non plus.
          texQr += `${autoCorrection[j].enonce} ` + sautDeLigneApresEnonce
        } else if (autoCorrection[j].enonceAvant) {
          texQr += `${autoCorrection[j].enonce} ` + sautDeLigneApresEnonce
        } else if (autoCorrection[j].enonceAvantUneFois !== undefined) {
          if (autoCorrection[j].enonceAvantUneFois && j === 0) {
            texQr += `${autoCorrection[j].enonce} ` + sautDeLigneApresEnonce
          }
        }
        if (!(autoCorrection[j].enonceCentre === undefined) || (autoCorrection[j].enonceCentre)) {
          texQr += '\\end{center}'
        }
        if (autoCorrection[j].enonceAGauche) {
          texQr += `\\end{minipage}}\n\\noindent\\begin{minipage}[t]{${autoCorrection[j].enonceAGauche[1]}\\linewidth}\n`
        }
        if (typeof autoCorrection[j].options !== 'undefined') {
          if (autoCorrection[j].options.multicols & !autoCorrection[j].options.multicolsAll) {
            texQr += '\\setlength{\\columnseprule}{'
            if (autoCorrection[j].options.barreseparation) {
              texQr += '0.5'
            } else {
              texQr += '0'
            }
            texQr += 'pt}\\begin{multicols}{2}\n'
          }
        }

        for (let qr = 0, qrType, prop, propositions, rep; qr < autoCorrection[j].propositions.length; qr++) { // Début de la boucle pour traiter toutes les questions-reponses de l'élément j
          prop = autoCorrection[j].propositions[qr] // prop est un objet avec cette structure : {type,propositions,reponse}
          qrType = prop.type

          propositions = prop.propositions
          switch (qrType) {
            case 'qcmMono': // qcmMono de Hybride
              if (elimineDoublons(propositions)) {
                console.log('doublons trouvés')
              }

              if (prop.options !== undefined) {
                if (prop.options.vertical === undefined) {
                  horizontalite = 'reponseshoriz'
                } else {
                  horizontalite = 'reponses'
                }
                if (prop.options.ordered) {
                  ordered = true
                }
                if (prop.options.lastChoice !== undefined) {
                  lastchoice = prop.options.lastChoice
                }
              }
              texQr += `${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
              if (propositions[0].reponse !== undefined) {
                if (propositions[0].reponse.texte) {
                  texQr += propositions[0].reponse.texte + '\n'
                }
              }
              texQr += `\t\\begin{${horizontalite}}`
              if (ordered) {
                texQr += '[o]'
              }
              texQr += '\n '
              for (let i = 0; i < propositions.length; i++) {
                if (lastchoice > 0 && i === lastchoice) {
                  texQr += '\t\t\\lastchoices\n'
                }
                if (prop.propositions[i].statut) {
                  texQr += `\t\t\\bonne{${propositions[i].texte}}\n `
                } else {
                  texQr += `\t\t\\mauvaise{${propositions[i].texte}}\n `
                }
              }
              texQr += `\t\\end{${horizontalite}}\n `
              texQr += '\\end{question}\n'
              id++
              break
            case 'qcmMult': // qcmMult de Hybride
              if (elimineDoublons(propositions)) {
                console.log('doublons trouvés')
              }
              if (prop.options !== undefined) {
                if (prop.options.vertical === undefined) {
                  horizontalite = 'reponseshoriz'
                } else {
                  horizontalite = 'reponses'
                }
                if (prop.options.ordered) {
                  ordered = true
                }
                if (prop.options.lastChoice !== undefined) {
                  lastchoice = prop.options.lastChoice
                }
              }
              texQr += `${(qr > 0 && !(autoCorrection[j].options.avecSymboleMult)) ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{questionmult}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
              if (prop.enonce !== undefined) texQr += prop.enonce

              texQr += `\t\\begin{${horizontalite}}`
              if (ordered) {
                texQr += '[o]'
              }
              texQr += '\n '
              for (let i = 0; i < propositions.length; i++) {
                if (lastchoice > 0 && i === lastchoice) {
                  texQr += '\t\t\\lastchoices\n'
                }
                if (propositions[i].statut) {
                  texQr += `\t\t\\bonne{${propositions[i].texte}}\n `
                } else {
                  texQr += `\t\t\\mauvaise{${propositions[i].texte}}\n `
                }
              }
              texQr += `\t\\end{${horizontalite}}\n `
              texQr += ' \\end{questionmult}\n'
              id++
              break
            case 'AMCNum': // AMCNum de Hybride
              rep = prop.propositions[0].reponse
              if (!Array.isArray(rep.valeur)) { // rep.valeur est un tableau si la réponse est une fraction
                rep.valeur = [rep.valeur]
              }
              if (rep.param.basePuissance !== undefined) {
                if (rep.param.exposantPuissance === undefined) {
                  rep.param.exposantPuissance = 1000 // Nb volontairement grand pour faire comprendre à l'utilisateur AMC qu'il y a eu une erreur de programmation lors de la conception de l'exercice.
                }
                texQr += '\\begin{minipage}{\\textwidth}\n'
                texQr += '\\begin{multicols}{2}\n'
                texQr += `${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
                if (propositions !== undefined) {
                  texQr += `\\explain{${propositions[0].texte}}\n`
                }
                texQr += `${rep.texte}\n \\vspace{0.25cm} \n`
                let digitsBase = 0
                if (rep.param.baseNbChiffres !== undefined) {
                  digitsBase = Math.max(rep.param.baseNbChiffres, nombreDeChiffresDansLaPartieEntiere(rep.param.basePuissance))
                } else {
                  digitsBase = nombreDeChiffresDansLaPartieEntiere(rep.param.basePuissance)
                }
                let digitsExposant = 0
                if (rep.param.exposantNbChiffres !== undefined) {
                  digitsExposant = Math.max(rep.param.exposantNbChiffres, nombreDeChiffresDansLaPartieEntiere(rep.param.exposantPuissance))
                } else {
                  digitsExposant = nombreDeChiffresDansLaPartieEntiere(rep.param.exposantPuissance)
                }
                texQr += '\n'
                texQr += `Base\n \\AMCnumericChoices{${rep.param.basePuissance}}{digits=${digitsBase},decimals=0,sign=${rep.param.basePuissance < 0 ? 'true' : 'false'},approx=0,`
                texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,}}\n`
                texQr += '\\end{questionmultx}\n'
                texQr += '\\AMCquestionNumberfalse\\def\\AMCbeginQuestion#1#2{}'
                texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 1}} \n `
                texQr += '\\vspace{18pt}'
                // texQr += `Exposant\n \\AMCnumericChoices{${rep.param.exposantPuissance}}{digits=${digitsExposant},decimals=0,sign=${rep.param.exposantPuissance < 0 ? 'true' : 'false'},approx=0,`
                texQr += `Exposant\n \\AMCnumericChoices{${rep.param.exposantPuissance}}{digits=${digitsExposant},decimals=0,sign=true,approx=0,`
                texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,}}\n`
                texQr += '\\end{questionmultx}\\end{multicols}\n\\end{minipage}\n\n'
                id += 2
              } else if (rep.valeur[0].num !== undefined) { // Si une fraction a été passée à AMCNum, on met deux AMCNumericChoice
                valeurAMCNum = rep.valeur[0]
                texQr += `${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
                if (!(propositions[0].reponse.alignement === undefined)) {
                  texQr += '\\begin{'
                  texQr += `${propositions[0].reponse.alignement}}`
                }
                if (propositions !== undefined) {
                  texQr += `\\explain{${propositions[0].texte}}\n`
                }
                texQr += `${rep.texte}\n`
                let digitsNum = 0
                if (rep.param.digitsNum !== undefined) {
                  digitsNum = Math.max(rep.param.digitsNum, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num))
                } else if (rep.param.digits !== undefined) {
                  digitsNum = Math.max(rep.param.digits, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num))
                } else {
                  digitsNum = nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num)
                }
                let digitsDen = 0
                if (rep.param.digitsDen !== undefined) {
                  digitsDen = Math.max(rep.param.digitsDen, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den))
                } else if (rep.param.digits !== undefined) {
                  digitsDen = Math.max(rep.param.digits, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den))
                } else {
                  digitsDen = nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)
                }
                let signeNum = true
                if (rep.param.signe !== undefined) {
                  signeNum = rep.param.signe
                } else {
                  signeNum = (valeurAMCNum.num * valeurAMCNum.den < 0)
                }
                let reponseF
                let reponseAlsoCorrect
                if (valeurAMCNum.num > 0) {
                  reponseF = arrondi(valeurAMCNum.num + valeurAMCNum.den / (10 ** nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)), 8)
                  reponseAlsoCorrect = arrondi(valeurAMCNum.num + valeurAMCNum.den / (10 ** digitsDen), 8)
                } else {
                  reponseF = arrondi(valeurAMCNum.num - valeurAMCNum.den / (10 ** nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)), 8)
                  reponseAlsoCorrect = arrondi(valeurAMCNum.num - valeurAMCNum.den / (10 ** digitsDen), 8)
                }
                texQr += `\\AMCnumericChoices{${reponseF}}{digits=${digitsNum + digitsDen},decimals=${digitsDen},sign=${signeNum},approx=0,`
                texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreexact=1,Tpoint={\\vspace{0.5cm} \\vrule height 0.4pt width 5.5cm },alsocorrect=${reponseAlsoCorrect}}\n`
                if (!(propositions[0].reponse.alignement === undefined)) {
                  texQr += '\\end{'
                  texQr += `${propositions[0].reponse.alignement}}`
                }
                texQr += '\\end{questionmultx}\n'
                id += 2
              } else { // Ni puissances, ni fractions
                let nbChiffresExpo
                if (rep.param.exposantNbChiffres !== undefined && rep.param.exposantNbChiffres !== 0) {
                  nbChiffresPd = Math.max(nombreDeChiffresDansLaPartieDecimale(decimalToScientifique(rep.valeur[0])[0]), rep.param.decimals)
                  nbChiffresPe = Math.max(nombreDeChiffresDansLaPartieEntiere(decimalToScientifique(rep.valeur[0])[0]), rep.param.digits - nbChiffresPd)
                  nbChiffresExpo = Math.max(nombreDeChiffresDansLaPartieEntiere(decimalToScientifique(rep.valeur[0])[1]), rep.param.exposantNbChiffres)
                } else {
                  nbChiffresPd = Math.max(nombreDeChiffresDansLaPartieDecimale(rep.valeur[0]), rep.param.decimals)
                  nbChiffresPe = Math.max(nombreDeChiffresDansLaPartieEntiere(rep.valeur[0]), rep.param.digits - nbChiffresPd)
                }
                if (rep.param.milieuIntervalle !== undefined) {
                  const demiMediane = rep.param.milieuIntervalle - valeurAMCNum
                  nbChiffresPd = Math.max(nbChiffresPd, nombreDeChiffresDansLaPartieDecimale(demiMediane))
                  valeurAMCNum = rep.param.milieuIntervalle
                  rep.param.approx = autoCorrection[j].reponse.param.approx === 'intervalleStrict' ? demiMediane * 10 ** nbChiffresPd - 1 : demiMediane * 10 ** nbChiffresPd
                }
                texQr += `${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
                if (propositions !== undefined) {
                  texQr += `\\explain{${propositions[0].texte}}\n`
                }
                texQr += `${rep.texte}\n`
                if (!(propositions[0].reponse.alignement === undefined)) {
                  texQr += '\\begin{'
                  texQr += `${propositions[0].reponse.alignement}}`
                }
                texQr += `\\AMCnumericChoices{${rep.valeur[0]}}{digits=${nbChiffresPe + nbChiffresPd},decimals=${nbChiffresPd},sign=${rep.param.signe},`
                if (rep.param.exposantNbChiffres !== undefined && rep.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
                  texQr += `exponent=${nbChiffresExpo},exposign=${rep.param.exposantSigne},`
                }
                if (rep.param.approx !== undefined && rep.param.approx !== 0) {
                  texQr += `approx=${rep.param.approx},`
                  texQr += `scoreapprox=${rep.param.scoreapprox || 0.667},`
                }
                if (rep.param.vertical !== undefined && rep.param.vertical) {
                  texQr += `vertical=${rep.param.vertical},`
                }
                if (rep.param.strict !== undefined && rep.param.strict) {
                  texQr += `strict=${rep.param.strict},`
                }
                if (rep.param.vhead !== undefined && rep.param.vhead) {
                  texQr += `vhead=${rep.param.vhead},`
                }
                if (rep.param.tpoint !== undefined && rep.param.tpoint) {
                  texQr += `Tpoint={${rep.param.tpoint}},`
                } else {
                  texQr += 'Tpoint={,},'
                }
                texQr += 'borderwidth=0pt,backgroundcol=lightgray,scoreexact=1}\n'
                if (!(propositions[0].reponse.alignement === undefined)) {
                  texQr += '\\end{'
                  texQr += `${propositions[0].reponse.alignement}}`
                }
                texQr += '\\end{questionmultx}\n'
                id++
              }
              break
            case 'AMCOpen': // AMCOpen de Hybride
              if (propositions[0].numQuestionVisible === undefined) {
                texQr += `\t${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n`
              } else if (propositions[0].numQuestionVisible) {
                texQr += `\t${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n`
              } else {
                texQr += `\t\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse \\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}}\\QuestionIndicative \n`
              }
              if (!(propositions[0].enonce === undefined)) texQr += `\t${propositions[0].enonce}\n`
              texQr += `\t\t\\explain{${propositions[0].texte}}\n`

              if (propositions[0].numQuestionVisible === undefined) {
                texQr += `\t\t\\notation{${propositions[0].statut}}`
                if (!(isNaN(propositions[0].sanscadre))) {
                  texQr += `[${propositions[0].sanscadre}]` // le statut contiendra si on a un cadre ou pas
                } else texQr += '[false]'
                if (!(isNaN(propositions[0].pointilles))) {
                  texQr += `[${propositions[0].pointilles}]` // le statut contiendra les lignes sont des pointillés ou vierges
                } else texQr += '[true]'
              }

              texQr += '\n' // le statut contiendra le nombre de lignes pour ce type
              texQr += '\t\\end{question}\n'
              id++
              break
          }
        }
        if (typeof autoCorrection[j].options !== 'undefined') {
          if (autoCorrection[j].options.multicols || autoCorrection[j].options.multicolsAll) {
            texQr += '\\end{multicols}\n'
          }
        }
        if (autoCorrection[j].enonceAGauche) {
          texQr += '\\end{minipage}\n'
        }
        texQr += '}\n'
        break
    }
  }
  return [texQr, ref, exercice.nbQuestions, titre, melange]
}

/**
   * @author Jean-Claude Lhote
   * Fonction qui crée un document pour AMC (pour le compiler, le package automultiplechoice.sty doit être présent)
   *
   *  questions est un tableau d'éléments de type Exercice.QCM
   * Exercice.QCM est un tableau produit par l'exercice
   * QCM[0] est la référence du groupe de question, c'est la référence de l'exercice dont il est issu
   * QCM[1] est un tableau d'éléments de type ['question posée',tableau des réponses,tableau des booléens bon ou mauvais]
   * QCM[2] est le titre donné sur la copie pour le groupe de question (pour ne pas mettre la référence)
   * QCM[3] est le type de question :
   * 1=question à choix multiple avec 1 bonne réponse
   * 2=questionmult à choix multiple avec plusieurs bonnes réponses
   * 3=AMCOpen question ouverte sans bonne ni mauvaise réponse 3 cases à cocher par l'enseignant
   * 4=questionmultx avec AMCnumeriqueChoices question ouverte à réponse numérique codée
   *
   * nbQuestions est un tableau pour préciser le nombre de questions à prendre dans chaque groupe pour constituer une copie
   * s'il est indéfini, toutes les questions du groupe seront posées.
   * nb_exemplaire est le nombre de copies à générer
   * matiere et titre se passent de commentaires : ils renseignent l'entête du sujet.
   */
export function creerDocumentAmc ({ questions, nbQuestions = [], nbExemplaires = 1, matiere = 'Mathématiques', titre = 'Evaluation', typeEntete = 'AMCcodeGrid', format = 'A4' }) {
  // Attention questions est maintenant un tableau de tous les this.amc des exos
  // Dans cette partie, la fonction récupère toutes les questions et les trie pour les rassembler par groupe
  // Toutes les questions d'un même exercice seront regroupées ce qui permet éventuellement de les récupérer dans des fichiers individuels pour se constituer une base
  let idExo = 0; let code; let indexOfCode
  const nombreDeQuestionsIndefinie = []
  const graine = randint(1, 100000)
  const groupeDeQuestions = []; const texQuestions = [[]]; const titreQuestion = []; const melangeQuestion = []
  for (const exercice of questions) {
    code = exportQcmAmc(exercice, idExo)
    idExo++
    indexOfCode = groupeDeQuestions.indexOf(code[1])
    if (indexOfCode === -1) { // si le groupe n'existe pas
      groupeDeQuestions.push(code[1])
      indexOfCode = groupeDeQuestions.indexOf(code[1])
      texQuestions[indexOfCode] = code[0]

      // Si le nombre de questions du groupe n'est pas défini, alors on met toutes les questions sinon on laisse le nombre choisi par l'utilisateur
      if (typeof nbQuestions[indexOfCode] === 'undefined') {
        nombreDeQuestionsIndefinie[indexOfCode] = true
        nbQuestions[indexOfCode] = code[2]
      } else { // Si le nombre de question (à restituer pour ce groupe de question) a été défini par l'utilisateur, alors on le laisse !
        nombreDeQuestionsIndefinie[indexOfCode] = false
      }
      // Si le nombre de questions du groupe n'est pas défini, alors on met toutes les questions sinon on laisse le nombre choisi par l'utilisateur
      titreQuestion[indexOfCode] = code[3]
      melangeQuestion[indexOfCode] = code[4]
    } else { // Donc le groupe existe, on va vérifier si la question existe déjà et si non, on l'ajoute.
      if (texQuestions[indexOfCode].indexOf(code[0]) === -1) {
        texQuestions[indexOfCode] += code[0]
        // Si le nombre de questions du groupe n'est pas défini, alors on met toutes les questions sinon on laisse le nombre choisi par l'utilisateur
        if (nombreDeQuestionsIndefinie[indexOfCode]) {
          nbQuestions[indexOfCode] += code[2]
        }
      }
    }
  }
  // Fin de la préparation des groupes

  // variable qui contiendra le code LaTeX pour AMC
  let codeLatex = ''

  // variable preambule à abonder le cas échéant si des packages sont nécessaires.
  // Merci à Sébastien Lozano pour la vérification des dépendances
  // Merci à Liouba Leroux pour ses documents qui ont servi de base
  // A faire : abonder le preambule pour qu'il colle à tous les exos Mathalea_AMC

  let preambule = `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %%%%% -I- PRÉAMBULE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \n`
  if (format === 'A3') {
    preambule += '\t \\documentclass[10pt,a3paper,landscape,french,svgnames]{article}\n'
  } else {
    preambule += '\t \\documentclass[10pt,a4paper,french,svgnames]{article}\n'
  }

  preambule += `\t
    %%%%%% EE : Le mettre le plus tôt possible pour éviter un Warning à la compilation 
    \\RequirePackage{etex}\t  % pour avoir plus de "registres" mémoires / tikz...
    %%%%% PACKAGES LANGUE %%%%%  
    \\usepackage{babel} % sans option => langue définie dans la classe du document
     \\usepackage[T1]{fontenc} 
     \\usepackage[utf8x]{inputenc}
     \\usepackage{lmodern}\t        \t% Choix de la fonte (Latin Modern de D. Knuth)
     \\usepackage{fp}
    
    %%%%%%%%%%%%%%%%%%%%% SPÉCIFICITÉS A.M.C. %%%%%%%%%%%%%%%%%%%%%%
    %\\usepackage[francais,bloc,completemulti]{automultiplechoice} 
    %   remarque : avec completmulti => "aucune réponse ne convient" en +
     \\usepackage[francais,bloc,insidebox,nowatermark]{automultiplechoice} %//,insidebox
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    %%%%% PACKAGES MISE EN PAGE %%%%%
     \\usepackage{multicol} 
     \\usepackage{wrapfig}  
     \\usepackage{fancybox}  % pour \\doublebox \\shadowbox  \\ovalbox \\Ovalbox
     \\usepackage{calc} \t% Calculs 
     \\usepackage{enumerate}\t% Pour modifier les numérotations
     \\usepackage{enumitem}
     \\usepackage{tabularx}\t% Pour faire des tableaux
  
     \\usepackage{xargs}\t% EE : pour permettre DES options dans newcommand
  
    %%%%% PACKAGES FIGURES %%%%%
    %\\usepackage{pstricks,pst-plot,pstricks-add}
    %   POUR PSTRICKS d'où compilation sans PDFLateX mais : dvi, dvi2ps, ps2PDF...
    %   MAIS ON PRÉFÉRERA UTILISER TIKZ...
    \\usepackage{xcolor}% [avant tikz] xcolor permet de nommer + de couleurs
    \\usepackage{pgf,tikz}
    \\usepackage{graphicx} % pour inclure une image
    \\usetikzlibrary{arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
      shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows,babel} % Charge toutes les librairies de Tikz
    \\usepackage{tkz-tab,tkz-fct,tkz-euclide}\t% Géométrie euclidienne avec TikZ
    %\\usetkzobj{all} %problème de compilation
    
    %%%%% PACKAGES MATHS %%%%%
     \\usepackage{ucs}
     \\usepackage{bm}
     \\usepackage{amsmath}
     \\usepackage{amsfonts}
     \\usepackage{amssymb}
     \\usepackage{gensymb}
     \\usepackage{eurosym}
     \\usepackage{frcursive}
     \\newcommand{\\Vcurs}{\\begin{cursive}V\\end{cursive}}
     \\usepackage[normalem]{ulem}
     \\usepackage{sistyle} \\SIdecimalsign{,} %% => \\num{...} \\num*{...}
     % cf. http://fr.wikibooks.org/wiki/LaTeX/%C3%89crire_de_la_physique
     %  sous Ubuntu, paquet texlive-science à installer
     %\\usepackage[autolanguage,np]{numprint} % déjà appelé par défaut dans introLatex
     \\usepackage{mathrsfs}  % Spécial math
     %\\usepackage[squaren]{SIunits}\t% Pour les unités (gère le conflits avec  \\square de l'extension amssymb)
     \\usepackage{pifont}\t% Pour les symboles "ding"
     \\usepackage{bbding}\t% Pour les symboles
     \\usepackage[misc]{ifsym}\t% Pour les symboles
     \\usepackage{cancel}\t% Pour pouvoir barrer les nombres
  
  
    %%%%% AUTRES %%%%%
     \\usepackage{ifthen}
     \\usepackage{url} \t        \t% Pour afficher correctement les url
     \\urlstyle{sf}                          \t% qui s'afficheront en police sans serif
     \\usepackage{fancyhdr,lastpage}          \t% En-têtes et pieds
      \\pagestyle{fancy}                      \t% de pages personnalisés
     \\usepackage{fancybox}\t% Pour les encadrés
     \\usepackage{xlop}\t% Pour les calculs posés
    %\\usepackage{standalone}\t% Pour avoir un apercu d'un fichier qui sera utilisé avec un input
     \\usepackage{multido}\t% Pour faire des boucles
    %\\usepackage{hyperref}\t% Pour gérer les liens hyper-texte
     \\usepackage{fourier}
     \\usepackage{colortbl} \t% Pour des tableaux en couleur
     \\usepackage{setspace}\t% Pour \\begin{spacing}{2.0} \\end{spacing}
     \\usepackage{multirow}\t% Pour des cellules multilignes dans un tableau
    %\\usepackage{import}\t% Equivalent de input mais en spécifiant le répertoire de travail
    %\\usepackage[]{qrcode}
    %\\usepackage{pdflscape}
     \\usepackage[framemethod=tikz]{mdframed} % Pour les cadres
     \\usepackage{tikzsymbols}
     \\usepackage{scratch3}
    %\\usepackage{tasks}\t% Pour les listes horizontales
  \\usepackage{csvsimple}
    
    %%%%% Librairies utilisées par Mathgraphe32 %%%% 
    \\usepackage{fix-cm}
    \\usepackage{textcomp}
    
    %%%%% PERSONNALISATION %%%%%
    \\renewcommand{\\multiSymbole}{$\\begin{smallmatrix}\\circ\\bullet\\bullet \\\\ 
             \\circ\\bullet\\circ \\end{smallmatrix}$\\noindent} % par défaut $\\clubsuit$
    %\\renewcommand{\\multiSymbole}{\\textbf{(! Évent. plusieurs réponses !)}\\noindent} % par défaut $\\clubsuit$
    \\renewcommand{\\AMCbeginQuestion}[2]{\\noindent{\\colorbox{gray!20}{\\bf#1}}#2}
    %\\renewcommand{\\AMCIntervalFormat}[2]{\\texttt{[}#1\\,;\\,#2\\texttt{[}} 
                             % Crochets plus nets, virgule...
    %\\AMCboxDimensions{size=1.7ex,down=.2ex} %% taille des cases à cocher diminuée
    \\newcommand{\\collerVertic}{\\vspace{-3mm}} % évite un trop grand espace vertical
    \\newcommand{\\TT}{\\sout{\\textbf{Tiers Temps}} \\noindent} % 
    \\newcommand{\\Prio}{\\fbox{\\textbf{PRIORITAIRE}} \\noindent} % 
    \\newcommandx{\\notation}[3][2=false,3=true]{
      \\AMCOpen{lines=#1,lineup=#2,lineuptext=\\hspace{1cm},dots=#3}{\\mauvaise[{\\tiny NR}]{NR}\\scoring{0}\\mauvaise[{\\tiny RR}]{RR}\\scoring{0.01}\\mauvaise[{\\tiny R}]{R}\\scoring{0.33}\\mauvaise[{\\tiny V}]{V}\\scoring{0.67}\\bonne[{\\tiny VV}]{VV}\\scoring{1}}
    }
    %%\\newcommand{\\notation}[1]{
    %%\\AMCOpen{lines=#1}{\\mauvaise[{\\tiny NR}]{NR}\\scoring{0}\\mauvaise[{\\tiny RR}]{RR}\\scoring{0.01}\\mauvaise[{\\tiny R}]{R}\\scoring{0.33}\\mauvaise[{\\tiny V}]{V}\\scoring{0.67}\\bonne[{\\tiny VV}]{VV}\\scoring{1}}
    %%}
      
    %%pour afficher ailleurs que dans une question
    \\makeatletter
    \\newcommand{\\AffichageSiCorrige}[1]{\\ifAMC@correc #1\\fi}
    \\makeatother
    
    
    %%%%% TAILLES %%%%%
     \\usepackage{geometry} 
     \\geometry{headsep=0.3cm, left=1.5cm,right=1.5cm,top=2.4cm,bottom=1.5cm}
     \\DecimalMathComma 
    
     \\AMCcodeHspace=.3em % réduction de la taille des cases pour le code élève
     \\AMCcodeVspace=.3em 
    % \\AMCcodeBoxSep=.1em
     
     \\def\\AMCotextReserved{\\emph{Ne rien cocher, réservé au prof !}}
     
    %%%%%% Définition des barèmes 
    \\baremeDefautS{
      e=0.0001,% incohérence (plusieurs réponses données à 0,0001 pour définir des manquements au respect de consignes)
      b=1,% bonne réponse 1
      m=-0.01,% mauvaise réponse 0,01 pour différencier de la 
      v=0} % non réponse qui reste à 0
    
    \\baremeDefautM{formula=((NBC-NMC)/NB)*((NBC-NMC)/NB>0)} % nombre de bonnes réponses cochées minorées des mauvaises réponses cochées, ramenées à 1, et ramenée à 0 si résultat négatif.
    
    %%%%%%%%% Paramètres pour réponses à construire 
    \\AMCinterIrep=0pt \\AMCinterBrep=.5ex \\AMCinterIquest=0pt \\AMCinterBquest=3ex \\AMCpostOquest=7mm \\setlength{\\AMChorizAnswerSep}{3em plus 4em} \\setlength{\\AMChorizBoxSep}{1em}
    %%%%% Fin du préambule %%%%%%%
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    `

  // Variable contenant la partie document
  // Celle-ci contient une partie statique et une partie variable (la zone de définition des groupes qui est construite à la volée à partir de la variable groupeDeQuestions alimentée au début)

  let debutDocument = `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  %%%%% -II-DOCUMENT %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  \\begin{document}
  \\AMCrandomseed{${graine}}   % On choisit les "graines" pour initialiser le "hasard"
  \\FPseed=${graine}
  
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  %%%%% -II-a. CONCEPTION DU QCM %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  
    %%% préparation des groupes 
    \\setdefaultgroupmode{cyclic}\n`

  for (const g of groupeDeQuestions) {
    const i = groupeDeQuestions.indexOf(g)
    debutDocument += texQuestions[i]
  }

  // Variable qui contient l'entête d'une copie
  // A faire : Proposer différent type d'entête en fonction d'un paramètre ?
  const enteteTypeCodeGrid = `\\begin{minipage}{10cm}
    \\champnom{\\fbox{\\parbox{10cm}{    
      Écrivez vos nom, prénom et classe : \\\\
    }}}
    \\end{minipage}
    
    %\\\\
    \\vspace{2mm}
    
    Puis remplir les cases des trois premières lettres de votre \\textbf{nom de famille} PUIS des deux premières lettres de votre \\textbf{prénom}
    \\vspace{1mm}
  
    \\def\\AMCchoiceLabelFormat##1{\\textcolor{black!70}{{\\tiny ##1}}}  % pour alléger la couleur des lettres dans les cases et les réduire
    \\AMCcodeGrid[h]{ID}{ABCDEFGHIJKLMNOPQRSTUVWXYZ,
    ABCDEFGHIJKLMNOPQRSTUVWXYZ,
    ABCDEFGHIJKLMNOPQRSTUVWXYZ,
    ABCDEFGHIJKLMNOPQRSTUVWXYZ,
    ABCDEFGHIJKLMNOPQRSTUVWXYZ}
    `
  const enteteTypeChampnomSimple = `\\begin{minipage}{10cm}
    \\champnom{\\fbox{\\parbox{10cm}{    
      Écrivez vos nom, prénom et classe : \\\\
     \\\\
    }}}
    \\end{minipage}
    
    %\\\\
    \\vspace{2mm}
    `
  const enteteTypePreremplie = `\\begin{center}
    \\noindent{}\\fbox{\\vspace*{3mm}
         \\Large\\bf\\nom{}~\\prenom{}\\normalsize{}% 
          \\vspace*{3mm}
        }
    \\end{center}\n`

  let enteteCopie = ''
  if (typeEntete === 'AMCassociation') {
    enteteCopie += '\\newcommand{\\sujet}{\n'
  }
  enteteCopie += ` 
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %%%% -II-b. MISE EN PAGE DU QCM %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \\exemplaire{${nbExemplaires}}{   % <======  /!\\ PENSER À ADAPTER /!\\  ===  %
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \n`
  if (format === 'A3') {
    enteteCopie += '\\begin{multicols}{2}\n'
  }
  enteteCopie += `
    %%%%% EN-TÊTE, IDENTIFICATION AUTOMATIQUE DE L'ÉLÈVE %%%%%
    
    \\vspace*{-17mm}
    
    %%%%% INTRODUCTION ÉVENTUELLE %%%%%
    
    \\vspace{5mm}
    %\\noindent\\AMCcode{num.etud}{8}\\hspace*{\\fill} % Pour la version "verticale"
    %\\noindent\\AMCcodeH{num.etud}{8}\t % version "horizontale"
    \\begin{minipage}{7cm}
    \\begin{center} 
      \\textbf{${matiere}}
      
      \\textbf{${titre}} 
    \\end{center}
    \\end{minipage}
    \\hfill\n`
  if (typeEntete === 'AMCassociation') {
    enteteCopie += enteteTypePreremplie
  } else if (typeEntete === 'AMCcodeGrid') {
    enteteCopie += enteteTypeCodeGrid
  } else {
    enteteCopie += enteteTypeChampnomSimple
  }
  enteteCopie +=
      `\n{\\footnotesize REMPLIR avec un stylo NOIR la ou les cases pour chaque question. Si vous devez modifier un choix, NE PAS chercher à redessiner la case cochée par erreur, mettez simplement un coup de "blanc" dessus.
    
    Les questions précédées de \\multiSymbole peuvent avoir plusieurs réponses.\\\\ Les questions qui commencent par \\TT ne doivent pas être faites par les élèves disposant d'un tiers temps.
    
     Il est fortement conseillé de faire les calculs dans sa tête ou sur la partie blanche de la feuille sans regarder les solutions proposées avant de remplir la bonne case plutôt que d'essayer de choisir entre les propositions (ce qui demande de toutes les examiner et prend donc plus de temps) }
    
    `

  // Ici On ajoute les commandes pour insérer les questions issues des groupes en quantité selon le nb_question[i]
  // nb_question est un tableau passé en paramètre à la fonction creerDocumentAmc pour déterminer le nombre de questions à restituer par groupe.
  // si ce nombre est 0, on restitue toutes les questions du groupe
  let contenuCopie = ''
  if (typeEntete === 'AMCcodeGrid') {
    contenuCopie += '\t \\def\\AMCchoiceLabel##1{}'
  }
  for (const g of groupeDeQuestions) {
    const i = groupeDeQuestions.indexOf(g)
    contenuCopie += `
    \\begin{center}
      \\hrule
      \\vspace{2mm}
      \\bf\\Large ${titreQuestion[i]}
      \\vspace{1mm}
      \\hrule
    \\end{center}\n`
    if (!melangeQuestion[i]) {
      contenuCopie += `\\setgroupmode{${g}}{cyclic}\n\n`
    }
    if (nbQuestions[i] > 0) {
      contenuCopie += `\\restituegroupe[${nbQuestions[i]}]{${g}}\n\n`
    } else {
      contenuCopie += `\\restituegroupe{${g}}\n\n`
    }
  }
  if (format === 'A3') {
    contenuCopie += '\\end{multicols}\n'
  }
  if (typeEntete === 'AMCassociation') {
    contenuCopie += `\\AMCassociation{\\id}\n
      }
    }\n`
  } else {
    contenuCopie += '}\n'
  }

  // On assemble les différents morceaux et on retourne le résultat
  codeLatex = preambule + '\n' + debutDocument + '\n' + enteteCopie + contenuCopie
  if (typeEntete === 'AMCassociation') {
    codeLatex += '\n \n \\csvreader[head to column names]{liste.csv}{}{\\sujet}\n'
  }
  codeLatex += '\\end{document}\n'
  return codeLatex
}
