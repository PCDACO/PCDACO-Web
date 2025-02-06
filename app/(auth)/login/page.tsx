'use client'

import { useLoginRequest } from "@/domains/stores/store";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { LoginResponse } from "@/domains/models/auth/login.response";
import { AuthApi } from "@/domains/services/auth/auth.service";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Home() {
    const { register, handleSubmit } = useForm<{
        email: string,
        password: string
    }>();
    const { email, setEmail, password, setPassword } = useLoginRequest();
    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: () => AuthApi.login(email, password),
        onSuccess: (response) => {
            if (!response.isSuccess) {
                toast({
                    title: "Email hoặc mật khẩu không đúng"
                });
                return;
            }
            const data = response as SharedResponse<LoginResponse>;
            console.log(data);
            router.push("/dashboard");
            toast({
                title: data.message
            });
        }
    });

    return (
        <div className="w-full max-w-xs mx-auto flex flex-col justify-center h-screen">
            <h1 className="text-3xl text-center font-bold mb-8">Đăng nhập</h1>
            <form onSubmit={handleSubmit((data) => {
                setEmail(data.email);
                setPassword(data.password);
                mutate();
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
                    {isPending ? (<LoadingSpinner />) : "Đăng nhập"}
                </Button>
            </form>
        </div>
    );

}
