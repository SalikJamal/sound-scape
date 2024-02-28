import { ISong } from "@/types/types"
import MediaItem from "@/components/media-item"
import LikeButton from "@/components/like-button"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import Slider from "@/components/slider"

interface IPlayerContentProps {
    song: ISong;
    songPath: string;
}


export default function PlayerContent({ song, songPath }: IPlayerContentProps) {
   
    const Icon = true ? BsPauseFill : BsPlayFill
    const VolumeIcon = true ? HiSpeakerXMark : HiSpeakerWave

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
                    onClick={() => {}}
                >
                    <Icon className="text-black" size={30} />
                </div>
            </div>

            <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                <AiFillStepBackward
                    className="text-neutral-400 cursor-pointer hover:text-white transition" 
                    size={30} 
                    onClick={() => {}}
                />

                <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer hover:scale-105 transition"
                    onClick={() => {}}
                >
                    <Icon className="text-black" size={30} />
                </div>

                <AiFillStepForward
                    className="text-neutral-400 cursor-pointer hover:text-white transition" 
                    size={30} 
                    onClick={() => {}}
                />
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        className="cursor-pointer"
                        size={34}
                        onClick={() => {}}
                    />
                    <Slider />
                </div>
            </div>
        </div>
    )
}