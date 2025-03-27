"use client";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/auth/use-auth";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  const { login } = useAuth();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md max-h-full flex-col gap-8">
        <span className="flex items-center gap-2 self-center font-medium hover:cursor-default">
          <Image
            alt=""
            src="/icon.svg"
            width={64}
            height={64}
            className="size-8"
          />
          PCDACO
        </span>
        <div className={cn("flex flex-col gap-8", className)} {...props}>
          <Card>
            <CardHeader className="text-center gap-4">
              <CardTitle className="text-xl">Chào Mừng</CardTitle>
              <CardDescription>Đăng nhập để truy cập hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit((data) =>
                  login.mutate({ email: data.email, password: data.password })
                )}
              >
                <div className="grid gap-8">
                  <div className="grid gap-8">
                    <div className="grid gap-4">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder=""
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        {...register("password")}
                        id="password"
                        type="password"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {login.isPending ? <LoadingSpinner /> : "Đăng nhập"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
