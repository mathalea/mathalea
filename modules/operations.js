import { ordreDeGrandeur, calcul,arrondi,nombrec2 } from "/modules/outils.js"
import { mathalea2d, texteParPosition, segment } from "/modules/2d.js"

/**
 * 
 * Pose une opération
 * @Auteur Jean-Claude Lhote
 * les types possibles sont : addition, soustraction, multiplication, division, additiond, soustractiond, multiplicationd, divisiond
 * Le paramètre précision précise pour divisiond, le nombre de chiffres après la virgule dans le quotient.
 */
export default function Operation({ operande1 = 1, operande2 = 2, type = 'addition', precision = 0 }) { //precision est pour le quotient décimal

    let Code
    let nombreDeChiffresApresLaVirgule = function (x) {
        let s = Number(x).toString()
        let pe = Number(Math.floor(x)).toString()
        if (pe.length == s.length) return 0
        return s.length - pe.length - 1
    }

    let cacherleszerosdevant = function (chaine) {
        let blancs = ""
        while (chaine[0] == '0') {
            chaine = chaine.substr(1)
            blancs += " "
        }
        for (let i = 0; i < chaine.length; i++) {
            blancs += `${chaine[i]}`
        }
        return blancs
    }

     let DivisionPosee3d = function (divid, divis,precision=0) {
        let objets = [],zeroutile=false,periode=0
        precision=Math.min(precision,nombreDeChiffresApresLaVirgule(divid/divis))
        let decalage= nombreDeChiffresApresLaVirgule(divis)
        let dec1=nombreDeChiffresApresLaVirgule(divid)
        if (divid<divis) 
            zeroutile=true
        divis = nombrec2(`${divis}*10^${decalage}`)
        divid = nombrec2(`${divid}*10^${decalage+dec1}`)
        let dec2=nombreDeChiffresApresLaVirgule(divid)
        dec2=precision-dec2-dec1
        divid=math.format(divid*10**dec2,{notation:'auto',lowerExp:-12,upperExp:12,precision:12})
        let ecriresoustraction = function (upos, P) {
            objets.push(texteParPosition('-',upos-P.length-0.5, 10 - i * 2, 'milieu', 'black', 1.2, 'middle', true))
            for (let k = 0; k<P.length; k++) {
                objets.push(texteParPosition(P[P.length-k-1],upos-k-1, 10 - i * 2, 'milieu', 'black', 1.2, 'middle', true))
            }
        }
        let ecrirereste = function (upos, R) {
            objets.push(segment(i - 1, 9.6 - i * 2, i + R.length, 9.6 - i * 2))
            for (let k = 0; k < R.length; k++) {
                objets.push(texteParPosition(R[R.length-k-1], upos-k-1, 9 - i * 2, 'milieu', 'black', 1.2, 'middle', true))
            }
        }
        let ecrirequotient = function (x,Q) {
            objets.push(texteParPosition(Q, n + 1.5 + x, 10, 'milieu', 'black', 1.2, 'middle', true))
        }

        let divd = [], Q = [], R = [], P = []
        let dividende = Number(divid).toString()
        let diviseur = Number(divis).toString()
        let n = Math.log10(ordreDeGrandeur(divid, 1)) //nombre de chiffres du dividende
        let m = Math.log10(ordreDeGrandeur(divis, 1))  //nombre de chiffre du diviseur
        let upos=m

        for (let i = 0; i < n; i++) { //on écrit le dividende
            objets.push(texteParPosition(dividende[i], i, 11, 'milieu', 'black', 1.2, 'middle', true))
        }
        for (let i = 0; i < m; i++) { //on écrit le diviseur
            objets.push(texteParPosition(diviseur[i], i + n + 1.5, 11, 'milieu', 'black', 1.2, 'middle', true))
        }
        if (dec1+dec2!=0) {
            objets.push(texteParPosition(',',  n-dec1-dec2-1 + 0.5, 11, 'milieu', 'black', 1.2, 'middle', true))
        }
        objets.push(segment(n, 11.5, n, 11.5 - n * 2)) //on trace le trait vertical

        let i = 0
        divd.push(dividende.substr(0, m))
        if (parseInt(divd[0]) < divis) {
            divd[0] += dividende.substr(m, 1)
            if (divis/(10**dec2)<divis&&zeroutile) ecrirequotient(-1,"0")
            upos++
        }
        else if (zeroutile) 
              ecrirequotient(-1,"0")
        while (upos <= n) {
            Q.push(Number(Math.floor(parseInt(divd[i]) / divis)).toString())
            R.push(Number(parseInt(divd[i]) % divis).toString())
            P.push("")
           if (Q[i] == '0') {
                for (let z = 0; z < m; z++) {
                    P[i] += '0'
                }
            }
            else {
                P[i]+=Number(parseInt(Q[i]) * divis).toString()
            }
            ecriresoustraction(upos, P[i])
            if (upos <n) {
                R[i] += dividende.substr(upos, 1)
                ecrirereste(upos+1,R[i])                
            }
            else {
                ecrirereste(upos,R[i])   
            }
          //  for (let r=0;r<i;r++){
          //      if (R[i]==R[r]) periode=i-r
          //  }
            divd.push(R[i])
            upos++
           
          //  if (periode!=0) {
          //      ecrirequotient(i,'...')
          //      break
          //  }
          //  else 
                ecrirequotient(i,Q[i])
            i++
        }
        if (precision>0&&periode==0) {
                objets.push(texteParPosition(',', n+1+i-dec2-dec1, 10, 'milieu', 'black', 1.2, 'middle', true))
        }
        else if (periode!=0){
            objets.push(texteParPosition(',', 2*n-dec2-dec1, 10, 'milieu', 'black', 1.2, 'middle', true))
        }
        objets.push(segment(n, 10.5, n + m+i, 10.5)) //on trace le trait horizontal

        let code = mathalea2d({ xmin: -1.5, ymin: 10 - 2 * n, xmax: n + m + 10, ymax: 11.5, pixelsParCm: 20, scale: 0.8 }, objets)
        return code
    }

    let AdditionPosee3d = function (operande1, operande2) {
        let dec1 = nombreDeChiffresApresLaVirgule(operande1)
        let dec2 = nombreDeChiffresApresLaVirgule(operande2)
        let decalage = Math.max(dec1, dec2)
        operande1 = nombrec2(`${operande1}*10^${decalage}`)
        operande2 = nombrec2(`${operande2}*10^${decalage}`)
        console.log (operande1,operande2)
        let code = "", objets = []
        let sop1 = Number(operande1).toString()
        let sop2 = Number(operande2).toString()

        let sresultat, resultat, lresultat
        let lop1 = sop1.length
        let lop2 = sop2.length
        let longueuroperandes = Math.max(lop1, lop2)
        let retenues = " "
        if (lop1 > lop2) { // si op1 a plus de chiffres qu'op2 on complète op2 avec des zéros.
            for (let j = 0; j < lop1 - lop2; j++) {
                sop2 = ` ` + sop2
            }
        }
        else if (lop2 > lop1) { //on fait pareil pour op1 si c'est op2 le plus 'grand'
            for (let j = 0; j < lop2 - lop1; j++) {
                sop1 = ` ` + sop1
            }
        }
        console.log(sop1,sop2)
        // les deux operande ont le même nomre de chiffres
        for (let i = longueuroperandes - 1; i > 0; i--) { // on construit la chaine des retenues.
            if (parseInt(sop1[i]) + parseInt(sop2[i]) > 9) {
                retenues = `1${retenues}`
            }
            else {
                retenues = ` ${retenues}`
            }
        }
        retenues = ` ` + retenues
        sop1 = ` ${sop1}`
        sop2 = `+${sop2}`
        resultat = operande1 + operande2
        console.log(resultat)
        sresultat = Number(resultat).toString()
        lresultat = sresultat.length
        for (let i = 0; i < longueuroperandes + 1 - lresultat; i++) {
            sresultat = ` ${sresultat}`
        }
        for (let i = 0; i < longueuroperandes + 1; i++) {
            if (sop1[i] != ' ') objets.push(texteParPosition(sop1[i], i * 0.6, 4, 'milieu', 'black', 1.2, 'middle', true))
            if (sop2[i] != ' ') objets.push(texteParPosition(sop2[i], i * 0.6, 3, 'milieu', 'black', 1.2, 'middle', true))
            objets.push(segment(0, 2, (longueuroperandes + 1) * 0.6, 2))
            if (retenues[i] != ' ') objets.push(texteParPosition(retenues[i], i * 0.6, 2.5, 'milieu', 'red', 0.8, 'middle', true))
            if (sresultat[i] != ' ') objets.push(texteParPosition(sresultat[i], i * 0.6, 1, 'milieu', 'black', 1.2, 'middle', true))
        }
        if (decalage != 0) {
            objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 4, 'milieu', 'black', 1.2, 'middle', true))
            objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 3, 'milieu', 'black', 1.2, 'middle', true))
            objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 1, 'milieu', 'black', 1.2, 'middle', true))
        }
        code += mathalea2d({ xmin: -0.5, ymin: 0, xmax: longueuroperandes, ymax: 5, pixelsParCm: 20, scale: 0.8 }, objets)
        return code
    }

    let SoustractionPosee3d = function (operande1, operande2) {
        let dec1 = nombreDeChiffresApresLaVirgule(operande1)
        let dec2 = nombreDeChiffresApresLaVirgule(operande2)
        let decalage = Math.max(dec1, dec2)
        operande1 = nombrec2(`${operande1}*10^${decalage}`)
        operande2 = nombrec2(`${operande2}*10^${decalage}`)
        let code = "", sop1, sop2, objets = []
        if (operande1 < operande2) {
            sop2 = Number(operande1).toString()
            sop1 = Number(operande2).toString()
        }
        else {
            sop1 = Number(operande1).toString()
            sop2 = Number(operande2).toString()
        }
        let sresultat, resultat, lresultat
        let lop1 = sop1.length
        let lop2 = sop2.length
        let longueuroperandes = lop1
        let retenues = `00`
        if (lop1 > lop2) { // si op1 a plus de chiffres qu'op2 on complète op2 avec des blancs.
            for (let j = 0; j < lop1 - lop2; j++) {
                sop2 = ` ` + sop2
            }
        }

        // les deux operande ont le même nomre de chiffres
        for (let i = longueuroperandes - 1; i >= lop1 - lop2; i--) { // on construit la chaine des retenues.
            if (parseInt(sop1[i]) < (parseInt(sop2[i]) + parseInt(retenues.charAt(0)))) {
                retenues = `1${retenues}`
            }
            else {
                retenues = `0${retenues}`
            }
        }
        sop1 = ` ${sop1}`
        sop2 = `-${sop2}`
        retenues = `0${retenues}`
        resultat = operande1 - operande2
        sresultat = Number(resultat).toString()
        lresultat = sresultat.length
        for (let i = 0; i < longueuroperandes + 1 - lresultat; i++) {
            sresultat = ` ${sresultat}`
        }
        for (let i = 0; i < longueuroperandes + 1; i++) {
            if (retenues[i] != '0') objets.push(texteParPosition(retenues[i], i * 0.6 + 0.4, 4.1, 'milieu', 'red', 0.8, 'middle', true))
            if (sop1[i] != ' ') objets.push(texteParPosition(sop1[i], i * 0.6, 4, 'milieu', 'black', 1.2, 'middle', true))
            if (sop2[i] != ' ') objets.push(texteParPosition(sop2[i], i * 0.6, 3, 'milieu', 'black', 1.2, 'middle', true))
            objets.push(segment(0, 2, (longueuroperandes + 1) * 0.6, 2))
            if (retenues[i] != '0') objets.push(texteParPosition(retenues[i], i * 0.6, 2.6, 'milieu', 'blue', 0.8, 'middle', true))
            if (sresultat[i] != ' ') objets.push(texteParPosition(sresultat[i], i * 0.6, 1, 'milieu', 'black', 1.2, 'middle', true))
        }
        if (decalage != 0) {
            objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 4, 'milieu', 'black', 1.2, 'middle', true))
            objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 3, 'milieu', 'black', 1.2, 'middle', true))
            objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 1, 'milieu', 'black', 1.2, 'middle', true))
        }
        code += mathalea2d({ xmin: -0.5, ymin: 0, xmax: longueuroperandes, ymax: 5, pixelsParCm: 20, scale: 0.8 }, objets)
        return code
    }
    let MultiplicationPosee3d = function (operande1, operande2) {
        let code, sop1, sop2, objets = [], dec1, dec2, operandex,lignesinutiles=0

        let produits = [], strprod, sommes = []
        if (operande1 < operande2) {
            operandex = operande1
            operande1 = operande2
            operande2 = operandex
        }
        dec1 = nombreDeChiffresApresLaVirgule(operande1)
        dec2 = nombreDeChiffresApresLaVirgule(operande2)
        operande1 = nombrec2(`${operande1}*10^${dec1}`)
        operande2 = nombrec2(`${operande2}*10^${dec2}`)
        sop1 = Number(operande1).toString()
        sop2 = Number(operande2).toString()
        let sresultat, resultat, lresultat
        let lop1 = sop1.length
        let lop2 = sop2.length
        let longueurtotale = lop1 + lop2 + 1
        let retenues = [];
        for (let i = 0; i < sop2.length; i++) {
            retenues.push("0")
            produits.push("")
            for (let k = 0; k < i; k++) {
                retenues[i] = `${retenues[i]}0`
                produits[i] = `${produits[i]}°`
            }
            if (sop2[lop2 - i - 1] != '0') {
                for (let j = 0; j < sop1.length; j++) {
                    strprod = parseInt(sop1[lop1 - j - 1] * parseInt(sop2[lop2 - i - 1])) + parseInt(retenues[i][0])
                    retenues[i] = `${Number(Math.floor(strprod / 10)).toString()}${retenues[i]}`
                    produits[i] = `${Number(strprod % 10).toString()}${produits[i]}`
                }
                produits[i] = `${retenues[i][0]}${produits[i]}`
            }
            else {
                for (let j = 0; j < sop1.length; j++) {
                    retenues[i] = `0${retenues[i]}`
                    produits[i] = `°${produits[i]}`
                }
            }
        }

        for (let i = lop2; i < longueurtotale; i++) {
            sop2 = ` ${sop2}`
        }
        for (let i = lop1; i <= longueurtotale; i++) {
            sop1 = ` ${sop1}`
        }
        for (let i = 0; i < lop2; i++) {
            for (let j = retenues[i].length; j <= longueurtotale; j++) {
                retenues[i] = `0${retenues[i]}`
            }
        }
        resultat = nombrec2(`${operande1}*${operande2}`)
        sresultat = Number(resultat).toString()
        lresultat = sresultat.length
        for (let i = 0; i < lop2; i++) {
            for (let j = produits[i].length; j <= lresultat; j++) {
                produits[i] = `0${produits[i]}`
            }
        }
        retenues.push(`0`)
        for (let i = 0; i < lresultat - 1; i++) {
            sommes.push(0)
            sommes[i] += parseInt(retenues[lop2][0])
            for (let j = 0; j < lop2; j++) {
                if (produits[j][lresultat - i] != '0' && produits[j][lresultat - i] != '°') {
                    sommes[i] += parseInt(produits[j][lresultat - i])
                }
            }
            retenues[lop2] = `${Number(Math.floor(sommes[i] / 10)).toString()[0]}${retenues[lop2]}`
        }
        for (let i = 0; i < lop2; i++) {
            produits[i] = cacherleszerosdevant(produits[i])
            for (let j = produits[i].length; j <= longueurtotale; j++) {
                produits[i] = ` ${produits[i]}`
            }
        }
        sop2 = `×${sop2}`
        for (let i = lresultat; i <= longueurtotale; i++) {
            sresultat = ` ${sresultat}`
        }
        for (let i = retenues[lop2].length; i <= longueurtotale; i++) {
            retenues[lop2] = `0${retenues[lop2]}`
        }
        for (let i = 0; i <= longueurtotale; i++) {
            if (sop1[i] != ' ') objets.push(texteParPosition(sop1[i], i * 0.6, 7, 'milieu', 'black', 1.2, 'middle', true))
            if (sop2[i] != ' ') objets.push(texteParPosition(sop2[i], i * 0.6, 6, 'milieu', 'black', 1.2, 'middle', true))
        }
        if (dec1 != 0)
            objets.push(texteParPosition(',', 0.3 + (longueurtotale - dec1) * 0.6, 7, 'milieu', 'black', 1.2, 'middle', true))
        if (dec2 != 0)
            objets.push(texteParPosition(',', 0.3 + (longueurtotale - dec2) * 0.6, 6, 'milieu', 'black', 1.2, 'middle', true))

        for (let j = 0; j < lop2; j++) {
            if (sop2[longueurtotale-j]!='0'){
            for (let i = 0; i <= longueurtotale; i++) {
                if (produits[j][i] != ' ' & produits[j][i] != '°') objets.push(texteParPosition(produits[j][i], i * 0.6, 5 - j+lignesinutiles, 'milieu', 'black', 1.2, 'middle', true))
                if (retenues[j][i] != '0') objets.push(texteParPosition(retenues[j][i], i * 0.6, 5.5 - j+lignesinutiles, 'milieu', 'blue', 0.7, 'middle', true))
            }
        }
        else 
            lignesinutiles++
        }

        for (let i = 0; i <= longueurtotale; i++) {
            if (retenues[lop2][i] != '0') objets.push(texteParPosition(retenues[lop2][i], i * 0.6, 5.5 - lop2+lignesinutiles, 'milieu', 'red', 0.7, 'middle', true))
        }
        objets.push(segment(0, 5.2 - lop2+lignesinutiles, (longueurtotale + 1) * 0.6, 5.2 - lop2+lignesinutiles))
        objets.push(segment(0, 5.7, (longueurtotale + 1) * 0.6, 5.7))
        for (let i = 0; i <= longueurtotale; i++) {
            if (sresultat[i] != ' ') objets.push(texteParPosition(sresultat[i], i * 0.6, 4.5 - lop2+lignesinutiles, 'milieu', 'black', 1.2, 'middle', true))
        }
        if (dec1 + dec2 != 0)
            objets.push(texteParPosition(',', 0.3 + (longueurtotale - dec2 - dec1) * 0.6, 4.5 - lop2+lignesinutiles, 'milieu', 'black', 1.2, 'middle', true))

        code = mathalea2d({ xmin: -0.5, ymin: 4 - lop2, xmax: longueurtotale + 2, ymax: 8, pixelsParCm: 20, scale: 0.8 }, objets)


        return code
    }

    switch (type) {
        case 'addition':
            if (sortie_html)
                Code = AdditionPosee3d(operande1, operande2)
            else
                Code = `$\\opadd[decimalsepsymbol={,}]{${operande1}}{${operande2}}$`

            break
        case 'soustraction':
            if (sortie_html)
                Code = SoustractionPosee3d(operande1, operande2)
            else
                Code = `$\\opsub[decimalsepsymbol={,}]{${operande1}}{${operande2}}$`
            break
        case 'multiplication':
            if (sortie_html)
                Code = MultiplicationPosee3d(operande1, operande2)
            else
                Code = `$\\opmul[decimalsepsymbol={,}]{${operande1}}{${operande2}}$`
            break
        case 'division':
            if (sortie_html)
                Code = DivisionPosee3d(operande1, operande2,precision);
            else
                Code = `$\\opdiv[displayintermediary=all,voperation=top,period,decimalsepsymbol={,},shiftdecimalsep=none]{${operande1}}{${operande2}}$`
            break
         }
    return Code
} 