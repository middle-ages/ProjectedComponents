import { LineStyles } from 'src/css';

export const argTypesOf = {
  At: {
    x: { control: { type: 'range', min: 0, max: 500, step: 10 } },
    y: { control: { type: 'range', min: 0, max: 500, step: 10 } },
    z: { control: { type: 'range', min: 0, max: 500, step: 10 } },
  },

  Bordered: {
    borderColor: { control: 'color' },
    borderStyle: {
      control: { type: 'select', options: LineStyles },
    },
    borderWidth: { control: { type: 'range', min: 0, max: 20, step: 1 } },
  },

  Text: {
    hPad: { control: { type: 'range', min: 0, max: 50, step: 1 } },
    text: { control: { type: 'text' } },
    fontSize: { control: { type: 'range', min: 6, max: 200, step: 2 } },
    fontFamily: {
      control: {
        type: 'select',
        options: ['Go', 'FiraCode Retina', 'Inter', 'PTSerif', 'Roboto'],
      },
    },
  },
} as const;
