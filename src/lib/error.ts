import { AxiosError } from "axios";

export function handleAxiosError(err: unknown): string {
  if (err instanceof AxiosError) {
    return err.response?.data?.error || "An unexpected error occurred";
  } else if (err instanceof Error) {
    return err.message || "An unexpected error occurred";
  }
  return "An unknown error occurred";
}
