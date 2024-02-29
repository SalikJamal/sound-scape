"use client"

import useSubscribeModal from "@/hooks/useSubscribeModal"
import { useUser } from "@/hooks/useUser"
import { postData } from "@/libs/helpers"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Button from "@/components/button"


export default function AccountContent() {

    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const subscribeModal = useSubscribeModal()
    const { isLoading, subscription, user } = useUser()

    const redirectToCustomerPortal = async () => {
        setLoading(true)

        try {
            const { url, error } = await postData({ 
                url: "/api/create-portal-link",
            })

            window.location.assign(url)
        } catch(err) {
            toast.error((err as Error).message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(!isLoading && !user) router.replace("/")
    },[isLoading, user, router])
    
    return (
        <div className="mb-7 px-6">
            {!subscription ? (
                <div className="flex flex-col gap-y-4">
                    <p>No active plans.</p>
                    <Button
                        className="w-[300px]" 
                        onClick={subscribeModal.onOpen}
                    >
                        Subscribe
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-y-4">
                    <p>You are currently on the <b>{subscription?.prices?.products?.name}</b> plan</p>
                    <Button
                        className="w-[300px]" 
                        onClick={redirectToCustomerPortal}
                        disabled={loading || isLoading}
                    >
                        Manage plan
                    </Button>
                </div>
            )}
        </div>
    )
}