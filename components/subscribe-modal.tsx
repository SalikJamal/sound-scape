"use client"

import Modal from "@/components/modal"
import { IPrice, IProductWithPrice } from "@/types/types"
import Button from "@/components/button"
import { formatPrice, postData } from "@/libs/helpers"
import { useState } from "react"
import { useUser } from "@/hooks/useUser"
import toast from "react-hot-toast"
import { getStripe } from "@/libs/stripeClient"

interface ISubscribeModalProps {
    products: IProductWithPrice[]
}


export default function SubscribeModal({ products }: ISubscribeModalProps) {
    
    const [priceIdLoading, setPriceIdLoading] = useState<string>()
    const { user, isLoading, subscription } = useUser() 

    const handleCheckout = async (price: IPrice) => {
        setPriceIdLoading(price.id)

        if(!user) {
            setPriceIdLoading(undefined)
            return toast.error("Must be logged in")
        }

        if(subscription) {
            setPriceIdLoading(undefined)
            return toast.success("Already subscribed")
        }

        try {
            const { sessionId } = await postData({
                url: "/api/create-checkout-session",
                data: { price }
            })

            const stripe = await getStripe()
            stripe?.redirectToCheckout({ sessionId })

        } catch(err) {
            toast.error((err as Error)?.message)
        } finally {
            setPriceIdLoading(undefined)
        }
    }

    let content = (
        <div className="text-center">
            No products available
        </div>
    )
    
    if(products.length) {
        content = (
            <div>
                {products.map(product => {
                    if(!product.prices?.length) {
                        return (
                            <div key={product.id}>
                                No prices available
                            </div>
                        )
                    }

                    return product.prices.map(price => (
                        <Button
                            className="mb-4"
                            key={price.id}
                            onClick={() => handleCheckout(price)}
                            disabled={isLoading || price.id === priceIdLoading}
                        >
                            {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                        </Button>
                    ))
                })}
            </div>
        )
    }

    if(subscription) {
        content = (
            <div className="text-center">
                Already subscribed
            </div>
        )
    }
 
    return (
        <Modal
            title="Only For Premium Users"
            description="Listen to music with Spotify Premium"
            isOpen
            onChange={() => {}}
        >
            {content}
        </Modal>
    )
}