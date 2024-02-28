"use client"

import useGetSongById from "@/hooks/useGetSongById"
import useLoadSong from "@/hooks/useLoadSong"
import usePlayer from "@/hooks/usePlayer"
import { ISong } from "@/types/types"


export default function Player() {
    
    const player = usePlayer()
    const { song } = useGetSongById(player.activeId)

    const songPath = useLoadSong(song as ISong)
    
    return (
        <div>
            Player
        </div>
    )
}