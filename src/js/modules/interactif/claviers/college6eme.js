// Définit un clavier personnalisé cf https://cortexjs.io/mathlive/guides/virtual-keyboards/
const college6emeKeyboardLayer = {
  college6emeLayer: {
    styles: '',
    rows: [
      [
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
        { label: '%', key: '%' },
        { label: '°', latex: '\\operatorname{°}' },
        { latex: '(' },
        { latex: ')' },
        { class: 'separator w5' }
      ],
      [
        { class: 'separator w5' },
        { label: '4', latex: '4' },
        { label: '5', key: '5' },
        { label: '6', key: '6' },
        { latex: '\\times' },
        { class: 'separator w10' },
        { label: 'oui', key: 'oui' },
        { label: 'non', key: 'non' },
        { label: ';', key: ';' },
        { class: 'separator w10' }
      ],
      [
        { class: 'separator w5' },
        { label: '1', key: '1' },
        { label: '2', key: '2' },
        { label: '3', key: '3' },
        { latex: '-' },
        { class: 'separator w15' },
        {
          class: 'w20',
          label: 'espace', // Espace
          insert: '\\,'
        },
        { class: 'separator w15' }
      ],
      [
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

const college6emeKeyboard = {
  college6emeKeyboard: {
    label: 'Maths', // Label displayed in the Virtual Keyboard Switcher
    tooltip: 'Clavier mathématique', // Tooltip when hovering over the label
    layer: 'college6emeLayer'
  }
}

export const clavierCollege6eme = {
  customVirtualKeyboardLayers: college6emeKeyboardLayer,
  customVirtualKeyboards: college6emeKeyboard,
  virtualKeyboards: 'college6emeKeyboard roman',
  virtualKeyboardLayout: 'azerty',
  mathModeSpace: '\\,',
  inlineShortcuts: {
    D: { mode: 'math', value: 'd' },
    '*': { mode: 'math', value: '\\times' },
    '.': { mode: 'math', value: ',' },
    pi: { mode: 'math', value: '\\pi' },
    ang: { mode: 'math', value: '\\widehat{#0}' },
    frac: { mode: 'math', value: '\\frac{#0}{#1}' }
  },
  // virtualKeyboards: 'numeric roman',
  virtualKeyboardMode: 'manual'
  // "auto": on touch-enabled devices, show the virtual keyboard panel when the mathfield is focused, otherwise, don’t show it.
  // "manual": a toggle button to control the virtual keyboard panel is displayed in the mathfield
  // "onfocus": the virtual keyboard panel is displayed when the mathfield is focused
  // "off": never show the virtual keyboard panel
}
