import React from 'react'
import './styles.css'

export const metadata = {
  description:
    'Board & Barter keeps your tabletop collection trades organized with a BoardGameGeek-inspired control room.',
  title: 'Board & Barter | Gameboard Exchange',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
