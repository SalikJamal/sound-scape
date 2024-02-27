"use client"

import { ISong } from "@/types/types"
import MediaItem from "./media-item"
import LikeButton from "@/components/like-button"

interface ISearchContentProps {
    songs: ISong[]
}


export default function SearchContent({ songs }: ISearchContentProps) {
    
    if(songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs available
            </div>
        )
    }
    
    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song) => (
                <div
                    className="flex items-center gap-x-4 w-full" 
                    key={song.id}
                >
                    <div className="flex-1">
                        <MediaItem 
                            data={song}
                            onClick={() => {}}
                        />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    )
}