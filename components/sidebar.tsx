"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"

interface SidebarProps {
    children: React.ReactNode;
}


export default function Sidebar({ children }: SidebarProps) {

    const pathname = usePathname()
    
    const routes = useMemo(() => [
        {
            label: "Home",
            active: pathname !== "/search",
            href: "/"
        },
        {
            label: "Search",
            active: pathname === "/search",
            href: "/search"
        }    
    ], [pathname])

    return (
        <div>
            {children}
        </div>
    )
}