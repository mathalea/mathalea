import Exercice from '../Exercice.js'
import { randint, texNombrec, miseEnEvidence, prenom, itemize, texteEnCouleur, listeQuestionsToContenu, texFraction, combinaisonListes, texNombre, texFractionReduite, reduireAxPlusB } from '../../modules/outils.js'

export const titre = 'Modéliser une situation  à l\'aide d\'une équation'

/**
 * Description didactique de l'exercice
 * @author GillesM
 * Référence
 * A DEPLACER EN 2N50-3 !!!!!!!!!!!!!!!!!
*/
export default function modeliserEquations () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3', 'typeE4', 'typeE5', 'typeE6', 'typeE7', 'typeE8'] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, a, b, c, d, e, N, f, j, t, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question

      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'typeE1':
          j = randint(10, 20) * 10// prime janvier
          f = randint(15, 20) * 10// prime fevrier
          b = randint(6, 9) * 10
          a = f - j + b// augmentation
          t = randint(3, 6)

          texte = `  Le salaire mensuel d'un commercial est composé d'un salaire fixe auquel
                  s'ajoute une prime suivant ses objectifs.<br>
                   Au mois de janvier, son salaire fixe est $x$ € et sa prime a été de $${j}$ €.  <br>
                  Au mois de février son salaire fixe a augmenté de $${t}$ % et il reçoit une prime de $${f}$ €. <br>
                  Globalement, son salaire au mois
                  de février a augmenté de $${a}$ € par rapport à celui du mois de janvier. <br>
                             Exprimer en fonction de $x$ son salaire au mois de janvier, puis celui du mois de février.<br>
                  Déterminer le salaire du commercial au mois de janvier (arrondir à l'euro près).<br>
              `

          texteCorr = `Le salaire du mois de janvier en fonction de $x$ est : $x+${j}$.<br>
            Le salaire du mois de février en fonction de $x$ est : $\\left(1+${texFraction(t, 100)}\\right)x+${f}$.<br>
            Le salaire au mois de janvier augmenté de $${a}$ € est donc égal au salaire du mois de février.<br>
            Ainsi, $(x+${j})+${a}=\\left(1+${texFraction(t, 100)}\\right)x+${f}$<br>
            <br>
            $x+${texNombrec(j + a)}=(1+${texNombrec(t / 100)})x+${f}$<br>
            <br>
            $x+${texNombrec(j + a)}=${texNombrec(1 + t / 100)}x+${f}$<br>
            <br>
            $x+${texNombrec(j + a)}-${miseEnEvidence(texNombrec(j + a))}=${texNombrec(1 + t / 100)}x+${f}-${miseEnEvidence(texNombrec(j + a))}$<br>
            <br>
            $x=${texNombrec(1 + t / 100)}x${texNombrec(f - j - a)}$<br>
            <br>
            $x-${texNombrec(1 + t / 100)}x=${texNombrec(1 + t / 100)}x${texNombrec(f - j - a)}-${texNombrec(1 + t / 100)}x$<br>
            <br>
            $\\dfrac{${texNombrec(-t / 100)}x}{${miseEnEvidence(texNombrec(-t / 100))}}=\\dfrac{${texNombrec(f - j - a)}}{${miseEnEvidence(texNombrec(-t / 100))}}$<br>
            <br>
            $x=\\dfrac{${texNombrec(f - j - a)}}{${texNombrec(-t / 100)}}$<br>
            <br>
            $x\\simeq ${Math.round((f - j - a) / (-t / 100))}$<br>
            <br>
      Puisque le salaire est composé du fixe et de la prime, le salaire de ce commercial au mois de janvier a été de :
      $${Math.round((f - j - a) / (-t / 100))}+${j}$ €, soit  $${Math.round((f - j - a) / (-t / 100) + j)}$ €.
      
      
      
        `
          break
        case 'typeE2':

          a = randint(20, 30) //
          b = randint(a, 50) //
          c = randint(20, 35) / 100
          d = randint(15, c) / 100

          texte = `  Une société de location de véhicules particulière propose deux tarifs :<br>
                $\\bullet$ Tarif A : un forfait de $${a}$ € et $${texNombre(c)}$ € par km parcouru ;<br>
                $\\bullet$  Tarif B : un forfait de $${b}$ € et $${texNombre(d)}$ € par km parcouru ;<br>
          
                       Pour combien de km (arrondi à l'unité), les deux forfaits donnent-t-ils le même tarif ?<br>
          
          
                  `

          texteCorr = `En notant $x$, le nombre de km parcourus, on a :<br>
                $\\bullet$ Avec le tarif A, le prix à payer est : $${reduireAxPlusB(c, a)}$ ;<br>
                $\\bullet$  Avec le tarif B, le prix à payer est : $${reduireAxPlusB(d, b)}$ ;<br>
          
                Les deux tarifs sont identiques lorsque : $${reduireAxPlusB(c, a)}=${reduireAxPlusB(d, b)}$.<br><br>
          
                $${texNombrec(c)}x+${a}=${texNombrec(d)}x+${b}$.<br>
                <br>
                $${texNombrec(c)}x-${miseEnEvidence(texNombrec(d))}${miseEnEvidence('x')}+${a}=${texNombrec(d)}x+${b}-${miseEnEvidence(texNombrec(d))}${miseEnEvidence('x')}$.<br>
                <br>
                $${texNombrec(c - d)}x+${a}=${b}$.<br>
                <br>
                $${texNombrec(c - d)}x+${a}-${miseEnEvidence(texNombrec(a))}=${b}-${a}$.<br>
                <br>
                $${texNombrec(c - d)}x=${b - a}$.<br>
                <br>
                $\\dfrac{${texNombrec(c - d)}x}{${miseEnEvidence(texNombrec(c - d))}}=\\dfrac{${b - a}}{${miseEnEvidence(texNombrec(c - d))}}$.<br>
                <br>
                $x\\simeq${Math.round((b - a) / (c - d))}$<br>
          
                <br>
                C'est pour une distance de $${Math.round((b - a) / (c - d))}$ km que les deux tarifs sont identiques.
          
          
            `

          break
        case 'typeE3':

          a = randint(4, 10) / 100 //
          b = randint(300, 400) //
          c = randint((a + 1) * 100, 12) / 100

          texte = `  Une usine fabrique des bouteilles en verre. <br>
            En notant $x$ le nombre de bouteilles fabriquées dans une journée, les coûts de fabrication en euros, sont donnés par :
            $${texNombre(a)}x+${texNombre(b)}$.<br>
            Ces bouteilles sont toutes revendues au tarif unitaire de $${texNombrec(c)}$ €.<br>
            On appelle recette le produit du nombre de bouteilles vendues par le prix unitaire.<br>
            On appelle résultat net de l'entreprise lorsqu'elle produit et vend $x$ bouteilles, la différence entre la recette et les coûts de fabrication.<br>
      
      Combien de bouteilles l'entreprise doit-elle produire et vendre pour que le résultat net soit nul ?
            <br>
      
      
              `

          texteCorr = `
      $\\bullet$ La recette est donnée par : $${texNombrec(c)}\\times x=${texNombrec(c)}x$ ;<br>
      $\\bullet$ Les coûts de fabrication sont donnés par : $${texNombrec(a)}x+${texNombrec(b)}$ ;<br>
      $\\bullet$ Le résultat net est donné par la différence entre la recette et les coût, donc par :<br>
       $${texNombrec(c)}x-(${texNombrec(a)}x+${texNombrec(b)})=${texNombrec(c)}x-${texNombrec(a)}x-${texNombrec(b)}=${texNombrec(c - a)}x-${texNombrec(b)}$.<br>
            Le résultat est nul lorsque  : $${texNombrec(c - a)}x-${texNombrec(b)}=0$<br><br>
      
            $${texNombrec(c - a)}x-${texNombrec(b)}+${miseEnEvidence(texNombre(b))}=0+${miseEnEvidence(texNombrec(b))}$.<br>
            <br>
            $${texNombrec(c - a)}x=${texNombrec(b)}$.<br>
            <br>
            $\\dfrac{${texNombrec(c - a)}x}{${miseEnEvidence(texNombrec(c - a))}}=\\dfrac{${texNombrec(b)}}{${miseEnEvidence(texNombrec(c - a))}}$.<br>
            <br>
            $x\\simeq${Math.round((b) / (c - a))}$<br><br>
      
            C'est pour une production de $${Math.round((b) / (c - a))}$ bouteilles  que le résultat net de l'entreprise est nul.
      
      
        `

          break
        case 'typeE4':

          a = randint(48, 55) //
          b = randint(3, 6) //
          N = randint(12, 25)
          d = randint(3, 5)
          c = N * (a + b) - d * a

          texte = `  $${a}$ élèves  d'un lycée font une sortie théâtre. Ils sont accompagnés de $${b}$ adultes. <br>
            Les élèves bénéficient d'un tarif réduit. Ils paient $${d}$ € de moins que les adultes. <br>
            Le coût total de cette sortie (élèves $+$ adultes) est de $${c}$ €. <br>
            En notant $x$ le tarif pour un adulte, modéliser la situation à l'aide d'une équation puis déterminer le prix de la place pour un adulte.
      
              `

          texteCorr = `En notant $x$ le tarif pour un adulte,  celui d'un élève est $(x-${d})$ €. <br>
            Puisque le coût total est de $${c}$ €, on obtient l'équation : <br>
            <br>
            $${a}\\times (x-${d})+${b}\\times x =${c}$<br>
            <br>
            $${texNombrec(a)}x-${texNombrec(a * d)}+${b} x =${c}$<br>
            <br>
            $${texNombrec(a + b)}x-${texNombrec(a * d)} =${c}$<br>
            <br>
            $${texNombrec(a + b)}x-${texNombrec(a * d)}+${miseEnEvidence(texNombrec(a * d))} =${c}+${miseEnEvidence(texNombrec(a * d))}$<br>
            <br>
            $${texNombrec(a + b)}x =${texNombrec(c + a * d)}$<br>
            <br>
            $\\dfrac{${texNombrec(a + b)}x}{${miseEnEvidence(texNombrec(a + b))}} = \\dfrac{${texNombrec(c + a * d)}}{${miseEnEvidence(texNombrec(a + b))}}$<br>
            <br>
            $x = ${texNombrec((c + a * d) / (a + b))}$<br>
            <br>
      Le prix de la place de théâtre pour un adulte est : $${texNombrec((c + a * d) / (a + b))}$ €.
      
        `

          break
        case 'typeE5':

          a = randint(4, 10)
          b = randint(2, 10)
          c = randint(2, 10)

          texte = ' <b> Voici un programme de calcul :</b><br>'
          texte += itemize(['Choisir un nombre', `Multiplier ce nombre par $${a}$`, `Ajouter $${b}$`, `Multiplier le résultat par $${c}$`])
          texte += `Quel nombre doit-on choisir au départ pour obtenir $0$ comme résultat final ?<br>
               On donnera le résultat sous la forme d'une fraction irréductible ou d'un nombre entier le cas échéant.`

          texteCorr = `En notant $x$ le nombre choisi au départ, on obtient  :<br>
          $\\bullet$ Multiplier ce nombre par $${a}$ : &nbsp;&nbsp; &nbsp;&nbsp;$${a}\\times x=${a}x$ ;<br>
          $\\bullet$ Ajouter $${b}$ : &nbsp;&nbsp;&nbsp;&nbsp;$${a}x+${b}$ ; <br>
          $\\bullet$ Multiplier le résultat par $${c}$ : &nbsp;&nbsp;&nbsp;&nbsp;$${c}\\times (${a}x+${b})=${texNombrec(c * a)}x+${texNombrec(b * c)}$.<br>
          <br>
          On cherche $x$ tel que : <br>
          $${texNombrec(c * a)}x+${texNombrec(b * c)}=0$<br>
          <br>
          $${texNombrec(c * a)}x+${texNombrec(b * c)}-${miseEnEvidence(texNombrec(b * c))}=0-${miseEnEvidence(texNombrec(b * c))}$<br>
          <br>
          $${texNombrec(c * a)}x=-${texNombrec(b * c)}$<br>
          <br>
          $\\dfrac{${texNombrec(c * a)}x}{${miseEnEvidence(texNombrec(c * a))}}=-\\dfrac{${miseEnEvidence(texNombrec(b * c))}}{${miseEnEvidence(texNombrec(c * a))}}$<br>
          <br>         
           $x=-${texFractionReduite(b * c, c * a)}$<br>
           <br>  
           Le nombre que l'on doit choisir pour obtenir $0$ à la fin du programme est :  $-${texFractionReduite(b * c, c * a)}$.        
                     `
          break
        case 'typeE6':
          a = randint(2, 10)
          b = randint(2, 10)
          c = randint(2, 10, [a])
          d = prenom()
          e = prenom()

          texte = `${d} choisit un nombre, le multiplie par $${a}$ puis ajoute $${b}$.  <br>
           ${e} choisit le même nombre, lui ajoute $${c}$, multiplie le résultat par le nombre de départ, puis soustrait le carré du nombre de départ.<br>
            Quel nombre doivent-ils choisir au départ pour obtenir le même résultat ?`

          texteCorr = `En notant $x$ le nombre choisi au départ, on obtient avec le calcul de ${d} :<br>
      $${a}\\times x+${b}=${a}x+${b}$ ;<br>
      
      <br>
      Avec le calcul de ${e}, on obtient : <br>
      $(x+${c})\\times x-x^2=\\cancel{x^2}+${c}x-\\cancel{x^2}=${c}x$.<br>
      <br>
      On cherche donc $x$ tel que : <br>
      
      $${a}x+${b}=${c}x$<br>
      <br>
      $${a}x+${b}-${miseEnEvidence(texNombrec(c))}${miseEnEvidence('x')}=${c}x-${miseEnEvidence(texNombrec(c))}${miseEnEvidence('x')}$<br>
      <br>
      $${reduireAxPlusB(a - c, 0)}+${b}=0$<br>
      <br>
      $${reduireAxPlusB(a - c, 0)}+${b}-${miseEnEvidence(b)}=0-${miseEnEvidence(b)}$<br>
      <br>`
          if (a - c === 1) {
            texteCorr += `$x=-${b}$<br>
           Le nombre commun que ${d} et ${e} doivent choisir au départ pour obtenir le même résultat est : $-${b}$.
                  `
          } else {
            texteCorr += ` 
              $\\dfrac{${a - c}x}{${miseEnEvidence(a - c)}}=\\dfrac{${-b}}{${miseEnEvidence(a - c)}}$<br>  
      <br>
          $x=${texFractionReduite(-b, a - c)}$<br>
          Le nombre commun que ${d} et ${e} doivent choisir au départ pour obtenir le même résultat est : $${texFractionReduite(-b, a - c)}$.`
          }
          break

        case 'typeE7':
          a = randint(2, 8)

          b = randint(10, 100)

          texte = `On donne les deux programmes de calcul suivants :<br><br>
            <b> Programme 1 :</b><br>
                 `
          texte += itemize(['Choisir un nombre', `Ajouter $${a}$`, 'Prendre le carré du résultat'])

          texte += `<br><br>
                 <b> Programme 2 :</b><br>
                      `
          texte += itemize(['Choisir un nombre', `Multiplier par $${texNombrec(2 * a)}$ `, `Ajouter $${b}$`])
          texte += '<br>Déterminer les nombres éventuels que l\'on peut entrer dans ces deux programmes pour qu\'au final ils donnent le même résultat.<br><br>'
          texteCorr = `En notant $x$ le nombre choisi au départ : <br>
                 
                 On obtient avec le <b> programme 1 </b> :<br>
      $\\bullet$ Ajouter $${a}$ :&nbsp;&nbsp; $x+${a}$ ;<br>
      $\\bullet$ Prendre le carré du résultat :&nbsp;&nbsp; $(x+${a})^2=x^2+2\\times x\\times ${a}+${a}^2=x^2+${texNombrec(2 * a)}x+${texNombrec(a * a)}$ ;<br>
      
      <br>
      <br> On obtient avec le <b> programme 2 </b> :<br>
      $\\bullet$ Multiplier par $${texNombrec(2 * a)}$ :&nbsp;&nbsp; $x\\times ${texNombrec(2 * a)}=${texNombrec(2 * a)}x$ ;<br>
      $\\bullet$ Ajouter $${b}$ : &nbsp;&nbsp; $${texNombrec(2 * a)}x+${b}$.<br><br>
      Les deux programmes donnent le même résultat lorsque : <br>
      $x^2+${texNombrec(2 * a)}x+${texNombrec(a * a)}=${texNombrec(2 * a)}x+${b}$<br>
      <br>
      $x^2+${texNombrec(2 * a)}x+${texNombrec(a * a)}-${miseEnEvidence(texNombrec(2 * a))}${miseEnEvidence('x')}=${texNombrec(2 * a)}x+${b}-${miseEnEvidence(texNombrec(2 * a))}${miseEnEvidence('x')}$<br>
      <br>
      $x^2+${texNombrec(a * a)}=${b}$<br>
      <br>
      $x^2+${texNombrec(a * a)}-${miseEnEvidence(texNombrec(a * a))}=${b}-${miseEnEvidence(texNombrec(a * a))}$<br>
      <br>
      $x^2=${texNombrec(b - a * a)}$<br>
      <br>
            `
          if (b < a * a) {
            texteCorr += `
           L'équation n'a pas de solution car $${texNombrec(b - a * a)}<0$. <br>Par conséquent il n'existe pas de nombre qui donne le même résultat avec les deux programmes.
                  `
          } else {
            if (b === a * a) {
              texteCorr += `$x=-${b}$<br>
           $x=0$.<br>
           Quand on entre $0$, les deux programmes donnent le même résultat.
                  `
            } else {
              if (b - a * a === 1 || b - a * a === 4 || b - a * a === 9 || b - a * a === 16 || b - a * a === 25 || b - a * a === 36 || b - a * a === 49 || b - a * a === 64 || b - a * a === 81 || b - a * a === 100) {
                texteCorr += `$x=-${Math.sqrt(b - a * a)}$ ou $x=${Math.sqrt(b - a * a)}$.<br>
              Quand on entre $-${Math.sqrt(b - a * a)}$ ou $-${Math.sqrt(b - a * a)}$, on obtient le même résultat avec les deux programmes.
                  `
              } else {
                texteCorr += `$x=-\\sqrt{${b - a * a}}$ ou $x=\\sqrt{${b - a * a}}$.<br>
              Quand on entre   $-\\sqrt{${b - a * a}}$ ou $\\sqrt{${b - a * a}}$, on obtient le même résultat avec les deux programmes.
            `
              }
            }
          }
          break
        case 'typeE8':

          a = randint(2, 10)
          b = randint(2, 10)
          c = randint(2, 10)
          d = randint(2, 10)

          texte = `On donne les deux programmes de calcul suivants :<br><br>
              <b> Programme 1 :</b><br>
                   `
          texte += itemize(['Choisir un nombre', 'Prendre l\'opposé de ce nombre', `Multiplier par $${b}$`, `Ajouter $${a}$`])

          texte += `<br><br>
                   <b> Programme 2 :</b><br>
                        `
          texte += itemize(['Choisir un nombre', `Multiplier par $${c}$ `, `Ajouter $${d}$`])
          texte += `<br>On entre le même nombre dans chacun des deux programmes de calcul et on effectue le produit de ces deux nombres. <br>
              Quel(s) nombre(s) doit-on entrer pour que ce produit soit nul ?.<br><br>`
          texteCorr = `En notant $x$ le nombre choisi au départ : <br>
                   
                   On obtient avec le <b> programme 1 </b> :<br>
        $\\bullet$ Prendre l'opposé de ce nombre :&nbsp;&nbsp; $-x$ ;<br>
        $\\bullet$ Multiplier par $${b}$ :&nbsp;&nbsp; $${b}\\times x= -${b}x$ ;<br>
        $\\bullet$ Ajouter $${a}$ :&nbsp;&nbsp; $-${b}x+${a}$ ;<br>
        <br>
        <br> On obtient avec le <b> programme 2 </b> :<br>
        $\\bullet$ Multiplier par $${c}$ :&nbsp;&nbsp; $x\\times ${c}=${c}x$ ;<br>
        $\\bullet$ Ajouter $${d}$ : &nbsp;&nbsp; $${c}x+${d}$.<br><br>
        
        Le produit des deux nombres obtenu à l'issue de ces deux programmes est  : $(-${b}x+${a})(${c}x+${d})$<br>
        On cherche les valeurs de $x$ pour que ce produit soit nul c'est-à-dire les solutions de l'équation : $(-${b}x+${a})(${c}x+${d})=0$.<br>
        
        On reconnaît une équation produit nul.<br>
        ${texteEnCouleur('Un produit est nul si et seulement si au moins un de ses facteurs est nul.')}<br>
        
        
        $-${b}x+${a}=0$&nbsp;&nbsp; ou &nbsp;&nbsp; $${c}x+${d}=0$<br>
        <br>
        $-${b}x+${a}-${miseEnEvidence(a)}=0-${miseEnEvidence(a)}$&nbsp;&nbsp; ou &nbsp;&nbsp; $${c}x+${d}-${miseEnEvidence(d)}=0-${miseEnEvidence(d)}$<br>
        <br>
        $-${b}x=-${a}$&nbsp;&nbsp;&nbsp;&nbsp; ou &nbsp;&nbsp; $${c}x=${-d}$<br>
        <br>
        $\\dfrac{-${b}x}{${miseEnEvidence(-b)}}=\\dfrac{-${a}}{${miseEnEvidence(-b)}}$&nbsp;&nbsp; ou &nbsp;&nbsp; $\\dfrac{-${d}x}{${miseEnEvidence(c)}}=\\dfrac{-${d}}{${miseEnEvidence(c)}}$<br>
        <br>
        $x=${texFractionReduite(-a, -b)}$&nbsp;&nbsp; ou &nbsp;&nbsp; $x=${texFractionReduite(-d, c)}$<br>
        <br><br>
        On obtient $0$ en faisant le produit des deux résultats de ces programmes en choisissant comme nombres au départ : $${texFractionReduite(-a, -b)}$ ou $${texFractionReduite(-d, c)}$. 
              `

          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
