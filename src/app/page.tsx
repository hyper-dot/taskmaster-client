"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="px-4 lg:px-6 h-14 flex items-center"></header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-8 text-gray-900 dark:text-white">
          Master Your Tasks,
          <br />
          Boost Your Productivity
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full">
          {[
            "Smart Task Management",
            "Insightful Analytics",
            "Team Collaboration",
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <CardContent className="p-4 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-gray-800 dark:text-gray-200">
                  {feature}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button size="lg">Get Started</Button>
      </main>
    </div>
  );
}
