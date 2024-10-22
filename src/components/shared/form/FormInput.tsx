import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const FormInput = ({
  type,
  errors,
  register,
  placeholder,
}: {
  type?: "number" | "text" | "password";
  errors: any;
  register: any;
  placeholder?: string;
}) => {
  const [view, setView] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip open={!!errors}>
        <TooltipTrigger asChild>
          <div className="relative">
            <Input
              type={
                type === "password" && view
                  ? "text"
                  : type === "password" && !view
                    ? "password"
                    : type
              }
              className={cn(!!errors ? "focus-visible:ring-destructive" : "")}
              {...register}
              placeholder={placeholder}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setView(!view)}
                className="absolute right-[2px] bottom-[2px] rounded-md h-[90%] px-1"
                tabIndex={-1}
              >
                {view ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent
          className="bg-transparent text-destructive p-0 m-0 leading-none"
          align="end"
        >
          <p>{errors?.message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FormInput;
