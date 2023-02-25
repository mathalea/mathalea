// Définit un clavier personnalisé cf https://cortexjs.io/mathlive/guides/virtual-keyboards/
const collegeKeyboardLayer = {
  collegeLayer: {
    styles: '',
    rows: [
      [
        { label: '7', key: '7' },
        { label: '8', key: '8' },
        { label: '9', key: '9' },
        { class: 'separator w5' },
        { label: 'h' }
      ],
      [
        { label: '4', latex: '4' },
        { label: '5', key: '5' },
        { label: '6', key: '6' },
        { class: 'separator w5' },
        { label: 'min', insert: '{\\:\\text{min}\\:}' }
      ],
      [
        { label: '1', key: '1' },
        { label: '2', key: '2' },
        { label: '3', key: '3' },
        { class: 'separator w5' },
        { label: 's', insert: '{\\:\\text{s}\\:}' }
      ],
      [
        { label: '0', key: '0' },
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
        { class: 'separator w15' }
      ]
    ]
  }
}

const collegeKeyboard = {
  collegeKeyboard: {
    label: 'Maths', // Label displayed in the Virtual Keyboard Switcher
    tooltip: 'Clavier mathématique', // Tooltip when hovering over the label
    layer: 'collegeLayer'
  }
}

export const clavierHms = {
  customVirtualKeyboardLayers: collegeKeyboardLayer,
  customVirtualKeyboards: collegeKeyboard,
  virtualKeyboards: 'collegeKeyboard',
  inlineShortcuts: {
    D: { mode: 'math', value: 'd' },
    h: { mode: 'text', value: '{\\:\\text{h}\\:}' },
    H: { mode: 'text', value: '{\\:\\text{h}\\:}' },
    min: { mode: 'text', value: '{\\:\\text{min}\\:}' },
    MIN: { mode: 'text', value: '{\\:\\text{min}\\:}' },
    s: { mode: 'text', value: '{\\:\\text{s}\\:}' },
    S: { mode: 'text', value: '{\\:\\text{s}\\:}' },
    '*': { mode: 'math', value: '\\times' },
    '.': { mode: 'math', value: ',' },
    '%': { mode: 'math', value: '\\%' },
    '²': { mode: 'math', value: '^2' },
    '³': { mode: 'math', value: '^3' },
    pi: { mode: 'math', value: '\\pi' },
    ang: { mode: 'math', value: '\\widehat{#0}' },
    rac: { mode: 'math', value: '\\sqrt{#0}' },
    frac: { mode: 'math', value: '\\frac{#0}{#1}' },
    '<': '<',
    '>': '>',
    '>=': '\\geq',
    '<=': '\\leq',
    '(': '\\lparen',
    ')': '\\rparen'
  },
  virtualKeyboardMode: 'manual'
}
