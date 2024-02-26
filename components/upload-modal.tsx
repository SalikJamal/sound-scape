import Modal from "@/components/modal"
import useUploadModal from "@/hooks/useUploadModal"
import { useState } from "react"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"
import Input from "@/components/input"
import Button from "@/components/button"
import toast from "react-hot-toast"
import { useUser } from "@/hooks/useUser"
import uniqid from "uniqid"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"


export default function UploadModal() {

    const [isLoading, setIsLoading] = useState(false)

    const uploadModal = useUploadModal()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const { user } = useUser()

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null
        }
    })


    const handleChange = (open: boolean) => {
        if(!open) {
            reset()
            uploadModal.onClose()
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {

            setIsLoading(true)

            const imageFile = values.image?.[0]
            const songFile = values.song?.[0]

            if(!imageFile || !songFile || !user) {
                toast.error("Missing fields.")
                return
            }

            const uniqueID = uniqid()

            // Upload song
            const { 
                data: songData,
                error: songError
            } = await supabaseClient.storage.from("songs")
                .upload(`song-${values.title}-${uniqueID}`, songFile, { 
                    cacheControl: "3600", upsert: false 
                })

            if(songError) {
                setIsLoading(false)
                return toast.error("Failed to upload song.")
            }

            // Upload image
            const { 
                data: imageData,
                error: imageError
            } = await supabaseClient.storage.from("images")
                .upload(`image-${values.title}-${uniqueID}`, imageFile, { 
                    cacheControl: "3600", upsert: false 
                })

            if(imageError) {
                setIsLoading(false)
                return toast.error("Failed to upload image.")
            }

            // Insert db record
            const { error: supabaseError } = await supabaseClient.from("songs").insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: songData.path,
                song_path: songData.path
            })

            if(supabaseError) {
                setIsLoading(false)
                return toast.error(supabaseError.message)
            }

            router.refresh()
            setIsLoading(false)
            toast.success("Song uploaded!")
            reset()
            uploadModal.onClose()

        } catch(err) {
            toast.error("Something went wrong.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            title="Add a Song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={handleChange}
        >
            <form
                className="flex flex-col gap-y-4" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input 
                    id="title"
                    disabled={isLoading}
                    placeholder="Song title"
                    {...register("title", { required: true })}
                />

                <Input 
                    id="author"
                    disabled={isLoading}
                    placeholder="Song author"
                    {...register("author", { required: true })}
                />

                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input 
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register("song", { required: true })}
                    />
                </div>

                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input 
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register("image", { required: true })}
                    />
                </div>

                <Button
                    className="text-white hover:scale-105"
                    type="submit"
                    disabled={isLoading}
                >
                    Upload
                </Button>
            </form>
        </Modal>
    )
}