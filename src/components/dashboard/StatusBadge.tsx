import { getStatusBadgeColor } from "@/lib/task";
import { cn } from "@/lib/utils";
import React from "react";

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  return (
    <span
      className={cn(
        "py-[0.1rem] px-2 md:px-4 md:py-1 text-xs absolute sm:static -top-5 -right-3 rounded-full whitespace-nowrap md:text-sm font-medium",
        getStatusBadgeColor(status),
      )}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1).replace("_", " ")}
    </span>
  );
};

export default StatusBadge;
