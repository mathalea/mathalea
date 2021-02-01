import {randint,arrondi,calcul,tex_nombrec,tex_nombre,nombre_avec_espace,katex_Popup2} from "/modules/outils.js"


/**
 * Chosis aléatoirement une expressions numérique parmi de nombreuses variantes.
 * @param {number} nb_operations fixe la complexité de l'expression à retourner
 * @param {number} decimal 1 si on veut des entiers, 10, 100, 1000 selon le nombre de chiffres après la virgule qu'on veut
 * retourne
 * * l'expression en français commençant par une majuscule sans point final
 * * l'expression en mode maths LaTex
 * * Le détaillé du calcul en mode maths LaTex
 * @Auteur Jean-Claude Lhote
 * Fonction utilisée dans plusieurs exercices.
 */
export default function Choisir_expression_numerique(nb_operations, decimal, times_on = true) {
	let expf, expn, expc, arrondir = Math.log10(decimal);
	let a = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir);
	let b = arrondi(randint(2 * decimal, 10 * decimal, [a * decimal]) / decimal, arrondir);
	let c = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir);
	let d = arrondi(randint(2 * decimal, 10 * decimal, [c * decimal]) / decimal, arrondir);
	let e = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir);
	let souscas;
	let signex = ``;
	if (times_on)
		signex = `\\times`;
	switch (nb_operations) {
		case 1: // expressions de base (1 opération)
			souscas = randint(0, 3);
			switch (souscas) {
				case 0: //somme de deux nombres
					expf = `La somme de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)}`;
					expn = `$${tex_nombre(a)}+${tex_nombre(b)}$`;
					expc = `$${tex_nombre(a)}+${tex_nombre(b)} = ${tex_nombre(a + b)}$`;
					break;
				case 1: // différence de deux nombres
					if (a < b)
						a = a + b;
					expf = `La différence de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)}`;
					expn = `$${tex_nombre(a)}-${tex_nombre(b)}$`;
					expc = `$${tex_nombre(a)}-${tex_nombre(b)} = ${tex_nombre(a - b)}$`;
					break;
				case 2: // produit de deux nombres
					expf = `Le produit de ${nombre_avec_espace(a)} par ${nombre_avec_espace(b)}`;
					expn = `$${tex_nombre(a)}\\times ${tex_nombre(b)}$`;
					expc = `$${tex_nombre(a)}\\times ${tex_nombre(b)} = ${tex_nombrec(a * b)}$`;
					break;
				case 3: // quotient de deux nombres
					a = calcul(Math.round(a) * b);
					expf = `Le quotient de ${nombre_avec_espace(a)} par ${nombre_avec_espace(b)}`;
					expn = `$${tex_nombre(a)}\\div ${tex_nombre(b)}$`;
					expc = `$${tex_nombre(a)}\\div ${tex_nombre(b)} = ${tex_nombrec(a)}$`;
					break;
			}
			break;
		case 2: // expressions de niveau 1 (2 opérations)
			souscas = randint(0, 5);
			switch (souscas) {
				case 0: //a(b+c)
					expf = `Le produit de ${nombre_avec_espace(a)} par la somme de ${nombre_avec_espace(b)} et ${nombre_avec_espace(c)}`;
					expn = `$${tex_nombre(a)}${signex}(${tex_nombre(b)}+${tex_nombre(c)})$`;
					expc = `$${tex_nombre(a)}${signex}(${tex_nombre(b)}+${tex_nombre(c)}) = ${tex_nombre(a)}\\times ${tex_nombrec(b + c)}=${tex_nombrec(a * (b + c))}$`;
					break;
				case 1: // a(b-c)
					if (b <= c)
						b = calcul(b + c); // b-c positif
					expf = `Le produit de ${nombre_avec_espace(a)} par la différence de ${nombre_avec_espace(b)} et ${nombre_avec_espace(c)}`;
					expn = `$${tex_nombre(a)}${signex}(${tex_nombre(b)}-${tex_nombre(c)})$`;
					expc = `$${tex_nombre(a)}${signex}(${tex_nombre(b)}-${tex_nombre(c)}) = ${tex_nombre(a)}\\times ${tex_nombrec(b - c)}=${tex_nombrec(a * (b - c))}$`;
					break;
				case 2: // a/(b+c)
					a = calcul(a * (b + c)); // on s'assure que le quotient tombe juste...
					expf = `Le quotient de ${nombre_avec_espace(a)} par la somme de ${nombre_avec_espace(b)} et ${nombre_avec_espace(c)}`;
					expn = `$${tex_nombre(a)}\\div (${tex_nombre(b)}+${tex_nombre(c)})$ ou $\\dfrac{${tex_nombre(a)}}{${tex_nombre(b)}+${tex_nombre(c)}}$`;
					expc = `$${tex_nombre(a)}\\div (${tex_nombre(b)}+${tex_nombre(c)}) = ${tex_nombre(a)}\\div ${tex_nombrec(b + c)}=${tex_nombrec(a / (b + c))}$`;
					break;
				case 3: // a/(b-c)
					if (b <= c)
						b = calcul(b + c); // b-c positif
					a = calcul(a * (b - c)); // on s'assure que le quotient tombe juste
					expf = `Le quotient de ${nombre_avec_espace(a)} par la différence de ${nombre_avec_espace(b)} et ${nombre_avec_espace(c)}`;
					expn = `$${tex_nombre(a)}\\div (${b}-${tex_nombre(c)})$ ou $\\dfrac{${tex_nombre(a)}}{${tex_nombre(b)}-${tex_nombre(c)}}$`;
					expc = `$${tex_nombre(a)}\\div (${b}-${tex_nombre(c)}) = ${tex_nombre(a)}\\div ${tex_nombrec(b - c)}=${tex_nombrec(a / (b - c))}$`;
					break;
				case 4: // (a+b)/c
					a = calcul(a * c);
					b = calcul(b * c); // on s'assure que le quotient tombe juste
					expf = `Le quotient de la somme de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par ${nombre_avec_espace(c)}`;
					expn = `$(${tex_nombre(a)}+${tex_nombre(b)})\\div ${tex_nombre(c)}$ ou $\\dfrac{${tex_nombre(a)}+${tex_nombre(b)}}{${tex_nombre(c)}}$`;
					expc = `$(${tex_nombre(a)}+${tex_nombre(b)})\\div ${tex_nombre(c)} = ${tex_nombrec(a + b)}\\div ${tex_nombre(c)}=${tex_nombrec((a + b) / c)}$`;
					break;
				case 5: // (a-b)/c
					if (a <= b)
						a = calcul(a + b); // a-b positif
					a = calcul(a * c);
					b = calcul(b * c); // on s'assure que le quotient tombe juste
					expf = `Le quotient de la différence de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par ${nombre_avec_espace(c)}`;
					expn = `$(${tex_nombre(a)}-${tex_nombre(b)})\\div ${tex_nombre(c)}$ ou $\\dfrac{${tex_nombre(a)}-${tex_nombre(b)}}{${tex_nombre(c)}}$`;
					expc = `$(${tex_nombre(a)}-${tex_nombre(b)})\\div ${tex_nombre(c)} = ${tex_nombrec(a - b)}\\div ${tex_nombre(c)}=${tex_nombrec((a - b) / c)}$`;
					break;

			}
			break;
		case 3: // expressions de niveau 2 (3 opérations)
			souscas = randint(0, 13);
			switch (souscas) {
				case 0: // (a+b)(c+d)
					expf = `Le produit de la somme de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par la somme de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)}`;
					expn = `$(${tex_nombre(a)}+${tex_nombre(b)})${signex}(${tex_nombre(c)}+${tex_nombre(d)})$`;
					expc = `$(${tex_nombre(a)}+${tex_nombre(b)})${signex}(${tex_nombre(c)}+${tex_nombre(d)}) = ${tex_nombrec(a + b)}\\times ${tex_nombrec(c + d)} = ${tex_nombrec((a + b) * (c + d))}$`;
					break;
				case 1: // (a+b)(c-d)
					if (c <= d)
						c = calcul(c + d);
					expf = `Le produit de la somme de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par la différence de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)}`;
					expn = `$(${tex_nombre(a)}+${tex_nombre(b)})${signex}(${tex_nombre(c)}-${tex_nombre(d)})$`;
					expc = `$(${tex_nombre(a)}+${tex_nombre(b)})${signex}(${tex_nombre(c)}-${tex_nombre(d)}) = ${tex_nombrec(a + b)}\\times ${tex_nombrec(c - d)} = ${tex_nombrec((a + b) * (c - d))}$`;
					break;
				case 2: // (a-b)(c+d)
					if (a <= b)
						a = calcul(a + b);
					expf = `Le produit de la différence de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par la somme de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)}`;
					expn = `$(${tex_nombre(a)}-${tex_nombre(b)})${signex}(${tex_nombre(c)}+${tex_nombre(d)})$`;
					expc = `$(${tex_nombre(a)}-${tex_nombre(b)})${signex}(${tex_nombre(c)}+${tex_nombre(d)}) = ${tex_nombrec(a - b)}\\times ${tex_nombrec(c + d)} = ${tex_nombrec((a - b) * (c + d))}$`;
					break;
				case 3: // (a-b)(c-d)
					if (a <= b)
						a = calcul(a + b);
					if (c <= d)
						c = calcul(c + d);
					expf = `Le produit de la différence de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par la différence de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)}`;
					expn = `$(${tex_nombre(a)}-${tex_nombre(b)})${signex}(${tex_nombre(c)}-${tex_nombre(d)})$`;
					expc = `$(${tex_nombre(a)}-${tex_nombre(b)})${signex}(${tex_nombre(c)}-${tex_nombre(d)}) = ${tex_nombrec(a - b)}\\times ${tex_nombrec(c - d)} = ${tex_nombrec((a - b) * (c - d))}$`;
					break;
				case 4: // (a+b)/(c+d)
					a = calcul(a * (c + d));
					b = calcul(b * (c + d));
					expf = `Le quotient de la somme de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par la somme de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)}`;
					expn = `$(${tex_nombre(a)}+${tex_nombre(b)})\\div (${tex_nombre(c)}+${tex_nombre(d)})$ ou $\\dfrac{${tex_nombre(a)}+${tex_nombre(b)}}{${tex_nombre(c)}+${tex_nombre(d)}}$`;
					expc = `$(${tex_nombre(a)}+${tex_nombre(b)})\\div (${tex_nombre(c)}+${tex_nombre(d)}) = ${tex_nombrec(a + b)}\\div ${tex_nombrec(c + d)} = ${tex_nombrec((a + b) / (c + d))}$`;
					break;
				case 5: // (a-b)/(c+d)
					a = calcul(a * (c + d));
					b = calcul(b * (c + d));
					if (a <= b)
						a = calcul(a + b);
					expf = `Le quotient de la différence de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par la somme de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)}`;
					expn = `$(${tex_nombre(a)}-${tex_nombre(b)})\\div (${tex_nombre(c)}+${tex_nombre(d)})$ ou $\\dfrac{${tex_nombre(a)}-${tex_nombre(b)}}{${tex_nombre(c)}+${tex_nombre(d)}}$`;
					expc = `$(${tex_nombre(a)}-${tex_nombre(b)})\\div (${tex_nombre(c)}+${tex_nombre(d)}) = ${tex_nombrec(a - b)}\\div ${tex_nombrec(c + d)} = ${tex_nombrec((a - b) / (c + d))}$`;
					break;
				case 6: // (a+b)/(c-d)
					if (c <= d)
						c = calcul(c + d);
					a = calcul(a * (c - d));
					b = calcul(b * (c - d));
					expf = `Le quotient de la somme de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par la différence de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)}`;
					expn = `$(${tex_nombre(a)}+${tex_nombre(b)})\\div (${tex_nombre(c)}-${tex_nombre(d)})$ ou $\\dfrac{${tex_nombre(a)}+${tex_nombre(b)}}{${tex_nombre(c)}-${tex_nombre(d)}}$`;
					expc = `$(${tex_nombre(a)}+${tex_nombre(b)})\\div (${tex_nombre(c)}-${tex_nombre(d)}) = ${tex_nombrec(a + b)}\\div ${tex_nombrec(c - d)} = ${tex_nombrec((a + b) / (c - d))}$`;
					break;
				case 7: // (a-b)/(c-d)
					if (c <= d)
						c = calcul(c + d);
					if (a <= b)
						a = calcul(a + b);
					a = calcul(a * (c - d));
					b = calcul(b * (c - d));
					expf = `Le quotient de la différence de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par la différence de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)}`;
					expn = `$(${tex_nombre(a)}-${tex_nombre(b)})\\div (${tex_nombre(c)}-${tex_nombre(d)})$ ou $\\dfrac{${tex_nombre(a)}-${tex_nombre(b)}}{${tex_nombre(c)}-${tex_nombre(d)}}$`;
					expc = `$(${tex_nombre(a)}-${tex_nombre(b)})\\div (${tex_nombre(c)}-${tex_nombre(d)}) = ${tex_nombrec(a - b)}\\div ${tex_nombrec(c - d)} = ${tex_nombrec((a - b) / (c - d))}$`;
					break;
				case 8: // ab+cd
					expf = `La somme du produit de ${nombre_avec_espace(a)} par ${nombre_avec_espace(b)} et du produit de ${nombre_avec_espace(c)} par ${nombre_avec_espace(d)}`;
					expn = `$${tex_nombre(a)}\\times ${tex_nombre(b)}+${tex_nombre(c)}\\times ${tex_nombre(d)}$`;
					expc = `$${tex_nombre(a)}\\times ${tex_nombre(b)}+${tex_nombre(c)}\\times ${tex_nombre(d)} = ${tex_nombrec(a * b)}+${tex_nombrec(c * d)} = ${tex_nombrec(a * b + c * d)}$`;
					break;
				case 9: // ab-cd
					if (a * b < d * c)
						a = calcul(a + c);
					if (a * b < d * c)
						b = calcul(b + d);
					expf = `La différence du produit de ${nombre_avec_espace(a)} par ${nombre_avec_espace(b)} et du produit de ${nombre_avec_espace(c)} par ${nombre_avec_espace(d)}`;
					expn = `$${tex_nombre(a)}\\times ${tex_nombre(b)}-${tex_nombre(c)}\\times ${tex_nombre(d)}$`;
					expc = `$${tex_nombre(a)}\\times ${tex_nombre(b)}-${tex_nombre(c)}\\times ${tex_nombre(d)} = ${tex_nombrec(a * b)}-${tex_nombrec(c * d)} = ${tex_nombrec(a * b - c * d)}$`;
					break;
				case 10: // ab+c/d
					c = calcul(c * d);
					expf = `La somme du produit de ${nombre_avec_espace(a)} par ${nombre_avec_espace(b)} et du quotient de ${nombre_avec_espace(c)} par ${nombre_avec_espace(d)}`;
					expn = `$${tex_nombre(a)}\\times ${tex_nombre(b)}+${tex_nombre(c)}\\div ${tex_nombre(d)}$ ou $${tex_nombre(a)}\\times ${tex_nombre(b)}+\\dfrac{${tex_nombre(c)}}{${tex_nombre(d)}}$`;
					expc = `$${tex_nombre(a)}\\times ${tex_nombre(b)}+${tex_nombre(c)}\\div ${tex_nombre(d)} = ${tex_nombrec(a * b)}+${tex_nombrec(c / d)} = ${tex_nombrec(a * b + c / d)}$`;
					break;
				case 11: // ab-c/d
					c = c * d;
					if (a * b < c / d)
						a = calcul(a * c);
					if (a * b < c / d)
						b = calcul(b * c);
					expf = `La différence du produit de ${nombre_avec_espace(a)} par ${nombre_avec_espace(b)} et du quotient de ${nombre_avec_espace(c)} par ${nombre_avec_espace(d)}`;
					expn = `$${tex_nombre(a)}\\times ${tex_nombre(b)}-${tex_nombre(c)}\\div ${tex_nombre(d)}$ ou $${tex_nombre(a)}\\times ${tex_nombre(b)}-\\dfrac{${tex_nombre(c)}}{${tex_nombre(d)}}$`;
					expc = `$${tex_nombre(a)}\\times ${tex_nombre(b)}-${tex_nombre(c)}\\div ${tex_nombre(d)} = ${tex_nombrec(a * b)}-${tex_nombrec(c / d)} = ${tex_nombrec(a * b - c / d)}$`;
					break;
				case 12: // a/b+c/d
					a = calcul(a * b);
					c = calcul(c * d);
					expf = `La somme du quotient de ${nombre_avec_espace(a)} par ${nombre_avec_espace(b)} et du quotient de ${nombre_avec_espace(c)} par ${nombre_avec_espace(d)}`;
					expn = `$${tex_nombre(a)}\\div ${tex_nombre(b)}+${tex_nombre(c)}\\div ${tex_nombre(d)}$ ou $\\dfrac{${tex_nombre(a)}}{${tex_nombre(b)}}+\\dfrac{${tex_nombre(c)}}{${tex_nombre(d)}}$`;
					expc = `$${tex_nombre(a)}\\div ${tex_nombre(b)}+${tex_nombre(c)}\\div ${tex_nombre(d)} = ${tex_nombrec(a / b)}+${tex_nombrec(c / d)} = ${tex_nombrec(a / b + c / d)}$`;
					break;
				case 13: // a/b-c/d		
					a = calcul(a * b);
					c = calcul(c * d);
					if (a / b < c / d)
						a = calcul(a * c);
					if (a / c < c / d)
						a = calcul(a * d);
					expf = `La différence du quotient de ${nombre_avec_espace(a)} par ${nombre_avec_espace(b)} et du quotient de ${nombre_avec_espace(c)} par ${nombre_avec_espace(d)}`;
					expn = `$${tex_nombre(a)}\\div ${tex_nombre(b)}-${tex_nombre(c)}\\div ${tex_nombre(d)}$ ou $\\dfrac{${tex_nombre(a)}}{${tex_nombre(b)}}-\\dfrac{${tex_nombre(c)}}{${tex_nombre(d)}}$`;
					expc = `$${tex_nombre(a)}\\div ${tex_nombre(b)}-${tex_nombre(c)}\\div ${tex_nombre(d)} = ${tex_nombrec(a / b)}-${tex_nombrec(c / d)} = ${tex_nombrec(a / b - c / d)}$`;
					break;
			}
			break;
		case 5: // expressions complexes
			souscas = randint(0, 5);
			switch (souscas) {
				case 0: // 2(a+bc)
					expf = `Le double de la somme de ${nombre_avec_espace(a)} et du produit de ${nombre_avec_espace(b)} par ${nombre_avec_espace(c)}`;
					expn = `$2${signex}(${tex_nombre(a)}+${tex_nombre(b)}\\times ${tex_nombre(c)})$`;
					expc = `$2${signex}(${tex_nombre(a)}+${tex_nombre(b)}\\times ${tex_nombre(c)}) = 2${signex}(${tex_nombre(a)}+${tex_nombrec(b * c)}) = 2\\times  ${tex_nombrec(a + b * c)}$`;
					break;
				case 1: // 3(a+b)/c
					a = calcul(a * c);
					b = calcul(b * c);
					expf = `Le triple du quotient de la somme de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par ${nombre_avec_espace(c)}`;
					expn = `$3${signex}(${tex_nombre(a)}+${tex_nombre(b)})\\div ${tex_nombre(c)}$ ou $3\\times \\dfrac{${tex_nombre(a)}+${tex_nombre(b)}}{${tex_nombre(c)}}$`;
					expc = `$3${signex}(${tex_nombre(a)}+${tex_nombre(b)})\\div ${tex_nombre(c)} = 3\\times  ${tex_nombre(a + b)}\\div ${tex_nombre(c)} = ${tex_nombrec(3 * (a + b))}\\div ${tex_nombre(c)} = ${tex_nombrec(3 * (a + b) / c)}$`;
					break;
				case 2: // (a-b)/3
					if (a <= b)
						a = calcul(a + b);
					a = calcul(3 * a);
					b = calcul(3 * b);
					expf = `Le tiers de la différence de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)}`;
					expn = `$(${tex_nombre(a)}-${tex_nombre(b)})\\div  3$ ou $\\dfrac{${tex_nombre(a)}-${tex_nombre(b)}}{3}$`;
					expc = `$(${tex_nombre(a)}-${tex_nombre(b)})\\div  3 = ${tex_nombrec(a - b)}\\div  3 = ${tex_nombrec((a - b) / 3)}$`;
					break;
				case 3: // (a-b)/3*2(c+d)
					if (a <= b)
						a = calcul(a + b);
					a = calcul(3 * a);
					b = calcul(3 * b);
					expf = `Le produit du tiers de la différence de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par le double de la somme de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)}`;
					expn = `$\\left((${tex_nombre(a)}-${tex_nombre(b)})\\div  3\\right)\\times  2${signex}(${tex_nombre(c)}+${tex_nombre(d)})$`;
					expc = `$\\left((${tex_nombre(a)}-${tex_nombre(b)})\\div  3\\right)\\times  2${signex}(${tex_nombre(c)}+${tex_nombre(d)}) = ${tex_nombrec(a - b)}\\div  3 \\times  2 \\times ${tex_nombrec(c + d)} = ${tex_nombrec((a - b) / 3)} \\times  2 \\times  ${tex_nombrec(c + d)} =  ${tex_nombrec(2 * (a - b) / 3)} \\times  ${tex_nombrec(c + d)} = ${tex_nombrec(2 * (c + d) * (a - b) / 3)}$`;
					break;
				case 4: // 3(a+b)-2(c+d)
					if (3 * (a + b) < 2 * (c + d))
						a = calcul(a + c + d);
					expf = `La différence du triple de la somme de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} et du double de la somme de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)}`;
					expn = `$3${signex}(${tex_nombre(a)}+${tex_nombre(b)})-2${signex}(${tex_nombre(c)}+${tex_nombre(d)})$`;
					expc = `$3${signex}(${tex_nombre(a)}+${tex_nombre(b)})-2${signex}(${tex_nombre(c)}+${tex_nombre(d)}) = 3 \\times  ${tex_nombrec(a + b)} - 2 \\times  ${tex_nombrec(c + d)} = ${tex_nombrec(3 * (a + b))} - ${tex_nombrec(2 * (c + d))} = ${tex_nombrec(3 * (a + b) - 2 * (c + d))}$`;
					break;
				case 5: // 2(a-b)+3(c+d)
					if (a <= b)
						a = calcul(a + b);
					expf = `La somme du double de la différence de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} et du triple de la somme de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)}`;
					expn = `$2${signex}(${tex_nombre(a)}-${tex_nombre(b)})+3${signex}(${tex_nombre(c)}+${tex_nombre(d)})$`;
					expc = `$2${signex}(${tex_nombre(a)}-${tex_nombre(b)})+3${signex}(${tex_nombre(c)}+${tex_nombre(d)}) = 2 \\times  ${tex_nombrec(a - b)} + 3 \\times  ${tex_nombrec(c + d)} = ${tex_nombrec(2 * (a - b))} + ${tex_nombrec(3 * (c + d))} = ${tex_nombrec(2 * (a - b) + 3 * (c + d))}$`;
					break;
			}
			break;
		case 4: // 4 opérations
			souscas = randint(1, 3);
			switch (souscas) {
				case 1: // (a+b)/(c(d+e))
					a = calcul(a * c * (d + e));
					b = calcul(b * c * (d + e));
					expf = `Le quotient de la somme de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par le produit de ${nombre_avec_espace(c)} par la somme de ${nombre_avec_espace(d)} et ${nombre_avec_espace(e)}`;
					expn = `$(${tex_nombre(a)}+${tex_nombre(b)})\\div (${tex_nombre(c)}${signex}(${tex_nombre(d)}+${tex_nombre(e)}))$ ou $\\dfrac{${tex_nombre(a)}+${tex_nombre(b)}}{${tex_nombre(c)}${signex}(${tex_nombre(d)}+${tex_nombre(e)})}$`;
					expc = `$(${tex_nombre(a)}+${tex_nombre(b)})\\div (${tex_nombre(c)}${signex}(${tex_nombre(d)}+${tex_nombre(e)})) = ${tex_nombrec(a + b)} \\div  (${tex_nombre(c)} \\times  ${tex_nombrec(d + e)}) = ${tex_nombrec(a + b)} \\div  ${tex_nombre(c * (d + e))} = ${tex_nombrec((a + b) / (c * (d + e)))}$`;
					break;
				case 2: //(a-b)*(c+de)
					if (a <= b)
						a = calcul(a + b);
					expf = `Le produit de la différence de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par la somme de ${nombre_avec_espace(c)} et du produit de ${nombre_avec_espace(d)} par ${nombre_avec_espace(e)}`;
					expn = `$(${tex_nombre(a)}-${tex_nombre(b)})${signex}(${tex_nombre(c)}+${tex_nombre(d)}\\times ${tex_nombre(e)})$`;
					expc = `$(${tex_nombre(a)}-${tex_nombre(b)})${signex}(${tex_nombre(c)}+${tex_nombre(d)}\\times ${tex_nombre(e)}) = ${tex_nombrec(a - b)}${signex}(${tex_nombre(c)}+${tex_nombrec(d * e)}) = ${tex_nombrec(a - b)} \\times  ${tex_nombre(c + d * e)} = ${tex_nombrec((a - b) * (c + d * e))}$`;
					break;
				case 3: // ab+cd/e
					c = calcul(c * e);
					expf = `La somme du produit de ${nombre_avec_espace(a)} par ${nombre_avec_espace(b)} et du quotient du produit de ${nombre_avec_espace(c)} et ${nombre_avec_espace(d)} par ${nombre_avec_espace(e)}`;
					expn = `$${tex_nombre(a)}\\times ${tex_nombre(b)}+${tex_nombre(c)}\\times ${tex_nombre(d)}\\div ${tex_nombre(e)}$ ou $${tex_nombre(a)}\\times ${tex_nombre(b)}+\\dfrac{${tex_nombre(c)}\\times ${tex_nombre(d)}}{${tex_nombre(e)}}$`;
					expc = `$${tex_nombre(a)}\\times ${tex_nombre(b)}+${tex_nombre(c)}\\times ${tex_nombre(d)}\\div ${tex_nombre(e)} = ${tex_nombrec(a * b)} + ${tex_nombrec(c * d)} \\div  ${tex_nombre(e)} = ${tex_nombrec(a * b)} + ${tex_nombrec(c * d / e)} = ${tex_nombrec(a * b + c * d / e)}$`;
					break;
			}
			break;
	}
	return [expf, expn, expc, souscas];
}
