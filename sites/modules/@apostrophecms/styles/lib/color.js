// Beekeeping platform: the defaults are a honey palette rather than the
// public-demo blues. Keep them in step with asset/ui/src/_variables.scss.
const darkColors = [ '#000000', '#232323', '#343434', '#464646', '#575757', '#7a7a7a' ];
const lightColors = [ '#f8f9fa', '#dee2e6', '#adb5bd', '#6c757d', '#495057' ];
const strongAccents = [
  '#a35a00',
  '#f0a830',
  '#6b8e23',
  '#5e5bd7',
  '#ec5ac0',
  '#efc799',
  '#ed7165',
  '#ecd9bf',
  '#5dae89',
  '#eb5159',
  '#f3eee9'
];
const surfaceLight = [ '#fbf1dc', '#dd6e42', '#e8dab2', '#4f6d7a', '#c0d6df', '#eaeaea' ];
const surfaceDark = [ '#261d12', '#5a3b72', '#3f2d76', '#081664', '#04447b', '#065c6c' ];
export default {
  fields: {
    defaultColorLight: {
      type: 'color',
      label: 'project:textColor',
      help: 'project:textColorHelp',
      selector: ':root',
      property: '--default-color',
      def: '#4a3c2e',
      options: {
        presetColors: darkColors
      }
    },
    headingColorLight: {
      type: 'color',
      label: 'project:headingColor',
      help: 'project:headingColorHelp',
      selector: ':root',
      property: '--heading-color',
      def: '#3a2508',
      options: {
        presetColors: darkColors
      }
    },
    faintColorLight: {
      type: 'color',
      label: 'project:softAccent',
      help: 'project:softAccentHelp',
      selector: ':root',
      property: '--faint-color',
      def: '#efe4cc',
      options: {
        presetColors: darkColors
      }
    },
    accentColorLight: {
      type: 'color',
      label: 'project:strongAccent',
      help: 'project:strongAccentHelp',
      selector: ':root',
      property: '--accent-color',
      def: '#a35a00',
      options: {
        presetColors: strongAccents
      }
    },
    contrastColorLight: {
      type: 'color',
      label: 'project:contrastColor',
      help: 'project:contrastColorHelp',
      selector: ':root',
      property: '--contrast-color',
      def: '#ffffff',
      options: {
        presetColors: lightColors
      }
    },
    backgroundColorLight: {
      type: 'color',
      label: 'project:pageBackground',
      selector: ':root',
      property: '--background-color',
      def: '#fffdf7',
      options: {
        presetColors: lightColors
      }
    },
    surfaceColorLight: {
      type: 'color',
      label: 'project:surfaceBackground',
      help: 'project:surfaceBackgroundHelp',
      selector: ':root',
      property: '--surface-color',
      def: '#fbf1dc',
      options: {
        presetColors: surfaceLight

      }
    },
    defaultColorDark: {
      type: 'color',
      label: 'project:textColor',
      help: 'project:textColorHelp',
      selector: '.dark',
      property: '--default-color',
      def: '#f1e6d2',
      options: {
        presetColors: lightColors
      }
    },
    headingColorDark: {
      type: 'color',
      label: 'project:headingColor',
      help: 'project:headingColorHelp',
      selector: '.dark',
      property: '--heading-color',
      def: '#ffffff',
      options: {
        presetColors: lightColors
      }
    },
    faintColorDark: {
      type: 'color',
      label: 'project:softAccent',
      help: 'project:softAccentHelp',
      selector: '.dark',
      property: '--faint-color',
      def: '#3a3024',
      options: {
        presetColors: darkColors
      }
    },
    accentColorDark: {
      type: 'color',
      label: 'project:strongAccent',
      help: 'project:strongAccentHelp',
      selector: '.dark',
      property: '--accent-color',
      def: '#f0a830',
      options: {
        presetColors: strongAccents
      }
    },
    contrastColorDark: {
      type: 'color',
      label: 'project:contrastColor',
      help: 'project:contrastColorHelp',
      selector: '.dark',
      property: '--contrast-color',
      def: '#1f1608',
      options: {
        presetColors: lightColors
      }
    },
    backgroundColorDark: {
      type: 'color',
      label: 'project:pageBackground',
      selector: '.dark',
      property: '--background-color',
      def: '#17120b',
      options: {
        presetColors: darkColors
      }
    },
    surfaceColorDark: {
      type: 'color',
      label: 'project:surfaceBackground',
      help: 'project:surfaceBackgroundHelp',
      selector: '.dark',
      property: '--surface-color',
      def: '#261d12',
      options: {
        presetColors: surfaceDark
      }
    }
  },
  group: {
    colors: {
      label: 'project:colors',
      group: {
        lightMode: {
          label: 'project:lightMode',
          fields: [
            'defaultColorLight',
            'headingColorLight',
            'faintColorLight',
            'accentColorLight',
            'contrastColorLight',
            'backgroundColorLight',
            'surfaceColorLight'
          ]
        },
        darkMode: {
          label: 'project:darkMode',
          fields: [
            'defaultColorDark',
            'headingColorDark',
            'faintColorDark',
            'accentColorDark',
            'contrastColorDark',
            'backgroundColorDark',
            'surfaceColorDark'
          ]
        }
      }
    }
  }
};
