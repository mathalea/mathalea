import Exercice from '../ClasseExercice.js';
import { premierMultipleSuperieur,listeQuestionsToContenu,texNombre2,arrondi,sp, personnes,personne,miseEnEvidence,combinaisonListes,tex_fraction, randint,numAlpha, choice, premiere_lettre_en_majuscule ,ppcm,calcul} from '../../modules/outils.js'

export const titre = 'Problèmes de ratio'

export default function Probleme_de_ratio() {
  "use strict"
  Exercice.call(this)
  this.titre = titre;
  this.nbQuestions = 4; // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1;// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.sup = 3
  this.spacing=2
  this.spacingCorr=3


  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.listeQuestions = [] // tableau contenant la liste des questions 
    this.listeCorrections = []
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
    let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, x, y, z, total, a, b, c, n = 2, k, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      index=randint(0,10)
      index2=randint(0,10)
      texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = `` // Idem pour le texte de la correction.
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
      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
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
            texteCorr += `Si les enfants se partageaient $${x}+${y}=${x + y}$ ${objets[index%5]} alors ${prenoms[0].prenom} en aurait $${x}$ et ${prenoms[1].prenom} en aurait $${y}$.`
            texteCorr += `<br>Mais il y a $${total}$ ${objets[index%5]}, soit $${miseEnEvidence(k)}\\times ${x + y + z}$ ${objets[index%5]}.<br>`
             texteCorr += `Donc ${prenoms[0].prenom} en aura $${miseEnEvidence(k)}\\times ${x}=${k * x}$ et ${prenoms[1].prenom} en aura $${miseEnEvidence(k)}\\times ${y}=${k * y}$.<br>`
            texteCorr += `Conclusion : ${prenoms[0].prenom} aura $${k * x}$ ${objets[index%5]} et ${prenoms[1].prenom} en aura $${k * y}$.`

          }
          else {
            texteCorr += `Si les enfants se partageaient $${x}+${y}+${z}=${x + y + z}$ ${objets[index%5]} alors ${prenoms[0].prenom} en aurait $${x}$, ${prenoms[1].prenom} en aurait $${y}$ et ${prenoms[2].prenom} en aurait $${z}$.`
            texteCorr += `<br>Mais il y a $${total}$ ${objets[index%5]}, soit $${miseEnEvidence(k)}\\times ${x + y + z}$ ${objets[index%5]}.<br>`
            texteCorr += `Donc ${prenoms[0].prenom} en aura $${miseEnEvidence(k)}\\times ${x}=${k * x}$, ${prenoms[1].prenom} en aura $${miseEnEvidence(k)}\\times ${y}=${k * y}$ et  ${prenoms[2].prenom} en aura $${miseEnEvidence(k)}\\times ${z}=${k * z}$.<br>`
            texteCorr += `Conclusion : ${prenoms[0].prenom} aura $${k * x}$ ${objets[index%5]}, ${prenoms[1].prenom} en aura $${k * y}$ et  ${prenoms[2].prenom} en aura $${k * z}$.`
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
                texteCorr+=`Si ${quidam.prenom} mélange selon le ratio donné $${x}\\text{ cL} $ de sirop ${sirops[index%5]} et $${y}\\text{ cL} $ d\'eau ${article} obtiendra $${x+y}\\text{ cL} $ de mélange.<br>`
                texteCorr+=`${premiere_lettre_en_majuscule(article)} veut obtenir $${total}\\text{ cL} $ $=${miseEnEvidence(k)}\\times ${x+y}\\text{ cL} $.<br>`
                texteCorr+=`Donc pour cela, ${article} doit mélanger $${miseEnEvidence(k)}\\times ${x}\\text{ cL} $$=${k*x}\\text{ cL} $ de sirop ${sirops[index%5]} et $${miseEnEvidence(k)}\\times ${y}\\text{ cL} $$=${k*y}\\text{ cL} $ d\'eau`
              }
             else {
              texte+=`${premiere_lettre_en_majuscule(article)} verse $${k*x}\\text{ cL} $ de sirop ${sirops[index%5]}. Quelle quantité d\'eau doit-${article} ajouter et quelle quantité de boisson obtiendra-t-${article} ?`
              texteCorr+=`Pour cette boisson le sirop ${sirops[index%5]} et l\'eau sont dans un ratio de $${x}~:~${y}$<br>ce qui signifie que : `
              texteCorr+=`$${tex_fraction("\\text{Volume de sirop en cL}",x+"\\text{ cL}")}=${tex_fraction("\\text{Volume d\'eau en cL}",y+"\\text{ cL}")}$.<br>`
              texteCorr+=`Avec la valeur numérique : $${tex_fraction(k*x+"\\text{ cL}",x+"\\text{ cL}")}=${tex_fraction("\\text{Volume d\'eau en cL}",y+"\\text{ cL}")}$.<br>`
              texteCorr+=`${quidam.prenom} doit ajouter un volume d\'eau de : $${tex_fraction(y+'\\times'+k*x,x)}=${y*k}\\text{ cL} $.`
     }
            }
            else { // On mélange du sirop, du jus de fruit et de la limonade.
              texte+=`${quidam.prenom} prépare un coktail à base de sirop  ${sirops[index%5]}, de jus ${jusdefruit[index2%5]} et d\'eau gazeuse pour ses amis. ${premiere_lettre_en_majuscule(article)} mélange les trois ingédients dans le ratio $~${x}~:~${y}~:~${z}$.<br>`
              if (choice([true,false])){
              texte+=`${premiere_lettre_en_majuscule(article)} désire préparer $${total}\\text{ cL} $ de boisson. Quelle quantité de sirop, de jus et d\'eau gazeuse doit-${article} mélanger ?`
              texteCorr+=`Si ${quidam.prenom} mélange selon le ratio donné $${x}\\text{ cL} $ de sirop ${sirops[index%5]}, $${y}\\text{ cL} $ de jus ${jusdefruit[index2%5]} et $${z}\\text{ cL} $ d\'eau gazeuse ${article} obtiendra $${x+y+z}\\text{ cL} $ de coktail.<br>`
              texteCorr+=`${premiere_lettre_en_majuscule(article)} veut obtenir $${total}\\text{ cL} $ $=${miseEnEvidence(k)}\\times ${x+y+z}\\text{ cL} $ de coktail.<br>`
              texteCorr+=`Donc pour cela, ${article} doit mélanger $${miseEnEvidence(k)}\\times ${x}\\text{ cL} $$=${k*x}\\text{ cL} $ de sirop ${sirops[index%5]}, $${miseEnEvidence(k)}\\times ${y}\\text{ cL} $$=${k*y}\\text{ cL} $ de jus ${jusdefruit[index2%5]} et $${miseEnEvidence(k)}\\times ${z}\\text{ cL} $$=${k*z}\\text{ cL} $ d\'eau gazeuse.`
         
            }
              else {
                texte+=`${premiere_lettre_en_majuscule(article)} verse $${k*x}\\text{ cL} $ de sirop ${sirops[index%5]}. Quelle quantité de jus ${jusdefruit[index2%5]} et d\'eau gazeuse doit-${article} ajouter et quelle quantité de coktail obtiendra-t-${article} ?`
                texteCorr+=`Pour ce coktail le sirop ${sirops[index%5]}, le jus ${jusdefruit[index2%5]} et l\'eau gazeuse sont dans un ratio de $${x}~:~${y}~:~${z}$<br>`
                texteCorr+=`ce qui signifie que $${tex_fraction("\\text{Volume de sirop en cL}",x+"\\text{ cL}")}=${tex_fraction("\\text{Volume de jus de fruit en cL}",y+"\\text{ cL}")}=${tex_fraction("\\text{Volume d\'eau gazeuse en cL}",z+"\\text{ cL}")}$<br>`
                texteCorr+=`Avec la valeur numérique : $${tex_fraction(k*x+"\\text{ cL}",x+"\\text{ cL}")}=${tex_fraction("\\text{Volume de jus de fruit en cL}",y+"\\text{ cL}")}=${tex_fraction("\\text{Volume d\'eau gazeuse en cL}",z+"\\text{ cL}")}$.<br>`
                texteCorr+=`${quidam.prenom} en déduit que le volume de jus ${jusdefruit[index2%5]} est : $${tex_fraction(k*x+'\\times'+y,x)}\\text{ cL}=${y*k}\\text{ cL}$.<br>`
                texteCorr+=`Et le volume d\'eau gazeuse est : $${tex_fraction(k*x+'\\times'+z,x)}\\text{ cL}=${z*k}\\text{ cL}$.<br>`
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
              texteCorr+=`Une dilution selon le ratio $~${x}~:~${y}~$ signifie qu'on dilue $${x}$ unités de volume de ${produits[index%5]} dans $${y}$ unités de volume d\'eau.<br>`
              texteCorr+=`Ce qui fait donc un total de $${x+y}$ unités de volume de produit dilué.<br>`
              texteCorr+=`La proportion de ${produits[index%5]} est donc : $${tex_fraction(x+"\\text{ unités de volume}",x+y+"\\text{ unités de volume}")}\\approx ${texNombre2(arrondi(x/(x+y)),3)}$ soit environ $${Math.round(100*x/(x+y))}\\%$`
            }
            else {
              total=k*(x+y)
              texte+=`Si on veut préparer $${total}\\text{ cL} $ de produit dilué, quel volume d\`eau et de ${produits[index%5]} faut-il mélanger ?`
              texteCorr+=`Selon le ratio donné, pour $${x}$ unités de volume de ${produits[index%5]} il faut $${y}$ unités de volume d\'eau soit au total un volume de $${x+y}$ unités de volume.<br>`
              texteCorr+=`Or $${total}\\text{ cL} $ $=${miseEnEvidence(k)}\\times ${x+y}$ donc il faut $${miseEnEvidence(k)}\\times ${x}=${k*x}\\text{ cL} $ de ${produits[index%5]} et $${miseEnEvidence(k)}\\times ${y}=${k*y}\\text{ cL} $ d\'eau.<br>`
            }
          }
          else {
            texte+=`Diluer avec de l\'eau de $${p1}\\%$ à $${p2}\\%$ ( de $~${x}~:~${y}~$ à $~${x}~:~${z}~$).<br>`
            if (choice([true,false])){
              texte+=`Montrer que les ratios proposés correspondent bien aux pourcentages de produit concentré dans le mélange final.`
              texteCorr+=`Une dilution selon le ratio $~${x}~:~${y}~$ signifie qu'on dilue $${x}$ unités de volume de ${produits[index%5]} dans $${y}$ unités de volume d\'eau.<br>`
              texteCorr+=`Ce qui fait donc un total de $${x}+${y}=${x+y}$ unités de volume de produit dilué.<br>`
              texteCorr+=`La proportion de ${produits[index%5]} est donc : $${tex_fraction(x+"\\text{ unités de volume}",x+y+"\\text{ unités de volume}")}\\approx ${texNombre2(arrondi(x/(x+y)),4)}$ soit environ $${Math.round(100*x/(x+y))}\\%$<br>`
              texteCorr+=`De la même façon, selon le ratio $~${x}~:~${z}$, on obtient la proportion suivante :<br>`
              texteCorr+=`$${tex_fraction(x+"\\text{ unités de volume}",`(${x}+${z})\\text{ unités de volume}`)}=${tex_fraction(x,x+z)}\\approx ${texNombre2(arrondi(x/(x+z)),4)}$ soit environ $${Math.round(100*x/(x+z))}\\%$.<br>`
              texteCorr+=`Conclusion : les pourcentages et les ratios annoncés correspondent bien.`
            }
            else {
                total=k*(x+y)
                texte +=` ${numAlpha(0)} Si on veut préparer $${total}\\text{ cL} $ de produit dilué selon le ratio $~${x}~:~${y}$, quel volume d\`eau et de ${produits[index%5]} faut-il mélanger ?<br>`
                texte+=` ${numAlpha(1)} Avec $${k*x}\\text{ cL} $ de ${produits[index%5]}, quel volume d\'eau faut-il ajouter pour obtenir un produit dilué selon le ratio $~${x}~:~${z}$ ?`
                texteCorr+=` ${numAlpha(0)} Selon le ratio donné, pour $${x}$ unités de volume de ${produits[index%5]} il faut $${y}$ unités de volume d\'eau soit au total un volume de $${x+y}$ unités de volume.<br>`
                texteCorr+=`${sp(4)}Or $${total}\\text{ cL} $ $=${miseEnEvidence(k)}\\times ${x+y}$ donc il faut $${miseEnEvidence(k)}\\times ${x}=${k*x}\\text{ cL} $ de ${produits[index%5]} et $${miseEnEvidence(k)}\\times ${y}=${k*y}\\text{ cL} $ d\'eau.<br>`
                texteCorr+=` ${numAlpha(1)} Le ratio $~${x}~:~${z}~$ pour le ${produits[index%5]} signifie que :<br>`
                texteCorr+=`${sp(4)}$${tex_fraction(k*x+"\\text{ cL}",x+"\\text{ cL}")}=${tex_fraction("\\text{volume d'eau en cL}",z+"\\text{ cL}")}=${miseEnEvidence(k)}$.<br>`
                texteCorr+=`${sp(4)}Donc il faut ajouter $${miseEnEvidence(k)}\\times ${z}\\text{ cL}=${k*z}\\text{ cL} $ d'eau pour obtenir une dilution selon le ratio $~${x}~:~${z}$`
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
          texte+=`${numAlpha(0)} ${premiere_lettre_en_majuscule(article)} dispose de $${k*z}\\text{ g}$ de beurre. Quelle masse de farine et de sucre doit-${article} utiliser si ${article} utilise tout le beurre disponible ?<br>`
          texte+=`${numAlpha(1)} Quelle sera alors la masse totale du "sable" produit ?`
          texteCorr+=`${numAlpha(0)} La farine, le sucre et le beurre respecte le ratio $~${x}~:~${y}~:~${z}$, ce qui signifie :<br>`
          texteCorr+=`$${tex_fraction("\\text{masse de farine en gramme}",x+"\\text{ g}")}=${tex_fraction("\\text{masse de sucre en gramme}",y+"\\text{ g}")}=${tex_fraction(`${k*z}\\text{ g}`,`${z}\\text{ g}`)}=${miseEnEvidence(k)}$.<br>`
          texteCorr+=`On en déduit que ${quidam.prenom} devra utiliser $${miseEnEvidence(k)}\\times ${x}\\text{ g}=${k*x}\\text{ g}$ de farine et $${miseEnEvidence(k)}\\times ${y}\\text{ g}=${k*y}\\text{ g}$ de sucre.<br>`
          texteCorr+=`${numAlpha(1)} La masse de "sable" sera donc : $${k*x}\\text{ g} + ${k*y}\\text{ g} +${k*z}\\text{ g} =${total}\\text{ g}$.`
        }
          else {
           article=quidam.pronom
            x=ratiovinaigrette[index%3][0]
            y=ratiovinaigrette[index%3][1]
            k=randint(2,6)
            total=(x+y)*k
            texte+=`${quidam.prenom} veut réaliser une vinaigrette. Pour cela ${article} mélange du vinaigre et de l'huile d'olive selon le ratio $~${x}~:~${y}$.<br>`
            texte+=`${premiere_lettre_en_majuscule(article)} utilise $${y*k}$ cuillères à soupe d'huile d'une contenance de $15 \\text{ mL}$ chacune.<br>`
            texte+=`${numAlpha(0)} Quel volume de vinaigre doit-${article} utiliser ?<br>`
            texte+=`${numAlpha(1)} Quel volume de vinaigrette ${quidam.prenom} réalisera-t-${article} ?`
            texteCorr+=`${numAlpha(0)} Comme le ratio de vinaigre et d'huile est $${x}~:~${y}$, alors on a :<br>`
            texteCorr+=`${sp(6)}$${tex_fraction("\\text{volume de vinagre en mL}",x+"\\text{ mL}")}=${tex_fraction(`${y*k}\\times 15 \\text{ mL}`,y+"\\text{ mL}")}=${miseEnEvidence(k*15)}$.<br>`
            texteCorr+=`${sp(6)}Le volume de vinaigre doit-être : $${miseEnEvidence(k*15)}\\times ${x}\\text{ mL}=${k*15*x}\\text{ mL}$.<br>`
            texteCorr+=`${numAlpha(1)} Donc le volume de vinaigrette est : $${miseEnEvidence(k*15)}\\text{ mL}\\times \\left( ${x}+${y} \\right)=${miseEnEvidence(k*15)}\\text{ mL}\\times ${x+y}=${k*15*(x+y)}\\text{ mL}$.`
          }
          break

        case 'ecran':
          x=ratioecran[index%4][0]
          y=ratioecran[index%4][1]
          a=resolutions[index2%8][0]
          b=resolutions[index2%8][1]
          texte+=`Un écran au format $${x}~:~${y}$ est-il adapté à une résolution de $${a}\\times ${b}$ ?<br>`
          if (a/x==b/y){
            texteCorr+=`La résolution d'image $${a}\\times ${b}$ respecte effectivement le format $${x}~:~${y}$.<br>`
            texteCorr+=`En effet, $${tex_fraction(a,x)}=${tex_fraction(b,y)}=${texNombre2(calcul(a/x))}$`
          }
          else {
            texteCorr+=`La résolution d'image $${a}\\times ${b}$ ne respecte pas le format $${x}~:~${y}$.<br>`
            if (Number.isInteger(a/x)){
            texteCorr+=`En effet, $${tex_fraction(a,x)}=${texNombre2(calcul(a/x))}$ et $${tex_fraction(b,y)}\\approx ${texNombre2(calcul(b/y))}$.<br>`
 
              k=calcul(a/x)
              texte+=`Sinon, proposer une résolution qui conviendrait en gardant la largeur d'image.`
              texteCorr+=`On doit avoir : $${tex_fraction(a,x)}=${tex_fraction('h',y)}$<br>`
              texteCorr+=`Donc $h=${tex_fraction(y+'\\times'+a,x)}=${k*y}$. La résolution $${a}\\times ${k*y}$ respecte le format $${x}~:~${y}$.`
            }
            else if (Number.isInteger(b/y)){
              texteCorr+=`En effet, $${tex_fraction(a,x)}\\approx ${texNombre2(calcul(a/x))}$ et $${tex_fraction(b,y)}=${texNombre2(calcul(b/y))}$.<br>`
              k=calcul(b/y)
              texte+=`Sinon, proposer une résolution qui conviendrait en gardant la hauteur d'image.`
              texteCorr+=`On doit avoir : $${tex_fraction(b,y)}=${tex_fraction('L',x)}$<br>`
              texteCorr+=`Donc $L=${tex_fraction(x+'\\times'+b,y)}=${k*x}$. La résolution $${k*x}\\times ${b}$ respecte le format $${x}~:~${y}$.`
            }
            else {
              texteCorr+=`En effet, $${tex_fraction(a,x)}\\approx ${texNombre2(calcul(a/x))}$ et $${tex_fraction(b,y)}\\approx ${texNombre2(calcul(b/y))}$.<br>`
              texte+=`Sinon proposer une résolution adaptée à ce ratio.`
              k=ppcm(x,y)
              c=calcul(k*10)
              while (c<1024){
                c=calcul(c*2)
              }
              a=calcul(c*x/y)
              b=c
              texteCorr+=`Le nombre $${c}$ est un multiple de $${x}$ et de $${y}$.<br>`
              texteCorr+=`Je choisis comme résolution $${tex_fraction(c+"\\times "+x,y)}\\times ${c}$ soit $${a}\\times ${b}$.<br>`
              texteCorr+=`En effet $${tex_fraction(a,x)}=${tex_fraction(b,y)}=${calcul(b/y)}$ donc la résolution $${a}\\times ${b}$ respecte le format $${x}~:~${y}$.`
            }
         }

          break
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this); // On envoie l'exercice à la fonction de mise en page
  };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  this.besoinFormulaireNumerique = ['Type de ratios', 3, `1 : x:y\n 2 : x:y:z\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]

} // Fin de l'exercice.
