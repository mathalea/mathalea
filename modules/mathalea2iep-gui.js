import { calcul_aligne, egal, superieur, inferieur, superieurouegal, inferieurouegal, estentier, quotientier, carreParfait, ecrireNombre2D, decimal, randint, choice, range, rangeMinMax, range1, numTrie, shuffle, signe, arrondi, troncature, abs, pgcd, calcul, creerNomDePolygone, choisit_nombres_entre_m_et_n, lettre_depuis_chiffre, lettre_minuscule_depuis_chiffre, texcolors, tex_nombre, telechargeFichier } from "/modules/outils.js"
import { scratchblock, tableau_de_variation, nomVecteurParPosition, point, tracePoint, tracePointSurDroite, milieu, pointSurSegment, pointSurCercle, pointSurDroite, pointIntersectionDD, pointAdistance, labelPoint, barycentre, droite, droiteParPointEtVecteur, droiteParPointEtParallele, droiteParPointEtPerpendiculaire, droiteHorizontaleParPoint, droiteVerticaleParPoint, droiteParPointEtPente, mediatrice, codageMediatrice, codageMilieu, constructionMediatrice, bissectrice, codageBissectrice, constructionBissectrice, polyline, pave, vecteur, segment, segmentAvecExtremites, demiDroite, demiDroiteAvecExtremite, polygone, polygoneAvecNom, polygoneRegulier, polygoneRegulierIndirect, carre, carreIndirect, codageCarre, polygoneRegulierParCentreEtRayon, triangle2points2longueurs, triangle2points2angles, triangle2points1angle1longueur, triangle2points1angle1longueurOppose, nommePolygone, deplaceLabel, aireTriangle, cercle, ellipse, pointIntersectionLC, pointIntersectionCC, cercleCentrePoint, arc, arcPointPointAngle, traceCompas, courbeDeBezier, segmentMainLevee, cercleMainLevee, droiteMainLevee, polygoneMainLevee, arcMainLevee, dansLaCibleCarree, dansLaCibleRonde, cibleCarree, cibleRonde, cibleCouronne, translation, translation2Points, rotation, sens_de_rotation, homothetie, symetrieAxiale, distancePointDroite, projectionOrtho, affiniteOrtho, similitude, translationAnimee, rotationAnimee, homothetieAnimee, symetrieAnimee, affiniteOrthoAnimee, montrerParDiv, cacherParDiv, afficherTempo, afficherTempoId, afficherUnParUn, medianeTriangle, centreGraviteTriangle, hauteurTriangle, CodageHauteurTriangle, codageHauteurTriangle, codageMedianeTriangle, orthoCentre, centreCercleCirconscrit, codageAngleDroit, afficheLongueurSegment, texteSurSegment, afficheMesureAngle, afficheCoteSegment, codeSegment, codeSegments, codeAngle, nomAngleSaillantParPosition, nomAngleRentrantParPosition, droiteGraduee, droiteGraduee2, axes, labelX, labelY, grille, grilleHorizontale, grilleVerticale, seyes, repere, repere2, pointDansRepere, traceGraphiqueCartesien, traceBarre, traceBarreHorizontale, lectureImage, lectureAntecedent, courbe, courbe2, courbeInterpolee, graphiqueInterpole, imageInterpolee, antecedentInterpole, crochetD, crochetG, intervalle, texteParPoint, texteParPosition, latexParPoint, latexParCoordonnees, fractionParPosition, print2d, longueur, norme, angle, angleOriente, angleradian, creerLutin, avance, baisseCrayon, leveCrayon, orienter, tournerG, tournerD, allerA, mettrexA, mettreyA, ajouterAx, ajouterAy, afficherCrayon, codeSvg, codeTikz, mathalea2d, labyrinthe, pavage } from "/modules/2d.js"
import { cube, cube3d, sens_de_rotation3d, point3d, vecteur3d, arete3d, droite3d, demicercle3d, cercle3d, polygone3d, sphere3d, cone3d, cylindre3d, prisme3d, pave3d, rotationV3d, rotation3d, translation3d } from "/modules/3d.js"
import { fraction, listeFractions } from "/modules/Fractions.js"
import Alea2iep from "/modules/Alea2iep.js"

//Liste utilisée quand il n'y a qu'une seule construction sur la page web

mathalea.lutin = creerLutin();

let numId = 0 // Créer un identifiant numérique unique par objet SVG

