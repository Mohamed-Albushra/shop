import { AlertCircle, Search } from "lucide-react";

import { getSearchedProducts } from "@/lib/actions";
import { Product } from "@/lib/interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function NavbarSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const handleSearch = useCallback(
    async (query: string) => {
      setLoading(true);
      setError("");
      setSearchPerformed(true);

      getSearchedProducts(queryParam || query)
        .then((data) => setResults(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    },
    [queryParam]
  );

  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
      handleSearch(queryParam);
    }
  }, [handleSearch, queryParam]);

  const handleClick = () => {
    router.push(`/search?query=${query}`);
    setQuery(query);
  };
  return (

<div className="flex flex-col items-center">
  <section className="flex justify-between items-center">
    <div className="hidden lg:flex">
      {/* Search bar and button for larger screens */}
      <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim() === "") {
                setError("The search-query can't be empty");
                setResults([]);
                return;
              }
              if (query.length < 3) {
                setError("The search-query must be at least 3 characters long");
                setResults([]);
                return;
              }
              handleSearch(query);
              handleClick();
            }}
            className="flex gap-2 my-4 md:flex"
          >
            <input
              className="flex-1 border p-2 rounded theme-placeholder-neutral-colored theme-border-text-colored theme-text-colored"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-sm bg-primary px-8 py-2 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
            >
              Search
            </button>
          </form>
    </div>
    <div className="lg:hidden flex justify-end">
      {/* Search icon for smaller screens */}
      <button
         onClick={(e) => {
          e.stopPropagation();
          setIsSearchFormOpen((prevOpen) => !prevOpen);
        }}
        className="bg-gray-100 hover:bg-gray-200 py-2 px-4 text-sm text-gray-700"
      >
        <Search className="h-4 w-4" />
      </button>
      {isSearchFormOpen && (
        <div className={`${isSearchFormOpen ? 'fixed top-10 left-0 w-full px-3 bg-white bg-opacity-50 z-40' : 'hidden'}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim() === "") {
                setError("The search-query can't be empty");
                setResults([]);
                return;
              }
              if (query.length < 3) {
                setError("The search-query must be at least 3 characters long");
                setResults([]);
                return;
              }
              handleSearch(query);
              handleClick();
            }}
            className="flex gap-2 my-4 md:flex"
          >
            <input
              className="flex-1 border p-2 rounded theme-placeholder-neutral-colored theme-border-text-colored theme-text-colored"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-sm bg-primary px-8 py-2 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </div>
  </section>
  <section className="flex flex-col items-center">
    {loading && !error && <p>Loading...</p>}
    {searchPerformed && !loading && !error && results.length === 0 && (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <AlertTitle>No results found.</AlertTitle>
        <AlertDescription>Search for something else</AlertDescription>
      </div>
    )}
    {error && (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )}
  </section>
</div>
  );
}
