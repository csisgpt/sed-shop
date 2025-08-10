import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
  content: ['./**/*.{vue,ts}', '../../packages/shared-ui/**/*.{vue,ts}'],
  theme: {
    extend: {}
  },
  plugins: [forms, typography]
}
