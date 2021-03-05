import { tridictionnaire, filtreDictionnaire }  from "./outils.js" ;

export let dictionnaireDesExercicesQCM = {"6C30-4":{"url":"/exercices/6e/6C30-4.js","titre":"Multiplication par 0,1 ; 0,01 ; 0,001 (Placer la virgule)"},"6C30-5":{"url":"/exercices/6e/6C30-5.js","titre":"Multiplication par 0,1 ; 0,01 ; 0,001 (compléter avec le nombre qui convient)"},"6C30-3":{"url":"/exercices/6e/6C30-3.js","titre":"Opérations avec les nombres décimaux"},"6C23":{"url":"/exercices/6e/6C23.js","titre":"Additionner des fractions de même dénominateur"},"5N20":{"url":"/exercices/5e/5N20.js","titre":"Additionner ou soustraire deux fractions (dénominateurs multiples)"},"6C10-5":{"url":"/exercices/6e/6C10-5.js","titre":"Labyrinthe de multiples"},"3G30":{"url":"/exercices/3e/3G30.js","titre":"Calculer une longueurs dans un triangle rectangle en utilisant la trigonométrie"},"4G40":{"url":"/exercices/4e/4G40.js","titre":"Utiliser le cosinus pour calculer une longueur dans un triangle rectangle"},"6C20":{"url":"/exercices/6e/6C20.js","titre":"Additions et soustractions de nombres décimaux"},"6G33":{"url":"/exercices/6e/6G33.js","titre":"Reconnaitre un quadrilatère particulier à partir de ses propriétés"},"6G23-1":{"url":"/exercices/6e/6G23-1.js","titre":"Mesurer un angle"},"5N13-2":{"url":"/exercices/5e/5N13-2.js","titre":"Égalités entre fractions simples"},"3G31":{"url":"/exercices/3e/3G31.js","titre":"Déterminer un angle grâce à la trigonométrie"},"6C10":{"url":"/exercices/6e/6C10.js","titre":"Additions, soustractions et multiplications posées de nombres entiers"},"6C10-2":{"url":"/exercices/6e/6C10-2.js","titre":"Tables de multiplications et multiples de 10"},"6C10-3":{"url":"/exercices/6e/6C10-3.js","titre":"Tables de multiplications et nombres décimaux"},"6C10bis":{"url":"/exercices/6e/6C10bis.js","titre":"Additions, soustractions, multiplications et divisions posées de nombres entiers"},"6C11":{"url":"/exercices/6e/6C11.js","titre":"Divisions euclidiennes"},"6C21":{"url":"/exercices/6e/6C21.js","titre":"Divisions euclidiennes - Niveau 2"},"6C30":{"url":"/exercices/6e/6C30.js","titre":"Multiplications posées de nombres décimaux"},};


let liste_des_exercices_disponibles = tridictionnaire(dictionnaireDesExercicesQCM);


export function liste_html_des_exercicesQCM_d_un_theme(theme){
  let liste = '';
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {

    liste +=
      `<span class="id_exercice">${id}</span> - <a class="lien_id_exercice" numero="${id}">${dictionnaire[id].titre}</a></br>\n`;
}
  return liste;
}

export function liste_html_des_exercices_d_un_niveau(liste_de_themes){ // liste_de_themes = [['6N1','6N1 - Numérations et fractions niveau 1'] , [' ',' '] ]
  let liste = '';
  for (let theme of liste_de_themes){
      if (liste_html_des_exercicesQCM_d_un_theme(theme[0])!=''){
    liste += `<h3>${theme[1]}</h3>`;
    liste += liste_html_des_exercicesQCM_d_un_theme(theme[0]);
      }
  }
  return liste;
}


