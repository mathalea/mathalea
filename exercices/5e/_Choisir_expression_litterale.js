import {estentier,randint,arrondi,simplification_de_fraction_avec_etapes,calcul,tex_nombrec,tex_nombre,nombre_avec_espace,tex_fraction,katex_Popup2} from "/modules/outils.js"
/**
 * Fork de la fonction de JC avec ajout de la dernière opération dans le tableau de sortie
 * @param {number} nb_operations 
 * @param {number} decimal 
 * @param {number} val1 
 * @param {number} val2 
 * @returns [expf,expl,expc,nbval,last_op]
 * @author Jean Claude Lhote forked by Sébastien LOZANO
 * Référence 5C11,5C11-1, 5C11-2, 5L13, 5L13-1, 5L13-2, 5L13-3
 */
export default function Choisir_expression_litterale(nb_operations, decimal, val1 = 1, val2 = 2, times_on = true) {
	let expf, expl, expc, arrondir = Math.log10(decimal)
	let a = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir)
	let b = arrondi(randint(2 * decimal, 10 * decimal, [a * decimal]) / decimal, arrondir)
	let c = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir)
	let d = arrondi(randint(2 * decimal, 10 * decimal, [c * decimal]) / decimal, arrondir)
	let e = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir)
	let souscas
	let l1 = 'x'
	let l2 = 'y'
	let nbval
	let signex = ``
	let last_op
	if (times_on) signex = `\\times`
	switch (nb_operations) {
		case 1: // expressions de base (1 opération)
			nbval = 1
			souscas = randint(0, 3)
			switch (souscas) {
				case 0: //somme de deux nombres
					expf = `La somme de ${nombre_avec_espace(a)} et $${l1}$`
					expl = `$${tex_nombre(a)}+${l1}$`
					expc = `$${tex_nombre(a)}+${l1}=${tex_nombre(a)}+${tex_nombre(val1)}=${tex_nombre(a + val1)}$`
					last_op = 'addition';
					break
				case 1: // différence de deux nombres
					if (val1 > b) {
						expf = `La différence de $${l1}$ et ${nombre_avec_espace(b)}`
						expl = `$${l1}-${tex_nombre(b)}$`
						expc = `$${l1}-${tex_nombre(b)}=${tex_nombre(val1)}-${tex_nombre(b)}=${tex_nombre(val1 - b)}$`
					}
					else {
						expf = `La différence de ${nombre_avec_espace(b)} et $${l1}$`
						expl = `$${tex_nombre(b)}-${l1}$`
						expc = `$${tex_nombre(b)}-${l1}=${tex_nombre(b)}-${tex_nombre(val1)}=${tex_nombre(b - val1)}$`
					}
					last_op = 'soustraction';
					break
				case 2: // produit de deux nombres
					expf = `Le produit de $${l1}$ par ${nombre_avec_espace(b)}`
					expl = `$${l1}\\times ${tex_nombre(b)} = ${tex_nombrec(b)}${l1}$`
					expc = `$${tex_nombrec(b)}${l1} = ${tex_nombrec(b)}\\times ${val1}=${tex_nombre(b * val1)}$`
					last_op = 'multiplication';
					break
				case 3: // quotient de deux nombres

					expf = `Le quotient de $${l1}$ par ${nombre_avec_espace(b)}`
					expl = `$${l1}\\div ${tex_nombre(b)}$`
					if (estentier(val1 / b * 1000)) expc = `$${l1}\\div ${tex_nombre(b)} = ${val1}\\div ${tex_nombre(b)} = ${tex_nombrec(val1 / b)}$`
					else expc = `$${l1}\\div ${tex_nombre(b)} = ${val1}\\div ${tex_nombre(b)}=${tex_fraction(val1, tex_nombre(b))}${simplification_de_fraction_avec_etapes(val1, tex_nombre(b))}$`
					last_op = 'division';
					break
			}
			break
		case 2: // expressions de niveau 1 (2 opérations)
			souscas = randint(0, 5)
			nbval = 1
			switch (souscas) {
				case 0: //a(b+c)
					expf = `Le produit de ${nombre_avec_espace(a)} par la somme de ${nombre_avec_espace(b)} et $${l1}$`
					expl = `$${tex_nombre(a)}${signex}(${tex_nombre(b)}+${l1})$`
					expc = `$${tex_nombre(a)}${signex}(${tex_nombre(b)}+${l1})=${tex_nombre(a)}${signex}(${tex_nombre(b)}+${val1})=${tex_nombre(a)}\\times ${tex_nombre(b + val1)} = ${tex_nombre(a * (b + val1))}$`
					last_op = 'multiplication';
					break
				case 1: // a(b-c)
					if (b <= c) b = calcul(b + c) // b-c positif
					expf = `Le produit de $${l1}$ par la différence de ${b} et ${nombre_avec_espace(c)}`
					expl = `$${l1}${signex}(${tex_nombre(b)}-${tex_nombre(c)})=${l1}\\times ${tex_nombrec(b - c)}=${tex_nombrec(b - c)}${l1}$`
					expc = `$${l1}${signex}(${tex_nombre(b)}-${tex_nombre(c)}) = ${tex_nombre(val1)}${signex}(${tex_nombre(b)}-${tex_nombre(c)})=${tex_nombre(val1)}\\times ${tex_nombrec(b - c)}=${tex_nombrec(val1 * (b - c))}$`
					last_op = 'multiplication';
					break
				case 2: // a/(b+c)
					a = calcul(a * (val1 + c)) // on s'assure que le quotient tombe juste...
					expf = `Le quotient de ${nombre_avec_espace(a)} par la somme de $${l1}$ et ${nombre_avec_espace(c)}`
					expl = `$${tex_nombre(a)}\\div (${l1}+${tex_nombre(c)})$ ou $\\dfrac{${tex_nombre(a)}}{${l1}+${tex_nombre(c)}}$`
					expc = `$${tex_nombre(a)}\\div (${l1}+${tex_nombre(c)})=${tex_nombre(a)}\\div (${tex_nombre(val1)}+${tex_nombre(c)}) = ${tex_nombre(a)}\\div ${tex_nombrec(val1 + c)}=${tex_nombrec(a / (val1 + c))}$`
					last_op = 'division';
					break
				case 3: // a/(b-c)
					if (b <= val1) b = calcul(b + val1) // b-c positif
					a = calcul(a * (b - val1)) // on s'assure que le quotient tombe juste
					expf = `Le quotient de ${nombre_avec_espace(a)} par la différence de ${nombre_avec_espace(b)} et $${l1}$`
					expl = `$${tex_nombre(a)}\\div (${b}-${l1})$ ou $\\dfrac{${tex_nombre(a)}}{${tex_nombre(b)}-${l1}}$`
					expc = `$${tex_nombre(a)}\\div (${b}-${l1})=${tex_nombre(a)}\\div (${b}-${val1})=${tex_nombre(a)}\\div ${tex_nombrec(b - val1)}=${tex_nombrec(a / (b - val1))}$`
					last_op = 'division';
					break
				case 4: // (a+b)/c
					a = calcul(a * val1)
					b = calcul(b * val1) // on s'assure que le quotient tombe juste
					expf = `Le quotient de la somme de ${nombre_avec_espace(a)} et ${nombre_avec_espace(b)} par $${l1}$`
					expl = `$(${tex_nombre(a)}+${tex_nombre(b)})\\div  ${l1}$ ou $\\dfrac{${tex_nombre(a)}+${tex_nombre(b)}}{${l1}}$`
					expc = `$(${tex_nombre(a)}+${tex_nombre(b)})\\div  ${l1}=(${tex_nombre(a)}+${tex_nombre(b)})\\div ${val1}= ${tex_nombrec(a + b)}\\div ${val1}=${tex_nombrec((a + b) / val1)}$`
					last_op = 'division';
					break
				case 5: // (a-b)/c
					a = calcul(a * c) + val1 // on s'assure que le quotient tombe juste et que a-b>0
					expf = `Le quotient de la différence de ${nombre_avec_espace(a)} et $${l1}$ par ${nombre_avec_espace(c)}`
					expl = `$(${tex_nombre(a)}-${l1})\\div ${tex_nombre(c)}$ ou $\\dfrac{${tex_nombre(a)}-${l1}}{${tex_nombre(c)}}$`
					expc = `$(${tex_nombre(a)}-${l1})\\div ${tex_nombre(c)}=(${tex_nombre(a)}-${val1})\\div ${tex_nombre(c)}= ${tex_nombrec(a - val1)}\\div ${tex_nombre(c)}=${tex_nombrec((a - val1) / c)}$`
					last_op = 'division';
					break

			}
			break
		case 3: // expressions de niveau 2 (3 opérations)
			souscas = randint(0, 13)
			nbval = 2
			switch (souscas) {
				case 0: // (a+b)(c+d)
					a = val1
					d = val2
					expf = `Le produit de la somme de $${l1}$ et ${nombre_avec_espace(b)} par la somme de ${nombre_avec_espace(c)} et $${l2}$`
					expl = `$(${l1}+${tex_nombre(b)})${signex}(${tex_nombre(c)}+${l2})$`
					expc = `$(${l1}+${tex_nombre(b)})${signex}(${tex_nombre(c)}+${l2})=(${a}+${tex_nombre(b)})${signex}(${tex_nombre(c)}+${d})= ${tex_nombrec(a + b)}\\times ${tex_nombrec(c + d)} = ${tex_nombrec((a + b) * (c + d))}$`
					last_op = 'multiplication';
					break
				case 1: // (a+b)(c-d)
					d = val2
					b = val1
					if (c <= d) c = calcul(c + d)
					expf = `Le produit de la somme de ${nombre_avec_espace(a)} et $${l1}$ par la différence de ${nombre_avec_espace(c)} et $${l2}$`
					expl = `$(${tex_nombre(a)}+${l1})${signex}(${tex_nombre(c)}-${l2})$`
					expc = `$(${tex_nombre(a)}+${l1})${signex}(${tex_nombre(c)}-${l2})=(${tex_nombre(a)}+${b})${signex}(${tex_nombre(c)}-${d})= ${tex_nombrec(a + b)}\\times ${tex_nombrec(c - d)} = ${tex_nombrec((a + b) * (c - d))}$`
					last_op = 'multiplication';
					break
				case 2: // (a-b)(c+d)
					b = val2
					c = val1
					if (a <= b) a = calcul(a + b)
					expf = `Le produit de la différence de ${nombre_avec_espace(a)} et $${l2}$ par la somme de $${l1}$ et ${nombre_avec_espace(d)}`
					expl = `$(${tex_nombre(a)}-${l2})${signex}(${l1}+${tex_nombre(d)})$`
					expc = `$(${tex_nombre(a)}-${l2})${signex}(${l1}+${tex_nombre(d)})=(${tex_nombre(a)}-${b})${signex}(${c}+${tex_nombre(d)})=${tex_nombrec(a - b)}\\times ${tex_nombrec(c + d)} = ${tex_nombrec((a - b) * (c + d))}$`
					last_op = 'multiplication';
					break
				case 3: // (a-b)(c-d)
					b = val1
					d = val2
					if (a <= b) a = calcul(a + b)
					if (c <= d) c = calcul(c + d)
					expf = `Le produit de la différence de ${nombre_avec_espace(a)} et $${l1}$ par la différence de ${nombre_avec_espace(c)} et $${l2}$`
					expl = `$(${tex_nombre(a)}-${l1})${signex}(${tex_nombre(c)}-${l2})$`
					expc = `$(${tex_nombre(a)}-${l1})${signex}(${tex_nombre(c)}-${l2})=(${tex_nombre(a)}-${b})${signex}(${tex_nombre(c)}-${d})= ${tex_nombrec(a - b)}\\times ${tex_nombrec(c - d)} = ${tex_nombrec((a - b) * (c - d))}$`
					last_op = 'multiplication';
					break
				case 4: // (a+b)/(c+d)
					d = val2
					b = val1
					if (!estentier((a + b) / (c + d))) a = calcul(a * (c + d) - b)
					expf = `Le quotient de la somme de ${nombre_avec_espace(a)} et $${l1}$ par la somme de ${nombre_avec_espace(c)} et $${l2}$`
					expl = `$(${tex_nombre(a)}+${l1})\\div (${tex_nombre(c)}+${l2})$ ou $\\dfrac{${tex_nombre(a)}+${l1}}{${tex_nombre(c)}+${l2}}$`
					expc = `$(${tex_nombre(a)}+${l1})\\div (${tex_nombre(c)}+${l2})=(${tex_nombre(a)}+${tex_nombre(b)})\\div (${tex_nombre(c)}+${tex_nombre(d)}) = ${tex_nombrec(a + b)}\\div ${tex_nombrec(c + d)} = ${tex_nombrec((a + b) / (c + d))}$`
					last_op = 'division';
					break
				case 5: // (a-b)/(c+d)
					d = val1
					b = val2
					if (a - b <= 0 || !estentier((a - b) / (c + d))) a = calcul(a * (c + d) + b)
					expf = `Le quotient de la différence de ${nombre_avec_espace(a)} et $${l2}$ par la somme de ${nombre_avec_espace(c)} et $${l1}$`
					expl = `$(${tex_nombre(a)}-${l2})\\div (${tex_nombre(c)}+${l1})$ ou $\\dfrac{${tex_nombre(a)}-${l2}}{${tex_nombre(c)}+${l1}}$`
					expc = `$(${tex_nombre(a)}-${l2})\\div (${tex_nombre(c)}+${l1})=(${tex_nombre(a)}-${tex_nombre(b)})\\div (${tex_nombre(c)}+${tex_nombre(d)}) = ${tex_nombrec(a - b)}\\div ${tex_nombrec(c + d)} = ${tex_nombrec((a - b) / (c + d))}$`
					last_op = 'division';
					break
				case 6: // (a+b)/(c-d)
					b = val1
					d = val2
					if (c <= d) c = calcul(c + d)
					if (!estentier((a + b) / (c - d)))
						if (a * (c - d) > b) a = calcul(a * (c - d) - b)
						else a = calcul((a + b) * (c - d) - b)
					expf = `Le quotient de la somme de ${nombre_avec_espace(a)} et $${l1}$ par la différence de ${nombre_avec_espace(c)} et $${l2}$`
					expl = `$(${tex_nombre(a)}+${l1})\\div (${tex_nombre(c)}-${l2})$ ou $\\dfrac{${tex_nombre(a)}+${l1}}{${tex_nombre(c)}-${l2}}$`
					expc = `$(${tex_nombre(a)}+${l1})\\div (${tex_nombre(c)}-${l2})=(${tex_nombre(a)}+${tex_nombre(b)})\\div (${tex_nombre(c)}-${tex_nombre(d)}) = ${tex_nombrec(a + b)}\\div ${tex_nombrec(c - d)} = ${tex_nombrec((a + b) / (c - d))}$`
					last_op = 'division';
					break
				case 7: // (a-b)/(c-d)
					d = val2;
					b = val1;
					if (c <= d) c = calcul(c + d)
					if (a <= b) a = calcul(a + b)
					if (!estentier((a - b) / (c - d))) a = calcul(a * (c - d) + b)
					expf = `Le quotient de la différence de ${nombre_avec_espace(a)} et $${l1}$ par la différence de ${nombre_avec_espace(c)} et $${l2}$`
					expl = `$(${tex_nombre(a)}-${l1})\\div (${tex_nombre(c)}-${l2})$ ou $\\dfrac{${tex_nombre(a)}-${l1}}{${tex_nombre(c)}-${l2}}$`
					expc = `$(${tex_nombre(a)}-${l1})\\div (${tex_nombre(c)}-${l2})=(${tex_nombre(a)}-${tex_nombre(b)})\\div (${tex_nombre(c)}-${tex_nombre(d)}) = ${tex_nombrec(a - b)}\\div ${tex_nombrec(c - d)} = ${tex_nombrec((a - b) / (c - d))}$`
					last_op = 'division';
					break
				case 8: // ab+cd
					b = val1;
					d = val2;
					expf = `La somme du produit de ${nombre_avec_espace(a)} par $${l1}$ et du produit de ${nombre_avec_espace(c)} par $${l2}$`
					expl = `$${tex_nombre(a)}${l1}+${tex_nombre(c)}${l2}$`
					expc = `$${tex_nombre(a)}${l1}+${tex_nombre(c)}${l2}=${tex_nombre(a)}\\times ${tex_nombre(b)}+${tex_nombre(c)}\\times ${tex_nombre(d)} = ${tex_nombrec(a * b)}+${tex_nombrec(c * d)} = ${tex_nombrec(a * b + c * d)}$`
					last_op = 'addition';
					break
				case 9: // ab-cd
					d = val2
					b = val1
					if (a * b < d * c) a = calcul(a + c)
					while (a * b < d * c) a = calcul(a + c)
					expf = `La différence du produit de ${nombre_avec_espace(a)} par $${l1}$ et du produit de ${nombre_avec_espace(c)} par $${l2}$`
					expl = `$${tex_nombre(a)}${l1}-${tex_nombre(c)}${l2}$`
					expc = `$${tex_nombre(a)}${l1}-${tex_nombre(c)}${l2}=${tex_nombre(a)}\\times ${tex_nombre(b)}-${tex_nombre(c)}\\times ${tex_nombre(d)} = ${tex_nombrec(a * b)}-${tex_nombrec(c * d)} = ${tex_nombrec(a * b - c * d)}$`
					last_op = 'soustraction';
					break
				case 10: // ab+c/d
					d = val1
					b = val2
					if (!estentier(c / d)) c = calcul(c * d)
					expf = `La somme du produit de ${nombre_avec_espace(a)} par $${l2}$ et du quotient de ${nombre_avec_espace(c)} par $${l1}$`
					expl = `$${tex_nombre(a)}${l2}+${tex_nombre(c)}\\div ${l1}$ ou $${tex_nombre(a)}${l2}+\\dfrac{${tex_nombre(c)}}{${l1}}$`
					expc = `$${tex_nombre(a)}${l2}+${tex_nombre(c)}\\div ${l1}=${tex_nombre(a)}\\times ${tex_nombre(b)}+${tex_nombre(c)}\\div ${tex_nombre(d)} = ${tex_nombrec(a * b)}+${tex_nombrec(c / d)} = ${tex_nombrec(a * b + c / d)}$`
					last_op = 'addition';
					break
				case 11: // ab-c/d
					d = val2
					b = val1
					if (!estentier(c / d)) c = calcul(c * d)
					while (a * b < c / d) a = calcul(a * c)
					expf = `La différence du produit de ${nombre_avec_espace(a)} par $${l1}$ et du quotient de ${nombre_avec_espace(c)} par $${l2}$`
					expl = `$${tex_nombre(a)}${l1}-${tex_nombre(c)}\\div ${l2}$ ou $${tex_nombre(a)}\\times ${l1}-\\dfrac{${tex_nombre(c)}}{${l2}}$`
					expc = `${tex_nombre(a)}${l1}-${tex_nombre(c)}\\div ${l2}=${tex_nombre(a)}\\times ${tex_nombre(b)}-${tex_nombre(c)}\\div ${tex_nombre(d)} = ${tex_nombrec(a * b)}-${tex_nombrec(c / d)} = ${tex_nombrec(a * b - c / d)}$`
					last_op = 'soustraction';
					break
				case 12: // a/b+c/d
					d = val1
					b = val2
					if (!estentier(a / b)) a = calcul(a * b)
					if (!estentier(c / d)) c = calcul(c * d)
					expf = `La somme du quotient de ${nombre_avec_espace(a)} par $${l2}$ et du quotient de ${nombre_avec_espace(c)} par $${l1}$`
					expl = `$${tex_nombre(a)}\\div ${l2}+${tex_nombre(c)}\\div ${l1}$ ou $\\dfrac{${tex_nombre(a)}}{${l2}}+\\dfrac{${tex_nombre(c)}}{${l1}}$`
					expc = `$${tex_nombre(a)}\\div ${l2}+${tex_nombre(c)}\\div ${l1}=${tex_nombre(a)}\\div ${tex_nombre(b)}+${tex_nombre(c)}\\div ${tex_nombre(d)} = ${tex_nombrec(a / b)}+${tex_nombrec(c / d)} = ${tex_nombrec(a / b + c / d)}$`
					break
				case 13: // a/b-c/d
					d = val2
					b = val1
					if (!estentier(a / b)) a = calcul(a * b)
					if (!estentier(c / d)) c = calcul(c * d)
					while (a / b < c / d) a = calcul(a * c)
					expf = `La différence du quotient de ${nombre_avec_espace(a)} par $${l1}$ et du quotient de ${nombre_avec_espace(c)} par $${l2}$`
					expl = `$${tex_nombre(a)}\\div ${l1}-${tex_nombre(c)}\\div ${l2}$ ou $\\dfrac{${tex_nombre(a)}}{${l1}}-\\dfrac{${tex_nombre(c)}}{${l2}}$`
					expc = `$${tex_nombre(a)}\\div ${l1}-${tex_nombre(c)}\\div ${l2}=${tex_nombre(a)}\\div ${tex_nombre(b)}-${tex_nombre(c)}\\div ${tex_nombre(d)} = ${tex_nombrec(a / b)}-${tex_nombrec(c / d)} = ${tex_nombrec(a / b - c / d)}$`
					last_op = 'soustraction';
					break
			}
			break;
		case 5: // expressions complexes
			souscas = randint(0, 5)
			nbval = 2
			switch (souscas) {
				case 0: // 2(a+bc)
					a = val1
					c = val2
					expf = `Le double de la somme de $${l1}$ et du produit de ${nombre_avec_espace(b)} par $${l2}$`
					expl = `$2${signex}(${l1}+${tex_nombre(b)}${l2})$`
					expc = `$2${signex}(${l1}+${tex_nombre(b)}${l2})=2${signex}(${tex_nombre(a)}+${tex_nombre(b)}\\times ${tex_nombre(c)}) = 2${signex}(${tex_nombre(a)}+${tex_nombrec(b * c)}) = 2\\times ${tex_nombrec(a + b * c)}=${tex_nombrec(2 * (a + b * c))}$`
					last_op = 'multiplication';
					break
				case 1: // 3(a+b)/c
					b = val1
					c = val2
					if (!estentier(3 * (a + b) / c)) a = calcul(a * c - b)
					while (a < b) a = calcul(a * c - b)
					expf = `Le triple du quotient de la somme de ${nombre_avec_espace(a)} et $${l1}$ par $${l2}$`
					expl = `$3${signex}(${tex_nombre(a)}+${l1})\\div ${l2}$ ou $3\\times \\dfrac{${tex_nombre(a)}+${l1}}{${l2}}$`
					expc = `$3${signex}(${tex_nombre(a)}+${l1})\\div ${l2}=3${signex}(${tex_nombre(a)}+${tex_nombre(b)})\\div ${tex_nombre(c)} = 3\\times  ${tex_nombre(a + b)}\\div ${tex_nombre(c)} = ${tex_nombrec(3 * (a + b))}\\div ${tex_nombre(c)} = ${tex_nombrec(3 * (a + b) / c)}$`
					last_op = 'division';
					break
				case 2: // (a-b)/3
					nbval = 1
					b = val1
					if (!estentier((a - b) / 3)) a = calcul(3 * a + b)
					expf = `Le tiers de la différence de ${nombre_avec_espace(a)} et $${l1}$`
					expl = `$(${tex_nombre(a)}-${l1})\\div  3$ ou $\\dfrac{${tex_nombre(a)}-${l1}}{3}$`
					expc = `$(${tex_nombre(a)}-${l1})\\div  3=(${tex_nombre(a)}-${tex_nombre(b)})\\div  3 = ${tex_nombrec(a - b)}\\div  3 = ${tex_nombrec((a - b) / 3)}$`
					last_op = 'division';
					break
				case 3: // (a-b)/3*2(c+d)
					c = val1
					b = val2
					if (a <= b) a = calcul(a + b)
					if (!estentier((a - b) / 3)) a = calcul(3 * a + b)
					expf = `Le produit du tiers de la différence de ${nombre_avec_espace(a)} et $${l2}$ par le double de la somme de $${l1}$ et ${nombre_avec_espace(d)}`
					expl = `$\\left((${tex_nombre(a)}-${l2})\\div  3\\right)\\times  2${signex}(${l1}+${tex_nombre(d)})$`
					expc = `$\\left((${tex_nombre(a)}-${l2})\\div  3\\right)\\times  2${signex}(${l1}+${tex_nombre(d)})=\\left((${tex_nombre(a)}-${tex_nombre(b)})\\div  3\\right)\\times  2${signex}(${tex_nombre(c)}+${tex_nombre(d)}) = ${tex_nombrec(a - b)}\\div  3 \\times  2 \\times ${tex_nombrec(c + d)} = ${tex_nombrec((a - b) / 3)} \\times  2 \\times  ${tex_nombrec(c + d)} =  ${tex_nombrec(2 * (a - b) / 3)} \\times  ${tex_nombrec(c + d)} = ${tex_nombrec(2 * (c + d) * (a - b) / 3)}$`
					last_op = 'multiplication';
					break
				case 4: // 3(a+b)-2(c+d)
					b = val1
					c = val2
					if (3 * (a + b) < 2 * (c + d)) a = calcul(a + c + d)
					expf = `La différence du triple de la somme de ${nombre_avec_espace(a)} et $${l1}$ et du double de la somme de $${l2}$ et ${nombre_avec_espace(d)}`
					expl = `$3${signex}(${tex_nombre(a)}+${l1})-2${signex}(${l2}+${tex_nombre(d)})$`
					expc = `$3${signex}(${tex_nombre(a)}+${l1})-2${signex}(${l2}+${tex_nombre(d)})=3${signex}(${tex_nombre(a)}+${tex_nombre(b)})-2${signex}(${tex_nombre(c)}+${tex_nombre(d)}) = 3 \\times  ${tex_nombrec(a + b)} - 2 \\times  ${tex_nombrec(c + d)} = ${tex_nombrec(3 * (a + b))} - ${tex_nombrec(2 * (c + d))} = ${tex_nombrec(3 * (a + b) - 2 * (c + d))}$`
					last_op = 'soustraction';
					break
				case 5: // 2(a-b)+3(c+d)
					d = val2
					b = val1
					if (a <= b) a = calcul(a + b)
					expf = `La somme du double de la différence de ${nombre_avec_espace(a)} et $${l1}$ et du triple de la somme de ${nombre_avec_espace(c)} et $${l2}$`
					expl = `$2${signex}(${tex_nombre(a)}-${l1})+3${signex}(${tex_nombre(c)}+${l2})$`
					expc = `$2${signex}(${tex_nombre(a)}-${l1})+3${signex}(${tex_nombre(c)}+${l2})=2${signex}(${tex_nombre(a)}-${tex_nombre(b)})+3${signex}(${tex_nombre(c)}+${tex_nombre(d)}) = 2 \\times  ${tex_nombrec(a - b)} + 3 \\times  ${tex_nombrec(c + d)} = ${tex_nombrec(2 * (a - b))} + ${tex_nombrec(3 * (c + d))} = ${tex_nombrec(2 * (a - b) + 3 * (c + d))}$`
					last_op = 'addition';
					break
			}
			break;
		case 4: // 4 opérations
			souscas = randint(1, 3)
			nbval = 2
			switch (souscas) {
				case 1: // (a+b)/(c(d+e))
					b = val1
					e = val2
					if (!estentier((a + b) / (c * (d + e)))) a = calcul(a * c * (d + e) - b)
					expf = `Le quotient de la somme de ${nombre_avec_espace(a)} et $${l1}$ par le produit de ${nombre_avec_espace(c)} par la somme de ${nombre_avec_espace(d)} et $${l2}$`
					expl = `$(${tex_nombre(a)}+${l1})\\div (${tex_nombre(c)}${signex}(${tex_nombre(d)}+${l2}))$ ou $\\dfrac{${tex_nombre(a)}+${l1}}{${tex_nombre(c)}${signex}(${tex_nombre(d)}+${l2})}$`
					expc = `$(${tex_nombre(a)}+${l1})\\div (${tex_nombre(c)}${signex}(${tex_nombre(d)}+${l2}))=(${tex_nombre(a)}+${tex_nombre(b)})\\div (${tex_nombre(c)}${signex}(${tex_nombre(d)}+${tex_nombre(e)})) = ${tex_nombrec(a + b)} \\div  (${tex_nombre(c)} \\times  ${tex_nombrec(d + e)}) = ${tex_nombrec(a + b)} \\div  ${tex_nombre(c * (d + e))} = ${tex_nombrec((a + b) / (c * (d + e)))}$`
					last_op = 'division';
					break
				case 2: //(a-b)*(c+de)
					e = val1
					b = val2
					if (a <= b) a = calcul(a + b)
					expf = `Le produit de la différence de ${nombre_avec_espace(a)} et $${l2}$ par la somme de ${nombre_avec_espace(c)} et du produit de ${nombre_avec_espace(d)} par $${l1}$`
					expl = `$(${tex_nombre(a)}-${l2})${signex}(${tex_nombre(c)}+${tex_nombre(d)}${l1})$`
					expc = `$(${tex_nombre(a)}-${l2})${signex}(${tex_nombre(c)}+${tex_nombre(d)}${l1})=(${tex_nombre(a)}-${tex_nombre(b)})${signex}(${tex_nombre(c)}+${tex_nombre(d)}\\times ${tex_nombre(e)}) = ${tex_nombrec(a - b)}(${tex_nombre(c)}+${tex_nombrec(d * e)}) = ${tex_nombrec(a - b)} \\times  ${tex_nombre(c + d * e)} = ${tex_nombrec((a - b) * (c + d * e))}$`
					last_op = 'multiplication';
					break
				case 3: // ab+cd/e
					d = val2
					b = val1
					if (!estentier(c * d / e)) c = calcul(c * e)
					expf = `La somme du produit de ${nombre_avec_espace(a)} par $${l1}$ et du quotient du produit de ${nombre_avec_espace(c)} et $${l2}$ par ${nombre_avec_espace(e)}`
					expl = `$${tex_nombre(a)}${l1}+${tex_nombre(c)}${l2}\\div ${tex_nombre(e)}$ ou $${tex_nombre(a)}${l1}+\\dfrac{${tex_nombre(c)}${l2}}{${tex_nombre(e)}}$`
					expc = `$${tex_nombre(a)}${l1}+${tex_nombre(c)}${l2}\\div ${tex_nombre(e)}=${tex_nombre(a)}\\times ${tex_nombre(b)}+${tex_nombre(c)}\\times ${tex_nombre(d)}\\div ${tex_nombre(e)} = ${tex_nombrec(a * b)} + ${tex_nombrec(c * d)} \\div  ${tex_nombre(e)} = ${tex_nombrec(a * b)} + ${tex_nombrec(c * d / e)} = ${tex_nombrec(a * b + c * d / e)}$`
					last_op = 'addition';
					break
			}
			break
	}
	let pos1 = 0
	for (; pos1 < expc.length; pos1++)
		if (expc[pos1] == '=') break
	let pos2 = pos1 + 1
	for (; pos2 < expc.length; pos2++)
		if (expc[pos2] == '=') break
	let expn = '$' + expc.substring(pos1 + 1, pos2 - 1) + '$'
	return [expf, expl, expc, nbval, last_op, expn]
}


