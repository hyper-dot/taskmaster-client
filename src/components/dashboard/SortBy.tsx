"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const allOptions = [
  { label: "Date", value: "createdAt" },
  { label: "Progress", value: "progress" },
  { label: "Priority", value: "dueDate" },
];

export function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const progress = searchParams.get("progress");

  const options = progress
    ? allOptions.filter((o) => o.value !== "status")
    : allOptions;

  const handleChange = () => {};

  return (
    <Select
      onValueChange={(val) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("sortBy", val);
        router.push(`?${newSearchParams}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        {options.map((item, idx) => (
          <SelectItem value={item.value} key={idx}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
