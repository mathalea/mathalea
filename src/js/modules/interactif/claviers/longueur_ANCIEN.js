const longueursKeyboardLayer = {
  longueursLayer: {
    styles: '',
    rows: [
      [
        { label: 'mm', latex: '\\operatorname{mm}' },
        { label: 'cm', latex: '\\operatorname{cm}' },
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
        { label: 'dm', latex: '\\operatorname{dm}' },
        { label: 'm', latex: '\\operatorname{m}' },
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
        { label: 'dam', latex: '\\operatorname{dam}' },
        { label: 'hm', latex: '\\operatorname{hm}' },
        { class: 'separator w5' },
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
        { label: 'km', latex: '\\operatorname{km}' },

        { class: 'separator w15' },
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
const LongueursKeyboard = {
  longueursKeyboard: {
    label: 'Longueurs', // Label displayed in the Virtual Keyboard Switcher
    tooltip: 'Clavier mathématique (longueurs)', // Tooltip when hovering over the label
    layer: 'longueursLayer'
  }
}

export const clavierLongueur = {
  customVirtualKeyboardLayers: longueursKeyboardLayer,
  customVirtualKeyboards: LongueursKeyboard,
  virtualKeyboards: 'longueursKeyboard roman',
  inlineShortcuts: {
    mm: { mode: 'math', value: '\\operatorname{mm}' },
    cm: { mode: 'math', value: '\\operatorname{cm}' },
    dm: { mode: 'math', value: '\\operatorname{dm}' },
    m: { mode: 'math', value: '\\operatorname{m}' },
    dam: { mode: 'math', value: '\\operatorname{dam}' },
    hm: { mode: 'math', value: '\\operatorname{hm}' },
    km: { mode: 'math', value: '\\operatorname{km}' },
    '*': { mode: 'math', value: '\\times' },
    '.': { mode: 'math', value: ',' }
  }
}
