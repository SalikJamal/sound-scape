"use client"

import { useRouter } from "next/navigation"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { twMerge } from "tailwind-merge"

interface IHeaderProps {
    children: React.ReactNode;
    className?: string;
}


export default function Header({ children, className }: IHeaderProps) {
    
    const router = useRouter()

    const handleLogout = () => {
        // Handle logout in the future
    }

    return (
        <div className={twMerge("h-fit bg-gradient-to-b from-emerald-800 p-6", className)}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretLeft 
                            className="text-white" 
                            size={35}
                            onClick={() => router.back()}
                        />
                    </button>
                    <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
                        <RxCaretRight 
                            className="text-white" 
                            size={35}
                            onClick={() => router.forward()}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}