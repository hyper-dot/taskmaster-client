"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormInput from "../shared/form/FormInput";
import { useState } from "react";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, TLoginSchema } from "@/schema/auth.schema";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/hooks/mutations/auth.mutation";

const LoginDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending } = useLoginMutation();
  const form = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  function onSubmit(data: TLoginSchema) {
    const promise = mutateAsync(data);
    toast.promise(promise, {
      success: "Login successfull",
      error: (err) => err.message,
      loading: "Please wait...",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button id="login-dialog-button">Login</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <div>
              <Label>Email</Label>
              <FormInput
                errors={errors.email}
                register={register("email")}
                placeholder="Enter Email Address"
              />
            </div>
            <div>
              <Label>Password</Label>
              <FormInput
                errors={errors.password}
                register={register("password")}
                type="password"
                placeholder="Enter Password"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              document.getElementById("register-dialog-button")?.click();
            }}
            type="button"
            className="text-sm underline block mt-2"
          >
            Don't have an account ?
          </button>

          <DialogFooter className="mt-4">
            <Button disabled={isPending} className="w-full">
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
