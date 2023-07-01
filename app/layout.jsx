import { AuthProvider } from '@/context/AuthContext'
import { ApiProvider } from '@/context/ApiContext'
import './globals.css'
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateLayout from '@/components/PrivateLayout';
import { useRouter } from 'next/navigation';
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
          <ApiProvider>
          <PrivateLayout>
          {children}
          </PrivateLayout>
          </ApiProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
