import { useApiClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ReadonlyURLSearchParams } from "next/navigation";

export function useGetTasks(searchParams: ReadonlyURLSearchParams) {
  const api = useApiClient();
  return useQuery({
    queryKey: ["tasks", searchParams.toString()],
    queryFn: async () =>
      await api.get(`/task?${searchParams.toString()}`).then((res) => res.data),
  });
}
