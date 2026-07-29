// Next.js App Router dynamic PWA manifest generator
// This file automatically outputs standard manifest.json metadata for installable PWA behavior.

export default function manifest() {
  return {
    name: 'GroomWise PWA',
    short_name: 'GroomWise',
    description: 'Personalized hairstyle scanner & skincare routine builder for men.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFDF6',
    theme_color: '#0F131F',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable'
      }
    ]
  }
}
