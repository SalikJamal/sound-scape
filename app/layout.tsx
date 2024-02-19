import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import "./globals.css"

const figTree = Figtree({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Soundscape",
  description: "Stream music from anywhere in the world"
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={figTree.className}>{children}</body>
    </html>
  )
}
