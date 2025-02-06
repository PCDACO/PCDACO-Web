'use client'

import { LogOut } from "lucide-react"
import { Button } from "./button"
import { LoadingSpinner } from "./loading-spinner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axiosInstance from "@/configs/axios.client"

export function LogoutButton() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const mutation = async () => {
        setIsLoading(true)
        await axiosInstance.post("/api/auth/logout")
        setIsLoading(false)
        router.push("/login")
    }

    return (
        <Button variant="ghost" className="w-full justify-start" onClick={mutation} disabled={isLoading}>
            {isLoading ? <LoadingSpinner size={18} /> : <LogOut className="mr-2 h-4 w-4" />}
            <span>{isLoading ? "Logging out..." : "Logout"}</span>
        </Button>
    )
}