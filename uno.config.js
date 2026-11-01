import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
  theme: {
    colors: {
        'white': "#F4F2EC",
        'gray': "#8B918E",
        'teal': "#2BC7A4",
        'deep-teal': "#16524A",
        'ink': "#111816"
    }
  },
  fontFamily: {
    sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
  }
})