export function menuDesExercicesQCMDisponibles(){

// Détermine le nombre d'exercices par niveaux
    let nombre_d_exercices_disponibles_c3 = 0;
    let nombre_d_exercices_disponibles_6 = 0;
    let nombre_d_exercices_disponibles_5 = 0;
    let nombre_d_exercices_disponibles_4 = 0;
    let nombre_d_exercices_disponibles_3 = 0;
    let nombre_d_exercices_disponibles_2 = 0;
    let nombre_d_exercices_disponibles_1 = 0;
    let nombre_d_exercices_disponibles_T = 0;
    let nombre_d_exercices_disponibles_CM = 0;
    let nombre_d_exercices_disponibles_prof = 0;
    let nombre_d_exercices_disponibles_PE = 0;
    let nombre_d_exercices_disponibles_beta = 0;
    for (let id in liste_des_exercices_disponibles) {
      if (id[0] == "c" && id[1] == "3") {
        nombre_d_exercices_disponibles_c3 += 1;
      }
      if (id[0] == 6) {
        nombre_d_exercices_disponibles_6 += 1;
      }
      if (id[0] == 5) {
        nombre_d_exercices_disponibles_5 += 1;
      }
      if (id[0] == 4) {
        nombre_d_exercices_disponibles_4 += 1;
      }
      if (id[0] == 3) {
        nombre_d_exercices_disponibles_3 += 1;
      }
      if (id[0] == 2) {
        nombre_d_exercices_disponibles_2 += 1;
      }
      if (id[0] == 1) {
        nombre_d_exercices_disponibles_1 += 1;
      }
      if (id[0] == "T") {
        nombre_d_exercices_disponibles_T += 1;
      }
      if (id[0] == "C") {
        nombre_d_exercices_disponibles_CM += 1;
      }
      if (id[0] == "P" && id[1] == "0") {
        nombre_d_exercices_disponibles_prof += 1;
      }
      if (id[0] == "P" && id[1] == "E") {
        nombre_d_exercices_disponibles_PE += 1;
      }
      if (id[0] == "b" && id[1] == "e") {
        nombre_d_exercices_disponibles_beta += 1;
      }
    }

    //
    let liste_html_des_exercices_c3 =[];
    let liste_html_des_exercices_6 = [];
    let liste_html_des_exercices_5 = [];
    let liste_html_des_exercices_4 = [];
    let liste_html_des_exercices_3 = [];
    let liste_html_des_exercices_2 = [];
    let liste_html_des_exercices_1 = [];
    let liste_html_des_exercices_T = [];
    let liste_html_des_exercices_CM = [];
    let liste_html_des_exercices_prof = [];
    let liste_html_des_exercices_PE = [];
    let liste_html_des_exercices_beta = [];

    // Affiche de la liste des exercices disponibles
    let liste_html_des_exercices ='<h3 class="ui block header">Exercices disponibles</h3>\n\n';

    

    liste_html_des_exercices_c3 = liste_html_des_exercices_d_un_niveau([
      ['c3C1','c3C1 - Calculs niveau 1'],['c3N1','c3N1 - Numération Niveau 1'],['c3N2','c3N2 - Numération Niveau 2']])
    
    liste_html_des_exercices_6 = liste_html_des_exercices_d_un_niveau([
      ['6C1','6C1 - Calculs niveau 1'],['6C2','6C2 - Calculs niveau 2'],['6C3','6C3 - Calculs niveau 3'],
      ['6D1','6D1 - Les durées'],
      ['6G1','6G1 - Géométrie niveau 1'],['6G2','6G2 - Géométrie niveau 2'],['6G3','6G3 - Géométrie niveau 3'],['6G4','6G4 - Géométrie niveau 4'],
      ['6M1','6M1 - Grandeurs et mesures niveau 1'],['6M2','6M2 - Grandeurs et mesures niveau 2'],['6M3', '6M3 - Volumes'],
      ['6N1','6N1 - Numération et fractions niveau 1'],['6N2','6N2 - Numération et fractions niveau 2'],['6N3','6N3 - Numération et fractions niveau 3'],['6N4','6N4 - Numération et fractions niveau 4'],
      ['6P1','6P1 - Proportionnalité'],['6S1','6S1 - Statistiques'],
      ['6Algo1','6A - Algorithmique']
    ])
      liste_html_des_exercices_5 = liste_html_des_exercices_d_un_niveau([
        ['5A1','5A1 - Arithmetique'],['5C1','5C1 - Calculs'],
        ['5G1','5G1 - Symétries'],['5G2','5G2 - Triangles'],['5G3','5G3 - Angles'],['5G4','5G4 - Parallélogrammes'],['5G5','5G5 - Espace'],
        ['5L1','5L1 - Calcul littéral'],
        ['5M1','5M1 - Périmètres et aires'],['5M2','5M2 - Volumes'],['5M3','5M3 - Durées'],
        ['5N1','5N1 - Numération et fractions niveau 1'],['5N2','5N2 - Calculs avec les fractions'],
        ['5P1','5P1 - Proportionnalité'],['5R1','5R1 - Relatifs niveau 1'],['5R2','5R2 - Relatifs niveau 2'],
        ['5S1','5S1 - Statistiques'],['5S2','5S2 - Probabilités']
      ])
      liste_html_des_exercices_4 = liste_html_des_exercices_d_un_niveau([
        ['4C1','4C1 - Relatifs'],['4C2','4C2 - Fractions'],['4C3','4C3 - Puissances'],
        ['4F1','4F1 - Notion de fonction'],
        ['4G1','4G1 - Translation et rotation'],['4G2','4G2 - Théorème de Pythagore'],['4G3','4G3 - Théorème de Thalès'],['4G4',"4G4 - Cosinus d'un angle"],['4G5',"4G5 - Espace"],
        ['4L1','4L1 - Calcul littéral'],['4L2','4L2 - Équation'],['4P1','4P1 - Proportionnalité'],['4S1','4S1 - Statistiques'],['4S2','4S2 - Probabilités'],
        ['4Algo1','4A1 - Algorithmique']]);
      liste_html_des_exercices_3 = liste_html_des_exercices_d_un_niveau([
        ['3A1','3A1 - Arithmetique'],
        ['3F1','3F1 - Généralités sur les fonctions'],['3F2','3F2 - Fonctions affines et linéaires'],
        ['3G1','3G1 - Homothétie et rotation'],['3G2','3G2 - Théorème de Thalès'],['3G3','3G3 - Trigonométrie'],['3G4',"3G4 - Espace"],
        ['3L1','3L1 - Calcul littéral'],['3P1','3P1 - Proportionnalité'],['3S1','3S1 - Statistiques'],['3S2','3S2 - Probabilités'],
        ['3Algo1','3Algo1 - Algorithmique premier niveau']
      ])
 /*    liste_html_des_exercices_1 = liste_html_des_exercices_d_un_niveau([
        ['1E1','1E1 -  Équations'],
        ['1N1','1N1 -  Nombres et calculs'],
        ['1F1','1F1 -  Fonctions'],
      ])
        liste_html_des_exercices_2 = liste_html_des_exercices_d_un_niveau([
          ['2G1','2G1 -  Géométrie'],
          ['2N1','2N1 -  Nombres et calculs'],
          ['1L1','1L1 -  Calcul littéral'],
        ])
  */    
    for (let id in liste_des_exercices_disponibles) {
      let exercice_tmp = id;
      
      if (id[0] == '1') {
        liste_html_des_exercices_1 +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercicesQCM[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == '2') {
        liste_html_des_exercices_2 +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercicesQCM[exercice_tmp].titre +
          "</a></br>\n";
      }   
      if (id[0] == 'T') {
        liste_html_des_exercices_T +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercicesQCM[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "P" && id[1] == "E") {
        liste_html_des_exercices_PE +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercicesQCM[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "C") {
        liste_html_des_exercices_CM +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercicesQCM[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "P" && id[1] == "0") {
        liste_html_des_exercices_prof +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercicesQCM[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "b" && id[1] == "e") {
        liste_html_des_exercices_beta +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercicesQCM[exercice_tmp].titre +
          "</a></br>\n";
      }
    }

    // Change l'ordre des exercices suivant l'URL
    if (window.location.href.indexOf("beta") > 0) {
      liste_html_des_exercices += `<div class="ui accordion"><div class="active title"><i class="dropdown icon"></i>Beta (${nombre_d_exercices_disponibles_beta})</div><div class="active content">`;
      liste_html_des_exercices += liste_html_des_exercices_beta;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `</div>`;
    } else if (window.location.href.indexOf("cm.html") > 0) {
      liste_html_des_exercices += `<div class="ui accordion"><div class="active title"><i class="dropdown icon"></i>Calcul mental (${nombre_d_exercices_disponibles_CM})</div><div class="active content">`;
      liste_html_des_exercices += liste_html_des_exercices_CM;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Cours Moyen(${nombre_d_exercices_disponibles_c3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_c3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Sixième (${nombre_d_exercices_disponibles_6})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_6;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Cinquième (${nombre_d_exercices_disponibles_5})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_5;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Quatrième (${nombre_d_exercices_disponibles_4})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_4;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Troisième (${nombre_d_exercices_disponibles_3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Seconde (${nombre_d_exercices_disponibles_2})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_2;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Première (${nombre_d_exercices_disponibles_1})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_1;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Terminale (${nombre_d_exercices_disponibles_T})</div><div class="content">`;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>CRPE (${nombre_d_exercices_disponibles_PE})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_PE;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `</div>`;
    } else if (window.location.href.indexOf("outils") > 0) {
      liste_html_des_exercices += `<div class="ui accordion"><div class="active title"><i class="dropdown icon"></i>Outils pour le professeur (${nombre_d_exercices_disponibles_prof})</div><div class="active content">`;
      liste_html_des_exercices += liste_html_des_exercices_prof;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `</div>`;
    }
    else {
      liste_html_des_exercices += `<div class="ui accordion"><div class="title"><i class="dropdown icon"></i>Cours Moyen (${nombre_d_exercices_disponibles_c3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_c3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Sixième (${nombre_d_exercices_disponibles_6})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_6;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Cinquième (${nombre_d_exercices_disponibles_5})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_5;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Quatrième (${nombre_d_exercices_disponibles_4})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_4;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Troisième (${nombre_d_exercices_disponibles_3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Seconde (${nombre_d_exercices_disponibles_2})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_2;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Première (${nombre_d_exercices_disponibles_1})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_1;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Terminale (${nombre_d_exercices_disponibles_T})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_T;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>CRPE (${nombre_d_exercices_disponibles_PE})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_PE;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Calcul mental (${nombre_d_exercices_disponibles_CM})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_CM;
      liste_html_des_exercices += `</div>`;
      // Ajoute les outils prof sur mathalealatex
      if (window.location.href.indexOf("mathalealatex.html") > 0) {
        liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Outils pour le professeur (${nombre_d_exercices_disponibles_prof})</div><div class="content">`;
        liste_html_des_exercices += liste_html_des_exercices_prof;
        liste_html_des_exercices += `</div>`;
      }
      liste_html_des_exercices += `</div>`;
    }

    $("#liste_des_exercices").html(liste_html_des_exercices);
    renderMathInElement(document.body, {
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: true,
      errorColor: "#CC0000",
      strict: "warn",
      trust: false,
      });

    // Gère le clic sur un exercice de la liste
    $(".lien_id_exercice").click(function () {
      let numero = $(this).attr("numero");
      if ($("#choix_des_exercices").val() == "") {
        $("#choix_des_exercices").val($("#choix_des_exercices").val() + numero);
      } else {
        $("#choix_des_exercices").val(
          $("#choix_des_exercices").val() + "," + numero
        );
      }
      // liste_des_exercices = $("#choix_des_exercices")
      //   .val()
      //   .replace(/\s/g, "")
      //   .replace(";", ",")
      //   .split(",");

      // Créé un évènement de changement de la valeur du champ pour déclencher la mise à jour
      let event = new Event('change');
      document.getElementById('choix_des_exercices').dispatchEvent(event);
      
      // Actualise KaTeX pour les titres d'exercices utilisant LaTeX
      renderMathInElement(document.body, {
        delimiters: [
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: true,
        errorColor: "#CC0000",
        strict: "warn",
        trust: false,
      });
    });
}


export function menuTheme(theme) {
  let codeHTML = '<h2 class="ui horizontal divider header">Exercices en ligne à données aléatoires</h2>'
  codeHTML += '\n<div class="ui middle aligned animated selection divided list">'
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {
    codeHTML +=
      `<a class="item" href="/exercice.html?ex=${id}" target="_blank">
      <img class="ui avatar image" src="/images/dice.png"> <div class="header content">${id} - ${dictionnaire[id].titre} </div>
    </a>`
  }
  codeHTML += '\n</div>'
  return codeHTML
  
}


export function listeTheme(theme) {
  let codeHTML = ''
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {
    codeHTML +=
      `<a class="item" href="/exercice.html?ex=${id}" target="_blank">
      <img class="ui avatar image" src="/images/dice.png"> <div class="header content">${id} - ${dictionnaire[id].titre} </div>
    </a>`
  }
  return codeHTML
  
}