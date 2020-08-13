window.onload = function()  {
	$('.ui.dropdown') .dropdown(); //Pour les menus
	let divEditeur = document.getElementById("editeur");
	let divSvg = document.getElementById("svg");
	let divSortieSvg = document.getElementById("sortieSvg");
	let divSortieTikz = document.getElementById("sortieTikz");
	let buttonSubmit = document.getElementById("submit");
	let buttonTelecharger

	if (document.getElementById("telecharger")) {
		buttonTelecharger = document.getElementById("telecharger")
		buttonTelecharger.onclick = function() {
			download(myCodeMirrorSvg.getValue(), 'mathalea2d.svg', 'text/plain');
		}
	}

	

	let myCodeMirror = CodeMirror(divEditeur, {
		value: `a=randint(0,6)
		A = point(a,0,'A','left')
		B = point(8,1,'B','right')
		C = rotation(B,A,90,'C','above')
		polygone(A,B,C)
		labelPoint(A,B,C)
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
		if (buttonTelecharger) {
			buttonTelecharger.style.visibility = 'visible'
		}
		executeCode(`mesObjets=[];${myCodeMirror.getValue()}`);
		let mesObjetsCopie = mesObjets.slice() // codeSVG va ajouter des objets supplémentaires donc on en garde une copie
		let codeSvgcomplet = codeSvg(mesObjets)
		divSvg.innerHTML = codeSvgcomplet;		
		myCodeMirrorSvg.setValue(codeSvgcomplet);
		mesObjets = mesObjetsCopie.slice() // on réinitialise mesObjets à l'état où il était avant que codeSvg n'ajoute des objets
		myCodeMirrorTikz.setValue(codeTikz(mesObjets));

		renderMathInElement(document.body, {
  				delimiters: [
  				{left: "\\[", right: "\\]", display: true},
  				{left: "$", right: "$", display: false}
  				],
  				"throwOnError":true,"errorColor":"#CC0000","strict":"warn","trust":false
  			});
	


		/*
		%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
		%%%%%%%%%%%% DRAG & DEPLACE %%%%%%%%%%%%%
		%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

		@SOURCE https://css-tricks.com/creating-a-panning-effect-for-svg/

		*/


		// We select the SVG into the page
		let svg = document.querySelector('svg');

		// If browser supports pointer events
		if (window.PointerEvent) {
		  svg.addEventListener('pointerdown', onPointerDown); // Pointer is pressed
		  svg.addEventListener('pointerup', onPointerUp); // Releasing the pointer
		  svg.addEventListener('pointerleave', onPointerUp); // Pointer gets out of the SVG area
		  svg.addEventListener('pointermove', onPointerMove); // Pointer is moving
		} else {
		  // Add all mouse events listeners fallback
		  svg.addEventListener('mousedown', onPointerDown); // Pressing the mouse
		  svg.addEventListener('mouseup', onPointerUp); // Releasing the mouse
		  svg.addEventListener('mouseleave', onPointerUp); // Mouse gets out of the SVG area
		  svg.addEventListener('mousemove', onPointerMove); // Mouse is moving

		  // Add all touch events listeners fallback
		  svg.addEventListener('touchstart', onPointerDown); // Finger is touching the screen
		  svg.addEventListener('touchend', onPointerUp); // Finger is no longer touching the screen
		  svg.addEventListener('touchmove', onPointerMove); // Finger is moving
		}

		// This function returns an object with X & Y values from the pointer event
		function getPointFromEvent (event) {
		  let point = {x:0, y:0};
		  // If even is triggered by a touch event, we get the position of the first finger
		  if (event.targetTouches) {
		    point.x = event.targetTouches[0].clientX;
		    point.y = event.targetTouches[0].clientY;
		  } else {
		    point.x = event.clientX;
		    point.y = event.clientY;
		  }
		  
		  return point;
		}

		// This letiable will be used later for move events to check if pointer is down or not
		let isPointerDown = false;

		// This letiable will contain the original coordinates when the user start pressing the mouse or touching the screen
		let pointerOrigin = {
		  x: 0,
		  y: 0
		};

		// Function called by the event listeners when user start pressing/touching
		function onPointerDown(event) {
		  isPointerDown = true; // We set the pointer as down
		  
		  // We get the pointer position on click/touchdown so we can get the value once the user starts to drag
		  let pointerPosition = getPointFromEvent(event);
		  pointerOrigin.x = pointerPosition.x;
		  pointerOrigin.y = pointerPosition.y;
		}

		// We save the original values from the viewBox
		let viewBox = {
		  x: -20,
		  y: -200,
		  width: 600,
		  height: 400
		};

		// The distances calculated from the pointer will be stored here
		let newViewBox = {
		  x: 0,
		  y: 0
		};

		// Calculate the ratio based on the viewBox width and the SVG width
		let ratio = viewBox.width / svg.getBoundingClientRect().width;
		window.addEventListener('resize', function() {
		  ratio = viewBox.width / svg.getBoundingClientRect().width;
		});

		// Function called by the event listeners when user start moving/dragging
		function onPointerMove (event) {
		  // Only run this function if the pointer is down
		  if (!isPointerDown) {
		    return;
		  }
		  // This prevent user to do a selection on the page
		  event.preventDefault();

		  // Get the pointer position
		  let pointerPosition = getPointFromEvent(event);

		  // We calculate the distance between the pointer origin and the current position
		  // The viewBox x & y values must be calculated from the original values and the distances
		  newViewBox.x = viewBox.x - ((pointerPosition.x - pointerOrigin.x) * ratio);
		  newViewBox.y = viewBox.y - ((pointerPosition.y - pointerOrigin.y) * ratio);

		  // We create a string with the new viewBox values
		  // The X & Y values are equal to the current viewBox minus the calculated distances
		  let viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
		  // We apply the new viewBox values onto the SVG
		  svg.setAttribute('viewBox', viewBoxString);
		  
		  //document.querySelector('.viewbox').innerHTML = viewBoxString;
		}

		function onPointerUp() {
		  // The pointer is no longer considered as down
		  isPointerDown = false;

		  // We save the viewBox coordinates based on the last pointer offsets
		  viewBox.x = newViewBox.x;
		  viewBox.y = newViewBox.y;
		  myCodeMirrorSvg.setValue(divSvg.innerHTML)
		}






	};









}

function executeCode(txt){
	return Function(txt)();
}




	