import { cn } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import { CheckCircle2, Circle, Clock, Pencil, Trash2 } from "lucide-react";
import DeadLineStatus from "./DeadLineStatus";
import { useDeleteTask } from "@/hooks/mutations/task.mutation";
import toast from "react-hot-toast";

const TaskCard = ({ task }: { task: Task }) => {
  const { mutateAsync } = useDeleteTask();

  const getStatusIcon = (status: TaskStatus): JSX.Element => {
    const icons: Record<TaskStatus, JSX.Element> = {
      completed: <CheckCircle2 className="text-green-500" />,
      in_progress: <Clock className="text-blue-500" />,
      todo: <Circle className="text-gray-500" />,
    };
    return icons[status];
  };

  function updateStatus(taskId: number, newStatus: TaskStatus): void {}

  function deleteTask(taskId: number) {
    toast.promise(mutateAsync(taskId), {
      loading: "Please wait ...",
      success: "Task deleted successfully",
      error: (err) => err.message || "Something went wrong",
    });
  }

  return (
    <div
      key={task.id}
      className="py-[1.7rem] pb-8 px-5 border rounded-xl transition-all bg-secondary"
    >
      <div className="flex items-start gap-3 md:gap-4">
        <button
          // onClick={() =>
          //   updateStatus(task.id, statusTransitions[task.progress])
          // }
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
            <StatusBadge status={task.progress} />
          </div>

          <p className="text-muted-foreground text-sm md:text-base mb-2">
            {task.description}
          </p>

          <DeadLineStatus progress={task.progress} dueDate={task.dueDate} />

          {/* New Action Buttons */}
          <div className="flex gap-3 absolute -bottom-6 -right-3">
            <button>
              <Pencil className="w-4 h-4 text-blue-500" />
            </button>
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
