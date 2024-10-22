"use client";
import { useLimitToast } from "@/hooks/toast";
import { Toaster } from "react-hot-toast";

export const CustomToaster = () => {
  useLimitToast(3);
  return (
    <Toaster
      toastOptions={{
        duration: 4000,
        position: "top-center",
        className: "toaster",
      }}
    ></Toaster>
  );
};
