/*
  Alacarte
 @name      alacarte.js
 @author    Rémi Angot
 @version   0.1
 @date      2019-12-13
 @copyright (c) 2009
 @license   MIT License
 @homepage  https://copmaths.fr
 @example   http://coopmaths.fr/alacarte
*/

var tableau_url_tex = [['items/MATHS.6G14_ProgrammeConstruction', 'MATHS.6.G14_.tex', 'MATHS.6.G14_-cor.tex'], ['items/MATHS.6G11_Perpendiculaire', 'MATHS.6.G11_.tex', 'MATHS.6.G11_-cor.tex'], ['items/MATHS.6N22_CalculsFractions', 'MATHS.6.N22_.tex', 'MATHS.6.N22_-cor.tex'], ['items/MATHS.6G10_VocabulaireNotations', 'MATHS.6.G10_.tex', 'MATHS.6.G10_-cor.tex'], ['items/MATHS.CM3', 'MATHS.CM3_.tex', 'MATHS.CM3_-cor.tex'], ['items/MATHS.6R10_ProprietesParallelesPerpendiculaires', 'MATHS.6.R10_.tex', 'MATHS.6.R10_-cor.tex'], ['items/MATHS.6N23_NombresDecimaux', 'MATHS.6.N23_.tex', 'MATHS.6.N23_-cor.tex'], ['items/MATHS.6C11_DivisionsEuclidiennes', 'MATHS.6.C11_v1.tex', 'MATHS.6.C11_v1-cor.tex'], ['items/MATHS.6N21_AbscissesFractionnaires', 'MATHS.6.N21_.tex', 'MATHS.6.N21_-cor.tex'], ['items/MATHS.CM2', 'MATHS.CM2_.tex', 'MATHS.CM2_-cor.tex'], ['items/MATHS.6G13_CarresRectangles', 'MATHS.6.G13_.tex', 'MATHS.6.G13_-cor.tex'], ['items/MATHS.6C12_ProblemesNiveau1', 'MATHS.6.C12_v1.tex', 'MATHS.6.C12_v1-cor.tex'], ['items/MATHS.6G12_Paralleles', 'MATHS.6.G12_.tex', 'MATHS.6.G12_-cor.tex'], ['items/MATHS.6R11_SchemaProprietesParallelesPerpendiculaires', 'MATHS.6.R11_v1.tex', 'MATHS.6.R11_v1-cor.tex'], ['items/MATHS.6N20_FractionsEtEntiers', 'MATHS.6.N20_v1.tex', 'MATHS.6.N20_v1-cor.tex'], ['items/MATHS.6C10_AddSousMulEntiers', 'MATHS.6.C10_v1.tex', 'MATHS.6.C10_v1-cor.tex'], ['items/MATHS.CM1', 'MATHS.CM1_.tex', 'MATHS.CM1_-cor.tex']]
var tableau_de_demandes = [];
var code_LaTeX = ""
var besoin_des_axes_gradues=false;

function selection_exercices_aleatoires(text) {
	// remplace un id par plusieurs id si un item peut être évalué par plusieurs exercices aléatoires
	let liste_des_exercices_a_echanger = {
		'CM' : 'CM001 CM002',
		'6N10' : '6N10-1 6N10-2'
		// 'C10' : 'CM001 CM002 CM003'
		}
	$.each(liste_des_exercices_a_echanger,function(id){
		if (text.includes(id)) {
			text=text.replace(id,liste_des_exercices_a_echanger[id])
		}
	});
	return text
}

function textarea_to_array(textarea_id_textarea) {
	let text = textarea_id_textarea.value.replace(/[ ]{2,}/g, ' ');
	// remplace les espaces multiples par un espace simple
	//text = text.replace(/[ ]\n/,'');
	// efface le dernier espace d'une ligne
	text = selection_exercices_aleatoires(text)

	let tableau = text.split("\n");
	tableau.forEach(function(ligne,i){
		tableau[i]=ligne.split(" ");
		// Regarde s'il y a besoin de modifier le préambule
		if (tableau[i].includes('6N21')) {besoin_des_axes_gradues=true}
	});
	return tableau
}

function id_to_url(id){
	// Retourne les éléments du tableau qui inclue l'id demandé
	let tableau_items = tableau_url_tex.filter(element => element[0].includes(id))
	if (tableau_items.length==0) {
		alert(`Pas d'exercices disponibles pour ${id}.`)
	}
	// Choisit un fichier tex au hasard dans les répertoires 
	let item = tableau_items[Math.floor(Math.random()*tableau_items.length)]
	return [item[0]+'/'+item[1],item[0]+'/'+item[2]]
}

