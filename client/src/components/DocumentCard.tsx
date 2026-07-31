import {
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Trash2,
} from "lucide-react";

import type { DocumentSummary } from "../services/api";

interface DocumentCardProps {
  document: DocumentSummary;
  onOpen?: (
    documentId: string
  ) => void;
  onDelete?: (
    documentId: string
  ) => void;
}

function formatFileSize(
  bytes: number
) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    1024 /
    1024
  ).toFixed(1)} MB`;
}

function formatDate(
  value: string
) {
  return new Date(
    value
  ).toLocaleDateString();
}

export default function DocumentCard({
  document,
  onOpen,
  onDelete,
}: DocumentCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold">
            {document.fileName}
          </h3>

          <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
            {document.originalName}
          </p>
        </div>

        {onDelete && (
          <button
            type="button"
            onClick={() =>
              onDelete(
                document.documentId
              )
            }
            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
            title="Delete document"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <FileText size={16} />

          <span>
            {document.pageCount}{" "}
            page
            {document.pageCount !==
            1
              ? "s"
              : ""}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MessageSquare
            size={16}
          />

          <span>
            {
              document.questionCount
            }{" "}
            question
            {document.questionCount !==
            1
              ? "s"
              : ""}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} />

          <span>
            {formatDate(
              document.createdAt
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} />

          <span>
            {formatDate(
              document.lastAccessed
            )}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 text-sm dark:border-gray-700">
        <div className="space-y-1">
          <p>
            <span className="font-medium">
              Chunks:
            </span>{" "}
            {document.chunkCount}
          </p>

          <p>
            <span className="font-medium">
              Size:
            </span>{" "}
            {formatFileSize(
              document.fileSize
            )}
          </p>
        </div>

        {onOpen && (
          <button
            type="button"
            onClick={() =>
              onOpen(
                document.documentId
              )
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Open
          </button>
        )}
      </div>
    </div>
  );
}
