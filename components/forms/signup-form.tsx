"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Link from "next/link";
import { signUpSchema, SignUpSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { singUpUser } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<SignUpSchema>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: SignUpSchema) => {
    const signUpResponse = await singUpUser(data);
    if (signUpResponse?.error) {
      toast({
        title: "Sign Up Failed",
        description: signUpResponse.error,
        variant: "destructive",
      });
      return;
    }

    redirect("/");
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-3", className)}
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your details below to create an account
          </p>
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="jhondoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-3">
          Create account
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>
        <div className="text-center text-sm">
          Already have an account{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
