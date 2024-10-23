"use client";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useProfileQuery } from "@/hooks/query/profile.query";
import { getInitials } from "@/lib/user";

const UserAvatar = () => {
  const { data } = useProfileQuery();
  const user = data?.data;
  return (
    <Avatar>
      <AvatarFallback
        title="Go to dashboard"
        className="cursor-pointer"
        asChild
      >
        <Link href="/dashboard">
          {data?.data ? getInitials(user.name) : ""}
        </Link>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
