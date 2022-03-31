// Définit un clavier personnalisé cf https://cortexjs.io/mathlive/guides/virtual-keyboards/
const collegeKeyboardLayer = {
  collegeLayer: {
    styles: '',
    rows: [
      [
        { latex: 'a' },
        { latex: 'x' },
        { class: 'separator w5' },
        { label: '7', key: '7' },
        // Will display the label using the system font. To display
        // with the TeX font, use:
        // { class: "tex", label: "7", key: "7" },
        // or
        // { latex: "7"},
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
        },
        {
          class: 'small',
          latex: '\\times10^{#0}',
          insert: '$$\\times10^#0$$'
        }
      ],
      [
        { class: 'tex', latex: 'b' },
        { class: 'tex', latex: 'y' },
        { class: 'separator w5' },
        { label: '4', latex: '4' },
        { label: '5', key: '5' },
        { label: '6', key: '6' },
        { latex: '\\times' },
        { class: 'separator w5' },
        { class: 'small', latex: '\\frac{#0}{#0}' },
        { label: '=', key: '=' },
        { latex: 'f' },
        {
          class: 'small',
          latex: '#0^{#1}',
          insert: '$$#0^{#1}$$'
        }
      ],
      [
        { class: 'tex', label: '<i>c</i>' },
        { class: 'tex', label: '<i>z</i>' },
        { class: 'separator w5' },
        { label: '1', key: '1' },
        { label: '2', key: '2' },
        { label: '3', key: '3' },
        { latex: '-' },
        { class: 'separator w5' },
        { label: ';', key: ';' },
        { label: 'oui', key: 'oui' },
        { label: 'non', key: 'non' },
        { label: '%', key: '%' }
      ],
      [
        { latex: '(' },
        { latex: ')' },

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
        }
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

export const clavierCollege = {
  customVirtualKeyboardLayers: collegeKeyboardLayer,
  customVirtualKeyboards: collegeKeyboard,
  virtualKeyboards: 'collegeKeyboard roman',
  inlineShortcuts: {
    D: { mode: 'math', value: 'd' },
    '*': { mode: 'math', value: '\\times' },
    '.': { mode: 'math', value: ',' },
    '%': { mode: 'math', value: '\\%' }
  },
  // virtualKeyboards: 'numeric roman',
  virtualKeyboardMode: 'manual'
  // "auto": on touch-enabled devices, show the virtual keyboard panel when the mathfield is focused, otherwise, don’t show it.
  // "manual": a toggle button to control the virtual keyboard panel is displayed in the mathfield
  // "onfocus": the virtual keyboard panel is displayed when the mathfield is focused
  // "off": never show the virtual keyboard panel
}
