import { cn } from "@/lib/utils";
import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className, ...props }: SkeletonProps): JSX.Element => {
  return (
    <div
      className={`
        relative 
        overflow-hidden 
        bg-neutral-200 
        dark:bg-neutral-800 
        animate-pulse
        before:absolute 
        before:inset-0
        before:-translate-x-full
        before:animate-[shimmer_2s_infinite]
        before:bg-gradient-to-r
        before:from-transparent 
        before:via-white/60 
        before:to-transparent
        dark:before:via-gray-600/60
        ${cn(className)}
      `}
      {...props}
    />
  );
};

export default Skeleton;
