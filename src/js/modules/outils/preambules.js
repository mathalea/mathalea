/** @module préambules pour LaTeX */

// Gestion des styles LaTeX

/**
* Renvoie un texte avec le préambule d'un fichier LaTeX
* @param {string} Le titre de l'entête
* @author Rémi Angot
*/
export function introLatex (entete = 'Exercices', listePackages = '') {
  if (entete === '') { entete = 'Exercices' }
  return `\\documentclass[12pt,svgnames]{article}
  \\usepackage[left=1.5cm,right=1.5cm,top=2cm,bottom=2cm]{geometry}
  %\\usepackage[utf8]{inputenc}        
  %\\usepackage[T1]{fontenc}
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  % EXIT WARNING DÛ À LA COMPILATION XETEX %
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  \\usepackage{ifxetex}
  
  \\ifxetex
    \\usepackage{fontspec}
  \\else
    \\usepackage[T1]{fontenc}
    \\usepackage[utf8]{inputenc}
    \\usepackage{lmodern}
  \\fi
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  \\usepackage[french]{babel}
  \\usepackage{multicol} 
  \\usepackage{calc} 
  \\usepackage{enumerate}
  \\usepackage{enumitem}
  \\usepackage{graphicx}
  \\usepackage{tabularx}
  %\\usepackage[autolanguage]{numprint}
  \\usepackage[autolanguage,np]{numprint}
  \\usepackage{hyperref}
  \\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
  \\usepackage{cancel}
  \\usepackage{textcomp}
  \\usepackage{gensymb}
  \\usepackage{eurosym}
  %\\DeclareUnicodeCharacter{20AC}{\\euro{}} %Incompatible avec XeLaTeX
  \\usepackage{fancyhdr,lastpage}          
  \\pagestyle{fancy}                      
  \\usepackage{fancybox}
  \\usepackage{setspace}
  \\usepackage{colortbl}
  \\usepackage{xcolor}
    \\definecolor{nombres}{cmyk}{0,.8,.95,0}
    \\definecolor{gestion}{cmyk}{.75,1,.11,.12}
    \\definecolor{gestionbis}{cmyk}{.75,1,.11,.12}
    \\definecolor{grandeurs}{cmyk}{.02,.44,1,0}
    \\definecolor{geo}{cmyk}{.62,.1,0,0}
    \\definecolor{algo}{cmyk}{.69,.02,.36,0}
  \\definecolor{correction}{cmyk}{.63,.23,.93,.06}
  \\usepackage{pgf,tikz}
  \\usetikzlibrary{babel,arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
  shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows}
  
  
  \\setlength{\\parindent}{0mm}
  \\renewcommand{\\arraystretch}{1.5}
  \\newcounter{exo}          
  \\setcounter{exo}{0}   
  \\newcommand{\\exo}[1]{
    \\stepcounter{exo}        
    \\subsection*{Exercice \\no{\\theexo} \\textmd{\\normalsize #1}}
  }
  \\renewcommand{\\labelenumi}{\\textbf{\\theenumi{}.}}
  \\renewcommand{\\labelenumii}{\\textbf{\\theenumii{}.}}
  \\newcommand{\\version}[1]{\\fancyhead[R]{Version #1}}
  \\setlength{\\fboxsep}{3mm}
  \\newenvironment{correction}{\\newpage\\fancyhead[C]{\\textbf{Correction}}\\setcounter{exo}{0}}{}
  \\fancyhead[C]{\\textbf{${entete}}}
  \\fancyfoot{}
  \\fancyfoot[R]{\\scriptsize Coopmaths.fr -- CC-BY-SA}
  \\setlength{\\headheight}{14.5pt}
  
  ${preambulePersonnalise(listePackages)}
  
  
  \\begin{document}
  
  `
}
/**
  * Renvoie un texte avec le préambule d'un fichier LaTeX
  * @param {string} Le titre de l'entête
  * @author Rémi Angot
  */
