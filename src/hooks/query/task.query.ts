import { useApiClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetTasks() {
  const api = useApiClient();
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => await api.get("/task").then((res) => res.data),
  });
}
