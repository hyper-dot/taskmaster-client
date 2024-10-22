import React from "react";
import Link from "next/link";
import { CheckSquare } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import LoginDialog from "../common/LoginDialog";
import { getSession } from "@/actions/auth.actions";
import { Button } from "../ui/button";

export async function Navigation() {
  const { accessToken } = await getSession();
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center">
            <CheckSquare className="w-8 h-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold">TaskMaster</span>
          </Link>

          <div className="flex items-center space-x-4 md:space-x-8">
            <ThemeToggle />
            {!accessToken ? (
              <LoginDialog />
            ) : (
              <div className="flex gap-2">
                <Button>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                {/* <Button variant="destructive">Log Out</Button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
