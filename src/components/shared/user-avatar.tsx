"use client";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useProfileQuery } from "@/hooks/query/profile.query";
import { getInitials } from "@/lib/user";

const UserAvatar = () => {
  const { data } = useProfileQuery();

  return (
    <Avatar>
      <AvatarFallback
        title="Go to dashboard"
        className="cursor-pointer"
        asChild
      >
        <Link href="/dashboard">{data ? getInitials(data.name) : ""}</Link>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
