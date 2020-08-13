/*
  MathALEA2D
 @name      fractions.js
 @author    Jean-Claude Lhote
 @license   MIT License - CC-BY-SA
 @homepage  
 */

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJET PARENT %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

* Classe parente de tous les objets de fractions
*
* @Auteur Rémi Angot
*/
function Fraction(num,den) {

    this.num = num || 0;
    this.den=den || 1;
    this.numIrred=fraction_simplifiee(this.num,this.den)[0]
    this.denIrred=fraction_simplifiee(this.num,this.den)[1]   
    this.oppose = function(){
        return fraction(-this.num,this.den)
    }
    this.opposeIrred = function(){
        return fraction(-this.numIrred,this.denIrred)
    }
  
    this.inverse = function(){
        return fraction(this.den,this.num)
    }
    this.inverseIrred = function(){
        return fraction(this.denIrred,this.numIrred)
    }
    this.sommeFraction =function(f2) {
        return fraction(this.num*f2.den+f2.num*this.den,this.den*f2.den)
    }
    this.sommeFractions = function(...fractions){
        let s=fraction(this.num,this.den)
        for (let f of fractions) {
            s=s.sommeFraction(f)
        }
        return s
    }
    this.produitFraction = function(f2) {
        return fraction(this.num*f2.num,this.den*f2.den)
    }
    this.puissanceFraction = function(n) {
        return fraction(this.num**n,this.den**n)
    }
    this.produitFractions = function(...fractions){
        let p=fraction(this.num,this.den)
        for (let f of fractions) {
            p=p.produitFraction(f)
        }
        return p
    }
    this.differenceFraction = function(f2) {
        return this.sommeFraction(f2.oppose())
    }
    this.representation = function (depart = 0, type = 'gateau') {

        if (type == 'gateau') {
            let n = quotientier(this.numIrred, this.denIrred)
            let num = this.numIrred
            let k,dep
            for (k = 0; k < n; k++) {
                let O = point(2 + k * 5, 2)
                let C = cercle(O, 2)
                let s, a
                for (let i = 0; i < this.denIrred; i++) {
                    s = segment(O, rotation(point(4+k*5, 2), O, i * 360 / this.denIrred))
                }
                dep = rotation(point(4 + k * 5, 2), O, depart * 360 / this.denIrred)
                for (let j = 0; j < Math.min(this.denIrred, num); j++) {
                    a = arc(dep, O, 360 / this.denIrred, true, fill = 'gray', color = 'black')
                    dep = rotation(dep, O, 360 / this.denIrred)
                }
                num -= this.denIrred
            }
            console.log(k,n)
            let O = point(2 + k * 5, 2)
            let C = cercle(O, 2)
            let s, a
            for (let i = 0; i < this.denIrred; i++) {
                s = segment(O, rotation(point(4+k*5, 2), O, i * 360 / this.denIrred))
            }
            dep = rotation(point(4 + k * 5, 2), O, depart * 360 / this.denIrred)
            for (let j = 0; j < Math.min(this.denIrred, num); j++) {
                a = arc(dep, O, 360 / this.denIrred, true, fill = 'gray', color = 'black')
                dep = rotation(dep, O, 360 / this.denIrred)
            }
        }
        else if (type == 'segment') {

        }
        else {

        }
    }
}

function fraction (a,b) {
    return new Fraction(a,b)
}

let Frac = new Fraction();






