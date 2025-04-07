import Header from '@/components/Header/Header'
import { ReactNode } from 'react'
import '@/assets/core/globals.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <div>
          <Header></Header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
