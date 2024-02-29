"use client"

import Box from "../../components/box"
import { BounceLoader } from "react-spinners"


export default function Loading() {
    return (
        <Box className="flex items-center justify-center h-full">
            <BounceLoader color="#22C55E" size={40} /> 
        </Box>
    )
}