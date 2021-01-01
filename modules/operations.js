
export default function Operation({ operande1 = 1, operande2 = 2, type = 'addition' }) {

    let Code=``
    let cacherleszeros = function(chaine){ //tilisée pour créer une chaine de retenues, un zéro sera mis en blanc sur blanc.
        let resultat=""
        for (let i=0;i<chaine.length;i++){
            if (chaine[i]!='0'){
                resultat+=`$${chaine[i]}$`
            }
            else {
                resultat+=`<font color=#FFFFFF>$0$</font>`
            }
        }
        return resultat
    }
    let cacherleszerosbarrelesautres = function(chaine){ //tilisée pour créer une chaine de retenues, un zéro sera mis en blanc sur blanc.
        let resultat=""
        for (let i=0;i<chaine.length;i++){
            if (chaine[i]!='0'){
                resultat+=`$\\cancel{${chaine[i]}}$`
            }
            else {
                resultat+=`<font color=#FFFFFF>$0$</font>`
            }
        }
        return resultat
    }

    let cacherleszerosdevant = function(chaine){
        let blancs=""
        while (chaine[0]=='0') {
            chaine=chaine.substr(1)
            blancs+=`<font color=#FFFFFF>$0$</font>`
        }
        for (let i=0;i<chaine.length;i++){
            blancs+=`$${chaine[i]}$`
        }
        return blancs
    }
    let cacherboutdenombre = function (nombre, boutocculte,souligne) { //fonction qui ne laisse visible qu'une partie d'un nombre et le souligne si besoin
        let chaine; // retourne une chaine avec un nombre en mode maths.
        let soulignedebut,soulignefin
        if (souligne) {
            soulignedebut=`\\underline{`
            soulignefin=`}`
        }
        else {
            soulignedebut=``
            soulignefin=``
        }
        chaine = Number(nombre).toString();
        if ((boutocculte > 0) && (boutocculte < chaine.length)) {
            chaine = `$${soulignedebut}${chaine.substr(0, chaine.length - boutocculte)}${soulignefin}$<font color=#FFFFFF>$${chaine.substr(chaine.length - boutocculte)}$</font>`;
        }
        else {
            chaine=`$${soulignedebut}${chaine}${soulignefin}$`
        }
        return chaine;
    }

    let DivisionPoseeHtml = function (dividende, diviseur) { // retourne le code de la division posée en html
        let longueurquotiententier, code = "", quotiententier, stringquotiententier
        let chiffrequotient, dividendetemp, lignes, index, longtronc, restes = [], quotients = [], troncatures = [];
        quotiententier = Math.floor(dividende / diviseur);
        dividende = Number(dividende).toString();
        stringquotiententier = Number(quotiententier).toString();
        longueurquotiententier = stringquotiententier.length;
        lignes = '';
        for (let i = 0; i < longueurquotiententier - 1; i++) {
            lignes += '0';
        }
        dividendetemp = parseInt(dividende);
        index = 0;
        longtronc = stringquotiententier.length - 1;
        for (let i = 0; i < longueurquotiententier; i++) {
            chiffrequotient = stringquotiententier.charAt(i) + lignes;
            dividendetemp = dividendetemp - parseInt(chiffrequotient) * diviseur;
            if (stringquotiententier.charAt(i) != '0') {
                quotients[index] = parseInt(chiffrequotient) * diviseur;
                restes[index] = dividendetemp;
                troncatures[index] = longtronc;
                index++;
            }
            lignes = lignes.substr(1);
            longtronc--;
        }
        troncatures[index] = 0;
        longueurquotiententier = quotients.length;
        lignes = "";
        index = dividende.length;
        for (let i = 0; i < longueurquotiententier; i++) {
            lignes += `$-$<font color=#FFFFFF>_</font>${cacherboutdenombre(quotients[i], troncatures[i],true)}<br>${cacherboutdenombre(restes[i], troncatures[i + 1])}<br>`;
            index = (restes[i] + '').length;
        }
        stringquotiententier = quotiententier + '';
        code = `<table border=0 cellspacing=0 cellpadding=2 class="res" style="line-height:1.2em"><tr><td align=right>$${dividende}$</td><td align=left style=border-bottom-style:solid;border-bottom-width:2px;border-left-style:solid;border-left-width:2px;>$${diviseur}$</td></tr>`;
        code += `<tr><td align=right >${lignes}</td><td align=left valign=top style=border-left-style:solid;border-left-width:2px;border-left-color: black;>$${stringquotiententier}$</td></tr></table>`;
        return code
    }
    let AdditionPoseeHtml = function(operande1,operande2){
        let code = ""
        let sop1 = Number(operande1).toString()
        let sop2 = Number(operande2).toString()
        let sresultat,resultat,lresultat
        let lop1 = sop1.length
        let lop2 = sop2.length
        let longueuroperandes=Math.max(lop1,lop2)
        let retenues=""
        if (lop1>lop2){ // si op1 a plus de chiffres qu'op2 on complète op2 avec des zéros.
            for(let j=0;j<lop1-lop2;j++){
                sop2=`0`+sop2
            }
        }
        else if (lop2>lop1) { //on fait pareil pour op1 si c'est op2 le plus 'grand'
            for(let j=0;j<lop2-lop1;j++){
            sop1=`0`+sop1
            }
        }
        // les deux operande ont le même nomre de chiffres
        for (let i=longueuroperandes-1;i>0;i--){ // on construit la chaine des retenues.
            if (parseInt(sop1[i])+parseInt(sop2[i])>9) {
                retenues=`1${retenues}`
            }
            else {
                retenues=`0${retenues}`
            }
        }
        retenues=`0`+retenues
        sop1=`0${sop1}`
        retenues=cacherleszeros(retenues)
        resultat = operande1 + operande2
        sresultat = Number(resultat).toString()
        lresultat=sresultat.length
        for (let i =0;i<longueuroperandes+1-lresultat;i++){
            sresultat=`0${sresultat}`
        }
        code += `<div id="addition" class="additionBox" style="position: static;">`
        code +=`<div id="retenues" class="retenuesBox" style="position: relative; left:1.2em; top:-0.5em; color:red">${retenues}</div>`
        code +=`<div id="terme1" style="position: relative; top:-0.5em" line-height: 0.8em>${cacherleszerosdevant(sop1)}</div>`
        code +=`<div id="terme2" style="position: relative; top:-0.8em" line-height: 0.8em>+${cacherleszerosdevant(sop2)}</div>`
        code+=`<div id="barrea" style="position:relative; top:-1.4em;"><hr align=left width=${(longueuroperandes+2)*10}></div>`
        code +=`<div id="somme" style="position: relative;top:-2em;" line-height: 0.8em>${cacherleszerosdevant(sresultat)}</div>`
       

        code+=`</div>`;
        return code
    }
    let SoustractionPoseeHtml = function(operande1,operande2){
        let code = "",sop1,sop2
        if (operande1<operande2) {
            sop2 = Number(operande1).toString()
            sop1 = Number(operande2).toString()
        }
        else {
            sop1 = Number(operande1).toString()
            sop2 = Number(operande2).toString()
        }
        let sresultat,resultat,lresultat
        let lop1 = sop1.length
        let lop2 = sop2.length
        let longueuroperandes=Math.max(lop1,lop2)
        let retenues="0"
        if (lop1>lop2){ // si op1 a plus de chiffres qu'op2 on complète op2 avec des zéros.
            for(let j=0;j<lop1-lop2;j++){
                sop2=`0`+sop2
            }
        }
        // les deux operande ont le même nomre de chiffres
        for (let i=longueuroperandes-1;i>0;i--){ // on construit la chaine des retenues.
            if (parseInt(sop1[i])<(parseInt(sop2[i])+parseInt(retenues.charAt(0)))) {
                retenues=`1${retenues}`
            }
            else {
                retenues=`0${retenues}`
            }
        }
        retenues=`0${retenues}`
        sop1=`0${sop1}`
        retenues=cacherleszeros(retenues)
        resultat = operande1 - operande2
        sresultat = Number(resultat).toString()
        lresultat=sresultat.length
        for (let i =0;i<longueuroperandes+1-lresultat;i++){
            sresultat=`0${sresultat}`
        }
        code += `<div id="soustraction" class="additionBox" style="position: relative">`
        code +=`<div id="retenuesh" class="retenuesBox" style="position: relative; left:1.2em; top:-0.5em; color:red">${retenues}</div>`
        code +=`<div id="terme1" style="position: relative; top:-0.5em" line-height: 0.8em>${cacherleszerosdevant(sop1)}</div>`
        code +=`<div id="terme2" style="position: relative; left:-0.3em; top:-0.8em" line-height: 0.8em>$-$${cacherleszerosdevant(sop2)}</div>`
        code+=`<div id="retenuesb" class="retenuesBox" style="position: relative; left:0.2em; top:-2.5em; color: blue" line-height: 0.8em>${retenues}</div>`
        code+=`<div id="barres" style="position:relative; top:-1.8em;"><hr align=left width=${(longueuroperandes+2)*10}></div>`
        code +=`<div id="difference" style="position: relative;top:-2.5em;" line-height: 0.8em>${cacherleszerosdevant(sresultat)}</div>`
        code+=`</div>`;
        return code
    }
    let MultiplicationPoseeHtml = function(operande1,operande2){
        let code = "",sop1,sop2
        let produits=[],strprod,sommes=[]
        if (operande1<operande2) {
            sop2 = Number(operande1).toString()
            sop1 = Number(operande2).toString()
        }
        else {
            sop1 = Number(operande1).toString()
            sop2 = Number(operande2).toString()
        }
        let sresultat,resultat,lresultat
        let lop1 = sop1.length
        let lop2 = sop2.length
        let longueurtotale=lop1+lop2
        let retenues=[];
        for (let i=0;i<sop2.length;i++){
            retenues.push("0")
            produits.push("")
            for (let k=0;k<i;k++){
                retenues[i]=`${retenues[i]}0`
                produits[i]=`${produits[i]}°`
            }
            if (sop2[lop2-i-1]!='0'){
            for (let j=0;j<sop1.length;j++){
                strprod=parseInt(sop1[lop1-j-1]*parseInt(sop2[lop2-i-1]))+parseInt(retenues[i][0])
                retenues[i]=`${Number(Math.floor(strprod/10)).toString()}${retenues[i]}`
                produits[i]=`${Number(strprod%10).toString()}${produits[i]}`
            }
            produits[i]=`${retenues[i][0]}${produits[i]}`
        }
        else {
            for (let j=0;j<sop1.length;j++){
                retenues[i]=`0${retenues[i]}`
                produits[i]=`°${produits[i]}`
            }
        }
        }

        for (let i=lop2;i<longueurtotale;i++){
            sop2=`0${sop2}`
        }
        for (let i=lop1;i<=longueurtotale;i++){
            sop1=`0${sop1}`
        }
        for (let i=0;i<lop2;i++){
            for (let j=retenues[i].length;j<longueurtotale;j++){
                retenues[i]=`0${retenues[i]}`
            }
        }
        resultat = operande1 * operande2
        sresultat = Number(resultat).toString()
        lresultat=sresultat.length
        for (let i=0;i<lop2;i++){
            for (let j=produits[i].length;j<=lresultat;j++){
                produits[i]=`0${produits[i]}`
            }
        }
        retenues.push(`0`)
        for (let i=0;i<lresultat-1;i++){
            sommes.push(0)
            sommes[i]+=parseInt(retenues[lop2][0])
            for (let j=0;j<lop2;j++){
                if (produits[j][lresultat-i]!='0'&&produits[j][lresultat-i]!='°'){
                    sommes[i]+=parseInt(produits[j][lresultat-i])
                }
            }
            retenues[lop2]=`${Number(Math.floor(sommes[i]/10)).toString()[0]}${retenues[lop2]}`
        }
        for (let i=0;i<lop2;i++){
            for (let j=produits[i].length;j<=longueurtotale;j++){
                produits[i]=`0${produits[i]}`
            }
        }
        for (let i=0;i<=lop2;i++){
            retenues[i]=cacherleszeros(retenues[i])
        }

        for (let i =lresultat;i<=longueurtotale;i++){
            sresultat=`0${sresultat}`
        }

        code += `<div id="multiplication" class="multiplicationBox" style="position:relative;">`
        code +=`<div id="facteur1" style="position:relative;" >${cacherleszerosdevant(sop1)}</div>`
        code +=`<div id="facteur2" style="position:relative;top:-0.3em">×${cacherleszerosdevant(sop2)}</div>`
        code+=`<div id="barrem1" style="position: relative;top:-0.9em"><hr width=${(longueurtotale+2)*10} align=left></div>`
        for (let i=0;i<lop2;i++){
            code +=`<div id="retenues${i}" class="retenuesBarrees" style="position:relative; left:2em; top:${-(3.1+i*1.6)}em; color:red;" >${retenues[i]}</div>`
            code +=`<div id="produits${i}" style="position: relative;top:${-(i*0.8+1.9)}em" line-height:0.8em>${cacherleszerosdevant(produits[i])}</div>`
        }
        code +=`<div id="retenues${lop2}" class="retenuesBox" style="position:relative; left:1.8em; top:${-(3+lop2*1.6)}em; color:blue" >${retenues[lop2]}</div>`
        code+=`<div id="barrem2" style="position: relative; top:-3.6em"><hr width=${(longueurtotale+2)*10} align=left></div>`
        code+=`<div id="resultatm" style="position:relative; top:-4em" line-height:0.8em>${cacherleszerosdevant(sresultat)}</div>`

        code+=`</div>`;
        return code
    }
  

    switch (type) {
        case 'addition':
            if (sortie_html) {
               Code+=AdditionPoseeHtml(operande1,operande2)
            }
            else {
                Code += `$\\opadd{${operande1}}{${operande2}}$`
            }
            break
        case 'soustraction':
            if (sortie_html) {
                Code+=SoustractionPoseeHtml(operande1,operande2)
             }
             else {
                 Code += `$\\opsub{${operande1}}{${operande2}}$`
             }           
            break
        case 'multiplication':
            if (sortie_html) {
                Code+=MultiplicationPoseeHtml(operande1,operande2)
             }
             else {
                 Code += `$\\opmul{${operande1}}{${operande2}}$`
             }           
  
            break
        case 'division':
            if (sortie_html) {
                Code +=DivisionPoseeHtml(operande1, operande2);
            }
            else {
                Code +=`$\\opidiv[voperation=top]{${operande1}}{${operande2}}$`
            }
            break
    }
    return Code
} 