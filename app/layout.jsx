import { AuthProvider } from '@/context/AuthContext'
import './globals.css'
import { Inter } from 'next/font/google';
const inter = Inter({
  weight: ['400','500','600','700'],
  subsets: ['latin'],
  display: 'swap',
})


export const metadata = {
  title: `Chadify`,
  description: 'A Chatbot powered by open-ai which acts as an assistant of a software developer.',
}

export default function RootLayout({ children }) {
  return (
    <html className={inter.className} lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
