import { useApiClient } from "@/lib/axios";
import { TTaskSchema } from "@/schema/task.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddTask() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TTaskSchema) => {
      return await api.post("/task", payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useEditTask(id: number) {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<TTaskSchema>) => {
      return await api.patch(`/task/${id}`, payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useDeleteTask() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return await api.delete(`/task/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
