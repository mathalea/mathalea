const grecTrigoKeyboardLayer = {
  grecTrigoLayer: {
    styles: '',
    rows: [
      [
        { label: '\\alpha', latex: '\\alpha' },
        { label: '\\beta', latex: '\\beta' },
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
        { label: '\\gamma', latex: '\\gamma' },
        { label: '\\delta', latex: '\\delta' },
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
        { label: '\\epsilon', latex: '\\epsilon' },
        { label: '\\theta', latex: '\\theta' },
        { class: 'separator w5' },
        { label: '1', key: '1' },
        { label: '2', key: '2' },
        { label: '3', key: '3' },
        { latex: '-' },
        { class: 'separator w5' },
        { label: 'cos', key: 'cos(' },
        { label: 'sin', key: 'sin(' },
        { label: 'tan', key: 'tan(' }
      ],
      [
        { label: '\\lambda', latex: '\\lambda' },
        { label: '\\omega', latex: '\\omega' },
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
        }
      ]
    ]
  }
}
const grecTrigoKeyboard = {
  grecTrigoKeyboard: {
    label: 'Maths', // Label displayed in the Virtual Keyboard Switcher
    tooltip: 'Clavier mathématique (lettres grecTrigoques)', // Tooltip when hovering over the label
    layer: 'grecTrigoLayer'
  }
}
export const clavierTrigo = {
  customVirtualKeyboardLayers: grecTrigoKeyboardLayer,
  customVirtualKeyboards: grecTrigoKeyboard,
  virtualKeyboards: 'grecTrigoKeyboard roman',
  inlineShortcuts: {
    alpha: { mode: 'math', value: '\\alpha' },
    beta: { mode: 'math', value: '\\beta' },
    gamma: { mode: 'math', value: '\\gamma' },
    delta: { mode: 'math', value: '\\delta' },
    epsilon: { mode: 'math', value: '\\epsilon' },
    theta: { mode: 'math', value: '\\theta' },
    omega: { mode: 'math', value: '\\omega' },
    lambda: { mode: 'math', value: '\\lambda' },
    '*': { mode: 'math', value: '\\times' },
    '.': { mode: 'math', value: ',' },
    cos: { mode: 'math', value: 'cos(' },
    sin: { mode: 'math', value: 'sin(' },
    tan: { mode: 'math', value: 'tan(' }
  }
}
