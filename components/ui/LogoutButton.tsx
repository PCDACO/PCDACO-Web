'use client'

import { LogOut } from "lucide-react"
import { Button } from "./button"
import { LoadingSpinner } from "./loading-spinner"
import { useState } from "react"
import { Logout } from "@/app/(auth)/login/action"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter();
  const mutation = async () => {
    setIsLoading(true)
    Logout().then(() => {
      setIsLoading(false)
      push("/login");
    });
  }

  return (
    <Button variant="ghost" className="w-full h-8 justify-start items-center" onClick={() => mutation()} disabled={isLoading}>
      {isLoading ? <LoadingSpinner size={12} /> : <LogOut className="mr-2 h-2 w-4" />}
      <span>Đăng xuất</span>
    </Button>
  )
}