function item_to_contenu(e){
	// De préférence un exercice aléatoire
	if (e in liste_des_exercices_disponibles) {
			exercice_aleatoire = new liste_des_exercices_disponibles[e];
			exercice_aleatoire.nouvelle_version()
			code_LaTeX += `\n\n%%%Exercice aléatoire : ${exercice_aleatoire.titre}%%%\n\n`
			code_LaTeX += exercice_aleatoire.contenu + '\n\n'
			code_LaTeX_corr += exercice_aleatoire.contenu_correction + '\n\n'
	// Sinon un exercice statique si le nom de l'item est inclus dans le nom du répertoire
	} else { if (e.length>2) {
		$.get("../"+id_to_url(e)[0], function( txt ) {
				code_LaTeX += `\n\n%%%Exercice statique : ${id_to_url(e)[0]}%%%\n\n`
				code_LaTeX += txt + '\n\n'
				});
			$.get("../"+id_to_url(e)[1], function( txt ) {
				code_LaTeX_corr += txt + '\n\n'
				});
		}
			
	}
		
}




window.onload = function()  {

	jQuery.ajaxSetup({async:false}); // la commande MAGIQUE ^^
	$('.ui.radio.checkbox').checkbox(); // active les boutons radio (pour le style)
	// Gestion du menu déroulant par une fonction auto-exécutante
	let attendre=0;
	(function menu_deroulant () {
		const el = document.getElementsByClassName('menu_exercices_construit');
		// Vérifie que ce div inutile a bien été créé
		if (el.length && attendre>1) {
			// S'il est présent on règle le menu
	    	$('.ui.dropdown').dropdown({ // gestion du clic sur le menu déroulant pour ajouter un item dans le textarea
	    action: function(text, value, element){$('#textarea_id_items').val($('#textarea_id_items').val()+text.split(' ')[0]+' ')}
	  });  //active les menus déroulants
		} else {
    		setTimeout(menu_deroulant, 300); // retente dans 300 milliseconds
    		attendre+=1
		}
	})();


	$('.ui.radio.checkbox').checkbox(); // active les boutons radio (pour le style)
	

	$('#reglages_sortie_LaTeX').hide();

	$( "#valider").click(function() {
		$('#div_code_LaTeX').html(" ")
		code_LaTeX = ""
		code_LaTeX_corr = ""
		tableau_de_demandes = textarea_to_array(textarea_id_items)
		tableau_de_demandes.forEach(function(ligne){
			ligne.forEach(function(e,i){
				let rang_premier_item=0
				if ($('#style1:checked').val()){
					rang_premier_item = 2
					if (i==0){
						code_LaTeX +=entete_eleve(ligne[0],ligne[1])
						code_LaTeX_corr +=entete_eleve(ligne[0],ligne[1])

					}
				}
				if ($('#style2:checked').val()){
					rang_premier_item = 1
					if (i==0){
						code_LaTeX +=entete_eleve(ligne[0])
						code_LaTeX_corr +=entete_eleve(ligne[0])
					}
				}
				if ($('#style3:checked').val()){
					rang_premier_item = 0
					if (i==0){
						code_LaTeX +=entete_eleve()
						code_LaTeX_corr +=entete_eleve()
					}
				}

				if (i>=rang_premier_item) {
					item_to_contenu(e);
				}
					
			});
				
		});
		// Affiche les boutons de compilation
		if (code_LaTeX.length>2) {
			$('#reglages_sortie_LaTeX').show();	
		}
		//Affiche le code LaTeX
		$('#div_code_LaTeX').html('<pre><code class="language-latex">' + code_LaTeX + intro_correction +
			code_LaTeX_corr + '</code></pre>');
		var div = document.getElementById('div_code_LaTeX');
		Prism.highlightAllUnder(div); // Met à jour la coloration syntaxique
	});




	// Gestion du téléchargement

	$( "#btn_telechargement").click(function() {
		creer_fichier()

		if ($("#nom_du_fichier").val()) {
			download(contenu_fichier, $("#nom_du_fichier").val()+'.tex', "text/plain");	
		}else
		{
			download(contenu_fichier, 'mathalea.tex', "text/plain");
		}
		
	});



	$( "#btn_overleaf").click(function() {
		creer_fichier();
		// Envoi à Overleaf.com en modifiant la valeur dans le formulaire

		$('input[name=encoded_snip]').val(encodeURIComponent(contenu_fichier));
		if ($("#nom_du_fichier").val()) {
			$('input[name=snip_name]').val($("#nom_du_fichier").val());	//nomme le projet sur Overleaf
		}
			
		});

	// Gestion des paramètres du fichier LaTeX

	$('#options_style_CoopMaths').hide(); 	// par défaut le style est classique donc on 
	$('a.lien_images').hide();				// cache les options du style Coop
	$(function(){
		$("input:radio[name='style']").change(function(){
			if ($('#style_classique:checked').val()){
				$('#options_style_CoopMaths').hide();
				$('a.lien_preambule').attr('href','fichiers/preambule.tex')
				$('a.lien_images').hide();
			} else{
				$('a.lien_images').show();
				$('#options_style_CoopMaths').show()
				$('a.lien_preambule').attr('href','fichiers/preambule_coop.tex')
			}
		});
	});

};

