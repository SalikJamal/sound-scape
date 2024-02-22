"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import Box from "@/components/box"
import SidebarItem from "@/components/sidebar-item"
import Library from "@/components/library"

interface ISidebarProps {
    children: React.ReactNode;
}


export default function Sidebar({ children }: ISidebarProps) {

    const pathname = usePathname()

    const routes = useMemo(() => [
        {
            label: "Home",
            active: pathname !== "/search",
            href: "/",
            icon: HiHome
        },
        {
            label: "Search",
            active: pathname === "/search",
            href: "/search",
            icon: BiSearch
        }    
    ], [pathname])

    return (
        <div className="flex h-full">
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((route) => (
                            <SidebarItem 
                                key={route.label}
                                {...route}
                            />
                        ))}
                    </div>
                    
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
}