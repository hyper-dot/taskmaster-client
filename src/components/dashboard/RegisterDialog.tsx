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
import { registerSchema } from "@/schema/auth.schema";
import toast from "react-hot-toast";
import { z } from "zod";

// Define the type for the registration form data
type TRegisterSchema = z.infer<typeof registerSchema>;

// You'll need to create this hook similar to the login mutation hook
import { useRegisterMutation } from "@/hooks/mutations/auth.mutation";

const RegisterDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync, isPending } = useRegisterMutation();
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  function onSubmit(data: TRegisterSchema) {
    const promise = mutateAsync(data).then(() => {
      setIsOpen(false);
      document.getElementById("login-dialog-button")?.click();
    });
    toast.promise(promise, {
      success: "Registration successful",
      error: (err) => err.message,
      loading: "Please wait...",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button id="register-dialog-button">Get Started</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <div>
              <Label>Name</Label>
              <FormInput
                errors={errors.name}
                register={register("name")}
                placeholder="Enter Full Name"
              />
            </div>
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
            <div>
              <Label>Confirm Password</Label>
              <FormInput
                errors={errors.confirm_password}
                register={register("confirm_password")}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              document.getElementById("login-dialog-button")?.click();
            }}
            type="button"
            className="text-sm underline block mt-2"
          >
            Already have an account?
          </button>

          <DialogFooter className="mt-4">
            <Button disabled={isPending} className="w-full">
              Register
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
