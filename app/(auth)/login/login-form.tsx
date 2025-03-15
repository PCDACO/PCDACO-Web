'use client'
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Login, Logout } from "./action";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { register, handleSubmit } = useForm<{
    email: string,
    password: string
  }>();

  const { replace } = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string, password: string }) => Login({ email, password }),
    onSuccess: () => {
      replace("/dashboard");
    },
    onError: () => {
      toast({ title: "Sai mật khẩu hoặc tài khoản" })
    }
  })

  useEffect(() => {
    Logout();
  }, [])
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md max-h-full flex-col gap-8">
        <a href="/login" className="flex items-center gap-2 self-center font-medium">
          {/* <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"> */}
          {/* </div> */}
          <Image alt="" src="/icon.svg" width={64} height={64} className="size-8" />
          PCDACO
        </a>
        <div className={cn("flex flex-col gap-8", className)} {...props}>
          <Card>
            <CardHeader className="text-center gap-4">
              <CardTitle className="text-xl">Chào Mừng</CardTitle>
              <CardDescription>Đăng nhập để truy cập hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit((data) => {
                mutate({ email: data.email, password: data.password })
              })} >
                <div className="grid gap-8">
                  {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"> */}
                  {/*   <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span> */}
                  {/* </div> */}
                  <div className="grid gap-8">
                    <div className="grid gap-4">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        {...register("email")}
                        id="email" type="email" placeholder="" />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {/* <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline"> */}
                        {/*   Forgot your password? */}
                        {/* </a> */}
                      </div>
                      <Input
                        {...register("password")}
                        id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                      {isPending ? <LoadingSpinner /> : "Đăng nhập"}
                    </Button>
                  </div>
                  {/* <div className="text-center text-sm"> */}
                  {/*   Don&apos;t have an account?{" "} */}
                  {/*   <a href="#" className="underline underline-offset-4"> */}
                  {/*     Sign up */}
                  {/*   </a> */}
                  {/* </div> */}
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div >
  )
}
