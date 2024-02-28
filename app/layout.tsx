import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import "@/app/globals.css"
import Sidebar from "@/components/sidebar"
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from "@/providers/UserProvider"
import ModalProvider from "@/providers/ModalProvider"
import ToasterProvider from "@/providers/ToasterProvider"
import getSongsByUserId from "@/actions/getSongsByUserId"
import Player from "@/components/player"
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices"

const figTree = Figtree({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Soundscape",
  description: "Stream music from anywhere in the world"
}

export const revalidate = 0


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userSongs = await getSongsByUserId()
  const products = await getActiveProductsWithPrices()
  return (
    <html lang="en">
      <body className={figTree.className}>
        <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider products={products} />
              <Sidebar songs={userSongs}>
                {children}
              </Sidebar>
              <Player />
            </UserProvider>
          </SupabaseProvider>
      </body>
    </html>
  )
}
