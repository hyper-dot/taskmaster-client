"use client";
import React, { createContext, useContext, ReactNode } from "react";

interface SessionCtxProps {
  accessToken?: string;
  refreshToken?: string;
}

const SessionCtx = createContext<SessionCtxProps | undefined>(undefined);

const SessionProvider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) => {
  return <SessionCtx.Provider value={session}>{children}</SessionCtx.Provider>;
};

// HOOK to use session context
const useSession = (): SessionCtxProps => {
  const context = useContext(SessionCtx);
  if (!context) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return context;
};

export { SessionProvider, useSession };
