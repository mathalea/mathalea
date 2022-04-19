// import { texNombre2 } from '../outils.js'
// import { simplify, parse, unit, max, add, subtract, abs, log10, random, round } from 'mathjs'
// import { aleaName } from '../outilsMathjs.js'
// import { GVGraphicObject, GVPoint } from './elements.js'

// /**
//  * Grandeur, methods for operations
//  * 
//  */
// export class GVGrandeur {
//   value: number
//   precision: number
//   unit: string
//   toFixed: number
//   nameAndValue: string
//   private _name: string
//   calcul: string
//   constructor (name: string | GVPoint[], value: number, precision:number = 1, unit: string = '') {
//     this.value = round(value,precision)
//     this.precision = precision
//     this.unit = unit
//     this.toFixed = round(this.value,this.precision)
//     this.name = name
//   }

//   set name (newname: string | GVPoint[]) {
//     if (typeof newname === 'string') {
//       this._name = newname
//     } else {
//       this._name = (aleaName(newname).map(x => x.name)).join('')
//     }
//     this.nameAndValue = `$ {${this.name}=${texNombre2(this.toFixed).replace(',', '{,}')}~${this.unit.replace('deg','\\degree')}}$`.replace('~\\degree','\\degree')
//   }

//   get name () { return this._name }

//   format() { 
//     return `{${texNombre2(this.toFixed).replace(',', '{,}')}~${this.unit.replace('deg','\\degree')}}`.replace('~\\degree','\\degree')
//   }

//   aleaName (...name: (string | GVGraphicObject)[]) {
//     this.name = aleaName(name.map(x => {
//       if (x instanceof GVGraphicObject) {
//         return x.name
//       } else {
//         return x
//       }
//     }), name.length).join('')
// }

//   multiply (a: GVGrandeur) {
//     const expression = simplify([this.name, a.name].filter(x => x !== '').join('*').replaceAll('{','(').replaceAll('}',')')).toString()
//     const calcul = parse(unit(this.toFixed+this.unit).multiply(unit(a.toFixed+a.unit)).toString())
//     return new GVGrandeur(
//       expression,
//       parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
//       this.precision + a.precision,
//       calcul.isConstantNode ? '' : calcul.args[1].toString()
//       )
//   }
  
//   divide (a: GVGrandeur) {
//     const expression = simplify([this.name, a.name].filter(x => x !== '').join('/').replaceAll('{','(').replaceAll('}',')')).toString()
//     const calcul = parse(unit(this.toFixed+this.unit).divide(unit(a.toFixed+a.unit)).toString())
//     return new GVGrandeur(
//       expression,
//       parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
//       this.precision - a.precision,
//       calcul.isConstantNode ? '' : calcul.args[1].toString()
//       )
//   }

//   add (a: GVGrandeur) {
//     const expression = simplify([this.name, a.name].filter(x => x !== '').join('+').replaceAll('{','(').replaceAll('}',')')).toString()
//     const calcul = parse(add(unit(this.toFixed+this.unit),unit(a.toFixed+a.unit)).toString())
//     return new GVGrandeur(
//       expression,
//       parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
//       max(this.precision,a.precision),
//       calcul.isConstantNode ? '' : calcul.args[1].toString()
//       )
//   }

//   subtract (a: GVGrandeur) {
//     const expression = simplify([this.name, a.name].filter(x => x !== '').join('-').replaceAll('{','(').replaceAll('}',')')).toString()
//     const calcul = parse(subtract(unit(this.toFixed+this.unit),unit(a.toFixed+a.unit)).toString())
//     return new GVGrandeur(
//       expression,
//       parseFloat(calcul.isConstantNode ? calcul.toString() : calcul.args[0].toString()),
//       max(this.precision,a.precision),
//       calcul.isConstantNode ? '' : calcul.args[1].toString()
//       )
//   }

//   hypotenuse (a: GVGrandeur) {
//     return a.pow(2).add(this.pow(2)).sqrt()
//   }

//   /**
//    * this^n
//    * @param {number} n // Integer
//    * @returns {GVGrandeur}
//    */
//   pow (n: number): GVGrandeur {
//     return new GVGrandeur(this.name+'^{'+n+'}',Math.pow(this.toFixed,n),n*this.precision,this.unit+'^'+n)
//   }

//   /**
//    * this^n
//    * @param n // Integer
//    * @returns {GVGrandeur}
//    */
//    sqrt (): GVGrandeur {
//     return new GVGrandeur('\\sqrt{'+this.name+'}',Math.pow(this.toFixed,0.5),Math.floor(0.5*this.precision),'cm')
//   }

//   abs (): GVGrandeur {
//     return new GVGrandeur(
//       this._name,
//       abs(this.value),
//       this.precision,
//       this.unit
//       )
//   }

//   neg (): GVGrandeur {
//     return new GVGrandeur(
//       '-' + this.name,
//       -this.value,
//       this.precision,
//       this.unit
//       )
//   }

//   to (newUnit: string): GVGrandeur {
//     const thenumber = abs(unit(this.value,this.unit))
//     const conversion = abs(thenumber.to(newUnit))
//     const precision = Math.max(0,this.precision - log10(parse(conversion.toString()).args[0].value/parse(thenumber.toString()).args[0].value))
//     return new GVGrandeur(
//       this.name,
//       parse(conversion.toString()).args[0].value,
//       precision,
//       newUnit
//     )
//   }
// }

// /**
//  * Quantity random
//  * @param {number} nmin 
//  * @param {number} nmax 
//  * @param {number} digit 
//  * @param {string} name 
//  * @param {string} unit 
//  * @returns {GVGrandeur}
//  */
// export function qrandom (nmin: number = 0, nmax: number = 1, digit: number = max(0,-log10(abs(nmax-nmin))), name: string = '', unit: string = ''): GVGrandeur {
//   return new GVGrandeur(
//     name,
//     round(random(nmin, nmax),max(digit,0)),
//     digit,
//     unit
//   )
// }