export function introLatexCan (entete = 'Course aux nombres', listePackages = '') {
  if (entete === '') { entete = 'Course aux nombres' }
  // return `\\documentclass[12pt, landscape]{article}
  return `\\documentclass[12pt,svgnames]{article}
  \\usepackage[left=1.5cm,right=1.5cm,top=2cm,bottom=2cm]{geometry}
  %\\usepackage[utf8]{inputenc}        
  %\\usepackage[T1]{fontenc}
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  % EXIT WARNING DÛ À LA COMPILATION XETEX %
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  \\usepackage{ifxetex}
  
  \\ifxetex
    \\usepackage{fontspec}
  \\else
    \\usepackage[T1]{fontenc}
    \\usepackage[utf8]{inputenc}
    \\usepackage{lmodern}
  \\fi
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  \\usepackage[french]{babel}
  \\usepackage{multicol} 
  \\usepackage{calc} 
  \\usepackage{enumerate}
  \\usepackage{enumitem}
  \\usepackage{graphicx}
  \\usepackage{tabularx}
  %\\usepackage[autolanguage]{numprint}
  \\usepackage[autolanguage,np]{numprint}
  \\usepackage{hyperref}
  \\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
  \\usepackage{cancel}
  \\usepackage{textcomp}
  \\usepackage{gensymb}
  \\usepackage{eurosym}
  %\\DeclareUnicodeCharacter{20AC}{\\euro{}} %Incompatible avec XeLaTeX
  \\usepackage{fancyhdr,lastpage}          
  \\pagestyle{fancy}                      
  \\usepackage{fancybox}
  \\usepackage{setspace}
  \\usepackage{colortbl}
  \\usepackage{xcolor}
    \\definecolor{nombres}{cmyk}{0,.8,.95,0}
    \\definecolor{gestion}{cmyk}{.75,1,.11,.12}
    \\definecolor{gestionbis}{cmyk}{.75,1,.11,.12}
    \\definecolor{grandeurs}{cmyk}{.02,.44,1,0}
    \\definecolor{geo}{cmyk}{.62,.1,0,0}
    \\definecolor{algo}{cmyk}{.69,.02,.36,0}
  \\definecolor{correction}{cmyk}{.63,.23,.93,.06}
  \\usepackage{pgf,tikz}
  \\usetikzlibrary{babel,arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
  shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows}
  
  
  \\setlength{\\parindent}{0mm}
  \\renewcommand{\\arraystretch}{1.5}
  \\newcounter{exo}          
  \\setcounter{exo}{0}   
  \\newcommand{\\exo}[1]{
    \\stepcounter{exo}        
    \\subsection*{Exercice \\no{\\theexo} \\textmd{\\normalsize #1}}
  }
  \\renewcommand{\\labelenumi}{\\textbf{\\theenumi{}.}}
  \\renewcommand{\\labelenumii}{\\textbf{\\theenumii{}.}}
  \\newcommand{\\version}[1]{\\fancyhead[R]{Version #1}}
  \\setlength{\\fboxsep}{3mm}
  \\newenvironment{correction}{\\newpage\\fancyhead[C]{\\textbf{Correction}}\\setcounter{exo}{0}}{}
  \\fancyhead[C]{}
  \\fancyfoot{}
  \\fancyfoot[R]{\\scriptsize Coopmaths.fr -- CC-BY-SA}
  \\setlength{\\headheight}{14.5pt}
  
  \\fancypagestyle{premierePage}
  {
    \\fancyhead[C]{\\textsc{${entete}}}
  }
  ${preambulePersonnalise(listePackages)}
  
  % Spécifique sujets CAN
  \\usepackage{longtable}
  
  \\tikzset{
    mybox/.style={
      rectangle,
      drop shadow, 
      inner sep=17pt,
      draw=gray,
      shade,
      top color=gray,
      every shadow/.append style={fill=gray!40}, 
      bottom color=gray!20
      }
    }
    
    \\newcommand\\MyBox[2][]{%
      \\tikz\\node[mybox,#1] {#2}; 
    }
    \\newcounter{nbEx}
    \\usepackage{totcount}
    \\regtotcounter{nbEx}
    \\def\\checkmark{\\tikz\\fill[scale=0.4](0,.35) -- (.25,0) -- (1,.7) -- (.25,.15) -- cycle;}
    
  \\begin{document}
  \\thispagestyle{premierePage}
  
  \\setcounter{nbEx}{1}
  \\vspace*{-10mm}
  \\textsc{Nom} : \\makebox[.35\\linewidth]{\\dotfill} \\hfill \\textsc{Prénom} : \\makebox[.35\\linewidth]{\\dotfill}
  \\begin{minipage}{0.55\\textwidth}
    \\vspace{10mm}
    \\textsc{Classe} : \\makebox[.45\\linewidth]{\\dotfill}
  \\end{minipage}
  \\begin{minipage}{0.35\\textwidth} 
    \\vspace{5mm}
    \\MyBox{\\Large\\textsc{Score} : \\makebox[.15\\linewidth]{\\dotfill} / \\total{nbEx}}      
  \\end{minipage}
  \\par\\medskip \\hrulefill \\par
  \\checkmark \\textit{\\textbf{Durée : [Temps total à modifier ici dans le code source] minutes}}
  
  \\smallskip
  \\checkmark \\textit{L'épreuve comporte \\total{nbEx} questions.}
  
  \\smallskip  
  \\checkmark \\textit{L'usage de la calculatrice et du brouillon sont interdits.}
  
  \\smallskip
  \\checkmark \\textit{Il n'est pas permis d'écrire des calculs intermédiaires.}
  \\par \\hrulefill \\par\\vspace{5mm}
  \\begin{center}
  \\textbf{[Ligne ci-dessous à modifier dans le code source]}
  
  \\textsc{Sujet niveau NN - Mois Année}
  
  
  \\par\\vspace{5mm}
  \\def\\arete{3}   \\def\\epaisseur{5}   \\def\\rayon{2}
  
  \\newcommand{\\ruban}{(0,0)
    ++(0:0.57735*\\arete-0.57735*\\epaisseur+2*\\rayon)
    ++(-30:\\epaisseur-1.73205*\\rayon)
    arc (60:0:\\rayon)   -- ++(90:\\epaisseur)
    arc (0:60:\\rayon)   -- ++(150:\\arete)
    arc (60:120:\\rayon) -- ++(210:\\epaisseur)
    arc (120:60:\\rayon) -- cycle}
  
  \\begin{tikzpicture}[very thick,top color=white,bottom color=gray,scale=1.3]
    \\shadedraw \\ruban;
    \\shadedraw [rotate=120] \\ruban;
    \\shadedraw [rotate=-120] \\ruban;
    \\draw (-60:4) node[scale=5,rotate=30]{CAN};
    \\draw (180:4) node[scale=3,rotate=-90]{MathALEA};
    \\clip (0,-6) rectangle (6,6); % pour croiser
    \\shadedraw  \\ruban;
    \\draw (60:4) node [gray,xscale=2.5,yscale=2.5,rotate=-30]{CoopMaths};
  \\end{tikzpicture}
  \\end{center}
  \\clearpage
  `
}

/**
  * Renvoie un texte avec le préambule d'un fichier LaTeX avec le style CoopMaths
  * @author Rémi Angot
  */
