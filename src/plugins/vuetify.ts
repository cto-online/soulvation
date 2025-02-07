import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#5D87FF',
          secondary: '#49BEFF',
          accent: '#0d6efd',
          surface: '#FFFFFF',
          textPrimary: '#2A3547',
        },
      },
    },
  },
})