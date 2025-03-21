'use client'

import { LogOut } from "lucide-react"
import { Button } from "./button"
import { LoadingSpinner } from "./loading-spinner"
import { useState } from "react"
import { Logout } from "@/app/(auth)/login/action"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const { replace } = useRouter();
  const mutation = async () => {
    setIsLoading(true)
    Logout().then(() => {
      setIsLoading(false)
      replace("/login");
    });
  }

  return (
    <Button variant="ghost" className="w-full h-1 justify-start items-center" onClick={() => mutation()} disabled={isLoading}>
      {isLoading ? <LoadingSpinner size={12} /> : <LogOut className="mr-2 h-2 w-4" />}
      <span>{isLoading ? "Logging out..." : "Logout"}</span>
    </Button>
  )
}
