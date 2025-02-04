import HomeBlogs from "@/components/sections/home-blogs";
import SearchInput from "@/components/shared/search-input";
import BlogsSkeleton from "@/components/skeletons/blogs-skeleton";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

interface SearchParams {
  q: string;
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { q } = await searchParams;

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-[800px] flex-col gap-5">
        <div className="w-full">
          <SearchInput className="w-full md:hidden" />
        </div>
        <h3 className="text-2xl font-bold text-muted-foreground">
          Search result on <span className="text-primary">&apos;{q}&apos;</span>
        </h3>
        <Separator />
        <Suspense fallback={<BlogsSkeleton />}>
          <HomeBlogs search={q} />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchPage;
