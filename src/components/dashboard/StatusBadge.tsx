import { cn } from "@/lib/utils";
import React from "react";

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const getStatusBadgeColor = (status: TaskStatus): string => {
    const colors: Record<TaskStatus, string> = {
      todo: "bg-orange-100 text-gray-700 dark:bg-orange-500/40 dark:text-orange-200",
      in_progress:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/40 dark:text-blue-200",
      completed:
        "bg-green-100 text-green-700 dark:bg-green-500/40 dark:text-green-200",
    };
    return colors[status];
  };

  return (
    <span
      className={cn(
        "py-[0.1rem] px-2 md:px-4 md:py-1 text-xs absolute sm:static -top-[1.2rem] -right-3 rounded-full whitespace-nowrap md:text-sm font-medium",
        getStatusBadgeColor(status),
      )}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1).replace("_", " ")}
    </span>
  );
};

export default StatusBadge;
