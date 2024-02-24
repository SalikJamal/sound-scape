"use client"

import { useRouter } from "next/navigation"
import { BiSearch } from "react-icons/bi"
import { HiHome } from "react-icons/hi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import { twMerge } from "tailwind-merge"
import Button from "@/components/button"
import useAuthModal from "@/hooks/useAuthModal"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@/hooks/useUser"
import { FaUserAlt } from "react-icons/fa"
import toast from "react-hot-toast"

interface IHeaderProps {
    children: React.ReactNode;
    className?: string;
}


export default function Header({ children, className }: IHeaderProps) {
    
    const supabaseClient = useSupabaseClient()
    const { user } = useUser()
    const authModal = useAuthModal()
    const router = useRouter()

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut()
        // TODO: Reset any playing songs
        router.refresh()

        if(error) {
            toast.error(error.message)
        } else {
            toast.success("You have been logged out")
        }
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
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button
                                className="bg-white px-6 py-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                            <Button 
                                className="bg-white"
                                onClick={() => router.push('/account')}
                            >
                                <FaUserAlt className="text-black" size={20} />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    className="bg-transparent text-neutral-300 font-medium"
                                    onClick={authModal.onOpen}
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="bg-white px-6 py-2"
                                    onClick={authModal.onOpen}
                                >
                                    Log In
                                </Button>
                            </div>
                        </>
                    )}
                    
                </div>
            </div>
            {children}
        </div>
    )
}