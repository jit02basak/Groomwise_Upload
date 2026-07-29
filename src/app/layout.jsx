// Root layout — replaces src/main.jsx + src/App.jsx
// This wraps every page in the app (Navbar is rendered here so it persists across routes)

import './globals.css'
import Navbar from '../components/common/Navbar'
import ThemeProvider from '../components/common/ThemeProvider'
import ServiceWorkerRegister from '../components/common/ServiceWorkerRegister'
import ScrollRestoration from '../components/common/ScrollRestoration'

// Next.js metadata — controls the <title> and <meta description> tags
export const metadata = {
  title: 'GroomWise',
  description: 'Find hairstyles and skincare routines that suit your face and skin.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ServiceWorkerRegister />
          <ScrollRestoration />
          {/* Outer wrapper — matches light theme, switches background and text color in dark mode */}
          <div className="container bg-[#FFFDF6] dark:bg-zinc-950 text-[#0F131F] dark:text-zinc-50 flex flex-col items-center min-h-screen transition-colors duration-300">
            <Navbar />
            {/* Each page's content renders here */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
