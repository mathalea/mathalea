import {choice,shuffle} from "/modules/outils.js"

/**
 * @Auteur Jean-Claude Lhote
 * @param {number} min Valeur minimum pour la solution
 * @param {number} max Valeur maximum pour la solution
 * Cette fonction produit aléatoirement un tirage de 5 nombres, une solution, un tableau contenant les calculs successifs, une chaine contenant l'expression mathador correspondante
 * @returns {array} [tirage=[a,b,c,d,e],solution (compris entre min et max),operations_successives=[string1,string2,string3,string4,string5],expression]
 * les string1 à 5 ainsi que l'expresion sont ) mettre en mode maths.
 * sert dans les exercices CM019,
 */
export default function Trouver_solution_mathador(
  min,
  max,
  A = 1,
  B = 4,
  C = 8,
  D = 3,
  E = 5
) {
  let eureka,
    a,
    b,
    c,
    d,
    e,
    tirage,
    nombres_restants,
    operations_restantes,
    expression_en_cours_f,
    expression_en_cours_d,
    op,
    part1_f,
    part2_f,
    part1_d,
    part2_d,
    operations_successives = [],
    solution;
  let liste_choix = [
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    6,
    6,
    6,
    6,
    7,
    7,
    8,
    8,
    8,
    8,
    9,
    9,
    9,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];
  eureka = false;
  let nb_determines = arguments.length - 2;
  while (eureka == false) {
    tirage = [];

    if (nb_determines < 1)
      a = parseInt(choice(liste_choix));
    else
      a = A;
    if (nb_determines < 2)
      b = parseInt(choice(liste_choix, [13, 14, 15, 16, 17, 18, 19, 20, a]));
    else
      b = B;
    if (nb_determines < 3)
      c = parseInt(
        choice(liste_choix, [12, 13, 14, 15, 16, 17, 18, 19, 20, a, b])
      );
    else
      c = C;
    if (nb_determines < 4)
      d = parseInt(
        choice(liste_choix, [12, 13, 14, 15, 16, 17, 18, 19, 20, b, c])
      );
    else
      d = D;
    if (nb_determines < 5)
      e = parseInt(choice(liste_choix, [12, 13, 14, 15, 16, 17, 18, 19, 20]));
    else
      e = E;
    tirage.push(a, b, c, d, e);
    nombres_restants = shuffle(tirage);
    operations_restantes = ["\\times", "+", "-", "\\div"];
    operations_restantes = shuffle(operations_restantes);
    expression_en_cours_f = [
      `${nombres_restants[0]}`,
      `${nombres_restants[1]}`,
      `${nombres_restants[2]}`,
      `${nombres_restants[3]}`,
      `${nombres_restants[4]}`,
    ];
    expression_en_cours_d = [
      `${nombres_restants[0]}`,
      `${nombres_restants[1]}`,
      `${nombres_restants[2]}`,
      `${nombres_restants[3]}`,
      `${nombres_restants[4]}`,
    ];

    while (nombres_restants.length > 1) {
      b = nombres_restants.pop();
      a = nombres_restants.pop();
      part2_f = expression_en_cours_f.pop();
      part1_f = expression_en_cours_f.pop();
      part2_d = expression_en_cours_d.pop();
      part1_d = expression_en_cours_d.pop();

      op = operations_restantes.pop();
      if (op == "\\times") {
        c = a * b;
        expression_en_cours_f.push(`${part1_f}${op}${part2_f}`);
        expression_en_cours_d.push(`${part1_d}${op}${part2_d}`);
        nombres_restants.push(c);
      } else if (op == "\\div") {
        if (a % b == 0) {
          c = a / b;
          if (part1_f[0] == "\\") {
            part1_f = part1_f.substring(6, part1_f.length);
            part1_f = part1_f.substring(0, part1_f.length - 7);
          }
          if (part2_f[0] == "\\") {
            part2_f = part2_f.substring(6, part2_f.length);
            part2_f = part2_f.substring(0, part2_f.length - 7);
          }
          expression_en_cours_f.push(`\\dfrac{${part1_f}}{${part2_f}}`);
          expression_en_cours_d.push(`${part1_d}${op}${part2_d}`);
          nombres_restants.push(c);
        } else
          break;
      } else if (op == "-") {
        if (a > b) {
          c = a - b;
          expression_en_cours_f.push(
            `\\left(${part1_f}${op}${part2_f}\\right)`
          );
          expression_en_cours_d.push(
            `\\left(${part1_d}${op}${part2_d}\\right)`
          );
          nombres_restants.push(c);
        } else
          break;
      } else if (op == "+") {
        c = a + b;
        if (part2_f.substring(0, 2) == "\\l") {
          part2_f = part2_f.substring(6, part2_f.length);
          part2_f = part2_f.substring(0, part2_f.length - 7);
        }
        expression_en_cours_f.push(`\\left(${part1_f}${op}${part2_f}\\right)`);
        if (part2_d.substring(0, 2) == "\\l") {
          part2_d = part2_d.substring(6, part2_d.length);
          part2_d = part2_d.substring(0, part2_d.length - 7);
        }
        expression_en_cours_d.push(`\\left(${part1_d}${op}${part2_d}\\right)`);
        nombres_restants.push(c);
      }
      operations_successives.push(`${a}` + op + `${b}=${c}`);
    }

    if (nombres_restants.length == 1 && operations_restantes.length == 0) {
      solution = nombres_restants[0];
      if (solution >= min && solution <= max) {
        eureka = true;
        if (expression_en_cours_f[0][0] == "\\" &&
          expression_en_cours_f[0][1] == `l`) {
          expression_en_cours_f[0] = expression_en_cours_f[0].substring(
            6,
            expression_en_cours_f[0].length
          );
          expression_en_cours_f[0] = expression_en_cours_f[0].substring(
            0,
            expression_en_cours_f[0].length - 7
          );
        }
        if (expression_en_cours_d[0][0] == "\\" &&
          expression_en_cours_d[0][1] == `l`) {
          expression_en_cours_d[0] = expression_en_cours_d[0].substring(
            6,
            expression_en_cours_d[0].length
          );
          expression_en_cours_d[0] = expression_en_cours_d[0].substring(
            0,
            expression_en_cours_d[0].length - 7
          );
        }
        return [
          tirage,
          solution,
          operations_successives,
          expression_en_cours_f,
          expression_en_cours_d,
        ];
      } else
        operations_successives = [];
    } else
      operations_successives = [];
  }
}