export function introLatexCoop (listePackages) {
  const introLatexCoop = `\\documentclass[12pt,svgnames]{article}
  \\usepackage[left=1.5cm,right=1.5cm,top=4cm,bottom=2cm]{geometry}
  %\\usepackage[utf8]{inputenc}        
  %\\usepackage[T1]{fontenc}
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  % EXIT WARNING DÛ À LA COMPILATION XETEX %
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  \\usepackage{ifxetex}
  
  \\ifxetex
    \\usepackage{fontspec}
  \\else
    \\usepackage[T1]{fontenc}
    \\usepackage[utf8]{inputenc}
    \\usepackage{lmodern}
  \\fi
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  \\usepackage[french]{babel}
  \\usepackage{hyperref}
  \\usepackage{multicol} 
  \\usepackage{calc} 
  \\usepackage{enumerate}
  \\usepackage{enumitem}
  \\usepackage{graphicx}
  \\usepackage{tabularx}
  %\\usepackage[autolanguage]{numprint}
  \\usepackage[autolanguage,np]{numprint}
  \\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
  \\usepackage{cancel}
  \\usepackage{textcomp}
  \\usepackage{gensymb}
  \\usepackage{eurosym}
  %\\DeclareUnicodeCharacter{20AC}{\\euro{}} %Incompatible avec XeLaTeX
  \\usepackage{fancyhdr,lastpage}          
  \\pagestyle{fancy}                      
  \\usepackage{fancybox}
  \\usepackage{setspace}
  \\usepackage{xcolor}
  \\usepackage{pgf,tikz} % Pour les images et figures gÃ©omÃ©triques
  \\usetikzlibrary{babel,arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
  shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows}
  
  \\renewcommand{\\headrulewidth}{0pt}
  \\renewcommand{\\footrulewidth}{0pt}
  \\fancyhead[L]{}
  \\fancyhead[R]{}
  
  %%% COULEURS %%%
  
  \\definecolor{nombres}{cmyk}{0,.8,.95,0}
  \\definecolor{gestion}{cmyk}{.75,1,.11,.12}
  \\definecolor{gestionbis}{cmyk}{.75,1,.11,.12}
  \\definecolor{grandeurs}{cmyk}{.02,.44,1,0}
  \\definecolor{geo}{cmyk}{.62,.1,0,0}
  \\definecolor{algo}{cmyk}{.69,.02,.36,0}
  \\definecolor{correction}{cmyk}{.63,.23,.93,.06}
  \\usepackage{colortbl}
  \\arrayrulecolor{couleur_theme} % Couleur des filets des tableaux
  
  %%% MISE EN PAGE %%%
  
  \\setlength{\\parindent}{0mm}
  \\renewcommand{\\arraystretch}{1.5}
  \\renewcommand{\\labelenumi}{\\textbf{\\theenumi{}.}}
  \\renewcommand{\\labelenumii}{\\textbf{\\theenumii{}.}}
  \\setlength{\\fboxsep}{3mm}
  
  \\setlength{\\headheight}{14.5pt}
  
  \\spaceskip=2\\fontdimen2\\font plus 3\\fontdimen3\\font minus3\\fontdimen4\\font\\relax %Pour doubler l'espace entre les mots
  \\newcommand{\\numb}[1]{ % Dessin autour du numéro d'exercice
  \\begin{tikzpicture}[overlay,yshift=-.3cm,scale=.8]
  \\draw[fill=couleur_numerotation,couleur_numerotation](-.3,0)rectangle(.5,.8);
  \\draw[line width=.05cm,couleur_numerotation,fill=white] (0,0)--(.5,.5)--(1,0)--(.5,-.5)--cycle;
  \\node[couleur_numerotation]  at (.5,0) { \\large \\bfseries #1};
  \\draw (-.4,.8) node[white,anchor=north west]{\\bfseries EX}; 
  \\end{tikzpicture}
  }
  
  %%% NUMEROS DES EXERCICES %%%
  
  \\usepackage{titlesec} % Le titre de section est un numéro d'exercice avec sa consigne alignée à gauche.
  \\titleformat{\\section}{}{\\numb{\\arabic{section}}}{1cm}{\\hspace{0em}}{}
  \\newcommand{\\exo}[1]{ % Un exercice est une nouvelle section avec la consigne écrite en caractêres normaux
    \\section{\\textmd{#1}}
    \\medskip
  }
  
  
  %%% ENVIRONNEMENTS - CADRES %%%
  \\usepackage[framemethod=tikz]{mdframed}
  
  \\newmdenv[linecolor=couleur_theme, linewidth=3pt,topline=true,rightline=false,bottomline=false,frametitlerule=false,frametitlefont={\\color{couleur_theme}\\bfseries},frametitlerulewidth=1pt]{methode}
  
  
  \\newmdenv[startcode={\\setlength{\\multicolsep}{0cm}\\setlength{\\columnsep}{.2cm}\\setlength{\\columnseprule}{0pt}\\vspace{0cm}},linecolor=white, linewidth=3pt,innerbottommargin=10pt,innertopmargin=5pt,innerrightmargin=20pt,splittopskip=20pt,splitbottomskip=10pt,everyline=true,tikzsetting={draw=couleur_theme,line width=4pt,dashed,dash pattern= on 10pt off 10pt},frametitleaboveskip=-.6cm,frametitle={\\tikz\\node[anchor= east,rectangle,fill=white]{\\textcolor{couleur_theme}{\\raisebox{-.3\\height}{}\\; \\bfseries \\Large Objectifs}};}]{objectif}
  
  \\newmdenv[startcode={\\colorlet{couleur_numerotation}{correction}\\renewcommand{\\columnseprulecolor}{\\color{correction}}
  \\setcounter{section}{0}\\arrayrulecolor{correction}},linecolor=white, linewidth=4pt,innerbottommargin=10pt,innertopmargin=5pt,splittopskip=20pt,splitbottomskip=10pt,everyline=true,frametitle=correction,tikzsetting={draw=correction,line width=3pt,dashed,dash pattern= on 15pt off 10pt},frametitleaboveskip=-.4cm,frametitle={\\tikz\\node[anchor= east,rectangle,fill=white]{\\; \\textcolor{correction}{\\raisebox{-.3\\height}{}\\; \\bfseries \\Large Corrections}};}]{correction}
  
  \\newmdenv[roundcorner=0,linewidth=0pt,frametitlerule=false, backgroundcolor=gray!40,leftmargin=8cm]{remarque}
  
  % echelle pour le dé
  \\def \\globalscale {0.04}
  % abscisse initiale pour les chevrons
  \\def \\xini {3}
  
  \\newcommand{\\theme}[4]
  {
    %\\theme{nombres|gestion|grandeurs|geo|algo}{Texte (entrainement, évaluation, mise en route...}{numéro de version ou vide}{titre du thême et niveau}
    \\fancyhead[C]{
      %Tracé du dé
      \\begin{tikzpicture}[y=0.80pt, x=0.80pt, yscale=-\\globalscale, xscale=\\globalscale,remember picture, overlay, shift={(current page.north west)},xshift=17cm,yshift=9.5cm,fill=couleur_theme]
        %%%%Arc supérieur gauche%%%%
        \\path[fill](523,1424)..controls(474,1413)and(404,1372)..(362,1333)..controls(322,1295)and(313,1272)..(331,1254)..controls(348,1236)and(369,1245)..(410,1283)..controls(458,1328)and(517,1356)..(575,1362)..controls(635,1368)and(646,1375)..(643,1404)..controls(641,1428)and(641,1428)..(596,1430)..controls(571,1431)and(538,1428)..(523,1424)--cycle;
        %%%%Dé face supérieur%%%%
        \\path[fill](512,1272)..controls(490,1260)and(195,878)..(195,861)..controls(195,854)and(198,846)..(202,843)..controls(210,838)and(677,772)..(707,772)..controls(720,772)and(737,781)..(753,796)..controls(792,833)and(1057,1179)..(1057,1193)..controls(1057,1200)and(1053,1209)..(1048,1212)..controls(1038,1220)and(590,1283)..(551,1282)..controls(539,1282)and(521,1278)..(512,1272)--cycle;
        %%%%Dé faces gauche et droite%%%%
        \\path[fill](1061,1167)..controls(1050,1158)and(978,1068)..(900,967)..controls(792,829)and(756,777)..(753,756)--(748,729)--(724,745)..controls(704,759)and(660,767)..(456,794)..controls(322,813)and(207,825)..(200,822)..controls(193,820)and(187,812)..(187,804)..controls(188,797)and(229,688)..(279,563)..controls(349,390)and(376,331)..(391,320)..controls(406,309)and(462,299)..(649,273)..controls(780,254)and(897,240)..(907,241)..controls(918,243)and(927,249)..(928,256)..controls(930,264)and(912,315)..(889,372)..controls(866,429)and(848,476)..(849,477)..controls(851,479)and(872,432)..(897,373)..controls(936,276)and(942,266)..(960,266)..controls(975,266)and(999,292)..(1089,408)..controls(1281,654)and(1290,666)..(1290,691)..controls(1290,720)and(1104,1175)..(1090,1180)..controls(1085,1182)and (1071,1176)..(1061,1167)--cycle;
        %%%%Arc inférieur bas%%%%
        \\path[fill](1329,861)..controls(1316,848)and(1317,844)..(1339,788)..controls(1364,726)and(1367,654)..(1347,591)..controls(1330,539)and(1338,522)..(1375,526)..controls(1395,528)and(1400,533)..(1412,566)..controls(1432,624)and(1426,760)..(1401,821)..controls(1386,861)and(1380,866)..(1361,868)..controls(1348,870)and(1334,866)..(1329,861)--cycle;
        %%%%Arc inférieur gauche%%%%
        \\path[fill](196,373)..controls(181,358)and(186,335)..(213,294)..controls(252,237)and(304,190)..(363,161)..controls(435,124)and(472,127)..(472,170)..controls(472,183)and(462,192)..(414,213)..controls(350,243)and(303,283)..(264,343)..controls(239,383)and(216,393)..(196,373)--cycle;
      \\end{tikzpicture}
      \\begin{tikzpicture}[remember picture,overlay]
        \\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(0,-.8cm)$) {};
        \\node[anchor=east, fill=white] at ($(current page.north east)+(-18.8,-2.3cm)$) {\\footnotesize \\bfseries{MathALEA}};
        \\end{tikzpicture}
      \\begin{tikzpicture}[line cap=round,line join=round,remember picture, overlay, shift={(current page.north west)},yshift=-8.5cm]
        \\fill[fill=couleur_theme] (0,5) rectangle (21,6);
        \\fill[fill=couleur_theme] (\\xini,6)--(\\xini+1.5,6)--(\\xini+2.5,7)--(\\xini+1.5,8)--(\\xini,8)--(\\xini+1,7)-- cycle;
        \\fill[fill=couleur_theme] (\\xini+2,6)--(\\xini+2.5,6)--(\\xini+3.5,7)--(\\xini+2.5,8)--(\\xini+2,8)--(\\xini+3,7)-- cycle;  
        \\fill[fill=couleur_theme] (\\xini+3,6)--(\\xini+3.5,6)--(\\xini+4.5,7)--(\\xini+3.5,8)--(\\xini+3,8)--(\\xini+4,7)-- cycle;   
        \\node[color=white] at (10.5,5.5) {\\LARGE \\bfseries{ \\MakeUppercase{ #4}}};
      \\end{tikzpicture}
      \\begin{tikzpicture}[remember picture,overlay]
        \\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(0,-.8cm)$) {};
        \\node[anchor=east, fill=white] at ($(current page.north east)+(-2,-1.5cm)$) {\\Huge \\textcolor{couleur_theme}{\\bfseries{\\#}} \\bfseries{#2} \\textcolor{couleur_theme}{\\bfseries \\MakeUppercase{#3}}};
      \\end{tikzpicture}
    }
    \\fancyfoot[R]{
      %\\scriptsize Coopmaths.fr -- CC-BY-SA
      \\begin{tikzpicture}[remember picture,overlay]
          \\node[anchor=south east] at ($(current page.south east)+(-2,0.25cm)$) {\\scriptsize {\\bfseries \\href{https://coopmaths.fr/}{Coopmaths.fr} -- \\href{http://creativecommons.fr/licences/}{CC-BY-SA}}};
        \\end{tikzpicture}
      \\begin{tikzpicture}[line cap=round,line join=round,remember picture, overlay,xscale=0.5,yscale=0.5, shift={(current page.south west)},xshift=35.7cm,yshift=-6cm]
        \\fill[fill=couleur_theme] (\\xini,6)--(\\xini+1.5,6)--(\\xini+2.5,7)--(\\xini+1.5,8)--(\\xini,8)--(\\xini+1,7)-- cycle;
        \\fill[fill=couleur_theme] (\\xini+2,6)--(\\xini+2.5,6)--(\\xini+3.5,7)--(\\xini+2.5,8)--(\\xini+2,8)--(\\xini+3,7)-- cycle;  
        \\fill[fill=couleur_theme] (\\xini+3,6)--(\\xini+3.5,6)--(\\xini+4.5,7)--(\\xini+3.5,8)--(\\xini+3,8)--(\\xini+4,7)-- cycle;  
      \\end{tikzpicture}
    }
    \\fancyfoot[C]{}
    \\colorlet{couleur_theme}{#1}
    \\colorlet{couleur_numerotation}{couleur_theme}
    \\def\\iconeobjectif{icone-objectif-#1}
    \\def\\urliconeomethode{icone-methode-#1}
  }
  
  \\newcommand{\\version}[1]{
    \\fancyhead[R]{
      \\begin{tikzpicture}[remember picture,overlay]
      \\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(-.5,-.5cm)$) {\\large \\textcolor{couleur_theme}{\\bfseries V#1}};
      \\end{tikzpicture}
    }
  }
  
  ${preambulePersonnalise(listePackages)}
  
  %%%%%%%%%%%%%%%%%%%%%%%%
  %%% Fin du préambule %%%
  %%%%%%%%%%%%%%%%%%%%%%%%
      
  
  `
  return introLatexCoop
}

