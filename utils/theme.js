import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: '#1E5FC8',
      dark: '#0a2047',
    },
    secondary: {
      main: '#19857b',
    },
    active: {
      main: '#325da8',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      dark: '#0a2047',
    },
    icons: {
      main: '#c9daf6',
      gray: '#757575',
      silver: '#BBBBBB',
      black: '#000000',
      carrotOrange: '#F38A1B',
      cerulean: '#0A8DCC',
      pomegranate: '#EE4727',
      greenHaze: '#009F40',
      persianGreen: '#05A7A1',
      plum: '#8d2f88',
      azure: '#2F5FA2',
      emperor: '#515151',
      gallery: '#EEEEEE',
      wildSand: '#F5F5F5',
    },
    ptTable: {
      aluminium: '#A7A9AC',
      mercury: '#E6E6E6',
      madison: '#072C59',
      scooter: '#30A3CE',
      flamingo: '#F05323',
      denim: '#157CB9',
      sushi: '#75B048',
      manhattan: '#F7BF87',
    },
  },
  mixins: {
    toolbar: {
      height: 67,
    },
    classesBar: {
      height: 132,
    },
  },
  overrides: {
    MuiTableContainer: {
      root: {
        border: 'none',
      },
    },
  },
})

export default theme
