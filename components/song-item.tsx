"use client"

import useLoadImage from "@/hooks/useLoadImage"
import { ISong } from "@/types/types"
import Image from "next/image";

interface ISongItemProps {
    data: ISong;
    onClick: (id: string) => void;
}


export default function SongItem({ data, onClick }: ISongItemProps) {
    
    const imagePath = useLoadImage(data)

    return (
        <div
            className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3" 
            onClick={() => onClick(data.id)}
        >
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image
                    className="object-cover"
                    src={imagePath || "/images/liked.png"}
                    fill
                    alt="Song Cover"
                />
            </div>
        </div>
    )
}