window.addEventListener('load', function()  {
	$('.ui.dropdown').dropdown(); //Pour les menus
	let divEditeur = document.getElementById("editeur");
	let divSvg = document.getElementById("svg");
	let divSortieSvg = document.getElementById("sortieSvg");
	let divSortieTikz = document.getElementById("sortieTikz");
	let divXmlIep = document.getElementById("xmlSrc");
	let buttonSubmit = document.getElementById("submit");
	let buttonTelecharger;
	let buttonURL;

	if (document.getElementById("telecharger")) {
		buttonTelecharger = document.getElementById("telecharger");
		buttonTelecharger.onclick = function () {
			telechargeFichier(myCodeMirror.getValue(), "mathalea2d.iep")
			//download(myCodeMirror.getValue(), "mathalea2d.iep", "text/plain; charset=utf-8");
		};
	}
	if (document.getElementById("url")) {
		buttonURL = document.getElementById("url");
		buttonURL.onclick = function () {
			let script = encodeURIComponent(myCodeMirror.getValue());
			window.open(`/iep.html?script=${script}`);
		};
	}

	let myCodeMirror = CodeMirror(divEditeur, {
		value: ``,
		mode: "javascript",
		lineNumbers: true,
		autofocus: true,
		theme: "monokai",
		autoCloseBrackets: true,
		showHint: true,
		extraKeys: { "Ctrl-Space": "autocomplete" },
		matchBrackets: true,
		lineWrapping: true,
	});

	cmResize(myCodeMirror)

	let myCodeMirrorSvg = CodeMirror(divSortieSvg, {
		value: "",
		mode: "htmlmixed",
		readOnly: true,
		lineNumbers: true,
	});
	let myCodeMirrorTikz = CodeMirror(divSortieTikz, {
		value: "",
		mode: "stex",
		readOnly: true,
		lineNumbers: true,
	});
	
	myCodeMirror.setSize(document.getElementById('editeur').offsetWidth*0.9,600)

	let url = new URL(window.location.href);
	if (url.searchParams.get("url")) { // Si on spécifie une url
		fetch(`/fichiers/iep/${url.searchParams.get("url")}.iep`)
			.then(function (response) {
				if (response.ok) {
					return response.text();
				} else {
					return `//Fichier /fichiers/iep/${url.searchParams.get("url")}.iep non trouvé`;
				}
			})
			.then((text) => myCodeMirror.setValue(text));
	} else if (url.searchParams.get("script")) { // Si un script est présent dans l'URL
		myCodeMirror.setValue(decodeURIComponent(url.searchParams.get("script")));
	} else { //Récupère le dernier script validé
		if (localStorage.getItem("Script Mathalea 2D IEP")) {
			myCodeMirror.setValue(localStorage.getItem("Script Mathalea 2D IEP"));
		}
	}

	//Autocomplétion
	myCodeMirror.on("inputRead", function onChange(editor, input) {
		if (input.text[0] === ";" || input.text[0] === " ") {
			return;
		}
		CodeMirror.commands.autocomplete(editor, null, { completeSingle: false });
	});

	buttonSubmit.onclick = function () {
		numId = 0;
		localStorage.setItem("Script Mathalea 2D IEP", myCodeMirror.getValue()); // On sauvegarde dans le navigateur le code du script
		if (buttonTelecharger) {
			buttonTelecharger.style.visibility = "visible";
		}
		if (buttonURL) {
			buttonURL.style.visibility = "visible";
		}
		executeCode(
			`mathalea.objets2D = [] ; mathalea.lutin = creerLutin() ; window.IEP = new Alea2iep() ; window.anim = window.IEP ; ${myCodeMirror.getValue()}`
		);
		divXmlIep.value = window.IEP.script();
		document.getElementById('previewBtn').click()

		let mesObjetsCopie = mathalea.objets2D.slice(); // codeSVG va ajouter des objets supplémentaires donc on en garde une copie
		let codeSvgcomplet = codeSvg(mathalea.fenetreMathalea2d, mathalea.pixelsParCm, mathalea.mainlevee, mathalea.objets2D);
		divSvg.innerHTML = codeSvgcomplet;
		myCodeMirrorSvg.setValue(codeSvgcomplet);
		mathalea.objets2D = mesObjetsCopie.slice(); // on réinitialise mesObjets à l'état où il était avant que codeSvg n'ajoute des objets
		myCodeMirrorTikz.setValue(codeTikz(mathalea.fenetreMathalea2d, mathalea.scale, mathalea.mainlevee, mathalea.objets2D));

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

		/*
			%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
			%%%%%%%%%%%% DRAG & DEPLACE %%%%%%%%%%%%%
			%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	
			@SOURCE https://css-tricks.com/creating-a-panning-effect-for-svg/
	
			*/

		// We select the SVG into the page
		let svg = document.querySelector("svg");

		// If browser supports pointer events
		if (window.PointerEvent) {
			svg.addEventListener("pointerdown", onPointerDown); // Pointer is pressed
			svg.addEventListener("pointerup", onPointerUp); // Releasing the pointer
			svg.addEventListener("pointerleave", onPointerUp); // Pointer gets out of the SVG area
			svg.addEventListener("pointermove", onPointerMove); // Pointer is moving
		} else {
			// Add all mouse events listeners fallback
			svg.addEventListener("mousedown", onPointerDown); // Pressing the mouse
			svg.addEventListener("mouseup", onPointerUp); // Releasing the mouse
			svg.addEventListener("mouseleave", onPointerUp); // Mouse gets out of the SVG area
			svg.addEventListener("mousemove", onPointerMove); // Mouse is moving

			// Add all touch events listeners fallback
			svg.addEventListener("touchstart", onPointerDown); // Finger is touching the screen
			svg.addEventListener("touchend", onPointerUp); // Finger is no longer touching the screen
			svg.addEventListener("touchmove", onPointerMove); // Finger is moving
		}

		// This function returns an object with X & Y values from the pointer event
		function getPointFromEvent(event) {
			let point = { x: 0, y: 0 };
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
			y: 0,
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
		let fenetrexmin = mathalea.fenetreMathalea2d[0]
		let fenetreymin = mathalea.fenetreMathalea2d[1]
		let fenetrexmax = mathalea.fenetreMathalea2d[2]
		let fenetreymax = mathalea.fenetreMathalea2d[3]
		let viewBox = {
			x: fenetrexmin * mathalea.pixelsParCm,
			y: fenetreymin * mathalea.pixelsParCm,
			width: (fenetrexmax - fenetrexmin) * mathalea.pixelsParCm,
			height: (fenetreymax - fenetreymin) * mathalea.pixelsParCm,
		};

		// The distances calculated from the pointer will be stored here
		let newViewBox = {
			x: 0,
			y: 0,
		};

		// Calculate the ratio based on the viewBox width and the SVG width
		let ratio = viewBox.width / svg.getBoundingClientRect().width;
		window.addEventListener("resize", function () {
			ratio = viewBox.width / svg.getBoundingClientRect().width;
		});

		// Function called by the event listeners when user start moving/dragging
		function onPointerMove(event) {
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
			newViewBox.x = viewBox.x - (pointerPosition.x - pointerOrigin.x) * ratio;
			newViewBox.y = viewBox.y - (pointerPosition.y - pointerOrigin.y) * ratio;

			// We create a string with the new viewBox values
			// The X & Y values are equal to the current viewBox minus the calculated distances
			let viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
			// We apply the new viewBox values onto the SVG
			svg.setAttribute("viewBox", viewBoxString);
			myCodeMirrorSvg.setValue(divSvg.innerHTML);
			let xmin = calcul(newViewBox.x / mathalea.pixelsParCm, 1);
			let xmax = calcul(xmin + viewBox.width / mathalea.pixelsParCm, 1);
			let ymax = calcul(newViewBox.y / mathalea.pixelsParCm * (-1), 1);
			let ymin = calcul(ymax - viewBox.height / mathalea.pixelsParCm, 1)
			if (myCodeMirror.getValue().indexOf('mathalea.fenetreMathalea2d') > -1) {
				myCodeMirror.setValue(myCodeMirror.getValue().replace(/mathalea.fenetreMathalea2d.*/, `mathalea.fenetreMathalea2d = [${xmin},${ymin},${xmax},${ymax}]`))
			} else {
				myCodeMirror.setValue(`mathalea.fenetreMathalea2d = [${xmin},${ymin},${xmax},${ymax}]\n` + myCodeMirror.getValue())
			}
			myCodeMirrorTikz.setValue(myCodeMirrorTikz.getValue().replace(/\\clip.*/, `\\clip (${xmin},${ymin}) rectangle (${xmax},${ymax});`))


			//document.querySelector('.viewbox').innerHTML = viewBoxString;
		}

		function onPointerUp() {
			// The pointer is no longer considered as down
			isPointerDown = false;

			// We save the viewBox coordinates based on the last pointer offsets
			viewBox.x = newViewBox.x;
			viewBox.y = newViewBox.y;
		}
	};

	document.getElementById('submit').click()


})

function executeCode(txt) {
	return eval(txt);
}


// Instrumenpoche

function displayError(error) {
	console.error(error)
	// var pre = document.createElement('pre')
	// var txt = document.createTextNode(error.toString())
	// pre.appendChild(txt);
	// document.getElementById('errors').appendChild(pre)
	// window.scrollTo(0)
}

function display(event) {
	try {
		event.preventDefault()
		event.stopPropagation()
		let divXmlIep = document.getElementById("xmlSrc");
		iepLoad("display", divXmlIep.value)
	} catch (error) {
		console.log("Plantage à l'affichage, xml probablement malformé")
		console.error(error)
	}
}

function dropHandler(event) {
	event.stopPropagation();
	event.preventDefault();
	try {
		var files = event.dataTransfer.files; // FileList object.
		if (files && files[0]) {
			var file = files[0]
			console.log("On récupère le fichier ", file.name)
			if (file.name.substr(-4) === '.xml') {
				var reader = new FileReader();
				reader.onload = function (event) {
					document.getElementById("xmlSrc").value = event.target.result
					display(event)
				};
				reader.readAsText(file);
			} else {
				displayError("On ne gère que les fichiers xml");
			}
		}
	} catch (error) {
		console.log("Plantage à la récupération du fichier")
		console.log(error)
	}
}

function dragOverHandler(event) {
	event.stopPropagation();
	event.preventDefault();
	// faut préciser ça explicitement
	event.dataTransfer.dropEffect = 'copy';
}

// et on ajoute les listener
var previewBtn = document.getElementById('previewBtn')
previewBtn.addEventListener('click', display, false)
var textarea = document.getElementById('xmlSrc')
textarea.addEventListener('dragover', dragOverHandler, false);
textarea.addEventListener('drop', dropHandler, false);


