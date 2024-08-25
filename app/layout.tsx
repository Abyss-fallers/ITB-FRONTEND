import Layout from '@/components/layout'
import { Inter } from 'next/font/google'
import ClientProvider from './client-provider'

import '@/styles/vendor/index.css'
import '@/styles/vendor/normalize.css'
import RootHead from './head'

const font = Inter({ subsets: ['latin'], weight: ['400'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <RootHead></RootHead>
      <body className={font.className}>
        <ClientProvider>
          <Layout.Header />
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  )
}
