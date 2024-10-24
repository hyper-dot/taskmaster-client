import React, { ChangeEvent, useState, useEffect } from "react";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { CircleX } from "lucide-react";

const DEBOUNCE_DELAY = 300; // Adjust delay as needed

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("searchQuery");

  const [searchTerm, setSearchTerm] = useState(query || "");

  // Debounced effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!searchTerm) return;
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("searchQuery", searchTerm);
      router.push(`?${newSearchParams.toString()}`);
    }, DEBOUNCE_DELAY);

    // Cleanup the timeout if the user continues typing
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, router, searchParams]);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value); // Set the search term but delay the actual search
  }

  function handleClearSearch() {
    const newSearchParams = new URLSearchParams(searchParams);
    setSearchTerm("");
    newSearchParams.delete("searchQuery", searchTerm);
    router.push(`?${newSearchParams.toString()}`);
  }

  return (
    <div className="relative w-full">
      <Input
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search tasks..."
        className="md:flex-1"
      />
      {!!searchTerm && (
        <CircleX
          role="button"
          onClick={handleClearSearch}
          className="text-destructive/80 absolute right-1 top-1/2 -translate-y-1/2"
          size={20}
        />
      )}
    </div>
  );
};

export default Search;
