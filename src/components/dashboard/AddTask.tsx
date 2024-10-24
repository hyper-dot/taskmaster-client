import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TTaskSchema } from "@/schema/task.schema";
import FormInput from "../shared/form/FormInput";
import FormTextarea from "../shared/form/FormTextArea";
import { useState } from "react";
import { useAddTask } from "@/hooks/mutations/task.mutation";
import toast from "react-hot-toast";

const AddTaskDialog = () => {
  const [open, setOpen] = useState(false);
  const [today] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const form = useForm<TTaskSchema>({ resolver: zodResolver(taskSchema) });
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = form;

  const { mutateAsync, isPending } = useAddTask();

  function onSubmit(data: TTaskSchema) {
    const promise = mutateAsync(data).then(() => {
      reset();
      setOpen(false);
    });
    toast.promise(promise, {
      loading: "Adding task...",
      success: "Task added successfully",
      error: (err) => err.message || "Something went wrong",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 w-full">
          <CalendarIcon className="w-4 h-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task by filling out the details below.
          </DialogDescription>
        </DialogHeader>
        <form
          id="add-task-form"
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 pb-4"
        >
          <div>
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <FormInput
              type="text"
              register={register("title")}
              errors={errors.title}
              placeholder="Enter task title"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <FormTextarea
              register={register("description")}
              errors={errors.description}
              placeholder="Enter description"
            />
          </div>
          <div>
            <Label className="text-right">Deadline</Label>
            <FormInput
              min={today}
              type="date"
              register={register("dueDate")}
              errors={errors.dueDate}
            />
          </div>
          <div>
            <Label className="text-right">Status</Label>
            <RadioGroup
              defaultValue="todo"
              className="flex gap-4"
              onValueChange={(val) => setValue("progress", val as TaskStatus)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="todo" id="todo" />
                <Label htmlFor="todo">To Do</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in_progress" id="in_progress" />
                <Label htmlFor="in_progress">In Progress</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="completed" id="completed" />
                <Label htmlFor="completed">Completed</Label>
              </div>
            </RadioGroup>
          </div>
        </form>
        <DialogFooter>
          <Button
            disabled={isPending}
            form="add-task-form"
            type="submit"
            className="w-full"
          >
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
