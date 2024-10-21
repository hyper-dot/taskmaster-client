"use client";
import React, { useState } from "react";
import { PlusCircle, CheckCircle2, Circle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SortBy } from "@/components/dashboard/SortBy";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete project proposal",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      title: "Review code changes",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: 3,
      title: "Update documentation",
      status: "completed",
      priority: "low",
    },
  ]);

  const [newTask, setNewTask] = useState<string>("");

  const addTask = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: newTask,
      status: "pending",
      priority: "medium",
    };

    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const updateStatus = (taskId: number, newStatus: TaskStatus): void => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const updatePriority = (taskId: number, newPriority: TaskPriority): void => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, priority: newPriority } : task,
      ),
    );
  };

  const getPriorityColor = (priority: TaskPriority): string => {
    const colors: Record<TaskPriority, string> = {
      high: "text-red-500",
      medium: "text-yellow-500",
      low: "text-green-500",
    };
    return colors[priority];
  };

  const getStatusIcon = (status: TaskStatus): JSX.Element => {
    const icons: Record<TaskStatus, JSX.Element> = {
      completed: <CheckCircle2 className="text-green-500" />,
      "in-progress": <Clock className="text-blue-500" />,
      pending: <Circle className="text-gray-500" />,
    };
    return icons[status];
  };

  // Type-safe status transitions
  const statusTransitions: StatusTransitions = {
    pending: "in-progress",
    "in-progress": "completed",
    completed: "pending",
  };

  return (
    <div className="max-w-2xl mx-auto my-10">
      <form onSubmit={addTask} className="flex gap-2 mb-6 justify-between">
        <Button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Add Task
        </Button>

        <div className="flex gap-2">
          <Input placeholder="search..." />
          <SortBy />
        </div>
      </form>

      <div className="space-y-4">
        {tasks.map((task: Task) => (
          <div
            key={task.id}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateStatus(task.id, statusTransitions[task.status])
                  }
                  className="hover:scale-110 transition-transform"
                >
                  {getStatusIcon(task.status)}
                </button>
                <span
                  className={
                    task.status === "completed"
                      ? "line-through text-gray-500"
                      : ""
                  }
                >
                  {task.title}
                </span>
              </div>

              <select
                value={task.priority}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  updatePriority(task.id, e.target.value as TaskPriority)
                }
                className={`${getPriorityColor(task.priority)} bg-transparent border rounded-lg px-2 py-1`}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
