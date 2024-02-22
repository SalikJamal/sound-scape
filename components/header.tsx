"use client"

import { useRouter } from "next/navigation"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
import Button from "@/components/button"

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
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <HiHome 
                            className="text-black" 
                            size={20} 
                        />
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch 
                            className="text-black" 
                            size={20} 
                        />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    <>
                        <div>
                            <Button
                                className="bg-transparent text-neutral-300 font-medium"
                                onClick={() => {}}
                            >
                                Sign Up
                            </Button>
                        </div>
                        <div>
                            <Button
                                className="bg-white px-6 py-2"
                                onClick={() => {}}
                            >
                                Log In
                            </Button>
                        </div>
                    </>
                </div>
            </div>
            {children}
        </div>
    )
}