import Layout from '@/components/layout'
import ClientProvider from './client-provider'
import RootHead from './head'

import '~/styles/index.css'
import '~/styles/normalize.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <RootHead />
      </head>
      <body>
        <ClientProvider>
          <Layout.Header />
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  )
}
