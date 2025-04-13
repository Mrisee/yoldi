import { headers } from 'next/headers'
import { api } from '@/lib/api'
import { User } from '@/types/user'
import { ReactNode } from 'react'
import { Header } from '@/components/Header'
import '@/assets/core/globals.css'
import { AuthProvider } from '@/context/AuthContext'

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const headerList = headers()
  const token = (await headerList).get('X-API-KEY')

  let currentUser: User | null = null

  if (token) {
    try {
      currentUser = await api<User>('/api/profile', {
        headers: {
          'X-API-KEY': token,
        },
      })
    } catch (err) {
      console.error('Ошибка получения профиля на сервере:', err)
    }
  }

  return (
    <html lang='ru'>
      <body>
        <AuthProvider initialUser={currentUser} initialToken={token}>
          <div className='layout'>
            <Header />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
