"use client"

import { ISong } from "@/types/types"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/useUser"
import { useEffect } from "react"
import MediaItem from "@/components/media-item"
import LikeButton from "@/components/like-button"
import useOnPlay from "@/hooks/useOnPlay"

interface ILikedContentProps {
    songs: ISong[]
}


export default function LikedContent({ songs }: ILikedContentProps) {
    
    const onPlay = useOnPlay(songs)
    const router = useRouter()
    const { isLoading, user } = useUser()

    useEffect(() => {
        if(!isLoading && !user) router.replace("/")
    }, [isLoading, user, router])
    
    if(songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No liked songs.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {songs.map((song) => (
                <div 
                    className="flex items-center gap-x-4 w-full"
                    key={song.id}
                >
                    <div className="flex-1">
                        <MediaItem 
                            data={song}
                            onClick={(id: string) => onPlay(id)}
                        />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    )
}