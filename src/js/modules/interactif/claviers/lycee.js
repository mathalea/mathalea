// Définit un clavier personnalisé cf https://cortexjs.io/mathlive/guides/virtual-keyboards/
const lyceeKeyboardLayer = {
  lyceeLayer: {
    styles: '',
    rows: [
      [
        /*
    inf: { mode: 'math', value: '\\infty' },
    union: { mode: 'math', value: '\\bigcup' },
    intersection: { mode: 'math', value: '\\bigcap' },
    sauf: { mode: 'math', value: '\\backslash\\{\\}' }
  */

        { class: 'small', latex: '\\bigcup' }, /// Union
        { class: 'small', latex: '\\bigcap' }, /// Intersection
        {
          class: 'small',
          latex: '\\backslash\\{#0\\}',
          insert: '$$\\backslash\\{#0\\}$$' /// Privé de
        },
        {
          class: 'small',
          latex: '\\tbinom{#0}{#1}',
          insert: '$$\\tbinom{#0}{#1}$$' /// p parmi n
        },
        {
          class: 'small',
          latex: 'P_{#0}({#1})',
          insert: '$$P_{#0}({#1})$$' /// P de A sachant B
        },
        { class: 'separator w5' },
        { label: '7', key: '7' },
        { label: '8', key: '8' },
        { label: '9', key: '9' },
        { latex: '\\div' },
        { class: 'separator w5' },
        {
          class: 'small',
          latex: '\\sqrt{#0}',
          insert: '$$\\sqrt{#0}$$' /// Racine carrée
        },
        {
          class: 'small',
          latex: '#0^{2}',
          insert: '$$#0^2$$' /// Puissance 2
        },
        {
          class: 'small',
          latex: '#0^{3}',
          insert: '$$#0^3$$' /// Puissance 3
        },
        {
          class: 'small',
          latex: '#0^{#1}',
          insert: '$$#0^#1$$' /// Puissance n
        },
        {
          class: 'small',
          latex: '#0_{#1}',
          insert: '$$#0_{#1}$$' /// Indice n
        },
        { class: 'separator w10' }

      ],
      [
        {
          class: 'small',
          latex: 'f(#0)',
          insert: '$$f(#0)$$' /// f(...)
        },
        {
          class: 'small',
          latex: '\\lim_{#0\\to\\ #1}',
          insert: '$$\\lim_{#0\\to\\ #1}}$$' /// Limite
        },
        {
          class: 'small',
          latex: '\\int_{#0}^{#1}',
          insert: '$$\\int_#0^#1$$' /// Intégrale
        },
        {
          class: 'small',
          latex: '\\sum_{#0}^{#1}',
          insert: '$$\\sum_#0^#1$$' /// Somme
        },
        { latex: '\\infin' },
        { class: 'separator w5' },
        { label: '4', latex: '4' },
        { label: '5', key: '5' },
        { label: '6', key: '6' },
        { latex: '\\times' },
        { class: 'separator w5' },
        { class: 'small', latex: '\\frac{#0}{#0}' },
        { label: '=', key: '=' },
        {
          class: 'small',
          latex: '\\widehat{#0}',
          insert: '$$\\widehat{#0}$$' /// Angle
        },
        {
          class: 'small',
          latex: '\\overrightarrow{#0}',
          insert: '$$\\overrightarrow#0$$' /// Vecteur
        },
        { latex: '<' },
        { latex: '>' }

      ],
      [
        { class: 'separator w10' },
        {
          class: 'small',
          latex: '(#0)',
          insert: '$$(#0)$$' /// Parenthèses
        },
        {
          class: 'small',
          latex: '[#0]',
          insert: '$$[#0]$$' /// Crochets
        },
        {
          class: 'small',
          latex: '\\{#0\\}',
          insert: '$$\\{#0\\}$$' /// Accolades
        },
        { class: 'separator w15' },
        { label: '1', key: '1' },
        { label: '2', key: '2' },
        { label: '3', key: '3' },
        { latex: '-' },
        { class: 'separator w5' },
        { label: ';', key: ';' },
        { label: 'oui', key: 'oui' },
        { label: 'non', key: 'non' },
        { label: '%', key: '%' },
        { latex: '\\leq' },
        { latex: '\\geq' }
      ],
      [
        { latex: '\\mathbb{C}' },
        { latex: '\\mathbb{R}' },
        { latex: '\\mathbb{Q}' },
        { latex: '\\mathbb{Z}' },
        { latex: '\\mathbb{N}' },
        { class: 'separator w5' },
        { label: '0', key: '0' },
        { latex: ',' },
        { latex: '\\pi' },
        { latex: '+' },
        { class: 'separator w5' },
        {
          class: 'action',
          label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
          command: ['performWithFeedback', 'moveToPreviousChar']
        },
        {
          class: 'action',
          label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
          command: ['performWithFeedback', 'moveToNextChar']
        },
        {
          class: 'action font-glyph',
          label: '&#x232b;',
          command: ['performWithFeedback', 'deleteBackward']
        },
        {
          class: 'action font-glyph',
          label: '&#10006;',
          command: ['toggleVirtualKeyboard', 'toggleVirtualKeyboard']
        },
        { class: 'separator w10' },
        { class: 'separator w10' }

      ]
    ]
  }
}

