"use client"

import { AuthModal } from "@/components/auth-modal"
import { useEffect, useState } from "react"


export default function ModalMProvider() {
    
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    return (
        <AuthModal />
    )
}