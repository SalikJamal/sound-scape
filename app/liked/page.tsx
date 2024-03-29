import getLikedSongs from "@/actions/getLikedSongs"
import Header from "@/components/header"
import LikedContent from "@/components/liked/liked-content"
import Image from "next/image"

export const revalidate = 0


export default async function Like() {
    
    const songs = await getLikedSongs()
    
    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center gap-x-5">
                        <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                            <Image
                                className="object-cover"
                                src="/images/liked.png"
                                alt="Playlist"
                                fill
                                sizes="100%"
                                title="Playlist"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                            <p className="hidden md:block font-semibold text-sm">Playlist</p>
                            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">Liked Songs</h1>
                        </div>
                    </div>
                </div>
            </Header>

            <LikedContent songs={songs} />
        </div>
    )
}