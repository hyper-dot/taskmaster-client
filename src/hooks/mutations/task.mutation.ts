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
