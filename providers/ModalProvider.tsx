"use client"

import { Modal } from "@/components/modal"
import { useEffect, useState } from "react"


export default function ModalMProvider() {
    
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    return (
        <Modal
            title="Test Modal"
            description="Test description"
            isOpen
            onChange={() => {}}
        >
            Test Children
        </Modal>
    )
}