import { cn } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import {
  CheckCircle2,
  Circle,
  Clock,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import DeadLineStatus from "./DeadLineStatus";
import { useDeleteTask, useEditTask } from "@/hooks/mutations/task.mutation";
import toast from "react-hot-toast";
import EditTaskDialog from "./EditTask";

const TaskCard = ({ task }: { task: Task }) => {
  const { mutateAsync } = useDeleteTask();
  const updateMutation = useEditTask(task.id);

  const getStatusIcon = (status: TaskStatus): JSX.Element => {
    const icons: Record<TaskStatus, JSX.Element> = {
      completed: <CheckCircle2 className="text-green-500" />,
      in_progress: <Clock className="text-blue-500" />,
      todo: <Circle className="text-gray-500" />,
    };
    return icons[status];
  };

  async function updateStatus(progress: TaskStatus) {
    try {
      await updateMutation.mutateAsync({ progress });
    } catch (err: any) {
      toast.error(err.message || "Couldn't update task status");
    }
  }

  function deleteTask(taskId: number) {
    toast.promise(mutateAsync(taskId), {
      loading: "Please wait ...",
      success: "Task deleted successfully",
      error: (err) => err.message || "Something went wrong",
    });
  }

  const statusTransitions: StatusTransitions = {
    todo: "in_progress",
    in_progress: "completed",
    completed: "todo",
  };

  return (
    <div
      key={task.id}
      className="py-[1.7rem] pb-8 px-5 border rounded-xl transition-all bg-secondary"
    >
      <div className="flex items-start gap-3 md:gap-4">
        <button
          disabled={updateMutation.isPending}
          onClick={() => updateStatus(statusTransitions[task.progress])}
          className="mt-1 hover:scale-110 transition-transform"
        >
          {updateMutation.isPending ? (
            <Loader2 className="animate-spin text-muted-foreground" />
          ) : (
            getStatusIcon(task.progress)
          )}
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
            <StatusBadge status={task.progress} />
          </div>

          <p className="text-muted-foreground text-sm md:text-base mb-2">
            {task.description}
          </p>

          <DeadLineStatus progress={task.progress} dueDate={task.dueDate} />

          {/* New Action Buttons */}
          <div className="flex gap-3 absolute -bottom-6 -right-3">
            <EditTaskDialog task={task} />
            <button
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
