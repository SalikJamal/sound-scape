import { ISubscription, IUserDetails } from "@/types/types"
import { User } from "@supabase/auth-helpers-nextjs"
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react"
import { createContext, useContext, useEffect, useState } from "react"

interface IUserContextType {
    accessToken: string | null;
    user: User | null;
    userDetails: IUserDetails | null;
    isLoading: boolean;
    subscription: ISubscription | null;
}


export const UserContext = createContext<IUserContextType | undefined>(undefined)

export interface UserProviderProps {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: UserProviderProps) => {
    const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext()

    const user = useSupaUser()
    const accessToken = session?.access_token ?? null
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [userDetails, setUserDetails] = useState<IUserDetails | null>(null)
    const [subscription, setSubscription] = useState<ISubscription | null>(null)

    const getUserDetails = () => supabase.from("users").select("*").single()
    const getSubscription = () => supabase.from("subscriptions").select("*, prices(*, products(*))").in("status", ["trialing", "active"]).single()

    useEffect(() => {
        if(user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true)
            Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
                const userDetailsPromise = results[0]
                const subscriptionPromise = results[1]

                if(userDetailsPromise.status === "fulfilled") {
                    setUserDetails(userDetailsPromise.value.data as IUserDetails)
                }

                if(subscriptionPromise.status === "fulfilled") {
                    setSubscription(subscriptionPromise.value.data as ISubscription)
                }

                setIsLoadingData(false)
            })
        } else if(!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null)
            setSubscription(null)
        }
    }, [user, isLoadingUser])


    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    }

    return <UserContext.Provider value={value} {...props} />
}


export const useUser = () => {
    const context = useContext(UserContext)

    if(context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }

    return context
}