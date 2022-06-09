import { ordreDeGrandeur, base10VersBaseN } from './outils.js'
import Decimal from 'decimal.js'
import { mathalea2d, texteParPosition, segment } from './2d.js'
import { context } from './context.js'
/**
 *
 * Pose une opération
 * @author Jean-Claude Lhote
 * les types possibles sont : addition, soustraction, multiplication, division, additiond, soustractiond, multiplicationd, divisiond
 * Le paramètre précision précise pour divisiond, le nombre de chiffres après la virgule dans le quotient.
 */

export default function Operation ({ operande1 = 1, operande2 = 2, type = 'addition', precision = 0, base = 10, retenuesOn = true }) { // precision est pour le quotient décimal
  let Code
  const nombreDeChiffresApresLaVirgule = function (x) {
    const s = x.toString()
    const pe = x.floor().toString()
    if (pe.length === s.length) return 0
    return s.length - pe.length - 1
  }

  const cacherleszerosdevant = function (chaine) {
    let blancs = ''
    while (chaine[0] === '0') {
      chaine = chaine.substr(1)
      blancs += ' '
    }
    for (let i = 0; i < chaine.length; i++) {
      blancs += `${chaine[i]}`
    }
    return blancs
  }

  const DivisionPosee3d = function (divid, divis, precision = 0, retenuesOn) {
    const objets = []; let zeroutile = false; const periode = 0
    precision = Math.min(precision, nombreDeChiffresApresLaVirgule(divid.div(divis)))
    const decalage = nombreDeChiffresApresLaVirgule(divis)
    const dec1 = nombreDeChiffresApresLaVirgule(divid)
    if (divid.lt(divis)) { zeroutile = true }
    divis = divis.mul(10 ** decalage)
    divid = divid.mul(10 ** (decalage + dec1))
    let dec2 = nombreDeChiffresApresLaVirgule(divid)
    dec2 = precision - dec2 - dec1
    divid = divid.mul(10 ** dec2) // math.format(divid * 10 ** dec2, { notation: 'auto', lowerExp: -12, upperExp: 12, precision: 12 })
    const ecriresoustraction = function (upos, P) {
      objets.push(texteParPosition('-', upos - P.length - 0.5, 10 - i * 2, 'milieu', 'black', 1.2, 'middle', false))
      for (let k = 0; k < P.length; k++) {
        objets.push(texteParPosition(P[P.length - k - 1], upos - k - 1, 10 - i * 2, 'milieu', 'black', 1.2, 'middle', false))
      }
    }
    const ecrirereste = function (upos, R) {
      objets.push(segment(i - 1, 9.6 - i * 2, i + R.length, 9.6 - i * 2))
      for (let k = 0; k < R.length; k++) {
        objets.push(texteParPosition(R[R.length - k - 1], upos - k - 1, 9 - i * 2, 'milieu', 'black', 1.2, 'middle', false))
      }
    }
    const ecrirequotient = function (x, Q) {
      objets.push(texteParPosition(Q, n + 1.5 + x, 10, 'milieu', 'black', 1.2, 'middle', false))
    }

    const divd = []; const Q = []; const R = []; const P = []
    const dividende = divid.toString()
    const diviseur = divis.toString()
    const n = Math.log10(ordreDeGrandeur(divid.toNumber(), 1)) // nombre de chiffres du dividende
    const m = Math.log10(ordreDeGrandeur(divis.toNumber(), 1)) // nombre de chiffre du diviseur
    let upos = m

    for (let i = 0; i < n; i++) { // on écrit le dividende
      objets.push(texteParPosition(dividende[i], i, 11, 'milieu', 'black', 1.2, 'middle', false))
    }
    for (let i = 0; i < m; i++) { // on écrit le diviseur
      objets.push(texteParPosition(diviseur[i], i + n + 1.5, 11, 'milieu', 'black', 1.2, 'middle', false))
    }
    if (dec1 + dec2 !== 0) {
      objets.push(texteParPosition(',', n - dec1 - dec2 - 1 + 0.5, 11, 'milieu', 'black', 1.2, 'middle', false))
    }
    objets.push(segment(n, 11.5, n, 11.5 - n * 2)) // on trace le trait vertical

    let i = 0
    divd.push(dividende.substr(0, m))
    if (parseInt(divd[0]) < divis) {
      divd[0] += dividende.substr(m, 1)
      if (divis.div(10 ** dec2).lt(divis) && zeroutile) ecrirequotient(-1, '0')
      upos++
    } else if (zeroutile) { ecrirequotient(-1, '0') }
    while (upos <= n) {
      Q.push(new Decimal(divd[i]).div(divis).floor().toString())
      R.push(new Decimal(divd[i]).mod(divis).toString())
      P.push('')
      if (Q[i] === '0') {
        for (let z = 0; z < m; z++) {
          P[i] += '0'
        }
      } else {
        P[i] += divis.mul(parseInt(Q[i])).toString()
      }
      ecriresoustraction(upos, P[i])
      if (upos < n) {
        R[i] += dividende.substr(upos, 1)
        ecrirereste(upos + 1, R[i])
      } else {
        ecrirereste(upos, R[i])
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
      ecrirequotient(i, Q[i])
      i++
    }
    if (precision > 0 && periode === 0) {
      objets.push(texteParPosition(',', n + 1 + i - dec2 - dec1, 10, 'milieu', 'black', 1.2, 'middle', false))
    } else if (periode !== 0) {
      objets.push(texteParPosition(',', 2 * n - dec2 - dec1, 10, 'milieu', 'black', 1.2, 'middle', false))
    }
    objets.push(segment(n, 10.5, n + m + i, 10.5)) // on trace le trait horizontal

    const code = mathalea2d({ xmin: -1.5, ymin: 10 - 2 * n, xmax: n + m + 10, ymax: 11.5, pixelsParCm: 20, scale: 0.8 }, objets)
    return code
  }

  const AdditionPosee3d = function (operande1, operande2, base, retenuesOn) {
    const dec1 = nombreDeChiffresApresLaVirgule(operande1)
    const dec2 = nombreDeChiffresApresLaVirgule(operande2)
    let code = ''
    const objets = []
    let sop1; let sop2
    let sresultat
    let resultat
    let lresultat
    let decalage
    if (base ? base === 10 : true) {
      decalage = Math.max(dec1, dec2)
      operande1 = operande1.mul(10 ** decalage)
      operande2 = operande2.mul(10 ** decalage)
      sop1 = operande1.toString()
      sop2 = operande2.toString()
      resultat = operande1.plus(operande2)
      sresultat = resultat.toString()
      lresultat = sresultat.length
    } else {
      decalage = 0
      sop1 = base10VersBaseN(operande1, base)
      sop2 = base10VersBaseN(operande2, base)
      resultat = operande1.plus(operande2)
      sresultat = base10VersBaseN(resultat, base)
      lresultat = sresultat.length
    }
    const lop1 = sop1.length
    const lop2 = sop2.length
    const longueuroperandes = Math.max(lop1, lop2)
    let retenues = ' '
    if (lop1 > lop2) { // si op1 a plus de chiffres qu'op2 on complète op2 avec des zéros.
      for (let j = 0; j < lop1 - lop2; j++) {
        sop2 = ' ' + sop2
      }
    } else if (lop2 > lop1) { // on fait pareil pour op1 si c'est op2 le plus 'grand'
      for (let j = 0; j < lop2 - lop1; j++) {
        sop1 = ' ' + sop1
      }
    }
    // les deux operande ont le même nomre de chiffres
    for (let i = longueuroperandes - 1; i > 0; i--) { // on construit la chaine des retenues.
      if (parseInt(sop1[i], base) + parseInt(sop2[i], base) + parseInt(retenues[0] > 0 ? retenues[0] : 0) > base - 1) {
        retenues = `1${retenues}`
      } else {
        retenues = ` ${retenues}`
      }
    }
    retenues = ' ' + retenues
    sop1 = ` ${sop1}`
    sop2 = `+${sop2}`

    for (let i = 0; i < longueuroperandes + 1 - lresultat; i++) {
      sresultat = ` ${sresultat}`
    }
    for (let i = 0; i < longueuroperandes + 1; i++) {
      if (sop1[i] !== ' ') objets.push(texteParPosition(sop1[i], i * 0.6, 4, 'milieu', 'black', 1.2, 'middle', false))
      if (sop2[i] !== ' ') objets.push(texteParPosition(sop2[i], i * 0.6, 3, 'milieu', 'black', 1.2, 'middle', false))
      objets.push(segment(0, 2, (longueuroperandes + 1) * 0.6, 2))
      if (retenues[i] !== ' ' && retenuesOn) objets.push(texteParPosition(retenues[i], i * 0.6, 2.5, 'milieu', 'red', 0.8, 'middle', false))
      if (sresultat[i] !== ' ') objets.push(texteParPosition(sresultat[i], i * 0.6, 1, 'milieu', 'black', 1.2, 'middle', false))
    }
    if (decalage !== 0) {
      objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 4, 'milieu', 'black', 1.2, 'middle', false))
      objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 3, 'milieu', 'black', 1.2, 'middle', false))
      objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 1, 'milieu', 'black', 1.2, 'middle', false))
    }
    code += mathalea2d({ xmin: -0.5, ymin: 0, xmax: longueuroperandes, ymax: 5, pixelsParCm: 20, scale: 0.8 }, objets)
    return code
  }

  const SoustractionPosee3d = function (operande1, operande2, base, retenuesOn = true) {
    let code = ''
    const objets = []
    let sop1; let sop2
    let sresultat
    let resultat
    let lresultat
    let decalage
    if (base ? base === 10 : true) {
      const dec1 = nombreDeChiffresApresLaVirgule(operande1)
      const dec2 = nombreDeChiffresApresLaVirgule(operande2)
      decalage = Math.max(dec1, dec2)
      operande1 = operande1.mul(10 ** decalage)
      operande2 = operande2.mul(10 ** decalage)
      resultat = operande1.sub(operande2)
      sresultat = resultat.toString()
      lresultat = sresultat.length
      if (operande1.lt(operande2)) {
        sop2 = operande1.toString()
        sop1 = operande2.toString()
      } else {
        sop1 = operande1.toString()
        sop2 = operande2.toString()
      }
    } else {
      decalage = 0
      sop1 = base10VersBaseN(operande1, base)
      sop2 = base10VersBaseN(operande2, base)
      resultat = operande1.sub(operande2)
      sresultat = base10VersBaseN(resultat, base)
      lresultat = sresultat.length
    }
    const lop1 = sop1.length
    const lop2 = sop2.length
    const longueuroperandes = lop1
    let retenues = '00'
    if (lop1 > lop2) { // si op1 a plus de chiffres qu'op2 on complète op2 avec des blancs.
      for (let j = 0; j < lop1 - lop2; j++) {
        sop2 = ' ' + sop2
      }
    }

    // les deux operande ont le même nomre de chiffres
    for (let i = longueuroperandes - 1; i >= lop1 - lop2; i--) { // on construit la chaine des retenues.
      if (parseInt(sop1[i], base) < (parseInt(sop2[i], base) + parseInt(retenues.charAt(0), base))) {
        retenues = `1${retenues}`
      } else {
        retenues = `0${retenues}`
      }
    }
    sop1 = ` ${sop1}`
    sop2 = `-${sop2}`
    retenues = `0${retenues}`

    for (let i = 0; i < longueuroperandes + 1 - lresultat; i++) {
      sresultat = ` ${sresultat}`
    }
    const offsetCarry = lop1 - lop2
    for (let i = 0; i < longueuroperandes + 1; i++) {
      if (retenues[i] !== '0' && retenuesOn) objets.push(texteParPosition(retenues[i], i * 0.6 - 0.2 + 0.6 * offsetCarry, 4.1, 'milieu', 'red', 0.8, 'middle', false))
      if (sop1[i] !== ' ') objets.push(texteParPosition(sop1[i], i * 0.6, 4, 'milieu', 'black', 1.2, 'middle', false))
      if (sop2[i] !== ' ') objets.push(texteParPosition(sop2[i], i * 0.6, 3, 'milieu', 'black', 1.2, 'middle', false))
      if (retenues[i] !== '0' && retenuesOn) objets.push(texteParPosition(retenues[i], i * 0.6 - 0.6 + 0.6 * offsetCarry, 2.6, 'milieu', 'blue', 0.8, 'middle', false))
      if (sresultat[i] !== ' ') objets.push(texteParPosition(sresultat[i], i * 0.6, 1, 'milieu', 'black', 1.2, 'middle', false))
    }
    objets.push(segment(0, 2, (longueuroperandes + 1) * 0.6, 2))
    if (decalage !== 0) {
      objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 4, 'milieu', 'black', 1.2, 'middle', false))
      objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 3, 'milieu', 'black', 1.2, 'middle', false))
      objets.push(texteParPosition(',', 0.3 + 0.6 * (longueuroperandes - decalage), 1, 'milieu', 'black', 1.2, 'middle', false))
    }
    code += mathalea2d({ xmin: -0.5, ymin: 0, xmax: longueuroperandes, ymax: 5, pixelsParCm: 20, scale: 0.8 }, objets)
    return code
  }
  const MultiplicationPosee3d = function (operande1, operande2, base) {
    let sop1; let sop2; const objets = []; let lignesinutiles = 0
    let zeroUtile1, zeroUtile2
    const produits = []; let strprod; const sommes = []
    let dec1, dec2
    if (base ? base === 10 : true) {
      zeroUtile1 = operande1.lt(1)
      zeroUtile2 = operande2.lt(1)
      dec1 = nombreDeChiffresApresLaVirgule(operande1)
      dec2 = nombreDeChiffresApresLaVirgule(operande2)
      operande1 = operande1.mul(10 ** dec1)
      operande2 = operande2.mul(10 ** dec2)
      sop1 = (zeroUtile1 ? '0' : '') + Number(operande1).toString()
      sop2 = (zeroUtile2 ? '0' : '') + Number(operande2).toString()
    } else {
      dec1 = 0
      dec2 = 0
      sop1 = base10VersBaseN(operande1, base)
      sop2 = base10VersBaseN(operande2, base)
    }
    let sresultat
    const lop1 = sop1.length
    const lop2 = sop2.length
    const longueurtotale = lop1 + lop2 + 1
    const retenues = []
    for (let i = 0; i < sop2.length; i++) {
      retenues.push('0')
      produits.push('')
      for (let k = 0; k < i; k++) {
        retenues[i] = `${retenues[i]}0`
        produits[i] = `${produits[i]}°`
      }
      if (sop2[lop2 - i - 1] !== '0') {
        for (let j = 0; j < sop1.length; j++) {
          if (base ? base === 10 : true) {
            strprod = parseInt(sop1[lop1 - j - 1] * parseInt(sop2[lop2 - i - 1])) + parseInt(retenues[i][0])
            if (j !== sop1.length - 1) retenues[i] = `${Number(Math.floor(strprod / 10)).toString()}${retenues[i]}`
            produits[i] = `${Number(strprod % 10).toString()}${produits[i]}`
          } else {
            strprod = parseInt(sop1[lop1 - j - 1], base) * parseInt(sop2[lop2 - i - 1], base) + parseInt(retenues[i][0], base)
            retenues[i] = `${Number(Math.floor(strprod / base)).toString()}${retenues[i]}`
            produits[i] = `${Number(strprod % base).toString()}${produits[i]}`
          }
        }
        produits[i] = `${Number(Math.floor(strprod / 10)).toString()}${produits[i]}`
      } else {
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
    let resultat
    if (base ? base === 10 : true) {
      resultat = operande1.mul(operande2)
    } else {
      resultat = base10VersBaseN(operande1.mul(operande2), base)
    }
    sresultat = resultat.toString()
    if (dec1 + dec2 === sresultat.length) sresultat = '0' + sresultat
    const lresultat = sresultat.length
    for (let i = 0; i < lop2; i++) {
      for (let j = produits[i].length; j <= lresultat; j++) {
        produits[i] = `0${produits[i]}`
      }
    }
    retenues.push('0')
    for (let i = 0; i < lresultat - 1; i++) {
      sommes.push(0)
      sommes[i] += parseInt(retenues[lop2][0])
      for (let j = 0; j < lop2; j++) {
        if (produits[j][lresultat - i] !== '0' && produits[j][lresultat - i] !== '°') {
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
      if (sop1[i] !== ' ') objets.push(texteParPosition(sop1[i], i * 0.6, 7, 'milieu', 'black', 1.2, 'middle', false))
      if (sop2[i] !== ' ') objets.push(texteParPosition(sop2[i], i * 0.6, 6, 'milieu', 'black', 1.2, 'middle', false))
    }
    if (dec1 !== 0) { objets.push(texteParPosition(',', 0.3 + (longueurtotale - dec1) * 0.6, 7, 'milieu', 'black', 1.2, 'middle', false)) }
    if (dec2 !== 0) { objets.push(texteParPosition(',', 0.3 + (longueurtotale - dec2) * 0.6, 6, 'milieu', 'black', 1.2, 'middle', false)) }

    for (let j = 0; j < lop2; j++) {
      if (sop2[longueurtotale - j] !== '0') {
        for (let i = 0; i <= longueurtotale; i++) {
          if (produits[j][i] !== ' ' && produits[j][i] !== '°') objets.push(texteParPosition(produits[j][i], i * 0.6, 5 - j + lignesinutiles, 'milieu', 'black', 1.2, 'middle', false))
          // if (retenues[j][i] !== '0' && retenuesOn) objets.push(texteParPosition(`(${retenues[j][i]})`, i * 0.6, 5.5 - j + lignesinutiles, 'milieu', 'blue', 0.7, 'middle', false))
        }
      } else { lignesinutiles++ }
    }

    for (let i = 0; i <= longueurtotale; i++) {
      if (retenues[lop2][i] !== '0') objets.push(texteParPosition(retenues[lop2][i], i * 0.6, 5.5, 'milieu', 'red', 0.7, 'middle', false))
    }
    objets.push(segment(0, 5.2 - lop2 + lignesinutiles, (longueurtotale + 1) * 0.6, 5.2 - lop2 + lignesinutiles))
    objets.push(segment(0, 5.7, (longueurtotale + 1) * 0.6, 5.7))
    for (let i = 0; i <= longueurtotale; i++) {
      if (sresultat[i] !== ' ') objets.push(texteParPosition(sresultat[i], i * 0.6, 4.5 - lop2 + lignesinutiles, 'milieu', 'black', 1.2, 'middle', false))
    }
    if (dec1 + dec2 !== 0) { objets.push(texteParPosition(',', 0.3 + (longueurtotale - dec2 - dec1) * 0.6, 4.5 - lop2 + lignesinutiles, 'milieu', 'black', 1.2, 'middle', false)) }
    for (let j = 1; j < lop2 - lignesinutiles; j++) {
      objets.push(texteParPosition('+', 0, 5 + j - lop2 + lignesinutiles, 'milieu', 'black', 1.2, 'middle', false))
    }
    const code = mathalea2d({ xmin: -0.5, ymin: 4 - lop2, xmax: longueurtotale + 2, ymax: 8, pixelsParCm: 20, scale: 0.8 }, objets)

    return code
  }
  operande1 = new Decimal(operande1)
  operande2 = new Decimal(operande2)
  switch (type) {
    case 'addition':
      if (context.isHtml) { Code = AdditionPosee3d(operande1, operande2, base, retenuesOn) } else { Code = `$\\opadd[decimalsepsymbol={,}]{${operande1}}{${operande2}}$` }

      break
    case 'soustraction':
      if (context.isHtml) { Code = SoustractionPosee3d(operande1, operande2, base, retenuesOn) } else { Code = `$\\opsub[carrysub,lastcarry,decimalsepsymbol={,}]{${operande1}}{${operande2}}$` }
      break
    case 'multiplication':
      if (context.isHtml) { Code = MultiplicationPosee3d(operande1, operande2, base) } else { Code = `$\\opmul[displayshiftintermediary=all,decimalsepsymbol={,}]{${operande1}}{${operande2}}$` }
      break
    case 'division':
      if (context.isHtml) { Code = DivisionPosee3d(operande1, operande2, precision, retenuesOn) } else { Code = `$\\opdiv[displayintermediary=all,voperation=top,period,decimalsepsymbol={,},shiftdecimalsep=none]{${operande1}}{${operande2}}$` }
      break
    case 'divisionE':
      if (context.isHtml) { Code = DivisionPosee3d(operande1, operande2, 0, retenuesOn) } else { Code = `$\\opidiv{${operande1}}{${operande2}}$` }
      break
  }
  return Code
}
