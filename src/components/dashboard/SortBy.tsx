import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = [
  { label: "Date", value: "date" },
  { label: "Status", value: "status" },
  { label: "Priority", value: "priority" },
];

export function SortBy() {
  return (
    <Select>
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
