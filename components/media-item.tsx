"use client"

import useLoadImage from "@/hooks/useLoadImage"
import usePlayer from "@/hooks/usePlayer"
import { ISong } from "@/types/types"
import Image from "next/image"

interface IMediaItemProps {
    data: ISong;
    onClick?: (id: string) => void;
}


export default function MediaItem({ data, onClick }: IMediaItemProps) {
    
    const imagePath = useLoadImage(data)
    const player = usePlayer()

    const handleClick = () => {
        if(onClick) onClick(data.id)
        return player.setId(data.id)
    }
    
    return (
        <div
            className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
            onClick={handleClick}
        >
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image
                    className="object-cover"
                    src={imagePath || "/images/liked.png"}
                    fill
                    sizes="100%"
                    alt="Song Cover"
                    title={data.title}
                />
            </div>

            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.title}</p>
                <p className="text-neutral-400 text-sm truncate">{data.author}</p>
            </div>

            <div>

            </div>
        </div>
    )
}