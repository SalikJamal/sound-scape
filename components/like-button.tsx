"use client"

import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface ILikeButtonProps {
    songId: string;
}


export default function LikeButton({ songId }: ILikeButtonProps) {
    
    const [isLiked, setIsLiked] = useState(false)

    const router = useRouter()
    const authModal = useAuthModal()
    const { supabaseClient } = useSessionContext()
    const { user } = useUser()
    

    const handleLike = async () => {
        if(!user) return authModal.onOpen()

        if(isLiked) {
            const { error } = await supabaseClient.from("liked_songs")
            .delete()
            .eq("user_id", user.id)
            .eq("song_id", songId)

            if(!error) {
                setIsLiked(false)
            } else {
                toast.error(error.message)
            }
        } else {
            const { error } = await supabaseClient.from("liked_songs")
            .insert({
                user_id: user.id,
                song_id: songId
            })

            if(!error) {
                setIsLiked(true)
                toast.success("Added to liked songs")
            } else {
                toast.error(error.message)
            }
        }

        router.refresh()
    }

    useEffect(() => {
        if(!user?.id) return

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from("liked_songs")
                .select("*")
                .eq("user_id", user?.id)
                .eq("song_id", songId)
                .single()

            if(!error && data) setIsLiked(true)
        }

        fetchData()
    }, [songId, supabaseClient, user?.id])

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart

    return (
        <button
            className="hover:opacity-75 transition"
            type="button"
            onClick={handleLike}
        >
            <Icon color={isLiked ? "#22C55E" : "#FFFFFF"} size={25} />
        </button>
    )
}