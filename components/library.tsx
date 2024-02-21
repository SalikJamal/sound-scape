"use client"

import { AiOutlinePlus } from "react-icons/ai"
import { TbPlaylist } from "react-icons/tb"


export default function Library() {

    const handleUpload = () => {
        // Handle upload later
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-neutral-400 font-medium text-md">
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus 
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                    onClick={handleUpload} 
                    size={20} 
                />
            </div>
        </div>
    )
}