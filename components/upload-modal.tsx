import Modal from "@/components/modal"
import useUploadModal from "@/hooks/useUploadModal"
import { useState } from "react"
import { FieldValues, useForm, SubmitHandler } from "react-hook-form"
import Input from "@/components/input"


export default function UploadModal() {

    const [isLoading, setIsLoading] = useState(false)
    const uploadModal = useUploadModal()

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
        // Upload to supabase
    }

    return (
        <Modal
            title="Add a Song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={handleChange}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    id="title"
                    disabled={isLoading}
                    placeholder="Song title"
                    {...register("title", { required: true })}
                />
            </form>
        </Modal>
    )
}