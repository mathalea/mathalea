window.onload = function()  {
	$('.ui.dropdown') .dropdown(); //Pour les menus
	let divEditeur = document.getElementById("editeur");
	let divSvg = document.getElementById("svg");
	let divSortieSvg = document.getElementById("sortieSvg");
	let divSortieTikz = document.getElementById("sortieTikz");
	let buttonSubmit = document.getElementById("submit");

	let myCodeMirror = CodeMirror(divEditeur, {
		value: `a=randint(0,6)
		A = point(a,0,'A','left')
		B = point(8,1,'B','right')
		C = pointParRotation(B,A,90,'C','above')
		polygone(A,B,C)
		labelPoints(A,B,C)
		codageAngleDroit(B,A,C)`,
		mode:  "javascript",
		lineNumbers: true,
		autofocus: true,
		theme: 'monokai',
		autoCloseBrackets: true,
		showHint: true,
		extraKeys: {"Ctrl-Space": "autocomplete"},
		matchBrackets: true,
		lineWrapping: true,
	});
	let myCodeMirrorSvg = CodeMirror(divSortieSvg, {
		value: '',
		mode:  "htmlmixed",
		readOnly : true,
		lineNumbers: true,
	});
	let myCodeMirrorTikz = CodeMirror(divSortieTikz, {
		value: '',
		mode:  "stex",
		readOnly : true,
		lineNumbers: true,
	});

	//Récupère le dernier script validé
	if(localStorage.getItem('Script Mathalea 2D')) {
		myCodeMirror.setValue(localStorage.getItem('Script Mathalea 2D'));
	}
	let parametresURL = window.location.href.split('?')[1];
	if(parametresURL){ // Si dans l'URL il y a quelque-chose après le ?
		fetch(`/m2d/${parametresURL}.m2d`)
	.then( function(response) {
		if (response.ok) {
			return response.text()	
		} else {
			return `//Fichier /m2d/${parametresURL}.m2d non trouvé`
		}
	})
	.then(text => myCodeMirror.setValue(text))
}


	//Autocomplétion
	myCodeMirror.on('inputRead', function onChange(editor, input) {
		if (input.text[0] === ';' || input.text[0] === ' ') { return; }
		CodeMirror.commands.autocomplete(editor, null, {completeSingle: false});
	});

	buttonSubmit.onclick = function() {
		localStorage.setItem('Script Mathalea 2D',myCodeMirror.getValue()) // On sauvegarde dans le navigateur le code du script
		executeCode(`mesObjets=[];${myCodeMirror.getValue()}`);
		let mesObjetsCopie = mesObjets.slice() // codeSVG va ajouter des objets supplémentaires donc on en garde une copie
		let codeSvgcomplet = codeSvg(mesObjets)
		divSvg.innerHTML = codeSvgcomplet;		
		myCodeMirrorSvg.setValue(codeSvgcomplet);
		mesObjets = mesObjetsCopie.slice() // on érinitialise mesObjets à l'état où il était avant que codeSvg n'ajoute des objets
		myCodeMirrorTikz.setValue(codeTikz(mesObjets));
	};


}

function executeCode(txt){
	return Function(txt)();
}