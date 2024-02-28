"use client"

import { AuthModal } from "@/components/auth-modal"
import SubscribeModal from "@/components/subscribe-modal"
import UploadModal from "@/components/upload-modal"
import { IProductWithPrice } from "@/types/types"
import { useEffect, useState } from "react"

interface IModalProviderProps {
    products: IProductWithPrice[]
}


export default function ModalProvider({ products }: IModalProviderProps) {
    
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    return (
        <>
            <AuthModal />
            <UploadModal />
            <SubscribeModal products={products} />
        </>
    )
}