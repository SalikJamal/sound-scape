import Link from "next/link"
import { IconType } from "react-icons"
import { twMerge } from "tailwind-merge"

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}


export default function SidebarItem({ icon, label, active, href }: SidebarItemProps) {
    return (
        <Link
            className={twMerge("flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1")} 
            href={href}
        >
            Sidebar Item
        </Link>
    )
}