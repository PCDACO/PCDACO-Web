'use client'

import { LogOut } from "lucide-react"
import { Button } from "./button"
import { LoadingSpinner } from "./loading-spinner"
import { useState } from "react"
import { Logout } from "@/app/(auth)/login/action"

export function LogoutButton() {
    const [isLoading, setIsLoading] = useState(false)

    const mutation = async () => {
        setIsLoading(true)
        Logout().then(() => {
            setIsLoading(false)
        });
    }

    return (
        <Button variant="ghost" className="w-full justify-start" onClick={mutation} disabled={isLoading}>
            {isLoading ? <LoadingSpinner size={18} /> : <LogOut className="mr-2 h-4 w-4" />}
            <span>{isLoading ? "Logging out..." : "Logout"}</span>
        </Button>
    )
}