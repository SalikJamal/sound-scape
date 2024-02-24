"use client"

import { Modal } from "@/components/modal"
import useAuthModal from "@/hooks/useAuthModal"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export function AuthModal() {
    
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const { session } = useSessionContext()
    const { isOpen, onClose } = useAuthModal()

    useEffect(() => {
        if(session) {
            router.refresh()
            onClose()
        }
    }, [session, router, onClose])

    const handleChange = (open: boolean) => {
        if(!open) onClose() 
    }

    return (
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen={isOpen}
            onChange={handleChange}
        >
            <Auth
                supabaseClient={supabaseClient}
                providers={[]}
                magicLink
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22C55E"
                            }
                        }
                    }
                }}
                theme="dark"
            />
        </Modal>
    )
}