import {unSiPositifMoinsUnSinon,arrondi,fraction_simplifiee,obtenir_liste_facteurs_premiers,calcul,tex_fraction,liste_diviseurs,quotientier} from "/modules/outils.js"
import {point,vecteur,segment,carre,cercle,arc,translation,rotation,texteParPosition} from "/modules/2d.js"

export function obtenir_liste_Fractions_irreductibles() { //sous forme de fractions
	return  [fraction(1,2),fraction(1,3),fraction(2,3),fraction(1,4),fraction(3,4),fraction(1,5),fraction(2,5),fraction(3,5),fraction(4,5),
	fraction(1,6),fraction(5,6),fraction(1,7),fraction(2,7),fraction(3,7),fraction(4,7),fraction(5,7),fraction(6,7),fraction(1,8),fraction(3,8),fraction(5,8),fraction(7,8),
	fraction(1,9),fraction(2,9),fraction(4,9),fraction(5,9),fraction(7,9),fraction(8,9),fraction(1,10),fraction(3,10),fraction(7,10),fraction(9,10)]
}
export function obtenir_liste_Fractions_irreductibles_faciles() { //sous forme de fractions
	return  [fraction(1,2),fraction(1,3),fraction(2,3),fraction(1,5),fraction(2,5),fraction(3,5),fraction(4,5),
	fraction(1,7),fraction(2,7),fraction(3,7),fraction(4,7),fraction(5,7),fraction(6,7)]
}

/**
 * @class ListeFractionbis
 * @classdesc Classe Fraction - Méthodes utiles sur les collections de fractions
 * @author Jean-Claude Lhote sur une idée de Sébastien Lozano
 */
class ListeFractionbis{
    constructor(...fractions){
        function ppcm([...n]) {
                return parseInt(Algebrite.run(`lcm(${n})`));
        }
        this.liste=fractions  // La liste des fractions passées en argument du constructeur
        this.denominateurs_amis=[] // Les tableaux contenant les diviseurs différnets de 1 de chaque dénominateur
        let listetemp=[],den,dens=[]
        for (let i=0;i<this.liste.length;i++){
            den=this.liste[i].den
            dens.push(den)
            listetemp=liste_diviseurs(den)
            listetemp.splice(0,1)
            this.denominateurs_amis.push(listetemp)
        }
        den=ppcm(dens)
        this.listeMemeDenominateur=[] // La liste des fractions mises au même dénominateur dans le même ordre que this.liste
        for (let i=0;i<this.liste.length;i++) {
            this.listeMemeDenominateur.push(this.liste[i].fractionEgale(calcul(den/this.liste[i].den)))
        }
        this.sortFractions= function(liste) { //une fonction pour trier la liste et retourner une liste dans l'ordre croissant
            let fractions=[]
            for (let i=0;i<liste.length;i++)
            fractions.push(liste[i])
            let changed,tmp
                do{
                     changed = false;
                     for (let i=0; i<(fractions.length-1); i++) {
                        if (fractions[i].superieurstrict(fractions[i+1])) {
                            tmp = fractions[i];
                            fractions[i]=fractions[i+1];
                            fractions[i+1] = tmp;
                            changed = true;
                        };
                     };
                } while(changed);
                return fractions
        }
        this.listeRangee=this.sortFractions(this.liste) // La liste de fraction rangée dans l'ordre croissant.
        this.listeRangeeMemeDenominateur=this.sortFractions(this.listeMemeDenominateur)
        this.listeSimplifiee=[]
        for (let i=0;i<this.liste.length;i++) {
            this.listeSimplifiee.push(this.liste[i].simplifie())
        }
        this.listeRangeeSimplifiee=this.sortFractions(this.listeSimplifiee)
        this.texListe=``
        for (let i=0;i<this.liste.length-1;i++){
            this.texListe+=this.liste[i].texFraction+' ; '
        }
        this.texListe+=this.liste[this.liste.length-1].texFraction
        this.completeListe = function(...frac){
            dens=[this.listeMemeDenominateur[0].den]
            for (let i=0;i<frac.length;i++){
                listetemp=[]
                this.liste.push(frac[i])
                dens.push(frac[i].den)
                listetemp=liste_diviseurs(frac[i].den)
                listetemp.splice(0,1)
                this.denominateurs_amis.push(listetemp)
                }
                console.log(dens)
                den=ppcm(dens)
                this.listeMemeDenominateur=[]
                for (let i=0;i<this.liste.length;i++) {
                    this.listeMemeDenominateur.push(this.liste[i].fractionEgale(calcul(den/this.liste[i].den)))
                } 
                this.listeSimplifiee=[]
                for (let i=0;i<this.liste.length;i++) {
                    this.listeSimplifiee.push(this.liste[i].simplifie())
                }
                this.texListe=``
                for (let i=0;i<this.liste.length-1;i++){
                    this.texListe+=this.liste[i].texFraction+' ; '
                }
                this.texListe+=this.liste[this.liste.length-1].texFraction
                this.listeRangee=this.sortFractions(this.liste) // La liste de fraction rangée dans l'ordre croissant.
                this.listeRangeeMmeDenominateur=this.sortFractions(this.listeMemeDenominateur)
                this.listeRangeeSimplifiee=this.sortFractions(this.listeSimplifiee)
        }

    }
}

