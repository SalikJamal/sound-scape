"use client"

import { ISong } from "@/types/types"

interface ISongItemProps {
    data: ISong;
    onClick: (id: string) => void;
}


export default function SongItem({ data, onClick }: ISongItemProps) {
    return (
        <div>
            
        </div>
    )
}