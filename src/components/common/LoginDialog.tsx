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
import FormSubmitBtn from "../shared/form/FormSubmitBtn";
import { Label } from "../ui/label";

const LoginDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form>
          <div className="space-y-3">
            <div>
              <Label>Email</Label>
              <FormInput placeholder="Enter Email Address" />
            </div>
            <div>
              <Label>Password</Label>
              <FormInput type="password" placeholder="Enter Password" />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <FormSubmitBtn isSubmitting className="w-full">
              Login
            </FormSubmitBtn>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
