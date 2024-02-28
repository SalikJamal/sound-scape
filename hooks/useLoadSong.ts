import { ISong } from "@/types/types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"


const useLoadSong = (song: ISong) => {
    const supabaseClient = useSupabaseClient()
    
    if(!song) return null

    const { data: songData } = supabaseClient
        .storage
        .from("songs")
        .getPublicUrl(song.song_path)

    return songData.publicUrl
}


export default useLoadSong