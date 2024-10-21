import { FC, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type TFormSubmitBtnProps = {
  isSubmitting: boolean;
  children: ReactNode;
  className?: string;
};
const FormSubmitBtn: FC<TFormSubmitBtnProps> = ({
  children,
  isSubmitting,
  className,
}) => {
  return (
    <Button disabled={isSubmitting} className={cn("flex gap-2", className)}>
      {isSubmitting && <Loader2 className="w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default FormSubmitBtn;
