"use client";
import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  ClipboardX,
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { SortBy } from "@/components/dashboard/SortBy";
import { cn } from "@/lib/utils";
import AddTaskDialog from "@/components/dashboard/AddTask";
import { tasks as data } from "@/__data__/tasks";

type TaskStatus = "pending" | "in-progress" | "completed";

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string; // ISO string format
}

type StatusTransitions = {
  [K in TaskStatus]: TaskStatus;
};

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(data as Task[]);

  const [activeFilter, setActiveFilter] = useState<TaskStatus | "all">("all");

  const updateStatus = (taskId: number, newStatus: TaskStatus): void => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const getStatusIcon = (status: TaskStatus): JSX.Element => {
    const icons: Record<TaskStatus, JSX.Element> = {
      completed: <CheckCircle2 className="text-green-500" />,
      "in-progress": <Clock className="text-blue-500" />,
      pending: <Circle className="text-gray-500" />,
    };
    return icons[status];
  };

  const getStatusBadgeColor = (status: TaskStatus): string => {
    const colors: Record<TaskStatus, string> = {
      pending: "bg-orange-100 text-gray-700",
      "in-progress": "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
    };
    return colors[status];
  };

  const getDeadlineStatus = (
    deadline: string,
  ): {
    color: string;
    label: string;
  } => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntilDeadline = Math.ceil(
      (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysUntilDeadline < 0) {
      return { color: "text-red-400", label: "Overdue" };
    } else if (daysUntilDeadline <= 3) {
      return { color: "text-orange-500", label: "Due soon" };
    } else {
      return { color: "text-lime-600 dark:text-lime-200", label: "On track" };
    }
  };

  const formatDeadline = (deadline: string): string => {
    return new Date(deadline).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusTransitions: StatusTransitions = {
    pending: "in-progress",
    "in-progress": "completed",
    completed: "pending",
  };

  const filteredTasks = tasks.filter(
    (task) => activeFilter === "all" || task.status === activeFilter,
  );

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
              onClick={() => setActiveFilter(status as TaskStatus | "all")}
              className={cn(
                "px-4 py-1 text-sm md:text-base rounded-full font-medium transition-colors",
                activeFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80",
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
          {filteredTasks.length ? (
            filteredTasks.map((task: Task) => (
              <div
                key={task.id}
                className="p-6 border rounded-xl transition-all bg-secondary"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <button
                    onClick={() =>
                      updateStatus(task.id, statusTransitions[task.status])
                    }
                    className="mt-1 hover:scale-110 transition-transform"
                  >
                    {getStatusIcon(task.status)}
                  </button>

                  <div className="flex-1 relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={cn(
                          "text-lg font-medium",
                          task.status === "completed" &&
                            "line-through text-muted-foreground",
                        )}
                      >
                        {task.title}
                      </h3>
                      <span
                        className={cn(
                          "py-[0.1rem] px-2 md:px-4 md:py-1 text-xs absolute sm:static -top-5 -right-3 rounded-full whitespace-nowrap md:text-sm font-medium",
                          getStatusBadgeColor(task.status),
                        )}
                      >
                        {task.status.charAt(0).toUpperCase() +
                          task.status.slice(1).replace("-", " ")}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm md:text-base mb-2">
                      {task.description}
                    </p>

                    <div
                      className={cn(
                        "flex items-center gap-2 mt-3",
                        task.status === "completed"
                          ? "line-through text-muted-foreground"
                          : "",
                      )}
                    >
                      <CalendarDays
                        className={cn(
                          "w-4 h-4",
                          getDeadlineStatus(task.deadline).color,
                          task.status === "completed"
                            ? "text-muted-foreground"
                            : "",
                        )}
                      />
                      <span className="text-sm">
                        {formatDeadline(task.deadline)}
                      </span>
                      {task.status !== "completed" && (
                        <span
                          className={cn(
                            "text-sm ml-2",
                            getDeadlineStatus(task.deadline).color,
                          )}
                        >
                          • {getDeadlineStatus(task.deadline).label}
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
