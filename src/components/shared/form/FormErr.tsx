import { ReactNode } from "react";

export const FormErr = ({ children }: { children?: ReactNode }) => {
  return <p className="text-xs text-destructive">{children}</p>;
};
