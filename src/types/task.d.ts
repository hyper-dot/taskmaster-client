// Define types
type TaskStatus = "pending" | "in-progress" | "completed";
type TaskPriority = "high" | "medium" | "low";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

// Status transition map type
type StatusTransitions = {
  [K in TaskStatus]: TaskStatus;
};
