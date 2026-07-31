import {
  useState,
  type KeyboardEvent,
} from "react";

import {
  Search,
} from "lucide-react";

interface SearchInputProps {
  loading?: boolean;

  onSearch: (
    query: string
  ) => void | Promise<void>;
}

export default function SearchInput({
  loading = false,
  onSearch,
}: SearchInputProps) {
  const [query, setQuery] =
    useState("");

  async function handleSearch() {
    const trimmed =
      query.trim();

    if (!trimmed) {
      return;
    }

    await onSearch(trimmed);
  }

  function handleKeyDown(
    e: KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold">
        Search Document
      </h2>

      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          placeholder="Search for keywords..."
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800"
        />

        <button
          onClick={
            handleSearch
          }
          disabled={
            loading ||
            !query.trim()
          }
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Search size={18} />

          {loading
            ? "Searching..."
            : "Search"}
        </button>
      </div>
    </section>
  );
}
