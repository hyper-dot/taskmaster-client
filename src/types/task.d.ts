// Define types
type TaskStatus = "todo" | "in_progress" | "completed";

interface Task {
  id: number;
  title: string;
  description: string;
  progress: TaskStatus;
  dueDate: string;
}

// Status transition map type
type StatusTransitions = {
  [K in TaskStatus]: TaskStatus;
};
