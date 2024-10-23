import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const FormTextarea = ({
  errors,
  register,
  placeholder,
  rows,
}: {
  errors: any;
  register: any;
  placeholder?: string;
  rows?: number;
}) => {
  return (
    <TooltipProvider>
      <Tooltip open={!!errors}>
        <TooltipTrigger asChild>
          <div className="relative">
            <Textarea
              className={cn(!!errors ? "focus-visible:ring-destructive" : "")}
              {...register}
              placeholder={placeholder}
              rows={rows ?? 3} // default to 3 rows if not provided
            />
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

export default FormTextarea;
