import type {
  SearchResult,
} from "../services/api";

import {
  SearchX,
} from "lucide-react";

interface SearchResultsProps {
  results: SearchResult[];
}

export default function SearchResults({
  results,
}: SearchResultsProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold">
        Search Results
      </h2>

      {results.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-slate-500">
          <SearchX
            size={40}
            className="mb-3"
          />

          <p>
            No matching text
            found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map(
            (
              result,
              index
            ) => (
              <div
                key={`${result.page}-${index}`}
                className="rounded-lg border border-slate-200 p-4 dark:border-slate-700"
              >
                <div className="mb-2 font-semibold text-blue-600">
                  Page{" "}
                  {result.page}
                </div>

                <p className="whitespace-pre-wrap text-sm leading-7">
                  {result.text}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
