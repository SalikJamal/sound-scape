"use client"

import { MyUserContextProvider } from "@/hooks/useUser"

interface IUserProviderProps {
    children: React.ReactNode;
}


export default function UserProvider({ children }: IUserProviderProps) {
        
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
}