import { create } from "zustand"

interface ISubscribeModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}


const useSubscribeModal = create<ISubscribeModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))


export default useSubscribeModal