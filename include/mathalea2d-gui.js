window.onload = function()  {
	let divEditeur = document.getElementById("editeur");
	let divSvg = document.getElementById("svg");
	let buttonSubmit = document.getElementById("submit");


	var myCodeMirror = CodeMirror(divEditeur, {
	  value: `a=randint(0,6)
A = point(a,0,'A','left')
B = point(5,6,'B','above')
C = point(10,0,'C','right')
polygone(A,B,C)
labelPoints(A,B,C)
	  `,
	  mode:  "javascript",
	  lineNumbers: true,
	  autofocus: true,
	});


	buttonSubmit.onclick = function() {
		executeCode(`mesObjets=[];${myCodeMirror.getValue()}`);
		divSvg.innerHTML = codeSvg(mesObjets);
		// divSvg.innerHTML = executeCode(myCodeMirror.getValue());
	 };

	

}

function executeCode(txt){
    return Function(txt)();
}