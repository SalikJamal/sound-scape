"use client"

import useAuthModal from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import useUploadModal  from "@/hooks/useUploadModal"
import { AiOutlinePlus } from "react-icons/ai"
import { TbPlaylist } from "react-icons/tb"
import { ISong } from "@/types/types"
import MediaItem from "@/components/media-item"
import useOnPlay from "@/hooks/useOnPlay"
import useSubscribeModal from "@/hooks/useSubscribeModal"

interface ILibraryProps {
    songs: ISong[];
}


export default function Library({ songs }: ILibraryProps) {

    const authModal = useAuthModal()
    const uploadModal = useUploadModal()
    const subscribeModal = useSubscribeModal()
    const { user, subscription } = useUser()
    const onPlay = useOnPlay(songs)

    const handleUpload = () => {
        if(!user) return authModal.onOpen()
        if(!subscription) return subscribeModal.onOpen()
        return uploadModal.onOpen()
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
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((song) => (
                    <MediaItem
                        key={song.id}
                        onClick={(id: string) => onPlay(id)}
                        data={song}
                    />
                ))}
            </div>
        </div>
    )
}