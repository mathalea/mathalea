import Exercice from '../ClasseExercice.js';
import { premierMultipleSuperieur,liste_de_question_to_contenu,tex_nombre2,arrondi,sp, personnes,personne,mise_en_evidence,combinaison_listes,tex_fraction, randint,num_alpha, choice, premiere_lettre_en_majuscule ,ppcm,calcul} from "/modules/outils.js"

export default function Probleme_de_ratio() {
  "use strict"
  Exercice.call(this)
  this.titre = "Problèmes de ratio";
  this.nb_questions = 4; // Ici le nombre de questions
  this.nb_questions_modifiable = true // Active le formulaire nombre de questions
  this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
  this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
  this.pas_de_version_LaTeX = false
  this.pas_de_version_HMTL = false
  this.sup = 3
  this.spacing=2
  this.spacing_corr=2.5


  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let prenoms = [],
    objets = ['billes', 'livres', 'perles', 'gâteaux', 'bonbons'],
    sirops=['de fraise','de citron','de cerise','de menthe','d\'orange'],
    jusdefruit=['d\'annanas','de banane','de pamplemousse','d\'abricot','de raisin'],
    produits=['produit d\'entretien','décapant biologique','colorant','shampoing automobile','fertilisant liquide'],
    article,p1,p2,quidam,index,index2,
    ratiosables=[[10,6,5],[7,4,4],[13,7,10]],
    ratiovinaigrette=[[2,3],[3,5],[4,7]],
    ratioecran=[[16,9],[4,3],[21,9],[16,10]],
    resolutions=[[800,600],[1024,768],[1280,720],[1280,1024],[1366,768],[1600,900],[1680,1050],[1920,1080]]
    let type_de_questions_disponibles = ['partage','mélange','dilution','recette','ecran']
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
    for (let i = 0, texte, texte_corr, x, y, z, total, a, b, c, n = 2, k, cpt = 0; i < this.nb_questions && cpt < 50;) {
      index=randint(0,10)
      index2=randint(0,10)
      texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
      texte_corr = `` // Idem pour le texte de la correction.
      switch (parseInt(this.sup)) {
        case 1:
          x = randint(1, 5)
          y = randint(1, 5, x)
          z = 0
          n = 2
          break
        case 2:
          x = randint(1, 5)
          y = randint(1, 5, x)
          z = randint(1, 7, [x, y])
          n = 3
          break
        case 3:
          x = randint(1, 5)
          y = randint(1, 5, x)
          if (choice([true, false])) {
            z = randint(1, 7, [x, y])
            n = 3
          }
          else {
            n = 2
            z = 0
          }
          break
      }
      k = randint(2, 6)
      total = (x + y + z) * k
      switch (liste_type_de_questions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 'partage':
          prenoms = personnes(n)
          for (let j = 0; j < n - 1; j++) {
            if (j > 0) {
              texte += ', '
            }
            texte += `${prenoms[j].prenom}`
          }
          texte += ` et ${prenoms[n - 1].prenom} se partagent $${total}$ ${objets[index%5]} dans le ratio $~${x}~:~${y}$`
          if (n == 3) {
            texte += `$~:~${z}$`
          }
          texte += `.<br>Combien de ${objets[index%5]} chaque enfant reçoit-il ?`
          if (n == 2) {
            texte_corr += `Si les enfants se partageaient $${x}+${y}=${x + y}$ ${objets[index%5]} alors ${prenoms[0].prenom} en aurait $${x}$ et ${prenoms[1].prenom} en aurait $${y}$.`
            texte_corr += `<br>Mais il y a $${total}$ ${objets[index%5]}, soit $${mise_en_evidence(k)}\\times ${x + y + z}$ ${objets[index%5]}.<br>`
             texte_corr += `Donc ${prenoms[0].prenom} en aura $${mise_en_evidence(k)}\\times ${x}=${k * x}$ et ${prenoms[1].prenom} en aura $${mise_en_evidence(k)}\\times ${y}=${k * y}$.<br>`
            texte_corr += `Conclusion : ${prenoms[0].prenom} aura $${k * x}$ ${objets[index%5]} et ${prenoms[1].prenom} en aura $${k * y}$.`

          }
          else {
            texte_corr += `Si les enfants se partageaient $${x}+${y}+${z}=${x + y + z}$ ${objets[index%5]} alors ${prenoms[0].prenom} en aurait $${x}$, ${prenoms[1].prenom} en aurait $${y}$ et ${prenoms[2]} en aurait $${z}$.`
            texte_corr += `<br>Mais il y a $${total}$ ${objets[index%5]}, soit $${mise_en_evidence(k)}\\times ${x + y + z}$ ${objets[index%5]}.<br>`
            texte_corr += `Donc ${prenoms[0].prenom} en aura $${mise_en_evidence(k)}\\times ${x}=${k * x}$, ${prenoms[1].prenom} en aura $${mise_en_evidence(k)}\\times ${y}=${k * y}$ et  ${prenoms[2]} en aura $${mise_en_evidence(k)}\\times ${z}=${k * z}$.<br>`
            texte_corr += `Conclusion : ${prenoms[0].prenom} aura $${k * x}$ ${objets[index%5]}, ${prenoms[1].prenom} en aura $${k * y}$ et  ${prenoms[2]} en aura $${k * z}$.`
          }
          break
        case 'mélange':
            x=randint(1,3)
            y=x+randint(5,7)
            if (n==3) {
              z=y+randint(1,3)
            }
            else {
              z=0
            }
            total=ppcm(x+y+z,20)
            k=calcul(total/(x+y+z))
            quidam=personne({})
            article=quidam.pronom

            if (n==2) { // On mélange du sirop et de l'eau
                texte+=`${quidam.prenom} prépare un sirop à l'eau pour ses amis. ${premiere_lettre_en_majuscule(article)} mélange du sirop ${sirops[index%5]} et de l'eau dans le ratio $~${x}~:~${y}$.<br>`
           if (choice([true,false])){
                texte+=`${premiere_lettre_en_majuscule(article)} désire préparer $${total}\\text{ cL} $ de boisson. Quelle quantité de sirop et d\'eau doit-${article} mélanger ?`
                texte_corr+=`Si ${quidam.prenom} mélange selon le ratio donné $${x}\\text{ cL} $ de sirop ${sirops[index%5]} et $${y}\\text{ cL} $ d\'eau ${article} obtiendra $${x+y}\\text{ cL} $ de mélange.<br>`
                texte_corr+=`${premiere_lettre_en_majuscule(article)} veut obtenir $${total}\\text{ cL} $ $=${mise_en_evidence(k)}\\times ${x+y}\\text{ cL} $.<br>`
                texte_corr+=`Donc pour cela, ${article} doit mélanger $${mise_en_evidence(k)}\\times ${x}\\text{ cL} $$=${k*x}\\text{ cL} $ de sirop ${sirops[index%5]} et $${mise_en_evidence(k)}\\times ${y}\\text{ cL} $$=${k*y}\\text{ cL} $ d\'eau`
              }
             else {
              texte+=`${premiere_lettre_en_majuscule(article)} verse $${k*x}\\text{ cL} $ de sirop ${sirops[index%5]}. Quelle quantité d\'eau doit-${article} ajouter et quelle quantité de boisson obtiendra-t-${article} ?`
              texte_corr+=`Pour cette boisson le sirop ${sirops[index%5]} et l\'eau sont dans un ratio de $${x}~:~${y}$<br>ce qui signifie que : `
              texte_corr+=`$${tex_fraction("\\text{Volume de sirop en cL}",x+"\\text{ cL}")}=${tex_fraction("\\text{Volume d\'eau en cL}",y+"\\text{ cL}")}$.<br>`
              texte_corr+=`Avec la valeur numérique : $${tex_fraction(k*x+"\\text{ cL}",x+"\\text{ cL}")}=${tex_fraction("\\text{Volume d\'eau en cL}",y+"\\text{ cL}")}$.<br>`
              texte_corr+=`${quidam.prenom} doit ajouter un volume d\'eau de : $${tex_fraction(y+'\\times'+k*x,x)}=${y*k}\\text{ cL} $.`
     }
            }
            else { // On mélange du sirop, du jus de fruit et de la limonade.
              texte+=`${quidam.prenom} prépare un coktail à base de sirop  ${sirops[index%5]}, de jus ${jusdefruit[index2%5]} et d\'eau gazeuse pour ses amis. ${premiere_lettre_en_majuscule(article)} mélange les trois ingédients dans le ratio $~${x}~:~${y}~:~${z}$.<br>`
              if (choice([true,false])){
              texte+=`${premiere_lettre_en_majuscule(article)} désire préparer $${total}\\text{ cL} $ de boisson. Quelle quantité de sirop, de jus et d\'eau gazeuse doit-${article} mélanger ?`
              texte_corr+=`Si ${quidam.prenom} mélange selon le ratio donné $${x}\\text{ cL} $ de sirop ${sirops[index%5]}, $${y}\\text{ cL} $ de jus ${jusdefruit[index2%5]} et $${z}\\text{ cL} $ d\'eau gazeuse ${article} obtiendra $${x+y+z}\\text{ cL} $ de coktail.<br>`
              texte_corr+=`${premiere_lettre_en_majuscule(article)} veut obtenir $${total}\\text{ cL} $ $=${mise_en_evidence(k)}\\times ${x+y+z}\\text{ cL} $ de coktail.<br>`
              texte_corr+=`Donc pour cela, ${article} doit mélanger $${mise_en_evidence(k)}\\times ${x}\\text{ cL} $$=${k*x}\\text{ cL} $ de sirop ${sirops[index%5]}, $${mise_en_evidence(k)}\\times ${y}\\text{ cL} $$=${k*y}\\text{ cL} $ de jus ${jusdefruit[index2%5]} et $${mise_en_evidence(k)}\\times ${z}\\text{ cL} $$=${k*z}\\text{ cL} $ d\'eau gazeuse.`
         
            }
              else {
                texte+=`${premiere_lettre_en_majuscule(article)} verse $${k*x}\\text{ cL} $ de sirop ${sirops[index%5]}. Quelle quantité de jus ${jusdefruit[index2%5]} et d\'eau gazeuse doit-${article} ajouter et quelle quantité de coktail obtiendra-t-${article} ?`
                texte_corr+=`Pour ce coktail le sirop ${sirops[index%5]}, le jus ${jusdefruit[index2%5]} et l\'eau gazeuse sont dans un ratio de $${x}~:~${y}~:~${z}$<br>`
                texte_corr+=`ce qui signifie que $${tex_fraction("\\text{Volume de sirop en cL}",x+"\\text{ cL}")}=${tex_fraction("\\text{Volume de jus de fruit en cL}",y+"\\text{ cL}")}=${tex_fraction("\\text{Volume d\'eau gazeuse en cL}",z+"\\text{ cL}")}$<br>`
                texte_corr+=`Avec la valeur numérique : $${tex_fraction(k*x+"\\text{ cL}",x+"\\text{ cL}")}=${tex_fraction("\\text{Volume de jus de fruit en cL}",y+"\\text{ cL}")}=${tex_fraction("\\text{Volume d\'eau gazeuse en cL}",z+"\\text{ cL}")}$.<br>`
                texte_corr+=`${quidam.prenom} en déduit que le volume de jus ${jusdefruit[index2%5]} est : $${tex_fraction(k*x+'\\times'+y,x)}\\text{ cL}=${y*k}\\text{ cL}$.<br>`
                texte_corr+=`Et le volume d\'eau gazeuse est : $${tex_fraction(k*x+'\\times'+z,x)}\\text{ cL}=${z*k}\\text{ cL}$.<br>`
              }

            }
          break

        case 'dilution':
          x=randint(1,3)
          y=randint(2*x,4*x)
          a=x+y
          p1=Math.round(x*100/a)
          if (n==3) { //Deux ratios de dilution : x:y x:z
            z=randint(5*x,10*x)
            b=x+z
            p2=p1
            p1=Math.round(x*100/b)
          }
          k=randint(10,20)*10
          texte+=`Un ${produits[index%5]} est vendu sous forme concentrée avec l\'indication suivante sur le bidon :<br>`
          if (n==2){
            texte+=`Diluer avec de l\'eau à $${p1}\\%$ ($~${x}~:~${y}~$).<br>`
            if (choice([true,false])){
              texte+=`Montrer que le ratio correspond bien à la présence de $${p1}\\%$ de produit concentré dans le mélange final.`
              texte_corr+=`Une dilution selon le ratio $~${x}~:~${y}~$ signifie qu'on dilue $${x}$ unités de volume de ${produits[index%5]} dans $${y}$ unités de volume d\'eau.<br>`
              texte_corr+=`Ce qui fait donc un total de $${x+y}$ unités de volume de produit dilué.<br>`
              texte_corr+=`La proportion de ${produits[index%5]} est donc : $${tex_fraction(x+"\\text{ unités de volume}",x+y+"\\text{ unités de volume}")}\\approx ${tex_nombre2(arrondi(x/(x+y)),3)}$ soit environ $${Math.round(100*x/(x+y))}\\%$`
            }
            else {
              total=k*(x+y)
              texte+=`Si on veut préparer $${total}\\text{ cL} $ de produit dilué, quel volume d\`eau et de ${produits[index%5]} faut-il mélanger ?`
              texte_corr+=`Selon le ratio donné, pour $${x}$ unités de volume de ${produits[index%5]} il faut $${y}$ unités de volume d\'eau soit au total un volume de $${x+y}$ unités de volume.<br>`
              texte_corr+=`Or $${total}\\text{ cL} $ $=${mise_en_evidence(k)}\\times ${x+y}$ donc il faut $${mise_en_evidence(k)}\\times ${x}=${k*x}\\text{ cL} $ de ${produits[index%5]} et $${mise_en_evidence(k)}\\times ${y}=${k*y}\\text{ cL} $ d\'eau.<br>`
            }
          }
          else {
            texte+=`Diluer avec de l\'eau de $${p1}\\%$ à $${p2}\\%$ ( de $~${x}~:~${y}~$ à $~${x}~:~${z}~$).<br>`
            if (choice([true,false])){
              texte+=`Montrer que les ratios proposés correspondent bien aux pourcentages de produit concentré dans le mélange final.`
              texte_corr+=`Une dilution selon le ratio $~${x}~:~${y}~$ signifie qu'on dilue $${x}$ unités de volume de ${produits[index%5]} dans $${y}$ unités de volume d\'eau.<br>`
              texte_corr+=`Ce qui fait donc un total de $${x}+${y}=${x+y}$ unités de volume de produit dilué.<br>`
              texte_corr+=`La proportion de ${produits[index%5]} est donc : $${tex_fraction(x+"\\text{ unités de volume}",x+y+"\\text{ unités de volume}")}\\approx ${tex_nombre2(arrondi(x/(x+y)),4)}$ soit environ $${Math.round(100*x/(x+y))}\\%$<br>`
              texte_corr+=`De la même façon, selon le ratio $~${x}~:~${z}$, on obtient la proportion suivante :<br>`
              texte_corr+=`$${tex_fraction(x+"\\text{ unités de volume}",`(${x}+${z})\\text{ unités de volume}`)}=${tex_fraction(x,x+z)}\\approx ${tex_nombre2(arrondi(x/(x+z)),4)}$ soit environ $${Math.round(100*x/(x+z))}\\%$.<br>`
              texte_corr+=`Conclusion : les pourcentages et les ratios annoncés correspondent bien.`
            }
            else {
                total=k*(x+y)
                texte +=` ${num_alpha(0)} Si on veut préparer $${total}\\text{ cL} $ de produit dilué selon le ratio $~${x}~:~${y}$, quel volume d\`eau et de ${produits[index%5]} faut-il mélanger ?<br>`
                texte+=` ${num_alpha(1)} Avec $${k*x}\\text{ cL} $ de ${produits[index%5]}, quel volume d\'eau faut-il ajouter pour obtenir un produit dilué selon le ratio $~${x}~:~${z}$ ?`
                texte_corr+=` ${num_alpha(0)} Selon le ratio donné, pour $${x}$ unités de volume de ${produits[index%5]} il faut $${y}$ unités de volume d\'eau soit au total un volume de $${x+y}$ unités de volume.<br>`
                texte_corr+=`${sp(4)}Or $${total}\\text{ cL} $ $=${mise_en_evidence(k)}\\times ${x+y}$ donc il faut $${mise_en_evidence(k)}\\times ${x}=${k*x}\\text{ cL} $ de ${produits[index%5]} et $${mise_en_evidence(k)}\\times ${y}=${k*y}\\text{ cL} $ d\'eau.<br>`
                texte_corr+=` ${num_alpha(1)} Le ratio $~${x}~:~${z}~$ pour le ${produits[index%5]} signifie que :<br>`
                texte_corr+=`${sp(4)}$${tex_fraction(k*x+"\\text{ cL}",x+"\\text{ cL}")}=${tex_fraction("\\text{volume d'eau en cL}",z+"\\text{ cL}")}=${mise_en_evidence(k)}$.<br>`
                texte_corr+=`${sp(4)}Donc il faut ajouter $${mise_en_evidence(k)}\\times ${z}\\text{ cL}=${k*z}\\text{ cL} $ d'eau pour obtenir une dilution selon le ratio $~${x}~:~${z}$`
              }
            }

          break

        case 'recette':
            quidam=personne({})
        if (n==3) {
           article=quidam.pronom
          x=ratiosables[index%3][0]
          y=ratiosables[index%3][1]
          z=ratiosables[index%3][2]
          k=choice([10,15,20,25])
          total=(x+y+z)*k
          texte+=`${quidam.prenom} veut faire des sablés bretons. Pour cela ${article} doit réaliser un mélange de farine, de sucre et de beurre selon le ratio $~${x}~:~${y}~:~${z}$.<br>`
          texte+=`${num_alpha(0)} ${premiere_lettre_en_majuscule(article)} dispose de $${k*z}\\text{ g}$ de beurre. Quelle masse de farine et de sucre doit-${article} utiliser si ${article} utilise tout le beurre disponible ?<br>`
          texte+=`${num_alpha(1)} Quelle sera alors la masse totale du "sable" produit ?`
          texte_corr+=`${num_alpha(0)} La farine, le sucre et le beurre respecte le ratio $~${x}~:~${y}~:~${z}$, ce qui signifie :<br>`
          texte_corr+=`$${tex_fraction("\\text{masse de farine en gramme}",x+"\\text{ g}")}=${tex_fraction("\\text{masse de sucre en gramme}",y+"\\text{ g}")}=${tex_fraction(`${k*z}\\text{ g}`,`${z}\\text{ g}`)}=${mise_en_evidence(k)}$.<br>`
          texte_corr+=`On en déduit que ${quidam.prenom} devra utiliser $${mise_en_evidence(k)}\\times ${x}\\text{ g}=${k*x}\\text{ g}$ de farine et $${mise_en_evidence(k)}\\times ${y}\\text{ g}=${k*y}\\text{ g}$ de sucre.<br>`
          texte_corr+=`${num_alpha(1)} La masse de "sable" sera donc : $${k*x}\\text{ g} + ${k*y}\\text{ g} +${k*z}\\text{ g} =${total}\\text{ g}$.`
        }
          else {
           article=quidam.pronom
            x=ratiovinaigrette[index%3][0]
            y=ratiovinaigrette[index%3][1]
            k=randint(2,6)
            total=(x+y)*k
            texte+=`${quidam.prenom} veut réaliser une vinaigrette. Pour cela ${article} mélange du vinaigre et de l'huile d'olive selon le ratio $~${x}~:~${y}$.<br>`
            texte+=`${premiere_lettre_en_majuscule(article)} utilise $${y*k}$ cuillères à soupe d'huile d'une contenance de $15 \\text{ mL}$ chacune.<br>`
            texte+=`${num_alpha(0)} Quel volume de vinaigre doit-${article} utiliser ?<br>`
            texte+=`${num_alpha(1)} Quel volume de vinaigrette ${quidam.prenom} réalisera-t-${article} ?`
            texte_corr+=`${num_alpha(0)} Comme le ratio de vinaigre et d'huile est $${x}~:~${y}$, alors on a :<br>`
            texte_corr+=`${sp(6)}$${tex_fraction("\\text{volume de vinagre en mL}",x+"\\text{ mL}")}=${tex_fraction(`${y*k}\\times 15 \\text{ mL}`,y+"\\text{ mL}")}=${mise_en_evidence(k*15)}$.<br>`
            texte_corr+=`${sp(6)}Le volume de vinaigre doit-être : $${mise_en_evidence(k*15)}\\times ${x}\\text{ mL}=${k*15*x}\\text{ mL}$.<br>`
            texte_corr+=`${num_alpha(1)} Donc le volume de vinaigrette est : $${mise_en_evidence(k*15)}\\text{ mL}\\times \\left( ${x}+${y} \\right)=${mise_en_evidence(k*15)}\\text{ mL}\\times ${x+y}=${k*15*(x+y)}\\text{ mL}$.`
          }
          break

        case 'ecran':
          x=ratioecran[index%4][0]
          y=ratioecran[index%4][1]
          a=resolutions[index2%8][0]
          b=resolutions[index2%8][1]
          texte+=`Un écran au format $${x}~:~${y}$ est-il adapté à une résolution de $${a}\\times ${b}$ ?<br>`
          if (a/x==b/y){
            texte_corr+=`La résolution d'image $${a}\\times ${b}$ respecte effectivement le format $${x}~:~${y}$.<br>`
            texte_corr+=`En effet, $${tex_fraction(a,x)}=${tex_fraction(b,y)}=${tex_nombre2(calcul(a/x))}$`
          }
          else {
            texte_corr+=`La résolution d'image $${a}\\times ${b}$ ne respecte pas le format $${x}~:~${y}$.<br>`
            if (Number.isInteger(a/x)){
            texte_corr+=`En effet, $${tex_fraction(a,x)}=${tex_nombre2(calcul(a/x))}$ et $${tex_fraction(b,y)}\\approx ${tex_nombre2(calcul(b/y))}$.<br>`
 
              k=calcul(a/x)
              texte+=`Sinon, proposer une résolution qui conviendrait en gardant la largeur d'image.`
              texte_corr+=`On doit avoir : $${tex_fraction(a,x)}=${tex_fraction('h',y)}$<br>`
              texte_corr+=`Donc $h=${tex_fraction(y+'\\times'+a,x)}=${k*y}$. La résolution $${a}\\times ${k*y}$ respecte le format $${x}~:~${y}$.`
            }
            else if (Number.isInteger(b/y)){
              texte_corr+=`En effet, $${tex_fraction(a,x)}\\approx ${tex_nombre2(calcul(a/x))}$ et $${tex_fraction(b,y)}=${tex_nombre2(calcul(b/y))}$.<br>`
              k=calcul(b/y)
              texte+=`Sinon, proposer une résolution qui conviendrait en gardant la hauteur d'image.`
              texte_corr+=`On doit avoir : $${tex_fraction(b,y)}=${tex_fraction('L',x)}$<br>`
              texte_corr+=`Donc $L=${tex_fraction(x+'\\times'+b,y)}=${k*x}$. La résolution $${k*x}\\times ${b}$ respecte le format $${x}~:~${y}$.`
            }
            else {
              texte_corr+=`En effet, $${tex_fraction(a,x)}\\approx ${tex_nombre2(calcul(a/x))}$ et $${tex_fraction(b,y)}\\approx ${tex_nombre2(calcul(b/y))}$.<br>`
              texte+=`Sinon proposer une résolution adaptée à ce ratio.`
              k=ppcm(x,y)
              c=premierMultipleSuperieur(k,1024)
              a=calcul(c*x/y)
              b=c
              texte_corr+=`Le nombre $${c}$ est un multiple de $${x}$ et de $${y}$.<br>`
              texte_corr+=`Je choisis comme résolution $${tex_fraction(c+"\\times "+x,y)}\\times ${c}$ soit $${a}\\times ${b}$.<br>`
              texte_corr+=`En effet $${tex_fraction(a,x)}=${tex_fraction(b,y)}=${calcul(b/y)}$ donc la résolution $${a}\\times ${b}$ respecte le format $${x}~:~${y}$.`
            }
         }

          break
      }

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
  };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  this.besoin_formulaire_numerique = ['Type de ratios', 3, `1 : x:y\n 2 : x:y:z\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]

} // Fin de l'exercice.
