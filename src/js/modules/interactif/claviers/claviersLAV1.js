const LAVKeyboardLayer1 = {
  lavLayer: {
    styles: '',
    rows: [
      [
        { label: 'mm', latex: '\\operatorname{mm}' },
        { label: 'cm', latex: '\\operatorname{cm}' },
        { class: 'separator w5' },
        { label: 'mm^2', latex: '\\operatorname{mm}^2' },
        { label: 'cm^2', latex: '\\operatorname{cm}^2' },
        { class: 'separator w5' },
        { label: 'mm^3', latex: '\\operatorname{mm}^3' },
        { label: 'cm^3', latex: '\\operatorname{cm}^3' }

      ],
      [
        { label: 'dm', latex: '\\operatorname{dm}' },
        { label: 'm', latex: '\\operatorname{m}' },
        { class: 'separator w5' },
        { label: 'dm^2', latex: '\\operatorname{dm}^2' },
        { label: 'm^2', latex: '\\operatorname{m}^2' },
        { class: 'separator w5' },
        { label: 'dm^3', latex: '\\operatorname{dm}^3' },
        { label: 'm^3', latex: '\\operatorname{m}^3' }
      ],
      [
        { label: 'dam', latex: '\\operatorname{dam}' },
        { label: 'hm', latex: '\\operatorname{hm}' },
        { class: 'separator w5' },
        { label: 'dam^2', latex: '\\operatorname{dam}^2' },
        { label: 'hm^2', latex: '\\operatorname{hm}^2' },
        { class: 'separator w5' },
        { label: 'dam^3', latex: '\\operatorname{dam}^3' },
        { label: 'hm^3', latex: '\\operatorname{hm}^3' }
      ],
      [
        { label: 'km', latex: '\\operatorname{km}' },

        { class: 'separator w15' },
        { label: 'km^2', latex: '\\operatorname{km}^2' },

        { class: 'separator w5' },
        { label: 'km^3', latex: '\\operatorname{km}^3' }

      ]
    ]
  }
}
const LAVKeyboard1 = {
  lavKeyboard: {
    label: 'Maths et unités', // Label displayed in the Virtual Keyboard Switcher
    tooltip: 'Clavier mathématique (unités)', // Tooltip when hovering over the label
    layer: 'lavLayer'
  }
}

export const clavierLAV1 = { // 1 seul clavier avec Volume, Aire et Longueur
  customVirtualKeyboardLayers: LAVKeyboardLayer1,
  customVirtualKeyboards: LAVKeyboard1,
  virtualKeyboards: 'lavKeyboard numeric roman',
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
