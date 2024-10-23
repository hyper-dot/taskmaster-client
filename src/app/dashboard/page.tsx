"use client";
import React from "react";
import { ClipboardX, CalendarDays, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SortBy } from "@/components/dashboard/SortBy";
import { cn } from "@/lib/utils";
import AddTaskDialog from "@/components/dashboard/AddTask";
import { useGetTasks } from "@/hooks/query/task.query";
import {
  formatDeadline,
  getDeadlineStatus,
  getStatusBadgeColor,
  getStatusIcon,
  statusTransitions,
} from "@/lib/task";

type TaskStatus = "todo" | "in-progress" | "completed";

interface Task {
  id: number;
  title: string;
  description: string;
  progress: TaskStatus;
  dueDate: string;
}

const TaskManager: React.FC = () => {
  const { data } = useGetTasks();

  const updateStatus = (taskId: number, newStatus: TaskStatus): void => {};

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
          {["all", "pending", "in-progress", "completed"].map((status) => (
            <button
              key={status}
              // onClick={() => setActiveFiltef(status as TaskStatus | "all")}
              className={cn(
                "px-4 py-1 text-sm md:text-base rounded-full font-medium transition-colors",
                // activeFilter === status
                //   ? "bg-primary text-primary-foreground"
                //   : "bg-secondary hover:bg-secondary/80",
              )}
            >
              {status === "all"
                ? "All"
                : status.charAt(0).toUpperCase() +
                  status.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {data?.data?.length ? (
            data?.data?.map((task: Task) => (
              <div
                key={task.id}
                className="p-6 border rounded-xl transition-all bg-secondary"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <button
                    onClick={() =>
                      updateStatus(task.id, statusTransitions[task.progress])
                    }
                    className="mt-1 hover:scale-110 transition-transform"
                  >
                    {getStatusIcon(task.progress)}
                  </button>

                  <div className="flex-1 relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={cn(
                          "text-lg font-medium",
                          task.progress === "completed" &&
                            "line-through text-muted-foreground",
                        )}
                      >
                        {task.title}
                      </h3>
                      <span
                        className={cn(
                          "py-[0.1rem] px-2 md:px-4 md:py-1 text-xs absolute sm:static -top-5 -right-3 rounded-full whitespace-nowrap md:text-sm font-medium",
                          getStatusBadgeColor(task.progress),
                        )}
                      >
                        {task.progress?.charAt(0).toUpperCase() +
                          task.progress?.slice(1).replace("-", " ")}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm md:text-base mb-2">
                      {task.description}
                    </p>

                    <div
                      className={cn(
                        "flex items-center gap-2 mt-3",
                        task.progress === "completed"
                          ? "line-through text-muted-foreground"
                          : "",
                      )}
                    >
                      <CalendarDays
                        className={cn(
                          "w-4 h-4",
                          getDeadlineStatus(task.dueDate).color,
                          task.progress === "completed"
                            ? "text-muted-foreground"
                            : "",
                        )}
                      />
                      <span className="text-sm">
                        {formatDeadline(task.dueDate)}
                      </span>
                      {task.progress !== "completed" && (
                        <span
                          className={cn(
                            "text-sm ml-2",
                            getDeadlineStatus(task.dueDate).color,
                          )}
                        >
                          • {getDeadlineStatus(task.dueDate).label}
                        </span>
                      )}
                    </div>

                    {/* New Action Buttons */}
                    <div className="flex gap-3 absolute -bottom-3 -right-3">
                      <button>
                        <Pencil className="w-4 h-4 text-blue-500" />
                      </button>
                      <button>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
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
