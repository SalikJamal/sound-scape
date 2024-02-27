"use client"

import useLoadImage from "@/hooks/useLoadImage";
import { ISong } from "@/types/types"
import Image from "next/image";

interface IMediaItemProps {
    data: ISong;
    onClick?: (id: string) => void;
}


export default function MediaItem({ data, onClick }: IMediaItemProps) {
    
    const imagePath = useLoadImage(data)

    const handleClick = () => {
        if(onClick) onClick(data.id)

        // TODO: Default turn on player
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
                    alt="Song Cover"
                    title={data.title}
                />
            </div>
        </div>
    )
}