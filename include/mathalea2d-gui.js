window.onload = function()  {
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
	});
	let myCodeMirrorSvg = CodeMirror(divSortieSvg, {
	  value: '',
	  mode:  "svg",
	  lineNumbers: true,
	});
	let myCodeMirrorTikz = CodeMirror(divSortieTikz, {
	  value: '',
	  mode:  "latex",
	  lineNumbers: true,
	});


	buttonSubmit.onclick = function() {
		executeCode(`mesObjets=[];${myCodeMirror.getValue()}`);
		divSvg.innerHTML = codeSvg(mesObjets);
		myCodeMirrorSvg.setValue(codeSvg(mesObjets));
		myCodeMirrorTikz.setValue(codeTikz(mesObjets));
	 };


}

function executeCode(txt){
    return Function(txt)();
}