import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 border-t text-center text-gray-500">
      <p>© {currentYear} TaskMaster. All rights reserved.</p>
    </footer>
  );
};
