/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#1A1A1A', // Navbar, Footer, Background utama
        'secondary-dark': '#2C2C2C', // Background kartu, form, modal
        'primary-light': '#FFFFFF', // Teks utama di dark background, background konten
        'text-dark': '#333333', // Teks utama di light background
        'text-muted': '#AAAAAA', // Teks sekunder/deskripsi
        'accent-red': '#E00000', // Aksen merah untuk slider, warning
        'accent-gold': '#D4AF37', // Aksen emas untuk logo, judul, highlight
        'border-light': '#E0E0E0', // Garis batas halus di light background
        'border-dark': '#555555', // Garis batas halus di dark background
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
