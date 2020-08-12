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
function Fraction2(num,den) {
    this.num=num ;
    this.den=den ;
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
}
function fraction (a,b) {
    return new Fraction2(a,b)
}
function somme2Fractions(f1,f2) {
 return fraction(f1.num*f2.den+f2.num*f1.den,f1.den*f2.den)
}
function produit2Fractions(f1,f2) {
    return fraction(f1.num*f2.num,f1.den*f2.den)
}
function puissanceFraction(f,n){
    return fraction(f.num**n,f.den**n)
}
function produitFractions(...fractions){
    let p=fraction(1,1)
    for (let f of fractions) {
        p=produit2Fractions(p,f)
    }
    return p
}
function sommeFractions(...fractions){
    let s=fraction(0,1)
    for (let f of fractions) {
        s=somme2Fractions(s,f)
    }
    return s
}
function difference2Fractions(f1,f2){
    return somme2Fractions(f1,f2.oppose())
}
