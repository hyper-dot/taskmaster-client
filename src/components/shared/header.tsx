import React from "react";
import { CheckSquare } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import LoginDialog from "../common/LoginDialog";

export const Navigation: React.FC = () => {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <CheckSquare className="w-8 h-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold">TaskMaster</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <ThemeToggle />
            <LoginDialog />
          </div>
        </div>
      </div>
    </nav>
  );
};
