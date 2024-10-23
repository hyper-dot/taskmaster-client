import { login, refreshToken } from "@/actions/auth.actions";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await axiosInstance.post("/user", payload);
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: refreshToken,
  });
}

// Register mutations
export function useLoginMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    onSuccess: () => {
      queryClient.resetQueries().then(() => router.push("/dashboard"));
    },
    mutationFn: async (payload: any) => {
      const { error, message } = await login(payload);
      if (error) {
        throw new Error(error);
      }
      return message;
    },
  });
}
