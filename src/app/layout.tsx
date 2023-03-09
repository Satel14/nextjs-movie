import './globals.css'

export const metadata = {
  title: 'Nextjs-Movie',
  description: 'Browse and search for movies on Nextjs-Movie. Read movie reviews, watch trailers, and find your next favorite movie. Fast, responsive, and user-friendly.',
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
