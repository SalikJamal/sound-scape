import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar"
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from "@/providers/UserProvider"
import ModalMProvider from "@/providers/ModalProvider"
import ToasterProvider from "@/providers/ToasterProvider"

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
      <body className={figTree.className}>
        <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalMProvider />
              <Sidebar>
                {children}
              </Sidebar>
            </UserProvider>
          </SupabaseProvider>
      </body>
    </html>
  )
}
