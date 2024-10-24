import React, { ChangeEvent, useState, useEffect } from "react";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";

const DEBOUNCE_DELAY = 300; // Adjust delay as needed

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("searchQuery");

  const [searchTerm, setSearchTerm] = useState(query || "");

  // Debounced effect
  useEffect(() => {
    const handler = setTimeout(() => {
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

  return (
    <Input
      defaultValue={query || ""}
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search tasks..."
      className="md:flex-1"
    />
  );
};

export default Search;
