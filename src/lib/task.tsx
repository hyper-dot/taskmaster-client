import { CheckCircle2, Circle, Clock } from "lucide-react";

export const getStatusIcon = (status: TaskStatus): JSX.Element => {
  const icons: Record<TaskStatus, JSX.Element> = {
    completed: <CheckCircle2 className="text-green-500" />,
    in_progress: <Clock className="text-blue-500" />,
    todo: <Circle className="text-gray-500" />,
  };
  return icons[status];
};

export const getStatusBadgeColor = (status: TaskStatus): string => {
  const colors: Record<TaskStatus, string> = {
    todo: "bg-orange-100 text-gray-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };
  return colors[status];
};

export const getDeadlineStatus = (
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

export const formatDeadline = (deadline: string): string => {
  return new Date(deadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
