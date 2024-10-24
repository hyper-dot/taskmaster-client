import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import React from "react";

const DeadLineStatus = ({
  progress,
  dueDate,
}: {
  progress: TaskStatus;
  dueDate: string;
}) => {
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

  return (
    <div
      className={cn(
        "flex items-center gap-2 mt-3",
        progress === "completed" ? "line-through text-muted-foreground" : "",
      )}
    >
      <CalendarDays
        className={cn(
          "w-4 h-4",
          getDeadlineStatus(dueDate).color,
          progress === "completed" ? "text-muted-foreground" : "",
        )}
      />
      <span className="text-sm">{formatDeadline(dueDate)}</span>
      {progress !== "completed" && (
        <span className={cn("text-sm ml-2", getDeadlineStatus(dueDate).color)}>
          • {getDeadlineStatus(dueDate).label}
        </span>
      )}
    </div>
  );
};

export default DeadLineStatus;
