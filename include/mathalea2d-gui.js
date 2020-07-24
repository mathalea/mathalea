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

	//Autocomplétion
	myCodeMirror.on('inputRead', function onChange(editor, input) {
		if (input.text[0] === ';' || input.text[0] === ' ') { return; }
		CodeMirror.commands.autocomplete(editor, null, {completeSingle: false});
	});

	buttonSubmit.onclick = function() {
		executeCode(`mesObjets=[];${myCodeMirror.getValue()}`);
		divSvg.innerHTML = codeSvg(mesObjets);
		myCodeMirrorSvg.setValue(codeSvg(mesObjets));
		myCodeMirrorTikz.setValue(codeTikz(mesObjets));
		localStorage.setItem('Script Mathalea 2D',myCodeMirror.getValue())
	 };


}

function executeCode(txt){
    return Function(txt)();
}