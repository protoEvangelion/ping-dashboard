/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  bracketSpacing: true,
  semi: false,
  singleQuote: true,
  tabWidth: 4,
  trailingComma: 'es5',
  useTabs: false,
}

export default config
