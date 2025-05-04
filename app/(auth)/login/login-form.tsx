"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useAuthForm } from "@/hooks/auth/use-form-auth";
import Image from "next/image";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { form, onSubmit, isLoading } = useAuthForm();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={onSubmit} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Chào mừng</h1>
                  <p className="text-sm text-muted-foreground">
                    Đăng nhập vào hệ thống quản lí Free Driver
                  </p>
                </div>
                <div className="grid gap-6">
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder=""
                          required
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="email">Mật Khẩu</Label>
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder=""
                          required
                        />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ?
                      <LoadingSpinner /> :
                      " Đăng Nhập "
                    }
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden md:block">
            <Image
              src="/logo.png"
              alt="Image"
              width={2000}
              height={2000}
              className="pt-16 object-contain absolute inset-0 h-full w-full "
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Khi đăng nhập, bạn đã đồng ý với{" "}
        <a href="/policy">Điều kiện dịch vụ</a> and <a href="/policy">Chính sách bảo mật</a>.
      </div>
    </div >
  );
}