export function preambulePersonnalise (listePackages) {
  let result = ''
  for (const packages of listePackages) {
    switch (packages) {
      case 'axe_gradues':
        result += `
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  %%% Gestion des axes gradués (Olivier Lacroix) %%%
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  
  
  \\usepackage{xparse}
  \\usepackage{ifthen}
  \\usepackage{xargs}
  
  \\newboolean{demiDroite}
  \\newboolean{affichePointilles}
  \\newboolean{affichePoint}
  \\newboolean{afficheGraduations}
  
  \\makeatletter
  \\newtoks\\@tabtoks
  \\providecommand\\addtabtoks[1]{\\@tabtoks\\expandafter{\\the\\@tabtoks#1}}
  \\providecommand*\\resettabtoks{\\@tabtoks{}}
  \\providecommand*\\printtabtoks{\\the\\@tabtoks}
  \\makeatother
  
  \\DeclareDocumentCommand \\placePoints%
  { > { \\SplitList { | } } m }%
  {\\ProcessList {#1} {\\mycommand}}
  
  \\newcommand{\\mycommand}[1]{
  \\def\\temp{#1}
  \\expandafter\\placePointsDeuxArg\\temp
  }
  
  \\def\\placePointsDeuxArg#1,#2{\\draw (#1,0) node{\\Large $\\times$} node[above=.2] {\\ensuremath{#2}};}
  
  
  
  
  \\newcommandx{\\axeGradueFraction}[5][5=]{
  \\begin{tikzpicture}[xscale=#4,>=latex]
    \\def\\Xmin{#1} 
    \\def\\Xmax{#2} 
    \\def\\Decoupage{#3}
    
    \\ifthenelse { \\equal {#5} {} }
    {%pas d'argument optionnel, on trace juste l'axe ci-dessous
    }
    {% un nombre est Ã placer sur l'axe avec son label
      \\placePoints{#5}
      %\\draw (#5,-.08) -- (#5,.08) node[above] {#6};
    }
  
  
      
    % Xfleche de l'axe
    \\pgfmathparse{\\Xmax+0.2}\\let\\Xfleche\\pgfmathresult;
    % dÃ©but du segment reprÃ©sentant l'axe numÃ©ro 1
    \\ifthenelse{\\equal{\\Xmin}{0}}
    {
      \\def\\Xorigine{\\Xmin} 
    }
    {
      \\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;
      % pour la dÃ©co :
      \\draw (\\Xmin-1/\\Decoupage,-.05) -- (\\Xmin-1/\\Decoupage,.05);
    }
    \\pgfmathparse{int(\\Xmax-1)}\\let\\XmaxMoinsUn\\pgfmathresult;
    % construction de la droite
    \\draw[->,>=latex] (\\Xorigine,0) -- (\\Xfleche,0);
    \\foreach \\x in {\\Xmin,...,\\XmaxMoinsUn}{
        \\draw (\\x,-.1) -- (\\x,.1) node[below=.3] {\\x};
        \\foreach \\y in {1,...,\\Decoupage}{
          \\pgfmathparse{\\x+\\y/\\Decoupage}\\let\\Xgrad\\pgfmathresult;
          \\draw (\\Xgrad,-.05) -- (\\Xgrad,.05);
        }
    };
    % derniÃ¨re graduation Ã la mano 
    \\draw (\\Xmax,-.1) -- (\\Xmax,.1) node[below=.3] {\\Xmax};
  
  \\end{tikzpicture}
  }
  
  
  
  \\newcommand{\\axesZoom}[5]{
  {} \\hfill 
  \\begin{tikzpicture}
    \\def\\XA{#1} % nombre (positif pour l'instant) Ã placer (avec deux dÃ©cimales)
    \\def\\Nom{#2} % nom du point Ã placer. Laisser vide si vous ne souhaitez pas voir le point
    \\def\\Xmin{#3} % premiÃ¨re valeur de x entiÃ¨re sur l'axe
    \\setboolean{affichePointilles}{true}  % affiche les pointillÃ©s indiquant le grossissement
    \\setboolean{affichePoint}{#4} % Est ce que le point doit apparaÃ®tre sur la construction. 
    \\setboolean{afficheGraduations}{#5} % Est ce que l'on gradue tous les axes ou seulement \\Xmin et \\Xmax sur le premier axe (si false)
    \\setboolean{demiDroite}{true} %Par dÃ©faut, on construit des demi-droites pour les 6Ã¨mes, si Xmin=0 ou si une des dÃ©cimales l'exige.
    
    \\ifthenelse{\\boolean{demiDroite}}
    {
      \\def\\DebordementAGauche{0} % mettre 0 pour une demi-droite graduÃ©e partant de l'origine
    }
    {
      \\def\\DebordementAGauche{0.5} % mettre 0.5 dans les autres cas.
    }
    
    \\pgfmathparse{int(\\Xmin+10)}\\let\\Xmax\\pgfmathresult; % Xmax vaut toujours Xmin+10
      
    \\pgfmathparse{int(\\XA)}\\let\\Unites\\pgfmathresult;
    \\pgfmathparse{int((\\XA-\\Unites)*10)}\\let\\Dixiemes\\pgfmathresult;
    \\pgfmathparse{int(round((\\XA-\\Unites.\\Dixiemes)*100))}\\let\\Centiemes\\pgfmathresult;
  
    \\pgfmathparse{int(\\Unites+1)}\\let\\UnitesMaj\\pgfmathresult;
    \\pgfmathparse{int(\\Dixiemes+1)}\\let\\DixiemesMaj\\pgfmathresult;
    \\pgfmathparse{int(\\Centiemes+1)}\\let\\CentiemesMaj\\pgfmathresult;
  
    \\pgfmathparse{\\Xmax+1}\\let\\Xfleche\\pgfmathresult;
    \\ifthenelse{\\equal{\\Xmin}{0}}
    {
      \\def\\Xorigine{\\Xmin} 
    }
    {
      \\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;
    }
  
    \\pgfmathparse{int(\\Xmax-1)}\\let\\XmaxMoinsUn\\pgfmathresult;
    \\pgfmathparse{int(\\Xmin+1)}\\let\\XminPlusUn\\pgfmathresult;
      
    \\draw[->,>=latex] (\\Xorigine,0) -- (\\Xfleche,0);
    \\foreach \\x in {\\XminPlusUn,...,\\XmaxMoinsUn}{
      \\ifthenelse{\\boolean{afficheGraduations}}
      {
        \\draw (\\x,-.1) -- (\\x,.1) node[above] {\\x};
      }
      {
        \\draw (\\x,-.1) -- (\\x,.1);
      }
    };
    \\foreach \\x in {1,...,9}{
      \\draw (\\Unites.\\x,-.05) -- (\\Unites.\\x,.05);
    }
    \\draw (\\Xmin,-.1) -- (\\Xmin,.1) node[above] {\\Xmin};
    \\draw (\\Xmax,-.1) -- (\\Xmax,.1) node[above] {\\Xmax};
    \\ifthenelse{\\not\\equal{\\Unites}{0}}
    {
      \\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;
    }{}
    \\draw[->,>=latex] (\\Xorigine,-2) -- (\\Xfleche,-2);
    \\foreach \\x in {1,...,9}{
      \\pgfmathparse{int(\\Xmin+\\x)}\\let\\X\\pgfmathresult;
      \\ifthenelse{\\boolean{afficheGraduations}}
      {
        \\draw (\\X,-2.1) -- (\\X,-1.9) node[above] {\\Unites,\\x};
      }
      {
        \\draw (\\X,-2.1) -- (\\X,-1.9);
      }
      \\pgfmathparse{int(\\Dixiemes+\\Xmin)+\\x/10}\\let\\Xtirets\\pgfmathresult;
      \\draw (\\Xtirets,-2.05) -- (\\Xtirets,-1.95);
    };
    
    \\ifthenelse{\\boolean{afficheGraduations}}
    {
      \\draw (\\Xmax,-2.1) -- (\\Xmax,-1.9) node[above] {\\UnitesMaj};
      \\draw (\\Xmin,-2.1) -- (\\Xmin,-1.9) node[above] {\\Unites};
    }
    {
      \\draw (\\Xmax,-2.1) -- (\\Xmax,-1.9) ;
      \\draw (\\Xmin,-2.1) -- (\\Xmin,-1.9) ;
    }
    
    \\pgfmathparse{int(\\Dixiemes+\\Xmin)}\\let\\XGaucheAxeBis\\pgfmathresult;
    \\pgfmathparse{int(\\XGaucheAxeBis+1)}\\let\\XDroitAxeBis\\pgfmathresult;
  
    \\ifthenelse{\\boolean{affichePointilles}}
    {
    \\draw[dashed] (\\Unites,0) -- (\\Xmin,-2);
    \\draw[dashed] (\\UnitesMaj,0) -- (\\Xmax,-2);
    \\draw[dashed] (\\XGaucheAxeBis,-2) -- (\\Xmin,-4);
    \\draw[dashed] (\\XDroitAxeBis,-2) -- (\\Xmax,-4);
    }{}
    
    \\ifthenelse{\\not\\equal{\\Dixiemes}{0}}
    {
      \\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;
    }{}
    \\draw[->,>=latex] (\\Xorigine,-4) -- (\\Xfleche,-4);
    \\foreach \\x in {1,...,9}{
      \\pgfmathparse{int(\\Xmin+\\x)}\\let\\X\\pgfmathresult;
      \\ifthenelse{\\boolean{afficheGraduations}}
        {
        \\draw (\\X,-4.1) -- (\\X,-3.9) node[above] {\\Unites,\\Dixiemes\\x};
        }
        {
        \\draw (\\X,-4.1) -- (\\X,-3.9) ;
        }
      };
  
    
  \\ifthenelse{\\boolean{afficheGraduations}}
    {
    \\ifthenelse{\\equal{\\Dixiemes}{9}}
      {
      \\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9) node[above] {\\UnitesMaj};
      }
      {
      \\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9) node[above] {\\Unites,\\DixiemesMaj};
      }
    
    \\ifthenelse{\\equal{\\Dixiemes}{0}}
      {
      \\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) node[above] {\\Unites};
      }
      {
      \\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) node[above] {\\Unites,\\Dixiemes};
      }
    }
    {
    \\ifthenelse{\\equal{\\Dixiemes}{9}}
      {
      \\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9);
      }
      {
      \\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9) ;
      }
    
    \\ifthenelse{\\equal{\\Dixiemes}{0}}
      {
      \\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) ;
      }
      {
      \\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) ;
      }
    \\pgfmathparse{int(\\Centiemes+\\Xmin)}\\let\\XGaucheAxeTer\\pgfmathresult;
    \\draw (\\XGaucheAxeTer,-4) node[below] {\\Nom};
    }
    
    \\ifthenelse{\\boolean{affichePoint}}
    {
      \\draw (\\XA,0) node{\\Large $\\times$} node[below] {\\Nom};
      \\draw (\\XGaucheAxeBis.\\Centiemes,-2) node{\\Large $\\times$} node[below] {\\Nom};
    }{}
  \\end{tikzpicture}
  
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  %%% Fin de la gestion des axes gradués %%%
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  
  }
  
  `
        break
      case 'bclogo':
        result += '\\usepackage[tikz]{bclogo}'
        break
      case 'tkz-euclide':
        result += '\\usepackage{tkz-euclide}'
        break
      case 'bac':
      case 'crpe':
        result += '\\usepackage{scratch3}'
        break
      case 'dnb':
      case 'e3c':
        // result += `
        // \\usepackage{fourier}
        // \\usepackage[scaled=0.875]{helvet}
        // \\renewcommand{\\ttdefault}{lmtt}
        // \\usepackage[normalem]{ulem}
        // \\usepackage{diagbox}
        // \\usepackage{fancybox}
        // \\usepackage{booktabs}
        // \\usepackage{pifont}
        // \\usepackage{multirow}
        // \\usepackage{dcolumn}
        // \\usepackage{lscape}
        // \\usepackage{graphics,graphicx}
        // \\usepackage{pstricks,pst-plot,pst-tree,pstricks-add}
        // \\usepackage{scratch}
        // \\renewcommand{\\theenumi}{\\textbf{\\arabic{enumi}}}
        // \\renewcommand{\\labelenumi}{\\textbf{\\theenumi.}}
        // \\renewcommand{\\theenumii}{\\textbf{\\alph{enumii}}}
        // \\renewcommand{\\labelenumii}{\\textbf{\\theenumii.}}
        // \\newcommand{\\vect}[1]{\\overrightarrow{\\,\\mathstrut#1\\,}}
        // \\def\\Oij{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath}\\right)$}
        // \\def\\Oijk{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath},~\\vect{k}\\right)$}
        // \\def\\Ouv{$\\left(\\text{O}~;~\\vect{u},~\\vect{v}\\right)$}
        // `
        result += `
          %%%%% FONTS %%%%%
          %\\usepackage{fourier}
          \\usepackage{fourier-otf} % car compilation avec xetex
          \\usepackage[scaled=0.875]{helvet}
          \\renewcommand{\\ttdefault}{lmtt}
          \\usepackage{pifont} % symboles
          
          %%%%% MISE EN PAGE %%%%%
          \\usepackage{makeidx}
          \\usepackage{lscape} % format paysage
          
          %%%%% MISE EN FORME %%%%%
          \\usepackage[normalem]{ulem} % souligner
          \\usepackage{booktabs} % tableaux de qualité
          %\\usepackage[dvips]{hyperref} % hyperlien pour le passage par la compilation dvips
          
          %%%%% MATHS %%%%%
          \\usepackage{diagbox} % des diagonales dans une cellule de tableau
          \\usepackage{multirow} % fusionner plusieurs lignes de tableau
          \\usepackage{dcolumn} % aligner des décimaux dans un tableau
          %\\usepackage{marvosym}   %c'est pour le symbole euro : code \\EUR{}
          %\\usepackage[np]{numprint} % affichage formaté des nombres
          
          %%%%%%% SCRATCH %%%%%%%
          % Par défaut pour les anciens sujets c'est le package scratch qui est chargé
          % Les packages scratch et scratch3 sont incompatibles
          % Il convient donc de commenter l'un d'eux selon les besoins
          %
          % à noter que le package scratch3 requiert simplekv et tikz qui sont automatiquement chargés en cas de besoin
          \\usepackage{scratch}
          %\\usepackage{scratch3} 
          
          %%%%% FIGURES %%%%%
          \\usepackage{graphics} % à distinguer du package graphicx
          \\usepackage{framed} % decoration background
          
          %%%%%%% PSTRICKS %%%%%%%
          \\usepackage{pstricks,pst-plot,pst-tree,pstricks-add}
          \\usepackage{pst-eucl}  % permet de faire des dessins de géométrie simplement
          \\usepackage{pst-text}
          \\usepackage{pst-node,pst-all}
          \\usepackage{pst-func,pst-math,pst-bspline,pst-3dplot}  %%% POUR LE BAC %%%
          
          %%%%%%% TIKZ %%%%%%%
          \\usepackage{tkz-tab,tkz-fct}
          \\usepackage{tkz-euclide}
          \\usepackage[tikz]{bclogo}
          \\usetikzlibrary{shadows,decorations.markings}
          \\usetikzlibrary{decorations.pathreplacing}
          %\\usepackage{tikz} % arbre en proba
          %\\usetikzlibrary{trees} % arbre en proba
          \\usepackage{forest} % arbre en proba
          
          %%%%%%% TRACÉS FONNCTIONS %%%%%%%
          \\usepackage{pgfplots}
          \\pgfplotsset{compat=1.17}
          
          %%%%% PROGRAMMATION %%%%%
          \\usepackage{xkeyval,ifthen}
          
          
          %%%%% COMMANDES SPRECIFIQUES %%%%%
          \\usepackage{esvect} %%% POUR LE BAC %%%
          \\newcommand{\\vvt}[1]{\\vv{\\text{#1}}} %%% POUR LE BAC %%%
          \\newcommand{\\vectt}[1]{\\overrightarrow{\\,\\mathstrut\\text{#1}\\,}} %%% POUR LE BAC %%%
  
          \\newcommand{\\textding}[1]{\\text{\\ding{#1}}}
          %\\newcommand{\\euro}{\\eurologo{}}
          \\renewcommand{\\pstEllipse}[5][]{% arc d'ellipse pour le sujet de Polynésie septembre 2013
          \\psset{#1}
          \\parametricplot{#4}{#5}{#2\\space t cos mul #3\\space t sin mul}
          }
          
          %%%%%%% NOTATIONS DES ENSEMBLES %%%%%%%
          \\newcommand{\\R}{\\mathbb{R}}
          \\newcommand{\\N}{\\mathbb{N}}
          \\newcommand{\\D}{\\mathbb{D}}
          \\newcommand{\\Z}{\\mathbb{Z}}
          \\newcommand{\\Q}{\\mathbb{Q}}
          %\\newcommand{\\C}{\\mathbb{C}}
          
          %%%%% TRACÉS DANS UN REPÈRE %%%%%
          \\newcommand{\\vect}[1]{\\overrightarrow{\\,\\mathstrut#1\\,}}
          \\def\\Oij{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath}\\right)$}
          \\def\\Oijk{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath},~\\vect{k}\\right)$}
          \\def\\Ouv{$\\left(\\text{O}~;~\\vect{u},~\\vect{v}\\right)$}
          
          \\newcommand{\\e}{\\mathrm{\\,e\\,}} %%% POUR LE BAC %%% le e de l'exponentielle
          \\newcommand{\\ds}{\\displaystyle} %%% POUR LE BAC %%%
  
          %%%%% PROBABILITÉS %%%%%
          % Structure servant à avoir l'événement et la probabilité.
          \\def\\getEvene#1/#2\\endget{$#1$}
          \\def\\getProba#1/#2\\endget{$#2$}
          
          %%%%% NOMBRES PREMIERS %%%%%
          \\input{xlop} % JM pour les opérations
          %%% Table des nombres premiers  %%%%
          \\newcount\\primeindex
          \\newcount\\tryindex
          \\newif\\ifprime
          \\newif\\ifagain
          \\newcommand\\getprime[1]{%
          \\opcopy{2}{P0}%
          \\opcopy{3}{P1}%
          \\opcopy{5}{try}
          \\primeindex=2
          \\loop
          \\ifnum\\primeindex<#1\\relax
          \\testprimality
          \\ifprime
          \\opcopy{try}{P\\the\\primeindex}%
          \\advance\\primeindex by1
          \\fi
          \\opadd*{try}{2}{try}%
          \\ifnum\\primeindex<#1\\relax
          \\testprimality
          \\ifprime
          \\opcopy{try}{P\\the\\primeindex}%
          \\advance\\primeindex by1
          \\fi
          \\opadd*{try}{4}{try}%
          \\fi
          \\repeat
          }
          \\newcommand\\testprimality{%
          \\begingroup
          \\againtrue
          \\global\\primetrue
          \\tryindex=0
          \\loop
          \\opidiv*{try}{P\\the\\tryindex}{q}{r}%
          \\opcmp{r}{0}%
          \\ifopeq \\global\\primefalse \\againfalse \\fi
          \\opcmp{q}{P\\the\\tryindex}%
          \\ifoplt \\againfalse \\fi
          \\advance\\tryindex by1
          \\ifagain
          \\repeat
          \\endgroup
          }
          
          %%% Décomposition en nombres premiers %%%
          \\newcommand\\primedecomp[2][nil]{%
          \\begingroup
          \\opset{#1}%
          \\opcopy{#2}{NbtoDecompose}%
          \\opabs{NbtoDecompose}{NbtoDecompose}%
          \\opinteger{NbtoDecompose}{NbtoDecompose}%
          \\opcmp{NbtoDecompose}{0}%
          \\ifopeq
          Je refuse de décomposer zéro.
          \\else
          \\setbox1=\\hbox{\\opdisplay{operandstyle.1}%
          {NbtoDecompose}}%
          {\\setbox2=\\box2{}}%
          \\count255=1
          \\primeindex=0
          \\loop
          \\opcmp{NbtoDecompose}{1}\\ifopneq
          \\opidiv*{NbtoDecompose}{P\\the\\primeindex}{q}{r}%
          \\opcmp{0}{r}\\ifopeq
          \\ifvoid2
          \\setbox2=\\hbox{%
          \\opdisplay{intermediarystyle.\\the\\count255}%
          {P\\the\\primeindex}}%
          \\else
          \\setbox2=\\vtop{%
          \\hbox{\\box2}
          \\hbox{%
          \\opdisplay{intermediarystyle.\\the\\count255}%
          {P\\the\\primeindex}}}
          \\fi
          \\opcopy{q}{NbtoDecompose}%
          \\advance\\count255 by1
          \\setbox1=\\vtop{%
          \\hbox{\\box1}
          \\hbox{%
          \\opdisplay{operandstyle.\\the\\count255}%
          {NbtoDecompose}}
          }%
          \\else
          \\advance\\primeindex by1
          \\fi
          \\repeat
          \\hbox{\\box1
          \\kern0.5\\opcolumnwidth
          \\opvline(0,0.75){\\the\\count255.25}
          \\kern0.5\\opcolumnwidth
          \\box2}%
          \\fi
          \\endgroup
          }
          
          % pour les corrections LG Ceci est commenté pour le préambule de mathalea car un environnement remarque existe déjà
          %\\newcommand{\\remarque}[1]{
          %\\begin{bclogo}[logo=\\bctrombone,couleur=gray!5,ombre,epBord=0.8]{Remarque:}%
          %    {#1}
          %\\end{bclogo}}
  
          %%%%% VÉRIFIER L'UTILITÉ %%%%%
          %\\renewcommand{\\theenumi}{\\textbf{\\arabic{enumi}}}
          %\\renewcommand{\\labelenumi}{\\textbf{\\theenumi.}}
          %\\renewcommand{\\theenumii}{\\textbf{\\alph{enumii}}}
          %\\renewcommand{\\labelenumii}{\\textbf{\\theenumii.}}
          
  
          
          %Tapuscrit : Denis Vergès
          
          `
        break
      default:
        result += `\\usepackage{${packages}}\n`
    }
  }
  return result
}