const lyceeKeyboard = {
  lyceeKeyboard: {
    label: 'Maths', // Label displayed in the Virtual Keyboard Switcher
    tooltip: 'Clavier mathématique', // Tooltip when hovering over the label
    layer: 'lyceeLayer'
  }
}

export const clavierLycee = {
  customVirtualKeyboardLayers: lyceeKeyboardLayer,
  customVirtualKeyboards: lyceeKeyboard,
  virtualKeyboards: 'lyceeKeyboard roman',
  inlineShortcuts: {
    D: { mode: 'math', value: 'd' },
    '*': { mode: 'math', value: '\\times' },
    '.': { mode: 'math', value: ',' },
    '%': { mode: 'math', value: '\\%' },
    '(': { mode: 'math', value: '(#0)' },
    '{': { mode: 'math', value: '\\{#0\\}' },
    inf: { mode: 'math', value: '\\infty' },
    union: { mode: 'math', value: '\\bigcup' },
    inter: { mode: 'math', value: '\\bigcap' },
    sauf: { mode: 'math', value: '\\backslash\\{#0\\}' },
    integ: { mode: 'math', value: '\\int_#0^#1' },
    lim: { mode: 'math', value: '\\lim_{#0\\to\\ #1}}' },
    som: { mode: 'math', value: '\\sum_#0^#1' },
    Un: { mode: 'math', value: 'U_n' },
    ln: { mode: 'math', value: '\\ln' },
    exp: { mode: 'math', value: 'e^#0' }, //
    parmi: { mode: 'math', value: '\\tbinom{#0}{#1}' },
    pasachantb: { mode: 'math', value: 'P_{#0}({#1})' },
    ang: { mode: 'math', value: '\\widehat{#0}' },
    rac: { mode: 'math', value: '\\sqrt{#0}' },
    frac: { mode: 'math', value: '\\frac{#0}{#1}' },
    vec: { mode: 'math', value: '\\overrightarrow{#0}' },
    pow: { mode: 'math', value: '#0^{#1}' },
    '<': '<',
    '>': '>',
    '>=': '\\geq',
    '<=': '\\leq',
    gdC: { mode: 'math', value: '\\mathbb{C}' },
    gdR: { mode: 'math', value: '\\mathbb{R}' },
    gdQ: { mode: 'math', value: '\\mathbb{Q}' },
    gdZ: { mode: 'math', value: '\\mathbb{Z}' },
    gdN: { mode: 'math', value: '\\mathbb{N}' }
  },
  // virtualKeyboards: 'numeric roman',
  virtualKeyboardMode: 'manual'
  // "auto": on touch-enabled devices, show the virtual keyboard panel when the mathfield is focused, otherwise, don’t show it.
  // "manual": a toggle button to control the virtual keyboard panel is displayed in the mathfield
  // "onfocus": the virtual keyboard panel is displayed when the mathfield is focused
  // "off": never show the virtual keyboard panel
}
