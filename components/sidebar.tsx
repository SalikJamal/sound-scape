"use client"

interface SidebarProps {
    children: React.ReactNode;
}


export default function Sidebar({ children }: SidebarProps) {
    return (
        <div>
            {children}
        </div>
    )
}