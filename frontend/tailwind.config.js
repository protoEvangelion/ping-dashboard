/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

export const content = [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
]
export const theme = {
    extend: {
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
                'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
    },
}
export const darkMode = 'class'
export const plugins = [nextui()]
