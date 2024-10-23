import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import LoginDialog from "../dashboard/LoginDialog";
import { getSession } from "@/actions/auth.actions";
import LogoutAlert from "../common/LogoutAlert";
import UserAvatar from "./user-avatar";

export async function Navigation() {
  const { accessToken, refreshToken } = await getSession();
  const isNotAuthencticated = !accessToken && !refreshToken;

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center">
            <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-2xl font-bold text-blue-600 dark:text-blue-400 hidden sm:inline">
              Task Master
            </span>
          </Link>

          <div className="flex items-center space-x-4 md:space-x-8">
            <ThemeToggle />
            {isNotAuthencticated ? (
              <LoginDialog />
            ) : (
              <div className="flex items-center gap-2">
                <UserAvatar />
                <LogoutAlert />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
