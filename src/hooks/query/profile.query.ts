import { useApiClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useProfileQuery() {
  const api = useApiClient();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => await api.get("/user/profile").then((res) => res.data),
  });
}
