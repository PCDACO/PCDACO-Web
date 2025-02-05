'use client'

import { useLoginRequest } from "@/domains/stores/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SharedResponse } from "@/domains/models/shared/shared.response";
import { LoginResponse } from "@/domains/models/auth/login.response";
import { AuthApi } from "@/domains/services/auth/auth.service";


export default function Home() {
    const { email, setEmail, password, setPassword } = useLoginRequest();
    const router = useRouter();
    // Use useMutation for login requests
    const mutation = useMutation({
        mutationKey: ["login"],
        mutationFn: () => AuthApi.login(email, password),
        onSuccess: async (response) => {
            const data = response as SharedResponse<LoginResponse>;
            router.push("/dashboard");
            toast({
                title: data.message
            });
        },
        onError: (error) => {
            toast({
                title: error.message
            });
            console.error("Login failed", error);
        },
    });
    return (
        <div className="h-full w-full flex items-center justify-center">
            <Card className="w-80 h-96 flex flex-col justify-around shadow-lg">
                <h1 className="text-3xl text-center">LOGIN</h1>
                <div className="[&_*]:mb-8">
                    <Input
                        placeholder="Enter Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <Input
                        placeholder="Enter Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div className="mx-auto">
                    <Button type="submit" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
                        {mutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                </div>
            </Card>
        </div>
    );

}
