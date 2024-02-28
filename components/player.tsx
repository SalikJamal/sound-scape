"use client"

import useGetSongById from "@/hooks/useGetSongById"
import useLoadSong from "@/hooks/useLoadSong"
import usePlayer from "@/hooks/usePlayer"


export default function Player() {
    
    const player = usePlayer()
    const { song } = useGetSongById(player.activeId)

    const songPath = useLoadSong(song!)

    if(!song || !songPath || !player.activeId) return null
    
    return (
        <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
            Player
        </div>
    )
}