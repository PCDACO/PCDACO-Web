'use client'

import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Login, } from "./action";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function LoginForm() {
    const { register, handleSubmit } = useForm<{
        email: string,
        password: string
    }>();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => {
            return Login({ email, password })
        }
    })

    return (
        <div className="w-full max-w-xs mx-auto flex flex-col justify-center h-screen">
            <h1 className="text-3xl text-center font-bold mb-8">Đăng nhập</h1>
            <form onSubmit={handleSubmit((data) => {
                mutate({ email: data.email, password: data.password });
                Login({ email: data.email, password: data.password })
            })} className="space-y-8">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </Label>
                    <Input
                        {...register("email")}
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Mật khẩu
                    </Label>
                    <Input
                        {...register("password")}
                        type="password"
                        id="password"
                        placeholder="Nhập mật khẩu"
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-black"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full mt-8 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    {isPending ? <LoadingSpinner /> : "Đăng nhập"}
                </Button>
            </form>
        </div>
    );

}
