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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { Textarea } from "../ui/textarea";

const AddTaskDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
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
        <div className="grid gap-3 pb-4">
          <div>
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter task title"
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea />
          </div>
          <div>
            <Label className="text-right">Deadline</Label>
            <DatePicker />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
