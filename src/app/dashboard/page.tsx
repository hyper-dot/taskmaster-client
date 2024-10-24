"use client";
import React from "react";
import { ClipboardX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SortBy } from "@/components/dashboard/SortBy";
import { cn } from "@/lib/utils";
import AddTaskDialog from "@/components/dashboard/AddTask";
import { useGetTasks } from "@/hooks/query/task.query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import TaskCard from "@/components/dashboard/TaskCard";

type TaskStatus = "todo" | "in_progress" | "completed";

interface Task {
  id: number;
  title: string;
  description: string;
  progress: TaskStatus;
  dueDate: string;
}

const TaskManager: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentStatus = searchParams.get("progress");

  const { data } = useGetTasks(searchParams);

  return (
    <div className="max-w-3xl mx-auto mb-4 md:my-10 px-4 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center"></div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Input placeholder="Search tasks..." className="md:flex-1" />
          <div className="flex gap-4">
            <SortBy />
            <AddTaskDialog />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "todo", "in_progress", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => {
                const newUrlSearchParams = new URLSearchParams(searchParams);
                newUrlSearchParams.set("progress", status);
                if (status === "all") {
                  newUrlSearchParams.delete("progress");
                }
                router.push(`?${newUrlSearchParams.toString()}`);
              }}
              className={cn(
                "px-4 py-1 text-sm md:text-base rounded-full font-medium transition-colors",
                currentStatus === status || (status === "all" && !currentStatus)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80",
              )}
            >
              {status === "all"
                ? "All"
                : status.charAt(0).toUpperCase() +
                  status.slice(1).replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {data?.length ? (
            data?.map((task: Task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="w-full mt-10 md:mt-16 flex flex-col items-center justify-center">
              <ClipboardX className="w-12 h-12 mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-muted-foreground text-center max-w-sm text-sm">
                There are no tasks available at the moment. Create a new task to
                get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
