const massesKeyboardLayer = {
  massesLayer: {
    styles: '',
    rows: [
      [
        { label: 'dg', latex: '\\operatorname{dg}' },
        { label: 'cg', latex: '\\operatorname{cg}' },
        { label: 'mg', latex: '\\operatorname{mg}' },
        { class: 'separator w5' },
        { label: '7', key: '7' },
        { label: '8', key: '8' },
        { label: '9', key: '9' },
        { latex: '\\div' },
        { class: 'separator w5' },
        {
          class: 'tex small',
          label: '<span><i>x</i>&thinsp;²</span>',
          insert: '$$#@^{2}$$'
        },
        {
          class: 'tex small',
          label: '<span><i>x</i><sup>&thinsp;<i>3</i></sup></span>',
          insert: '$$#@^{3}$$'
        },
        {
          class: 'small',
          latex: '\\sqrt{#0}',
          insert: '$$\\sqrt{#0}$$'
        }
      ],
      [
        { label: 'hg', latex: '\\operatorname{hg}' },
        { label: 'dag', latex: '\\operatorname{dag}' },
        { label: 'g', latex: '\\operatorname{g}' },
        { class: 'separator w5' },
        { label: '4', latex: '4' },
        { label: '5', key: '5' },
        { label: '6', key: '6' },
        { latex: '\\times' },
        { class: 'separator w5' },
        { class: 'small', latex: '\\frac{#0}{#0}' },
        { label: '=', key: '=' },
        { latex: 'f' }
      ],
      [
        { class: 'separator w8' },
        { label: 'kg', latex: '\\operatorname{kg}' },
        { class: 'separator w15' },
        { label: '1', key: '1' },
        { label: '2', key: '2' },
        { label: '3', key: '3' },
        { latex: '-' },
        { class: 'separator w5' },
        { label: ';', key: ';' },
        { label: 'oui', key: 'oui' },
        { label: 'non', key: 'non' }
      ],
      [
        { class: 'separator w10' },
        // { class: 'separator w5' },
        // { class: 'separator' },
        { label: 't', latex: '\\operatorname{t}' },
        { label: 'q', latex: '\\operatorname{q}' },
        { class: 'separator w10' },
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
        { class: 'separator w5' }
      ]
    ]
  }
}
const massesKeyboard = {
  massesKeyboard: {
    label: 'Maths et masse', // Label displayed in the Virtual Keyboard Switcher
    tooltip: 'Clavier mathématique (masses)', // Tooltip when hovering over the label
    layer: 'massesLayer'
  }
}

export const clavierMasse = {
  customVirtualKeyboardLayers: massesKeyboardLayer,
  customVirtualKeyboards: massesKeyboard,
  virtualKeyboards: 'massesKeyboard roman',
  inlineShortcuts: {
    mg: { mode: 'math', value: '\\operatorname{mg}' },
    cg: { mode: 'math', value: '\\operatorname{cg}' },
    dg: { mode: 'math', value: '\\operatorname{dg}' },
    g: { mode: 'math', value: '\\operatorname{g}' },
    dag: { mode: 'math', value: '\\operatorname{dag}' },
    hg: { mode: 'math', value: '\\operatorname{hg}' },
    kg: { mode: 'math', value: '\\operatorname{kg}' },
    q: { mode: 'math', value: '\\operatorname{q}' },
    t: { mode: 'math', value: '\\operatorname{t}' },
    '*': { mode: 'math', value: '\\times' },
    '.': { mode: 'math', value: ',' }
  }
}
