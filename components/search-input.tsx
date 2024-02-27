"use client"

import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import qs from "query-string"
import Input from "@/components/input"


export default function SearchInput() {
    
    const [value, setValue] = useState<string>("")
    const debouncedValue = useDebounce<string>(value, 500)
    const router = useRouter()
    
    useEffect(() => {
        const query = {
            title: debouncedValue
        }

        const url = qs.stringifyUrl({
            url: "/search",
            query,
        })

        router.push(url)
    }, [debouncedValue, router])

    return (
        <Input
            onChange={e => setValue(e.target.value)}
            value={value}
            placeholder="What do you want to listen to?"
        />
    )
}