function creer_fichier() {
	// Gestion du style pour l'entête du fichier
		if ($('#style_classique:checked').val()){
			contenu_fichier = intro_LaTeX($("#entete_du_fichier").val(),axes_gradues=besoin_des_axes_gradues) + code_LaTeX + intro_correction +
			code_LaTeX_corr + '\n\n\\end{document}'
		} else
		{
			contenu_fichier = intro_LaTeX_coop()
			contenu_fichier +='\n\n\\theme{' + $('input[name=theme]:checked').val() + '}{' + $("#entete_droit_du_fichier").val() + '}'
			contenu_fichier += '{' + $("#items").val() + '}{' + $("#domaine").val() + '}\n\\begin{document}\n\n' + code_LaTeX
			contenu_fichier += '\n\n\\end{document}'
		}
}



// Gestion des en-têtes

function entete_eleve(prenom="",nom="",style="defaut"){
	return `\n\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n
\\newpage

\\setcounter{section}{0}
\\setcounter{exo}{0}
\\fancyhead[L]{${prenom} ${nom}}
\\bigskip
`

}





// Gestion des styles LaTeX

function intro_LaTeX(entete="Exercices",axes_gradues=false) {
	if (entete=='') {entete='Exercices'}
	return `\\documentclass[12pt]{article}
\\usepackage[left=1.5cm,right=1.5cm,top=2cm,bottom=2cm]{geometry}
\\usepackage[utf8]{inputenc}		        
\\usepackage[T1]{fontenc}		
\\usepackage[french]{babel}
\\usepackage{multicol} 					
\\usepackage{calc} 						
\\usepackage{enumerate}
\\usepackage{enumitem}
\\usepackage{graphicx}				
\\usepackage{tabularx}
\\usepackage[autolanguage]{numprint}
\\usepackage{pgf,tikz}
\\usepackage{tkz-tab,tkz-euclide,tkz-fct}
\\usetkzobj{all}
\\usepackage{pifont}	
\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
\\usepackage{cancel}
\\usepackage{eurosym}
\\DeclareUnicodeCharacter{20AC}{\\euro{}}
\\usepackage{fancyhdr,lastpage}          	
 \\pagestyle{fancy}                      	
\\usepackage{fancybox}					
\\usepackage{xlop}						
\\usepackage{setspace}	

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
\\fancyhead[R]{${$("#entete_droit_du_fichier").val()}}
\\fancyfoot{}
\\fancyfoot[R]{\\scriptsize Coopmaths.fr -- CC-BY-SA}
\\setlength{\\headheight}{15pt}

${premabule_axe_graduee(axes_gradues)}


\\begin{document}`
}

