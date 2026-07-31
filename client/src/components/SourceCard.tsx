import {
  BookOpen,
  Clipboard,
  FileText,
} from "lucide-react";

import type {
  Source,
} from "../services/api";

interface SourceCardProps {
  sources: Source[];
}

export default function SourceCard({
  sources,
}: SourceCardProps) {
  async function copySource(
    text: string
  ) {
    try {
      await navigator.clipboard.writeText(
        text
      );
    } catch (error) {
      console.error(
        "Failed to copy source:",
        error
      );
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <BookOpen
          size={24}
          className="text-blue-600"
        />

        <div>
          <h2 className="text-lg font-semibold">
            Retrieved Sources
          </h2>

          <p className="text-sm text-slate-500">
            Document passages used to
            generate the answer.
          </p>
        </div>
      </div>

      <div className="p-6">
        {sources.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-center text-slate-500">
            <FileText
              size={48}
              className="mb-4"
            />

            <p>
              Sources will appear here
              after asking a question.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {sources.map(
              (
                source,
                index
              ) => (
                <div
                  key={`${source.page}-${index}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">
                        Source{" "}
                        {index + 1}
                      </h3>

                      <p className="text-sm text-blue-600">
                        Page{" "}
                        {source.page}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        copySource(
                          source.text
                        )
                      }
                      className="rounded-lg border border-slate-300 p-2 transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
                      title="Copy source"
                    >
                      <Clipboard
                        size={18}
                      />
                    </button>
                  </div>

                  <div className="max-h-56 overflow-y-auto rounded-lg bg-white p-4 text-sm leading-7 dark:bg-slate-900">
                    <p className="whitespace-pre-wrap">
                      {source.text}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
