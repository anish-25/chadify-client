'use client'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({
  weight: ['400','500','600','700'],
  subsets: ['latin'],
  display: 'swap',
})


export const metadata = {
  title: `Chad-GPT | Talk to Anish's Assistant`,
  description: 'A Chatbot powered by open-ai which acts as an assistant of a software developer.',
}

export default function RootLayout({ children }) {
  return (
    <html className={inter.className} lang="en">
      <body>
        <AuthProvider>
        <ToastContainer enableMultiContainer={false} />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
