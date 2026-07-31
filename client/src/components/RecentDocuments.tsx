import {
  FileText,
  Calendar,
  MessageSquare,
  Layers,
} from "lucide-react";

import type {
  DocumentSummary,
} from "../services/api";

interface RecentDocumentsProps {
  documents: DocumentSummary[];

  onSelect?: (
    documentId: string
  ) => void;
}

function formatFileSize(
  bytes: number
) {
  if (bytes < 1024)
    return `${bytes} B`;

  if (
    bytes <
    1024 * 1024
  ) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  if (
    bytes <
    1024 *
      1024 *
      1024
  ) {
    return `${(
      bytes /
      1024 /
      1024
    ).toFixed(1)} MB`;
  }

  return `${(
    bytes /
    1024 /
    1024 /
    1024
  ).toFixed(2)} GB`;
}

export default function RecentDocuments({
  documents,
  onSelect,
}: RecentDocumentsProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">

      <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <h2 className="text-xl font-semibold">
          Recent Documents
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your most recently accessed files
        </p>
      </div>

      {documents.length === 0 ? (
        <div className="flex flex-col items-center py-14 text-slate-500">
          <FileText
            size={48}
            className="mb-4"
          />

          <p className="text-lg font-medium">
            No documents uploaded
          </p>

          <p className="mt-2 text-sm">
            Upload your first PDF,
            DOCX or TXT document.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">

          {documents.map(
            (
              document
            ) => (
              <button
                key={
                  document.documentId
                }
                onClick={() =>
                  onSelect?.(
                    document.documentId
                  )
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <div className="flex items-start gap-4">

                  <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FileText
                      size={22}
                    />
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {
                        document.fileName
                      }
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-5 text-sm text-slate-500">

                      <span className="flex items-center gap-1">
                        <Layers
                          size={16}
                        />

                        {
                          document.pageCount
                        }{" "}
                        pages
                      </span>

                      <span className="flex items-center gap-1">
                        <MessageSquare
                          size={16}
                        />

                        {
                          document.questionCount
                        }{" "}
                        questions
                      </span>

                      <span>
                        {
                          document.chunkCount
                        }{" "}
                        chunks
                      </span>

                      <span>
                        {formatFileSize(
                          document.fileSize
                        )}
                      </span>

                    </div>
                  </div>
                </div>

                <div className="text-right text-sm text-slate-500">

                  <div className="flex items-center justify-end gap-1">
                    <Calendar
                      size={15}
                    />

                    {new Date(
                      document.lastAccessed
                    ).toLocaleDateString()}
                  </div>

                  <p className="mt-2">
                    Last opened
                  </p>

                </div>
              </button>
            )
          )}

        </div>
      )}

    </section>
  );
}
