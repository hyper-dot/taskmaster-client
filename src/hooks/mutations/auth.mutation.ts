import { login } from "@/actions/auth.actions";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return await axiosInstance.post("/user", payload);
    },
  });
};

// Register mutations
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.resetQueries();
    },
    mutationFn: async (payload: any) => {
      const { error, message } = await login(payload);
      if (error) {
        throw new Error(error);
      }
      return message;
    },
  });
};