export function listeFractions(...fractions){
    return new ListeFractionbis(...fractions)
}

/**
 * @constructor Construit un objet Fraction(a,b)
 * @param {integer} a 
 * @param {integer} b 
 */
export function fraction (a,b) {
   return new Fraction(a,b)
}

/**
* @class
* @classdesc Méthodes utiles sur les fractions
* @param {number} num numérateur
* @param {number} den dénominateur
* @author Jean-Claude Lhote et Sébastien Lozano
*/

function Fraction(num,den) {
   function tex_fraction_signe(num,den){ 
        if (den!=1) {
            if (num*den>0){
                return '\\dfrac{'+Math.abs(num)+'}{'+Math.abs(den)+'}'
            }
            else if (num*den<0){
                return '-\\dfrac{'+Math.abs(num)+'}{'+Math.abs(den)+'}'
            }
            else {
                return '0'
            }
        }
        else
        {
            return `${num}`
        }
    }
       /**
    * @property {integer} numérateur optionnel, par défaut la valeur vaut 0
    */
   this.num = num || 0;
   /**
    * @property {integer} dénominateur optionnel, par défaut la valeur vaut 1
    */
   this.den=den || 1;
   /**
    * numIrred est le numérateur réduit
    * denIrredest le dénominateur réduit
    */
   this.numIrred=fraction_simplifiee(this.num,this.den)[0]
   this.denIrred=fraction_simplifiee(this.num,this.den)[1]
   this.pourcentage=calcul(this.numIrred*100/this.denIrred)
   if (this.num==0) this.signe=0
   else this.signe=unSiPositifMoinsUnSinon(this.num*this.den) // le signe de la fraction : -1, 0 ou 1
   this.texFraction = tex_fraction_signe(this.num,this.den) // m/n si positif - m/n si négatif.
   if (this.signe==-1) this.texFractionSignee =this.texFraction // + m/n si positif - m/n si négatif
   else this.texFractionSignee='+'+this.texFraction
   if (this.signe>=0) this.texFractionSigneeParentheses=this.texFraction
   else this.texFractionSigneeParentheses='('+this.texFractionSignee+')'
   this.simplifie=function() {
    return fraction(this.numIrred,this.denIrred)
}
    this.texFractionSimplifiee = tex_fraction_signe(this.numIrred,this.denIrred)
   this.valeurDecimale=arrondi(this.num/this.den,6)
   
   /**
    * @return {object} La fraction "complexifiée" d'un rapport k
    * @param {number} k Le nombre par lequel, le numérateur et le dénominateur sont multipliés.
    */
    this.fractionEgale = function(k){
       return fraction(calcul(this.num*k),calcul(this.den*k))
   }   

   /**
    * @return {object} L'opposé de la fraction
    */
    this.oppose = function(){
       return fraction(-this.num,this.den)
   }
   /**
    * @return {object]} L'opposé de la fracion réduite
    */
    this.opposeIrred = function(){
       return fraction(-this.numIrred,this.denIrred)
   }
   /**
    * @return {object]} L'inverse de la fraction
    */
    this.inverse = function(){
       return fraction(this.den,this.num)
   }
   /**
    * @return {object} L'inverse de la fraction simplifiée
    */
    this.inverseIrrred = function(){
       return fraction(this.denIrred,this.numIrred)
   }
   /**
    * @return {object} La somme des fractions
    * @param {object} f2 La fraction qui s'ajoute
    */
    this.sommeFraction =function(f2) {
       return fraction(this.num*f2.den+f2.num*this.den,this.den*f2.den)
   }
   /**
    * @return {object} La somme de toutes les fractions
    * @param  {...any} fractions Liste des fractions à ajouter à la fraction
    */
    this.sommeFractions = function(...fractions){
       let s=fraction(this.num,this.den)
       for (let f of fractions) {
           s=s.sommeFraction(f)
       }
       return s
   }
   /**
    * @return {object} Le produit des deux fractions
    * @param {object} f2  LA fraction par laquelle est multipliée la fraction
    */
    this.produitFraction = function(f2) {

       return fraction(this.num*f2.num,this.den*f2.den)
   }
   /**
    * @return {string} Le calcul du produit de deux fractions avec étape intermédiaire
    *  @params {object} f2 la fraction qui multiplie. 
    */
    this.texProduitFraction = function(f2) {
           return `${this.texFraction}\\times ${f2.texFraction}=${tex_fraction(this.num+`\\times`+f2.num,this.den+`\\times`+f2.den)}=${tex_fraction(this.num*f2.num,this.den*f2.den)}`
   } 

   /**
    * @return {object} La puissance n de la fraction
    * @param {integer} n l'exposant de la fraction 
    */
    this.puissanceFraction = function(n) {
       return fraction(this.num**n,this.den**n)
   }
   /**
    * @param  {...any} fractions Les fractions qui multiplient la fraction
    * @return Le produit des fractions
    */
    this.produitFractions = function(...fractions){
       let p=fraction(this.num,this.den)
       for (let f of fractions) {
           p=p.produitFraction(f)
   }
       return p
   }
   /**
    * @param {object} f2 est la fracion qui est soustraite de la fraction
    * @return {objet} La différence des deux fractions
    */
    this.differenceFraction = function(f2) {
       return this.sommeFraction(f2.oppose())
   }
   this.diviseFraction = function(f2){
       return this.produitFraction(f2.inverse())
   }
   this.texQuotientFraction = function(f2) {
       return `${this.texFraction}\\div ${f2.texFraction}=${this.texFraction}\\times ${f2.inverse().texFraction}=${tex_fraction(this.num+`\\times`+f2.den,this.den+`\\times`+f2.num)}=${tex_fraction(this.num*f2.den,this.den*f2.num)}`
   }

/**
* @return {object}  Renvoie une fraction avec comme dénominateur une puissance de 10 ou 'NaN' si la fraction n'a pas de valeur décimale
*/
    this.fractionDecimale = function(){
       let den=this.denIrred
       let liste=obtenir_liste_facteurs_premiers(den)
       let n2=0,n5=0
       for (let n of liste) {
           if (n==2) n2++
           else if (n==5) n5++
           else return 'NaN'
       }
       if (n5==n2) return fraction(this.numIrred,this.fractionDecimale.denIrred)
       else if (n5>n2) return fraction(this.numIrred*2**(n5-n2),this.denIrred*2**(n5-n2))
       else return fraction(this.numIrred*5**(n2-n5),this.denIrred*5**(n2-n5))
   }
   
   /**
    * @return {string} Code Latex de la fraction
    */
   /**
    * 
    * @param {integer} n entier par lequel multiplier la fraction 
    * @return {object} fraction multipliée par n
    */
    this.multiplieEntier = function(n) {
       return fraction(n*this.num,this.den);
   };

       /**
    * 
    * @param {integer} n entier par lequel multiplier la fraction 
    * @return {object} fraction multipliée par n simplifiée
    */
    this.multiplieEntierIrred = function(n) {
       return fraction(n*this.num,this.den).simplifie();
   };
   /**
    * @return fraction divisée par n
    * @param {integer} n entier qui divise la fraction 
    */
    this.entierDivise=function(n){
       return fraction(this.num,n*this.den)
   }
       /**
    * @return fraction divisée par n et réduite si possible
    * @param {integer} n entier qui divise la fraction 
    */
   this.entierDiviseIrred=function(n){
       return fraction(this.num,n*this.den).simplifie()
   }
       /**
    * @return n divisé par fraction
    * @param {integer} n entier divisé par la fraction 
    */
   this.diviseEntier=function(n){
       return fraction(n*this.den,this.num)
   }
   this.diviseEntierIrred=function(n){
       return fraction(n*this.den,this.num).simplifie()
   }

   /**
    * @return {object} la fraction augmentée de n
    * @param {integer} n entier à ajouter à la fraction 
    */
    this.ajouteEntier=function(n){
       return fraction(this.num+this.den*n,this.den)
   }
/**
* @return {object} n moins la fraction
* @param {integer} n l'entier duqel on soustrait la fraction 
*/
    this.entierMoinsFraction=function(n){
       return (fraction(n*this.den-this.num,this.den))
   }

   /**
    * @return {boolean} fonctions de comparaison avec une autre fraction.
    * @param {object} f2 
    */
this.superieurstrict=function(f2){
    if (this.num/this.den>f2.num/f2.den) return true
    else return false
}
this.superieurlarge=function(f2){
    if (this.num/this.den>=f2.num/f2.den) return true
    else return false
}
this.inferieurstrict=function(f2){
    if (this.num/this.den<f2.num/f2.den) return true
    else return false
}
this.inferieurlarge=function(f2){
    if (this.num/this.den<f2.num/f2.den) return true
    else return false
}
this.egal=function(f2){
    if (this.num/this.den==f2.num/f2.den) return true
    else return false
}




   /**
    * 
    * @param {number} depart N° de la première part coloriée (0 correspond à la droite du centre) 
    * @param {*} type 'gateau' ou 'segment' ou 'barre'
    * @Auteur Jean-Claude Lhote
    */
    this.representationIrred = function (x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray',unite0=0,unite1=1,scale=1,label="") {
       let objets = [], n, num, k, dep, s, a, O, C
       n = quotientier(this.numIrred, this.denIrred)
       num = this.numIrred
       let unegraduation=function(x,y,couleur='black',epaisseur=1){
           let A=point(x,y+0.2)
           let B=point(x,y-0.2)
           let g=segment(A,B)
           g.color=couleur
           g.epaisseur=epaisseur
           return g
       }
       if (type == 'gateau') {
           for (k = 0; k < n; k++) {
               O = point(x + k * 2 * (rayon + 0.5), y)
               C = cercle(O, rayon)
               objets.push(C)
               for (let i = 0; i < this.denIrred; i++) {
                   s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O,90- i * 360 / this.denIrred))
                   objets.push(s)
               }
               dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O,90- depart * 360 / this.denIrred)
               for (let j = 0; j < Math.min(this.denIrred, num); j++) {
                   a = arc(dep, O, -360 / this.denIrred, true, fill = couleur)
                   a.opacite = 0.3
                   dep = rotation(dep, O, -360 / this.denIrred)
                   objets.push(a)
               }
               num -= this.denIrred
           }
           if (this.num%this.den!=0) { 
               O = point(x + k * 2 * (rayon + 0.5), y)
               C = cercle(O, rayon)
               objets.push(C)
               for (let i = 0; i < this.denIrred; i++) {
                   s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90-i * 360 / this.denIrred))
                   objets.push(s)
               }
               dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O,90- depart * 360 / this.denIrred)
               for (let j = 0; j < Math.min(this.denIrred, num); j++) {
                   a = arc(dep, O, -360 / this.denIrred, true, fill = couleur)
                   a.opacite = 0.3
                   dep = rotation(dep, O, -360 / this.denIrred)
                   objets.push(a)
               }
           }
       }
       else if (type == 'segment') {
           for (k = 0; k < n; k++) {
               O = point(x + k *rayon, y)
               C = translation(O, vecteur(rayon, 0))
               s = segment(O, C)
               s.styleExtremites = '-|'
               objets.push(s)
               for (let i = 0; i < this.denIrred; i++) {
                   s = segment(translation(O, vecteur(i * rayon / this.denIrred, 0)), translation(O, vecteur((i + 1) * rayon / this.denIrred, 0)))
                   s.styleExtremites = '|-'
                   objets.push(s)
               }
               a = segment(O, point(O.x + Math.min(num, this.denIrred) * rayon / this.denIrred, O.y))
               a.color = couleur
               a.opacite = 0.4
               a.epaisseur = 6
               objets.push(a)
               num -= this.denIrred
           }
           O = point(x + k * rayon, y)
           C = translation(O, vecteur(rayon, 0))
           s = segment(O, C)
           s.styleExtremites = '-|'
           objets.push(s)
           for (let i = 0; i < this.denIrred; i++) {
               s = segment(translation(O, vecteur(i * rayon / this.denIrred, 0)), translation(O, vecteur((i + 1) * rayon / this.denIrred, 0)))
               s.styleExtremites = '|-'
               objets.push(s)
           }
           a = segment(O, point(O.x + Math.min(this.numIrred, this.denIrred) * rayon / this.denIrred, O.y))
           a.color = couleur
           a.opacite = 0.4
           a.epaisseur = 6
           objets.push(a)
           objets.push(unegraduation(x,y))
           if (typeof(unite0)=='number'&&typeof(unite1)=='number') {
               for (k=0;k<=n+1;k++) {
                   objets.push(texteParPosition(unite0+k*(unite1-unite0),x+rayon*k,y-0.6,'milieu','black',scale))
               }
           }
           else {
           if (unite0!="") objets.push(texteParPosition(unite0,x,y-0.6,'milieu','black',scale))
           if (unite1!="") objets.push(texteParPosition(unite1,x+rayon,y-0.6,'milieu','black',scale))
           if (label!="") objets.push(texteParPosition(label,x+rayon*this.numIrred/this.denIrred,y-0.6,'milieu','black',scale))
           }

       }
       else {
           let diviseur
           if (this.denIrred % 6 == 0) diviseur=6
           else if (this.denIrred % 5 == 0) diviseur=5
           else if (this.denIrred % 4 == 0) diviseur=4
           else if (this.denIrred % 3 == 0) diviseur=3
           else if (this.denIrred % 2 == 0) diviseur=2
           else diviseur = 1

           for (k = 0; k < n; k++) {
               for (let j = 0; j < diviseur; j++) {
                   for (let h = 0; h < calcul(this.denIrred / diviseur); h++) {
                       O = point(x + k * (rayon + 1)+j*rayon/diviseur, y + h * rayon / diviseur)
                       C = translation(O, vecteur(rayon / diviseur, 0))
                       dep = carre(O, C)
                       dep.color = 'black'
                       dep.couleurDeRemplissage = couleur
                       dep.opaciteDeRemplissage=0.4
                       objets.push(dep)
                   }
               }
               num -= this.den
           }
           if (num>0) {
               for (let j = 0; j < diviseur; j++) {
                   for (let h = 0; h < calcul(this.denIrred / diviseur); h++) {
                       O = point(x + k * (rayon + 1)+j*rayon/diviseur, y + h * rayon / diviseur)
                       C = translation(O, vecteur(rayon / diviseur, 0))
                       dep = carre(O, C)
                       dep.color = 'black'
                       objets.push(dep)
                   }
               }
               for (let i = 0; i < num; i++) {
               O = point(x + k * (rayon + 1) + (i % diviseur) * rayon / diviseur, y + quotientier(i, diviseur) * rayon / diviseur)
               C = translation(O, vecteur(rayon / diviseur, 0))
               dep = carre(O, C)
               dep.color = 'black'
               dep.couleurDeRemplissage = couleur
               dep.opaciteDeRemplissage=0.4
               objets.push(dep)
           }
       }
       }
       return objets
   }
   /**
    * 
    * Représente une fraction sous forme de disque (gateau), de segment ou de rectangle
    * le type peut être : 'gateau', 'segment' ou 'barre'
    * l'argument départ sert pour la représentation disque à fixer l'azimut du premier secteur : 0 correspond à 12h.
    * les arguments unite0 et unite1 servent pour la représentation 'segment'. On peut ainsi choisir les délimiteurs de l'unité, ce sont habituellement 0 et 1, à ce moment la, chaque entier est affiché sous sa graduation.
    * Si ce sont des variable de type string, il n'y a que ces deux étiquettes qui sont écrites.
    */
    this.representation = function (x, y, rayon, depart = 0, type = 'gateau', couleur = 'gray',unite0=0,unite1=1,scale=1,label="") {
       let objets = [], n, num, k, dep, s, a, O, C
       n = quotientier(this.num, this.den)
       num = this.num
        let unegraduation=function(x,y,couleur='black',epaisseur=1){
           let A=point(x,y+0.2)
           let B=point(x,y-0.2)
           let g=segment(A,B)
           g.color=couleur
           g.epaisseur=epaisseur
           return g
       }
       if (type == 'gateau') {
           for (k = 0; k < n; k++) {
               let O = point(x + k * 2 * (rayon + 0.5), y)
               let C = cercle(O, rayon)
               objets.push(C)
               let s, a
               for (let i = 0; i < this.den; i++) {
                   s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90-i * 360 / this.den))
                   objets.push(s)
               }
               dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90-depart * 360 / this.den)
               for (let j = 0; j < Math.min(this.den, num); j++) {
                   a = arc(dep, O,- 360 / this.den, true,couleur)
                   a.opacite = 0.3
                   dep = rotation(dep, O, -360 / this.den)
                   objets.push(a)
               }
               num -= this.den
           }
           if (this.num%this.den!=0) { $
               let O = point(x + k * 2 * (rayon + 0.5), y)
               let C = cercle(O, rayon)
               objets.push(C)
               for (let i = 0; i < this.den; i++) {
                   s = segment(O, rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O, 90-i * 360 / this.den))
                   objets.push(s)
               }
           
               dep = rotation(point(x + rayon + k * 2 * (rayon + 0.5), y), O,90- depart * 360 / this.den)
               if (this.num%this.den!=0) for (let j = 0; j < Math.min(this.den, num); j++) {
                   a = arc(dep, O, -360 / this.den, true, couleur)
                   a.opacite = 0.3
                   dep = rotation(dep, O, -360 / this.den)
                   objets.push(a)
               }
           }
       }
       else if (type == 'segment') {
           for (k = 0; k < n; k++) {
               O = point(x + k * rayon, y)
               C = translation(O, vecteur(rayon, 0))
               s = segment(O, C)
               s.styleExtremites = '-|'
               objets.push(s)
               for (let i = 0; i < this.den; i++) {
                   s = segment(translation(O, vecteur(i * rayon / this.den, 0)), translation(O, vecteur((i + 1) * rayon / this.den, 0)))
                   s.styleExtremites = '|-'
                   objets.push(s)
               }
               a = segment(O, point(O.x + Math.min(num, this.den) * rayon / this.den, O.y))
               a.color = couleur
               a.opacite = 0.4
               a.epaisseur = 6
               objets.push(a)
               num -= this.den
           }
           O = point(x + k * rayon , y)
           C = translation(O, vecteur(rayon, 0))
           s = segment(O, C)
           s.styleExtremites = '-|'
           objets.push(s)
           for (let i = 0; i < this.den; i++) {
               s = segment(translation(O, vecteur(i * rayon / this.den, 0)), translation(O, vecteur((i + 1) * rayon / this.den, 0)))
               s.styleExtremites = '|-'
               objets.push(s)
           }
           a = segment(O, point(O.x + Math.min(num, this.den) * rayon / this.den, O.y))
           a.color = couleur
           a.opacite = 0.4
           a.epaisseur = 6
           objets.push(a)
           objets.push(unegraduation(x,y))
           if (typeof(unite0)=='number'&&typeof(unite1)=='number') {
               for (k=0;k<=n+1;k++) {
                   objets.push(texteParPosition(unite0+k*(unite1-unite0),x+rayon*k,y-0.6,'milieu','black',scale))
               }
           }
           else {
           if (unite0!="") objets.push(texteParPosition(unite0,x,y-0.6,'milieu','black',scale))
           if (unite1!="") objets.push(texteParPosition(unite1,x+rayon,y-0.6,'milieu','black',scale))
           if (label!="") objets.push(texteParPosition(label,x+rayon*this.num/this.den,y-0.6,'milieu','black',scale))
           }
       }
       else { //Type barre
           let diviseur
           if (this.den % 6 == 0) diviseur=6
           else if (this.den % 5 == 0) diviseur=5
           else if (this.den % 4 == 0) diviseur=4
           else if (this.den % 3 == 0) diviseur=3
           else if (this.den % 2 == 0) diviseur=2
           else diviseur = 1

           for (k = 0; k < n; k++) {
               for (let j = 0; j < diviseur; j++) {
                   for (let h = 0; h < calcul(this.den / diviseur); h++) {
                       O = point(x + k * (rayon + 1)+j*rayon/diviseur, y + h * rayon / diviseur)
                       C = translation(O, vecteur(rayon / diviseur, 0))
                       dep = carre(O, C)
                       dep.color = 'black'
                       dep.couleurDeRemplissage = couleur
                       dep.opaciteDeRemplissage=0.4
                       objets.push(dep)
                   }
               }
               num -= this.den
           }
           if (num>0) {
               for (let j = 0; j < diviseur; j++) {
                   for (let h = 0; h < calcul(this.den / diviseur); h++) {
                       O = point(x + k * (rayon + 1)+j*rayon/diviseur, y + h * rayon / diviseur)
                       C = translation(O, vecteur(rayon / diviseur, 0))
                       dep = carre(O, C)
                       dep.color = 'black'
                       objets.push(dep)
                   }
               }
               for (let i = 0; i < num; i++) {
               O = point(x + k * (rayon + 1) + (i % diviseur) * rayon / diviseur, y + quotientier(i, diviseur) * rayon / diviseur)
               C = translation(O, vecteur(rayon / diviseur, 0))
               dep = carre(O, C)
               dep.color = 'black'
               dep.couleurDeRemplissage = couleur
               dep.opaciteDeRemplissage=0.4
               objets.push(dep)
           }
       }
       }
       return objets
   }


}