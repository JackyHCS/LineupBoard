import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LineupBoard',
  description: 'LineupBoard - Your lineup management platform',
  icons: {
    icon: '/assets/logo.JPG',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

