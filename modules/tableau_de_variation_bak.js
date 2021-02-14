/**
 * Classe Tableau_de_variation Initiée par Sebastien Lozano, transformée par Jean-Claude Lhote
 * publié le 9/02/2021
 * tabInit est un tableau contenant sous forme de chaine les paramètres de la macro Latex \tabInit{}{}
 * tabLines est un tableau contenant sous forme de chaine les paramètres des différentes macro \tabLine{}
 * exemple :
 * tabInit:[[[texte1,taille1,long1],[texte2,taille2,long2]...],[valeur1,long1,valeur2,long2,valeur3,long3...]]
 * tabLines:[[type,long0,codeL1C1,long1,codeL1C2,long2,codeL1C3,long3...],[type,long0,codeL2C1,long1,codeL2C2,long2,codeL2C3,long3...]]
 * @param {*} param0 
 */
function Tableau_de_variation({ tabInit, tabLines, lgt, escpl, deltacl, colors }) {

    ObjetMathalea2D.call(this)
    this.tabInit = tabInit
    this.tabLines = tabLines
    this.colors = colors
    this.lgt = lgt
    this.escpl = escpl
    this.deltacl = deltacl
  
    this.svg = function (coeff) {
      let tabInit0 = this.tabInit[0]
      let tabInit1 = this.tabInit[1]
      let tabLines = this.tabLines
      let lignes, colones // tableaux contenant les différentes chaines à écrire
      let nb_lignes, nbcolones
      let yLine = 0
      let segments = [], index = 0, textes = [], texte,long, s, p
      let code = ""
      let longueurTotale = this.lgt + (tabInit1.length/2 -1) * escpl + 1 + 2 * deltacl
      for (let i = 0; i < tabInit0.length/2 && index < tabLines.length;) { // on s'arrête quand on dépasse le nombre de lignes prévues
        // On crée une ligne horizontale et les séparations verticales de base
        segments.push(segment(0, yLine, longueurTotale, yLine))
        segments.push(segment(0, yLine, 0, yLine - tabInit0[i][1]))
        segments.push(segment(this.lgt, yLine, this.lgt, yLine - tabInit0[i][1]))
        segments.push(segment(longueurTotale, yLine, longueurTotale, yLine - tabInit0[i][1]))
        if (i > 0) { // On est dans les lignes 1 à n 
          // Line et Var incrémente i de 1 et décrémente yLine de la hauteur de la ligne
          // Val, Ima et Slope incrémente index mais pas i
          switch (tabLines[index][0]) {
            case 'Line':
              textes.push(latexParCoordonnees(tabInit0[i][0], this.lgt/2-tabInit0[i][2]/8, yLine ))
              for (let k = 1; k < tabLines[index].length/2; k++) {
                if (tabLines[index][k*2] != "") {
                  texte = tabLines[index][k*2]
                  long=tabLines[index][k*2+1]
                  console.log('tabLines',texte,long)
                  if (texte.length == 1) {
                    switch (texte[0]) {
                      case 'z':
                        textes.push(latexParCoordonnees('$0$', this.lgt + this.deltacl + this.escpl / 2 * (k-1)-1/8, yLine))
                        s = segment(this.lgt + this.deltacl + this.escpl / 2 *(k-1), yLine, this.lgt + this.deltacl + this.escpl / 2 * (k-1) , yLine - tabInit0[i][1])
                        s.pointilles = 4
                        segments.push(s)
                        break
                      case 'd':
                        segments.push(segment(this.lgt + this.deltacl + this.escpl / 2 * (k - 1) - 0.1, yLine, this.lgt + this.deltacl + this.escpl / 2 * (k -1) - 0.1, yLine - tabInit0[i][1]))
                        segments.push(segment(this.lgt + this.deltacl + this.escpl / 2 * (k - 1) + 0.1, yLine, this.lgt + this.deltacl + this.escpl / 2 * (k -1) + 0.1, yLine - tabInit0[i][1]))
                        break
                      case 't':
                        s = segment(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine, this.lgt + this.deltacl + this.escpl / 2 * (k -1), yLine - tabInit0[i][1])
                        s.pointilles = 4
                        segments.push(s)
                        break
                      case 'h':
                        p = polygone(point(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine),
                          point(this.lgt + this.deltacl + this.escpl / 2 * (k), yLine),
                          point(this.lgt + this.deltacl + this.escpl / 2 * (k), yLine - tabInit0[i][1]),
                          point(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1]))
                        p.couleurDeRemplissage = 'gray'
                        segments.push(p)
                        break
                      case '+':
                        textes.push(latexParCoordonnees('$+$', this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine))
  
                        break
                      case '-':
                        textes.push(latexParCoordonnees('$-$', this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine))
  
                        break
                    }
                  }
                  else if (texte == 'R/') {
                    // textes.push(latexParCoordonnees(texte, this.lgt + this.deltacl + this.escpl/2 * (k - 0.6), yLine-tabInit0[i][1] / 2))
                  }
                  else {
                    textes.push(latexParCoordonnees(texte, this.lgt + this.deltacl + this.escpl / 2 * (k - 1) -long/8, yLine))
                  }
                }
              }
              yLine -= tabInit0[i][1]
              i++
              index++
              break
            case 'Var':
              yLine -= tabInit0[i][1]
              i++
              index++
              break
            case 'Val':
              index++
              break
            case 'Ima':
              index++
              break
            case 'Slope':
  
              break
          }
        }
        else { // ici on est dans la ligne d'entête
          texte = tabInit0[0][0]
          long=tabInit0[0][1]
          console.log('tabInit00',texte,long)
          textes.push(latexParCoordonnees(texte,this.lgt/2-long/8, 0))
        for (let j = 0; j < tabInit1.length/2; j++) {
          texte = tabInit1[j*2]
          long=tabInit1[j*2+1]
          console.log('tabInit1',texte,long)
          textes.push(latexParCoordonnees(texte, this.lgt + this.deltacl + this.escpl * j-long/8, 0))
        }
          yLine -= tabInit0[0][1]
          i++
        }
      }
  
      // On ferme le tableau en bas
      segments.push(segment(0, yLine, longueurTotale, yLine))
  
      //On écrit le code avec tous les éléments.
      for (let i = 0; i < segments.length; i++) {
        code += "\n\t" + segments[i].svg(coeff)
      }
      for (let i = 0; i < textes.length; i++) {
        code += "\n\t" + textes[i].svg(coeff)
      }
      return code
    }
  
    this.tikz = function () {
      let code = `\\tkzTabInit[lgt=${lgt},delatcl=${deltacl},escpl=${escpl}`
      for (let i = 0; i < this.colors.length; i++) {
        code += `,${this.colors[i]}`
      }
      code += `]{`
      let tabinit0 = this.tabInit[0]
      let tabinit1 = this.tabInit[1]
      let type
      for (let i = 0; i < tabinit0.length; i++) {
        code += ` ${tabinit0[i][0]} / ${tabinit0[i][1]},`
      }
      code = code.substring(0, code.length - 1)
      code += `}{`
      for (let i = 0; i < tabinit1.length/2; i++) {
        code += ` ${tabinit1[i*2]},`
      }
      code = code.substring(0, code.length - 1)
      code += `}` + "\n\t"
      for (let i = 0; i < this.tabLines.length; i++) {
        type = this.tabLines[i][0]
        if (type == 'Val' || type == 'Ima') {
          code += `\\tkzTab${type}`
          for (let j = 1; j < this.tabLines[i*2].length; j++) {
            code += `{${this.tabLines[i][j*2]}}`
          }
          code += "\n\t"
        }
        else {
          code += `\\tkzTab${type}{ `
          for (let j = 1; j < this.tabLines[i].length; j++) {
            code += ` ${this.tabLines[i][j*2]},`
          }
          code = code.substring(0, code.length - 1)
          code += `}` + "\n\t"
        }
      }
      return code
    }
  }
  export function tableau_de_variation({ tabInit = ['', ''], tabLines = [], lgt = 3.5, escpl = 3, deltacl = 0.5, colors = [] }) {
    return new Tableau_de_variation({ tabInit: tabInit, tabLines: tabLines, lgt: lgt, escpl: escpl, deltacl: deltacl, colors: colors })
  }
  