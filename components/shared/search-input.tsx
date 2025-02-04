"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    console.log(pathname);

    router.replace(`/search?${params.toString()}`);
  }, 300);

  return (
    <Input
      className={className}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      placeholder="Search blogs..."
      defaultValue={searchParams.get("q")?.toString()}
    />
  );
};

export default SearchInput;
