"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import Box from "./Box"

interface SidebarProps {
    children: React.ReactNode;
}


export default function Sidebar({ children }: SidebarProps) {

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
                    Sidebar Navigation
                </Box>
            </div>
        </div>
    )
}