function intro_LaTeX_coop(){

	let intro_LaTeX_coop = `
\\documentclass[12pt]{article}
\\usepackage[left=1.5cm,right=1.5cm,top=3.5cm,bottom=2cm]{geometry}
\\usepackage[utf8]{inputenc}		        
\\usepackage[T1]{fontenc}		
\\usepackage[french]{babel}
\\usepackage{multicol} 					
\\usepackage{calc} 						
\\usepackage{enumerate}
\\usepackage{enumitem}
\\usepackage{graphicx}				
\\usepackage{tabularx}
\\usepackage[autolanguage]{numprint}
\\usepackage{pgf,tikz}
\\usepackage{tkz-tab,tkz-euclide,tkz-fct}
\\usetkzobj{all}
\\usepackage{pifont}	
\\usetikzlibrary{calc}
\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
\\usepackage{cancel}
\\usepackage{eurosym}
\\DeclareUnicodeCharacter{20AC}{\\euro{}}
\\usepackage{fancyhdr,lastpage}          	
 \\pagestyle{fancy}                      	
\\usepackage{fancybox}					
\\usepackage{xlop}						
\\usepackage{setspace}

%%% COULEURS %%%

\\definecolor{nombres}{cmyk}{0,.8,.95,0}
\\definecolor{gestion}{cmyk}{.75,1,.11,.12}
\\definecolor{gestionbis}{cmyk}{.75,1,.11,.12}
\\definecolor{grandeurs}{cmyk}{.02,.44,1,0}
\\definecolor{geo}{cmyk}{.62,.1,0,0}
\\definecolor{algo}{cmyk}{.69,.02,.36,0}
\\definecolor{correction}{cmyk}{.63,.23,.93,.06}
\\usepackage{colortbl}
\\arrayrulecolor{couleur_theme}		% Couleur des filets des tableaux

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


\\newmdenv[startcode={\\setlength{\\multicolsep}{0cm}\\setlength{\\columnsep}{.2cm}\\setlength{\\columnseprule}{0pt}\\vspace{0cm}},linecolor=white, linewidth=3pt,innerbottommargin=10pt,innertopmargin=5pt,innerrightmargin=20pt,splittopskip=20pt,splitbottomskip=10pt,everyline=true,tikzsetting={draw=couleur_theme,line width=4pt,dashed,dash pattern= on 10pt off 10pt},frametitleaboveskip=-.6cm,frametitle={\\tikz\\node[anchor= east,rectangle,fill=white]{\\textcolor{couleur_theme}{\\raisebox{-.3\\height}{\\includegraphics[width=.8cm]{\\iconeobjectif}}\\; \\bfseries \\Large Objectifs}};}]{objectif}

\\newmdenv[startcode={\\colorlet{couleur_numerotation}{correction}\\renewcommand{\\columnseprulecolor}{\\color{correction}}
\\setcounter{section}{0}\\arrayrulecolor{correction}},linecolor=white, linewidth=4pt,innerbottommargin=10pt,innertopmargin=5pt,splittopskip=20pt,splitbottomskip=10pt,everyline=true,frametitle=correction,tikzsetting={draw=correction,line width=3pt,dashed,dash pattern= on 15pt off 10pt},frametitleaboveskip=-.4cm,frametitle={\\tikz\\node[anchor= east,rectangle,fill=white]{\\; \\textcolor{correction}{\\raisebox{-.3\\height}{\\includegraphics[width=.6cm]{icone-correction}}\\; \\bfseries \\Large Corrections}};}]{correction}

\\newmdenv[roundcorner=0,linewidth=0pt,frametitlerule=false, backgroundcolor=gray!40,leftmargin=8cm]{remarque}



\\newcommand{\\theme}[4]
{
	\\fancyhead[L]{}
	\\fancyhead[R]{}
	\\fancyhead[C]{
	\\begin{tikzpicture}[remember picture,overlay]
	  \\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(0,-.8cm)$) {\\includegraphics{header-#1}};
	  \\node[anchor=east, fill=white] at ($(current page.north east)+(-2,-1.4cm)$) {\\Huge \\textcolor{couleur_theme}{\\bfseries \\#} \\bfseries #2 \\textcolor{couleur_theme}{\\bfseries \\MakeUppercase{#3}}};
	  \\node[anchor=center, color=white] at ($(current page.north)+(0,-2.65cm)$) {\\Large \\bfseries \\MakeUppercase{#4}};
	\\end{tikzpicture}
	}
	\\fancyfoot[C]{
	\\begin{tikzpicture}[remember picture,overlay]
	  \\node[anchor=south west,inner sep=0pt] at ($(current page.south west)+(0,0)$) {\\includegraphics{footer-#1}};
	\\end{tikzpicture} 
	}
	\\colorlet{couleur_theme}{#1}
	\\colorlet{couleur_numerotation}{couleur_theme}
	\\def\\iconeobjectif{icone-objectif-#1}
	\\def\\urliconeomethode{icone-methode-#1}
	\\renewcommand{\\headrulewidth}{0pt} % Pour enlever les traits en en-tête et en pied de page
	\\renewcommand{\\footrulewidth}{0pt}
}

\\newcommand{\\version}[1]{
	\\fancyhead[R]{
	\\begin{tikzpicture}[remember picture,overlay]
		\\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(-.5,-.5cm)$) {\\large \\textcolor{couleur_theme}{\\bfseries V#1}};
	\\end{tikzpicture}
	}
}


%%%%%%%%%%%%%%%%%%%%%%%%
%%% Fin du préambule %%%
%%%%%%%%%%%%%%%%%%%%%%%%
`
	return intro_LaTeX_coop

}


var intro_correction = '\n%%%%%%%%%%%%%%%%\n%%%CORRECTION%%%\n%%%%%%%%%%%%%%%%' +
			'\n\n\\newpage\n\\fancyhead[C]{Correction}\n\\setcounter{exo}{0}\n\n'



function premabule_axe_graduee(boolean) {
	if (boolean) {
		return `
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
	{% un nombre est Ã  placer sur l'axe avec son label
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
	% derniÃ¨re graduation Ã  la mano 
	\\draw (\\Xmax,-.1) -- (\\Xmax,.1) node[below=.3] {\\Xmax};

\\end{tikzpicture}
}



\\newcommand{\\axesZoom}[5]{
{} \\hfill 
\\begin{tikzpicture}
	\\def\\XA{#1} % nombre (positif pour l'instant) Ã  placer (avec deux dÃ©cimales)
	\\def\\Nom{#2} % nom du point Ã  placer. Laisser vide si vous ne souhaitez pas voir le point
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

	} else {
		return ''
	}
}

